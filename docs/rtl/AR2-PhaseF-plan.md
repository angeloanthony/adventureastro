# AR-2 Phase F — Arabic locale parity

> ## ✅ CLOSED — 2026-08-06, commit `8033883`. The Arabic localization rollout is finished.
>
> **77/77 `ar` routes · 696 total · registry↔page parity 77↔77 · full suite green.**
> The final batch registered the homepage and activated gate 4j's deferred gallery check
> (105 × 9 = 945 entries). Gate 4n closed at **zero findings for nine consecutive batches**;
> gate 4s at 0 unresolved fragments; floors re-frozen once at 611 / 650 over 77 pages, both
> proven to fail on a prose-deleted tree.
>
> **Nothing after `8033883` is rollout work.** The framework was not redesigned in any Phase F
> batch, which is the outcome [`rollout-execution-mode`](AR2-rollout-batch-brief.md) existed to
> produce — and it is why this document closes rather than absorbing the remaining findings.
> Deferred instrumentation, coverage and cleanup items live in
> [`AR2-post-rollout-hardening.md`](AR2-post-rollout-hardening.md), a separate milestone with its
> own entry conditions. An item moving there is not an open rollout task; treating it as one is
> exactly the failure mode that denies a finished project its completion point.

**Status:** ~~active~~ **CLOSED** (see the banner above). Track E is closed and is not reopened
here; this document governed the work that brought the `ar` locale from 58 routes to the 77
every other locale has.

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
3. **Batch 3 — shape A, site pages:** `faq`, `privacy-policy`. **CLOSED — see §5.4.**
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
a tally is a memory of it. **Batch 3 closes at 65/77; 12 routes remain.**

> ⚠⚠ **AND THE ARITHMETIC-ON-`AR_SLUGS` CHECK HAS A TRAP OF ITS OWN, FOUND IN BATCH 3.**
> `measure-prose-window.mjs` derives its population by running a global single-quoted-string
> match over the whole `AR_SLUGS` block — **comments included**. A possessive apostrophe in a
> comment inside that array re-pairs every quote after it. Batch 3 added one and cut the
> extracted list from 66 slugs to 6 real ones plus 60 fragments of English prose.
>
> It failed loudly (`no Arabic pilot routes found`) **only because the corruption reached the
> spokes**. A comment after the final entry would damage just the tail and understate the
> population in silence — and §3.2 already names that direction: a smaller `whole` gives a
> smaller `survives`, which is what **reports a dead floor as enforcing**. The build was never
> affected; comments do not change a `Set`. Only the source-parsing instrument was fooled, which
> is the same shape as §3.1 — the rule was right and the tool read something else.

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

## 5.4 Batch 3 — `faq` + `privacy-policy`, CLOSED

**65 of 77 ar routes · 684 site routes · 65 `ar` pages · whole suite GREEN on the first build.**
**Gate 4n returned ZERO findings for the third Phase F batch running.**

Both pages are pure shape A, and that was **re-derived from source before authoring** rather than
read off §2's table — the audit that produced §2's own correction, run again on its own advice.
Both carry a `src/page-content/*.ts` module with the same eight-locale block structure and a
`getBodyHtml` dispatch. `from/salt-lake-city` was **not touched**; it is shape D and gets its own
first-contact batch.

### Probe slot 1 — and it closed the gap §5.3 left open

Nine shapes measured before a word was authored, negative controls red in the same pass
(`$349`→`349$`, `(435) 219-9447`→`9447-219 )435(`, `95°F`→`F°95`, `10–11`→`11–10`,
`10-11`→`11-10`, `100%`→`%100`, `18+`→`+18`), and the unreachable control fired.

| shape | visual | authored as |
|---|---|---|
| `7:00` · `12:00` | as written ✔ | bare |
| `01` | `01` ✔ | bare — the 15 index labels |
| `5.0` | `5.0` ✔ | bare |
| `CCPA` | `CCPA` ✔ | bare (one control for the whole initialism class) |
| `adventuretoursvernal.com` | as written ✔ | bare |
| `7am–7pm` | **as written ✔** | *not used* — corpus form kept, see below |

§5.3 recorded that `7am` and `7pm` measured safe individually and that **"the dashed range joining
them was never measured"**, then spelled the pair out anyway. `faq.ts` carries `7am–7pm` twice, so
the question could not be deferred again. It measured **LTR, safe bare** — while `10–11`, *the same
en dash*, reverses in the same run.

