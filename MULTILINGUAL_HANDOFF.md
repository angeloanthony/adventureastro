# Adventure Tours Vernal — Multilingual Handoff

**Purpose:** the single frozen reference for the multilingual rollout. Every translation
chat starts with *"Read MULTILINGUAL_HANDOFF.md and do Batch N"* and nothing else.
Do **not** paste the playbook, the Build Guide, or prior chat history into translation
sessions. If a rule isn't here, it isn't in scope.

Governing engineering standard: *Production Multilingual System for Astro* (the playbook).
This doc is the Adventure-Astro-specific application of it. Where the two differ, this
doc wins because it reflects the actual repo.

---

## 1. The architecture is FROZEN

Do not redesign routing, layouts, schemas, the hub/spoke system, or the URL policy.
Translation is a **content task**, not an engineering task. If a batch seems to require
an architecture change, stop and flag it — do not improvise one.

- **Master language = English.** It is mature. You edit English only when fixing a real
  defect QA surfaces (as a separate, deliberate commit) — never to make translation easier.
- **URL policy (owner-approved 2026-07-10, locked):** directory URLs, `trailingSlash: 'always'`,
  `build.format: 'directory'`. Every URL shape comes from `src/lib/hubs.ts` + `src/lib/urls.ts`.
  Never hardcode a path.
- **Locale URL shape:** master at root (`/hiking/`), each locale prefixed (`/es/hiking/`),
  `prefixDefaultLocale: false`. Existence-aware: a localized route/hreflang/switcher option/
  internal link is emitted **only** if that translation exists; otherwise it falls back to
  English. Nothing 404s.
- **Language order:** 🇪🇸 Spanish complete first → 🇮🇹 Italian → 🇵🇹 Portuguese. Finish one
  language fully before starting the next; the workflow improvements compound.

---

## 2. Where content lives (this is the "v2 hard case")

Adventure Astro was not built for extraction. Copy lives in four places — route each
string to exactly ONE authoritative source. Do not mix them.

| Content type | Location | How to translate |
|---|---|---|
| **Spoke articles** | `src/content/{hub}/*.mdx` — frontmatter + body prose (~57 files across hiking 16, guides 9, itineraries 9, utv 7, camping 4, fishing 4, scenic-drives 4, dino 2, things-to-do 2) | Translate frontmatter strings + body prose. Preserve MDX structure, components, and frontmatter keys exactly. |
| **Data collections** | `src/content/{cities,seasons,months}/*.{json,yaml}` | Translate prose fields (`routeSummary`, `angle`, `title`, `description`) only. Leave numeric/enum fields (`driveMiles`, `season`, `month`) untouched. |
| **Inline `.astro` copy** | `src/pages/*.astro` (index, booking, faq, about, utv/index, from/salt-lake-city, policies, atv/jeep landings, ~20 files) | **Extract before translating.** Inline commercial copy must move to a translatable source first — this is the risky part; do it in a dedicated framework/extraction batch, not in a bulk content batch. |
| **Chrome + data modules** | `src/lib/hubs.ts` (nav/hub labels + URLs), `src/lib/authors.ts`, `src/config/site.ts` | Chrome (nav, footer, buttons, labels) → a hand-authored `t()` dictionary, translated once per locale. Labels keyed by the English string. Never per-page. |

**Layouts** (`BaseLayout`, `Hub/Spoke/City/Itinerary/Tour/Pillar/Author`) are presentation
+ schema only. They derive `lang` from the URL — no `lang=` prop threading. Head essentials
(hreflang triplet, canonical, `og:locale`, JSON-LD `inLanguage`) are added once in the layout,
not per page.

---

## 3. NEVER translate literally

These are frozen. Machine translation must leave them byte-identical (add them to
`glossary.json`, enforced in-prompt AND by a deterministic post-pass):

