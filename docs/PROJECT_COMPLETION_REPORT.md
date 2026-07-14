# Project Completion Report — Adventure Tours Vernal · Dinosaur Country

**Milestone M9.5 — Engineering-Phase Closeout**
Prepared: mid-July 2026 · Governing spec: `adventure-tours-vernal-build-guide.pdf` (July 2026) · Source of record: [`PROJECT_STATE.md`](../PROJECT_STATE.md)
Synthesizes: M5 (EEAT/media audit + roadmap), M6 (original-media inventory + reusable-map system), M8 (visual-coverage audit), M9.0–M9.4 (field-capture playbook, media-deployment workflow, hero-replacement plan, field-asset manifest).

Scope: **closeout report — documentation only.** Architecture is FROZEN. This report states where the project stands at the close of engineering; it edits no page, changes no code, alters no asset, runs no build, makes no commit.

---

## 1. Executive Summary

**The engineering build is complete and the platform is production-ready.** The owner declared the platform COMPLETE on 2026-07-11; this report is the formal closeout confirming that call against the full M5–M9 record.

Adventure Tours Vernal is a frozen, validated Astro v6 content platform of **57 content-collection spokes across 9 topic clusters**, **9 hub/pillar cornerstone pages**, and **~16 supporting `.astro` pages** (25 `.astro` pages total incl. pillars, author pages, policies, booking, about, FAQ, 404, and the SLC gateway). Every architectural decision the Build Guide called for — directory URLs, hub-and-spoke internal linking, JSON-LD across the entity graph, build-time validation gates, an author/EEAT system, and a reusable-visual library — is **built, integrated, and verified** (`astro check` 0 errors; `validate-site.mjs` green; clean 30-page-class builds throughout).

**The written product is best-in-class.** Every article carries Quick Answer, Key Takeaways, comparison tables, a multi-question FAQ, dense internal linking, an AEO summary block, and disciplined `VERIFY WITH OFFICIAL SOURCE` markers. On text alone this is the most thorough resource in its market (M5 §1).

**One deliberate, well-documented gap remains, and it is not an engineering gap: original media.** The site's single defining weakness (M5 F1–F6) is the near-total absence of original photography/video in a product whose moat is Dave & Trudy's first-hand experience. That gap is *addressed by design* — the entire M9 field program (playbook → deployment workflow → hero plan → asset manifest) is a staged, take-into-the-field production plan waiting only on the owner's capture window. No further engineering is required to close it; only photography and a subsequent unfrozen editorial window.

**Version 1.0 is launch-ready today.** Remaining work is content/media enrichment, not construction (§15).

---

## 2. Final Architecture Summary (FROZEN)

Frozen since the G2 URL migration (2026-07-10, owner-approved). Change only via bug fix.

- **Framework:** Astro v6 (loader-API content collections) + `@astrojs/mdx`. `@astrojs/sitemap` generates `sitemap-index.xml`.
- **URLs:** directory format (`trailingSlash: 'always'`, `build.format: 'directory'`). All 26 legacy `.html` URLs 301 **directly** (never chained) to final homes via `public/_redirects` (Cloudflare Pages). URL shape is the single change-point in `src/lib/hubs.ts`.
- **Collections (9 content hubs):** utv, dinosaur-national-monument, hiking, camping, fishing, scenic-drives, guides, things-to-do, itineraries — plus data collections (cities/seasons/months). Zod schemas enforce title ≤65, description 120–165, `heroAlt` ≥20, tags lowercase-kebab (≥1), `updatedDate ≥ publishDate`, author enum, hub literal.
- **Layouts:** BaseLayout (owns `<html>/<body>` + shared head assets) → PillarLayout, HubLayout, SpokeLayout, TourLayout, CityLayout, ItineraryLayout, AuthorLayout.
- **SEO / structured data:** `Seo` component + `SchemaArticle/Faq/Tour/Itinerary/LocalBusiness`; `Breadcrumbs` emits BreadcrumbList. All URLs absolutized via `src/lib/urls.ts`. Author entity is a stable root-anchored Person `@id` (`…/#dave-wilson`) — never change once shipped.
- **Validation (wired into `npm run build`):** the frozen zod **hero gate** (heroImage exists in `public/`, `.webp/.avif`, ≤500 KB) + `scripts/validate-site.mjs` (broken links, orphan pages, hub-without-pillar, spoke-without-byline/RelatedArticles, title/description uniqueness, JSON-LD parse, every `<img>` has alt, ≥600-word thin-content floor, CSS `url()` background refs).
- **Image architecture:** heroes are **metadata-only** in `public/` (feed og:image + JSON-LD `image`, never rendered as `<img>`); body images belong in `src/` through `astro:assets`.

