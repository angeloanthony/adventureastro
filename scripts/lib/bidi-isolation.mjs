// scripts/lib/bidi-isolation.mjs — bidi isolation mechanics (AR-2 Track A).
//
// WHAT THIS IS. The decomposition of rendered HTML into bidi scopes, and the two
// classifications of a mirrored character that ADR-10 weighs against each other. It is
// engine: UAX #9 mechanics and nothing else.
//
// WHAT IT IS NOT. It holds no locale list, no notion of which direction a locale reads, no
// blocking-vs-advisory opinion and no idea that gates exist. Which pages are RTL comes from
// the host registry through the adapter (ADR-9); this module is told a base direction and
// answers a question about characters.
//
// WHY THE REJECTED RULE IS EXPORTED ALONGSIDE THE ACCEPTED ONE.
// ADR-10 §7 requires the gate to be tested DIFFERENTIALLY: it is not enough to show the
// accepted rule passes today's corpora, because the rejected rule passes them too — this
// host's same-flank population is zero, so both rules return zero findings here and the
// corpus cannot tell them apart. The test must run both and show they DISAGREE. That is
// only possible if the rejected algorithm is executable rather than described, so it ships
// here as `RULES.coarse`, permanently, with its measurement attached. It has exactly one
// consumer — the differential test — and no gate may call it.
//
// WHY THE TOKENIZER IS HERE AND NOT IN `rendered-text.mjs`.
// That module's three extraction contracts all DISCARD structure: they flatten a page, an
// element or a seam into comparable text. This one needs the opposite — ancestry, block
// boundaries and isolation boundaries are the whole question. Folding it in would give that
// module a fourth contract that contradicts the other three's premise. It reuses
// `stripNonRendered` so "what is never rendered" keeps one definition.
import { stripNonRendered, NAMED_ENTITIES } from './rendered-text.mjs';

/**
 * A character that changes shape under mirroring.
 *
 * Derived from the Unicode property, never from a hand-written bracket list. AR-1's §0.1
 * lesson: intuition inverts this. The 1004 breadcrumb `›` need no work because they are
 * `Bidi_Mirrored=Yes` and flip automatically; the 256 `→` arrows need all of it because
 * they are `Bidi_Mirrored=No`. A curated list would have contained the arrow and omitted
 * the guillemet.
 */
const MIRRORED = /\p{Bidi_Mirrored}/u;

/**
 * Strong bidi types, approximated from Script rather than Bidi_Class.
 *
 * ECMAScript exposes `\p{Bidi_Mirrored}` and `\p{Bidi_Control}` but NOT `\p{Bidi_Class=…}`
 * — the latter is a syntax error, not a falsy test, so there is no runtime feature check to
 * make. The approximation is therefore deliberate and its edges are stated: letters of the
 * RTL scripts are treated as R (Bidi_Class R or AL), all other letters as L. It is exact for
 * every script either host renders and it is wrong only for unencoded corner cases that no
 * measured corpus contains — the honest form of a limit, per the 4k precedent.
 */
const RTL_LETTER = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}\p{Script=Thaana}\p{Script=Nko}\p{Script=Samaritan}\p{Script=Mandaic}]/u;
const LETTER = /\p{L}/u;
const DIGIT = /\p{Nd}/u;

/**
 * A DIGIT RUN IS A FLANK, AND THIS IS THE MEASURED CHOICE THE ADR DOES NOT STATE.
 *
 * ADR-10 §2 records that adventureastro's four mirrored nodes all "span a direction change"
 * — but those four nodes are the phone `(435) 219-9447`, which contains no strong character
 * at all. If digits were transparent, both flanks of its `(` would fall through to the
 * paragraph direction, the two would be equal, and the ADR's four would be zero. Measured
 * both ways before choosing: transparent digits give 0, digits-as-flank give 4, and 4 is
 * what the ADR recorded.
 *
 * It is also right by the algorithm rather than merely by fit. In an RTL paragraph rule I2
 * raises EN and AN to an even (left-to-right) level, exactly as it does L. A digit run is an
 * LTR island in RTL text, so a bracket between Arabic and a digit run genuinely stands at a
 * direction change — which is precisely what a reader sees when the area code of a phone
 * number moves to the far end of the line.
 */
const FLANK_N = 'N';

/** Strong type of one character for N1/N2 purposes. `null` = transparent, keep scanning. */
function flankType(ch) {
  if (RTL_LETTER.test(ch)) return 'R';
  if (LETTER.test(ch)) return 'L';
  if (DIGIT.test(ch)) return FLANK_N;
  return null;
}

const BLOCK = new Set((
  'p div section article aside header footer nav main figure figcaption blockquote pre ' +
  'ul ol li dl dt dd table thead tbody tfoot tr td th h1 h2 h3 h4 h5 h6 form fieldset ' +
  'legend address details summary option title body html'
).split(' '));

/**
 * Void elements never open a scope. `br` is deliberately absent from BLOCK and present
 * here: it interrupts a line, not a bidi paragraph — UAX #9 paragraphs are delimited by
 * block boundaries, and treating `<br>` as one would sever an address across its own line
 * break and manufacture two edge cases out of one correct run.
 */
