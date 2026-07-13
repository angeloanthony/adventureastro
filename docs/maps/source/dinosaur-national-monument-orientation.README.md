# Source notes — Dinosaur National Monument Orientation Map (`M-DNM-ORIENT`)

**Asset:** [`public/images/maps/dinosaur-national-monument-orientation.svg`](../../../public/images/maps/dinosaur-national-monument-orientation.svg)
**Spec:** [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md) — map ID `M-DNM-ORIENT` (Tier B cluster overview; also the base for the Tier D `M-DNM-DETAIL` zoom).
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Derives from:** the shared map-system conventions established by [`M-REGIONAL`](vernal-regional-hub-and-spoke.README.md) / [`M-UTV`](vernal-utv-trail-systems.README.md) / [`M-DINO-COUNTRY`](vernal-dinosaur-country-overview.README.md) — identical palette, typography, accessibility scaffold, and color model — but a **new layout** (see below), so it is not a restyle of the radial base.
**Milestone:** M7.6 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Purpose & why the layout differs

M-DNM-ORIENT exists to explain the single most important orientation fact about Dinosaur National Monument: it is **one monument managed as two very different areas, reached by separate entrances**. The site's own guide leads with this — *"Two very different halves… They share a name but sit about a two-hour drive apart"* ([`visiting-dinosaur-national-monument.mdx`](../../../src/content/dinosaur-national-monument/visiting-dinosaur-national-monument.mdx)).

The three prior maps in the library are **radial hub-and-spoke** diagrams (one center, N spokes). Reusing that geometry here would (a) misrepresent the story — DNM's story is *two peers*, not *a hub radiating to satellites* — and (b) read as a visual duplicate of M-REGIONAL/M-UTV. So this map uses a deliberately different **two-area comparison** layout: two equal labeled panels (Utah fossil side | Colorado canyon side) joined by a central "one monument" badge on a schematic split. It stays unmistakably in-family through the identical palette, fonts, node-pill treatment, accent discipline, legend style, and honesty-note convention.

## What each area shows (every item traced to the repository)

The panels list only named features and relationships already documented in [`visiting-dinosaur-national-monument.mdx`](../../../src/content/dinosaur-national-monument/visiting-dinosaur-national-monument.mdx) (and the companion [`petroglyphs-rock-art-vernal.mdx`](../../../src/content/dinosaur-national-monument/petroglyphs-rock-art-vernal.mdx)). Features are listed as a *set belonging to a side* — never placed geographically — so the diagram asserts membership, not location.

| Panel | Tag / entrance | Features listed | Gateway chip | Source phrases |
|---|---|---|---|---|
| **Utah Side** | The fossil side · entrance near Jensen, Utah | Quarry Hall — Wall of Bones; Cub Creek Road — Tilted Rocks; Cub Creek petroglyphs; Josie Morris cabin; Split Mountain | **Vernal, Utah — your basecamp** (canyon-red accent) | "On the Utah side, near the small town of Jensen"; "Quarry Exhibit Hall… roughly 1,500 dinosaur bones"; "Cub Creek Road (Tour of the Tilted Rocks)"; "the lizard petroglyphs"; "Josie Morris cabin"; "Split Mountain"; "Vernal is your basecamp… the closest full-service town to the fossil side" |
| **Colorado Side** | The canyon side · entrance near Dinosaur, Colorado | Harpers Corner Scenic Drive; Green & Yampa river canyons; Echo Park river confluence; Sweeping canyon overlooks; *"River canyons & overlooks — no fossils"* | Dinosaur, Colorado — gateway (neutral outline) | "On the Colorado side, near the town of Dinosaur, Colorado, there are no fossils on display"; "Harpers Corner Scenic Drive"; "the Green and Yampa rivers"; "Echo Park… river confluence"; "scenic overlooks" |
| **Center badge** | — | "ONE MONUMENT" | — | "managed as one monument but reached by different entrances"; "spans more than 200,000 acres straddling the Utah–Colorado state line" |

## Design decisions

