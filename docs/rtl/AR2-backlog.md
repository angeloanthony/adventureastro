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

## Direction — ~~the largest gap~~ CLOSED

### ~~B-1~~ — Gate 4k, direction integrity — **RESOLVED 2026-07-28**

> Full write-up: [`AR2-B1-gate-4k.md`](AR2-B1-gate-4k.md). `scripts/gate-4k-direction.mjs`,
> `dist/`-reading, **blocking, wired into `npm run build`** — it found no live defect, so
> unlike 4h and 4i it ships wired. Suite green: 620 pages, `astro check` 0/0, all five
> existing gates **byte-identical**, `dist/` unchanged. **S3 and S4: BLIND → BLOCK.**

**The problem.** An Arabic page rendering `dir="ltr"`, or with no `dir` at all, passed every
gate, the validator and the build. The single attribute that makes an RTL locale an RTL
locale was checked by nothing.

**The fix, and the one measurement that shaped it.** The proposal above asked for
`<html … dir="rtl">` to be *present* on RTL pages. That test is not portable, and the census
taken before writing the gate says why:

```
adventureastro    619 LTR pages with NO dir attribute   +   1 × dir="rtl"
parkingwayastro   133 pages with an EXPLICIT dir="ltr"  +  12 × dir="rtl"
```

`dir` is an enumerated attribute whose missing-value default on the root element is `ltr`,
so a page has a direction whether or not it says so, and the two hosts emit opposite shapes
for the same intent. A gate requiring an explicit `dir` fails all 619 pages here; one
forbidding `dir="ltr"` fails all 133 there. So the gate tests **effective direction** —
the root element's `dir` if present, otherwise `ltr` — against `LOCALES[].dir`. S3 and S4
then fall out as the same check rather than two, and the attribute's *form* is measured and
printed but never blocks.

**Declared direction is a registry pointer, not a manifest copy.** New optional
`locales.registry.directionField: "dir"`, parallel to `codeField`. It is *not* in
`locales.entries`, because that section adds only facts the host registry does not carry —
a `dir` there would be a second source checked against nothing, and the gate would verify
the framework's transcription of the fact instead of the fact. A host that declares no
`directionField` is refused (exit 2), never answered `ltr`: an invented default would make
the gate approve exactly the page it exists to catch. `auto` is rejected from the vocabulary
— direction inferred per document is not a direction a locale declares.

**Proven failing in nine directions** (against copies, in the scratchpad — the repository
was never modified), each naming route · locale · declared · rendered:

| Perturbation | Result |
|---|---|
| missing `dir` on the RTL page **(S3)** | ✖ declared `rtl` · rendered `ltr` *(no dir attribute, which reads as ltr)* |
| RTL page rendered `dir="ltr"` **(S4)** | ✖ declared `rtl` · rendered `ltr` |
| LTR locale rendered `dir="rtl"` | ✖ `/zh/` · declared `ltr` · rendered `rtl` |
| duplicate `dir` on `<html>` | ✖ *"a parser keeps the first and drops the rest"* |
| `dir="auto"` | ✖ *"not a declared direction"* |
| `<body dir="ltr">` over a correct root | ✖ *"the rendered document reads ltr"* |
| host declares no `directionField` | ✖ exit 2, refusing to pass silently |
| registry declares `dir: 'auto'` | ✖ exit 2, naming the locale and the value |
| registry says `de` is RTL, output still LTR | ✖ 77 pages, grouped as one locale-wide defect |

**And in the two that needed a rebuild**, which are the ones that matter:

- **The registry is the source.** Flipping `de` to `dir: 'rtl'` — one line, no other edit —
  rebuilt to 77 × `<html lang="de" dir="rtl">` and 4k tracked it automatically. The
  framework invariant demonstrated, not asserted.
- **A locale-code branch is caught.** `const dir = lang === 'ar' ? undefined : …` in
  `BaseLayout` reproduces S3 through the exact mechanism the invariant forbids. On that
  build `validate-site` and gates 4f/4g/4h/4i **all exit 0**, and **4k alone exits 1**.

