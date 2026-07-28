# F1 — Multilingual Framework Extraction: Architecture & Design

**Status: SUPERSEDED IN PART. Read [F2](./F2-architecture-decisions.md) alongside this document.**

This was the design pass. It was written before any code existed, and two of its conclusions have
since been overturned by measurement rather than by argument:

- **§6 ("two repositories, not one") is overturned on timing.** Packages live in-repo for F3–F5; the
  repository split moves to F6. F2, "Overturned: F1 §6", has the reasoning.
- **§2.2's two adapters and a parser-selection field were rejected.** v1 ships exactly one adapter
  and no selection field (F2 ADR-2). Implemented that way in F4 Phase 1.

Everything else — the coupling inventory, the engine/policy measurements, the lifecycle model —
stands, and the coupling inventory in particular is what F4 Phase 1 executed against.

**Original status note:** design only. No code was written and no file in the repository was
modified. Every measurement below was taken from the working tree at `f45a9ec` (clean).

**Mission.** Generalize the *engineering*, not the site. Adventure Tours Vernal becomes the reference
implementation; the extracted framework becomes the reusable foundation for future Astro multilingual
projects. The framework must never ship Adventure Tours' policy as defaults.

---

## 0. Executive summary

The separation the brief asks for **already half exists**, and that is the single most useful finding.
The five gates put their language- and project-specific knowledge in `i18n-gates/*.json`, not in code:
policy outweighs engine by **1.98×** on bytes (155.5 KB of JSON against 78.4 KB of gate JavaScript).
Extraction is therefore mostly a matter of *naming and enforcing* a boundary that the P34–P38 phases
built by convention.

Three findings change the plan the brief sketches:

1. **The real coupling is not the configs — it is the way gates read the host's source.** Three gates
   (`4f`, `4g`, `4h`) locate registered locales by running the regex `/LOCALES\s*=\s*\[([\s\S]*?)\]\s*as const/`
   over `src/lib/i18n.ts`; two more (`4i`, `4j`) parse `src/lib/ui.ts` and `src/page-content/home-gallery.ts`
   with the TypeScript AST. A second project would have to reproduce Adventure Tours' *source-file
   shape*, not merely supply its own data. This is the boundary that must be made explicit, and it is
   the one the brief's package sketch does not have a home for. → §3.2, the **host adapter contract**.

2. **The framework cannot be adopted without a policy generator, and no generator was ever shipped.**
   P35 froze 244–276 heading markers per locale and P38 froze 295–332 anchor markers plus identity
   registries — all derived by census, with the derivation documented in the config `$doc` blocks and
   **no script**. Ship the engines without the census tooling and a second project receives five gates
   it has no way to configure. → §5, `census/` is a first-class deliverable, not a nice-to-have.

3. **P30 specified one shared render index; it was not built.** Four gates each walk `dist/` themselves
   (`readdirSync` ×2 in each of 4f/4g/4h/4i) and three extractors exist: `visibleText()` duplicated
   byte-identically in 4h and 4i (deliberate, so they share the `官方渠道核实` = 982 baseline),
   `headingsOf()` in 4f, and 4g's anchor extractor — which alone decodes numeric character references
   and handles letterless anchors, two facts P38 explicitly recorded as *not* shared with 4h/4i.
   Extraction is the moment to converge these, and the reason is **consistency, not speed** — all five
   dist gates together run in 5 s of a 124 s CI job. → §3.1, `render-index`.

Nothing here requires changing Adventure Tours' behavior. Every boundary below can be introduced with
`dist/` byte-identical, which should be the acceptance test of the implementation phase that follows.

---

## Phase 1 — Inventory

Classification: **E** reusable engine · **I** reusable interface · **P** project policy ·
**C** project content · **D** project documentation.

### 1.1 Gate layer

