# AR-2 Phase F — Arabic locale parity

**Status:** active. Track E is closed and is not reopened here; this document governs the work
that brings the `ar` locale from 58 routes to the 77 every other locale has.

It supersedes nothing. `AR1-arabic-policy.md` and `AR2-rollout-batch-brief.md` §2–§5 (the frozen
terminology, the isolation rules, the challenge window) apply unchanged — **what changes in
Phase F is not the rules but the surfaces they are applied to.**

---

## 1. What Phase F is, and what it is not

Track E validated the RTL framework against the hardest content the site has: 57 spokes, every
mechanism exercised, ending 4n-green at full rollout scale. **The remaining question is not
"can the framework handle Arabic".** It is whether the `ar` locale can reach structural parity
with the other eight while the validated framework holds.

The gap is exactly the **static page set**, and the arithmetic closes with nothing left over:

| | static | spokes | total |
|---|---:|---:|---:|
| every other locale | 20 | 57 | **77** |
| `ar` at the close of Track E | 1 | 57 | **58** |
| Phase F delivers | **+19** | 0 | **77** |

The one already-registered static page is `cancellation-policy`, the AR-1 pilot.

⚠ **Two route corrections against the working list.** `atv-trails-vernal-utah` and
`jeep-trails-vernal-utah` are **top-level** routes, not under `/utv/`. The `AR_SLUGS` string and
the file path both follow the route, so this is not cosmetic.

---

## 2. The dominant variable is the AUTHORING SURFACE, not the page category

Track E batched by content hub (`hiking`, `guides`, `itineraries`) because every file was the
same kind of file — a `.ar.mdx` spoke. **Phase F has no MDX at all.** Its prose lives in three
structurally different places, and the batch boundaries follow that, so each batch introduces
one new surface at a time:

| shape | pages | where the Arabic prose lives | `<bdi>` available? |
|---|---:|---|---|
| **A** | 12 | a `const AR = \`…\`` literal in `src/page-content/*.ts` | yes — it is HTML |
| **B** | 7 | inline in the `.astro` template | yes |
| **D** | 1 | `from/salt-lake-city` — `CityLayout` + a `cities` **content-collection entry**, `{city.*}` interpolations, `FaqAccordion` | yes, but FAQ answers route through `bidi-runs.ts` (B-15) |
| **homepage** | 1 | shape A **plus** the gallery — see §4 | yes |

> **⚠⚠ CORRECTED (batch 3) — THIS TABLE WAS WRITTEN BY HAND AND WAS WRONG TWICE.** It was
> re-derived mechanically from the English sources before batch 3 authored anything, and two
> entries did not survive:
>
> 1. **`from/salt-lake-city` is NOT shape A.** It has no page-content module at all. It reads a
>    `cities` collection entry through `getEntry` and renders through `CityLayout` +
>    `GatewayRoutes` + `FaqAccordion`. That is a **fourth surface**, and it was scheduled into a
>    shape-A batch purely because the hand-written table said so.
> 2. **`guides` is shape B, not a shape C.** It carries **2 531 characters** of inline prose;
>    "HubIndex-driven, almost none" was an assumption. **There is no shape C** — `guides` is
>    simply the smallest shape B.
>
> This is [[inventory-vs-classification]] applied to the plan itself: the *inventory* of 19 routes
> was right from the start and the *classification* was not, and only the classification decides
> the work. **Re-derive the surface from source before every batch; do not read it off this
> table.** The audit is four lines of `grep` over `src/pages/**` — cheaper than one mixed batch.

There is no frontmatter anywhere in Phase F. There is no `title`/`description` schema budget,
no RelatedArticles card, and therefore no per-card lock ceiling and no Assertion C. Those checks
are not skipped quietly — `preflight-ar.mjs` states on every run which surface it detected and
which checks that surface does not carry.

### 2.1 The batch sequence, and why the homepage is last

