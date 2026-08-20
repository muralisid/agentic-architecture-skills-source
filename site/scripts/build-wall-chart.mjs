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

// Palette matches the site's semantic figure colours.
const PLANES = {
  execution: { label: 'Execution', hue: '#8b5cf6', note: 'Where agent work runs' },
  action: { label: 'Action', hue: '#3b82f6', note: 'How agents reach systems' },
  knowledge: { label: 'Knowledge', hue: '#14b8a6', note: 'What agents know' },
  control: { label: 'Control', hue: '#64748b', note: 'What is allowed' },
  improvement: { label: 'Improvement', hue: '#a855f7', note: 'How behaviour changes' },
  evidence: { label: 'Evidence', hue: '#0ea5e9', note: 'What you can prove' },
  human: { label: 'Human', hue: '#f59e0b', note: 'Who decides and answers' },
};

const LAYERS = [
  { code: 'R01', name: 'Infrastructure and compute', plane: 'execution',
    control: 'Capability-tiered isolation and egress allowlists',
    mech: ['microVM sandboxes', 'Workload identity (ID2 floor)', 'Durable, resumable sessions'] },
  { code: 'R07', name: 'Agent platform', plane: 'execution',
    control: 'Harness caps and eval-gated registry promotion',
    mech: ['Explicit termination', 'Artifacts-as-state', 'Separate verification path'] },
  { code: 'R03', name: 'Integration fabric', plane: 'action',
    control: 'One gateway is the single enforcement point',
    mech: ['MCP tool contract', 'Token exchange, OBO', 'Idempotency and receipts'] },
  { code: 'R04', name: 'Systems of record', plane: 'action',
    control: 'Entitlement stays in the record system',
    mech: ['Run-as-user', 'Consequence-class write gates', 'Eval gate on vendor releases'] },
  { code: 'R05', name: 'Line of business and OT', plane: 'action',
    control: 'Information path only; operator holds authority',
    mech: ['Validation loop before display', 'Alert channel, not alarms', 'Tested revert-to-manual'] },
  { code: 'R02', name: 'Data platform', plane: 'knowledge',
    control: 'Fail-close ACL pre-filter inside the query',
    mech: ['Permission crawl into index', 'Semantic contracts', 'CDC-fed freshness'] },
  { code: 'R14', name: 'Agent data engineering', plane: 'knowledge',
    control: 'Provenance at parse time; erasure cascades',
    mech: ['Version-stamped embeddings', 'Memory write quarantine', 'Deleted-vector exclusion sets'] },
  { code: 'R10', name: 'Security and identity', plane: 'control',
    control: 'Deterministic PDP on every consequential action',
    mech: ['JIT least privilege', 'Short-lived credentials', 'Guardrails advisory only'] },
  { code: 'R11', name: 'Governance, risk, sovereignty', plane: 'control',
    control: 'Registry, evidence tier, kill switch before autonomy',
    mech: ['Autonomy risk tiers', 'Evidence floor and Article-12 tier', 'Classification-routed deployment'] },
  { code: 'R06', name: 'Intelligence and learning', plane: 'improvement',
    control: 'Counterexample-gated promotion with a demotion path',
    mech: ['Expert-owned eval bar', 'Calibrated, pinned judges', 'Optimizer and evaluator decoupled'] },
  { code: 'R12', name: 'Observability and FinOps', plane: 'evidence',
    control: 'Collection outside the agent; hard budget caps',
    mech: ['Session, model, tool spans', 'Schema translation layer', 'Shadow, canary, full'] },
  { code: 'R08', name: 'Productivity and collaboration', plane: 'human',
    control: 'Access identity default; presence by exception',
    mech: ['Service principal + sponsor', 'Presence by capability surface', 'Shadow-usage telemetry'] },
  { code: 'R09', name: 'Experience and channels', plane: 'human',
    control: 'Separate edge on the shared control plane',
    mech: ['Disclosure at first contact', 'Escalation to a staffed queue', 'Resolution, not containment'] },
  { code: 'R13', name: 'Supervision and oversight', plane: 'human',
    control: 'Burst-rate oversight capacity, never a daily average',
    mech: ['Fan-out incl. wait time', 'Escalation mix by trigger', 'Alarms on alarms'] },
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

const ZONES = [
  ['Access and entitlements', 'Rule over verified identity; risk scores advise'],
  ['Movement of money', 'Scoped, revocable mandates; fraud models advise'],
  ['Safety actuation', 'Standards exclude ML from the function itself'],
  ['Formal regulatory records', 'Drafting permitted; attestation is human'],
];

// Geometry
const M = 44;
const HEADER_H = 176;
const ROW_H = 74;
const PLANE_W = 142;
const CODE_W = 74;
const NAME_W = 268;
const CTRL_W = 396;
const MECH_W = 452;
const CONCERN_W = 52;
const CONCERN_HEAD_H = 196;
const GRID_X = M + PLANE_W + CODE_W + NAME_W + CTRL_W + MECH_W;
const GRID_W = CONCERN_W * CONCERNS.length;
const ROWS_Y = M + HEADER_H + CONCERN_HEAD_H;
const ROWS_H = ROW_H * LAYERS.length;
const ZONE_Y = ROWS_Y + ROWS_H + 56;
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
  [M + PLANE_W, 'LAYER'],
  [M + PLANE_W + CODE_W + NAME_W, 'CONTROL POINT'],
  [M + PLANE_W + CODE_W + NAME_W + CTRL_W, 'KEY MECHANISMS'],
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
  const { label, hue, note } = PLANES[plane];
  p(`<rect x="${M}" y="${y + 3}" width="${PLANE_W - 14}" height="${h - 6}" rx="10" fill="${hue}" fill-opacity="0.10" stroke="${hue}" stroke-opacity="0.45"/>`);
  p(`<text x="${M + 16}" y="${y + 28}" font-size="17" font-weight="700" fill="${hue}">${label}</text>`);
  const words = note.split(' ');
  let line = '', ln = 0;
  words.forEach((w) => {
    if ((line + ' ' + w).trim().length > 15) { p(`<text x="${M + 16}" y="${y + 50 + ln * 15}" font-size="12" fill="#64748b">${esc(line.trim())}</text>`); line = w; ln++; }
    else line += ' ' + w;
  });
  if (line.trim()) p(`<text x="${M + 16}" y="${y + 50 + ln * 15}" font-size="12" fill="#64748b">${esc(line.trim())}</text>`);
});

