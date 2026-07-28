# F5 Phase 3 — Census Contract & Policy Schema

**Status: RATIFIED. `phrase-count` IMPLEMENTED at F5 Phase 4; `marker-lexicon` specified but not
built.** See §4.5, "AS IMPLEMENTED", for the four places the shipped producer departs from the design
below — including the withdrawal of §7's policy→census edge. Originally written as design only: no
code, no gate change, no config edit. Read after
[F1](./F1-architecture.md) and [F2](./F2-architecture-decisions.md). Every measurement below was taken
from the working tree at `723e71a` (clean), with all five gates green.

**Mission.** Define the canonical output contract the missing census generator must satisfy, before any
extractor is written. This phase specifies *what policy consists of*; F5 Phase 2 settled *where policy
lives*.

**Baseline.** C-1 (host registry coupling) resolved at F4 Phase 1. C-2 (render/index portability)
resolved. C-3 (policy addressing) resolved at F5 Phase 2. Outstanding: C-4 gallery dictionary, C-5
chrome dictionary, C-6 structures. None of them is touched here.

---

## 0. Executive summary

The contract is decided by one discriminator, and everything else follows from it:

> **If a value can be re-derived from the corpus, it belongs in `census/`. If it survives a corpus
> change, it belongs in `policy/`.**

Applied to all 24 artifacts the four gates consume, it partitions them cleanly — 5 census, 12 policy,
2 manifest, 3 framework, 2 nowhere — with no artifact needing a home invented for it and no gate
needing to change to accept the split.

Three findings change the shape of the census that F1 and F2 sketched.

1. **The census's consumer is a gate, not a human.** ADR-3 describes census output as evidence a human
   transcribes into policy. That transcription step is measurably where the duplication came from: the
   `zh` conserved count **982 is authored twice**, in `4h-seams.json` as `expected` and in
   `4i-glossary.json` as `count`, with 4i's own `provenance` field naming the coupling in prose
   ("Identical baseline to gate 4h") and nothing enforcing it. The `ja` equivalent, 940, is authored
   **once** — 4h has it, 4i has no lock for that phrase at all. This is coupling **C-8 reproduced one
   layer up**: two gates share a number because a human kept two files in step. Committing census
   output and having both gates resolve the number from it makes the sharing structural, exactly as the
   render index made the shared extractor structural. → §4.

2. **`licensed.global` and `identities.global` are one registry filed as two, and the split is already
   a latent defect.** 48 entries and 31 entries with an overlap of **one**. Gate 4g reads the union;
   gate 4f reads only its own half. **Ten (locale, phrase) pairs are measured today where a proper noun
   registered as an anchor identity carries a token frozen as a heading marker for that same locale** —
   `Flaming Gorge Reservoir` in `de`/`fr`/`pt`, `High Uintas Wilderness` in all seven, `Denver` in `zh`,
   `UTV` in `de`. Each is a registered proper noun that would fail gate 4f the day it appears in a
   heading. → §3, D-2.

3. **The census needs a precondition it cannot check itself, and the second host proves it.**
   `forebearfindastro` has a rendered corpus (297 pages, 7 built locale trees of 19 registered) over
   which a marker lexicon is mechanically derivable *and wrong by construction*: its localized content
   is machine-generated and its own chrome dictionary is marked "PROVISIONAL pending native review".
   Deriving markers from an unreviewed corpus self-excludes the tokens of the defects already in it —
   the A9 mechanism, measured. So the census must refuse to emit a marker lexicon for a locale the host
   has not declared reviewed. That declaration is `locales.entries.<code>.state`, already ratified in
   manifest schema v1 and still deferred. **A fact-producer honouring an authored precondition is not a
   localization judgment**, and that distinction is what keeps the stop condition intact. → §10.

Nothing here requires a framework behavior change. The contract is additive: a new manifest section
that points at census output, a new directory the census owns, and a shrinking of four gate configs
that no gate has to be taught about all at once.

---

## 1. What Phase 3 measured

Continuing F2's numbering. Each of these decides something the contract could otherwise only assume.

| # | Measurement | Decides |
|---|---|---|
| **M-6** | The proper-noun registry is split: `4f.licensed.global` 48 entries, `4g.identities.global` 31, **overlap 1** (`Adventure Tours Vernal`). 4g reads the union of both plus per-locale additions; 4f reads only `licensed`. **10 latent false positives** measured (§3 D-2). | §2 A1–A3: one term registry, surface-scoped. |
| **M-7** | The two marker lexicons are **not** duplicates. Jaccard similarity of `4f.markers` against `4g.markers`: `de` 0.38, `fr` 0.39, `ja` 0.40, `zh` 0.41. 92–101 tokens are heading-only; 143–160 are anchor-only. | §4: `surface` is part of the fact's **key**, not a redundancy to collapse. |
| **M-8** | `zh` conserved count 982 is authored in two files, under two field names, with two aggregation semantics. `ja` 940 is authored in one. 4i's `provenance` documents the coupling in prose. | §3 D-1; the census's consumer is a gate (§0 finding 1). |
| **M-9** | `state` is declared in three configs (4f, 4g, 4h) and **read by one** (4f line 154, severity selection). 4i declares none and expresses the same concept as per-entry `enforce: block\|report`. | §2 A8: manifest, and one severity mechanism, not three. |
| **M-10** | Gate 4h accumulates `conserved[loc]` per **locale** but compares it against each lock's per-**lock** `expected` (lines 232, 271–277). The two agree only because no locale declares more than one lock. | §3 D-1: same number, different semantics — the duplication is not even a clean copy. |
| **M-11** | `4h.nonBoundaries` is still read by nothing, four phases after F2 recorded it as M-4. | §11: dead policy; the census must not resurrect it. |
| **M-12** | `gate-4h-seams.mjs` references an undefined `CONFIG` at lines 89 and 292. Both paths are currently unreached (every locale is configured; no count drift), so the gate is green. | §12: recorded live defect, not fixed here. |
| **M-13** | The second host independently authored a terminology registry — `src/i18n/glossary.json`, 21 terms in three classes (`invariant` 5, `protected` 11, `pinned` 5), `pinned` carrying `translations.<locale>` — plus `writingProfiles.<locale>` with `register` and `addressForm`. | §10: the term-registry schema, and the one concept adventureastro holds only as prose. |
| **M-14** | Lock registry shape, censused: 50 locks / 7 locales, **all** carrying `id`, `concept`, `phrase`, `provenance`, `forbidden`; 46 `min` against 4 `count`; 14 `latinLock`; 34 forbidden entries; **2** `licensedIn`; 18 dictionary anchors. | §2 A15–A20: the authored/derived seam runs *through* a lock, not around it. |

