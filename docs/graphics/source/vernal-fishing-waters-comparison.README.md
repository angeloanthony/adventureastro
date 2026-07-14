# Source note — `vernal-fishing-waters-comparison.svg` (G-FISHING-WATERS)

**Type:** Comparison matrix (Comparison Graphics library) · **viewBox:** `0 0 1600 1200`
**Standard:** [`docs/SVG_ENGINEERING_STANDARD.md`](../../SVG_ENGINEERING_STANDARD.md) · **Companion map:** `public/images/maps/vernal-fishing-waters-overview.svg` (where the waters are / how they group; this matrix is how they compare).

## Purpose
Answers "which water for which angler?" as a scannable matrix — a complement to the spatial fishing-waters map, deployed on `src/pages/fishing/index.astro` right after that map, before the per-water deep-dives.

## Facts → source (no invented content)
Every cell traces to `src/content/fishing/**` and the fishing map's documented descriptors:

| Water | Known for | Type | Access | Best for |
|---|---|---|---|---|
| Flaming Gorge | Trophy lake trout & big browns | Big reservoir (UT–WY) | Boat water | Trophy hunting |
| Green River | Wild blue-ribbon trout | Tailwater below the dam | Float or wade | Fly anglers |
| Red Fleet | Trout, bass & bluegill | Close-to-town reservoir | Easy family shore | Families |
| Steinaker | Trout, bass & bluegill | The closest reservoir | Easy family shore | Quick local trips |

**Access is qualitative** (boat / shore / float, close / farthest) — no exact drive time or mileage is asserted, since those are `VERIFY WITH OFFICIAL SOURCE` in content. The footnote reminds readers to confirm regulations.

## Palette → tokens (light theme; hardcoded per F1/F3)
Same family as the other matrices: canvas `#FAF8F5` · header `#E8D5C4` · stripe `#F0E6D9` · ink `#3A3A3A` · ink-soft `#6E655C` · water tab `#4E86A8` (sky-blue accent, echoing the fishing map's water role) · title `#C1440E` · grid `#E2D2BF`. Dark-mode override-only. Meaning carried by text, not color.

## QA (per standard §8)
XML well-formed ✓ · no `var()` ✓ · `role`/`<title>`/`<desc>`/`aria-labelledby` ✓ · rasterizes non-black (sharp mean ≈ 236) ✓ · live `<text>`, font fallback stacks ✓ · self-contained ✓.
