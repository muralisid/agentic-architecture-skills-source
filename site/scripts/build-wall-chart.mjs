// Generates the one-page wall chart: public/diagrams/target-state.svg.
//
// This script is the source of the published chart. Regenerate it with
// `npm run diagrams:legacy` inside site/ (or `node site/scripts/build-wall-chart.mjs`
// from the repo root) and commit the SVG. It is deliberately not part of the
// build: the committed SVG is what the site serves and offers for download.
//
// An earlier hand-designed version of the chart had its text outlined into
// glyph paths, so its words could not be edited. That version is retired.
// This one keeps every label as real <text>, so the chart stays editable and
// searchable.
//
// What the chart carries: the fourteen layers you own, each with its control
// point, key mechanisms and representative products; the seven capabilities an
// agent platform adds, as a rail that groups the layers; the ten cross-cutting
// concerns as a matrix across every layer; and the four deterministic zones
// underneath.
//
// Output goes to public/diagrams/, not public/figures/, which is the manifest
// export directory the figure validator owns.

import { wallChartAsOf } from '../lib/site.config.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outPath = path.join(siteDir, 'public', 'diagrams', 'target-state.svg');

// Minimal 24x24 monoline icons (stroke-based), keyed by name.
const ICONS = {
  cpu: ['<rect x="5" y="5" width="14" height="14" rx="2"/>', '<rect x="9.5" y="9.5" width="5" height="5"/>', '<path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'],
  zap: ['<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>'],
  book: ['<path d="M12 6c-2-1.6-4.7-2-8-2v14c3.3 0 6 .4 8 2 2-1.6 4.7-2 8-2V4c-3.3 0-6 .4-8 2z"/>', '<path d="M12 6v14"/>'],
  sliders: ['<path d="M4 6h16M4 12h16M4 18h16"/>', '<circle cx="9" cy="6" r="2.2"/>', '<circle cx="15" cy="12" r="2.2"/>', '<circle cx="7" cy="18" r="2.2"/>'],
  refresh: ['<path d="M20 11a8 8 0 0 0-14.9-3M4 13a8 8 0 0 0 14.9 3"/>', '<path d="M20 4v4h-4M4 20v-4h4"/>'],
  clipboard: ['<rect x="6" y="4" width="12" height="17" rx="2"/>', '<path d="M9 4a3 3 0 0 1 6 0"/>', '<path d="m9 13 2 2 4-4"/>'],
  user: ['<circle cx="12" cy="8" r="3.6"/>', '<path d="M5 20c1.2-3.4 3.8-5 7-5s5.8 1.6 7 5"/>'],
  server: ['<rect x="3" y="4" width="18" height="7" rx="2"/>', '<rect x="3" y="13" width="18" height="7" rx="2"/>', '<path d="M7 7.5h.01M7 16.5h.01"/>'],
  database: ['<ellipse cx="12" cy="5.5" rx="8" ry="3"/>', '<path d="M4 5.5V12c0 1.7 3.6 3 8 3s8-1.3 8-3V5.5"/>', '<path d="M4 12v6.5c0 1.7 3.6 3 8 3s8-1.3 8-3V12"/>'],
  cable: ['<path d="M8 3v4M16 17v4"/>', '<rect x="5.5" y="7" width="5" height="5" rx="1"/>', '<rect x="13.5" y="12" width="5" height="5" rx="1"/>', '<path d="M8 12v2a3 3 0 0 0 3 3h2.5M16 12v-2a3 3 0 0 0-3-3h-2.5"/>'],
  archive: ['<rect x="3" y="4" width="18" height="5" rx="1"/>', '<path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"/>', '<path d="M10 13h4"/>'],
  factory: ['<path d="M3 21V9l6 4V9l6 4V4h6v17z"/>', '<path d="M8 17h.01M13 17h.01M17 17h.01"/>'],
  bulb: ['<path d="M9 18h6M10 21h4"/>', '<path d="M12 3a6 6 0 0 0-3.5 10.8c.9.7 1.5 1.3 1.5 2.2h4c0-.9.6-1.5 1.5-2.2A6 6 0 0 0 12 3z"/>'],
  bot: ['<rect x="5" y="8" width="14" height="11" rx="3"/>', '<path d="M12 8V4M9 4h6"/>', '<path d="M9 13h.01M15 13h.01"/>', '<path d="M2 12v4M22 12v4"/>'],
  users: ['<circle cx="9" cy="8" r="3.2"/>', '<path d="M3 20c1-3 3.2-4.5 6-4.5s5 1.5 6 4.5"/>', '<circle cx="16.5" cy="9" r="2.6"/>', '<path d="M16 15.6c2.3.2 4 1.5 5 4.4"/>'],
  message: ['<path d="M4 5h16v11H9l-5 4z"/>'],
  lock: ['<rect x="5" y="11" width="14" height="9" rx="2"/>', '<path d="M8 11V8a4 4 0 0 1 8 0v3"/>'],
  landmark: ['<path d="M3 9l9-5 9 5"/>', '<path d="M5 9v8M9.5 9v8M14.5 9v8M19 9v8"/>', '<path d="M3 19h18M3 21h18"/>'],
  activity: ['<path d="M3 12h4l2.5-6 4.5 12 2.5-6H21"/>'],
  eye: ['<path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12z"/>', '<circle cx="12" cy="12" r="2.8"/>'],
  funnel: ['<path d="M3 4h18l-7 8v6l-4 2v-8z"/>'],
  shield: ['<path d="M12 3 5 6v5c0 4.5 2.8 7.9 7 10 4.2-2.1 7-5.5 7-10V6z"/>', '<path d="m9 11.5 2 2 4-4"/>'],
};

