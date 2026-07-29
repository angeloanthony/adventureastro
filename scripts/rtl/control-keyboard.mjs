// scripts/rtl/control-keyboard.mjs — the positive control for the behavioural
// probe (AR-2 B-5b, first milestone).
//
// THE RULE THIS EXISTS TO SATISFY. A negative behavioural observation is only
// meaningful after the measurement path has been shown capable of producing a
// positive behavioural observation under comparable conditions. B-7 applied
// this one layer down: it disproved its ownership harness before trusting any
// "this declaration is dead" result, and that discipline is what caught
// `.policy-list ul` — the finding the phase argued most confidently. B-5b will
// ask four questions whose interesting answer is "nothing happened":
//
//     the carousel does not respond to ArrowLeft in Arabic
//     the swipe does not reverse
//
// Both of those read *identically* to a dead input path. So the input path gets
// disproved first, and nothing in B-5b may cite a negative until this exits 0.
//
// WHY ArrowLeft AND NOT ArrowRight. The carousel autoplays — home.ts:71,
// `setInterval(() => this.nextSlide(), 5000)`. The obvious control ("dispatch a
// key, observe the slide changed") is therefore satisfied by elapsed time alone:
// it would pass green over a completely dead input path if the read landed one
// tick late. The confound has a fixed sign — autoplay only ever calls
// `nextSlide()`, never `prevSlide()` — so the control presses the key that moves
// the carousel in the direction autoplay cannot produce. home.ts:42 establishes
// `ArrowLeft -> prevSlide()` in the LTR source, so the expected index is known
// before the measurement, not chosen after it. A decrement is attributable to
// the keyboard path and to nothing else on the page.
//
// That turns the page's own behaviour into part of the oracle instead of
// something the probe has to disable — which matters, because disabling it
// would mean mutating the page under test.
//
// WHY THE HOMEPAGE AND NOT /utv/. A control has to exercise the capability
// being validated. utv.ts has the transform (utv.ts:27) but no keydown handler
// and no touch handlers; a null result there cannot distinguish "probe failed"
// from "feature absent". The homepage carousel is the only one of the two with
// the keyboard path, so it is the only valid control target.
//
// WHY AN LTR PAGE IN AN ARABIC PHASE. A control must run where the expected
// answer is already known. `/` is the reference implementation; `/ar/…` is the
// unknown. Measuring the unknown with an unvalidated instrument is the mistake
// this file exists to prevent.
//
// THREE STEPS, IN THIS ORDER — AND THE ORDER IS THE DESIGN:
//   1. AUTONOMY  wait out one autoplay tick with NO input at all, and confirm it
//                advances by exactly +1. This measures the confound instead of
//                assuming it, which is what makes step 3's sign argument
//                evidence rather than assertion.
//                It is also the SYNCHRONISATION POINT. `updateCarousel` holds a
//                500ms `isTransitioning` lock (home.ts:61-66) during which a
//                keypress mutates `currentIndex` and writes nothing to the DOM
//                — a real keypress, correctly handled, with no observable
//                effect. Dispatching blind risks landing in that lock and
//                producing exactly the false negative this file exists to
//                prevent. Synchronising to the tick buys a provably lock-free
//                runway of one full autoplay period.
//   2. NULL      inside that runway, dispatch an inert key (F7). The observable
//                must NOT move. Rules out an observable that twitches on any
//                dispatch, and confirms the window is quiet.
//   3. POSITIVE  still inside the runway, dispatch ArrowLeft. The observable
//                MUST move, to the predicted index, in the direction autoplay
//                cannot produce.
//
// OBSERVABLE STATE, NOT DISPATCH ACCEPTANCE. CDP returns success for
// `Input.dispatchKeyEvent` whether or not anything listens. Every assertion
// here is on DOM state the page had to compute — the active slide class, the
// active indicator class, and the inline transform the handler writes.
//
// Read-only: no file in the tree is modified, and nothing is injected into the
// page.
//
// THREE EXIT CODES, BECAUSE TWO WOULD REPRODUCE THE AMBIGUITY. `0` validated.
// `1` the control ran and an assertion failed — the input path is suspect.
// `2` the instrument itself did not complete (browser did not start, page did
// not load, no autoplay tick to synchronise on). Collapsing 2 into 1 would mean
// a harness problem and a behavioural finding are the same signal, which is the
// confusion this whole file is written against. One run in an early batch of 15
// exited non-zero with its output discarded, and could not be attributed after
// the fact; that is why the codes are separated now rather than later.

import { setTimeout as sleep } from 'node:timers/promises';

import { openProbe } from './probe.mjs';