| Artifact | Lines / bytes | Class | Notes |
|---|---|---|---|
| `scripts/gate-4f-headings.mjs` | 186 / 7.9 KB | **E** | Zero string tests in code; all markers are data. |
| `scripts/gate-4g-anchors.mjs` | 420 / 19.1 KB | **E** | Two-signal classifier; groups are data-driven. |
| `scripts/gate-4h-seams.mjs` | 333 / 15.3 KB | **E** | Rules A–D are grammar, parameterized by config. |
| `scripts/gate-4i-glossary.mjs` | 526 / 23.8 KB | **E** | Registry validation + corpus scan; `licensedIn` masking. |
| `scripts/gate-4j-gallery-parity.mjs` | 295 / 12.3 KB | **E** + **P** | Engine = key-set parity over a TS dictionary registry. Project = *which* module and *which* canonical key set. |
| `i18n-gates/4f-headings.json` | 1,942 / 37.6 KB | **P** | 48 licensed globals + 244–276 markers × 7 locales. |
| `i18n-gates/4g-anchors.json` | 4,271 / 83.9 KB | **P** | identities (global + per-locale), markers, nativeMarkers, `measured_not_identities`. |
| `i18n-gates/4h-seams.json` | 135 / 5.8 KB | **P** | Locks, imperative particles, connectives, clause/sentence boundaries, frozen baselines. |
| `i18n-gates/4i-glossary.json` | 646 / 28.2 KB | **P** | 50 locks / 18 anchors / 34 forbidden terms / `measured_not_forbidden`. |

**Engine total 78.4 KB · policy total 155.5 KB.** The ratio is the health signal: a gate whose code
grows faster than its config has started encoding policy.

Two asymmetries worth carrying into the design:

- **4j has no config file at all.** Its canonical key set *is* `GALLERY_SLIDES` in the host's source.
  That is correct for a structural gate, but it means 4j's policy surface is invisible to anyone
  auditing `i18n-gates/`. In the extracted framework 4j's host bindings must be declared in the
  project manifest (§3.2) so every gate's policy is enumerable from one place.