function drawIcon(name, x, y, size, color, strokeWidth = 1.9) {
  const parts = ICONS[name];
  if (!parts) return '';
  const s = size / 24;
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${color}" stroke-width="${strokeWidth / s}" stroke-linecap="round" stroke-linejoin="round">${parts.join('')}</g>`;
}

// Text width estimate. Arial (the fallback most viewers get) shares Helvetica's
// advance widths, so those are used per glyph, with 0.54 em per character as a
// floor so a wider face such as Inter still fits. Weights of 600 and above are
// measured as bold, because Arial has no semibold.
const glyphTable = (spec) => {
  const t = {};
  for (const [chars, w] of spec) for (const ch of chars) t[ch] = w;
  return t;
};
const HELV = glyphTable([
  [' !,./:;I[]\\ft', 278], ['ijl', 222], ['"', 355], ["'", 191], ['()-r', 333], ['*', 389],
  ['#$0123456789?_abdeghnopqu', 556], ['+<=>', 584], ['%', 889], ['&ABEKPSVXY', 667],
  ['CDHNRUw', 722], ['FTZ', 611], ['GOQ', 778], ['J', 500], ['ckvsxyz', 500], ['L', 556],
  ['Mm', 833], ['W', 944], ['@', 1015],
]);
const HELV_BOLD = glyphTable([
  [' ,./I[]\\ijl', 278], ['!()-:;ft', 333], ['"', 474], ["'", 238], ['*r', 389],
  ['#$0123456789?_aceksvxy', 556], ['+<=>', 584], ['%m', 889], ['&ABCDHKNRU', 722],
  ['EPSVXY', 667], ['FTZL', 611], ['GOQ', 778], ['J', 556], ['M', 833], ['W', 944],
  ['bdghnopqu', 611], ['w', 778], ['z', 500], ['@', 975],
]);
function textW(s, size, { bold = false, ls = 0 } = {}) {
  const table = bold ? HELV_BOLD : HELV;
  let em = 0;
  for (const ch of s) em += (table[ch] ?? 556) / 1000;
  return Math.max(em, s.length * 0.54) * size + s.length * ls;
}

// Greedy word wrap to a maximum width.
function wrap(text, size, maxW, opts = {}) {
  const lines = [];
  let line = '';
  for (const word of text.split(' ')) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && textW(candidate, size, opts) > maxW) {
      lines.push(line);
      line = word;
    } else line = candidate;
  }
  if (line) lines.push(line);
  return lines;
}

// Wrap to the same number of lines as a greedy wrap, but with the lines as
// even as possible, so a wrapped label never leaves one word on its own.
function wrapBalanced(text, size, maxW, opts = {}) {
  const lines = wrap(text, size, maxW, opts);
  if (lines.length < 2) return lines;
  let lo = 0;
  let hi = maxW;
  for (let k = 0; k < 24; k++) {
    const mid = (lo + hi) / 2;
    if (wrap(text, size, mid, opts).length <= lines.length) hi = mid;
    else lo = mid;
  }
  return wrap(text, size, hi, opts);
}

// The seven capabilities an agent platform adds. Fill and stroke use `hue`;
// text uses `ink`, a darker shade of the same hue so it stays legible.
const CAPABILITIES = {
  runtime: { label: 'Runtime', note: 'Where agents run', hue: '#8b5cf6', ink: '#6d28d9', icon: 'cpu' },
  gateway: { label: 'Tool gateway', note: 'How agents reach systems', hue: '#3b82f6', ink: '#1d4ed8', icon: 'zap' },
  knowledge: { label: 'Knowledge and memory', note: 'What agents know', hue: '#14b8a6', ink: '#0f766e', icon: 'book' },
  policy: { label: 'Identity and policy', note: 'Who the agent is, what it may do', hue: '#64748b', ink: '#475569', icon: 'sliders' },
  evaluation: { label: 'Evaluation and release', note: 'How behaviour changes', hue: '#a855f7', ink: '#7e22ce', icon: 'refresh' },
  audit: { label: 'Observability and audit trail', note: 'What you can prove', hue: '#0ea5e9', ink: '#0369a1', icon: 'clipboard' },
  human: { label: 'Human oversight', note: 'Who decides and answers', hue: '#f59e0b', ink: '#b45309', icon: 'user' },
};

