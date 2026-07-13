# M5.1 — EEAT Implementation Roadmap

**Adventure Tours Vernal · Dinosaur Country**
Prepared: July 2026 · Companion to [`docs/M5_EEAT_MEDIA_AUDIT.md`](M5_EEAT_MEDIA_AUDIT.md)
Scope: **planning documentation only.** Architecture frozen — no code, content, MDX, schema, routing, component, or build changes were made producing this document.

This roadmap turns the M5.0 audit into an executable production plan. Its governing principle: **capture once, deploy many.** Every field day is designed to improve multiple pages, every video to support multiple articles, every map to be reusable across clusters. The goal is full-site original-media optimization with the **fewest possible field trips** — six field days plus a desk-only quick-win pass cover the entire library.

---

## Section 1 — Executive Summary

### Current strengths
- **Best-in-market written content.** ~60 indexable pages, each with Quick Answer, Key Takeaways, comparison tables, multi-question FAQ, dense internal linking, AEO summary blocks, and disciplined `VERIFY WITH OFFICIAL SOURCE` markers. Text authority is effectively complete.
- **Frozen, validated architecture.** Directory URLs, hub/spoke framework, JSON-LD, sitemaps, author system, and build-time validators are done and stable. Media can be added into a known-good structure.
- **An existing, under-used original-photo library.** Discovered during roadmap prep: `public/images/` already holds real, descriptively-named trail photography — Docs Beach (5+ frames), Moonshine Arch (3), Ashley Gorge / Taylor Mountain, Flintstone Canyon, Outlaw Trail, "Meet Your Guide Dave and Trudy," Family Friendly, Groups large and small, Sunset Rides, plus `wilson-family.webp`. The audit under-counted these because article frontmatter uniformly points to `logo.webp`. **This means several high-value pages can be upgraded with no new travel at all.**

### Biggest weaknesses
1. **Zero rendered original media in article bodies** — not one inline image across `src/content/**`; 56 of ~60 pages ship the logo as a metadata-only hero, so readers see no representative photograph.
2. **No custom maps** anywhere, on a site whose entire thesis is "Vernal is the hub of a wheel."
3. **The byline outruns the evidence** — pages are attributed to Dave but read as researched, not lived; no dated first-hand field notes or original photos back the authority the schema asserts.
4. **Third-party media on the EEAT anchor pages** — `about.astro`'s six embedded videos are generic destination clips, not Adventure Tours footage; the `moab` hero embed needs confirming as original.
5. **No data-visualization** — the weather guide has no climate charts; seasonal/geology pages have no diagrams.

### Highest-ROI opportunities (the five multipliers)
Ranked by pages-touched ÷ effort. These recur throughout the roadmap:
1. **The five-trail photo/video set + tour highlight reel** → fixes the entire UTV/commercial money-page cluster (much of it already partly shot — see §8).
2. **One regional hub-and-spoke map** → propagates to 25+ pages (guides, all itineraries, all hubs, things-to-do, gateways).
3. **Dave & Trudy guiding, on-camera** → the literal proof of first-hand authority, reusable across `about`, all UTV pages, and author profiles.
4. **The alpine-lake dawn reflection + High Uintas set** → the "signature Uinta shot" the copy repeatedly names; serves ~8 hiking/camping/fishing pages from one summer trip.
5. **Climate charts + elevation/geology diagrams** → desk-produced (dataviz skill), no travel, high authority + shareability.

