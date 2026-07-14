# M8.5 — Visual Coverage Audit

**Adventure Tours Vernal · Dinosaur Country**
Prepared: July 2026 · Companion to [`docs/M5_EEAT_MEDIA_AUDIT.md`](M5_EEAT_MEDIA_AUDIT.md), [`docs/M5_IMPLEMENTATION_ROADMAP.md`](M5_IMPLEMENTATION_ROADMAP.md) (§5 maps, §6 graphics), [`docs/M6_REUSABLE_MAP_SYSTEM.md`](M6_REUSABLE_MAP_SYSTEM.md), and [`docs/SVG_ENGINEERING_STANDARD.md`](SVG_ENGINEERING_STANDARD.md).
Scope: **audit & documentation only.** Architecture is FROZEN — no SVG was created, no page/MDX/Astro edited, no build run, no asset integrated. This document reviews what exists, measures coverage, and recommends where remaining effort should go. It proposes; it does not implement.

> **One-line finding.** The reusable-visual library has delivered ~80% of its total value with ~50% of its planned asset count: **all** the high-reach multiplier maps and **both** whole-site decision graphics are built and integrated across 40+ pages. The remaining planned assets are a low-reach long tail (1–5 pages each), several are now redundant, and the highest-value *unbuilt* work is a small desk-graphics batch (climate charts first). The site's defining weakness — zero original photography — is untouched by any of this and is where effort should pivot next.

---

## 1. Complete inventory of reusable visuals

Every reusable asset actually present under `public/images/maps/` and `public/images/graphics/`, each with a matching source note under `docs/**/source/`. Map IDs reference [`docs/M6_REUSABLE_MAP_SYSTEM.md`](M6_REUSABLE_MAP_SYSTEM.md).

### 1.1 Maps (`public/images/maps/` — 7 assets)

| ID | File | Purpose | Source note |
|---|---|---|---|
| **M-REGIONAL** | `vernal-regional-hub-and-spoke.svg` | Schematic hub-and-spoke — Vernal center, destinations as spokes (the base geography) | `docs/maps/source/vernal-regional-hub-and-spoke.README.md` |
| **M-DINO-COUNTRY** | `vernal-dinosaur-country-overview.svg` | Wider multi-state "where is Dinosaur Country" orientation frame | `…/vernal-dinosaur-country-overview.README.md` |
| **M-UTV** | `vernal-utv-trail-systems.svg` | Five UTV trail systems radiating from the staging point (directions, not routes) | `…/vernal-utv-trail-systems.README.md` |
| **M-DNM-ORIENT** | `dinosaur-national-monument-orientation.svg` | The monument's two halves (Utah fossil side / Colorado canyon side) | `…/dinosaur-national-monument-orientation.README.md` |
| **M-HIKING** | `vernal-hiking-regions.svg` | Desert-vs-alpine "two worlds," keyed to hike type | `…/vernal-hiking-regions.README.md` |
| **M-FISHING** | `vernal-fishing-waters-overview.svg` | Reservoirs + tailwater river as a set | `…/vernal-fishing-waters-overview.README.md` |
| **M-SCENIC** | `vernal-scenic-drives-overview.svg` | Byway spine + loop drives as one network | `…/vernal-scenic-drives-overview.README.md` |

### 1.2 Decision graphics (`public/images/graphics/` — 2 assets)

| ID | File | Purpose | Source note |
|---|---|---|---|
| **G-DECISION-TREE** | `vernal-adventure-decision-tree.svg` | Interest → experience selector (7 experiences by 4 interest branches) | `docs/graphics/source/vernal-adventure-decision-tree.README.md` |
| **G-COMPARISON-MATRIX** | `vernal-adventure-comparison-matrix.svg` | 5 experiences × 6 documentation attributes, side-by-side | `docs/graphics/source/vernal-adventure-comparison-matrix.README.md` |

### 1.3 Other reusable SVG assets

- **None** beyond the nine above. `public/images/favicon.svg` is brand identity, not a content visual. No icon set, chart, diagram, or infographic SVG exists outside the maps/graphics libraries.

