// scripts/lib/rendered-text.mjs — shared rendered-output primitives (F3 phase 4a).
//
// WHAT THIS IS. The canonical traversal of `dist/` and the canonical ways to turn
// rendered HTML into comparable text. Gate scripts *compose* these primitives and
// state their own semantics at the call site; they do not reimplement them.
//
// FRAMEWORK INVARIANT. No primitive here branches on gate identity, and none of them
// inspects its caller. Every gate-specific decision — inline separator, unit of
// extraction, whether numeric entity references are decoded, whether the result is
// NFC-normalised — is an argument supplied by the gate. If a future change would
// require a primitive to know *which* gate is calling, that is an F3 finding and the
// primitive is wrong, not the caller.
//
//     ok    extractVisibleText(html, { inlineSeparator: '' })
//     not   extractVisibleText(html, 'gate-4h')
//
// WHAT THIS IS NOT. It is not policy. No lexicon, no threshold, no locale list, and
// no notion of blocking-vs-advisory appears here. Those belong to the gates.
//
// THERE ARE THREE EXTRACTION CONTRACTS, NOT ONE. Gates 4h and 4i share one
// byte-identical extractor (`extractVisibleText`). Gates 4f and 4g do not use it:
// their unit of extraction is a single element — a heading, an anchor — and inside
// one element there is no seam to preserve, so inline tags collapse to a *space*
// (`flattenElementText`). Collapsing the two contracts into one would either
// fabricate seams in 4h/4i or weld adjacent words together in 4f/4g.
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Canonical traversal of rendered output: every `.html` file under `dir`, recursive,
 * in sorted order at every level.
 *
 * Sorted is the standard. Before this module gates 4f and 4h walked unsorted while 4g
 * and 4i sorted, which made two gates' report ordering depend on filesystem order.
 * Ordering is presentation; it is not part of any gate's verdict. Counts and findings
 * are invariant under it.
 */
export function distWalk(dir) {
  const out = [];
  (function walk(d) {
    for (const name of readdirSync(d).sort()) {
      const full = join(d, name);
      if (statSync(full).isDirectory()) walk(full);
      else if (name.endsWith('.html')) out.push(full);
    }
  })(dir);
  return out;
}

/**
 * Canonical named-entity table — the union of what the gates decoded separately.
 *
 * The `#`-prefixed keys are reachable only from the `&([a-z#0-9]+);` form used by
 * `decodeEntities`; a caller matching only `[a-z]+` can never see them, so the union
 * is inert for such a caller rather than merely harmless.
 */
export const NAMED_ENTITIES = {
  nbsp: ' ', amp: '&', quot: '"', apos: "'", lt: '<', gt: '>',
  '#39': "'", '#039': "'", '#160': ' ', mdash: '—', ndash: '–', hellip: '…',
};

const safeCodePoint = (cp, fallback) => {
  try { return String.fromCodePoint(cp); } catch { return fallback; }
};

/**
 * Canonical HTML entity normalisation.
 *
 * `numeric` is the caller's decision, not a default that happens to suit prose.
 * Prose does not carry `&#128222;`; anchor text does — the phone and gallery links
 * render their icons as numeric references, and left encoded they arrive as the
 * letter-bearing string `#128222;` and classify as English text. A prose gate that
 * turned numerics on would be widening its own corpus for no reason, so the flag is
 * stated where the corpus is chosen.
 *
 * `entities` lets a caller decode a narrower table than the union when adopting the
 * union would change its verdict. That is a measured exception, never a preference.
 */
