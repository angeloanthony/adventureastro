// scripts/rtl/probe.mjs — the behavioural probe (AR-2 B-5b).
//
// WHY THIS FILE EXISTS. B-7 opened the presentation layer in a browser for the
// first time and settled six CSS questions with it — and then threw the
// instrument away ("nothing installed, no repo state touched"). That was the
// right call for a one-shot referee over a frozen classification. It is the
// wrong starting position for B-5b, where the browser IS the measurement layer:
// carousel anchors, transform sign, keyboard mapping and swipe direction cannot
// be settled by a census or a grep, and every one of them is a claim about what
// the page DOES, not what it says.
//
// So the first deliverable of B-5b is the instrument, not a fix.
//
// WHAT THIS IS. A read-only CDP driver over the built `dist/`: serve, launch
// Edge headless, navigate, evaluate, dispatch input, read back observable DOM
// state. No dependency added — Node 24 supplies `WebSocket` and `fetch`, the
// static server is `node:http`, and Edge is already on the machine. Nothing is
// installed and no repo state is touched, exactly as in B-7; the only change is
// that the capability now lives in the tree where the next phase can re-run it.
//
// WHAT THIS IS NOT. It is not a test runner and it is not a gate. It does not
// assert anything. Callers assert; this file only makes observation possible.
// The distinction matters because a probe that also decides is a probe whose
// negatives nobody can audit — see control-keyboard.mjs for what an audited
// negative costs.
//
// THE STATIC SERVER, AND WHY NOT `astro preview`. B-7 used `astro preview`.
// This serves `dist/` directly from `node:http` instead, for two reasons that
// are both about the measurement being trustworthy rather than convenient:
//   1. no npm/child-shell layer between the probe and the bytes under test, on
//      a platform where that layer has already contaminated one proof (ADR-11
//      §5.1, the CRLF re-materialisation, three times now);
//   2. the port is chosen by the OS and the root is explicit, so two probes can
//      run over two different trees at once — which is what a before/after
//      behavioural differential needs, and what B-7's fixed-port preview could
//      not have done.
// Routing mirrors the build: `trailingSlash: 'always'` + `format: 'directory'`,
// so `/x/` reads `dist/x/index.html` and `/x` redirects to `/x/`.
//
// THIRD-PARTY REQUESTS ARE BLOCKED. V-0 measured `/utv/` booting 24 YouTube
// players before interaction. A behavioural probe that waits on those is
// measuring the network. The blocklist is first-party-only by construction:
// everything that is not this server's origin is refused, so the page under
// test is the tree under test.

import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, readFileSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

const EDGE_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

// Physical keys the probe knows how to press. `windowsVirtualKeyCode` is
// required — without it Edge delivers an event whose `key` is right and whose
// `keyCode` is 0, and handlers that switch on either one see a different event
// than a real keypress. The inert entry is deliberate: a null control needs a
// key that is definitely dispatched and definitely does nothing.
const KEYS = {
  ArrowLeft: { key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37 },
  ArrowRight: { key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 },
  ArrowUp: { key: 'ArrowUp', code: 'ArrowUp', windowsVirtualKeyCode: 38 },
  ArrowDown: { key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40 },
  F7: { key: 'F7', code: 'F7', windowsVirtualKeyCode: 118 },
};

function findEdge() {
  const found = EDGE_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error(
      'Microsoft Edge not found. Looked in:\n  ' + EDGE_CANDIDATES.join('\n  ')
    );
  }
  return found;
}

// ---------------------------------------------------------------------------
// static server over a built tree
// ---------------------------------------------------------------------------