**Inventory totals:** 9 reusable content visuals (7 maps + 2 decision graphics); 9 source notes (1:1 coverage — every asset is documented and regenerable). All nine follow the [SVG Engineering Standard](SVG_ENGINEERING_STANDARD.md): hardcoded-hex light theme, dark-mode override only, numbered layer groups, `role="img"`/`<title>`/`<desc>`, self-contained.

---

## 2. Coverage matrix

### 2.1 Per-asset reuse (actual `<img>`/reference count in `src/`)

Counts are the ground-truth number of pages currently embedding each asset (verified by repo grep), set against the reuse M6 projected.

| ID | Pages using it now | Count | M6 projected | Coverage verdict |
|---|---|---|---|---|
| **M-REGIONAL** | vernal-guide, things-to-do hub, itineraries hub, flaming-gorge guide, ashley guide, red-fleet guide, steinaker guide, visiting-DNM | **8** | 25–30+ | **Under-deployed vs. plan** (integration gap, not a production gap — see §3.3) |
| **M-UTV** | 7 UTV spokes + utv pillar + booking + moab-utv-tours + weekend-road-trip-SLC | **11** | 11–13 | **Sufficient** (matches plan) |
| **M-DINO-COUNTRY** | vernal-guide, flaming-gorge guide, ashley guide, about, visiting-DNM | **5** | 10–15 | Adequate; wide-context pages covered |
| **M-DNM-ORIENT** | visiting-DNM, best-hikes-DNM, cub-creek, DNM pillar, one-day | **5** | 6–8 | **Sufficient** |
| **M-HIKING** | 13 hiking spokes + hiking pillar | **14** | 12–17 | **Sufficient** (best-deployed cluster map) |
| **M-FISHING** | 4 fishing spokes + fishing pillar + weekend-fishing | **6** | 7–9 | **Sufficient** |
| **M-SCENIC** | 4 scenic spokes + scenic pillar + photography-weekend | **6** | 8–10 | **Sufficient** |
| **G-DECISION-TREE** | itineraries hub, things-to-do hub, vernal-guide, 3-day, one-day | **5** | (whole-site aid) | **Sufficient** — on the top-of-funnel planning surfaces |
| **G-COMPARISON-MATRIX** | itineraries hub, things-to-do hub, vernal-guide | **3** | (whole-site aid) | **Sufficient** — the three whole-region planning pillars (M8.4) |

**Total: 63 asset-embeds across the 9 visuals.** Every hub pillar except `guides/` and `camping/` carries at least one visual; the two flagship planning pillars (things-to-do, itineraries) carry three each.

### 2.2 Hub-pillar coverage

| Hub pillar | Visuals | Sufficient? |
|---|---|---|
| utv, dinosaur-national-monument, fishing, hiking, scenic-drives | 1 map each | ✔ Yes — the cluster's own overview map |
| things-to-do, itineraries | 3 each (map + tree + matrix) | ✔ Yes — richly covered |
| **guides** | **0** | ⚠ Gap — pillar could reuse M-REGIONAL / M-DINO-COUNTRY (both exist) |
| **camping** | **0** | ⚠ Gap — see §3.1 |

### 2.3 Coverage verdict

Coverage is **sufficient for every high-reach cluster.** The seven built maps include the four ⭐ multipliers M6 identified (M-REGIONAL, M-UTV, M-HIKING, M-DINO-COUNTRY) plus all three biggest content clusters' overviews (fishing, scenic, DNM). The two decision graphics sit on exactly the pages where a visitor is choosing among experiences. The reuse curve has **flattened**: the assets that would each touch 5+ pages are done, and what remains touches 1–5 pages apiece.

---

## 3. Gap analysis

### 3.1 High-value pages still lacking visual support

Pages that currently embed **no** reusable visual (repo-verified), ranked by value:

| Page(s) | Cluster | Best fix | Priority |
|---|---|---|---|
| **camping hub + 4 camping spokes** (flaming-gorge, red-fleet, steinaker, ashley) | Camping | **M-CAMPING** *or* reuse M-REGIONAL (destinations already on it) | Medium |
| **vernal-weather-guide** | Guides | **Climate charts** (dataviz — unique, not a map). M5 F7 "defining gap." | **High** |
| **guides/ pillar index** | Guides | Reuse M-REGIONAL or M-DINO-COUNTRY (exist) | Medium |
| **from/salt-lake-city** + weekend-road-trip-from-denver / -grand-junction | Gateways | **M-GATEWAY** (SLC/DEN/GJ) — the drive *is* the page; resolves SLC's in-file map TODO | Medium |
| **things-to-do/vernal-utah-attractions**, **fun-things-to-do-kids** | Things-to-do | Reuse M-REGIONAL + M-DNM-ORIENT (exist); or M-FAMILY | Medium |
| **petroglyphs-rock-art-vernal** | DNM | Reuse M-DNM-ORIENT (exists); M-ROCKART only if protection-vague | Low–Med |
| **2-day-family**, **romantic-weekend** itineraries | Itineraries | **Reuse M-REGIONAL** (the itineraries-hub pattern) — no new asset | Low (reuse) |
| **atv-trails**, **jeep-trails** (legacy `.astro`) | UTV-adjacent | **Reuse M-UTV** (exists) once converted | Low (reuse) |
| bird-watching, dog-friendly-hiking | Hiking overlays | M-BIRDING / M-DOGS (1 page each) | Low |
| best-restaurants | Things-to-do | Downtown dining map (future, town-scale) | Low |
| what-to-bring, what-to-wear-utv-tour | Guides | Packing/loadout graphic (unique, narrow) | Low |

Excluded (correctly visual-free): `faq`, policies, `safety-guidelines`, and the `[hub]/[id]` / `itineraries/[id]` route templates.

### 3.2 The one real cluster gap

**Camping is the only content cluster with no map at all** (hub + 4 spokes = 5 pages). It is the highest-reach single production gap. But note §3.3: M-REGIONAL already shows all four camping destinations, so this is partially a *reuse* opportunity, not strictly a new-map requirement.

### 3.3 Existing visuals that should be reused instead of building new ones

Several "gaps" are **integration gaps, not production gaps** — an existing asset already answers the page's need and only needs placing (a future editorial-window task, out of scope here):

- **2-day-family & romantic itineraries → M-REGIONAL** (already the standard itinerary-hub visual).
- **atv-trails & jeep-trails → M-UTV** (same trail geography; M6 §7 anticipates this).
- **guides/ pillar → M-REGIONAL or M-DINO-COUNTRY.**
- **things-to-do attractions/kids → M-REGIONAL + M-DNM-ORIENT.**
- **petroglyphs & cub-creek rock-art context → M-DNM-ORIENT** (already on cub-creek).
- **camping spokes → M-REGIONAL** as an interim, before any dedicated M-CAMPING.

**Implication:** a meaningful share of remaining "coverage" can be closed with **zero new SVGs** by reusing the nine that exist — reinforcing that new asset production is no longer the bottleneck.

---

## 4. Redundancy analysis — planned graphics no longer necessary

Planned assets from M5 §6 (graphics) and M6 (maps) that are now **redundant** because a shipped asset (or existing HTML) already solves the problem. Recommend **cancel** or **downgrade**.

