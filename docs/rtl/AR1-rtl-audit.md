# AR-1 Deliverable 1 — RTL audit

Reproduce with `node scripts/audit/rtl-inventory.mjs` (add `--json` for the
machine-readable form, `--full` for per-rule file lists). The script is an
**audit, not a gate**: it always exits 0 and is deliberately not wired into
`npm run build`. Whether any of its findings should become blocking is an AR-2
decision.

Measured against `c57daef` (pre-registration baseline), 677 source files and
620 rendered files.

---

## 0. The method is the first finding

Source grep alone is not the audit, and the brief's instruction — *if the source
and rendered counts differ, the audit method is the finding* — turned out to
name the central result rather than a caveat.

The two corpora disagree by a factor that is **different for every authoring
surface**, and the factor is the useful signal:

| Rule | source | rendered | ratio | why |
|---|---:|---:|---:|---|
| `glyph:▾` | 6 | 1235 | **206×** | Header dropdown caret — one component, every page |
| `glyph:›` | 81 | 1004 | 12× | Breadcrumb separator — one component, every crumb |
| `box-physical` | 26 | 224 | 8.6× | Astro inlines each component's `<style>` into every page that mounts it |
| `glyph:·` | 236 | 1485 | 6.3× | Footer separators |
| `gradient-directional` | 216 | 681 | 3.2× | Mixed: global CSS once, component CSS fanned out |
| `inset-physical` | 145 | 145 | **1.0×** | Authored inline — `public/styles.css` is copied verbatim, and `page-content` template literals emit 1:1 |
| `dir-attribute` | 1 | **0** | **0×** | *see §1* |

Three distinct laws in one repository:

1. **Global CSS** (`public/styles.css` → `dist/styles.css`) — copied verbatim, 1:1.
2. **Component-scoped CSS** — inlined per page, fan-out ≈ number of pages
   mounting the component.
3. **Authored inline HTML/CSS** inside `page-content/*.ts` — 1:1, but *invisible
   to a `--include=*.css` scan*, which is how a source-only audit under-reports.

So neither number is "the" count. `sourceHits` is the number of things to
**edit**; `renderedHits` is how much of the site is **affected**; and
`renderedDistinct` (occurrences deduplicated by matched text) is the only
rendered figure comparable to a source count.

### 0.1 Glyph classification is derived, not asserted

Directional punctuation splits into two populations that behave *oppositely*
under bidi, and the split is a Unicode character property rather than a
judgement call:

```
›  U+203A  Bidi_Mirrored=Yes  -> flips automatically inside RTL. No action.
‹  U+2039  Yes                -> no action
»  U+00BB  Yes                -> no action
«  U+00AB  Yes                -> no action
(  U+0028  Yes                -> no action, and see the phone-number hazard
→  U+2192  Bidi_Mirrored=No   -> keeps pointing the wrong way. MUST be mirrored.
▶  U+25B6  No                 -> MUST be mirrored
▾  U+25BE  No, but vertical   -> nothing to mirror
```

The audit asks the Unicode database through `\p{Bidi_Mirrored}` rather than
carrying a hand-written list, so adding a glyph to the scan cannot mis-classify
it. This matters because intuition gets it backwards: the breadcrumb chevron
(`›`, 1004 rendered occurrences) looks like the biggest mirroring job on the site
and needs **zero** work, while the 256 `→` arrows look decorative and need all of
it.

### 0.2 One census axis change halved the workload

The raw `left:`/`right:` census returned **713**. Splitting on the *value* rather
than the property showed **568 of them are `left:-9999px`** — the
visually-hidden `page-summary` clip, which hides content off *either* edge and is
functionally direction-neutral. The actionable inset count is **145**, not 713.

This is the recurring lesson from the P-series arriving again: a recorded item
size is a hypothesis about the measurement window. The fix was re-censusing on a
different axis (value, not property), not adjusting a threshold.

---

## 1. The headline divergence: `dir` is source-only

```
dir-attribute    source 1    rendered 0    [source-only]
```

`BaseLayout.astro:49` computes `const dir = isRtl(lang) ? 'rtl' : undefined` and
emits `<html lang={lang} dir={dir}>`. Because no registered locale had
`dir: 'rtl'`, Astro omitted the attribute from **all 619 pages**.

The consequences are worth stating separately, because they are easy to conflate:

- The direction machinery was **present and correct** in source, and had been
  since P1. Registration was genuinely the only missing input.
- The rendered corpus therefore contained **zero RTL evidence**. Every "does this
  survive RTL?" question was unanswerable by observation until the pilot page
  existed — which is exactly why AR-1 required a pilot page rather than an
  analysis.
- Any gate that reads `dist/` was, by construction, measuring an all-LTR corpus.
  It could not have been RTL-aware even in principle. See the gate
  characterization for what that implies now that it isn't.

---

## 2. Classified inventory

Counts are source / rendered. `MECH` = mechanical, no visual decision needed.

### 2.1 `mirror-required` — must actively flip under `dir="rtl"`

