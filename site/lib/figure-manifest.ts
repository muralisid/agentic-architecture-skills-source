export type FigureCategory = 'foundation' | 'layer' | 'blueprint' | 'support';

export type FigureType =
  | 'architecture'
  | 'comparison'
  | 'flow'
  | 'funnel'
  | 'journey'
  | 'loop'
  | 'map'
  | 'matrix'
  | 'profile'
  | 'scorecard'
  | 'spectrum'
  | 'stack'
  | 'storyboard'
  | 'swimlane'
  | 'timeline';

export type EvidenceStatus =
  | 'conceptual-guide'
  | 'primary-source'
  | 'independently-measured'
  | 'vendor-reported'
  | 'preprint-or-prototype'
  | 'author-position'
  | 'no-published-precedent'
  | 'mixed-evidence';

export type VisualNodeKind = 'human' | 'agent' | 'system' | 'control' | 'evidence' | 'risk' | 'neutral';
export type VisualEdgeKind = 'action' | 'advisory' | 'evidence' | 'feedback' | 'blocked';

export interface FigureSource {
  label: string;
  href: string;
  kind?: 'guide' | 'standard' | 'research' | 'vendor' | 'maintainer';
}

export interface VisualNode {
  id: string;
  label: string;
  detail?: string;
  kind?: VisualNodeKind;
  group?: string;
  emphasis?: boolean;
}

export interface VisualEdge {
  from: string;
  to: string;
  label?: string;
  kind?: VisualEdgeKind;
}

export interface VisualStage {
  label: string;
  detail: string;
  kind?: VisualNodeKind;
  gate?: string;
}

export interface VisualColumn {
  label: string;
  detail?: string;
  items: string[];
  kind?: VisualNodeKind;
}

export interface VisualLane {
  label: string;
  kind?: VisualNodeKind;
  steps: string[];
}

export interface VisualMetric {
  label: string;
  value: string;
  detail?: string;
  direction?: 'up' | 'down' | 'balanced';
}

export interface VisualCell {
  row: string;
  column: string;
  label: string;
  detail?: string;
  emphasis?: boolean;
}

export interface VisualItem {
  label: string;
  detail?: string;
  kind?: VisualNodeKind;
  active?: boolean;
}

export interface SemanticVisualData {
  nodes?: VisualNode[];
  edges?: VisualEdge[];
  stages?: VisualStage[];
  columns?: VisualColumn[];
  lanes?: VisualLane[];
  metrics?: VisualMetric[];
  rows?: string[];
  axisColumns?: string[];
  cells?: VisualCell[];
  items?: VisualItem[];
  note?: string;
}

export interface FigureManifestEntry {
  id: string;
  category: FigureCategory;
  page: string;
  placement: string;
  /** Provenance note only; no build step matches it against document headings. */
  sourceHeading?: string;
  anchor?: string;
  title: string;
  takeaway: string;
  caption: string;
  alt: string;
  longDescription?: string;
  type: FigureType;
  evidenceStatus: EvidenceStatus;
  dataBearing: boolean;
  sources: FigureSource[];
  reviewedAt: string;
  data: SemanticVisualData;
}

const reviewedAt = '2026-08-20';

const guideSource = (label: string, href: string): FigureSource => ({ label, href, kind: 'guide' });

function describeVisualData(data: SemanticVisualData): string {
  const parts: string[] = [];

  if (data.stages?.length) {
    parts.push(`The sequence contains ${data.stages.length} stages: ${data.stages.map((stage, index) => `${index + 1}, ${stage.label}: ${stage.detail}${stage.gate ? `, followed by the ${stage.gate} gate` : ''}`).join('; ')}.`);
  }
  if (data.columns?.length) {
    parts.push(`The comparison contains ${data.columns.length} groups: ${data.columns.map((column) => `${column.label}, containing ${column.items.join(', ')}`).join('; ')}.`);
  }
  if (data.lanes?.length) {
    parts.push(`The swimlane assigns work as follows: ${data.lanes.map((lane) => `${lane.label}: ${lane.steps.join(' then ')}`).join('; ')}.`);
  }
  if (data.metrics?.length) {
    parts.push(`The scorecard calls for ${data.metrics.map((metric) => `${metric.label}${metric.detail ? ` (${metric.detail})` : ''}`).join(', ')}.`);
  }
  if (data.rows?.length && data.axisColumns?.length) {
    parts.push(`The matrix crosses ${data.rows.join(', ')} with ${data.axisColumns.join(', ')}. Annotated cells are ${data.cells?.map((cell) => `${cell.row} by ${cell.column}: ${cell.label}${cell.detail ? `: ${cell.detail}` : ''}`).join('; ') || 'none'}.`);
  }
  if (data.nodes?.length) {
    parts.push(`The map contains ${data.nodes.map((node) => `${node.label}${node.detail ? `: ${node.detail}` : ''}`).join('; ')}.`);
  }
  if (data.edges?.length) {
    parts.push(`Its connections are ${data.edges.map((edge) => `${edge.from} to ${edge.to}${edge.label ? ` for ${edge.label}` : ''}`).join('; ')}.`);
  }
  if (data.items?.length) {
    const active = data.items.filter((item) => item.active).map((item) => item.label);
    parts.push(`The map lists ${data.items.map((item) => item.label).join(', ')}.${active.length ? ` The highlighted item is ${active.join(', ')}.` : ''}`);
  }
  if (data.note) parts.push(`Important boundary: ${data.note}`);

  return parts.join(' ');
}

const defineFigure = (
  input: Omit<FigureManifestEntry, 'reviewedAt' | 'longDescription'> & { longDescription?: string },
): FigureManifestEntry => ({
  ...input,
  anchor: input.anchor ?? `figure-${input.id}`,
  reviewedAt,
  longDescription:
    input.longDescription ??
    `${input.alt} ${describeVisualData(input.data)}`,
});