**Cross-host, read-only.** Ran unmodified against ParkingWay via a scratch manifest in the
scratchpad: ✔ 134 pages / 11 locales / default `it` / SSR `dist/client` — including an
independent 12-page Arabic corpus this framework did not produce. Its mixed-form advisory
found a real structural fact: `dist/client/admin/index.html` is the one page there that
bypasses `BaseLayout` and ships no `dir`. Correct today (`it` is LTR), latent if an RTL
locale ever reaches that path — surfaced without a false block.

**Honest limit, stated because a green 4k must not read as "RTL works".** It verifies
*structure*: a page it passes may still be visually broken. It also proves a second
direction source that *lies*, and can never prove one does not exist — a branch returning
the registry's own answer is invisible in rendered output, correctly. That half is closed by
the substitution test instead. **The gate proves the declaration is well-formed; the
substitution proves it is what renders.** B-2 and B-5–B-7 remain open and unaffected.

### ~~B-2~~ — Shared bidi formatter — **RESOLVED 2026-07-28**

> Full write-up: [`AR2-B2-bidi-formatter.md`](AR2-B2-bidi-formatter.md). Two commits:
> **Phase A** `94f3bf9` + `9dfde3d` (formatter, all 620 pages byte-identical) and
> **Phase B** `891872c` + `15f5429` (9 callers migrated, 619 pages changed). Arabic page
> bare mirrored text nodes **2 → 0**; every gate figure unchanged.
>
> **The census overturned this entry's own sizing.** Three findings, none obvious: a bare
> Western number in Arabic prose is *not* a hazard (UBA W2 — 101 across both corpora, all
> false positives); an interior space is *not* one either (rule N1); and the hazard is a
> property of the **document**, not the text node — the two runs still bare on the pilot
> page contain no Arabic at all, and are broken because `<html dir="rtl">` sets the
> paragraph direction. The shipped hazard set is just **mirrored characters and edge
> neutrals**.
>
> **Still open, found by B-2:** `404.astro` hand-rolls its own nav instead of using
> `Header.astro`, so it bypasses the formatter entirely (3 bare phone occurrences). Not
> migrated — no `/ar/404` route exists, so nothing justifies it — and **nothing detects
> it**: no gate perceives bidi isolation. A 4-series isolation gate is the natural
> successor.

<details><summary>Original entry, as filed by AR-1</summary>

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

</details>

### ~~Track A~~ — Gate 4n, bidi isolation integrity — **RESOLVED 2026-07-28**

> Full write-up: [`AR2-TrackA-gate-4n.md`](AR2-TrackA-gate-4n.md).
> `scripts/gate-4n-isolation.mjs` + `scripts/lib/bidi-isolation.mjs`, `dist/`-reading,
> **blocking, wired into `gates:dist`** between 4k and 4f. Implements
> [ADR-10](../framework/adr/0010-isolation-is-a-flanking-type-rule.md), whose status moves to
> IMPLEMENTED.
>
> **Not filed by AR-1.** This item was created by B-2's closure — *"nothing detects it: no
> gate perceives bidi isolation. A 4-series isolation gate is the natural successor"* — and it
> is the only backlog entry so far that a previous entry produced rather than the audit.
>
> **The gate is transcription; the proof is the phase.** A green 4n is evidence of nothing,
> because the rule ADR-10 rejected *also* passes this corpus — the same-flank population here
> is zero, so both algorithms return 0 findings. So both ship executable and
> `npm run test:4n` runs them over nine committed fixtures chosen to make them **disagree**:
> ADR-10 rule 7 findings, rejected rule 18, with two correct-flank cases the rejected rule
> would have blocked. Cross-host: **24 vs 75** on ParkingWay.
>
> **Reproducing ADR-10's numbers before writing the gate changed the rule.** §2 records four
> adventureastro nodes "spanning a direction change", but those four are the phone
> `(435) 219-9447`, which has no strong character in it — so the figure only reproduces if a
> **digit run counts as a flank**. The natural reading of the ADR gives 0, and would have
> shipped a gate blind to this site's only defect class. Recorded as ADR-10 §8.1.
>
> **Fail-closed:** removing `<Bidi>` from one call site in `Header.astro` and rebuilding →
> `validate-site`, 4m and 4k all pass, **4n alone exits 1**, naming the route, the character,
> its element and its flanks. Every other gate passed a page with a visibly broken phone
> number.
>
> **Still open, unchanged:** `404.astro` bypasses the formatter and 4n cannot see it, because
> no `/ar/404` route exists. The day one does, this gate reports it.

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

