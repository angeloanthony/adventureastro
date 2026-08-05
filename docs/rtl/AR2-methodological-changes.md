# AR-2 — methodological changes during the Arabic rollout

**Status:** OPEN, accumulating. Seeded at batch 7b (52 of 57 spokes) so the entries are
recorded while their evidence is fresh rather than reconstructed from batch reports at closing
time. Becomes a section of the rollout's closing report.

**Scope.** *Methodological* changes only — not implementation. An entry belongs here if it
changed **how the project decides things**, and if a second host adopting the framework would
need to be told about it. Gate builds, brief corrections and authoring rules do not belong
here; they live in [`AR2-rollout-batch-brief.md`](AR2-rollout-batch-brief.md) and the ADRs.

---

## 1. Probe slot 1 stopped being a verifier and became an authoring instrument

**The change.** `measure-currency.mjs` slot 1 was specified (§3.6.1) as a pre-build check.
Through batches 6a–7b it became the step that **decides the authoring before any text exists**.

**Why it needs stating explicitly.** A reader auditing the rollout by counting defects per
batch will conclude *slot 1 never found anything*. That is exactly backwards. Its output is
the defects that never entered the corpus:

| batch | what slot 1 decided | what would have shipped |
|---|---|---|
| 6a | ASCII hyphen is **not** safer than an en dash | a reversed range, reasoned from UAX #9 |
| 6a | `°F` measured before authoring | `95°F` → `F°95` |
| 6b | decimals, comma groups, `US-191` measured LTR | needless isolation as house style |
| 7a | clock times, `24/7`, `I-70` measured LTR | needless isolation |
| 7b | bare `1–2` renders `2–1` | "Days 1–2", five occurrences in the English sources |

**The general form.** An instrument whose findings are acted on *before* the artefact exists
has no defect count, and its value cannot be read from the record it leaves. Say so, or the
next reader will retire it as unproductive.

---

## 2. Rule 18 recurred across three unrelated domains

**The change.** METHOD.md Rule 18 — *a comparison is evidence only if it can distinguish the
candidate answers*, whose body reads "cardinality and identity fail in opposite directions" —
was written about phrase counts. It has since decided:

- **A gate's advisory total** (7b): 4f held at **56 → 56** across a batch that added three
  pages. The stable total was `+3 new, −1 displaced` on page 1, then `−2` more from registry
  displacement. Reading the total alone gives "nothing changed"; the identities all moved.
- **An ADR's filing time** (ADR-12): the proposed anchor rule returns **zero** findings on
  669 pages, and so does the correct one. The corpus cannot distinguish them, which is why
  the rejected rule had to be recorded before implementation rather than after.
- **An instrument's own scoping** (7b): the symmetric phone/currency fix was rejected because
  measurement *could* distinguish it — 11 bare body currency runs read LTR.

**The general form.** The rule is not about phrase counts. Any measurement that reports a
scalar is subject to it. Append-only rule numbering is what let this generalize without
disturbing existing citations.

---

## 3. The verifier began auditing its own assumptions

Three instances, each of which changed a tool rather than a finding:

- **A suppression is a claim.** Auditing `measure-currency.mjs`'s own container guard —
  disabling it and measuring what it removed — found 76 readings that were a **live production
  regression**, not an exclusion (fixed in `3279b71`).
- **A verifier that checks nothing must not report success.** `preflight-ar.mjs` printed
  `clean` on an empty argv. A verification-contract defect with no RTL content at all.
- **A guarantee belongs to the rendering path, not the content.** The phone exemption was
  scoped per surface when `bidi-runs.ts` coverage is per **component**. Same correction had
  already been forced once by `RelatedArticles` vs `FaqAccordion`.

**The general form.** The instrument is a deliverable (Rule 5), so it is also a subject.

---

## 4. Historical regressions became detector validation

Batch 2a rebuilt an unremediated baseline by **reversing its own 28 edits** and proving
exactness by tracked files returning byte-identical to `HEAD`. Batch 7b reconstructed the
pre-fix page to prove the corrected preflight reproduces gate 4n's six findings exactly.

**The general form.** A prospective detector is green the day it ships (ADR-10 §3), so a green
run is not evidence. Replaying a known-bad tree is, and the tree is usually recoverable from
the fix itself.

---

## 5. Repository-wide contracts emerged from locale-specific measurement

The rollout was scoped to Arabic. Two contracts came out of it that are not about Arabic, not
about RTL, and not about rendering:

