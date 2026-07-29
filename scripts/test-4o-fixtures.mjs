// scripts/test-4o-fixtures.mjs — fixtures for gate 4o's discriminator (AR-2 B-6).
//
// WHY THIS EXISTS. Gate 4o passes on the current corpus. So would a gate that
// found nothing at all, and so would a gate that classified every arrow as
// content. The gate's whole value is a claim about two populations — affordance
// vs relation — and a green run against a clean tree tests neither direction of
// that claim.
//
// This is the Track A lesson applied: there, the differential test was the
// deliverable, because the rejected rule also passed the corpus. Same here. The
// fixtures below assert BOTH directions — what must be caught and, just as
// importantly, what must NOT be. The 64 comment arrows and the ~136 correct LTR
// content arrows are the false positives this gate was designed around, so they
// are pinned here as tests rather than left as a claim in a document.
//
// Run: node scripts/test-4o-fixtures.mjs
import { classifyArrows, stripComments, scopeOf, AFFORDANCE_GLYPHS } from './gate-4o-affordance-arrows.mjs';

let pass = 0;
const failures = [];

const kinds = (src, ext = '.astro') => classifyArrows(src, ext).map((h) => h.kind);

function check(label, actual, expected) {
  const a = JSON.stringify(actual);
  const e = JSON.stringify(expected);
  if (a === e) pass++;
  else failures.push(`${label}\n      expected ${e}\n      actual   ${a}`);
}

// ---------------------------------------------------------------------------
// 1. MUST BE CAUGHT — affordance. The arrow trails or leads a label, or stands
//    alone in its element. Direction-dependent; belongs behind the helper.
// ---------------------------------------------------------------------------
check('trailing inside an anchor', kinds('<a href="/x">Book Lodging →</a>'), ['affordance']);
check('trailing as an entity', kinds('<a>{t("x", lang)} &rarr;</a>'), ['affordance']);
check('alone in a decorative span', kinds('<span aria-hidden="true">→</span>'), ['affordance']);
check('play glyph alone', kinds('<div class="play-icon-circle">▶</div>'), ['affordance']);
check('leading a label', kinds('<a>→ Continue</a>'), ['affordance']);
check('trailing at end of a prose line', kinds('Read more →\nNext paragraph'), ['affordance']);
check('a left arrow is equally frozen', kinds('<a>Back ←</a>'), ['affordance']);
check(
  'https:// is not a line comment',
  kinds('<a href="https://example.com/a">Go →</a>'),
  ['affordance']
);

// ---------------------------------------------------------------------------
// 2. MUST NOT BE CAUGHT — relation. Real text on both sides: the arrow relates
//    two things. In rtl its correctness is a bidi question about the surrounding
//    runs (gate 4n), not a glyph swap.
// ---------------------------------------------------------------------------
check('table cell route', kinds('<td>Vernal → Flaming Gorge (US-191)</td>'), ['relation']);
check('prose relation', kinds('<td>Vernal → the climb</td>'), ['relation']);
check(
  'a chain is all relations',
  kinds('<em>keeps the desert → backcountry → high-country arc intact</em>'),
  ['relation', 'relation']
);

// ---------------------------------------------------------------------------
// 3. MUST NOT BE CAUGHT — comments. 64 of the census's 204 source hits. Three of
//    the six components AR-1 named as carrying chrome arrows carry ONLY these,
//    so without stripping the gate fails on a correct tree.
// ---------------------------------------------------------------------------
check('line comment', kinds('// English → unprefixed route\nconst a = 1;', '.ts'), []);
check('block comment', kinds('/** id → slug mapping */\nconst a = 1;', '.ts'), []);
check('html comment', kinds('<!-- gateway → itinerary -->\n<p>hi</p>'), []);
check('jsx comment', kinds('{/* Question → the best page */}\n<p>hi</p>'), []);
check(
  'a glossary comment with many arrows',
  kinds('// "Key Takeaways" → 要点まとめ, "Dinosaur Country" → 恐竜の国\n', '.ts'),
  []
);

// ---------------------------------------------------------------------------
// 4. MUST NOT BE CAUGHT — glyphs the bidi algorithm already mirrors. 1,004 `›`
//    render on this site and need zero work. Including them would resurrect the
//    204-finding gate that measurement rejected.
// ---------------------------------------------------------------------------
check('mirrored chevrons and guillemets', kinds('<nav>Home › Hub › Page « » ‹ ›</nav>'), []);

// ---------------------------------------------------------------------------
// 5. Scope. Derived from the registry's rtl set, never a hardcoded 'ar'.
// ---------------------------------------------------------------------------
const RTL = ['ar'];
check('component is shared chrome', scopeOf('src/components/content/X.astro', RTL), 'shared-chrome');
check('layout is shared chrome', scopeOf('src/layouts/BaseLayout.astro', RTL), 'shared-chrome');
check('rtl page tree is in scope', scopeOf('src/pages/ar/camping/index.astro', RTL), 'rtl-content (ar)');
check('rtl mdx is in scope', scopeOf('src/content/guides/moab-utv-tours.ar.mdx', RTL), 'rtl-content (ar)');
check('ltr page tree is out of scope', scopeOf('src/pages/de/scenic-drives/index.astro', RTL), null);
check('ltr mdx is out of scope', scopeOf('src/content/guides/moab-utv-tours.de.mdx', RTL), null);
check('english mdx is out of scope', scopeOf('src/content/guides/moab-utv-tours.mdx', RTL), null);
check('page-content is out of scope', scopeOf('src/page-content/home.ts', RTL), null);
check(
  'a second rtl locale needs no edit here',
  scopeOf('src/content/guides/x.he.mdx', ['ar', 'he']),
  'rtl-content (he)'
);

// ---------------------------------------------------------------------------
// 6. Line numbers survive stripping — a finding has to point at the real line.
// ---------------------------------------------------------------------------
check(
  'line number after a multi-line comment',
  classifyArrows('/* a\n b\n c */\n<a>Go →</a>', '.astro').map((h) => h.line),
  [4]
);
check(
  'stripping preserves length',
  stripComments('<!-- xx -->ab', '.astro').length,
  '<!-- xx -->ab'.length
);

// ---------------------------------------------------------------------------
// 7. The glyph set is the mirror-required pairs and nothing else.
// ---------------------------------------------------------------------------
check('four glyph families', AFFORDANCE_GLYPHS.map((g) => g.char), ['→', '←', '▶', '◀']);

// ---------------------------------------------------------------------------
// Result.
// ---------------------------------------------------------------------------
if (failures.length) {
  console.error(`\ntest-4o: ${failures.length} FAILED, ${pass} passed\n`);
  for (const f of failures) console.error(`  ✖ ${f}\n`);
  process.exit(1);
}
console.log(
  `test-4o: ✔ ${pass} fixtures — affordance caught, relation and comments and ` +
    `pre-mirrored glyphs left alone, scope follows the registry`
);
