# AR-2 backlog — produced by AR-1

Everything AR-1 found and deliberately did not fix. Ordered by whether it blocks,
then by cost. Evidence lives in `AR1-rtl-audit.md` (R-*) and
`AR1-gate-characterization.md` (G-*, S-*).

---

## ~~B-0~~ — RESOLVED 2026-07-28 (AR-2, committed before the AR-1 milestone)

> **Decided by the owner, then fixed before either commit landed**, so the
> repository was never committed in a red state. `npm run build` exit 0,
> `astro check` 0 errors, gate 4j green, **and `dist/` byte-identical to the
> pre-fix AR-1 build** — the change is a build-time contract only and moved no
> rendered output.

**The problem.** Gate 4j and `Record<Locale, GalleryDictionary>` both required
every *registered* locale to carry a 105-slide dictionary, silently assuming
registration implies rendering. AR-1 separated those facts for the first time.
The cost was borne by every future locale, not just Arabic: handoff §7 stage 1
("register with an empty slug set, confirm the build is unchanged, before any
content lands") had not been executable since P34.

**The fix, and why it is not just `Partial<…>`.** Relaxing the type alone would
have traded a false failure for a silent one — the exact P34 defect the gate was
built to end. Absence therefore stays illegal; only *declared* absence is legal:

- `GALLERY_TEXT` is now `Partial<Readonly<Record<Locale, GalleryDictionary>>>`.
- `GALLERY_EXEMPT: Record<string, string>` names each registered locale that
  renders no gallery, **with its reason**.
- **Gate 4j enforces a partition**, not a suppression list. A registered locale
  must be in exactly one map. Verified failing in four directions:

  | Perturbation | Result |
  |---|---|
  | `ar` in neither map | ✖ *"appears in neither GALLERY_TEXT nor GALLERY_EXEMPT — add GALLERY_TEXT_AR … or declare it …"* |
  | `ar` in both (aliased to `zh`) | ✖ *"cannot both render the gallery and not render it"* + the pre-existing aliasing check also fires |
  | exemption with an empty reason | ✖ *"an exemption with no stated reason is a suppression"* |
  | exemption for an unregistered locale | ✖ *"a stale exemption hides nothing and misleads the next reader"* |

- **`renderGallery()` enforces the claim at runtime.** It throws if an exempt
  locale ever reaches it, so adding `/ar/index.astro` stops the build with a
  message naming the map, instead of shipping 105 English captions under an
  Arabic page. Verified: `renderGallery('zh')` → 105 slides; `renderGallery('ar')`
  → throws.
- The exempt set is printed on **success**, not only on failure — an exemption
  nobody reads is how a declared absence decays into a suppression list.

```
gate-4j: ✔ 105 slides x 8 gallery locales — 840 entries, complete (…);
         1 locale(s) render no gallery: "ar"
```

**Rationale recorded as an ADR:**
[`docs/framework/adr/0007-declared-absence-over-optional-presence.md`](../framework/adr/0007-declared-absence-over-optional-presence.md)
— why registration and rendering diverged, why exemption is explicit, why a
partition beats optionality, and why the invariant lives in the module rather
than in a gate rule. It also names the other registries in this repository with
the same shape (`getBodyHtml` dispatchers, `UI_STRINGS`) that still fail silently.

**Still open for a later phase:** the exemption is checked for internal
consistency, not against the route table. Gate 4j is a source gate and cannot see
which locales have a homepage; the `renderGallery()` throw is what closes that
gap at build time. A source-level check would need the adapter to expose the
host's content registry (`LOCALE_SLUGS`) — a real F-series extension, not a B-0
edit. Noted, not attempted.

Registering `ar` in `LOCALES` makes both gate 4j and TypeScript demand a
105-slide `GALLERY_TEXT_AR` (210 strings). `MULTILINGUAL_HANDOFF.md` §7 stage 1
still documents registration as a zero-content operation; it has not been true
since P34, and Arabic is the first locale registered since. **Not an RTL issue** —
any future LTR locale hits it identically.

Options, none of which AR-1 may take unilaterally:

| | Option | Cost | Consequence |
|---|---|---|---|
| **a** | Author `GALLERY_TEXT_AR` now | 210 Arabic strings | Satisfies both mechanisms with no architecture change. But it is corpus authoring inside a "no corpus" phase, unreviewed by a native speaker, for a page (`/ar/`) that does not exist. |
| **b** | Give the registry a "registered, not yet populated" state (`Partial<Record<…>>` + 4j existence-awareness) | ~10 lines across 2 files | Restores §7 stage 1 as written and unblocks every future locale. Is framework architecture, which AR-1 forbids — so it is an AR-2 phase, not an AR-1 edit. |
| **c** | Revert `ar` registration; ship AR-1 as audit + policy only | — | Loses D3–D6 and the pilot page. The RTL audit and Arabic policy stand alone, but nothing is proven end to end. |

**Recommendation: (b), as the opening item of AR-2.** It is the smallest change,
it fixes a defect that is not Arabic's, and it restores a documented invariant
that the codebase silently broke. (a) buys a green build with content nobody can
review; (c) discards work that is already done and green.

---

## Direction — the largest gap

### B-1 — No gate perceives page direction *(S3, S4)*

An Arabic page rendering `dir="ltr"`, or with no `dir` at all, passes every gate,
the validator and the build. The single attribute that makes an RTL locale an RTL
locale is checked by nothing.

Proposed **Gate 4k — direction integrity** (`dist/`-reading, blocking):
1. every page under `/<loc>/` where `LOCALES[loc].dir === 'rtl'` carries
   `<html … dir="rtl">`;
2. no page carries a `dir` that contradicts its locale's registry value;
3. no `dir` attribute anywhere traces to a locale-code branch rather than
   `LOCALES[].dir` (the direction invariant, enforced rather than trusted).

Cheap: the render index already walks every page, and (1)+(2) are one attribute
read. This is the highest value-per-line item in the backlog.

### B-2 — Bidi isolation is per-page, not shared *(R-4)*

AR-1 applied `<bdi>` to `(435) 219-9447`, `$1,000` and one Latin brand run **on
the pilot page only**. The site-wide sources — `SITE` NAP, `TourCta`,
`TrustBadge`, price and phone literals in `page-content/*.ts` — isolate nothing,
and the audit measured **zero** `<bdi>`/`<bdo>` in the entire repository before
AR-1.

Lift into a shared formatter so isolation happens once for every locale. `<bdi>`
is a no-op in LTR, so this is safe for the other eight locales — but it **changes
rendered bytes on all of them**, which is why AR-1 left it alone.

⚠ The worst case is the most-repeated CTA on the site: `(` and `)` are
`Bidi_Mirrored=Yes`, so an unisolated `(435) 219-9447` renders its brackets
backwards inside Arabic prose.

**External confirmation:** ParkingWay ships a live `ar/` route tree with zero
isolation and `+39 327 1864779` bare in Arabic prose. This defect ships and nobody
notices.

### B-3 — `LocaleMeta.hreflang` serves two consumers with different requirements

> **ADR WRITTEN 2026-07-28 — decision recorded, not yet implemented:**
> [`docs/framework/adr/0008-hreflang-is-two-fields.md`](../framework/adr/0008-hreflang-is-two-fields.md).
> Split the field (`hreflang` for SEO, `intl` for `Intl`) and add a registry
> check asserting every locale's `intl` tag resolves to `latn`. Implementation is
> ~9 lines plus the check; it does not block B-1 or B-2.
>
> The ADR adds one measurement this entry did not have: **`ar-SA` — the most
> plausible regionalization for this audience — is one of the tags that violates
> the numeral policy** (`ar-EG` and `ar-SA` → `arab`; `ar` and `ar-MA` → `latn`).

`getIntlLocale()` reuses the hreflang value as the `Intl` tag, so it silently
decides the numbering system of every machine-formatted date and number:

```
'ar'    -> 28 يوليو 2026    latn  ✔ policy satisfied
'ar-EG' -> ٢٨ يوليو ٢٠٢٦    arab  ✘ policy violated site-wide
```

A future "let's regionalize Arabic for SEO" edit — one line, passing every gate —
would violate the AR-1 numeral policy across the whole Arabic site without
touching a translated string. Split the fields, or pin the numbering system
explicitly. Guarded today only by a ⚠ comment in `src/lib/i18n.ts`.

### B-4 — LanguageSwitcher options carry no `lang`/`dir`

`LanguageSwitcher.astro:48` renders `{getLocaleMeta(code).name}` bare, so
`العربية` is an RTL run inside an LTR menu (and vice versa) with no per-option
`lang` or `dir`. Its `aria-label="Language"` is also hardcoded English — a Gate 4a
leak in a component whose whole job is localization.

ParkingWay already does this correctly: `dir={l.dir}` per option, resolved from
the registry, producing 20 `dir="ltr"` + 3 `dir="rtl"` on its Arabic page. Adopt
that shape. Deferred from AR-1 because it changes rendered bytes on all 620 pages.

---

## Layout and mirroring *(from the RTL audit)*

### B-5 — Carousel is direction-blind *(R-1, R-2)*

16 sliders (`home.ts` × 8 locale blocks, `utv.ts` × 8) drive
`translateX(-${index * 100}%)` with a hardcoded sign against a `display: flex`
track. Under `dir="rtl"` the track fills right-to-left while the transform still
moves left: slides advance the wrong way and slide 1 starts off-screen.
`.carousel-prev { left: 20px }` / `.carousel-next { right: 20px }` (×2
breakpoints) put "previous" on the leading edge.

The 8×-duplicated JS is the real cost here, not the fix.

### B-6 — 256 rendered `→` arrows do not mirror *(R-3)*

`Bidi_Mirrored=No`, so they point into the start of the line in RTL. 6 are shared
chrome (`GatewayRoutes`, `ItineraryDay`, `RelatedArticles`, `TourDecisionGuide`,
`SpokeArticle`, `ItineraryArticle`); the rest are body copy in `page-content` and
MDX.

Note the asymmetry AR-1 measured: the 1,004 breadcrumb `›` chevrons need **zero**
work (`Bidi_Mirrored=Yes`, the algorithm flips them), while these decorative-looking
arrows need all of it. Do not size this from a glyph census — size it from
`\p{Bidi_Mirrored}`.

### B-7 — 174 physical box/inset/text-align declarations *(R-6)*

Mechanical conversion to logical properties: `inset-physical` 145,
`box-physical` 26, `text-align: left` 3. Zero `float`/`clear`, zero
`flex-direction: row-reverse`, zero `order:` — the hard cases are simply absent.

Two sizing traps AR-1 hit, recorded so AR-2 does not:
- The raw `left:`/`right:` census is **713**; 568 of those are the `left:-9999px`
  visually-hidden clip, which is direction-neutral. The real number is 145.
- `box-physical` is **26 source edits** but **224 rendered occurrences** —
  component `<style>` blocks are inlined per page. Estimating from either number
  alone is wrong by ~8×.
- All 13 `rotate()` hits are rotations of *symmetric* glyphs (`×`, `−`, the logo)
  and need no work, despite the pattern classifying them as mirror-required.

**Confirmed unnecessary:** no second stylesheet. ParkingWay ships RTL with **zero**
`[dir="rtl"]` selectors — the AR-1 stop condition does not fire.

---

## Gate correctness

### B-8 — Gate 4h's connective matcher has no Arabic branch *(G-3)*

`entry.script === 'latin' ? wordBoundaryForm : cjkForm` — Arabic is neither and
falls through to the CJK form, which assumes no word boundaries. Wrong for a
space-delimited script. **Unreachable today** (`ar` declares no locks, no
connectives) but must be fixed before the first Arabic lock is added.

Open linguistic question for the same gate: `zh`'s seam rule is built on a
*detachable* imperative particle (`请`). Arabic marks the imperative in the verb
stem, so there is no analogue. Whether Arabic has its own seam hazard — the
proclitic `و`, `ال` assimilating across a join — needs a corpus to answer.

### B-9 — Gate 4i has no Arabic script validation *(G-4)*

4i checks that a lock's phrase matches its locale's script (`latin` rejects CJK,
`han` requires Han, `japanese` requires kana/Han). There is **no `arabic` case**,
so Arabic locks get zero script validation and a phrase filed under the wrong
locale passes silently — exactly what the check exists to prevent.

### B-10 — No gate has the concept of a numbering system *(S6)*

Arabic-Indic digits in rendered Arabic text pass everything. The AR-1 numeral
policy is enforced by translator discipline plus one locale-tag default (B-3) and
nothing else. Cheap to add: scan rendered text per locale for
`[٠-٩۰-۹]`.

### B-11 — Proper-noun drift is invisible in body prose *(S5)*

`Vernal` transliterated to `فيرنال` in half the page was seen by nothing. 4g has
the right capability but scans **anchor text** only; a transliterated name in body
prose is not an anchor. Widen the surface, or add the wayfinding names as `ar`
glossary locks with `enforce: "block"` once a corpus exists to measure a floor
against.

---

## Content-layer, pre-existing, owner's call

### B-12 — `SITE.hoursDisplay` is English in all nine locales *(Gate 4a part (b))*

`src/config/site.ts:26` — `'Open Daily 7am – 7pm'` renders untranslated in the
footer of every locale, verified on `cancellation-policy` in `en es it pt fr de ja
zh ar`. Same class as the documented `CityLayout` unit-word leak: a value-side leak
the key-set diff cannot see because every key exists and is correctly translated.

Found by running Gate 4a part (b) against the Arabic page, where a Latin-script
scan is high-signal. **Pre-existing and corpus-wide, not an AR-1 regression** — so
fixing it is a nine-locale change and the owner's call, not AR-1's.

### B-13 — `404.astro:36` hardcodes `Information ▾` outside `t()` *(R-7)*

Pre-existing, already documented in that file. Noted only because it is one of the
few chrome strings no dictionary can reach.

---

## Then, and only then: the §7 content pipeline

Once B-0 through B-4 land and the RTL layout work (B-5–B-7) is done and *visually
verified in a browser* — which AR-1 could not do — Arabic becomes an ordinary
locale and runs `MULTILINGUAL_HANDOFF.md` §7 stages 2–6 with the `de`/`ja`/`zh`
template. Not before: shipping 57 Arabic spokes onto a layout with a
direction-blind carousel, unmirrored arrows and no bidi isolation would multiply
every finding above by 77 routes.

**Also still open, as for `de`/`ja`/`zh`:** native-speaker review. Nothing in AR-1
has been read by a native Arabic speaker.
