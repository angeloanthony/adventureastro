# Source notes — Vernal Scenic Drives Overview Map (`M-SCENIC`)

**Asset:** [`public/images/maps/vernal-scenic-drives-overview.svg`](../../../public/images/maps/vernal-scenic-drives-overview.svg)
**Spec:** [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md) — map ID `M-SCENIC` (Tier B cluster overview; "the byway spine plus the loop drives as one connected network").
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Derives from:** the shared map-system conventions of [`M-REGIONAL`](vernal-regional-hub-and-spoke.README.md), [`M-UTV`](vernal-utv-trail-systems.README.md), [`M-DINO-COUNTRY`](vernal-dinosaur-country-overview.README.md), [`M-DNM-ORIENT`](dinosaur-national-monument-orientation.README.md), [`M-HIKING`](vernal-hiking-regions.README.md), and [`M-FISHING`](vernal-fishing-waters-overview.README.md) — identical palette, typography, accessibility scaffold, and color model — but a **new stacked-route-row layout** (see below), so it is not a restyle of the radial base, the two-panel comparisons, or the 2×2 quadrant board.
**Milestone:** M7.11 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Purpose & why the layout differs

M-SCENIC exists to explain the orientation fact the scenic-drives pillar leads with: the region offers **"choice within reach" — a handful of distinct scenic drives, each a different kind of day, all from one Vernal base** ([`src/pages/scenic-drives/index.astro`](../../../src/pages/scenic-drives/index.astro), "Why Scenic Drives Matter Here" and the "Best Scenic Drives Overview" table). The objective is the **four major scenic driving experiences** — the four drives that have dedicated cornerstone spokes.

The six prior maps use a **radial hub-and-spoke** (M-REGIONAL, M-UTV, M-DINO-COUNTRY), a **two-panel comparison** (M-DNM-ORIENT, M-HIKING), or a **2×2 quadrant board** (M-FISHING). To read as part of the branded family *without* duplicating any sibling — and because a drive is a naturally *linear* thing best given a full-width lane — this map uses a **four stacked route-row board**: a canyon-red "Vernal — your basecamp" chip above four equal full-width rows, one per drive, each carrying a schematic **route-type glyph** (byway / loop / out-and-back), the drive name, and its documented "known for" character. Full-width rows also stay legible at 360 px (four side-by-side columns would not).

The purpose is **orientation and education, not navigation.** It shows *what kind of drive each is and that all four start from Vernal*, never a course, a mileage, a surface, or a season.

## What each row shows (every item traced to the repository)

