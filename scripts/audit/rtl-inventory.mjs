#!/usr/bin/env node
// scripts/audit/rtl-inventory.mjs — AR-1 Deliverable 1.
//
// Inventories every PHYSICAL-DIRECTION assumption in this repository, in both
// corpora, and classifies each one. It is an AUDIT, not a gate: it never exits
// non-zero on findings and is deliberately NOT wired into `npm run build`.
// Whether any of these findings should become blocking is an AR-2 decision.
//
// ── Why two corpora ───────────────────────────────────────────────────────────
// Source grep alone is not the audit. A component's <style> block is one rule in
// source and Astro inlines it into every page that mounts the component, so the
// same declaration is one source finding and several hundred rendered ones. The
// inverse also exists: a declaration authored inside a `page-content/*.ts`
// template literal is invisible to a naive `--include=*.css` scan and perfectly
// visible in dist/. Neither count is "the" count.
//
//   If source and rendered disagree, the AUDIT METHOD is the finding.
//
// So this script reports, for every rule: `sourceHits`, `renderedHits` (raw
// occurrences) and `renderedDistinct` (occurrences deduplicated by the exact
// matched text). renderedDistinct is the number comparable to sourceHits;
// renderedHits is the number that says how much of the site is affected.
//
// ── Why glyph mirroring is DERIVED, not listed ────────────────────────────────
// Directional punctuation splits into two populations that behave oppositely in
// an RTL run, and the split is not intuition — it is a Unicode character
// property. `›` (U+203A) has Bidi_Mirrored=Yes: the bidi algorithm renders it as
// `‹` inside RTL text with no author action. `→` (U+2192) has
// Bidi_Mirrored=No: it keeps pointing right into the start of the line and must
// be mirrored by hand. Hardcoding which is which invites exactly the wrong call,
// so the classifier asks the Unicode database through V8's `\p{Bidi_Mirrored}`
// property escape. Adding a glyph to GLYPHS below cannot mis-classify it.
//
// Usage:  node scripts/audit/rtl-inventory.mjs [--json] [--dist dist] [--full]

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', '..');
const argv = process.argv.slice(2);
const AS_JSON = argv.includes('--json');
const FULL = argv.includes('--full');
const distIdx = argv.indexOf('--dist');
const DIST = join(ROOT, distIdx === -1 ? 'dist' : (argv[distIdx + 1] ?? 'dist'));

// ── Classification vocabulary ────────────────────────────────────────────────
// Five buckets, as specified by AR-1. They are decisions about WHAT TO DO, not
// severity levels — `intentional-ltr` is not "low priority", it is "correct".
const CLASS = {
  LOGICAL: 'logical-property-replacement', // mechanical: physical -> logical CSS
  MIRROR: 'mirror-required',               // must actively flip under dir=rtl
  NEUTRAL: 'direction-neutral',            // identical in both directions
  LTR: 'intentional-ltr',                  // must stay LTR even inside RTL prose
  BIDI: 'bidi-sensitive',                  // correctness depends on the bidi algorithm
};