// `--falsify` presses a key with no handler (ArrowUp) through the identical
// measurement path and expects the control to go RED. A positive control that
// cannot fail is decoration: it would exit 0 over a dead input path, which is
// the failure mode it was written to detect. This mode passes only if the two
// input-dependent steps fail and every environment step still passes — i.e. the
// red is caused by the absent handler and nothing else. Same shape as the 4n
// differential: the check on the check ships alongside it.
const FALSIFY = process.argv.includes('--falsify');
const LIVE_KEY = 'ArrowLeft';   // home.ts:42 -> prevSlide()
const DEAD_KEY = 'ArrowUp';     // no handler anywhere in the carousel
const PRESS = FALSIFY ? DEAD_KEY : LIVE_KEY;

const TARGET = '/';
const AUTOPLAY_MS = 5000;   // home.ts:71
const TRANSITION_MS = 500;  // home.ts:66, the isTransitioning lock

// Everything the page must compute for itself. `transform` is the inline style
// the handler writes, so it is empty until the first update — which is itself
// part of the expected initial state.
const STATE = `(() => {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
  const track = document.querySelector('.carousel-track');
  return {
    slides: slides.length,
    indicators: indicators.length,
    activeSlide: slides.findIndex((s) => s.classList.contains('active')),
    activeIndicator: indicators.findIndex((i) => i.classList.contains('active')),
    transform: track ? track.style.transform : null,
  };
})()`;

const results = [];
let failed = false;
let falsified = false;

function record(step, ok, detail) {
  results.push({ step, ok, detail });
  if (!ok) failed = true;
}

/** Poll `STATE` until `activeSlide` differs from `from`, or the window closes. */
async function watchForMove(probe, from, windowMs) {
  const started = performance.now();
  for (;;) {
    const state = await probe.evaluate(STATE);
    if (state.activeSlide !== from) {
      return { moved: true, state, elapsed: Math.round(performance.now() - started) };
    }
    if (performance.now() - started >= windowMs) {
      return { moved: false, state, elapsed: Math.round(performance.now() - started) };
    }
  }
}

