# AR-2 Track E, E-5 — pilot assessment and rollout authorization

**METHOD citation:** rules 1 · 4 · 5 · 8 · 12 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. **Baseline:** `8ac770d`, working tree clean. **Corpus:** 629 pages,
`ar` 10 routes, 129 862 `ar` visible characters, all 11 gates exit 0.

**Scope: assessment only.** No engineering change, no gate change, no census refresh, no
corpus. Every number below is a re-reading of artifacts that already exist, or a measurement
taken over the current `dist/` without modifying it.

**Recommendation: authorize rollout, conditional on three preconditions (§9).** None of the
three requires new engineering; all three are corrections to *records*, not to code.

---

## 1. Milestone reconciliation — the frozen brief vs what ran

The brief (`AR2-TrackE-brief.md` §4) defines six milestones. Five ran; two of those ran under
a different definition than the brief gives them.

| Brief | Brief's definition | What actually ran | Status |
|---|---|---|---|
| E-0 | brief + pre-census | same | **as specified** |
| E-1 | single-file registration probe | same | **as specified** |
| — | *(not in the brief)* | **E-1b** — the currency/bidi probe | **added** |
| E-2 | the remaining 8 spokes | same | **as specified** |
| E-3 | **B-8b — the Arabic seam rule** | the stable editorial measurement window | **⚠ diverged** |
| E-4 | **B-11 — wayfinding locks with census floors** | the ceiling model + the census refresh | **⚠ diverged** |
| E-5 | decision point | this document | as specified |

### 1.1 The divergence is real and is not a renaming problem

E-3 and E-4 did not do late or partial versions of B-8b and B-11. They did **different work**,
and the reason is legible in sequence: E-2 §4.1 discovered that a per-term count taken over
`<main>` is not stable across corpus growth, which meant B-11's floors could not be written at
all until a stable window existed. E-3 built the window; E-4 discovered the window still could
not be enforced by the gate as it stands, and produced the ceiling model that says which floors
are sound. **B-11's stated deliverable — a set of §4.2 wayfinding locks in
`4i-glossary.json` — does not exist.** What exists is the eligibility table that says which of
them can be written soundly.

**B-8b was never started.** M1–M3, the three measurements that constitute it, remain at E-1's
single-file reading (§5).

### 1.2 Recommended renumbering — adopt the executed record, re-file the unbuilt work

The executed numbering is load-bearing: it is cited in **15 commit messages**, the backlog, and
every E-1…E-4 document. Renaming it now to match the brief would invalidate those citations to
preserve a plan that did not run.

> **Adopt the executed record as authoritative.** Re-file the unbuilt work as new milestones:
> **E-6 = B-8b** (the Arabic seam rule, corpus-gated, M1–M3) and **E-7 = B-11 lock authoring**
> (writing the locks E-4 §4 found feasible). The frozen brief's §4 is superseded by this table
> and should not be edited — it is the record of what was planned, which is what makes the
> divergence measurable.

This closes the divergence the backlog assigned to E-5.

---

## 2. The predictions ledger

E-0 recorded numeric Arabic floor predictions *before any Arabic existed* (`AR2-E0-census.md`
§4), which is what makes this section a falsification test rather than a summary. Measured now
over all 10 `ar` routes, `visibleText@1`:

| Term | E-0 predicted | measured | Δ | verdict |
|---|---:|---:|---:|:--|
| `Kawasaki KRX 1000` | 58 | **58** | 0 | **confirmed exactly** |
| `أبرز النقاط` (Key Takeaways) | 4 | **4** | 0 | **confirmed exactly** |
| `Doc's Beach` (both apostrophes) | 30 | **29** | −1 | confirmed |
| `Moonshine Arch` | 26 | **25** | −1 | confirmed |
| `Outlaw Trail` | 21 | **20** | −1 | confirmed |
| `Asphalt Ridge` | 19 | **18** | −1 | confirmed |
| `Dinosaur National Monument` | 35 | **39** | +4 | confirmed |
| `Vernal` | 321 | **294** | −27 | **refined** — chrome, §2.1 |
| `(435) 219-9447` | 73 | **55** | −18 | **refined** — chrome, §2.1 |
| `أرض الديناصورات` | 10 | **33** | +23 | **falsified** — §2.2 |
| `المسارات` | 10 | **42** | +32 | **falsified** — §2.2 |

