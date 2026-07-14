# M9.4 — Field Asset Manifest (take-into-the-truck master)

**Adventure Tours Vernal · Dinosaur Country**
Prepared: mid-July 2026 · Companion to [`docs/M9_FIELD_CAPTURE_PLAYBOOK.md`](M9_FIELD_CAPTURE_PLAYBOOK.md) (why/how to shoot), [`docs/M9_MEDIA_DEPLOYMENT_WORKFLOW.md`](M9_MEDIA_DEPLOYMENT_WORKFLOW.md) (process each file), and [`docs/M9_HERO_REPLACEMENT_PLAN.md`](M9_HERO_REPLACEMENT_PLAN.md) (which page each hero serves).

Scope: **capture manifest — documentation only.** The single printable master list Dave & Trudy carry into the field: every required photo and video, its light/season window, the exact pages it feeds, the drone rule for its parcel, a per-day shot schedule, a one-page packing list, and a risk register. It does **not** edit any page, change any `heroImage`/`heroAlt`, create/alter any asset, or run a build. **Architecture is FROZEN.** Every filename and page mapping below is a *specification* for the future editorial window, carried forward verbatim from the M9.3 plan.

> **How to read the Asset IDs:** `FD{n}-P{nn}` = photograph, `FD{n}-V{nn}` = video, shot on Field Day *n*. "Hero pages" = pages whose `heroImage` this frame becomes (per M9.3). "Body pages" = pages that render it in-article via `astro:assets`. Priority scores are 1–5 (5 = highest), carried from the playbook's Priority Shoot List.
>
> **Rock-art & trackway ethics (non-negotiable, applies to every FD2/FD3 rock-art & trackway frame):** never chalk/wet/touch/move anything; shoot low raking light; **strip or round EXIF GPS**; keep `heroAlt`/captions deliberately non-specific — **never publish precise coordinates**.

---

## 1. Asset Inventory — required photographs

### FD1 — Downtown Vernal & UTV Trails *(any weather; shoulder-season light)*

| ID | Subject | Location | Best light | Season | Hero pages | Body pages | Comm. | SEO |
|---|---|---|---|---|---|---|:--:|:--:|
| **FD1-P01** | KRX fleet cresting Asphalt Ridge (fleet-scale money shot) | Asphalt Ridge, Vernal | Golden hour | Shoulder ideal / any | `utv/` pillar* | booking, all 7 UTV spokes | 5 | 5 |
| **FD1-P02** | Child buckled in roll cage beside parent | Staging, 1935 S 1500 E | AM / any | Any | — | family-utv-guide, beginners-guide-utv | 5 | 4 |
| **FD1-P03** | Dave & Trudy each on their own KRX, guiding | On trail | Golden hour | Any | about* | UTV spokes, guides | 5 | 4 |
| **FD1-P04** | KRX cockpit + FOX 2.5 PODIUM shock detail | Garage | Any (controlled) | Any | — | what-to-bring, what-to-wear, side-by-side-rentals | 4 | 3 |
| **FD1-P05** | Dave's pre-ride safety briefing | Staging | AM | Any | — | what-to-wear, beginners-guide, group-utv | 4 | 3 |
| **FD1-P06** | Correctly-dressed rider in provided gear | Staging | AM / golden | Any | **guides/what-to-wear-utv-tour** → `utv-rider-provided-gear.webp` | beginners-guide | 4 | 3 |
| **FD1-P07** | Provided-kit flat-lay (helmet, goggles, water, etc.) | Garage | Any (controlled) | Any | **guides/what-to-bring** → `utv-provided-kit-flatlay.webp` | what-to-wear | 3 | 3 |
| **FD1-P08** | Main St dino sculptures / pink "Dinah" + Field House garden | Downtown Vernal | Golden hour / midday | Any | **things-to-do/vernal-utah-attractions** → `town-vernal-dino-statue.webp` | fun-things-kids, best-restaurants | 3 | 3 |
| **FD1-P09** | Vernal gateway / town establishing shot | Downtown / overlook | Golden hour | Any | **guides/ultimate-guide-to-vernal-utah** → `town-vernal-establishing.webp` | from/salt-lake-city | 3 | 4 |
| **FD1-P10** | Restaurant storefronts + one signature dish each | Downtown Vernal | Any | Any | — | best-restaurants | 2 | 2 |