> ### ⚠⚠ §3.6 DOES NOT SEPARATE THOSE TWO — AND THE PROJECT ALREADY KNEW WHY, ELSEWHERE
>
> §3.6 concluded *"the rule is about the shape, not the character — do not try to pick a safe
> separator."* That is correct as far as it goes and it **cannot distinguish `7am–7pm` from
> `10–11`**: same shape, same separator, opposite results.
>
> ⚠ **The explanation was already measured and recorded — in the AN/EN context rule (2026-08-03,
> 42-page corpus plus 8 synthetic controls, 17 constructs, no contradictions), which states the
> W7 clause explicitly and already lists `7am – 7pm` among the shapes that are SAFE after
> Arabic.** Batch 3 re-derived it from UAX #9 instead of reading it, because **§3.6 of the
> rollout brief never cross-references that rule.** Two records of one mechanism, and the one an
> author reaches for during a batch is the stale one. **That is the finding worth keeping**, and
> it is [[inventory-vs-classification]] pointed at the documentation: the knowledge was in the
> inventory and the classification of where it lives was wrong. ➡ §3.6 should cite the context
> rule; filed, not edited here (§6.3 keeps instrument and brief changes off a prose commit).
>
> The mechanism, as already on record: a run lays out wrong iff **(a)** its digits resolve to
> **AN** — the nearest preceding strong character is an Arabic letter (W2), and they take **L**
> instead when it is a Latin letter (**W7**) — **and (b)** it carries a non-digit W4/W5 cannot
> absorb. What batch 3 contributes is not the rule but **an independent test of it that could
> have failed**, which matters because the standing note on that rule is *"it has never yet
> caught a live defect first; the shape probe did that twice."*
>
> | shape | prediction | visual | |
> |---|---|---|---|
> | `7am–7` | LTR — letters precede the second operand | `7am–7` | ✔ |
> | `7–7pm` | REVERSED — they do not | **`7pm–7`** | ✔ |
>
> Same characters, same dash, same length; only the side the letters sit on differs, and the two
> came out opposite as predicted. **`7am–7` and `7–7pm` are a pair the context rule had not been
> tested on**, and they discriminate it from every competing account — a length rule, a separator
> rule and a "shape not character" rule all predict the two alike.
>
> The rule accounts for every reading the project holds, with no contradictions: `2.5` `5.0`
> `7:00` `12:00` `1,500` `13,528` `210,000` `360` `01` are safe because a **CS** separator between
> two digits is absorbed by W4, or there is no separator at all; `4x4` `FOX 2.5` `SPF 30`
> `KRX 1000` `I-80` `7am–7pm` `7am–7` are safe because a Latin letter **precedes** the digit;
> `10–11` `10-11` `~3` `2+` `18+` `100%` `$349` `$1,000` `95°F` `7–7pm` reverse because a
> non-absorbable neutral sits beside an unanchored digit run. `95°F` is the sharp case — it *has*
> a Latin letter, but **after** the digits, so it anchors nothing and it reverses.
>
> ⚠ **A RULE THIS GOOD STILL DOES NOT REPLACE SLOT 1.** It earns its place by predicting *what is
> worth measuring*, not by licensing anything unmeasured — the project has been wrong reading
> UAX #9 before (6a's ASCII-hyphen hypothesis), and the durable operational rule is unchanged:
> **read the `visual` line, never the label.** Reopen it the first time a measured shape
> contradicts it.
>
> **It changed no authoring here.** The corpus already ships `من 7 صباحًا حتى 7 مساءً` from
> batch 2, and consistency across the corpus beats a newly-licensed compact form. What the
> measurement bought is a closed question, not a rewrite.

### Advisory movements, every one attributed — including the ones that did not move

| number | batch 2 | batch 3 | attribution |
|---|---:|---:|---|
| routes | 682 | 684 | the two new pages |
| 4n rtl pages | 63 | 65 | +2, **0 findings** |
| 4o in-scope files | 97 | 99 | the two new `.astro` files |
| 4f advisory | 70 | **71** | exactly 1 — the `/ar/faq/` `<h1>` carrying `UTV`, the §2.2 licensed class, same class as batches 1 and 2 |
| 4g approved identities | 300 | **301** | exactly 1 — `adventuretoursvernal.com`, which is on the **global** identity registry, so its residue has no letters left |
| 4g review candidates | 621 | **623** | exactly 2 — `هنا` and `✉️ راسلنا بالبريد`. All three new identities found by **set-difference against all 63 pre-existing `ar` pages**, not inferred |
| 4s fragments | 2858 | **2862** | exactly 4 — `/#gallery` + `/#vehicles`, two per page. The bare `href="#"` is not a fragment identity (§5.2) |
| 4i advisory | 20 / 4 locks | 20 / 4 locks | **steady** — no `forbidden` rendering introduced |
| 4m | 34 pages / 312 refs | 34 pages / 312 refs | **steady** — neither page carries video, so §5.1's third deliverable does not arise |
| 4s unresolved | 0 | 0 | **steady** — all 16 anchor identities preserved |

