# M9.3 — Production Hero Replacement Plan

**Adventure Tours Vernal · Dinosaur Country**
Prepared: mid-July 2026 · Companion to [`docs/M9_FIELD_CAPTURE_PLAYBOOK.md`](M9_FIELD_CAPTURE_PLAYBOOK.md) (what to shoot), [`docs/M9_MEDIA_DEPLOYMENT_WORKFLOW.md`](M9_MEDIA_DEPLOYMENT_WORKFLOW.md) (how each file is processed & shipped), and [`docs/M6_ORIGINAL_MEDIA_INVENTORY.md`](M6_ORIGINAL_MEDIA_INVENTORY.md) (what was already deployed).

Scope: **production deployment plan — documentation only.** This is the final "replace the remaining logo heroes, in what order, gated on which field day" specification. It does **not** edit any page, change any `heroImage`/`heroAlt`, create/alter any asset, or run a build. **Architecture is FROZEN.** Every hero path and filename below is a *specification* for the owner's next unfrozen editorial window, not an applied change.

> **Ground truth (repo-verified against the live tree, July 2026 — not inherited from the M6 count):**
> - **42 collection spokes still ship `heroImage: /images/logo.webp`.** This is the demand this plan retires. (M6.1 recorded 44; two of those — `guides/ultimate-guide-to-ashley-national-forest` and `utv/family-utv-guide-vernal` — have since been upgraded off the logo by the **parallel media workstream** and are the two `M` entries in `git status`. They are excluded here and were **not** touched.)
> - **All 7 UTV spokes and both DNM spokes are already off the logo** (M6.1 + parallel workstream). The remaining 42 live entirely in Hiking, Fishing, Camping, Scenic Drives, Guides, Things-to-Do, and Itineraries.
> - **Hub/pillar `.astro` pages** (`utv/`, `hiking/`, `fishing/`, … 9 of them) and the legacy `.astro` listicle `things-to-do/best-restaurants-vernal-utah` also render the logo as `og:image` via `Seo.astro`'s fallback, but they have **no `heroImage` frontmatter field** — replacing their hero is a page edit to `.astro`, a separate cornerstone pass (see §7). They are **not** counted in the 42.

---

## 1. Remaining Hero Inventory — the 42 logo spokes, grouped

Counts are of collection spokes whose frontmatter is verbatim `heroImage: /images/logo.webp`.

| Group | On logo | Notes |
|---|:--:|---|
| **UTV** | **0** | Complete — 7/7 spokes carry genuine originals (M6.1 + parallel workstream). |
| **Dinosaur (DNM)** | **0** | Complete — both spokes use `20.webp`. |
| **Hiking** | **16** | The single largest block; almost entirely FD4 high-country + seasonal. |
| **Fishing** | **4** | Red Fleet, Steinaker (FD3) + Flaming Gorge, Green River (FD5). |
| **Camping** | **4** | Red Fleet, Steinaker (FD3), Ashley NF (FD4), Flaming Gorge (FD5). |
| **Scenic Drives** | **4** | Cub Creek (FD2) + three byways (FD6). |
| **Guides** | **6** | 3 park cornerstones + town cornerstone + 2 UTV prep guides. |
| **Things to Do** | **1** | `vernal-utah-attractions` only. |
| **Itineraries** | **7** | 4 field-gated + 3 route-map (desk cartography, no photo). |
| **TOTAL** | **42** | |

**Enumerated (repo paths under `src/content/`):**