**Frozen surfaces (do not modify):** layouts · routing · collections · schemas · CSS · components · validators · navigation · JSON-LD · build pipeline.

---

## 3. Content Summary

| Cluster | Spokes | Pillar | Notes |
|---|:--:|:--:|---|
| UTV | 7 | ✔ | Commercial core; all heroes real |
| Hiking | 16 | ✔ | Largest cluster |
| Itineraries | 9 | ✔ | Incl. 3 gateway road-trips + SLC city page |
| Guides | 9 | ✔ | Destination cornerstones + UTV prep |
| Camping | 4 | ✔ | |
| Fishing | 4 | ✔ | |
| Scenic Drives | 4 | ✔ | |
| Dinosaur NM | 2 | ✔ | Both carry real `20.webp` heroes |
| Things to Do | 2 | ✔ | + legacy `best-restaurants` `.astro` |
| **Total** | **57 spokes** | **9 pillars** | + 25 `.astro` pages |

- **Editorial standard:** every article meets the senior-editor bar (Quick Answer, Key Takeaways, tables, FAQ→FAQPage JSON-LD, upward/lateral internal links, AEO block, verification markers). No filler, no invented facts.
- **Pricing:** RESOLVED (2026-07-11) — $349/machine (up to 2 riders, 3-hr tour), $125 ride-along, $99/hr overage; normalized sitewide (`SITE.pricing`).
- **Author system:** `/about/dave/` + `/about/trudy/` ProfilePage→Person pages; bylines wire through `src/lib/authors.ts`.

---

## 4. EEAT Summary

The EEAT framework is **fully engineered**; its remaining fuel is media, not code.

- **Built:** stable Person entities with `@id`, worksFor, knowsAbout; AuthorByline on every spoke; ProfilePage author pages; visible social proof surfaced on `about` (5.0★ / 82 Google reviews); disciplined verification markers; deep internal linking that establishes topical authority per hub.
- **The structural EEAT gap (M5 F4):** the **byline outruns the evidence** — articles are attributed to Dave but read as researched, not lived, because no original photo or dated field note sits beside the claims. The fix is not more text; it is (a) original photography, and (b) the **dated field-note caption layer** (Dave/Trudy voice, generally located) specified in M9.0 §5 / M9.2 Stage 5.
- **Live contradiction to retire (M5 F5):** `about.astro` embeds six generic destination YouTube clips and `moab-utv-tours` a generic hero embed — third-party media undercutting the first-hand schema. M9.4 FD1-V03 (owner-intro film) is the specified replacement.
- **Highest single lever (M5 §3.4):** a Dave/Trudy **dated sample photo portfolio** on `photography-hikes-near-vernal`, reusable across all 7 sibling pages — converts the byline from claim to proof cluster-wide.

---

## 5. Visual Asset Summary

Per M8.5 (Visual Coverage Audit): **the reusable-visual library delivered ~80% of its value with ~50% of its planned count, and its high-reach work is done.**

- **Present on disk:** **12 reusable SVGs** under `public/images/maps/` + `public/images/graphics/` (M8.5 documented 9 — 7 maps + 2 decision graphics — with the 1:1 source-note coverage; the tree now shows 12, later additions tracked by the parallel workstream). All follow the SVG Engineering Standard (light theme + dark override, numbered layers, `role="img"`/`<title>`/`<desc>`, self-contained).
- **Integration:** M8.5 verified **63 asset-embeds across 40+ pages**; all four ⭐ multiplier maps (regional, UTV, hiking, dino-country) and both whole-site decision graphics sit on the exact top-of-funnel planning surfaces.
- **Remaining unique-value visual backlog (desk, no travel):** climate charts (M5 F7 "defining gap" on the weather guide) → elevation-ladder diagram → geology cross-sections → deep-time timeline. M8.5 explicitly **cancels** the redundant planned graphics (regional infographic, planner grid, per-hub comparison/decision duplicates).
- **Reuse-not-build gaps:** guides/camping pillars, family/romantic itineraries, atv/jeep → covered by *placing existing* SVGs (M-REGIONAL, M-UTV), zero new production.

---

## 6. Original Media Status

The core of the remaining work. Repo-verified against the live tree (M9.3 audit):

