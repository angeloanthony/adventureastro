// scripts/gate-4o-affordance-arrows.mjs — Gate 4o: directional affordance
// glyphs are authored through the shared abstraction (AR-2 B-6).
//
// INVARIANT. Anywhere that can render into an RTL document, a directional UI
// affordance is produced by the host's direction-aware helper, never written as
// a literal glyph.
//
// WHAT THIS IS NOT. It is not "no arrows in the source". The B-6 census is the
// whole reason this gate exists and it is the reason the rule is this narrow:
// of 204 source `→` occurrences, 64 were comments or tooling output and ~136
// were correct LTR content. A gate that banned the glyph would have reported
// 204 findings against a corpus with zero live defects. The measurement that
// mattered separated *populations*, not occurrences, so this gate separates
// populations too:
//
//   affordance  "Book Lodging →"        a UI control meaning ONWARD.
//                                       Direction-dependent. Belongs behind the
//                                       helper. THIS GATE'S BUSINESS.
//
//   relation    "Vernal → Flaming Gorge"  content: a from/to relation between two
//                                       proper nouns. In an RTL document its
//                                       correctness is a bidi-resolution question
//                                       about the surrounding runs, not a glyph
//                                       swap. Gate 4n's business, not this one.
//                                       Counted here, never failed on.
//
// THE DISCRIMINATOR IS FLANKING, which is deliberately the same shape as the
// ADR-10 isolation rule: an arrow with real text on BOTH sides is relating two
// things; an arrow at either edge of its text run is trailing (or leading) a
// label. That rule is decidable from the source alone and needs no judgement —
// which is what makes it promotable, and it is the only property of the arrow
// the audit's `Bidi_Mirrored` classification could never supply.
//
// SCOPE IS TWO POPULATIONS, BOTH DERIVED FROM THE HOST REGISTRY:
//   1. shared chrome — components and layouts render for EVERY locale, so a
//      literal affordance there is already wrong for any rtl locale.
//   2. rtl-locale content — files that render only into an rtl locale.
// LTR-only content is out of scope BY DECISION, not by omission: those pages are
// authored LTR, render LTR and behave correctly, and rewriting them would be
// churn. The decision is printed on every success for the same reason gate 4j
// prints its exemptions — an exclusion nobody sees decays into a suppression list.
//
// This is a source-level check with no dist/ dependency, so it runs BEFORE
// `astro build` alongside gate 4j.
//
// EXIT CODES. 2 for anything structural (unresolvable host, undeclared direction
// field). 1 for findings in the corpus. 0 with a one-line summary.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveHost } from './lib/host-adapter.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------------------
// 1. The glyphs.
//
//    ONLY the pairs whose mirroring the bidi algorithm will NOT do for us.
//    `›` `‹` `»` `«` are Bidi_Mirrored=Yes — 1,004 of them render on this site
//    and they need exactly zero work. Including them here would resurrect the
//    204-finding gate this one exists to avoid.
// ---------------------------------------------------------------------------
export const AFFORDANCE_GLYPHS = Object.freeze([
  { char: '→', name: 'U+2192 →', entities: ['&rarr;', '&#8594;', '&#x2192;'] },
  { char: '←', name: 'U+2190 ←', entities: ['&larr;', '&#8592;', '&#x2190;'] },
  { char: '▶', name: 'U+25B6 ▶', entities: ['&#9654;', '&#x25B6;'] },
  { char: '◀', name: 'U+25C0 ◀', entities: ['&#9664;', '&#x25C0;'] },
]);

/** One alternation matching every spelling of every in-scope glyph. */
const GLYPH_RE = new RegExp(
  AFFORDANCE_GLYPHS.flatMap((g) => [g.char, ...g.entities])
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|'),
  'g'
);

const glyphName = (match) =>
  AFFORDANCE_GLYPHS.find((g) => g.char === match || g.entities.includes(match))?.name ?? match;

// ---------------------------------------------------------------------------
// 2. Comment stripping.
//
//    LOAD-BEARING, not hygiene. 64 of the census's 204 hits were comments, and
//    three of the six components the AR-1 audit named as carrying chrome arrows
//    carry only commented ones. Without this the gate fails on a correct tree.
//
//    Replacement preserves length and newlines so reported line numbers stay
//    true to the file.
// ---------------------------------------------------------------------------
const blank = (s) => s.replace(/[^\n]/g, ' ');

export function stripComments(text, ext) {
  let out = text;
  // HTML comments (.astro markup, .mdx, .html).
  out = out.replace(/<!--[\s\S]*?-->/g, blank);
  // JSX/MDX expression comments.
  out = out.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, blank);
  // Block comments — TS frontmatter, plain TS/JS, and CSS <style> blocks.
  out = out.replace(/\/\*[\s\S]*?\*\//g, blank);
  // Line comments. The `:` guard keeps `https://` out of the jaws; a line
  // comment never follows a colon directly.
  if (ext !== '.mdx' && ext !== '.md') {
    out = out.replace(/(^|[^:])\/\/[^\n]*/g, (m, lead) => lead + blank(m.slice(lead.length)));
  }
  return out;
}

