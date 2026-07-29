# ADR-11 — A diagnostic that violates a repository invariant runs in a detached worktree

**Status:** IMPLEMENTED — AR-2 Track B substitution build, 2026-07-28.
Retroactively descriptive of the B-1 cross-host proof, which already put its scratch
manifest in the scratchpad rather than in the foreign repo for the same reason.
**Relation to ADR-9/ADR-10:** none. Those govern what the framework asserts. This
governs *where a measurement is allowed to run.* It is an operational rule, not a
correctness one.
**Context phase:** named while running the Track B substitution build, after
observing that the `k` auto-commit bot had already swept three phases' source files
into commits before they could be staged.

---

## 0. The one-line invariant

> **A diagnostic that deliberately puts the repository into a state that must never
> ship runs in a detached worktree, never in the primary working tree — regardless
> of how briefly the state is meant to exist.**

---

## 1. Context

Track B needed a populated RTL surface. The technique, established by B-1, is a
**substitution**: flip one shipped locale's `dir` in `src/lib/i18n.ts`, rebuild, look,
revert. One line, reversible, and it produces 77 populated RTL routes without
authoring a word of Arabic.

`AR2-TrackB-brief.md` §5 stated the constraint correctly — *"diagnostic build only,
never committed … it must be reverted before any commit, and `git status` checked."*
That framing makes safety a function of **discipline**: remember to revert, remember
to check.

It is not a safe framing in this repository, for a reason that has nothing to do with
Git and everything to do with this project's automation.

---

## 2. The forcing constraint

An external process commits the working tree as `k` and pushes to `origin`. It is
fast and it is indiscriminate. Measured behaviour, recorded across three phases:

- it swept the source files of both B-2 phases into `94f3bf9` and `891872c` and
  **pushed them** before the phase could commit;
- it committed a parallel workstream's in-flight files as `b3d03a7` **during** the
  Track B session;
- it did the same again as `e737785` minutes later.

A full build in this repository takes ~4–5 minutes. So "flip, build, revert" asks a
`dir: 'rtl'` on a shipped locale to survive a **multi-minute window** in a tree that
is being committed and pushed by something that does not know what the flip is for.

The failure is not hypothetical and it is not recoverable by care:

- reverting after the build does not help — the bot commits *during* it;
- `git status` before committing does not help — the bot is the committer;
- the change is one line and looks entirely legitimate in a diff.

**The consequence would be a shipped locale silently serving RTL to production**, past
every gate: 4k would *pass*, because 4k tests effective direction against the
registry, and the registry is what was edited. The gate designed to catch a direction
defect is blind to this one by construction.

---

## 3. Decision

Run it in a detached worktree:

```
git worktree add --detach <scratchpad>/<name> HEAD
New-Item -ItemType Junction <name>\node_modules -> <repo>\node_modules   # Windows
<make the violating edit>
npm run build
```

Properties that matter:

| property | why it matters here |
|---|---|
| **Unreachable by the bot** | the bot watches the primary tree; a detached worktree in the scratchpad is not it |
| **Detached HEAD** | there is no branch for the change to be committed *onto* |
| **Disposable** | `git worktree remove --force` — no revert step, so no revert to forget |
| **Reproducible** | the setup is four lines; the diagnostic can be re-run months later |
| **Isolated** | `git status` in the primary tree stays empty for the whole run |

The `node_modules` **junction** is what makes this cheap rather than theoretical:
setup is ~10 seconds instead of a full `npm install`, so the isolated path is not the
inconvenient one. A rule that costs four minutes gets skipped; a rule that costs ten
seconds does not.

---

## 4. Scope — what counts as "violates an invariant"

This applies when the diagnostic's whole point is a state that must not ship. On this
project that has now been three things:

| diagnostic | the violating state | phase |
|---|---|---|
| direction substitution | a shipped locale declared `rtl` | AR-2 B-1, Track B |
| fail-closed proof | `<Bidi>` deleted from a `Header.astro` call site | AR-2 Track A |
| S3 reproduction | a `lang === 'ar' ? undefined : …` branch in `BaseLayout` | AR-2 B-1 |

It does **not** apply to ordinary work-in-progress. A half-finished feature in the
primary tree is a normal thing for the bot to commit; that is what the bot is for.
The discriminator is not "is this unfinished?" but **"if this were committed and
pushed right now, would it be a defect in production?"**

