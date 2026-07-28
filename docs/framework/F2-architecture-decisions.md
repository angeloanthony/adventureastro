# F2 — Framework Architecture Decision Record

**Status: RATIFIED. ADR-2 is IMPLEMENTED as of F4 Phase 1 (`2198f66`); ADRs 1, 3, 4, 5, 6 are
decided but not fully implemented.** See "AS IMPLEMENTED" under the manifest instance for the four
places the shipped artifact deliberately departs from the design below.

Originally written as decisions only, against a clean working tree at `f45a9ec`. Every measurement
below was taken from that tree; where implementation has since changed a conclusion, the change is
marked inline rather than by rewriting the original reasoning.

**Scope.** F2 converts F1's findings into a binding architecture. Where these ADRs are permanently
filed is ADR-6. This document is filed whole rather than split one-file-per-ADR; that split is still
outstanding.

**Relationship to F1.** F1 is settled architecture. Each RATIFY/OVERTURN below states F1's
recommendation first, then either the one-line reason it survives or the specific evidence F1 lacked.
Two F1 recommendations are overturned, both on *timing or edge direction*, neither on substance.

---

## 0. What F2 measured that F1 did not

Five facts were established at F2, each of which decides something F1 left open or got
slightly wrong. They are stated up front because four of the six ADRs turn on them.

| # | Measurement | Decides |
|---|---|---|
| **M-1** | `script` is declared **four times** — in 4g, 4h and 4i configs, absent from 4f — and the vocabularies have **already drifted**: 4h files `zh`/`ja` as `cjk`; 4g and 4i file them as `han`/`japanese`. | ADR-2: `script` is a locale-registry fact, not per-gate policy. |
| **M-2** | `state` is declared **three times** (4f, 4g, 4h), absent from 4i, and is `complete` for all seven targets in all three. | ADR-2: same — one declaration, in the manifest. |
| **M-3** | Generalized 4j run over `ui.ts` **today** yields `102/102` keys for all 8 locales — 0 missing, 0 extra, 0 aliased. | ADR-5: the generalization ships **blocking, green, on day one**. F1 could not know this. |
| **M-4** | `4h-seams.json` declares `nonBoundaries: ["、","(",")","（","）"]`, and **no code reads it**. | ADR-3 / risk register: dead policy that a census must not resurrect. |
| **M-5** | The census's negative results live in **`$doc` prose arrays**, not machine-readable records: `4g.measured_not_identities` has exactly one key, `$doc`; `4i`'s equivalent is a `$doc` sub-block and **no locale carries a `measured_not_forbidden` field at all**. | ADR-3: refusals cannot survive regeneration in their current form. |

A sixth observation is not load-bearing but confirms the diagnosis: `astro.config.mjs` declares
`i18n.locales: ['en','es','it','pt']` — a **second, stale locale list**, four of eight, drifted for
five phases without consequence because no gate reads it. The repository has already demonstrated the
failure mode the manifest exists to prevent.

---

## ADR-1 — Package boundary

**Status:** RATIFY, with one corrected edge.

### Context

F1 recommended one gates package (working name `astro-localization-gates`) plus a separate
`i18n-core`, against the brief's four-package sketch. Engine is 78.4 KB across ~1,800 lines; policy is
155.5 KB. The prompt requires this be tested against four questions.

**Who owns the render index.** `engine/render-index`, inside the gates package. It cannot live in
`i18n-core`: `i18n-core` ships into the browser bundle, and the render index does filesystem walks and
HTML extraction. Different dependency and size constraints, as F1 itself argued for the split.

**Whether `census` can live inside.** Yes — as a directory with its own export path (`/census`), not
its own package. Census depends on `render-index` and on nothing else in the package; it is dev-only
and runs by hand. A separate package would duplicate the `render-index` dependency edge for zero
isolation benefit. See ADR-3 for the siting argument in full.

**Release cadence when a policy changes but the engine does not.** This is the question that decides
it, and the answer dissolves the concern: **policy does not live in the package.** `i18n-gates/*.json`
is host-owned and stays in the host repository (F1 Phase 3 — the framework ships empty templates and
`$doc` blocks, never values). A policy change is therefore a host commit with **zero** framework
releases. The four-package layout was proposed to decouple release cadences that are not coupled.

**The dependency edge.** F1's §2.5 diagram implies `host → adapter → engine`, which is right, and its
§8 phrasing invites reading a `core → gates` edge, which is **wrong and must be stated as a
prohibition**: `gates` must never import `i18n-core`. If it did, the engine would acquire the host's
`Locale` union and its locale registry would stop being data. The two packages sit in disjoint halves
of the host's dependency graph.

### Decision

Two packages.

1. **`astro-localization-gates`** — build-time. `engine/` (render-index, gates, validate, registry,
   report), `adapters/`, `census/` (separate export path), `schemas/`, `ci/`, `docs/`, `reference/`.
   A host **devDependency**.
2. **`i18n-core`** — runtime. The ~190 engine lines inside `i18n.ts` and `ui.ts` (`getLangFromUrl`,
   `localizedPath`, `switchLocalePath`, `isRtl`, `getIntlLocale`, `formatDate`, `parseEntryLocale`,
   `t`, `hubName`). A host **dependency**.

**There is no edge between them, in either direction.** This is an architectural invariant, mechanically
enforceable and to be enforced in F3: no file under `astro-localization-gates/` may import
`i18n-core`, and no file under `i18n-core/` may import the gates package.

```
   host app (runtime)  ──dependency──▶  i18n-core
   host repo (build)   ──devDep─────▶  astro-localization-gates
                                            │ reads (never imports)
                                            ▼
                                  host manifest + host source + dist/
```

Module boundaries **inside** the gates package are enforced by directory and lint, not by
`package.json`, per F1 §2.1: no file under `engine/` may contain a non-ASCII string literal outside a
comment, and none may `readFileSync` a path containing `src/`.

### Consequences

- One version bump per framework change, not four.
- `render-index` and the gates that share a baseline version together — which is *why* 4h and 4i copy
  the extractor today (F1 finding 3). Co-versioning is the fix, not an accident.
- Census ships with the engine, so a second host cannot install the gates and find itself unable to
  produce policy (F1 finding 2).
- The prohibition edge must be lint-enforced or it will be violated by convenience.

### Rejected alternatives

