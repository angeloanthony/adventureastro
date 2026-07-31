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

### ~~B-3 — `LocaleMeta.hreflang` serves two consumers with different requirements~~ RESOLVED (Track C)

> **RESOLVED 2026-07-30 (Track C, C-1/C-2):** `intl` split from `hreflang` in
> the registry (dist/ byte-identical — `intl === hreflang` for all nine), and
> the policy is enforced by **gate 4p** (`scripts/gate-4p-intl-numeral.mjs`,
> `gates:src`, three-way outcome: pass / violation / instrument failure). The
> ADR-8 one-liner this entry warned about now fails the build before astro
> runs. Acceptance record:
> [`AR2-TrackC-registry-contract.md`](AR2-TrackC-registry-contract.md).

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

### ~~B-4 — LanguageSwitcher options carry no `lang`/`dir`~~ RESOLVED (Track C)

> **RESOLVED 2026-07-30 (Track C, C-3):** per-option `lang`/`dir` from the
> registry (9 options → 8 `ltr` + 1 `rtl`, `lang == hreflang` 9/9) and
> `aria-label` through `t('a11y.languageMenu')` in all 9 locales, which
> **closes the open Gate 4a part-2 defect**. Measured delta: **617 pages, set-equal
> to the switcher-rendering population** — this entry's "all 620" was the
> hypothesis and it was wrong by three (404 and the two English-only author
> bios render no switcher). Acceptance record:
> [`AR2-TrackC-switcher.md`](AR2-TrackC-switcher.md).

`LanguageSwitcher.astro:48` renders `{getLocaleMeta(code).name}` bare, so
`العربية` is an RTL run inside an LTR menu (and vice versa) with no per-option
`lang` or `dir`. Its `aria-label="Language"` is also hardcoded English — a Gate 4a
leak in a component whose whole job is localization.

ParkingWay already does this correctly: `dir={l.dir}` per option, resolved from
the registry, producing 20 `dir="ltr"` + 3 `dir="rtl"` on its Arabic page. Adopt
that shape. Deferred from AR-1 because it changes rendered bytes on all 620 pages.

---

## Layout and mirroring — ~~the presentation layer~~ CLOSED as Track B, 2026-07-30 *(from the RTL audit)*

> **TRACK B CLOSED 2026-07-30.** B-5 `b76de42` · B-6 `d3ca57c` · B-7 `88f83f8`,
> with B-5a `00e2313` (consolidation) and the substitution build
> ([`AR2-TrackB-substitution-build.md`](AR2-TrackB-substitution-build.md), owner
> decisions (a)–(d)) as supporting milestones. **The one surviving item from the
> track is the 5 `decide-promo-anchor` declarations** (B-7 classification §2) —
> an explicit product decision, deferred by the owner, not an RTL correctness
> defect; it stays in the backlog as exactly that. Decision (d)'s residual
> constraint ("Track B blocks expansion onto presentation-heavy routes") is
> dissolved with the track — the presentation layer no longer blocks §7
> expansion; what still does is listed at the bottom of this file. The
> browser-lifecycle teardown lesson the fix milestone caught stays with the
> instrument, not in METHOD: `probe.mjs`'s `TEARDOWN, MEASURED` block is the
> permanent home (every control and instrument inherits it through
> `openProbe()`), the fix report §4 is the measurement record, and the class is
> already covered by METHOD rule 10 — a new rule fails the citation
> counterfactual. Everything below in this section is historical record.

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

### ~~B-5~~ — Carousel is direction-blind *(R-1, R-2)* — **RESOLVED 2026-07-30**

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
> **B-5b FIX COMPLETE `b76de42` 2026-07-30 — B-5 RESOLVED.** See `AR2-B5b-fix.md`. The policy call
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

### ~~B-6~~ — 256 rendered `→` arrows do not mirror *(R-3)* — **RESOLVED 2026-07-28**

> Full write-up: [`AR2-B6-affordance-arrows.md`](AR2-B6-affordance-arrows.md),
> commit `d3ca57c`. **The 204-edit sweep this entry sized was retired by
> re-census**: 64 of the 204 are comments, 136 are LTR-locale content rendered
> only on LTR pages (where `→` points correctly), and the real shared-chrome
> surface is 4 sites in 3 files — `ar` renders 1 route carrying 0 arrows, so
> there were **zero live defects**. Shipped `affordanceArrow()` beside
> `isRtl()` in `i18n.ts` and **gate 4o** (blocking, wired into `gates:src`),
> whose discriminator is flanking, not the glyph; LTR body content is out of
> scope *by decision* and the gate prints that scope on success.

`Bidi_Mirrored=No`, so they point into the start of the line in RTL. 6 are shared
chrome (`GatewayRoutes`, `ItineraryDay`, `RelatedArticles`, `TourDecisionGuide`,
`SpokeArticle`, `ItineraryArticle`); the rest are body copy in `page-content` and
MDX.

Note the asymmetry AR-1 measured: the 1,004 breadcrumb `›` chevrons need **zero**
work (`Bidi_Mirrored=Yes`, the algorithm flips them), while these decorative-looking
arrows need all of it. Do not size this from a glyph census — size it from
`\p{Bidi_Mirrored}`.

### ~~B-7~~ — 174 physical box/inset/text-align declarations *(R-6)* — **RESOLVED 2026-07-29**

> **The sweep landed as frozen: commit `88f83f8`** — 62 declarations across 11
> files converted to logical properties, nothing else. The predicted proof
> shape was inverted (`/ar/` byte-identical, 18 LTR pages changed — the
> delivery mechanism decides where a delta lands, METHOD rule 11), and by that
> rule's recorded convention the outcome lives in the commit's own message: no
> phase document exists and none should be manufactured. The prediction it
> falsified is [`AR2-B7-classification.md`](AR2-B7-classification.md) §8. The
> 4 `convert-carousel` declarations landed with B-5b (`b76de42`), and the only
> classification row still open is `decide-promo-anchor` (5 declarations) —
> the deferred product decision named in the Track B closure note above.

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

> **TRACK D CLOSED 2026-07-30.** D-1 `a9b3e40` (B-9) · D-2 `5c09e4a` (B-8a) ·
> D-3 (B-10b, gate 4q). Full record:
> [`AR2-TrackD-policy-gates.md`](AR2-TrackD-policy-gates.md); brief
> [`AR2-TrackD-brief.md`](AR2-TrackD-brief.md); owner decisions
> [`AR2-TrackD-decisions.md`](AR2-TrackD-decisions.md). **The policy layer is
> closed.** All three items were prevention with zero live defects behind them,
> so each is proven by a fail-closed matrix and not by a green run. `dist/`
> byte-identical across the whole track (863/863), `astro check` 0/0/268.
>
> **Rule 16 is what unblocked this section.** Each item here bundled a
> corpus-independent policy half with a census-derived half and inherited the
> harder half's blocker. Split, three of the four halves shipped immediately and
> needed no corpus at all.

### ~~B-8~~ — split: **B-8a RESOLVED (D-2)**, B-8b open and corpus-gated

#### ~~B-8a~~ — the script→matcher dispatch fails closed — **RESOLVED 2026-07-30**

> `scripts/gate-4h-seams.mjs`, commit `5c09e4a`. `entry.script === 'latin' ?
> wordBoundaryForm : cjkForm` is replaced by an explicit `CONNECTIVE_FORMS`
> lookup plus a config-time guard: a script with no form of its own **that
> declares connectives** exits 2 naming itself, instead of borrowing another
> language's rule. Both regex bodies transcribed unchanged, so `latin` and `cjk`
> diagnostics are byte-identical over the full output capture.
>
> **The defect was reproduced before repair, and the measurement was sharper
> than the prediction: the wrong form does not change the number of findings, it
> changes which text is found.** On identical prose under two declared scripts,
> both forms report exactly one violation — the word-boundary form at offset 32
> on the genuine repeated conjunction `و و`, the adjacency form at offset 65
> inside `ووقت`, which is the proclitic conjunction on a word beginning with the
> same letter. Any instrument comparing totals would have called this unchanged.
> On the live `ar` route the fallthrough form's entire output is a false positive
> (`وقته ووقّع` — one conjunction and one verb) and the correct form's output is
> empty.
>
> **And a misfiled Latin locale degraded unobservably**: `de` flipped to
> `script: "arabic"` with its five connectives exits **0** on the unpatched gate
> across the whole German corpus. The check was answering a different question
> and nothing in the output could show it.

