// scripts/rtl/measure-ar-frontmatter-ceiling.mjs — the rebuilt settled ceiling for
// Arabic-script terms (AR-2 Track E, post-batch-2b model repair).
//
// WHY THIS FILE EXISTS. measure-related-ceiling.mjs computes two ceilings. The MEASURED one
// reads the registered Arabic frontmatter directly and is sound. The SETTLED one — the only
// one that may freeze policy, because it is a Σ over per-page rows and therefore additive
// under registration — is computed over the ENGLISH pool, under the assumption its own code
// states: "assumes ar frontmatter mirrors en term counts".
//
// That assumption is true for a Latin term (§2.2 keeps `Vernal`, `Red Fleet` etc. Latin in
// Arabic frontmatter, so the counts genuinely mirror) and FALSE for an Arabic-script term,
// because the English frontmatter carries the ENGLISH SOURCE of the concept, never the
// Arabic rendering. So the settled ceiling for an Arabic lock is 0 by construction, and
// batch 2b falsified Assertion A the moment the related block grew big enough to carry the
// terms at all (AR2-batch2b-assertion-A.md).
//
// It failed in the UNSAFE direction. A ceiling below reality inflates headroom: batch 2b's
// settled ceiling rated `أرض الديناصورات` feasible (STRONG) with headroom 132, where the
// measured ceiling rates it feasible (WEAK) with headroom 36. A floor frozen in the gap
// could be satisfied by the template alone, and would enforce nothing.
//
// THE REPAIR, and it is deliberately the smallest one that can explain the observations:
// project an Arabic-script term through ITS ENGLISH SOURCE TERM. The correspondence is not
// invented here — it is the glossary lock itself, whose `concept` field names the English
// identity the Arabic phrase is the locked rendering of:
//
//     dinosaur-country   "Dinosaur Country — the destination identity"   → أرض الديناصورات
//     offroad-trail      "trail (the route) — never a blanket word ..."  → المسارات
//
// so the rebuilt ceiling for an Arabic term on a page is the tight (top-4-distinct) bound
// computed over the English pool USING THE ENGLISH SOURCE FORMS. Structurally it is the
// same bound the Latin terms already get; only the string being counted changes.
//
// WHAT MAKES IT SOUND RATHER THAN CONVENIENT. The projection is only valid if translating a
// page cannot introduce the Arabic lock term more often than the English page used its
// source term. That is an empirical claim about translation, not a definition, so this file
// MEASURES it per registered page (Assertion C) instead of assuming it. It is the falsifier:
// one future translated page with ar > en and the rebuilt ceiling is unsound too.
//
// WHAT IT IS NOT. Not a gate. It sets no floor, changes no lock, refreshes no census, and
// cannot fail a build. Exit 0 = the measurements completed; 2 = the instrument did not reach
// a reading, or a soundness assertion failed.
//
//     node scripts/rtl/measure-ar-frontmatter-ceiling.mjs --window <window.json>
//     node scripts/rtl/measure-ar-frontmatter-ceiling.mjs --window <window.json> --falsify

import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const CONTENT = path.join(REPO_ROOT, 'src', 'content');

/** Identical to measure-related-ceiling.mjs — RelatedArticles' LINKABLE, the wider safe set. */
const LINKABLE = [
  'utv', 'atv', 'jeep', 'dinosaur-national-monument', 'things-to-do',
  'hiking', 'camping', 'fishing', 'scenic-drives', 'guides', 'itineraries',
];

const CARD_LIMIT = 4; // RelatedArticles.astro: `limit = 4`, enforced in take(). Structural.

