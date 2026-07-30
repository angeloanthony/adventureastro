# AR-2 Track D — the policy-layer gates (D-1 · D-2 · D-3)

**Method rules applied:** 1 (measurement precedes implementation) · 4 (a negative
finding needs a positive under comparable conditions) · 5 (a control that can
fail) · 6 (separate the measurement from the thing measured) · 8 (a recorded
size is a hypothesis about the measurement window) · 9 (the differential
contains only files the change explains) · 13 (prevention or repair, stated)

**Planning baseline:** [`AR2-TrackD-brief.md`](AR2-TrackD-brief.md) at `f2ade7a`;
owner decisions at `7011032`. Working tree clean at both.

**Status: D-1 CLOSED. D-2 and D-3 not begun.** This document is the phase report
for the whole track and is appended to as each item lands.

---

## D-1 — B-9: the `arabic` script case in gate 4i

### 1. The change

Two lines of predicate and one constant, in
[`scripts/gate-4i-glossary.mjs`](../../scripts/gate-4i-glossary.mjs):

```js
const ARABIC = /\p{Script=Arabic}/u;                      // beside HAN / KANA / CJK
...
if (entry.script === 'arabic' && !latinLock && !ARABIC.test(lock.phrase)) {
  cfgFail(loc, `lock "${id}" phrase "${lock.phrase}" contains no Arabic characters and is not marked "latinLock" — the phrase is filed under the wrong locale.`);
}
```

It follows the `han`/`japanese` shape exactly, reads the same `latinLock` that
is resolved once above all four branches, and reports through the same
`cfgFail` sink. No existing branch, constant, control-flow path or message was
touched. `entry.script` is read at exactly four sites in the gate — lines
252/255/258/261 — and nowhere else; that fact is measured and is load-bearing
for §3 below.

**Rule 13 — this is prevention.** Both `ar` locks (`dinosaur-country`,
`offroad-trail`) are correct today and were correct before the change. A green
run therefore proves nothing, and the proof burden is the matrix in §2.

### 2. The fail-closed matrix

Every case perturbs [`i18n-gates/4i-glossary.json`](../../i18n-gates/4i-glossary.json)
transiently and restores it from the original buffer in a `finally`. Each case
was run through **two arms** — the patched gate and an unpatched copy of the
gate at `HEAD` — so that every reported line is attributable to the new branch
and not to a pre-existing check firing on the perturbation (Rule 4: the
negative finding needs a positive under comparable conditions).

`ADDED` below means *present in the patched arm and absent from the unpatched
arm*, i.e. contributed by the Arabic branch alone.

#### Part 1 — perturbing the locked phrase

| # | perturbation | exit (patched) | exit (control) | ADDED by branch | REMOVED |
|---|---|---|---|---|---|
| 1 | `ar` phrase → `"Dinosaur Country"`, no `latinLock` | **2** | 2 | **1** ✘ | 0 |
| 2 | `ar` phrase → `"恐龙之乡"`, no `latinLock` | **2** | 2 | **1** ✘ | 0 |
| 3 | `ar` phrase → `"Dinosaur Country"` + `latinLock: true` | 2 | 2 | **0** ✔ | 0 |
| 4 | unperturbed registry | **0** ✔ | 0 | 0 | 0 |

Case 1's added line, in full:

```
[ar] lock "dinosaur-country" phrase "Dinosaur Country" contains no Arabic
characters and is not marked "latinLock" — the phrase is filed under the wrong locale.
```

Locale (`[ar]`), lock id (`dinosaur-country`), offending phrase and the escape
that would license it are all named, per the acceptance criterion.

#### The Rule 8 correction — case 3 does not exit 0, and the reason matters

The brief predicted case 3 → **exit 0**. Measured: **exit 2**, with the script
violation correctly **absent**. The residual error is a *different, pre-existing
check*, identical in both arms:

```
[ar] lock "dinosaur-country" at census/phrase-count.json carries no phrase-count
fact for {"locale":"ar","phrase":"Dinosaur Country","surface":"prose"} — …
```

