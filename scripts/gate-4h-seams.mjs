// scripts/gate-4h-seams.mjs — Gate 4h: rendered seam detection (P36).
// Origin: review items C6, C7 and C9.
//
// INVARIANT. A locked phrase joined into surrounding prose must not leave a
// structural seam — no duplicated imperative inside one clause, no coordinator
// binding a redundant second imperative, no repeated lead-in particle at the
// join, no repeated connective.
//
// WHY IT READS dist/. C6's fix verified clean in plain source text and still left
// 326 defects on the page: inline markup sits *inside* the join seam, so
// `路况向<strong>向官方渠道核实</strong>` holds no duplicated character until the
// tags come off. This gate therefore never parses source templates — it extracts
// visible text from rendered HTML and asserts against that (principle 5).
//
// WHAT IT IS NOT. It is not a translation-quality check and not a glossary-lock
// check. Lock presence and drift are gate 4i (P37); 4h checks only the *seam* at
// a lock boundary. Conserved counts are reported as drift telemetry and never
// block, because those counts move legitimately whenever a page is added.
//
// LICENSING IS GRAMMATICAL, NOT ENUMERATED. C9's 28 held shapes appear nowhere in
// this file or its config. The C9 finding is encoded as a rule instead: deleting
// an imperative is licensed only when a *surviving* imperative preserves the
// sentence. `都请向`/`务必请向`/`始终请向`/`也请向` carry exactly one imperative and
// so are licensed automatically; `请A，请B` carries two but a clause boundary
// separates them. New shapes obeying that grammar pass without being listed.
//
// HONEST RESULT. Unlike 4f, this gate does not report zero by construction. On the
// corpus it was built against it finds one real defect that C6/C7 missed, because
// those passes censused `请` and this seam duplicates `向`.
import { existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractVisibleText } from './lib/rendered-text.mjs';
import { createRenderIndex } from './lib/render-index.mjs';
import { resolveHost } from './lib/host-adapter.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// An explicit dist path lets the gate be exercised against a scratch corpus
// without touching the repository (P36 phase 6). Defaults to ./dist.
const dist = process.argv[2] ? resolve(process.argv[2]) : join(root, 'dist');

// --- F5 Phase 2: policy comes from the host manifest, not from a path this gate
//     computes. Before this, CONFIG was join(root, 'i18n-gates', …) with root = the
//     FRAMEWORK repository, so pointing this gate at another host's dist/ applied
//     adventureastro's seam rules to a foreign corpus — silently, and with a wrong
//     answer rather than a crash. This gate can now only read the policy its host
//     declares, and there is no default to fall back to. ---
let host;
try {
  host = resolveHost();
} catch (e) {
  console.error(`gate-4h: ${e.message}`);
  process.exit(2);
}

// Missing inputs are exit 2, never a silent pass — the ja UI-chrome fail-open
// lesson (handoff §7, Gate 4a): that locale shipped 57 pages of English chrome
// precisely because an absent dictionary degraded quietly instead of failing.
let config;
try {
  config = host.policy.load('seams');
} catch (e) {
  // `kind` chooses the sentence shape; the rendered path is already in `e.message`.
  console.error(
    e.kind === 'invalid'
      ? `gate-4h: config ${e.message}`
      : `gate-4h: config ${e.message} — refusing to pass silently.`
  );
  process.exit(2);
}