const foundationalFigures: FigureManifestEntry[] = [
  defineFigure({
    id: 'guide-decision-journey', category: 'foundation', page: '/architecture', placement: 'Five-minute visual primer', sourceHeading: 'The recommended journey',
    title: 'From intent to an investable agent programme', takeaway: 'Make the enterprise decisions in order; compare vendors last.',
    caption: 'Each step produces the input required by the next step.',
    alt: 'Eight-step journey from the enterprise vision through archetype, readiness, use-case portfolio, roadmap, architecture, blueprint, and vendor evaluation.',
    type: 'journey', evidenceStatus: 'conceptual-guide', dataBearing: false,
    sources: [guideSource('Guide introduction', '/docs')],
    data: { stages: [
      { label: 'Vision', detail: 'Define the target and accountable human role.', kind: 'human' },
      { label: 'Archetype', detail: 'Identify the enterprise’s structural constraints.', kind: 'system' },
      { label: 'Readiness', detail: 'Find the workload’s readiness and autonomy ceiling.', kind: 'control' },
      { label: 'Use-case portfolio', detail: 'Fund grounded, evaluable, governable outcomes.', kind: 'evidence' },
      { label: 'Roadmap', detail: 'Compose capability stages from gates, not dates.', kind: 'control' },
      { label: 'Architecture', detail: 'Apply the seven-plane target architecture.', kind: 'system' },
      { label: 'Blueprint', detail: 'Map the design into an operating scenario.', kind: 'human' },
      { label: 'Vendor evaluation', detail: 'Use disqualifiers before weighted scores.', kind: 'agent' },
    ] },
  }),
  defineFigure({
    id: 'layers-planes-crosswalk', category: 'foundation', page: '/architecture', placement: 'Architecture orientation', sourceHeading: 'Architecture chapters',
    title: 'Fourteen estate layers, seven agent-system planes', takeaway: 'Layers describe what the enterprise owns; planes describe how governed agent work operates across it.',
    caption: 'A layer can contribute to more than one plane; the planes cut across the estate rather than containing its layers.',
    alt: 'Crosswalk matrix showing fourteen enduring enterprise layers down the rows and seven agent-system planes across the columns, with several layers contributing to multiple planes.',
    type: 'matrix', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Master target-state architecture', '/docs/architecture/master-target-state')],
    data: {
      rows: ['R01 Infrastructure', 'R02 Data platform', 'R03 Integration fabric', 'R04 Systems of record', 'R05 LOB and OT', 'R06 Intelligence and learning', 'R07 Agent platform', 'R08 Productivity and collaboration', 'R09 Experience and channels', 'R10 Security and identity', 'R11 Governance, risk and sovereignty', 'R12 Observability and FinOps', 'R13 Operating model', 'R14 Agent data engineering'],
      axisColumns: ['Execution', 'Action', 'Knowledge', 'Control', 'Improvement', 'Evidence', 'Human'],
      cells: [
        { row: 'R01 Infrastructure', column: 'Execution', label: 'Runtime and model serving' },
        { row: 'R02 Data platform', column: 'Knowledge', label: 'Governed source data' },
        { row: 'R03 Integration fabric', column: 'Action', label: 'Gateway and tool path' },
        { row: 'R04 Systems of record', column: 'Action', label: 'Authoritative action boundary' },
        { row: 'R05 LOB and OT', column: 'Action', label: 'Operational actuation boundary' },
        { row: 'R06 Intelligence and learning', column: 'Improvement', label: 'Evaluation and promotion' },
        { row: 'R07 Agent platform', column: 'Execution', label: 'Agent runtime' },
        { row: 'R07 Agent platform', column: 'Control', label: 'Registry and runtime controls' },
        { row: 'R08 Productivity and collaboration', column: 'Human', label: 'Human work surface' },
        { row: 'R09 Experience and channels', column: 'Human', label: 'Customer and employee edge' },
        { row: 'R10 Security and identity', column: 'Control', label: 'Identity and policy' },
        { row: 'R11 Governance, risk and sovereignty', column: 'Control', label: 'Risk and sovereignty rules' },
        { row: 'R11 Governance, risk and sovereignty', column: 'Evidence', label: 'Decision and consultation records' },
        { row: 'R12 Observability and FinOps', column: 'Evidence', label: 'Independent traces and cost' },
        { row: 'R13 Operating model', column: 'Human', label: 'Accountability and supervision' },
        { row: 'R14 Agent data engineering', column: 'Knowledge', label: 'Curation and memory' },
        { row: 'R14 Agent data engineering', column: 'Improvement', label: 'Eval-data flywheel' },
      ],
      note: 'The cells show primary contributions, not exclusive ownership. Every deployed workload uses all seven planes across the relevant estate layers.',
    },
  }),
  defineFigure({
    id: 'factory-to-knowledge-work', category: 'foundation', page: '/architecture', placement: 'Opening story', sourceHeading: 'The factory floor',
    title: 'The factory metaphor, used carefully', takeaway: 'The defensible analogy is changed human work and a different failure model, not a headcount forecast.',
    caption: 'People set intent, supervise quality, resolve exceptions, reconfigure the system, and remain accountable.',
    alt: 'Two-column storyboard comparing an automated bottling line with agent-supported knowledge work and highlighting the same residual human responsibilities.',
    type: 'storyboard', evidenceStatus: 'mixed-evidence', dataBearing: true,
    sources: [guideSource('Vision and target state', '/docs/architecture/vision-and-target-state')],
    data: { columns: [
      { label: 'Factory floor', items: ['System holds the plan', 'Machines execute routine flow', 'People clear jams and protect quality'], kind: 'system' },
      { label: 'Knowledge work', items: ['Systems of record hold commitments', 'Agents execute routine work', 'People judge exceptions and hold accountability'], kind: 'human' },
    ], note: 'This visual makes no claim about workforce size or adoption speed.' },
  }),
  defineFigure({
    id: 'governed-agent-operating-loop', category: 'foundation', page: '/architecture', placement: 'Definition of an agentic enterprise', sourceHeading: 'What "agentic enterprise" means',
    title: 'The governed agent operating loop', takeaway: 'Agent work is useful only when intent, policy, evidence, and improvement close the loop.',
    caption: 'Probabilistic execution sits inside deterministic permissions and an accountable human operating model.',
    alt: 'Circular operating loop from human intent to agent planning, policy-gated action, evidence capture, evaluation, and governed improvement.',
    type: 'loop', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Vision and target state', '/docs/architecture/vision-and-target-state')],
    data: { stages: [
      { label: 'Set intent', detail: 'A named human defines purpose and limits.', kind: 'human' },
      { label: 'Plan', detail: 'The agent selects the next bounded action.', kind: 'agent' },
      { label: 'Authorize', detail: 'Deterministic policy permits or blocks it.', kind: 'control' },
      { label: 'Act', detail: 'A governed API changes the system.', kind: 'system' },
      { label: 'Observe', detail: 'Independent traces preserve evidence.', kind: 'evidence' },
      { label: 'Improve', detail: 'Judged changes promote through evals.', kind: 'agent' },
    ] },
  }),
  defineFigure({
    id: 'four-deterministic-zones', category: 'foundation', page: '/architecture/deterministic-zones', placement: 'What stays human', sourceHeading: 'What stays human',
    title: 'Four deterministic decision zones', takeaway: 'Models may prepare evidence, but the final authorization remains outside the model.',
    caption: 'Access, money, safety actuation, and formal records require deterministic enforcement.',
    alt: 'Four guarded zones for access control, movement of money, safety actuation, and formal regulatory records surrounding a probabilistic reasoning area.',
    type: 'map', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Vision and target state', '/docs/architecture/vision-and-target-state')],
    data: { items: [
      { label: 'Access and entitlements', detail: 'Identity systems decide.', kind: 'control' },
      { label: 'Movement of money', detail: 'Mandates and payment rails decide.', kind: 'control' },
      { label: 'Safety actuation', detail: 'Rules, interlocks, or validated simulation decide.', kind: 'control' },
      { label: 'Formal records', detail: 'Authorized systems and accountable sign-off decide.', kind: 'control' },
      { label: 'Probabilistic reasoning', detail: 'Agents assemble options and evidence inside the boundary.', kind: 'agent', active: true },
    ] },
  }),
  defineFigure({
    id: 'autonomy-learning-matrix', category: 'foundation', page: '/architecture/autonomy-contract', placement: 'Model overview', sourceHeading: 'Why another maturity model',
    title: 'The A×L maturity matrix', takeaway: 'Autonomy and learning are independent; higher is not automatically better.',
    caption: 'Choose the cell that is justified for a workload rather than treating the top-right as a destination.',
    alt: 'Six autonomy levels A0 through A5 crossed with four learning levels L0 through L3, with governed scaling emphasized in the middle of the matrix.',
    type: 'matrix', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('A×L maturity model', '/docs/architecture/maturity-model')],
    data: { rows: ['A0 Manual', 'A1 Assisted', 'A2 Delegated tasks', 'A3 Supervised autonomy', 'A4 Managed autonomy', 'A5 Governed lights-out'], axisColumns: ['L0 Fixed policy', 'L1 Curated learning', 'L2 Governed learning', 'L3 Continuous learning'], cells: [
      { row: 'A2 Delegated tasks', column: 'L1 Curated learning', label: 'Common starting point', emphasis: true },
      { row: 'A4 Managed autonomy', column: 'L2 Governed learning', label: 'Oversight gate', emphasis: true },
      { row: 'A5 Governed lights-out', column: 'L3 Continuous learning', label: 'Rare and domain-scoped' },
    ] },
  }),
  defineFigure({
    id: 'oversight-burst-capacity', category: 'foundation', page: '/architecture/autonomy-contract', placement: 'A4 oversight gate', sourceHeading: 'The oversight-capacity gate on A4 and above',
    title: 'Design oversight for bursts, not averages', takeaway: 'Exception demand is uneven, so safe autonomy depends on recoverable surge capacity.',
    caption: 'The diagram deliberately avoids inventing a universal agents-per-supervisor ratio.',
    alt: 'Timeline of low routine exception demand interrupted by a correlated incident burst that exceeds ordinary human review capacity and triggers degraded mode.',
    type: 'profile', evidenceStatus: 'no-published-precedent', dataBearing: false,
    sources: [guideSource('A×L maturity model', '/docs/architecture/maturity-model')],
    data: { stages: [
      { label: 'Routine', detail: 'Exceptions arrive within staffed capacity.', kind: 'human' },
      { label: 'Weak signal', detail: 'Several agents encounter the same upstream fault.', kind: 'risk' },
      { label: 'Burst', detail: 'Correlated exceptions exceed the normal queue.', kind: 'risk', gate: 'Capacity threshold' },
      { label: 'Degrade safely', detail: 'Pause, narrow permissions, or return work to people.', kind: 'control' },
      { label: 'Recover', detail: 'Clear backlog and verify before restoring autonomy.', kind: 'evidence' },
    ], note: 'Measure arrival shape, handling time, and recoverability for each workload.' },
  }),
  defineFigure({
    id: 'enterprise-archetype-grid', category: 'foundation', page: '/architecture', placement: 'Archetype selection', sourceHeading: 'Two axes, not three personas',
    title: 'Enterprise archetypes by size and vendor gravity', takeaway: 'Size and regulatory intensity predict the estate; incumbent vendor gravity shapes the starting shortlist and integration surface, not the outcome.',
    caption: 'The four worked cells are examples on two axes. Apply a cell per operating unit when one enterprise spans several contexts.',
    alt: 'Archetype matrix crossing size and regulatory intensity with incumbent vendor gravity for four worked cells: two large-enterprise patterns, mid-market, and digital native.',
    type: 'matrix', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Enterprise archetype grid', '/docs/architecture/archetype-grid')],
    data: { rows: ['Large and/or heavily regulated', 'Mid-market', 'Digital native'], axisColumns: ['Microsoft + SAP gravity', 'Salesforce gravity', 'Microsoft gravity', 'Cloud-native gravity'], cells: [
      { row: 'Large and/or heavily regulated', column: 'Microsoft + SAP gravity', label: 'Cell 1 · Global regulated', detail: 'Two estates, sovereignty routing, evidence duties', emphasis: true },
      { row: 'Large and/or heavily regulated', column: 'Salesforce gravity', label: 'Cell 2 · Large customer-operations enterprise', detail: 'CRM-led shortlist, fragmented back office' },
      { row: 'Mid-market', column: 'Microsoft gravity', label: 'Cell 3 · Mid-market', detail: 'Bundled agents and thin platform capacity' },
      { row: 'Digital native', column: 'Cloud-native gravity', label: 'Cell 4 · Digital native', detail: 'API-first estate, governance behind capability' },
    ] },
  }),
  defineFigure({
    id: 'seven-plane-architecture', category: 'foundation', page: '/architecture', placement: 'Common frame', sourceHeading: 'The common frame: seven planes',
    title: 'The seven-plane target architecture', takeaway: 'Enforcement and evidence must remain outside the agent’s influence.',
    caption: 'The same seven planes apply to every archetype; their contents and operating ownership differ.',
    alt: 'Seven horizontal architecture planes for execution, action, knowledge, control, improvement, evidence, and human accountability, connected by policy and trace flows.',
    type: 'architecture', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Master target-state architecture', '/docs/architecture/master-target-state')],
    data: { nodes: [
      { id: 'execution', label: 'Execution plane', detail: 'Runtimes and durable sessions', kind: 'agent', group: 'Operate' },
      { id: 'action', label: 'Action plane', detail: 'Gateways and governed APIs', kind: 'system', group: 'Operate' },
      { id: 'knowledge', label: 'Knowledge plane', detail: 'Curated corpora and memory', kind: 'evidence', group: 'Operate' },
      { id: 'control', label: 'Control plane', detail: 'Identity, policy, approvals, budgets', kind: 'control', group: 'Govern' },
      { id: 'improvement', label: 'Improvement plane', detail: 'Evals, promotion, demotion', kind: 'agent', group: 'Learn' },
      { id: 'evidence', label: 'Evidence plane', detail: 'Independent traces and records', kind: 'evidence', group: 'Prove' },
      { id: 'human', label: 'Human plane', detail: 'Intent, accountability, exceptions', kind: 'human', group: 'Accountability' },
    ], edges: [
      { from: 'human', to: 'control', label: 'intent and mandate', kind: 'action' },
      { from: 'control', to: 'action', label: 'deterministic permission', kind: 'action' },
      { from: 'execution', to: 'action', label: 'tool request', kind: 'advisory' },
      { from: 'action', to: 'evidence', label: 'immutable trace', kind: 'evidence' },
      { from: 'evidence', to: 'improvement', label: 'evaluation input', kind: 'feedback' },
    ] },
  }),
  defineFigure({
    id: 'three-target-architectures', category: 'foundation', page: '/architecture', placement: 'Architecture comparison', sourceHeading: 'Why there are three architectures and not one',
    title: 'One frame, three target architectures', takeaway: 'Use the same plane model but adapt ownership and controls to the enterprise’s real operating capacity.',
    caption: 'A global regulated enterprise, mid-market organisation, and digital native should not build the same control-plane implementation.',
    alt: 'Three side-by-side target architectures comparing global regulated, mid-market, and digital-native enterprises across defining constraint, control ownership, and primary gap.',
    type: 'comparison', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Master target-state architecture', '/docs/architecture/master-target-state')],
    data: { columns: [
      { label: 'Global regulated', items: ['Two estates at the edge', 'Independent control and evidence', 'Sovereignty routing from day one'], kind: 'control' },
      { label: 'Mid-market', items: ['Control plane is rented', 'Purpose-scoped curation is the build priority', 'Operate one independent capability at most'], kind: 'system' },
      { label: 'Digital native', items: ['Execution arrives first', 'Retrofit control and evidence now', 'Discipline is the limiting factor'], kind: 'agent' },
    ] },
  }),
  defineFigure({
    id: 'concerns-layer-heatmap', category: 'foundation', page: '/architecture/concern-matrix', placement: 'Matrix overview', sourceHeading: 'What this page is for',
    title: 'Cross-cutting concerns need named homes', takeaway: 'A concern that appears everywhere but is owned nowhere becomes a gap.',
    caption: 'The full accessible table remains the source of record beneath this orientation view.',
    alt: 'Heatmap concept showing identity, provenance, cost, evaluation, sovereignty, reversibility, and human oversight crossing all fourteen enterprise layers.',
    type: 'matrix', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Concerns-by-layers matrix', '/docs/architecture/concerns-by-layers-matrix')],
    data: { rows: ['Identity', 'Provenance', 'Evaluation', 'Cost', 'Sovereignty', 'Reversibility', 'Human oversight'], axisColumns: ['Runtime', 'Data', 'Action', 'Records', 'Channels', 'Governance'], cells: [
      { row: 'Identity', column: 'Action', label: 'Primary enforcement', emphasis: true },
      { row: 'Provenance', column: 'Data', label: 'Attach at parse time', emphasis: true },
      { row: 'Evaluation', column: 'Runtime', label: 'Pre-release gate' },
      { row: 'Cost', column: 'Runtime', label: 'Per-run budget' },
      { row: 'Sovereignty', column: 'Data', label: 'Classification route' },
      { row: 'Reversibility', column: 'Records', label: 'Compensating action' },
      { row: 'Human oversight', column: 'Governance', label: 'Named accountability', emphasis: true },
    ] },
  }),
  defineFigure({
    id: 'memory-obligation-tiers', category: 'foundation', page: '/architecture/data-to-memory', placement: 'Memory tiers', sourceHeading: 'Five tiers, and what actually feeds each',
    title: 'Memory persistence increases obligation', takeaway: 'More durable memory is not more intelligence; it is more ownership, consent, retention, and erasure work.',
    caption: 'The M1–M5 namespace keeps memory distinct from learning maturity.',
    alt: 'Five-tier memory stack from thread and retrieved knowledge through session, entity, and cross-domain memory, with obligations increasing as persistence rises.',
    type: 'stack', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Memory pipeline architecture', '/docs/architecture/memory-pipeline-architecture')],
    data: { stages: [
      { label: 'M1 Thread', detail: 'The current conversation or run.', kind: 'agent' },
      { label: 'M2 Retrieved knowledge', detail: 'Permission-aware evidence for the current turn.', kind: 'evidence', gate: 'Provenance on every span' },
      { label: 'M3 Session', detail: 'Bounded continuity across hours or days.', kind: 'agent', gate: 'Residency and retention' },
      { label: 'M4 Entity memory', detail: 'Durable profiles of customers, assets, cases, or employees.', kind: 'evidence', gate: 'Consent, ownership, and erasure' },
      { label: 'M5 Cross-domain', detail: 'Shared memory with the broadest blast radius.', kind: 'risk', gate: 'Strictest governance' },
    ] },
  }),
  defineFigure({
    id: 'data-to-memory-pipeline', category: 'foundation', page: '/architecture/data-to-memory', placement: 'End-to-end pipeline', sourceHeading: 'The pipeline, stage by stage',
    title: 'From source data to governed memory', takeaway: 'Permission, provenance, and classification travel with content from ingestion onward.',
    caption: 'Promotion to durable memory is gated; derived artifacts inherit the strictest source classification.',
    alt: 'Nine-stage data-to-memory pipeline covering source intake, permission capture, parsing, classification, curation, indexing, retrieval, promotion, and erasure propagation.',
    type: 'flow', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Memory pipeline architecture', '/docs/architecture/memory-pipeline-architecture')],
    data: { stages: [
      { label: 'Source', detail: 'Acquire governed content.', kind: 'system' },
      { label: 'Permissions', detail: 'Capture ACLs and purpose.', kind: 'control' },
      { label: 'Parse', detail: 'Attach provenance immediately.', kind: 'evidence' },
      { label: 'Classify', detail: 'Apply strictest inherited class.', kind: 'control' },
      { label: 'Curate', detail: 'Select for the use case.', kind: 'human' },
      { label: 'Index', detail: 'Build permission-aware retrieval.', kind: 'system' },
      { label: 'Retrieve', detail: 'Filter before model access.', kind: 'agent' },
      { label: 'Promote', detail: 'Gate durable memory changes.', kind: 'control' },
      { label: 'Erase', detail: 'Cascade deletion to derivatives.', kind: 'evidence' },
    ] },
  }),
  defineFigure({
    id: 'cost-per-resolved-outcome', category: 'foundation', page: '/layers/r12-observability-and-finops', placement: 'Economic unit', sourceHeading: 'Level 2: cost per resolved outcome',
    title: 'Measure cost per resolved outcome', takeaway: 'A cheap model call can still produce an expensive business outcome when loops, retries, and human recovery are ignored.',
    caption: 'The economic boundary includes execution, tools, retries, review, correction, and unresolved demand.',
    alt: 'Cost flow combining model and tool runs, retries, human review, correction, and repeat demand into one cost-per-resolved-outcome measure.',
    type: 'flow', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Agent economics model', '/docs/architecture/economics-model')],
    data: { stages: [
      { label: 'Run cost', detail: 'Models, tools, runtime, retrieval.', kind: 'agent' },
      { label: 'Loop multiplier', detail: 'Planning steps, retries, fallbacks.', kind: 'risk' },
      { label: 'Human handling', detail: 'Review, exceptions, correction.', kind: 'human' },
      { label: 'Outcome quality', detail: 'Resolved correctly and durably.', kind: 'evidence', gate: 'Resolution test' },
      { label: 'Repeat demand', detail: 'Recontacts and reopened work.', kind: 'risk' },
    ] },
  }),
  defineFigure({
    id: 'sovereignty-spectrum-router', category: 'foundation', page: '/layers/r11-governance-risk-sovereignty', placement: 'Sovereignty routing', sourceHeading: 'The deployment spectrum',
    title: 'Route workloads by sovereignty need', takeaway: 'Sovereignty is a workload constraint, not an enterprise maturity score.',
    caption: 'The SV0–SV4 namespace separates sovereignty from roadmap stages.',
    alt: 'Five-step sovereignty spectrum from a managed API with no locality guarantee to air-gapped isolated execution, selected by a workload-classification router.',
    type: 'spectrum', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Sovereignty matrix', '/docs/architecture/sovereignty-matrix')],
    data: { stages: [
      { label: 'SV0 Managed API', detail: 'Provider default footprint with no locality guarantee.', kind: 'system' },
      { label: 'SV1 Region-pinned API', detail: 'Managed processing and retention committed to one region.', kind: 'control' },
      { label: 'SV2 Managed sovereign offering', detail: 'Local operating and contractual controls under a sovereignty framework.', kind: 'control' },
      { label: 'SV3 Self-hosted in own tenancy', detail: 'Enterprise operates an open-weight model and serving stack.', kind: 'evidence' },
      { label: 'SV4 Air-gapped or isolated on premises', detail: 'No egress path; the network perimeter is the control.', kind: 'risk' },
    ], note: 'Classification and legal obligations select the tier; higher is not inherently better.' },
  }),
  defineFigure({
    id: 'identity-delegation-chain', category: 'foundation', page: '/architecture/identity-chain', placement: 'Delegation model', sourceHeading: 'The delegation chain',
    title: 'Identity follows the delegation chain', takeaway: 'Every consequential action must identify the agent, requesting person, sponsor, and granted scope.',
    caption: 'Entitlement decisions stay in the authoritative identity or record system.',
    alt: 'Delegation chain from accountable sponsor and requesting user through an individually registered agent identity to policy enforcement and the system of record.',
    type: 'flow', evidenceStatus: 'mixed-evidence', dataBearing: false,
    sources: [guideSource('Identity and security model', '/docs/architecture/identity-security-model')],
    data: { stages: [
      { label: 'Sponsor', detail: 'Owns purpose and risk.', kind: 'human' },
      { label: 'Requesting user', detail: 'Supplies authority for this task.', kind: 'human' },
      { label: 'ID2 production identity', detail: 'First-class IAM principal with task scope, audit, and named sponsor.', kind: 'agent' },
      { label: 'Policy decision', detail: 'Checks scope and context.', kind: 'control' },
      { label: 'System of record', detail: 'Makes final entitlement decision.', kind: 'system' },
      { label: 'Evidence record', detail: 'Binds action to the full chain.', kind: 'evidence' },
    ] },
  }),
  defineFigure({
    id: 'memory-learning-flywheel', category: 'foundation', page: '/architecture/learning-flywheel', placement: 'Learning overview', sourceHeading: 'Two loops, and they must be governed separately',
    title: 'Memory serves work; learning changes future work', takeaway: 'Do not let online memory updates silently become offline policy changes.',
    caption: 'Learning promotion passes through evaluation, approval, staged release, and a demotion path.',
    alt: 'Two connected loops separating online memory used during work from an offline learning loop that evaluates and promotes changes into governed enforcement.',
    type: 'loop', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Learning loops map', '/docs/architecture/learning-loops-map')],
    data: { columns: [
      { label: 'Online memory loop', items: ['Retrieve approved context', 'Execute bounded task', 'Capture candidate fact', 'Expire or queue for review'], kind: 'agent' },
      { label: 'Offline learning loop', items: ['Build eval case', 'Judge against counterexamples', 'Approve and stage', 'Promote or demote artifact'], kind: 'control' },
    ] },
  }),
  defineFigure({
    id: 'learning-promotion-pipeline', category: 'foundation', page: '/architecture/learning-flywheel', placement: 'Lifecycle and rollout',
    title: 'From trace to rollout, gated at every step', takeaway: 'A learning reaches production only through evaluation, versioning, and staged release, and it can always come back out.',
    caption: 'The promotion pipeline: evidence in, counterexample-gated, versioned outside the model, released in stages, demotable on staleness.',
    alt: 'Seven stages from captured trace through eval case, counterexample gate, versioning outside the model, shadow, canary, and full rollout with an armed demotion path.',
    type: 'flow', evidenceStatus: 'mixed-evidence', dataBearing: false,
    sources: [
      guideSource('Learning loops map', '/docs/architecture/learning-loops-map'),
      guideSource('Intelligence and learning findings', '/docs/layers/r06-intelligence-and-learning/findings'),
    ],
    data: { stages: [
      { label: 'Trace captured', detail: 'A production run lands in the shared trace and eval data layer.', kind: 'agent' },
      { label: 'Eval case built', detail: 'A failing online score promotes its own trace into the offline suite.', kind: 'evidence' },
      { label: 'Counterexample gate', detail: 'The candidate survives the counterexample suite with no eval regression; frequency alone never promotes.', kind: 'control', gate: 'Human review before approval' },
      { label: 'Versioned outside the model', detail: 'The approved artifact lands as policy-as-code or a pinned version, deployable and rollback-capable.', kind: 'control' },
      { label: 'Shadow', detail: 'Runs beside production, observed, with no effect on outcomes.', kind: 'neutral' },
      { label: 'Canary', detail: '1 to 5 percent of traffic, gated on session success, satisfaction, and escalation.', kind: 'neutral', gate: 'Flags decouple activation from deployment' },
      { label: 'Full, demotion armed', detail: 'Seven-day staleness re-evaluation; a failing score demotes the artifact while its eval case stays.', kind: 'evidence' },
    ] },
  }),
  defineFigure({
    id: 'framework-decision-sequence', category: 'foundation', page: '/decisions', placement: 'Framework overview', sourceHeading: 'Decision sequence',
    title: 'The framework sequence', takeaway: 'Readiness and portfolio choices are inputs to the roadmap, not optional companion exercises.',
    caption: 'The sequence prevents platform selection from leading the programme.',
    alt: 'Decision sequence from enterprise archetype to readiness profile, use-case gates, staged roadmap, target architecture, blueprint, and vendor evaluation.',
    type: 'journey', evidenceStatus: 'conceptual-guide', dataBearing: false,
    sources: [guideSource('Decision frameworks', '/docs/frameworks')],
    data: { stages: [
      { label: 'Archetype', detail: 'Identify structural constraint.', kind: 'system' },
      { label: 'Readiness', detail: 'Find workload ceiling.', kind: 'control' },
      { label: 'Portfolio', detail: 'Pass three admission gates.', kind: 'evidence' },
      { label: 'Roadmap', detail: 'Sequence capability stages.', kind: 'agent' },
      { label: 'Architecture', detail: 'Design seven planes.', kind: 'system' },
      { label: 'Blueprint', detail: 'Apply to the operating flow.', kind: 'human' },
      { label: 'Vendor', detail: 'Disqualify before scoring.', kind: 'control' },
    ] },
  }),
  defineFigure({
    id: 'readiness-six-dimension-profile', category: 'foundation', page: '/architecture/autonomy-contract', placement: 'Assessment overview', sourceHeading: 'The six dimensions',
    title: 'Readiness is a profile, not a total score', takeaway: 'The weakest relevant dimension constrains the workload’s autonomy ceiling.',
    caption: 'Keep the six dimensions visible instead of averaging away a critical gap.',
    alt: 'Six-part readiness profile covering data, integration, identity, operations, governance and value, and workforce without collapsing the dimensions into one score.',
    type: 'profile', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Readiness assessments', '/docs/frameworks/readiness-assessments')],
    data: { metrics: [
      { label: 'Data readiness', value: '0–3', detail: 'Quality, ownership, permissions, provenance' },
      { label: 'Integration readiness', value: '0–3', detail: 'Governed APIs, tools, and event access' },
      { label: 'Identity readiness', value: '0–3', detail: 'ID2 principals, delegation, secrets, sponsor' },
      { label: 'Operational discipline', value: '0–3', detail: 'Observability, evals, incidents, drift' },
      { label: 'Governance and value discipline', value: '0–3', detail: 'Intake, risk, value, and per-run cost' },
      { label: 'Workforce and operating model', value: '0–3', detail: 'Owners, supervision capacity, and change' },
    ] },
  }),
  defineFigure({
    id: 'use-case-three-gate-funnel', category: 'foundation', page: '/decisions', placement: 'Admission model', sourceHeading: 'The three admission gates',
    title: 'Three gates before funding', takeaway: 'A compelling demo is not enough; the use case must be evaluable, keep model judgment outside deterministic zones, and have a governable grounding corpus.',
    caption: 'A failed gate sends the use case to definition, redesign, or grounding preparation rather than into weighted scoring.',
    alt: 'Three-stage admission funnel testing evaluability, deterministic-zone boundaries, and grounding readiness before a use case enters the funded portfolio.',
    type: 'funnel', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Use-case portfolio', '/docs/frameworks/use-case-portfolio')],
    data: { stages: [
      { label: 'Gate 1 · Evaluability', detail: 'A domain SME can define pass-or-fail tasks and a baseline.', kind: 'human', gate: 'Make-it-evaluable queue' },
      { label: 'Gate 2 · Deterministic-zone check', detail: 'Model judgment does not decide access, money, safety, or formal records.', kind: 'control', gate: 'Redesign or reject' },
      { label: 'Gate 3 · Grounding readiness', detail: 'A purpose-scoped corpus can exist with a named owner.', kind: 'evidence', gate: 'Grounding preparation' },
      { label: 'Fundable portfolio', detail: 'Rank only the use cases that passed all gates.', kind: 'evidence' },
    ] },
  }),
  defineFigure({
    id: 'roadmap-six-stages', category: 'foundation', page: '/architecture/autonomy-contract', placement: 'Roadmap generator', sourceHeading: 'The spine',
    title: 'A capability-gated roadmap', takeaway: 'Advance when evidence gates pass, not because a calendar date arrives.',
    caption: 'Nine workload and enterprise modifiers shape the work inside each stage.',
    alt: 'Six-stage agentic-enterprise roadmap from Ground and First value through Platform, Scale, Autonomy, and Extend, with evidence gates between stages.',
    type: 'timeline', evidenceStatus: 'author-position', dataBearing: false,
    sources: [guideSource('Roadmap checklist', '/architecture/autonomy-contract')],
    data: { stages: [
      { label: 'Stage 0 · Ground', detail: 'Profile readiness, admit use cases, name sponsors, define deterministic zones.', kind: 'human' },
      { label: 'Stage 1 · First value', detail: 'Ship one evaluable A2 workload and measure resolved outcomes.', kind: 'agent', gate: 'Evidence floor' },
      { label: 'Stage 2 · Platform', detail: 'Establish control and knowledge planes with ID2 identities.', kind: 'control', gate: 'Control-plane proof' },
      { label: 'Stage 3 · Scale', detail: 'Expand the portfolio and operate governed learning and budgets.', kind: 'system', gate: 'Promotion and cost proof' },
      { label: 'Stage 4 · Autonomy', detail: 'Run A4 workloads only with measured burst supervision capacity.', kind: 'human', gate: 'Oversight-capacity proof' },
      { label: 'Stage 5 · Extend', detail: 'Open separate customer and OT lanes on the shared control plane.', kind: 'evidence', gate: 'Per-lane evidence' },
    ] },
  }),
  defineFigure({
    id: 'blueprint-anatomy', category: 'foundation', page: '/layers', placement: 'Blueprint overview', sourceHeading: 'How to read every blueprint',
    title: 'How to read every blueprint', takeaway: 'A blueprint connects one operating scenario to agents, deterministic controls, accountable people, evidence, economics, and honest limits.',
    caption: 'The same anatomy makes department and industry blueprints comparable.',
    alt: 'Blueprint anatomy flowing from scenario and desired outcome through agent and human swimlanes, deterministic gates, evidence, economics, metrics, and honest limits.',
    type: 'flow', evidenceStatus: 'conceptual-guide', dataBearing: false,
    sources: [guideSource('Blueprints', '/docs/blueprints')],
    data: { stages: [
      { label: 'Scenario', detail: 'A real trigger and resolved outcome.', kind: 'human' },
      { label: 'Work split', detail: 'Agent, human, and system responsibilities.', kind: 'agent' },
      { label: 'Controls', detail: 'Deterministic gates and evidence.', kind: 'control' },
      { label: 'Economics', detail: 'Cost per resolved outcome.', kind: 'system' },
      { label: 'Metrics', detail: 'Quality, intervention, repeat demand.', kind: 'evidence' },
      { label: 'Honest limits', detail: 'What must remain out of scope.', kind: 'risk' },
    ] },
  }),
];