| Rejected | Why | What would flip it |
|---|---|---|
| Four packages (`i18n-core`, `localization-gates`, `validation`, `docs`) | Buys independent versioning nobody needs; policy isn't in any of them, so the cadences it decouples are already decoupled | A second project needs `engine/validate` without `engine/gates`, or a third party consumes `render-index` alone |
| One package including `i18n-core` | Runtime and build-time code have different bundling constraints; would pull `typescript` into the browser dependency graph | Never — this one is structural |
| `census` as its own package | Duplicates the `render-index` edge for no isolation | Census grows a dependency the gates must not carry (e.g. a tokenizer or an ML runtime) |

### What would reverse this ADR

A measured need for independent versioning: two consumers pinned to different major versions of
different subsets. Until a second host exists, that need cannot be observed, only imagined.

---

## ADR-2 — Host adapter and the declarative manifest

**Status: IMPLEMENTED — F4 Phase 1, commit `2198f66`.** The contract between the framework and every
future host. Two invariants below (semantic parsing; the manifest is not a serialization of host
source) were added *after* implementation, on evidence implementation produced.

### Context

F1's finding 1: the coupling is to the host's **source shape**, not its configuration. Three gates
(4f, 4g, 4h) locate locales by running `/LOCALES\s*=\s*\[([\s\S]*?)\]\s*as const/` over
`src/lib/i18n.ts`; two more (4i, 4j) parse `src/lib/ui.ts` and `src/page-content/home-gallery.ts` with
the TypeScript AST; `validate-site` regexes `HUB_SLUGS` out of `src/lib/hubs.ts`. Six couplings, five
files, three parsing strategies, all hard-coded.

### The declarative boundary

The manifest declares **what exists and how it is organized**. It never declares **how to recover that
from bytes**.

> **INVARIANT — the manifest is not a serialization of host source.**
> It is the framework's declarative *view* of the host. The two vocabularies are allowed to differ,
> and when they do, the adapter maps or ignores — the schema does not grow.
>
> Worked example, found while validating against a second host (`forebearfindastro`): that host's
> registry carries `status: 'master' | 'planned' | 'active'`, while the manifest's `state` is
> `planned | in-progress | complete`. These describe different domains — the host's own rollout
> lifecycle versus what the framework must understand about localization readiness — and `role:
> reference` overlaps `status: master` without matching it. **No schema change was made.** Manifest
> `state` is host-*authored*, not read from host source, so a host author selects from the framework
> vocabulary rather than the framework absorbing the host's.
>
> This invariant exists to resist a specific, recurring pressure: every time a host introduces a new
> concept, adding a field looks like the accommodating thing to do. It is how a declarative contract
> becomes a mirror, and then a coupling.

**Discriminator, applied to every field:** if changing the engine from regex to AST — or from a
`dist/` walk to a build hook — would require editing the manifest, the manifest has absorbed
procedure. A field that survives that change is structure.

Fields where the call was close, and how it was resolved:

| Field | Why it was close | Resolution |
|---|---|---|
| `binding: "LOCALES"` | Naming an identifier feels like telling the parser what to look for | **Kept.** It names *what the host calls its locale registry*, not how to find it. Regex→AST does not change the name. |
| `keyField: "id"` | Names a property inside a literal | **Kept.** Which field carries a slide's permanent identity is a host modelling decision the engine cannot infer; an array of objects has no canonical key. |
| `localePrefix: "path-segment"` | Sounds like a routing algorithm | **Kept.** It is the host's URL policy. A build-hook engine would still need it and would not change it. |
| `entryStyle: "reference" \| "inline"` | Whether `UI_STRINGS` values are identifiers or inline object literals | **REJECTED — procedural.** The engine already resolves both (4i, line 261). Declaring it would make regex→AST a manifest edit. |
| `collection: "list" \| "map"` | Whether a binding is an array or an object | **REJECTED — inferable.** The node type answers it. `keyField` survives because the *key* is not inferable; the container shape is. |
| `parser: "typescript"` | Selecting an adapter | **REJECTED for v1 — speculative.** See "one adapter" below. |

### Decision — schema v1

Six top-level sections. Ownership is **host-authored** throughout; the framework generates nothing
into it.

**1. `project`** — name and root.

**2. `locales`** — the locale registry, pointed at rather than copied, plus the per-locale framework
facts the host's own registry does not carry (`script`, `state`).

The key set of `locales.entries` duplicates the host's locale codes, and that is deliberate: the
adapter asserts `keys(entries) === codes(registry)` and **exits 2 on any mismatch**. This is the same
fail-closed shape all five gates already use ("registered in i18n.ts but has no entry in the config"),
applied once instead of five times. A *checked* second list is not a second source of truth; the stale
`astro.config.mjs` list is what an *unchecked* one looks like.

`script` and `state` move here on the strength of M-1 and M-2 — they are properties of a locale, were
declared three and four times respectively, and have already drifted. The manifest takes the finer
vocabulary (`latin` / `han` / `japanese`), which subsumes the coarser: 4h's `script === 'latin'` test
is unchanged, and 4i's han-vs-japanese distinction survives. **4h's `cjk` value disappears.**

**3. `routes`** — build output location, page glob, how a route maps to a locale, exemptions.

**4. `dictionaries`** — the parity bindings (ADR-5) and 4i's anchor target, unified. Each entry names
a canonical key source, a per-locale registry, required fields, and — load-bearing — whether the
registry is `total` or `partial`.

**5. `policy`** — where gate configs live. Paths only; contents stay host-owned.

**6. `structures`** — non-locale host registries the validators need (`HUB_SLUGS` today).

### Why the adapter reads the AST — INVARIANT, not a preference

> **The adapter parses the host registry semantically, never textually. Host syntax is not part of
> the framework contract.**

This was recorded after F4 Phase 1, because the original justification ("AST is more robust than
regex") turned out to be much weaker than the real one, and the real one is falsifiable.

Before F4, gates 4f, 4g and 4h located locales with
`/LOCALES\s*=\s*\[([\s\S]*?)\]\s*as const/`. That expression does not merely duplicate a lookup — it
**encodes a syntactic assumption about how the host writes its registry**. adventureastro happens to
write `] as const satisfies readonly LocaleMeta[]`, so it matched.

The first genuine second host examined (`forebearfindastro`) declares:

```ts
export const LOCALES: readonly LocaleDef[] = [
```

No `as const`. **The regex fails outright on it** — not with a wrong answer, with no answer. Three of
the five gates were therefore coupled not just to a file path but to a formatting choice that the very
next host does not share. Centralizing that regex into the adapter would have preserved the defect in
one place instead of five; reading the tree removes it.

The practical consequence is the measurable one: `resolveHost()` resolved that host — different module
path, different declaration style, 19 locales instead of 8 — with **zero framework code changes and a
manifest only**. That is the first evidence this boundary carries real variation rather than being
well-factored for a single project.

Corollary for future adapters: anything that would make a host's *formatting* load-bearing (a regex, a
line-offset assumption, an ordering assumption, a required type annotation) belongs nowhere in the
framework, and certainly not in the manifest.