---

## 2. Artifact inventory

Every policy artifact the four in-scope gates consume, with the eight canonical questions answered.

**Disposition codes.** `CENSUS` — machine-derived fact. `POLICY` — authored decision. `MANIFEST` —
host structure. `FRAMEWORK` — a framework default, host-overridable. `NOWHERE` — duplicate or dead.

**Columns.** Auth = authored by humans · Deriv = derivable mechanically · Det = deterministic given a
corpus · Host = host-specific · Multi = more than one gate consumes it.

| # | Artifact | Today | Read by | Auth | Deriv | Det | Host | Multi | Disposition |
|---|---|---|---|---|---|---|---|---|---|
| A1 | `licensed.global` (48) | 4f | 4f, 4g | ✔ | proposes | — | ✔ | ✔ | **POLICY** → `terms.json`, `class: invariant` |
| A2 | `identities.global` (31) | 4g | 4g | ✔ | proposes | — | ✔ | ✔ | **POLICY** → same registry (D-2) |
| A3 | `identities.<loc>` (0–2) | 4g | 4g | ✔ | proposes | — | ✔ | — | **POLICY** → same registry, locale-scoped |
| A4 | `markers` — headings (244–276) | 4f | 4f | — | ✔ | ✔ | ✔ | — | **CENSUS** `marker-lexicon` |
| A5 | `markers` — anchors (295–332) | 4g | 4g | — | ✔ | ✔ | ✔ | — | **CENSUS** `marker-lexicon`, distinct key (M-7) |
| A6 | `nativeMarkers` (0–503) | 4g | 4g | — | ✔ | ✔ | ✔ | — | **CENSUS** `marker-lexicon`, polarity `target-present` |
| A7 | `repeatThreshold` (5) | 4g | 4g | ✔ | — | — | — | — | **POLICY**, report tuning (§11) |
| A8 | `state` per locale | 4f, 4g, 4h | 4f only | ✔ | — | — | ✔ | ✔ | **MANIFEST** (ratified, deferred; M-9) |
| A9 | `script` per locale | 4g, 4h, 4i | all three | ✔ | — | — | ✔ | ✔ | **MANIFEST** (ratified, deferred; F2 M-1) |
| A10 | `clauseBoundaries` (10) | 4h | 4h | ✔ | — | — | — | — | **FRAMEWORK** default by script, host-overridable |
| A11 | `sentenceBoundaries` (5) | 4h | 4h | ✔ | — | — | — | — | **FRAMEWORK** default by script, host-overridable |
| A12 | `nonBoundaries` (5) | 4h | **nobody** | — | — | — | — | — | **NOWHERE** — dead (M-4, M-11) |
| A13 | `imperative{particle,coordinators,boundMorphemes}` | 4h | 4h | ✔ | partly | — | — | — | **POLICY**, language fact not corpus fact |
| A14 | `connectives` (4–7) | 4h | 4h | ✔ | — | — | — | — | **POLICY**, language fact |
| A15 | `locks[].core` + `leadIns` | 4h | 4h | ✔ | — | — | ✔ | ✔ | **POLICY** → one lock registry (D-5) |
| A16 | `locks[].expected` (982, 940) | 4h | 4h | — | ✔ | ✔ | ✔ | ✔ | **CENSUS** `phrase-count` (D-1) |
| A17 | `locks[]{id,concept,phrase,provenance,latinLock}` | 4i | 4i | ✔ | — | — | ✔ | ✔ | **POLICY** → same lock registry |
| A18 | `locks[].min` / `locks[].count` (46 / 4) | 4i | 4i | split | split | ✔ | ✔ | ✔ | **number → CENSUS · bound choice → POLICY** |
| A19 | `forbidden[]{text,why,enforce,licensedIn,licensedWhy}` (34) | 4i | 4i | ✔ | proposes | — | ✔ | — | **POLICY** |
| A20 | `anchors[]{lock,key,contains,ci}` (18) | 4i | 4i | ✔ | — | — | ✔ | — | **POLICY** (the *module* it reads is C-5, MANIFEST) |
| A21 | `measured_not_identities` (`$doc` prose) | 4g | **nobody** | ✔ | — | — | ✔ | ✔ | **POLICY** → `refusals.json` (F2 M-5) |
| A22 | `measured_not_forbidden` (`$doc` sub-block) | 4i | **nobody** | ✔ | — | — | ✔ | ✔ | **POLICY** → same ledger |
| A23 | `$doc` blocks (all four) | all | human | ✔ | — | — | ✔ | — | **POLICY**, stays in the JSON it documents |
| A24 | `$schema` (prose label, not a URI) | 4f, 4g | nobody | ✔ | — | — | — | — | **NOWHERE** as written — must resolve to a real schema |

### The two questions the table answers by construction