**Every deviation is attributable, and three classes of it were flagged in advance.**

### 2.1 The −1 cluster and the two chrome refinements are one error, correctly anticipated

The four `−1` terms and the two large negatives are the same mistake: E-0's per-page chrome
constants were taken on `/ar/cancellation-policy/`, which **renders no `<main>` at all**, so the
figures silently included that page's own body. E-0 said so in §4 and called them `≥`
predictions rather than equalities; **E-1 §4.1 then falsified two of them by direct measurement**
(`Vernal` 7 → 6, phone 4 → 2). The ledger reproduces that falsification at corpus scale:
`Vernal` −27 and phone −18 track the corrected per-page constants almost exactly, and the four
`−1`s are the inline page carrying **0** rather than 1 for trail names that appear in no footer
list.

This is the project's recurring lesson in its cleanest form: *a recorded size is a hypothesis
about the measurement window*, and E-0's value was not that it predicted well but that it
recorded the window it predicted in, so the miss was diagnosable rather than mysterious.

### 2.2 ⚠ The two falsified predictions are the pilot's most important measurement

E-0 predicted body **0** for both `ar` locks, because at the time both were **100 % chrome**
(E-0 F4, measured by provenance and by byte offset). Measured now: **prose 14 and 32**. The
locks stopped being dictionary-integrity checks and became genuine corpus locks the moment
translator prose existed — which is precisely what E-1 §4.3 predicted would happen and named
the page that would test it.

That prediction being wrong **in that direction** is the pilot working. It is also what makes
the E-4 census refresh meaningful: a floor of 33 on `أرض الديناصورات` sits 14 above everything
the template can produce, so it now measures a translator.

---

## 3. Acceptance criteria A1–A12

| # | Criterion | Status | Evidence |
|---|---|:--|---|
| A1 | `astro check` 0, `build` exit 0 | ✔ | verified at `9282317`, 629 pages |
| A2 | route delta exactly +1 then +8 | ✔ | E-1, E-2 §1 |
| A3 | `AR_SLUGS` ↔ `.ar.mdx` parity, 0 orphans | ✔ | `validate-site` |
| A4 | zero broken links | ✔ | `validate-site` |
| A5 | 9 new pages render `rtl` | ✔ | gate 4k |
| A6 | zero isolation findings | ✔ | gate 4n, **after 15 true positives fixed** (§4) |
| A7 | zero Arabic-Indic digits | ✔ | gate 4q, 0 over 129 862 chars |
| A8 | the 2 4i locks at **re-measured** floors | ✔ | **only at `9282317`** — see §3.1 |
| A9 | 4f/4g `ar` stay in-progress | ✔ | 42 advisories, non-blocking |
| A10 | `ar` stays gallery-exempt | ✔ | gate 4j |
| A11 | 4m re-baselined for the 9 new routes | **✘ not performed** — and mis-specified, §3.2 | `i18n-gates/4m-media.json` unchanged since `95dbd1c` |
| A12 | 4o population grows, 0 findings | ✔ | 44 in-scope files |

### 3.1 ⚠ A8 was open for the entire life of the pilot

E-2 §5 reported A8 green, but what E-2 produced was the *measurement* — the floors themselves
were still **1**. E-2 §7 deferred the freeze to E-4 deliberately and correctly. The consequence
is that A8, an acceptance criterion for E-2, was not actually satisfied until **three milestones
later**, at `9282317`. For the whole of E-3 and E-4 the pilot ran with its glossary locks
enforcing a floor of 1 against a 10-page corpus.

