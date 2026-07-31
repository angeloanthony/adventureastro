// scripts/rtl/measure-prose-window.mjs — the editorial measurement window (AR-2 Track E, E-3).
//
// WHY THIS FILE EXISTS. E-2 set out to recompute B-11 floor inputs and found that it could
// not: the per-term counts of an Arabic page changed between E-1 and E-2 **on a file whose
// prose nobody edited**. `Vernal` 24 → 31, `Kawasaki KRX 1000` 6 → 8. The cause is that
// `<main>` contains `section.related-articles`, whose cards carry the TITLES AND
// DESCRIPTIONS of sibling routes — so the measured content of the window is a function of
// how many locale routes are registered, not of what a translator wrote.
//
//     A measurement window whose contents depend on registry cardinality cannot define a
//     stable editorial floor.
//
// That is a different failure from the ones this project has caught before. Track A and
// B-7 found windows that measured the wrong thing; this one measures the right thing and
// then changes size underneath you as the corpus grows. A floor set on it would drift
// upward with every batch and silently stop testing the translator.
//
// WHAT THIS MEASURES. A page decomposed into five disjoint components, so any claim about
// where a term's occurrences live is arithmetic rather than assertion:
//
//     chrome            everything outside <main>            — nav, footer, skip links
//     related-articles  section.related-articles             — SIBLING titles + descriptions
//     tour-cta          div.tour-cta                         — shared conversion block
//     author-byline     div.author-byline                    — shared attribution block
//     prose             <main> minus the three above         — THE EDITORIAL WINDOW
//
// The five sum to the whole page by construction, and the script asserts that they do.
//
// WHAT IT IS NOT. Not a gate. It asserts nothing about whether a count is right, sets no
// floor, and cannot fail a build. Exit `0` means the measurements completed, `2` that the
// instrument did not reach a reading. There is deliberately no exit 1 — the same split
// measure-carousel.mjs and measure-currency.mjs use.
//
// THE STABILITY TEST IS THE POINT, AND IT NEEDS TWO TREES. `--baseline <dist>` re-measures
// the same routes over a second build and reports the per-component delta. A window is
// only demonstrably stable if it does not move between a tree with few registered routes
// and a tree with many; asserting stability from one tree is the error this file exists to
// stop repeating.
//
//     node scripts/rtl/measure-prose-window.mjs
//     node scripts/rtl/measure-prose-window.mjs --baseline ../old/dist --json out.json

import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/** The nine pilot spokes, plus the AR-1 inline page. Slug → the route under each locale. */
const PILOT = [
  'utv/best-utv-trails-vernal',
  'utv/backcountry-tours-vernal-utah',
  'utv/side-by-side-rentals-vernal-utah',
  'utv/group-utv-tours-vernal',
  'utv/private-utv-tours-vernal',
  'utv/beginners-guide-to-utv-tours-vernal',
  'utv/family-utv-guide-vernal',
  'dinosaur-national-monument/petroglyphs-rock-art-vernal',
  'dinosaur-national-monument/visiting-dinosaur-national-monument',
];
const INLINE = 'cancellation-policy';

/**
 * B-11 floor candidates.
 *
 * The §4.2 wayfinding names that must survive translation in Latin script, plus the two
 * Arabic identities that already hold `bound: floor` locks in `4i-glossary.json`. The
 * Latin ones would need `latinLock` under D-1; the Arabic two must NOT have it. That
 * distinction is E-4's to apply — this file only counts.
 */
const CANDIDATES = [
  { term: 'Vernal', kind: 'latin' },
  { term: "Doc's Beach", kind: 'latin' },
  { term: 'Moonshine Arch', kind: 'latin' },
  { term: 'Outlaw Trail', kind: 'latin' },
  { term: 'Asphalt Ridge', kind: 'latin' },
  { term: 'Ashley Gorge', kind: 'latin' },
  { term: 'Kawasaki KRX 1000', kind: 'latin' },
  { term: 'Dinosaur National Monument', kind: 'latin' },
  { term: 'Adventure Tours Vernal', kind: 'latin' },
  { term: 'Uintah Basin', kind: 'latin' },
  { term: 'Green River', kind: 'latin' },
  { term: 'أرض الديناصورات', kind: 'arabic', lock: 'dinosaur-country' },
  { term: 'المسارات', kind: 'arabic', lock: 'offroad-trail' },
];

