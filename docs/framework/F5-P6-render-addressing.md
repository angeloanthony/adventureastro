# F5 Phase 6 — C-2 Completion (Render Addressing Closure)

**Status: IMPLEMENTED.** Deliverable 0 decided and tested; `routes.pageGlob`, `routes.entryPoint`
and `routes.exempt` adopted; no framework component computes a render path. Coupling **C-2 is
CLOSED**, with two named residues carried forward explicitly (§5).

This phase closes the last render-address seam before AR-1 (Arabic readiness) exercises it. It
touches no review state, no census schema, no marker lexicon and no localization policy.

---

## 0. The architectural decision (Deliverable 0)

The question the phase existed to answer, stated so it could not be settled as a side effect of
replacing `join(root, "dist")`:

> Either `validate-site` remains manifest-independent by design, or the manifest becomes a required
> dependency of the framework's core validator.

### Decision

**The manifest IS a required dependency of `validate-site`. The locale registry is NOT.**

Those are two decisions, not one, and separating them is the substance of this phase.

**Why the manifest is required.** The alternative — keep the validator manifest-independent by
falling back to `join(root, 'dist')` when no manifest is present — was rejected outright. That
fallback is correct only for the one repository the framework happens to live in. Point the
framework at another host and the validator reports a clean site having validated adventureastro's
output: a wrong answer, not a crash. That is coupling C-3's exact failure shape, and a fallback
would have preserved it while looking migrated. There is no fallback and no default. Absent
manifest → exit 1.

**Why the locale registry is not.** `resolveHost()` would have supplied the same path, but it reads
the locale registry on the way: it parses `LOCALES`, reads `DEFAULT_LOCALE`, and fails closed when
the manifest's locale entries have drifted from the registry. Routing the validator through it
would have made a **monolingual host's site validation fail on a locale registry it has no reason
to own** — the validator acquiring a localization dependency through the adapter's front door, in
the one component whose neutrality is an invariant.

So the adapter gained a second, narrower entry point:

```js
resolveRoutes({ manifestPath })   // manifest §3 only. Never opens the locale registry.
resolveHost({ ... })              // everything, including the registry. What the gates use.
```

`resolveRoutes` returns a routes resolver whose `localeOf` **throws** (`kind: 'no-locales'`) rather
than guessing. Attributing a route to a locale genuinely requires the registry; a caller that needs
it wants `resolveHost`.

### How the decision was tested

Not asserted — exercised. The proof is a manifest whose `locales.registry.module` points at a file
that **does not exist** (`nope.ts`). If the validator ever touches the registry, that manifest fails
loudly. It validates cleanly:

```
$ node scripts/validate-site.mjs --manifest <scratch-host>/host3.json
validate-site: ✔ 3 pages — links resolve, no orphans, hub structure intact.        exit 0
```

### Validator invariant, restated and still true

`validate-site` reads **render addressing** and nothing else. It reads no policy file, no census
fact and no review state. It must not begin to.

---

## 1. What was adopted

| Manifest fact | Was | Now |
|---|---|---|
| `routes.output` | `join(root, 'dist')` in validate-site | resolved by the adapter |
| `routes.pageGlob` | declared, **read by nothing**; `distWalk` tested `.html` itself | interpreted by the adapter into a predicate; the render index takes it |
| `routes.entryPoint` | `'index.html'` written into validate-site | declared and read |
| `routes.exempt` | `'404.html'` written into validate-site, in two places | declared and read |

`entryPoint` and `exempt` were already in schema v1's `routes` definition. Declaring them completes
a declared section; it is not schema expansion.

### `pageGlob` is interpreted, and refuses what it cannot honour

The manifest states a glob; the adapter interprets it. That division is the discriminator: swapping
the interpreter for a full glob engine would not change one character of the manifest, which is why
no `walker` or `parser` field exists.

Only the form `**/*.ext` is honoured. **Anything else fails closed.** A resolver that accepted
`pages/*.html` and then walked the whole tree anyway would return a corpus the manifest did not
describe — the silent wrong answer this series exists to remove, arriving through the very field
meant to prevent it.

### No silent defaults in the traversal

`distWalk(dir, match)` and `createRenderIndex(dist, { pages })` both **require** the predicate and
throw without it. A default of `.html` would be silently right for every host that renders HTML and
silently wrong for the first that does not, and the caller that forgot to pass one would never find
out.

---

## 2. Bootstrap — byte-identical outputs

Captured before migration, re-captured after, compared with `cmp`.