Nothing broke, and the deferral was the right call. The record-keeping was not: a criterion
satisfied by a future milestone should be marked **deferred**, not green. **Carry into the
rollout checklist:** an acceptance criterion whose remedy is a config or census change is not
met by measuring its inputs.

### 3.2 ⚠ A11 was never done — and the brief's warning about it is falsified

`i18n-gates/4m-media.json` has exactly **one commit in its history** (`95dbd1c`, the commit that
created gate 4m) and contains **zero `/ar/` entries**. A11 was not performed.

The brief warned this would be invisible: *"a frozen baseline is blind to a new route until
re-baselined … which is exactly the case where forgetting to re-baseline is invisible."*
**That is false about this gate.** `gate-4m-media.mjs:219-225` enforces the other half:

> A page absent from the baseline must carry no video at all.

So an unlisted `ar` route carrying a video is a violation, not a blind spot. The nine routes
carry zero videos, so having no baseline entry is **correct**, and re-baselining would have
emitted nothing. A11 is not an outstanding task — it is a **mis-specified criterion**, and
carrying it into the rollout checklist unchanged would schedule work that does nothing.

⚠ This is METHOD rule 4 with the sign reversed: the brief assumed a green run was uninformative
and it was actually structurally sound. The fix is to re-specify A11 as *"any new route carrying
video appears in the 4m baseline"* — which the gate already enforces without a checklist item.

---

## 4. The M-series: five of ten measurements were taken

| # | Measurement | Feeds | Status |
|---|---|---|:--|
| M4 | §4.2 name counts, per file, `en`↔`ar` | B-11 | ✔ E-2 §4.2 (Δ 0 on all ten terms), E-3, E-4 |
| M5 | re-measured floors for the 2 4i locks | A8 | ✔ frozen at `9282317` |
| M6 | census floor for `Key Takeaways → أبرز النقاط` | gate 4i | ✔ **measured: 4** — lock not written, §6.2 |
| M7 | Arabic-Indic digit incidence in authored prose | policy §3 | ✔ 0 over 129 862 chars |
| M8 | isolation-defect incidence in MDX body prose | gate 4n | ✔ **15 findings, two classes** (E-2 §2) |
| M1 | proclitic **و** distribution | B-8b | ⚠ **one file only** (E-1 §6.4: 129 attached / 9 pre-Latin) |
| M2 | definite article **ال** at a join seam | B-8b | ✘ **not measured** |
| M3 | whether Arabic has any sentence-level lock | B-8b | ✘ **not measured** |
| M9 | register drift — marked vs unmarked forms | policy §2 | ✘ **not measured** |
| M10 | plural/dual agreement in interpolated counts | policy §6 | ✘ **not measured** |

**M1–M3 are the whole of B-8b**, which never ran. **M9 and M10 are the ones that concern me
more**, for a reason the brief itself gives: they are policy *non-decisions* that become
measurable at pilot scale and cost a locale-wide sweep to revisit at 57. The pilot was the cheap
moment to take them and it passed without taking them. They are still cheap **today** — the
corpus is 9 files — and they will not be cheap after batch 2.

---

## 5. ⚠ Two defects in the pilot's own record

Both are cases where an upstream milestone recorded a finding that a downstream milestone did
not carry forward. Neither is a code defect; both would corrupt a lock if acted on.

### 5.1 The `Doc's Beach` apostrophe split propagated into E-4's eligibility table

E-0 **F5** recorded that chrome renders the ASCII `Doc's Beach` and body prose renders the curly
`Doc’s Beach`, that gate 4i does not fold punctuation, and — precisely — that *"a `latinLock`
written from the chrome spelling would measure 3 body occurrences out of 20."*

`measure-prose-window.mjs` carries the ASCII form only. Measured now over the 9 `ar` spokes:

| form | prose | chrome | whole |
|---|---:|---:|---:|
| ASCII `Doc's Beach` | **3** | 9 | **12** |
| curly `Doc’s Beach` | **17** | 0 | **17** |
| **both** | **20** | 9 | **29** |