| Rule | src | rend | Notes |
|---|---:|---:|---|
| `glyph:→` (`&rarr;`, `→`) | 195 | 256 | `Bidi_Mirrored=No`. Chrome instances in `GatewayRoutes`, `ItineraryDay`, `RelatedArticles`, `TourDecisionGuide`, `SpokeArticle`, `ItineraryArticle`; the rest are body copy in `page-content/home.ts` badge buttons and MDX. |
| `translate-directional` | 31 | 29 | **16 are the carousel track** (`translateX(-${index * 100}%)` × 8 in `home.ts`, `translateX(-' + (current * 100)` × 8 in `utv.ts`). 2 are `translateX(3px)` hover nudges. 13 more in `public/styles.css`. |
| `gradient-directional` | 216 | 681 | 89 × `135deg`, 8 × `90deg` in source. Diagonal/horizontal gradients are a visual direction cue; the vertical (`to bottom`) majority is excluded and counted as neutral. |
| `glyph:▶` | 8 | 8 | `page-content/home.ts` only. |
| `rotate()` | 13 | 13 | **See §2.1.1 — the pattern over-classifies these.** |

#### 2.1.1 The one place the mechanical classifier is wrong

All 13 `rotate()` hits resolve, on inspection, to **rotations of symmetric
glyphs**:

- `rotate(90deg)` on close buttons (`×`) — `.floating-video-close`,
  `.bw-badge-close`, `.hcl-badge-close`, `.coupon-modal-close` × 8 locales
- `rotate(180deg)` on the FAQ `+`/`−` toggle
- `rotate(-2deg)` on the logo hover

None encodes reading order; all are **direction-neutral in effect**. The
script's class is a *hypothesis produced by a pattern*; this file carries the
reviewed verdict. Keeping the two separate is deliberate — silently reclassifying
in the script would make the next run's count unauditable.

**Reviewed mirror-required total: 500 source occurrences across 4 rules
(13 `rotate` reclassified to direction-neutral).**

### 2.2 `logical-property-replacement` — MECH

| Rule | src | rend | Notes |
|---|---:|---:|---|
| `inset-physical` | 145 | 145 | After excluding the 568 off-screen-clip hits (§0.2). `inset-inline-start` / `-end`. |
| `box-physical` | 26 | 224 | `margin`/`padding`/`border`-`left`/`right`. `public/styles.css` (20), `TourDecisionGuide`, `TrustBadge`, `AuthorLayout`. The 8.6× fan-out means each of the 6 component-level edits fixes ~33 rendered pages. |
| `text-align-physical` | 3 | 3 | `public/styles.css:400`, `:885`, `:1097`. All `text-align: left` → `start`. |
| `float` / `clear` | 0 | 0 | **Zero.** No float-based layout anywhere. |

### 2.3 `bidi-sensitive`

| Rule | src | rend | Notes |
|---|---:|---:|---|
| `dir-attribute` | 1 | 0 | §1. The single source is `BaseLayout.astro:49`, reading `LOCALES[].dir`. |
| `<bdi>` / `<bdo>` | 0 | 0 | **Zero isolation existed anywhere.** This is a finding, not an absence: nothing isolated `(435) 219-9447`, `$349`, or any Latin brand run. |
| bidi control chars (LRM/RLM/LRI/RLI/FSI/PDI) | 0 | 0 | Clean. The bidi invariant starts from zero, which is the good case. |
| `unicode-bidi` | 0 | 0 | — |
| `flex-direction: row-reverse` | 0 | 0 | **Zero.** No double-reversal hazard. |
| `order:` | 0 | 0 | **Zero.** No flex re-sequencing to reason about. |

### 2.4 `direction-neutral` — no action

`offscreen-idiom` 568 · `text-align: center|justify` 781 · `flex-direction: column`
43 · `translateX(-50%)` centering 8 · `glyph:›` 81/1004 · `glyph:‹` 16 ·
`glyph:»` 62 · `glyph:«` 62 · `glyph:▾` 6/1235 · `glyph:·` 236/1485
· plus the 13 reclassified `rotate()` from §2.1.1.

The `«`/`»` population is French locale quotation marks; they auto-mirror and
never appear in Arabic prose anyway.

### 2.5 `intentional-ltr`

**Empty.** No CSS `direction:` override exists anywhere in the repository. The
runs that *will* need to resist page direction — Latin place names, `$1,000`,
`(435) 219-9447`, URLs — are currently unmarked. That is what §2.3's zero
`<bdi>` count means in practice.

### 2.6 Surfaces confirmed absent

Checked and genuinely not present, so AR-2 need not budget for them:

- **SVG** — zero inline `<svg>` in site source. Every `<svg` hit in `src/` is
  inside stray `src/content/*/node_modules/.vite/` dev-toolbar bundles.
- **Icon fonts / sprite sheets** — none.
- **`float` / `clear` layout** — none (§2.2).
- **`flex-direction: row-reverse`, `order:`** — none (§2.3).

---

## 3. Named findings

