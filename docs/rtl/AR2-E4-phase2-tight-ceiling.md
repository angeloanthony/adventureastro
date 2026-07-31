# AR-2 Track E, E-4 Phase 2 — the tight structural ceiling, the reclassification it produces, and the census refresh

**METHOD citation:** rules 1 · 5 · 8 · 18 (`docs/framework/METHOD.md`).

**Status:** complete — steps 1–2 (§§1–8) at `c866adb`, step 3 (§10) after owner authorisation.
**Baseline:** `207bae1` (E-4 Phase 1). Gate 4i unmodified and no corpus authored throughout;
step 3 changed exactly one artifact, `census/phrase-count.json`.

**Instrument:** [`scripts/rtl/measure-related-ceiling.mjs`](../../scripts/rtl/measure-related-ceiling.mjs),
with `--falsify` as its control.

---

## 1. What Phase 1 left open

Phase 1 established the criterion that matters — `feasible ⟺ non_prose_ceiling < observed
whole-page count` — and then computed the ceiling the crudest sound way:

```
loose(page, term) = 4 × max over the pool of contribution(entry, term)
```

It flagged that bound as worst case and asked that a tighter one be computed **before**
rejecting `Dinosaur National Monument` or accepting `Adventure Tours Vernal` on a headroom of
5. That is the right ordering: a permanent classification should rest on the strongest sound
bound the architecture supports, not on the first bound that happened to separate the terms.

**The answer: the tight bound is worth ~20–75 % per term, and it changes no feasibility
verdict at all. What it does change is where the residual expiry lives — and it exposes a
second axis Phase 1 had folded into the first.**

---

## 2. Two structural tightenings, both read off `take()`

`RelatedArticles.astro:48-55` keys `seen` on `` `${hub}/${baseOf(entry)}` `` and pre-seeds it
with the current page. Two consequences the loose bound discarded:

| | why the loose bound was pessimistic |
|---|---|
| **the four cards are four DISTINCT entries** | `seen.has(key)` makes a repeat impossible, so the bound is the sum of the **top four distinct** contributions, not four copies of the top one |
| **a page is never its own card** | `seen` is pre-seeded with `` `${collection}/${currentId}` ``, so the sole carrier of a term contributes nothing to its own page |

The second matters more than it looks. `Dinosaur National Monument` is carried by exactly one
Arabic entry — the page about it — and that page is the one page where the contribution is
structurally unavailable.

```
tight(page, term) = sum of the top 4 distinct sibling contributions for that page
```

---

## 3. ⚠ The pool is a second axis, and it does most of the work

Phase 1 computed `maxPerCard` over the **57 English spokes** — the pool the *completed* rollout
will translate — and applied it to today's 9 pages. That folds two different quantities into
one number, and separating them yields two sound ceilings with **different expiry behaviour**:

| ceiling | pool | status | expires when |
|---|---|---|---|
| **measured** | the 9 registered Arabic files, read directly | measurement | **any** route registers — and it can expire *upward without limit* |
| **settled** | the 57 English spokes, per registered page | prediction (§3.1) | only when a **page** registers, and then only additively (§6) |

```
settled(term) = Σ over the registered pages of  top-4-distinct over the FULL pool
```

Because top-4-distinct is monotone in the pool, `settled` is an upper bound at **every** corpus
size between today and full rollout. `measured` is not — it is the sharpest bound for today and
nothing more.

| Term | Phase 1 loose | **settled** | measured | observed today |
|---|---:|---:|---:|---:|
| `Vernal` | 108 | **88** | 88 | 73 |
| `Kawasaki KRX 1000` | 36 | **36** | 36 | 19 |
| `Dinosaur National Monument` | 72 | **53** | 16 | 2 |
| `Adventure Tours Vernal` | 36 | **34** | 16 | 2 |
| `Uintah Basin` | 36 | **25** | 16 | 1 |
| `Green River` | 72 | **18** | 0 | 0 |
| the other seven | 0 | **0** | 0 | 0 |

`Green River` is the case that decides which ceiling may be used. **No Arabic file carries it in
`title` or `description`, so its measured ceiling is 0** — and a floor justified by a ceiling of
0 would be invalidated by the next unrelated batch, because two English spokes carry it twice
each. Phase 1's §5 called it *"a term whose denominator has not arrived yet"* and was right;
the measured ceiling is precisely the instrument that would fail to notice that.

**Only `settled` may be used to freeze policy.** `measured` is recorded because the gap between
them *is* the pending drift, and a number nobody wrote down is a number nobody can check.

### 3.1 The prediction, and its falsifier

