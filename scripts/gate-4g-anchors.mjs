// scripts/gate-4g-anchors.mjs — Gate 4g: advisory anchor audit (P38).
// Origin: review item B4, and the governing rule of the framework — block only
// where a correct value is enumerable; everything else reports counts.
//
// THIS GATE IS ADVISORY. It never fails a build. Exit 0 is the only content
// outcome; exit 2 means the gate could not run at all (missing input, unparseable
// config), never that the corpus is wrong. That is not timidity, it is B4's
// measurement: 597 correct English anchors against 55 genuine corrections in `ja`
// alone. A blocking anchor check would fail on proper nouns indefinitely and would
// be switched off within a week, which is the failure mode the methodology section
// warns about explicitly.
//
// WHAT IT IS NOT. It never translates, never proposes a replacement, never compares
// an anchor against an "expected" translation, and never decides that an anchor is
// wrong. It classifies and counts. Every group it prints is a group a reviewer reads,
// including the group that is almost entirely correct — because "these 597 are the
// approved identities" is itself the finding that made B4 decidable.
//
// WHY TWO INDEPENDENT SIGNALS. Neither one is sufficient, and the two fail in
// opposite directions:
//
//   marker   — the anchor's residue contains an English token frozen as absent from
//              this locale. A regression signal: it necessarily reports zero on the
//              corpus it was derived from, and its blind spot is a defect that was
//              already present at freeze time, whose own tokens self-excluded from
//              the marker set. That blind spot is not hypothetical — it is exactly
//              how gate 4f missed A9.
//   identity — the anchor is byte-identical to an anchor the English corpus uses for
//              the same destination. Non-zero today, and it sees precisely what the
//              marker signal cannot, because a defect present at freeze time is still
//              identical to its English source. Its blind spot is the opposite one:
//              a legitimately identical proper noun looks the same as an untranslated
//              phrase, which is why the identity registry is subtracted first and why
//              nothing here blocks.
//
// The identity registry is subtracted before either signal is read, so `Dinosaur
// National Monument` reports as an approved identity rather than as English text.
// Its authority is i18n-gates/4f-headings.json `licensed.global`, unioned with this
// gate's anchor-surface additions — one frozen proper-noun registry for the
// repository, not two that can drift apart.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripNonRendered, flattenElementText, foldPunctuation } from './lib/rendered-text.mjs';
import { createRenderIndex } from './lib/render-index.mjs';
import { resolveHost } from './lib/host-adapter.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Overridable inputs let the gate be exercised against a scratch corpus and a scratch
// registry without touching the repository (P38 phase 4).
const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--'));
// `--config` and `--licensed` are GONE as of F5 Phase 2. They resolved policy paths in
// this gate — `join(root, 'i18n-gates', …)` against the FRAMEWORK root — which is the
// coupling the phase removes. Their scratch-testing purpose is fully served by
// `--manifest`, which points at a host whose own policy section names whatever files the
// test needs. One seam, at the boundary, instead of one per artifact.
//
// `--i18n` is no longer resolved here: where the locale registry lives is host shape, and
// this gate is not permitted to know it. The flag is passed through to the adapter, which
// is the only component that may turn it into a path.
//
// `--manifest` is its necessary companion. The adapter checks the manifest's locale set
// against the registry's on every run, so a scratch registry with a different locale set
// is DRIFT unless a scratch manifest describes it. Without this flag, `--i18n` alone
// could only ever point at a registry identical to the real one, which is not a test.
const I18N_OVERRIDE = flag('--i18n');
const MANIFEST_OVERRIDE = flag('--manifest');

const rel = (p) => relative(root, p).split(sep).join('/');

// Missing inputs are exit 2, never a silent pass — the ja UI-chrome fail-open lesson
// (handoff §7, Gate 4a): that locale shipped 57 pages of English chrome precisely
// because an absent dictionary degraded quietly instead of failing. An advisory gate
// that cannot run must say so; silently reporting "0 candidates" would be worse than
// blocking, because it reads as a clean corpus.
let host;
try {
  host = resolveHost({ registryModule: I18N_OVERRIDE, manifestPath: MANIFEST_OVERRIDE });
} catch (e) {
  console.error(`gate-4g: ${e.message}`);
  process.exit(2);
}

// The positional override survives for scratch corpora; the DEFAULT is now the host's
// declared output (manifest §3) rather than `join(root, 'dist')` — F5 Phase 5, C-2.
// What counts as a page comes from `routes.pageGlob` as of F5 Phase 6 — including for a
// scratch corpus, which is rendered by the same host and therefore has the same shape.
let dist, pages;
try {
  dist = positional[0] ? resolve(positional[0]) : host.routes.output;
  pages = host.routes.pages;
} catch (e) {
  console.error(`gate-4g: rendered output ${e.message} — refusing to pass silently.`);
  process.exit(2);
}