const LAYER_ICONS = {
  R01: 'server', R02: 'database', R03: 'cable', R04: 'archive', R05: 'factory',
  R06: 'bulb', R07: 'bot', R08: 'users', R09: 'message', R10: 'lock',
  R11: 'landmark', R12: 'activity', R13: 'eye', R14: 'funnel',
};

// Product lines: "Category: item, item" or just "item, item". Items split on
// commas and semicolons that sit outside brackets.
const LAYERS = [
  { code: 'R01', name: 'Infrastructure and compute', cap: 'runtime',
    control: 'Isolation levels by permission, egress allowlists',
    mech: ['microVM sandboxes', "Workload identity: the agent's own identity", 'Durable, resumable sessions'],
    prod: ['Runtimes: Bedrock AgentCore, Vertex Agent Engine, Foundry', 'Sandboxes: E2B, Daytona, Modal, K8s Agent Sandbox', 'Durability: Temporal, Restate, DBOS, Inngest'] },
  { code: 'R07', name: 'Agent platform', cap: 'runtime',
    control: 'Harness caps and eval-gated registry promotion',
    mech: ['Explicit termination', 'Artifacts-as-state', 'Separate verification path'],
    prod: ['Frameworks: LangGraph, OpenAI + Claude Agent SDKs, MS Agent Framework', 'Runtimes: AgentCore, Vertex Agent Engine, Foundry', 'Portable: Agent Skills, A2A'] },
  { code: 'R03', name: 'Integration fabric', cap: 'gateway',
    control: 'One gateway is the single enforcement point',
    mech: ['MCP tool contract', 'Token exchange, OBO', 'Idempotency and receipts'],
    prod: ['APIM: Kong, Apigee, Azure APIM, AWS API Gateway, WSO2, Tyk', 'Dedicated MCP: agentgateway, IBM ContextForge, Docker MCP Gateway', 'Registry: Azure API Center (private-registry pattern)'] },
  { code: 'R04', name: 'Systems of record', cap: 'gateway',
    control: 'Entitlement stays in the record system',
    mech: ['Run-as-user', 'Write gates set by impact', 'Eval gate on vendor releases'],
    prod: ['Salesforce Agentforce, ServiceNow AI Agents + Action Fabric', 'Workday Illuminate + ASoR, Oracle Fusion AI Agents', 'SAP Joule (embedded-only), MS Agent 365 (governance)'] },
  { code: 'R05', name: 'Line of business and OT', cap: 'gateway',
    control: 'Information path only; operator holds authority',
    mech: ['Validation loop before display', 'Alert channel, not alarms', 'Tested revert-to-manual'],
    prod: ['Honeywell Alarm Guidance, Yokogawa FKDPP (RL, not LLM)', 'IBM Maximo agents, SAP asset and service agents', 'NREL eGridGPT (reference architecture, not a product)'] },
  { code: 'R02', name: 'Data platform', cap: 'knowledge',
    control: 'Fail-close ACL pre-filter inside the query',
    mech: ['Permission crawl into index', 'Semantic contracts', 'CDC-fed freshness'],
    prod: ['Substrate: pgvector, pgvectorscale, S3 Vectors, Pinecone, Qdrant', 'Semantics: dbt Semantic Layer, Cube, Snowflake, Databricks, OSI', 'ACL-aware: Glean, Azure AI Search ACLs, Amazon Q, SpiceDB'] },
  { code: 'R14', name: 'Agent data engineering', cap: 'knowledge',
    control: 'Provenance at parse time; erasure cascades',
    mech: ['Version-stamped embeddings', 'Memory write quarantine', 'Deleted-vector exclusion sets'],
    prod: ['Parsing: Docling, LlamaParse, Unstructured', 'Memory: Mem0, Zep, Letta, AgentCore Memory, Vertex Memory Bank', 'Freshness: Debezium, Flink CDC, Tableflow'] },
  { code: 'R10', name: 'Security and identity', cap: 'policy',
    control: 'Deterministic policy check on every action with impact',
    mech: ['JIT least privilege', 'Short-lived credentials', 'Guardrails advisory only'],
    prod: ['Identity: Entra Agent ID, Okta for AI Agents, CyberArk, SailPoint', 'Policy: Cedar, OPA/Rego, OpenFGA, SpiceDB, FIDES', 'NHI and AIDR: Astrix, Oasis, Entro; Zenity, Noma, WitnessAI'] },
  { code: 'R11', name: 'Governance, risk and sovereignty', cap: 'policy',
    control: 'Registry, evidence level, kill switch before autonomy',
    mech: ['Autonomy levels', 'Audit trail baseline; EU AI Act record keeping', 'Classification-routed deployment'],
    prod: ['ServiceNow AI Control Tower, Microsoft Purview for Agents', 'OneTrust, Credo AI, Holistic AI, IBM watsonx.governance', 'Standards: ISO 42001, 42005, 42006'] },
  { code: 'R06', name: 'Intelligence and learning', cap: 'evaluation',
    control: 'Counterexample-gated promotion with a demotion path',
    mech: ['Expert-owned eval bar', 'Calibrated, pinned judges', 'Optimizer and evaluator decoupled'],
    prod: ['Flywheel: NVIDIA Data Flywheel, Databricks Agent Bricks + Judge Builder', 'Evals: LangSmith, Braintrust, Arize Phoenix', 'Adaptation: OpenAI RFT, on-policy distillation'] },
  { code: 'R12', name: 'Observability and FinOps', cap: 'audit',
    control: 'Collection outside the agent; hard budget caps',
    mech: ['Session, model, tool spans', 'Schema translation layer', 'Shadow, canary, full'],
    prod: ['APM: Datadog, New Relic, Dynatrace, Grafana, Elastic', 'Eval-native: LangSmith, Braintrust, Langfuse (OSS)', 'Standards: OTel GenAI (not stable), FOCUS 1.3'] },
  { code: 'R08', name: 'Productivity and collaboration', cap: 'human',
    control: 'Agent identity by default; a user account by exception',
    mech: ['Service principal + sponsor', 'A user account only where permissions need it', 'Shadow-usage telemetry'],
    prod: ['M365 Copilot + Agent 365, Google Workspace Gemini', 'Teams Facilitator, Slack agents', 'Notetakers: Otter, Granola and similar'] },
  { code: 'R09', name: 'Experience and channels', cap: 'human',
    control: 'Separate edge on shared platform capabilities',
    mech: ['Disclosure at first contact', 'Escalation to a staffed queue', 'Resolution, not containment'],
    prod: ['CCaaS platforms; Intercom Fin, Zendesk, Sierra', 'Suite-embedded service agents', 'Commerce protocols: ACP, UCP, AP2'] },
  { code: 'R13', name: 'Operating model and supervision', cap: 'human',
    control: 'Burst-rate oversight capacity, never a daily average',
    mech: ['Span of control, including wait time', 'Escalation mix by trigger', 'Alarms on alarms'],
    prod: ['Entra ID Governance (agent sponsors)', 'Workday Agent System of Record', 'ServiceNow AI Control Tower (kill switches)'] },
];

