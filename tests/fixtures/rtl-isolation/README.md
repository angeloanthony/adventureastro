# RTL isolation fixtures — the corpus this host does not contain

Every file here is a rendered-shaped HTML document used by `scripts/test-4n-differential.mjs`.
They exist because **adventureastro cannot tell gate 4n's rule from the rule ADR-10 rejected.**

ADR-10 §2.2 measured why: this repository's `same`-flank population is **zero**. All four of
its mirrored-character text nodes span a direction change, so the accepted rule and the
coarse rule ("any mirrored character outside an isolated run") both return **0 findings**
here. A green gate is compatible with either algorithm being implemented, which means a
later "simplification" back to the coarse rule would pass every check this repository owns.

So the fixtures are chosen for one property: **they make the two rules disagree.** The
`correct-*` files are content that is correct as written and that the rejected rule flags
anyway — the 70% false-positive class, reproduced in miniature. Without them the
discriminating clause is untested and the ADR's central finding is unprotected.

| File | What it pins |
|---|---|
| `correct-arabic-parentheses.html` | Arabic parentheses around Arabic content. **Required by ADR-10 §7.** |
| `correct-latin-address.html` | An all-Latin address inside an RTL document — brackets between two L runs. |
| `correct-isolated-phone.html` | The B-2 fix. Isolation exempts, in both rules. |
| `correct-structural-isolation.html` | Isolation via `dir` on an ordinary element, not `<bdi>` — ADR-10 §5. |
| `defect-latin-in-arabic.html` | `الوصول (ARRIVI)` — the real defect, 22 of which ship on ParkingWay. |
| `defect-bare-phone.html` | The `404.astro` bypass shape: a phone outside the formatter. |
| `defect-digit-flank.html` | A bracket between Arabic and a digit run — the digits-as-flank decision. |
| `defect-block-boundary.html` | A correct-looking run whose other flank is in a different block. |
| `scope-ltr-document.html` | The same hazard text in an LTR document, which is **out of scope**. |

Add a case here when a measurement changes the rule — not when a page changes. These are
not regression snapshots of the corpus; they are the evidence that the implemented rule is
the specified one.