interface LayerDefinition {
  id: string;
  title: string;
  current: string;
  target: string;
  foundation: string;
  pilot: string;
  scale: string;
  control: string;
}

const layers: LayerDefinition[] = [
  { id: 'r01-infrastructure', title: 'Infrastructure', current: 'Capacity is sized for applications and steady services.', target: 'Isolation and durability are tiered by agent capability and run risk.', foundation: 'Inventory runtime and model-serving constraints.', pilot: 'Isolate browsing, code, and computer-use workloads.', scale: 'Add durable sessions, routing, and resource budgets.', control: 'Capability-tiered sandbox and per-run budget' },
  { id: 'r02-data-platform', title: 'Data platform', current: 'Platforms optimize storage and analyst access.', target: 'Purpose-scoped, permission-aware products supply governed agent context.', foundation: 'Name data owners and classify sources.', pilot: 'Curate one corpus around one outcome.', scale: 'Automate permission sync and freshness evidence.', control: 'Fail-closed ACL filtering and provenance' },
  { id: 'r03-integration-fabric', title: 'Integration fabric', current: 'APIs integrate applications and human-led processes.', target: 'Tool gateways wrap governed APIs and carry delegated identity.', foundation: 'Inventory action APIs and compensating operations.', pilot: 'Expose read-only tools through the existing gateway.', scale: 'Add signed versions, allowlists, and policy enforcement.', control: 'Gateway policy outside the agent runtime' },
  { id: 'r04-systems-of-record', title: 'Systems of record', current: 'People enter commitments through application workflows.', target: 'Agents prepare structured changes while authoritative systems retain final rules.', foundation: 'Separate narrative fields from formal commitments.', pilot: 'Permit evidence-backed drafts and read access.', scale: 'Gate structured writes through native business rules.', control: 'Record-system validation and entitlement decision' },
  { id: 'r05-lob-and-ot', title: 'Line-of-business and OT', current: 'Operational decisions rely on specialist interfaces and deterministic control.', target: 'Agents advise through validated models without bypassing safety interlocks.', foundation: 'Classify safety and physical-world consequences.', pilot: 'Start read-only with shadow recommendations.', scale: 'Add rules or simulation before operator presentation.', control: 'Safety interlock and degraded mode' },
  { id: 'r06-intelligence-and-learning', title: 'Intelligence and learning', current: 'Models and analytics change through separate project cycles.', target: 'Traces become governed evals and judged improvements with rollback.', foundation: 'Define objective cases and pin judges.', pilot: 'Capture failures and candidate heuristics.', scale: 'Promote only after counterexample and regression gates.', control: 'Independent evaluator and demotion path' },
  { id: 'r07-agent-platform', title: 'Agent platform', current: 'Frameworks optimize prototypes and individual agent loops.', target: 'Registered, durable agents run with budgets, policy, and kill switches.', foundation: 'Choose the minimum runtime capability set.', pilot: 'Register owners, tools, models, and limits.', scale: 'Enforce budgets and resume long-running sessions safely.', control: 'Registry, policy decision point, and kill switch' },
  { id: 'r08-productivity-and-collaboration', title: 'Productivity and collaboration', current: 'Assistants improve solitary tasks inside licensed suites.', target: 'Coordinated workflows redesign handoffs while preserving shared context.', foundation: 'Separate solitary assistance from team workflow change.', pilot: 'Baseline cycle time and rework for one handoff.', scale: 'Redesign the operating process, not only prompts.', control: 'Shared-work ownership and outcome measurement' },
  { id: 'r09-experience-and-channels', title: 'Experience and channels', current: 'Channels route people to content, forms, and service teams.', target: 'Customer and employee lanes use different edges on a shared control plane.', foundation: 'Classify channel risk, identity, and disclosure.', pilot: 'Start with bounded, recoverable service journeys.', scale: 'Unify control and evidence while tuning each edge.', control: 'Channel-specific edge with shared policy' },
  { id: 'r10-security-and-identity', title: 'Security and identity', current: 'Human and service identities receive durable entitlements.', target: 'Agent, delegator, sponsor, and task scope form an attributable chain.', foundation: 'Register agents and assign accountable sponsors.', pilot: 'Issue short-lived, least-privilege delegated credentials.', scale: 'Continuously evaluate context and revoke quickly.', control: 'Deterministic identity and policy enforcement' },
  { id: 'r11-governance-risk-sovereignty', title: 'Governance, risk, and sovereignty', current: 'Committees review systems at milestones and by jurisdiction.', target: 'Risk tier, workload classification, evidence, and routing operate continuously.', foundation: 'Define risk tiers and prohibited actions.', pilot: 'Attach controls and evidence requirements per workload.', scale: 'Route by classification and monitor control drift.', control: 'Workload policy, sovereignty router, and stop authority' },
  { id: 'r12-observability-and-finops', title: 'Observability and FinOps', current: 'Telemetry measures service health and infrastructure spend.', target: 'Independent traces connect agent decisions, actions, outcomes, and total resolution cost.', foundation: 'Define the evidence floor and business outcome.', pilot: 'Capture model, tool, policy, and human events.', scale: 'Budget per run and optimize cost per resolved outcome.', control: 'Out-of-band evidence capture and budget enforcement' },
  { id: 'r13-operating-model', title: 'Operating model', current: 'Roles own processes while automation is configured as a tool.', target: 'Named sponsors set intent and teams operate exception, quality, and improvement queues.', foundation: 'Name accountable owners and exception handlers.', pilot: 'Instrument intervention demand and handling time.', scale: 'Design burst capacity, transfer, and degraded operation.', control: 'Named accountability and recoverable supervision' },
  { id: 'r14-agent-data-engineering', title: 'Agent data engineering', current: 'Pipelines publish datasets and indexes around source systems.', target: 'Purpose-scoped corpora carry permission, provenance, semantics, and erasure into every derivative.', foundation: 'Define purpose, owner, and source classification.', pilot: 'Build one curated, permission-aware pipeline.', scale: 'Propagate lineage, deletion, and evaluation changes.', control: 'Semantic contract and derivative erasure' },
];

