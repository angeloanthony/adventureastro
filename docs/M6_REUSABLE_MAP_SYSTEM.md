# M6.2 — Reusable Map System

**Adventure Tours Vernal · Dinosaur Country**
Prepared: July 2026 · Companion to [`docs/M5_EEAT_MEDIA_AUDIT.md`](M5_EEAT_MEDIA_AUDIT.md), [`docs/M5_IMPLEMENTATION_ROADMAP.md`](M5_IMPLEMENTATION_ROADMAP.md) (§5 Custom Map Roadmap), and [`docs/M6_ORIGINAL_MEDIA_INVENTORY.md`](M6_ORIGINAL_MEDIA_INVENTORY.md).
Scope: **planning & specification only.** Architecture is FROZEN — no artwork was produced, no file rendered an `<img>`, no layout/routing/schema/CSS/component/validator/build change was made. This document *defines* the map library; it does not create or integrate it.

> **Governing principle — capture once, deploy many.** The M5 roadmap established that a single branded hub-and-spoke map is the highest coverage-per-effort asset in the entire audit (Top-25 #3, serves 25+ pages). This document turns that finding into a complete, buildable map *library*: every map, its purpose, its reuse strategy, its layers, its technical spec, its production order, and its eventual integration points — engineered so the fewest possible base geographies serve the whole site.

> **Standing accuracy caveat (applies to every map below).** This is a *specification*, not a cartographic source. Exact coordinates, drive times, mileages, route geometry, seasonal-closure dates, jurisdiction boundaries (BLM/NPS/Forest/state-park/UT–WY line), and reservoir levels **must be `VERIFY WITH OFFICIAL SOURCE` before any artwork is committed** — consistent with the site's existing editorial discipline. Drive-time figures quoted here are carried forward verbatim from the frozen M5 docs (themselves marked for verification) and are used only to scope reuse, not as published values. No new geographic facts are invented in this document.

---

## Section 0 — How to read this document

- **Map IDs** (`M-REGIONAL`, `M-FISHING`, …) are stable handles used across all seven sections so a map's inventory entry, reuse row, layer list, production slot, and integration target all line up.
- Maps are grouped into **five tiers** by role:
  - **Tier A — Base geography** (1 map): the master hub-and-spoke every other map derives from.
  - **Tier B — Cluster overviews** (7 maps): one per activity/hub cluster.
  - **Tier C — Itinerary & route maps** (3 map families): trip-planning overlays and gateway drives.
  - **Tier D — Destination orientation** (4 maps): single-place detail maps (parks + the monument).
  - **Tier E — Thematic overlays** (4 maps): habitat, birding, dogs, and the protection-sensitive rock-art map.
- **"Derives from"** names the base geography a map reuses, so the production pipeline is explicit. Most maps are a *restyle + relabel* of an existing base, not a from-scratch draw — this is the entire economy of the system.

---

## Section 1 — Map Inventory

Every reusable map the site needs, with its single-sentence purpose and the base it derives from. **17 distinct maps** across five tiers; because 14 of them derive from just **three base geographies** (regional wheel, monument orientation, and the north-corridor scenic network), the true drawing cost is far below the map count.

### Tier A — Base geography

| ID | Map | Purpose | Derives from |
|---|---|---|---|
| **M-REGIONAL** | **Vernal regional hub-and-spoke overview** *(the base layer)* | Establishes the site's central thesis in one image — Vernal at the center of a wheel, every destination a labeled drive-time spoke. The master geography all other regional maps restyle. | — (master) |
| **M-DINO-COUNTRY** | **Dinosaur Country context overview** | A wider, brand-level "where is Dinosaur Country" map (the two-state monument, Flaming Gorge up into Wyoming, the High Uintas, Vernal as basecamp) for top-of-funnel orientation where the tight drive-time wheel is too zoomed-in. | M-REGIONAL (zoomed out) |

### Tier B — Cluster overview maps (one per hub)

| ID | Map | Purpose | Derives from |
|---|---|---|---|
| **M-UTV** | **UTV riding areas** | The five trail systems radiating from the staging point (departure points + drive-times, **not** exact routes) — visualizes the "local knowledge" the guided product sells. | M-REGIONAL |
| **M-DNM-ORIENT** | **Dinosaur National Monument orientation** | Both entrances (Utah quarry side / Colorado canyon side), the Quarry, Cub Creek auto-tour, Harpers Corner, Echo Park — the "two halves" orientation for the monument cluster. | — (base for Tier D DNM detail) |
| **M-SCENIC** | **Scenic drives network** | The byway spine plus the loop drives as one connected network, with the key junction and a seasonal-closure overlay. | M-REGIONAL (north corridor) |
| **M-FISHING** | **Fishing waters overview** | The reservoirs + the tailwater river as a set, with the UT–WY license line — the visual backing for the "variety in a small radius" thesis. | M-REGIONAL |
| **M-CAMPING** | **Camping regions** | The three camping worlds (state parks / Flaming Gorge NRA / Ashley NF developed vs dispersed) as distinct zones. | M-REGIONAL |
| **M-HIKING** | **Hiking regions & trailhead orientation** | The desert-vs-alpine "two worlds," keyed to hike type and drive time — the orientation front-door for the 16-page hiking cluster. | M-REGIONAL |
| **M-FAMILY** | **Family attractions overview** | The in-town + near-town family cluster (dinosaur statues, Field House, trackway, reservoirs, kid-friendly tour staging) with "time needed" framing. | M-REGIONAL |

### Tier C — Itinerary & route maps

| ID | Map | Purpose | Derives from |
|---|---|---|---|
| **M-ONEDAY** | **One-day planning map** | Splits the near-Vernal core (reachable in one day) from the "its own day" north half — the visual argument behind the one-day decision framework. | M-REGIONAL |
| **M-WEEKEND** | **Weekend / multi-day route diagram** | Day-by-day loop overlay on the wheel (Day 1 monument, Day 2 backcountry + parks, Day 3 byway north) — the template for every multi-day itinerary. | M-REGIONAL |
| **M-GATEWAY** *(3 variants: SLC, DEN, GJ)* | **Gateway route maps** | The approach drive from each feeder city, with named waypoint towns and fuel gaps — for pages whose entire premise *is* the drive. | M-DINO-COUNTRY (wide) |

### Tier D — Destination orientation maps (single-place detail)

| ID | Map | Purpose | Derives from |
|---|---|---|---|
| **M-DNM-DETAIL** | **DNM detail (Cub Creek / Quarry)** | Closer orientation for the auto-tour numbered stops, Quarry, Josie cabin, Split Mountain — the in-monument planning map. | M-DNM-ORIENT |
| **M-REDFLEET** | **Red Fleet State Park orientation** | Trailhead, the trackway, boat ramp/beach, and the paddle route to the tracks — the park's unique "paddle to a dinosaur trackway" story made legible. | — (park base) |
| **M-STEINAKER** | **Steinaker State Park orientation** | Ramp, beach, campground, shoreline — the "closest swim to Vernal" convenience map. | — (park base) |
| **M-GORGE** | **Flaming Gorge reservoir map** | The reservoir's zones (south canyon/dam, Lucerne/Manila, Buckboard WY), ramps, and the Green River tailwater start below the dam. | M-DINO-COUNTRY (north detail) |

### Tier E — Thematic overlays

| ID | Map | Purpose | Derives from |
|---|---|---|---|
| **M-HABITAT** | **Habitat / wildlife overlay** | Elevation-banded habitats (river corridors, reservoirs, sage/cliff desert, Uinta meadows) for the "watch the edges" wildlife framing. | M-REGIONAL |
| **M-BIRDING** | **Birding-habitat overlay** | The five bird habitats keyed to where to stand — a relabel of the habitat overlay for the bird-watching page. | M-HABITAT |
| **M-DOGS** | **"Where dogs are welcome" overlay** | NPS-restrictive / state-parks-vary / Forest-permissive zones — the core promise of the dog-friendly page, with a standing verify caveat. | M-REGIONAL |
| **M-ROCKART** | **Rock-art access map (deliberately vague)** | Public-access vs guide-only rock-art areas, **intentionally low-resolution on remote coordinates** for site protection. | M-REGIONAL (obscured) |

**Inventory note.** M-BIRDING is a labeling variant of M-HABITAT and M-DNM-DETAIL is a zoom of M-DNM-ORIENT, so the practical *drawing* count is ~14. The three "base geographies" (M-REGIONAL, M-DNM-ORIENT, and the M-DINO-COUNTRY wide frame) underlie everything except the three self-contained park bases (Red Fleet, Steinaker) and the Gorge reservoir.

---

## Section 2 — Reuse Matrix

For each map: the pages that use it, the clusters it supports, its priority, and an estimated reuse count. Page names use the real content slugs (see `src/content/**` and `src/pages/**`). **Maps that serve 20+ pages are flagged ⭐ — these are the coverage multipliers and lead the production order.**

| ID | Clusters supported | Representative pages that use it | Priority | Est. reuse |
|---|---|---|---|---|
| **M-REGIONAL** ⭐ | Guides, all hubs, itineraries, things-to-do, gateways | `guides/ultimate-guide-to-vernal-utah`; every hub pillar (`utv/`, `things-to-do/`, `dinosaur-national-monument/`, `guides/`, `fishing/`, `camping/`, `hiking/`, `scenic-drives/`, `itineraries/`); all 9 itineraries; `things-to-do/vernal-utah-attractions`; `things-to-do/fun-things-to-do-vernal-utah-kids`; `from/salt-lake-city` | **P1 (build first)** | **25–30+** |
| **M-DINO-COUNTRY** ⭐ | Brand/top-of-funnel, gateways, guides | `guides/ultimate-guide-to-vernal-utah`, `guides/ultimate-guide-to-flaming-gorge`, `guides/ultimate-guide-to-ashley-national-forest`, all 3 gateway itineraries, `about.astro`, hub pillars needing wide context | **P2** | **10–15** |
| **M-UTV** ⭐ | UTV / commercial | `utv/best-utv-trails-vernal`, `utv/backcountry-tours-vernal-utah`, `utv/side-by-side-rentals-vernal-utah`, `utv/group-utv-tours-vernal`, `utv/beginners-guide-to-utv-tours-vernal`, `atv-trails-vernal-utah`, `jeep-trails-vernal-utah`, `booking.astro`, `guides/moab-utv-tours`, `utv/` pillar, `from/salt-lake-city` | **P1** | **11–13** |
| **M-DNM-ORIENT** | DNM, hiking (DNM), itineraries, things-to-do | `dinosaur-national-monument/visiting-dinosaur-national-monument`, `dinosaur-national-monument/petroglyphs-rock-art-vernal`, `hiking/best-hikes-in-dinosaur-national-monument`, `dinosaur-national-monument/` pillar, `things-to-do/vernal-utah-attractions`, `itineraries/one-day-adventure-vernal` | **P1** | **6–8** |
| **M-SCENIC** | Scenic drives, Flaming Gorge, Ashley, fall hiking | `scenic-drives/flaming-gorge-uintas-scenic-byway`, `scenic-drives/sheep-creek-geological-loop`, `scenic-drives/red-cloud-loop-scenic-drive`, `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks`, `scenic-drives/` pillar, `guides/ultimate-guide-to-flaming-gorge`, `guides/ultimate-guide-to-ashley-national-forest`, `hiking/fall-hiking-near-vernal` | **P2** | **8–10** |
| **M-FISHING** | Fishing, itineraries | `fishing/fishing-flaming-gorge`, `fishing/green-river-fly-fishing`, `fishing/fishing-red-fleet-reservoir`, `fishing/fishing-steinaker-reservoir`, `fishing/` pillar, `itineraries/weekend-fishing-trip-vernal`, `guides/ultimate-guide-to-flaming-gorge` | **P2** | **7–9** |
| **M-CAMPING** | Camping, itineraries | `camping/camping-at-flaming-gorge`, `camping/camping-in-ashley-national-forest`, `camping/camping-at-red-fleet-state-park`, `camping/camping-at-steinaker-state-park`, `camping/` pillar, itineraries "where to stay" | **P2** | **6–8** |
| **M-HIKING** ⭐ | Hiking (16 spokes) | `hiking/` pillar + `beginner-hiking-guide-near-vernal`, `family-hiking-near-vernal`, `high-uintas-day-hikes`, `alpine-lakes-hiking-high-uintas`, `spring/summer/fall/winter-hiking-near-vernal`, `wildflower-hiking-near-vernal`, and the rest of the 16-page cluster (some via thematic overlays below) | **P2** | **12–17** |
| **M-FAMILY** | Things-to-do, itineraries, kids | `things-to-do/fun-things-to-do-vernal-utah-kids`, `things-to-do/vernal-utah-attractions`, `itineraries/2-day-family-itinerary`, `hiking/family-hiking-near-vernal`, `hiking/beginner-hiking-guide-near-vernal` | **P2** | **5–7** |
| **M-ONEDAY** | Itineraries | `itineraries/one-day-adventure-vernal`, `itineraries/2-day-family-itinerary`, `itineraries/` pillar | **P3** | **3** |
| **M-WEEKEND** | Itineraries | `itineraries/3-day-adventure-itinerary`, `itineraries/2-day-family-itinerary`, `itineraries/romantic-weekend-dinosaur-country`, `itineraries/` pillar | **P2** | **4** |
| **M-GATEWAY (SLC)** | Itineraries, gateway city | `itineraries/weekend-road-trip-from-salt-lake-city`, `from/salt-lake-city` *(resolves that file's own in-page route-photo/map TODO)*, `guides/ultimate-guide-to-vernal-utah` | **P2** | **3** |
| **M-GATEWAY (DEN)** | Itineraries | `itineraries/weekend-road-trip-from-denver` | **P3** | **1–2** |
| **M-GATEWAY (GJ)** | Itineraries | `itineraries/weekend-road-trip-from-grand-junction` | **P3** | **1–2** |
| **M-DNM-DETAIL** | DNM, scenic (Cub Creek) | `dinosaur-national-monument/visiting-dinosaur-national-monument`, `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks`, `hiking/best-hikes-in-dinosaur-national-monument` | **P3** | **3** |
| **M-REDFLEET** | Red Fleet trio | `guides/ultimate-guide-to-red-fleet-state-park`, `camping/camping-at-red-fleet-state-park`, `fishing/fishing-red-fleet-reservoir` | **P3** | **3–4** |
| **M-STEINAKER** | Steinaker trio | `guides/ultimate-guide-to-steinaker-state-park`, `camping/camping-at-steinaker-state-park`, `fishing/fishing-steinaker-reservoir` | **P3** | **3** |
| **M-GORGE** | Flaming Gorge, fishing, camping | `guides/ultimate-guide-to-flaming-gorge`, `fishing/fishing-flaming-gorge`, `fishing/green-river-fly-fishing`, `camping/camping-at-flaming-gorge`, `scenic-drives/flaming-gorge-uintas-scenic-byway` | **P3** | **5** |
| **M-HABITAT** | Wildlife, wildflower, seasonal | `hiking/wildlife-hiking-guide-near-vernal`, `hiking/wildflower-hiking-near-vernal`, seasonal hiking pages | **P3** | **4–6** |
| **M-BIRDING** | Birding | `hiking/bird-watching-near-vernal` | **P4** | **1** |
| **M-DOGS** | Dog-friendly | `hiking/dog-friendly-hiking-near-vernal` | **P4** | **1** |
| **M-ROCKART** | DNM, petroglyphs, photography | `dinosaur-national-monument/petroglyphs-rock-art-vernal`, `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks`, `itineraries/photography-weekend-vernal` | **P4** | **3** |

**20+ page multipliers (⭐):** **M-REGIONAL** is the standout (25–30+ pages) and must be built first. **M-DINO-COUNTRY**, **M-UTV**, and **M-HIKING** are the next tier of high-reach maps. Because M-UTV, M-HIKING, M-FISHING, M-CAMPING, M-ONEDAY, M-WEEKEND, M-HABITAT, M-DOGS, and M-ROCKART are all **restyles of M-REGIONAL**, finishing the base unlocks the bulk of the library at marginal cost.

**Grand-total coverage:** the library touches essentially every indexable content page. Of the 44 pages still on the `logo.webp` hero (per M6.1 §7), the maps here are the *desk-producible* unblock for the itinerary/gateway/hub subset that does not require field photography.

---

## Section 3 — Technical Specification

Standards for the whole library so every map reads as one branded system. **This section defines standards; it does not implement them** (no CSS/component/asset was created).

> **Engineering standard (M6.4).** The *pipeline-level* rules for producing these SVGs — color model, dark-mode, font fallback, accessibility, optimization, export, and QA — are now formalized and toolchain-validated in **[`docs/SVG_ENGINEERING_STANDARD.md`](SVG_ENGINEERING_STANDARD.md)**. That document is authoritative for how every map is built; this section remains authoritative for *what* each map contains. Build every map to the SVG Engineering Standard.

### 3.1 Format — SVG vs raster
- **Primary format: SVG.** All maps are vector line-art (roads, boundaries, water, labels, pins). SVG is resolution-independent (crisp on retina + when zoomed), tiny in bytes, diff-able in git, restyleable via a shared token set, and **theme-aware** (can respond to light/dark). This directly serves the "capture once, deploy many" economy — a spoke relabel is an edit, not a re-export.
- **Raster (WebP/AVIF) only where** a map needs a photographic or shaded-relief base (e.g. a subtle terrain hillshade under M-DINO-COUNTRY or M-HIKING). In that case: raster relief layer **flattened and compressed to ≤500 KB WebP/AVIF** to respect the existing hero validator gate, with SVG line-art/labels composited on top so text stays vector-crisp.
- **No third-party live/embedded map tiles** (Google/Mapbox/Leaflet) for these reusable assets. Rationale: they add external requests + JS weight, can't be brand-styled to match, don't render in `og:image`/JSON-LD, and aren't ownable original media (the whole point per M5). The live Google-Maps *staging pin* already on `booking`/`best-utv-trails` stays as-is — it is a directions utility, not a brand map, and is out of scope for this freeze.

### 3.2 Aspect ratios
- **Regional / overview maps (Tier A, B):** target **4:3** (`~1600×1200`) — fits the region's roughly-square extent and slots into article body width and hero/og crops.
- **Route / corridor maps (Tier C gateways, M-SCENIC byway):** **16:9** (`~1600×900`) — matches the linear east-west drive geometry.
- **Destination orientation (Tier D parks):** **4:3** or **3:2**, whichever frames the single site with minimal empty water/land.
- **og:image derivative:** every map ships a **1200×630** (1.91:1) safe-crop variant with the title/legend positioned to survive that crop, so a map can double as a page's social card. Define the crop-safe zone at design time; do not letterbox.

### 3.3 Responsive sizing
- SVG scales fluidly with `max-width:100%; height:auto;` (implementation-time note only — no code here).
- **Label legibility floor:** the smallest label must remain readable at **360 px** rendered width (mobile body column). Maps with dense labels (M-SCENIC, M-DNM-ORIENT) need a **simplified mobile variant** — fewer labels, larger type — rather than shrinking the desktop map into illegibility. Plan two SVG label layers (full / reduced) toggled by breakpoint at integration time.
- Never require horizontal scroll of the page body; a map that can't shrink lives in its own `overflow-x:auto` container (integration concern, flagged for the future editorial window).

### 3.4 Typography
- **Type family:** reuse the site's existing font stack (whatever `styles.css` already loads for headings/body) so maps match the pages — do **not** introduce a new webfont (avoids an added asset + the external-request/weight cost). Labels may be set in the body face; the map title in the heading face.
- **Hierarchy (relative sizes, one consistent scale across all maps):**
  - Map title / region name — largest.
  - Primary destinations (DNM, Flaming Gorge, the parks, trail systems) — medium, medium-weight.
  - Secondary labels (towns, junctions, waypoints) — small.
  - Drive-time / distance annotations — smallest, in the accent color, visually distinct from place names.
- **Legibility:** labels get a subtle halo/knockout (thin light stroke behind dark text, and vice-versa) so they stay readable over both land tint and water. Avoid label-over-label collisions; leader lines where a pin is crowded.

### 3.5 Color palette
- **Brand-consistent, derived from the existing site palette** (sample the real hex values from `styles.css` at build time — do not invent a second brand palette). Roles, not specific hexes, are fixed here:
  - **Land / base fill** — a warm neutral (desert tone) that reads as the regional ground.
  - **Water** — a single cool blue-green for all reservoirs + rivers (ties the fishing/camping/Gorge maps together).
  - **Roads** — a dark neutral for highways; a lighter/dashed treatment for unpaved/backcountry (critical for the UTV/scenic/jeep "pavement→gravel" story).
  - **Accent / Adventure-Tours brand color** — reserved for *the hub (Vernal), the staging point, drive-time spokes, and CTAs/"you are here."* This is the visual through-line that makes every map recognizably ours.
  - **Boundaries** — a muted line style for jurisdictions (NPS/BLM/Forest/state park, UT–WY line) that never competes with roads or the accent.
- **Accessibility of color:** never encode information by hue alone — pair color with shape/label/pattern (e.g. dashed = unpaved, not just "brown"). Verify all text/background pairings meet **WCAG AA (≥4.5:1)**; verify the categorical set is colorblind-safe (use the `dataviz` skill's palette validator as the checker, per the M5 graphics roadmap).
- **Light + dark:** define both themes. Water/land/road tints get a dark-mode variant so maps don't glare in a dark UI (matches the theme-aware standard the rest of the media program targets).
- **⚠ Rasterizer constraint — no CSS `var()` for fills (M6.3 finding, M6.4-validated).** `librsvg`/`sharp` (the engine behind `astro:assets` and og:image rasterization) does **not** resolve CSS custom properties, so `fill="var(--token)"` rasterizes to black. **Standard for every map:** set concrete light-theme hex values as *presentation attributes* on elements (the universal fallback all renderers honor), and confine theme-switching to a `<style>` **dark-mode override** (class selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`), which browsers apply and rasterizers safely ignore. Reproduced and quantified in [`docs/SVG_ENGINEERING_STANDARD.md`](SVG_ENGINEERING_STANDARD.md) §1 (F1–F2); that document's compatibility matrix and QA checklist govern all map production.

### 3.6 Accessibility
- **SVG semantics:** each map carries a `<title>` (short name) and `<desc>` (the longer text description) so assistive tech can announce it; decorative sub-elements are `aria-hidden`. (Spec only — wiring happens at integration.)
- **Not color-alone** (see 3.5); **AA contrast** on every label; **min touch/click target** for any interactive pin ≥44 px if maps ever become interactive (they are static images in v1).
- **Text alternative is mandatory** — see 3.7. A map with no alt text fails the site's existing "every `<img>` has an alt attribute" validator check.

### 3.7 Alt text standard
- Every rendered map needs **descriptive, page-specific alt text** that conveys the map's information, not just "map of Vernal." Pattern: *"[what it shows] centered on [anchor], showing [key labeled features] and [the relationship the map exists to prove]."*
- **Example (M-REGIONAL on the Vernal guide):** *"Regional map centered on Vernal, Utah, showing drive-time spokes to Dinosaur National Monument, Red Fleet and Steinaker State Parks, Flaming Gorge, and the High Uintas — illustrating Vernal as the hub of the region."*
- Keep alt text **honest to the drawn content** and free of unverified numbers; if a drive time is shown on the map it may appear in alt text only once verified. Rock-art maps (M-ROCKART) get deliberately **non-specific** alt text (no coordinates/site names) for protection.
- Reuse note: because heroes are metadata-only in the frozen architecture, a map used as a *hero* supplies `heroAlt`; a map rendered *in body* supplies the `<img alt>` — write both.

### 3.8 Caption style
- **Every in-body map gets a caption** in the site's existing figure/caption convention. Two-part pattern:
  1. **What + why** (one clause): *"The region is a wheel — Vernal sits at the center."*
  2. **Author field note or verify stamp** (optional, ties to the EEAT plan): a short dated Dave/Trudy note *("We can have you at the Quarry in about 20 minutes — Dave")* **or** a `VERIFY WITH OFFICIAL SOURCE` marker for any figure shown. This is the same discipline the articles already use and converts the map from decoration into first-hand proof.
- Captions never restate the alt text verbatim (alt = for AT; caption = for everyone).
- **Attribution:** if a shaded-relief/base derives from public data (e.g. USGS/PD terrain), the caption or a page footnote carries the required attribution — verify license before use.

---

## Section 4 — Information Layers

For each map, the layers that belong on it. Layers are drawn from a **shared master layer set** so a spoke map is "base + the two layers that matter here," never a new drawing. **No geographic detail is invented** — layers list *categories* of feature (roads, lakes, towns…) and reference only places already named in the frozen site copy; exact placement/geometry is a `VERIFY` task for the artwork phase.

**Master layer set (shared vocabulary):**
`basemap/relief` · `land-tint` · `water` (lakes/reservoirs/rivers) · `roads-paved` · `roads-unpaved` · `towns` · `the-hub` (Vernal) · `staging-point` (1935 S 1500 E) · `destinations/POIs` · `drive-time-spokes` · `trails/tour-corridors` · `trailheads` · `boundaries` (park/NPS/BLM/Forest/UT–WY) · `seasonal-closure-overlay` · `legend` · `title` · `north-arrow/scale`.

| ID | Layers on this map |
|---|---|
| **M-REGIONAL** | land-tint, water, roads-paved, towns, **the-hub**, destinations/POIs (DNM, Red Fleet, Steinaker, McConkie, Flaming Gorge, High Uintas), **drive-time-spokes**, legend, title, north-arrow |
| **M-DINO-COUNTRY** | basemap/relief, land-tint, water, roads-paved (approach highways), towns (regional + gateway hints), the-hub, boundaries (two-state monument, Flaming Gorge NRA, High Uintas), title, north-arrow |
| **M-UTV** | land-tint, water (Green River context), roads-paved, roads-unpaved, **staging-point**, tour-corridors (5 systems as *departure directions*, not exact routes), drive-time-spokes, legend, title |
| **M-DNM-ORIENT** | land-tint, water (Green/Yampa), roads-paved, roads-unpaved, boundaries (Utah/Colorado halves, monument boundary), destinations/POIs (both entrances, Quarry, Cub Creek, Harpers Corner, Echo Park), drive-time-from-Vernal, legend, title |
| **M-SCENIC** | land-tint, water, roads-paved (US-191 spine, SR-44 arm), roads-unpaved (Red Cloud), POIs (Greendale Y junction, overlooks, memorial), **seasonal-closure-overlay**, legend, title |
| **M-FISHING** | land-tint, **water (emphasized)**, roads-paved, POIs (Steinaker, Red Fleet, Flaming Gorge, Green River tailwater below dam), **boundaries (UT–WY license line)**, drive-times, legend, title |
| **M-CAMPING** | land-tint, water, roads-paved, roads-unpaved, **zone shading** (state parks / Flaming Gorge NRA / Ashley developed vs dispersed), POIs (campground clusters), drive-times, legend, title |
| **M-HIKING** | basemap/relief, land-tint, water, roads-paved, **elevation-band shading** (desert→foothills→forest→alpine), trailheads (by hike type), drive-times, legend, title |
| **M-FAMILY** | land-tint, water, roads-paved, the-hub, POIs (in-town dino statues/Field House, trackway, reservoir beaches, tour staging), "time-needed" callouts, legend, title |
| **M-ONEDAY** | M-REGIONAL base + **core-vs-north split shading** (near-Vernal one-day core vs "its own day" north half), drive-times, legend, title |
| **M-WEEKEND** | M-REGIONAL base + **day-by-day route overlay** (Day 1 / Day 2 / Day 3 color-coded loops), legend, title |
| **M-GATEWAY (SLC/DEN/GJ)** | basemap/relief (light), roads-paved (the approach highway), towns (named waypoints + **fuel-gap markers**), origin city, the-hub (Vernal), route line, distance/time annotations, title |
| **M-DNM-DETAIL** | roads-paved/unpaved (Cub Creek auto-tour), water (Green River, Split Mountain), POIs (numbered stops, Josie cabin, Swelter Shelter, Quarry), fee-boundary, legend, title |
| **M-REDFLEET** | water (reservoir), roads-unpaved (access), POIs (trailhead, **trackway**, ramp/beach, campground), **paddle-route line to the trackway**, drive-time-from-Vernal, legend, title |
| **M-STEINAKER** | water, roads-paved (US-191 hop), POIs (ramp, beach, campground, dam), drive-time-from-Vernal, legend, title |
| **M-GORGE** | water (**reservoir zones emphasized**), roads-paved, POIs (dam, Cedar Springs/Lucerne/Manila ramps, Buckboard WY, Green River tailwater start), boundaries (UT–WY, NRA), legend, title |
| **M-HABITAT** | land-tint, water, **elevation-band habitat shading** (river corridors, reservoirs, sage/cliff desert, Uinta meadows), edges-emphasis, legend, title |
| **M-BIRDING** | M-HABITAT base, **relabeled to five bird habitats** + fixed-vantage markers, legend, title |
| **M-DOGS** | M-REGIONAL base + **rule-zone shading** (NPS-restrictive / state-parks-vary / Forest-permissive), standing verify caveat in legend, title |
| **M-ROCKART** | M-REGIONAL base, **deliberately low-resolution** — public-access areas marked generally; remote/guide-only sites **omitted or shown only as a vague region**, no coordinates; protective legend note, title |

**Protection rule (non-negotiable, from M5 §5 + audit F6):** M-ROCKART (and the rock-art layer anywhere it appears, e.g. M-DNM-DETAIL, M-UTV Outlaw Trail) must never publish precise remote-panel locations. Vagueness is a feature.

**Implementation note (M6.3 — M-REGIONAL first render).** The first production asset ([`public/images/maps/vernal-regional-hub-and-spoke.svg`](../public/images/maps/vernal-regional-hub-and-spoke.svg); source notes in [`docs/maps/source/`](maps/source/vernal-regional-hub-and-spoke.README.md)) was built as a **schematic radial diagram**, deliberately **omitting the `drive-time-spokes` and `north-arrow` layers** listed above: M6.3 barred mileage/drive-times ("changing information") and a north arrow would assert a compass relationship the schematic doesn't support. Spokes render as plain connectors and a legend note states the map is not to scale/distance/direction. When a *cartographic* (to-scale) variant of M-REGIONAL is later produced against verified geography, those two layers can be reintroduced. This affects only M-REGIONAL's first render; the layer vocabulary above is unchanged.

---

## Section 5 — Production Order

Recommended build sequence, optimizing **reuse × SEO impact ÷ effort**. The ordering rule: build each **base geography** before its derivatives, front-load the 20+ page multipliers, and slot low-reach overlays last.

| Wave | Maps | Why this slot |
|---|---|---|
| **Wave 1 — The base (unblocks everything)** | **M-REGIONAL** | Highest reuse in the entire library (25–30+ pages), pure desk cartography from public geography, and the geometry ~9 other maps restyle. Nothing else should precede it. *(This is roadmap QW-7 — producible immediately.)* |
| **Wave 2 — Commercial multipliers** | **M-UTV**, **M-DINO-COUNTRY** | M-UTV directly serves the money cluster (all UTV pages + `booking` + `moab`) — highest commercial ROI; it's a M-REGIONAL restyle. M-DINO-COUNTRY (the wide brand frame) unlocks the guides + gateways and is a zoom of the same base. |
| **Wave 3 — High-reach cluster overviews** | **M-HIKING**, **M-FISHING**, **M-SCENIC**, **M-DNM-ORIENT** | The biggest content clusters by page count (16 hiking, 4+4 fishing/scenic, DNM). Each is a base restyle or a new base (DNM) that itself seeds Tier-D detail. Strong informational-SEO surfaces (people search "map of…" for these). |
| **Wave 4 — Trip-planning maps** | **M-WEEKEND**, **M-ONEDAY**, **M-GATEWAY (SLC)**, **M-CAMPING**, **M-FAMILY** | Itinerary + planning pages where a map materially improves dwell time and answers the "how do these fit together" question the copy makes. SLC gateway resolves an in-file TODO. All derive from M-REGIONAL. |
| **Wave 5 — Destination detail & remaining gateways** | **M-REDFLEET**, **M-STEINAKER**, **M-GORGE**, **M-DNM-DETAIL**, **M-GATEWAY (DEN)**, **M-GATEWAY (GJ)** | Single-place maps serving 3–5 pages each — valuable but lower-reach; several are their own park bases (more effort, less reuse), so they follow the high-multiplier work. |
| **Wave 6 — Thematic overlays** | **M-HABITAT**, **M-BIRDING**, **M-DOGS**, **M-ROCKART** | Lowest reuse (1–6 pages) and mostly relabels of earlier bases, so cheapest-last. M-ROCKART needs the extra protection review before publish. |

**Sequencing rationale in one line:** *base first → commercial multipliers → big clusters → planning → detail → overlays* — every wave spends effort where it touches the most pages, and no derivative is drawn before the base it reuses.

---

## Section 6 — Integration Plan

Where each map should eventually appear. **No page edits are made here** — this is the placement plan for the future unfrozen editorial window. Placement respects the frozen image architecture: a map used as **hero** is metadata-only (`heroImage`/`og:image`/JSON-LD, ≤500 KB WebP/AVIF, never a rendered `<img>`); a map rendered **in body** lives in `src/` and goes through `astro:assets` with a caption + alt.

| ID | Primary placement (hero vs body) | Target pages / integration point |
|---|---|---|
| **M-REGIONAL** | **Body** (top of "orientation" section) on guides + itineraries; shared **cornerstone body asset** on every hub pillar | `guides/ultimate-guide-to-vernal-utah` (orientation section), all 9 itineraries (near the pacing argument), all hub `index.astro` pillars, `things-to-do/vernal-utah-attractions` |
| **M-DINO-COUNTRY** | **Hero** candidate for the Vernal pillar; **body** on wide-context pages | `guides/ultimate-guide-to-vernal-utah` (hero or lead), `about.astro` ("our backyard"), gateway itineraries (context inset) |
| **M-UTV** | **Body** beside the trail list; **hero** candidate for the UTV pillar | `utv/best-utv-trails-vernal`, `atv-trails-vernal-utah`, `utv/` pillar, `booking.astro` (near cards), `guides/moab-utv-tours` (comparison), `from/salt-lake-city` |
| **M-DNM-ORIENT** | **Body** orientation block | `dinosaur-national-monument/visiting-dinosaur-national-monument`, `dinosaur-national-monument/` pillar, `hiking/best-hikes-in-dinosaur-national-monument` |
| **M-SCENIC** | **Body** network overview; **hero** candidate for scenic pillar | `scenic-drives/` pillar (hero), all 4 scenic spokes (body), `guides/ultimate-guide-to-flaming-gorge` |
| **M-FISHING** | **Body**; **hero** candidate for fishing pillar | `fishing/` pillar, all 4 fishing spokes, `itineraries/weekend-fishing-trip-vernal` |
| **M-CAMPING** | **Body**; **hero** candidate for camping pillar | `camping/` pillar, all 4 camping spokes |
| **M-HIKING** | **Body** orientation; **hero** candidate for hiking pillar | `hiking/` pillar, `beginner-hiking-guide-near-vernal`, `family-hiking-near-vernal`, `high-uintas-day-hikes` |
| **M-FAMILY** | **Body** | `things-to-do/fun-things-to-do-vernal-utah-kids`, `things-to-do/vernal-utah-attractions`, `itineraries/2-day-family-itinerary` |
| **M-ONEDAY** | **Body** beside the decision framework | `itineraries/one-day-adventure-vernal`, `itineraries/2-day-family-itinerary` |
| **M-WEEKEND** | **Body** at the itinerary overview; **hero** candidate for the 3-day page | `itineraries/3-day-adventure-itinerary`, `itineraries/2-day-family-itinerary`, `itineraries/romantic-weekend-dinosaur-country`, `itineraries/` pillar |
| **M-GATEWAY (SLC)** | **Hero** (the drive *is* the page) | `itineraries/weekend-road-trip-from-salt-lake-city`, `from/salt-lake-city` *(fills the file's own route-map TODO)* |
| **M-GATEWAY (DEN/GJ)** | **Hero** | `itineraries/weekend-road-trip-from-denver`, `itineraries/weekend-road-trip-from-grand-junction` |
| **M-DNM-DETAIL** | **Body** | `dinosaur-national-monument/visiting-dinosaur-national-monument`, `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks` |
| **M-REDFLEET** | **Body**; **hero** candidate for the Red Fleet guide | `guides/ultimate-guide-to-red-fleet-state-park`, `camping/camping-at-red-fleet-state-park`, `fishing/fishing-red-fleet-reservoir` |
| **M-STEINAKER** | **Body**; **hero** candidate for the Steinaker guide | `guides/ultimate-guide-to-steinaker-state-park`, `camping/camping-at-steinaker-state-park`, `fishing/fishing-steinaker-reservoir` |
| **M-GORGE** | **Body** | `guides/ultimate-guide-to-flaming-gorge`, `fishing/fishing-flaming-gorge`, `fishing/green-river-fly-fishing`, `camping/camping-at-flaming-gorge` |
| **M-HABITAT** | **Body** | `hiking/wildlife-hiking-guide-near-vernal`, `hiking/wildflower-hiking-near-vernal` |
| **M-BIRDING** | **Body** | `hiking/bird-watching-near-vernal` |
| **M-DOGS** | **Body** (the core promise) | `hiking/dog-friendly-hiking-near-vernal` |
| **M-ROCKART** | **Body**, low-res | `dinosaur-national-monument/petroglyphs-rock-art-vernal`, `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks`, `itineraries/photography-weekend-vernal` |

**Integration guardrails (for the future window, not applied here):**
- Heroes must clear the ≤500 KB WebP/AVIF zod gate; SVG-source maps export a compressed raster og:image derivative (§3.2) for the metadata hero while the crisp SVG renders in body.
- Every rendered map ships alt text (§3.7) so the "every `<img>` has alt" validator check passes, plus a caption (§3.8).
- Reuse is by design: the *same* SVG file is referenced by multiple pages; only the **caption + alt** are page-specific. This keeps the "one asset, many pages" economy intact and avoids duplicate files.

---

## Section 7 — Future Expansion

Additional maps that become worthwhile as new content ships. Listed so the base-geography design can *anticipate* them now (leave room in the layer set / palette) without building them yet.

| Future map | Trigger (what content unlocks it) | Likely derives from |
|---|---|---|
| **ATV / Jeep zone maps** | When `atv/` and `jeep/` hubs launch (currently legacy root pages) — a technical-terrain zone map (BLM south/east, Book Cliffs, Diamond Mtn) with fuel/no-cell markers. | M-UTV / M-REGIONAL |
| **Additional gateway routes** | New `/from/[city]/` pages beyond SLC (e.g. Denver-metro detail, Provo, Ogden, regional airports). | M-GATEWAY family |
| **Winter / seasonal-closure map** | A dedicated winter-conditions or "what's open in winter" page — walkable-low vs closed-high, plowed vs unplowed roads. | M-SCENIC + M-HIKING overlays |
| **Elevation-profile diagrams** (per trail/drive) | Kings Peak, the 3-day arc, individual scenic drives — cross-section profiles keyed to the route (a *diagram*, complements the plan-view maps). | new (diagram, not map) |
| **Dark-sky / stargazing map** | If astro-photography/romantic content deepens — darkest accessible overlooks + light-dome context. | M-REGIONAL + M-HABITAT |
| **Historic / "History, No BS" route map** | A Butch Cassidy / Outlaw Trail / homestead-history overlay tying the brand's history content together (rock-art rules still apply — vague on sensitive sites). | M-UTV / M-REGIONAL |
| **Individual UTV trail detail maps** | If per-trail spokes are written (best-utv-trails could spawn 5 trail pages) — each a single-trail corridor + waypoints (departure-direction only, not turn-by-turn). | M-UTV |
| **Snowpack / thaw-timing seasonal overlay** | Spring-hiking "follow the thaw up" content — an elevation-banded thaw-sequence overlay. | M-HIKING / M-HABITAT |
| **Restaurant / downtown dining map** | When `best-restaurants` gets its Restaurant/ItemList layout pass — a downtown cluster map pinning the 12 spots "on the way to DNM." | new (town-scale base) |
| **Regional airports / access map** | Broader "getting here" content (Vernal Regional, SLC Int'l, Grand Junction) for trip-planning depth. | M-DINO-COUNTRY |

**Design-now implication:** because most future maps also restyle **M-REGIONAL**, **M-DINO-COUNTRY**, or **M-UTV**, building those three base geographies with a clean, well-labeled layer structure and a documented palette (Section 3) is what makes the entire future roadmap cheap. Reserve palette roles and layer names for the categories above now; draw them when the content lands.

---

## Validation

Confirmed for this milestone:

- ✅ **No content changes** — no `.mdx`/`.astro`/page copy was edited; no map was placed on any page.
- ✅ **No architecture changes** — `src/lib/*`, `content.config.ts`, `astro.config`, registries untouched.
- ✅ **No layouts modified** — no file under `src/layouts/`.
- ✅ **No routing modified** — no `src/pages/**`, `_redirects`, or route change.
- ✅ **No schema changes** — no Zod/collection/JSON-LD/schema-component change; no new frontmatter field.
- ✅ **No CSS changes** — `styles.css` and all scoped styles untouched (palette/typography are *referenced* as standards to sample later, not written).
- ✅ **No components, validators, navigation, or build-pipeline changes.**
- ✅ **No artwork produced** — this is a specification; no SVG/raster map file was created.
- ✅ **No build run. No commit made.**

**Working tree contains only:** `docs/M6_REUSABLE_MAP_SYSTEM.md`.

*Document complete and internally reviewed. It defines the complete reusable-map library — inventory, reuse matrix, technical spec, information layers, production order, integration plan, and future expansion — as a staged plan for the owner's next unfrozen editorial/asset-production window. It proposes; it does not implement.*
