# ADR-9 — Registry indirection over manifest duplication

**Status:** IMPLEMENTED for direction — AR-2 B-1, `11b83d3`, 2026-07-28.
Retroactively descriptive of `locales.registry`, `policy` and `census` as already
shipped. **One known violation outstanding** (§6.2).
**Relation to ADR-7:** adjacent, not overlapping. ADR-7 governs whether a registry
may be *incomplete*. This governs *which artifact is the authority* in the first
place. A registry can satisfy one and violate the other.
**Context phase:** named while writing AR-2 B-1, which applied it for the fourth
time and was the first time it was applied to a fact the host registry already
carried in a field the framework had never read.

---

## 0. The one-line invariant

> **The manifest declares where to obtain a fact the host already owns; it never
> restates one. It may declare a fact only when no other artifact in the host is
> its authority.**

---

## 1. Context

`host-manifest.json` answers *"what kind of host is this?"*. Four sections have now
been designed, and each faced the same fork: **carry the fact, or point at whatever
already owns it.** Each chose to point, for reasons written down locally and never
generalized:

| Section | The fact | Where the authority lives | What the manifest holds |
|---|---|---|---|
| `locales.registry` | which locale codes exist | `LOCALES` in `src/lib/i18n.ts` | module, binding, `codeField` |
| `policy` | what a gate's rules *are* | `i18n-gates/*.json` | a directory and filenames |
| `census` | measured counts | machine-written `census/*.json` | a directory and filenames |
| `locales.registry` | each locale's direction | `LOCALES[].dir` | `directionField` *(B-1)* |

Gate 4j is a fifth instance one layer out: it asks the adapter which locales must
have a gallery dictionary rather than reading a list from config, which is why
registering `ar` made it fire at all.

Four independent decisions with the same shape is a rule. This ADR names it, and —
more usefully — states the discriminator, because "never duplicate" is the wrong
version of it and would have produced two wrong sections (§4).

---

## 2. The discriminator

Not *"is this data?"* and not *"could it be duplicated?"* but:

> **Does some artifact inside the host already own this fact?**
>
> - **Yes** → the manifest holds a pointer. Never a copy.
> - **No** → the manifest is the authority and states the fact outright.

Applied, this cleanly separates sections that look alike:

- **`locales.registry.codeField` → pointer.** `LOCALES` owns the codes.
- **`locales.registry.directionField` → pointer.** `LOCALES[].dir` owns direction,
  and `BaseLayout` reads it there.
- **`policy.dir` + `policy.gates` → pointer.** The gate configs own their rules; a
  marker, a lock or a seam rule appearing in the manifest is the section absorbing
  an authority that exists elsewhere.
- **`routes.output`, `entryPoint`, `exempt` → declared outright, correctly.**
  Nothing else in the host declares where rendered output lives or which route a
  reachability walk starts from. There is no registry to point at, so the manifest
  *is* the authority — which is exactly why an undeclared `entryPoint` is an error
  rather than a guess.
- **`locales.entries[code].role` → declared outright, correctly.** The registry
  carries no role. The manifest is its only home.

`routes` and `role` are the reason the rule is phrased as a discriminator rather
than a prohibition. Under a naive "the manifest must only ever point", both would
be violations, and both are correct as they stand.

---

## 3. The case that named it — direction (B-1)

Gate 4k needs each locale's declared direction. Two shapes were available.

**Rejected — `locales.entries[code].dir`.** It would have worked. Every value would
have been right on the day it was written, and the section's existing `$doc` says
why it is still wrong: *"`entries` adds only the framework facts the host registry
does not carry."* Direction is carried, in the field the layout itself reads.

The failure mode is specific and worth stating, because it is not "the copy goes
stale" — it is worse than that. A gate reading a manifest copy verifies **the
framework's transcription of the fact instead of the fact**. If `LOCALES[].dir`
said `rtl` and the manifest copy said `ltr`, a page rendering LTR would pass: it
would agree with the copy the gate consulted, while contradicting the value that
actually reached `<html>`. The gate would be green, self-consistent, and blind to
the exact defect it was built for.

**Chosen — `locales.registry.directionField: "dir"`**, beside `codeField`. The gate
reads direction from the same field the layout reads it from. There is one
authority, consulted twice.

This is also what makes the substitution test meaningful: flipping `de` to `rtl` in
`LOCALES` — one line, no other edit — moved all 77 rendered pages *and* moved the
gate's expectation, together. Under a manifest copy that same edit would have
turned the corpus red, and the "fix" would have been to update the copy, which is
the maintenance tax announcing itself as a bug.

---

## 4. Why "never duplicate" is the wrong rule

`locales.entries` **is** a second list of locale codes. It is not a violation, and
the reason is recorded in the manifest already:

> A CHECKED second list is not a second source of truth.

The adapter asserts `keys(entries) === codes(registry)` on every run and fails
closed on drift, naming both directions. The list cannot be stale, because staleness
is a build failure.

So restatement is legal exactly when a mechanical assertion collapses it back to one
authority. The rule is not *"never restate"* — it is *"never restate **unchecked**"*.

That refinement has teeth in both directions. It permits `entries`. And it disposes
of the obvious objection to §3: *"why not put `dir` in entries and assert it matches
the registry?"* Because once you are asserting equality with the registry on every
run, the copy contributes nothing but a second place to edit. The assertion is doing
all the work the copy claimed to do. Point at it instead.