if (!existsSync(dist)) {
  console.error('gate-4h: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

// --- Registered locales come from the host adapter, so a new language cannot reach
//     production without either a rule set or a deliberate exit 2.
//
//     F4 Phase 1: the last of the three byte-identical regex copies. Where the registry
//     lives and how it is written is host shape, and this gate is no longer permitted
//     to know either. Resolved once, above, alongside the policy it governs. ---
const LOCALE_CODES = host.localeCodes;
const DEFAULT_LOCALE = host.defaultLocale;
const TARGETS = host.targets;

for (const loc of TARGETS) {
  if (!config.locales?.[loc]) {
    console.error(`gate-4h: locale "${loc}" is registered by the host but has no entry in ${host.policy.describe('seams')} — refusing to pass silently.`);
    process.exit(2);
  }
}

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ---------------------------------------------------------------------------
// Phase 1 — rendered extraction. Visible text only.
//
// The extractor is the shared primitive; what belongs to gate 4h is the argument.
// `inlineSeparator: ''` states the C7 fix at the call site: inline tags are removed
// with NO separator, because that is what re-joins the seam markup can hide
// (`向<strong>向官方渠道核实`). Block tags always leave a space, or the end of one
// paragraph abutting the start of the next would fabricate a seam no reader sees.
// ---------------------------------------------------------------------------
const visibleText = (html) => extractVisibleText(html, { inlineSeparator: '' });

const index = createRenderIndex(dist);

// ---------------------------------------------------------------------------
// Phase 2/3 — seam rules, with grammatical licensing built in.
// ---------------------------------------------------------------------------
const boundaryRe = (chars) => new RegExp(chars.map(escapeRe).join('|'), 'g');

/** Split on boundaries, keeping each segment's offset for context reporting. */
function segments(text, re) {
  const out = [];
  let last = 0;
  for (const m of text.matchAll(re)) {
    out.push({ text: text.slice(last, m.index), start: last });
    last = m.index + m[0].length;
  }
  out.push({ text: text.slice(last), start: last });
  return out.filter((s) => s.text.trim());
}

/** Mask bound morphemes so a compound cannot be counted as an imperative. */
function maskBound(text, morphemes) {
  let s = text;
  for (const m of morphemes) s = s.replace(new RegExp(escapeRe(m), 'g'), '�'.repeat(m.length));
  return s;
}

/**
 * Walk left from a lock occurrence over the lock's own optional lead-in
 * particles, recording what was consumed. A particle consumed twice in a row is
 * the join seam itself — detecting it during the walk rather than after is what
 * catches `向向官方渠道核实`, where a greedy walk would swallow the duplicate.
 */
function walkLeadIns(text, index, leadIns) {
  const consumed = [];
  let s = index;
  for (;;) {
    let hit = null;
    for (const p of leadIns) {
      if (s - p.length >= 0 && text.slice(s - p.length, s) === p) { hit = p; break; }
    }
    if (!hit) break;
    consumed.push(hit);
    s -= hit.length;
  }
  return { start: s, consumed };
}

const snippet = (text, from, to, pad = 34) =>
  (from - pad > 0 ? '…' : '') +
  text.slice(Math.max(0, from - pad), Math.min(text.length, to + pad)).trim() +
  (to + pad < text.length ? '…' : '');

const findings = [];
let pagesScanned = 0;
const conserved = {};

for (const page of index.pages) {
  const loc = page.key.split('/')[0]; // the index states route identity; the locale rule is this gate's
  if (!TARGETS.includes(loc)) continue; // English pages are out of scope by definition
  const entry = config.locales[loc];
  const url = page.url;
  const raw = page.derive('visibleText', visibleText);
  pagesScanned++;

  const imp = entry.imperative;
  const text = imp ? maskBound(raw, imp.boundMorphemes ?? []) : raw;
  const clauseRe = boundaryRe(config.clauseBoundaries);
  const sentenceRe = boundaryRe(config.sentenceBoundaries);

  const add = (type, index, end, rule, ctxText = text) =>
    findings.push({ loc, url, type, rule, context: snippet(ctxText, index, end) });

  // --- Rule A: duplicated imperative inside one clause. -------------------
  // The C6 defect was never "two imperatives in a sentence" — it was two inside
  // ONE clause with no boundary between them. Two across a boundary is the
  // licensed `请A，请B` coordinate pair and must survive (C6, C9).
  if (imp?.particle) {
    const pRe = new RegExp(escapeRe(imp.particle), 'g');
    for (const cl of segments(text, clauseRe)) {
      const hits = [...cl.text.matchAll(pRe)];
      if (hits.length < 2) continue; // a lone imperative is the only one carrying the sentence
      add(
        'duplicated-imperative',
        cl.start + hits[0].index,
        cl.start + hits[hits.length - 1].index + imp.particle.length,
        `Two "${imp.particle}" imperatives inside one clause with no boundary between them; ` +
          `the first already carries the imperative, so the second is redundant.`
      );
    }
  }

  // --- Rule B: a coordinator binding a redundant second imperative. -------
  // C6 shapes 2/3 (`并请向`, `先请向`). A coordinator glued directly to the lock's
  // imperative binds it into the preceding request, so the imperative is carried
  // across the boundary. Licensed unless an imperative earlier in the same
  // sentence survives to preserve it — which is the C9 rule, stated generally.
  // Adverbs (`都`/`务必`/`始终`/`也`) are not coordinators and never match.
  if (imp?.particle && imp.coordinators?.length) {
    for (const lock of entry.locks ?? []) {
      const re = new RegExp(
        `(${imp.coordinators.map(escapeRe).join('|')})${escapeRe(imp.particle)}[^]{0,4}?${escapeRe(lock.core)}`,
        'g'
      );
      for (const s of segments(text, sentenceRe)) {
        for (const m of s.text.matchAll(re)) {
          const before = s.text.slice(0, m.index);
          if (!before.includes(imp.particle)) continue; // no surviving imperative — C9 licensed
          add(
            'coordinated-imperative',
            s.start + m.index,
            s.start + m.index + m[0].length,
            `Coordinator "${m[1]}" binds a second "${imp.particle}" into a request that already ` +
              `carries one; the surviving imperative preserves the sentence, so this one is redundant.`
          );
        }
      }
    }
  }

  // --- Rule C: repeated lead-in particle at a lock join (glossary join). --
  // Generalises beyond the imperative: C6/C7 censused `请` only, which is why a
  // duplicated `向` at the same seam survived both passes.
  for (const lock of entry.locks ?? []) {
    const coreRe = new RegExp(escapeRe(lock.core), 'g');
    for (const m of raw.matchAll(coreRe)) {
      conserved[loc] = (conserved[loc] ?? 0) + 1;
      const { start, consumed } = walkLeadIns(raw, m.index, lock.leadIns ?? []);
      for (let k = 1; k < consumed.length; k++) {
        if (consumed[k] !== consumed[k - 1]) continue;
        findings.push({
          loc, url, type: 'glossary-join',
          rule: `The locked phrase's lead-in particle "${consumed[k]}" is repeated at the join seam; ` +
            `the caveat was appended to a clause already ending in it.`,
          context: snippet(raw, start, m.index + lock.core.length),
        });
        break;
      }
    }
  }

  // --- Rule D: an immediately repeated connective. ------------------------
  // A coordinating connective is never licensed twice in succession, in any of
  // these languages — so this needs no per-locale exception.
  for (const c of entry.connectives ?? []) {
    // `\b` is ASCII-only in JS, so it sees a boundary inside `frío` and reads
    // `frío o una` as `o o`. Unicode letter classes are required, not optional.
    const re = entry.script === 'latin'
      ? new RegExp(`(?<![\\p{L}\\p{N}_])(${escapeRe(c)})\\s+\\1(?![\\p{L}\\p{N}_])`, 'giu')
      : new RegExp(`(${escapeRe(c)})\\1`, 'g');
    for (const m of raw.matchAll(re)) {
      findings.push({
        loc, url, type: 'duplicated-connective',
        rule: `Connective "${c}" is repeated immediately, which no join licenses.`,
        context: snippet(raw, m.index, m.index + m[0].length),
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Phase 4 — conserved counts. Reported, never blocking: a count moves whenever a
// page is added or removed, so blocking on it would fail on legitimate content.
// ---------------------------------------------------------------------------
const drift = [];
for (const loc of TARGETS) {
  for (const lock of config.locales[loc].locks ?? []) {
    if (typeof lock.expected !== 'number') continue;
    const actual = conserved[loc] ?? 0;
    if (actual !== lock.expected) drift.push({ loc, core: lock.core, expected: lock.expected, actual });
  }
}

// ---------------------------------------------------------------------------
// Phase 5 — reporting.
// ---------------------------------------------------------------------------
const render = (f) =>
  `Locale: ${f.loc}\nPage: ${f.url}\nType: ${f.type}\n\nRendered:\n  "${f.context}"\n\nRule:\n  ${f.rule}\n`;

if (drift.length) {
  console.warn(`\ngate-4h: conserved-count drift (advisory)\n`);
  for (const d of drift) {
    console.warn(`  ${d.loc}  "${d.core}"  expected ${d.expected}, found ${d.actual}  (${d.actual > d.expected ? '+' : ''}${d.actual - d.expected})`);
  }
  console.warn(
    `\n  A count moves legitimately when pages are added or removed. If this change was\n` +
      `  intended, update "expected" in ${host.policy.describe('seams')}.\n`
  );
}

if (findings.length) {
  const byType = findings.reduce((a, f) => ((a[f.type] = (a[f.type] ?? 0) + 1), a), {});
  console.error(`\ngate-4h: ${findings.length} rendered seam violation(s) — ` +
    Object.entries(byType).map(([t, n]) => `${t} ${n}`).join(', ') + '\n');
  for (const f of findings) console.error(render(f));
  console.error(
    'Each seam is a join defect in rendered output, not a translation-quality issue.\n' +
      'Fix the join in the source file; do not add an exception — the rules encode grammar,\n' +
      'so a licensed construction never reaches this report.\n'
  );
  process.exit(1);
}

const lockTotal = Object.values(conserved).reduce((a, b) => a + b, 0);
console.log(
  `gate-4h: ✔ ${pagesScanned} rendered pages across ${TARGETS.length} locales, ` +
    `${lockTotal} locked phrases — no seam violations` +
    (drift.length ? ` (${drift.length} advisory count drift)` : '')
);
