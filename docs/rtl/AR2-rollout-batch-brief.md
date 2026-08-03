# AR-2 — Arabic rollout translator brief (batches 2–9)

**Status:** active. This is the instruction set for every Arabic batch **after** the pilot.

**It supersedes [`AR2-E0-batch-brief.md`](AR2-E0-batch-brief.md) for authoring purposes and
does not replace it.** That document is the brief the 9-file pilot was authored against, and it
stays unedited because E-5's assessment measures the pilot *against it* — amending it would
destroy the record it is evidence for. Every change below is marked **⚠ NEW** or
**⚠ CORRECTED** and cites the pilot measurement that produced it (METHOD rule 1: no rule here
comes from taste).

It supersedes nothing in `AR1-arabic-policy.md`.

> ### The standing objective
>
> **Do not optimize for passing the current corpus. Optimize for making the next previously
> unseen corpus measurable.**
>
> This is not the same instruction as *fix the current failures*, and where the two diverge this
> one wins. The batch-2a blocker is the worked example: the cheap way to a green gate 4n was to
> delete the tatweel from `فـ` / `لـ` — the corpus would have passed and the **instrument would
> still have been wrong**, silently mis-measuring every Arabic page authored after it. The
> correction that shipped (`ec54397`, one codepoint) made no page prettier; it made the next
> unseen page measurable. The wider `Script` → `Script_Extensions` swap was rejected on the same
> test, from the other side: it would have passed too, while suppressing real findings across
> 12 837 occurrences.
>
> Practical consequences for a batch: prefer the fix that generalizes over the fix that clears
> today's finding; when a gate is wrong, correct the gate on its own commit before touching prose
> (§6.3); and record a defect **class**, not an instance (§3.3, §3.5 are both classes).

---

## 0. What changed since the pilot brief, in one table

| § | Change | Pilot evidence |
|---|---|---|
| **2.2** | **⚠ CORRECTED — the apostrophe instruction is withdrawn.** It was unfollowable. | E-5 §5.1; all 31 pilot source occurrences were ASCII and 17 rendered curly anyway |
| **3.2** | **⚠ CORRECTED — guillemets around a Latin run DO need action.** The pilot brief said they need none. | E-2 §2.2, 2 live gate-4n findings |
| **3.3** | **⚠ NEW — brackets adjacent to a digit run.** The single largest defect class in the pilot. | E-2 §2.1, **13** gate-4n findings |
| **3.4** | **⚠ NEW — the classifier-noun pattern before a Latin name.** | E-1 §6.4 |
| **3.5** | **⚠ NEW — a parenthetical that CLOSES on a Latin institution name.** The largest class in batch 2a; §3.3's digit class produced **zero**. | batch 2a, **28 of 30** gate-4n findings |
| **2.4** | **⚠ NEW — the `description` frontmatter budget, and why Arabic hits it.** | E-2 §6.4, **3 of 9** files failed the build |
| **2.4** | **⚠ CORRECTED — `title` is capped at 65 too, and this brief never said so.** | batch 2b: first build stopped at schema, 69/65, before any gate ran |
| **1.1.2** | **⚠ NEW — batch 2b closed; §3.5's class produced ZERO.** The §6.2 re-freeze was blocked, then **unblocked and done** at E-8/E-9. | batch 2b, 1 gate-4n finding (a §3.2 guillemet); [`AR2-batch2b-assertion-A.md`](AR2-batch2b-assertion-A.md) |
| **5** | **⚠ NEW — M9 and M10 are still unreported.** The pilot did not deliver them. | E-5 §4 |
| **5.1** | **⚠ NEW — the caseless editorial marker is an open challenge.** | E-2 §6.3 |
| **6.1** | **⚠⚠ CORRECTED — one floor was DEAD for a whole batch.** 33 was reachable by the template alone from batch 2a on; re-frozen at **183** and **415**, and both now fail a prose-deleted tree. | [`AR2-E9-floor-enforceability.md`](AR2-E9-floor-enforceability.md) §4, gate run against a stripped `dist/` |
| **2.4** | **⚠ NEW — a §2.3 lock phrase may appear at most ONCE across `title` + `description`.** A second occurrence unsounds every `ar` floor and no gate would say so. `preflight-ar.mjs` enforces it. | E-9 §2.2, control goes red on one added occurrence |
| **6.3** | **⚠ NEW — freeze the downstream gate numbers BEFORE remediating.** The `&&` chain hides every gate behind the first red one. | batch 2a: 4f/4h/4i/4g/4q never ran; the baseline had to be reconstructed |
| **6.4** | **⚠ NEW — a local commit may be published within minutes.** The `k` bot is a property of the environment, not an anomaly. | batch 2a: 3 articles pre-committed, 2 milestones auto-pushed |
| **3.2** | **⚠ CORRECTED — the discriminator is the FLANKS, not what the guillemets enclose.** A `«»` pair around *Arabic* still fails 4n when a Latin run precedes it. | batch 5, the batch's only 4n finding |
| **2.3** | **⚠ NEW — the `forbidden` competing renderings are named inline, and they are ADVISORY.** Two batches running, the author introduced one and no blocking gate said so. | batch 4 (`الدروب`), batch 5 (`بلاد الديناصورات`) |
| **1.5** | **⚠⚠ CORRECTED — the headroom trend REVERSED.** Projected ≈8 at 57 spokes; batch 5 measured headroom *widening* 26 → 40. `prose` is editorial, not structural. | batch 5 re-freeze |

---

## 1. The batches

Hub order is unchanged from `MULTILINGUAL_HANDOFF.md` §7 stage 2 and is **not re-derived**:
utv(7) ✔ → hiking(16) ✔ → fishing(4) ✔ → camping(4) ✔ → scenic-drives(4) ✔ → **guides(9)** →
itineraries(9) → things-to-do(2) → dinosaur-national-monument(2) ✔.

**Pilot complete: `utv` 7 + `dinosaur-national-monument` 2 = 9 of 57.** The DNM hub was pulled
forward by E-D1; it does not run again. **48 spokes remain.**

### 1.1 Batch 2 — `hiking`, 16 files

`alpine-lakes-hiking-high-uintas` · `beginner-hiking-guide-near-vernal` ·
`best-hikes-in-dinosaur-national-monument` · `bird-watching-near-vernal` ·
`dog-friendly-hiking-near-vernal` · `fall-hiking-near-vernal` · `family-hiking-near-vernal` ·
`high-uintas-backpacking-guide` · `high-uintas-day-hikes` · `kings-peak-hiking-guide` ·
`photography-hikes-near-vernal` · `spring-hiking-near-vernal` · `summer-hiking-near-vernal` ·
`wildflower-hiking-near-vernal` · `wildlife-hiking-guide-near-vernal` · `winter-hiking-near-vernal`

