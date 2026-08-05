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
| **B** | 5 | inline in the `.astro` template (`hiking`, `fishing`, `camping`, `scenic-drives`, `itineraries`) | yes |
| **C** | 1 | almost none — `guides` is `HubIndex`-driven | n/a |
| **homepage** | 1 | shape A **plus** the gallery — see §4 | yes |

There is no frontmatter anywhere in Phase F. There is no `title`/`description` schema budget,
no RelatedArticles card, and therefore no per-card lock ceiling and no Assertion C. Those checks
are not skipped quietly — `preflight-ar.mjs` states on every run which surface it detected and
which checks that surface does not carry.

### 2.1 The batch sequence, and why the homepage is last

1. **Batch 1 — shape A calibration:** `atv-trails-vernal-utah` + `jeep-trails-vernal-utah`.
   The two smallest modules, near-identical to each other, no gallery, no `HubIndex`, no
   homepage coupling. First contact with the `.ts` surface at minimum blast radius.
2. **Batch 2+ — shape A, the site pages:** `about`, `booking`, `faq`, `privacy-policy`,
   `safety-guidelines`, `from/salt-lake-city`, `best-restaurants-vernal-utah`, `utv`,
   `dinosaur-national-monument`, `things-to-do`.
3. **Shape B — the five inline hub pillars.**
4. **Shape C — `guides`.**
5. **The homepage, last.**

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

---

## 6. Known deferred items, unchanged

Tracked backlog, not Phase F translation work. Do not implement without the trigger:
B-8b/E-6 (Arabic seam rule) · B-17 / gate 4r (browser-layer visual-order gate) · M9 (register
drift census) · M10 (plural/dual agreement) · §5.1 (the caseless editorial marker).

Owner decisions still open: routing `RelatedArticles` `title`/`description` through the bidi
formatter, and `Grand Junction` → `غراند جنكشن` for the §5 challenge window.

Gate 4j's `ar` exemption is **not** in this list — it is not deferred work, it is a claim with a
named removal condition (§4).
