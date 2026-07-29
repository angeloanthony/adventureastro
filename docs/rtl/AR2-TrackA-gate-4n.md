# AR-2 Track A — Gate 4n, bidi isolation integrity

**Status: COMPLETE 2026-07-28.** `scripts/gate-4n-isolation.mjs`, `dist/`-reading, blocking,
wired into `gates:dist` between 4k and 4f. Engine in `scripts/lib/bidi-isolation.mjs`;
differential proof in `scripts/test-4n-differential.mjs` (`npm run test:4n`) over nine
committed fixtures. Suite green: 620 pages, all gates pass, `astro check` unaffected.

Implements [ADR-10](../framework/adr/0010-isolation-is-a-flanking-type-rule.md), whose status
moves from DECIDED to IMPLEMENTED, with §8 added there for the two things implementation had
to decide that the ADR left open.

---

## 1. What the gate enforces

> In a document whose declared direction is RTL, no rendered text node may contain a mirrored
> character whose flanking strong types differ, outside an isolated run.

B-2 built the shared bidi formatter and nothing checked that anyone used it. `404.astro`
already bypasses it — it hand-rolls the nav and emits the phone number outside the formatter
— and ParkingWay ships 24 broken mirrored runs across its Arabic tree with no isolation
anywhere. That is what an unenforced convention looks like at scale on a host nobody watches.

Which locales read right-to-left comes from the host registry through the adapter
(`host.direction`), never from a list in the gate and never from testing for Arabic script.
ADR-10 §6 names this gate as an instance of ADR-9 and that is where it is honoured.

---

## 2. The reproduction came first, and it changed the rule

ADR-10 §2 records the measurement that justifies the rule but not the classifier that
produced it — that was a scratch script and is gone. So the first deliverable was not the
gate; it was reproducing four numbers.

That exercise found a decision the ADR's prose does not contain. §2 says all four of
adventureastro's mirrored-character nodes "span a direction change". **Those four nodes are
the phone `(435) 219-9447`, which contains no strong character at all.** Whether they span
anything therefore depends entirely on a question §2 never asks: is a run of digits a
flanking type, or is it transparent?

| | transparent digits | digits are a flank |
|---|---:|---:|
| adventureastro nodes spanning a direction change | **0** | **4** ← what §2 recorded |
| parkingwayastro bare findings | 18 | 24 |

Digits are a flank. It is not a fit to the data: UAX #9 rule **I2** raises EN and AN to an
even (left-to-right) level in an RTL paragraph, exactly as it does L, so a digit run is an
LTR island in RTL text and a bracket beside one stands at a real direction change. It is what
a reader sees when a phone number's area code lands at the far end of the line.

**Had the gate been written straight from the ADR without reproducing its numbers, the
transparent-digit reading was the more natural one — and it would have shipped a gate that
finds nothing on the one defect class this site actually has.**

### 2.1 One figure in ADR-10 does not reproduce, and it is recorded rather than fitted

| | §2 recorded | this engine |
|---|---:|---:|
| adventureastro mirrored nodes / same-flank / direction-change | 4 / 0 / 4 | **4 / 0 / 4** ✔ |
| parkingwayastro mirrored-character text nodes | 75 | **75** ✔ |
| …same-flank vs bare | 53 / 22 | **51 / 24** |

Everything about this host reproduces exactly, and so does the foreign corpus's node total —
the number that says two tokenizers agree about what a text node is. The split differs by two
nodes and cannot be attributed: nothing records which nodes the original put on which side.
The reproducible figures are now the figures. `test:4n` asserts the **75** and not the split,
so nobody is later measured against a number they cannot reproduce.

Fifth instance of this project's recurring lesson — *a recorded size is a hypothesis about
the measurement window.* The delta is also in the safe direction: the shipped rule blocks
more than the ADR recorded, not less.

---

## 3. The differential test is the deliverable, not the gate

The gate is transcription. This is the part that was real work.

**A green 4n proves nothing, and the reason is specific rather than philosophical: the rule
ADR-10 rejected also passes this corpus.** adventureastro's same-flank population is zero, so
both algorithms return 0 findings here. Every check this repository owns is satisfied by
either one being installed.

So both rules ship, executable, in `RULES` — the rejected one carrying its measurement in a
comment and a note that no gate may call it — and `scripts/test-4n-differential.mjs` runs
them over a corpus **chosen to make them disagree**:

```
test-4n: ✔ 9 fixtures — the accepted rule and the rejected rule disagree on 5 of them
         totals over the fixture corpus: ADR-10 rule 7 findings, rejected rule 18
         2 correct-flank fixture(s) the rejected rule would have blocked:
             correct-arabic-parentheses.html, correct-latin-address.html
         cross-host parkingwayastro: 12 pages, 75 mirrored-character nodes —
             ADR-10 rule blocks 24, rejected rule blocks 75
```

