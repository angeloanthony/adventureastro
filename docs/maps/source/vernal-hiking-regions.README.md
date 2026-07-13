# Source notes — Vernal Hiking Regions Map (`M-HIKING`)

**Asset:** [`public/images/maps/vernal-hiking-regions.svg`](../../../public/images/maps/vernal-hiking-regions.svg)
**Spec:** [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md) — map ID `M-HIKING` (Tier B cluster overview; the orientation front-door for the 16-page hiking cluster).
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Derives from:** the shared map-system conventions of [`M-REGIONAL`](vernal-regional-hub-and-spoke.README.md) / [`M-UTV`](vernal-utv-trail-systems.README.md) / [`M-DINO-COUNTRY`](vernal-dinosaur-country-overview.README.md), and specifically the **two-panel comparison layout** of [`M-DNM-ORIENT`](dinosaur-national-monument-orientation.README.md) — identical palette, typography, accessibility scaffold, and color model.
**Milestone:** M7.8 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Purpose & why the layout differs

M-HIKING exists to explain the single most useful orientation fact about hiking around Vernal: it **falls into two broad environments, both reached from one basecamp**. The hiking pillar leads with exactly this framing — a "Desert vs. Alpine Hiking" section and a "Choosing the Right Hiking Destination" decision table whose whole message is *match the environment (and its season) to the trip you want* ([`src/pages/hiking/index.astro`](../../../src/pages/hiking/index.astro)).

The map therefore reuses the **two-panel comparison** language established by M-DNM-ORIENT rather than the radial hub-and-spoke of M-REGIONAL / M-UTV (which it would otherwise duplicate, and which would misrepresent the "two peers" story as "a hub radiating to satellites"). Two equal environment panels (**High Desert & Canyon Country** | **High Uintas Alpine Region**) are joined by a **central canyon-red "Vernal — your basecamp" badge**, because Vernal is the *shared* supply base for both worlds. It stays unmistakably in-family through the identical palette, fonts, node-pill treatment, accent discipline, legend style, and honesty-note convention.

The purpose is **orientation and education, not navigation.** It shows *which kind of hiking lives where*, not how to get to any trailhead.

## What each panel shows (every item traced to the repository)

The panels list only destinations already documented across the hiking cluster (the pillar + the 16 `src/content/hiking/*.mdx` spokes). Destinations are listed as a *set belonging to an environment* — never placed geographically — so the diagram asserts membership, not location.

| Panel | Caps tag / character | Destinations listed | Season chip | Source (repository) |
|---|---|---|---|---|
| **High Desert & Canyon Country** (left) | "Lower, warmer country near Vernal"; "Fossils, red rock & river canyons" | Dinosaur National Monument; Green & Yampa river canyons; Split Mountain trails; Red Fleet dinosaur trackway; Flaming Gorge rim trails | **SPRING & FALL — the easier desert season** (neutral outline) | pillar "Desert vs. Alpine Hiking" table (desert = "Dinosaur NM, reservoirs"; "Lower and warmer, near the rivers and town"; "Spring and fall"); pillar "Desert Hiking" section (Green & Yampa canyons, Split Mountain, Red Fleet dinosaur trackway); "Scenic Hikes" (Flaming Gorge rim & shoreline trails) |
| **High Uintas Alpine Region** (right) | "Higher, cooler mountain country"; "Alpine lakes, high peaks & cool forest" | Ashley National Forest; Hundreds of alpine lakes; Kings Peak — Utah's highest; High Uintas Wilderness; Uinta Highline Trail | **SUMMER — once the snow clears** (neutral outline) | pillar "Alpine Hiking" section ("Kings Peak … the highest point in Utah", "High Uintas Wilderness", "hundreds of alpine lakes", "Uinta Highline Trail", "Ashley National Forest"); "Desert vs. Alpine" table (alpine = "High Uintas, Ashley NF"; "High and cool"; "Summer, once the snow clears") |
| **Center badge** | — | "VERNAL — YOUR BASECAMP" | — | pillar: "Three great hiking destinations, one supply town"; "Base in Vernal for supplies … every destination is a day trip away" |

**Destinations deliberately omitted:** Steinaker Reservoir (documented but a weaker hiking destination than Red Fleet — kept off to hold each panel to five clean slots) and the numbered/short DNM trails (Fossil Discovery, Desert Voices, Sound of Silence, Box/Hog Canyon) — those live on the DNM-specific pages and would over-crowd an environment-level overview. Nothing was added that the repository does not name.

## Design decisions