`settled` inherits Phase 1 §5.1's assumption: English frontmatter predicts Arabic frontmatter,
because policy §4.2 requires Latin names verbatim and E-2 measured `en`↔`ar` alignment at Δ 0.
It is falsified by any Arabic `title`/`description` carrying a §4.2 name more often than its
English source does. Re-running the instrument after each expansion and finding `measured`
above `settled` for a registered page falsifies it — and Assertion A (§8) checks exactly that
relation on every run rather than leaving it rhetorical.

---

## 4. The reclassification

`ceilNP = chrome + cta + byline + relCeil`; template terms are the differential-stable constants
E-3 measured. `head = whole − ceilNP` is exactly the number of occurrences a ceiling-safe floor
can require from prose.

**Under the settled ceiling — the one policy may use:**

| Term | prose | tmpl | relCeil | ceilNP | whole | head | class |
|---|---:|---:|---:|---:|---:|---:|:--|
| `Vernal` | 178 | 36 | 88 | 124 | 287 | **163** | feasible (strong) |
| `المسارات` | 32 | 9 | 0 | 9 | 41 | **32** | feasible (strong) |
| `Kawasaki KRX 1000` | 39 | 0 | 36 | 36 | 58 | **22** | feasible (strong) |
| `Moonshine Arch` | 16 | 9 | 0 | 9 | 25 | **16** | feasible (strong) |
| `أرض الديناصورات` | 14 | 18 | 0 | 18 | 32 | **14** | feasible (strong) |
| `Outlaw Trail` | 11 | 9 | 0 | 9 | 20 | **11** | feasible (strong) |
| `Asphalt Ridge` | 9 | 9 | 0 | 9 | 18 | **9** | feasible (strong) |
| `Ashley Gorge` | 8 | 9 | 0 | 9 | 17 | **8** | feasible (strong) |
| `Adventure Tours Vernal` | 39 | 2 | 34 | 36 | 43 | **7** | feasible (weak) |
| `Doc's Beach` | 3 | 9 | 0 | 9 | 12 | **3** | feasible (strong ⚠ §5.1) |
| `Dinosaur National Monument` | 23 | 13 | 53 | 66 | 38 | −28 | **infeasible** |
| `Uintah Basin` | 11 | 0 | 25 | 25 | 12 | −13 | **infeasible** |
| `Green River` | 6 | 0 | 18 | 18 | 6 | −12 | **infeasible** |

The measured ceiling would classify three of these differently — `Dinosaur National Monument`
feasible (weak), `Green River` feasible (strong), `Adventure Tours Vernal` strong rather than
weak. All three differences are cases where the measured bound licenses a lock the rollout would
then invalidate. That the two ceilings disagree on exactly the terms whose denominators have not
arrived is the finding, not a nuisance.

---

## 5. ⚠ The verdict on Phase 1's flag: nothing moves

Phase 1 asked for the tight bound before freezing two specific decisions. Both hold:

- **`Dinosaur National Monument` stays infeasible.** The loose bound rejected it by 47; the tight
  bound rejects it by 28. Not a near miss, and not an artefact of pessimism — the single English
  spoke that names it in both `title` and `description` puts 5–6 occurrences on every *other*
  page's card set, which is more than the whole page carries.
- **`Adventure Tours Vernal` stays feasible**, on a headroom of 7 rather than 5 — and the
  feasible/strong split now says the useful thing about it: it is a **weak** lock, detecting
  deletion but not erosion, rather than an acceptance made nervous by a small number.

**No feasibility verdict changes. 10 of 13 feasible, the same 3 infeasible, the same 3 terms.**
That is the outcome an evidence-first sequence is supposed to be able to produce: the tighter
bound was computed *because* it could have reversed something, and the value is the same table
now held with justified confidence rather than the same table held provisionally.

It also preserves the consequence that collapsed the architecture question. Option B does not
recover `Dinosaur National Monument`, `Uintah Basin` or `Green River` under the tight ceiling
either — their related ceiling exceeds their whole-page total, so no whole-page floor of any
construction separates translator output from template there.

### 5.1 ⚠ Where the strength label is doing less work than it appears

`strong ⟺ head ≥ prose / 2` is a **chosen convention, not a derived threshold**, and it is
purely *relative*. `Doc's Beach` scores strong because its headroom of 3 is all of its prose —
but 3 occurrences is thin absolute evidence, and the label says nothing about that. Phase 1
called the same term "marginal", and on the absolute reading Phase 1 was right. Both readings
are worth carrying into step 3; neither is a substitute for the other.

---