/**
 * THE ADOPTED SETTLED CEILING (E-8 §7 condition 1, adopted here).
 *
 * Model B is the governing bound for an Arabic-script lock:
 *
 *     per page ≤ CARD_LIMIT × AR_MAX_PER_CARD
 *
 * It is adopted over Model A (project through the English source) because it is the simpler
 * model that explains the observations — it needs no cross-language correspondence at all —
 * it is tighter while equally sound, it keeps additivity, and Model A rates `dinosaur-country`
 * INFEASIBLE (ceilNP 250 > whole 182), which would require dropping a live lock on the strength
 * of a mapping rather than a measurement. Model A is retained below as the loose fallback if
 * this constant's falsifier ever fires.
 *
 * ⚠ THIS NUMBER IS A FROZEN ASSUMPTION, NOT A MEASUREMENT. It was measured as 1 over 25 of 57
 * spokes; every later batch must re-assert it. Two things hold it:
 *   - this instrument fails if the measured max/card exceeds it (below), and
 *   - `scripts/rtl/preflight-ar.mjs` fails any Arabic SOURCE file whose title + description
 *     carries a lock phrase more than this many times — before the build, where it is cheap.
 * Raising it here without raising it there (or the reverse) leaves the bound unasserted, so
 * the two are cross-referenced by name in both files.
 */
const AR_MAX_PER_CARD = 1;

/**
 * The Arabic-script locks and the English source each is the locked rendering of.
 *
 * `enSource` is read back out of the glossary's `concept` string rather than typed here, so
 * the correspondence cannot silently drift from the lock it claims to follow. The alternate
 * forms are the inflections an English title or description actually uses; over-listing them
 * can only raise the ceiling, never lower it, which is the safe direction for a bound.
 */
const AR_LOCK_SOURCES = {
  'dinosaur-country': { forms: ['Dinosaur Country'] },
  'offroad-trail': { forms: ['Trails', 'Trail', 'trails', 'trail'] },
};

/**
 * `--equivalence` — the reimplementation control.
 *
 * The rebuilt bound is meant to be the SAME computation the old settled ceiling performs,
 * with only the counted string changed. That claim is worthless if this file's pool
 * discovery, frontmatter parsing or top-4 arithmetic differs from measure-related-ceiling.mjs.
 * So for a Latin candidate — where the English source IS the term — this mode prints the
 * bound, which must equal that script's PROJECTION table exactly. A mismatch means the
 * rebuild is a different computation wearing the same name.
 */
const LATIN_CONTROL = [
  'Vernal', 'Kawasaki KRX 1000', 'Dinosaur National Monument',
  'Adventure Tours Vernal', 'Uintah Basin', 'Green River',
];

function args() {
  const out = { window: null, json: null, falsify: false, equivalence: false };
  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--window') out.window = argv[i + 1];
    else if (argv[i] === '--json') out.json = argv[i + 1];
    else if (argv[i] === '--falsify') out.falsify = true;
    else if (argv[i] === '--equivalence') out.equivalence = true;
  }
  return out;
}
const ARGS = args();

/** Read `title`, `description`, `draft` out of a content file's frontmatter. */
function frontmatter(file) {
  const src = readFileSync(file, 'utf8');
  if (!src.startsWith('---')) throw new Error(`no frontmatter: ${file}`);
  const end = src.indexOf('\n---', 3);
  if (end === -1) throw new Error(`unterminated frontmatter: ${file}`);
  const block = src.slice(3, end);
  const scalar = (key) => {
    const m = block.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
    if (!m) return '';
    let v = m[1].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    return v;
  };
  const title = scalar('title'), description = scalar('description');
  if (!title || !description) throw new Error(`missing title/description: ${file}`);
  return { title, description, draft: scalar('draft') === 'true' };
}

/** Every non-draft English entry across LINKABLE — the full projection pool. */
function englishPool() {
  const pool = [];
  for (const collection of LINKABLE) {
    const dir = path.join(CONTENT, collection);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.mdx') || /\.[a-z]{2}\.mdx$/.test(name)) continue;
      const fm = frontmatter(path.join(dir, name));
      if (fm.draft) continue;
      pool.push({ key: `${collection}/${name.replace(/\.mdx$/, '')}`, ...fm });
    }
  }
  return pool;
}

