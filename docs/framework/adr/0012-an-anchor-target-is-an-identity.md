# ADR-12 — An in-page anchor target is an identity, not a heading

**Status:** **IMPLEMENTED** as gate **4s** (`scripts/gate-4s-fragments.mjs`), blocking, wired
into `gates:dist`; discrimination proof is `npm run test:4s`. The live violation §3 records is
**fixed** — corpus reports **0 unresolved fragments across 669 pages, 2 807 checked**. §6
records what implementation found, including one correction to this ADR's own argument.
Originally filed DECIDED-not-implemented on the 0010 precedent, because the rule that was
**rejected** here is the rule that was proposed, and it finds nothing — that is the whole
content of the decision and it is unrecoverable from a passing gate afterwards.
**Context phase:** AR-2 Track E batch 7a
([`AR2-rollout-batch-brief.md` §1.48](../../rtl/AR2-rollout-batch-brief.md)) authored the
first Arabic hub whose pages link to their own sections, and recorded an authoring rule for
it in an Arabic brief.
**Why it is filed here and not there:** the failure mode has nothing to do with direction,
script, or rendering. It is reachable by any locale that translates a heading, and by the
**source locale**, which cannot translate anything. Filed as framework documentation under
the ADR-6 rule — a second host with localized content and in-page anchors hits this before
it hits anything in `docs/rtl/`.

---

## 0. The one-line invariant

> **Every in-page anchor target must resolve on the page that links it, in every locale.**

The load-bearing word is **resolve**. The rule as first proposed said *preserve the anchor
identity when translating a heading*, and §2 is the measurement showing that rule finds
nothing on this corpus while the real breakage sits outside it.

### 0.1 Why it says *resolve* and not *survive translation*

The translation-scoped phrasing is how the problem was found, and it is a correct authoring
instruction. As an **enforceable invariant** it is wrong in the way that matters, and the
counter-example is already in the corpus:

**`#tours` is dead in English.** It is linked 2 696 times across 572 of 669 rendered pages,
in all nine locales, and `id="tours"` exists on **zero** pages. No translation is involved —
the English source emits it, every locale inherits it, and a rule scoped to *translation*
exempts precisely the defect anyone has actually found.

This is the same move as ADR-10 §0.1, where scoping the isolation rule to *shared sources*
would have exempted `404.astro`, the one confirmed bypass. A rule scoped to the mechanism by
which a defect was discovered tends to exempt the defects that arrived by another route.

---

## 1. Context

A markdown heading's `id` is generated from its text. Translating `## Decision Framework`
therefore changes the generated slug and silently breaks every `href="#decision-framework"`
pointing at it. Nothing in the pipeline reports this: it is not a direction question (4n), not
a character-policy question (4q), not a terminology question (4i), and not a link-allow-list
question (4b/4g, which resolve *routes*, not fragments). The page builds, the gates pass, the
link does nothing when clicked.

Batch 7a met this class for the first time and handled it correctly — the anchor **target**
is authored as an explicit `<h2 id="decision-framework">إطار القرار</h2>`, and a target on a
wrapper keeps its id there. The question this ADR answers is what the general rule is.

---

## 2. Why the proposed rule was rejected — measured, not argued

Every same-page `href="#…"` in the rendered corpus, checked against the ids present on that
page. 669 pages, all nine locales:

| locale | broken same-page anchors | attributable to translation |
|---|---:|---:|
| en | 1 | — |
| de · es · fr · it · ja · pt · zh | 1 each | **0** |
| ar | 0 | **0** |
| **total** | **8** | **0** |

**Zero.** All eight are the same target, `#tours`, on the one page per locale that carries it.
Not one is a translated-heading failure.

The reason is that the convention the batch-7a note describes was **already universal**. Every
locale's copy of `one-day-adventure-vernal` — `de`, `es`, `ja`, `zh` included, all authored
long before Arabic existed — carries the identical four explicit ids against the identical four
English targets:

```
href="#alternative-one-day-plans"  href="#couples-version"
href="#decision-framework"         href="#family-version"
id="alternative-one-day-plans"     id="couples-version"
id="decision-framework"            id="family-version"
```

So the proposed rule would have shipped, returned green on day one, and been recorded as
protecting something. It protects a convention that eight locales already follow and that no
author has yet broken. That is a legitimate prospective gate in the ADR-10 §3 sense — but it
is **not** the rule that finds the live defect, and the two were about to be conflated.

### 2.1 `ar`'s zero is an absence, not a result

`ar` reports 0 broken anchors. The reason is that **`dist/ar/index.html` does not exist** —
the Arabic rollout is at 50 pages and has no homepage yet. The page that carries the defect in
the other eight locales is not there to carry it. When the Arabic homepage lands it inherits
the same dead footer links.

Recorded because it is this project's recurring failure mode wearing new clothes: *a zero that
means "not measured" reads identically to a zero that means "measured clean."* The audit had to
be asked which pages it did **not** see before its cleanest column could be interpreted.

### 2.2 The instrument's first scope was too narrow by two orders of magnitude

The audit above reads same-page `href="#x"` only. In that window the defect is **8 pages**.

The footer emits the cross-page form on every other route — `/de/#tours`, `/es/#tours` — which
points at the same non-existent target on the localized homepage and was **invisible** to the
first instrument. In the corrected window the defect is **2 696 links across 572 pages**.

The finding did not change; the window did. Sixth recorded instance of *a recorded size is a
hypothesis about the measurement window, not a fact* (METHOD.md; ADR-10 §8.2 is the fifth).

---

## 3. The live defect, and why careful local reasoning missed it

`src/pages/{locale}/index.astro` builds a footer list, "Our Trails", of five hardcoded entries:

```js
{ href: '#tours', label: "Doc's Beach" },
{ href: '#tours', label: 'Moonshine Arch' },
{ href: '#tours', label: 'Ashley Gorge' },
{ href: '#tours', label: 'Outlaw Trail' },
{ href: '#tours', label: 'Asphalt Ridge' },
```

and `Footer.astro:62` composes `` `${fh('')}#tours` `` for every other page. No `id="tours"`
has ever existed in `dist/`.

The sharpest part is `src/pages/ar/cancellation-policy.astro:14`, where an author reasoned
about this exact link and wrote:

> *The Footer links stay on ENGLISH routes on purpose (Gate 4b): this is the only Arabic page
> that exists, so `/ar/#tours` would be a broken link, not a fallback.*

That reasoning is locally correct and globally wrong. It establishes that the **route** half
of `/ar/#tours` would not resolve, and resolves it. It never asks whether the **fragment**
half resolves — and the fragment had already never resolved, on the English route the
workaround redirects to. A route-existence check and a fragment-existence check are different
questions, and the framework had an answer for only one of them.

**Remediation is an owner decision and is not taken here.** Either a `tours` landing section
exists and lost its id, or these five links want a real route; both are content calls.

---

## 4. Scope — what the rule does not cover

- **Cross-document fragments** (`/de/guides/x#section`) need the target page rendered before
  the fragment can be checked. In scope for the invariant, more expensive for an instrument.
- **Anchors injected at runtime.** Verified absent here (no `location.hash` handling, no
  `getElementById` on the homepage or footer), so the rendered check is sound *on this host*.
  A host with client-side routing needs a different instrument, not a different rule.
- **Whether the target is the *right* section.** A resolving anchor pointing at the wrong
  heading is a content defect, invisible to this rule.
- **Heading-slug stability across a rewrite in the same locale** — an English editorial pass
  that retitles a heading breaks its anchors exactly as a translation does. The invariant
  already covers it; worth stating because the proposed phrasing did not.

---

## 5. Consequences