- **Hiking (16):** `hiking/best-hikes-in-dinosaur-national-monument`, `hiking/kings-peak-hiking-guide`, `hiking/high-uintas-day-hikes`, `hiking/alpine-lakes-hiking-high-uintas`, `hiking/high-uintas-backpacking-guide`, `hiking/family-hiking-near-vernal`, `hiking/beginner-hiking-guide-near-vernal`, `hiking/dog-friendly-hiking-near-vernal`, `hiking/spring-hiking-near-vernal`, `hiking/summer-hiking-near-vernal`, `hiking/fall-hiking-near-vernal`, `hiking/winter-hiking-near-vernal`, `hiking/wildlife-hiking-guide-near-vernal`, `hiking/bird-watching-near-vernal`, `hiking/wildflower-hiking-near-vernal`, `hiking/photography-hikes-near-vernal`
- **Fishing (4):** `fishing/fishing-red-fleet-reservoir`, `fishing/fishing-steinaker-reservoir`, `fishing/fishing-flaming-gorge`, `fishing/green-river-fly-fishing`
- **Camping (4):** `camping/camping-at-red-fleet-state-park`, `camping/camping-at-steinaker-state-park`, `camping/camping-in-ashley-national-forest`, `camping/camping-at-flaming-gorge`
- **Scenic Drives (4):** `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks`, `scenic-drives/sheep-creek-geological-loop`, `scenic-drives/red-cloud-loop-scenic-drive`, `scenic-drives/flaming-gorge-uintas-scenic-byway`
- **Guides (6):** `guides/ultimate-guide-to-vernal-utah`, `guides/ultimate-guide-to-red-fleet-state-park`, `guides/ultimate-guide-to-steinaker-state-park`, `guides/ultimate-guide-to-flaming-gorge`, `guides/what-to-wear-utv-tour`, `guides/what-to-bring`
- **Things to Do (1):** `things-to-do/vernal-utah-attractions`
- **Itineraries (7):** `itineraries/one-day-adventure-vernal`, `itineraries/photography-weekend-vernal`, `itineraries/3-day-adventure-itinerary`, `itineraries/weekend-fishing-trip-vernal`, `itineraries/weekend-road-trip-from-salt-lake-city`, `itineraries/weekend-road-trip-from-denver`, `itineraries/weekend-road-trip-from-grand-junction`

---

## 2. Replacement Schedule — per-page specification

For every page: current hero → desired future hero (kebab name per Deployment-Workflow §4) → required Field Day → priority → dependency. All future filenames land in `public/images/` and must clear the frozen **`.webp`/`.avif` + ≤500 KB** zod gate before deploy.

**Priority key:** P1 = cornerstone / commercial / rarest-asset page (replace first once shot); P2 = supporting spoke; P3 = thematic/seasonal or map-dependent (replace last).

### Guides (6)
| Page | Current | Desired future hero | FD | Pri | Dependency |
|---|---|---|:--:|:--:|---|
| `ultimate-guide-to-vernal-utah` | logo | `town-vernal-establishing.webp` | FD1 | P1 | FD1 town/Main-St capture |
| `what-to-wear-utv-tour` | logo | `utv-rider-provided-gear.webp` | FD1 | P1 | FD1 garage/staging; model release |
| `what-to-bring` | logo | `utv-provided-kit-flatlay.webp` | FD1 | P2 | FD1 garage flat-lay |
| `ultimate-guide-to-red-fleet-state-park` | logo | `redfleet-fins-dawn-reflection.webp` | FD3 | P1 | FD3 calm dawn (gating) |
| `ultimate-guide-to-steinaker-state-park` | logo | `steinaker-shoreline-dusk.webp` | FD3 | P1 | FD3 dusk set |
| `ultimate-guide-to-flaming-gorge` | logo | `gorge-red-canyon-overlook-goldenhour.webp` | FD5 | P1 | FD5 golden hour |

### Scenic Drives (4)
| Page | Current | Desired future hero | FD | Pri | Dependency |
|---|---|---|:--:|:--:|---|
| `cub-creek-road-tour-of-the-tilted-rocks` | logo | `scenic-cubcreek-tilted-rocks.webp` | FD2 | P2 | FD2; NPS = no drone; non-specific rock-art alt |
| `sheep-creek-geological-loop` | logo | `scenic-sheep-creek-folds-rakinglight.webp` | FD6 | P2 | FD6 raking side light |
| `red-cloud-loop-scenic-drive` | logo | `scenic-redcloud-aspen-gold.webp` | FD6 | P2 | **FALL peak color** (2-wk window) |
| `flaming-gorge-uintas-scenic-byway` | logo | `scenic-byway-greendale-y.webp` | FD6 | P2 | FD6 |

### Fishing (4)
| Page | Current | Desired future hero | FD | Pri | Dependency |
|---|---|---|:--:|:--:|---|
| `fishing-red-fleet-reservoir` | logo | `redfleet-rainbow-trout-bank.webp` | FD3 | P2 | FD3 |
| `fishing-steinaker-reservoir` | logo | `steinaker-stocked-rainbow.webp` | FD3 | P2 | FD3 |
| `fishing-flaming-gorge` | logo | `gorge-trophy-lake-trout.webp` | FD5 | P1 | FD5; grip-and-grin + model release |
| `green-river-fly-fishing` | logo | `gorge-green-river-clearwater-trout.webp` | FD5 | P1 | FD5 clear-water midday |