### FD2 — Dinosaur National Monument *(weather-proof indoors; rock art wants low light)*

| ID | Subject | Location | Best light | Season | Hero pages | Body pages | Comm. | SEO |
|---|---|---|---|---|---|---|:--:|:--:|
| **FD2-P01** | Wall of Bones wide + touch-the-fossil moment | Quarry Exhibit Hall | Indoor, any | Any (weather-proof) | **itineraries/one-day-adventure-vernal** → `dnm-quarry-wall-of-bones.webp` | visiting-DNM, best-hikes-DNM | 3 | 5 |
| **FD2-P02** | Cub Creek Fremont lizard petroglyph panel | Cub Creek (general) | Low raking | Any low light | **itineraries/photography-weekend-vernal** → `dnm-cubcreek-lizard-panel.webp` | petroglyphs, cub-creek-road-tour | 2 | 5 |
| **FD2-P03** | McConkie Ranch broad-shouldered Fremont panel | Dry Fork (general) | Low light | Any low light | **hiking/photography-hikes-near-vernal** → `dnm-mcconkie-panel-lowlight.webp` | petroglyphs | 2 | 5 |
| **FD2-P04** | Fossil Discovery Trail bone in situ | DNM | Morning | Any | **hiking/best-hikes-in-dinosaur-national-monument** → `dnm-fossil-discovery-trail.webp` | visiting-DNM | 3 | 5 |
| **FD2-P05** | Cub Creek tilted-rocks auto-tour scene | Cub Creek | Golden / low | Any | **scenic-drives/cub-creek-road-tour-of-the-tilted-rocks** → `scenic-cubcreek-tilted-rocks.webp` | visiting-DNM | 2 | 4 |
| **FD2-P06** | Josie Morris cabin (ext + int) | Cub Creek | Morning | Any | — | cub-creek-road-tour, visiting-DNM | 1 | 3 |
| **FD2-P07** | Split Mountain river cut | DNM (overlook) | Golden hour | Any | — | visiting-DNM, scenic byway | 2 | 3 |

### FD3 — Red Fleet + Steinaker *(calm glass-water dawn is the whole value)*

| ID | Subject | Location | Best light | Season | Hero pages | Body pages | Comm. | SEO |
|---|---|---|---|---|---|---|:--:|:--:|
| **FD3-P01** | Dinosaur trackway prints (respectful, low light) — **rarest un-shot asset** | Red Fleet SP (general) | Low raking | Spring/Fall low light, **calm** | — | red-fleet guide, camping-red-fleet, fishing-red-fleet | 3 | 5 |
| **FD3-P02** | Kayak crossing toward trackway shoreline, dawn glass water | Red Fleet SP | Dawn | **Calm dawn** | — | red-fleet guide, camping-red-fleet | 3 | 4 |
| **FD3-P03** | Tilted Navajo "ships" (fins) + dawn reflection | Red Fleet SP | Dawn | **Calm dawn** | **guides/ultimate-guide-to-red-fleet-state-park** → `redfleet-fins-dawn-reflection.webp` | camping-red-fleet | 3 | 5 |
| **FD3-P04** | Stocked rainbow trout at the bank | Red Fleet Reservoir | Golden | Summer | **fishing/fishing-red-fleet-reservoir** → `redfleet-rainbow-trout-bank.webp` | — | 3 | 4 |
| **FD3-P05** | Shoreline campsite | Red Fleet SP | Golden / dusk | Summer | **camping/camping-at-red-fleet-state-park** → `redfleet-shoreline-campsite.webp` | — | 2 | 3 |
| **FD3-P06** | Kids + fins on the swim beach / family trail | Red Fleet SP | Midday / golden | Summer | **hiking/family-hiking-near-vernal** → `redfleet-family-beach-trail.webp` | 2-day-family-itinerary | 2 | 3 |
| **FD3-P07** | Steinaker evening shoreline cast + town glow | Steinaker SP | Dusk | Summer | **guides/ultimate-guide-to-steinaker-state-park** → `steinaker-shoreline-dusk.webp` | — | 2 | 3 |
| **FD3-P08** | Steinaker stocked rainbow | Steinaker Reservoir | Golden | Summer | **fishing/fishing-steinaker-reservoir** → `steinaker-stocked-rainbow.webp` | — | 2 | 3 |
| **FD3-P09** | Steinaker campsite at dusk | Steinaker SP | Dusk | Summer | **camping/camping-at-steinaker-state-park** → `steinaker-campsite-dusk.webp` | — | 2 | 3 |

