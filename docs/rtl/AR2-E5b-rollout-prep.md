# AR-2 Track E, E-5b — rollout preparation: preconditions P-1, P-2, P-3

**METHOD citation:** rules 1 · 4 · 5 · 8 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. **Baseline:** `18903f2` (E-5). No Arabic authored, no corpus expansion, no
gate modified, no census refreshed.

**Numbered `E-5b` on the `E-1b` precedent** — an added milestone inside an existing one, leaving
`E-6` free for B-8b, which §4 decides.

**Scope note.** The instruction was *"documentation and planning only unless P-3 explicitly
authorizes engineering."* P-2 could not be satisfied without editing two **policy-derivation
instruments** — the fifth category E-5 §6.2 named: not gates, not acceptance instruments, never
run in CI. Those edits were made; **no `gate-4*.mjs` was touched** and the `4h`/`4i` configs are
unchanged. §3.4 records exactly what changed.

---

## 1. Outcome

| | Precondition | Outcome |
|---|---|---|
| **P-1** | translator guidance | ✔ [`AR2-rollout-batch-brief.md`](AR2-rollout-batch-brief.md) — pilot brief preserved unedited |
| **P-2** | `Doc's Beach` correction | ✔ corrected; **root cause is the renderer, not the author**; instruments fixed; no other row affected |
| **P-3** | B-8b decision | ✔ **deferred, with two named triggers and the census that makes it specifiable** |
| — | batch-2 prediction review | ⚠ **3 of 5 evaluable as-is; 2 have instrumentation gaps** (§5) |

---

## 2. P-1 — the rollout brief

[`AR2-rollout-batch-brief.md`](AR2-rollout-batch-brief.md) is a new document. **The pilot brief
is unedited**, because E-5 measures the pilot *against* it and amending it would destroy that
evidence — the same reasoning E-2 §7 used when it deferred this to E-5 in the first place.

Every change is marked ⚠ NEW or ⚠ CORRECTED and cites its pilot measurement. Traceability, in
full:

| Change | Traces to | Measured |
|---|---|---|
| bracket adjacent to a digit run is a direction change | E-2 §2.1 | **13** gate-4n findings |
| guillemets around a Latin run **do** need action | E-2 §2.2 | **2** gate-4n findings; corrects the pilot brief's own §3.2 |
| classifier-noun before a Latin name | E-1 §6.4 | 129 attached / 9 pre-Latin on file 1; **1 807 / 47 / 0** corpus-wide (§4.2) |
| `description` 120–165 budget, diacritics included | E-2 §6.4 | **3 of 9** files failed schema validation |
| apostrophe instruction **withdrawn** | E-5 §5.1 + §3 below | 31 ASCII in source, 17 curly rendered |
| caseless editorial marker is an open challenge | E-2 §6.3 | 24 uses of one fixed phrase across 3 files |
| M9 / M10 are still owed | E-5 §4 | never measured |
| floors now enforce at 33 / 42 | `9282317` | — |
| finishing a batch is two operations | E-4 §11 | — |

**No rule was added that the pilot did not produce.** Two candidates were rejected on that
ground: a "prefer short sentences" style note, and a rule about `<bdi>` inside headings — neither
has a measurement behind it.

---

## 3. P-2 — `Doc's Beach`, corrected

### 3.1 ⚠ The root cause is the renderer, and it exonerates the translator

E-5 §5.1 established that E-4 counted one apostrophe form. It did not establish **why** the
corpus contains two. Measured now, at source and at render:

| | ASCII `'` | curly `’` |
|---|---:|---:|
| **`.ar.mdx` source, all 9 files** | **31** | **0** |
| rendered — MDX body prose | 0 | **17** |
| rendered — frontmatter (FAQ answers) | **3** | 0 |
| rendered — dictionary (footer trail list) | **9** | 0 |

**The author typed the ASCII apostrophe every single time, exactly as the pilot brief §2.2
instructed.** Astro's markdown renderer applies smartypants to MDX **body** prose and rewrites
`'` → `’`; frontmatter and dictionary strings are never markdown-processed and keep ASCII.

Two consequences, and the second is the one that matters:

1. **The split partitions by authoring surface, not by author choice.** It is therefore
   deterministic and predictable — not drift.
2. **The pilot brief's §2.2 rule was unfollowable.** *"The Arabic corpus picks one form and holds
   it"* is not something a translator can do; the pipeline decides. The rollout brief withdraws
   the instruction and replaces it with a statement of the behaviour (§2.2 there).

This also settles a question E-5 left open: it is **not** a corpus compliance defect, and no
sweep of the Arabic corpus is warranted.

### 3.2 The corrected row

