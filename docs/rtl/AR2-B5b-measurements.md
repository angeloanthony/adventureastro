# AR-2 B-5b, milestone 2 — the keyboard/CSS-observable measurements

**Method rules applied:** 4 (positive control before negatives) · 5 (the
instrument is a deliverable) · 6 (separate the measurement from the thing
measured) · 9 (constant tree across a differential) · 17 (invariant-violating
diagnostics run in a detached worktree)

**Status: COMPLETE.** Three of B-5b's four questions are now measured, on both
carousel implementations, as an LTR/RTL behavioural differential. **No source
change** — `home.ts`, `utv.ts` and `public/styles.css` are untouched; this
milestone converts the remaining B-5 sites from *suspected* to *measured*.
The fourth question — swipe sign — is deliberately absent: it needs
`Input.dispatchTouchEvent`, which no positive control has validated, and by the
milestone-1 rule an unvalidated input path may not produce citable readings.
Touch is milestone 3.

---

## 1. How the readings were produced

**The instrument** is `scripts/rtl/measure-carousel.mjs` (`npm run
measure:carousel`), built on milestone 1's probe. It observes and reports; no
RTL expectation is coded anywhere in it, because an instrument that knows the
answer it is supposed to find stops producing evidence (rule 6). Its exit codes
are `0` (readings produced, whatever they say) and `2` (no reading) — there is
no exit `1`, because the instrument makes no claim that could fail. Findings
live here; the numbers live in the JSON it emits.

