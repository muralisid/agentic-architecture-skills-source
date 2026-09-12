// Copies the few lucide icons the slides use into renderer/icons.js, so frames need no network.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DIR = '/Users/muralisid/github_other/agentic-architecture-skills-source/site/node_modules/lucide-react/dist/esm/icons';
const NAMES = [
  'triangle-alert', 'trending-up', 'skip-forward', 'refresh-cw', 'file-text', 'database', 'stethoscope',
  'gauge', 'siren', 'search', 'user', 'clock', 'lock', 'scale', 'check', 'wrench', 'coins', 'brain',
  'layers', 'git-branch', 'shield-check', 'book-open', 'bot', 'landmark', 'arrow-right', 'chevron-right',
  'x', 'circle', 'cpu',
];

const out = {};
for (const name of NAMES) {
  const file = path.join(DIR, `${name}.mjs`);
  if (!fs.existsSync(file)) {
    console.error(`missing icon: ${name}`);
    continue;
  }
  const match = fs.readFileSync(file, 'utf8').match(/const __iconNode = (\[[\s\S]*?\]);\n/);
  if (!match) {
    console.error(`no icon node in ${name}`);
    continue;
  }
  out[name] = Function(`return ${match[1]}`)();
}
fs.mkdirSync(path.join(HERE, 'renderer'), { recursive: true });
fs.writeFileSync(path.join(HERE, 'renderer', 'icons.js'), `window.ICONS = ${JSON.stringify(out)};\n`);
console.log(`wrote ${Object.keys(out).length} icons`);
