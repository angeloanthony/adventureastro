# AR-2 batch 2a — measured blocker: gate 4n classifies U+0640 TATWEEL as strong **L**

**Status: RESOLVED** at the instrument. §§1–6 below are the diagnosis as filed from the first
build; **§7 is the investigation and the correction**, and it records that the fix this
document originally proposed was itself **falsified by measurement**. No corpus was edited to
resolve it, and the 28 editorial findings are untouched.

**Evidence:** `scratchpad/batch2a-first-build.txt` (the preserved first build, exit 1),
`batch2a-4n-after-fix.txt`, `repro-tatweel.mjs`, `measure-scriptext.mjs`.

---

## 1. The finding

`scripts/lib/bidi-isolation.mjs` classifies a character's strong type with:

```js
const RTL_LETTER = /[\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Syriac}…]/u;
const LETTER = /\p{L}/u;
```

**U+0640 ARABIC TATWEEL is `Script=Common`, not `Script=Arabic`.** Its `Script_Extensions`
is Arabic, but `\p{Script=…}` does not consult that property. It *is* `\p{L}`. So the
classifier falls through to the letter branch and returns **L**.

Measured:

```
TATWEEL  RTL_LETTER: false   LETTER: true   => gate classifies U+0640 as L
FEH      RTL_LETTER: true
```

Unicode assigns U+0640 bidi class **AL** — strong right-to-left. The gate has the sign
inverted for this character.

## 2. What it produced

Two of the 30 gate-4n findings in the first batch-2a build:

| route | node | text |
|---|---|---|
| `/ar/hiking/best-hikes-in-dinosaur-national-monument/` | `<li>` | `… أبدًا لـ«تحسين» صورة` |
| `/ar/hiking/high-uintas-backpacking-guide/` | `<li>` | `… يغادر معك. فـ«عدم ترك أثر» يعني` |

Both are **Arabic on both sides of the guillemet**. Codepoints confirmed against the
rendered HTML for the second one:

```
-2 "ف" U+0641   -1 "ـ" U+0640   0 "«" U+00AB   +1 "ع" U+0639
```

Left flank should resolve **R**; the gate resolves it **L**, the flanks differ, and
`RULES.flanking` reports a finding. These are **false positives**.

## 3. Why it is a blocker and not a nuisance

- `gates:dist` is an `&&` chain. 4n exits 1, so **4f, 4h, 4i, 4g and 4q never ran.** The
  re-frozen `ar` floors (33 / 42) and the numeral-render gate are unmeasured for this batch.
  Fixing the other 28 findings does not clear this; the build still fails on these two.
- The rollout brief's §3.2 correction — *drop the guillemets around a Latin token* — does
  **not** apply. There is no Latin token here. The guillemets wrap Arabic, which §3.2
  explicitly says "are still fine and still need nothing."
- The only editorial workaround is to delete the tatweel from `فـ` / `لـ`. That is the
  orthographic form the corpus uses for a proclitic before a quoted phrase, and it is the
  same attachment behaviour §3.4 measures (1 807 attached / 47 pre-Latin / 0 standalone).
  Deleting it to satisfy the instrument would corrupt the text and destroy that measurement.

## 4. Latent exposure — this predates batch 2a

The tatweel is present in **15 of the 18 registered `ar` files**, including nine pilot files
that shipped 4n-green:

```
visiting-dinosaur-national-monument 10 · bird-watching 9 · best-hikes 9 ·
backpacking 8 · family 8 · fall 8 · petroglyphs 5 · beginners-guide-to-utv 4 ·
alpine-lakes 4 · dog-friendly 3 · group-utv 2 · family-utv 2 · best-utv-trails 2 ·
private-utv 1 · beginner-hiking 1
```

The pilot passed only because no tatweel happened to land **immediately adjacent to a
mirrored character**. Batch 2a is the first corpus where that adjacency occurs. So the
misclassification is not new — the *exposure* is. This is the fourth instance of the
recurring lesson: a green gate run over a corpus that lacks the shape proves nothing about
the shape.

