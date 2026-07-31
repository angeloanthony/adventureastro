// scripts/rtl/measure-related-ceiling.mjs — the tight structural ceiling (AR-2 Track E, E-4 Phase 2).
//
// WHY THIS FILE EXISTS. E-4 Phase 1 replaced E-3's `non_prose_observed` with a ceiling —
// the largest related-articles contribution the template can produce — because a floor's
// question is not "how much of today's count is template?" but "does a number exist that
// the template ALONE can never reach?". Observed non-prose is descriptive; only a ceiling
// is enforceable. Phase 1 computed that ceiling the crudest sound way:
//
//     loose(page, term) = 4 × max over the candidate pool of contribution(entry, term)
//
// i.e. it assumed all four cards on every page are four copies of the single
// highest-contributing sibling. `take()` makes that impossible: `seen` is keyed on
// `${hub}/${baseId}` and pre-seeded with the current page, so the four cards are four
// DISTINCT entries, none of them the page itself. The sound bound is therefore
//
//     tight(page, term) = sum of the top FOUR DISTINCT sibling contributions for that page
//
// which is what this file computes. Phase 1 flagged it explicitly: the loose ceiling was
// about to reject `Dinosaur National Monument` (mean 0.16/card against a max of 2) and to
// accept `Adventure Tours Vernal` on a headroom of 5 — neither verdict is safe to freeze on
// the first bound that happened to work.
//
// WHAT IS BOUNDED AND WHAT IS MEASURED. The two halves of the related block have different
// epistemic status, and conflating them is what made Phase 1's ceiling pessimistic:
//
//     WHICH four siblings are chosen    volatile — depends on tags and updatedDate       → BOUND
//     what each sibling CONTRIBUTES     stable   — title + description, countable today  → MEASURE
//
// Phase 1 bounded both. This bounds only the first. For the ar corpus the pool is the nine
// registered Arabic files, so their frontmatter is read directly and §5.1's English-predicts-
// Arabic assumption is not needed at all for today's verdicts — it survives only in the
// `--project` section, which is a prediction about a corpus that does not exist yet.
//
// WHAT IT IS NOT. Not a gate. It sets no floor and cannot fail a build. Exit `0` means the
// measurements completed, `2` that the instrument did not reach a reading — the same split
// measure-prose-window.mjs, measure-carousel.mjs and measure-currency.mjs use. It does carry
// two SOUNDNESS ASSERTIONS, because a ceiling that is quietly below reality is worse than a
// loose one:
//
//     A. tight ≥ observed related, per term, over the same tree  (a bound that the build
//        already exceeds is not a bound)
//     B. the static section heading contributes 0 for every candidate (else it belongs in
//        the ceiling as a per-page constant)
//
//     node scripts/rtl/measure-related-ceiling.mjs --window <window.json>
//     node scripts/rtl/measure-related-ceiling.mjs --window <window.json> --project --json out.json

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CONTENT = path.join(REPO_ROOT, 'src', 'content');

/**
 * The candidate pool's collections.
 *
 * `RelatedArticles.astro` draws tiers 1/3/4 from HUB_SLUGS and tier 2 (manual `related`
 * refs) from HUB_SLUGS + 'itineraries' — its `LINKABLE`. The wider set is the safe one for
 * a ceiling: including a collection that cannot actually be reached can only make the bound
 * larger, never unsound. Kept in sync with src/lib/hubs.ts by the assertion in §0.
 */
const LINKABLE = [
  'utv', 'atv', 'jeep', 'dinosaur-national-monument', 'things-to-do',
  'hiking', 'camping', 'fishing', 'scenic-drives', 'guides', 'itineraries',
];

/** Identical to measure-prose-window.mjs's list — the same thirteen B-11 floor candidates. */
const CANDIDATES = [
  'Vernal', "Doc's Beach", 'Moonshine Arch', 'Outlaw Trail', 'Asphalt Ridge', 'Ashley Gorge',
  'Kawasaki KRX 1000', 'Dinosaur National Monument', 'Adventure Tours Vernal', 'Uintah Basin',
  'Green River', 'أرض الديناصورات', 'المسارات',
];

