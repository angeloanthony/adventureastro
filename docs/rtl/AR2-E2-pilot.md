# AR-2 Track E, E-2 — the pilot expansion

**METHOD citation:** rules 1 · 3 · 4 · 8 · 11 · 14 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. **Baseline:** `9695f05` (B-15 stage 2). **Commit:** `e189f1c`.
**Corpus before:** 621 pages, `ar` 2 routes. **After:** 629 pages, `ar` 10 routes.

E-2 authored the 8 remaining pilot spokes under an unchanged brief and unchanged
instrumentation. It produced the corpus the later milestones are gated on, the largest
true-positive run gate 4n has ever produced, and **a correction to E-1's own per-term
census** that changes which window B-11 floors may be measured over.

---

## 1. Acceptance — measured

| # | Criterion | Result |
|---|---|---|
| A2 | Route delta **exactly +8** | 621 → **629**. `validate-site: ✔ 629 pages — links resolve, no orphans` |
| A5 | Every new page renders effective direction `rtl` | gate 4k: `ar rtl`, 9 locales, 629 pages |
| A6 | Zero isolation findings | gate 4n: `✔ 10 rtl page(s) … no unisolated mirrored character` — **after §2** |
| A7 | Zero Arabic-Indic digits | gate 4q ✔, `ar` **0** occurrences across **129 862** chars |
| A9 | 4f/4g `ar` stay in-progress | 4f: **42** advisories, non-blocking (§5.1) |
| A10 | `ar` stays gallery-exempt | gate 4j: `1 locale(s) render no gallery: "ar"` |
| A12 | Gate 4o population grows, 0 findings | `44 in-scope file(s) — 0 literal affordance glyphs` |
| — | 4h, 4i, 4g, 4m, 4p | all green; 4i advisories back to the 3 pre-existing `es`/`ja` locks |

`ar` visible text: **12 885 → 129 862** characters. The corpus is traversed and the run is
not vacuous.

---

## 2. ⚠ Gate 4n's largest true-positive run — 15 findings, two classes, neither in the brief

The first build of the full batch **exited 1**: `15 unisolated mirrored character(s) at a
direction change, on 4 page(s)`. E-1 produced one such finding; E-2 produced fifteen, on
real translated prose, and they are not one defect repeated.

### 2.1 Class A — a bracket adjacent to a digit run (13 sites)

```
"(" in <h2>  flanked R … N
    برنامج مقترح لنصف يوم (3 إلى 4 ساعات)
```

Arabic on the left, a digit on the right. ADR-10 **§8.1** — the finding that a digit run
counts as a flank, because UAX #9 I2 raises EN/AN to an even level and makes it an LTR
island — is what makes this a direction change. That rule was derived at Track A from a
*reproduction* of a recorded measurement and had **never fired on authored prose**. It has
now fired thirteen times.

**The fix is authoring, not markup**: put an Arabic word after the opening bracket, so the
bracket is flanked by Arabic on both sides. `(3 إلى 4 ساعات)` → `(مدته 3 إلى 4 ساعات)`;
`(نحو 2–5)` → `(من نحو سنتين إلى 5 سنوات)`. The digits stay Western (policy §3) and the
sentence keeps its meaning.

### 2.2 Class B — guillemets around a Latin run (2 sites)

```
"«" in <p>  flanked R … L
    أو كانت كلمتا «متجاورة» و«UTV» جديدتين عليك
```

**The brief is wrong here, and it is worth saying precisely how.** §3.2 states:

> ⚠ `›` `‹` `»` `«` are also `Bidi_Mirrored=Yes` and need **no** action — the algorithm
> flips them correctly.

That is true of a guillemet in Arabic-only context, and false of one wrapping a **Latin**
run: there the quotation mark *is* the direction change. The brief's claim was measured
over the wrong population — guillemets in Arabic prose — and generalised to all of them.
**Rule 18 again, in the brief rather than in a census.** Fixed by dropping the guillemets
around the Latin token and isolating it instead: `و«UTV»` → `و<bdi>UTV</bdi>`.

### 2.3 One finding was in FAQ frontmatter — B-15's residual, live

```
"(" in <div class="faq-answer">
    خطّط لنصف يوم على الأقل (3 إلى 4 ساعات) لرؤية Quarry Exhibit Hall
```

`bidi-runs.ts` isolates the **named** runs — phone and currency — and nothing else, so a
bracket in an FAQ answer is exactly the residual [B-15 §6](AR2-B15-decision.md) recorded:
*un-isolatable from frontmatter, and gate 4n blocks the build if one appears.* It appeared,
it blocked, and the remedy was the one the decision predicted — rephrase. **The residual
behaved as specified on first contact with a corpus**, which is the strongest evidence
available that it was scoped honestly rather than hopefully.