let config, licensedCfg;
try {
  config = host.policy.load('anchors');
} catch (e) {
  console.error(
    e.kind === 'invalid'
      ? `gate-4g: config ${e.message}`
      : `gate-4g: config ${e.message} — refusing to report silently.`
  );
  process.exit(2);
}
try {
  // C-7: 4g reads 4f's licensed.global deliberately — one frozen proper-noun registry
  // for the repository, not two that can drift apart. Now resolved through the same
  // manifest as everything else, so the cross-read cannot reach another host's copy.
  licensedCfg = host.policy.load('headings');
} catch (e) {
  console.error(
    e.kind === 'invalid'
      ? `gate-4g: ${host.policy.describe('headings')} ${e.message}`
      : `gate-4g: 4f licensed registry ${e.message} — refusing to report silently.`
  );
  process.exit(2);
}

if (!existsSync(dist)) {
  console.error('gate-4g: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

// --- Registered locales come from the host adapter, so a new language cannot reach
//     production without either an entry here or a deliberate exit 2. Resolved once,
//     above, alongside the policy it governs. ---
const LOCALE_CODES = host.localeCodes;
const DEFAULT_LOCALE = host.defaultLocale;
const TARGETS = host.targets;
if (!TARGETS.length) {
  console.error(`gate-4g: ${host.diagnostics.noTargets}`);
  process.exit(2);
}
for (const loc of TARGETS) {
  if (!config.locales?.[loc]) {
    console.error(
      `gate-4g: locale "${loc}" is registered by the host but has no entry in ${host.policy.describe('anchors')} — refusing to report silently.`
    );
    process.exit(2);
  }
}
const REPEAT = config.repeatThreshold ?? 5;

// ---------------------------------------------------------------------------
// Phase 1 — anchor extraction.
//
// Visible text only. Non-rendered regions go first so their contents can never
// reach the corpus; `<svg>` and `aria-hidden` spans go next, because an icon
// glyph or a decorative arrow is not anchor text a reader reads — and the
// corpus does carry them, inside links (`tdg-arrow`, `gr-arrow`).
//
// Unlike gates 4h and 4i this extractor does NOT need the inline/block
// distinction: an anchor is already the unit of extraction, so there is no seam
// to preserve or fabricate. Every tag inside `<a>` collapses to a space and the
// result is whitespace-normalised, which is what makes an anchor split across
// `<strong>` compare equal to the same anchor written flat.
// ---------------------------------------------------------------------------
// Gate 4g decodes numeric references, which the prose gates do not need to do: they
// scan prose, and prose does not carry `&#128222;`. Anchor text does — the phone and
// gallery links render their icons as numeric entities, and left encoded they arrive
// as the letter-bearing string `#128222;` and classify as English text. The narrower
// named pattern is 4g's own too: it matches `[a-z]+` only, so the union table's
// numeric keys are unreachable from here rather than merely unused.
const ANCHOR_TEXT = { numeric: true, namedPattern: /&([a-z]+);/gi, nfc: true };

// Curly punctuation is folded to ASCII so a registered identity matches whether the
// page renders `Doc's Beach` or `Doc’s Beach` (the 4f normalisation, shared).
const normalize = foldPunctuation;

function anchorsOf(html) {
  const body = stripNonRendered(html)
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<span\b[^>]*aria-hidden\s*=\s*"true"[^>]*>[\s\S]*?<\/span>/gi, ' ');
  const out = [];
  // Nesting an <a> inside an <a> is invalid HTML, so a non-greedy match is exact.
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attrs = m[1];
    if (/\bhidden\b|aria-hidden\s*=\s*"true"|sr-only|visually-hidden/i.test(attrs)) continue;
    const href = attrs.match(/href\s*=\s*"([^"]*)"/i)?.[1] ?? '';
    const text = flattenElementText(m[2], ANCHOR_TEXT);
    if (text) out.push({ href, text });
  }
  return out;
}

const index = createRenderIndex(dist, { pages });

/** English anchor text, indexed by destination — the identity signal's reference set. */
const enByHref = new Map();
/** loc -> Map(anchor text -> {n, pages:Set, hrefs:Set}) */
const byLocale = new Map();

for (const page of index.pages) {
  const seg = page.key.split('/')[0]; // the index states route identity; the locale rule is this gate's
  const loc = TARGETS.includes(seg) ? seg : DEFAULT_LOCALE;
  const url = page.url;
  for (const a of page.derive('anchors', anchorsOf)) {
    if (loc === DEFAULT_LOCALE) {
      if (!a.href.startsWith('/')) continue;
      if (!enByHref.has(a.href)) enByHref.set(a.href, new Set());
      enByHref.get(a.href).add(a.text);
      continue;
    }
    if (!byLocale.has(loc)) byLocale.set(loc, new Map());
    const m = byLocale.get(loc);
    const e = m.get(a.text) ?? { n: 0, pages: new Set(), hrefs: new Set() };
    e.n++; e.pages.add(url); e.hrefs.add(a.href);
    m.set(a.text, e);
  }
}

