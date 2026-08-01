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

const INLINE = 'cancellation-policy';

/**
 * The registered Arabic prose spokes, plus the AR-1 inline page.
 * Slug → the route under each locale.
 *
 * ⚠ This was a hardcoded list of the nine pilot slugs, and §11.0 of
 * AR2-E4-phase2-tight-ceiling.md records why that was a standing hazard: a route
 * not in the list is silently excluded from the window measurement while the
 * census counts it, which is exactly the population mismatch behind §10.2's
 * 32/41-vs-33/42 correction. §11.0 asked for the list to be extended at every
 * expansion; by batch 2b it had already been missed once (batch 2a's eight
 * hiking spokes were registered and never added here).
 *
 * Reading AR_SLUGS instead makes the population definitionally the registered
 * one, so the mismatch cannot reappear at the next expansion. AR_SLUGS is the
 * same registry the census and the routes resolve against, and it is the one
 * §1.2 of the rollout brief calls the second deliverable of every file.
 */
function registeredArSpokes() {
  const src = readFileSync(path.join(REPO_ROOT, 'src', 'lib', 'i18n.ts'), 'utf8');
  const block = src.match(/const AR_SLUGS = new Set<string>\(\[([\s\S]*?)\]\);/);
  if (!block) throw new Error('AR_SLUGS block not found in src/lib/i18n.ts');
  return [...block[1].matchAll(/'([^']+)'/g)]
    .map((m) => m[1])
    .filter((slug) => slug !== INLINE);
}

const PILOT = registeredArSpokes();

/**
 * B-11 floor candidates.
 *
 * The §4.2 wayfinding names that must survive translation in Latin script, plus the two
 * Arabic identities that already hold `bound: floor` locks in `4i-glossary.json`. The
 * Latin ones would need `latinLock` under D-1; the Arabic two must NOT have it. That
 * distinction is E-4's to apply — this file only counts.
 */
/**
 * ⚠ `forms` — a term may RENDER in more than one string, and the count must cover all of them.
 *
 * E-0 §2 F5 recorded that `Doc's Beach` renders in two apostrophes and that gate 4i folds
 * neither. E-5 §5.1 found this file had carried the ASCII form only, so every figure it
 * reported for that term was 41 % of the corpus — F5's own worked example ("3 body occurrences
 * out of 20"), reproduced exactly, three milestones after it was written down.
 *
 * The cause is not authoring: all 31 source occurrences are ASCII. Astro's markdown renderer
 * applies smartypants to MDX **body** prose and turns `'` into `’`, while frontmatter-derived
 * text (FAQ answers) and dictionary strings (the footer trail list) are never markdown-processed
 * and keep the ASCII form. So the split partitions by AUTHORING SURFACE, not by author choice,
 * and no instruction in a translator brief can change it.
 *
 * Any term whose rendered string can be rewritten by the pipeline — an apostrophe, a quote, an
 * ellipsis, a double hyphen — needs every form listed here. `forms` defaults to `[term]`.
 */