### Estimated implementation order
1. **Weeks 1–2 — Quick wins (desk only).** Deploy the existing on-disk photo inventory as planned hero/body swaps; produce the map and graphics that need no travel; fix flagged hygiene items. *(All as a staged plan for the owner's next unfrozen editorial window — this document proposes; it does not edit.)*
2. **Weeks 3–8 — Field expeditions,** sequenced by season and reusability: town/trail core first (unblocks the money pages), then Red Fleet/Steinaker calm mornings, then the summer high-country trip, then scenic-drive fall color, then Flaming Gorge.
3. **Weeks 6–12 — Post-production,** rolling: hero swaps per cluster, video cut-downs (film once, cut many), author field-note captions, and the YouTube publishing cadence.

---

## Section 2 — Field Expeditions

Six field days cover the entire library. Each day is a self-contained shoot yielding stills + long-form video + Shorts offcuts + (where permitted) drone. **Verify (V) all access, closures, permits, and drone rules before each day** — several areas restrict drones (National Park Service land at DNM prohibits drone launch/landing; Wilderness areas prohibit drones; check BLM/Forest and any Flaming Gorge NRA rules).

> **Batching logic:** Days 1, 6, and the scenic-drive portion are shoulder-season/any-time and unblock the highest-value commercial pages, so they go first. Day 4 (high country) is summer-only. Day 5 (scenic drives) is best in fall for color. Days 2–3 (reservoirs/Gorge) want calm mornings, spring–fall.

### Day 1 — Dinosaur National Monument *(shoulder-season mornings; ~20 min Utah side, +2 hr Colorado side optional)*
**Capture targets:** Quarry Exhibit Hall / Wall of Bones interior; the touch-the-fossil spot; Fossil Discovery Trail bone in situ; Quarry Visitor Center exterior; Cub Creek auto-tour numbered stops; the Cub Creek lizard petroglyph panel (low raking light, respectful — no chalk/touch); Swelter Shelter panel; Josie Morris cabin (exterior in cottonwoods + interior stove); Split Mountain river cut; desert bighorn near Split Mountain; (Colorado side, if extending) Harpers Corner Green/Yampa confluence.
- **Photos:** Wall of Bones; fossil in situ; lizard panel; Josie cabin ext+int; Split Mountain; visitor-center exterior; bighorn.
- **Video:** Quarry walkthrough w/ touch-the-fossil moment; full Cub Creek POV keyed to numbered stops; "Who Was Josie Morris?" on location; "Reading Fremont Rock Art" at the lizard panel.
- **Drone (V — likely NOT permitted on NPS land):** treat DNM as ground-only; get Split Mountain / confluence scale via overlooks and a long lens instead. *Do not fly without written NPS authorization.*
- **Shorts:** "You can touch a 149-million-year-old bone"; "Find the lizard petroglyph"; "Who was Josie Morris?"
- **Pages served:** visiting-DNM, petroglyphs, best-hikes-DNM, DNM hub, attractions, kids, 2-day family, 3-day, one-day, photography-weekend, Vernal guide, Cub Creek drive.

### Day 2 — Red Fleet State Park *(calm spring–fall morning; ~15 min north)*
**Capture targets:** the fossilized dinosaur **trackway** prints in low-angle light (respectful, no chalk); a kayak/paddleboard crossing toward the trackway shoreline at dawn; the three tilted Navajo sandstone "ships" at golden hour; dawn mirror-reflection of the fins; kids on the swim beach with fins behind; a kid holding a bluegill at the shoreline; cross-bedding detail in the cliff; lakeside tent glowing at sunrise (if camping the night).
- **Photos:** trackway prints; paddle-to-tracks; the fins at golden hour; dawn reflection; kids + fins; panfish catch; cross-bedding.
- **Video:** "Paddle to a dinosaur trackway from your campsite"; family-weekend walkthrough; respectful trackway close-up with scale reference.
- **Drone (V — state-park rules):** fins + paddle-route reveal over calm water, if allowed.
- **Shorts:** "Footprints you can paddle to"; "Catch a fish, then stand in dinosaur tracks."
- **Pages served:** Red Fleet guide, camping-Red-Fleet, fishing-Red-Fleet, family-hiking, kids, attractions, 2-day family, weekend-fishing, photography-weekend.
- **Combine with:** Steinaker (5–10 min further) the same morning/evening — see Day 2b below.

### Day 2b — Steinaker State Park *(same trip as Day 2; ~5–10 min north)*
**Capture targets:** evening shoreline cast with the town glow (the "after-work" signature); dawn kayak on glass; dusk swim after the boats leave; a stocked rainbow at the bank; busy midday boat traffic (the "why mornings matter" contrast); mirror sunrise; lakeside campground at sunset.
- **Photos + Shorts** as above; **Video:** "The closest swim to Vernal — 10 minutes."
- **Pages served:** Steinaker guide, camping-Steinaker, fishing-Steinaker, family/beginner hiking, weekend-fishing.

### Day 3 — Flaming Gorge *(spring–fall; ~1 hr north — full day)*
**Capture targets:** Red Canyon Overlook at golden hour (red cliffs → blue-green water); Flaming Gorge Dam + the start of the Green River tailwater; Dowd Mountain panorama; Cedar Springs / Sheep Creek Bay boat ramp at dawn with a rig launching; a held lake trout/brown, wet, over the water with a red wall behind; the Green River's gin-clear water over a visible holding trout + a drift boat below the dam; Little Hole riverside trail; a near-shore tent at sunrise; Milky Way over Red Canyon (stay for night); (winter alt trip) an ice-fishing setup.
- **Photos:** Red Canyon Overlook; dam + tailwater; Dowd Mtn; ramp at dawn; trophy fish; clear-water trout; drift boat; night sky.
- **Video:** "How to Fish Flaming Gorge for the First Time" w/ Dave; float dam→Little Hole; "Camping the Gorge — choosing your zone."
- **Drone (V — Flaming Gorge NRA / Ashley NF rules):** Red Canyon rim reveal; dam orbit; Dowd Mtn — only where permitted (not over Wilderness).
- **Shorts:** "The overlook most people miss (Dowd Mountain)"; "Why the Green River is so clear."
- **Pages served:** Flaming Gorge guide, fishing-Flaming-Gorge, green-river-fly-fishing, fishing hub, camping-Flaming-Gorge, byway, scenic-drives hub, 3-day, weekend-fishing, photography-weekend.

### Day 4 — Ashley National Forest & High Uintas *(SUMMER ONLY — short July–Sept window; V snow-clear + road status)*
**Capture targets:** alpine-lake dawn reflection with peaks doubled (the signature Uinta shot); wildflower meadow beneath a granite ridge; Kings Peak boulder summit ridge + summit panorama; a basin camp (e.g. Dollar Lake-type) at dawn; a loaded backpacking kit in tundra; Milky Way from a high camp; moose in willows at long-lens distance; marmot on a boulder / pika in talus; a rough unpaved forest road (the access-reality shot); a tent by a south-slope lake; drive-up lake a short walk from the car (family framing).
- **Photos:** lake reflection; wildflower meadow; Kings Peak ridge + panorama; basin camp; loaded pack; Milky Way; moose; marmot/pika; forest road; drive-up lake.
- **Video:** "6 Types of High Uintas Day Hikes"; "Is Kings Peak Right for You?" (multi-day); "Planning Your First Overnight" w/ Dave; "Beating the Heat — hot Vernal to a cool trailhead."
- **Drone (V — NOT over High Uintas Wilderness; permitted only on non-Wilderness Forest land):** alpine-basin reveal where legal.
- **Shorts:** "Utah's highest point is NOT a day hike"; a marmot whistling; Milky-Way time-lapse; "Cold nights in July."
- **Pages served:** Ashley guide, camping-Ashley, alpine-lakes, day-hikes, backpacking, Kings Peak, summer-hiking, wildflower-hiking, wildlife-hiking, bird-watching, photography-hikes, 3-day, romantic, fishing hub (Uinta lakes).

### Day 5 — Scenic Drives *(FALL for Red Cloud/Ashley color; summer for the full byway; V seasonal closures)*
**Capture targets:** Sheep Creek tilted/folded strata in raking side light; the "Drive Through the Ages" interpretive-sign sequence matched to rock layers; the Greendale Y (US-191 / SR-44 junction); the 1965 Sheep Creek flash-flood memorial marker; Red Cloud Loop aspen gold vs evergreen; the pavement→gravel "you're in the backcountry now" frame; the desert→aspen→red-rock transition as a stacked sequence; a high reservoir at calm dawn; dusk/rut elk in a meadow.
- **Photos:** Sheep Creek folds; sign sequence; the Y; flood memorial; Red Cloud aspens; pavement/gravel transition; transition stack; reservoir dawn.
- **Video:** full byway climb dashcam time-lapse; "Drive Through the Ages — reading the rock layers"; "How the Uinta Fault Tilted Sheep Creek's Rocks"; Red Cloud fall-color drive.
- **Drone (V — Ashley NF non-Wilderness only):** Sheep Creek fold from above; Red Cloud aspen stands.
- **Shorts:** "Which way at the Greendale Y"; "Rock standing on end — how the fault did it"; elk bugling.
- **Pages served:** all 4 scenic-drive pages, scenic-drives hub, Flaming Gorge guide, Ashley guide, fall-hiking, 3-day, photography-weekend, Red Cloud-linked hiking pages.

### Day 6 — Downtown Vernal & the UTV Trails *(shoulder-season for rider comfort + trail light; the commercial core)*
**Capture targets (highest commercial value):** all five trail systems with a KRX for scale (Doc's Beach wash on the Green River, machine under Moonshine Arch, KRX dwarfed by Ashley Gorge walls, Outlaw Trail by a rock-art panel, Asphalt Ridge summit at golden hour); the tour highlight reel (POV chest-mount + drone); Dave & Trudy each on their own KRX leading a group; the 6-machine fleet lined up at the 1935 S 1500 E staging point; a child buckled in the roll cage beside a parent; Dave's pre-ride safety briefing; the KRX cockpit (auto shifter, power steering, roll cage) + FOX 2.5 PODIUM shock detail; Dave narrating outlaw history at a stop; Main Street dinosaur sculptures + the pink "Dinah" brontosaurus; Utah Field House Dinosaur Garden replicas; McConkie Ranch Fremont panels; restaurant storefronts (Swain's, Plaza Mexicana, 7-11 Ranch, La Cabaña) + a signature dish each; dusty post-ride guests eating.
- **Photos:** five-trail set; fleet at staging; child in cage; briefing; cockpit/shock; Dave narrating; Main St + Dinah; Field House; McConkie panel; restaurant storefronts + dishes.
- **Video:** "5 Trails, One Basin" long-form; per-trail POV (5 clips); owner-intro film for `about` (replaces stock embeds); "Rental vs Guided Tour"; "Is a UTV Tour Safe for Kids? A Parent's Walkthrough"; "Where We Send Our Guests to Eat."
- **Drone (V — BLM/trail land + FAA rules):** 8-machine convoy in a canyon; Asphalt Ridge reveal.
- **Shorts:** "$349 for two riders vs Moab's $597"; kid's ride-along reaction; "Rental vs guided in 30 seconds"; fleet walk-around.
- **Pages served:** all 4 UTV pages, atv-trails, jeep-trails, booking, about, moab, attractions, kids, best-restaurants, from/salt-lake-city, Vernal guide, every UTV CTA site-wide.

---

## Section 3 — Photo Shot List (master checklist)

Priority: **P1** = one of the Top-25 multipliers / money-page critical; **P2** = high cluster value; **P3** = nice-to-have. "Season" and "Time" are optimal windows. Many rows are **partially or fully covered by existing on-disk assets** (see §8) — flagged ✅(have) / ◻(partial).

| Location | Subject | Season | Time of day | Pages supported | Priority |
|---|---|---|---|---|---|
| UTV trails | Doc's Beach — KRX in Green-River wash | Spring/Fall | Golden hour | best-utv-trails, atv-trails, booking, moab, kids, weekend-fishing | P1 ✅(have) |
| UTV trails | Moonshine Arch — KRX under the span (scale) | Spring/Fall | Mid-morning | best-utv-trails, atv-trails, booking, moab, group | P1 ✅(have) |
| UTV trails | Ashley Gorge — KRX dwarfed by canyon walls | Spring/Fall | Midday (shade) | best-utv-trails, atv-trails, booking, moab, backcountry | P1 ✅(have) |
| UTV trails | Outlaw Trail — KRX by a rock-art panel | Spring/Fall | Low light | best-utv-trails, atv-trails, backcountry, petroglyphs, moab | P1 ◻(have trail, need panel+KRX) |
| UTV trails | Asphalt Ridge — fleet on ridgeline | Spring/Fall | Golden hour | best-utv-trails, atv-trails, booking, attractions | P1 |
| UTV staging | 6-machine KRX fleet lined up (1935 S 1500 E) | Any | Overcast/AM | rentals, group, booking, about | P1 |
| UTV | Dave & Trudy each on their own KRX, guiding | Spring/Fall | Golden hour | about, backcountry, all UTV, author pages | P1 ◻(have "Meet Your Guide") |
| UTV | Child buckled in the roll cage beside a parent | Any | Any | kids, family-hiking, 2-day family, group, booking | P1 |
| UTV | KRX cockpit + FOX 2.5 PODIUM shock detail | Any | Any | rentals, what-to-wear, atv-trails, booking | P2 |
| UTV | Dave's pre-ride safety briefing | Any | AM | rentals, kids, what-to-bring, what-to-wear | P2 |
| DNM (Quarry) | Wall of Bones interior + touch-the-fossil spot | Any | Any (indoor) | visiting-DNM, best-hikes-DNM, attractions, kids, 2-day | P1 |
| DNM (Cub Creek) | Lizard petroglyph panel (respectful) | Spring/Fall | Low raking light | petroglyphs, Cub Creek, DNM, best-hikes-DNM, photography | P1 |
| DNM (Cub Creek) | Josie Morris cabin (ext + int) | Spring/Fall | Morning | Cub Creek, visiting-DNM, best-hikes-DNM | P2 |
| DNM | Split Mountain river cut | Spring/Fall | Golden hour | visiting-DNM, best-hikes-DNM, Cub Creek | P2 |
| DNM | Quarry Visitor Center exterior | Any | Midday | visiting-DNM, DNM hub | P3 |
| DNM (CO side) | Harpers Corner Green/Yampa confluence | Summer | Golden hour | best-hikes-DNM, visiting-DNM, weekend-denver | P3 |
| Red Fleet | Dinosaur trackway prints (respectful, no chalk) | Spring/Fall | Low light | Red Fleet, camping-RF, fishing-RF, family, attractions | P1 |
| Red Fleet | Kayak crossing toward trackway shoreline | Spring/Fall | Dawn | Red Fleet, camping-RF, photography-weekend | P1 |
| Red Fleet | Tilted Navajo "ships" + dawn reflection | Spring/Fall | Golden hour/dawn | Red Fleet, camping-RF, fishing-RF, one-day | P2 |
| Red Fleet | Kids on swim beach with fins behind | Summer | Midday | kids, family-hiking, 2-day, attractions | P2 |
| Steinaker | Evening shoreline cast + town glow | Summer | Dusk | Steinaker, fishing-Steinaker, camping-Steinaker | P2 |
| Steinaker | Dawn kayak on glass | Spring/Fall | Dawn | Steinaker, camping-Steinaker | P3 |
| Flaming Gorge | Red Canyon Overlook (cliffs → water) | Spring/Fall | Golden hour | Flaming Gorge, byway, scenic hub, photography-weekend | P1 |
| Flaming Gorge | Held lake trout/brown over water + red wall | Spring/Fall | Any | fishing-FG, fishing hub, camping-FG, weekend-fishing | P1 |
| Green River | Gin-clear water over holding trout + drift boat | Summer | Midday | green-river-fly-fishing, fishing hub, FG guide | P1 |
| Flaming Gorge | Dam + tailwater start | Any | Morning | FG guide, green-river, byway | P2 |
| Flaming Gorge | Dowd Mountain panorama | Spring/Fall | Golden hour | FG guide, byway | P2 |
| Flaming Gorge | Milky Way over Red Canyon | Summer | Night (new moon) | camping-FG, photography-weekend, FG guide | P2 |
| Flaming Gorge | Cedar Springs ramp at dawn, rig launching | Summer | Dawn | fishing-FG, camping-FG | P3 |
| High Uintas | Alpine-lake dawn reflection (peaks doubled) | Summer | Dawn | alpine-lakes, day-hikes, Ashley, camping-Ashley, summer, photography | P1 |
| High Uintas | Kings Peak boulder ridge + summit panorama | Summer | Midday | Kings Peak, backpacking, Ashley | P1 |
| High Uintas | Wildflower meadow under granite ridge | Summer | Morning | wildflower, summer-hiking, day-hikes, Ashley | P2 |
| High Uintas | Milky Way from a high camp | Summer | Night (new moon) | photography-hikes, camping-Ashley, Kings Peak, romantic | P2 |
| High Uintas | Moose in willows (long lens) | Summer | Dawn/dusk | wildlife-hiking, camping-Ashley, Ashley | P2 |
| High Uintas | Marmot on boulder / pika in talus | Summer | Midday | wildlife-hiking, day-hikes | P3 |
| High Uintas | Backpacking kit / tent by south-slope lake | Summer | Dusk | backpacking, camping-Ashley | P3 |
| Scenic (Sheep Creek) | Tilted/folded strata in raking light | Summer/Fall | Side light AM/PM | Sheep Creek, FG guide, Ashley, photography-weekend | P1 |
| Scenic (byway) | "Drive Through the Ages" sign sequence | Any | Overcast | byway, FG guide, scenic hub | P2 |
| Scenic (Red Cloud) | Aspen gold vs evergreen | Fall | Golden hour | Red Cloud, fall-hiking, Ashley, 3-day, photography | P1 |
| Scenic (Sheep Creek) | 1965 flash-flood memorial marker | Summer/Fall | Any | Sheep Creek | P3 |
| Scenic (byway) | The Greendale Y (US-191/SR-44) | Any | Midday | byway | P3 |
| Downtown | Main Street dino sculptures + pink "Dinah" | Any | Golden hour | Vernal guide, attractions, from/SLC | P2 |
| Downtown | Utah Field House Dinosaur Garden replicas | Any | Midday | Vernal guide, attractions, kids, 2-day | P2 |
| Dry Fork | McConkie Ranch broad-shouldered Fremont panel | Spring/Fall | Low light | petroglyphs, Vernal guide, Red Cloud, attractions, photography | P1 |
| Downtown | Restaurant storefronts + a signature dish each | Any | Any | best-restaurants | P3 |
| Weather set | Four-season same-trail comparison frames | All 4 | Golden hour | vernal-weather-guide, seasonal hiking | P2 |

---

## Section 4 — Video Roadmap

Every video reuses the same footage captured on its field day (film once, cut many). Runtimes are targets.

### Evergreen (authority anchors)
| Working title | Runtime | Supporting pages |
|---|---|---|
| 5 UTV Trails, One Basin | 8–12 min | best-utv-trails, atv-trails, booking, moab, utv hub |
| The Ultimate Guide to Dinosaur National Monument | 10–14 min | visiting-DNM, DNM hub, best-hikes-DNM, attractions |
| How to Fish Flaming Gorge for the First Time | 10–12 min | fishing-FG, fishing hub, camping-FG, weekend-fishing |
| 6 Types of High Uintas Day Hikes — Which Is Right for You? | 8–10 min | day-hikes, alpine-lakes, beginner, hiking hub |
| Is Kings Peak Right for You? | 12–16 min | kings-peak, backpacking, Ashley |

### Commercial (conversion)
| Working title | Runtime | Supporting pages |
|---|---|---|
| Adventure Tours Vernal — Tour Highlight Reel | 60–90 sec | booking (hero), about, all UTV pages |
| Rental vs Guided Tour in Vernal — What You Actually Get | 3–5 min | rentals, booking, moab |
| Moab vs Vernal — An Honest UTV Comparison | 5–7 min | moab, best-utv-trails, booking |
| What a Group Tour Looks Like | 4–6 min | group, booking, attractions |
| Is a UTV Tour Safe for Kids? A Parent's Walkthrough | 4–6 min | kids, family-hiking, 2-day family, group |
| Meet Dave & Trudy — Why We Started Adventure Tours | 3–5 min | about (replaces stock embeds), author pages |

### Educational (History, No BS — brand pillar)
| Working title | Runtime | Supporting pages |
|---|---|---|
| Reading Fremont Rock Art | 6–9 min | petroglyphs, Cub Creek, DNM, best-hikes-DNM |
| Who Was Josie Morris? | 5–7 min | Cub Creek, visiting-DNM |
| Drive Through the Ages — Reading the Rock Layers | 6–8 min | byway, FG guide, scenic hub |
| How the Uinta Fault Tilted Sheep Creek's Rocks | 4–6 min | sheep-creek, Ashley, FG guide |
| The Butch Cassidy Connection | 5–7 min | backcountry, petroglyphs, atv-trails, Vernal guide |
| How to Photograph Rock Art Without Harming It | 3–5 min | photography-hikes, photography-weekend, petroglyphs |

### Planning (trip-planner support)
| Working title | Runtime | Supporting pages |
|---|---|---|
| Salt Lake City to Vernal — The Weekend Drive | 6–8 min | weekend-SLC, from/salt-lake-city, Vernal guide |
| 3-Day Arc: Desert to Alpine | 8–10 min | 3-day, itineraries hub, 2-day, one-day |
| A Family Weekend in Dinosaur Country | 8–10 min | 2-day family, family-hiking, kids, attractions |
| Camping the Gorge — Choosing Your Zone | 6–8 min | camping-FG, camping hub, FG guide |
| Photographing Dinosaur Country in a Weekend | 7–9 min | photography-weekend, photography-hikes, scenic hub |

### Shorts (discovery + offcut reuse)
| Working title | Runtime | Supporting pages |
|---|---|---|
| You can touch a 149-million-year-old bone | 20–40 sec | visiting-DNM, kids, attractions |
| Footprints you can paddle to | 20–40 sec | Red Fleet, camping-RF, fishing-RF |
| $349 for two riders vs Moab's $597 | 20–40 sec | moab, booking, rentals |
| The overlook most people miss (Dowd Mountain) | 20–40 sec | FG guide, byway |
| 40° swing before lunch | 20–40 sec | vernal-weather-guide, seasonal hiking |
| Snow on red rock | 20–40 sec | winter-hiking, photography-hikes |
| Milky Way over a Uinta lake (time-lapse) | 20–40 sec | photography-hikes, camping-Ashley, romantic |
| Utah's highest point is NOT a day hike | 20–40 sec | kings-peak, backpacking |
| Which way at the Greendale Y | 20–40 sec | byway, scenic hub |
| Rock standing on end — how the fault did it | 20–40 sec | sheep-creek, Ashley |
| Kid's ride-along reaction | 20–40 sec | kids, family-hiking, group |
| Rental vs guided in 30 seconds | 20–40 sec | rentals, booking |

**Cadence:** one Evergreen or Educational anchor per month; 2–4 Shorts/week cut from the same shoots; Planning + Seasonal pieces timed ~3–4 weeks ahead of each search window. **Film the Commercial reel + "5 Trails" first** — they unblock the money pages.

---

## Section 5 — Custom Map Roadmap

One cartographic system, styled consistently (brand palette, same base), rendered as reusable variants. Build the **Regional overview / hub-and-spoke first** — it is the base layer every other map derives from and touches the most pages.

| Map | What it shows | Pages that reuse it |
|---|---|---|
| **Regional overview / Vernal hub-and-spoke** (base) | Vernal center; DNM ~20 min, Red Fleet ~15, Steinaker ~5–10, McConkie ~15–20, Flaming Gorge ~1 hr, High Uintas; drive-time spokes | Vernal guide, ALL 10 hubs, ALL 9 itineraries, attractions, kids, from/salt-lake-city, weekend-SLC/Denver/GJ — **25+ pages** |
| **One-day planning** | Near-Vernal core (monument, reservoirs, UTV) separated from the "its own day" north half | one-day-adventure, 2-day family, itineraries hub |
| **Weekend / multi-day route diagram** | Day-by-day loop overlay on the hub-and-spoke (Day 1 monument, Day 2 backcountry+parks, Day 3 byway north) | 3-day, 2-day family, romantic, itineraries hub |
| **Gateway route maps** (3 variants) | SLC→Vernal (Heber/Duchesne/Roosevelt, fuel gaps); Denver→Dinosaur CO→Vernal (two sides of monument); GJ→Vernal (closest gateway) | weekend-SLC + from/SLC; weekend-denver; weekend-grand-junction |
| **Fishing waters** | Steinaker, Red Fleet, Flaming Gorge (w/ UT–WY line), Green River below the dam + drive times | fishing hub, weekend-fishing, all 4 fishing spokes, FG guide |
| **Scenic drives network** | Byway spine (US-191/SR-44), Sheep Creek loop, Red Cloud loop, Cub Creek — with the Greendale Y and seasonal-closure overlay | scenic-drives hub, all 4 drive pages, FG guide, Ashley guide |
| **UTV trail areas** | Five trail systems radiating from 1935 S 1500 E (departure points, not exact routes) + drive times | best-utv-trails, atv-trails, jeep-trails, booking, rentals, group, backcountry, moab, from/SLC |
| **Camping regions** | State-park (Red Fleet, Steinaker) vs Flaming Gorge vs Ashley NF developed/dispersed zones | camping hub, all 4 camping spokes, itineraries where-to-stay |
| **DNM orientation** | Both entrances, Quarry, Cub Creek, McKee Springs, Harpers Corner, Echo Park + Vernal times | visiting-DNM, DNM hub, best-hikes-DNM, Cub Creek, attractions |
| **Habitat / wildlife + birding overlay** | Elevation-banded habitats (river corridors, reservoirs, sage/cliff desert, Uinta meadows) | wildlife-hiking, bird-watching, wildflower, seasonal hiking |
| **"Where dogs are welcome" overlay** | DNM restrictive / state parks vary / Ashley NF more permissive, w/ standing verify caveat | dog-friendly-hiking |

**Reusability note:** the first map alone serves 25+ pages. All eleven derive from the same base geography, so producing the set is far cheaper than eleven independent maps. Rock-art location maps (petroglyphs, Cub Creek) must be deliberately **low-resolution / vague on remote coordinates** for site protection.

---

## Section 6 — Graphics Roadmap

Desk-produced — **no travel required.** Build charts/dataviz with the `dataviz` skill (validated palette, light+dark). Ordered by reach.

| Graphic | Type | Pages reused across |
|---|---|---|
| **Monthly climate charts** (temp band, precipitation, UV-by-elevation, daily-swing curve) | Data-viz | vernal-weather-guide, seasonal hiking (×4), itineraries |
| **Elevation "ladder" diagram** (desert → foothills → forest → alpine → Kings Peak 13,528 ft) | Diagram | spring/summer/fall/winter hiking, wildflower, Ashley, day-hikes, 3-day |
| **Regional hub-and-spoke infographic** (non-map version: drive-times as a spoke diagram) | Infographic | Vernal guide, itineraries, attractions |
| **5-trail comparison chart** (difficulty / terrain / scenery / best-for) | Comparison | best-utv-trails, atv-trails, booking, moab |
| **Self-guided rental vs guided tour** comparison | Comparison | rentals, booking, moab |
| **Fishing five-water matrix** (species / access / effort / group-fit) | Comparison | fishing hub, weekend-fishing, fishing spokes |
| **Trip-length + season planner grids** | Planner | itineraries hub, one/2/3-day, seasonal |
| **Packing / "what to bring" flat-lay + downloadable PDF checklist** | Packing guide | what-to-bring, what-to-wear, booking, itineraries |
| **Decision trees:** "which trail/hike/water/lake is right for you"; "is Kings Peak right for you"; one-day "two anchors is the ceiling" | Decision tree | best-utv-trails, day-hikes, alpine-lakes, kings-peak, one-day, beginner |
| **Geology diagrams:** Uinta-uplift fault cross-section; "tilted then sliced" (Cub Creek); tailwater cross-section (Green River); layer-cake vs upended | Diagram | sheep-creek, Cub Creek, green-river, byway, FG guide |
| **Seasonal planners:** bloom-uphill / color-downhill; fall-color-by-elevation; high-country open/close window | Seasonal chart | wildflower, fall/spring hiking, Ashley, Red Cloud |
| **Safety cards:** rock-art etiquette (ARPA); trackway do/don't; heat-stress signs; ground-temp dog test; afternoon-storm timeline | Icon card | petroglyphs, Cub Creek, Red Fleet, dog-friendly, summer-hiking |
| **Agency pet-rule comparison** (NPS strict → state parks vary → forest permissive) | Comparison | dog-friendly-hiking |
| **Deep-time timeline** (149M-yr dinosaurs / 1,000-yr Fremont / 100-yr Josie cabin) | Timeline | visiting-DNM, petroglyphs, Vernal guide |

---

## Section 7 — Author EEAT Plan (Dave & Trudy)

*Planning only — no bios or content changed here.* The objective: convert the Dave/Trudy byline from a claim into visible, dated, first-hand proof, so that `VERIFY WITH OFFICIAL SOURCE` reads as "we've been here, and here is the current official source" rather than as second-hand research.

**Components:**
1. **Field notes (dated, generally located).** A short first-person note attached to one original photo per priority page — e.g. Flaming Gorge: "Best launch window is before the north-end wind builds — we're usually on the water by 7 (Dave, Sept 2026)." Red Cloud: "The loop typically opens late spring; we watch for the last snow on the upper stretch." Kept general on remote/sensitive sites (rock art).
2. **Original observations replacing hedges.** Wherever copy currently hedges ("generally," "is known for") and Dave/Trudy actually know the specifics from experience, plan a first-hand line beside the existing verify marker (not replacing it) — e.g. which coves at Red Fleet warm first, which Uinta passes hold snow latest.
3. **Dated visit stamps.** Plan a lightweight "last visited / last verified" convention for the highest-traffic pages so freshness is visible and honest. (Implementation is a future editorial task — the roadmap only proposes the pattern.)
4. **Behind-the-scenes photography.** From Day 6 especially: Dave giving the safety briefing, Dave narrating outlaw history at a stop, Trudy leading a family group, the fleet prep — human, candid frames that prove real people run real tours. `wilson-family.webp` and "Meet Your Guide Dave and Trudy" already exist and can seed this immediately.
5. **Author update cadence.** Propose a **quarterly refresh**: each quarter, add/refresh field notes on the cluster shot that season (Q3 high country, Q4 fall drives, etc.), publish that quarter's videos, and update "last verified" stamps. This keeps the author entity active without a rewrite treadmill.

**Sequencing:** field notes ride along with each cluster's hero-swap (post-production of the relevant field day), so author EEAT strengthens page-by-page as media lands rather than as a separate project.

---

## Section 8 — Quick Wins (no additional travel)

These are deployable from the desk in Weeks 1–2, **as a staged plan for the owner's next unfrozen editorial window.** This document proposes them; it does not edit any file.

### QW-1 — Deploy the EXISTING original-photo inventory (biggest quick win)
`public/images/` already holds real, descriptively-named trail photography the audit missed (frontmatter uniformly points to `logo.webp`). These can replace logo heroes / seed body images with **zero new travel**:

| Existing asset(s) on disk | Proposed use |
|---|---|
| `Docs Beach.webp` (+ `Docs Beach 1–5`, `Twin Caves Docs Beach`, `Scotty Docs Beach`, `Docs Beach Groups…`) | Hero/body for best-utv-trails, atv-trails, Doc's Beach references, family/kids |
| `Moonshine Arch.webp` (+ `Moonshine Arch 1–2`) | Hero/body for best-utv-trails, atv-trails, moab, group |
| `Ashley Gorge Taylor Mountain…` (5+ frames + overlooks) | Ashley Gorge trail visuals, backcountry, Ashley references |
| `Flintstone Canyon…` (5+ frames + overlooks) | Additional backcountry/trail visuals (a trail not yet named in copy — potential future spoke) |
| `Outlaw Trail.webp` | backcountry, atv-trails, petroglyphs cross-use |
| `Meet Your Guide Dave and Trudy.webp/.jpg`, `wilson-family.webp` | about, author pages, backcountry guide-authority section, group |
| `Family Friendly.webp/1`, `Groups large and small…` | kids, family-hiking, group, 2-day family |
| `Sunset Rides.webp`, `Beautiful Sunset.webp`, `We are committed even when the weather disagrees.webp` | weather guide, romantic, atmosphere/hero use |
| `Dinosaur National Monument Nearby.webp` | DNM-adjacent references, attractions |
| `Some of the cast from Skinwalker Ranch.webp` | social-proof / notable-guests angle (verify usage rights + permission) |

**Action:** produce a per-page hero/body mapping from this inventory; queue as content edits for the editorial window. **Note the guardrail:** these belong in `src/` and should render through `astro:assets` per the image-architecture decision; heroes must still pass the ≤500 KB webp/avif validator gate (compress large frames first, as was done for `20.webp`).

### QW-2 — Fix stale "forthcoming" references
`wildlife-hiking-guide` calls bird-watching and photography "future spokes" that now exist; `alpine-lakes` references a forthcoming backpacking guide that now exists. Plan to convert these to live internal links.

### QW-3 — Correct the two mislabeled UTV CTA links
`visiting-dinosaur-national-monument.mdx`: "guided UTV tour" anchor → currently `/dinosaur-national-monument/`, should be `/utv/` or `/booking/`. `petroglyphs-rock-art-vernal.mdx`: "guided UTV trail tours" → currently bare `/`, should be `/utv/`.

### QW-4 — Add missing FAQ + author to `what-to-bring`
The only guide with neither an FAQ block nor an `author` field. Plan an FAQ (from existing on-page content) + `author: dave` to match siblings.

### QW-5 — Sibling UTV cross-linking + in-body booking CTAs
best-trails, rentals, group, backcountry largely don't link to each other and several lack an in-body `/booking/` button (only a phone number in FAQ/summary). Plan a non-salesy internal-link + CTA pass.

### QW-6 — Desk-produced graphics (Section 6)
The climate charts, elevation ladders, comparison/decision graphics, and the downloadable packing checklist need no travel — start them in Week 1.

### QW-7 — The base regional map (Section 5)
The hub-and-spoke map is desk cartography from public geography — producible immediately and unblocks 25+ pages.

### QW-8 — Verify/replace third-party media
Confirm whether `about.astro`'s six embeds and the `moab` hero are original; if not, flag for replacement with Day-6 footage. Confirm the restaurant "Show to Server" discount codes are honored (trust risk). Surface the real 5.0★/82-review social proof on-page.

---

## Section 9 — 90-Day Implementation Plan

Sequenced for **maximum SEO impact with minimum duplicated effort**: desk quick wins and the base map first (unblock everything), then the field days that fix the money pages, then seasonal-dependent trips, with post-production rolling behind each shoot.

| Week | Focus | Key outputs |
|---|---|---|
| **1** | Quick wins kickoff (desk) | Inventory→page mapping (QW-1); start climate charts + elevation ladder + 5-trail/rental comparison graphics; draft the base **hub-and-spoke map** |
| **2** | Quick wins finish (desk) | Base map done; first graphics set done; queue QW-2/3/4/5 as an editorial change-list; downloadable packing checklist; verify third-party media (QW-8) |
| **3** | **Field Day 6 — Town & UTV trails** (the money core) | Five-trail set, fleet, child-in-cage, briefing, cockpit, Dave narrating, Main St, Field House, McConkie, restaurants; tour-reel + "5 Trails" footage |
| **4** | Post-production wave 1 (commercial) | Cut the **tour highlight reel**, "5 Trails, One Basin," "Rental vs Guided," owner-intro film; UTV-cluster hero swaps from Day-6 + QW-1; UTV trail map + trail comparison graphic finalized |
| **5** | **Field Day 1 — DNM** + **Day 2/2b — Red Fleet & Steinaker** (calm mornings) | Wall of Bones, lizard panel, Josie cabin, Split Mtn; trackway + paddle, fins, kids; DNM orientation + fishing-waters maps |
| **6** | Post-production wave 2 (DNM + reservoirs) | DNM/Red Fleet/Steinaker hero swaps; "Ultimate Guide to DNM," "Reading Fremont Rock Art," "Footprints you can paddle to"; deep-time timeline + trackway safety cards; add author field notes to these clusters |
| **7** | **Field Day 4 — High Uintas** (summer window) | Alpine-lake reflection, Kings Peak, wildflowers, Milky Way, moose, drive-up lakes; habitat/wildlife map overlay |
| **8** | Post-production wave 3 (high country) | Hiking/camping/alpine hero swaps; "6 Types of Day Hikes," "Is Kings Peak Right for You?"; bloom/season planners; camping-regions map; author field notes |
| **9** | **Field Day 3 — Flaming Gorge** (fishing + dark sky) | Red Canyon Overlook, dam/tailwater, trophy fish, Green River clear-water, night sky |
| **10** | Post-production wave 4 (Gorge/fishing) | Fishing/FG/camping-FG hero swaps; "How to Fish Flaming Gorge," "Camping the Gorge"; fishing-waters map finalized; tailwater/geology diagrams |
| **11** | **Field Day 5 — Scenic Drives** (fall color) | Sheep Creek folds, "Drive Through the Ages" signs, Red Cloud aspens, transitions; scenic-drives network map |
| **12** | Post-production wave 5 + review | Scenic-drive hero swaps; "Drive Through the Ages," "Uinta Fault" videos; hub cornerstone hero + map pass; publish-cadence calendar; end-of-quarter author refresh; measure (Section 10 metrics) |

**Notes:** Weeks 3–4 front-load the commercial return (money pages) before anything else. Season forces order (Day 4 summer, Day 5 fall) — if the 90 days start off-season for a given trip, slot that shoot to its window and pull a later desk/quick-win task forward to fill the gap. Post-production always trails its shoot by one week so footage is fresh and Shorts are cut while editing.

---

## Section 10 — Final Recommendations

### The first five actions
1. **Map the existing photo inventory to pages (QW-1)** and queue the hero/body swaps — the fastest possible EEAT gain, zero travel.
2. **Produce the base hub-and-spoke map (QW-7)** — one desk asset that unblocks 25+ pages.
3. **Shoot Field Day 6 (town + UTV trails)** — the commercial core; unblocks booking/about and every UTV CTA.
4. **Cut the tour highlight reel + "5 Trails, One Basin"** — the highest-conversion video assets; replace `about`'s stock embeds.
5. **Start the climate charts + core comparison/decision graphics (Section 6)** in parallel — desk work that lifts the weather guide and UTV pages immediately.

### Expected impact
- **Commercial:** original trail media + tour reel + fleet/child-safety shots on the money pages should lift booking-intent conversion and reduce the "is this legit / is it safe for kids" objection that text can't fully answer.
- **SEO / EEAT:** first-hand photos + dated field notes convert the byline to demonstrable Experience; the hub-and-spoke and route maps add unique, dwell-time-boosting assets competitors and AI can't replicate; climate charts and rock-art/geology media create link-worthy, shareable originals.
- **Efficiency:** six field days + a desk pass cover ~60 pages because every asset is deployed across a cluster.

### Dependencies
- **Owner availability** for Day-6 tour footage and on-camera segments (Dave & Trudy are irreplaceable in the highest-value assets).
- **A future unfrozen editorial window** to apply the queued hero/body swaps, link fixes, and FAQ/author additions — this roadmap stages them; it does not apply them (architecture/content frozen).
- **Season** gates Days 4 (summer) and 5 (fall).
- **Access/permits** — DNM/Wilderness drone prohibitions; state-park and NRA rules; rock-art site protection (deliberately vague maps).
- **Validator gate** — new heroes must be ≤500 KB webp/avif and render through `astro:assets` per the frozen image architecture.

### Risks
- **Drone restrictions** on NPS/Wilderness land — plan ground/overlook alternatives; never fly without authorization.
- **Rock-art exposure** — over-specific location media/maps invite vandalism; keep remote sites general.
- **Media weight regressions** — uncompressed originals could fail the validator or slow pages; compress on ingest.
- **Trust claims** — publishing restaurant coupons or "original" video that isn't genuine would damage EEAT; verify before amplifying (QW-8).
- **Scope creep into architecture** — all swaps are content/asset edits for the editorial window, not framework changes; keep the freeze.

### Success metrics
- **Coverage:** logo-hero pages reduced from 56 → target ≤10; inline body images per priority page ≥1.
- **Media library:** all Top-25 audit assets captured; each of the 6 field days yields its planned stills + ≥1 long-form + ≥4 Shorts.
- **Author EEAT:** dated field notes + "last verified" on all High-priority pages; author entity refreshed quarterly.
- **Engagement/SEO:** improved dwell time and reduced bounce on map/photo-upgraded pages; ranking/impression gains on target clusters (Search Console) for the pages that received media; growth in indexed original images.
- **Commercial:** measurable lift in `/booking/` starts and completed bookings attributable to the media-upgraded UTV pages and the tour reel.

---

*Roadmap complete and internally reviewed. This document is the only change to the working tree. No architecture, content, MDX, schema, routing, or component was modified; no build was run; no commit was made.*
