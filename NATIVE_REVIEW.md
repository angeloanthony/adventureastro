# Native-Speaker Review — German (`de`), Japanese (`ja`), Simplified Chinese (`zh`)

**Status:** ✅ **the original review programme is COMPLETE** (closed at P21,
2026-07-25). Six post-review opportunities remain open in **§E** — they were
discovered *by* this review, not missed by it.
**Prepared:** `de`/`ja` on 2026-07-22 against `i18n-ja-complete` (`65041fd`);
`zh` added 2026-07-25 against `i18n-zh-complete` (`41b3482`).
**Counts re-verified:** 2026-07-25 at `0e1c682` (P12). Note the C1 and C6 corpus
fixes were committed *after* `i18n-zh-complete`, so the shipped `zh` corpus is
two commits ahead of that tag — the tag marks route completeness, not the
current editorial state. Every `zh` count below is measured at `0e1c682`.
**Scope:** `de`, `ja`, `zh`. `es` and `it` have never had a native review — see
§D. No code or translation has been changed to produce this document — every
number below is a count from the shipped corpus.

All three locales are feature-complete (57 MDX spokes + 20 inline pages each,
77/77 registered routes, validator green). What remains is judgement a corpus
scan cannot make. This document exists so a reviewer decides a short list of
questions, not so they read 171 files.

**Decided — 12 of 13, with C5 needing no decision. ✅ The original review programme
(A1–A6, B1–B2, C1–C6) is COMPLETE as of P21, 2026-07-25.**

| Item | Decision | State |
|---|---|---|
| **A1** German register | **informal `du` confirmed**; `Sie` flip cancelled | ✅ decided **and closed** 2026-07-25 — **DE review unblocked**. Residual re-measured at P12: **0 formal leaks, 0 standalone capitalisation leaks**; the capitalisation split is A2, not A1 |
| **A2** German heading capitalisation | **German sentence case** confirmed; nominalised forms preserved | ✅ decided **and fully applied** 2026-07-25 (P13) — 297 replacements across 55 files; mid-sentence pronoun capitals **44 → 0** |
| **A5** German missing heading localization | **translate the 16**; `Leave No Trace` stays English | ✅ decided **and applied** 2026-07-25 (P14) — 16 headings localized, 1 retained, line numbers and heading levels unchanged |
| **A6** `Leave No Trace` lock alignment | **English programme name**; lowercase prose stays German | ✅ decided **and applied** 2026-07-25 (P15) — 8 sites aligned across 6 files, 9 descriptive uses deliberately kept German |
| **A3** `Piste` for UTV trails | **`Piste` is CORRECT — retained**; only the `-system` compound normalised | ✅ decided 2026-07-25 (P16) — 251 occurrences reviewed, **239 unchanged**, 12 compound-drift replacements |
| **A4** generic English `Trail` | **localize by sense** — `Piste` for motorised, `Wanderweg` for hiking; proper names stay English | ✅ decided **and applied** 2026-07-25 (P17) — 167 occurrences reviewed, **32 replaced**, 88 proper names + 2 footwear terms + 4 code identifiers kept |
| **B1** `モアブ` vs `Moab` | **Latin `Moab`** — the corpus transliterates only `バーナル` and state names | ✅ decided **and applied** 2026-07-25 (P18) — 85 occurrences reviewed, **37 replaced** in 1 file, 48 already canonical |
| **C2** `登山口` for trailheads | **`登山口` is CORRECT — retained**; no terrain split exists to apply | ✅ decided **and applied** 2026-07-25 (P19) — 232 occurrences reviewed, **230 unchanged**, 2 single-file drift fixes |
| **C1** `官方渠道` vs `官方来源` | **`官方渠道`** is the standard | ✅ decided **and applied** 2026-07-25 |
| **C3** | five suspected synonym residues | **4 of 5 were real distinctions — retained**; only the localized `风景公路`/`景观公路` split was drift | ✅ decided **and applied** 2026-07-25 (P20) |
| **C6** locked-phrase policy | caveat is locked by **intent, not byte sequence** | ✅ decided **and fully applied** 2026-07-25 — 27 seam defects across 13 files fixed, disclaimer count conserved at 994 |
| **C5** typography | no decision needed — verified clean; one do-not-fix trap recorded | ✅ resolved on measurement |

**Open — 0 from the original plan.**

| Locale | Open items | Post-review items (§E) |
|---|---|---|
| `de` | **all 6 original items closed** | ~~A7~~ ✅ P22, ~~A8~~ ✅ P23 — **German backlog closed** |
| `ja` | **all closed** — B1 applied at P18, B2 dissolved | ~~B3~~ ✅ P24, ~~B4~~ ✅ P25 — **Japanese backlog closed** |
| `zh` | **all closed** — C4 decided at P21 | ~~C7~~ ✅ P26, ~~C8~~ ✅ P27, ~~C9~~ ✅ P27 — **Chinese backlog closed** |

***All three language reviews are now closed end-to-end (A1–A8, B1–B4, C1–C9).***
Nothing editorial remains. What is left is one architecture question (**D1**) and the
**Localization Regression Framework** — both engineering, neither language review.

**Priority order** (owner-set 2026-07-25, revised at P16 once A3 was decided) — fully consumed:
~~C6~~ → ~~A1-residual~~ → ~~A2~~ → ~~A5~~ → ~~A6~~ → ~~A3~~ → ~~A4~~ → ~~B1~~ → ~~C2~~ → ~~C3~~ → ~~C4~~ ✅

***The German, Japanese and Chinese reviews as originally scoped are all COMPLETE.***
German A1–A6 are decided and applied; Japanese B1 is applied and B2 dissolved on
measurement; Chinese C1–C4 and C6 are decided and C5 needed no decision. **Nothing
remains from the original plan.**

**What the programme actually found.** Of the 13 decidable items, **5 closed with zero
or near-zero corpus edits** — A1 (0), A3 (239 of 251 kept), C2 (230 of 232 kept),
C3 (4 of 5 residues were real distinctions), C4 (503 of 503 kept). The review's main
product was *reduced uncertainty*, not a large edit set: measurement repeatedly showed
the translators had been right and the suspicion wrong. The genuine defects it did fix
were consistency drift, not mistranslation — and the six items in §E were all surfaced
by censuses run for other purposes.

**Post-review opportunities — 8 raised, 7 closed (A7 P22, A8 P23, B3 P24, B4 P25, C7 P26, C8 P27, C9 P27). Only D1 remains, and it is not a language item.**
**All three language reviews are closed end-to-end (A1–A8, B1–B4, C1–C9).**
Owner-set sequencing for what remains (2026-07-25, at P23) keeps the editorial
terminology work together and defers the one cross-cutting engineering item until the
language backlog is done:
~~B3~~ → ~~B4~~ → ~~C7~~ → ~~C8 (+ C9)~~ → ~~`zh` machine terminology (`车辆`/`车`/`越野车`)~~ → **D1 → Localization Regression Framework.**
D1 is deliberately last of the content items: it is a repository-wide content-
architecture question (does the fix belong in shared source data or in localisation
assets?), not an editorial one, and it must be answered before the framework is built.

**Revised at P26 (owner-agreed).** Two changes to the tail of that sequence:
- ~~**The machine-terminology item folds into C8 if ≤20 corpus decisions remain**~~ —
  **resolved at P27: it folds, and the count is 0, not ≤20.** See §E "Machine
  terminology" below. The fold rule was the right test; the answer was that the slot
  has no enumerable target value at all, so there is nothing to gate and nothing to
  sweep. **No P28.**
- **Gate 4f is superseded by a Localization Regression Framework** — 4f untranslated
  headings (A5), 4g anchor-text audit (B4), 4h rendered-seam detector (C6/C7), 4i
  glossary-lock drift (A6/C4), 4j shared-content localization (D1). Governing rule:
  **block only where a correct value is enumerable; everything else reports counts.**
  4f/4h/4i block, **4g is advisory** (B4's 597:55 correct-to-drift ratio would make a
  blocking anchor check fail on proper nouns indefinitely), 4j is a one-time audit that
  becomes a structural invariant once D1 lands. D1's outcome determines how 4j inspects
  shared content, which is why the framework waits for it.
  **4j IMPLEMENTED at P34** — `scripts/gate-4j-gallery-parity.mjs`, wired into `npm run
  build` and `npm run validate` (it runs *before* `astro build`: it is a source-level
  check with no `dist/` dependency, so a broken dictionary fails in seconds). It parses
  `home-gallery.ts` with the TypeScript AST rather than importing it — the module's
  extensionless `../lib/i18n` specifier defeats Node's type-stripping loader, and the AST
  is the only place two runtime-invisible defects are visible: a **duplicate key** (the
  later literal silently wins) and **two locales aliased to one dictionary** (fallback
  shipped as a translation). It validates structure only — presence, uniqueness,
  non-emptiness — and never compares one locale's text to another's, because proper nouns
  (`Doc's Beach`, `Kawasaki KRX 1000`) are legitimately identical across locales. 4f, 4g,
  4h, 4i remain unimplemented.
- **A methodology section is written first**, immediately after C7 — it records *why*
  each gate exists, which is what makes 4f–4j maintainable rather than arbitrary.

A7, A8, B3, B4, C7 and C8 were each surfaced by a census run while applying an accepted
decision, not by the original scoping — and A7's own census then surfaced **D1**, the
first cross-locale item in this document. They are registered in **§E** so the original queue stays intact and
they do not displace planned items that were committed before they existed. Each is an
owner decision to be taken now that the planned queue is finished. **C7 was the
highest-impact of the six** — it showed closed item C6's seam fix was clean in plain
text but left seams once inline markup is stripped. Applied at P26: the true scope was
**326 sites / 44 files**, not the 249 first recorded, because the original figure used
a fixed ≤10-character window rather than the full clause. Its own sweep then raised
**C9** (28 seam shapes with no C6 precedent, recommended keep) — **closed by review at
P27 with zero edits**, the fifth item in this programme to close that way.

**C8 repeated C7's measurement lesson at 16× the scale.** Recorded as 7 sites / 4 files;
the true scope was **113 sites / 9 files**, because the recorded census counted only the
`国家`-prefixed attributive form and missed the bare anaphoric one — the same
*window-too-narrow* failure as C7's ≤10-character clause window, in a different
dimension. Measuring first (Principle 1) is what turned a 7-site patch into a complete
normalisation; sweeping the recorded 7 would have left 106 drifted sites behind and
*looked* finished.

---

## Review methodology — what actually produced correct decisions

*Written at P26, once every major class of editorial review had been run across
German, Japanese and Chinese. This section exists so the Localization Regression
Framework records **why** each gate exists, not only what it checks.*

**The headline result: most flagged items were not defects.** Across the programme,
the estimate was wrong in the same direction almost every time — the corpus was
larger than expected and *more* internally consistent than expected. A3 kept 239 of
251. C2 kept 230 of 232. C4 kept 503 of 503. C3 found 2 of 5 suspected residues real.
B4 split 597 correct to 55 drift. The review's product was **reduced uncertainty**,
not a large edit set. Any permanent gate must be designed for that ratio or it will
report mostly false positives and be switched off.

**The principles that held, in the order they tend to matter:**

1. **Measure before editing; never sweep from an estimate.** Every recorded size that
   was carried forward without re-measuring turned out wrong — C7's "249" was really
   326, B4's "≈14" was 652. Re-census at the start of the applying phase, always.
2. **Distinguish repository policy from translation preference.** The question is not
   "is this the best word?" but "does the corpus already have a rule?" C2 was decided
   by the fact that *no* mechanical split rule exists, not by which term is nicer.
3. **The English master arbitrates apparent synonym pairs.** Three of C3's five
   "residues" were faithful renderings of a distinction English itself draws
   (`path` vs `trail`, `angling` vs `fishing`). Per-file `en`↔locale count diffing is
   the cheapest high-yield drift detector there is.
4. **Compare line-aligned peers across locales.** `de` 53 / `ja` 53 / `zh` 69 in the
   same slot proved `并排越野车` was the compound *side-by-side*, not a UTV synonym.
   Cross-locale sense tables also show whether a loanword is deliberate (A3 keep) or
   drift (A7 sweep).
5. **Treat rendered output as authoritative when markup can obscure the source.** This
   is C6→C7 in one line: a fix verified at 0 in plain text left 326 defects on the
   page, because `<strong>` sits *inside* the join seam. Gates that scan source text
   for anything a reader sees are measuring the wrong artifact.
6. **A locked phrase is locked by intent, not by bytes.** C6 established it and C7
   depended on it: `请向官方渠道核实` and `向官方渠道核实` both satisfy the lock, so
   the invariant to assert is the **conserved core count** (`官方渠道核实` = 994),
   not exact-string uniformity. Census prefixes before assuming a phrase is uniform —
   the "962-instance lock" never was.
7. **Check whether the target is a bound morpheme before sweeping it.** `野营`'s count
   of 4 was 100% inflated by `荒野营地`. `请` is bound in `申请`/`请求` and is a plain
   verb in `请向导`. Mask compounds first; a bare-stem sweep will silently corrupt.
8. **Encode grammatical licensing, not surface repetition.** The C6 defect was never
   "two `请` in a sentence" — it was two imperatives in **one clause with no
   boundary**. `请A，请B` is correct Chinese and must survive. Getting this wrong in
   either direction is how a scan either misses defects or creates them.
9. **Separate engineering defects from editorial ones.** D1 (English carousel in all
   seven locales) is a content-architecture problem wearing a localization costume.
   Routing it to a translator would have produced seven copies of the same fix.
10. **Verify by reverse-transform, not by re-running the finder.** The finder agreeing
    with itself proves nothing. Strip the changed token from both sides of the diff
    and require the strings to be identical — that is what proved P26 touched exactly
    326 `请` characters and nothing else.
11. **Automated analysis cannot replace native judgement.** It is excellent at
    inconsistency, drift, untranslated content, glossary violations and structural
    defects. It is not competent at punctuation, idiom, rhythm or nuance — the 14
    Chinese `连接号` dashes and the 5 grammatical `请A，请B` clauses are correct and a
    regex would "fix" both. Native review stays a distinct milestone.

**Consequence for the framework.** Principles 1, 5, 6 and 7 are why 4h scans rendered
text and asserts a conserved count. Principle 8 is why it encodes clause boundaries.
The headline ratio is why **4g is advisory** while 4f/4h/4i block: an anchor-text
check has no enumerable correct set, so it must report rather than fail the build.

---

## How to use this document

Each item below is a **decision**, not a bug report. For each one:

1. Read the evidence (real counts from the shipped corpus).
2. Answer the question at the end of the item.
3. Hand the answer back — the sweep is mechanical and will be done for you.

**Do not fix files individually.** Per `MULTILINGUAL_HANDOFF.md` §7 Gate 4c, an
accepted terminology change is applied corpus-wide in one pass, then re-verified.
Piecemeal edits are how cross-batch drift was created in the first place.

**A note on the brief-vs-corpus rule.** If your judgement contradicts something
recorded as "locked" in the handoff doc, your judgement wins pending a corpus
check — that rule (Gate 4c) exists because it has already been right once: the
`ja` brief froze `Vernal` as English while the shipped corpus had バーナル 1679
times and bare `Vernal` 0 times.

---

## A. German (`de`) — A1–A8 all closed

| Item | Subject | State |
|---|---|---|
| **A1** | register (`du` vs `Sie`) | ✅ closed — P12, zero edits (both targets were false positives) |
| **A2** | heading capitalisation | ✅ closed — P13, 297 replacements / 55 files |
| **A3** | `Piste` for UTV trails | ✅ closed — P16, `Piste` retained; 12 compound fixes |
| **A4** | generic English `Trail` | ✅ closed — P17, 32 replacements / 5 files |
| **A5** | untranslated English headings | ✅ closed — P14, 16 headings localized |
| **A6** | `Leave No Trace` lock | ✅ closed — P15, 8 sites aligned |
| **A7** | `Trailhead` (42) | ✅ closed — P22, 41 replacements / 12 files; 1 documented exception |

### A1. Register: the corpus is informal `du`. — ✅ DECIDED 2026-07-25: keep `du`

> **✅ OWNER DECISION (2026-07-25): informal `du` is confirmed as the German house
> register.** Rationale: leisure/adventure tourism — parks, road trips, hiking,
> family activities — reads better in a friendly, conversational voice than an
> institutional one, and the brand aims to feel welcoming rather than governmental.
> **The corpus-wide flip to `Sie` is cancelled and will not happen.**
>
> **This unblocks German native review** (see `MULTILINGUAL_HANDOFF.md` §10.1) and
> deliberately diverges from Spanish (*usted*) and Italian (*Lei*) — that divergence
> is now a recorded decision, not undocumented drift.
>
> **Residual work this authorises** (not the flip — the *consistency* half of A1):
> normalise the ~18 unambiguous formal forms (`Ihnen`/`Ihre`/`Ihr`) and the mixed
> `Du`/`du` capitalisation, both of which are wrong under *either* register. Apply
> as one corpus-wide sweep per Gate 4c, then re-run the register scan below.
>
> **➡ A1-residual was executed at P12 (2026-07-25) and closed with zero corpus
> edits — both targets were false positives.** See "A1 residual — CLOSED" below.

The evidence the decision was made against is preserved:

German shipped **informal address**, which diverges from the other two locales
where a register decision was explicitly recorded (Spanish = formal *usted*,
Italian = formal *Lei*). No German register decision was ever written down, so
this may be a deliberate choice that went unrecorded, or drift that was never
caught.

| Form | Count |
|---|---|
| `du` | 2,999 |
| `dein` / `deine` / `deinen` / `deinem` | 1,086 |
| `Du` / `Dein` (capitalised, letter-style) | 214 |
| `Sie` (includes sentence-initial *sie* = "they") | 120 |
| `Ihnen` / `Ihre` / `Ihr` (unambiguous formal) | ~18 |

*These original figures were **spoke-only and partial-paradigm** (they omit the 20
inline `src/pages/de/**` pages, and the `deiner`/`deines`/`dich`/`dir` forms). They
are preserved as the evidence the register decision was made against; the P12
census below supersedes them for any counting purpose.*

---

### A1 residual — ✅ CLOSED 2026-07-25 (P12), zero corpus edits

The residual was executed as a census before any editing, per the standing rule that
previous counts are not to be trusted. **Both targets turned out not to exist.**
Scope: all 57 `.de.mdx` spokes **and** all 20 `src/pages/de/**` inline pages,
classified by sentence position — the discriminator that the earlier counts lacked,
since German `sie`/`ihr` are lowercase mid-sentence and capitalised sentence-initially.