### 1.1.1 Batch 2a — the first 8, closed

`alpine-lakes-hiking-high-uintas` · `beginner-hiking-guide-near-vernal` ·
`best-hikes-in-dinosaur-national-monument` · `bird-watching-near-vernal` ·
`dog-friendly-hiking-near-vernal` · `fall-hiking-near-vernal` · `family-hiking-near-vernal` ·
`high-uintas-backpacking-guide`

**⚠ The batch-2a blocker was an INSTRUMENT defect, not an authoring defect.** The first build
stopped at gate 4n with 30 findings. Two of them were false positives the gate manufactured:
`bidi-isolation.mjs` classified ARABIC TATWEEL U+0640 as strong **L** because the character is
`Script=Common` and only its `Script_Extensions` is Arabic, so `فـ«…»` — Arabic on both sides —
reported flanks `L…R`. No corpus edit could have cleared them, and the only editorial workaround
(deleting the tatweel from `فـ` / `لـ`) would have corrupted the orthography §3.4 measures. The
gate was corrected by **one codepoint** (`ec54397`), on its own commit, before a single word of
prose was touched. The wider fix — `Script` → `Script_Extensions` — was measured and **rejected**;
it remains recorded as the measured non-solution in
[`AR2-batch2a-blocker-tatweel.md`](AR2-batch2a-blocker-tatweel.md) §7.2 and in the code comment
above `RTL_LETTER`, so it is not re-proposed. The remaining **28 were genuine** and were fixed by
authoring alone, under §3.5.

Lesson, for the fourth time: **a green gate run over a corpus that lacks the shape proves nothing
about the shape.** The tatweel occurs in 15 of 18 registered `ar` pages including nine pilot pages
that shipped 4n-green; the pilot passed only because no tatweel had yet landed next to a mirrored
character.

| | first build | green build |
|---|---|---|
| exit | **1** | **0** |
| gate 4n | **30 findings on 8 pages** | ✔ 18 rtl pages, 0 findings |
| gates behind 4n | **never ran** (`&&` chain) | 4f 4h 4i 4g 4q all ✔ |
| routes | 637 | **637** (unchanged) |
| `ar` pages | 18 | 18 |
| `ar` visible text | 441 123 chars | 441 360 chars (**+237** — exactly the 13 `بحسب المنطقة` + 10 `نفسها` + 1 `العالية` authored, no other drift) |
| 4i `ar` floors | unmeasured | **33 / 42 enforced**, rendered 94 / 219 |
| 4g candidates | — | **270**, identical to the unremediated baseline |

Every downstream gate was measured against a **reconstructed unremediated baseline** (the 28 edits
reversed, proved exact by restoring the three tracked files byte-identical to `HEAD`), so "no
regressions" is a measurement here and not an assertion. 4f, 4h, 4i and 4g are numerically
identical; 4q moves by exactly the authored characters.

### 1.1.2 Batch 2b — the last 8, closed

`high-uintas-day-hikes` · `kings-peak-hiking-guide` · `photography-hikes-near-vernal` ·
`spring-hiking-near-vernal` · `summer-hiking-near-vernal` · `wildflower-hiking-near-vernal` ·
`wildlife-hiking-guide-near-vernal` · `winter-hiking-near-vernal`

**The `hiking` hub is complete: 16 of 16. 25 of 57 spokes, 645 routes, 26 `ar` pages.**

Two findings, and neither was the class the brief predicted:

1. **A schema cap the brief did not document** — `title` ≤ 65, hit at 69. See §2.4. The build
   stopped before any gate ran, exactly as §2.4 warns schema failures do.
2. **One gate-4n finding, of a class §3.2 already names** — a guillemet closing straight onto a
   Latin run, `«المشي الجبلي في Uintas»`. Fixed by ending the quoted phrase on an Arabic word.

**§3.5's parenthetical class — 28 of 30 findings in batch 2a — produced ZERO here.** The guidance
was followed. So did §3.3's digit class, for the second batch running.

Per §6.3 the gates hidden behind 4n were run individually against the same `dist/` **before**
remediating, so "no regressions" is again a measurement: 4f, 4h, 4i and 4g are numerically
identical afterwards, and 4q moved by **+6 characters** — exactly the characters the one edit added.

⚠ **The §6.2 second operation did NOT complete.** The census re-freeze stopped at §11.2 criterion 2:
Assertion A is falsified for both `ar` locks, structurally rather than by anything batch 2b
authored. See [`AR2-batch2b-assertion-A.md`](AR2-batch2b-assertion-A.md).

> **⚠⚠ CORRECTED — "under-scoped" was wrong, and in the dangerous direction.** This section
> originally concluded the floors in force remained sound and merely covered less of the corpus.
> They did not. E-8 rebuilt the broken settled ceiling and found the `أرض الديناصورات` floor of
> **33 was already DEAD** — overtaken by template contributions alone during batch **2a**, one
> batch earlier — and E-9 confirmed it by running the real gate against a tree with every word of
> Arabic prose deleted: it stayed **green**. Closed by the re-freeze to 183/415 on 2026-08-01
> ([`AR2-E9-floor-enforceability.md`](AR2-E9-floor-enforceability.md)).
>
> The lesson generalises past this lock: **a headroom figure is not an enforcement figure.** The
> old reasoning checked the floor against a ceiling and never asked whether the floor could fail.

### 1.3 Batch 3 — `fishing`, 4 files, CLOSED

`fishing-flaming-gorge` · `fishing-red-fleet-reservoir` · `fishing-steinaker-reservoir` ·
`green-river-fly-fishing`

**29 of 57 spokes · 649 routes · 30 `ar` pages · whole suite green on the first build.**

**Gate 4n returned ZERO findings** — the first batch to clear the isolation gate on first contact.
§3.3's digit class produced zero for the third batch running and §3.5's parenthetical class for the
second, so both pieces of guidance are now carrying their own weight. The one §3.5 defect that did
occur was caught by `preflight-ar.mjs` **in source**, before any build.

> **⚠ THE BLOCKER WAS ASSERTION C, AND THE AUTHOR WAS THE CAUSE.** The Arabic `description` for
> `fishing-flaming-gorge` added the destination identity `أرض الديناصورات` where the English
> description never says "Dinosaur Country". Nothing was wrong with the sentence — it is exactly
> what a good translator does — but Assertion C requires that an Arabic card never carry a lock
> more often than the English card carried its source, and breaking it **retires Model A, the
> declared fallback ceiling** ([`AR2-E9`](AR2-E9-floor-enforceability.md) §2).
>
> No gate would ever have reported this. It surfaced only because the ceiling instrument was run,
> and it would have gone unnoticed in any batch that skipped §6.2's second operation.
>
> Fixed by mirroring the English frontmatter (the phrase stays in the body, where it raises the
> floor and breaks nothing). **The check now runs in `preflight-ar.mjs`**, verified to go red on
> the pre-fix file and clean on the corrected one. New rule, §2.3: **a §2.3 lock phrase may appear
> in `title` + `description` only if the English sibling's frontmatter carries its English source
> at least as often.**

