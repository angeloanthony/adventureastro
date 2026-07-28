// scripts/gate-4j-gallery-parity.mjs — Gate 4j: shared localization integrity
// for the homepage gallery (P34). Implements the invariant D1 established:
//
//   Every registered locale explicitly defines every gallery key.
//   Fallback is an emergency runtime behavior, never a shipped state.
//
// SCOPE. This gate validates STRUCTURE, not wording. It never compares one
// locale's text against another's — proper nouns ("Doc's Beach", "Kawasaki KRX
// 1000") are legitimately identical across locales, so a text comparison would
// be pure noise. What it proves is that no slide silently resolves through
// `textFor()`'s English fallback in a shipped build.
//
// WHY THE AST. `home-gallery.ts` imports `../lib/i18n` extensionless, so Node's
// type-stripping loader cannot import it directly; and the dictionaries are
// 1,000+ lines of object literals, where regex parsing is fragile. The
// TypeScript compiler is already a devDependency, so the source is parsed with
// the real parser instead. Two structural defects are ONLY visible this way and
// are invisible at runtime:
//   - a duplicate key in a dictionary (the second literal silently wins)
//   - two locales aliased to the same dictionary identifier (shipped fallback)
//
// This is a source-level check with no dist/ dependency, so it runs BEFORE
// `astro build` — a broken dictionary fails in seconds rather than after a
// full site build.
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { parseSourceFile, declOf, keyOf, stringOf, unwrap, at as atIn } from './lib/ts-ast.mjs';
import { resolveHost } from './lib/host-adapter.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const GALLERY = join(root, 'src', 'page-content', 'home-gallery.ts');

const errors = [];
const fail = (msg) => errors.push(msg);

/** Parse a file into an AST. Syntax errors surface as garbage nodes, not throws. */
const parse = parseSourceFile;

/** `file:line` for a node, so a failure points at the exact source line. */
const at = (sf, node) => atIn(sf, node, root);

// ---------------------------------------------------------------------------
// 1. Registered locales — the host's own registry is the authority on which
//    locales must have a dictionary at all.
//
//    F4 Phase 1: this gate no longer knows where that roadmap lives or how it is
//    written. It asks the host adapter and receives the answer. The exit code
//    stays 1 here, where the dist/ gates use 2 — that difference is gate policy
//    and is decided here, never in the adapter.
// ---------------------------------------------------------------------------
let host;
try {
  host = resolveHost();
} catch (e) {
  console.error(`gate-4j: ${e.message}`);
  process.exit(1);
}
const LOCALE_CODES = host.localeCodes;
if (LOCALE_CODES.length === 0) {
  console.error(`gate-4j: ${host.diagnostics.noCodes}`);
  process.exit(1);
}
const DEFAULT_LOCALE = host.defaultLocale;

// ---------------------------------------------------------------------------
// 2. The canonical key set — GALLERY_SLIDES. The slide table is the authority;
//    a dictionary is measured against it, never against another dictionary.
// ---------------------------------------------------------------------------
const gallerySf = parse(GALLERY);
const slidesNode = declOf(gallerySf, 'GALLERY_SLIDES');
if (!slidesNode || !ts.isArrayLiteralExpression(slidesNode)) {
  console.error('gate-4j: could not parse GALLERY_SLIDES from src/page-content/home-gallery.ts');
  process.exit(1);
}

const SLIDE_IDS = [];
const slideIdSet = new Set();
for (const el of slidesNode.elements) {
  const obj = unwrap(el);
  if (!ts.isObjectLiteralExpression(obj)) {
    fail(`GALLERY_SLIDES entry at ${at(gallerySf, el)} is not an object literal — the slide table must stay statically analyzable`);
    continue;
  }
  const idProp = obj.properties.find((p) => ts.isPropertyAssignment(p) && keyOf(p) === 'id');
  const id = idProp && stringOf(idProp.initializer);
  if (!id) {
    fail(`GALLERY_SLIDES entry at ${at(gallerySf, obj)} has no string-literal \`id\``);
    continue;
  }
  // Duplicate slide ids would make two slides share one translation and make
  // the expected-key count silently disagree with the rendered slide count.
  if (slideIdSet.has(id)) fail(`duplicate slide id "${id}" in GALLERY_SLIDES at ${at(gallerySf, obj)}`);
  else slideIdSet.add(id);
  SLIDE_IDS.push(id);
}

// ---------------------------------------------------------------------------
// 3. The registry — GALLERY_TEXT maps each locale to a dictionary identifier.
//    Two aliased locales, or a locale with no entry, are shipped fallback.
// ---------------------------------------------------------------------------
const registryNode = declOf(gallerySf, 'GALLERY_TEXT');
if (!registryNode || !ts.isObjectLiteralExpression(registryNode)) {
  console.error('gate-4j: could not parse the GALLERY_TEXT registry');
  process.exit(1);
}

const registry = new Map(); // locale -> dictionary identifier name
for (const prop of registryNode.properties) {
  const locale = keyOf(prop);
  if (!locale) {
    fail(`GALLERY_TEXT has a computed/unreadable key at ${at(gallerySf, prop)}`);
    continue;
  }
  // `en: GALLERY_TEXT_EN` (assignment) or `GALLERY_TEXT_EN` (shorthand).
  let ident = null;
  if (ts.isPropertyAssignment(prop)) {
    const v = unwrap(prop.initializer);
    if (ts.isIdentifier(v)) ident = v.text;
  } else if (ts.isShorthandPropertyAssignment(prop)) {
    ident = prop.name.text;
  }
  if (!ident) {
    fail(`GALLERY_TEXT["${locale}"] at ${at(gallerySf, prop)} is not a plain dictionary reference`);
    continue;
  }
  if (registry.has(locale)) fail(`GALLERY_TEXT registers locale "${locale}" twice at ${at(gallerySf, prop)}`);
  registry.set(locale, ident);
}