### Camping (4)
| Page | Current | Desired future hero | FD | Pri | Dependency |
|---|---|---|:--:|:--:|---|
| `camping-at-red-fleet-state-park` | logo | `redfleet-shoreline-campsite.webp` | FD3 | P2 | FD3 |
| `camping-at-steinaker-state-park` | logo | `steinaker-campsite-dusk.webp` | FD3 | P2 | FD3 |
| `camping-in-ashley-national-forest` | logo | `uintas-basin-camp-dawn.webp` | FD4 | P2 | **FD4 summer-only** window |
| `camping-at-flaming-gorge` | logo | `gorge-shoreline-campsite.webp` | FD5 | P2 | FD5 |

### Hiking (16)
| Page | Current | Desired future hero | FD | Pri | Dependency |
|---|---|---|:--:|:--:|---|
| `best-hikes-in-dinosaur-national-monument` | logo | `dnm-fossil-discovery-trail.webp` | FD2 | P1 | FD2 |
| `photography-hikes-near-vernal` | logo | `dnm-mcconkie-panel-lowlight.webp` | FD2 | P2 | FD2; non-specific rock-art alt/EXIF |
| `alpine-lakes-hiking-high-uintas` | logo | `uintas-alpine-lake-reflection-dawn.webp` | FD4 | P1 | **FD4 summer-only + calm dawn** |
| `kings-peak-hiking-guide` | logo | `uintas-kings-peak-ridge.webp` | FD4 | P1 | **FD4 summer-only**; requires backpack-in |
| `high-uintas-day-hikes` | logo | `uintas-drive-up-lake.webp` | FD4 | P2 | **FD4 summer-only** |
| `high-uintas-backpacking-guide` | logo | `uintas-loaded-pack-tundra.webp` | FD4 | P2 | **FD4 summer-only** |
| `wildflower-hiking-near-vernal` | logo | `uintas-wildflower-meadow.webp` | FD4 | P2 | **FD4 summer bloom** |
| `summer-hiking-near-vernal` | logo | `uintas-alpine-basin-summer.webp` | FD4 | P2 | **FD4 summer-only** |
| `family-hiking-near-vernal` | logo | `redfleet-family-beach-trail.webp` | FD3 | P2 | FD3; model release (kids) |
| `fall-hiking-near-vernal` | logo | `scenic-redcloud-aspen-gold.webp` | FD6 | P2 | **FALL peak color** |
| `spring-hiking-near-vernal` | logo | `hiking-spring-trail.webp` | *seasonal* | P3 | **Dedicated SPRING pass — not FD1–6** |
| `winter-hiking-near-vernal` | logo | `hiking-winter-snow-trail.webp` | *seasonal* | P3 | **Dedicated WINTER pass — not FD1–6** |
| `beginner-hiking-guide-near-vernal` | logo | `hiking-beginner-lowland-trail.webp` | FD2/FD3 opp. | P3 | Opportunistic lower-elevation frame |
| `dog-friendly-hiking-near-vernal` | logo | `hiking-dog-friendly-trail.webp` | FD2/FD3 opp. | P3 | Opportunistic; dog on-frame |
| `wildlife-hiking-guide-near-vernal` | logo | `wildlife-moose-willows.webp` | FD2/FD4 opp. | P3 | **Opportunistic long-lens** (not guaranteed) |
| `bird-watching-near-vernal` | logo | `wildlife-bird-longlens.webp` | FD2/FD4 opp. | P3 | **Opportunistic long-lens** (not guaranteed) |

### Things to Do (1)
| Page | Current | Desired future hero | FD | Pri | Dependency |
|---|---|---|:--:|:--:|---|
| `vernal-utah-attractions` | logo | `town-vernal-dino-statue.webp` | FD1 | P1 | FD1 town/Field-House |