// ---------------------------------------------------------------------------
// 3. Classification.
//
//    A "text run" is what surrounds the glyph up to the nearest boundary that
//    ends authored prose: a tag edge, an interpolation brace, a quote or
//    backtick, or the line ends. Whatever sits between those boundaries and the
//    glyph is its flank.
//
//    relation   := non-space flank on BOTH sides
//    affordance := anything else (trailing, leading, or alone in its element)
// ---------------------------------------------------------------------------
const BOUNDARY = /[<>{}`"'\n]/;

function flank(text, from, to, step) {
  for (let i = from; i !== to; i += step) {
    const ch = text[i];
    if (BOUNDARY.test(ch)) return '';
    if (!/\s/.test(ch)) return ch;
  }
  return '';
}

export function classifyArrows(text, ext) {
  const src = stripComments(text, ext);
  const out = [];
  for (const m of src.matchAll(GLYPH_RE)) {
    const start = m.index;
    const end = start + m[0].length - 1;
    const before = flank(src, start - 1, -1, -1);
    const after = flank(src, end + 1, src.length, 1);
    out.push({
      glyph: m[0],
      index: start,
      line: src.slice(0, start).split('\n').length,
      kind: before && after ? 'relation' : 'affordance',
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// 4. Scope.
// ---------------------------------------------------------------------------
const SHARED_DIRS = [join('src', 'components'), join('src', 'layouts')];
const EXTS = new Set(['.astro', '.ts', '.tsx', '.mdx', '.md']);

function walk(dir, acc = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (EXTS.has(full.slice(full.lastIndexOf('.')))) acc.push(full);
  }
  return acc;
}

/**
 * Why a file is in scope, or null if it is not.
 *
 * The rtl locale set comes from the host registry, never from a hardcoded 'ar'.
 * A second rtl locale must not need an edit here to be protected.
 */
export function scopeOf(relPath, rtlCodes) {
  const p = relPath.split(sep).join('/');
  if (SHARED_DIRS.some((d) => p.startsWith(d.split(sep).join('/') + '/'))) return 'shared-chrome';
  for (const code of rtlCodes) {
    if (p.startsWith(`src/pages/${code}/`)) return `rtl-content (${code})`;
    if (/\.([a-z]{2})\.mdx?$/.test(p) && p.endsWith(`.${code}.mdx`)) return `rtl-content (${code})`;
    if (p.endsWith(`.${code}.md`)) return `rtl-content (${code})`;
  }
  return null;
}

// ---------------------------------------------------------------------------
// 5. Run.
// ---------------------------------------------------------------------------
function main() {
  let host;
  try {
    host = resolveHost();
  } catch (e) {
    console.error(`gate-4o: ${e.message}`);
    process.exit(2);
  }

  let directions;
  try {
    directions = host.direction.map;
  } catch (e) {
    console.error(`gate-4o: locale direction ${e.message} — refusing to pass silently.`);
    process.exit(2);
  }

  const rtlCodes = Object.entries(directions)
    .filter(([, d]) => d === 'rtl')
    .map(([c]) => c);

  if (rtlCodes.length === 0) {
    console.log('gate-4o: ✔ no rtl locale is registered — no affordance can render mirrored (vacuous pass)');
    return;
  }

  const files = [];
  for (const d of [...SHARED_DIRS, join('src', 'pages'), join('src', 'content')]) {
    const abs = join(root, d);
    try {
      if (statSync(abs).isDirectory()) files.push(...walk(abs));
    } catch {
      /* absent tree is not a failure */
    }
  }

  const findings = [];
  let relations = 0;
  let scanned = 0;

  for (const abs of files) {
    const rel = relative(root, abs);
    const why = scopeOf(rel, rtlCodes);
    if (!why) continue;
    scanned++;
    const text = readFileSync(abs, 'utf8');
    for (const hit of classifyArrows(text, abs.slice(abs.lastIndexOf('.')))) {
      if (hit.kind === 'relation') relations++;
      else findings.push({ rel: rel.split(sep).join('/'), why, ...hit });
    }
  }

  if (findings.length) {
    console.error('\ngate-4o: directional affordance glyphs FAILED\n');
    for (const f of findings) {
      console.error(`  ✖ ${f.rel}:${f.line} — literal ${glyphName(f.glyph)} in ${f.why}`);
    }
    console.error(
      '\nA directional affordance must come from the host helper, which reads the\n' +
        'locale\'s declared direction, so it points ONWARD in both ltr and rtl.\n' +
        'A literal glyph is frozen to one direction and is wrong in the other.\n\n' +
        '  import { affordanceArrow } from "../../lib/i18n";\n' +
        '  <span class="x-arrow" aria-hidden="true">{affordanceArrow(lang)}</span>\n\n' +
        'If the glyph relates two things ("Vernal → Flaming Gorge") rather than\n' +
        'labelling a control, it is content, not an affordance — put real text on\n' +
        'both sides of it and gate 4n will judge its bidi behaviour instead.\n'
    );
    process.exit(1);
  }

  // The out-of-scope decision is printed on success, deliberately. B-6 chose not
  // to rewrite correct LTR content; that choice has to stay visible or it turns
  // into an unexamined suppression.
  const ltrNote =
    'ltr-only content is out of scope by decision (authored, rendered and correct as ltr)';
  const relNote = relations
    ? `; ${relations} relation arrow(s) in scope left to gate 4n as content`
    : '';
  console.log(
    `gate-4o: ✔ ${scanned} in-scope file(s) — 0 literal affordance glyphs ` +
      `(rtl: ${rtlCodes.map((c) => `"${c}"`).join(', ')}${relNote}; ${ltrNote})`
  );
}

if (import.meta.url === `file://${process.argv[1].split(sep).join('/')}` ||
    process.argv[1]?.endsWith('gate-4o-affordance-arrows.mjs')) {
  main();
}
