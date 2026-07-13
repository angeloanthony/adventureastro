# Source notes — UTV Trail Systems Map (`M-UTV`)

**Asset:** [`public/images/maps/vernal-utv-trail-systems.svg`](../../../public/images/maps/vernal-utv-trail-systems.svg)
**Spec:** [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md) — map ID `M-UTV` (Tier B cluster overview), plus the approved M-UTV design specification.
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Derives from:** [`M-REGIONAL`](vernal-regional-hub-and-spoke.README.md) — a restyle/relabel of the same radial geometry, palette, typography, and layer structure.
**Milestone:** M7.2 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Design decisions

- **Schematic, not cartographic — same model as M-REGIONAL.** The repository contains **no** verified coordinates, drive times, distances, compass bearings, or route geometry for the five trail systems, and inventing them would violate the site's no-invented-facts rule. The map is therefore a **radial staging-point-and-trail-systems diagram**: the Vernal tour staging point at center, five trail systems as labeled nodes on plain spokes. It asserts only true, evergreen facts — that all guided tours depart from one Vernal staging point and that these five distinct trail systems exist and differ in terrain. A legend honesty note states it is not to scale and shows no routes/distances/direction/trailheads.
- **Departure-directions, not routes (spec §4 / M6 §4).** Two additional reasons reinforce the schematic choice beyond fact-availability: (1) the guided product *sells* local knowledge — the copy states the backcountry has "no signs, no marked trailheads"; publishing routes would give away the product. (2) The **Outlaw Trail rock-art protection rule** (M6 §4 + audit F6) forbids ever publishing precise remote-panel/ruin locations. The Outlaw Trail node is characterized by *history*, never by location.
- **No numeric difficulty rating.** The repo has no official trail-difficulty rating system (it is a *pending* owner original-asset per PROJECT_STATE). Relative accessibility is therefore **not** encoded as a score; nodes carry only terrain descriptors drawn verbatim-in-substance from `src/content/utv/**`. Any future published difficulty rating is a `VERIFY WITH OWNER` item.
- **Five trail systems.** Doc's Beach, Moonshine Arch, Ashley Gorge, Asphalt Ridge, Outlaw Trail — all named and characterized in [`src/content/utv/best-utv-trails-vernal.mdx`](../../../src/content/utv/best-utv-trails-vernal.mdx) and [`src/content/utv/backcountry-tours-vernal-utah.mdx`](../../../src/content/utv/backcountry-tours-vernal-utah.mdx).
- **Staging fact.** All tours depart **1935 S 1500 E, Vernal, UT 84078** (6 Kawasaki KRX 1000 machines, 3-hour guided tours, 3-guest minimum / 12-guest maximum). The address is intentionally kept off the map face (concise hub) and lives in the `<desc>`, this note, and the future host-page alt/caption.

## Trail systems → node content

| # | Trail system | Descriptor (from copy) | Terrain glyph | Wheel position |
|---|---|---|---|---|
| 1 | Doc's Beach | Sandy river terrain | waves (line) | upper-left `(360,315)` |
| 2 | Moonshine Arch | Red-rock canyon & arch | arch (line) | upper-right `(1190,315)` |
| 3 | Ashley Gorge | Deep sandstone canyon | slot-canyon (solid) | right `(1300,610)` |
| 4 | Asphalt Ridge | Ridge-top panoramas | ridgeline peaks (solid) | lower-right `(1215,910)` |
| 5 | Outlaw Trail | Remote historic country | star (solid) | lower-left `(345,910)` |

Node order sweeps clockwise from upper-left by terrain family (river → canyon → gorge → ridge → remote). Positions reuse the M-REGIONAL five-node ring exactly.

## Geometry (viewBox `0 0 1600 1200`, 4:3)

- Staging-point (hub) center: `(800, 610)`; hub rect `x=610 y=544 w=380 h=132 rx=24`.
- Node pills: uniform `440 × 172` (`rx=20`), centered on the ring points above (rect `x = cx-220`, `y = cy-86`).
- Inside each node: terrain glyph centered at `(cx, cy-52)`; trail name baseline `cy+6` (font 38); descriptor baseline `cy+46` (font 24).
- Spokes drawn staging→node first; pills and hub painted on top so lines read pill-to-pill.
- Green River water hint: a single faint wave `y≈752`, `x 470→1130`, `opacity 0.6`, muted "Green River" label at `(800,722)` — ambient orientation only, sits in the clear band between the hub and the lower nodes; not to scale, no route claim.
- Title block top (`y≈70–156`); legend + terrain key + honesty note bottom (`y≈1016–1152`); the wheel occupies the middle band, clear of both.