| | E-4 §4 recorded | **corrected** |
|---|---:|---:|
| prose | 3 | **20** |
| template (chrome + cta + byline) | 9 | 9 |
| related ceiling | 0 | 0 |
| `ceilNP` | 9 | 9 |
| whole | 12 | **29** |
| headroom | 3 | **20** |
| class | feasible (strong) | **feasible (strong)** |

The verdict was never in doubt; the evidence was wrong by 2.4×. E-4 §5.1 used this row as its
example of a relatively-strong-but-absolutely-thin lock, and **that characterisation is
withdrawn** — a headroom of 20 against 20 prose occurrences is strong on both readings.

### 3.3 No other row depends on the same assumption — verified, not assumed

Re-running both instruments end to end after the fix: **`Doc's Beach` is the only row that moved.**
All twelve other rows, both ceilings, all three measured-vs-settled disagreements, and Assertion
A are byte-for-byte unchanged, and `--falsify` still goes red (4 violations at limit 1).

Structurally this is expected — `Doc's Beach` is the only candidate containing a character
smartypants rewrites; no other term contains an apostrophe, quote, ellipsis or double hyphen —
but E-0 F5 was also structurally obvious and still went unapplied for three milestones, so the
check was run rather than reasoned.

### 3.4 What changed in code

Both files are policy-derivation instruments (E-5 §6.2). Neither runs in CI.

- **`measure-prose-window.mjs`** — a candidate may declare `forms: [...]`; every form is counted.
  `Doc's Beach` declares both apostrophes.
- **`measure-related-ceiling.mjs`** — same change, applied to the frontmatter card pool. The
  ASCII form is the only one expected there (frontmatter is not markdown-processed), and the
  instrument now **measures that rather than assuming it**.

Both carry the rule in a comment beside the list: *any term whose rendered string can be
rewritten by the pipeline needs every form listed.* This is E-4 §11's missing punctuation-form
check, implemented at the point where it can actually fire.

---

## 4. P-3 — B-8b: **deferred**, with named triggers

### 4.1 What B-8b actually is, restated from the artifacts

The deliverable is an `i18n-gates/4h-seams.json` `ar` block — a connective list and a matcher
form — plus the census justifying each entry. Current state:

```
ar block: state "in-progress", script "arabic", locks 0, connectives 0
4h locks by locale:  zh 1 · ja 1 · de 0 · fr 0 · es 0 · it 0 · pt 0 · ar 0
```

### 4.2 The census, taken now — B-8b is specifiable, which it was not before

Measured across the 9 `.ar.mdx` sources:

| | count |
|---|---:|
| proclitic **و** attached to an Arabic word | **1 807** |
| proclitic **و** immediately before a Latin run | **47** (2.5 %) |
| **standalone و** (whitespace both sides) | **0** |
| a **locked phrase** preceded by an attached proclitic | **8** |

The 8 seam sites: `والمسارات` · `فالمسارات` · `بالمسارات` · `لأرض الديناصورات` ×3 ·
`فأرض الديناصورات`.

**This confirms D-2's prediction at corpus scale and quantifies it.** D-2 argued from a
constructed example that the Arabic connective form can be neither inherited form. Measured:
the **latin** word-boundary matcher requires `و و` and the corpus contains **0**; the **cjk**
adjacency matcher would fire on all **1 807**. The two available forms differ by 0 and 1 807 —
neither is usable, and the rule must be written from scratch. That is no longer an argument, it
is a measurement.

### 4.3 Why defer rather than build

Four reasons, in order of weight:

1. **There is nothing to apply the rule to.** Gate 4h checks seams around phrases locked *in
   4h-seams.json*, and `ar` has **zero** — as do `de`, `fr`, `es`, `it` and `pt`. **Five of eight
   shipped locales carry no 4h seam lock**, and none is considered incomplete for it. An empty
   `ar` lock list is the normal state, not an Arabic gap.
2. **The gate is fail-closed against accidental use.** B-8a's dispatcher exits 2 naming the
   locale if a script declares connectives with no matcher form. Adding an Arabic seam lock
   without first defining the form **cannot** silently half-work.
3. **Nothing currently mis-counts.** Gate 4i counts by substring, so `بالمسارات` contains
   `المسارات` and all 8 seam sites are counted correctly by the floors frozen at `9282317`. The
   same holds for the `forbidden` entries. There is no live defect.
4. **Building a matcher for zero locks is engineering ahead of need** — the exact inversion of
   this project's method, and the thing E-3 demonstrated the cost of when it found that B-11's
   floors could not be written until the window existed.

### 4.4 The decision, recorded

