# AR-2 Track C brief — the registry contract pair (B-3 + B-4)

**Method rules applied:** 5 (a control that can fail) · 6 (separate the
measurement from the thing measured) · 9 (tree constant across the
differential) · 11 (delivery mechanism decides where the delta lands) ·
13 (prevention or repair, stated) · 16 (corpus-dependent vs
corpus-independent verification)

**Status: TRACK C COMPLETE 2026-07-30.** C-1/C-2 →
[`AR2-TrackC-registry-contract.md`](AR2-TrackC-registry-contract.md) (`8e9f951`,
B-3); C-3 → [`AR2-TrackC-switcher.md`](AR2-TrackC-switcher.md) (B-4, and the
Gate 4a part-2 closure). Owner confirmed D1 (include the aria-label half) and
D2 (`gate-4p` in `gates:src`); both applied as decided. Originally written
2026-07-30 as a brief with no implementation begun, from a clean baseline:
Track B closed at `a52d0fb`, working tree clean except `.claude/settings.json`
(harness-owned, not touched).

---

## 0. Selection — why this pair, and why not B-8–B-10

The backlog's own §7-expansion status note (2026-07-30) lists what still blocks
Arabic content expansion: **B-3, B-4**, then B-8/B-9 before the first Arabic
glossary lock, and B-10 before Arabic prose ships at volume. The selection
among them is decided by **rule 16**, not by ordering preference:

| item | verification class | eligible now? |
|---|---|---|
| **B-3** | policy rule — registry fact, checkable with zero corpus | ✔ **selected** |
| **B-4** | chrome repair — live rendered defect, dist-observable today | ✔ **selected** |
| B-10 | policy rule (rendered-digit scan) — eligible before content | ➡ natural successor; complements B-3's registry check at the rendered layer |
| B-8 | its real content is a linguistic question the backlog itself says "needs a corpus to answer" | ✘ corpus-blocked |
| B-9 | script validation for Arabic locks — no Arabic lock exists to exercise it | ✘ no test surface until the first lock |

Building B-8/B-9 now would ship gate branches nothing can reach and nothing
can falsify — the exact shape rule 16 warns about from A9. B-10 is eligible
(rule 16: "policy rules can ship before content") but is sequenced after
Track C because its registry-level half **is** B-3's check; doing B-10 first
would enforce the policy at the expensive layer while the cheap layer stays
open to the one-line edit ADR-8 documents.

**Track C = B-3 + B-4.** Both are contract-layer items (the four-layer table
in METHOD): one registry field split with an enforcement check, one component
reading registry facts it currently ignores. Neither touches presentation,
verification-suite semantics, or content.

## 1. Objective

Close the two remaining Direction-section items so that:

1. a future SEO regionalization of any locale **cannot** change the numbering
   system of machine-formatted output (B-3 / ADR-8 — the `ar-SA` one-liner
   that passes all five checks today), and
2. the language switcher renders every locale name with the `lang`/`dir` the
   registry declares for it, and its menu label goes through `t()` like every
   other chrome string (B-4).

After Track C, what blocks §7 expansion is only the corpus-gated gate work
(B-8/B-9) and B-10 — the contract layer is done.

## 2. Scope

**In scope**
- `src/lib/i18n.ts`: `LocaleMeta` gains `intl`; `getIntlLocale()` reads it;
  the ⚠ guard comment (i18n.ts:27-46) is replaced by a pointer to the check
  that now enforces it.
- A new registry check (recommended name `gate-4p`, see D2) asserting every
  locale's `intl` tag resolves to numbering system `latn`.
