# Source notes — Vernal Adventure Decision Tree (`G-DECISION-TREE`)

**Asset:** [`public/images/graphics/vernal-adventure-decision-tree.svg`](../../../public/images/graphics/vernal-adventure-decision-tree.svg)
**Library:** first asset in the **Decision Graphics** library (a sibling to, and distinct from, the reusable-map library in [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md)).
**Concept source:** [`docs/M5_IMPLEMENTATION_ROADMAP.md`](../../M5_IMPLEMENTATION_ROADMAP.md) §6 ("Decision trees" asset class) and [`docs/M5_EEAT_MEDIA_AUDIT.md`](../../M5_EEAT_MEDIA_AUDIT.md) (the "which spoke is right for you" selector concept).
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Visual language:** reuses the palette, typography, node-pill treatment, accent discipline, accessibility scaffold, and color model established by the map library ([`M-REGIONAL`](../../maps/source/vernal-regional-hub-and-spoke.README.md) and siblings), applied to a new decision-tree layout.
**Milestone:** M8.1 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Purpose

The reusable **maps** answer *"where"* (orientation). This graphic answers *"which experience is right for me"* — a **planning aid that helps a visitor choose among the site's major experiences by interest, not geography.** It is deliberately **not** a flowchart of the website or a sitemap; it is a decision tree whose leaves are the site's real experience clusters, each with a one-line description and its own in-depth guide.

## Repository references (every leaf traces to documented content)

Only experiences already documented on the site are shown; no activities, destinations, offerings, routes, or statistics are invented.

| Leaf (experience) | One-line descriptor | Documented in |
|---|---|---|
| **Dinosaurs** | Real fossils in the rock, petroglyphs & the Quarry | `src/content/dinosaur-national-monument/**` (visiting-DNM: Quarry Exhibit Hall / Wall of Bones; Cub Creek petroglyphs) |
| **UTV Adventure** | Guided KRX backcountry tours, no experience needed | `src/content/utv/**`, `src/pages/booking.astro` (Kawasaki KRX 1000, guided, "no prior off-road experience needed") |
| **Hiking** | Desert canyons to High Uintas alpine trails | `src/pages/hiking/index.astro`, `src/content/hiking/**` (the desert-vs-alpine "two worlds") |
| **Fishing** | Reservoirs, alpine lakes & a blue-ribbon river | `src/pages/fishing/index.astro`, `src/content/fishing/**` (Flaming Gorge, reservoirs, Uinta lakes, the Green River tailwater) |
| **Scenic Drives** | A byway & backcountry loops, seen from the car | `src/pages/scenic-drives/index.astro`, `src/content/scenic-drives/**` (Flaming Gorge–Uintas Byway; Red Cloud / Sheep Creek loops) |
| **Photography** | Red rock, alpine light & dark night skies | `src/content/hiking/photography-hikes-near-vernal`, `src/content/itineraries/photography-weekend-vernal` (red-rock, alpine, dark-sky) |
| **Family Activities** | Dinosaur tracks, easy trails & kid-friendly tours | `src/content/things-to-do/fun-things-to-do-vernal-utah-kids`, `hiking/family-hiking-near-vernal`, `utv/family-utv-guide-vernal`, Red Fleet dinosaur trackway |

The **root** ("What are you in the mood for?") and the **basecamp** framing ("all from a Vernal base") trace to the recurring site thesis that Vernal is the supply base for every experience.

## Decision logic

A single root fans to four **interest branches**, each leading to the experiences that satisfy that interest. Branches are grouped by *motivation*, which is how the site's own pillars frame the choice (goal-first, then destination):

