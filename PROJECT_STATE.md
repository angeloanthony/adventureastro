# PROJECT_STATE — Adventure Tours Vernal

Governing spec: adventure-tours-vernal-build-guide.pdf (July 2026). Read it plus this file at the start of every session. Do not re-analyze completed work.

## ⭐ MILESTONE — Platform declared COMPLETE (owner, 2026-07-11)

The engineering build is done. Architecture, routing, SEO framework, internal
linking, content collections, validation, hub framework, and cornerstone
framework are all frozen at 100%. Pricing is resolved. Author system is 95%
(waiting on owner-supplied photos/bios — see Pending). **No more infrastructure
work unless a bug is found.** The project is no longer "build a website" — it
is now "build the definitive resource about Dinosaur Country," i.e. content,
photography, video, maps, and promotion only.

**Standing instruction for every future content/editorial session** (the
owner's master prompt — apply it without being re-told):
- Do NOT redesign, discuss implementation, suggest engineering improvements,
  or review architecture. The platform is frozen except for bug fixes.
- Act as senior editor. Mission: the most authoritative travel resource for
  Vernal, Dinosaur National Monument, Flaming Gorge, Ashley National Forest,
  and the Uintah Basin.
- Every article: genuinely useful, demonstrates local expertise, helps plan a
  better trip, strengthens topical authority, naturally supports bookings
  without becoming sales copy. No filler, no repetition, no keyword stuffing,
  no invented facts — mark anything needing verification (`VERIFY WITH
  OWNER`/`VERIFY WITH OFFICIAL SOURCE`, per the DNM-guide/Things-to-Do
  precedent already shipped).
- Every article should include (as applicable): Quick Answer, Key Takeaways,
  comparison tables, planning advice, local insights, family considerations,
  accessibility notes, photography tips, seasonal considerations, FAQ,
  internal link recommendations, suggested original photography, suggested
  video opportunities, suggested future supporting spokes.
- SEO: every article strengthens its hub, links upward to its cornerstone,
  and links laterally to related spokes.
- Output production-ready content only — no implementation/architecture
  discussion, no engineering recommendations. (The ✔/⚠/➡ <300-word format in
  "Rules" below still governs *engineering* replies; it does not apply to
  article deliverables, which are the point of the session.)

**Publishing roadmap (owner's sequence — work top to bottom within each
group unless told otherwise):**
- Destination Authority: Ultimate Guide to Vernal → Dinosaur National
  Monument ✔ done → Things to Do in Vernal ✔ done → Flaming Gorge → Ashley
  National Forest → Red Fleet State Park → Steinaker State Park
- Commercial Authority: Ultimate Guide to UTV Riding in Vernal → Beginner's
  Guide to UTV Tours → Family UTV Guide → Private UTV Tours → Group UTV
  Tours → Photography UTV Tours
- Planning: Weekend from Salt Lake City → Weekend from Denver → Weekend from
  Grand Junction → Family Weekend → Romantic Weekend → Three-Day Itinerary
- Seasonal: Spring/Summer/Fall/Winter → monthly guides (Jan–Dec)
- Activities: Hiking, Camping, Fishing, Scenic Drives, Wildlife, Photography,
  History
- Supporting Spokes: expand each hub to 20–40 high-quality supporting
  articles once its cornerstone/pillar exists
- **Original-asset priority (owner's standing recommendation):** original
  photography every season, drone footage, trail maps, GPX files, trail
  difficulty ratings, itinerary maps, firsthand comparison tables, Dave &
  Trudy's local stories — these compound the "Real History, No BS." brand
  advantage in a way AI-generated or competitor text can't replicate. Flag
  these as deliverables in every article's output (per the standing
  instruction above), don't just write text.

## Completed

- ✔ Site audit (2026-07-10) — 26 pages, flat `.html` URLs, conclusions cached
- ✔ Phase 0 hygiene (2026-07-10):
  - robots.txt sitemap URL → `sitemap-index.xml`
  - 404 page created (`src/pages/404.astro`, noindex, root-relative links)
  - Removed dead `style-articles.css` links (4 pages)
  - Fixed 6 broken `trail-*.html` links → `trails.html`
  - URL-encoded og:image/schema image paths with spaces (moab-utv-tours, moab-alternative, trails)
  - privacy-policy: full head (description, OG, Twitter, canonical)
  - booking: OG, Twitter, canonical, LocalBusiness schema
  - Logo `href="#"` → `index.html` (4 pages + Header.astro)
  - best-restaurants: wrong phone (435) 790-5339 → (435) 219-9447
  - Assets: favicon.svg 13.6MB → 58KB; logo.webp 1.5MB → 312KB (kept 1024², used as og:image); logo1.webp 231KB → 6KB; deleted unused logo2.png

## In Progress

- (none — Phase 1 complete, awaiting Phase 2 approval)

## Completed (cont.)

- ✔ Phase 1 foundation (2026-07-10):
  - `src/config/site.ts` — single source of truth for NAP/hours/pricing; `pricing` fields left `null`/TODO pending the $349/$125 vs. $299/$100/$99 conflict. `src/data/business.ts` removed (unused, superseded).
  - Content collections (`src/content.config.ts`, Astro v6 loader API): utv, atv, jeep, dinosaur-national-monument, hiking, camping, fishing, scenic-drives, guides, itineraries (content), cities/seasons/months (data). Zod schemas enforce title ≤65, description 120–165, heroAlt ≥20. No sample content seeded.
  - Layouts: BaseLayout (now owns `<html>/<body>`), PillarLayout, HubLayout, SpokeLayout, TourLayout, CityLayout, ItineraryLayout.
  - Components: Seo, SchemaLocalBusiness/Article/Faq/Tour/Itinerary (Breadcrumbs emits its own BreadcrumbList), Header, Footer, Breadcrumbs, TourCta, HubIndex, RelatedArticles, QuickFacts, FaqAccordion, AuthorByline, KeyTakeaways, ItineraryDay.
  - Header/Footer wired into all 26 legacy pages (404.astro intentionally excluded — keeps its deliberate root-relative nav from Phase 0). Footer is prop-configurable (`variant`, `trails`, `contact`, `info`, `columns`, `copyright`) because the 16 "full"-footer pages had already diverged in real content (different link sets, contact formatting, copyright text) — each page's exact existing footer is reproduced via props rather than silently normalized. 10 "spoke" article pages share one identical `variant="compact"` footer.
  - Split sitemap framework (`sitemap-tours/hubs/articles/cities/itineraries/seasonal.xml`) built but **not** wired into robots.txt — the existing `@astrojs/sitemap`-generated `sitemap-index.xml` still covers all live pages. Cutting over is a deliberate live-indexation change, not a Phase 1 default.
  - Fixed incidentally: broken `href="#"` on privacy-policy's Safety Guidelines footer link → `safety-guidelines.html`; logo alt-text typo "Adventure Tour Vernal" → correct; Footer address-line whitespace collapse bug (Astro HTML compression ate the space between adjacent `{expr} {expr}` — merged into one template literal).
  - Full site build verified clean (27 pages); every page has exactly one `<body>`, one nav, one footer (404 excepted).

## Completed (cont.)

- ✔ Phase 2 modernization pass (2026-07-10) — modernized all 26 live pages **without any
  URL change, redirect, merge, or content rewrite**. (NOTE: this "Phase 2" is the
  modernize-in-place pass requested by the owner, distinct from the earlier
  URL-migration "Phase 2" still listed under Pending.)
  - BaseLayout now owns the shared head assets (fonts preconnect/stylesheet, `styles.css`,
    3 favicons) via an `assets` prop (default true); every page's duplicated asset `<link>`s
    removed. 404.astro opts out (`assets={false}`) to keep its root-relative set.
  - Every page's hand-written `<head>` replaced with the `<Seo>` component (exact
    title/description/canonical/OG/Twitter preserved; `ogTitle`/`ogDescription`/
    `twitterTitle`/`twitterDescription` overrides added to Seo to reproduce pages whose
    social copy deliberately differs). Seo now also emits the full Twitter card + og:site_name
    everywhere (additive on the pages that lacked them).
  - `<Breadcrumbs schemaOnly>` added to all 25 interior pages → BreadcrumbList JSON-LD
    (home + 404 excluded). Used schemaOnly (no new visible trail) because content pages
    already ship a styled `.article-breadcrumb` and the Phase-1 `.breadcrumbs` component
    had no CSS; added scoped styles to Breadcrumbs for future visible use.
  - **All existing JSON-LD preserved verbatim** (Article/FAQ/TouristAttraction/
    TouristInformationCenter/OfferCatalog/LocalBusiness/Person). See "Open Decisions" for
    why hand-JSON-LD was NOT swapped to the Phase-1 schema components.
  - Validation gate: pre/post dist diff — zero SEO values removed or changed (only additive);
    every JSON-LD block byte-preserved + BreadcrumbList added; bodyHtml untouched on every
    page (pricing, AI-summary blocks, phones intact); build clean (27 pages); assets load once.

