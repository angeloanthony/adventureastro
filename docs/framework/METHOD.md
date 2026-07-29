# Engineering method

**Status: governing document.** This is how evidence is evaluated on this
project. It outlives any single phase — it was extracted from the Arabic/RTL
initiative (AR-1, AR-2 Tracks A and B) but nothing in it is RTL-specific.

Every rule below is followed by the measurement that earned it. That is
deliberate: a rule without its evidence gets applied where it does not belong,
and a rule *with* its evidence can be retired when the evidence stops holding.
For the short version to put in front of a review session, see
[`REVIEW_PROMPT.md`](REVIEW_PROMPT.md).

---

## Objective

Build a multilingual framework in which adding a locale — particularly an RTL
locale — requires **content work rather than framework redesign**.

The objective is not to maximize code changes. It is to maximize confidence that
each change is necessary and correct.

> **A measurement that reduces implementation is a success, not a failure. The
> objective is to discover the smallest change set that fully explains the
> observed behaviour.**

That sentence describes almost every phase this project has run:

| phase | inventory | shipped |
|---|---|---|
| B-2 / Track A | 101 bidi candidates across two corpora | 3 helpers, 9 call sites; the 101 were false positives |
| B-5a | 16 apparent carousel implementations | 2 implementations, then 4 remaining behaviours |
| B-6 | 204 arrow candidates | 1 helper + 1 gate, **zero live repairs** |
| B-7 | 174 physical CSS declarations | 62 validated conversions |

Deleting work through evidence is a primary success metric here, not a
consolation prize.

---

## The four layers

Never do work in one layer while believing you are in another.

| layer | owns |
|---|---|
| **Contract** | document direction, bidi semantics, locale registry and policy |
| **Presentation** | CSS, layout, interactive behaviour |
| **Verification** | gates, validators, differential tests |
| **Content** | translated routes |

Content expands **last**, so new pages inherit a proven foundation instead of
multiplying a framework defect across the route set. The backlog's own
sequencing argument: 57 Arabic spokes onto a direction-blind carousel is one bug
across 77 routes.

---

## Rules of evidence

### 1. Measurement precedes implementation

Never recommend a transformation because a search found a candidate.

### 2. Inventories over-approximate by design; classification determines the work

An inventory is a discovery tool. It answers *does a candidate exist?* — never
*is this a defect?* Report the ratio, not just the result.

> B-6: 204 source arrows → 64 comments and tooling output, 136 correct LTR
> content, **4 real**. A gate that banned the glyph would have reported 204
> findings against a corpus with zero live defects.
> — [`AR2-B6-affordance-arrows.md`](../rtl/AR2-B6-affordance-arrows.md)

### 3. Ask what owns the result

Classification says what a declaration *should* be. Ownership says whether it
*decides* anything. Establish ownership by **intervention** — remove the cause,
re-measure, restore — never by reasoning down the cascade.

> B-7 added ownership as a third filter after census and classification, and it
> retired 4 of 66 declarations: three whose markup exists on 0 of 620 pages, and
> one that was redundant against an earlier reset. Two of the phase's four
> "not mechanical" findings turned out to concern dead code.
> — [`AR2-B7-classification.md`](../rtl/AR2-B7-classification.md) §5.2

**A null result is scoped to the conditions it was measured under.**
`.lang-menu { right: 0 }` reads dead on the Arabic page and owns on LTR
(`0px → −86px`). Document direction is one of those conditions.

### 4. A negative finding is trustworthy only after the measurement path has produced a positive under comparable conditions

This is the project's central rule.

> B-7: a batched CDP probe reported 18 declarations dead; re-tested in fresh
> processes, **16 of them own**. Four structural fixes changed nothing; only
> process isolation did. Believing it would have dropped a bullet already
> photographed as broken.
>
> B-5b: the carousel autoplays every 5000ms, so "something changed after input"
> is satisfied by elapsed time alone — the obvious control passes over a
> completely dead input path.
> — [`AR2-B5b-instrument.md`](../rtl/AR2-B5b-instrument.md)

Corollary: **when a confound has a fixed sign, use the opposite sign as the
oracle** rather than suppressing the confound. Suppressing it means mutating the
system under test.

### 5. The instrument is a deliverable, not a convenience

If a later phase depends on a measurement, commit the instrument that produced
it. Give it a positive control, and prove the control can fail — *a control that
cannot go red is decoration.*

> B-7 opened a browser for the first time and left nothing behind; B-5b
> therefore began with an instrumentation problem rather than a behaviour
> problem. `scripts/rtl/control-keyboard.mjs --falsify` presses a key with no
> handler through the identical path and requires red on exactly the
> input-dependent steps.
>
> Same shape as `npm run test:4n`: the differential ships beside gate 4n because
> a green 4n proves nothing — the *rejected* rule also passes this corpus.