**F5's prediction is exact — 3 of 20 — and E-4 used the 3.** The corrected row:

| | E-4 §4 recorded | corrected |
|---|---:|---:|
| prose | 3 | **20** |
| ceilNP | 9 | **9** |
| whole | 12 | **29** |
| headroom | 3 | **20** |
| class | feasible (strong) | **feasible (strong)** |

The **verdict survives; the reasoning about it does not.** E-4 §5.1 singled out `Doc's Beach` as
the case exposing the strength label's relativity — *"strong on a headroom of 3 that is all of
its prose"* — and that characterisation was an artifact of counting 41 % of the term. Its real
headroom is 20. E-0's ledger prediction of 30 (§2) was right all along; only the instrument was
wrong.

**No other candidate is affected** — `Doc's Beach` is the only term in the set containing an
apostrophe. **Nothing may be authored from E-4 §4's `Doc's Beach` row.**

> **✔ RESOLVED at E-5b (P-2)** — [`AR2-E5b-rollout-prep.md`](AR2-E5b-rollout-prep.md) §3. Both
> instruments now count every rendered form, the row is corrected in place, and re-running end
> to end confirmed **no other row moved**. ⚠ **The root cause is the renderer, not the author:**
> all 31 source occurrences are ASCII, exactly as the pilot brief instructed, and Astro's
> smartypants rewrites `'` → `’` in MDX **body** prose only. The split partitions by authoring
> surface, so this is **not a corpus compliance defect** and no sweep is warranted — and the
> brief's rule was unfollowable, which the rollout brief withdraws.

### 5.2 The dictionary-integrity category was recorded at E-0 and dropped at E-4

E-0 **F4** established a category: locks whose entire count is template, which *"are
dictionary-integrity locks and should be labelled as such rather than re-read as corpus locks."*

E-4's criterion is binary — `feasible ⟺ ceiling < whole` — and it classifies exactly that
category as **infeasible**, because for a dictionary lock the ceiling *is* the whole. That answer
is correct for the question E-4 asked ("can this floor detect translator drift?") and wrong as a
verdict on the lock's worth: a dictionary-integrity lock detects a **dictionary edit**, which is
a different failure and a real one.

`أبرز النقاط` is the live case. M6 is measured — **4**, one per rendering page, all from
`t('section.keyTakeaways')` via `KeyTakeaways.astro:13`. Under E-4's criterion it is infeasible.
Under E-0 F4's category it is a perfectly good dictionary lock at floor 4, and it is the identity
AR-1 deliberately left unlocked *because* its floor was then 0 — a condition that no longer
holds.

> **The taxonomy needs a third branch, and it is E-0's, not a new invention:**
> **corpus lock** (ceiling < whole — detects translator drift) · **dictionary-integrity lock**
> (ceiling = whole, provenance is a `t()` key — detects a dictionary edit) · **infeasible**
> (ceiling ≥ whole with *prose* provenance — detects nothing).

### 5.3 The pattern both instances share

E-3 conflated *feasible* with *strong*; E-4 corrected that and conflated *corpus lock* with
*dictionary lock*; E-4 also inherited E-0's apostrophe split without applying it. **Each
milestone's sharper predicate silently absorbed a distinction an earlier milestone had already
recorded.** Three occurrences is a pattern, and the counter-measure is cheap: when a milestone
narrows a predicate, re-read the *upstream* findings list against the new predicate rather than
only the upstream *numbers*.

---

## 6. Framework-permanent vs pilot-specific

The brief's §3 four-way separation held on its main claim and failed on one branch.

### 6.1 ✔ "Track E writes no gate code" — held exactly

No `gate-4*.mjs` was modified in any Track E commit. The engineering layer declared complete at
§3.1 stayed complete.

### 6.2 ✘ "No new instrument" — falsified, and the brief had no category for what was built

§1.5 and §3.4 both state that no new instrument is built. Track E built **two**:
`measure-prose-window.mjs` (E-3) and `measure-related-ceiling.mjs` (E-4), plus `--falsify`
controls.

