# AR-2 B-2 — Shared bidi formatter

Two commits by construction: **Phase A** introduces the authority and changes nothing;
**Phase B** migrates callers. Neither commit both changes the contract and moves the
corpus. Same ordering as B-0.

> **Guiding principle, applied literally:** measure → abstract → migrate. The census in §1
> was taken before a line of the formatter was written, and it changed the design twice.

---

## 1. The census, and the three things it overturned

AR-1 isolated three kinds of run by hand on the Arabic pilot page and measured **zero**
isolation elsewhere. B-2 re-measured both corpora first. The headline is how much
**narrower** the real hazard is than "Latin text inside Arabic prose":

| | adventureastro (1 Arabic page) | parkingwayastro (12 Arabic pages) |
|---|---:|---:|
| `<bdi>` already present | 5 | **0** |
| Text nodes with a **mirrored** character, still bare | **2** | 75 (57 distinct) |
| Runs with an **edge neutral** | 0 | 0 |
| Bare Western numbers | 11 | 90 |

### 1.1 A bare Western number in Arabic prose is *not* a hazard

`72 ساعة` needs nothing. UBA rule **W2** retypes `EN` as `AN` after an Arabic strong type,
and `AN` renders left-to-right exactly as `EN` does. The number reads correctly.

My first classifier counted all 101 of these across the two corpora as defects. Isolating
them would have been pure byte churn on nine locales in exchange for no rendering change.
This is AR-1's own §0.1 lesson — *derive it from the Unicode property, not from "it looks
Latin"* — recurring on a different question, and it is why this module ships **no** generic
`isolate(anyLatinRun)`.

### 1.2 An interior space is not a hazard either

`Adventure Tours Vernal` contains two and needs neither: rule **N1** resolves a neutral run
flanked by the same strong type to that type. My second classifier flagged 43 distinct runs
on ParkingWay on this basis; almost all were false. The real rule is **N2** — a neutral that
touches the *paragraph* direction on one side — plus mirrored characters, which flip
regardless of context.

### 1.3 The hazard belongs to the document, not the text node

The decisive finding. The two runs still bare on the pilot page are the **header** and
**footer** phone links, and their text nodes contain **no Arabic at all**:

```
📞 (435) 219-9447
```

They are broken anyway. `<html dir="rtl">` makes RTL the paragraph direction for *every*
text node on the page, and U+0028/U+0029 are `Bidi_Mirrored=Yes`, so the brackets render
reversed. A census looking for Latin *adjacent to Arabic* misses both — which is precisely
what the first pass of this census did, and it is the same shape as B-1's finding that
direction is a document property rather than an attribute property.

**Net: the shipped hazard set is small and enumerable — mirrored characters, and neutrals at
a run's edge.** Everything in the formatter serves a run that has one.

---

## 2. Phase A — the formatter, with no callers

### 2.1 What shipped

| | |
|---|---|
| `src/lib/bidi.ts` | the authority: policy, mechanism, and three semantic helpers |
| `src/components/Bidi.astro` | the `.astro` delivery surface; carries neither policy nor mechanism |

### 2.2 The contract

**One invariant.** The module owns bidi isolation. No component, layout, page or
`page-content` block inserts `<bdi>`, `<bdo>`, or U+200E/200F/2066/2067/2068/2069 directly.
A caller asks for a run *by name* and receives it isolated.

**Three semantic helpers, not one generic one.** `phoneDisplay`, `currencyDisplay`,
`brandRun`. The generic `isolate()` exists and is deliberately **not exported**: a caller
that can reach it will make its own isolation decisions, and the policy leaks back out one
convenience at a time. The decision that a phone number needs isolating is the module's,
not the call site's.

Each helper carries its measured justification, and `brandRun` carries its limit — an
interior space is not a hazard, so it is needed only at a clause boundary where a following
Arabic comma or bracket would reorder against it. That is the one place AR-1 applied it,
once. It is the helper most likely to be over-applied, and over-application is not harmless.

**`<bdi>`, never a control character.** AR-1's reasoning, adopted unchanged: `<bdi>` is
visible in a diff, greppable, and cannot be silently dropped by an editor or a translation
tool. U+200F is none of those. It is also a no-op in LTR context, which is what makes
Phase B safe for the other eight locales — it changes their bytes, not their rendering.

