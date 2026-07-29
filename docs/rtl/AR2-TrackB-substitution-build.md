# AR-2 Track B — the substitution build, and what it measured

**Status: DIAGNOSTIC RUN COMPLETE, 2026-07-28.** No source change to the repository.
Owner decisions (a)–(d) from `AR2-TrackB-brief.md` §7 are recorded in §6.

---

## 1. How it was run — worktree, not the live registry

The brief proposed flipping `de` in `src/lib/i18n.ts`, rebuilding, and reverting. That is
correct in substance but **unsafe in this tree**: the `k` auto-commit bot is active and has
already swept three phases' source files into commits before they could be staged. A
`dir:'rtl'` on a shipped locale sitting in the working tree for the ~5 minutes of a build is
exactly the window that bot commits and pushes in.

So the flip was made in a **detached worktree** instead:

```
git worktree add --detach <scratchpad>/rtl-diag HEAD
New-Item -ItemType Junction  rtl-diag\node_modules -> <repo>\node_modules
sed -i "s/'de'.*dir: 'ltr'/'de'.*dir: 'rtl'/" src/lib/i18n.ts    # one line
npm run build
```

`git status` in the primary tree stayed empty throughout and `de` is still `dir: 'ltr'` at
`src/lib/i18n.ts:60`. **The technique generalizes: any future substitution proof should use a
worktree, not the live tree.** The `node_modules` junction makes it cost ~10s to set up rather
than a full `npm install`.

⚠ Two commits (`b3d03a7`, `e737785`) landed from the V-1 workstream *during* this session.
Neither touched Track B files. Nothing was lost and nothing of theirs was altered.

---

## 2. The build result

620 pages. `de` = 77 pages, **all 77 carrying `<html dir="rtl">`** (plus `ar` = 78 total).
The substitution works exactly as B-1 demonstrated.

| gate | exit | meaning |
|---|---|---|
| `validate-site`, 4m, 4f, 4h, 4i, 4g | 0 | direction-blind, as designed |
| **4k direction integrity** | **0** | followed the registry flip without any other edit — B-1's claim reconfirmed |
| **4n bidi isolation** | **1** | **290 findings across 76 of 77 routes** |

⚠ **`npm run build` FAILED.** The background invocation piped through `tail`, so the reported
exit 0 was `tail`'s. Re-running the gates directly gives the table above. Recorded because the
first reading of that run was wrong and the correction is the whole result.

**This is the substitution build earning its cost on the first run.** Gate 4n shipped green
against a 1-page Arabic corpus and the brief flagged that green as proving nothing. Given a
populated RTL surface it goes red immediately.

---

## 3. ⚠ The 290 findings do NOT transfer to Arabic — a limit the brief did not anticipate

The brief bounded the technique as proving "layout and glyph behaviour" and proving nothing
about "typography, fonts or line breaking." **That bound is too narrow. It also does not model
bidi flanking**, which is the one thing 4n measures.

ADR-10's rule is a *flanking-type* rule. In the substitution build the flanks are **German**:

```
Route: /de/utv/   "(" in <div>  flanked L … N
    Piste Buchen 📞 (435) 219-9447
```

`L … N` — Latin on one side, digits on the other. In real Arabic prose the same phone number
is flanked `R … N`, which resolves differently under UAX #9 N1/N2. **So the 290 are real
defects of this diagnostic build and not a forecast of the Arabic corpus.** The count is an
artifact of the measurement window — the sixth instance of that lesson on this project.

What the run *does* prove, and this is worth having:

- 4n is live, sensitive, and fails closed on a populated RTL surface.
- The defect *class* (parenthesized phone numbers emitted by shared chrome) reaches
  essentially every route, so whatever Arabic's flanking resolves to, the call sites are
  site-wide and the fix route is `src/lib/bidi.ts`, not per-page.

**Do not cite 290 as an Arabic defect count.**

---

## 4. Decision (b) — the gradients are settled by measurement, not by eye

The brief's form-inspection judgement was that the 216 `gradient-directional` hits are
decoration, and flagged it as needing an eye. Measured on the RTL corpus, the population
collapses much further than "216 judgement calls":

| declaration | count | verdict |
|---|---:|---|
| `linear-gradient(135deg, var(--burnt-orange, #d4764e) …)` | **58** | one brand colour wash, repeated |
| other `135deg` translucent washes (5 distinct) | 5 | same class |
| `linear-gradient(135deg,#27AE60,#229954)` / `#D2691E,#8B4513` / `#1a3c5e,#0d2b45` | 4 | same class |
| `linear-gradient(90deg, var(--desert-gold), var(--burnt-orange), var(--desert-gold))` | 1 | **symmetric palindrome** — a 4px `::before` banner rule. Mirroring it is a literal no-op. |

And the two things that *would* make a gradient direction-bearing are both **absent**:

- `linear-gradient(to left …)` / `to right` anywhere in `dist`: **0**
- gradient used as a `mask` / fade edge (the affordance case — a scroll-edge fade must
  follow reading order): **0**

**So there is no correctness content in the gradient bucket at all.** 70 rendered hits reduce
to one decorative token repeated, one palindrome, and a handful of sibling washes. The only
question left is the aesthetic one — should a 135° diagonal wash tilt the other way in an RTL
page — and that has no defect behind it either way.

**Recommendation: rule the gradient class out of scope for Track B**, and record it in the
audit config as a rejected candidate rule so it is not re-proposed. That is the same treatment
`de Startpunkt` / `zh 指南` / `de Trail` already have in the census config.

This drops `mirror-required` from 472 → ~243 (brief) → **~229 actionable**, and more
importantly removes the 48%-false-positive gate hazard the brief identified.