/** The rendered section heading, per locale — `t('section.youMightAlsoLike')` in src/lib/ui.ts. */
const HEADING = { ar: 'قد يعجبك أيضاً', en: 'You Might Also Like' };

const CARD_LIMIT = 4; // RelatedArticles.astro: `limit = 4`, enforced in take(). Structural.

/**
 * `--falsify` — the control, per METHOD rule 5: a check that cannot go red is decoration.
 *
 * Assertion A (ceiling ≥ observed related) passes on this corpus, and a passing assertion is
 * evidence only once the same path has been shown to fail. `--falsify` recomputes every
 * ceiling with a card limit of ONE — a deliberately unsound bound, since the component
 * demonstrably renders four — and Assertion A must go red on the terms the related block
 * actually carries. Green under `--falsify` means the assertion is not wired to anything.
 */
function parseArgs(argv) {
  const out = { locale: 'ar', window: null, json: null, project: false, limit: CARD_LIMIT, falsify: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--locale') out.locale = argv[++i];
    else if (argv[i] === '--window') out.window = path.resolve(argv[++i]);
    else if (argv[i] === '--json') out.json = path.resolve(argv[++i]);
    else if (argv[i] === '--project') out.project = true;
    else if (argv[i] === '--falsify') { out.falsify = true; out.limit = 1; }
    else { process.stderr.write(`unknown argument: ${argv[i]}\n`); process.exit(2); }
  }
  return out;
}

/**
 * Read `title`, `description` and `draft` out of a content file's frontmatter.
 *
 * Deliberately minimal — top-level keys only, so a `q:`/`a:` pair nested under `faq:` can
 * never be mistaken for the page title. Unterminated frontmatter or a missing title/
 * description is a hard error rather than a zero: a silently empty contribution would
 * understate the ceiling, which is the one direction a bound may not err in.
 */
function frontmatter(file) {
  const src = readFileSync(file, 'utf8');
  if (!src.startsWith('---')) throw new Error(`no frontmatter: ${file}`);
  const end = src.indexOf('\n---', 3);
  if (end === -1) throw new Error(`unterminated frontmatter: ${file}`);
  const fm = src.slice(3, end);
  const scalar = (key) => {
    const m = fm.match(new RegExp(`^${key}:[ \\t]*(.*)$`, 'm'));
    if (!m) return null;
    const raw = m[1].trim();
    if (raw.startsWith('"') && raw.endsWith('"') && raw.length > 1) return raw.slice(1, -1).replace(/\\"/g, '"');
    if (raw.startsWith("'") && raw.endsWith("'") && raw.length > 1) return raw.slice(1, -1).replace(/''/g, "'");
    return raw;
  };
  const title = scalar('title'), description = scalar('description');
  if (!title || !description) throw new Error(`missing title/description: ${file}`);
  return { title, description, draft: scalar('draft') === 'true' };
}

/** `parseEntryLocale` in src/lib/i18n.ts: `id.ar.mdx` → locale 'ar', baseId 'id'. */
function parseName(name) {
  const base = name.replace(/\.mdx?$/, '');
  const m = base.match(/^(.*)\.([a-z]{2})$/);
  return m ? { baseId: m[1], locale: m[2] } : { baseId: base, locale: 'en' };
}

/** Every non-draft entry of one locale across LINKABLE, with its frontmatter. */
function readPool(locale) {
  const pool = [];
  for (const collection of LINKABLE) {
    const dir = path.join(CONTENT, collection);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!/\.mdx?$/.test(name)) continue;
      const { baseId, locale: loc } = parseName(name);
      if (loc !== locale) continue;
      const fm = frontmatter(path.join(dir, name));
      if (fm.draft) continue;
      pool.push({ collection, baseId, key: `${collection}/${baseId}`, ...fm });
    }
  }
  return pool;
}

const count = (hay, needle) => (hay ? hay.split(needle).length - 1 : 0);

/**
 * Per-entry card contribution: `<h3>{card.title}</h3>` + `<p>{card.description}</p>`.
 * `href` is an attribute and `extractVisibleText` strips tags, so the link contributes
 * nothing — E-4 Phase 1 §1 question 3.
 */