---

## 5. The fail-closed corollary

A pointer can dangle. When it does, the answer is a refusal, never a default:

- **`directionField` undeclared** → `HostDirectionError`, exit 2: *"the host
  manifest's locales.registry names no `directionField`, so `src/lib/i18n.ts` cannot
  be asked which way a locale reads."*
- **declared, but a locale carries no legal value** → exit 2, naming the locale and
  the value it found.

An invented `ltr` default would make gate 4k approve an RTL locale rendering
left-to-right, by agreeing with its own invention. This is the same argument the
manifest already records for `routes.entryPoint` — *"a validator that invented an
entry point would silently report a whole site orphaned, or silently report nothing,
depending on which guess it made"* — and its generality is part of why this ADR is
worth filing: **the cost of a wrong default is a silent wrong answer, and pointer
indirection is what makes that cost avoidable rather than merely regrettable.**

Resolution is lazy and validation is eager-once, for a reason that generalizes too:
gates 4f–4j resolve the same host and have no business with direction, so an
undeclared field must not break them at `resolveHost()`. The refusal happens on
*ask*. Once asked, every locale is validated together — a partial answer is how one
locale silently loses its direction.

---

## 6. Evidence: both failure modes are live in this repository

The argument above is not hypothetical. Each half has a measured instance.

### 6.1 Unchecked duplication goes stale and nothing notices

```js
// astro.config.mjs:22
locales: ['en', 'es', 'it', 'pt'],
```

**Four of nine.** It has been wrong since `fr` landed and has survived `de`, `ja`,
`zh` and `ar`. Nothing reads it against `LOCALES`, so nothing has ever failed. This
is the canonical specimen the manifest's own `$doc` cites, and it is still there.

### 6.2 Duplicated copies drift into *incompatible vocabularies*

`script` is declared per locale in three gate configs — 24 declarations of one fact.
Counted today:

| Config | `zh` | `ja` |
|---|---|---|
| `4g-anchors.json` | `han` | `japanese` |
| `4i-glossary.json` | `han` | `japanese` |
| `4h-seams.json` | **`cjk`** | **`cjk`** |

The same fact about the same locales, in two vocabularies that do not agree on how
many distinctions exist. Schema v1 already retires the coarse `cjk` in favour of the
fine set, and 4h has not migrated. The manifest's `$doc` correctly declines to add
`script` to `entries` *before* those reads migrate — *"adding it here before those
reads migrate would put one fact in four places and make the measured drift worse,
not better."*

**This is the outstanding violation of this ADR**, and it is a genuine one: the
authority for "what script does this locale use" is currently three configs that
disagree. Note that §2's discriminator does not resolve it by itself — no artifact
in the host owns `script` today, so the fix is not merely "point at the registry".
Something must first *become* the authority. That is a real phase, not an edit, and
this ADR scopes it rather than performing it.

---

## 7. What this is not

**Not the structure-versus-procedure rule.** The manifest also declares *what exists
and how it is organized*, never *how to recover it from bytes* — no regex, no AST
node, no traversal rule. That is a different axis with a different test (*"would
switching the adapter from regex to AST require editing this file?"*). `codeField`
and `directionField` satisfy both rules, which is easy to mistake for one rule. It
is not: `routes.output` satisfies the procedure rule while being a declared fact
rather than a pointer, and a hypothetical `entries[code].dir` would satisfy the
procedure rule while violating this one. Keeping them apart is the same discipline
that split ADR-7 from ADR-8.

**Not ADR-7.** ADR-7 asks whether a registry may omit a member, and answers: only if
the omission is declared. This asks which artifact is the authority for a fact at
all. `GALLERY_EXEMPT` satisfies ADR-7 while being, correctly, manifest-external
data the framework never copies.

**Not an argument against configuration.** Hosts must declare things. The claim is
narrower: when the host already has an authority, the manifest's job is to name it.

---

## 8. How to apply it

When a phase needs a new host fact, in order:

1. **Find the authority.** Does anything in the host already own this fact — a
   registry, a config file, a producer's output? Whatever the *implementation* reads
   is the authority, not whatever is most convenient to parse.
2. **If one exists, point at it.** Add a field naming what the host calls it, beside
   the existing pointers. Never a value.
3. **If none exists, declare it — and say so.** The manifest is then the authority
   and its absence must be an error, not a default.
4. **If you find yourself restating, demand the assertion.** A second list is
   allowed only where a mechanical check collapses it every run. If you are writing
   that check anyway, delete the copy and point instead (§4).
5. **Make a dangling pointer refuse.** Name the field, the artifact and the locale
   in the message (§5).

**Adoption test (ADR-6):** *would a second host need this to adopt the framework?*
Yes. Any host with a locale registry must decide whether the manifest describes its
locales or points at them, and the wrong answer produces a framework that
successfully validates its own copy of the host.

---

## 9. Open items

- **§6.2 `script`** — three configs, two vocabularies, no authority. Needs a phase
  that establishes one before any pointer can exist.
- **§6.1 `astro.config.mjs:22`** — a live stale list, unchecked, four of nine. Out of
  scope for the framework (it is Astro's own config), but it is the standing example
  and should either be checked or removed.
- **`state`** — ratified for `locales.entries` by F2 ADR-2 and still declared in gate
  configs. Same shape as `script`; same prerequisite.
