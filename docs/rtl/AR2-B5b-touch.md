# AR-2 B-5b, milestone 3 — the touch control and the swipe measurement

**Method rules applied:** 4 (positive control before negatives) · 5 (the
instrument is a deliverable) · 6 (separate the measurement from the thing
measured) · 9 (constant tree across a differential) · 17 (invariant-violating
diagnostics run in a detached worktree)

**Status: COMPLETE.** B-5b's fourth question — swipe — is now measured, and the
answer changes its shape: **under RTL the swipe surface itself is unreachable.**
The gesture is delivered, but the element carrying the touch listeners has fled
the visible pane — the same transform defect §2.2 of the milestone-2 report
measured, seen from the input side. Swipe is therefore **not a fourth
mechanism**: it is downstream of the transform mechanism, contributes **no new
fix site**, and its mapping question (physical vs reading direction) is
untestable until the transform fix lands. **No source change** — this milestone
adds a control, extends the instrument, and reports.

**Provenance** (standing procedure, milestone-2 §4): the worktree's detached
HEAD was recorded before the first reading — `e4d56c85cabf53457422ffa4d7cc932d8afca88c`
(= `e4d56c8`, the same commit milestone 2 measured; the tree carried only the
intentional one-line `i18n.ts` substitution). Both sides of the differential
were built from that checkout.

---

## 1. The positive control, and what it caught

`scripts/rtl/control-touch.mjs` (`npm run control:touch`) is milestone 1's
debt coming due: the keyboard control explicitly declined to validate
`Input.dispatchTouchEvent`, and milestone 2 left swipe unmeasured for exactly
that reason. The control validates the touch path **end-to-end** — CDP
dispatch, touch emulation, the page's touchstart/touchend handlers, the state
transition — as one instrument; no intermediate layer was instrumented, because
none needed to be (the ladder exists for a failed control, and this one
ultimately passed).

Structure inherited from milestone 1, with the signs re-derived for touch. The
handler (`home.ts:75-78`) computes `diff = touchStartX − endX`, gated on
`|diff| > 50`: finger-left → `nextSlide()`, finger-right → `prevSlide()`.
Autoplay produces +1 only, so the control's positive is a **rightward swipe →
−1**, the sign the confound cannot generate. The null is not an inert key this
time but the **same gesture at 40px** — below the handler's own threshold, same
axis, same path, so the eventual positive is attributable to displacement, the
one variable that changed. `--falsify` presses the touch analogue of a
no-handler key: a full-amplitude **vertical** swipe, invisible by construction
to a handler that reads only `screenX`.

Result on the day's primary build: **live mode exit 0** (autonomy +1 · null
still · rightward swipe −1, predicted index, indicator and transform, observed
19–31ms after dispatch inside a measured runway) and **falsification exit 0**
(the vertical swipe turns exactly the two input-dependent steps red, every
environment step green).

The control falsified its own first version twice before passing — both
recorded because each is a reusable trap:

- **Touch is coordinate-addressed, and the stylesheet scrolls smoothly.**
  Keydown reaches the page wherever it is; a gesture must land on the element.
  The first run scrolled the carousel into view, slept, read the box — and
  dispatched at y=4978 in a 1000px viewport, because `html { scroll-behavior:
  smooth }` (styles.css:23) had animated the scroll under the read. Same trap
  class as milestone 2's mid-transition box read: a timing-dependent read of an
  animated property. The fix is structural, not a longer sleep — request
  `behavior: 'instant'` and **wait until the box is actually inside the
  viewport** before computing gesture coordinates.
- **A no-op gesture still consumes runway.** The first falsification run's
  1000ms observation window opened ~4s after the synchronising tick; a real
  autoplay advance landed inside it and an *environment* step went red
  alongside the input steps — the one shape falsify mode must never produce
  for the wrong reason. The control now takes a fresh synchronising tick
  between the null and the positive.

## 2. The measurement, and what the LTR baseline falsified this time

`measure-carousel.mjs --swipe` extends the milestone-2 instrument: two
gestures (finger right, finger left; 160px, dispatched at the container's
centre after an instant scroll-into-view), each inside its own measured runway,
each reading carrying `via: "cdp-touch"`, `dispatchMs`, `sinceSyncMs` — and
`hitTarget`: the element `elementFromPoint` finds at the gesture point, and
whether `.carousel-track` contains it. Touch emulation is opt-in
(`openProbe({ touch: true })`), so a milestone-2 reproduction still runs in the
exact environment its committed readings came from.

Two instrument-v1 falsifications by the LTR baseline, continuing the pattern
that every milestone's baseline has caught one:

- **One synchronising tick does not cover two gestures.** The first section
  shared a tick; both readings landed outside the runway (`sinceSyncMs` 7794 /
  4590 vs the 4500 budget) and the rightward swipe read a false silence —
  the dispatch had drifted into a transition-lock collision, the milestone-1
  trap verbatim (a correctly-delivered input that writes nothing to the DOM).
  Each swipe now takes its own fresh tick, and `dispatchMs` (~650ms of CDP
  touch round-trips) is recorded so the budget arithmetic is auditable.