## Completed (cont.)

- ✔ Phase 3 gate corrections (2026-07-10) — approved at the pre-Phase-3 gate review;
  validated by pre/post dist diff (all 27 pages SEO byte-identical; only diffs are
  relative→root-relative link conversions), `astro check` 0 errors, and a temporary
  end-to-end smoke test (spokes + pillar built, verified, then deleted).
  - **#1 Root-relative URLs:** BaseLayout assets, Header, Footer defaults, Breadcrumbs,
    `SITE.booking.path` all root-relative — shared components now work on nested routes.
    Legacy pages passing custom Footer link props still pass relative hrefs (fine at
    root; new pages must pass root-relative — noted in Footer's comment).
  - **#4 RelatedArticles + tags:** `tags` (min 1, required) added to spoke schema;
    RelatedArticles implements the guide §4.5 tiers — same-hub-by-shared-tags →
    manual `related` overrides ('id' or 'hub/id'; unresolvable ref FAILS the build)
    → cross-hub-by-tag → most-recent fallback. Verified tier ordering in smoke test.
  - **#5 Hub registry:** `src/lib/hubs.ts` — slug = collection name = URL segment;
    spokeHref/pillarHref/spokeSitemapLoc are the SINGLE change point for the G2 URL
    decision. Deviations from guide's verbatim enum: 'dnm'→'dinosaur-national-monument'
    (canonical = collection name), 'family' removed (it's a tag, not a hub — guide §2.1
    has no /family/ URL). `hub` frontmatter is now a per-collection literal with default
    (wrong hub = build failure). content.config generates hub collections from the registry.
  - **#7 aggregateRating removed** from sitewide SchemaLocalBusiness (self-serving-review
    risk); ratings only on Product schema next to visible reviews (SchemaTour unchanged).
  - **#8 URL absolutization:** `src/lib/urls.ts` absoluteUrl(); Seo, SchemaArticle,
    SchemaItinerary, SchemaTour, Breadcrumbs schema all normalize through it.
  - **Build-time validation (owner-requested):** zod gates (tags required, author enum,
    hub literal, heroImage must exist in public/) + `scripts/validate-site.mjs` post-build
    (broken internal links, orphan pages unreachable from index, hub-without-pillar,
    spoke-without-RelatedArticles/AuthorByline). Wired into `npm run build`; parses
    HUB_SLUGS from the registry. Verified: catches missing tags, orphans, broken links.
  - **Latent Phase-1 bug found & fixed by the smoke test:** all six new layouts wrapped
    content in a literal `<body>` with no slot — BaseLayout has no default slot, so every
    layout-rendered page would have been EMPTY (and nested `<body>`). Now `<Fragment
    slot="body">` in Spoke/Pillar/Hub/Tour/City/Itinerary layouts. Smoke test confirmed
    exactly one `<body>`/nav per page.
  - **`src/lib/authors.ts`** — single author source (name/role/photo/pagePath) consumed by
    SchemaArticle, SchemaItinerary, AuthorByline; Phase 3 author pages = one-file update.
    ⚠ Author photos `/images/dave.webp`, `/images/trudy.webp` DO NOT EXIST yet — the
    validator will fail the first Phase 3 build until real photos are added (deliberate).

