// scripts/rtl/native-precedent.mjs — AR-2 B-5b, fix milestone.
//
// WHY THIS FILE EXISTS. The B-5b fix needs one policy decision the
// measurements could not make (milestone-2 report §2.4/§2.5): under RTL, do
// ArrowLeft/ArrowRight and a swipe follow READING direction or PHYSICAL
// direction? The milestone-2/3 instruments established only that today's
// handler responds to neither. The decision's rationale is allowed to be a
// measured browser-native precedent — so this instrument measures what the
// browser itself does, on the widgets the platform owns, instead of citing a
// spec from memory.
//
// WHAT IT MEASURES. A self-contained fixture (no site code, no site CSS) with
// LTR and RTL twins of:
//   - a native horizontal scroll container (the widget class a carousel
//     imitates: a viewport over horizontally laid-out content) — arrow keys
//     while focused, and single-finger drags;
//   - a native <input type=range> (the platform's stepped horizontal widget)
//     — arrow keys while focused.
// For each input it records the direction the CONTENT VIEW physically moved
// (scrollLeft delta) and which item indexes are visible at the pane edges, or
// the value delta for the range. It does not decide the policy; the fix
// report interprets the readings (rule 6 — an instrument that knows the
// answer stops producing evidence).
//
// Exit codes, as measure-carousel.mjs: 0 = readings produced (whatever they
// say), 2 = no reading. There is no exit 1; nothing here asserts.
//
// Reuses the milestone-1 probe unchanged; the fixture is written to a temp
// dir and served by the probe's own static server, so the measurement path
// (CDP dispatch, settle discipline) is the one the controls already
// validated. Scroll behavior is pinned to `auto` in the fixture — the
// milestone-3 trap (smooth scroll animating under a read) is excluded by
// construction, and every reading below is taken post-settle.

import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { openProbe } from './probe.mjs';

const ITEMS = 12;
const ITEM_W = 120;
const PANE_W = 360;

