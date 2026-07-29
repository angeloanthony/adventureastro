# ADR-10 — Bidi isolation is a flanking-type rule, not a character rule

**Status:** **IMPLEMENTED 2026-07-28** as gate 4n (`scripts/gate-4n-isolation.mjs`), blocking
and wired into `gates:dist`. The differential proof §7 demands is
`scripts/test-4n-differential.mjs` (`npm run test:4n`). §8 records the two places where
implementation had to decide something this ADR left open, and corrects one of §2's figures.
Originally recorded DECIDED-not-implemented, so the rejected alternative would be preserved
with its measurement rather than reconstructed later from a passing gate.
**Context phase:** AR-2 B-2 built the shared bidi formatter
([`AR2-B2-bidi-formatter.md`](../../rtl/AR2-B2-bidi-formatter.md)). Nothing enforces it, and
`404.astro` already bypasses it.
**Relation to ADR-9:** an instance of it. The gate must obtain each locale's direction from
the registry through the adapter, never assume it — see §6.

---

## 0. The one-line invariant

> **In a document whose declared direction is RTL, no rendered text node may contain a
> mirrored character whose flanking strong types differ, outside an isolated run.**

The load-bearing clause is *whose flanking strong types differ*. Without it the rule is
wrong on real corpora, and §2 is the measurement that shows by how much.

### 0.1 Why it says *rendered text node* and not *shared source*

The invariant was first phrased as "no **shared source** may emit …", which is how the
problem was discovered — B-2 migrated shared chrome. As an enforceable rule it is wrong in a
way that matters, and the counter-example is already known:

**`404.astro` is not a shared source.** It hand-rolls its own copy of the nav, phone markup
included. It is the one confirmed bypass of the formatter in the repository, and a rule
scoped to shared sources **would exempt precisely it.**