| Stream | Result |
|---|---|
| `validate-site` stdout / stderr | **identical** |
| gates 4j, 4f, 4h, 4i, 4g stdout / stderr (10 streams) | **identical** |
| render-index page keys (619) | **identical** |
| census `phrase-count` — 51 facts, 20,255 occurrences | **identical** |
| `astro check` | 0 errors, 0 warnings, 268 hints — unchanged |
| `npm run build` | 619 pages, all gates green |

**One intended difference.** The census's `provenance.manifest` digest changed
(`c0803653…` → `50138b80…`) because the manifest itself changed. Every one of the 51 facts is
byte-identical. `census/phrase-count.json` was regenerated so its provenance names the manifest that
actually produced it — a one-line diff. The digest is provenance and is not enforced by the reader;
leaving it stale would have been false provenance rather than a broken gate.

---

## 3. Fail-closed matrix

All exercised against scratch manifests. `--manifest` was added to `validate-site` for this purpose,
the same affordance gates 4g/4h/4i already carry: *a fail-closed path that can only be exercised by
deleting a file is a fail-closed path nobody exercises.*

| Case | Exit | Message |
|---|---|---|
| **no manifest at all** | 1 | `host manifest not found at …` |
| missing `routes.output` | 1 | `routes.output must be a non-empty string` |
| missing `routes.pageGlob` | 1 | `routes.pageGlob must be a non-empty string` |
| no `routes` section | 1 | `route addressing is not declared — …` |
| unsupported `pageGlob` | 1 | `route addressing declares pageGlob "pages/*.html", which this engine cannot honour …` |
| missing `entryPoint` | 1 | `route addressing declares no "entryPoint" — a reachability walk has no route to start from` |
| unreadable render directory | 1 | `dist/ not found — run astro build first.` |
| malformed manifest | 1 | `… is not valid JSON — …` |

The unsupported-`pageGlob` case also fails closed in gates 4h, 4i and 4g. **It does not in 4f** —
see finding P6-F2.

**Recorded explicitly, per the phase brief:** *validate-site in a repository with no manifest at all
exits 1.* The manifest has become a required dependency of the framework's core validator. That is
the decision in §0, observed rather than claimed.

---

## 4. Cross-host proof

Two foreign hosts, described from scratchpad manifests. **Neither repository was modified, and
neither contains a manifest.**

**Host 3 — a minimal static scratch site.** Exit 0, 3 pages, registry `nope.ts` never opened. This
is the clean cross-host success signal.

**Host 2 — `parkingwayastro`.** The validator addressed *that host's* corpus: `ar/`,
`come-arrivare-fiumicino`, `confronto-prezzi-parcheggio-fiumicino`. **Zero adventureastro routes
appeared in the output.** Render addressing is proven cross-host.

It exits 1 on content, and that is reported rather than smoothed over: parkingway is an SSR/hybrid
host (`dist/server` exists alongside `dist/client`), so `/favicon.ico` and `/condizioni/` are served
at runtime and are not static files. 277 broken links, 200 duplicate title/description, 1 orphan.

**That is not a C-2 defect.** Render addressing resolved correctly and pointed at exactly the right
bytes. What does not port is the validator's *link model*, which assumes fully static output. Filed
as P6-F3 below rather than fixed here — it is a separate question about what `validate-site`
asserts, not about where it looks.

---

## 5. Remaining C-2 inventory

Every host-derived render-path assumption in the repository, classified.

| # | Site | Assumption | Class | Disposition |
|---|---|---|---|---|
| 1 | `validate-site.mjs` | `join(root,'dist')` | consumer | **migrated** |
| 2 | `rendered-text.mjs` `distWalk` | `name.endsWith('.html')` | framework | **migrated** (`routes.pageGlob`) |
| 3 | `validate-site.mjs` | `'index.html'` graph root | consumer | **migrated** (`routes.entryPoint`) |
| 4 | `validate-site.mjs` ×2 | `'404.html'` exempt | consumer | **migrated** (`routes.exempt`) |
| 5 | `render-index.mjs` | `key.replace(/index\.html$/,'')` → url | framework | **residue R-1** |
| 6 | `validate-site.mjs` | `dir/index.html`, `key.html` link candidates; hub pillar/spoke keys | consumer | **residue R-1** |
| 7 | `gate-4i.mjs` | `join(root,'src','lib','ui.ts')` | host source | C-5, not C-2 |
| 8 | `gate-4j.mjs` | `join(root,'src','page-content','home-gallery.ts')` | host source | C-1, not C-2 |
| 9 | `validate-site.mjs` | `join(root,'src','lib','hubs.ts')` + `HUB_SLUGS` regex | host source | **C-1, not C-2 — see P6-F1** |
| 10 | `host-manifest.mjs` | `join(root, MANIFEST_FILENAME)` | framework | by design — the bootstrap seam |