function parseArgs(argv) {
  const out = { root: path.join(REPO_ROOT, 'dist'), baseline: null, json: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--root') out.root = path.resolve(argv[++i]);
    else if (argv[i] === '--baseline') out.baseline = path.resolve(argv[++i]);
    else if (argv[i] === '--json') out.json = path.resolve(argv[++i]);
    else { process.stderr.write(`unknown argument: ${argv[i]}\n`); process.exit(2); }
  }
  return out;
}

/**
 * Extract a block by tag + class, matching nesting depth rather than the first close tag.
 *
 * A non-greedy `<div class="x">[\s\S]*?</div>` stops at the FIRST `</div>`, which for
 * `div.tour-cta` is the close of its inner `<p>`-wrapping div and truncates the block. The
 * B-5a verifier bug in a second costume: a pattern that finds a plausible terminator is not
 * the same as one that finds the right one.
 */
function extractBlock(html, tag, className) {
  const open = new RegExp(`<${tag}\\b[^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*>`, 'g');
  const m = open.exec(html);
  if (!m) return { block: '', rest: html };
  const start = m.index;
  const step = new RegExp(`<${tag}\\b[^>]*>|</${tag}>`, 'g');
  step.lastIndex = start;
  let depth = 0, end = -1, t;
  while ((t = step.exec(html))) {
    depth += t[0].startsWith('</') ? -1 : 1;
    if (depth === 0) { end = t.index + t[0].length; break; }
  }
  if (end === -1) return { block: '', rest: html };
  return { block: html.slice(start, end), rest: html.slice(0, start) + html.slice(end) };
}

/** Rendered visible text: drop what never renders, then tags, then the entities that occur. */
function visible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&')
    .replace(/&middot;/g, '·').replace(/&rarr;/g, '→').replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ').trim();
}

/** Decompose one page into the five disjoint components. */
function decompose(html) {
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/);
  const main = mainMatch ? mainMatch[0] : '';
  const chrome = main ? html.replace(main, '') : html;

  let rest = main;
  const related = extractBlock(rest, 'section', 'related-articles'); rest = related.rest;
  const cta = extractBlock(rest, 'div', 'tour-cta'); rest = cta.rest;
  const byline = extractBlock(rest, 'div', 'author-byline'); rest = byline.rest;

  return {
    chrome: visible(chrome),
    related: visible(related.block),
    cta: visible(cta.block),
    byline: visible(byline.block),
    prose: visible(rest),
    whole: visible(html),
  };
}

const count = (hay, needle) => (hay ? hay.split(needle).length - 1 : 0);
const COMPONENTS = ['prose', 'related', 'cta', 'byline', 'chrome'];

function measureTree(root) {
  const pages = [];
  for (const slug of PILOT) {
    const p = path.join(root, 'ar', slug, 'index.html');
    if (!existsSync(p)) continue;
    pages.push({ slug, parts: decompose(readFileSync(p, 'utf8')) });
  }
  const inlinePath = path.join(root, 'ar', INLINE, 'index.html');
  const inline = existsSync(inlinePath)
    ? { slug: INLINE, parts: decompose(readFileSync(inlinePath, 'utf8')) } : null;

  const totals = {};
  for (const { term } of CANDIDATES) {
    totals[term] = Object.fromEntries(COMPONENTS.map((c) => [c, 0]));
    totals[term].whole = 0;
    totals[term].perPageProse = [];
    for (const { parts } of pages) {
      for (const c of COMPONENTS) totals[term][c] += count(parts[c], term);
      totals[term].whole += count(parts.whole, term);
      totals[term].perPageProse.push(count(parts.prose, term));
    }
  }
  return { pages, inline, totals };
}

const args = parseArgs(process.argv.slice(2));
let current;
try { current = measureTree(args.root); }
catch (err) { process.stderr.write(`instrument failed: ${err.message}\n`); process.exit(2); }

if (current.pages.length === 0) {
  process.stderr.write(`no Arabic pilot routes found under ${args.root}\n`);
  process.exit(2);
}

process.stdout.write(`\nroot ${args.root}   ar pilot routes measured: ${current.pages.length}\n`);