1. **Batch 1 — shape A calibration:** `atv-trails-vernal-utah` + `jeep-trails-vernal-utah`.
   The two smallest modules, near-identical to each other, no gallery, no `HubIndex`, no
   homepage coupling. First contact with the `.ts` surface at minimum blast radius.
2. **Batch 2 — shape A, site pages:** `about`, `booking`, `safety-guidelines`.
3. **Batch 3 — shape A, site pages:** `faq`, `privacy-policy`.
4. **Shape A, the hub indexes:** `utv`, `dinosaur-national-monument`, `things-to-do`, and the
   standalone `things-to-do/best-restaurants-vernal-utah`.
5. **Shape B — the inline `.astro` pillars:** `hiking`, `fishing`, `camping`, `scenic-drives`,
   `itineraries`, `guides`.
6. **Shape D — `from/salt-lake-city`,** its own first-contact batch. It is one page, but it is
   the only page on its surface, and a surface met for the first time inside a batch of another
   surface is a batch with no attribution.
7. **The homepage, last.**

⚠ **The route count in this document was wrong by one in batches 1 and 2** — recorded as 59/77
and 62/77, corrected to **60/77** and **63/77**. The running total was computed as "57 spokes +
the statics this phase has added" and silently omitted `cancellation-policy`, the AR-1 pilot,
which was already a registered static route. **14 routes remain, not 15.** The check that catches
it is arithmetic on `AR_SLUGS` itself rather than on a running tally — the registry is the fact,
a tally is a memory of it.

The ordering is not a preference. The homepage combines three first-contact variables at once —
the largest module (27 304 chars), the escaped-backtick extraction hazard (34 of them, and
**zero** in every other module), and the gate 4j gallery dependency. If anything moves, nothing
attributes. By the time it is reached, the parser, the workflow and the surface are all known,
and the only genuinely new work is the gallery and the presentation.

---

## 3. Instrumentation — what Phase F changed before it authored anything

`8d4b299`, instrumentation only, no prose and no route. Two assumptions expired at the Track E
boundary and both were corrected on their own commit, per the standing objective (§6.3: correct
the gate before touching prose).

**3.1 `preflight-ar.mjs` could not see the surfaces Phase F edits.** Measured with one §3.5
defect sentence placed on all three surfaces, *before* changing anything:

| surface | §3.7 flank check | |
|---|---|---|
| `.ar.mdx` | reported | ✔ |
| `.astro` | reported | ✔ — plus 3 findings that do not apply |
| `.ts` | **never ran** (skipped at `no frontmatter`) | ✘ blind, over ~219 000 chars of prose |

Fourth recurrence of *the rule was right and the tool had not been brought along* (6b
inside-the-brackets, 7b phone surface scope, 7c character class) and the **first found by a
control rather than by a red build.**

> ### False negatives and noisy negatives are different failures, and this file had both
>
> The `.ts` case is a false negative: no check ran. The `.astro` case is subtler and worse.
> `no title`, `no description` and `not in AR_SLUGS` are all **correct statements about a
> parser** and **none of them is a statement about the author's task** — a page template has no
> frontmatter card and is not a spoke. They are not defects to fix; they are noise to learn to
> ignore. An author who learns that lesson has also learned to skim past the one real §3.5
> finding sitting between them.
>
> **Coverage and trustworthiness fail together.** Extending a checker to a new file type is not
> merely adding support — a check that cannot be read is not a check. Hence `note` (a coverage
> statement) is now distinct from `say` (a finding), and an inapplicable check is announced
> rather than reported.

The AR literal is extracted by a character walk honouring backslash escapes, not a non-greedy
regex. On a fixture whose defect sits after an escaped backtick: **naive 27 chars, defect
unreached; adopted 234 chars, reached.** `home.ts` carries 34 escaped backticks. The obvious
implementation would have scanned the homepage's Arabic prose to nothing and reported clean.