- **4h's config is 5.8 KB against 15.3 KB of code** — the only gate where engine outweighs policy.
  That is by design and correct: C9's 28 held shapes appear nowhere in code *or* config because
  licensing is expressed as grammar ("deleting an imperative is licensed only when a surviving
  imperative preserves the sentence"). It is the model for how a rule should generalize, and it is
  the gate most likely to need engine work for a new language family.

### 1.2 Site validation layer

`scripts/validate-site.mjs` (229 / 10.2 KB) is a **mix**, and is the only artifact that must be split
rather than moved:

| Check | Class | Reason |
|---|---|---|
| 1. Broken internal links | **E** | Generic to any static build. Carries the case-sensitivity contract proven on Linux at P41. |
| 2. Orphan reachability from `index.html` | **E** | Generic; the `404.html` exemption is a parameter. |
| 4. `<title>` uniqueness | **E** | Generic SEO invariant. |
| 5. Meta-description uniqueness | **E** | Generic. |
| 6. JSON-LD parses | **E** | Generic. |
| 7. `<img>` carries `alt` | **E** | Generic (empty alt allowed = explicit decorative marker). |
| 3. Hub/pillar/spoke integrity | **P** | Adventure Tours' information architecture: `HUB_SLUGS` parsed from `src/lib/hubs.ts`, spokes must render `RelatedArticles` + `AuthorByline`. |
| 8. Thin-content floor | **P** | `MIN_SPOKE_WORDS = 600`, a Build-Guide-derived editorial number. |
| `PILLAR_PENDING`, `LEGACY_SPOKES` | **P** | Named-exception allow-lists, project state. |

### 1.3 Runtime library layer

| Artifact | Split | Class |
|---|---|---|
| `src/lib/i18n.ts` (545 lines) | ~160 lines of helpers (`getLangFromUrl`, `localizedPath`, `switchLocalePath`, `isRtl`, `getIntlLocale`, `formatDate`, `parseEntryLocale`) vs **~385 lines of `*_SLUGS` sets (71%)** | **E** / **P** |
| `src/lib/ui.ts` (1,085 lines) | `t()` + `hubName()` ≈ 30 lines vs **8 dictionaries ≈ 1,032 lines (95%)** | **E** / **P** |
| `src/page-content/home-gallery.ts` (1,194 lines / 145 KB) | `renderGallery()` / `textFor()` / the three interfaces vs `GALLERY_SLIDES` + 8 dictionaries (840 entries) | **E** / **C** |
| `src/lib/urls.ts` (12 lines) | `absoluteUrl()`, but imports `SITE` | **E** once `SITE` is injected |
| `src/lib/hubs.ts` (78) | Hub registry | **P** |
| `src/lib/authors.ts` (108) | Author registry | **C** |
| `src/config/site.ts` | NAP, pricing, geo, rating | **C** |

Two engine patterns in this layer are worth more than the code that implements them, and both must be
named in the framework rather than left as habits:

- **Fail-closed typing.** `GALLERY_TEXT: Record<Locale, GalleryDictionary>` makes adding a locale to
  `i18n.ts` a **TS2741 compile error** until its dictionary is registered (proven at P32 with a
  scratch `ko`). Contrast `UI_STRINGS: Partial<Record<Locale, Dict>>`, which fails *open* — and that
  is precisely the shape that let `ja` ship 57 pages of English chrome. The framework should ship the
  fail-closed form as the default and the partial form as a documented, deliberate exception.
- **Untranslated must be a missing key, never a value equal to English.** P32's owner decision
  (register dictionaries empty, resolve via fallback, rather than pre-fill 735 English copies) is what
  makes 4j decidable by set difference. It is a *data-modelling* rule, and it belongs in the
  framework's authoring guide as a hard rule, not a preference.

### 1.4 Content, pipeline and documentation

| Artifact | Class |
|---|---|
| `src/content/**` (14 collections), `src/page-content/*.ts` (11 modules, 21K lines), `src/pages/**`, `public/` | **C** |
| `src/components/**` (24 components), `src/layouts/**` (8) | **C** with **E** patterns (`LanguageSwitcher`, `Breadcrumbs`, `Seo`, the `Schema*` set are reusable *shapes*, not reusable code — they read `SITE` and project collections) |
| `package.json` scripts (`gates:src`, `gates:dist`, `build`, `validate`) | **I** — the ordering contract |
| `.github/workflows/ci.yml` | **I** — reusable workflow, plus the exit-code table |
| `MULTILINGUAL_HANDOFF.md` §7 / §7.1 (locale lifecycle, pipeline rationale) | **D** → the largest single source of framework documentation |
| `NATIVE_REVIEW.md` "Review methodology" (11 principles) | **D** → framework methodology, portable verbatim |
| `NATIVE_REVIEW.md` A/B/C/E sections, `PROJECT_STATE.md`, `docs/**` | **D**, project-only |

### 1.5 Dependency diagram — current state

```
                         ┌───────────────────────────┐
                         │  src/lib/i18n.ts          │  LOCALES (E+P), LOCALE_SLUGS (P)
                         └──────────┬────────────────┘
        regex /LOCALES = [...] as const/   │   TS AST
        ┌──────────┬──────────┬────────────┴─────┬──────────────┐
        │          │          │                  │              │
   ┌────▼───┐ ┌────▼───┐ ┌────▼───┐        ┌─────▼────┐   ┌─────▼────┐
   │ 4f     │ │ 4g     │ │ 4h     │        │ 4i       │   │ 4j       │
   │headings│ │anchors │ │ seams  │        │glossary  │   │ gallery  │
   └──┬──┬──┘ └──┬──┬──┘ └──┬──┬──┘        └──┬──┬─┬──┘   └──┬────┬──┘
      │  │       │  │       │  │              │  │ │         │    │
      │  │       │  └───────┼──┼──────────────┼──┼─┼─────────┼────┼── i18n-gates/4f.json
      │  │       │          │  │              │  │ │         │    │   (4g reads 4f's licensed.global)
      │  └───────┴──────────┴──┴──────────────┴──┘ │         │    │
      │            each walks dist/ independently  │         │    │
      │            3 different extractors          │         │    │
      └── own JSON  └── own JSON   └── own JSON     └─ own JSON    │
                                                    │             │
                                        src/lib/ui.ts (AST)  src/page-content/
                                                              home-gallery.ts (AST)
   ┌──────────────┐
   │validate-site │──── src/lib/hubs.ts (regex HUB_SLUGS) ──── dist/
   └──────────────┘
```

**Coupling register — every edge a second project would have to satisfy today:**

| # | Coupling | Gates | Severity |
|---|---|---|---|
| C-1 | `src/lib/i18n.ts` must exist and match `/LOCALES\s*=\s*\[…\]\s*as const/` with `DEFAULT_LOCALE = '…'` | 4f, 4g, 4h, 4i, 4j | **high** — source-shape, not data |
| C-2 | `dist/` at repo root, HTML-per-route | 4f, 4g, 4h, 4i, validate-site | low — parameterize |
| C-3 | `i18n-gates/<gate>.json` at fixed paths (4f, 4h, 4j hardcode; 4g, 4i accept `--config`) | all | low |
| C-4 | `src/lib/ui.ts` exports `UI_STRINGS` mapping locales to object literals | 4i anchors | medium |
| C-5 | `src/page-content/home-gallery.ts` exports `GALLERY_SLIDES` + `GALLERY_TEXT` | 4j | **high** — 4j is written *about* this module |
| C-6 | `src/lib/hubs.ts` `HUB_SLUGS` array literal | validate-site | medium |
| C-7 | 4g reads 4f's config for `licensed.global` | 4g→4f | **keep** — one registry is the design |
| C-8 | 4h/4i share a byte-identical `visibleText()` by copy | 4h, 4i | **high** — correctness depends on it, nothing enforces it |

C-7 is the only coupling that should survive extraction unchanged; it is deliberate (one frozen
proper-noun registry, not two that drift). C-8 is the most dangerous: two gates share a baseline
because their extractors are identical, and that identity is maintained by hand.

---

## Phase 2 — Boundary design

### 2.1 The rule

> **Engine may depend on interface. Policy may depend on interface. Engine must never depend on
> policy, and no module may read a host source file except through an adapter.**

Enforceable mechanically, and the implementation phase should enforce it: a lint step asserting no
file under `engine/` contains a non-ASCII string literal outside comments, and no `readFileSync` of a
path containing `src/`.

### 2.2 Target modules

```
localization-framework/
├── engine/
│   ├── render-index/        ← one dist/ walk, one extractor family    [fixes C-8, finding 3]
│   │     • pages(dist)               – walk, key, read
│   │     • visibleText(html)         – block→space / inline→nothing (4h+4i, canonical)
│   │     • headings(html)            – h1–h6, sr-only excluded (4f)
│   │     • anchors(html)             – + entity decoding, letterless classification (4g)
│   │     • normalize(s)              – quote/space folding, shared by all four
│   ├── gates/
│   │     • headings.js       (4f)   • anchors.js  (4g)   • seams.js  (4h)
│   │     • glossary.js       (4i)   • parity.js   (4j, generalized — see 2.4)
│   ├── validate/
│   │     • links.js  orphans.js  titles.js  descriptions.js  jsonld.js  alt.js
│   │     (the six generic checks of validate-site; the IA checks are policy)
│   ├── registry/            ← config loading, schema validation, exit-code contract
│   │     • load(gate, manifest) → config | exit 2
│   │     • assertLocaleCoverage(locales, config) → exit 2 on any gap
│   └── report/              ← finding formatting, group caps, deterministic ordering
│
├── census/                  ← policy GENERATORS                       [finding 2]
│   ├── markers.js           – derive 4f/4g marker lexicons from a corpus, emit frozen JSON
│   ├── identities.js        – derive 4g identity candidates by destination
│   ├── baselines.js         – measure 4h/4i conserved counts, emit min vs exact
│   └── refusals.js          – append to measured_not_* with the evidence that rejected a rule
│
├── adapters/                ← the host contract                       [fixes C-1, C-4, C-5, C-6]
│   ├── host-manifest.schema.json – host-manifest.json schema
│   ├── astro-ts.js          – default adapter: read locales/dictionaries via TS AST
│   └── explicit.js          – fallback adapter: locales declared directly in the manifest
│
├── ci/
│   └── gates.yml            – reusable GitHub Actions workflow (exit-code table preserved)
│
├── schemas/                 ← EMPTY policy templates + $doc derivation blocks
│   ├── headings.template.json   anchors.template.json
│   ├── seams.template.json      glossary.template.json
│
├── docs/                    ← methodology, lifecycle, migration, authoring rules
└── reference/               ← Adventure Tours excerpts as EXAMPLES, clearly labelled
```

### 2.3 Packaging recommendation — one package, not four

The brief sketches `packages/i18n-core/`, `localization-gates/`, `validation/`, `docs/`. **I recommend
against splitting at extraction time**, for three reasons: the whole engine is ~1,800 lines; every
module versions together (a `render-index` change can move a 4i baseline, which is exactly why 4h and
4i copy the extractor today); and there is currently one consumer. A four-package monorepo buys
independent versioning nobody needs and costs a release dance on every change.

**Ship one package** — working name `astro-localization-gates` — with the module boundaries above
enforced by directory and lint rather than by `package.json`. **Split trigger, stated in advance:** when
a second project needs `engine/validate` without `engine/gates`, or a third-party consumes
`render-index` alone. Until then the boundary is real without the packaging overhead.

`i18n-core` (the ~190 engine lines inside `i18n.ts` + `ui.ts`) is the one genuine candidate for a
*separate* package, because it is the only part that ships **into the built site** rather than into the
build pipeline. Runtime code and validation tooling have different dependency and size constraints.
Recommendation: `i18n-core` as a second package from day one, everything else as one.

### 2.4 Generalizing 4j — the only gate that needs redesign

4j today asserts: *every registered locale explicitly defines every key of `GALLERY_SLIDES`.* The
reusable proposition is broader and content-free:

> Given a **canonical key source** and a **per-locale dictionary registry**, every registered locale
> defines every canonical key, with no orphans, no duplicates, no empty required fields, no two
> locales aliased to one dictionary, and full coverage against the locale registry in both directions.

The gallery is one *instance* of that. So is `UI_STRINGS` in `ui.ts` — which is currently
`Partial<Record<…>>` and therefore checked by nothing. Generalized 4j run over `ui.ts` would have
caught the `ja` English-chrome incident structurally, which is the framework's founding failure. That
is the strongest argument in this document for the generalization being worth doing.

Manifest shape:

```jsonc
"parity": [
  { "id": "gallery", "keys": "src/page-content/home-gallery.ts#GALLERY_SLIDES[].id",
    "dictionaries": "src/page-content/home-gallery.ts#GALLERY_TEXT",
    "required": ["alt", "caption"] },
  { "id": "chrome",  "keys": "src/lib/ui.ts#EN",
    "dictionaries": "src/lib/ui.ts#UI_STRINGS", "required": ["*"] }
]
```

### 2.5 Boundary diagram — target state

```
        ┌──────────────────────── host project ────────────────────────┐
        │  host-manifest.json (manifest)   i18n-gates/*.json (policy)      │
        │  src/**  dist/**                                             │
        └───────┬───────────────────────────────┬──────────────────────┘
                │ declares                      │ supplies
        ┌───────▼──────────┐            ┌───────▼──────────┐
        │  adapters/       │            │  engine/registry │
        │  (host contract) │            │  (load + verify) │
        └───────┬──────────┘            └───────┬──────────┘
                │ locales, dictionaries         │ config
                └───────────────┬───────────────┘
                                │
                 ┌──────────────▼──────────────┐
                 │      engine/render-index    │  ← the only reader of dist/
                 └──────────────┬──────────────┘
                                │ pages, text, headings, anchors
                 ┌──────────────▼──────────────┐
                 │  engine/gates  engine/validate │ → engine/report → exit 0|1|2
                 └─────────────────────────────┘

   census/ writes i18n-gates/*.json          ci/gates.yml runs the whole thing
   (reads render-index, never a gate)        (preserves the 0/1/2 distinction)
```

Dependency direction is acyclic and one-way: **host → adapter → engine**. No engine module names a
host path, a locale, or a natural-language string.

---

## Phase 3 — Policy extraction

Every configuration that must become project-owned, with its ownership, derivation, lifecycle and
regeneration policy. **None of these ship with values.** Each ships as an empty schema plus its `$doc`
derivation block plus a labelled Adventure Tours example under `reference/`.

| Policy | Owner | Derivation | Lifecycle | Regeneration |
|---|---|---|---|---|
| **4f markers** (244–276/locale) | Localization lead | EN heading tokens ≥3× that appear in **zero** headings of the target locale, computed on a corpus believed clean | **Frozen at freeze time.** Re-deriving at run time is a defect: an introduced English heading adds its own tokens to the locale vocabulary and deletes the marker that should have caught it | `census/markers.js`, run **only** after a corpus review closes. Re-freezing after a defect is fixed is correct; re-freezing on a schedule is not |
| **4f `licensed.global`** (48) | Localization lead + native reviewer | Headings that survived localization into `ja`/`zh` **unchanged** — the corpus attesting they are untranslatable — plus locked programme names | Append-only; removal requires evidence | Manual, evidence-cited |
| **4g identities** (31 global + per-locale) | Localization lead | Anchor byte-identical to the EN anchor for the **same destination**, reviewed | Per-locale where policy is per-locale (`Vernal`/`Utah` are identities in 6 locales and deliberately **not** in `ja`) | `census/identities.js` proposes; a human registers |
| **4g markers / nativeMarkers** | Localization lead | Same construction as 4f, on the anchor surface | Frozen, same rule | `census/markers.js --surface anchors` |
| **4g `measured_not_identities`** | Whoever ran the census | Records what the census **refused** to register and why (`Home`, `Guides`, `Dinosaur Country`, bare `State Park`) | Append-only, permanent | Never regenerated — it is a decision log |
| **4h locks / imperative / connectives** | Localization lead + native reviewer | Locked disclaimer phrases, the imperative particle, coordinating connectives, per locale | Grows when a new boilerplate phrase is locked | Manual; **grammar stays in engine**, never enumerate licensed shapes |
| **4h clause/sentence boundaries** | Framework, overridable | Punctuation classes per script | Stable per writing system | Framework default + host override (`——` must be a boundary; `、` must not) |
| **4h/4i conserved counts** | Localization lead | Measured on the **rendered** corpus, never carried from source (zh 982 rendered vs 994 source) | `min` floors rise freely; the three exact `count`s need deliberate re-baselining | `census/baselines.js`. **Verify with the gate, never with grep** — raw grep of the zh core returns 1252 because it counts nav/footer/head |
| **4i locks** (50/7 locales) | Localization lead | One rendering per concept, from decided-and-applied review items; carries EN-casing sense discriminators and `licensedIn` compound masks | Blocking iff decided-and-applied; advisory while the decision is open | Manual, with provenance required (registry rejects a lock with no `provenance`) |
| **4i anchors** (18) | Framework contract, host values | Each asserts a locked phrase is the value shipped under a named key in a named locale dictionary | Must track the dictionary | Manual — these are what stop the frozen JSON becoming a second source of truth |
| **4i `measured_not_forbidden`** | Whoever ran the census | Candidate rules the census **killed** (`de Startpunkt` 10, `zh 指南` 81 = mostly 指南针 *compass*, `de Trail` 134) | Append-only, permanent | Decision log |
| **4j parity bindings** | Project architect | Which key source and which dictionary registry (§2.4) | Set at greenfield, changes only on refactor | Manual |
| **IA policy** (hub/pillar/spoke, `MIN_SPOKE_WORDS`, exception lists) | Project architect / editor | Site information architecture and editorial floor | Per project, may change per phase | Manual |
| **Site facts** (`SITE`, authors, hubs) | Business owner | — | — | Manual |

**Three rules that govern all of it:**

1. **Empty policy is exit 2, never exit 0.** A locale registered in the host but absent from a gate
   config must fail *loudly*. The framework's default templates are empty, so a project that adopts
   the framework and builds without configuring anything gets a red build with a list of what to
   supply. Silently green is the `ja`-chrome failure and the framework exists because of it.
2. **`state: in-progress | complete` per locale drives severity, not a global switch.** A locale
   mid-translation demotes findings to advisory; a complete locale blocks.
3. **Every frozen number records what it measured and when.** `measured_at`, corpus size, and the
   extractor that produced it. A count without its measurement window is the DC-5 defect the program
   hit four times (character distance → syntactic slot → particle → residue axis).

---

## Phase 4 — Gate lifecycle model

The brief proposes: greenfield → 4j, 4i; initial localization → 4h; reviewed corpus → 4f, 4g. That is
correct in its ordering, and the evidence sharpens it in two places — **4i splits across two stages**,
and there is a **stage 0** where the right answer is no gates at all.

| Stage | Gates active | Why |
|---|---|---|
| **0 — English only** | `engine/validate` only | Nothing to localize. But the structural decisions made here determine whether the later gates can work at all: shared content must live in one module keyed by permanent ids, and dictionaries must be `Record<Locale, …>` (fail-closed), not `Partial<Record<…>>`. **A project that skips stage 0 pays for it at stage 2.** |
| **1 — Greenfield / pre-translation** | **4j** (full) · **4i locks** (identity half only) | 4j needs no corpus — it is a source-level set difference, and it is the only gate that fails in ~1 s instead of after a full build. 4i's *locks* are writable before a word is translated: a lock names the correct value outright, which makes it the terminology brief in executable form. Its *counts* cannot exist yet. |
| **2 — Initial localization** | + **4h** · **4i counts** (as `min` floors) | 4h needs rendered pages and a locked boilerplate phrase to have a seam at. Its power is proportional to how much boilerplate is locked: `zh`/`ja` have a uniform disclaimer and get all four rules; `de`/`es`/`it`/`pt`/`fr` phrase it variably and get the connective rule only. Counts are floors here, never exact — pages are still being added. |
| **3 — Reviewed corpus** | + **4f** · **4g** · 4i exact counts | 4f and 4g **must not** be frozen earlier, and the reason is measured, not theoretical: a marker lexicon derived from a corpus that already contains the defect **self-excludes the tokens that would catch it**. A9 (`<h2>Key Takeaways</h2>` shipped in `de`) was in the corpus when 4f froze at P35, so `key` and `takeaways` were absent from 4f's 250 `de` markers *by construction*. 4i caught it instead, because a lock names the value rather than inferring it. |
| **4 — Steady state** | all five, in the P40 order | `4j → build → validate-site → 4f → 4h → 4i → 4g`. Only 4j is source-only; every other gate reads `dist/`, so placing one before the build either exits 2 on a clean checkout or — far worse — validates a **stale** `dist/` and reports green for content that was never built. |

**Why the order within stage 4 is load-bearing** (from §7.1 of the handoff, and worth shipping as
framework documentation rather than re-derived per project): `validate-site` leads the `dist/`
consumers because **structure precedes content** — a missing route otherwise yields phantom heading
and glossary findings. `4f → 4h → 4i` is **coarse to fine** — a whole English heading, then an
ungrammatical join, then a single wrong term — so the first failure is the diagnostic one. 4g runs
last because it is advisory and must never mask a blocking failure.

**The gate-mode taxonomy, which the framework should ship as a design vocabulary:**

- **Structural** (4j) — asserts a set difference. Zero false positives possible. Always blocking.
- **Regression** (4f) — reports zero on the corpus it was derived from, *by construction*. Zero
  findings is tautological, not evidence of cleanliness. Blocking is safe precisely because of that.
- **Grammatical** (4h) — encodes a licensing rule, so new shapes obeying it pass without being listed.
  Blocking, and the only gate that can find a defect on the corpus that produced it.
- **Nominative** (4i) — a lock names the correct value, so it is immune to the self-exclusion that
  limits 4f. Blocking where decided-and-applied, advisory where the decision is open.
- **Advisory by construction** (4g) — exit 0 is the only content outcome; the sole non-zero exit is
  2 = could not run. *Because* it cannot fail a build it is safe to wire in everywhere.

The governing rule behind all five: **block only where a correct value is enumerable; everything else
reports counts.** The program's empirical finding is that most flagged items are not defects (A3
239/251 kept, C2 230/232, C4 503/503, B4 597 correct : 55 corrections). A structurally high-FP check
that blocks gets switched off within a week, and then it protects nothing.

