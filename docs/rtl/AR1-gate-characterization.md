# AR-1 Deliverable 6 — Gate characterization and fail-closed matrix

**Nothing here is fixed.** AR-1's instruction was to run the gates against a real
RTL page, record what they can and cannot see, and hand the result to AR-2. Every
"blind" below is a backlog item, not a defect introduced by this phase.

Measured against the build containing the Arabic pilot page: 620 pages, 8
locales, `dist/ar/cancellation-policy/index.html`.

---

## 1. Why no gate could previously have been RTL-aware

Before AR-1 the `dir` attribute was **source-only** — present in
`BaseLayout.astro`, absent from all 619 rendered pages, because no registered
locale had `dir: 'rtl'` (RTL audit §1).

Every `dist/`-reading gate was therefore measuring an all-LTR corpus. Their
direction-blindness is **structural, not an oversight**: there was no direction
signal in their input to be aware of. That reframes §3 — the question is not
"why didn't they check this?" but "what should now check it, given the signal
finally exists?"

---

## 2. Per-gate characterization

`4a`–`4e` are procedural gates from `MULTILINGUAL_HANDOFF.md` §7 (run by a human
or ad-hoc script); `4f`–`4j` are executable scripts wired into `npm run build`.

| Gate | Kind | RTL-aware? | Would it pass a visually broken RTL page? | Evidence |
|---|---|---|---|---|
| **4a** UI-chrome parity | procedural | **Partly — and it was the most valuable gate in this phase** | Part (a) no; part (b) no | §2.1 |
| **4b** dependency-root ordering | procedural | Direction-blind, correctly so | Yes | §2.2 |
| **4c** corpus beats brief | procedural | N/A — a decision rule, not a check | N/A | §2.3 |
| **4d** body-link audit | procedural | Direction-blind, correctly so | Yes | §2.2 |
| **4e** locked-phrase seams | procedural | Direction-blind | Yes | §2.4 |
| **4f** headings | script, blocking | **Direction-blind, but script-agnostic and it works** | Yes | §2.5 |
| **4g** anchors | script, advisory | Direction-blind | Yes (advisory by construction) | §2.6 |
| **4h** seams | script, blocking | Direction-blind; **has a latent Arabic bug** | Yes | §2.7 |
| **4i** glossary | script, blocking | Direction-blind; **script validation has no Arabic case** | Yes | §2.8 |
| **4j** gallery parity | script, blocking | Direction-blind | Yes | §2.9 |

**Summary: 10 of 10 gates would pass a visually broken RTL page.** Not one reads
`dir`, and none has a concept of mirroring, logical properties, bidi isolation or
numeral systems. That is the single largest gap AR-2 inherits.

### 2.1 Gate 4a — UI-chrome parity

The only gate that produced a **new, real finding** on the Arabic page.

- **Part (a), key-set diff — PASSES.** `AR` has 102/102 keys against `zh` (a
  finished locale). The three values identical to English are all the frozen park
  proper noun `Dinosaur National Monument`, matching `zh`'s treatment exactly.
- **Part (b), rendered Latin-script scan — FOUND A LIVE DEFECT.** 138 visible
  text nodes, 9 unfrozen Latin runs, of which one is a genuine leak:

  ```
  ⌛ Open Daily 7am – 7pm
  ```

  `SITE.hoursDisplay` in `src/config/site.ts:26` is an English literal rendered
  into the footer of **every locale**. Verified present on the `cancellation-policy`
  page in all 9 locales (`en es it pt fr de ja zh ar`).

  **This is pre-existing and corpus-wide, not an AR-1 regression.** It is the
  same class as the `CityLayout` unit-word leak already documented under Gate 4a
  part (b) — a value-side leak the key diff cannot see because every key exists
  and is correctly translated. Filed as AR-2 **B-6**; fixing it is the owner's
  call because it touches all nine locales.

  The handoff predicted this: part (b) is "cheap and high-signal" for a
  non-Latin-script locale. Arabic made a leak that has been shipping in seven
  locales visible in a single scan.

