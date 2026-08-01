# AR-2 Track E, E-8 — the Arabic frontmatter ceiling rebuild

**Status:** measurement complete. **Re-freeze authorized, conditionally** — see §7.

Measurement and model repair only. No corpus authored, no gate modified, no lock changed, no
census refreshed. Instrument: [`scripts/rtl/measure-ar-frontmatter-ceiling.mjs`](../../scripts/rtl/measure-ar-frontmatter-ceiling.mjs).

---

## 1. The diagnosis, corrected

`AR2-batch2b-assertion-A.md` said "the settled ceiling is summed over English frontmatter".
That is right, but it under-states how narrow the fault is. `measure-related-ceiling.mjs`
computes **two** ceilings, and only one of them is broken:

| ceiling | source | Assertion A | status |
|---|---|---|---|
| **measured** | the registered **Arabic** frontmatter, read directly | observed 9 ≤ 96, 4 ≤ 24 | ✔ **sound** |
| **settled** | the 57-entry **English** pool, projected | observed 9 > **0**, 4 > **0** | ✘ **falsified** |

Only the settled ceiling failed. It is also the only one that may freeze policy (E-4 Phase 2:
it is additive, so registration adds a row rather than invalidating the bound), which is why
the failure blocks the re-freeze.

**It failed in the unsafe direction.** A ceiling below reality inflates headroom:

| lock | ceiling | ceilNP | whole | headroom | class |
|---|---|---|---|---|---|
| `أرض الديناصورات` | measured 96 | 146 | 182 | 36 | feasible (weak) |
| `أرض الديناصورات` | **settled 0** | 50 | 182 | **132** | feasible (**strong**) |

The broken model rates the term *safer* than the sound one. That is the dangerous direction:
a floor frozen in the gap could be satisfied by the template alone.

## 2. Why English cannot predict an Arabic-script term

The projection's own comment states the assumption — *"assumes ar frontmatter mirrors en term
counts"*. For a Latin term that is true: §2.2 keeps `Vernal`, `Red Fleet`, `Kawasaki KRX 1000`
Latin **inside** Arabic frontmatter, so the counts genuinely mirror. For an Arabic-script term
it is false by construction: the English frontmatter carries the *English source* of the
concept, never the Arabic rendering, so the count is 0 and any occurrence at all violates it.

This is not a bug in the projection. It is a modelling gap that only a corpus large enough to
put Arabic siblings in the related block could expose.

## 3. Model A — project through the English source term

The correspondence is not invented for this document. It is the glossary lock, whose `concept`
field names the English identity the Arabic phrase is the locked rendering of:

```
dinosaur-country   "Dinosaur Country — the destination identity"    → أرض الديناصورات
offroad-trail      "trail (the route) — never a blanket word ..."   → المسارات
```

So the rebuilt bound is the same top-4-distinct computation, counting the English source forms
over the English pool. Three checks establish it:

**Assertion C — the correspondence, measured not assumed.** Projecting through English is only
sound if translating a page cannot introduce the Arabic lock term more often than the English
page used its source. Measured per registered page:

| lock | ar total | en total | pages where ar > en |
|---|---|---|---|
| `أرض الديناصورات` ⟷ `Dinosaur Country` | 4 | 4 (same 4 pages) | **0 / 25** |
| `المسارات` ⟷ `trail(s)` | 1 | 25 | **0 / 25** |

