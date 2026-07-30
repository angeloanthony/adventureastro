# AR-2 Track D — owner decisions D1–D4, resolved

**Method rules applied:** 1 (measurement precedes implementation) · 8 (a
recorded size is a hypothesis about the measurement window) · 9 (the
differential contains only files the change explains) · 13 (prevention or
repair, stated) · 16 (corpus-dependent vs corpus-independent verification)

**Planning baseline: `f2ade7a`.** That commit versions
[`AR2-TrackD-brief.md`](AR2-TrackD-brief.md) (346 lines) and is the verified
Track D planning baseline. Its message is `k` — written by the external
auto-commit process, not by the author — so the commit message is *not*
evidence of its content. History was deliberately not rewritten; this note is
the discoverability repair. The commit also carries a one-line
`.claude/settings.json` permission grant, which is harness-owned and out of
scope for every Track D item.

**Status: DECISIONS ONLY — no implementation begun.** Resolved 2026-07-30,
before any Track D source edit.

---

## 1. The four decisions

| id | question | class | blocks implementation? | resolution |
|---|---|---|---|---|
| **D1** | does B-9 land in Track D? | **engineering** | **yes** — it is work item D-1 | ✔ **land it** |
| **D2** | fail-closed dispatch in place of an Arabic connective branch? | **engineering** | **yes** — it defines D-2's shape | ✔ **yes, fail-closed** |
| **D3** | B-10b locale scope: `ar` only or all nine? | **product / policy scope** | **yes** — it fixes D-3's deliverable | ✔ **all nine** |
| **D4** | authorize the Arabic prose pilot batch as Track E? | **corpus policy** | **no** — no Track D item has a corpus prerequisite | ✔ **authorized, conditional on Track D closing** |

Three of the four gate implementation. D4 does not, and is recorded here so
that it is resolved rather than carried as an implicit assumption.

---

## 2. D1 — B-9 lands in Track D

**Class: engineering.** The question is whether a config-time script check has a
test surface, which is a measurable property of the registry, not a judgement
about product scope.

**Resolution: land it as D-1.**

**Rationale.** The inherited record classified B-9 as corpus-gated. That
classification was measured against the registry and is false — brief §0.1, and
re-verified here directly against source:

- [`gate-4i-glossary.mjs:250-259`](../../scripts/gate-4i-glossary.mjs#L250-L259)
  branches on `latin`, `han` and `japanese`. There is no `arabic` case; the
  `latinLock` escape is read once, above the three branches, and would apply to
  a fourth unchanged.
- [`4i-glossary.json`](../../i18n-gates/4i-glossary.json) carries **two** `ar`
  locks (`dinosaur-country`, `offroad-trail`), both landed at AR-1 and enforced
  today.

So the surface is live and unvalidated *now*, and validating it needs zero
corpus. Two locks currently correct is a Rule 13 prevention case, not a repair —
the proof burden is the fail-closed matrix in brief §7 D-1, and a green run
proves nothing on its own.

**The cost of not landing it** is the operative point: Track E's first act is to
add Arabic locks. Deferring D-1 means those locks are filed at the exact moment
script misfiling is most likely and least observed.

## 3. D2 — fail-closed dispatch, not an Arabic branch

**Class: engineering.** Verified against source:
[`gate-4h-seams.mjs:304-306`](../../scripts/gate-4h-seams.mjs#L304-L306) is
`entry.script === 'latin' ? wordBoundaryForm : cjkForm`. Arabic is
space-delimited and takes the CJK no-word-boundary form.

**Resolution: fail-closed dispatch, as recommended.**

**Rationale.** An Arabic branch now would be a matcher for a connective list
that does not exist — `ar` declares **0** connectives, measured. That ships
config nothing measures, which is the F2 M-4 defect the 4h `$doc` already
refuses by name. Fail-closed dispatch is the falsifiable half: an
`entry.script` with no explicit rule *that declares connectives* exits as an
instrument failure naming the script, rather than silently selecting a form.

This converts "latent because the data is empty" into "structurally
impossible," which is precisely what makes populating the Arabic connective
list in Track E safe without re-auditing the dispatcher. B-8b stays open and
corpus-gated; the `ar` 4h entry's `state: "in-progress"` marker stays as-is,
because it describes B-8b, not B-8a.

## 4. D3 — all nine locales

**Class: product / policy scope.** Both options are engineering-sound; the
question is how wide a policy rule AR-2 is authorized to write. **Owner
decision: all nine.**

**Rationale.** A numbering-system rule is not Arabic-specific — the Eastern
Arabic-Indic range `[۰-۹]` is Persian/Urdu, so the check is inherited free by
any future locale in that family. Marginal cost is zero: the scan already walks
every route in `dist/`.

**Consequences now fixed for D-3's deliverable:**

- Forbidden-range check over `[٠-٩۰-۹]`, applied per locale across all nine.
- The `de` injection case in brief §7 D-3.1 **stands** — it is the control that
  proves the rule is per-locale rather than Arabic-only.
- The success table is **nine rows**, printed on pass (Rule 14).
- Rule 8 constraint unchanged and load-bearing: **forbidden-range, never a
  counted floor.** Today's measurement is 0 occurrences across 9 locales,
  measured on the 12:39 build. A floor derived from it would be a floor of 0 —
  a lock that can never fail, the defect the 4i `$doc` already records against
  the `Key Takeaways` lock. The `0` is the window's answer, not the rule's
  parameter, and the window (1 `ar` route) is recorded beside it.

## 5. D4 — Track E authorized, conditional on Track D closing

**Class: corpus policy.** **Blocks nothing in Track D** — §6 of the brief
establishes that none of D-1/D-2/D-3 has a corpus prerequisite.

**Resolution: authorized in advance.** When D-1/D-2/D-3 land and the policy
layer closes, `MULTILINGUAL_HANDOFF.md` §7 stage 2 for `ar` — the Arabic prose
pilot batch — begins as Track E without a further decision gate.

**Rationale.** This is the decision that actually unblocks Arabic. B-8b (the
Arabic seam rule) and B-11 (proper-noun drift in body prose) are both
census-derived under Rule 16 and both need a floor measured against connected
prose. The corpus available today is **one** rendered `ar` route
(`dist/ar/cancellation-policy/`, 27 KB) against 77 for every other locale — a
window that cannot produce a floor that means anything.

Resolving D4 in advance also breaks the circularity recorded in brief §0.2: the
inherited plan gated prose on B-8 and B-8 on prose. With B-8 split (B-8a ships
now, B-8b waits on corpus) and Track E authorized on Track D's closure, the
cycle has a defined exit and neither half waits on the other.

**B-8b and B-11 remain open with a named unblock path**, not deferred
indefinitely. Their trigger is the pilot batch, and their trigger is now
scheduled.

---

## 6. Implementation order — fixed

**D-1 → D-2 → D-3.**

The order is not arbitrary; each step is a precondition for the next
measurement being interpretable.

1. **D-1 (B-9, `gate-4i-glossary.mjs`).** First because it is the smallest
   change with the clearest control: one branch following the shape of three
   existing ones, on a registry with two live locks to exercise it. It
   establishes the perturb-and-restore discipline on the simpler surface.
   `gates:src`, pre-build, changes no rendered byte.

2. **D-2 (B-8a, `gate-4h-seams.mjs`).** Second because it is the only item
   requiring the defect be *reproduced before repair* (Rule 4 — a negative
   finding needs a positive under comparable conditions). That is a two-phase
   step with a transient connective injected into `4h-seams.json` and restored
   in the same step, and it wants a clean established baseline underneath it.
   Also `gates:src`, pre-build.

   D-1 and D-2 perturb **different** registry files, so their transient
   injections cannot interfere; sequencing them separately keeps each Rule 9
   differential attributable to one change.

3. **D-3 (B-10b, new `gate-4q-numeral-render.mjs` + `package.json`).** Last for
   three reasons. It is the only `gates:dist` item and the only one needing a
   build. It is the only one adding a file and wiring. And its baseline must be
   measured on a tree where D-1 and D-2 have already landed — otherwise the
   baseline is taken through a window that then moves underneath it (Rule 8).

**A control falls out of that ordering and should be used.** D-1 and D-2 are
predicted to change zero rendered bytes. So D-3's baseline, measured after both
land, must equal the pre-track figure of **0 occurrences across 9 locales**
recorded on the 12:39 build. If it does not, either the prediction was wrong or
the instrument is measuring something other than rendered prose — stop and
explain, per the whole-track criteria in brief §7.

**Unchanged from the brief:** `4q` is the next free gate letter, re-read from
`package.json` as the authority (`4l` reserved by V-1 and unbuilt, `4p` taken by
Track C). One new permanent verifier, no temporary instruments, no browser.

---

## 7. Acceptance of this document

- All four owner decisions explicitly resolved, with class and blocking status
  recorded for each.
- Track D implementation order fixed at D-1 → D-2 → D-3, with the rationale for
  the sequence recorded rather than left implicit.
- `f2ade7a` recorded as the verified planning baseline, so the record does not
  depend on a commit message the author did not write.
- **No implementation begun.** No file under `scripts/`, `src/` or
  `i18n-gates/` has been touched.
- `.claude/settings.json` continues to be treated as harness-owned and is not
  in scope for any Track D item.
