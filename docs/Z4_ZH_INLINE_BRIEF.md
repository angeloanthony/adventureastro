# Z4 — Simplified Chinese (zh) INLINE-PAGE brief

**Self-contained.** Everything you need is here. You translate exactly ONE inline
page into Simplified Chinese. Do not touch any other page, any spoke `.mdx`, any
other locale, or `src/lib/`. Read only the files named in your assignment.

You are one of several parallel agents. Stay strictly inside your assigned page's
files so we never collide.

## What an "inline page" is — and the TWO page types

These are the site's hand-built pillar / commercial / hub pages (home, booking,
the UTV pillar, the hiking hub, …), not the collection-driven spoke articles.
There are two structural types. **Your assignment tells you which one you are.**

### Type MODULE (content lives in a shared `.ts` module)

The page body HTML lives in `src/page-content/<name>.ts` as per-locale string
constants (`const EN`, `const ES`, `const IT`, `const PT`, `const FR`, `const DE`,
`const JA`) plus a `getBodyHtml(locale)` dispatcher. The `.astro` route file
imports `getBodyHtml(lang)` and only carries the `<Seo>` block, breadcrumb labels,
and (sometimes) an inline JSON-LD schema.

**You produce TWO deliverables — shipping only one silently breaks the page:**

1. **Add a `const ZH = \`…\`;` block** to `src/page-content/<name>.ts`, placed
   immediately after the existing `const JA` block, and **add one dispatch line**
   `if (locale === 'zh') return ZH;` to `getBodyHtml`, immediately before the
   `if (locale === 'ja')` line (order doesn't matter functionally; keep it tidy).
   Translate from the **English** master (`const EN` / `const bodyHtml`), NOT from
   the Japanese block. Mirror the JA block's structure exactly (same tags, same
   number of sections, same `<img>`/table/FAQ counts).
2. **Create `src/pages/zh/<path>.astro`** by mirroring `src/pages/ja/<path>.astro`
   exactly, with these swaps only:
   - `<Seo>` `title` / `description` / `ogTitle` / `ogDescription` → Chinese
     (translate from the **English** page `src/pages/<path>.astro`, not from JA).
   - `path="/ja/…"` → `path="/zh/…"`.
   - Any inline `<script type="application/ld+json">` schema: translate the
     human-readable string fields (`headline`, `description`, FAQ `name`/`text`,
     `caption`, …) to Chinese; change any `/ja/` URL in the schema to `/zh/`.
     Leave `@type`, dates, numbers, and business-identity fields byte-identical.
   - `Breadcrumbs` `items={[{ label: … }]}` → Chinese label (or keep the
     `t('hub.x', lang)` call verbatim if the JA file uses one — those resolve
     from the already-translated dictionary).
   - The `import { getBodyHtml } …` line and `getBodyHtml(lang)` call: **unchanged.**
     They are `lang`-driven and pick up your new `ZH` block automatically.

### Type STANDALONE (all content in the `.astro` file)

The whole page — body HTML, tables, FAQs, schema — lives in the `.astro` file
(e.g. the activity-hub pillars). **One deliverable:** create
`src/pages/zh/<path>.astro` by mirroring `src/pages/ja/<path>.astro` exactly and
translating every visible-text run to Chinese, translating the `<Seo>` and inline
schema strings, and swapping `path="/ja/…"` → `path="/zh/…"`. Translate from the
**English** master `src/pages/<path>.astro`; use the JA file as the proof of exact
structure and wiring. Same section count, same `##`/`<h2>` count, same
figure/table/FAQ counts, same wrapper divs and classes.

## Audience & register

Simplified Chinese for **mainland China**. Natural, fluent, idiomatic — never a
literal word-for-word rendering. Rewrite each sentence for Chinese while
preserving meaning, every fact, and every number. Voice: warm, plainspoken,
first-person outdoors-guide authority (Dave & Trudy). Use 你 (informal), not 您.

**Safety-critical copy (trail difficulty, water, weather, hazards) stays factually
exact.** Never soften, embellish, or drop a hazard.

## Internal links — keep them ENGLISH in this phase

Every root-relative link (`href="/booking/"`, `](/hiking/)`, `/utv/…`) stays
**exactly as the English master** — do NOT add a `/zh/` prefix, even though the
`.astro` file's own `path=` and its self-schema URLs do use `/zh/`. Only the
visible link *text* gets translated.

Reason: a central link-localization pass re-prefixes every body link once Z4 is
complete and all `/zh/` routes exist. A `/zh/` body link written now to a
route that doesn't exist yet is a hard validator failure. The ONLY `/zh/` strings
you introduce are: the page's own `path=` attribute, and `/ja/`→`/zh/` swaps of
URLs **already present** in the JA schema/canonical fields. Never invent a new
`/zh/` body link.

> Note on the JA template: the JA files DO contain `/ja/` body links (JA shipped
> its link pass already). When you mirror a JA file, **revert those body links to
> the English master's paths** — i.e. strip the locale prefix back to root
> (`/ja/hiking/` → `/hiking/`). Do not carry `/ja/` into the zh page, and do not
> convert them to `/zh/`. Match the English master's link paths exactly.

## Byte-identical — never translate, never reformat

- **All numbers, prices, phone, address, email, dates:** `$349`, `$125`,
  `$99/hour`, `13,528`, `5,331`, `(435) 219-9447`,
  `1935 S 1500 E, Vernal, UT 84078`, `adventuretoursvernal@gmail.com`,
  `2026-07-11`. Never convert currency, re-punctuate separators, or change a digit.
- **Brand / fleet / people:** `Adventure Tours Vernal`, `adventuretoursvernal.com`,
  `Kawasaki KRX 1000`, `FOX 2.5 PODIUM LSC`, `Dave`, `Trudy`,
  `Dave and Trudy Wilson`, `High Class Limousine Services`.