### One adapter in v1

F1 §2.2 proposed two adapters (`astro-ts.js`, `explicit.js`) and a manifest field to select between
them. **v1 ships exactly one adapter and no selection field.**

The prompt's rule is decisive here: a schema field must be justified by a general host capability with
a **concrete second host that would need it**. AltaMedicare is the named validation target, but F1 did
not open it and neither did F2 — so no second host can be named for a parser-selection field. It is
therefore speculative and stays out of v1. Adding it later is an additive schema change (v2), which is
the cheap direction. Shipping it now and discovering the abstraction is wrong is the expensive one.

### The three-outcome test, applied

Running schema v1 against adventureastro produced **one** case of each acceptable outcome and **no**
schema widening.

**Outcome 1 — sufficient as written.** All six couplings C-1, C-2, C-3, C-4, C-5, C-6 are expressible.
The filled-in manifest below covers every target all five gates and `validate-site` reach.

**Outcome 3 — engine assuming host knowledge; move it into the engine (preferred).** Three cases,
none filed as blockers:

- `validate-site.mjs` hard-codes `LEGACY_SPOKES` (one entry) and `PILLAR_PENDING` (empty) **in engine
  source**. These are project exception lists. They move to a `validate` policy config beside
  `i18n-gates/`, not into the manifest — an exception list is policy, not structure.
- `validate-site.mjs` hard-codes `MIN_SPOKE_WORDS = 600` and the author-TODO keys `['dave','trudy']`.
  Same disposition: policy config.
- 4h's `clauseBoundaries` / `sentenceBoundaries` are punctuation classes per writing system, currently
  host config. They become **framework defaults keyed by script, host-overridable** (F1 Phase 3 already
  proposed this). `——` must be a boundary; `、` must not.

**Outcome 2 — a named F3 blocker.** Exactly one:

> **BLOCKER F3-B1 — the `en`-corpus reference set has nowhere to live.**
> Gate 4g's identity signal requires the *English* rendered corpus indexed by destination
> (`enByHref`), built by scanning `dist/` pages whose first path segment is **not** a registered
> target locale. Schema v1's `routes.localePrefix: "path-segment"` says how a *localized* route maps
> to a locale; it does not say that the unprefixed remainder is the reference corpus rather than
> untranslated residue. The specific shape knowledge with nowhere to live: **"the default locale's
> pages are the reference corpus for cross-locale identity comparison, and they are the routes with
> no locale prefix."**
> This is not resolvable by widening the manifest — `defaultLocalePrefixed: false` already states the
> routing fact, and the missing knowledge is *semantic* (these pages are the reference set), which is
> an engine assumption about what a default locale means. F3 must decide whether `role: "reference"`
> on the `en` entry carries that meaning or whether the engine simply defines "default locale corpus =
> reference corpus" as an invariant. **Recommended: the latter** — it is a framework-level truth, not
> a host fact — but it is recorded as a blocker rather than silently assumed because it changes what
> `role` means for a future host with two reference locales.

### Lifecycle

| Aspect | Decision |
|---|---|
| **Ownership** | Host-authored, committed, reviewed like source. The framework never writes to it. |
| **Validated when** | Once per process, by `engine/registry`, before any gate runs. A malformed or drifted manifest is **exit 2**, never a silent pass. |
| **Validated how** | JSON Schema (structure) **plus** the adapter's cross-check against real host source: every declared binding must resolve, and `keys(locales.entries)` must equal the host registry's codes. Schema-valid but unresolvable is still exit 2. |
| **Versioned how** | `manifestVersion` integer. The engine refuses a manifest whose version it does not know — forward *and* backward. |
| **Schema drift** | Additive fields bump the minor and are optional. A field that changes meaning bumps `manifestVersion` and the engine hard-fails the old value rather than guessing. Unknown fields are **rejected**, not ignored: a typo'd key that silently does nothing is the `nonBoundaries` failure (M-4) reproduced in the contract layer. |

### Consequences

- Six hard-coded couplings collapse to one declared file.
- `script` and `state` are declared once. 4h's `cjk` vocabulary is retired.
- A second host writes a manifest instead of reproducing adventureastro's file layout.
- The manifest becomes a new single point of failure — mitigated by exit-2-on-drift and by the fact
  that it is checked against real source on every run.
- Unknown-key rejection will break any manifest that carries comments-as-keys; `$doc` must therefore
  be explicitly allowed in the schema (it is, below).

### Rejected alternatives