⚠ A second-order effect worth seeing: removing that one phrase from one description dropped
`أرض الديناصورات`'s observed *related* contribution from **12 to 9** across the whole corpus,
because a related card renders the target's description on every sibling page. §1.2 is not
theoretical.

### 1.4 Batch 4 — `camping`, 4 files, CLOSED

`camping-at-flaming-gorge` · `camping-at-red-fleet-state-park` ·
`camping-at-steinaker-state-park` · `camping-in-ashley-national-forest`

**33 of 57 spokes · 653 routes · 34 `ar` pages · whole suite green on the first build.**
**Gate 4n zero for the second batch running** — on a new hub, which is the harder test.

Two findings, both caught before they could reach a gate:

1. **§3.5 in frontmatter**, caught by `preflight-ar.mjs`: `(هيئة Utah Division of Wildlife
   Resources)` closes on Latin, and frontmatter has no `<bdi>` available. Fixed with `نفسها`.
2. **⚠ Terminology drift I introduced myself.** Two occurrences of `الدروب` — the *competing*
   rendering that §2.3 warns about — went into `camping-in-ashley-national-forest`. Gate 4i caught
   it as an **advisory** (20 → 22 occurrences), not a failure, because the `ar` decision was never
   formally applied. Reverted to the locked `المسارات`; advisories back to 20.

> **The lesson is about advisory gates.** A blocking gate would have stopped the build. This one
> reported a number in a summary line, and the *only* reason it was noticed is that the batch
> procedure diffs the advisory counts (§6.3). **Read the advisory deltas on every batch** — an
> advisory that grows is drift entering the corpus, and the pre-existing 9 occurrences are exactly
> how the first ones got in.

### 1.45 Batch 5 — `scenic-drives`, 4 files, CLOSED

`cub-creek-road-tour-of-the-tilted-rocks` · `flaming-gorge-uintas-scenic-byway` ·
`red-cloud-loop-scenic-drive` · `sheep-creek-geological-loop`

**37 of 57 spokes · 657 routes · 38 `ar` pages · suite green.** 20 spokes remain.

Two findings, one blocking and one advisory, and **I caused both**:

1. **Gate 4n, 1 finding — §3.2's guillemet class, from the other side.** §3.2 is written about a
   guillemet *wrapping* a Latin run. This one wrapped **Arabic** (`«جولة الصخور المائلة»`), which
   §3.2 explicitly says needs nothing — but it was preceded by a Latin run
   (`فطريق **Cub Creek Road** — «…`), so the `«` still sat at a real `L … R` change. **The
   discriminator is the flanks, never which script is inside the quotes.** Fixed by authoring —
   `المعروف بـ«…` puts an Arabic word at the boundary — not by markup.
2. **⚠ Terminology drift I introduced myself, for the second batch running and on the *other*
   lock.** Two occurrences of `بلاد الديناصورات` — a `forbidden` competing rendering of
   `أرض الديناصورات` — went into `cub-creek-road`. Gate 4i reported it as an **advisory**:
   locks 4 → 5, occurrences 20 → 22. Reverted to `أرض الديناصورات`; advisories back to 4 / 20.

> **The batch-4 lesson held, and it is now the thing that works.** Batch 4 concluded "read the
> advisory deltas on every batch". That is the *only* reason this was caught: the build was green
> at the point the drift existed, and no blocking gate ever mentioned it. **One batch of evidence
> was a lesson; two independent recurrences on two different locks make it a procedure.**
>
> Note the asymmetry that makes it dangerous: §2.3 tells an author which phrase to *use*, and
> `forbidden` is where the near-miss synonyms live — but that list is in a JSON config, not in the
> brief an author reads. §2.3 now names them inline.

Per §6.3 the gates hidden behind 4n were run individually against the same `dist/` **before**
remediating, so "no regressions" is again a measurement, not an assertion:

| | pre-remediation | post | delta |
|---|---|---|---|
| 4f | ✔ 15445 headings, 47 advisory | identical | — |
| 4h | ✔ 577 pages, 1922 locked phrases | identical | — |
| 4i | ✔ **5 advisory locks / 22 occurrences** | ✔ **4 / 20** | the 2 I introduced, removed |
| 4g | ✔ 46206 anchors, 293 identities, 407 candidates, 74 repeated | identical | — |
| 4q | ar 1 174 411 chars | ar 1 174 419 chars | **+8 — exactly the two edits** |

Re-freeze **225 → 263** and **425 → 430**; guard 1 phrase-set identical (EOL-normalised),
guard 2 **51 unchanged / 2 up / 0 down**. Both new floors were **proven** on a prose-deleted
tree: the real `gate-4i <root>` exits **1** with both locks below floor, while the same gate on
an unstripped copy of the same `dist/` exits **0**.

### 1.46 Batch 6a — `guides`, the first 4 files, CLOSED

`vernal-weather-guide` · `what-to-wear-utv-tour` · `moab-utv-tours` · `what-to-bring`

**41 of 57 spokes · 661 routes · 42 `ar` pages · suite green.** `guides` is split 6a/6b on the
`hiking` 2a/2b precedent: 9 files is too many for one first-contact build to attribute cleanly.
**16 spokes remain**, 5 of them the cornerstone "ultimate guide" pages in 6b.

**Gate 4n returned ZERO on first contact** — the third batch to do so. That is *not* the same as
"nothing new happened": this hub surfaced **three** new classes, and every one of them was caught
by something other than a gate.

1. **⚠⚠ A LIVE DEFECT, and it was in batch 5's shipped corpus** — `10–11` rendering as `11–10`.
   See §3.6. Found only because the guides FAQs are full of ranges, which prompted running the
   E-1b visual-order instrument. **Reading UAX #9 gave the wrong answer** about the ASCII hyphen;
   both separators break identically.
2. **The `°F` shape**, measured *before* authoring rather than after (§3.6). Bare `95°F` renders
   `F°95`.
3. **A preflight false positive** — `style="…var(--charcoal)…"` reported as a §3.5 parenthetical.
   Attributes are not text nodes, so no gate could ever have agreed. Fixed on its own commit,
   with a positive control proving the check still fires.

Two more findings worth keeping:

- **Gate 4m, first Arabic contact.** The `ar` Moab page carries its English sibling's video, and
  the media baseline had no `ar` row. Re-baselined (`--emit-baseline`, diffed: **exactly one key
  added, zero existing keys changed**) rather than declaring the route `divergent` — the Arabic
  page is a translation of the same landing page, so parity is what is *true*, and `divergent`
  stays a record of real exceptions.
