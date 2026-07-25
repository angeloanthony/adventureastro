# Z3 — Simplified Chinese (zh) MDX spoke brief

**Self-contained.** Everything you need is here. Do not read other docs, do not
explore the repo, do not inspect other locales. Translate exactly one file.

## Task

You are given ONE English source file `src/content/<hub>/<id>.mdx`.
Write ONE new file `src/content/<hub>/<id>.zh.mdx` — the Simplified Chinese
translation. Do not modify the English source. Do not create any other file.

**Write it in a single `Write` call with minimal narration.** A verbose
read → translate → verify → re-read loop blows the output-token ceiling and the
task fails. Read the source once, then write once.

## Audience & register

Simplified Chinese for readers in **mainland China**. Natural, fluent, idiomatic
Chinese — never a literal word-for-word rendering of the English. Rewrite the
sentence for Chinese while preserving meaning, facts, and every number.

Voice: warm, plainspoken, first-person outdoors-guide authority (this is Dave &
Trudy talking). Not corporate, not machine-flat. Use 你 (informal singular), not
您 — the English master is informal and direct.

**Safety-critical copy (trail difficulty, water, weather, hazards) must stay
factually exact.** Never soften, embellish, or drop a hazard in translation.

## HARD SCHEMA GATES — the build fails if you miss these

Counts are **characters**, and Chinese is much denser than English. A natural
translation will land far UNDER the description minimum. You must deliberately
expand it with accurate detail drawn from the article body — not filler.

| Field | Rule |
|---|---|
| `title` | **≤ 65 characters.** Re-fit for Chinese; do not translate literally. |
| `description` | **120–165 characters. This is the one that fails most often.** Expand with real detail from the body until you are ≥ 120. Count characters, not words. |
| `heroAlt` | **≥ 20 characters.** |
| `ogTitle` / `ogDescription` | Translate as prose whenever present. They are user-facing social-share text, not technical metadata. Only present on some files. |

## FRONTMATTER IS YAML — four rules that have already broken the build

Everything between the opening and closing `---` is parsed by a YAML engine.
These four mistakes each produced a hard build failure in an earlier batch.

1. **No byte-order mark.** Write plain UTF-8. The very first byte of the file
   must be the `-` of the opening `---`. A BOM is invisible in an editor and
   silently breaks frontmatter parsing.
2. **Never put HTML in frontmatter.** No `<a href="…">`, no `<strong>`, no
   `<div>` — not even escaped. If the English `faq` answer says "see our guide
   to visiting Dinosaur National Monument" as plain text, your translation says
   it as plain text too. **Do not invent a link the English source does not
   have.** Raw HTML in the article *body* is fine when the English body has it;
   frontmatter is different.
3. **Never use ASCII `"` inside a frontmatter value.** For emphasis or quoting
   in Chinese use full-width “ ” (or 「 」). Writing `一次"春季"山区徒步` inserts
   two straight quotes that terminate the YAML string early. This one is nasty:
   it adds an even number of quotes, so it survives naive checks and only fails
   at build time.
4. **Never add or drop a frontmatter key**, and keep `faq[]` the same length.

## Byte-identical — never translate, never reformat

- **Frontmatter routing/asset fields:** `hub`, `author`, `publishDate`,
  `updatedDate`, `heroImage`, `draft`. Copy exactly.
- **`tags`:** lowercase-kebab, matched by exact string equality — they drive the
  whole related-articles network. **Leave every tag in English.**
- **All numbers and prices:** `$349`, `$125`, `$99/hour`, `$250–$400+`,
  `$349/machine`, `13,528`, `5,000`. Never convert currency, never re-punctuate
  thousands separators to a Chinese convention, never change a digit.
- **Phone / address / email:** `(435) 219-9447`, `1935 S 1500 E, Vernal, UT 84078`,
  `adventuretoursvernal@gmail.com`.
- **Brand:** `Adventure Tours Vernal`, `adventuretoursvernal.com`.
- **Fleet:** `Kawasaki KRX 1000`, `FOX 2.5 PODIUM LSC`.
- **People:** `Dave`, `Trudy`, `Dave and Trudy Wilson`, `High Class Limousine Services`.
- **MDX structure:** the `import ... from '...'` lines, every component tag
  (`<TrustBadge …/>`), every `class=`/`style=`/`width=`/`height=` attribute,
  every `<div>`/`<figure>`/`<p>` wrapper, and the closing tags. Copy verbatim.
- **`{/* … */}` MDX comments:** leave in English, unchanged. They are owner notes.
- **Image `src` paths.** Only the `alt` text and `<figcaption>` get translated.
- **`#anchor` link targets.** If the file has `href="#some-slug"`, keep the href
  byte-identical AND render its target heading as raw HTML preserving the English
  id, e.g. `<h2 id="decision-framework">中文标题</h2>` at the same heading level.
  Only the heading an anchor actually points at needs this.

