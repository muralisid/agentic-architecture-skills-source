// Story and vocabulary checks for the product pages (audit round 3, October 2026).
// 1. No "In plain terms" boxes, label lines, "Why ..." openers or guide history.
// 2. No retired vocabulary (planes, identity chain, capability surface, ...).
// 3. Every product page declares its related concepts, and every mention of a
//    concept page links to it somewhere on the page or declares it.
// Usage: node scripts/check-story.mjs

import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const productDir = path.join(repoDir, 'product');

async function collect(dir, acc = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await collect(p, acc);
    else if (e.name.endsWith('.mdx')) acc.push(p);
  }
  return acc;
}

// Scaffolding and history that must not appear on a page.
const SCAFFOLDING = [
  [/<PlainTerms/, 'PlainTerms box'],
  [/\*\*In short:\*\*/, '"In short" label'],
  [/\*\*WHY:\*\*|\*\*WHAT:\*\*|\*\*HOW:\*\*/, 'WHY/WHAT label'],
  [/^## Why\b/m, '"Why ..." heading'],
  [/This guide used to|this guide used to|Old words to new|the earlier labels?|An earlier version of this guide|an earlier edition of this guide|The guide first wrote/, 'guide history'],
  [/this guide's position|This guide's position/, '"this guide\'s position" in prose'],
  [/^## Sources added /m, '"Sources added" heading'],
  [/\bdimensions?\b/i, 'the word "dimensions"'],
];

// Retired vocabulary. The allow pattern permits a line that names the old word as history.
const RETIRED = [
  [/\bseven planes\b|\b(execution|action|knowledge|improvement|evidence|human) plane\b|\bplanes\b/i, 'planes', /called|once|formerly|earlier|used to/i],
  [/\bidentity chain\b/i, 'identity chain', /once called|formerly|earlier/i],
  [/\bcapability surface\b|\bcapability-surface\b/i, 'capability surface', null],
  [/\bconsequence class\b/i, 'consequence class', null],
  [/\bpeople-decisions floor\b|\bpeople floor\b/i, 'people-decisions floor', null],
  [/\btwo estates?\b|\bmetered estate\b|\blicensed estate\b|\btwo-estate\b/i, 'two estates', null],
  [/\bevidence floor\b|\bArticle-12-grade\b/i, 'evidence floor', null],
  [/\bbudget envelope\b/i, 'budget envelope', null],
  [/\bfan-out\b/i, 'fan-out', null],
  [/\bchallenged default\b/i, 'challenged default', null],
  [/\bmemory tiers?\b|\bmemory planes?\b|\bM[1-5] (thread|retrieved|session|entity|cross-domain)\b/i, 'memory tiers', null],
  [/\bloop multiplier\b|\bmake-it-evaluable\b|\bportfolio supervision constraint\b|\bevidence rail\b|\bcuration before context\b/i, 'dropped term', null],
  [/\bA x L\b|\bmaturity model\b/i, 'A x L maturity model', /library|synthesis|maturity-model/i],
  [/\baccess identity\b|\bpresence identity\b/i, 'access/presence identity', /once|formerly|earlier/i],
  [/\b(isolation|evidence|help|enforcement|sovereignty|plausibility) tiers?\b/i, '"tier" outside the risk tier', null],
  [/\b(context|data|memory|tool) layer\b/i, '"layer" outside the fourteen', null],
];

// Concept pages: a mention anywhere on the page needs a link to the hub or a declared concept.
const CONCEPTS = [
  { keys: ['layers'], mention: /\bfourteen layers\b|\bR(0[1-9]|1[0-4])\b/, hub: /\]\(\/layers(\/|\)|#)/, alsoKeys: /^r(0[1-9]|1[0-4])$/ },
  { keys: ['lifecycle'], mention: /\bagent lifecycle\b/i, hub: /\]\(\/architecture\/agent-lifecycle/ },
  { keys: ['capabilities'], mention: /\bseven capabilities\b/i, hub: /\]\(\/architecture\/system-view/ },
  { keys: ['agent-types'], mention: /\bfour questions\b/i, hub: /\]\(\/architecture\/agent-types/ },
  { keys: ['autonomy'], mention: /\bautonomy contract\b|\(A[0-5]\)/, hub: /\]\(\/architecture\/autonomy-contract/ },
  { keys: ['risk'], mention: /\brisk tier\b|\bTier [123]\b/, hub: /\]\(\/architecture\/risk-profile/ },
  { keys: ['zones'], mention: /\bdeterministic zones?\b|\bmoney zone\b|\bzone register\b/i, hub: /\]\(\/architecture\/deterministic-zones/ },
  { keys: ['delegation'], mention: /\bdelegation chain\b/i, hub: /\]\(\/architecture\/delegation-chain/ },
  { keys: ['enforcement'], mention: /\bpolicy decision point\b/i, hub: /\]\(\/architecture\/enforcement/ },
  { keys: ['flywheel'], mention: /\blearning flywheel\b/i, hub: /\]\(\/architecture\/learning-flywheel/ },
];

const HUB_ROUTES = {
  '/layers': 'layers', '/architecture/agent-lifecycle': 'lifecycle', '/architecture/system-view': 'capabilities', '/architecture/agent-types': 'agent-types',
  '/architecture/autonomy-contract': 'autonomy', '/architecture/risk-profile': 'risk', '/architecture/deterministic-zones': 'zones', '/architecture/delegation-chain': 'delegation',
  '/architecture/enforcement': 'enforcement', '/architecture/learning-flywheel': 'flywheel',
};

function routeOf(file) {
  const rel = path.relative(productDir, file).replace(/\.mdx$/, '');
  const route = '/' + rel.replace(/(^|\/)index$/, '');
  return route === '/' ? '/' : route.replace(/\/$/, '');
}

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  return m ? { inner: m[1], length: m[0].length } : { inner: '', length: 0 };
}

function conceptKeys(fm) {
  const inline = fm.match(/^concepts:\s*\[([^\]]*)\]/m);
  if (inline) return inline[1].split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  const block = fm.match(/^concepts:\s*\n((?:\s+-\s+.*\n?)+)/m);
  if (block) return block[1].split('\n').map((l) => l.replace(/^\s*-\s*/, '').trim().replace(/^["']|["']$/g, '')).filter(Boolean);
  return null;
}

const problems = [];
for (const file of await collect(productDir)) {
  const rel = path.relative(repoDir, file);
  const text = await readFile(file, 'utf8');
  const { inner: fm, length: fmLength } = frontmatter(text);
  // Figure ids are identifiers, not prose; they keep their historical names.
  const body = text.slice(fmLength).replace(/<GuideFigure[^>]*>/g, '');
  const route = routeOf(file);
  const lines = body.split('\n');

  for (const [re, label] of SCAFFOLDING) {
    const m = body.match(re);
    if (m) problems.push(`${rel}: ${label} ("${m[0].slice(0, 40)}")`);
  }
  lines.forEach((line, i) => {
    for (const [re, label, allow] of RETIRED) {
      const m = line.match(re);
      if (m && !(allow && allow.test(line))) problems.push(`${rel}:${i + 1}: retired word ${label} ("${m[0]}")`);
    }
  });

  const keys = conceptKeys(fm);
  if (!keys || keys.length === 0) problems.push(`${rel}: no concepts in frontmatter`);
  const own = HUB_ROUTES[route];
  for (const c of CONCEPTS) {
    if (own && c.keys.includes(own)) continue;
    if (!c.mention.test(body)) continue;
    const linked = c.hub.test(body);
    const declared = keys && keys.some((k) => c.keys.includes(k) || (c.alsoKeys && c.alsoKeys.test(k)));
    if (!linked && !declared) problems.push(`${rel}: mentions ${c.keys[0]} but neither links its page nor declares it in concepts`);
  }
}

if (problems.length) {
  console.error(`FAIL story and vocabulary checks (${problems.length}):`);
  problems.forEach((l) => console.error('  ' + l));
  process.exit(1);
}
console.log('check-story: product pages carry no scaffolding, no retired words, and every concept mention is linked or declared');
