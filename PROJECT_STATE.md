# PROJECT_STATE — Adventure Tours Vernal

Governing spec: adventure-tours-vernal-build-guide.pdf (July 2026). Read it plus this file at the start of every session. Do not re-analyze completed work.

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

## Pending

- **Before Phase 3 content:**
  1. Author photos (`/images/dave.webp`, `/images/trudy.webp`) + owner-supplied bios,
     credentials, sameAs profile URLs
  2. G1 pricing — resolve after Phase 3 content, BEFORE significant indexing of new
     pages (llms.txt already says $299 while index shows $349 — live inconsistency)
- **Phase 3 content tasks inherited from the merges:** fold any unique content from
  the two deleted pages (git history: `src/pages/moab-alternative.astro`,
  `src/pages/outdoor-activities-vernal-utah.astro`) into their merge destinations.
- **Phase 3 (first permanent content), in order:** author pages at /about/dave/ +
  /about/trudy/ (not gated on anything but photos/bios) → UTV Hub upgrade → Things to Do
  → DNM → Guides pillar → SLC city page → nav/footer hub links → convert legacy spokes
  to collection content (burn down the validator LEGACY_SPOKES list; compress each
  page's oversized images while converting).
- Phase 4: cornerstone content (History/Stories, more cities, tools, i18n).
- Schema-component migration + visible breadcrumbs — deferred, best done with Phase 3 (see below)

## Open Decisions (user)

- Pricing conflict: repo pages show $349/$125 vs guide+llms.txt $299/$100/$99 overage — `SITE.pricing` in site.ts left as TODO/null pending this
- ~~URL migration approval~~ → APPROVED + EXECUTED 2026-07-10 (see G2 section above)
- ~~Page merges~~ → APPROVED + redirected 2026-07-10; content folding is a Phase 3 task
- Footer copyright: cozelosdata.com (14 pages) vs "Adventure Tours Vernal" (best-restaurants) — preserved as-is per page via Footer's `copyright` prop, not normalized
- **Pricing (blocks schema componentization):** `index.astro` still shows $349/machine + $125
  ride-along + $99/hr, while all 16 content pages AND the guide use $299. `SITE.pricing` still
  null. Preserved as-is (not touched) in Phase 2. Confirm the correct numbers → then align
  index, fill `SITE.pricing`, and the Tour/Offer schema components become usable.
- **Schema components deferred (Phase 2):** existing hand-JSON-LD was preserved verbatim, NOT
  swapped to the Phase-1 `SchemaArticle/SchemaLocalBusiness/SchemaTour` components. Reason:
  faithful reproduction would change author entity (existing = Organization; component = Person),
  publisher shape, date formats, business `@type`, and Tour/Offer needs the unresolved price —
  i.e. it changes structured data. Recommend doing this WITH the Phase-3 collection migration
  once pricing is resolved and author attribution (dave/trudy/org) is decided.
- best-restaurants-vernal-utah.astro's JSON-LD still has the old wrong phone `+14357905339` (Phase 0 fixed the display format but missed this schema field) — needs a decision to fix now or bundle with next schema pass
- Minor: booking.astro's "Book Now" nav button lost its `active` highlight state (Header.astro's shared nav has no concept of a "booking" active page — would need Header's `ActiveKey` type extended to restore); moab-utv-tours/moab-alternative kept a harmless duplicate navbar-shadow-on-scroll listener alongside Header's own

## Rules

- Follow the Build Guide; explain deviations before making them
- URL architecture is FROZEN (G2, 2026-07-10): directory URLs via src/lib/hubs.ts
  helpers only; new redirects go in public/_redirects, never chained; preserve SEO
- No placeholder pages, no invented facts, no thin content
- One phase at a time; responses in ✔/⚠/➡ format, <300 words
