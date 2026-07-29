// scripts/gate-4m-media.mjs — Gate 4m: rendered media identity (V-1 phase V-0).
//
//   Every page renders exactly the set of videos it is supposed to render,
//   and every locale of a route renders the same set.
//
// WHY IT EXISTS. Nothing in the suite perceives media. That is not a hypothetical
// gap: the `zh` block of `utv.ts` shipped one carousel slide short of the other
// seven locales — 23 videos against 24 — and every gate, the validator and CI all
// reported green. 4f/4g/4h/4i read *text*; 4j reads the gallery *dictionary*; 4k
// reads *direction*. A missing video is none of those.
//
// SCOPE, AND WHY IT IS DRAWN THIS TIGHT. This gate answers one question: which
// videos does this page reference? It deliberately does NOT check thumbnail
// resolution, player query parameters, autoplay flags, `aria-label` presence,
// iframe attributes, or anything else about *how* a video is embedded. Those
// change whenever the embedding component changes; the identity of the video does
// not. A gate coupled to the implementation it validates needs editing every time
// that implementation improves, and a gate that needs editing to stay green is a
// gate contributors learn to route around. Same boundary 4h and 4i hold between
// them: 4h owns the seam at a lock, 4i owns the lock.
//
// SET, NOT MULTISET — a correction the implementation forced on the V-1 brief.
// The brief specified "the multiset of video IDs per page". Measured, `/utv/`
// carries 24 references to 21 distinct videos: the hero loop and one carousel
// slide are the same upload, and one video appears again further down. A count of
// *references* is not stable across the change this gate exists to survive — the
// facade migration turns one `<iframe src=…/embed/ID>` into one
// `<img src=…/vi/ID/…>` per slide, and the ambient hero into a self-hosted poster
// plus a script-injected iframe. Reference counts move; the answer to "which
// videos does this page offer" does not. So the SET is blocking and the reference
// count is advisory, printed on every run so a change is visible in the diff of a
// green run without being able to fail it.
//
// The cost is stated rather than hidden: dropping a placement of a video that also
// appears elsewhere on the same page is invisible to this gate. That is a layout
// regression, not a media-identity loss, and it is 4l's and review's to catch.
//
// FORM-BLIND BY CONSTRUCTION. An ID is extracted from any YouTube-shaped
// reference — embed URL, thumbnail path, or an explicit `data-video-id`. The
// homepage already proves why this matters: it ships a hand-rolled click-to-load
// facade whose poster is `img.youtube.com/vi/eFfvKxkiyzU/maxresdefault.jpg` and
// whose player exists only as a string inside an inline `<script>`. An
// extractor that knew only about `<iframe src>` would already under-report that
// page today, before any migration.
//
// TWO SIGNALS THAT FAIL IN DIFFERENT DIRECTIONS.
//   baseline  Frozen per-page sets. Catches drift on a page that already exists,
//             including a stray embed added to a page that should carry none.
//             Blind to a *newly added* route until someone re-baselines.
//   parity    Every locale of one route renders the same set. Self-maintaining —
//             it covers new routes the moment they exist, with no baseline edit —
//             and it is the signal that would have caught the `zh` defect on its
//             own. Blind to a defect applied uniformly to all locales at once.
// Neither is worth shipping alone.
//
// Exit codes follow the suite: 0 clean · 1 corpus violation · 2 could not run.
import { existsSync } from 'node:fs';
import { resolveHost } from './lib/host-adapter.mjs';
import { createRenderIndex } from './lib/render-index.mjs';

// No `--config`, deliberately — F5 Phase 2 removed it from 4i for a reason that applies
// here unchanged: a gate that can be pointed at a policy file resolves its own policy
// location, and then a gate aimed at a foreign corpus silently applies this host's policy
// to it. The manifest owns where policy lives. `--manifest` is the only way to change it,
// which moves the whole host together rather than one file out from under the rest.
const argv = process.argv.slice(2);
const KNOWN = ['--manifest', '--i18n', '--emit-baseline'];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    if (!KNOWN.includes(a)) {
      console.error(`gate-4m: unknown option ${a} — known options are ${KNOWN.join(', ')}`);
      process.exit(2);
    }
    if (a !== '--emit-baseline') i++;
  }
}
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};
// Prints a baseline to stdout and never writes one. Rewriting the baseline in place
// would make "the gate is failing" and "the gate has been silenced" the same command.
// Freezing a baseline stays a deliberate act: run this, read the diff, commit it.
const EMIT = argv.includes('--emit-baseline');

