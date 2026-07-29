# AR-2 B-6 — directional affordance arrows

**Status: COMPLETE 2026-07-28.** Two deliverables: a shared direction-aware
helper consumed by the four rendered chrome sites, and gate 4o, which makes the
rule enforceable at authoring time. **No existing LTR content was edited**, by
decision and on evidence.

The brief's "204-edit sweep" is **retired**. §2 is why.

---

## 1. What the brief asked for

`AR2-TrackB-brief.md` §6 sized B-6 as *"204 source / 256 rendered `→`, plus 8 `▶`.
7 shared component files, 34 content files"* and called it **the clean
promotion** — *"the classification is a Unicode property, not a judgement, so it
cannot mis-classify."*

That last clause is true and is exactly what went wrong. `Bidi_Mirrored=No` is a
fact about the *glyph*. It is not a fact about the *defect*, and the two
populations are not the same size.

---

## 2. The census, re-run

204 source occurrences in `src/` + `public/` (210 including `scripts/`, which the
inventory tool does not scan — the two reconcile exactly, which is what says the
recount is sound).

| population | count | rendered? | in an RTL document? |
|---|---:|---|---|
| comments and tooling output | **64** | no | — |
| LTR-locale content | **136** | yes, on LTR pages | no |
| shared chrome | **4** | yes, on every locale | **yes** |

**64 of 204 are comments.** All 38 in `src/lib/ui.ts` are glossary notes
(`"Key Takeaways" → 要点まとめ`); all 4 in `home-gallery.ts` are the same.

Worse for the brief's "7 shared component files": of the six components AR-1
named as carrying chrome arrows, **three carry only commented ones** —
`SpokeArticle.astro`, `ItineraryArticle.astro` and `RelatedArticles.astro`. The
real shared-chrome surface is **4 sites in 3 files**.

### 2.1 The finding that retired the sweep

The remaining 136 are per-locale content: `home.ts`'s eight locale blocks, eight
copies of `scenic-drives/index.astro`, four MDX families × 8 locales. **Not one
of those eight locales is RTL.**

Measured against `dist/`, not assumed: `ar` renders **1 route**
(`/ar/cancellation-policy/`) carrying **0 arrows**.

> **All 256 rendered `→` are on LTR pages, where they point correctly.
> B-6 had zero live defects.**

A sweep would have rewritten 136 correct sites to no observable effect. You
cannot fix `→` in German.

### 2.2 The pattern, third instance

| phase | the inventory counted | the defect actually was |
|---|---|---|
| Track A | mirrored characters | isolation failures (**~70% FP** on the obvious rule) |
| B-5 | duplicated code | independent implementations (**0** — all 16 byte-identical) |
| B-6 | arrow glyphs | affordances that reach an RTL document (**4 of 204**) |

Same correction each time: the measurement that decides the work has to separate
*populations*, not count *occurrences*.

---

## 3. Deliverable 1 — the helper

`affordanceArrow(code)` in `src/lib/i18n.ts`, beside `isRtl()`. Returns `→` for
LTR, `←` for RTL.

It lives in `i18n.ts` and **not** in the `ui.ts` dictionaries because it is not a
translation — it is derived from `dir` and nothing else. Per **ADR-9**, direction
is decided once in the registry; a component branching on a locale *code* to pick
a glyph would be a second source of truth for the same fact. Registering a second
RTL locale must be sufficient to make every affordance on the site point the right
way, with no edit to any component.

The four sites now consume it:

| file | site | was |
|---|---|---|
| `TourDecisionGuide.astro:45` | `.tdg-arrow` decorative span | `→` |
| `GatewayRoutes.astro:55` | `.gr-arrow` decorative span | `→` |
| `GatewayRoutes.astro:62` | "see all itineraries" link | `&rarr;` |
| `ItineraryDay.astro:33` | "weather backup" link | `&rarr;` |

---

## 4. Deliverable 2 — gate 4o

`scripts/gate-4o-affordance-arrows.mjs`, wired into `gates:src` beside 4j. Source
-level, no `dist/` dependency, runs before `astro build`. Exit 2 structural / 1
findings / 0 pass.

**The discriminator is flanking, not the glyph.**

```
relation   := real text on BOTH sides      "Vernal → Flaming Gorge"
affordance := anything else                "Book Lodging →"   "<span>→</span>"
```

Deliberately the same shape as the **ADR-10** isolation rule — an arrow with
content on both sides is relating two things; an arrow at the edge of its run is
labelling a control. Decidable from source, no judgement, therefore promotable.
It is also the property `Bidi_Mirrored` could never have supplied.

**Scope is two populations, both derived from the host registry** — never a
hardcoded `'ar'`:

1. `src/components/**`, `src/layouts/**` — render for every locale, so a literal
   there is already wrong for any RTL locale.
2. Files that render only into an RTL locale (`src/pages/<rtl>/**`, `*.<rtl>.mdx`).

LTR-only content is **out of scope by decision, not omission**, and the gate
prints that decision on every success — the same reason 4j prints its exemptions.
An exclusion nobody sees decays into a suppression list.

Comment stripping is **load-bearing, not hygiene**: three of the components in
scope carry only commented arrows, so without it the gate fails on a correct tree.

**Only the pairs the algorithm won't mirror** are in the glyph set (`→ ← ▶ ◀`).
The 1,004 rendered `›` chevrons are `Bidi_Mirrored=Yes` and need zero work;
including them would have resurrected the 204-finding gate that measurement just
rejected.

