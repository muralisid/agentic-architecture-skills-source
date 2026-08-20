// Reader-experience and publication-boundary checks that run after content sync.
// Figure-specific metadata checks live in validate-figures.mjs.

import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadFigureManifestModule } from './figure-manifest-loader.mjs';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const repoDir = path.dirname(siteDir);
const docsDir = path.join(siteDir, 'content', 'docs');
const publicDir = path.join(siteDir, 'public');
const errors = [];
const requiredReaderMetadata = [
  'title',
  'reader_summary',
  'audience',
  'decision_or_output',
  'prerequisites',
  'reading_time',
  'evidence_status',
  'next',
];
const requiredSourceMetadata = requiredReaderMetadata.filter((field) => field !== 'title');

async function walk(dir, predicate = () => true) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') return found;
    throw error;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...await walk(full, predicate));
    else if (predicate(full)) found.push(full);
  }
  return found;
}

function relative(file) {
  return path.relative(repoDir, file).split(path.sep).join('/');
}

function fail(file, message) {
  errors.push(`${relative(file)}: ${message}`);
}

const docs = await walk(docsDir, (file) => /\.mdx?$/.test(file));
const routeForDoc = (file) => {
  const relativePath = path.relative(docsDir, file).split(path.sep).join('/').replace(/\.mdx?$/, '');
  if (relativePath === 'index') return '/docs';
  return `/docs/${relativePath.replace(/\/index$/, '')}`;
};
const knownRoutes = new Set([
  ...docs.map(routeForDoc),
  '/tools',
  '/tools/readiness',
  '/tools/portfolio',
  '/tools/roadmap',
]);
const docTextByRoute = new Map();
const generatedSourcePaths = new Map();

function readJsonField(frontmatter, field, file) {
  const raw = frontmatter.match(new RegExp(`^${field}:\\s*(.+)$`, 'm'))?.[1];
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    fail(file, `reader metadata ${field} must be valid JSON-compatible YAML`);
    return undefined;
  }
}

function validateRoute(file, field, route, currentRoute) {
  if (typeof route !== 'string' || !route.startsWith('/')) return;
  const clean = route.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
  if (!knownRoutes.has(clean)) fail(file, `${field} points to a missing route: ${route}`);
  if (field === 'next' && clean === currentRoute) fail(file, `next points back to the current page: ${route}`);
}

