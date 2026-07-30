# AR-2 Track D brief — the corpus-gated gate items (B-8 · B-9 · B-10b)

**Method rules applied:** 1 (measurement precedes implementation) · 2
(inventories over-approximate; classification determines the work) · 5 (a
control that can fail) · 6 (separate the measurement from the thing measured) ·
8 (a recorded size is a hypothesis about the measurement window) · 13
(prevention or repair, stated) · 16 (corpus-dependent vs corpus-independent
verification)

**Status: BRIEF ONLY — no implementation begun.** Written 2026-07-30 from a
clean baseline: Track C closed at `9bca2ac`, working tree clean except
`.claude/settings.json` (harness-owned, not touched). Gates 4h/4i/4p verified
exit 0 before writing. Track C's artifacts are archived and are **not** modified
by this brief.

---

## 0. Selection — and a correction to the inherited record

Track C's brief closed by naming the remaining blockers as "B-8/B-9 before the
first Arabic glossary lock, B-10 before Arabic prose ships at volume." Rule 1
says that ordering is a hypothesis until measured. It was measured, and **one
half of it is false**.

### 0.1 The correction

Track C's selection table (`AR2-TrackC-brief.md` §0) recorded:

> B-9 — script validation for Arabic locks — ✘ **no Arabic lock exists** to
> exercise it — no test surface until the first lock.

Measured against the registry, not the record:

| registry | `ar` entry | locks | connectives |
|---|---|---|---|
| [`4h-seams.json`](../../i18n-gates/4h-seams.json) | `script: "arabic"`, `state: "in-progress"` | **0** | **0** |
| [`4i-glossary.json`](../../i18n-gates/4i-glossary.json) | `script: "arabic"` | **2** | n/a |

