# Source note — `vernal-elevation-profile.svg` (G-ELEVATION)

**Type:** Elevation-ladder diagram (Comparison Graphics library) · **viewBox:** `0 0 1600 1200`
**Standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md)

## Purpose
Visualizes why a single Vernal basecamp reaches both red-rock desert canyons and high-mountain trails — the "two worlds" range the hiking hub's Quick Answer describes. Deployed on `src/pages/hiking/index.astro` after the Quick Answer.

## Factual discipline (no invented numbers)
Only **two** elevations are asserted, and both are documented sitewide:
- **Vernal 5,331 ft** — stated in `guides/ultimate-guide-to-vernal-utah`, `guides/vernal-weather-guide`, `pages/hiking/index`, etc.
- **Kings Peak 13,528 ft, highest point in Utah** — stated across the hiking cluster.

Intermediate **band heights are illustrative of order, not exact elevation** (stated in `<desc>` and the on-graphic footnote). Zone content traces to documented hiking content:
- High-desert basecamp → `hiking/best-hikes-in-dinosaur-national-monument`, DNM cluster, `utv/**`
- Foothills & montane forest → `guides/ultimate-guide-to-ashley-national-forest`
- Subalpine forest & alpine lakes → `hiking/alpine-lakes-hiking-high-uintas`, `high-uintas-day-hikes`
- Alpine tundra / Kings Peak → `hiking/kings-peak-hiking-guide`, `high-uintas-backpacking-guide`

## Palette → tokens (light theme; hardcoded per F1/F3)
canvas `#FAF8F5` · zones bottom→top `#E8D5C4` / `#E2D2BF` / `#E4E4D2` / `#DCE4E8` (warm-desert → cool-alpine, all AA contrast with `#3A3A3A` ink) · axis/muted `#6E655C` · endpoint markers canyon-red `#C1440E`. Elevation is conveyed by **position + label**, never color alone. Dark-mode override-only via `.class` selectors.

## QA (per standard §8)
XML well-formed ✓ · no `var()` ✓ · `role`/`<title>`/`<desc>`/`aria-labelledby` ✓ · rasterizes non-black (sharp mean ≈ 227) ✓ · live `<text>`, font fallback stacks ✓ · self-contained ✓.