- **Schematic, not cartographic — same discipline as the whole library.** The repository holds **no** verified trailhead coordinates, trail geometry, mileage, drive times, or elevations suitable for a to-scale map, and the M7.8 task explicitly bars inventing trailheads, routes, mileage, drive times, coordinates, elevations, boundaries, or terrain geometry. The map draws **none** of those. It shows only which named destinations belong to each environment, and that both are reached from Vernal. A two-line legend honesty note states it is not to scale/distance/elevation/direction and shows no trailheads, routes, or trail geometry.
- **No numbers on the face.** Kings Peak's **13,528 ft** is a fixed geographic fact used site-wide, and the pillar quotes drive times ("~20 min east", "~30–90 min north") — but, consistent with M-REGIONAL, M-UTV, M-DINO-COUNTRY, and M-DNM-ORIENT (which all omit even *documented* figures as "changing/at-scale information"), elevation is expressed qualitatively ("Utah's highest", "Higher, cooler") and no drive time or elevation number appears.
- **No compass claim.** Left = Desert, right = Alpine is **reading order and the pillar's own column order** ("Desert (Dinosaur NM, reservoirs) | Alpine (High Uintas, Ashley NF)"), not a compass statement. Direction words ("east", "north") are kept off the face, and the honesty note states it is not to compass direction — the same guardrail used on M-DNM-ORIENT.
- **Accent discipline preserved (spec §3.5).** Canyon-red is reserved for *"your basecamp / you are here."* Vernal is the single canyon-red element, and here it is the **central badge** (not a panel chip) precisely because it is the *shared* basecamp for both environments. The two environment panels are equal-weight neutral sandstone; the season chips are neutral outlined (off-white fill + burnt-orange outline), visually subordinate to the accent — the same neutral-chip treatment M-DNM-ORIENT used for the non-basecamp gateway town.
- **Season chips add planning value without "changing information."** The site treats the season↔elevation pairing as evergreen ("Everything here about where and how to hike holds season to season; the specifics are what shift"), so "Spring & Fall / Summer" is a stable educational cue, not an operational figure like hours or fees.
- **Header glyphs paired with words (M-UTV / M-DNM-ORIENT convention).** A layered mesa/tilted-rock glyph heads the desert panel; a two-peak glyph heads the alpine panel. Each is decorative (`aria-hidden`) and **always paired with the panel's name + caps tag**, so meaning is never carried by shape or color alone (SVG standard §5). Destination bullets are neutral charcoal diamonds, likewise always paired with a label.

## Geometry (viewBox `0 0 1600 1200`, 4:3)

- **Environment panels:** Desert `x=90 y=196 w=610 h=740 rx=24`; Alpine `x=900 y=196 w=610 h=740 rx=24`. Centers at `x=395` and `x=1205`.
- **Center gap** `700–900` holds the schematic split (dashed `<line>` at `x=800`, `y 252→918`) and the **canyon-red Vernal badge** (`circle cx=800 cy=566 r=88`), painted on top of the split.
- **Inside each panel (top→bottom):** header glyph `≈(cx,256)`; environment name `y=330` (font 44); caps tag `y=368` (font 22, letter-spacing 3); character line `y=406` (font 24); thin rule `y=430`; destination list `y=502,566,630,694,758` (font 30, left-aligned, diamond bullet + label); signature-draw line `y=806` (font 26); season chip `y=844 h=72` (neutral outlined).
- Title block top (`y≈70–150`); legend + two-line honesty note bottom (`y≈1022–1146`); the two panels occupy the middle band, clear of both.

## Palette (roles → tokens sampled from `public/styles.css`)

Identical role set to M-DNM-ORIENT; the only difference is that the shared-basecamp accent lives in the **center badge** rather than a panel chip. No new *hue* is introduced.

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note) | `#6E655C` | `#C9BEB2` | — |
| Basecamp (Vernal) fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Basecamp text | `#FFFFFF` | `#FFFFFF` | — |
| Split / connector stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Panel fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Panel + chip stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Env name / destination / glyph / bullet | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Season chip fill | `#FAF8F5` | `#2C2823` | `--off-white` (dark → land) |
| Season chip text | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |

- **All panel text is charcoal, never ink-soft.** Ink-soft (`#6E655C`) on sandstone (`#E8D5C4`) would fall below AA (~3.6:1); every label inside a panel is charcoal (~8:1). Ink-soft appears only on the land tint (subtitle, honesty note), where it clears AA (≈4.7:1). Same rule as M-DNM-ORIENT.
- **Color model — do NOT use `var()` for fills.** Concrete light-theme hex values are set as **presentation attributes** on every element; theme-switching lives in the `<style>` block as a **dark-mode override only** (class selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`). `librsvg`/`sharp` (the engine behind `astro:assets` and og:image) does not resolve `var()` — it would rasterize to black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Typography

- `--font-heading` **Montserrat** (title, environment names, Vernal badge) and `--font-body` **Open Sans** (subtitle, caps tags, character lines, destinations, chips, legend), each with the system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched by the SVG (SVG standard F4).
- Environment names, tags, and destinations use `paint-order:stroke` with a panel-fill-colored halo so text stays crisp over the sandstone pill.

## Contrast (WCAG)

- Charcoal `#3A3A3A` on sandstone panel `#E8D5C4` ≈ **8:1** (AAA) — names, tags, destinations, glyphs, bullets, character lines.
- White on canyon-red Vernal badge `#C1440E` ≈ **5.1:1** (AA all sizes).
- Charcoal on off-white season chip `#FAF8F5` ≈ **>10:1** (AAA).
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, honesty note) ≈ **4.7:1** (AA).
- Dark-mode equivalents mirror the library's validated pairings (≥4.5:1). Information is never encoded by color alone — every environment, destination, and season is also labeled in text, and each glyph is paired with words.

