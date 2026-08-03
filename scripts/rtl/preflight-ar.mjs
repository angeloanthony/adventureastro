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

// FAIL CLOSED ON NO INPUT. This script takes paths as argv, so a bare invocation used to
// loop zero times and print "clean" — a verifier reporting success for checking nothing,
// indistinguishable from a real pass. Batch 7b ran it that way and believed the result.
// The implementation was never wrong; the interface was.
const INPUTS = process.argv.slice(2);
if (INPUTS.length === 0) {
  console.error('preflight-ar: no input files specified; nothing was checked.');
  console.error('usage: node scripts/rtl/preflight-ar.mjs <file.ar.mdx> [...]');
  process.exit(2);
}

for (const path of INPUTS) {
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

  // §3.3 / §3.5 / §3.7 — the bracket classes, decided the way GATE 4n decides them: by the
  // FLANKS. In frontmatter there is no <bdi> available, so any of these is unfixable by
  // markup and gate 4n WILL block the build.
  //
  // ⚠ THIS REPLACED TWO NARROWER CHECKS, AND BATCH 6b IS WHY. The old pair looked only at the
  // text INSIDE the brackets — "opens on a digit" (§3.3) and "closes on Latin" (§3.5) — and
  // reported clean on a batch whose first build then stopped at gate 4n with 5 findings. The
  // two shapes that got through are the mirror images of the two that were checked:
  //
  //     جبال Uinta (تمتدّ …          "(" preceded by LATIN   -> flanked L … R
  //     … البرّية (أُعلنت عام 1984)   ")" preceded by a DIGIT  -> flanked N … R
  //
  // Batch 5 had already corrected the brief on exactly this point — "the discriminator is the
  // FLANKS, never what the bracket encloses" — and this script had not been brought along. The
  // flank test is a strict superset: a §3.3 bracket is R…N, a §3.5 bracket is L…R, and a run
  // already wrapped in <bdi> collapses to a tatweel above so its flanks match, which is the
  // same exemption the old check spelled out by hand.
  //
  // Validated against both controls before shipping (the batch-6a standard):
  //   POSITIVE — reproduces gate 4n's 5 findings exactly on the reconstructed pre-fix files.
  //   FALSE-POSITIVE — 0 findings across all 46 `.ar.mdx` sources, a corpus gate 4n passes.
  // The false-positive control is what found the two exclusions below; neither was predicted.
  const ARABIC_L = /\p{Script=Arabic}/u, LATIN_L = /\p{Script=Latin}/u, DIGIT_L = /\p{Nd}/u;
  const dirClass = (ch) => !ch ? null
    : ARABIC_L.test(ch) ? 'R' : LATIN_L.test(ch) ? 'L' : DIGIT_L.test(ch) ? 'N' : null;
  /** Nearest directionally-classified character walking outward; neutrals are scanned past. */
  const flankOf = (t, i, d) => {
    for (let j = i + d; j >= 0 && j < t.length; j += d) {
      const c = dirClass(t[j]);
      if (c) return c;
    }
    return null;
  };
  const bracketFlankFindings = (t) => {
    const out = [];
    for (let i = 0; i < t.length; i++) {
      if (t[i] !== '(' && t[i] !== ')') continue;
      const before = flankOf(t, i, -1), after = flankOf(t, i, +1);
      // A missing flank is a text-run edge, not a direction change. R…R / L…L / N…N are not
      // changes either. Everything else is what gate 4n reports, in the gate's own vocabulary.
      if (!before || !after || before === after) continue;
      out.push({ ch: t[i], before, after, ctx: t.slice(Math.max(0, i - 40), i + 20).replace(/\s+/g, ' ').trim() });
    }
    return out;
  };
  // Frontmatter is scanned PER QUOTED SCALAR. Its YAML keys (`a:`, `q:`) are Latin letters
  // that never reach a text node, so scanning the block whole would let one FAQ answer's
  // closing bracket take its flank from the next answer's key.
  const fmScalars = (fm.match(/"(?:[^"\\]|\\.)*"/g) || []).join('\n');
  for (const [where, text, fixable] of [['frontmatter', fmScalars, false], ['body', body, true]]) {
    // Three things are not direction changes to the text around them, and scanning
    // them produces false positives rather than findings:
    //   1. anything already inside a <bdi> isolate;
    //   2. the NAMED runs — phone and currency — which bidi-runs.ts isolates even in
    //      frontmatter, which is why the gate-green pilot corpus carries bare `(435) …`;
    //   3. MDX comments, which are never rendered at all.
    const scan = text
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
      // 4. HTML ATTRIBUTE VALUES. Gate 4n reads rendered TEXT NODES; an attribute is never
      //    one, so a bracket inside `style="…var(--charcoal)…"` is not a direction change
      //    anywhere. Found by batch 6a, the first Arabic file to carry a CSS custom
      //    property: it reported a §3.5 finding that no gate could ever agree with, which
      //    is the shape that trains an author to ignore this script. The YAML `key: "…"`
      //    form does not match (it needs `=` immediately before the quote), so frontmatter
      //    FAQ answers are untouched.
      .replace(/\s[a-zA-Z-]+="[^"]*"/g, ' ')
      .replace(/<bdi>[\s\S]*?<\/bdi>/g, 'ـ')
      // ⚠ THE NAMED-RUN EXEMPTIONS ARE SURFACE-SCOPED, AND BATCH 7b IS WHY. `bidi-runs.ts`
      // coverage is per-COMPONENT, not per-surface: FAQ frontmatter reaches the formatter
      // through FaqAccordion -> <Bidi>, and raw MDX body prose reaches nothing. Exempting the
      // phone on BOTH surfaces let a page through clean whose first build then stopped at
      // gate 4n with 6 findings, all of them `(` flanked R … N on a bare body phone. Same
      // shape as the batch-6b gap: the rule was right and the tool had not been brought along.
      //
      // Controls run before shipping (the batch-6a standard):
      //   POSITIVE — reproduces gate 4n's 6 findings exactly on the reconstructed pre-fix file.
      //   FALSE-POSITIVE — 0 findings across all 50 `.ar.mdx` bodies: every body phone in the
      //   corpus is already isolated, in one of the two placements `<bdi><a>…</a></bdi>` or
      //   `<a><bdi>…</bdi></a>`.
      .replace(/\(\d{3}\)\s*\d{3}-\d{4}/g, where === 'frontmatter' ? 'ـ' : '$&')
      // ⚠ CURRENCY STAYS EXEMPT ON BOTH SURFACES — MEASURED, NOT ASSUMED. The symmetry is
      // tempting and it is wrong. `$` is Bidi_Mirrored=No, so gate 4n never had an opinion
      // here, and the instrument that does — measure-currency.mjs — reads the corpus's bare
      // body runs (`بسعر $349`, `من $329`, 11 of them across two shipped pages) as **LTR,
      // visual = logical**. Scoping this the way the phone is scoped would manufacture
      // findings against prose that measurably renders correctly. The frontmatter case that
      // DOES reverse (E-1b, `349$` via a RelatedArticles description) is a different surface
      // reached by a different component, and it is already covered above.
      .replace(/\$[\d,]+/g, 'ـ')
      // 5. MARKDOWN LINK TARGETS. `[نصّ](/some/path/)` renders as an anchor whose href is
      //    never a text node, so those parentheses are not brackets in rendered prose. Left
      //    in, they produced 19 findings across 2 files that no gate could agree with — the
      //    batch-6a `style="…"` class in a second syntax, found by the false-positive control.
      .replace(/\]\([^()\s]*\)/g, ']')
      // 6. TAGS BECOME NEUTRALS, NOT LETTERS. A tag's own name is not rendered text, so
      //    `)</td>` must not read as flanked-by-Latin. Replacing the tag with whitespace
      //    keeps the scan crossing element boundaries, which is what gate 4n itself does —
      //    one of the batch-6b findings takes its flank from the NEXT table row.
      .replace(/<[^>]*>/g, '\n');
    for (const f of bracketFlankFindings(scan)) {
      // Name the brief section by flank shape, so the finding arrives with its remedy.
      const sec = f.before === 'N' || f.after === 'N' ? '§3.3'
        : f.before === 'L' && f.after === 'R' ? '§3.5' : '§3.7';
      const fix = fixable
        ? 'put an Arabic word at the boundary, or wrap the Latin run in <bdi>'
        : 'rephrase — frontmatter has no <bdi> available and gate 4n WILL block the build';
      say(file, `${where} ${sec} "${f.ch}" flanked ${f.before} … ${f.after} — ${fix}: …${f.ctx}`);
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