- **Structure:** every `import`, component tag (`<TrustBadge/>`, `<HubIndex/>`),
  `class=`/`style=`/`width=`/`height=`/`loading=`/`decoding=`/`aria-*`/`id=`
  attribute, every wrapper `<div>`/`<figure>`/`<main>`/`<header>`, and every
  closing tag. Copy verbatim. Only human-readable text nodes, `alt`, and
  `<figcaption>` get translated.
- **Image `src` paths, `#anchor` targets, `id=` values:** byte-identical. If a
  link points at `#some-slug`, keep the href AND keep the target heading's
  `id="some-slug"` in English while translating the heading text.
- **`{/* … */}` MDX/JSX comments and `//` code comments:** leave in English.
- **`t('…', lang)` calls, `getLangFromUrl`, `getBodyHtml(lang)`:** verbatim.

## Locked glossary — use these, do not re-derive

**Place names.** Established mainland name → use it: Utah → 犹他州, Salt Lake City
→ 盐湖城, Rocky Mountains → 落基山脉, Colorado → 科罗拉多州, Denver → 丹佛,
Colorado River → 科罗拉多河. No established name → **keep English, unchanged**:
`Vernal`, `Uintas`/`Uinta Mountains`, `Uintah Basin`, `Flaming Gorge`,
`Ashley National Forest`, `Ashley Gorge`, `Red Fleet`, `Steinaker`, `Green River`,
`Dinosaur National Monument`, `Moab`, `Sand Hollow`, `Doc's Beach`,
`Moonshine Arch`, `Outlaw Trail`, `Asphalt Ridge`, `Kings Peak`, `Grand Junction`,
`Cub Creek`, `Red Cloud Loop`, `Sheep Creek`, `Fremont`, `Ute`, `Butch Cassidy`,
`Wild Bunch`, `BLM`, `High Uintas`, `Split Mountain`, `Yampa River`,
`Uinta Highline Trail`, `Harpers Corner`, `Josie Morris`. Never invent a
transliteration (弗纳尔 etc.) for anything on this list.

**Terms.**

| English | Chinese |
|---|---|
| Dinosaur Country | 恐龙之乡 |
| Key Takeaways | 要点速览 |
| guides (travel articles) | 攻略 (never 指南) |
| petroglyphs / rock art | 岩画 |
| backcountry | 荒野 / 荒野深处 |
| trail (UTV/ATV/Jeep, off-road) | 越野路线 |
| trail (hiking) | 步道 / 徒步路线 |
| hiking | 徒步 |
| camping | 露营 |
| fishing | 钓鱼 |
| scenic drive | 景观自驾 |
| tour (the product) | 行程 / 之旅 / 导览游 |
| guided tour | 导览游 |
| ride-along | 同乘（ride-along） first use, then 同乘 |
| side-by-side (the vehicle) | 并排越野车 |
| drive time | 车程 |
| trailhead | 登山口 |
| overlook / viewpoint | 观景点 |
| staging point / staging area | 集合点 |
| reservoir | 水库 (`<Name> Reservoir` → `<Name> 水库`) |
| State Park | keep English in the compound (`Red Fleet State Park`) |
| VERIFY WITH OFFICIAL SOURCE | 请向官方渠道核实 (exact-string match only) |

**The VERIFY phrase is matched by EXACT STRING.** Only the literal all-caps
`VERIFY WITH OFFICIAL SOURCE` → 请向官方渠道核实. A lowercase/plural variant in
prose is ordinary text — translate it naturally. Never insert a word inside the
locked phrase.

**Mirror-casing rule (the "Wall of Bones" pattern):** English proper-noun casing
(`Wall of Bones`) → keep English. Lowercase descriptive prose ("wall of dinosaur
bones") → translate (骨墙 / 恐龙骨骼墙). Check every occurrence; the same file
mixes both. Sentence-initial capitalization in prose/table cells is NOT the
proper-noun form.

**Generic noun vs official facility name (the "Quarry" pattern):** a word inside a
locked official name (`Quarry Exhibit Hall`, `Quarry Visitor Center`) stays
English in that exact compound. The same word used generically ("the quarry wall")
is a normal noun — translate it (采石场).

## Typography

- One space between Chinese characters and any Latin run or Arabic numeral:
  `探索 Vernal`, `3 小时`, `UTV 越野路线`, `每台车 $349`.
- Full-width Chinese punctuation （，。、；：？！——) in prose. Keep ASCII
  punctuation inside code, attributes, URLs, and preserved English strings.
- No Japanese kana. No Traditional-Chinese character forms.

## Self-check before you finish

1. Structural mirror: same section/`<h2>`/`<img>`/table/FAQ counts as the English
   master. Nothing merged, split, added, or dropped.
2. Every `$` amount, phone, address, email, and date is byte-identical.
3. Every **body** internal link matches the English master's path (root-relative,
   no `/ja/`, no `/zh/`). The only `/zh/` you added is the page's own `path=` and
   `/ja/`→`/zh/` swaps of pre-existing schema/canonical URLs.
4. If MODULE: you added BOTH the `const ZH` block AND the `if (locale === 'zh')`
   dispatch line to the `.ts`, AND created the `.astro`. If STANDALONE: you
   created the `.astro`.
5. `<Seo>` title/description and any schema strings are translated to Chinese.
6. All `import`s, component tags, classes, ids, styles, and `t()`/`getBodyHtml`
   calls are byte-identical to the JA template.
7. No Japanese kana, no Traditional characters, no invented transliteration.
8. Every `{/* */}` / `//` comment is still English.

Write with minimal narration — read your source + template once, then write. A
verbose read→translate→verify→re-read loop blows the output-token ceiling and the
task fails.
