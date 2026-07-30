// scripts/rtl/measure-carousel.mjs — the B-5b milestone-2 measurement
// (AR-2 B-5b, second milestone).
//
// WHAT THIS IS. The instrument that answers three of B-5b's four questions —
// carousel anchor positions, transform sign, ArrowLeft/ArrowRight mapping — by
// observation over a built tree. It measures; it does not judge. There is no
// RTL expectation coded anywhere in this file, because the moment the
// instrument knows the answer it is supposed to find, its readings stop being
// evidence. Findings live in docs/rtl/AR2-B5b-measurements.md; this file only
// makes them reproducible.
//
// The fourth question — swipe sign — is behind `--swipe` (milestone 3). It was
// deliberately absent from milestone 2 because `Input.dispatchTouchEvent` had
// no positive control; control-touch.mjs now provides one, and no swipe
// reading below may be cited unless that control exited 0 on the same day's
// primary build. The flag is opt-in so a milestone-2 reproduction runs in the
// exact environment the committed readings came from (touch emulation off).
//
// SWIPE READINGS CARRY THEIR HIT TARGET. Touch is coordinate-addressed, and
// under a broken RTL transform the track ELEMENT can flee the visible pane
// while the container stays put — a gesture at the container's centre is then
// delivered to whatever is actually under the point, which may not be inside
// the track's subtree, and the handler never hears it. A silence in that shape
// is evidence about geometry, not about the handler. Every swipe reading
// therefore records `hitTarget` (the element at the gesture point, and whether
// the track contains it) so the two silences can never be conflated.
//
// HOW IT IS RUN. Twice per question, over two builds of the SAME worktree
// (ADR-11: the dir flip never happens in the primary tree; ADR-11 §5.1: the
// two readings must come from the same checkout or they are not comparable):
//
//     node scripts/rtl/measure-carousel.mjs --root <worktree>/dist \
//          --home /de/ --utv /de/utv/ [--json out.json]
//
// once with the worktree unmodified (the LTR baseline — which doubles as the
// positive control in the measurement environment: same script, same page,
// known-good direction) and once after flipping `de` to `dir: 'rtl'` and
// rebuilding. The differential between the two JSON files is the milestone.
//
// THE THREE DISCIPLINES INHERITED FROM THE CONTROL, unchanged:
//   1. observable state only — every reading is DOM state the page had to
//      compute (active classes, the inline transform, border boxes), never
//      dispatch acceptance;
//   2. synchronise before dispatching — the homepage carousel autoplays every
//      5000ms and holds a 500ms transition lock, so every key is dispatched
//      just after an observed tick, inside a measured lock-free runway, and
//      the elapsed-since-tick figure is recorded with each reading so
//      attribution can be audited (an index move observed 1.5s into a 5s
//      period cannot be an autoplay tick);
//   3. exit codes separate the instrument from the measurement — `0` the
//      measurements completed (whatever they say), `2` the instrument did not
//      reach a reading. There is no exit 1: this file makes no claim that
//      could fail.
//
// THE UTV CAROUSEL IS MEASURED THROUGH A DIFFERENT PATH, AND THE READING IS
// LABELLED WITH IT. utv.ts has no keydown handler (established in milestone 1:
// that is why it cannot host the control), so its transform sign is read by
// invoking the page's own next/prev buttons via `el.click()` from the page
// context. That exercises the real handler and the real CSS but NOT the
// browser input pipeline — so a movement observed this way is evidence about
// the transform, and a silence observed this way is evidence about nothing.
// The JSON says `via: "dom-click"` on every such reading to keep that
// distinction attached to the data.

import { writeFileSync } from 'node:fs';
import { setTimeout as sleep } from 'node:timers/promises';

import { openProbe } from './probe.mjs';

