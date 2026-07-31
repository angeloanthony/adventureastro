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

## 6. Deliberately not done

- **No floors selected**, per scope.
- **Gate 4i unmodified**, per scope — including the window option E-3 recommended, which §4
  now shows may not be needed.
- **The A/B decision is not made.** Phase 1's job was to determine whether the simpler model
  survives. It does, so Phase 2 chooses on a narrowed tradeoff rather than the original one.
- **No corpus authored**, and the briefs remain frozen.