⚠ It cuts both ways. A tatweel on a flank can also make two genuinely differing flanks
compare **equal** and suppress a real finding. The false-negative population has not been
measured.

## 5. The fix — a framework change, deliberately not made here

One character class, in `scripts/lib/bidi-isolation.mjs`:

```js
\p{Script=Arabic}  →  \p{Script_Extensions=Arabic}
```

or an explicit `ـ` in `RTL_LETTER`. `Script_Extensions` is the correct property for
this question and would also pick up other Common-script characters that carry Arabic
bidi classes.

**Not applied.** Batch 2a's instruction is not to modify framework code, gates, or
instruments, and this is a gate. It also needs `npm run test:4n` (the differential test the
gate's own header requires after any change here) and a decision about whether to re-measure
the false-negative population across all 18 `ar` pages before trusting any prior 4n-green run.

## 6. The other 28 findings are NOT blocked

They are ordinary translation defects and remediable editorially under §3.3. Every one is a
bracket whose flank is a **bare Latin run** on a surface where `<bdi>` is unavailable or was
not applied:

- **FAQ answers** (`<div>`, 22 findings) — `(هيئة National Park Service وهيئة Utah State Parks
  وإدارة غابة Ashley National Forest)`. `bidi-runs.ts` isolates only *named* runs (phone,
  currency), so an agency name in frontmatter cannot be isolated at all. §3.3's ⚠ note
  specified this residual in advance and it behaved exactly as specified.
- **page-summary `<p>`** (5 findings) — same shape, same surface constraint.
- **body `<p>`** (1 finding, alpine-lakes) — `<a>منطقة High Uintas Wilderness</a> (وقسم…` —
  Latin inside link text with no `<bdi>`. This one *is* fixable with markup.

**⚠ Brief gap, worth recording:** §3.3 names the bracket-adjacent-to-a-**digit** class and
cites it as "the single largest defect class in the pilot: 13 of 15." In batch 2a the
digit class produced **zero** findings — the guidance was followed — and the dominant class
is bracket-adjacent-to-a-**Latin-institution-name**, 28 of 30. That class is *created* by two
other brief rules acting together: §2.1/§4.2 keeps agency names Latin, and the
verify-the-source convention puts them in brackets. The brief does not currently tell a
translator how to end a parenthetical that closes on a Latin name.

---

## 7. Investigation and correction

Sequence: reproduce → measure → establish baseline → correct → regression-test → re-measure.
The instrument was validated before its measurements were used.

### 7.1 Minimal reproducer

Both findings reduce to a single `<li>` each, run through the gate's own `classifyPage`, with
no build and no corpus (`scratchpad/repro-tatweel.mjs`):

```
FINDING  فـ«عدم ترك أثر» يعني              "«" L…R
FINDING  لـ«تحسين» صورة                    "«" L…R
  clean  same text WITHOUT U+0640                        <- the only variable
  clean  R «…» R  (plain Arabic letters)
FINDING  R «…» R  (tatweel on LEFT flank)   "«" L…R
FINDING  R (…) R  (tatweel on LEFT flank)   "(" L…R      <- not guillemet-specific
FINDING  R «…» R  (tatweel on RIGHT flank)  "»" R…L      <- symmetric
FINDING  L «…» R  (genuine direction change) "«" L…R     <- the rule itself is sound
```

Single-variable isolation: removing U+0640 is the only difference between finding and clean.

### 7.2 ⚠ The fix proposed in §5 was WRONG, and the measurement is why

§5 proposed swapping `\p{Script=Arabic}` for `\p{Script_Extensions=Arabic}`. Measured
(`scratchpad/measure-scriptext.mjs`), the two properties differ over **63 codepoints** across
the gate's seven RTL scripts. By general category:

| category | count | Bidi_Class | correct today? |
|---|---|---|---|
| `Mn` combining marks | 27 | NSM | ✔ neutral |
| `P` punctuation | 8 | ON / CS | ✔ neutral |
| Hanifi Rohingya digits/marks | 27 | AN | ✔ not strong |
| **`L` letter** | **1** | **AL** | **✘ — U+0640** |

**Exactly one is a letter.** Eleven of the 63 occur in this corpus, and the wholesale swap
would have flipped **ten of them from neutral to strong R across 12 837 rendered occurrences**:

```
U+0651 ّ  5530    U+060C ،  4170    U+064B ً  3309    U+064F ُ   705
U+064E َ   417    U+061B ؛   336    U+0650 ِ   297    U+061F ؟   300
U+064D ٍ    91    U+064C ٌ    14
```

`،` `؛` `؟` are the three marks **Arabic policy §5.1 mandates at sentence level**. Making
sentence punctuation strong would resolve genuinely differing flanks into a false match and
**suppress real findings** — the false-negative direction, which is the failure mode a
blocking gate cannot afford. The wider net would have been a worse instrument than the one it
replaced.

**So the correction is one codepoint, added explicitly, not one property widened.**

### 7.3 The change

`scripts/lib/bidi-isolation.mjs`, one character class:

```js
…\p{Script=Mandaic}]      →      …\p{Script=Mandaic}\u0640]
```

Written as `\u0640`, never as the literal glyph: a bare tatweel in a character class is
invisible in a diff and would be deleted by accident. The comment block above it previously
claimed the Script approximation "is wrong only for unencoded corner cases that no measured
corpus contains" — **that claim was false and is now corrected in place**, with the rejected
wider fix recorded beside it so the next reader does not re-propose it.

`gate-4i-glossary.mjs` also uses `\p{Script=Arabic}`, but for a phrase-level test (does this
lock phrase contain Arabic) — a phrase always contains real letters, never a bare tatweel. Not
affected, not changed. `bidi-isolation.mjs` is the only place a per-character strong type is
computed.

### 7.4 Regression coverage

New fixture `tests/fixtures/rtl-isolation/correct-tatweel-flank.html` — three real corpus
sentences, `فـ«…»` / `لـ«…»` / `فـ(…)`. Only LEFT-flank tatweel, deliberately: a tatweel
immediately after a bracket is not Arabic orthography, and the fixture corpus does not invent
shapes it has not measured. Engine-level symmetry stays in the unit reproducer.

Counts measured, not asserted — the pre-fix classifier was reconstructed and run against it:

| | pre-fix | corrected |
|---|---|---|
| accepted (ADR-10) | **3** | **0** |
| coarse (rejected rule) | 6 | 6 |

It is therefore also a *differential* row: a correct-flank case the rejected rule would block.

### 7.5 Acceptance

| criterion | result |
|---|---|
| baseline `test:4n` before any change | ✔ 9 fixtures, exit 0 — 7 accepted / 18 coarse, disagree on 5 |
| existing regressions still pass | ✔ unchanged: accepted total still **7**, parkingway still **24 / 75** |
| `test:4n` extended | ✔ **10 fixtures**, disagree on **6**, coarse 18 → 24 |
| the two tatweel findings disappear | ✔ 4n **30 → 28**, zero guillemet findings remain |
| no unexpected new classifications | ✔ set-differenced the finding lists: removals are **exactly** the two false positives, additions **empty** |
| no second blocker behind 4n | ✔ 4f, 4h, 4i, 4g, 4q all probed read-only — **all exit 0**, including the re-frozen `ar` floors |

A full `npm run build` was not re-run: neither content nor build code changed, only a gate
library and its test, so `dist/` is unchanged by construction. `gates:dist` was run end-to-end
against the same bytes and still stops at 4n on the 28 editorial findings.

### 7.6 What remains

The **28 editorial findings** (§6), untouched by design. They are the next milestone.