`correct-arabic-parentheses.html` is required by ADR-10 §7 by name: without a correct
Arabic-parentheses case the discriminating clause is untested and the ADR's central finding
is unprotected. The fixtures are the ~70% false-positive class reproduced small enough to
read, and the test refuses a corpus that stops containing at least two of them.

**The cross-host run is proof, never a dependency.** It is skipped when
`parkingwayastro/dist/client/ar` is not on disk, because a test that fails over a sibling
repository's absence is a test about the operator's disk.

---

## 4. Fail-closed matrix

A prospective gate's proof burden is its perturbations, since its green run is free. Source
perturbation, full rebuild, whole pipeline:

| Perturbation | Result |
|---|---|
| Remove `<Bidi>` from the nav phone in `Header.astro` (one call site) | `validate-site` ✔, 4m ✔, **4k ✔** — and **4n alone exits 1**, naming `/ar/cancellation-policy/`, the character, its `<li>` and its flanks `R … N` |
| Restore it | whole pipeline green again, 620 pages |
| Rejected rule installed instead (via `test:4n`) | 53 → 75 findings on ParkingWay's correct content; **0 → 0 on this host**, which is why the fixtures exist |
| `baseDirection` omitted at an engine call site | `TypeError` — the module refuses to guess a direction, per ADR-9 |
| No RTL locale registered | exit 0 with *"the invariant is scoped to rtl documents, so there is nothing to check"* — stated, not silent |

The first row is the one that matters, and it is the same shape as B-1's substitution test:
**every other gate in the pipeline passed a page with a visibly broken phone number.**

---

## 5. Scope — stated so a green run is not over-read

Not covered, each for a recorded reason:

- **Edge neutrals.** B-2 measured **zero** across both corpora. A rule for a class with no
  measured instance is the config-nothing-reads defect; it lands with the first measurement.
- **`<title>`**, which accepts no elements, so markup isolation is impossible there. A gate
  must not report a defect the mechanism it enforces cannot fix.
- **LTR documents.** ADR-10 §5. `scope-ltr-document.html` is the most valuable fixture in the
  set: it is what the engine reports if that restriction is dropped — a finding on ordinary
  English prose (`call (435) 219-9447`), which is 619 pages of this corpus.
- **Presentation.** Carousel geometry (B-5), arrow glyphs (B-6), physical CSS (B-7). None is
  inline bidi semantics and none is reachable from rendered text.

**A page 4n passes may still be visually broken.** Same limit as 4k, stated for the same
reason.

---

## 6. Two things worth not re-deriving

**`<bdi>` alone does fix a digits-only run, and that is not obvious.** `<bdi>` defaults to
`dir="auto"`, which resolves from the first strong character — and `(435) 219-9447` has none.
HTML's auto rule falls back to `ltr` in that case, so the isolated phone renders as written.
Had it fallen back to the *parent's* direction instead, B-2's fix would not have worked and
would have needed an explicit `dir="ltr"`. The engine implements this in `resolveAuto()`
because the gate has to agree with the browser about what isolation accomplished.

**A block boundary is a paragraph boundary, and it changes the verdict.**
`defect-block-boundary.html` is the ParkingWay address with `Italia` moved into a sibling
`<p>`. Identical characters, opposite verdict — correct as one paragraph, a defect as two.
This is why the flank scan runs over the scope rather than the text node, and why the scope
carries barriers.

---

## 7. Open

- **`404.astro` is still the one confirmed formatter bypass** and 4n still cannot see it,
  because no `/ar/404` route exists. The day one does, this gate reports it. Fix is
  structural — use the shared `Header` — and is not the gate's business.
- **The gate is prospective.** Its value arrives when the Arabic corpus grows from 1 route to
  77 and isolation cannot silently stop happening. Until then `test:4n` is the only thing
  proving it works, which is why it is wired to a named npm script and not left as a file.
- **`i18n-gates/` holds no `4n` config, deliberately.** The rule has no threshold, no lexicon
  and no per-locale exception — it is derived from UAX #9 and the registry. A config file
  would be the first place an exemption list appeared.

---

## 8. Concurrent work, recorded because it touched the same files

`gate-4m-media` (V-1 phase V-0) landed in `gates:dist` from a parallel workstream during this
phase, along with `i18n-gates/4m-media.json`, `host-manifest.json` and
`src/page-content/utv.ts` edits. Both phases edited `MULTILINGUAL_HANDOFF.md` §7.1 and §7.2
concurrently and the two sets of rows reconciled without loss. Nothing in Track A depends on
4m or vice versa; it appears in §4's matrix only because it was in the pipeline when the
perturbation ran, and it passed the broken page like everything else did.
