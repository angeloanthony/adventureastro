// scripts/gate-4q-numeral-render.mjs — Gate 4q: the rendered numeral check
// (AR-2 B-10b / ADR-8 §2.1, Track D D-3).
//
// INVARIANT. No rendered page carries an Arabic-Indic or Eastern Arabic-Indic digit in
// its visible text. The corpus-wide numeral policy is Western digits
// (docs/rtl/AR1-arabic-policy.md §3); gate 4p turns that policy into an enforced one at
// the REGISTRY, and this gate turns it into an enforced one in the RENDERED PROSE.
//
// WHY BOTH GATES EXIST, AND WHY NEITHER SHRINKS THE OTHER.
// 4p asserts that every locale's `intl` tag resolves to numbering system `latn`, so no
// value formatted through `Intl` can acquire Arabic-Indic digits from a registry edit. A
// translator who types `٢٠٢٦` straight into a dictionary value never passes through
// `Intl` and is invisible to 4p — the string is authored, not formatted. That is a
// rendered-text question, it is decidable only after `astro build`, and it is this gate's
// entire subject. The two checks share a policy and share no mechanism.
//
// FORBIDDEN RANGE, NEVER A COUNTED FLOOR. Today's corpus contains zero occurrences. A
// floor derived from that measurement would be a floor of zero — "a lock that can never
// fail", which is the defect the 4i `$doc` already records against the `Key Takeaways`
// lock. So the rule is: ANY occurrence is a violation. The zero is the measurement
// window's answer and is printed as such (see the population table), never wired in as
// the rule's parameter.
//
// WHY IT READS EXTRACTED TEXT AND NOT `dist/` BYTES. This is the C7 lesson, arriving
// from two directions at once, and it is the whole reason this gate is not a `grep`:
//
//   1. A raw-HTML instrument measures the DOCUMENT, not the prose. The Arabic pilot page
//      carries 465 ASCII digits in markup, CSS and JSON-LD, none of which a reader sees.
//      Inline markup also splits what a reader reads as one run — a digit inside
//      `<strong>٢٠٢٦</strong>` is prose, and any instrument that cannot see through the
//      tag is measuring the wrong text. This gate composes the same extractor gates 4h
//      and 4i use, at the same `inlineSeparator: ''` setting, so what it scans is what a
//      reader reads.
//   2. A raw BYTE walk hits binary assets. Measured on this corpus: `[٠-٩۰-۹]` matches
//      224 of 224 image files on compressed bytes — 208 `.webp`, 9 `.jpg`, 5 `.png`, 1
//      `.jpeg`, 1 `.ico`. Every one is a false positive. They are excluded here BY
//      DESIGN and not by post-processing: the traversal takes the host's own
//      `routes.pageGlob` predicate, so a non-page file is never opened in the first
//      place. There is no filter to forget to apply.
//
// SCOPE, STATED SO A GREEN RUN IS NOT OVER-READ. The unit is visible text. Attribute
// values (`alt`, `title`, `content`), `<script>`/`<style>` bodies and JSON-LD are outside
// it, exactly as they are for 4h and 4i — they are not prose, and widening this gate to
// reach them would re-import the 465-ASCII-digit measurement problem the extractor
// exists to solve. Measured today: zero Arabic-Indic digits anywhere in `dist/` under
// the wider byte instrument too, so the limit has no live instances. It is a limit, not
// a hole, and it is recorded rather than implied.
//
// LOCALE SCOPE IS ALL NINE, BY OWNER DECISION D3 (docs/rtl/AR2-TrackD-decisions.md §4).
// A numbering-system rule is not Arabic-specific: the Eastern Arabic-Indic range
// `[۰-۹]` is Persian and Urdu, so any future locale in that family inherits the check
// for free, and the scan already walks every route.
//
// EXIT CODES. 2 for anything that prevents a verdict — an unresolvable host, undeclared
// routing, a missing `dist/`, or a registered locale with no rendered pages. That last
// one is the ja UI-chrome fail-open shape (handoff §7, Gate 4a) applied to this gate: a
// forbidden-range check over an empty corpus reports zero violations and has measured
// nothing, and the two must never print the same. 1 for a policy violation. 0 prints the
// per-locale population table, so the fact being certified — and the window it was taken
// through — is visible rather than implied.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { extractVisibleText, VISIBLE_TEXT_EXTRACTOR } from './lib/rendered-text.mjs';
import { createRenderIndex } from './lib/render-index.mjs';
import { resolveHost } from './lib/host-adapter.mjs';