- **⚠ §3.5.1's tag-flattening artifact reaches gate 4f too, not just 4g.** `بالـ<bdi>UTV</bdi>`
  in the `<h1>` flattened to `بالـ UTV` — a space the source does not contain — so the heading and
  its own frontmatter `title` disagreed. Removed the isolate: it was **decorative**, since there
  is no mirrored character there and 4n stays at zero without it. *Isolate against a measured
  hazard, never as a house style.*

Advisory deltas, per §6.3: **4i 4 locks / 20 occurrences — UNCHANGED** (no terminology drift this
batch, breaking a two-batch run). 4f 47 → 62 and 4g 407 → 426, both attributed: the 15 new 4f
findings are all the accepted §2.2 class (`UTV`, `Moab`, `Adventure Tours Vernal` stay Latin in a
heading), and 4g grows with new anchor identities.

Re-freeze **263 → 276** and **430 → 446**; guard 1 identical, guard 2 **51 unchanged / 2 up /
0 down**, both floors proven on a prose-deleted tree.

### 1.5 ⚠ A trend to watch — `dinosaur-country` headroom is narrowing

The settled ceiling grows **6.00/page** while the whole-page count grows **5.25/page**, because
each new page adds a fixed 4 to the Model B bound plus ~2 of template, while its prose contributes
less than that. So headroom shrinks ~**0.75/page**:

| `ar` pages | ceilNP | whole | headroom |
|---:|---:|---:|---:|
| 26 (batch 2b) | 151 | 183 | **32** |
| 30 (batch 3) | 175 | 203 | **28** |
| 34 (batch 4) | 199 | 225 | **26** |
| 38 (batch 5) | 222 | 262 | **40** |
| 42 (batch 6a) | 246 | 275 | **29** |

> **⚠⚠ CORRECTED (batch 5) — the trend REVERSED, and the projection was wrong.** This section
> read the first three rows as a rate (whole +5.25/page, ceiling +6.00/page, headroom −0.75/page)
> and projected headroom ≈ **8** at 57 spokes. Batch 5 measured whole **+9.25/page** against the
> ceiling's **+5.75/page**, so headroom went **26 → 40** — it *widened*, and by more than the
> projection said it could narrow.
>
> The cause is not subtle in hindsight: the ceiling grows a fixed 4/page from the Model B bound
> plus template, but `prose` grows by **however often the authors actually write the phrase**, and
> a `scenic-drives` corpus whose every article links the "Scenic Drives in Dinosaur Country"
> pillar writes it far more often than a `camping` one does. **`prose` is an editorial quantity,
> not a structural one, so a per-page rate fitted to three batches of one hub predicts nothing
> about the next hub.**
>
> This is the **fifth** instance of the recorded-size lesson and the second in two batches: batch
> 4 found the 4n finding count was never monotone, and now the headroom rate is not monotone
> either. Keep measuring it at every re-freeze — but **do not project it**, and do not treat a
> narrowing run as a forecast. If it ever actually reaches 0 the lock becomes infeasible and
> §11.2 criterion 6 requires dropping it; that decision is made on a measurement, never on a
> trend line.

### 1.2 Two deliverables per file, not one — unchanged and still the top failure mode

1. `src/content/<hub>/<slug>.ar.mdx` — presence alone emits the route.
2. The `AR_SLUGS` entry in [`src/lib/i18n.ts`](../../src/lib/i18n.ts).

They diverge silently in both directions. **⚠ And the registry entry is not bookkeeping — it
edits every sibling Arabic route**, because `RelatedArticles` resolves against the registered
locale corpus (E-1 §6.3, E-2 §4.1). Registering batch 2 will change the rendered content of all
nine pilot pages. That is expected, and it is why floors are re-frozen per batch (§6.2).

---

## 2. Frozen — not re-decided per file

| | Rule | Source |
|---|---|---|
| Variety | Modern Standard Arabic | policy §1 |
| Register | Direct 2nd person, singular, **masculine unmarked**; prefer impersonal phrasing where it reads naturally | policy §2 |
| Numerals | **Western digits 0–9, no exception** — never `٠-٩`, never `۰-۹` | policy §3 |
| Punctuation | `،` not `,` · `؛` not `;` · `؟` not `?` — at sentence level only | policy §5.1 |
| Isolation | `<bdi>` element. **Never** `U+200E`/`U+200F`/`U+2066`–`U+2069` | policy §5.2 |

### 2.1 The five established exonyms

`Utah → يوتا` · `Salt Lake City → سولت ليك سيتي` · `Denver → دنفر` ·
`Colorado → كولورادو` · `Rocky Mountains → جبال روكي`

> **⚠ NEW — §4.1 and §4.2 overlap, and §4.2 wins inside an address or a proper name.**
>
> An exonym applies to the *place as a place reference*. It does **not** apply when the same word
> sits inside something the reader must match against a map, a sign or a booking system:
>
> ```mdx
> ✔  تقع Vernal في يوتا                                    ← the state, exonym
> ✔  <bdi>1935 S 1500 E, Vernal, Utah</bdi>                ← a postal address, §4.2
> ✔  <bdi>Utah Field House of Natural History State Park Museum</bdi>   ← an institution, §4.2
> ```
>
> Both Latin cases occur in the pilot corpus and both are correct (E-5c §5). This is the third
> instance of one pattern — E-2 §6.1 found the English conjunction `and` inside the §4.2 name
> `Dave and Trudy Wilson`. **An English word inside a §4.2 name stays**, whatever other rule
> would otherwise reach it.

### 2.2 Latin, verbatim — the wayfinding and transactional names

`Vernal` · `Dinosaur National Monument` · `Moab` · `Flaming Gorge` · `Red Fleet` ·
`Steinaker` · `Ashley National Forest` · `Uintas` · `Kings Peak` · `Doc's Beach` ·
`Moonshine Arch` · `Outlaw Trail` · `Asphalt Ridge` · `Adventure Tours Vernal` ·
`Kawasaki KRX 1000` · `Google` · `UTV` / `ATV` / `Jeep`

The test is not what kind of name it is — it is whether the reader must match the string against
a road sign, a booking system or a map. This diverges from `ja` on purpose (policy §4.2).

