# AR-2 B-17 — proposal: a browser-layer gate for visual ordering

**METHOD citation:** rules 1 · 4 · 8 · 18 (`docs/framework/METHOD.md`).

**Status:** **proposal only.** Owner has accepted the *framing* (2026-07-31) — this is a new
verification layer, not an extension of 4n or 4q. Nothing is built, nothing is wired, and
whether to build it is a separate decision with its own cost.
**Raised by:** [E-1b](AR2-E1b-currency-probe.md). **Instrument that already exists:**
[`scripts/rtl/measure-currency.mjs`](../../scripts/rtl/measure-currency.mjs).

---

## 1. Why this cannot be 4n or 4q

The three gates now sit on genuinely different observables, and the separation is the point:

| | Verifies | Reads |
|---|---|---|
| **4n** | bidi **structure** — a mirrored character at a direction change is isolated | rendered HTML |
| **4q** | rendered **character policy** — no Arabic-Indic digits in visible text | extracted visible text |
| **B-17** | **visual ordering after layout** | a laid-out page in a browser |

E-1b's measurement is what forces the third row. `$349` in the Arabic FAQ answer rendered as
`349$` while:

- the **characters** were unchanged — `$`, `3`, `4`, `9`, in that order in the source;
- the **character counts** were unchanged — 4q's `ar` window read 12 885 both before and
  after the fix;
- the **extracted visible text** was unchanged — every `visibleText@1` consumer saw `$349`;
- the **Unicode class** was never in scope — `$` is `Bidi_Mirrored=No`, so 4n is silent
  **correctly**, not accidentally.

Only the geometry moved. Every existing gate in the series reads a layer above geometry, so
no amount of extending them reaches it.

The second half of the argument is the conditionality, and it is what makes this a *browser*
gate rather than a cleverer parser. The same literal `$349` renders **correctly** when
paragraph-initial and **incorrectly** after Arabic text, because UBA W2 retypes the digits
only when the last strong type is `AL`. Both facts were measured on one page. A source- or
dist-reading gate would have to resolve the paragraph's strong-type context to tell them
apart — which is reimplementing UAX #9 plus line-breaking, at which point it is a worse
browser than the browser.

---

## 2. What it would assert

For each named run on an RTL page: **visual order == logical order.** The instrument already
computes exactly this, and already classifies runs it cannot measure (no box, or wrapped
across lines) rather than guessing — 2 of E-1b's 12 readings were excluded on that basis, and
one of them was a *correct* phone number that a naive reading called scrambled.

What a gate adds over the instrument is a **blocking policy**, and that is the part that
needs a decision rather than code:

- **What is in scope.** The named runs `bidi-runs.ts` recognizes are the natural population,
  since those are the ones policy §3.2 requires verbatim. A broader "every Latin run" scope
  reopens the false-positive problem ADR-10 §2 measured at ~70 % on a neighbouring question.
- **What a `NOT MEASURABLE` reading does.** Fail-closed says an unmeasurable run blocks. But
  the 1px `.page-summary` is legitimately unmeasurable and legitimately correct, so a
  fail-closed gate blocks a green tree on day one. This is a real design question, not a
  detail.
- **Which routes.** 2 RTL pages today, ~10 after the Track E pilot. This is a *prospective*
  gate in ADR-10's sense — it would ship green, so the fail-closed matrix carries the proof
  burden, not a green run.

---

## 3. The costs that are specific to this layer

Recorded so the decision is made with them visible, not discovered afterwards:

1. **It needs a browser in CI.** Every other gate is `node scripts/…` over `dist/`. This one
   spawns headless Edge over CDP. B-5b's rule-10 finding is directly relevant — the probe
   leaked one Edge process tree *per run* for four milestones before anyone noticed, because
   the spawned binary is only a launcher. Teardown is solved in `probe.mjs` now, but a gate
   runs far more often than a milestone measurement did.
2. **It is slow by the standards of this suite.** Serve, launch, navigate, lay out, read
   per-character boxes. Seconds per page against milliseconds for a dist read.
3. **Its readings are environment-dependent in a way dist reads are not.** Font availability
   changes line breaking, which changes which runs are `measurable`. B-5b already measured
   load-sensitivity in early-page cells.

None of these is disqualifying. All three argue for the same shape: **a separate opt-in
target** (`npm run gate:4r` or similar), run deliberately, **not wired into `build`** — at
least until the RTL corpus is large enough that the class recurs.

---

## 4. Deliberately not decided here

Whether to build it, when, and whether it blocks. E-1b's scope was one measurement; B-15's
was one architecture. **B-15's fix closes today's two instances by construction and closes
nothing about the class** — a `$50` written into an Arabic FAQ answer next year is caught by
`bidi-runs.ts`, but the same amount written into MDX body prose without a `<bdi>` is not
caught by anything, and that is precisely the gap this gate would close.

**The next gate letter is `4r`.** 4q is the highest in use.

---

## 5. A methodological observation, recorded and NOT promoted

E-1b started as *"do dollar amounts render correctly?"* and the durable finding was larger
than the bug: **source inspection cannot answer positional bidi defects.** Stated as a
candidate principle beside rule 18:

> Some defects preserve counts. Some preserve characters. Some preserve extracted text.
> Some change only layout — and each of those is a different measurement window, so a
> window chosen for one class is evidence about nothing in another.

**It is deliberately not proposed as rule 19.** Rule numbers are a permanent API, and the
bar this project has used — set by rule 18 itself, which was recorded five times across
unrelated phases before it earned a number — is **two or three independent occurrences in
unrelated contexts.** This has one. It is recorded here so the second occurrence, whenever it
turns up, is recognised as a second rather than mistaken for a first.