- **SEE THE ICONS — fossils & deep time** → **Dinosaurs.** For first-timers who want the marquee, once-in-a-lifetime sights.
- **GET ACTIVE — out on the land** → **UTV Adventure**, **Hiking**, **Fishing.** For visitors who want to *do* something physical; the three active clusters.
- **TAKE IT IN — at your own pace** → **Scenic Drives**, **Photography.** For lower-effort, see-a-lot / make-images days.
- **WITH THE KIDS — family-friendly** → **Family Activities.** The cross-cutting family lane (kept as its own branch because the site treats "family" as a first-class planning axis, e.g. the family hiking / kids / family-UTV guides).

The logic is intentionally a *simplification* — Photography overlaps hiking and driving; families enjoy the active clusters too — so the graphic is labeled a **planning aid, not a rule**, and the honesty note states many trips mix several branches. This mirrors the site's own decision framing (choose an anchor by goal, then branch out).

## Geometry (viewBox `0 0 1600 1200`, 4:3) — left-to-right tree

- **Root** (canyon-red): `x=80 y=526 w=330 h=130 rx=20`, center `(245, 591)`.
- **Branch nodes** (sandstone): `x=480 w=290 h=84 rx=18`; centers at `cy = 231 / 471 / 771 / 951` (A/B/C/D), aligned to the centroid of each branch's leaves.
- **Leaf nodes** (sandstone): `x=870 w=660 h=98 rx=18`; `y = 182 + 120·i` for `i=0..6`; centers `cy = 231, 351, 471, 591, 711, 831, 951`.
- **Connectors:** cubic-Bézier `<path>`s (burnt-orange) from the root's right edge `(410,591)` to each branch, and from each branch's right edge `(770, branch-cy)` to each of its leaves' left edge `(870, leaf-cy)` — curves so the fan-outs read cleanly.
- **Inside each leaf:** decorative icon glyph at `(918, cy)`; experience name left-aligned at `x=985` baseline `cy-6` (font 27); one-line descriptor at `x=985` baseline `cy+24` (font 19).
- Title block top (`y≈60–138`); legend + one-line honesty note bottom (`y≈1048–1128`); the tree occupies the middle band, clear of both.

## Layer structure (numbered SVG `<g id>` groups, paint order)

`layer-1-background` · `layer-2-title` · `layer-3-connectors` · `layer-4-root` · `layer-5-branches` · `layer-6-leaves` · `layer-7-legend`. Decorative groups (`layer-1-background`, `layer-3-connectors`, and every leaf icon `<g>`) are `aria-hidden="true"` (9 nodes total); the root `<svg>` carries `role="img"` + `aria-labelledby="graphic-title graphic-desc"`.

## Typography

- `--font-heading` **Montserrat** (title, root, branch labels, experience names) and `--font-body` **Open Sans** (subtitle, branch subtitles, descriptors, legend), each with the system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched (SVG standard F4).
- Branch and leaf labels use `paint-order:stroke` with a node-fill-colored halo so text stays crisp over the pill.

## Palette (roles → tokens sampled from `public/styles.css`)

Identical role set to the map library (no new hue).

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note) | `#6E655C` | `#C9BEB2` | — |
| Root ("Start here") fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Root text | `#FFFFFF` | `#FFFFFF` | — |
| Connectors | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Node (branch/leaf) fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Node stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| Node text / icon glyph | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |

- **Accent discipline** (spec §3.5): canyon-red is reserved for the **root** ("start here / you are here" equivalent) and burnt-orange for the connectors; every experience leaf is neutral sandstone so the entry point stays the most salient element. Icon glyphs are neutral ink, never the accent.
- **All node text is charcoal, never ink-soft** (ink-soft on sandstone ≈3.6:1 fails AA); ink-soft appears only on the land tint (subtitle, honesty note, ≈4.7:1).
- **Color model — do NOT use `var()` for fills.** Concrete light-theme hex as presentation attributes on every element; theme-switching lives in the `<style>` block as a **dark-mode override only**. `librsvg`/`sharp` does not resolve `var()` — it would rasterize to black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Accessibility