| Planned asset (source) | Why redundant now | Recommendation |
|---|---|---|
| **Regional hub-and-spoke *infographic*** (non-map spoke diagram) — M5 §6 | Fully duplicates **M-REGIONAL** (map) + **G-DECISION-TREE**; both already ship the "wheel"/"choose a spoke" idea | **Cancel** |
| **Trip-length + season planner grid** — M5 §6 | Itineraries hub already has a trip-length HTML table **plus** G-DECISION-TREE **plus** G-COMPARISON-MATRIX | **Cancel** |
| **5-trail comparison chart**, **fishing five-water matrix**, **rental-vs-guided comparison** (per-hub comparison graphics) — M5 §6 | Each hub already ships an HTML selection table ("Choosing the Right Hiking Destination / Destination / Drive," UTV trail table) **and** the whole-site **G-COMPARISON-MATRIX** now exists | **Downgrade → cancel** unless a hub table proves insufficient; do **not** rebuild the table as an SVG |
| **Per-hub decision trees** ("which trail/hike/water is right for you") — M5 §6 | Whole-site **G-DECISION-TREE** + per-hub HTML tables cover the need at top-of-funnel and in-hub | **Downgrade** — build only if a specific hub demonstrably needs its own selector |
| **M-ONEDAY map** — M6 Tier C | One-day page already carries G-DECISION-TREE + **M-DNM-ORIENT**; the "core vs north half" point is made by copy + those assets | **Downgrade → optional** |
| **M-WEEKEND route diagram** — M6 Tier C | Itinerary pages already carry M-REGIONAL + tree (+ matrix on the hub); a day-by-day overlay is marginal | **Downgrade → optional** |
| **M-BIRDING** (relabel of M-HABITAT) — M6 Tier E | Serves a single page; M-HABITAT (itself unbuilt, low-reach) would already cover it | **Defer/cancel** |

**Net:** at least **2 planned graphics are fully redundant** (regional infographic, planner grid), and **4–5 more are duplicative** of existing HTML tables + the two shipped decision graphics. Building them would add file weight and maintenance with near-zero new user value — and risk the "two graphics doing the same job" clutter M8.4 was careful to avoid.

---

## 5. Prioritized backlog — visuals still worth building

Only assets that deliver **unique** value not already covered by an existing map, decision graphic, or HTML table. Effort assumes hand-authored SVG per the engineering standard (½–1½ days each); charts use the `dataviz` skill.

