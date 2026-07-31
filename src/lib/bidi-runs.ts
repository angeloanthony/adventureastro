// src/lib/bidi-runs.ts — recognizing the site's named runs inside prose (AR-2 B-15).
//
// THE PROBLEM THIS SOLVES. `src/lib/bidi.ts` isolates a run it is HANDED. That works
// wherever a caller already holds the run as its own value — `SITE.phoneDisplay` in
// `Header.astro`, the five literals in `cancellation.ts`. It does not work for `faq[].a`,
// which arrives as one opaque translated sentence with a phone number somewhere inside it.
// E-1 measured what that costs: gate 4n exited 1 on the Arabic FAQ answer and the only
// remedy available was to delete the sentence.
//
// So this module answers one question and hands the result to the formatter: WHERE, inside
// this prose, are the runs the site owns?
//
// ---------------------------------------------------------------------------
// WHY THIS IS NOT THE GENERIC SCANNER B-2 REFUSED
// ---------------------------------------------------------------------------
//
// B-2 declined to export a generic `isolate(anyLatinRun)` because a caller holding one will
// make its own isolation decisions and the policy leaks out a convenience at a time. That
// refusal is intact here, and the line it draws is worth stating precisely, because a
// scanner that crossed it would look almost identical:
//
//   THIS MODULE RECOGNIZES        a phone number; a currency amount
//   IT WILL NEVER RECOGNIZE       "a Latin-looking run"; "a parenthetical"
//
// The second list is not a matter of effort — it is undecidable at this layer. A
// parenthesis in Arabic prose needs isolation only when what it encloses resolves to the
// opposite direction: `(Green River views)` does, `(تضاريس رملية)` does not, and no pattern
// separates them without reimplementing UAX #9 — which is the analysis gate 4n already
// performs, correctly, on the rendered DOM. Anything this module cannot name stays gate
// business, and B-15's decision doc §6 records that residual rather than papering over it.
//
// THE TWO RECOGNIZERS ARE NOT THE SAME KIND OF THING, DELIBERATELY.
//
//   · The phone is matched as an exact LITERAL, read from `SITE.phoneDisplay`. There is one
//     phone number, the site owns it, and policy §3.2 requires it verbatim. A pattern here
//     would be a pattern with one possible match.
//   · Currency is matched by SHAPE, `$` + digits, because the hazard is a property of the
//     shape and not of the amount. E-1b measured `$349` and `$125` rendering as `349$` and
//     `125$`; a `$50` written next year fails the same way, and NOTHING WOULD CATCH IT — `$`
//     is `Bidi_Mirrored=No`, so 4n is silent by design. Restricting this to the two prices
//     in `SITE.pricing` would leave a defect class open in exchange for nothing.
//
// That second point is the whole reason `currencyDisplay` exists in `bidi.ts` as a semantic
// helper rather than a list of amounts, and this module matches its subject rather than
// narrowing it.

import { SITE } from '../config/site';

/** A slice of prose: plain text, or a named run that the formatter should isolate. */
export interface ProseRun {
  text: string;
  /** Absent for plain text. Present — and the run is isolated — for a recognized run. */
  run?: 'phone' | 'currency';
}

/** Escape a literal for use inside a RegExp. The phone number is nothing but metacharacters. */
function literal(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * The recognizers, in one alternation so a single pass cannot produce overlapping matches.
 *
 * Order is phone-before-currency and it does not matter today (the two shapes share no
 * character), but a single combined pattern is what makes that guarantee structural rather
 * than something a future third recognizer could quietly break.
 */
const NAMED_RUN = new RegExp(
  `(${literal(SITE.phoneDisplay)})|(\\$\\d[\\d,]*(?:\\.\\d+)?)`,
  'g',
);

/**
 * Split prose into plain-text and named-run slices.
 *
 * THE STRING IS NEVER REWRITTEN. Slices are cut from the input and nothing is inserted,
 * substituted or normalized, so concatenating `.text` in order reproduces the input exactly
 * — which is what keeps policy §3.2's "verbatim, symbol-first" true of the rendered result
 * and not merely of the source. The unit test for this module asserts that round-trip.
 *
 * Empty slices are dropped so the caller never emits an empty text node.
 */
export function splitNamedRuns(prose: string): ProseRun[] {
  const parts: ProseRun[] = [];
  let cursor = 0;

  for (const match of prose.matchAll(NAMED_RUN)) {
    const start = match.index;
    if (start > cursor) parts.push({ text: prose.slice(cursor, start) });
    parts.push({ text: match[0], run: match[1] !== undefined ? 'phone' : 'currency' });
    cursor = start + match[0].length;
  }

  if (cursor < prose.length) parts.push({ text: prose.slice(cursor) });
  return parts;
}