## Completed (cont.)

- ✔ Phase 2.6 infrastructure hardening (2026-07-10) — owner-approved split: finish all
  framework work that publishes NO permanent content, then stop for business decisions.
  - **Phase ladder (owner, 2026-07-10):** ✅ P0 hygiene · ✅ P1 foundation · ✅ P2
    modernize-in-place · ✅ P2.5 gate corrections · ✅ P2.6 hardening · ⬜ P3 first
    permanent content · ⬜ P4 cornerstone content.
  - `cityHref()`/`citySitemapLoc()` added to `src/lib/hubs.ts`; sitemap-cities no longer
    hardcodes the URL shape (registry stays the single G2 change point). `tourHref()`
    deferred until the first hand-built tour page exists.
  - Zod: tags must be lowercase-kebab (case drift silently splits RelatedArticles
    matching); `updatedDate >= publishDate`; heroImage must be .webp/.avif AND ≤500KB
    (local files; remote URLs pass).
  - validate-site.mjs new checks: sitewide `<title>` uniqueness; meta-description
    uniqueness; every JSON-LD block parses; every `<img>` has an alt attribute (empty
    allowed = explicit decorative); thin-content floor — spokes need ≥600 words in
    `<main>` (stub catcher; guide §4.2 editorial target stays 1,200–2,500). All 27
    legacy pages pass all new checks.
  - Generic spoke route `src/pages/[hub]/[id].astro` — one route renders every hub
    collection through SpokeLayout; emits zero pages while collections are empty;
    filters `draft: true` (as do the split sitemaps).
  - authors.ts expanded: stable Person `@id` (`…/#dave-wilson`, site-root anchored so it
    survives any page move — NEVER change once content ships), `bio`/`credentials`/
    `sameAs` fields (empty + TODO: owner-supplied facts only, nothing invented), and
    `personJsonLd()` — SchemaArticle/SchemaItinerary now emit authors only through it.
  - **Image architecture decision (2026-07-10):** heroImage/og images stay in `public/`
    (stable absolute URLs for og:image + JSON-LD; validator built around it), hardened
    by the webp/avif+500KB gate. Rendered in-article images should live in `src/` and
    go through astro:assets for automatic optimization once Phase 3 authoring starts.
    Rationale: heroes here are metadata (layouts pass them to Seo/schema only, never
    render an `<img>`), so srcset buys nothing; optimization belongs to body images.
  - Verified by smoke test (temp spokes + pillar, then deleted): bad tag casing +
    date order + oversized hero all fail zod in one report; draft entry absent from
    dist AND sitemap-articles; published spoke carries byline/related/Person @id/
    BreadcrumbList; orphan + thin-content checks fire; final clean build 27 pages, 0
    errors (`astro check` also 0).
  - ⚠ Gotcha: Astro's content store is `node_modules/.astro` — after DELETING a content
    file, stale entries can keep building; clear that dir if ghosts appear.
  - Noted, not in scope: ~70 legacy images in `public/images` exceed 500KB (up to
    3.7MB PNGs) — legacy pages don't go through the hero gate; a compression pass is a
    worthwhile future hygiene task.

