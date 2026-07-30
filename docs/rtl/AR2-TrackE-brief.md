# AR-2 Track E — Arabic corpus expansion: execution plan

**Status:** planning only. No corpus is created by this document. Track E is
authorized in advance by Track D decision D4, so this plan needs no further
decision gate to *begin* — but it does carry one owner decision (**E-D1**, §1.2)
that changes what the pilot can measure.

**Planning baseline: `1eaae2c`** (Track D D-3, B-10b resolved). Unlike the Track D
brief's baseline, this commit was written by the author and its message is
evidence of its content.

---

## 0. The engineering baseline, measured rather than asserted

Everything in this section was measured at `1eaae2c` on 2026-07-30. It is the
state Track E starts from, and no item in it is Track E's work.

| Fact | Value | Source |
|---|---|---|
| Rendered pages | 620 (of 863 `dist/` files) | gate 4q traversal |
| Scripted gates | 11 — `gates:src` 4j·4o·4p; `gates:dist` validate-site·4m·4k·4n·4f·4h·4i·4g·4q | `package.json` |
| `ar` rendered routes | **1** (`/ar/cancellation-policy/`) | `AR_SLUGS`, gate 4q |
| `ar` visible text | **4 254 characters**, against ~2.6 M per LTR locale | gate 4q, printed every build |
| `ar` spoke files on disk | **0** `.ar.mdx` (de/ja/zh each have 57) | `src/content/**` |
| `ar` chrome dictionary | 102/102 keys | AR-1 |
| `ar` glossary locks (4i) | **2**, both `bound: floor`, floor 1 | `i18n-gates/4i-glossary.json` |
| `ar` seam locks / connectives (4h) | **0 / 0**, `state: "in-progress"` | `i18n-gates/4h-seams.json` |
| `ar` heading/anchor lexicons (4f/4g) | union of seven locales, `state: "in-progress"` | `i18n-gates/{4f,4g}.json` |
| `ar` gallery | in `GALLERY_EXEMPT` (no `/ar/` homepage) | gate 4j |

**The binding constraint is one number.** `ar` renders 1 route and 4 254
characters. Every remaining Arabic task in `AR2-backlog.md` is blocked on that
number moving, and on nothing else. The presentation layer (Track B), the
registry contract (Track C) and the policy layer (Track D) are closed.

---

## 1. The pilot corpus

### 1.1 Scope

**The `utv` hub — 7 spokes — which is batch 1 of `MULTILINGUAL_HANDOFF.md` §7
stage 2's fixed hub order**, unchanged: utv(7) → hiking(16) → fishing(4) →
camping(4) → scenic-drives(4) → guides(9) → itineraries(9) → things-to-do(2) →
dinosaur-national-monument(2).

The order is not re-derived. It has been executed identically for `de`, `ja` and
`zh`; deviating buys nothing and loses the comparability that makes an `en`↔`ar`
per-file alignment meaningful.

**Why `utv` is the right pilot is a measurement, not a preference.** The pilot has
to populate three specific instrument surfaces, and the English `utv` sources
already carry them (source occurrences across the 7 English files, measured
2026-07-30):

| Population | Count | Which instrument it feeds |
|---|---|---|
| `Vernal` | 164 | B-11 floor |
| `Kawasaki KRX 1000` | 45 | B-11 floor, §4.2 transactional |
| `Doc's Beach` | 30 | B-11 floor |
| `Moonshine Arch` | 27 | B-11 floor |
| `Outlaw Trail` | 17 | B-11 floor |
| `Asphalt Ridge` | 16 | B-11 floor |
| `(435) 219-9447` | 28 | gate 4n — first real isolation population |
| `→` | **0** | gate 4o population 2 grows; 0 findings expected |