const VOID = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));

const decodeText = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (m, h) => { try { return String.fromCodePoint(parseInt(h, 16)); } catch { return m; } })
  .replace(/&#(\d+);/g, (m, d) => { try { return String.fromCodePoint(parseInt(d, 10)); } catch { return m; } })
  .replace(/&([a-z]+);/gi, (m, e) => NAMED_ENTITIES[e.toLowerCase()] ?? m);

/** The `dir` attribute of an opening tag's attribute string, folded, or `null`. */
function dirOf(attrs) {
  const m = /\bdir\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>=`]+))/i.exec(attrs);
  if (!m) return null;
  return (m[1] ?? m[2] ?? m[3]).trim().toLowerCase();
}

/**
 * Resolve `dir="auto"` the way HTML does: the first strong character decides, and if there
 * is none the directionality is `ltr`.
 *
 * This is load-bearing for B-2's own fix and worth stating where it is relied on. `<bdi>`
 * defaults to `auto`, and `(435) 219-9447` contains no strong character — so the isolated
 * phone resolves to `ltr` and renders as written. Had the no-strong-character case fallen
 * back to the parent's direction instead, `<bdi>` alone would not have fixed the header
 * phone and B-2 would have needed an explicit `dir="ltr"`.
 */
function resolveAuto(text) {
  for (const ch of text) {
    if (RTL_LETTER.test(ch)) return 'rtl';
    if (LETTER.test(ch)) return 'ltr';
  }
  return 'ltr';
}

/**
 * Decompose a document into BIDI SCOPES.
 *
 * A scope is the text of one block-level element with every isolated subtree lifted out and
 * replaced by a single neutral placeholder — which is what an isolated run is to the text
 * around it (UAX #9: an isolate contributes one neutral to its context). Isolated subtrees
 * become scopes of their own, flagged `isolated`, so a consumer can count them without
 * blaming them.
 *
 * Isolation is detected STRUCTURALLY, per ADR-10 §5: `<bdi>`, `<bdo>`, and any element
 * carrying a `dir` attribute — which the HTML rendering spec gives `unicode-bidi: isolate`.
 * The gate must not care whether the isolation arrived from `Bidi.astro`, a string helper or
 * hand-authored markup, and this is where that indifference is implemented.
 *
 * @param {string} html            One rendered page.
 * @param {{baseDirection: 'ltr'|'rtl'}} options  The document's effective direction, which
 *   the caller resolves from the host registry. This module never guesses it: an assumed
 *   direction is the defect gate 4k exists to catch, one layer down.
 */
export function bidiScopes(html, { baseDirection }) {
  if (baseDirection !== 'ltr' && baseDirection !== 'rtl') {
    throw new TypeError(`bidiScopes requires an explicit baseDirection ('ltr' | 'rtl'), received ${JSON.stringify(baseDirection)} — direction is a host fact and this module must not invent one`);
  }
  const source = stripNonRendered(html);
  const scopes = [];
  // The root frame is never popped, so the walker cannot underflow on malformed markup —
  // and rendered output from a template engine is exactly where a stray `</div>` shows up.
  const stack = [{ tag: ':root', isolated: false, base: baseDirection, parts: [] }];
  const top = () => stack[stack.length - 1];
  const emitText = (s) => { if (s) top().parts.push({ text: s }); };

  const re = /<![^>]*>|<(\/?)([a-zA-Z][^\s/>]*)((?:[^>"']|"[^"]*"|'[^']*')*)\/?>/g;
  let last = 0;
  let m;

  while ((m = re.exec(source))) {
    emitText(decodeText(source.slice(last, m.index)));
    last = re.lastIndex;
    if (m[0].startsWith('<!')) continue;

    const [, slash, tagRaw, attrs] = m;
    const tag = tagRaw.toLowerCase();
    if (VOID.has(tag) || m[0].endsWith('/>')) continue;
    const dir = slash ? null : dirOf(attrs ?? '');

    if (!slash) {
      if (BLOCK.has(tag)) {
        // A block boundary ends one bidi paragraph and starts another. The BARRIER is what
        // keeps the parent's text before and after this block from becoming neighbours: a
        // flank scan stops there and yields the base direction, which is what sot/eot means.
        top().parts.push({ barrier: true });
        stack.push({
          tag,
          isolated: false,
          base: dir === 'ltr' || dir === 'rtl' ? dir : dir === 'auto' ? null : top().base,
          parts: [],
        });
      } else if (tag === 'bdi' || tag === 'bdo' || dir !== null) {
        top().parts.push({ placeholder: true });
        stack.push({
          tag,
          isolated: true,
          base: dir === 'ltr' || dir === 'rtl' ? dir : null, // null = auto, resolved on close
          parts: [],
        });
      }
    } else {
      for (let i = stack.length - 1; i > 0; i--) {
        if (stack[i].tag === tag) {
          while (stack.length - 1 >= i) scopes.push(stack.pop());
          if (BLOCK.has(tag)) top().parts.push({ barrier: true });
          break;
        }
      }
    }
  }
  emitText(decodeText(source.slice(last)));
  while (stack.length) scopes.push(stack.pop());

  for (const s of scopes) {
    if (s.base === null) s.base = resolveAuto(s.parts.map((p) => p.text ?? '').join(''));
  }
  return scopes.filter((s) => s.parts.some((p) => p.text && p.text.trim()));
}

/**
 * THE TWO RULES.
 *
 * Both take the same flattened scope and answer, per mirrored character, "is this a
 * finding?". They differ in exactly one predicate, which is the point: the difference is
 * legible as one function each rather than as a flag inside one function that a later
 * simplification could quietly invert.
 */
export const RULES = Object.freeze({
  /**
   * ACCEPTED — ADR-10. A mirrored character is a finding when its flanking strong types
   * DIFFER. Derived from UAX #9 N1/N2: a neutral run flanked by the same strong type
   * resolves to that type and is correct by construction (N1); otherwise it resolves to the
   * paragraph direction (N2), which is the hazard, and a mirrored glyph makes it visible.
   */
  flanking: {
    id: 'flanking',
    label: 'ADR-10 — mirrored character whose flanking strong types differ',
    isFinding: ({ left, right }) => left !== right,
  },

  /**
   * REJECTED — kept executable so the accepted rule can be proven to be the specified one.
   *
   * "No mirrored character outside an isolated run." Measured on parkingwayastro it flags
   * 53 correct runs out of 75 — an all-Latin address `…Fiumicino (RM), Italia`, Arabic
   * parentheses around Arabic content — roughly 70% false positives. A blocking gate with
   * that signal-to-noise ratio acquires a suppression list, then an exemption config, then
   * `--no-verify`. Never call this from a gate.
   */
  coarse: {
    id: 'coarse',
    label: 'REJECTED — any mirrored character outside an isolated run',
    isFinding: () => true,
  },
});

/**
 * Classify the mirrored characters of one scope, grouped by TEXT NODE.
 *
 * The unit of a finding is the text node — that is what an author edits and what ADR-10 §2
 * counted — but the flank scan runs across the whole scope, because a node's neighbours are
 * what decide its flanking types. A node ending in `Fiumicino (RM)` is correct only because
 * `, Italia` follows it in the same paragraph, and a scan that stopped at the node boundary
 * would call it a defect.
 *
 * At a scope edge the scan yields the scope's base direction — sot/eot in UAX #9 terms.
 */
export function classifyScope(scope, { rule = RULES.flanking } = {}) {
  const TEXT = 0, ISOLATE = -1, BARRIER = -2;
  const chars = [];
  const owner = [];
  scope.parts.forEach((part, index) => {
    if (part.barrier) { chars.push(' '); owner.push(BARRIER); return; }
    // An isolated subtree contributes ONE neutral to the text around it (UAX #9), so it is
    // transparent to a flank scan rather than opaque: `Arabic <bdi>x</bdi> (RM)` flanks the
    // bracket with what surrounds the isolate, which is what a reader sees.
    const text = part.placeholder ? '￼' : part.text;
    for (const ch of text) { chars.push(ch); owner.push(part.placeholder ? ISOLATE : index + TEXT); }
  });

  const edge = scope.base === 'rtl' ? 'R' : 'L';
  const scan = (from, step) => {
    for (let i = from; i >= 0 && i < chars.length; i += step) {
      if (owner[i] === BARRIER) break; // a block boundary is sot/eot, not a neighbour
      const t = flankType(chars[i]);
      if (t) return t;
    }
    return edge;
  };

  const byNode = new Map();
  for (let i = 0; i < chars.length; i++) {
    if (owner[i] < 0 || !MIRRORED.test(chars[i])) continue;
    const left = scan(i - 1, -1);
    const right = scan(i + 1, +1);
    let node = byNode.get(owner[i]);
    if (!node) {
      byNode.set(owner[i], (node = {
        isolated: scope.isolated,
        base: scope.base,
        tag: scope.tag,
        mirrored: 0,
        findings: [],
        text: scope.parts[owner[i]].text,
      }));
    }
    node.mirrored++;
    if (rule.isFinding({ left, right, char: chars[i] })) {
      node.findings.push({
        char: chars[i],
        left,
        right,
        context: chars.slice(Math.max(0, i - 40), i + 40).join('').replace(/\s+/g, ' ').trim(),
      });
    }
  }
  return [...byNode.values()];
}

/**
 * Every mirrored-character text node in a page, classified.
 *
 * Returns nodes both isolated and bare. Deciding what to do with each is the caller's:
 * ADR-10's invariant blocks only outside an isolated run, and the isolated ones are worth
 * counting because "0 findings" and "0 mirrored characters anywhere" print identically
 * otherwise, and only one of them means isolation is working.
 */
export function classifyPage(html, { baseDirection, rule = RULES.flanking }) {
  const out = [];
  for (const scope of bidiScopes(html, { baseDirection })) {
    for (const node of classifyScope(scope, { rule })) out.push(node);
  }
  return out;
}
