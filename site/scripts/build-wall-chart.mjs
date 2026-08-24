import { wallChartAsOf } from '../lib/site.config.mjs';
// SUPERSEDED. The published chart at public/diagrams/target-state.svg is now a
// designed artefact, not a generated one, and this script would overwrite it.
// It is out of the build chain and runs only as `npm run diagrams:legacy`,
// kept because it documents the chart's structure in code.
//
// Generates the single-picture target-state wall chart.
// One SVG that carries all fourteen layers, their control point and key
// mechanisms, the seven planes that group them, the ten cross-cutting concerns
// as a live matrix, and the four deterministic zones underneath.
//
// Output: public/diagrams/target-state.svg (not public/figures, which is the
// manifest export directory the figure validator owns).

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

// Monogram for a product name: first letters of up to two words.
function monogram(name) {
  const words = name.replace(/[()]/g, '').split(/[\s/+-]+/).filter((w) => /[A-Za-z0-9]/.test(w));
  if (!words.length) return '?';
  if (words.length === 1) return words[0].slice(0, 2);
  return (words[0][0] + words[1][0]).toUpperCase();
}

// Approximate text width at a given font size (sans, average glyph ~0.54em).
function textW(s, size) {
  return s.length * size * 0.54;
}

// Palette matches the site's semantic figure colours.
const PLANES = {
  execution: { label: 'Execution', hue: '#8b5cf6', note: 'Where agent work runs', icon: 'cpu' },
  action: { label: 'Action', hue: '#3b82f6', note: 'How agents reach systems', icon: 'zap' },
  knowledge: { label: 'Knowledge', hue: '#14b8a6', note: 'What agents know', icon: 'book' },
  control: { label: 'Control', hue: '#64748b', note: 'What is allowed', icon: 'sliders' },
  improvement: { label: 'Improvement', hue: '#a855f7', note: 'How behaviour changes', icon: 'refresh' },
  evidence: { label: 'Evidence', hue: '#0ea5e9', note: 'What you can prove', icon: 'clipboard' },
  human: { label: 'Human', hue: '#f59e0b', note: 'Who decides and answers', icon: 'user' },
};

const LAYER_ICONS = {
  R01: 'server', R02: 'database', R03: 'cable', R04: 'archive', R05: 'factory',
  R06: 'bulb', R07: 'bot', R08: 'users', R09: 'message', R10: 'lock',
  R11: 'landmark', R12: 'activity', R13: 'eye', R14: 'funnel',
};