/**
 * The registered Arabic spokes, from the same registry the routes resolve against.
 *
 * ⚠ THE EXCLUSION IS STRUCTURAL, NOT A NAME — AND THIS FILE IS WHERE IT MATTERS MOST.
 * `tightPerPage()` below adds a bound of up to CARD_LIMIT × AR_MAX_PER_CARD for every page
 * in this list, because the whole model is "a RelatedArticles card renders the target's
 * title + description, and at most four render". A page that renders NO RelatedArticles
 * block contributes no cards and must not contribute a bound. Through Track E the only such
 * registered page was `cancellation-policy`, so the name and the kind coincided; Phase F
 * registers 19 more, which under the old string would have added ≈76 of ceiling for a pool
 * that does not exist — inflating `ceilNP` toward the frozen floor and risking a §11.2
 * criterion-6 verdict, whose remedy is to DROP a live lock, on a fiction.
 *
 * A slug is a spoke iff a translated content-collection file backs it — deliverable 1 of
 * §1.2, the same file the route emission reads. Proven equivalent to the string it replaces
 * on the tree at the time of the change (58 registered → 57 backed + `cancellation-policy`).
 * Mirrored in `measure-prose-window.mjs`; the two must agree or the window and the ceiling
 * are describing different page sets.
 */
function registeredArSpokes() {
  const src = readFileSync(path.join(REPO_ROOT, 'src', 'lib', 'i18n.ts'), 'utf8');
  const block = src.match(/const AR_SLUGS = new Set<string>\(\[([\s\S]*?)\]\);/);
  if (!block) throw new Error('AR_SLUGS block not found in src/lib/i18n.ts');
  return [...block[1].matchAll(/'([^']+)'/g)]
    .map((m) => m[1])
    .filter((s) => existsSync(path.join(REPO_ROOT, 'src', 'content', `${s}.ar.mdx`)));
}

/** Read the two ar locks and pair each with its English source forms. */
function arLocks() {
  const glossary = JSON.parse(readFileSync(path.join(REPO_ROOT, 'i18n-gates', '4i-glossary.json'), 'utf8'));
  const locks = glossary.locales?.ar?.locks ?? [];
  return locks
    .filter((l) => AR_LOCK_SOURCES[l.id])
    .map((l) => ({
      id: l.id,
      phrase: l.phrase,
      concept: l.concept,
      enForms: AR_LOCK_SOURCES[l.id].forms,
    }));
}

const count = (hay, forms) => forms.reduce((n, f) => n + (hay.split(f).length - 1), 0);
const contribution = (entry, forms) => count(entry.title, forms) + count(entry.description, forms);

/**
 * tight(page) = sum of the top LIMIT DISTINCT sibling contributions.
 * Self-exclusion matches take(): a page is never its own card.
 */
function tightPerPage(pool, forms, pages, limit) {
  return pages.map((page) => {
    const sibling = pool.filter((e) => e.key !== page.key).map((e) => contribution(e, forms));
    const top = sibling.sort((a, b) => b - a).slice(0, limit);
    return { page: page.key, tight: top.reduce((a, b) => a + b, 0) };
  });
}

// ---------------------------------------------------------------------------------------

const limit = ARGS.falsify ? 1 : CARD_LIMIT;
const enPool = englishPool();
const registered = registeredArSpokes();
const locks = arLocks();
const out = { limit, enPool: enPool.length, registered: registered.length, locks: [] };

process.stdout.write(`\nAR FRONTMATTER CEILING — rebuilt settled bound for Arabic-script locks\n`);
process.stdout.write(`  en pool: ${enPool.length} entries · registered ar spokes: ${registered.length} · card limit: ${limit}\n`);
if (ARGS.falsify) {
  process.stdout.write('\n⚠ --falsify: card limit forced to 1. Assertion A MUST go red, or it is decoration.\n');
}

// --- the reimplementation control --------------------------------------------------------
if (ARGS.equivalence) {
  process.stdout.write('\n=== EQUIVALENCE — Latin candidates, where the en source IS the term ===\n');
  process.stdout.write('  these MUST equal measure-related-ceiling.mjs\'s PROJECTION table exactly\n');
  process.stdout.write('  term'.padEnd(32) + 'full'.padStart(7) + 'max/pg'.padStart(8) + 'SETTLED'.padStart(9) + '\n');
  const reg = enPool.filter((e) => registered.includes(e.key));
  for (const term of LATIN_CONTROL) {
    const perAll = tightPerPage(enPool, [term], enPool, limit);
    const perReg = tightPerPage(enPool, [term], reg, limit);
    process.stdout.write('  ' + term.slice(0, 29).padEnd(30)
      + String(perAll.reduce((a, r) => a + r.tight, 0)).padStart(7)
      + String(Math.max(...perAll.map((r) => r.tight))).padStart(8)
      + String(perReg.reduce((a, r) => a + r.tight, 0)).padStart(9) + '\n');
  }
}