**ADR-12: the 16 identities are unchanged.** `id="faq"` and `id="faq1"`…`id="faq15"`, every `for=`
still pointing at the same string. Three mechanisms depend on it — the checkbox/label pairing that
opens an item at all, the URL-hash handler at the foot of the block, and inbound deep links — and
translating one id would leave 15 questions that cannot be opened.

**Registering a slug is not a local act.** `Footer.astro` resolves its `info` block and its
copyright bar through `localeHref`, so registering these two switched `/privacy-policy/` and
`/faq/` links on **all 65** `ar` pages in the same build, not just the two added. Verified: 65
pages link to each. The single remaining English `/privacy-policy/` inside `dist/ar/` is on
`/ar/privacy-policy/` itself and is the **language switcher** (`hreflang="en" dir="ltr"`) — the
switcher doing its job, not a missed path.

### Census re-freeze + ceiling extension, one operation

GUARD 1 clean (phrase-set identical, EOL-normalised). GUARD 2: **2 increased, 51 steady, 0
decreased, 0 disappeared.** Floors re-frozen **502 → 505** and **538 → 545**; the increases (+3,
+7) equal the two pages' own rendered counts exactly — `faq` 2+6, `privacy-policy` 1+1, nothing
left over. Criterion 6 from the adopted Model B column: `ceilNP` 368 < 505 and 307 < 545.

**Criterion 5, proven by experiment.** The real gate 4i with the newly frozen floors, against a
tree with every Arabic character inside `<main>` deleted from the 59 `ar` pages that have one
(1 457 386 characters): **2 lock violations, exit 1.** The unmodified tree is green in the same
pair of runs, and `npm run gates:dist` is green end to end afterwards.

> ### ⚠ THE `decompose()` WATCH ITEM, MEASURED — THE MARGIN DID NOT MOVE AT ALL
>
> §5.3 asked for this to be measured at every re-freeze and never projected. Measured:
> **6 of 65 `ar` pages now render no `<main>`** (was 4 of 63) — `about`, `booking`,
> `safety-guidelines`, `cancellation-policy`, and **both** batch-3 pages. The prose-deletion
> experiment therefore still strips **59** pages, exactly as it did at batch 1.
>
> Because a no-`<main>` page reports `prose = 0`, its entire lock contribution lands in
> `survives`. So the floor rose by +3/+7 and `survives` rose by +3/+7 with it, and the
> enforcement margin is **312 and 462 — unchanged to the character.**
>
> That is worth stating precisely, because it is neither the good case nor the feared one: such a
> page does **not** narrow the margin, and it buys **no** enforcement strength either. It is
> margin-neutral. The share of the `ar` corpus classified 100 % chrome is now 9.2 % (was 6.3 %),
> and the thing to watch is unchanged: measure it, do not fit a line to it.

### Framework findings — reported, not fixed in a prose batch

None of these blocked the batch and none was remediated here; §6.3 keeps instrument changes off
a content commit.

1. **⚠⚠ `measure-currency.mjs` calls reachable prose unreachable, and the FAQ page is the class.**
   The instrument opens `<details>` before scanning — which covers `FaqAccordion.astro` — but the
   standalone FAQ **page** uses a checkbox/label disclosure reopened by
   `.faq-toggle:checked ~ .faq-answer` (`public/styles.css:587`). The instrument does not know how
   to check a checkbox, reports `disclosures opened=0`, and files every FAQ answer as
   *"prose collapsed with nothing left to open it"* — a verdict that is **false**: a reader clicks
   the label and it opens.
   **This is pre-existing and cross-locale, not batch 3's doing:** `/faq/` and `/zh/faq/` report
   **12** unreachable readings each, `/ar/faq/` reports 6 (fewer only because the Arabic spells
   prices out, so the `$349`/`$125` needles find nothing), `/ar/privacy-policy/` reports **0**.
   It is the mirror of the guard audit in the instrument's own header: there it suppressed
   readings it should have taken; here it labels reachable prose unreachable.
   ➡ **Consequence for this batch, stated plainly: slot 2 could not read a single run inside a
   FAQ answer.** The `7:00` times, the spelled-out prices and the in-answer phone numbers have
   **no post-build corpus confirmation — that is a silence, not a green.** The authoring rests on
   slot 1, which is precisely the slot for shapes the corpus cannot yet show, and whose negative
   controls were red; what is missing is the second, independent reading.
   `/ar/privacy-policy/` reports 0 unreachable, so **its** clean scan is evidence.