const FIXTURE = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>native precedent fixture</title>
<style>
  * { scroll-behavior: auto !important; }
  body { margin: 40px; font: 16px sans-serif; }
  .pane { width: ${PANE_W}px; overflow-x: auto; overflow-y: hidden; border: 1px solid #999; margin: 24px 0; }
  .row { display: flex; width: max-content; }
  .item { flex: 0 0 ${ITEM_W}px; height: 80px; display: flex; align-items: center; justify-content: center; border-inline-end: 1px solid #ccc; }
  input[type=range] { width: ${PANE_W}px; display: block; margin: 24px 0; }
</style></head>
<body>
  <div class="pane" id="scroller-ltr" dir="ltr" tabindex="0">
    <div class="row">${Array.from({ length: ITEMS }, (_, i) => `<div class="item" data-i="${i}">${i}</div>`).join('')}</div>
  </div>
  <div class="pane" id="scroller-rtl" dir="rtl" tabindex="0">
    <div class="row">${Array.from({ length: ITEMS }, (_, i) => `<div class="item" data-i="${i}">${i}</div>`).join('')}</div>
  </div>
  <input type="range" id="range-ltr" dir="ltr" min="0" max="10" step="1" value="5">
  <input type="range" id="range-rtl" dir="rtl" min="0" max="10" step="1" value="5">
</body></html>`;

const args = process.argv.slice(2);
const jsonArg = args.indexOf('--json');
const jsonPath = jsonArg >= 0 ? args[jsonArg + 1] : null;

function scrollerState(id) {
  return `(() => {
    const s = document.getElementById(${JSON.stringify(id)});
    const r = s.getBoundingClientRect();
    const at = (x) => {
      const el = document.elementFromPoint(x, r.top + r.height / 2);
      const it = el && el.closest('.item');
      return it ? Number(it.dataset.i) : null;
    };
    return { scrollLeft: Math.round(s.scrollLeft), edgeLeft: at(r.left + 8), edgeRight: at(r.right - 8) };
  })()`;
}

// Post-settle read: poll until scrollLeft is stable across two consecutive
// reads (covers key-scroll animation and touch fling inertia alike).
async function settle(probe, id) {
  let prev = await probe.evaluate(scrollerState(id));
  for (let i = 0; i < 40; i++) {
    await sleep(120);
    const cur = await probe.evaluate(scrollerState(id));
    if (cur.scrollLeft === prev.scrollLeft) return cur;
    prev = cur;
  }
  return prev;
}

// Center the scroller on item 6 so both physical directions have room, and
// focus it so key dispatch has a defined target.
async function center(probe, id) {
  await probe.evaluate(`(() => {
    const s = document.getElementById(${JSON.stringify(id)});
    s.focus();
    s.querySelector('.item[data-i="6"]').scrollIntoView({ behavior: 'instant', inline: 'center', block: 'nearest' });
    return true;
  })()`);
  return settle(probe, id);
}

async function keyReading(probe, id, keyName) {
  const before = await center(probe, id);
  for (let i = 0; i < 3; i++) { await probe.key(keyName); await sleep(80); }
  const after = await settle(probe, id);
  return {
    key: keyName,
    before, after,
    scrollLeftDelta: after.scrollLeft - before.scrollLeft,
    physicalMove: after.scrollLeft > before.scrollLeft ? 'view-right'
      : after.scrollLeft < before.scrollLeft ? 'view-left' : 'none',
  };
}

async function dragReading(probe, id, dx) {
  const before = await center(probe, id);
  const box = await probe.box('#' + id);
  const cx = box.l + box.w / 2, cy = box.t + 40;
  await probe.swipe({ fromX: cx, fromY: cy, toX: cx + dx, toY: cy });
  const after = await settle(probe, id);
  return {
    finger: dx < 0 ? 'left' : 'right', dx,
    before, after,
    scrollLeftDelta: after.scrollLeft - before.scrollLeft,
    physicalMove: after.scrollLeft > before.scrollLeft ? 'view-right'
      : after.scrollLeft < before.scrollLeft ? 'view-left' : 'none',
  };
}

async function rangeReading(probe, id, keyName) {
  await probe.evaluate(`(() => { const r = document.getElementById(${JSON.stringify(id)}); r.value = 5; r.focus(); return true; })()`);
  await probe.key(keyName);
  await sleep(150);
  const value = await probe.evaluate(`Number(document.getElementById(${JSON.stringify(id)}).value)`);
  return { key: keyName, from: 5, to: value, valueDelta: value - 5 };
}

const fixtureDir = await mkdtemp(path.join(tmpdir(), 'rtl-native-'));
await writeFile(path.join(fixtureDir, 'index.html'), FIXTURE, 'utf8');

let probe;
const out = { fixture: { items: ITEMS, itemW: ITEM_W, paneW: PANE_W }, scroller: {}, range: {}, drag: {} };
try {
  probe = await openProbe({ root: fixtureDir, touch: true });
  await probe.goto('/');
  await probe.waitFor(`document.getElementById('scroller-rtl') !== null`);

  for (const side of ['ltr', 'rtl']) {
    out.scroller[side] = {
      ArrowRight: await keyReading(probe, `scroller-${side}`, 'ArrowRight'),
      ArrowLeft: await keyReading(probe, `scroller-${side}`, 'ArrowLeft'),
    };
    out.range[side] = {
      ArrowRight: await rangeReading(probe, `range-${side}`, 'ArrowRight'),
      ArrowLeft: await rangeReading(probe, `range-${side}`, 'ArrowLeft'),
    };
    out.drag[side] = {
      fingerLeft: await dragReading(probe, `scroller-${side}`, -160),
      fingerRight: await dragReading(probe, `scroller-${side}`, 160),
    };
  }
} catch (err) {
  process.stderr.write(`no reading: ${err.message}\n`);
  if (probe) await probe.close();
  await rm(fixtureDir, { recursive: true, force: true }).catch(() => {});
  process.exit(2);
}
await probe.close();
await rm(fixtureDir, { recursive: true, force: true }).catch(() => {});

if (jsonPath) await writeFile(jsonPath, JSON.stringify(out, null, 2), 'utf8');

for (const side of ['ltr', 'rtl']) {
  process.stdout.write(`scroller ${side}:\n`);
  for (const k of ['ArrowRight', 'ArrowLeft']) {
    const r = out.scroller[side][k];
    process.stdout.write(`  ${k}: scrollLeft ${r.before.scrollLeft} -> ${r.after.scrollLeft} (${r.physicalMove}), edges ${r.before.edgeLeft}..${r.before.edgeRight} -> ${r.after.edgeLeft}..${r.after.edgeRight}\n`);
  }
  for (const g of ['fingerLeft', 'fingerRight']) {
    const r = out.drag[side][g];
    process.stdout.write(`  drag ${r.finger}: scrollLeft ${r.before.scrollLeft} -> ${r.after.scrollLeft} (${r.physicalMove}), edges ${r.before.edgeLeft}..${r.before.edgeRight} -> ${r.after.edgeLeft}..${r.after.edgeRight}\n`);
  }
  for (const k of ['ArrowRight', 'ArrowLeft']) {
    const r = out.range[side][k];
    process.stdout.write(`  range ${k}: value ${r.from} -> ${r.to} (delta ${r.valueDelta >= 0 ? '+' : ''}${r.valueDelta})\n`);
  }
}
process.exit(0);