- The authoring instruction stands and should be written down, because a universal convention
  that nothing enforces is one author away from being broken — that is the ADR-10 §1 argument
  and it applies unchanged.
- It belongs in a locale-neutral contract, not an Arabic brief. It applies to `de`, `es`, `pt`,
  `ja`, `zh` and to every future locale, and §3 shows the live instance needs no locale at all.
- An implementing gate should assert **resolution**, and its fail-closed matrix must contain a
  translated-heading case *and* a never-existed-target case, because this corpus contains only
  the second and cannot distinguish the two rules on its own. Same differential requirement as
  ADR-10 §7, for the same reason.

---

## 6. Implementation — and a correction to §2

Added when gate 4s landed and `#tours` was remediated.

### 6.1 ⚠ §2 was right about the count and wrong about the cause

§2 concluded that the anchor-identity convention "was already universal" because eight locales
carry identical explicit ids. **The convention was never practiced. It was a side effect.**

`de` · `es` · `ja` · `zh` preserve `id="1-docs-beach"` on the trail-systems page because they
leave the heading `## 1. Doc's Beach` **verbatim** — trail names are proper nouns under the
terminology lock, so nothing in that heading is translatable and the slug survives by
accident. No author was applying an anchor rule; no author had to.

Arabic wrote `## المسار 1: <bdi>Doc's Beach</bdi>` — the classifier-noun-before-a-Latin-name
pattern, which is **correct Arabic authoring** and is a rule in its own brief. The slug became
`المسار-1-docs-beach`. All seven `<h2>` ids on that page diverge in `ar`, and in `ar` alone.

So the corpus contained a live instance of the translated-heading class after all. §2 could not
see it for a reason worth recording: **nothing linked those anchors**, so a resolution audit
found nothing to report. The class was latent, and the obvious remediation for `#tours` —
point the five footer links at the five trail sections — is precisely what would have made it
live, in the one locale under active rollout.

This strengthens rather than weakens the ADR. A convention held up by an unrelated policy is
not a convention, and the first locale whose *correct* authoring rules collided with it broke
it immediately.

### 6.2 What was changed

- Five `ar` headings on `utv/best-utv-trails-vernal` carry explicit English ids. The two
  remaining `<h2>`s on that page keep Arabic slugs and are **left alone**: nothing links them,
  so they are not anchor targets, and the invariant is scoped to targets. Gate 4s will report
  them the day something does.
- The curly apostrophe in `Doc’s` is authored **literally** in the Arabic source. Converting a
  markdown heading to an `<h2>` moves its text out of markdown, where smartypants would no
  longer rewrite `'` → `’`, and this project has already been bitten once by a `Doc's Beach`
  apostrophe form (E-4). Authoring `’` directly makes the output identical under either
  behaviour. Verified: rendered text and the `4q` `ar` character count are unchanged.
- `#tours` → the five per-trail fragments (footer default, 8 homepage overrides), and the
  separate "Our Tours" link family → `/{locale}/utv/`, which carries no fragment and so leaves
  this gate's scope entirely. 41 href values in 41 files.

### 6.3 The gate checks four times as much as the defect suggested

| | before | after |
|---|---:|---:|
| fragments checked | 724 | **2 807** |
| unresolved | **572** | **0** |

The check count quadrupled because five links that all pointed at one dead target now point at
five live ones. Worth stating because it is the inverse of the §2.2 lesson: there, a narrow
window under-reported a defect; here, fixing the defect widened what the gate can see. **The
gate's coverage is a function of the corpus's link structure, not of the gate.**

### 6.4 Every advisory in the suite was unchanged

4f 56 · 4h 1922 · 4i 4 locks / 20 occurrences · 4g 47265 anchors / 515 candidates · 4q `ar`
1 443 814 chars — all identical to batch 7a's recorded baseline. A change touching 41 href
values and 5 heading ids **should** move nothing else, and the batch-4 rule (*diff the advisory
deltas*) is how that was established rather than assumed.
