# AR-2 B-5b, fix milestone — the direction-aware carousel

**Method rules applied:** 1 (measurement precedes implementation) · 4 (positive
control before negatives) · 5 (the instrument is a deliverable) · 6 (separate
the measurement from the thing measured) · 9 (constant tree across a
differential) · 10 (the environment silently alters the input to a
measurement) · 17 (invariant-violating diagnostics run in a detached worktree)

**Status: COMPLETE — B-5 is closed.** The fix lands exactly the work list
milestones 2–3 measured, nothing else: 2 transform sites, 1 key+swipe policy
site, 4 CSS declarations, **0 anchor work on `/utv/`** (rule 1 — the scope is
the measured list, not the R-1/R-2 suspicion that opened B-5). Acceptance is
by re-running the milestone-2/3 instrument against the same detached worktree,
per the frozen §2.5 table and the milestone-3 swipe row — every mechanism
green, LTR behaviour reproduced. Along the way the acceptance run itself
caught and fixed a real instrument defect (§5): the probe had been leaking an
entire headless-Edge process tree per run since milestone 1.

**Provenance** (standing procedure, milestone-2 §4): the worktree's detached
HEAD was recorded before the first acceptance reading —
`e4d56c85cabf53457422ffa4d7cc932d8afca88c` (= `e4d56c8`, the commit both prior
milestones measured), and its diff at that moment was the one-line `i18n.ts`
substitution and nothing else. The fix was then applied to the worktree as the
same patch committed here, so both sides of the acceptance differential are
*that checkout + this fix*, varying only the one-line flip (rule 9).

---

## 1. The owner decision, and how it was made

Milestone 2 §2.4 left one call no measurement had made: under RTL, do the
arrow keys (and, after milestone 3, the swipe) follow **reading direction** or
**physical direction**? The milestone-3 report required one decision to settle
both rows, and required the rationale to be recorded — measured
browser-native precedent or explicit product choice — so the acceptance
criterion for the key-mapping mechanism would not be a silent hard-coding.

The rationale here is **measured browser-native precedent**. The instrument is
`scripts/rtl/native-precedent.mjs` (`npm run measure:native-precedent`), built
on the milestone-1 probe: a self-contained fixture (no site code) with LTR and
RTL twins of the two horizontal widgets the platform itself owns — a native
horizontal scroll container (the widget class a carousel imitates) and a
stepped `<input type=range>`. It records which way the content view physically
moved; it does not know which answer is expected (rule 6), and the
interpretation lives here, not in the script.

The readings are unanimous — **12 of 12 cells are physical**:

| widget, RTL build | input | reading |
|---|---|---|
| scroll container | ArrowRight | view moves physically right — toward *earlier* content (edges 7..5 → 6..4) |
| scroll container | ArrowLeft | view moves physically left — toward *later* content (7..5 → 8..6) |
| scroll container | finger-left drag | content follows the finger; view moves right (7..5 → 6..3) |
| scroll container | finger-right drag | content follows the finger; view moves left (7..5 → 9..6) |
| `<input type=range>` | ArrowRight | value 5 → 4 — the thumb follows the key physically, against value order |
| `<input type=range>` | ArrowLeft | value 5 → 6 |

(The LTR twins read physical too, trivially; raw JSON in the session
scratchpad, `native-precedent.json`. The two widget classes agree, so no
adjudication between them was needed; had they disagreed, the scroll container
would have governed — it, not the value slider, is what a carousel imitates.)

