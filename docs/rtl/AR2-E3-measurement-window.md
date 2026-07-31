# AR-2 Track E, E-3 — the stable editorial measurement window

**METHOD citation:** rules 1 · 3 · 4 · 8 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. **Baseline:** `90ba4d6` (E-2). No corpus authored, no gate changed.
**Instrument:** [`scripts/rtl/measure-prose-window.mjs`](../../scripts/rtl/measure-prose-window.mjs) (new, not wired).

> ⚠ **Milestone naming.** The frozen [Track E brief](AR2-TrackE-brief.md) defines **E-3** as
> B-8b, the Arabic seam rule. The owner scoped *this* E-3 as floor stabilisation. Recorded
> here rather than reconciled, per the freeze: **E-5 owns the reconciliation**, and B-8b
> remains unstarted and corpus-unblocked.

---

## 1. The window, and what each exclusion is for

A rendered Arabic page decomposes into five **disjoint** components. The instrument asserts
the partition rather than assuming it — the five sum to the whole page, exactly, on 9 of 9
pilot pages.

| Component | Selector | Included in the editorial window? | Why |
|---|---|:--:|---|
| **prose** | `<main>` minus the three below | **✔ yes** | the only component a translator writes |
| related-articles | `section.related-articles` | ✘ no | **§2** — its contents are a function of registry cardinality |
| tour-cta | `div.tour-cta` | ✘ no | shared conversion block, identical on every spoke; carries **B-16** |
| author-byline | `div.author-byline` | ✘ no | shared attribution block, template-generated |
| chrome | everything outside `<main>` | ✘ no | nav + footer; E-1 measured it as a near-constant |

The three in-`<main>` exclusions are not stylistic. Measured sizes across the pilot:
**prose 108 002 chars · related 7 429 · cta 855 · byline 570 · chrome 8 854.** Every
character in the middle three is written by a component, not by a translator, so including
them means a floor partly measures the template.

⚠ **The block extractor matches nesting depth, not the first close tag.** A non-greedy
`<div class="tour-cta">[\s\S]*?</div>` stops at the close of an inner `<div>` and truncates
the block. That is B-5a's verifier bug in a second costume — *a pattern that finds a
plausible terminator is not one that finds the right one* — and it is why the partition
check exists and is printed.

---

## 2. The instability, isolated by differential rather than argued

E-2 found that E-1's per-term Arabic figures did not reproduce. E-3 has two built trees and
can therefore isolate the cause instead of inferring it: the **pre-B-15 build** carries **1**
Arabic pilot route registered; the current build carries **9**. One route
(`utv/best-utv-trails-vernal`) exists in both, and its **prose was edited exactly once** in
between — B-15 stage 2 replaced *"contact Adventure Tours Vernal"* with *"the number is
(435) 219-9447"*.

Δ on that one shared route, per component:

| Term | Δprose | Δrelated | Δcta | Δbyline | Δchrome | **Δwhole** |
|---|---:|---:|---:|---:|---:|---:|
| `Vernal` | **−1** | **+8** | 0 | 0 | 0 | **+7** |
| `Kawasaki KRX 1000` | 0 | **+2** | 0 | 0 | 0 | **+2** |
| `Adventure Tours Vernal` | **−1** | 0 | 0 | 0 | 0 | **−1** |
| every other candidate (10) | 0 | 0 | 0 | 0 | 0 | 0 |

Three things are settled by this table and none of them was settled before it:

1. **The entire instability lives in `related-articles`.** `chrome`, `cta` and `byline` moved
   by zero on every one of the thirteen candidates.
2. **The prose window moved only by the documented content edit.** `Vernal` −1 and
   `Adventure Tours Vernal` −1 are the same edit counted twice — the deleted clause contained
   `Adventure Tours Vernal`, which contains `Vernal`. Nothing else moved. The prose window is
   stable with respect to registry cardinality.
3. **It reproduces E-2's discrepancy exactly.** `Vernal` +7 and `KRX` +2 are the figures E-2
   could only report as unexplained. −1 + 8 = +7; the arithmetic closes.

**The mechanism.** A related card renders a sibling route's **title and description**. While
a locale is mid-rollout, each new registered route flips some sibling's card from English to
that locale — so the measured content of the window changes on pages nobody edited, and keeps
changing until the locale is complete.

> **A measurement window whose contents depend on registry cardinality cannot define a
> stable editorial floor.** It is not that the window measures the wrong thing; it measures
> the right thing plus a term that is in flux for the entire duration of a rollout.

---

## 3. ⚠ The constraint that decides E-4: gate 4i does not enforce over this window

`gate-4i-glossary.mjs:377` extracts with `extractVisibleText(html, { inlineSeparator: '' })`
over the **whole rendered page**. That is the `whole` column — related block included.

So the two windows have different jobs, and conflating them is the trap:

- The **prose window decides** what the floor should be, because it is the only one that
  measures a translator.
- The **whole-page window enforces** it, because that is what the gate reads.

A floor is therefore only meaningful if it **exceeds the non-prose contribution**, or the
gate can be satisfied without a translator writing anything. That is E-0's *"a floor made of
chrome enforces nothing"* — with a second, larger, and **growing** contributor now measured
beside chrome.

---

## 4. B-11 floor candidates, recomputed on the stable window

