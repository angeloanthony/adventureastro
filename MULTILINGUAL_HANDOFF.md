# Adventure Tours Vernal — Multilingual Handoff

**Purpose:** the single frozen reference for the multilingual rollout. Every translation
chat starts with *"Read MULTILINGUAL_HANDOFF.md and do Batch N"* and nothing else.
Do **not** paste the playbook, the Build Guide, or prior chat history into translation
sessions. If a rule isn't here, it isn't in scope.

Governing engineering standard: *Production Multilingual System for Astro* (the playbook).
This doc is the Adventure-Astro-specific application of it. Where the two differ, this
doc wins because it reflects the actual repo.

---

## 0. Project status — the LTR framework is COMPLETE (2026-07-25)

**This document has changed character.** It began as an implementation playbook for a
single localization push. It is now the **maintained release process** for a finished
left-to-right localization framework. Read §0 before anything else: it tells you what is
done and closed versus what is open, so nothing below §0 gets mistaken for pending work.

### ✅ Complete — the LTR localization framework

Validated end-to-end through Simplified Chinese. The pipeline is no longer provisional;
it shipped seven locales without an architecture change, which was the point of freezing
it in §1.

| Deliverable | State |
|---|---|
| **Seven locales feature-complete** | `es` `it` `pt` `fr` `de` `ja` `zh` — each at **77/77 registered routes** (57 MDX spokes + 20 inline pages) |
| **Route parity** | `zh` = `ja` = `de` = 77/77, verified identical route sets |
| **Six-stage locale lifecycle** | §7 — proven across all seven, no per-locale special-casing |
| **Standing release gates** | §7 Gates **4a** (UI-chrome parity, two parts), **4b** (dependency-root ordering), **4c** (corpus beats brief), **4d** (cross-locale body-link audit), **4e** (locked-phrase seam check) — all BLOCKING |
| **Anchor-integrity check** | every `#anchor` has a matching explicit `id=` — added at Z3, now permanent |
| **Internal-link localization** | §8 (P11) + §9 (P11.1) + Z5 — **0 route downgrades in every locale**; only 354 intentional author-bio links remain English |
| **Release-tag policy** | §1 — `i18n-<locale>-complete`, annotated; 8 tags on origin (7 locales + `v1.0-content`) |
| **77-route completion criterion** | §1 — an explicit engineering rule, not institutional knowledge. **Registration in `LOCALE_SLUGS` is load-bearing**; file presence alone mis-identifies the completion commit |
| **Build baseline** | `astro check` 0/0 · `npm run build` **619 pages** · `npm run validate` ✔ |

Sections **§8**, **§9**, and the Z-phase work they describe are **closed history**. They
are kept because their lessons are reusable, not because anything in them is outstanding.

### ⏳ Open — tracked elsewhere, deliberately not in this document

| Item | Where it lives | Blocking? |
|---|---|---|
| **Native-speaker editorial review** (`de`, `ja`, `zh`) | `NATIVE_REVIEW.md` — 13 items with corpus counts; **8 decided** (A1, A2, A3, A4, A5, A6, C1, C6), **5 open** (**A7**, B1, C2, C3, C4) | Not for engineering. **German as originally scoped is COMPLETE**: A1 register, A1-residual (P12), A2 sentence case (P13), A5 heading localization (P14), A6 `Leave No Trace` lock (P15), A3 `Piste` retained (P16), A4 generic `Trail` localized (P17). P17's census raised one **new** `de` item, **A7 `Trailhead`** (41 uses; the "never-translate" lock is contradicted by the corpus — `de` has `Ausgangspunkt` 330×, and es/fr/it/pt all translate). A7 is an owner decision, not a defect |
| **`es` / `it` never reviewed** | `NATIVE_REVIEW.md` §D — their tags are retroactive markers, not review sign-off | No |
| **RTL infrastructure (Arabic Stage 0)** | §10 — a **new engineering initiative**, not an extension of this rollout | No |
| **Additional LTR locales** | §10 — the pipeline is ready; each is execution, not design | No |

**The boundary, stated plainly:** everything in this document except §10 describes a
completed and tagged system. Do not reopen §1–§9 to add a locale — follow §7. Do not
extend this document to cover RTL — see §10 for why that is a separate project.

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
- **Language order:** 🇪🇸 Spanish complete first → 🇮🇹 Italian → 🇵🇹 Portuguese → 🇫🇷 French →
  🇩🇪 German → 🇯🇵 Japanese → 🇨🇳 Simplified Chinese. Finish one language fully before starting
  the next; the workflow improvements compound. Status: ES/IT/PT/FR/DE/JA/ZH all
  feature-complete as of 2026-07-25.
- **Release-tag policy — when it started.** The formal `i18n-<locale>-complete` tag
  convention began with **Portuguese**; `i18n-pt-complete` and `i18n-fr-complete` were both
  created on the same commit (`9f360f3`, 2026-07-18) when the policy was adopted. **Spanish
  and Italian were completed before the policy existed and were never tagged
  contemporaneously.** `i18n-es-complete` and `i18n-it-complete` were created on 2026-07-25
  as **retroactive markers** reconstructed from structural evidence (see below) — their
  annotations say so. They are not contemporaneous release gates, are not build-verified at
  those commits, and are not editorial sign-off. Verified state as of 2026-07-25: 8 annotated
  tags (7 `i18n-*-complete` + `v1.0-content`) present **both locally and on origin**.
  Definition of complete used throughout: **77 registered routes**
  (57 MDX spokes + 20 inline pages) present in the tree *and* registered in the locale's
  `*_SLUGS` set in `src/lib/i18n.ts`. Registration is load-bearing — Italian reached 57 MDX +
  20 inline pages at `7bff110` with only 58/77 slugs registered, leaving a third of its routes
  dark (no hreflang, no switcher entry, validator orphans). Historical completion points:
  **es → `aab144b`**, **it → `0ab5581`** (both 2026-07-16).
- **Engineering-complete ≠ editorially closed.** DE, JA and ZH each carry an open
  native-speaker review, tracked in `NATIVE_REVIEW.md` and sequenced in **§10.1** — not in
  §6, which is about running a translation batch. The German `du`/`Sie` call gates the DE
  review; see §10.1.

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

The build is the gate. `npm run build` runs the content schema, `scripts/validate-site.mjs`,
and every localization gate — see §7.1 for the full pipeline and its ordering rationale.
A translated page that violates these fails the build:

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

## 7. Locale lifecycle (six stages — the definition of "done")