export function decodeEntities(s, { numeric = false, entities = NAMED_ENTITIES, namedPattern = /&([a-z#0-9]+);/gi } = {}) {
  let out = s;
  if (numeric) {
    out = out
      .replace(/&#x([0-9a-f]+);/gi, (m, h) => safeCodePoint(parseInt(h, 16), m))
      .replace(/&#(\d+);/g, (m, d) => safeCodePoint(parseInt(d, 10), m));
  }
  return out.replace(namedPattern, (m, e) => entities[e.toLowerCase()] ?? m);
}

/**
 * Remove regions whose text is never rendered as prose, so their contents can never
 * reach a corpus. Common to every gate that reads `dist/`.
 *
 * Decorative subtrees (`<svg>`, `aria-hidden` spans) are deliberately NOT removed
 * here: they matter to anchor text and not to prose, so that removal stays at gate
 * 4g's call site where the reason for it is legible.
 */
export function stripNonRendered(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<template[\s\S]*?<\/template>/gi, ' ')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
}

/** Block-level elements interrupt the text flow; inline ones do not. */
export const BLOCK_ELEMENTS =
  'p|div|section|article|aside|header|footer|nav|main|figure|figcaption|blockquote|pre|hr|br|' +
  'ul|ol|li|dl|dt|dd|table|thead|tbody|tfoot|tr|td|th|h[1-6]|form|fieldset|legend|address|' +
  'details|summary|option|title';

const BLOCK_RE = new RegExp(`</?(?:${BLOCK_ELEMENTS})\\b[^>]*>`, 'gi');

/**
 * THE IDENTITY OF THE VIEW BELOW, AND THE REASON IT LIVES HERE.
 *
 * A census fact records which view produced it, so a consumer can refuse a number it
 * cannot interpret. That only works if producer and consumer agree on the name — and
 * F5 Phase 4 shipped the name as a hand-maintained literal inside the producer, one
 * directory away from the function it names. Phase 5 made the hole load-bearing: with
 * two consumers about to assert on it, a copied literal would be exactly the duplicated
 * knowledge this phase exists to remove (D-1, one layer down).
 *
 * So the identity sits beside the view. A change to `extractVisibleText` that alters
 * what a reader sees must bump this string in the same edit — the two are one line
 * apart, which is the only enforcement a constant can honestly have. Bumping it makes
 * every committed count that names the old version unreadable rather than silently
 * stale, which is the entire purpose of the field.
 */
export const VISIBLE_TEXT_EXTRACTOR = 'visibleText@1';

/**
 * Whole-page visible text, for gates whose unit of extraction is the page.
 *
 * `inlineSeparator` is the caller's decision and is load-bearing in both directions.
 * With `''` inline markup is dropped with no separator, which is what re-joins a seam
 * that markup had split — `路况向<strong>向官方渠道核实</strong>` holds no duplicated
 * character until the tags come off. Block tags always leave a space, or the end of
 * one paragraph abutting the start of the next would fabricate a seam no reader sees.
 *
 * The `[   ]` fold is load-bearing here and cannot be dropped in favour
 * of the final collapse: that collapse is the explicit ASCII class `[ \t\r\n]+`, not
 * `\s+`, so nothing else in this function would ever normalise a non-breaking space.
 */
export function extractVisibleText(html, { inlineSeparator = '', entities = NAMED_ENTITIES } = {}) {
  return stripNonRendered(html)
    .replace(BLOCK_RE, ' ')
    .replace(/<[^>]+>/g, inlineSeparator)
    .replace(/&([a-z#0-9]+);/gi, (m, e) => entities[e.toLowerCase()] ?? m)
    .normalize('NFC')
    .replace(/[   ]/g, ' ')
    .replace(/[ \t\r\n]+/g, ' ');
}

/**
 * Fold curly punctuation to ASCII and collapse whitespace, so a licensed phrase or a
 * registered identity matches whether the page renders `Doc's Beach` or `Doc’s Beach`.
 *
 * The trailing `\s+` already covers U+00A0, U+2007 and U+202F — all three are Zs — so
 * this needs no separate fold, unlike `extractVisibleText`.
 */
export function foldPunctuation(s) {
  return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
          .replace(/\s+/g, ' ').trim();
}

/**
 * Text of a single element, for gates whose unit of extraction is one element.
 *
 * Every tag inside collapses to a space and the result is whitespace-normalised,
 * which is what makes a heading or an anchor split across `<strong>` compare equal to
 * the same text written flat. There is no seam to preserve inside one element, which
 * is precisely why this is a different primitive from `extractVisibleText` rather
 * than a flag on it.
 */
export function flattenElementText(inner, { numeric = false, entities = NAMED_ENTITIES, namedPattern, nfc = false } = {}) {
  const decoded = decodeEntities(inner.replace(/<[^>]+>/g, ' '), { numeric, entities, ...(namedPattern ? { namedPattern } : {}) });
  const folded = foldPunctuation(decoded);
  return nfc ? folded.normalize('NFC') : folded;
}
