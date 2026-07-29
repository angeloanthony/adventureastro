# AR-2 B-7 — physical CSS: the rule-by-rule classification

**Status: classification complete. No source changed.** This document is the
review artifact; the sweep it authorises is the next commit, not this one.

The backlog entry for B-7 reads *"Mechanical conversion to logical properties:
`inset-physical` 145, `box-physical` 26, `text-align: left` 3."* Both halves of
that sentence turn out to be wrong. It is not mechanical — the same property
name carries four different meanings depending on the block it sits in — and 174
is not the population, because it counts three lines of English prose and misses
nine declarations that no `-left`/`-right` pattern can see.

---

## 1. Method

`rtl-inventory.mjs` reports totals per rule. Totals cannot be worked from, so
this pass re-derives the same three rules **with attribution** — file, line,
enclosing selector, full declaration, and the entire enclosing block — and then
assigns every row to exactly one class.

**The block is the unit of evidence, not the property name.** All three of these
declarations are `left`:

```css
.navbar::after { left: 0; right: 0 }        /* both edges — spans the inline axis */
.hero-overlay  { left: 0; width: 100% }     /* the same span, written with one inset */
.logo          { left: 20px }               /* anchored to one physical edge */
```

Only the third encodes reading order. The first two are symmetric: replacing
them with logical properties cannot change a pixel in either direction. A
classifier that reads the property name calls all three the same thing.

**Coverage is asserted, not assumed.** Every censused declaration must match
exactly one predicate; an unassigned row is a hard error, because a
classification with a residue is a hypothesis rather than a work list. That
check earned its place immediately — it caught a lone `margin-left: auto`, which
is the *opposite* of the centering pair it superficially resembles: with one
side auto the element is pushed to the far edge.

Reproduce with the census + classifier pair in the session scratchpad
(`b7-census.mjs` → `b7-classify.mjs --detail`). The three AR-1 patterns are
byte-identical to `rtl-inventory.mjs`, so the sub-totals reconcile exactly:
`inset-physical` 145, `box-physical` 26, `text-align-physical` 3.

---

## 2. The table

183 declarations = the 174 the AR-1 census sees + 9 it cannot.

| class | raw | sites | action |
|---|---:|---:|---|
| `not-css` | 3 | 3 | **no work** — census artifact |
| `fails-ownership-probe` | 4 | 4 | **no work** — dead code or redundant (§5.2) |
| `symmetric-both-edges` | 58 | 30 | **no work** — mirroring is a no-op |
| `symmetric-full-bleed` | 17 | 17 | **no work** — mirroring is a no-op |
| `symmetric-centering` | 14 | 14 | **no work** — mirroring is a no-op |
| `symmetric-margin-auto` | 6 | 6 | **no work** — mirroring is a no-op |
| `reject-shimmer` | 9 | 9 | keep physical **by decision** |
| `keep-glyph-coupled` | 1 | 1 | keep physical **by decision** |
| `decide-promo-anchor` | 5 | 5 | **owner decision** |
| `convert-carousel` | 4 | 4 | convert, **only with B-5b** |
| `convert-edge-anchored` | 35 | 14 | **convert** |
| `convert-accent-border` | 14 | 14 | **convert** |
| `convert-shorthand` | 9 | 9 | **convert** |
| `convert-text-align` | 3 | 3 | **convert** |
| `convert-list-indent` | 1 | 1 | **convert** |
| `convert-hover-indent` | 2 | 2 | **convert** |
| `convert-margin-push` | 1 | 1 | **convert** |

| action | declarations |
|---|---:|
| no work — census artifact | 3 |
| no work — fails the ownership probe (§5.2) | 4 |
| no work — symmetric | **95** |
| keep physical by decision | 10 |
| owner decision — **excluded from the sweep** | 5 |
| convert, only with B-5b | 4 |
| **convert** | **62** |