> **Track B brief, 2026-07-28: [`AR2-TrackB-brief.md`](AR2-TrackB-brief.md).** Separates
> detection (done — `rtl-inventory.mjs`) from policy promotion (open, and the real work) from
> browser verification (blocked on a *surface*, not on a browser). Two findings change the
> sizing of everything below:
>
> **(1) All three items render on ZERO rtl routes today.** The one Arabic route is a policy
> page: 0 arrows, 0 gradients, 0 carousel, 0 `box-physical`, and its single `left:` is the
> direction-neutral `-9999px` clip. `home.ts` has no `AR` block. So there is nothing to
> browser-verify yet, every item is prospective, and the backlog's own sequencing (§7,
> "expansion comes only after Track B") is circular as written — the fixes need a populated
> RTL surface that only expansion creates. The brief's §5 resolves it by generalizing B-1's
> substitution test: flip `de` to `dir:'rtl'`, rebuild, get 77 populated RTL routes, revert.
>
> **(2) `mirror-required` is not a work list.** 472 source hits, but `gradient-directional`
> (216, `135deg` colour washes ×8 locale blocks) and `rotate` (13, symmetric glyphs) are
> decoration the classifier cannot distinguish from the real ones. Real population ≈ **243**.
> Promoting the audit to blocking as it stands is a 48% false-positive gate — the ADR-10
> situation again. Fourth instance of the recorded-size-is-a-hypothesis lesson.

### B-5 — Carousel is direction-blind *(R-1, R-2)*

16 sliders (`home.ts` × 8 locale blocks, `utv.ts` × 8) drive
`translateX(-${index * 100}%)` with a hardcoded sign against a `display: flex`
track. Under `dir="rtl"` the track fills right-to-left while the transform still
moves left: slides advance the wrong way and slide 1 starts off-screen.
`.carousel-prev { left: 20px }` / `.carousel-next { right: 20px }` (×2
breakpoints) put "previous" on the leading edge.

The 8×-duplicated JS is the real cost here, not the fix.

> **B-5a RESOLVED `00e2313`** — 8 clones consolidated, 858 files 0 diffs. The
> true remaining surface is **4 sites in 2 files**: transform sign
> (`home.ts:63`, `utv.ts:27`), key mapping (`home.ts:41-43`), swipe sign
> (`home.ts:75-78`).
>
> **B-5b MILESTONE 1 COMPLETE 2026-07-29** — the *instrument*, not a fix. See
> `AR2-B5b-instrument.md`. B-7 proved a browser can answer these questions and
> then threw the tooling away; B-5b's answers are mostly negatives ("the Arabic
> carousel does not respond"), which read identically to a dead input path, so
> the input path is disproved first. `scripts/rtl/probe.mjs` +
> `scripts/rtl/control-keyboard.mjs`, control green and falsifiable on demand
> (`--falsify`), 3 exit codes so an instrument error can never be read as a
> behavioural finding. **Not a gate, not wired into `build`.**
>
> The control's shape is forced by the source: autoplay (`home.ts:71`,
> `setInterval(nextSlide, 5000)`) satisfies "something changed after input" by
> elapsed time alone, so the control presses **ArrowLeft** — the direction
> autoplay cannot produce — and synchronises to a tick first, because the 500ms
> `isTransitioning` lock swallows a correctly-handled keypress without touching
> the DOM. **No RTL finding may cite a negative until `npm run control:keyboard`
> exits 0.** Swipe needs its own control before B-5b's touch negatives count.
>
> **B-5b MILESTONE 2 COMPLETE 2026-07-29** — the keyboard/CSS-observable
> measurements, as an LTR/RTL differential over two builds of the same detached
> worktree (ADR-11 substitution, `de → dir:'rtl'`). See
> `AR2-B5b-measurements.md`; instrument `scripts/rtl/measure-carousel.mjs`
> (`npm run measure:carousel`). The three answers: **(1) anchors** — the
> gallery's absolutely-positioned buttons do not move under RTL (the four
> physical declarations B-7 deferred here), while Doc's Beach's flex buttons
> mirror perfectly with zero CSS — any sweep that "fixes" them breaks them;
> **(2) transform sign** — unchanged `translateX(-N%)`, and behaviourally every
> advance on both implementations presents **0% of the slide it just marked
> active** (index 0 is the only visible position under RTL); **(3) key
> mapping** — ArrowLeft/ArrowRight are direction-blind (−1/+1 in both builds,
> handler live under RTL). Fix inherits a measured list: 2 transform sites,
> 1 key-mapping policy call, 4 CSS declarations, 0 anchor work on utv. Swipe
> (`home.ts:75-78`) stays unmeasured until a touch control exists (milestone 3).
> The fix milestone's acceptance criteria are the doc's §2.5 — one
> acceptance/falsifier pair per *mechanism* (transform / key mapping /
> anchoring), all decided by re-running the instrument; the utv no-op is
> proved by re-measurement, never by the absence of a diff, and the worktree's
> detached HEAD is recorded at the start of every milestone measured in it.
>
> **B-5b MILESTONE 3 COMPLETE 2026-07-29** — the touch control and the swipe
> measurement. See `AR2-B5b-touch.md`. Under RTL the swipe surface itself was
> unreachable (`hitTarget` outside the off-pane track): swipe is downstream of
> the transform mechanism — no fourth mechanism, no new fix site, and the
> swipe-mapping question inherits the key-mapping policy call.
>
> **B-5b FIX COMPLETE — B-5 RESOLVED.** See `AR2-B5b-fix.md`. The policy call
> was decided by measured browser-native precedent (`scripts/rtl/
> native-precedent.mjs`, 12/12 readings physical): **physical-direction
> semantics** — under RTL, ArrowLeft/finger-right advance. Landed exactly the
> measured list: 2 transform signs (effective direction from computed style),
> 1 key+swipe mapping, 4 anchor declarations to `inset-inline-*`, 0 utv anchor
> work. Accepted by re-running the instrument with `--swipe` on both sides of
> the differential: all four mechanisms green, `/utv/` anchors reproduce
> milestone 2's readings exactly, LTR stability pair matches the committed
> baseline, all four controls pass. The acceptance run also caught a real
> instrument defect (probe leaked one Edge process tree per run since
> milestone 1 — the launcher exits after handing off, so PID-based kills reach
> nothing; teardown is now CDP `Browser.close` + profile-dir sweep).

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