const AUTOPLAY_MS = 5000;   // home.ts: setInterval(nextSlide, 5000)
const TRANSITION_MS = 500;  // home.ts: the isTransitioning lock

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
const ROOT = arg('--root');
const HOME = arg('--home');
const UTV = arg('--utv');
const JSON_OUT = arg('--json');
const SWIPE = process.argv.includes('--swipe');
if (!ROOT || (!HOME && !UTV)) {
  process.stderr.write(
    'usage: node scripts/rtl/measure-carousel.mjs --root <dist> [--home /de/] [--utv /de/utv/] [--swipe] [--json out.json]\n');
  process.exit(2);
}
if (SWIPE && !HOME) {
  // utv.ts has no touch handlers (milestone 1), so a swipe there is evidence
  // of nothing — the flag only makes sense with a homepage target.
  process.stderr.write('--swipe requires --home: the utv carousel has no touch handlers to measure\n');
  process.exit(2);
}

// A signed step: 1 -> +1, n-1 -> -1, anything else reported raw. The carousel
// is modular, so "which neighbour did it move to" is the only honest reading.
const signedStep = (from, to, n) => {
  const raw = (to - from + n) % n;
  return raw === n - 1 ? -1 : raw;
};

// Overlap of a slide's border box with the viewport's, as a percentage of the
// slide's own width. This is the behavioural reading behind "the slide is
// on-screen": a transform whose sign is wrong for the writing direction shows
// up here as 0% on the slide the page just marked active.
const visibility = (slide, viewport) => {
  if (!slide || !viewport || !slide.w) return null;
  const overlap = Math.min(slide.r, viewport.r) - Math.max(slide.l, viewport.l);
  return Math.max(0, Math.round((overlap / slide.w) * 100));
};

// Which physical side of a container's centre an element sits on. Anchors are
// a geometry question, so the answer is geometry — never a CSS property read,
// because `left: 20px` and `inset-inline-start: 20px` can produce the same
// computed `left` while meaning different things.
const side = (el, container) =>
  el && container ? ((el.l + el.r) / 2 < (container.l + container.r) / 2 ? 'left' : 'right') : null;

const report = { root: ROOT, pages: {} };

// ---------------------------------------------------------------------------
// homepage gallery carousel — class Carousel, the keyboard-capable one
// ---------------------------------------------------------------------------

