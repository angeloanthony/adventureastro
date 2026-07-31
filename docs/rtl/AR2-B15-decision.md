# AR-2 B-15 — the FAQ rendering architecture

**METHOD citation:** rules 1 · 3 · 8 · 11 · 15 · 18 (`docs/framework/METHOD.md`).

**Status:** **RESOLVED.** Decided `644c21e`, owner answered §8, implemented in two commits —
`f327d72` (the contract) and `9695f05` (the corpus). §9 records the landing.
**Baseline:** `7a2c74f` (E-1). **E-2 is unblocked.**

---

## 1. The collision, restated precisely

[`FaqAccordion.astro:13`](../../src/components/content/FaqAccordion.astro#L13) renders
`<div class="faq-answer">{a}</div>`. Astro escapes an interpolated expression, so markup
written into `faq[].a` arrives as literal text. Three requirements meet there and any two
can hold:

| | Requirement | Source |
|---|---|---|
| **R1** | a mirrored character at a direction change is isolated | ADR-10, policy §5.2 |
| **R2** | `(435) 219-9447` and `$349` appear **verbatim**, symbol-first | policy §3.2 |
| **R3** | interpolated content is HTML-escaped | the delivery mechanism |

E-1 established this by having gate 4n fail on it. Since then the ground has moved twice,
and both moves are inputs to the decision rather than footnotes to it.

**The first: R1 is understated.** [E-1b](AR2-E1b-currency-probe.md) measured the same FAQ
answers in a browser. The bare `$349` and `$125` render **`349$`** and **`125$`** — the
symbol on the wrong side of its digits, live, on the only Arabic prose route. So B-15 is
not a design task guarding a hypothetical. **Two visible defects are shipping today, and
R2's own subject is one of them**: policy §3.2 requires the price symbol-first, the source
complies, and the delivery discards the compliance. Rule 11 in its exact form — what
survives is decided by how the text is delivered, not by what it says.

**The second: the recorded exposure was measured on the wrong window.** E-1 §3.2 sized
this defect from the **English** sources — *8 of 9 pilot files carry parentheses in FAQ
answers*. A census over all 449 `faq` blocks (§4.1) shows the one Arabic block that
actually exists carries **zero** mirrored characters: the translator rendered English
parenthetical asides as Arabic prose without brackets. The 8-of-9 figure is a hypothesis
about English punctuation habits, not a measurement of Arabic exposure. The residue that
is genuinely forced is **R2's own literals** — the phone and the prices — because policy
requires those to appear verbatim in any language.

That reframing matters: it is the difference between "arbitrary Arabic prose needs an
isolation mechanism" and "**the named runs the site owns need one, and the general case is
a gate-blocked rarity**."

---

## 2. The finding: B-2 already answered this, and the component never used the answer

[`AR2-B2-bidi-formatter.md`](AR2-B2-bidi-formatter.md) §2.2, *Two surfaces, one authority*:

> …an `.astro` component cannot be called from a `.ts` template literal, and a string
> helper in an `.astro` template would need `<Fragment set:html={…} />` around a phone
> number, **an injection-shaped pattern adopted for formatting reasons**. So `Bidi.astro`
> exists…

B-2 built two delivery surfaces for one authority precisely so that an `.astro` template
would never have to reach for `set:html` to isolate a run. `FaqAccordion` is an `.astro`
template. **It has had a surface built for this since Phase A and has never called it** —
it renders a prose string it cannot decompose, so there is nothing to hand to `<Bidi>`.

The gap is not the escape. The gap is that `faq[].a` arrives as one opaque string, and the
component owns the result (rule 3). That is the whole of B-15.

---

## 3. The candidates

| | Where isolation is decided | Delivery | Escaping | Schema |
|---|---|---|---|---|
| **A** | a formatter that scans prose | `set:html` | relocated to the formatter | untouched |
| **B** | the **component**, splitting on named runs, rendering `<Bidi>` | element nodes | **untouched** | untouched |
| **C** | the translator, writing `<bdi>` into frontmatter | `set:html` | **abandoned** | needs a strip |
| **D** | structured `faq[].a` — a segment array in YAML | element nodes | untouched | needs a join |
| **E** | nobody — rephrase around the hazard (E-1's deviation) | — | untouched | untouched |

### 3.1 The escaping question, answered

The verification asked for before implementing was: *does routing `faq[].a` through the
formatter preserve all existing escaping guarantees?* Measured, not assumed:

- Astro's escaper is `html-escaper`'s `escape` — exactly `[&<>'"]` → the five entities
  (`node_modules/astro/dist/runtime/server/escape.js:1`).
- Across **449 `faq` blocks / 3 396 q+a entries / 9 locales**: `&` **0**, `<` **0**, `>`
  **0**. The characters that actually occur are `"` (40) and `'` (**4 370**), which Astro
  renders today as `&#39;` — verified in `dist`: `Doc&#39;s Beach`.

So the answer splits by delivery, and this is the decisive distinction:

- **Via the string helpers (A, C)** the guarantee is not preserved — it is **relocated**.
  `set:html` switches escaping off for the whole answer, and something must switch it back
  on. Option A can do that honestly by calling the *identical* `escape` Astro calls, which
  makes the output byte-reproducible; option C does not do it at all. Either way, 4 370
  apostrophes stop being `&#39;` and the corpus's rendered bytes move on eight LTR locales
  for no rendering change — the byte-churn-for-nothing that B-2 §1.1 rejected on measured
  grounds.
- **Via `Bidi.astro` (B, D)** the guarantee is **untouched**. `<Bidi>` contributes element
  nodes; every text part still goes through Astro's own interpolation and its own escaper.
  `set:html` never appears. There is no second definition of escaping to keep in sync, and
  nothing to re-audit if Astro changes its escaper.

**Zero `&`, `<`, `>` in the entire FAQ corpus means the escape currently protects against
nothing that exists.** That is an argument about today's cost, not about the guarantee, and
it is not a reason to drop it — an authoring surface that silently becomes HTML the day a
translator writes `AT&T` is a defect waiting on a coincidence. It is a reason not to pay
anything to keep it. Options B and D keep it for free.

---

## 4. Decision — **B: the component splits, `Bidi.astro` isolates**

`FaqAccordion` splits each `q`/`a` on the **named runs the site owns**, renders the
fragments as an array, and wraps the named ones in `<Bidi>`:

```astro
<div class="faq-answer">{splitNamedRuns(a).map(p => p.run ? <Bidi>{p.text}</Bidi> : p.text)}</div>
```

`splitNamedRuns` is site-aware (it knows `SITE.phoneDisplay` and the currency shape) and
lives beside the formatter, not inside it — `src/lib/bidi.ts` states that it is "not a
translation layer, not a number formatter, and not a locale-aware anything", and teaching
it the site's literals would break that in the first commit that touched it.

**It satisfies all three requirements simultaneously:**

- **R1** — the phone and the prices are isolated wherever they appear in an FAQ, in every
  locale, without anyone remembering to.
- **R2** — the string is never rewritten. It is split at boundaries and rejoined by the
  DOM; the rendered text is character-identical, symbol-first.
- **R3** — untouched, per §3.1. No `set:html`, no second escaper, no new dependency.

**And it leaves the rest of the system alone.** `content.config.ts` unchanged. `SchemaFaq`
unchanged — it keeps receiving the raw string, so Build Guide §4.5's single source for
visible content and JSON-LD survives intact, with no strip and no join to get wrong. The
9 `.astro` pages that build `faq` arrays inline are covered by the same component without
edits.

### 4.1 Why not the others

**A — a prose scanner.** Rejected on a technical finding, not on taste. A parenthesis in
Arabic prose needs isolation *only* when what it encloses resolves to the opposite
direction: `(Green River views)` does, `(تضاريس رملية)` does not, and the two are
indistinguishable by pattern without reimplementing the UBA — which is the analysis gate
4n already performs on the rendered DOM. A scanner narrow enough to be safe recognises
exactly the named literals option B recognises, at which point it is option B with
`set:html` bolted on and the escaping guarantee traded away for nothing.

**C — `<bdi>` authored into frontmatter.** The most tempting one, because the MDX **body**
of this very file already works this way — 65 authored `<bdi>` sites, all of which passed
4n. But the body is not a comparable surface: it has one consumer. `faq[].a` has two, and
the second is JSON-LD. `<bdi>` is not in Google's permitted list for
`acceptedAnswer.text`, so option C requires a strip in `SchemaFaq`, and every future
consumer of `faq[].a` inherits a field whose contents are HTML. That is the second
isolation path generating drift over time — and it generates it in the *data*, which is
the expensive place.

**D — a segment array in YAML.** Correct, and it is the only option that lets the
*content* name a run the way `src/lib/bidi.ts` intends. Rejected on cost: it splits
translated sentences into fragments in frontmatter, makes RTL YAML that no translator
should be asked to edit, and buys nothing option B does not already deliver for the runs
that are actually forced. Worth reopening only if the §7 corpus produces a real population
of hazards that are *not* named runs — see §6.

**E — rephrase around it.** E-1's recorded deviation. It does not generalise: applied
corpus-wide it means deleting the phone and every parenthetical from Arabic FAQ answers,
which is a content policy nobody decided. It stays available as a per-sentence fallback,
not as an architecture.

---

## 5. Scope, measured

Census over all 449 `faq` blocks (the script is in §9):

| | q+a entries | with a mirrored char | with `$N` | with the phone |
|---|---:|---:|---:|---:|
| `en` (56 files) | 424 | 167 | 17 | 23 |
| `ar` (1 file) | 4 | **0** | 1 | **0** |
| all 9 locales | 3 396 | 1 095 | 136 | 184 |

Only `ar` is an RTL document, so the defect population is the Arabic column — today 1
entry, and at full §7 expansion on the order of **17 price answers and 23 phone answers
across 56 files**, assuming translations keep the literals policy §3.2 requires them to
keep. That is the population option B closes automatically.

---

## 6. The residual, stated plainly

Option B isolates **named** runs. A mirrored character in some *other* Arabic FAQ run —
a bracketed Latin aside a future translator writes — remains un-isolatable from
frontmatter, exactly as today.

**It fails closed.** Gate 4n blocks the build, as it did on E-1's first attempt. Nothing
ships broken; a human decides between rephrasing (E) and, if the run recurs, naming it in
the splitter. What is *not* acceptable is discovering it in production, and 4n guarantees
that cannot happen for the mirrored class.

The class 4n cannot see is the one E-1b measured — a neutral displaced by W2 — and it is
filed as **B-17**. Option B closes today's two instances by construction; it does not
close the class, and no gate observes it.

---

## 7. Acceptance for the implementation, when it happens

The bootstrap test is B-2 Phase B's, unchanged, because it is the right one: **strip
`<bdi>`/`</bdi>` from the new build and it must reproduce the current build page for
page.** Any page that differs by something else is a defect in the split, not in the
policy. Plus: gate 4n green with the phone restored to the Arabic FAQ answer (reverting
E-1 §3.3's deviation is the proof the fix works), `measure-currency.mjs` showing `$349`
and `$125` in `div.faq-answer` reading `ltr`, and the JSON-LD byte-identical on all 621
pages — the last being the direct evidence that the schema path was not disturbed.

---

## 8. The one call left to the owner — ✅ ANSWERED: uniform, all nine locales

> **Owner, 2026-07-31: uniform.** The reasoning that settled it reframes the question rather
> than splitting the difference — *"the earlier B-2 decision about the Salt Lake City pages
> was made under a different question (**is this necessary?**). E-1 has changed the question
> to **should the component have one invariant rendering contract?**"* The precedent does not
> conflict once the two questions are separated: B-2 was scoping a **migration**, and this is
> defining a **component contract**. The contract is now one sentence — *FAQ text is rendered
> through `Bidi`* — instead of one sentence with a condition attached, and the operational
> cost is the ~300 LTR no-op wrappers §8 predicted (measured: **447** total, of which
> **445** are LTR).

**Does the split run for all nine locales, or only for RTL documents?**

Uniform is the recommendation. `<bdi>` is a no-op in an LTR context — that property is
what made B-2 Phase B safe across eight locales — and a component that renders one way for
`ar` and another way for everyone else is a conditional path keyed on locale, which is a
class of bug this project has spent AR-2 removing. The cost is real and it is bytes:
roughly 300 rendered `<bdi>` pairs appearing in LTR pages that do not need them, and B-2
§3.1 declined to migrate the 8 `salt-lake-city` pages on exactly that reasoning
("none renders in an RTL document"). So precedent genuinely cuts both ways, the trade is
consistency against churn, and it is a one-line answer that changes no other part of §4.

Stopping here is the instruction and it is also the right place: everything above is
settled by measurement, and this is the only remaining fork where the two branches are
both defensible.

---

## 9. The landing — two commits, and what the proofs actually said

Split the way B-0 and B-2 split: **`f327d72` changes the contract and moves no content;
`9695f05` moves the content.** Neither commit both redefines how FAQ prose renders and
edits what it says.

| | |
|---|---|
| `src/lib/bidi-runs.ts` | recognizes the named runs — phone as an exact literal from `SITE`, currency by **shape** |
| `FaqAccordion.astro` | maps the slices, wraps named ones in `<Bidi>`, both `q` and `a`, no `set:html` |
| `scripts/test-bidi-runs.mjs` | `npm run test:bidi-runs` — **21/21**, every case also asserting the round-trip |

**Currency is matched by shape, not by amount**, and that is a decision rather than
convenience: the hazard belongs to the shape, so a `$50` written next year fails identically
and **nothing would catch it** — `$` is `Bidi_Mirrored=No` and 4n is silent by design.
Matching only `SITE.pricing`'s two amounts would have left the class open for nothing.

### 9.1 The bootstrap test needed a correction before it could run at all

§7 specified B-2 Phase B's test unchanged: strip `<bdi>` from the new build, require the old
one back. **It cannot work in that form here, and the reason is a change in the corpus, not
in the method.** Phase A's corpus carried *zero* isolation, so stripping one side was
sufficient. Every page now carries the chrome wrappers Phase B added, so a one-sided strip
removes those too and can never match — the first run reported 620 of 621 pages "differing",
including pages with no FAQ at all. Stripping **both** sides tests the same invariant (the
only difference between the builds is `<bdi>`) and is the form that survives a corpus which
already isolates.

A recorded test is a hypothesis about the corpus it was written against. That is rule 18
again, arriving through a test rather than through a measurement.

### 9.2 What the proofs said

| Claim | Result |
|---|---|
| markup identical, `<bdi>` stripped both sides | **621 / 621** |
| JSON-LD byte-identical | **621 / 621** — the schema path was not disturbed |
| net `<bdi>` added | **447**, across all nine locales (`ar` 2 · `en`/`es`/`fr`/`it`/`ja`/`pt`/`zh` 56 · `de` 53) |
| `astro check` | 0 errors / 0 warnings / 268 hints — unchanged |
| build + all 11 gates | exit 0, 621 pages; 4q's `ar` window still 12 885 chars |
| gate 4n | **9 mirrored nodes, 9 isolated** (E-1: 8 isolated, 1 bare — that one was the deviation) |
| browser probe, `div.faq-answer` | `$349`, `$125`, `(435) 219-9447` all `isolated=true`, **`ltr`** |
| JSON-LD carrying isolation markup | **0** of 2 129 blocks |

**A second axis of change turned up, and it is measured rather than explained away.** Adding
two imports to the component changed its module graph, and Vite emits per-page inlined
`<style>` blocks in module-graph order — so 457 pages differ in **CSS rule order**. Asserting
that this is harmless would be reasoning about the delivery mechanism instead of measuring
it (B-7's lesson, and §7's own "any page that differs by something else is a defect"). So it
was measured three ways: **CSS rule multiset identical on 621/621**, **total CSS length
identical on 621/621**, and **every scope kept its internal rule order on 621/621** — only
inter-component grouping moved, and Astro's scoped selectors are disjoint by construction, so
no cascade resolution can change.

Two smaller instrument notes, recorded because both are the shape that produces false
findings: the JSON-LD markup scan's single hit was the Portuguese word **"a*bdi*car"** (a
three-letter substring search over natural language); and the E-1b probe's `NOT MEASURABLE`
classification earned itself again, still correctly excluding the 1px `.page-summary` phone.

### 9.3 The deviation is closed

E-1 §3.3's content deviation is **reverted** — the Arabic FAQ answer carries the phone
sentence again, `(435) 219-9447` going 2 → 3 occurrences in the file, matching the English
source. Per-term `en`/`ar` alignment on the raw-HTML body window is **Δ 0** on all three
named runs (phone 4/4, `$349` 5/5, `$125` 3/3). ⚠ Those absolute counts are **not**
comparable with E-1 §5's, which used `visibleText@1`; the deltas are.

**The residual in §6 is unchanged and still real**: a mirrored character in some *other*
Arabic FAQ run remains un-isolatable from frontmatter, and gate 4n still blocks the build if
one appears. What changed is that the forced cases — the runs policy §3.2 requires verbatim —
no longer reach that fallback.

---

## 10. Reproduce

```
node scripts/rtl/measure-currency.mjs          # §1's live defect, §5's isolation readings
```

The §5 census is a throwaway over `src/content/**/*.mdx` — parse frontmatter with
`js-yaml`, count `[&<>'"]`, `\p{Bidi_Mirrored}`, `\$\d` and the phone across `faq[].q` and
`faq[].a`. It is not kept in the tree: it answered a sizing question once and has no
second caller, and a script kept without one is a gate nobody runs.
