// Generates the docs tree in content/docs from the repository's markdown corpus.
// The repo is the source of truth (DECISIONS.md D001); the site is a view of it.
// Run via `npm run sync`, which `build` and `dev` both call.

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoDir = path.dirname(siteDir);
const outDir = path.join(siteDir, 'content', 'docs');

const REPO = 'https://github.com/muralisidfn7/agentic-enterprise';
const BRANCH = 'main';

// Files under publication hold are part of the repo but excluded from the site.
// See PUBLICATION-HOLD.md at the repo root for why each one is held.
async function readHold() {
  const held = new Set();
  try {
    const text = await readFile(path.join(repoDir, 'PUBLICATION-HOLD.md'), 'utf8');
    const heldSection = text.split('## Deliberately not held')[0];
    for (const m of heldSection.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)) held.add(m[1].trim());
  } catch {
    // No register means nothing is held.
  }
  return held;
}
const HELD = await readHold();

// Repo-relative source path -> site doc slug (no extension, relative to content/docs).
function slugFor(rel) {
  const parts = rel.split('/');
  const base = parts[parts.length - 1].replace(/\.md$/, '');

  if (rel === 'GLOSSARY.md') return 'glossary';
  if (rel === 'DECISIONS.md') return 'decisions';
  if (rel === 'CONTRIBUTING.md') return 'contributing';
  if (rel === 'CHANGELOG.md') return 'changelog';
  if (rel === 'RE-VERIFICATION.md') return 're-verification';

  if (parts[0] === 'synthesis') {
    return base === 'README' ? 'architecture/index' : `architecture/${base}`;
  }
  if (parts[0] === 'research') {
    if (parts.length === 2) return base === 'README' ? 'layers/index' : null;
    const track = parts[1].toLowerCase();
    if (track === '_template') return null;
    return base === 'README' ? `layers/${track}/index` : `layers/${track}/${base}`;
  }
  if (parts[0] === 'techniques') {
    return base === 'README' ? 'techniques/index' : `techniques/${base}`;
  }
  if (parts[0] === 'frameworks') {
    return base === 'README' ? 'frameworks/index' : `frameworks/${base}`;
  }
  if (parts[0] === 'blueprints') {
    if (base === '_TEMPLATE') return null;
    if (parts.length === 2) return base === 'README' ? 'blueprints/index' : `blueprints/${base}`;
    return `blueprints/${parts[1]}/${base}`;
  }
  if (parts[0] === 'vendors') {
    if (parts.length === 2) return base === 'README' ? 'vendors/index' : `vendors/${base}`;
    return `vendors/${parts[1]}/${base}`;
  }
  return null;
}

async function collect(dir, acc = []) {
  for (const entry of await readdir(path.join(repoDir, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.git', 'site', 'inputs', 'knowledge', '.github'].includes(entry.name)) continue;
      await collect(rel, acc);
    } else if (entry.name.endsWith('.md')) {
      acc.push(rel);
    }
  }
  return acc;
}

function titleAndDescription(text, fallback) {
  const lines = text.split('\n');
  let title = fallback;
  let description = '';
  let descriptionLine = '';
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('# ')) {
      title = line.slice(2).trim();
      for (let j = i + 1; j < Math.min(i + 8, lines.length); j++) {
        const next = lines[j].trim();
        if (!next || next === '---') continue;
        descriptionLine = lines[j];
        description = next.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        break;
      }
      break;
    }
  }
  if (description.length > 220) description = description.slice(0, 217).trimEnd() + '...';
  return { title: title || fallback, description, descriptionLine };
}

// Index pages take their sidebar label from the section, not from the file's own H1.
const INDEX_TITLES = {
  'architecture/index': 'Architecture overview',
  'layers/index': 'Layer guides overview',
  'techniques/index': 'Techniques overview',
  'frameworks/index': 'Frameworks overview',
  'blueprints/index': 'Blueprints overview',
  'vendors/index': 'Vendor hub overview',
};

const LAYER_TITLES = {
  'r01-infrastructure': 'R01 Infrastructure and compute',
  'r02-data-platform': 'R02 Data platform',
  'r03-integration-fabric': 'R03 Integration fabric',
  'r04-systems-of-record': 'R04 Systems of record',
  'r05-lob-and-ot': 'R05 Line of business and OT',
  'r06-intelligence-and-learning': 'R06 Intelligence and learning',
  'r07-agent-platform': 'R07 Agent platform',
  'r08-productivity-and-collaboration': 'R08 Productivity and collaboration',
  'r09-experience-and-channels': 'R09 Experience and channels',
  'r10-security-and-identity': 'R10 Security and identity',
  'r11-governance-risk-sovereignty': 'R11 Governance, risk and sovereignty',
  'r12-observability-and-finops': 'R12 Observability and FinOps',
  'r13-operating-model': 'R13 Operating model',
  'r14-agent-data-engineering': 'R14 Agent data engineering',
};

