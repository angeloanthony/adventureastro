# Source note — `vernal-utv-trail-comparison.svg` (G-UTV-TRAILS)

**Type:** Comparison matrix (Comparison Graphics library) · **viewBox:** `0 0 1600 1200`
**Standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) · **Companion map:** `public/images/maps/vernal-utv-trail-systems.svg` (where the trails are; this matrix is how they differ).

## Purpose
Answers "how do the five UTV trails differ?" as a scannable at-a-glance matrix — a complement to the spatial trail-systems map, deployed on `src/content/utv/best-utv-trails-vernal.mdx` after the individual trail write-ups.

## Facts → source (no invented content)
Every cell traces to [`src/content/utv/best-utv-trails-vernal.mdx`](../../../src/content/utv/best-utv-trails-vernal.mdx):

| Trail | Terrain | Scenery | Best for | Skill | Source line(s) |
|---|---|---|---|---|---|
| Doc's Beach | Sandy desert washes | Green River corridor | First-timers & families | All levels — most accessible | §1 + FAQ "best for families" |
| Moonshine Arch | Red-rock canyons | Natural sandstone arch | Couples & small groups | All levels — more engaging | §2 |
| Ashley Gorge | Canyon corridor | Dramatic gorge walls | Backcountry seekers | All levels — attentive driving | §3 |
| Outlaw Trail | Mixed canyon & ridge | Butch Cassidy history, petroglyphs | History buffs | All levels — the best story | §4 |
| Asphalt Ridge | High ridge-top | 360° panoramic views | Big-view riders | All levels | §5 |

The site documents **all five as suitable for all skill levels**; the matrix compares character, not a difficulty ranking. Tour facts ($349/machine, up to 2 riders, 3-hour guided KRX 1000) are the sitewide-fixed figures.

## Palette → tokens (light theme; hardcoded per F1/F3)
canvas `#FAF8F5` · panel/header `#E8D5C4` · row stripe `#F0E6D9` · ink `#3A3A3A` · ink-soft `#6E655C` · accent tab `#D4764E` · title canyon-red `#C1440E` · grid `#E2D2BF`. Dark-mode override via `.class` selectors under `@media (prefers-color-scheme: dark)` + `:root[data-theme="dark"]` (override-only; light is the complete raster fallback).

## QA (per standard §8)
XML well-formed ✓ · no `var()` ✓ · `role`/`<title>`/`<desc>`/`aria-labelledby` present ✓ · rasterizes non-black (sharp mean ≈ 236) ✓ · live `<text>`, font fallback stacks ✓ · self-contained, no external refs/DOCTYPE ✓ · info carried by text, not color alone ✓.