**3.2 The ceiling instruments' population model named an instance, not a property.** Both
excluded the non-spoke page by the literal string `cancellation-policy`, which through Track E
was the only static page — so excluding it *by name* and *by kind* were the same operation.

`tightPerPage()` adds a bound of up to `CARD_LIMIT × AR_MAX_PER_CARD` for every registered page.
Nineteen static pages that render no RelatedArticles at all would have added **≈76 of ceiling
for a pool that does not exist**, pushing `ceilNP` toward the frozen floor and risking a §11.2
criterion-6 verdict — whose remedy is to **drop a live lock** — on a fiction.

Replaced with a structural test: **a slug is a spoke iff a translated content-collection file
backs it.** Same lesson as §3.7's `Bidi_Mirrored` correction, one layer up — name the property,
never the instance. Proven equivalent on the tree at the time of the change (58 registered → 57
backed + `cancellation-policy`), with the old and new instruments run side by side: ceiling
stdout byte-identical, window stdout differing only in the output filename.

⚠ `window.inline` (one object) became `window.statics` (an array), renamed rather than aliased
so a stale consumer fails loudly. A silent zero there would understate `whole` and therefore
`survives`, **which is the direction that reports a dead floor as enforcing.**

**Criterion 5 is unaffected by all of this and remains the governing check.** It is arithmetic
on the measured window, and `decompose()` degrades safely on a static page (everything lands in
`prose`). Only criterion 6's *population* was wrong. That is a much smaller change than
revisiting the floor methodology, and it is the reason the floor model is not reopened here.

---

## 4. ⚠ The homepage is the ACTIVATION POINT for deferred gallery verification

This is the entry most likely to be misread as "the homepage is just the biggest page". It is
not, and the difference is structural.

Gate 4j enforces a partition: every registered locale appears in **exactly one** of
`GALLERY_TEXT` (it renders the gallery, and here is its dictionary) or `GALLERY_EXEMPT` (it does
not, and here is why). `ar` is currently exempt, with the reason recorded in the map itself:

> *"AR-1 pilot locale: the only Arabic route is `/ar/cancellation-policy/`, so no page calls
> `renderGallery("ar")`. Remove this entry together with the phase that adds an `/ar/` homepage,
> and add `GALLERY_TEXT_AR` in the same change."*

The exemption is a **claim, not a suppression**, and it is falsifiable from both sides:
gate 4j rejects a locale in neither map or in both, and `renderGallery()` **throws at build
time** if it is ever called for an exempt locale.

So translating the homepage does not merely add a page. **It changes the verification surface**,
by activating a gate whose exemption has been waiting for precisely this condition. The moment
`src/pages/ar/index.astro` exists, the build stops until `GALLERY_TEXT_AR` — 105 slides of alt
text and captions — exists too. That is the designed behaviour and the reason the entry is
described in its own source as load-bearing in both directions.

Consequence for planning: the homepage batch is **two deliverables, not one**, and the gallery
half is a content deliverable of its own size. It is not a step to be discovered at build time
during the batch that was supposed to be about the homepage.

---

## 5. Per-batch procedure

Unchanged from `AR2-rollout-batch-brief.md` §6.3 and `AR2-E4-phase2-tight-ceiling.md` §11, with
the surface additions noted:

1. **Probe slot 1 BEFORE authoring.** `measure-currency.mjs` synthetic controls on the shapes
   the batch is about to write. Read the `visual` line, never the label (§3.6.2). A green is
   citable only while the run's negative controls are red.
2. **Enumerate every fragment** (`href="#…"`) before translating — ADR-12 / gate 4s.
3. **Resolve every internal link against `AR_SLUGS`** (§4). A `/ar/` path that outruns the
   registry is a broken link. Untranslated targets keep their English path.
4. **`preflight-ar.mjs` on every authored file**, naming them explicitly — it fails closed on
   no input and on an unrecognised surface.
