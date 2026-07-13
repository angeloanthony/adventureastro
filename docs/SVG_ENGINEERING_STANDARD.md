# SVG Engineering Standard

**Adventure Tours Vernal · Dinosaur Country**
Prepared: July 2026 (M6.4 — SVG Asset Pipeline Validation)
Status: **permanent engineering standard** for every hand-authored SVG asset on the site (maps, diagrams, infographics, icons). Companion to [`docs/M6_REUSABLE_MAP_SYSTEM.md`](M6_REUSABLE_MAP_SYSTEM.md).

This standard was validated against the first production SVG asset, [`public/images/maps/vernal-regional-hub-and-spoke.svg`](../public/images/maps/vernal-regional-hub-and-spoke.svg) (map `M-REGIONAL`), running the site's real toolchain. Every rule below is backed by a reproduced test result (see §Findings). Architecture is FROZEN — this document sets authoring conventions; it does **not** add a build step, dependency, validator, or CSS.

## Validated toolchain (measured)

| Component | Version | Role |
|---|---|---|
| Astro | 6.4.4 | `public/` served verbatim; `astro:assets` transforms `src/` imports only |
| `@astrojs/mdx` | 6.0.3 | article rendering |
| sharp | 0.34.5 | image rasterization (hero compression, og:image) |
| libvips | 8.17.3 | sharp backend |
| librsvg | present (via libvips) | **the SVG→raster engine** behind sharp / `astro:assets` / og:image |

---

## 1. Findings (evidence base)

Each finding was reproduced on the real toolchain; results are quoted.

**F1 — `var()` custom properties do NOT work in rasterized SVG.** A `<rect fill="var(--c)">` rasterized via sharp/librsvg produced **mean RGB 0.0 (solid black)**; the identical rect with `fill="#3A86FF"` produced **mean 149.0 (correct blue)**. librsvg does not resolve CSS custom properties. *Impact: any SVG relying on `var()` for fills is destroyed when used as an og:image or through `astro:assets`.*

**F2 — `@media (prefers-color-scheme: dark)` is ignored by the rasterizer.** An SVG whose dark rule sets `fill:#000` rasterized to **mean 255.0 (light kept)**. librsvg always renders the light/base state. *Impact: dark mode is a browser-only progressive enhancement; the rasterized fallback is always the light theme, so the light theme must be complete and correct on its own.*

**F3 — Presentation attributes are the universal color model.** Concrete `fill="#hex"` / `stroke="#hex"` attributes render correctly in **all** contexts (browser inline, browser `<img>`, librsvg raster). This is the required baseline; CSS is layered on top only for the dark override.

**F4 — Webfonts do not cross the SVG document boundary.** The brand fonts (Montserrat/Open Sans) are page webfonts. They apply to an SVG **only when it is inlined** into the page DOM. When the SVG is referenced as `<img src>`, a CSS `background`, or rasterized, it is an isolated document with no access to page `@font-face`, and the **system-fallback stack renders instead**. The M-REGIONAL asset ships a robust fallback (`'Segoe UI','Helvetica Neue',Arial,sans-serif`) precisely for this reason.

**F5 — `public/` retains metadata 100%; rasterization discards it.** Files under `public/` are copied byte-for-byte (Astro does not process them), so `<title>`, `<desc>`, `role`, and `aria-*` survive intact — verified present in the served file. A rasterized derivative (og:image PNG/WebP) is a bitmap and carries **no** SVG text metadata; semantics must come from the host page's `alt`/`og:` tags.

**F6 — Default SVGO is mildly destructive; a safe config is not.** Default `svgo` removed `role="img"` (**1 → 0**) while keeping `<title>`/`<desc>`/`viewBox`/ids. A pinned safe config (below) preserved **all** of them and still rasterized correctly (mean 227.3). *Impact: never run default SVGO on an accessible asset.*

**F7 — Optimization savings are marginal on the wire.** M-REGIONAL: raw 8,666 B → gzip **2,525 B**; safe-optimized 5,458 B → gzip **1,597 B**. The CDN serves gzip/brotli, so the real difference is **< 1 KB**. Optimization is *optional polish*, not a requirement, and must never cost accessibility or a build-pipeline change.

**F8 — Self-contained = CSP-safe.** The asset has no external references (no remote `<image>`, no external font fetch, no `xlink:href` to other hosts) and no DOCTYPE/external DTD — it renders under a strict CSP and offline.

---

## 2. Required practices (MUST)

