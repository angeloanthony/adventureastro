# AR-2 B-5b, milestone 1 — the behavioural instrument

**Status: COMPLETE.** The instrument is committed and its positive control
passes and is demonstrably falsifiable. **No RTL finding is in this commit, by
design.**

---

## 1. Why the phase opens with an instrument

B-7 opened the presentation layer in a browser for the first time in this
initiative and settled six CSS questions with it — then deliberately left
nothing behind: *"nothing installed, no repo state touched."* That was correct
for a one-shot referee over a frozen classification. `git ls-files scripts/`
after B-7 shows 17 gate, census and test scripts and zero browser tooling: the
numbers in AR2-B7-classification.md §5.1 survive, the instrument that produced
them does not. Every one of those measurements is currently unreproducible.

B-5b cannot work that way, because for B-5b the browser *is* the measurement
layer. The four remaining sites are behaviours, and a census cannot settle any
of them:

| site | file | question |
|---|---|---|
| transform sign | `home.ts:63` | which way does the track move |
| transform sign | `utv.ts:27` | same, second implementation |
| key mapping | `home.ts:41-43` | does ArrowLeft mean *previous* in Arabic |
| swipe sign | `home.ts:75-78` | does a leftward drag advance or retreat |

Three of those four have "nothing happened" as a plausible and interesting
answer. **A dead input path produces exactly the same reading.** So the input
path is disproved first, and nothing in B-5b may cite a negative result until
the control exits 0.

This is the same rule B-7 applied one layer down. B-7 disproved its *ownership*
harness before trusting any "this declaration is dead" verdict; that is what
caught `.policy-list ul`, the finding the phase had argued most confidently.
B-5b disproves its *input* harness before trusting any "this carousel does not
respond" verdict. Same methodological rule, different layer of the stack.

---

## 2. What shipped

| file | role |
|---|---|
| `scripts/rtl/probe.mjs` | the instrument: serve `dist/`, drive Edge headless over CDP, navigate, evaluate, dispatch input, read back DOM state |
| `scripts/rtl/control-keyboard.mjs` | the positive control, with a `--falsify` mode that proves the control can go red |
| `package.json` | `probe:rtl`, `control:keyboard`, `control:keyboard:falsify` |

**Not wired into `build`.** It needs a browser and a built tree, and it makes no
claim about the corpus — it is a phase instrument, not a gate. `§7.2` of the
handoff catalogues gates; this is not one, and should not be added there.

**No dependency added.** Node 24 supplies `WebSocket`, `fetch` and
`performance`; the static server is `node:http`; Edge is already installed. The
B-7 constraint is preserved exactly — the only thing that changed is that the
capability now lives in the tree where the next phase can re-run it.

### 2.1 Two deliberate departures from B-7's method

**A `node:http` server instead of `astro preview`.** Two reasons, both about the
measurement rather than convenience. First, no npm/child-shell layer between the
probe and the bytes under test, on a platform where that layer has already
contaminated one proof three times (ADR-11 §5.1, the CRLF re-materialisation).
Second, the port is OS-assigned and the root is an explicit argument, so two
probes can run over two different trees simultaneously — which is what a
before/after behavioural differential needs and what a fixed-port `astro
preview` could not have done. Routing mirrors the build config
(`trailingSlash: 'always'`, `format: 'directory'`).

**Third-party requests are blocked.** V-0 measured `/utv/` booting 24 YouTube
players before interaction. A behavioural probe that waits on those is measuring
the network. The blocklist is explicit rather than a blanket `*://*/*`, which
would block the tree under test as well.

---

## 3. The control, and why its shape is what it is

### 3.1 The obvious control would have passed over a dead input path

The natural first design is: dispatch a key, observe that the slide changed.
That control is worthless here, and the source says why:

```js
startAutoPlay() { this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000); }   // home.ts:71
```

The carousel advances itself every five seconds. "Something changed after input"
is therefore satisfied by *elapsed time alone*. The control would have gone
green over a completely dead `Input.dispatchKeyEvent` path, B-5b would have
trusted its negatives, and the phase would have concluded "Arabic carousel does
not respond" from an instrument that never delivered a keystroke.

### 3.2 The confound has a fixed sign, so it becomes the oracle

Autoplay only ever calls `nextSlide()`. It cannot produce a decrement. And
`home.ts:42` establishes `ArrowLeft -> prevSlide()` in the LTR source, so the
expected index is known *before* the measurement rather than chosen after it.

So the control presses **ArrowLeft** and asserts a decrement. A `-1 (mod n)`
observation is attributable to the keyboard path and to nothing else on the
page. The page's own behaviour becomes part of the oracle instead of something
the probe has to suppress — which matters, because suppressing it would mean
mutating the page under test.

### 3.3 The target is the homepage, not `/utv/`

A control has to exercise the capability being validated. `utv.ts` has the
transform (`utv.ts:27`) but no `keydown` handler and no touch handlers. A null
result there cannot distinguish "probe failed" from "feature absent" — it would
be a control that is guaranteed to look like the bug. The homepage carousel is
the only one of the two with the keyboard path.

And the control runs on an **LTR** page in an Arabic phase, deliberately: a
control must run where the expected answer is already known. `/` is the
reference implementation, `/ar/…` is the unknown.

### 3.4 The step order is the design, not a narrative

The first draft dispatched blind and was wrong. `updateCarousel` holds a 500ms
lock:

```js
updateCarousel() {
  if (this.isTransitioning) return;      // home.ts:61
  ...
  setTimeout(() => { this.isTransitioning = false; }, 500);   // home.ts:66
}
```

`prevSlide()` mutates `currentIndex` **before** calling it. So a keypress that
lands inside the lock is received, handled correctly, and writes nothing to the
DOM — a real keypress with no observable effect, which is precisely the false
negative this file exists to prevent. Worse, the internal index and the DOM are
then out of sync, so a naive retry mispredicts.

The fix is to synchronise to the confound rather than fight it:

1. **AUTONOMY** — wait out one autoplay tick with no input at all; assert `+1`.
   This measures the confound instead of assuming it, *and* lands on a known
   tick, which bounds a provably lock-free runway of one full autoplay period.
2. **NULL** — inside that runway, dispatch an inert key (`F7`). The observable
   must not move. Rules out an observable that twitches on any dispatch.
3. **POSITIVE** — still inside the runway, dispatch `ArrowLeft`. Assert the
   predicted index, the indicator, and the transform.

A `runway integrity` assertion reports the elapsed time from the synchronising
tick against the 4500ms budget, so the lock-free claim is measured on every run
rather than assumed.

### 3.5 Observable state, not dispatch acceptance

CDP returns success for `Input.dispatchKeyEvent` whether or not anything
listens. Every assertion is on state the page had to compute: the active slide
class, the active indicator class, and the inline transform the handler writes.
Readiness is a JS-executed signal for the same reason — `createIndicators()`
appends one button per slide, so `indicators === slides` proves the `Carousel`
constructed and ran, where a DOM-presence check on `.carousel-track` would only
prove the HTML shipped.

---

## 4. Result

```
  PASS  autonomy (autoplay is +1, unprompted)
        unprompted 1 -> 2 (+1) after 4909ms
  PASS  null (F7 inert)
        no movement in 400ms
  PASS  runway integrity
        key dispatched and observed 1025ms after the synchronising tick (budget 4500ms)
  PASS  positive (ArrowLeft -> prevSlide)
        activeSlide 2 -> 1 (predicted 1), indicator 1, transform "translateX(-100%)" (expected -100%), in 1ms
  PASS  attribution (decrement, not elapsed time)
        observed -1 (mod 105) 1ms after dispatch, inside a measured lock-free runway
```

**Latency 1ms.** The handler is on `document` (`home.ts:41`), so no focus
management was needed — the most likely silent no-op in the CDP path is absent
by construction.

### 4.1 The control is falsifiable, and was falsified on demand

A positive control that cannot go red is decoration. `--falsify` presses
`ArrowUp` — a key with no handler — through the identical measurement path:

```
  PASS  autonomy · PASS null · PASS runway integrity
  FAIL  positive (ArrowUp -> prevSlide)   NO MOVEMENT in 1001ms
  FAIL  attribution (decrement, not elapsed time)
```

Red on exactly the two input-dependent steps, green on every environment step.
That shape is the assertion: the red is caused by the absent handler and not by
anything else. This ships alongside the control for the same reason the 4n
differential ships alongside gate 4n — the check on the check is part of the
deliverable.

### 4.2 Three exit codes

`0` validated · `1` an assertion failed, the input path is suspect · `2` the
instrument did not reach a verdict (browser did not start, page did not load, no
tick to synchronise on).

Collapsing `2` into `1` would make a harness problem and a behavioural finding
the same signal, which is the confusion the whole phase is written against. This
was not theoretical: **one run in an early batch of 15 exited non-zero with its
output discarded and could not be attributed after the fact.** 24 of 25 runs
passed; the one failure remains unexplained, which is exactly why the codes are
separated now rather than after it recurs mid-measurement.

### 4.3 An environment trap, recorded

Invoked from Git Bash, `node scripts/rtl/probe.mjs /` navigates to
`C:/Program Files/Git/` — MSYS rewrites a lone `/` argument into a Windows path
before Node sees it. Use `MSYS_NO_PATHCONV=1`, or PowerShell, or the npm
scripts. The control itself takes no path argument and is unaffected.

This is the third distinct instance of the same class on this project (ADR-11
§5.1 CRLF; the worktree contamination in B-6; now argv rewriting): **the
environment silently altered the input to a measurement.** It is worth stating
as a standing rule rather than a third anecdote — *verify what the tool actually
received, not what you passed it.*

---

## 5. What this milestone deliberately does not do

- **No RTL measurement.** `/ar/` is not touched. The next commit measures it.
- **No source change.** `home.ts` and `utv.ts` are untouched; the four sites are
  still physical.
- **No gate.** This asserts nothing about the corpus and is not wired into
  `build`.
- **Promo-badge anchors remain out of scope** — owner-classified product
  decision, unchanged from B-7.

## 6. Next

With the instrument validated, B-5b's four questions can be asked of `/ar/`:
carousel anchors, transform sign, keyboard mapping, swipe direction. Swipe needs
one more capability the control has not exercised — synthesised touch sequences
via `Input.dispatchTouchEvent` — and by the rule at the top of this document
that path needs its own positive control before any swipe negative is citable.

> **Done for three of the four** — milestone 2 measured anchors, transform sign
> and key mapping as an LTR/RTL differential: [`AR2-B5b-measurements.md`](AR2-B5b-measurements.md).
> Swipe remains open, blocked on the touch control exactly as above.