let host;
try {
  host = resolveHost({ manifestPath: flag('--manifest'), registryModule: flag('--i18n') });
} catch (e) {
  console.error(`gate-4m: ${e.message}`);
  process.exit(2);
}

let dist, pages, localeOf;
try {
  dist = host.routes.output;
  pages = host.routes.pages;
  localeOf = host.routes.localeOf;
} catch (e) {
  console.error(`gate-4m: rendered output ${e.message} — refusing to pass silently.`);
  process.exit(2);
}

if (!existsSync(dist)) {
  console.error('gate-4m: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

// `--emit-baseline` runs before a baseline exists, so it must not require one. Every other
// invocation does: a missing or unreadable baseline is exit 2, never an empty pass that
// would report ✔ over a corpus it never compared to anything.
let config, configLabel = '(none)';
if (EMIT) {
  config = { pages: {}, divergent: [] };
} else {
  try {
    config = host.policy.load('media');
    configLabel = host.policy.describe('media');
  } catch (e) {
    console.error(`gate-4m: media policy ${e.message} — refusing to pass silently.`);
    process.exit(2);
  }
  if (!config.pages || typeof config.pages !== 'object') {
    console.error(`gate-4m: ${configLabel} has no "pages" baseline — refusing to pass silently.`);
    process.exit(2);
  }
}
const DIVERGENT = new Set(config.divergent ?? []);

// --- Extraction. ---------------------------------------------------------------------
//
// A YouTube video id is 11 characters from [A-Za-z0-9_-]. The bound is what keeps this
// from matching arbitrary path segments, and it is checked against the corpus rather than
// assumed: every id in this build is exactly 11.
//
// `playlist=<id>` is deliberately NOT a source. On a background loop it repeats the id
// already carried by the embed path — counting it would report every ambient video twice
// and make the loop parameter part of the identity claim, which it is not.
const ID = '[A-Za-z0-9_-]{11}';
const SOURCES = [
  new RegExp(`youtube(?:-nocookie)?\\.com/embed/(${ID})`, 'g'),
  new RegExp(`youtube\\.com/watch\\?(?:[^"'\\s]*?[&;])?v=(${ID})`, 'g'),
  new RegExp(`youtu\\.be/(${ID})`, 'g'),
  new RegExp(`(?:i\\.ytimg|img\\.youtube)\\.com/vi/(${ID})/`, 'g'),
  new RegExp(`data-video-id\\s*=\\s*["'](${ID})["']`, 'g'),
];

/** Every YouTube reference on a page, in source order, duplicates kept. */
const refsOf = (html) => {
  const out = [];
  for (const re of SOURCES) {
    re.lastIndex = 0;
    for (const m of html.matchAll(re)) out.push(m[1]);
  }
  return out;
};

const setOf = (refs) => [...new Set(refs)].sort();
const same = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

/** The route with its locale prefix removed — the identity shared across locales. */
const familyOf = (key, loc) => {
  const seg = key.split('/')[0];
  return loc && seg === loc ? key.slice(loc.length + 1) : key;
};

// --- Run. ------------------------------------------------------------------------------
const index = createRenderIndex(dist, { pages });

const violations = [];          // blocking
const countDrift = [];          // advisory
const families = new Map();     // family -> [{ loc, key, set }]
const observed = new Map();     // key -> { set, refs }

for (const page of index.pages) {
  const refs = page.derive('mediaRefs', refsOf);
  const set = setOf(refs);
  observed.set(page.key, { set, refs: refs.length });

  if (set.length) {
    let loc = null;
    try { loc = localeOf(page.key); } catch { loc = null; }
    const fam = familyOf(page.key, loc);
    if (!families.has(fam)) families.set(fam, []);
    families.get(fam).push({ loc: loc ?? '—', key: page.key, set });
  }
}

if (EMIT) {
  const out = {};
  for (const key of [...observed.keys()].sort()) {
    const { set } = observed.get(key);
    if (set.length) out[key] = set;
  }
  process.stdout.write(JSON.stringify(out, null, 2) + '\n');
  console.error(`gate-4m: emitted ${Object.keys(out).length} page baselines from ${index.size} pages — review and commit deliberately.`);
  process.exit(0);
}

// --- Signal 1: baseline conservation. --------------------------------------------------
for (const [key, expected] of Object.entries(config.pages)) {
  const seen = observed.get(key);
  if (!seen) {
    violations.push(`${key}: baselined with ${expected.length} video(s) but the page does not exist in this build`);
    continue;
  }
  if (!same(seen.set, [...expected].sort())) {
    const missing = expected.filter((v) => !seen.set.includes(v));
    const added = seen.set.filter((v) => !expected.includes(v));
    violations.push(
      `${key}: video set differs from baseline` +
        (missing.length ? ` — missing ${missing.join(', ')}` : '') +
        (added.length ? ` — unexpected ${added.join(', ')}` : '')
    );
  }
}

// A page absent from the baseline must carry no video at all. This is the half that
// catches an embed appearing somewhere nobody was looking, which is the shape of every
// media defect this corpus has actually produced.
for (const [key, { set }] of observed) {
  if (set.length && !(key in config.pages)) {
    violations.push(`${key}: carries ${set.length} video(s) (${set.join(', ')}) but is not in the baseline`);
  }
}

// --- Signal 2: cross-locale parity. -----------------------------------------------------
let parityChecked = 0;
for (const [fam, rows] of families) {
  if (DIVERGENT.has(fam)) continue;
  if (rows.length < 2) continue;
  parityChecked++;
  const ref = rows[0];
  for (const row of rows.slice(1)) {
    if (!same(ref.set, row.set)) {
      const missing = ref.set.filter((v) => !row.set.includes(v));
      const added = row.set.filter((v) => !ref.set.includes(v));
      violations.push(
        `${row.key}: video set differs from ${ref.key} (same route, different locale)` +
          (missing.length ? ` — missing ${missing.join(', ')}` : '') +
          (added.length ? ` — extra ${added.join(', ')}` : '')
      );
    }
  }
}

// --- Advisory: reference counts. ---------------------------------------------------------
if (config.refCounts && typeof config.refCounts === 'object') {
  for (const [key, expected] of Object.entries(config.refCounts)) {
    const seen = observed.get(key);
    if (seen && seen.refs !== expected) countDrift.push(`${key}: ${expected} → ${seen.refs} reference(s)`);
  }
}

// --- Report. -----------------------------------------------------------------------------
const withMedia = [...observed.values()].filter((o) => o.set.length).length;
const totalRefs = [...observed.values()].reduce((a, o) => a + o.refs, 0);
const distinct = new Set([...observed.values()].flatMap((o) => o.set)).size;

if (violations.length) {
  console.error(`gate-4m: ✘ ${violations.length} media violation(s)`);
  for (const v of violations) console.error(`         ${v}`);
  process.exit(1);
}

console.log(
  `gate-4m: ✔ ${withMedia} page(s) with video across ${index.size} scanned — ` +
    `${distinct} distinct video(s), ${totalRefs} reference(s); ${parityChecked} route(s) checked for cross-locale parity`
);
if (countDrift.length) {
  // Advisory by construction. A reference count moves legitimately whenever the embedding
  // form changes — which the facade migration will do on purpose — so this can report but
  // must never block. The set is the blocking claim.
  console.log(`         ⚠ ${countDrift.length} page(s) changed reference count without changing which videos they offer:`);
  for (const d of countDrift) console.log(`           ${d}`);
}
if (DIVERGENT.size) {
  console.log(`         ${DIVERGENT.size} route(s) exempt from cross-locale parity: ${[...DIVERGENT].join(', ')}`);
}