| # | Finding | Class | Size |
|---|---|---|---|
| **R-1** | Carousel track is driven by `translateX(-N%)` with a hardcoded sign, in 16 places. Under `dir="rtl"` the flex track fills right-to-left while the transform still moves left — slides advance the wrong way and the first slide is off-screen. | mirror-required | 16 |
| **R-2** | `.carousel-prev { left: 20px }` / `.carousel-next { right: 20px }` (× 2 breakpoints) pin the affordances to physical edges, so "previous" sits on the leading edge in RTL. | logical | 4 |
| **R-3** | 256 rendered `→` arrows (`Bidi_Mirrored=No`) point into the start of the line in RTL. 6 of them are shared chrome components; the rest are body copy. | mirror-required | 256 |
| **R-4** | Zero bidi isolation site-wide. `(435) 219-9447` is the worst case — `(` and `)` are `Bidi_Mirrored=Yes`, so the brackets resolve backwards inside Arabic prose. Highest-frequency CTA on the site. | bidi | site-wide |
| **R-5** | `dir` never reached rendered output before AR-1, so **no `dist/`-reading gate has ever seen an RTL page.** Direction-blindness in those gates was structural, not an oversight. | bidi | 619 pages |
| **R-6** | 174 physical box/inset/text-align declarations are mechanical logical-property swaps, but the 8.6× component fan-out means the *edit* count (26) and the *impact* count (224) differ by an order of magnitude. Estimating from either alone is wrong. | logical | 174 |
| **R-7** | `404.astro:36` hardcodes `Information ▾` outside `t()`. Pre-existing, documented in that file; noted because it is one of the few chrome strings no dictionary can reach. | — | 1 |

---

## 4. External check — ParkingWay (read-only)

`c:\Users\deluc\Documents\parkingwayastro`, examined without modification. It is
a genuinely independent implementation of the same idea on the same stack, and
it already ships a live `ar/` route tree — so it answers questions Adventure
could not answer before the pilot existed.

**What it confirms**

| Observation | Bearing on AR-1 |
|---|---|
| `<html lang="ar" dir="rtl">` from `LOCALES[].dir` via `isRtl()` | Same mechanism, independently arrived at. The registry-driven direction shape is not an Adventure idiosyncrasy. |
| **Zero `[dir="rtl"]` selectors, zero RTL stylesheet** | Directly answers the AR-1 stop condition *"RTL requires a second stylesheet"*. A shipping RTL site on this stack does not have one. |
| 20 × `dir="ltr"` + 3 × `dir="rtl"` in rendered output, **all** tracing to `LanguageSwitcher.astro:63 dir={l.dir}` | The direction invariant ("no component branches on locale code") holds in a real RTL deployment. It also demonstrates the per-option `lang`/`dir` pattern Adventure's switcher lacks — see AR-2 **B-4**. |
| **Zero Arabic-Indic digits** across its Arabic pages (`100 يورو`, `15%`, `24/7`, `2000`) | Independent precedent for AR-1 §3's Western-digit policy. |

**What it warns about — a live RTL route is not a correct one**

| Observation | Implication |
|---|---|
| **Zero `<bdi>`/`<bdo>`/LRM/RLM**, while `+39 327 1864779`, `Facebook`, `Breve Sosta PT3` and `Fiumicino` sit bare in Arabic prose | The exact R-4 defect, shipped and unnoticed. Isolation does not happen by default and nothing complains. |
| Physical properties survive into the rendered Arabic page: `border-left` ×2, `padding-left`, `padding-right`, `left:` ×5 | Partial logical-property migration (13 logical vs 19 physical in source) reads as "done" and is not. |
| Untranslated Italian chrome on the Arabic page: `Vai al contenuto` (skip link), an entirely Italian `<title>`, `Italiano` | **Gate 4a's failure mode, live in production on a sibling host.** The strongest available argument for AR-1's chrome invariant — dictionary first, corpus second. |

**Method limit, recorded honestly:** ParkingWay builds SSR (`dist/client` +
`dist/server`), so its comparison is only available for the static prerendered
`dist/client/ar/**` pages. Its CSS bundles were also inspected directly. Nothing
in this section was measured through a running server.

---

## 5. What AR-1 changed, and what it did not

Re-running the audit after AR-1 moves exactly two rules, which is the smallest
possible proof that the phase did what it claimed:

| Rule | Before | After | |
|---|---|---|---|
| `dir-attribute` | 1 src / **0** rendered `[source-only]` | 3 src / **1** rendered | §1 no longer holds of the whole corpus |
| `bdi-bdo` | **0** / 0 | 12 src / **10** rendered | isolation exists, on one page |

Every other rule is unchanged. The three source `dir` sites are `BaseLayout`
(the emitter) and two `docs`-adjacent references; the ten rendered `<bdi>` spans
are the pilot page's `(435) 219-9447` ×2, `$1,000` ×2 and one Latin brand run,
counted open-and-close.

**Changed:** `dir="rtl"` now reaches one rendered page; `<bdi>` isolation exists
on the pilot page.

**Not changed — deliberately, per the brief's "do not fix them":** every finding
in §3. R-1 through R-6 are AR-2 work. This audit is the backlog's evidence base,
not its execution.
