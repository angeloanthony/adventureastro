# Source notes — Vernal Adventure Comparison Matrix (`G-COMPARISON-MATRIX`)

**Asset:** [`public/images/graphics/vernal-adventure-comparison-matrix.svg`](../../../public/images/graphics/vernal-adventure-comparison-matrix.svg)
**Library:** second asset in the **Decision Graphics** library (sibling to [`G-DECISION-TREE`](vernal-adventure-decision-tree.README.md); distinct from the reusable-map library in [`docs/M6_REUSABLE_MAP_SYSTEM.md`](../../M6_REUSABLE_MAP_SYSTEM.md)).
**Concept source:** [`docs/M5_IMPLEMENTATION_ROADMAP.md`](../../M5_IMPLEMENTATION_ROADMAP.md) §6 ("Comparison" asset class — e.g. "5-trail comparison," "rental vs guided," "fishing five-water matrix") and §1's "compare the primary experiences side-by-side" planning aid.
**Engineering standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) (authoritative for how the SVG is built).
**Visual language:** reuses the palette, typography, node-pill treatment, accent discipline, accessibility scaffold, and color model established by the map library and by the first Decision Graphic ([`G-DECISION-TREE`](vernal-adventure-decision-tree.README.md)), applied to a new table/matrix layout.
**Milestone:** M8.3 (asset production only; **not** integrated into any page).

This is the editable design record so the SVG can be regenerated/extended without re-deriving decisions. The SVG is hand-authored (no binary source app); this file *is* the source of truth for its design.

## Purpose

`G-DECISION-TREE` fans a visitor *from* an interest *to* one experience. This graphic does the complementary job: it lays the site's **five primary experiences side by side** so a visitor can compare them across a fixed set of planning attributes at a glance — "which of these fits my trip?" It is a **planning aid, not a ranking**: every mark reflects only what the site already documents about an experience, never a score, rating, statistic, or recommendation.

The five experiences are the site's five experience **pillars** (each has its own hub + in-depth guides). The two cross-cutting lenses from the decision tree — *Photography* and *Family* — are represented here as attribute **columns** rather than rows, which is the natural way to express them in a comparison and avoids the row/column overlap the decision-tree README flagged (photography and family cut across the other experiences).

## Repository references (every row and marked cell traces to documented content)

Only experiences and attributes already documented on the site are shown; no activities, offerings, rankings, scores, or statistics are invented. Evidence was gathered by reading each pillar index and its spokes; representative supporting phrases are quoted below.

### Rows (the five experiences)

| Row | One-line descriptor | Documented in |
|---|---|---|
| **Dinosaurs** | Fossils, rock art & the Quarry (DNM) | `src/content/dinosaur-national-monument/**`, `src/pages/dinosaur-national-monument/index.astro` |
| **UTV Adventure** | Guided KRX backcountry tours | `src/content/utv/**`, `src/pages/utv/index.astro`, `src/pages/booking.astro` |
| **Hiking** | Desert canyons to alpine trails | `src/content/hiking/**`, `src/pages/hiking/index.astro` |
| **Fishing** | Reservoirs, alpine lakes & a river | `src/content/fishing/**`, `src/pages/fishing/index.astro` |
| **Scenic Drives** | A byway & loops, seen from the car | `src/content/scenic-drives/**`, `src/pages/scenic-drives/index.astro` |

Descriptors reuse the vetted wording from `G-DECISION-TREE` (trimmed to the row-pill width). The **basecamp** framing ("all from your Vernal basecamp") traces to the recurring site thesis that Vernal is the supply base for every experience.

### Columns (the six attributes) and cell evidence

Each column is a **factual documentation attribute**, marked with a two-state, editorial-only marker (see "Comparison logic"). Supporting phrases:

| Column | Marked ✓ for | Supporting evidence (verbatim phrases) |
|---|---|---|
| **Good for families** | all five | DNM "one of the most kid-friendly national monuments in the West" + "Family Advice" section; `utv/family-utv-guide-vernal`; `hiking/family-hiking-near-vernal` + hiking pillar "best family-hiking region"; fishing pillar "best family-fishing region" + `fishing-red-fleet-reservoir` "The Family Angler's Guide"; scenic-drives pillar "Family-Friendly Drives" |
| **Guided tour (book on site)** | UTV only | utv pillar "five guided UTV trail tours" + `booking.astro` Cal.com booking of "guided Kawasaki KRX 1000" tours. DNM/hiking/fishing/scenic drives are self-guided **on this site** (fishing references third-party outfitters — "a charter," "worth a guide" — and DNM pairs with the adjacent UTV tour, but neither is booked/sold here) |
| **Relaxed, low-effort** | Dinosaurs, Hiking, Fishing, Scenic Drives | DNM "close to the car with short walks… you set the pace"; hiking accessibility tier "little or no walking from a parking area," "a stroller-friendly loop"; fishing "the lowest-commitment way," "a relaxed half-day"; scenic drives "the car is the trail… the effort dialed down." UTV is documented as an active adventure (no low-effort framing) |
| **Indoor / rainy-day** | Dinosaurs only | DNM "the Quarry Exhibit Hall, a climate-controlled building." No other experience documents an indoor/weather-sheltered component |
| **Year-round access** | Dinosaurs, Fishing, Scenic Drives | DNM "the grounds are open year-round" (winter-limited roads); fishing "you can fish year-round… no true off-season" (ice fishing in winter); scenic drives paved routes "maintained year-round." UTV "peak season runs May through October"; hiking seasonal by elevation ("high country is for snow travel only" in winter) |
| **Great for photos** | Dinosaurs, Hiking, Fishing, Scenic Drives | each of these pillars carries a dedicated Photography section ("genuinely photogenic," "warm, low light on red canyon walls," "also a photography trip," "a geology photographer's dream"). UTV is not documented as a photography subject |

**Deliberately conservative calls (to avoid over-claiming):**
- *Guided tour* means **booked/sold on this site** — true only for UTV. Fishing's third-party charters and DNM's ranger staffing / adjacent UTV pairing are real but are **not** a tour this site sells, so those cells are open rings; the nuance lives here in the README, not on the graphic.
- *Year-round* means "documented as accessible year-round in some core form." Winter caveats exist (DNM's unpaved/Colorado-side roads, scenic drives' high/unpaved loops) and are noted in the source content; the mark reflects the documented year-round core, not an all-conditions guarantee.

## Comparison logic

- **Two-state marker, documentation-only.** A **filled disc with a white check** = "the site documents this attribute for this experience." An **open ring** = "not a documented focus (it may still be possible on your own)." This is a binary reflection of what the copy says, **not** a rating, ranking, or score — nothing is measured or ordered.
- **Understandable without color.** The two states differ by **shape and fill** (a solid checked disc vs. a hollow ring), never by hue — legible in monochrome and at mobile width. Every row is labeled in text; every column is labeled in text; the `<desc>` enumerates each experience's documented attributes in full.
- **Honesty note (rendered on the asset).** "A planning aid, not a ranking or score — it shows only what the site documents. All five welcome families, and many trips combine several. Each experience has its own in-depth guide, all from your Vernal basecamp." This mirrors the decision tree's "planning aid, not a rule" discipline.
- **Cross-cutting lenses as columns.** Photography and Family are attribute columns (not rows) because they cut across the experiences — the correct axis for a comparison, and it prevents the overlap that a Photography/Family *row* would create against the other rows.

## Geometry (viewBox `0 0 1600 1200`, 4:3) — table layout

- **Row-header column:** `x=90 w=380` (right edge `470`); each experience is a sandstone pill `h=96 rx=18` with a left-aligned name (`x=112`, font 27) over a one-line descriptor (font 17).
- **Attribute columns:** six columns spanning `x=470 → 1520`, width `175` each; centers at `x = 557.5 / 732.5 / 907.5 / 1082.5 / 1257.5 / 1432.5`.
- **Header band:** `y≈200–298`. The **canyon-red basecamp corner badge** (`x=90 w=380 h=98 rx=18`) fills the otherwise-empty top-left cell; two-line column labels are centered on each column center (baselines `y=240 / 266`).
- **Data rows:** five rows, pitch `126`; centers at `y = 375 / 501 / 627 / 753 / 879`. Each cell marker is centered at `(column-center, row-center)`; filled discs `r=19`, open rings `r=16`.
- **Grid (decorative):** alternating row stripes on rows 1/3/5, a header underline at `y=308`, and five thin vertical column separators (`x = 645 / 820 / 995 / 1170 / 1345`).
- **Legend + honesty note:** `y≈1006–1120`, clear of the table band above.