5. **Author the whole batch, then exactly one first build.** Preserve its complete output
   unedited; it is a first-contact artifact and is never regenerated.
6. **Freeze the advisory numbers before remediating** — the `&&` chain hides every gate behind
   the first red one.
7. **Attribute every advisory movement**, including a number that did not move.
8. **Census re-freeze + ceiling extension as ONE operation**, §11.2's six criteria in order,
   criterion 5 outranking criterion 6.

### 5.1 Deliverable 2 differs by surface

§1.2's silent-divergence failure mode exists on every surface; it is simply a different second
deliverable each time. `preflight-ar.mjs` checks the right one per surface:

| surface | deliverable 2 | how it diverges silently |
|---|---|---|
| `.ar.mdx` spoke | `AR_SLUGS` entry as `hub/base-id` | the route never emits |
| `.astro` page | `AR_SLUGS` entry as the **static route** (`''` for the homepage) | the page builds, but the switcher and hreflang stay silent and `localeHref()` keeps sending links to English |
| `page-content` module | the `if (locale === 'ar') return AR;` dispatch line | **every** `ar` page reading the module renders the ENGLISH fallback while the source looks translated |
| **any page carrying video** | an `i18n-gates/4m-media.json` `pages` entry | gate 4m's baseline is blind to a *new* route by design, so the build goes red until it is re-baselined deliberately. ⚠ `--emit-baseline` prints only the `pages` map — merge it, never overwrite the file (§5.3) |

---

## 5.2 Batch 1 — `atv-trails-vernal-utah` + `jeep-trails-vernal-utah`, CLOSED

**60 of 77 ar routes · 679 site routes · 60 `ar` pages · whole suite green on the first build.**
**Gate 4n returned ZERO findings on first contact** — the first Phase F batch, on a surface the
project had never authored Arabic into.

**Probe slot 1, run before a word was authored.** Four shapes the corpus could not yet contain,
all measured `visual = logical` and therefore written **bare**, on a run whose negative controls
were red in the same pass (`$349`→`349$`, `(435) 219-9447`→`9447-219 )435(`, `95°F`→`F°95`,
`10–11`→`11–10`):

| shape | label | visual | authored as |
|---|---|---|---|
| `4x4` | LTR | `4x4` | bare |
| `2.5` | LTR | `2.5` | bare |
| `FOX 2.5` | LTR | `FOX 2.5` | bare |
| `360` | LTR | `360` | bare |

> **This REFINES 7c's class rather than contradicting it.** 7c established *any short bare run
> whose leading marker carries the meaning* reverses — `~3`→`3~`, `2+`→`+2`. All four shapes here
> carry their meaning in an **interior** separator with digits on both sides, and none reverses.
> The discriminator is where the meaning-bearing character sits, not the run's length. Measured,
> not reasoned: `2.5` was genuinely undecided by reading UAX #9, because W4 absorbs a CS between
> two `EN` and W2 has already retyped these digits to `AN` — the identical trap 6a's ASCII-hyphen
> hypothesis fell into.

**Advisory movements, every one attributed** (§6.3 — including the numbers that did *not* move):

| number | baseline | after F1 | attribution |
|---|---:|---:|---|
| routes | 677 | 679 | the two new pages |
| gate 4n rtl pages | 58 | 60 | +2, **0 findings** |
| `ar` visible text | 1 687 758 | 1 697 484 | the authored prose |
| gate 4o in-scope files | 92 | 94 | the two new `.astro` files |
| gate 4f headings | 15 987 | 16 017 | headings on two pages |
| gate 4f advisory | 64 | **68** | exactly 4, all on these pages, all one class: an `<h2>`/`<h4>` carrying `UTV` or `Jeep`, which §2.2 **requires** to stay Latin. The gate's own message calls it a licensed exception, and the class already existed at baseline |
| gate 4g anchors | 48 169 | 48 253 | anchors on two pages |
| gate 4g review candidates | 610 | **618** | exactly 8 — the 8 related-article cards (4 per page), each flattened by 4g's extractor into one anchor identity |
| gate 4g approved identities | 298 | 298 | **steady** |
| gate 4i advisory | 20 / 4 locks | 20 / 4 locks | **steady** — no `forbidden` competing rendering introduced |
| gate 4s fragments | 2849 | 2849 | **steady** — these pages carry only a bare `href="#"`, which is not a fragment identity |