## Internal links — keep them ENGLISH in this phase

Every root-relative link (`](/booking/)`, `](/utv/private-utv-tours-vernal/)`,
`href="/hiking/"`) stays **exactly as in the English source**. Do NOT add a
`/zh/` prefix. Only the visible link *text* gets translated.

Reason: most `/zh/` routes do not exist yet, and a link to a missing route is a
hard validator failure. A central link-localization pass re-prefixes all of them
once the locale reaches full route coverage. Adding `/zh/` now breaks the build.

## Structural mirror

The translated file must mirror the English one exactly:
- same frontmatter keys, same order, same `faq[]` length (translate `q` and `a`)
- same number of `##` headings, in the same order
- same `<img>` set, same `#anchor` set, same wrapper divs
- same paragraph count and ordering — do not merge, split, add, or drop a section

## Locked glossary — use these, do not re-derive

**Place names, two tiers.**
- Has an established mainland Chinese name → **use it**: Utah → 犹他州,
  Salt Lake City → 盐湖城, Rocky Mountains → 落基山脉, Colorado → 科罗拉多州,
  Denver → 丹佛, Colorado River → 科罗拉多河.
- No established Chinese name → **keep the English, unchanged**: `Vernal`,
  `Uintas` / `Uinta Mountains`, `Uintah Basin`, `Flaming Gorge`,
  `Ashley National Forest`, `Ashley Gorge`, `Red Fleet`, `Steinaker`,
  `Green River`, `Dinosaur National Monument`, `Moab`, `Sand Hollow`,
  `Doc's Beach`, `Moonshine Arch`, `Outlaw Trail`, `Asphalt Ridge`,
  `Kings Peak`, `Grand Junction`, `Cub Creek`, `Red Cloud Loop`,
  `Sheep Creek`, `Fremont`, `Ute`, `Butch Cassidy`, `Wild Bunch`, `BLM`.
  Never invent a transliteration (弗纳尔 etc.) for anything on this list.

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
| guided tour | 导览游 (or 由向导带队的行程) |
| ride-along | 同乘（ride-along） on first use, then 同乘 |
| side-by-side (the vehicle) | 并排越野车 |
| drive time | 车程 |
| trailhead | 登山口 |
| overlook / viewpoint | 观景点 |
| staging point / staging area | 集合点 |
| reservoir | 水库 (but `<Name> Reservoir` → `<Name> 水库`) |
| State Park | keep English in the compound, e.g. `Red Fleet State Park` |
| VERIFY WITH OFFICIAL SOURCE | 请向官方渠道核实 (exact-string match only — see below) |

**The VERIFY phrase is matched by EXACT STRING, not by meaning.** Only the
literal all-caps `VERIFY WITH OFFICIAL SOURCE` becomes 请向官方渠道核实. A
lowercase/plural variant in body prose ("verify with official sources") is
ordinary text — translate it naturally instead. Never insert a word inside the
locked phrase.

**Mirror-casing rule for descriptive-phrase-vs-proper-name pairs** (the "Wall of
Bones" pattern): if the English capitalizes it as a proper noun (`Wall of Bones`)
keep it English, unchanged. If the English uses lowercase descriptive prose
("wall of dinosaur bones") translate it naturally (骨墙 / 恐龙骨骼墙). **Check
every occurrence individually — the same file often mixes both forms.**
Sentence-initial capitalization in prose or a table cell is NOT the proper-noun
form; treat it as descriptive.

**Generic common noun vs official facility name** (the "Quarry" pattern): a word
inside a locked official name (`Quarry Exhibit Hall`, `Quarry Visitor Center`)
stays English in that exact compound. The same word used generically ("the quarry
wall") is a normal noun — translate it (采石场).

## Typography

- One space between Chinese characters and any Latin run or Arabic numeral:
  `探索 Vernal`, `3 小时`, `UTV 越野路线`, `每台车 $349`.
- Use full-width Chinese punctuation （，。、；：？！——) in prose. Keep ASCII
  punctuation inside code, attributes, URLs, and preserved English strings.
- No Japanese kana. No Traditional-Chinese character forms.

## Self-check before you write

1. `description` is between 120 and 165 characters. **Count it.**
2. `title` ≤ 65 characters.
3. `heroAlt` ≥ 20 characters.
4. Every `$` amount, phone number, and date is byte-identical to the English.
5. Every internal link still points at the English path (no `/zh/`).
6. `tags`, `hub`, `author`, `publishDate`, `updatedDate`, `heroImage` untouched.
7. `##` heading count matches the English file.
8. Every `{/* … */}` comment is still English and unchanged.
9. Frontmatter contains **no** `<a href>`/HTML, **no** ASCII `"` inside a value,
   and the file starts with `-` (no BOM).
10. You invented no link, no heading, and no fact that is not in the English source.