### FD4 — Ashley NF & High Uintas *(SUMMER-ONLY — window closes ~mid-Sept)*

| ID | Subject | Location | Best light | Season | Hero pages | Body pages | Comm. | SEO |
|---|---|---|---|---|---|---|:--:|:--:|
| **FD4-P01** | Alpine-lake dawn reflection, peaks doubled — **signature Uinta shot** | Photogenic basin lake, High Uintas | Dawn | **Summer only + calm** | **hiking/alpine-lakes-hiking-high-uintas** → `uintas-alpine-lake-reflection-dawn.webp`; **itineraries/3-day-adventure-itinerary** → `uintas-signature-reflection.webp` | camping-ashley | 3 | 5 |
| **FD4-P02** | Kings Peak boulder ridge + summit panorama | Kings Peak (backpack-in) | Day | **Summer only** | **hiking/kings-peak-hiking-guide** → `uintas-kings-peak-ridge.webp` | high-uintas-backpacking | 2 | 4 |
| **FD4-P03** | Wildflower meadow under a granite ridge | Ashley NF | Golden / day | **Summer bloom** | **hiking/wildflower-hiking-near-vernal** → `uintas-wildflower-meadow.webp` | summer-hiking | 2 | 4 |
| **FD4-P04** | Drive-up lake, family framing | Ashley NF | Day | Summer | **hiking/high-uintas-day-hikes** → `uintas-drive-up-lake.webp` | family-hiking | 2 | 3 |
| **FD4-P05** | Loaded pack in tundra | High Uintas | Day | Summer | **hiking/high-uintas-backpacking-guide** → `uintas-loaded-pack-tundra.webp` | kings-peak | 2 | 3 |
| **FD4-P06** | Basin camp at dawn | Ashley NF | Dawn | Summer | **camping/camping-in-ashley-national-forest** → `uintas-basin-camp-dawn.webp` | 3-day-itinerary | 2 | 3 |
| **FD4-P07** | Summer alpine basin (general) | Ashley NF | Day | Summer | **hiking/summer-hiking-near-vernal** → `uintas-alpine-basin-summer.webp` | — | 2 | 3 |
| **FD4-P08** | Milky Way over a high camp | High Uintas | Night, **new moon** | **Summer new moon** | — | alpine-lakes, 3-day-itinerary, camping-ashley | 2 | 4 |
| **FD4-P09** | Moose in willows / marmot / bighorn (long lens) | Ashley NF / DNM | Dawn / dusk | Summer | **hiking/wildlife-hiking-guide-near-vernal** → `wildlife-moose-willows.webp`; **hiking/bird-watching-near-vernal** → `wildlife-bird-longlens.webp` *(both opportunistic — not guaranteed)* | — | 1 | 3 |

### FD5 — Flaming Gorge *(spring–fall; shoot water early before north wind)*