Corollary already followed once, before the rule was named: B-1's cross-host proof put
its scratch manifest in the **scratchpad** rather than in `parkingwayastro`, keeping
that repository fully read-only. Same invariant, different host.

---

## 5. Consequences

**Positive.** The primary tree is never in a shippable-looking broken state. The
diagnostic becomes an artifact rather than an episode — the Track B worktree was left
in place, served on `:4331`, and remains the browser surface for B-6/B-7/B-5b instead
of being rebuilt each time. And the technique composes: two worktrees ran
simultaneously in the Track B session (`rtl-diag` for the RTL surface, `b5a` for the
B-5a baseline) without interfering with each other or with the primary tree.

**Negative.** Disk: a worktree is a full checkout (~1,032 files here). Worktrees
accumulate silently — `git worktree list` is the only thing that shows them, and a
stale one holds a `HEAD` reference. Dispose deliberately.

⚠ **Disposal order matters on Windows: remove the junction first.**
`git worktree remove --force` fails on the `node_modules` junction with
`failed to delete …: Invalid argument`, and it fails **partway** — the checkout is
already gone and the registry entry is stale, so a second `remove` then reports
`is not a working tree`. Recovery is `git worktree prune` followed by `rm -rf`. The
clean sequence:

```
cmd /c rmdir <worktree>\node_modules     # removes the link, never the target
git worktree remove --force <worktree>
```

`rmdir` on a junction does not follow it. Verify the real `node_modules` survived
before doing anything else — this is the one step in the technique that can damage the
primary tree.

**Neutral.** A worktree sees the same `node_modules` through the junction, so a
diagnostic cannot test a dependency change. Nothing here needs that; a diagnostic that
did would need a real install.

### 5.1 ⚠ A worktree checkout may not be byte-identical to the primary tree

Found while landing B-5a, and it will bite anyone who compares build output *across*
trees rather than within one.

`.gitattributes` here is `* text=auto`, so the repository stores LF and a checkout
converts. **`git worktree add` performed that conversion; the primary working copy
never had it.** Measured on the same commit:

| file | primary tree | worktree checkout |
|---|---:|---:|
| `src/page-content/home.ts` | 246,171 B, **0** CR | 250,308 B, **4,137** CR |
| `src/page-content/utv.ts` | 181,255 B, **0** CR | 184,457 B, **3,202** CR |

Content identical after stripping CR; every line differs before. This matters more
than a cosmetic diff, because these files are **template literals whose newlines are
part of the emitted string** — the inline `<script>` blocks carry their line endings
into `dist`. So a worktree build and a primary-tree build of the same commit produce
HTML that differs in exactly those bytes.

**The rule that follows: a byte-identity proof must be a *within-tree* before/after.**
B-5a's was (baseline and after both built in the worktree, 858 files, 0 differences),
so it stands. Comparing a worktree `dist` against a primary-tree `dist` would have
produced thousands of spurious differences and no real signal.

Corollary for landing the change: verify the transform *itself* transfers, rather than
re-running the proof. Applying the same script to the primary tree and asserting
`tr -d '\r' < worktree-file == primary-file` shows the identical edit was made without
pretending the two trees' bytes are comparable.

---

## 6. ⚠ What the substitution build does NOT prove

Recorded here because the constraint is a property of the *technique*, not of Track B,
and the next person to reach for it will need it.

`AR2-TrackB-brief.md` §5 bounded substitution as proving "layout and glyph behaviour"
and proving nothing about "typography, fonts or line breaking." **That bound is too
narrow.** It also does not model **bidi flanking**.

ADR-10's invariant is a flanking-*type* rule. In a `de → rtl` substitution the flanks
are German — gate 4n reported `"(" flanked L … N` on 290 nodes across 76 routes. In
real Arabic prose the same phone number is flanked `R … N`, which resolves differently
under UAX #9 N1/N2. So those 290 are genuine defects **of the diagnostic build** and
are not a forecast of the Arabic corpus.

**A substitution build is a valid instrument for anything that depends only on
direction, and an invalid one for anything that depends on the surrounding script.**
Quote its numbers as statements about the diagnostic, never as a corpus measurement.
