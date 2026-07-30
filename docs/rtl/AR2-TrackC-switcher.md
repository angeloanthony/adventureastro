# AR-2 Track C — the switcher repair (C-3 acceptance record)

**Method rules applied:** 9 (a differential is evidence only if the tree is
constant across both builds) · 11 (where a delta lands is decided by the
delivery mechanism, not the semantic effect) · 13 (state whether a phase
delivers prevention or repair) · 16 (distinguish corpus-dependent from
corpus-independent verification)

**Status: C-3 COMPLETE — B-4 resolved, and TRACK C CLOSED.** Owner decision D1
(include the `aria-label` half) applied as confirmed. Measured 2026-07-30 on
`main` at `8e9f951` (C-1/C-2), working tree carrying only this change;
`.claude/settings.json` harness-owned, untouched. No registry, gate or ADR file
was modified: C-3 consumes the Track C contract, it does not extend it.

---

## 1. What shipped

**Rule 13: this is repair, not prevention.** Unlike C-1/C-2 — whose proof was a
fail-closed matrix over a byte-identical `dist/` — C-3 fixes a defect that was
live on every page carrying the switcher, so its proof is the rendered diff and
the population it lands on.

| piece | file | shape |
|---|---|---|
| per-option direction | `src/components/layout/LanguageSwitcher.astro` | `lang={code}` + `dir={getLocaleMeta(code).dir}` on each option anchor, beside the existing `hreflang={code}` |
| the menu label | same | `aria-label="Language"` → `aria-label={t('a11y.languageMenu', lang)}` |
| the dictionary | `src/lib/ui.ts` | `'a11y.languageMenu'` × 9 locales, authored beside the existing `a11y.*` keys |

`dir` is read from the registry field ADR-9 made the single source and gate 4k
already verifies at the document level — not from a component-local table. The
toggle button was left untouched **by decision, restated from the brief**: it
renders the *current* page's locale name, whose script and direction already
agree with the document's own, and mirroring what already agrees is precisely
how the B-5b anchors broke. That classification is recorded in the component so
a later sweep does not "fix" it.

Rule 16, applied to scope: every fact below is dist-observable — attributes and
rendered text — so no browser, no `probe.mjs`, no worktree. The heavy
instrument stays where B-5b left it.

## 2. The differential (rules 9 + 11)

**Prediction, stated before the build:** the changed set is exactly the pages
where `available.length > 1` renders the switcher. The backlog's recorded
figure — "changes rendered bytes on all 620 pages" — is a *hypothesis*, and
measuring the population before building is what tests it.

Baseline: the `dist/` from the C-1/C-2 after-build, re-hashed and confirmed
unchanged (863 files) immediately before the C-3 build, so the two trees differ
only by this change. HEAD `8e9f951` at both measurements — the auto-commit bot
did not move it, checked immediately before staging.

| measurement | value |
|---|---|
| dist files, before / after | 863 / 863 — none added, none removed |
| changed files | **617**, all `.html` (0 non-HTML) |
| pages rendering the switcher | **617** |
| changed but NOT switcher-bearing | **0** |
| switcher-bearing but NOT changed | **0** |

The two sets are **equal**, not merely equinumerous — `comm` in both
directions returns empty. The three pages that did not change are exactly the
three that render no switcher: `404.html` (its own inline nav, and the reason
B-13 stays open) and the two English-only author bios `about/dave/`,
`about/trudy/`, where `available.length === 1`.

**So the backlog's "all 620" was wrong by three pages, and the corrected figure
is 617** — which is independently the number recorded for the Gate 4a part-2
defect on 2026-07-28. Two counts arrived at the same population from opposite
directions: one from the untranslated-chrome scan, one from the switcher's own
render condition.

## 3. Rendered facts

### 3.1 Per-option direction

On `dist/ar/cancellation-policy/index.html` — the one Arabic route:

```
hreflang="en" lang="en" dir="ltr"      … es, it, pt, fr, de, ja, zh …
hreflang="ar" lang="ar" dir="rtl"
```

**9 options, 8 × `dir="ltr"` + 1 × `dir="rtl"`, and every option's `lang`
equals its `hreflang`** (9/9). The brief's predicted partition exactly.

⚠ One measurement artifact worth recording: a naive `lang="…" dir="rtl"` grep
returns **2** on that page, not 1. The second is `<html lang="ar" dir="rtl">` —
the document element, which is gate 4k's business, not the menu's. The counts
above are scoped to option anchors by requiring the `hreflang=` prefix. A
figure that counts the document element as a menu option would have reported
the Arabic menu as having two RTL entries.

Spot set, same partition on one page per remaining context (Latin, Latin, CJK):

| page | options | ltr | rtl | `lang == hreflang` |
|---|---|---|---|---|
| `dist/cancellation-policy/` (en) | 9 | 8 | 1 | 9/9 |
| `dist/de/cancellation-policy/` | 9 | 8 | 1 | 9/9 |
| `dist/ja/cancellation-policy/` | 9 | 8 | 1 | 9/9 |
| `dist/ar/cancellation-policy/` | 9 | 8 | 1 | 9/9 |

### 3.2 Gate 4a part 2 — CLOSED

The rendered-output English scan (Gate 4a part-(b) method):

- `aria-label="Language"` now appears on **77 pages, all of them `en`** — where
  it is the correct authored value — and on **0 non-`en` pages** (was: 617
  pages across all 9 locales).
- Each locale's authored value is present on every one of its own pages:
  `es` Idioma · `it` Lingua · `pt` Idioma · `fr` Langue · `de` Sprache ·
  `ja` 言語 · `zh` 语言 — 77 pages each — and `ar` اللغة on its 1 page.
- The per-locale counts sum to 77 + (7 × 77) + 1 = **617**, reconciling
  independently with §2's changed-page set.

This closes the open Gate 4a part-2 defect recorded 2026-07-28
(`LanguageSwitcher.astro:38`, untranslated English chrome on 617 pages across
all 9 locales). The sibling items of the same class — B-12 `SITE.hoursDisplay`
and B-13 `404.astro`'s `Information ▾` — remain open, unchanged, owner's call.

## 4. Suite

- `astro check`: **0 errors, 0 warnings** (259 files).
- Full gate suite green, **every figure byte-identical** to the C-1/C-2 build
  log — 4j, 4o, 4p, validate-site (620 pages), 4m, 4k, 4n, 4f, 4h, 4i, 4g.
  Predicted and confirmed: this change adds attributes and swaps one attribute
  *value*; it adds and removes no text node, so the content gates see an
  identical corpus. Gate 4k in particular still reports 620 pages rendering
  their declared direction — the per-option `dir` did not disturb the document
  one.

## 5. Track C closure

Both work items are resolved: **B-3** (C-1/C-2, `8e9f951`) and **B-4** (C-3,
this milestone). The contract layer is done — what blocks `MULTILINGUAL_HANDOFF`
§7 Arabic expansion is now only the corpus-gated gate work **B-8/B-9** and
**B-10**, none of which is a contract-layer item. The one surviving Track B
product decision (5 `decide-promo-anchor` declarations) is unaffected and stays
recorded as a decision, not a defect.
