# Native-Speaker Review — German (`de`), Japanese (`ja`), Simplified Chinese (`zh`)

**Status:** open.
**Prepared:** `de`/`ja` on 2026-07-22 against `i18n-ja-complete` (`65041fd`);
`zh` added 2026-07-25 against `i18n-zh-complete` (`41b3482`).
**Scope:** `de`, `ja`, `zh`. `es` and `it` have never had a native review — see
§D. No code or translation has been changed to produce this document — every
number below is a count from the shipped corpus.

All three locales are feature-complete (57 MDX spokes + 20 inline pages each,
77/77 registered routes, validator green). What remains is judgement a corpus
scan cannot make. This document exists so a reviewer decides a short list of
questions, not so they read 171 files.

**Decided so far — 2 of 10:**

| Item | Decision | State |
|---|---|---|
| **A1** German register | **informal `du` confirmed**; `Sie` flip cancelled | ✅ decided 2026-07-25 — **DE review unblocked**. Consistency residual (~18 formal leaks, `Du`/`du` caps) still open |
| **C1** `官方渠道` vs `官方来源` | **`官方渠道`** is the standard | ✅ decided **and applied** 2026-07-25 — 962/0 |

**Open — 8:**

| Locale | Open items | Highest-impact |
|---|---|---|
| `de` | A1-residual, A2, A3, A4 | A2 — 135 title-cased headings across 28 files |
| `ja` | B1 | B1 `モアブ` vs `Moab` |
| `zh` | C2, C3, C4, **C6** | **C6** — 13 duplicated-`请` defects, 3 of which would bend the 962-instance locked caveat |

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

## A. German (`de`) — A1 decided; A1-residual/A2/A3/A4 open

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

The shipped register (informal) is now the confirmed register, so the 4,085
informal forms stand as-is. The reviewer's remaining task here is narrow:

> **A1 residual (open):** confirm the ~18 `Ihnen`/`Ihre`/`Ihr` formal leaks and
> the `Du`/`du` capitalisation split should normalise to lowercase `du`. Both are
> inconsistent under *either* register, so this is a consistency fix, not a
> register question. **Do not touch the 2,999 `du` / 1,086 `dein*` forms.**

*Note on the `Sie` row: 120 is an upper bound, not 120 formal leaks — it includes
sentence-initial* sie *= "they". The ~18 unambiguous row is the real target.*

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

## C. Simplified Chinese (`zh`) — C1 decided & applied; C2/C3/C4/C6 open; register clean

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

### C6. Duplicated `请` before the locked caveat — 13 instances, 5 files. OPEN.

Surfaced while applying the C1 grammar fix. The wildflower instance was **not**
isolated: the locked caveat `请向官方渠道核实` was mechanically appended to
sentences that already opened with `请`, producing `请…请向官方渠道核实` — *please …
please verify with official channels* — in **14** places. One is fixed (C1); **13
remain.**

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

**They do not all take the same fix, which is why this is a decision and not a
sweep.** Ten follow the rule already applied at C1 — drop the *leading* `请`, add a
comma, leave the locked phrase byte-identical (`请在预订时…` → `在预订时，请向官方渠道核实`).
Three cannot:

- `请致电请向官方渠道核实` — *please call please verify*. The two clauses collapse
  into one verb phrase; dropping either `请` still leaves `致电请向…` or `请致电向…`,
  so the **locked phrase itself has to bend** (e.g. `请致电或向官方渠道核实`).
- `请直接向我们请向官方渠道核实` — same problem, two competing `向` targets (*us*
  vs *official channels*); it needs a real rewrite, not a deletion.
- `请尽早预订并请向官方渠道核实` — here the *second* `请` is the one to drop
  (`请尽早预订，并向官方渠道核实`), which again breaks the locked string.

> **Question C6:** Approve the 10 mechanical fixes (leading `请` → comma, locked
> phrase untouched)? And for the 3 that require bending
> `请向官方渠道核实` — permit a local variant at those sites, or rewrite the
> surrounding sentence so the locked phrase survives intact?

*Nothing beyond the single C1 instance has been changed. This is reported, not
fixed, because 3 of the 13 would silently break the 962-instance lock.*

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
  must stay 0, the 14 `连接号` single dashes must survive untouched) and re-count
  `——` at 5,222;
- **any change at all** — confirm the sweep touched one locale only. Per the Z5
  lesson, a `page-content/*.ts` file holds all eight locales' blocks in one file;
  isolate the target locale's template literal and never transform the file whole.