| Rejected | Why |
|---|---|
| Locales declared inline in the manifest (F1's `explicit.js`) | Creates a genuine second source of truth. The host already has a registry; the manifest points at it. |
| Manifest carries regex/selector strings per binding | Fails the discriminator outright — it *is* the coupling, relocated. |
| Per-gate manifests | Reproduces the four-way `script` drift the manifest exists to end. |
| Leave `script`/`state` in gate configs | Measured drift (M-1) is the counter-evidence. |

### What would reverse this ADR

A second host whose locale registry is not a named binding in a parseable module — a database, a CMS
API, a generated file. That host needs an `explicit` adapter and the selection field this ADR
deferred, and its existence is the evidence that flips the "one adapter" call.

---

## ADR-3 — Census placement

**Status:** DESIGN + SITING.

### The deciding question, answered first

> Must re-running the census be reproducible by a **downstream consumer**, or only by **this
> repository's maintainer**?

**By a downstream consumer.** This is forced, not chosen. F1 finding 2: a second project that installs
the gates and has no way to derive 4f's 244–276 markers per locale or 4g's 295–332 receives five gates
it cannot configure. The framework's own acceptance test (F1 §5.2, step B4) is *"`census/` produces
4f/4g policy from **that** corpus"*. A maintainer-only tool fails B4 by construction.

That answer sites it: **in-framework**, shipped with the engine, under its own export path
(`astro-localization-gates/census`). Not a separate package (ADR-1), not a repo-local dev script.

### Inputs, outputs, reproducibility

| | |
|---|---|
| **Inputs** | The manifest; the render index over a corpus believed clean; the existing policy file being regenerated (for its refusal ledger and `$doc`); an explicit `--surface headings\|anchors` selector. |
| **Outputs** | A complete policy JSON — markers, licensed/identity registries, baselines — plus a **refusal ledger** (below), plus a provenance block. |
| **Reproducibility guarantee** | **Same corpus + same manifest + same census version ⇒ byte-identical output.** Enforced by: deterministic file enumeration (`readdirSync().sort()`, which 4g and 4i already do and 4f/4h do **not** — F3 must fix), deterministic key ordering on emit, and no wall-clock input except an explicit `--measured-at` argument. A census that embeds `Date.now()` cannot be diffed, and diffing regenerated policy against committed policy is the only review method that scales to 276 markers. |
| **Regeneration workflow** | Run only after a corpus review closes → diff against committed policy → a human reads the diff → commit with the review item that licensed it. Never on a schedule, never in CI. |

The frozen-vs-recomputed rule is preserved and is the reason the workflow is manual: re-deriving
markers at run time is a defect, because an introduced English heading adds its own tokens to the
locale vocabulary and **deletes the marker that should have caught it**. A9 is the measured instance —
`<h2>Key Takeaways</h2>` was already in the `de` corpus when 4f froze at P35, so `key` and `takeaways`
self-excluded from 4f's 250 `de` markers.

### Preserving negative results — the part that needs building, not moving

The prompt requires the rejected rules (`de Startpunkt` 10, `zh 指南` 81 = mostly 指南针 *compass*,
`zh 入口` 32, `zh 岩刻` 8, `de Trail` 134) to survive regeneration as first-class output. **M-5 shows
they cannot survive today**: `4g.measured_not_identities` contains exactly one key, `$doc`; 4i's
equivalent is a `$doc` sub-block; **no locale carries a `measured_not_forbidden` field at all.** The
refusals are English prose in documentation arrays. A generator cannot append to prose, cannot diff
it, and cannot consult it before re-proposing a rule.

**Decision — the refusal ledger is a schema'd, machine-readable, append-only artifact:**

```jsonc
{ "term": "指南", "locale": "zh", "surface": "anchors",
  "proposed_as": "forbidden-substitution",
  "measured": 81,
  "refuted_by": "76 of 81 are the compound 指南针 (compass); the residue axis, not the threshold, was wrong",
  "axis": "residue",
  "measured_at": "2026-07-25", "corpus_pages": 619, "phase": "P20" }
```

The census **must** load the ledger and **must not** re-propose a term in it; a re-proposal is only
possible with an explicit `--reconsider <term>` and writes a new ledger row rather than deleting the
old one. F3 migrates the existing `$doc` prose into ledger rows as a one-time hand transcription —
five rows named in the prompt, plus whatever else the `$doc` blocks record.

This is also where **M-4** is settled: `nonBoundaries` is read by nothing. It is either a refusal that
was written into the wrong place or a rule that was never wired. F3 must not let a census regenerate
it into existence; it is listed in the risk register.

### Scope for v1

F1 §8 asked: full generators for 4f/4g/4h/4i, or 4f/4g markers only? **Decision: 4f/4g markers and
identities, plus the refusal ledger, in v1. 4h/4i baselines deferred.**

Rationale: 4f/4g markers are the ones a second host provably cannot hand-author — 244–332 tokens per
locale derived by corpus difference. 4h/4i baselines are single measured integers per lock; a host can
produce them by running the gate and reading the reported count, which is `census/baselines.js`'s
entire job. The deferral is recorded, not silent: **`census/baselines.js` is an F5 deliverable.**

### Consequences

- A second host can produce stage-3 policy. Without this, adoption stops at stage 2.
- Refusals become diffable data; the "recurring lesson ×4" (a recorded item size is a hypothesis about
  the measurement window) becomes queryable rather than anecdotal — the `axis` field is there for
  exactly that.
- Determinism forces fixing 4f's and 4h's unsorted `readdirSync` walks, which is a latent
  cross-platform reproducibility bug independent of census.

### Rejected alternatives

| Rejected | Why |
|---|---|
| Separate dev tool in the host repo | Fails F1's B4 acceptance test — a second host inherits nothing. |
| Own package | Duplicates the `render-index` edge; no isolation gained (ADR-1). |
| Keep refusals as `$doc` prose | Measured to be unusable by a generator (M-5); the rule would be re-proposed on the next run. |
| Regenerate policy in CI | Destroys the freeze semantics that make 4f a regression gate. |

### What would reverse this ADR

If a second host's stage-3 policy turns out to be hand-authorable in reasonable time, census drops to
a convenience and could ship separately. B4 is the experiment that answers it.

---

## ADR-4 — Shared render index

**Status:** DESIGN.

### Context

Today: four independent `dist/` walks (4f, 4g, 4h, 4i) plus a fifth in `validate-site`, and three
extractor families — `visibleText()` duplicated **byte-identically** in 4h and 4i (deliberate, so they
share the `官方渠道核实` baseline), `headingsOf()` in 4f, and 4g's anchor extractor, which alone
decodes numeric character references and strips `<svg>`/`aria-hidden` spans.

C-8 is the dangerous coupling: two gates share a baseline *because* their extractors are identical,
and that identity is maintained by hand.

**Semantic consistency over runtime performance**, explicitly. All five dist consumers together run in
~5 s of a 124 s CI job. Speed is not the argument and must not be used as one.

### Decision — one index, five queries

`engine/render-index` is the **only** module that reads `dist/`. It exposes one page collection and
four derived views. Every consumer asks the index; none walks, none extracts.

```
  pages()        → [{ key, url, locale, isDefaultLocale, html }]
                   deterministic order (sorted walk), locale from routes.localePrefix

  visibleText(p) → string   block tags → one space, inline tags → nothing, entities decoded,
                            NFC-normalized, whitespace collapsed        [4h + 4i, canonical]

  headings(p)    → [{ level, text }]   h1–h6, sr-only/aria-hidden/hidden excluded, normalized

  anchors(p)     → [{ href, text }]    svg + aria-hidden spans dropped, numeric character
                                       references decoded, tags→space, normalized

  links(p)       → [{ raw, kind }]     href/src/url(...) — validate-site's extraction

  normalize(s)   → string   curly quotes → ASCII, NBSP folding, whitespace collapse
```

The three P38 facts that make 4g's extractor different are **preserved as properties of the `anchors`
view, not merged into `visibleText`**: numeric-reference decoding, letterless-anchor classification,
and `<svg>`/`aria-hidden` removal. F1 §9 flagged merging them as an unproven assumption; this design
sidesteps the question by not merging them. `visibleText` and `anchors` are siblings over one page
collection, not one extractor serving both.

### What each consumer asks

| Consumer | Asks the index for | Why that view |
|---|---|---|
| `validate-site` | `pages()` + `links(p)` + raw `html` (title, meta, JSON-LD, `<img>`, `<main>` word count) | Structure precedes content; needs the full page collection to compute reachability from `index.html`. |
| **4f** headings | `pages()` filtered to target locales, `headings(p)` | Tests one enumerable proposition per heading; `sr-only` exclusion is load-bearing (nav scaffolding is not display copy). |
| **4g** anchors | `pages()` **including default locale**, `anchors(p)` | The only consumer that reads `en` pages — it builds the by-destination reference set. See blocker F3-B1. |
| **4h** seams | `pages()` filtered to target locales, `visibleText(p)` | Seams are intent, not bytes: 0 in plain source text, 249 as rendered. Inline tags must join with **no** separator; block tags must separate. |
| **4i** glossary | `pages()` filtered to target locales, `visibleText(p)` — **byte-identical to 4h's** | Two gates that disagreed about what visible text is could not share a baseline. Sharing the view makes the identity structural instead of hand-maintained. |

### The acceptance test, stated before F3 starts

F1 §9 named the one thing it could not settle from inspection: whether unification moves a baseline.
The test is exact and must be run **before** any gate is migrated:

> Extract `visibleText` into `render-index`, have **only 4h and 4i** call it, change nothing else.
> **`zh` core count must stay 982 and `ja` core must stay 940.** Verify with the gate, never with
> grep — a raw grep of the `zh` core returns 1252 because it counts nav, footer and head.

If those two integers hold, C-8 is closed with zero re-baselining. If either moves, the unification is
wrong and F3 stops and records the conflict rather than re-freezing a number to make a refactor pass.

### Consequences

- C-8 becomes structural. The 4h/4i shared baseline stops depending on a hand-maintained copy.
- One walk instead of five; incidental, not the justification.
- Determinism is centralized: the sorted walk lives in one place, fixing 4f's and 4h's unsorted
  enumeration as a side effect.
- The index is now the single point of failure for all five dist consumers — which is the trade being
  made deliberately, because five extractors that can disagree is the worse failure.

### Rejected alternatives

| Rejected | Why |
|---|---|
| One universal extractor serving all four views | Merges 4g's entity decoding and svg-stripping into `visibleText`, which is precisely the unproven re-baselining F1 §9 warned about. |
| Lazy per-gate extraction with a shared cache | Keeps three extractor implementations; solves speed, which was never the problem. |
| Parse to a real DOM (`parse5`/`linkedom`) | Semantically cleaner, but changes every extraction result at once and makes the 982/940 acceptance test almost certainly fail. A post-F3 option, not an extraction-time one. |

### What would reverse this ADR

The 982/940 test failing. That would mean the two extractors are not in fact interchangeable and the
shared baseline rests on something other than extractor identity — a finding that would need its own
phase before any unification.

---

## ADR-5 — Gate 4j generalization

**Status:** RATIFY, upgraded from staged to immediate on new evidence.

### Context

F1 recommended generalizing 4j from *"every registered locale defines every key of
`GALLERY_SLIDES`"* to the content-free proposition:

> Given a **canonical key source** and a **per-locale dictionary registry**, every registered locale
> defines every canonical key — no orphans, no duplicates, no empty required fields, no two locales
> aliased to one dictionary, full coverage against the locale registry in both directions.

F1 listed it in §8 as an open owner decision, hedged because it "makes `UI_STRINGS` fail-closed, which
is a typed change to a shipped file and needs its own phase."

### The evidence F1 lacked

**M-3.** Generalized 4j run over `ui.ts` **today**:

```
EN keys 102
en→EN 102/102   es→ES 102/102   it→IT 102/102   pt→PT 102/102
fr→FR 102/102   de→DE 102/102   ja→JA 102/102   zh→ZH 102/102
missing 0 · extra 0 · aliased 0
```

The `chrome` binding is **green on the current corpus**. F1's hedge conflated two separable changes:

- **the gate binding** — add `chrome` to the manifest's `dictionaries`. Zero source change, zero
  content change, green today. This is the half that would have caught the founding `ja` failure.
- **the type change** — `UI_STRINGS: Partial<Record<Locale, Dict>>` → `Record<Locale, Dict>`. A typed
  change to a shipped file, and now **redundant**: the gate asserts at build time exactly what the
  type would assert at compile time, and it asserts more (duplicate keys and aliasing are invisible to
  the type system, which is why 4j uses the AST at all).

### Decision

**Generalize now, blocking, with both bindings.** `gallery` and `chrome` ship together in F4.

**Backward compatibility.** Total. The `gallery` binding reproduces today's assertions exactly; the
generalized engine with one binding is behaviourally identical to specialized 4j. 4j has no config
file (F1 §1.1 asymmetry) — its bindings move into the manifest, which is where every gate's policy
surface becomes enumerable from one place.

**False-positive risk on legitimately partial registries.** This is the real risk and the manifest
answers it: each dictionary entry declares `completeness: "total" | "partial"`. `total` blocks on any
missing key. `partial` asserts only the structural invariants that hold regardless of coverage —
no duplicate keys, no aliased locales, no orphan keys, no empty required fields — and reports coverage
as a count. Both adventureastro bindings are `total`, measured. A host mid-translation declares
`partial` and gets structure-checking without noise, then flips to `total` at freeze.

**Migration cost.** Two manifest entries and one engine generalization. No content change, no source
change, no re-baselining. The `Partial→Record` type change is **not required** and is left to the
owner as an independent tidy-up.

### Consequences

- The framework's founding failure (`ja` shipping 57 pages of English chrome) becomes structurally
  impossible for any registry declared `total`.
- 4j's policy surface stops being invisible to an `i18n-gates/` audit.
- `completeness` becomes load-bearing: a host that declares `partial` and forgets to flip it at freeze
  has re-created the fail-open hole. F3 should emit the coverage count on every `partial` run so the
  gap is visible in the log rather than silent.

### Rejected alternatives

| Rejected | Why |
|---|---|
| Keep specialized | Leaves `ui.ts` checked by nothing — the exact shape of the founding failure. |
| Staged migration (F1's implied path: gallery now, chrome later) | The staging existed to manage a risk that M-3 measures at zero. Staging a green change costs a phase and delays the protection. |
| Generalize but ship `chrome` advisory | Advisory is for checks where the correct value is not enumerable. A key-set difference is enumerable and total — it is a **structural** gate in the taxonomy, zero false positives possible, and the governing rule says block. |

### What would reverse this ADR

A `chrome` finding that turns out to be a legitimate partial registry rather than a defect. That would
mean `completeness` is not a per-registry property but a per-key one, and the schema is wrong.

---

## ADR-6 — Documentation home

**Status:** DECIDED, and deliberately last (it does not affect architecture and can be revisited at
any time).

### Decision

| Artifact | Home | Disposition |
|---|---|---|
| These ADRs | `docs/framework/adr/NNNN-*.md` in **adventureastro**, moving to the framework repo's `docs/adr/` at the repo split | One file per ADR, numbered, status header. **`docs/framework/adr/` now exists** and holds ADR-7 (2026-07-28) onward; **ADR-1–6 have still not been split out of this file** — see that directory's README for the pointer between the two homes. |
| F1 architecture doc | `docs/framework/F1-architecture.md`, same move | **DONE** — committed alongside these ADRs. |
| Methodology (`NATIVE_REVIEW.md` "Review methodology", 11 principles) | Framework `docs/methodology.md` | **Portable verbatim** (F1 §1.4). Copied at extraction, then the original section points at it. |
| Lifecycle + pipeline rationale (`MULTILINGUAL_HANDOFF.md` §7, §7.1) | Framework `docs/lifecycle.md` and `docs/pipeline-order.md` | **Superseded in part.** The gate-stage model and the load-bearing ordering argument are framework knowledge; the project's gate *history* stays. |
| Census derivation procedure | Framework `docs/census.md` + the `$doc` blocks in each policy template | The `$doc` blocks stay in the JSON — they are the only documentation a config reader sees. |
| `MULTILINGUAL_HANDOFF.md` (remainder) | **Stays at repo root.** | §0 status, §8–§9 link passes, project phase records. Project-only. |
| `NATIVE_REVIEW.md` (remainder) | **Stays at repo root.** | A/B/C/E sections are this corpus's decisions. The open DE register call (`du` vs `Sie`) is a business decision, not framework material. |
| `PROJECT_STATE.md`, `docs/**` | **Stay.** | Project-only (F1 §1.4). |

**One canonical location, stated plainly:** framework documentation lives in the framework package's
`docs/`. Project documentation lives at the adventureastro repo root. The rule for deciding which:
*if a second host would need it to adopt the framework, it is framework documentation.*

### Consequences

- Two root files gain a pointer line each; neither is deleted or rewritten.
- Until the repo split (ADR-1 / see below), framework docs live under `docs/framework/` in this repo,
  which keeps one review surface during F3–F5.

---

## Overturned: F1 §6, "two repositories, not one" — on timing

F1 recommended extracting the framework into its own repository immediately, reasoning that a monorepo
"would couple a translation commit to a framework version."

**Overturned for F3–F5; ratified as the end state.**

The evidence F1 lacked is its own ADR-1 finding, followed through: **policy lives in the host
repository, not in the package.** A translation commit touches `src/content/**` and possibly
`i18n-gates/*.json` — neither of which is in the framework package under any layout. The coupling F1
priced is not there to pay for.

Against that non-cost sits a real one: F3's acceptance test is *`dist/` byte-identical, 857-file
manifest, 619 pages*. Running that across a repo boundary means publishing a package version,
installing it, and rebuilding for every iteration of a refactor whose whole purpose is to change
nothing observable.

**Decision:** F3 creates the package in-repo at `packages/astro-localization-gates/` and
`packages/i18n-core/`, consumed via workspace links. The split to a separate repository happens at
**F6**, when a second host exists and the two-consumer versioning argument becomes real rather than
anticipated. The end state is F1's; the sequencing is not.

---

## Package diagram and dependency graph

```
┌─────────────────────────── adventureastro (host repo) ────────────────────────────┐
│                                                                                   │
│  host-manifest.json ──── the manifest (host-authored, ADR-2)                          │
│  i18n-gates/*.json ── this project's policy (host-owned, never shipped)            │
│  src/**  dist/**                                                                   │
│                                                                                   │
│  packages/                                                                        │
│  ├── i18n-core/                    (runtime · host dependency)                     │
│  │     getLangFromUrl · localizedPath · switchLocalePath · isRtl                  │
│  │     getIntlLocale · formatDate · parseEntryLocale · t · hubName                │
│  │                                                                                │
│  └── astro-localization-gates/     (build-time · host devDependency)               │
│        adapters/     host-manifest.schema.json · one adapter (v1)                      │
│        engine/                                                                     │
│          registry/   load + validate manifest and policy · exit-code contract      │
│          render-index/  THE ONLY READER OF dist/  (ADR-4)                          │
│          gates/      headings 4f · anchors 4g · seams 4h · glossary 4i · parity 4j │
│          validate/   links · orphans · titles · descriptions · jsonld · alt        │
│          report/     formatting · group caps · deterministic ordering              │
│        census/       markers · identities · refusal ledger      (ADR-3)            │
│        schemas/      EMPTY policy templates + $doc derivation blocks               │
│        ci/           reusable workflow, exit-code table preserved                  │
│        docs/         methodology · lifecycle · pipeline-order · census · adr/      │
│        reference/    Adventure Tours excerpts, clearly labelled as examples        │
└───────────────────────────────────────────────────────────────────────────────────┘
```

**Dependency graph — acyclic, one-way:**

```
   host src/**  ──imports──▶  i18n-core                      (runtime)

   host-manifest.json ─┐
   i18n-gates/*.json ├─▶ adapters ─▶ engine/registry ─┐
   host src/**  ─────┘                                 ├─▶ engine/gates ─┐
                          dist/ ─▶ engine/render-index ┘                  ├─▶ engine/report ─▶ exit 0|1|2
                                        │              └─▶ engine/validate┘
                                        └─▶ census/ ─▶ writes i18n-gates/*.json

   FORBIDDEN EDGE:  astro-localization-gates  ⇄  i18n-core     (ADR-1, lint-enforced)
```

No engine module names a host path, a locale, or a natural-language string.

---

## The adventureastro manifest — `host-manifest.json`

Complete. All eight registered locales (seven targets plus the reference), every target all five gates
and `validate-site` reach.

```jsonc
{
  "$schema": "./scripts/lib/host-manifest.schema.json",
  "manifestVersion": 1,

  "project": {
    "name": "adventuretoursvernal",
    "root": "."
  },

  // ── Locale registry ────────────────────────────────────────────────────────
  // The host's own registry is the source of truth for codes; `entries` adds the
  // framework facts it does not carry, and its key set is asserted equal to the
  // registry's codes (exit 2 on drift). Replaces coupling C-1 for all five gates.
  "locales": {
    "registry": {
      "module": "src/lib/i18n.ts",
      "binding": "LOCALES",
      "codeField": "code"
    },
    "defaultBinding": "DEFAULT_LOCALE",
    "entries": {
      "en": { "role": "reference" },
      "es": { "script": "latin",    "state": "complete" },
      "it": { "script": "latin",    "state": "complete" },
      "pt": { "script": "latin",    "state": "complete" },
      "fr": { "script": "latin",    "state": "complete" },
      "de": { "script": "latin",    "state": "complete" },
      "ja": { "script": "japanese", "state": "complete" },
      "zh": { "script": "han",      "state": "complete" }
    }
  },

  // ── Rendered output ───────────────────────────────────────────────────────
  // Replaces C-2. `localePrefix` is the host's frozen URL policy (astro.config.mjs:
  // directory URLs, trailing slash, master at root, non-default locales prefixed).
  "routes": {
    "output": "dist",
    "pageGlob": "**/*.html",
    "localePrefix": "path-segment",
    "defaultLocalePrefixed": false,
    "entryPoint": "index.html",
    "exempt": ["404.html"]
  },

  // ── Dictionary registries (parity bindings + 4i anchor target) ────────────
  // Replaces C-4 and C-5. Both measured `total` at F2: gallery 105×8 =
  // 840 entries, chrome 102×8, zero missing, zero orphan, zero aliased.
  "dictionaries": {
    "gallery": {
      "module": "src/page-content/home-gallery.ts",
      "registry": "GALLERY_TEXT",
      "canonicalKeys": { "binding": "GALLERY_SLIDES", "keyField": "id" },
      "requiredFields": ["alt", "caption"],
      "completeness": "total"
    },
    "chrome": {
      "module": "src/lib/ui.ts",
      "registry": "UI_STRINGS",
      "canonicalKeys": { "binding": "EN" },
      "requiredFields": ["*"],
      "completeness": "total"
    }
  },

  // ── Policy locations ──────────────────────────────────────────────────────
  // Replaces C-3. Paths only; contents stay host-owned. 4g's read of 4f's
  // licensed.global (C-7) is deliberate and stays — one frozen proper-noun
  // registry for the repository, not two that drift.
  "policy": {
    "dir": "i18n-gates",
    "gates": {
      "headings":  "4f-headings.json",
      "anchors":   "4g-anchors.json",
      "seams":     "4h-seams.json",
      "glossary":  "4i-glossary.json",
      "parity":    null,
      "validate":  "validate.json"
    }
  },

  // ── Non-locale host registries the validators need ────────────────────────
  // Replaces C-6.
  "structures": {
    "hubs": { "module": "src/lib/hubs.ts", "binding": "HUB_SLUGS" }
  }
}
```

**Notes on the filled-in instance**

- `policy.gates.parity` is `null`: 4j has no config file, by design (F1 §1.1). Its policy surface is
  the `dictionaries` section above — which is the point of moving the bindings into the manifest.
- `policy.gates.validate` names a file that **does not exist yet**. It is created in F3 to receive
  `MIN_SPOKE_WORDS`, `LEGACY_SPOKES`, `PILLAR_PENDING` and the author-TODO keys, currently hard-coded
  in `validate-site.mjs` (ADR-2, outcome 3).
- `script` and `state` appear here **once**. On adoption they are deleted from 4f, 4g and 4h configs.
  4h's `cjk` value is retired in favour of `han`/`japanese`.
- `4h.clauseBoundaries` / `sentenceBoundaries` are **not** in the manifest — they become
  framework defaults keyed by `script`, host-overridable in `4h-seams.json`.
- `nonBoundaries` is deliberately **not** carried forward anywhere. It is read by nothing (M-4); F3
  either wires it or deletes it, as an explicit decision.

### AS IMPLEMENTED — F4 Phase 1, commit `2198f66`

The block above is the DESIGN. Four things differ in what shipped; each is a decision, not drift.

| Designed | Shipped | Why |
|---|---|---|
| `loc.config.json` | **`host-manifest.json`** (repo root) | Named for what it describes. "config" reads as policy, which is the one thing it is not. Location invariant: it must live outside `i18n-gates/`, because gate configs answer *how should the framework behave* and the manifest answers *what kind of host is this*. |
| `$schema` → `node_modules/astro-localization-gates/schemas/…` | **`scripts/lib/host-manifest.schema.json`** | The package does not exist yet (F1 §6 overturned: packages go in-repo for F3–F5). Ownership split is unchanged — framework owns the schema, host authors the instance. |
| Six sections in the instance | **Two** (`project`, `locales`); all six defined in the schema, 3–6 optional | Sections 3–6 have no consumer until the phases that migrate C-2 and C-4/C-6. Shipping config nothing reads is M-4 stated in the other direction. |
| `script` / `state` declared in `entries` | **Deferred** | 4f, 4g and 4h still declare `script` in their own configs. Adding it here first would put one fact in **four** places and make M-1's measured drift worse before it made it better. Lands with the phase that strips the configs. |

Two further notes from implementation:

- **JSON Schema is the specification; the runtime validator is hand-rolled.** ADR-2's lifecycle table
  says "validated how: JSON Schema (structure) plus the adapter's cross-check". The structural half
  is implemented directly in `host-manifest.mjs` rather than by running the schema, because adding a
  validator dependency to a repository whose only runtime deps are astro/mdx/sitemap is itself a
  behavioural change to the build. **If the two ever disagree, the schema is authoritative and the
  code is the bug.** The cross-check half is implemented as designed and fails closed.
- **The override surface grew a `--manifest` flag.** Not anticipated here. Once the adapter
  drift-checks `keys(entries)` against the registry on every run, a scratch `--i18n` registry with a
  different locale set *is* drift — so `--i18n` alone could only ever point at a registry identical
  to the real one, which is not a test. 4g and 4i now accept both.

**F3-B1 remains open and remains an engine invariant.** `role` is declared on the `en` entry, but the
adapter does not read it for reference-corpus semantics and no consumer may. Recorded here because
the temptation to close B1 by reading `role` will recur.

---

## Implementation order for F3, with blocking edges

F3's five phases map onto these ADRs as follows. `⛔` marks a blocking edge — the downstream work
cannot begin, or cannot be verified, until the upstream item closes.

```
  0. Baseline capture                                    ⛔ blocks everything
     md5 manifest of dist/ (857 files, 619 pages) + recorded gate output:
     4h zh core 982 · ja core 940 · 4i 50 locks · 4j 105×8=840 · validate-site 619
        │
        ├──▶ 1. Package skeleton  (ADR-1)
        │       packages/{i18n-core,astro-localization-gates}/ + workspace wiring
        │       lint rules: no non-ASCII literals in engine/, no src/ readFileSync,
        │       forbidden-edge check between the two packages
        │       ⛔ no gate migration in this phase
        │
        ├──▶ 2. Manifest  (ADR-2)          ⛔ blocked by: BLOCKER F3-B1 decision
        │       host-manifest.schema.json + host-manifest.json above + engine/registry
        │       validation. Acceptance: adapter resolves every binding and
        │       keys(entries) == codes(LOCALES); exit 2 on any drift.
        │       ⛔ blocks phase 3 entirely
        │
        ├──▶ 3. Adapter  (ADR-2)           ⛔ blocked by phase 2
        │       one adapter; the ONLY module that reads host source.
        │       Acceptance: the six couplings C-1,C-3,C-4,C-5,C-6 resolve through it.
        │
        ├──▶ 4. Render index  (ADR-4)      ⛔ blocked by phase 1 only (not 2 or 3)
        │       4a. extract visibleText, called by 4h and 4i ONLY
        │           ⛔⛔ HARD GATE: zh core 982, ja core 940, verified with the
        │               gate not with grep. If either moves, STOP and record.
        │       4b. headings, anchors, links views
        │       4c. deterministic sorted walk (fixes 4f/4h unsorted enumeration)
        │
        └──▶ 5. Regression verification
                dist/ byte-identical vs phase-0 manifest · every gate's output
                identical · npm run build and npm run validate both green
```

**Ordering note.** Phase 4 depends only on phase 1, not on 2 or 3 — the render index reads `dist/`,
which the manifest describes but does not gate. Running 4 in parallel with 2–3 is safe and shortens
the critical path. The 982/940 hard gate should be hit **as early as possible**, because it is the one
result that can invalidate the design.

**Explicitly out of F3** (the user's stop conditions, restated as architecture): census
implementation (ADR-3 → F5), 4j generalization (ADR-5 → F4), gate algorithm changes, CI features,
content changes, runtime optimization. Migrating the five gates onto the substrate is F4.

---

## Risk register — anything that could force an F3 rewrite

| # | Risk | Severity | Signal it is happening | Mitigation |
|---|---|---|---|---|
| **R-1** | `visibleText` unification moves a baseline | **High** | `zh` core ≠ 982 or `ja` core ≠ 940 after phase 4a | Hit the gate first, before any other migration. If it moves, stop and record the conflict — do **not** re-freeze a number to make a refactor pass. |
| **R-2** | BLOCKER F3-B1 resolved by widening the manifest | **High** | A `referenceCorpus` field appears in the schema | The recommended resolution is an engine invariant (default-locale corpus = reference corpus). A manifest field here would be the first speculative field, and it would set the precedent that kills the schema. |
| **R-3** | Manifest absorbs procedure under refactor pressure | **High** | Any field whose value would change if the engine switched regex→AST | Re-run the discriminator on every field added after v1. The rejected-field table in ADR-2 is the precedent to cite. |
| **R-4** | `nonBoundaries` (M-4) gets wired "to make the config consistent" | Medium | A 4h behaviour change with no review item behind it | It is dead policy, not a missing feature. Deleting it is a decision; wiring it is a gate algorithm change and out of F3 scope. |
| **R-5** | Refusal-ledger transcription loses evidence | Medium | Ledger rows with no `axis` or no `measured_at` | The five named refusals are the acceptance set. A row without its measurement window is the DC-5 defect the program hit four times. |
| **R-6** | `script`/`state` consolidation changes 4h behaviour | Medium | 4h finding count ≠ 0 after the `cjk`→`han`/`japanese` change | 4h only tests `script === 'latin'`; both new values are non-latin, so the test is unchanged. Verify by output identity in phase 5, not by inspection. |
| **R-7** | In-repo packages make the eventual repo split harder | Low | Framework code importing host paths because they are reachable | The lint rules from phase 1 are exactly this guard, which is why they land before any migration. |
| **R-8** | The external `k` auto-commit process commits mid-refactor | Low | Unexpected commits during F3 | Known behaviour; check `git log`/`reflog` before concluding work was lost. |

---

## Open items — recorded, not deferred

| Item | Missing evidence | Owner |
|---|---|---|
| **BLOCKER F3-B1** — reference-corpus semantics (ADR-2) | Whether a host can have two reference locales. Cannot be settled without a second host; F3 must pick the engine-invariant reading and record it. | F3 |
| `nonBoundaries` — wire or delete (M-4) | The P36 review item that introduced it. Not recoverable from the config. | Owner |
| `census/baselines.js` deferred to F5 (ADR-3) | Whether a second host can hand-produce 4h/4i baselines by reading gate output. Answered by B4. | F5 |
| Parser-selection field deferred (ADR-2) | A concrete second host whose locale registry is not a parseable module binding. | F6 |
| `UI_STRINGS: Partial<Record<>>` → `Record<>` | None — this is now optional, not required (ADR-5). A tidy-up the owner may decline. | Owner |
| DE register (`du` vs `Sie`) | Unchanged by F2. A business decision that gates the DE native review, not the framework. | Owner |

---

## Success criterion, checked

> *Every remaining F3 question is "how do I write this," never "what should this be."*

Six decisions closed: package boundary and its forbidden edge; manifest schema v1 with a filled-in
instance and a rejected-field table; census siting with a machine-readable refusal ledger; a render
index with five named consumer queries and a numeric acceptance test; 4j generalized, blocking, both
bindings; and a documentation home. One F1 recommendation overturned on timing (repo split), one
corrected on edge direction (`core → gates`), one upgraded on new evidence (4j).

One question is **not** closed and is named rather than buried: **F3-B1**, the reference-corpus
semantics, with the specific shape knowledge that has nowhere to live and a recommended resolution.
