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

## 7. Locale lifecycle (six stages — the definition of "done")

Proven across five locales (es/it/pt/fr, plus the en master). Every future locale
follows this pipeline with no special-casing unless a genuine bug forces a fix
(see appendix below — fix once centrally, don't redesign per locale).

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
5. **Runtime verification.** Verify in the actual built `dist/` output, not source:
   hreflang reciprocity (full alternate set + x-default, on both the new locale's
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
