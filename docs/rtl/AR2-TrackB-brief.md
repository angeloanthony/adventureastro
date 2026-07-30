# AR-2 Track B — RTL presentation: brief

**Status: BRIEF ONLY, 2026-07-28.** No code, no gate, no wiring, no CSS. It separates the
three questions Track B has been carrying as one, re-measures the population from today's
tree rather than citing AR-1's, and ends with the decisions I cannot make.

> **TRACK B CLOSED 2026-07-30 — this brief is historical.** Every question it
> separated has since been answered: the substitution build ran (decision (a);
> [`AR2-TrackB-substitution-build.md`](AR2-TrackB-substitution-build.md), which
> records owner decisions (a)–(d) in its §6), B-6 closed `d3ca57c` with §6's
> "clean promotion" sweep retired by re-census (zero live defects), B-7 closed
> `88f83f8` (62 declarations, not 174), B-5a consolidated the 8× duplication
> `00e2313` (decision (c): de-duplicate first), and B-5 closed `b76de42` after
> the B-5b instrument → measurement → touch → fix series. §4's warning held:
> `rtl-inventory.mjs` was never promoted to a blocking gate wholesale — gate 4o
> and the B-7 frozen classification took that place. The only surviving item is
> the 5 promo-badge anchors, a deferred product decision
> ([`AR2-backlog.md`](AR2-backlog.md), Track B closure note).

Covers **B-5** (carousel), **B-6** (arrow glyphs), **B-7** (physical CSS) and the browser
verification all three were said to require.

---

## 1. The finding that reframes the track

**Every defect Track B exists to fix renders on zero RTL routes today.**

Measured on `dist/ar/cancellation-policy/index.html`, which is the entire RTL corpus:

| | site-wide (source / rendered) | on the one RTL page |
|---|---:|---:|
| `→` arrows (B-6) | 204 / 256 | **0** |
| `▶` play glyphs (B-6) | 8 / 8 | **0** |
| carousel `translateX(-…)` (B-5) | 16 / — | **0** |
| directional gradients | 216 / 681 | **0** |
| `box-physical` (B-7) | 26 / 224 | **0** |
| `text-align: left\|right` (B-7) | 3 / 3 | **0** |
| `inset-physical` (B-7) | 145 / 145 | **1**, and it is the `-9999px` off-screen clip — direction-neutral |
| `<bdi>` (B-2, shipped) | 9 / 2486 | **7** |

`src/page-content/home.ts` carries eight locale blocks — `ES IT PT FR DE JA ZH` and the
English default — and **no `AR`**. There is no Arabic homepage, no Arabic `/utv/`, and
therefore no Arabic carousel. The one Arabic route is a policy page built from shared chrome.

Three consequences, and they change the plan rather than decorating it:

1. **There is nothing to browser-verify today.** Opening `/ar/cancellation-policy/` renders a
   correct page — not because the presentation layer is correct, but because none of its
   defects are on that route. A browser session now would produce a green screenshot and
   prove nothing, which is the same trap gate 4n's green run sets.
2. **Every Track B item is prospective**, exactly like 4n. Its value arrives when Arabic
   content expands. That is a legitimate reason to build, but it changes what counts as
   evidence: the proof is a perturbation, never a passing observation.
3. **The backlog's sequencing is circular as written.** §7 says Arabic content expansion
   comes only after Track B, because "57 spokes onto a direction-blind carousel multiplies
   one bug by 77 routes" — correct. But Track B's fixes cannot be verified without a
   populated RTL surface, and the only way to populate one is the content expansion that is
   supposed to come second. §5 resolves this without authoring a word of Arabic.

---

## 2. Detection already exists — the open question is promotion, not construction

`scripts/audit/rtl-inventory.mjs` (AR-1, 16 KB) statically measures all of it and has never
been wired into `build`: `grep -c rtl-inventory package.json` = 0. AR-1 left "should any of
this block?" to AR-2 and AR-2 has not taken it.

Re-run today, unchanged, against 680 source files and 621 rendered:

| class | rules | source | rendered |
|---|---:|---:|---:|
| `mirror-required` | 5 | 472 | 987 |
| `logical-property-replacement` | 3 | 174 | 372 |
| `bidi-sensitive` | 3 | 20 | 2487 |
| `direction-neutral` | 10 | 1877 | 5952 |

