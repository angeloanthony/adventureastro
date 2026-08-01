# AR-2 Track E, E-9 — Model B adopted, the falsifier wired, the floors re-frozen and proven enforcing

**Status:** complete. E-8 §7's three conditions are satisfied and the census re-freeze is done.

**The governing invariant this milestone installs:**

> **Every frozen Arabic floor must demonstrably FAIL when the prose it protects is deleted.**
> A mathematically tighter ceiling is not sufficient. A floor that survives deletion of the whole
> corpus it exists to protect is not a weak floor — it is not a floor.

No corpus authored. No gate modified. No lock added, dropped or reworded. Batch 3 not started.

---

## 1. What was done

| # | E-8 §7 condition | Where it landed |
|---|---|---|
| 1 | Adopt **Model B** as the settled ceiling for Arabic-script terms | [`measure-ar-frontmatter-ceiling.mjs`](../../scripts/rtl/measure-ar-frontmatter-ceiling.mjs) — `AR_MAX_PER_CARD`, and `ceilNP` now reads Model B |
| 2 | Wire Model B's falsifier into the authoring pre-flight | [`preflight-ar.mjs`](../../scripts/rtl/preflight-ar.mjs) — fails a source file whose `title` + `description` carries a lock phrase more than once |
| 3 | Place the refreshed floors inside `(ceilNP, whole]` and verify enforceability | census re-frozen 2026-08-01; both floors verified by arithmetic **and** by running the real gate against a prose-deleted tree (§4) |

---

## 2. The adoption, and what it is made of

Model B is `per page ≤ CARD_LIMIT × AR_MAX_PER_CARD`. Both halves are now grounded in the
component rather than in a mapping: `RelatedArticles.astro` renders at most four cards
(`limit = 4`, line 34) and each card renders exactly the target page's `title` and `description`
(lines 107–108, 118–119). So the model needs no cross-language correspondence at all, which is
why it is preferred to Model A on simplicity as well as tightness.

**The constant is adopted, not measured, at the point of use.** The instrument computes the bound
from `AR_MAX_PER_CARD = 1` and uses the measurement only to falsify it. Taking
`max(measured, adopted)` instead would silently absorb a violation into a higher ceiling, leaving
the floors that were placed under the old one quietly unsound — the same failure mode in a new
costume.

| lock | max/card(ar) measured | adopted | Model B | verdict |
|---|---|---|---|---|
| `أرض الديناصورات` | 1 | 1 | 100 | ✔ within adopted |
| `المسارات` | 1 | 1 | 100 | ✔ within adopted |

Model A is **retained** in the instrument as the declared fallback if the falsifier ever fires,
and the equivalence control still reproduces `measure-related-ceiling.mjs`'s PROJECTION table
exactly for all six Latin candidates (`Vernal` 568/10/248 … `Green River` 112/2/50).

### 2.1 The model choice is still what decides whether a lock lives

| lock | ceilNP under A | ceilNP under **B** | whole | consequence |
|---|---:|---:|---:|---|
| `أرض الديناصورات` | 250 | **150** | 182 | A: **infeasible**, the lock would have to be dropped. B: feasible |
| `المسارات` | 369 | **125** | 414 | feasible either way |

### 2.2 The falsifier discriminates — unlike Assertion A

Wired into pre-flight, and proved able to go red rather than assumed to be:

| run | result |
|---|---|
| control — `fall-hiking-near-vernal.ar.mdx` with the lock phrase duplicated in `description`, one occurrence more, description still inside the 120–165 budget | ⚠ **1 finding** — `lock "dinosaur-country" occurs 2×, over the adopted per-card ceiling of 1` |
| the same file, unmodified | **clean** |
| all 25 registered Arabic source files | **clean** |

This is what a live check looks like, and the contrast with §3 is the point.

---

## 3. ⚠ Assertion A — recorded, demoted, not deleted

`--falsify` (card limit forced to 1, a deliberately unsound bound) still **does not go red**: the
rebuilt ceiling remains 50/100 against observed related of 9/4, and the instrument exits 2 saying
so. Per METHOD rule 5 the assertion cannot discriminate a good bound from a bad one at this
corpus scale.

**It is kept, not removed**, because deleting it would erase the record and because it is
genuinely load-bearing elsewhere — `Vernal` observes 174 against a limit-1 ceiling of 75. What
changed is that it now prints its own demotion on every run:

```
=== ASSERTION A — adopted (Model B) ceiling ≥ observed related, per lock ===
  ⚠ DEMOTED for these locks: the --falsify control does not go red (E-8 §5),
    so a green tick here is NOT evidence the bound is sound. Reported, not cited.
```

| | applies | does not apply |
|---|---|---|
| **Assertion A** | Latin locks, where observed related is the same order as the ceiling | the two Arabic locks — observed is single-digit against a ceiling in the hundreds |
| **Enforceability (§4)** | every floor, in every locale — it needs no ceiling model | — |

---

## 4. THE CANONICAL EVIDENCE — the enforceability table

**Future discussions should cite this table, not the ceiling calculations.** A ceiling bounds what
the template *could* contribute; this asks the blunter question a floor actually has to answer.

### 4.1 By arithmetic

`survives = whole − prose`, over the census's own 26-page population (§4.3).

| lock | floor before | floor after | survives deletion | before | after |
|---|---:|---:|---:|---|---|
| `أرض الديناصورات` | 33 | **183** | 60 | ⚠ **DEAD** | ✔ detects, margin **123** |
| `المسارات` | 42 | **415** | 30 | ✔ detects, margin 12 | ✔ detects, margin **385** |

### 4.2 By experiment — the real gate against a prose-deleted tree

