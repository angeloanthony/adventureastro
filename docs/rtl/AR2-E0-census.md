# AR-2 Track E, E-0 — the rendered pre-census

**Status:** E-0 deliverable 2, complete. No repository content changed; no Arabic written.

**Measured 2026-07-30** at `b3d7c4c`, against `dist/` built from the same tree
(verified: no file under `src/` is newer than `dist/index.html`).

**View: `visibleText@1`, `extractVisibleText(html, { inlineSeparator: '' })`** — the
byte-identical extractor gates 4h, 4i and 4q assert against, imported from
`scripts/lib/rendered-text.mjs` rather than reimplemented. The census is only usable as a
floor if the producer and the consumer share a window, and this is the window gate 4i
compares against. Self-check: this instrument reports the `ar` page at **4 254 visible
characters**, the figure gate 4q prints. Same view, same number.

**E-D1 is resolved: yes — the pilot is 9 files.** §1 below reports what that decision
looks like once measured, including the part of its justification that does not survive.

---

## 1. Four windows, because "rendered visible text" is not one number

The brief's §1.1 recorded **source** occurrences and warned they were "a hypothesis about
the wrong window." They are, but the correction is not a single number — it is four, and
they disagree with each other in ways that decide how E-4 writes a lock.

| Window | How it is taken | Who already sees it |
|---|---|---|
| **whole** | `extractVisibleText` over the whole page | **gate 4i — this is the floor window** |
| **body** | same extractor over `<main>…</main>` only | nothing; this is B-11's subject |
| **anchor** | `flattenElementText` over `<a>` inside `<main>` | gate 4g |
| **prose** | body − anchor | **nothing — the surface B-11 exists to close** |
| **chrome** | whole − body | nothing; scales with page count |

### 1.1 The nine English spokes, all four windows

Corpus-wide totals over the 9 pilot files. Per-file figures are in §5.

| Population | §1.1 said (source) | whole | body | anchor | **prose** | chrome |
|---|---|---|---|---|---|---|
| `Vernal` | 164 | 287 | 251 | 101 | **150** | 36 |
| `Kawasaki KRX 1000` | 45 | 58 | 58 | 20 | **38** | 0 |
| `Doc's Beach` (both apostrophes) | 30 | 29 | 20 | 2 | **18** | 9 |
| `Moonshine Arch` | 27 | 25 | 16 | 2 | **14** | 9 |
| `Outlaw Trail` | 17 | 20 | 11 | 2 | **9** | 9 |
| `Asphalt Ridge` | 16 | 18 | 9 | 1 | **8** | 9 |
| `(435) 219-9447` | 28 | 51 | 33 | 4 | **29** | 18 |
| `→` | 0 | 0 | 0 | 0 | **0** | 0 |
| `Dinosaur National Monument` | 31 (0 in `utv`) | 38 | 25 | 3 | **22** | 13 |
| `Key Takeaways` | — | 4 | 4 | 0 | **4** | 0 |