const contribution = (entry, term) => count(entry.title, term) + count(entry.description, term);

/**
 * The two bounds, per page.
 *
 *   tight = sum of the top LIMIT DISTINCT sibling contributions   (this file)
 *   loose = LIMIT × the single largest contribution in the pool   (Phase 1)
 *
 * Self-exclusion matches `take()`: `seen` is pre-seeded with `${collection}/${currentId}`,
 * so a page is never its own card. It is keyed on collection+baseId, so a same-baseId entry
 * in a DIFFERENT hub stays in the pool — excluding it would be unsound, not merely loose.
 */
function ceilings(pool, term, pages = pool) {
  const per = [];
  for (const page of pages) {
    const sibling = pool.filter((e) => e.key !== page.key).map((e) => contribution(e, term));
    const top = sibling.sort((a, b) => b - a).slice(0, args.limit);
    per.push({
      page: page.key,
      tight: top.reduce((a, b) => a + b, 0),
      loose: args.limit * (sibling.length ? Math.max(...sibling) : 0),
    });
  }
  return per;
}

const args = parseArgs(process.argv.slice(2));

let pool;
try { pool = readPool(args.locale); }
catch (err) { process.stderr.write(`instrument failed: ${err.message}\n`); process.exit(2); }
if (pool.length === 0) {
  process.stderr.write(`no '${args.locale}' entries found under ${CONTENT}\n`);
  process.exit(2);
}

if (args.falsify) {
  process.stdout.write('\n⚠ --falsify: card limit forced to 1. Assertion A MUST go red, or it is decoration.\n');
}
process.stdout.write(`\nlocale ${args.locale}   candidate pool: ${pool.length} entries   card limit: ${args.limit}\n`);
process.stdout.write(`  ${pool.map((e) => e.key).join('\n  ')}\n`);

// --- §0 soundness assertion B: the static heading must contribute nothing ------------------
process.stdout.write('\n=== ASSERTION B — the static section heading contributes 0 ===\n');
const heading = HEADING[args.locale] ?? '';
const headingHits = CANDIDATES.filter((t) => count(heading, t) > 0);
process.stdout.write(headingHits.length === 0
  ? `  ok — "${heading}" contains none of the ${CANDIDATES.length} candidates\n`
  : `  ⚠ heading carries ${headingHits.join(', ')} — add it to the ceiling as a per-page constant\n`);

// --- the tight ceiling --------------------------------------------------------------------
const rows = [];
for (const term of CANDIDATES) {
  const per = ceilings(pool, term);
  const contributions = pool.map((e) => contribution(e, term));
  rows.push({
    term,
    maxPerCard: Math.max(...contributions),
    carriers: contributions.filter((c) => c > 0).length,
    tight: per.reduce((a, r) => a + r.tight, 0),
    loose: per.reduce((a, r) => a + r.loose, 0),
    per,
  });
}

process.stdout.write('\n=== RELATED CEILING — tight (top-4 distinct) vs loose (4 × max) ===\n');
process.stdout.write('  term'.padEnd(32) + 'carriers'.padStart(9) + 'maxPerCard'.padStart(11)
  + 'TIGHT'.padStart(8) + 'loose'.padStart(8) + 'saved'.padStart(8) + '\n');
for (const r of rows) {
  process.stdout.write('  ' + r.term.slice(0, 29).padEnd(30) + String(r.carriers).padStart(9)
    + String(r.maxPerCard).padStart(11) + String(r.tight).padStart(8) + String(r.loose).padStart(8)
    + String(r.loose - r.tight).padStart(8) + '\n');
}

