# M9.2 — Media Deployment Workflow

**Adventure Tours Vernal · Dinosaur Country**
Prepared: mid-July 2026 · Companion to [`docs/M9_FIELD_CAPTURE_PLAYBOOK.md`](M9_FIELD_CAPTURE_PLAYBOOK.md) (what to shoot), [`docs/M5_IMPLEMENTATION_ROADMAP.md`](M5_IMPLEMENTATION_ROADMAP.md) (§8 quick-wins, §9 sequence), and [`docs/M6_ORIGINAL_MEDIA_INVENTORY.md`](M6_ORIGINAL_MEDIA_INVENTORY.md).

Scope: **deployment-infrastructure documentation only.** This is the "how every future field asset gets processed and shipped" specification — the bridge between a card full of RAW files (M9.0) and a page-integration editorial window. It does **not** edit any page, create/alter any asset, write any alt text or caption into a page, change architecture, or run a build. **Architecture is FROZEN.** Every convention below is a *specification* for the owner's next unfrozen editorial window, not an applied change.

> **What this document is for:** M9.0 tells the owner what to capture and why. This document tells the owner exactly what to *do with each file after the shutter clicks* so that every asset lands in the right place, in the right format, under the frozen validator gates, with honest alt/caption, on the first try — with a clean rollback if a deployment ever regresses a page.

---

## 1. Existing Image Architecture (repo-verified inventory)

Before defining the workflow, this section documents **exactly where every kind of image is sourced today.** All references below are verified against the current tree (July 2026). This is the ground the workflow is built on — do not deviate from it (the freeze).

### 1.1 Hero images — **metadata-only**, sourced from `public/`

