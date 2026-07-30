# ADR-8 — `hreflang` is two fields

**Status:** IMPLEMENTED — AR-2 Track C (C-1/C-2), 2026-07-30. Tracked as AR-2 **B-3**.
**Context phase:** discovered by AR-1 (Arabic readiness), 2026-07-28.

Implemented exactly as §2 below: `LocaleMeta.intl` split from `hreflang`
(`intl === hreflang` for all nine locales, dist/ byte-identical), and the §2.1
check ships as **gate 4p** (`scripts/gate-4p-intl-numeral.mjs`, wired into
`gates:src` — its own check, not folded into 4k, because it must run before a
build exists). One finding beyond §2.1's sketch: `Intl.DateTimeFormat` on an
unresolvable tag does not throw — it silently falls back to the system default
locale, which is `latn`, so the two-outcome check sketched below would PASS the
one registry state in which it measured nothing. The shipped gate adds a third
outcome (INSTRUMENT FAILURE via `supportedLocalesOf`, exit 2, distinct from
both verdicts). Acceptance record:
[`AR2-TrackC-registry-contract.md`](../../rtl/AR2-TrackC-registry-contract.md).

Written 2026-07-28 ahead of implementation, because the evidence was measured
and the rationale explicit then; B-3's implementation was a separate change and
did not block Gate 4k or the bidi formatter.

---

## 0. The one-line finding

> **`LocaleMeta.hreflang` is consumed by two subsystems with different contracts,
> and one of them silently decides the numbering system of every machine-formatted
> number on the site.**

This is the same class of defect F3–F5 spent five phases removing: one
declaration governing cross-cutting behaviour in an unrelated subsystem, with no
mechanism that could notice the two had diverged.

---

## 1. Context

`LocaleMeta.hreflang` was introduced as an SEO attribute. A later commit reused
it as the BCP-47 tag for `Intl`, with the reuse presented as a virtue:

```ts
/** BCP-47 tag for Intl APIs — reuses the region-qualified hreflang value
 *  ('en-US', 'es-US', 'it-IT', 'pt-PT'). One source, no second table. */
export function getIntlLocale(code: string): string {
  return getLocaleMeta(code).hreflang;
}
```

"One source, no second table" is the right instinct and the wrong application. It
is correct when two consumers need *the same fact*. Here they need two facts that
happened to have the same value for eight locales.

### 1.1 The two consumers

| Consumer | Reads | Contract |
|---|---|---|
| **SEO** — `BaseLayout.astro:63` | `getLocaleMeta(code).hreflang` → `<link rel="alternate" hreflang=…>` | `language[-region]`. Region narrows the audience: a qualified tag *excludes* every other region from the alternate set |
| **Formatting** — `getIntlLocale()` → `formatDate()` (`AuthorByline`), `getInLanguage()` (`SchemaArticle`, `SchemaItinerary`) | the same string, as an `Intl` tag | determines **numbering system**, calendar, month names and date order |

Eight locales, one value each, and for `en/es/it/pt/fr/de/ja/zh` the two contracts
happen to agree. Arabic is the first locale where they can disagree — and the
disagreement is invisible, because the tag is not wrong for SEO *or* wrong for
`Intl`. It is only wrong for one of them at a time.

### 1.2 Measured (Node/V8 CLDR, 2026-07-28)

```
tag       toLocaleDateString(…, {year,month,day})   numberingSystem
en-US     January 14, 2026                          latn
de-DE     14. Januar 2026                           latn
ja-JP     2026年1月14日                              latn
zh-CN     2026年1月14日                              latn
ar        14 يناير 2026                             latn   ✔ AR-1 policy satisfied
ar-MA     14 يناير 2026                             latn   ✔
ar-EG     ١٤ يناير ٢٠٢٦                              arab   ✘ policy violated
ar-SA     ١٤ يناير ٢٠٢٦                              arab   ✘ policy violated
```

**`ar-SA` is the point.** It is the single most plausible regionalization for a
Gulf-facing inbound-travel site — and it is one of the two that silently switch
every machine-formatted date and number on the Arabic site to Arabic-Indic
digits, in direct violation of the corpus-wide numeral policy recorded in
`docs/rtl/AR1-arabic-policy.md` §3.

### 1.3 Why nothing would catch it

A change from `hreflang: 'ar'` to `hreflang: 'ar-SA'`:

- is **one line**, in a file whose visible purpose is SEO metadata;
- changes **no translated string**, so no terminology grep, corpus census or
  glossary lock moves;
- passes `astro check`, the validator, and gates 4f/4g/4h/4i/4j — AR-1's
  fail-closed matrix established that **no gate has the concept of a numbering
  system** (scenario S6, verdict BLIND);
- is **correct on its face** for the subsystem the field is named after.

The reviewer sees an SEO tweak. The site starts rendering `١٤ يناير ٢٠٢٦`.

