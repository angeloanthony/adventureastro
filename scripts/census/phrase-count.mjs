// scripts/census/phrase-count.mjs — F5 Phase 4: the first census producer.
//
// WHAT IT PRODUCES. One `phrase-count` fact per requested (locale, phrase): the number of
// non-overlapping occurrences of that phrase in the locale's rendered prose, with the page
// counts that produced it. Nothing else.
//
// THE PRODUCER INVARIANT. It records observations. It never judges, filters, suppresses,
// licenses, localizes or validates. Three consequences are visible in this file:
//
//   * A requested phrase that occurs nowhere emits `value: 0`. Zero is a measurement.
//     (Distinct from "absence is not a fact": the census never invents a key it was not
//     asked for, but it always answers the key it WAS asked for.)
//   * Counts are UNMASKED. Which compounds license a term — `保护区` inside `荒野保护区` —
//     is a decision, and decisions are applied by the consumer at read time.
//   * There is no exit 1. A gate exits 1 to say the corpus is wrong; this producer has no
//     opinion about the corpus, so it cannot. 0 = produced, 2 = could not run.
//
// WHY THE PHRASE SET IS AN ARGUMENT AND NOT A POLICY READ.
// F5 Phase 3 §7 drew an edge from policy into the census, reasoning that the census must
// read the lock registry to know what to count. Implementation shows that edge is
// unnecessary and the second host proves it: `forebearfindastro` has no `i18n-gates/` at
// all, yet its phrases are perfectly countable. WHERE an operator got a phrase list —
// a lock registry, a glossary, a hand-written file — is not the producer's business, and
// making it the producer's business would be the one thing that stops this tool being
// portable. The contract is NARROWED, not widened: census reads no policy.
//
// WHY `--dist` IS REQUIRED. The census is the first framework artifact that needs to know
// where rendered output lives, which is manifest section 3 (`routes.output`, coupling
// C-2) — a section adventureastro's manifest does not declare yet. Rather than teach this
// producer to compute a host path (the C-1 defect, reintroduced), or widen the manifest
// in a phase whose brief forbids manifest changes, the location is an operator argument.
// That is a recorded finding, not a design preference: see the F5 Phase 4 report.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { extractVisibleText } from '../lib/rendered-text.mjs';
import { createRenderIndex } from '../lib/render-index.mjs';
import { resolveHost } from '../lib/host-adapter.mjs';
import { loadManifest } from '../lib/host-manifest.mjs';
import { buildEnvelope, validateCensusOutput, serialize, canonicalJson, sha256 } from './emit.mjs';

// The extractor identity. It is the SAME view gates 4h and 4i read, called the same way,
// which is what makes a count here comparable with a baseline frozen there.
//
// ⚠ RECORDED HOLE: this string is maintained by hand here, while the view it names lives
// in ../lib/rendered-text.mjs. A change to the view that forgets to bump this string
// leaves stale counts undetectable — which is exactly the staleness the `extractor` field
// exists to catch. The version belongs beside the view; it stays here only until a second
// view version exists to move it for.
const EXTRACTOR = 'visibleText@1';
const SURFACE = 'prose';
const visibleText = (html) => extractVisibleText(html, { inlineSeparator: '' });

const die = (msg) => { console.error(`census phrase-count: ${msg}`); process.exit(2); };