⚠ **These are source counts and they are a hypothesis about the wrong window.**
B-11 is about *rendered body prose*; these figures include frontmatter and
anything a component renders as an anchor (which gate 4g already sees). The
recurring lesson of this project — recorded four times — is that a recorded size
is a hypothesis about the measurement window. **E-0 re-censuses these on rendered
visible text, per file, before any Arabic is written**, and the divergence from
this table is itself a finding.

### 1.2 E-D1 — owner decision: add the 2 `dinosaur-national-monument` spokes?

**Recommendation: yes. Pilot = 9 files, not 7.**

Pulling the last hub in the order forward by 2 files is a real deviation and is
recorded as such. The justification is that two things are measurable only with
it, and neither is reachable from `utv`:

1. **`Dinosaur National Monument` — 31 occurrences, 0 in `utv`.** It is the §4.2
   wayfinding name most likely to be localized against policy, because it is a
   *national monument* — the category translators habitually render with an
   exonym. Policy §4.1/§4.2 draws the line at wayfinding function, and this name
   sits closest to the line. A B-11 lock set that cannot measure it is measuring
   the easy cases.
2. **The `Key Takeaways → أبرز النقاط` identity.** AR-1 froze it and deliberately
   did **not** lock it in 4i, because no Arabic page renders the block and *"a
   floor of 0 is a lock that can never fail."* `utv` renders no Key Takeaways
   block either (measured: 0 across all 7). The DNM hub renders 1. So the utv-only
   pilot leaves that identity in exactly the state AR-1 left it, and the 9-file
   pilot unblocks it at **floor 1** — small, but a lock that can now fail.

**Cost, stated plainly:** the hub order is no longer the one three prior locales
ran. Nothing in the pipeline depends on that order except gate 4b, which is about
*routes*, not hubs, and is satisfied by the batch allow-list in §1.4 either way.

Alternative if E-D1 is declined: pilot = 7 files, B-11's lock set omits
`Dinosaur National Monument`, and the Key Takeaways identity stays blocked until
the camping/DNM batch.

### 1.3 Expected page count

| | Now | After pilot |
|---|---|---|
| `ar` routes | 1 | **10** (E-D1 yes) / 8 (E-D1 no) |
| Site pages | 620 | **629** / 627 |
| `ar` visible text | 4 254 ch | predicted at E-0, measured at E-2 |

The route count is the **registration** acceptance check, not the content one. It
is verified as an exact delta, never as a total: `+1` at E-1 and `+8` at E-2.

### 1.4 Deliverables per spoke — two, not one

The handoff spells out the two-deliverable rule for stage 4 inline pages only.
It applies to spokes too, for a different reason, and the pilot brief must say so:

- **`src/content/<hub>/<slug>.ar.mdx`** — file presence alone emits the route.
  `src/pages/[locale]/[hub]/[id].astro:getStaticPaths` iterates the collection and
  splits the locale off the filename; it never consults `AR_SLUGS`.
- **the `AR_SLUGS` entry** in `src/lib/i18n.ts` — this is what makes internal
  links across the site resolve to the Arabic route instead of falling back to
  English, and what `localeHref()` reads.

They diverge silently: a file with no slug entry renders a live page nothing links
to; a slug entry with no file registers a route that does not exist. §7 stage 3's
registry-parity check (zero orphans in *both* directions) is the check that closes
this, and the pilot runs it at 9/9 rather than waiting for 57/57.

### 1.5 Acceptance criteria — every one tied to an existing instrument

No new instrument is built for the pilot. Each row names what already enforces it.