| ID | Subject | Location | Best light | Season | Hero pages | Body pages | Comm. | SEO |
|---|---|---|---|---|---|---|:--:|:--:|
| **FD5-P01** | Red Canyon Overlook (red cliffs → blue-green water) | Red Canyon, Flaming Gorge | Golden hour | Spring–Fall | **guides/ultimate-guide-to-flaming-gorge** → `gorge-red-canyon-overlook-goldenhour.webp`; **itineraries/weekend-fishing-trip-vernal** → same | camping-flaming-gorge | 3 | 5 |
| **FD5-P02** | Held trophy lake trout/brown over water, red wall | Flaming Gorge | Golden | Summer | **fishing/fishing-flaming-gorge** → `gorge-trophy-lake-trout.webp` | — | 3 | 4 |
| **FD5-P03** | Green River gin-clear water over trout + drift boat | Green River below dam | Midday | Summer | **fishing/green-river-fly-fishing** → `gorge-green-river-clearwater-trout.webp` | — | 2 | 4 |
| **FD5-P04** | Shoreline campsite | Flaming Gorge | Golden / dusk | Summer | **camping/camping-at-flaming-gorge** → `gorge-shoreline-campsite.webp` | — | 2 | 3 |
| **FD5-P05** | Dam + tailwater start / Dowd Mountain panorama | Flaming Gorge | Day | Spring–Fall | — | flaming-gorge guide, green-river | 2 | 3 |
| **FD5-P06** | Milky Way over Red Canyon | Red Canyon | Night, **new moon** | Summer new moon | — | flaming-gorge guide, camping-flaming-gorge | 2 | 4 |

### FD6 — Scenic Drives *(FALL for aspen — ~2-week peak, late Sep–mid Oct)*

| ID | Subject | Location | Best light | Season | Hero pages | Body pages | Comm. | SEO |
|---|---|---|---|---|---|---|:--:|:--:|
| **FD6-P01** | Sheep Creek tilted/folded strata, raking side light | Sheep Creek Geological Loop | Raking side | Summer / Fall | **scenic-drives/sheep-creek-geological-loop** → `scenic-sheep-creek-folds-rakinglight.webp` | flaming-gorge-byway | 2 | 4 |
| **FD6-P02** | Red Cloud Loop aspen gold vs evergreen | Red Cloud Loop | Day / golden | **FALL peak only** | **scenic-drives/red-cloud-loop-scenic-drive** → `scenic-redcloud-aspen-gold.webp`; **hiking/fall-hiking-near-vernal** → same | — | 2 | 4 |
| **FD6-P03** | "Drive Through the Ages" sign → rock-layer sequence | Flaming Gorge byway | Overcast OK | Any | — | flaming-gorge-byway, sheep-creek | 1 | 3 |
| **FD6-P04** | Greendale Y junction / pavement→gravel transition | Uintas byway | Day | Any | **scenic-drives/flaming-gorge-uintas-scenic-byway** → `scenic-byway-greendale-y.webp` | red-cloud-loop | 2 | 3 |

\* `utv/` pillar and `about.astro` are `.astro` pages (no `heroImage` field) — a separate cornerstone pass, not a frontmatter swap (M9.3 §7). Frames still shot on FD1 because they feed body slots and social.

**Not in this manifest (no photograph exists to shoot):** the 3 route-map itineraries (`weekend-road-trip-from-salt-lake-city / -denver / -grand-junction`) need **desk cartography**, and `spring-hiking` / `winter-hiking` need **dedicated off-plan seasonal passes** (not FD1–6). See M9.3 §5.2.

---

## 2. Video Inventory — required video

