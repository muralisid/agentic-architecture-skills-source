// Publication boundary scan. Refuses to deploy when reserved terms appear in
// anything that a deploy would make public.
//
// The blocklist is private and is never committed here. Supply it with:
//   BLOCKLIST=/path/to/blocklist.txt node scripts/boundary-scan.mjs
// In CI the workflow writes the BOUNDARY_BLOCKLIST secret to a temp file.
//
// Format: [HARD] and [WARN] sections, one case-insensitive term per line, # comments.
// HARD hits exit non-zero. WARN hits report and pass.
// Matched terms are never printed, so this is safe to run in a public log.

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const blocklistPath = process.env.BLOCKLIST;

if (!blocklistPath) {
  console.error('boundary-scan: BLOCKLIST is not set. Refusing to pass a scan that did not run.');
  process.exit(1);
}

const raw = await readFile(blocklistPath, 'utf8');
const hard = [];
const warn = [];
let bucket = null;
let parseError = false;
for (const line of raw.split('\n')) {
  const s = line.trim();
  if (!s || s.startsWith('#')) continue;
  if (s === '[HARD]') { bucket = hard; continue; }
  if (s === '[WARN]') { bucket = warn; continue; }
  if (s.startsWith('[') || !bucket) {
    parseError = true;
    continue;
  }
  bucket.push(s.toLowerCase());
}
if (parseError || hard.length === 0) {
  console.error('boundary-scan: blocklist is malformed or contains no HARD terms. Refusing to pass an empty scan.');
  process.exit(1);
}

const holdRegister = await readFile(path.join(repoDir, 'PUBLICATION-HOLD.md'), 'utf8');
const heldMatch = holdRegister.match(/^## Held\s*\n([\s\S]*?)(?=^##\s)/m);
if (!heldMatch || !/^\|\s*Path\s*\|\s*Reason\s*\|\s*Released when\s*\|\s*$/m.test(heldMatch[1])) {
  console.error('boundary-scan: publication hold register has no valid Held table. Refusing to scan an ambiguous surface.');
  process.exit(1);
}
const heldSection = heldMatch[1];
const heldPaths = new Set([...heldSection.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((match) => match[1].trim()));

const SKIP_DIRS = new Set(['.git', 'node_modules', '.next', 'inputs', 'knowledge']);
const EXTS = new Set(['.md', '.mdx', '.ts', '.tsx', '.mjs', '.js', '.json', '.yml', '.yaml', '.svg']);

async function collect(dir, acc = []) {
  for (const e of await readdir(path.join(repoDir, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await collect(rel, acc);
    } else if (EXTS.has(path.extname(e.name)) && !heldPaths.has(rel.replace(/^\.\//, ''))) acc.push(rel);
  }
  return acc;
}

const files = (await collect('.')).map((f) => f.replace(/^\.\//, ''));
const hardHits = new Map();
const warnHits = new Map();

for (const rel of files) {
  const text = (await readFile(path.join(repoDir, rel), 'utf8')).toLowerCase();
  for (const term of hard) if (text.includes(term)) hardHits.set(rel, (hardHits.get(rel) ?? 0) + 1);
  for (const term of warn) {
    if (new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(text)) {
      warnHits.set(rel, (warnHits.get(rel) ?? 0) + 1);
    }
  }
}

if (warnHits.size) {
  console.log(`boundary-scan: ${warnHits.size} file(s) with WARN-tier matches (review, not blocking):`);
  for (const [f, n] of warnHits) console.log(`  ${f} (${n})`);
}

if (hardHits.size) {
  console.error(`boundary-scan: FAIL. ${hardHits.size} file(s) contain HARD-tier reserved terms:`);
  for (const [f, n] of hardHits) console.error(`  ${f} (${n} term(s))`);
  console.error('Terms are deliberately not printed. Run locally with BLOCKLIST set to see context.');
  process.exit(1);
}

console.log(`boundary-scan: ${files.length} files scanned, zero HARD hits.`);