for (const code of LOCALE_CODES) {
  if (!registry.has(code)) {
    fail(`locale "${code}" is registered by the host but has no GALLERY_TEXT dictionary — it would resolve through the English fallback`);
  }
}
for (const code of registry.keys()) {
  if (!LOCALE_CODES.includes(code)) {
    fail(`GALLERY_TEXT registers "${code}", which is not a locale the host registers`);
  }
}
// Aliasing check: a non-default locale pointing at another locale's dictionary
// is fallback shipped as if it were a translation.
const byIdent = new Map();
for (const [code, ident] of registry) {
  if (!byIdent.has(ident)) byIdent.set(ident, []);
  byIdent.get(ident).push(code);
}
for (const [ident, codes] of byIdent) {
  if (codes.length > 1) {
    fail(`locales ${codes.map((c) => `"${c}"`).join(', ')} all point at ${ident} — a shared dictionary is shipped fallback, not a translation`);
  }
}

// ---------------------------------------------------------------------------
// 4. Per-locale key parity. Structure only: presence, uniqueness, non-emptiness.
// ---------------------------------------------------------------------------
const REQUIRED_FIELDS = ['alt', 'caption'];
const report = []; // locales with at least one defect, in LOCALE_CODES order
const summary = [];

for (const locale of LOCALE_CODES) {
  const ident = registry.get(locale);
  if (!ident) continue; // already reported above

  const dictNode = declOf(gallerySf, ident);
  if (!dictNode || !ts.isObjectLiteralExpression(dictNode)) {
    fail(`dictionary ${ident} (locale "${locale}") is not an object literal in home-gallery.ts`);
    continue;
  }

  const present = new Set();
  const duplicates = [];
  const empty = [];
  const nonLiteral = [];

  for (const prop of dictNode.properties) {
    const id = keyOf(prop);
    if (!id) {
      fail(`${ident} has a computed/unreadable key at ${at(gallerySf, prop)}`);
      continue;
    }
    // A duplicate key is invisible at runtime — the later literal silently
    // overwrites the earlier one — so it can only be caught here.
    if (present.has(id)) duplicates.push(`${id} (${at(gallerySf, prop)})`);
    present.add(id);

    if (!ts.isPropertyAssignment(prop)) {
      nonLiteral.push(`${id} (${at(gallerySf, prop)})`);
      continue;
    }
    const value = unwrap(prop.initializer);
    if (!ts.isObjectLiteralExpression(value)) {
      nonLiteral.push(`${id} (${at(gallerySf, prop)})`);
      continue;
    }
    for (const field of REQUIRED_FIELDS) {
      const fieldProp = value.properties.find((p) => ts.isPropertyAssignment(p) && keyOf(p) === field);
      if (!fieldProp) {
        empty.push(`${id}.${field} (missing)`);
        continue;
      }
      const text = stringOf(fieldProp.initializer);
      if (text === null) {
        nonLiteral.push(`${id}.${field} (${at(gallerySf, fieldProp)})`);
      } else if (text.trim() === '') {
        // Note: an empty `alt` is legitimate on a decorative <img>, but never
        // here — every gallery slide is content, and validate-site's check 7
        // only requires the attribute to exist, not to say anything.
        empty.push(`${id}.${field}`);
      }
    }
  }

  const missing = SLIDE_IDS.filter((id) => !present.has(id));
  const orphan = [...present].filter((id) => !slideIdSet.has(id));

  summary.push(`${locale} ${present.size}/${SLIDE_IDS.length}`);

  if (missing.length || orphan.length || empty.length || duplicates.length || nonLiteral.length) {
    const block = [`Locale: ${locale}${locale === DEFAULT_LOCALE ? ' (fallback source)' : ''}`];
    block.push(`  Expected: ${SLIDE_IDS.length}   Present: ${present.size}`);
    const section = (label, items) => {
      if (!items.length) return;
      block.push(`  ${label}:`);
      for (const i of items) block.push(`    ${i}`);
    };
    section('Missing', missing);
    section('Orphan', orphan);
    section('Empty', empty);
    section('Duplicate', duplicates);
    section('Not a literal', nonLiteral);
    report.push(block.join('\n'));
  }
}

// ---------------------------------------------------------------------------
// 5. Result.
// ---------------------------------------------------------------------------
if (errors.length || report.length) {
  console.error('\ngate-4j: gallery localization integrity FAILED\n');
  for (const e of errors) console.error(`  ✖ ${e}`);
  if (errors.length) console.error('');
  for (const block of report) console.error(`${block}\n`);
  console.error(
    'Every registered locale must explicitly define every slide id in GALLERY_SLIDES.\n' +
      'The English fallback in textFor() is an emergency runtime guard, not a shipped state.\n'
  );
  process.exit(1);
}

const localeCount = LOCALE_CODES.length;
const entries = SLIDE_IDS.length * localeCount;
console.log(
  `gate-4j: ✔ ${SLIDE_IDS.length} slides x ${localeCount} locales — ${entries} entries, complete (${summary.join(' · ')})`
);