const CONCERNS = [
  { id: 'C1', label: 'Identity and access', owns: ['R10'], enforces: ['R03', 'R04', 'R01'] },
  { id: 'C2', label: 'Observability', owns: ['R12'], enforces: ['R01', 'R03', 'R07', 'R13'] },
  { id: 'C3', label: 'Traceability and audit', owns: ['R11'], enforces: ['R12', 'R14', 'R04'] },
  { id: 'C4', label: 'Grounding', owns: ['R02', 'R14'], enforces: ['R09', 'R05', 'R06'] },
  { id: 'C5', label: 'Impersonation', owns: ['R10'], enforces: ['R03', 'R08', 'R09'] },
  { id: 'C6', label: 'Sovereignty', owns: ['R11'], enforces: ['R01', 'R02', 'R14', 'R03'] },
  { id: 'C7', label: 'Privacy', owns: ['R11'], enforces: ['R14', 'R02', 'R12'] },
  { id: 'C8', label: 'Safety and oversight', owns: ['R13'], enforces: ['R03', 'R07', 'R05', 'R01'] },
  { id: 'C9', label: 'Cost accountability', owns: ['R12'], enforces: ['R07', 'R03', 'R04'] },
  { id: 'C10', label: 'Resilience', owns: ['R01'], enforces: ['R03', 'R12', 'R05', 'R02'] },
];

const CONCERN_PRODUCTS = [
  ['C1', 'Identity and access', 'Entra Agent ID, Okta for AI Agents, CyberArk, SailPoint, SPIFFE/WIMSE'],
  ['C2', 'Observability', 'Datadog, New Relic, Dynatrace, LangSmith, Braintrust, Langfuse'],
  ['C3', 'Traceability and audit', 'Microsoft Purview, OneTrust, Credo AI, IBM watsonx.governance'],
  ['C4', 'Grounding', 'Glean, Azure AI Search ACLs, Amazon Q, dbt Semantic Layer, Cube'],
  ['C5', 'Impersonation', 'Disclosure and content-marking tooling; thin market, mostly platform features'],
  ['C6', 'Sovereignty', 'AWS European Sovereign Cloud, Google Distributed Cloud, sovereign regions'],
  ['C7', 'Privacy', 'OneTrust, Purview, erasure and DSAR tooling reaching derived artifacts'],
  ['C8', 'Safety and oversight', 'ServiceNow AI Control Tower; guardrail products, advisory only'],
  ['C9', 'Cost accountability', 'LiteLLM budgets, Agent 365 billing policies, FOCUS 1.3, Tokenomics'],
  ['C10', 'Resilience', 'Temporal, Restate, DBOS, Inngest; degraded-mode design is yours'],
];

const ZONES = [
  ['Access and entitlements', 'Rule over verified identity; risk scores advise'],
  ['Movement of money', 'Scoped, revocable mandates; fraud models advise'],
  ['Safety actuation', 'Standards exclude ML from the function itself'],
  ['Formal regulatory records', 'Drafting permitted; attestation is human'],
];

