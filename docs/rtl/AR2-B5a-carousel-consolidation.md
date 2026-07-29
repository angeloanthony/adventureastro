# AR-2 B-5a — carousel consolidation

**Status: COMPLETE 2026-07-28.** Pure de-duplication. No behaviour change, no RTL
work. Acceptance test: **the rendered output must be byte-identical to the
pre-refactor build.** It is — 858 files, 0 differences.

RTL behaviour is **B-5b**, deliberately a separate phase.

---

## 1. Why this ran before B-6

`AR2-TrackB-brief.md` sized B-5 as "16 sliders … the real cost is the 8× duplication",
and ordered it **last** because it is the only item needing browser re-verification.
The substitution-build measurements (`AR2-TrackB-substitution-build.md` §5) changed
that: the duplication is **generated, not semantic**, so removing it first makes every
later RTL change smaller. Order is now **B-5a → B-6 → B-7 → B-5b**.

The precedent is in this repository and in the same file. `home.ts`'s own header
records **P31**, which de-duplicated the 105-slide photo gallery out of the eight
locale blocks and proved it the same way:

> *"the rendered output of all eight homepages is byte-identical to the pre-refactor
> build."*

B-5a is that move again, on the carousel instead of the gallery.

---

## 2. What was actually duplicated

Not 16 sliders. **Two implementations, each cloned eight times along the locale
axis** — each locale block is a whole-page template literal carrying its own inline
`<script>`.

| file | implementation | selector | copies | distinct hashes |
|---|---|---|---:|---:|
| `home.ts` | `class Carousel` | `.carousel-track` | 8 | **1** |
| `utv.ts` | IIFE `goTo()` | `.docs-beach-carousel-track` | 8 | **1** |

Owning constants in both files: top-level (EN), `ES`, `IT`, `PT`, `FR`, `DE`, `JA`,
`ZH`. Zero divergence between copies — which is what made the transform mechanical
and the proof exact.

---

## 3. The transform

One constant per file, declared after the imports, interpolated at the eight former
sites. The extracted text is the *source* form — already escaped for life inside a
template literal (`` \` ``, `\${`) — so re-wrapping it in a template literal
reproduces the same string.

| file | block | copies | bytes removed |
|---|---:|---:|---:|
| `src/page-content/home.ts` | 3,189 B / 58 lines | 8 | 21,732 |
| `src/page-content/utv.ts` | 1,024 B / 24 lines | 8 | 6,707 |

Placement detail that makes it byte-exact: the constant holds the **leading
indentation of its first line**, and the placeholder sits at column 0. Interpolating
`${HOME_CAROUSEL_JS}` at column 0 therefore re-emits the original indentation.

The script refuses to run unless it finds **exactly 8** byte-identical copies.

---

## 4. Proof, in three independent steps

**(1) Reverse transform — source level.** Substitute the constant back at every
placeholder, delete the declaration, require the result to reproduce the original file
byte-for-byte. This is the technique the P11 link pass established. Passed on both
files, in both trees.

⚠ **Two bugs in the first verifier, both worth recording**, because each would have
produced a *false* pass or a misleading fail:

- Searching for the declaration's closing `` `; `` finds one **inside the block**:
  ``this.track.style.transform = \`translateX(-\${this.currentIndex * 100}%)\`;``
  truncated the removal and left half the class behind.
- A blank-line off-by-one between the inserted note and the declaration.

Fixed by **reconstructing the exact declaration string the forward transform writes**
and removing that, rather than pattern-matching for its boundaries. The removal can no
longer drift from the insertion — a verifier that shares the forward transform's
definition cannot disagree with it about what was inserted.

**(2) `astro check`** — 0 errors, 0 warnings, 268 hints (unchanged).

**(3) Build byte-identity — the acceptance test.**

```
baseline (HEAD)     : 620 pages, 858 files
after consolidation : 620 pages, 858 files
diff -r -q          : 0 differing entries
```

Both builds in the **same** worktree, before and after the edit. Full gate suite on
the consolidated tree: `npm run validate` **exit 0** — `validate-site`, 4m, 4k, 4n,
4f, 4h, 4i, 4g all green.

---

## 5. ⚠ The sizing was wrong in the direction nothing else on this project has been

Every prior instance of the recorded-size lesson made a number **smaller**
(`left:`/`right:` 713→145, `mirror-required` 472→~243, `zh 指南` 81→mostly compass).
This one makes it **bigger**.

`translateX` is not the only direction-coupled behaviour. In `home.ts`'s `Carousel`:

| behaviour | source | counted as B-5? |
|---|---|---|
| `translateX(-i*100%)` against a `display:flex` track | `updateCarousel()` | yes |
| `ArrowLeft` → `prevSlide()`, `ArrowRight` → `nextSlide()` | `init()` | **no** |
| swipe sign: `touchStartX - changedTouches[0].screenX`, `diff > 0 ? next : prev` | `addTouchSupport()` | **no** |

Site counts before this phase: `ArrowLeft` ×8, `ArrowRight` ×8, `touchStartX` ×24,
`screenX` ×16 — all in `home.ts`, none in `utv.ts` (which has no keyboard or swipe
handling at all).

**True surface: 3 behaviours × 8 copies + 1 × 8 = 32 sites of 4 kinds.** After B-5a:
**4 sites in 2 files.**

The lesson generalizes past this phase: *a grep for the mechanism you already know
about sizes the mechanism, not the defect class.* `translateX` was the greppable
symptom; direction-coupling was the actual property, and two of its three carriers
share no tokens with the third.

---

## 6. Landing it — and a trap found in the process

The proof ran in a worktree per **ADR-11**. Landing it in the primary tree exposed
something that invalidates the obvious shortcut:

**The worktree checkout is CRLF; the primary working copy is LF** (`* text=auto`
converts on checkout; the primary copy predates it). `home.ts` = 250,308 B / 4,137 CR
in the worktree vs 246,171 B / 0 CR in the primary tree, content identical after
stripping CR.

Since these files are template literals whose newlines are emitted into `dist`, **the
two trees do not produce byte-identical HTML** — so "build the worktree, diff against
the primary tree's dist" would have reported thousands of spurious differences.

What was done instead: apply the same script to the primary tree, re-run the reverse
transform there, and assert `tr -d '\r' < worktree-file == primary-file` — proving the
**identical edit** was made without pretending the trees' bytes are comparable. Both
files passed. Recorded as ADR-11 §5.1.

---

## 7. What B-5b now has to change

Four sites, two files, one per behaviour:

| # | site | change |
|---|---|---|
| 1 | `HOME_CAROUSEL_JS` → `updateCarousel()` | transform sign follows direction |
| 2 | `HOME_CAROUSEL_JS` → `init()` | `ArrowLeft`/`ArrowRight` mapping follows direction |
| 3 | `HOME_CAROUSEL_JS` → `addTouchSupport()` | swipe sign follows direction |
| 4 | `DOCS_BEACH_CAROUSEL_JS` → `goTo()` | transform sign follows direction |

Verification surface, from the substitution build: `/de/` and `/de/utv/` are the
**only two of 77 routes** carrying a carousel. B-5b needs a browser and it needs
exactly two pages.

Open question deferred to B-5b, not decided here: whether direction is read at runtime
(`getComputedStyle(document.documentElement).direction`) or interpolated at build time
from the locale. Runtime reading keeps the constant a single string with no
per-locale variants — which is the property B-5a just bought — so it is the
presumptive choice, but it is B-5b's call to make against a browser.