**This is the standing process for any new LTR locale — the one section of this
document that is still live.** Proven across all seven locales (es/it/pt/fr/de/ja/zh,
plus the en master) with no architecture change. Every future LTR locale follows
this pipeline with no special-casing unless a genuine bug forces a fix (see appendix
below — fix once centrally, don't redesign per locale). An RTL locale needs Stage 0
first; see §10.2.

1. **Registration & infrastructure.** Add the locale to `LOCALES` in `src/lib/i18n.ts`
   with an empty slug set in `LOCALE_SLUGS`. Confirm the build stays byte-identical
   (page count unchanged) before any content lands — proves the registry pattern
   needs zero other code changes for a new locale. Lock the register (formal/informal)
   via corpus grep against a sibling locale or `AskUserQuestion` if there's no
   precedent — never assume.
2. **MDX spoke translation.** All 57 spokes, hub-by-hub, same order every time:
   utv(7) → hiking(16) → fishing(4) → camping(4) → scenic-drives(4) → guides(9) →
   itineraries(9) → things-to-do(2) → dinosaur-national-monument(2). One on-disk
   brief per batch (carry the full locked glossary + accumulated critical warnings
   forward each batch), parallel subagents, then a central structural-mirror QA
   harness + terminology grep before declaring the batch done.
3. **Full-locale spoke audit.** Once 57/57 land, run one audit against the whole
   set (not per-batch): registry parity (slug set ↔ on-disk files, zero orphans
   either direction), `astro check`, `npm run build`, validator, hreflang sample,
   sitemap count, metadata caps, and the corpus-consistency sweep (§ Editorial
   decision rules below + register-drift check). Fix only content-layer drift here;
   a structural finding gets fixed once centrally, not redesigned per locale.
4. **Inline pages + shared UI.** Translate all 20 inline pillar/commercial/gateway
   pages and populate `UI_STRINGS.<locale>` in `src/lib/ui.ts`. For every
   module-backed page this is **two deliverables, not one**: the
   `page-content/*.ts` content block AND its literal Astro route file
   (`src/pages/<locale>/<page>.astro`) — there is no shared/dynamic route for
   these pages. Brief both halves explicitly (see the PT_P6 lesson below — a
   brief that only asks for the content block silently ships ~90 broken links).

   **Gate 4a — UI-chrome parity (BLOCKING).** *A locale is not complete until its
   UI chrome matches a finished locale with zero unintended English fallbacks.*
   `t()` fails soft by design: a missing key silently returns the English master,
   so the pages render, the build passes, the validator passes, and the locale
   ships looking finished while every nav label, button, and breadcrumb is in
   English. Nothing in the pipeline catches this — only a key-set diff does.
   Before declaring any locale done, diff `UI_STRINGS.<locale>`'s key set against
   a **finished** locale's (not against `EN` — `EN` is the fallback, so a
   locale with an empty dictionary trivially "matches" at render time), and
   confirm every key present, every value actually translated, and no value left
   identical to its English string unless that string is a frozen proper noun.
   Discovered 2026-07-22: all 57 Japanese MDX spokes shipped and passed every
   build/validator/audit gate while rendering **100% English chrome**, because
   `ui.ts` had no `ja` dictionary. Add the key-set diff to stage 5, and run it
   the moment the first page of a new locale lands, not at the end.

   **The key-set diff is necessary but NOT sufficient — also scan rendered
   output.** English leaks downstream of the dictionary in two ways a key diff
   cannot see, because every key exists and is correctly translated:
     1. **Interpolated unit words baked into a value.** `CityLayout.astro:45-48`
        builds `value: \`${city.driveTimeHours} hours\`` and
        `\`${city.driveMiles} miles\``, so the gateway page renders a localized
        label against an English value — `Fahrzeit → 3 hours`,
        `Entfernung → 175 miles`. Confirmed present in es/it/pt/fr/de as of
        2026-07-22 (found during the JA P10K rollout, pre-existing, not fixed).
     2. **English-only content-collection fields rendered as display values.**
        The same layout passes `city.routeSummary` and `city.nearestAirport`
        straight through, so every locale shows
        `I-80 E to US-40 E through Heber City, Duchesne, and Roosevelt`.
   So Gate 4a has two parts: (a) key-set parity against a finished locale, and
   (b) a rendered-output scan of `dist/<locale>/**` for runs of Latin-script
   prose outside the frozen proper-noun list. Part (b) is what catches the
   value-side leaks. For a non-Latin-script locale like `ja` this scan is cheap
   and high-signal; for Latin-script locales, diff visible text against the
   English page and expect near-zero identical non-proper-noun strings.

   **Gate 4b — dependency-root ordering (BLOCKING).** *Translate dependency roots
   before dependents. Never create an internal link to a locale route that does
   not yet exist.* The `page-content/*.ts` blocks and inline hub pillars hardcode
   `/<locale>/` link prefixes in raw HTML — they do **not** route through the
   existence-aware `localeHref()`, so a link written ahead of its target is a hard
   validator failure (`broken link:`), not a graceful English fallback. When the
   20 inline pages are split across parallel batches, fix the order —
   commercial/core (booking first) → UTV + DNM pillars → the 7 activity hubs →
   gateway/legacy/restaurant — and give every batch an explicit allow-list of the
   `/<locale>/` routes that are live *for that batch*. Anything not on the list
   keeps its English path, and a central link-upgrade pass re-prefixes those
   fallbacks once the final batch lands. Two-segment paths are not a reliable
   "is a spoke" test: `/from/salt-lake-city/` and
   `/things-to-do/best-restaurants-vernal-utah/` are inline pages, not spokes —
   name them explicitly in every batch brief.

   **Gate 4c — corpus beats brief (BLOCKING).** *When a translator challenges a
   brief's terminology using objective corpus evidence, verify the corpus before
   enforcing the brief.* The brief is a summary written ahead of the work; the
   shipped corpus is the ground truth readers actually see. In P10K the Batch A
   brief froze `Vernal`/`Utah` as English while the shipped `ja` corpus had
   バーナル 1679 / bare `Vernal` 0 — two agents grepped, contradicted the brief,
   and were right. Procedure when a challenge arrives: grep the corpus for both
   forms, count; if the corpus wins, update the glossary, sweep every file
   already shipped under the wrong rule (it is never just the challenger's file),
   and re-brief the remaining agents. Do not resolve these locally per file —
   that is how cross-batch drift is created.

   **Gate 4e — locked-phrase seam check (BLOCKING).** *A phrase frozen in the
   glossary is locked by editorial INTENT, not by byte sequence — and every place
   it was joined to surrounding prose must be checked at the seam, not just
   counted.* Appending a fixed string to heterogeneous sentence openings is its own
   defect generator: the phrase is present and correct everywhere a term-count
   verifies, while the *joins* are ungrammatical. Discovered 2026-07-25 in `zh`,
   where the locked caveat `请向官方渠道核实` had been appended to sentences already
   opening with `请`, producing `请…请向官方渠道核实` — *please … please verify with
   official channels* — in **27 places across 13 files**. Every terminology grep,
   `astro check`, the build, and the validator passed the whole time, because the
   locked phrase itself was never wrong.

   So for each locked phrase, do two things:
   1. **Grep the seam, not just the phrase.** Search the phrase's leading token
      repeated in the preceding clause (here: `请[\p{Han}]{1,12}请向…`, plus the
      conjunction variants `并请向` / `先请向`). Encode the boundary: `请A，请B`
      across a comma is *correct* Chinese and must not be flagged — the defect is
      two imperatives inside **one** clause.
   2. **Census the prefixes before assuming uniformity.** Counting the exact
      string reported 962 instances and implied a byte-uniform lock; counting the
      *core* (`官方渠道核实`) found **994** with dozens of grammatical variants
      already shipped, including 16 with no `请` at all. The lock had never been
      byte-uniform, so a "restore the exact string" sweep would have been the
      wrong fix.

   **Policy: intent over uniformity.** Define a locked phrase by what it must
   convey ("direct the reader to verify through official channels"), permit minor
   grammatical adaptation at the joins, and require the *core* count to be
   conserved across any sweep — 994 before, 994 after, only the prefixes changed.
   Standardise where possible; never sacrifice grammaticality for mechanical
   uniformity. Applies to every locale: the same hazard exists wherever a brief
   freezes a full sentence rather than a term.

   **Gate 4d — cross-locale body-link audit (BLOCKING).** *Once a locale reaches
   full route coverage, no internal body link in that locale may still point at
   the English route.* Until coverage is complete, English hrefs are the correct
   existence-aware fallback (Gate 4b); the moment coverage lands, every one of
   them is a pure downgrade — it drops the reader out of their language and
   splits internal-link equity across two URL sets. Run the §8 whitelist pass and
   assert zero residual: for each `src/content/**/*.<locale>.mdx`, every
   root-relative `href="/…"` and `](/…)` whose slug is in that locale's
   `LOCALE_SLUGS` set must already carry the `/<locale>/` prefix. Deliberate
   exceptions must be named explicitly in the phase doc, not left implicit.
5. **Runtime verification.** Verify in the actual built `dist/` output, not source:
   the Gate 4a UI-chrome key-set diff, hreflang reciprocity (full alternate set +
   x-default, on both the new locale's
   pages and the English pages that should now list it), breadcrumb resolution
   (existence-aware fallback firing correctly), `og:locale`/`inLanguage`, sitemap
   coverage, language-switcher correctness, and a cross-locale internal-link-set
   parity check (extract every `href` per locale, strip the prefix, diff against
   the English master — stronger than per-file byte-diffing, see lesson below).
6. **Freeze / tag.** Once stage 5 passes clean, tag the locale as a completed
   reference implementation (`git tag -a i18n-<locale>-complete`) and treat it as
   the template — future locales' briefs should quote its locked glossary/rules
   directly rather than re-deriving them.

---

## 7.1 The validation pipeline (P40 — wiring, 2026-07-27)

`npm run build` is the single command that performs complete localization validation.
`npm run validate` re-runs every check against an **existing** `dist/` without rebuilding.
Neither introduces validation logic; both only sequence the gates P34–P38 already defined.

```
npm run build   →  gates:src  →  astro build  →  gates:dist
npm run validate →  gates:src  →                  gates:dist
```

| Step | Script | Reads | Semantics |
|------|--------|-------|-----------|
| 1 | `gate-4j-gallery-parity` | **source** | blocking |
| 2 | `astro build` | source → `dist/` | blocking |
| 3 | `validate-site` | `dist/` | blocking |
| 4 | `gate-4m-media` | `dist/` | blocking |
| 5 | `gate-4k-direction` | `dist/` | blocking |
| 6 | `gate-4n-isolation` | `dist/` | blocking |
| 7 | `gate-4f-headings` | `dist/` | blocking |
| 8 | `gate-4h-seams` | `dist/` | blocking |
| 9 | `gate-4i-glossary` | `dist/` + `src/lib/ui.ts` | blocking |
| 10 | `gate-4g-anchors` | `dist/` | **advisory** |

*(4k was added by AR-2 B-1 and wired at the same time; this table omitted it until
2026-07-28. 4n was added by AR-2 Track A and 4m by V-1 phase V-0, both the same day.
`package.json` is the authority for the order — if the two disagree, the table is the one
that is wrong.)*

**Why this order.**

1. **4j runs before the build because it is the only gate that reads source alone.**
   It parses `src/lib/i18n.ts` and `src/page-content/home-gallery.ts` and needs no
   rendered output, so it is the one check that can fail in ~1s instead of after a
   2m15s build. Everything it could catch is a defect the build would faithfully
   render anyway.

2. **The build sits in the middle because it manufactures the substrate.** Gates
   4f/4g/4h/4i and `validate-site` all read `dist/`. This is not an optimization —
   *it is a correctness constraint.* Any ordering that puts a `dist/`-consuming gate
   before `astro build` either exits 2 on a clean checkout ("dist/ not found") or,
   far worse, silently validates a **stale** `dist/` on a dirty tree and reports
   green for content that was never built. The gates read rendered output by
   deliberate design — 4h exists precisely because C6's seams measured 0 in plain
   source and 249 as rendered — so the dependency cannot be relaxed.

2a. **4m sits first among the `dist/` gates after `validate-site` because it asks the
   coarsest question of the three structural checks: is the page carrying the media it is
   supposed to carry?** It reads no text, no direction and no locale dictionary, so nothing
   upstream of it can make its findings noise — and a page missing its videos entirely is a
   diagnosis a reader wants before a heading or seam report.

2b. **4k then 4n sit directly after `validate-site`, ahead of every content gate, for the
   same reason `validate-site` leads: direction is a property of the *document*, not of the
   prose.** If a page's effective direction is wrong, findings from 4f/4h/4i about that
   page's text are describing a document that was mis-assembled. Structure first, then
   direction, then content.

   **4n depends on 4k specifically, not merely on ordering convention.** It classifies a
   page's text against the direction the *registry declares*, never against the `dir` it
   finds on the page — and those two agreeing is exactly 4k's invariant. Run 4n on a build
   where a page's direction contradicts its declaration and every finding describes a
   document that was assembled wrong; run it ahead of 4k and it would silently agree with a
   page that lies.

3. **`validate-site` leads the `dist/` consumers because structure precedes content.**
   It checks routes, link resolution, and schema. If the site is structurally broken,
   the content gates' findings are noise — a missing page yields phantom heading and
   glossary failures that vanish once the route is restored. Failing on structure
   first keeps the first error the diagnostic one.

4. **4f → 4h → 4i is coarse-to-fine.** 4f catches a *whole heading left in English*;
   4h catches ungrammatical *joins* inside phrases that are otherwise correct; 4i
   verifies *individual glossary terms*. A 4f failure implies large untranslated
   regions that would make 4h and 4i emit noisy downstream findings, so the coarsest
   signal is allowed to fail first.

5. **4g is last because it is advisory.** Placing it at the tail means its report is
   the final output of a successful run (where a reviewer will actually read it), and
   it can never delay or mask a blocking failure.

**Failure semantics.** The chain is `&&` throughout, so the first non-zero exit
terminates validation — blocking gates fast-fail and nothing downstream runs.
Exit `1` = content violation; exit `2` = the gate could not run (missing `dist/`,
unparseable config) and is never silently degraded into a pass.

**"4g always runs" means unconditional on findings, not unconditional on failure.**
4g exits 0 for *every* content outcome — review candidates are questions, not defects
(P38) — so it is the one gate whose result can never fail a build. It is still subject
to fast-fail: if a blocking gate fails, the run stops and 4g does not execute, which is
correct, because an advisory report about a corpus that failed a blocking check is not
actionable. The only way 4g exits non-zero is exit 2, an execution error in the tool
itself.

**No duplicate work.** `gates:src` and `gates:dist` are single composite scripts shared
by `build` and `validate`; no gate executes twice in one invocation. Individual gates
remain runnable in isolation via `npm run gate:4f` etc. for iteration.

---

## 7.2 Gate index (all gates, scripted and not)

§7.1 is the **pipeline** — what runs, in what order. This is the **catalogue** — what each
gate is *for*, including the ones no script executes. The two answer different questions and
neither replaces the other. Added 2026-07-28, when writing it found 4k missing from §7.1.

**Enforcement is the column that matters.** Half of these gates are process rules a human
performs; a reader who assumes `npm run build` covers everything numbered `4x` will ship the
exact class of defect 4a exists to prevent.

| Gate | Scope | Enforcement | Purpose |
|------|-------|-------------|---------|
| 4a | source | **manual** | UI-chrome parity — key-set diff vs a *finished* locale, plus a rendered-output English scan |
| 4b | source | **manual** | Dependency-root ordering — translate roots before the pages that link to them |
| 4c | process | **manual** | Corpus beats brief — a measured corpus overrules a brief's worked example |
| 4d | `dist/` | **manual** | Cross-locale body-link audit — no route downgrades once a locale is covered |
| 4e | `dist/` | **manual** | Locked-phrase seam check — grep the *join*, not just the phrase (scripted successor: 4h) |
| 4f | `dist/` | `gates:dist` | Untranslated headings, via a frozen per-locale marker lexicon |
| 4g | `dist/` | `gates:dist` | Anchor-text audit — **advisory by construction**, exit 0 is its only content outcome |
| 4h | `dist/` | `gates:dist` | Rendered-seam detector — ungrammatical joins at a locked phrase |
| 4i | `dist/` + `ui.ts` | `gates:dist` | Glossary-lock drift, with `licensedIn` compound masking |
| 4j | **source** | `gates:src` | Gallery parity — every registered locale explicitly defines every key |
| 4k | `dist/` | `gates:dist` | Direction integrity — tests *effective* direction, not the attribute |
| 4n | `dist/` | `gates:dist` | Bidi isolation — a mirrored character whose flanking strong types **differ**, outside an isolated run (ADR-10) |
| 4m | `dist/` | `gates:dist` | Rendered media identity — per-page video-ID **set** vs a frozen baseline, plus cross-locale route parity |
| **4l** | **source** | **specified, not built** | No `youtube.com/embed` outside the facade component — [`docs/perf/V1-video-facade.md`](docs/perf/V1-video-facade.md) §6.1.1 |

**4l does not exist.** It is specified in the V-1 brief and nothing enforces it today. The
row is here so the numbering does not collide, and so the gate gets built rather than
re-invented — not as a claim about the current suite. Reserving numbers worked twice in one
day: the isolation gate took `4n` on the strength of this table, and 4m shipped into the row
that was held for it. **The next gate takes `4o`.**

**4m counts distinct videos, not references, and that is the whole design.** `/utv/` renders
24 references to 21 videos — the ambient hero and one carousel slide are the same upload.
A reference count is not stable across a change of *embedding form*, and surviving exactly
that change is the gate's purpose: the V-1 facade migration turns each `<iframe src=…/embed/ID>`
into an `<img src=…/vi/ID/…>`, and a gate keyed to iframes would have to be rewritten by the
migration it exists to verify. Reference counts are recorded and reported, never blocking.
Its two blocking signals fail in different directions — a frozen baseline catches drift on
an existing page but is blind to a new route until re-baselined; cross-locale parity covers
new routes the moment they exist but is blind to a defect applied to every locale at once.

**4n is the first gate that ships with a test rather than only a green run**
(`npm run test:4n`). It is prospective — it guards one Arabic route and B-2 fixed the
defects before it existed — so it is green on the day it lands and stays green until someone
regresses. A green run therefore proves nothing about it, and worse, *the rule ADR-10
rejected also passes this corpus*. The differential test is what distinguishes them. Treat
"4n is green" as evidence of nothing until `test:4n` is green too.

**Drift risk, stated plainly.** This table duplicates facts that live in `package.json` and
in the gate headers, and §7.1 already proved that duplicated facts drift — it was written at
P40 with seven correct rows and was wrong the next day, when B-1 wired 4k without touching
it. One day. Nothing checks either table. When one disagrees with `package.json`,
`package.json` wins.

---

## 8. P11 — cross-locale internal link localization (COMPLETE for MDX, 2026-07-22)

This is the "central link-upgrade pass" that Gate 4b defers to. It ran once, after `ja`
reached parity, across all six completed locales at the same time.

**What ran.** Every root-relative internal link in every localized MDX *body*
(`src/content/**/*.{es,it,pt,fr,de,ja}.mdx`, 342 files) was re-prefixed to the reader's own
locale. 11,432 links rewritten, 0 unresolved, 0 left English.

**The rule that made it safe — whitelist, never blacklist.** A link is rewritten *only* when
its normalized slug is present in that locale's `LOCALE_SLUGS` set in `src/lib/i18n.ts`. That
direction is what makes the pass structurally incapable of touching anything else: asset paths
(`/images/…`), `tel:`, `mailto:`, external URLs, `#anchor` links, and any not-yet-translated
route can never appear in a slug registry, so they are left alone without needing a rule of
their own. Never invert this into "rewrite everything except <exclusion list>" — the exclusion
list is unbounded and will silently corrupt asset paths.

**Frontmatter is never touched.** The transform splits frontmatter off and rewrites only the
body, so `heroImage`, `related`, and every routing/schema field are out of reach by
construction. (Verified: the corpus has zero internal links in frontmatter anyway.)

**How it was verified — reverse-the-transform diffing.** Byte-diffing 342 files by eye is not
a check. Instead, every added line had its locale prefixes programmatically *removed* and was
compared to the line it replaced: 5,709 hunks, 11,432 prefixes, **0 mismatches**. That proves
no prose, number, asset path, or external URL moved anywhere in the corpus. Reuse this
technique for any future mechanical corpus-wide pass — it is far stronger than spot-checking.

**Idempotent.** Re-running localizes 0 and classifies all 11,432 as already-localized. Safe to
re-run after any new locale lands.

**Result:** `astro check` 0 errors · build 542 pages (unchanged) · `validate-site` ✔ links
resolve, no orphans, hub structure intact.

## 9. P11.1 — eliminating the remaining route downgrades (COMPLETE, 2026-07-22)

P11 fixed MDX bodies only. Auditing built `dist/` HTML afterwards — excluding `hreflang`-bearing
links, which are *supposed* to point at the English master — found links outside MDX that still
dropped a reader into English on a page their locale does have. P11.1 removed all of them.

**Result: 0 downgrades across all six locales.** Verified by a sweep of **33,596 attributes on
462 localized pages** (broader than `<a href>` — any `href`/`src`/`action`/`data-*`), plus a
regression check that the English master gained **0** locale prefixes. `astro check` 0 errors ·
build 542 pages · `validate-site` ✔.

| # | Source | Links | Locales | Fix |
|---|--------|-------|---------|-----|
| 1 | `components/content/TourCta.astro` — `href={SITE.booking.path}` | 348 | all 6 | `localeHref(SITE.booking.path, lang)` — `localeHref` normalizes the leading/trailing slashes, so `site.ts` stays the single source |
| 2 | `components/content/TourDecisionGuide.astro` — 7 of 8 `CHOICES` hardcoded | 42 | all 6 | `localeHref(slug, lang)`; the file already did this for the booking row only |
| 3 | `pages/es/**` + `page-content/*.ts` ES blocks | 273 | **es** (+2 `fr`) | literal `/es/` prefix, matching what `it`/`pt`/`fr`/`de`/`ja` already do |
| 4 | `layouts/CityLayout.astro` — `pillarHref(hub)` (no locale param) | 24 | all 6 | `localeHref(hub, lang)`; `pillarHref` is exactly `` `/${hub}/` `` |
| 5 | `components/content/GatewayRoutes.astro` — 3 `ROUTES` + hub link | ~60 | all 6 | `localeHref(slug, lang)` |

**Intentional English remaining: 354** — all author bios (`/about/dave/` ×348, `/about/trudy/`
×6). Correct; no localized author pages exist.

### Two lessons that cost real rework

**1. `href="/…"` is NOT the only link form — and the others are invisible to that regex.**
The first P11.1 residual count (742) was too low because the scan only matched `href="…"`.
Three further forms carry internal routes in this repo, and every one of them was hiding
downgrades:
- `href: '/guides/'` — TS/JS **object-property** form in `Footer`/`Breadcrumbs`/`CHOICES` link arrays
- `pillarHref(hub)` / `spokeHref(...)` — **helper calls**, where the literal never appears at all
- `](/guides/…)` — markdown links inside MDX

Any future link audit must scan all four forms, or it will report a clean bill of health while
downgrades remain. Prefer auditing **built `dist/` HTML** over source: rendered output is form-
agnostic and catches helper-generated links that no source regex can see.

**2. Match the locale-consistency convention, don't introduce a second one.** Localized inline
pages and `page-content` locale blocks hardcode a literal `/<locale>/` prefix (Gate 4b);
components and layouts call `localeHref()`. Spanish was fixed by adding the literal prefix —
routing `es` alone through `localeHref()` would have re-diverged the very inconsistency being
removed. Use `LOCALE_SLUGS` as the authority for *deciding* whether to rewrite; match the
surrounding file's convention for *how*.

**Verification note — symmetric normalization.** P11's "reverse the transform on the added line"
check breaks on files where some links were *already* prefixed (it strips those too, producing
false mismatches). The correct form used here: strip locale prefixes from **both** sides and
require equality, plus assert no existing prefix was ever removed. 0 content mismatches across
286 rewrites.

**Architectural note that outlives this phase:** Spanish carried 223 hardcoded hrefs while
`it`/`pt`/`fr`/`de`/`ja` each had 0, because `es` inline pages were authored in P3A–P3D before
the `localeHref()` discipline existed. **Despite being the first locale finished, `es` is not a
trustworthy template — quote `de` or `ja` when building the next locale.**

---

## 10. Future work — what is NOT part of the completed framework

Three things remain, and none of them belongs in §1–§9. Recorded here so a reader a year
from now can tell the finished system from the roadmap without reading the git log.

### 10.1 Editorial / native-speaker review — `de`, `ja`, `zh`

Owned by `NATIVE_REVIEW.md`, not by this document. Twelve items, each backed by corpus
counts rather than "please proofread" — the review is evidence-based by construction, and
must stay that way.

Sequence, in order:

1. ~~**Make the German `du`/`Sie` call** (`NATIVE_REVIEW.md` A1).~~ **DONE 2026-07-25 —
   informal `du` confirmed, the `Sie` flip is cancelled**, and the ~7,171 informal forms
   across 77 routes stand. A1-residual was then executed at P12 and **closed with zero
   corpus edits**: the corpus contains **0 formal-address leaks** (all 156 capitalised
   `Sie`/`Ihr*` are third-person or informal-plural `ihr`) and no separable capitalisation
   defect — all 44 mid-sentence capitals live inside title-cased display strings and are
   now part of A2. **German review is unblocked.**
2. ~~Run `de` / `ja` / `zh` review, collect answers. German starts at **A2**.~~
   **A2 DONE 2026-07-25 (P13)** — German sentence case applied corpus-wide as one sweep:
   297 replacements from 252 distinct strings across 55 files, covering headings, table
   headers, hero/CTA strings, `<strong>` micro-headings, bold day-labels, one quoted
   heading in prose, and four frontmatter SEO titles. Mid-sentence pronoun capitals went
   **44 → 0** while sentence-initial forms were untouched, so A1-residual closed with it.
   11 false positives were verified and rejected.
   **A5 DONE 2026-07-25 (P14)** — the 16 untranslated English headings in
   `high-uintas-backpacking-guide.de.mdx` localized; `## Leave No Trace` retained as a
   locked programme name.
   **A6 DONE 2026-07-25 (P15)** — the `Leave No Trace` lock aligned across the German
   corpus: 8 sites in 6 files, 9 descriptive-prose uses deliberately left in German.
   **All structural German review work is now closed.**
   **A3 DECIDED 2026-07-25 (P16)** — `Piste` is correct German for a UTV trail and was
   **retained** (239 of 251 occurrences unchanged); only a 12-instance compound drift
   was normalised. `de` now has **only A4** outstanding.

**Terminology lesson from P16 (the right answer to a terminology question is often
"keep it", and that still requires the full census).** A3 asked whether `Piste` was a
mistranslation. It was not — but only a census could show why: the corpus's own
off-road compounds (`Wüstenpiste`, `Waschbrettpiste`, `Offroad-Piste`) proved the
register was deliberate, the hub distribution proved the motorised/hiking split was
clean (zero contamination in either direction), and a cross-locale check showed `fr`
independently chose the same cognate while `es`/`it`/`pt` *lost* the distinction by
using their generic path word for both senses. **Do not treat "the corpus disagrees
with a peer locale" as evidence of error** — here German was more precise than three
of its peers. Two further rules this phase confirmed: check the flagged oddity before
assuming it is a defect (`Pistenpräparierung` turned out to render the master's
"grooming" in an avalanche context, and was correct), and **never sweep the bare stem**
— `Strecke`/`Strecken` (168) is overwhelmingly the *distance* and *road* sense, so a
`Strecke → Piste` sweep would have corrupted the corpus. The real defect a terminology
census usually finds is not the term itself but **drift in its compounds**: the same
concept ("the five trail systems") carried three different German forms, split by file.

**Glossary lesson from P15 (a locked name and an ordinary phrase can be the same words).**
`Leave No Trace` is both a programme name and a plain-English instruction, and the
English master already distinguishes them **by capitalisation**: Title-Case
`Leave No Trace` is the programme, lowercase `leave no trace` is prose. Any locked-term
audit must check the *master's* casing at each site before deciding, or it will either
under-fix (leaving the programme name translated) or over-fix (turning idiomatic
imperative prose into an English string). Applying that rule to German turned a
"3 headings" estimate into 8 real sites and simultaneously *protected* 9 correct
translations that a naive find-and-replace would have destroyed.

**Locale-consistency is not always corpus-wide — check the script family.** The same
audit showed the lock holds for Latin-script locales (`it`/`pt`/`fr` 8/8, `es` 6/8) while
`ja` transliterates to `リーブ・ノー・トレイス` and `zh` uses `无痕山林`. Both are correct:
an English programme name is readable in a Latin-script locale and opaque in CJK. Before
declaring a term "locked in every locale", verify across locales *and* sites — a
single-file spot check produced exactly the wrong generalisation at P14.

**Localization lesson from P14 (recover the translator's vocabulary before inventing your
own).** When a localized file is missing a *surface* rather than a whole translation, the
words you need are usually already in the file. Here the German `page-summary` and
frontmatter `description` enumerated every heading in German — written by the original
translator when the body was localized — so the 16 headings could be restored in the
vocabulary the page already used (`Mehrtagestour`, `Mehrtageswanderer`, `Backcountry`)
instead of a fresh translation that would have drifted from its own prose. Check
`description`, `page-summary`, FAQ answers and key-takeaways for the missing terms before
translating anything. The same prose also settles locked-term questions: `Leave No Trace`
appeared 7× untranslated in the German body, which decided A5's one open question without
needing a native speaker.
3. Apply each accepted change as **one corpus-wide sweep**, per Gate 4c — never
   file-by-file. Piecemeal edits are how cross-batch drift was created originally.
4. Re-verify per the `NATIVE_REVIEW.md` appendix, then **freeze the LTR framework**.

**Counting lesson from P12 (applies to any register or capitalisation audit).** A raw
grep for capitalised `Sie`/`Ihr`/`Du` measures nothing on its own — German capitalises
sentence-initially, so the same token is a formal-address leak mid-sentence and correct
third-person or informal-plural at a sentence start. Classify by **position** before
reporting a count, and treat `: ` as a sentence boundary (Duden permits a capital after a
colon introducing a full sentence) while `—` and `;` are not. The pre-P12 figures of
"~18 formal leaks" and "214 letter-style capitals" were both artefacts of skipping this
step; the true counts are 0 and 0.

**Detection lesson from P13 (title-case audits need two passes, not one).** A detector
built on a closed-class word list (articles, prepositions, pronouns, modals) has high
precision but **silently under-counts**, because a heading whose only error is a
capitalised verb or adjective contains no closed-class word at all — `Deine Fahrt Planen`,
`Die Richtige Piste Wählen`, `Wildtiere Verantwortungsvoll Beobachten` all scored clean on
pass one. Always follow it with a second pass that aggregates **every** mid-position
capital in the corpus and reviews the frequency list by hand; that is what raised P13's
coverage from 135 estimated headings to 252 distinct strings. Two filters are mandatory
before counting anything, or the signal drowns: skip **all-caps locked strings** (the
German disclaimer `PRÜFE BEI DER OFFIZIELLEN QUELLE` alone produced 679 false hits) and
skip **sentence-initial positions inside long prose spans**. Reviewing whole display
strings rather than grepping for a pattern is also what surfaced A5 — 17 untranslated
English headings that no capitalisation regex would ever have flagged.

`es` and `it` have never had a native review. Their `i18n-*-complete` tags are retroactive
structural markers (§1) and must not be read as editorial sign-off.

### 10.2 RTL infrastructure — Arabic Stage 0 (a separate initiative)

> **STATUS 2026-07-28 — Stage 0 STARTED. AR-1 is complete; see `docs/rtl/`.**
> `AR1-rtl-audit.md` (D1) · `AR1-arabic-policy.md` (D2) ·
> `AR1-gate-characterization.md` (D6 + fail-closed matrix + bootstrap) ·
> `AR2-backlog.md` (everything AR-1 deliberately did not fix).
>
> `ar` is registered (`dir: 'rtl'`, `hreflang: 'ar'`, `ogLocale: 'ar_AR'`), the
> Arabic chrome dictionary is complete at 102/102 keys, and exactly one pilot page
> ships: `/ar/cancellation-policy/`. 620 pages; 611 of the 619 pre-existing pages
> are byte-identical, the other 8 differ only by the required `hreflang="ar"`
> reciprocity and switcher option.
>
> **Two findings from AR-1 that change what this section says below:**
>
> 1. **The direction plumbing was already correct.** `dir="rtl"` reached
>    `<html>` with no code change — `BaseLayout` had read `LOCALES[].dir` through
>    `isRtl()` since P1, and registration was the only missing input. The first
>    bullet below is therefore already done, and *no stop condition fired*: no
>    second stylesheet (ParkingWay ships RTL with zero `[dir="rtl"]` selectors),
>    no runtime bidi library, no locale-specific component fork.
> 2. **§7 stage 1 had silently stopped being executable at P34 — now repaired.**
>    "Register the locale with an empty slug set and confirm the build stays
>    byte-identical before any content lands" had not been true since gate 4j
>    landed: 4j *and* the `Record<Locale, GalleryDictionary>` total map both
>    demanded a complete 105-slide gallery dictionary the moment a locale appeared
>    in `LOCALES`. Arabic was simply the first locale registered since, and **any
>    future LTR locale would have hit it identically.**
>
>    Fixed in AR-2 B-0: `GALLERY_TEXT` is partial, and a registered locale must
>    appear in **exactly one** of `GALLERY_TEXT` (it renders the gallery) or
>    `GALLERY_EXEMPT` (it does not, with the reason). Absence is still illegal —
>    only *declared* absence is legal — and `renderGallery()` throws if an exempt
>    locale is ever rendered, so the declaration cannot rot. **§7 stage 1 is
>    executable again.** When registering a new locale, expect to add one
>    `GALLERY_EXEMPT` line at stage 1 and remove it when its homepage lands.


**Arabic is not "locale #8 in this pipeline."** Every locale so far has been a *content*
task against a frozen LTR architecture — which is exactly why §1 could stay frozen through
seven of them. Arabic breaks that premise: the work is bidirectional-layout engineering
first and translation second.

Treat it as its own project, with its own doc and its own history, because Stage 0 touches
the architecture this document declares frozen:

- `dir="rtl"` propagation and per-locale direction resolution in the layouts
- logical CSS properties throughout (`margin-inline-start` over `margin-left`, etc.)
- directional icons, chevrons, breadcrumb separators and carousel affordances mirrored
- bidi-safe interpolation — Latin proper nouns, `$349`, `(435) 219-9447`, and URLs embedded
  in RTL prose need isolation (`&#8207;` / `<bdi>`) or they render in the wrong order
- numeral policy (Western vs Eastern Arabic-Indic) locked before any content lands
- `hreflang="ar"`, `og:locale`, and a switcher entry that flips page direction

Only after Stage 0 ships and is verified does the §7 six-stage content pipeline apply
normally. **Keeping this out of the LTR project is the point:** the LTR pipeline reaches a
well-defined completion state, and RTL support begins as its own architectural milestone
rather than as an open-ended extension of a released system.

### 10.3 Additional LTR locales

The pipeline is ready and requires no design work. Each new LTR locale is execution:
register it per §7 stage 1, then run stages 2–6. Quote `de` or `ja` as the template —
**never `es`** (§9: it predates the `localeHref()` discipline and carries 223 hardcoded
hrefs where the others carry 0).

---

*Frozen reference. If reality contradicts this doc, trust the repo and update this doc —
never the other way around.*

---

## Appendix — Operational reliability lessons (agent execution, not editorial)

Distinct from the editorial "when do we translate it" rules below — these are
about running the batches reliably. Reuse verbatim; don't rediscover them.

1. **A "failed" agent status does not mean no output.** Always disk-check
   (line/byte count vs. the English sibling) before deciding to retry — repeatedly
   saved rework across ES/IT/PT/FR batches, including 6 of 20 agents in the
   Portuguese inline-pages batch that had written a complete block but died
   before the final wiring line.
2. **Resume a failed/restarted agent by its raw agent id, not a description-based
   name.** `SendMessage` only resolves description-style names for agents that
   are still reachable/named; a failed agent must be addressed by its literal id.
   Resuming (not relaunching fresh) is also cheaper — it retains full context.
3. **Simultaneous identical-message failures across many agents usually means a
   session-level rate limit, not transient flakiness.** When several parallel
   agents fail at once with the same "session limit" message, check wall-clock
   time against the stated reset before spending retry budget on it.
4. **A single agent response can exceed the output-token ceiling.** If an agent
   fails with a token-limit error, have the resumed agent write the file in one
   focused `Write` call with minimal narration instead of a verbose
   read-translate-verify-reread loop — that pattern is what balloons output size.
5. **After 3–4 independent infrastructure failures on the same file** (each
   confirmed via disk-check to have produced zero output), stop retrying via
   agent and translate it directly in the main thread instead. Different failure
   modes each time (rate limit, stream stall, connection drop, process restart)
   point to transient backend instability, not a defect in the file.
6. **Module-backed inline pages need TWO deliverables per page, not one:** the
   `page-content/*.ts` content block AND its literal Astro route file. A brief
   that only specifies the content block produces pages that "exist" in the data
   layer but 404 in practice — caught only by `npm run build` reporting broken
   links, not by any per-agent self-check.
7. **Concurrent agents doing their own "does X exist in this locale yet" check
   mid-batch can race and get stale answers** (e.g. one agent finishing before a
   sibling page it links to has landed). Do one centralized link-prefix pass
   after all agents in a batch land — don't trust each agent's individual
   existence check.
8. **Cross-locale link-parity check, run once per batch:** extract every `href`
   from each locale's block/page, strip the locale prefix, and diff the
   normalized set against the English master across the whole batch at once.
   Stronger guarantee than per-file byte-diffing; standard check for every
   inline-page batch going forward.
9. **Agent self-report is not reliable enough on its own for the single most-locked
   term in the glossary** (e.g. "Dinosaur Country" / its per-locale translation).
   Always run a literal corpus-wide grep for the untranslated source phrase as a
   central QA step — one file left all 14 instances of "Dinosaur Country"
   untranslated despite the agent's self-report claiming compliance.
10. **Four distinct infrastructure failure classes have now been observed across
   locales, and they all get the SAME recovery procedure.** Don't try to solve
   them differently — the fix is always: disk-check first, resume/retry only what
   genuinely has no output.
    - **Session rate limit** — resets on a short (hours) clock; check the stated
      reset time before retrying.
    - **Weekly account-wide rate limit** — more severe than session limits (an
      account-wide quota, not per-agent); first seen in German P9A. If the reset
      is hours away, don't wait — disk-check the "failed" agents (often already
      complete) and translate any genuine gaps directly in the main thread.
    - **Stream idle timeout / stall** — the agent goes quiet mid-response; treat
      like any other non-output failure, disk-check before resuming.
    - **Connection closed mid-response / plain request timeout** — a transport
      drop, not a content problem; resume via the agent's raw id once confirmed
      empty on disk.

   **Standard recovery procedure (all four classes):** (1) disk-check — does the
   file exist, and is it structurally complete (line count near the English
   sibling, correct ending, no stray artifact tags)? (2) if complete, treat the
   agent as done, don't retranslate. (3) if genuinely missing/truncated, resume
   the same agent by its raw id if reachable, otherwise relaunch fresh. (4) after
   3–4 independent failures on the same file across different failure classes,
   stop retrying via agent and translate it directly in the main thread — that
   pattern (not the specific error message) is the signal to stop delegating.

