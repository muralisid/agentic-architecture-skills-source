// Generates the site content tree in content/docs.
// Two sources: hand-authored product pages in the repo's product/ directory
// (copied verbatim), and the research corpus (mirrored under /library).
// The repo is the source of truth (DECISIONS.md D001); the site is a view of it.
// Run via `npm run sync`, which `build` and `dev` both call.

import { copyFile, mkdir, readFile, readdir, realpath, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoDir = path.dirname(siteDir);
const outDir = path.join(siteDir, 'content', 'docs');
const productDir = path.join(repoDir, 'product');

const REPO = 'https://github.com/muralisidfn7/agentic-enterprise';
const BRANCH = 'main';
const REPO_PUBLIC = process.env.SOURCE_REPOSITORY_PUBLIC === 'true';

// Files under publication hold are part of the repo but excluded from the site.
// See PUBLICATION-HOLD.md at the repo root for why each one is held.
async function readHold() {
  const held = new Set();
  const registerPath = path.join(repoDir, 'PUBLICATION-HOLD.md');
  let text;
  try {
    text = await readFile(registerPath, 'utf8');
  } catch (error) {
    throw new Error(`Publication boundary is unavailable at ${registerPath}; refusing to generate public content.`, { cause: error });
  }
  const heldMatch = text.match(/^## Held\s*\n([\s\S]*?)(?=^##\s)/m);
  if (!heldMatch || !/^\|\s*Path\s*\|\s*Reason\s*\|\s*Released when\s*\|\s*$/m.test(heldMatch[1])) {
    throw new Error(`Publication boundary register at ${registerPath} has no valid Held table; refusing to generate public content.`);
  }
  const heldSection = heldMatch[1];
  for (const m of heldSection.matchAll(/^\|\s*`([^`]+)`\s*\|/gm)) held.add(m[1].trim());
  const controlledRelease = 'techniques/multi-view-embeddings.md';
  if (!held.has(controlledRelease) && !REPO_PUBLIC) {
    throw new Error(
      `${controlledRelease} is no longer held, but SOURCE_REPOSITORY_PUBLIC is not true; ` +
      'refusing to treat an unconfirmed register edit as publication approval.',
    );
  }
  return held;
}
const HELD = await readHold();

// ---------------------------------------------------------------------------
// Library mirror: repo-relative source path -> slug under library/.
// Slugs beneath the prefix match the first-day /docs slugs one to one, which
// is what makes the /docs/:path* -> /library/:path* redirect exact.
// ---------------------------------------------------------------------------
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
      if (['node_modules', '.git', 'site', 'inputs', 'knowledge', '.github', 'product', 'scripts', 'figures'].includes(entry.name)) continue;
      await collect(rel, acc);
    } else if (entry.name.endsWith('.md')) {
      acc.push(rel);
    }
  }
  return acc;
}

// Corpus files may carry frontmatter of their own; the mirror strips it and
// derives page metadata from the document text instead.
function stripSourceFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return raw;
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return raw;
  return raw.slice(end + 5).replace(/^\n/, '');
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
        if (/^#{1,6}\s/.test(next)) continue;
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

const INDEX_TITLES = {
  'architecture/index': 'Architecture',
  'layers/index': 'The 14 enterprise layers',
  'techniques/index': 'Techniques',
  'frameworks/index': 'Frameworks',
  'blueprints/index': 'Blueprints',
  'vendors/index': 'Vendor research',
};

const LAYER_TITLES = {
  'r01-infrastructure': 'Infrastructure and compute',
  'r02-data-platform': 'Data platform',
  'r03-integration-fabric': 'Integration fabric',
  'r04-systems-of-record': 'Systems of record',
  'r05-lob-and-ot': 'Line of business and OT',
  'r06-intelligence-and-learning': 'Intelligence and learning',
  'r07-agent-platform': 'Agent platform',
  'r08-productivity-and-collaboration': 'Productivity and collaboration',
  'r09-experience-and-channels': 'Experience and channels',
  'r10-security-and-identity': 'Security and identity',
  'r11-governance-risk-sovereignty': 'Governance, risk and sovereignty',
  'r12-observability-and-finops': 'Observability and FinOps',
  'r13-operating-model': 'Operating model',
  'r14-agent-data-engineering': 'Agent data engineering',
};

const LAYER_ICONS = {
  'r01-infrastructure': 'Server',
  'r02-data-platform': 'Database',
  'r03-integration-fabric': 'Cable',
  'r04-systems-of-record': 'Archive',
  'r05-lob-and-ot': 'Factory',
  'r06-intelligence-and-learning': 'Lightbulb',
  'r07-agent-platform': 'Bot',
  'r08-productivity-and-collaboration': 'Users',
  'r09-experience-and-channels': 'MessageSquare',
  'r10-security-and-identity': 'Lock',
  'r11-governance-risk-sovereignty': 'Landmark',
  'r12-observability-and-finops': 'Activity',
  'r13-operating-model': 'Eye',
  'r14-agent-data-engineering': 'Funnel',
};

const CHILD_PAGE_TITLES = {
  findings: 'Findings',
  brief: 'Research brief',
  vendors: 'Vendor landscape',
  sources: 'Sources',
};

function cleanTitle(title, slug, rel) {
  const base = path.basename(rel, '.md');
  if (slug.startsWith('layers/') && base in CHILD_PAGE_TITLES) return CHILD_PAGE_TITLES[base];
  return (INDEX_TITLES[slug] ?? title)
    .replace(/^R\d{2}\s*[:\-]\s*/, '')
    .replace(/^(Department|Vertical) Blueprint: /, '')
    .replace(/^(Vendor|Category) Profile: /, '');
}

function yamlValue(value) {
  return JSON.stringify(value);
}

const files = (await collect('.')).map((f) => f.replace(/^\.\//, ''));
const map = new Map(); // repo-relative path -> library slug (no prefix)
for (const rel of files) {
  if (HELD.has(rel)) continue;
  const slug = slugFor(rel);
  if (slug) map.set(rel, slug);
}

function routeFor(slug) {
  return '/library/' + slug.replace(/\/index$/, '');
}

// Rewrite a relative markdown link found in `sourceRel` into a site route,
// or into a GitHub link when the target is not published on the site.
function rewriteLink(sourceRel, href) {
  if (/^(https?:|#|mailto:|\/)/.test(href)) return href;
  const [pathPart, hash = ''] = href.split('#');
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourceRel), pathPart));
  const clean = resolved.replace(/^\.\//, '');
  if (HELD.has(clean)) return null; // held: drop the link, keep the words
  if (map.has(clean)) return routeFor(map.get(clean)) + (hash ? '#' + hash : '');
  // Directory link, e.g. profiles/
  const asIndex = path.posix.join(clean.replace(/\/$/, ''), 'README.md');
  if (map.has(asIndex)) return routeFor(map.get(asIndex)) + (hash ? '#' + hash : '');
  return REPO_PUBLIC ? `${REPO}/blob/${BRANCH}/${clean.replace(/\/$/, '')}` : null;
}

const FIGURE_SOURCE_DIR = path.join(repoDir, 'figures', 'assets');
const FIGURE_OUTPUT_DIR = path.join(siteDir, 'public', 'figures');
const FIGURE_COPIED_OUTPUT_DIR = path.join(FIGURE_OUTPUT_DIR, 'assets');
const SAFE_FIGURE_EXTENSION = /\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

// Images are assets, not document links. Only explicitly public, image-typed
// files under figures/assets are copied into a dedicated public subdirectory.
async function rewriteImages(sourceRel, body) {
  const pattern = /!\[([^\]]*)\]\((<[^>]+>|[^\s)]+)(?:\s+("[^"]*"|'[^']*'))?\)/g;
  const targets = new Map();

  for (const match of body.matchAll(pattern)) {
    const original = match[2];
    const href = original.replace(/^<|>$/g, '');
    if (/^(https?:|data:|\/)/.test(href)) continue;

    const suffixIndex = href.search(/[?#]/);
    const pathPart = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
    const suffix = suffixIndex === -1 ? '' : href.slice(suffixIndex);
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourceRel), pathPart));
    const clean = resolved.replace(/^\.\//, '');
    if (!clean.startsWith('figures/assets/') || !SAFE_FIGURE_EXTENSION.test(clean)) continue;

    const sourcePath = path.join(repoDir, clean);
    if (!existsSync(sourcePath)) continue;
    const [realSource, realFigureRoot, realRepoRoot, sourceStat] = await Promise.all([
      realpath(sourcePath),
      realpath(FIGURE_SOURCE_DIR),
      realpath(repoDir),
      stat(sourcePath),
    ]);
    if (
      realFigureRoot !== path.join(realRepoRoot, 'figures', 'assets') ||
      !sourceStat.isFile() ||
      !realSource.startsWith(`${realFigureRoot}${path.sep}`)
    ) continue;

    const publicRel = path.relative(realFigureRoot, realSource);
    const outputPath = path.join(FIGURE_COPIED_OUTPUT_DIR, publicRel);
    await mkdir(path.dirname(outputPath), { recursive: true });
    await copyFile(realSource, outputPath);
    targets.set(original, `/figures/assets/${publicRel.split(path.sep).join('/')}${suffix}`);
  }

  return body.replace(pattern, (whole, alt, original, title = '') => {
    const target = targets.get(original);
    if (!target) return whole;
    return `![${alt}](${target}${title ? ` ${title}` : ''})`;
  });
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
await rm(FIGURE_COPIED_OUTPUT_DIR, { recursive: true, force: true });

// ---------------------------------------------------------------------------
// 1. Mirror the corpus under /library. Plain .md: library pages carry no MDX
// components, and plain Markdown is robust against angle brackets in prose.
// ---------------------------------------------------------------------------
let written = 0;
for (const [rel, slug] of map) {
  const raw = await readFile(path.join(repoDir, rel), 'utf8');
  const sourceBody = stripSourceFrontmatter(raw);
  const derived = titleAndDescription(sourceBody, path.basename(rel, '.md'));
  const title = cleanTitle(derived.title, slug, rel);
  const description = /^(as of|phase\s+\d|scope|status)\b/i.test(derived.description) ? '' : derived.description;

  let body = sourceBody.replace(/^#\s+.*\n/, ''); // title moves into frontmatter
  if (derived.descriptionLine && description) body = body.replace(derived.descriptionLine + '\n', '');
  body = body.replace(/^\s*---\s*\n/, ''); // drop the rule that separated them
  body = await rewriteImages(rel, body);
  body = body.replace(/(?<!!)\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, href) => {
    const target = rewriteLink(rel, href);
    return target === null ? text : `[${text}](${target})`;
  });
  body = linkifyBarePaths(rel, body);
  body = body.trimStart();

  const footer = REPO_PUBLIC
    ? `\n\n---\n\nSource: [\`${rel}\`](${REPO}/blob/${BRANCH}/${rel}) in the guide repository.\n`
    : `\n\n---\n\nSource: \`${rel}\` in the evidence repository behind this site.\n`;

  const frontmatter = `---\ntitle: ${yamlValue(title)}\n${description ? `description: ${yamlValue(description)}\n` : ''}---\n\n`;
  const outPath = path.join(outDir, 'library', `${slug}.md`);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, frontmatter + body + footer);
  written++;
}

// The library front door: written here because no single corpus file is it.
await writeFile(path.join(outDir, 'library', 'index.md'), `---
title: "Research library"
description: "The evidence behind every page on this site: 14 layer research tracks, cross-layer synthesis, frameworks, blueprints, and vendor research, with dated sources throughout."
---

Every product page on this site is a condensation of this library. Claims carry dated sources, vendor-published numbers are flagged as such, author positions are labelled as positions, and volatile facts sit on a re-verification list.

- [Architecture](/library/architecture): the cross-layer chapters, from the vision to the learning loops.
- [The 14 enterprise layers](/library/layers): one research track per layer of the estate.
- [Techniques](/library/techniques): production patterns with their economics.
- [Frameworks](/library/frameworks): the readiness, portfolio, roadmap, and vendor instruments the product pages apply for you.
- [Blueprints](/library/blueprints): the department and vertical studies behind the kits.
- [Vendor research](/library/vendors): coverage, pathways, and profiles.
- [Glossary](/library/glossary), [decision log](/library/decisions), [re-verification list](/library/re-verification), [changelog](/library/changelog).
`);
written++;

// ---------------------------------------------------------------------------
// 2. Copy the authored product pages verbatim, with link and hold validation.
// ---------------------------------------------------------------------------
async function collectProduct(dir, acc = []) {
  if (!existsSync(path.join(productDir, dir))) return acc;
  for (const entry of await readdir(path.join(productDir, dir), { withFileTypes: true })) {
    const rel = path.posix.join(dir, entry.name);
    if (entry.isDirectory()) await collectProduct(rel, acc);
    else if (entry.name.endsWith('.mdx')) acc.push(rel);
  }
  return acc;
}

const productFiles = (await collectProduct('.')).map((f) => f.replace(/^\.\//, ''));
const productRoutes = new Set(
  productFiles.map((rel) => '/' + rel.replace(/\.mdx$/, '').replace(/\/index$/, '')),
);
const libraryRoutes = new Set([...map.values()].map((slug) => routeFor(slug)));
libraryRoutes.add('/library');

function assertProductPage(rel, text) {
  for (const m of text.matchAll(/\[[^\]]*\]\((\/[^)\s#]*)(?:#[^)]*)?\)/g)) {
    const href = m[1].replace(/\/$/, '') || '/';
    if (href === '/' || href.startsWith('/figures/')) continue;
    if (productRoutes.has(href) || libraryRoutes.has(href)) continue;
    throw new Error(`product/${rel} links to unknown route ${href}. Product links must resolve to a product page, a library page, or /figures/.`);
  }
  for (const held of HELD) {
    if (text.includes(held)) {
      throw new Error(`product/${rel} references held path ${held}; product pages must not point at held material.`);
    }
  }
}

let productWritten = 0;
for (const rel of productFiles) {
  const text = await readFile(path.join(productDir, rel), 'utf8');
  if (!/^---\n[\s\S]*?\btitle:\s*"/.test(text) || !/\bdescription:\s*"/.test(text)) {
    throw new Error(`product/${rel} is missing title or description frontmatter.`);
  }
  assertProductPage(rel, text);
  const outPath = path.join(outDir, rel);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, text);
  productWritten++;
}

// ---------------------------------------------------------------------------
// 3. Ordering and section titles.
// ---------------------------------------------------------------------------
const metas = {
  '.': {
    // Only the product sections appear in the main tree; the library is its
    // own root and never appears in the product sidebar.
    pages: ['architecture', 'layers', 'decisions'],
  },
  architecture: {
    title: 'Architecture',
    icon: 'Compass',
    description: 'The cross-layer design of the agentic enterprise.',
    pages: ['index', 'deterministic-zones', 'identity-chain', 'enforcement', 'data-to-memory', 'learning-flywheel', 'autonomy-contract', 'concern-matrix'],
  },
  layers: {
    title: 'Layers',
    icon: 'Layers',
    description: 'The fourteen enterprise layers, each with its target state, mechanisms, and decisions.',
    pages: ['index', ...Object.keys(LAYER_TITLES)],
  },
  library: {
    title: 'Research library',
    icon: 'BookMarked',
    root: true,
    pages: ['architecture', 'layers', 'techniques', 'frameworks', 'blueprints', 'vendors', 'glossary', 'decisions', 're-verification', 'changelog', 'contributing'],
  },
  'library/architecture': {
    title: 'Architecture',
    icon: 'Compass',
    pages: ['index', 'vision-and-target-state', 'maturity-model', 'archetype-grid', 'master-target-state', 'concerns-by-layers-matrix', 'memory-pipeline-architecture', 'economics-model', 'sovereignty-matrix', 'identity-security-model', 'learning-loops-map'],
  },
  'library/layers': {
    title: 'Layer research',
    icon: 'Layers',
    pages: ['index', ...Object.keys(LAYER_TITLES)],
  },
  'library/techniques': { title: 'Techniques', icon: 'Wrench', pages: ['index', '...'] },
  'library/frameworks': {
    title: 'Frameworks',
    icon: 'ClipboardList',
    pages: ['index', 'readiness-assessments', 'use-case-portfolio', 'roadmap-checklist', 'vendor-question-bank', 'vendor-scorecard'],
  },
  'library/blueprints': { title: 'Blueprints', icon: 'Building2', pages: ['index', 'departments', 'verticals'] },
  'library/blueprints/departments': {
    title: 'Departments',
    pages: ['it-and-service-desk', 'customer-service', 'finance', 'hr', 'sales', 'marketing', 'supply-chain'],
  },
  'library/blueprints/verticals': {
    title: 'Verticals',
    pages: ['utilities-and-energy', 'banking-and-financial-services', 'manufacturing-and-supply-chain', 'public-sector'],
  },
  'library/vendors': {
    title: 'Vendor research',
    icon: 'Store',
    pages: ['index', 'coverage-matrix', 'adoption-pathways', 'profiles'],
  },
  'library/vendors/profiles': {
    title: 'Profiles',
    pages: ['microsoft', 'salesforce', 'servicenow', 'sap', 'aws', 'google', 'anthropic', 'openai', 'gateways-and-identity', 'evals-and-observability'],
  },
};

for (const track of Object.keys(LAYER_TITLES)) {
  metas[`library/layers/${track}`] = {
    title: LAYER_TITLES[track],
    icon: LAYER_ICONS[track],
    pages: ['index', 'findings', 'brief', 'vendors', 'sources'],
  };
}

for (const [dir, meta] of Object.entries(metas)) {
  const target = path.join(outDir, dir === '.' ? '' : dir);
  if (!existsSync(target)) continue;
  await writeFile(path.join(target, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
}

console.log(`sync-content: ${productWritten} product pages, ${written} library pages written to content/docs`);
