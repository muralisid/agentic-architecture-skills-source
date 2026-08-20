// Generates the docs tree in content/docs from the repository's markdown corpus.
// The repo is the source of truth (DECISIONS.md D001); the site is a view of it.
// Run via `npm run sync`, which `build` and `dev` both call.

import { copyFile, mkdir, readFile, readdir, realpath, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFigureManifestModule } from './figure-manifest-loader.mjs';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoDir = path.dirname(siteDir);
const outDir = path.join(siteDir, 'content', 'docs');

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
const { figureManifest } = await loadFigureManifestModule();
const figuresByPage = new Map();
for (const figure of figureManifest) {
  const figures = figuresByPage.get(figure.page) ?? [];
  figures.push(figure);
  figuresByPage.set(figure.page, figures);
}

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

// Source documents may opt into reader-facing metadata without coupling the
// repository corpus to the site's generated frontmatter. The parser is kept
// deliberately small: the public interface accepts quoted/plain scalars and
// JSON-style arrays, which is all the guide needs.
function parseSourceFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return { attributes: {}, body: raw };
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return { attributes: {}, body: raw };

  const attributes = {};
  for (const line of raw.slice(4, end).split('\n')) {
    const match = /^([A-Za-z0-9_]+):\s*(.*)$/.exec(line);
    if (!match) continue;
    const [, key, sourceValue] = match;
    const value = sourceValue.trim();
    if (!value) {
      attributes[key] = '';
      continue;
    }
    if ((value.startsWith('"') && value.endsWith('"')) || value.startsWith('[')) {
      try {
        attributes[key] = JSON.parse(value);
        continue;
      } catch {
        // Fall back to the literal string so one malformed optional field does
        // not suppress an otherwise publishable page.
      }
    }
    attributes[key] = value;
  }

  return { attributes, body: raw.slice(end + 5).replace(/^\n/, '') };
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