// --- ASSERTION C — the correspondence the whole projection rests on ----------------------
//
// Per registered page: does the Arabic frontmatter carry the lock term MORE often than the
// English frontmatter carried its source term? If it ever does, projecting through English
// under-counts and the rebuilt ceiling is unsound in the same direction as the old one.
process.stdout.write('\n=== ASSERTION C — ar frontmatter never exceeds its en source, per registered page ===\n');
let cViolations = 0;
for (const lock of locks) {
  let arTotal = 0, enTotal = 0, pagesArOverEn = 0, missing = 0;
  const detail = [];
  for (const slug of registered) {
    const [hub, ...rest] = slug.split('/');
    const base = rest.join('/');
    const arFile = path.join(CONTENT, hub, `${base}.ar.mdx`);
    const enFile = path.join(CONTENT, hub, `${base}.mdx`);
    if (!existsSync(arFile) || !existsSync(enFile)) { missing += 1; continue; }
    const ar = frontmatter(arFile), en = frontmatter(enFile);
    const arC = contribution(ar, [lock.phrase]);
    const enC = contribution(en, lock.enForms);
    arTotal += arC; enTotal += enC;
    if (arC > enC) { pagesArOverEn += 1; cViolations += 1; detail.push({ slug, arC, enC }); }
  }
  process.stdout.write(`  ${lock.phrase}  ⟷  ${lock.enForms[0]}\n`);
  process.stdout.write(`     ar ${arTotal}  ·  en ${enTotal}  ·  pages where ar > en: ${pagesArOverEn}/${registered.length - missing}`);
  process.stdout.write(pagesArOverEn === 0 ? '   ✔\n' : '   ⚠ UNSOUND\n');
  for (const d of detail) process.stdout.write(`       ⚠ ${d.slug}: ar ${d.arC} > en ${d.enC}\n`);
  out.locks.push({ id: lock.id, phrase: lock.phrase, enForms: lock.enForms, arTotal, enTotal, pagesArOverEn });
}
process.stdout.write(cViolations === 0
  ? '  ✔ correspondence holds on every registered page — projecting through en never under-counts\n'
  : `  ⚠ ${cViolations} page(s) break it — the rebuilt ceiling is NOT sound\n`);

// --- the rebuilt settled ceiling ---------------------------------------------------------
process.stdout.write('\n=== REBUILT SETTLED CEILING — tight bound over the en pool, counting the EN SOURCE ===\n');
process.stdout.write('  lock'.padEnd(24) + 'carriers'.padStart(9) + 'max/card'.padStart(10)
  + 'max/page'.padStart(10) + 'REBUILT'.padStart(9) + '   (Σ over the registered pages)\n');
const registeredEntries = enPool.filter((e) => registered.includes(e.key));
for (const lock of locks) {
  const contributions = enPool.map((e) => contribution(e, lock.enForms));
  const per = tightPerPage(enPool, lock.enForms, registeredEntries, limit);
  const rebuilt = per.reduce((a, r) => a + r.tight, 0);
  const rec = out.locks.find((l) => l.id === lock.id);
  Object.assign(rec, {
    carriers: contributions.filter((c) => c > 0).length,
    maxPerCard: Math.max(...contributions),
    maxPerPage: Math.max(...per.map((r) => r.tight)),
    rebuilt,
    perPage: Object.fromEntries(per.map((r) => [r.page, r.tight])),
  });
  process.stdout.write('  ' + lock.phrase.slice(0, 21).padEnd(22)
    + String(rec.carriers).padStart(9) + String(rec.maxPerCard).padStart(10)
    + String(rec.maxPerPage).padStart(10) + String(rebuilt).padStart(9) + '\n');
}