11. **Never run a repository-wide search-and-replace or typography normalization
    across mixed code and markup.** Restrict bulk transforms to extracted text
    nodes or an explicitly parsed/isolated content region. If a change touches
    frontmatter, JSX/Astro, JSON-LD, or JavaScript, use targeted edits instead of
    a whole-file transformation. Two independent incidents proved this: (a) a
    quote-normalizer that split on `<`/`>` to find "text nodes" reordered a `>`
    ahead of buffered text AND treated frontmatter JS as prose, corrupting every
    `const schema` and mangling an arrow function (zh Z4); (b) a locale link pass
    is only safe because it (i) whitelists against `LOCALE_SLUGS` — never a
    blacklist — and (ii) isolates the target region first: MDX splits frontmatter
    off and rewrites body only; `page-content/*.ts` holds EVERY locale's block in
    one file, so the pass must extract just the `const ZH = ` template literal and
    leave en/es/it/pt/fr/de/ja untouched. Always verify a bulk pass by
    reverse-transforming every changed line back to its original and asserting
    equality (§8), plus confirming every changed hunk falls inside the intended
    region. Prefer leaving a cosmetic nit for the native-review sweep over a
    clever global transform.

---

## Appendix — Infrastructure corrections during the localized-MDX phase (P4)

Two one-time, owner-approved corrections to the P4A localized-MDX infrastructure. Both are
**completions of P4A's existence-aware design, not new architecture** — logged here so they
stay traceable and do NOT become a reason to reopen architecture in future batches.