**Equivalence — the reimplementation control.** For the six Latin candidates, where the English
source *is* the term, this instrument reproduces `measure-related-ceiling.mjs`'s PROJECTION
table exactly (`Vernal` 568/10/**248**, `Dinosaur National Monument` 340/6/**148**,
`Adventure Tours Vernal` 224/4/**98**, `Uintah Basin` 168/3/**73**, `Green River` 112/2/**50**,
`Kawasaki KRX 1000` 228/4/**100**). The rebuild is the same computation; only the counted
string changes.

**Additivity — preserved.** The ceiling remains a Σ over per-page rows, each ≥ 0 and
independent, so it is monotone non-decreasing in the registered set:

| lock | 9 pages | 17 pages | 25 pages | per page |
|---|---|---|---|---|
| `أرض الديناصورات` | 72 | 136 | **200** | constant 8 |
| `المسارات` | 124 | 234 | **344** | varies 12–14 |

## 4. Model B — the per-card constant, measured on Arabic

Model A is sound but loose: it lets an Arabic card contribute as often as the English card
contributed its source (up to 2 for `Dinosaur Country`). Model B bounds the Arabic card
directly — `per page ≤ CARD_LIMIT × max contribution to any ar frontmatter` — and needs no
cross-language mapping at all, which makes it the simpler of the two.

Measured `max/card(ar)` is **1** for both locks, so Model B is 4/page, 100 over 25 pages.

| lock | model | ceilNP | whole | verdict |
|---|---|---|---|---|
| `أرض الديناصورات` | A (via en) | 250 | 182 | **INFEASIBLE — no floor can enforce** |
| `أرض الديناصورات` | **B (per-card)** | **150** | 182 | feasible → floor must sit in **(150, 182]** |
| `المسارات` | A (via en) | 369 | 414 | feasible → floor in (369, 414] |
| `المسارات` | **B (per-card)** | **125** | 414 | feasible → floor in **(125, 414]** |

**The choice of model decides whether `dinosaur-country` survives as a lock.** Under A it is
infeasible and §11.2 criterion 5 would require dropping it; under B it is feasible.

**Model B's falsifier is a single source-level number:** an Arabic `title` + `description`
carrying the lock phrase more than once. That is checkable before a build, which is where it
belongs — see §7.

## 5. ⚠ Assertion A cannot discriminate here, and the control proved it

Running the rebuilt instrument with `--falsify` (card limit forced to 1, a deliberately unsound
bound) **does not go red**: the ceiling is still 50 and 100 against observed related of 9 and 4.

Per METHOD rule 5, a check that cannot go red is decoration. **A passing Assertion A must
therefore not be cited as evidence that the rebuild is sound for these locks** — the observed
related contribution is single-digit against a ceiling in the hundreds, so the assertion cannot
separate a good bound from a bad one. It was load-bearing for `Vernal` (observed 174 > 75 at
limit 1); it is not for the Arabic locks at this corpus scale.

The check that *does* discriminate is §6.

## 6. ⚠⚠ THE LIVE FINDING — one frozen floor has already stopped enforcing

This test needs no ceiling model. It is arithmetic on the measured window, so it holds whatever
the projection turns out to be. Gate 4i counts over the **whole rendered page**
(`gate-4i-glossary.mjs`: the baseline is the census figure at line 243; `actual` is
`visibleText` over the full HTML at line 429; it fails only when `actual < baseline` at line
471). So the question is: **with every word of Arabic prose deleted, would 4i still pass?**

| lock | floor | whole | prose | survives deletion | verdict |
|---|---|---|---|---|---|
| `أرض الديناصورات` | **33** | 182 | 123 | **59** | ⚠ **DEAD — template alone satisfies it** |
| `المسارات` | 42 | 414 | 385 | 29 | ✔ detects (margin 13) |

`أرض الديناصورات` survives at 59 (related 9 + CTA 25 + chrome 25) against a floor of 33. **The
entire Arabic prose corpus could be deleted and gate 4i would stay green.**

**When it died is determinable, and it was not batch 2b.** CTA and chrome are per-page
constants of 1 each, so the template alone contributes ≥ 2/page. At the 18 pages batch 2a
shipped, that is 36 — already above the floor of 33 **regardless of the related block**. At the
10 pages the census froze against, it was 20, and the floor enforced. So the floor was overtaken
during **batch 2a** and has been non-enforcing for a full batch.

This is the concrete cost of registering without re-freezing. "Under-scoped" was too gentle:
one floor is not merely covering proportionally less, it is covering nothing.

## 7. Authorization

**The census re-freeze is authorized, conditional on all three:**

1. **Adopt Model B** as the settled ceiling for Arabic-script terms. It is the simplest model
   that explains the observations (no cross-language mapping), it is tighter than Model A while
   equally sound, it keeps additivity, and it does not require dropping a lock. Model A is
   retained in the instrument as the loose fallback if B's falsifier ever fires.
2. **Wire Model B's falsifier into `scripts/rtl/preflight-ar.mjs`** — fail any Arabic file whose
   `title` + `description` carries a lock phrase more than once. The bound must be re-asserted
   by every batch, not trusted from this one.
3. **Place the refreshed floors inside `(ceilNP, whole]`** using Model B's ceilNP — `(150, 182]`
   for `dinosaur-country`, `(125, 414]` for `offroad-trail` — and verify with the §6
   enforceability test that `survives < floor` afterwards. A refresh that lands a floor below
   `survives` reinstates exactly the defect §6 found.

The refresh is the remedy for §6: it lifts `dinosaur-country` from 33 to the measured whole-page
count, and `survives` (59, growing at 2/page) stays below it for roughly the next 60 registered
pages.

**Not authorized without those:** re-freezing on the old settled ceiling of 0 would place no
constraint on where the floor lands, which is how a dead floor got frozen in the first place.

## 8. What remains open

- **Model B's soundness at rollout scale** rests on `max/card(ar) = 1` continuing to hold. It is
  measured over 25 of 57 spokes. Condition 2 exists to catch the first counter-example.
- **Assertion A is decoration for these locks** (§5) and should be reported as such rather than
  quietly passing; the enforceability test should gate the re-freeze instead.
- **`offroad-trail`'s margin is 13** — thin. It is alive today but on the same trajectory that
  killed `dinosaur-country`: `survives` grows ~1/page. It crosses 42 at roughly 42 registered
  pages, i.e. **during batch 5 or 6**, unless a refresh raises the floor first.