| Form | Count | True leak | Correct usage |
|---|---|---|---|
| `Sie` | 138 | **0** | 138 — 137 sentence-initial 3rd-person *sie* ("they/it"), 1 inside a title-cased heading |
| `Ihnen` | 1 | **0** | 1 — dative *"give **them** a task"*, referring to children |
| `Ihre` | 4 | **0** | 4 — 3rd-person possessive (*"**their** art"*, *"**her** cabin"*, *"**its** fixed time"*, *"**its** lower sections"*) |
| `Ihr` | 13 | **0** | 13 — informal **plural** *ihr* (the plural of `du`), sentence-initial: `Ihr habt`, `Ihr fahrt`, `Ihr könnt` |
| `Du` | 227 | **0** | 202 sentence-initial (correct); 25 mid-sentence — **all inside title-cased display strings → A2** |
| `Dich` | 9 | **0** | 9 mid-sentence — all in headings/table headers/CTAs → A2 |
| `Deine` / `Dein` / `Deinen` / `Deiner` | 52 | **0** | 43 sentence-initial; 9 mid-sentence — all in headings/micro-headings → A2 |
| `Dir` | 2 | **0** | 1 sentence-initial; 1 in a heading (`## Der Tag Gehört Dir`) → A2 |
| `du` / `dich` / `dir` / `dein*` (lowercase) | 7,171 total informal tokens | — | untouched, as decided |

**Finding 1 — there are no formal-address leaks at all.** All 156 capitalised
`Sie`/`Ihnen`/`Ihre`/`Ihr` are legitimate third-person or informal-plural usage. The
"~18 unambiguous formal" row was a false positive produced by counting capitalised
forms without checking sentence position. The strongest evidence is co-occurrence:
formal `Sie` and informal `du` cannot share a sentence, yet the corpus is full of
lines like `Sie können **dir** empfehlen…`, `Sie sind alle leicht zu vermeiden,
sobald **du** sie kennst`, `Sie passen das Tempo an **deine** Gruppe an`. Every one is
third-person. Verb agreement confirms it independently: 39 of them are `Sie ist`,
which formal address cannot take (formal is always `Sie sind`).

**Finding 2 — the `Du`/`du` capitalisation split is not a letter-style artifact; it
is A2 wearing a different hat.** Of 44 mid-sentence capitalised informal forms:

| Context | Count | Example |
|---|---|---|
| markdown heading | 30 | `## Was Du Anziehen Solltest` |
| HTML `<th>` table header | 6 | `<th>Was Dich Erwartet</th>` |
| display CTA / hero | 3 | `<span class="accent">Machen Dich Fertig?</span>` |
| `<strong>` micro-heading | 3 | `<strong>Sichere Deine Sachen</strong>` |
| markdown table header cell | 1 | `\| Monat \| Was Dich Erwartet \|` |
| **running prose** | **1** | `Sieh dir "Wo Du Übernachtest" weiter unten` |