async function serveTree(root) {
  const abs = path.resolve(root);
  if (!existsSync(abs)) {
    throw new Error(`nothing to serve: ${abs} does not exist (run \`npm run build\` first)`);
  }

  const server = createServer(async (req, res) => {
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    } catch {
      res.writeHead(400).end('bad request');
      return;
    }

    // `format: 'directory'` + `trailingSlash: 'always'`: a extensionless path
    // without its slash is a redirect in production, so it is one here too.
    if (!pathname.endsWith('/') && !path.extname(pathname)) {
      res.writeHead(301, { location: pathname + '/' }).end();
      return;
    }

    const rel = pathname.endsWith('/') ? pathname + 'index.html' : pathname;
    const file = path.join(abs, rel);
    if (!file.startsWith(abs)) {
      res.writeHead(403).end('forbidden');
      return;
    }

    try {
      const body = await readFile(file);
      res.writeHead(200, {
        'content-type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
        'cache-control': 'no-store',
      });
      res.end(body);
    } catch {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('not found');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });

  return { server, origin: `http://127.0.0.1:${server.address().port}` };
}

// ---------------------------------------------------------------------------
// CDP transport
// ---------------------------------------------------------------------------

class Cdp {
  #ws;
  #nextId = 1;
  #pending = new Map();
  #waiters = [];

  constructor(ws) {
    this.#ws = ws;
    ws.addEventListener('message', (ev) => this.#onMessage(JSON.parse(ev.data)));
    ws.addEventListener('close', () => {
      for (const { reject } of this.#pending.values()) {
        reject(new Error('CDP connection closed'));
      }
      this.#pending.clear();
    });
  }

  #onMessage(msg) {
    if (msg.id !== undefined) {
      const entry = this.#pending.get(msg.id);
      if (!entry) return;
      this.#pending.delete(msg.id);
      if (msg.error) entry.reject(new Error(`${entry.method}: ${msg.error.message}`));
      else entry.resolve(msg.result);
      return;
    }
    for (const waiter of this.#waiters.slice()) {
      if (waiter.method === msg.method && (!waiter.sessionId || waiter.sessionId === msg.sessionId)) {
        this.#waiters.splice(this.#waiters.indexOf(waiter), 1);
        waiter.resolve(msg.params);
      }
    }
  }

  send(method, params = {}, sessionId) {
    const id = this.#nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.#pending.set(id, { resolve, reject, method });
      this.#ws.send(JSON.stringify(payload));
    });
  }

  once(method, sessionId, timeoutMs = 30_000) {
    return new Promise((resolve, reject) => {
      const waiter = { method, sessionId, resolve };
      this.#waiters.push(waiter);
      const timer = setTimeout(() => {
        const i = this.#waiters.indexOf(waiter);
        if (i >= 0) this.#waiters.splice(i, 1);
        reject(new Error(`timed out waiting for CDP event ${method}`));
      }, timeoutMs);
      timer.unref?.();
    });
  }

  close() {
    try { this.#ws.close(); } catch { /* already gone */ }
  }
}

async function readDevToolsPort(userDataDir, timeoutMs = 30_000) {
  const file = path.join(userDataDir, 'DevToolsActivePort');
  for (let i = 0; i < timeoutMs / 50; i++) {
    if (existsSync(file)) {
      const [port] = readFileSync(file, 'utf8').split('\n');
      if (port && port.trim()) return Number(port.trim());
    }
    await sleep(50);
  }
  throw new Error('Edge did not publish a DevTools port');
}

// ---------------------------------------------------------------------------
// the probe
// ---------------------------------------------------------------------------

/**
 * Open a probe over a built tree. Caller must `await probe.close()`.
 *
 * @param {object} [opts]
 * @param {string} [opts.root]     tree to serve (default: <repo>/dist)
 * @param {number} [opts.width]    viewport width  (default 1600)
 * @param {number} [opts.height]   viewport height (default 1000)
 * @param {boolean} [opts.touch]   enable touch emulation (default false —
 *                                 opt-in so the environment of the committed
 *                                 keyboard/CSS measurements is unchanged)
 * @param {boolean} [opts.verbose] echo navigation + dispatch to stderr
 */
