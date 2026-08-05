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
/** A coverage statement, not a finding. Never increments `bad`. See SURFACES below. */
const note = (f, msg) => { console.log(`  ${f}: · ${msg}`); };

/**
 * SURFACES — WHAT THIS SCRIPT IS POINTED AT (AR-2 Phase F, Arabic locale parity).
 *
 * ⚠ FOURTH RECURRENCE OF ONE PATTERN, AND THE FIRST FOUND BEFORE IT COST A BUILD.
 * Three times this file has been a correct rule aimed at too small a set — batch 6b
 * (inside-the-brackets, not the flanks), 7b (the phone exempted on both surfaces),
 * 7c (`(` and `)` instead of `\p{Bidi_Mirrored}`). Each was found by a red build.
 * This one was found by a control run before any Phase F prose existed: the same
 * §3.5 defect sentence was put on all three Phase F surfaces and only two reported it.
 *
 * Track E was MDX. Phase F's 19 remaining routes are not: their Arabic prose lives in
 * an `.astro` template and in a `const AR = \`…\`` literal inside a page-content
 * module. Measured on the pre-change script:
 *
 *   .ar.mdx  →  §3.5 finding reported            ✔
 *   .astro   →  §3.5 finding reported            ✔  (+ 3 findings that do not apply)
 *   .ts      →  skipped at `no frontmatter`      ✘  BLIND — the flank scan never ran
 *
 * FALSE NEGATIVES AND NOISY NEGATIVES ARE DIFFERENT FAILURES, AND THIS FILE HAD BOTH.
 * The `.ts` case is a false negative: no flank check ran, over ~219 000 characters of
 * prose. The `.astro` case is worse in a way a finding count hides — it reported
 * `no title`, `no description` and `not in AR_SLUGS`, all three correct statements
 * about a parser and none of them a statement about the author's task. A page template
 * HAS no frontmatter card and is not a spoke, so those are not defects to fix; they are
 * noise to learn to ignore. An author who learns that lesson has also learned to skim
 * past the one real §3.5 finding sitting between them. Coverage and trustworthiness fail
 * together: a check that cannot be read is not a check, so this file now states which
 * surface it detected and which checks that surface does not carry (`note`, not `say`)
 * instead of reporting an inapplicable check as a finding.
 *
 * FAIL CLOSED ON AN UNRECOGNISED SURFACE. Same principle as the no-input case below:
 * a file this script cannot classify has not been checked, and must not read as clean.
 */
const SURFACES = {
  mdx:    'MDX spoke — frontmatter card + body prose',
  astro:  'Astro page template — no frontmatter card, prose in the template',
  module: 'page-content module — no frontmatter card, prose in the AR literal',
};

function classifySurface(p) {
  const n = p.replace(/\\/g, '/');
  if (/\.ar\.mdx$/.test(n)) return 'mdx';
  if (/\.astro$/.test(n)) return 'astro';
  if (/(^|\/)src\/page-content\/[^/]+\.ts$/.test(n)) return 'module';
  return null;
}

/**
 * The AR block of a page-content module. Scanned for an UNESCAPED closing backtick
 * because these literals legitimately contain escaped ones — `home.ts` interpolates a
 * whole inline <script> — so a non-greedy regex would end the block at the first of them
 * and silently scan a fraction of the prose. Returns null for absent, false for
 * unterminated; the caller distinguishes them because they are different defects.
 */
function arModuleBlock(src) {
  const open = src.match(/\bconst\s+AR\s*(?::\s*string\s*)?=\s*`/);
  if (!open) return null;
  const start = open.index + open[0].length;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '\\') { i++; continue; }
    if (src[i] === '`') return notRendered(src.slice(start, i));
  }
  return false;
}