> ### ⚠ CORRECTED — the apostrophe instruction is withdrawn
>
> The pilot brief said: *"`Doc's Beach` — use the ASCII apostrophe `'` (U+0027), not `’`
> (U+2019) … the Arabic corpus picks one and holds it."*
>
> **Type the ASCII apostrophe — and know that it will not stay ASCII.** The pilot corpus
> contains **31 ASCII occurrences and zero curly ones in source**, and renders **17 curly**.
> Astro's markdown renderer applies smartypants to MDX **body** prose and rewrites `'` → `’`;
> frontmatter (FAQ answers) and dictionary strings (the footer trail list) are never
> markdown-processed and keep ASCII. **The split partitions by authoring surface, not by author
> choice, and no brief can change it** (E-5 §5.1).
>
> Nothing is required of you. This paragraph exists so the next person to read a count that
> disagrees with the source does not spend the afternoon looking for a translator error.

### 2.3 Locked Arabic identities

| English | Arabic | Enforced by |
|---|---|---|
| Dinosaur Country | `أرض الديناصورات` | gate 4i lock `dinosaur-country` — **floor 276** |
| trail (the route) | `المسارات` / `مسار` | gate 4i lock `offroad-trail` — **floor 446** |

> **⚠ NEW (batch 5) — the `forbidden` list is the other half of a lock, and it is ADVISORY.**
> Each lock carries competing renderings in `i18n-gates/4i-glossary.json` under `forbidden`
> with `enforce: "report"` — `بلاد الديناصورات` and `أرض الدينوصورات` for the destination
> identity, `الدروب` for the route. Writing one does **not** fail the build; it moves a number
> in a summary line. Batch 4 introduced `الدروب` twice; batch 5 introduced `بلاد الديناصورات`
> twice, on the *other* lock. **Both were caught only by diffing the advisory counts (§6.3),
> never by a gate verdict.**

> **⚠ NEW (batch 3) — two frontmatter rules these locks now carry.** Both are checked by
> `preflight-ar.mjs`; neither is visible to any gate.
>
> 1. **At most once per card.** A lock phrase may appear at most **once** across `title` +
>    `description` combined — a related-articles card renders exactly that pair, so a second
>    occurrence raises the settled ceiling and unsounds every `ar` floor.
> 2. **Never ahead of the English source.** A lock phrase may appear in `title` + `description`
>    only if the **English sibling's** frontmatter carries its English source (`Dinosaur Country`,
>    `trail`/`trails`) at least as often. Adding the destination identity to an Arabic description
>    whose English lacks it breaks Assertion C and retires the fallback ceiling model.
>
> Neither restricts the **body**, where these phrases are wanted and where they raise the floor.
| Key Takeaways | `أبرز النقاط` | AR-1 glossary; **not yet a lock** (measured at 4) |

`مسار` is the route. It never becomes a blanket word covering vehicle class — `UTV`, `ATV` and
`Jeep` stay Latin beside it.

⚠ **The pilot's first authored file used `الدروب` for *trails* and gate 4i blocked the build**
(E-2 §3). It was fixed at all four source sites, not only the flagged one — a lock is a
terminology decision, not a per-site one.

### 2.4 ⚠ NEW — the `title` and `description` frontmatter budgets

`content.config.ts` constrains `description` to **120–165 characters**. **Three of the nine pilot
files exceeded it on first authoring** (by 30, 1 and 2 characters) and **failed the build at
schema validation, before any gate ran** (E-2 §6.4).

> **⚠ CORRECTED — `title` is capped at 65 characters, and this brief did not say so.**
>
> Batch 2b's first build stopped here, not at a gate: `high-uintas-day-hikes.ar` came in at **69**.
> No Arabic batch had exceeded it before, so the cap had never been observed and §2.4 recorded only
> the `description` budget. An Arabic title that reads naturally is easy to run long — the fix was
> four characters — but the failure costs a **full build** to learn.
>
> Both budgets are now checked by `scripts/rtl/preflight-ar.mjs`, which reads source and takes a
> second. Run it before you build.
>
> ⚠ **That script also now enforces a ceiling you cannot see from the file:** a lock phrase from
> §2.3 may appear **at most once** across `title` + `description` combined. A related-articles
> card renders exactly that pair, so a second occurrence raises the settled ceiling by 4 per page
> and unsounds every `ar` glossary floor — and **no gate would say so**, because 4i only enforces
> a minimum. Reword, or the floors have to be re-placed
> ([`AR2-E9-floor-enforceability.md`](AR2-E9-floor-enforceability.md) §2).

Arabic diacritics each consume one character of that budget — `مُرشَدة` carries two. Count the
rendered string, not the word count. This is a schema failure, not a gate finding, so nothing in
§6 will diagnose it for you.

---

## 3. Isolation — `<bdi>` in MDX body prose

**The shared formatter does not reach you.** B-2's bidi formatter isolates values flowing
through shared components (`SITE` NAP, `TourCta`, `TrustBadge`). A phone number, price or Latin
brand run **typed directly into `.ar.mdx` prose passes through no formatter at all.**

### 3.1 What to write

```mdx
اتصل على <bdi>(435) 219-9447</bdi> لحجز جولتك.

تنطلق الجولة من <bdi>Doc's Beach</bdi> عبر <bdi>Outlaw Trail</bdi>.

سعر الجولة يبدأ من <bdi>$1,000</bdi>.
```

**Wrap in `<bdi>`:** the phone number; any price; any Latin run at a clause boundary.
**Do not wrap:** a Latin name mid-clause with Arabic on both sides and no mirrored character.

The pilot met this exactly — **33 phone occurrences in Arabic prose, every one isolated**
(E-2 §4.2).

### 3.2 ⚠ CORRECTED — guillemets around a Latin run

The pilot brief said: *"`›` `‹` `»` `«` are also `Bidi_Mirrored=Yes` and need **no** action — the
algorithm flips them correctly."*

**That is true of a guillemet in Arabic-only context and false of one wrapping a Latin run**,
where the quotation mark *is* the direction change. The original claim was measured over
guillemets in Arabic prose and generalised to all of them — rule 18, in a brief rather than a
census. It produced **2 gate-4n findings** in the pilot (E-2 §2.2).

```mdx
✘  أو كانت كلمتا «متجاورة» و«UTV» جديدتين عليك
✔  أو كانت كلمتا «متجاورة» و<bdi>UTV</bdi> جديدتين عليك
```

**Drop the guillemets around a Latin token and isolate it instead.**

> **⚠ CORRECTED (batch 5) — "guillemets around Arabic need nothing" was FALSE, and it was the
> sentence that used to close this section.** What decides gate 4n is the pair of **flanks** the
> mirrored character sits between, never the script it encloses. A `«»` pair around Arabic fails
> just as hard when the character *before* it is Latin:
>
> ```mdx
> ✘  فطريق **Cub Creek Road** — «جولة الصخور المائلة» داخل …     ← "«" flanked L … R
> ✔  فطريق **Cub Creek Road** — المعروف بـ«جولة الصخور المائلة» داخل …
> ```
>
> This is the same authoring fix §3.3 and §3.5 already prescribe — **put an Arabic word at the
> boundary where the direction change is** — and it is now a third place that one rule applies.
> The original claim was measured over guillemets in all-Arabic context and generalised; rule 18,
> in a brief, for the second time in this same section.

`→` (U+2192) is `Bidi_Mirrored=No` and stays pointing the wrong way. There were **0** in the
pilot's English sources; do not introduce one.

### 3.3 ⚠ NEW — a bracket adjacent to a digit run *is* a direction change

**The single largest defect class in the pilot: 13 of 15 gate-4n findings** (E-2 §2.1).

```
"(" in <h2>  flanked R … N
    برنامج مقترح لنصف يوم (3 إلى 4 ساعات)
