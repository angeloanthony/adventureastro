// scripts/rtl/measure-currency.mjs — the visual-order instrument (AR-2 Track E,
// E-1b). Answers the question E-1 §3.4 filed and could not answer.
//
// WHY THIS FILE EXISTS. Gate 4n is scoped to `\p{Bidi_Mirrored}` and is right to
// be: ADR-10's invariant is about characters that flip shape. `$` is
// `Bidi_Mirrored=No`, so a bare `$349` sitting in Arabic prose is invisible to
// every gate in this repository — not because the gates are wrong, but because
// the class is outside what any of them measures. E-1 recorded that as an open
// measurement rather than a finding, and named the instrument it needed. This is
// that instrument.
//
// WHAT IS MEASURED. Per-character visual x-positions, read from
// `Range.getClientRects()` over the built tree. A run's VISUAL order is its
// characters sorted by x; its LOGICAL order is source order. The two agree iff
// the run was laid out left-to-right. Nothing in this file knows which answer is
// correct for any run — it reports the two orders and the classification falls
// out of comparing them. There is no expectation coded anywhere, for the same
// reason measure-carousel.mjs codes none: the moment the instrument knows the
// answer it is looking for, its readings stop being evidence.
//
// WHAT IT IS NOT. Not a gate. It asserts nothing and cannot fail. Exit `0` means
// the measurements completed, whatever they say; exit `2` means the instrument
// did not reach a reading. There is deliberately no exit 1.
//
// EVERY READING CARRIES ITS MEASURABILITY, AND THE FIRST RUN IS WHY. The pilot
// page's `.page-summary` is a visually-hidden element — `width:1px;
// overflow:hidden` — so every character in it wraps onto its own line and the
// x-order of a run inside it is an artefact of a 1px column, not of bidi. Read
// naively it reports a phone number as scrambled, which is a false positive of
// exactly the shape this project keeps finding: a measurement window that does
// not hold the thing being measured. So a run is `measurable` only when every
// character has a box AND all boxes share a baseline; a wrapped or boxless run
// is reported with its reason and classified `null`. A reading that cannot be
// taken is not a reading that came out clean.
//
// CONTROLS ARE MANDATORY AND THEY ARE SYNTHETIC. A silent instrument proves
// nothing. Each run injects, into the live document, both a POSITIVE control (an
// isolated phone — the shape B-2 §3.2 asserts is correct) and a NEGATIVE control
// (a bare phone in Arabic prose — the shape B-2 §1.3 established is broken). If
// the negative control does not come back broken, no green reading in the same
// run is citable. The injection is runtime-only DOM; `dist/` is never touched,
// and synthetic readings are reported in their own section so they can never be
// mixed with corpus readings.
//
// HOW IT IS RUN:
//     node scripts/rtl/measure-currency.mjs                       # dist, the ar spoke
//     node scripts/rtl/measure-currency.mjs --route /ar/foo/ --json out.json
//     node scripts/rtl/measure-currency.mjs --root ../other/dist  # a second tree

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openProbe } from './probe.mjs';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

/**
 * The runs this instrument looks for.
 *
 * Named literals the site owns, never a pattern over "things that look Latin" —
 * the same line `src/lib/bidi.ts` draws when it declines to export a generic
 * `isolate()`. A run is listed here because policy §3.2 requires it to appear
 * verbatim, which is what makes its rendered order a question worth asking.
 */
const NEEDLES = ['$349', '$125', '(435) 219-9447'];

function parseArgs(argv) {
  const out = { root: path.join(REPO_ROOT, 'dist'), routes: [], json: null, verbose: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--root') out.root = path.resolve(argv[++i]);
    else if (a === '--route') out.routes.push(argv[++i]);
    else if (a === '--json') out.json = path.resolve(argv[++i]);
    else if (a === '--verbose') out.verbose = true;
    else { process.stderr.write(`unknown argument: ${a}\n`); process.exit(2); }
  }
  if (out.routes.length === 0) out.routes.push('/ar/utv/best-utv-trails-vernal/');
  return out;
}