**The surface** is the ADR-11 substitution, in a detached worktree at `e4d56c8`
(rule 17 — the `k` bot cannot reach it, and the primary tree stayed clean
throughout): flip `de` to `dir: 'rtl'` in the worktree's `src/lib/i18n.ts`,
one line, `npx astro build` (gates skipped deliberately — 4n is known to fail
this diagnostic build on German flanks, and this run asserts nothing about the
corpus). **Both sides of the differential were built from that same checkout**
(rule 9): first unmodified (LTR baseline), then flipped (RTL). 620 pages each.
Measured routes: `/de/` (gallery carousel — the only keyboard-capable one) and
`/de/utv/` (Doc's Beach carousel — buttons only).

**The positive controls** (rule 4), before any RTL reading was taken:

- `npm run control:keyboard` — exit 0 on the day's primary build; the CDP
  input path delivers real keystrokes.
- the LTR baseline run of this instrument returned the known-good shape on
  every reading: active slide 100% visible at rest and after every move,
  autoplay +1, ArrowLeft −1, ArrowRight +1, anchors prev-left / next-right.
  The RTL negatives below are citable because the same script, same worktree,
  same pages produced those positives minutes earlier.

**The LTR baseline immediately falsified the instrument's first version.** The
`active` class flips instantly but the track animates for 500ms, so a box read
at the moment of the flip photographs the slide mid-flight — the first run
reported a *working* LTR carousel as 0–1% visible. Every visibility reading is
now taken after the transition settles. Recorded because it is rule 4 earning
its keep a second time: without the baseline, that artifact would have shipped
as an RTL finding.

**Scope of validity.** ADR-11 §6 bounds the substitution: valid for anything
that depends only on direction, invalid for anything that depends on the
surrounding script. Everything below is flex layout, absolute positioning and
a transform sign — direction-only mechanics. **Unlike Track B's 290 flanking
findings, these readings do forecast the Arabic carousel.**

Keyboard dispatches follow the milestone-1 discipline: synchronised to an
observed autoplay tick, dispatched inside the measured lock-free runway, with
`sinceSyncMs` recorded on every reading so attribution can be audited (an index
move observed 1.3s into a 5s autoplay period cannot be a tick).

---

## 2. The three answers

### 2.1 Anchors — the two carousels disagree, and the one with no anchor CSS is the correct one

| carousel | positioning | LTR (prev · next) | RTL (prev · next) |
|---|---|---|---|
| `/de/` gallery | `position: absolute; left: 20px` / `right: 20px` | left `l=263` · right `l=1263` | **left `l=263` · right `l=1263` — byte-identical boxes** |
| `/de/utv/` Doc's Beach | flex children of `.docs-beach-carousel` | left `l=233` · right `l=1297` | **right `l=1297` · left `l=233` — a perfect mirror** |

The gallery buttons are pinned by the four physical declarations B-7's frozen
classification deferred to this phase (`.carousel-prev { left: 20px }` /
`.carousel-next { right: 20px }`, ×2 breakpoints, `styles.css:260-261,509-510`):
under RTL nothing moves, so "previous" sits on the line-*start* side of a page
whose line starts on the right. The Doc's Beach buttons have **no anchor CSS at
all** — they are flex children, and flex follows the document direction, so
they swapped sides with zero work. The measurement, not the stylesheet, is what
distinguishes these: both pairs render identically in LTR, and only the
substitution build shows that one pair is direction-aware and the other is not.

### 2.2 Transform sign — unchanged, and the viewport goes blank

The handler writes `translateX(-index*100%)` in both builds; the sign does not
respond to direction. Behaviourally:

| reading | LTR active-slide visibility | RTL active-slide visibility |
|---|---:|---:|
| `/de/` at rest (post-load) | 100% | **0%** |
| `/de/` after an autoplay tick (+1, zero input) | 100% | **0%** |
| `/de/` after ArrowLeft | 100% | **0%** |
| `/de/` after ArrowRight | 100% | **0%** |
| `/de/utv/` at rest (index 0, no transform yet) | 100% | **100%** |
| `/de/utv/` after `next` (`via: dom-click`) | 100% | **0%** |
| `/de/utv/` after `prev` back to 0 (`via: dom-click`) | 100% | **100%** |

Under `dir="rtl"` the flex track lays slides out to the physical *left* of
slide 0 while the negative translate moves the track further left — the two
motions run away from each other, and the pane shows empty track. Index 0 is
the only visible position (confirmed by the `/de/utv/` rest reading; `/de/`
had already autoplayed past it by load-settle). AR-1's R-1/R-2 prediction
("slides advance the wrong way") is confirmed and quantified: **every advance,
from any input path, on both implementations, presents 0% of the slide it just
marked active.**

The Doc's Beach readings carry `via: "dom-click"` — the page's own buttons
invoked from page context, since utv.ts has no keyboard path (milestone 1
established that is why it cannot host a control). A movement observed that way
is evidence about the transform and the CSS, which is what it is cited for
here; it would be evidence of nothing if the reading had been a silence.

### 2.3 Key mapping — direction-blind

| build | ArrowLeft | ArrowRight | attribution |
|---|---|---|---|
| LTR | **−1** (mod 105) | **+1** | inside runway, observed ≤2ms after dispatch |
| RTL | **−1** (mod 105) | **+1** | inside runway, observed ≤1ms after dispatch |

`if (e.key === 'ArrowLeft') this.prevSlide()` fires identically under both
directions. In a right-to-left page, forward-in-reading-order is *leftward*, so
a direction-aware carousel maps ArrowLeft to *next* there — this one keeps the
LTR mapping. Both keys respond (the handler is live under RTL — these are
positive observations), land on the predicted index and indicator, and write
the predicted transform; what changed is only what §2.2 already measured —
the slide they select is off-screen.

### 2.4 What this pins down for the fix

The fix milestone inherits a measured work list, not a suspicion:

- **2 JS sites** need a direction-aware transform sign (`home.ts:63`,
  `utv.ts:27`) — this is what restores a visible slide.
- **1 JS site** needs a key-mapping decision (`home.ts:41-43`): follow reading
  direction, or keep physical keys. A policy call; the measurement only
  establishes that today it does not respond to direction at all.
- **4 CSS declarations** (`.carousel-prev/-next` ×2 breakpoints) convert to
  `inset-inline-start/-end` — the B-7 deferral, now demonstrated rather than
  classified.
- **0 anchor work on `/de/utv/`** — flex already does it. Any sweep that
  "fixes" the Doc's Beach buttons breaks them.
- Nothing else moved: container and viewport boxes are identical between the
  two builds on both routes.
- **Swipe (`home.ts:75-78`) remains unmeasured**, and stays that way until a
  touch control exists (milestone 3).

### 2.5 Acceptance and falsification for the fix milestone

The work list above is three *mechanisms*, not four sites, and each mechanism
gets the same proof structure: an observable this instrument already reads, an
acceptance criterion, and an explicit falsifier. The fix milestone is accepted
mechanism-by-mechanism, by re-running this instrument — not by inspecting the
diff.

| mechanism | acceptance | falsification |
|---|---|---|
| transform | every traversal path sharing the transform mechanism converges on 100% post-settle visibility | any traversal path sharing the mechanism still measures 0% visibility after the transform correction |
| key mapping *(policy pending)* | after adopting the chosen policy, measured keypresses produce index deltas consistent with that policy | after the policy is implemented, a measured keypress produces an index delta inconsistent with the declared policy |
| anchoring | gallery anchors become logical; `/utv/` reproduces the same measured anchor positions as before | re-measurement shows `/utv/` anchor positions changed, even if no `/utv/` code was intentionally modified |

Two of these rows encode decisions, not just thresholds:

- **The key-mapping row is not testable before the policy exists.** Its
  acceptance criterion is deliberately written against "the chosen policy",
  because §2.3 established only that the mapping does not respond to direction
  at all — which mapping is *correct* is the owner call in §2.4. The row does
  not pretend a measurement can precede that decision.
- **The `/utv/` anchor no-op is demonstrated by measurement, not by diff.**
  "We didn't edit that code" is not evidence — the mechanism is emergent (flex
  following document direction), and shared logic can change the rendered
  result without a textual edit to `/utv/`. B-7 already taught this in the
  other direction: the delivery mechanism decides where a delta lands, so the
  acceptance artifact for a claimed no-op is the reproduced anchor readings,
  not the absence of a hunk.

"Post-settle" in the transform row is load-bearing: the LTR baseline falsified
instrument v1 on exactly this (§1), so an acceptance run that read boxes
mid-transition would accept nothing and reject a working fix.

---

## 3. What this milestone deliberately does not do

- **No fix.** The four B-5 sites are untouched; this commit adds an instrument
  and a report.
- **No swipe measurement** — unvalidated input path.
- **No gate.** Nothing here asserts anything about the corpus; the gates were
  deliberately not run over the diagnostic build.
- **No claim about Arabic prose.** Direction-only mechanics transfer
  (ADR-11 §6); nothing here says anything about bidi flanking, typography or
  line breaking.

## 4. Reproduction

```
# worktree (rule 17) — once
git worktree add --detach <scratchpad>/b5b-rtl HEAD
cmd /c mklink /J <scratchpad>\b5b-rtl\node_modules <repo>\node_modules

# LTR baseline, then flip de -> dir:'rtl' in the WORKTREE's src/lib/i18n.ts and rebuild
(cd <worktree> && npx astro build)

# measure (Git Bash rewrites bare /de/ into a Windows path — instrument doc §4.3;
#  pass a Windows-style --root and disable conversion, or use PowerShell)
MSYS_NO_PATHCONV=1 node scripts/rtl/measure-carousel.mjs \
  --root <worktree>/dist --home /de/ --utv /de/utv/ --json out.json
```

The worktree is left in place with the RTL build intact — it is the browser
surface milestone 3 (touch) needs, exactly as Track B's was for B-6/B-7.
Dispose per ADR-11 §5 (junction first). Raw readings from this run:
`b5b-m2-ltr.json` / `b5b-m2-rtl.json` in the session scratchpad; the instrument
regenerates them in ~90 seconds against any built tree.

**Provenance.** The worktree directory is not the evidentiary artifact — the
artifact is the triple *(detached worktree, detached commit, measurement log)*.
Without the recorded commit, a reading loses its claim to reproducibility,
because nothing proves what tree was actually built and measured (rule 9's
constant-tree requirement, extended across sessions). This run's commit is
`e4d56c8` (§1). Standing procedure from here: **record the worktree's detached
HEAD at the start of every milestone that measures in it**, before the first
reading — `git -C <worktree> rev-parse HEAD` — and cite it next to the
readings.