// ---------------------------------------------------------------------------
// Geometry. The chart is laid out at 1440 wide, its native size.

const W = 1440;
const M = 32;
const RAIL_W = 150; // capability rail column, including the gap after it
const RAIL_PAD = 12;
const CW = 34; // one concern column
const GRID_X = W - M - CW * CONCERNS.length;
const LAYER_X = M + RAIL_W;
const CARD_R = GRID_X - 10; // right edge of the layer cards
const CM_X = LAYER_X + 540; // control point and mechanisms column
const PROD_X = LAYER_X + 18;
const PROD_MAX = CM_X - 22;
const CAT_W = 94; // product category label column
const CTRL_X = CM_X + 21;
const CTRL_MAX = CARD_R - 12 - CTRL_X;
const MECH_X = CM_X + 15;
const MECH_MAX = CARD_R - 12 - MECH_X;

const CHIP_FS = 10.5;
const CHIP_H = 17;
const CHIP_LINE = 22;
const CHIP_GAP = 5;
const CHIP_PAD = 16; // padding around the label
const CAT_FS = 9;
const CAT_LS = 0.6;
const CTRL_FS = 13;
const CTRL_LINE = 17;
const MECH_FS = 12;
const MECH_LINE = 18;
const MECH_WRAP_LINE = 15;

const HEADER_H = 156;
const CONCERN_HEAD_H = 196;
const ROWS_Y = M + HEADER_H + CONCERN_HEAD_H;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// One <text> per label, with a <tspan> per wrapped line, so a search for the
// whole phrase still finds it. The trailing space keeps the words apart.
function textBlock(x, y, lines, lineH, attrs) {
  if (lines.length === 1) return `<text x="${x}" y="${y}" ${attrs}>${esc(lines[0])}</text>`;
  const spans = lines.map((l, i) => `<tspan x="${x}" y="${y + i * lineH}">${esc(l)}${i < lines.length - 1 ? ' ' : ''}</tspan>`);
  return `<text ${attrs}>${spans.join('')}</text>`;
}

// Lay product chips out left to right, wrapping onto new lines.
function flowChips(items, x0, maxX) {
  const lines = [[]];
  let x = x0;
  for (const name of items) {
    const w = textW(name, CHIP_FS) + CHIP_PAD;
    if (x + w > maxX && lines[lines.length - 1].length) {
      lines.push([]);
      x = x0;
    }
    lines[lines.length - 1].push({ name, x, w });
    x += w + CHIP_GAP;
  }
  return lines;
}

// Work out each layer row: product chips, control point and mechanisms, height.
const rows = LAYERS.map((layer) => {
  const groups = layer.prod.map((line) => {
    const m = line.match(/^([^:]+):\s(.+)$/);
    const cat = m ? m[1] : '';
    const items = (m ? m[2] : line).split(/[,;]\s(?![^(]*\))/).map((s) => s.trim()).filter(Boolean);
    const lines = flowChips(items, cat ? PROD_X + CAT_W : PROD_X, PROD_MAX);
    const labelLines = cat ? wrap(cat.toUpperCase(), CAT_FS, CAT_W - 10, { bold: true, ls: CAT_LS }) : [];
    const h = Math.max(lines.length * CHIP_LINE, labelLines.length ? (labelLines.length - 1) * 10 + CHIP_LINE : 0);
    return { lines, labelLines, h };
  });
  const prodTop = 46;
  const prodEnd = prodTop + groups.reduce((a, g) => a + g.h, 0) - (CHIP_LINE - CHIP_H) + 12;

  const controlLines = wrapBalanced(layer.control, CTRL_FS, CTRL_MAX, { bold: true });
  const ctrlBase = 29;
  const mechs = layer.mech.map((t) => wrapBalanced(t, MECH_FS, MECH_MAX));
  let mechY = ctrlBase + (controlLines.length - 1) * CTRL_LINE + 24;
  const mechPos = mechs.map((lines) => {
    const y = mechY;
    mechY += (lines.length - 1) * MECH_WRAP_LINE + MECH_LINE;
    return { lines, y };
  });
  const mechEnd = mechY - MECH_LINE + 14;

  const h = Math.max(112, prodEnd, mechEnd) + 6;
  return { layer, groups, prodTop, controlLines, ctrlBase, mechPos, h };
});

// Group consecutive layers that share a capability, and make sure each rail
// is tall enough for its icon, name and note.
const railGroups = [];
for (let i = 0; i < rows.length; ) {
  const cap = rows[i].layer.cap;
  let n = 0;
  while (i + n < rows.length && rows[i + n].layer.cap === cap) n++;
  railGroups.push({ cap, start: i, count: n });
  i += n;
}
const RAIL_TEXT_W = RAIL_W - 12 - 2 * RAIL_PAD;
for (const g of railGroups) {
  const c = CAPABILITIES[g.cap];
  g.nameLines = wrapBalanced(c.label, 14, RAIL_TEXT_W, { bold: true });
  g.noteLines = wrapBalanced(c.note, 11.5, RAIL_TEXT_W);
  const need = 50 + (g.nameLines.length - 1) * 17 + 20 + (g.noteLines.length - 1) * 14 + 14;
  const have = rows.slice(g.start, g.start + g.count).reduce((a, r) => a + r.h, 0);
  if (need > have) rows[g.start + g.count - 1].h += need - have;
}
let yCursor = ROWS_Y;
for (const r of rows) {
  r.y = yCursor;
  yCursor += r.h;
}
const ROWS_END = yCursor;