/**
 * Source that is not rendered text, removed before any flank scan.
 *
 * ⚠ ADDED IN PHASE F BATCH 2, AND THE ASYMMETRY WAS MINE. Batch 1 gave the `.astro` surface
 * a `<script>`/`<style>` exclusion (on `rendered-text.mjs:109-112`'s authority — every gate
 * strips both before it sees a page) and did not give the MODULE surface the same one. A
 * page-content module can carry a script just as an `.astro` template can, and `booking.ts`
 * does: the Cal.com embed. On first contact it produced **10 findings inside JavaScript**
 * (`ar[0]`, `p(cal, [L, …])`) plus 2 on `${…}` interpolation delimiters — 12 findings, all
 * false, none fixable, in a file whose prose was clean.
 *
 * That is the NOISY-NEGATIVE failure this script's own header describes, reproduced by the
 * commit that described it. The cost is not the noise; it is that an author who triages 12
 * false findings has been trained to triage the thirteenth.
 *
 * Two exclusions, both the same principle already applied to tags, attributes and markdown
 * link delimiters — *source syntax that is not a rendered text node is not a direction
 * change*:
 *   1. `<script>` / `<style>` — stripped by every gate's extractor before it sees a page.
 *   2. `${…}` — a template-literal interpolation. The VALUE it produces is rendered, but the
 *      `${` and `}` never are, and the value is not knowable from source. That limit is
 *      correct rather than regrettable: this script reads source and can only catch what is
 *      decidable in source (file header), while gate 4n reads `dist/` and sees the real
 *      value. Leaving the delimiters in does not measure the value — it measures punctuation
 *      that no reader will ever see.
 */
function notRendered(text) {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, '\n')
    .replace(/<style[\s\S]*?<\/style>/gi, '\n')
    .replace(/\$\{[\s\S]*?\}/g, '\n');
}

/**
 * The rendered surface of an .astro page: the template after the component fence.
 *
 * The fence itself is excluded because it is not rendered text — it is imports and the
 * JSON-LD `schema` string, and gate 4n reads neither. <script> and <style> are dropped
 * for the same reason and on the gate's own authority, not a judgement call here:
 * `rendered-text.mjs:109-112` strips both before any gate sees a page, and gate 4n's
 * header states it does not cover <title> either ("markup isolation is impossible
 * there"), which is why the existing attribute exclusion below is already aligned with
 * it. Scanning the fence would report every `(` in an import path or a schema literal.
 */
// ⚠ Both surfaces go through `notRendered` — the SAME function, not two copies of the same
// intent. Batch 2 is the record of what two copies cost: the `.astro` side had the script
// exclusion and the module side did not, and nothing said so until a module carried a script.
function astroTemplate(src) {
  const m = src.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  return notRendered(m ? m[1] : src);
}