| # | Criterion | Enforced by | Status of the instrument |
|---|---|---|---|
| A1 | `astro check` 0 errors; `npm run build` exit 0 | pipeline | existing |
| A2 | Route delta is **exactly** +1 (E-1) then +8 (E-2) | `validate-site` page count | existing |
| A3 | `AR_SLUGS` ↔ on-disk `.ar.mdx` parity, 0 orphans both directions | §7 stage 3 check (manual) | existing |
| A4 | Zero `broken link:`; every internal link outside the allow-list keeps its English path | gate 4b (manual) + `validate-site` | existing |
| A5 | 9 new pages render effective direction `rtl` | **gate 4k** | existing, retrospective |
| A6 | Zero isolation findings on the new pages | **gate 4n** | existing, **first non-trivial run** |
| A7 | Zero Arabic-Indic / Eastern Arabic-Indic digits in `ar` visible text | **gate 4q** | existing, **first non-vacuous run** |
| A8 | The 2 existing 4i locks still hold, at **re-measured** floors | **gate 4i** | existing — see ⚠ below |
| A9 | 4f/4g `ar` stay `state: "in-progress"` | gates 4f/4g | existing, by design |
| A10 | `ar` stays in `GALLERY_EXEMPT` | gate 4j | existing — the pilot adds no homepage |
| A11 | 4m re-baselined for the 9 new routes | **gate 4m** | existing — see ⚠ below |
| A12 | Gate 4o population 2 grows 1 → 10 files, 0 findings | gate 4o | existing |

⚠ **A8 is a trap, not a formality.** Both `ar` locks are `bound: floor` with a
floor of **1**, measured on a single page. After the pilot the corpus is ten
times larger and a floor of 1 enforces almost nothing — the lock would pass a
build that dropped the term from nine of ten pages. **Re-measuring the floor is a
required pilot deliverable**, and it is the same class of error as a stale
baseline: the number was correct when written and silently stops meaning what it
meant.

⚠ **A11 is the known blind spot 4m documents about itself:** a frozen baseline is
*blind to a new route until re-baselined*. The 9 new routes are new routes. (The
English `utv`/DNM spokes carry 0 `youtube` references, so the expected baseline
delta is 9 routes × 0 videos — which is exactly the case where forgetting to
re-baseline is invisible.)

### 1.6 Glossary interaction

**Arabic inverts Gate 4c, and the pilot is the only cheap moment to exploit it.**

Every prior locale's terminology was reverse-engineered from a shipped corpus
under 4c ("corpus beats brief"), and each correction cost a corpus-wide sweep.
Arabic is the first locale whose policy predates its text — `AR1-arabic-policy.md`
says so in its own preamble — so there is currently nothing to sweep, and every
§1–§5 decision in that policy is a *prediction* that no corpus has yet tested.

Consequences for the pilot brief:

- **What is frozen and not re-decided per file:** MSA (§1); register — direct 2nd
  person, singular, masculine unmarked, impersonal phrasing preferred (§2);
  Western digits, no exception (§3); the 5 Arabic exonyms (§4.1); the 17
  Latin-verbatim wayfinding/transactional terms (§4.2); Arabic sentence-level
  punctuation with Latin runs keeping their own internal punctuation (§5.1);
  `<bdi>` and never invisible control characters (§5.2).
- **What the pilot is expected to produce:** a 4c challenge. A translator
  contradicting policy §2 or §4 with corpus evidence is the pipeline working. At
  9 files a policy reversal costs a 9-file sweep; at 57 it costs the locale.
  **Schedule the challenge window into the pilot deliberately** — do not defer
  terminology disputes to stage 3.
- **What the pilot must tell translators that no prior locale's brief said:**
  `<bdi>` is authored **in the MDX body**. The B-2 shared formatter isolates
  values flowing through shared components (`SITE` NAP, `TourCta`, `TrustBadge`);
  a phone number, price or Latin brand run typed directly into `.ar.mdx` prose
  passes through no formatter at all. Gate 4n reads `dist/` and will catch it, so
  the enforcement exists — but 28 unisolated phone occurrences is a failing batch,
  not a review note. This is a corpus-creation requirement derived from an
  engineering fact, and it belongs in the brief, not in the QA pass.
- **What the pilot does *not* touch:** the 4h lock list stays empty until E-3
  (§4). Declaring an Arabic seam lock to make the config look populated is the
  F2 M-4 defect the `ar` 4h `$doc` refuses by name.

