// Authoring pre-flight for an Arabic batch. Not a gate and not a substitute for one:
// gates read dist/, this reads source, so it can only catch what is decidable in source.
// Its whole job is to fail the cheap way before `npm run build` fails the expensive way.
import { readFileSync, existsSync } from 'node:fs';

const LATIN = /[A-Za-z]/;
const ARABIC_INDIC = /[٠-٩۰-۹]/;

/**
 * MODEL B'S FALSIFIER (AR-2 Track E, E-8 §7 condition 2).
 *
 * The adopted settled ceiling for an Arabic-script glossary lock is
 * `CARD_LIMIT × AR_MAX_PER_CARD` — a RelatedArticles card renders exactly the target page's
 * `title` and `description` (`RelatedArticles.astro:107-108,118-119`) and at most four cards
 * render (`limit = 4`), so this constant is the whole model. The `ar` glossary floors are
 * placed strictly above the ceiling it produces.
 *
 * ⚠ It is a FROZEN ASSUMPTION, measured over 25 of 57 spokes, not a law. One Arabic file whose
 * title + description carries a lock phrase twice raises the real ceiling by 4 per page and
 * makes every floor placed under the old one unsound — and nothing downstream would say so:
 * gate 4i only enforces a MINIMUM, so a higher ceiling never turns it red. That is why the
 * check lives here, in source, where it costs a second instead of a build.
 *
 * Cross-referenced with `AR_MAX_PER_CARD` in `scripts/rtl/measure-ar-frontmatter-ceiling.mjs`,
 * which re-measures the same number across the whole registered corpus and fails if the two
 * drift apart. Raising it in one place without the other leaves the bound unasserted.
 */
const AR_MAX_PER_CARD = 1;

/**
 * ASSERTION C, moved from measurement time to authoring time (AR-2 batch 3).
 *
 * Model A — the declared FALLBACK if `AR_MAX_PER_CARD` is ever falsified — projects an
 * Arabic lock through its English source term, and that projection is sound only while an
 * Arabic card never carries the lock more often than the English card carried its source.
 * `measure-ar-frontmatter-ceiling.mjs` measures it as Assertion C.
 *
 * ⚠ Batch 3 falsified it on first contact, and the cause was ordinary translator instinct:
 * the Arabic `description` for `fishing-flaming-gorge` added the destination identity
 * `أرض الديناصورات` where the English description never says "Dinosaur Country". Nothing was
 * wrong with the sentence — but it silently retired the fallback model, and no gate would
 * ever have said so. Catching it here costs a second; catching it after a build costs a build,
 * and catching it never costs the fallback.
 *
 * The English source forms are the ones the ceiling instrument projects through; they are
 * duplicated here rather than imported because this script deliberately depends on nothing.
 */
const AR_LOCK_EN_SOURCES = {
  'dinosaur-country': ['Dinosaur Country'],
  'offroad-trail': ['Trails', 'Trail', 'trails', 'trail'],
};
const AR_LOCKS = (() => {
  try {
    const g = JSON.parse(readFileSync('i18n-gates/4i-glossary.json', 'utf8'));
    return (g.locales?.ar?.locks ?? []).map((l) => ({ id: l.id, phrase: l.phrase }));
  } catch {
    return null; // reported per file below — an unread registry must not read as "clean"
  }
})();

/** Count `title` + `description` occurrences of any of `forms` in a file's frontmatter. */
function cardCount(src, forms) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) return null;
  const fm = m[1];
  const one = (key) => (fm.match(new RegExp(`^${key}:\\s*"([\\s\\S]*?)"\\s*$`, 'm')) || [])[1] ?? '';
  const card = `${one('title')}\n${one('description')}`;
  return forms.reduce((n, f) => n + (card.split(f).length - 1), 0);
}

let bad = 0;
const say = (f, msg) => { console.log(`  ${f}: ${msg}`); bad++; };

