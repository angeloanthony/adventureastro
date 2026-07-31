# AR-2 Track E — translator addendum for batches 2–9

**Status:** addendum. **Supersedes nothing.**
**Governing brief:** [`AR2-E0-batch-brief.md`](AR2-E0-batch-brief.md) — **frozen, do not edit.**

This file exists because the brief is deliberately frozen. It is the historical record of the
assumptions batch 1 was authored under, and **E-5 reconciles it against what the corpus
measured**; editing it now would destroy the comparison that makes E-5 worth running. So the
corrections live here, and an author for batch 2 reads **both**.

Everything below is measured, from the nine-file pilot. Each item names where it came from.

---

## 1. ⚠ Correction to brief §3.2 — guillemets are **not** always safe

The brief says:

> ⚠ `›` `‹` `»` `«` are also `Bidi_Mirrored=Yes` and need **no** action — the algorithm
> flips them correctly.

**True for a guillemet in Arabic-only context. False when it wraps a Latin run**, where the
quotation mark *is* the direction change and gate 4n fails the build. Two sites in E-2.

```mdx
✘  أو كانت كلمتا «متجاورة» و«UTV» جديدتين عليك
✔  أو كان مصطلحا «المركبة المتجاورة» و<bdi>UTV</bdi> جديدين عليك
```

**Rule:** never put a guillemet immediately around a Latin token. Quote the Arabic, isolate
the Latin.

---

## 2. ⚠ New — a bracket may not touch a digit run (13 sites in E-2)

The largest single class gate 4n found. An opening bracket followed **immediately** by a
digit is a direction change, because UAX #9 raises a digit run to an even embedding level and
makes it an LTR island (ADR-10 §8.1).

```mdx
✘  برنامج مقترح لنصف يوم (3 إلى 4 ساعات)
✔  برنامج مقترح لنصف يوم (مدته 3 إلى 4 ساعات)

✘  الدارجون (نحو 2–5)
✔  الدارجون (من نحو سنتين إلى 5 سنوات)
```

**Rule:** put an Arabic word immediately after `(` and immediately before `)`. Digits stay
Western (policy §3) — this changes the sentence, not the numerals. The same applies to a
closing bracket preceded by a digit or by a Latin token.

---

## 3. ⚠ New — the frontmatter schema is a hard budget, and Arabic diacritics spend it

`src/content.config.ts` enforces, **before any gate runs**:

| Field | Constraint |
|---|---|
| `title` | ≤ **65** characters |
| `description` | **120–165** characters |
| `heroAlt` | ≥ **20** characters |

**3 of the 9 pilot files failed `description` on first authoring** (by 30, 1 and 2). Every
diacritic counts: `مُرشَدة` spends two characters on damma and fatha. A build that fails here
reports `InvalidContentEntryDataError`, not a gate finding, so nothing in the brief's §6
acceptance table would have caught it.

**Rule:** count the description before submitting. Nothing in the pipeline warns you first.

---

## 4. Terminology — a lock caught real drift on the first file

Gate 4i's `offroad-trail` lock fired on `الدروب` where policy requires `المسارات` / `مسار`.
It was the first true positive either Arabic lock has produced on translator prose.

**Rule:** *trail* is **`مسار` / `المسارات`**, in every sense — an off-road route, a historic
outlaw route, a walking path. `الدروب` is a competing rendering and the gate blocks it. Fix
every occurrence in the file, not only the flagged one; a lock is a terminology decision, not
a per-site one.

---

## 5. Authoring patterns that keep the isolation population small

Both measured, both carried forward from E-1/E-2 because they reduce work rather than add it:

- **Prefix a Latin proper noun with an Arabic classifier noun** — `مسار Doc's Beach`,
  `منطقة Uintah Basin`, `شركة Adventure Tours Vernal`. E-1 §6.4 measured this keeping the
  proclitic `و` attached to Arabic in 93.5 % of cases, which keeps the B-8b seam population
  small.
- **`<bdi>` the phone, every price, and any Latin run at a clause boundary.** E-2 authored
  **33** phone occurrences across the pilot, every one isolated — matching the brief's
  predicted 33 in the English sources exactly.
- **FAQ frontmatter is different from body prose.** `FaqAccordion` isolates the phone and
  currency automatically (B-15), so **do not** write `<bdi>` into `faq[].q` / `faq[].a` — it
  would arrive as literal text. But the automatic isolation covers **only** those named runs:
  a bracket or a Latin run in an FAQ answer still has to follow §1 and §2 above, and gate 4n
  will block the build if it does not. One E-2 finding was exactly this.

---

## 6. Open — the editorial marker has no Arabic form

`VERIFY WITH OFFICIAL SOURCE` is rendered by every other locale as **uppercase**
target-language text (`PRÜFE BEI DER OFFIZIELLEN QUELLE`, `VERIFIQUE CON LA FUENTE OFICIAL`).
The convention's scannability is carried entirely by **letter case, which Arabic does not
have.**

E-2 used a fixed phrase — **`تأكّد من المصدر الرسمي`** — 24 times across three files. It
preserves the meaning and loses the visual marker.

**Use the same fixed phrase for now, verbatim,** so the corpus stays consistent and a future
sweep is one find-and-replace. Whether the marker needs a non-case mechanism (bold, a
bracketed tag) is an editorial decision that affects **`ar`, `ja` and `zh` alike** — it is
filed as a §5 challenge, not resolved here.

---

## 7. What did *not* need changing

Recorded so batch 2 does not re-litigate settled ground:

- **Policy §4.2's Latin name list survived the pilot intact** — 0 transliterations, and the
  per-term `en`↔`ar` alignment is Δ 0 on all ten measured names.
- **Policy §3's Western-digit rule survived** — gate 4q: 0 Arabic-Indic digits across 129 862
  characters of Arabic.
- **The §2.1 exonyms and §2.3 locked identities** needed no revision.
- **`Doc's Beach` keeps the ASCII apostrophe** (brief §2.2) — held across all nine files.