## 6. What this does to Phase 1 §4's residual: it becomes additive

Phase 1 narrowed E-3's expiry to *"re-measure whenever the Arabic page count changes."* Because
`settled` is a **sum of per-page rows over the full pool**, that narrows once more: registering a
page **adds its precomputed row** rather than invalidating the bound.

| registered page | `Vernal` | `Kawasaki` | `DNM` | `ATV` | `Uintah` | `Green River` |
|---|---:|---:|---:|---:|---:|---:|
| `utv/backcountry-tours-vernal-utah` | 10 | 4 | 6 | 4 | 3 | 2 |
| `utv/beginners-guide-to-utv-tours-vernal` | 10 | 4 | 6 | 4 | 3 | 2 |
| `utv/best-utv-trails-vernal` | 9 | 4 | 6 | 3 | 2 | 2 |
| `utv/family-utv-guide-vernal` | 10 | 4 | 6 | 4 | 3 | 2 |
| `utv/group-utv-tours-vernal` | 10 | 4 | 6 | 4 | 3 | 2 |
| `utv/private-utv-tours-vernal` | 10 | 4 | 6 | 4 | 3 | 2 |
| `utv/side-by-side-rentals-vernal-utah` | 9 | 4 | 6 | 3 | 3 | 2 |
| `dinosaur-national-monument/petroglyphs-rock-art-vernal` | 10 | 4 | 6 | 4 | 2 | 2 |
| `dinosaur-national-monument/visiting-dinosaur-national-monument` | 10 | 4 | 5 | 4 | 3 | 2 |
| **Σ = the settled ceiling** | **88** | **36** | **53** | **34** | **25** | **18** |

All 57 rows are emitted to the instrument's `--json`. The ceiling side of a floor is therefore a
lookup for the rest of the rollout. The **prose** side still has to be measured when pages are
added — but that is measuring new content that was just authored, not rediscovering a
denominator that moved on its own, which is the failure E-3 named.

---

## 7. ⚠ Step 3 is not the step it was thought to be

Reading the gate before assigning floors changes what "assign a floor" means. **F5 Phase 5
removed authored figures from `4i-glossary.json` entirely** — `gate-4i-glossary.mjs:230` *refuses*
a lock that declares `min` or `count`:

> the census owns the number; policy owns the comparison

The floor is `census.value({locale, phrase, surface:'prose'})`, frozen by
`census/phrase-count.json`. Three consequences for step 3, none of which were in view when the
A/B framing was set:

1. **⚠ A correction to E-3's floor model.** E-3 recorded `floor_enforced = non_prose_observed +
   prose_margin`. **That expression cannot be written down anywhere in this system.** A floor is
   not chosen from `(ceilNP, whole]` — it *is* `whole` at freeze time, and `prose_margin` has no
   home: the config refuses a number and the census records the corpus, not a policy. So `head`
   is not a design parameter but the margin by which the frozen figure already exceeds what the
   template can reach, which is exactly why the §4 feasibility test is the right one and why a
   margin is unavailable without changing the gate. Phase 1 corrected E-3's *mechanism*; this
   corrects its *arithmetic*, in the same direction — the simpler model is the one that exists.
2. **⚠ `surface: "prose"` in the census means the WHOLE PAGE.** `phrase-count.mjs:51` sets
   `SURFACE = 'prose'` and counts `visibleText(page.html)` over the entire document. E-3 and E-4
   use "prose" for `main − related − cta − byline`. **Two artifacts in this program now use one
   word for two windows** — the D-1 shape the census layer exists to prevent. Whatever step 3
   decides, this collision should be resolved by naming, and the census schema's
   `"surface": {"enum": ["prose"]}` is where Option B would have to land as a new value.
3. **The `ar` census is stale and is currently enforcing nothing.** It was measured 2026-07-28 at
   `corpus.pages.ar = 1`, and both `ar` locks are frozen at **value 1** against a 9-page corpus
   whose true whole-page counts are **32** and **41**. The gate passes today because the floor is
   a quarter of an order of magnitude below the corpus, not because the corpus is verified.

Item 3 is the smallest, most reversible piece of step 3 and is independent of the A/B question:
re-running the census raises both `ar` locks onto figures §4 shows are ceiling-safe. It is not
done here because re-freezing a census changes what CI enforces, and that is a decision.

---

## 8. The instrument and its control

`measure-related-ceiling.mjs` reads the candidate pool from source frontmatter and the template
constants from `measure-prose-window.mjs --json`, so there is exactly one definition of the
window and this file does not re-derive it. Two assertions run on every invocation:

- **A — ceiling ≥ observed related, per term, both ceilings.** A bound the build already exceeds
  is not a bound. Green on all 13 terms.
- **B — the static section heading contributes 0.** `قد يعجبك أيضاً` carries none of the 13
  candidates, so it needs no per-page constant. Checked rather than assumed.

Per METHOD rule 5, Assertion A ships with a control that must go red. `--falsify` recomputes
every ceiling at a card limit of **1** — unsound, since the component demonstrably renders four —
and requires a violation, exiting 2 if none appears:

```
⚠ Vernal: observed 73 > measured 27          ⚠ Kawasaki KRX 1000: observed 19 > measured 9
⚠ Vernal: observed 73 > settled 27           ⚠ Kawasaki KRX 1000: observed 19 > settled 9
✔ control red as required (4 violation(s) at limit 1)
```

Exit codes follow the Track E instruments: `0` produced, `2` could not run, no exit 1 — it
asserts nothing about whether the corpus is right.

---

## 9. Deliberately not done (as of steps 1–2)

- **No floors assigned and the census not re-run** — step 3, and §7 shows it is a census freeze
  rather than a config edit. **Done at §10 after owner authorisation.**
- **Gate 4i unmodified**, and the `surface` naming collision (§7.2) is reported, not fixed. Still
  open after step 3.
- **The A/B decision is still not formally recorded**, though §5 leaves Option B with no term it
  would recover. **Recorded at §10.4.**
- **No corpus authored**, and the briefs remain frozen. Unchanged by step 3.

---

## 10. Step 3 — the census refreshed

The `ar` locks had been frozen at `pages.ar = 1` since 2026-07-28 and were enforcing a floor of
**1** against a 9-spoke corpus. Re-running the producer is the smallest reversible change that
makes CI enforce the policy §4 justifies.

### 10.1 The two guards run first

A census refresh re-freezes **every** locale, so the risk is not the `ar` locks — it is a figure
somewhere else silently moving **down** and baking a weaker floor into the baseline. Both guards
were run before the result was accepted:

| guard | result |
|---|---|
| `phrase-set.mjs` re-derived from the lock registry and diffed | **byte-identical** — 53 requests, 8 locales, no lock-registry drift |
| every fact diffed old → new | **51 unchanged · 2 increased · 0 decreased · 0 added · 0 removed** |

Both increases are the `ar` locks. **No other locale's floor moved in either direction.**

```
ar|أرض الديناصورات    1 → 33   (pagesWithPhrase 1 → 10)
ar|المسارات           1 → 42   (pagesWithPhrase 1 → 10)
```

### 10.2 ⚠ A correction to §4's figures: 33 and 42, not 32 and 41

§7.3 predicted the frozen figures would be **32** and **41**. They are **33** and **42**, and the
discrepancy is a measurement-window mismatch between two instruments in this same program —
METHOD rule 8 in its smallest form:

- `measure-prose-window.mjs` totals the **9 pilot spokes** (`cancellation-policy` is measured as
  `INLINE` and deliberately excluded from `totals`).
- the census counts **all 10 `ar` routes**.

The 10th route was decomposed to confirm the delta rather than assume it, and it contributes
**exactly 1 chrome occurrence per lock — no related block (it is not a spoke, so
`RelatedArticles` never renders), no `tour-cta`, no byline, no prose.**

### 10.3 The frozen floors clear the ceiling on the census's own page set

Because the 10th page adds 1 to both the ceiling and the whole, the headroom is unchanged — but
the check is re-stated over the 10-page set the census actually measured, since a ceiling
computed on a different page set than the floor is exactly the error §10.2 describes:

| lock | ceilNP (10 pages) | frozen floor | headroom | class |
|---|---:|---:|---:|:--|
| `أرض الديناصورات` | 10 chrome + 9 cta = **19** | **33** | **14** | feasible (strong) |
| `المسارات` | 10 chrome = **10** | **42** | **32** | feasible (strong) |

**Both locks are now ceiling-safe and enforcing.** A build that dropped `أرض الديناصورات` from
Arabic prose entirely would render at most 19 and fail against 33 — which is the first time
either lock has been able to fail for a content reason.

⚠ `cancellation-policy` is a **chrome-only page**: it raises the ceiling and the floor equally
and contributes no prose. A corpus that grew mainly in such pages would erode headroom without
the term counts revealing it. Negligible at 1 of 10; worth watching at the §7 expansion.

### 10.4 Verification, and the A/B decision recorded

`npm run build` (629 pages) then the full `gates:dist` suite: **all green**, `gate-4i` ✔ 52 locks
across 8 locales on 549 rendered pages, with the same 3 pre-existing advisory locks and no new
finding. The advisories are unrelated `ja`/`zh` owner decisions carried since C4.

**The A/B decision is recorded here as resolved in favour of Option A** — no gate change. It has
now been tested against the loose ceiling, the tight ceiling, and the gate implementation, and
all three agree that a prose-window variant expands the enforceable set by **zero terms**. It
should be reopened only if a future corpus produces a term that is infeasible under the settled
ceiling *and* feasible under a window-scoped one.

### 10.5 Still open after step 3

- **The `surface` naming collision (§7.2)** — reported, not fixed. ⚠ It is a **framework**
  change, not a policy one: it lands in `census-output.schema.json` and `phrase-count.mjs`, the
  portable engine that `forebearfindastro` consumes with no `i18n-gates/` at all. Deferring it
  avoided a cross-host API change inside a localization milestone.
- **The 11 remaining candidates** hold no lock. §4 says which could carry one; authoring them is
  a corpus decision, not a measurement one.
- **B-8b**, unchanged and corpus-unblocked.

---

## 11. The expansion procedure — a required maintenance unit, not a reminder

The settled ceiling is a **sum over the registered pages** and the floors are **corpus totals**.
So an Arabic batch that registers routes and stops there leaves the frozen floors covering less
of the corpus than shipped: the locks stay green while enforcing proportionally less. The ceiling
extension and the census re-freeze are therefore **two halves of one operation**, and neither is
optional.

It is cheap by construction — §6 already reduced the ceiling side from rediscovery to a table
sum — but cheap is not automatic.

### 11.0 ⚠ First, extend the instruments' route list

`measure-prose-window.mjs` hardcodes the nine pilot slugs in `PILOT` and measures
`cancellation-policy` separately as `INLINE`. **A new route that is not added to `PILOT` is
silently excluded from the window measurement while the census counts it** — which is exactly the
population mismatch that produced §10.2's 32/41-vs-33/42 correction, and it will recur in the
same shape at every expansion until the list is extended. Do this before anything else.

`measure-related-ceiling.mjs` needs no such edit: it reads the pool from source frontmatter, so
the settled ceiling re-sums over the new registered set on its own.

### 11.1 The sequence

```
npm run build                                            # rebuild; page set must match HEAD
node scripts/rtl/measure-prose-window.mjs --json w.json  # template constants + whole counts
node scripts/rtl/measure-related-ceiling.mjs --window w.json --project --json c.json
node scripts/rtl/measure-related-ceiling.mjs --window w.json --project --falsify   # control
node scripts/census/phrase-set.mjs > new-set.json        # GUARD 1 — diff, must be identical
npm run census:phrase-count -- <YYYY-MM-DD>              # re-freeze
                                                         # GUARD 2 — diff every fact, check sign