Pilot corpus, 9 Arabic spokes. `non-prose` = related + cta + byline + chrome.

| Candidate | prose | non-prose | prose ÷ non-prose | min/page | Verdict |
|---|---:|---:|---:|---:|---|
| `Adventure Tours Vernal` | 39 | 4 | **9.75** | 2 | **eligible** |
| `Uintah Basin` | 11 | 1 | **11.00** | 0 | **eligible** |
| `Green River` | 6 | 0 | **∞** | 0 | **eligible** (small) |
| `المسارات` *(offroad-trail)* | 32 | 9 | **3.56** | 1 | **eligible** |
| `Kawasaki KRX 1000` | 39 | 19 | **2.05** | 2 | **eligible** |
| `Moonshine Arch` | 16 | 9 | 1.78 | 0 | weak |
| `Vernal` | 178 | 109 | 1.63 | 10 | weak |
| `Dinosaur National Monument` | 23 | 15 | 1.53 | 0 | weak |
| `Outlaw Trail` | 11 | 9 | 1.22 | 0 | weak |
| `Asphalt Ridge` | 9 | 9 | 1.00 | 0 | **ineligible** |
| `Ashley Gorge` | 8 | 9 | 0.89 | 0 | **ineligible** |
| `أرض الديناصورات` *(dinosaur-country)* | **14** | **18** | **0.78** | 0 | **ineligible** |
| `Doc's Beach` | 3 | 9 | 0.33 | 0 | **ineligible** |

### 4.1 ⚠ Two corrections to figures this project has already recorded

**(a) E-2 §5 overstated the `dinosaur-country` prose contribution.** E-2 reported *body 23 /
chrome 9*, reading "body" as `<main>`. Decomposed properly, **9 of those 23 are
`div.tour-cta`** — the shared block whose value-prop string contains `أرض الديناصورات` on
every spoke. The translator contribution is **14**, not 23, and it is **exceeded by the
template contribution of 18**. E-0 predicted this lock would be chrome-dominated and was
argued out of it by E-2's larger number; E-0 was right, and the intermediate figure was an
artifact of an under-decomposed window. **Rule 18, on my own measurement from one milestone
ago.**

**(b) `Vernal` is not the strong candidate its raw count suggests.** 178 prose occurrences
against 109 non-prose is a ratio of 1.63 — weaker than `Kawasaki KRX 1000`, which has a
fifth as many occurrences. Absolute frequency is not floor strength; **the ratio is.**

### 4.2 Why four candidates cannot carry a floor at all

`Doc's Beach`, `Asphalt Ridge`, `Ashley Gorge` and `أرض الديناصورات` each have **at least as
many non-prose as prose occurrences**. For these, *any* whole-page floor the corpus satisfies
today is also satisfied by the template alone, so the gate would be green on a build in which
a translator deleted the term from every page. A green floor there is not weak evidence — it
is **no evidence**, which is the specific failure mode gate 4i's `bound: floor` exists to
prevent.

They are not defects. `Doc's Beach` appears 9 times in chrome because it is a nav/footer link
and 3 times in prose because only one pilot article is about it. **The right response is to
give them no floor**, not to lower one until it passes.

### 4.3 The floor model E-4 should apply

Since enforcement is whole-page, the enforced number must carry the non-prose term:

```
floor_enforced  =  non_prose_observed  +  prose_margin
```

where `prose_margin` is how much translator output the floor is meant to require. With the
pilot's numbers, requiring **half** the observed prose to survive gives:

| Lock | non-prose | prose | `prose_margin` (½) | **floor_enforced** |
|---|---:|---:|---:|---:|
| `Adventure Tours Vernal` | 4 | 39 | 20 | **24** |
| `Kawasaki KRX 1000` | 19 | 39 | 20 | **39** |
| `المسارات` | 9 | 32 | 16 | **25** |
| `Uintah Basin` | 1 | 11 | 6 | **7** |

⚠ **`non_prose_observed` is measured at a corpus size and expires with it.** Because the
related contribution moves for as long as the rollout does, every floor set this way must be
**re-measured at each expansion**, and the re-measurement is not optional bookkeeping — a
floor left alone while `related` grows silently converts into a floor the template can
satisfy. The alternative, which removes the expiry entirely, is to give gate 4i a window
option so `ar` floor locks are enforced over prose; that is a **gate change and therefore out
of E-3's scope**, and it is recorded here as the recommendation E-4 should weigh against the
re-measurement cost.

---

## 5. Deliberately not done

- **No floors were set.** E-3 produces the model and the inputs; writing
  `i18n-gates/4i-glossary.json` is E-4's deliverable, and setting them here would repeat the
  stale-baseline shape acceptance item A8 exists to prevent.
- **No gate changed**, per scope — including the 4i window option §4.3 recommends.
- **No corpus authored**, per scope.
- **The briefs stay frozen.** §4.1's corrections and the translator findings live in phase
  reports and in [`AR2-E3-translator-addendum.md`](AR2-E3-translator-addendum.md); E-5
  reconciles them against the frozen documents.
- **B-8b (the brief's E-3)** remains unstarted. The pilot corpus that unblocks it now exists.

**Reproduce:**

```
node scripts/rtl/measure-prose-window.mjs
node scripts/rtl/measure-prose-window.mjs --baseline <older-dist>   # the stability test
```
