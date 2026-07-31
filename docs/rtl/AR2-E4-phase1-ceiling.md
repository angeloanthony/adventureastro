# AR-2 Track E, E-4 Phase 1 — is the non-prose contribution structurally bounded?

**METHOD citation:** rules 1 · 3 · 4 · 8 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. **Baseline:** `351b614` (E-3). No floors selected, gate 4i unmodified,
no corpus authored — per scope.

**The question.** E-3 left `floor_enforced = non_prose_observed + prose_margin` with an
expiry: `non_prose_observed` was measured at a corpus size and drifts as the corpus grows.
Phase 1 asks whether that term can be replaced by a **ceiling** computed from the rendering
model, which would remove the expiry and make the Option A / Option B choice unnecessary.

**The answer: yes, with one residual — the ceiling is per page, and page count is the only
thing that still moves it.**

---

## 1. The five structural questions, answered from the component

Source: [`RelatedArticles.astro`](../../src/components/content/RelatedArticles.astro).

| # | Question | Answer | Structural or corpus-dependent? |
|---|---|---|---|
| 1 | Is the card count fixed? | **`limit = 4`**, enforced in `take()` by `picked.length >= limit`. No caller overrides it — `SpokeLayout.astro:66` passes no `limit`, and it is the only caller. | **structural** |
| 2 | Can a page render more than four? | **No.** Four tiers all funnel through the same `take()` guard. | **structural** |
| 3 | Which rendered fields contribute? | Exactly two per card — `<h3>{card.title}</h3>` and `<p>{card.description}</p>` — plus one static section heading per page. `href` is an attribute and `extractVisibleText` strips tags, so links contribute nothing. | **structural** |
| 4 | Can a term repeat within one card? | **Yes**, across title and description independently. Bounded by the frontmatter schema: `title` ≤ 65 chars, `description` ≤ 165. | **structural bound, corpus-dependent value** |
| 5 | Is the target set bounded once every sibling exists? | **Yes.** `inLocale(e)` restricts candidates to the *current locale*, so the pool is exactly the registered Arabic files; selection is deterministic given the pool. | **structural** |

Four of five are properties of the rendering system. Only the per-card *value* depends on
what the corpus says — and §2 shows that value is computable today.

---

## 2. ⚠ A correction to E-3's stated mechanism

E-3 said each newly registered route *"flips some sibling's card from English to the locale."*
**That is wrong in detail, and the truth is simpler.** `inLocale(e)` filters candidates to the
page's own locale, so a locale with no siblings has **no candidates at all** — every tier
comes back empty, `cards.length === 0`, and `{cards.length > 0 && (…)}` renders **nothing**.

Measured on the two trees:

| | baseline (1 `ar` route) | current (9 `ar` routes) |
|---|---:|---:|
| `related-card` on `/ar/utv/best-utv-trails-vernal/` | **0** | **4** |
| `related-card` on every other `ar` spoke | — | **4** |

So the block did not change language — **it did not exist**, then appeared at full width.
That is why E-3's differential showed `Vernal` +8 on a page nobody edited: 0 cards → 4 cards.

The correction matters because it changes the shape of the drift. A "flipping" mechanism
would keep drifting for the whole rollout. **An appear-then-saturate mechanism has already
finished**: every Arabic spoke is at the 4-card cap today, and 4 is the maximum.

---

## 3. The ceiling, computed

`maxPerCard` is measured over the **57 English spokes' `title + description`** — the candidate
pool the completed Arabic rollout will translate. Policy §4.2 requires Latin names verbatim,
and E-2 measured `en`↔`ar` alignment at Δ 0 on all ten, so English frontmatter is a sound
predictor of Arabic card content. **This is a prediction and is therefore falsifiable** —
§5 says how.