// Bottom blocks.
const CPROD_Y = ROWS_END + 34;
const CPROD_COLS = 2;
const CPROD_ROW = 20;
const CPROD_H = 84 + Math.ceil(CONCERN_PRODUCTS.length / CPROD_COLS) * CPROD_ROW;
const ZONE_Y = CPROD_Y + CPROD_H + 24;
const ZONE_H = 122;
const H = ZONE_Y + ZONE_H + M;

// Legend for the concern matrix. It sits in the open space left of the
// rotated concern headers, right-aligned so it reads as the matrix key.
const LEGEND_FS = 12.5;
const LEGEND_LINE = 22;
const legendItems = [
  { mark: 'owns', text: 'Owns the concern: defines the requirement and holds accountability' },
  { mark: 'enforces', text: 'Enforces it: where a violation is actually stopped' },
  { mark: 'inherits', text: 'Inherits it: must carry the property through without weakening it' },
];
const legendNote = 'Inheritance is where most defects live, because it fails silently.';
const LEGEND_W = Math.max(...legendItems.map((it) => 26 + textW(it.text, LEGEND_FS)), textW(legendNote, 12));
const LEGEND_X = Math.round(GRID_X - 28 - LEGEND_W);
const LEGEND_NOTE_Y = ROWS_Y - 50;
const LEGEND_Y = LEGEND_NOTE_Y - 3 * LEGEND_LINE - 4; // baseline of the first item
const LEGEND_HEAD_Y = LEGEND_Y - 26;

// ---------------------------------------------------------------------------
// Drawing.

const out = [];
const p = (s) => out.push(s);

