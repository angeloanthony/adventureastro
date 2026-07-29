# Architecture decision records

Filed per **F2 ADR-6** — one file per ADR, numbered, status header.

**Numbering starts at 0007 on purpose.** ADR-1 through ADR-6 were filed whole in
[`../F2-architecture-decisions.md`](../F2-architecture-decisions.md) and have not
yet been split into this directory; ADR-6 itself records that split as
outstanding. Splitting them is a documentation change with its own review surface
and is deliberately not bundled into an unrelated phase. Until it happens, the
series is continuous but lives in two places, and this note is the pointer
between them.

| ADR | Title | Status |
|---|---|---|
| 1–6 | Package boundary · Host adapter and manifest · Census placement · Shared render index · Gate 4j generalization · Documentation home | In `../F2-architecture-decisions.md`. ADR-2 implemented (F4 P1); the rest decided |
| [0007](0007-declared-absence-over-optional-presence.md) | Declared absence over optional presence | **IMPLEMENTED** (AR-2 B-0, `72ef2ac`) |
| [0008](0008-hreflang-is-two-fields.md) | `hreflang` is two fields | **DECIDED, not implemented** |
| [0009](0009-registry-indirection-over-manifest-duplication.md) | Registry indirection over manifest duplication | **IMPLEMENTED** for direction (AR-2 B-1, `11b83d3`); descriptive of `locales.registry`/`policy`/`census` as shipped; one violation outstanding |
| [0010](0010-isolation-is-a-flanking-type-rule.md) | Bidi isolation is a flanking-type rule, not a character rule | **IMPLEMENTED** (AR-2 Track A, gate 4n, `aa92c3b`) |
| [0011](0011-diagnostic-substitution-runs-in-a-detached-worktree.md) | A diagnostic that violates a repository invariant runs in a detached worktree | **IMPLEMENTED** (AR-2 Track B substitution build) |

**The filing rule (ADR-6):** *if a second host would need it to adopt the
framework, it is framework documentation.* The first three ADRs here pass that test —
0007 describes a registry shape any host with per-locale assets will hit, 0008
describes a coupling any host that reuses one locale tag for SEO and formatting
already has, whether or not it has noticed, and 0009 answers a question every host
with a locale registry must answer to write a manifest at all.

**0010 is the first ADR written *before* its implementation**, deliberately: its whole value
is preserving the rule that was measured and **rejected** (a 70% false-positive rate on a
real corpus), which would be unrecoverable from a passing gate afterwards. It is also the
clearest example of the pattern running through F3, F5, B-1 and B-2 — the measurement made
the problem *smaller*, and the ADR records the reduction rather than the result.

**⚠ 0011 is the weakest fit for the filing rule, and is filed here deliberately
anyway.** Its forcing constraint — an auto-commit bot that pushes the working tree —
is a property of *this* installation, not of any host adopting the framework. What
generalizes is the half above it: substitution is now a standard verification
technique here (B-1 for a gate, Track B for presentation), and a host adopting it
needs to be told *where* to run it before it runs it in the wrong place. Filed as
framework documentation on that basis; if the technique is ever dropped, this ADR
goes with it rather than becoming site lore.

**0009 is the first ADR here that is mostly retroactive.** It names a rule four
shipped sections already follow, having been argued locally four times and
generalized none. That is deliberate: a pattern is worth a decision record once it
has been applied enough times to state its *discriminator* rather than its
examples, and the fourth application (direction, B-1) was the first to a fact the
host registry already carried. It is also the only ADR here that records a **live
violation of itself** (`script`, three configs, two vocabularies) rather than a
clean implementation.