| ID | YouTube title | Shorts (9:16) opportunities | Supporting pages | Commercial purpose |
|---|---|---|---|---|
| **FD1-V01** | *Vernal UTV Tour — Five Trails in One Day* (60–90 s highlight reel) | "$349 for two riders vs Moab's $597"; fleet walk-around; kid ride-along reaction | **booking.astro** (hero video), `utv/` pillar + spokes | **The conversion asset** — chest-mount POV + fleet; drives `/booking/` starts |
| **FD1-V02** | *Best UTV Trails Near Vernal, Utah* (b-roll bin) | Dave narrating outlaw history at a stop | best-utv-trails, backcountry-tours | Trail authority; top-of-funnel discovery |
| **FD1-V03** | *Meet Your Guides — Dave & Trudy* (owner-intro film) | — | **about.astro** (replaces the six stock embeds, M6.1 §6) | First-party EEAT; replaces generic destination stock |
| **FD2-V01** | *Reading Fremont Rock Art* | "find the lizard petroglyph" | petroglyphs, photography-hikes-near-vernal | Topical authority (rock art); non-specific locations |
| **FD2-V02** | *Who Was Josie Morris?* | "who was Josie Morris?" | visiting-DNM, cub-creek-road-tour | DNM history depth |
| **FD2-V03** | *Touch a 149-Million-Year-Old Bone* (Quarry walkthrough) | "touch a 149-million-year-old bone" | one-day-adventure-vernal, best-hikes-DNM | Weather-proof marquee; family draw |
| **FD3-V01** | *Paddle to a Dinosaur Trackway From Your Campsite* | "footprints you can paddle to"; "catch a fish, then stand in dinosaur tracks" | red-fleet guide, camping-red-fleet, fishing-red-fleet | Signature "only-here" story; drives park-cluster traffic |
| **FD4-V01** | *6 Types of High Uintas Day Hikes* | "Utah's highest point is NOT a day hike"; marmot whistle; Milky-Way time-lapse; "cold nights in July" | high-uintas-day-hikes, alpine-lakes, wildflower-hiking | High-country authority; summer capture |
| **FD4-V02** | *Is Kings Peak Right for You?* / *Planning Your First Overnight* (w/ Dave) | Kings Peak scale; loaded-pack tips | kings-peak, high-uintas-backpacking | Firsthand-authority proof (Experience) |
| **FD5-V01** | *How to Fish Flaming Gorge for the First Time* (w/ Dave) | "the overlook most people miss (Dowd Mountain)"; "why the Green River is so clear" | fishing-flaming-gorge, green-river-fly-fishing, weekend-fishing-trip | Fishing authority; converts trip-planners |
| **FD6-V01** | *Drive Through the Ages* / *How the Uinta Fault Tilted Sheep Creek's Rocks* | "which way at the Greendale Y"; "rock standing on end"; elk bugling | sheep-creek, flaming-gorge-byway, red-cloud-loop | Scenic-drive authority; fall-color draw |

**Placement rule (frozen architecture):** video → **YouTube** (unlisted → public per cadence), embedded by ID; **never** a raw file in the repo. Each field day targets **≥1 long-form + ≥4 Shorts** (playbook §6).

---

## 3. Drone Plan — repository-documented restrictions only

Rules taken **verbatim** from the playbook's standing field rules (§0) and per-day notes. Per repo docs, **no parcel is unconditionally "allowed"** — every legal flight requires the managing agency's *current* rule to permit it **and** carrying **printed written authorization**. `VERIFY WITH OFFICIAL SOURCE` per date.

| Field day / parcel | Status | Rule (repo-documented) |
|---|---|---|
| **FD2 — Dinosaur National Monument** | 🚫 **NEVER FLY** | NPS land — no launch/landing/operation. Get Split Mountain scale from overlooks + long lens. |
| **FD4 — High Uintas Wilderness** | 🚫 **NEVER FLY** | Designated Wilderness — no drones, ever. |
| **FD1 — Asphalt Ridge / UTV staging** | ⚠️ **RESTRICTED** | BLM/trail land + FAA rules — **verify per staging area**; if cleared: 8-machine convoy in a canyon + Asphalt Ridge reveal. Else ground-only. |
| **FD3 — Red Fleet / Steinaker State Parks** | ⚠️ **RESTRICTED** | Utah State Parks rules — **verify**; if allowed: fins + paddle-route reveal over glass water. |
| **FD4 — Ashley NF non-Wilderness** | ⚠️ **RESTRICTED** | Permitted **only** on non-Wilderness Forest land with current authorization — verify the exact parcel; **never** cross into Wilderness. |
| **FD5 — Flaming Gorge NRA / Ashley NF** | ⚠️ **RESTRICTED** | NRA/NF rules — **verify**; if cleared: Red Canyon rim reveal + dam orbit; never over Wilderness. |
| **FD6 — Ashley NF non-Wilderness** | ⚠️ **RESTRICTED** | NF non-Wilderness only, verified — Sheep Creek fold from above; Red Cloud aspen stands. |

**Carry, every flight day:** drone + **printed current authorization** for the specific parcel + spare props. No written confirmation = no flight (playbook §0, non-negotiable).

---

## 4. Daily Capture Checklists