It already reports `sourceHits`, `renderedHits` and `renderedDistinct` per rule — the three
axes this project keeps learning it needs — and derives glyph mirroring from
`\p{Bidi_Mirrored}` rather than a hand list. **This is the same promotion the project has
already performed twice**: census → adopted fact, direction-audit → gate 4k. So the question
is *"should existing detection become policy?"*, not *"should we build detection?"*.

---

## 3. The three questions, separated

They have been travelling as one item and they have different answers, different owners and
different evidence.

| | Question | Status |
|---|---|---|
| **Detection** | Can we find every instance mechanically? | **Done.** §2. Static, complete, already measured on both corpora. |
| **Policy** | Which findings should block a build? | **Open, and it is the real work.** §4 shows the audit's own classification cannot be promoted as-is. |
| **Verification** | Does the fix render correctly? | **Blocked on a surface, not on a browser.** §5. |

Conflating them is what produced "browser verification is mandatory" as a blanket statement.
It is mandatory for one of the three items and unnecessary for the other two.

---

## 4. `mirror-required` is not a work list — the sizing trap, third instance

The bucket is 472 source hits. Inspecting the rules behind it:

| rule | source | what it actually is |
|---|---:|---|
| `glyph:→` | 204 | **real.** `Bidi_Mirrored=No`, points into the start of an RTL line. |
| `glyph:▶` | 8 | **real**, same reason. |
| `translate-directional` | 31 | **real**, and 16 of them are the carousel (B-5). |
| `gradient-directional` | 216 | **almost certainly decoration.** Overwhelmingly `linear-gradient(135deg, …)` colour washes — burnt orange, greens, translucent overlays — fanned ×8 by the locale blocks. A diagonal wash tilting the other way is not a defect anyone perceives. |
| `rotate` | 13 | **decoration**, already established: AR-1 measured all 13 as rotations of *symmetric* glyphs (`×`, `−`, the logo). |

**So the real mirror population is ~243 source hits, not 472 — and 229 of the 472 are a class
the classifier cannot distinguish from the real ones.** This is the same shape as the two
sizing traps AR-1 already recorded (`left:`/`right:` 713 → 145 real once the `-9999px` clip
is excluded; `box-physical` 26 source → 224 rendered), and it is the fourth time on this
project that a recorded size turned out to be a hypothesis about the measurement window.

**This is precisely why the audit must not be promoted to blocking as it stands.** A gate
built on `class === 'mirror-required'` would block on 229 hits that need no work — a 48%
false-positive rate, which is the ADR-10 situation again, and it ends the same way: a
suppression list, then an exemption config, then `--no-verify`.

⚠ **The gradient judgement is mine from form inspection, not a verified rendering claim.**
It is exactly the kind of call that needs an eye rather than a regex — which is what §5 is
for. Do not act on the 216 in either direction until it has been looked at.

---

## 5. How to get a browser-observable RTL surface without authoring Arabic

**Flip a populated locale to `rtl` in the registry, rebuild, and look.** One line:

```
LOCALES: de → dir: 'rtl'
```

B-1 already proved this exact flip works and is tracked: it rebuilt to 77 × `<html dir="rtl">`
and gate 4k followed it without any other edit. That was used as a *gate* proof; it
generalizes to a *presentation* proof, and it is the piece the "browser verification is
mandatory" framing was missing.

What it buys, immediately and with no content work:

- **77 fully-populated RTL routes** instead of 1, including the homepage and `/utv/` — so the
  carousel, all 256 arrows, every gradient and all 174 physical declarations are on screen.
- **A real corpus for the gradient question** (§4), which cannot be settled by grep.
- **B-5's behavioural half becomes observable**: "slides advance the wrong way and slide 1
  starts off-screen" is a claim about runtime behaviour and this is the only way to see it.

Constraints, stated so the technique is not misused:

- **Diagnostic build only. Never committed.** It is a measuring instrument, like the scratch
  manifest B-1 put in the scratchpad rather than in the foreign repo.
- **It is a false RTL surface**: German text in an RTL paragraph is not Arabic, so it proves
  *layout and glyph* behaviour and proves nothing about typography, fonts or line breaking.
  Those are the things the eventual Arabic corpus tests.
- **It must be reverted before any commit**, and `git status` checked, because 4k will
  faithfully follow the flip and every page's `dir` changes.

