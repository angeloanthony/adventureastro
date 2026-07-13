# Source notes — Vernal Regional Hub-and-Spoke Map (`M-REGIONAL`)

**Asset:** [`public/images/maps/vernal-regional-hub-and-spoke.svg`](../../../public/images/maps/vernal-regional-hub-and-spoke.svg)
**Spec:** [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md) — map ID `M-REGIONAL` (Tier A base geography).
**Milestone:** M6.3 (asset production only; not integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG itself is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Design decisions

- **Schematic, not cartographic.** M6.3 forbids inventing geographic detail and forbids mileage/drive-times/changing data. The map is therefore a **radial hub-and-spoke relationship diagram**: Vernal at center, five destinations as labeled nodes on plain spokes. It asserts only the true, evergreen fact that Vernal is the regional basecamp from which these destinations radiate. No roads, no coordinates, no distances, no compass direction are drawn — a `legend` note states this explicitly so the diagram is never mistaken for a to-scale map.
  - *Deviation from spec §4:* the `M-REGIONAL` layer list includes `drive-time-spokes` and a `north-arrow`. Both are **intentionally omitted here** — drive times are "changing information" (barred by M6.3) and a north arrow would make a compass claim the schematic doesn't support. Spokes are kept as plain connectors. Recorded in `M6_REUSABLE_MAP_SYSTEM.md` §3 implementation note.
- **Five spokes, one hub.** Nodes: Dinosaur National Monument, Flaming Gorge, Ashley National Forest, Red Fleet State Park, Steinaker State Park — all named in existing site content (`src/content/**`). McConkie Ranch and the High Uintas (also in the spec POI list) are **held for a future richer variant** to keep this base map uncluttered and readable at article widths across 25+ pages.

## Geometry (viewBox `0 0 1600 1200`, 4:3)

- Hub center: `(800, 610)`.
- Node centers: DNM `(1300,610)`, Flaming Gorge `(1190,315)`, Ashley NF `(360,315)`, Red Fleet `(345,910)`, Steinaker `(1215,910)`.
- Spokes drawn hub→node first, nodes/hub painted on top so lines read as pill-to-pill connectors.
- Title block top (`y≈70–162`); legend + honesty note bottom (`y≈1052–1128`); wheel occupies the middle band, clear of both.

## Palette (roles → tokens sampled from `public/styles.css`)

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Hub fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Hub text | `#FFFFFF` | `#FFFFFF` | — |
| Spoke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Node fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Node stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |

- **Accent discipline** (spec §3.5): the canyon-red hub + burnt-orange spokes are the reserved accent family (hub / connection / "you are here"); destinations are neutral sandstone so the hub is always the most salient element.
- **Theme-aware:** CSS custom properties flip via `@media (prefers-color-scheme: dark)` (works when the SVG is referenced as `<img>`/`og:image`) and via `:root[data-theme]` overrides (works when inlined and the host toggles theme).

## Typography

- `--font-heading` **Montserrat** (title, node, hub) and `--font-body` **Open Sans** (subtitle, legend), each with a robust system fallback stack (`'Segoe UI','Helvetica Neue',Arial,sans-serif`) so the asset renders correctly even where the brand webfonts are not loaded (e.g. `og:image` rendering, strict CSP). No external font is fetched by the SVG.
- Node labels use `paint-order:stroke` with a node-fill-colored halo so text stays legible over the pill.

## Contrast (WCAG)

- White on canyon-red hub `#C1440E` ≈ **5.1:1** (AA for all text sizes).
- Charcoal on sandstone node `#E8D5C4` ≈ **8:1** (AAA).
- Ink on land tint, and dark-mode equivalents, all clear **AA (≥4.5:1)**. Information is never encoded by color alone — every element is also labeled.

## Layer structure (SVG `<g id>` groups)

`layer-background` · `layer-title` · `layer-spokes` · `layer-destinations` · `layer-hub` · `layer-legend`. Decorative groups are `aria-hidden="true"`; the root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"`.

## Regeneration / extension notes

- To add a node: add a spoke `<line>` in `layer-spokes` and a node `<g>` (rect + label tspans) in `layer-destinations`; keep the node clear of the title/legend bands.
- To produce the `og:image` derivative (spec §3.2, 1200×630): rasterize on a crop that keeps the title + hub in the safe zone; compress to ≤500 KB WebP/AVIF for the metadata-hero gate. (Not produced in M6.3 — integration-phase task.)
- Keep the "not to scale" legend note whenever the schematic layout is used.