// --- the projection, and the SETTLED ceiling it makes possible -----------------------------
//
// The measured-pool ceiling above is the sharpest sound bound for TODAY, and it expires the
// moment a route registers — and unlike Phase 1's, it can expire upward without limit:
// `Green River` has no carrier among the nine Arabic files, so its measured ceiling is 0,
// while the English pool that the rollout will translate carries it twice on two spokes.
// A floor justified by a 0 ceiling would be invalidated by an unrelated batch.
//
// So compute a second bound over the pool the completed rollout WILL have, and evaluate it
// per registered page:
//
//     settled(term) = Σ over the registered pages of top-4-distinct over the FULL pool
//
// top-4-distinct is monotone in the pool, so this is an upper bound at every corpus size
// between today and full rollout — it does not expire when a sibling registers, and when a
// PAGE registers the corpus ceiling grows by that page's precomputed row. That converts
// E-3's expiry from "re-measure" into "add a row", which is the property Phase 1 was
// reaching for and got only by being pessimistic.
let projection = null, settled = null;
let enPool = null;
if (args.project) {
  // §5.1's assumption, isolated here and nowhere else: English frontmatter predicts Arabic
  // frontmatter, because policy §4.2 requires Latin names verbatim and E-2 measured en↔ar
  // alignment at Δ 0. Falsified by any ar title/description carrying a §4.2 name more often
  // than its English source does.
  try { enPool = readPool('en'); }
  catch (err) { process.stderr.write(`projection failed: ${err.message}\n`); process.exit(2); }

  // The registered pages, located in the English pool by the same collection+baseId key.
  const registered = pool.map((e) => enPool.find((x) => x.key === e.key)).filter(Boolean);
  process.stdout.write(`\n=== PROJECTION — the same bound over the full pool (${enPool.length} en entries) ===\n`);
  process.stdout.write('  ⚠ prediction, not measurement: assumes ar frontmatter mirrors en term counts\n');
  if (registered.length !== pool.length) {
    process.stdout.write(`  ⚠ ${pool.length - registered.length} registered ar page(s) have no en counterpart — settled ceiling understates\n`);
  }
  process.stdout.write('  term'.padEnd(32) + 'full'.padStart(7) + 'max/pg'.padStart(8)
    + 'SETTLED'.padStart(9) + '  (settled = Σ over the ' + registered.length + ' registered pages)\n');
  projection = []; settled = {};
  for (const term of CANDIDATES) {
    const per = ceilings(enPool, term);
    const full = per.reduce((a, r) => a + r.tight, 0);
    const maxPerPage = Math.max(...per.map((r) => r.tight));
    const here = ceilings(enPool, term, registered).reduce((a, r) => a + r.tight, 0);
    settled[term] = here;
    // The per-page rows are the point, not a detail: the settled ceiling is their SUM over
    // the registered pages, so registering a route adds its row instead of invalidating the
    // bound. Emitted for all 57 so a future expansion is a lookup, not a re-measurement.
    projection.push({ term, full, maxPerPage, settled: here, pages: enPool.length,
      perPage: Object.fromEntries(per.filter((r) => r.tight > 0).map((r) => [r.page, r.tight])) });
    process.stdout.write('  ' + term.slice(0, 29).padEnd(30) + String(full).padStart(7)
      + String(maxPerPage).padStart(8) + String(here).padStart(9) + '\n');
  }

  process.stdout.write('\n  per-page settled rows for the 9 registered pages (0 columns omitted):\n');
  const live = projection.filter((p) => p.settled > 0);
  process.stdout.write('    page'.padEnd(50) + live.map((p) => p.term.slice(0, 9).padStart(10)).join('') + '\n');
  for (const page of registered) {
    process.stdout.write('    ' + page.key.slice(0, 45).padEnd(46)
      + live.map((p) => String(p.perPage[page.key] ?? 0).padStart(10)).join('') + '\n');
  }
  process.stdout.write('    ' + 'Σ (the settled ceiling)'.padEnd(46)
    + live.map((p) => String(p.settled).padStart(10)).join('') + '\n');
}