// --- the partition must actually partition, or every number below is unfounded ----------
process.stdout.write('\n=== PARTITION CHECK — components must sum to the whole page ===\n');
let partitionOk = 0, partitionOff = [];
for (const { slug, parts } of current.pages) {
  const sum = COMPONENTS.reduce((a, c) => a + parts[c].length, 0);
  // whitespace normalisation differs at the seams, so compare on non-space characters
  const nz = (s) => s.replace(/\s/g, '').length;
  const sumNz = COMPONENTS.reduce((a, c) => a + nz(parts[c]), 0);
  if (sumNz === nz(parts.whole)) partitionOk++;
  else partitionOff.push(`${slug}: parts ${sumNz} vs whole ${nz(parts.whole)} (Δ ${sumNz - nz(parts.whole)})`);
  void sum;
}
process.stdout.write(`  exact on ${partitionOk}/${current.pages.length} pages\n`);
for (const o of partitionOff) process.stdout.write(`  ⚠ ${o}\n`);

// --- component sizes --------------------------------------------------------------------
process.stdout.write('\n=== COMPONENT SIZES (visible characters) ===\n');
process.stdout.write('  page'.padEnd(50) + COMPONENTS.map((c) => c.padStart(9)).join('') + '\n');
const compTotals = Object.fromEntries(COMPONENTS.map((c) => [c, 0]));
for (const { slug, parts } of current.pages) {
  process.stdout.write('  ' + slug.slice(0, 47).padEnd(48)
    + COMPONENTS.map((c) => String(parts[c].length).padStart(9)).join('') + '\n');
  for (const c of COMPONENTS) compTotals[c] += parts[c].length;
}
process.stdout.write('  ' + 'TOTAL'.padEnd(48) + COMPONENTS.map((c) => String(compTotals[c]).padStart(9)).join('') + '\n');

// --- per-term decomposition ---------------------------------------------------------------
process.stdout.write('\n=== B-11 FLOOR CANDIDATES — where each term\'s occurrences live ===\n');
process.stdout.write('  term'.padEnd(32) + 'prose'.padStart(7) + 'related'.padStart(9)
  + 'cta'.padStart(6) + 'byline'.padStart(8) + 'chrome'.padStart(8) + 'whole'.padStart(8)
  + '   min/page'.padStart(11) + '\n');
for (const { term, kind, lock } of CANDIDATES) {
  const t = current.totals[term];
  const min = Math.min(...t.perPageProse);
  process.stdout.write('  ' + `${term}${lock ? ` [${lock}]` : ''}`.slice(0, 29).padEnd(30)
    + String(t.prose).padStart(7) + String(t.related).padStart(9) + String(t.cta).padStart(6)
    + String(t.byline).padStart(8) + String(t.chrome).padStart(8) + String(t.whole).padStart(8)
    + String(min).padStart(11) + `   ${kind}\n`);
}

// --- the stability differential -------------------------------------------------------------
if (args.baseline) {
  process.stdout.write(`\n=== STABILITY DIFFERENTIAL vs ${args.baseline} ===\n`);
  let base;
  try { base = measureTree(args.baseline); }
  catch (err) { process.stderr.write(`baseline failed: ${err.message}\n`); process.exit(2); }
  const shared = current.pages.filter((p) => base.pages.some((b) => b.slug === p.slug)).map((p) => p.slug);
  process.stdout.write(`  routes present in BOTH trees: ${shared.length} (${shared.join(', ') || 'none'})\n`);
  process.stdout.write(`  ar routes: baseline ${base.pages.length}  current ${current.pages.length}\n\n`);
  process.stdout.write('  term'.padEnd(32) + COMPONENTS.map((c) => `Δ${c}`.padStart(10)).join('') + 'Δwhole'.padStart(9) + '\n');
  for (const { term } of CANDIDATES) {
    // restrict both sides to the shared routes so the comparison is like-for-like
    const sub = (tree) => {
      const acc = Object.fromEntries(COMPONENTS.map((c) => [c, 0])); acc.whole = 0;
      for (const { slug, parts } of tree.pages) {
        if (!shared.includes(slug)) continue;
        for (const c of COMPONENTS) acc[c] += count(parts[c], term);
        acc.whole += count(parts.whole, term);
      }
      return acc;
    };
    const a = sub(base), b = sub(current);
    const row = COMPONENTS.map((c) => String(b[c] - a[c]).padStart(10)).join('');
    process.stdout.write('  ' + term.slice(0, 29).padEnd(30) + row + String(b.whole - a.whole).padStart(9) + '\n');
  }
}

if (args.json) {
  writeFileSync(args.json, JSON.stringify({ root: args.root, candidates: CANDIDATES, totals: current.totals }, null, 2) + '\n', 'utf8');
  process.stdout.write(`\nwrote ${args.json}\n`);
}