---

## 2. What becomes measurable only once prose exists

This is the list of things that are unanswerable today for one reason — there is
no Arabic text to measure — and become answerable the day the pilot lands. It is
the justification for sequencing corpus before rule.

| # | Measurement | Blocked on | Feeds |
|---|---|---|---|
| M1 | Distribution of proclitic **و** — word-initial vs standalone conjunction — across Arabic prose | corpus | **B-8b** |
| M2 | Behaviour of the definite article **ال** at a join seam (assimilation across a boundary) | corpus | **B-8b** |
| M3 | Whether Arabic has any *sentence-level* locked phrase at all, or only term-level locks | corpus | **B-8b** |
| M4 | Rendered body-prose counts of the §4.2 wayfinding names, per file, `en` ↔ `ar` aligned | corpus | **B-11** |
| M5 | Re-measured floors for the 2 existing 4i locks | corpus | A8, gate 4i |
| M6 | Census floor for the `Key Takeaways → أبرز النقاط` identity | corpus (DNM only — E-D1) | gate 4i |
| M7 | Arabic-Indic digit incidence in translator-authored prose | corpus | policy §3, gate 4q |
| M8 | Isolation-defect incidence in MDX body prose | corpus | gate 4n |
| M9 | Register drift — count of marked (masculine imperative) forms vs unmarked phrasings | corpus | policy §2 |
| M10 | Plural/dual agreement in interpolated counts | corpus | policy §6, currently an explicit non-decision |

**M1–M3 are the whole of B-8b**, and D-2 already produced the first hard evidence
about their shape without a corpus: on identical prose, the Latin word-boundary
form and the CJK adjacency form both report exactly one violation at *different
offsets* — `و و` at offset 32 versus inside `ووقت` at offset 65. `ووقت` and
`وقته ووقّع` are both correct Arabic. So the Arabic form can be neither inherited
form, and a naive `\s`-delimited rule would have to license them. That is a
constraint on the rule, not the rule.

**M9 and M10 are new to this list.** Neither is in `AR2-backlog.md`, because
AR-1 filed them as policy non-decisions (§2, §6) rather than as backlog items.
They become measurable at exactly the same moment as B-8b and B-11 and should be
measured in the same pass rather than rediscovered later.

---

## 3. The four-way separation

The single most common failure mode available to Track E is re-opening finished
engineering because a content problem looks like an instrument problem. This
table is the boundary.

### 3.1 Engineering — **COMPLETE. Track E writes no gate code.**

| Layer | Items | Landed |
|---|---|---|
| Presentation | B-5 carousel · B-6 arrows (gate 4o) · B-7 logical properties | Track B |
| Contract | B-3 `intl`/`hreflang` split (gate 4p) · B-4 switcher | Track C |
| Policy | B-9 4i arabic branch · B-8a 4h fail-closed dispatch · B-10b gate 4q | Track D |
| Direction / isolation | B-1 gate 4k · Track A gate 4n · B-2 bidi formatter | AR-2 early |

If Track E finds itself editing a `gate-4*.mjs`, that is a signal to stop and
re-read this table. The expected edits are to **`i18n-gates/*.json` config** and
to **content**, not to instruments.

### 3.2 Corpus creation

9 `.ar.mdx` files + 9 `AR_SLUGS` entries + the batch brief. This is the only
category that produces new prose, and it is gated by E-D1 and E-0 only.

### 3.3 Linguistic validation

Distinct from corpus creation, and **not** performed by the same pass:

- **Automated, per-file `en`↔`ar` count alignment** — the method that closed the
  German backlog. Totals decide nothing; per-file alignment decides terminology.
- **Native-speaker review** — still open, and open identically for `de`, `ja`,
  `zh` and (retroactively tagged) `es`, `it`. Nothing in AR-1 or AR-2 has been
  read by a native Arabic speaker. **This gates release, not the pilot**, and the
  pilot is the first artifact small enough to be worth sending for review.