---

## Phase 5 — Migration guide (design)

### 5.1 Path A — an existing English Astro site becomes localization-ready

Six steps, each with a stop condition. Steps 1–3 change no rendered output; step 4 is the first that
can.

1. **Locale registry.** Add `i18n.ts` (or declare locales in the manifest for a non-Astro host).
   English-only is a valid registry. `dist/` must be byte-identical after this step.
2. **Chrome extraction.** Route every repeated string through `t()`. The English dictionary is copied
   *verbatim* from the components, so the site is byte-identical. **Stop condition:** if a string is
   business fact (NAP, price, fleet) it goes to `site.ts`, not the dictionary; if it is page body copy
   it goes to page content. One string, one source.
3. **Shared-content modules.** Any block duplicated per locale-to-be — galleries, carousels, tables —
   moves to one module with **permanent ids that are never path-derived**. Verify with an md5 manifest
   of the pre-change build; the count must be zero changed files. This is P31, and it is the step
   projects skip.
4. **Adopt the framework.** `npm i`, write `host-manifest.json`, run the empty-template gates. Expect
   exit 2 with a list of what to configure — that is the framework working.
5. **Stage-1 policy.** Write 4j bindings and 4i locks. Translate nothing yet.
6. **CI.** Reusable workflow, exit codes 0/1/2 kept distinct in the job summary.