---

## 3. ⚠ Gate 4i's first true positive on Arabic prose

The first file authored used **`الدروب`** for *trails* where the `offroad-trail` lock
requires **`المسارات`**:

```
Locale: ar   Locked term: المسارات   Observed: الدروب (1 site)
Why this is drift: competing rendering; unmeasured on a one-page corpus
```

E-0 recorded both `ar` locks as **100 % chrome**, so neither had ever tested a translator.
This is the first occasion one has, and it caught a real competing rendering on the first
file of the batch. Fixed at all 4 source sites, not only the flagged one — a lock is a
terminology decision, not a per-site one.

---

## 4. ⚠ The per-term census corrects E-1, and the correction is about the window

### 4.1 E-1 §5's `ar` figures do not reproduce — and its `en` figures do

Measured on E-1's own page, `<main>` window, the window E-1 used:

| Term | E-1 recorded `en` | now | E-1 recorded `ar` | now |
|---|---:|---:|---:|---:|
| `Vernal` | 31 | **31** ✔ | 24 | **31** ✘ |
| `Kawasaki KRX 1000` | 8 | **8** ✔ | 6 | **8** ✘ |
| `(435) 219-9447` | 3 | **3** ✔ | 2 | **3** — explained |

The English side reproduces exactly. The Arabic side does not, **on a file whose prose was
not edited** (B-15 stage 2 changed one sentence, which accounts for the phone 2 → 3 and
nothing else).

**Cause: `<main>` contains `section.related-articles`, whose contents depend on how many
sibling routes are registered.** At E-1 the Arabic page's related block resolved against a
one-route Arabic corpus; at E-2 it resolves against ten. Registering eight slugs therefore
changed the measured per-term counts of a page nobody re-authored. This is E-1 §6.3's own
finding — *the `AR_SLUGS` entry is not bookkeeping, it edits every sibling route* — arriving
a second time, now as a **measurement hazard rather than a byte-diff hazard**.

> **A per-term count taken over `<main>` is not stable across corpus growth.** It mixes
> translator prose with a template block whose contents are a function of the registry.

### 4.2 The prose window, and the alignment it measures

Defining **prose = `<main>` − `related-articles` − `tour-cta` − `author-byline`** and
measuring both sides of all nine files:

| Term | `en` prose | `ar` prose | Δ |
|---|---:|---:|---:|
| `Vernal` | 178 | 178 | **0** |
| `Doc's Beach` | 3 | 3 | **0** |
| `Moonshine Arch` | 16 | 16 | **0** |
| `Outlaw Trail` | 11 | 11 | **0** |
| `Asphalt Ridge` | 9 | 9 | **0** |
| `Kawasaki KRX 1000` | 39 | 39 | **0** |
| `Dinosaur National Monument` | 23 | 23 | **0** |
| `(435) 219-9447` | 33 | 33 | **0** |
| `$349` | 38 | 38 | **0** |
| `$125` | 22 | 22 | **0** |

Δ 0 on every term, and **per file** as well as in total. Two honest caveats, because the
result is unusually clean: the same author both authored and measured this corpus, and E-2
preserved §4.2 names one-for-one by construction, which is what the policy asks for but is
not the only faithful way to translate — E-1 compressed (pronoun for repeated toponym) and
would not produce Δ 0 even in this window. The figure evidences **that the corpus complies**,
not that compliance is automatic.

**33 occurrences of the phone across the pilot's Arabic prose**, every one isolated, against
the brief's predicted 33 in the English sources — the §3 authoring requirement met exactly.

> **⚠ ADDENDUM — E-5c (`measure-prose-window.mjs --align ar`).** The table above was produced by
> a throwaway census that was never committed, so for four milestones this result could not be
> re-derived from the repository (E-5b §5.2). It now can be.
>
> **The conclusion reproduces exactly: Δ 0 on all ten terms, on all nine files.** Eight of the
> ten magnitudes are identical. **Two are not, and both are window/counting defects on *this*
> table rather than corpus findings** — Δ 0 holds in both cases because both sides were affected
> equally:
>
> - **`Doc's Beach` 3 → 20.** The ASCII apostrophe only; the term also renders curly, produced by
>   the markdown renderer from the same ASCII source (E-0 F5, fixed at E-5b §3).
> - **`$349` 38 → 29.** Measured: prose 29 + `div.tour-cta` 9 = `<main>` 38. **This row was taken
>   over `<main>`, not over the prose window this section's own text defines.**
>
> Full account and controls: [`AR2-E5c-alignment-instrument.md`](AR2-E5c-alignment-instrument.md).
> This table is left as written — it is the record of what was measured at `e189f1c`.

---

## 5. B-11 / 4i floor inputs, re-measured on the completed pilot (A8)