- **Fragment identity** (ADR-12, gate 4s). Found by comparing sibling locales; the live
  violation it exposed — `#tours`, 572 pages, all nine locales — **predates Arabic and is
  dead in English first**. Arabic exposed a gap in what the tooling checked, not a defect it
  caused.
- **Verification-interface behaviour.** Fail-closed on no input; print every exclusion on
  success (Rule 14); a suppression must justify itself.

**The general form, and the honest framing:** the framework got broader **because the same
measurement discipline kept finding assumptions worth testing** — not because the project's
ambitions widened. Every entry above started as a measurement taken for a different reason.

---

## 6. A verifier's own interface became something to test, not to read

Added at batch 7c, and it is the sharpest instance of §3 rather than a new idea.

`preflight-ar.mjs` printed its findings and **exited 0 unconditionally**. Its header says its
whole job is to "fail the cheap way before `npm run build` fails the expensive way", and
[`AR2-E4-phase2-tight-ceiling.md`](AR2-E4-phase2-tight-ceiling.md) §11.2 lists it as criterion 0,
*a check that fails*. It could report; it could not fail. Nobody noticed for four batches because
the script is run by a human who reads its stdout — the output was correct, so the interface was
never questioned.

**What found it was running a positive control on the exit code rather than on the output.** The
finding text was right there and had been right there all along; the observable that a build (or a
`&&` chain, or a future CI wiring) would actually consume was the one nobody had exercised.

This is the same defect `b698d0e` fixed one level over — that commit gave the *checked-nothing*
case an exit code and left the *checked-something-and-it-failed* case at 0 — which is why the
entry is about the interface as a category and not about one script:

> **A verifier has two outputs: what it says and what it returns. Only one of them is read by
> anything other than a person, and it is not the one you are looking at.**

Both are now proven by control at every run of the batch procedure: 0 clean / 1 findings /
2 never reached a verdict, the B-5b milestone-1 convention.

## 7. "The rule was right and the tool had not been brought along" is now a recurring failure, not an incident

Three occurrences, all in `preflight-ar.mjs`, all with the same shape: the brief was corrected,
the correction was real, and the instrument implemented a narrower version of it.

| batch | the brief said | the tool did |
|---|---|---|
| 6b | the discriminator is the **flanks** | looked **inside** the brackets |
| 7b | formatter coverage is per-**component** | exempted the phone per-**surface** |
| 7c | mirrored character at a direction change | tested `(` and `)` **only** |

Batch 7c is the one that names the cure, because its fix is not "add guillemets to the list" —
it is to stop keeping a list. The check now reads `\p{Bidi_Mirrored}`, the same **property** gate
4n reads, so the two cannot diverge by omission again.

> **Where a tool must agree with a gate, encode the property the gate encodes — never an
> enumeration of its current members.** An enumeration can silently fall behind; a property
> cannot.

The generalisable diagnostic: when a check and a gate are supposed to overlap, compare their
**alphabets** as well as their logic. 7c's flank logic was a strict superset of the gate's the
whole time, which is exactly why it read as thorough.

## 8. A diagnostic's confirming print can confirm the wrong thing

Batch 7c, the floor proof. The throwaway prose-stripper was written through a shell heredoc that
collapsed `\\b` to `\b` — **U+0008 BACKSPACE** rather than a word boundary — so every
`extractBlock` call silently failed to match and the run deleted two kept blocks along with the
prose. The proof still held (deleting more than prose only makes it stricter), but the
corroborating count was not comparable.

The entry is not about escaping. It is about the check that was performed and did not work:
printing the constructed pattern with `JSON.stringify` to verify it. **`JSON.stringify` renders
U+0008 as `"\b"` — byte-identical to a literal backslash-b.** The verification step returned the
same string for the correct pattern and the broken one, so it could not discriminate, and it
looked like confirmation.

What located it was bisecting the pattern until one component flipped: `<section` matched,
`<section\b` did not. Same lesson as §3 and the enforceability falsifier — a check that cannot
come out both ways is decoration — reached here from the least expected direction, a `printf`
of a regex.

Standing consequence: **diagnostics that carry regexes are written with the file tools, not
through a shell heredoc**, and the rewritten stripper self-checks that its kept-block counts are
non-zero rather than trusting that its selectors matched.

---

## Not yet entries

Recorded so the next session does not re-derive them as new:

- Batch splitting by attributability (6a/6b, 7a/7b/7c) is **operational**, not methodological.
- The advisory-delta diff (batch 4) is a procedure already in the brief §6.3.
- Gate letters, floors, and re-freeze mechanics belong to the brief.