Each day is a **window, not a fixed date** (calendar anchored to mid-July 2026). Sequence targets by light; every day carries a weather backup.

### FD1 — Downtown Vernal & UTV Trails *(any weather)*
- **Sunrise / early AM (garage + staging):** FD1-P04 cockpit + FOX shock · FD1-P05 safety briefing · FD1-P02 child-in-cage · FD1-P06 provided-gear rider · FD1-P07 kit flat-lay.
- **Midday (ride out):** FD1-V01 chest-mount POV b-roll · FD1-P03 Dave & Trudy guiding · guests dusty & happy.
- **Afternoon (town):** FD1-P08 Main St dino sculptures · Field House garden · FD1-P10 restaurant storefronts + dishes.
- **Sunset:** **FD1-P01 Asphalt Ridge fleet** (the money shot) · FD1-P09 town establishing · highlight-reel closers.
- **Backup (rain/dust):** shift entirely to garage/cockpit/briefing + indoor Field House + Main St under cloud (all weather-proof); if a tour cancels, stage a fleet run with Dave/Trudy only.

### FD2 — Dinosaur National Monument *(~20 min E)*
- **Sunrise:** Quarry Exhibit Hall at opening — **FD2-P01 Wall of Bones + touch moment** (beats crowds).
- **Midday:** FD2-P04 Fossil Discovery bone in situ · FD2-P06 Josie Morris cabin · Quarry b-roll (FD2-V03).
- **Afternoon (low sun):** Cub Creek auto-tour — **FD2-P02 lizard panel** · FD2-P05 tilted rocks · FD2-P07 Split Mountain cut.
- **Sunset:** FD2-P03 McConkie Ranch panel on the Dry Fork drive back (low raking light).
- **Backup (rain):** Quarry interior is fully weather-proof — shoot it + the Field House; rock art *wants* overcast anyway.

### FD3 — Red Fleet + Steinaker *(~15 min / ~5–10 min N)*
- **Sunrise (glass water — the gate):** **FD3-P02 kayak crossing to the trackway** · **FD3-P01 trackway prints** (low raking) · **FD3-P03 fins + dawn reflection**.
- **Midday:** FD3-P06 kids + fins on the swim beach (family framing) · FD3-P04 Red Fleet rainbow at the bank.
- **Afternoon:** transit to Steinaker (5–10 min); scout shoreline; FD3-P08 Steinaker stocked rainbow.
- **Sunset:** **FD3-P07 Steinaker shoreline cast + town glow** · FD3-P09 campsite at dusk · FD3-P05 Red Fleet campsite.
- **Backup (wind ruins glass water):** switch to cross-bedding/geology detail + beach/family frames; **slip the reflection & paddle to the next calm dawn** — FD3 is *not* complete without them.

### FD4 — Ashley NF & High Uintas *(SUMMER-ONLY; verify snow/road/fire)*
- **Sunrise:** pre-dawn hike in → **FD4-P01 alpine-lake dawn reflection** (signature) · FD4-P06 basin camp at dawn.
- **Midday:** FD4-P03 wildflower meadow · FD4-P04 drive-up lake · FD4-P07 summer basin · (if backpacking) **FD4-P02 Kings Peak ridge** · FD4-P05 loaded pack.
- **Afternoon:** **be off exposed ridges by early afternoon** (near-daily storms) — shoot lower forest/meadow detail; FD4-P09 wildlife (long lens) opportunistic.
- **Sunset / night:** golden-hour ridge · **FD4-P08 Milky Way** from a high camp on the new-moon night.
- **Backup (smoke/haze or snow-blocked road):** drop grand vistas → intimate meadow/forest + the drive-up-lake family frame; if road closed, fall back to lower Ashley NF lakes.

