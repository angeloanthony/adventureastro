// scripts/gate-4k-direction.mjs — Gate 4k: direction integrity (AR-2 B-1).
//
// Origin: AR-1's fail-closed matrix, scenarios S3 and S4. An Arabic page rendering
// `dir="ltr"`, or carrying no `dir` at all, passed every gate, the validator and the
// build. Ten of ten gates would approve it. The single attribute that makes an RTL
// locale an RTL locale was checked by nothing.
//
// INVARIANT. Every rendered page's effective text direction equals the direction its
// locale declares in the host's own registry.
//
// WHAT "EFFECTIVE" MEANS, AND WHY THE GATE IS BUILT ON IT.
// `dir` is an enumerated attribute whose missing-value default on the root element is
// `ltr`. So a page has a direction whether or not it says so, and the two hosts this gate
// was proven against emit OPPOSITE shapes for the same intent:
//
//     adventureastro   619 LTR pages with NO dir attribute     +  1 × dir="rtl"
//     parkingwayastro  133 pages with an EXPLICIT dir="ltr"    + 12 × dir="rtl"
//
// A gate that required an explicit `dir` would fail all 619 of the first; one that
// forbade `dir="ltr"` would fail all 133 of the second. Both hosts are correct. What they
// agree on — and the only thing a portable gate may test — is the direction a browser
// actually uses. That is measured here, never the attribute's presence.
//
// WHAT THIS GATE IS NOT. It does not read CSS, logical properties, mirrored layout, flex
// ordering, arrow glyphs, bidi isolation, mirrored punctuation or numbering systems. Those
// are AR-2 B-2 and B-5..B-7 and they are a different kind of check — they need a browser
// or a Unicode property table, and they measure appearance rather than a declared
// contract. This gate reads document structure only, and a page it passes may still be
// visually broken. That limit is deliberate and stated so nobody reads a green 4k as
// "RTL works".
//
// IT VERIFIES RENDERED TRUTH, NOT IMPLEMENTATION STRATEGY. Whether direction reaches
// `<html>` from a helper, a layout prop, a component or an adapter is none of the gate's
// business. It follows that the gate can prove a branch DISAGREES with the registry and
// can never prove one does not exist: a `lang === 'ar' ? …` branch that happens to return
// the registry's own answer is invisible in rendered output, correctly. The framework
// invariant "direction has one source" is therefore enforced here in the direction that
// matters — a second source that lies is caught on every page it touches — and proven in
// the other direction by the substitution test in the fail-closed matrix, which flips
// `LOCALES[].dir` and confirms rendered output follows without any other edit.
//
// EXIT CODES. 2 for anything structural — an unresolvable host, an undeclared direction
// field, no dist/. 1 for direction findings in the corpus. 0 with a one-line summary
// otherwise. Same split as 4f/4h/4i.
import { existsSync } from 'node:fs';
import { resolveHost, DIRECTIONS } from './lib/host-adapter.mjs';
import { createRenderIndex } from './lib/render-index.mjs';

// `--manifest` and `--i18n` exist for the same reason gates 4g and 4i expose them: to
// exercise this gate against a scratch host or a foreign corpus without editing the
// repository. Cross-host proof (ParkingWay) and the whole fail-closed matrix run through
// them. `--i18n` alone would point at a foreign registry while still applying THIS host's
// manifest, so it is only meaningful beside `--manifest`.
const argv = process.argv.slice(2);
const KNOWN = ['--manifest', '--i18n'];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    if (!KNOWN.includes(a)) {
      console.error(`gate-4k: unknown option ${a} — known options are ${KNOWN.join(', ')}`);
      process.exit(2);
    }
    i++;
  }
}
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};

// --- The host. Registry, routing and direction all resolve through the adapter; this
//     gate knows no path, no binding name and no source file. ---
let host;
try {
  host = resolveHost({ manifestPath: flag('--manifest'), registryModule: flag('--i18n') });
} catch (e) {
  console.error(`gate-4k: ${e.message}`);
  process.exit(2);
}

let dist, pages, localeOf;
try {
  dist = host.routes.output;
  pages = host.routes.pages;
  localeOf = host.routes.localeOf;
} catch (e) {
  console.error(`gate-4k: rendered output ${e.message} — refusing to pass silently.`);
  process.exit(2);
}