export async function openProbe(opts = {}) {
  const { root = path.join(REPO_ROOT, 'dist'), width = 1600, height = 1000, touch = false, verbose = false } = opts;

  const { server, origin } = await serveTree(root);
  const userDataDir = await mkdtemp(path.join(tmpdir(), 'rtl-probe-'));

  const edge = spawn(findEdge(), [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--mute-audio',
    `--user-data-dir=${userDataDir}`,
    '--remote-debugging-port=0',
    'about:blank',
  ], { stdio: 'ignore' });

  let cdp, sessionId;
  try {
    const port = await readDevToolsPort(userDataDir);
    const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();

    const ws = new WebSocket(version.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve, { once: true });
      ws.addEventListener('error', () => reject(new Error('CDP socket failed to open')), { once: true });
    });
    cdp = new Cdp(ws);

    // No width/height here — Edge rejects target sizing outside a new window,
    // and the viewport is set authoritatively by the Emulation override below.
    const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
    ({ sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true }));

    await cdp.send('Page.enable', {}, sessionId);
    await cdp.send('Runtime.enable', {}, sessionId);
    await cdp.send('Network.enable', {}, sessionId);
    await cdp.send('Emulation.setDeviceMetricsOverride',
      { width, height, deviceScaleFactor: 1, mobile: false }, sessionId);
    // Touch is opt-in (milestone 3). Without this override Edge silently
    // swallows Input.dispatchTouchEvent on a non-touch target — the dispatch
    // reports success and no TouchEvent ever reaches the page, which is
    // exactly the dead-input-path shape the controls exist to detect.
    if (touch) {
      await cdp.send('Emulation.setTouchEmulationEnabled',
        { enabled: true, maxTouchPoints: 1 }, sessionId);
    }
    // Third-party hosts the corpus embeds, refused so a measurement never waits
    // on (or varies with) the network. A blanket `*://*/*` would block the tree
    // under test as well, so the list is explicit.
    await cdp.send('Network.setBlockedURLs', {
      urls: [
        '*://*.youtube.com/*', '*://*.youtube-nocookie.com/*', '*://*.ytimg.com/*',
        '*://*.google.com/*', '*://*.googleapis.com/*', '*://*.gstatic.com/*',
        '*://*.googletagmanager.com/*', '*://*.google-analytics.com/*',
        '*://*.doubleclick.net/*', '*://*.cal.com/*', '*://*.facebook.com/*',
        '*://*.fontawesome.com/*', '*://*.cloudflareinsights.com/*',
      ],
    }, sessionId);
  } catch (err) {
    edge.kill();
    server.close();
    await rm(userDataDir, { recursive: true, force: true }).catch(() => {});
    throw err;
  }

  const log = (msg) => { if (verbose) process.stderr.write(`  · ${msg}\n`); };

  const probe = {
    origin,
    root: path.resolve(root),

    /** Navigate to a site-absolute path (`/`, `/ar/cancellation-policy/`). */
    async goto(pathname) {
      const url = origin + pathname;
      log(`goto ${pathname}`);
      const loaded = cdp.once('Page.loadEventFired', sessionId);
      await cdp.send('Page.navigate', { url }, sessionId);
      await loaded;
      return url;
    },

    /** Evaluate an expression in the page and return it by value. */
    async evaluate(expression) {
      const res = await cdp.send('Runtime.evaluate',
        { expression, returnByValue: true, awaitPromise: true }, sessionId);
      if (res.exceptionDetails) {
        const d = res.exceptionDetails;
        throw new Error(`page threw: ${d.exception?.description ?? d.text}`);
      }
      return res.result.value;
    },

    /**
     * Poll an expression until it is truthy. Returns its value.
     * `intervalMs` is deliberately small: everything B-5b measures is bounded
     * by the carousel's own 500ms transition lock and its 5000ms autoplay tick.
     */
    async waitFor(expression, { timeoutMs = 10_000, intervalMs = 25 } = {}) {
      for (let waited = 0; waited <= timeoutMs; waited += intervalMs) {
        const value = await probe.evaluate(expression);
        if (value) return value;
        await sleep(intervalMs);
      }
      throw new Error(`waitFor timed out after ${timeoutMs}ms: ${expression}`);
    },

    /** Press and release a key. Names come from KEYS above. */
    async key(name) {
      const spec = KEYS[name];
      if (!spec) throw new Error(`probe.key: unknown key ${name} (have: ${Object.keys(KEYS).join(', ')})`);
      log(`key ${name}`);
      await cdp.send('Input.dispatchKeyEvent',
        { type: 'rawKeyDown', ...spec, nativeVirtualKeyCode: spec.windowsVirtualKeyCode }, sessionId);
      await cdp.send('Input.dispatchKeyEvent',
        { type: 'keyUp', ...spec, nativeVirtualKeyCode: spec.windowsVirtualKeyCode }, sessionId);
    },

    /**
     * One single-finger swipe: touchStart at (fromX, fromY), interpolated
     * touchMoves, touchEnd. Requires openProbe({ touch: true }).
     *
     * The intermediate moves are load-bearing even for a handler that only
     * reads touchstart/touchend: CDP's touchEnd carries an empty touchPoints
     * list (all points released), so the release coordinate the page sees in
     * `changedTouches` is wherever the LAST move left the finger. A
     * start/end pair with no moves releases at the start point and every
     * swipe measures as zero displacement.
     *
     * Like key(): this dispatches and returns. Whether anything listened is
     * the caller's question, answered from observable DOM state.
     */
    async swipe({ fromX, fromY, toX, toY, steps = 8, stepDelayMs = 15 }) {
      const round = Math.round;
      const point = (x, y) => [{ x: round(x), y: round(y), radiusX: 2, radiusY: 2, force: 1 }];
      log(`swipe (${round(fromX)},${round(fromY)}) -> (${round(toX)},${round(toY)})`);
      await cdp.send('Input.dispatchTouchEvent',
        { type: 'touchStart', touchPoints: point(fromX, fromY) }, sessionId);
      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        await cdp.send('Input.dispatchTouchEvent',
          { type: 'touchMove', touchPoints: point(fromX + (toX - fromX) * t, fromY + (toY - fromY) * t) },
          sessionId);
        await sleep(stepDelayMs);
      }
      await cdp.send('Input.dispatchTouchEvent',
        { type: 'touchEnd', touchPoints: [] }, sessionId);
    },

    /** Computed style of the first match, for the properties named. */
    async computedStyle(selector, properties) {
      return probe.evaluate(`(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return null;
        const cs = getComputedStyle(el);
        return Object.fromEntries(${JSON.stringify(properties)}.map(p => [p, cs.getPropertyValue(p)]));
      })()`);
    },

    /** Border box of the first match, or null. */
    async box(selector) {
      return probe.evaluate(`(() => {
        const el = document.querySelector(${JSON.stringify(selector)});
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { l: Math.round(r.left), r: Math.round(r.right), t: Math.round(r.top), w: Math.round(r.width) };
      })()`);
    },

    async close() {
      cdp.close();
      edge.kill();
      server.close();
      await rm(userDataDir, { recursive: true, force: true }).catch(() => {});
    },
  };

  return probe;
}

// Run directly for a smoke check: `node scripts/rtl/probe.mjs [path]`.
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const target = process.argv[2] ?? '/';
  const probe = await openProbe({ verbose: true });
  try {
    await probe.goto(target);
    const info = await probe.evaluate(
      '({ title: document.title, dir: document.documentElement.getAttribute("dir"), lang: document.documentElement.lang })'
    );
    process.stdout.write(`${probe.origin}${target}\n  ${JSON.stringify(info)}\n`);
  } finally {
    await probe.close();
  }
}