const allLayerItems: VisualItem[] = layers.map((layer) => ({ label: layer.title, detail: layer.id.toUpperCase() }));

const layerFigures = layers.flatMap((layer, index): FigureManifestEntry[] => {
  const page = `/layers/${layer.id}`;
  const source = guideSource(`${layer.title} findings`, page);
  const prefix = `layer-${String(index + 1).padStart(2, '0')}`;
  return [
    defineFigure({
      id: `${prefix}-estate-map`, category: 'layer', page, placement: 'Layer primer', sourceHeading: '1. Current state',
      title: `${layer.title} in the enterprise landscape`, takeaway: `Locate ${layer.title.toLowerCase()} before making its agent-era design decisions.`,
      caption: `Layer ${index + 1} of 14 is highlighted while adjacent responsibilities remain visible.`,
      alt: `Fourteen-layer enterprise map with layer ${index + 1}, ${layer.title}, highlighted and the remaining thirteen layers shown for context.`,
      type: 'map', evidenceStatus: 'conceptual-guide', dataBearing: false, sources: [source],
      data: { items: allLayerItems.map((item, itemIndex) => ({ ...item, active: itemIndex === index })) },
    }),
    defineFigure({
      id: `${prefix}-current-target`, category: 'layer', page, placement: 'Current-to-target transition', sourceHeading: '2. What changes with agents',
      title: `${layer.title}: current state to agent-era target`, takeaway: layer.target,
      caption: `The transition preserves authoritative controls while changing how routine work is prepared and executed.`,
      alt: `Side-by-side comparison of the current ${layer.title.toLowerCase()} operating state and its governed agent-era target state.`,
      type: 'comparison', evidenceStatus: 'author-position', dataBearing: false, sources: [source],
      data: { columns: [
        { label: 'Current state', items: [layer.current], kind: 'neutral' },
        { label: 'Agent-era target', items: [layer.target, `Control: ${layer.control}`], kind: 'control' },
      ] },
    }),
    defineFigure({
      id: `${prefix}-migration-controls`, category: 'layer', page, placement: 'Migration and control points',
      sourceHeading: layer.id === 'r13-operating-model' ? '12. Migration path' : '11. Migration path',
      title: `${layer.title}: migrate through evidence gates`, takeaway: `Scale ${layer.title.toLowerCase()} only after its control point is operating and observable.`,
      caption: `A three-step migration keeps ${layer.control.toLowerCase()} explicit.`,
      alt: `Three-stage ${layer.title.toLowerCase()} migration from foundation through governed pilot to scale, with the primary control point called out.`,
      type: 'timeline', evidenceStatus: 'author-position', dataBearing: false, sources: [source],
      data: { stages: [
        { label: 'Foundation', detail: layer.foundation, kind: 'human' },
        { label: 'Governed pilot', detail: layer.pilot, kind: 'agent', gate: layer.control },
        { label: 'Scale', detail: layer.scale, kind: 'system', gate: 'Evidence gate' },
      ] },
    }),
  ];
});