## Palette (roles → tokens sampled from `public/styles.css`)

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note) | `#6E655C` | `#C9BEB2` | — |
| Hub (staging) fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Hub text | `#FFFFFF` | `#FFFFFF` | — |
| Spoke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Node fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Node stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Terrain glyph | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Water (Green River) | `#A8CDEC` | `#4A5C6B` | `--sky-blue` (dark derived) |
| Water label | `#3E6684` | `#8FB4D6` | (darkened `--sky-blue` for AA) |

- **Accent discipline** (spec §3.5): canyon-red hub + burnt-orange spokes are the reserved accent family (staging / connection / "you are here"); the five trail systems are neutral sandstone pills of equal weight, so the staging point is always the most salient element. Terrain glyphs are neutral ink, never the accent — they must not read as "you are here."
- **New role vs M-REGIONAL:** the `--sky-blue` **water** role (Green River hint). Its dark variant `#4A5C6B` is derived (not a raw token) to harmonize with the dark canvas; the water label uses a darkened blue `#3E6684` so it clears AA on the land tint. All other roles are identical to M-REGIONAL.
- **Color model — do NOT use `var()` for fills.** Concrete light-theme hex values are set as **presentation attributes** (`fill="#…"` / `stroke="#…"`) on every element. Theme-switching lives in the `<style>` block as a **dark-mode override only** (class selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`). `librsvg`/`sharp` (the engine behind `astro:assets` and og:image) does not resolve `var()` — it would rasterize to solid black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Typography

- `--font-heading` **Montserrat** (title, node names, hub) and `--font-body` **Open Sans** (subtitle, descriptors, legend), each with the robust system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched by the SVG (SVG standard F4).
- Node names/descriptors use `paint-order:stroke` with a node-fill-colored halo so text stays legible over the pill.

## Terrain glyph vocabulary

Simple hand-authored vector marks, each **always paired with a text label** (in-node descriptor + the legend terrain key) so meaning is never carried by shape or color alone (SVG standard §5). Reusable for future ATV/Jeep and per-trail maps.

- **waves** (`glyph-line`) — three stacked wavy strokes → sand.
- **arch** (`glyph-line`) — a natural arch on a ground line → arch.
- **slot-canyon** (`glyph-solid`) — two angled walls with a V gap → canyon.
- **ridgeline** (`glyph-solid`) — two filled peaks → ridge.
- **star** (`glyph-solid`) — five-point star → historic (Wild West / Outlaw).

`glyph-line` sets stroke; `glyph-solid` sets fill. Both invert to `#F5EDE3` in the dark override.

## Contrast (WCAG)

- White on canyon-red hub `#C1440E` ≈ **5.1:1** (AA all sizes).
- Charcoal `#3A3A3A` on sandstone node `#E8D5C4` ≈ **8:1** (AAA) — names, descriptors, and glyphs.
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, terrain heading, honesty note) ≈ **4.7:1** (AA).
- Water label `#3E6684` on land `#F5EDE3` ≈ **5.9:1** (AA).
- Dark-mode equivalents mirror M-REGIONAL's validated pairings (≥4.5:1). Information is never encoded by color alone — every element is also labeled/shaped.

## Layer structure (SVG `<g id>` groups, paint order)

`layer-background` · `layer-water` · `layer-title` · `layer-spokes` · `layer-nodes` · `layer-hub` · `layer-legend`. Decorative groups (`layer-background`, `layer-water`, `layer-spokes`, and every glyph `<g>`) are `aria-hidden="true"`; the root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"`.

## QA performed (M7.2)

Rendered via the site's real toolchain (sharp 0.34.5 / libvips / librsvg):

- Rasterizes **non-black** — mean RGB **231.8** at 96 dpi (light theme intact; no `var()` regression).
- Visually verified at **1600 px** and **360 px** — trail-system names + hub legible at mobile width; no label overlap/overflow; glyphs render correctly.
- `grep 'var('` → empty. Self-contained (no external `href`/`url()`, no DOCTYPE). Metadata (`role`/`<title>`/`<desc>`/`aria-*`) present.
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.

## Regeneration / extension notes

- To add a node: add a spoke `<line>` in `layer-spokes` and a node `<g>` (rect + glyph `<g transform>` + name/descriptor tspans) in `layer-nodes`; keep the pill clear of the title (`y<200`) and legend (`y>1000`) bands.
- To add a terrain type: define a new glyph in the vocabulary above, use it in the node **and** add it to the legend terrain-key row (never ship a glyph without its word).
- To produce the `og:image` derivative (spec §12, 1200×630): rasterize from the **light** theme on a crop that keeps the title + staging hub in the safe zone; compress to **≤500 KB** WebP/AVIF for the metadata-hero gate. (Not produced in M7.2 — integration-phase task.)
- Keep the honesty note and the "trailheads are not marked" clause whenever the schematic layout is used. Never add coordinates, drive times, or Outlaw Trail site locations.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file (M6 §6).