### Itineraries (7)
| Page | Current | Desired future hero | FD | Pri | Dependency |
|---|---|---|:--:|:--:|---|
| `one-day-adventure-vernal` | logo | `dnm-quarry-wall-of-bones.webp` | FD2 | P1 | FD2 (weather-proof marquee) |
| `photography-weekend-vernal` | logo | `dnm-cubcreek-lizard-panel.webp` | FD2 | P2 | FD2; non-specific rock-art alt |
| `3-day-adventure-itinerary` | logo | `uintas-signature-reflection.webp` | FD4 | P1 | **FD4 summer-only** |
| `weekend-fishing-trip-vernal` | logo | `gorge-red-canyon-overlook-goldenhour.webp` | FD5 | P2 | FD5 |
| `weekend-road-trip-from-salt-lake-city` | logo | `map-slc-to-vernal-route.webp` | **desk** | P3 | **Desk cartography — no field day** |
| `weekend-road-trip-from-denver` | logo | `map-denver-to-vernal-route.webp` | **desk** | P3 | **Desk cartography — no field day** |
| `weekend-road-trip-from-grand-junction` | logo | `map-gj-to-vernal-route.webp` | **desk** | P3 | **Desk cartography — no field day** |

---

## 3. Field Day Mapping — how many pages each day retires

Of the 42, **33 are retired by the six planned field days**; **9 are residual** (desk cartography or off-plan seasonal/opportunistic capture — §5.2).

| Field day | Window (2026) | Pages retired | Count |
|---|---|---|:--:|
| **FD1 — Town & UTV** | Late July | vernal-utah-attractions, ultimate-guide-to-vernal-utah, what-to-wear-utv-tour, what-to-bring | **4** |
| **FD2 — DNM** | Late Jul–early Aug | best-hikes-in-DNM, one-day-adventure-vernal, cub-creek-road-tour, photography-hikes-near-vernal, photography-weekend-vernal | **5** |
| **FD3 — Red Fleet + Steinaker** | Aug (calm dawn) | red-fleet guide, camping-red-fleet, fishing-red-fleet, family-hiking, steinaker guide, camping-steinaker, fishing-steinaker | **7** |
| **FD4 — Ashley NF & High Uintas** | **Aug (before ~mid-Sept)** | alpine-lakes, kings-peak, high-uintas-day-hikes, high-uintas-backpacking, wildflower, summer-hiking, camping-ashley, 3-day-itinerary | **8** |
| **FD5 — Flaming Gorge** | Aug–early Sept | flaming-gorge guide, fishing-flaming-gorge, green-river-fly-fishing, camping-flaming-gorge, weekend-fishing-trip | **5** |
| **FD6 — Scenic Drives** | **Late Sept–Oct (fall)** | sheep-creek, red-cloud-loop, flaming-gorge-byway, fall-hiking | **4** |
| **Subtotal (field days)** | | | **33** |
| **Residual (§5.2)** | | 3 route maps + spring/winter/beginner/dog/wildlife/bird hiking | **9** |
| **TOTAL** | | | **42** |

**Reading:** FD4 retires the most pages (8) **and** is the hardest-gated (summer-only, window closing ~8 weeks out) — it is the single highest-urgency capture even though FD1 is deployed first. FD3 (7 pages) hinges on one glass-calm dawn; if the dawn misses, the Red-Fleet-trackway pages slip with it.

---

## 4. Deployment Order — minimizing validation risk

**Governing principle (from Media-Deployment-Workflow §5.3):** a logo→real hero swap is always a swap between two *valid* heroes — the logo is a known-good fallback — so the only way a deploy regresses is if the **new** file fails a gate. Therefore risk is minimized by (a) processing every asset through the ≤500 KB webp gate **before** it touches frontmatter, and (b) deploying **one page per commit, cluster by cluster, in field-day-shot order**, so any regression's blast radius is a single page and its revert is a one-line frontmatter change back to the logo.

**Recommended replacement order:**

1. **FD1 cluster** (4 pages) — any-weather, highest commercial value, deploy as soon as processed. Order within: `vernal-utah-attractions` → `ultimate-guide-to-vernal-utah` → `what-to-wear-utv-tour` → `what-to-bring`.
2. **FD2 cluster** (5) — lead with the weather-proof marquee `one-day-adventure-vernal` (Wall of Bones), then `best-hikes-in-DNM`, then the three rock-art pages (verify non-specific alt + stripped EXIF **before** commit).
3. **FD3 cluster** (7) — **only after a confirmed glass-calm dawn.** Lead with the rarest asset: `ultimate-guide-to-red-fleet-state-park` (trackway/fins) → Red Fleet fishing/camping/family → Steinaker guide/fishing/camping.
4. **FD4 cluster** (8) — deploy as soon as the summer window is captured (capture is the risk, not deploy). Lead with `alpine-lakes-hiking-high-uintas` + `3-day-adventure-itinerary` (signature reflection) → remaining high-country → `camping-in-ashley-national-forest`.
5. **FD5 cluster** (5) — lead with `ultimate-guide-to-flaming-gorge` (Red Canyon Overlook) → fishing/green-river/camping → `weekend-fishing-trip`.
6. **FD6 cluster** (4) — **gated on fall peak color.** `red-cloud-loop-scenic-drive` + `fall-hiking-near-vernal` wait for the ~2-week aspen window; `sheep-creek` + `flaming-gorge-byway` can go earlier in FD6.
7. **Residual** (9) — desk-cartography route maps whenever the maps are drawn; seasonal/opportunistic hiking pages as those frames land (may span into 2027 — §5.2). These stay on the logo fallback safely until then.