`sites` deduplicates by selector + declaration: `convert-edge-anchored` is 35 raw
but 14 sites because three of its declarations are the eight byte-identical
locale clones of `best-restaurants-vernal-utah.astro` — the same
duplication-by-locale axis B-5a removed from the carousels.

**The sweep is 62 declarations across 11 files.** Not 174, and not "mechanical".

> **CLASSIFICATION FROZEN** at 62 (owner's instruction) once the `.lang-menu`
> LTR measurement in §5.2.1 resolved the last open verdict. Nothing is added to
> or removed from this set during implementation except on a **demonstrated**
> ownership finding — the same standard §5.2 applied to everything else.

---

## 3. Why the 95 are no-ops

More than half the inventory converts to nothing. Four separate idioms, each
symmetric for its own reason:

- **`symmetric-both-edges` (58)** — the block sets `left` *and* `right`, so the
  box already spans the whole inline axis: `.navbar::after`, `#booking::before`,
  `.mobile-sticky-cta`, the eight `.discount-banner::before` clones. Sixteen of
  these are locale clones of two rules.
- **`symmetric-full-bleed` (17)** — `left: 0` beside `width: 100%`, which is the
  same span with one inset instead of two. Almost all are video `iframe` fills.
- **`symmetric-centering` (14)** — the `left: 50%` + `translate(-50%)` idiom.
  50% from the start edge is 50% from the end edge.
- **`symmetric-margin-auto` (6)** — `margin-left: auto` *with* `margin-right:
  auto`. Both sides are already equal.

This is the same shape as B-2's census finding, where a bare Western number
turned out not to be a bidi hazard: the property that looks direction-coupled is
neutralised by something else in the same declaration block.

---

## 4. Five findings

### 4.1 Three of the 174 are English prose

```
src/content/camping/camping-in-ashley-national-forest.mdx:58
src/content/scenic-drives/cub-creek-road-tour-of-the-tilted-rocks.mdx:322
src/pages/scenic-drives/index.astro:146
```

All three are sentences of the form *"…get this right: start at the visitor
center…"*. The `inset-physical` pattern matches `right:` in declaration position
and MDX body text satisfies it. The corpus needs nothing; **the AR-1 rule
over-reports by exactly three**, permanently, and the count in the backlog is
that much too high.

### 4.2 The census cannot see the 4-value shorthand — and it splits pairs

`padding: 8px 20px 8px 340px` is exactly as direction-coupled as
`padding-left: 340px`, and no `-left`/`-right` pattern will ever match it. A
sweep of asymmetric 4-value `padding`/`margin` shorthands finds **9** (out of
1,143 shorthands total — the other 1,134 are symmetric or have fewer than four
values, so the remainder is small and entirely actionable):

| site | declaration | what it is |
|---|---|---|
| `.nav-container` ×5 | `padding: 8px 20px 8px 340px` … `6px 15px 6px 95px` | clearance for the absolutely-positioned `.logo` |
| `.policy-list li` | `padding: 12px 0 12px 35px` | room for the `::before` ✓ bullet |
| `.season-content li` | `padding: 8px 0 8px 30px` | room for the `::before` ✓ bullet |
| `.answer-content` | `padding: 0 30px 30px 100px` | FAQ answer indent |
| `.article-body ul, ol` | `margin: 16px 0 22px 24px` | list indent |

The undercount is not the interesting part. **Five of these nine are the
companion half of a declaration the census *did* see.** `.policy-list li::before
{ left: 0 }` is classified `convert-edge-anchored`; the 35px of padding that
makes room for it is invisible. Convert the visible half alone and the bullet
moves to the start edge while the space reserved for it stays at the end — worse
than leaving both physical. Same for the five `.nav-container` paddings and
`.logo { left: 20px }`.

### 4.3 ~~`padding-left: 0` is a live rendering defect~~ — **FALSIFIED by the browser pass, see §5.1**

> **This finding was wrong and is retained as written so the correction is
> legible.** The claim below is sound CSS reasoning that does not survive
> contact with *this* stylesheet.

```css
.policy-list ul { list-style: none; padding-left: 0 }
```

The UA stylesheet indents lists with `padding-inline-START`. In an RTL document
that is the *right* side, so a physical `padding-left: 0` resets a side that was
already zero and **the 40px indent survives**. This is the one class in B-7
where the physical property does not merely point the wrong way — it silently
fails to do the thing it was written to do.

**Why it is wrong:** [`styles.css:22`](../../public/styles.css#L22) is
`* { margin: 0; padding: 0; box-sizing: border-box }`. The universal reset has
already zeroed the UA indent on *both* inline sides before this rule is reached,
so there is no 40px left to survive. Measured on the rendered page:
`padding-inline-start: 0px`, `padding-inline-end: 0px`. The declaration is
**dead** — converting it is a no-op, and so is deleting it.

Reclassified `convert-list-indent` → `dead-superseded`. The convert total moves
**66 → 65** here, and to **62** once the ownership probe (§5.2) retires three
more. The live total in §5 moves **22 → 21**. `.author-credentials ul
{ padding-left: 20px }` is unaffected: it sets a positive value *over* the reset,
so it remains a real conversion.

### 4.4 One conversion has a companion property that must move with it

```css
.arch-text .highlight-quote {
  border-left: 4px solid var(--burnt-orange);
  border-radius: 0 12px 12px 0;          /* square corner on the accent side */
}
```

Converting `border-left` → `border-inline-start` moves the bar but leaves the
squared corner on the physical left, so in RTL the bar sits on one edge and its
matching square corners on the other. Checked across all 14 `convert-accent-border`
sites: **this is the only one** with an asymmetric `border-radius`. Measured, so
the sweep does not need to treat radius as a general concern.

### 4.5 Four declarations must not land without B-5b

`.carousel-prev { left: 20px }` / `.carousel-next { right: 20px }` and their two
`max-width: 768px` overrides do encode reading order. But converting them alone
puts the "previous" control on the right while the slide transform still moves
content the LTR way — controls and content disagreeing, which is worse than
either being consistently wrong. **These four convert in the same commit as
B-5b, or not at all.** Owner's B-5a→B-6→B-7→B-5b ordering means B-7 ships
without them and B-5b picks them up.

---

## 5. B-7 is the first Track B item with live defects

B-6 found zero: `ar` renders one route with no arrows on it. B-7 is different.
`dist/ar/cancellation-policy/index.html` is `<html lang="ar" dir="rtl">` and
renders six of the convert classes — **21 of the declarations are live
today**, every one of them since confirmed in a browser (§5.1):

| element | declarations | what is wrong right now |
|---|---:|---|
| `.logo` + `.nav-container` clearance | 3 + 5 | logo pinned to the physical left; the padding reserving space for it is on the same side, so the pair is wrong together |
| `.dropdown-menu` | 4 | menu aligns to the physical left; accent bar and hover indent on the wrong edge (hover state — `opacity: 0` at rest) |
| `.lang-menu` | 4 | same, mirrored |
| `.policy-list li::before` + `li` padding | 2 | the ✓ bullet lands at the far end of the Arabic line, with its 35px of reserved space |
| `.policy-note` / `.policy-warning` | 2 | accent bar on the trailing edge, reading as a closing rule |
| `.mobile-menu-toggle` | 1 | hamburger pushed to the *start* below 1280px — logo and toggle are exactly swapped |

This changes B-7's standing relative to the rest of Track B. It is not
prospective regression protection like gate 4n or the arrow helper — it is a
visible defect on the only Arabic page that exists, in the site's shared chrome,
and therefore on **every** Arabic page the content phase adds.

### 5.1 Browser calibration — 5 of 6 confirmed, 1 falsified

**The presentation layer has now been opened in a browser.** First time in this
initiative. Method: `astro preview` over the existing `dist/`, Edge 150 headless
driven over CDP with Node's built-in `WebSocket` (no dependency added, nothing
installed, no repo state touched). Read-only.

Screenshots alone would not have settled this — the calibration question is not
"does it look wrong" but "**is the declaration I classified the one deciding the
position**". So the pass collected `getComputedStyle` and bounding boxes for
each live candidate at 1600px and 1100px, and used screenshots to confirm the
computed numbers meant what they appeared to.

| candidate | measured | verdict |
|---|---|---|
| `.logo` | `left: 20px`, box at l=20 while nav reads right-to-left | **confirmed** — logo sits at the *end* of an RTL header |
| `.nav-container` | `padding-inline-start: 20px` / **`-inline-end: 240px`** | **confirmed, and it confirms §4.2** — the 240px clearance is on the same physical side as the logo, so the pair is consistently wrong *together* |
| `.policy-note` / `.policy-warning` | `border-left-width: 4px`, `border-right-width: 0` | **confirmed** — both accent bars visibly on the trailing edge |
| `.policy-list li::before` | `content: "✓"`, `left: 0`, with `padding-left: 35px` on the `li` | **confirmed** — every ✓ stranded at the far left, i.e. the *end* of its Arabic line |
| `.mobile-menu-toggle` | at 1100px: `display: block`, `margin-left: 790px` (from `auto`), box at r=35 | **confirmed** — pushed to the *start*; logo and toggle are exactly swapped |
| `.policy-list ul` | `padding-inline-start: 0px` — no indent to rescue | **FALSIFIED** — see §4.3 |

Two things the pass added that the static classification could not:

- **`.dropdown-menu` and `.lang-menu` compute `opacity: 0` at rest.** Their four
  declarations each are real, but they are *hover-state* defects — not visible
  on load. That does not change their class; it does change how the after-sweep
  check must be performed, since a screenshot of the resting page cannot show
  them.
- **A third pair, not spotted statically.** `.crowd-col.moab-col` has
  `border-right: 3px` with a `max-width: 1024px` override of `border-right: none`.
  Convert only the base and the override stops cancelling it — in RTL
  `border-right` resolves to `border-inline-*start*`, so the 3px divider would
  reappear at the narrow breakpoint on the opposite edge. Both are already in
  `convert-accent-border`; they must move in the same edit.

**What the falsification costs, and what it buys.** One declaration of 66, and
the phase's own headline example. What it buys is the demonstration that the
classification is falsifiable at all: five predictions held under measurement and
one did not, and the one that did not was the one argued most confidently. A
classification nobody can check is a longer census.

---

### 5.2 The ownership probe — a third filter, and a harness that had to be disproved first

The classification says a declaration *should* be logical. §4.3 showed that is a
different question from whether it *does* anything. So every convertible
declaration went through a third filter:

| stage | question |
|---|---|
| census | does a candidate exist? |
| classification | should it be logical or physical? |
| **ownership probe** | **does this declaration decide the rendered result?** |

**Method — intervention, not cascade reasoning.** Blank the declaration in the
live stylesheet over CDP, re-measure computed style and geometry, restore. If
nothing moves, the declaration does not own the result. B-1's substitution logic
applied to CSS: prove causation by removing the cause.

**Result: 4 of 66 do not survive.**

| declaration | why it fails | evidence |
|---|---|---|
| `.crowd-col.moab-col { border-right: 3px }` | markup exists nowhere | 0 of 620 dist pages, 0 in `src/` |
| `@1024 .crowd-col.moab-col { border-right: none }` | same | same |
| `.arch-text .highlight-quote { border-left: 4px }` | same | same |
| `.policy-list ul { padding-left: 0 }` | redundant (§4.3) | removing it: `0px → 0px` |

The three orphans also retire §4.4: the `border-radius` companion on
`.arch-text .highlight-quote` was a correct observation about a rule that renders
on no page, and the `.crowd-col.moab-col` media-override pairing from §5.1 goes
with it. **Two of this phase's four "not mechanical" findings turned out to
concern dead code.**

### 5.2.1 `.lang-menu { right: 0 }` — ownership is direction-dependent

A fifth declaration looked dead and is not. Probed on the Arabic page it does
nothing — `right: 0px → 0px`, box unmoved — because there the element's static
position already coincides with `right: 0`. That verdict came from **one document
direction**, which by this phase's own rule is not enough to conclude "no
effect". Re-measured on an LTR route, with a positive control on the same page:

```
positive control  .logo { left: 20px }   →  20px → 240px   (box 20 → 240)
subject           .lang-menu { right: 0 } →  0px → -86.05px (box 939 → 1025)
```

It **owns on LTR** and stays in the sweep. The general rule:

> A "no effect" result is scoped to the conditions it was measured under.
> Direction is one of those conditions, so an RTL-only null result says nothing
> about the eight LTR locales.

This is the same epistemic shape as the harness failure below — negative evidence
needs its own positive control — arriving from a second direction. There, the
control was a known-live declaration; here, it is a second document direction.

**⚠ The harness produced 18 false "dead" verdicts, and only a control caught it.**
A batched probe — one CDP session, many declarations — reported 18 dead.
Re-testing each with a single-declaration harness in a fresh process showed
**16 of the 18 actually own their result**: `.carousel-prev` `20px → 0px`,
`.dropdown-menu` `0 → -147px`, `.logo@768` `15px → 20px`, `.policy-list
li::before` `0 → 794px`, `.comparison-table thead th` `left → center`, and so on.
Four structural fixes — longer settle, one page load per candidate, sheet
resolved from the element's own matched rules, recycling the CSS agent — changed
nothing; only the fresh process did. The root cause is unidentified, so the
batched runner is **retired, not fixed**.

The lesson is not about CDP. A measurement harness is an instrument, and an
unchecked instrument is not evidence:

> A probe that reports "no effect" must first be shown capable of reporting
> "effect". Run the positive control *before* trusting any negative result.

Believing the batched run would have dropped 16 live declarations from the sweep
as dead code — including every carousel anchor and the checkmark bullet visibly
broken in §5.1's own screenshot.

---

## 6. Open for the owner

**`decide-promo-anchor` (5 declarations) — EXCLUDED from the B-7 sweep.** The
Best Western badge anchors bottom-left (`left: 20px`), the High Class Limousine
badge middle-right (`right: 20px`), plus the floating video and two
`max-width: 1024px` overrides. The two badges are deliberately on opposite edges
so they cannot collide, and that relationship holds whichever way they mirror.
Whether an advertisement follows the reading direction or stays pinned to the
screen is a **product decision, not a directionality defect** — no objectively
incorrect RTL layout has been established for them, and none of the five renders
on the one Arabic route. Folding them in would make B-7 a design change wearing
a correctness sweep's proof. They stay open as an owner call; if the answer is
"mirror them", that is a separate one-line commit with its own justification.

*(Their close buttons are not part of this: `.bw-badge-close` / `.hcl-badge-close`
`right: 10px` are the close affordance at the end corner of their own box, and
classify as ordinary `convert-edge-anchored`.)*

**Two classes kept physical by decision, printed rather than silently dropped:**

- `reject-shimmer` (9) — the specular sweep travelling across buttons and
  badges. Decoration with no semantic direction, the same call Track B (b) made
  for the 135° brand gradients on the same evidence. Perfectly convertible, so
  this is a decision, not a limitation.
- `keep-glyph-coupled` (1) — `.play-icon-circle { padding-left: 5px }` optically
  centres a solid ▶ inside a circle. It compensates for the glyph's visual mass,
  so it must follow the glyph, not the page: correct while ▶ points right, wrong
  the moment the play triangle is mirrored. Tied to the arrow question B-6 left
  open.

---

## 7. The lesson

Three phases in a row, the raw inventory has overstated the implementation work
by roughly the same factor:

| phase | inventory | actual |
|---|---|---|
| B-5 | 16 carousel copies | 2 implementations |
| B-6 | 204 arrow sites | 4 shared sites (+ a gate); **0 live defects** |
| B-7 (probe) | 66 classified as convertible | 62 that actually own the result |
| B-7 | 174 physical declarations | 62 to convert; 95 no-ops + 4 dead |

That is no longer coincidence, and the useful phrasing is not "inventories
exaggerate":

> **An inventory identifies candidates. Classification determines work.**

The inventory tools are broad discovery mechanisms and are correct to be — a
census that pre-filtered to the actionable set would have hidden the
`left: 0; right: 0` population whose *absence* of work is itself the finding. The
error is treating a census row as a work item.

B-7 adds a corollary the previous two did not show. Every earlier phase moved in
the same direction: the real number was always **smaller**. Here it moves both
ways at once — 174 down to 66 by classification, then back up by 9 the census
never saw, five of which are the missing half of pairs it did see. **A census can
be wrong in both directions simultaneously, and the direction that adds work is
the one that breaks the layout if you miss it.** This is the seventh instance of
"a recorded size is a hypothesis about the measurement window" — but the first
where widening the window was the load-bearing move rather than narrowing it.

And a second corollary, from §5.1: **a classification is a set of predictions, so
it can be measured against the rendered page — and should be, once one exists.**
Five held; the sixth did not, and it was the one this document argued most
confidently, singled out as the sharpest finding of the phase. The reasoning was
correct CSS and wrong about *this* stylesheet, because it never checked whether
something upstream had already settled the question. The general form:

> Reasoning about what a declaration *should* do is not a measurement of what it
> *does*. Where a rendered surface exists, the classification is falsifiable —
> and the item you are most confident about is the one worth testing first.

Which is the same lesson Track A learned by reproducing ADR-10's numbers before
implementing from them, arriving from the opposite side: there, reproduction
changed the rule; here, reproduction killed a finding.

---

## 8. What the sweep is

62 declarations, 11 files:

- `public/styles.css` — the great majority
- `src/components/content/TourDecisionGuide.astro` — `.tdg-link` accent border
- `src/layouts/AuthorLayout.astro` — `.author-credentials ul` indent
- the 8 `things-to-do/best-restaurants-vernal-utah.astro` locale clones —
  `.cuisine-badge`, `.discount-tag`, `.coupon-modal-close` (3 sites × 8 files;
  a de-duplication candidate on B-5a's precedent, but out of B-7's scope)

Proof obligations for that commit, following B-5a and B-6:

1. `astro check` 0/0, `npm run build` 620 pages, all gates green.
2. An **isolated** dist differential — snapshot, revert only my own file list,
   rebuild, restore, diff. The tree must not change underneath the two builds
   (ADR-11 §5.1, one level up: B-6's first differential was void because the `k`
   bot and a parallel workstream moved 25 files between the baseline and the
   after build).
3. Because logical properties are a *no-op* in the 8 LTR locales, the LTR pages
   must come out **byte-identical**, and the whole visible delta must be on
   `/ar/`. That is a sharper proof than B-6 had, and it is only available
   because the 95 no-ops are excluded — sweeping them would have moved bytes on
   every locale for no rendering change.
4. **The before-state is now measured, not assumed** (§5.1). The same CDP probe
   re-run after the sweep is the after-check: each of the 21 live declarations
   has a recorded computed value and bounding box to compare against, which is a
   stronger check than a screenshot diff. ⚠ Two of the six groups
   (`.dropdown-menu`, `.lang-menu`) compute `opacity: 0` at rest, so the
   after-check must force the hover state — a resting screenshot cannot see
   eight of the 21.
5. ⚠ **`.crowd-col.moab-col` must convert base *and* its `max-width: 1024px`
   `border-right: none` override together**, or the override stops cancelling in
   RTL and a 3px divider reappears on the opposite edge at the narrow
   breakpoint. Third pair of this kind in the phase (§4.2, §5.1).
