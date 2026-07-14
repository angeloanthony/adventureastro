# Source notes — Vernal Fishing Waters Overview Map (`M-FISHING`)

**Asset:** [`public/images/maps/vernal-fishing-waters-overview.svg`](../../../public/images/maps/vernal-fishing-waters-overview.svg)
**Spec:** [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md) — map ID `M-FISHING` (Tier B cluster overview; "the reservoirs + the tailwater river as a set").
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Derives from:** the shared map-system conventions of [`M-REGIONAL`](vernal-regional-hub-and-spoke.README.md), [`M-UTV`](vernal-utv-trail-systems.README.md), [`M-DINO-COUNTRY`](vernal-dinosaur-country-overview.README.md), [`M-DNM-ORIENT`](dinosaur-national-monument-orientation.README.md), and [`M-HIKING`](vernal-hiking-regions.README.md) — identical palette, typography, accessibility scaffold, and color model — but a **new grouped-quadrant layout** (see below), so it is not a restyle of the radial base or the two-panel comparisons.
**Milestone:** M7.10 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Purpose & why the layout differs

M-FISHING exists to explain the orientation fact the fishing pillar leads with: the region offers **"variety within a small radius" — several genuinely different fishing environments from one basecamp** ([`src/pages/fishing/index.astro`](../../../src/pages/fishing/index.astro), "Why Fish in Dinosaur Country" and the "Fishing Regions Overview" table). The pillar organizes the waters by **type** ("five distinct waters, each with its own personality"), which collapse into **four environments**: a big reservoir, a tailwater river, close-to-town reservoirs, and alpine lakes.

The four prior maps use either a **radial hub-and-spoke** (M-REGIONAL, M-UTV) or a **two-panel comparison** (M-DNM-ORIENT, M-HIKING). Reusing either would (a) misrepresent the story — fishing here is *four peer environments*, not a binary or a single radiating hub — and (b) read as a visual duplicate. So this map uses a deliberately different **2×2 grouped-quadrant board**: four labeled environment panels around a central canyon-red "Vernal — your basecamp" badge. It stays unmistakably in-family through the identical palette, fonts, node-pill treatment, accent discipline, legend style, and honesty-note convention, and it foregrounds **water** (the spec §3.5 water role) via abstract sky-blue symbols.

The purpose is **orientation and education, not navigation.** It shows *which kind of fishing lives where*, never how to reach a ramp or what the rules are.

## What each panel shows (every item traced to the repository)

