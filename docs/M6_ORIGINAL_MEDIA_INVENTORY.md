# M6.1 — Original Media Inventory & Deployment Log

**Adventure Tours Vernal · Dinosaur Country**
Prepared: July 2026 · Companion to [`docs/M5_EEAT_MEDIA_AUDIT.md`](M5_EEAT_MEDIA_AUDIT.md) and [`docs/M5_IMPLEMENTATION_ROADMAP.md`](M5_IMPLEMENTATION_ROADMAP.md)
Scope: **desk-only quick wins (QW-1/2/3).** No new field photography. No image files created. No architecture, layout, schema, component, CSS, validator, or build-pipeline changes.

This document records the M6.1 "EEAT Quick Wins" milestone: which existing original photographs were deployed as page hero metadata, which pages received them, and which pages still ship the placeholder/logo hero because no genuinely representative original exists on disk yet.

---

## 1. Method & guardrails

- **Only pre-existing assets** in `public/images/` were used. No file was created, copied, renamed, compressed, or fabricated.
- **Every candidate photo was opened and visually inspected** before assignment, so the `og:image`/JSON-LD hero and its alt text honestly describe what the picture shows. This caught two mislabels that were *avoided*:
  - `Docs Beach.webp` machines are **Polaris RZR** side-by-sides, not the branded Kawasaki KRX — alt text says "side-by-side UTVs," not "KRX."
  - `Outlaw Trail.webp` depicts **a child sliding down a rock crevice** (a family scramble scene), *not* a UTV touring shot — it was **rejected** as a backcountry-tours hero to avoid misrepresenting the page.
- **Validator gate respected:** every deployed hero is `.webp` and ≤ 500 KB (the `content.config.ts` zod gate), so no recompression was needed.
- **Filename spaces:** several originals contain spaces (e.g. `Docs Beach.webp`). This is an established, passing pattern in the repo — `src/pages/utv/index.astro` already uses `<img src="/images/Docs Beach 1.webp">` and `booking.astro` uses `url('/images/Docs Beach.webp')`. Heroes are metadata only (og:image + JSON-LD, never a rendered `<img>` per the frozen image architecture), and the post-build `validate-site` link check resolves these paths. No frozen code (`urls.ts`, `Seo.astro`) was touched.
- **Reuse is intentional and minimal:** each deployed hero is a distinct frame; no two pages share the same file.

---

## 2. Original images reused → pages that received them

All paths are under `public/images/`. Alt text is the new, location-specific `heroAlt` written for each page.

| Original asset (verified subject) | Page upgraded | Cluster |
|---|---|---|
| `Docs Beach.webp` — two side-by-sides on the sandy Doc's Beach trail below red-rock cliffs | `utv/best-utv-trails-vernal` | UTV |
| `Moonshine Arch.webp` — two side-by-sides on the backcountry trail beneath Moonshine Arch | `utv/backcountry-tours-vernal-utah` | UTV |
| `Groups large and small.webp` — an 11-person tour group with their UTV | `utv/group-utv-tours-vernal` | UTV |
| `Sunset Rides.webp` — two side-by-sides at a ridgetop overlook at vivid sunset | `utv/side-by-side-rentals-vernal-utah` | UTV |
| `Family Friendly.webp` — a family beside the branded Kawasaki KRX 1000 fleet on a beginner-friendly desert trail | `utv/beginners-guide-to-utv-tours-vernal` | UTV |
| `Dinosaur National Monument Nearby.webp` — a child beside a branded KRX and the giant roadside dinosaur statue in downtown Vernal | `things-to-do/fun-things-to-do-vernal-utah-kids` | Things-to-Do |
| `Docs Beach Groups large and small.webp` — a multi-generational family group with their guided UTV on a slickrock overlook | `itineraries/2-day-family-itinerary` | Itineraries |
| `Beautiful Sunset.webp` — a vivid sunset over the high-desert backcountry | `itineraries/romantic-weekend-dinosaur-country` | Itineraries |
| `We are committed even when the weather disagrees.webp` — the branded KRX fleet under a dramatic, cloudy sky in Vernal | `guides/vernal-weather-guide` | Guides |
| `Moonshine Arch 1.webp` — side-by-sides on the red-rock trail beneath Moonshine Arch | `guides/moab-utv-tours` | Guides |

