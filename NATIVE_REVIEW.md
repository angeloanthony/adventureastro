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

**Decided — 9 of 13:**

| Item | Decision | State |
|---|---|---|
| **A1** German register | **informal `du` confirmed**; `Sie` flip cancelled | ✅ decided **and closed** 2026-07-25 — **DE review unblocked**. Residual re-measured at P12: **0 formal leaks, 0 standalone capitalisation leaks**; the capitalisation split is A2, not A1 |
| **A2** German heading capitalisation | **German sentence case** confirmed; nominalised forms preserved | ✅ decided **and fully applied** 2026-07-25 (P13) — 297 replacements across 55 files; mid-sentence pronoun capitals **44 → 0** |
| **A5** German missing heading localization | **translate the 16**; `Leave No Trace` stays English | ✅ decided **and applied** 2026-07-25 (P14) — 16 headings localized, 1 retained, line numbers and heading levels unchanged |
| **A6** `Leave No Trace` lock alignment | **English programme name**; lowercase prose stays German | ✅ decided **and applied** 2026-07-25 (P15) — 8 sites aligned across 6 files, 9 descriptive uses deliberately kept German |
| **A3** `Piste` for UTV trails | **`Piste` is CORRECT — retained**; only the `-system` compound normalised | ✅ decided 2026-07-25 (P16) — 251 occurrences reviewed, **239 unchanged**, 12 compound-drift replacements |
| **A4** generic English `Trail` | **localize by sense** — `Piste` for motorised, `Wanderweg` for hiking; proper names stay English | ✅ decided **and applied** 2026-07-25 (P17) — 167 occurrences reviewed, **32 replaced**, 88 proper names + 2 footwear terms + 4 code identifiers kept |
| **B1** `モアブ` vs `Moab` | **Latin `Moab`** — the corpus transliterates only `バーナル` and state names | ✅ decided **and applied** 2026-07-25 (P18) — 85 occurrences reviewed, **37 replaced** in 1 file, 48 already canonical |
| **C1** `官方渠道` vs `官方来源` | **`官方渠道`** is the standard | ✅ decided **and applied** 2026-07-25 |
| **C6** locked-phrase policy | caveat is locked by **intent, not byte sequence** | ✅ decided **and fully applied** 2026-07-25 — 27 seam defects across 13 files fixed, disclaimer count conserved at 994 |

**Open — 4:**

| Locale | Open items | Highest-impact |
|---|---|---|
| `de` | **all 6 original items closed**; **A7 newly raised** | A7 — `Trailhead` (41); the recorded lock is contradicted by the corpus |
| `ja` | **all closed** — B1 applied at P18, B2 dissolved | — |
| `zh` | C2, C3, C4 | C2 — `登山口` (228) for trailheads with no mountain |

**Priority order** (owner-set 2026-07-25, revised at P16 once A3 was decided):
~~C6~~ → ~~A1-residual~~ → ~~A2~~ → ~~A5~~ → ~~A6~~ → ~~A3~~ → ~~A4~~ → ~~B1~~ → C2, C3, C4
(**A7** deferred by the owner to *after* the planned queue — see below).

***The German and Japanese reviews as originally scoped are both COMPLETE.*** German
A1–A6 are all decided and applied; Japanese B1 is applied and B2 dissolved on
measurement. Only the three Chinese items remain from the original plan.

**A7 is deliberately sequenced last.** P17 raised it as a *new* item — the A4 census
surfaced evidence against a lock this document had recorded as frozen. It is an
editorial opportunity, not a defect in the original review scope, so it does not
displace the planned items (C2, C3, C4) that were committed before it existed. It is
an owner decision to be taken once the planned queue is finished.

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

## A. German (`de`) — A1–A6 all closed; A7 newly raised

| Item | Subject | State |
|---|---|---|
| **A1** | register (`du` vs `Sie`) | ✅ closed — P12, zero edits (both targets were false positives) |
| **A2** | heading capitalisation | ✅ closed — P13, 297 replacements / 55 files |
| **A3** | `Piste` for UTV trails | ✅ closed — P16, `Piste` retained; 12 compound fixes |
| **A4** | generic English `Trail` | ✅ closed — P17, 32 replacements / 5 files |
| **A5** | untranslated English headings | ✅ closed — P14, 16 headings localized |
| **A6** | `Leave No Trace` lock | ✅ closed — P15, 8 sites aligned |
| **A7** | `Trailhead` (41) | ⬜ **open** — raised by the A4 census; owner decision |

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

### A7. `Trailhead` — the recorded lock is not supported by the corpus

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

> **Question A7:** Normalise the 41 `Trailhead` to the established
> `Ausgangspunkt` family, or confirm `Trailhead` as a deliberate German loanword
> and record it as a real lock? If normalising, say whether the 15 alt-text/
> figcaption boilerplate instances are in or out.

*Not applied in P17.* A4 was scoped to `Trail`/`Trails`/`Trail-`; `Trailhead` is a
separate lexeme, and overturning a lock recorded in this document is an owner
decision on the precedent of A1, A3 and A6. Nothing here blocks A4's closure.

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

## B. Japanese (`ja`) — B1 decided & applied; B2 dissolved. **Section closed.**

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
>    and was not authorised by B1. **Recommended as B3.**
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