// ---------------------------------------------------------------------------
// Deep layer heroes: one target-state architecture figure per layer page.
// Authored from the research tracks and sprint evidence; ids layer-NN-hero.
// ---------------------------------------------------------------------------
interface HeroDef {
  layer: string;
  n: string;
  title: string;
  takeaway: string;
  caption: string;
  alt: string;
  nodes: VisualNode[];
  edges: VisualEdge[];
  note?: string;
}

const heroDefs: HeroDef[] = [
  { layer: 'r01-infrastructure', n: '01', title: 'Execution infrastructure: sandboxed, egress-controlled, durable',
    takeaway: 'Act-capable work runs in microVM-class sandboxes behind allowlisting egress proxies, on event-logged resumable sessions, under a first-class workload identity.',
    caption: 'Isolation is tiered by capability set, not product category; serving is classification-routed.',
    alt: 'Execution infrastructure with agent runtime, microVM sandbox, egress proxy, durable session log, workload identity issuance, and classification-routed model serving.',
    nodes: [
      { id: 'runtime', label: 'Agent runtime', detail: 'Managed or platform-provided, per-session isolation', kind: 'agent' },
      { id: 'sandbox', label: 'microVM sandbox', detail: 'Code, browsing, computer use; session memory sanitized on termination', kind: 'control' },
      { id: 'egress', label: 'Egress proxy', detail: 'Domain allowlists; metadata endpoints and private ranges blocked', kind: 'control' },
      { id: 'session', label: 'Durable session', detail: 'Event-logged, snapshot/restore, hibernate-and-wake', kind: 'system' },
      { id: 'identity', label: 'Workload identity', detail: 'Directory, WIMSE/SPIFFE, or XAA-based; ID2 floor', kind: 'evidence' },
      { id: 'serving', label: 'Model serving', detail: 'Metered by default; sovereign or self-hosted by classification', kind: 'system' },
    ],
    edges: [
      { from: 'runtime', to: 'sandbox', label: 'act-capable work' },
      { from: 'sandbox', to: 'egress', label: 'all network egress' },
      { from: 'runtime', to: 'session', label: 'event log' },
      { from: 'identity', to: 'runtime', label: 'issued per agent' },
      { from: 'runtime', to: 'serving', label: 'classification-routed' },
    ],
    note: 'Gate on capability set (private data, untrusted content, external communication), re-evaluated on every tool grant.' },
  { layer: 'r02-data-platform', n: '02', title: 'Grounding as a governed product',
    takeaway: 'Permissions crawl into index metadata and retrieval is pre-filtered on the caller\'s live identity; post-filtering is the anti-pattern.',
    caption: 'Fail-close on permission-sync errors; provenance runs from answer back to source span.',
    alt: 'ACL-aware grounding pipeline from source systems through permission crawl into index metadata, pre-filtered retrieval on live identity, and span-level provenance, with fail-close branch.',
    nodes: [
      { id: 'sources', label: 'Source systems', detail: 'Documents, records, events with native ACLs', kind: 'system' },
      { id: 'crawl', label: 'Permission crawl', detail: 'ACLs into index metadata; ReBAC pre-computation', kind: 'control' },
      { id: 'index', label: 'Governed index', detail: 'Version-stamped vectors; purpose-scoped where stakes demand', kind: 'evidence' },
      { id: 'retrieval', label: 'Pre-filtered retrieval', detail: 'Caller\'s live identity inside the query', kind: 'control' },
      { id: 'semantics', label: 'Semantic contract', detail: 'Deterministic answers or refusal for high-stakes numerics', kind: 'control' },
      { id: 'agent', label: 'Agent context', detail: 'Answer with span-level source provenance', kind: 'agent' },
    ],
    edges: [
      { from: 'sources', to: 'crawl' },
      { from: 'crawl', to: 'index', label: 'fail-close on sync error' },
      { from: 'index', to: 'retrieval' },
      { from: 'retrieval', to: 'agent' },
      { from: 'semantics', to: 'agent', label: 'numeric questions' },
    ],
    note: 'Embeddings are recoverable text; vectors inherit source classification and erasure obligations.' },
  { layer: 'r03-integration-fabric', n: '03', title: 'The governed tool plane',
    takeaway: 'No direct model-to-server connections: one gateway enforces allowlists, identity exchange, credential injection, description integrity, and audit on every tool call.',
    caption: 'The enforcement plane of the agentic enterprise.',
    alt: 'Tool-plane architecture from agent through gateway enforcement stages to MCP server, governed API, and system of record, with SIEM audit tap.',
    nodes: [
      { id: 'agent', label: 'Agent', detail: 'Holds no credentials', kind: 'agent' },
      { id: 'gateway', label: 'MCP gateway', detail: 'Allowlist, RFC 8693 token exchange, credential injection, description-integrity check, classification routing, rate limits', kind: 'control' },
      { id: 'server', label: 'MCP server', detail: 'Curated catalog entry; version-pinned', kind: 'system' },
      { id: 'api', label: 'Governed API', detail: 'Entitlement, validation, audit already enforced', kind: 'system' },
      { id: 'record', label: 'System of record', kind: 'system' },
      { id: 'siem', label: 'SIEM', detail: 'Action-granular audit', kind: 'evidence' },
    ],
    edges: [
      { from: 'agent', to: 'gateway', label: 'every tool call' },
      { from: 'gateway', to: 'server' },
      { from: 'server', to: 'api' },
      { from: 'api', to: 'record' },
      { from: 'gateway', to: 'siem', label: 'audit tap' },
    ],
    note: 'The gateway enforces the arriving auth standards (EMA/XAA, ID-JAG); it does not replace them.' },
  { layer: 'r04-systems-of-record', n: '04', title: 'Wrap, do not reinvent',
    takeaway: 'Agents act as the requesting user through wrapped governed APIs; entitlement stays in the record system and audit attributes to the human.',
    caption: 'Embedded and external agents converge on the same permission plane.',
    alt: 'Two agent paths, embedded and external, converging on the record system\'s own CRUD, field-level security, and sharing-rule enforcement, with audit attributed to the requesting user.',
    nodes: [
      { id: 'embedded', label: 'Embedded agent', detail: 'Vendor-hosted, same permission plane', kind: 'agent' },
      { id: 'external', label: 'External agent', detail: 'Through the gateway, run-as-user', kind: 'agent' },
      { id: 'perms', label: 'Permission plane', detail: 'CRUD, field-level security, sharing rules', kind: 'control' },
      { id: 'gate', label: 'Consequence-class write gate', detail: 'Native approval machinery; relaxed by demonstrated reliability', kind: 'control' },
      { id: 'record', label: 'Record', kind: 'system' },
      { id: 'audit', label: 'Audit log', detail: 'Attributed to the human identity', kind: 'evidence' },
    ],
    edges: [
      { from: 'embedded', to: 'perms' },
      { from: 'external', to: 'perms' },
      { from: 'perms', to: 'gate' },
      { from: 'gate', to: 'record' },
      { from: 'record', to: 'audit' },
    ],
    note: 'Embedded agents do not pause by default; the human checkpoint is wired by you, not the platform.' },
  { layer: 'r05-lob-and-ot', n: '05', title: 'The validation loop: information path, never control path',
    takeaway: 'Raw model output is never displayed: candidates are validated against a digital twin or rules, filtered, and shown in the alert channel; the operator decides.',
    caption: 'The model proposes and physics disposes; the safety instrumented system is untouched.',
    alt: 'Control-room validation loop from alarm stream through agent proposal, digital-twin validation, filtering, alert-channel display, and operator decision, with the safety system separate.',
    nodes: [
      { id: 'stream', label: 'Alarm and event stream', kind: 'system' },
      { id: 'agent', label: 'Agent', detail: 'Assembles context, proposes candidates', kind: 'agent' },
      { id: 'twin', label: 'Digital twin / rules', detail: 'Simulate and filter candidates', kind: 'control' },
      { id: 'alert', label: 'Alert channel', detail: 'EEMUA alert, distinct from configured alarms', kind: 'evidence' },
      { id: 'operator', label: 'Operator', detail: 'Holds all decision authority; tested revert-to-manual', kind: 'human' },
      { id: 'sis', label: 'Safety instrumented system', detail: 'Untouched; ML excluded by IEC 61511', kind: 'risk' },
    ],
    edges: [
      { from: 'stream', to: 'agent' },
      { from: 'agent', to: 'twin', label: 'raw output never displayed' },
      { from: 'twin', to: 'alert', label: 'surviving options only' },
      { from: 'alert', to: 'operator' },
    ],
    note: 'Unidirectional or brokered read paths by consequence class; agent output is never an independent protection layer.' },
  { layer: 'r06-intelligence-and-learning', n: '06', title: 'The governed flywheel',
    takeaway: 'Production traces and eval datasets share a data layer; promotion is gated on counterexample survival and eval regression, and promoted rules land outside the model.',
    caption: 'The optimizer and the evaluator stay decoupled; every promoted artifact has a demotion path.',
    alt: 'Learning flywheel from production traces through shared eval data layer, judged evaluation, counterexample-gated promotion into out-of-model policy enforcement, with rollback and demotion paths.',
    nodes: [
      { id: 'traces', label: 'Production traces', kind: 'system' },
      { id: 'datasets', label: 'Shared eval data layer', detail: 'Failing online scores auto-promote traces', kind: 'evidence' },
      { id: 'judge', label: 'Calibrated judges', detail: 'Version-pinned, human-calibrated, decoupled from the optimizer', kind: 'control' },
      { id: 'gate', label: 'Promotion gate', detail: 'Counterexample survival + eval regression + human approval', kind: 'control' },
      { id: 'policy', label: 'Policy-as-code layer', detail: 'Outside the model; versioned; rollback', kind: 'control' },
      { id: 'agent', label: 'Agent behavior', kind: 'agent' },
    ],
    edges: [
      { from: 'traces', to: 'datasets' },
      { from: 'datasets', to: 'judge' },
      { from: 'judge', to: 'gate' },
      { from: 'gate', to: 'policy', label: 'promoted artifacts' },
      { from: 'policy', to: 'agent', label: 'enforced' },
      { from: 'agent', to: 'traces' },
    ],
    note: 'Roughly a quarter of written policy statements are statically enforceable; the rest stay judged behavior.' },
  { layer: 'r07-agent-platform', n: '07', title: 'Buy the runtime, build the harness',
    takeaway: 'The harness owns context assembly, explicit multi-condition termination, artifacts-as-state, separate verification, and budgets; the managed runtime owns isolation and durability.',
    caption: 'The harness is the lock-in and the differentiator; the runtime is becoming the portable substrate.',
    alt: 'Agent platform architecture separating the enterprise-owned harness (context, termination, verification, budgets, artifacts-as-state) from the managed runtime (isolation, durable sessions), with the registry gating promotion.',
    nodes: [
      { id: 'harness', label: 'Harness', detail: 'Context assembly and reset, iteration and wall-clock caps, per-run budgets', kind: 'agent' },
      { id: 'verify', label: 'Verification path', detail: 'Separate agent or process; self-assessment distrusted', kind: 'control' },
      { id: 'artifacts', label: 'Artifacts-as-state', detail: 'Inspectable state outside the context window', kind: 'evidence' },
      { id: 'runtime', label: 'Managed runtime', detail: 'Isolation, durable execution, hibernate-and-wake', kind: 'system' },
      { id: 'registry', label: 'Registry', detail: 'Eval-gated promotion; staleness demotes; search returns PUBLISHED only', kind: 'control' },
      { id: 'router', label: 'Routing tiers', detail: 'Deterministic pre-router, light models, frontier synthesis', kind: 'system' },
    ],
    edges: [
      { from: 'harness', to: 'runtime', label: 'runs on' },
      { from: 'harness', to: 'verify' },
      { from: 'harness', to: 'artifacts' },
      { from: 'registry', to: 'harness', label: 'gates promotion' },
      { from: 'harness', to: 'router', label: 'model calls' },
    ],
    note: 'Approval rules are held in the harness and enforced at the gateway.' },
  { layer: 'r08-productivity-and-collaboration', n: '08', title: 'Access identity by default, presence by exception',
    takeaway: 'The agent identity is a service principal with the sponsor attribute; the user account carrying mailbox and meeting presence is a separate, optional, revocable grant.',
    caption: 'Nameability is not presence; five capability surfaces define the presence tier.',
    alt: 'Collaboration identity architecture from mandatory agent service principal with sponsor field, through optional one-to-one user account, to the five presence capability surfaces, with conditional-access-targetable connector permissions.',
    nodes: [
      { id: 'principal', label: 'Agent service principal', detail: 'Mandatory; sponsor attribute; non-revocable creation right, capped', kind: 'agent' },
      { id: 'connector', label: 'Connector permissions', detail: 'Surfaced as API permissions; conditional-access targetable', kind: 'control' },
      { id: 'account', label: 'Optional user account', detail: 'Separate 1:1 child object; admin-granted, revocable', kind: 'control' },
      { id: 'surfaces', label: 'Presence surfaces', detail: 'Mailbox, calendar, licence, HR system, meeting roster', kind: 'risk' },
      { id: 'mention', label: 'Nameability', detail: '@mentionable without a user account', kind: 'evidence' },
    ],
    edges: [
      { from: 'principal', to: 'connector' },
      { from: 'principal', to: 'account', label: 'only when acting as a user' },
      { from: 'account', to: 'surfaces' },
      { from: 'principal', to: 'mention' },
    ],
    note: 'Sponsor accountability is an access-identity attribute; presence is a deliberate, revocable decision.' },
  { layer: 'r09-experience-and-channels', n: '09', title: 'A separate edge on a shared control plane',
    takeaway: 'Channels, disclosure, adversarial hardening, and the legal-evidence layer are edge-specific; knowledge, identity, tools, evals, and observability are shared, and duplicating them is a defect.',
    caption: 'The separation is justified by legal attribution, not technology.',
    alt: 'Customer experience architecture with the channel edge (telephony, disclosure, guardrails, legal evidence) distinct from the shared control plane (knowledge corpus, identity, tool layer, evaluation, observability, model access).',
    nodes: [
      { id: 'channels', label: 'Channel edge', detail: 'Web, voice, telephony; barge-in and latency budgets', kind: 'system' },
      { id: 'disclosure', label: 'Disclosure and consent', detail: 'At first interaction; Article 50 live', kind: 'control' },
      { id: 'guard', label: 'Adversarial hardening', detail: 'Anonymous users; public injection surface', kind: 'risk' },
      { id: 'evidence', label: 'Legal evidence layer', detail: 'Verbatim records; statements bind the company', kind: 'evidence' },
      { id: 'plane', label: 'Shared control plane', detail: 'Knowledge, identity, tools, evals, observability, models', kind: 'control' },
      { id: 'human', label: 'Staffed escalation queue', detail: 'Working-state transfer; never manufactured containment', kind: 'human' },
    ],
    edges: [
      { from: 'channels', to: 'plane' },
      { from: 'disclosure', to: 'channels' },
      { from: 'guard', to: 'channels' },
      { from: 'channels', to: 'evidence', label: 'every conversation' },
      { from: 'channels', to: 'human', label: 'escalation' },
    ] },
  { layer: 'r10-security-and-identity', n: '10', title: 'The deterministic authorization chain',
    takeaway: 'Every consequential action passes a policy decision point the agent cannot bypass; guardrails are an advisory side tap, never the boundary.',
    caption: 'JIT elevation over a minimal baseline, short-lived credentials, revocation as a drilled path.',
    alt: 'Authorization chain from registered agent identity through just-in-time elevation and the gateway to a policy decision point and the tool, with guardrails as an advisory side channel and verification stages in parallel.',
    nodes: [
      { id: 'identity', label: 'Agent identity', detail: 'Registered, least-privileged, short-lived, named owner and risk tier', kind: 'agent' },
      { id: 'jit', label: 'JIT elevation', detail: 'RFC 9396 rich authorization; automatic drop-back', kind: 'control' },
      { id: 'pdp', label: 'Policy decision point', detail: 'Cedar-class sub-millisecond or OPA; the agent cannot bypass it', kind: 'control' },
      { id: 'tool', label: 'Tool / action', kind: 'system' },
      { id: 'guardrail', label: 'Guardrails', detail: 'Advisory: measured evasion 72-77%', kind: 'risk' },
      { id: 'ifc', label: 'Information-flow control', detail: 'Deterministic; plus formal output verification where warranted', kind: 'control' },
    ],
    edges: [
      { from: 'identity', to: 'jit' },
      { from: 'jit', to: 'pdp' },
      { from: 'pdp', to: 'tool', label: 'allow, deny, limit, stop' },
      { from: 'guardrail', to: 'pdp', label: 'advisory signal only' },
      { from: 'ifc', to: 'tool', label: 'parallel verification' },
    ],
    note: 'Fail closed when the policy engine fails; time-to-revoke is a measured metric.' },
  { layer: 'r11-governance-risk-sovereignty', n: '11', title: 'The registry-centred evidence machine',
    takeaway: 'The agent registry is the compliance inventory; evidence posture is two-tiered, and deployment is classification-routed for sovereignty.',
    caption: 'Evidence floor for every production agent; Article-12-grade instrumentation for the plausibly high-risk tier.',
    alt: 'Governance topology with the agent registry as hub feeding risk tiering, two-tier evidence capture, kill switch, classification-routed deployment, and board reporting.',
    nodes: [
      { id: 'registry', label: 'Agent registry', detail: 'Owner, purpose, risk tier, tools and credentials, model and prompt versions', kind: 'control' },
      { id: 'tiers', label: 'Risk tiers', detail: 'Observe / Advise / Act-with-approval / Autonomous', kind: 'control' },
      { id: 'floor', label: 'Evidence floor', detail: 'Per-action logs retained, named oversight, provenance-carrying grounding', kind: 'evidence' },
      { id: 'art12', label: 'Article-12-grade tier', detail: 'For plausibly high-risk workloads', kind: 'evidence' },
      { id: 'kill', label: 'Kill switch', detail: 'Wired before autonomy expands', kind: 'risk' },
      { id: 'routing', label: 'Classification-routed deployment', detail: 'Data class selects region and estate', kind: 'system' },
    ],
    edges: [
      { from: 'registry', to: 'tiers' },
      { from: 'tiers', to: 'floor' },
      { from: 'tiers', to: 'art12', label: 'plausible high-risk' },
      { from: 'registry', to: 'kill' },
      { from: 'registry', to: 'routing' },
    ] },
  { layer: 'r12-observability-and-finops', n: '12', title: 'Traces the agent cannot forge',
    takeaway: 'Every agent is traced end to end on a translation layer over unstable conventions; budgets are enforced deterministically, and telemetry collection sits outside the agent\'s control.',
    caption: 'Session, model-call, and tool-call spans keyed to agent identity and cost.',
    alt: 'Observability architecture from agent execution through out-of-band collection, a schema translation layer, trace storage with cost attribution, budget enforcement returning errors on exhaustion, and the change-gate pipeline.',
    nodes: [
      { id: 'agent', label: 'Agent execution', kind: 'agent' },
      { id: 'collect', label: 'Out-of-band collection', detail: 'Agents cannot forge their own traces', kind: 'control' },
      { id: 'translate', label: 'Translation layer', detail: 'Conventions unstable; avoid deep SDK coupling', kind: 'system' },
      { id: 'traces', label: 'Traces + cost', detail: 'Session, model, tool spans keyed to agent identity', kind: 'evidence' },
      { id: 'budget', label: 'Budget enforcement', detail: 'Hierarchical caps; 429 on exhaustion; fail to human queues', kind: 'control' },
      { id: 'gates', label: 'Change gates', detail: 'Shadow, 1-5% canary, full; judges calibrated', kind: 'control' },
    ],
    edges: [
      { from: 'agent', to: 'collect' },
      { from: 'collect', to: 'translate' },
      { from: 'translate', to: 'traces' },
      { from: 'budget', to: 'agent', label: 'caps per run' },
      { from: 'traces', to: 'gates', label: 'gate evidence' },
    ],
    note: 'An observability outage must not blind the kill switch.' },
  { layer: 'r13-operating-model', n: '13', title: 'Supervision as a queueing system',
    takeaway: 'Supervisory capacity is neglect time over interaction time plus wait time; load is budgeted as a burst rate per ten minutes, never a daily average.',
    caption: 'Alarms on alarms: an algorithmic monitor flags elevated-risk sessions before the human looks.',
    alt: 'Supervision architecture from agent fleet through algorithmic monitoring and the escalation queue to the supervisor, with wait time explicit in the capacity model and telemetry feeding back.',
    nodes: [
      { id: 'fleet', label: 'Agent fleet', kind: 'agent' },
      { id: 'monitor', label: 'Algorithmic monitor', detail: 'Flags elevated-risk sessions; alarms on alarms', kind: 'control' },
      { id: 'queue', label: 'Escalation queue', detail: 'Wait time is the binding term', kind: 'system' },
      { id: 'supervisor', label: 'Supervisor', detail: 'Capacity = NT / (IT + WT) + 1', kind: 'human' },
      { id: 'telemetry', label: 'Supervision telemetry', detail: 'Intervention rate, escalation mix by trigger, wait per item', kind: 'evidence' },
    ],
    edges: [
      { from: 'fleet', to: 'monitor' },
      { from: 'monitor', to: 'queue' },
      { from: 'queue', to: 'supervisor' },
      { from: 'supervisor', to: 'telemetry' },
      { from: 'telemetry', to: 'monitor', label: 'tunes flagging' },
    ],
    note: 'No credible published human-to-agent supervision ratio exists; burst bands replace ratios.' },
  { layer: 'r14-agent-data-engineering', n: '14', title: 'The curation pipeline with provenance end to end',
    takeaway: 'Layout-aware parsing attaches provenance at page and cell level; it survives chunking, versioned embedding, permission-carrying indexing, and retrieval into every cited answer.',
    caption: 'Side rails: CDC freshness, memory-write quarantine, erasure cascade with exclusion sets, blue/green re-embeds.',
    alt: 'Agent data engineering pipeline from source through layout-aware parsing with provenance, contextual chunking, versioned embedding, permission-carrying index, pre-filtered retrieval, to span-cited answers, with freshness, quarantine, and erasure rails.',
    nodes: [
      { id: 'source', label: 'Source', detail: 'Owned corpus; authenticity at ingestion', kind: 'system' },
      { id: 'parse', label: 'Layout-aware parse', detail: 'Provenance at page and cell level', kind: 'control' },
      { id: 'chunk', label: 'Chunk + enrich', detail: 'Per-corpus evaluated; contextual enrichment', kind: 'system' },
      { id: 'embed', label: 'Versioned embeddings', detail: 'Blue/green migration; drift monitored', kind: 'system' },
      { id: 'index', label: 'Permission-carrying index', detail: 'ACLs in metadata; erasure exclusion sets', kind: 'control' },
      { id: 'memory', label: 'Memory tiers', detail: 'Writes quarantined before durable promotion', kind: 'evidence' },
      { id: 'answer', label: 'Cited answer', detail: 'Span-level lineage to source', kind: 'agent' },
    ],
    edges: [
      { from: 'source', to: 'parse' },
      { from: 'parse', to: 'chunk' },
      { from: 'chunk', to: 'embed' },
      { from: 'embed', to: 'index' },
      { from: 'index', to: 'answer', label: 'pre-filtered retrieval' },
      { from: 'memory', to: 'index', label: 'promoted writes only' },
    ],
    note: 'Derived artifacts inherit the strictest source classification; deletion cascades or it did not happen.' },
];