> **B-8b is DEFERRED — not omitted, not silently open.** Its census (§4.2) is recorded, so it is
> **specifiable** for the first time; E-6 remains reserved for it. It is removed from the rollout
> critical path and does **not** block batch 2.
>
> **Trigger 1 — the first proposal of an Arabic 4h seam lock.** At that moment the connective
> form must be defined, and B-8a's dispatcher will refuse to guess.
>
> **Trigger 2 — standalone `و` rising above 0 in any later batch.** It is 0 across 1 854
> occurrences today. A non-zero count means a second authoring style has entered the corpus, and
> the §4.2 numbers must be retaken before they are relied on.
>
> **Falsifier for the deferral itself:** if any batch produces a gate-4i or gate-4h finding whose
> cause is a proclitic-prefixed locked phrase, reason 3 is wrong and B-8b becomes blocking.

---

## 5. The five batch-2 predictions — confirm, falsify, and can we measure it?

E-5 §8 recorded five predictions. Reviewed here for evidential value, per the instruction.

| # | Confirms it | Falsifies it | Instrument | Ready? |
|---|---|---|---|:--|
| **P1** ~30 gate-4n findings | first full batch-2 build reports 20–40 | ≤10 or ≥60 | gate 4n | ⚠ **destroyed by the fix** — §5.1 |
| **P2** settled ceiling `Vernal` 88 → 248 | `measure-related-ceiling --project` after registration | any row ≠ table, or Assertion A red | ceiling instrument | ✔ **but needs §11.0 first** |
| **P3** 4f advisories shift off `utv` | 4f marker breakdown no longer `utv`-dominated | still ≥90 % `utv` | gate 4f | ✔ ready |
| **P4** ~5 of 16 description overruns | count of schema failures at first authoring | 0–1, or ≥10 | astro schema | ⚠ **destroyed by the fix** — §5.1 |
| **P5** `en`↔`ar` prose Δ ≠ 0 | per-file alignment shows non-zero Δ | Δ 0 on all terms | — | ✘ **no committed instrument** — §5.2 |

### 5.1 ⚠ P1 and P4 measure quantities that the remedy erases

Both are **first-contact counts**. Gate 4n's 15 findings and the 3 schema failures exist only
until they are fixed; a green build afterwards is indistinguishable from a batch that never had
them. Neither leaves an artifact.

**Required, and it is a process instruction, not an instrument:** capture the **first** full
batch-2 build output before any remedial edit, and record the counts in the batch report. E-2
did this for 4n by accident (it wrote the findings into its report); it did it for the schema
failures too, in §6.4. Batch 2 must do it deliberately.

### 5.2 ✘ P5 has no instrument, and E-2's number came from a throwaway

`measure-prose-window.mjs` reads `dist/**ar**/<slug>/index.html` — the locale is hardcoded at
two sites. It **cannot measure the English side at all.** E-2 §4.2's celebrated Δ 0 across ten
terms was produced by what that document itself calls *"a throwaway census"*, which was never
committed.

So the single most-cited quality result of the pilot **is not reproducible with any instrument in
the repository** — a METHOD rule 5 violation that survived four milestones because the number was
clean and nobody needed to re-derive it.

> **This is the one instrumentation gap that should be closed before batch 2**, and it is small:
> parameterise the locale and add an `--align <locale>` mode that reports per-file `en`↔`<locale>`
> deltas. It is not a precondition — P5 is a prediction, not a gate — but leaving it open means
> batch 2 either reproduces the throwaway or reports nothing.

Recorded as a recommendation, **not performed**: it is instrument work, and this milestone's
authorization for that was scoped to P-2.

---

## 6. Acceptance

| | |
|---|---|
| Documentation and planning only, except P-2's instrument fix | ✔ §3.4 — no gate, no gate config, no census |
| No Arabic pages translated | ✔ |
| No corpus expansion | ✔ 629 pages, `ar` 10 routes, unchanged |
| No backlog ambiguity about rollout preconditions | ✔ P-1 done · P-2 done · P-3 decided and recorded |
| Batch 2 can begin immediately | ✔ — with §5.1's capture instruction and §5.2 noted |

---

## 7. Deliberately not done

- **The pilot brief is not edited** — it is the document E-5 measured against.
- **No lock authored**, including `أبرز النقاط` (measured 4) and the ten E-4 §4 calls feasible.
  That is **E-7**.
- **B-8b not started** — §4.4, deferred with triggers.
- **The `--align` instrument is not built** — §5.2, recommended.
- **M9 / M10 not measured.** They are translator-reported census items and the rollout brief §5
  asks for them; taking them retrospectively over the pilot is a separate call.
- **The `surface` naming collision** (E-4 §7.2) — still a framework item, still untouched.
