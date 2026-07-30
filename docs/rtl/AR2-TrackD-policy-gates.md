# AR-2 Track D — the policy-layer gates (D-1 · D-2 · D-3)

**Method rules applied:** 1 (measurement precedes implementation) · 4 (a negative
finding needs a positive under comparable conditions) · 5 (a control that can
fail) · 6 (separate the measurement from the thing measured) · 8 (a recorded
size is a hypothesis about the measurement window) · 9 (the differential
contains only files the change explains) · 13 (prevention or repair, stated)

**Planning baseline:** [`AR2-TrackD-brief.md`](AR2-TrackD-brief.md) at `f2ade7a`;
owner decisions at `7011032`. Working tree clean at both.

**Status: D-1 CLOSED. D-2 CLOSED. D-3 CLOSED — the track is closed.** This
document is the phase report for the whole track and was appended to as each
item landed.

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

---

## D-2 — B-8a: fail-closed dispatch in gate 4h

### 1. The change

One lookup table and one config-time guard, in
[`scripts/gate-4h-seams.mjs`](../../scripts/gate-4h-seams.mjs) — 47 insertions,
5 deletions, one file.

```js
const CONNECTIVE_FORMS = {                                       // lines 167-173
  latin: (c) => new RegExp(`(?<![\\p{L}\\p{N}_])(${escapeRe(c)})\\s+\\1(?![\\p{L}\\p{N}_])`, 'giu'),
  cjk:   (c) => new RegExp(`(${escapeRe(c)})\\1`, 'g'),
};

for (const loc of TARGETS) {                                     // lines 175-189
  const entry = config.locales[loc];
  if (!entry.connectives?.length) continue;   // rule D never runs; no form is ever selected
  if (CONNECTIVE_FORMS[entry.script]) continue;
  console.error(`gate-4h: locale "${loc}" declares script "${entry.script}" and … `);
  process.exit(2);
}
...
const re = CONNECTIVE_FORMS[entry.script](c);                    // line 348, was the ternary
```

**Both regex bodies are transcribed unchanged** — the `latin` form and the `cjk`
form are the same strings the ternary built, moved without edit. That is why §4
can assert byte-identical diagnostics rather than argue for them.

`entry.script` is now read at exactly two executable sites — line 178 (the
guard) and line 348 (the lookup) — and both are the dispatch. Before the change
it was read at one. That is measured, and it is what bounds §4's blast radius.

**Rule 13 — this is prevention.** `ar` declares **0** connectives, so the wrong
branch is unreachable on today's registry. B-8a converts *latent because the
data is empty* into *structurally impossible*, which is what makes Track E safe
to populate that list without re-auditing the dispatcher.

### 2. The defect, reproduced before repair (Rule 4)

The brief asked for the CJK-form match on space-delimited text to be
demonstrated. It is, and the demonstration is sharper than the prediction: **the
wrong form does not change the number of findings, it changes which text is
found.** That is why the defect was invisible.

A scratch corpus was rendered into
`scratch-dist/{ar,de}/pilot/index.html` with **byte-identical prose** in both
files (verified by `diff` after neutralising the `lang`/`dir` attributes), and
the gate was pointed at it through its own dist positional. The prose carries
one of each hazard:

- `المسار و و الطريق` — a genuine immediately-repeated conjunction (a real seam defect)
- `ووقت الانطلاق` — the proclitic conjunction `و` on a word that *begins* with `و` (correct Arabic)

Both forms were then measured against the gate's own extractor, at offsets
rather than by reading snippet padding:

| corpus | `latin` form (word-boundary) | `cjk` form (adjacency) |
|---|---|---|
| scratch `ar/pilot` | **1** at offset 32 — `"و و"` ✔ the real defect | **1** at offset 65 — `"وو"` ✘ inside `ووقت` |
| real `ar/cancellation-policy` | **0** | **1** at offset 2884 — `"وو"` inside `وقته ووقّع` |
| real `de` corpus (77 pages × 5 connectives) | **0** | **0** |

Three findings, in order of weight:

- **The counts collide; the matches are disjoint.** On identical text, both
  forms report exactly one violation — at *different offsets*, on *different
  strings*, one correct and one not. Any instrument comparing totals would have
  called this unchanged. The defect is only visible at the offset.
- **The false positive is live on shipped prose.** Case 5 runs the real
  registry-perturbation against the real corpus: given one connective, the
  unpatched dispatcher reports `وقته ووقّع` on
  `/ar/cancellation-policy/` as a duplicated connective. It is not — it is `و` +
  `وقّع`, one conjunction and one verb. On the only connected Arabic prose that
  exists today, the fallthrough form's *entire output is a false positive* and
  the correct form's output is empty.
- **A misfiled Latin locale degrades silently and unobservably.** Both forms
  return 0 across the whole German corpus, so case 7's unpatched control exits
  **0** with the baseline success line. That exit code is not evidence German is
  healthy; it is evidence that the check was swapped for a different question
  and *nothing in the output could show it*. This is the ja UI-chrome fail-open
  shape the gate's own header cites, arriving through the dispatcher.

