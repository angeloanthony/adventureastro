# Source notes — Dinosaur Country Overview Map (`M-DINO-COUNTRY`)

**Asset:** [`public/images/maps/vernal-dinosaur-country-overview.svg`](../../../public/images/maps/vernal-dinosaur-country-overview.svg)
**Spec:** [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md) — map ID `M-DINO-COUNTRY` (Tier A base geography; the wide brand-level frame).
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Derives from:** [`M-REGIONAL`](vernal-regional-hub-and-spoke.README.md) — same palette, typography, layer structure, and accessibility scaffold, zoomed out to the region-wide "where is Dinosaur Country" frame.
**Milestone:** M7.4 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Purpose & how it differs from M-REGIONAL

M-REGIONAL is the tight wheel of the five nearby destinations (DNM, Flaming Gorge, Ashley NF, Red Fleet, Steinaker) — the "day-trips from Vernal" frame. **M-DINO-COUNTRY is the wider, top-of-funnel brand frame:** it answers "where *is* Dinosaur Country?" by showing Vernal as the basecamp of a **multi-state region**. To stay clearly distinct (and avoid re-drawing the same wheel), its nodes are the region's four broad **realms** — not the five specific parks — and each realm carries its **state reach**, which is the story a wide-context map exists to tell:

| Realm node | State-reach tag | Established in repo |
|---|---|---|
| Dinosaur National Monument | UTAH · COLORADO | `dinosaur-national-monument/**`, `hiking/best-hikes-in-dinosaur-national-monument` ("two states", "Colorado border") |
| Flaming Gorge | UTAH · WYOMING | `fishing/fishing-flaming-gorge`, `guides/ultimate-guide-to-flaming-gorge`, `camping/camping-at-flaming-gorge` ("straddles Utah and Wyoming", "into Wyoming", reciprocal license) |
| High Uintas & Ashley National Forest | UTAH'S HIGH COUNTRY | `guides/ultimate-guide-to-ashley-national-forest`, `guides/ultimate-guide-to-vernal-utah` |
| The Uintah Basin | HIGH-DESERT COUNTRY | `guides/ultimate-guide-to-vernal-utah`, `dinosaur-national-monument/petroglyphs-rock-art-vernal` |

## Design decisions

- **Schematic, not cartographic — same model as M-REGIONAL / M-UTV.** The repository holds **no** verified coordinates, boundaries, drive times, mileage, or route geometry, and inventing them would violate the site's no-invented-facts rule and the explicit M7.4 constraints. The map is therefore a **radial basecamp-and-realms diagram**: Vernal at center, four realms on plain spokes. It asserts only true, evergreen facts — that Vernal is the basecamp and that these realms exist and reach across the states named. A legend honesty note states it is not to scale/distance/direction, and that **state labels show reach, not a mapped boundary.**
- **No `drive-time-spokes`, `north-arrow`, `basemap/relief`, or `boundaries` layers.** The M6.2 §4 layer list for M-DINO-COUNTRY includes relief and jurisdiction boundaries; all four are **intentionally omitted here.** Drive times/mileage are barred (changing info); a north arrow would assert a compass relationship the schematic doesn't support; relief needs a raster base + attribution the repo can't yet source; and drawing jurisdiction/state **boundaries** is explicitly forbidden by the M7.4 task. State reach is conveyed by **text tags**, never by a drawn border. (Recorded as a deliberate deviation, mirroring the M-REGIONAL M6.3 implementation note; when a to-scale cartographic variant is later produced against verified geography, those layers can be reintroduced.)
- **Four realms, one basecamp.** A four-node plus/cross layout (top/bottom/left/right around the hub) is deliberately different from M-REGIONAL's five-node ring, so the two maps never read as duplicates at a glance.
- **State names are stable facts, not geographic precision.** UT/CO for the monument and UT/WY for Flaming Gorge are evergreen, repeatedly documented in content. They describe *which states an area extends across*, which is the entire point of a wide-region frame — they are not coordinates, distances, or borders.

## Geometry (viewBox `0 0 1600 1200`, 4:3)

- Hub (basecamp) center: `(800, 610)`; hub rect `x=648 y=544 w=304 h=132 rx=24` (identical to M-REGIONAL).
- Realm node centers: Flaming Gorge `(800,315)`, Dinosaur NM `(1240,610)`, Uintah Basin `(800,910)`, High Uintas/Ashley `(360,610)`.
- Node pills `rx=20`: single-line realms `~380–420 × 118`; two-line realms (DNM, High Uintas/Ashley) `~400–456 × 160`. Inside each: realm name (font 32–40) + a letter-spaced uppercase **state/context tag** (font 20–22).
- Spokes drawn hub→node center first; pills and hub painted on top so lines read pill-to-pill.
- Title block top (`y≈70–160`); legend + two-line honesty note bottom (`y≈1052–1146`); realms occupy the middle band, clear of both.

