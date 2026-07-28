# ADR-7 — Declared absence over optional presence

**Status:** IMPLEMENTED — AR-2 B-0, `72ef2ac`, 2026-07-28.
**Supersedes:** the totality assumption in gate 4j as shipped at P34.
**Context phase:** discovered by AR-1 (Arabic readiness), fixed before the AR-1
milestone commit so no commit landed red.

---

## 0. The one-line invariant

> **A registry that must be complete for *some* members must state which members
> it does not cover. Absence is illegal; declared absence is legal.**

Everything below is the argument for why the middle position — "absence is
allowed" — is the worst of the three, and why the check belongs in the module
rather than in a gate config.

---

## 1. Context

`GALLERY_TEXT` mapped each locale to its 105-slide homepage-gallery dictionary.
It was typed `Readonly<Record<Locale, GalleryDictionary>>` — a **total** map — and
gate 4j enforced the same totality at source level, with an explicit rationale:

> Every registered locale explicitly defines every gallery key.
> Fallback is an emergency runtime behavior, never a shipped state.

That invariant is correct and worth keeping. It was built at P34 to close a real
defect (D1): every locale had shipped English gallery captions because there was
nowhere for a translation to live. The type and the gate together made it
impossible to add a locale that silently inherited English.

The premise underneath it was never stated, and was false: **that every
registered locale renders the gallery.**

### 1.1 How the false premise surfaced

`MULTILINGUAL_HANDOFF.md` §7 stage 1 — the standing first step for every new
locale — says:

> Add the locale to `LOCALES` with an empty slug set in `LOCALE_SLUGS`. Confirm
> the build stays byte-identical (page count unchanged) **before any content
> lands** — proves the registry pattern needs zero other code changes for a new
> locale.

After P34 that step could not be executed. Registering a locale demanded 105
slide translations first. Nobody noticed for four phases because **no locale was
registered between P34 and AR-1.** Arabic was simply the next one through the
door; the defect is not Arabic's and any future LTR locale would have hit it
identically.

### 1.2 Two facts that had been treated as one

| Fact | Source of truth | True for `ar` at AR-1 |
|---|---|---|
| Locale is **registered** | `LOCALES` in `src/lib/i18n.ts` | yes |
| Locale **renders the gallery** | whether any page calls `renderGallery(locale)` | **no** — the only Arabic route is `/ar/cancellation-policy/`; there is no `/ar/` homepage |

`textFor()`'s English fallback can only ship if something renders. With no
homepage, `renderGallery('ar')` is never called, so there is no fallback to
prevent. The gate was enforcing a real invariant against a locale the invariant
could not apply to.

---

## 2. Decision

`GALLERY_TEXT` becomes partial and is **paired with an exemption map**. A
registered locale must appear in **exactly one** of them.

```ts
const GALLERY_TEXT: Partial<Readonly<Record<Locale, GalleryDictionary>>> = { en, es, …, zh };

/** Registered locales that render no gallery, each with the reason. */
export const GALLERY_EXEMPT: Readonly<Record<string, string>> = {
  ar: 'AR-1 pilot locale: the only Arabic route is /ar/cancellation-policy/, so no ' +
      'page calls renderGallery("ar"). Remove this entry together with the phase ' +
      'that adds an /ar/ homepage, and add GALLERY_TEXT_AR in the same change.',
};
```

Enforcement is **two-layered and in opposite directions**:

| Layer | When | What it proves |
|---|---|---|
| Gate 4j | source, pre-build | the partition is well-formed |
| `renderGallery()` throw | build, at the call site | the exemption's *claim* is true |

Gate 4j rejects, with the responsible key named in each message:

| Perturbation | Verdict |
|---|---|
| locale in **neither** map | ✖ *"appears in neither GALLERY_TEXT nor GALLERY_EXEMPT — add GALLERY_TEXT_AR … or declare it …"* |
| locale in **both** | ✖ *"cannot both render the gallery and not render it"* |
| exemption with an **empty reason** | ✖ *"an exemption with no stated reason is a suppression"* |
| exemption for an **unregistered** locale | ✖ *"a stale exemption hides nothing and misleads the next reader"* |

