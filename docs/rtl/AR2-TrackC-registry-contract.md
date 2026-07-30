# AR-2 Track C — the registry contract (C-1/C-2 acceptance record)

**Method rules applied:** 5 (the instrument is a deliverable, not a convenience) ·
6 (separate the measurement from the thing measured) · 9 (a differential is
evidence only if the tree is constant across both builds) · 11 (where a delta
lands is decided by the delivery mechanism, not the semantic effect) · 13 (state
whether a phase delivers prevention or repair) · 16 (distinguish
corpus-dependent from corpus-independent verification)

**Status: C-1/C-2 COMPLETE, accepted together per the brief
([`AR2-TrackC-brief.md`](AR2-TrackC-brief.md) §4). C-3 (the switcher repair,
B-4) has not begun.** Owner decisions D1 (include the aria-label half) and D2
(`gate-4p`, wired into `gates:src`) were confirmed before implementation; D1
lands with C-3.

Measured 2026-07-30 on `main` at `8701bb4` (working tree carrying only this
change; `.claude/settings.json` harness-owned, untouched). Node v24.14.1 — the
ICU figures below are facts about this runtime, which is exactly what gate 4p
is designed to re-certify per environment.

---

## 1. What shipped

**Rule 13, restated from the brief: this pair is prevention.** There were zero
live defects — `intl === hreflang` for all nine locales today — so the proof
burden is the fail-closed matrix (§3), not a green run. The hazard is the
future one-line `intl: 'ar-SA'` edit ADR-8 documents.

| piece | file | shape |
|---|---|---|
| C-1 the split | `src/lib/i18n.ts` | `LocaleMeta.intl` added with ADR-8 §2's two field docs; nine `intl` values, each `=== hreflang`; `getIntlLocale()` reads `.intl`; the ⚠ guard comment replaced by a pointer to gate 4p |
| adapter | `scripts/lib/host-adapter.mjs`, `host-manifest.{mjs,schema.json}`, `host-manifest.json` | `locales.registry.intlField` declared on the `directionField` precedent; `resolveHost().intl` resolver (lazy, eager-once, no default) |
| C-2 the check | `scripts/gate-4p-intl-numeral.mjs` | three-way outcome (§2); prints the full nine-row resolved table on success |
| wiring | `package.json` | appended to `gates:src` (4j → 4o → **4p**) + `gate:4p` alias; runs pre-build, no `dist/` |

The adapter split follows F4's line exactly: the resolver asserts every locale
*carries* a readable tag (a host fact); whether the tag *resolves*, and to which
numbering system, is gate policy judged against the ICU present at runtime (an
environment fact). Rule 16 is why the check lives in `gates:src`: the invariant
is a registry property, decidable with zero corpus, so it is enforced at the
cheap layer — B-10's rendered-digit scan remains the expensive complement, not
a substitute.

## 2. The measurement that changed the gate (rule 6)

ADR-8 §2.1 sketched a two-outcome check (`latn` or fail). Probing this
runtime's `Intl` before implementing showed the sketch has a hole:

```
tag          getCanonicalLocales   supportedLocalesOf   resolvedOptions
ar           ["ar"]                ["ar"]               ar · latn
ar-SA        ["ar-SA"]             ["ar-SA"]            ar-SA · arab
ar-EG        ["ar-EG"]             ["ar-EG"]            ar-EG · arab
not-a-tag    ["not-a-tag"]         []                   en-US · latn   ⚠
```

`'not-a-tag'` is well-formed BCP-47 (language `not`, extension `a-tag`), so
**nothing throws** — `DateTimeFormat` silently falls back to the system default
locale, which is `latn`. The two-outcome check would therefore **pass** the one
registry state in which it measured nothing at all: an instrument failure
observationally identical to a pass, which is rule 6's exact prohibition. The
shipped gate adds the third outcome — `supportedLocalesOf` returning empty (or
`Intl` throwing) is INSTRUMENT FAILURE, exit 2, message distinct from both
verdicts, and it outranks any violations found in the same run because a
partial measurement must not present as a complete one.

## 3. Acceptance

### 3.1 Fail-closed matrix (each perturbation transient, restore verified by `cmp`)

| registry state | exit | observed message names |
|---|---|---|
| `ar` → `intl: 'ar-SA'` | **1** | `ar` · `ar-SA` · `arab` · the policy doc (`AR1-arabic-policy.md §3`) ✘ |
| `ar` → `intl: 'ar-EG'` | **1** | `ar` · `ar-EG` · `arab` ✘ |
| `ar` → `intl: 'not-a-tag'` | **2** | `INSTRUMENT FAILURE … cannot resolve — DateTimeFormat would silently fall back` — distinct from a violation ✘ |
| unperturbed | **0** | the nine-row table printed (`en`…`ar`, all → `latn`) ✔ |

After the matrix, `cmp` confirmed `i18n.ts` byte-identical to its pre-matrix
state.

### 3.2 The differential (rules 9 + 11)

Prediction: **zero delta** — `intl === hreflang` for all nine locales and the
check runs pre-build, so the delivery mechanism (a source refactor plus a
pre-build gate) has no path into `dist/`.

Measured: full `npm run build` before and after, same tree, same HEAD
(`8701bb4` at both measurements; the auto-commit bot did not move it — checked
immediately before each build). `sha1sum` over every `dist/` file: **863 files
before, 863 after, diff empty — byte-identical.** The working set at
measurement time contained only this change's nine files, so the diff contains
only files the change explains, vacuously.

### 3.3 Suite

- `astro check`: **0 errors, 0 warnings** (259 files).
- Full gate suite green in the after-build with **figures byte-identical** to
  the baseline log, gate for gate (4j 840 entries · 4o 35 files · validate-site
  620 pages · 4m 30 videos/304 refs · 4k 620 pages/9 locales · 4n 1 rtl page ·
  4f 14 404 headings · 4h 540 pages/1 922 phrases · 4i 52 locks/11 advisory ·
  4g 42 777 anchors). Gate 4p ran inside `gates:src` during the real build and
  passed with the table.
- ADR-8 status flipped to IMPLEMENTED (as ADR-10's did at Track A), recording
  the §2 finding its own sketch missed.

## 4. Closure state

B-3 struck through in [`AR2-backlog.md`](AR2-backlog.md); the §7-expansion
status note now lists **B-4 (in progress), B-8/B-9, B-10**; B-10's entry
re-sized — its registry-level half is B-3's check and is now enforced, its
rendered-text half is unchanged and open. What remains of Track C is C-3: the
switcher's per-option `lang`/`dir` plus the `t('a11y.languageMenu')` label
(D1 confirmed), whose acceptance is the rendered diff on switcher-bearing
pages — repair, with the opposite proof shape to this milestone's.
