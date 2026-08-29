import { access, readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { loadFigureManifestModule, siteDirectory } from './figure-manifest-loader.mjs';

const errors = [];
const warnings = [];
const fail = (message) => errors.push(message);

const { figureManifest, figureManifestStats } = await loadFigureManifestModule();
const expectedCounts = { foundation: 24, layer: 56, support: 14 };

if (figureManifest.length < 80 || figureManifest.length > 140) {
  fail(`Manifest must contain 80-140 entries; found ${figureManifest.length}.`);
}
for (const [category, expected] of Object.entries(expectedCounts)) {
  const actual = figureManifest.filter((figure) => figure.category === category).length;
  if (actual !== expected) fail(`Expected ${expected} ${category} figures; found ${actual}.`);
  if (figureManifestStats?.[category] !== expected) fail(`Published stats for ${category} do not match ${expected}.`);
}

const ids = new Set();
const pageAnchors = new Set();
const requiredStrings = ['id', 'category', 'page', 'placement', 'anchor', 'title', 'takeaway', 'caption', 'alt', 'type', 'evidenceStatus', 'reviewedAt'];

for (const [index, figure] of figureManifest.entries()) {
  const label = figure.id || `entry ${index + 1}`;
  for (const field of requiredStrings) {
    if (typeof figure[field] !== 'string' || !figure[field].trim()) fail(`${label}: missing non-empty ${field}.`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(figure.id)) fail(`${label}: id must be lower-case kebab case.`);
  if (ids.has(figure.id)) fail(`${label}: duplicate id.`);
  ids.add(figure.id);
  const pageAnchor = `${figure.page}#${figure.anchor}`;
  if (pageAnchors.has(pageAnchor)) fail(`${label}: duplicate figure anchor on ${figure.page}: ${figure.anchor}.`);
  pageAnchors.add(pageAnchor);
  if (figure.anchor === 'page-intro') fail(`${label}: anchor must identify the concept placement, not the generic page intro.`);
  if (!/^\/(docs|library|architecture|agentic-os|ladder|patterns|layers|decisions|skills)(\/|$)/.test(figure.page)) fail(`${label}: page must be a site route; found ${figure.page}.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(figure.reviewedAt) || Number.isNaN(Date.parse(figure.reviewedAt))) fail(`${label}: invalid reviewedAt date.`);
  if (figure.title.trim().toLowerCase() === figure.alt.trim().toLowerCase()) fail(`${label}: alt text merely repeats the title.`);
  if (figure.alt.length < 60) fail(`${label}: alt text must explain the visual in at least 60 characters.`);
  if (!figure.longDescription || figure.longDescription.length < 160) fail(`${label}: complex figure needs a substantive long description (160+ characters).`);
  if (figure.longDescription === figure.alt || figure.longDescription?.includes('intended as an orientation aid')) fail(`${label}: long description uses boilerplate instead of semantic detail.`);

  const semanticLabels = [
    ...(figure.data.stages ?? []).map((item) => item.label),
    ...(figure.data.columns ?? []).map((item) => item.label),
    ...(figure.data.lanes ?? []).map((item) => item.label),
    ...(figure.data.metrics ?? []).map((item) => item.label),
    ...(figure.data.nodes ?? []).map((item) => item.label),
    ...(figure.data.items ?? []).map((item) => item.label),
    ...(figure.data.cells ?? []).map((item) => item.label),
  ].filter((item) => item.length >= 3);
  if (!semanticLabels.some((item) => figure.longDescription?.toLowerCase().includes(item.toLowerCase()))) {
    fail(`${label}: long description does not mention any rendered semantic label.`);
  }

  const hasVisualData = ['stages', 'columns', 'lanes', 'metrics', 'nodes', 'items', 'cells'].some((key) => Array.isArray(figure.data[key]) && figure.data[key].length);
  if (!hasVisualData) fail(`${label}: semantic visual data is empty.`);

  if (!Array.isArray(figure.sources)) fail(`${label}: sources must be an array.`);
  if (figure.dataBearing && !figure.sources?.length) fail(`${label}: data-bearing figure has no source.`);
  for (const source of figure.sources ?? []) {
    if (!source.label?.trim() || !source.href?.trim()) fail(`${label}: every source needs label and href.`);
  }

  const nodeIds = new Set((figure.data.nodes ?? []).map((node) => node.id));
  for (const edge of figure.data.edges ?? []) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) fail(`${label}: edge ${edge.from} → ${edge.to} references a missing node.`);
  }
  const rows = new Set(figure.data.rows ?? []);
  const columns = new Set(figure.data.axisColumns ?? []);
  for (const cell of figure.data.cells ?? []) {
    if (!rows.has(cell.row) || !columns.has(cell.column)) fail(`${label}: matrix cell ${cell.label} uses an unknown row or column.`);
  }
}

function expectLabels(id, field, expected) {
  const figure = figureManifest.find((entry) => entry.id === id);
  if (!figure) {
    fail(`${id}: canonical figure is missing.`);
    return;
  }
  const values = field === 'rows' || field === 'axisColumns'
    ? figure.data[field] ?? []
    : (figure.data[field] ?? []).map((entry) => entry.label);
  if (JSON.stringify(values) !== JSON.stringify(expected)) {
    fail(`${id}: ${field} must match the canonical taxonomy. Expected ${expected.join(' | ')}; found ${values.join(' | ')}.`);
  }
}

expectLabels('autonomy-learning-matrix', 'rows', [
  'A0 Manual',
  'A1 Assisted',
  'A2 Delegated tasks',
  'A3 Supervised autonomy',
  'A4 Managed autonomy',
  'A5 Governed lights-out',
]);
expectLabels('autonomy-learning-matrix', 'axisColumns', [
  'L0 Fixed policy',
  'L1 Curated learning',
  'L2 Governed learning',
  'L3 Continuous learning',
]);
expectLabels('memory-obligation-tiers', 'stages', [
  'M1 Thread',
  'M2 Retrieved knowledge',
  'M3 Session',
  'M4 Entity memory',
  'M5 Cross-domain',
]);
expectLabels('sovereignty-spectrum-router', 'stages', [
  'SV0 Managed API',
  'SV1 Region-pinned API',
  'SV2 Managed sovereign offering',
  'SV3 Self-hosted in own tenancy',
  'SV4 Air-gapped or isolated on premises',
]);
expectLabels('identity-delegation-chain', 'stages', [
  'Sponsor',
  'Requesting user',
  'ID2 production identity',
  'Policy decision',
  'System of record',
  'Evidence record',
]);
expectLabels('readiness-six-dimension-profile', 'metrics', [
  'Data readiness',
  'Integration readiness',
  'Identity readiness',
  'Operational discipline',
  'Governance and value discipline',
  'Workforce and operating model',
]);
expectLabels('use-case-three-gate-funnel', 'stages', [
  'Gate 1 · Evaluability',
  'Gate 2 · Deterministic-zone check',
  'Gate 3 · Grounding readiness',
  'Fundable portfolio',
]);
expectLabels('roadmap-six-stages', 'stages', [
  'Stage 0 · Ground',
  'Stage 1 · First value',
  'Stage 2 · Platform',
  'Stage 3 · Scale',
  'Stage 4 · Autonomy',
  'Stage 5 · Extend',
]);
expectLabels('seven-plane-architecture', 'nodes', [
  'Execution plane',
  'Action plane',
  'Knowledge plane',
  'Control plane',
  'Improvement plane',
  'Evidence plane',
  'Human plane',
]);
expectLabels('layers-planes-crosswalk', 'axisColumns', [
  'Execution',
  'Action',
  'Knowledge',
  'Control',
  'Improvement',
  'Evidence',
  'Human',
]);

const outputDirectory = path.join(siteDirectory, 'public', 'figures');

function markerCount(svg, attribute) {
  return (svg.match(new RegExp(`${attribute}="`, 'g')) ?? []).length;
}

function expectMarkerCount(figure, svg, attribute, expected) {
  const actual = markerCount(svg, attribute);
  if (actual !== expected) fail(`${figure.id}: SVG ${attribute} count must be ${expected}; found ${actual}.`);
}

function expectSemantic(figure, svg, semantic) {
  if (!svg.includes(`data-semantic="${semantic}"`)) {
    fail(`${figure.id}: SVG must preserve the ${semantic} semantic layout.`);
  }
}

function validateExportTopology(figure, svg) {
  if (!svg.includes(`data-figure-type="${figure.type}"`)) {
    fail(`${figure.id}: SVG root must retain figure type ${figure.type}.`);
  }

  const stages = figure.data.stages ?? [];
  const columns = figure.data.columns ?? [];
  const metrics = figure.data.metrics ?? [];
  const nodes = figure.data.nodes ?? [];
  const edges = figure.data.edges ?? [];
  const lanes = figure.data.lanes ?? [];
  const items = figure.data.items ?? [];

  if (figure.type === 'architecture') {
    expectSemantic(figure, svg, 'architecture-planes');
    expectMarkerCount(figure, svg, 'data-plane', nodes.length);
    expectMarkerCount(figure, svg, 'data-edge', edges.length);
    const edgePaths = (svg.match(/<path data-edge="/g) ?? []).length;
    if (edgePaths !== edges.length) fail(`${figure.id}: every architecture edge must export as a path.`);
    return;
  }

  if (figure.type === 'matrix') {
    expectSemantic(figure, svg, 'matrix-grid');
    expectMarkerCount(figure, svg, 'data-matrix-row', figure.data.rows?.length ?? 0);
    expectMarkerCount(figure, svg, 'data-matrix-column', figure.data.axisColumns?.length ?? 0);
    expectMarkerCount(figure, svg, 'data-matrix-cell', (figure.data.rows?.length ?? 0) * (figure.data.axisColumns?.length ?? 0));
    return;
  }

  if (figure.type === 'funnel') {
    expectSemantic(figure, svg, 'funnel');
    expectMarkerCount(figure, svg, 'data-funnel-stage', stages.length);
    expectMarkerCount(figure, svg, 'data-funnel-shape', stages.length);
    expectMarkerCount(figure, svg, 'data-funnel-connector', Math.max(0, stages.length - 1));
    const widths = [...svg.matchAll(/<polygon data-funnel-shape="trapezoid" points="([^\"]+)"/g)].map((match) => {
      const points = match[1].trim().split(/\s+/).map((point) => Number(point.split(',')[0]));
      return Math.max(...points) - Math.min(...points);
    });
    if (widths.length > 1 && !(widths.at(-1) < widths[0])) fail(`${figure.id}: funnel stages must narrow toward the qualified result.`);
    return;
  }

  if (figure.type === 'journey' || figure.type === 'flow' || figure.type === 'timeline') {
    expectSemantic(figure, svg, `${figure.type}-sequence`);
    expectMarkerCount(figure, svg, `data-${figure.type}-stage`, stages.length);
    expectMarkerCount(figure, svg, 'data-sequence-connector', Math.max(0, stages.length - 1));
    return;
  }

  if (figure.type === 'loop') {
    const loopStages = stages.length || columns.length;
    expectSemantic(figure, svg, 'loop');
    expectMarkerCount(figure, svg, 'data-loop-stage', loopStages);
    expectMarkerCount(figure, svg, 'data-loop-path', 1);
    if (!/<path data-loop-path="closed"[^>]*\sd="[^"]*\bA\s/.test(svg)) fail(`${figure.id}: loop export must contain a closed curved path.`);
    return;
  }

  if (figure.type === 'swimlane') {
    expectSemantic(figure, svg, 'swimlane');
    expectMarkerCount(figure, svg, 'data-lane', lanes.length);
    expectMarkerCount(figure, svg, 'data-lane-step', lanes.reduce((total, lane) => total + lane.steps.length, 0));
    return;
  }

  if (figure.type === 'spectrum') {
    expectSemantic(figure, svg, 'spectrum');
    expectMarkerCount(figure, svg, 'data-spectrum-stage', stages.length);
    expectMarkerCount(figure, svg, 'data-spectrum-rail', 1);
    return;
  }

  if (figure.type === 'stack') {
    expectSemantic(figure, svg, 'stack');
    expectMarkerCount(figure, svg, 'data-stack-layer', stages.length);
    expectMarkerCount(figure, svg, 'data-stack-shape', stages.length);
    const widths = [...svg.matchAll(/<rect data-stack-shape="layer"[^>]*\swidth="([\d.]+)"/g)].map((match) => Number(match[1]));
    if (widths.some((width, index) => index > 0 && width <= widths[index - 1])) fail(`${figure.id}: stack layers must widen as obligation increases.`);
    return;
  }

  if (figure.type === 'comparison') {
    expectSemantic(figure, svg, 'comparison');
    expectMarkerCount(figure, svg, 'data-comparison-column', columns.length);
    expectMarkerCount(figure, svg, 'data-comparison-item', columns.reduce((total, column) => total + column.items.length, 0));
    return;
  }

  if (figure.type === 'scorecard' || (figure.type === 'profile' && metrics.length)) {
    expectSemantic(figure, svg, 'metrics');
    expectMarkerCount(figure, svg, 'data-metric', metrics.length);
    expectMarkerCount(figure, svg, 'data-metric-gauge', metrics.length);
    return;
  }

  if (figure.type === 'profile' && stages.length) {
    expectSemantic(figure, svg, 'profile-sequence');
    expectMarkerCount(figure, svg, 'data-profile-stage', stages.length);
    return;
  }

  if (figure.type === 'storyboard') {
    if (columns.length) {
      expectSemantic(figure, svg, 'storyboard');
      expectMarkerCount(figure, svg, 'data-comparison-column', columns.length);
    } else {
      expectSemantic(figure, svg, 'storyboard-sequence');
      expectMarkerCount(figure, svg, 'data-storyboard-stage', stages.length);
    }
    return;
  }

  if (figure.type === 'map') {
    if (nodes.length) {
      expectSemantic(figure, svg, 'topology-map');
      expectMarkerCount(figure, svg, 'data-map-node', nodes.length);
      expectMarkerCount(figure, svg, 'data-map-edge', edges.length);
    } else {
      expectSemantic(figure, svg, 'item-map');
      expectMarkerCount(figure, svg, 'data-item', items.length);
    }
  }
}

try {
  await access(outputDirectory);
  const exports = (await readdir(outputDirectory)).filter((file) => file.endsWith('.svg'));
  for (const figure of figureManifest) {
    const filename = `${figure.id}.svg`;
    if (!exports.includes(filename)) {
      fail(`${figure.id}: missing exported SVG ${filename}.`);
      continue;
    }
    const svg = await readFile(path.join(outputDirectory, filename), 'utf8');
    if (!/<svg\b[^>]*\bviewBox="0 0 \d+(?:\.\d+)? \d+(?:\.\d+)?"/.test(svg)) fail(`${figure.id}: SVG needs a positive numeric viewBox.`);
    if (!/<title\s+id="title">[^<]+<\/title>/.test(svg)) fail(`${figure.id}: SVG needs a non-empty title.`);
    if (!/<desc\s+id="desc">[^<]{80,}<\/desc>/.test(svg)) fail(`${figure.id}: SVG needs a meaningful description.`);
    if (!/aria-labelledby="title desc"/.test(svg)) fail(`${figure.id}: SVG must associate title and description.`);
    validateExportTopology(figure, svg);
  }
  if (exports.length !== figureManifest.length) fail(`Expected exactly ${figureManifest.length} SVG exports; found ${exports.length}.`);
  const extra = exports.filter((file) => !ids.has(file.replace(/\.svg$/, '')));
  if (extra.length) fail(`${extra.length} unregistered SVG export(s) would be published: ${extra.join(', ')}`);
} catch {
  fail('Missing public/figures directory. Run node scripts/export-figures.mjs first.');
}

for (const warning of warnings) console.warn(`Warning: ${warning}`);
if (errors.length) {
  console.error(`Figure validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${figureManifest.length} manifest entries and SVG exports (${Object.entries(expectedCounts).map(([key, value]) => `${key}: ${value}`).join(', ')}).`);
}