| Term | maxPerCard | meanPerCard | **per-page related ceiling** (4 × max) | observed now (per page) |
|---|---:|---:|---:|---:|
| `Vernal` | 3 | 1.49 | **12** | 8.1 |
| `Dinosaur National Monument` | 2 | 0.16 | **8** | 0.2 |
| `Green River` | 2 | 0.04 | **8** | 0 |
| `Kawasaki KRX 1000` | 1 | 0.09 | **4** | 2.1 |
| `Adventure Tours Vernal` | 1 | 0.07 | **4** | 0.2 |
| `Uintah Basin` | 1 | 0.05 | **4** | 0.1 |
| `Doc's Beach` | **0** | 0.00 | **0** | 0 |
| `Moonshine Arch` | **0** | 0.00 | **0** | 0 |
| `Outlaw Trail` | **0** | 0.00 | **0** | 0 |
| `Asphalt Ridge` | **0** | 0.00 | **0** | 0 |
| `Ashley Gorge` | **0** | 0.00 | **0** | 0 |
| `المسارات`, `أرض الديناصورات` | **0** | 0.00 | **0** | 0 |

**Five §4.2 trail names and both Arabic locks appear in no spoke's title or description
anywhere in the corpus.** For those seven terms the related contribution is not merely small —
it is **structurally zero**, and their denominators are chrome and `tour-cta` only, both
template constants that E-3's differential showed moving by exactly zero.

### 3.1 The replacement for `non_prose_observed`

```
non_prose_ceiling(term, page) = chrome(term) + cta(term) + byline(term) + 4 × maxPerCard(term)
```

Every term on the right is either a template constant or derived from the frontmatter schema
and the candidate pool. **None of them is `related_observed`.** The expiry E-3 recorded is
removed — with the one residual in §4.

---

## 4. ⚠ What still moves: page count, and only page count

The ceiling above is **per page**. Gate 4i's floors are **corpus totals**, so:

```
corpus_ceiling = pages × non_prose_ceiling_per_page
```

Both prose and non-prose scale with page count, so the **ratio** is stable but a **total**
floor is not. The expiry therefore narrows from *"re-measure whenever any sibling registers"*
to *"re-measure whenever the Arabic page count changes"* — a deliberate, known, infrequent
event rather than a side effect of unrelated work.

That is a materially weaker condition, and it is the finding that should drive Phase 2:
**Option A's cost is now one recomputation per planned expansion, not continuous
rediscovery.** Whether that is cheaper than Option B's gate complexity is Phase 2's call, and
this document deliberately does not make it.

---

## 5. ⚠ The `Green River` result confirms the ratio refinement — and quantifies it

E-3 listed `Green River` as **eligible at ratio ∞** (prose 6, non-prose 0). The caution that
its denominator was *provisional rather than structural* is now measured: its ceiling is **8
per page**, because two English spokes carry it twice in `title + description`.

At the pilot's 9 pages that is a ceiling of 72 against 6 prose occurrences. **`Green River`
is not a strong floor candidate; it is a term whose denominator has not arrived yet.**
Contrast `Adventure Tours Vernal`, whose ratio is 9.75 for a *structural* reason — 2 chrome
occurrences and a ceiling of 4 — and which stays strong at any corpus size.

> **Restated as the selection rule Phase 2 should use:** rank candidates by
> `prose ÷ non_prose_ceiling`, never by `prose ÷ non_prose_observed`, and never by raw
> frequency. The three orderings disagree, and only the first is stable.

### 5.1 The falsifier

The ceiling rests on English frontmatter predicting Arabic frontmatter. It is wrong if an
Arabic `title` or `description` uses a §4.2 name more often than its English source does.
**Re-running `measure-prose-window.mjs` after each expansion and finding observed related
above `4 × maxPerCard` falsifies it**, and the per-card figures in §3 are recorded here so
that comparison is possible rather than rhetorical.

---

## 6. ⚠ Applying the ceiling reverses part of E-3's eligibility table — in both directions

E-3 ruled a candidate ineligible when `prose ≤ non_prose_observed`. **That is the wrong test.**
It asks how much of today's count is template; the question a floor actually poses is whether
a number exists that the template *cannot reach*:

```
a floor is FEASIBLE  ⟺  non_prose_ceiling  <  observed whole-page count
```