// --- MODEL B — the per-card constant, measured on Arabic and re-asserted per batch -------
//
// Model A above projects through English and is sound but loose: it lets an Arabic card
// contribute as often as the English card contributed its source term (up to 2 for
// `Dinosaur Country`). Model B bounds the Arabic card directly instead:
//
//     per page ≤ CARD_LIMIT × max contribution of the lock phrase to ANY ar frontmatter
//
// It needs no cross-language mapping at all, which makes it the simpler of the two, and its
// falsifier is a single source-level number that any batch can check before it builds: an
// Arabic title+description carrying the lock phrase more than `maxPerCardAr` times.
process.stdout.write('\n=== MODEL B — ADOPTED settled ceiling (per-card constant, measured on ar frontmatter) ===\n');
process.stdout.write(`  adopted AR_MAX_PER_CARD = ${AR_MAX_PER_CARD}; the bound is CARD_LIMIT × that, summed per page.\n`);
process.stdout.write('  lock'.padEnd(24) + 'max/card(ar)'.padStart(14) + 'per page'.padStart(10)
  + 'MODEL B'.padStart(9) + '   vs adopted\n');
let bViolations = 0;
for (const lock of locks) {
  const rec = out.locks.find((l) => l.id === lock.id);
  let maxPerCardAr = 0;
  let worstFile = null;
  for (const slug of registered) {
    const [hub, ...rest] = slug.split('/');
    const arFile = path.join(CONTENT, hub, `${rest.join('/')}.ar.mdx`);
    if (!existsSync(arFile)) continue;
    const c = contribution(frontmatter(arFile), [lock.phrase]);
    if (c > maxPerCardAr) { maxPerCardAr = c; worstFile = slug; }
  }
  // The bound is computed from the ADOPTED constant, not from the measurement, because the
  // frozen policy is what the floors were placed against. The measurement's only job here is
  // to falsify it. Using max(measured, adopted) would silently absorb a violation into a
  // higher ceiling and the floor placed under the old one would go quietly unsound.
  const perPage = limit * AR_MAX_PER_CARD;
  const modelB = perPage * registered.length;
  const ok = maxPerCardAr <= AR_MAX_PER_CARD;
  if (!ok) bViolations += 1;
  Object.assign(rec, { maxPerCardAr, maxPerCardArFile: worstFile, adoptedMaxPerCard: AR_MAX_PER_CARD, modelB, modelBSound: ok });
  process.stdout.write('  ' + lock.phrase.slice(0, 21).padEnd(22) + String(maxPerCardAr).padStart(14)
    + String(perPage).padStart(10) + String(modelB).padStart(9)
    + (ok ? '   ✔ within adopted\n' : `   ⚠ FALSIFIED by ${worstFile} (${maxPerCardAr} > ${AR_MAX_PER_CARD})\n`));
}
out.modelBViolations = bViolations;
process.stdout.write(bViolations === 0
  ? `  ✔ the adopted constant holds on all ${registered.length} registered ar frontmatters\n`
  : '  ⚠ MODEL B FALSIFIED — the adopted ceiling is too low, every floor placed under it is\n'
    + '    unsound, and preflight-ar.mjs should have caught this in source. Fall back to Model A.\n');

// --- ADDITIVITY — the property that lets a batch add a row instead of invalidating the bound
process.stdout.write('\n=== ADDITIVITY — the ceiling is Σ over per-page rows, so registration ADDS ===\n');
for (const lock of locks) {
  const rec = out.locks.find((l) => l.id === lock.id);
  const rows = registeredEntries.map((e) => rec.perPage[e.key] ?? 0);
  const marks = [9, 17, 25].filter((n) => n <= rows.length);
  const partial = marks.map((n) => `${n}p → ${rows.slice(0, n).reduce((a, b) => a + b, 0)}`);
  const perPageConstant = new Set(rows).size === 1;
  process.stdout.write(`  ${lock.phrase.padEnd(20)} ${partial.join('   ')}   `
    + `${perPageConstant ? `constant ${rows[0]}/page` : `varies ${Math.min(...rows)}–${Math.max(...rows)}/page`}\n`);
}
process.stdout.write('  Every row is ≥ 0 and independent of the others, so the sum is monotone\n'
  + '  non-decreasing in the registered set: a new batch appends rows and can never lower it.\n');