// `--manifest` and `--i18n` exist for the reason gates 4g, 4i and 4k expose them: the
// fail-closed paths can only be exercised against a scratch host, and damaging the
// repository's own files to test a gate is a rehearsal, not a test. The dist positional
// is gate 4h's affordance and must be read AROUND the flags — `4q --manifest x` must not
// resolve `--manifest` as a corpus directory.
const argv = process.argv.slice(2);
const KNOWN = ['--manifest', '--i18n'];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith('--')) {
    if (!KNOWN.includes(a)) {
      console.error(`gate-4q: unknown option ${a} — known options are ${KNOWN.join(', ')}`);
      process.exit(2);
    }
    i++;
  }
}
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--'));

let host;
try {
  host = resolveHost({ manifestPath: flag('--manifest'), registryModule: flag('--i18n') });
} catch (e) {
  console.error(`gate-4q: ${e.message}`);
  process.exit(2);
}

let dist, pages, localeOf;
try {
  dist = positional[0] ? resolve(positional[0]) : host.routes.output;
  pages = host.routes.pages;
  localeOf = host.routes.localeOf;
} catch (e) {
  console.error(`gate-4q: rendered output ${e.message} — refusing to pass silently.`);
  process.exit(2);
}

if (!existsSync(dist)) {
  console.error('gate-4q: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

// --- The policy. ---------------------------------------------------------------------
//
// Written as explicit code-point ranges rather than as a character class of literal
// glyphs. `[٠-٩۰-۹]` is four RTL characters in a source file read left-to-right, and a
// reviewer cannot tell by looking whether the two ranges are the ones intended or whether
// an editor reordered them. The ranges below say what they are and are checkable against
// the Unicode tables without rendering the file.
//
// This is deliberately NOT `\p{Nd}` minus ASCII. That would additionally forbid
// Devanagari, Bengali, Thai and twenty more scripts none of which this corpus renders and
// none of which any decision has been taken about — config nothing measures, in the
// direction of over-reach. Widening the range is a separate item with its own decision.
const FORBIDDEN = [
  { name: 'Arabic-Indic', from: 0x0660, to: 0x0669 },
  { name: 'Extended Arabic-Indic', from: 0x06f0, to: 0x06f9 },
];
const NUMERAL_RE = new RegExp(
  `[${FORBIDDEN.map((r) => `\\u{${r.from.toString(16)}}-\\u{${r.to.toString(16)}}`).join('')}]`,
  'gu'
);
const rangeOf = (cp) => FORBIDDEN.find((r) => cp >= r.from && cp <= r.to);

// --- Extraction. ---------------------------------------------------------------------
//
// The extractor is the shared primitive; the argument is this gate's. `inlineSeparator:
// ''` is the C7 fix stated at the call site — inline tags are removed with NO separator,
// so `<strong>٢٠٢٦</strong>` re-joins into the run a reader actually sees. It is the same
// view gates 4h and 4i assert against, and its identity is printed on success so a reader
// knows which view produced the number.
const visibleText = (html) => extractVisibleText(html, { inlineSeparator: '' });

const index = createRenderIndex(dist, { pages });

const CODES = host.localeCodes;
const UNATTRIBUTED = '—';
const rows = new Map([...CODES, UNATTRIBUTED].map((c) => [c, { pages: 0, chars: 0, occ: 0 }]));
const findings = [];

for (const page of index.pages) {
  let loc = localeOf(page.key);
  // A route outside the localized corpus is still rendered output, so it is still
  // scanned — a forbidden-range rule that quietly skipped part of the corpus would be
  // narrower than the sentence it prints. It is counted separately because it has no
  // locale to be attributed to, not because it is exempt.
  if (loc === null || !CODES.includes(loc)) loc = UNATTRIBUTED;

  const text = page.derive('visibleText', visibleText);
  const row = rows.get(loc);
  row.pages++;
  row.chars += text.length;

  for (const m of text.matchAll(NUMERAL_RE)) {
    const cp = m[0].codePointAt(0);
    row.occ++;
    findings.push({
      loc,
      url: page.url,
      offset: m.index,
      char: m[0],
      cp,
      range: rangeOf(cp),
      context: text.slice(Math.max(0, m.index - 30), Math.min(text.length, m.index + 31)).trim(),
    });
  }
}

// --- Instrument failure: a locale the corpus does not contain. -----------------------
//
// Checked BEFORE the verdict, because it invalidates the verdict rather than adding to
// it. A registered locale with no rendered pages produces "0 occurrences" indistinguishable
// from a locale that was measured and is clean, and only one of those is a fact.
const unmeasured = CODES.filter((c) => rows.get(c).pages === 0);
if (unmeasured.length) {
  console.error('\ngate-4q: INSTRUMENT FAILURE — the rendered numeral check could not run\n');
  for (const c of unmeasured) {
    console.error(
      `  ✖ locale "${c}" is registered by the host but has no rendered page under ${dist} — ` +
        'a forbidden-range check over an empty corpus reports zero violations and has measured nothing'
    );
  }
  console.error(
    '\nZero pages is not zero violations. Build the locale, or remove it from the\n' +
      'registry — do not read this run as a pass.\n'
  );
  process.exit(2);
}

// --- Violations. ---------------------------------------------------------------------
if (findings.length) {
  const byLocale = new Map();
  for (const f of findings) {
    if (!byLocale.has(f.loc)) byLocale.set(f.loc, []);
    byLocale.get(f.loc).push(f);
  }
  console.error(
    `\ngate-4q: ${findings.length} rendered non-Western numeral(s) on ` +
      `${new Set(findings.map((f) => f.url)).size} page(s) across ${byLocale.size} locale(s)\n`
  );
  for (const [loc, list] of byLocale) {
    for (const f of list.slice(0, 5)) {
      // The code point is printed beside the character, and it is the load-bearing half:
      // an Arabic-Indic digit inside RTL prose reorders in a terminal, so the glyph alone
      // is not something a reader can act on. `U+0662` is unambiguous in any direction.
      console.error(
        `Locale:    ${f.loc}\n` +
          `Route:     ${f.url}\n` +
          `Character: "${f.char}"  U+${f.cp.toString(16).toUpperCase().padStart(4, '0')}  (${f.range.name})\n` +
          `Offset:    ${f.offset} in the page's visible text\n` +
          `Rendered:  "…${f.context}…"\n`
      );
    }
    if (list.length > 5) console.error(`           … and ${list.length - 5} further occurrence(s) in "${loc}"\n`);
  }
  console.error(
    'The corpus-wide numeral policy is Western digits (docs/rtl/AR1-arabic-policy.md §3).\n' +
      'These digits are AUTHORED, not formatted — they were typed into a source string, so\n' +
      'gate 4p cannot see them and no registry change will remove them. Fix the dictionary\n' +
      'value or the content file; do not add an exception, because the policy has none.\n'
  );
  process.exit(1);
}

// --- Success. ------------------------------------------------------------------------
//
// The population table is printed ON SUCCESS for the reason gate 4k prints its per-locale
// shape and 4p prints its resolved tags: a corpus fact nobody reads is how a silent
// change becomes invisible. `chars` is the measurement WINDOW, and it is here because
// this gate's answer is a zero — a zero over 1 page and a zero over 77 are the same
// number and not the same fact, and only the window tells them apart in a green diff.
const totalPages = [...rows.values()].reduce((a, r) => a + r.pages, 0);
console.log(
  `gate-4q: ✔ ${totalPages} rendered pages across ${CODES.length} locales — ` +
    'no Arabic-Indic or Eastern Arabic-Indic digits in visible text'
);
for (const c of CODES) {
  const r = rows.get(c);
  console.log(
    `         ${c.padEnd(3)} ${String(r.pages).padStart(4)} pages  ` +
      `${String(r.chars).padStart(9)} chars of visible text  ${r.occ} occurrence(s)`
  );
}
const other = rows.get(UNATTRIBUTED);
if (other.pages) {
  console.log(
    `         ${UNATTRIBUTED.padEnd(3)} ${String(other.pages).padStart(4)} pages  ` +
      `${String(other.chars).padStart(9)} chars of visible text  ${other.occ} occurrence(s)  ` +
      '(outside the localized corpus, scanned anyway)'
  );
}
console.log(
  `         forbidden: ${FORBIDDEN.map((r) => `${r.name} U+${r.from.toString(16).toUpperCase().padStart(4, '0')}–U+${r.to.toString(16).toUpperCase().padStart(4, '0')}`).join(', ')}` +
    ` · view: ${VISIBLE_TEXT_EXTRACTOR} (inlineSeparator: "")`
);
console.log('         policy: docs/rtl/AR1-arabic-policy.md §3, enforced in rendered prose (ADR-8 §2.1)');