function esc(s) {
  return s.replace(/"/g, '\\"');
}

const files = (await collect('.')).map((f) => f.replace(/^\.\//, ''));
const map = new Map(); // repo-relative path -> slug
for (const rel of files) {
  if (HELD.has(rel)) continue;
  const slug = slugFor(rel);
  if (slug) map.set(rel, slug);
}

function routeFor(slug) {
  return '/docs/' + slug.replace(/\/index$/, '');
}

// Rewrite a relative markdown link found in `sourceRel` into a site route,
// or into a GitHub link when the target is not published on the site.
function rewriteLink(sourceRel, href) {
  if (/^(https?:|#|mailto:)/.test(href)) return href;
  const [pathPart, hash = ''] = href.split('#');
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourceRel), pathPart));
  const clean = resolved.replace(/^\.\//, '');
  if (HELD.has(clean)) return null; // held: drop the link, keep the words
  if (map.has(clean)) return routeFor(map.get(clean)) + (hash ? '#' + hash : '');
  // Directory link, e.g. profiles/
  const asIndex = path.posix.join(clean.replace(/\/$/, ''), 'README.md');
  if (map.has(asIndex)) return routeFor(map.get(asIndex)) + (hash ? '#' + hash : '');
  return `${REPO}/blob/${BRANCH}/${clean.replace(/\/$/, '')}`;
}

// Bare repo paths mentioned in prose, e.g. "research/R13-operating-model/findings.md".
function linkifyBarePaths(sourceRel, body) {
  return body.replace(/(^|[\s(])((?:research|synthesis|techniques|frameworks|blueprints|vendors)\/[A-Za-z0-9._\-/]+\.md)/g,
    (whole, lead, p) => {
      if (!map.has(p)) return whole;
      return `${lead}[${p}](${routeFor(map.get(p))})`;
    });
}

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

let written = 0;
for (const [rel, slug] of map) {
  const raw = await readFile(path.join(repoDir, rel), 'utf8');
  const derived = titleAndDescription(raw, path.basename(rel, '.md'));
  // The breadcrumb already supplies the section, so drop repeated prefixes from sidebar titles.
  const title = (INDEX_TITLES[slug] ?? derived.title)
    .replace(/^(Department|Vertical) Blueprint: /, '')
    .replace(/^(Vendor|Category) Profile: /, '');
  const { description, descriptionLine } = derived;

  let body = raw.replace(/^#\s+.*\n/, ''); // title moves into frontmatter
  if (descriptionLine) body = body.replace(descriptionLine + '\n', ''); // and so does the standfirst
  body = body.replace(/^\s*---\s*\n/, ''); // drop the rule that separated them
  body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => {
    const target = rewriteLink(rel, href);
    return target === null ? text : `[${text}](${target})`;
  });
  body = linkifyBarePaths(rel, body);
  body = body.trimStart();

  const footer = `\n\n---\n\nSource: [\`${rel}\`](${REPO}/blob/${BRANCH}/${rel}) in the guide repository.\n`;

  const frontmatter = `---\ntitle: "${esc(title)}"\n${description ? `description: "${esc(description)}"\n` : ''}---\n\n`;
  const outPath = path.join(outDir, `${slug}.md`);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, frontmatter + body + footer);
  written++;
}

// The site's own front door. Not derived from a repo file, because the repo README
// addresses contributors and this page addresses readers.
const INDEX_DOC = `---
title: "Start here"
description: "An open, vendor-neutral reference for the architecture of the agentic enterprise. Evidence first, positions labelled, unsolved problems published as unsolved."
---

An enterprise where routine knowledge work executes through governed agents, while humans set intent, supervise, manage exceptions, and hold accountability. This guide describes the architecture that gets you there, layer by layer, and says plainly where the evidence runs out.

## What is here

<Cards>
  <Card title="Architecture" href="/docs/architecture" description="Ten cross-layer chapters: the vision, the A x L maturity model, three target-state architectures, the concerns matrix, memory pipelines, economics, sovereignty, identity and security, learning loops." />
  <Card title="Layer guides" href="/docs/layers" description="Fourteen research tracks, one per layer of the enterprise landscape, each with a brief, findings, a vendor map, and dated sources." />
  <Card title="Frameworks" href="/docs/frameworks" description="Assess where you are, decide which use cases get budget, and generate your roadmap from nine factor answers." />
  <Card title="Blueprints" href="/docs/blueprints" description="Seven department and four vertical target states, each with a mandatory honest-limits section." />
  <Card title="Vendor hub" href="/docs/vendors" description="A question bank written before any profile, a scorecard that runs disqualifiers before scores, and a coverage matrix across all 14 layers." />
  <Card title="Techniques" href="/docs/techniques" description="Production patterns with their token economics, including multi-view embeddings and when a knowledge graph earns its keep." />
</Cards>

## How this guide is written

**Evidence over buzz.** Nothing is recommended on adoption momentum or vendor narrative. Every recommended component must beat the simplest credible alternative on technical merit and enterprise economics.

**Positions are labelled as positions.** Where the authors take a view ahead of the evidence, the text says so.

**Unsolved problems are published as unsolved.** Six cross-cutting concerns have no complete answer anywhere, and the [concerns matrix](/docs/architecture/concerns-by-layers-matrix) lists them with their status rather than papering over them. No credible human-to-agent supervision ratio has ever been published, and the [maturity model](/docs/architecture/maturity-model) is built around that absence rather than around a guess.

**Sources are dated and flagged.** Vendor-published numbers are labelled as such. Volatile facts carry as-of dates and sit on a quarterly re-verification list.

## If you read three pages

1. [The vision and target state](/docs/architecture/vision-and-target-state), including how the guide's founding metaphor survived being tested against the human-factors record.
2. [The A x L maturity model](/docs/architecture/maturity-model), with its oversight-capacity gate on the higher autonomy levels.
3. [The roadmap checklist](/docs/frameworks/roadmap-checklist), which turns nine answers about your enterprise into a sequenced plan with entry and exit gates.
`;

await writeFile(path.join(outDir, 'index.mdx'), INDEX_DOC);
written++;

// Ordering and section titles.
const metas = {
  '.': {
    title: 'Guide',
    pages: ['index', 'architecture', 'layers', 'techniques', 'frameworks', 'blueprints', 'vendors', 'glossary', 'decisions', 're-verification', 'changelog', 'contributing'],
  },
  architecture: {
    title: 'Architecture',
    description: 'The cross-layer chapters. Read in this order.',
    pages: ['index', 'vision-and-target-state', 'maturity-model', 'archetype-grid', 'master-target-state', 'concerns-by-layers-matrix', 'memory-pipeline-architecture', 'economics-model', 'sovereignty-matrix', 'identity-security-model', 'learning-loops-map'],
  },
  layers: {
    title: 'Layer guides',
    description: 'Fourteen research tracks, one per layer of the enterprise landscape.',
    pages: ['index', 'r01-infrastructure', 'r02-data-platform', 'r03-integration-fabric', 'r04-systems-of-record', 'r05-lob-and-ot', 'r06-intelligence-and-learning', 'r07-agent-platform', 'r08-productivity-and-collaboration', 'r09-experience-and-channels', 'r10-security-and-identity', 'r11-governance-risk-sovereignty', 'r12-observability-and-finops', 'r13-operating-model', 'r14-agent-data-engineering'],
  },
  techniques: { title: 'Techniques', pages: ['index', '...'] },
  frameworks: {
    title: 'Frameworks',
    description: 'Assess, prioritise, sequence. Vendor selection comes last.',
    pages: ['index', 'readiness-assessments', 'use-case-portfolio', 'roadmap-checklist', 'vendor-question-bank', 'vendor-scorecard'],
  },
  blueprints: { title: 'Blueprints', pages: ['index', 'departments', 'verticals'] },
  'blueprints/departments': {
    title: 'Departments',
    pages: ['it-and-service-desk', 'customer-service', 'finance', 'hr', 'sales', 'marketing', 'supply-chain'],
  },
  'blueprints/verticals': {
    title: 'Verticals',
    pages: ['utilities-and-energy', 'banking-and-financial-services', 'manufacturing-and-supply-chain', 'public-sector'],
  },
  vendors: {
    title: 'Vendor hub',
    description: 'Question bank first, profiles second. That order is the bias control.',
    pages: ['index', 'coverage-matrix', 'adoption-pathways', 'profiles'],
  },
  'vendors/profiles': {
    title: 'Profiles',
    pages: ['microsoft', 'salesforce', 'servicenow', 'sap', 'aws', 'google', 'anthropic', 'openai', 'gateways-and-identity', 'evals-and-observability'],
  },
};

for (const trackDir of (await readdir(path.join(outDir, 'layers'), { withFileTypes: true })).filter((d) => d.isDirectory())) {
  metas[`layers/${trackDir.name}`] = {
    title: LAYER_TITLES[trackDir.name] ?? trackDir.name,
    pages: ['index', 'findings', 'brief', 'vendors', 'sources'],
  };
}

for (const [dir, meta] of Object.entries(metas)) {
  const target = path.join(outDir, dir === '.' ? '' : dir);
  if (!existsSync(target)) continue;
  await writeFile(path.join(target, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
}

console.log(`sync-content: ${written} pages written to content/docs`);