// The declared direction of every locale, resolved once and completely. An undeclared
// `directionField` is exit 2, never an assumed `ltr`: a gate that invented the answer
// would approve an RTL locale rendering left-to-right by agreeing with its own invention,
// which is the one defect it exists to catch.
let DECLARED;
try {
  DECLARED = host.direction.map;
} catch (e) {
  console.error(`gate-4k: locale direction ${e.message} — refusing to pass silently.`);
  process.exit(2);
}

if (!existsSync(dist)) {
  console.error('gate-4k: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

// --- Reading the root element. -------------------------------------------------------
//
// Deliberately a scan of the opening tag rather than a DOM parse. The whole question is
// which attributes the ROOT element carries, and a tolerant parser would answer a
// different one: browsers silently drop a duplicate `dir` and normalise a malformed tag,
// so a page that parses cleanly can still have shipped two contradictory declarations.
// This gate must see what was written, not what a parser was willing to forgive.

/** The `<html …>` opening tags in a document. Not "the first" — the count is a finding. */
const rootTagsOf = (html) => [...html.matchAll(/<html\b([^>]*)>/gi)].map((m) => m[1]);

/** Every `dir` attribute in an attribute string, in source order, values unfolded. */
const dirAttrsOf = (attrs) =>
  [...attrs.matchAll(/\bdir\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>=`]+))/gi)]
    .map((m) => m[1] ?? m[2] ?? m[3]);

/** A `dir` on <body>, which re-establishes direction for the entire rendered document. */
const bodyDirOf = (html) => {
  const m = /<body\b([^>]*)>/i.exec(html);
  return m ? dirAttrsOf(m[1]) : [];
};

// HTML folds `dir` values ASCII-case-insensitively, so `RTL` is `rtl`. The raw form is
// kept for the report — a reader chasing a finding needs the bytes that are on the page.
const fold = (v) => v.trim().toLowerCase();

// --- Run. ----------------------------------------------------------------------------
const index = createRenderIndex(dist, { pages });

const findings = [];      // blocking: rendered direction contradicts the declaration
const structural = [];    // blocking: the document does not declare a direction legibly
const shapes = new Map(); // locale -> { explicit, implicit, effective: Set }

const record = (loc, form, effective) => {
  let s = shapes.get(loc);
  if (!s) shapes.set(loc, (s = { explicit: 0, implicit: 0, effective: new Set() }));
  s[form]++;
  s.effective.add(effective);
};

let scanned = 0;
let unattributed = 0;

for (const page of index.pages) {
  const loc = localeOf(page.key);
  // A route outside the localized corpus has no declared direction to be checked against.
  // Counted and reported rather than skipped in silence — "nothing to check" and "nothing
  // checked" print identically otherwise, and only one of them is fine.
  if (loc === null || !(loc in DECLARED)) { unattributed++; continue; }

  const declared = DECLARED[loc];
  const html = page.html;
  const roots = rootTagsOf(html);
  scanned++;

  if (roots.length !== 1) {
    structural.push({
      loc, url: page.url, declared,
      reason: roots.length === 0
        ? 'no <html> element — the document declares no root direction'
        : `${roots.length} <html> elements — which one establishes direction is undefined`,
    });
    continue;
  }

  const dirs = dirAttrsOf(roots[0]);
  if (dirs.length > 1) {
    structural.push({
      loc, url: page.url, declared,
      reason: `<html> carries ${dirs.length} dir attributes (${dirs.map((d) => JSON.stringify(d)).join(', ')}) — a parser keeps the first and drops the rest, so the page ships a direction no reader can predict`,
    });
    continue;
  }

  let effective;
  let form;
  if (dirs.length === 0) {
    // The root element's missing-value default. This is a legal way to declare `ltr` and
    // the majority shape on this host; it is only a defect when the locale reads rtl.
    effective = 'ltr';
    form = 'implicit';
  } else {
    const value = fold(dirs[0]);
    if (!DIRECTIONS.includes(value)) {
      structural.push({
        loc, url: page.url, declared,
        reason: `<html dir=${JSON.stringify(dirs[0])}> is not a declared direction — expected ${DIRECTIONS.join(' or ')}`
          + (value === 'auto' ? '. `auto` defers direction to the bidi algorithm per document, so the locale\'s declaration is not what renders' : ''),
      });
      continue;
    }
    effective = value;
    form = 'explicit';
  }

  // <body dir> re-establishes direction for everything a reader sees. It is the one other
  // element that can invert a whole page, so a body direction contradicting the root is a
  // direction defect and not a layout opinion. Scope stops here: no descendant is read.
  const body = bodyDirOf(html).map(fold).filter((v) => DIRECTIONS.includes(v));
  if (body.length && body[body.length - 1] !== effective) {
    structural.push({
      loc, url: page.url, declared,
      reason: `<html> establishes ${effective} and <body dir="${body[body.length - 1]}"> overrides it — the rendered document reads ${body[body.length - 1]}`,
    });
    continue;
  }

  record(loc, form, effective);
  if (effective !== declared) findings.push({ loc, url: page.url, declared, effective, form });
}

// --- Report. -------------------------------------------------------------------------
const renderFinding = (f) =>
  `Route:     ${f.url}\n` +
  `Locale:    ${f.loc}\n` +
  `Declared:  ${f.declared}   (${host.direction.describe()})\n` +
  `Rendered:  ${f.effective}   (${f.form === 'implicit' ? 'no dir attribute on <html>, which reads as ltr' : `<html dir="${f.effective}">`})\n`;

const renderStructural = (s) =>
  `Route:     ${s.url}\n` +
  `Locale:    ${s.loc}\n` +
  `Declared:  ${s.declared}   (${host.direction.describe()})\n` +
  `Rendered:  ${s.reason}\n`;

if (structural.length) {
  console.error(`\ngate-4k: ${structural.length} page(s) do not declare a direction legibly\n`);
  for (const s of structural) console.error(renderStructural(s));
}

if (findings.length) {
  // Grouped by locale: 77 pages of one locale is ONE defect in a shared layout, and
  // printing it 77 times buries the second locale underneath the first.
  const byLocale = new Map();
  for (const f of findings) {
    if (!byLocale.has(f.loc)) byLocale.set(f.loc, []);
    byLocale.get(f.loc).push(f);
  }
  console.error(`\ngate-4k: ${findings.length} page(s) render against their locale's declared direction\n`);
  for (const [loc, list] of byLocale) {
    console.error(renderFinding(list[0]));
    if (list.length > 1) {
      console.error(`           …and ${list.length - 1} further ${loc} page(s), the whole locale:`);
      for (const f of list.slice(1, 6)) console.error(`             ${f.url}`);
      if (list.length > 6) console.error(`             … (${list.length - 6} more)`);
      console.error('');
    }
  }
}

if (structural.length || findings.length) {
  console.error(
    `Direction is declared once, in ${host.direction.describe()}, and must reach <html> from there.\n` +
      'Fix the locale\'s declaration if it is wrong, or the path that renders it if the\n' +
      'declaration is right — never by writing a direction into a page or branching on a\n' +
      'locale code, which is the defect this gate exists to catch.\n'
  );
  process.exit(1);
}

// --- Success. ------------------------------------------------------------------------
//
// The per-locale shape is printed ON SUCCESS, not only on failure, for the reason gate 4j
// prints its exemption set: a corpus fact nobody ever reads is how a silent change becomes
// invisible. A locale switching from implicit to explicit `dir` is not a defect and must
// not block — but it is a change in how direction reaches the page, and it should be
// visible in the diff of a green run.
const codes = Object.keys(DECLARED).filter((c) => shapes.has(c));
const rtl = codes.filter((c) => DECLARED[c] === 'rtl');
const mixed = codes.filter((c) => shapes.get(c).explicit > 0 && shapes.get(c).implicit > 0);

console.log(
  `gate-4k: ✔ ${scanned} pages across ${codes.length} locales — every page renders its declared direction` +
    (rtl.length ? `; ${rtl.length} rtl locale(s): ${rtl.map((c) => `"${c}"`).join(', ')}` : '; no rtl locale registered')
);
for (const c of codes) {
  const s = shapes.get(c);
  const forms = [s.explicit && `${s.explicit} explicit`, s.implicit && `${s.implicit} implicit`].filter(Boolean).join(' + ');
  console.log(`         ${c.padEnd(3)} ${DECLARED[c]}  ${String(s.explicit + s.implicit).padStart(4)} pages  (${forms})`);
}
if (unattributed) {
  console.log(`         ${unattributed} page(s) outside the localized corpus — no declared direction to check`);
}
if (mixed.length) {
  // Advisory by construction. Both forms render the same direction, so blocking would be
  // the gate inspecting implementation strategy, which its own contract forbids. But two
  // forms within one locale mean two code paths build the root element, and that is worth
  // seeing before one of them stops agreeing with the registry.
  console.log(
    `         ⚠ ${mixed.length} locale(s) render direction in both forms: ${mixed.join(', ')} — ` +
      'the direction is correct in both; two shapes mean two paths to <html>'
  );
}