// --- Arguments. Unknown flags are rejected, not ignored — the M-4 guard, applied to the
//     command line, because a typo'd flag that silently does nothing produces a census
//     that looks complete and is not. ---
const KNOWN = ['--dist', '--phrases', '--measured-at', '--manifest', '--out'];
const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (!KNOWN.includes(a)) die(`unknown argument "${a}" — expected one of ${KNOWN.join(', ')}`);
  if (a in args) die(`${a} given twice`);
  const v = argv[++i];
  if (v === undefined || v.startsWith('--')) die(`${a} needs a value`);
  args[a] = v;
}
for (const required of ['--dist', '--phrases', '--measured-at']) {
  if (!(required in args)) die(`${required} is required`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(args['--measured-at'])) {
  die('--measured-at must be YYYY-MM-DD — the census takes its date as an argument so that repeated runs are byte-identical');
}

const dist = resolve(args['--dist']);
if (!existsSync(dist)) die(`rendered output not found at ${args['--dist']}`);

// --- Host facts. The adapter is the only component permitted to understand host shape;
//     this producer receives answers (locale codes, default locale) and no paths. ---
let host, manifest;
try {
  host = resolveHost({ manifestPath: args['--manifest'] });
  ({ manifest } = loadManifest({ manifestPath: args['--manifest'] }));
} catch (e) {
  die(e.message);
}
const LOCALE_CODES = host.localeCodes;
const DEFAULT_LOCALE = host.defaultLocale;

// --- The phrase set. Validated strictly: a phrase for an unregistered locale, a blank
//     phrase or a duplicated request is a specification error, and a producer that
//     quietly repaired one would emit a census nobody asked for. ---
let requested;
try {
  requested = JSON.parse(readFileSync(resolve(args['--phrases']), 'utf8'));
} catch (e) {
  die(`--phrases ${args['--phrases']} could not be read — ${e.message}`);
}
if (!Array.isArray(requested)) die('--phrases must contain a JSON array of {locale, phrase}');

const seen = new Set();
requested.forEach((r, i) => {
  const where = `--phrases[${i}]`;
  if (r === null || typeof r !== 'object' || Array.isArray(r)) die(`${where} must be an object`);
  for (const k of Object.keys(r)) if (!['locale', 'phrase'].includes(k)) die(`${where} has unknown key "${k}"`);
  if (typeof r.locale !== 'string' || !LOCALE_CODES.includes(r.locale)) {
    die(`${where}.locale ${JSON.stringify(r.locale)} is not a locale this host registers`);
  }
  if (typeof r.phrase !== 'string' || !r.phrase) die(`${where}.phrase must be a non-empty string`);
  const id = `${r.locale}\u0000${r.phrase}`;
  if (seen.has(id)) die(`${where} repeats ${JSON.stringify(r.phrase)} for "${r.locale}" — a fact key must be requested once`);
  seen.add(id);
});

/** Non-overlapping occurrences, left to right. */
function countOf(text, phrase) {
  let n = 0;
  let from = 0;
  for (;;) {
    const i = text.indexOf(phrase, from);
    if (i < 0) return n;
    n++;
    from = i + phrase.length;
  }
}

// --- Measure. ---
const index = createRenderIndex(dist);

/** Route identity is the index's; the locale rule is the consumer's — the same split every
 *  gate makes, and the reason render-index refuses to name a locale itself. */
const localeOf = (key) => {
  const seg = key.split('/')[0];
  return LOCALE_CODES.includes(seg) ? seg : DEFAULT_LOCALE;
};

const byLocale = new Map();          // locale -> phrase -> {count, pagesWithPhrase}
const pagesPerLocale = {};
const digest = [];

for (const page of [...index.pages].sort((a, b) => (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))) {
  const loc = localeOf(page.key);
  pagesPerLocale[loc] = (pagesPerLocale[loc] ?? 0) + 1;

  const html = page.html;
  digest.push(`${page.key}\u0000${sha256(html)}`);

  const wanted = requested.filter((r) => r.locale === loc);
  if (!wanted.length) continue;

  const text = visibleText(html);
  const bucket = byLocale.get(loc) ?? new Map();
  for (const { phrase } of wanted) {
    const n = countOf(text, phrase);
    const acc = bucket.get(phrase) ?? { count: 0, pagesWithPhrase: 0 };
    acc.count += n;
    if (n > 0) acc.pagesWithPhrase++;
    bucket.set(phrase, acc);
  }
  byLocale.set(loc, bucket);
}

// A requested key always gets an answer, including when the locale rendered no pages at
// all: `0 occurrences over 0 pages` is a measurement, and suppressing it would leave the
// consumer unable to tell "measured, absent" from "never asked".
const facts = requested.map(({ locale, phrase }) => {
  const acc = byLocale.get(locale)?.get(phrase) ?? { count: 0, pagesWithPhrase: 0 };
  return {
    kind: 'phrase-count',
    key: { locale, phrase, surface: SURFACE },
    value: acc.count,
    extractor: EXTRACTOR,
    evidence: { pages: pagesPerLocale[locale] ?? 0, pagesWithPhrase: acc.pagesWithPhrase },
  };
});

const invocation = ['census phrase-count', ...KNOWN.filter((k) => k in args && k !== '--out').map((k) => `${k} ${args[k]}`)].join(' ');

const doc = buildEnvelope({
  provenance: {
    measuredAt: args['--measured-at'],
    // The CONTRACT that was resolved, not the bytes that expressed it: reformatting a
    // manifest must not look like a different census.
    manifest: sha256(canonicalJson(manifest)),
    corpus: { pages: pagesPerLocale, fingerprint: sha256(digest.sort().join('\n')) },
    invocation,
  },
  facts,
});

// Self-validation before writing. A producer that can emit output its own schema rejects
// has no contract, only a habit.
const errors = validateCensusOutput(doc);
if (errors.length) {
  console.error(`census phrase-count: produced output that does not satisfy the census contract — ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(2);
}

const out = serialize(doc);
if (args['--out']) {
  writeFileSync(resolve(args['--out']), out, 'utf8');
  const total = facts.reduce((a, f) => a + f.value, 0);
  console.error(
    `census phrase-count: ${facts.length} fact(s) over ${index.size} rendered pages ` +
      `(${total} occurrences) -> ${args['--out']}`
  );
} else {
  process.stdout.write(out);
}