## Completed (cont.)

- ✔ **G2 URL migration EXECUTED (2026-07-10, owner-approved: "approve the architecture").**
  Architecture is now FROZEN except bug fixes. Directory URLs sitewide
  (`trailingSlash: 'always'`, `build.format: 'directory'`); all 26 legacy .html URLs
  301 directly to final homes via `public/_redirects` (Cloudflare Pages) — never chain;
  if a page moves again, EDIT its line.
  - **Disposition map (approved + executed):** KEEP at root: index→`/`, about, booking,
    faq, 3 policies, 404. PILLARS: trails→`/utv/`, things-to-do-vernal-utah→
    `/things-to-do/`, dinosaur-national-monument-tours→`/dinosaur-national-monument/`.
    SPOKES: best-utv-trails/side-by-side-rentals/group-utv-tours/backcountry-tours→
    `/utv/…/`; attractions/kids/restaurants→`/things-to-do/…/`; petroglyphs→
    `/dinosaur-national-monument/…/`; what-to-bring/what-to-wear/weather/moab-utv-tours→
    `/guides/…/`. MERGED (redirected; source in git history): outdoor-activities→
    `/things-to-do/`, moab-alternative→`/guides/moab-utv-tours/`. ROOT-until-hub-exists:
    atv-trails, jeep-trails (update their _redirects lines when /atv/ + /jeep/ launch).
  - `things-to-do` hub added to the registry (guide §2.2). Hub helpers emit `/hub/`,
    `/hub/spoke/`, `/from/city/`. 334 internal links + 141 bare `images/` refs
    root-relativized by codemod; JSON-LD absolute URLs rewritten (0 `.html` remain in
    dist); moved pages' import depths fixed; llms.txt about URL updated.
  - Validator: also checks CSS `url(...)` backgrounds now (the migration exposed that
    gap — 141 refs were invisible to the href/src regex). Grandfather lists added,
    BURN DOWN IN PHASE 3: `LEGACY_SPOKES` (12 pre-collection pages exempt from
    byline/related/thin until converted) + `PILLAR_PENDING` (['guides'] until its
    pillar is written).
  - Verified: 25 pages (27−2 merges), validator green, `astro check` 0 errors,
    canonicals/og:url/sitemap all emit directory URLs.
  - **Hub priority (approved):** 1. UTV → 2. Things to Do → 3. DNM → 4. Guides →
    5. Cities (SLC). Camping/Hiking/Scenic-Drives wait (no seed content); family = tag;
    History/Stories = Phase 4.
  - **Post-deploy tasks (first deploy after this ships):** verify 301s live; submit new
    sitemap in Search Console; watch Coverage for the redirected URLs.