- **Brand:** `Adventure Tours Vernal`, `adventuretoursvernal.com`
- **NAP:** phone `(435) 219-9447` / `tel:` hrefs, `1935 S 1500 E, Vernal, UT 84078`,
  `adventuretoursvernal@gmail.com`  → all sourced from `src/config/site.ts`, never retyped
- **Prices / numbers:** `$349` base, `$125` ride-along, `$99/hr` overage — come from
  `site.ts` as `{placeholder}` tokens. A translated file must never contain a literal dollar
  amount, date, or phone number (playbook §6.8).
- **Fleet:** `Kawasaki KRX 1000`, `FOX 2.5 PODIUM LSC shocks`
- **Proper place names:** `Dinosaur National Monument`, `Flaming Gorge`, `Ashley National
  Forest`, `Red Fleet (State Park)`, `Green River`, `Vernal` — keep English; may add a
  parenthetical gloss on first use only if editorially natural.
- **People / partner:** `Dave Wilson`, `Trudy Wilson`, `High Class Limousine Services`
- **URLs & slugs:** every `href`, asset path, and page slug stays English. Route internal
  links through `localizeHref()` — never hand-edit a prefix.
- **Tags:** `tags` frontmatter is lowercase-kebab and matched by **exact string equality**
  (drives RelatedArticles + tag-intersection pages). Translating a tag silently splits the
  linking network. **Leave all tags in English.**

---

## 4. Validation the translation MUST satisfy

The build is the gate. `npm run build` runs `scripts/validate-site.mjs` and the content
schema. A translated page that violates these fails the build:

- **`title` ≤ 65 chars.** Spanish/Italian/Portuguese run ~20–30% longer — **re-fit the
  title to the cap, do not translate literally.**
- **`description` 120–165 chars.** Same: rewrite to fit the range, don't overflow.
- **`heroAlt` ≥ 20 chars**, dates in order, `author` ∈ {dave, trudy}, hero image path
  unchanged, `hub` literal unchanged.
- **Structural mirror:** every localized file parses and mirrors its English key paths and
  array lengths (frontmatter keys, `faq[]` length, `related[]`).
- **Placeholder parity:** `{token}` sets identical between English and translation.
- Preserve `ogTitle`/`ogDescription` overrides when the English page set them deliberately.

---

## 5. Tone guide

Warm, plainspoken, outdoors-guide voice — the same Dave/Trudy first-person authority the
English pages use. Not corporate, not machine-flat. For each locale use natural regional
register (neutral Latin-American Spanish; standard Italian; European-leaning Portuguese
unless told otherwise). YMYL-adjacent safety copy (trail difficulty, water, weather) must
stay accurate — never soften or embellish a hazard in translation. One or two native
speakers should read a sample before that locale launches (machine rules are necessary,
not sufficient).

---

## 6. How to run a batch (keep every chat small)

1. Work inside **one folder / subsystem only.** Do not inspect the rest of the repo.
   - e.g. `src/content/hiking`, then `src/content/fishing`, then `src/content/guides`…
2. Batches of ~5 pages. Translate → build → `--check` → 3-diff the English master renders
   identically → commit → annotated tag (`i18n-es-batch-N`).
3. Never edit a generated translation file to "fix" it in place — fix English, or pin the
   term in the glossary. Committed translations outrank the cache.
4. Commercial/inline `.astro` pages: extraction batch first (framework session), content
   batch second.

**Milestone map (target ~20–30 total, not 100+):**
- **P1 Framework** — i18n config, locale helpers, `t()` dictionary, glossary, language
  switcher, hreflang/`og:locale`/`inLanguage` in layouts, extraction of inline `.astro` copy,
  translation engine + cache. *(This is Session 1; framework does NOT exist yet.)*
- **P2 Spanish** — commercial pages → hubs → spokes → data collections → homepage last. QA.
- **P3 Italian, then Portuguese** — mostly content generation + validation; pipeline is proven.
- **P4 Launch** — locale sitemap, Search Console, native review, analytics.

---

*Frozen reference. If reality contradicts this doc, trust the repo and update this doc —
never the other way around.*
