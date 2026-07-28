// src/lib/bidi.ts — the shared bidi formatter (AR-2 B-2, Phase A).
//
// THE ONE INVARIANT. This module owns bidi isolation. No component, layout, page or
// `page-content` block inserts `<bdi>`, `<bdo>`, or any of U+200E LRM, U+200F RLM,
// U+2066 LRI, U+2067 RLI, U+2068 FSI, U+2069 PDI directly. If a caller needs a run
// isolated, it asks for the run by name and receives it isolated.
//
// PHASE A IS A NO-OP. This module ships with no callers. Introducing the authority and
// migrating to it are separate commits so that neither is the one that both changes the
// contract and moves 620 pages — the B-0 ordering, applied again.
//
// ---------------------------------------------------------------------------
// WHY THIS EXISTS, IN MEASURED NUMBERS RATHER THAN PRINCIPLE
// ---------------------------------------------------------------------------
//
// AR-1 isolated three kinds of run by hand on the Arabic pilot page and measured ZERO
// isolation anywhere else in the repository. B-2 re-measured both corpora before writing
// a line, and the interesting result was how much NARROWER the real hazard is than
// "Latin text inside Arabic prose":
//
//                                        adventureastro    parkingwayastro
//                                        (1 Arabic page)   (12 Arabic pages)
//     <bdi> already present                    5                  0
//     text nodes with a MIRRORED char          2                 75
//     runs with an EDGE neutral                0                  0
//     bare Western numbers                    11                 90    <- NOT a hazard
//
// Three findings are load-bearing and none of them is obvious:
//
//   1. A BARE WESTERN NUMBER IN ARABIC PROSE IS FINE. `72 ساعة` needs nothing. UBA rule
//      W2 retypes EN as AN after an Arabic strong type, and AN renders left-to-right just
//      as EN does. Isolating all 101 of them across the two corpora would have been pure
//      byte churn on nine locales. This is AR-1's own §0.1 lesson — derive it from the
//      Unicode property, not from "it looks Latin" — applied to a different question, and
//      it is the reason this module has no generic `isolate(anyLatinRun)`.
//
//   2. AN INTERIOR SPACE IS NOT A HAZARD EITHER. `Adventure Tours Vernal` has two of them
//      and needs none: UBA rule N1 resolves a neutral run flanked by the same strong type
//      to that type. The hazard is rule N2 — a neutral that touches the paragraph
//      direction on one side — and mirrored characters, which flip regardless.
//
//   3. THE HAZARD IS A PROPERTY OF THE DOCUMENT, NOT OF THE TEXT NODE. The two runs still
//      bare on the pilot page are in the header and the footer, and their text nodes
//      contain NO ARABIC AT ALL — `📞 (435) 219-9447` is pure Latin. They are broken
//      anyway, because `<html dir="rtl">` makes RTL the paragraph direction for every text
//      node on the page, and U+0028/U+0029 are Bidi_Mirrored=Yes. A census that looked for
//      Latin *next to Arabic* would have missed both, which is exactly what the first
//      pass of this census did.
//
// So the shipped hazard set is small and enumerable: **mirrored characters, and neutrals
// at a run's edge.** Everything in this module exists to serve a run that has one.
//
// ---------------------------------------------------------------------------
// WHY `<bdi>` AND NOT A CONTROL CHARACTER
// ---------------------------------------------------------------------------
//
// AR-1 recorded the reason and it is adopted here unchanged: `<bdi>` is visible in a diff,
// greppable, and cannot be silently dropped by an editor or a translation tool. U+200F is
// none of those things. `<bdi>` is also a no-op in an LTR context, which is what makes
// Phase B's migration safe for the other eight locales — it changes their bytes and not
// their rendering.
//
// The known limit is `<title>`, which accepts text and no elements, so markup isolation is
// impossible there. B-2 does not solve it, does not reach for a control character to solve
// it, and does not pretend the problem is absent — see §4 of the phase doc. A helper that
// silently emitted U+200F for that one case would put an invisible character in the corpus
// through the very module that exists to keep isolation visible.
//
// ---------------------------------------------------------------------------
// WHAT THIS MODULE IS NOT
// ---------------------------------------------------------------------------
//
// Not a translation layer, not a number formatter, and not a locale-aware anything. It
// takes an already-final string and decides one question: does this run need to be its own
// bidi-isolated sequence? Numbering systems (B-10), numeral policy, `Intl` tags (B-3) and
// glyph mirroring (B-6) are all separate concerns with separate owners, and folding any of
// them in here would make a bidi primitive locale-aware for the first time — which is a
// declared stop condition for this phase, not a feature.

/**
 * The isolation mechanism, named once.
 *
 * Everything that isolates in this repository resolves the element name from here,
 * including the `.astro` delivery surface, so "how isolation is expressed" has exactly one
 * definition and swapping it is one edit rather than a corpus sweep.
 */
export const ISOLATION_ELEMENT = 'bdi' as const;

/** The characters this module refuses to emit. Callers must not emit them either. */
export const FORBIDDEN_CONTROLS = Object.freeze([
  '‎', // LRM
  '‏', // RLM
  '⁦', // LRI
  '⁧', // RLI
  '⁨', // FSI
  '⁩', // PDI
]);

/**
 * Wrap a run so it forms its own bidi-isolated sequence.
 *
 * Deliberately NOT exported. A caller that can reach a generic `isolate()` will use it to
 * make its own isolation decisions, and the policy this module owns leaks back out one
 * convenience at a time — the same failure the host adapter documents for returning paths
 * instead of answers. Callers ask for a phone number, a price or a brand; the decision that
 * those need isolating is made here.
 */
function isolate(value: string): string {
  return `<${ISOLATION_ELEMENT}>${value}</${ISOLATION_ELEMENT}>`;
}

/**
 * A phone number as displayed.
 *
 * THE WORST CASE ON THIS SITE, and the reason the module exists. `(435) 219-9447` carries
 * two Bidi_Mirrored characters, so in an RTL paragraph the brackets render reversed and the
 * neutral runs between the digit groups resolve against paragraph direction. Measured bare
 * twice on the pilot page — header and footer — and shipped bare across ParkingWay's whole
 * Arabic tree.
 */
export function phoneDisplay(value: string): string {
  return isolate(value);
}

/**
 * A currency amount as displayed.
 *
 * `$1,000` leads with U+0024, bidi class ET. Adjacent to the paragraph rather than to
 * another strong character, N2 resolves it to paragraph direction and the symbol moves to
 * the wrong side of its digits. AR-1 isolated the two occurrences on the pilot page by
 * hand; this is that decision, lifted.
 */
export function currencyDisplay(value: string): string {
  return isolate(value);
}

/**
 * A Latin brand or proper-noun run inside localized prose.
 *
 * The weakest of the three, and it is exported with its limit stated rather than a blanket
 * claim: an interior space is NOT a hazard (rule N1), so `Adventure Tours Vernal` standing
 * alone in Arabic prose needs nothing. It needs isolation at a CLAUSE BOUNDARY, where a
 * following Arabic comma or bracket would otherwise reorder against it — which is the one
 * place AR-1 applied it, once, deliberately.
 *
 * Callers should therefore not reach for this by default. It is the helper most likely to
 * be over-applied, and over-application is not harmless: it is byte churn on nine locales
 * in exchange for nothing.
 */
export function brandRun(value: string): string {
  return isolate(value);
}
