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

**The filing rule (ADR-6):** *if a second host would need it to adopt the
framework, it is framework documentation.* Both ADRs here pass that test — 0007
describes a registry shape any host with per-locale assets will hit, and 0008
describes a coupling any host that reuses one locale tag for SEO and formatting
already has, whether or not it has noticed.