for (const file of docs) {
  const text = await readFile(file, 'utf8');
  docTextByRoute.set(routeForDoc(file), { file, text });
  const frontmatter = text.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? '';
  if (!frontmatter) {
    fail(file, 'missing generated reader frontmatter');
  } else {
    for (const field of requiredReaderMetadata) {
      if (!new RegExp(`^${field}:\\s*\\S`, 'm').test(frontmatter)) {
        fail(file, `missing reader metadata: ${field}`);
      }
    }
    const currentRoute = routeForDoc(file);
    const next = readJsonField(frontmatter, 'next', file);
    validateRoute(file, 'next', next, currentRoute);
    const prerequisites = readJsonField(frontmatter, 'prerequisites', file);
    if (Array.isArray(prerequisites)) {
      for (const route of prerequisites) validateRoute(file, 'prerequisites', route, currentRoute);
    } else if (prerequisites !== undefined) {
      fail(file, 'reader metadata prerequisites must be an array');
    }
  }

  const sourceMatch = [...text.matchAll(/Source:\s*(?:\[`([^`]+)`\]\([^)]+\)|`([^`]+)`)/g)].at(-1);
  const sourceRel = sourceMatch?.[1] ?? sourceMatch?.[2];
  if (sourceRel) {
    generatedSourcePaths.set(file, sourceRel);
    const sourceFile = path.join(repoDir, sourceRel);
    const sourceText = await readFile(sourceFile, 'utf8');
    const sourceFrontmatter = sourceText.match(/^---\n([\s\S]*?)\n---\n/)?.[1] ?? '';
    if (!sourceFrontmatter) {
      fail(sourceFile, 'published source is missing explicit reader frontmatter');
    } else {
      for (const field of requiredSourceMetadata) {
        if (!new RegExp(`^${field}:\\s*\\S`, 'm').test(sourceFrontmatter)) {
          fail(sourceFile, `published source is missing explicit reader metadata: ${field}`);
        }
      }
    }
  }
  const images = [...text.matchAll(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)];
  for (const image of images) {
    const [, alt, href] = image;
    if (!alt.trim()) fail(file, `image ${href} has empty alt text`);
    if (/^(https?:|data:)/.test(href)) continue;
    const clean = href.split('#')[0].split('?')[0];
    const target = clean.startsWith('/')
      ? path.join(publicDir, clean.replace(/^\//, ''))
      : path.resolve(path.dirname(file), clean);
    try {
      await access(target);
    } catch {
      fail(file, `image asset does not exist: ${href}`);
    }
  }
}

const holdRegisterPath = path.join(repoDir, 'PUBLICATION-HOLD.md');
const holdRegister = await readFile(holdRegisterPath, 'utf8');
const heldMatch = holdRegister.match(/^## Held\s*\n([\s\S]*?)(?=^##\s)/m);
if (!heldMatch || !/^\|\s*Path\s*\|\s*Reason\s*\|\s*Released when\s*\|\s*$/m.test(heldMatch[1])) {
  fail(holdRegisterPath, 'publication hold register has no valid Held table');
} else {
  const heldPaths = new Set([...heldMatch[1].matchAll(/^\|\s*`([^`]+)`\s*\|/gm)].map((match) => match[1].trim()));
  for (const [file, sourceRel] of generatedSourcePaths) {
    if (heldPaths.has(sourceRel)) fail(file, `publication-held source was emitted into the public guide: ${sourceRel}`);
  }
}

const { figureManifest } = await loadFigureManifestModule();

function normalizeSourceHeading(value) {
  return value
    .replace(/\s+#+\s*$/, '')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

for (const figure of figureManifest) {
  const page = docTextByRoute.get(figure.page);
  if (!page) {
    errors.push(`figure ${figure.id}: canonical page does not exist: ${figure.page}`);
    continue;
  }
  const matches = [...page.text.matchAll(new RegExp(`<GuideFigure\\s+id=["']${figure.id}["']`, 'g'))];
  if (matches.length !== 1) {
    fail(page.file, `figure ${figure.id} must be placed exactly once on its canonical page; found ${matches.length}`);
    continue;
  }

  const conceptSections = [...page.text.matchAll(/<section\s+data-visual-concept=["']([^"']+)["'][^>]*>([\s\S]*?)<\/section>/g)];
  const matchingSections = conceptSections.filter((section) => section[1].split(/\s+/).includes(figure.id));
  if (matchingSections.length !== 1) {
    fail(page.file, `figure ${figure.id} must belong to exactly one visual concept section; found ${matchingSections.length}`);
    continue;
  }

  const sectionBody = matchingSections[0][2];
  const figureOffset = sectionBody.search(new RegExp(`<GuideFigure\\s+id=["']${figure.id}["']`));
  const detailsOffset = sectionBody.search(/<details\b[^>]*data-evidence-depth/);
  if (figureOffset === -1 || detailsOffset === -1 || figureOffset > detailsOffset) {
    fail(page.file, `figure ${figure.id} must precede its evidence segment`);
    continue;
  }

  const evidence = sectionBody.match(/<details\b[^>]*data-evidence-depth[^>]*>\s*<summary>[\s\S]*?<\/summary>\s*([\s\S]*?)\s*<\/details>/)?.[1];
  if (!evidence) {
    fail(page.file, `figure ${figure.id} is missing its following evidence segment`);
    continue;
  }

  const firstHeading = evidence.trimStart().match(/^(#{2,4})\s+(.+?)(?:\n|$)/)?.[2];
  if (!firstHeading) {
    fail(page.file, `figure ${figure.id} evidence must begin at declared heading "${figure.sourceHeading}"`);
    continue;
  }

  const actualHeading = normalizeSourceHeading(firstHeading);
  const declaredHeading = normalizeSourceHeading(figure.sourceHeading);
  if (actualHeading !== declaredHeading) {
    fail(page.file, `figure ${figure.id} evidence begins at "${actualHeading}" instead of declared heading "${declaredHeading}"`);
  }
}

for (const file of docs) {
  const text = await readFile(file, 'utf8');
  const unresolvedPatterns = [
    /verify[^\n]{0,120}before publication/gi,
    /before publication[^\n]{0,120}verify/gi,
    /(?:exact )?date to verify/gi,
  ];
  for (const pattern of unresolvedPatterns) {
    const matches = [...text.matchAll(pattern)];
    if (matches.length) fail(file, `unresolved pre-publication marker remains: ${matches.map((match) => match[0]).join(' | ')}`);
  }
  const legacyIdentity = [...text.matchAll(/\b(?:Identity|identity)\s+(?:Level|level)\s*[123]\b|\bLevel [123](?: identity| is (?:mandatory|the floor))\b|\b(?:access|presence)-identity level\b/g)];
  if (legacyIdentity.length) {
    fail(file, `legacy numeric identity namespace remains: ${legacyIdentity.map((match) => match[0]).join(' | ')}`);
  }
}

for (const file of await walk(publicDir, (candidate) => candidate.endsWith('.svg'))) {
  const svg = await readFile(file, 'utf8');
  const openingTag = svg.match(/<svg\b[^>]*>/i)?.[0] ?? '';
  const value = openingTag.match(/\bviewBox\s*=\s*["']([^"']+)["']/i)?.[1];
  if (!value) {
    fail(file, 'SVG is missing a viewBox');
    continue;
  }
  const parts = value.trim().split(/[\s,]+/).map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isFinite(part)) || parts[2] <= 0 || parts[3] <= 0) {
    fail(file, `SVG has an invalid viewBox: ${value}`);
  }
}

const conceptChecks = [
  {
    file: 'synthesis/identity-security-model.md',
    pattern: /\bL[1-3]\s+(?:Credential|Access|Presence)|identity \(L[1-3]\b/g,
    message: 'legacy L namespace remains in the identity taxonomy; use ID1–ID3',
  },
  {
    file: 'synthesis/memory-pipeline-architecture.md',
    pattern: /\bL[1-5]\s+(?:Thread|Retrieved|Session|Entity|Cross-domain)|\b(?:into|between|at) L[1-5]\b/g,
    message: 'legacy L namespace remains in the memory taxonomy; use M1–M5',
  },
  {
    file: 'frameworks/roadmap-checklist.md',
    pattern: /\bS[0-5]\b/g,
    message: 'legacy S namespace remains in the roadmap; use Stage 0–5 and SV0–SV4',
  },
  {
    file: 'synthesis/sovereignty-matrix.md',
    pattern: /\bS[0-4]\b/g,
    message: 'legacy S namespace remains in the sovereignty taxonomy; use SV0–SV4',
  },
  {
    file: 'synthesis/vision-and-target-state.md',
    pattern: /\bThe test(?: of a genuinely agentic enterprise)?\b|different customer-facing stack|different stack/g,
    message: 'universal test or duplicated-stack language remains in the vision',
  },
];

for (const check of conceptChecks) {
  const file = path.join(repoDir, check.file);
  const text = await readFile(file, 'utf8');
  const matches = [...text.matchAll(check.pattern)];
  if (matches.length) fail(file, `${check.message} (${matches.map((match) => match[0]).join(', ')})`);
}

if (errors.length) {
  console.error(`validate-guide: ${errors.length} error${errors.length === 1 ? '' : 's'}\n`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`validate-guide: ${docs.length} generated pages and publication boundaries passed`);