and prints the exempt set **on success**:

```
gate-4j: ✔ 105 slides x 8 gallery locales — 840 entries, complete (…);
         1 locale(s) render no gallery: "ar"
```

`renderGallery(locale)` throws if `locale in GALLERY_EXEMPT`, naming the map and
quoting the recorded reason.

---

## 3. The four questions this ADR exists to answer

### 3.1 Why gallery registration and locale registration diverged

They were never the same thing; they had merely never been observed apart.

A locale registry answers *"what languages does this site know about?"* — it is
the roadmap, and it is deliberately allowed to run ahead of content. That is the
entire design of `LOCALE_SLUGS` existence-awareness: a registered locale with an
empty slug set is invisible in hreflang, the switcher and every internal link,
and *that is a supported state*, exercised by every locale this project has
shipped.

A per-asset dictionary answers a narrower question: *"which locales render this
particular thing?"* Rendering is downstream of routes, and routes are downstream
of content. Every LTR locale reached full route coverage before anyone looked, so
"registered" and "renders the homepage" were extensionally equal for eight
locales running, and a total map encoded that coincidence as a law.

AR-1 broke the coincidence on purpose: a locale with **one** page, registered
solely to prove the direction plumbing works. The divergence is not an Arabic
quirk — it is what §7 stage 1 asks for, in every locale, on day one.

### 3.2 Why exemption is explicit rather than implicit

An implicit exemption — "not in the map means it doesn't need one" — is
**indistinguishable from the bug**. Both a locale that legitimately renders no
gallery and a locale whose dictionary someone forgot are absent from the map, and
no reader, tool or reviewer can tell them apart.

That indistinguishability *is* the P34 defect. Before P34 the absence of a
dictionary meant "silently inherit English", which is exactly what shipped and
exactly what the gate was built to end. Reintroducing silent absence in the name
of flexibility would have undone P34 while appearing to preserve it, because the
gate would still be there, still green, and no longer proving anything.

Requiring a written reason costs one line and buys three things:

- **It is falsifiable.** "No page calls `renderGallery("ar")`" is a claim about
  the world, and §3.4's runtime check tests it on every build.
- **It expires visibly.** The reason names the condition under which it should be
  deleted ("the phase that adds an `/ar/` homepage"), so the next reader inherits
  the intent rather than re-deriving it.
- **It is reviewable in a diff.** Adding a locale to `GALLERY_EXEMPT` is a
  conspicuous, argued line in a pull request. Omitting a locale from
  `GALLERY_TEXT` is a non-event.

### 3.3 Why partitioning is preferable to optionality

Three positions were available:

| | Rule | Failure mode |
|---|---|---|
| **Totality** *(P34–AR-1)* | every registered locale must have a dictionary | **False failures.** Blocks registration-before-content, i.e. §7 stage 1, for every locale |
| **Optionality** | a dictionary is nice to have | **Silent failures.** The P34 defect, restored. Cannot distinguish "exempt" from "forgotten" |
| **Partition** *(decided)* | exactly one of {has dictionary, declared exempt} | a new locale costs **one declared line**, and every other state is a hard error |

Optionality looks like the moderate choice and is the only one with *no* failing
state — which is precisely the objection. A rule that nothing can violate proves
nothing. Totality and partition both fail closed; they differ only in whether
"this locale renders nothing" is expressible. Adding that one expression is the
whole change.

The partition is also **strictly stronger than the totality it replaced**, in a
way worth noting: totality never checked for a dictionary belonging to a locale
the host does not register, and had no runtime component at all. The partition
rejects stale entries in both maps and enforces the exemption at the call site.

### 3.4 Why this is a framework invariant, not a gate rule

Three reasons, in increasing order of importance.

**(a) The declaration has nowhere else to live.** Gate 4j deliberately has no
config file — F1 §1.1, recorded in the host manifest as `policy.gates.parity:
null`. Inventing one to hold a list of exempt locales would create policy for a
gate designed to have none, and would separate the declaration from the module it
describes. Colocating it with `GALLERY_TEXT` means a reader editing one sees the
other.