p(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Inter, Arial, sans-serif" role="img" aria-labelledby="wallTitle wallDesc">`);
p(`<title id="wallTitle">The agentic enterprise on one page</title>`);
p(`<desc id="wallDesc">Fourteen layers you own, grouped under the seven capabilities an agent platform adds across them: Runtime, Tool gateway, Knowledge and memory, Identity and policy, Evaluation and release, Observability and audit trail, and Human oversight. Each layer shows its control point, three key mechanisms and representative products. Ten cross-cutting concerns run as columns across every layer, marked where each layer owns or enforces them. Four deterministic zones sit underneath as boundaries no model decision crosses. Products are named for orientation as of ${wallChartAsOf}.</desc>`);
p(`<rect width="${W}" height="${H}" fill="#ffffff"/>`);

// Header
p(`<text x="${M}" y="${M + 34}" font-size="34" font-weight="700" fill="#0f172a">The agentic enterprise, on one page</text>`);
{
  const sub = 'Fourteen layers you own. Seven capabilities an agent platform adds across them. Ten concerns through every layer. Four boundaries no model decision crosses.';
  const lines = wrap(sub, 16, W - 2 * M);
  lines.forEach((l, i) => p(`<text x="${M}" y="${M + 66 + i * 21}" font-size="16" fill="#475569">${esc(l)}</text>`));
}
p(`<text x="${W - M}" y="${M + 14}" font-size="12" fill="#64748b" text-anchor="end">Products named for orientation as of ${wallChartAsOf}. Representative, not exhaustive,</text>`);
p(`<text x="${W - M}" y="${M + 30}" font-size="12" fill="#64748b" text-anchor="end">and not endorsements. Vendor capability claims are vendor-published.</text>`);

const RULES = [
  ['Rule 1', 'Policy is enforced outside the model. An instruction in a prompt is a request; the same rule checked at a gateway is a control.'],
  ['Rule 2', 'The audit trail is written where the agent cannot touch it. Anything an agent reports about itself is testimony, not evidence.'],
];
RULES.forEach(([tag, text], i) => {
  const y = M + 88 + i * 34;
  p(`<rect x="${M}" y="${y}" width="56" height="24" rx="6" fill="#0f172a"/>`);
  p(`<text x="${M + 28}" y="${y + 16.5}" font-size="12.5" font-weight="700" fill="#ffffff" text-anchor="middle">${tag}</text>`);
  p(`<text x="${M + 68}" y="${y + 17}" font-size="14.5" fill="#0f172a">${esc(text)}</text>`);
});

// Column headers
const headY = ROWS_Y - 14;
const colHead = (x, label) => p(`<text x="${x}" y="${headY}" font-size="11" font-weight="700" letter-spacing="1.4" fill="#64748b">${esc(label)}</text>`);
colHead(M, 'CAPABILITY');
colHead(LAYER_X, `LAYER AND REPRESENTATIVE PRODUCTS, ${wallChartAsOf.toUpperCase()}`);
colHead(CM_X, 'CONTROL POINT AND KEY MECHANISMS');
p(textBlock(GRID_X, ROWS_Y - CONCERN_HEAD_H + 12, ['CROSS-CUTTING CONCERNS,', 'THROUGH EVERY LAYER'], 15, 'font-size="11" font-weight="700" letter-spacing="1.4" fill="#64748b"'));

// Concern column headers, rotated to read bottom to top.
CONCERNS.forEach((c, i) => {
  const cx = GRID_X + i * CW + (CW - 4) / 2;
  const by = ROWS_Y - 16;
  p(`<text transform="translate(${cx + 1} ${by}) rotate(-90)" font-size="12" fill="#334155">${esc(c.label)}</text>`);
  p(`<text transform="translate(${cx + 13} ${by}) rotate(-90)" font-size="9.5" font-weight="700" fill="#94a3b8">${c.id}</text>`);
});

// Capability rail
railGroups.forEach((g) => {
  const first = rows[g.start];
  const last = rows[g.start + g.count - 1];
  const y = first.y;
  const h = last.y + last.h - first.y;
  const c = CAPABILITIES[g.cap];
  const tx = M + RAIL_PAD;
  p(`<rect x="${M}" y="${y + 3}" width="${RAIL_W - 12}" height="${h - 6}" rx="10" fill="${c.hue}" fill-opacity="0.10" stroke="${c.hue}" stroke-opacity="0.45"/>`);
  p(drawIcon(c.icon, tx, y + 15, 22, c.hue));
  p(textBlock(tx, y + 58, g.nameLines, 17, `font-size="14" font-weight="700" fill="${c.ink}"`));
  const noteY = y + 58 + (g.nameLines.length - 1) * 17 + 19;
  p(textBlock(tx, noteY, g.noteLines, 14, 'font-size="11.5" fill="#475569"'));
});

// Layer rows
rows.forEach((r) => {
  const { layer, y, h } = r;
  const c = CAPABILITIES[layer.cap];

  p(`<rect x="${LAYER_X}" y="${y + 3}" width="${CARD_R - LAYER_X}" height="${h - 6}" rx="9" fill="#f8fafc" stroke="#e2e8f0"/>`);
  p(`<rect x="${LAYER_X}" y="${y + 3}" width="5" height="${h - 6}" rx="2.5" fill="${c.hue}"/>`);

  // Layer icon, code and name.
  p(`<rect x="${LAYER_X + 16}" y="${y + 12}" width="28" height="28" rx="7" fill="${c.hue}" fill-opacity="0.13"/>`);
  p(drawIcon(LAYER_ICONS[layer.code], LAYER_X + 20, y + 16, 20, c.ink));
  p(`<text x="${LAYER_X + 54}" y="${y + 31}" font-size="12" font-weight="700" fill="${c.ink}">${layer.code}</text>`);
  p(`<text x="${LAYER_X + 88}" y="${y + 32}" font-size="16.5" font-weight="700" fill="#0f172a">${esc(layer.name)}</text>`);

  // Products as chips, one group per category.
  let gy = y + r.prodTop;
  r.groups.forEach((g) => {
    if (g.labelLines.length) p(textBlock(PROD_X + 2, gy + 12, g.labelLines, 10, `font-size="${CAT_FS}" font-weight="700" letter-spacing="${CAT_LS}" fill="#94a3b8"`));
    g.lines.forEach((line, li) => {
      const cy = gy + li * CHIP_LINE;
      line.forEach(({ name, x, w }) => {
        // Label centred, so the padding stays even whichever face renders it.
        p(`<rect x="${x.toFixed(1)}" y="${cy}" width="${w.toFixed(1)}" height="${CHIP_H}" rx="8.5" fill="#ffffff" stroke="${c.hue}" stroke-opacity="0.38"/>`);
        p(`<text x="${(x + w / 2).toFixed(1)}" y="${cy + 12.3}" font-size="${CHIP_FS}" fill="#334155" text-anchor="middle">${esc(name)}</text>`);
      });
    });
    gy += g.h;
  });

  // Control point and mechanisms.
  p(drawIcon('shield', CM_X, y + 16, 15, c.hue, 2.1));
  p(textBlock(CTRL_X, y + r.ctrlBase, r.controlLines, CTRL_LINE, `font-size="${CTRL_FS}" font-weight="700" fill="#0f172a"`));
  r.mechPos.forEach(({ lines, y: my }) => {
    p(`<circle cx="${CM_X + 6}" cy="${y + my - 4}" r="2.6" fill="${c.hue}" fill-opacity="0.8"/>`);
    p(textBlock(MECH_X, y + my, lines, MECH_WRAP_LINE, `font-size="${MECH_FS}" fill="#475569"`));
  });

  // Concern matrix cells.
  CONCERNS.forEach((cn, ci) => {
    const cx = GRID_X + ci * CW;
    const owns = cn.owns.includes(layer.code);
    const enf = cn.enforces.includes(layer.code);
    p(`<rect x="${cx}" y="${y + 3}" width="${CW - 4}" height="${h - 6}" rx="7" fill="${owns ? c.hue : '#f8fafc'}" fill-opacity="${owns ? 0.18 : 1}" stroke="${owns ? c.hue : '#e2e8f0'}" stroke-opacity="${owns ? 0.6 : 1}"/>`);
    const ccx = cx + (CW - 4) / 2;
    const ccy = y + h / 2;
    if (owns) {
      p(`<circle cx="${ccx}" cy="${ccy}" r="9" fill="${c.hue}"/>`);
      p(`<text x="${ccx}" y="${ccy + 4}" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">O</text>`);
    } else if (enf) {
      p(`<circle cx="${ccx}" cy="${ccy}" r="7.5" fill="none" stroke="${c.hue}" stroke-width="2.4"/>`);
    } else {
      p(`<circle cx="${ccx}" cy="${ccy}" r="2" fill="#cbd5e1"/>`);
    }
  });
});

// Products that serve the cross-cutting concerns
p(`<rect x="${M}" y="${CPROD_Y}" width="${W - 2 * M}" height="${CPROD_H}" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>`);
p(`<text x="${M + 24}" y="${CPROD_Y + 30}" font-size="16" font-weight="700" fill="#0f172a">Products serving the cross-cutting concerns</text>`);
p(`<text x="${M + 24}" y="${CPROD_Y + 51}" font-size="12.5" fill="#64748b">Concerns are properties, not products. These are the categories that carry them. The enforcement point still sits where the matrix above says it does.</text>`);
{
  const colW = (W - 2 * M - 48) / CPROD_COLS;
  const nameW = Math.max(...CONCERN_PRODUCTS.map(([id, name]) => textW(`${id} ${name}`, 12, { bold: true }))) + 16;
  CONCERN_PRODUCTS.forEach(([id, name, prods], i) => {
    const col = i % CPROD_COLS;
    const row = Math.floor(i / CPROD_COLS);
    const cx = M + 24 + col * colW;
    const cy = CPROD_Y + 78 + row * CPROD_ROW;
    p(`<text x="${cx}" y="${cy}" font-size="12" font-weight="700" fill="#334155">${id} ${esc(name)}</text>`);
    p(`<text x="${(cx + nameW).toFixed(1)}" y="${cy}" font-size="12" fill="#475569">${esc(prods)}</text>`);
  });
}

// Deterministic zones
p(`<rect x="${M}" y="${ZONE_Y}" width="${W - 2 * M}" height="${ZONE_H}" rx="12" fill="#0f172a"/>`);
p(`<text x="${M + 24}" y="${ZONE_Y + 32}" font-size="17" font-weight="700" fill="#ffffff">Four deterministic zones. Models may take permission away, never grant it.</text>`);
p(`<text x="${M + 24}" y="${ZONE_Y + 54}" font-size="13" fill="#94a3b8">These hold under every layer above. Three of the four already run machine-learning signals inside them. The decision rule stays deterministic.</text>`);
{
  const zw = (W - 2 * M - 48) / ZONES.length;
  ZONES.forEach(([name, detail], i) => {
    const zx = M + 24 + i * zw;
    p(`<text x="${zx.toFixed(1)}" y="${ZONE_Y + 86}" font-size="14" font-weight="700" fill="#f8fafc">${esc(name)}</text>`);
    p(`<text x="${zx.toFixed(1)}" y="${ZONE_Y + 105}" font-size="12" fill="#cbd5e1">${esc(detail)}</text>`);
  });
}

// Legend
p(`<text x="${LEGEND_X}" y="${LEGEND_HEAD_Y}" font-size="11" font-weight="700" letter-spacing="1.4" fill="#64748b">READING THE CONCERN COLUMNS</text>`);
legendItems.forEach(({ mark, text }, i) => {
  const x = LEGEND_X;
  const y = LEGEND_Y + i * LEGEND_LINE;
  if (mark === 'owns') {
    p(`<circle cx="${x + 9}" cy="${y - 4.5}" r="9" fill="#334155"/>`);
    p(`<text x="${x + 9}" y="${y - 0.5}" font-size="10.5" font-weight="700" fill="#ffffff" text-anchor="middle">O</text>`);
  } else if (mark === 'enforces') {
    p(`<circle cx="${x + 9}" cy="${y - 4.5}" r="7.5" fill="none" stroke="#334155" stroke-width="2.4"/>`);
  } else {
    p(`<circle cx="${x + 9}" cy="${y - 4.5}" r="2.2" fill="#94a3b8"/>`);
  }
  p(`<text x="${x + 26}" y="${y}" font-size="${LEGEND_FS}" fill="#334155">${esc(text)}</text>`);
});
p(`<text x="${LEGEND_X}" y="${LEGEND_NOTE_Y}" font-size="12" font-style="italic" fill="#64748b">${esc(legendNote)}</text>`);

p(`</svg>`);

await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, out.join('\n') + '\n');
console.log(`build-wall-chart: ${W} x ${H} written to public/diagrams/target-state.svg`);