const LAYERS = [
  { code: 'R01', name: 'Infrastructure and compute', plane: 'execution',
    control: 'Capability-tiered isolation and egress allowlists',
    mech: ['microVM sandboxes', 'Workload identity (ID2 floor)', 'Durable, resumable sessions'],
    prod: ["Runtimes: Bedrock AgentCore, Vertex Agent Engine, Foundry", "Sandboxes: E2B, Daytona, Modal, K8s Agent Sandbox", "Durability: Temporal, Restate, DBOS, Inngest"] },
  { code: 'R07', name: 'Agent platform', plane: 'execution',
    control: 'Harness caps and eval-gated registry promotion',
    mech: ['Explicit termination', 'Artifacts-as-state', 'Separate verification path'],
    prod: ["Frameworks: LangGraph, OpenAI + Claude Agent SDKs, MS Agent Framework", "Runtimes: AgentCore, Vertex Agent Engine, Foundry", "Portable: Agent Skills, A2A"] },
  { code: 'R03', name: 'Integration fabric', plane: 'action',
    control: 'One gateway is the single enforcement point',
    mech: ['MCP tool contract', 'Token exchange, OBO', 'Idempotency and receipts'],
    prod: ["APIM: Kong, Apigee, Azure APIM, AWS API Gateway, WSO2, Tyk", "Dedicated MCP: agentgateway, IBM ContextForge, Docker MCP Gateway", "Registry: Azure API Center (private-registry pattern)"] },
  { code: 'R04', name: 'Systems of record', plane: 'action',
    control: 'Entitlement stays in the record system',
    mech: ['Run-as-user', 'Consequence-class write gates', 'Eval gate on vendor releases'],
    prod: ["Salesforce Agentforce, ServiceNow AI Agents + Action Fabric", "Workday Illuminate + ASoR, Oracle Fusion AI Agents", "SAP Joule (embedded-only), MS Agent 365 (governance plane)"] },
  { code: 'R05', name: 'Line of business and OT', plane: 'action',
    control: 'Information path only; operator holds authority',
    mech: ['Validation loop before display', 'Alert channel, not alarms', 'Tested revert-to-manual'],
    prod: ["Honeywell Alarm Guidance, Yokogawa FKDPP (RL, not LLM)", "IBM Maximo agents, SAP asset and service agents", "NREL eGridGPT (reference architecture, not a product)"] },
  { code: 'R02', name: 'Data platform', plane: 'knowledge',
    control: 'Fail-close ACL pre-filter inside the query',
    mech: ['Permission crawl into index', 'Semantic contracts', 'CDC-fed freshness'],
    prod: ["Substrate: pgvector, pgvectorscale, S3 Vectors, Pinecone, Qdrant", "Semantics: dbt Semantic Layer, Cube, Snowflake, Databricks, OSI", "ACL-aware: Glean, Azure AI Search ACLs, Amazon Q, SpiceDB"] },
  { code: 'R14', name: 'Agent data engineering', plane: 'knowledge',
    control: 'Provenance at parse time; erasure cascades',
    mech: ['Version-stamped embeddings', 'Memory write quarantine', 'Deleted-vector exclusion sets'],
    prod: ["Parsing: Docling, LlamaParse, Unstructured", "Memory: Mem0, Zep, Letta, AgentCore Memory, Vertex Memory Bank", "Freshness: Debezium, Flink CDC, Tableflow"] },
  { code: 'R10', name: 'Security and identity', plane: 'control',
    control: 'Deterministic PDP on every consequential action',
    mech: ['JIT least privilege', 'Short-lived credentials', 'Guardrails advisory only'],
    prod: ["Identity: Entra Agent ID, Okta for AI Agents, CyberArk, SailPoint", "Policy: Cedar, OPA/Rego, OpenFGA, SpiceDB, FIDES", "NHI and AIDR: Astrix, Oasis, Entro; Zenity, Noma, WitnessAI"] },
  { code: 'R11', name: 'Governance, risk, sovereignty', plane: 'control',
    control: 'Registry, evidence tier, kill switch before autonomy',
    mech: ['Autonomy risk tiers', 'Evidence floor and Article-12 tier', 'Classification-routed deployment'],
    prod: ["ServiceNow AI Control Tower, Microsoft Purview for Agents", "OneTrust, Credo AI, Holistic AI, IBM watsonx.governance", "Standards: ISO 42001, 42005, 42006"] },
  { code: 'R06', name: 'Intelligence and learning', plane: 'improvement',
    control: 'Counterexample-gated promotion with a demotion path',
    mech: ['Expert-owned eval bar', 'Calibrated, pinned judges', 'Optimizer and evaluator decoupled'],
    prod: ["Flywheel: NVIDIA Data Flywheel, Databricks Agent Bricks + Judge Builder", "Evals: LangSmith, Braintrust, Arize Phoenix", "Adaptation: OpenAI RFT, on-policy distillation"] },
  { code: 'R12', name: 'Observability and FinOps', plane: 'evidence',
    control: 'Collection outside the agent; hard budget caps',
    mech: ['Session, model, tool spans', 'Schema translation layer', 'Shadow, canary, full'],
    prod: ["APM: Datadog, New Relic, Dynatrace, Grafana, Elastic", "Eval-native: LangSmith, Braintrust, Langfuse (OSS)", "Standards: OTel GenAI (not stable), FOCUS 1.3"] },
  { code: 'R08', name: 'Productivity and collaboration', plane: 'human',
    control: 'Access identity default; presence by exception',
    mech: ['Service principal + sponsor', 'Presence by capability surface', 'Shadow-usage telemetry'],
    prod: ["M365 Copilot + Agent 365, Google Workspace Gemini", "Teams Facilitator, Slack agents", "Notetakers: Otter, Granola and similar"] },
  { code: 'R09', name: 'Experience and channels', plane: 'human',
    control: 'Separate edge on the shared control plane',
    mech: ['Disclosure at first contact', 'Escalation to a staffed queue', 'Resolution, not containment'],
    prod: ["CCaaS platforms; Intercom Fin, Zendesk, Sierra", "Suite-embedded service agents", "Commerce protocols: ACP, UCP, AP2"] },
  { code: 'R13', name: 'Supervision and oversight', plane: 'human',
    control: 'Burst-rate oversight capacity, never a daily average',
    mech: ['Fan-out incl. wait time', 'Escalation mix by trigger', 'Alarms on alarms'],
    prod: ["Entra ID Governance (agent sponsors)", "Workday Agent System of Record", "ServiceNow AI Control Tower (kill switches)"] },
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
  ['C1  Identity and access', 'Entra Agent ID, Okta for AI Agents, CyberArk, SailPoint, SPIFFE/WIMSE'],
  ['C2  Observability', 'Datadog, New Relic, Dynatrace, LangSmith, Braintrust, Langfuse'],
  ['C3  Traceability and audit', 'Microsoft Purview, OneTrust, Credo AI, IBM watsonx.governance'],
  ['C4  Grounding', 'Glean, Azure AI Search ACLs, Amazon Q, dbt Semantic Layer, Cube'],
  ['C5  Impersonation', 'Disclosure and content-marking tooling; thin market, mostly platform features'],
  ['C6  Sovereignty', 'AWS European Sovereign Cloud, Google Distributed Cloud, sovereign regions'],
  ['C7  Privacy', 'OneTrust, Purview, erasure and DSAR tooling reaching derived artifacts'],
  ['C8  Safety and oversight', 'ServiceNow AI Control Tower; guardrail products, advisory only'],
  ['C9  Cost accountability', 'LiteLLM budgets, Agent 365 billing policies, FOCUS 1.3, Tokenomics'],
  ['C10  Resilience', 'Temporal, Restate, DBOS, Inngest; degraded-mode design is yours'],
];