- Root `<svg>` carries `role="img"` + `aria-labelledby="graphic-title graphic-desc"` → a meaningful `<title>` and a `<desc>` that walks the entire tree (root → four branches → seven experiences with descriptors) so assistive tech conveys the whole decision path.
- Decorative groups (background, connectors, all seven icon glyphs) are `aria-hidden="true"`.
- **Understandable without color:** the tree structure is carried by **position and connector lines**, not hue; every branch and leaf is labeled in text; each icon is paired with its experience name (never shape/color alone). The graphic is fully legible in monochrome.
- Live `<text>` (not outlined paths) so labels are selectable/searchable.
- When placed as `<img>` at integration time, the host element supplies page-specific `alt`; when inlined, the internal `role`+`aria-labelledby` provide the name.

## Contrast (WCAG)

- White on canyon-red root `#C1440E` ≈ **5.1:1** (AA all sizes).
- Charcoal `#3A3A3A` on sandstone node `#E8D5C4` ≈ **8:1** (AAA) — branch labels, experience names, descriptors, icons.
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, honesty note) ≈ **4.7:1** (AA).
- Dark-mode equivalents mirror the library's validated pairings (≥4.5:1).

## QA checklist (performed — M8.1, asset-only)

Rendered via the site's real toolchain (sharp 0.34.5 / libvips 8.17.3 / librsvg):

- **XML** well-formed (parsed clean with `xml.dom.minidom`). No `--` inside any comment.
- Rasterizes **non-black** — mean RGB **221.4** at 360 / 700 / 1200 / 1600 px, opaque (light theme intact; no `var()` regression).
- Visually verified at **360 / 700 / 1200 / 1600 px** — root, four branches, seven leaves, all icons, names, and descriptors legible at mobile width; connectors fan cleanly; no label overlap or overflow.
- `grep 'var('` → the only hit is the explanatory code comment; **zero `var()` in any fill/stroke/style**.
- Self-contained — no external `href`/`url()`, no `<script>`, no DOCTYPE (only the `xmlns` namespace URI). CSP-safe.
- Metadata present — `role="img"`, `<title>`, `<desc>`, `aria-labelledby`, 9 `aria-hidden` decoration nodes.
- Font fallback stack present in every `font-family`; every icon paired with a text label (color-independent).
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.
- Per the task, the **repository-wide** gates (`astro check`, `npm run build`, `validate-site`) were **not** run — they belong to the later integration milestone.

## Future integration targets (NOT done here)

A cross-cutting planning aid, best placed where visitors first orient to the whole region (one shared SVG, page-specific `alt` + caption each — never duplicate the file):

- **`guides/ultimate-guide-to-vernal-utah`** (the flagship regional pillar — the natural home for "choose your experience").
- **`things-to-do/` pillar** and **`itineraries/` pillar** (planning-first surfaces).
- The **home page** / **about** if a top-of-funnel "what do you want to do here" aid is wanted.
- Consider each hub pillar getting a *hub-specific* decision graphic later (e.g. "which trail/water/drive is right for you"), per the M5 roadmap — this whole-site tree is the top-level entry; per-hub selectors are future assets in this same library.
- Place only where it genuinely aids planning; do not force it onto narrow spoke pages a single-topic selector would serve better.

## Regeneration / extension notes

- To add an experience: add a leaf `<g>` in `layer-6-leaves` (rect + icon glyph `<g transform>` + name + descriptor), add its connector `<path>` in `layer-3-connectors`, and re-space the leaf column (`y = start + pitch·i`); realign the parent branch's `cy` to the new leaf centroid. Only add repository-documented experiences.
- To add an interest branch: add a node in `layer-5-branches` + a root→branch connector, and keep the root `cy` near the branch centroid.
- Each icon glyph must **always be paired with its experience name** (never ship a glyph without its word).
- **Never** invent activities, destinations, offerings, routes, or statistics; keep the "planning aid, not a rule" honesty note.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file. Integration is a **separate, gated editorial-window step**, not part of asset production.