### 5.2 Path B — onboarding a second multilingual project

The framework's own acceptance test. **AltaMedicare is the intended validation target; it is not
analyzed or modified here, and F1 makes no claim about it.**

| Step | Deliverable | Passes when |
|---|---|---|
| B1 | Manifest + adapter selection | Gates locate locales without a source-shape assumption |
| B2 | Stage-1 policy authored from scratch | No Adventure Tours value appears in any config |
| B3 | First localized batch | 4h configured for the new locales' boilerplate |
| B4 | Census run | `census/` produces 4f/4g policy from *that* corpus |
| B5 | Freeze + steady state | Full pipeline green; exit-code contract intact |

**The evidence that would falsify the extraction** — state this before B1, not after: if B2 or B4
requires editing framework code, the boundary is in the wrong place, and the specific edit names the
policy that leaked into the engine. That failure is more valuable than a clean pass, and the migration
guide should say so.

**Portability is already partly proven.** P41 established that the project builds on a case-sensitive
Linux runner from `package-lock.json` alone: 49,865 root-relative references replayed against a
byte-exact path set, **0 case-only resolutions**. No build in this project's history had ever been
checked case-sensitively before that, because `existsSync` is case-insensitive on Windows. The
framework must ship that check as part of `engine/validate/links`, not as a one-off audit — a
Windows-authored project cannot otherwise discover the defect locally.