```

Arabic on the left, a **digit** on the right. Under UAX #9 I2 a digit run is raised to an even
level and becomes an LTR island, so the bracket sits at a real direction change (ADR-10 §8.1).

**The fix is authoring, not markup — put an Arabic word after the opening bracket:**

```mdx
✘  (3 إلى 4 ساعات)          ✔  (مدته 3 إلى 4 ساعات)
✘  (نحو 2–5)                ✔  (من نحو سنتين إلى 5 سنوات)
```

The digits stay Western (policy §3) and the sentence keeps its meaning. **Wrapping the bracket in
`<bdi>` is not the fix** — the bracket belongs to the Arabic sentence, not to the number.

⚠ **This applies in frontmatter too, and there you have no other option.** `bidi-runs.ts`
isolates only the *named* runs (phone, currency), so a bracket in an FAQ answer cannot be
isolated at all and **gate 4n will block the build**. Rephrase. That residual was specified in
advance by B-15 §6 and behaved exactly as specified on first contact with a corpus.

### 3.4 ⚠ NEW — the classifier-noun pattern before a Latin name

Prefix a Latin proper noun with an Arabic classifier noun wherever it reads naturally:

```mdx
مسار Doc's Beach     منطقة Uintah Basin     شركة Adventure Tours Vernal
```

Measured on the pilot's first file: the proclitic **و** attaches to an Arabic word **129** times
and lands immediately before a Latin run only **9** times — 6.5 % — *because* of this pattern
(E-1 §6.4). Corpus-wide it holds: **1 807 attached, 47 pre-Latin, 0 standalone**.

It costs nothing, it reads better, and it keeps the seam population small for the Arabic seam
rule (B-8b / E-6), which is authorized and not yet built.

### 3.5 ⚠ NEW — a parenthetical that CLOSES on a Latin institution name

**The single largest defect class in batch 2a: 28 of 30 gate-4n findings** — and the class §3.3
predicted, *bracket adjacent to a digit run*, produced **zero**. The digit guidance was followed.
This is its mirror image: the direction change sits at the **closing** bracket, not the opening
one.

```
")" in <div>  flanked L … R
    تأكّد من المصدر الرسمي (هيئة National Park Service وهيئة Utah State Parks
    وإدارة غابة Ashley National Forest) لمعرفة الظروف الحالية
```

The class is **created by two other rules of this brief acting together**: §2.1/§4.2 keeps agency
names Latin, and the verify-the-source convention puts them in brackets. Every item in such a
list is `<Arabic classifier> <Latin name>`, so every item — and therefore the list — *ends* in
Latin. **Reordering cannot fix it.** Nothing was wrong with the translator's judgement; the brief
simply never said how to end a parenthetical that closes on a Latin name.

**In frontmatter (FAQ answers, `description`) — authoring, because markup cannot reach you.**
`bidi-runs.ts` isolates only the *named* runs (phone, currency), so there is no `<bdi>` available
and gate 4n **will** block the build. End the parenthetical on an Arabic word:

```yaml
✘  … (هيئة National Park Service وإدارة غابة Ashley National Forest)
✔  … (هيئة National Park Service وإدارة غابة Ashley National Forest بحسب المنطقة)

