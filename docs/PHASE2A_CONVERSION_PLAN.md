# Phase 2A — Conversion Optimization Implementation Plan

**Adventure Tours Vernal · Dinosaur Country**
Prepared: July 2026 · Scope: **planning only.** Architecture is FROZEN; this document audits
every page and specifies conversion additions. It implements nothing — no code, content, MDX,
schema, routing, component, or build change was made producing it.

Companion to [`PHASE2_GROWTH_ROADMAP.md`](PHASE2_GROWTH_ROADMAP.md) (this is Milestone M1,
detailed to the page) and the M5/M6 media docs.

**Objective:** convert more of the *existing* audience into **UTV bookings, Best Western
referrals, and Adventure Pass users** — with no architecture change.

---

## 1. Baseline — what's already auto-injected (do not double-count)

Understanding the layout-injected conversion floor prevents recommending things that already
exist:

- **One `TourCta` booking block per page**, injected by the layout on every collection spoke,
  pillar, hub, city, author, and itinerary page (`SpokeLayout`, `PillarLayout`, `HubLayout`,
  `CityLayout`, `AuthorLayout`, `ItineraryLayout` all render
  [`components/content/TourCta.astro`](../src/components/content/TourCta.astro) → "Book Your
  Adventure" → `/booking/`, with live `$349/machine` pricing). **Guardrail: never render more
  than 2 TourCta per page** (component's own rule).
- **Footer "Book Now"** link → `/booking/` on every page.
- **Real, structured social proof already in config but rendered nowhere except one page:**
  `SITE.rating = { value: '5.0', count: '82' }` ([`config/site.ts`](../src/config/site.ts)).
  It feeds `SchemaTour` aggregateRating, but is only *visible* on `guides/moab-utv-tours`
  (the stat block + comparison row). **This is the single biggest quick win: a reusable visible
  trust badge that reads from `SITE.rating`.**
- **The Best Western partnership pattern already exists** as the `.lodging-callout` block in
  [`content/guides/moab-utv-tours.mdx`](../src/content/guides/moab-utv-tours.mdx) — "10% Off
  Lodging … mention *Adventure Tours*" with a `bestwesternvernal.com` link. It is the reusable
  exemplar; today it lives on only ~2 pages.

**What NO layout injects (the universal gaps):** Best Western partnership messaging, Adventure
Pass references, and visible review/social proof. These are the three things Phase 2A adds.

### The reusable "conversion kit" (build once, place many)

| Kit | What it is | Source to reuse | Never invent |
|---|---|---|---|
| **A — Trust badge** | "★ 5.0 · 82 Google reviews" chip near a CTA | `SITE.rating` (already exists) | the numbers — read from config; keep honest |
| **B — Lodging partner callout** | "10% off at Best Western Vernal — mention *Adventure Tours*" + link | `.lodging-callout` in `moab-utv-tours.mdx` | the discount — confirm it's still honored |
| **C — Contextual booking CTA** | an in-body text link / button to `/booking/` in relevant copy | `TourCta` / plain `/booking/` link | pricing — `SITE.pricing` renders it |
| **D — Adventure Pass callout** | a Pass entry point on high-intent pages | *(needs a destination URL — see Dependencies)* | the offer — confirm where Pass lives |

---

## 2. Site-wide findings (the three universal gaps, quantified)

Measured by in-body signal scan across all ~60 pages:

1. **Best Western partnership is on 3 pages only** — `index.astro`, `guides/moab-utv-tours`,
   `guides/ultimate-guide-to-vernal-utah`. **Zero of the 9 itineraries** carry it, despite all
   9 giving explicit "where you'll sleep / book lodging ahead" advice. Every "base in Vernal"
   fishing/camping/destination guide omits it. → **The largest hotel-referral / partner-revenue
   gap.**
2. **Adventure Pass: 0 of ~60 pages.** No entry point exists anywhere.
3. **Visible social proof is on 1 page** (`moab-utv-tours`), though the 5.0★/82-review figure
   is real and already in config. → Highest-leverage trust quick win.
4. **Booking-CTA holes** on money/high-intent pages that have *no* in-body `/booking/` link
   (they rely only on the single layout CTA): `utv/backcountry-tours`, `utv/group-utv-tours`,
   `utv/side-by-side-rentals`, `things-to-do/vernal-utah-attractions`,
   `things-to-do/fun-things-to-do-…-kids`, `from/salt-lake-city`, `guides/index`,
   `guides/vernal-weather-guide`, `guides/what-to-bring`, `guides/what-to-wear-utv-tour`,
   `dinosaur-national-monument/petroglyphs-rock-art-vernal`.
5. **Two mislabeled UTV CTAs** (carried from M5 QW-3): `visiting-dinosaur-national-monument`
   ("guided UTV tour" → currently `/dinosaur-national-monument/`) and `petroglyphs-rock-art-vernal`
   ("guided UTV trail tours" → currently bare `/`) should point at `/utv/` or `/booking/`.

---

## 3. Page-by-Page Plan

Treatments are uniform within a cluster, so pages are grouped by cluster with per-page outliers
called out. Each row: **current** conversion elements → **missing** → **recommended additions**
→ **user benefit**.

### 3.1 UTV money pages — `src/content/utv/*` (7) · highest booking intent

| Page | Current | Missing | Recommended (Kit) | User benefit |
|---|---|---|---|---|
| `best-utv-trails-vernal` | layout CTA + 1 in-body `/booking/`, phone×5 | trust badge; Pass | **A** near CTA | Reassures the highest-intent visitor at the decision point |
| `beginners-guide-to-utv-tours` | layout CTA + 2 `/booking/`, phone×7 | trust badge | **A** | Trust reduces first-timer hesitation |
| `family-utv-guide` | layout CTA + 2 `/booking/` | trust badge; lodging (families stay over) | **A**, **B** | Family trips = multi-night → hotel referral |
| `private-utv-tours` | layout CTA + 2 `/booking/`, phone×10 | trust badge | **A** | Premium buyers want proof |
| `group-utv-tours` | layout CTA only, **0 in-body `/booking/`** | in-body CTA; trust; group lodging | **C**, **A**, **B** | Groups need rooms + an obvious "book the group" path |
| `backcountry-tours` | layout CTA only, **0 in-body `/booking/`** | in-body CTA; trust | **C**, **A** | Adds a booking path where only a phone number exists |
| `side-by-side-rentals` | layout CTA only, **0 in-body `/booking/`** | in-body CTA; trust | **C**, **A** | Rental-intent visitor gets a clear next step |

*All 7:* no Best Western, no Pass, no visible trust badge today.

### 3.2 Itineraries — `src/content/itineraries/*` (9) · highest "where to stay" intent

Booking CTAs are already plentiful (4–13 `/booking/` links each). **The gap is lodging + Pass.**
Every itinerary explicitly discusses sleeping arrangements yet **none** references Best Western.

| Page | Current | Missing | Recommended | User benefit |
|---|---|---|---|---|
| `weekend-road-trip-from-salt-lake-city` | 12 `/booking/` | BW lodging; Pass | **B**, **D** | Trip-planner books the room while planning the trip |
| `weekend-road-trip-from-denver` | 9 `/booking/` | BW lodging; Pass | **B**, **D** | Same, for the Denver gateway |
| `weekend-road-trip-from-grand-junction` | 9 `/booking/` | BW lodging; Pass | **B**, **D** | Same, for the closest gateway |
| `2-day-family-itinerary` | 10 `/booking/` | BW lodging; Pass | **B**, **D**, **A** | "Where we'll sleep" is answered on-page |
| `3-day-adventure-itinerary` | 11 `/booking/` | BW lodging; Pass | **B**, **D** | Multi-night = highest-value hotel referral |
| `romantic-weekend-dinosaur-country` | 11 `/booking/` | BW lodging; Pass | **B**, **D** | Couples book lodging as part of the romance |
| `weekend-fishing-trip-vernal` | 4 `/booking/` | BW lodging | **B** | Anglers base in town |
| `photography-weekend-vernal` | 4 `/booking/` | BW lodging | **B** | Multi-day shooters need a base |
| `one-day-adventure-vernal` | 13 `/booking/` | (day trip — lodging optional) | **A** only | Light touch; day-trippers rarely need a room |

### 3.3 Gateway page — `src/pages/from/salt-lake-city.astro` (+ future `/from/*`)

- **Current:** CityLayout injects a `family` TourCta; **0 in-body `/booking/`, 0 BW, 0 Pass.**
- **Missing:** everything conversion-related in-body.
- **Recommended:** **C** (contextual "book your tour" once), **B** (BW lodging — this page is
  literally trip planning), **D** (Pass). *This is the template for Denver/Grand Junction `/from/`
  pages when they ship — bake conversion into the template now.*
- **Benefit:** captures high-intent out-of-state planners at the moment they're assembling the
  whole trip (tour + room + activities).

### 3.4 Destination & prep guides — `src/content/guides/*` (9)

| Page | Current | Recommended | User benefit |
|---|---|---|---|
| `ultimate-guide-to-vernal-utah` | BW named once (text), 0 `/booking/` | **Strengthen to full B callout + C** | The flagship "plan Vernal" page should convert to both tour and room |
| `ultimate-guide-to-flaming-gorge` | "base in Vernal" text, 1 `/booking/` | **B** | Gorge trips are multi-day → hotel referral |
| `ultimate-guide-to-ashley-national-forest` | "base in Vernal" text | **B** | Same |
| `ultimate-guide-to-red-fleet-state-park` | "base in Vernal" text | **B** | Same |
| `ultimate-guide-to-steinaker-state-park` | "base in Vernal" text | **B** | Same |
| `moab-utv-tours` | **exemplar** — BW×3, social×10, `/booking/`×3 | **route its BW link through tracking (see §5)** | Already converting; make it *measurable* |
| `vernal-weather-guide` | phone×7, **0 `/booking/`** | **C** | UTV-prep readers get a booking path |
| `what-to-bring` | **0 `/booking/`** | **C**, **A** | Pre-tour intent is high; give them the button |
| `what-to-wear-utv-tour` | **0 `/booking/`** | **C**, **A** | Same — reader is preparing for a tour |

### 3.5 Fishing (4) & Camping (4) — `src/content/{fishing,camping}/*`

- **Current:** layout CTA + 1 in-body `/booking/`; all say "base in Vernal … lodging."
- **Recommended:** **B** on each (multi-night trips → hotel referral). Optional **A**.
- **Benefit:** the reader already plans to sleep near the water or in town — surface the
  partner rate at that decision.

### 3.6 Hiking (16) — `src/content/hiking/*`

- **Current:** layout CTA + 1 in-body `/booking/` each. Lower direct-UTV intent, high traffic.
- **Recommended:** **B** on the four that explicitly say "base in Vernal / gateway town"
  (`kings-peak-hiking-guide`, `high-uintas-backpacking-guide`, `high-uintas-day-hikes`,
  `alpine-lakes-hiking-high-uintas`). Light-touch elsewhere — a single tasteful cross-link to
  `/utv/` as a "rest-day activity," no hard sell.
- **Benefit:** converts the largest content cluster's traffic into lodging referrals + occasional
  rest-day bookings without turning trail guides into ads.

### 3.7 Scenic drives (4) — `src/content/scenic-drives/*`

- **Current:** layout CTA + 1–2 `/booking/`.
- **Recommended:** cross-link `cub-creek…` and `flaming-gorge-uintas-scenic-byway` to `/utv/`
  and DNM; **B** where lodging is mentioned. Optional **A**.
- **Benefit:** scenic-drive readers are trip-planning; nudge to a guided tour + a room.

### 3.8 Things-to-Do & DNM spokes

| Page | Current | Recommended | User benefit |
|---|---|---|---|
| `things-to-do/vernal-utah-attractions` | **0 `/booking/`, 0 phone** | **C**, **A** | High-traffic "what to do" page gets a bookable activity |
| `things-to-do/fun-things-to-do-…-kids` | **0 `/booking/`** | **C** (family UTV angle) | Parents get a marquee family activity |
| `dnm/visiting-dinosaur-national-monument` | 1 `/booking/`, "base in Vernal" | **fix mislabeled CTA**, **B** | Correct link + a room for the DNM trip |
| `dnm/petroglyphs-rock-art-vernal` | **0 `/booking/`** | **fix mislabeled CTA → C** | Rock-art readers → guided backcountry tour |

### 3.9 Core `.astro` pages

| Page | Current | Recommended | User benefit |
|---|---|---|---|
| `booking.astro` | live calendar, `/booking/`×2, **0 BW, 0 Pass** | **A** (prominent), **B** ("staying overnight? 10% off"), **D** | The conversion page should carry every trust + cross-sell signal |
| `index.astro` | `/booking/`×6, **BW×4** (good) | **A** (visible badge), **D** | Homepage trust + first Pass touch |
| `about.astro` | `/booking/`×3, 0 BW | **A**, verify the 6 embeds are original (M5 QW-8) | Authority page proves the reviews |
| `faq.astro` | `/booking/`×2, phone×13 | **A**, ensure a clear booking CTA | FAQ resolves objections → book |
| `about/dave`, `about/trudy` | **0 `/booking/`** | **C**, **A** | Author authority → booking path |
| `utv/index` (pillar) | `/booking/`×3 | **A** | Hub-level trust at top of the money funnel |
| `guides/index` (pillar) | **0 `/booking/`** | **C** | Pillar should route to booking |
| other hub pillars (things-to-do, dnm, hiking, camping, fishing, scenic-drives) | layout CTA + varies | **A** once each | Consistent trust across hubs |
| `things-to-do/best-restaurants` | `/booking/`×3, phone×14 | **B** ("dinner + a night in town"), **A** | Diners → overnight stay referral |
| `atv-trails`, `jeep-trails` (legacy root) | `/booking/`×1 | **C** strengthen, **A**, **B** | Money-adjacent pages get full treatment |

---

## 4. Grouped by Effort

### ⚡ Quick Wins (< 1 hour each · desk · reuse existing assets · no new facts)

- **QW-A · Visible trust badge sitewide.** Create one small badge component reading
  `SITE.rating` and place it near the CTA on: the 7 UTV pages, `booking.astro`, `index.astro`,
  `about.astro`, `faq.astro`, and each hub pillar. *(One component, then one-line placements.)*
- **QW-B · Fill the booking-CTA holes.** Add one contextual `/booking/` CTA to the 11 pages in
  §2.4 that have none (`group/backcountry/side-by-side` UTV, `attractions`, `kids`, `from/slc`,
  `guides/index`, weather/what-to-bring/what-to-wear, `petroglyphs`).
- **QW-C · Fix the 2 mislabeled UTV CTAs** (§2.5) — link correction only.
- **QW-D · UTV sibling cross-linking** — `backcountry` / `rentals` / `group` link to each other
  and to `/booking/` (M5 QW-5).
- **QW-E · Author-page booking path** — add a booking CTA + trust badge to `dave`/`trudy`.

*Total: a single editorial sitting; each item is a small, isolated edit that passes existing
validators unchanged.*

### ◐ Medium Effort (reusable block, many placements, one confirmation needed)

- **ME-A · Deploy the Best Western partner callout (Kit B) across all lodging-context pages** —
  the 9 itineraries, `from/salt-lake-city`, the 4 destination guides, 4 fishing, 4 camping, the
  4 "base in Vernal" hiking pages, `visiting-dnm`, `best-restaurants`, and strengthen
  `ultimate-guide-to-vernal`. Reuse the `moab-utv-tours` `.lodging-callout` pattern with the
  `ADVENTURE` promo. *(~28 uniform placements.)*
- **ME-B · Standardize the hub/pillar + gateway CTA** so every hub and every future `/from/*`
  page carries a consistent booking prompt (bake into the gateway template).
- **ME-C · Light-touch hiking/scenic cross-links** to `/utv/` as rest-day activities.

*One confirmation gates ME-A: that the 10% Best Western partnership is current and honored (never
publish an unhonored discount — trust risk).*

### ★ High Impact Initiatives (bigger lift, largest goal movement)

- **HI-1 · Track the Best Western referral so partner revenue becomes measurable.** Point every
  Kit-B link at the hotel's booking surface carrying the `ADVENTURE` promo (the load-bearing
  attribution signal the frozen V1.0 reconciliation engine matches on) plus an optional
  `ref`/UTM. This is what turns referrals into *countable* partner revenue — the payoff of the
  whole exercise. *(Dependency: confirm the exact referral URL/parameters with the owner; no V1.0
  change required — the content site only points at it.)*
- **HI-2 · Adventure Pass surface (Kit D) — the first ever.** Add Pass entry points on the
  highest-intent pages: `booking.astro`, `index.astro`, all 9 itineraries, `ultimate-guide-to-vernal`,
  and the `/from/*` gateways. *(Dependency: a cross-property product decision on where Pass lives
  and its signup URL — until then, ship QW/ME and stage HI-2's copy.)*
- **HI-3 · A small reusable conversion-component set** (`TrustBadge`, `LodgingPartnerCallout`,
  `PassCallout`) so every future page inherits conversion by default — additive components in the
  existing `components/content/` pattern, not an architecture change. Makes QW-A / ME-A / HI-2
  one-line placements and keeps them consistent.
- **HI-4 · Conversion instrumentation.** Ensure `/booking/` calendar starts, BW-referral clicks,
  and Pass clicks emit trackable events so Phase 2A's lift is provable (ties to the success
  metrics in the growth roadmap).

---

## 5. Guardrails & Dependencies

- **Architecture frozen:** everything above is content/MDX edits + small additive components in
  the existing `components/content/` pattern. No routing, schema, layout, or build change.
- **TourCta cap:** never more than 2 booking blocks per page (component rule) — contextual CTAs
  (Kit C) should usually be a text link/button, not a second full TourCta.
- **No invented facts:** the rating (`SITE.rating`), pricing (`SITE.pricing`), and promo are all
  real and already in the repo; reuse them. Confirm the **Best Western discount is honored** and
  the **5.0★/82-review** figure is current before amplifying (trust risk — M5 QW-8).
- **Validators unchanged:** adding CTAs/callouts doesn't affect the internal-link, alt-text, or
  thin-content gates; new components must still pass them.
- **V1.0 untouched:** the hotel platform is frozen; Phase 2A only *points at* its existing
  attribution surface (the `ADVENTURE` promo) — it never modifies that repository.
- **Open dependencies to close before ME-A / HI-1 / HI-2:** (1) the exact Best Western referral
  URL + whether it carries `ref`/UTM alongside the promo; (2) where Adventure Pass is offered to
  content-site visitors and its signup URL; (3) confirmation the discount and rating are current.

---

*Plan complete. This document is the only change to the working tree: no architecture, content,
MDX, schema, routing, component, or build was modified; no build was run; no commit was made. It
proposes; it does not implement.*