// The architecture renderer labels each row with node.group; without it every
// component reads "Plane", which is only correct for the seven-plane figure.
const HERO_ROLE_LABEL: Record<string, string> = {
  agent: 'Agent',
  control: 'Control',
  system: 'System',
  evidence: 'Evidence',
  human: 'Human',
  risk: 'Boundary',
};

const layerHeroFigures: FigureManifestEntry[] = heroDefs.map((hero) => defineFigure({
  id: `layer-${hero.n}-hero`,
  category: 'layer',
  page: `/layers/${hero.layer}`,
  placement: 'Target-state hero',
  title: hero.title,
  takeaway: hero.takeaway,
  caption: hero.caption,
  alt: hero.alt,
  type: 'architecture',
  evidenceStatus: 'author-position',
  dataBearing: false,
  sources: [guideSource(`${hero.layer} findings`, `/library/layers/${hero.layer}/findings`)],
  data: {
    nodes: hero.nodes.map((node) => ({ ...node, group: node.group ?? HERO_ROLE_LABEL[node.kind ?? 'system'] ?? 'Component' })),
    edges: hero.edges,
    ...(hero.note ? { note: hero.note } : {}),
  },
}));

const supportingFigures: FigureManifestEntry[] = [
  defineFigure({ id: 'support-accountability-enforcement', category: 'support', page: '/architecture/identity-chain', placement: 'Misconception explainer', sourceHeading: 'One sentence', title: 'Accountability is not enforcement', takeaway: 'A named sponsor answers for purpose and outcomes; a deterministic control prevents or permits the action.', caption: 'Both are necessary and neither substitutes for the other.', alt: 'Side-by-side distinction between human accountability for purpose and outcomes and technical enforcement of permissions at the action boundary.', type: 'comparison', evidenceStatus: 'author-position', dataBearing: false, sources: [guideSource('Identity and security model', '/docs/architecture/identity-security-model')], data: { columns: [{ label: 'Accountability', items: ['Named human sponsor', 'Purpose and outcome ownership', 'Exception and appeal responsibility'], kind: 'human' }, { label: 'Enforcement', items: ['Deterministic policy decision', 'Permission at the gateway', 'Allow, deny, limit, or stop'], kind: 'control' }] } }),
  defineFigure({ id: 'support-licensed-metered-estates', category: 'support', page: '/architecture', placement: 'Global enterprise architecture', sourceHeading: 'Architecture A: Global regulated enterprise', title: 'Licensed and metered agent estates', takeaway: 'One gateway cannot govern agents that run inside a vendor’s licensed control plane.', caption: 'Use tenant policy and telemetry extraction for the licensed estate; direct gateway enforcement for the metered estate.', alt: 'Two-estate architecture comparing licensed suite agents governed through tenant policy with metered agents governed through an enterprise gateway and shared evidence plane.', type: 'comparison', evidenceStatus: 'author-position', dataBearing: false, sources: [guideSource('Master target-state architecture', '/docs/architecture/master-target-state')], data: { columns: [{ label: 'Licensed estate', items: ['Vendor execution plane', 'Tenant policy', 'Telemetry extraction', 'Limited gateway visibility'], kind: 'system' }, { label: 'Metered estate', items: ['Enterprise runtime', 'Gateway enforcement', 'Per-run budgets', 'Full action trace'], kind: 'control' }] } }),
  defineFigure({ id: 'support-derived-erasure-tree', category: 'support', page: '/architecture/data-to-memory', placement: 'Erasure obligations', sourceHeading: 'Governance that has to be designed, not inherited', title: 'Deletion must reach every derivative', takeaway: 'Deleting a source record is incomplete when its vectors, memories, traces, or eval cases remain.', caption: 'Derived artifacts inherit the strictest source classification and erasure obligation.', alt: 'Family tree from a classified source record to chunks, embeddings, memories, traces, and evaluation datasets, all connected to one cascading erasure request.', type: 'map', evidenceStatus: 'mixed-evidence', dataBearing: false, sources: [guideSource('Memory pipeline architecture', '/docs/architecture/memory-pipeline-architecture')], data: { nodes: [{ id: 'source', label: 'Source record', kind: 'system', emphasis: true }, { id: 'chunk', label: 'Parsed chunks', kind: 'evidence' }, { id: 'vector', label: 'Embeddings', kind: 'evidence' }, { id: 'memory', label: 'Durable memory', kind: 'agent' }, { id: 'trace', label: 'Traces', kind: 'evidence' }, { id: 'eval', label: 'Eval datasets', kind: 'control' }], edges: [{ from: 'source', to: 'chunk', kind: 'evidence' }, { from: 'chunk', to: 'vector', kind: 'evidence' }, { from: 'vector', to: 'memory', kind: 'evidence' }, { from: 'source', to: 'trace', kind: 'evidence' }, { from: 'trace', to: 'eval', kind: 'evidence' }] } }),
  defineFigure({ id: 'support-containment-resolution', category: 'support', page: '/layers/r09-experience-and-channels', placement: 'Metric misconception', sourceHeading: '7. Metrics', title: 'Containment is not resolution', takeaway: 'A conversation can end without the customer’s underlying need being resolved.', caption: 'Measure repeat contact, reopened cases, corrections, and durable completion.', alt: 'Comparison showing a contained conversation ending at channel closure while a resolved outcome continues through fulfilled need, correct record, and no avoidable repeat contact.', type: 'comparison', evidenceStatus: 'mixed-evidence', dataBearing: false, sources: [guideSource('Customer-service blueprint', '/docs/blueprints/departments/customer-service')], data: { columns: [{ label: 'Contained', items: ['Conversation ended', 'No immediate handoff', 'Underlying obligation may remain'], kind: 'risk' }, { label: 'Resolved', items: ['Need fulfilled correctly', 'Authoritative record updated', 'No avoidable repeat contact'], kind: 'evidence' }] } }),
  defineFigure({ id: 'support-solitary-coordinated-work', category: 'support', page: '/layers/r08-productivity-and-collaboration', placement: 'Work-pattern distinction', sourceHeading: '2. What changes with agents', title: 'Solitary assistance and coordinated work are different investments', takeaway: 'Personal productivity can improve without changing a team’s shared workflow.', caption: 'Coordinated work needs redesigned handoffs, ownership, shared context, and outcome measurement.', alt: 'Two-column comparison of solitary assistant tasks inside one person’s workflow and coordinated multi-person work requiring redesigned handoffs and shared accountability.', type: 'comparison', evidenceStatus: 'mixed-evidence', dataBearing: false, sources: [guideSource('Productivity and collaboration findings', '/docs/layers/r08-productivity-and-collaboration/findings')], data: { columns: [{ label: 'Solitary work', items: ['Draft, summarize, search', 'Individual context', 'Immediate local benefit'], kind: 'agent' }, { label: 'Coordinated work', items: ['Handoffs and dependencies', 'Shared state and ownership', 'Process-level outcome'], kind: 'human' }] } }),
  defineFigure({ id: 'support-evidence-strength-gradient', category: 'support', page: '/architecture', placement: 'Evidence legend', sourceHeading: 'How to read the evidence layer', title: 'Read claims by evidence strength', takeaway: 'A vendor report, field experiment, prototype, and author position should never look equivalent.', caption: 'Badges expose the status; linked sources carry the detail and limitations.', alt: 'Evidence-strength gradient distinguishing primary standards, independently measured research, vendor-reported results, prototypes, author positions, and open evidence gaps.', type: 'spectrum', evidenceStatus: 'conceptual-guide', dataBearing: false, sources: [guideSource('Guide methodology', '/docs')], data: { stages: [{ label: 'Primary source', detail: 'Standard, law, or first-party technical record.', kind: 'evidence' }, { label: 'Independent measure', detail: 'Externally conducted evaluation or experiment.', kind: 'evidence' }, { label: 'Vendor report', detail: 'Useful but interested evidence.', kind: 'system' }, { label: 'Prototype', detail: 'Early result with limited external validity.', kind: 'agent' }, { label: 'Author position', detail: 'Explicit practitioner judgment.', kind: 'human' }, { label: 'Open gap', detail: 'No credible published precedent.', kind: 'risk' }] } }),
  defineFigure({ id: 'support-single-multi-agent', category: 'support', page: '/layers/r07-agent-platform', placement: 'Architecture choice', sourceHeading: 'Challenged defaults', title: 'Add agents only when coordination earns its cost', takeaway: 'A multi-agent topology should beat a simpler single-agent design at equal compute and evaluation conditions.', caption: 'Compare quality, latency, cost, failure modes, and recovery, not topology novelty.', alt: 'Controlled comparison between one agent with tools and several coordinating agents under equal compute, evaluated on quality, latency, cost, and recoverability.', type: 'comparison', evidenceStatus: 'mixed-evidence', dataBearing: false, sources: [guideSource('Agent-platform findings', '/docs/layers/r07-agent-platform/findings')], data: { columns: [{ label: 'Single agent', items: ['Fewer coordination failures', 'Simpler evidence trail', 'Default credible alternative'], kind: 'agent' }, { label: 'Multiple agents', items: ['Useful for separable expertise', 'Coordination and token overhead', 'Must win under equal conditions'], kind: 'risk' }] } }),
  defineFigure({ id: 'support-platform-choice', category: 'support', page: '/architecture', placement: 'Platform decision', sourceHeading: 'What this page does not decide', title: 'Choose a platform from data and permission gravity', takeaway: 'The best platform is the one that can safely reach the workload’s governed knowledge and actions.', caption: 'Start with archetype, data location, permissions, operating capacity, and exit constraints.', alt: 'Platform-choice flow routing from enterprise archetype and workload data through permission and operating-capacity checks to vendor rails, enterprise platform, or custom primitives.', type: 'flow', evidenceStatus: 'author-position', dataBearing: false, sources: [guideSource('Master target-state architecture', '/docs/architecture/master-target-state')], data: { stages: [{ label: 'Archetype', detail: 'Structural constraints.', kind: 'system' }, { label: 'Data gravity', detail: 'Where governed context lives.', kind: 'evidence' }, { label: 'Permission model', detail: 'Where authority is decided.', kind: 'control' }, { label: 'Operating capacity', detail: 'What the team can run.', kind: 'human' }, { label: 'Platform posture', detail: 'Rails, platform, or primitives.', kind: 'agent' }, { label: 'Exit test', detail: 'Artifacts and evidence remain portable.', kind: 'risk' }] } }),
  defineFigure({ id: 'support-promotion-demotion', category: 'support', page: '/architecture/learning-flywheel', placement: 'Governed learning', sourceHeading: 'The promotion gate, corrected by evidence', title: 'Every promotion needs a demotion path', takeaway: 'A learned change is not production-ready until it survives counterexamples and can be rolled back.', caption: 'The optimizer must not grade its own work.', alt: 'Governed learning storyboard from observed failure through candidate change, independent evaluation, staged promotion, monitoring, and rapid demotion on regression.', type: 'loop', evidenceStatus: 'author-position', dataBearing: false, sources: [guideSource('Learning loops map', '/docs/architecture/learning-loops-map')], data: { stages: [{ label: 'Observe', detail: 'Capture failure outside agent control.', kind: 'evidence' }, { label: 'Propose', detail: 'Create a candidate fact, rule, or behavior.', kind: 'agent' }, { label: 'Evaluate', detail: 'Independent pinned judge plus counterexamples.', kind: 'control' }, { label: 'Stage', detail: 'Limited rollout with comparison.', kind: 'system' }, { label: 'Promote', detail: 'Move to governed enforcement.', kind: 'control' }, { label: 'Demote', detail: 'Rollback on regression or drift.', kind: 'risk' }] } }),
  defineFigure({ id: 'support-research-changed', category: 'support', page: '/decisions', placement: 'Decision history', sourceHeading: 'Recorded decisions', title: 'What changed after research', takeaway: 'The guide earns trust by showing where evidence narrowed, revised, or contradicted an initial position.', caption: 'Publish concise decision cards, not the raw private workbench.', alt: 'Five-step research decision card moving from initial assumption through evidence and contradiction to revised recommendation and current evidence status.', type: 'flow', evidenceStatus: 'conceptual-guide', dataBearing: false, sources: [guideSource('Decision log', '/docs/decisions')], data: { stages: [{ label: 'Assumption', detail: 'State the starting belief.', kind: 'human' }, { label: 'Evidence', detail: 'Show what was tested.', kind: 'evidence' }, { label: 'Change', detail: 'Name the contradiction or narrowing.', kind: 'risk' }, { label: 'Recommendation', detail: 'Publish the revised position.', kind: 'control' }, { label: 'Status', detail: 'Label confidence and review date.', kind: 'evidence' }] } }),
  defineFigure({ id: 'support-glossary-concept-map', category: 'support', page: '/architecture', placement: 'Glossary opening', sourceHeading: 'Canonical terms', title: 'The guide’s concepts in one map', takeaway: 'Agents connect intent to governed action by using identity, knowledge, memory, controls, evidence, and learning.', caption: 'Use the glossary for definitions; use the map to understand relationships.', alt: 'Concept map linking human intent, agent autonomy, identity, knowledge retrieval, memory, tools, deterministic controls, evidence, outcomes, and governed learning.', type: 'map', evidenceStatus: 'conceptual-guide', dataBearing: false, sources: [guideSource('Glossary', '/docs/glossary')], data: { nodes: [{ id: 'intent', label: 'Intent', kind: 'human' }, { id: 'agent', label: 'Agent', kind: 'agent' }, { id: 'identity', label: 'Identity', kind: 'control' }, { id: 'knowledge', label: 'Knowledge', kind: 'evidence' }, { id: 'memory', label: 'Memory', kind: 'agent' }, { id: 'tools', label: 'Tools', kind: 'system' }, { id: 'control', label: 'Controls', kind: 'control' }, { id: 'outcome', label: 'Outcome', kind: 'system' }, { id: 'evidence', label: 'Evidence', kind: 'evidence' }, { id: 'learning', label: 'Learning', kind: 'agent' }], edges: [{ from: 'intent', to: 'agent', kind: 'action' }, { from: 'identity', to: 'control', kind: 'action' }, { from: 'knowledge', to: 'agent', kind: 'evidence' }, { from: 'memory', to: 'agent', kind: 'advisory' }, { from: 'agent', to: 'tools', kind: 'advisory' }, { from: 'control', to: 'tools', kind: 'action' }, { from: 'tools', to: 'outcome', kind: 'action' }, { from: 'outcome', to: 'evidence', kind: 'evidence' }, { from: 'evidence', to: 'learning', kind: 'feedback' }] } }),
  defineFigure({ id: 'support-myth-correction-gallery', category: 'support', page: '/architecture', placement: 'Visual primer close', sourceHeading: 'Your five-minute checkpoint', title: 'Five myths the guide corrects', takeaway: 'Agent maturity is not maximum autonomy, maximum memory, maximum sovereignty, maximum containment, or a vendor purchase.', caption: 'Each correction links to the architecture or framework that makes the distinction operational.', alt: 'Five paired myth-and-correction cards covering autonomy, memory, sovereignty, containment, and vendor-led transformation.', type: 'comparison', evidenceStatus: 'conceptual-guide', dataBearing: false, sources: [guideSource('Guide introduction', '/docs')], data: { columns: [{ label: 'Myth', items: ['Higher autonomy is always better', 'More memory means more intelligence', 'Higher sovereignty is more mature', 'Containment equals resolution', 'Choose the vendor first'], kind: 'risk' }, { label: 'Correction', items: ['Use the justified A×L cell', 'Persistence increases obligation', 'Classification selects the tier', 'Measure the durable outcome', 'Decide, design, then evaluate'], kind: 'evidence' }] } }),
  defineFigure({ id: 'support-graph-vector-decision', category: 'support', page: '/decisions', placement: 'Decision visual', sourceHeading: 'The wrong question, and the right one', title: 'When a knowledge graph earns its keep', takeaway: 'Use a graph only when explicit relationships and multi-hop traversal outperform a simpler retrieval baseline on the real workload.', caption: 'Start with the simplest credible vector or structured-search baseline, then require measurable quality or control gains before adding graph operations.', alt: 'Decision flow testing whether a workload needs explicit relationships, multi-hop traversal, explainable paths, and measurable improvement over vector retrieval before choosing a knowledge graph.', type: 'flow', evidenceStatus: 'mixed-evidence', dataBearing: false, sources: [guideSource('When a knowledge graph earns its keep', '/docs/techniques/when-a-knowledge-graph-earns-its-keep')], data: { stages: [{ label: 'Define the question', detail: 'Name the resolved outcome and evaluation set.', kind: 'human' }, { label: 'Test the baseline', detail: 'Run vector or structured retrieval first.', kind: 'system', gate: 'Baseline quality' }, { label: 'Need explicit paths?', detail: 'Check multi-hop, relationship, and explanation needs.', kind: 'evidence' }, { label: 'Measure the gain', detail: 'Compare quality, latency, cost, and operations.', kind: 'control', gate: 'Material advantage' }, { label: 'Choose deliberately', detail: 'Keep the baseline or fund graph ownership.', kind: 'agent' }] } }),
  defineFigure({ id: 'support-multi-view-publication-boundary', category: 'support', page: '/layers/r14-agent-data-engineering', placement: 'Publication boundary', sourceHeading: 'Publication status', title: 'Multi-view embeddings: what is and is not published', takeaway: 'The guide may discuss the concept and bounded evidence without exposing a held mechanism or implying unverified generalization.', caption: 'The implementation mechanism remains publication-held until explicit release and broader-domain validation.', alt: 'Publication-boundary comparison separating safe discussion of the multi-view embedding concept and social-domain evidence from held implementation details and unverified cross-domain claims.', type: 'comparison', evidenceStatus: 'preprint-or-prototype', dataBearing: false, sources: [guideSource('Techniques library', '/docs/techniques')], data: { columns: [{ label: 'Published boundary', items: ['Concept-level description', 'Evidence limited to the studied social domain', 'Limitations and review status', 'No implementation recipe'], kind: 'evidence' }, { label: 'Held or unverified', items: ['Mechanism details remain withheld', 'No claim of enterprise-wide generalization', 'No production recommendation from one domain', 'Release requires explicit approval'], kind: 'risk' }], note: 'Do not infer or reconstruct the held mechanism from this visual.' } }),
];