| Lock | body | chrome | spokes | `/ar/cancellation-policy/` | **corpus total** |
|---|---:|---:|---:|---:|---:|
| `أرض الديناصورات` (`dinosaur-country`) | 23 | 9 | 9/9 | 1 | **33** |
| `المسارات` (`offroad-trail`) | 32 | 9 | 9/9 | 1 | **42** |

**E-0's projection is superseded and its conclusion inverted.** E-0 predicted chrome would
contribute *1 per page per lock = 10*, and warned that any floor at or below 10 would be
satisfiable by chrome alone. Measured: chrome contributes **9** per lock across the nine
spokes (1 per spoke), plus 1 on the inline page — so the warning holds at exactly the
predicted magnitude, and the **margin above chrome is now large**: 23 and 32 body
occurrences respectively.

> **E-4 floor guidance, measured:** any floor for these two locks must exceed **10**, and
> the headroom that actually measures translator output is **23** (`dinosaur-country`) and
> **32** (`offroad-trail`). Floors must be set on the **prose window** of §4.2, not on
> `<main>` — §4.1 is why.

Chrome constant, re-measured across ten pages: **929–953 chars/page, mean 943** (E-1
measured 988 on one page in a window that included the related block). Total corpus:
whole **124 507** · body **116 022** · chrome **8 485**.

---

## 6. Findings recorded separately from translation defects

### 6.1 Gate 4f advisories rose 2 → 42, and 41 of them are one policy rendering correctly

All 42 are `ar` (in-progress, non-blocking). By marker: **`utv` 41**, **`and` 1**.

`UTV` is Latin **by decision** (policy §4.2), so these are the policy working, not drift —
E-1 §6.1 established that for 2 findings and it now holds for 41. The single `and` finding
is new and is a different shape: it comes from the §4.2 personal name
`Dave and Trudy Wilson` in an `<h2>`, where the English conjunction is *inside* a name that
policy requires to stay Latin.

> **Extends E-1 §6.1's warning:** before 4f's `ar` lexicon leaves in-progress, the whitelist
> must cover not only `UTV`/`ATV`/`Jeep` and the §4.2 name list, but **English function
> words occurring inside a §4.2 name**. A whitelist built from the term list alone would
> still fail on `and`.

### 6.2 No new B-16-class defect found

The per-term census surfaced no hardcoded English string that a dictionary cannot reach
beyond the already-filed **B-16** (`TourCta.astro:25` `/machine`), which renders on all nine
new spokes as predicted. B-12 and B-13 are unchanged and out of Arabic prose's reach.

### 6.3 §5 challenge — the editorial marker convention has no Arabic form

`VERIFY WITH OFFICIAL SOURCE` is rendered in every other locale as **uppercase** target-
language text (`PRÜFE BEI DER OFFIZIELLEN QUELLE`, `VERIFIQUE CON LA FUENTE OFICIAL`). The
convention's scannability is carried entirely by **letter case**, which Arabic does not
have. E-2 used a fixed, consistently-worded phrase — `تأكّد من المصدر الرسمي` — 24 times
across three files, which preserves the *meaning* and loses the *visual marker*.

Recorded as a §5 challenge rather than resolved: whether the marker needs a non-case
mechanism in Arabic (bold, a bracketed tag, a comment) is an editorial decision, and it
affects every locale whose script is caseless — `ar`, `ja`, `zh` — not only this one.

### 6.4 A frontmatter budget the brief does not mention

`content.config.ts` constrains `description` to **120–165 characters**. Three of the nine
Arabic files exceeded it on first authoring (by 30, 1 and 2 characters) and failed the build
at schema validation, before any gate ran. Arabic diacritics (`مُرشَدة` carries two) each
consume one character of that budget. Worth a line in the brief for batches 2–9; it is a
schema failure, not a gate finding, so nothing in §6 of the brief would have caught it.

---

## 7. Deliberately not done

- **No instrumentation or gate change**, per scope. Every measurement above uses existing
  gates or a throwaway census.
- **B-17 stays a proposal.** No second independent browser-only positional defect was
  observed — E-2's findings were all 4n-visible or schema-visible. The bar the owner set
  (a second independent occurrence) has not been met, so nothing is promoted.
- **The 4h `ar` seam block (E-3)** — E-2 produces the corpus; the rule is E-3's deliverable.
- **The 4i `ar` floors themselves (E-4)** — §5 gives the inputs; setting the floors is E-4,
  and doing it here would repeat the stale-baseline shape A8 exists to prevent.
- **`docs/rtl/AR2-E0-batch-brief.md` is unamended.** §2.2 and §6.3 are corrections to it and
  should be folded in before batch 2, but amending a brief mid-pilot would make the E-5
  decision point evaluate a document that no longer describes what E-2 was authored against.