### FD5 — Flaming Gorge *(~1 hr N; shoot water early)*
- **Sunrise:** Cedar Springs / Sheep Creek ramp — rig launching; FD5-P05 dam + tailwater start.
- **Midday:** **FD5-P03 Green River gin-clear water over a trout + drift boat** (sun penetrates the water) · Dowd Mountain panorama.
- **Afternoon:** FD5-P02 held trophy fish over water · scout Red Canyon.
- **Sunset:** **FD5-P01 Red Canyon Overlook golden hour** · FD5-P04 shoreline campsite · stay for **FD5-P06 Milky Way** (new moon).
- **Backup (wind/whitecaps):** shoot the sheltered tailwater + Little Hole riverside + the overlooks; storm at night → skip Milky Way, keep golden hour.

### FD6 — Scenic Drives *(FALL for color; verify seasonal closures)*
- **Sunrise:** **FD6-P01 Sheep Creek folds** in raking side light.
- **Midday:** FD6-P03 "Drive Through the Ages" sign → layer sequence · FD6-P04 Greendale Y / pavement→gravel transition.
- **Afternoon:** **FD6-P02 Red Cloud Loop aspen gold vs evergreen** (the fall-gated shot).
- **Sunset:** golden aspen stands · dusk elk in a meadow (rut).
- **Backup (early snow closes upper loop / overcast):** shoot the lower byway + Sheep Creek (lower elevation) and reschedule Red Cloud; "Drive Through the Ages" signs shoot fine flat.

---

## 5. Printable One-Page Packing Checklist

```
ADVENTURE TOURS VERNAL — FIELD CAPTURE PACKING LIST          FD__  DATE 20______

CAMERA & GLASS
□ Body ×2 (or body + phone backup)
□ Wide lens (canyon / Quarry interior / town)
□ Standard zoom
□ Telephoto (wildlife FD4/FD2, petroglyph detail without approach)
□ Fast prime (night sky FD4/FD5)

SUPPORT & MOTION
□ Tripod (dawn reflections, Milky Way, low-light interiors)
□ Intervalometer / time-lapse trigger
□ Chest / helmet mount (UTV POV — FD1)
□ Gimbal (walking b-roll)

DRONE  (ONLY on legally-cleared parcels — see Drone Plan)
□ Drone + spare props
□ PRINTED current authorization for THIS parcel   ← no paper, no flight
   NEVER FLY: DNM (FD2), High Uintas Wilderness (FD4)

POWER & STORAGE
□ Memory cards ×2+ (shoot RAW + in-camera JPEG)
□ Spare batteries (cold drains them — FD4)
□ Nightly backup drive / laptop (2 copies before any cull)

FILTERS & PROTECTION
□ ND + polarizer (water glare, midday)
□ Lens dust covers (FD1 dust)
□ Rain sleeve

FIELD KIT
□ Headlamp (FD4/FD5 pre-dawn + night)
□ Sun / heat kit + EXTRA WATER (FD1/FD2/FD4)
□ Warm layers (FD4 nights — cold even in July)
□ Field-note pad / phone app (dated caption capture, Dave/Trudy voice)
□ Model-release forms (guests / kids on camera)
□ Offline maps
□ Agency contacts (same-day status + drone verification)

BEFORE YOU LEAVE — VERIFY TODAY (VERIFY WITH OFFICIAL SOURCE)
□ Open hours / timed entry     □ Road & snow status     □ Fire / smoke
□ Water levels                 □ Drone rule for parcel  □ Permits
□ Frame every hero for a 1200×630 (1.91:1) crop — leave headroom
```

---

## 6. Risk Register