1. **`content.config.ts` — `generateId` on the hub/itinerary content loader (found in P4B).**
   Astro's default glob `generateId` runs each id segment through github-slugger, which strips
   the dot in `article.es.mdx` (id became `articlees`), defeating the `.es`/`.it`/`.pt`
   filename-suffix convention. Fix: `generateId: ({ entry }) => entry.replace(/\.(mdx|md)$/i, '')`
   preserves the suffix. English ids contain no dots → English output byte-identical (proven by
   pristine-build hash diff).

2. **`RelatedArticles.astro` — existence-aware tier-2 guard (found in P4C).**
   A manual `related` ref that doesn't resolve threw the build. Correct for the English master;
   for a localized page it blocked "one folder at a time" whenever a spoke's `related` points at
   a not-yet-translated hub. Fix: for non-default locales, skip (`continue`) an unresolved ref
   instead of throwing; English still throws. Lets `related` stay byte-identical in every
   localized file; cross-hub cards appear automatically as those hubs are translated.

Rule going forward: fix P4A existence-awareness gaps as they surface; otherwise the
architecture stays frozen. The planned `ES_SLUGS` → per-locale registry generalization is
deferred to the start of the Italian phase (do it before any Italian content).

---

## Appendix — Editorial decision rules (accumulated across ES/IT/PT batches)