const HOME_STATE = `(() => {
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

const HOME_ACTIVE_BOX = `(() => {
  const s = document.querySelector('.carousel-slide.active');
  const v = document.querySelector('.carousel-track-container');
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect();
    return { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), w: Math.round(r.width) }; };
  return { slide: box(s), viewport: box(v) };
})()`;

async function watchHome(probe, from, windowMs) {
  const started = performance.now();
  for (;;) {
    const state = await probe.evaluate(HOME_STATE);
    if (state.activeSlide !== from) {
      return { moved: true, state, elapsed: Math.round(performance.now() - started) };
    }
    if (performance.now() - started >= windowMs) {
      return { moved: false, state, elapsed: Math.round(performance.now() - started) };
    }
  }
}

async function measureHome(probe, pathname) {
  await probe.goto(pathname);
  const page = {
    path: pathname,
    dir: await probe.evaluate('document.documentElement.getAttribute("dir") ?? "(absent -> ltr)"'),
    lang: await probe.evaluate('document.documentElement.lang'),
  };

  // Readiness is the JS-executed signal from milestone 1: createIndicators()
  // appends one button per slide, so indicators === slides proves the
  // Carousel constructed and ran on THIS build.
  await probe.waitFor(`(() => {
    const s = document.querySelectorAll('.carousel-slide').length;
    const i = document.querySelectorAll('.carousel-indicator').length;
    return s > 0 && s === i;
  })()`);

  // -- anchors: pure geometry, no input --------------------------------------
  const [main, viewport, prev, next] = await Promise.all([
    probe.box('.carousel-main'), probe.box('.carousel-track-container'),
    probe.box('.carousel-prev'), probe.box('.carousel-next'),
  ]);
  const [prevCss, nextCss] = await Promise.all([
    probe.computedStyle('.carousel-prev', ['left', 'right']),
    probe.computedStyle('.carousel-next', ['left', 'right']),
  ]);
  page.anchors = {
    container: main,
    prevBtn: { box: prev, side: side(prev, main), computed: prevCss },
    nextBtn: { box: next, side: side(next, main), computed: nextCss },
  };

  // -- initial state, before any tick or input -------------------------------
  const initial = await probe.evaluate(HOME_STATE);
  const n = initial.slides;
  page.initial = {
    ...initial,
    activeVisiblePct: visibility(...Object.values(await probe.evaluate(HOME_ACTIVE_BOX))),
    viewport,
  };

  // -- autoplay tick: the zero-input transform-sign reading ------------------
  // Autoplay calls nextSlide() and nothing else, so whatever this tick writes
  // IS the advance behaviour: the transform the handler computed and where the
  // newly-active slide physically landed. It is also the synchronisation
  // point for every dispatch below.
  const tick = await watchHome(probe, initial.activeSlide, AUTOPLAY_MS + 2000);
  if (!tick.moved) throw new Error(`no autoplay tick on ${pathname} in ${tick.elapsed}ms — cannot synchronise`);
  let syncAt = performance.now();
  // The active class flips instantly; the track animates for 500ms. A box read
  // at the moment of the flip photographs the slide mid-flight and reports a
  // working carousel as invisible — measured on the LTR baseline before this
  // sleep existed (activeVisiblePct 0 on a slide that ends at 100). Every
  // visibility reading below is taken after the transition settles.
  await sleep(TRANSITION_MS + 150);
  page.autoplayTick = {
    step: signedStep(initial.activeSlide, tick.state.activeSlide, n),
    from: initial.activeSlide, to: tick.state.activeSlide,
    transform: tick.state.transform,
    activeVisiblePct: visibility(...Object.values(await probe.evaluate(HOME_ACTIVE_BOX))),
  };

  // -- the two keys, each inside a measured runway ----------------------------
  page.keys = {};
  for (const key of ['ArrowLeft', 'ArrowRight']) {
    await sleep(TRANSITION_MS + 100); // let the transition lock release
    const before = await probe.evaluate(HOME_STATE);
    await probe.key(key);
    const obs = await watchHome(probe, before.activeSlide, 1000);
    const sinceSync = Math.round(performance.now() - syncAt);
    if (obs.moved) await sleep(TRANSITION_MS + 150); // settle before the box read
    page.keys[key] = {
      moved: obs.moved,
      step: obs.moved ? signedStep(before.activeSlide, obs.state.activeSlide, n) : null,
      from: before.activeSlide, to: obs.moved ? obs.state.activeSlide : before.activeSlide,
      transform: obs.state.transform,
      activeIndicator: obs.state.activeIndicator,
      activeVisiblePct: visibility(...Object.values(await probe.evaluate(HOME_ACTIVE_BOX))),
      observedMs: obs.elapsed,
      sinceSyncMs: sinceSync,
      insideRunway: sinceSync < AUTOPLAY_MS - TRANSITION_MS,
    };
    // Re-synchronise before the second key: wait out the next autoplay tick so
    // its +1 cannot land inside the second key's observation window.
    if (key === 'ArrowLeft') {
      const resync = await watchHome(probe, obs.state.activeSlide, AUTOPLAY_MS + 2000);
      if (!resync.moved) throw new Error('no autoplay tick to re-synchronise on before ArrowRight');
      syncAt = performance.now();
    }
  }

  // -- the two swipes (milestone 3), each inside a measured runway -------------
  // Touch is coordinate-addressed where keydown was document-addressed, so the
  // carousel is scrolled into the viewport first — `behavior: 'instant'`
  // because the stylesheet's `html { scroll-behavior: smooth }` otherwise
  // animates the scroll and the geometry is read mid-flight (control-touch.mjs's
  // first run dispatched at y=4978 in a 1000px viewport). The rightward swipe
  // goes first: on the LTR reference it predicts prevSlide, the sign autoplay
  // cannot produce, so it is the reading with the strongest attribution.
  if (SWIPE) {
    await probe.evaluate(
      `document.querySelector('.carousel-track-container').scrollIntoView({ block: 'center', behavior: 'instant' })`);
    const vbox = await probe.waitFor(`(() => {
      const r = document.querySelector('.carousel-track-container').getBoundingClientRect();
      return r.top >= 0 && r.bottom <= innerHeight && r.width > 200
        ? { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), w: Math.round(r.width) }
        : false;
    })()`);
    const cx = Math.round((vbox.l + vbox.r) / 2);
    const cy = vbox.t + 200; // inside the track area, clear of the edge buttons

    page.swipes = { gesturePoint: { x: cx, y: cy } };
    for (const fingerMoves of ['right', 'left']) {
      const dx = fingerMoves === 'right' ? 80 : -80;
      // Geometry first, OUTSIDE the runway — everything between the
      // synchronising tick and the dispatch is latency the runway pays for.
      const hitTarget = await probe.evaluate(`(() => {
        const el = document.elementFromPoint(${cx}, ${cy});
        const track = document.querySelector('.carousel-track');
        return {
          at: el ? el.tagName + (el.className ? '.' + String(el.className).split(' ')[0] : '') : null,
          insideTrack: Boolean(el && track && track.contains(el)),
        };
      })()`);
      // Each swipe gets its own fresh synchronising tick: the first run of
      // this section shared one tick across both gestures and both readings
      // landed outside the runway (sinceSyncMs 7794 / 4590 vs a 4500 budget),
      // which the instrument's own discipline refuses to attribute.
      const pre = await probe.evaluate(HOME_STATE);
      const sync = await watchHome(probe, pre.activeSlide, AUTOPLAY_MS + 2000);
      if (!sync.moved) throw new Error(`no autoplay tick to synchronise on before the ${fingerMoves}ward swipe`);
      syncAt = performance.now();
      await sleep(TRANSITION_MS + 100);
      const before = await probe.evaluate(HOME_STATE);
      const dispatchedAt = performance.now();
      await probe.swipe({ fromX: cx - dx, fromY: cy, toX: cx + dx, toY: cy });
      const dispatchMs = Math.round(performance.now() - dispatchedAt);
      const obs = await watchHome(probe, before.activeSlide, 1500);
      const sinceSync = Math.round(performance.now() - syncAt);
      if (obs.moved) await sleep(TRANSITION_MS + 150); // settle before the box read
      page.swipes[fingerMoves] = {
        via: 'cdp-touch',
        displacementPx: 2 * dx,
        hitTarget,
        moved: obs.moved,
        step: obs.moved ? signedStep(before.activeSlide, obs.state.activeSlide, n) : null,
        from: before.activeSlide, to: obs.moved ? obs.state.activeSlide : before.activeSlide,
        transform: obs.state.transform,
        activeIndicator: obs.state.activeIndicator,
        activeVisiblePct: visibility(...Object.values(await probe.evaluate(HOME_ACTIVE_BOX))),
        dispatchMs,
        observedMs: obs.elapsed,
        sinceSyncMs: sinceSync,
        insideRunway: sinceSync < AUTOPLAY_MS - TRANSITION_MS,
      };
    }
  }

  return page;
}

// ---------------------------------------------------------------------------
// /utv/ Doc's Beach carousel — the IIFE, no keyboard path, no autoplay
// ---------------------------------------------------------------------------

const UTV_STATE = `(() => {
  const dots = Array.from(document.querySelectorAll('.docs-beach-dot'));
  const track = document.querySelector('.docs-beach-carousel-track');
  return {
    slides: document.querySelectorAll('.docs-beach-carousel-slide').length,
    activeDot: dots.findIndex((d) => d.classList.contains('active')),
    transform: track ? track.style.transform : null,
  };
})()`;

const UTV_SLIDE_BOX = (i) => `(() => {
  const s = document.querySelectorAll('.docs-beach-carousel-slide')[${i}];
  const v = document.querySelector('.docs-beach-carousel-track-wrap');
  const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect();
    return { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), w: Math.round(r.width) }; };
  return { slide: box(s), viewport: box(v) };
})()`;

async function measureUtv(probe, pathname) {
  await probe.goto(pathname);
  const page = {
    path: pathname,
    dir: await probe.evaluate('document.documentElement.getAttribute("dir") ?? "(absent -> ltr)"'),
    lang: await probe.evaluate('document.documentElement.lang'),
  };

  await probe.waitFor(`document.querySelectorAll('.docs-beach-carousel-slide').length > 0`);

  // -- anchors: these buttons are FLEX CHILDREN, not absolutely positioned,
  // so their physical side is decided by the flex layout and the document
  // direction — which is exactly why they are measured rather than read from
  // the stylesheet.
  const [container, viewport, prev, next] = await Promise.all([
    probe.box('.docs-beach-carousel'), probe.box('.docs-beach-carousel-track-wrap'),
    probe.box('.docs-beach-carousel-btn.prev'), probe.box('.docs-beach-carousel-btn.next'),
  ]);
  page.anchors = {
    container,
    prevBtn: { box: prev, side: side(prev, container) },
    nextBtn: { box: next, side: side(next, container) },
  };

  const initial = await probe.evaluate(UTV_STATE);
  const n = initial.slides;
  page.initial = {
    ...initial,
    slide0VisiblePct: visibility(...Object.values(await probe.evaluate(UTV_SLIDE_BOX(0)))),
    viewport,
  };

  // -- transform sign via the page's own buttons ------------------------------
  // `el.click()` runs the real handler and the real CSS but not the browser
  // input pipeline; every reading below carries `via: "dom-click"` so it can
  // never be quoted as an input-path result. No autoplay and no transition
  // lock exist on this carousel (the IIFE has neither), so no synchronisation
  // step is needed — nothing else on the page can move this track.
  page.clicks = {};
  for (const which of ['next', 'prev']) {
    const before = await probe.evaluate(UTV_STATE);
    await probe.evaluate(`document.querySelector('.docs-beach-carousel-btn.${which}').click()`);
    await sleep(650); // one CSS transition, 500ms, plus margin
    const after = await probe.evaluate(UTV_STATE);
    const idx = after.activeDot;
    page.clicks[which] = {
      via: 'dom-click',
      moved: after.activeDot !== before.activeDot || after.transform !== before.transform,
      step: signedStep(before.activeDot, after.activeDot, n),
      from: before.activeDot, to: after.activeDot,
      transform: after.transform,
      currentSlideVisiblePct: idx >= 0
        ? visibility(...Object.values(await probe.evaluate(UTV_SLIDE_BOX(idx))))
        : null,
    };
  }

  return page;
}

// ---------------------------------------------------------------------------

let probe;
try {
  // Touch emulation only when swipe is being measured, so a milestone-2
  // reproduction runs in the environment its committed readings came from.
  probe = await openProbe({ root: ROOT, touch: SWIPE });
  process.stdout.write(`B-5b — carousel measurement over ${ROOT}${SWIPE ? ' (with swipe)' : ''}\n`);
  if (HOME) {
    report.pages.home = await measureHome(probe, HOME);
    process.stdout.write(`  measured ${HOME} (gallery carousel, keyboard path)\n`);
  }
  if (UTV) {
    report.pages.utv = await measureUtv(probe, UTV);
    process.stdout.write(`  measured ${UTV} (Doc's Beach carousel, dom-click path)\n`);
  }
} catch (err) {
  process.stderr.write(`\nINSTRUMENT ERROR — no reading was produced.\n  ${err.message}\n`);
  await probe?.close();
  process.exit(2);
}
await probe.close();

process.stdout.write('\n' + JSON.stringify(report, null, 2) + '\n');
if (JSON_OUT) writeFileSync(JSON_OUT, JSON.stringify(report, null, 2));
process.exit(0);