## Completed (cont.)

- ✔ **Phase 3 author system (Tasks 1–2) — 2026-07-10.** Canonical author pages
  `/about/dave/` + `/about/trudy/` via new `AuthorLayout.astro`. Each emits a
  ProfilePage → Person node whose `@id` is the STABLE root anchor from
  `authors.ts` (`…/#dave-wilson`, never the page URL), plus worksFor, knowsAbout
  (areas of expertise), breadcrumbs (Home › About › Name), self-canonical, OG,
  SEO, and an auto-populating "Articles by …" listing (empty until spokes exist).
  - `authors.ts`: `pagePath` now points at the dedicated pages (rewires every
    byline + Person `url` sitewide in one edit); added `expertise[]` (reused
    verbatim from the existing `/about/` `knowsAbout` schema — not invented) and
    `photoExists()`. Dave `bio` = the verbatim owner-published `/about/` Person
    description; Trudy `bio` left empty (no individual bio on the live site —
    TODO owner input); her visible intro is reframed from existing founding copy.
  - **No invented facts:** every field traces to existing site/config copy.
  - **Missing photos don't fail prod:** `dave.webp`/`trudy.webp` don't exist yet;
    AuthorByline + AuthorLayout render an initials monogram instead of a broken
    `<img>`, and `validate-site.mjs` now prints non-blocking owner-input TODOs
    (photo, bio, sameAs) after the green line.
  - about.astro links both author pages (reachability). Verified: `astro check`
    0 errors; build 27 pages (25 + 2); validator green + 5 TODOs; JSON-LD parses.

## Completed (cont.)