npm run gates:dist
```

### 11.2 The acceptance criteria, in the order they can fail

| # | check | fails if |
|---|---|---|
| 1 | `phrase-set.json` re-derived and diffed | it differs — the lock registry drifted and the refresh is measuring a different question |
| 2 | Assertion A inside the ceiling instrument | observed related exceeds the settled ceiling — §3.1's English-predicts-Arabic assumption is **falsified**, and the ceiling must be rebuilt from measured Arabic frontmatter before any floor is trusted |
| 3 | `--falsify` control | it comes back green — the assertion is not wired to the ceiling |
| 4 | whole-census differential, **by sign** | **any fact decreased.** Increases are expected; a decrease bakes a weaker floor into the baseline and is the failure mode a refresh actually has |
| 5 | `ceilNP < frozen value`, per `ar` lock | a lock is no longer ceiling-safe — it must be dropped, not lowered until it passes |
| 6 | `npm run gates:dist` | anything |

⚠ **Check 5 must be computed over the page set the census measured**, not over the pilot spokes.
§10.2 is the record of getting this wrong by one page; the error scales with the gap between the
two lists, which is precisely what §11.0 exists to keep at zero.

### 11.3 Scope of what this validates

The framework is **measurement-complete, enforcement-live, and validated at pilot scale**. Nine
translated spokes exercised every mechanism, established glossary enforcement, validated the
floor model and closed the architectural question. They have **not** demonstrated behaviour
across the full 57-spoke corpus, and this document does not claim they have.

That gap is what §10.4's reopen condition is for. It is not an expectation of failure — it is the
difference between *validated at pilot scale* and *assumed to generalize*, recorded so that
rollout-scale evidence can reopen the design rather than having to argue against a closed one.
