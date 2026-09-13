// Renders a slide journey to PNG frames with headless Chrome over the DevTools protocol.
//
//   node render.mjs journeys/index.json [--variant site|video|both] [--only ov-01,ov-07] [--mock] [--zone] [--out frames]
//
// site:  one frame per slide, final state, no caption.
// video: one frame per narration line, with that line in the caption bar.
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// CHROME points at the browser binary; CHROME_FLAGS adds flags such as --no-sandbox on Linux.
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const EXTRA_FLAGS = (process.env.CHROME_FLAGS || '').split(' ').filter(Boolean);
// One browser profile per run, so several renders can run side by side.
const PROFILE = path.join(HERE, '.chrome-profiles', String(process.pid));
fs.mkdirSync(PROFILE, { recursive: true });

// Title slides carry a small motif: the ladder for Deck A pages, the branches for Deck B pages.
const MOTIF = {
  '/ladder': ['ladder', -1],
  '/ladder/instructions': ['ladder', 0],
  '/ladder/context': ['ladder', 1],
  '/ladder/tools-and-the-loop': ['ladder', 2],
  '/ladder/adapters-and-fine-tuning': ['branch', 0],
  '/ladder/distillation': ['branch', 1],
  '/ladder/reinforcement-fine-tuning': ['branch', 2],
  '/ladder/continued-pretraining': ['branch', 3],
  '/ladder/custom-pretraining': ['branch', 4],
};

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(`--${name}`);

const journeyFile = path.resolve(args.find((a) => a.endsWith('.json')));
const variantArg = opt('variant', 'both');
const only = opt('only', '') ? new Set(opt('only', '').split(',')) : null;
const outRoot = path.resolve(HERE, opt('out', 'frames'));
const journey = JSON.parse(fs.readFileSync(journeyFile, 'utf8'));
const name = path.basename(journeyFile, '.json');
const motif = MOTIF[journey.page] ? { kind: MOTIF[journey.page][0], index: MOTIF[journey.page][1] } : null;

let chrome;
const watchdog = setTimeout(() => {
  console.error('render timed out');
  if (chrome) chrome.kill('SIGKILL');
  process.exit(2);
}, 15 * 60 * 1000);

try {
  execFileSync('pkill', ['-f', PROFILE]);
} catch {
  // nothing left over from an earlier run
}

const port = 9400 + Math.floor(Math.random() * 400);
chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${PROFILE}`,
  '--use-mock-keychain', '--no-first-run', '--no-default-browser-check', '--disable-gpu',
  '--hide-scrollbars', '--force-device-scale-factor=1', '--allow-file-access-from-files', ...EXTRA_FLAGS, 'about:blank',
], { stdio: 'ignore' });

async function pageSocket() {
  for (let i = 0; i < 80; i += 1) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('Chrome did not start');
}

function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const pending = new Map();
    const listeners = new Set();
    let id = 0;
    ws.onmessage = (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        if (msg.error) rej(new Error(msg.error.message));
        else res(msg.result);
      } else if (msg.method) {
        for (const fn of listeners) fn(msg);
      }
    };
    ws.onerror = reject;
    ws.onopen = () => resolve({
      send: (method, params = {}) => new Promise((res, rej) => {
        id += 1;
        pending.set(id, { res, rej });
        ws.send(JSON.stringify({ id, method, params }));
      }),
      once: (method) => new Promise((res) => {
        const fn = (m) => {
          if (m.method === method) {
            listeners.delete(fn);
            res(m.params);
          }
        };
        listeners.add(fn);
      }),
      close: () => ws.close(),
    });
  });
}

const cdp = await connect(await pageSocket());
await cdp.send('Page.enable');
await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });
const loaded = cdp.once('Page.loadEventFired');
await cdp.send('Page.navigate', { url: pathToFileURL(path.join(HERE, 'renderer', 'frame.html')).href });
await loaded;

async function shoot(payload, file) {
  const r = await cdp.send('Runtime.evaluate', {
    expression: `window.show(${JSON.stringify(payload)})`,
    awaitPromise: true,
    returnByValue: true,
  });
  if (r.exceptionDetails) {
    throw new Error(`${payload.slide.id}: ${r.exceptionDetails.exception?.description || r.exceptionDetails.text}`);
  }
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: 1920, height: 1080, scale: 1 } });
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
  return r.result.value || [];
}

const problems = [];
const manifest = [];
let clipNo = 0;
let frames = 0;

for (const slide of journey.slides) {
  const include = !only || only.has(slide.id);
  const common = { slide, eyebrow: journey.chapter, motif, base: '../' };

  if (include && (variantArg === 'site' || variantArg === 'both')) {
    const warn = await shoot({ ...common, variant: 'site' }, path.join(outRoot, name, 'site', `${slide.id}.png`));
    frames += 1;
    warn.forEach((w) => problems.push(`${slide.id} site: ${w}`));
  }

  const builds = slide.builds && slide.builds.length ? slide.builds : [{}];

  // film: one full-width frame per build, no caption bar and no presenter mock
  if (include && variantArg === 'film') {
    for (let b = 0; b < builds.length; b += 1) {
      const warn = await shoot({ ...common, variant: 'film', build: b }, path.join(outRoot, name, 'film', `${slide.id}-b${b + 1}.png`));
      frames += 1;
      warn.forEach((w) => problems.push(`${slide.id} build ${b + 1}: ${w}`));
    }
  }

  for (let b = 0; b < builds.length; b += 1) {
    for (const line of builds[b].narration || []) {
      clipNo += 1;
      const file = `${slide.id}-${String(clipNo).padStart(3, '0')}.png`;
      manifest.push({ clip: clipNo, slide: slide.id, build: b, line, frame: `video/${file}` });
      if (include && (variantArg === 'video' || variantArg === 'both')) {
        const warn = await shoot({
          ...common,
          variant: 'video',
          build: b,
          caption: line,
          mockBubble: flag('mock') ? '../presenter-bubble.png' : null,
          showZone: flag('zone'),
          mark: opt('mark', null),
        }, path.join(outRoot, name, 'video', file));
        frames += 1;
        warn.forEach((w) => problems.push(`${slide.id} clip ${clipNo}: ${w}`));
      }
    }
  }
}

if (!only) {
  fs.mkdirSync(path.join(outRoot, name), { recursive: true });
  fs.writeFileSync(path.join(outRoot, name, 'manifest.json'), JSON.stringify({ page: journey.page, chapter: journey.chapter, clips: manifest }, null, 2));
}

cdp.close();
chrome.kill('SIGKILL');
clearTimeout(watchdog);

console.log(`${name}: ${frames} frames written to ${path.join(outRoot, name)}`);
if (problems.length) {
  console.log(`${problems.length} layout problems:`);
  for (const p of [...new Set(problems)]) console.log(`  ${p}`);
} else {
  console.log('no layout problems');
}
process.exit(0);