1. **Color via presentation attributes.** Every visible element carries a concrete `fill="#hex"` / `stroke="#hex"` **light-theme** value as an attribute. (F1, F3)
2. **Dark mode is override-only.** Put theme switching in an internal `<style>` block using **class selectors** under `@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`. Never rely on it for the base render. (F2)
3. **The light theme must be complete on its own** — it is the universal fallback for every rasterizer and non-CSS context. (F2, F5)
4. **`viewBox` is mandatory**; set it on the root `<svg>` for resolution independence and responsive scaling. Width/height attributes may accompany it but `viewBox` is what makes it scale.
5. **Font fallback stack required.** Every `font-family` lists the brand font first, then a system stack ending in a generic (`sans-serif`). Assume the brand font will be absent in `<img>`/og/raster contexts. (F4)
6. **Accessibility baseline (see §4).** Root `role="img"` + `aria-labelledby` → a meaningful `<title>` and a descriptive `<desc>`; decorative groups `aria-hidden="true"`.
7. **Self-contained.** No external fonts, images, scripts, or cross-host references; no DOCTYPE. (F8)
8. **Reusable brand assets live in `public/`** (served verbatim, metadata retained, stable URL for og:image + JSON-LD). Rendered *article-body* graphics that need per-page optimization may live in `src/` and go through `astro:assets` — but only if they contain no `var()` and no metadata that must survive. (F5, and the frozen image architecture in PROJECT_STATE)
9. **Numeric, named layer groups.** Structure content in `<g id="layer-…">` groups in paint order (background → connectors → nodes → labels → legend). (F6 keeps ids under safe optimization)
10. **A per-asset source note** in `docs/maps/source/<name>.README.md` (or `docs/<domain>/source/…`) recording geometry, palette→token mapping, and decisions, so the hand-authored SVG is regenerable.

## 3. Prohibited practices (MUST NOT)

1. **No CSS `var()` for any rendered fill/stroke/geometry.** It rasterizes to black. (F1) — the single most important rule.
2. **No reliance on `@media`/`data-theme` for the base appearance.** (F2)
3. **No default/aggressive SVGO.** Never run `svgo` without the safe config in §6; it strips `role` (and, on other versions, `viewBox`/`<title>`). (F6)
4. **No external references** (remote images, CDN fonts, `<script>`, external `xlink:href`). Breaks CSP, offline, and rasterization. (F8)
5. **No color-only meaning.** Never encode information by hue alone; pair with label/shape/pattern. (§4)
6. **No text as `<path>` outlines for body copy** unless legibility/licensing forces it — it destroys selectability, accessibility, and searchability, and bloats the file. (Live `<text>` preferred.)
7. **No build-pipeline / dependency / CSS changes to accommodate an SVG.** The pipeline is frozen; assets conform to it, not vice-versa.
8. **No unbounded precision** — avoid 6-decimal coordinate noise from design tools (see §5 optimization); it bloats files with no visual benefit.

---

## 4. Compatibility matrix (measured behavior)

How SVG features behave across the three contexts a site asset actually encounters. ✅ works · ⚠ conditional · ❌ fails.

| Feature | Browser **inline** `<svg>` | Browser **`<img>` / CSS bg** | **librsvg / sharp** (og:image, `astro:assets`) |
|---|---|---|---|
| `fill="#hex"` presentation attrs | ✅ | ✅ | ✅ (F3) |
| CSS `var()` custom properties | ✅ | ✅ | ❌ renders black (F1) |
| `@media prefers-color-scheme` dark | ✅ | ✅ (img honors OS theme) | ❌ keeps light (F2) |
| `:root[data-theme]` override | ✅ (host toggles) | ❌ host CSS can't reach an isolated img | ❌ (F2) |
| Brand webfont (Montserrat) | ✅ inherits page `@font-face` | ❌ isolated → system fallback | ❌ system fallback (F4) |
| `<title>`/`<desc>`/`role`/`aria` exposed | ✅ to AT | ⚠ host `<img alt>` provides the name instead | n/a (raster has no text) (F5) |
| Metadata retained in delivered file | ✅ (`public/` verbatim) | ✅ (`public/` verbatim) | ❌ bitmap output (F5) |
| Self-contained under strict CSP | ✅ | ✅ | ✅ (F8) |

**Practical reading:** design for the **worst case (librsvg raster + isolated `<img>`)** — hardcoded light-theme fills, system-fallback fonts, complete on its own. Everything better (inline dark mode, brand font) is enhancement.

---

## 5. Accessibility checklist

- [ ] Root `<svg>` has `role="img"`.
- [ ] Root has `aria-labelledby="<titleId> <descId>"` referencing…
- [ ] …a `<title>` with a short, meaningful name (not "image"/"map").
- [ ] …a `<desc>` that conveys the information/relationship the graphic exists to show.
- [ ] Decorative sub-structure (background, connector lines) is `aria-hidden="true"`.
- [ ] No information is conveyed by color alone — every meaningful element is also labeled/shaped. (F-prohibited-5)
- [ ] Text/background contrast ≥ **WCAG AA 4.5:1** (large/bold ≥ 3:1) in **both** themes. *(M-REGIONAL: white-on-canyon-red ≈ 5.1:1; charcoal-on-sandstone ≈ 8:1.)*
- [ ] Smallest label legible at **360 px** rendered width (validated: renders at 360/700/1200/1600). Dense maps ship a reduced-label mobile variant.
- [ ] **When placed as `<img>`**: the host element supplies page-specific `alt` (the internal `<title>` is not exposed through `<img>`). **When inlined**: the internal `role`+`aria-labelledby` provide the name. (F5)
- [ ] Live `<text>` (not outlined paths) so labels are selectable/searchable. (F-prohibited-6)