**"Does it belong in the census?"** Only A4, A5, A6, A16 and the numeric half of A18 — **five
artifacts**. Everything else the four gates read is a decision, a host structure, or a framework
default. This is the most useful output of the inventory: the census is much smaller than the policy
surface it was supposed to generate. F1's finding ("the framework cannot be adopted without a policy
generator") is true of *markers and counts*, not of policy in general.

**"Does it belong nowhere?"** A12, dead since P36, and A24 — a `$schema` key whose value is the string
`"gate-4f heading localization config"`, documentation wearing a contract's clothes. Neither is a census
concern; both are recorded so that a generator does not emit them into existence.

---

## 3. Duplicated policy representations

Seven, all measured. Each is a place where one fact has more than one home.

| # | Duplication | Evidence | Resolution |
|---|---|---|---|
| **D-1** | Conserved count of a locked phrase | `zh` 982 in `4h.locales.zh.locks[0].expected` **and** `4i.locales.zh.locks[verify-core].count`. `ja` 940 in 4h only. Field names differ; 4h aggregates per **locale**, 4i per **lock** (M-10). | One `phrase-count` fact per (locale, phrase). Both gates resolve it. Policy keeps only the *bound* (`min` vs `exact`). |
| **D-2** | Proper-noun registry | `licensed.global` 48 ∪ `identities.global` 31, overlap 1 (M-6). 4g reads the union, 4f does not. 10 latent false positives. | One `terms.json`; entries scoped `surfaces: ["headings","anchors"]`. C-7 ("one registry, not two") becomes true rather than aspirational. |
| **D-3** | Locale readiness | `state` declared 3×, read 1× (M-9); 4i expresses the same idea as per-entry `enforce`. | `state` → manifest (ratified). `enforce` stays: it is per-**decision**, not per-locale, and the two are genuinely different questions. |
| **D-4** | Locale script | Declared in 4g, 4h, 4i; vocabularies drifted (`cjk` vs `han`/`japanese`) — F2 M-1, still live. | Manifest (ratified, deferred). |
| **D-5** | The lock itself | `4h.zh.locks[0].core` === `4i.zh.locks[verify-core].phrase` — same string, two schemas, two files. 4h adds `leadIns`; 4i adds `id`, `concept`, `provenance`, `forbidden`. | One lock registry. 4h's `leadIns` and 4i's `forbidden` are per-gate *facets* of one entry, not separate entries. |
| **D-6** | The measurement itself | 4h and 4i count the same phrase over a byte-identical `visibleText` view, independently, on every run. | Structural once D-1 lands: both compare against one fact produced by one extractor version. |
| **D-7** | Refusals | `4g.measured_not_identities` = one key, `$doc`. 4i's equivalent is a `$doc` sub-block. No locale carries `measured_not_forbidden` (F2 M-5, unchanged). | `refusals.json`, schema'd and append-only. **Authored, not census output** — see §4.2. |

**The pattern.** D-1, D-2, D-5 and D-6 all exist because policy is filed **by gate**. A concept needed
by two gates is written twice, and the second copy is maintained by a human reading the first. The
contract's structural answer is to file policy **by concept** and let gates project what they need out
of it — the same move the render index made for extractors, applied to data.

---

## 4. Census output specification

### 4.1 The invariant, stated as a test

> **The census produces facts. A fact is a function from a declared key to a measured value, plus the
> evidence that produced it.**
>
> It never produces diagnostics, gate findings, policy decisions or localization judgments. The
> operative test on any proposed output: **can its `kind` be named without naming a gate, and can its
> value be recomputed from the corpus alone?** `marker-lexicon` and `phrase-count` pass. A hypothetical
> `seam-baseline` fails the first test; a `licensed-phrase` fails the second.

The census does not know which gate reads its output, and must not be able to find out. It receives a
manifest, a render index and an authored policy set as **inputs**, and emits facts. The edge from census
to policy does not exist as a write in either direction.

### 4.2 Correction to ADR-3 — the refusal ledger is not census output