/** The page-side reader. Returns corpus and synthetic readings for one document. */
const reader = (needles) => `
(() => {
  const NEEDLES = ${JSON.stringify(needles)};
  // Literals used ONLY by the synthetic temperature controls below. Kept out of NEEDLES
  // on purpose: NEEDLES is scanned over the corpus, and a needle the corpus cannot yet
  // contain would report "0 found" as if that were a clean reading.
  const TEMP_NEEDLES = ['95°F', '90–100°F', '95 درجة فهرنهايت'];

  function boxes(textNode, start, len) {
    const out = [];
    for (let i = 0; i < len; i++) {
      const r = document.createRange();
      r.setStart(textNode, start + i);
      r.setEnd(textNode, start + i + 1);
      const rect = r.getClientRects()[0];
      out.push({
        ch: textNode.data[start + i],
        x: rect ? +(rect.x + rect.width / 2).toFixed(2) : null,
        y: rect ? +rect.y.toFixed(2) : null,
        w: rect ? +rect.width.toFixed(2) : null,
      });
    }
    return out;
  }

  // A run is measurable only if every character has a box and all boxes sit on
  // one baseline. A wrapped run's x-order describes the column, not the bidi.
  function measurability(chars) {
    const boxless = chars.filter(c => c.x === null);
    if (boxless.length) return { measurable: false, reason: 'character(s) with no box — not rendered' };
    const ys = [...new Set(chars.map(c => c.y))];
    if (ys.length > 1) return { measurable: false, reason: 'run wraps across ' + ys.length + ' lines' };
    return { measurable: true, reason: null };
  }

  function order(chars) {
    const logical = chars.map(c => c.ch).join('');
    const visual = [...chars].sort((a, b) => a.x - b.x).map(c => c.ch).join('');
    const reversed = [...chars].sort((a, b) => b.x - a.x).map(c => c.ch).join('');
    return {
      logical,
      visual,
      layout: visual === logical ? 'ltr' : reversed === logical ? 'rtl-reversed' : 'reordered',
    };
  }

  function ancestry(node) {
    const out = [];
    for (let el = node.parentElement; el && el !== document.documentElement; el = el.parentElement) {
      const cls = typeof el.className === 'string' && el.className.trim()
        ? '.' + el.className.trim().split(/\\s+/)[0] : '';
      out.push(el.tagName.toLowerCase() + cls);
    }
    return out;
  }

  function scan(root, label, needles) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const found = [];
    let n;
    while ((n = walker.nextNode())) {
      for (const needle of needles || NEEDLES) {
        let idx = -1;
        while ((idx = n.data.indexOf(needle, idx + 1)) !== -1) {
          const chars = boxes(n, idx, needle.length);
          const anc = ancestry(n);
          const m = measurability(chars);
          found.push({
            source: label,
            needle,
            isolated: anc.some(a => a === 'bdi' || a.startsWith('bdi.')),
            path: anc.slice(0, 4).join(' < '),
            ...m,
            ...(m.measurable ? order(chars) : { logical: chars.map(c => c.ch).join(''), visual: null, layout: null }),
            chars,
          });
        }
      }
    }
    return found;
  }

  const corpus = scan(document.body, 'corpus');

  // ---- synthetic controls, injected at runtime; dist is not touched ---------
  const AR_LEAD = 'وللاستفسار عن أسعار المجموعات، الرقم هو ';
  const AR_PRICE = 'تكلفة الجولة المُرشَدة هي ';
  const AR_TEMP = 'تبلغ الحرارة العظمى في يوليو نحو ';
  const host = document.createElement('div');
  host.style.cssText = 'position:absolute;left:0;top:0;width:900px;font-size:16px;line-height:2;';
  host.innerHTML =
    '<p id="neg-phone">'  + AR_LEAD  + '(435) 219-9447.</p>' +
    '<p id="pos-phone">'  + AR_LEAD  + '<bdi>(435) 219-9447</bdi>.</p>' +
    '<p id="neg-price">'  + AR_PRICE + '$349 للمركبة.</p>' +
    '<p id="pos-price">'  + AR_PRICE + '<bdi>$349</bdi> للمركبة.</p>' +
    '<p id="neg-price-initial">$125 للشخص الواحد.</p>' +
    // AR-2 batch 6. The guides hub is the first Arabic corpus to want a Fahrenheit
    // temperature, and U+00B0 is Bidi_Mirrored=No, so the shape is invisible to gate 4n
    // exactly as the bare price was. It is measured HERE, as a synthetic control,
    // because the corpus does not contain it yet — which is the point: the reading
    // decides how the batch is authored, not the other way round.
    '<p id="neg-temp">' + AR_TEMP + '95°F.</p>' +
    '<p id="pos-temp">' + AR_TEMP + '<bdi>95°F</bdi>.</p>' +
    '<p id="neg-temp-range">' + AR_TEMP + '90–100°F.</p>' +
    '<p id="alt-temp-spelled">' + AR_TEMP + '95 درجة فهرنهايت.</p>';
  document.body.appendChild(host);
  const synthetic = [];
  for (const id of ['neg-phone', 'pos-phone', 'neg-price', 'pos-price', 'neg-price-initial']) {
    for (const r of scan(document.getElementById(id), id)) synthetic.push(r);
  }
  for (const id of ['neg-temp', 'pos-temp', 'neg-temp-range', 'alt-temp-spelled']) {
    for (const r of scan(document.getElementById(id), id, TEMP_NEEDLES)) synthetic.push(r);
  }
  host.remove();

  return {
    htmlDir: document.documentElement.dir,
    bodyDirection: getComputedStyle(document.body).direction,
    corpus,
    synthetic,
  };
})()
`;