Only the four drives with dedicated spokes are shown (the objective's "four major experiences"); the pillar's access routes and the Colorado-side Harpers Corner drive are deliberately excluded to keep the board to the four peers.

| Row | Drive | Route-type glyph + tag | "Known for" (descriptor) | Source (repository) |
|---|---|---|---|---|
| 1 | Flaming Gorge–Uintas Scenic Byway | one-way arrow · **BYWAY** | "Desert to forest to reservoir · geologic-time signs — the complete full-day tour" | pillar table ("Paved highway byway… Desert-to-forest-to-reservoir; geologic time signs… The complete full-day tour") + the byway section; spoke `flaming-gorge-uintas-scenic-byway` |
| 2 | Red Cloud Loop | loop ring · **LOOP** | "Uinta high country, forest, mountain reservoirs & solitude" | pillar ("Uinta high country, forest, reservoirs, solitude"; "loops north… and back"); spoke `red-cloud-loop-scenic-drive` |
| 3 | Sheep Creek Geological Loop | loop ring · **LOOP** | "Dramatically tilted, folded rock layers · a short canyon-geology showcase" | pillar ("Dramatic tilted rock layers, canyon geology… Short geology showcase"; "the loop winds through a canyon"); spoke `sheep-creek-geological-loop` |
| 4 | Cub Creek Road — Tour of the Tilted Rocks | out-and-back double arrow · **OUT & BACK** | "Fremont petroglyphs, dinosaur geology & the Josie Morris cabin · DNM, Utah side" | pillar ("Petroglyphs, dinosaur geology, Josie Morris cabin"; "Utah side of Dinosaur National Monument"); spoke `cub-creek-road-tour-of-the-tilted-rocks` ("a there-and-back drive rather than a loop") |
| Chip | — | — | "VERNAL · YOUR BASECAMP FOR ALL FOUR DRIVES" | pillar: "all from the same hotel"; "Base in Vernal" |

**Route-type is a documented conceptual attribute, not geometry.** "Byway," "loop," and "out-and-back" describe each drive's *kind* (all stated in the repo — the two Loops are named as loops; Cub Creek is documented as "there-and-back"; the byway "follows US-191… then connects via SR-44"), so the glyph is a schematic *type* symbol, exactly as M-UTV uses terrain glyphs and M-FISHING uses water symbols.

## Design decisions

- **Schematic, not cartographic.** The M7.11 task and the whole map system bar inventing route geometry, mileage, drive times, road-surface classifications, elevation, coordinates, seasonal openings, or closures — the map draws and states **none** of these. The route glyphs are abstract *type* marks (an arrow, a ring, a double arrow), never a drive's real course. A three-line legend honesty note states this outright.
- **No surface / no season on the face.** The pillar documents surfaces ("paved + improved gravel") and seasonal status ("seasonal," winter closures) — both are **omitted** from the map because road classification and seasonal openings/closures are explicitly barred here (and change). The honesty note points the reader to the managing agency to verify conditions, seasons, and fees.
- **No Harpers Corner / access routes.** The pillar also covers the Colorado-side Harpers Corner drive and the Vernal→Flaming Gorge / →Red Fleet / →Ashley access runs; these are **not** among the four dedicated scenic-drive spokes, so they are left off to keep the board to the four peer "experiences" the objective names.
- **Accent discipline preserved (spec §3.5).** Canyon-red is reserved for *"your basecamp / you are here."* Vernal is the single canyon-red element (the header chip), expressing that all four drives begin from it. The four drive rows are equal-weight neutral sandstone; the route glyphs are neutral charcoal, never the accent.
- **Reading order, not compass or map position.** The rows are ordered most-complete → backcountry → short-geology → monument (roughly the pillar's own table order); their stacking implies no direction, distance, or geographic arrangement (honesty note: not to direction).
- **Not color-alone.** Every drive, route type, and descriptor is labeled in text; each route glyph is paired with its caps tag word (BYWAY / LOOP / OUT & BACK), so meaning is never carried by shape or color alone (SVG standard §5). The map is fully understandable in monochrome.

## Geometry (viewBox `0 0 1600 1200`, 4:3)

- **Vernal basecamp chip:** `rect x=450 y=182 w=700 h=52 rx=16` (canyon-red), centered under the title.
- **Four route rows** (`rx=20`, sandstone): `x=90 w=1420 h=150`; `y = 248 / 414 / 580 / 746` (16 px gaps); row centers `cy = 323 / 489 / 655 / 821`.
- **Inside each row:** route-type glyph centered at `(186, cy)`; caps type tag at `(186, cy+45)`; a faint vertical divider at `x=272`; drive name left-aligned at `x=300`, baseline `cy-6` (font 33); "known for" line at `x=300`, baseline `cy+34` (font 23). All row text is charcoal.
- Title block top (`y≈60–150`); legend at `y≈962–988`; three-line honesty note `y≈1070–1138`; the chip + four rows occupy the middle band, clear of both.

## Layer structure (SVG `<g id>` groups, numbered paint order)

`layer-1-background` · `layer-2-title` · `layer-3-basecamp` (Vernal chip) · `layer-4-drives` (the four rows) · `layer-5-legend`. Decorative elements (`layer-1-background`, every route-type glyph `<g>`, and the row dividers) are `aria-hidden="true"` (9 nodes total); the root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"`.

## Typography

- `--font-heading` **Montserrat** (title, drive names, Vernal chip) and `--font-body` **Open Sans** (subtitle, type tags, descriptors, legend), each with the system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched by the SVG (SVG standard F4).
- Drive names, tags, and descriptors use `paint-order:stroke` with a panel-fill-colored halo so text stays crisp over the sandstone row.

## Palette (roles → tokens sampled from `public/styles.css`)

Identical role set to M-REGIONAL/M-DINO-COUNTRY (no new hue; the route glyphs reuse the charcoal ink role, like M-UTV's terrain glyphs).

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note) | `#6E655C` | `#C9BEB2` | — |
| Basecamp (Vernal) fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Basecamp text | `#FFFFFF` | `#FFFFFF` | — |
| Row fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Row stroke / divider | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Drive name / descriptor / tag | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Route-type glyph | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |

- **All row text is charcoal, never ink-soft.** Ink-soft (`#6E655C`) on sandstone (`#E8D5C4`) would fall below AA (~3.6:1); every row label is charcoal (~8:1). Ink-soft appears only on the land tint (subtitle, honesty note), where it clears AA (≈4.7:1). Same rule as the sibling maps.
- **Color model — do NOT use `var()` for fills.** Concrete light-theme hex values are set as **presentation attributes** on every element; theme-switching lives in the `<style>` block as a **dark-mode override only** (class selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`). `librsvg`/`sharp` does not resolve `var()` — it would rasterize to black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Contrast (WCAG)

- Charcoal `#3A3A3A` on sandstone row `#E8D5C4` ≈ **8:1** (AAA) — drive names, descriptors, tags, glyphs.
- White on canyon-red Vernal chip `#C1440E` ≈ **5.1:1** (AA all sizes).
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, honesty note) ≈ **4.7:1** (AA).
- Dark-mode equivalents mirror the library's validated pairings (≥4.5:1). Information is never encoded by color alone — every drive, route type, and descriptor is labeled in text.

## Accessibility

- Root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"` → a meaningful `<title>` and a descriptive `<desc>` conveying the four-drives-from-one-basecamp relationship.
- Decorative groups (background, the four route-type glyphs, and the row dividers) are `aria-hidden="true"` (9 nodes total).
- Not color-alone; AA on every label; live `<text>` (not outlined paths) so labels are selectable/searchable; each glyph is paired with its caps tag word.
- When placed as `<img>` at integration time, the host element supplies page-specific `alt`; when inlined, the internal `role`+`aria-labelledby` provide the name.

## QA checklist (performed — M7.11, asset-only)

Rendered via the site's real toolchain (sharp 0.34.5 / libvips 8.17.3 / librsvg):

- **XML** well-formed (parsed clean with `xml.dom.minidom`). *(Note: an initial draft failed because inline row comments used `<!-- ---- Row … ---- -->`; the `----` is an illegal `--` inside an XML comment. Reworded to single-hyphen comments — a reminder never to put `--` or `----` inside an SVG comment.)*
- Rasterizes **non-black** — mean RGB **217.9** at 360 / 700 / 1200 / 1600 px, opaque (light theme intact; no `var()` regression).
- Visually verified at **360 / 700 / 1200 / 1600 px** — all four drive names, descriptors, route glyphs, type tags, the Vernal chip, and the legend legible at mobile width; no label overlap or overflow (full-width rows render well small).
- `grep 'var('` → the only hit is the explanatory code comment; **zero `var()` in any fill/stroke/style**.
- Self-contained — no external `href`/`url()`, no `<script>`, no DOCTYPE (only the `xmlns` namespace URI). CSP-safe.
- Metadata present — `role="img"`, `<title>`, `<desc>`, `aria-labelledby`, 9 `aria-hidden` decoration nodes.
- Font fallback stack present in every `font-family`.
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.
- Per the task, the **repository-wide** gates (`astro check`, `npm run build`, `validate-site`) were **not** run — they belong to the later integration milestone.

## Future integration targets (NOT done here)

Per the map spec §6 reuse plan, the natural body-image consumers are the scenic-drives cluster (one shared SVG, page-specific `alt` + caption each — never duplicate the file):

- `scenic-drives/` **pillar** (orientation block near "Best Scenic Drives Overview" / "Choosing the Right Drive").
- The four scenic-drive spokes: `flaming-gorge-uintas-scenic-byway`, `red-cloud-loop-scenic-drive`, `sheep-creek-geological-loop`, and `cub-creek-road-tour-of-the-tilted-rocks` — each framed to its own drive.
  - **Note:** `cub-creek-road-tour-of-the-tilted-rocks` already carries `M-DNM-ORIENT` (placed in M7.7). Evaluate at integration time whether it also benefits from this cluster-level map or whether that would be visual repetition — likely place M-SCENIC only if it adds orientation the DNM map doesn't.
- Consider `guides/ultimate-guide-to-flaming-gorge` (the byway/Sheep Creek end) where the drive network is part of the story. Place only where it genuinely improves orientation; do not force it.

## Regeneration / extension notes

- To add a drive: append a row `<g>` in `layer-4-drives` (rect + route-type glyph `<g transform>` + tag + name + descriptor), shift the legend/notes down, and keep rows clear of the title (`y<244`) and legend (`y>950`) bands. Only add repository-documented drives.
- To add a route type: define a new glyph and **always pair it with a caps tag word** (never ship a glyph without its word).
- **Never** add route geometry, mileage, drive times, road-surface classifications, elevation, a north arrow, coordinates, or seasonal open/close status. Keep the honesty note and the "symbols show route type, not a mapped course" clause whenever this layout is used.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file (M6 §6). Integration (body-image, per the map spec §6) is a **separate, gated editorial-window step**, not part of asset production.