// ---------------------------------------------------------------------------
// Phase 2 — classification. Data-driven; no group is decided by a string test
// written in this file.
// ---------------------------------------------------------------------------
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const identitiesFor = (loc) => [
  ...(licensedCfg.licensed?.global ?? []),
  ...(licensedCfg.licensed?.[loc] ?? []),
  ...(config.identities?.global ?? []),
  ...(config.identities?.[loc] ?? []),
].filter((s) => typeof s === 'string' && s).map(normalize)
 .sort((a, b) => b.length - a.length); // longest-first, so a full name wins over its head

/** Remove every registered identity as a whole phrase; what survives is the residue. */
function residueOf(text, identities) {
  let s = text;
  for (const phrase of identities) s = s.replace(new RegExp(escapeRe(phrase), 'gi'), ' ');
  return normalize(s);
}

const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/u;
// Letters only, never digits: a phone number, a price or an emoji carries no language,
// so it is neither an approved identity nor a candidate — it is simply not anchor
// *text* in the sense this gate is about.
const LETTER = /\p{L}/u;
const TOKEN = /[a-z][a-z'-]{2,}/g;          // marker lookup — lowercased, 3+ chars
const RAW_TOKEN = /[\p{L}][\p{L}'’-]*/gu;   // case preserved, for the shape test

/**
 * A residue carrying a word that starts lowercase is a descriptive English phrase,
 * not a name: `Ultimate Guide to`, `things to do in`, `weather`. A residue whose
 * words are all capitalised is name-shaped: `State Park`, `Home`, `Guides`.
 *
 * This distinguishes *shape*, not correctness — `Guides` is name-shaped and correct
 * French, `Home` is name-shaped and correct Italian chrome, and one of them is also
 * a hardcoded English string on two `zh` pages. The gate reports the shape and lets
 * a reviewer decide, which is the whole reason it does not block.
 */
const hasLowercaseWord = (residue) =>
  (residue.match(RAW_TOKEN) ?? []).some((w) => w.length > 1 && /^[\p{Ll}]/u.test(w));

const stripLocale = (href, loc) => (href.startsWith(`/${loc}/`) ? href.slice(loc.length + 1) : href);

const GROUPS = ['approved-identity', 'mixed-language', 'probable-untranslated', 'proper-noun'];

const report = {};
for (const loc of TARGETS) {
  const entry = config.locales[loc];
  const identities = identitiesFor(loc);
  const markers = new Set(entry.markers ?? []);
  const nativeMarkers = new Set(entry.nativeMarkers ?? []);
  const anchors = byLocale.get(loc) ?? new Map();

  const rows = [];
  let total = 0, latin = 0;

  for (const [text, e] of anchors) {
    total += e.n;
    const hasCJK = CJK.test(text);
    if (!hasCJK) latin += e.n;

    // A letterless anchor — a phone number, an icon, a bare price — carries no
    // language at all. Counted in the totals, classified in no group.
    if (!LETTER.test(text)) continue;

    const residue = residueOf(text, identities);

    // --- Signal 1: the residue names an English token frozen as absent here. ---
    const markerHits = [...new Set(residue.toLowerCase().match(TOKEN) ?? [])].filter((w) => markers.has(w));

    // --- Signal 2: this exact anchor is what English uses for this destination. ---
    let identical = false;
    for (const href of e.hrefs) {
      if (!href.startsWith(`/${loc}/`)) continue;
      if (enByHref.get(stripLocale(href, loc))?.has(text)) { identical = true; break; }
    }

    // --- Structural fact: is there target-language content in this anchor at all? ---
    const native = entry.script === 'latin'
      ? (text.toLowerCase().match(TOKEN) ?? []).some((w) => nativeMarkers.has(w))
      : hasCJK;

    // Anchors with no English evidence of any kind are the locale doing its job.
    // For a non-Latin locale, Latin-only text is itself the evidence (B4's own test);
    // for a Latin locale there is no script signal, so a marker or identity is required.
    const inScope = entry.script === 'latin'
      ? markerHits.length > 0 || identical
      : !hasCJK || markerHits.length > 0;
    if (!inScope) continue;

    // Residue with no letters left is fully accounted for by the identity registry.
    const group = !LETTER.test(residue)
      ? 'approved-identity'
      : native
        ? 'mixed-language'
        : hasLowercaseWord(residue) || markerHits.length
          ? 'probable-untranslated'
          : 'proper-noun';

    rows.push({
      text, residue, group,
      occurrences: e.n,
      pages: e.pages.size,
      href: [...e.hrefs].sort()[0],
      sample: [...e.pages].sort()[0],
      evidence: [markerHits.length ? `marker: ${markerHits.join(', ')}` : null, identical ? 'identical to English anchor for the same destination' : null]
        .filter(Boolean),
    });
  }

  // Deterministic order: group, then occurrences desc, then text — so two runs on the
  // same corpus produce byte-identical output regardless of filesystem enumeration.
  rows.sort((a, b) =>
    GROUPS.indexOf(a.group) - GROUPS.indexOf(b.group) ||
    b.occurrences - a.occurrences ||
    a.text.localeCompare(b.text, 'en'));

  report[loc] = { total, latin, rows };
}

// ---------------------------------------------------------------------------
// Phase 3 — reporting. Distinct strings, with counts; never a per-occurrence dump.
// B4's product was a decidable table, not 652 lines.
// ---------------------------------------------------------------------------
const LABEL = {
  'approved-identity': 'Approved identities',
  'proper-noun': 'Probable proper nouns (name-shaped, not in the registry)',
  'mixed-language': 'Mixed-language anchors',
  'probable-untranslated': 'Probable untranslated anchors',
};
const CAP = 60;

const out = [];
const say = (s = '') => out.push(s);

say('');
say('gate-4g: advisory anchor audit — reports only, never blocks');
say('');

const totals = { anchors: 0, latin: 0, approved: 0, candidates: 0, repeated: 0 };

for (const loc of TARGETS) {
  const r = report[loc];
  const byGroup = {};
  for (const row of r.rows) (byGroup[row.group] ??= []).push(row);

  const approved = byGroup['approved-identity'] ?? [];
  const candidates = r.rows.filter((x) => x.group !== 'approved-identity');
  const repeated = candidates.filter((x) => x.pages >= REPEAT);

  totals.anchors += r.total;
  totals.latin += r.latin;
  totals.approved += approved.length;
  totals.candidates += candidates.length;
  totals.repeated += repeated.length;

  say(`Locale: ${loc}`);
  say('');
  say(`  Anchors scanned:      ${r.total}`);
  say(`  Latin-script anchors: ${r.latin}`);
  say(`  Approved identities:  ${approved.length} distinct (${approved.reduce((a, x) => a + x.occurrences, 0)} occurrences)`);
  say(`  Review candidates:    ${candidates.length} distinct (${candidates.reduce((a, x) => a + x.occurrences, 0)} occurrences)`);
  say('');

  for (const g of GROUPS) {
    const rows = byGroup[g] ?? [];
    if (!rows.length) continue;
    say(`  ${LABEL[g]} — ${rows.length}`);
    for (const row of rows.slice(0, CAP)) {
      say(`    ${String(row.occurrences).padStart(4)}× ${String(row.pages).padStart(3)}p  ${row.text}`);
      if (g !== 'approved-identity') {
        if (row.residue !== row.text) say(`             residue: ${row.residue}`);
        for (const ev of row.evidence) say(`             ${ev}`);
        say(`             e.g. ${row.sample} → ${row.href}`);
      }
    }
    if (rows.length > CAP) say(`    … and ${rows.length - CAP} more (report capped at ${CAP} per group)`);
    say('');
  }

  // Cross-cutting view, not a sixth exclusive class: a candidate string on this many
  // distinct pages is systemic — a template, chrome, or a house loanword — and is
  // decided once for the whole site rather than page by page.
  if (repeated.length) {
    say(`  Repeated English phrases (≥${REPEAT} pages; cross-cutting view of the groups above) — ${repeated.length}`);
    for (const row of repeated.slice(0, CAP)) {
      say(`    ${String(row.occurrences).padStart(4)}× ${String(row.pages).padStart(3)}p  ${row.text}   [${row.group}]`);
    }
    if (repeated.length > CAP) say(`    … and ${repeated.length - CAP} more`);
    say('');
  }
}

say(
  `gate-4g: ✔ ${totals.anchors} anchors across ${TARGETS.length} locales — ` +
  `${totals.approved} approved identities, ${totals.candidates} review candidates ` +
  `(${totals.repeated} repeated). Advisory: nothing here fails a build.`
);
say('');
say('  A candidate is a question, not a defect. B4 measured 597 correct English anchors');
say('  against 55 genuine corrections, so this gate reports shape and count and leaves');
say('  every judgement to a reviewer. Confirming one as correct means adding it to');
say(`  "identities" in ${host.policy.describe('anchors')}; confirming one as drift means a corpus-wide sweep`);
say('  per Gate 4c, never a file-by-file edit.');
say('');

console.log(out.join('\n'));
process.exit(0);