**Total: 10 pages upgraded from `logo.webp` to a genuine, page-specific original photograph.**

---

## 3. Existing originals inspected but NOT deployed (and why)

| Asset | Verified content | Disposition |
|---|---|---|
| `Outlaw Trail.webp` | A child sliding down a narrow sandstone crevice (family scramble) | Rejected — does not depict a UTV tour; would misrepresent the backcountry-tours page. |
| `Family Friendly 1.webp` | Three kids in a brush/stick fort in the woods | Rejected — generic backyard-style scene; does not represent Vernal attractions or the tour product. |
| `Docs Beach 2.webp` | A red-rock butte with an American flag; no machine or landmark | Not used — scenic but non-specific; weaker than a logo-vs-product tradeoff for the pages considered. |
| `Moonshine Arch 2.webp` | A tour group posing under Moonshine Arch | Not used — group coverage already assigned; kept in reserve. |
| `Some of the cast from Skinwalker Ranch.webp` | Social-proof/notable-guests angle | Not used — deferred pending confirmation of usage rights/permission (per audit note). |

---

## 4. Pages still using placeholder/logo imagery (intentionally left unchanged)

These pages keep `heroImage: /images/logo.webp`. No genuinely representative original exists on disk; per the milestone rules, they were **left unchanged** and are recorded here for the future field-photography passes described in the M5 roadmap (§2 field days, §3 shot list).

### 4.1 Things-to-Do / gateway
- `things-to-do/vernal-utah-attractions` — a multi-attraction overview; no single existing original represents DNM + petroglyphs + parks + UTV together. (The strongest regional-attraction original, the Vernal dinosaur statue, was assigned to the kids page.) Needs the audit's "attractions cluster" shot.

### 4.2 Guides
- `guides/ultimate-guide-to-vernal-utah` — needs the regional hub-and-spoke map / town establishing shot.
- `guides/ultimate-guide-to-flaming-gorge` — needs Red Canyon Overlook (Field Day 3).
- `guides/ultimate-guide-to-ashley-national-forest` — needs alpine imagery (Field Day 4).
- `guides/ultimate-guide-to-red-fleet-state-park` — needs the trackway / "red fleet" fins (Field Day 2).
- `guides/ultimate-guide-to-steinaker-state-park` — needs reservoir/beach imagery (Field Day 2b).
- `guides/what-to-wear-utv-tour` — needs the correctly-dressed-rider / provided-gear shots (Field Day 6).
- `guides/what-to-bring` — needs the provided-kit flat-lay (Field Day 6).

### 4.3 Dinosaur National Monument
- `dinosaur-national-monument/visiting-dinosaur-national-monument` — **already has a real hero (`20.webp`)**; unchanged (not a logo page).
- `dinosaur-national-monument/petroglyphs-rock-art-vernal` — **already has a real hero (`20.webp`)**; unchanged (not a logo page).

### 4.4 Scenic Drives (all 4) — need Field Day 5 (fall color) + Field Day 1 (Cub Creek)
- `scenic-drives/flaming-gorge-uintas-scenic-byway`
- `scenic-drives/sheep-creek-geological-loop`
- `scenic-drives/red-cloud-loop-scenic-drive`
- `scenic-drives/cub-creek-road-tour-of-the-tilted-rocks`

### 4.5 Hiking (all 15) — need Field Day 4 (high country) + Day 1 (DNM) + seasonal passes
- `best-hikes-in-dinosaur-national-monument`, `kings-peak-hiking-guide`, `high-uintas-day-hikes`, `alpine-lakes-hiking-high-uintas`, `high-uintas-backpacking-guide`, `family-hiking-near-vernal`, `beginner-hiking-guide-near-vernal`, `dog-friendly-hiking-near-vernal`, `spring-hiking-near-vernal`, `summer-hiking-near-vernal`, `fall-hiking-near-vernal`, `winter-hiking-near-vernal`, `wildlife-hiking-guide-near-vernal`, `bird-watching-near-vernal`, `wildflower-hiking-near-vernal`, `photography-hikes-near-vernal`

### 4.6 Fishing (all 4) — need Field Day 3 (Gorge/Green River) + Day 2 (reservoirs)
- `fishing-flaming-gorge`, `green-river-fly-fishing`, `fishing-red-fleet-reservoir`, `fishing-steinaker-reservoir`