The brief's categories were *gates* (enforce) and *reused instruments* (accept). Neither fits: a
**policy-derivation instrument** measures in order to decide what a gate should enforce, and it
never runs in CI. The prediction was falsified because the taxonomy had no slot for the thing
that turned out to be necessary — the same failure shape as §5.2, one level up.

> **Fifth category, for the rollout record:** *policy-derivation instrument* — not a gate, not an
> acceptance instrument; committed per METHOD rule 5, carries its own falsifier, never runs in CI.

### 6.3 What is permanent

| Finding | Scope |
|---|---|
| the five-component page decomposition (prose window) | **framework** — locale-independent |
| `feasible ⟺ non_prose_ceiling < whole` | **framework** — applies to any locale's floors |
| measured vs settled pool; settled is additive | **framework** |
| census-refresh guards (phrase-set diff; whole-census diff **by sign**) | **framework** — all 8 locales |
| B-14 — `<title>` text inside `visibleText@1` | **framework defect, open** |
| the `surface: "prose"` name collision | **framework defect, open** (engine, cross-host) |
| ADR-10 §8.1 digit-flank rule fired on authored prose 13× | **framework** — first live validation of a Track A derivation |
| gate 4n's guillemet claim (brief §3.2) is false around Latin runs | **framework** — corrected at E-2 §2.2 |

### 6.4 What is pilot-specific

The 9-file counts themselves; the floors 33/42; the 42 `4f` advisories (41 are `utv`, a hub
artifact); and — explicitly — the **Δ 0 `en`↔`ar` prose alignment**, which E-2 §4.2 flagged as
evidence *that this corpus complies*, not that compliance is automatic. The same author authored
and measured it, and E-1's compression style would not have produced Δ 0. **Δ 0 is not a
prediction for batch 2.**

### 6.5 Translator guidance produced by the pilot

Four items, none of which is in the frozen batch brief: bracket-then-Arabic-word to avoid the
class-A 4n finding (E-2 §2.1); no guillemets around a Latin run, isolate instead (E-2 §2.2); the
classifier-noun-before-Latin pattern that keeps the `و` seam population small (E-1 §6.4); and the
`description` 120–165 character budget, which Arabic diacritics consume (E-2 §6.4).

---

## 7. Is the E-4 §11 checklist sufficient?

Tested against every finding above: **nearly — it needs two additions and one correction.**

| | |
|---|---|
| ✔ covers | instrument route-list drift (§11.0), ceiling validity (Assertion A), census sign-check, gate re-run |
| **add** | **the punctuation-form check.** §5.1 is not covered by anything in §11: a term with more than one rendered form must have every form counted before a lock is written. Gate 4i does not fold punctuation. |
| **add** | **the deferred-criterion rule.** §3.1: an acceptance criterion whose remedy is a config or census change is not satisfied by measuring its inputs — mark it deferred, and carry it until the change lands. |
| **correct** | A11 as written schedules work that does nothing (§3.2). Re-specify or drop. |

---

## 8. New falsifiable predictions for batch 2 (`hiking`, 16 files)

Recorded here so batch 2 can falsify them, which is the method E-0 established and the reason its
misses were diagnosable.

| # | Prediction | Basis |
|---|---|---|
| P1 | **~30 gate 4n findings**, dominated by class A (bracket adjacent to a digit run) | E-2: 15 findings / 8 files = 1.9/file, an authoring-style rate, not a hub property |
| P2 | The settled ceiling grows by exactly the precomputed `hiking` rows: `Vernal` **+160** (88 → **248**), `Kawasaki` +64, `DNM` +95, `Adventure Tours Vernal` +64, `Uintah Basin` +48, `Green River` +32 | E-4 §6, the 57-row table — this is the direct test of the additivity claim |
| P3 | The 4f advisory **profile shifts off `utv`** and the total falls well below 42 despite 16 files | 41 of 42 are the `utv` marker; `hiking` renders it rarely |
| P4 | **~5 of 16** files exceed the `description` budget on first authoring | E-2: 3 of 9 |
| P5 | `en`↔`ar` prose Δ **will not be 0** unless batch 2 is authored one-for-one as E-2 was | E-2 §4.2's own caveat — ✔ **instrument committed at E-5c** (`--align <locale>`); the pilot baseline reproduces at Δ 0 |