// --- the reclassification, if a window measurement was supplied ---------------------------
let tables = null;
if (args.window) {
  let win;
  try { win = JSON.parse(readFileSync(args.window, 'utf8')); }
  catch (err) { process.stderr.write(`could not read --window: ${err.message}\n`); process.exit(2); }

  // §0 soundness assertion A — a bound the build already exceeds is not a bound.
  process.stdout.write('\n=== ASSERTION A — ceiling ≥ observed related, per term ===\n');
  let violated = 0;
  for (const r of rows) {
    const observed = win.totals?.[r.term]?.related ?? 0;
    for (const [name, c] of [['measured', r.tight], ['settled', settled?.[r.term]]]) {
      if (c !== undefined && observed > c) {
        violated++; process.stdout.write(`  ⚠ ${r.term}: observed ${observed} > ${name} ${c}\n`);
      }
    }
  }
  process.stdout.write(violated === 0 ? `  ok — all ${rows.length} terms bounded\n` : `  ⚠ ${violated} UNSOUND\n`);
  if (args.falsify) {
    if (violated === 0) {
      process.stderr.write('\ncontrol FAILED: a card limit of 1 produced no violation — Assertion A is not wired to the ceiling.\n');
      process.exit(2);
    }
    process.stdout.write(`  ✔ control red as required (${violated} violation(s) at limit 1)\n`);
  }

  /**
   * feasible ⟺ non_prose_ceiling < observed whole-page count.
   *
   * Feasible means a floor can sit strictly above everything the template alone can produce
   * while still passing today — so it detects TOTAL DELETION. Strong additionally means the
   * headroom is large relative to prose, so the floor also detects PARTIAL DRIFT. A floor may
   * sit anywhere in (ceilNP, whole], so `headroom` is exactly the number of prose occurrences
   * it can demand; below half of prose it tests deletion and little else.
   */
  const classify = (relCeil) => {
    const out = [];
    for (const r of rows) {
      const t = win.totals?.[r.term];
      const c = relCeil(r);
      if (!t || c === undefined) continue;
      const template = t.chrome + t.cta + t.byline;   // differential-stable constants (E-3)
      const ceilNP = template + c;
      const headroom = t.whole - ceilNP;
      const klass = headroom <= 0 ? 'infeasible'
        : headroom >= t.prose / 2 ? 'feasible (strong)' : 'feasible (weak)';
      out.push({ term: r.term, prose: t.prose, template, relCeil: c, ceilNP, whole: t.whole, headroom, klass });
    }
    return out;
  };
  const emit = (title, table) => {
    process.stdout.write(`\n=== RECLASSIFICATION (${title}) — feasible ⟺ ceilNP < whole ===\n`);
    process.stdout.write('  term'.padEnd(32) + 'prose'.padStart(7) + 'tmpl'.padStart(6)
      + 'relCeil'.padStart(9) + 'ceilNP'.padStart(8) + 'whole'.padStart(7) + 'head'.padStart(7) + '  class\n');
    for (const r of table) {
      process.stdout.write('  ' + r.term.slice(0, 29).padEnd(30) + String(r.prose).padStart(7)
        + String(r.template).padStart(6) + String(r.relCeil).padStart(9) + String(r.ceilNP).padStart(8)
        + String(r.whole).padStart(7) + String(r.headroom).padStart(7) + `  ${r.klass}\n`);
    }
  };

  tables = { measured: classify((r) => r.tight), settled: settled ? classify((r) => settled[r.term]) : null };
  emit('MEASURED pool — sharpest, expires on any registration', tables.measured);
  if (tables.settled) {
    emit('SETTLED pool — survives the rollout, expires only per page', tables.settled);
    const diff = tables.measured.filter((m, i) => m.klass !== tables.settled[i].klass);
    process.stdout.write(`\n  the two ceilings disagree on ${diff.length} of ${tables.measured.length} terms:\n`);
    for (const d of diff) {
      const s = tables.settled.find((x) => x.term === d.term);
      process.stdout.write(`    ${d.term.padEnd(28)} measured ${d.klass.padEnd(18)} → settled ${s.klass}\n`);
    }
  }
}

if (args.json) {
  writeFileSync(args.json, JSON.stringify({
    locale: args.locale, pool: pool.map((e) => e.key), limit: args.limit,
    ceilings: rows, projection, reclassification: tables,
  }, null, 2) + '\n', 'utf8');
  process.stdout.write(`\nwrote ${args.json}\n`);
}