## Layer structure (numbered SVG `<g id>` groups, paint order)

`layer-1-background` · `layer-2-title` · `layer-3-grid` (stripes + separators) · `layer-4-header` (corner badge + column labels) · `layer-5-rows` (experience pills) · `layer-6-cells` (30 markers) · `layer-7-legend`.
Decorative groups — `layer-1-background`, `layer-3-grid`, `layer-6-cells`, and the legend's marker key — are `aria-hidden="true"` (the markers are a visual restatement of what the `<desc>` spells out). The root `<svg>` carries `role="img"` + `aria-labelledby="graphic-title graphic-desc"`.

## Typography

- `--font-heading` **Montserrat** (title, badge, column labels, experience names) and `--font-body` **Open Sans** (subtitle, descriptors, legend, honesty note), each with the system fallback stack `'Segoe UI','Helvetica Neue',Arial,sans-serif` so the asset renders correctly where the brand webfonts are absent (`og:image` raster, isolated `<img>`, strict CSP). No external font is fetched (SVG standard F4).
- Row-header labels use `paint-order:stroke` with a node-fill-colored halo so text stays crisp over the pill.

## Palette (roles → tokens sampled from `public/styles.css`)

Identical role set to the map library and `G-DECISION-TREE` (no new hue).

| Role | Light | Dark | styles.css token |
|---|---|---|---|
| Canvas | `#FAF8F5` | `#201D1A` | `--off-white` |
| Land tint | `#F5EDE3` | `#2C2823` | `--light-sand` |
| Row stripe | `#F0E6D9` | `#262019` | — (between off-white and land) |
| Grid line | `#E2D2BF` | `#3E362F` | — |
| Ink (text) | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Ink-soft (subtitle/note/ring) | `#6E655C` | `#C9BEB2` | — |
| Basecamp badge fill | `#C1440E` | `#C1440E` | `--canyon-red` |
| Basecamp badge text | `#FFFFFF` | `#FFFFFF` | — |
| Node (row pill) fill | `#E8D5C4` | `#47403A` | `--sandstone` |
| Node stroke | `#D4764E` | `#E08A5F` | `--burnt-orange` |
| "Documented" disc + node text | `#3A3A3A` | `#F5EDE3` | `--charcoal` / inv |
| Check mark (knockout) | `#FAF8F5` | `#201D1A` | canvas |

- **Accent discipline** (spec §3.5): canyon-red is reserved for the single **basecamp badge** (the "you are here / start" equivalent); burnt-orange for the node-pill strokes; everything else is neutral sandstone/ink so no cell or column is visually privileged over another. Markers are neutral ink, **never** the accent — a comparison must not color-code a "winner."
- **All row-pill text is charcoal, never ink-soft** (ink-soft on sandstone ≈3.6:1 fails AA); ink-soft appears only on the land tint (subtitle, honesty note) and as the low-emphasis "not documented" ring.
- **Color model — do NOT use CSS custom properties for fills.** Concrete light-theme hex as presentation attributes on every element; theme-switching lives in the `<style>` block as a **dark-mode override only**. `librsvg`/`sharp` does not resolve custom properties — it would rasterize to black (SVG standard F1). Light is the universal fallback; dark is browser-only enhancement.

## Accessibility

- Root `<svg>` carries `role="img"` + `aria-labelledby="graphic-title graphic-desc"` → a meaningful `<title>` and a `<desc>` that walks the whole matrix: it names the six attributes, defines the two marker states, and for **each** of the five experiences lists which attributes are documented and which are not — so assistive tech conveys the entire comparison without seeing the grid.
- Decorative groups (background, grid/stripes, all 30 cell markers, the legend marker key) are `aria-hidden="true"`.
- **Understandable without color:** state is carried by **shape/fill** (checked disc vs. hollow ring), not hue; every row and column is labeled in text; the legend defines both markers in words. Fully legible in monochrome.
- Live `<text>` (not outlined paths) so labels are selectable/searchable.
- When placed as `<img>` at integration time, the host element supplies page-specific `alt`; when inlined, the internal `role`+`aria-labelledby` provide the name.

## Contrast (WCAG)