/** `src/pages/ar/utv/index.astro` → `utv`; `…/ar/index.astro` → `''`; `…/ar/about.astro` → `about`. */
function staticSlugOf(p) {
  const n = p.replace(/\\/g, '/');
  const m = n.match(/(^|\/)src\/pages\/ar\/(.*)\.astro$/);
  if (!m) return null;
  return m[2].replace(/(^|\/)index$/, '');
}

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

  const surface = classifySurface(path);
  if (!surface) {
    say(file, 'unrecognised surface — expected a .ar.mdx spoke, an .astro page, or a '
      + 'src/page-content/*.ts module. NOTHING in this file was checked.');
    continue;
  }

  // `fm` is null on every surface that has no frontmatter card. Every check below that
  // reads a card is guarded on it and ANNOUNCES the skip, because a silently skipped
  // check and a passing check are indistinguishable in this script's output.
  let fm = null, body = null;
  if (surface === 'mdx') {
    const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
    if (!m) { say(file, 'no frontmatter'); continue; }
    [, fm, body] = m;
  } else if (surface === 'astro') {
    body = astroTemplate(src);
  } else {
    const block = arModuleBlock(src);
    if (block === null) {
      say(file, 'no `const AR = `…`` block — this module carries no Arabic prose yet, so '
        + 'NOTHING was checked. Author the AR block before running the pre-flight.');
      continue;
    }
    if (block === false) {
      say(file, 'the `const AR = `…`` literal is unterminated — refusing to scan a partial block');
      continue;
    }
    body = block;
  }
  note(file, `surface: ${SURFACES[surface]}`);

  // The whole-file scans below are scoped to the AUTHORED text, not the file. On a
  // page-content module the file also holds the EN/ES/IT/PT/FR/DE/ZH/JA blocks, and
  // flagging another locale's arrow or digit as an Arabic finding is the same
  // trained-to-ignore failure the SURFACES note describes.
  const authored = surface === 'mdx' ? src : body;

  // schema, §2.4 — fails before any gate runs, so check it first.
  if (fm === null) {
    note(file, 'not applicable on this surface: §2.4 title/description budgets, the §2.3 '
      + 'per-card lock ceiling, Assertion C — this page renders no RelatedArticles card');
  } else {
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
  }

  // policy §3 — no exception, anywhere. Scoped to `authored`: see the note above.
  if (ARABIC_INDIC.test(authored)) say(file, 'Arabic-Indic digit present');
  if (authored.includes('→')) say(file, 'U+2192 arrow present (gate 4o)');
  // policy §5.2 — the isolate is <bdi>, never a control character
  if (/[‎‏⁦-⁩]/.test(authored)) say(file, 'bidi control character present');
  // frontmatter is not markup-processed; bidi-runs.ts isolates named runs only
  if (fm !== null && /<bdi>/.test(fm)) say(file, '<bdi> in frontmatter — it will render literally');

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
  // ⚠ THE CHARACTER CLASS IS THE PROPERTY, NOT A LIST — AND BATCH 7c IS WHY. Until 7c this
  // scanned `(` and `)` only, while gate 4n has always read `\p{Bidi_Mirrored}`. So the flank
  // LOGIC was a superset of the gate's and the flank ALPHABET was a strict subset, and the
  // script reported clean on a batch whose first build then stopped at 4n on a guillemet:
  //
  //     مسافرًا من Front Range «أنهى» الممرات      "«" preceded by LATIN -> flanked L … R
  //
  // The brief had already been corrected on this exact character. Batch 5 rewrote §3.2 —
  // "a «» pair around Arabic fails just as hard when the character before it is Latin" — and
  // batch 6b then generalized the rule here to the FLANKS while implementing it only for
  // parentheses. THIRD recurrence in this one file of "the rule was right and the tool had
  // not been brought along" (6b: inside-the-brackets; 7b: the phone's surface scope; 7c: the
  // character class). Naming the property instead of the characters is what stops a fourth:
  // there is no longer a list here that can fall behind the gate's.
  const MIRRORED = /\p{Bidi_Mirrored}/u;
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
      if (!MIRRORED.test(t[i])) continue;
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
  const fmScalars = fm === null ? '' : (fm.match(/"(?:[^"\\]|\\.)*"/g) || []).join('\n');
  // `fixable` is "is <bdi> available on this surface". It is true for MDX body prose and
  // for both Phase F surfaces — an .astro template and an AR literal are both HTML, so the
  // §3.5 markup remedy applies unchanged there. It is false only in MDX frontmatter, which
  // no formatter reaches and where the remedy is always to rephrase.
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
      // 5. MARKDOWN LINKS — TARGET **AND** DELIMITERS. `[نصّ](/some/path/)` renders as an
      //    anchor: the href is never a text node, and neither are the square brackets. Only
      //    the link TEXT renders, so that is what the scan must keep. Left in, the target's
      //    parentheses produced 19 findings across 2 files that no gate could agree with —
      //    the batch-6a `style="…"` class in a second syntax, found by the false-positive
      //    control.
      //
      //    ⚠ WIDENED IN BATCH 7c. This rule used to collapse `](/path/)` to `]`, which
      //    removed the parentheses and left BOTH square brackets standing in the scan. That
      //    was invisible while the flank test only looked at `(` and `)`; the moment the test
      //    became the Bidi_Mirrored property below, every markdown link in the corpus turned
      //    into two spurious direction changes. Same principle as rules 4 and 6 — a source
      //    delimiter that is not rendered text is not a bracket in rendered prose.
      .replace(/\[([^\]]*)\]\([^()\s]*\)/g, '$1')
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

  // §1.2 deliverable 2 — the silent-divergence failure mode.
  //
  // EVERY SURFACE HAS A SECOND DELIVERABLE; THEY ARE JUST NOT THE SAME ONE. For a spoke
  // it is the AR_SLUGS entry. For a Phase F page it is also an AR_SLUGS entry, but the
  // slug is the STATIC route (`utv`, `about`, `''` for the homepage), not `hub/base-id`.
  // For a page-content module it is not a route at all — the module emits nothing on its
  // own, and the way it diverges silently is an authored AR block that `getBodyHtml` never
  // dispatches to, which renders the ENGLISH fallback on a page that looks translated in
  // source. That is §1.2's failure mode exactly, one surface over.
  const i18n = readFileSync('src/lib/i18n.ts', 'utf8');
  const arSlugBlock = i18n.match(/const AR_SLUGS = new Set<string>\(\[([\s\S]*?)\]\);/);
  if (!arSlugBlock) say(file, 'AR_SLUGS block not found in i18n.ts');
  else if (surface === 'mdx') {
    // Scope to the AR_SLUGS block: every other locale registry holds the same slug
    // strings, so an unscoped search reports every unregistered page as registered.
    const slug = file.replace(/\.ar\.mdx$/, '');
    const hub = path.split(/[\\/]/).slice(-2)[0];
    if (!arSlugBlock[1].includes(`'${hub}/${slug}'`)) {
      say(file, `not in AR_SLUGS — route will not emit as ${hub}/${slug}`);
    }
  } else if (surface === 'astro') {
    const slug = staticSlugOf(path);
    if (slug === null) {
      note(file, 'not under src/pages/ar/ — no route registration to check');
    } else if (!arSlugBlock[1].includes(`'${slug}'`)) {
      say(file, `not in AR_SLUGS — /ar/${slug}${slug && '/'} will build, but the language `
        + `switcher and hreflang stay silent on it and localeHref() keeps sending links to English`);
    }
  } else {
    const dispatch = /if\s*\(\s*locale\s*===\s*'ar'\s*\)\s*return\s+AR\s*;/.test(src);
    if (!dispatch) {
      say(file, "an AR block exists but getBodyHtml() has no `if (locale === 'ar') return AR;` "
        + 'line — every ar page reading this module will silently render the ENGLISH fallback');
    }
  }
}
console.log(bad ? `\n${bad} finding(s)` : '\nclean');

// EXIT CODES (AR-2 batch 7c). Three values, the B-5b milestone-1 convention:
//   0  checked, and every check passed
//   1  checked, and something failed
//   2  never reached a verdict (no input files — b698d0e)
//
// ⚠ Until batch 7c this file printed its findings and exited 0 unconditionally, so the header's
// own statement of purpose — "fail the cheap way before `npm run build` fails the expensive way"
// — was not implemented: it could report, but it could not fail. `AR2-E4-phase2-tight-ceiling.md`
// §11.2 lists this script as criterion 0, a check that FAILS on a schema budget, a §3.3/§3.5
// class, an unregistered slug, or a §2.3 lock phrase twice in one card.
//
// That last one is why this is not cosmetic. A lock phrase appearing twice across title +
// description raises the real settled ceiling by 4 per page and unsounds every `ar` glossary
// floor, and NOTHING downstream reports it — gate 4i enforces a minimum, so a raised ceiling
// never turns it red. This script is the only guard, and a guard that exits 0 is advisory.
//
// Same shape as the defect b698d0e fixed one level over: that commit gave the "checked nothing"
// case an exit code and left the "checked something and it failed" case at 0.
process.exit(bad ? 1 : 0);