### 4.7 Camping (all 4) — need Field Days 2/3/4
- `camping-at-flaming-gorge`, `camping-in-ashley-national-forest`, `camping-at-red-fleet-state-park`, `camping-at-steinaker-state-park`

### 4.8 Itineraries (remaining) — need the itinerary/route maps (desk cartography, roadmap §5) or the relevant field shots
- `3-day-adventure-itinerary`, `one-day-adventure-vernal`, `weekend-road-trip-from-salt-lake-city`, `weekend-road-trip-from-denver`, `weekend-road-trip-from-grand-junction`, `weekend-fishing-trip-vernal`, `photography-weekend-vernal`

### 4.9 Hub / pillar cornerstone pages
- All hub index pages (`utv/`, `things-to-do/`, `dinosaur-national-monument/`, `guides/`, `fishing/`, `camping/`, `hiking/`, `scenic-drives/`, `itineraries/`) — these are `.astro` pillar pages, not collection spokes with a `heroImage` field; a per-hub representative hero + the regional map are a separate cornerstone pass (roadmap §3.10).

---

## 5. Content-hygiene fixes completed (QW-2, QW-3)

| # | Fix | File | Change |
|---|---|---|---|
| 1 | Mislabeled UTV CTA link (F8/QW-3) | `dinosaur-national-monument/visiting-dinosaur-national-monument.mdx` | "guided UTV tour" anchor `/dinosaur-national-monument/` → `/utv/` |
| 2 | Mislabeled UTV CTA link (F8/QW-3) | `dinosaur-national-monument/petroglyphs-rock-art-vernal.mdx` | "guided UTV trail tours" anchor bare `/` → `/utv/` |
| 3 | Stale "future spoke" ref (F10/QW-2) | `hiking/wildlife-hiking-guide-near-vernal.mdx` | bird-watching mention → live link `/hiking/bird-watching-near-vernal/` |
| 4 | Stale "future spoke" ref (F10/QW-2) | `hiking/wildlife-hiking-guide-near-vernal.mdx` | photography-hikes mention → live link `/hiking/photography-hikes-near-vernal/` |
| 5 | Stale "forthcoming" ref (F10/QW-2) | `hiking/alpine-lakes-hiking-high-uintas.mdx` | "forthcoming backpacking guide" → live link `/hiking/high-uintas-backpacking-guide/` |

---

## 6. About page EEAT improvements (Task 3)

`src/pages/about.astro` — **content-only edits to the page body; no layout, CSS, component, or schema change.**

1. **Surfaced visible social proof.** Added a visible line in the hero surfacing the real 5.0★ / 82-Google-review rating (previously only in Person/TouristInformationCenter JSON-LD and the hidden AI-summary block) and the firsthand "personally guided by Dave & Trudy Wilson" signal. Strengthens the visible **Trust** signal.
2. **Added firsthand-exploration cross-links.** Added one sentence in the "Our Future" narrative linking into the firsthand guides the audit named — `/utv/backcountry-tours-vernal-utah/` and `/utv/best-utv-trails-vernal/` — connecting the founders' personal-exploration story to the tours they now lead. Emphasizes **Experience** and adds the internal links the audit recommended ("Add cross-links INTO the UTV trail/backcountry articles"). No facts were invented — both claims (guided backcountry tours; five trail systems) are already documented on the linked pages.

**Third-party media (six generic destination YouTube embeds + hero embed):** intentionally left in place. Per the roadmap (QW-8 / §Field Day 6 / video roadmap), replacing them requires **original Adventure Tours footage that does not yet exist** — it is a field/post-production task, not a no-new-media desk quick win. Removing the embeds outright would leave empty layout cells (a layout change, out of scope). The above additions shift the page's EEAT weight toward original, firsthand, first-party signals without a redesign.

---

## 7. Coverage summary

- **Logo-hero content pages before M6.1:** 54 (of the collection spokes; DNM's two already used `20.webp`).
- **Upgraded in M6.1:** 10.
- **Logo-hero content pages remaining:** 44 — every one blocked on original field photography or desk cartography per the M5 roadmap, and enumerated in §4 above.
- **Success-metric trajectory (roadmap §10):** logo-hero reduction target is ≤10; M6.1 is the first, no-travel installment against that target and clears the money-page UTV cluster + the highest-intent family/kids/weather/moab pages first.