ADR-3 lists the refusal ledger under **Outputs**: *"a complete policy JSON … plus a refusal ledger."*
Under the §4.1 invariant that is wrong, and F1 already contains the counter-statement ("Never
regenerated — it is a decision log").

A refusal is a **decision not to register a rule**, taken by a human on evidence. Its evidence is a fact
(`指南` occurs 81 times in `zh` anchors); its refusal is not. Filing it as census output puts a decision
inside the fact producer, which is this phase's first stop condition.

**Decision:** `refusals.json` is authored policy. The census **must load it and must not re-propose a
term in it**; `--reconsider <term>` appends a new row rather than deleting the old one. The `measured`
field becomes a **reference to a census fact** rather than a transcribed integer, which closes risk R-5
(a ledger row without its measurement window) structurally instead of by discipline.

### 4.3 The canonical schema

One envelope, one record shape, for every fact of every kind.

```jsonc
{
  "$schema": "…/schemas/census-output.schema.json",
  "censusVersion": 1,
  "provenance": {
    "measuredAt": "2026-07-28",            // explicit argument; never Date.now()
    "manifest":   "sha256:…",              // the manifest the run resolved
    "corpus":     { "pages": { "de": 77, "ja": 77, "zh": 77 }, "fingerprint": "sha256:…" },
    "engine":     "astro-localization-gates@0.1.0",
    "invocation": "census markers --surface headings --measured-at 2026-07-28"
  },
  "facts": [
    {
      "kind":  "marker-lexicon",
      "key":   { "locale": "de", "surface": "headings", "polarity": "english-absent" },
      "value": ["about", "access", "accessibility", "…"],
      "extractor": "headings@1",
      "evidence": { "referenceTokens": 1184, "occurrenceThreshold": 3,
                    "localeTokens": 903, "pages": { "en": 77, "de": 77 } }
    }
  ]
}
```

**Why one record shape.** `kind` + `key` + `value` + `extractor` + `evidence` is schema-checkable
without the schema knowing what any `kind` means, which is what lets a consumer be added without the
census changing. `key` is an object, not a string, so a fact's identity is structural — which is what
M-7 forces: heading markers and anchor markers are the same `kind` with different keys, and collapsing
them would have destroyed 92–160 tokens per locale.

**`extractor` is per fact, not per file.** A `phrase-count` produced by `visibleText@1` and a
`marker-lexicon` produced by `headings@1` go stale under different conditions. Per-file versioning would
force a full re-census whenever any single view changed. → §9.

### 4.4 The two kinds in v1

| Kind | Key | Value | Consumers |
|---|---|---|---|
| `marker-lexicon` | `{locale, surface, polarity}` | sorted token array | 4f `(headings, english-absent)` · 4g `(anchors, english-absent)` and `(anchors, target-present)` |
| `phrase-count` | `{locale, phrase, surface}` | integer | 4h drift telemetry · 4i bound verification |

Today's instance count: 7 heading lexicons + 7 anchor lexicons + 5 native lexicons = **19 lexicon
facts**; 50 lock phrases plus 2 seam cores, one of which is the same phrase = **51 count facts**.

**Absence is not a fact.** `ja` and `zh` have no `target-present` lexicon because 4g uses the script
signal instead. The census does not emit a row saying so — emitting "not applicable" would require the
census to know 4g's rule. It emits only what it measured; a consumer that needs an absent key decides
for itself whether that is a defect, using `script` from the manifest and its own rule. This keeps the
third stop condition (*the census becomes aware of localization semantics*) unreachable by construction.

**Counts are unmasked.** 4i's `licensedIn` masking (`保护区` inside `荒野保护区`) is a decision about what
licenses a term, so it is applied by the consumer at run time, not baked into the fact. Positive lock
counts carry no masking today (M-14: 2 `licensedIn` entries, both on forbidden terms), so no v1 fact
needs a mask in its key. If a masked baseline is ever required, **the mask set joins the key** — it must
never become an unkeyed transformation of the value.

### 4.5 AS IMPLEMENTED — F5 Phase 4, `phrase-count`

The contract above is the DESIGN. Four things differ in what shipped, and one deliverable was
deliberately withheld. Each is a decision, not drift; none widened the schema.

| Designed | Shipped | Why |
|---|---|---|
| **Census reads authored policy as input** (§7, "the one edge that surprises") — it must consult the lock registry to know which phrases to count | **The phrase set is an explicit `--phrases` argument. The census reads no policy at all.** | The edge is unnecessary, and the second host proves it: `forebearfindastro` has no `i18n-gates/` and its phrases are still perfectly countable. WHERE an operator got a phrase list is not the producer's business, and making it so is the one thing that would stop the tool being portable. **The contract is narrowed, not widened.** §7's `census ◀── reads policy as INPUT` edge is withdrawn. |
| Corpus location resolved from the manifest | **`--dist` is a required operator argument** | The census is the first framework artifact that needs to know where rendered output lives — manifest §3 `routes.output`, coupling C-2, which adventureastro does not declare yet. The alternatives were to teach the producer to compute a host path (C-1 reintroduced) or to widen the manifest in a phase forbidden from touching it. Recorded rather than resolved: **`routes.output` is the first thing the C-2 phase should land.** |
| `provenance.invocation` | Shipped as designed, **verbatim** | Implementation shows it carries whatever paths the operator typed, so a census produced with absolute paths is machine-specific and will diff against the same census produced elsewhere — defeating the review method §9 exists to support. The fix is a **usage rule, not a schema change**: produce with host-relative arguments. A producer that rewrote its own provenance would be a producer that lies about how it was run. |
| `extractor` per fact | Shipped as designed, **with a recorded hole** | `'visibleText@1'` is a constant in the producer, while the view it names lives in `scripts/lib/rendered-text.mjs`. A change to the view that forgets to bump the string leaves stale counts undetectable — precisely the staleness the field exists to catch. The version belongs beside the view; it moves there when a second version exists to move it for. |

**The sample census was produced but not committed.** `census/phrase-count.json` has no reader: the
manifest `census` section (§8.1) is out of scope for Phase 4, and no consumer has been migrated. A
committed artifact that nothing reads and nothing addresses is the M-4 defect this contract exists to
end, so the 51-fact adventureastro census and the 35-fact `forebearfindastro` census live in the phase's
scratchpad. Committing them is one command once §8.1 lands.

**What the implementation confirmed rather than changed:** D-1 collapses exactly as designed. The
single measured fact `{zh, 官方渠道核实, prose} = 982` reproduces both `4h.expected` and `4i.count`, and
`{ja, 公式情報をご確認ください, prose} = 940` supplies the row 4i never had. All 52 frozen baselines
(4 exact counts, 46 floors, 2 seam cores) are reproduced by the producer with no re-baselining.

---

## 5. Minimal canonical examples

Three, one per situation the schema has to survive.

**A lexicon fact — the artifact a second host provably cannot hand-author.**

```jsonc
{ "kind": "marker-lexicon",
  "key": { "locale": "zh", "surface": "anchors", "polarity": "english-absent" },
  "value": ["about", "access", "activities", "…", "wildlife"],      // 326 tokens, sorted
  "extractor": "anchors@1",
  "evidence": { "referenceTokens": 1402, "occurrenceThreshold": 3,
                "localeTokens": 88, "pages": { "en": 77, "zh": 77 } } }
```

**A count fact — the one that ends D-1.** One row replaces `4h.expected` and `4i.count`, and the `ja`
asymmetry disappears because the fact exists whether or not a second gate happens to want it.

```jsonc
{ "kind": "phrase-count",
  "key": { "locale": "zh", "phrase": "官方渠道核实", "surface": "prose" },
  "value": 982,
  "extractor": "visibleText@1",
  "evidence": { "pages": 77, "pagesWithPhrase": 77 } }
```

The policy that consumes it keeps only the decision:

```jsonc
// i18n-gates/locks.json — authored
{ "id": "verify-core", "locale": "zh", "phrase": "官方渠道核实",
  "concept": "the verify-with-official-sources caveat core",
  "provenance": "C6/C7 and Gate 4e — a locked phrase is intent, not bytes.",
  "bound": "exact",                     // was: count 982 here AND expected 982 in 4h
  "leadIns": ["请", "向"],               // 4h's facet of the same lock
  "forbidden": [] }                      // 4i's facet
```

**A refusal row — authored, referencing a fact rather than restating it.**

```jsonc
// i18n-gates/refusals.json — append-only, human-owned
{ "term": "指南", "locale": "zh", "surface": "anchors",
  "proposedAs": "forbidden-substitution",
  "measured": { "kind": "phrase-count", "key": { "locale": "zh", "phrase": "指南", "surface": "anchors" } },
  "refutedBy": "76 of 81 are the compound 指南针 (compass); the residue axis, not the threshold, was wrong",
  "axis": "residue", "phase": "P20", "decidedAt": "2026-07-25" }
```

---

## 6. Artifact ownership matrix

| Artifact | Producer | Consumer | Owner | Derived / authored | Stability | Host-specific |
|---|---|---|---|---|---|---|
| `marker-lexicon` (headings) | census `markers --surface headings` | gate 4f | localization lead | **derived** | frozen; re-run only after a corpus review closes | ✔ values, ✘ schema |
| `marker-lexicon` (anchors) | census `markers --surface anchors` | gate 4g | localization lead | **derived** | frozen, same rule | ✔ / ✘ |
| `marker-lexicon` (target-present) | census `markers --polarity target-present` | gate 4g | localization lead | **derived** | frozen | ✔ / ✘ |
| `phrase-count` | census `counts` | gates 4h, 4i | localization lead | **derived** | re-measured only on a deliberate re-baseline | ✔ / ✘ |
| census `provenance` | census (every run) | humans, `census diff` | census | **derived** | one per run, never edited | ✔ / ✘ |
| `terms.json` | human; census proposes | gates 4f, 4g | localization lead + native reviewer | **authored** | append-only; removal needs evidence | ✔ / ✘ |
| `locks.json` | human | gates 4h, 4i | localization lead + native reviewer | **authored** | grows when a concept is locked | ✔ / ✘ |
| `forbidden[]` | human; census proposes | gate 4i | localization lead | **authored** | per decided review item | ✔ / ✘ |
| `anchors[]` (dictionary assertions) | human | gate 4i | localization lead | **authored** | tracks the dictionary | ✔ / ✘ |
| `refusals.json` | human (census consults) | census, humans | whoever ran the census | **authored** | append-only, permanent | ✔ / ✘ |
| language grammar (`imperative`, `connectives`) | human | gate 4h | native reviewer | **authored** | stable per language | ✘ — portable across hosts |
| script grammar (`clause`/`sentenceBoundaries`) | framework | gate 4h | framework; host may override | **framework default** | stable per writing system | ✘ |
| report tuning (`repeatThreshold`) | human | gate 4g | whoever reads the report | **authored** | tuned freely; affects no verdict | ✘ |
| `script`, `state` | human | 4f, 4g, 4h, 4i | host architect | **authored (manifest)** | per locale lifecycle | ✔ |

Every row has exactly one producer, one owner and at least one consumer. No row exists because a single
gate wants it: the two entries with one gate listed (`anchors[]`, `repeatThreshold`) are authored
decisions the gate reads, not artifacts the census would generate.

---

## 7. Producer / consumer graph

```
   host corpus (dist/)                 host source (src/**)        human decisions
          │                                    │                          │
          ▼                                    ▼                          ▼
   ┌─────────────────┐               ┌──────────────────┐        ┌──────────────────┐
   │ engine/         │               │ adapters/        │        │  i18n-gates/     │
   │ render-index    │               │ (host adapter)   │        │  terms.json      │
   └────────┬────────┘               └────────┬─────────┘        │  locks.json      │
            │ pages · visibleText             │ locales          │  refusals.json   │
            │ headings · anchors              │ policy paths     │  language.json   │
            │                                 │ census paths     └────────┬─────────┘
            ├───────────────┬─────────────────┴────────────────────────────┤
            │               │                                             │
            ▼               ▼                                             │
   ┌─────────────────────────────┐                                        │
   │  census/                    │◀────── reads policy as INPUT ──────────┤
   │  markers · counts           │        (which phrases? which terms?)   │
   └──────────────┬──────────────┘                                        │
                  │ writes                                                │
                  ▼                                                       │
   ┌─────────────────────────────────────────────┐                        │
   │  census/*.json  (committed)                 │                        │
   │  marker-lexicon · phrase-count · provenance │                        │
   └──────────────┬──────────────────────────────┘                        │
                  │                                                       │
                  └───────────────┬───────────────────────────────────────┘
                                  ▼
                    ┌─────────────────────────────┐
                    │  engine/gates 4f 4g 4h 4i   │ ──▶ exit 0 | 1 | 2
                    └─────────────────────────────┘

   FORBIDDEN EDGES
     census ──▶ i18n-gates/**          a fact producer must never write a decision
     gates  ──▶ census/**  (write)     a gate must never re-baseline itself
     census ──▶ knowledge of any gate  no kind, key or field may name a gate
     census ──▶ CI                     regeneration destroys the freeze (ADR-3)
```

⚠ **The `census ◀── reads policy` edge above was WITHDRAWN at F5 Phase 4.** The design reasoned that
the census must consult the lock registry to know what to count. Implementation showed the phrase set
is better supplied as an argument, and the second host settles it: `forebearfindastro` has no policy
directory at all, and its phrases count perfectly. The producer reads **no policy**, and the graph is
one edge simpler than drawn. The only surviving policy-adjacent obligation is the refusal ledger, which
`--propose` must consult — and no proposer has been built. See §4.5.

The reverse direction — census writing policy — was never in doubt, and is the whole reason proposals
are a human-readable report rather than a committed artifact (§11).

---

## 8. Proposed file layout

### Host repository

```
adventureastro/
├── host-manifest.json           ← gains a `census` section (§8.1)
├── i18n-gates/                  ← AUTHORED. Hand-edited; no machine writes here.
│   ├── 4f-headings.json         ← loses `markers`, `state`; keeps $doc
│   ├── 4g-anchors.json          ← loses `markers`, `nativeMarkers`, `state`, `script`, `identities`
│   ├── 4h-seams.json            ← loses `locks`, `state`, `script`, `nonBoundaries`
│   ├── 4i-glossary.json         ← loses `locks`, `script`; keeps `anchors`
│   ├── terms.json               ← NEW  · D-2: one proper-noun registry
│   ├── locks.json               ← NEW  · D-5: one lock registry, both gates' facets
│   ├── language.json            ← NEW  · A13/A14, per language, portable across hosts
│   └── refusals.json            ← NEW  · F2 M-5 / D-7: the ledger, machine-readable
└── census/                      ← DERIVED. Machine-written wholesale; never hand-edited.
    ├── provenance.json
    ├── marker-lexicon.json
    └── phrase-count.json
```

`i18n-gates/` keeps its name. Renaming it to `policy/` would read better and is a one-line manifest edit
whenever the owner wants it; doing it inside this phase would be a change with no consumer, which is the
M-4 defect in the other direction.

**The gate configs do not disappear**, and that is the honest result: after the split they hold `$doc`,
`repeatThreshold`, `anchors[]` and per-gate facets. Four files shrink; none is deleted. A one-shot
migration is not required either — each gate can move to census resolution independently, because the
manifest addresses both sources.

### Framework package

```
packages/astro-localization-gates/
├── census/
│   ├── run.mjs        – argument parsing, manifest resolution, determinism envelope
│   ├── markers.mjs    – emits marker-lexicon facts   (--surface, --polarity)
│   ├── counts.mjs     – emits phrase-count facts
│   ├── propose.mjs    – human-readable proposals; writes nothing committed (§11)
│   └── emit.mjs       – envelope, sorted enumeration, sorted keys, byte-identical output
└── schemas/
    ├── census-output.schema.json
    └── terms.template.json · locks.template.json · language.template.json · refusals.template.json
```

### 8.1 Manifest section — points, never embeds

```jsonc
"census": {
  "dir": "census",
  "facts": {
    "marker-lexicon": "marker-lexicon.json",
    "phrase-count":   "phrase-count.json"
  },
  "provenance": "provenance.json"
}
```

Paths only, resolved against the manifest's own directory — the F5 Phase 2 rule, unchanged. If a token,
a phrase, a count or a threshold ever appears in this section, the manifest has absorbed census content
and the change is reverted rather than extended. F2 ADR-2's discriminator applies verbatim: **a field
that would have to be edited if the census switched extractors is procedure, not structure.**

---

## 9. Versioning strategy

Three independent axes. Conflating them is the trap, because they fail for different reasons and have
different remedies.

| Axis | Where | Changes when | On mismatch |
|---|---|---|---|
| `censusVersion` | envelope, integer | the **output schema** changes | **exit 2**, forward and backward — the engine refuses a version it does not know (the `manifestVersion` rule) |
| `extractor` | **per fact** | a render-index view changes | **exit 2** — the number cannot be compared across extractors. This is what makes 982 mean something. |
| `corpus.fingerprint` | provenance | any content commit | **not an error.** Corpus movement is drift, and drift is a gate's business — 4h reports it advisory, 4i blocks per bound. |

**The distinction that matters:** *census staleness* (the schema or an extractor moved) is a tooling
failure and exits 2. *Corpus movement* (pages were added) is normal, and observing it is what the gates
are for. A design that treats them alike leads straight to re-running the census in CI to keep it
"fresh", which destroys the freeze semantics that make 4f a regression gate (ADR-3, rejected
alternatives).

**Determinism, restated as an acceptance test:** *same corpus + same manifest + same census version ⇒
byte-identical output.* Enforced by sorted file enumeration, sorted key emission, sorted token arrays,
and no wall-clock input except `--measured-at`. Its purpose is reviewability: diffing regenerated output
against committed output is the only review method that scales to 326 tokens per locale.

**Schema drift** follows ADR-2's rule verbatim: additive fields are optional and bump the minor; a field
that changes meaning bumps `censusVersion`; **unknown keys are rejected, not ignored** — a typo'd key
that silently does nothing is `nonBoundaries` reproduced in the contract layer.

**Migration of today's frozen values** is a transcription with a built-in check: emit the census
envelope from the existing configs, then run the census and diff. A non-empty diff is either a real
corpus change since P35/P37 or a transcription error, and either way it is resolved before the gates
switch over — never absorbed by re-freezing.

---

## 10. Cross-host exercise

Classification of every required census artifact in both repositories. **No extraction was implemented
and no file in either repository was modified.**

`forebearfindastro` as read: `src/i18n/locales.ts` declares 19 locales (`en` master, 18 `planned`),
`dist/` holds 297 HTML pages across 7 built locale trees, `src/i18n/glossary.json` holds 21 terms,
`src/i18n/chrome.ts` holds a per-locale chrome dictionary. It has no manifest, no `i18n-gates/`, and no
gate has ever run against it.

| Required artifact | adventureastro | forebearfindastro |
|---|---|---|
| `marker-lexicon` (headings) | **present already** — 244–276 tokens × 7 locales, frozen at P35. Transcribe + diff. | **unavailable.** Mechanically derivable and *wrong by construction*: the corpus is machine-generated and self-declared provisional. Emitting it would freeze the defects' own tokens out (§0 finding 3). |
| `marker-lexicon` (anchors) | **present already** — 295–332 × 7, frozen at P38. | **unavailable**, same reason. |
| `marker-lexicon` (target-present) | **present already** — 341–503 × 5 latin locales; correctly absent for `ja`/`zh`. | **unavailable**, same reason. |
| `phrase-count` | **present already** — 50 lock baselines + 2 seam cores; 982 duplicated, 940 single (D-1). | **derivable today.** `glossary.json` `class: pinned` carries `translations.<locale>` = exactly one authoritative form per locale. Counting it over `dist/` is a pure measurement and needs no review state. **`phrase-count` is the portable kind.** |
| census `provenance` | **derivable going forward; unavailable retroactively.** Today's windows are `$doc` prose ("measured at P37, on the 619-page build of 2026-07-27"). Re-running produces a *new* provenance; the old one is not recoverable, and the acceptance test is the diff, not the history. | **derivable** on first run. |
| `terms.json` | **present but split** — 48 + 31, overlap 1 (D-2). Merging is an authored step: a human decides each term's surface scope. | **present already, in a richer schema** (M-13): `invariant` 5 ≅ never-translated proper nouns; `pinned` 5 ≅ lock phrases; **`protected` 11 with `gloss`/`exceptions` — a class adventureastro has no representation for.** |
| `locks.json` | **present but split** across 4h and 4i (D-5). | **derivable from `glossary.json`** for the `pinned` class; `forbidden[]` — enforcing the *absence* of competing renderings — is a concept host 2 does not have, and would be **authored**. |
| `refusals.json` | **authored.** Five rows named in ADR-3 plus whatever the `$doc` blocks hold; hand transcription, per ADR-3. | **unavailable** — no census has ever run there. |
| language grammar | **present already** for 7 languages, and **portable**: the `de`/`es`/`it`/`fr`/`pt` rules transfer unchanged. | **derivable by copy** for the 5 shared languages; **authored** for `el`, `nl`, `pl`, `ro`, `cs`, `sk`, `hu`, `hr`, `sl`, `sv`, `no`, `da`, `fi`. |
| register / address form | **authored, but unavailable as data** — `du` vs `Sie`, です・ます, 你 live in `ui.ts` preamble prose and `NATIVE_REVIEW.md`. | **present already as data** — `writingProfiles.<locale>.{register, addressForm}` (M-13). |

### Three findings the exercise produced

**F-1 — the census needs an authored precondition.** Marker derivation is legal only over a corpus
believed clean. Host 2 makes this concrete rather than theoretical: it has a corpus, the derivation
would succeed, and the output would be wrong. **The census must refuse to emit a `marker-lexicon` for a
locale whose manifest `state` is not `complete`.** That is a producer honouring a host declaration, not
a localization judgment — the census reads a flag; it does not assess a translation. This raises the
deferred `state` migration (A8, D-3) from tidy-up to prerequisite.

**F-2 — the term registry schema must take host 2's shape, not adventureastro's.** Two hosts
independently authored terminology registries. Host 2's is the more expressive — three classes,
per-locale `translations`, per-locale `exceptions`, sourcing required on every term — and
adventureastro's has the one thing host 2 lacks: `forbidden`, which enforces that competing renderings
are *absent*. Neither is complete. F2 ADR-2's own standard for admitting a field is *"a general host
capability with a concrete second host that would need it"*; `class` and `translations` now meet it, on
evidence rather than anticipation. The union is the schema, and the framework ships it empty.

**F-3 — an out-of-scope finding for C-5, recorded not acted on.** The manifest's
`dictionaries.chrome.canonicalKeys.binding: "EN"` assumes the reference dictionary is a sibling binding
in the same module. Host 2's `CHROME` has **no English entry at all** — English is deliberately absent
so the default locale falls back to component literals, and the canonical key set lives in `NAV_EN` in a
*different* module plus literals inside components. Generalized 4j's `chrome` binding, as specified in
ADR-5, cannot address that host. This is C-5's problem, not this phase's; it is recorded so the phase
that migrates C-5 starts from it instead of discovering it.

---

## 11. Rejected artifacts and kinds

Following F2's precedent: what was proposed, why it was refused, and what would flip it.

| Rejected | Why | What would flip it |
|---|---|---|
| `surface-inventory` fact kind (every distinct string per surface, with occurrence and page counts) | Its only consumer would be the census's own proposal step. Self-consumption fails the "at least one consumer" criterion, and a committed artifact nothing reads is M-4. | A second consumer outside the census — e.g. a gate that reports corpus-wide string frequency. |
| `anchor-identity` fact kind | 4g recomputes the identity signal live from `enByHref` every run, by design. Freezing it would create a second, staler copy of something the gate already derives correctly. | 4g needing a *historical* identity set to diff against, which no review item has asked for. |
| Committed `proposals.json` | A proposal is a candidate decision. Committing it inside `census/` puts a decision in the fact producer (stop condition 2); committing it inside `i18n-gates/` has the census writing policy (stop condition 1). **Proposals are a human-readable report from `census … --propose`, written to stdout or a scratch path, never committed.** | Nothing available today. A committed proposal would need an owner and a lifecycle nobody has asked for. |
| `nonBoundaries` (A12) | Dead since P36 and unread four phases later (M-11). Not a missing feature. | The P36 review item that introduced it, which F2 already records as unrecoverable from the config. |
| A `reviewed: true` flag in census output | The census would be asserting the corpus is clean — a localization judgment, and the third stop condition verbatim. That fact belongs to the host, in the manifest, as `state`. | Never. This one is structural. |
| Per-gate census files (`census/4f.json` …) | Reproduces exactly the by-gate filing that produced D-1, D-2, D-5 and D-6. | Never. It is the defect this contract exists to end. |
| Renaming `i18n-gates/` → `policy/` in this phase | Correct eventually; a change with no consumer today. | The phase that migrates the last derived field out of the gate configs. |

---

## 12. Stop conditions — what was hit

**"Gate behavior starts influencing census format."** Hit once, at `target-present` lexicons for
`ja`/`zh`. The natural design emits a row marked *not applicable*, which requires the census to know
4g's script rule. Resolved by **not emitting**: absence is not a fact, and the consumer decides what an
absent key means (§4.4). Recorded rather than accommodated.

**"Host-specific policy leaks into shared schemas."** Hit once, at the term registry. Adopting host 2's
`class` vocabulary looked like absorbing one host's model. Resolved against F2 ADR-2's own admission
standard — two independent hosts needing the concept is the evidence that standard demands (§10 F-2).

**"The census becomes aware of localization semantics."** Not hit. §4.1's naming test is the guard that
keeps it reachable only deliberately.

### Recorded live defects — not fixed in this phase

| # | Defect | Evidence | Disposition |
|---|---|---|---|
| **E-1** | `gate-4h-seams.mjs` references an undefined `CONFIG` at lines 89 and 292 (M-12). Line 89 turns a fail-closed exit 2 into a `ReferenceError`; **line 292 sits on the ordinary advisory drift path**, so the first legitimate count drift crashes the gate instead of reporting it. Introduced by F5 Phase 2; latent because both paths are currently unreached. | `grep -n CONFIG scripts/gate-4h-seams.mjs`; gate green today at 539 pages / 1922 locked phrases. | Two-line fix (`host.policy.describe('seams')`). Owner's call — this is a design phase and touching gate source is out of scope. |
| **E-2** | Ten (locale, phrase) pairs where an anchor-registered identity carries a heading marker for the same locale (M-6): `High Uintas Wilderness` ×7, `Flaming Gorge Reservoir` in `de`/`fr`/`pt`, `Denver` in `zh`, `UTV` in `de`. | §3 D-2. | Closed by the D-2 merge. No corpus change needed — no such heading exists today. |
| **E-3** | `$schema` values in 4f and 4g are prose labels, not resolvable schema references (A24). | `"gate-4f heading localization config"`. | Closed when the templates ship with real schemas. |

### Environmental observation, no causality attributed

The `astro check` hint count moved 257 → 266 across F5 Phase 2. The Phase 2 changes were confined to
`.mjs` and `.json` files outside Astro's analysis path, and the count reproduces. **Recorded as an
unresolved environmental observation.** No cause is assigned and none is inferred; it does not gate this
phase and was not investigated here.

---

## 13. Success criteria, checked

| Criterion | Verified as |
|---|---|
| Every future census output has **one owner** | §6 — five census artifacts, all owned by the census, all produced by one generator invocation. |
| …**one schema** | §4.3 — one envelope, one record shape (`kind` + `key` + `value` + `extractor` + `evidence`), two kinds in v1. |
| …**one canonical location** | §8 — `census/<kind>.json`, addressed through the manifest's `census` section, resolved against the host root. |
| …**at least one consumer** | §4.4 — `marker-lexicon` → 4f, 4g; `phrase-count` → 4h, 4i; `provenance` → `census diff` and human review. Three candidate kinds were **rejected** for failing this (§11). |
| No artifact exists solely because one gate needs it | §2 — the five census artifacts are keyed by (locale, surface, polarity) and (locale, phrase, surface). No key names a gate. The two artifacts with a single gate consumer are authored decisions, not census output. |
| Ambiguity eliminated before implementation | §4.1's naming test, §9's three version axes, §4.4's absence rule and §4.3's mask rule each answer a question the extractor would otherwise have had to invent an answer to mid-implementation. |

---

## 14. Open items for F5 Phase 4

| Item | Blocking? | Note |
|---|---|---|
| `state` / `script` migration to the manifest (A8, A9, D-3, D-4) | **Yes, for markers** | F-1 makes `state` a precondition of `marker-lexicon` emission, not a tidy-up. `phrase-count` does not depend on it and can land first. |
| Merge order | No | `phrase-count` first: it closes D-1 and D-6, has no manifest dependency, and is 51 facts. `marker-lexicon` second, behind `state`. |
| `terms.json` merge (D-2) | No | Authored step: 78 entries, each needing a surface scope and a class. Not a census run. |
| `refusals.json` transcription (D-7, F2 M-5) | No | Five named rows plus whatever the `$doc` blocks hold. Per ADR-3, one-time and by hand. |
| E-1 — the `CONFIG` ReferenceError | No | Two lines. Independent of this contract. |
| ADR-3 amendment | No | §4.2 corrects the refusal ledger from output to input. Fold into the ADR when F2 is split one-file-per-ADR (ADR-6, still outstanding). |
| C-5 chrome dictionary | Out of scope | F-3 records that ADR-5's `canonicalKeys.binding` cannot address host 2. |
| Whether the census can propose `imperative.boundMorphemes` | No | The 9 `zh` compounds containing 请 came from a dictionary, not the corpus. A corpus census can only find the ones the corpus happens to use, so it would produce a partial list that reads as complete. Recorded as a reason **not** to add a kind. |