2. **`AR_SLUGS` comment parsing** — see the ⚠⚠ block in §2.1. An apostrophe in a comment inside
   the array corrupts `measure-prose-window.mjs`'s population, and the silent direction of that
   failure reports a dead floor as enforcing.
3. **§3.6.1 names a flag that does not exist.** The brief prescribes `--scan-shapes` for slot 2;
   `measure-currency.mjs` accepts only `--root`, `--needle`, `--route`, `--json`, `--verbose`.
   The **capability is present** — shape discovery runs unconditionally and prints its own
   `SHAPE CANDIDATES` section — so this is a stale name in the brief, not a missing instrument.
   Left as-is; the brief is the thing to correct.
4. **`preflight-ar.mjs` detects its surface by PATH, so a control staged elsewhere proves
   nothing.** A copy of a `page-content` module placed in a scratch directory reports
   *"unrecognised surface — NOTHING in this file was checked"* and exits without running a single
   check. The first attempt at this batch's positive control did exactly that and would have been
   read as "the checker is fine" by anyone not reading the line. Re-staged inside
   `src/page-content/`, the same defect fired correctly. **A preflight control must live on the
   path its surface is detected by** — and note the checker discriminated properly once it ran,
   reporting the `)` flanked `L … R` and correctly staying silent on the `(`, which sits between
   two Arabic words.

### ⚠⚠ Finding 2 is LIVE IN COMMITTED SOURCE, and the undercount is silent

Re-derived after the batch closed, to enumerate the remaining routes. The naive extraction —
*any single-quoted run* — applied to the other locale registries:

| block | naive | slug-shaped | |
|---|---:|---:|---|
| `AR_SLUGS` | 65 | 65 | clean (batch 3 fixed its own comment) |
| `ZH_SLUGS` | 76 entries, **19 junk** | 76 | **57 real slugs recovered instead of 76** |
| `JA_SLUGS` | 76 entries, **19 junk** | 76 | same |

`ZH_SLUGS` and `JA_SLUGS` **already carry apostrophes in their comments today.** No instrument
parses them this way yet, so the live blast radius is zero — but any future locale-parsing
instrument that copies `measure-prose-window.mjs` inherits a population that is **19 routes short
with no error raised**. That is the silent direction §2.1 names, demonstrated rather than feared.

**The fix is the one this project has applied three times already** — character list →
`\p{Bidi_Mirrored}`; the page name `cancellation-policy` → *a slug is a spoke iff a translated
collection file backs it*; duplicated parsers → one shared function. **Name the property, never
the delimiter.** Matching slug *shape* — lowercase segments joined by `-` and `/` — extracts all
three registries correctly, because no English comment can satisfy it. ➡ Filed for an instrument
commit; not changed here.

**M9 / M10, recorded rather than invented.** M9: zero places where masculine-unmarked read wrong;
both pages are impersonal by nature — a policy document and an FAQ — and the register never
strained. M10: one dual, `راكبين اثنين` for "2 riders", which is the same choice batch 1 made for
the same fixed capacity, reused rather than re-decided. `سنتين` for "2 years" is the ordinary dual
and replaces the `2+` shape batch 2 measured reversing. **No rule invented.**

**Legal initialisms.** `CCPA`, `GDPR` and `ISP` stay Latin and are glossed once on first use, per
this file's own long-standing terminology note. ⚠ **No parenthetical closes on a Latin run**, and
that cost two rewrites: English writes *"California Consumer Privacy Act (CCPA)"* and *"Internet
Service Provider (ISP)"*, and **both are §3.5's defect class exactly**. The class is structural
rather than stylistic — the gloss convention puts the initialism last and the bracket convention
closes right after it, so obeying both produces the defect every time. Neither is bracketed here;
expansion and initialism sit in apposition instead. §3.7's remedy with the boundary **removed**
rather than padded.

---

## 5.5 Batch 4 — `utv` + `dinosaur-national-monument` + `things-to-do` + `things-to-do/best-restaurants-vernal-utah`, CLOSED

**69 of 77 ar routes · 688 site routes · 69 `ar` pages · SHAPE A IS COMPLETE.**
**Gate 4n returned ZERO findings for the fourth Phase F batch running.**
First build **RED at gate 4m, predicted in advance** — the contract, not a regression.

### Probe slot 1 was built to try to BREAK the rule, on two neutrals it had never met

§5.4 closed with a rule that had survived one asymmetric test. This batch built two more, each a
pair differing only in **which side the Latin letter sits on**, on a different neutral:

| pair | shape | predicted | visual | |
|---|---|---|---|---|
| hyphen | `US-191` — letter FIRST | LTR | `US-191` | ✔ |
| | `3-hour` — letter SECOND | reversed | **`hour-3`** | ✔ |
| degree | `90s°F` — letter BEFORE `°` | LTR | `90s°F` | ✔ |
| | `95°F` — built-in control | reversed | **`F°95`** | ✔ |

