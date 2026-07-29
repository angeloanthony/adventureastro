# ADR-10 — Bidi isolation is a flanking-type rule, not a character rule

**Status:** DECIDED, not implemented. Records the invariant a future isolation gate must
enforce, and the simpler rule that was measured and rejected.
**Context phase:** AR-2 B-2 built the shared bidi formatter
([`AR2-B2-bidi-formatter.md`](../../rtl/AR2-B2-bidi-formatter.md)). Nothing enforces it, and
`404.astro` already bypasses it.
**Relation to ADR-9:** an instance of it. The gate must obtain each locale's direction from
the registry through the adapter, never assume it — see §6.

---

## 0. The one-line invariant

> **In a document whose declared direction is RTL, no shared source may emit a mirrored
> character whose flanking strong types differ, outside an isolated run.**

The load-bearing clause is *whose flanking strong types differ*. Without it the rule is
wrong on real corpora, and §2 is the measurement that shows by how much.

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
  `Header` — and is not the gate's business.
- **The `same`-flank population is unexercised here** (§2.2). Whichever host is used to
  develop the gate, its fail-closed matrix must include a correct Arabic-parentheses case,
  or the clause that makes this rule usable will itself be untested.