The two Arabic locks — `dinosaur-country` (`أرض الديناصورات`) and
`offroad-trail` (`المسارات`), both `bound: floor` — **landed at AR-1** and are
enforced today. The Track C brief conflated two different gates with two
different lock populations: 4h has none, 4i has two. The backlog itself (B-9)
never made this error; it says only that 4i has no `arabic` case, which is
correct — [`gate-4i-glossary.mjs:250-259`](../../scripts/gate-4i-glossary.mjs#L250-L259)
branches on `latin` / `han` / `japanese` and nothing else.

**Consequence:** B-9 has a live, unvalidated test surface *right now* and needs
zero corpus. It is not corpus-gated and never was.

### 0.2 The circularity the correction exposes

The recorded plan gates B-8 on "before the first Arabic lock is added" and gates
Arabic prose expansion on B-8/B-10. But B-8's substantive content — *does Arabic
have a seam hazard at the proclitic `و` or the assimilating article `ال`?* — is
a question the 4h config itself says "needs a corpus to answer." The corpus is
the prose expansion. **The plan gates prose on B-8 and B-8 on prose.**

Rule 16 breaks the cycle, and does so by naming these exact categories:

> Policy rules (numbering systems, script ranges) can ship before content.
> Census-derived rules (proper-noun drift) need a pilot batch first.

So the cycle is not a scheduling problem. It is a misclassification: the
corpus-independent policy half of each item was bundled with its census-derived
half and inherited the harder half's blocker.

## 1. Objective

Classify every remaining Arabic item by verification model, ship the
corpus-independent half of each, and leave exactly one genuine corpus
dependency standing — explicitly, as the trigger for Track E.

## 2. Classification under Rule 16

Each backlog item splits into a policy half and a census half. The split is the
finding; the table is the deliverable of task 1.

| id | sub-item | verification class | corpus needed | eligible now |
|---|---|---|---|---|
| **B-9** | `arabic` case in 4i script sanity | **policy** — script range, config-time | none (2 locks exercise it today) | ✔ **selected** |
| **B-10a** | machine-formatted numerals | **policy** — registry | n/a | ✔ **COMPLETE** (gate 4p, `8e9f951`) |
| **B-10b** | author-typed Arabic-Indic digits in prose | **policy** — character range, rendered | none to *build*; corpus only to make it *bite* | ✔ **selected** |
| **B-8a** | script→matcher dispatch fails closed | **instrumentation integrity** — corpus-independent | none | ✔ **selected** |
| **B-8b** | the Arabic seam rule (`و` proclitic, `ال` assimilation, connective list) | **corpus-dependent** — census-derived | **yes** | ✘ **blocked** |
| **B-11** | proper-noun drift in body prose | **corpus-dependent** — census-derived (Rule 16 names this case literally) | **yes** | ✘ **blocked** |

**Rendered vs. registry axis**, since the task asks for it explicitly: B-9 and
B-8a are *registry/config-time* (no `dist/` needed, run in `gates:src`). B-10b
is *rendered* (needs `dist/`, runs in `gates:dist`). B-10a was registry and is
done. B-8b would be rendered, once specifiable.

## 3. Answering task 3 — yes, B-10 splits cleanly

The split is already half-executed and the seam is real, not editorial:

- **B-10a (complete).** Gate 4p asserts every locale's `intl` tag resolves to
  numbering system `latn`, so `Intl`-formatted output (dates, numbers) cannot
  acquire Arabic-Indic digits via a registry edit. Enforced pre-build.
- **B-10b (this track).** A translator typing `٢٠٢٦` directly into a dictionary
  value is invisible to 4p — the string never passes through `Intl`. Only a
  rendered scan sees it.

They are different mechanisms at different layers with different failure modes,
and 4p's existence does not shrink B-10b's surface by one byte.

## 4. Scope

**In scope**

- [`scripts/gate-4i-glossary.mjs`](../../scripts/gate-4i-glossary.mjs) — an
  `arabic` case in the script-sanity block, alongside the existing three.
- [`scripts/gate-4h-seams.mjs:298-310`](../../scripts/gate-4h-seams.mjs#L298-L310)
  — the connective matcher's script dispatch made explicit and fail-closed.
- A rendered numeral scan (recommended `gate-4q-numeral-render.mjs`, see D3),
  wired into `gates:dist`.
- Closure edits to [`AR2-backlog.md`](AR2-backlog.md): B-9 and B-10 struck,
  B-8 rewritten as B-8a (closed) + B-8b (open, corpus-gated).

**Out of scope, by decision**

- **B-8b.** Not deferred for convenience — *unspecifiable*. Writing an Arabic
  connective list without a corpus produces config nothing measures, which is
  the F2 M-4 defect the 4h `$doc` already refuses by name.
- **B-11.** Same class. Rule 16 names proper-noun drift as its canonical
  census-derived example.
- **B-12 / B-13.** Owner's call, pre-existing, status unchanged.
- **Track C's artifacts.** Archived, not reopened.
- The `ar` 4h entry's `state: "in-progress"` marker stays as-is. It correctly
  describes B-8b's status and should not be flipped by B-8a landing.

## 5. Work items

### D-1 — B-9: the `arabic` script case

Add the fourth branch to
[`gate-4i-glossary.mjs:250-259`](../../scripts/gate-4i-glossary.mjs#L250-L259):
a lock under `script: "arabic"` whose phrase contains no Arabic-script
character, and is not marked `latinLock`, is a config failure.

Follow the `han`/`japanese` shape exactly (`!latinLock && !ARABIC.test(phrase)`)
rather than inventing a new one — the `latinLock` escape exists because some
locked identities are legitimately Latin in a non-Latin locale, and Arabic has
no reason to differ.

⚠ **Rule 13: this is prevention.** Both existing Arabic locks are *correct*
today. The proof burden is therefore the fail-closed matrix, not a green run.

### D-2 — B-8a: fail-closed dispatch

Today: `entry.script === 'latin' ? wordBoundaryForm : cjkForm`. Arabic — a
space-delimited script — silently takes the no-word-boundary CJK form.

The repair is **not** "add an Arabic branch," because that ships a matcher for a
connective list that does not exist (B-8b). The repair is to make the fallthrough
impossible: an `entry.script` the dispatcher does not have an explicit rule for,
*and* which declares connectives, exits as an instrument failure naming the
script — never silently picks a form.

This is Rule 5 applied to the gate itself: today the wrong branch is unreachable
because `ar` declares zero connectives, so the defect is latent. B-8a converts
"latent because the data is empty" into "structurally impossible" — which is
what makes it safe to populate that data later, in Track E, without re-auditing
the dispatcher.

⚠ **Prevention.** Zero live defects; `ar` connectives = 0, measured.

### D-3 — B-10b: the rendered numeral scan

Scan rendered text per locale for `[٠-٩۰-۹]` (Arabic-Indic + Eastern
Arabic-Indic).

**Two instrument constraints, both from measurement:**

1. **Rule 6 / the C7 lesson.** The scan must run on *extracted rendered text*
   using the existing 4h/4i extraction layer with `inlineSeparator: ''` — not a
   `grep` over `dist/`. Measured: the Arabic pilot page carries **465 ASCII
   digits** in markup, CSS and JSON-LD. A raw-HTML instrument measures the
   document, not the prose.
2. **Rule 14.** Print the per-locale table on success, so the certified fact is
   visible.
3. **Binaries are not text — measured, not assumed.** A naïve
   `grep -rlP '[٠-٩۰-۹]' dist/` returns **224 files**, every one of them an
   image (208 `.webp`, 9 `.jpg`, 5 `.png`, 1 `.jpeg`, 1 `.ico`) matching on
   compressed bytes. Restricted to text extensions the count is **0**. This is
   constraint 1's trap arriving from a second direction: the file walk must be
   confined to the rendered-text surface, or the instrument reports a 224-file
   defect that does not exist.

**Measured baseline:** `[٠-٩۰-۹]` occurs in **0 text files across all of
`dist/`** (all nine locales, build of 12:39; re-verified 2026-07-30). So:

⚠ **Rule 13: prevention, and Rule 8 on top of it.** A floor derived from today's
corpus would be a floor of 0 — "a lock that can never fail," the exact defect
the 4i `$doc` records against the `Key Takeaways` lock. B-10b must therefore be
a **forbidden-range** check (any occurrence fails), never a counted floor. The
`0` is the current measurement window's answer, not the rule's parameter.

## 6. The prerequisite corpus artifact — task 2, explicitly

**It is not a glossary lock, and it is not a terminology lock.** Both already
exist for Arabic: 2 locks in 4i (AR-1), and the AR-1 policy §4 identity
decisions behind them.

**The binding artifact is an Arabic prose pilot batch.**

| | measured, 2026-07-30 |
|---|---|
| Arabic rendered routes | **1** (`dist/ar/cancellation-policy/`, 27 KB) |
| every other locale | 77 routes |
| Arabic connected prose available to census | one policy page |

B-8b and B-11 are census-derived: each needs a floor measured against connected
prose, and one policy page cannot produce a floor that means anything. **No
milestone in this brief begins before its corpus exists — and none of D-1/D-2/
D-3 has a corpus prerequisite at all.** The corpus prerequisite binds only the
two items this brief explicitly declines to start.

The pilot batch is `MULTILINGUAL_HANDOFF.md` §7 stage 2 for `ar`, i.e. **Track
E**. Track D exists precisely so that Track E can run: after D-1/D-2/D-3, the
policy layer is closed and the pilot batch is no longer gated on gate work.

## 7. Acceptance criteria

**Rule 13, stated up front: all three items are prevention.** Zero live defects
across all three surfaces, measured (0 Arabic-Indic digits in `dist/`; 0 `ar`
connectives; both `ar` locks currently correct). Proof burden is the fail-closed
matrix in every case, and a green run proves nothing on its own.

### D-1 (B-9)

1. Fail-closed matrix, each perturbation transient and restored:
   - `ar` lock phrase → `"Dinosaur Country"` (Latin, no `latinLock`) → exit 1,
     message naming lock · locale · script ✘
   - same phrase → `"恐龙之乡"` (Han under `arabic`) → exit 1 ✘
   - same phrase + `latinLock: true` → exit 0 ✔ (the escape still works)
   - unperturbed registry → exit 0, both Arabic locks validated ✔
2. The other eight locales' figures unchanged — this adds a branch, it does not
   touch `latin`/`han`/`japanese`.

### D-2 (B-8a)

1. Fail-closed matrix:
   - `ar` given one connective, dispatcher unpatched → demonstrates the CJK-form
     match on space-delimited text (the defect, reproduced before repair — Rule 4:
     a negative finding needs a positive under comparable conditions)
   - same, dispatcher patched → **instrument-failure exit** naming `arabic`,
     distinct from a seam violation ✘
   - `ar` with zero connectives (the real registry) → exit 0 ✔
2. `zh`/`ja` (cjk) and the five Latin locales: seam counts **byte-identical** to
   the pre-change run. Any movement means the dispatch change altered a reachable
   path and the prediction was wrong — stop and explain.

### D-3 (B-10b)

1. Fail-closed matrix: inject `٢٠٢٦` into one `ar` dictionary value → exit 1
   naming locale · route · the offending string ✘; injected into a `de` value →
   also exit 1 (the rule is per-locale, not Arabic-only, per D-4); removed →
   exit 0 with the nine-row table printed ✔.
2. **Instrument control (Rule 5), two directions:**
   - the scan must **find** an injected digit inside inline markup
     (`<strong>٢٠٢٦</strong>`) — the C7 trap; a scan that misses it is
     measuring the wrong text;
   - the scan must **not** report the 224 image files a raw byte walk hits
     (§D-3 constraint 3). Both halves must be shown, not asserted.
3. Rendered-population reconciliation: the scan's route count equals the
   registered route count per locale, reported per locale, not asserted.
4. Baseline re-measured on the unperturbed tree: **0 occurrences, 9 locales** —
   recorded as the measurement window's answer, with the window (1 `ar` route)
   stated beside it per Rule 8.

### Whole-track

- `dist/` byte-identical before/after D-1 and D-2 (both are `gates:src`,
  pre-build, and change no rendered byte). D-3 adds a gate and no source.
  Non-empty diff ⇒ prediction wrong, stop.
- Rule 9: the differential contains only files the change explains. Any foreign
  file (the `k` bot, a parallel workstream) voids the run.
- `astro check` 0 errors; full suite green with every gate's figures unchanged.

## 8. Instrumentation needs

**One new permanent verifier (D-3's gate) and no temporary instruments.** No
browser, no `probe.mjs`, no detached worktree — every fact above is either a
build-time exit or a rendered-text scan. Recorded explicitly as the
contract/policy-layer contrast to B-5b, so nobody reaches for the heavy
instrument out of habit.

D-2's "reproduce the defect first" step needs a transient connective injected
into `4h-seams.json`. That is a config perturbation restored in the same step,
not a repository-invariant violation — **Rule 17's worktree discriminator does
not fire** (it would not be a production defect if pushed; it would be a failing
gate).

## 9. Deliverables

1. `scripts/gate-4i-glossary.mjs` — the `arabic` case (D-1).
2. `scripts/gate-4h-seams.mjs` — fail-closed dispatch (D-2).
3. `scripts/gate-4q-numeral-render.mjs` + `package.json` wiring (D-3, name per D3).
4. Phase report `docs/rtl/AR2-TrackD-policy-gates.md` with the METHOD citation
   header, all three fail-closed matrices, and the D-3 baseline table.
5. Closure edits to `AR2-backlog.md`: B-9 and B-10 struck; **B-8 rewritten as
   B-8a (closed) / B-8b (open, corpus-gated)**; the §7 status note's blocker
   list reduced to B-8b + B-11, both explicitly re-pointed at the pilot batch.
6. A recorded correction note in `AR2-backlog.md` capturing §0.1 — that the two
   4i Arabic locks predate AR-2 — so the next sweep does not re-inherit "no
   Arabic lock exists."

## 10. Repository readiness — verified 2026-07-30

- **Baseline green, measured not assumed:** `gate-4h` exit 0, `gate-4i` exit 0,
  `gate-4p` exit 0.
- **Track C introduced no prerequisites for Track D.** Track C's four files
  (`i18n.ts`, `LanguageSwitcher.astro`, `ui.ts`, `gate-4p-*.mjs`) have zero
  overlap with Track D's three (`gate-4h-*.mjs`, `gate-4i-*.mjs`, a new gate).
- **Gate letters re-read from the authority** (`package.json`, per the recorded
  drift warning — the handoff tables are hand-maintained and drift): `4l` remains
  reserved by the V-1 brief and unbuilt; `4p` is taken by Track C; **`4q` is the
  next free letter.**
- **Working tree:** clean except `.claude/settings.json` (harness-owned;
  reported, not touched).
- **`dist/` freshness:** built 12:39 against the current tree; the D-3 baseline
  figures above were measured on it.

## 11. Decisions open before implementation

- **D1 — does B-9 land now?** The record says it is corpus-gated; §0.1 shows it
  is not, and that two unvalidated locks sit in the registry today.
  **Recommendation: land it in Track D.** It is one branch in a block that
  already has three, it has a live test surface, and leaving it means the next
  Arabic lock — the one Track E will add — is filed with no script validation at
  the moment it is most likely to be wrong.
- **D2 — is B-8a's fail-closed dispatch acceptable in place of an Arabic
  branch?** **Recommendation: yes.** An Arabic connective branch now would be a
  matcher for an empty list — config nothing measures. Fail-closed dispatch is
  the falsifiable half, and it is what makes populating the list in Track E safe.
- **D3 — B-10b's locale scope: `ar` only, or all nine?** **Recommendation: all
  nine.** A numbering-system rule is not Arabic-specific — the Eastern
  Arabic-Indic range `[۰-۹]` is Persian/Urdu, and a future locale would inherit
  the check for free. Cost is identical; the scan already walks every route.
  If the owner wants AR-2 scope held strictly, `ar`-only is defensible and the
  widening becomes a separate item.
- **D4 — the Track E trigger.** Track D closes the policy layer and leaves B-8b
  and B-11 standing on one prerequisite: an Arabic prose pilot batch (§6). Does
  the owner authorize `MULTILINGUAL_HANDOFF.md` §7 stage 2 for `ar` as Track E
  once Track D lands? **This is the decision that actually unblocks Arabic** —
  D-1/D-2/D-3 are cheap and none of them moves the corpus.
