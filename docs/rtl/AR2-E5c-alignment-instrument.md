# AR-2 Track E, E-5c — the alignment measurement, made reproducible

**METHOD citation:** rules 1 · 4 · 5 · 8 · 9 · 18 (`docs/framework/METHOD.md`).

**Status:** complete. **Baseline:** `cca0bd8` (E-5b). No Arabic authored, no corpus change, no
gate or gate-config change, no census refresh. One instrument extended.

**Instrument:** [`measure-prose-window.mjs --align <locale>`](../../scripts/rtl/measure-prose-window.mjs),
with `--align <locale> --falsify` as its control.

---

## 1. The gap this closes

E-5b §5.2 found that the pilot's most-cited quality result — **Δ 0 per file across ten §4.2
terms**, E-2 §4.2 — came from what E-2 itself calls *"a throwaway census"* that was never
committed. `measure-prose-window.mjs` hardcoded `dist/ar/` at two sites and could not read the
English side at all, so the number could not be re-derived from repository state.

That is a METHOD rule 5 violation that survived four milestones, and it had a deadline nobody had
written down: **once batch 2 lands, the 9-page pilot ceases to exist as a clean reference corpus
and the original comparison becomes unreproducible forever.**

**Result: the conclusion reproduces exactly — 10 of 10 terms at Δ 0 on every file. Two of the ten
magnitudes do not, and both differences are measured, not explained away.**

---

## 2. The instrument

```
node scripts/rtl/measure-prose-window.mjs --align ar
node scripts/rtl/measure-prose-window.mjs --align ar --falsify        # the control
node scripts/rtl/measure-prose-window.mjs --align ar --json out.json
```

**Window:** `prose = <main> − related-articles − tour-cta − author-byline` — E-3's window,
unchanged, and the same `decompose()` the existing report uses. There is one definition of the
window in this repository and `--align` does not add a second.

**Per file, not totals.** This is the method that closed the German backlog: a corpus-wide total
can cancel a `+2` on one file against a `−2` on another and report perfect alignment over a
corpus with two defects. The instrument reports the per-file delta and names every file that
differs.

**Route membership.** Only routes present in *both* locales are compared (rule 9). English is the
default locale and carries no URL segment, so the `en` side is `dist/<slug>/`, not `dist/en/<slug>/`
— a detail that is a function in the code rather than a template, because getting it wrong
produces zero pages rather than a wrong number.

### 2.1 ⚠ Why the alignment set is not the floor-candidate set

The two lists in the file answer different questions, and the difference is deliberate:

| | `CANDIDATES` | `ALIGN` |
|---|---|---|
| question | which terms could carry a gate-4i **floor** | which terms must survive translation **byte-for-byte** |
| includes | Arabic-script locks (`المسارات`) | transactional runs (`$349`, `$125`, the phone) |
| excludes | prices — they will never carry a floor | Arabic-script terms — no common string to count |

`ALIGN` reproduces E-2 §4.2's ten rows exactly, so the historical figure and this instrument's
figure are like-for-like. An Arabic-script term cannot be aligned at all: alignment asks whether
the *same* string survives, and a term rendered differently in each locale has no shared string.
Those terms are the control's subject instead (§4).

---

## 3. Reproduction — the conclusion holds, two magnitudes do not

```
=== PER-FILE ALIGNMENT (Δ per file, not just totals) ===
  term                              en    ar     Δ  files off
  Vernal                           178   178     0        0/9
  Doc's Beach                       20    20     0        0/9
  Moonshine Arch                    16    16     0        0/9
  Outlaw Trail                      11    11     0        0/9
  Asphalt Ridge                      9     9     0        0/9
  Kawasaki KRX 1000                 39    39     0        0/9
  Dinosaur National Monument        23    23     0        0/9
  (435) 219-9447                    33    33     0        0/9
  $349                              29    29     0        0/9
  $125                              22    22     0        0/9

  10/10 term(s) align per file with Δ 0 on every shared route
```

**Δ 0 on all ten terms, on all nine files — E-2's result, reproduced from committed artifacts.**

| Term | E-2 §4.2 | committed | agrees? |
|---|---:|---:|:--|
| `Vernal` · `Moonshine Arch` · `Outlaw Trail` · `Asphalt Ridge` · `Kawasaki KRX 1000` · `Dinosaur National Monument` · `(435) 219-9447` · `$125` | 178 · 16 · 11 · 9 · 39 · 23 · 33 · 22 | identical | ✔ 8 of 10 exact |
| **`Doc's Beach`** | **3** | **20** | ✘ §3.1 |
| **`$349`** | **38** | **29** | ✘ §3.2 |

### 3.1 `Doc's Beach` 3 → 20: the apostrophe undercount, a third time

E-2's figure counted the ASCII apostrophe only. The term also renders in a curly one, produced by
Astro's smartypants from the same ASCII source (E-5b §3). Both sides were undercounted equally,
so **Δ 0 was correct and the magnitude was 15 % of the term.**

This is E-0 F5 landing for the **third** time — E-2's table, E-4's eligibility row, and now the
historical figure itself. The fix committed at E-5b is what makes the corrected number available
here; nothing new was decided.

### 3.2 ⚠ `$349` 38 → 29: E-2's figure was taken over `<main>`, not over its own declared window

Measured, not inferred:

| | en | ar |
|---|---:|---:|
| `$349` in `prose` (`<main>` − related − cta − byline) | **29** | **29** |
| `$349` in `div.tour-cta` | **9** | **9** |
| `$349` in `<main>` | **38** | **38** |

The `tour-cta` block renders the price once per page — `Guided UTV tours through Dinosaur
Country. $349/machine · 3 hours · up to 2 riders` — on all nine pages in both locales.
**29 + 9 = 38.** E-2's figure is the `<main>` count.

**The cross-check that makes this a measurement rather than an arithmetic coincidence:** the same
extraction reports the Arabic `tour-cta` at 981 visible characters, and decoding the two
`&middot;` entities per page as the instrument does gives **981 − 126 = 855** — E-3's committed
`cta` total for those nine pages, exactly.

⚠ **E-2 §4.2 declares the prose window in its own text and then reports a `<main>` number for one
of its ten rows.** The Δ 0 conclusion is untouched — `tour-cta` is a shared template block and
contributes 9 to both sides — but this is the window-inconsistency defect *inside the very table
whose window definition E-3 was later built to formalise. It is also the fourth appearance of
rule 8 in this track, and the first one found in a figure rather than in a plan.

---

## 4. Controls

Per METHOD rule 5, the measurement path must be shown able to produce the opposite result.
A Δ 0 across ten terms is exactly what an instrument reading **one tree twice** would also print.

**`--align ar --falsify`** measures the `DIVERGENT` set instead — terms policy *requires* to
differ, because the English string is translated — and **exits 2 if any of them reports Δ 0**:

| Term | why it must diverge | en | ar | Δ | files off |
|---|---|---:|---:|---:|---:|
| `Dinosaur Country` | policy §4.1 exonym → `أرض الديناصورات` | 14 | 0 | **−14** | 6/9 |
| `Key Takeaways` | AR-1 glossary → `أبرز النقاط` | 4 | 0 | **−4** | 4/9 |
| `Utah` | policy §4.1 exonym → `يوتا` | 65 | 2 | **−63** | 9/9 |

```
✔ control red as required — all 3 divergent term(s) show a difference
```

- **Positive control** — the ten `ALIGN` terms return Δ 0 on a corpus that complies.
- **Negative control** — the three `DIVERGENT` terms return non-zero on the same run of the same
  code path, so the comparison demonstrably reads two distinct trees.
- **The control can fail**, and failing is wired to exit 2 with the offending term named.

---

## 5. ⚠ An incidental finding the control surfaced

`Utah` reports **2** on the Arabic side, not 0. Both occurrences are Latin, and both are correct:

```
<bdi>1935 S 1500 E, Vernal, Utah</bdi>                                    — a postal address
<bdi>Utah Field House of Natural History State Park Museum</bdi>          — an institution
```

Policy §4.1 maps the *state* `Utah → يوتا`; policy §4.2 keeps Latin anything the reader must match
against *"a road sign, a booking system or a map."* A postal address is the canonical §4.2 case
and an institution's registered name is the same shape. **§4.1 and §4.2 overlap, and §4.2 wins
inside an address or a proper name.**

This is the third instance of one pattern — E-2 §6.1 found the English conjunction `and` inside
the §4.2 name `Dave and Trudy Wilson`, and E-2 §6.1's warning about the 4f whitelist is the same
finding at the gate layer. **An exonym rule needs a "not inside a proper name or address"
carve-out**, or every such name reads as a policy violation. Added to the rollout brief §2.1.

No corpus change: both sites are correct as authored.

---

## 6. Limitations, stated so they are not rediscovered

1. **`PILOT` is still hardcoded** (E-4 §11.0). `--align` measures the same nine slugs and inherits
   the same maintenance obligation — extend the list before measuring a new batch, or the
   alignment silently covers the pilot only.
2. **Prose window only.** Chrome, related, cta and byline are excluded by construction. §3.2 is
   the demonstration of why that matters, and of why a figure must name its window.
3. **Shared-string terms only.** A term rendered differently per locale cannot be aligned; it can
   only be checked for divergence, which is what `DIVERGENT` does.
4. **Δ 0 evidences compliance of this corpus, not that compliance is automatic.** E-2 §4.2's own
   caveat stands and is not weakened by making the number reproducible: one author, one
   one-for-one authoring style. **E-5 §8 P5 still predicts Δ ≠ 0 for batch 2**, and this
   instrument is now the thing that will decide it.

---

## 7. Reports updated to cite the instrument

- **`AR2-E2-pilot.md` §4.2** — addendum added: the throwaway census is superseded, the two
  corrected magnitudes are recorded, and the Δ 0 conclusion is confirmed.
- **`AR2-E5-pilot-assessment.md` §8 P5** — the "no committed instrument" note is resolved.
- **`AR2-E5b-rollout-prep.md` §5.2** — the recommendation is marked done.
- **`AR2-rollout-batch-brief.md` §2.1** — the §4.1/§4.2 overlap carve-out from §5.

---

## 8. Deliberately not done

- **No corpus change**, no translation, no gate or gate-config change, no census refresh.
- **`PILOT` not extended** — batch 2 owns that, per E-4 §11.0.
- **No `DIVERGENT` set for locales other than `ar`.** The structure accepts them; populating one
  is that locale's work and inventing entries now would be the M-4 defect this project refuses by
  name.
- **E-2's §4.2 table is not rewritten** — an addendum records the correction, the same treatment
  E-4 §5.1 and E-5 §5.1 received. The historical figure is evidence of what was measured then.