and the single running-prose instance
([`weekend-road-trip-from-salt-lake-city.de.mdx:78`](src/content/itineraries/weekend-road-trip-from-salt-lake-city.de.mdx#L78))
is a **verbatim quotation of the heading at line 269** of the same file, so it must
change if and only if that heading changes.

**Why nothing was edited.** Lowercasing these in isolation produces
`## Was du Anziehen Solltest` — a half-corrected heading, which is precisely the
piecemeal drift Gate 4c exists to prevent. The pronouns are not a separable defect
class; they are 44 of the tokens inside the 135 title-cased headings A2 is about, and
they cannot be resolved before A2's nominalised-infinitive judgement is made.
**A1-residual is therefore closed and its work is absorbed into A2.**

*One trap recorded for A2:* `Machen Dich Fertig?` in
[`moab-utv-tours.de.mdx:44`](src/content/guides/moab-utv-tours.de.mdx#L44) is **not**
ungrammatical and must not be "fixed" into an imperative. It is the tail of the H1
sentence `Moab-UTV-Touren` `<br/>` `machen dich fertig?` — correct German idiom
(*jemanden fertigmachen* = to wear someone out) that is merely title-cased.

**Two capitalisation rules confirmed correct and explicitly out of scope:**

- **`Du` after a colon is correct**, not a leak. 44 instances follow `: ` and each
  introduces a complete independent sentence (`Der Reiz ist unkompliziert: Du
  bekommst die Landschaft…`), where Duden permits capitalisation.
- **After an em-dash or semicolon, German requires lowercase** — scanned, and the
  corpus has **0** violations.

> **A1 residual: nothing for the reviewer to answer.** Closed on measurement.
> **Do not touch the 7,171 informal forms.**

---

### A2. Heading capitalisation — ✅ DECIDED & FULLY APPLIED 2026-07-25 (P13)

> **✅ Applied as one corpus-wide sweep per Gate 4c: German sentence case.**
> **297 replacements from 252 distinct strings across 55 files.** Verified:
> `astro check` 0 errors / 0 warnings · build **619 pages** · validator ✔ · diff
> confined to `.de.mdx` + `src/pages/de/**` (no config, schema, routing or component).
>
> **Rules applied.** First word capitalised; nouns capitalised; nominalised
> infinitives and adjectives capitalised (`Wandern`, `Angeln`, `Fahren`, `Wechseln`,
> `Ankommen`, `Aufbauen`, `Essen`, `Übernachten`, `das Richtige`, `das Wichtigste`,
> `etwas Besonderes`, `jedes Können`); proper nouns and locked English terms
> untouched; after a colon a capital only where a **complete clause or a noun**
> follows (Duden); `vs.` does not begin a new sentence.
>
> **Coverage was larger than the original estimate of 135 headings**, because a
> closed-class detector alone under-counts. Two passes were needed: one for
> function-word title case (`Für`, `Mit`, `Den`, `Ist`), and a second aggregating
> *every* mid-heading capital, which surfaced verb/adjective-only headings carrying
> no closed-class word at all — `Deine Fahrt Planen`, `Die Richtige Piste Wählen`,
> `Warum den Kings Peak Besteigen`, `Wildtiere Verantwortungsvoll Beobachten`.
>
> | Surface | Candidates | Corrected |
> |---|---|---|
> | markdown headings | 127 + ~60 second-pass | all |
> | table headers (HTML `<th>` + markdown) | 38 | all |
> | HTML headings / hero titles | 6 | all |
> | `<strong>` micro-headings | 6 | all |
> | bold day-labels | 4 | all |
> | CTA / hero display strings | 2 | all |
> | quoted heading in running prose | 1 | all |
> | frontmatter SEO titles | 4 | all |
>
> **A1-residual closed out with it, as predicted:** mid-sentence capitalised
> `Du`/`Dich`/`Dir`/`Dein*` went **44 → 0**, while sentence-initial forms were left
> untouched (`Du` 202, `Sie` 137, `Ihr` 13 — all unchanged), confirming the sweep
> corrected title case without touching the register.
>
> **11 false positives rejected** (verified correct, must not be "fixed" later):
> six `Tag N — …` day-labels where the capital follows a **label dash** and a full
> sentence begins (`Tag 3 — Ein letzter Morgen, dann heim oder weiter.`); three
> nominalised modals (`Es gibt eine Version für jedes Können.`, `Leave No Trace ist
> hier kein Kann.`); and two sentence-initial words inside long bold prose spans.
> Also rejected wholesale: the locked all-caps disclaimer `PRÜFE BEI DER OFFIZIELLEN
> QUELLE` (679 raw hits — every one a false positive of a naive capital-letter scan).
>
> **One documented deviation from this document's own A2 note.** The note below
> protected `### Fotografie vs. Lockeres Wandern` in full. Only the **noun** needed
> protecting: `Wandern` is the nominalised infinitive and stays capitalised, but
> `Lockeres` is an ordinary attributive adjective and takes lowercase. Applied as
> `Fotografie vs. lockeres Wandern`, consistent with the ten parallel
> `X vs. <adjective> <noun>` headings in the same corpus (`vs. erfahrene
> Wildblumen-Wanderer`, `vs. ambitionierte Angler`, `vs. fortgeschrittene
> Herbstwanderungen`). The original note conflated the nominalised head with its
> modifier; `## Saisonales Angeln` remains correct because `Saisonales` is
> heading-initial, not because adjectives before nominalisations stay capitalised.

The evidence the decision was made against is preserved:

### A2 (original finding). English title case is leaking into German headings

German capitalises nouns, not every significant word. **135 of 877 German
headings (15.4%), across 28 of 57 spoke files**, capitalise mid-heading articles,
prepositions, pronouns or verbs — the English title-case pattern applied to
German.

Real examples from the corpus:

| Shipped | Expected German sentence case |
|---|---|
| `## Ablaufplan für Einen Halben Tag` | `## Ablaufplan für einen halben Tag` |
| `## Anfängerfehler, Die Du Vermeiden Solltest` | `## Anfängerfehler, die du vermeiden solltest` |
| `## Die Besten Attraktionen: Was Du Priorisieren Solltest` | `## Die besten Attraktionen: Was du priorisieren solltest` |
| `## Wie der Kings Peak Abschneidet` | `## Wie der Kings Peak abschneidet` |
| `## Wo Anfangen: Dein Gewässer Wählen` | `## Wo anfangen: dein Gewässer wählen` |
| `### Wandern Vs. Panoramastraßen Im Frühling` | `### Wandern vs. Panoramastraßen im Frühling` |

Note that a *nominalised* infinitive stays capitalised — `## Saisonales Angeln`
and `### Fotografie vs. Lockeres Wandern` are **correct** and must not be
"fixed". That distinction is exactly why this needs a human pass rather than a
regex.

**A2 now also carries all German pronoun capitalisation** (absorbed from A1-residual
at P12). 44 mid-sentence `Du`/`Dich`/`Dir`/`Dein*` forms sit inside these title-cased
strings and must be lowercased *as part of* the sentence-case pass, never separately —
see the A1-residual closure above for the per-context breakdown and the
`Machen Dich Fertig?` trap. Scope beyond the 135 `##`/`###` headings: 6 HTML `<th>`
headers, 1 markdown table header cell, 3 hero/CTA display strings, 3 `<strong>`
micro-headings, and 1 in-prose quotation that mirrors a heading.

> ~~**Question A2:** Confirm these should be German sentence case.~~
> **ANSWERED & APPLIED 2026-07-25 (P13)** — see the decision block at the top of A2.

*No URL or anchor risk: these are display headings. The four `ja`/`de` anchor-ID
headings use explicit `id=` attributes and are untouched by any heading edit.*

---

### A3. `Piste` for UTV trails — ✅ DECIDED 2026-07-25 (P16): **KEEP `Piste`**

> **✅ Decision: `Piste` is the correct and canonical German term for a UTV trail and
> is retained. 239 of 251 occurrences are unchanged.** The only change is a
> consistency fix inside the same terminology family: **12 replacements** normalising
> the compound that names the five UTV trail systems. Verified: `astro check`
> 0 errors / 0 warnings · build **619 pages** (exit 0) · validator ✔ (exit 0) ·
> 3 files changed.
>
> **This is a "leave it alone" decision, and the evidence is what produced it.**
> Four independent lines:
>
> 1. **Not a mistranslation.** German `Piste` carries an established *unpaved
>    off-road track* sense alongside the familiar ski sense. The corpus proves the
>    translator was working in that register deliberately: it uses the idiomatic
>    off-road compounds **`Wüstenpiste`** (2), **`Waschbrettpiste`** (2, = washboard
>    track) and **`Offroad-Piste`**. Those are not words a ski-sense confusion produces.
> 2. **The motorised/non-motorised split is perfectly clean.** Of 251 occurrences:
>    utv 148, guides 48, inline pages 51, scenic-drives 2, itineraries 2 — and
>    **zero in the hiking, camping or fishing hubs**, against `Wanderweg`/`Wanderwege`
>    416 which never appear in `utv`. German encodes a real distinction here that
>    **`es`, `it` and `pt` lose**: at the same lines they use their generic path word
>    for both senses (`sendero`, `sentiero`, `trilho`).
> 3. **French independently chose the cognate.** At the 164 German lines containing a
>    `Piste*` form, `fr` uses `piste`/`pistes` **158** times for the same content.
>    Two of five peer locales converge on the piste family.
> 4. **The single ski-sense use is correct.** `Pistenpräparierung`
>    ([`ultimate-guide-to-ashley-national-forest:234`](src/content/guides/ultimate-guide-to-ashley-national-forest.de.mdx#L234))
>    renders the English master's *"check current road access, **grooming**, and
>    avalanche information"* — a genuine winter context where `Pistenpräparierung` is
>    exactly the right German word. Flagged during the census, verified, kept.
>
> Replacing 251 occurrences would have been a large sweep that destroyed a
> distinction the German corpus makes *better* than its peers. The A3 question
> ("does `Piste` read as a ski slope?") is answered: in context — UTV tours, Kawasaki
> KRX 1000, red-rock desert backcountry — it does not, and the corpus's own
> `Wüstenpiste`/`Waschbrettpiste`/`Offroad-Piste` compounds anchor the off-road sense.
>
> **What *was* fixed — cross-batch compound drift.** The identical concept, *the five
> UTV trail systems*, was rendered three ways. The English master uses one term,
> `trail systems`, **33** times; the German split was by **file**, not by meaning:
>
> | Form | Count | Files | Action |
> |---|---|---|---|
> | `Pistensystem*` | 26 | 9 files | **canonical — kept** |
> | `Streckensystem*` | 11 | `backcountry-tours-vernal-utah`, `side-by-side-rentals-vernal-utah` | → `Pistensystem*` |
> | `Pistennetzen` | 1 | [`de/faq.astro`](src/pages/de/faq.astro) | → `Pistensystemen` |
>
> Result: `Pistensysteme` 25 + `Pistensystemen` 13 = **38**, with `Streckensystem`
> and `Pistennetz` both at **0**.
>
> **Occurrences by context** (all 251): body prose 160 · frontmatter metadata 42 ·
> FAQ 23 · image alt 11 · table 7 · HTML heading 4 · page-summary 3 · markdown heading 1.
> **By sense:** UTV/motorised 246 · off-road surface compound 4 · winter grooming 1 ·
> **non-motorised contamination 0**.
>
> **Intentional exceptions — documented, not swept:**
> - **Bare `Strecke` (110) and `Strecken` (58)** are untouched. In `utv` all four uses
>   are the *distance* sense (`die ganze Strecke`, `auf halber Strecke`,
>   `mehr Strecke zurücklegen`), not the trail sense; elsewhere they are roads and
>   scenic routes. A `Strecke → Piste` sweep would have been a serious error.
> - `Wüstenpiste`, `Waschbrettpiste`, `Offroad-Piste` — idiomatic, kept.
> - `Pistenpräparierung` — correct winter term, kept.
> - `Wanderweg`/`Wanderwege` (416) — the hiking counterpart, untouched.
> - Generic English `Trail` residue — **out of scope, belongs to A4.**

The original finding is preserved:

### A3 (original finding). `Piste` (motorised) vs `Wanderweg` (hiking)

This was flagged as a possible inconsistency. It is not — the corpus shows a
clean, deliberate semantic split by hub:

| Hub | `Piste` | `Wanderweg` |
|---|---|---|
| utv | 146 | 0 |
| hiking | 0 | 412 |
| camping | 0 | 5 |
| itineraries | 2 | 38 |
| guides (mixed content) | 48 | 13 |

So `Wanderweg` = hiking trail, `Piste` = motorised/off-road track. The narrow
question is whether **`Piste` is the right German word for a UTV/side-by-side
trail**, or whether it reads as a ski slope or rally stage to a German ear
(alternatives: `Offroad-Strecke`, `Trail`, `Route`).

> ~~**Question A3:** Is `Piste` correct for a UTV trail?~~
> **ANSWERED 2026-07-25 (P16): yes — `Piste` is retained.** See the decision block at
> the top of A3. The true corpus figure is **251** occurrences, not 196; the earlier
> number was a per-hub subtotal that omitted the 20 inline pages and the compounds.

---

### A4. Generic English `Trail` — ✅ DECIDED & APPLIED 2026-07-25 (P17)

> **✅ Applied: 32 generic occurrences localized in one sweep; 88 proper names,
> 2 footwear terms and 4 code identifiers deliberately untouched.** Verified:
> `astro check` 0 errors / 0 warnings · build **619 pages** · validator ✔ ·
> 5 files changed, all `de`.
>
> **No new policy was invented — A4 is A3's rule applied to the residue A3
> deferred.** A3 closed with the note *"Generic English `Trail` residue — out of
> scope, belongs to A4."* The German corpus already encodes a clean
> motorised/non-motorised split, so each generic `Trail` was decided by which side
> of that split its sentence sits on:
>
> | Sense | German term | Evidence it was already the corpus's own word |
> |---|---|---|
> | motorised / UTV / off-road | `Piste`, `Pisten` | A3 decision, 251 occurrences |
> | non-motorised / hiking | `Wanderweg`, `Wanderwege` | 888 occurrences before this sweep |
>
> **The true census was 167 occurrences, not 127** — the earlier figure omitted the
> 20 inline `src/pages/de/**` pages and every hyphenated compound. The generic
> residue was **32, not "roughly 6"**, because the original note counted only bare
> `Trail`/`Trails` and missed the compounds (`Backcountry-Trails`, `Offroad-Trails`,
> `Trail-Systeme`, `UTV-Trail-Touren`, `Trail-Tipp`, `Trail-Seite`, `Trail-Pflege`,
> `Trail-Beschreibungen`, `Off-Trail-Strecken`).
>
> | Context | Before | Proper name | Generic (swept) | Kept for other reasons |
> |---|---|---|---|---|
> | body prose | 96 | 62 | 24 | 10 (`Trailhead`) |
> | headings | 8 | 7 | 1 | 0 |
> | frontmatter / FAQ | 21 | 13 | 2 | 6 (`Trailhead`) |
> | image alt / figcaption | 15 | 0 | 0 | 15 (`Trailhead`) |
> | tables | 13 | 6 | 1 | 6 (`Trailhead`) |
> | page-summary | 5 | 0 | 0 | 5 (`Trailhead`) |
> | inline `.astro` (incl. JSON-LD, nav labels) | 9 | 0 | 4 | 5 |
> | **Total** | **167** | **88** | **32** | **47** |
>
> **Every peer locale translates generic `trail` and keeps the proper names — German
> was the sole Latin-script outlier**, exactly the A6 shape. At the identical lines:
>
> | Locale | Generic *trail* | Proper names |
> |---|---|---|
> | `fr` | `pistes` — **the cognate, independently chosen again** | English |
> | `es` | `senderos` | English |
> | `it` | `sentieri` | English |
> | `pt` | `trilhos` | English |
> | `de` (before) | **untranslated `Trails`** | English |
>
> French converging on `piste` for the *same UTV lines* is the second time this
> review has seen `fr` independently pick the piste family — it was line 3 of A3's
> evidence, and it recurs here.
>
> **What changed** (32 replacements across 5 files):
>
> | From | To | Count | Why this target |
> |---|---|---|---|
> | `Backcountry-Trails` | `Backcountry-Pisten` | 5 | `Backcountry-Piste*` already 11× in `de` |
> | `Trails` (UTV prose) | `Pisten` | 6 | A3 |
> | `Trail` (UTV singular) | `Piste` | 3 | A3 |
> | `UTV-Trail-Touren` | `UTV-Pistentouren` | 4 | `UTV-Pistentouren` is the shipped name in [`de/utv/index.astro`](src/pages/de/utv/index.astro) |
> | `Trail-System*` | `Pistensystem*` | 2 | A3's canonical compound (38→40) |
> | `Offroad-Trails` | `Offroad-Pisten` | 1 | `Offroad-Piste` already 3× |
> | `Trail-Tipp` | `Pisten-Tipp` | 1 | tip labels are localized corpus-wide |
> | `Trails` (hiking prose) | `Wanderwege(n)` | 6 | the hiking counterpart, 888× |
> | `Trail` (hiking singular) | `Wanderweg` | 1 | ″ |
> | `Trail-Seite` / `Trail-Beschreibungen` | `Seite des Wanderwegs` / `Beschreibungen der Wanderwege` | 2 | all four peers translate these |
> | `Trail-Pflege` | `Wegpflege` | 1 | `Wegpflege` already 2× in `de` |
> | `Off-Trail-Strecken` | `Strecken abseits der Wege` | 1 | `abseits` already 34×; peers all translate |
>
> **One cross-batch drift caught by the census.** The identical English sentence
> *"Backcountry trails and unpaved roads are not accessible and vary widely in
> surface and grade"* ships in two files. German rendered it `Backcountry-Pisten` in
> [`ultimate-guide-to-vernal-utah:163`](src/content/guides/ultimate-guide-to-vernal-utah.de.mdx#L163)
> and `Backcountry-Trails` in
> [`visiting-dinosaur-national-monument:268`](src/content/dinosaur-national-monument/visiting-dinosaur-national-monument.de.mdx#L268).
> Same source, same meaning, two renderings — resolved to the established form.
>
> **Intentional exceptions — documented, not swept:**
> - **88 proper names stay English**: Outlaw Trail, Uinta Highline Trail, Fossil
>   Discovery Trail, Harpers Corner Trail, Desert Voices Trail, Sound of Silence
>   Trail, Canyon Rim Trail, Little Hole National Recreation Trail, Doc's Beach-Trail.
> - **`Trailschuhe` and `Trail-Running-Schuhe`** ([`what-to-wear-utv-tour:17`](src/content/guides/what-to-wear-utv-tour.de.mdx#L17),
>   [`:42`](src/content/guides/what-to-wear-utv-tour.de.mdx#L42)) — footwear product
>   categories, **kept on unanimous peer evidence**: `fr` *chaussures de trail* /
>   *trail running*, `es` *zapatos de trail running*, `it` *scarpe da trail* /
>   *trail running*, `pt` *sapatilhas de trail running*. All four retain English
>   `trail` here. German also mirrors the English master's own distinction
>   (*trail shoes* at L17 vs *trail running shoes* at L42) and is faithful as shipped.
> - **4 code identifiers** — `t('footer.ourTrails')`, `t('footer.link.utvTrailsTours')`,
>   `class="other-trail-info"`. Not content; renaming them would be an engineering
>   change and is out of scope for an editorial pass.
> - **41 `Trailhead`** — a *different lexeme* and outside this item's stated scope
>   (`Trail`, `Trails`, `Trail-`). The census nevertheless turned up strong evidence
>   that the recorded lock is wrong. **Raised as A7 for the owner** rather than swept.
>
> **Anchor note.** One heading changed
> ([`petroglyphs-rock-art-vernal:49`](src/content/dinosaur-national-monument/petroglyphs-rock-art-vernal.de.mdx#L49),
> `## Was du auf den Trails zu sehen bekommst` → `## Was du auf den Pisten zu sehen
> bekommst`), so its ID regenerated. Verified safe: **0** references to the old
> anchor in source or in built `dist/` HTML.
>
> **Post-change scans all match their recorded baselines** (per the Appendix rule
> that any `de` change re-runs A1/A2): `Du` 202 · `Sie` 137 · `Ihr` 13 · `Ihnen` 1 ·
> `Ihre` 4 — identical to the P12 closure table; mid-sentence capitalised
> `Du`/`Dich`/`Dir`/`Dein*` still **0** (P13); A3's protected exceptions intact
> (`Wüstenpiste` 2, `Waschbrettpiste` 2, `Pistenpräparierung` 1, `Streckensystem` 0,
> `Pistennetz` 0); A6's split intact (`Leave No Trace` 20 + `Leave-No-Trace` 8,
> lowercase German prose 6).

The original finding is preserved:

### A4 (original finding). Generic English `Trail` — a small residue

`Trail` appears 127 times in German files. **~90 are proper nouns and correctly
stay English** per the frozen never-translate list (Outlaw Trail 26, Highline
Trail 14, Fossil Discovery Trail 14, Harpers Corner Trail 7, Desert Voices Trail
6, Sound of Silence Trail 6, plus `Trailhead`).

The residue is a handful of *generic* uses — `die Trail`, `fünf Trail`, `Trail
zu`, `Trail für`, `Trail aus` — which are both untranslated and grammatically
ungendered.

> ~~**Question A4:** Confirm generic `Trail` should become `Weg`/`Route`/`Piste`
> (per A3) while proper names stay English. Roughly 6 occurrences.~~
> **ANSWERED & APPLIED 2026-07-25 (P17)** — see the decision block at the top of A4.
> The real scope was **32 occurrences, not ~6**, and the true corpus total was
> **167, not 127**; both earlier figures were spoke-only and compound-blind. The
> `Trailhead` clause of this note turned out to be unsupported — see **A7**.

---

### A7. `Trailhead` — ✅ DECIDED & APPLIED 2026-07-25 (P22)

> **✅ Applied: `Ausgangspunkt` confirmed as the canonical German rendering of
> `trailhead`; all 41 content occurrences of English `Trailhead` normalised.**
> Verified: `astro check` 0 errors / 0 warnings · build **619 pages** · validator ✔ ·
> **12 files changed**, 38 insertions / 38 deletions · rendered `dist/de/` contains
> **0** `Trailhead` · no other locale touched.
>
> **The decision was settled by per-file `en`↔`de` alignment, not by the totals.**
> Counting `trailhead` in each English master against `Ausgangspunkt` in its German
> counterpart produces an exact match, file after file, across the whole hiking
> corpus — `high-uintas-day-hikes` 25→25, `spring-hiking-near-vernal` 16→16,
> `summer-hiking-near-vernal` 15→15, `camping-in-ashley-national-forest` 14→14,
> `alpine-lakes-hiking-high-uintas` 13→13, `winter-hiking-near-vernal` 10→10. Roughly
> **200 aligned pairs with zero English residue.** `Ausgangspunkt` is not a plausible
> synonym here; it is the house term, already applied consistently everywhere the
> concept appears outside the 12 files below. The 41 are the drift.
>
> **Every peer locale renders the concept natively — and every one keeps it distinct
> from the UTV staging sense.** Measured on the one string where both senses occur
> together, the shared UTV map `alt`/figcaption:
>
> | Locale | *staging point* | *trailhead* |
> |---|---|---|
> | `en` | staging point | trailhead |
> | `fr` | point de départ | départ de piste |
> | `es` | punto de partida | punto de inicio de sendero |
> | `it` | punto di ritrovo | inizio di sentiero |
> | `pt` | ponto de encontro | ponto de partida |
> | `ja` | 集合場所 | トレイルヘッド |
> | `zh` | 集合点 | 登山口 |
> | `de` *(was)* | Ausgangspunkt | **`Trailhead`** |
>
> German was the only locale resolving the collision by falling back to English.
>
> **The disambiguator was recovered from the corpus, not invented — the A5 method.**
> The German UTV pillar had already solved this exact problem on the same image.
> [`page-content/utv.ts`](src/page-content/utv.ts) DE block renders the English
> *"trailhead locations"* as **`Ausgangspunkte der einzelnen Pisten`** and separates
> the staging sense as `Treffpunkt` — *"Fünf unterschiedliche Pistensysteme, ein
> Treffpunkt in Vernal … ohne Routen, Entfernungen oder Ausgangspunkte der einzelnen
> Pisten."* That attested phrase was applied verbatim to the 9 sites where both senses
> share a string, so no sweep site collapses two concepts and the staging sense was
> never touched.
>
> | Group | Sites | Rendering |
> |---|---|---|
> | Hiking-sense prose, headings-free, no staging sense in the string | **32** | `Ausgangspunkt` / `Ausgangspunkte` / `Ausgangspunkten` (case-inflected) |
> | `alt` + figcaption strings that *also* carry the UTV staging `Ausgangspunkt` | **9** | `Ausgangspunkte der einzelnen Pisten` (attested in `utv.ts`) |
>
> By surface: 24 in [`de/hiking/index.astro`](src/pages/de/hiking/index.astro) (prose,
> table cells, `<li>`, JSON-LD FAQ answers, one `alt`, one figcaption), 17 across 11
> MDX spokes (7 map-disclaimer `alt`, 2 figcaption, 8 body prose incl. 2 FAQ answers).
> **0 headings changed**, so no anchor regenerated — the A4 anchor hazard does not
> arise here.
>
> **Intentional exceptions — documented, not swept:**
> - **`src/pages/de/hiking/index.astro:7`** — lowercase `trailhead` inside the file's
>   English developer comment block (*"No invented trail mileage, elevation gain,
>   permits, trailhead facilities…"*), copied verbatim from the English master's own
>   header comment. Not content, never rendered. Same precedent as A4's 4 code
>   identifiers: renaming it is an engineering change, not an editorial one.
> - **`src/page-content/home.ts:3345`** — the DE block's carousel `alt` *"Doc's Beach
>   trailhead sign on an Adventure Tours Vernal UTV tour near Vernal Utah"*. **Not
>   German terminology drift.** The entire 106-slide carousel — every `alt` and every
>   caption — is byte-identical to the English block in **all seven** locales
>   (verified `es`/`it`/`pt`/`fr`/`de`/`ja`/`zh`). Fixing German alone would create the
>   cross-locale inconsistency this review exists to remove. **Raised as [D1](#d1-the-home-page-carousel-ships-english-alt-text-and-captions-in-all-seven-locales)**
>   rather than swept.
>
> **The "15 boilerplate sites" figure in the original question was wrong** — the real
> count is 9, and they were not a reason to hold back: they are precisely the sites the
> `utv.ts` precedent already covers.
>
> **Post-change scans all match their recorded baselines** (Appendix rule — any `de`
> change re-runs A1/A2): `Du` 202 · `Sie` 137 · `Ihr` 13 · `Ihnen` 1 · `Ihre` 4;
> mid-sentence capitalised `Du`/`Dich`/`Dir`/`Dein*` **0**; A3's protected exceptions
> intact (`Wüstenpiste` 2, `Waschbrettpiste` 2, `Pistenpräparierung` 1,
> `Streckensystem` 0, `Pistennetz` 0); A6's split intact (`Leave No Trace` 20 +
> `Leave-No-Trace` 8). Conservation check: `Ausgangspunkt` family **234 → 275**, exactly
> +41, one per replaced occurrence, verified per file.

The original finding is preserved:

### A7 (original finding). `Trailhead` — the recorded lock is not supported by the corpus

Surfaced by the A4 census, which counted every `Trail*` form rather than grepping
for a pattern. A4's own note above states `Trailhead` is on "the frozen
never-translate list." **The corpus does not support that**, and per Gate 4c the
corpus beats the brief.

German is again the sole Latin-script locale keeping the English word:

| Locale | Untranslated `trailhead` | Native form | Count |
|---|---|---|---|
| `en` | 189 | — | — |
| `de` | **41** | `Ausgangspunkt` / `Ausgangspunkte` | 330 |
| `fr` | 1 | `départ de sentier` | 88 |
| `es` | **0** | `inicio de sendero` | 112 |
| `it` | 3 | `inizio del sentiero` | 142 |
| `pt` | 2 | `início de trilho` | 48 |

**German already renders the concept natively 330 times**, in unmistakably
trailhead-sense sentences — *"steigst du von einem **Ausgangspunkt** in einen
Talkessel auf"*, *"Zufahrt zu **Ausgangspunkten**, Genehmigungs- oder
Registrierungspflichten"*, *"die Straßen, **Ausgangspunkte** und Pässe bleiben
schneeblockiert"* — and the corpus even contains the explicit compound
`Wanderweg-Ausgangspunkt` (3). So this is not a lexical gap; it is an 11 % residue
against an established house term, the same drift shape as `Streckensystem` vs
`Pistensystem` in A3.

The 41 are concentrated, not evenly spread — which is what drift looks like:

| File | Count |
|---|---|
| [`de/hiking/index.astro`](src/pages/de/hiking/index.astro) | **22** |
| `camping-at-red-fleet-state-park` · `ultimate-guide-to-red-fleet-state-park` | 3 each |
| `beginners-guide-to-utv-tours-vernal` · `backcountry-tours-vernal-utah` | 2 each |
| 6 further files | 1 each |

Weighed against a sweep: `Trailhead` is a recognisable loanword in German outdoor
writing, and 15 of the 41 sit in image `alt` text and figcaptions where the
standing map disclaimer ("shows no routes, distances or trailhead locations") has
been repeated verbatim across many files — so a sweep touches boilerplate as well
as prose. `Ausgangspunkt` is also used in this corpus for the *UTV staging point*
in Vernal ("Alle fünf Pistensysteme starten von einem gemeinsamen Ausgangspunkt"),
so a blanket replacement would collapse two senses that are currently distinct.

> ~~**Question A7:** Normalise the 41 `Trailhead` to the established
> `Ausgangspunkt` family, or confirm `Trailhead` as a deliberate German loanword
> and record it as a real lock? If normalising, say whether the 15 alt-text/
> figcaption boilerplate instances are in or out.~~
> **ANSWERED & APPLIED 2026-07-25 (P22)** — see the decision block at the top of A7.
> Normalised. The boilerplate sites were **9, not 15**, and they were included using
> the corpus's own disambiguating phrase rather than being held back.

*Not applied in P17.* A4 was scoped to `Trail`/`Trails`/`Trail-`; `Trailhead` is a
separate lexeme, and overturning a lock recorded in this document is an owner
decision on the precedent of A1, A3 and A6. Nothing here blocks A4's closure.
**Applied in P22.**

---

### A8. `Dinosaur Country` — ✅ DECIDED & APPLIED 2026-07-25 (P23)

> **✅ Applied: `Land der Dinosaurier` confirmed as the canonical German rendering of
> the destination identity `Dinosaur Country`; all 18 untranslated English
> occurrences normalised. 0 intentional exceptions — every one of the 18 was drift.**
> Verified: `astro check` 0 errors / 0 warnings · build **619 pages** · validator ✔ ·
> **5 files changed**, 18 insertions / 18 deletions · rendered `dist/de/` contains
> **0** `Dinosaur Country` · route parity 77/77 in all seven locales · no other
> locale touched.

**The decision needed no new argument — the repository already carries the rule in
writing.** The German chrome dictionary's own preamble in
[`src/lib/ui.ts`](src/lib/ui.ts#L661) states it explicitly:

> `"Dinosaur Country" → "Land der Dinosaurier" and "Key Takeaways" → "Das Wichtigste`
> `in Kürze" reuse the exact locked phrases from the P9 MDX batches, not new`
> `translations.`

P21's cross-locale census (§C4) had already established that localising the identity
is **unanimous across all seven locales** — `de` was not being asked to break a
pattern, it was 96 % conformant to one already. The 18 English occurrences sat
against 449 German ones, and the drift was often *intra-file*: the page summary of
[`weekend-fishing-trip-vernal.de.mdx`](src/content/itineraries/weekend-fishing-trip-vernal.de.mdx#L40)
opened with the untranslated English article title and then said
`Land der Dinosaurier` **in the same sentence**.

**Occurrences by surface** (all 18, all in 5 files):

| Surface | Count | Files |
|---|---|---|
| Prose | 9 | `fishing-red-fleet-reservoir` 4 · `visiting-dinosaur-national-monument` 3 · `camping-*` 2 |
| Link anchor text | 5 | `camping-at-red-fleet-state-park` 2 · `camping-in-ashley-national-forest` 1 · `fishing-red-fleet-reservoir` 1 · `visiting-dinosaur-national-monument` 1 |
| Image `alt` text | 2 | `visiting-dinosaur-national-monument` (both regional maps) |
| Hidden `page-summary` | 1 | `weekend-fishing-trip-vernal` |
| Article summary box | 1 | `camping-in-ashley-national-forest` |
| Headings · metadata · FAQ · CTA · structured data | **0** | — |

Nothing reached a heading, a frontmatter field, an FAQ block, a CTA or a JSON-LD
value; the residue was entirely body-level. `src/pages/de/**` was already clean (0),
as were the `DE` blocks of every `page-content/*.ts` file and the `DE` dictionary in
`ui.ts`.

**Two occurrences looked like candidate exceptions and both failed the test.**

1. **The two map `alt` texts.** Alt text is machine-facing, so retention was
   arguable. But the *sibling files in the same page family* settle it — the same two
   SVGs are described in four other German files, and every one of them already uses
   the German identity: `Schematisches Hub-and-Spoke-Diagramm des Landes der
   Dinosaurier …` in
   [`ultimate-guide-to-ashley-national-forest.de.mdx`](src/content/guides/ultimate-guide-to-ashley-national-forest.de.mdx#L67)
   and `ultimate-guide-to-steinaker-state-park`, plus `Nabe-Speiche-` and
   `Speichenrad-` variants in the Red Fleet and Flaming Gorge guides. All six peer
   locales localise the identity inside these same `alt` strings too. The German
   compound `Hub-and-Spoke-Diagramm` was **left alone** — it is established in two
   other German files and is a separate lexeme, out of A8's scope.
2. **The English article title in the hidden page summary.** All seven peer locales
   translate this title in the identical position (`es` «Fin de semana de pesca en
   Vernal y Tierra de los Dinosaurios», `fr` *Le Week-end de Pêche à Vernal et en
   Terre des Dinosaures*, `zh` 《Vernal 与恐龙之乡钓鱼周末行程》…), and it was the
   only one of the 57 German page summaries carrying an untranslated English title.
   The replacement reuses the file's **own** locked frontmatter title —
   `Angelwochenende in Vernal und im Land der Dinosaurier` — rather than a new
   translation.

**One competing German rendering was found and deliberately retained.**
[`things-to-do.ts`](src/page-content/things-to-do.ts#L1624) renders the identity as
`Dinosaurierland` in the scenic-drives paragraph. This is **not** drift: the English
master at that line reads lowercase `past petroglyphs and dinosaur country` — the
generic common noun, not the branded identity — and every Latin-script locale
independently reached for a lowercase generic form there rather than its own brand
(`es` *tierra de dinosaurios* · `it` *terra dei dinosauri* · `pt` *território de
dinossauros* · `fr` *un pays de dinosaures*; `ja`/`zh` drop the clause). Same shape
as C3's `越野车`: the apparent competing rendering is **English's own distinction
being faithfully preserved**, so normalising it would have destroyed a sense
contrast, not fixed one. There are 4 lowercase generic instances in the English
corpus in total, and they are held separate from the 361 branded ones.

**Case forms all reuse collocations the corpus already had**, per the same
`ui.ts` instruction not to invent: `im Land der Dinosaurier` (197 existing) for
locative, `durchs Land der Dinosaurier` (9) for `durch`, `für das Land der
Dinosaurier` (25), `das Land der Dinosaurier` (130) for subject position, and the
genitive `des Landes der Dinosaurier` (24 — including `Diagramm des Landes der
Dinosaurier` 4×) after `Diagramm`, `Charakter`, `Geschmack` and `Repertoire`. The
genitive choice follows the corpus's dominant `Charakter des …` pattern rather than
`von`. German totals after the sweep: `Land der Dinosaurier` 461, `Landes der
Dinosaurier` 30.

**This closes the German post-review backlog.** A1–A8 are all decided; the only
German item still outstanding is the human native-speaker read, tracked separately.

---

### A5. Untranslated English headings — ✅ DECIDED & APPLIED 2026-07-25 (P14)

> **✅ Applied: 16 of 17 headings localized; `## Leave No Trace` retained as a locked
> programme name.** Verified: `astro check` 0 errors / 0 warnings · build **619 pages** ·
> validator ✔ · exactly one file changed.
>
> **The translations were not invented — they were recovered from the file itself.**
> The German `page-summary` and frontmatter `description` already enumerate the whole
> heading list in German, written by the original translator when the body was
> localized. Those strings supplied the vocabulary, so the headings now match the prose
> that was always shipped beneath them (`Mehrtagestour` 46 uses, `Mehrtageswanderer`
> 14, `Backcountry` 14 — the file's own established terms).
>
> | Line | Was | Now |
> |---|---|---|
> | 54 | `## Why Backpack the High Uintas` | `## Warum eine Mehrtagestour in den High Uintas` |
> | 71 | `## Who Should Consider Backpacking` | `## Wer eine Mehrtagestour in Betracht ziehen sollte` |
> | 81 | `## Planning Your First Backpacking Trip` | `## Deine erste Mehrtagestour planen` |
> | 95 | `## Backpacking vs Day Hiking` | `## Mehrtagestour vs. Tageswanderung` |
> | 115 | `## Popular Backpacking Experiences` | `## Beliebte Mehrtageserlebnisse` |
> | 119 | `### Alpine Lakes` | `### Bergseen` |
> | 125 | `### Backcountry Camping` | `### Backcountry-Camping` |
> | 131 | `### Wildlife` | `### Wildtiere` |
> | 137 | `## Weather` | `## Wetter` |
> | **145** | `## Leave No Trace` | **unchanged — locked** |
> | 157 | `## Photography` | `## Fotografie` |
> | 165 | `## Safety` | `## Sicherheit` |
> | 179 | `## Seasonal Considerations` | `## Saisonale Überlegungen` |
> | 199 | `## Experience Level: Beginner vs Experienced Backpackers` | `## Erfahrungsstufe: Anfänger vs. erfahrene Mehrtageswanderer` |
> | 219 | `## Kings Peak vs General High Uintas Backpacking` | `## Kings Peak vs. allgemeine Mehrtagestouren in den High Uintas` |
> | 241 | `## Accessibility` | `## Barrierefreiheit` |
> | 249 | `## Planning Tips` | `## Planungstipps` |
>
> **Preserved:** all 17 line numbers and heading levels (`##`/`###`) are unchanged, so
> the structural mirror against the English master still holds. Glossary terms
> `High Uintas`, `Kings Peak` and `Backcountry` stay English, matching every other
> locale. A2 sentence case is applied throughout — note `Erfahrungsstufe: Anfänger`
> keeps its capital because a **noun** follows the colon, and `vs. erfahrene` is
> lowercase because `vs.` does not begin a new sentence.
>
> **Anchor note.** Heading-derived anchor IDs necessarily changed with the text. This
> was safe and verified: the file has **no explicit `id=` attributes**, and **no link
> anywhere in source or in built `dist/` targets this page's anchors**. `#leave-no-trace`
> is unchanged because that heading was retained.
>
> **`Leave No Trace` lock — three independent lines of evidence:** it appears **7×
> untranslated in this file's own German prose** (6 plain + 1 as
> `Leave-No-Trace-Praktiken`), including the frontmatter description and a
> key-takeaways bullet; `es`/`it`/`pt`/`fr`/`ja` all keep it English at the identical
> line 145; and only `zh` translated it (`无痕山林`). See **A6** for the one
> inconsistency this exposed.

The original finding is preserved:

### A5 (original finding). Untranslated English headings in one shipped German file

Surfaced by the A2 census, which reads every heading rather than grepping for a
pattern. [`hiking/high-uintas-backpacking-guide.de.mdx`](src/content/hiking/high-uintas-backpacking-guide.de.mdx)
ships **17 of its headings in English** while its body prose is fully and fluently
German. This is not a capitalisation defect, so A2 deliberately left it untouched.

| Line | Shipped heading |
|---|---|
| 54 | `## Why Backpack the High Uintas` |
| 71 | `## Who Should Consider Backpacking` |
| 81 | `## Planning Your First Backpacking Trip` |
| 95 | `## Backpacking vs Day Hiking` |
| 115 | `## Popular Backpacking Experiences` |
| 119 | `### Alpine Lakes` |
| 125 | `### Backcountry Camping` |
| 131 | `### Wildlife` |
| 137 | `## Weather` |
| 145 | `## Leave No Trace` |
| 157 | `## Photography` |
| 165 | `## Safety` |
| 179 | `## Seasonal Considerations` |
| 199 | `## Experience Level: Beginner vs Experienced Backpackers` |
| 219 | `## Kings Peak vs General High Uintas Backpacking` |
| 241 | `## Accessibility` |
| 249 | `## Planning Tips` |

The file's frontmatter title *is* German (`High Uintas Mehrtagestour-Guide: Plane
deinen Wilderness-Trip`), and the prose under each English heading is German — so
this reads as a batch that translated bodies and skipped the heading layer, not a
deliberate choice.

**Cross-locale check (run at P13) confirms `de` is the sole outlier.** The same file
in every other locale has all 17 headings translated:

| Locale | English headings remaining (of 17) |
|---|---|
| `de` | **17** |
| `es` / `pt` | 1 — `## Leave No Trace` (plus `Backcountry` inside a translated heading) |
| `it` / `fr` / `ja` | 1 — `## Leave No Trace` |
| `zh` | 0 — rendered as `## 无痕山林` |

So `Leave No Trace` **is** a locked programme name in practice: four locales keep it
English at the identical line 145, and only `zh` translated it. The other 16
headings have no such precedent and are simply missing.

The one genuine tension is `de`-internal: German already uses the translated form as
a heading in three other hiking spokes —
[`wildflower-hiking-near-vernal.de.mdx:254`](src/content/hiking/wildflower-hiking-near-vernal.de.mdx#L254),
[`dog-friendly-hiking-near-vernal.de.mdx:163`](src/content/hiking/dog-friendly-hiking-near-vernal.de.mdx#L163),
[`alpine-lakes-hiking-high-uintas.de.mdx:283`](src/content/hiking/alpine-lakes-hiking-high-uintas.de.mdx#L283)
— so keeping `Leave No Trace` English here would be inconsistent *within German* even
though it is consistent *across locales*.

> ~~**Question A5:** Translate the 16 non-locked headings…~~
> **ANSWERED & APPLIED 2026-07-25 (P14)** — see the decision block at the top of A5.
> The `Leave No Trace` question resolved in favour of the **lock**, on evidence that
> was not available when this question was written: the file's own German prose uses
> the English name 7 times. The de-internal tension it named is now tracked as **A6**.

---

### A6. `Leave No Trace` lock — ✅ DECIDED & APPLIED 2026-07-25 (P15)

> **✅ Applied: 8 sites aligned to the English programme name across 6 files;
> 9 descriptive-prose uses deliberately left in German.** Verified: `astro check`
> 0 errors / 0 warnings · build **619 pages** · validator ✔ · 6 files changed.
>
> **The census found a discriminator the original A6 question did not anticipate:
> the English master already distinguishes the two senses by capitalisation.**
>
> | English form | Sense | German should be |
> |---|---|---|
> | `Leave No Trace` (Title Case) | the **programme name** | `Leave No Trace` — locked |
> | `leave no trace` / `Leave no trace` | ordinary **imperative prose** | `hinterlasse keine Spuren` — translated |
>
> That rule decides every occurrence mechanically and made the scope smaller and
> better-founded than the "3 headings" first estimated. Of 11 German-form
> occurrences, **8 rendered a Title-Case programme name and were misaligned**;
> **3 rendered lowercase prose and were already correct**.
>
> | Site | Context | English master | Action |
> |---|---|---|---|
> | [`camping-in-ashley-national-forest:104`](src/content/camping/camping-in-ashley-national-forest.de.mdx#L104) | list-item | `<strong>Leave No Trace.</strong>` | aligned |
> | [`alpine-lakes-hiking-high-uintas:33`](src/content/hiking/alpine-lakes-hiking-high-uintas.de.mdx#L33) | page-summary | `Leave No Trace at fragile shores` | aligned |
> | [`alpine-lakes-hiking-high-uintas:283`](src/content/hiking/alpine-lakes-hiking-high-uintas.de.mdx#L283) | heading | `## Leave No Trace at Fragile Shores` | aligned |
> | [`dog-friendly-hiking-near-vernal:163`](src/content/hiking/dog-friendly-hiking-near-vernal.de.mdx#L163) | heading | `## Leave No Trace with Pets` | aligned |
> | [`dog-friendly-hiking-near-vernal:165`](src/content/hiking/dog-friendly-hiking-near-vernal.de.mdx#L165) | prose | `The Leave No Trace ethic` | → `Die Leave-No-Trace-Ethik` |
> | [`high-uintas-day-hikes:28`](src/content/hiking/high-uintas-day-hikes.de.mdx#L28) | FAQ | `Leave No Trace practices` | → `Leave-No-Trace-Praktiken` |
> | [`spring-hiking-near-vernal:245`](src/content/hiking/spring-hiking-near-vernal.de.mdx#L245) | prose | `The Leave No Trace answer` | → `Die Leave-No-Trace-Antwort` |
> | [`wildflower-hiking-near-vernal:254`](src/content/hiking/wildflower-hiking-near-vernal.de.mdx#L254) | heading | `## Leave No Trace` | aligned |
>
> The three attributive uses take the German compound form `Leave-No-Trace-X`, which
> the corpus already used before this sweep
> ([`kings-peak-hiking-guide:24`](src/content/hiking/kings-peak-hiking-guide.de.mdx#L24),
> [`high-uintas-backpacking-guide:20`](src/content/hiking/high-uintas-backpacking-guide.de.mdx#L20)) —
> so this is the file's own convention, not a new coinage.
>
> **9 occurrences intentionally left unchanged** (each renders lowercase English prose,
> where a German imperative is the correct translation and the programme name is *not*
> being invoked):
> `bird-watching-near-vernal:28` (FAQ), `:203`, `:256` · `wildlife-hiking-guide-near-vernal:26`
> (FAQ), `:205`, `:223` · `photography-hikes-near-vernal:228` ·
> `high-uintas-backpacking-guide:259` · and
> [`de/camping/index.astro:167`](src/pages/de/camping/index.astro#L167), which reads
> `<strong>Leave No Trace (hinterlasse keine Spuren).</strong>` — already led by the
> locked name, with a first-use German gloss. That gloss is **good practice and was kept**.
>
> **Anchors.** Three headings changed, so their IDs regenerated to
> `#leave-no-trace`, `#leave-no-trace-mit-haustieren`,
> `#leave-no-trace-an-empfindlichen-ufern`. Verified safe: no link in source or built
> `dist/` targeted the old IDs, and `dist/` contains no `hinterlasse-keine-spuren`
> anchor references at all.
>
> **⚠ Correction to the P14 record.** P14 stated "es/it/pt/fr/ja all keep it English",
> generalising from a single file. A full 8-site × 7-locale check shows the real
> pattern is **script-family, not universal**:
>
> | Locale | Keeps `Leave No Trace` | Note |
> |---|---|---|
> | `it` `pt` `fr` | 8 / 8 | consistent lock |
> | `es` | 6 / 8 | translates twice in one file (`No Dejar Rastro`) |
> | `ja` | 2 / 8 | usually transliterates — `リーブ・ノー・トレイス` (still the programme name, script-adapted) |
> | `zh` | 0 / 8 | uses the established Chinese name `无痕山林` |
> | `de` (before) | 0 / 8 | **the only Latin-script locale translating at every site** |
>
> The lock therefore holds for **Latin-script locales**, where an English programme
> name is readable; `ja` and `zh` legitimately render it in their own script. German is
> Latin-script, so aligning it to the English name is the correct and evidence-backed
> call — and it was the sole outlier among its peers.

The original finding is preserved:

### A6 (original finding). `Leave No Trace` vs `Hinterlasse keine Spuren`

A5 confirmed `Leave No Trace` is a locked programme name and retained it. That makes
German internally inconsistent: **one German heading now uses the locked English name
and three use a German translation of it.**

| File | German heading | `en` | `es` | `fr` | `ja` |
|---|---|---|---|---|---|
| `high-uintas-backpacking-guide` | `## Leave No Trace` ✅ | `Leave No Trace` | `Leave No Trace` | `Leave No Trace` | `Leave No Trace` |
| [`wildflower-hiking-near-vernal:254`](src/content/hiking/wildflower-hiking-near-vernal.de.mdx#L254) | `## Hinterlasse keine Spuren` | `Leave No Trace` | `Leave No Trace` | `Leave No Trace` | `Leave No Trace` |
| [`dog-friendly-hiking-near-vernal:163`](src/content/hiking/dog-friendly-hiking-near-vernal.de.mdx#L163) | `## Hinterlasse keine Spuren mit Haustieren` | `Leave No Trace with Pets` | `Leave No Trace con Mascotas` | `Leave No Trace avec Animaux` | — |
| [`alpine-lakes-hiking-high-uintas:283`](src/content/hiking/alpine-lakes-hiking-high-uintas.de.mdx#L283) | `## Hinterlasse keine Spuren an empfindlichen Ufern` | `Leave No Trace at Fragile Shores` | — | `Leave No Trace Sur Les Rives Fragiles` | — |

The pattern is unambiguous: **every other locale keeps the programme name in English
and translates only the surrounding words** (`con Mascotas`, `avec Animaux`,
`Sur Les Rives Fragiles`). German is the only locale that translated the name itself,
and it did so in exactly these three places.

Weighed against that: `Hinterlasse keine Spuren` is genuinely idiomatic German and a
reader unfamiliar with the programme will understand it, whereas `Leave No Trace` is
an untranslated English string in a German heading.

> ~~**Question A6:** Bring the three headings in line with the lock…~~
> **ANSWERED & APPLIED 2026-07-25 (P15)** — see the decision block at the top of A6.
> The final scope was **8 sites, not 3**: the census found the same defect in a
> page-summary, a FAQ, a list-item and two prose sentences, not only in headings.

---

## B. Japanese (`ja`) — B1 decided & applied; B2 dissolved; B3 P24, B4 P25. **Section closed end-to-end.**

### B1. `モアブ` vs `Moab` — ✅ DECIDED & APPLIED 2026-07-25 (P18): **Latin `Moab`**

> **✅ Applied: the 37 katakana occurrences in the single outlier file were
> normalised to Latin `Moab`; the 48 already-canonical occurrences across the other
> 11 Japanese surfaces were left untouched.** Verified: `astro check` 0 errors /
> 0 warnings · build **619 pages** · validator ✔ · route parity `ja` = `de` = `zh`
> = 77 · **1 file changed**.
>
> **The decision was not made on the file split — it was made on the corpus's own
> place-name rule, which the earlier B1 note never measured.** The `ja` corpus does
> not transliterate US place names as a class. It transliterates exactly two things:
> the **subject town** and **state names**. Every other settlement ships in Latin:
>
> | Place | Katakana | Latin |
> |---|---|---|
> | Vernal — *the subject town* | **バーナル 2,084** | 381 (321 of them the brand `Adventure Tours Vernal` / `Best Western Vernal`) |
> | Utah / Colorado / Wyoming — *states* | **ユタ州 763 · コロラド 146 · ワイオミング 64** | compound names only |
> | Denver | 0 | **88** |
> | Grand Junction | 0 | **64** |
> | Heber City | 0 | **11** |
> | Roosevelt | 0 | **10** |
> | Duchesne | 0 | **10** |
> | Rock Springs | 0 | **1** |
> | **Moab** *(before)* | **37** | **48** |
>
> Landmarks are locked Latin even more strongly — Flaming Gorge 860 / 0, Dinosaur
> National Monument 507 / 0, Ashley National Forest 578 / 0, Steinaker 449 / 0,
> Kings Peak 174 / 1. So `Moab` in Latin is not an untranslated residue; it is the
> form the corpus already uses for every place that is not Vernal or a state.
>
> **Four independent lines of evidence, all pointing the same way:**
>
> 1. **Latin was already the majority and the wider spread** — 48 occurrences across
>    11 files, against 37 in **one** file. The katakana is a single-batch artifact.
> 2. **The `ja` guides hub already titles this very article in Latin.**
>    [`ja/guides/index.astro:80`](src/pages/ja/guides/index.astro#L80) links to it as
>    `Moab UTVツアーの代替案`, while the article's own frontmatter title read
>    `モアブUTVツアーの代替案`. The same string in two scripts — the hub, which lists all
>    nine guides consistently, used Latin. That is the `Streckensystem`/`Pistensystem`
>    shape from A3, and it also resolves the anchor-text objection the original B1
>    note raised.
> 3. **One shipped sentence contained both conventions.**
>    [`ultimate-guide-to-vernal-utah.ja.mdx:72`](src/content/guides/ultimate-guide-to-vernal-utah.ja.mdx#L72)
>    reads `ソルトレイクシティは西へ約3時間、MoabはUS-191経由で南へ約2.5時間` — a
>    transliterated city and a Latin city in one clause — and lines 110–111 of the same
>    file put `ソルトレイクシティ` and `Moab` in **adjacent rows of one distance table**.
> 4. **The other CJK locale agrees.** `zh` — which readily uses native names elsewhere
>    (`恐龙之乡`, `无痕山林`) — ships `Moab` **72** times and the standard Chinese
>    transliteration `摩押` **0** times.
>
> **Why not the other direction.** Standardising on `モアブ` would have been the larger
> and less defensible sweep: it touches 48 occurrences across 11 files including three
> `page-content/*.ts` locale blocks, it contradicts the hub's own article title, and —
> decisively — it would leave `Moab` transliterated while `Denver` (88), `Grand
> Junction` (64), `Heber City`, `Duchesne` and `Roosevelt` stayed Latin. Being
> consistent would then have required transliterating those too, turning a one-item
> review into a corpus-wide transliteration programme that nobody has asked for.
>
> **Occurrences by context** (all 85): body prose 31 · FAQ 15 · HTML heading 10 ·
> structured data (JSON-LD) 7 · frontmatter metadata 5 · CTA / hero display 5 ·
> table 4 · page-summary 3 · image alt / figcaption 2 · Astro props 2 ·
> **markdown heading 1**.
>
> That single markdown heading is `## バーナル対Moab：正直な比較`
> ([`ultimate-guide-to-vernal-utah.ja.mdx:173`](src/content/guides/ultimate-guide-to-vernal-utah.ja.mdx#L173)) —
> already Latin, in a file this sweep did not touch. It is the reason the
> anchor-safety claim below holds without further checking.
>
> **Spacing.** The corpus sets Latin tokens directly against kana with no space
> (`Moabは`, `Moabから`, `Denverから`, `Grand Junctionから`), so the substitution is
> direct. The **one** place where the katakana abutted a Latin token — the frontmatter
> title `モアブUTVツアー` — took a space, giving `Moab UTVツアーの代替案`, which is
> byte-identical to the hub's existing link text. Verified: **0** `Moab`+Latin run-ons
> in the rendered page.
>
> **Intentional exceptions — documented, not swept:**
> - **20 lowercase `moab`** in the same file are the route slug
>   `/ja/guides/moab-utv-tours/` and the CSS class `moab-hero-badge`. Not content;
>   renaming them would be a routing/engineering change, out of scope for an editorial
>   pass — the same call A4 made for its 4 code identifiers.
> - **The 48 existing Latin occurrences** — already canonical, untouched.
> - **`バーナル` (2,084) and the state names** — the two things the corpus *does*
>   transliterate. Untouched.
>
> **No anchor risk.** The changed strings are frontmatter, FAQ, HTML headings and
> prose; **no markdown `##`/`###` heading was touched**, so no heading-derived ID
> regenerated. Confirmed against the diff.
>
> **⚠ Two pre-existing `ja` defects surfaced by this census — recorded, not fixed,
> because they are outside B1's scope:**
> 1. **`Salt Lake City` is split the same way `Moab` was** — Latin **129** vs
>    ソルトレイクシティ **34**, and the two forms appear in *identical* sentence
>    patterns (`<a href="/ja/from/salt-lake-city/">Salt Lake Cityからバーナルへの旅行
>    ガイド</a>` in `visiting-dinosaur-national-monument.ja.mdx:244` against
>    `…ソルトレイクシティからバーナルへのガイド</a>` in `camping-at-flaming-gorge.ja.mdx:236`).
>    The rule established here decides it — the gateway page
>    [`ja/from/salt-lake-city.astro`](src/pages/ja/from/salt-lake-city.astro), whose
>    entire subject is the city, names it **`Salt Lake City`** in its `title`,
>    `description` and `<h1>` — but applying it is a separate sweep of 34 occurrences
>    and was not authorised by B1. **Recommended as B3** — ✅ **applied at P24**, all
>    34 replaced, 0 exceptions; see §E.
> 2. **~14 untranslated English anchor texts** in `ja` body links —
>    `things to do in Vernal`, `Vernal weather guide`, `wildlife hiking guide near
>    Vernal`, `Ultimate Guide to Vernal` — where the link target is a `/ja/` route but
>    the visible text is English. Distinct from the Gate 4d route-downgrade class
>    (which is clean); this is display text, not hrefs. **Recommended as B4.**

The original finding is preserved:

### B1 (original finding). A single-file split

A single-file split, and cleanly so:

| File | `モアブ` | `Moab` |
|---|---|---|
| `guides/moab-utv-tours.ja.mdx` | 37 | **0** |
| `guides/ultimate-guide-to-vernal-utah.ja.mdx` | 0 | ✓ |
| `utv/best-utv-trails-vernal.ja.mdx` | 0 | ✓ |
| `utv/side-by-side-rentals-vernal-utah.ja.mdx` | 0 | ✓ |
| `things-to-do/fun-things-to-do-vernal-utah-kids.ja.mdx` | 0 | ✓ |
| `dinosaur-national-monument/visiting-dinosaur-national-monument.ja.mdx` | 0 | ✓ |

There is **no mixed usage inside any single file**, so either direction is a
clean one-pass change. Context that matters for the decision:

- The `ja` corpus *does* transliterate the primary place names — バーナル 1679,
  ユタ州 580, canonical combined form ユタ州バーナル 209. On that precedent,
  モアブ is arguably the consistent choice and the five `Moab` files are the
  outliers.
- Against that: `ultimate-guide-to-vernal-utah.ja.mdx` links to the Moab article
  with the anchor text `Moab比較ガイド`, so today a reader sees `Moab` in the
  link and `モアブ` on the page they land on.
- Moab is a comparison/competitor destination here, not a place this business
  operates — it may warrant different treatment from バーナル.

> ~~**Question B1:** Standardise on `モアブ` (change 5 files + the anchor text) or
> on `Moab` (change 1 file, 37 occurrences)? Either is a single sweep.~~
> **ANSWERED & APPLIED 2026-07-25 (P18): `Moab`.** See the decision block at the top
> of B1. The table above was **spoke-only and undercounted**: the true census is
> **85** occurrences, not 37+5 files — it omitted the 20 inline `src/pages/ja/**`
> pages (15) and the `page-content/*.ts` JA locale blocks (13). The framing was also
> wrong in kind: this was never a file split to be resolved either way, but a residue
> measured against the corpus's own place-name rule, which no earlier count had
> established.

---

### B2. `フクロウ` / `ピューマ` / `バッドランズ` — no action needed

These three were recorded as "terms with no corpus precedent, flagged by
agents." A direct scan of all 57 `ja` spokes returns **0 occurrences of each** —
and 0 occurrences of every plausible alternative (ミミズク, フクロウ類, クーガー,
マウンテンライオン, 荒地, 悪地, バッドランド).

They were considered during translation and never shipped. **Nothing to review.**
This item is closed; the earlier note was stale.

---

## C. Simplified Chinese (`zh`) — C1–C4 + C6 all decided; register clean. **Section closed.**

Counted across all 57 `.zh.mdx` spokes **and** the 20 `src/pages/zh/**` inline
pages. Register needs no decision: **你 3,668 / 您 0 / 咱们 0** — informal `你`
is applied without a single leak, exactly as the Z1 brief locked it.

### C1. `官方渠道` vs `官方来源` — ✅ DECIDED & APPLIED 2026-07-25: `官方渠道`

> **✅ OWNER DECISION (2026-07-25): `请向官方渠道核实` is the project standard.**
> Rationale: the corpus already demonstrates it as the established editorial
> convention at 961 instances. Rewriting 961 to match a single outlier would be a
> large sweep for no demonstrated benefit — the outlier is what diverged.
>
> **Applied the same day (3 changes, smallest-possible scope):**
>
> | Change | Location | Count |
> |---|---|---|
> | `请向官方来源核实` → `请向官方渠道核实` | [`zh/itineraries/index.astro:65`](src/pages/zh/itineraries/index.astro#L65) | 1 |
> | Duplicated `请` removed (independent grammar fix) | [`wildflower-hiking-near-vernal.zh.mdx:278`](src/content/hiking/wildflower-hiking-near-vernal.zh.mdx#L278) | 1 |
> | **Result** | `请向官方渠道核实` = **962**, `请向官方来源核实` = **0** | |
>
> The grammar fix reads `…就你要前往的海拔的当前预报，请向官方渠道核实（…）` —
> the first `请` is dropped and a comma inserted, so the locked phrase stays
> byte-identical and the agency list stays adjacent to it.
>
> **Deliberately NOT changed:** the 3 remaining `官方来源` in ordinary prose
> (`由官方来源掌握`, `请查当年的天文历或官方来源确认`, `出发前请先向官方来源确认`).
> These are not the caveat phrase — 来源 as a common noun is a separate usage from
> the fixed 渠道 formula, and collapsing them was not part of the decision. One of
> them (`且都由官方来源掌握`) is mildly awkward Chinese on its own merits and is
> worth the native reviewer's eye — flagged, not fixed.

The evidence the decision was made against is preserved:

Every article carries the same standing caveat that hours, fees, road conditions
and closures change and must be checked. The Chinese corpus renders it two ways:

| Form | Literal sense | Count *before* the fix |
|---|---|---|
| `请向官方渠道核实` | "verify via official **channels**" | **961** |
| `请向官方来源核实` | "verify with official **sources**" | **1** |

The lone `来源` instance was introduced deliberately during Z5, on the judgement
that 渠道 ("channels") reads as booking/contact channels rather than authoritative
sources. That judgement was defensible in isolation, but it was applied to one
page out of 77, so it left the corpus inconsistent either way — which is what made
this a decision rather than a cleanup.

**Correcting the record:** earlier phase notes described `zh` as keeping "9 locked
all-caps `VERIFY WITH OFFICIAL SOURCE` instances alongside 1 natural Chinese
phrase." That is not what shipped. The English string appears **0** times in the
`zh` corpus. Chinese had one phrase in two spellings, 961 to 1 — not a
locked/natural split. The 961-vs-1 framing above is the measured state.

---

### C2. `登山口` for trailheads — ✅ DECIDED & APPLIED 2026-07-25 (P19): **KEEP `登山口`**

> **✅ Decision: `登山口` is the correct and canonical Chinese term for a trailhead in
> every context, and is retained. 230 of 232 occurrences are unchanged.** The only
> change is a drift fix inside the same terminology family: **2 replacements** in one
> file that rendered `trailhead` as bare `入口`. Verified: `astro check` 0 errors /
> 0 warnings · build **619 pages** · validator ✔ · 1 file changed.
>
> **This is a "leave it alone" decision, and five independent lines of evidence
> produced it.**
>
> 1. **The English master makes no terrain distinction, so a split would invent one
>    the source does not have.** `trailhead` appears **204** times in the English
>    corpus and is used identically for desert-bench and alpine access points — often
>    in the *same sentence*.
>    [`winter-hiking-near-vernal.mdx:26`](src/content/hiking/winter-hiking-near-vernal.mdx#L26)
>    is decisive: *"the **lower-elevation** roads and **trailheads** around Vernal,
>    Dinosaur National Monument, Red Fleet, and the lower gorge … The **higher
>    mountain** roads, byways, and **trailheads** that reach the upper Ashley National
>    Forest and the High Uintas…"* One word, both terrains, one FAQ answer.
> 2. **No mechanical rule exists to apply a split.** C2 asked for a rule that decides
>    which is which. There is none: **29 of the 37 files** containing `登山口` cover
>    both terrains, and the split falls *inside* sentences and table rows, not between
>    files. [`winter-hiking-near-vernal.zh.mdx:102`](src/content/hiking/winter-hiking-near-vernal.zh.mdx#L102)
>    puts `低海拔道路更有可能开放` and `高海拔道路和登山口通常冬季封闭` in **adjacent
>    cells of one comparison table**; a terrain rule would render the identical concept
>    with two different words inside a single row. That is the cross-batch drift Gate 4c
>    exists to prevent, manufactured deliberately.
> 3. **No peer locale splits by terrain — every one uses a single house term.**
>
>    | Locale | Trailhead term | Count | Split by terrain? |
>    |---|---|---|---|
>    | `en` | `trailhead` | 204 | no |
>    | `de` | `Ausgangspunkt` (+ 42 `Trailhead` → **A7**) | 235 | no |
>    | `fr` | `tête de sentier` 48 / `départ de sentier` 37 | 85 | no — batch drift, not terrain |
>    | `es` | `inicio de sendero` | 39 | no |
>    | `it` | `inizio del sentiero` | 99 | no |
>    | `pt` | `início de trilho` | 16 | no |
>    | `ja` | `トレイルヘッド` | 230 | no |
>    | `zh` | `登山口` | 232 | no |
>
> 4. **`登山口` is not a `ja` artifact — the two CJK locales chose independently.**
>    Worth checking because `zh` was mirrored from the `ja` rollout (C5 records the
>    leftover Japanese code comments). `ja` uses `トレイルヘッド` **230** times and
>    `登山口` **0** times, so the Chinese term was an independent editorial choice,
>    not carried over.
> 5. **The corpus already anchors `登山-` as a lexicalised outdoor morpheme in a
>    desert context.** This is the A3 `Piste` shape. The literal reading of `登山口`
>    ("mountain-climbing entrance") is in tension with the corpus's *own* use of bare
>    `登山` for technical mountaineering — `冬季登山` (10), `技术登山`, `登山远征`,
>    `登山者` (2), and explicitly `那是冬季登山地形，不是徒步`. But the compounds
>    behave differently: `登山靴` renders *hiking boots* at
>    [`visiting-dinosaur-national-monument.zh.mdx:279`](src/content/dinosaur-national-monument/visiting-dinosaur-national-monument.zh.mdx)
>    — for **slickrock at Dinosaur National Monument**, where there is no mountain at
>    all — and reads correctly. `登山杖` (4) behaves the same way. Exactly as
>    `Wüstenpiste`/`Waschbrettpiste` proved the German translator was working in the
>    off-road register, these prove `登山X` is lexicalised here and not compositional.
>
> **The senses are already kept separate — `zh` does not have the collapse risk `de`
> has.** A7 warns that German `Ausgangspunkt` serves *both* trailhead and UTV staging
> point, so a blanket sweep there would merge two senses. Chinese keeps them apart:
>
> | Sense | Chinese term | Count |
> |---|---|---|
> | trailhead | `登山口` | 232 |
> | UTV staging / meeting point | `集合点` | 44 |
> | parking area | `停车场` | 22 |
> | campground | `营地` | 708 |
>
> **The `utv` row that C2 flagged as "the weakest fit of all" dissolves on
> measurement.** Of the 9 `utv` occurrences, **8 are the shared map-disclaimer
> boilerplate** — the English master's *"shows no routes, distances, directions, or
> trailhead locations"* — which is the identical string used in the hiking hub. It is
> not UTV-specific terminology. The 9th
> ([`side-by-side-rentals-vernal-utah.zh.mdx:45`](src/content/utv/side-by-side-rentals-vernal-utah.zh.mdx#L45))
> renders *"there are no marked trailheads, no posted signs"* and is a genuine
> trailhead use.
>
> **What *was* fixed — single-file drift, the `Streckensystem` shape.** A per-file
> `en`↔`zh` count found **exactly one divergence** across the whole corpus:
> [`beginners-guide-to-utv-tours-vernal`](src/content/utv/beginners-guide-to-utv-tours-vernal.zh.mdx)
> rendered `trailhead` as bare `入口` twice, where every sibling file uses `登山口` —
> including for the *same English sentence*.
>
> | Line | English master | Was | Now |
> |---|---|---|---|
> | 85 | `no marked trailheads` | `没有标记出来的入口` | `没有标记出来的登山口` |
> | 164 | `or trailhead locations shown` | `或入口位置` | `或登山口位置` |
>
> Line 85 is the same sentence as `side-by-side-rentals-vernal-utah:45`, which already
> shipped `没有标注好的登山口`. Result: `登山口` **232 → 234**, and every English
> `trailhead` in the corpus now has a `登山口` counterpart.
>
> **Intentional exceptions — documented, not swept:**
> - **Bare `入口` (35) is untouched, and sweeping it would have been a serious error.**
>   Every other occurrence is a genuine *entrance*: park entrances (`犹他州入口`,
>   `科罗拉多州入口`, `纪念地入口`), forest gateways (`## 最佳区域与入口`), a canyon
>   mouth (`深红色峡谷的入口`), boat-ramp access (`岸钓入口`) and figurative gateways
>   (`徒步中心页的新手入口`). This is the Chinese counterpart of A3's bare `Strecke`
>   (110), left alone for the same reason — **never sweep a bare stem.**
> - **`步道` (1,156)** — the house word for *trail*, not in question and untouched.
> - **The 26 map-disclaimer instances** stay `登山口`. Their surrounding wording varies
>   (`不显示` / `未标示` / `未标注` / `不含` / `不标注`), which looks like drift but is
>   **faithful to the source**: the English master itself ships **11 distinct
>   phrasings** of this disclaimer. Recorded so a later sweep does not "fix" it.
> - **`登山杖` (4), `登山靴` (1), `登山者` (2), `冬季登山` (10)** — correct
>   mountaineering and gear senses, untouched.
>
> **No anchor risk whatsoever.** `登山口` appears in **0** markdown or HTML headings
> anywhere in the corpus, so no heading-derived ID could regenerate. Both edits are
> body prose and image `alt` text.
>
> **Occurrences by surface** (all 232): body prose 149 · FAQ 35 · table 22 ·
> image alt 22 · figcaption 4 · **heading 0**.
> **By sense:** hiking trailhead 232 · UTV staging area **0** · parking area **0** ·
> campground access **0** — no concept is conflated.
>
> **Post-change guard scans all match their recorded baselines** (per the Appendix rule
> that any `zh` change re-runs the C5 and Gate 4e scans): `您` **0** · `——` **5,222** ·
> 14 `连接号` single dashes intact · `官方渠道核实` conserved at **994** · plain-text
> seams `请…请向` / `并请向` / `先请向` all **0**.
>
> **⚠ One pre-existing defect surfaced by this census — recorded, not fixed, because it
> is outside C2's scope. See `C7` in the Post-Review Opportunities section: C6's seam
> fix is clean in plain text but leaves 249 seams once inline markup is stripped.**

The original finding is preserved:

### C2 (original finding). Is `登山口` right where there is no mountain?

`登山口` (152 in hiking, 228 corpus-wide) literally means *mountain-climbing
entrance*. Much of this region's hiking is desert bench, canyon rim and
riverside — Fossil Discovery Trail, Sound of Silence, Desert Voices, the Cub
Creek petroglyph pullouts. The neutral alternatives `步道起点` and `步道入口`
appear **0** times, so there is currently no split to preserve.

| Hub | `登山口` | `步道` |
|---|---|---|
| hiking | 152 | 845 |
| camping | 17 | 9 |
| guides | 17 | 42 |
| utv | 9 | 0 |
| itineraries | 6 | 68 |
| scenic-drives | 1 | 10 |

Note `步道` itself (1,156) is consistent and not in question — this is only about
the *trailhead* compound. The `utv` row is worth a second look: 9 `登山口`
against 0 `步道` in motorised content may be the weakest fit of all.

> ~~**Question C2:** Keep `登山口` throughout, or use `步道起点`/`步道入口` for
> non-mountain trailheads? If split, state the rule that decides which is which
> so it can be applied mechanically.~~
> **ANSWERED & APPLIED 2026-07-25 (P19): keep `登山口`.** See the decision block at
> the top of C2. The question's own condition decided it — **no mechanical rule
> exists**, because 29 of 37 files span both terrains and the split falls inside
> single sentences and table rows. The true corpus figure is **232**, not 228; the
> earlier count omitted the 4 occurrences in the `page-content/*.ts` ZH blocks. The
> `utv` row flagged as "the weakest fit of all" is **8 parts shared map-disclaimer
> boilerplate and 1 genuine trailhead use** — not UTV-specific terminology.

---

### C3. Five small synonym residues — ✅ DECIDED & APPLIED 2026-07-25 (P20)

**Outcome: only 2 of the 5 rows were genuine drift. 6 replacements in 2 files**
(`a6e8f1e`). Measurement overturned the other three rows *and* the `越野车`
question, which turned out not to be a synonym question at all.

| Row | Doc's hypothesis | What the corpus showed | Decision |
|---|---|---|---|
| trail `小径` 15 | batch drift | EN says **"path"** at all 15 sites and "trail" at none. `summer-hiking` L229 renders EN *"high-country trails and hot desert paths"* as *"高山**步道**和炎热的沙漠**小径**"* — the EN contrast reproduced inside one sentence | **RETAIN** — 步道 = trail, 小径 = path |
| camping `野营` 4 | batch drift | **0 genuine occurrences.** 3 were substrings of `荒野营位`/`荒野营地`; the 4th was `背包野营` (a *backpacking* rendering, not a camping synonym) | **1 replacement** → `背包穿越` |
| fishing `垂钓` 22 | batch drift | Register/technique word. EN uses *angler/angling/jigging* at these sites; `垂直垂钓` (4) matches EN "vertical jigging" (4) exactly | **RETAIN** |
| byway `风景公路` 5 | batch drift | All 5 in **one file** that also uses `景观公路` 3×, twice in the same paragraph. Proper name is `Flaming Gorge–Uintas 景观公路` ~35× vs `风景公路` 1× | **SWEEP** → `景观公路` |
| byway `景观道路` 1 | batch drift | Renders EN *"paved scenic **road**"* at that site, not "byway" | **RETAIN** |
| vehicle `越野车` 81 | "may be deliberate" | **Not a UTV synonym.** 69 of 81 are the compound `并排越野车` = *"side-by-side"* — the same slot `de` fills 53× and `ja` 53×. The 12 bare uses are the generic category (*"我可以带上自己的越野车吗？"*) or render EN *"machine"* | **RETAIN** |

`背包野营` → `背包穿越` because the zh heading for the same EN pair
("Hiking and Backpacking") is already `## 徒步与背包穿越`; house terms are
`背包穿越` (26) and `背包徒步` (117).

**Lesson (reinforces C2/P19): never sweep a bare stem.** `野营`'s headline count
of 4 was 100% inflated — 3 substrings plus 1 unrelated sense. **New lesson:
check whether the "synonym" is a bound morpheme in a compound.** `越野车` looked
like an 81-occurrence competitor to `UTV`; 85% of it was the second half of
`并排越野车`, and cross-locale comparison (de 53 / ja 53) proved it fills the
"side-by-side" slot, not the "UTV" slot. **The EN master is the arbiter for
apparent synonym pairs** — three of the five rows were faithful renderings of a
distinction English itself draws.

Residual, out of C3's scope: EN *"machine"* renders as `车辆` / `车` / `越野车`
in the zh corpus. That is a separate 3-way slot, not a UTV question.

<details><summary>Original finding (kept for the record)</summary>

Each of these is a dominant term with a handful of stragglers. None is wrong in
isolation; the issue is that one corpus uses both.

| Concept | Dominant | Residue | Files affected |
|---|---|---|---|
| trail | `步道` 1,156 | `小径` 15 | 5 (4 hiking + 1 itinerary) |
| camping | `露营` 896 | `野营` 4 | 2 |
| fishing | `钓鱼` 773 | `垂钓` 22 | 10 |
| scenic byway | `景观公路` 215 | `风景公路` 5, `景观道路` 1 | 2 |
| the vehicle | `UTV` 676 | `越野车` 81 | 27 |

The last row is the only one that may be deliberate: `越野车` ("off-road
vehicle") could be functioning as a generic category term where `UTV` is the
product, in which case it stays. The other four look like batch drift.

Three words that are **not** residues and must not be swept:

- `指南` (79) is not a stray synonym for the house term `攻略` (1,226). 4 of the
  79 are `指南针` = *compass*, and the rest are generic "a guide/manual", mostly
  inside negative-definition sentences (`这是一份规划与决策指南，不是钓法技巧文章`).
- `导览` (378) means *guided* — 318 of them are `导览游` = *guided tour*. Different
  word, different meaning.
- `攻略` is the locked article-type term and is consistent.

> **Question C3:** Confirm the four drift rows normalise to the dominant term,
> and rule on whether `越野车` is a deliberate generic or should become `UTV`.

</details>

---

### C4. `恐龙之乡` vs `Dinosaur National Monument` — ✅ DECIDED 2026-07-25 (P21): **the split holds — RETAINED, zero edits**

> **✅ Decision: `恐龙之乡` is confirmed as the canonical Chinese destination
> identity and `Dinosaur National Monument` as the locked English place name. All
> 503 occurrences reviewed, **503 unchanged**, 0 replacements.** Verified:
> `astro check` 0 errors / 0 warnings · build **619 pages** · validator ✔ ·
> **0 content files changed**.
>
> **This is the third "leave it alone" decision of the review (after A3 and C2), and
> the first where the repository had already written the answer down.** The `zh`
> translation brief in [`src/lib/ui.ts:926`](src/lib/ui.ts#L926) locks *both sides
> of the split explicitly*:
>
> > `• LOCKED TERMS — Dinosaur Country → 恐龙之乡 (an established Chinese`
> > `  collocation for fossil country, not a coinage) …`
>
> and, twelve lines above it, locks the place name in the opposite direction — *"A
> place with NO established Chinese name stays English … Dinosaur National Monument
> / Dinosaur Monument."* C4 is therefore not an open question about intent; it is a
> check that the shipped corpus honours a lock it already recorded. **It does.**
>
> **Five independent lines of evidence:**
>
> 1. **No competing rendering of the identity exists.** 15 plausible alternatives
>    were counted (`恐龙之地`, `恐龙乐园`, `恐龙王国`, `恐龙之都`, `恐龙国度`,
>    `恐龙地区`, `恐龙圣地`, …). Every one is **0**. `恐龙之乡` is the sole form at
>    503 — unlike C3's `风景公路`/`景观公路`, there is nothing here to normalise.
> 2. **No unauthorised translation of the place name exists.** `恐龙国家纪念地`,
>    `恐龙国家公园`, `恐龙国家保护区`, `恐龙国家遗址`, `恐龙化石国家纪念地` — all
>    **0**. `zh` ships `Dinosaur National Monument` in Latin **514** times
>    (400 MDX + 114 inline).
> 3. **Line-aligned check against the English master: 0 true referent merges.** Every
>    `zh` line containing `恐龙之乡` was compared to the same line of its English
>    source. Only **2** lines carried the monument name without Title-Case
>    `Dinosaur Country` — and both are **false positives**: the English carries the
>    hyphenated attributive `dinosaur-country` (*"the full **dinosaur-country** trail
>    picture"*, *"**dinosaur-country** history"*), which a Title-Case-only scan
>    misses. The earlier C4 note's own paradigm was incomplete: the English master
>    uses `Dinosaur Country` 361 · `dinosaur-country` 11 prose (+12 in the
>    `romantic-weekend-dinosaur-country` slug) · `dinosaur country` 2.
> 4. **The split is maintained *inside single sentences*, 58 times.** 58 MDX lines
>    carry both terms at once, e.g.
>    [`family-hiking-near-vernal.zh.mdx:145`](src/content/hiking/family-hiking-near-vernal.zh.mdx#L145):
>    *"想看**恐龙之乡**完整的步道图景，见我们的 **Dinosaur National Monument** 最佳徒步路线攻略"*.
>    A corpus that merged the referents could not produce that line.
> 5. **The English master itself states the containment relation, and `zh` renders
>    it faithfully.** [`one-day-adventure-vernal.mdx`](src/content/itineraries/one-day-adventure-vernal.mdx)
>    reads *"**Dinosaur Country** packs **a national monument**, a guided
>    backcountry, two red-rock reservoirs … into one area"* → `zh`:
>    *"**恐龙之乡**在一块土地上塞进了**一座国家纪念区**、一片需要向导带队才能进入的荒野、两座红岩水库…"*.
>    The region contains the monument in both languages.
>
> **Every locale translates the identity and keeps the place name English — `zh` is
> not an outlier, it is unanimous.** This is the inverse of the A6/A4 shape, where
> German stood alone:
>
> | Locale | Destination identity | MDX | inline + `.ts` | **Total** | `Dinosaur National Monument` |
> |---|---|---|---|---|---|
> | `en` | `Dinosaur Country` | 361 | — | — | English |
> | `de` | `Land der Dinosaurier` | 321 | 129 | 450 | English |
> | `fr` | `Terre des Dinosaures` | 360 | 136 | 496 | English |
> | `es` | `Tierra de los Dinosaurios` | 356 | 131 | 487 | English |
> | `it` | `Terra dei Dinosauri` | 359 | 138 | 497 | English |
> | `pt` | `Terra dos Dinossauros` | 362 | 137 | 499 | English |
> | `ja` | `恐竜の国` | 364 | 133 | 497 | English |
> | `zh` | **`恐龙之乡`** | **365** | **138** | **503** | English |
>
> The MDX column is the tight one — 356–365 across all seven locales against the
> English master's 361 — which is what a faithful 1:1 rendering of the same source
> sentences looks like. **`de`'s low total (450) is not a `de` translation choice**:
> German additionally ships **18 untranslated English `Dinosaur Country`** in its MDX
> (`es` 3 + 2, `ja` 1 + 4, all other locales 0). That is a German residue of the A4/A6
> shape and is **out of P21's scope** — recorded here only because the cross-locale
> census surfaced it. *(Raised as A8 and **closed in P23**: all 18 normalised to
> `Land der Dinosaurier`, bringing `de`'s total to 461. See §A8.)*
>
> **On the ambiguity question — `恐龙之乡` cannot be read as the monument, and the
> corpus proves it grammatically.** The question asked whether a Chinese reader might
> take the identity for the place. Three measurements say no:
>
> | Test | Result |
> |---|---|
> | **Regional collocations** | `在恐龙之乡` (*in* DC) **51** · `整个恐龙之乡` (*the whole of* DC) **5** · `来恐龙之乡` (*come to* DC) **4** · `恐龙之乡的` (attributive) **78** |
> | **Site-specific collocations** — the ones a *monument* would take | `恐龙之乡门票` · `恐龙之乡游客中心` · `恐龙之乡入口` · `恐龙之乡开放` · `恐龙之乡内` — **all 0** |
> | **Script separation** | `恐龙之乡` is Hanzi; `Dinosaur National Monument` is Latin. The two referents are never confusable **on sight** — a disambiguation no Latin-script locale enjoys, since `Terra dei Dinosauri` and `Dinosaur National Monument` share an alphabet |
>
> `整个恐龙之乡` is the decisive one: *整个* ("the entirety of") is an areal quantifier
> that presupposes a region, and it is used 5 times. Meanwhile not one of the eight
> site-nouns a national monument attracts — tickets, visitor centre, entrance,
> opening hours — ever attaches to it.
>
> **The remedy C4 proposed already exists, and `zh` is the only locale that has it.**
> The question offered *"a qualifier on first use per page"* as the fix if the term
> were ambiguous. [`one-day-adventure-vernal.zh.mdx`](src/content/itineraries/one-day-adventure-vernal.zh.mdx)
> already glosses it geographically on first use — `恐龙之乡（犹他州东北部）`,
> *"Dinosaur Country (northeastern Utah)"* — where `de`/`fr`/`es`/`it`/`pt`/`ja` all
> render the identity bare at the identical line. The translator anticipated the
> concern. **Extending that gloss corpus-wide was considered and rejected**: it would
> add 500 parenthetical insertions to fix an ambiguity the collocation evidence shows
> does not exist, and would diverge from all six peer locales.
>
> **Occurrences by surface** (all 503):
>
> | Surface | Count |
> |---|---|
> | body prose (MDX) | 223 |
> | frontmatter metadata (incl. FAQ `q:`/`a:` pairs) | 83 |
> | inline `.astro` prose | 81 |
> | page summary | 37 |
> | heading | 36 |
> | image text (`alt` / figcaption) | 15 |
> | `page-content/*.ts` locale block | 13 |
> | structured data (JSON-LD) | 11 |
> | UI chrome (`ui.ts` `ZH` dict — 3 strings + 1 brief comment) | 4 |
>
> **Intentional exceptions — documented, not swept:** none required. There is no
> minority variant to retain or normalise; the term is uniform at 503/503. The one
> deliberate *addition* left in place is the single geographic gloss above.
>
> **`Dinosaur Monument` short-form: the earlier count of 4 does not survive
> re-measurement.** The form appears **0** times in *any* locale's MDX content. Its
> real home is UI chrome and page-content — `'nav.dinosaurMonument': 'Dinosaur Monument'`
> in [`ui.ts:940`](src/lib/ui.ts#L940) and the equivalent nav labels — where it is a
> deliberate short nav label, English in every locale including `zh`, and explicitly
> covered by the same `ui.ts` lock. Nothing to do.
>
> **One adjacent finding, deliberately NOT folded into C4 — registered as C8.** The
> *generic common noun* "a national monument" (lowercase, indefinite — not the place
> name) is rendered three ways in `zh`: `国家纪念地` **82** (21 files, the house
> standard), `国家保护区` **3** in this sense (3 files), `国家纪念区` **4** (1 file).
> That is single-file drift of the C2/C3 shape, but its referent is neither of C4's
> two terms, so sweeping it here would be exactly the scope creep the `越野车`
> "machine" item was kept out of C3 to avoid. See [§E](#e-post-review-opportunities--newly-discovered-editorial-items).

The original finding is preserved:

### C4 (original finding). Two referents that must not be merged

Two different referents that must not be merged: `恐龙之乡` (486) is the
regional/brand identity — *Dinosaurland*, the marketing name for the Vernal
area — and `Dinosaur National Monument` (514) is the official NPS place name,
glossary-locked to English in every locale. `恐龙国家纪念地` and `恐龙国家公园`
both appear **0** times, so no unauthorised translation of the place name exists.

| Hub | `恐龙之乡` | `Dinosaur National Monument` |
|---|---|---|
| itineraries | 128 | 97 |
| hiking | 120 | 191 |
| guides | 42 | 42 |
| scenic-drives | 30 | 16 |
| camping | 14 | 8 |
| fishing | 13 | 1 |
| utv | 11 | 0 |
| dinosaur-national-monument | 6 | 31 |
| things-to-do | 1 | 14 |

The distribution is the shape you'd want — the DNM hub itself skews heavily to
the official name, the region-wide planning hubs skew to the regional identity.
`Dinosaur Monument` (4) is a short-form of the official name and is the only
form worth a second look.

> **Question C4:** Confirm `恐龙之乡` reads as a *region/destination identity* to
> a Chinese reader and is not mistaken for the monument itself. If it is
> ambiguous, the fix is a qualifier on first use per page, not a global rename.

---

### C5. Typography — verified clean, with one do-not-fix trap

No decision needed here; recorded so the reviewer doesn't spend time on it, and
so the trap is not "fixed" by a later sweep.

Punctuation follows Simplified Chinese convention throughout: 20,310 `，` ·
14,735 `。` · 11,727 `、` · 1,846 `：` · 764 `？` · 114 matched `“”` pairs · 37
matched `《》` pairs. ASCII punctuation after a Han character is **0** for comma,
period, colon and semicolon in all prose. CJK/Latin spacing is applied
consistently — 5,569 `Han` + space + `Latin` and 7,336 `Latin` + space + `Han`,
against 4 unspaced (all inside one non-rendered code comment).

**⚠ Do not "fix" the 14 single em-dashes.** The corpus uses `——` (双破折号) 5,222
times as the sentence-level dash, correctly. Fourteen places use a *single* `—`,
which a regex would flag as inconsistent — but every one is a **连接号** joining a
range or compound, where a single dash is the correct form: `犹他州—怀俄明州`
(the Utah–Wyoming reciprocal fishing water) and `皮尼翁松—杜松林` (piñon–juniper
woodland). This is the Chinese counterpart of the German nominalised-infinitive
trap in A2 — the reason these passes need a human and not a script.

Three items are engineering polish rather than language, and are not questions for
the reviewer:

- [`zh/things-to-do/best-restaurants-vernal-utah.astro:176`](src/pages/zh/things-to-do/best-restaurants-vernal-utah.astro#L176)
  is the *only* source of ASCII commas after Han characters in the whole `zh`
  corpus (5 of them) — and it is a `<meta name="keywords">` list, where
  comma-separation is the correct convention. Not a defect. Recorded so a future
  scan doesn't "fix" it.

- [`zh/things-to-do/best-restaurants-vernal-utah.astro:122`](src/pages/zh/things-to-do/best-restaurants-vernal-utah.astro#L122)
  — 5 JSON-LD `FAQPage` question strings end in ASCII `?` where the visible page
  uses `？`. Surfaces in rich results, so worth aligning.
- [`zh/camping/index.astro`](src/pages/zh/camping/index.astro) and
  [`zh/fishing/index.astro`](src/pages/zh/fishing/index.astro) still carry
  Japanese-language `//` code comments left over from mirroring the `ja`
  rollout, plus 11 `/ja/` provenance comments across the locale. None render.

---

### C6. Duplicated `请` before the caveat — ✅ DECIDED & FULLY APPLIED 2026-07-25

> **✅ OWNER POLICY DECISION (2026-07-25) — the caveat is locked by INTENT, not by
> byte sequence.**
>
> The lock is no longer defined as the exact string `请向官方渠道核实`. It is defined
> as an **editorial intent**:
>
> > *"Direct the reader to verify the information through official channels."*
>
> Minor grammatical adaptation is permitted — required, even — where the exact
> string would produce unnatural Chinese. All of these satisfy the lock:
>
> ```
> ✅ 请向官方渠道核实。
> ✅ 详情请向官方渠道核实。
> ✅ 预订前，请向官方渠道核实。
> ✅ 请致电，并向官方渠道核实。
> ```
>
> **Rationale: natural, grammatical Chinese outranks byte-for-byte uniformity.**
> Standardise where possible; do not sacrifice correctness for mechanical
> uniformity.
>
> **This policy formalised what the corpus already did.** A prefix census of all
> 994 disclaimer instances found the "962-instance lock" was never byte-uniform —
> it already carried dozens of grammatical adaptations, including 16 with no `请`
> at all (`>向官方渠道核实`), plus `一定要向官方渠道核实`, `都要向官方渠道核实`, and
> `请始终向官方渠道核实`. The policy documents reality rather than loosening a rule.

**What was found and fixed.** The defect class was **twice as large as first
reported.** The caveat had been mechanically appended to heterogeneous sentence
openings, producing three distinct seam defects — **27 instances across 13 files**
(1 fixed earlier with C1, 26 in this pass):

| Seam | Shape | Count | Fix applied |
|---|---|---|---|
| `请…请向` | `请在预订时请向官方渠道核实` — two `请` inside one clause, no boundary | 14 | drop the redundant `请` → `请在预订时向官方渠道核实` |
| `并请向` | `请查看最新预报，并请向官方渠道核实` — `并` coordinating straight into a second `请` | 12 | `并请向` → `并向`, matching the endorsed `请致电，并向官方渠道核实` |
| `先请向` | `…算进计划前先请向官方渠道核实` | 1 | `先请向` → `先向` |

**All 27 are resolved** (the 14th `请…请向` was the C1 instance, fixed earlier).

**Conservation check — the disclaimer was never dropped, only adapted:**

| | Before | After |
|---|---|---|
| `官方渠道核实` (total instances) | **994** | **994** ✔ |
| `请向官方渠道核实` | 962 | 936 |
| `并向官方渠道核实` | 4 | 16 |
| `或向官方渠道核实` | 0 | 1 |
| `先向官方渠道核实` | 0 | 1 |
| `请…请向` / `并请向` / `先请向` seams | 27 | **0** ✔ |

Verified: `astro check` 0 errors / 0 warnings · build **619 pages** · validator ✔
links resolve, no orphans · `您` 0 · `——` 5,222 · 14 `连接号` intact.

**Category B — the three that needed individual rewrites**, per the policy's
exceptions clause:

| Shipped | Rewritten | Why it was not mechanical |
|---|---|---|
| `预订前请致电请向官方渠道核实` | `预订前请致电，并向官方渠道核实` | two clauses collapsed into one verb phrase |
| `请尽早预订并请向官方渠道核实` | `请尽早预订，并向官方渠道核实` | the *second* `请` was the one to drop |
| `请直接向我们请向官方渠道核实` | `请直接联系我们，或向官方渠道核实` | two competing `向` targets (*us* vs *official channels*); `联系` resolves the first so the caveat survives intact |

**Five `请…请向` hits remain by design and must not be "fixed".** They are
grammatical `请A，请B` coordinate clauses — each `请` governs its own clause across
a comma boundary, which is standard polite Chinese:

```
请尽早预订住宿，空房情况请向官方渠道核实
请查询当前的道路、天气和山口通行情况，请向官方渠道核实
请尽早预订，并在指望某个具体营位之前请向官方渠道核实
请尽早预订，并在把某个营位算进计划前请向官方渠道核实
请尽早预订住宿，并就空房情况请向官方渠道核实
```

The defect was never "two `请` in a sentence" — it was **two `请` inside one clause
with no boundary between them.** A future scan must encode that distinction or it
will flag these five.

---

<details>
<summary>Original finding, preserved for the record</summary>

Surfaced while applying the C1 grammar fix. The wildflower instance was **not**
isolated: the caveat `请向官方渠道核实` was mechanically appended to
sentences that already opened with `请`, producing `请…请向官方渠道核实` — *please …
please verify with official channels* — in 14 places. One was fixed with C1; 13
remained at the time of the report, and 13 more `并请向`/`先请向` instances were
found afterwards.

| File | Lines | Shipped text |
|---|---|---|
| `utv/beginners-guide-to-utv-tours-vernal.zh.mdx` | 23 | `请在来电时请向官方渠道核实` |
| ″ | 31, 112 | `请在预订前致电请向官方渠道核实` |
| ″ | 33, 174 | `请在预订时请向官方渠道核实` |
| `hiking/wildflower-hiking-near-vernal.zh.mdx` | 18 | `请就当前状况与通行情况请向官方渠道核实` |
| ″ | 22, 30 | `请就当前状况请向官方渠道核实` |
| ″ | 28 | `请就你要去徒步的地方请向官方渠道核实` |
| `itineraries/weekend-road-trip-from-grand-junction.zh.mdx` | 41 | `请针对你的具体日期请向官方渠道核实` |
| `itineraries/romantic-weekend-dinosaur-country.zh.mdx` | 25 | `请尽早预订并请向官方渠道核实` |
| `utv/family-utv-guide-vernal.zh.mdx` | 136 | `请致电请向官方渠道核实` |
| ″ | 178 | `请直接向我们请向官方渠道核实` |

They did not all take the same fix, which is what made this a policy decision
rather than a sweep: ten were mechanical, three needed individual rewrites, and
resolving them required deciding whether the caveat was locked by string or by
intent. The owner chose intent — see the decision block above.

</details>

---

## D. Out of scope here, but open

Recorded so the reviewer knows what this document deliberately does *not* cover:

- **`es` and `it` have never had a native review.** They now carry
  `i18n-es-complete` / `i18n-it-complete`, but those are **retroactive** markers
  created 2026-07-25 from structural evidence, not contemporaneous release gates
  (see `MULTILINGUAL_HANDOFF.md` §1). Their own flagged terms
  are listed in the phase notes — Spanish: `berrendo`, `borrego cimarrón`,
  `apartadero`, `calamina`, `slickrock`, and `lubina`/`lobina` for bass;
  Italian: `pecora bighorn`, `antilocapra`, `pioppo tremulo`, `peak-bagger`,
  `distretto forestale` vs `dei ranger`, `traina`, `black bass`, and `trailhead`
  vs `inizio del sentiero`.
- ~~**~820 internal links outside MDX bodies still resolve to English routes.**~~
  **RESOLVED** — closed by P11.1 (2026-07-22, all locales) and Z5 (2026-07-25,
  `zh`). Gate 4d now reports 0 route downgrades in every locale. Only 354
  intentional author-bio links remain at English roots by design.
- **RTL is not in scope anywhere in this document.** Arabic and any other
  right-to-left locale is a separate engineering initiative
  (`MULTILINGUAL_HANDOFF.md` §10), not an extension of this review.

---

## E. Post-Review Opportunities — newly discovered editorial items

**These were not overlooked in the original review plan. Every one was surfaced by a
census run while applying an accepted decision**, because this review counts every
form of a term rather than grepping for the pattern it expects. They are recorded
here so the original queue (A1–A6, B1–B2, C1–C6) stays intact as scoped, and these
improvements get a proper home instead of reading as gaps in the initial planning.

**None of them is authorised.** Each is an owner decision, sequenced *after* the
planned queue.

| Item | Locale | Subject | Raised by | Size | State |
|---|---|---|---|---|---|
| ~~**C7**~~ | `zh` | caveat seams survive behind inline markup | P19 (C2 census) | **326 sites / 44 files** | ✅ **applied P26** — 326 swept, 28 held as C9 |
| ~~**C9**~~ | `zh` | `都`/`务必`/`始终`/`也` + `请向` — seam shapes with no C6 precedent | P26 (C7 sweep) | 28 sites | ✅ **closed P27 — kept, 0 edits** |
| **D1** | *all 7* | home-page carousel ships English `alt` + captions in every locale | P22 (A7 census) | 106 slides × 7 locales | ⬜ **open — the only remaining item** |
| ~~**A7**~~ | `de` | `Trailhead` (42) vs the established `Ausgangspunkt` (235) | P17 (A4 census) | 42 sites | ✅ **applied P22** — 41 replaced, 1 exception |
| ~~**B3**~~ | `ja` | `Salt Lake City` split — Latin 129 vs `ソルトレイクシティ` 34 | P18 (B1 census) | 34 sites | ✅ **applied P24** — 34 replaced, 0 exceptions |
| ~~**B4**~~ | `ja` | ~14 untranslated English anchor texts on `/ja/` links | P18 (B1 census) | **57 sites / 8 files** (recorded ~14; 652 candidates, 597 correct) | ✅ **applied P25** — 57 localized, 597 proper nouns retained |
| ~~**C8**~~ | `zh` | generic *"a national monument"* rendered 3 ways | P21 (C4 census) | **113 sites / 9 files** (recorded 7/4) | ✅ **applied P27** — normalised to `纪念地` |
| ~~**A8**~~ | `de` | 18 untranslated English `Dinosaur Country` in `de` MDX | P21 (C4 census) | 18 sites | ✅ **applied P23** — 18 replaced, 0 exceptions |

### C8. The generic common noun *"a national monument"* has three `zh` renderings — ✅ DECIDED & APPLIED 2026-07-25 (P27)

**Applied: 113 sites across 9 files, normalised to the house standard `纪念地`.**

**The recorded size of 7 sites / 4 files was low by 16×.** The census had counted only
the `国家`-prefixed **attributive** form (`国家保护区` 3, `国家纪念区` 4) and never
looked at the bare **anaphoric** form the same files use for *"the monument"*. Both
forms are the same lexeme in the same sense; only the syntactic slot differs. Scoped
properly:

| Rendering | Attributive `国家X` | Anaphoric bare `X` | Total | Files |
|---|---|---|---|---|
| `纪念地` — **house standard** | 82 | 301 | **383** | 29 |
| `保护区` — drift | 8 (recorded as 3) | 57 (not counted) | **65** | 6 |
| `纪念区` — drift | 4 | 44 (not counted) | **48** | 3 |

**Four independent lines of evidence say normalise, not retain.**

1. **The partition is by file, not by sense.** No file mixes two renderings. Every file
   is exclusively a `纪念地` file, a `保护区` file, or a `纪念区` file — the signature
   of translation-batch inheritance, not of a semantic distinction an author drew.
2. **Per-file `en`↔`zh` count alignment holds in every file, for every rendering.**
   `best-hikes-in-dinosaur-national-monument` EN 23 / `保护区` 24 · `fall-hiking` EN 5 /
   `保护区` 7 · control `visiting-dinosaur-national-monument` EN 46 / `纪念地` 49 ·
   `family-hiking` EN 7 / `纪念地` 7. Same slot, same density, different word.
3. **No comparison locale preserves a distinction.** `de` *Monument* · `fr` *monument* ·
   `es`/`it`/`pt` *monumento* — each locale uses exactly **one** anaphoric noun. There is
   no distinction here for `zh` to be preserving.
4. **`保护区` is not merely inconsistent, it is wrong.** It means *protected area /
   reserve* — a different NPS designation (National Preserve, National Conservation
   Area). `纪念区` is not a designation at all. `国家纪念地` is the standard Chinese for
   a US National Monument and is already 77% of the corpus.

**Answering the two questions as posed.** The 3 `国家保护区` sites *do* render EN
*"national parks and monuments"* — but the pair is already built in `zh` as
`国家公园和X`, so the correct fix is the one-word swap, not a re-rendering:
`国家公园和国家纪念地`. Two further sites in the same file wrote the second element
without `国家` (`国家公园与保护区`); those were raised to `国家公园与国家纪念地` to match
their three siblings. **These 2 are the only sites where anything but the noun changed,
and they are the sweep's only documented exception.**

**C4 is untouched.** All 96 resulting `国家纪念地` are the generic common noun; zero are
proper names. `Dinosaur National Monument` remains locked English at 514, `恐龙之乡`
locked Chinese at 503.

**Verification.**

| Check | Result |
|---|---|
| `纪念地` total | 383 → **496** (= 383 + 113, exact) |
| `国家纪念地` | 82 → **96** (= 82 + 8 + 4 + 2 pair-form upgrades, exact) |
| `纪念区` | 48 → **0** |
| `保护区` | 70 → **5** — the 5 survivors are all `荒野保护区` = *wilderness area*, a genuine and different referent, in 4 files outside the sweep |
| C7 core `官方渠道核实` conserved | **994 → 994** |
| Reverse-transform: collapse all four renderings to one token on both sides of the diff | **identical in 8 of 9 files**; the 9th differs at exactly the 2 documented pair-form sites and nowhere else |
| Multi-locale `.ts` files stayed in the `ZH` block | `things-to-do.ts` edits 2111–2346 (block opens 2093) · `faq.ts` edit 2427 (block opens 2278) |
| English master and 6 other locales | **unchanged** — `dist/de`, `dist/ja`, `dist/fr` contain 0 `纪念地` |
| Rendered `dist/zh` monument-sense `保护区` / `纪念区` | **0 / 0** across 77 pages (10 `保护区` remain, all `荒野保护区`) |
| `zh` routes · schema · components | 77 · unchanged · 0 files touched |
| `astro check` · build · validator | 0/0 · 619 pages · ✔ |

---

*Original finding, retained for the record:*

### C8 (original finding). The generic common noun *"a national monument"* has three `zh` renderings

Not to be confused with C4, which is closed. C4 governs the **proper name**
`Dinosaur National Monument` (locked English, 514 occurrences, 0 translations) and
the **destination identity** `恐龙之乡` (locked Chinese, 503, uniform). C8 is the
third thing: the lowercase, indefinite **common noun** the English master uses in
sentences like *"Dinosaur Country packs **a national monument** … into one area"*
and *"**national parks and monuments** — including Dinosaur National Monument"*.

| Rendering | Count (generic sense) | Files | Note |
|---|---|---|---|
| `国家纪念地` | 82 | 21 | **the house standard** |
| `国家保护区` | 3 | 3 | renders *"national parks and monuments"*; 保护区 = *preserve/reserve*, a different NPS designation |
| `国家纪念区` | 4 | 1 — [`one-day-adventure-vernal.zh.mdx`](src/content/itineraries/one-day-adventure-vernal.zh.mdx) | single-file drift, the C2/C3 shape |

Weighed against a sweep: all three are comprehensible and none is *wrong* in
isolation, so this is a consistency question rather than a defect. `国家保护区`
additionally needs a per-site judgement — if the English at that line really is
*"parks and monuments"* as a pair, the right fix may be `国家公园和国家纪念地`
rather than a one-word swap.

> **Question C8:** Normalise the 7 minority renderings to the house standard
> `国家纪念地`, or leave the generic noun free to vary? If normalising, confirm the
> 3 `国家保护区` sites should become `国家纪念地` rather than being re-rendered as
> the *"parks and monuments"* pair.

*Not applied in P21.* C4 was scoped to the identity/place-name split; this is a
separate lexeme, and folding it in would repeat the scope creep the `越野车`
"machine" item was deliberately kept out of C3 to avoid.

### C7. The caveat seam fix is clean in plain text but not as rendered — ✅ DECIDED & APPLIED 2026-07-25 (P26)

**Applied: 326 sites across 44 files. One `请` deleted per site, nothing else.**
Content landed in `6b1dc49`.

**The recorded size of 249 was low.** That figure came from a fixed ≤10-character
window before the locked phrase. Scoped properly — *any* redundant `请` in the same
clause, with the clause boundary set to `，` alone — the real count is **326**:

| Shape | Count | C6 precedent | Fix |
|---|---|---|---|
| `请…请向` in one clause, the two adjacent | **179** | shape-1 | delete the **outer prose** `请` — lock stays byte-intact |
| `请…请向` in one clause, separated by prose | **137** | shape-1 | delete the **lock's** `请` (C6-endorsed `请向`→`向`) |
| `并请向` | **9** | shape-2 | delete the lock's `请` |
| `先请向` | **1** | shape-3 | delete the lock's `请` |

Two measurement traps were found and corrected while scoping this, both of which
would have produced wrong edits:

1. **`、` is an enumeration comma, not a clause boundary**, and **inline phone numbers
   contain ASCII parens**. Treating either as a boundary hid real shape-1 seams in the
   "grammatically licensed" bucket — e.g. `预订前请拨打(435)219-9447请向官方渠道核实`
   is a genuine double imperative, not a `请A，请B` coordinate pair.
2. **`请` is a bound morpheme in `申请`/`邀请`/`请求`** and a plain verb meaning *to
   hire* in `请向导`. Both were censused before any edit — the corpus has **zero** of
   either near the caveat, so all 326 prior `请` are true polite imperatives. Had
   `申请许可证` appeared in one of these clauses, a naive sweep would have deleted the
   wrong character.

**Correction to the C7 finding as first recorded.** The line *"same scan, plain text
only = 0"* was an artifact of the narrower character class. With the ≤10-char class,
plain text already showed **199** — `<strong>` is only 8 characters, so it fits inside
the window. The conclusion is unchanged and the corollary still holds (stripping
markup is what surfaces the remaining ~127), but the plain-text figure was never 0.

**Verification.**

| Check | Result |
|---|---|
| Core `官方渠道核实` conserved | **994 → 994** |
| Reverse-transform: strip all `请` from both sides of the diff | **identical** — no character other than `请` changed at any of the 326 sites |
| Rendered `dist/zh` shape-1/2/3 seams | **0** across 77 pages |
| …including JSON-LD blocks and `<meta>` attributes | **0** |
| Licensed `请A，请B` clause-boundary cases | preserved (25 → 30, five more created by the adjacent-form fix) |
| `astro check` · build · validator | 0/0 · 619 pages · ✔ |

**28 sites were deliberately NOT swept — they are new item C9.**

> **Question C9:** `都请向官方渠道核实` (20), `务必请向…` (6), `始终请向…` (1),
> `也请向…` (1). None has C6 precedent, and in all 28 the locked `请` is the **only**
> imperative in its sentence — so deleting it would remove politeness rather than
> remove redundancy, which is not the C6 defect. **Recommendation: keep all 28.**
> Two of the 20 `都请向` were created *by* this sweep: they were `都请请向` (a genuine
> double), correctly reduced to the single form.

### C9. The 28 held imperative shapes — ✅ DECIDED 2026-07-25 (P27), RETAINED, 0 edits

**Owner decision: keep all 28. C9 is resolved by review; no edit was required.**

The 28 are **not** another instance of C6/C7, and the distinction is structural rather
than stylistic:

| | Shape | What the second `请` does | Effect of deleting it |
|---|---|---|---|
| **C6 / C7** | `请…请向` — a *duplicated* imperative | nothing — the first `请` already carries it | removes redundancy; **meaning preserved** |
| **C9** | `都请向` / `务必请向` / `始终请向` / `也请向` — a *single* imperative with an adverb | it is the **only** imperative in the sentence; the adverb modifies it but cannot replace it | removes politeness and imperative force; **register changes** |

Deleting a `请` is only ever licensed when a second one survives to carry the imperative.
In all 28 of these, none does. The defect C6 and C7 fixed is therefore absent here, and
applying their fix would introduce a new one.

This closes the fifth item in the programme to be **resolved by review rather than by
edit** — joining **A3** (`Piste` retained, 239 of 251), **C2** (`登山口` retained, 230 of
232), **C3** (4 of 5 "residues" were real distinctions) and **C4** (503 of 503 kept). In
each, measurement showed the translator had been right and the suspicion wrong. That
outcome is a result, not a null result: the programme's main product is reduced
uncertainty, and a documented *keep* is as durable as a sweep.

### Machine terminology (`车辆` / `车` / `越野车`) — ✅ ASSESSED 2026-07-25 (P27), FOLDED AND CLOSED, 0 edits

The P26 fold rule was *"folds into C8 if ≤20 corpus decisions remain."* **It folds — and
the count is 0.** Not "small enough to do here": there is nothing to decide.

Re-reading the P20 census with the C8 window correction first (P20 measured `.zh.mdx`
only; the corpus-wide figures are `越野车` 108 / `并排越野车` 90, not 81 / 69):

- **The `越野车` row is already closed and stays closed.** 90 of 108 are the compound
  `并排越野车` = *side-by-side*, and all 18 bare uses are the generic category read —
  *"自己的越野车"* (bring your own), *"从没开过越野车"* (never driven one), *"只有越野车
  才能抵达"* (only reachable by one). Zero displace the locked product term.
- **The locked term is conserved 1:1.** Per-file EN `UTV` ↔ `zh` `UTV`: 17↔17, 23↔23,
  13↔11. There is no term-lock violation anywhere in the slot.
- **The live residual — EN *"machine"* — has no enumerable Chinese target.** English uses
  *machine* as an informal register variant of *UTV* (219 times across the `.mdx`
  masters). Chinese has no informal one-word equivalent, so `zh` fills the slot with
  `车辆` where a noun is needed and lets `UTV` absorb the rest.
- **Two shipped locales already do exactly this.** In `best-utv-trails-vernal`, the 9 EN
  *machine* slots are filled by a cognate in `de` (9), `fr` (8), `es` (9) and `pt` (9) —
  and by **nothing at all** in `it` (0) and `ja` (0), both of which collapse the word into
  `UTV`, exactly as `zh` does. Both are finished, tagged, released locales.

So the corpus contains **two legitimate strategies for this slot, not a correct one and a
drifted one**, and `zh` follows the same strategy as Italian and Japanese. Normalising
would mean picking a winner between two shipped conventions on 219 per-sentence register
judgements with no repository evidence favouring either.

This is the P26.5 governing rule applied to a candidate phase rather than to a gate:
**decide only where the correct value is enumerable.** It is not enumerable here, so the
item closes by review. **No P28.** With C8 and C9 closed alongside it, the editorial
programme is finished; everything remaining is architectural (D1) or automation (the
Localization Regression Framework).

---

*Original finding, retained for the record:*

### C7 (original finding). The caveat seam fix is clean in plain text but not as rendered

**This is a genuine gap in closed item C6, not a new preference.** C6 fixed 27 seam
defects and verified `请…请向` / `并请向` / `先请向` at **0**. That verification is
correct — but only against *plain text*. The corpus wraps the caveat in inline markup,
and the scan could not see through it.

Strip `<strong>`, `</strong>` and `**` — i.e. read the corpus **as it renders** — and
the seam count is not 0:

| Rendered form | Count | Source shape |
|---|---|---|
| `请请向官方渠道核实` | **179** | `请<strong>请向官方渠道核实</strong>` |
| `请务必请向官方渠道核实` | **16** | `请务必<strong>请向官方渠道核实</strong>` |
| `请就当前状况请向官方渠道核实` | 5 | plain-text residue |
| ~20 further one- and two-off variants | ~49 | mixed |
| **Total rendered seams** | **249** | across 28+ files |
| *Same scan, plain text only (what C6 ran)* | **0** | — |

A real example —
[`camping-in-ashley-national-forest.zh.mdx`](src/content/camping/camping-in-ashley-national-forest.zh.mdx):

```
source:   …可饮用水情况和预订状态 —— 请<strong>请向官方渠道核实</strong>（美国林务局…）
renders:  …可饮用水情况和预订状态 —— 请请向官方渠道核实（美国林务局…）
```

That is precisely C6's defect class: **two `请` inside one clause with no boundary
between them.** The five grammatical `请A，请B` coordinate clauses C6 protected are
*not* in this count — the scan excludes any match containing a clause boundary, so
they remain correctly out of scope.

**This is exactly what Gate 4e was written for, one level deeper.** Gate 4e says to
grep the *join seam* of a locked phrase, not just the phrase. C7 adds the corollary:
**the seam must be measured on the rendered text, not the source text** — inline
markup sits inside the seam and hides it from every plain-text scan.

> **Question C7:** Authorise a corpus-wide sweep dropping the redundant leading `请`
> where it is immediately followed by the locked caveat across markup? Per the C6
> policy the caveat is locked by **intent, not bytes**, so `…—— <strong>请向官方渠道
> 核实</strong>` and `请务必<strong>向官方渠道核实</strong>` both satisfy the lock —
> but which of the two shapes is preferred is an editorial call, and the 16
> `请务必` instances may want the opposite fix from the 179 bare ones.

*Not applied in P19.* C2 was scoped to `登山口`; this is the caveat phrase, it belongs
to a closed item, and at 249 sites it needs its own phase and its own verification
pass. Nothing here blocks C2's closure — the C2 change does not touch the caveat, and
the Gate 4e conservation check (`官方渠道核实` = 994) passed unchanged.

### D1. The home-page carousel ships English `alt` text and captions in all seven locales

Surfaced by the A7 census, which swept every German surface rather than only the MDX
spokes. [`src/page-content/home.ts`](src/page-content/home.ts) holds one locale block
per language (`bodyHtml` = `en`, then `ES` `IT` `PT` `FR` `DE` `JA` `ZH`). Each block
carries a **106-slide** image carousel, and in every block the carousel is
**byte-identical to the English one** — verified by diffing the `carousel-slide` lines
of each locale block against the English block: all seven match exactly.

So every non-English home page ships English `alt` text (*"Doc's Beach trailhead sign
on an Adventure Tours Vernal UTV tour near Vernal Utah"*, *"Side-by-side UTV on a
steep slickrock descent near Vernal Utah"*) and English visible captions (*"Steep
Slickrock Descent"*, *"Tackling the Rut"*, *"Fleet at the Hilltop"*).

This is **not** a terminology question and it is not German-specific — it is the same
class as the Gate 4a rendered-output English scan, one level below the surfaces that
gate checks. It touches `ja` and `zh`, so it is out of scope for any German item.

Weighed: the captions are **visible page text**, which makes this higher-impact than
its "alt text" description suggests; against that, 106 slides × 7 locales = **742
strings**, so it needs its own phase and its own conservation check, and the slide
markup is duplicated wholesale rather than authored per locale, which may mean the
carousel is generated and should be fixed at its source instead of in the blocks.

> **Question D1:** Localise the carousel `alt` text and captions across all seven
> locale blocks, or accept English media descriptions on non-English home pages? If
> localising, confirm whether the blocks are the right place to fix it or whether the
> carousel should be factored out of `home.ts` first — the latter is an engineering
> change, not an editorial one.

*Not applied in P22.* A7 was scoped to German `Trailhead`; this is a seven-locale
untranslated-block defect, and the stop conditions for P22 forbid touching `ja`/`zh`.
Nothing here blocks A7's closure — the German `Trailhead` in this file is recorded as
A7's second documented exception.

### B3 — `Salt Lake City` ✅ decided and applied (P24)

**Decision: Latin `Salt Lake City`.** 34 katakana occurrences across 23 files replaced;
**0 intentional exceptions retained.** Corpus after the sweep: Latin **163** source
occurrences, katakana **0**; rendered `dist/ja` **287 Latin / 0 katakana** across 77 pages.

**Why the evidence was decisive.** The `ja` corpus localises exactly *one* city name.
Every other city is Latin with a **uniform** count — and `Salt Lake City` was the sole split:

| Place | Latin in `ja` | Transliterated in `ja` |
|---|---|---|
| Vernal | (proper compounds only) | `バーナル` **2084** — the one localised city |
| Denver | **89** | `デンバー` 0 |
| Moab | **72** | `モアブ` 0 *(after B1)* |
| Grand Junction | **66** | `グランドジャンクション` 0 |
| Heber City | **11** | `ヒーバーシティ` 0 |
| **Salt Lake City** | **129** | **`ソルトレイクシティ` 34** ← the only split |

Three independent authorities all pointed the same way: the gateway page
[`ja/from/salt-lake-city.astro`](src/pages/ja/from/salt-lake-city.astro) — whose entire
subject is the city — uses Latin in its `title`, `description`, `<h1>` and breadcrumb;
the `ja` UI-chrome dictionary uses `'Salt Lake Cityからお越しの方'`
([`src/lib/ui.ts:830`](src/lib/ui.ts#L830)); and the two forms occurred in **byte-identical
sentence frames** in sibling files (`ソルトレイクシティからバーナルへのガイド` in
`camping-at-flaming-gorge.ja.mdx:236` against `Salt Lake Cityからバーナルへのガイド` in
`alpine-lakes-hiking-high-uintas.ja.mdx:348`). That last point is what makes this drift
rather than register: no editorial distinction separated the two sets.

Cross-locale check confirms the *policy*, not merely the form: `de`/`fr`/`es`/`it`/`pt`
all keep Latin (161–164 each), and `zh` is **uniformly** localised (`盐湖城`) at *exactly*
the union of the two `ja` sets — i.e. every locale is internally consistent except `ja`.

**Classification of the 34 sites** — no JSON-LD, `alt` text, component props or page
metadata was affected (those were already Latin):

| Class | Count |
|---|---|
| Link anchor text inside `<a href="/ja/from/salt-lake-city/">` | 24 |
| FAQ `q`/`a` in frontmatter | 3 |
| Body prose | 3 |
| Quoted guide title (non-link) | 1 |
| Hidden `page-summary` paragraph | 1 |
| `article-summary-box` | 1 |
| HTML table cell (`<td>`) | 1 |

**One form-change, not a straight swap.** Two of the 34 were the hybrid compound
`ソルトレイクシティ国際空港`. These became **`Salt Lake City International Airport`**, the
proper name used by the gateway page, by `cities/salt-lake-city.json` (`nearestAirport`)
and by `de`/`es`/`fr`/`it` at the *same two lines* of the same file — not the mechanical
`Salt Lake City国際空港` that a blind substitution would have produced. Verified by
reverse-transform: undoing both rules restores `HEAD` byte-for-byte in all 23 files.

### B4 — English anchor text ✅ decided and applied (P25)

> **✅ Applied: descriptive English anchor text is localized; locked proper nouns stay
> Latin. 57 replacements across 8 files; 597 English anchors deliberately retained.**
> Verified: `astro check` 0 errors / 0 warnings · build **619 pages** · validator ✔ ·
> rendered `dist/ja` contains **0** of the 57 strings as anchor text · reverse-transform
> restores `HEAD` byte-for-byte in all 8 files · no other locale touched.

**The census was 4× the estimate, and it split cleanly in two.** The note below guessed
"~14". The real figure is **652** `/ja/` links whose visible anchor text contains no
CJK — but **597 of them are correct**, because the `ja` place-name policy keeps every
proper noun Latin. Only **55** were descriptive English phrases, plus **2 hybrids**
that a CJK filter cannot see (below). The canonical policy is therefore *not*
"localize English anchors" but:

> **Anchor text follows the same rule as body prose: proper nouns stay Latin, everything
> else is Japanese.** An article title is not a proper noun — every `ja` target page
> carries a Japanese `title`, so an English title in anchor text cites nothing.

| Class | Occurrences | Action |
|---|---|---|
| Locked proper nouns (`Dinosaur National Monument` 108, `Flaming Gorge` 92, `Red Fleet` 80, `Ashley National Forest` 70, `High Uintas` 45, `Steinaker` 42, + 25 more) | **597** | **retained** |
| Descriptive phrases / article titles | **55** | localized |
| Hybrid — English title with a Japanese suffix | **2** | localized |

**Three independent authorities agreed, as in B3.**

1. **`ja`'s own corpus already answers every case.** Each destination carrying an
   English anchor also carries a dominant Japanese one — the English is the minority
   residue, which is what drift looks like:

   | Destination | English anchors | Japanese anchors already shipped |
   |---|---|---|
   | `/guides/what-to-bring/` | 4 | **93** (`持ち物ガイド` 89) |
   | `/guides/vernal-weather-guide/` | 5 | **90** (`バーナル天候ガイド` 35) |
   | `/scenic-drives/` | 3 | **85** (`絶景ドライブ` 53) |
   | `/things-to-do/` | 3 | **70** (`バーナルで楽しめること` 17) |
   | `/hiking/family-hiking-near-vernal/` | 1 | **27** |
   | `/from/salt-lake-city/` | 2 | **51** (`Salt Lake Cityからバーナルへのガイド` 31) |

2. **Every peer locale localizes these same anchors** at the identical lines, while
   keeping the proper nouns — `fr` *guide météo de Vernal*, `es` *guía de qué llevar*,
   `it` *cose da fare a Vernal*, `pt` *estradas panorâmicas*, `zh` `携带物品攻略`.
3. **The target pages have Japanese titles.** `Flaming Gorge完全ガイド`,
   `バーナル天候ガイド`… so `Ultimate Guide to Flaming Gorge` was citing a title that
   does not exist in `ja`.

**The drift was often intra-file, the A8 signature.**
[`kings-peak-hiking-guide.ja.mdx:41`](src/content/hiking/kings-peak-hiking-guide.ja.mdx#L41)
keeps the proper noun `High Uintas Wilderness` and the English article title
`Ultimate Guide to Ashley National Forest` **in the same sentence** of otherwise fully
Japanese prose. Likewise `green-river-fly-fishing.ja.mdx` carried
`Fishing Flaming Gorgeガイド` at L49 and bare `Fishing Flaming Gorge` at L69/L89.

**Every target form was recovered from the corpus, never invented** — the A5/A7 method.
`Ultimate Guide to X` → `X完全ガイド` (attested 14/12/9), the plain `X guide` →
`Xガイド` (18), `destination guide` → `X目的地ガイド` — so English's own
ultimate/destination/plain distinction survives rather than being flattened.

**Classification of the 57 sites:**

| Class | Count |
|---|---|
| Inline content link (body prose) | 42 |
| Related-content / "related guides" run | 9 |
| Summary box (`article-summary-box`) | 3 |
| Page summary / pillar cross-reference | 3 |
| Navigation link · CTA · FAQ | **0** |

Nothing reached a heading, so **no anchor ID regenerated**; nothing reached frontmatter,
JSON-LD, `alt` text or a CTA. 23 of the 57 are in one file,
[`photography-hikes-near-vernal.ja.mdx`](src/content/hiking/photography-hikes-near-vernal.ja.mdx) —
concentration, not spread, exactly as in A7.

**Two hybrids swept, on the Gate 4e principle that a locked phrase is intent, not bytes.**
`Fishing Flaming Gorgeガイド` and `Scenic Drivesのまとめページ` contain CJK, so a
naive scan reads them as localized; their English *core* is an untranslated title and
hub name. Leaving them would have left `green-river-fly-fishing.ja.mdx` inconsistent
with its own L69/L89 — the drift this item exists to remove.

**Intentional exceptions — documented, not swept:**
- **All 597 proper-noun anchors**, per the `ja` place-name rule ([B3](#b3--salt-lake-city--decided-and-applied-p24)).
  After the sweep `ja` has 33 distinct English anchor strings against frozen `zh`'s 37,
  at matching counts (`Dinosaur National Monument` 176, `Dinosaur Monument` 77,
  `Ashley Gorge` / `Outlaw Trail` / `Asphalt Ridge` / `Doc's Beach` 60 each).
- **`Cub Creek's tour of the Tilted Rocks`** was *not* fully translated. `Tour of the
  Tilted Rocks` is a locked route name; only the English possessive was localized, to
  the corpus's own attested `Cub CreekのTour of the Tilted Rocks`.
- **`Flaming Gorge釣行ガイド`** — the fishing page's own `title`/`<h1>`. Left untouched:
  B4 is scoped to anchor text. Cross-file anchors use the sibling-consistent
  `Flaming Gorge釣りガイド` (cf. `Red Fleet貯水湖釣りガイド`, `恐竜の国の釣りガイド概要`).
- **`src/pages/ja/**` (117 English anchors) and the `page-content` `JA` blocks (5)** —
  censused and found to contain **only** proper nouns. Zero edits; all 57 sites are
  `.ja.mdx` spokes.

**Two `de`/`it` observations, deliberately not acted on** (P25 stop conditions forbid
touching German, and the German backlog is closed): `de` retains English
`Ultimate Guide to Flaming Gorge` / `to Vernal` at the same lines, and `it` retains
`Ultimate Guide to Ashley National Forest` at `kings-peak-hiking-guide.it.mdx:243`/`:60`.
Recorded here as observations only — **not** raised as new items.

**Gate 4d re-verified as structural, not regressed.** `dist/ja` shows 136 internal links
to non-locale routes — **identical in count and shape to frozen `de` and `zh`**
(77 = the language switcher's English option, one per page; 59 = the documented
author-bio exception from P11.1; `other` = 0). No `href` was modified by this sweep.

***This closes the Japanese post-review backlog. B1–B4 are all decided; the only
Japanese item still outstanding is the human native-speaker read, tracked separately.***

The original finding is preserved:

- **B4 (original)** — ~14 `ja` body links whose target is a `/ja/` route but whose visible anchor
  text is English (`things to do in Vernal`, `Vernal weather guide`, `Ultimate Guide
  to Vernal`). Distinct from the Gate 4d route-downgrade class, which is clean in
  every locale — this is display text, not `href`s.

> ~~**Question B4:** Localize the English anchor text, or confirm it as intentional?~~
> **ANSWERED & APPLIED 2026-07-25 (P25).** Localized. The real scope was **57
> occurrences, not ~14**, and the far larger finding is the **597 English anchors that
> are correct** — the earlier figure counted neither the proper-noun class nor the
> hybrids.

---

## Appendix — applying a decision

Once answers come back, each accepted change is applied as one sweep and
re-verified with:

```
npx astro check          # expect 0 errors, 0 warnings
npm run build            # expect 619 pages, Complete!
npm run validate         # expect links resolve, no orphans
```

plus a corpus re-count of the changed term (old form must reach 0) and:

- **any `de` change** — re-run the register and heading scans in A1/A2, so a fix
  in one place cannot silently reintroduce the pattern somewhere else;
- **any `zh` change** — re-run the C5 scans (`您` must stay 0, ASCII-punct-after-Han
  must stay 0 outside the `keywords` meta list, the 14 `连接号` single dashes must
  survive untouched) and re-count `——` at 5,222;
- **any change touching the caveat** — per Gate 4e, assert the **core** count
  `官方渠道核实` is conserved at **994** (prefixes may vary, instances may not
  disappear) and all three seams stay at 0: `请…请向`, `并请向`, `先请向`. The five
  grammatical `请A，请B` coordinate clauses listed in C6 must survive;
- **any change at all** — confirm the sweep touched one locale only. Per the Z5
  lesson, a `page-content/*.ts` file holds all eight locales' blocks in one file;
  isolate the target locale's template literal and never transform the file whole.