- ✔ **Phase 3 UTV hub pilot (Task 3) — 2026-07-10.** Owner-approved "pilot UTV
  first, then replicate." All 4 UTV spokes converted from legacy `.astro` →
  content-collection `.mdx`, now rendering through `[hub]/[id].astro` +
  SpokeLayout.
  - **Installed `@astrojs/mdx@6.0.3`** (Astro-6 compatible; v7 needs Astro 7) and
    wired `mdx()` in astro.config — the collection glob already expected `.mdx`;
    this completes that setup. Legacy `.astro` spokes DELETED (avoids route
    collision with the generic spoke route; source in git history).
  - **Faithful reuse, no invention:** editorial copy ported verbatim; existing
    `datePublished` reused as publish/updated dates; og:image stays `logo.webp`
    (was the Seo default); FAQ moved to frontmatter → FaqAccordion renders it
    visibly AND as FAQPage JSON-LD. Minor meta trims only where zod required
    (title ≤65 / desc ≤165). **author=`dave`** chosen for all 4 (lead guide/owner
    voice) — an editorial attribution, flagged for owner confirmation.
  - **Schema upgrade:** Article author is now Person (`#dave-wilson`, stable @id)
    instead of Organization — the deferred Open-Decision change, correct now that
    author pages exist. Each spoke emits Article+FAQPage+Breadcrumb+LocalBusiness.
  - **Framework:** SpokeLayout gained `faq`/`ogTitle`/`ogDescription`; spoke schema
    gained optional `ogTitle`/`ogDescription`; HubIndex/TourCta/AuthorByline given
    scoped styles (were classless). Pillar `utv/index.astro` now renders
    `<HubIndex collection="utv">` listing all 4 spokes.
  - **Validator:** all 4 UTV entries removed from `LEGACY_SPOKES` — they pass
    byline/RelatedArticles/thin-content on their own. Tags interlink them (shared
    `vernal`); each shows 3 related cards.
  - Verified: `astro check` 0/0; build 27 pages; validator green; all 4 in live
    sitemap; FAQ/Article(Person)/Breadcrumb schema valid; 1,574 words on the lead
    spoke. **⚠ Gotcha reconfirmed:** must `rm -rf node_modules/.astro` after
    adding/removing content files or stale entries persist.

## Completed (cont.)

- ✔ **Phase 3 Things-to-Do + DNM hubs (Tasks 4–5) — 2026-07-10.** Replicated the
  UTV pattern (owner-approved "convert 3 now, defer restaurants").
  - Converted to collection `.mdx`: `things-to-do/vernal-utah-attractions`,
    `things-to-do/fun-things-to-do-vernal-utah-kids` (hub `things-to-do`), and
    `dinosaur-national-monument/petroglyphs-rock-art-vernal` (hub `dnm`). Legacy
    `.astro` deleted. Same faithful-reuse rules (copy/dates/FAQ verbatim, Article
    author→Person dave, meta trimmed only to satisfy zod).
  - **HubIndex** added to both pillars (`things-to-do/index.astro`,
    `dinosaur-national-monument/index.astro`): Things-to-Do lists 2 spokes, DNM
    lists 1. **DNM single-spoke RelatedArticles** solved by the shared `vernal`
    tag → cross-hub tier-3 pulls UTV/Things-to-Do cards (4 related cards render).
  - **Hero image compressed:** petroglyphs' `20.webp` 525KB→249KB via sharp
    (q78) so it passes the ≤500KB gate and stays the og:image (better than the
    logo fallback). Recompress-in-place failed on Windows (file lock) — wrote to
    a temp name then swapped.
  - **best-restaurants deferred** (restaurant listicle — wants Restaurant/ItemList
    schema, not Article) but its **wrong schema phone `+14357905339` fixed in
    place → `+14352199447`** (closes that Open Decision). Still grandfathered in
    `LEGACY_SPOKES` alongside the 4 guides pages.
  - Verified: `astro check` 0/0; build 27 pages; validator green; all 3 new spokes
    in live sitemap with full Article(Person)+FAQPage+Breadcrumb+LocalBusiness
    schema; both HubIndexes render; unique titles/descriptions.

## Completed (cont.)