---

## 6. Recommended repository structure

**Two repositories, not one.** Adventure Tours stays as it is and becomes the reference implementation;
the framework is extracted into its own repository and consumed as a dependency.

```
adventuretoursvernal/                  ← reference implementation, unchanged in shape
├── host-manifest.json                    ← NEW: the manifest (host contract)
├── i18n-gates/*.json                  ← unchanged: this project's policy
├── src/                               ← unchanged
├── docs/adopting-the-framework.md     ← NEW: what this repo demonstrates
└── package.json                       ← gate scripts now call the dependency

astro-localization-framework/          ← NEW repository
├── engine/ census/ adapters/ ci/ schemas/ docs/ reference/
└── packages/i18n-core/                ← the runtime half (§2.3)
```

Rationale for two repos rather than a monorepo: the framework's release cadence is measured in
features, the site's in content batches; a monorepo would couple a translation commit to a framework
version. The cost is a version bump on every framework change, which is the correct friction.

---

## 7. Success criteria, made checkable

| Criterion (from the brief) | Verifiable as |
|---|---|
| Adventure Tours remains the canonical reference implementation | Its `dist/` is byte-identical before and after adopting the extracted framework (857-file manifest, 619 pages) |
| Framework contains reusable engineering only | No non-ASCII string literal outside comments under `engine/`; no `readFileSync` of a `src/` path; grep for `Vernal`, `Dinosaur`, `UTV` returns hits only under `reference/` |
| Policies separated cleanly from engines | Every gate runs green against Adventure Tours with its config supplied *entirely* by manifest path, and exit 2 with the config removed |
| Second projects adopt without inheriting content | A fresh init produces empty templates; the pipeline exits 2 listing what to configure, never 0 |