// --- ASSERTION A — against the rebuilt ceiling -------------------------------------------
let aViolations = 0;
if (ARGS.window) {
  let win;
  try { win = JSON.parse(readFileSync(ARGS.window, 'utf8')); }
  catch (err) { process.stderr.write(`could not read --window: ${err.message}\n`); process.exit(2); }
  // ⚠ RECORDED BUT DEMOTED (E-8 §5). This assertion is kept — it is load-bearing for the Latin
  // locks, where `Vernal` observed 174 against a limit-1 ceiling of 75 — and it is asserted
  // against the ADOPTED ceiling rather than the loose one. But for the Arabic locks the
  // `--falsify` control does NOT go red, so per METHOD rule 5 it cannot discriminate a good
  // bound from a bad one at this corpus scale and must not be cited as evidence of soundness.
  // The label below says so on every run, so a future reader cannot take a green tick for more
  // than it is worth. The check that discriminates is ENFORCEABILITY, further down.
  process.stdout.write('\n=== ASSERTION A — adopted (Model B) ceiling ≥ observed related, per lock ===\n');
  process.stdout.write('  ⚠ DEMOTED for these locks: the --falsify control does not go red (E-8 §5),\n'
    + '    so a green tick here is NOT evidence the bound is sound. Reported, not cited.\n');
  for (const lock of locks) {
    const rec = out.locks.find((l) => l.id === lock.id);
    const observed = win.totals?.[lock.phrase]?.related ?? 0;
    rec.observedRelated = observed;
    const ok = observed <= rec.modelB;
    if (!ok) aViolations += 1;
    process.stdout.write(`  ${lock.phrase.padEnd(20)} observed ${String(observed).padStart(4)}`
      + `   adopted ${String(rec.modelB).padStart(4)}   (model A ${String(rec.rebuilt).padStart(4)})`
      + `   ${ok ? '✔' : '⚠ UNSOUND'}\n`);
  }
  process.stdout.write(aViolations === 0
    ? `  ✔ all ${locks.length} lock(s) bounded — non-discriminating, see the note above\n`
    : `  ⚠ ${aViolations} UNSOUND\n`);

  // --- the comparison the milestone exists to produce ------------------------------------
  process.stdout.write('\n=== COMPARISON — old settled vs model A vs ADOPTED model B vs observed ===\n');
  process.stdout.write('  lock'.padEnd(24) + 'oldSet'.padStart(8) + 'modelA'.padStart(8)
    + 'ADOPTED'.padStart(9) + 'observed'.padStart(10) + 'prose'.padStart(8) + 'tmpl'.padStart(7)
    + 'ceilNP'.padStart(8) + 'whole'.padStart(8) + 'head'.padStart(7) + '  class\n');
  for (const lock of locks) {
    const rec = out.locks.find((l) => l.id === lock.id);
    const t = win.totals?.[lock.phrase] ?? {};
    const prose = t.prose ?? 0, whole = t.whole ?? 0;
    const tmpl = (t.cta ?? 0) + (t.byline ?? 0) + (t.chrome ?? 0);
    const ceilNP = tmpl + rec.modelB;          // ADOPTED — Model B, not the loose Model A
    const ceilNPModelA = tmpl + rec.rebuilt;   // retained: the fallback if Model B is falsified
    const head = whole - ceilNP;
    const cls = ceilNP >= whole ? 'infeasible' : (head >= prose / 2 ? 'feasible (strong)' : 'feasible (weak)');
    Object.assign(rec, { prose, whole, tmpl, ceilNP, ceilNPModelA, headroom: head, class: cls });
    process.stdout.write('  ' + lock.phrase.slice(0, 21).padEnd(22)
      + String(0).padStart(8) + String(rec.rebuilt).padStart(8) + String(rec.modelB).padStart(9)
      + String(rec.observedRelated).padStart(10)
      + String(prose).padStart(8) + String(tmpl).padStart(7) + String(ceilNP).padStart(8)
      + String(whole).padStart(8) + String(head).padStart(7) + '  ' + cls + '\n');
  }
  process.stdout.write('\n  ⚠ A floor must sit strictly inside (ceilNP, whole], read from the ADOPTED column.\n'
    + '    Under model A `أرض الديناصورات` is infeasible (ceilNP exceeds whole) and the lock would\n'
    + '    have to be dropped; that is the substantive consequence of the model choice.\n');

  // --- THE ENFORCEABILITY TEST -----------------------------------------------------------
  //
  // Every ceiling above is a bound on what the template COULD contribute. The question a
  // floor actually has to answer is blunter, needs no model at all, and is therefore the one
  // to check first: if every word of Arabic PROSE were deleted, would gate 4i still pass?
  //
  // 4i counts over the WHOLE page (E-3), so the surviving count is whole − prose. A floor at
  // or below that number is satisfied by chrome, CTA and related cards alone — it cannot
  // detect the deletion of the entire corpus it exists to protect.
  process.stdout.write('\n=== ENFORCEABILITY — would the frozen floor survive total prose deletion? ===\n');
  const frozen = (() => {
    try {
      const census = JSON.parse(readFileSync(path.join(REPO_ROOT, 'census', 'phrase-count.json'), 'utf8'));
      return Object.fromEntries(census.facts
        .filter((f) => f.key?.locale === 'ar' && f.kind === 'phrase-count')
        .map((f) => [f.key.phrase, f.value]));
    } catch { return {}; }
  })();
  // ⚠ POPULATION. `whole`/`prose` above are summed over the registered SPOKES. The census
  // freezes over EVERY registered ar route, which additionally includes every STATIC page —
  // pages that render no RelatedArticles, CTA or byline. Comparing the two directly is the
  // §10.2 mismatch that predicted 32/41 against a frozen 33/42, so the static pages' own
  // counts are added rather than assumed — and if the window did not emit them, that is
  // stated instead of silently ignored.
  //
  // ⚠ WAS `win.inline`, A SINGLE PAGE, UNTIL PHASE F. It is read as an ARRAY now because the
  // static set went from one page to twenty. A window written by the pre-Phase-F script has
  // no `statics` key at all, and that must not read as "no static pages" — a silent zero here
  // understates `whole` by every static page's contribution and, because criterion 5 is
  // `survives = whole − prose < floor`, understates `survives` too, which is the direction
  // that reports a DEAD floor as enforcing. So an absent key is refused, not defaulted.
  if (!Array.isArray(win.statics)) {
    process.stderr.write('  ✘ this window has no `statics` array — it was written by a pre-Phase-F\n'
      + '    measure-prose-window.mjs, whose static population was a single hardcoded page.\n'
      + '    Refusing to compute criterion 5 against it. Re-run measure-prose-window.mjs.\n');
    process.exit(2);
  }
  /** Sum one term across every static page. */
  const staticSum = (phrase, comp) =>
    win.statics.reduce((n, s) => n + (s.totals?.[phrase]?.[comp] ?? 0), 0);
  process.stdout.write('  lock'.padEnd(24) + 'floor'.padStart(7) + 'whole'.padStart(8)
    + 'prose'.padStart(8) + 'survives'.padStart(10) + '   verdict\n');
  for (const lock of locks) {
    const rec = out.locks.find((l) => l.id === lock.id);
    const floor = frozen[lock.phrase];
    const wholeC = rec.whole + staticSum(lock.phrase, 'whole');
    const proseC = rec.prose + staticSum(lock.phrase, 'prose');
    const tmplC = rec.tmpl + staticSum(lock.phrase, 'cta')
      + staticSum(lock.phrase, 'byline') + staticSum(lock.phrase, 'chrome');
    const survives = wholeC - proseC; // what remains with every word of ar prose gone
    const detects = floor !== undefined && survives < floor;
    Object.assign(rec, {
      censusPages: registered.length + win.statics.length,
      wholeCensus: wholeC, proseCensus: proseC, tmplCensus: tmplC,
      ceilNPCensus: tmplC + rec.modelB,
      frozenFloor: floor, survivesDeletion: survives, detectsDeletion: detects,
    });
    process.stdout.write('  ' + lock.phrase.slice(0, 21).padEnd(22)
      + String(floor ?? '—').padStart(7) + String(wholeC).padStart(8)
      + String(proseC).padStart(8) + String(survives).padStart(10)
      + (detects ? `   ✔ detects (margin ${floor - survives})` : '   ⚠ DEAD — template alone satisfies it') + '\n');
  }
  process.stdout.write('\n  A floor below `survives` enforces nothing: the page could lose every word of\n'
    + '  Arabic prose and 4i would still be green. This test needs no ceiling model — it is\n'
    + '  arithmetic on the measured window — so it holds whatever the projection turns out to be.\n');

  // --- THE PROJECTED REFRESH ---------------------------------------------------------------
  //
  // A census refresh sets each floor to the measured whole-page corpus total, so the floor it
  // WILL freeze is computable before it is run. Projecting it first is what turns the refresh
  // from a leap into a checked step: if the projection does not clear both bars, the refresh
  // must not happen, because re-freezing is exactly how the dead floor got frozen in the
  // first place. Both bars are E-8 §7 condition 3.
  process.stdout.write('\n=== PROJECTED REFRESH — the floor a re-freeze would set, checked BEFORE running it ===\n');
  process.stdout.write('  lock'.padEnd(24) + 'now'.padStart(6) + 'after'.padStart(7)
    + 'ceilNP'.padStart(8) + 'survives'.padStart(10) + '   placement          enforceability\n');
  let projFail = 0;
  for (const lock of locks) {
    const rec = out.locks.find((l) => l.id === lock.id);
    const after = rec.wholeCensus;                       // what census:phrase-count would record
    const placed = after > rec.ceilNPCensus && after <= rec.wholeCensus;  // inside (ceilNP, whole]
    const enforces = rec.survivesDeletion < after;
    if (!placed || !enforces) projFail += 1;
    Object.assign(rec, { projectedFloor: after, projectedPlacementOk: placed, projectedEnforces: enforces });
    process.stdout.write('  ' + lock.phrase.slice(0, 21).padEnd(22)
      + String(rec.frozenFloor ?? '—').padStart(6) + String(after).padStart(7)
      + String(rec.ceilNPCensus).padStart(8) + String(rec.survivesDeletion).padStart(10)
      + (placed ? `   ✔ in (${rec.ceilNPCensus}, ${rec.wholeCensus}]` : `   ⚠ OUTSIDE (${rec.ceilNPCensus}, ${rec.wholeCensus}]`).padEnd(22)
      + (enforces ? `✔ margin ${after - rec.survivesDeletion}` : '⚠ STILL DEAD') + '\n');
  }
  out.projectedRefreshOk = projFail === 0;
  process.stdout.write(projFail === 0
    ? '  ✔ every projected floor clears its ceiling AND detects total prose deletion — refresh is safe\n'
    : `  ⚠ ${projFail} lock(s) would not be enforcing after a refresh — DO NOT re-freeze\n`);
}