- ✔ **Phase 3 remaining infrastructure (Tasks 1–6) — 2026-07-10.** Completes the
  Phase 3 punch list (guides pillar, restaurant schema, nav, SLC template,
  link audit, validation) before Phase 4 cornerstone content begins.
  - **Guides hub activated:** all 4 guides (`vernal-weather-guide`,
    `what-to-wear-utv-tour`, `what-to-bring`, `moab-utv-tours`) converted
    legacy `.astro` → collection `.mdx` (copy/FAQ/dates reused verbatim
    where they existed; `what-to-bring`/`moab-utv-tours` had no prior
    dates — assigned by content-cluster inference, administrative
    metadata only, not a business fact). New `src/pages/guides/index.astro`
    pillar (Article+FAQPage schema, HubIndex, new ~450-word intro copy
    tying the 4 guides together — no invented business facts). Guides
    removed from validator's `PILLAR_PENDING`/`LEGACY_SPOKES`.
  - **best-restaurants structured data upgraded:** added `Restaurant` +
    `ItemList` JSON-LD (12 restaurants; name/address/phone/cuisine/url
    transcribed directly from the existing visible cards — no invented
    priceRange/geo/hours). Breadcrumbs/FAQ/canonical/OG were already
    present from Phase 2/3 — untouched. Editorial content unchanged.
    Page stays in `LEGACY_SPOKES` (still a hand-authored `.astro`, not a
    collection spoke — that conversion is separate future work).
  - **Global nav:** Header gained top-level links for Things to Do, DNM,
    and Guides (alongside existing Trails); `ActiveKey` extended.
    Footer's *default* `info` config (rendered by every bare `<Footer />`
    — i.e. every collection spoke via SpokeLayout) gained an "Explore
    Vernal" second column linking all 4 active hubs + the new SLC page;
    index.astro's footer override updated to match. Only real/active
    hubs are linked — atv/jeep/hiking/camping/fishing/scenic-drives stay
    unlinked (no pillar yet).
  - **First city page:** `/from/salt-lake-city/` — new `cities` collection
    entry (drive time/distance/route are public, verifiable geography,
    not invented business facts) + `CityLayout` extended with an "Explore
    Vernal" hub-links section and an optional `relatedLinks` prop (cities
    aren't a hub collection, so `RelatedArticles`/`HubIndex` don't apply
    directly — this is the reusable template for future `/from/[city]/`
    pages). Page carries an explicit in-body TODO comment for
    owner-supplied local tips/photography — nothing invented to fill it.
  - **Schema fix:** `citySchema`/`seasonSchema`/`monthSchema` `updatedDate`
    changed `z.date()` → `z.coerce.date()` — the JSON/YAML dataLoader
    doesn't auto-parse date strings the way markdown frontmatter does;
    this broke on the first real `cities` entry and would have broken
    seasons/months too.
  - Verified: `astro check` 0 errors; `npm run build` → 29 pages, 0
    validator errors (only the pre-existing 5 non-blocking author-photo/
    bio/sameAs TODOs); manual dist spot-checks confirm Dave's author page
    lists all 4 guides, the restaurant ItemList has 12 entries, the SLC
    page links all 4 hubs and is itself linked from the default footer
    (reachable, not orphaned), and Header on every page links all 4 hubs.

## Completed (cont.)