#### B-8b — the Arabic seam rule itself *(the corpus-dependent half)*

Open, and **unspecifiable rather than deferred**. `zh`'s seam rule is built on a
*detachable* imperative particle (`请`); Arabic marks the imperative in the verb
stem, so there is no analogue. Whether Arabic has its own seam hazard — the
proclitic `و`, `ال` assimilating across a join, and what belongs on the
connective list — needs a corpus to answer. Writing that list without one
produces config nothing measures, which is the F2 M-4 defect the 4h `$doc`
already refuses by name.

**B-8a is what makes populating it safe**: the day Track E adds an Arabic
connective, the gate refuses to guess a matcher instead of silently applying CJK
adjacency rules to a space-delimited script. No re-audit of the dispatcher is
needed first.

⚠ **First hard evidence for the rule's shape, from D-2's measurement:** the
Arabic form can be neither the Latin word-boundary form nor the CJK adjacency
form. `ووقت` and `وقته ووقّع` are both correct prose, and a naive `\s`-delimited
rule would have to license them. That is a finding for Track E's rule design,
not a rule. The `ar` 4h entry's `state: "in-progress"` marker describes this
item and correctly stayed as-is when B-8a landed.

### ~~B-9~~ — Gate 4i has no Arabic script validation *(G-4)* — **RESOLVED 2026-07-30**

> `scripts/gate-4i-glossary.mjs`, commit `a9b3e40`. A fourth branch beside
> `latin`/`han`/`japanese`: a lock under `script: "arabic"` whose phrase carries
> no Arabic character, and which is not marked `latinLock`, is a registry
> failure (exit 2). Follows the `han`/`japanese` shape exactly and reads the same
> `latinLock` resolved once above all four branches.
>
> **This entry inherited a wrong classification and the correction is the reason
> it shipped in Track D.** Track C's brief recorded B-9 as corpus-gated — *"no
> Arabic lock exists to exercise it"*. Measured against the registry rather than
> the record: `4i-glossary.json` carries **two** `ar` locks, `dinosaur-country`
> (`أرض الديناصورات`) and `offroad-trail` (`المسارات`), **both landed at AR-1 and
> enforced today**. The conflation was between two gates with two different lock
> populations — 4h has none, 4i has two. So the surface was live and unvalidated
> *then*, and validating it needed zero corpus.
>
> **The load-bearing case in the matrix:** `de` flipped to `script: "arabic"`
> exits **0** on the unpatched gate — nine locks silently unvalidated — and
> exits **2** on the patched gate with exactly **7** violations, the two `de`
> locks already carrying `latinLock` exempted. The escape is `9 − 2`, counted
> rather than asserted.
>
> **Still open, found by D-1 and deliberately not fixed there:** the `latin`
> branch guards only against CJK, so a Latin-script locale carrying an *Arabic*
> phrase is the mirror case and is not caught. Pre-existing, zero live instances
> (all five Latin locales' phrases are Latin, measured), and outside D-1's work
> list. Filed here.

### ~~B-10~~ — No gate has the concept of a numbering system *(S6)* — **RESOLVED**

> Split under Rule 16 and closed in two halves by two different mechanisms at
> two different layers. **B-10a — machine-formatted digits**: gate 4p, registry,
> `gates:src`, Track C `8e9f951` (see B-3). **B-10b — author-typed digits in
> prose**: gate 4q, rendered, `gates:dist`, Track D D-3.
>
> `scripts/gate-4q-numeral-render.mjs` — a **forbidden-range** check over
> Arabic-Indic (U+0660–U+0669) and Eastern Arabic-Indic (U+06F0–U+06F9), across
> **all nine locales** by owner decision D3, on the extracted visible text of
> every rendered page. Never a counted floor: today's corpus measures 0, and a
> floor derived from it would be a lock that can never fail.
>
> **The measurement that justifies the gate.** `٢٠٢٦` injected into the `ar` and
> `de` dictionaries and rebuilt renders **620 Arabic-Indic digits across 78
> pages in 2 locales** — and `validate-site`, 4m, 4k, 4n, 4f, 4h, 4i and 4g
> **all exit 0** on that build. Eight green gates, one corpus, 620 rendered
> defects. 4q alone exits 1, naming locale · route · character · code point ·
> offset · context.
>
> **Two traps, both measured rather than assumed.** A raw byte walk over `dist/`
> flags **224 of 224** image files on compressed bytes; the gate opens 620 of
> 863 files because its traversal takes the host's own `routes.pageGlob`, so a
> binary is never opened rather than filtered out afterwards. And digits split
> across inline markup (`<strong>٢٠</strong><em>٢٦</em>`) are found **contiguous**
> — the three candidate extraction settings all report 4 matches, at different
> offsets, and only `inlineSeparator: ''` reads the one number a reader sees.
> The count was the last thing to move, exactly as in B-8a.
>
> **Fail-closed on absence, not just on presence:** a registered locale with no
> rendered page is exit 2, not a clean zero — `ar` renders one route, and a build
> that dropped it must not report a better result than a build that kept it.

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

### B-14 — `<title>` element text is inside the `visibleText@1` window *(raised by E-0)*

`stripNonRendered` removes `<script>`, `<style>`, `<template>`, `<noscript>` and
comments — not `<head>`. `<meta>` content lives in attributes and is dropped with the
tag, but the `<title>` element's **text** survives into `extractVisibleText`, so gates
4h, 4i and 4q count the document title as rendered prose:

```
/utv/best-utv-trails-vernal/, first 160 chars of visible text:
" Best UTV Trails Near Vernal, Utah | Adventure Tours Vernal Home About Trails …"
```

Gate 4q's header states its scope as excluding *"attribute values (`alt`, `title`,
`content`)"* — accurate about the `title` **attribute**, silent about the `<title>`
**element**, which is a different thing and is in scope. The stated and the actual
window diverge.

**Live impact is confined to gate 4i floors**, and it is measurable: it is why
`Vernal`'s per-page chrome contribution is not constant — 6 on `best-utv-trails-vernal`,
whose title carries the word twice, against 4 on most pages and 2 on
`visiting-dinosaur-national-monument`. For 4q the impact is nil (no Arabic-Indic digit
renders anywhere, in or out of a title); for 4h a `</title>` block replacement inserts a
space, so no seam is fabricated.

**Why it is filed rather than fixed:** E-4 is about to write B-11's floors *in this
window*, and a floor set now and a window narrowed later disagree silently. Either
narrow the extractor before E-4 or record that B-11 floors include title text —
but not one and then the other. Measurement: `AR2-E0-census.md` §3.

> **E-1 made this load-bearing rather than theoretical.** Of the 6 `Vernal` chrome occurrences on the first Arabic spoke, **2 are the `<title>` element**. So the whole-page floor window mixes a constant (nav/footer, 4), a per-page variable (title, 2 here) and the prose a B-11 floor is meant to measure. `AR2-E1-probe.md` §4.2.

### ~~B-15~~ — `faq[].a` is un-isolatable prose — **RESOLVED 2026-07-31** *(raised by E-1)*