The degree pair is the sharp one: **inserting a single `s` turns a measured defect into a safe
run.** The project had only ever seen `°` reverse. Two independent pairs, on two neutrals, both
splitting as predicted, is as much as a rule of this kind can be asked for — and it remains a
rule for *predicting what to measure*, not a licence to skip slot 1.

Also measured and authored around: `1,500+`→`+1,500`, `13,000-foot`→`foot-13,000`,
`$349/machine`→`machine/349$`, `~15–20`→`20–15~`.

### ⚠⚠ A NEW FINDING CLASS — TWO FROZEN RULES COLLIDE ON A BUSINESS NAME

`7-11 Ranch Restaurant` is simultaneously:

- a **§2.2 name** — Latin, verbatim, because a reader matches it against a sign; and
- a **§3.6 shape** — a bare digit-separator-digit run, the founding defect class.

Measured, negative controls red in the same pass:

| authored | visual | |
|---|---|---|
| `7-11 Ranch` bare | **`Ranch 11-7`** | ✘ a real business name, printed backwards |
| `<bdi>7-11 Ranch</bdi>` | `7-11 Ranch` | ✔ |

**Following §2.2 alone would have shipped it, and no gate in this repository can see it** — gate
4n reads `\p{Bidi_Mirrored}` and a hyphen is not mirrored. Every previous finding of this kind
was a *number*; this is an **identity**. The resolution satisfies both contracts rather than
making an exception to either: the string is unchanged and the rendering is corrected.

> **Where the remedy is unavailable, the fix moves into the markup.** The coupon modal writes
> restaurant names with `textContent`, where no markup reaches — and policy §5.2 forbids
> `U+200E/U+200F/U+2066–2069`, closing the usual escape hatch. Fixed by moving the id one element
> in: `modalRestaurant` and `modalCode` are now `<bdi>` elements *inside* their containers, so
> `getElementById(...).textContent = r` still resolves to the same id and the value lands
> isolated. `modalDiscount` is deliberately NOT isolated — its string is Arabic.
>
> ⚠ And the ItemList/Restaurant JSON-LD carrying the same name is **not** isolated either.
> Structured data is parser-consumed and never laid out, so there is no visual order to get
> wrong and a `<bdi>` there would be literal markup inside a string. **Isolate what renders,
> never what is parsed** — the same line batch 3 drew for the phone number in the FAQ schema.

### The asserted transform — a method, not a shortcut

`utv.ts` is ~200 lines of near-identical embed markup around a little prose. Its AR block was
**built by transforming the English literal**, with every replacement required to match a stated
occurrence count or the transform refuses to run, followed by structural proof that the carousel
survived byte-identical: **24 iframes, 21 dots, identical YouTube id sequence,
`${DOCS_BEACH_CAROUSEL_JS}` intact.** The same was done for the restaurant page's 110-line CSS
block and its 12-entry business-data array.

**It caught a real defect immediately:** a `'` escape landed literally as `Doc's Beach`.
Retyped by hand that reads as a translation typo; asserted, it is a failed check. Transcription
is where silent divergence hides, and this converts transcription into an assertion with a
stated expected input and a refusal on mismatch.

### Advisory movements, every one attributed

| number | batch 3 | batch 4 | attribution |
|---|---:|---:|---|
| routes | 684 | 688 | the four new pages |
| 4n rtl pages | 65 | 69 | +4, **0 findings** |
| 4o in-scope files | 99 | 103 | the four new `.astro` files |
| 4f advisory | 71 | **80** | exactly 9 — `/ar/utv/` 1, `/ar/dinosaur-national-monument/` 3, `/ar/things-to-do/` 2, `/ar/…/best-restaurants-vernal-utah/` 3. All the §2.2 licensed `UTV` class |
| 4g review candidates | 623 | **672** | exactly 49. Set-difference against all 65 pre-existing `ar` pages finds **50** fresh anchor texts; the one the gate does not count is `📞 (435) 781-0099`, which contains **no letters at all** — the `ar` approved list is entirely pure-Latin place names, no phones |
| 4g approved identities | 301 | 301 | **steady** |
| 4m pages / references | 34 / 312 | **35 / 336** | +1 page, **+24 references** = the iframe count, not the video count |
| 4m distinct videos | 30 | 30 | **steady** — all 21 ids on the new page already existed in the corpus |
| 4i advisory | 20 / 4 locks | 20 / 4 locks | **steady** |
| 4s fragments | 2862 | 2862 | **steady**, 0 unresolved — confirms the pre-authoring enumeration, which found zero fragment hrefs in all four modules |