**No framework component computes a render path.** Items 7–9 are host *source* couplings (where the
host keeps its TypeScript), not render addressing; item 10 is where the manifest itself is found,
which cannot itself be manifest-declared.

### Residue R-1 — the directory-index convention

`/x/` is served by `x/index.html`. That is a fact about the host's build format
(`build.format: 'directory'`), and it appears in the render index's URL derivation, the validator's
link-resolution candidates, and the hub pillar/spoke key construction.

**Deliberately not migrated.** Schema v1 has no key for it, and inventing one is *manifest expansion
beyond declared routing* — a named stop condition for this phase. Recorded as declared debt with a
named reader, which is the same shape `pageGlob` was carried in before it had one. It is a candidate
for schema v2 and a real question for any host that renders `x.html` instead of `x/index.html`.

---

## 6. Findings

Three, none of which the phase set out to look for.

### P6-F1 — `validate-site` applies **this** repository's hub registry to a foreign corpus

`HUB_SLUGS` is read from `join(frameworkRoot, 'src/lib/hubs.ts')` regardless of which host the
manifest describes. Demonstrated: a scratch host containing a directory named `camping` — which has
nothing to do with adventureastro — was told it needs a pillar page, `RelatedArticles` and an
`AuthorByline`:

```
✖ hub "camping" has 1 spoke page(s) but no pillar page (/camping/)
✖ spoke camping/foo/index.html renders no RelatedArticles section
✖ spoke camping/foo/index.html renders no AuthorByline
```

This is C-3's silent-wrong-answer shape, still live, in the file this phase just migrated — one
layer over. It went unseen against `parkingwayastro` only because none of that host's directories
happen to collide with an adventureastro hub slug. **It is coupling C-1 (host source structure), not
C-2**, so per this phase's own scope rule it is inventoried, not migrated. Schema v1 already has a
`structures` section, so the migration has a named home.

### P6-F2 — gate 4f cannot be pointed at another host

4f calls `resolveHost()` with no arguments and has no `--manifest` flag. Every other dist-reading
gate accepts one. Consequence: 4f silently used the real manifest during the fail-closed matrix and
passed where 4h/4i/4g correctly refused. Its fail-closed paths are **unexercisable**, and it cannot
be run against a scratch corpus — which AR-1 will want. Pre-existing; not render addressing, so not
fixed here.

### P6-F3 — the validator's link model is not host-portable

Distinct from P6-F1 and from anything C-2 owns. `validate-site` assumes every internal link resolves
to a static file on disk. Against an SSR/hybrid host that is false by construction, and the validator
reports hundreds of "broken" links that are served correctly at runtime. Render addressing is not the
problem; the assertion is. A hybrid host is not currently in scope, but the assumption is now
documented rather than implicit.

---

## 7. Stop conditions — none triggered

| Condition | Status |
|---|---|
| localization enters the validator | **not triggered** — the opposite: `resolveRoutes` exists to keep it out |
| census becomes a validator dependency | not triggered |
| review state becomes relevant | not triggered |
| render addressing requires manifest expansion beyond declared routing | **respected** — residue R-1 was left unmigrated for exactly this reason |

---

## 8. Files changed

```
host-manifest.json                  routes.entryPoint, routes.exempt; $doc for all three
scripts/lib/host-manifest.mjs       validate entryPoint / exempt
scripts/lib/host-adapter.mjs        routes.pages, routes.entryPoint, routes.exempt; resolveRoutes()
scripts/lib/rendered-text.mjs       distWalk(dir, match) — predicate required
scripts/lib/render-index.mjs        createRenderIndex(dist, { pages }) — required
scripts/validate-site.mjs           resolveRoutes; --manifest; entry/exempt from manifest
scripts/gate-4f|4g|4h|4i            pass host.routes.pages to the render index
scripts/census/phrase-count.mjs     same
census/phrase-count.json            provenance digest only — all 51 facts unchanged
```

---

## 9. Next

**AR-1 — Arabic readiness.** No further framework work between. C-2 is closed; the seam Arabic would
have exercised is now manifest-declared and cross-host proven.

Carried into AR-1 as known context, not as blockers: P6-F1 (hub registry, C-1), P6-F2 (4f has no
`--manifest`, and AR-1 will want scratch-corpus runs), residue R-1 (directory-index convention).