---

## 6. Optimization checklist (optional — never at the cost of the above)

Optimization is polish (F7: < 1 KB gzip on M-REGIONAL). Do it as a **manual author step**, never as a committed build change.

- [ ] Decide if it's worth it — skip for assets already < ~10 KB gzip.
- [ ] **Use the safe SVGO config only** (below) — preserves `role`, `<title>`, `<desc>`, `viewBox`, and layer ids. (F6)
- [ ] Cap coordinate precision at ~2 decimals; strip editor cruft (`sodipodi`, `inkscape:` namespaces) if present.
- [ ] Keep human-readable indentation OR minify — either is fine; gzip dominates.
- [ ] **Re-render after optimizing** (sharp) and confirm mean RGB is non-zero and the image is visually unchanged. (QA)
- [ ] Re-run the accessibility checklist on the optimized file.

Safe SVGO config (reference only — not installed as a build dependency):
```js
// svgo.config.mjs — run manually, e.g. npx svgo -i asset.svg -o asset.svg --config svgo.config.mjs
export default {
  multipass: true,
  plugins: [{ name: 'preset-default', params: { overrides: {
    removeTitle: false, removeDesc: false, removeViewBox: false,
    cleanupIds: false, removeHiddenElems: false, removeUnknownsAndDefaults: false,
  }}}],
};
```

---

## 7. Export checklist (producing a raster derivative — e.g. og:image)

- [ ] Render from the **light** theme (the rasterizer ignores dark anyway). (F2)
- [ ] Use sharp with an appropriate `density` for the target width (crisp text).
- [ ] Crop to the target ratio (og:image **1200×630**) keeping title + focal element in the safe zone. (spec §3.2)
- [ ] Output **WebP/AVIF, ≤ 500 KB** to satisfy the existing hero validator gate.
- [ ] The derivative carries no metadata → ensure the host page supplies `og:image:alt` / `alt`. (F5)
- [ ] Keep the raster as a **derivative**; the SVG in `public/` remains the source of truth.

---

## 8. QA checklist (run before considering any SVG asset done)

- [ ] **XML well-formed** (`python -c "import xml.dom.minidom as m; m.parse('file.svg')"` or equivalent).
- [ ] **Rasterizes non-black** — render via sharp at 96 dpi; confirm mean RGB ≠ 0 (catches `var()`/black-render regressions). (F1)
- [ ] **Renders at 360 / 700 / 1200 / 1600 px** with legible labels, no overlap/overflow.
- [ ] **No `var()`** anywhere in fills/strokes (`grep 'var(' file.svg` → empty). (F1)
- [ ] **Fallback fonts** present in every `font-family`. (F4)
- [ ] **Accessibility checklist (§5)** passes.
- [ ] **Self-contained** — no external `href`/`url()` to other hosts, no DOCTYPE. (F8)
- [ ] **Metadata intact** in the `public/` file (`grep -E '<title|<desc|role=|aria-'`). (F5)
- [ ] **Dark mode** (if authored) visually verified in a browser (rasterizer can't test it). (F2)
- [ ] **Source note** exists and matches the asset.

---

## 9. Future authoring workflow (recommended, per asset)

1. **Author by hand** (or export from a vector tool, then hand-clean) directly to the light-theme, hardcoded-fill model in §2.
2. **Add the dark-mode `<style>` override** and the accessibility scaffold (`role`/`title`/`desc`/`aria-hidden`).
3. **Write the source note** in `docs/…/source/`.
4. **QA (§8)** — XML valid, rasterizes non-black, scales, a11y, self-contained.
5. **(Optional) safe-optimize (§6)** and re-QA.
6. **Place in `public/images/<domain>/`** with a kebab-case, descriptive filename (e.g. `vernal-regional-hub-and-spoke.svg`). Reusable brand assets only; per-page body graphics may use `src/` + `astro:assets`.
7. **Integration is a separate, gated step** (editorial window) — hero (metadata-only) vs body (`astro:assets` + caption + `alt`), per the map spec's integration plan. Not part of asset production.

**File & naming conventions:** lowercase kebab-case; grouped under a domain folder (`public/images/maps/…`); one SVG source of truth per asset; source notes mirror the asset name under `docs/**/source/`. Reuse is by referencing the same file from many pages with per-page `alt`/caption — never by duplicating the file.

---

*Standard validated against `M-REGIONAL` on the live toolchain (Astro 6.4.4 · sharp 0.34.5 · libvips 8.17.3 · librsvg). No page, content, layout, routing, schema, CSS, component, validator, or build-pipeline change was made producing this document. No build run. No commit.*
