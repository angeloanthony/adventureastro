// scripts/rtl/control-touch.mjs — the positive control for the touch input
// path (AR-2 B-5b, third milestone).
//
// THE RULE IS control-keyboard.mjs's RULE, APPLIED TO THE INPUT PATH IT
// EXPLICITLY DECLINED TO VALIDATE. Milestone 1 validated Input.dispatchKeyEvent
// and said, in as many words, that `Input.dispatchTouchEvent` had no positive
// control and therefore could not produce citable readings. Milestone 2 honoured
// that by leaving the swipe question unmeasured. This file is the debt coming
// due: one end-to-end demonstration that a synthetic swipe travels the whole
// distance — CDP dispatch, touch emulation, the page's touchstart/touchend
// handlers, the carousel's state transition — and lands as observable DOM state.
// Nothing about swipe may be cited, in either direction, until this exits 0.
//
// END-TO-END FIRST, LAYERS ONLY ON FAILURE. The control validates the
// instrument as a whole; it does not probe CDP acceptance, event delivery or
// handler invocation separately. If it goes red, THEN descend: touch emulation
// enabled? dispatch acknowledged? handler reached (the page would need
// instrumenting)? state transitioned? Instrumenting those layers pre-emptively
// would be measuring the instrument instead of with it.
//
// WHY A RIGHTWARD SWIPE. Same argument as milestone 1's ArrowLeft, inherited
// wholesale: the carousel autoplays +1 every 5000ms (home.ts:71), so any
// forward movement is explainable by elapsed time and proves nothing about the
// input path. The swipe handler (home.ts:75-78) computes
// `diff = touchStartX - endX` and calls nextSlide() for diff > 0, prevSlide()
// for diff < 0, gated on |diff| > 50. A finger moving RIGHT therefore produces
// prevSlide() — a decrement, the one sign the confound cannot generate. The
// expected index is computed before dispatch, from the source, not chosen
// after the observation.
//
// WHY THE NULL IS A 40px SWIPE. The inert gesture is not an arbitrary
// no-handler key this time — it is the same gesture, same axis, same dispatch
// path, at a displacement below the handler's own 50px threshold. If the
// observable moves on THAT, the instrument is dispatch-twitchy or the window
// is not quiet; if it stays still, the eventual positive is attributable to
// the displacement, which is the one variable that changed.
//
// WHY THE FALSIFICATION GESTURE IS VERTICAL. `--falsify` must press the touch
// analogue of a key with no handler. The handler reads screenX and only
// screenX, so a vertical swipe is a full-amplitude, fully-delivered gesture
// that is invisible to it by construction. The control passes falsification
// only if that gesture turns exactly the input-dependent steps red while every
// environment step stays green — a control that cannot fail is decoration.
//
// WHY THE HOMEPAGE AND NOT /utv/, WHY LTR AND NOT /ar/ OR THE SUBSTITUTION:
// unchanged from milestone 1. utv.ts has no touch handlers (a null there
// cannot distinguish "probe failed" from "feature absent"), and a control runs
// where the expected answer is already known. `/` is the reference
// implementation.
//
// ONE MECHANICAL DIFFERENCE FROM THE KEYBOARD CONTROL, RECORDED BECAUSE IT IS
// A TRAP: keydown is document-addressed, touch is coordinate-addressed. The
// carousel sits below the fold at the probe's 1600x1000 viewport, so the
// control scrolls it into view and reads its box BEFORE computing gesture
// coordinates. A swipe dispatched at an off-viewport coordinate is delivered
// to whatever is at that point instead — a dead input path made out of
// geometry, indistinguishable from the real thing without this step.
//
// Read-only: no file in the tree is modified, and nothing is injected into the
// page. Exit codes as in milestone 1, for the same reason: `0` validated,
// `1` the control ran and an assertion failed, `2` the instrument itself did
// not complete — a harness problem and a behavioural finding must never share
// a signal.

import { setTimeout as sleep } from 'node:timers/promises';

import { openProbe } from './probe.mjs';

const FALSIFY = process.argv.includes('--falsify');

