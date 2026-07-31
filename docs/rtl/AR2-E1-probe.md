# AR-2 Track E, E-1 — the single-file registration probe

**METHOD citation:** rules 1 · 3 · 4 · 8 · 11 · 14 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. One Arabic spoke authored and registered; build green, all 11 gates.
**Baseline:** `b6c0eb7` (E-0). **Corpus before:** 620 pages, `ar` 1 route / 4 254 chars.

E-1's stated purpose was an invariant check, not a content milestone. It produced the
invariant check, the chrome constant E-0 could only bound, **two live defects that no
prior phase could see**, and one gate positive that had never fired on Arabic prose.

---

## 1. The deliverables

| | |
|---|---|
| Page | `src/content/utv/best-utv-trails-vernal.ar.mdx` |
| Registration | `AR_SLUGS` += `'utv/best-utv-trails-vernal'` ([`src/lib/i18n.ts:501`](../../src/lib/i18n.ts#L501)) |

Slug form is `utv/<base-id>`, the convention `ZH_SLUGS` documents in its own header. Both
deliverables landed together, per the two-deliverable rule.

---

## 2. Acceptance — measured

| # | Criterion | Result |
|---|---|---|
| A2 | Route delta **exactly +1** | 620 → **621**. `validate-site: ✔ 621 pages — links resolve, no orphans` |
| A5 | New page renders effective direction `rtl` | gate 4k: `ar rtl 2 pages (2 explicit)` |
| A6 | Zero isolation findings | gate 4n: `✔ 2 rtl page(s) … no unisolated mirrored character` — **after** §3 |
| A7 | Zero Arabic-Indic digits | gate 4q ✔, `ar` 0 occurrences |
| A9 | 4f/4g `ar` stay in-progress | gate 4f: 2 advisories, non-blocking (see §6.1) |
| A10 | `ar` stays gallery-exempt | gate 4j: `1 locale(s) render no gallery: "ar"` |
| A12 | Gate 4o population grows, 0 findings | `36 in-scope file(s) — 0 literal affordance glyphs` |
| — | **Gate 4q's `ar` char count must move** | **4 254 → 12 885** (+8 631). The page is traversed; the run is not vacuous |

Gate 4m reported `32 page(s) with video across 621 scanned` with no error — the new route
carries 0 videos, which is exactly the case E-0 flagged (A11) as the one where a forgotten
re-baseline is invisible. It is recorded here rather than inferred from a green line.

Gate 4i: `52 glossary locks across 8 locales verified on 541 rendered pages`, 11 advisory
occurrences across 3 locks — **all `es`**, none `ar`, pre-existing and unrelated to E-1.

---

## 3. ⚠ Gate 4n fired on Arabic prose for the first time — and the cause is structural

The first build **exited 1**, on exactly one site in the whole corpus:

```
gate-4n: 1 unisolated mirrored character(s) at a direction change, on 1 page(s)

Route:     /ar/utv/best-utv-trails-vernal/   (ar, declared rtl)
  "(" in <div>  flanked R … N
      وللاستفسار عن أسعار المجموعات، الرقم هو (435) 219-9447.
```

**This is the positive control the instrument needed, delivered by the corpus rather than
staged (rule 4).** Gate 4n's own header records that a green run is not evidence it works,
because it has guarded one Arabic route with a near-zero same-flank population since it
landed. It has now produced a true positive on real prose, then gone green on the fix. Its
verdicts are citable in a way they were not before this page existed. No artificial
negative control was needed and none was run.

**All 65 authored `<bdi>` sites passed.** The single failure is in the one place `<bdi>`
cannot be written.

### 3.1 The collision — three requirements, any two

[`FaqAccordion.astro:13`](../../src/components/content/FaqAccordion.astro#L13) renders
`<div class="faq-answer">{a}</div>`. Astro escapes an interpolated expression, so markup
written into `faq[].a` arrives as literal text. Therefore:

1. **Policy §3.2** — `(435) 219-9447` is preserved **exactly**; `$349` is written
   symbol-first, verbatim, *"never `349 دولار`"*.
2. **Policy §5.2 / ADR-10** — a mirrored character at a direction change must be isolated.
3. **The delivery mechanism** — `{a}` is escaped, so neither `<bdi>` nor `src/lib/bidi.ts`
   can reach the string from content.

Any two hold; all three cannot. That is rule 11 in its exact form: what can be fixed is
decided by *how the text is delivered*, not by what the text says. Gate 4n's own remedy
line — *"Fix by asking `src/lib/bidi.ts` for the run … never by inserting `<bdi>` at the
call site"* — is unreachable here, because the component escapes whatever the formatter
returns. **The owner of the result is the component (rule 3), not the content.**

### 3.2 It scales — this blocks E-2

Measured across the 9 pilot files' English sources:

| | Count |
|---|---|
| Pilot files with parentheses in FAQ answers | **8 of 9** |
| Pilot files with `(435) 219-9447` in FAQ answers | **7 of 9** |
| Parenthesis characters in the 9 files' FAQ blocks | **27** |
| English spokes site-wide carrying `faq:` frontmatter | **56** |

So the remaining 8 pilot files each reproduce this defect, and the §7 expansion reproduces
it 56 times. The authoring workaround used below does not generalise: applying it corpus-
wide means systematically deleting the phone number and every parenthetical from Arabic
FAQ answers, which is a content policy nobody decided.

**Filed as B-15. E-2 should not start until it is resolved.**

### 3.3 ⚠ What E-1 did instead, recorded as a deviation (rule 14)

The Arabic FAQ answer drops the phone sentence and directs the reader to contact
`Adventure Tours Vernal` instead. The number still renders **twice** on the page, isolated,
in the page summary and the tip box. This violates no policy — §3.2 governs the *shape* of
a phone number when written, not whether a given sentence must contain one — but it is a
deliberate content deviation from the English source and is not to be read as the pattern
for E-2. It is visible in the per-term alignment in §5 as the `-1` on the phone row.

### 3.4 A hazard in the same text that **no gate can see**

`$349` and `$125` remain in the Arabic FAQ answers, un-isolatable by the same mechanism.
Gate 4n did **not** flag them, correctly: `$` is `Bidi_Mirrored=No`, and ADR-10's invariant
is scoped to mirrored characters. Whether `$349` resolves correctly beside Arabic is a
question about `Intl`-free authored text that **no instrument in this repository
currently answers**. It is recorded as an open measurement, not as a finding — confirming
it needs the browser probe (`scripts/rtl/probe.mjs`) against the live route, which E-1 did
not run. Listed in §7.

---

## 4. The chrome constant — E-1's headline measurement

E-0 could only bound this from `/ar/cancellation-policy/`, and flagged its own numbers as
`≥` predictions because that page is an inline page that **renders no `<main>` at all**.
The spoke layout does. Measured through `visibleText@1`, the same view as gates 4h/4i/4q:

| Page | whole | body (`<main>`) | **chrome** |
|---|---|---|---|
| `ar` spoke `/ar/utv/best-utv-trails-vernal/` | 8 631 | 7 643 | **988** |
| `en` spoke `/utv/best-utv-trails-vernal/` | 10 311 | 9 313 | **998** |
| `ar` inline `/ar/cancellation-policy/` | 4 254 | — (no `<main>`) | — |

Arabic spoke chrome is 988 characters against English's 998 — the layouts carry
essentially the same chrome mass.

### 4.1 ⚠ Both of E-0's per-term chrome predictions are falsified (rule 8)

| Term | E-0 predicted `ar` chrome/page | **E-1 measured, spoke** | Verdict |
|---|---|---|---|
| `Vernal` | 7 | **6** | falsified |
| `(435) 219-9447` | 4 | **2** | falsified |

The error is one E-0 named in advance and could not resolve: those figures were
**whole-page counts taken on a page with no `<main>`**, so they silently included that
page's own body content. They were never chrome constants. The census recorded them as
hypotheses about a measurement window; this is the window that settles them.

Full per-term chrome on the `ar` spoke: `Vernal` 6 · `(435) 219-9447` 2 ·
`Dinosaur National Monument` 1 · `Doc's Beach` (ASCII) 1 · `Moonshine Arch` 1 ·
`Outlaw Trail` 1 · `Asphalt Ridge` 1 · `أرض الديناصورات` 1 · `المسارات` 1 ·
`Kawasaki KRX 1000` 0 · `$349` 0.

### 4.2 ⚠ The chrome figure is itself two populations, and B-14 is why

Of the 6 chrome `Vernal` occurrences, **2 are the `<title>` element** — the Arabic title
`أفضل مسارات UTV قرب Vernal في يوتا | Adventure Tours Vernal` carries the word twice. The
English spoke measures 6 for the same reason. So:

> **nav + footer constant = 4 `Vernal` per page; `<title>` adds a per-page variable amount.**

E-0 raised B-14 (`<title>` text is inside the `visibleText@1` window) and filed it rather
than fixing it. This is the measurement that makes it load-bearing: a floor written over
the whole-page window mixes a **constant** (nav/footer), a **per-page variable** (title),
and the **prose** it is supposed to measure. A comparison that cannot separate them cannot
distinguish the answers it is being asked to decide between (rule 18).

### 4.3 Updated floor inputs for E-4

`ar` corpus is now 2 pages. Observed 4i lock totals: `dinosaur-country` **4**
(1 inline + 3 spoke), `offroad-trail` **7** (1 + 6). Both floors are still **1**.

**The E-0 finding that both locks are 100 % chrome no longer holds for the corpus going
forward.** On this page `dinosaur-country` measures body 2 / chrome 1 and `offroad-trail`
body 5 / chrome 1 — the first prose occurrences either lock has ever had. They become
genuine corpus locks the moment prose exists, which is the outcome E-0 predicted would
require exactly this page to test.

Projection for the 10-page pilot corpus: chrome contributes **1 per page per lock = 10**.
A floor of 10 would therefore again be satisfiable by chrome alone. **Any E-4 floor for
these two locks must exceed 10**, and the margin above 10 is the only part that measures
translator output.

---

## 5. Per-file `en` ↔ `ar` alignment — the method that closed German

Body window only, so chrome is excluded on both sides.

| Term | `en` body | `ar` body | Δ |
|---|---|---|---|
| `Doc's Beach` (ASCII) | 2 | 2 | **0** |
| `Doc’s Beach` (curly) | 5 | 5 | **0** |
| `Moonshine Arch` | 5 | 5 | **0** |
| `Outlaw Trail` | 4 | 4 | **0** |
| `Asphalt Ridge` | 4 | 4 | **0** |
| `$349` | 4 | 4 | **0** |
| `Dinosaur National Monument` | 0 | 0 | **0** |
| `(435) 219-9447` | 3 | 2 | **−1** |
| `Kawasaki KRX 1000` | 8 | 6 | **−2** |
| `Vernal` | 31 | 24 | **−7** |

**Five §4.2 wayfinding names align exactly**, which is the strongest available evidence
that policy §4.2 survived contact with a translator. The three deltas are each accounted
for and none is a policy violation:

- **phone −1** is the §3.3 deviation, exactly.
- **`Kawasaki KRX 1000` −2** — the Arabic uses the short forms `KRX 1000` and `KRX` at two
  sites where the English repeats the full model name. A §4.2 name has *variants*, and the
  policy list contains only the long form. **E-4's lock must decide whether the floor is on
  `KRX` or on `Kawasaki KRX 1000`**; they measure different things.
- **`Vernal` −7** — ordinary translation compression: Arabic reaches for a pronoun or an
  attached possessive where English repeats the toponym. No transliterated `فيرنال`
  appears anywhere (0 occurrences), so §4.2 held.

---

## 6. Three findings not in any backlog

### 6.1 Gate 4f advisory — `UTV` reads as an English marker in an Arabic heading

```
Locale: ar   Page: /ar/utv/best-utv-trails-vernal/
Unexpected English heading:
  <h1> "أفضل مسارات UTV قرب Vernal في يوتا"    English marker: utv
```

Advisory and non-blocking, because `ar` is `state: "in-progress"` in 4f. But `UTV` is
Latin **by decision** (policy §4.2), so this is not drift — it is the policy rendering
correctly. **When 4f's `ar` lexicon is promoted out of in-progress, `UTV`/`ATV`/`Jeep`
and the §4.2 name list must be whitelisted first**, or promotion turns a policy into a
build failure. Same shape as the `latinLock` consequence D-1 created for 4i.

### 6.2 ⚠ B-16 — `TourCta.astro:25` hardcodes `/machine` outside `t()`

Found because the second prose occurrence of the `dinosaur-country` lock was not mine:

```
… جولات UTV بصحبة مرشد عبر أرض الديناصورات. $349/machine · 3 …
```

[`TourCta.astro:25`](../../src/components/content/TourCta.astro#L25) builds
`` `$${SITE.pricing.baseTour}/machine` `` — the unit word is an English literal no
dictionary can reach. It renders on every spoke, so **every future Arabic spoke inherits
it**. Same class as B-12 (`SITE.hoursDisplay`) and B-13 (`404.astro`), but unlike those
it is now live on a rendered Arabic prose page. The price itself *is* isolated (gate 4n
green), so this is a translation gap, not a bidi defect.

### 6.3 The registry entry mutated the eight sibling locale routes

The English page grew 10 303 → 10 311 characters. Measured cause: registering the slug
added `hreflang="ar"` (×2) and the `العربية` switcher option to
`/utv/best-utv-trails-vernal/`; the unregistered control `/utv/family-utv-guide-vernal/`
carries `hreflang="ar"` **0** times. This is AR-1's 611/619 result reproducing at
one-page scale, and it is the two-deliverable rule made visible: **the `AR_SLUGS` entry is
not bookkeeping — it edits every sibling route.** Worth knowing before E-2 diffs `dist`.

### 6.4 First corpus data for B-8b (M1)

Source-side, this file: proclitic **و** attached to an Arabic word **129**; immediately
before a Latin run **9** — 6.5 %. The 9 are a consequence of an authoring choice, not of
Arabic: prefixing Latin proper nouns with an Arabic classifier noun (`مسار Doc's Beach`,
`منطقة Uintah Basin`, `شركة Adventure Tours Vernal`) makes the proclitic attach to Arabic
in almost every case. **That pattern is worth putting in the batch brief** — it keeps the
seam population small and makes M1's eventual rule cheaper. One file is not a census;
this is a first reading, and B-8b remains corpus-gated on E-2.

---

## 7. Deliberately not done

- **The `$349` browser measurement (§3.4).** No instrument answers it; the probe exists
  and was not run. E-1 was scoped to registration, and running a browser probe would have
  made this milestone about a second question.
- **B-15 and B-16 fixes.** Both are component edits. E-1's scope was one page with
  instrumentation unchanged, and B-15 in particular deserves a decision about *where*
  isolation belongs, not a quick patch.
- **The 4i floor re-measurement (A8).** Deferred to E-2 on purpose: a floor set on a
  2-page corpus would be re-measured again at 10, and §4.3 already gives E-4 the input it
  needs. Re-measuring twice would create the stale-baseline shape A8 exists to prevent.
- **4m re-baseline (A11).** The new route carries 0 videos; nothing to re-baseline yet.
- **Any change to the Track E brief's plan.** §4.1's falsifications correct *census
  predictions*, not the plan. The milestone sequence is unchanged.