const CANDIDATES = [
  { term: 'Vernal', kind: 'latin' },
  { term: "Doc's Beach", kind: 'latin', forms: ["Doc's Beach", 'Doc’s Beach'] },
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

/**
 * `--align` — the per-file `en`↔locale set. E-5c.
 *
 * WHY IT IS NOT `CANDIDATES`. The two lists answer different questions and their difference is
 * deliberate. `CANDIDATES` is the B-11 **floor** set: terms that might carry a gate-4i lock, so
 * an Arabic-script lock belongs in it and a price does not. This list is the **fidelity** set:
 * terms policy §4.2 requires to survive translation byte-for-byte, so it includes the
 * transactional runs — `$349`, `$125`, the phone — which will never carry a floor but are
 * exactly what a translator is most likely to localize by reflex.
 *
 * It reproduces E-2 §4.2's ten rows exactly, so the historical figure and this instrument's
 * figure are like-for-like. An Arabic-script term cannot appear here at all: alignment asks
 * whether the SAME string survives, and a term with a different rendering in each locale has no
 * common string to count. Those live in DIVERGENT below.
 */
const ALIGN = [
  { term: 'Vernal' },
  { term: "Doc's Beach", forms: ["Doc's Beach", 'Doc’s Beach'] },
  { term: 'Moonshine Arch' },
  { term: 'Outlaw Trail' },
  { term: 'Asphalt Ridge' },
  { term: 'Kawasaki KRX 1000' },
  { term: 'Dinosaur National Monument' },
  { term: '(435) 219-9447' },
  { term: '$349' },
  { term: '$125' },
];

/**
 * `--align --falsify` — the control, per METHOD rule 5.
 *
 * A Δ 0 result is evidence only if the same measurement path can produce a non-zero one. The
 * failure mode that would make Δ 0 meaningless is the instrument reading one tree twice, or
 * reading the locale side as empty — both of which report Δ 0 for *every* term, indistinguishable
 * from perfect compliance.
 *
 * These are terms the policy REQUIRES to diverge: the English string is translated, so counting
 * it on the locale side must return a different number. If any of them reports Δ 0, the
 * comparison is not comparing two trees and no Δ 0 above it may be believed.
 */
const DIVERGENT = {
  ar: [
    { term: 'Dinosaur Country', why: 'policy §4.1 exonym → أرض الديناصورات' },
    { term: 'Key Takeaways', why: 'AR-1 glossary → أبرز النقاط' },
    { term: 'Utah', why: 'policy §4.1 exonym → يوتا' },
  ],
};

function parseArgs(argv) {
  const out = { root: path.join(REPO_ROOT, 'dist'), baseline: null, json: null, align: null, falsify: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--root') out.root = path.resolve(argv[++i]);
    else if (argv[i] === '--baseline') out.baseline = path.resolve(argv[++i]);
    else if (argv[i] === '--json') out.json = path.resolve(argv[++i]);
    else if (argv[i] === '--align') out.align = argv[++i];
    else if (argv[i] === '--falsify') out.falsify = true;
    else { process.stderr.write(`unknown argument: ${argv[i]}\n`); process.exit(2); }
  }
  if (out.falsify && !out.align) { process.stderr.write('--falsify requires --align <locale>\n'); process.exit(2); }
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

const countOne = (hay, needle) => (hay ? hay.split(needle).length - 1 : 0);
/** Sum over every rendered form of a term — see the `forms` note on CANDIDATES. */
const count = (hay, forms) =>
  (Array.isArray(forms) ? forms : [forms]).reduce((n, f) => n + countOne(hay, f), 0);
const formsOf = (c) => c.forms ?? [c.term];
const COMPONENTS = ['prose', 'related', 'cta', 'byline', 'chrome'];

/**
 * Route path for a slug in a locale. English is the default locale and carries no URL segment
 * (`astro.config` trailingSlash 'always', build.format 'directory'), which is why this is a
 * function rather than a template — the `en` side of an alignment is not `dist/en/…`.
 */
const routePath = (root, locale, slug) =>
  locale === 'en' ? path.join(root, slug, 'index.html') : path.join(root, locale, slug, 'index.html');

/** Decompose the pilot routes of one locale. Missing routes are skipped, not faked. */
function readPages(root, locale) {
  const pages = [];
  for (const slug of PILOT) {
    const p = routePath(root, locale, slug);
    if (!existsSync(p)) continue;
    pages.push({ slug, parts: decompose(readFileSync(p, 'utf8')) });
  }
  return pages;
}

function measureTree(root) {
  const pages = readPages(root, 'ar');
  const inlinePath = path.join(root, 'ar', INLINE, 'index.html');
  const inline = existsSync(inlinePath)
    ? { slug: INLINE, parts: decompose(readFileSync(inlinePath, 'utf8')) } : null;

  const totals = {};
  for (const cand of CANDIDATES) {
    const { term } = cand;
    const forms = formsOf(cand);
    totals[term] = Object.fromEntries(COMPONENTS.map((c) => [c, 0]));
    totals[term].whole = 0;
    totals[term].perPageProse = [];
    totals[term].forms = forms;
    for (const { parts } of pages) {
      for (const c of COMPONENTS) totals[term][c] += count(parts[c], forms);
      totals[term].whole += count(parts.whole, forms);
      totals[term].perPageProse.push(count(parts.prose, forms));
    }
  }
  return { pages, inline, totals };
}

const args = parseArgs(process.argv.slice(2));

// --- `--align <locale>` — the committed replacement for E-2 §4.2's throwaway census ---------
//
// E-5b §5.2 found that the pilot's most-cited quality result — Δ 0 per file across ten §4.2
// terms — was produced by an uncommitted script and could not be reproduced from the
// repository. This is that measurement, in the repository, over the same window and the same
// ten terms. It is the alignment method that closed the German backlog: per-file, not totals,
// because totals can cancel a +2 on one file against a −2 on another.
if (args.align) {
  const locale = args.align;
  const set = args.falsify ? (DIVERGENT[locale] ?? []) : ALIGN;
  if (args.falsify && set.length === 0) {
    process.stderr.write(`--falsify: no DIVERGENT set defined for locale "${locale}"\n`);
    process.exit(2);
  }

  let en, loc;
  try { en = readPages(args.root, 'en'); loc = readPages(args.root, locale); }
  catch (err) { process.stderr.write(`instrument failed: ${err.message}\n`); process.exit(2); }

  // Compare only routes present on BOTH sides — rule 9: a differential over a tree that differs
  // in membership measures the membership, not the thing.
  const shared = en.filter((p) => loc.some((q) => q.slug === p.slug)).map((p) => p.slug);
  if (shared.length === 0) {
    process.stderr.write(`no route is present in both "en" and "${locale}" under ${args.root}\n`);
    process.exit(2);
  }

  process.stdout.write(`\nroot ${args.root}   align en ↔ ${locale}   routes in both: ${shared.length}`
    + (args.falsify ? '   ⚠ --falsify: the DIVERGENT set, every Δ MUST be non-zero\n' : '\n'));
  process.stdout.write('window: prose = <main> − related-articles − tour-cta − author-byline\n');

  const proseOf = (pages, slug) => pages.find((p) => p.slug === slug).parts.prose;
  const rows = [];
  for (const cand of set) {
    const forms = formsOf(cand);
    const per = shared.map((slug) => ({
      slug,
      en: count(proseOf(en, slug), forms),
      loc: count(proseOf(loc, slug), forms),
    }));
    rows.push({
      term: cand.term,
      why: cand.why,
      per,
      en: per.reduce((a, r) => a + r.en, 0),
      loc: per.reduce((a, r) => a + r.loc, 0),
      filesOff: per.filter((r) => r.en !== r.loc).length,
    });
  }

  process.stdout.write('\n=== PER-FILE ALIGNMENT (Δ per file, not just totals) ===\n');
  process.stdout.write('  term'.padEnd(32) + 'en'.padStart(6) + locale.padStart(6)
    + 'Δ'.padStart(6) + 'files off'.padStart(11) + '\n');
  for (const r of rows) {
    process.stdout.write('  ' + r.term.slice(0, 29).padEnd(30) + String(r.en).padStart(6)
      + String(r.loc).padStart(6) + String(r.loc - r.en).padStart(6)
      + `${r.filesOff}/${shared.length}`.padStart(11) + (r.why ? `   ${r.why}` : '') + '\n');
  }
  for (const r of rows.filter((x) => x.filesOff > 0)) {
    process.stdout.write(`\n  ${r.term} — the ${r.filesOff} file(s) that differ:\n`);
    for (const p of r.per.filter((x) => x.en !== x.loc)) {
      process.stdout.write(`    ${p.slug.padEnd(48)} en ${p.en}  ${locale} ${p.loc}  Δ ${p.loc - p.en}\n`);
    }
  }

  const aligned = rows.filter((r) => r.filesOff === 0).length;
  if (args.falsify) {
    // The control: every DIVERGENT term must show a difference. One that does not means the
    // comparison is reading one tree twice, and every Δ 0 this instrument has ever printed
    // would be worthless.
    const silent = rows.filter((r) => r.filesOff === 0);
    if (silent.length > 0) {
      process.stderr.write(`\ncontrol FAILED: ${silent.map((r) => r.term).join(', ')} reported Δ 0 `
        + `on a term policy requires to diverge — the comparison is not comparing two trees.\n`);
      process.exit(2);
    }
    process.stdout.write(`\n  ✔ control red as required — all ${rows.length} divergent term(s) show a difference\n`);
  } else {
    process.stdout.write(`\n  ${aligned}/${rows.length} term(s) align per file with Δ 0 on every shared route\n`);
    if (aligned < rows.length) {
      process.stdout.write('  ⚠ a non-zero Δ is a finding, not a failure — this instrument asserts nothing\n');
    }
  }

  if (args.json) {
    writeFileSync(args.json, JSON.stringify({
      root: args.root, mode: args.falsify ? 'falsify' : 'align',
      locale, routes: shared, rows,
    }, null, 2) + '\n', 'utf8');
    process.stdout.write(`\nwrote ${args.json}\n`);
  }
  process.exit(0);
}

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
  for (const cand of CANDIDATES) {
    const { term } = cand;
    const forms = formsOf(cand);
    // restrict both sides to the shared routes so the comparison is like-for-like
    const sub = (tree) => {
      const acc = Object.fromEntries(COMPONENTS.map((c) => [c, 0])); acc.whole = 0;
      for (const { slug, parts } of tree.pages) {
        if (!shared.includes(slug)) continue;
        for (const c of COMPONENTS) acc[c] += count(parts[c], forms);
        acc.whole += count(parts.whole, forms);
      }
      return acc;
    };
    const a = sub(base), b = sub(current);
    const row = COMPONENTS.map((c) => String(b[c] - a[c]).padStart(10)).join('');
    process.stdout.write('  ' + term.slice(0, 29).padEnd(30) + row + String(b.whole - a.whole).padStart(9) + '\n');
  }
}

if (args.json) {
  // ⚠ POPULATION, emitted rather than left to be rediscovered.
  //
  // `totals` covers the registered SPOKES only: `cancellation-policy` is decomposed separately
  // because it renders no RelatedArticles, no CTA and no byline, so averaging it into a window
  // built out of those components would be a category error. The census, however, counts EVERY
  // registered ar route. A consumer that compares a figure from here against a frozen census
  // figure is therefore comparing two page sets — precisely the mismatch that produced 32/41
  // against a frozen 33/42 (AR2-E4-phase2 §10.2). So emit the inline page's own per-term counts
  // and the spoke list: the correction becomes an addition the consumer performs explicitly,
  // and its absence becomes visible instead of silent.
  const inlineTotals = {};
  if (current.inline) {
    for (const cand of CANDIDATES) {
      const forms = formsOf(cand);
      const { parts } = current.inline;
      inlineTotals[cand.term] = Object.fromEntries(COMPONENTS.map((c) => [c, count(parts[c], forms)]));
      inlineTotals[cand.term].whole = count(parts.whole, forms);
    }
  }
  writeFileSync(args.json, JSON.stringify({
    root: args.root,
    candidates: CANDIDATES,
    totals: current.totals,
    spokes: current.pages.map((p) => p.slug),
    inline: current.inline ? { slug: current.inline.slug, totals: inlineTotals } : null,
  }, null, 2) + '\n', 'utf8');
  process.stdout.write(`\nwrote ${args.json}\n`);
}