- ✔ **G1 pricing RESOLVED (2026-07-11, owner-confirmed final pricing: $349/machine,
  up to 2 riders included, 3-hour guided tour).** Sitewide normalization pass —
  every remaining `$299`/`$100`-ride-along reference (the Build Guide's superseded
  figures) replaced with the confirmed `$349`/`$125` figures already live on
  `index.astro`; `$99/hr` overage was already consistent everywhere and untouched.
  - `SITE.pricing` in `site.ts` populated (`baseTour: 349, rideAlong: 125,
    overagePerHour: 99`) — no longer `null`/TODO. `TourCta.astro`, `SchemaTour.astro`,
    `TourLayout.astro` had their stale conflict-TODO comments removed (their logic
    already correctly read from `SITE.pricing`/took an explicit prop — no code
    changes needed there beyond the comment cleanup). `TourCta` now renders a live
    `$349/machine` price instead of the "Call for pricing" fallback everywhere it's
    used (Spoke/Pillar/Hub/Author/City layouts).
  - Updated: `llms.txt` pricing line + Last Updated stamp, and every content
    `.mdx`/`.astro` page that quoted `$299`/`$100` (10 UTV/Things-to-Do/DNM/ATV/Jeep
    pages) — visible copy, hidden AI-summary blocks, and FAQ text all updated in the
    same pass so no page is inconsistent with another.
  - `guides/moab-utv-tours.mdx` needed a substantive fix, not just a find/replace:
    its "Solo $299 / Couple $398" two-tier pricing card and comparison-table row
    charged extra for a 2nd rider, contradicting the now-confirmed "up to 2 riders
    included" model (and, on inspection, contradicting the site's own $299-era copy
    elsewhere too — a pre-existing bug, not something the price bump created). Fixed
    to a flat $349 for both tiers; the couple's-tour bullet changed from an
    unverifiable "Save $200+" to a conservative, defensible "Save $60+" (true across
    Moab's full quoted $411–$597 range). `updatedDate` bumped to reflect the edit.
    Layout/card structure left untouched — this was a pricing-accuracy fix, not a
    redesign.
  - Verified: repo-wide grep for `299` after the pass returns only the historical
    `site.ts` comment (documents the resolved conflict), `PROJECT_STATE.md`'s own
    history log, and unrelated CSS hex colors (`#229954`) — zero live pricing
    references to the old figures remain. `astro check` 0 errors; build 30 pages;
    validator green.

## Pending

- Author photos (`/images/dave.webp`, `/images/trudy.webp`) + owner-supplied bios,
  credentials, sameAs profile URLs (Dave/Trudy)
- SLC city page: owner-supplied local visitor tips + original route photography
  (marked TODO in-page, not invented)
- Convert remaining legacy `.astro` spokes to collection content: best-restaurants
  (wants its own Restaurant/ItemList-aware layout pass), atv-trails, jeep-trails
  (once their hubs launch)
- Phase 3 content tasks inherited from the merges: fold any unique content from
  the two deleted pages (git history: `src/pages/moab-alternative.astro`,
  `src/pages/outdoor-activities-vernal-utah.astro`) into their merge destinations
- Phase 4: cornerstone content (History/Stories, more cities, tools, i18n)
- Schema-component migration + visible breadcrumbs — deferred, best done alongside
  the remaining legacy-spoke conversions (see above)

## Open Decisions (user)

- ~~Pricing conflict~~ → RESOLVED 2026-07-11: owner confirmed $349/machine, up to 2
  riders included, 3-hour tour. `SITE.pricing` populated; sitewide normalization
  complete (see Completed section above). Ride-along ($125) and overage ($99/hr)
  carried forward from what was already live on index.astro.
- ~~URL migration approval~~ → APPROVED + EXECUTED 2026-07-10 (see G2 section above)
- ~~Page merges~~ → APPROVED + redirected 2026-07-10; content folding is a Phase 3 task
- Footer copyright: cozelosdata.com (14 pages) vs "Adventure Tours Vernal" (best-restaurants) — preserved as-is per page via Footer's `copyright` prop, not normalized
- **Schema components deferred (Phase 2):** existing hand-JSON-LD was preserved verbatim, NOT
  swapped to the Phase-1 `SchemaArticle/SchemaLocalBusiness/SchemaTour` components. Reason:
  faithful reproduction would change author entity (existing = Organization; component = Person),
  publisher shape, date formats, business `@type` — i.e. it changes structured data. Pricing is
  no longer the blocker (resolved above); still recommend doing this WITH the Phase-3 collection
  migration once author attribution (dave/trudy/org) is decided.
- ~~best-restaurants-vernal-utah.astro's JSON-LD wrong phone `+14357905339`~~ → FIXED 2026-07-10 → `+14352199447` (during the Things-to-Do hub activation; page kept as legacy .astro pending a Restaurant/ItemList schema pass)
- Minor: booking.astro's "Book Now" nav button lost its `active` highlight state (Header.astro's shared nav has no concept of a "booking" active page — would need Header's `ActiveKey` type extended to restore); moab-utv-tours/moab-alternative kept a harmless duplicate navbar-shadow-on-scroll listener alongside Header's own

## Rules

- Follow the Build Guide; explain deviations before making them
- URL architecture is FROZEN (G2, 2026-07-10): directory URLs via src/lib/hubs.ts
  helpers only; new redirects go in public/_redirects, never chained; preserve SEO
- No placeholder pages, no invented facts, no thin content
- One phase at a time; responses in ✔/⚠/➡ format, <300 words