- White on canyon-red badge `#C1440E` ≈ **5.1:1** (AA all sizes).
- Charcoal `#3A3A3A` on sandstone pill `#E8D5C4` ≈ **8:1** (AAA) — experience names, descriptors.
- Charcoal on land/stripe (column labels, filled discs) ≈ **8–9:1**.
- White check knockout on charcoal disc ≈ **10:1**.
- Ink-soft `#6E655C` on land `#F5EDE3` (subtitle, honesty note) ≈ **4.7:1** (AA); the low-emphasis "not documented" ring on stripe `#F0E6D9` ≈ **4.8:1** — a non-text graphic well above the 3:1 threshold.
- Dark-mode equivalents mirror the library's validated pairings (≥4.5:1 text, ≥3:1 graphics).

## QA checklist (performed — M8.3, asset-only)

Rendered via the site's real toolchain (sharp 0.34.5 / libvips 8.17.3 / librsvg):

- **XML** well-formed (parsed clean with `xml.dom.minidom`). No `--` inside any comment.
- Rasterizes **non-black** — mean RGB **224.9** at 360 / 700 / 1200 / 1600 px, opaque (light theme intact; no custom-property/black regression).
- Visually verified at **1200 px and 360 px** — title, subtitle, basecamp badge, six column headers, five experience pills, all 30 cell markers, legend, and honesty note legible at mobile width; the checked-disc vs. hollow-ring distinction survives at 360 px; row striping + separators align; no label overlap or overflow.
- `grep 'var('` → **zero hits** anywhere (the comment intentionally says "CSS custom properties," not the literal token, so the grep is truly empty).
- Self-contained — no external `href`/`url()`, no `<script>`, no `<!DOCTYPE>` (only the `xmlns` namespace URI). CSP-safe. (A case-insensitive grep for "doctype" matches only the explanatory word inside a comment.)
- Metadata present — `role="img"`, `<title>`, `<desc>`, `aria-labelledby`, decorative groups `aria-hidden`.
- Font fallback stack present in every `font-family`; every marker is defined in the text legend and the `<desc>` (never shape/color alone).
- **Dark mode** is authored as an override-only `<style>` block; per SVG standard F2 the rasterizer cannot test it — verify visually in a browser at integration time.
- Per the task, the **repository-wide** gates (`astro check`, `npm run build`, `validate-site`) were **not** run — they belong to the later integration milestone.

## Future integration targets (NOT done here)

A whole-region comparison aid, best placed where a visitor is choosing among experiences (one shared SVG, page-specific `alt` + caption each — never duplicate the file):

- **`guides/ultimate-guide-to-vernal-utah`** (the flagship regional pillar — the natural home for "compare the experiences," alongside `G-DECISION-TREE`).
- **`itineraries/` pillar** and **`things-to-do/` pillar** (planning-first surfaces where visitors weigh options).
- The **home page** / **about** if a top-of-funnel "here's what Dinosaur Country offers" comparison is wanted.
- Consider **hub-specific comparison matrices** later (per the M5 roadmap §6: 5-trail comparison, rental-vs-guided, fishing five-water matrix) — this whole-site matrix is the top-level entry; per-hub comparisons are future assets in this same library.
- Place only where it genuinely aids planning; do not force it onto a narrow spoke a single-topic comparison would serve better.

## Regeneration / extension notes

- To add an experience (row): add a pill `<g>` in `layer-5-rows`, add its six markers in `layer-6-cells`, extend the row striping/separators, and re-space the row column (`y = start + pitch·i`). Only add repository-documented experiences, and mark a cell ✓ **only** where a supporting phrase exists (record it in the evidence table above).
- To add an attribute (column): add a two-line header in `layer-4-header`, one marker per row in `layer-6-cells`, a separator in `layer-3-grid`, and re-space the column centers. Keep the marker **binary and documentation-only** — never introduce a third "better/worse" state, a numeric score, or an accent-colored cell; that would turn the aid into a ranking.
- Keep the honesty note and the "not a ranking" framing in every revision; update the `<desc>` whenever a row, column, or cell changes so the accessible description stays in lockstep with the grid.
- **Never** invent activities, offerings, rankings, scores, or statistics.
- Reuse is by referencing this one file from many pages with per-page `alt` + caption — never by duplicating the file. Integration is a **separate, gated editorial-window step**, not part of asset production.