### 3. The fail-closed matrix

Every case perturbs [`i18n-gates/4h-seams.json`](../../i18n-gates/4h-seams.json)
transiently and restores it from the original buffer in a `finally`. Each ran
through **two arms** — the patched gate and an unpatched copy at `a9b3e40` — so
every line is attributable to the dispatch change and not to a pre-existing
check firing on the perturbation.

| # | corpus | perturbation | control | patched | verdict |
|---|---|---|---|---|---|
| 1 | real | none | 0 | **0** | byte-identical ✔ |
| 2 | scratch | none (`ar` has 0 connectives) | 0 | **0** | ✔ |
| 3 | scratch | `و` as a connective under **both** `ar` (arabic) **and** `de` (latin) | **1** — two findings at disjoint offsets | **2** ✘ | the defect, then the refusal |
| 4 | scratch | `و` under `ar` alone | **1** — the false positive | **2** ✘ | ✔ |
| 5 | real | `و` under `ar` alone | **1** — false positive on a live route | **2** ✘ | ✔ |
| 6 | scratch | `و` under `ar` **declared `cjk`** (a registered script) | **1** | **1** | byte-identical ✔ |
| 7 | real | `de.script` → `"arabic"`, 5 connectives | **0** — silent | **2** ✘ | ✔ |
| 8 | real | `ar` explicitly 0 connectives (today) | 0 | **0** | guard correctly silent ✔ |

The instrument-failure line in full (case 5):

```
gate-4h: locale "ar" declares script "arabic" and 1 connective(s), but this gate has a
connective matcher only for "latin" and "cjk". Refusing to select one by fallthrough: the
word-boundary form and the adjacency form answer different questions, so borrowing one
reports a wrong answer instead of failing. Add an explicit "arabic" form to
CONNECTIVE_FORMS, or remove the connectives from i18n-gates/4h-seams.json.
```

Locale, declared script, connective count, both known forms, and the two ways
out are all named.

**Cases 6 and 8 are the controls that keep the guard honest.** Case 6 gives `ar`
a connective under a *registered* script: the guard must not fire, and both arms
produce byte-identical output including the same seam finding. Case 8 is today's
registry made explicit: `script: "arabic"` with zero connectives, guard silent,
exit 0. Without these two, "the guard fires" would be indistinguishable from
"the guard fires on everything."

**Instrument failure stays distinct from policy failure.** gate-4h's exit
classes are unchanged and the new guard reports through the existing exit-2
channel: **2** = registry/instrument inconsistency, **1** = a seam violation
against the rendered corpus, **0** = clean. Case 3 is the pair in one run — the
control exits **1** (it answers, wrongly), the patched arm exits **2** (it
refuses to answer). Cases 6 and 8 confirm the exit-1 and exit-0 surfaces are
untouched.

### 4. Existing behaviour unchanged

Byte-identity was compared on the full `EXIT / STDOUT / STDERR` capture, patched
vs control, not on the summary line:

| # | scenario | result |
|---|---|---|
| 1 | real corpus, unperturbed registry | **byte-identical** (123 bytes) |
| 6 | `ar` + connective under registered script `cjk`, scratch corpus | **byte-identical** (934 bytes) |
| 8 | `ar` arabic + 0 connectives, real corpus | **byte-identical** (123 bytes) |

`zh`/`ja` (cjk) and the five Latin locales are covered by cases 1 and 8, which
scan all 540 pages across 8 locales: `gate-4h: ✔ 540 rendered pages across 8
locales, 1922 locked phrases — no seam violations`, identical to the pre-change
baseline. Rules A, B and C, the census/drift block, the reporting block and the
exit-code contract were not touched.

### 5. The rendering prediction — measured, not assumed

| check | method | result |
|---|---|---|
| `dist/` unchanged | sha256 of every file under `dist/`, sorted by path, before vs after a full `npm run build` | **byte-identical, 863/863** |
| `astro check` | full run, control copy removed first | **0 errors, 0 warnings, 268 hints** |
| full suite | `npm run build` = `gates:src` + `astro build` + `gates:dist` | **exit 0** |
| D-3 baseline | `[٠-٩۰-۹]` over `dist/`, text files only | **0 occurrences, 9 locales — unchanged** |

Every gate's figures are unchanged from the D-1 close: 4j 840 entries · 4o 35
files · 4p 9 locales · validate-site 620 pages · 4m 32 pages/30 videos · 4k 620
pages/9 locales · 4n 1 rtl page · 4f 14404 headings · **4h 540 pages/1922 locked
phrases** · 4i 52 locks/540 pages/3 advisory · 4g 42777 anchors/85 candidates.

**D-3 baseline table (post-D-2), with its window stated (Rule 8):**

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

Identical to the post-D-1 table, row for row. The instrument's own control was
re-run rather than carried over (Rule 5): `[٠-٩۰-۹]` counts **4** in
`<strong>٢٠٢٦</strong>` and **0** in `2026`.

### 6. Two corrections to the recorded figures (Rule 8)

Neither changes an implementation. Both are cases of a recorded number whose
*measurement method* was not recorded alongside it.