**Per-commit gate discipline** (Deployment-Workflow §3, boxes 18–21, editorial window only): set `heroImage` + `heroAlt` for one page → clear `node_modules/.astro` → `npm run build` → confirm `astro check` 0 errors, `validate-site.mjs` green, hero <500 KB gate passes → spot-check `og:image` + JSON-LD `image` in `dist/`. Never batch a cluster into one commit — it defeats single-page rollback.

---

## 5. Risk Assessment

### 5.1 Pages that can NEVER take a generic photo (page-specific image mandatory)
A generic or cross-usable frame would either misrepresent the page or fail its SEO intent. These **require a specific, unsubstitutable subject** and must never be filled from a stock-like or shared frame:

- **Red Fleet trackway trio** — the dinosaur trackway/tilted "ships" are literally unique: `guides/ultimate-guide-to-red-fleet-state-park`, `fishing/fishing-red-fleet-reservoir`, `camping/camping-at-red-fleet-state-park`.
- **Kings Peak** — Utah's highest point; a generic alpine shot misleads: `hiking/kings-peak-hiking-guide`.
- **Cub Creek / tilted rocks & rock art** — specific auto-tour geology + Fremont panels: `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks`, `hiking/photography-hikes-near-vernal`, `itineraries/photography-weekend-vernal`.
- **Sheep Creek fault geology** — the folded/tilted strata are the whole subject: `scenic-drives/sheep-creek-geological-loop`.
- **Red Cloud Loop aspen drive** — the fall-color byway is the subject: `scenic-drives/red-cloud-loop-scenic-drive`.
- **Flaming Gorge / Red Canyon Overlook & Green River** — the region's signature red-cliff-over-blue-water and gin-clear tailwater: `guides/ultimate-guide-to-flaming-gorge`, `fishing/fishing-flaming-gorge`, `fishing/green-river-fly-fishing`.
- **Wall of Bones / DNM** — the Quarry interior is unmistakable and un-fakeable: `hiking/best-hikes-in-dinosaur-national-monument`, `itineraries/one-day-adventure-vernal`.
- **The 3 route-map itineraries** — can never take a *photo* at all; they need a **page-specific cartographic graphic** of that city→Vernal route: `weekend-road-trip-from-salt-lake-city`, `weekend-road-trip-from-denver`, `weekend-road-trip-from-grand-junction`.

By contrast, the seasonal/thematic hiking pages (`spring-`, `winter-`, `summer-`, `beginner-`, `dog-friendly-`, `family-hiking`) **can** accept a representative-but-local trail frame — still an original Vernal-area photo, just not a single irreplaceable subject.

### 5.2 Residual pages not retired by FD1–FD6 (9)
- **Desk cartography (3):** the three `weekend-road-trip-from-*` itineraries — blocked on route-map graphics, not photography. Can proceed independently of the field program at any time.
- **Dedicated seasonal passes (2):** `spring-hiking-near-vernal`, `winter-hiking-near-vernal` — FD4 is summer-only and FD6 is fall; spring and winter frames require their own seasonal shoots (playbook item 27, rolling multi-trip). Realistically 2027 for a matched set.
- **Opportunistic long-lens (4):** `wildlife-hiking-guide-near-vernal`, `bird-watching-near-vernal`, `beginner-hiking-guide-near-vernal`, `dog-friendly-hiking-near-vernal` — may be satisfied from FD2/FD4 opportunistic wildlife/low-elevation b-roll, but **capture is not guaranteed** on any single day. Track as best-effort; they stay on the safe logo fallback until a genuine frame exists.