export const figureManifest: readonly FigureManifestEntry[] = [
  ...foundationalFigures,
  ...layerFigures,
  ...layerHeroFigures,
  ...supportingFigures,
];

export type FigureId = (typeof figureManifest)[number]['id'];

const figureById = new Map(figureManifest.map((figure) => [figure.id, figure]));

export function getFigure(id: string): FigureManifestEntry {
  const figure = figureById.get(id);
  if (!figure) throw new Error(`Unknown guide figure: ${id}`);
  return figure;
}

export function getFiguresForPage(page: string): readonly FigureManifestEntry[] {
  return figureManifest.filter((figure) => figure.page === page);
}

/** Stable page-to-figure helper for templates and content synchronization. */
export function figuresForPage(pathOrSlug: string): readonly FigureManifestEntry[] {
  const slug = pathOrSlug.replace(/^\/+|\/+$/g, '').replace(/^docs\/?/, '');
  const normalized = pathOrSlug.startsWith('/')
    ? pathOrSlug.replace(/\/$/, '') || '/docs'
    : slug ? `/docs/${slug}` : '/docs';
  return figureManifest.filter((figure) => figure.page.replace(/\/$/, '') === normalized);
}

export const figureManifestStats = Object.freeze({
  total: figureManifest.length,
  foundation: foundationalFigures.length,
  layer: layerFigures.length + layerHeroFigures.length,
  support: supportingFigures.length,
});