**6.1 — `dist/` is 863 files, not 815.** The D-1 report records "815 files"
for the sha256 comparison. A full walk of `dist/` measures **863**, and the D-1
report's own D-3 table implies the same figure: 639 text + 224 binaries = 863.
The two numbers are in one document and cannot both describe the whole tree. The
extension census is `620 html · 208 webp · 13 svg · 9 jpg · 5 png · 2 xml · 2
txt · 1 jpeg · 1 ico · 1 css · 1 _redirects` = 863; unique hashes are 859 (four
duplicate files). No subset of the tree yields 815 — not by directory, not by
extension, not by hash-deduplication — so 815 was taken through a window whose
definition was not written down and is not now recoverable.

The claim D-1 was making is unaffected: `dist/` did not change. The lesson is
the recurring one — **a recorded size is a hypothesis about the measurement
window, and the window has to be recorded with it.** The method is stated
verbatim in §5 above so this figure is reproducible.

**6.2 — gate 4h and gate 4i run in `gates:dist`, not `gates:src`.** The brief §2
records "B-9 and B-8a are *registry/config-time* (no `dist/` needed, run in
`gates:src`)", and [`AR2-TrackD-decisions.md`](AR2-TrackD-decisions.md) §6
repeats "Also `gates:src`, pre-build" for D-2. Read from `package.json`, which
is the authority:

- `gates:src` = 4j · 4o · 4p
- `gates:dist` = validate-site · 4m · 4k · 4n · 4f · **4h** · **4i** · 4g

Both D-1 and D-2 modified `gates:dist` gates. The *checks* they added are
config-time — that part of the classification holds, and it is what the Rule 16
split turned on — but "no `dist/` needed" is false for the gates carrying them:
gate-4h exits 2 at line 101 when `dist/` is absent, and the new guard sits
*after* that check, so it inherits the requirement. Leaving the guard where it
is was deliberate (moving it would reorder existing error messages for no
B-8a-required gain), and it is recorded here rather than silently fixed.

**Consequence for D-3, which is the reason this matters:** the decisions doc
§6 justifies D-3's last position partly with "It is the only `gates:dist` item."
That premise is false — all three are. The *other* two reasons stand unchanged
and are sufficient: D-3 is the only item that adds a file and wiring, and its
baseline must be measured on a tree where D-1 and D-2 have landed. **The
ordering is unaffected; only one of its three stated reasons is withdrawn.**

### 7. Rule 9 — the differential, and an external commit inside the window

**An external commit intervened mid-milestone.** At 14:29 the auto-commit
process committed the working tree as `b78ff34` (message `k`, not authored by
the author — see the standing note on this process), capturing two files:

```
scripts/_tmp-4h-unpatched.mjs | 380 ++++++
scripts/gate-4h-seams.mjs     |  52 +++-
```

So the D-2 source change reached history under a message that does not describe
it, **and it took the transient control instrument with it.** Verified before
proceeding, and each of these is a measurement, not an assumption:

- **No perturbed registry was ever committed.** `git diff a9b3e40 HEAD --
  i18n-gates/ census/ src/` is empty. The transient injections in §3 were
  restored inside their `finally` before the auto-commit fired; had one been
  live at 14:29, a corrupted seam registry would now be in history.
- **`b78ff34` carries nothing else.** Two files, both explained by this
  milestone.
- **HEAD's gate is the reviewed gate.** `git diff HEAD -- scripts/gate-4h-seams.mjs`
  is empty.

History was **not** rewritten, consistent with the precedent set for `f2ade7a`
in [`AR2-TrackD-decisions.md`](AR2-TrackD-decisions.md); this section is the
discoverability repair. The D-2 commit removes `scripts/_tmp-4h-unpatched.mjs`,
which never belonged in the repository.

**The control copy also perturbed a measurement, which is worth recording.**
`astro check` reported **272** hints while the copy was on disk and **268** with
it removed — `tsconfig.json` includes `**/*`, so the duplicated gate contributed
its own four pre-existing unused-binding hints. The four-hint discrepancy was
not the change; it was the instrument. Rule 9 applies to instruments too, and
the temporary file was deleted before the figure in §5 was taken.

No registry, dictionary, census, `src/` or `dist/` file appears in the D-2
differential. No foreign file appears in it.

### 8. Recorded, deliberately not implemented

- **The `arabic` connective form itself.** Still B-8b, still corpus-gated, and
  the measurement in §2 is now the first hard evidence of what it will have to
  handle: the proclitic `و` fuses to the following word, so an Arabic form
  cannot be the Latin word-boundary form either. `ووقت` and `وقته ووقّع` are
  both correct prose that a naive `\s`-delimited rule would also have to
  license. That is a finding for Track E's rule design, not a rule.
- **The `ar` entry's `state: "in-progress"` marker** stays as-is. It describes
  B-8b, and B-8a landing does not flip it — brief §4, unchanged.

### 9. Acceptance — D-2

- ✔ Defect reproduced **before** repair, on both a scratch corpus and the live
  `ar` route, with the two forms' match offsets measured rather than inferred.