**Two surfaces, one authority.** The two authoring surfaces with measured bare runs cannot
use each other's form — an `.astro` component cannot be called from a `.ts` template
literal, and a string helper in an `.astro` template would need `<Fragment set:html={…} />`
around a phone number, an injection-shaped pattern adopted for formatting reasons. So
`Bidi.astro` exists, and resolves its tag name from `ISOLATION_ELEMENT` rather than writing
`<bdi>`. A component that hardcoded the tag would be a second definition of the mechanism
wearing a component's name.

### 2.3 Bootstrap — zero behaviour change

| | Before | After Phase A | |
|---|---|---|---|
| Rendered pages | 620 | 620 | ✔ |
| **Every page's SHA-256** | baseline | **all 620 byte-identical** | ✔ |
| `astro check` | 0 errors / 0 warnings / 268 hints (241 files) | 0 / 0 / 268 (**243** files) | ✔ |
| `validate-site` | ✔ 620 pages | ✔ 620 pages | ✔ |
| gate 4k | ✔ 620 pages / 9 locales | identical | ✔ |
| gate 4f | ✔ 14404 headings / 8 locales | identical | ✔ |
| gate 4h | ✔ 540 pages, 1922 locked phrases | identical | ✔ |
| gate 4i | ✔ 52 locks / 8 locales, 20 anchors | identical | ✔ |
| gate 4g | ✔ 42777 anchors, 277 identities | identical | ✔ |
| gate 4j | ✔ 840 entries, `"ar"` exempt | identical | ✔ |

Verified by hashing all 620 files before and after and comparing the manifests, not by
comparing page counts. **The formatter exists and is unused.**

---

## 3. Phase B — caller migration

### 3.1 What migrated, and what deliberately did not

**Migrated — 9 call sites, all justified by §1:**

| Site | Why |
|---|---|
| `Header.astro:50` nav phone | measured bare on the Arabic page |
| `Footer.astro` ×3 phone | one measured bare; see below |
| `cancellation.ts` ×5 (`phone` ×2, `currency` ×2, `brand` ×1) | AR-1's hand-authored isolation — the exact thing the invariant forbids a caller to do |

**The three Footer sites, not one.** Only one of the three renders on the Arabic page today.
They are one shared source (`SITE.phoneDisplay`) rendered by three branches of one
component, and isolating the measured branch alone would leave the other two to be
rediscovered the first time a different Arabic page selects a different footer variant. The
measured *fact* is "shared chrome renders the phone bare into RTL documents"; all three are
instances of it.

**Deliberately not migrated:**

| Site | Why not |
|---|---|
| 8 × `pages/*/from/salt-lake-city.astro` | not shared chrome, and none renders in an RTL document — `ar` has one route |
| `404.astro` ×2 prose | see §3.5 — a real bypass, but no RTL 404 route exists, so there is no measured output to justify it |
| 101 bare Western numbers | §1.1 — not a hazard |
| `<title>` | §4 — markup isolation is impossible there |

Migrating any of these would be the opportunistic migration the brief forbids.

### 3.2 Rendered impact

| | |
|---|---|
| Pages changed | **619 of 620** |
| The one unchanged | `dist/404.html` — it opts out of the shared chrome entirely (§3.5) |
| `<bdi>` rendered site-wide | 1,243 |
| Per LTR locale | 154 = 77 pages × 2 (header + footer) |
| Arabic page | 7 = 5 authored + 2 chrome |
| **Arabic page, bare mirrored text nodes** | **2 → 0** |
| Nested or duplicate isolation | **0** |

### 3.3 Bootstrap — the change is exactly the wrapper and nothing else

Phase B moves bytes on purpose, so "byte-identical" is the wrong test. The right one:
**strip `<bdi>`/`</bdi>` from the new build and it must reproduce Phase A page for page.**

```
pages identical to Phase A once <bdi> is stripped : 619
pages differing by something else                 :   1   <- dist/ar/cancellation-policy/
```

The Arabic page is expected to fail *this particular test* and does not indicate a defect:
it is the one page that already contained isolation at Phase A, so stripping removes AR-1's
5 wrappers as well as B-2's 2, and the result cannot equal the unstripped Phase A file. It
is covered by direct census instead — 7 wrappers accounted for exactly (5 authored + 2
chrome), bare mirrored text nodes 2 → 0, zero nesting.

Stated plainly because the asymmetry is easy to mis-read as a 619/620 pass rate: **619 pages
are proven to differ by nothing but the wrapper, and the 620th is proven correct by a
different method.**

Every gate figure is unchanged from Phase A, which is the second half of the proof — the
migration moved bytes without disturbing a single measurement:

| | Phase A | Phase B |
|---|---|---|
| `astro check` | 0 errors / 0 warnings / 268 hints | identical |
| `validate-site` | ✔ 620 pages | ✔ 620 pages |
| gate 4k | ✔ 620 pages / 9 locales / 1 rtl | identical |
| gate 4f | ✔ 14404 headings / 8 locales | identical |
| gate 4h | ✔ 540 pages, 1922 locked phrases | identical |
| gate 4i | ✔ 52 locks, 20 anchors, 3 advisory | identical |
| gate 4g | ✔ 42777 anchors, 277 identities, 85 candidates | identical |
| gate 4j | ✔ 840 entries, `"ar"` exempt | identical |

### 3.4 Fail-closed matrix

| Case | Result |
|---|---|
| **phone** `(435) 219-9447` | isolated at all 4 shared sites + 2 authored; 0 bare mirrored nodes remain on the Arabic page |
| **currency** `$1,000` | isolated ×2, via `currencyDisplay` |
| **Latin brand** `Adventure Tours Vernal` | isolated ×1, at the clause boundary AR-1 identified — *not* swept site-wide (§1.2) |
| **mixed punctuation** | the mirrored-character census is the test; 0 bare mirrored text nodes remain |
| **adjacent Arabic and Latin tokens** | §1.2 — not a hazard by rule N1, and correctly left alone; isolating them would be byte churn |
| **no duplicate isolation** | 0 nested `<bdi><bdi>` or `</bdi></bdi>` across 620 pages |
| **direct `<bdi>` in any caller** | 0 — only comment prose mentions it |
| **forbidden control characters in `src/`** | 0 outside the formatter |
| **formatter cannot be bypassed** | ✘ **it can** — see §3.5 |

### 3.5 The bypass, found by asking whether one was possible

`404.astro` does not use `Header.astro`. It **hand-rolls a copy of the nav**, phone markup
included, and hardcodes the number twice more in prose:

```html
<li><a href="tel:435-219-9447" class="nav-phone">📞 (435) 219-9447</a></li>   <!-- 404.astro:45 -->
<p>Or call us directly: <a href="tel:435-219-9447">(435) 219-9447</a> …</p>   <!-- 404.astro:70 -->
```

This is why `dist/404.html` is the single page Phase B did not change, and it is the same
file already recorded under B-13 for hardcoding `Information ▾` outside `t()`. So the
answer to "can the formatter be bypassed by a shared source?" is **yes, and one file already
does** — not through a defect in the formatter, but because a page can decline to use the
shared chrome at all.

**Not migrated, deliberately.** No `/ar/404` route exists, so there is no measured
mixed-direction output to justify it, and the brief forbids opportunistic migration. The
real fix is for `404.astro` to use the shared Header, which is a structural change with its
own review surface — recorded, not bundled.

**Nothing detects this.** No gate perceives bidi isolation; there is no 4-series gate for it
and B-2 did not add one. A gate would be the natural successor to this phase.

### 3.6 Cross-host — ParkingWay

**Read-only and unchanged**, as in B-1. ParkingWay's 12 Arabic pages still carry **0**
`<bdi>` and **75** text nodes with a mirrored character (57 distinct), including its own
address line `Via Falzarego n°91, 00054 Fiumicino (RM), Italia` sixteen times.

The formatter is Adventure's, so this measures nothing about Phase B's correctness. What it
provides is the independent confirmation §1 needed: the defect class is real, it ships live
on a host this framework did not build, and it is invisible to everything there. Only
formatter-relevant structure was recorded; no layout was compared.

---

## 4. Known limit — `<title>` cannot be isolated with markup

The census found one bare mixed-direction run that this phase does **not** fix:

```html
<title>سياسة الإلغاء | Adventure Tours Vernal — Vernal, Utah</title>
```

`<title>` accepts text and no elements, so `<bdi>` is not available there. The only
mechanism that would work is a control character, and reaching for one would put an
invisible character into the corpus **through the very module that exists to keep isolation
visible and greppable**. It is recorded rather than solved, and it is not a stop condition —
nothing about it required widening the formatter; it required declining to.

The rendered `<title>` is also not prose in the reading flow, and the run in question
(`Adventure Tours Vernal`) has no mirrored character and no edge neutral, so by §1.2 it is
the weakest class of hazard. Worth revisiting only if a title ever carries a phone number or
a bracketed run.