---

## 5. Decision (c) — the carousel is 2 implementations, not 16 sliders

The brief sized B-5 as "16 sliders … the real cost is the 8× duplication." Measured:

```
home.ts  translateX at lines 416, 929, 1442, 1955, 2468, 2981, 3494, 4007
         owning const: (top level=EN), ES, IT, PT, FR, DE, JA, ZH
utv.ts   translateX at lines 392, 787, 1186, 1586, 1981, 2383, 2778, 3173
         owning const: (top level=EN), ES, IT, PT, FR, DE, JA, ZH
```

**The duplication axis is locale, not feature.** Each locale block is a whole-page template
literal that carries its own inline `<script>`. And the copies are **byte-identical**:

| file | implementation | copies | distinct hashes |
|---|---|---:|---:|
| `home.ts` | `class Carousel` (L378–435), `.carousel-track` | 8 | **1** (`dac0dfb148fd`) |
| `utv.ts` | IIFE `goTo()` (L381–403), `.docs-beach-carousel-track` | 8 | **1** (`b4b9bfa379c8`) |

Zero divergence. So consolidation is not a risky refactor across 8 locales — it is hoisting
two string constants, and it has a **perfect verification**: the rendered `dist` must come out
**byte-identical**, because the emitted script text is unchanged. That is the same bootstrap
proof B-2 Phase A used.

### ⚠ And the count of 16 undercounts the work

`translateX` is not the only direction-coupled behaviour. In `home.ts`'s `Carousel`:

| behaviour | site | counted by the brief? |
|---|---|---|
| `translateX(-i*100%)` against a flex track | L416 | yes |
| `if (e.key === 'ArrowLeft') this.prevSlide()` / `ArrowRight` → next | L395–396 | **no** |
| touch swipe: `touchStartX - changedTouches[0].screenX`, `diff > 0 ? next : prev` | L428–431 | **no** |

Counts: `ArrowLeft` ×8, `ArrowRight` ×8, `touchStartX` ×24, `screenX` ×16 — all in `home.ts`,
none in `utv.ts`. In RTL, ArrowLeft should advance and a leftward swipe should go *back*; both
are inverted, and neither is greppable as `translateX`.

**True direction-coupled surface: 3 behaviours × 8 copies (home) + 1 × 8 (utv) = 32 sites of 4
kinds — not 16 of 1.** After consolidation it is **4 sites in 2 files.**

This is the recorded-size lesson running in the *opposite* direction for the first time on this
project: every prior instance shrank a number, this one doubles it.

### Revised blast radius — B-5 is smaller than B-6/B-7, not larger

Also measured on the RTL corpus: the carousel renders on **2 of 77 routes** (`/de/` and
`/de/utv/`). Arrows appear on many more. So B-5 is the *deepest* item but the *narrowest*, and
the brief's sequencing (B-6 → B-7 → B-5) is confirmed correct for a different reason than it
gave.

**Recommendation: consolidate first, then fix once.** The copies are byte-identical, the
no-op proof is exact, and the alternative is 32 hand-edits of 4 different kinds across 2 files.

---

## 6. The four decisions, as answered

| | decision | outcome |
|---|---|---|
| **(a)** | substitution build | **Approved and executed**, in a worktree rather than the live tree (§1). Diagnostic only; nothing committed. |
| **(b)** | gradients | **Deferred by the owner pending inspection; §4 now settles it by measurement.** 0 direction-bearing gradients exist. Recommend ruling the class out of scope and recording it as a rejected rule. |
| **(c)** | carousel duplication | **De-duplicate first.** The 8 copies are byte-identical, so consolidation is mechanical with an exact no-op proof, and the real fix surface is 4 behaviours, not 1. |
| **(d)** | does Track B block Arabic expansion | **Softened, per owner.** Restated: *Track B blocks expansion onto presentation-heavy routes* — which measures as the homepage and `/utv/` (the only carousel routes) plus the arrow-dense hubs. Spoke pages carrying no carousel, no `▶` and no physical box properties are not blocked. |

---

## 7. The diagnostic surface, as left

Worktree: `<scratchpad>/rtl-diag`, built, **not** removed — it is the browser surface decision
(a) exists to create. Served at `http://localhost:4331/`.

Highest-density routes, so inspection is 3 pages rather than 77:

| route | what it exercises |
|---|---|
| `/de/utv/` | carousel + 8 `→` + 1 `box-physical` — the densest page on the site |
| `/de/` | carousel + 4 `→` + the 1 `▶` play glyph |
| `/de/scenic-drives/` | 6 `→` + 2 `box-physical`, no carousel — isolates B-6/B-7 from B-5 |

To dispose of it: `git worktree remove --force <scratchpad>/rtl-diag` (the junction goes with
it; it does not touch the real `node_modules`).

Raw per-page measurements: `rtl-surface-de.json`, `rtl-surface-ar.json` in the scratchpad.

---

## 8. What this changes about sequencing

Nothing in the brief's order, but two of its sizes:

1. **B-6 arrows** — unchanged. Clean Unicode promotion, no browser.
2. **B-7 physical CSS** — unchanged. Mechanical, source-level.
3. **B-5 carousel** — now a *consolidation* task with an exact proof, followed by a 4-line
   direction fix, rather than 16 sign edits. Larger in scope, smaller in risk.
4. **Gradients** — removed from the work list (§4), not deferred.
5. **`rtl-inventory.mjs` promotion** — with gradients and `rotate` ruled out, `mirror-required`
   becomes `glyph:→` + `glyph:▶` + `translate-directional`, all three of which are decidable
   without judgement. That is a promotable rule set.