**Links.** 16 targets switched to `/ar/`, 7 kept English (`/`, `/camping/`, `/fishing/`,
`/from/salt-lake-city/`, `/guides/`, `/itineraries/`, `/scenic-drives/`) — all resolved
mechanically against `AR_SLUGS` before authoring, not by eye.

### Gate 4m — predicted, then handled exactly as §5.3 prescribes

The first build failed with **exactly one** violation: `ar/utv/index.html` carries 21 videos but
is not in the baseline. Per §6.3 the eight gates hidden behind 4m by the `&&` chain were run
individually **against the same `dist/` before the merge**, so "no regressions" is a measurement:
all eight green, and every number above was frozen from that pre-merge run.

The merge asserted **parity first, add-only second**: every `ar` video route exists in English
(the only en-only entry is `index.html`, the untranslated homepage), then 1 added, **0 changed, 0
removed**, with `$doc`, `state`, `divergent` and `refCounts` all preserved.

### Census and floors

GUARD 1 clean. GUARD 2: **2 increased, 51 steady, 0 decreased, 0 disappeared.** Floors re-frozen
**505 → 514** and **545 → 566**; the increases (+9, +21) equal the four pages' own rendered counts
exactly — `utv` 2+8, `dnm` 2+4, `things-to-do` 5+5, `best-restaurants` 0+4. Criterion 6:
`ceilNP` 371 < 514 and 320 < 566. Criterion 5 proven by experiment — 62 pages stripped,
1 486 268 Arabic characters deleted from `<main>`, **2 violations, exit 1**; real tree green;
`npm run gates:dist` green end to end afterwards.

> ### ⚠ A PREDICTION THAT CAME OUT WRONG BY ONE, AND WHY IT MATTERS
>
> Batch 4 was predicted to raise the criterion-5 population from 59 to **63** — four new pages,
> all rendering `<main>`. Measured: **62**, and 7 `ar` pages now render no `<main>` rather than 6.
>
> **`utv` uses `<div class="trail-main">`, not a `<main>` element.** Three of the four joined the
> measured population; the fourth joined the 100%-chrome class instead. The prediction came from
> the page *category* — "hub pillars are article pages, article pages have `<main>`" — and the
> category was not the variable. That is the same error §5.2 and §5.3 already record twice, from
> a third direction, and it is exactly why §5.3 says **measure it at every re-freeze, do not
> project it.** The margin arithmetic is unaffected (309/449 before the refresh, 318/470 after),
> and nothing about the verdicts changes — but a prediction stated in advance and falsified by
> measurement is worth more on the record than a number that was merely read off.

---

## 5.6 Batch 5 — `from/salt-lake-city`, SHAPE D, CLOSED

**70 of 77 ar routes · 689 site routes · GREEN on the first build · gate 4n ZERO findings, fifth
batch running.** One page, and it produced the most first-contact findings of any Phase F batch —
which is the argument for giving a lone surface its own attribution window.

**The surface**: `CityLayout` + a `cities` collection entry via `getEntry()` + `QuickFacts` +
`GatewayRoutes` + `FaqAccordion`. No page-content module; prose lives in the default slot. The
collection is **English-only by design** — a locale reuses the locale-neutral numerics and passes
translated strings as props.

### ⚠⚠ A BUILD BLOCKER FOUND BEFORE A WORD WAS AUTHORED — and the component said it could not exist

`QuickFacts` renders `<dd>{value}</dd>` with **no isolation**, and `nearestAirport` had **no
override prop**. Its shipped value ends in a parenthetical: `Salt Lake City International Airport
(SLC)`. Injected alone into a built `ar` page, gate 4n reports `")" in <dd> flanked L … R` and
**exits 1**.

`CityLayout`'s own comment had ruled the override unnecessary: *"an airport's official name is a
proper noun in every locale's shipped prose."* **That is true of the NAME and false of the
STRING.** A proper noun with a trailing parenthetical is a mixed-direction rendering object, and
the difference is invisible until an RTL locale renders it. Authoring cannot reach a string that
lives in the collection, so the fix is a `nearestAirport?` prop mirroring the existing
`routeSummary?`. **Every locale that does not pass it keeps `city.nearestAirport` byte-for-byte:
this adds a capability and changes no existing output.** It introduces no RTL special case — a
repository improvement, not an Arabic workaround. Third assumption to expire at the RTL boundary
after §3.1 and §3.2.

### ⚠⚠ THE CONTROL THAT NEARLY PRODUCED A FALSE FINDING — gate 4n ignores a positional argument

