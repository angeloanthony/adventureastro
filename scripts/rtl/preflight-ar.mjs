// Authoring pre-flight for an Arabic batch. Not a gate and not a substitute for one:
// gates read dist/, this reads source, so it can only catch what is decidable in source.
// Its whole job is to fail the cheap way before `npm run build` fails the expensive way.
import { readFileSync } from 'node:fs';

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
const AR_LOCKS = (() => {
  try {
    const g = JSON.parse(readFileSync('i18n-gates/4i-glossary.json', 'utf8'));
    return (g.locales?.ar?.locks ?? []).map((l) => ({ id: l.id, phrase: l.phrase }));
  } catch {
    return null; // reported per file below — an unread registry must not read as "clean"
  }
})();

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