// Index pages take their sidebar label from the section, not from the file's own H1.
const INDEX_TITLES = {
  'architecture/index': 'Design the enterprise architecture',
  'layers/index': 'Explore the 14 enterprise layers',
  'techniques/index': 'Choose production techniques',
  'frameworks/index': 'Make the investment decisions',
  'blueprints/index': 'Apply the architecture',
  'vendors/index': 'Research the vendor landscape',
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

const CHILD_PAGE_TITLES = {
  findings: 'Architecture findings',
  brief: 'What this layer covers',
  vendors: 'Vendor landscape',
  sources: 'Sources and evidence',
};

const READER_SUMMARIES = {
  decisions: 'See the architectural decisions, the evidence that changed them, and the alternatives that were rejected.',
  're-verification': 'Track volatile claims that need scheduled re-checking before they inform a current decision.',
  changelog: 'Review material changes to the guide and its recommendations.',
  contributing: 'Learn how to improve the guide while preserving its evidence and publication boundaries.',
  'layers/index': 'Explore the fourteen durable layers of the enterprise estate and the agent-era decisions inside each one.',
  'blueprints/index': 'Start from a department or industry scenario, then trace agents, deterministic controls, economics, metrics, and honest limits.',
  'vendors/index': 'Research vendors only after readiness, portfolio, roadmap, and architecture decisions have defined what evidence to request.',
};

const JOURNEY_NEXT = {
  'architecture/vision-and-target-state': '/docs/architecture/archetype-grid',
  'architecture/archetype-grid': '/docs/frameworks/readiness-assessments',
  'frameworks/readiness-assessments': '/docs/frameworks/use-case-portfolio',
  'frameworks/use-case-portfolio': '/docs/frameworks/roadmap-checklist',
  'frameworks/roadmap-checklist': '/docs/architecture/master-target-state',
  'architecture/master-target-state': '/docs/blueprints',
  'blueprints/index': '/docs/frameworks/vendor-question-bank',
  'frameworks/vendor-question-bank': '/docs/frameworks/vendor-scorecard',
  'frameworks/vendor-scorecard': '/docs/vendors',
};

function cleanTitle(title, slug, rel) {
  const base = path.basename(rel, '.md');
  if (slug.startsWith('layers/') && base in CHILD_PAGE_TITLES) return CHILD_PAGE_TITLES[base];
  return (INDEX_TITLES[slug] ?? title)
    .replace(/^R\d{2}\s*[:\-—]\s*/, '')
    .replace(/^(Department|Vertical) Blueprint: /, '')
    .replace(/^(Vendor|Category) Profile: /, '')
    .replace(/:\s*findings$/i, ' architecture findings');
}

function defaultSummary(rel, slug, title, derivedDescription) {
  if (READER_SUMMARIES[slug]) return READER_SUMMARIES[slug];
  const slugParts = slug.split('/');
  const layerTitle = slugParts[0] === 'layers' ? LAYER_TITLES[slugParts[1]] : undefined;
  if (layerTitle && rel.endsWith('/README.md')) return `See why agents change ${layerTitle.toLowerCase()}, the decisions this layer owns, and where to inspect the evidence.`;
  if (rel.endsWith('/findings.md')) return `Understand the evidence, trade-offs, target state, and unresolved questions for ${layerTitle?.toLowerCase() || title.toLowerCase()}.`;
  if (rel.endsWith('/brief.md')) return `See what ${layerTitle ? layerTitle.toLowerCase() : 'this layer'} covers, why agents change it, and which questions the research answers.`;
  if (rel.endsWith('/vendors.md')) return `Compare the vendor landscape for ${layerTitle?.toLowerCase() || 'this layer'} without treating market presence as architectural fit.`;
  if (rel.endsWith('/sources.md')) return `Review the dated sources and evidence base behind ${layerTitle?.toLowerCase() || 'this layer'} findings.`;
  if (rel.startsWith('blueprints/')) return `Follow the target workflow, human and agent responsibilities, controls, economics, metrics, and honest limits for ${title.toLowerCase()}.`;
  if (rel.startsWith('vendors/')) return `Review ${title.toLowerCase()} against the guide's evidence-first vendor questions and architectural requirements.`;
  if (derivedDescription && !/^(as of|phase\s+\d|scope|status)\b/i.test(derivedDescription)) return derivedDescription;
  return `Understand ${title.toLowerCase()} and use it to make the next architecture or delivery decision.`;
}

function metadataFor(rel, slug, title, derivedDescription, source, body) {
  const useString = (value, fallback) => typeof value === 'string' && value.trim() ? value.trim() : fallback;
  const useStringArray = (value, fallback) => Array.isArray(value) && value.every((item) => typeof item === 'string') ? value : fallback;
  const summary = useString(source.reader_summary, defaultSummary(rel, slug, title, derivedDescription));
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const section = rel.split('/')[0];
  const defaultDecision = section === 'blueprints'
    ? 'Adapt the blueprint to one owned workflow and record its deterministic gates, success measures, and honest limits.'
    : section === 'vendors'
      ? 'Decide whether this option deserves deeper verification for the target workload.'
      : section === 'research'
        ? 'Record the layer decisions, control owners, and evidence gaps that apply to the target architecture.'
        : 'Record the decision or design consequence this page establishes for the target workload.';
  const defaultPrerequisites = slug.includes('/index') ? ['/docs'] : [];

  let defaultNext = '/docs';
  if (/^blueprints\/(?:departments|verticals)\//.test(slug)) {
    defaultNext = '/docs/blueprints';
  } else if (/^vendors\/profiles\//.test(slug)) {
    defaultNext = '/docs/vendors';
  } else if (slug.includes('/') && !slug.endsWith('/index')) {
    defaultNext = routeFor(slug.replace(/\/[^/]+$/, ''));
  }
  const layerMatch = /^layers\/([^/]+)\/(index|brief|findings|vendors|sources)$/.exec(slug);
  if (layerMatch) {
    const [, track, page] = layerMatch;
    const nextPage = { index: 'brief', brief: 'findings', findings: 'vendors', vendors: 'sources' }[page];
    defaultNext = nextPage ? `/docs/layers/${track}/${nextPage}` : '/docs/layers';
  }

  return {
    reader_summary: summary,
    audience: useStringArray(source.audience, ['CIO/CTO', 'Enterprise architect']),
    decision_or_output: useString(source.decision_or_output, defaultDecision),
    prerequisites: useStringArray(source.prerequisites, defaultPrerequisites),
    reading_time: useString(source.reading_time, `${Math.max(2, Math.ceil(words / 220))} minutes`),
    evidence_status: useString(source.evidence_status, 'Evidence and author positions are labelled inline where the source material supports that distinction.'),
    next: useString(source.next, JOURNEY_NEXT[slug] || defaultNext),
  };
}

function yamlValue(value) {
  return JSON.stringify(value);
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

function normalizeSourceHeading(value) {
  return value
    .replace(/\s+#+\s*$/, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function sourceHeadings(body) {
  return [...body.matchAll(/^(#{2,4})\s+(.+)$/gm)].map((match) => ({
    offset: match.index,
    level: match[1].length,
    title: normalizeSourceHeading(match[2]),
  }));
}

function figureOffset(figure, pageRoute, headings) {
  const declaredHeading = normalizeSourceHeading(figure.sourceHeading);
  const matches = headings.filter((heading) => heading.title === declaredHeading);
  if (matches.length !== 1) {
    const available = headings.map((heading) => heading.title).join(' | ') || '(no headings)';
    throw new Error(
      `Figure ${figure.id} on ${pageRoute} declares source heading "${figure.sourceHeading}"; ` +
      `expected exactly one match, found ${matches.length}. Available headings: ${available}`,
    );
  }
  return matches[0].offset;
}

function visualFirstBody(body, pageRoute) {
  const figures = figuresByPage.get(pageRoute) ?? [];
  if (!figures.length) {
    return `<details open data-evidence-depth>\n<summary>Explanation, implementation detail, and evidence</summary>\n\n${body.trim()}\n\n</details>\n`;
  }

  const headings = sourceHeadings(body);
  const grouped = new Map();
  figures.forEach((figure) => {
    const offset = figureOffset(figure, pageRoute, headings);
    const group = grouped.get(offset) ?? [];
    group.push(figure);
    grouped.set(offset, group);
  });

  const offsets = [...grouped.keys()].sort((a, b) => a - b);
  const prefix = body.slice(0, offsets[0]).trim();
  const sections = offsets.map((offset, index) => {
    const nextOffset = offsets[index + 1] ?? body.length;
    const figuresAtOffset = grouped.get(offset);
    const evidence = body.slice(offset, nextOffset).trim();
    const figureMarkup = figuresAtOffset
      .map((figure) => `<GuideFigure id="${figure.id}"${figure.type === 'matrix' || figure.type === 'architecture' ? ' fullWidth' : ''} />`)
      .join('\n\n');
    const placement = figuresAtOffset.map((figure) => figure.placement).join(' and ');
    return `<section data-visual-concept="${figuresAtOffset.map((figure) => figure.id).join(' ')}">\n\n${figureMarkup}\n\n<details open data-evidence-depth>\n<summary>Explanation and evidence: ${placement}</summary>\n\n${evidence}\n\n</details>\n\n</section>`;
  });
  return [prefix, ...sections].filter(Boolean).join('\n\n');
}

function visualFirstDocument(document, pageRoute) {
  const frontmatter = document.match(/^---\n[\s\S]*?\n---\n/)?.[0] ?? '';
  const body = frontmatter ? document.slice(frontmatter.length) : document;
  return `${frontmatter}\n${visualFirstBody(body, pageRoute)}`;
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
// This prevents a Markdown typo from publishing an arbitrary repository file,
// keeps authored SVGs separate from manifest exports, and permits safe cleanup.
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

let written = 0;
for (const [rel, slug] of map) {
  const raw = await readFile(path.join(repoDir, rel), 'utf8');
  const source = parseSourceFrontmatter(raw);
  const derived = titleAndDescription(source.body, path.basename(rel, '.md'));
  const title = cleanTitle(derived.title, slug, rel);
  const { descriptionLine } = derived;
  const metadata = metadataFor(rel, slug, title, derived.description, source.attributes, source.body);
  const description = metadata.reader_summary;

  let body = source.body.replace(/^#\s+.*\n/, ''); // title moves into frontmatter
  if (descriptionLine) body = body.replace(descriptionLine + '\n', ''); // and so does the standfirst
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
    : `\n\n---\n\nSource: \`${rel}\` in the private evidence repository. This page is the public evidence view while the publication hold is active.\n`;
  const readerBody = visualFirstBody(body + footer, routeFor(slug));

  const frontmatter = `---
title: ${yamlValue(title)}
description: ${yamlValue(description)}
reader_summary: ${yamlValue(metadata.reader_summary)}
audience: ${yamlValue(metadata.audience)}
decision_or_output: ${yamlValue(metadata.decision_or_output)}
prerequisites: ${yamlValue(metadata.prerequisites)}
reading_time: ${yamlValue(metadata.reading_time)}
evidence_status: ${yamlValue(metadata.evidence_status)}
next: ${yamlValue(metadata.next)}
---

`;
  // Visual-first pages contain MDX components. Writing them as plain Markdown
  // causes the compiler to discard GuideFigure and evidence wrappers.
  const outPath = path.join(outDir, `${slug}.mdx`);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, frontmatter + readerBody);
  written++;
}

// The reader journey is deliberately not derived from contributor-facing README
// files. It teaches the decision sequence while the source corpus remains the
// evidence layer underneath it.
const INDEX_DOC = `---
title: "Start"
description: "See the whole agentic-enterprise decision journey, then choose the CIO/CTO or enterprise-architect path through the evidence."
reader_summary: "See the whole agentic-enterprise decision journey, then choose the CIO/CTO or enterprise-architect path through the evidence."
audience: ["CIO/CTO", "Enterprise architect"]
decision_or_output: "Choose your role path and identify the next enterprise decision to make."
prerequisites: []
reading_time: "5 minutes"
evidence_status: "Orientation page; evidence status is carried by each linked chapter."
next: "/docs/architecture/vision-and-target-state"
---

**In one sentence:** begin with the business target and enterprise constraints, prove readiness and fundable use cases, compose the roadmap, then design and apply the architecture before evaluating vendors.

## Choose your role path

<Cards>
  <Card title="CIO / CTO path" href="/docs/architecture/vision-and-target-state" description="Align on the target state, choose the archetype, assess readiness, fund a portfolio, and approve a stage-gated roadmap." />
  <Card title="Enterprise architect path" href="/docs/architecture/vision-and-target-state" description="Begin with the shared target and archetype, then follow readiness and roadmap prerequisites before mapping seven planes across fourteen layers." />
</Cards>

The two paths meet at the roadmap and target architecture. The executive path should produce investment and sequencing decisions; the architect path should produce interfaces, control ownership, and evidence requirements.

## The recommended journey

<Cards>
  <Card title="1. Understand the target" href="/docs/architecture/vision-and-target-state" description="Agree what agents execute, what remains human, and which decisions stay deterministic." />
  <Card title="2. Choose the archetype" href="/docs/architecture/archetype-grid" description="Match architecture defaults to enterprise scale, data gravity, vendor gravity, and operating capacity." />
  <Card title="3. Assess readiness" href="/docs/frameworks/readiness-assessments" description="Produce a six-value profile for one target workload; do not hide weak dimensions in a total." />
  <Card title="4. Fund the use cases" href="/docs/frameworks/use-case-portfolio" description="Apply three admission gates before comparing value, cost, reversibility, and shared supervision capacity." />
  <Card title="5. Compose the roadmap" href="/docs/frameworks/roadmap-checklist" description="Turn nine enterprise factors into six evidence-gated stages without inventing a calendar." />
  <Card title="6. Design the architecture" href="/docs/architecture/master-target-state" description="Map the seven agent-system planes across the fourteen enduring enterprise layers." />
  <Card title="7. Apply a blueprint" href="/docs/blueprints" description="Adapt a department or industry workflow, including controls, economics, metrics, and honest limits." />
  <Card title="8. Evaluate vendors last" href="/docs/frameworks/vendor-question-bank" description="Write evidence requests and disqualifiers before reading profiles or assigning scores." />
</Cards>

## Your five-minute checkpoint

Before continuing, you should be able to say four things plainly:

1. **Target state:** governed agents execute routine knowledge work; people retain intent, judgment, exception handling, and accountability.
2. **Architecture:** fourteen layers describe the enterprise estate; seven planes describe the agent system built across it.
3. **Fit:** your archetype changes the implementation default, while the workload-specific readiness profile caps safe autonomy.
4. **Next step:** assess and select workloads before buying a platform.

## How to read the evidence layer

Claims, vendor-reported figures, author positions, and unresolved problems are labelled. Volatile facts carry dates and sit on the [re-verification list](/docs/re-verification). The multi-view embedding concept is named, but its mechanism-level guide remains under publication hold and is not presented as available implementation guidance.
`;

const GROUP_DOCS = {
  decide: `---
title: "Decide"
description: "Turn enterprise intent into readiness, portfolio, roadmap, autonomy, and vendor decisions, in that order."
reader_summary: "Turn enterprise intent into readiness, portfolio, roadmap, autonomy, and vendor decisions, in that order."
audience: ["CIO/CTO", "Enterprise architect", "Transformation lead"]
decision_or_output: "Produce the investment and sequencing decisions that the target architecture must support."
prerequisites: ["/docs/architecture/vision-and-target-state"]
reading_time: "4 minutes"
evidence_status: "Orientation page; evidence status is carried by each linked framework."
next: "/docs/architecture/archetype-grid"
---

import { GuideFigure } from '@/components/visuals';

<GuideFigure id="framework-decision-sequence" />

**Takeaway:** platform selection is downstream of enterprise fit, workload readiness, and fundable outcomes.

<Cards>
  <Card title="Understand the target" href="/docs/architecture/vision-and-target-state" description="Agree what agents execute, what remains human, and which decisions stay deterministic." />
  <Card title="Choose the enterprise archetype" href="/docs/architecture/archetype-grid" description="Set implementation defaults from scale, gravity, and operating capacity." />
  <Card title="Assess workload readiness" href="/docs/frameworks/readiness-assessments" description="Answer the complete 24-question instrument and retain the six-value profile." />
  <Card title="Build the use-case portfolio" href="/docs/frameworks/use-case-portfolio" description="Gate for evaluability, deterministic safety, and grounding before scoring." />
  <Card title="Compose the roadmap" href="/docs/frameworks/roadmap-checklist" description="Combine the fixed six-stage spine with nine enterprise modifiers." />
  <Card title="Set the A x L ceiling" href="/docs/architecture/maturity-model" description="Advance autonomy per workload only when learning and oversight evidence permit it." />
</Cards>
`,
  design: `---
title: "Design"
description: "Map seven agent-system planes across fourteen enterprise layers, then place controls, evidence, memory, economics, and learning."
reader_summary: "Map seven agent-system planes across fourteen enterprise layers, then place controls, evidence, memory, economics, and learning."
audience: ["Enterprise architect", "CIO/CTO", "Platform and security lead"]
decision_or_output: "Produce a target architecture with plane ownership, deterministic boundaries, and migration priorities."
prerequisites: ["/docs/frameworks/roadmap-checklist"]
reading_time: "5 minutes"
evidence_status: "Orientation page; each linked synthesis and layer page carries its own evidence status."
next: "/docs/architecture/master-target-state"
---

import { GuideFigure } from '@/components/visuals';

<GuideFigure id="layers-planes-crosswalk" />

**Takeaway:** the fourteen layers are the estate you already own; the seven planes are the agent system you build across it. They are not competing taxonomies or deployment stages.

<Cards>
  <Card title="Master target architecture" href="/docs/architecture/master-target-state" description="Choose the architecture posture and map the seven planes." />
  <Card title="Fourteen enterprise layers" href="/docs/layers" description="Inspect the enduring estate layer by layer." />
  <Card title="Cross-cutting concerns" href="/docs/architecture/concerns-by-layers-matrix" description="Assign where each concern is created, enforced, observed, and still open." />
  <Card title="Memory and data pipeline" href="/docs/architecture/memory-pipeline-architecture" description="Govern context and durable memory from M1 through M5." />
  <Card title="Economics" href="/docs/architecture/economics-model" description="Model cost per resolved outcome, not tokens alone." />
  <Card title="Sovereignty" href="/docs/architecture/sovereignty-matrix" description="Route workloads and derived artifacts from SV0 through SV4." />
  <Card title="Identity and security" href="/docs/architecture/identity-security-model" description="Move from ID1 to the ID2 production floor and place deterministic gates." />
  <Card title="Learning loops" href="/docs/architecture/learning-loops-map" description="Separate online memory from governed promotion and rollback." />
</Cards>
`,
  apply: `---
title: "Apply"
description: "Adapt the architecture to a department or industry workflow without losing its deterministic controls or honest limits."
reader_summary: "Adapt the architecture to a department or industry workflow without losing its deterministic controls or honest limits."
audience: ["CIO/CTO", "Enterprise architect", "Business and domain lead"]
decision_or_output: "Choose one blueprint and translate it into an owned workflow, control map, metric set, and stop criteria."
prerequisites: ["/docs/architecture/master-target-state"]
reading_time: "4 minutes"
evidence_status: "Orientation page; every blueprint labels its evidence and honest limits."
next: "/docs/blueprints"
---

import { GuideFigure } from '@/components/visuals';

<GuideFigure id="blueprint-anatomy" />

**Takeaway:** a blueprint is a worked architecture pattern, not a promise of automation rate, headcount reduction, or delivery time.

<Cards>
  <Card title="Blueprint method" href="/docs/blueprints" description="Learn the common scenario, agents, controls, economics, metrics, and honest-limits pattern." />
  <Card title="Department blueprints" href="/docs/blueprints/departments/it-and-service-desk" description="IT, service, finance, HR, sales, marketing, and supply chain." />
  <Card title="Industry blueprints" href="/docs/blueprints/verticals/utilities-and-energy" description="Utilities, banking, manufacturing, and public sector." />
</Cards>
`,
  reference: `---
title: "Reference"
description: "Evaluate vendors only after the architecture is applied, then use deep evidence, techniques, and canonical vocabulary as needed."
reader_summary: "Evaluate vendors only after the architecture is applied, then use deep evidence, techniques, and canonical vocabulary as needed."
audience: ["Enterprise architect", "Platform and domain specialists", "Procurement and risk lead"]
decision_or_output: "Find the detailed evidence or definition needed to support a decision already in progress."
prerequisites: ["/docs"]
reading_time: "3 minutes"
evidence_status: "Reference index; evidence status is carried by each linked page."
next: "/docs/frameworks/vendor-question-bank"
---

import { GuideFigure } from '@/components/visuals';

<GuideFigure id="vendor-disqualifier-score-flow" />

**Takeaway:** write neutral evidence questions, run disqualifiers, score only qualified options, and read vendor profiles with that decision frame already fixed.

<Cards>
  <Card title="Vendor question bank" href="/docs/frameworks/vendor-question-bank" description="Define current, workload-specific evidence requests before reviewing products." />
  <Card title="Vendor scorecard" href="/docs/frameworks/vendor-scorecard" description="Run disqualifiers before weights and keep evidence quality visible." />
  <Card title="Vendor landscape" href="/docs/vendors" description="Use coverage, adoption pathways, and profiles after the neutral evaluation frame." />
  <Card title="Layer evidence" href="/docs/layers" description="Briefs, findings, vendor maps, and dated sources across fourteen layers." />
  <Card title="Production techniques" href="/docs/techniques" description="Published patterns with mechanism, economics, limits, and evidence status." />
  <Card title="Glossary" href="/docs/glossary" description="Canonical definitions, including distinct A, L, ID, M, SV, and Stage namespaces." />
</Cards>
`,
  'about-evidence': `---
title: "About / Evidence"
description: "See how the guide changes, what remains volatile, and how architectural decisions are recorded and challenged."
reader_summary: "See how the guide changes, what remains volatile, and how architectural decisions are recorded and challenged."
audience: ["All guide readers", "Contributors"]
decision_or_output: "Verify provenance, freshness, and decision history before relying on a time-sensitive claim."
prerequisites: []
reading_time: "3 minutes"
evidence_status: "Repository governance and provenance."
next: "/docs/decisions"
---

## Evidence and governance

<Cards>
  <Card title="Architecture decisions" href="/docs/decisions" description="See what changed after research and why alternatives were rejected." />
  <Card title="Re-verification register" href="/docs/re-verification" description="Check volatile market, legal, price, and standards claims." />
  <Card title="Changelog" href="/docs/changelog" description="Review material changes to the published guide." />
  <Card title="Contribute" href="/docs/contributing" description="Improve the guide while preserving evidence quality and publication boundaries." />
</Cards>
`,
};

await writeFile(path.join(outDir, 'index.mdx'), visualFirstDocument(INDEX_DOC, '/docs'));
written++;
for (const [slug, document] of Object.entries(GROUP_DOCS)) {
  const groupDir = path.join(outDir, slug);
  await mkdir(groupDir, { recursive: true });
  await writeFile(path.join(groupDir, 'index.mdx'), document);
  written++;
}

// Ordering and section titles.
const metas = {
  '.': {
    title: 'Guide',
    pages: ['index', 'decide', 'design', 'apply', 'reference', 'about-evidence'],
  },
  decide: {
    title: 'Decide',
    description: 'Fit, readiness, portfolio, roadmap, autonomy, then vendors.',
    pages: [
      'index',
      '[Understand the target](/docs/architecture/vision-and-target-state)',
      '[Choose the archetype](/docs/architecture/archetype-grid)',
      '[Assess readiness](/docs/frameworks/readiness-assessments)',
      '[Fund the portfolio](/docs/frameworks/use-case-portfolio)',
      '[Compose the roadmap](/docs/frameworks/roadmap-checklist)',
      '[Set the A x L ceiling](/docs/architecture/maturity-model)',
    ],
  },
  design: {
    title: 'Design',
    description: 'Seven agent-system planes across fourteen enterprise layers.',
    pages: [
      'index',
      '[Master target architecture](/docs/architecture/master-target-state)',
      '[The 14 enterprise layers](/docs/layers)',
      '[Cross-cutting concerns](/docs/architecture/concerns-by-layers-matrix)',
      '[Memory and data pipeline](/docs/architecture/memory-pipeline-architecture)',
      '[Economics](/docs/architecture/economics-model)',
      '[Sovereignty](/docs/architecture/sovereignty-matrix)',
      '[Identity and security](/docs/architecture/identity-security-model)',
      '[Learning loops](/docs/architecture/learning-loops-map)',
      '[All architecture synthesis](/docs/architecture)',
    ],
  },
  apply: {
    title: 'Apply',
    description: 'Department and industry blueprints with controls and honest limits.',
    pages: [
      'index',
      '[How to use the blueprints](/docs/blueprints)',
      '[IT and service desk](/docs/blueprints/departments/it-and-service-desk)',
      '[Customer service](/docs/blueprints/departments/customer-service)',
      '[Finance](/docs/blueprints/departments/finance)',
      '[HR](/docs/blueprints/departments/hr)',
      '[Sales](/docs/blueprints/departments/sales)',
      '[Marketing](/docs/blueprints/departments/marketing)',
      '[Supply chain](/docs/blueprints/departments/supply-chain)',
      '[Utilities and energy](/docs/blueprints/verticals/utilities-and-energy)',
      '[Banking and financial services](/docs/blueprints/verticals/banking-and-financial-services)',
      '[Manufacturing and supply chain](/docs/blueprints/verticals/manufacturing-and-supply-chain)',
      '[Public sector](/docs/blueprints/verticals/public-sector)',
    ],
  },
  reference: {
    title: 'Reference',
    description: 'Deep evidence, techniques, vendor research, and canonical vocabulary.',
    pages: [
      'index',
      '[Write vendor questions](/docs/frameworks/vendor-question-bank)',
      '[Score qualified vendors](/docs/frameworks/vendor-scorecard)',
      '[Vendor landscape](/docs/vendors)',
      '[Layer evidence](/docs/layers)',
      '[Production techniques](/docs/techniques)',
      '[Glossary](/docs/glossary)',
    ],
  },
  'about-evidence': {
    title: 'About / Evidence',
    description: 'Decision history, freshness, changes, and contribution rules.',
    pages: [
      'index',
      '[Architecture decisions](/docs/decisions)',
      '[Re-verification register](/docs/re-verification)',
      '[Changelog](/docs/changelog)',
      '[Contribute](/docs/contributing)',
    ],
  },
  architecture: {
    title: 'Architecture synthesis',
    description: 'The cross-layer evidence and target-state chapters.',
    pages: ['index', 'vision-and-target-state', 'archetype-grid', 'maturity-model', 'master-target-state', 'concerns-by-layers-matrix', 'memory-pipeline-architecture', 'economics-model', 'sovereignty-matrix', 'identity-security-model', 'learning-loops-map'],
  },
  layers: {
    title: 'Layer guides',
    description: 'Fourteen research tracks, one per layer of the enterprise landscape.',
    pages: ['index', 'r01-infrastructure', 'r02-data-platform', 'r03-integration-fabric', 'r04-systems-of-record', 'r05-lob-and-ot', 'r06-intelligence-and-learning', 'r07-agent-platform', 'r08-productivity-and-collaboration', 'r09-experience-and-channels', 'r10-security-and-identity', 'r11-governance-risk-sovereignty', 'r12-observability-and-finops', 'r13-operating-model', 'r14-agent-data-engineering'],
  },
  techniques: { title: 'Techniques', pages: ['index', '...'] },
  frameworks: {
    title: 'Decision frameworks',
    description: 'Assess, prioritise, and sequence. Evaluate vendors last.',
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
    pages: ['index', 'brief', 'findings', 'vendors', 'sources'],
  };
}

for (const [dir, meta] of Object.entries(metas)) {
  const target = path.join(outDir, dir === '.' ? '' : dir);
  if (!existsSync(target)) continue;
  await writeFile(path.join(target, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');
}

console.log(`sync-content: ${written} pages written to content/docs`);