---

## 5. Why relation arrows stay a content concern

This is the one place a single rule would have been wrong.

`Vernal → Flaming Gorge` is not a control. It is a from/to relation between two
Latin proper nouns sitting in body copy. In an Arabic document its rendered
correctness depends on how the bidi algorithm resolves the runs *around* it —
whether the place names are isolated, what the flanking types are — which is
precisely **gate 4n's** question and precisely what **ADR-10** is about. Swapping
the glyph to `←` would not make `Vernal ← Flaming Gorge` correct; it would assert
a reversed relation.

So the two gates answer different questions and stay loosely coupled:

| gate | question |
|---|---|
| **4n** | is this rendered text correctly isolated? |
| **4o** | is a directional UI affordance authored through the shared abstraction? |

4o counts relation arrows in scope and reports them; it never fails on one.

⚠ **This is unresolved, not solved.** When Arabic content expands onto the
route/table pages, someone has to decide what `Vernal → Flaming Gorge` should look
like in Arabic prose. That is an authoring and bidi question for the Arabic
content phase, and it now has a place to be asked rather than being silently
swept into a glyph swap.

---

## 6. Evidence

- **Gate 4o found exactly the 4 sites** on the unfixed tree — independently of the
  manual census, which had found the same 4. Two derivations, same answer. It
  ignored all 64 comment arrows, including those in `src/components/`.
- **29 fixtures** (`npm run test:4o`) pin both directions of the claim: affordance
  caught; relation, comments and pre-mirrored glyphs left alone; scope follows the
  registry, including a synthetic second RTL locale.
- **Live negative control.** A probe `.ar.mdx` carrying an affordance arrow *and* a
  relation arrow was planted: the gate failed on line 5 (affordance) and ignored
  line 7 (relation). Probe removed.
- `astro check` — 0 errors, 0 warnings, **268 hints (unchanged)**.
- Full build 620 pages, **exit 0**, every gate green: `gates:src` (4j, 4o) and
  `gates:dist` (`validate-site`, 4m, 4k, 4n, 4f, 4h, 4i, 4g).

### Why the fixtures exist

Gate 4o passes on the current corpus. So would a gate that found nothing, and so
would a gate that called every arrow content. A green run against a clean tree
tests neither direction of the claim. This is the Track A lesson — there, the
differential test was the deliverable because the *rejected* rule also passed the
corpus.

---

## 7. Rendered effect

Byte-identity was *not* achievable here and was not the acceptance test (unlike
B-5a): the two link-text sites necessarily change `&rarr;` to the literal `→` —
the same character, a different spelling. So the acceptance test is that the diff
contains **nothing but** that normalization.

Measured:

```
differing files                        8
changed lines that are NOT an arrow    0
lines that lost  &rarr;                8
lines that gained the literal →        8

corpus-wide   &rarr;   24 → 16   (−8)
corpus-wide   literal  232 → 240 (+8)
              total    256 → 256  INVARIANT
```

The total arrow count is conserved; only the spelling moved, on the 8 pages
carrying `GatewayRoutes`'s hub link or `ItineraryDay`'s backup link. The two
decorative spans are byte-identical — the helper returns `→` for all eight LTR
locales, so nothing about them changed.

The 16 `&rarr;` that remain are `home.ts`'s badge buttons, which the census
predicted and which B-6 deliberately did not touch. That they are still there is
itself evidence no content was swept.

### 7.1 ⚠ The first differential was void, and the reason generalizes

The tree was **not constant across the two builds**. An external process
committed `f3ac1f1` (ambient media, plus a Best Western discount-code change from
`"Adventure Tours"` to `"ROCCO"` across all 8 locale blocks of `home.ts`) between
the baseline build and the after build, and a parallel workstream had further
uncommitted edits to `public/llms.txt`, 8 `moab-utv-tours.*.mdx` and 8
`ultimate-guide-to-vernal-utah.*.mdx`. The first differential reported **33**
differing files; **25 of them were somebody else's work.**

ADR-11 §5.1 established that a byte-identity proof must be a *within-tree*
before/after. This is the same invariant one level up: **within-tree is not
sufficient if the tree changes underneath you.** A differential is only evidence
if the *only* thing that differs between the two builds is the change under test.

The fix was to isolate rather than to re-run: snapshot the after-`dist`, revert
**only the four files B-6 touched** (`git checkout --` on an explicit path list,
never a stash or a clean, which would have taken the parallel workstream's edits
with it), rebuild with `npx astro build` — `npm run build` would have aborted at
gate 4o, correctly, since reverting the fix restores the four literals it exists
to catch — then restore the four files and diff the two snapshots. The parallel
edits are present and identical in both builds, so they cancel.

---

## 8. What B-6 did not do

- **No LTR content edits.** 136 correct sites untouched.
- **The 8 `▶` play glyphs in `home.ts` are untouched** — LTR content, same
  reasoning. They are in the gate's glyph set, so the moment one appears in shared
  chrome or Arabic content it is caught.
- **`rtl-inventory.mjs` is not promoted.** With gradients and `rotate` ruled out
  and arrows now split into two populations, `mirror-required` is no longer a
  single promotable class. 4o promotes the half that is decidable; the other half
  belongs to 4n.