- **Body images:** **zero** across `src/content/**` — not one `astro:assets` import or markdown image. Every article is text with a metadata-only hero. First body images are net-new editorial-window work.
- **Hero photos:** **42 of 57 content spokes still ship `heroImage: /images/logo.webp`** (down from the M5 baseline of 56 → M6.1 deployed 10 → parallel workstream since took it to 42). UTV (7/7) and DNM (2/2) are fully off the logo.
- **Deployed originals (M6.1, no travel):** 10 pages upgraded from existing on-disk frames (Doc's Beach, Moonshine Arch, Sunset Rides, Groups, Family Friendly, etc.), each visually inspected so alt honestly matches the frame.
- **Author portraits:** `dave.webp` / `trudy.webp` do not exist yet — byline/author pages render an initials monogram; validator prints a non-blocking TODO.
- **Video:** `about.astro` still carries six third-party embeds; no original Adventure Tours footage exists yet.

**The full production apparatus is documented and staged** (M9.0 what/why to shoot · M9.2 how each file is processed & shipped + rollback · M9.3 which page each hero serves · M9.4 the field manifest). Nothing here is unplanned; it awaits capture.

---

## 7. Remaining Field Work

Six sequenced field days retire **33 of the 42** logo heroes and produce the video library (M9.4):

| FD | Window (2026) | Focus | Heroes retired |
|---|---|---|:--:|
| **FD1** | Late July (ASAP) | Town & UTV — commercial core, any weather | 4 |
| **FD2** | Late Jul–early Aug | Dinosaur NM — weather-proof indoors | 5 |
| **FD3** | Aug, calm dawn | Red Fleet trackway + Steinaker | 7 |
| **FD4** | **Aug, before ~mid-Sept** | Ashley NF & High Uintas — **summer window closing** | 8 |
| **FD5** | Aug–early Sept | Flaming Gorge | 5 |
| **FD6** | Late Sept–Oct | Scenic Drives — **fall color** | 4 |

- **Highest urgency:** FD4 (retires the most pages **and** its window physically closes in ~8 weeks — unrecoverable until summer 2027).
- **Highest fragility:** FD3 (the rarest asset, the Red Fleet trackway, needs one glass-calm dawn).
- **Video target:** ≥1 long-form + ≥4 Shorts per day, plus the FD1 tour highlight reel (booking hero) and owner-intro film.

---

## 8. Remaining Hero Replacements

Per M9.3, retiring **42** logo spokes, by group:

| Group | On logo | Field-day path |
|---|:--:|---|
| Hiking | 16 | FD2/FD3/FD4/FD6 + 2 seasonal + 4 opportunistic |
| Itineraries | 7 | FD2/FD4/FD5 + **3 desk-cartography route maps** |
| Guides | 6 | FD1/FD3/FD5 |
| Fishing | 4 | FD3/FD5 |
| Camping | 4 | FD3/FD4/FD5 |
| Scenic Drives | 4 | FD2/FD6 |
| Things to Do | 1 | FD1 |
| **Total** | **42** | |

- **Trajectory:** FD1–FD6 take the count **42 → 9** (clears the M5 "≤10" target). The residual **9** = 3 route-map itineraries (desk cartography, no photo), 2 dedicated seasonal passes (spring/winter hiking), 4 opportunistic long-lens/low-elevation hiking pages.
- **Never-generic pages (page-specific image mandatory):** Red Fleet trackway trio, Kings Peak, Cub Creek/rock art, Sheep Creek, Red Cloud aspens, Flaming Gorge/Green River, Wall of Bones — plus the 3 route-map itineraries, which can never take a *photo* at all.
- **Deploy discipline:** one page per commit, cluster-by-cluster in shot order; each new hero must clear the ≤500 KB webp gate **before** frontmatter edit; the logo remains the safe one-line revert target.
- **Out of scope for the frontmatter swap:** the 9 `.astro` hub pillars + `best-restaurants` fall back to the logo `og:image` but have no `heroImage` field — a separate cornerstone pass.

---

## 9. Remaining Known TODOs (from PROJECT_STATE "Pending")

1. Author photos (`dave.webp`/`trudy.webp`) + owner-supplied bios, credentials, `sameAs` URLs.
2. SLC city page: owner-supplied local tips + route photography (marked in-page, not invented).
3. Convert remaining legacy `.astro` spokes to collections: `best-restaurants` (wants a Restaurant/ItemList-aware layout pass), `atv-trails`, `jeep-trails` (once `/atv/` + `/jeep/` hubs launch — update their `_redirects` lines then).
4. Fold any unique content from the two merged/redirected pages (`moab-alternative`, `outdoor-activities`) into their destinations (git history has the source).
5. Desk-graphics batch: climate charts, elevation ladder, geology cross-sections, deep-time timeline (M8.5 ranks 1–4).
6. Reuse-integration housekeeping: place existing SVGs on guides/camping pillars + family/romantic itineraries (zero new production).
7. The 3 route-map itineraries need cartography (M9.3 residual).

---

## 10. Technical Debt

Genuinely low. Nothing blocks launch.

- **Schema-component migration (deferred, Phase 2 decision):** legacy hand-authored JSON-LD was preserved verbatim rather than swapped to the `SchemaArticle/LocalBusiness/Tour` components, because faithful swap would change author entity/publisher shape/date formats/`@type`. Recommend doing it **with** the remaining legacy-spoke conversions. Not a defect — a deliberate, documented deferral.
- **`best-restaurants` remains a hand-authored `.astro`** (grandfathered in the validator's `LEGACY_SPOKES`) — carries correct Restaurant/ItemList JSON-LD but isn't a collection spoke yet.
- **~70 legacy `public/images/` files exceed 500 KB** (up to 3.7 MB) with spaced/capitalized names. Legacy pages bypass the hero gate so they survive, but any file *promoted* to a collection hero must first clear ≤500 KB. A compression pass is worthwhile hygiene, not urgent.
- **Minor cosmetic:** `booking` nav button lost its `active` highlight (Header `ActiveKey` has no "booking" concept); a harmless duplicate scroll-shadow listener on moab pages. Both logged in Open Decisions.

No architectural debt, no failing tests, no broken links, no orphan pages (validator enforces).

---

## 11. Lessons Learned

1. **Validation gates catch latent bugs cheaply.** The Phase-3 smoke test exposed that all six new layouts wrapped content in a slot-less `<body>` — every layout-rendered page would have shipped EMPTY. Caught before any content shipped. Build-time zod + `validate-site.mjs` repeatedly paid for themselves.
2. **Astro content-store gotcha (recurring):** after adding/removing a content file, stale entries persist in `node_modules/.astro` — must clear it or ghost pages keep building. Now standard in the deploy checklist.
3. **Windows file-lock on recompress-in-place:** `sharp` recompression must write to a temp name then swap (in-place locks the file). Codified in the deployment workflow.
4. **Freeze early, enrich forever.** Declaring architecture FROZEN after G2 turned every later session into low-risk content work with a stable target — the reason M6–M9 could run as pure documentation/enrichment.
5. **Media is the moat, and it's a production problem, not an engineering one.** M5→M8 converged on the same conclusion: more graphics/text hit diminishing returns; the compounding advantage is Dave & Trudy's first-hand photos/video/field notes. The right move was to *finish* engineering and *stage* the field program, not keep building.
6. **Reuse beats production.** M8.5 showed a large share of "coverage gaps" were integration gaps solvable with existing SVGs — always check for reuse before drawing.
7. **Parallel workstreams demand discipline.** Multiple content passes ran concurrently; the standing rule (report untracked/modified files, never touch them) kept them from colliding.

---

## 12. Future Roadmap After Launch

- **Phase A — desk graphics (no travel):** climate charts, elevation ladder, geology cross-sections, deep-time timeline (M8.5 ranks 1–4); cancel the redundant planned graphics.
- **Phase B — the real pivot, original media (M9.0–M9.4):** run FD1 first (unblocks money pages) → tour highlight reel + owner-intro film → per-cluster hero swap starting with the rarest un-shot assets; capture the summer-gated high country (FD4) before its window closes.
- **Phase C — legacy conversions + schema migration:** `best-restaurants`/`atv`/`jeep` → collections, with the deferred schema-component migration done alongside.
- **Phase D — cornerstone & expansion (Build Guide roadmap):** History/Stories cornerstones, more `/from/[city]/` gateways, GPX/trail-difficulty/itinerary maps, seasonal monthly guides, and expanding each hub toward 20–40 supporting spokes.
- **Ongoing SEO:** verify 301s post-deploy, submit sitemap in Search Console, watch Coverage for redirected URLs, track impression/click/dwell lift on media-upgraded clusters.

---

## 13. Repository Health Assessment

| Dimension | Status |
|---|---|
| Build | ✅ Clean (`astro check` 0 errors; validator green across the M-series) |
| Structured data | ✅ Every JSON-LD block parses (validator-enforced) |
| Internal links | ✅ No broken links, no orphan pages (validator-enforced) |
| SEO uniqueness | ✅ Title + meta-description uniqueness enforced |
| Accessibility | ✅ Every `<img>` carries alt (empty = explicit decorative) |
| Content floor | ✅ ≥600-word thin-content gate; editorial target 1,200–2,500 |
| Redirects | ✅ 26 legacy URLs 301 directly, never chained |
| Image gate | ✅ Hero ≤500 KB webp/avif enforced at build |
| Known TODOs | 🟡 Non-blocking (author photos/bios, SLC tips) — validator prints them after the green line |
| Technical debt | 🟢 Low, documented, none launch-blocking (§10) |

**Verdict: healthy and production-ready.** The validators are the standing guarantee that health cannot silently regress.

---

## 14. Recommended Maintenance Schedule

- **Every content/media deploy:** clear `node_modules/.astro` → `npm run build` → confirm `astro check` 0 + `validator` green + hero gate passes → spot-check `dist/` (og:image, JSON-LD image, rendered `<img>` alt). One page/cluster per commit.
- **Monthly:** verify `VERIFY WITH OFFICIAL SOURCE` items still current (hours, fees, road/permit status); scan Search Console Coverage.
- **Quarterly:** dependency/security updates (Astro, MDX, sharp); legacy-image compression progress; broken-link/orphan re-audit (validator already gates, but confirm after bulk changes).
- **Seasonally:** refresh seasonal-page accuracy; capture the rolling four-season and spring/winter frames the field program can't get in one pass.
- **Annually:** revisit pricing/NAP in `site.ts`; author bio/`sameAs` refresh; review the topical-authority expansion targets.
- **Invariant:** never change the author Person `@id` or a shipped canonical URL; new redirects go in `_redirects` and are never chained.

---

## 15. Definition of "Version 1.0 Complete"

**Version 1.0 = the engineering phase.** It is **COMPLETE.** All of the following are true and verified:

- ✅ Architecture built, integrated, and FROZEN (URLs, collections, schemas, layouts, components, validators, build pipeline).
- ✅ All 57 content spokes + 9 pillars authored to the editorial standard; pricing resolved; author/EEAT system live.
- ✅ Structured-data entity graph complete and parsing; internal-linking and SEO framework enforced by build-time validation.
- ✅ Reusable-visual library's high-reach work done and integrated (63 embeds / 40+ pages).
- ✅ Legacy URLs migrated with direct 301s; clean builds; zero broken links / orphans / duplicate metadata.
- ✅ The remaining media program is fully **specified and staged** (M9.0–M9.4), requiring no further engineering.

**Explicitly NOT part of 1.0** (these are 1.x content/media enrichment, not construction): original photography/video capture, the 42→0 hero swaps, body images, author portraits, the desk-graphics batch, legacy-spoke conversions, and Phase-4 cornerstone expansion.

**Launch decision:** the platform can ship to production **today** on its written content and existing media. Every remaining item enriches a live, healthy site rather than blocking its launch.

---

## Launch Readiness Assessment

| Gate | Ready? | Note |
|---|:--:|---|
| Builds clean, validators green | ✅ | No blocking errors anywhere in the M-series |
| URLs / redirects correct | ✅ | Directory URLs; 26 direct 301s; verify live post-deploy |
| SEO / structured data complete | ✅ | Unique metadata; parsing JSON-LD; absolute URLs |
| Written content complete | ✅ | 57 spokes + 9 pillars to standard |
| Original media | 🟡 | 42 logo heroes + zero body images — **enrichment, not a blocker**; fully staged (M9) |
| Author photos/bios | 🟡 | Monogram fallback renders cleanly; non-blocking TODO |
| Third-party embeds (about/moab) | 🟡 | Live but flagged; replaced by FD1 video later |

**Bottom line: GO for launch.** Ship 1.0 now; run the field program and hero swaps against the live site through the owner's editorial windows.

---

## Validation

Confirmed for this milestone (closeout report — documentation only):

- ✅ **Documentation only** — the sole working-tree change is this file, `docs/PROJECT_COMPLETION_REPORT.md`.
- ✅ **No page edits** — no `.mdx`/`.astro` content modified.
- ✅ **No code changes** — no layout, routing, collection, schema, component, validator, navigation, JSON-LD, or build-pipeline file touched. The freeze holds.
- ✅ **No image changes** — no `heroImage`/`heroAlt` changed; nothing under `public/images/**` created or altered.
- ✅ **No build run. No commit made.**
- ✅ **Parallel workstream untouched** — every modified/untracked file in `git status` (content `.mdx`, `.astro` pages, `styles.css`, companion `docs/M9_*`) was read for ground truth only; none was modified, staged, reverted, renamed, deleted, or committed.

*Report complete and internally reviewed. It is the definitive engineering-phase closeout — executive summary, frozen-architecture and content/EEAT/visual/media status, remaining field and hero work, TODOs, technical debt, lessons, post-launch roadmap, repository health, maintenance cadence, and the Version-1.0 definition with a GO launch call. It documents and assesses; it does not edit a page, change code, alter an asset, or run a build.*