**Census re-freeze.** GUARD 1 clean (phrase-set identical, EOL-normalised). GUARD 2: 2 facts
increased, 51 steady, **0 decreased, 0 disappeared**. The two increases are exact —
`أرض الديناصورات` **+1** and `المسارات` **+19**, and the per-page visible-text counts of the two
authored pages sum to precisely 1 and 19 with nothing left over. Floors re-frozen **497 → 498**
and **509 → 528**.

**Criterion 5, proven by experiment rather than arithmetic.** The real gate 4i, with the newly
frozen floors, run against a tree with every Arabic character inside `<main>` removed from all 59
`ar` pages that have one (1 457 386 characters): **2 lock violations, exit 1.** Both floors fail
when the prose they protect is deleted. The unmodified tree is green in the same pair of runs.

> ### ⚠ A STATIC PAGE CONTRIBUTES LITTLE STRUCTURAL LOCK TEXT — ⚠⚠ AND THIS PARAGRAPH WAS OVER-GENERALISED, SEE §5.3
>
> Measured on these two pages: `أرض الديناصورات` appears **1** and **0** times — exactly what was
> authored, and nothing else. A spoke carries **3** (1 authored + 2 structural). The difference is
> that these pages render `Footer variant="compact"`, which omits the tagline, and no
> RelatedArticles block at all. `survives` was **186 before and 186 after** adding two pages.
>
> The rollout brief's §1.5 headroom trend was fitted to spokes, each of which adds a fixed
> structural contribution plus a Model B bound. **Phase F pages do not narrow the enforcement
> margin the way spokes do.** Do not carry the §1.5 trend line into Phase F — it is describing a
> different kind of page. (Sixth instance of the recorded-size lesson: a rate fitted to one
> population predicts nothing about another.)
>
> > **⚠⚠ CORRECTED (batch 2). "A Phase F page adds NOTHING to `ceilNP`" was this paragraph's
> > original conclusion, and it was wrong in the same way §1.5 was wrong.** It generalised from
> > **one lock on one footer variant** to "a Phase F page". Two things were true and neither was
> > what was written: `variant="compact"` omits the footer tagline, which is why
> > `أرض الديناصورات` scored 0 — and `المسارات` was **never** 0, scoring **+2 per page** even in
> > batch 1, which the paragraph did not mention because it was framed around the other lock.
> > Batch 2's full-footer pages score 1–2 and 2–5. Seventh instance, and the first where the
> > over-generalisation was mine rather than inherited. See §5.3 for the measured table.

> ### The counterfactual that justifies `8d4b299`, measured
>
> `tightPerPage()` would have given each of these two pages a top-4 sibling bound of **8**
> (`dinosaur-country`) and **14** (`offroad-trail`) had they been counted as spokes — against a
> measured true structural contribution of **0**. Across all 19 Phase F pages that is **+152**
> and **+266** of fictitious ceiling, which lands `ceilNP` at 513 against a floor of 498 and 556
> against 528. **Both locks would have been reported INFEASIBLE, and §11.2 criterion 6's remedy
> is to drop a live lock.** The population fix was not housekeeping.
>
> ⚠ Note this is larger than the flat `CARD_LIMIT × AR_MAX_PER_CARD` = 4/page estimate used when
> the commit was written: `AR_MAX_PER_CARD` bounds the ARABIC per-card count, while the tight
> bound sums the actual ENGLISH pool contributions, which exceed 1 per card.