const args = parseArgs(process.argv.slice(2));
let probe;
try {
  probe = await openProbe({ root: args.root, verbose: args.verbose });
} catch (err) {
  process.stderr.write(`instrument did not start: ${err.message}\n`);
  process.exit(2);
}

const results = [];
try {
  for (const route of args.routes) {
    await probe.goto(route);
    const page = await probe.evaluate(reader(NEEDLES));
    results.push({ route, ...page });
  }
} catch (err) {
  process.stderr.write(`instrument did not reach a reading: ${err.message}\n`);
  await probe.close();
  process.exit(2);
} finally {
  if (probe) await probe.close();
}

const LAYOUT = { ltr: 'LTR  (visual = logical)', 'rtl-reversed': 'RTL  (visual = reversed logical)', reordered: 'REORDERED' };

for (const page of results) {
  process.stdout.write(`\nroute ${page.route}   html[dir]=${page.htmlDir}   body direction=${page.bodyDirection}\n`);
  for (const [title, rows] of [['CORPUS', page.corpus], ['SYNTHETIC CONTROLS (runtime DOM, dist untouched)', page.synthetic]]) {
    process.stdout.write(`\n  === ${title} — ${rows.length} reading(s) ===\n`);
    for (const r of rows) {
      const verdict = r.measurable ? LAYOUT[r.layout] : `NOT MEASURABLE — ${r.reason}`;
      process.stdout.write(
        `  ${r.source.padEnd(18)} ${JSON.stringify(r.needle).padEnd(18)} ` +
        `isolated=${String(r.isolated).padEnd(5)} ${verdict}\n` +
        `      logical ${JSON.stringify(r.logical)}\n` +
        (r.measurable ? `      visual  ${JSON.stringify(r.visual)}\n` : '') +
        `      in      ${r.path}\n`
      );
    }
  }
}

if (args.json) {
  await writeFile(args.json, JSON.stringify({ root: args.root, needles: NEEDLES, results }, null, 2) + '\n', 'utf8');
  process.stdout.write(`\nwrote ${args.json}\n`);
}