**No silent caps:** these 9 are called out explicitly so the "42 → target ≤10" trajectory is honest. FD1–FD6 alone take the logo count **42 → 9**; clearing the last 9 needs desk cartography plus off-season/opportunistic capture beyond the six planned days.

### 5.3 Capture & deployment risks
| Risk | Impact | Mitigation |
|---|---|---|
| **FD4 summer window closes (~mid-Sept)** | 8 pages + `3-day-itinerary` stranded to summer 2027 | Highest capture urgency; schedule FD4 before FD5/FD6 even though it deploys later. |
| **FD3 dawn not glass-calm** | 7 Red-Fleet/Steinaker pages slip; trackway is the rarest asset | Treat calm dawn as a hard gate; reschedule reflection/paddle, don't ship a weak frame. |
| **FD6 misses aspen peak (~2-wk)** | `red-cloud-loop`, `fall-hiking` slip a year | Watch color report; shoot non-color byway frames early, aspens on peak. |
| **New hero >500 KB** | Build **fails** at zod gate | Compress to ≤500 KB (sharp q≈78 precedent, temp-name-then-swap on Windows) **before** frontmatter edit. |
| **Rock-art alt/EXIF too specific** | Site-protection breach | Non-specific `heroAlt`; strip/round GPS on cub-creek/photography/petroglyph frames. |
| **Model release missing (kids/guests)** | Frame unpublishable | Confirm releases at capture for `what-to-wear`, `family-hiking`, `fishing-flaming-gorge`, any child-in-frame. |
| **Batch-committing a cluster** | Regression hard to isolate | One page per commit; logo remains the one-line revert target. |

---

## 6. Program-level trajectory

- **Now:** 42 collection spokes on `logo.webp` (UTV + DNM already clear).
- **After FD1–FD6 fully deployed:** **9** remaining (all in §5.2) — clears the M5 "logo-hero ≤10" success target.
- **After residual (maps + seasonal/opportunistic):** **0** collection-spoke logo heroes.
- **Separate track (not in the 42):** 9 `.astro` hub pillars + `best-restaurants` legacy listicle still fall back to the logo `og:image`; retiring those is the cornerstone/per-hub-hero pass in §7, and each is a page edit, not a frontmatter swap.

---

## 7. Out of scope here (flagged, not done)

- **Hub/pillar `.astro` heroes** — `utv/`, `things-to-do/`, `dinosaur-national-monument/`, `guides/`, `fishing/`, `camping/`, `hiking/`, `scenic-drives/`, `itineraries/` index pages + `things-to-do/best-restaurants-vernal-utah`. They have no `heroImage` field; giving them a representative hero means editing the `.astro` `Seo` call — a cornerstone pass, deliberately separate from this frontmatter-only plan.
- **Body (in-article) images** — still zero across `src/content/**`; the first-body-image work is its own editorial-window task (Deployment-Workflow §1.2), not a hero replacement.
- **Author portraits** — `dave.webp`/`trudy.webp`, tracked as Pending owner input, not a field-day hero.

---

## Validation

Confirmed for this milestone (production deployment **plan** — documentation only):

- ✅ **Documentation only** — the sole working-tree change is this file, `docs/M9_HERO_REPLACEMENT_PLAN.md`.
- ✅ **No page edits** — no `.mdx`/`.astro` content modified.
- ✅ **No hero/image edits** — no `heroImage`/`heroAlt` value changed on any page; nothing under `public/images/**` created or altered (every future filename here is a *specification*).
- ✅ **No architecture changes** — no layout, routing, collection, schema, CSS, component, validator, navigation, JSON-LD, or build-pipeline file touched. The freeze holds.
- ✅ **No build run. No commit made.**
- ✅ **Parallel workstream untouched** — `guides/ultimate-guide-to-ashley-national-forest.mdx` and `utv/family-utv-guide-vernal.mdx` (the two `M` files in `git status`) and the untracked `docs/M9_MEDIA_DEPLOYMENT_WORKFLOW.md` were read for ground truth only; none were modified, staged, reverted, renamed, deleted, or committed.

*Document complete and internally reviewed. It is the final production hero-replacement plan — repo-verified inventory of the 42 remaining logo spokes, per-page replacement spec, field-day mapping, risk-minimizing deployment order, and the never-generic / residual risk assessment — staged for the owner's next editorial/production window. It plans and sequences; it does not edit a page, change a hero, create an asset, or run a build.*