Feasible means a floor can sit strictly above everything the template can produce while still
passing on today's corpus. Run over the pilot (`ceilNP` = chrome + cta + byline + 4 × maxPerCard × 9):

| Term | prose | ceilNP | whole | Feasible? | E-3 said |
|---|---:|---:|---:|:--|:--|
| `Vernal` | 178 | 144 | 287 | **yes** — headroom 143 | weak |
| `المسارات` | 32 | 9 | 41 | **yes** — headroom 32 | eligible |
| `Kawasaki KRX 1000` | 39 | 36 | 58 | **yes** — headroom 22 | eligible |
| `Moonshine Arch` | 16 | 9 | 25 | **yes** — headroom 16 | weak |
| **`أرض الديناصورات`** | 14 | 18 | 32 | **yes** — headroom 14 | **ineligible ✘** |
| `Outlaw Trail` | 11 | 9 | 20 | **yes** — headroom 11 | weak |
| **`Asphalt Ridge`** | 9 | 9 | 18 | **yes** — headroom 9 | **ineligible ✘** |
| **`Ashley Gorge`** | 8 | 9 | 17 | **yes** — headroom 8 | **ineligible ✘** |
| `Adventure Tours Vernal` | 39 | 38 | 43 | yes — headroom **5**, marginal | eligible |
| **`Doc's Beach`** | 3 | 9 | 12 | **yes** — headroom 3, marginal | **ineligible ✘** |
| **`Dinosaur National Monument`** | 23 | 85 | 38 | **no** — ceiling exceeds by 47 | **weak ✘** |
| **`Uintah Basin`** | 11 | 36 | 12 | **no** — ceiling exceeds by 24 | **eligible ✘** |
| **`Green River`** | 6 | 72 | 6 | **no** — ceiling exceeds by 66 | **eligible ✘** |

**Six of thirteen change verdict, and not all in the same direction.** Four terms E-3 called
ineligible are feasible — including the existing `dinosaur-country` lock — because their
related ceiling is **zero**, so their entire denominator is the differential-stable
chrome + `tour-cta` constant. Two terms E-3 called eligible are infeasible, and one it called
weak is infeasible.

### 6.1 Feasibility and strength are different questions

E-3 conflated them. Both are worth carrying into Phase 2:

- **Feasible** — a floor exists that the template alone cannot satisfy. It therefore detects
  **total deletion** of the term from the corpus.
- **Strong** — the headroom is large relative to prose, so the floor also detects **partial
  drift**, not just wholesale removal.

`أرض الديناصورات` is the clean example. E-3 said a floor on it would be "no evidence." That
was **too strong**: with `ceilNP` 18 and whole 32, a floor of 24 requires at least 6
occurrences to come from prose, so a build that dropped the term entirely fails. It is weak
evidence — it catches deletion, not erosion — which is a materially different claim from none.

### 6.2 What this does to the A/B decision

It **supports the simpler model**, which is worth stating plainly because the ceiling is
conservative and could have gone the other way: **10 of 13 candidates can carry a
ceiling-safe whole-page floor**, so Option A is viable without any change to gate 4i. The
three infeasible terms are infeasible for a reason Option B would not fix either — their
related ceiling genuinely exceeds their observed total, so no whole-page floor can
distinguish translator output there regardless of how the floor is computed. Those three
simply get no lock.

⚠ The ceiling is a **worst case** — it assumes all 4 cards on all 9 pages are the single
highest-contributing sibling. A tighter sound bound is the sum of the **top-4 distinct**
sibling contributions per page, and Phase 2 should compute it before rejecting
`Dinosaur National Monument` (mean 0.16/card against a max of 2) or accepting
`Adventure Tours Vernal` on a headroom of 5.

---

## 7. Deliberately not done

- **No floors selected**, per scope.
- **Gate 4i unmodified**, per scope — including the window option E-3 recommended, which §4
  now shows may not be needed.
- **The A/B decision is not made.** Phase 1's job was to determine whether the simpler model
  survives. It does, so Phase 2 chooses on a narrowed tradeoff rather than the original one.
- **No corpus authored**, and the briefs remain frozen.