**Adopted policy: physical-direction semantics for both keyboard and swipe.**
Under RTL the deck lays out right-to-left, so the slide *after* the current
one sits physically left, and the policy resolves to: **ArrowLeft → next,
ArrowRight → prev, finger-right swipe → next** (content follows the finger).
Under LTR every mapping is byte-for-byte the current behaviour. The rejected
alternative — keeping ArrowRight = next everywhere ("logical forward on the
right key") — is recorded here so it is not re-proposed: it is the mapping the
platform measurably does *not* use, and it would make the key walk the deck in
the opposite direction to the identically-labelled on-screen buttons beside it.

## 2. What changed

Four fix sites, exactly the milestone-2 §2.4 list. Both carousels read
**effective** direction from computed style, not the `dir` attribute — the two
hosts declare direction in opposite shapes (ADR-9; gate 4k tests effective
direction for the same reason).

- `src/page-content/home.ts` (`HOME_CAROUSEL_JS`): the constructor computes
  `this.rtl = getComputedStyle(this.track).direction === 'rtl'` once;
  - transform (old line 63): `translateX(${i * (rtl ? 100 : -100)}%)` — under
    RTL the track now moves right as the flex layout grows left;
  - key mapping (old 41–43): ArrowLeft/ArrowRight swap `prevSlide`/`nextSlide`
    under RTL (physical policy, §1);
  - swipe (old 75–78): displacement is sign-flipped under RTL
    (`forward = rtl ? -diff : diff`), same 50px threshold.
- `src/page-content/utv.ts` (`DOCS_BEACH_CAROUSEL_JS`): the transform sign,
  identically. No keyboard or swipe exists there (milestone 1).
- `public/styles.css`: the four physical anchor declarations become logical —
  `.carousel-prev { inset-inline-start: 20px }` / `.carousel-next {
  inset-inline-end: 20px }` and the 10px pair at the mobile breakpoint. The
  `‹`/`›` glyphs inside those buttons need no work: both are
  `Bidi_Mirrored=Yes` (the same property that exempted the 1,004 breadcrumb
  chevrons in AR-1), so the glyph mirrors with the side swap and keeps
  pointing at the content it fetches.
- **Deliberately untouched: `/utv/` button anchors** — flex children mirror on
  their own; milestone 2 measured that a "fix" here is a break. The no-op is
  proved in §4 by re-measurement, not by this sentence.

One consequence stated plainly: the carousel scripts ship inline on every
page, so the rendered bytes of all 620 pages change in **all** locales. The
LTR claim below is behavioural parity, measured — not a byte no-op.

## 3. Acceptance, mechanism by mechanism

Per milestone-2 §2.5 and the milestone-3 swipe row: acceptance is decided by
re-running `measure-carousel.mjs` (with `--swipe`) over two builds of the
fixed worktree, LTR first (rule 4 — the baseline is the in-environment
positive control), then the one-line flip. All four primary-build controls
were re-run first and pass: `control:keyboard`, `control:keyboard:falsify`,
`control:touch`, `control:touch:falsify` — so the input paths below are live
and the instrument's red is demonstrably reachable.

| mechanism | §2.5 acceptance | measured (RTL build) | verdict |
|---|---|---|---|
| transform | every traversal path converges on 100% post-settle visibility | rest 100 · autoplay 100 · ArrowLeft 100 · ArrowRight 100 · swipe-right 100 · swipe-left 100 · utv rest 100 · utv next 100 · utv prev 100/99† | **ACCEPTED** |
| key mapping | index deltas consistent with the declared policy | ArrowLeft **+1**, ArrowRight **−1**, both inside runway — the physical policy's predicted signs | **ACCEPTED** |
| anchoring | gallery anchors logical; `/utv/` reproduces its measured positions | gallery prev/next mirror to l=1263/263 (LTR: 263/1263, byte-identical to baseline); `/utv/` reads prev r-side l=1297 · next l-side l=233 — **exactly milestone 2's RTL readings** | **ACCEPTED** |
| swipe reachability | `hitTarget` inside the track; both gestures move | `hitTarget: IMG, insideTrack: true` on both; swipe-right **+1**, swipe-left **−1** (physical policy) | **ACCEPTED** |

† the one 99% cell (utv prev back to index 0) read 100% in the first
acceptance run of the same build — a 1px rounding at a box edge, bracketed by
the run pair, nowhere near the falsifier (which is 0%).

**LTR regression** — same fixed worktree, flip reverted, rebuilt: every stable
cell reproduces the committed milestone-2/3 baseline — anchors l=263/1263 and
utv 233/1297 byte-identical, autoplay +1, ArrowLeft −1, ArrowRight +1,
swipe-right −1, swipe-left +1, transforms negative, all post-warm-up
visibility cells 100%. Two early cells read 92%/28% in one run and 98%/78% in
its twin — the milestone-3 §2 load-noise signature (the first readings on a
105-image page), re-confirmed by taking the same stability pair milestone 3
took. Since the eight LTR locales interpolate the same constant, `/de/`
stands for all of them; the four green controls above are the English-master
reading.

## 4. What the acceptance run caught in the instrument (rule 10)

The first LTR stability re-run returned no reading — and pulling that thread
found the environment quietly rotting under every measurement this phase has
taken: **the probe leaked one full headless-Edge process tree per run, every
run, since milestone 1.** The spawned `msedge.exe` is only a launcher — it
exits 0 seconds after handing off to a re-parented browser tree (~14
processes), so the `edge.kill()` teardown, and even `taskkill /T` on the held
PID, kill nothing. Eight accumulated trees (~130 processes) eventually broke
the measurement path itself: EBUSY on `DevToolsActivePort`, load-event
timeouts, and **one falsification run red for the wrong reason** (an autoplay
advance drifted into the observation window on the loaded machine — the exact
shape milestone 3 warned falsify mode must never produce). That red was
environment, not handler: on the cleaned machine the same falsification
passes, and the fixed handler is still `screenX`-only, invisible to a
vertical swipe by construction.

`probe.mjs` teardown is rewritten: `Browser.close` over CDP is the
authoritative kill (the only handle that survives the launcher hand-off),
with a profile-dir-matched process sweep as the fallback for startup
failures, a retry on the EBUSY-locked port file at startup, and a retrying
profile-dir removal. Verified: a full probe cycle now leaves **zero**
`rtl-probe` processes. These changes live entirely outside the measurement
window (setup-wait and post-reading teardown), so they cannot alter a
reading; the canonical RTL acceptance JSON was nevertheless re-produced with
the final instrument, and the LTR pair's readings match their pre-fix twin
cell-for-cell on every stable cell.

## 5. What this milestone deliberately does not do

- **No gate.** Carousel behaviour has an instrument, not a gate; nothing here
  asserts anything about the corpus, and the diagnostic worktree builds
  continue to skip the gate chain deliberately. The primary tree builds green
  through the full `build` chain (4j/4o source gates, 4k/4n/4f/4h/4i/4g dist
  gates) with the fix in place.
- **No `/ar/` visual claim.** `ar` still registers one route and no carousel
  page; what transfers is direction-only mechanics, exactly the ADR-11 §6
  scope both measurement milestones claimed and no more. When the Arabic
  corpus lands, the acceptance surface is this same instrument run over
  `/ar/` routes.
- **No swipe/key gate-keeping of the policy.** The policy is recorded (§1),
  cited in the code comment at the constant, and testable by re-running the
  instrument; a future owner reversal is one conditional per site plus a
  re-run.

## 6. Reproduction

```
# policy precedent (self-contained fixture; ~60s)
npm run measure:native-precedent

# controls on the primary build — nothing below is citable unless all four exit 0
npm run control:keyboard && npm run control:keyboard:falsify
npm run control:touch    && npm run control:touch:falsify

# acceptance differential — worktree discipline as milestone 2 §4:
# LTR: worktree at the fix commit, npx astro build, measure with --swipe;
# RTL: apply the one-line de -> dir:'rtl' flip, rebuild, re-measure.
MSYS_NO_PATHCONV=1 node scripts/rtl/measure-carousel.mjs \
  --root <worktree>/dist --home /de/ --utv /de/utv/ --swipe --json out.json
```

Raw readings in the session scratchpad: `native-precedent.json`,
`b5b-fix-rtl.json` / `b5b-fix-rtl-final.json` (the RTL pair; the latter is
canonical, produced by the final instrument), `b5b-fix-ltr.json` /
`b5b-fix-ltr-run2.json` (the LTR stability pair). The detached worktree is
left standing as the continuing acceptance surface — at `e4d56c8`, carrying
the one-line flip plus this fix as its only diff, RTL build intact. A future
reproduction that starts fresh should detach a worktree at *this fix's
commit* (`b76de42`) instead and apply only the flip.