### 3.4 Instrumentation reuse

No new instrument. Two existing ones change state without changing code:

- **Gate 4n stops being prospective.** It has guarded one Arabic route with a
  near-zero same-flank population since it landed; its own header says a green run
  is *not* evidence it works. The pilot gives it a real population for the first
  time. `npm run test:4n` remains the thing that carries the evidential burden.
- **Gate 4q stops being vacuous.** Today it measures 0 digits over 4 254
  characters. After the pilot it measures translator-authored prose, which is the
  only place policy §3 can actually be violated by a human.

---

## 4. Milestones

### E-0 — Brief and pre-census *(no Arabic written)*

- Resolve **E-D1**.
- Re-census §1.1's table on **rendered visible text**, per file, from the English
  build. Record the predicted Arabic floors *before* translation, so the post-hoc
  measurement can falsify a prediction rather than confirm itself.
- Write the batch brief: the §1.6 frozen glossary, the gate 4b allow-list (today:
  `cancellation-policy` only — every other internal link keeps its English path),
  and the `<bdi>`-in-MDX requirement.
- **Exit:** brief exists, predictions recorded, zero repository content changed.

### E-1 — The single-file registration probe

One spoke, alone. Not a content milestone — an invariant check, and the cheapest
possible place to discover that a 3-segment Arabic route does something the
LTR locales never made it do.

- **Exit:** route delta exactly +1; all 11 gates exit 0; `ar` populations move in
  4n, 4o and 4q, and the new figures are recorded. Gate 4q's `ar` character count
  must move — if it does not, the page is not being traversed and the run is an
  instrument failure, not a clean result.

### E-2 — The remaining 8 spokes

- **Exit:** §1.5 A1–A12 all green, including the re-measured 4i floors (A8) and
  the 4m re-baseline (A11).

### E-3 — **B-8b**: the Arabic seam rule

Corpus-derived, from M1–M3. The deliverable is an `i18n-gates/4h-seams.json` `ar`
block — a connective list and a matcher form — plus the census that justifies each
entry. It is legitimate for this milestone to conclude **"Arabic has no seam
hazard at this corpus size"** and leave `locks: []` with a recorded measurement;
that is a closed item, not a deferred one, and it is a materially different state
from today's *unspecifiable*.

- **Exit:** either a populated `ar` seam config with a per-entry census, or a
  recorded null result with the counts that support it.

### E-4 — **B-11**: proper-noun drift in body prose

Corpus-derived, from M4. The deliverable is a set of §4.2 wayfinding locks in
`i18n-gates/4i-glossary.json` with **census-measured floors**, closing the surface
gate 4g cannot see (4g scans anchor text; a transliterated name in body prose is
not an anchor).

⚠ **A consequence of D-1 that E-4 inherits and would otherwise trip on:** these
locks are **Latin phrases under `script: "arabic"`**. D-1 made exactly that
combination a registry failure (exit 2) unless the lock is marked `latinLock`.
So every B-11 wayfinding lock must carry `latinLock`, and the two locks that
already exist (`أرض الديناصورات`, `المسارات`) must not — they are genuinely
Arabic. Getting this wrong fails the build immediately and names the lock, which
is the gate working; knowing it in advance is why this line is here.

### E-5 — Decision point

Not "expand to 57/57 automatically." The pilot exists to produce evidence that
could change the plan: a 4c challenge that reverses a policy decision, an M9
register finding, or an M8 isolation rate that says the brief is insufficient.

- **Exit:** either §7 stage 2 batches 2–9 proceed under an unchanged brief, or a
  named policy revision with a 9-file sweep — which is the entire reason the pilot
  is 9 files and not 57.

### 4.1 Track D gates as positive controls, not implementation work

This is the section that keeps E-3 and E-4 from re-doing Track D.