The census phrase set is derived from the registry, so **any** substituted
phrase is unmeasured by construction. Cases 1–3 therefore each carry exactly
one residual census error in both arms, and the exit code of a phrase
perturbation can never reach 0 regardless of what the script branch does.

Per Rule 8, the brief's `exit 0` was a hypothesis about a measurement window
that omitted the registry→census coupling. The differential still answers the
question the case was asked to answer — the branch adds one error without
`latinLock` and zero with it, so the escape holds — but the exit code was the
wrong instrument, and Rule 6 says the fix is to change the perturbation, not to
reinterpret the number.

#### Part 2 — perturbing the declared script, which decouples the census

Because `entry.script` is read only by the four script-sanity branches,
flipping a **Latin locale's declared script** exercises the identical predicate
with every phrase left in place and every census fact intact.

`de` was chosen: `script: "latin"`, **9** locks, **2** of which already carry
`latinLock: true`.

| # | perturbation | exit (patched) | exit (control) | ADDED by branch |
|---|---|---|---|---|
| 5 | `de.script` → `"arabic"` | **2** ✘ | **0** | **7** |
| 6 | `de.script` → `"arabic"` + `latinLock: true` on all 9 locks | **0** ✔ | 0 | 0 |
| 7 | `de` restored (semantic re-serialisation) | **0** ✔ | 0 | 0 |

Two findings here carry the weight of the milestone:

- **Case 5 is the prevention claim, demonstrated.** The unpatched control exits
  **0** — a locale misfiled under `script: "arabic"` passes silently today, with
  nine locks unvalidated. The patched gate exits **2**. That is the defect class
  D-1 exists to make impossible, shown failing before and failing loudly after.
  This is Rule 5: a control that can fail, and did.
- **7 added, not 9.** The two `de` locks that already declare `latinLock: true`
  are silently exempted. The escape was not asserted from the code — it was
  *counted*, and the count is exactly `9 − 2`.
- **Case 6 supplies the exit 0 the brief predicted**, on a perturbation that has
  no census coupling: nine Latin phrases under `script: "arabic"`, all
  `latinLock`, gate exits 0 and the full rendered phase runs to completion.

#### Part 3 — instrument failure stays distinct from policy failure