The narrower phrasing also cannot be enforced by the kind of gate this must be. A
`dist/`-reading gate sees rendered HTML and has no way to attribute a text node to
`Header.astro` rather than to an author's MDX — recovering that would mean reasoning about
implementation strategy, which is exactly the boundary 4k holds ("verify rendered truth, not
implementation strategy", ADR §5). Origin is not a property of the corpus the gate reads.

So the scope is every rendered text node in an RTL document, regardless of where it came
from. That is strictly stronger, it is what the §5 dry run already measured — **0 blocked on
adventureastro, 22 on parkingwayastro** — and it brings the known bypass inside the rule
instead of outside it.

---

## 1. Context

B-2 established one authority for inline bidi isolation. It is a **convention**: nothing
checks it. Two facts make that unstable rather than merely incomplete.

`404.astro` hand-rolls a copy of the site nav instead of using `Header.astro`, so it emits
the phone number — two Bidi_Mirrored brackets — outside the formatter, and no gate, the
validator, or `astro check` perceives it. It is harmless today only because no `/ar/404`
route exists.

And ParkingWay ships **22** genuinely broken mirrored runs across its Arabic tree with zero
isolation anywhere. That is what an unenforced convention looks like at scale on a host
nobody is watching.

The obvious rule to write is *"no mirrored character outside `<bdi>` in an RTL document."*
That rule is wrong.

---

## 2. Why the simpler rule was rejected — measured, not argued

Every text node containing a `Bidi_Mirrored` character, across both Arabic corpora:

| | adventureastro `/ar/` (post-B-2) | parkingwayastro `/ar/` (12 pages, no formatter) |
|---|---:|---:|
| Mirrored-character text nodes | 4 | 75 |
| Flanked by the **same** strong type — **correct as-is** | 0 | **53** |
| Spanning a direction change, **isolated** | 4 | 0 |
| Spanning a direction change, **bare** — the real defect | **0** | **22** |

**The simpler rule would flag 53 correct runs out of 75 — roughly 70% false positives.**
Those 53 are not edge cases. They are ordinary content:

```
Via Falzarego n°91, 00054 Fiumicino (RM), Italia     ← all-Latin address, brackets between two L runs
… في موسم الذروة (يوليو-أغسطس، …                      ← Arabic parentheses around Arabic content
```

Both render correctly today and would render *worse* if isolated. A blocking gate with that
signal-to-noise ratio does not survive: it gets a suppression list, then an exemption
config, then `--no-verify`. The 22 real defects look like this instead — Latin inside
Arabic, brackets straddling the boundary:

```
اتجه إلى الوصول (ARRIVI)
```

### 2.1 The rule is derived from the algorithm, not from the corpus

This is what makes it durable and is the reason it is worth an ADR rather than a comment.

The discriminating clause is not an exception fitted to observed data. It is **UAX #9 rules
N1 and N2**, the same two rules that invalidated two entire hazard classes during B-2:

- **N1** — a neutral run flanked by the *same* strong type resolves to that type. Correct
  by construction; nothing to isolate.
- **N2** — otherwise it resolves to the *paragraph* embedding direction. That is the
  hazard, and mirrored characters make it visible.

B-2's census overturned its own starting model three times using exactly these rules: bare
Western digits are not a hazard (W2 — 101 false positives across both corpora), interior
spaces are not a hazard (N1 — 43 more), and the hazard is a property of the **document**
rather than the text node. The gate rule is the fourth application of the same reasoning,
and a rule derived from the algorithm keeps holding when the corpus changes.

### 2.2 The discriminating clause is unexercised on this host, and that is the point

**adventureastro's `same`-flank count is zero.** All four of its mirrored runs span a
direction change. A rule designed against this repository alone would have shipped the
coarse form, passed, and looked correct — until the first Arabic page carrying ordinary
parentheses, at which point it would have produced 53 false positives and been switched off.

Only ParkingWay exposes the distinction. That is a concrete argument for cross-host
measurement as a **design** input rather than a validation step, and it is the second time
in three phases that the second host changed a design (B-1: this host emits no `dir` on LTR
pages, ParkingWay emits an explicit one; only *effective* direction is portable).

---

## 3. Retrospective and prospective gates are different investments

Worth recording because the two justify themselves differently and should not be held to
the same standard.

| | Gate 4k (direction) | An isolation gate |
|---|---|---|
| Corpus on day one | 620 pages, 9 locales | **1 Arabic page** |
| What it did/does | **proved an existing migration** correct | **protects a future migration** |
| Value if the corpus never grows | high — it validates 620 pages | near zero |
| Found a live defect on landing | no (it found one under perturbation) | no — B-2 fixed them first |

4k was retrospective: direction was already pervasive, so it validated hundreds of pages the
day it landed. An isolation gate is almost entirely **prospective**. Its value is that when
the Arabic corpus grows from 1 route to 77, isolation cannot silently stop happening.

That is a legitimate reason to build a gate, but it is a different one, and the honest
framing matters: **this gate will be green on the day it ships and will stay green until
someone regresses.** A green run is not evidence it is working — a *perturbation* is, which
is why its fail-closed matrix carries more of the proof burden than 4k's did.

---

## 4. Scope — what the rule does not cover

On the 4k precedent, stated so nobody reads a green run as more than it is.

The rule covers mirrored characters at a direction change. It does **not** cover:

- **Edge neutrals generally.** B-2 measured **zero** across both corpora. Adding a rule for
  a class with no measured instance is the config-nothing-reads defect; it lands with the
  first measurement, not before.
- **Non-mirrored hazards** — a run needing isolation for reasons other than a visibly
  flipped glyph. Real in principle, unmeasured here.
- **Everything the presentation layer owns**: carousel geometry (B-5), unmirrored arrow
  glyphs (B-6), physical CSS properties (B-7). None is inline bidi semantics and none is
  reachable from rendered text.
- **`<title>`**, which accepts no elements, so markup isolation is impossible there
  (B-2 §4). The gate must not report what cannot be fixed by the mechanism it enforces.

**A page passing this gate may still be visually broken**, exactly as with 4k.

---

## 5. Implementation notes

- **Reads `dist/`, blocking, per-page.** The corpus is rendered text; the rule needs the
  document's direction, which only exists after render.
- **Only pages whose declared direction is RTL are in scope.** In an LTR document a mirrored
  character between differing strong types is the mirror-image case and is not what B-2
  measured; including it would assert an invariant no census supports.
- **Isolation is detected structurally**, not by tag name at the call site — the gate reads
  rendered output and must not care whether isolation arrived from `Bidi.astro`, a string
  helper, or hand-authored markup. Same division as 4k: verify rendered truth, not
  implementation strategy.
- **Dry run against both hosts, using the corrected rule:** adventureastro **0 blocked**
  (green), parkingwayastro **22 blocked** (red). The rule already discriminates correctly on
  a migrated host and an unmigrated one.

---

## 6. Why this is an instance of ADR-9

The gate needs to know which locales are RTL. That fact is owned by `LOCALES[].dir` and is
reachable through `host.direction`, which B-1 added to the adapter precisely so a consumer
would not have to restate it. An isolation gate that carried its own list of RTL locales —
or, worse, tested for Arabic script — would be the manifest-duplication defect wearing a
gate's name, and it would be wrong the day a second RTL locale registered.

**The gate asks the adapter which locales read right-to-left, and receives the answer.**

---

## 7. Open

- **Not implemented.** Recorded before implementation deliberately, so the rejected
  alternative is preserved with its measurement rather than reconstructed later from a
  passing gate.
- **`404.astro`** bypasses the shared chrome entirely and would be this gate's first real
  finding the day an `/ar/404` route exists. The fix is structural — use the shared
  `Header` — and is not the gate's business. It is also the counter-example that set the
  invariant's scope (§0.1): it is not a shared source, so the narrower phrasing would have
  exempted the one bypass anyone had actually found.
- **The `same`-flank population is unexercised here** (§2.2). Whichever host is used to
  develop the gate, its fail-closed matrix must include a correct Arabic-parentheses case,
  or the clause that makes this rule usable will itself be untested.

- **Test the gate DIFFERENTIALLY, against both algorithms.** The stronger form of the
  requirement above, and the one to write into the implementation brief: it is not enough to
  show the gate passes today's corpora, because **the rejected algorithm also passes
  adventureastro** — its `same`-flank count is zero, so both rules return 0 findings there
  and the corpus cannot tell them apart. The test must run the accepted and rejected rules
  over a corpus containing correct-flank cases and show they **disagree**: 22 vs 75 on
  parkingwayastro. That converts "the gate works" from an assertion about output into a
  demonstration that the implemented rule is the specified one and not the plausible
  alternative.

  This splits Track A into two deliverables that need different kinds of work:
  **(1) implement the invariant** — largely transcription from this ADR; **(2) construct the
  evidence that distinguishes it from the rejected invariant** — which requires importing or
  authoring a corpus this host does not contain. Only the first is transcription.

---

## 8. Implementation — what §1–§7 left open, and one figure corrected

Added when gate 4n landed. Both entries are things the ADR's prose did not determine and
implementation could not avoid deciding.

### 8.1 A digit run is a flank. §2 could not have been reproduced otherwise

§2 records that all four of adventureastro's mirrored-character nodes "span a direction
change". Those four nodes are the phone `(435) 219-9447`, **which contains no strong
character at all**. So whether they span a direction change depends entirely on a question
§2 never asks: does a run of digits count as a flanking type, or is it transparent?

Measured both ways before choosing, because the ADR's own numbers are the only arbiter:

| | transparent digits | digits are a flank |
|---|---:|---:|
| adventureastro nodes spanning a direction change | **0** | **4** ← §2 |

It is also right by the algorithm rather than merely by fit, which is what makes it
keepable. In an RTL paragraph rule **I2** raises EN and AN to an even (left-to-right) level,
exactly as it does L: a digit run is an LTR island inside RTL text. A bracket between Arabic
and a digit run therefore stands at a genuine direction change — which is what a reader sees
when the area code of a phone number lands at the far end of the line.

Pinned by `defect-digit-flank.html` in the fixture corpus, so the choice is a row someone can
argue with rather than a line of code someone has to notice.

### 8.2 §2's parkingwayastro split is 51/24, not 53/22

The classifier that produced §2 was a scratch script and is gone; only its numbers survived
into this ADR. Reproducing them was the first acceptance test for the implementation:

| | §2 recorded | gate 4n engine |
|---|---:|---:|
| adventureastro mirrored-character nodes | 4 | **4** ✔ |
| …flanked by the same strong type | 0 | **0** ✔ |
| …spanning a direction change | 4 | **4** ✔ |
| parkingwayastro mirrored-character nodes | 75 | **75** ✔ |
| …flanked by the same strong type | 53 | **51** |
| …spanning a direction change, bare | 22 | **24** |

Everything about this host reproduces exactly, and so does the foreign corpus's node total —
which is the number that says the two tokenizers agree about what a text node is. The split
differs by two nodes, and the two cannot be attributed: no artifact records which nodes the
original classifier put on which side. **The reproducible figures are now the figures**, and
`npm run test:4n` asserts the 75 rather than the split, so a future reader is not measured
against a number nobody can reproduce.

Recorded rather than quietly corrected because it is the fifth instance of this project's
recurring lesson: *a recorded size is a hypothesis about the measurement window, not a fact.*
The direction of the delta is also the safe one — the implemented rule blocks **more** than
the ADR recorded, not less — and it changes nothing about the decision, because the
difference that matters is 24 against the rejected rule's 75.
