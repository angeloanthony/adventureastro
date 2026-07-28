// scripts/gate-4i-glossary.mjs — Gate 4i: glossary lock verification (P37).
// Origin: review items A6, A7, A8, C2, C4, C8 and the locale preambles in src/lib/ui.ts.
//
// INVARIANT. A concept the repository has locked to one rendering in a locale must
// appear in that rendering, must not appear in any competing rendering, and must not
// fall below its frozen count.
//
// WHAT IT IS NOT. Not a translation-quality check: it never asks whether a word is
// the best word, only whether the shipped corpus still honours a decision the
// repository already took and applied (methodology principle 2). Not a cross-locale
// check either — every locale is measured against its own locks alone, never against
// another locale's corpus. And not a seam check: a lock's *join* is gate 4h's job,
// its *identity* is this gate's.
//
// WHY IT READS dist/ AND src/lib/ui.ts. Locks are propositions about what a reader
// sees, so the corpus scanned is rendered output (principle 5); the extractor below
// is byte-identical to 4h's on purpose, since two gates that disagreed about what
// visible text is would disagree about the same page and could not share a baseline.
// ui.ts is read for one narrower purpose: the dictionary anchors. Each anchor asserts
// that a locked phrase is still the value shipped under a named key in a named locale
// dictionary, which is what keeps ui.ts authoritative and this gate's config a mirror
// of it rather than a second source of truth competing with it.
//
// EXIT CODES. 2 = the gate could not run as specified (missing input, or a lock
// registry that is internally inconsistent — a duplicated lock, a phrase filed under
// the wrong script, an anchor pointing at nothing). 1 = the corpus violates a lock.
// 0 = every blocking lock holds; advisory counts may still have been printed.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { extractVisibleText } from './lib/rendered-text.mjs';
import { createRenderIndex } from './lib/render-index.mjs';
import { parseSourceFile, declOf, keyOf, stringOf, unwrap } from './lib/ts-ast.mjs';
import { resolveHost } from './lib/host-adapter.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// Overridable inputs let the gate be exercised against a scratch corpus and a scratch
// registry without touching the repository (P37 phase 4).
const argv = process.argv.slice(2);
const flag = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !argv[i - 1]?.startsWith('--'));
const dist = positional[0] ? resolve(positional[0]) : join(root, 'dist');
// `--config` is GONE as of F5 Phase 2: it resolved a policy path in this gate, against
// the FRAMEWORK root, which is the coupling the phase removes. `--manifest` serves the
// same scratch-testing purpose at the boundary instead of per artifact.
// `--ui` stays: the UI dictionary is coupling C-5, not policy, and is not yet migrated.
const UI = resolve(flag('--ui') ?? join(root, 'src', 'lib', 'ui.ts'));
// `--i18n` is no longer resolved here: where the locale registry lives is host shape, and
// this gate is not permitted to know it. The flag is passed through to the adapter, which
// is the only component that may turn it into a path.
//
// `--manifest` is its necessary companion. The adapter checks the manifest's locale set
// against the registry's on every run, so a scratch registry with a different locale set
// is DRIFT unless a scratch manifest describes it. Without this flag, `--i18n` alone
// could only ever point at a registry identical to the real one, which is not a test.
const I18N_OVERRIDE = flag('--i18n');
const MANIFEST_OVERRIDE = flag('--manifest');

const rel = (p) => relative(root, p).split(sep).join('/');

// Missing inputs are exit 2, never a silent pass — the ja UI-chrome fail-open lesson
// (handoff §7, Gate 4a): that locale shipped 57 pages of English chrome precisely
// because an absent dictionary degraded quietly instead of failing.
let host;
try {
  host = resolveHost({ registryModule: I18N_OVERRIDE, manifestPath: MANIFEST_OVERRIDE });
} catch (e) {
  console.error(`gate-4i: ${e.message}`);
  process.exit(2);
}

let config;
try {
  config = host.policy.load('glossary');
} catch (e) {
  console.error(
    e.kind === 'invalid'
      ? `gate-4i: config ${e.message}`
      : `gate-4i: config ${e.message} — refusing to pass silently.`
  );
  process.exit(2);
}

for (const [label, path] of [['ui dictionary', UI]]) {
  if (!existsSync(path)) {
    console.error(`gate-4i: ${label} not found at ${rel(path)} — refusing to pass silently.`);
    process.exit(2);
  }
}
if (!existsSync(dist)) {
  console.error('gate-4i: dist/ not found — this gate reads rendered output; run astro build first.');
  process.exit(2);
}