---

## 8. Open decisions for the owner

1. **Package split.** One package + `i18n-core` (my recommendation, §2.3) vs the brief's four-package
   layout. Affects the implementation phase's shape, not its content.
2. **Generalize 4j to cover `ui.ts` chrome (§2.4).** It is the highest-value single change in this
   design — structurally it would have caught the founding `ja` failure — but it makes `UI_STRINGS`
   fail-closed, which is a typed change to a shipped file and needs its own phase.
3. **`census/` scope.** Full generators for 4f/4g/4h/4i baselines, or 4f/4g markers only for now?
   Without any of it a second project cannot produce policy; with all of it F2 grows substantially.
4. ~~**Where this document lives.**~~ **CLOSED.** Committed to `docs/framework/` per F2 ADR-6, which
   ratified that home over the repo root. All four open decisions above were closed by F2.

---

## 9. What F1 deliberately did not do

No code was written. No file was moved, renamed or deleted. No package was created. Nothing was
extracted. `git status` is clean. AltaMedicare was not opened, read or referenced beyond naming it as
the intended validation target.

**The one thing F1 could not settle from inspection alone:** whether `render-index` unification (§3.1)
can be introduced with the 4h/4i baselines unchanged. The two extractors are byte-identical *today*,
so unifying them should be a no-op — but 4g's entity decoding and letterless-anchor handling are
genuinely different behavior, and merging them into one extractor family without re-baselining is an
assumption, not a proven fact. The implementation phase must verify it against the live corpus
(expected: zh core stays 982, ja core stays 940) before touching anything else.