The first three gate-4n controls came back green, **including one carrying a known §3.5 defect**,
which read as *"gate 4n is blind to `<dd>`."* It is not. **`gate-4n-isolation.mjs` takes its root
from `host.routes.output` and silently ignores a positional `dist` argument — where
`gate-4i-glossary.mjs` accepts one.** All three runs scanned the real `dist/`, not the copy. The
interface of one gate had been generalised to another.

Re-run against the real tree (with backup and verified restore) it fired immediately, and
`(SLC)` **alone** produces the finding. **A fifth mechanism for the one symptom** — after *no
arguments*, *wrong surface*, *unparseable surface*, *parser narrower than the language* — and a
new one: **the detector ignored the target it was given**. Same verification failure, different
implementation bug. See [[silence-is-not-evidence]].

### Pre-flight: eight false positives sitting on one true positive

All eight findings were `{` and `}` — Astro expression delimiters in **body text position**.
They are `Bidi_Mirrored=Yes`, so 7c's widening to the Unicode property picked them up correctly;
what had not kept up was the **exclusion list**. Batches 3 and 4 never tripped it because all
their expressions sat in attribute position, which exclusion rule 4 already covered. Second half
of 7c's own lesson: naming the property was right, and the exclusions must follow it.

> **⚠ THE EXPRESSION IS REPLACED WITH A SPACE, DELIBERATELY NOT WITH A TATWEEL.** A `<bdi>`
> collapses to a tatweel because it genuinely isolates its contents. **An expression isolates
> nothing** — its rendered value could be a digit run, a Latin name or a bare phone, and a source
> scanner cannot know which. Collapsing it would assert bidi properties the scanner cannot
> observe, and would have **hidden the real defect underneath these eight**: an uninsulated
> `{SITE.phoneDisplay}` interpolated straight into Arabic prose, now wrapped in `<bdi>`.
> A space says *"an unknown rendering occupies this position"* and lets the flank scan reach the
> genuine neighbours. This check no longer asserts anything about interpolated values, and should
> not: **gate 4n reads rendered output and remains the authority for them.**

Verified after the change: clean on all 13 authored files across batches 3–5, and a control
carrying a real §3.5 defect on this same surface still fires.

### Terminology — §2.1 and §4.2 in one paragraph, for the first time

`Salt Lake City` is a frozen exonym (`سولت ليك سيتي`) as a place reference **and stays Latin
inside `Salt Lake City International Airport`**, an institution name. Both readings appear in the
same paragraph here. `Heber City`, `Duchesne`, `Roosevelt`, `Silver Creek Junction` stay Latin:
they are route waypoints a reader matches against a road sign, which is §2.2's own test.

### Attribution, all exact

| number | batch 4 | batch 5 | attribution |
|---|---:|---:|---|
| routes | 688 | 689 | the one new page |
| 4n rtl pages | 69 | 70 | +1, **0 findings** |
| 4f advisory | 80 | **84** | exactly 4, all on `/ar/from/salt-lake-city/` |
| 4g review candidates | 672 | **682** | exactly 10 — matches the set-difference against all 69 pre-existing `ar` pages with nothing left over |
| 4s fragments | 2862 | **2867** | exactly 5 — the `GatewayRoutes` links into `/ar/utv/best-utv-trails-vernal/#N-…`, **all resolving** |
| 4g approved · 4m · 4i | — | — | **steady** |

**Slot 1**: `I-80 E`, `US-40 E`, `SLC`, `175` all measured **LTR bare**, negative controls red in
the same pass. ⚠ `3 ساعات` returned `RTL (visual = reversed logical)` — the instrument's
**documented non-classifiable case** (a mixed Arabic-plus-digit phrase is correctly RTL with a
digit island inside it). Recorded **UNMEASURED**, not green and not a defect.

**Census.** GUARD 1 clean; GUARD 2 2 increased, 51 steady, **0 decreased**. Floors **514 → 516**
and **566 → 570**, the increases (+2, +4) equal the page's own counts exactly. Criterion 6:
`ceilNP` 372 < 516 and 321 < 570. **Criterion 5 population rose 62 → 63 as predicted** — Shape D
renders `<main class="city-page">` — proven by experiment: 63 pages stripped, 1 488 996 characters
deleted, **2 violations, exit 1**; real tree green; full suite green afterwards.

---

## 5.7 A STANDING RULE — the instrument has THREE outcomes, and they are not on one scale

Recorded because it has now been needed in three separate batches and is easy to lose:

| outcome | meaning |
|---|---|
| **green** | measured safe |
| **red** | measured defect |
| **unmeasured** | the instrument could not distinguish |

**`unmeasured` is not halfway between green and red — it is off the scale entirely.** It carries
no evidence in either direction, and the one thing that must never happen is folding it into
"no findings."