let probe;
let instrumentError = null;
try {
  probe = await openProbe();
  process.stdout.write('B-5b control — keyboard path, homepage carousel\n\n');
  await probe.goto(TARGET);

  // Readiness is a JS-executed signal by construction: createIndicators()
  // appends one button per slide, so an indicator count matching the slide
  // count proves the Carousel constructed and ran. A DOM-presence check on
  // `.carousel-track` would only prove the HTML shipped.
  await probe.waitFor(`(() => {
    const s = document.querySelectorAll('.carousel-slide').length;
    const i = document.querySelectorAll('.carousel-indicator').length;
    return s > 0 && s === i;
  })()`);

  const initial = await probe.evaluate(STATE);
  const n = initial.slides;
  process.stdout.write(
    `  target       ${probe.origin}${TARGET}\n` +
    `  slides       ${n} (${initial.indicators} indicators, JS-created)\n` +
    `  initial      activeSlide=${initial.activeSlide} activeIndicator=${initial.activeIndicator} ` +
    `transform=${JSON.stringify(initial.transform)}\n\n`
  );

  // -- 1. AUTONOMY, and the synchronisation point -------------------------
  // No input at all. Establishes that the confound is real, that its sign is
  // +1, and — by landing on a known tick — that the 500ms transition lock is
  // released before any key is dispatched.
  const idle = await watchForMove(probe, initial.activeSlide, AUTOPLAY_MS + 2000);
  const advance = idle.moved ? (idle.state.activeSlide - initial.activeSlide + n) % n : null;
  record('autonomy (autoplay is +1, unprompted)', idle.moved && advance === 1,
    idle.moved
      ? `unprompted ${initial.activeSlide} -> ${idle.state.activeSlide} (+${advance}) after ${idle.elapsed}ms — the confound is real and its sign is opposite to the control's`
      : `no unprompted advance in ${idle.elapsed}ms; autoplay is not running, so the sign argument below is untested and the runway is not bounded`);
  if (!idle.moved) throw new Error('cannot synchronise: no autoplay tick observed');

  const syncAt = performance.now();
  await sleep(TRANSITION_MS + 100); // let the transition lock release

  // -- 2. NULL ------------------------------------------------------------
  // An inert key, inside the lock-free runway. CDP reports this dispatch as
  // successful too; that is the point. If the observable moves here, it is not
  // measuring the input path.
  const beforeNull = await probe.evaluate(STATE);
  await probe.key('F7');
  const nul = await watchForMove(probe, beforeNull.activeSlide, 400);
  record('null (F7 inert)', !nul.moved,
    nul.moved
      ? `observable moved without a live handler: ${beforeNull.activeSlide} -> ${nul.state.activeSlide} in ${nul.elapsed}ms`
      : `no movement in ${nul.elapsed}ms — the observable is not dispatch-twitchy`);

  // -- 3. POSITIVE --------------------------------------------------------
  // Read immediately before dispatching so the prediction is relative to the
  // state that actually obtained, not to the state at load.
  const before = await probe.evaluate(STATE);
  const predicted = (before.activeSlide - 1 + n) % n;
  await probe.key(PRESS);
  const pos = await watchForMove(probe, before.activeSlide, 1000);

  // The runway: everything above must have happened inside one autoplay period
  // minus the lock, or the reading is not attributable to the key.
  const sinceSync = Math.round(performance.now() - syncAt);
  record('runway integrity', sinceSync < AUTOPLAY_MS - TRANSITION_MS,
    `key dispatched and observed ${sinceSync}ms after the synchronising tick ` +
    `(budget ${AUTOPLAY_MS - TRANSITION_MS}ms) — no autoplay tick could have held the transition lock`);

  // `translateX(-0%)` is what the handler writes at index 0; the browser
  // normalises the inline value to `translateX(0%)`. Compare the number, not
  // the string — a control that fails on serialisation is measuring the wrong
  // thing.
  const wrote = pos.moved && /^translateX\((-?[\d.]+)%\)$/.exec(pos.state.transform ?? '');
  const transformOk = Boolean(wrote) && Number(wrote[1]) === -(predicted * 100);
  const indexOk = pos.moved && pos.state.activeSlide === predicted;
  const indicatorOk = pos.moved && pos.state.activeIndicator === predicted;

  record(`positive (${PRESS} -> prevSlide)`, indexOk && indicatorOk && transformOk,
    !pos.moved
      ? `NO MOVEMENT in ${pos.elapsed}ms. The input path is dead or unreachable — every B-5b negative would be uninterpretable until this passes.`
      : `activeSlide ${before.activeSlide} -> ${pos.state.activeSlide} (predicted ${predicted}), ` +
        `indicator ${pos.state.activeIndicator}, transform ${JSON.stringify(pos.state.transform)} ` +
        `(expected ${-(predicted * 100)}%), in ${pos.elapsed}ms`);

  // The discriminator, stated as its own line so it cannot be lost in the noise.
  const decrement = pos.moved && pos.state.activeSlide === predicted && predicted !== (before.activeSlide + 1) % n;
  record('attribution (decrement, not elapsed time)', decrement,
    decrement
      ? `observed -1 (mod ${n}) ${pos.elapsed}ms after dispatch, inside a measured lock-free runway; autoplay produces +1 only, so no amount of elapsed time explains this reading`
      : `observed index is consistent with an autoplay advance; the control cannot attribute the move to input`);

  process.stdout.write('\n');
  for (const r of results) {
    process.stdout.write(`  ${r.ok ? 'PASS' : 'FAIL'}  ${r.step}\n        ${r.detail}\n`);
  }
  if (FALSIFY) {
    // Expected shape: the two input-dependent steps red, every environment step
    // green. Anything else means the red came from somewhere other than the
    // absent handler, which would prove nothing about the control's sensitivity.
    const isInputStep = (r) => /^positive|^attribution/.test(r.step);
    const inputRed = results.filter(isInputStep).every((r) => !r.ok);
    const envGreen = results.filter((r) => !isInputStep(r)).every((r) => r.ok);
    falsified = inputRed && envGreen;
    process.stdout.write(
      falsified
        ? `\nFALSIFICATION PASSED — pressing ${DEAD_KEY} (no handler) turns the control RED on exactly\nthe two input-dependent steps while every environment step stays green. The control is\nsensitive to the thing it claims to measure, so its green is worth something.\n`
        : `\nFALSIFICATION FAILED — pressing ${DEAD_KEY} did not produce the expected red-on-input,\ngreen-on-environment shape. The control's green cannot be trusted.\n`
    );
  } else {
    process.stdout.write(
      failed
        ? '\nCONTROL FAILED — the probe has not been shown capable of observing a keyboard-driven\nbehavioural change. No B-5b negative result may be cited until this exits 0.\n'
        : '\nCONTROL PASSED — the probe observes a keyboard-driven behavioural change on a known-good\nLTR carousel, attributable to input rather than to elapsed time. B-5b may now measure /ar/.\n'
    );
  }
} catch (err) {
  // Anything that prevented the control from running to a verdict: the browser
  // not starting, the page not loading, no tick to synchronise on. Never a
  // statement about the input path.
  instrumentError = err;
} finally {
  await probe?.close();
}

if (instrumentError) {
  process.stderr.write(
    `\nINSTRUMENT ERROR — the control did not reach a verdict, so it says NOTHING about\n` +
    `the input path. This is exit 2, not a control failure.\n  ${instrumentError.message}\n`
  );
  process.exit(2);
}

process.exit(FALSIFY ? (falsified ? 0 : 1) : (failed ? 1 : 0));
