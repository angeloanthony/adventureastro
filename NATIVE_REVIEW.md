# Native-Speaker Review — German (`de`) and Japanese (`ja`)

**Status:** open. Prepared 2026-07-22 against tag `i18n-ja-complete` (`65041fd`).
**Scope:** `de` and `ja` only. No code or translation has been changed to produce
this document — every number below is a count from the shipped corpus.

Both locales are feature-complete (57 MDX spokes + 20 inline pages each, 77/77
routes, validator green). What remains is judgement a corpus scan cannot make.
This document exists so a reviewer decides **five questions**, not so they read
114 files.

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

## A. German (`de`) — four decisions

### A1. Register: the corpus is informal `du`. Confirm or flip. — HIGHEST IMPACT

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

Two sub-questions:

- **The main call:** is informal `du` right for this brand in German? It is
  common and often preferred in German outdoor/adventure tourism, so this is
  plausibly correct — but it is a brand-voice decision, not a language one, and
  it currently contradicts the Spanish and Italian house style.
- **Regardless of the above:** the ~18 unambiguous formal forms and the mixed
  `Du`/`du` capitalisation are inconsistent with *either* choice and should be
  normalised once the main call is made.

> **Question A1:** Keep informal `du` (and normalise the ~18 formal leaks and the
> `Du`/`du` capitalisation), or convert the corpus to formal *Sie* to match
> Spanish and Italian?

*Impact if flipped: corpus-wide, all 57 `de` spokes + 20 inline pages. This is by
far the largest possible change in this document — please answer it first.*

---

### A2. Heading capitalisation: English title case is leaking into German headings

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

> **Question A2:** Confirm these should be German sentence case. If yes, the 135
> headings will be listed individually for you to approve in one table, so the
> nominalised cases can be excluded.

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

## C. Out of scope here, but open

Recorded so the reviewer knows what this document deliberately does *not* cover:

- **`es` and `it` have never had a native review and were never tagged** (only
  `pt`, `fr`, `de`, `ja` carry `i18n-*-complete` tags). Their own flagged terms
  are listed in the phase notes — Spanish: `berrendo`, `borrego cimarrón`,
  `apartadero`, `calamina`, `slickrock`, and `lubina`/`lobina` for bass;
  Italian: `pecora bighorn`, `antilocapra`, `pioppo tremulo`, `peak-bagger`,
  `distretto forestale` vs `dei ranger`, `traina`, `black bass`, and `trailhead`
  vs `inizio del sentiero`.
- **~820 internal links outside MDX bodies still resolve to English routes** —
  shared components plus hardcoded hrefs in `src/pages/es/**`. This is
  engineering debt, not language, and is being addressed separately.

---

## Appendix — applying a decision

Once answers come back, each accepted change is applied as one sweep and
re-verified with:

```
npx astro check          # expect 0 errors, 0 warnings
npm run build            # expect 542 pages, Complete!
npm run validate         # expect links resolve, no orphans
```

plus a corpus re-count of the changed term (old form must reach 0) and, for any
change touching `de`, a re-run of the register and heading scans in A1/A2 so a
fix in one place cannot silently reintroduce the pattern somewhere else.
