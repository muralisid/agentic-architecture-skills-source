// Guide content checks that must pass before a deploy.
// 1. No em dashes in guide content (raw inputs are exempt: they are other people's text).
// 2. Every relative markdown link resolves.
// Usage: node scripts/check-content.mjs

import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SKIP_DIRS = new Set(['.git', 'node_modules', 'site', 'inputs', '.github']);

async function collect(dir, acc = []) {
  for (const e of await readdir(path.join(repoDir, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, e.name);
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      await collect(rel, acc);
    } else if (e.name.endsWith('.md') || e.name.endsWith('.mdx')) acc.push(rel);
  }
  return acc;
}

const files = (await collect('.')).map((f) => f.replace(/^\.\//, ''));
const emDash = [];
const brokenLinks = [];

for (const rel of files) {
  const text = await readFile(path.join(repoDir, rel), 'utf8');
  text.split('\n').forEach((line, i) => {
    if (line.includes('—')) emDash.push(`${rel}:${i + 1}`);
  });
  for (const m of text.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    const href = m[2];
    if (/^(https?:|#|mailto:)/.test(href)) continue;
    // Site-absolute routes (product pages) are validated against the full
    // route map by site/scripts/sync-content.mjs, which fails the build on
    // unknown routes; this scan checks only file-relative links.
    if (href.startsWith('/')) continue;
    const target = path.join(repoDir, path.posix.dirname(rel), href.split('#')[0]);
    if (!existsSync(target)) brokenLinks.push(`${rel} -> ${href}`);
  }
}

// Claims the guide refuses to publish: verified wrong, untraceable, or
// extrapolations their own source communities reject. Build-failing.
const DENY_LIST = [
  '128 robots',
  '88:1',
  '6 alarms per hour',
  'entry-level hiring down 80',
  '75% of API gateway vendors',
  '60% of agentic analytics projects',
];
const RATIO_PATTERN = /\b\d+\s*(?:agents?\s+per\s+(?:supervisor|reviewer|operator|person)|:\s*1\s+agent-to-(?:operator|supervisor))/i;
// Scoped to product pages: the research corpus quotes these figures in order
// to debunk them, which is legitimate; product pages state refusals without
// repeating the numbers.
const denyHits = [];
for (const rel of files) {
  if (!rel.startsWith('product/')) continue;
  const text = await readFile(path.join(repoDir, rel), 'utf8');
  for (const term of DENY_LIST) {
    if (text.toLowerCase().includes(term.toLowerCase())) denyHits.push(`${rel}: "${term}"`);
  }
  if (RATIO_PATTERN.test(text)) denyHits.push(`${rel}: numeric supervision ratio`);
}

// Every deep layer page carries the five mandatory sections.
const REQUIRED_H2 = ['## Target state', '## Mechanisms', '## Design decisions', '## Cross-cutting concerns', '## Evidence and limits'];
const templateMisses = [];
for (const rel of files) {
  if (!/^product\/layers\/r\d{2}-/.test(rel)) continue;
  const text = await readFile(path.join(repoDir, rel), 'utf8');
  for (const h of REQUIRED_H2) {
    if (!text.includes(h)) templateMisses.push(`${rel}: missing "${h}"`);
  }
}

let failed = false;
if (denyHits.length) {
  failed = true;
  console.error(`FAIL deny-listed claims (${denyHits.length}):`);
  denyHits.forEach((l) => console.error('  ' + l));
}
if (templateMisses.length) {
  failed = true;
  console.error(`FAIL layer-page template (${templateMisses.length}):`);
  templateMisses.forEach((l) => console.error('  ' + l));
}
if (emDash.length) {
  failed = true;
  console.error(`FAIL em dashes (${emDash.length}):`);
  emDash.slice(0, 20).forEach((l) => console.error('  ' + l));
}
if (brokenLinks.length) {
  failed = true;
  console.error(`FAIL broken internal links (${brokenLinks.length}):`);
  brokenLinks.slice(0, 20).forEach((l) => console.error('  ' + l));
}
if (!failed) console.log(`check-content: ${files.length} files, no em dashes, no broken links`);
process.exit(failed ? 1 : 0);