const ZONES = [
  ['Access and entitlements', 'Rule over verified identity; risk scores advise'],
  ['Movement of money', 'Scoped, revocable mandates; fraud models advise'],
  ['Safety actuation', 'Standards exclude ML from the function itself'],
  ['Formal regulatory records', 'Drafting permitted; attestation is human'],
];

// Geometry
const M = 44;
const HEADER_H = 176;
const ROW_H = 122;
const PLANE_W = 142;
const LAYER_W = 610;
const CM_W = 560;
const CONCERN_W = 52;
const CONCERN_HEAD_H = 196;
const GRID_X = M + PLANE_W + LAYER_W + CM_W;
const GRID_W = CONCERN_W * CONCERNS.length;
const ROWS_Y = M + HEADER_H + CONCERN_HEAD_H;
const ROWS_H = ROW_H * LAYERS.length;
const CPROD_Y = ROWS_Y + ROWS_H + 44;
const CPROD_H = 150;
const ZONE_Y = CPROD_Y + CPROD_H + 34;
const ZONE_H = 118;
const W = GRID_X + GRID_W + M;
const H = ZONE_Y + ZONE_H + 96;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const out = [];
const p = (s) => out.push(s);

p(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" role="img" aria-labelledby="wallTitle wallDesc">`);
p(`<title id="wallTitle">The agentic enterprise target-state architecture on one page</title>`);
p(`<desc id="wallDesc">Fourteen enterprise layers grouped into seven planes. Each layer shows its control point and three key mechanisms. Ten cross-cutting concerns run as columns across every layer, marked where each layer owns or enforces them. Four deterministic zones sit underneath as boundaries that no model decision crosses.</desc>`);
p(`<rect width="${W}" height="${H}" fill="#ffffff"/>`);

// Header
p(`<text x="${M}" y="${M + 42}" font-size="40" font-weight="700" fill="#0f172a">The agentic enterprise, on one page</text>`);
p(`<text x="${M}" y="${M + 76}" font-size="18" fill="#475569">Fourteen layers of estate. Seven planes of agent system across them. Ten concerns through every layer. Four boundaries no model decision crosses.</text>`);
p(`<text x="${W - M}" y="${M + 42}" font-size="12.5" fill="#94a3b8" text-anchor="end">Products named for orientation as of ${wallChartAsOf}. Representative, not exhaustive,</text>`);
p(`<text x="${W - M}" y="${M + 60}" font-size="12.5" fill="#94a3b8" text-anchor="end">and not endorsements. Vendor capability claims are vendor-published.</text>`);

const rules = [
  ['Rule 1', 'Enforcement lives in the control plane, never in the execution plane. An instruction in a prompt is a preference; the same rule at a gateway is a control.'],
  ['Rule 2', 'The evidence plane is fed by collection the agent cannot influence. Anything an agent reports about itself is testimony, not evidence.'],
];
rules.forEach(([tag, text], i) => {
  const y = M + 96 + i * 38;
  p(`<rect x="${M}" y="${y}" width="58" height="26" rx="6" fill="#0f172a"/>`);
  p(`<text x="${M + 29}" y="${y + 18}" font-size="13" font-weight="700" fill="#ffffff" text-anchor="middle">${tag}</text>`);
  p(`<text x="${M + 70}" y="${y + 18}" font-size="15" fill="#0f172a">${esc(text)}</text>`);
});

// Column headers
const headY = ROWS_Y - 16;
const cols = [
  [M, 'PLANE'],
  [M + PLANE_W, `LAYER AND REPRESENTATIVE PRODUCTS, ${wallChartAsOf.toUpperCase()}`],
  [M + PLANE_W + LAYER_W, 'CONTROL POINT AND KEY MECHANISMS'],
];
cols.forEach(([x, label]) => p(`<text x="${x}" y="${headY}" font-size="12" font-weight="700" letter-spacing="1.6" fill="#64748b">${label}</text>`));
p(`<text x="${GRID_X}" y="${ROWS_Y - CONCERN_HEAD_H + 16}" font-size="12" font-weight="700" letter-spacing="1.6" fill="#64748b">CROSS-CUTTING CONCERNS, THROUGH EVERY LAYER</text>`);

// Concern column headers, rotated
CONCERNS.forEach((c, i) => {
  const cx = GRID_X + i * CONCERN_W + CONCERN_W / 2;
  const by = ROWS_Y - 30;
  p(`<text transform="translate(${cx} ${by}) rotate(-90)" font-size="13" fill="#334155">${esc(c.label)}</text>`);
  p(`<text transform="translate(${cx + 15} ${by}) rotate(-90)" font-size="11" font-weight="700" fill="#94a3b8">${c.id}</text>`);
});

// Plane bands
let idx = 0;
const planeGroups = [];
while (idx < LAYERS.length) {
  const plane = LAYERS[idx].plane;
  let n = 0;
  while (idx + n < LAYERS.length && LAYERS[idx + n].plane === plane) n++;
  planeGroups.push({ plane, start: idx, count: n });
  idx += n;
}
planeGroups.forEach(({ plane, start, count }) => {
  const y = ROWS_Y + start * ROW_H;
  const h = count * ROW_H;
  const { label, hue, note, icon } = PLANES[plane];
  p(`<rect x="${M}" y="${y + 3}" width="${PLANE_W - 14}" height="${h - 6}" rx="10" fill="${hue}" fill-opacity="0.10" stroke="${hue}" stroke-opacity="0.45"/>`);
  p(drawIcon(icon, M + 16, y + 16, 24, hue));
  p(`<text x="${M + 16}" y="${y + 62}" font-size="17" font-weight="700" fill="${hue}">${label}</text>`);
  const words = note.split(' ');
  let line = '', ln = 0;
  words.forEach((w) => {
    if ((line + ' ' + w).trim().length > 15) { p(`<text x="${M + 16}" y="${y + 82 + ln * 15}" font-size="12" fill="#64748b">${esc(line.trim())}</text>`); line = w; ln++; }
    else line += ' ' + w;
  });
  if (line.trim()) p(`<text x="${M + 16}" y="${y + 82 + ln * 15}" font-size="12" fill="#64748b">${esc(line.trim())}</text>`);
});

// Layer rows
LAYERS.forEach((layer, i) => {
  const y = ROWS_Y + i * ROW_H;
  const hue = PLANES[layer.plane].hue;
  const xLayer = M + PLANE_W;
  const xCM = xLayer + LAYER_W;

  p(`<rect x="${xLayer}" y="${y + 3}" width="${GRID_X - xLayer - 10}" height="${ROW_H - 6}" rx="9" fill="#f8fafc" stroke="#e2e8f0"/>`);
  p(`<rect x="${xLayer}" y="${y + 3}" width="5" height="${ROW_H - 6}" rx="2.5" fill="${hue}"/>`);

  // Line 1: layer icon, code, name.
  p(`<rect x="${xLayer + 16}" y="${y + 12}" width="30" height="30" rx="8" fill="${hue}" fill-opacity="0.12"/>`);
  p(drawIcon(LAYER_ICONS[layer.code], xLayer + 20, y + 15, 22, hue));
  p(`<text x="${xLayer + 56}" y="${y + 27}" font-size="13" font-weight="700" fill="${hue}">${layer.code}</text>`);
  p(`<text x="${xLayer + 56}" y="${y + 33}" font-size="0"> </text>`);
  p(`<text x="${xLayer + 94}" y="${y + 33}" font-size="17.5" font-weight="600" fill="#0f172a">${esc(layer.name)}</text>`);

  // Below the name: the market products as monogram chips, one line per category.
  const chipRows = layer.prod ?? [];
  chipRows.forEach((line, j) => {
    const [cat, rest] = line.split(/:\s(.+)/);
    const items = (rest ?? cat).split(/,\s(?![^(]*\))/).map((s) => s.trim()).filter(Boolean);
    const rowY = y + 50 + j * 22;
    p(`<text x="${xLayer + 20}" y="${rowY + 12}" font-size="10.5" font-weight="700" letter-spacing="0.6" fill="#94a3b8">${esc((rest ? cat : '').toUpperCase())}</text>`);
    let cx = rest ? xLayer + 118 : xLayer + 20;
    const maxX = xLayer + LAYER_W - 24;
    let hidden = 0;
    items.forEach((name) => {
      const w = 24 + textW(name, 11) + 10;
      if (cx + w > maxX) { hidden++; return; }
      p(`<rect x="${cx}" y="${rowY}" width="${w}" height="17" rx="8.5" fill="#ffffff" stroke="#e2e8f0"/>`);
      p(`<rect x="${cx + 3}" y="${rowY + 2.5}" width="12" height="12" rx="4" fill="${hue}" fill-opacity="0.16"/>`);
      p(`<text x="${cx + 9}" y="${rowY + 11.5}" font-size="7" font-weight="700" fill="${hue}" text-anchor="middle">${esc(monogram(name))}</text>`);
      p(`<text x="${cx + 19}" y="${rowY + 12.5}" font-size="11" fill="#334155">${esc(name)}</text>`);
      cx += w + 6;
    });
    if (hidden > 0) p(`<text x="${cx + 2}" y="${rowY + 12.5}" font-size="10.5" fill="#94a3b8">+${hidden}</text>`);
  });

  // Combined control point and mechanisms.
  p(drawIcon('shield', xCM, y + 15, 15, hue, 2.1));
  p(`<text x="${xCM + 21}" y="${y + 27}" font-size="14" font-weight="600" fill="#0f172a">${esc(layer.control)}</text>`);
  layer.mech.forEach((m, j) => {
    const my = y + 51 + j * 21;
    p(`<circle cx="${xCM + 6}" cy="${my - 4}" r="2.6" fill="${hue}" fill-opacity="0.75"/>`);
    p(`<text x="${xCM + 16}" y="${my}" font-size="12.5" fill="#475569">${esc(m)}</text>`);
  });

  // Concern matrix cells
  CONCERNS.forEach((c, ci) => {
    const cx = GRID_X + ci * CONCERN_W;
    const owns = c.owns.includes(layer.code);
    const enf = c.enforces.includes(layer.code);
    p(`<rect x="${cx}" y="${y + 3}" width="${CONCERN_W - 4}" height="${ROW_H - 6}" rx="7" fill="${owns ? hue : '#f8fafc'}" fill-opacity="${owns ? 0.18 : 1}" stroke="${owns ? hue : '#e2e8f0'}" stroke-opacity="${owns ? 0.6 : 1}"/>`);
    const ccx = cx + (CONCERN_W - 4) / 2;
    const ccy = y + ROW_H / 2;
    if (owns) {
      p(`<circle cx="${ccx}" cy="${ccy}" r="9" fill="${hue}"/>`);
      p(`<text x="${ccx}" y="${ccy + 4.5}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">O</text>`);
    } else if (enf) {
      p(`<circle cx="${ccx}" cy="${ccy}" r="8" fill="none" stroke="${hue}" stroke-width="2.4"/>`);
    } else {
      p(`<circle cx="${ccx}" cy="${ccy}" r="2.2" fill="#cbd5e1"/>`);
    }
  });
});

// Products that serve the cross-cutting concerns
p(`<rect x="${M}" y="${CPROD_Y}" width="${W - 2 * M}" height="${CPROD_H}" rx="12" fill="#f8fafc" stroke="#e2e8f0"/>`);
p(`<text x="${M + 24}" y="${CPROD_Y + 30}" font-size="16" font-weight="700" fill="#0f172a">Products serving the cross-cutting concerns</text>`);
p(`<text x="${M + 24}" y="${CPROD_Y + 50}" font-size="12.5" fill="#64748b">Concerns are properties, not products. These are the categories that carry them; the enforcement point still sits where the matrix above says it does.</text>`);
{
  const colW = (W - 2 * M - 48) / 2;
  CONCERN_PRODUCTS.forEach(([name, prods], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = M + 24 + col * colW;
    const cy = CPROD_Y + 74 + row * 19;
    p(`<text x="${cx}" y="${cy}" font-size="12" font-weight="700" fill="#334155">${esc(name)}</text>`);
    p(`<text x="${cx + 168}" y="${cy}" font-size="12" fill="#64748b">${esc(prods)}</text>`);
  });
}

// Deterministic zones
p(`<rect x="${M}" y="${ZONE_Y}" width="${W - 2 * M}" height="${ZONE_H}" rx="12" fill="#0f172a"/>`);
p(`<text x="${M + 24}" y="${ZONE_Y + 32}" font-size="17" font-weight="700" fill="#ffffff">Four deterministic zones. Models may inform, never decide.</text>`);
p(`<text x="${M + 24}" y="${ZONE_Y + 54}" font-size="13.5" fill="#94a3b8">These hold under every layer above. Three of the four already run machine-learning signals inside them; the decision rule stays deterministic.</text>`);
const zw = (W - 2 * M - 48) / 4;
ZONES.forEach(([name, detail], i) => {
  const zx = M + 24 + i * zw;
  p(`<text x="${zx}" y="${ZONE_Y + 84}" font-size="14" font-weight="700" fill="#f8fafc">${esc(name)}</text>`);
  p(`<text x="${zx}" y="${ZONE_Y + 103}" font-size="11.5" fill="#94a3b8">${esc(detail)}</text>`);
});

// Legend
const ly = ZONE_Y + ZONE_H + 34;
p(`<circle cx="${M + 8}" cy="${ly - 4}" r="9" fill="#334155"/>`);
p(`<text x="${M + 8}" y="${ly + 0.5}" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">O</text>`);
p(`<text x="${M + 26}" y="${ly}" font-size="13.5" fill="#334155">Owns the concern: defines the requirement and holds accountability</text>`);
p(`<circle cx="${M + 468}" cy="${ly - 4}" r="8" fill="none" stroke="#334155" stroke-width="2.4"/>`);
p(`<text x="${M + 486}" y="${ly}" font-size="13.5" fill="#334155">Enforces it: where a violation is actually stopped</text>`);
p(`<circle cx="${M + 872}" cy="${ly - 4}" r="2.2" fill="#cbd5e1"/>`);
p(`<text x="${M + 886}" y="${ly}" font-size="13.5" fill="#334155">Inherits it: must carry the property through without weakening it</text>`);
p(`<text x="${W - M}" y="${ly}" font-size="12.5" fill="#94a3b8" text-anchor="end">Inheritance is where most defects live, because it fails silently.</text>`);

p(`</svg>`);

await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, out.join('\n'));
console.log(`build-wall-chart: ${W} x ${H} written to public/diagrams/target-state.svg`);