- **Schematic, not cartographic — same discipline as the whole library.** The repository holds **no** verified coordinates, boundaries, road/trail geometry, or park scale, and the M7.6 task explicitly bars inventing routes, distances, mileage, drive times, boundaries, coordinates, geometry, or scale. The map therefore draws **none** of those. It shows only which named features and which gateway town belong to each area, and that the two areas are one monument. A two-line legend honesty note states it is not to scale/distance/road-geometry/direction.
- **No drive-time / "two-hour-apart" number on the face.** The guide documents "roughly a two-hour drive apart," but — consistent with M-REGIONAL, M-UTV, and M-DINO-COUNTRY, which all omit even *documented* drive times as "changing information" — the separation is expressed **qualitatively** ("reached by separate entrances," "two entrances"), never as a number or a drawn distance. Operational figures shift; the article itself says to "confirm with a current map app."
- **No drawn boundary or state line.** Drawing jurisdiction/state boundaries is explicitly forbidden by the task (and was already avoided in M-DINO-COUNTRY). The Utah–Colorado relationship is conveyed by **text only** (subtitle "spanning Utah and Colorado," the gateway-town tags). The central dashed line is a **schematic split of the two areas**, and the honesty note states outright that it is *"not a mapped boundary or the state line"* — the same "labels show relationship, not a border" guardrail used on M-DINO-COUNTRY.
- **Accent discipline preserved (spec §3.5).** Canyon-red is reserved for *"your basecamp / you are here."* Vernal is the documented basecamp/gateway to the fossil side, so it is the one canyon-red chip. The Colorado gateway town (Dinosaur, CO) is **not** an Adventure-Tours basecamp, so it is a neutral outlined chip — visually subordinate. The two monument areas are equal-weight neutral sandstone panels. This keeps Vernal the most salient brand element, exactly as the hub is on the other maps.
- **Left = Utah, right = Colorado is reading order, not compass.** It matches the column order of the article's own "Which side should you visit?" comparison table (Utah Side | Colorado Side) and the west→east narrative, but no compass claim is made (honesty note: not to compass direction).
- **Header glyphs paired with words (M-UTV convention).** A bone (fossils) heads the Utah panel; a two-wall canyon glyph (reused from M-UTV's slot-canyon vocabulary) heads the Colorado panel. Each glyph is decorative (`aria-hidden`) and **always paired with a text tag** ("THE FOSSIL SIDE" / "THE CANYON SIDE"), so meaning is never carried by shape or color alone (SVG standard §5). Feature bullets are neutral charcoal diamonds, likewise always paired with a label.

## Geometry (viewBox `0 0 1600 1200`, 4:3)

- **Area panels:** Utah `x=90 y=196 w=610 h=740 rx=24`; Colorado `x=900 y=196 w=610 h=740 rx=24`. Centers at `x=395` and `x=1205`.
- **Center gap** `700–900` holds the schematic split (dashed `<line>` at `x=800`, `y 252→918`) and the **"ONE MONUMENT" badge** (`circle cx=800 cy=566 r=86`), painted on top of the split.
- **Inside each panel (top→bottom):** header glyph `≈(cx,256)`; area name `y=330` (font 44); caps tag `y=368` (font 22); entrance line `y=406` (font 24); thin rule `y=430`; feature list `y=502,566,630,694,758` (font 30, left-aligned, diamond bullet + label); character line `y=806` (font 26); gateway chip `y=844 h=72` (Vernal canyon-red / Dinosaur outlined).
- Title block top (`y≈70–150`); legend + two-line honesty note bottom (`y≈1022–1146`); the two areas occupy the middle band, clear of both.

## Palette (roles → tokens sampled from `public/styles.css`)

Identical role set to M-REGIONAL; adds one **neutral gateway-chip** treatment (off-white fill + burnt-orange outline) to distinguish a non-basecamp gateway town from the canyon-red basecamp. No new *hue* is introduced.

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note) | `#6E655C` | `#C9BEB2` | — |
| Basecamp (Vernal) fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Basecamp text | `#FFFFFF` | `#FFFFFF` | — |
| Split / connector stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Panel + badge fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Panel + badge stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Area name / feature / glyph / bullet | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Gateway chip (Colorado) fill | `#FAF8F5` | `#2C2823` | `--off-white` (dark → land) |
| Gateway chip (Colorado) text | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |

- **All panel text is charcoal, never ink-soft.** Ink-soft (`#6E655C`) on sandstone (`#E8D5C4`) would fall below AA (~3.6:1); every label inside a panel is charcoal (~8:1 AAA). Ink-soft appears only on the land tint (subtitle, honesty note), where it clears AA (≈4.7:1). Same rule as M-DINO-COUNTRY.
- **Color model — do NOT use `var()` for fills.** Concrete light-theme hex values are set as **presentation attributes** on every element; theme-switching lives in the `<style>` block as a **dark-mode override only** (class selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`). `librsvg`/`sharp` (the engine behind `astro:assets` and og:image) does not resolve `var()` — it would rasterize to black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Typography

- `--font-heading` **Montserrat** (title, area names, badge, chip names) and `--font-body` **Open Sans** (subtitle, tags, features, legend), each with the system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched by the SVG (SVG standard F4).
- Area names, tags, and features use `paint-order:stroke` with a panel-fill-colored halo so text stays crisp over the sandstone pill.

## Contrast (WCAG)

- Charcoal `#3A3A3A` on sandstone panel/badge `#E8D5C4` ≈ **8:1** (AAA) — area names, tags, features, glyphs, bullets, badge text.
- White on canyon-red Vernal chip `#C1440E` ≈ **5.1:1** (AA all sizes).
- Charcoal on off-white Colorado chip `#FAF8F5` ≈ **>10:1** (AAA).
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, honesty note) ≈ **4.7:1** (AA).
- Dark-mode equivalents mirror the library's validated pairings (≥4.5:1). Information is never encoded by color alone — every area, feature, and gateway is also labeled in text, and each glyph is paired with a word.

## Layer structure (SVG `<g id>` groups, paint order)

`layer-background` · `layer-title` · `layer-divider` (schematic split) · `layer-areas` (the two panels + their chips) · `layer-badge` (one-monument) · `layer-legend`. Decorative groups (`layer-background`, `layer-divider`, every glyph `<g>`, bullet `<path>`s, and the thin panel rules) are `aria-hidden="true"`; the root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"`.

## QA performed (M7.6)

Rendered via the site's real toolchain (sharp 0.34.5 / libvips 8.17.3 / librsvg 2.61.2):

- **XML** well-formed (parsed clean with `xml.dom.minidom`).
- Rasterizes **non-black** — mean RGB **227.4–227.5** at 360 / 700 / 1200 / 1600 px (light theme intact; no `var()` regression; in line with M-DINO-COUNTRY's 227.3).
- Visually verified at **360 / 700 / 1200 / 1600 px** — area names, tags, features, chips, badge, and legend all legible at mobile width; no label overlap or overflow; both header glyphs render correctly.
- `grep 'var('` → the only hit is the explanatory code comment ("do NOT support CSS `var()`…"), identical to the three sibling maps; **zero `var()` in any fill/stroke/style**.
- Self-contained — no external `href`/`url()`, no `<script>`, no DOCTYPE (only the `xmlns` namespace URI). CSP-safe.
- Metadata present — `role="img"`, `<title>`, `<desc>`, `aria-labelledby`, `aria-hidden` on decoration.
- `astro check` 0 errors / 0 warnings; `npm run build` clean (80 pages); `validate-site` green (only the pre-existing 5 non-blocking author-photo/bio/sameAs TODOs) — no regression from adding the asset to `public/`.
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.

## Regeneration / extension notes

- To add a feature to a side: add a diamond `<path class="bullet">` + a `<text class="node-text">` inside that panel's feature `<g>` at the next `y` slot (64 px pitch), keeping the pill clear of the entrance line (`y<440`) and the character line/chip (`y>790`).
- To add a header glyph type: define it as a decorative `aria-hidden` `<g class="glyph-solid">` and **always pair it with the panel's caps tag word** (never ship a glyph without its word).
- To produce the `og:image` derivative (spec §3.2, 1200×630): rasterize from the **light** theme on a crop that keeps the title and both area headers in the safe zone; compress to **≤500 KB** WebP/AVIF for the metadata-hero gate. (Not produced in M7.6 — integration-phase task.)
- **Never** add coordinates, drive times, mileage, drawn roads/trails, a north arrow, park scale, or a drawn boundary/state line. Keep the honesty note and the "not a mapped boundary or the state line" clause whenever this two-panel layout is used.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file (M6 §6). Integration (hero vs body, per the map spec §6) is a **separate, gated editorial-window step**, not part of asset production.