- **Declared in:** each spoke/itinerary's frontmatter, field `heroImage` (a root-relative string, e.g. `/images/Docs Beach.webp`). Example verified in [`src/content/utv/best-utv-trails-vernal.mdx:11`](../src/content/utv/best-utv-trails-vernal.mdx#L11).
- **Physical file lives in:** `public/images/` — served at a stable absolute URL, unprocessed by the build.
- **Consumed by:** [`src/layouts/SpokeLayout.astro`](../src/layouts/SpokeLayout.astro) passes `heroImage` to **both** `<Seo image=…>` and `<SchemaArticle image=…>`. The other spoke-family layouts (`PillarLayout`, `HubLayout`, `ItineraryLayout`, `CityLayout`, `AuthorLayout`) follow the same pattern.
- **Critical property — heroes are NOT rendered as `<img>`.** The hero is *metadata only*: it exists to populate `og:image` and the JSON-LD `image` field. No layout emits a hero `<img>` tag. This is the frozen "Image architecture decision (2026-07-10)" in `PROJECT_STATE.md`: heroes stay in `public/` for stable absolute URLs; srcset buys nothing because there is no rendered `<img>` to make responsive.
- **Default / fallback:** when a page passes no image, `Seo.astro` defaults to `${SITE.url}/images/logo.webp` ([`src/components/seo/Seo.astro:28`](../src/components/seo/Seo.astro#L28)). **This is the "logo hero" the field program exists to replace** — M9.0 reports 44 of 57 content pages still on it.
- **Alt text for heroes:** frontmatter field `heroAlt` (min 20 chars, enforced by zod). Because the hero isn't rendered, `heroAlt` feeds the metadata/EEAT layer, not a visible `<img alt>`.

### 1.2 Body (in-article) images — **`src/` + `astro:assets`**, currently ZERO

- **Intended source:** rendered in-article images live under `src/` and go through Astro's `astro:assets` pipeline (automatic responsive/optimized output at build). This is the frozen half of the same 2026-07-10 architecture decision: "optimization belongs to body images."
- **Current reality (verified):** there is **not one** `astro:assets` import, `<Image>` component, or markdown `![]()` image across `src/content/**`. Confirmed by grep — zero matches. Every content page today is text with a metadata-only hero. Deploying the first body images is net-new work for the editorial window.
- **Validator constraint:** every rendered `<img>` must carry an `alt` attribute (empty `alt=""` allowed = explicit decorative marker; a *missing* alt fails the build). Enforced in [`scripts/validate-site.mjs:147-152`](../scripts/validate-site.mjs#L147-L152).

### 1.3 Open Graph images

- `og:image` **is the hero.** `Seo.astro` takes the `image` prop (= `heroImage`, or the logo fallback), runs it through `absoluteUrl()`, and emits it as both `og:image` and `twitter:image` ([`src/components/seo/Seo.astro:37,49,57`](../src/components/seo/Seo.astro#L37)). There is no separate OG-image field — improving a hero improves the social card automatically.

### 1.4 JSON-LD image references

- `SchemaArticle` emits `image: absoluteUrl(image)` where `image` = the hero ([`src/components/seo/SchemaArticle.astro:25`](../src/components/seo/SchemaArticle.astro#L25)).
- `SchemaItinerary` does the same ([`src/components/seo/SchemaItinerary.astro:25`](../src/components/seo/SchemaItinerary.astro#L25)).
- `SchemaTour` and `SchemaLocalBusiness` emit **no** `image`/`logo` property (verified — no matches). Business identity is `@id`-referenced, not image-bearing.
- **Consequence:** the single `heroImage` value fans out to three consumers at once — `og:image`, `twitter:image`, and Article/Itinerary JSON-LD `image`. One correct hero file satisfies all three. One broken/oversized hero fails all three (and the build).

### 1.5 Author photos (separate track)

- Sourced from `public/images/` via `src/lib/authors.ts` (`/images/dave.webp`, `/images/trudy.webp`). These **do not exist yet**; `AuthorByline`/`AuthorLayout` render an initials monogram instead of a broken `<img>`, and the validator prints a non-blocking TODO. Author portraits follow the hero rules below (webp, ≤500 KB, `public/`) but are tracked as a Pending owner-input item, not a field-day asset.

### 1.6 The frozen build-time gates every hero must clear

Defined in [`src/content.config.ts:26-35`](../src/content.config.ts#L26-L35). A hero that fails any of these **fails the build** (not a review comment — a hard stop):

1. **Exists:** the path must resolve to a real file in `public/` (or be a full `http(s)://` URL).
2. **Format:** must end `.webp` or `.avif` (local files).
3. **Size:** local file must be **≤ 500 KB** (`HERO_MAX_BYTES = 500 * 1024`). Rationale on record: the 13.6 MB-favicon incident.

Plus, at the frontmatter level: `heroAlt` ≥ 20 chars; `tags` lowercase-kebab, min 1; `updatedDate ≥ publishDate`.

Post-build, `scripts/validate-site.mjs` additionally checks: sitewide `<title>` and meta-description uniqueness, every JSON-LD block parses, every `<img>` has alt, and a ≥600-word thin-content floor.

**Legacy note:** ~70 legacy files in `public/images/` exceed 500 KB (up to 3.7 MB) and use spaced, capitalized names (`Docs Beach.webp`). Legacy pages don't pass through the hero zod gate, so they survive — but **any file promoted to a collection `heroImage` must first clear the 500 KB gate.** New assets must **not** inherit the spaced-name convention (see §4).

---

## 2. The Media Deployment Workflow (per captured asset)

Nine stages, RAW → live page. Stages 1–7 happen in the processing window; stages 8–9 happen only in an **unfrozen editorial window** (no page edits in M9.2). Respects the frozen architecture at every step.

### Stage 1 — Ingest
- Offload both cards to a dated capture folder: `field-days/FD{n}-{location}-{YYYY-MM-DD}/`.
- Keep the in-camera JPEG alongside the RAW (redundancy from M9.0 field rules).
- Immediately back up to a second drive **before** any culling. Two copies exist before anything is deleted.

### Stage 2 — Naming
- Rename culled keepers to the **kebab-case, cluster-prefixed** convention in §4. Do this at ingest so the name is stable through every downstream step.
- **Never inherit the legacy spaced names** (`Docs Beach.webp`). New assets are lowercase-kebab only.

### Stage 3 — Metadata
- Embed IPTC **creator** = "Adventure Tours Vernal — Dave/Trudy Wilson", **caption** = the dated field note captured in the truck, and a **general** location.
- **Rock-art / sensitive sites:** strip or round EXIF GPS to a general area. Never embed precise coordinates of remote panels or trackways (M6 site-protection rule).
- The dated field note becomes the on-page **caption** (EEAT proof), *not* the alt text (§ alt vs caption below).

### Stage 4 — WebP/AVIF generation + optimization
- Cull/edit RAW → export a full-resolution master (archive it — Stage 9).
- **Heroes:** export **WebP or AVIF**, long edge ≥ 1600 px, framed for a 1200×630 (1.91:1) og:image crop, then compress until **≤ 500 KB** to clear the zod gate.
  - **Precedent:** `sharp` at **q≈78** took `20.webp` from 525 KB → 249 KB with no visible loss. Start there; step quality down until under 500 KB.
  - **Windows gotcha (on record):** recompress-in-place can lock the file. **Write to a temp name, then swap** — never overwrite in place.
- **Body images:** export the master into `src/` and let **`astro:assets`** handle responsive/optimized output at build. No manual 500 KB cap needed there — the pipeline sizes it. (Do *not* put body-image masters in `public/`.)

### Stage 5 — Alt text + caption authoring
Write **both**, and never reuse one as the other.
- **Alt (functional, honest to the frame):** pattern *"[subject] at [place near Vernal], [what's happening]."* No unverified numbers. Rock-art alt stays deliberately non-specific (no coordinates/site names).
  - Hero alt → the frontmatter **`heroAlt`** field (≥ 20 chars).
  - Body image alt → the rendered **`<img alt>`** (validator requires it; `alt=""` only for truly decorative).
- **Caption (EEAT proof):** the dated, generally-located field note in Dave/Trudy's voice. Example: *"On the water by 7 before the north wind builds — Dave, Aug 2026."*
- See the **Alt-text & Caption Standards** section below for the full rules.

### Stage 6 — Copyright / rights check
- Confirm the asset is genuinely original Adventure Tours work (EEAT integrity — never label third-party media as original).
- Confirm **model releases** exist for any identifiable guests/children on camera before that frame is publishable.
- Confirm any notable-guest / third-party-brand frame has usage rights before deploy.

### Stage 7 — Placement (per frozen architecture)
- **Hero / og:image / JSON-LD image →** `public/images/` (stable absolute URL, metadata-only, ≤ 500 KB).
- **In-article rendered image →** `src/` through `astro:assets`, referenced with alt + caption.
- **Video →** YouTube (unlisted → public per cadence); embed by ID (never a raw file in the repo). Replace `about.astro`'s stock embeds with the owner-intro film.

### Stage 8 — Deployment (editorial window only — NOT M9.2)
- Set the page's `heroImage` frontmatter to the new `public/images/…` path and update `heroAlt`.
- Insert body `<Image>`/`![]()` references with alt + caption.
- One page (or one cluster) per change so a regression is easy to isolate and roll back (§5).

### Stage 9 — Archive
- Move the RAW + full-res master to cold archive: `archive/originals/FD{n}-{location}-{YYYY-MM-DD}/` (external/backup drive, **not** committed to the repo).
- Keep the exported web derivatives in the repo (`public/` or `src/`); keep the RAW masters out of it. The archive is the re-export source if a larger/alternate crop is ever needed.

---

## 3. Per-Field-Day Deployment Checklist

Copy this block per asset (or per batch) each field day. Boxes 1–17 are the processing pass; boxes 18–22 are the editorial-window deploy (do **not** tick during M9.2).

```
FIELD DAY: FD__   LOCATION: __________   DATE: 20______

INGEST & PRESERVE
□  1. Copy originals off BOTH cards to field-days/FD__-______-YYYY-MM-DD/
□  2. Preserve RAW (+ in-camera JPEG) — untouched
□  3. Second-drive backup made BEFORE any culling

NAMING & METADATA
□  4. Keepers renamed to kebab-case, cluster-prefixed (§4) — no spaced legacy names
□  5. IPTC creator + dated field-note caption + GENERAL location embedded
□  6. Rock-art/sensitive: EXIF GPS stripped/rounded

EXPORT & OPTIMIZE (HERO)
□  7. Export WebP/AVIF, long edge ≥1600px, framed for 1200×630 crop
□  8. Verify format is .webp or .avif
□  9. Verify file size <500 KB  (sharp q≈78 precedent; temp-name-then-swap on Windows)
□ 10. Verify dimensions/crop survive og:image (1.91:1) AND a 4:3/16:9 body crop
□ 11. Verify hero suitability (subject reads at card size; headroom for crop)

EXPORT (BODY)
□ 12. Body-image master placed in src/ for astro:assets (NOT public/)

TEXT
□ 13. Write heroAlt (≥20 chars, honest, no unverified numbers, rock-art vague)
□ 14. Write body <img alt> for every rendered image
□ 15. Write dated caption (field note) — distinct from alt

RIGHTS
□ 16. Original-work confirmed; model releases on file for identifiable people
□ 17. Third-party/notable-guest frames rights-cleared

── EDITORIAL WINDOW ONLY (unfrozen) — not part of M9.2 ──
□ 18. Update frontmatter heroImage + heroAlt (one page/cluster at a time)
□ 19. Insert body images with alt + caption
□ 20. Clear node_modules/.astro (stale content-store gotcha), then `npm run build`
□ 21. Validate: astro check 0 errors; validate-site.mjs green; hero <500 KB gate passes
□ 22. Archive RAW + master to cold storage (out of repo)
```

**Gate discipline:** boxes 8–9 are the two that fail the *build* if skipped. Box 20's cache-clear is the recurring gotcha on record — Astro's content store (`node_modules/.astro`) keeps stale entries after content changes.

---

## 4. Filename Conventions

**Rule:** lowercase kebab-case, cluster-prefixed, descriptive, with an optional light/time qualifier. Adopt for **all new assets**. **Do not inherit** the legacy spaced/capitalized names (`Docs Beach.webp`).

`{cluster}-{subject}-{qualifier}.{ext}`

- `cluster` ∈ `utv`, `dnm`, `redfleet`, `steinaker`, `uintas`, `gorge`, `scenic`, `town`, `author`
- `qualifier` = light/time/variant where it disambiguates (`goldenhour`, `dawn`, `lowlight`, `detail`)

| Asset type | Convention | Examples |
|---|---|---|
| **Hero images** | `{cluster}-{subject}-{qualifier}.webp` (or `.avif`) — lands in `public/images/` | `utv-asphalt-ridge-fleet-goldenhour.webp`, `gorge-red-canyon-overlook-goldenhour.webp`, `redfleet-trackway-lowlight.webp` |
| **Inline (body) images** | same scheme; lands in `src/`; add `-body` or a subject qualifier if it shares a subject with the hero | `utv-krx-cockpit-fox-shock.webp`, `dnm-cubcreek-lizard-panel.webp`, `uintas-wildflower-meadow-body.webp` |
| **YouTube thumbnails** | `{cluster}-{subject}-thumb.{webp\|jpg}` (uploaded to YouTube, not necessarily the repo) | `utv-asphalt-ridge-thumb.webp`, `dnm-wall-of-bones-thumb.webp` |
| **Drone footage** | `{cluster}-{subject}-drone.{mp4\|mov}` — only for legally-cleared parcels | `utv-asphalt-ridge-reveal-drone.mp4`, `scenic-sheep-creek-fold-drone.mp4` |
| **Vertical shorts (9:16)** | `{cluster}-{subject}-vertical.{mp4\|mov}` | `redfleet-paddle-to-tracks-vertical.mp4`, `utv-kid-ridealong-vertical.mp4` |
| **Archive originals (RAW/master)** | keep the camera name **inside** the dated capture folder; the master derivative takes the kebab name + `-master` | folder `archive/originals/FD1-asphalt-ridge-2026-07-28/`; master `utv-asphalt-ridge-fleet-goldenhour-master.tif` |

**Video sibling rule:** long-form, vertical, thumbnail, and drone cuts of the same moment share the base name and differ only by the trailing qualifier (`-vertical`, `-thumb`, `-drone`) — so a moment's whole asset family sorts together.

---

## 5. Rollback Procedures (image regressions)

Because a hero fans out to `og:image` + `twitter:image` + JSON-LD `image` and passes through a build-time gate, a bad hero deploy is caught early **but** a subtle regression (wrong crop, heavier file that still squeaks under 500 KB, wrong alt) can reach production. Rollback is straightforward **because deploys are one-page-at-a-time and every prior state is in git.**

### 5.1 Regression classes and their signals
| Regression | How it surfaces |
|---|---|
| **Hero fails the gate** (missing / not web/avif / >500 KB) | `npm run build` **fails** at zod — never reaches prod. Fix the file, rebuild. |
| **Broken hero path** | Same — zod `imageExists` fails the build. |
| **Wrong/oversized-but-under-500 KB hero, or bad crop** | Build passes; visible on page + social card. Caught in review or post-deploy. |
| **Missing body `<img alt>`** | `validate-site.mjs` fails the build. |
| **Duplicate title/description or unparseable JSON-LD** introduced with the asset | `validate-site.mjs` fails the build. |
| **Page-weight / Core-Web-Vitals regression** | Post-deploy; watch Search Console + a size diff of `dist/`. |

### 5.2 Rollback steps (fastest → fullest)
1. **Single-page hero revert (most common):** `git checkout HEAD~1 -- src/content/<hub>/<page>.mdx` to restore the previous `heroImage`/`heroAlt` frontmatter. If the previous hero was the logo fallback, that's a safe known-good state. Rebuild.
2. **Asset-only revert:** if the frontmatter is fine but the *file* regressed (bad recompress), restore the prior `public/images/<file>` from git (or re-export from the Stage-9 archive master) and rebuild. Do **not** hand-edit binaries.
3. **Body-image revert:** remove or revert the `<Image>`/`![]()` block and its `src/` asset in the one page; `astro:assets` output regenerates on the next build.
4. **Cluster-wide revert:** if a whole cluster's editorial pass regressed, `git revert` the specific deploy commit(s). Because integration is sequenced one cluster at a time (M9.0 §5.6), the blast radius is one cluster.
5. **Always, after any revert:** clear `node_modules/.astro` (stale content-store gotcha) → `npm run build` → confirm `astro check` 0 errors and `validate-site.mjs` green → spot-check the page's `og:image`, JSON-LD `image`, and rendered body `<img>` in `dist/`.

### 5.3 Prevention (cheaper than rollback)
- **Deploy one page/cluster per commit** so a revert targets exactly the regression.
- **Never overwrite an asset in place** — new capture = new kebab filename; the old file stays until the new page is verified, so rollback is a one-line frontmatter change, not a binary restore.
- **Keep the Stage-9 archive master** so any hero can be re-exported at a corrected size/crop without a re-shoot.
- **Run the full build + validator locally before pushing** — the gate is designed to catch format/size/alt/JSON-LD regressions before they ship.

---

## Validation

Confirmed for this milestone (deployment-infrastructure documentation only):

- ✅ **No page edits** — no `.mdx`/`.astro` content or page modified.
- ✅ **No hero changes** — no `heroImage`/`heroAlt` frontmatter value changed on any page.
- ✅ **No SVG / asset creation** — nothing under `public/images/**` created or altered.
- ✅ **No content edits** — no copy, alt text, or caption written *into* any page (all conventions here are *specifications* for the future editorial window).
- ✅ **No builds run. No commit made.**
- ✅ **No architecture changes** — no layout, routing, collection, schema, CSS, component, validator, navigation, JSON-LD, or build-pipeline file touched. The freeze holds.

**Working-tree change introduced by M9.2:** this single file — `docs/M9_MEDIA_DEPLOYMENT_WORKFLOW.md`.

*Document complete and internally reviewed. It specifies the exact processing pipeline, per-day checklist, filename standard, and rollback procedure for every future field asset — staged for the owner's next editorial/production window. It documents and prepares; it does not process an asset, edit a page, or run a build.*