// ---------------------------------------------------------------------------
// TypeScript AST helpers — the same approach gate 4j uses, and for the same
// reason: ui.ts cannot be imported (its extensionless specifiers defeat Node's
// type-stripping loader) and a regex over a 1,000-line dictionary would match
// keys inside comments and prose.
// ---------------------------------------------------------------------------
const parse = parseSourceFile;

// --- Registered locales come from the host adapter, so a new language cannot reach
//     production without either a lock set or a deliberate exit 2.
//
//     F4 Phase 1: this gate no longer knows which module holds the registry, what the
//     registry is called, or how it is written. It receives resolved facts. The
//     fail-closed exit 2 below is gate policy and stays here. Resolved once, above,
//     alongside the policy it governs. ---
const LOCALE_CODES = host.localeCodes;
const DEFAULT_LOCALE = host.defaultLocale;
const TARGETS = host.targets;
if (!TARGETS.length) {
  console.error(`gate-4i: ${host.diagnostics.noTargets}`);
  process.exit(2);
}
for (const loc of TARGETS) {
  if (!config.locales?.[loc]) {
    console.error(
      `gate-4i: locale "${loc}" is registered by the host but has no entry in ${host.policy.describe('glossary')} — refusing to pass silently.`
    );
    process.exit(2);
  }
}

// ---------------------------------------------------------------------------
// Phase 1 — lock discovery, and the static integrity of the registry itself.
//
// One-to-one is checked in both directions. In the corpus (phase 3) it means the
// locked rendering is the only rendering present. Here it means the registry
// cannot express a contradiction: two concepts cannot claim the same phrase, a
// phrase cannot be locked and forbidden at once, and a phrase cannot be filed
// under a locale whose script it does not belong to. Those are the failures that
// would otherwise turn into silently unenforced locks.
// ---------------------------------------------------------------------------
const HAN = /\p{Script=Han}/u;
const KANA = /[\p{Script=Hiragana}\p{Script=Katakana}]/u;
const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u;

const configErrors = [];
const cfgFail = (loc, msg) => configErrors.push(`  [${loc}] ${msg}`);

for (const loc of TARGETS) {
  const entry = config.locales[loc];
  const locks = entry.locks ?? [];
  if (!locks.length) cfgFail(loc, 'has an entry but declares no locks.');

  const byId = new Map();
  const byPhrase = new Map();

  for (const lock of locks) {
    const id = lock.id;
    if (!id) { cfgFail(loc, `a lock is missing "id" (phrase "${lock.phrase}").`); continue; }
    if (!lock.phrase) { cfgFail(loc, `lock "${id}" is missing "phrase".`); continue; }
    if (!lock.provenance) cfgFail(loc, `lock "${id}" has no "provenance" — a lock with no decision behind it is a translation preference, not a repository invariant.`);

    // Duplicated lock: the same concept declared twice, or two concepts claiming
    // the same rendering. Either one makes the mapping many-to-one and silently
    // drops whichever lock the reader assumes is being enforced.
    if (byId.has(id)) cfgFail(loc, `duplicate lock id "${id}".`);
    byId.set(id, lock);
    if (byPhrase.has(lock.phrase)) {
      cfgFail(loc, `locks "${byPhrase.get(lock.phrase)}" and "${id}" both claim the phrase "${lock.phrase}" — a locale mapping must be one-to-one.`);
    }
    byPhrase.set(lock.phrase, id);

    const hasMin = typeof lock.min === 'number';
    const hasCount = typeof lock.count === 'number';
    if (hasMin && hasCount) cfgFail(loc, `lock "${id}" declares both "min" and "count"; a lock is either a floor or a conserved exact count, never both.`);
    if (!hasMin && !hasCount) cfgFail(loc, `lock "${id}" declares neither "min" nor "count" — an unmeasured lock cannot be verified.`);

    // Script sanity. This is what makes a phrase filed under the wrong locale a
    // loud failure rather than a lock that can never match anything.
    const latinLock = lock.latinLock === true;
    if (entry.script === 'latin' && CJK.test(lock.phrase)) {
      cfgFail(loc, `lock "${id}" phrase "${lock.phrase}" contains CJK characters but "${loc}" is a Latin-script locale — the phrase is filed under the wrong locale.`);
    }
    if (entry.script === 'han' && !latinLock && !HAN.test(lock.phrase)) {
      cfgFail(loc, `lock "${id}" phrase "${lock.phrase}" contains no Han characters and is not marked "latinLock" — the phrase is filed under the wrong locale.`);
    }
    if (entry.script === 'japanese' && !latinLock && !KANA.test(lock.phrase) && !HAN.test(lock.phrase)) {
      cfgFail(loc, `lock "${id}" phrase "${lock.phrase}" contains no kana or kanji and is not marked "latinLock" — the phrase is filed under the wrong locale.`);
    }

    const seenForbidden = new Set();
    for (const f of lock.forbidden ?? []) {
      if (!f.text) { cfgFail(loc, `lock "${id}" has a forbidden entry with no "text".`); continue; }
      if (!f.why) cfgFail(loc, `lock "${id}" forbids "${f.text}" with no "why".`);
      if (f.enforce !== 'block' && f.enforce !== 'report') {
        cfgFail(loc, `lock "${id}" forbids "${f.text}" with enforce "${f.enforce}" — must be "block" or "report".`);
      }
      if (seenForbidden.has(f.text)) cfgFail(loc, `lock "${id}" forbids "${f.text}" twice.`);
      seenForbidden.add(f.text);
      if (f.text === lock.phrase) cfgFail(loc, `lock "${id}" forbids its own locked phrase "${f.text}".`);
      for (const lic of f.licensedIn ?? []) {
        // A licensed compound that does not contain the forbidden term licenses
        // nothing, and would read as an exemption while masking no occurrence.
        if (!lic.includes(f.text)) {
          cfgFail(loc, `lock "${id}": licensed compound "${lic}" does not contain the forbidden term "${f.text}", so it licenses nothing.`);
        }
      }
    }
  }

  // A phrase locked for one concept and forbidden for another is a contradiction:
  // the corpus cannot satisfy both, so one lock is dead on arrival.
  for (const lock of locks) {
    for (const f of lock.forbidden ?? []) {
      const owner = byPhrase.get(f.text);
      if (owner && owner !== lock.id) {
        cfgFail(loc, `"${f.text}" is the locked phrase of "${owner}" and simultaneously forbidden by "${lock.id}" — the mapping is not one-to-one.`);
      }
    }
  }

  for (const a of entry.anchors ?? []) {
    if (!byId.has(a.lock)) cfgFail(loc, `anchor for key "${a.key}" references unknown lock "${a.lock}".`);
    if (!a.key || !a.contains) cfgFail(loc, `anchor for lock "${a.lock}" needs both "key" and "contains".`);
  }
}