**Links (§4).** `/`, `/utv/` and `/booking/` kept their English paths — those three targets are
still untranslated. All eight related-card targets are registered `ar` spokes and switched to
`/ar/`; the two pages link to each other, which is legal because both are registered by this
batch.

**M9 / M10, recorded rather than invented.** M9 (register drift): zero places where masculine
unmarked read wrong; the pages are instructional and impersonal phrasing was already the natural
register. M10 (plural/dual): one dual, `راكبين اثنين` for "2 riders", chosen over a numeral-plus-
plural because Arabic marks the dual grammatically and "2 riders" is a fixed capacity, not a
count. **No rule invented — this is what was done, once, in one place.**

---

## 5.3 Batch 2 — `about` + `booking` + `safety-guidelines`, CLOSED

**63 of 77 ar routes · 682 site routes · 63 `ar` pages · gate 4n ZERO findings for the second
Phase F batch running.** The first build was **RED at gate 4m**; the cause was a repository
contract, not authoring, and no prose was edited to clear it.

**Probe slot 1 changed the authoring in three places.** Four shapes measured, three reverse:

| shape | visual | authored as |
|---|---|---|
| `7am` / `7pm` | `7am` / `7pm` ✔ | spelled out anyway — the *dashed range* joining them was never measured |
| `SPF 30` | `SPF 30` ✔ | bare |
| `100%` | **`%100`** ✘ | reworded |
| `$1,000` | **`1,000$`** ✘ | `1,000 دولار` |
| `18+` | **`+18`** ✘ | `18 عامًا فأكثر` (and `2+` → `سنتان فأكثر`) |

> `18+` reports **REORDERED** where 7c's `2+` reported **RTL** — the *same layout event*, labelled
> differently only because `18` has interior structure left to scramble. Third independent
> confirmation of *read the `visual` line, never the label*, now from a magnitude rather than a
> shape. `#1` in "our #1 priority" is the same leading-neutral class and was reworded unmeasured.

### The first build was red — gate 4m, and it is a REPOSITORY CONTRACT finding

`ar/about/index.html` carries 7 videos "but is not in the baseline". That is the gate working as
its own header documents: the baseline signal is *"blind to a newly added route until someone
re-baselines"*, and `--emit-baseline` prints rather than writes because *"rewriting the baseline
in place would make 'the gate is failing' and 'the gate has been silenced' the same command."*

**A translated route that carries video is a THIRD deliverable**, alongside the `AR_SLUGS` entry
and the `getBodyHtml` dispatch line. Added to §5.1's table.

⚠ **`--emit-baseline` prints ONLY the `pages` map — it is not the file.** The committed file also
carries `$doc`, `state`, `divergent` and `refCounts`; writing the emitted output over it would
silently delete the divergent-exceptions record and the design rationale. Merged by hand into
`pages`, with the merge refusing to proceed unless the diff was **add-only** and the `ar` set was
proven **equal to the English set** first (it is — so parity is what is true, and `divergent`
stays a record of real exceptions rather than absorbing a new locale, exactly as batch 6a decided).

Per §6.3 the gates hidden behind 4m were run individually against the same `dist/` **before** the
merge, so "no regressions" is a measurement: 4k, 4n, 4f, 4h, 4i, 4g and 4q are **numerically
identical** afterwards. Only 4m moved — 33 → 34 pages, 305 → **312** references, exactly the 7
iframes.

**Advisory attribution, all exact:**

