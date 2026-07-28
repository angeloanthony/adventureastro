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

**The filing rule (ADR-6):** *if a second host would need it to adopt the
framework, it is framework documentation.* All three ADRs here pass that test —
0007 describes a registry shape any host with per-locale assets will hit, 0008
describes a coupling any host that reuses one locale tag for SEO and formatting
already has, whether or not it has noticed, and 0009 answers a question every host
with a locale registry must answer to write a manifest at all.

**0009 is the first ADR here that is mostly retroactive.** It names a rule four
shipped sections already follow, having been argued locally four times and
generalized none. That is deliberate: a pattern is worth a decision record once it
has been applied enough times to state its *discriminator* rather than its
examples, and the fourth application (direction, B-1) was the first to a fact the
host registry already carried. It is also the only ADR here that records a **live
violation of itself** (`script`, three configs, two vocabularies) rather than a
clean implementation.