### 6. Separate the measurement from the thing measured

An instrument failure and an application failure must never be observationally
identical.

> B-5b's control has three exit codes — validated / assertion failed / never
> reached a verdict — because one run in an early batch of 15 exited non-zero
> with its output discarded and could not be attributed after the fact.

### 7. Test the finding you are most confident about first

> `.policy-list ul { padding-left: 0 }` was the sharpest finding in the B-7
> classification and the one measurement falsified: an earlier `* { padding: 0 }`
> had already zeroed the UA indent, so the declaration is dead, not defective.
> A classification nobody can check is a longer census.

### 8. A recorded size is a hypothesis about the measurement window

When a count looks wrong, re-census varying the **axis**, not the threshold.

> Raw `left:`/`right:` = 713, of which 568 are the `left:-9999px` visually-hidden
> clip → real count **145**. `box-physical` is 26 source edits but **224**
> rendered occurrences, because component `<style>` blocks are inlined per page.
> B-5's 16 sites were really **32 of four kinds** — the first time a recorded
> size grew.

### 9. A differential is evidence only if the tree is constant across both builds

> B-6's first differential reported 33 changed files, **25 of them somebody
> else's** — an auto-commit bot landed mid-phase and a parallel workstream held
> uncommitted edits. Within-tree comparison is necessary and not sufficient.
> — [`adr/0011`](adr/0011-diagnostic-substitution-runs-in-a-detached-worktree.md) §5.1

### 10. The environment silently alters the input to a measurement

Verify what the tool **received**, not what you passed it.

> Three instances: `git checkout --` re-materialised a stylesheet as CRLF and it
> is copied verbatim into `dist/` (twice); Git Bash rewrote a lone `/` argument
> into a Windows path before Node saw it.

### 11. Where a delta lands is decided by the delivery mechanism, not the semantic effect

> B-7 predicted "LTR pages byte-identical, delta on `/ar/`". Actual: `/ar/` HTML
> **byte-identical** (external stylesheet) and **18 LTR pages changed** (inlined
> component styles). The prediction was inverted, and the reverse-transform proof
> was what made that safe to discover.

---

## Rules of process

### 12. Freeze the classification before the sweep

The sweep is an execution step, not a discovery step. Anything discovered during
a sweep re-opens the classification rather than being absorbed into it.

### 13. State whether a phase delivers prevention or repair

A phase with zero live defects is a legitimate outcome. Say so rather than
manufacturing edits.

> B-6 and gate 4n both shipped against corpora with no live defect. Their proof
> burden is therefore the fail-closed matrix, not a green run.

### 14. Print every exclusion on success

An exclusion nobody sees decays into a suppression list. Gates 4j and 4o print
their exemptions and their out-of-scope decisions on every pass.

### 15. Record rejected candidate rules where the next census will see them

> `de Startpunkt` (10), `zh 指南` (81, mostly 指南针 = compass), `zh 入口` (32),
> `de Trail` (134), and the entire `gradient-directional` class (216) were all
> measured and rejected. They live in the configs so they are not re-proposed.

### 16. Distinguish corpus-dependent from corpus-independent verification

A gate whose lexicon is frozen against a corpus that lacks the defect will
certify that defect.

> **A9**: the untranslated `Key Takeaways` was already present when gate 4f's
> marker lexicon was frozen, so its own tokens self-excluded. The repair
> precedent runs the other way — `ar`'s 4f/4g lexicon is the **union of all seven
> completed locales'**, never an Arabic census.

Policy rules (numbering systems, script ranges) can ship before content.
Census-derived rules (proper-noun drift) need a pilot batch first.

### 17. Diagnostics that violate a repository invariant run in a detached worktree

Discriminator: *if this were pushed right now, would it be a production defect?*
— not *is this unfinished?*
— [`adr/0011`](adr/0011-diagnostic-substitution-runs-in-a-detached-worktree.md)

---

## Output discipline

Lead with what the measurement showed, then what you did about it. Use ✔ / ⚠ /
➡. Quote real numbers and real `file:line` references.

**When a prediction was wrong, say so plainly and say what it cost.** The
inverted proof shape (rule 11) and the falsified declaration (rule 7) were the
two most useful findings of their phases.

When reviewing a phase, state:

1. what the measurements proved,
2. what changed,
3. what was deliberately excluded, and why,
4. the remaining risks and dependencies.

Never recommend additional implementation unless the evidence requires it.

**Escalate rather than assume** when a stop condition fires, a measurement
contradicts a frozen decision, the owner's product judgement is required, or a
proof would require touching a parallel workstream's files.