- `src/components/layout/LanguageSwitcher.astro`: per-option `lang` + `dir`
  ([line 48](../../src/components/layout/LanguageSwitcher.astro#L48)),
  `aria-label` through `t()`
  ([line 38](../../src/components/layout/LanguageSwitcher.astro#L38)).
- `src/lib/ui.ts`: one new a11y key × 9 locales.

**Out of scope, by decision**
- The 5 `decide-promo-anchor` declarations — Track B's surviving product
  decision, untouched.
- B-12 (`SITE.hoursDisplay`) and B-13 (`404.astro` `Information ▾`) — owner's
  call, pre-existing, unchanged status.
- The toggle button's own text (`{current.name}`,
  [line 36](../../src/components/layout/LanguageSwitcher.astro#L36)) needs no
  attributes: it always shows the *current* page's locale name, whose
  script/direction match the page's own `lang`/`dir` by construction. Stated
  here as a classification so the sweep doesn't "fix" it (the B-5b anchors
  lesson: mirroring what already agrees breaks it).
- Track B is closed and is not reopened. The Direction section's header
  strikethrough ambiguity in the backlog stays as-is.

## 3. Work items

### C-1 — implement ADR-8 (B-3)

Exactly the ADR §2 shape: `intl` field with the two field-doc comments,
`intl === hreflang` for all nine locales today, `getIntlLocale()` returns
`getLocaleMeta(code).intl`. No call site moves (`getInLanguage`, `formatDate`
are consumers of `getIntlLocale`, not of the field).

### C-2 — the registry numeral check (ADR-8 §2.1)

`Intl.DateTimeFormat(intl).resolvedOptions().numberingSystem === 'latn'` for
every `LOCALES` entry. Properties the ADR requires plus what rules 5/6 add:

- **Three-way outcome (rule 6):** pass / policy violation (exit 1, naming
  locale · tag · resolved numbering system · the policy doc) / **instrument
  failure** — a tag `Intl` cannot resolve or that throws is its own exit and
  message, never read as either pass or violation.
- Prints the full resolved table (code → intl → numberingSystem) **on
  success**, so the fact being certified is visible, not implied.
- Runs pre-build (no `dist/` needed) — wired into `gates:src` (D2).

### C-3 — the switcher repair (B-4)

Per-option `lang={code}` and `dir={getLocaleMeta(code).dir}` — the same
registry field gate 4k's `directionField` points at (ADR-9: one source, the
gate already verifies it renders truthfully at the document level). ParkingWay
is the measured precedent: per-option `dir` resolved from its registry,
20 × `dir="ltr"` + 3 × `dir="rtl"` on its Arabic page.

`aria-label="Language"` → `t('a11y.languageMenu')`, new key beside the seven
existing `a11y.*` keys ([ui.ts:44-51](../../src/lib/ui.ts#L44-L51)), authored
in all 9 locales. ⚠ This closes the open Gate 4a part-2 defect recorded
2026-07-28 (untranslated chrome on 617 pages) — see D1.

## 4. Acceptance criteria

**Rule 13, stated up front: C-1/C-2 are prevention** (zero live defects — the
hazard is a future edit), so their proof burden is the fail-closed matrix, not
a green run. **C-3 is repair** (live rendered defect on every page carrying
the switcher), so its proof is the rendered diff.

### C-1/C-2 (accept together)

1. Full build before and after, same tree: `dist/` **byte-identical**.
   Prediction (rule 11): zero delta — `intl === hreflang` for all nine, and
   the check runs pre-build. If the diff is non-empty, the prediction was
   wrong: stop and explain every changed byte before proceeding.
2. Rule 9 on that differential: the diff must contain only files the change
   explains. Any foreign file (the `k` bot, a parallel workstream) voids the
   run — re-establish a constant tree and re-measure.
3. Fail-closed matrix, each perturbation transient and restored:
   - `ar` → `intl: 'ar-SA'` → exit 1 naming `ar · ar-SA · arab` ✘
   - `ar` → `intl: 'ar-EG'` → exit 1 ✘
   - `ar` → `intl: 'not-a-tag'` → the **instrument-failure** exit, message
     distinct from a policy violation ✘
   - unperturbed registry → exit 0 **with the nine-row table printed** ✔
4. `astro check` 0 errors; full gate suite green with figures unchanged.
5. ADR-8 status flips to IMPLEMENTED (as ADR-10's did at Track A).

### C-3

1. Rendered facts on `dist/ar/cancellation-policy/`: the menu carries 9
   options, **8 × `dir="ltr"` + 1 × `dir="rtl"`**, each option's `lang` equal
   to its `hreflang`. Same partition on one LTR page per remaining locale
   (spot set: `en`, `de`, `ja` — Latin, Latin, CJK contexts).
2. Rendered-output English scan (the Gate 4a part-(b) method): zero
   `aria-label="Language"` on non-`en` pages; each locale's authored value
   present on its own pages.
3. Delta scope measured, not asserted (rule 11): predict the changed-page set
   = exactly the pages where `available.length > 1` renders the switcher; the
   backlog's "all 620" is the hypothesis. Count the changed pages in the
   before/after diff and reconcile against the switcher-rendering population.
   Any page outside that set, stop and explain.
4. Rule 9 as above — the diff contains only switcher-bearing pages.
5. Full suite green. Prediction: every gate's figures unchanged (attributes
   change; text nodes do not, so 4n/4g/4f/4h/4i see the same content).

## 5. Instrumentation needs

**None new beyond C-2 itself.** Every acceptance fact above is
dist-observable (attributes and build-time exits) — no browser, no
`probe.mjs`, no worktree substitution. This is the contract-layer contrast to
B-5b, recorded so nobody reaches for the heavy instrument out of habit. The
C-2 check is the one permanent verifier Track C adds, and it self-verifies
per environment: it queries the ICU actually present at gate runtime, so a
CI/local CLDR divergence surfaces as a red check, not a silent drift.

## 6. Deliverables

1. `src/lib/i18n.ts` — the split (C-1).
2. `scripts/gate-4p-intl-numeral.mjs` + `package.json` wiring (C-2, name per D2).
3. `src/components/layout/LanguageSwitcher.astro` + `src/lib/ui.ts` (C-3).
4. Phase report `docs/rtl/AR2-TrackC-registry-contract.md` with the METHOD
   citation header, containing the fail-closed matrix and both measured
   delta reconciliations.
5. Closure edits: B-3/B-4 struck through in `AR2-backlog.md`; ADR-8 status
   line; the §7 status note's blocker list shrinks to B-8/B-9/B-10.

## 7. Repository readiness — verified 2026-07-30

- **Track B introduced no hidden prerequisites.** Measured against the
  commits, not the docs: `b76de42` touched `public/styles.css`,
  `src/page-content/home.ts`, `src/page-content/utv.ts`, `scripts/rtl/*`,
  `package.json`, docs — zero overlap with Track C's four files. `d3ca57c`
  (B-6) added `isRtl()`/`affordanceArrow()` to `i18n.ts` — additive;
  `LocaleMeta` untouched since AR-1. B-7 already converted
  `.lang-menu { right: 0 }` to logical (it owns on LTR), so C-3 is
  markup-only against CSS that is already direction-correct.
- **Gate wiring re-read from the authority** (`package.json`, per the
  recorded drift warning): `gates:src` = 4j → 4o; `gates:dist` =
  validate-site → 4m → 4k → 4n → 4f → 4h → 4i → 4g. `4l` is reserved by the
  V-1 brief and unbuilt; **4p is the next free letter**.
- **Working tree:** clean except `.claude/settings.json` (harness-owned;
  reported, not touched). ⚠ Local `main` is **ahead of `origin/main` by 9**
  (origin stops at `8502b94`; the auto-push bot has not run since) — the
  Track B closure commits are local-only until pushed.

## 8. Decisions open before implementation

- **D1 — the aria-label half of C-3.** B-4 as filed includes it, and it
  closes the Gate 4a part-2 defect that was left open 2026-07-28 as an
  owner's call. **Recommendation: include** — it is one line plus nine
  dictionary values inside a component this track already changes, and
  leaving it would ship a "localization-correct" switcher whose own label
  leaks English. If the owner intended the deferral to stand, the
  `lang`/`dir` half lands alone and the defect stays recorded as open.
- **D2 — check name and wiring.** Recommendation: `gate-4p-intl-numeral.mjs`
  appended to `gates:src` (source-fact, pre-build, milliseconds; 4k stays the
  dist-side direction gate per its contract). Folding it into 4k was ADR-8's
  alternative; rejected here because 4k reads `dist/` and this check must run
  before a build exists.