| number | batch 1 | batch 2 | attribution |
|---|---:|---:|---|
| routes | 679 | 682 | the three new pages |
| 4n rtl pages | 60 | 63 | +3, **0 findings** |
| 4o in-scope files | 94 | 97 | the three new `.astro` files |
| 4f advisory | 68 | **70** | exactly 2, both on `/ar/about/`, both the §2.2 licensed class (a heading carrying `UTV`) |
| 4g approved identities | 298 | **300** | exactly 2 — `Dave Wilson` and `Trudy Wilson`, `/ar/about/` being the first Arabic page to carry the guide profile links; both on the global approved list |
| 4g review candidates | 618 | **621** | exactly 3 — two `about` inline link texts and the `safety` CTA. Proven by set-difference against all 60 pre-existing `ar` pages, not inferred |
| 4s fragments | 2849 | **2858** | exactly 9 — `/#gallery` + `/#vehicles` on `about` and `safety` (4), plus **5 on `booking`** |
| 4i advisory | 20 / 4 locks | 20 / 4 locks | **steady** — no `forbidden` rendering introduced |

> **ADR-12 stopped being a no-op.** Batch 1's fragment surface was a bare `href="#"`. `booking`'s
> default `Footer` emits **five** links into `/ar/utv/best-utv-trails-vernal/#1-docs-beach` … and
> **all five resolve** — because batch 7a's rule held: the Arabic spoke kept its **English** anchor
> ids. A static page linking into a spoke's anchors is the first Phase F case where the fragment
> identity contract is load-bearing rather than vacuous.

**Census.** GUARD 1 clean. GUARD 2: 2 increased, 51 steady, **0 decreased, 0 disappeared**.
Floors re-frozen **498 → 502** and **528 → 538**; the increases (+4, +10) equal the three pages'
own counts exactly — `about` 1+2, `booking` 2+3, `safety` 1+5. Criterion 5 proven by experiment:
the real gate 4i against a prose-deleted tree fails **both** locks, exit 1, real tree green.

### ⚠ The structural contribution depends on the FOOTER VARIANT and on WHICH LOCK

| page | footer | `أرض الديناصورات` structural | `المسارات` structural |
|---|---|---:|---:|
| `atv-trails` / `jeep-trails` | `variant="compact"` | **0** | 2 |
| `about` | full | 1 | 2 |
| `booking` | full | 2 | 3 |
| `safety-guidelines` | full | 1 | 5 |

This is what corrects §5.2's paragraph. The compact footer omits the tagline, which is the whole
of the `أرض الديناصورات` zero; `المسارات` was never zero. **When the population changes,
revalidate the population model before extrapolating** — batch 1 established that across page
*classes*, and batch 2 shows it applies within one class too, because "static page" was not the
variable that mattered.

All three batch-2 pages contribute **prose = 0** for both locks, so the enforcement margin is
unchanged at 312 and 462. That is a measurement, not a target.

### ⚠ WATCH ITEM, recorded and deliberately NOT fixed — `decompose()` assumes a `<main>`

`about`, `booking` and `safety-guidelines` render **no `<main>` element**. `decompose()` sets
`main = ''` when it finds none, so their entire body lands in `chrome` and they report
`prose = 0` — which is why the prose-deletion experiment strips 59 of 63 `ar` pages, not 63.

**No verdict is wrong today and nothing is being changed.** `survives = whole − prose` is
*inflated* by that classification, and criterion 5 asks `survives < floor`, so the error is in the
**conservative** direction; gate 4i counts total occurrences regardless, so the text is still
protected by the floor. But the share of the `ar` corpus classified 100 % chrome grows with every
such page, and `survives` grows with it. Margins today are 312 and 462 — nowhere near. **Measure
it at every re-freeze; do not project it** (§1.5's own rule about its own trend).

---

## 6. Known deferred items, unchanged

Tracked backlog, not Phase F translation work. Do not implement without the trigger:
B-8b/E-6 (Arabic seam rule) · B-17 / gate 4r (browser-layer visual-order gate) · M9 (register
drift census) · M10 (plural/dual agreement) · §5.1 (the caseless editorial marker).

Owner decisions still open: routing `RelatedArticles` `title`/`description` through the bidi
formatter, and `Grand Junction` → `غراند جنكشن` for the §5 challenge window.

Gate 4j's `ar` exemption is **not** in this list — it is not deferred work, it is a claim with a
named removal condition (§4).