- **Visibility cells read in the page's first seconds are load-sensitive.**
  Across two otherwise-identical LTR runs, the autoplay-tick cell (the first
  reading after load) gave 0% then 81%, and ArrowLeft (the second) 97% then
  96%, while every later cell — including all four swipe cells — was stable at
  100%. The 105-image page is still laying itself out when the first readings
  land. The swipe readings, taken a minute into the page's life, are
  unaffected; the early cells are noted here so a future re-run does not
  mistake load noise for a regression.

## 3. The answer: under RTL, no gesture can reach the swipe handler

Same differential discipline as milestone 2 — two builds of the same checkout
(`e4d56c8`), LTR baseline first, then the one-line `dir: 'rtl'` flip, 620 pages
each, `/de/` measured, gestures at the same point (x=793, y=400) in both:

| reading | LTR baseline | RTL substitution |
|---|---|---|
| element at the gesture point | `IMG`, **inside the track** | `DIV.carousel-track-container` — **the track is not under the finger** |
| swipe right (160px) | **−1** (`prevSlide`), 100% visible, observed 4ms after dispatch | **no movement** in a 1500ms window, inside the runway |
| swipe left (160px) | **+1** (`nextSlide`), 100% visible, observed 3ms after dispatch | **no movement** in a 1500ms window, inside the runway |

The LTR baseline is the in-environment positive control: same script, same
page, same gesture point, minutes earlier, moved the carousel both ways with
the mapping the source predicts. The RTL silences are therefore attributable —
and `hitTarget` says what they are evidence *of*. The touch listeners live on
`.carousel-track` (home.ts:75-76). Under `dir="rtl"` at index i≥1 the measured
transform (`translateX(-300%)` at the reading; the track is its own reference
box, 1100px) puts the track element entirely outside the viewport — there is
**no viewport coordinate at which a finger can touch it**. The gesture is
delivered to the container, which listens for nothing; the handler never runs.
A dead input path made out of geometry — the shape the control's header warned
about, measured live.

Index 0 is the one exception (`translateX(-0%)`, track under the finger —
the milestone-2 finding that index 0 is the only visible position, seen again
from the input side), and `/de/` autoplays past index 0 before a user can
gesture.

Bonus consistency check, at no extra cost: the keyboard/CSS cells of these runs
reproduce milestone 2 under touch emulation — anchors byte-identical at
l=263/1263 in both directions, autoplay +1, ArrowLeft/ArrowRight keep the LTR
mapping, RTL visibility 0% except ArrowLeft's landing, which happened to be
1→0 and read **100%** — the "index 0 is the only visible position" prediction
confirmed by a cell milestone 2 never happened to land on.

## 4. What this changes in the fix milestone's contract

The milestone-2 §2.5 acceptance table froze three mechanisms. Swipe adds **no
fourth mechanism and no new fix site** — the silence is the transform
mechanism's downstream effect — but it does add a row, stated here rather than
by silently editing the frozen table:

| mechanism | acceptance | falsification |
|---|---|---|
| swipe reachability *(downstream of transform)* | after the transform correction, re-running `--swipe` finds `hitTarget` inside the track and both gestures produce index moves | after the transform correction, a delivered gesture with `hitTarget` inside the track still measures no movement — a handler/input defect the geometry was masking |

Two consequences, same logic as the frozen rows:

- **The swipe-mapping question inherits the key-mapping row's status.** Today
  the handler cannot be reached under RTL at all, so whether it *would* follow
  physical or reading direction is unmeasurable — the LTR baseline shows it
  reads only `screenX`, so once the transform fix restores reachability it will
  keep the physical mapping, and the same owner policy call as
  ArrowLeft/ArrowRight (§2.4) decides whether that is correct. One decision
  should settle both rows.
- **Acceptance is by re-measurement, never by diff-absence** — the swipe row is
  decided by re-running this instrument with `--swipe`, exactly as the `/utv/`
  no-op row is decided by re-measured anchors.

## 5. What this milestone deliberately does not do

- **No fix.** The B-5 sites are untouched; the primary tree gained a control,
  an instrument extension, and this report.
- **No gate.** Nothing here asserts anything about the corpus.
- **No layer-by-layer touch diagnostics.** The end-to-end control passed;
  the ladder stays unbuilt until a control fails.
- **No claim about Arabic prose** — direction-only mechanics (ADR-11 §6), as
  in milestone 2.

## 6. Reproduction

```
# the control (primary build) — nothing about swipe is citable unless this exits 0
npm run control:touch
npm run control:touch:falsify

# the differential — same worktree discipline as milestone 2 (its §4):
# LTR: revert the worktree's i18n.ts flip, npx astro build, measure;
# RTL: re-apply the flip, rebuild, measure.
MSYS_NO_PATHCONV=1 node scripts/rtl/measure-carousel.mjs \
  --root <worktree>/dist --home /de/ --swipe --json out.json
```

Raw readings: `b5b-m3-ltr.json` / `b5b-m3-ltr-run2.json` (the stability pair) /
`b5b-m3-rtl.json` in the session scratchpad. The worktree is left exactly as
milestone 2 left it — detached at `e4d56c8`, the one-line flip as its only
diff, the RTL build standing — ready to be the fix milestone's acceptance
surface. Record its detached HEAD again before the first acceptance reading.
