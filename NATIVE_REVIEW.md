# Native-Speaker Review — German (`de`), Japanese (`ja`), Simplified Chinese (`zh`)

**Status:** open.
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

**Decided — 6 of 12:**

| Item | Decision | State |
|---|---|---|
| **A1** German register | **informal `du` confirmed**; `Sie` flip cancelled | ✅ decided **and closed** 2026-07-25 — **DE review unblocked**. Residual re-measured at P12: **0 formal leaks, 0 standalone capitalisation leaks**; the capitalisation split is A2, not A1 |
| **A2** German heading capitalisation | **German sentence case** confirmed; nominalised forms preserved | ✅ decided **and fully applied** 2026-07-25 (P13) — 297 replacements across 55 files; mid-sentence pronoun capitals **44 → 0** |
| **A5** German missing heading localization | **translate the 16**; `Leave No Trace` stays English | ✅ decided **and applied** 2026-07-25 (P14) — 16 headings localized, 1 retained, line numbers and heading levels unchanged |
| **A6** `Leave No Trace` lock alignment | **English programme name**; lowercase prose stays German | ✅ decided **and applied** 2026-07-25 (P15) — 8 sites aligned across 6 files, 9 descriptive uses deliberately kept German |
| **C1** `官方渠道` vs `官方来源` | **`官方渠道`** is the standard | ✅ decided **and applied** 2026-07-25 |
| **C6** locked-phrase policy | caveat is locked by **intent, not byte sequence** | ✅ decided **and fully applied** 2026-07-25 — 27 seam defects across 13 files fixed, disclaimer count conserved at 994 |

**Open — 6:**

| Locale | Open items | Highest-impact |
|---|---|---|
| `de` | A3, A4 | **A3** — `Piste` for UTV trails, 196 occurrences |
| `ja` | B1 | B1 `モアブ` vs `Moab` |
| `zh` | C2, C3, C4 | C2 — `登山口` (228) for trailheads with no mountain |

**Priority order** (owner-set 2026-07-25, revised at P15 once A6 was applied):
~~C6~~ → ~~A1-residual~~ → ~~A2~~ → ~~A5~~ → ~~A6~~ → **A3, A4** → B1, C2, C3, C4.

*All **structural** German review work is now closed (register, capitalisation,
missing localization, glossary lock). A3 and A4 are the first purely
**terminological** German items — judgement calls about word choice, not
consistency defects a corpus scan can settle on its own.*

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

## A. German (`de`) — A1 fully closed; A2/A3/A4 open

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

### A3. `Piste` (motorised) vs `Wanderweg` (hiking) — confirm the split is idiomatic

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

> **Question A3:** Is `Piste` correct for a UTV trail? If not, what replaces it
> across 196 occurrences?

---

### A4. Generic English `Trail` — a small residue

`Trail` appears 127 times in German files. **~90 are proper nouns and correctly
stay English** per the frozen never-translate list (Outlaw Trail 26, Highline
Trail 14, Fossil Discovery Trail 14, Harpers Corner Trail 7, Desert Voices Trail
6, Sound of Silence Trail 6, plus `Trailhead`).

The residue is a handful of *generic* uses — `die Trail`, `fünf Trail`, `Trail
zu`, `Trail für`, `Trail aus` — which are both untranslated and grammatically
ungendered.

> **Question A4:** Confirm generic `Trail` should become `Weg`/`Route`/`Piste`
> (per A3) while proper names stay English. Roughly 6 occurrences.

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

## B. Japanese (`ja`) — one decision, plus one item that dissolved

### B1. `モアブ` vs `Moab`

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

> **Question B1:** Standardise on `モアブ` (change 5 files + the anchor text) or
> on `Moab` (change 1 file, 37 occurrences)? Either is a single sweep.

---

### B2. `フクロウ` / `ピューマ` / `バッドランズ` — no action needed

These three were recorded as "terms with no corpus precedent, flagged by
agents." A direct scan of all 57 `ja` spokes returns **0 occurrences of each** —
and 0 occurrences of every plausible alternative (ミミズク, フクロウ類, クーガー,
マウンテンライオン, 荒地, 悪地, バッドランド).

They were considered during translation and never shipped. **Nothing to review.**
This item is closed; the earlier note was stale.

---

## C. Simplified Chinese (`zh`) — C1 + C6 decided & applied; C2/C3/C4 open; register clean

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

### C2. `登山口` for trailheads — is it right where there is no mountain?

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

> **Question C2:** Keep `登山口` throughout, or use `步道起点`/`步道入口` for
> non-mountain trailheads? If split, state the rule that decides which is which
> so it can be applied mechanically.

---

### C3. Five small synonym residues — confirm and sweep

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

---

### C4. `恐龙之乡` vs `Dinosaur National Monument` — confirm the split holds

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