---

## 6. The three items, sized from today's tree

### B-5 — carousel *(the only item that genuinely needs a browser)*

16 sliders (`home.ts` ×8, `utv.ts` ×8) drive `translateX(-${index * 100}%)` with a hardcoded
sign against a `display: flex` track, plus 32 `carousel-prev`/`carousel-next` physical
offsets in `home.ts`. Under `dir="rtl"` the track fills right-to-left while the transform
still moves left.

- **Detection:** static and complete — the sign is greppable.
- **Policy:** a source gate could forbid a signed `translateX` on a flex track. Cheap.
- **Verification:** browser, unavoidably. "Slides advance the wrong way" is behaviour.
- ⚠ **The real cost is the 8× duplication, not the fix** — this is 16 copies of one bug, and
  fixing it 16 times is how the 17th copy gets written. The duplication is the finding.

### B-6 — arrows

204 source / 256 rendered `→`, plus 8 `▶`. 7 shared component files, 34 content files.

- **Detection:** static, exact, derived from `Bidi_Mirrored`.
- **Policy:** the clean candidate for promotion — the classification is a Unicode property,
  not a judgement, so it cannot mis-classify.
- **Verification:** none needed. `→` pointing the wrong way in RTL is a Unicode fact, not an
  appearance question. ⚠ The asymmetry AR-1 recorded holds: the 1,004 `›` chevrons need
  **zero** work.

### B-7 — physical CSS

145 `inset-physical` + 26 `box-physical` + 3 `text-align` = 174 source edits, 372 rendered.
Zero `float`, zero `flex-direction: row-reverse`, zero `order:` — the hard cases are absent.

- **Detection:** static; the two sizing traps are already recorded in the backlog.
- **Policy:** mechanical conversion to logical properties. A gate here is a *source* gate and
  could run in `gates:src` beside 4j — the only one of the three that can fail in ~1s.
- **Verification:** spot-check in the substitution build; the conversion is mechanical and a
  wrong one is visible immediately.

---

## 7. Proposed sequencing, and the decisions I need

Ordered so each step's evidence exists before the step that consumes it:

1. **Substitution build** (§5). Flip `de`, rebuild, look at the homepage, `/utv/` and a spoke.
   Settles the gradient question (§4) and turns B-5's claim into an observation. Revert.
2. **B-6 arrows** — the clean promotion. Fix, then decide whether the audit's glyph rules
   become a blocking gate. Verification is a Unicode property, so this needs no browser.
3. **B-7 physical CSS** — mechanical, source-level, spot-checked against step 1's build.
4. **B-5 carousel** — last, because it is the only one whose fix needs re-verification in a
   browser, and because its real problem is the 8× duplication rather than the sign.
5. **Only then** the policy decision: does `rtl-inventory.mjs` become a gate, and on which
   rules? By then three of its five `mirror-required` rules will have been resolved and the
   two decorative ones will have been ruled on with an eye.

**Decisions I cannot make:**

- **(a) Is the substitution build acceptable?** It is a temporary registry edit to a shipped
  locale, reverted before commit. Low risk, but it is a deliberate ephemeral change to
  production config and that is the owner's call, not mine.
- **(b) Do the 216 directional gradients need mirroring?** §4 argues they are decoration.
  This is an aesthetic judgement about your site and I should not make it.
- **(c) Should B-5's 8× duplication be de-duplicated as part of the fix, or fixed in place
  16 times?** De-duplicating is the larger change and touches non-RTL behaviour on 8 locales;
  fixing in place is smaller and preserves the defect's shape. Architectural, so it is yours.
- **(d) Does Track B block Arabic content expansion?** §1 shows Track B has no RTL surface,
  so the two are less coupled than the backlog assumed — expanding Arabic *creates* the
  surface. The backlog's sequencing is still the safer one, but it is now a choice rather
  than a constraint.

---

## 8. Non-goals

- No second stylesheet. ParkingWay ships a live RTL tree with **zero** `[dir="rtl"]`
  selectors; AR-1's stop condition does not fire and nothing here proposes one.
- No bidi runtime, no locale-specific fork — both are declared stop conditions.
- Nothing in this brief touches inline bidi semantics. That is B-2 and gate 4n, closed.
- No Arabic content is authored by Track B.
