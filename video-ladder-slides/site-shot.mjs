// Screenshots a page of the local site at a set width, once per selector, scrolled to that element.
//
//   node site-shot.mjs http://localhost:3000/ladder 'h1,#ov-01' shots/ladder 1440 900
//
// Writes shots/ladder-1.png, shots/ladder-2.png, ... Uses its own headless Chrome, so it works
// while the app's Browser pane is hidden.
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PROFILE = path.join(HERE, '.chrome-profile-shot');
const [url, selectors, outPrefix, width = '1440', height = '900'] = process.argv.slice(2);
const W = Number(width);
const H = Number(height);

let chrome;
const watchdog = setTimeout(() => {
  console.error('screenshot timed out');
  if (chrome) chrome.kill('SIGKILL');
  process.exit(2);
}, 180000);

try {
  execFileSync('pkill', ['-f', PROFILE]);
} catch {
  // nothing left over
}

const port = 9800 + Math.floor(Math.random() * 150);
chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${PROFILE}`,
  '--use-mock-keychain', '--no-first-run', '--no-default-browser-check', '--hide-scrollbars', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function pageSocket() {
  for (let i = 0; i < 80; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // not up yet
    }
    await sleep(250);
  }
  throw new Error('Chrome did not start');
}

const ws = new WebSocket(await pageSocket());
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(String(ev.data));
  if (msg.id && pending.has(msg.id)) {
    const { res, rej } = pending.get(msg.id);
    pending.delete(msg.id);
    if (msg.error) rej(new Error(msg.error.message));
    else res(msg.result);
  }
};
const send = (method, params = {}) => new Promise((res, rej) => {
  id += 1;
  pending.set(id, { res, rej });
  ws.send(JSON.stringify({ id, method, params }));
});

await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url });
await sleep(6000);

fs.mkdirSync(path.dirname(path.resolve(outPrefix)), { recursive: true });
const list = selectors.split(',');
for (let i = 0; i < list.length; i += 1) {
  const expression = `(async () => {
    const el = document.querySelector(${JSON.stringify(list[i])});
    if (!el) return 'missing';
    el.scrollIntoView({ block: 'start' });
    window.scrollBy(0, -96);
    await new Promise((r) => setTimeout(r, 800));
    const visible = [...document.images].filter((img) => {
      const b = img.getBoundingClientRect();
      return b.bottom > 0 && b.top < innerHeight;
    });
    await Promise.all(visible.map((img) => (img.complete ? null : new Promise((r) => { img.onload = r; img.onerror = r; }))));
    await new Promise((r) => setTimeout(r, 400));
    return 'ok';
  })()`;
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const file = `${outPrefix}-${i + 1}.png`;
  fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
  console.log(`${list[i]}: ${r.result.value} -> ${file}`);
}

ws.close();
chrome.kill('SIGKILL');
clearTimeout(watchdog);
process.exit(0);