- **RTL-awareness:** none. Both parts are direction-blind. Part (b) would not
  notice that the Arabic it approves is rendering left-to-right.

### 2.2 Gates 4b / 4d — link ordering and body-link audit

Direction-blind, and **that is correct** — they reason about route existence and
prefixes, which have nothing to do with direction.

- **4b passes.** The pilot page's outgoing links (`/booking/`, `/#tours`,
  `/#vehicles`, `/#gallery`) deliberately stay English: `/ar/cancellation-policy/`
  is the only Arabic route, so any `/ar/…` href would be a hard validator failure.
- **4d is not yet applicable.** It activates at full route coverage. With `ar` at
  1/77 routes, English hrefs are the correct existence-aware fallback, not
  downgrades. `validate-site` confirms: ✔ 620 pages, links resolve, no orphans.

### 2.3 Gate 4c — corpus beats brief

Not a check but a **conflict-resolution rule**, and AR-1 is the first phase where
it structurally cannot fire: it arbitrates between a brief and a *shipped corpus*,
and Arabic has no corpus. The policy was recorded before the text
(`AR1-arabic-policy.md`) rather than reverse-engineered from it. Every prior
locale paid for the opposite order with a corpus-wide sweep.

### 2.4 Gate 4e — locked-phrase seams (procedural)

Direction-blind. Not applicable yet for the same reason as 4d — no Arabic locked
sentence-level phrase exists. See §2.7 for the executable form's latent problem.

### 2.5 Gate 4f — headings (blocking)

**The good news in this phase.** 4f is fully script-agnostic: it strips licensed
spans, tokenizes the residue with `/[a-z][a-z'-]{2,}/g`, and matches against a
marker lexicon. Arabic script simply produces no tokens, so English residue in an
Arabic heading stands out perfectly.

Verified by direct perturbation — replacing the pilot's `<h1>` with
`Cancellation Policy` and its footer heading with `Quick Links` produced:

```
Locale: ar   Page: /ar/cancellation-policy/
  <h1> "Cancellation Policy"   English marker: policy
  <h4> "Quick Links"           English markers: quick, links
```

**Configured as `state: "in-progress"`, so these are advisory, not blocking.**
That is the correct state for a one-page locale and flips to `complete` when
Arabic route coverage lands — the same lifecycle every other locale followed.