## Palette (roles → tokens sampled from `public/styles.css`)

Identical role set to M-REGIONAL (no new roles introduced — the water role from M-UTV is not used here).

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note) | `#6E655C` | `#C9BEB2` | — |
| Hub (basecamp) fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Hub text | `#FFFFFF` | `#FFFFFF` | — |
| Spoke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Node fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Node stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Realm name + state tag | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |

- **Accent discipline** (spec §3.5): canyon-red hub + burnt-orange spokes are the reserved accent family (basecamp / connection / "you are here"); the four realms are neutral sandstone pills of equal weight, so the basecamp is always the most salient element.
- **State tags stay charcoal (not accent, not ink-soft).** They are set in `--charcoal` — the same colour as the realm name, differentiated only by size, weight (Open Sans 400), letter-spacing, and caps — so they clear **AAA on sandstone (≈8:1)**. Ink-soft (`#6E655C`) on the sandstone pill would fall below AA (~3.6:1), so it is deliberately *not* used inside nodes; ink-soft appears only on the land tint (subtitle, honesty note) where it clears AA (≈4.7:1).
- **Color model — do NOT use `var()` for fills.** Concrete light-theme hex values are set as **presentation attributes** on every element. Theme-switching lives in the `<style>` block as a **dark-mode override only** (class selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]`). `librsvg`/`sharp` (the engine behind `astro:assets` and og:image) does not resolve `var()` — it would rasterize to black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Typography

- `--font-heading` **Montserrat** (title, realm names, hub) and `--font-body` **Open Sans** (subtitle, state tags, legend), each with the system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched by the SVG (SVG standard F4).
- Realm names and state tags use `paint-order:stroke` with a node-fill-colored halo so text stays legible over the pill.

## Contrast (WCAG)

- White on canyon-red hub `#C1440E` ≈ **5.1:1** (AA all sizes).
- Charcoal `#3A3A3A` on sandstone node `#E8D5C4` ≈ **8:1** (AAA) — realm names and state tags.
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, honesty note) ≈ **4.7:1** (AA).
- Dark-mode equivalents mirror M-REGIONAL's validated pairings (≥4.5:1). Information is never encoded by color alone — every realm and its reach are also labeled in text.

## Layer structure (SVG `<g id>` groups, paint order)

`layer-background` · `layer-title` · `layer-spokes` · `layer-destinations` (realms) · `layer-hub` · `layer-legend`. Decorative groups (`layer-background`, `layer-spokes`) are `aria-hidden="true"`; the root `<svg>` carries `role="img"` + `aria-labelledby="map-title map-desc"`.

## QA performed (M7.4)

Rendered via the site's real toolchain (sharp / libvips / librsvg):

- **XML** well-formed (parsed clean).
- Rasterizes **non-black** at 96 dpi (light theme intact; no `var()` regression).
- Visually verified at **360 / 700 / 1200 / 1600 px** — realm names, state tags, and hub legible at mobile width; no label overlap/overflow.
- `grep 'var('` → empty. Self-contained (no external `href`/`url()`, no DOCTYPE). Metadata (`role`/`<title>`/`<desc>`/`aria-*`) present.
- `astro check` 0 errors; `npm run build` clean; `validate-site` green — no regression from adding the asset to `public/`.
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.

## Regeneration / extension notes

- To add a realm: add a spoke `<line>` in `layer-spokes` and a node `<g>` (rect + name/tag tspans) in `layer-destinations`; keep the pill clear of the title (`y<200`) and legend (`y>1000`) bands.
- To produce the `og:image` derivative (spec §3.2, 1200×630): rasterize from the **light** theme on a crop that keeps the title + basecamp hub in the safe zone; compress to **≤500 KB** WebP/AVIF for the metadata-hero gate. (Not produced in M7.4 — integration-phase task.)
- Keep the honesty note (not to scale/distance/direction) and the "state labels show reach, not a boundary" clause whenever this schematic layout is used. Never add coordinates, drive times, mileage, or drawn boundaries.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file (M6 §6). Integration (hero vs body, per the map spec §6) is a **separate, gated editorial-window step**, not part of asset production.