| Risk class | Specific risk | Field day(s) | Mitigation / replacement opportunity |
|---|---|---|---|
| **Seasonal** | **High-country window closes ~mid-Sept** — 8 pages + 3-day itinerary stranded to summer 2027 | FD4 | **Highest scheduling urgency**; shoot FD4 before FD5/FD6 even though it deploys later. Replacement: none until 2027 — do not miss it. |
| **Seasonal** | **Aspen peak is a ~2-week window** (late Sep–mid Oct) | FD6 | Watch the color report; shoot non-color byway/Sheep-Creek frames early, aspens on peak. Replacement: reschedule Red Cloud a year if missed. |
| **Seasonal** | Spring & winter hiking frames need dedicated passes (not FD1–6) | residual | Rolling seasonal shoots; pages stay on safe logo fallback until captured (M9.3 §5.2). |
| **Weather** | **Glass-calm dawn fails** — trackway/paddle/reflection unusable | FD3 | Hard gate: reschedule the reflection & paddle; shoot geology/beach detail meanwhile. FD3 incomplete without the calm-dawn set. |
| **Weather** | Afternoon thunderstorms above treeline (near-daily) | FD4 | **Off exposed ridges by early afternoon** (safety = completion criterion); shoot forest/meadow detail instead. |
| **Weather** | North-end wind builds late morning (whitecaps) | FD5 | Shoot water early; fall back to sheltered tailwater / Little Hole + overlooks. |
| **Weather** | Rain/dust storm | FD1, FD2 | Both have fully weather-proof indoor pivots (garage/Field House; Quarry interior). Near-zero lost-day risk. |
| **Weather** | Fire-season smoke/haze kills grand vistas | FD4, FD5 | Drop reflections/overlooks → intimate meadow/forest + drive-up-lake family frame. |
| **Lighting** | Midday sun **flattens petroglyphs** | FD2 | Shoot panels early/late only (FD2-P02/P03 are sunrise/sunset-slotted). |
| **Lighting** | Milky Way needs a **new-moon** night | FD4, FD5 | Moon-gated: schedule night sessions on the new moon; else skip, keep golden hour. |
| **Lighting** | Midday flat light on Asphalt Ridge | FD1 | Ridge fleet reserved for **sunset** slot (FD1-P01); midday used for ride b-roll. |
| **Visitor congestion** | Quarry / Cub Creek crowds mid-day | FD2 | Shoot Wall of Bones **at opening**; Cub Creek panels early/late when tour traffic is thin. |
| **Visitor congestion** | Red Fleet swim beach busy mid-summer midday | FD3 | Trackway/reflection are **dawn** (empty); family-beach frame mid-day is *meant* to show life. |
| **Rights / ethics** | Rock-art / trackway coordinates or too-specific alt | FD2, FD3 | Strip/round EXIF GPS; non-specific `heroAlt` & captions; never chalk/touch/wet. |
| **Rights** | Missing model release (kids/guests) → frame unpublishable | FD1, FD3, FD5 | Collect releases **at capture** for FD1-P02/P06, FD3-P06, FD5-P02. |
| **Deployment** | New hero **>500 KB** fails the build gate | all | Compress ≤500 KB (sharp q≈78 precedent; temp-name-then-swap on Windows) **before** any frontmatter edit (Deployment-Workflow §4). |

**Replacement-opportunity summary:** FD1 & FD2 are near-immune (indoor pivots). FD3, FD4, FD5, FD6 each hinge on a natural gate (calm dawn / summer window / new moon / aspen peak) — for those, the "replacement" is **reschedule the gated frame**, never ship a weak substitute. The wildlife frames (FD4-P09) and beginner/dog-friendly hiking heroes are best-effort opportunistic and stay on the logo fallback until a genuine frame lands.

---

## Validation

Confirmed for this milestone (capture manifest — documentation only):

- ✅ **Documentation only** — the sole working-tree change is this file, `docs/M9_FIELD_ASSET_MANIFEST.md`.
- ✅ **No page edits** — no `.mdx`/`.astro` content or existing content modified.
- ✅ **No image edits** — no `heroImage`/`heroAlt` changed; nothing under `public/images/**` created or altered (every filename here is a *specification*).
- ✅ **No architecture changes** — no layout, routing, collection, schema, CSS, component, validator, navigation, JSON-LD, or build-pipeline file touched. The freeze holds.
- ✅ **No build run. No commit made.**
- ✅ **Parallel workstream untouched** — the modified `.mdx`/`.astro`/`.css` files in `git status` and the untracked companion `docs/M9_*` files were read for ground truth only; none were modified, staged, reverted, renamed, deleted, or committed.

*Document complete and internally reviewed. It is the field-usable master manifest — every required photo (with light/season/page mapping), every video, the repo-grounded drone plan, six per-day shot schedules, a printable packing list, and a risk register — staged for Dave & Trudy's capture window. It plans and specifies; it does not shoot, edit a page, alter an asset, or run a build.*