for (const path of process.argv.slice(2)) {
  const file = path.split(/[\\/]/).pop();
  const src = readFileSync(path, 'utf8');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) { say(file, 'no frontmatter'); continue; }
  const [, fm, body] = m;

  // schema, §2.4 — fails before any gate runs, so check it first.
  // The title cap is NOT in the brief; batch 2b's first build found it at 69/65.
  const title = fm.match(/^title:\s*"([\s\S]*?)"\s*$/m);
  if (!title) say(file, 'no title');
  else if ([...title[1]].length > 65) say(file, `title ${[...title[1]].length} chars, over the 65 cap`);

  const desc = fm.match(/^description:\s*"([\s\S]*?)"\s*$/m);
  if (!desc) say(file, 'no description');
  else {
    const n = [...desc[1]].length;
    if (n < 120 || n > 165) say(file, `description ${n} chars, outside 120-165`);
  }

  // The settled ceiling's falsifier. The "card" is title + description because that is
  // exactly what RelatedArticles renders — the same pair the ceiling instrument counts.
  if (AR_LOCKS === null) {
    say(file, 'could not read i18n-gates/4i-glossary.json — the per-card ceiling is UNASSERTED');
  } else {
    const card = `${title?.[1] ?? ''}\n${desc?.[1] ?? ''}`;
    for (const lock of AR_LOCKS) {
      const n = card.split(lock.phrase).length - 1;
      if (n > AR_MAX_PER_CARD) {
        say(file, `lock "${lock.id}" occurs ${n}× in title+description, over the adopted per-card `
          + `ceiling of ${AR_MAX_PER_CARD} — this FALSIFIES the settled ceiling and unsounds every `
          + `ar glossary floor. Reword, or re-run measure-ar-frontmatter-ceiling.mjs and re-place the floors.`);
      }
      // Assertion C — the fallback model's soundness, checked against the English sibling.
      const enForms = AR_LOCK_EN_SOURCES[lock.id];
      const enPath = path.replace(/\.ar\.mdx$/, '.mdx');
      if (enForms && n > 0 && existsSync(enPath)) {
        const enN = cardCount(readFileSync(enPath, 'utf8'), enForms);
        if (enN !== null && n > enN) {
          say(file, `lock "${lock.id}" occurs ${n}× in title+description but its English source `
            + `"${enForms[0]}" occurs ${enN}× in the English sibling's — this breaks ASSERTION C and `
            + `retires Model A, the declared fallback ceiling. Either mirror the English frontmatter `
            + `or accept the fallback's loss deliberately, in writing.`);
        }
      }
    }
  }

  // policy §3 — no exception, anywhere
  if (ARABIC_INDIC.test(src)) say(file, 'Arabic-Indic digit present');
  if (src.includes('→')) say(file, 'U+2192 arrow present (gate 4o)');
  // policy §5.2 — the isolate is <bdi>, never a control character
  if (/[‎‏⁦-⁩]/.test(src)) say(file, 'bidi control character present');
  // frontmatter is not markup-processed; bidi-runs.ts isolates named runs only
  if (/<bdi>/.test(fm)) say(file, '<bdi> in frontmatter — it will render literally');

  // §3.3 / §3.5, the two measured defect classes. In frontmatter there is no <bdi>
  // available, so a bracket that opens on a digit or closes on Latin is unfixable
  // by markup and gate 4n WILL block the build.
  for (const [where, text, fixable] of [['frontmatter', fm, false], ['body', body, true]]) {
    // Three things are not direction changes to the text around them, and scanning
    // them produces false positives rather than findings:
    //   1. anything already inside a <bdi> isolate;
    //   2. the NAMED runs — phone and currency — which bidi-runs.ts isolates even in
    //      frontmatter, which is why the gate-green pilot corpus carries bare `(435) …`;
    //   3. MDX comments, which are never rendered at all.
    const scan = text
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
      .replace(/<bdi>[\s\S]*?<\/bdi>/g, 'ـ')
      .replace(/\(\d{3}\)\s*\d{3}-\d{4}/g, 'ـ')
      .replace(/\$[\d,]+/g, 'ـ');
    for (const par of scan.match(/\([^()\n]{1,400}\)/g) || []) {
      const inner = par.slice(1, -1);
      if (/^\s*\d/.test(inner)) say(file, `${where} §3.3 bracket opens on a digit: ${par.slice(0, 60)}`);
      const tail = inner.replace(/<\/?[a-z]+>/g, '').trimEnd();
      if (LATIN.test(tail.slice(-1)) && !(fixable && /<\/bdi>\s*$/.test(inner.trimEnd()))) {
        say(file, `${where} §3.5 parenthetical closes on Latin: …${par.slice(-60)}`);
      }
    }
  }

  // §1.2 deliverable 2 — the silent-divergence failure mode
  const slug = file.replace(/\.ar\.mdx$/, '');
  const hub = path.split(/[\\/]/).slice(-2)[0];
  // Scope to the AR_SLUGS block: every other locale registry holds the same slug
  // strings, so an unscoped search reports every unregistered page as registered.
  const i18n = readFileSync('src/lib/i18n.ts', 'utf8');
  const arBlock = i18n.match(/const AR_SLUGS = new Set<string>\(\[([\s\S]*?)\]\);/);
  if (!arBlock) say(file, 'AR_SLUGS block not found in i18n.ts');
  else if (!arBlock[1].includes(`'${hub}/${slug}'`)) {
    say(file, `not in AR_SLUGS — route will not emit as ${hub}/${slug}`);
  }
}
console.log(bad ? `\n${bad} finding(s)` : '\nclean');