The glossary (in each batch's brief) answers **"what is the translation."** This appendix
answers **"when do we translate it at all."** These are recurring judgment calls that would
otherwise get reinvented — and inconsistently re-decided — by every new translator/agent.
Reuse these rules verbatim for every remaining PT batch and for the next locale (French,
German, …) rather than re-deriving them.

**1. Mirror-casing for a "descriptive phrase vs. official name" pair** (the "Wall of Bones"
pattern — will recur for any attraction whose common description overlaps its brand name):
- English source capitalizes it as a proper noun ("Wall of Bones") → keep it in English,
  unchanged, every time.
- English source uses lowercase descriptive prose ("wall of bones", "wall of dinosaur
  bones") → translate it naturally (PT: "muro de ossos").
- **Check every occurrence individually, even within the same file** — several source files
  mix both forms in one document. Sentence-initial capitalization in prose or a table cell
  (e.g. "Wall of bones + Cub Creek drive") is NOT the proper-noun form; treat it as
  descriptive/lowercase.

**2. Generic common noun vs. official facility name** (the "Quarry" pattern): a word that is
part of a locked official name (`Quarry Exhibit Hall`, `Quarry Visitor Center`) stays English
only in that exact compound. The same word used generically elsewhere ("the quarry wall",
"the quarry area") is a normal common noun — translate it (PT: "pedreira").

**3. Reservoir/park proper nouns — translate the "Reservoir" compound, keep the "State Park"
compound English:**
- `"<Name> Reservoir"` → translate as `"Albufeira de <Name>"` (PT). Locked: Albufeira de
  Steinaker, Albufeira de Red Fleet, Albufeira de Flaming Gorge.
- `"<Name> State Park"` and bare `"<Name>"` (no Reservoir/State Park suffix, e.g. just
  "Steinaker" or "Flaming Gorge" used as a place-name shorthand) stay English.
- Generic lowercase "reservoir" → "albufeira".
- This divergence (translate one compound, keep the other English) is deliberate, not an
  inconsistency — verify new occurrences against already-published sibling files in
  `fishing/`/`camping/` for that same destination before guessing.

**4. The locked VERIFY phrase is matched by EXACT STRING, not by meaning:**
- Only the literal canonical English string ("VERIFY WITH OFFICIAL SOURCE", all-caps
  imperative) gets mechanically replaced by the locked translation (PT: "VERIFICA JUNTO DA
  FONTE OFICIAL").
- A lowercase/plural variant appearing elsewhere in the same file ("verify with official
  sources", in body prose or the hidden page-summary paragraph) is NOT the locked phrase —
  translate it naturally instead of substituting the locked string.
- Never insert a word inside the locked phrase (e.g. "VERIFICA sempre JUNTO DA FONTE
  OFICIAL" breaks it) — if the English source modifies the imperative with an adverb like
  "always", move the modifier outside the phrase or restructure the sentence, but keep the
  locked string byte-identical and contiguous.
- Portuguese-specific grammar trap: a modal construction like "deve VERIFY..." doesn't work
  because "dever" requires an infinitive, not an imperative — restructure the clause (e.g.
  into a conditional) rather than producing an ungrammatical sentence just to preserve the
  locked string's position.

**5. A hub's own official name containing a common English word is a cross-file drift risk**
(the "Loop"/"Byway"/"Reservoir" class, distinct from #1's descriptive/proper-noun split):
when translating generic backreferences to a hub's own named feature (e.g. "the loop", "the
byway"), check what the *other* files in that same hub already do — one file translating a
generic backreference while a sibling leaves it in English is a real corpus inconsistency,
not a stylistic choice. PT-specific locked outcome so far: "byway" (generic use) stays a bare
English loanword; "loop" (generic use) is translated ("circuito") except inside a proper
noun like "Red Cloud Loop".

**6. `ogTitle`/`ogDescription` are translatable prose, not copy-verbatim metadata** — even on
batches whose brief doesn't explicitly list them. They're user-facing social-share text, not
a technical/routing field. Translate them like `title`/`description` whenever present.

**7. Numbers are never reformatted, including thousands separators** — English "13,528" /
"5,000" (comma-thousands) must NOT become the target locale's native convention (e.g. PT
"13.528" / "5.000" period-thousands) even though that's the locally "correct" format. This
has been a recurring first-draft mistake across ES/IT/PT batches — always verify digit
sequences are byte-identical to English, not just visually similar.

**8. In-page `#anchor` links require an explicit English-slug `id` on the translated
heading** (first established in Spanish itineraries P4H, reused every batch since): Astro's
default heading-ID generator slugifies the *translated* heading text, silently breaking any
`href="#english-slug"` written against the English version. Fix: keep every `href="#..."`
byte-identical, and render that specific target heading as raw HTML with the English id
preserved (`<h2 id="decision-framework">Translated heading</h2>`), matching the source's
heading level. Only the heading(s) an anchor actually points at need this — don't convert
every heading in the file to raw HTML.

**9. Known open inconsistency, not yet normalized (flag, don't silently fix mid-batch):**
"ride-along" (the paid third-passenger add-on) has been translated three different ways
across the PT corpus so far — bare English loanword, "lugar de acompanhante (ride-along)",
and dropped entirely. Not worth a blocking fix per-file; worth a single corpus-wide
normalization pass once a locale is feature-complete (see the pre-French full-locale audit
below).

---

## Appendix — Pre-next-locale audit checklist

Before starting a new locale (French, German, …), run one full-locale audit on the most
recently completed locale rather than immediately cloning the process. This catches
corpus-consistency drift that only becomes visible once dozens of related pages exist, and
turns the completed locale into a trustworthy template instead of an assumed-good one.

- Dead-link scan across every localized page.
- hreflang triplet verification (reciprocal en/es/it/pt + x-default) on a sample of pages
  across every hub.
- Sitemap verification — every localized URL that should exist is listed, nothing orphaned.
- Metadata audit — spot-check title/description length compliance site-wide, not just
  per-batch.
- Spot-check a representative sample of long articles for read-through quality, not just
  mechanical QA.
- Corpus-consistency sweep: grep for known-inconsistent terms (see rule 9 above and any
  new ones logged during the locale) and normalize them in one pass.