✘  … (إدارة غابة Ashley National Forest)
✔  … (إدارة غابة Ashley National Forest نفسها)
```

Both closers carry meaning rather than padding: `بحسب المنطقة` is true — different agencies
manage different areas — and `نفسها` is the ordinary Arabic emphatic for a single named body.
This is §3.3's rule applied at the other bracket: **put an Arabic word at the boundary where the
direction change is.**

**In MDX body prose — `<bdi>` around the Latin run**, exactly as §3.1 already says. An isolate
becomes a single *neutral* to the text around it, so the bracket's flank scans past it to the
Arabic beyond and the flanks match.

#### ⚠ 3.5.1 — where to put `<bdi>` when the Latin run is inside a link

Isolate the **whole `<a>`**, not the run inside it, when an Arabic proclitic attaches to the
Latin name with **no space** (`لـFlaming Gorge`, `وRed Fleet`):

```mdx
✘  <a href="…">لـ<bdi>Flaming Gorge</bdi></a>
✔  <bdi><a href="…">لـFlaming Gorge</a></bdi>
```

Both isolate correctly and both clear gate 4n. The reason to prefer the second is **gate 4g**:
its extractor flattens an element by replacing every tag with a **space**, so the first form
turns the anchor identity `لـFlaming Gorge` into `لـ Flaming Gorge` and forks one link's text
into two spellings. Measured on batch 2a: **4g review candidates 270 → 271, occurrences
unchanged at 955** — advisory, never blocking, and still drift worth not introducing. Where a
space already separates the two (`منطقة High Uintas Wilderness`, or a bare `Red Fleet`), the
flattened text is unchanged and either placement is fine.

### 3.6 ⚠ NEW — a NUMBER carrying a unit or a range reverses, and no gate can see it

**This class shipped a live defect.** `10–11` in two table cells of
`/ar/scenic-drives/cub-creek-road-…/` rendered as **`11–10`** for a whole batch. It passed every
gate, because every gate that could care is scoped elsewhere: gate 4n reads
`\p{Bidi_Mirrored}` and neither `–` nor `°` is mirrored; gate 4q reads Arabic-Indic digits and
these are Western. **The only instrument in the repo that can see it is
`scripts/rtl/measure-currency.mjs`** — the visual-order probe E-1b built for exactly this
reason, when a bare `$349` was measured rendering as `349$`.

Measured, with the negative controls live in the same run:

| authored | renders | verdict |
|---|---|---|
| `95°F` | `F°95` | ✘ reversed |
| `90–100°F` | `F°100–90` | ✘ reversed |
| `10–11` (en dash) | `11–10` | ✘ reversed |
| `10-11` (**ASCII hyphen**) | `11-10` | ✘ **also reversed** |
| `<bdi>95°F</bdi>` · `<bdi>10–11</bdi>` | as written | ✔ |
| `95 درجة فهرنهايت` · `من 10 إلى 11` | as written | ✔ |

> **⚠ Reading UAX #9 gave the WRONG answer, and that is the durable lesson.** The natural
> hypothesis is that the ASCII hyphen is safe where the en dash is not — `-` is **ES**, `–` is
> **ON**, and W4 absorbs an ES sitting between two numbers. It does not help: **W4 only absorbs
> an ES between two `EN`, and W2 has already retyped these digits to `AN`** in Arabic context, so
> there is no `EN` left for it to act on. Both separators break identically.
>
> So the rule is about the **shape, not the character**: *a bare digit run adjacent to a unit
> symbol or another digit run, in Arabic prose, reverses.* Do not try to pick a safe separator.

**Two fixes, and which one is legal depends on where you are:**

- **MDX body prose** — either. `<bdi>10–11</bdi> ميلًا` is compact enough for a table cell;
  `من 10 إلى 11 ميلًا` reads better in a sentence.
- **Frontmatter — the spelled-out form ONLY.** `preflight-ar.mjs` rejects `<bdi>` in frontmatter
  and `bidi-runs.ts` isolates only its *named* runs (phone, currency by shape), so a range in an
  FAQ answer or a `description` **cannot be isolated at all**. Write `من 90 إلى 100 درجة فهرنهايت`.
  This is the same residual §3.3 and §3.5 already hit, for a third reason.

**Units follow the corpus, not the source.** The Arabic corpus already spells out measures —
`70 ميلًا`, `13,528 قدمًا` — so a temperature is `درجة فهرنهايت`, not `°F`, wherever it reads
naturally. Reach for `<bdi>` only where a compact form genuinely earns its place.

> **⚠⚠ CORRECTED, same batch — `bidi-runs.ts` coverage is per-COMPONENT, not per-surface, and a
> `description` is NOT covered.** This section first said a bare currency was safe in frontmatter
> because `bidi-runs.ts` isolates it by shape. That is true of an **FAQ answer**, which reaches the
> reader through `FaqAccordion` → `<Bidi>` (B-15). It is **false of `description`**, which
> `RelatedArticles` renders straight into a card with no formatter in the path.
>
> Measured: a bare `$349` in the Moab page's `description` rendered **`349$` on three other Arabic
> pages** — every page whose related block carried that card. The defect is not on the page that
> authored it, which is why no amount of reading that file would have found it.
>
> **So the frontmatter rule is the simple one, for every shape: spell it out.** `تبدأ من 349
> دولارًا`, not `$349`. Isolation is unavailable in `title`/`description` and the one formatter
> that could reach them does not.
>
> ➡ **Open, and an owner decision:** routing `RelatedArticles`' `title`/`description` through the
> bidi formatter is the fix that *generalizes*, and it is exactly B-15's shape — a contract change
> landing uniformly across all nine locales. Filed, not built.

### 3.6.1 ⚠ NEW — the visual-order probe has TWO slots in the batch workflow

The blind spot this class occupies is now demonstrated, not hypothetical: it produces correct
HTML, passes every gate, and renders wrong. That earns routine observation rather than an
after-the-fact investigation. **`scripts/rtl/measure-currency.mjs` is now part of the standard
batch procedure, in two distinct places**, because it answers two different questions:

1. **BEFORE authoring — synthetic controls, no build required.** Inject the shape you are about
   to write into any already-built Arabic page and read it. This is how `°F` was settled before
   nine files were authored against a guess. Cheap: seconds, no rebuild.
2. **AFTER the build — `--scan-shapes` over the corpus.** The literal scan only ever finds
   needles someone already suspected; that is why a reversed range shipped for a full batch and
   was found by guessing the needle afterwards. **Shape discovery removes the guess**: it walks
   rendered text for digit-range, digit-plus-unit and currency shapes and measures whatever it
   finds, so a shape nobody predicted still gets read. Inventory-vs-classification, applied to
   the instrument instead of the corpus.

⚠ **A zero from this probe is only evidence while its negative controls are red.** Report the
control states alongside the count, exactly as §6.3 requires for advisory numbers.

⚠ **Measurability is asked of the CONTAINER, not just the run.** A run inside a visually-hidden
element — the 1px off-screen `.page-summary` — has no visual order worth reading; assistive
technology consumes DOM order, not layout. The original guard caught a run that *wraps* in that
column and missed one that *cannot* wrap for want of a break opportunity, which then read
`REORDERED` with full confidence. Four such readings were false positives. Now excluded with a
stated reason.

> **⚠ One reading this instrument CANNOT classify.** Its `layout` verdict has three values —
> `ltr` / `rtl-reversed` / `reordered` — and it can only decide a run that *should* be a single
> LTR island. A mixed Arabic-plus-digit phrase like `95 درجة فهرنهايت` is correctly RTL with a
> two-character LTR island inside it, which is neither, so it falls to `reordered` **by
> construction**. That is not a finding. Cite this instrument only on runs that should be one
> island.

---

## 4. Links — gate 4b allow-list

**Every internal link keeps its English path**, except targets that already have both
deliverables (§1.2). Today that is `cancellation-policy` **plus the 9 pilot slugs**.

Do not hand-write a `/ar/…` path that outruns its `AR_SLUGS` entry. Links are switched by
`localeHref()` reading the registry; a path that outruns it is a broken link and gate 4b names
it. As a batch completes, the allow-list grows to include its slugs.

---

## 5. The challenge window — use it, do not defer

**Arabic is the first locale whose policy predates its text.** Every §1–§5 decision is a
prediction. A translator who contradicts policy §2 or §4 **with corpus evidence** is the pipeline
working. At 16 files a reversal costs a 16-file sweep; at 57 it costs the locale.

⚠ **Two census items the pilot was asked for and did not deliver** (E-5 §4). They are still
owed, and they get more expensive every batch:

- **M9 — register drift.** Count the places where masculine-unmarked 2nd person read wrong and
  you used impersonal phrasing instead. A count, not an essay.
- **M10 — plural/dual agreement in interpolated counts.** An explicit AR-1 non-decision. **Record
  what you did; do not invent a rule.**

Also expected:

- **§4.2** — any name in the Latin list with a genuinely established Arabic form.
  `Dinosaur National Monument` sits closest to the line.

### 5.1 ⚠ NEW — the caseless editorial marker, an open challenge

`VERIFY WITH OFFICIAL SOURCE` is rendered in every other locale as **uppercase** target-language
text. Its scannability is carried entirely by **letter case, which Arabic does not have.** The
pilot used a fixed phrase — `تأكّد من المصدر الرسمي`, 24 times across three files — preserving
the meaning and losing the visual marker (E-2 §6.3).

**Use the same fixed phrase for consistency.** Whether the marker needs a non-case mechanism is
an open editorial decision affecting `ar`, `ja` and `zh` alike. Do not invent a per-file solution.

---

## 6. Acceptance — what runs against your files

No new instrument. `npm run build` runs all 11 gates.

| Gate | What it will tell you |
|---|---|
| **4n** | An unisolated Latin/Arabic flank — including §3.3's bracket-and-digit class |
| **4q** | Any Arabic-Indic digit in rendered prose. Policy §3 has no exception |
| **4k** | Every new page resolves effective direction `rtl` |
| **4i** | The two locked identities in §2.3, **now at floors 263 and 430** |
| **4o** | `→` count — expected 0 |
| **4b** | Any internal link that left the English path without a registry entry |
| *(schema)* | The `description` budget — §2.4, and it fails **before** any gate |

### 6.1 ⚠ CORRECTED — the floors are real, and one of them stopped being real for a whole batch

Through the whole pilot both `ar` glossary locks sat at a floor of **1** against a 10-page
corpus: they could not fail for a content reason. They were re-frozen at **33** and **42** at
`9282317`.

> **⚠ 33 was already too low, and nobody noticed for a batch.** A page contributes ~2 chrome + CTA
> occurrences of `أرض الديناصورات` on its own, so at the 18 pages batch 2a shipped the template
> alone reached 36 > 33. From that point **the entire Arabic prose corpus could have been deleted
> and gate 4i would have stayed green** — proved by running the real gate against a prose-deleted
> tree, not inferred ([`AR2-E9-floor-enforceability.md`](AR2-E9-floor-enforceability.md) §4).
>
> Re-frozen again at **263** and **430** on 2026-08-02 over the 38-page batch-5 corpus, both
> proven on a prose-deleted tree (§1.45). Re-frozen at **183** and **415** on 2026-08-01 over the full 26-page `ar` corpus. Both now fail
> that same experiment. A batch that drops either identity from Arabic prose fails the build.

### 6.2 ⚠ CORRECTED — finishing a batch is two operations, and the second one has an invariant

Registering routes without re-freezing leaves the floors covering less of the corpus than
shipped — and §6.1 is what that costs. The full procedure — instrument route lists, ceiling
extension, census re-freeze, and the guards that must run in order — is
[`AR2-E4-phase2-tight-ceiling.md` §11](AR2-E4-phase2-tight-ceiling.md). **Read it before starting
a batch, not after finishing one.**

**The invariant it now enforces:**

> Every frozen Arabic floor must demonstrably FAIL when the prose it protects is deleted.

A floor that survives deletion of the corpus it protects is not a weak floor, it is not a floor.
Criterion 5 checks it; `measure-ar-frontmatter-ceiling.mjs --window w.json` prints both the
current verdict and the floor a re-freeze *would* set, so the check happens **before** the
refresh rather than after.

### 6.3 ⚠ NEW — first contact: capture, then FREEZE THE DOWNSTREAM NUMBERS, then remediate

**`gates:dist` is an `&&` chain, so the first red gate hides every gate behind it.** Batch 2a
stopped at 4n and 4f / 4h / 4i / 4g / 4q **never ran** — leaving them with no numeric baseline at
all, only a pass/fail probe. Proving "no regressions" afterwards then cost a full reconstruction:
the 28 edits had to be reversed to rebuild the unremediated corpus, with exactness proved by
restoring the tracked files byte-identical to `HEAD`. **That work is avoidable, and this is how.**

Standing procedure for every batch from 2b on:

1. **Author all files first.** Do not build incrementally — one build, on a complete batch.
2. **Run exactly one first build** and preserve its complete output unedited. That capture is the
   acceptance artifact, and it is a **first-contact** artifact: it is never regenerated.
3. **If the chain short-circuits, do NOT start editing prose.** `astro build` has already written
   a complete `dist/`, and every gate reads `dist/`, so the hidden gates can be run directly
   against the *same bytes* the first build produced:

   ```
   npm run gate:4f   npm run gate:4h   npm run gate:4i   npm run gate:4g   npm run gate:4q
   ```

   ⚠ **Not `npm run validate`** — it is `gates:src && gates:dist`, so it re-enters the same chain
   and short-circuits at the same gate. Individual `gate:*` scripts are the only way through.
4. **Record those numbers.** They are the pre-remediation baseline, measured directly.
5. **Only then remediate**, and re-run the chain to diff against the frozen numbers.

> **⚠ NEW — the `ar` glossary floors now have ZERO downward slack, and remediation is where that
> bites.** Since the 2026-08-01 re-freeze the frozen minimum and the corpus are the *same number*
> (183 / 415, `actual == baseline`). Gate 4i fails when `actual < baseline`, so **any net removal
> of a single occurrence** of `أرض الديناصورات` or `المسارات` anywhere in the existing `ar` pages
> now fails the build. Through the pilot a floor of 33 against an actual of 182 absorbed anything;
> it no longer does.
>
> Adding pages is safe — a new batch only grows the total. **The exposure is editing pages that
> already shipped, which is exactly what step 5 does.** A §3.2 or §3.5 fix that rewords a sentence
> carrying either locked identity will go red as a *glossary* failure, pointing at the lock rather
> than at the edit that caused it.
>
> So, narrowly: **capture the enforceability comparison before any remediation pass on existing
> Arabic pages, re-run it immediately after and before the full validation suite, and attribute any
> decrease to the edit that introduced it** rather than letting it first surface as a downstream
> gate 4i failure.
>
> ```
> node scripts/rtl/measure-prose-window.mjs --json w-pre.json     # before remediating
> node scripts/rtl/measure-ar-frontmatter-ceiling.mjs --window w-pre.json
> …remediate…
> node scripts/rtl/measure-prose-window.mjs --json w-post.json    # before gates:dist
> node scripts/rtl/measure-ar-frontmatter-ceiling.mjs --window w-post.json
> ```
>
> This is an ordering rule, not a framework change. Gate 4i is behaving exactly as designed; what
> changed is that the margin it used to enjoy is gone.

The numbers worth freezing are the ones that move silently — the **advisory** counts, which never
block and therefore never announce drift. In batch 2a exactly one moved (4g review candidates
270 → 271, occurrences unchanged at 955) and it was a real, avoidable authoring artifact; the
blocking verdicts were all identical. **A gate reading ✔ is not evidence its population is
unchanged.**

### 6.4 ⚠ A local commit may be published within minutes — this is a property of the environment

An external process commits the working tree as `k` and pushes on its own schedule. During batch
2a it had already swept **3 of the 8** articles into the repo *before* the session began (which
is why that batch was 8 files, not the 5 that were visible), and it pushed the two milestone
commits between one status check and the next. Nothing was damaged either time, but the
consequences for procedure are permanent:

- **Verify staged scope before every commit** — `git add <paths>` does not scope a commit;
  `git diff --cached --stat` does (P19).
- **Assume any commit is immediately public.** Do not rely on a follow-up "cleanup commit" to
  explain intent, and do not leave a milestone in a state you would not publish.
- **Check `git log` before assuming the tree is yours** — untracked files from a parallel
  workstream may already be committed, and a batch may be larger than it looks.