## Accessibility

- Root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"` → a meaningful `<title>` and a descriptive `<desc>` that conveys the two-environments relationship.
- Decorative groups (`layer-background`, `layer-divider`, every glyph `<g>`, bullet `<path>`s, and the thin panel rules) are `aria-hidden="true"` (16 nodes total).
- Not color-alone (see Contrast); AA on every label; live `<text>` (not outlined paths) so labels are selectable/searchable.
- When placed as `<img>` at integration time, the host element supplies page-specific `alt` (the internal `<title>` is not exposed through `<img>`); when inlined, the internal `role`+`aria-labelledby` provide the name.

## Layer structure (SVG `<g id>` groups, paint order)

`layer-background` · `layer-title` · `layer-divider` (schematic split) · `layer-areas` (the two environment panels + their season chips) · `layer-badge` (Vernal basecamp) · `layer-legend`.

## QA performed (M7.8)

Rendered via the site's real toolchain (sharp 0.34.5 / libvips 8.17.3 / librsvg):

- **XML** well-formed (parsed clean with `xml.dom.minidom`).
- Rasterizes **non-black** — mean RGB **219.6** at 360 / 700 / 1200 / 1600 px, opaque (light theme intact; no `var()` regression). Slightly below M-DNM-ORIENT's 227.4 because the central canyon-red Vernal badge adds saturated pixels — expected.
- Visually verified at **360 / 700 / 1200 / 1600 px** — environment names, tags, character lines, destinations, both season chips, the Vernal badge, and the legend all legible at mobile width; no label overlap or overflow; both header glyphs render correctly.
- `grep 'var('` → the only hit is the explanatory code comment ("do NOT support CSS `var()`…"), identical to the four sibling maps; **zero `var()` in any fill/stroke/style**.
- Self-contained — no external `href`/`url()`, no `<script>`, no DOCTYPE (only the `xmlns` namespace URI). CSP-safe.
- Metadata present — `role="img"`, `<title>`, `<desc>`, `aria-labelledby`, 16 `aria-hidden` decoration nodes.
- Font fallback stack present in every `font-family` (Montserrat/Open Sans → `'Segoe UI','Helvetica Neue',Arial,sans-serif`).
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.
- Per the task, the **site-level** gates (`astro check`, `npm run build`, `validate-site`) were **not** run — they belong to the later integration milestone (M7.9).

## Future integration targets (M7.9 — NOT done here)

Per the map spec §6 reuse plan, the natural body-image consumers are the hiking cluster (one shared SVG, page-specific `alt` + caption each — never duplicate the file):

- `hiking/` **pillar** (orientation block near "Choosing the Right Hiking Destination" / "Desert vs. Alpine Hiking").
- Environment-defining spokes: `beginner-hiking-guide-near-vernal`, `family-hiking-near-vernal`, `high-uintas-day-hikes`, `alpine-lakes-hiking-high-uintas`, `kings-peak-hiking-guide`, `high-uintas-backpacking-guide`, and the seasonal set (`spring/summer/fall/winter-hiking-near-vernal`) where the season↔elevation split is the core message.
- Consider the thematic spokes (`wildlife-hiking-guide-near-vernal`, `wildflower-hiking-near-vernal`, `photography-hikes-near-vernal`, `bird-watching-near-vernal`, `dog-friendly-hiking-near-vernal`) only where the two-worlds framing genuinely aids orientation — do not force it.
- `best-hikes-in-dinosaur-national-monument` already carries `M-DNM-ORIENT`; it does **not** also need this environment-level map.

## Regeneration / extension notes

- To add a destination to an environment: add a diamond `<path class="bullet">` + a `<text class="node-text">` inside that panel's list `<g>` at the next `y` slot (64 px pitch), keeping the pill clear of the character line (`y<440`) and the signature line/chip (`y>790`). Only add repository-documented destinations.
- **Never** add coordinates, drive times, mileage, elevations (including Kings Peak's 13,528 ft), drawn trails/trailheads, a north arrow, or a drawn boundary. Keep the honesty note and the "no trailheads, routes, or trail geometry … not at a mapped point" clause whenever this layout is used.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file (M6 §6). Integration (body-image, per the map spec §6) is a **separate, gated editorial-window step** (M7.9), not part of asset production.