- ✔ Arabic dispatch now validated through the intended path: an unregistered
  script that declares connectives exits 2 naming the script, both known forms
  and both remedies.
- ✔ Existing script families byte-identical: `latin` and `cjk` diagnostics
  unchanged on three scenarios compared over the full output capture, and all
  540 pages across 8 locales report the pre-change figures.
- ✔ Instrument failure (exit 2) stays distinguishable from policy failure
  (exit 1) — demonstrated in a single run, case 3.
- ✔ Guard controls in both directions: silent for a registered script (case 6)
  and for a declared script with no connectives (case 8).
- ✔ Full suite green, `astro check` 0 errors / 0 warnings / 268 hints.
- ✔ No rendered-byte change: **863/863** `dist/` hashes identical after a full
  build.
- ✔ D-3 baseline re-measured post-D-2: **0 occurrences, 639 text files, 224
  binaries excluded, 9 locales** — unchanged, window stated.
- ✔ Two Rule 8 corrections recorded with the measurements that produced them.

**D-3 (B-10b, `gate-4q-numeral-render.mjs`) is next.** Its baseline is the table
in §5, and the platform under it is byte-identical to the one D-1 measured.

---

## D-3 — B-10b: the rendered numeral instrument (gate 4q)

### 1. The change

One new file and two lines of wiring.

- [`scripts/gate-4q-numeral-render.mjs`](../../scripts/gate-4q-numeral-render.mjs)
  — the production instrument.
- [`package.json`](../../package.json) — `gate:4q` beside the other per-gate
  entries, and `gate-4q-numeral-render.mjs` appended to `gates:dist`, **last**,
  after `gate-4g-anchors.mjs`.

No registry, dictionary, census, policy artifact, manifest or `src/` file was
touched. The gate declares its forbidden range in code, exactly as gate 4p
declares `latn` in code, and for the same reason: it is a policy constant with a
document citation, not a tunable, and a config file for it would be config with
one possible value.

```js
const FORBIDDEN = [
  { name: 'Arabic-Indic',          from: 0x0660, to: 0x0669 },
  { name: 'Extended Arabic-Indic', from: 0x06f0, to: 0x06f9 },
];
```

The ranges are written as code points rather than as the literal class
`[٠-٩۰-۹]`. That class is four RTL characters inside a left-to-right source
file, and a reviewer cannot tell by looking whether the two ranges are the ones
intended or whether an editor reordered them. This is the same reasoning that
put the code point beside the character in the violation report (§5).

**Rule 13 — this is prevention.** Zero occurrences exist in the corpus today,
measured. A green run therefore proves nothing on its own and the proof burden
is §§3–6.

### 2. The corpus, and the three nested populations

The instrument's whole design is a choice of *what to open*. Measured on the
`dist/` at `5c09e4a`, three populations are in play and each is a strict subset
of the one above it:

| population | files | how it is defined | who uses it |
|---|---|---|---|
| every rendered artifact | **863** | the whole tree | the byte instrument's outer bound |
| text files | **639** | extension in `{html, svg, xml, txt, css, _redirects}` | the D-1/D-2 scratch byte instrument |
| **pages** | **620** | the host's own `routes.pageGlob` (`**/*.html`) | **gate 4q** |

The excluded **224** are binary assets — `208 webp · 9 jpg · 5 png · 1 jpeg · 1
ico` — and every one of them matches `[٠-٩۰-۹]` on compressed bytes. **The gate
never opens them**, because the traversal takes the adapter's page predicate
rather than filtering afterwards. That is the difference between excluding by
design and excluding by post-processing: there is no filter to forget to apply,
and the exclusion cannot regress independently of the host's own declaration of
what a page is.

**The 19-file gap between 620 and 639 is a real narrowing and it is bounded, not
assumed.** The gate does not read the sitemap XML, the stylesheet, the SVGs,
`robots.txt` or `_redirects`, because the manifest does not call them pages. The
byte instrument, which does read all 19, reports **0** — so the gate's zero is
not an artifact of the narrower window. The wider measurement bounds the
narrower one, in the safe direction, and it is recorded here rather than
inferred.

### 3. The baseline, reproduced — and the method, which is the deliverable

D-2 §6.1 corrected `815` to `863` and recorded the lesson that a size without
its window is not reproducible. The figure below was re-derived from scratch on
the post-D-2 tree and matches to the file:

```
total files        863
text files         639
binary files       224
occurrences of [٠-٩۰-۹] in text files   0   (all nine locales)
```

The reproducible statement is the **extension census**, not the totals, because
the totals depend on where the text/binary line is drawn and the census does
not:

```
620 .html · 208 .webp · 13 .svg · 9 .jpg · 5 .png · 2 .txt · 2 .xml ·
1 _redirects · 1 .jpeg · 1 .ico · 1 .css        = 863
```

Anyone can regenerate it, and from it any text/binary split is derivable:

```sh
node -e "
const {readdirSync,statSync}=require('fs'),{join,extname,basename}=require('path');
const c={};(function w(d){for(const n of readdirSync(d).sort()){const f=join(d,n);
statSync(f).isDirectory()?w(f):(k=>c[k]=(c[k]??0)+1)(extname(n)||basename(n));}})('dist');
const e=Object.entries(c).sort((a,b)=>b[1]-a[1]);
console.log(e.map(([k,n])=>n+' '+k).join(' · '), '=', e.reduce((a,[,n])=>a+n,0));
"
```

Nobody can regenerate `815`; anyone can regenerate `863`. That is the whole
difference, and it is why the command is in this document.

### 4. Rendered-population reconciliation — measured against an independent source

The acceptance criterion asks that the scan's route count equal the **registered**
route count per locale, reported rather than asserted. The registered count is
not something the gate is told; it is `LOCALE_SLUGS` in
[`src/lib/i18n.ts`](../../src/lib/i18n.ts#L503), the host's own content registry,
whose own comment states the rule this reconciliation depends on — *"a locale is
'present' for a page because its slug is in this Set, never because a file
happens to exist on disk."* Read from that registry's AST and compared with what
gate 4q actually scanned:

| locale | `LOCALE_SLUGS` | pages scanned by 4q | visible-text chars | occurrences |
|---|---:|---:|---:|---:|
| en | n/a (master) | 80 | 2 274 516 | 0 |
| es | 77 | **77** ✔ | 2 654 852 | 0 |
| it | 77 | **77** ✔ | 2 655 745 | 0 |
| pt | 77 | **77** ✔ | 2 588 750 | 0 |
| fr | 77 | **77** ✔ | 2 797 154 | 0 |
| de | 77 | **77** ✔ | 2 653 784 | 0 |
| ja | 77 | **77** ✔ | 1 153 656 | 0 |
| zh | 77 | **77** ✔ | 894 811 | 0 |
| **ar** | **1** | **1** ✔ | **4 254** | **0** |
| total | | **620** | 15 677 522 | **0** |

Eight of eight target locales reconcile exactly. `en` is the default locale and
has no slug set — it is the master every slug resolves to — and its **80** is
`77 + 3`, the three English-only routes being `404` and the two author bios.
That figure is not new arithmetic invented here: Track C independently measured
the switcher-rendering population at **617 of 620**, naming those same three
routes ([`AR2-TrackC-switcher.md`](AR2-TrackC-switcher.md)), and 620 − 3 = 617
reconciles the two measurements against each other.

**`chars` is in that table because the answer is a zero.** A zero over 4 254
characters and a zero over 2 654 852 are the same number and not the same fact,
and the column is the only thing in a green run's output that tells them apart.
The `ar` window is **600× narrower** than any other locale's. Per Rule 8 that is
the window this baseline was taken through, and it is printed by the gate on
every successful run rather than living only in this document.

### 5. The positive control at the source layer — and the finding that came with it

The acceptance form of this control is a *dictionary* injection, not a rendered
one, because the defect B-10b describes is a translator typing digits into a
source string. Both halves of brief §7 D-3.1 were run in one cycle:
`٢٠٢٦` appended to `nav.cancellationPolicy` for **`ar`** (the RTL locale) and for
**`de`** (the Latin control that proves the rule is per-locale, owner decision
D3), followed by a real `astro build`, restored in a `finally`.

Measured on that build:

| locale | pages carrying the digits | occurrences | shape |
|---|---:|---:|---|
| ar | 1 | **8** | 2 renderings × 4 digits, on `/ar/cancellation-policy/` |
| de | 77 | **612** | 8 per page on 76 pages, 4 on `de/things-to-do/best-restaurants-vernal-utah/` |
| **total** | **78** | **620** | |

The gate reported exactly that — `620 rendered non-Western numeral(s) on 78
page(s) across 2 locale(s)`, exit **1** — naming locale, route, character, code
point, range, offset and rendered context for each.

**The finding is what the other eight gates did.** The full `gates:dist` chain
was run against that same perturbed build, in order:

| gate | exit | reported |
|---|---|---|
| `validate-site` | **0** | ✔ 620 pages — links resolve, no orphans, hub structure intact |
| `gate-4m` | **0** | ✔ 32 pages with video, 30 distinct videos |
| `gate-4k` | **0** | ✔ 620 pages across 9 locales — every page renders its declared direction |
| `gate-4n` | **0** | ✔ 1 rtl page — no unisolated mirrored character |
| `gate-4f` | **0** | ✔ 14404 headings — no untranslated headings |
| `gate-4h` | **0** | ✔ 540 pages, 1922 locked phrases — no seam violations |
| `gate-4i` | **0** | ✔ 52 locks on 540 pages — 3 advisory |
| `gate-4g` | **0** | ✔ 42777 anchors — advisory, never blocks |
| **`gate-4q`** | **1** ✘ | **620 non-Western numerals on 78 pages** |

**Eight green gates on a corpus with 620 Arabic-Indic digits rendered across 78
pages in two locales.** This is D-2's German control arriving one layer out: an
exit 0 certifies the question a gate asks, and nothing else. Before D-3 the
corpus-wide numeral policy had exactly one enforcement point — gate 4p, at the
registry — and 4p is by construction blind to an authored digit, because an
authored digit never passes through `Intl`. The half of the policy that survived
Track C was carried by translator discipline, and this run is what "carried by
translator discipline" looks like when it fails: nothing objects.

It is also, incidentally, the strongest available argument that this gate is
worth its 620 file reads. Nine checks over the same corpus, one of which sees it.

### 6. The fail-closed matrix on a scratch corpus

Each case builds a nine-locale scratch corpus in the scratchpad and points the
gate at it through its dist positional. The repository's registry and manifest
are read unmodified; nothing under `src/`, `i18n-gates/` or `census/` is touched
by any case.

| # | corpus | expect | exit | what it establishes |
|---|---|---|---|---|
| C1 | clean, 9 locales | 0 | **0** ✔ | the scratch baseline the others move from |
| C2 | `ar`: `<strong>٢٠</strong><em>٢٦</em>` in prose | 1 | **1** ✘ | **the C7 trap** — see §7 |
| C3 | `de`: Arabic-Indic digits in a Latin locale | 1 | **1** ✘ | the rule is per-locale, not Arabic-only (D3) |
| C4 | `fr`: Eastern Arabic-Indic `۲۰۲۶` | 1 | **1** ✘ | the second range fires; U+06F2 named, not U+0662 |
| C5 | `ar`: digits **only** in `<script>`, `<style>`, a comment and two attributes | 0 | **0** ✔ | the scope limit, as a control that can fail |
| C6 | `ar` absent from the corpus entirely | 2 | **2** ✘ | **zero pages is not zero violations** |
| C7 | real `.webp` assets copied into the corpus | 0 | **0** ✔ | binaries excluded by design — both arms below |

**C6 is the case worth the most.** A registered locale with no rendered page
would otherwise print `ar 0 pages … 0 occurrence(s)` and exit 0 — a line
indistinguishable from a locale that was measured and is clean. It exits 2
instead, as an instrument failure, naming the locale:

```
gate-4q: INSTRUMENT FAILURE — the rendered numeral check could not run

  ✖ locale "ar" is registered by the host but has no rendered page under … —
    a forbidden-range check over an empty corpus reports zero violations and has
    measured nothing

Zero pages is not zero violations. Build the locale, or remove it from the
registry — do not read this run as a pass.
```

This is the ja UI-chrome fail-open shape (handoff §7, Gate 4a) closed in
advance, and it matters for exactly the locale this track exists for: `ar` today
renders **one** page, and a build that dropped it would otherwise report a
cleaner-looking result than a build that kept it.

**C7 is a negative control with both arms measured**, because one arm alone
proves nothing. A real image from `dist/` — one of the 224 that a raw byte walk
flags — was copied into the scratch corpus at two paths. The gate reported 0.
The same file, read as UTF-8 in the same process: **75 matches**. The false
positive is live and available; the instrument does not inherit it.

**C5 is the honest limit, stated as a control rather than as prose.** Forbidden
digits inside a JSON-LD `<script>`, a `<style>` body, an HTML comment, a `title`
attribute and an `alt` attribute are **not** visible text and are **not**
reported. That is the same scope gates 4h and 4i have, and widening it would
re-import the measurement problem the extractor exists to solve (§7). It has
zero live instances — the 639-file byte instrument, which does see all of them,
reports 0 — so it is a limit with nothing behind it, recorded so a green 4q is
not over-read.

### 7. The extraction contract, measured at the offset

The gate's answer turns on one argument: `inlineSeparator: ''`. That argument
was not taken on faith. The three candidate instruments were run over the same
two scratch pages and their matches compared **by offset**, which is the
discipline D-2 established when it found that the two connective forms reported
the same count on different text:

**C2 — four digits split across two inline tags, `<strong>٢٠</strong><em>٢٦</em>`:**

| instrument | matches | offsets | what it reads |
|---|---:|---|---|
| raw HTML bytes | 4 | `92, 93, 107, 108` | two 2-digit runs 14 characters apart |
| `inlineSeparator: ' '` | 4 | `8, 9, 11, 12` | `٢٠ ٢٦` — a space fabricated *inside the number* |
| **`inlineSeparator: ''`** ← the gate | 4 | **`8, 9, 10, 11`** | `٢٠٢٦` — one number, which is what a reader sees |

**All three report 4. Only one reports the right four.** This is D-2's finding
recurring on a different surface and it is worth naming as a pattern: *when an
instrument is measuring the wrong text, the count is often the last thing to
move.* Had this been checked by count, all three instruments would have looked
equivalent and the C7 lesson would have been re-learned in production.

**C5 — the same regex where the digits are not prose:**

| instrument | matches |
|---|---:|
| raw HTML bytes | **20** — every one a false positive |
| `inlineSeparator: ' '` | 0 |
| **`inlineSeparator: ''`** ← the gate | **0** |

Here the count *does* move, 20 → 0. So the two traps are distinguishable by
which measurement they disturb: the inline-markup trap moves the **offsets** and
leaves the count intact; the raw-document trap moves the **count**. An instrument
that checked only one of the two would pass one trap and fail the other, which
is why both were measured.

**And on the live corpus, the brief's own figure reproduced exactly.** Brief
§D-3 constraint 1 recorded 465 ASCII digits of markup on the Arabic pilot page.
Measured independently here:

| `dist/ar/cancellation-policy/index.html` | chars | ASCII digits | `[٠-٩۰-۹]` |
|---|---:|---:|---:|
| raw HTML | 23 525 | **465** | 0 |
| extracted visible text | 4 254 | 143 | 0 |

**465 confirmed**, and the extracted view is 18% of the document. A raw-HTML
instrument would be reading 5.5× more text than a reader sees, three-quarters of
it markup, CSS and JSON-LD.

### 8. The rendering prediction — measured, not assumed

| check | method | result |
|---|---|---|
| `dist/` unchanged | sha256 of all 863 files, sorted by path, before the injection cycle vs after restore + full rebuild | **byte-identical, 863/863** |
| `astro check` | full run | **0 errors, 0 warnings, 268 hints** |
| full suite | `npm run build` = `gates:src` + `astro build` + `gates:dist` | **exit 0** |
| gate 4q | on the rebuilt tree | **exit 0**, 620 pages, 9 locales, 0 occurrences |

The hash comparison spans the *whole* injection cycle — snapshot taken before
`src/lib/ui.ts` was perturbed, compared after the perturbation was restored and
the tree fully rebuilt — so it certifies the control left nothing behind, not
merely that adding a gate script renders nothing.

**268 hints, unchanged from the D-2 close.** The new gate contributes **zero**,
which is not automatic: `tsconfig.json` includes `**/*`, and D-2 §7 measured a
temporary gate copy adding four unused-binding hints to exactly this figure. The
count was taken with no scratch file inside the repository.

Every gate's figures are unchanged from the D-2 close: 4j 840 entries · 4o 35
files · 4p 9 locales · validate-site 620 pages · 4m 32 pages/30 videos · 4k 620
pages/9 locales · 4n 1 rtl page · 4f 14404 headings · 4h 540 pages/1922 locked
phrases · 4i 52 locks/540 pages/3 advisory · 4g 42777 anchors/85 candidates ·
**4q 620 pages/9 locales/0 occurrences** (new).

### 9. Corrections to the Track D planning assumptions (Rule 8)

Recorded here rather than edited back into the brief and the decisions
document, per this milestone's own instruction.

**9.1 — the `gates:src` claim, now fully settled.** D-2 §6.2 corrected brief §2's
"B-9 and B-8a … run in `gates:src`" and the decisions doc's "Also `gates:src`,
pre-build" for D-2. The third instance closes with this milestone, in the
opposite direction: the decisions doc §6 justified D-3's last position partly
with *"It is the only `gates:dist` item."* **All three were `gates:dist` items.**
The ordering itself was never affected — the other two reasons given for it (D-3
is the only item adding a file and wiring; its baseline must be taken on a tree
where D-1 and D-2 have landed) are each sufficient, and both held: this
milestone did add a file and wiring, and §3's baseline was taken on the post-D-2
tree and reproduced it exactly.

**9.2 — "one new permanent verifier and no temporary instruments" held, but not
literally.** Brief §8 predicted no temporary instruments. Four transient
instruments were in fact written — a byte census, a scratch-corpus control
harness, an extractor-arm comparator and a source-injection harness — and all
four live in the scratchpad, outside the repository, so the *claim they were
making* (no `probe.mjs`, no browser, no detached worktree, nothing new to
maintain) holds exactly. The distinction worth keeping is between an instrument
that must be **maintained** and one that must be **reproducible**: none of the
four is maintained, and §3's command is what makes the one figure that outlives
them regenerable.

**9.3 — the acceptance criterion's "registered route count" exists.** It was not
obvious that it did: no gate reads it, the adapter does not expose it, and the
backlog's own B-0 note describes exposing `LOCALE_SLUGS` as an F-series
extension. §4 reconciles against it by reading the registry's AST directly, in
the report rather than in the gate, and gets 8/8 exact. The criterion was
satisfiable as written; the gate simply is not the component entitled to check
it (§10).

### 10. Recorded, deliberately not implemented

- **The reconciliation in §4 is not performed by the gate.** It would need the
  host adapter to expose the content registry, which is the F-series extension
  the B-0 closure note already names — the adapter returns *facts*, and
  "how many routes does this locale register" is a fact it does not yet answer.
  Doing it inside the gate would mean the gate parsing `src/lib/i18n.ts` itself,
  which is precisely the five-copies coupling F4 Phase 1 removed. Left to the
  report, where it is a verification rather than an enforcement.
- **`\p{Nd}` minus ASCII was rejected as the range.** It would additionally
  forbid Devanagari, Bengali, Thai and twenty more scripts, none of which this
  corpus renders and none of which any decision has been taken about — config
  nothing measures, in the direction of over-reach. Widening is a separate item
  with its own decision, and owner decision D3 fixed this deliverable at the two
  Arabic-Indic ranges.
- **Attribute-borne and JSON-LD digits stay out of scope** (§6, C5). Zero live
  instances, and reaching them means abandoning the extracted-text view that
  §7 shows is load-bearing.
- **The `ar` 4h entry's `state: "in-progress"`** stays as-is. It describes B-8b.

### 11. Rule 9 — the differential

Three tracked paths change, and each is explained by this milestone:

```
scripts/gate-4q-numeral-render.mjs   | new file
package.json                         |  2 +-
docs/rtl/AR2-TrackD-policy-gates.md  | this section
docs/rtl/AR2-backlog.md              | the track-close edits
```

No registry, dictionary, census, manifest, `src/` or `dist/` file appears in it.
All four transient instruments were written to the session scratchpad and never
to the repository, so — unlike D-2, where a control copy reached history under
the auto-commit's message and perturbed `astro check` by four hints — there was
no window in which one could be captured. `src/lib/ui.ts` was perturbed and
restored inside a `finally` within a single command, and `git status` was
verified clean of it immediately afterwards, twice.

### 12. Acceptance — D-3

- ✔ **Identical baseline reproduction**: 863 total / 639 text / 224 binary / 0
  occurrences across 9 locales, re-derived on the post-D-2 tree.
- ✔ **Reproducible methodology documented**: the extension census, with the
  command that regenerates it, replaces the bare totals as the recorded fact.
- ✔ **Detection of injected rendered Arabic-Indic digits**, through the real
  path — dictionary value → `astro build` → rendered page — in the RTL locale
  (`ar`, 8 occurrences) and in a Latin one (`de`, 612), 620 total on 78 pages,
  exit 1 naming locale · route · character · code point · offset · context.
- ✔ **No findings from binary assets**, both arms measured: the gate opens 620
  of 863 files and reports 0; the same `.webp` read as text yields 75 matches.
- ✔ **The C7 trap defeated at the offset**, not by count: digits split across
  `<strong>`/`<em>` are found contiguous at offsets 8–11, where the two rival
  extraction settings report the same count on different text.
- ✔ **Instrument failure stays distinct from policy failure**: exit 2 for a
  registered locale with no rendered page, exit 1 for a violation, exit 0 with
  the nine-row table.
- ✔ **Rendered-population reconciliation against an independent source**: 8/8
  target locales match `LOCALE_SLUGS` exactly; `en`'s 80 = 77 + 3 reconciles
  with Track C's independently measured 617/620.
- ✔ **Full suite green**, every pre-existing gate's figures unchanged;
  `astro check` 0 errors / 0 warnings / 268 hints, the new gate contributing 0.
- ✔ **`dist/` byte-identical across the whole injection cycle**: 863/863.
- ✔ Three corrections to the planning assumptions recorded here rather than
  edited backwards into the planning artifacts.

---

## Track D — closure

**All three items are prevention, and all three shipped with zero live defects
behind them** — that was true when the brief predicted it and it is still true
measured: both `ar` glossary locks correct, `ar` connectives 0, Arabic-Indic
digits in rendered prose 0. What the track changed is not the corpus but what
happens the next time the corpus moves.

| item | was | is |
|---|---|---|
| **B-9** | `ar` locks under no script validation; a locale misfiled as `arabic` exits 0 | fourth branch in 4i; the misfiling exits 2 and the `latinLock` escape is counted, not asserted |
| **B-8a** | any non-`latin` script silently borrowed the CJK adjacency form | explicit `CONNECTIVE_FORMS` lookup; an unregistered script declaring connectives exits 2 naming itself |
| **B-10b** | authored non-Western digits enforced by nothing; 8 gates blind | gate 4q, `gates:dist`, forbidden-range, 620 pages × 9 locales on every build |

**The recurring lesson across the three milestones is one lesson.** D-2 found
that the wrong connective form reports the *same count* at a different offset.
D-3 found that three extraction settings report the *same count* on different
text. In both cases the defect was invisible to a total and visible at an
offset, and in both cases the instrument became more **discriminating** rather
than more complicated. The D-1 case is the same shape from the other side: `de`
misfiled under `script: "arabic"` exits 0 on the unpatched gate, so the *exit
code* was the invariant hiding the defect, and the fix was to count what the
branch added rather than to read the code.

**What remains, and what it now waits on.** B-8b (the Arabic seam rule) and B-11
(proper-noun drift in body prose) are the only Arabic items still open, both
census-derived under Rule 16, both blocked on a single prerequisite: an Arabic
prose pilot batch. D-2 §8 produced the first hard evidence for B-8b's shape —
the proclitic `و` fuses to the following word, so the Arabic form can be neither
the Latin word-boundary form nor the CJK adjacency form — which is a finding for
Track E's rule design and still not a rule. The corpus window is unchanged and
is printed by gate 4q on every build: **`ar` 1 route, 4 254 characters, against
77 routes and ~2.6 M characters for every other locale.**

Track E — `MULTILINGUAL_HANDOFF.md` §7 stage 2 for `ar` — is authorized on this
closure by owner decision D4, without a further decision gate.