Phase F has produced it three times, each from a different cause:
- **batch 3** — slot 2 read nothing inside any FAQ answer, because the instrument opens
  `<details>` and that page uses a checkbox disclosure;
- **batch 5** — `3 ساعات` is a construct the visual-order instrument states it cannot classify;
- **batch 5** — three gate-4n control runs that scanned a tree they were not pointed at.

The first two are honest limits of an instrument, declared in its own header. The third is a bug.
**All three produce the identical symptom**, which is why the outcome has to be named rather than
inferred from a count. See [[silence-is-not-evidence]].

---

## 5.8 Batch 6a — ⚠ PARTIAL: `guides` only. `hiking` and `fishing` NOT AUTHORED.

**71 of 77 ar routes · 690 site routes · green build · gate 4n ZERO findings, sixth batch
running · floors re-frozen 516 → 518 and 570 → 573 · criterion 5 proven (64 stripped, exit 1).**

⚠⚠ **THIS IS AN INCOMPLETE BATCH, CLOSED IN A CONSISTENT STATE RATHER THAN LEFT MID-FLIGHT.**
6a was scoped as `guides` + `hiking` + `fishing`. Only `guides` — the ~2 531-character calibration
page — was authored. `hiking` (~35 920 chars) and `fishing` (~31 125 chars) remain **English and
unregistered**. Everything recorded below is verified; nothing is projected.

> **The registry was rolled back mid-batch on purpose.** All three slugs were added to `AR_SLUGS`
> up front, which would have left two registered routes with no page — `localeHref()` emitting
> links to two 404s and `validate-site` failing. They were removed the moment it became clear the
> batch would not finish, and the invariant was then checked mechanically: **every registered slug
> is backed by a page file or a translated collection file, 71 of 71.** A partial batch is
> acceptable; an inconsistent registry is not.

### Shape B, characterized — the surface work is DONE and carries to `hiking`/`fishing`/6b

Derived mechanically from source, identical across all six pages:
`BaseLayout + TrustBadge + Header + Footer + Seo + Breadcrumbs + HubIndex`, prose **inline in the
`.astro` body**, no page-content module and no collection read on the page itself.

- **`TrustBadge` is already covered by B-2's bidi formatter**, so its values arrive isolated; no
  page needs to redo that work.
- **ADR-12 is vacuous for these page BODIES.** Mechanical enumeration found **zero** element ids
  and **zero** fragment hrefs across all three. Confirmed post-build: 4s stayed at **2867 with 0
  unresolved**.
- **Links resolved before authoring:** 15 of 17 targets switch to `/ar/`; only `/camping/` and
  `/scenic-drives/` stay English, and both are 6b.
- **Pre-flight discriminates on this surface** — a §3.5 defect injected into the authored page
  fires; it also correctly reported `not in AR_SLUGS` before registration, which is deliverable 2
  doing its job.

**Slot 1.** The three pages carry 27 distinct digit-bearing tokens, of which all but one fall into
classes already measured (comma magnitudes safe; `~N`, `$349`, `N–N°F`, and digit-hyphen-word all
measured reversing). One was genuinely new — a range compounded with a trailing plus — and it
behaved as the rule predicts:

| shape | visual | |
|---|---|---|
| `30–90+` | **`+90–30`** | ✘ reworded |

**Authoring on `guides`:** `5,331` written bare (measured LTR); `30–40°F` spelled out; the phone
isolated per §3.1; all eleven internal targets switched to `/ar/`.

**Attribution.** routes 689 → 690 · 4n 70 → 71, **0 findings** · 4g candidates 682 → **697** ·
**4f advisory steady at 84** — `guides` introduced no §2.2 licensed heading, the first Phase F
page not to · 4s, 4m, 4i, 4g approved all **steady**. Floors +2/+3 equal the page's own counts
(2 and 3) exactly. GUARD 1 clean; GUARD 2 2 increased, 51 steady, **0 decreased**.

➡ **To resume:** author `hiking` and `fishing`, register both, one build, re-freeze once. The
surface characterization above does not need repeating — only the per-page slot-1 shapes and the
link resolution, both of which are already recorded here for all three pages.

---

## 6. Known deferred items, unchanged

Tracked backlog, not Phase F translation work. Do not implement without the trigger:
B-8b/E-6 (Arabic seam rule) · B-17 / gate 4r (browser-layer visual-order gate) · M9 (register
drift census) · M10 (plural/dual agreement) · §5.1 (the caseless editorial marker).

Owner decisions still open: routing `RelatedArticles` `title`/`description` through the bidi
formatter, and `Grand Junction` → `غراند جنكشن` for the §5 challenge window.

Gate 4j's `ar` exemption is **not** in this list — it is not deferred work, it is a claim with a
named removal condition (§4).