> **CLASSIFIED 2026-07-29** — full table:
> [`AR2-B7-classification.md`](AR2-B7-classification.md). **This entry's own
> sizing is wrong in both directions.** Of the 174: **3 are English prose**
> (`…get this right: …` satisfies the `inset-physical` pattern), **95 are
> symmetric no-ops** (`left:0` beside `right:0`, `left:0` beside `width:100%`,
> the `left:50%`+`translate(-50%)` idiom, `margin-left/right:auto`), 10 are kept
> physical by decision, 5 are an owner call (**excluded from the sweep** — a
> product decision, not a directionality defect), and 4 must land with B-5b.
> **The sweep is 62 declarations in 11 files, and the classification is FROZEN**
> (66 classified convertible, then **4 retired by a computed-style ownership
> probe** — 3 rules whose markup exists on 0 of 620 pages and in 0 source files,
> plus `.policy-list ul { padding-left: 0 }`). A 5th, `.lang-menu { right: 0 }`,
> looked dead on the Arabic page and **owns on LTR** (`0 → -86px`) — ownership is
> direction-dependent, so an RTL-only null result proves nothing about the 8 LTR
> locales.
> **9 of the 66 are
> invisible to every rule here**: asymmetric 4-value shorthands
> (`padding: 8px 20px 8px 340px`), **five of which are the companion half of a
> declaration the census does see**. Also *not* mechanical: `.arch-text
> .highlight-quote` needs its `border-radius` converted alongside its
> `border-left`, and `.crowd-col.moab-col` needs its `max-width: 1024px`
> `border-right: none` override converted with its base.
>
> **B-7 is the first Track B item with LIVE defects** — unlike B-6's zero,
> `dist/ar/cancellation-policy/` renders 21 of them, in shared chrome, so every
> future Arabic page inherits them. **The presentation layer has now been opened
> in a browser** (§5.1, Edge headless over CDP, read-only): 5 of 6 live groups
> confirmed by computed style, **1 falsified** — `.policy-list ul { padding-left:
> 0 }` is dead, not defective, because `styles.css:22` `* { padding: 0 }` already
> zeroed the UA indent on both sides.

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