Arithmetic is enough to condemn a floor; the claim that the refreshed floors *enforce* deserves
the stronger form. `dist/` was copied, every word of Arabic prose deleted from it — the E-3 window
(`<main>` − related-articles − tour-cta − author-byline), extraction copied from
`measure-prose-window.mjs` so the two cannot disagree about what the window is, with the three
template blocks **retained** — and the real `gate-4i-glossary.mjs` run against that tree.

The stripped tree measures **prose 0, whole 59 / 29** across the 25 spokes, matching the predicted
`survives` exactly. Then:

| census in place | `أرض الديناصورات` | `المسارات` | gate exit |
|---|---|---|---|
| **old floors** 33 / 42 | ⚠ **PASSES** with the entire Arabic corpus deleted | fails | 1 (one violation) |
| **new floors** 183 / 415 | ✔ **fails** | ✔ fails | 1 (two violations) |

The middle row is E-8 §6's arithmetic finding reproduced as a live gate result: under the floor
frozen at `9282317`, a build could have lost every word of Arabic prose on every page and gate 4i
would have reported the corpus intact. Under the refreshed floors it cannot.

### 4.3 ⚠ A correction to E-8 §6's figures: survives is 60 / 30, not 59 / 29

E-8 §6 compared a **spoke-scoped** `survives` against a **census-scoped** floor. The census counts
all 26 registered `ar` routes; the window totals the 25 spokes, because `cancellation-policy`
renders no RelatedArticles, no CTA and no byline and is decomposed separately. That page
contributes exactly **1 chrome occurrence per lock and no prose** — measured, not assumed — so
every survivability figure moves by +1.

This is the §10.2 population mismatch (32/41 vs a frozen 33/42) recurring in a third costume, and
the fix this time is structural rather than remembered: `measure-prose-window.mjs --json` now
emits the inline page's own per-term counts and the spoke list, so the correction is an addition
the consumer performs explicitly and its absence is stated rather than silent.

**No verdict changes** — `أرض الديناصورات` was dead at 59 and is dead at 60. But
**`المسارات`'s margin is 12, not 13**, i.e. one page thinner than recorded.

---

## 5. The re-freeze, and its two guards

Run in the §11.1 order. Build first: 645 pages, whole suite green, page set matching `HEAD`.

| guard | result |
|---|---|
| `phrase-set.mjs` re-derived and diffed | **content-identical** — 53 requests, 8 locales, no lock-registry drift |
| every fact diffed old → new, **by sign** | **51 unchanged · 2 increased · 0 decreased · 0 added · 0 removed** |

```
ar|أرض الديناصورات   33 → 183   (pages 10 → 26, pagesWithPhrase 10 → 26)
ar|المسارات          42 → 415   (pages 10 → 26, pagesWithPhrase 10 → 26)
```

Both increases are the `ar` locks. **No other locale's floor moved in either direction.**

> ⚠ **Guard 1 is content-identical, not byte-identical, and the difference is not drift.**
> E-4 §10.1 recorded "byte-identical". On this checkout the committed file carries **CRLF** (214
> line endings) and the producer emits **LF**, so `diff` reports every line changed and a
> byte comparison reports 3520 vs 3306. EOL-normalised the two are identical and the parsed JSON
> is deep-equal. A future run should compare on normalised content and not spend an hour on it.

### 5.1 ⚠ Gate 4i now reports FOUR advisory locks, and it is not the refresh

The fourth is `ar` / `المسارات`: 9 occurrences of **`الدروب`** as an alternative rendering of
"trails" across `spring-`, `summer-` and `winter-hiking-near-vernal`, from batches 2a/2b.

It was verified to **pre-date this milestone** by re-running gate 4i against the *old* census — 4
advisory locks either way — so it is a corpus/terminology question, not a consequence of the
re-freeze. Advisory means non-blocking; it is **not fixed here** (no corpus authored) and is filed
for the Arabic terminology review. `المسارات` is the locked rendering; whether `الدروب` is
acceptable register variation or drift is an owner decision of exactly the shape that closed the
German `du`/`Sie` question.

### 5.2 Verification

`npm run gates:dist` on the real tree: **all green.** 645 pages, 9 locales. `gate-4i` ✔ 52 locks
across 8 locales on 565 rendered pages, 20 dictionary anchors intact, 4 advisory locks (§5.1).

---

## 6. What this changes for the next batch

1. **Run `preflight-ar.mjs` before building.** It now checks the per-card ceiling as well as the
   `title`/`description` budgets, §3.3 and §3.5, the digit and arrow policies, and `AR_SLUGS`
   registration. It reads source and takes a second.
2. **The re-freeze is no longer blocked** — E-8 resolved the falsified Assertion A structurally,
   and this milestone executed the refresh. §6.2 of the rollout brief stands: finishing a batch is
   still two operations.
3. **The enforceability test is now the acceptance criterion that governs**, ahead of the ceiling
   comparison. It is criterion 5 in the §11.2 list and it is the one that can fail for a real
   reason.

---

## 7. What remains open

- **`AR_MAX_PER_CARD = 1` is measured over 25 of 57 spokes.** It is a frozen assumption, and
  pre-flight exists to catch the first counter-example. If it fires, the fallback is Model A —
  under which `أرض الديناصورات` is infeasible and the lock's survival becomes a live question.
- **`الدروب` (§5.1)** — an unresolved terminology advisory, 9 occurrences, 3 files.
- **The `surface` naming collision** (E-4 §7.2) — still reported, still not fixed, still a
  framework-level change rather than a policy one.
- **Margins now grow with the corpus rather than shrinking**, because a refreshed floor is the
  whole-page total and `survives` grows at ~2/page and ~1/page. The trajectory that killed
  `أرض الديناصورات` is arrested, not eliminated: it returns the moment a batch registers routes
  without re-freezing.