P2 is the important one: if the measured related contribution after batch 2 exceeds those rows,
**Assertion A fails and the ceiling model is falsified**, which is reopen condition R2.

---

## 9. Recommendation — authorize, conditional on three preconditions

**The evidence supports rollout.** The engineering layer is closed and stayed closed; all 11
gates are green on a corpus 10× the baseline; every instrument the brief said would stop being
vacuous did so and produced true positives (4n 15, 4i 1); the floor architecture is decided and
enforcing; and the expansion procedure is written down and additive.

**Three preconditions, all documentation or measurement — no engineering:**

| # | Precondition | Why it blocks |
|---|---|---|
| **P-1** | Fold the pilot's corrections into `AR2-E0-batch-brief.md` — the four §6.5 guidance items, plus E-2 §2.2's correction to the brief's own guillemet claim | E-2 §7 **explicitly deferred this to E-5** so the decision point would evaluate the document E-2 was authored against. Batch 2 authored against the unamended brief will reproduce the class-B 4n findings and the schema failures by construction. |
| **P-2** | Mark E-4 §4's `Doc's Beach` row superseded and record the corrected figures (§5.1); extend the candidate list to both apostrophe forms before any B-11 lock is authored | A lock written from that row would measure 41 % of the term — the exact defect E-0 F5 predicted |
| **P-3** | Decide B-8b (**E-6**) status: run it at 9 files, or record it as deliberately deferred to a named corpus size | It is the one brief milestone that never ran, and M2/M3 have **zero** data. Silence is the failure mode — the backlog currently reads as though E-3 closed it |

**Strongly recommended, not blocking:** take **M9 and M10** at 9 files. They are policy
non-decisions that the brief scheduled for the pilot; they cost a 9-file review now and a
locale-wide sweep after batch 2. This is the last cheap moment.

**Not blocking and explicitly deferred:** native-speaker review (gates release, not rollout,
identically to `de`/`ja`/`zh`); B-12, B-13, B-14, B-16, B-17; the `surface` naming collision;
the `/ar/` homepage and inline pages.

### 9.1 Reopen conditions in force

| | Condition | Source |
|---|---|---|
| **R1** | a term infeasible under the settled ceiling **and** feasible under a window-scoped one → reopen the A/B architecture decision | E-4 §10.4 |
| **R2** | observed related **>** settled ceiling on any registered page → the English-predicts-Arabic assumption is falsified and the ceiling must be rebuilt from measured Arabic frontmatter | E-4 §3.1, §11.2 check 2 |
| **R3** | a second independent browser-only positional defect → B-17 promotes from proposal to layer | E-2 §7 |
| **R4** | a 4c challenge that reverses a policy §2/§4 decision → 9-file sweep now, locale-wide later | brief §1.6 |

### 9.2 What the pilot did **not** demonstrate

Nine of 57 spokes, one hub plus two files, one author, one authoring style. It has not
demonstrated behaviour at rollout scale, across hubs with different vocabulary, or under a second
translator. §8's predictions are the instrument for finding that out one batch at a time rather
than at 57.

---

## 10. Deliberately not done

- **No engineering, gate, census or corpus change** — per scope.
- **The frozen brief is not edited.** §1.2 supersedes its §4 by record; editing it would destroy
  the divergence this document measures.
- **P-1's brief amendment is recommended, not performed** — it is a corpus-brief change and
  belongs to whoever authors batch 2.
- **B-8b is not started**, and no seam rule is proposed here.
- **No lock is authored**, including `أبرز النقاط`, whose floor §5.2 measures at 4.