| Rank | Asset | Type | Expected reuse | User value | Effort | Notes |
|---|---|---|---|---|---|---|
| **1** | **Monthly climate charts** (temp band, precip, UV-by-elevation, daily-swing) | Data-viz | weather-guide + seasonal-hiking ×4 + itineraries = ~7 | **High** — M5 F7 "defining gap," sits beside the best commercial CTA; shareable/link-worthy | Med | Desk; `dataviz` skill; light+dark |
| **2** | **Elevation "ladder" diagram** (desert → foothills → forest → alpine → Kings Peak) | Diagram | hiking cluster + seasonal + 3-day = ~8 | **High** — explains the "two worlds" thesis; no existing asset does elevation | Med | Desk; unique; complements M-HIKING |
| **3** | **Geology cross-sections** (Uinta-uplift fault; "tilted then sliced" Cub Creek; Green River tailwater) | Diagram | sheep-creek, cub-creek, green-river, byway, flaming-gorge = ~5 | **High** — "History/geology, No BS" brand moat; competitors/AI can't replicate | Med–High | Desk; educational; VERIFY geology facts |
| **4** | **Deep-time timeline** (149M-yr dinosaurs / ~1,000-yr Fremont / ~100-yr Josie cabin) | Timeline | visiting-DNM, petroglyphs, vernal-guide = ~3 | Med–High — unique, on-brand, shareable | Med | Desk |
| **5** | **M-CAMPING** *(or reuse M-REGIONAL)* | Map | camping hub + 4 spokes = ~5 | Medium — only uncovered cluster | Low–Med | **Prefer reuse first;** build only if zone-shading adds real value |
| **6** | **M-GATEWAY (SLC)** | Route map | from/SLC, weekend-road-trip-SLC = ~3 | Medium — the drive *is* the page; fills an in-file TODO | Med | Gated on gateway-city content depth |
| **7** | **Packing / "what to bring" loadout** + PDF checklist | Icon/flat-lay | what-to-bring, what-to-wear, booking = ~3 | Medium — utility + a downloadable | Med | Desk |
| **8** | **Safety cards** (rock-art ARPA etiquette, trackway do/don't) | Icon card | petroglyphs, cub-creek, red-fleet = ~3 | Low–Med — trust/stewardship | Low | Desk; small |
| **9** | **M-DOGS**, **M-HABITAT/M-BIRDING**, **M-ROCKART**, **M-GATEWAY (DEN/GJ)**, park-detail maps (Red Fleet/Steinaker/Gorge/DNM-detail), downtown dining map | Map/overlay | 1–5 pages each | Low — long tail | Low–Med | Build opportunistically as their pages mature |

**Backlog shape:** ranks 1–4 are **unique desk diagrams/charts with no travel and no overlap** — the genuine remaining value. Ranks 5–9 are lower-reach maps and overlays, several better solved by reuse than by drawing.

---

## 6. Final recommendation

**Shift primary effort away from the visual library and toward original photography, video, and editorial EEAT — after one small, high-value desk-graphics batch.**

Reasoning:

1. **The visual library's high-reach work is done.** All four ⭐ multiplier maps, all major cluster maps, and both whole-site decision graphics are built and integrated (63 embeds across 40+ pages). The reuse curve has flattened — remaining maps are P3/P4 assets touching 1–5 pages each, and several planned graphics are now redundant (§4).

2. **The defining site weakness is untouched by more graphics.** Per [M5_EEAT_MEDIA_AUDIT](M5_EEAT_MEDIA_AUDIT.md) F1–F6: **zero rendered original photography in article bodies**, **56 logo-hero pages**, and a **byline that outruns the evidence**. Maps and decision graphics were always the *desk-producible quick win*; they cannot substitute for Dave & Trudy's first-hand photos and video, which are the one moat competitors and AI cannot fabricate.

3. **Diminishing returns are now structural.** Another map adds a schematic to one more mid-tail page; one original trail photo or field-note caption converts a bylined claim into demonstrable Experience across a whole cluster. The ROI has crossed over.

**Recommended sequence:**

- **Phase A (short desk batch, no travel):** build backlog ranks **1–4** — climate charts, elevation ladder, geology cross-sections, deep-time timeline. These are unique, non-redundant, high-authority, and shareable. **Cancel** the redundant planned graphics in §4 rather than building them.
- **Phase B (the real pivot):** original media per the M5 roadmap — **Field Day 6 (town + UTV trails)** first (unblocks the money pages), the **tour highlight reel + "5 Trails"** video, and the **per-cluster hero-swap pass** replacing logo heroes, starting with the rarest un-shot assets (Red Fleet trackway, Cub Creek lizard panel, Wall of Bones, alpine-lake reflections).
- **Integration housekeeping (any editorial window):** close the §3.3 *reuse* gaps with existing SVGs (M-REGIONAL on family/romantic itineraries and the guides/camping pillars; M-UTV on atv/jeep) — **zero new asset production required.**
- **Long tail (opportunistic):** build backlog ranks 5–9 only as their pages mature; prefer reuse over drawing.

**Bottom line:** stop *expanding* the reusable-visual library as a primary workstream. Finish it with one focused desk batch of unique diagrams, retire the redundant planned graphics, and redirect the program's energy to original photography/video and the field-note EEAT layer, where the compounding advantage now lives.

---

## Validation

Confirmed for this milestone (audit-only):

- ✅ **No content changes** — no `.mdx`/`.astro` page copy edited; no visual integrated onto any page.
- ✅ **No page changes** — no file under `src/pages/**` or `src/content/**` modified.
- ✅ **No layouts** — nothing under `src/layouts/`.
- ✅ **No routing** — no route, `_redirects`, or `src/lib/*` change.
- ✅ **No schemas** — no Zod/collection/JSON-LD/frontmatter change.
- ✅ **No CSS** — `styles.css` and scoped styles untouched.
- ✅ **No components / validators / navigation / build pipeline** — none touched.
- ✅ **No new SVG created; no existing asset modified; no build run; no commit.**

**Working tree change introduced by M8.5:** this single file, `docs/M8_VISUAL_COVERAGE_AUDIT.md`.

*Document complete and internally reviewed. It inventories the nine reusable visuals, measures actual per-page coverage, identifies the real gaps (and which are reuse rather than production), retires the planned graphics that duplicate shipped assets, prioritizes the remaining unique-value backlog, and recommends pivoting from the visual library to original photography/video. It proposes; it does not implement.*