**Lexicon choice, and why it is not the usual one.** `ar`'s marker list is the
**union of all seven completed locales' lexicons** (279 markers), not a census of
the Arabic corpus. This deliberately repairs the structural limit A9 exposed: a
lexicon frozen from a locale's *own* corpus self-excludes any defect already
present at freeze time — which is precisely how `de`'s untranslated
`Key Takeaways` survived 4f. No Arabic page contributed to this union, so no
Arabic defect can be pre-excluded from it. **Re-censusing it against the Arabic
corpus later would reintroduce the limit and must not be done** (recorded in the
config's `$doc`).

Still direction-blind: it would approve these Arabic headings rendering LTR.

### 2.6 Gate 4g — anchors (advisory)

Advisory by construction — exit 0 is its only content outcome. Registered with
`script: "arabic"`, a new value for this gate, and the same union lexicon.
`identities.ar` lists 8 wayfinding proper nouns and **deliberately omits `Utah`**,
which `zh` includes: policy §4.1 localizes Utah to يوتا, so a Latin `Utah` in an
Arabic anchor is drift to review, not an approved identity.

Total after registration: 42,777 anchors, 277 approved identities, 85 review
candidates (up from 62).

### 2.7 Gate 4h — seams (blocking) — ⚠ latent Arabic bug

Registered with **zero locks**, deliberately: 4h detects damage at the *join seam*
of a locked phrase, and Arabic has no locked sentence-level phrase yet. Declaring
one to make the entry look populated would be config nothing measures — the F2
M-4 defect.

No `imperative` block either, and the reason is linguistic rather than
administrative. The `zh` rule is built on a **detachable particle** (`请`) that can
be duplicated at a seam. Arabic marks the imperative **in the verb stem**
(`احجز`, `اطّلع`), so there is no separable particle and the `zh` rule has no
Arabic analogue. Whether Arabic has its own seam hazard — the proclitic `و`, the
definite article `ال` assimilating across a join — needs a corpus to answer and is
left open rather than guessed at.

**⚠ G-3 (latent, unreachable today).** The connective matcher branches:

```js
const re = entry.script === 'latin' ? /* word-boundary form */ : /* CJK form */;
```

Arabic is neither. It falls through to the CJK branch, which assumes no word
boundaries — wrong for a space-delimited script. Harmless right now because `ar`
declares no locks and no connectives, so the path is unreachable. **It must be
resolved before the first Arabic lock is added**, or the first Arabic seam rule
will silently match on the wrong boundary model.

### 2.8 Gate 4i — glossary (blocking) — ⚠ no Arabic script case

The one gate now **actively enforcing an Arabic decision**, and the control in the
fail-closed matrix that proves the harness is live.

Registered with `script: "arabic"`, 2 anchors and 2 locks:

| Lock | Phrase | Anchor key | Bound | Census |
|---|---|---|---|---|
| `dinosaur-country` | أرض الديناصورات | `footer.tagline` | floor | 1 |
| `offroad-trail` | المسارات | `nav.trails` | floor | 1 |

**Two locks, not three.** AR-1 also froze `Key Takeaways → أبرز النقاط`, and it is
deliberately *not* locked: no Arabic page renders a Key Takeaways block, so its
census figure is 0, and **a floor of 0 is a lock that can never fail** — it would
read as enforcement in the config and enforce nothing. It lands the phase a page
renders it.

Totals after registration: 52 locks / 8 locales / 540 rendered pages / 20
dictionary anchors.

**⚠ G-4.** 4i validates that a lock's phrase matches its locale's script —
`latin` rejects CJK, `han` requires Han, `japanese` requires kana or Han. There is
**no `arabic` case**, so an Arabic lock receives *zero* script validation and a
phrase filed under the wrong locale would pass silently. This is exactly the class
of failure the check exists to prevent, and Arabic is outside its coverage.

### 2.9 Gate 4j — gallery parity (blocking) — the registration blocker

See §4. Direction-blind like the rest; its significance to this phase is
structural, not RTL.

---

## 3. Fail-closed matrix

Every scenario the brief asked for, exercised against the real build. Verdicts are
three-valued, because collapsing them loses the finding:

- **BLOCK** — non-zero exit; the build stops.
- **REPORT** — exit 0, but the gate *names the Arabic page*. The defect is **seen**;
  only configured severity keeps it from blocking.
- **BLIND** — exit 0, no mention. The gate **cannot perceive** this defect.

Source-gate scenarios were exercised by real config/registry edits; rendered-gate
scenarios by perturbing `dist/ar/cancellation-policy/index.html` and restoring it
(harness in the session scratchpad; `dist/` is gitignored build output).

| # | Scenario | Verdict | Responsible field / key named by the failure |
|---|---|---|---|
| **S1** | Registered Arabic with no pages | **BLOCK** — gate 4j *and* `astro check` | `GALLERY_TEXT["ar"]` in `src/page-content/home-gallery.ts`; TS error `ts(2741)` on `Record<Locale, GalleryDictionary>` |
| **S7** | Incomplete locale registration | **BLOCK** — host adapter, all 5 script gates | `locales.entries.ar` in `host-manifest.json`: *"src/lib/i18n.ts registers "ar" with no entry in the host manifest"* |
| — | Registered but no gate policy | **BLOCK** — 4f, 4g, 4h, 4i each independently | *"locale "ar" is registered by the host but has no entry in i18n-gates/4X-….json — refusing to pass silently"* |
| **S8** | *(control)* locked glossary phrase changed in rendered output | **BLOCK** — 4i | lock `dinosaur-country`, phrase `أرض الديناصورات`, floor 1 |
| **S2** | Arabic page with incomplete chrome (English fallback rendered) | **REPORT** — 4f (advisory) | markers `policy`, `quick`, `links` at `/ar/cancellation-policy/` |
| **S3** | Missing `dir` | **BLIND** | — |
| **S4** | Suppressed `dir` (`ltr` on an RTL locale) | **BLIND** | — |
| **S5** | Mixed Latin/Arabic proper nouns (`Vernal` transliterated in half the page) | **BLIND** | — |
| **S6** | Numeral-policy violation (Arabic-Indic digits in rendered text) | **BLIND** | — |

### 3.1 Reading the matrix

**The framework is strongly fail-closed on *registration*.** Six independent
mechanisms — the manifest adapter, four gate configs, gate 4j, and the TypeScript
type — each refuse to proceed on a partially registered locale, and each names the
exact file and key. Nothing about this had been exercised since the seven LTR
locales landed, and it held.

**It is entirely blind to *direction*.** S3 and S4 are the sharpest result in the
phase: an Arabic page rendering left-to-right, or with no direction at all, passes
every gate, the validator, and the build. The one attribute that makes an RTL
locale an RTL locale is checked by nothing.

**S5 and S6 are blind for different reasons, and the difference matters.**
Numerals (S6) are blind because *no gate has the concept* — a numbering-system
check does not exist anywhere. Proper nouns (S5) are blind because 4g scans
**anchor text**, and a transliterated name in body prose is not an anchor; the
capability exists but is pointed elsewhere. The first needs a new gate; the second
needs a wider scan surface.

**S2 is a policy dial, not a gap.** 4f sees the English chrome perfectly and
reports it; `state: "in-progress"` is what demotes it. That is the correct setting
for a one-page locale, and it is why the distinction between REPORT and BLIND had
to be preserved in this table.

---

## 4. The registration blocker — gate 4j and the type system

**Registering a locale is no longer a zero-content operation, and this is the
first time anyone has tried since that became true.**

`MULTILINGUAL_HANDOFF.md` §7 stage 1 says:

> Add the locale to `LOCALES` with an empty slug set in `LOCALE_SLUGS`. Confirm
> the build stays byte-identical (page count unchanged) **before any content
> lands** — proves the registry pattern needs zero other code changes for a new
> locale.

That is no longer executable. Gate 4j (P34) and the `Record<Locale,
GalleryDictionary>` **total** map type both require a complete 105-slide gallery
dictionary the moment a locale appears in `LOCALES`:

```
gate-4j: ✖ locale "ar" is registered by the host but has no GALLERY_TEXT
         dictionary — it would resolve through the English fallback
astro check: ts(2741) Property 'ar' is missing in type … but required in
         Readonly<Record<"en"|…|"ar", GalleryDictionary>>
```

**This is not an RTL finding.** Arabic is simply the first locale registered since
P34 landed, and it walked straight into it. Any future LTR locale hits it
identically.

Neither mechanism is wrong on its own terms — 4j's invariant ("fallback is an
emergency runtime behavior, never a shipped state") is sound, and a total map is
the right type for a registry that must be complete. What is missing is a
supported **"registered, not yet populated"** state, which §7 stage 1 assumes
exists and the code no longer provides.

The two consequences are worth separating:

1. **It blocks `npm run build`** for AR-1, and is the only thing that does. All
   five other gates, the validator and 620-page build are green.
2. **It cannot be resolved inside AR-1's constraints.** Satisfying it means
   authoring 210 Arabic strings of descriptive prose for a homepage gallery that
   `/ar/` does not render — corpus authoring, in a phase scoped "no corpus".
   Changing either mechanism is framework architecture, which AR-1 forbids.

Recorded here rather than resolved, per the phase's own instruction that
architecture work is not localization work. It became AR-2 **B-0**.

> **RESOLVED before this milestone was committed** (owner's call: clear the
> blocker first, commit second, so the repository is never committed red).
> `GALLERY_TEXT` is now partial and paired with a `GALLERY_EXEMPT` map that gate
> 4j enforces as a *partition* — absence stays illegal, only declared absence is
> legal — with `renderGallery()` throwing if an exempt locale is ever rendered.
> `dist/` is byte-identical across the fix. Full write-up in `AR2-backlog.md`.
> The §5 table below records the state at AR-1's close, before that fix; the
> final column says what the fix changed.

---

## 5. Bootstrap — before / after

Baseline captured at `c57daef`. The "after" build was compared against a
**freshly rebuilt baseline from a stashed tree**, not against remembered numbers.

| | Before | After | Required | |
|---|---|---|---|---|
| Rendered pages | 619 | **620** | +1 | ✔ |
| `astro check` | 0 errors, 0 warnings, 268 hints | **0 errors** after B-0 (1 before) | 0 errors | ✔ *(was `ts(2741)`; fixed by the partial map)* |
| `validate-site` | ✔ 619 pages | ✔ **620 pages** | green | ✔ |
| gate 4f | ✔ 14385 headings / 7 locales | ✔ **14404 / 8** | green | ✔ |
| gate 4g | ✔ 42725 anchors, 268 identities, 62 candidates | ✔ **42777, 277, 85** | green (advisory) | ✔ |
| gate 4h | ✔ 539 pages, 1922 locked phrases | ✔ **540 pages, 1922** | green | ✔ |
| gate 4i | ✔ 50 locks / 7 locales, 18 anchors, 3 advisory | ✔ **52 / 8, 20 anchors, 3 advisory** | green | ✔ |
| gate 4j | ✔ 105 × 8 = 840 entries | ✔ **840 entries, 8 gallery locales; `"ar"` declared exempt** | green | ✔ *(after B-0)* |
| Census facts | 51 | **53** | +2 | ✔ |

### 5.1 Existing locales are byte-identical, with one required exception

`diff -rq` of the two builds: **611 of 619 pages byte-identical.** The 8 that
differ, plus the sitemap, differ *only* by additions that are structurally
required and could not be avoided:

```
+ <link rel="alternate" hreflang="ar" href="…/ar/cancellation-policy/">
+ <li role="none"><a … href="/ar/cancellation-policy/" hreflang="ar" …>العربية</a></li>
+ <loc>https://adventuretoursvernal.com/ar/cancellation-policy/</loc>   (sitemap)
```

Those 8 are exactly the sibling `cancellation-policy` routes in `en` + the seven
LTR locales. hreflang reciprocity is a *requirement*, not a side effect: an
alternate set that omitted the new locale would be wrong. No other page, in any
locale, changed by a single byte.

### 5.2 Everything the framework required for a new locale, and nothing more

Registering `ar` end to end touched exactly six declaration sites — no component,
no layout, no route template, no stylesheet:

```
src/lib/i18n.ts            LOCALES + AR_SLUGS + LOCALE_SLUGS
src/lib/ui.ts              const AR + UI_STRINGS
host-manifest.json         locales.entries.ar
i18n-gates/4f,4g,4h,4i     one locale entry each
census/*.json              regenerated through the F5 producer pipeline
src/pages/ar/…             the pilot route (structurally identical to zh's)
src/page-content/…         the pilot's content block
```

The F5 producer→consumer cycle ran clean for a locale it had never seen:
`census:phrases` derived 53 requests (2 Arabic) from the gate configs,
`census:phrase-count` measured them over 620 rendered pages, and gate 4i consumed
the resulting figures as lock baselines with no hand-entered number anywhere.

**No stop condition fired.** No second stylesheet, no runtime bidi library, no
locale-specific component fork, no per-locale numeral exception, and logical
properties were never even reached — the direction plumbing was already correct.