if (configErrors.length) {
  console.error(`\ngate-4i: the lock registry ${host.policy.describe('glossary')} is internally inconsistent — ${configErrors.length} problem(s):\n`);
  for (const e of configErrors) console.error(e);
  console.error('\nA lock registry that contradicts itself cannot verify anything. Fixing the registry is\nan engineering change; it is never a reason to edit a translation.\n');
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Phase 2a — dictionary anchors. ui.ts is the authority on chrome values, so a
// locked phrase that is no longer the value shipped under its key is a lock
// violation even if the rendered corpus still contains the phrase elsewhere.
// ---------------------------------------------------------------------------
const uiSf = parse(UI);
const uiStrings = declOf(uiSf, 'UI_STRINGS');
if (!uiStrings || !ts.isObjectLiteralExpression(uiStrings)) {
  console.error(`gate-4i: could not parse UI_STRINGS from ${rel(UI)}`);
  process.exit(2);
}

/** locale code -> Map(key -> string value), resolved through the `es: ES` indirection. */
const dictionaries = new Map();
for (const prop of uiStrings.properties) {
  if (!ts.isPropertyAssignment(prop)) continue;
  const code = keyOf(prop);
  const init = unwrap(prop.initializer);
  const obj = ts.isIdentifier(init) ? declOf(uiSf, init.text) : init;
  if (!obj || !ts.isObjectLiteralExpression(obj)) continue;
  const map = new Map();
  for (const p of obj.properties) {
    if (!ts.isPropertyAssignment(p)) continue;
    const k = keyOf(p);
    const v = stringOf(p.initializer);
    if (k !== null && v !== null) map.set(k, v);
  }
  dictionaries.set(code, map);
}

const findings = [];
const advisories = [];

for (const loc of TARGETS) {
  const entry = config.locales[loc];
  const dict = dictionaries.get(loc);
  if (!dict) {
    console.error(`gate-4i: locale "${loc}" has no dictionary under UI_STRINGS in ${rel(UI)} — refusing to pass silently.`);
    process.exit(2);
  }
  for (const a of entry.anchors ?? []) {
    const value = dict.get(a.key);
    if (value === undefined) {
      findings.push({
        loc, kind: 'anchor', lock: a.lock, term: a.contains,
        detail: `dictionary key "${a.key}" does not exist in the ${loc} dictionary`,
        expected: a.contains, observed: '(key absent)',
      });
      continue;
    }
    const hay = a.ci ? value.toLowerCase() : value;
    const needle = a.ci ? a.contains.toLowerCase() : a.contains;
    if (!hay.includes(needle)) {
      findings.push({
        loc, kind: 'anchor', lock: a.lock, term: a.contains,
        detail: `${rel(UI)} key "${a.key}" no longer carries the locked phrase`,
        expected: a.contains, observed: value,
      });
    }
  }
}

// ---------------------------------------------------------------------------
// Phase 2b — rendered extraction. The same contract as gate 4h, now the same code:
// both gates scan whole-page prose, so both pass `inlineSeparator: ''`. Joining
// inline markup is what exposes text a reader sees as continuous, while separating
// blocks is what stops the end of one paragraph abutting the start of the next.
// ---------------------------------------------------------------------------
const visibleText = (html) => extractVisibleText(html, { inlineSeparator: '' });

const index = createRenderIndex(dist);

/**
 * Occurrence offsets of `term`, with every licensed compound masked out first.
 * Masking preserves length, so offsets stay valid against the unmasked text and a
 * report can quote what a reader actually sees.
 *
 * This is methodology principle 7 as code: `保护区` is drift for *national
 * monument* and correct inside `荒野保护区` (*wilderness area*). Counting
 * occurrences rather than residue is how a bare-stem sweep silently corrupts.
 */
function residueOffsets(text, term, licensedIn) {
  let hay = text;
  for (const lic of licensedIn ?? []) {
    if (!lic) continue;
    // NUL, not a space: a space-filled hole could in principle bridge the two halves
    // of a multi-word term sitting either side of it. NUL never occurs in extracted
    // text, and the length is preserved so offsets stay valid against `text`.
    hay = hay.split(lic).join('\u0000'.repeat(lic.length));
  }
  const out = [];
  let from = 0;
  for (;;) {
    const i = hay.indexOf(term, from);
    if (i < 0) break;
    out.push(i);
    from = i + term.length;
  }
  return out;
}

const countOf = (text, term) => residueOffsets(text, term, null).length;

const snippet = (text, from, to, pad = 34) =>
  (from - pad > 0 ? '…' : '') +
  text.slice(Math.max(0, from - pad), Math.min(text.length, to + pad)).trim() +
  (to + pad < text.length ? '…' : '');

// ---------------------------------------------------------------------------
// Phase 3 — verification against the rendered corpus.
// ---------------------------------------------------------------------------
const observed = {};   // loc -> lockId -> count
const hits = {};       // loc -> lockId -> forbiddenText -> [{url, context}]
const pagesScanned = {};

for (const page of index.pages) {
  const loc = page.key.split('/')[0]; // the index states route identity; the locale rule is this gate's
  if (!TARGETS.includes(loc)) continue; // English pages are out of scope by definition
  const entry = config.locales[loc];
  const url = page.url;
  const text = page.derive('visibleText', visibleText);
  pagesScanned[loc] = (pagesScanned[loc] ?? 0) + 1;
  observed[loc] ??= {};
  hits[loc] ??= {};

  for (const lock of entry.locks) {
    observed[loc][lock.id] = (observed[loc][lock.id] ?? 0) + countOf(text, lock.phrase);
    for (const f of lock.forbidden ?? []) {
      const offsets = residueOffsets(text, f.text, f.licensedIn);
      if (!offsets.length) continue;
      hits[loc][lock.id] ??= {};
      const bucket = (hits[loc][lock.id][f.text] ??= []);
      for (const i of offsets) bucket.push({ url, context: snippet(text, i, i + f.text.length) });
    }
  }
}

for (const loc of TARGETS) {
  const entry = config.locales[loc];
  for (const lock of entry.locks) {
    const actual = observed[loc]?.[lock.id] ?? 0;

    // --- required locked phrases exist / conserved counts remain valid ---
    if (typeof lock.count === 'number' && actual !== lock.count) {
      findings.push({
        loc, kind: 'count', lock: lock.id, term: lock.phrase,
        detail: lock.concept, expectedCount: lock.count, observedCount: actual,
        provenance: lock.provenance,
      });
    } else if (typeof lock.min === 'number' && actual < lock.min) {
      findings.push({
        loc, kind: actual === 0 ? 'missing' : 'floor', lock: lock.id, term: lock.phrase,
        detail: lock.concept, expectedCount: lock.min, observedCount: actual,
        provenance: lock.provenance,
      });
    }

    // --- forbidden substitutions do not appear ---
    for (const f of lock.forbidden ?? []) {
      const found = hits[loc]?.[lock.id]?.[f.text] ?? [];
      if (!found.length) continue;
      const record = {
        loc, kind: 'substitution', lock: lock.id, term: lock.phrase,
        expected: lock.phrase, observed: f.text, why: f.why,
        provenance: lock.provenance, sites: found,
        licensedIn: f.licensedIn, licensedWhy: f.licensedWhy,
      };
      (f.enforce === 'report' ? advisories : findings).push(record);
    }
  }
}

// ---------------------------------------------------------------------------
// Phase 4 — reporting.
// ---------------------------------------------------------------------------
const SITE_CAP = 8;

function renderSites(sites) {
  const shown = sites.slice(0, SITE_CAP);
  const lines = shown.map((s) => `    ${s.url}\n      "${s.context}"`);
  if (sites.length > shown.length) lines.push(`    … and ${sites.length - shown.length} more site(s)`);
  return lines.join('\n');
}

function render(f) {
  const head = `Locale: ${f.loc}\n`;
  if (f.kind === 'count' || f.kind === 'missing' || f.kind === 'floor') {
    const label = f.kind === 'count' ? 'Locked phrase count' : f.kind === 'missing' ? 'Locked phrase absent' : 'Locked phrase below its frozen floor';
    return (
      head +
      `\n${label}:\n  ${f.term}   (${f.detail})\n` +
      `\n  Expected: ${f.kind === 'count' ? f.expectedCount : `${f.expectedCount} or more`}\n  Observed: ${f.observedCount}\n` +
      `\nLock: ${f.lock}\nEstablished by: ${f.provenance}\n`
    );
  }
  if (f.kind === 'anchor') {
    return (
      head +
      `\nLocked term:\n  ${f.expected}\n` +
      `\nObserved:\n  ${f.observed}\n` +
      `\nExpected:\n  ${f.expected}\n` +
      `\nLock: ${f.lock} — ${f.detail}\n`
    );
  }
  return (
    head +
    `\nLocked term:\n  ${f.expected}\n` +
    `\nObserved:\n  ${f.observed}   (${f.sites.length} site${f.sites.length === 1 ? '' : 's'})\n` +
    `\nExpected:\n  ${f.expected}\n` +
    `\nWhy this is drift:\n  ${f.why}\n` +
    (f.licensedIn?.length ? `\nLicensed compounds already excluded:\n  ${f.licensedIn.join(', ')} — ${f.licensedWhy ?? ''}\n` : '') +
    `\nSites:\n${renderSites(f.sites)}\n` +
    `\nLock: ${f.lock}\nEstablished by: ${f.provenance}\n`
  );
}

if (advisories.length) {
  const n = advisories.reduce((a, f) => a + f.sites.length, 0);
  console.warn(`\ngate-4i: ${n} advisory occurrence(s) across ${advisories.length} lock(s) — drift in a locale where the decision was never applied\n`);
  for (const f of advisories) console.warn(render(f));
  console.warn(
    '  These are open owner decisions, not regressions: the same drift class was measured\n' +
      '  and placed out of scope by the item that decided the lock elsewhere. They never block.\n' +
      '  Deciding one means changing "enforce" to "block" here, after the sweep.\n'
  );
}

if (findings.length) {
  const byKind = findings.reduce((a, f) => ((a[f.kind] = (a[f.kind] ?? 0) + 1), a), {});
  console.error(
    `\ngate-4i: ${findings.length} glossary lock violation(s) — ` +
      Object.entries(byKind).map(([k, n]) => `${k} ${n}`).join(', ') + '\n'
  );
  for (const f of findings) console.error(render(f));
  console.error(
    'Each violation is a locked rendering the corpus no longer honours. Fix it as one\n' +
      'corpus-wide pass (Gate 4c), never file by file. If a count moved because pages were\n' +
      `added or removed, re-measure and update the frozen figure in ${host.policy.describe('glossary')} —\n` +
      'deliberately, as a re-baseline, which is what a conserved count is for.\n'
  );
  process.exit(1);
}

const lockCount = TARGETS.reduce((a, l) => a + config.locales[l].locks.length, 0);
const anchorCount = TARGETS.reduce((a, l) => a + (config.locales[l].anchors?.length ?? 0), 0);
const pages = Object.values(pagesScanned).reduce((a, b) => a + b, 0);
console.log(
  `gate-4i: ✔ ${lockCount} glossary locks across ${TARGETS.length} locales verified on ${pages} rendered pages ` +
    `(${anchorCount} dictionary anchors intact)` +
    (advisories.length ? ` — ${advisories.length} advisory lock(s) reported` : '')
);