if (ARGS.falsify) {
  if (aViolations === 0) {
    // NOT an instrument error, and worth stating exactly: at a card limit of 1 — a
    // deliberately unsound bound, since the component renders four — Assertion A still
    // passes. The observed related contribution for these locks (single digits) is so far
    // below any plausible ceiling that the assertion cannot discriminate between a good
    // bound and a bad one. Per METHOD rule 5 that makes it decoration FOR THESE TERMS, and
    // a passing Assertion A must therefore not be cited as evidence the rebuild is sound.
    //
    // The check that does discriminate is the ENFORCEABILITY test, which compares the frozen
    // floor against whole − prose. It needs no ceiling model and it already separates the two
    // locks (one dead, one alive with margin 13).
    process.stderr.write('\n⚠ control NOT RED: at card limit 1 the rebuilt ceiling still exceeds observed related\n'
      + '  for every ar lock, so ASSERTION A CANNOT DISCRIMINATE at this corpus scale and must not\n'
      + '  be cited as evidence. Observed related is single-digit against a ceiling in the hundreds.\n'
      + '  The load-bearing check for these locks is the enforceability test, not Assertion A.\n');
    process.exit(2);
  }
  process.stdout.write(`\n  ✔ control red as required (${aViolations} Assertion A violation(s) at limit 1)\n`);
}

if (ARGS.json) { writeFileSync(ARGS.json, JSON.stringify(out, null, 2)); process.stdout.write(`\nwrote ${ARGS.json}\n`); }
// A falsified Model B is a failed soundness assertion on the ADOPTED ceiling, so it exits the
// same way Assertion C does. Model A's soundness (cViolations) still matters because Model A is
// the declared fallback: if B is falsified, A is what the program falls back to.
if ((cViolations > 0 || bViolations > 0) && !ARGS.falsify) process.exit(2);
process.stdout.write('\n');