| Item | The gate | What it already does | Its role in Track E |
|---|---|---|---|
| **B-8b** | **4h** (B-8a, `5c09e4a`) | `CONNECTIVE_FORMS` lookup + config-time guard: a script that declares connectives but has no form of its own exits 2 naming itself | **Positive control.** The day E-3 adds the first Arabic connective, the gate either accepts a declared `arabic` form or refuses to guess. E-3 writes *config*; the dispatch is done. No re-audit of the dispatcher is needed first — that was B-8a's stated purpose. **Falsifier to run at the moment of population:** add the connective while removing `arabic` from `CONNECTIVE_FORMS` → must exit 2. |
| **B-11** | **4i** (B-9, `a9b3e40`) | Fourth branch beside latin/han/japanese: an `arabic` lock whose phrase carries no Arabic character and is not `latinLock` is a registry failure | **Positive control.** E-4 writes lock entries and floors; the validation branch exists and has been enforcing 2 locks since AR-1. **Falsifier:** a `Vernal` lock without `latinLock` → exit 2 naming the lock. |
| policy §3 | **4q** (B-10b, D-3) | Forbidden-range scan over U+0660–U+0669 and U+06F0–U+06F9 on extracted visible text, all nine locales; exit 2 if a registered locale renders no page | **Acceptance instrument** for A7 — and its fail-closed-on-absence is what stops a pilot that silently dropped routes from reporting better than one that kept them. |
| B-10a | **4p** (Track C, `8e9f951`) | Registry-side: every locale's `intl` tag resolves to `latn` | **Unaffected by corpus.** Listed so it is not re-opened; a numeral defect found in the pilot is 4q's, not 4p's. |
| B-1 / Track A | **4k**, **4n** | direction integrity; ADR-10 isolation | 4k stays retrospective and covers the new routes automatically. **4n transitions from prospective to live** (§3.4) — the only instrument whose *meaning* changes, with no code change. |

---

## 5. What Track E does not close

Listed so their survival is deliberate.

- **B-12** — `SITE.hoursDisplay` English in all nine locales. Pre-existing,
  corpus-wide, a nine-locale change and the owner's call. Arabic prose does not
  make it worse or better.
- **B-13** — `404.astro:36` hardcodes `Information ▾` outside `t()`. Also:
  `404.astro` bypasses the bidi formatter entirely and gate 4n cannot see it,
  because **no `/ar/404` route exists** — and the pilot does not create one.
- **The 5 `decide-promo-anchor` declarations** (B-7 §2) — an explicit product
  decision the owner deferred, not an RTL defect.
- **The 4i latin-branch mirror case** — a Latin-script locale carrying an *Arabic*
  phrase is not caught. Found by D-1, zero live instances (measured across all
  five Latin locales), deliberately left.
- **Native-speaker review** — §3.3. Gates release for `ar` exactly as it does for
  `de`, `ja`, `zh`.
- **`/ar/` homepage, the 20 inline pages, and the gallery.** §7 stage 4, not the
  pilot. `ar` stays in `GALLERY_EXEMPT`; removing that line is a homepage
  milestone, and `renderGallery('ar')` throws until a 105-slide `GALLERY_TEXT_AR`
  exists.

---

## 6. Acceptance for this document

- Every remaining Arabic task is tied to a corpus prerequisite: **B-8b → M1–M3**,
  **B-11 → M4**, the 4i floor re-measurement → M5, the Key Takeaways lock → M6
  (and E-D1). The items in §5 are tied to *no* corpus prerequisite, which is why
  they are listed as not closing.
- No Track D instrumentation is duplicated: §3.1 declares the engineering layer
  complete, §4.1 assigns every Track D gate a control role, and no milestone
  E-0…E-5 produces gate code.
- Track E begins from the measured baseline in §0 and a pilot defined in §1 —
  scope, count, deliverables, twelve acceptance criteria each bound to an existing
  instrument, and the glossary interaction.