---

## 2. Decision

**Split the field.** `LocaleMeta` gains an explicit formatting tag, and
`getIntlLocale()` reads that instead of `hreflang`.

```ts
export interface LocaleMeta {
  /** hreflang attribute value. SEO only. Region-qualified iff the locale
   *  targets a region. NEVER read by Intl — see `intl`. */
  hreflang: string;

  /** BCP-47 tag for every machine-formatted value: dates, numbers,
   *  JSON-LD inLanguage. Decides numbering system and calendar.
   *  Deliberately NOT derived from `hreflang`: the two answer different
   *  questions and Arabic is where they diverge (ADR-8). */
  intl: string;
}
```

For the eight existing locales `intl === hreflang`, so the split is a pure
refactor with no rendered-output change. For `ar` the two are both `'ar'` today,
and the split is what makes a future `hreflang: 'ar-SA'` harmless.

### 2.1 The decision is incomplete without a check

Splitting a field that nothing verifies just moves the silence. The site's
numeral policy is *Western digits, corpus-wide, no exceptions* — which is a
**machine-checkable property of the registry**, not of the corpus:

```js
// proposed, in gate 4k or its own registry check — runs in milliseconds,
// needs no dist/, and fails closed on the exact edit this ADR is about
for (const { code, intl } of LOCALES) {
  const nu = new Intl.DateTimeFormat(intl).resolvedOptions().numberingSystem;
  if (nu !== 'latn') fail(
    `locale "${code}" declares intl "${intl}", whose numbering system is "${nu}". ` +
    `The corpus-wide numeral policy is Western digits (AR1-arabic-policy.md §3). ` +
    `Use an unqualified or latn-defaulting tag, or pin it with -u-nu-latn.`
  );
}
```

This is the piece that turns a recorded policy into an enforced one. It also
generalizes: any host with a numeral policy can assert it against its own registry
without reading a single rendered page.

### 2.2 Why not pin `-u-nu-latn` and keep one field

Considered and rejected as the *primary* fix, though it remains a valid escape
hatch inside `intl`. `hreflang="ar-u-nu-latn"` is a well-formed BCP-47 tag and a
**malformed hreflang value** — search engines expect `language[-region]`, and a
`-u-` extension is not that. Pinning inside a shared field would fix formatting by
corrupting the SEO consumer, which is the same coupling with the sign flipped.

---

## 3. Consequences

- One new field per locale, nine lines, each stating a fact the registry was
  previously inferring.
- `getIntlLocale()` keeps its name and signature; only its source changes. No
  call site moves.
- **No rendered-output change** on implementation: `intl === hreflang` for all
  nine locales as they stand today.
- The registry gains a checkable invariant it did not have (§2.1), closing
  fail-closed scenario S6 for machine-formatted output. Author-typed
  Arabic-Indic digits in prose remain uncovered — that is a separate rendered-text
  check, still open as B-10.
- A future SEO regionalization becomes what it should always have been: a change
  to the SEO field, with no effect on formatting.

## 4. Rejected alternatives

| Alternative | Why rejected |
|---|---|
| Leave as one field, guard with a comment | The current state. A comment is not a mechanism; §1.3 lists five checks the edit already passes |
| Pin `-u-nu-latn` in `getIntlLocale()` | §2.2 — fixes formatting by malforming the hreflang value, or requires string surgery that reintroduces the coupling in code |
| Add `numberingSystem` and compose the tag | More expressive than needed, and composition hides which tag `Intl` actually receives. An explicit tag is greppable and testable directly |
| Derive `intl` from `code` alone | Discards deliberate choices — `es-US` (not `es-ES`) is a real audience decision this site made |
| Do nothing until a second locale diverges | Waiting for a second instance of a defect whose whole character is that it ships silently |

## 5. What would reverse this ADR

- CLDR stabilizes such that no plausible `language-REGION` tag changes numbering
  system relative to its bare language — not foreseeable, and `ar-SA`/`ar-EG` are
  the counterexample today.
- Or: the site adopts per-region numeral policies, at which point the numbering
  system becomes a deliberate per-locale decision and wants its own field anyway —
  which is this ADR, reached from the other direction.

---

## 6. Relationship to the F-series

F1–F5 removed couplings where **one fact was declared in several places**
(`script` four times, `state` three times, the stale 4-of-8 locale list in
`astro.config.mjs`). This is the mirror image: **one declaration serving two
facts.** The manifest work fixed the first shape; nothing in the framework yet
looks for the second.

The diagnostic that would have found it is worth stating, because it is cheap and
reusable: *for each field in a shared registry, list its consumers and their
contracts; if two contracts differ in what a legal value means, the field is two
fields.* Applied to `LocaleMeta` today, `hreflang` is the only hit — `code`,
`name`, `dir` and `ogLocale` each have exactly one contract.