> **RESOLVED — `f327d72` (contract) + `9695f05` (corpus). E-2 IS UNBLOCKED.** Owner chose
> **uniform across all nine locales**, reframing the question that made B-2's `salt-lake-city`
> precedent look contradictory: B-2 was scoping a *migration* ("is this necessary?"), this
> defines a *component contract* ("should it have one invariant rendering path?"). Landed as
> `src/lib/bidi-runs.ts` (recognizes the phone as a literal from `SITE`, currency **by shape**
> so a future `$50` is covered too) + `FaqAccordion` mapping slices through `<Bidi>`, both `q`
> and `a`, no `set:html`. `npm run test:bidi-runs` 21/21, every case asserting the round-trip.
> **Markup identical on 621/621 pages with `<bdi>` stripped from both sides · JSON-LD
> byte-identical 621/621 · 447 `<bdi>` added · 4n now 9 mirrored nodes / 9 isolated · the
> browser probe reads all three FAQ runs `ltr`.** E-1 §3.3's content deviation is reverted.
> ⚠ Two method notes in the decision doc §9: the §7 strip test **could not run as specified**
> (Phase A's corpus had no isolation; this one does — strip both sides), and adding two
> imports reordered Vite's CSS emission on 457 pages, proven inert three ways rather than
> asserted.
>
> **Decided 2026-07-30 — [`AR2-B15-decision.md`](AR2-B15-decision.md).** `FaqAccordion`
> splits `q`/`a` on the named runs the site owns and renders them through `Bidi.astro`;
> no `set:html`, so Astro's escaping is untouched, and `SchemaFaq` keeps the raw string
> so Build Guide §4.5's single source survives. **Not implemented** — one owner call is
> open (does the split run for all nine locales or only RTL documents), and E-2 stays
> blocked until it lands. The finding behind the decision: B-2 §2.2 built `Bidi.astro`
> so that an `.astro` template would never reach for `set:html` to isolate a run, and
> this component has never called it.
>
> **The recorded exposure was measured on the wrong window** (rule 18, ×5). The
> *8 of 9 pilot files carry parentheses* figure below is an **English-source** count. A
> census over all 449 `faq` blocks shows the one Arabic block that exists carries **zero**
> mirrored characters — the translator rendered English parentheticals as Arabic prose.
> The forced residue is policy §3.2's own literals (phone, prices), not arbitrary prose.

[`FaqAccordion.astro:13`](../../src/components/content/FaqAccordion.astro#L13) renders `<div class="faq-answer">{a}</div>`. Astro escapes an interpolated expression, so markup written into `faq[].a` arrives as literal text — neither `<bdi>` nor `src/lib/bidi.ts` can reach the string from content. FAQ answers are rendered visible prose: they sit in the `visibleText@1` window and every dist-reading gate sees them.

**Three requirements collide and any two can hold:** policy §3.2 (`(435) 219-9447` preserved exactly, `$349` symbol-first verbatim) · policy §5.2 / ADR-10 (a mirrored character at a direction change must be isolated) · the escaping delivery mechanism.

**Measured, not predicted.** The first E-1 build exited 1 on exactly this site — gate 4n's first true positive on Arabic prose:

```
Route: /ar/utv/best-utv-trails-vernal/   (ar, declared rtl)
  "(" in <div>  flanked R … N
      وللاستفسار عن أسعار المجموعات، الرقم هو (435) 219-9447.
```

**Exposure:** 8 of the 9 pilot files carry parentheses in FAQ answers, 7 of 9 carry the phone, and **56 English spokes site-wide have `faq:` frontmatter**. E-1 landed by moving the phone out of the Arabic FAQ answer (recorded deviation, `AR2-E1-probe.md` §3.3); that workaround does **not** generalise — applying it corpus-wide means deleting the phone number and every parenthetical from Arabic FAQ answers, which is a content policy nobody decided. The fix belongs in the component (route `faq[].a` through the B-2 formatter) and needs an owner decision about where isolation lives. Gate 4n's own remedy line — *"ask `src/lib/bidi.ts` for the run … never insert `<bdi>` at the call site"* — is unreachable here, which is the point.

⚠ **The sibling hazard is no longer a hazard — it is a live defect. Measured E-1b** ([`AR2-E1b-currency-probe.md`](AR2-E1b-currency-probe.md)): the bare `$349` and `$125` in these FAQ answers render **`349$`** and **`125$`** on `/ar/utv/best-utv-trails-vernal/`, symbol on the wrong side of its digits, today. 4n is still correct to ignore them (`$` is `Bidi_Mirrored=No`), which is the point — **policy §3.2 requires the price symbol-first, the source complies, and the delivery discards the compliance.** The cause is UBA **W2**: it retypes the digits `EN`→`AN` after an Arabic letter, so W5 never absorbs the `$`, W6 orphans it to `ON` and N1/N2 hands it to paragraph direction. Conditional on the preceding strong type — the same literal renders correctly paragraph-initially (`p.tour-cta-details`), so **a source-side census of bare `$` misclassifies it**.

### B-16 — `TourCta.astro:25` hardcodes `/machine` outside `t()` *(raised by E-1)*

`` `$${SITE.pricing.baseTour}/machine` `` — the unit word is an English literal no dictionary reaches. Rendered live on the first Arabic prose page:

```
… جولات UTV بصحبة مرشد عبر أرض الديناصورات. $349/machine · 3 …
```

`TourCta` renders on every spoke, so every future Arabic spoke inherits it. Same class as B-12 and B-13 (chrome strings no dictionary can reach), but unlike those it is **live on a rendered Arabic page**. The price itself renders correctly here — E-1b measured it `ltr` — but **not because it is isolated**: it is paragraph-initial, so no Arabic strong type precedes it and W2 never fires. Correct by position, not by construction. This remains a translation gap, not a bidi defect. Found only because E-1's per-term census surfaced a lock occurrence the author had not written.

### B-17 — no gate perceives a **displaced neutral** *(raised by E-1b)*

Gate 4n detects `\p{Bidi_Mirrored}` at a direction change and its scope is right: ADR-10's
invariant is about characters that **flip shape**. E-1b measured a second defect class —
a neutral that keeps its shape and **changes side**, because UBA W2 retyped its neighbour.
`$349` → `349$`. Nothing in the eleven gates observes position, so this class ships unseen;
it was found only by opening a browser.

> **Owner accepted the FRAMING 2026-07-31 — [`AR2-B17-proposal.md`](AR2-B17-proposal.md).**
> This is a **new verification layer**, not an extension of 4n or 4q: *4n = bidi structure ·
> 4q = rendered character policy · B-17 = visual ordering after layout.* Whether to build it
> is still open, and the proposal records the three costs specific to this layer (a browser in
> CI, seconds-per-page, font-dependent readings) plus the two policy questions that need
> answers before code — what a `NOT MEASURABLE` reading should do, and how wide the scope is.
> **The next gate letter is `4r`.** ⚠ B-15's fix closes today's instances **by construction
> and closes nothing about the class**: a `$50` in an Arabic FAQ answer is now covered by
> `bidi-runs.ts`, but the same amount in MDX body prose without a `<bdi>` is caught by nothing.

The instrument now exists ([`scripts/rtl/measure-currency.mjs`](../../scripts/rtl/measure-currency.mjs), exit 0/2, synthetic
positive *and* negative controls). A **gate** does not, and building one is a blocking-policy
decision for the owner rather than a measurement. Two constraints any such gate inherits,
both measured rather than assumed: the verdict is **conditional on the preceding strong
type**, so it cannot be taken from source text; and the reading must be taken on a
**rendered, laid-out** page, so it is a browser gate — the first in the series — not a
`dist/`-reading one. B-15's fix closes today's two instances by construction and closes
nothing about the class.

---

## Then, and only then: the §7 content pipeline

Once B-0 through B-4 land and the RTL layout work (B-5–B-7) is done and *visually
verified in a browser* — which AR-1 could not do — Arabic becomes an ordinary
locale and runs `MULTILINGUAL_HANDOFF.md` §7 stages 2–6 with the `de`/`ja`/`zh`
template. Not before: shipping 57 Arabic spokes onto a layout with a
direction-blind carousel, unmirrored arrows and no bidi isolation would multiply
every finding above by 77 routes.

> **Status 2026-07-30, after Track D:** all three layers are closed.
> **Presentation** — B-5–B-7, browser-verified (Track B). **Contract** — B-3
> (gate 4p) and B-4 (the switcher) (Track C). **Policy** — B-9, B-8a and B-10b
> (gates 4i, 4h and the new 4q) (Track D).
>
> **Nothing in this file blocks §7 expansion any longer.** The two items still
> open — **B-8b** (the Arabic seam rule) and **B-11** (proper-noun drift in body
> prose) — are both census-derived under Rule 16, and neither blocks expansion:
> each *waits on* it. Their single shared prerequisite is an Arabic prose pilot
> batch, and a floor measured against one policy page would mean nothing.
>
> **The circularity is broken and the exit is scheduled.** The inherited plan
> gated prose on B-8 and B-8 on prose. With B-8 split — B-8a shipped, B-8b
> waiting on corpus — and Track E authorized in advance on Track D's closure
> (decision D4), neither half waits on the other. **Track E =
> `MULTILINGUAL_HANDOFF.md` §7 stage 2 for `ar`, and it begins without a further
> decision gate.**
>
> The corpus window that makes this the binding constraint is measured and is
> now printed by gate 4q on every build: **`ar` renders 1 route and 4 254
> characters of visible text, against 77 routes and ~2.6 M characters for every
> other locale.**
>
> **Track E execution plan, 2026-07-30: [`AR2-TrackE-brief.md`](AR2-TrackE-brief.md).**
> Pilot = the `utv` hub (7 spokes) + the 2 `dinosaur-national-monument` spokes
> pending owner decision **E-D1**; 620 → 629 pages. Milestones E-0…E-5, with
> **B-8b keyed to measurements M1–M3** and **B-11 to M4**. No gate code is
> written: 4h (B-8a) and 4i (B-9) become *positive controls* for those two items,
> 4q is the numeral-policy acceptance instrument, and **4n transitions from
> prospective to live** with no code change. Two consequences the plan surfaces
> that are not recorded elsewhere in this file: the two existing `ar` 4i floors of
> **1** stop meaning anything on a 10-route corpus and must be re-measured, and
> every B-11 wayfinding lock is a Latin phrase under `script: "arabic"` and so
> **must carry `latinLock`** or D-1's branch exits 2.

> **E-0 COMPLETE 2026-07-30 — E-D1 resolved yes, pilot = 9 files.** Deliverables:
> [`AR2-E0-census.md`](AR2-E0-census.md) and
> [`AR2-E0-batch-brief.md`](AR2-E0-batch-brief.md). No repository content changed.
> The re-census on rendered visible text falsified three claims in the Track E brief
> and produced one new item:
>
> - **The two `ar` 4i floors are 100 % chrome** (`footer.tagline` at offset 3 761 of
>   4 254, `nav.trails` at offset 71). Re-measuring them to 10 makes them correct and
>   still measures nothing about a translator's work — they are dictionary-integrity
>   locks, not corpus locks.
> - **Arabic chrome renders `Vernal` 7× per page and the phone 4× per page.** A 10-page
>   `ar` corpus therefore carries ~70 `Vernal` occurrences before any prose exists, so a
>   B-11 floor stated as a fraction of the observed total is satisfied by chrome alone.
>   B-11 floors must be a margin above the measured chrome contribution — and cannot be
>   set until **E-1** isolates the spoke-layout chrome constant.
> - **`Key Takeaways` renders on 3 of the 7 `utv` files**, not 0 — E-D1's second
>   justification is void; the decision stands on the first
>   (`Dinosaur National Monument`: 25 body occurrences on DNM, 0 in `utv` body).
> - **New: B-14** — `<title>` element text is inside the `visibleText@1` window.
>
> **E-1 COMPLETE — the first Arabic prose route.** `AR2-E1-probe.md`. 620 → **621** pages,
> route delta exactly +1; all 11 gates green; gate 4q's `ar` window moved **4 254 → 12 885**
> characters, so the page is traversed and the run is not vacuous.
>
> - **Gate 4n fired on Arabic prose for the first time** and then went green on the fix.
>   That is the positive control its own header says a green run cannot supply — delivered
>   by the corpus, not staged. Its verdicts are citable now in a way they were not before.
> - **The chrome constant is measured** and both E-0 predictions are falsified: `Vernal`
>   **6** per page (not 7), phone **2** (not 4). E-0's figures were whole-page counts taken
>   on a page with no `<main>`. Spoke chrome = 988 chars (`ar`) vs 998 (`en`).
> - **Both 4i locks now have prose occurrences** (`dinosaur-country` body 2, `offroad-trail`
>   body 5) — they stop being pure dictionary-integrity locks the moment prose exists.
>   Chrome still contributes 1/page/lock, so **any E-4 floor must exceed 10** on a 10-page
>   corpus.
> - **Five §4.2 wayfinding names align `en`↔`ar` exactly** in the body window; 0
>   transliterated `فيرنال`. Policy §4.2 survived contact with a translator.
> - **New: B-15 (blocks E-2) and B-16.** Plus a 4f advisory recording that `UTV`/`ATV`/
>   `Jeep` and the §4.2 list must be whitelisted *before* 4f's `ar` lexicon leaves
>   in-progress, or promotion turns a policy into a build failure.
>
> **E-1b COMPLETE — the currency probe and the B-15 decision.** `AR2-E1b-currency-probe.md`
> + `AR2-B15-decision.md`. No corpus change; `dist/` untouched.
>
> - **⚠ Two live rendering defects found.** The bare `$349`/`$125` in the Arabic FAQ
>   answers render **`349$`**/**`125$`**. Cause is UBA **W2**, which retypes the digits to
>   `AN` and orphans the `$` — so the intuitive derivation ("`$` is ET, ET adjacent to EN
>   becomes EN, therefore fine") predicts the wrong answer. `src/lib/bidi.ts`'s
>   `currencyDisplay` justification, previously reasoned, is now measured.
> - **The defect is conditional on the preceding strong type** — the same literal renders
>   correctly paragraph-initially. A source-side census cannot classify this class; the
>   reading must come from a laid-out page. Same conclusion C7 reached for `zh` seams,
>   from an unrelated direction.
> - **B-15 decided, not implemented.** The answer was already in B-2 §2.2: `Bidi.astro`
>   exists so an `.astro` template never reaches for `set:html`, and `FaqAccordion` has
>   never called it. Split on named runs, isolate via the component, leave escaping and
>   the schema path untouched. One owner call open (§8 of the decision).
> - **E-1's exposure figure was an English-source measurement** (rule 18, ×5). Arabic FAQ
>   answers carry 0 mirrored characters so far; the forced residue is policy §3.2's own
>   literals, not arbitrary prose.
> - **New: B-17** — no gate perceives a displaced neutral, and any gate for it must be a
>   browser gate, the first in the series.
>
> **B-15 RESOLVED `f327d72` + `9695f05` 2026-07-31 — E-2 IS UNBLOCKED.** Owner decided
> **uniform across all nine locales**; B-17's framing accepted as a **new layer**, not a 4n/4q
> extension. Two commits, contract then corpus.
>
> - **The §7 acceptance test could not run as written**, and the reason is the corpus, not the
>   method: B-2 Phase B stripped `<bdi>` from one side because Phase A carried **zero**
>   isolation. Every page now carries Phase B's chrome wrappers, so a one-sided strip reports
>   620 of 621 pages "differing" — including pages with no FAQ. **Strip both sides.** A
>   recorded test is a hypothesis about the corpus it was written against (rule 18, ×6, and
>   the first time it arrived through a *test* rather than a measurement).
> - **A second axis of change appeared and was measured, not explained away.** Two new imports
>   reordered Vite's per-page CSS emission on 457 pages. Proven inert three ways: rule multiset
>   identical 621/621, total CSS length identical 621/621, **every scope kept its internal rule
>   order 621/621**. Only inter-component grouping moved and scoped selectors are disjoint.
> - **Currency is matched by SHAPE, not by amount** — the hazard belongs to the shape, so a
>   `$50` written next year fails identically and nothing would catch it (`$` is
>   `Bidi_Mirrored=No`; 4n silent by design). Matching only `SITE.pricing`'s two amounts would
>   have left the class open for nothing.
> - E-1 §3.3's deviation **reverted**: the phone is back in the Arabic FAQ answer, 4n reads
>   **9 isolated of 9** (E-1: 8 of 9, and the bare one was that sentence).
> - ⚠ Two false-positive shapes worth remembering: the JSON-LD markup scan's only hit was the
>   Portuguese word **"a*bdi*car"** (3-letter substring over natural language), and the E-1b
>   probe's `NOT MEASURABLE` class again correctly excluded the 1px `.page-summary` phone that
>   a naive x-order read calls scrambled.
>
> **E-2 COMPLETE `e189f1c` + `fc23319` 2026-07-31 — the pilot is 9 spokes.**
> [`AR2-E2-pilot.md`](AR2-E2-pilot.md). 621 → **629** pages, route delta exactly **+8**;
> all 11 gates green; `ar` visible text **12 885 → 129 862** chars. Brief and
> instrumentation unchanged, as scoped.
>
> - **⚠ Gate 4n's largest true-positive run: 15 findings on 4 pages, two classes.**
>   **(A)** a bracket adjacent to a digit run, 13 sites — the ADR-10 §8.1 digit-flank rule
>   firing on authored prose for the first time since Track A derived it. Fixed by authoring
>   (`(3 ساعات)` → `(مدته 3 ساعات)`), not markup. **(B)** guillemets around a Latin run,
>   2 sites — and here **the brief is wrong**: §3.2 says `«»` need no action because the
>   algorithm flips them correctly, which is true in Arabic-only context and false when the
>   quotation mark *is* the direction change. Measured over the wrong population and
>   generalised (rule 18, in a brief rather than a census).
> - **One of the 15 was in FAQ frontmatter — B-15 §6's residual, live and behaving exactly
>   as specified**: gate-blocked, not silently shipped, remedied by rephrasing.
> - **Gate 4i's first true positive on Arabic prose** — `offroad-trail` caught `الدروب` for
>   `المسارات` in the first file authored. E-0 recorded both `ar` locks as 100 % chrome, so
>   neither had ever tested a translator until now.
> - **⚠ E-1 §5's per-term `ar` figures DO NOT REPRODUCE, and its `en` figures do.** On a file
>   whose prose was never edited: `Vernal` 24 → **31**, `KRX 1000` 6 → **8**. Cause:
>   `<main>` contains `section.related-articles`, whose contents depend on how many sibling
>   routes are registered. **A per-term count over `<main>` is not stable across corpus
>   growth** — E-1 §6.3's byte-diff hazard is also a *measurement* hazard. B-11 floors must
>   use a prose window excluding `related-articles`/`tour-cta`/`author-byline`.
> - **A8 floor inputs, re-measured on the completed pilot:** `dinosaur-country` body **23** /
>   chrome **9**; `offroad-trail` body **32** / chrome **9**. E-0's "a floor ≤ 10 is
>   satisfiable by chrome alone" holds at exactly the predicted magnitude; the margin that
>   measures translator output is now 23 and 32. Chrome constant **929–953 chars/page**.
> - Per-term `en`↔`ar` alignment on the prose window: **Δ 0 on all ten §4.2 terms**, per file
>   and in total, incl. 33 isolated phone occurrences. ⚠ Reported with its caveat — the same
>   author authored and measured, and one-for-one name preservation is one faithful
>   translation strategy among several (E-1 compressed and would not read Δ 0).
> - **Gate 4f advisories 2 → 42**, all `ar` in-progress: **41 `utv`** (policy §4.2 rendering
>   correctly) + **1 `and`** — the English conjunction *inside* the §4.2 name
>   `Dave and Trudy Wilson`. **Extends E-1 §6.1:** the 4f whitelist must cover function words
>   inside a §4.2 name, not just the term list.
> - **§5 challenge filed:** `VERIFY WITH OFFICIAL SOURCE` carries its scannability in
>   **letter case**, which Arabic does not have. Rendered as a fixed phrase 24×; affects every
>   caseless script (`ar`, `ja`, `zh`), so it is not an Arabic-only editorial call.
> - **A schema budget the brief omits:** `description` is 120–165 chars and **3 of 9 files
>   failed it** on first authoring (Arabic diacritics each cost a character). Build-time
>   schema failure, invisible to every gate.
> - **No new B-16-class defect.** B-16 renders on all 9 new spokes as predicted.
> - **B-17 stays a proposal** — no second independent browser-only positional defect observed,
>   so the owner's promotion bar is unmet.
>
> **E-3 COMPLETE `59141cf` 2026-07-31 — the stable editorial measurement window.**
> [`AR2-E3-measurement-window.md`](AR2-E3-measurement-window.md) +
> [`AR2-E3-translator-addendum.md`](AR2-E3-translator-addendum.md) +
> `scripts/rtl/measure-prose-window.mjs`. No corpus, no gate change, no brief edit.
> ⚠ **Milestone naming diverges from the frozen brief, which defines E-3 as B-8b** — recorded,
> not reconciled; **E-5 owns it**, and B-8b is unstarted and corpus-unblocked.
>
> - **The window: prose = `<main>` − `related-articles` − `tour-cta` − `author-byline`.** The
>   five components are **disjoint and asserted to partition** the page — exact on 9/9. Sizes:
>   prose 108 002 · related 7 429 · cta 855 · byline 570 · chrome 8 854.
> - **⚠ THE INSTABILITY IS ISOLATED BY DIFFERENTIAL.** Two trees (1 vs 9 registered `ar`
>   routes) share one route with exactly one documented prose edit between them. Result:
>   `Vernal` prose **−1** / related **+8** / cta·byline·chrome **0** / whole **+7**; `KRX`
>   related **+2**, everything else 0; the other ten candidates zero everywhere. **The entire
>   instability is `related-articles`; the prose window moved only by the B-15 edit.**
>   −1 + 8 = +7 reproduces E-2's unexplained figure exactly.
> - **⚠ THE CONSTRAINT THAT DECIDES E-4:** `gate-4i-glossary.mjs:377` extracts over the
>   **whole page**. So the **prose window decides** a floor and the **whole-page window
>   enforces** it — a floor is meaningful only if it exceeds the non-prose contribution.
> - **⚠ TWO CORRECTIONS TO RECORDED FIGURES, both ours.** (a) E-2 §5's `dinosaur-country`
>   "body 23 / chrome 9" — **9 of that 23 is `div.tour-cta`**; translator contribution is
>   **14**, exceeded by **18** template occurrences. **E-0 predicted this lock was
>   chrome-dominated, was argued out of it by E-2's bigger number, and was right.**
>   (b) `Vernal`'s 178 prose is only **1.63×** its non-prose — weaker than `Kawasaki KRX 1000`
>   at 2.05× with a fifth the occurrences. **Absolute frequency is not floor strength; the
>   ratio is.**
> - **4 of 13 candidates can carry NO floor** (non-prose ≥ prose): `Doc's Beach` 3/9,
>   `Asphalt Ridge` 9/9, `Ashley Gorge` 8/9, **`أرض الديناصورات` 14/18**. Give them no floor
>   rather than lowering one until it passes — a green floor there is *no* evidence.
> - **Eligible:** `Adventure Tours Vernal` 9.75× · `Uintah Basin` 11× · `Green River` ∞ ·
>   `المسارات` 3.56× · `Kawasaki KRX 1000` 2.05×.
> - **Floor model for E-4:** `floor_enforced = non_prose_observed + prose_margin`. ⚠
>   `non_prose_observed` **expires with the corpus size it was measured at** — a floor left
>   alone while `related` grows silently becomes template-satisfiable. The alternative that
>   removes the expiry is a **4i window option** for `ar` floor locks — a gate change, out of
>   E-3 scope, recorded as the recommendation E-4 weighs against re-measurement cost.
>
> Confirmed unchanged: `(435) 219-9447` at **28** occurrences in `utv` body prose (33
> across the 9), which is the `<bdi>`-in-MDX population; `→` at **0** in every window on
> every file.

> **E-4 PHASE 1 COMPLETE `0b82561` + `207bae1` 2026-07-31 — the non-prose contribution is
> structurally bounded.** [`AR2-E4-phase1-ceiling.md`](AR2-E4-phase1-ceiling.md). No floors,
> no gate change, no corpus.
>
> - **Four of five structural questions are properties of `RelatedArticles.astro`, not of the
>   corpus:** `limit = 4` enforced in `take()`, no caller overrides it, exactly two
>   contributing fields per card, and `inLocale()` makes the pool deterministic.
> - **⚠ A CORRECTION TO E-3's MECHANISM.** E-3 said a new route flips a sibling's card from
>   English to the locale. It does not — `inLocale()` means a locale with no siblings renders
>   **no section at all**. Measured 0 cards → 4 cards. **Appear-then-saturate, already
>   finished**, not a flip that drifts for the whole rollout.
> - **⚠ THE CRITERION E-3 GOT WRONG.** E-3 ruled a candidate ineligible when
>   `prose ≤ non_prose_observed` — that asks how much of today's count is template. The
>   question a floor poses is whether a number exists the template CANNOT REACH:
>   **`feasible ⟺ non_prose_ceiling < observed whole-page count`.** Observed non-prose is
>   descriptive; only a ceiling is enforceable.
> - **Six of thirteen verdicts reversed, in both directions.** Four E-3 called ineligible are
>   feasible — including the live `dinosaur-country` lock — because their related ceiling is
>   **structurally zero**: five §4.2 trail names and both Arabic locks appear in no spoke
>   title or description anywhere. Two E-3 called eligible are infeasible.
> - **Feasible ≠ strong.** Feasible detects total deletion; strong also detects partial drift.
>   E-3's "a floor there is *no* evidence" was too strong — it is *weak* evidence.
> - **⚠ Selection must rank on `prose ÷ non_prose_ceiling`** — never observed, never raw
>   frequency. `Green River` at E-3's ratio ∞ is a term whose denominator has not arrived yet.

> **E-4 PHASE 2 STEPS 1–2 COMPLETE `c866adb` 2026-07-31 — the tight ceiling changes no
> verdict.** [`AR2-E4-phase2-tight-ceiling.md`](AR2-E4-phase2-tight-ceiling.md) +
> `scripts/rtl/measure-related-ceiling.mjs`. No floors, no gate change, census not re-run.
>
> - **Phase 1's flag is answered and nothing moves.** `Dinosaur National Monument` still
>   infeasible (by 28, not 47); `Adventure Tours Vernal` still feasible (headroom 7, not 5,
>   and correctly labelled **weak**). **10 of 13 feasible, the same 3 infeasible.**
> - **Two tightenings off `take()`:** `seen` is keyed on `hub/baseId`, so the four cards are
>   four **distinct** entries; and it is pre-seeded with the current page, so a term's sole
>   carrier contributes **nothing to its own page** — which is why DNM looked worse than it is.
> - **⚠ THE POOL IS A SECOND AXIS, and it does most of the work.** Two sound tight ceilings:
>   **MEASURED** (the 9 `ar` files, sharpest, expires on *any* registration and can expire
>   **upward without limit**) and **SETTLED** (per registered page over the 57 `en` spokes, an
>   upper bound at every corpus size to full rollout). They disagree on 3 terms.
>   **`Green River` decides it:** measured ceiling **0** (no `ar` file carries it in
>   frontmatter) vs settled **18**. A lock justified by a 0 ceiling dies to the next unrelated
>   batch. **Only SETTLED may freeze policy;** MEASURED is recorded because the gap *is* the
>   pending drift.
> - **SETTLED is additive** — Σ of per-page rows — so Phase 1's residual narrows from
>   "re-measure on page-count change" to **"add the precomputed row."** All 57 rows in `--json`.
> - **⚠ (a) A CORRECTION TO E-3's FLOOR MODEL.** `floor_enforced = non_prose_observed +
>   prose_margin` **cannot be written down.** F5 Phase 5 removed authored figures —
>   `gate-4i-glossary.mjs:230` *refuses* a lock declaring `min`/`count`. The floor **is** the
>   census's whole-page count at freeze; `prose_margin` has no home. Phase 1 corrected E-3's
>   mechanism, this corrects its arithmetic, both toward the simpler model.
> - **⚠ (b) NAME COLLISION.** The census key `surface: "prose"` means the **whole page**
>   (`phrase-count.mjs:51` counts `visibleText` over the document); E-3/E-4 use "prose" for
>   `main − related − cta − byline`. **One word, two windows** — the D-1 shape the census layer
>   exists to prevent. It is also where Option B would have to land: the schema enum is
>   `"surface": {"enum": ["prose"]}`.
> - **⚠ (c) THE `ar` CENSUS IS STALE AND ENFORCES NOTHING.** Frozen 2026-07-28 at
>   `corpus.pages.ar = 1`; both `ar` locks sit at **value 1** against a 9-page corpus whose
>   whole-page counts are **32** and **41**. The gate is green because the floor is far below
>   the corpus, not because the corpus is verified. **Smallest, most reversible piece of step 3
>   and independent of the A/B question.**
> - **Option B still recovers no term.** Under the tight ceiling the same three are infeasible
>   for the same reason, so the architecture choice is Option A vs no additional engineering.
> - **⚠ The strength label is purely relative.** `strong ⟺ head ≥ prose/2` is a chosen
>   convention. `Doc's Beach` scores strong on a headroom of 3 that is *all* of its prose;
>   E-3 called it marginal and on the absolute reading E-3 was right. Carry both readings.

> **E-4 PHASE 2 STEP 3 COMPLETE `9282317` 2026-07-31 — the `ar` census refreshed; both locks
> now enforce.** Owner-authorised. One artifact changed: `census/phrase-count.json`. Gate 4i
> unmodified, no corpus authored.
>
> - **Both `ar` locks moved from `value: 1` to 33 (`أرض الديناصورات`) and 42 (`المسارات`)**
>   over 10 `ar` routes. A build dropping the first from Arabic prose renders **at most 19**
>   against a floor of **33** — the first time either lock could fail for a content reason.
> - **⚠ THE RISK IN A REFRESH IS NOT THE TERMS YOU MEANT TO MOVE.** Re-running the producer
>   re-freezes **all 53 facts across 8 locales**, so a count that drifted *down* elsewhere
>   would bake a weaker floor in silently. Two guards ran first: `phrase-set.mjs` re-derived
>   and diffed **byte-identical** (no lock-registry drift), and every fact diffed old → new:
>   **51 unchanged · 2 increased · 0 DECREASED · 0 added · 0 removed.** No other locale moved.
> - **⚠ A CORRECTION TO PHASE 2's PREDICTED FIGURES — METHOD rule 8 in miniature.** §7.3
>   predicted **32/41**; frozen values are **33/42**. The gap is a measurement-window mismatch
>   between two instruments in this program: `measure-prose-window.mjs` totals the **9 pilot
>   spokes** (excluding `cancellation-policy` as `INLINE`); the census counts **all 10 `ar`
>   routes**. The 10th was decomposed rather than assumed — **exactly 1 chrome occurrence per
>   lock, no related block** (not a spoke, so `RelatedArticles` never renders), no cta, no
>   byline, no prose. Headroom therefore unchanged at **14** and **32**, restated over the
>   census's own 10-page set.
> - **⚠ `cancellation-policy` is a CHROME-ONLY page** — raises ceiling and floor equally,
>   contributes no prose. Negligible at 1 of 10; **worth watching at expansion.**
> - **THE A/B DECISION IS RECORDED AS RESOLVED — OPTION A, no gate change.** Tested against
>   the loose ceiling, the tight ceiling and the gate implementation; all three agree a
>   prose-window variant expands the enforceable set by **zero terms**. Reopen only if a
>   corpus yields a term infeasible under the settled ceiling *and* feasible under a
>   window-scoped one.
> - **Verified:** `npm run build` over 629 pages, full `gates:dist` green — `gate-4i` ✔ 52
>   locks across 8 locales on 549 rendered pages, same 3 pre-existing `ja`/`zh` advisories.
> - **Still open:** the `surface` naming collision, the 11 unlocked candidates, **B-8b**.
> - **⚠ E-5 INHERITS A REQUIRED MAINTENANCE UNIT, not a reminder** —
>   [`AR2-E4-phase2-tight-ceiling.md` §11](AR2-E4-phase2-tight-ceiling.md). The settled ceiling
>   sums over the **registered** pages and the floors are **corpus totals**, so a batch that
>   registers routes without re-freezing leaves the locks green while enforcing proportionally
>   less. Ceiling extension and census re-freeze are **two halves of one operation**. §11 carries
>   the sequence and six ordered acceptance criteria, of which two are easy to skip: the
>   differential must be checked **by sign** (a decrease is the real failure mode), and
>   **`measure-prose-window.mjs` hardcodes `PILOT`** — a new route not added there is excluded
>   from the window while the census counts it, which is §10.2's population mismatch set to
>   recur at every expansion.
> - **⚠ Scope claimed, and not more:** measurement-complete, enforcement-live, **validated at
>   pilot scale**. Nine spokes exercised every mechanism; they have not demonstrated behaviour
>   across the full 57-spoke corpus. The reopen condition marks that gap deliberately.

> **E-5 COMPLETE `71cdbc3` 2026-07-31 — THE PILOT IS ASSESSED; ROLLOUT AUTHORIZED WITH
> THREE PRECONDITIONS.** [`AR2-E5-pilot-assessment.md`](AR2-E5-pilot-assessment.md). No
> engineering, gate, census or corpus change; the frozen brief is **not** edited.
>
> - **⚠ MILESTONE DIVERGENCE RESOLVED — the executed record is adopted as authoritative.** The
>   brief defines E-3 = B-8b and E-4 = B-11; **neither ran.** E-3 built the measurement window
>   (because E-2 §4.1 showed B-11's floors could not be written at all until a stable window
>   existed) and E-4 built the ceiling model. **B-11's stated deliverable — wayfinding locks in
>   `4i-glossary.json` — does not exist**; what exists is the eligibility table. **B-8b was never
>   started.** Re-filed: **E-6 = B-8b**, **E-7 = B-11 lock authoring**. The brief's §4 is
>   superseded by record, not edited — 15 commits cite the executed numbering.
> - **THE PREDICTIONS LEDGER.** E-0's pre-translation floor predictions vs measured over 10 `ar`
>   routes: **2 exact** (`Kawasaki` 58, `أبرز النقاط` 4), **5 confirmed** (±1 to +4), **2
>   refined** (`Vernal` −27, phone −18 — both track E-1 §4.1's already-falsified chrome
>   constants), **2 falsified** (`أرض الديناصورات` 10→**33**, `المسارات` 10→**42**). ⚠ The two
>   falsifications are **the pilot's most important measurement**: E-0 predicted body 0 because
>   both locks were 100 % chrome; they became **genuine corpus locks** (prose 14 and 32) the
>   moment translator prose existed, exactly as E-1 §4.3 predicted.
> - **⚠ A11 WAS NEVER PERFORMED — AND THE BRIEF'S WARNING ABOUT IT IS FALSIFIED.**
>   `4m-media.json` has **one commit in its entire history** and zero `/ar/` entries. But
>   `gate-4m-media.mjs:219-225` enforces *"a page absent from the baseline must carry no video at
>   all"*, so an unlisted route with a video is a **violation, not a blind spot**. A11 is a
>   **mis-specified criterion**, not outstanding work — carrying it forward would schedule work
>   that does nothing. Rule 4 with the sign reversed.
> - **⚠ A8 WAS OPEN FOR THE ENTIRE LIFE OF THE PILOT.** E-2 §5 reported it green having produced
>   the *measurement*; the floors stayed at **1** until `9282317`, three milestones later. The
>   deferral was right, the record-keeping was not. **Rule: an acceptance criterion whose remedy
>   is a config or census change is not met by measuring its inputs — mark it deferred.**
> - **⚠ TWO DEFECTS IN THE PILOT'S OWN RECORD, both upstream findings a downstream milestone
>   dropped.** (a) **`Doc's Beach` apostrophe split.** E-0 F5 predicted *"a lock written from the
>   chrome spelling would measure 3 body occurrences out of 20"* — E-4 used the 3. Measured:
>   ASCII prose 3 / whole 12; curly prose 17 / whole 17; **both = prose 20 / whole 29**. The
>   verdict survives (feasible strong) but **headroom is 20, not 3**, so E-4 §5.1's use of it as
>   the example of a thin "strong" was an artifact of counting 41 % of the term. **Nothing may be
>   authored from that row.** (b) **The dictionary-integrity category** E-0 F4 named was dropped
>   by E-4's binary predicate; `أبرز النقاط` (M6, **measured 4**, from `t('section.keyTakeaways')`)
>   reads "infeasible" when it is a perfectly good dictionary lock. **Taxonomy needs three
>   branches: corpus lock · dictionary-integrity lock · infeasible.**
> - **⚠ THE PATTERN, ×3:** E-3 conflated feasible/strong; E-4 conflated corpus/dictionary lock and
>   inherited the apostrophe split. **Each milestone's sharper predicate absorbed a distinction an
>   earlier one had recorded.** Counter-measure: when narrowing a predicate, re-read the upstream
>   **findings list**, not only the upstream numbers.
> - **THE FOUR-WAY SEPARATION: main claim held, one branch falsified.** ✔ "Track E writes no gate
>   code" — **exactly true**, no `gate-4*.mjs` touched. ✘ "No new instrument" — **two** were built
>   (`measure-prose-window.mjs`, `measure-related-ceiling.mjs`). The brief had no category for
>   them. **Fifth category: *policy-derivation instrument*** — measures to decide what a gate
>   should enforce, committed per rule 5, carries its own falsifier, never runs in CI.
> - **M-SERIES: 5 of 10 taken.** ✔ M4, M5, M6, M7, M8. ⚠ M1 one file only; ✘ **M2, M3 zero data**
>   (B-8b); ✘ **M9, M10 never measured** — policy non-decisions the brief scheduled for the pilot.
>   Cheap at 9 files, a locale-wide sweep after batch 2. **Last cheap moment is now.**
> - **RECOMMENDATION: AUTHORIZE, with P-1 fold the pilot's four guidance corrections into the
>   batch brief (E-2 §7 deferred this to E-5 by name); P-2 supersede the `Doc's Beach` row before
>   any lock is authored; P-3 decide B-8b's status explicitly rather than by silence.**
> - **⚠ Δ 0 `en`↔`ar` IS NOT A PREDICTION FOR BATCH 2** — E-2 §4.2's own caveat: same author,
>   one-for-one authoring; E-1's compression style would not reproduce it.
> - **FIVE FALSIFIABLE PREDICTIONS RECORDED FOR BATCH 2 (`hiking`, 16 files)**, §8 — the sharpest
>   being **P2: the settled ceiling grows by exactly the precomputed rows, `Vernal` 88 → 248**.
>   That is the direct test of E-4 §6's additivity claim.
> - **Reopen conditions in force: R1** (architecture A/B) · **R2** (ceiling model falsified) ·
>   **R3** (B-17 promotion) · **R4** (4c policy challenge).

> **E-5b COMPLETE `0bbbcc5` 2026-07-31 — THE THREE ROLLOUT PRECONDITIONS ARE SATISFIED; BATCH 2 IS
> UNBLOCKED.** [`AR2-E5b-rollout-prep.md`](AR2-E5b-rollout-prep.md) +
> [`AR2-rollout-batch-brief.md`](AR2-rollout-batch-brief.md). No Arabic authored, no corpus
> change, no gate or gate-config or census change. Numbered on the `E-1b` precedent so **`E-6`
> stays reserved for B-8b**.
>
> - **P-1 ✔ — a NEW rollout brief; the pilot brief is unedited** (E-5 measures the pilot against
>   it). Nine changes, each ⚠ NEW/⚠ CORRECTED and each citing its pilot measurement. Two
>   candidate rules were **rejected for having no measurement behind them**.
> - **P-2 ✔ — and ⚠ THE ROOT CAUSE EXONERATES THE TRANSLATOR.** All **31** `Doc's Beach` source
>   occurrences are **ASCII**, exactly as the pilot brief §2.2 instructed; **17 render curly**
>   because Astro's smartypants rewrites `'` → `’` in MDX **body** prose, while frontmatter (FAQ)
>   and dictionary strings keep ASCII. **The split partitions by AUTHORING SURFACE, not author
>   choice** → not a compliance defect, **no sweep**, and **the brief's rule was unfollowable** —
>   withdrawn in the rollout brief. Corrected row: prose 3→**20**, whole 12→**29**, headroom
>   3→**20**, class unchanged. **Re-ran end to end: no other row moved**, control still red.
>   E-4 §5.1's thin-"strong" example is **withdrawn** — no candidate now demonstrates that gap.
> - **P-3 ✔ — B-8b DEFERRED with named triggers, on measured evidence.** Census taken:
>   **1 807** proclitic و attached · **47** pre-Latin · **0 standalone** · **8** locked phrases
>   behind an attached proclitic (`والمسارات`, `بالمسارات`, `لأرض الديناصورات`…). ⚠ **D-2's
>   prediction confirmed at corpus scale:** the `latin` matcher needs `و و` and the corpus has
>   **0**; the `cjk` matcher would fire on all **1 807**. Neither inherited form is usable.
>   **Deferred because:** `ar` has 0 4h locks **and so do `de`/`fr`/`es`/`it`/`pt` — 5 of 8
>   shipped locales**, so an empty list is the normal state; B-8a's dispatcher is fail-closed;
>   gate 4i counts by substring so all 8 seam sites already count correctly; and building a
>   matcher for zero locks is engineering ahead of need. **Trigger 1:** first Arabic 4h seam lock
>   proposal. **Trigger 2:** standalone `و` rising above 0. **Falsifier for the deferral:** any
>   4h/4i finding caused by a proclitic-prefixed locked phrase.
> - **⚠ THE PREDICTION REVIEW FOUND TWO INSTRUMENTATION GAPS.** **P1 and P4 are first-contact
>   counts destroyed by their own remedy** — a green build afterwards is indistinguishable from a
>   batch that never had them; batch 2 must capture the **first** build output before any
>   remedial edit. **P5 has no committed instrument at all:** `measure-prose-window.mjs`
>   hardcodes `dist/ar/` at two sites and cannot read the English side, so **E-2 §4.2's Δ 0 — the
>   most-cited quality result of the pilot — is not reproducible from the repository.** It came
>   from a throwaway census that was never committed (a rule 5 violation that survived four
>   milestones because the number was clean). **Recommended before batch 2: an `--align <locale>`
>   mode.** Not built — outside P-2's authorization.

> **E-5c COMPLETE 2026-07-31 — THE ALIGNMENT MEASUREMENT IS REPRODUCIBLE; THE LAST KNOWN GAP IS
> CLOSED.** [`AR2-E5c-alignment-instrument.md`](AR2-E5c-alignment-instrument.md) +
> `measure-prose-window.mjs --align <locale>`. No corpus, translation, gate, gate-config or
> census change.
>
> - **THE CONCLUSION REPRODUCES EXACTLY — Δ 0 on all 10 terms, on all 9 files**, from committed
>   artifacts alone. **8 of 10 magnitudes identical; 2 are not, and both are defects in E-2's own
>   table rather than corpus findings** (Δ 0 survives because both sides were affected equally).
> - **⚠ `Doc's Beach` 3 → 20** — the ASCII-only undercount, **E-0 F5 landing for the THIRD time**
>   (E-2's table, E-4's eligibility row, the historical figure). Fixed at E-5b; nothing new decided.
> - **⚠ `$349` 38 → 29 — E-2 §4.2's row was taken over `<main>`, not over the prose window that
>   section's own text declares.** Measured: prose **29** + `div.tour-cta` **9** = `<main>` **38**;
>   the CTA renders the price once per page in both locales. **Cross-check that makes it a
>   measurement:** the same extraction gives the `ar` cta 981 visible chars, and decoding the two
>   `&middot;` per page as the instrument does yields **981 − 126 = 855** — E-3's committed cta
>   total, exactly. **Rule 8's fourth appearance in this track, and the first found in a figure
>   rather than a plan.**
> - **CONTROLS (rule 5).** Positive: the 10 `ALIGN` terms return Δ 0. Negative: `--falsify`
>   measures the `DIVERGENT` set — terms policy REQUIRES to differ (`Dinosaur Country` −14,
>   `Key Takeaways` −4, `Utah` −63) — and **exits 2 if any reports Δ 0**, which is exactly what an
>   instrument reading one tree twice would print. Control verified red.
> - **⚠ INCIDENTAL FINDING — §4.1 and §4.2 OVERLAP, and §4.2 WINS.** `Utah` reports 2 on the
>   Arabic side; both are Latin and both correct — a **postal address** (`1935 S 1500 E, Vernal,
>   Utah`) and an **institution** (`Utah Field House of Natural History State Park Museum`).
>   **Third instance of one pattern** (cf. E-2 §6.1's `and` inside `Dave and Trudy Wilson`):
>   **an English word inside a §4.2 name or address stays**, whatever other rule would reach it.
>   Carve-out added to the rollout brief §2.1. No corpus change — both sites are correct.
> - **Limitations recorded:** `PILOT` still hardcoded (E-4 §11.0 applies); prose window only;
>   shared-string terms only; **Δ 0 evidences this corpus, not that compliance is automatic** —
>   **E-5 §8 P5 still predicts Δ ≠ 0 for batch 2, and this instrument now decides it.**

> **A correction this file carried, recorded so the next sweep does not
> re-inherit it.** Track C's brief recorded *"B-9 — script validation for Arabic
> locks — ✘ no Arabic lock exists to exercise it."* **Two `ar` glossary locks
> landed at AR-1 and have been enforced since** — `dinosaur-country` and
> `offroad-trail`, both `bound: floor`, in `4i-glossary.json`. The error was
> conflating two gates with two different lock populations: **4h has no `ar`
> locks and no connectives; 4i has two locks.** B-9 therefore had a live,
> unvalidated surface for the whole of AR-2 and needed no corpus at any point.
> This entry, as filed by AR-1, never made that error.
>
> **Track D planning baseline — `f2ade7a`.** That commit versions
> [`AR2-TrackD-brief.md`](AR2-TrackD-brief.md), the Track D brief, and is the
> verified planning baseline. Its commit message is `k`, written by the external
> auto-commit process rather than the author, so the message is not evidence of
> the commit's content — this line is the record. Decisions D1–D4 are resolved in
> [`AR2-TrackD-decisions.md`](AR2-TrackD-decisions.md); the implementation order
> was fixed at **D-1 → D-2 → D-3** and all three have landed.
>
> Two classification claims the brief made and the track then verified: B-8
> splits into B-8a (fail-closed dispatch, corpus-independent — **shipped**) and
> B-8b (the Arabic seam rule, corpus-dependent — **open**); B-10 splits into
> B-10a (registry, gate 4p, `8e9f951`) and B-10b (rendered scan, gate 4q, all
> nine locales per D3 — **shipped**). B-8b and B-11 are the only items still
> genuinely corpus-gated.

**Also still open, as for `de`/`ja`/`zh`:** native-speaker review. Nothing in AR-1
has been read by a native Arabic speaker.
