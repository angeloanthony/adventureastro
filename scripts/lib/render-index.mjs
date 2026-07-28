// scripts/lib/render-index.mjs — the canonical view of rendered output (F3 phase 4b).
//
// WHAT THIS IS. One traversal of `dist/`, one read per page, and a memo for anything
// derived from a page's HTML. Consumers ask the index for pages and derive the
// projection they need; none of them touches the filesystem.
//
// WHAT IT KNOWS. Rendered artifacts and route identity: where a page is on disk, what
// URL it is, and its raw HTML. That is the whole vocabulary.
//
// WHAT IT MUST NEVER KNOW. Gate names, locale sets, glossary policy, seam policy,
// marker policy, anchor policy. It does not even decide which path segment is a
// locale — a consumer that needs that reads `key` and applies its own rule, because
// "the first segment is a locale" is an i18n claim and this module makes none.
// If a change here would require naming a gate, that is an F3 finding: the handling
// belongs in the consumer's query, not in the index.
//
// PROJECTIONS ARE THE CONSUMER'S, NOT THE INDEX'S. There is deliberately no
// `headings()` or `anchors()` method. Those are element-selection decisions that
// phase 4a proved belong to two different contracts, and putting them here would
// merge queries that only look alike. `derive(name, fn)` takes the consumer's own
// function and memoises the result — the index supplies the *once*, the consumer
// supplies the *what*.
//
//     page.derive('visibleText', visibleText)     // gate 4h / 4i
//     page.derive('headings', headingsOf)         // gate 4f
//     page.derive('anchors', anchorsOf)           // gate 4g
//
// LIFECYCLE.
//   ownership    An index instance owns its cache. Nothing is global; two indices
//                over the same dist share nothing.
//   lifetime     The instance's lifetime, which today is one process. `dist/` is
//                written by `astro build` before any gate runs and is not mutated
//                while one runs, so a page read once stays valid for that run.
//   invalidation There is none, by design. A rebuilt `dist/` needs a new index —
//                call `createRenderIndex` again. An index must not outlive a build.
//
// CACHING IS OFF BY DEFAULT, AND THAT IS A MEASUREMENT, NOT A PREFERENCE.
// A memo is only worth its memory when a second consumer asks for the same
// projection. Today every gate is its own `node` process (see `gates:dist`), so each
// projection is derived once and read once, and caching all 619 of them costs a great
// deal for nothing. Measured on this corpus, retaining projections took gate 4i from
// 36 MB to 288 MB and gate 4h from 75 MB to 257 MB while changing no output.
//
//   cache: false (default)  one read per page per pass. Equivalent to the streaming
//                           the gates did before this index existed.
//   cache: true             one read and one derive per page for the whole index
//                           lifetime, shared across consumers. Correct — and worth
//                           paying for — only when several consumers share one index
//                           in one process, which is what a single-runner phase would
//                           introduce. Turn it on there, not here.
//
// The parse-once guarantee is therefore scoped honestly: `cache: true` guarantees one
// read per page per index; the default guarantees one read per page per pass.
import { readFileSync } from 'node:fs';
import { relative, sep } from 'node:path';
import { distWalk } from './rendered-text.mjs';

class Page {
  #cache;
  #html = null;

  constructor(dist, file, cache) {
    this.file = file;
    /** Dist-relative POSIX path — the page's identity within a build. */
    this.key = relative(dist, file).split(sep).join('/');
    /** The route a reader visits. */
    this.url = `/${this.key.replace(/index\.html$/, '')}`;
    this.#cache = cache;
    this.reads = 0;
    this.derived = new Map();
  }

  get html() {
    if (this.#html !== null) return this.#html;
    const text = readFileSync(this.file, 'utf8');
    this.reads++;
    if (this.#cache) this.#html = text;
    return text;
  }

  /**
   * Projection. `fn` is the consumer's own extractor; the index never inspects it and
   * never chooses one. Memoised under `cache: true`; computed per call otherwise, so
   * a single-pass consumer pays nothing to hold what it has already read.
   */
  derive(name, fn) {
    if (!this.#cache) return fn(this.html);
    if (this.derived.has(name)) return this.derived.get(name);
    const value = fn(this.html);
    this.derived.set(name, value);
    return value;
  }
}

export function createRenderIndex(dist, { cache = false } = {}) {
  const pages = distWalk(dist).map((f) => new Page(dist, f, cache));
  const byKey = new Map(pages.map((p) => [p.key, p]));
  return {
    dist,
    pages,
    byKey,
    get size() { return pages.length; },
    /** Traversal and read telemetry — how the parse-once claim is checked, not asserted. */
    stats() {
      return {
        pages: pages.length,
        reads: pages.reduce((a, p) => a + p.reads, 0),
        projections: pages.reduce((a, p) => a + p.derived.size, 0),
      };
    },
  };
}
