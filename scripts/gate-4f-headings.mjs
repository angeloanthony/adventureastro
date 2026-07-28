// scripts/gate-4f-headings.mjs — Gate 4f: untranslated heading detection (P35).
// Origin: review item A5, where one shipped German file carried 17 English
// headings above fully fluent German prose. Build, validator and every audit
// passed; only a human reading every heading caught it.
//
// INVARIANT. Every heading on a localized page is in the target language unless
// explicitly licensed.
//
// WHAT THIS GATE IS NOT. It does no language detection (no statistical
// classifier, no n-gram model) and it never compares a localized page against
// its English counterpart. Both were ruled out deliberately: a classifier gives
// probabilistic verdicts that cannot be argued with in review, and cross-page
// comparison asserts the wrong invariant — a heading legitimately identical to
// English (`Leave No Trace`, `Doc's Beach`) is indistinguishable from a heading
// nobody translated. Neither yields an enumerable correct value, which the
// program's governing rule requires of any BLOCKING gate.
//
// WHAT IT DOES INSTEAD. It tests one enumerable proposition per locale: "these
// specific English words must never appear in a heading of this locale." That
// word list is data, in i18n-gates/4f-headings.json — this file contains no
// string tests. See the $doc block in that config for how the list was derived
// and why it is frozen rather than recomputed.
//
// HONEST LIMITS. The marker list was derived from the current corpus, so it
// necessarily reports zero findings on that corpus — A5 was fixed in P14 and no
// other instance is known. This is a REGRESSION gate: its value is what it
// catches tomorrow, and it was validated by re-injecting the real A5 headings,
// where it fires on 13 of 15 — the two it passes being exactly the two A5/A6
// licensed (`Leave No Trace`, `Backcountry Camping`). It will not catch an
// untranslated heading built only from words already used in that locale.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stripNonRendered, flattenElementText, foldPunctuation } from './lib/rendered-text.mjs';
import { createRenderIndex } from './lib/render-index.mjs';
import { resolveHost } from './lib/host-adapter.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const CONFIG = join(root, 'i18n-gates', '4f-headings.json');

// Missing config is exit 2, never a silent pass — the ja UI-chrome fail-open
// lesson (handoff §7, Gate 4a): that locale shipped 57 pages of English chrome
// precisely because an absent dictionary degraded quietly instead of failing.
if (!existsSync(CONFIG)) {
  console.error(`gate-4f: config not found at ${relative(root, CONFIG)} — refusing to pass silently.`);
  process.exit(2);
}
if (!existsSync(dist)) {
  console.error('gate-4f: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

let config;
try {
  config = JSON.parse(readFileSync(CONFIG, 'utf8'));
} catch (e) {
  console.error(`gate-4f: config is not valid JSON — ${e.message}`);
  process.exit(2);
}

// --- Registered locales come from the host adapter, so a new language cannot reach
//     production without either a marker list or a deliberate exit 2.
//
//     F4 Phase 1: the regex that used to live here — /LOCALES\s*=\s*\[…\]\s*as const/
//     over src/lib/i18n.ts — was one of three byte-identical copies. Where the registry
//     lives and how it is written is host shape, and this gate is no longer permitted
//     to know either. ---
let host;
try {
  host = resolveHost();
} catch (e) {
  console.error(`gate-4f: ${e.message}`);
  process.exit(2);
}
const LOCALE_CODES = host.localeCodes;
const DEFAULT_LOCALE = host.defaultLocale;
const TARGETS = host.targets;

for (const loc of TARGETS) {
  if (!config.locales?.[loc]) {
    console.error(`gate-4f: locale "${loc}" is registered by the host but has no entry in ${relative(root, CONFIG)} — refusing to pass silently.`);
    process.exit(2);
  }
}

// --- Normalization. Curly punctuation is folded to ASCII so a licensed phrase
//     matches whether the page renders `Doc's Beach` or `Doc’s Beach`. ---
const normalize = foldPunctuation;

// Gate 4f reads headings, which are prose: no numeric references to decode, and no
// NFC pass — headings are compared against a Latin-script marker lexicon, not a CJK
// corpus. Both are stated here rather than assumed by the primitive.
const HEADING_TEXT = { numeric: false, nfc: false };

const TOKEN = /[a-z][a-z'-]{2,}/g;

// --- Phase 1: heading discovery from rendered HTML. ---
const index = createRenderIndex(dist);

/** Strip regions whose text is not rendered prose, then pull h1–h6. */
function headingsOf(html) {
  const body = stripNonRendered(html);
  const out = [];
  for (const m of body.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)) {
    const attrs = m[2];
    // Visually-hidden headings are navigation scaffolding, not display copy.
    if (/\bhidden\b|aria-hidden\s*=\s*"true"|sr-only|visually-hidden/i.test(attrs)) continue;
    const text = flattenElementText(m[3], HEADING_TEXT);
    if (text) out.push({ level: +m[1], text });
  }
  return out;
}

// --- Phases 2+3: licensed spans are removed, then the residue is tokenized. ---
const licensedFor = (loc) => [
  ...(config.licensed?.global ?? []),
  ...(config.licensed?.[loc] ?? []),
].map(normalize).sort((a, b) => b.length - a.length); // longest-first

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function residueOf(text, licensed) {
  let s = text;
  for (const phrase of licensed) {
    if (!phrase) continue;
    s = s.replace(new RegExp(escapeRe(phrase), 'gi'), ' ');
  }
  return s;
}

// --- Run. ---
const blocking = [];
const advisory = [];
let scanned = 0;

for (const page of index.pages) {
  const seg = page.key.split('/')[0]; // the index states route identity; the locale rule is this gate's
  if (!TARGETS.includes(seg)) continue; // English pages are out of scope by definition
  const loc = seg;
  const entry = config.locales[loc];
  const markers = new Set(entry.markers ?? []);
  const licensed = licensedFor(loc);
  const url = page.url;

  for (const h of page.derive('headings', headingsOf)) {
    scanned++;
    const hits = [...new Set(residueOf(h.text, licensed).toLowerCase().match(TOKEN) ?? [])]
      .filter((w) => markers.has(w));
    if (!hits.length) continue;
    const finding = { loc, url, level: h.level, text: h.text, hits };
    (entry.state === 'complete' ? blocking : advisory).push(finding);
  }
}

// --- Phase 4: reporting. ---
const render = (f) =>
  `Locale: ${f.loc}\nPage: ${f.url}\n\nUnexpected English heading:\n  <h${f.level}> "${f.text}"\n` +
  `  English marker${f.hits.length > 1 ? 's' : ''}: ${f.hits.join(', ')}\n\n` +
  `Expected:\n  localized heading or licensed exception\n`;

if (advisory.length) {
  console.warn(`\ngate-4f: ${advisory.length} finding(s) in in-progress locales (advisory)\n`);
  for (const f of advisory) console.warn(render(f));
}

if (blocking.length) {
  console.error(`\ngate-4f: ${blocking.length} untranslated heading(s)\n`);
  for (const f of blocking) console.error(render(f));
  console.error(
    'Localize the heading, or — if it is a proper noun or a locked programme name —\n' +
      `add it to "licensed" in ${relative(root, CONFIG).split(sep).join('/')}.\n`
  );
  process.exit(1);
}

console.log(
  `gate-4f: ✔ ${scanned} headings across ${TARGETS.length} locales — no untranslated headings` +
    (advisory.length ? ` (${advisory.length} advisory)` : '')
);