**(b) A gate is skippable; a call site is not.** `npm run build` runs
`gates:src && astro build && gates:dist`, but `astro build` alone is one keystroke
away, and a CI path, a preview deploy or a `--` flag can reach the renderer
without reaching the gate. An invariant enforced only by a checker that can be
routed around is a convention. The `renderGallery()` throw holds at the point
where the damage would occur, so the guarantee survives every path to the
renderer.

**(c) The gate can only check the declaration's *shape*; the runtime checks its
*truth*.** Gate 4j is a source gate. It cannot see which locales have a homepage
— that is a route fact, and resolving it at source level would need the adapter to
expose the host's content registry (`LOCALE_SLUGS`), a real F-series extension.
So the gate verifies that the partition is well-formed and the runtime verifies
that the exemption is *honest*: the moment somebody adds `/ar/index.astro`, the
build stops with a message naming the map, instead of shipping 105 English
captions under an Arabic page.

That division is the reusable part. **The gate proves the declaration is
well-formed. The code proves it is true.** Neither alone is sufficient, and the
half that must not be skippable is the half that belongs in the module — which is
what makes this an invariant of the system rather than a rule of one checker.

---

## 4. Generalization — where this recurs

This is not about galleries. The shape is: **a per-locale registry that must be
complete for the locales that consume it, and empty for the ones that do not.**
The repository already contains others, currently expressing incompleteness by
falling back silently:

- `page-content/*.ts` `getBodyHtml(locale)` dispatchers — an unlisted locale
  returns English. Same failure mode, not yet gated.
- `UI_STRINGS` in `ui.ts` — `t()` fails soft by design, which is the Gate 4a
  failure the `ja` locale shipped 57 pages on.
- Any future per-locale asset: OG images, feeds, sitemaps, structured data.

The gate configs already reach for the same idea from the other direction:
`state: "complete" | "in-progress"` declares that a locale's coverage is partial
so its findings are advisory. That is declared incompleteness at locale scope;
this ADR is declared absence at asset scope. They should converge, and F2's ADR-2
(`state` as a locale-registry fact in the manifest) is where.

**Not attempted here**, deliberately: retrofitting the other registries. Each
needs its own measurement of what "renders" means, and bundling them into a
blocker fix would have made an unreviewable change.

---

## 5. Consequences

- Registering a locale costs **one `GALLERY_EXEMPT` line** at §7 stage 1, removed
  in the phase that adds its homepage. Handoff §7 stage 1 is executable again.
- **No behaviour change and no rendered-output change.** `dist/` was byte-identical
  across the fix; the enabling commit landed with `GALLERY_EXEMPT` empty and
  changed nothing.
- Gate 4j's success line now reports gallery locales and exempt locales
  separately, so "8 locales" no longer silently means "all registered locales".
- One new way to be wrong: an exemption that has become false without anyone
  noticing. Mitigated by (b)/(c) above — the runtime throw is what makes the
  window closeable rather than merely narrow.

## 6. Rejected alternatives

| Alternative | Why rejected |
|---|---|
| `Partial<Record<…>>` alone | §3.3 — restores the P34 silent-inheritance defect while leaving a green gate in place to imply otherwise |
| Author `GALLERY_TEXT_AR` (210 strings) | Satisfies both mechanisms with no architecture change, but is corpus authoring for a page that does not exist, unreviewed by a native speaker, and leaves the defect in place for the next locale |
| Exemption list in a new `4j-gallery.json` policy file | §3.4(a) — creates config for a gate designed to have none, and separates the declaration from the module |
| Derive "renders the gallery" from `LOCALE_SLUGS` in the gate | The correct long-term answer, but requires the host adapter to expose the content registry. A real F-series extension, not a blocker fix. Noted in `AR2-backlog.md` |
| Let `renderGallery()` return `''` for an exempt locale | Silent again. A missing carousel is less visible than a crash and would ship |

## 7. What would reverse this ADR

- The adapter gains a content-registry accessor, letting gate 4j resolve "has a
  homepage" at source level. The exemption map then becomes derivable and the
  explicit declaration is redundant — though the runtime throw should survive, per
  §3.4(b).
- Or: the gallery stops being per-locale (a single shared dictionary, or captions
  moved into the slide table), at which point the registry it guards is gone.