const TARGET = '/';
const AUTOPLAY_MS = 5000;   // home.ts:71
const TRANSITION_MS = 500;  // home.ts:66, the isTransitioning lock
const SWIPE_THRESHOLD = 50; // home.ts:78, |diff| > 50

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
  probe = await openProbe({ touch: true });
  process.stdout.write('B-5b control — touch path, homepage carousel\n\n');
  await probe.goto(TARGET);

  await probe.waitFor(`(() => {
    const s = document.querySelectorAll('.carousel-slide').length;
    const i = document.querySelectorAll('.carousel-indicator').length;
    return s > 0 && s === i;
  })()`);

  // Coordinate-addressed input: bring the carousel into the viewport, and only
  // then read the geometry the gestures are computed from. `behavior: 'instant'`
  // is load-bearing — the stylesheet sets `html { scroll-behavior: smooth }`
  // (styles.css:23), so a bare scrollIntoView ANIMATES, and a box read behind it
  // photographs the page mid-scroll: the first run of this control dispatched
  // its swipes at y=4978 in a 1000px viewport and correctly went red over
  // coordinates no element occupies. Same trap class as milestone 2's
  // mid-transition box read; the guard below makes it structural rather than
  // timing-dependent.
  await probe.evaluate(
    `document.querySelector('.carousel-track-container').scrollIntoView({ block: 'center', behavior: 'instant' })`);
  const box = await probe.waitFor(`(() => {
    const r = document.querySelector('.carousel-track-container').getBoundingClientRect();
    return r.top >= 0 && r.bottom <= innerHeight && r.width > 200
      ? { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), w: Math.round(r.width) }
      : false;
  })()`);
  const cx = (box.l + box.r) / 2;
  const cy = box.t + 200; // inside the track, clear of the edge buttons

  const initial = await probe.evaluate(STATE);
  const n = initial.slides;
  process.stdout.write(
    `  target       ${probe.origin}${TARGET}\n` +
    `  slides       ${n} (${initial.indicators} indicators, JS-created)\n` +
    `  gesture row  y=${Math.round(cy)}, centre x=${Math.round(cx)} (container ${box.l}..${box.r})\n` +
    `  initial      activeSlide=${initial.activeSlide} activeIndicator=${initial.activeIndicator} ` +
    `transform=${JSON.stringify(initial.transform)}\n\n`
  );

  // -- 1. AUTONOMY, and the synchronisation point -------------------------
  const idle = await watchForMove(probe, initial.activeSlide, AUTOPLAY_MS + 2000);
  const advance = idle.moved ? (idle.state.activeSlide - initial.activeSlide + n) % n : null;
  record('autonomy (autoplay is +1, unprompted)', idle.moved && advance === 1,
    idle.moved
      ? `unprompted ${initial.activeSlide} -> ${idle.state.activeSlide} (+${advance}) after ${idle.elapsed}ms — the confound is real and its sign is opposite to the control's`
      : `no unprompted advance in ${idle.elapsed}ms; autoplay is not running, so the sign argument below is untested and the runway is not bounded`);
  if (!idle.moved) throw new Error('cannot synchronise: no autoplay tick observed');

  let syncAt = performance.now();
  await sleep(TRANSITION_MS + 100); // let the transition lock release

  // -- 2. NULL ------------------------------------------------------------
  // Same gesture, same axis, same path — 40px, below the handler's own 50px
  // gate. Fully dispatched, fully delivered, must change nothing.
  const beforeNull = await probe.evaluate(STATE);
  await probe.swipe({ fromX: cx - 20, fromY: cy, toX: cx + 20, toY: cy });
  const nul = await watchForMove(probe, beforeNull.activeSlide, 400);
  record(`null (sub-threshold swipe, 40px < ${SWIPE_THRESHOLD}px)`, !nul.moved,
    nul.moved
      ? `observable moved on a gesture below the handler's own threshold: ${beforeNull.activeSlide} -> ${nul.state.activeSlide} in ${nul.elapsed}ms`
      : `no movement in ${nul.elapsed}ms — the observable is not dispatch-twitchy, and the window is quiet`);

  // Re-synchronise on a fresh tick before the positive step. The null step and
  // its sleeps consume most of the first runway; the first falsification run
  // proved it the hard way — its 1000ms observation window opened 4s after the
  // tick, a real autoplay advance landed inside it, and an ENVIRONMENT step
  // went red alongside the input steps, which is exactly the shape falsify
  // mode must never produce for the wrong reason. Same discipline as the
  // measurement instrument's between-keys resync.
  const resync = await watchForMove(probe, nul.state.activeSlide, AUTOPLAY_MS + 2000);
  if (!resync.moved) throw new Error('cannot re-synchronise before the positive step: no autoplay tick');
  syncAt = performance.now();
  await sleep(TRANSITION_MS + 100);

  // -- 3. POSITIVE ----------------------------------------------------------
  // Live mode: 160px rightward, diff = start - end = -160 -> prevSlide, -1.
  // Falsify mode: 150px vertical through the identical path — the handler
  // reads only screenX, so this full-amplitude gesture must change nothing.
  const before = await probe.evaluate(STATE);
  const predicted = (before.activeSlide - 1 + n) % n;
  if (FALSIFY) {
    await probe.swipe({ fromX: cx, fromY: cy - 75, toX: cx, toY: cy + 75 });
  } else {
    await probe.swipe({ fromX: cx - 80, fromY: cy, toX: cx + 80, toY: cy });
  }
  const pos = await watchForMove(probe, before.activeSlide, 1000);

  const sinceSync = Math.round(performance.now() - syncAt);
  record('runway integrity', sinceSync < AUTOPLAY_MS - TRANSITION_MS,
    `gesture dispatched and observed ${sinceSync}ms after the synchronising tick ` +
    `(budget ${AUTOPLAY_MS - TRANSITION_MS}ms) — no autoplay tick could have held the transition lock`);

  const wrote = pos.moved && /^translateX\((-?[\d.]+)%\)$/.exec(pos.state.transform ?? '');
  const transformOk = Boolean(wrote) && Number(wrote[1]) === -(predicted * 100);
  const indexOk = pos.moved && pos.state.activeSlide === predicted;
  const indicatorOk = pos.moved && pos.state.activeIndicator === predicted;

  record(`positive (${FALSIFY ? 'vertical swipe, no X-displacement' : 'rightward swipe'} -> prevSlide)`,
    indexOk && indicatorOk && transformOk,
    !pos.moved
      ? `NO MOVEMENT in ${pos.elapsed}ms. The touch path is dead or unreachable — every swipe reading would be uninterpretable until this passes.`
      : `activeSlide ${before.activeSlide} -> ${pos.state.activeSlide} (predicted ${predicted}), ` +
        `indicator ${pos.state.activeIndicator}, transform ${JSON.stringify(pos.state.transform)} ` +
        `(expected ${-(predicted * 100)}%), in ${pos.elapsed}ms`);

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
    const isInputStep = (r) => /^positive|^attribution/.test(r.step);
    const inputRed = results.filter(isInputStep).every((r) => !r.ok);
    const envGreen = results.filter((r) => !isInputStep(r)).every((r) => r.ok);
    falsified = inputRed && envGreen;
    process.stdout.write(
      falsified
        ? `\nFALSIFICATION PASSED — a full-amplitude vertical swipe (invisible to a screenX-only handler)\nturns the control RED on exactly the two input-dependent steps while every environment step\nstays green. The control is sensitive to the thing it claims to measure.\n`
        : `\nFALSIFICATION FAILED — the vertical swipe did not produce the expected red-on-input,\ngreen-on-environment shape. The control's green cannot be trusted.\n`
    );
  } else {
    process.stdout.write(
      failed
        ? '\nCONTROL FAILED — the probe has not been shown capable of observing a touch-driven\nbehavioural change. No swipe reading may be cited until this exits 0.\n'
        : '\nCONTROL PASSED — the probe observes a touch-driven behavioural change on a known-good\nLTR carousel, attributable to input rather than to elapsed time. B-5b may now measure swipe.\n'
    );
  }
} catch (err) {
  instrumentError = err;
} finally {
  await probe?.close();
}

if (instrumentError) {
  process.stderr.write(
    `\nINSTRUMENT ERROR — the control did not reach a verdict, so it says NOTHING about\n` +
    `the touch path. This is exit 2, not a control failure.\n  ${instrumentError.message}\n`
  );
  process.exit(2);
}

process.exit(FALSIFY ? (falsified ? 0 : 1) : (failed ? 1 : 0));