The panels list only waters and descriptors already documented in the fishing cluster (the pillar's "Fishing Regions Overview" / "Species Overview" tables and per-water sections, plus the four `src/content/fishing/*.mdx` spokes). Waters are listed as a *set belonging to an environment* — never placed geographically — so the diagram asserts membership, not location.

| Quadrant | Environment (caps tag) | Water(s) | Descriptor lines | Source phrases (repository) |
|---|---|---|---|---|
| **Top-left** | BIG RESERVOIR | Flaming Gorge | "Trophy lake trout & big browns"; "Boat water · spans the Utah–Wyoming line" | pillar: "Trophy lake trout, big browns…"; "primarily boat fishing"; "91-mile reservoir straddling the Utah–Wyoming border" |
| **Top-right** | TAILWATER RIVER | Green River | "Wild trout, below the dam"; "Blue-ribbon fly fishing & float trips" | pillar/spoke: "the Green River tailwater… below Flaming Gorge Dam"; "blue-ribbon fly-fishing"; "wild rainbow and brown trout"; "float trip" |
| **Bottom-left** | CLOSE-TO-TOWN RESERVOIRS | Red Fleet · Steinaker | "Trout, bass & bluegill"; "Family shore fishing · closest to town" | pillar: "rainbow trout… bass and bluegill"; "family-friendly… fishable from shore"; "Steinaker… closest fishing to Vernal" |
| **Bottom-right** | ALPINE LAKES | Uinta Lakes | "Ashley National Forest · trout & grayling"; "High-country lakes · best in summer" | pillar: "the Uinta Mountains and the Ashley National Forest… hundreds of alpine lakes"; "brook, cutthroat, tiger, rainbow trout… arctic grayling"; "the best window is generally summer" |
| **Center badge** | — | "VERNAL — BASECAMP" | — | pillar: "Base in Vernal… every water in this guide is a day trip from town" |

**Waters/species included are exactly those documented** — lake trout, brown, rainbow, kokanee, smallmouth bass (Flaming Gorge); wild rainbow/brown (Green River); rainbow, bass, bluegill (Red Fleet/Steinaker); brook/cutthroat/tiger/rainbow trout and arctic grayling (Uinta lakes). Only the headline species per environment are printed, to keep the board readable; nothing not in the repository is added.

## Design decisions

- **Schematic, not cartographic.** The M7.10 task and the whole map system bar inventing lake boundaries, river geometry, access points, boat ramps, regulations, undocumented species, stocking data, distances, drive times, or coordinates — the map draws **none** of these. The blue shapes are **abstract water symbols** (a broad ellipse for the big reservoir, a short ribbon for the river, two small ellipses for the close reservoirs, a scatter of small ellipses for the alpine lakes), explicitly *not* the actual outlines of any water. A two-line legend honesty note states this outright.
- **No numbers / no UT–WY boundary drawn.** The pillar quotes drive times ("~1 hour north", "~15 min north") and a reservoir length ("91-mile"); consistent with every prior map, none appear on the face. The Utah–Wyoming relationship at Flaming Gorge is conveyed by **text only** ("spans the Utah–Wyoming line"), never as a drawn boundary or the "UT–WY license line" the spec §4 layer list mentions — drawing a boundary is barred, and the *reciprocal-license* detail is a changing regulation kept off the map.
- **Water emphasized with a sampled token, not an invented hue.** Water is the spec §3.5 role color; the concrete value is the site's own `--sky-blue` `#A8CDEC` (sampled from `public/styles.css`), so no second palette is introduced. It is the one cool hue against the earth-toned family, which both signals "water" and visually distinguishes this map from its siblings.
- **Accent discipline preserved (spec §3.5).** Canyon-red is reserved for *"your basecamp / you are here."* Vernal is the single canyon-red element, centered because it is the *shared* basecamp for all four environments. The four environment panels are equal-weight neutral sandstone; the water symbols are subordinate sky-blue.
- **Reading order, not compass.** The four quadrants are a grouped board, not a compass rose; no direction is asserted (honesty note: not to direction). The center badge sits in the cross-gap to express "all four are reached from Vernal," without drawn connectors (which would imply routes/distance).
- **Not color-alone.** Every environment, water, and descriptor is labeled in text; the sky-blue symbols are decorative (`aria-hidden`) and never the sole carrier of meaning — the map is fully understandable in monochrome.

## Geometry (viewBox `0 0 1600 1200`, 4:3)

- **Four environment panels** (`rx=24`): TL `x=90 y=196 w=630 h=324` (center `x=405`); TR `x=880 y=196` (center `x=1195`); BL `x=90 y=612`; BR `x=880 y=612`. Column gap `720–880`; row gap `520–612`.
- **Center Vernal badge:** `circle cx=800 cy=566 r=80` (canyon-red, off-white 6 px stroke so it reads cleanly over the central cross-gap), painted on top of the panels.
- **Inside each panel (top→bottom):** environment caps tag (`y≈248/664`, font 21, letter-spacing 3); water name (`y≈298/714`, font 33–38); water symbol (`cy≈346/762`, sky-blue, decorative); descriptor line (`y≈428/844`, font 22–24); qualifier line (`y≈464/880`, font 20). All panel text is charcoal.
- Title block top (`y≈70–150`); legend + two-line honesty note bottom (`y≈1022–1146`); the four panels occupy the middle band, clear of both.

## Layer structure (SVG `<g id>` groups, paint order)

`layer-background` · `layer-title` · `layer-waters` (the four panels + their symbols) · `layer-badge` (Vernal basecamp) · `layer-legend`. Decorative groups (`layer-background`, every water symbol, and the panel water-symbol `<g>`s) are `aria-hidden="true"`; the root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"`.

## Typography

- `--font-heading` **Montserrat** (title, water names, Vernal badge) and `--font-body` **Open Sans** (subtitle, caps tags, descriptors, legend), each with the system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched by the SVG (SVG standard F4).
- Water names, tags, and descriptors use `paint-order:stroke` with a panel-fill-colored halo so text stays crisp over the sandstone pill.

## Palette (roles → tokens sampled from `public/styles.css`)

Adds one role to the established set: **water = `--sky-blue`** (the first map in the library to draw water). No new *hue* beyond the existing brand token.

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note) | `#6E655C` | `#C9BEB2` | — |
| Basecamp (Vernal) fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Basecamp text | `#FFFFFF` | `#FFFFFF` | — |
| Panel fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Panel + chip stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| **Water (symbols)** | `#A8CDEC` | `#7FA8C9` | `--sky-blue` |
| Env name / tag / descriptor | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |

- **All panel text is charcoal, never ink-soft.** Ink-soft (`#6E655C`) on sandstone (`#E8D5C4`) would fall below AA (~3.6:1); every panel label is charcoal (~8:1). Ink-soft appears only on the land tint (subtitle, honesty note), where it clears AA (≈4.7:1). Same rule as the sibling maps.
- **Water symbols are decorative** (`aria-hidden`) and carry no text, so their fill is not contrast-critical; `#A8CDEC` reads on both the light land tint and (in dark mode) `#7FA8C9` on the dark land.
- **Color model — do NOT use `var()` for fills.** Concrete light-theme hex values are set as **presentation attributes** on every element; theme-switching lives in the `<style>` block as a **dark-mode override only** (class selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`). `librsvg`/`sharp` does not resolve `var()` — it would rasterize to black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Contrast (WCAG)

- Charcoal `#3A3A3A` on sandstone panel `#E8D5C4` ≈ **8:1** (AAA) — names, tags, descriptors.
- White on canyon-red Vernal badge `#C1440E` ≈ **5.1:1** (AA all sizes).
- Charcoal `#3A3A3A` on the sky-blue legend swatch `#A8CDEC` ≈ **6.8:1** (AA) — though the swatch carries no text; the label sits on the land tint.
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, honesty note) ≈ **4.7:1** (AA).
- Dark-mode equivalents mirror the library's validated pairings (≥4.5:1). Information is never encoded by color alone — every environment, water, and descriptor is labeled in text.

## Accessibility

- Root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"` → a meaningful `<title>` and a descriptive `<desc>` conveying the four-environments relationship.
- Decorative groups (`layer-background` and every water symbol) are `aria-hidden="true"` (5 nodes total).
- Not color-alone; AA on every label; live `<text>` (not outlined paths) so labels are selectable/searchable.
- When placed as `<img>` at integration time, the host element supplies page-specific `alt`; when inlined, the internal `role`+`aria-labelledby` provide the name.

## QA checklist (performed — M7.10, asset-only)

Rendered via the site's real toolchain (sharp 0.34.5 / libvips 8.17.3 / librsvg):

- **XML** well-formed (parsed clean with `xml.dom.minidom`). *(Note: an initial draft failed because the CSS token name in a code comment contained a literal `--`, illegal inside XML comments; reworded — a reminder never to write `--token` inside an SVG comment.)*
- Rasterizes **non-black** — mean RGB **221.2** at 360 / 700 / 1200 / 1600 px, opaque (light theme intact; no `var()` regression).
- Visually verified at **360 / 700 / 1200 / 1600 px** — all four panels, water names, descriptors, the Vernal badge, water symbols, and the legend legible at mobile width; no label overlap or overflow.
- `grep 'var('` → the only hit is the explanatory code comment; **zero `var()` in any fill/stroke/style**.
- Self-contained — no external `href`/`url()`, no `<script>`, no DOCTYPE (only the `xmlns` namespace URI). CSP-safe.
- Metadata present — `role="img"`, `<title>`, `<desc>`, `aria-labelledby`, 5 `aria-hidden` decoration nodes.
- Font fallback stack present in every `font-family`.
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.
- Per the task, the **repository-wide** gates (`astro check`, `npm run build`, `validate-site`) were **not** run — they belong to the later integration milestone.

## Future integration targets (NOT done here)

Per the map spec §6 reuse plan, the natural body-image consumers are the fishing cluster (one shared SVG, page-specific `alt` + caption each — never duplicate the file):

- `fishing/` **pillar** (orientation block near "Fishing Regions Overview" / "Choosing the Right Destination").
- The four fishing spokes: `fishing-flaming-gorge`, `green-river-fly-fishing`, `fishing-red-fleet-reservoir`, `fishing-steinaker-reservoir` (each framed to its own environment).
- `itineraries/weekend-fishing-trip-vernal` if/when it exists, and the Flaming Gorge destination guide (`guides/ultimate-guide-to-flaming-gorge`), where the reservoir-plus-tailwater set is the core story.
- Place only where it genuinely improves orientation; do not force it onto pages a single-water map would serve better.

## Regeneration / extension notes

- To add a water to an environment: extend that panel's name line and add a small `aria-hidden` sky-blue symbol; keep the panel's two descriptor lines within the `y<520` (top row) / `y<936` (bottom row) bounds. Only add repository-documented waters/species.
- **Never** add lake/river outlines or boundaries, boat ramps, access points, regulations, undocumented species, stocking data, drive times, distances, a north arrow, or a drawn UT–WY line. Keep the honesty note and the "illustrative water symbols, not mapped lakes or rivers" clause whenever this layout is used.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file (M6 §6). Integration (body-image, per the map spec §6) is a **separate, gated editorial-window step**, not part of asset production.