// Layer rows
LAYERS.forEach((layer, i) => {
  const y = ROWS_Y + i * ROW_H;
  const hue = PLANES[layer.plane].hue;
  const xCode = M + PLANE_W;
  const xName = xCode + CODE_W;
  const xCtrl = xName + NAME_W;
  const xMech = xCtrl + CTRL_W;

  p(`<rect x="${xCode}" y="${y + 3}" width="${GRID_X - xCode - 10}" height="${ROW_H - 6}" rx="9" fill="#f8fafc" stroke="#e2e8f0"/>`);
  p(`<rect x="${xCode}" y="${y + 3}" width="5" height="${ROW_H - 6}" rx="2.5" fill="${hue}"/>`);
  p(`<text x="${xCode + 18}" y="${y + 43}" font-size="15" font-weight="700" fill="${hue}">${layer.code}</text>`);
  p(`<text x="${xName}" y="${y + 43}" font-size="17" font-weight="600" fill="#0f172a">${esc(layer.name)}</text>`);
  p(`<text x="${xCtrl}" y="${y + 39}" font-size="14.5" fill="#0f172a">${esc(layer.control)}</text>`);
  layer.mech.forEach((m, j) => {
    const mx = xMech;
    const my = y + 18 + j * 15.5;
    p(`<circle cx="${mx + 4}" cy="${my - 4}" r="2.6" fill="${hue}" fill-opacity="0.75"/>`);
    p(`<text x="${mx + 14}" y="${my}" font-size="12.5" fill="#475569">${esc(m)}</text>`);
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