Restricted to the 7 `utv` files, for comparability with §1.1's own scope: `Vernal`
whole 193 / body 163; `Kawasaki KRX 1000` 50/50; `Moonshine Arch` 22/15; `Outlaw Trail`
16/9; `Asphalt Ridge` 15/8; `(435) 219-9447` 42/**28**.

---

## 2. Findings — five, of which three contradict the brief

### F1 — The phone count is exact, and it identifies which window §1.1 was in

`(435) 219-9447` measures **28 in the `utv` body window** — the brief's source figure,
to the occurrence. Nothing else in the table matches that cleanly. So §1.1's counts are
approximately *body* counts, not whole-page counts, and every floor derived from them
would sit below the window gate 4i actually measures. The B-2 `<bdi>` requirement stands
unchanged and is now measured rather than inferred: **28 unisolated phone occurrences in
`utv` body prose, 33 across the 9.**

### F2 — ⚠ The Key Takeaways justification for E-D1 is false

The brief states `utv` "renders no Key Takeaways block either (measured: 0 across all 7)."
Measured on rendered output: **3 of the 7 `utv` files render it** —
`beginners-guide-to-utv-tours-vernal`, `family-utv-guide-vernal`,
`private-utv-tours-vernal` — and 1 of the 2 DNM files
(`visiting-dinosaur-national-monument`).

Consequence: the `Key Takeaways → أبرز النقاط` identity is unblocked by the `utv` hub
alone, at floor 3. E-D1 raises that to 4. It does not unblock it. **E-D1's justification
#2 does not survive its own re-measurement**, and the source of the error is the same one
§1.1 warned about — the earlier figure was a source-side check that missed a block emitted
by a component rather than typed into the MDX.

**E-D1 is unchanged and still correct, on justification #1 alone.** See F3.

### F3 — `Dinosaur National Monument` is chrome on every page, and prose only on DNM

"31 occurrences, 0 in `utv`" is true in the **body** window and false in the **floor**
window. Every page on the site renders the phrase exactly once in the footer's *Explore*
list, `utv` pages included:

```
… Explore  Vernal UTV Trails & Tours  Things to Do  Dinosaur National Monument  Guides …
```

So the 9-page whole-window count is 38 = 25 body + 13 chrome/title, and the `utv`
contribution to that is **7 chrome occurrences and 0 prose**. This *strengthens*
justification #1 rather than weakening it: in the window B-11 cares about, `utv` really
does carry zero, and the 25 body occurrences that E-4 needs exist only on the two DNM
spokes. The decision to take 9 files is what makes the term measurable at all.

### F4 — ⚠ A 4i floor cannot distinguish prose from chrome, and chrome scales with pages

Both live `ar` locks are chrome by provenance — the config names `footer.tagline` and
`nav.trails` — and by position: `المسارات` sits at offset 71 of 4 254 (the nav, just after
the site title) and `أرض الديناصورات` at offset 3 761 (the footer tagline). Neither is
prose. Neither ever will be, from those keys.

The Arabic per-page chrome constant, measured on the one `ar` page:

| Term in `ar` chrome | Per page |
|---|---|
| `Vernal` | **7** |
| `(435) 219-9447` | **4** |
| `Dinosaur National Monument` | 1 (Latin, per policy §4.2 — the nav also renders `Dinosaur Monument` Latin) |
| `أرض الديناصورات` | 1 |
| `المسارات` | 1 |

This is the sharp form of A8. The brief says a floor of 1 "would pass a build that dropped
the term from nine of ten pages." True — but the deeper problem is that **re-measuring
those two floors to 10 still measures nothing about the translator's work**, because their
entire count is chrome. They are dictionary-integrity locks, and they should be labelled
as such rather than re-read as corpus locks after the pilot.

It also sets the trap for E-4 in the other direction: a `Vernal` lock in 4i measures
`prose + anchors + chrome`, and chrome alone contributes ~7 per page. On a 10-page `ar`
corpus that is ~70 occurrences before a translator writes a word — so a floor set anywhere
near the observed total is satisfied by chrome and enforces nothing about prose. **A B-11
floor must be stated as a margin above the measured chrome contribution, not as a fraction
of the observed total.**

### F5 — `Doc's Beach` renders in two apostrophes, and gate 4i folds neither

Chrome renders the ASCII form `Doc's Beach`; body prose renders the curly form
`Doc’s Beach` (12 whole / 3 body straight; 17 whole / 17 body curly). Gate 4i calls
`extractVisibleText` and **not** `foldPunctuation`, so it matches raw NFC text: a lock on
one form is blind to the other. A `latinLock` written from the chrome spelling would
measure 3 body occurrences out of 20.

---

## 3. The measurement-window defect this census found in the gates themselves

**`<title>` element text is inside the `visibleText@1` window.** `stripNonRendered`
removes `<script>`, `<style>`, `<template>`, `<noscript>` and comments — not `<head>`.
`<meta>` content lives in attributes and is dropped with the tag, but the `<title>`
element's *text* survives:

```
visible text, first 160 chars of /utv/best-utv-trails-vernal/:
" Best UTV Trails Near Vernal, Utah | Adventure Tours Vernal Home About Trails …"
```

That is head content being counted as rendered prose by gates 4h, 4i and 4q. It is why
`Vernal`'s chrome contribution is not constant — 6 on `best-utv-trails-vernal`, whose
title carries the word twice, against 4 on most pages and 2 on
`visiting-dinosaur-national-monument`.

Gate 4q's header states its scope as excluding "attribute values (`alt`, `title`,
`content`)" — which is accurate about the `title` **attribute** and silent about the
`<title>` **element**, a different thing that is in scope. Impact today is nil (no
Arabic-Indic digits render anywhere), and for 4h a `</title>` block replacement inserts a
space so no seam is fabricated. The live consequence is confined to 4i floors, which is
exactly what E-4 is about to write. **Filed as B-14.**

---

## 4. Predicted Arabic floors — recorded before translation so they can be falsified

Policy §4.2 keeps these terms Latin-verbatim in Arabic prose. If the policy holds, Arabic
body counts should mirror the English body counts per file. That is the prediction; the
E-2 measurement either confirms it or produces the 4c challenge §1.6 schedules.

| Term | Predicted `ar` **body** (9 files) | Predicted `ar` chrome (10 pages) | Predicted 4i **whole**-window total |
|---|---|---|---|
| `Vernal` | 251 | ~70 | ~321 |
| `Kawasaki KRX 1000` | 58 | 0 | ~58 |
| `Doc’s Beach` / `Doc's Beach` | 20 | ~10 | ~30 |
| `Moonshine Arch` | 16 | ~10 | ~26 |
| `Outlaw Trail` | 11 | ~10 | ~21 |
| `Asphalt Ridge` | 9 | ~10 | ~19 |
| `(435) 219-9447` | 33 | ~40 | ~73 |
| `Dinosaur National Monument` | 25 | ~10 | ~35 |
| `أرض الديناصورات` (existing lock) | 0 | 10 | **10** |
| `المسارات` (existing lock) | 0 | 10 | **10** |
| `Key Takeaways → أبرز النقاط` | 4 | 0 | **4** |

⚠ **Every chrome column is itself a hypothesis about a window, and the census is honest
about which one.** The per-page constant was measured on `/ar/cancellation-policy/`, which
is an inline page and — measured — **renders no `<main>` element at all**, unlike all nine
spokes. The spoke layout is a different template and may carry different chrome. So these
are `≥` predictions, not equalities.

**E-1 resolves this exactly, and it is the strongest reason to keep the single-file
probe.** One Arabic spoke takes the `ar` corpus from 1 page to 2; the delta in each term's
whole-window count, minus that file's body count, *is* the spoke-layout chrome constant,
isolated. Do not set any B-11 floor before E-1 reports it.

---

## 5. Per-file figures

`whole / body / anchor`. Hub `u` = `utv`, `d` = `dinosaur-national-monument`.

| File | chars (whole/body) | `Vernal` | `KRX 1000` | `Doc’s Beach`¹ | `Moonshine` | `Outlaw` | `Asphalt` | phone | `DNM` | `Key Tk` |
|---|---|---|---|---|---|---|---|---|---|---|
| u/backcountry-tours-vernal-utah | 6 821 / 5 833 | 25/21/9 | 6/6/2 | 2/1/0 | 4/3/0 | 3/2/0 | 2/1/0 | 3/1/0 | 1/0/0 | 0 |
| u/beginners-guide-to-utv-tours-vernal | 22 367 / 21 403 | 26/22/12 | 8/8/2 | 3/2/1 | 3/2/1 | 2/1/0 | 1/0/0 | 7/5/1 | 1/0/0 | **1** |
| u/best-utv-trails-vernal | 10 303 / 9 313 | 37/31/11 | 8/8/2 | 8/7/0 | 6/5/0 | 5/4/0 | 5/4/0 | 5/3/1 | 1/0/0 | 0 |
| u/family-utv-guide-vernal | 24 740 / 23 756 | 26/22/13 | 7/7/3 | 7/6/0 | 1/0/0 | 1/0/0 | 1/0/0 | 9/7/1 | 1/0/0 | **1** |
| u/group-utv-tours-vernal | 7 188 / 6 200 | 22/18/8 | 5/5/2 | 2/1/0 | 3/2/0 | 2/1/0 | 1/0/0 | 5/3/0 | 1/0/0 | 0 |
| u/private-utv-tours-vernal | 19 162 / 18 172 | 28/24/15 | 10/10/3 | 2/1/0 | 3/2/0 | 1/0/0 | 3/2/0 | 10/8/1 | 1/0/0 | **1** |
| u/side-by-side-rentals-vernal-utah | 6 943 / 5 955 | 29/25/8 | 6/6/2 | 2/1/0 | 2/1/0 | 2/1/0 | 2/1/0 | 3/1/0 | 1/0/0 | 0 |
| d/petroglyphs-rock-art-vernal | 8 981 / 8 007 | 33/29/8 | 3/3/1 | 2/1/1 | 2/1/1 | 3/2/2 | 2/1/1 | 4/2/0 | **7/5/3** | 0 |
| d/visiting-dinosaur-national-monument | 35 071 / 34 093 | 61/59/17 | 5/5/3 | 1/0/0 | 1/0/0 | 1/0/0 | 1/0/0 | 5/3/0 | **24/20/0** | **1** |

¹ both apostrophe forms summed; the split is in F5.

`→` is 0 in every window on every file, as predicted — gate 4o's population 2 grows from
1 file to 10 with 0 findings expected, unchanged.

---

## 6. What this changes in the Track E brief

| Brief claim | Status |
|---|---|
| §1.1 population table is a source-window hypothesis | **Confirmed** — and the divergence is per-term, not a constant factor |
| §1.2 E-D1 justification #1 (`DNM`, 0 in `utv`) | **Holds**, in the body window; `utv` carries 7 chrome occurrences |
| §1.2 E-D1 justification #2 (Key Takeaways, 0 in `utv`) | **False** — 3 of 7 `utv` files render it; identity unblocks at floor 3 without DNM |
| §1.5 A8 (re-measure the 4i floors) | **Confirmed and sharpened** — both floors are 100 % chrome; re-measuring to 10 does not make them corpus locks |
| §1.6 `<bdi>` in MDX, 28 phone occurrences | **Confirmed exactly** — 28 in `utv` body, 33 across the 9 |
| §4 E-4 lock design | **Changed** — floors must be stated above a measured chrome contribution, and `Doc's Beach` needs both apostrophe forms |
| — | **New: B-14**, `<title>` element text is inside the `visibleText@1` window |
