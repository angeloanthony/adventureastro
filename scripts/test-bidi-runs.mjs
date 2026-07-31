// scripts/test-bidi-runs.mjs — the recognizer's proof (AR-2 B-15).
//
// WHAT IT PROVES, AND WHY THE ROUND-TRIP IS THE CENTRAL CASE. `src/lib/bidi-runs.ts`
// promises that it never rewrites the string: slices are cut from the input, nothing is
// substituted or normalized, so concatenating the parts reproduces the input EXACTLY. That
// promise is what makes policy §3.2 ("verbatim, symbol-first") true of the RENDERED result
// rather than only of the source — E-1b measured a case where source compliance and
// rendered compliance came apart, so the distinction is not pedantic here. Every case below
// asserts the round-trip in addition to whatever else it checks, including the cases that
// expect no match at all.
//
// THE NEGATIVE CASES ARE THE POINT. A recognizer is defined as much by what it declines to
// claim as by what it finds. B-15 §4.1 rejected a prose scanner because a parenthetical is
// undecidable at this layer, so the cases pinning `(تضاريس رملية)` and `(Green River views)`
// as PLAIN TEXT are not filler — they are the design decision, executable. If a later change
// makes either of them a named run, this file fails and the reviewer is sent to the reason.
//
// WHY A RESOLVE HOOK. The module under test imports `../config/site` extensionless, which
// Vite resolves and bare Node does not. The hook retries a failed specifier with `.ts` and
// touches nothing else — the alternative is duplicating the site constants into the test,
// which would let the test pass while the real recognizer read a different phone number.
//
// Run: `npm run test:bidi-runs`. Exit 0 all cases pass, 1 a case failed.

import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, next) {
    try { return next(specifier, context); } catch { return next(`${specifier}.ts`, context); }
  },
});

const { splitNamedRuns } = await import('../src/lib/bidi-runs.ts');
const { SITE } = await import('../src/config/site.ts');

const PHONE = SITE.phoneDisplay;
let failures = 0;

/** `expected` is the run sequence: each entry is `[text, run]`, `run` null for plain text. */
function check(label, input, expected) {
  const parts = splitNamedRuns(input);
  const actual = parts.map((p) => [p.text, p.run ?? null]);

  const roundTrip = parts.map((p) => p.text).join('');
  const shape = JSON.stringify(actual) === JSON.stringify(expected);

  if (roundTrip !== input) {
    failures++;
    process.stdout.write(`  ✘ ${label}\n      ROUND-TRIP BROKEN — the string was rewritten\n`);
    process.stdout.write(`      in  ${JSON.stringify(input)}\n      out ${JSON.stringify(roundTrip)}\n`);
    return;
  }
  if (!shape) {
    failures++;
    process.stdout.write(`  ✘ ${label}\n      expected ${JSON.stringify(expected)}\n      actual   ${JSON.stringify(actual)}\n`);
    return;
  }
  process.stdout.write(`  ✔ ${label}\n`);
}

process.stdout.write('\nRECOGNIZED — the runs the site owns\n');

check('the phone, mid-sentence, in Arabic prose',
  `وللاستفسار عن أسعار المجموعات، الرقم هو ${PHONE}.`,
  [['وللاستفسار عن أسعار المجموعات، الرقم هو ', null], [PHONE, 'phone'], ['.', null]]);

check('the phone read from SITE, not hardcoded here',
  PHONE,
  [[PHONE, 'phone']]);

check('a price after Arabic — the E-1b defect site',
  'تكلفة الجولة المُرشَدة هي $349 للمركبة.',
  [['تكلفة الجولة المُرشَدة هي ', null], ['$349', 'currency'], [' للمركبة.', null]]);

check('two prices in one answer',
  'هي $349 للمركبة و$125 للشخص.',
  [['هي ', null], ['$349', 'currency'], [' للمركبة و', null], ['$125', 'currency'], [' للشخص.', null]]);

check('phone and price in the same sentence',
  `$349 — ${PHONE}`,
  [['$349', 'currency'], [' — ', null], [PHONE, 'phone']]);

check('a thousands separator',
  'ما يصل إلى $1,000 لكل مجموعة.',
  [['ما يصل إلى ', null], ['$1,000', 'currency'], [' لكل مجموعة.', null]]);

check('a decimal amount',
  'رسم قدره $12.50 فقط.',
  [['رسم قدره ', null], ['$12.50', 'currency'], [' فقط.', null]]);

check('an amount NOT in SITE.pricing is still a currency run',
  'ابتداءً من $50.',
  [['ابتداءً من ', null], ['$50', 'currency'], ['.', null]]);

check('B-16 — the unit word stays outside the isolated run',
  '$349/machine',
  [['$349', 'currency'], ['/machine', null]]);

check('an English answer takes the same path — one contract, nine locales',
  `A guided tour costs $349 per machine. Call ${PHONE}.`,
  [['A guided tour costs ', null], ['$349', 'currency'], [' per machine. Call ', null], [PHONE, 'phone'], ['.', null]]);

process.stdout.write('\nDECLINED — what this layer cannot decide (B-15 §4.1)\n');

check('an Arabic parenthetical is plain text',
  'التضاريس (تضاريس رملية) مناسبة للجميع.',
  [['التضاريس (تضاريس رملية) مناسبة للجميع.', null]]);

check('a Latin parenthetical is ALSO plain text — 4n owns this, not the recognizer',
  'مسار Doc’s Beach (Green River views) هو الأكثر رواجًا.',
  [['مسار Doc’s Beach (Green River views) هو الأكثر رواجًا.', null]]);

check('a bare Latin brand run is not a named run (B-2 §1.2)',
  'تُشغّل Adventure Tours Vernal الجولات.',
  [['تُشغّل Adventure Tours Vernal الجولات.', null]]);

check('a bare Western number is not a hazard (B-2 §1.1)',
  'ومدة كل جولة 3 ساعات.',
  [['ومدة كل جولة 3 ساعات.', null]]);

check('a lone dollar sign with no digits',
  'السعر بال$ الأمريكي.',
  [['السعر بال$ الأمريكي.', null]]);

check('a phone-shaped run that is NOT the site phone',
  'اتصل بالرقم (555) 000-1111.',
  [['اتصل بالرقم (555) 000-1111.', null]]);

process.stdout.write('\nEDGES\n');

check('empty string', '', []);
check('prose with nothing to find', 'لا يوجد شيء هنا.', [['لا يوجد شيء هنا.', null]]);
check('the run is the whole string', '$349', [['$349', 'currency']]);

// The escaping question B-15 §3.1 settled: the recognizer must not treat these specially,
// because it is not an escaper. Astro escapes the text slices on the normal path.
check('HTML metacharacters pass through untouched and unrecognized',
  'AT&T <b> \'quoted\' "double" — $349',
  [['AT&T <b> \'quoted\' "double" — ', null], ['$349', 'currency']]);

check('markup written into content stays literal text, as it always did',
  '<bdi>$349</bdi>',
  [['<bdi>', null], ['$349', 'currency'], ['</bdi>', null]]);

process.stdout.write(
  failures === 0
    ? '\n✔ all cases pass — round-trip exact, recognizers and their declines pinned\n'
    : `\n✘ ${failures} case(s) failed\n`,
);
process.exit(failures === 0 ? 0 : 1);
