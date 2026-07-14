# Multilingual Extraction Plan — Adventure Tours Vernal (P2A)

**Status:** planning artifact. **This is NOT a translation milestone and NOT an implementation.**
It identifies every translatable string, categorizes every page, and sequences the extraction
work so that translation (P2 Spanish) can proceed without any architecture change. Nothing here
was implemented; no page, MDX, schema, or locale file was created or modified.

Companion docs: [MULTILINGUAL_HANDOFF.md](../MULTILINGUAL_HANDOFF.md) (frozen rules, repo root),
[PROJECT_STATE.md](../PROJECT_STATE.md). Governing standard: the *Production Multilingual System
for Astro* playbook.

**Method:** a read-only audit of all 24 `.astro` pages, 21 components, 8 layouts, and 3 data
modules (~8,300 lines), fanned across 7 parallel agents, then synthesized here.

---

## 0. Executive Summary

The English site is mature and its **architecture is frozen** (P1 i18n infra is live and inert).
The remaining work to make the site translatable is a **content-extraction problem**, not an
engineering one — exactly the "v2 hard case" the playbook describes.

**Five findings that shape everything below:**

1. **The `set:html` monolith is the dominant pattern.** 14 of the highest-value pages render
   their entire body as one `bodyHtml` template-literal string injected via `set:html`. There are
   **no Astro component/slot boundaries inside them**, so extraction means slicing one opaque
   string per page — not swapping props. This is the single biggest structural risk and the main
   driver of effort.

2. **A clean minority already shows the target shape.** `guides/index.astro` (real Astro markup +
   `<TrustBadge>` instead of an inline rating block) and `from/salt-lake-city.astro` (clean JSX
   with `${city.*}` placeholder interpolation) are the pattern the `set:html` pages should be
   refactored *toward*. The activity pillars (hiking/camping/fishing/scenic-drives) and
   `itineraries/index` also author their bodies as real markup (only their JSON-LD is `set:html`).