// ── Rules ────────────────────────────────────────────────────────────────────
// `where` limits a rule to a corpus surface. `note` is the reasoning that must
// survive into AR-2; a rule with no note is a count nobody can act on.
const RULES = [
  {
    id: 'box-physical',
    pattern: /\b(?:margin|padding|border|scroll-margin|scroll-padding)-(?:left|right)\b/g,
    class: CLASS.LOGICAL,
    note: 'Mechanical swap to the -inline-start/-inline-end form. No visual decision.',
  },
  {
    id: 'offscreen-idiom',
    pattern: /\b(?:left|right)\s*:\s*-9999px/g,
    class: CLASS.NEUTRAL,
    note: 'The visually-hidden `page-summary` clip. Physically written, but pushing content 9999px off ANY edge hides it in either direction, so converting it buys nothing. Split out because it is the single largest population in the raw `left:` census and swamps the real positional offsets — the actionable inset count is the remainder, not the total.',
  },
  {
    id: 'inset-physical',
    // `left:`/`right:` as a declaration, not as a value (`to right`, `left center`),
    // and excluding the off-screen idiom counted above.
    pattern: /(?:^|[;{]|\s)(left|right)\s*:\s*(?!;|-9999px)/gm,
    class: CLASS.LOGICAL,
    note: 'Positional offset. inset-inline-start/end. Only meaningful where the element is positioned.',
  },
  {
    id: 'float-clear',
    pattern: /\b(?:float|clear)\s*:\s*(?:left|right)\b/g,
    class: CLASS.LOGICAL,
    note: 'float/clear accept inline-start/inline-end.',
  },
  {
    id: 'text-align-physical',
    pattern: /\btext-align\s*:\s*(?:left|right)\b/g,
    class: CLASS.LOGICAL,
    note: 'text-align: start/end. Distinct from center/justify, which are neutral.',
  },
  {
    id: 'text-align-neutral',
    pattern: /\btext-align\s*:\s*(?:center|justify)\b/g,
    class: CLASS.NEUTRAL,
    note: 'Counted so the physical/neutral split is visible: a bare text-align census overstates the work.',
  },
  {
    id: 'flex-row-reverse',
    pattern: /\bflex-direction\s*:\s*row-reverse\b/g,
    class: CLASS.BIDI,
    note: 'row-reverse is relative to the writing direction, so it FLIPS AGAIN under rtl. A deliberate reversal becomes a deliberate un-reversal.',
  },
  {
    id: 'flex-row',
    pattern: /\bflex-direction\s*:\s*row\b(?!-)/g,
    class: CLASS.BIDI,
    note: 'Flex main axis follows direction automatically. Correct by default — listed because "correct by default" is a claim worth counting, not assuming.',
  },
  {
    id: 'flex-column',
    pattern: /\bflex-direction\s*:\s*column\b(?!-)/g,
    class: CLASS.NEUTRAL,
    note: 'Block axis is unaffected by inline direction.',
  },
  {
    id: 'flex-order',
    pattern: /(?:^|[;{]|\s)order\s*:\s*-?\d/gm,
    class: CLASS.BIDI,
    note: 'order re-sequences along the direction-relative main axis; the visual result mirrors with the page.',
  },
  {
    id: 'translate-centering',
    // The translateX(-50%) + left:50% centering idiom: symmetric, so unaffected.
    pattern: /translateX\(\s*-50%\s*\)/g,
    class: CLASS.NEUTRAL,
    note: 'Centering idiom. Symmetric about the origin, so direction cannot change it. Separated from real X-translation so the mirror-required count is honest.',
  },
  {
    id: 'translate-directional',
    pattern: /translateX\((?!\s*-50%\s*\))[^)]*\)/g,
    class: CLASS.MIRROR,
    note: 'A signed X translation encodes reading order. Under rtl the sign must invert — CSS will not do it for you.',
  },
  {
    id: 'rotate',
    pattern: /\brotate\(\s*-?[\d.]+deg\s*\)/g,
    class: CLASS.MIRROR,
    note: 'A rotation applied to a directional glyph or affordance encodes which way it points. Rotations on decorative/symmetric shapes are neutral — each hit needs an eye.',
  },
  {
    id: 'scale-x',
    pattern: /\bscaleX\(/g,
    class: CLASS.MIRROR,
    note: 'scaleX(-1) IS the mirror operator; scaleX(n) is a directional stretch. Either way, direction-coupled.',
  },
  {
    id: 'background-position-physical',
    pattern: /\bbackground-position\s*:\s*(?:left|right)\b/g,
    class: CLASS.LOGICAL,
    note: 'Anchored to a physical edge.',
  },
  {
    id: 'gradient-directional',
    pattern: /linear-gradient\(\s*(?:to\s+(?:left|right)|-?\d+deg)/g,
    class: CLASS.MIRROR,
    note: 'A horizontal gradient is a visual direction cue. Vertical (`to bottom`) is neutral and excluded here.',
  },
  {
    id: 'explicit-direction',
    pattern: /(?:^|[;{"'\s])direction\s*:\s*(?:ltr|rtl)\b/gm,
    class: CLASS.LTR,
    note: 'An explicit direction override in CSS. Should exist ONLY where a run must resist the page direction.',
  },
  {
    id: 'unicode-bidi',
    pattern: /\bunicode-bidi\s*:/g,
    class: CLASS.BIDI,
    note: 'Explicit bidi embedding/isolation control.',
  },
  {
    id: 'dir-attribute',
    pattern: /\bdir\s*=\s*["'{]/g,
    class: CLASS.BIDI,
    note: 'Direction declared in markup. The direction invariant requires every one of these to trace to LOCALES[].dir.',
  },
  {
    id: 'bdi-bdo',
    pattern: /<\/?bd[io]\b/g,
    class: CLASS.BIDI,
    note: 'Explicit isolation elements. Zero of these today is itself a finding: nothing currently isolates Latin runs.',
  },
  {
    id: 'bidi-control-char',
    pattern: /[\u200E\u200F\u2066-\u2069]|&#8206;|&#8207;|&lrm;|&rlm;/g,
    class: CLASS.BIDI,
    note: 'Invisible bidi control characters (LRM/RLM/LRI/RLI/FSI/PDI). The bidi invariant forbids these from being embedded directly in translations.',
  },
];

// Glyph rules are generated, not written: each glyph is classified by asking the
// Unicode database whether the bidi algorithm already mirrors it.
const GLYPHS = [
  ['→', '&rarr;'], ['←', '&larr;'], ['↑', '&uarr;'], ['↓', '&darr;'],
  ['›', '&rsaquo;'], ['‹', '&lsaquo;'], ['»', '&raquo;'], ['«', '&laquo;'],
  ['▶', null], ['◀', null], ['▸', null], ['◂', null], ['▾', '&#9662;'], ['▴', null],
  ['·', '&middot;'], ['⟩', null], ['⟨', null],
];

const glyphRules = GLYPHS.map(([ch, entity]) => {
  const mirrored = /\p{Bidi_Mirrored}/u.test(ch);
  const horizontal = /[→←›‹»«▶◀▸◂⟩⟨]/u.test(ch);
  const alts = [escapeRe(ch), entity && escapeRe(entity), `&#${ch.codePointAt(0)};`]
    .filter(Boolean).join('|');
  return {
    id: `glyph:${ch}`,
    codepoint: 'U+' + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, '0'),
    bidiMirrored: mirrored,
    pattern: new RegExp(`(?:${alts})`, 'gu'),
    class: !horizontal ? CLASS.NEUTRAL : mirrored ? CLASS.NEUTRAL : CLASS.MIRROR,
    note: !horizontal
      ? 'No horizontal component — nothing to mirror.'
      : mirrored
        ? 'Bidi_Mirrored=Yes: the bidi algorithm flips this glyph inside an RTL run automatically. No author action.'
        : 'Bidi_Mirrored=No: keeps pointing the same physical way inside an RTL run. Must be mirrored explicitly.',
  };
});

const ALL_RULES = [...RULES, ...glyphRules];

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

// ── Corpora ──────────────────────────────────────────────────────────────────
const SKIP_DIR = new Set(['node_modules', '.git', '.astro', 'dist']);

function walk(dir, test, out = []) {
  let entries;
  try { entries = readdirSync(dir); } catch { return out; }
  for (const name of entries) {
    if (SKIP_DIR.has(name)) continue;
    const p = join(dir, name);
    let st;
    try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) walk(p, test, out);
    else if (test(p)) out.push(p);
  }
  return out;
}

function sourceFiles() {
  const files = [];
  if (existsSync(join(ROOT, 'public', 'styles.css'))) files.push(join(ROOT, 'public', 'styles.css'));
  files.push(...walk(join(ROOT, 'src'), (p) => /\.(astro|ts|tsx|mdx|css)$/.test(p)));
  return files;
}

function renderedFiles() {
  const files = [];
  if (existsSync(DIST)) {
    files.push(...walk(DIST, (p) => p.endsWith('.html')));
    // dist/ is skipped by SKIP_DIR when walking from ROOT, but DIST is the walk
    // root here, so its own CSS still needs picking up.
    files.push(...walkDist(DIST, (p) => p.endsWith('.css')));
  }
  return files;
}
function walkDist(dir, test, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules') continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walkDist(p, test, out);
    else if (test(p)) out.push(p);
  }
  return out;
}

// ── Scan ─────────────────────────────────────────────────────────────────────
function scan(files, label) {
  const acc = new Map(); // ruleId -> { hits, distinct:Map<text,count>, files:Set }
  for (const rule of ALL_RULES) acc.set(rule.id, { hits: 0, distinct: new Map(), files: new Set() });

  for (const file of files) {
    let text;
    try { text = readFileSync(file, 'utf8'); } catch { continue; }
    const rel = relative(ROOT, file).split(sep).join('/');
    for (const rule of ALL_RULES) {
      rule.pattern.lastIndex = 0;
      let m, n = 0;
      while ((m = rule.pattern.exec(text)) !== null) {
        n++;
        const key = m[0].trim().replace(/\s+/g, ' ');
        const d = acc.get(rule.id);
        d.distinct.set(key, (d.distinct.get(key) ?? 0) + 1);
        if (m[0].length === 0) rule.pattern.lastIndex++;
      }
      if (n) {
        const d = acc.get(rule.id);
        d.hits += n;
        d.files.add(rel);
      }
    }
  }
  return { label, fileCount: files.length, acc };
}

const src = scan(sourceFiles(), 'source');
const rnd = scan(renderedFiles(), 'rendered');

// ── Report ───────────────────────────────────────────────────────────────────
const rows = ALL_RULES.map((rule) => {
  const s = src.acc.get(rule.id), r = rnd.acc.get(rule.id);
  return {
    id: rule.id,
    class: rule.class,
    codepoint: rule.codepoint,
    bidiMirrored: rule.bidiMirrored,
    sourceHits: s.hits,
    sourceFiles: s.files.size,
    renderedHits: r.hits,
    renderedDistinct: r.distinct.size,
    renderedFiles: r.files.size,
    // The divergence signal AR-1 asks for. Source-only means the construct never
    // reached a page (dead CSS, or a corpus the build does not emit). Rendered-only
    // means the source scan cannot see where it was authored.
    divergence:
      s.hits > 0 && r.hits === 0 ? 'source-only'
      : s.hits === 0 && r.hits > 0 ? 'rendered-only'
      : s.hits === 0 ? null
      : r.renderedDistinct === 0 ? null
      : null,
    note: rule.note,
    sampleFiles: FULL ? [...s.files].slice(0, 8) : undefined,
  };
}).filter((row) => row.sourceHits || row.renderedHits);

const byClass = {};
for (const row of rows) {
  byClass[row.class] ??= { rules: 0, sourceHits: 0, renderedHits: 0 };
  byClass[row.class].rules++;
  byClass[row.class].sourceHits += row.sourceHits;
  byClass[row.class].renderedHits += row.renderedHits;
}

const report = {
  generatedFrom: { sourceFiles: src.fileCount, renderedFiles: rnd.fileCount, dist: relative(ROOT, DIST) },
  byClass,
  rules: rows,
};

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const pad = (s, n) => String(s).padEnd(n);
  const lpad = (s, n) => String(s).padStart(n);
  console.log(`rtl-inventory: ${src.fileCount} source files · ${rnd.fileCount} rendered files (${report.generatedFrom.dist})\n`);
  console.log(pad('rule', 34) + lpad('src', 6) + lpad('rend', 8) + lpad('distinct', 10) + '  class');
  console.log('-'.repeat(34 + 6 + 8 + 10 + 2 + 30));
  const order = [CLASS.MIRROR, CLASS.LOGICAL, CLASS.BIDI, CLASS.LTR, CLASS.NEUTRAL];
  for (const cls of order) {
    for (const row of rows.filter((r) => r.class === cls)) {
      console.log(
        pad(row.id, 34) + lpad(row.sourceHits, 6) + lpad(row.renderedHits, 8) +
        lpad(row.renderedDistinct, 10) + '  ' + row.class +
        (row.divergence ? `  [${row.divergence}]` : '')
      );
    }
  }
  console.log('');
  for (const cls of order) {
    const c = byClass[cls];
    if (c) console.log(`  ${pad(cls, 32)} ${lpad(c.rules, 3)} rules · ${lpad(c.sourceHits, 5)} source · ${lpad(c.renderedHits, 7)} rendered`);
  }
  console.log('\nAudit only — never blocks a build. Classification of glyphs is derived from');
  console.log('Unicode Bidi_Mirrored, not from a hand-written list.');
}