gate-4i has two exit classes: **2** = registry/instrument inconsistency (the
config-error sink `cfgFail` feeds, where D-1's branch reports), **1** = a
glossary lock violation against the rendered corpus.

| # | perturbation | exit (patched) | exit (control) | patched vs control output |
|---|---|---|---|---|
| 8 | `ar` anchor `nav.trails.contains` → `"المساراتXX"` | **1** | **1** | **byte-identical** |

Case 8 keeps the string in Arabic script and touches an anchor, not a
`lock.phrase`, so the new branch is not reached. The gate reports
`1 glossary lock violation(s) — anchor 1` and exits **1**. The two channels
remain separate after D-1, and the patched and unpatched outputs on the policy
path are byte-identical — D-1 contributes nothing to the exit-1 surface.

### 3. Existing behaviour unchanged

- **Unperturbed gate output is byte-identical to the pre-change baseline**
  (`cmp`, not eyeballed): `52 glossary locks across 8 locales verified on 540
  rendered pages (20 dictionary anchors intact) — 3 advisory lock(s) reported`.
- `latin` / `han` / `japanese` branches, the `latinLock` read, `cfgFail`, and
  the exit-code contract are untouched — verified by diff, one hunk of three
  added lines plus one added constant.
- The three IDE hints in this file (`readFileSync`, `LOCALE_CODES`,
  `DEFAULT_LOCALE` unused, lines 28/156/157) are **pre-existing and were left
  alone** — cleaning them would be exactly the scope broadening the brief
  forbids.

### 4. The rendering prediction — measured, not assumed

Predicted: D-1 is a `gates:dist` *script* change, is never read by
`astro build`, and changes no rendered byte.

| check | method | result |
|---|---|---|
| `dist/` unchanged | sha256 of all **815** files, sorted, before vs after a full `npm run build` | **byte-identical**, 815/815 |
| `astro check` | full run | **0 errors**, 0 warnings, 268 hints (pre-existing) |
| full suite | `npm run build` = `gates:src` + `astro build` + `gates:dist` | **exit 0**, every gate's figures unchanged |
| D-3 baseline | `[٠-٩۰-۹]` over `dist/`, text extensions only | **0 occurrences, 9 locales — unchanged** |

**D-3 baseline table (post-D-1), with its window stated (Rule 8):**

| locale | text files | `[٠-٩۰-۹]` occurrences |
|---|---|---|
| en | 99 | 0 |
| es | 77 | 0 |
| it | 77 | 0 |
| pt | 77 | 0 |
| fr | 77 | 0 |
| de | 77 | 0 |
| ja | 77 | 0 |
| zh | 77 | 0 |
| **ar** | **1** | **0** |
| **total** | **639** (224 binaries skipped) | **0** |

Two notes on this measurement, both required to read it correctly:

1. **The `0` is the window's answer, not a rule parameter.** The `ar` window is
   **one** route against 77 for every other locale. The brief's forbidden-range
   constraint stands: D-3 must never derive a counted floor from this figure.
2. **The instrument is a deliberate over-approximation.** It scans raw text-file
   bytes, which is a strict *superset* of extracted rendered prose, so `0` here
   implies `0` in prose — the C7 trap is avoided in the safe direction. It is
   **not** the D-3 gate and was not committed; D-3 still owes the extraction-layer
   instrument. The `224` binaries it skips reproduces the brief's measured figure
   exactly, independently confirming §D-3 constraint 3.
3. **Both regexes were control-tested before use** (Rule 5): `\p{Script=Arabic}`
   returns `true` on `أرض الديناصورات` and `false` on both `Dinosaur Country`
   and `恐龙之乡`; `[٠-٩۰-۹]` counts 4 in `<strong>٢٠٢٦</strong>` and 0 in `2026`.

### 5. Rule 9 — the differential

One tracked file changed: `scripts/gate-4i-glossary.mjs`. The transient
unpatched control copy (`scripts/_tmp-4i-unpatched.mjs`) was deleted and
`git status` confirmed clean before staging. No registry, dictionary, `src/` or
`dist/` file appears in the differential; no foreign file appears in it.

### 6. Observation recorded, deliberately not implemented

The `latin` branch guards only against CJK (`entry.script === 'latin' &&
CJK.test(phrase)`). A Latin-script locale carrying an **Arabic** phrase is
therefore not caught — the mirror of the case D-1 just closed. This is a
pre-existing asymmetry, it has zero live instances (measured: all five Latin
locales' phrases are Latin), and fixing it is not in D-1's work list. Recorded
here so the track-close backlog edit can file it; **not implemented.**

### 7. Acceptance — D-1

- ✔ Fail-closed matrix demonstrated, both directions, every case differentially
  attributed against an unpatched control arm.
- ✔ Valid Arabic locks pass (case 4, exit 0, output byte-identical to baseline).
- ✔ Invalid Arabic locks fail with the expected violation naming locale, lock
  and escape (cases 1, 2, 5).
- ✔ The `latinLock` escape holds, counted rather than asserted (cases 3, 5, 6).
- ✔ Instrument failure (exit 2) stays distinct from policy failure (exit 1),
  and the policy path is byte-identical patched vs unpatched (case 8).
- ✔ Latin/Han/Japanese behaviour unchanged; other eight locales' figures
  unchanged.
- ✔ No rendered-byte change: 815/815 `dist/` hashes identical after a full build.
- ✔ D-3 baseline re-measured post-D-1: 0 occurrences across 9 locales, window
  stated.
- ✔ Rule 8 correction to the brief's case-3 prediction recorded with the
  measurement that produced it.

**D-2 (B-8a, `gate-4h-seams.mjs`) is next, per the fixed order in
[`AR2-TrackD-decisions.md`](AR2-TrackD-decisions.md) §6.**