3. **A large, high-leverage shared dictionary exists.** Nav, footer, CTAs, section headings, hub
   names, author roles, a11y labels, and the activity-pillar scaffolding repeat across dozens of
   pages. Building the chrome `t()` dictionary once unlocks every page (existence-awareness
   compounds, playbook principle #9). The activity pillars in particular are **one template copied
   four times** — their scaffolding is a single dictionary, with only vocabulary tokens diverging.

4. **JSON-LD is a second, drifting copy of visible prose.** Most pages embed translatable copy
   (Article headline/description, and especially **FAQ answers**) inside raw JSON-LD strings that
   duplicate the visible text — `faq.astro` mirrors **15 Q&A twice**, `things-to-do` 10×, and so on.
   Any translation must localize both copies. The *correct* pattern already exists: `FaqAccordion`
   drives visible + schema from one `faq` prop. Extraction should converge dual-source pages onto it.

5. **Two real i18n defects and one gap exist independent of translation** — worth fixing as part
   of the framework, not deferred: `AuthorByline` hardcodes `toLocaleDateString('en-US')` (English
   dates would leak onto every translated page); `ItineraryDay` uses its time enum as both a CSS key
   and the visible label; and no schema component emits `inLanguage`.

**Bottom line:** the extraction is very doable and mostly mechanical *once* the chrome dictionary
and the per-page content pattern are established on one spike page. The work is front-loaded onto
a handful of architecture decisions (§8) and a shared dictionary (§5), after which pages fall in
batches. Legal pages and the ~57 MDX spokes are the long tail — high word count, low complexity.

---

## 1. Translation Inventory — Category by Page (A/B/C/D)

Per the requested taxonomy. "Effort" is extraction effort (S/M/L), not translation word count.

### Category A — Static content-collection files (translate at the content layer)
The ~57 MDX spokes in `src/content/{hub}/*.mdx` and the JSON/YAML data collections
(`cities/seasons/months`). These are **not** `.astro` extraction targets — they translate as
frontmatter + body via the content pipeline (handoff §2). Largest word volume overall, lowest
per-file complexity. Out of scope for this extraction pass; listed for completeness.

### Category B — Mixed: renders collection/config data **and** inline copy
| Page | Renders (data) | Inline copy | Effort |
|---|---|---|---|
| `pages/index.astro` (homepage) | `SITE.rating`, Footer props | ~100+ short strings + prose, all in `set:html` | **L** |
| `pages/utv/index.astro` | `HubIndex`, `TourDecisionGuide`, `SITE.rating` | hero/intro/gallery/CTA in `set:html` | **L** |
| `pages/things-to-do/index.astro` | `HubIndex` | ~2,400-word article in `set:html` | **L** |
| `pages/dinosaur-national-monument/index.astro` | `HubIndex` | ~650-word article in `set:html` | **M** |
| `pages/guides/index.astro` | `HubIndex`, `TrustBadge` | ~350 words, **real markup** (cleanest) | **S** |
| `pages/hiking/index.astro` | `HubIndex` | ~4,500-word article, real markup; schema `set:html` | **L** |
| `pages/camping/index.astro` | `HubIndex` | ~4,300 words, real markup | **L** |
| `pages/fishing/index.astro` | `HubIndex` | ~4,000 words, real markup | **L** |
| `pages/scenic-drives/index.astro` | `HubIndex` | ~4,400 words, real markup | **L** |
| `pages/itineraries/index.astro` | `GatewayRoutes` | ~largest prose payload, real markup + `set:html` schema | **L** |
| `pages/from/salt-lake-city.astro` | `cities` entry, `GatewayRoutes`, `FaqAccordion` | clean JSX + `${city.*}` placeholders — **city template** | **M** |

### Category C — Inline Astro copy (extract before translating)
| Page | Notes | Effort |
|---|---|---|
| `pages/booking.astro` | `set:html`; cal.com iframe (no native form fields) | **M** |
| `pages/about.astro` | `set:html`; ~400-word first-person narrative + 12 card blurbs | **L** |
| `pages/faq.astro` | `set:html`; **15 Q&A duplicated in FAQPage JSON-LD** | **L** |
| `pages/atv-trails-vernal-utah.astro` | `set:html`; dual FAQ; twin of jeep | **M** |
| `pages/jeep-trails-vernal-utah.astro` | `set:html`; dual FAQ; twin of atv | **M** |
| `pages/things-to-do/best-restaurants-vernal-utah.astro` | `set:html`; 12 cards × repeated labels; strings inside `onclick` handlers | **L** |
| `pages/cancellation-policy.astro` | `set:html`; **LEGAL** | **M** (low priority) |
| `pages/privacy-policy.astro` | `set:html`; **LEGAL** (CCPA/GDPR) | **L** (lowest priority) |
| `pages/safety-guidelines.astro` | `set:html`; **LEGAL/safety** | **M** (low priority) |
| `pages/404.astro` | `set:html`; **reimplements its own nav**, bypasses Header/Footer/Seo | **S** |

### Category C — Data-driven pages (no page-level extraction; translate at content layer)
| Page | Notes | Effort |
|---|---|---|
| `pages/about/dave.astro` | thin wrapper; 2 SEO strings; bio from `authors.ts` | **S** |
| `pages/about/trudy.astro` | thin wrapper; +1 inline `<slot name="bio">` paragraph | **S** |
| `pages/itineraries/[id].astro` | 100% data-driven; only breadcrumb `Home`/`Itineraries` | **S** |
| `pages/[hub]/[id].astro` | 100% data-driven; only breadcrumb `Home` (+ hub name from `hubs.ts`) | **S** |
| `pages/sitemap-*.xml.ts` (×5) | no user-facing content | **none** |

### Category D — Shared UI / components / layouts / data (the dictionary sources)
| File | Extraction target | Effort |
|---|---|---|
| `components/layout/Header.astro` *(FROZEN P1)* | 13 nav labels + `Book Now` + 2 aria | **M** |
| `components/layout/Footer.astro` *(FROZEN P1)* | tagline, 4 headings, info/hub links, copyright, 3 aria; **prop-override call-sites** | **L** |
| `components/layout/Breadcrumbs.astro` *(FROZEN P1)* | `Home` (visible + JSON-LD) + aria | **S** |
| `components/layout/LanguageSwitcher.astro` *(FROZEN P1)* | none (names from registry) | **none** |
| `components/content/TourCta.astro` | `Book Your Adventure`, 4 value-props, `3 hours`, `up to {n} riders`, `Call for pricing` — **sitewide** | **S–M** |
| `components/content/AuthorByline.astro` | `Written by`, `Updated {date}` + **`en-US` date bug** | **M** |
| `components/content/RelatedArticles.astro` | `You Might Also Like` + aria | **S** |
| `components/content/HubIndex.astro` | `Explore This Hub` + aria | **S** |
| `components/content/GatewayRoutes.astro` | heading + 3 route notes + hub link (inline array) | **M** |
| `components/content/TourDecisionGuide.astro` | heading + intro + 16 Q/A (inline array) | **M** |
| `components/content/TrustBadge.astro` | `Google reviews` / `Rated __ out of 5` templates | **S–M** |
| `components/content/KeyTakeaways.astro` | `Key Takeaways` + aria (also duplicated in itineraries pillar) | **S** |
| `components/content/ItineraryDay.astro` | 5 time-of-day labels + `Weather backup plan` + **enum-as-label** | **M** |
| `components/content/QuickFacts.astro` | none (pure data) | **none** |
| `components/content/FaqAccordion.astro` | none (pure data — the *good* dual-source pattern) | **none** |
| `components/seo/*` | no visible copy; **`inLanguage` GAP** to add | **S** |
| `layouts/SpokeLayout.astro` | `Frequently Asked Questions` heading (every spoke/itinerary) | **S** |
| `layouts/CityLayout.astro` | 4 QuickFacts labels + `Explore Vernal` + `More Vernal Guides` + 2 aria | **M** |
| `layouts/AuthorLayout.astro` | 4 headings + `Articles by {name}` + interpolated business paragraph | **M** |
| `layouts/{Base,Pillar,Hub,Tour,Itinerary}Layout.astro` | none (delegate to children) | **none** |
| `lib/hubs.ts` | 10 hub display names (`HUBS[].name`) — feed breadcrumbs/pillars/footer | **M** |
| `lib/authors.ts` | 2 roles + Dave's bio block + 6 expertise items (feed markup **and** Person schema) | **L** |
| `config/site.ts` | `hoursDisplay: 'Open Daily 7am – 7pm'` (one string; rest is never-translate) | **S** |

---

## 2. What needs extraction vs. what's already clean vs. what stays hardcoded

**Needs extraction (inline copy → an authoritative translatable source):** every Category B and
C page above. Priority-ordered in §4.

**Already data-driven (no page-level extraction needed):** `about/dave`, `about/trudy` (via
`authors.ts` + AuthorLayout), `itineraries/[id]`, `[hub]/[id]` (via collections), and the pure-data
components `QuickFacts` and `FaqAccordion`. These translate at the content/data layer.

**Stays hardcoded (never translate — confirmed present across the audit):** brand
`Adventure Tours Vernal`; all NAP in `site.ts` (phone `(435) 219-9447`, address, email); prices
`$349/$125/$99`; fleet `Kawasaki KRX 1000` / `FOX 2.5 PODIUM LSC`; place names (Vernal, Dinosaur
National Monument, Flaming Gorge, Ashley National Forest, Red Fleet, Steinaker, Green/Yampa River,
Uintah Basin, trail names, route/highway numbers, mileages); people (Dave/Trudy Wilson + family);
partner (High Class Limousine, Best Western Vernal, `cozelosdata.com`); all slugs/hrefs/`@id`s;
content-collection `tags`. **Critical nuance from the audit:** these appear *mid-sentence inside
translatable prose* (e.g. homepage/pillar hidden summaries embed price + phone). Extraction must
tokenize them as `{placeholder}`s sourced from `SITE`/data, never leave them for a translator to
touch (playbook §6.8).

**Reduce hardcoding while extracting (opportunity, not required):** the homepage and several pages
hardcode NAP/pricing/fleet/hours **even though `site.ts` exists**. Routing these through `SITE`
during extraction eliminates a whole class of drift for free.

---

## 3. Inventory by Folder

- **`src/pages/` (root):** homepage + 9 commercial/info/legal pages. Mostly `set:html`, mostly
  Category C, highest commercial value concentrated here (index, booking).
- **`src/pages/about/`:** 2 thin author wrappers (data-driven) — real copy lives in
  `authors.ts` + `AuthorLayout`.
- **`src/pages/from/`:** `salt-lake-city.astro` — clean-JSX **template for all future city pages**;
  settle its key/placeholder design first.
- **`src/pages/utv/`, `things-to-do/`, `dinosaur-national-monument/`, `guides/`:** destination/
  commercial pillars. `utv` and `things-to-do` are large `set:html`; `guides` is the clean model.
- **`src/pages/hiking/`, `camping/`, `fishing/`, `scenic-drives/`:** activity pillars — **one
  template ×4**, ~4,000–4,500 words each, real markup. Extract once, replicate.
- **`src/pages/itineraries/`:** `index` (largest single prose payload) + data-driven `[id]` route.
- **`src/components/layout/`:** the chrome — Header/Footer/Breadcrumbs (FROZEN P1) hold the largest
  shared dictionary.
- **`src/components/content/`:** reusable blocks — `TourCta`, `AuthorByline`, `RelatedArticles`,
  `HubIndex` render on nearly every page; `GatewayRoutes`/`TourDecisionGuide` carry inline string
  arrays; `QuickFacts`/`FaqAccordion` are pure-data.
- **`src/components/seo/`:** no visible copy; add `inLanguage` for localized pages.
- **`src/layouts/`:** mostly delegate; `SpokeLayout`, `CityLayout`, `AuthorLayout` carry a few
  section headings.
- **`src/lib/` + `src/config/`:** `hubs.ts` (hub names), `authors.ts` (roles/bios — copy inside a
  data module + schema), `site.ts` (one hours string; everything else never-translate).
- **`src/content/`:** ~57 MDX spokes + data collections — Category A, content-layer.

---

## 4. Extraction Priorities

Ordered by **leverage × commercial value**, aligned to the handoff sequence (chrome → commercial →
pillars → data → legal). Each tier is independently shippable/verifiable.

1. **Shared chrome `t()` dictionary + wire Category D.** Highest leverage — unlocks every page and
   makes existence-awareness compound. Fix the 2 defects + add `inLanguage` here. *(Requires editing
   FROZEN P1 chrome — see §8/§7.)*
2. **Commercial conversion surface:** `TourCta` (sitewide), `booking`, `utv/index`, homepage.
   Highest business value; also where the worst `set:html` monoliths live.
3. **City template:** `from/salt-lake-city` — sets the key/placeholder pattern for every future
   `/from/[city]/` page. Small but pattern-defining; do before scaling cities.
4. **Destination pillars:** `things-to-do`, `dinosaur-national-monument`, `guides`.
5. **Activity pillars as one templated batch:** `fishing` (the origin) → replicate to
   `hiking`/`camping`/`scenic-drives` via the shared scaffolding dictionary.
6. **Itineraries pillar** (`itineraries/index`).
7. **Legacy landings + brand:** `atv-trails`, `jeep-trails`, `about`, `faq` — converge dual-FAQ onto
   `FaqAccordion` here.
8. **MDX spokes (content layer):** the bulk word volume; mechanical once the framework exists.
9. **Legal, last & translate-with-care:** `safety-guidelines` (rider comprehension → slightly
   higher), then `cancellation-policy`, then `privacy-policy` (CCPA/GDPR — lowest; consider
   English-with-localized-summary and official/jurisdiction wording).

---

## 5. Shared Dictionary Candidates (the `t()` namespace)

The consolidated chrome dictionary. **Keep same-destination-different-label strings as SEPARATE
keys** (do not dedupe): `nav.dinosaurMonument` "Dinosaur Monument" ≠ hub "Dinosaur National
Monument"; `nav.thingsToDo` "Things to Do" ≠ hub "Things to Do in Vernal".

**Navigation** (Header + Breadcrumbs + 404's reimplemented nav must all consume these):
`nav.home` · `nav.about` · `nav.trails` · `nav.thingsToDo` · `nav.dinosaurMonument` · `nav.guides` ·
`nav.food` · `nav.info` · `nav.cancellationPolicy` · `nav.privacyPolicy` · `nav.faq` ·
`nav.safetyGuidelines` · `nav.whatToBring`

**CTA family** (consolidate the sprawl — currently `Book Now`, `Book Your Adventure`, `Book a Tour`,
`Book Your Tour`, `Book a Trail`, `Book Your Ride Now`, `Book Your Adventure Now/Online`):
`cta.bookNow` · `cta.bookYourAdventure` · `cta.bookYourRideNow` (mobile sticky, 6 pages) ·
`cta.bookATour` · `cta.callToBook` (`📞 (435) 219-9447` label around the fixed number)

**Footer:** `footer.tagline` · `footer.headings.ourTrails` · `footer.headings.information` ·
`footer.headings.exploreVernal` (shared w/ CityLayout) · `footer.headings.contactInfo` ·
`footer.link.visitingFromSLC` · `footer.copyright.suffix`

**Section headings (layouts + pillars):** `section.faq` "Frequently Asked Questions" (SpokeLayout +
every pillar + atv/jeep/city/best-restaurants) · `section.exploreVernal` · `section.moreVernalGuides`
· `section.relatedYouMightLike` "You Might Also Like" (RelatedArticles) · `section.exploreThisHub`
(HubIndex) · `section.keyTakeaways` (KeyTakeaways + duplicated in itineraries pillar — unify)

**Activity-pillar scaffolding** (one dictionary for all four pillars; per-page overrides only for
divergent vocabulary): `pillar.updatedMeta` "Updated {month} {year} · {brand}" · `pillar.quickAnswer`
"Quick Answer:" · `pillar.planningTips` · `pillar.accessibility` · `pillar.wildlifeSafety` ·
`pillar.verifyOfficialSource` "VERIFY WITH OFFICIAL SOURCE" · table headers `Known For` /
`Distance from Vernal` / `Best For` / `Season` / `What to Expect` / `Factor` / `Summer` /
`Fall (early)` / `If you want…` / `Why` · the closing-CTA template · recurring tip lead-ins
(`High-country reality:`, `Before you go:`, etc.).
*Per-pillar overrides:* axis nouns (`Destination`/`Water`/`Drive`), decision verb
(`Hike at…`/`Camp at…`/`Go to…`/`Drive…`), Photography heading variant, `Safety` vs `Viewing`,
FAQ count (8 vs 7).

**Component chrome:** `tour.bookYourAdventure` + 4 value-props + `tour.threeHours` +
`tour.upToNRiders` + `tour.callForPricing` (TourCta) · `author.writtenBy` · `author.updated`
(AuthorByline) · TrustBadge `reviews.googleReviews` / `reviews.ratedOutOf5` templates ·
GatewayRoutes heading + 3 notes + `See all Vernal itineraries` · TourDecisionGuide heading + intro +
16 Q/A · ItineraryDay `time.morning/lunch/afternoon/dinner/evening` + `itinerary.weatherBackup`

**Hub display names** (`hubs.ts`, 10): `hub.utv` · `hub.atv` · `hub.jeep` ·
`hub.dinosaurNationalMonument` · `hub.thingsToDo` · `hub.hiking` · `hub.camping` · `hub.fishing` ·
`hub.scenicDrives` · `hub.guides`

**Author (`authors.ts` + AuthorLayout):** `author.role.dave`/`author.role.trudy` · `author.bio.dave`
(long block) · `author.expertise.*` (6, shared between both authors) · `author.readFullStory` ·
`author.areasOfExpertise` · `author.credentials` · `author.aboutBusiness` · `author.articlesBy` ·
business-description paragraph template (interpolated).

**QuickFacts labels (CityLayout):** `city.facts.driveTime/distance/route/nearestAirport`

**Business hours (`site.ts`):** `site.hoursDisplay` (split "Open Daily" copy from the numeric times).

**A11y/aria:** `a11y.toggleMenu` · `a11y.breadcrumb` · `a11y.facebook/instagram/youtube` ·
`a11y.relatedGuides` · `a11y.logoAlt` · plus long descriptive `alt`/`figcaption` on figures
(homepage carousel, pillar maps) — real translatable a11y content, not decoration.

**Repeated business-messaging boilerplate → one canonical block:** the "guided Kawasaki KRX 1000
tours + FOX 2.5 PODIUM LSC + Dave and Trudy Wilson + safety gear/briefing included + no experience
required" cluster recurs (paraphrased) across atv/jeep/city/homepage. Make it one translatable
`message.tourBoilerplate` with data placeholders. Also: restaurant-card repeated labels ×12
(`Tour Guest Discount`, `Copy`, `📱 Show to Server`, `Valid with Adventure Tours booking
confirmation`, `📞 Call`/`📍 Map`/`🌐 Website`) and the callout labels (`Note:`, `Important:`,
`⚠️ Warning:`, `Remember:`, `Response Time:`).

---

## 6. Estimated Effort

Extraction complexity only (translation word-count is a separate, larger axis, dominated by the
MDX spokes and pillars).

| Bucket | Files | Effort |
|---|---|---|
| Chrome dictionary + wire Category D | Header, Footer, Breadcrumbs, layouts, 8 components, 3 data modules | **L** (leverage is huge) |
| Commercial `set:html` monoliths | index, booking, utv/index | **L** each |
| Clean-markup pages | guides/index (**S**), from/salt-lake-city (**M**) | **S–M** |
| Destination pillars | things-to-do (**L**), dnm (**M**) | **M–L** |
| Activity pillars (templated) | fishing + hiking + camping + scenic-drives | **L** for the first, then **M** each replicated |
| Itineraries pillar | itineraries/index | **L** |
| Legacy landings + brand/faq | atv, jeep (**M**), about (**L**), faq (**L**) | **M–L** |
| Legal (low priority) | cancellation (**M**), safety (**M**), privacy (**L**) | defer |
| Data-driven (no page work) | about/dave, about/trudy, `[id]` routes | **S** |
| MDX spokes | ~57 files | content-layer; **mechanical**, high word volume |

**Rough sequencing estimate:** the framework tier (dictionary + spike + one commercial page) is the
real unknown — de-risk it first on `guides/index` (cleanest) then one `set:html` page. After that,
pages fall in the handoff's ~5-page batches. The `set:html`→structured-content decision (§8) is the
biggest single effort lever.

---

## 7. Risks

1. **`set:html` monoliths (14 pages).** No component/slot i18n hooks; the body is one JS string.
   Extraction = decompose one template literal per page, preserving HTML entities
   (`&amp;`, `&rsquo;`, `&rarr;`) and `${SITE.*}` interpolations. High risk of breaking markup.
2. **JSON-LD ↔ visible FAQ drift.** `faq.astro` (15×2), `things-to-do` (10), best-restaurants (5),
   dnm (3, *paraphrased* → genuinely two units), atv/jeep, and every activity pillar (8 in schema,
   mirrored visibly). Translate both, or refactor onto `FaqAccordion` (single source) first.
3. **Hardcoded facts mid-sentence.** Prices/NAP/mileages/elevations sit inside translatable prose
   and inside hidden `.page-summary` blocks. Must become `{placeholder}`s from `SITE`/data — never
   translator-editable (playbook §6.8). Validation enforces placeholder parity.
4. **`AuthorByline` `en-US` date defect.** `toLocaleDateString('en-US', …)` renders English months
   on every translated byline. Parameterize locale as part of the framework tier.
5. **`ItineraryDay` enum-as-label.** `block.time` is both a CSS-class suffix and the visible label;
   needs a key→label lookup so the union stays English while output localizes.
6. **Schema `inLanguage` gap.** No SEO component emits it; localized Article/Itinerary/LocalBusiness
   pages need it added.
7. **Footer prop-override call-sites.** Footer *labels* are shared keys, but link *sets* vary per
   page; pages passing custom `columns`/`trails`/`info`/`copyright` supply English literals **outside
   Footer.astro** (index, best-restaurants, privacy, etc.). Those call-sites must be swept or the
   dictionary is silently incomplete.
8. **`404.astro` bypasses chrome.** It ships its own nav and `assets={false}`, so any t() wiring at
   Header/Footer/Seo does **not** reach it — handle explicitly or it drifts to English-only.
9. **Copy inside data modules + schema.** `authors.ts` bio/roles/expertise feed both markup and
   Person schema; `bio` is owner-published verbatim (localizing = editorial/owner-approval, not
   mechanical; Trudy's empty bio must not be fabricated). `hubs.ts` names and `site.ts` hours must
   become locale-aware while slugs/`@id`/NAP stay invariant.
10. **Editing FROZEN P1 chrome is required.** Header/Footer/Breadcrumbs/BaseLayout hold the biggest
    dictionary. Wiring `t()` into them is the *designed* P2 chrome step (handoff §2: chrome → `t()`
    dictionary), but it edits P1-frozen files — flag for explicit owner approval before the framework
    tier (see §8).
11. **Legal accuracy > fluency.** CCPA/GDPR/insurance/waiver wording may need official or
    jurisdiction-correct translation, not machine output. Lowest priority; consider
    English-plus-localized-summary.
12. **Char caps (schema).** `title ≤ 65`, `description 120–165`; Spanish/Italian/Portuguese run
    20–30% longer, so titles/descriptions must be **re-fit**, not literally translated, or the build
    fails (handoff §4).

---

## 8. Recommended Implementation Order

Mirrors the playbook build order (front-load risk; each phase independently verifiable). **Every
step below is future work — nothing is done here.**

0. **Owner decisions first (§ Open Decisions).** Don't build the dictionary until these are settled;
   they change key design.
1. **Framework tier — chrome `t()` dictionary + Category D wiring.** Build the dictionary from §5;
   wire Header/Footer/Breadcrumbs/layouts/components to it (**approved P1-chrome edit**). In the same
   tier, fix the `AuthorByline` locale defect, the `ItineraryDay` enum, and add schema `inLanguage`.
   Handle `404.astro` explicitly. Sweep Footer prop-override call-sites.
2. **Extraction spike on ONE page.** Use `guides/index.astro` (real markup, cleanest). Establish the
   per-page content pattern (a page-content source à la playbook §2), extract, and prove the English
   render is byte/glyph-identical via the 3-diff harness. **Do not scale before this passes.**
3. **Settle the `set:html` decision** on the first commercial monolith (`booking` or `utv/index`):
   convert `set:html` bodies to structured content (cleaner, recommended for high-value pages) vs.
   interpolate translated strings into the existing template literal (smaller diff, fragile). Prove
   with the 3-diff.
4. **City template** (`from/salt-lake-city`) — lock key/placeholder design for future cities.
5. **Commercial** (homepage, remaining conversion pages) → **destination pillars** (things-to-do,
   dnm) → **activity pillars** as one templated batch (fishing → hiking/camping/scenic-drives) →
   **itineraries** → **legacy landings + about + faq** (converge dual-FAQ onto `FaqAccordion`).
   Batches of ~5 pages, tag each (`i18n-extract-batch-N`).
6. **Data modules** — make `hubs.ts` names / `authors.ts` roles+bios / `site.ts` hours locale-aware.
7. **Legal pages last**, translate-with-care.
8. **MDX spokes** — content-layer translation (the bulk), once the framework is proven.

Only after all of the above is the site ready for **P2 Spanish** translation proper.

---

## Open Decisions (owner)

1. **Do hub/label proper nouns translate?** Common nouns (`Hiking`/`Fishing`/`Camping`) clearly do;
   `Dinosaur National Monument` as a *hub label* is a proper noun that likely stays English even in
   Spanish. Decide the policy — it affects `hub.*` keys and place-name handling.
2. **Do author job titles translate?** `Owner & Lead Guide` / `Co-Owner & Guide` read as content;
   they appear in visible markup **and** Person schema `jobTitle`. Translate or keep?
3. **JSON-LD prose language policy.** Translate schema `headline`/`description`/FAQ per locale, or
   keep English and rely on `inLanguage`? (Affects every dual-source page.)
4. **`set:html` refactor scope.** Convert high-value pages to structured content (recommended) vs.
   interpolate into template literals for the long tail (legal). Confirm the split.
5. **P1-frozen chrome edit approval.** The framework tier must edit Header/Footer/Breadcrumbs to wire
   `t()`. Confirm this is the intended chrome-localization step (handoff §2) and approved.

---

## Validation (P2A — this milestone)

Confirmed: **zero page changes · zero MDX changes · zero translations · zero locale files · zero
visible output changes · no build run.** The only artifact produced is this document. The audit was
performed entirely with read-only tools.
