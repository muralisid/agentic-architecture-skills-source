/**
 * The concept pages a reader moves between. Pages name the ones they rely on
 * in frontmatter (`concepts: [layers, lifecycle, ...]`) and the page layout
 * renders them as a "Related concepts" row, so every concept is one click away.
 */
export interface Concept {
  key: string;
  label: string;
  href: string;
}

const LAYERS: Concept[] = [
  ['r01', 'Infrastructure and compute (R01)', '/layers/r01-infrastructure'],
  ['r02', 'Data platform (R02)', '/layers/r02-data-platform'],
  ['r03', 'Integration fabric (R03)', '/layers/r03-integration-fabric'],
  ['r04', 'Systems of record (R04)', '/layers/r04-systems-of-record'],
  ['r05', 'Line of business and OT (R05)', '/layers/r05-lob-and-ot'],
  ['r06', 'Intelligence and learning (R06)', '/layers/r06-intelligence-and-learning'],
  ['r07', 'Agent platform (R07)', '/layers/r07-agent-platform'],
  ['r08', 'Productivity and collaboration (R08)', '/layers/r08-productivity-and-collaboration'],
  ['r09', 'Experience and channels (R09)', '/layers/r09-experience-and-channels'],
  ['r10', 'Security and identity (R10)', '/layers/r10-security-and-identity'],
  ['r11', 'Governance, risk and sovereignty (R11)', '/layers/r11-governance-risk-sovereignty'],
  ['r12', 'Observability and FinOps (R12)', '/layers/r12-observability-and-finops'],
  ['r13', 'Operating model and supervision (R13)', '/layers/r13-operating-model'],
  ['r14', 'Agent data engineering (R14)', '/layers/r14-agent-data-engineering'],
].map(([key, label, href]) => ({ key, label, href }));

export const CONCEPTS: Concept[] = [
  { key: 'start', label: 'Start here', href: '/start' },
  { key: 'operate', label: 'Operate', href: '/operate' },
  { key: 'layers', label: 'The fourteen layers', href: '/layers' },
  ...LAYERS,
  { key: 'lifecycle', label: 'The agent lifecycle', href: '/architecture/agent-lifecycle' },
  { key: 'capabilities', label: 'What an agent platform provides', href: '/architecture/system-view' },
  { key: 'agent-types', label: 'Four questions for any agent', href: '/architecture/agent-types' },
  { key: 'autonomy', label: 'The autonomy contract', href: '/architecture/autonomy-contract' },
  { key: 'risk', label: 'The risk profile', href: '/architecture/risk-profile' },
  { key: 'zones', label: 'The deterministic zones', href: '/architecture/deterministic-zones' },
  { key: 'delegation', label: 'The delegation chain', href: '/architecture/delegation-chain' },
  { key: 'enforcement', label: 'Enforcement outside the model', href: '/architecture/enforcement' },
  { key: 'flywheel', label: 'The learning flywheel', href: '/architecture/learning-flywheel' },
  { key: 'data-to-memory', label: 'From data to memory', href: '/architecture/data-to-memory' },
  { key: 'concern-matrix', label: 'The concern matrix', href: '/architecture/concern-matrix' },
  { key: 'readiness', label: 'The readiness assessment', href: '/library/frameworks/readiness-assessments' },
  { key: 'memory', label: 'Knowledge and memory', href: '/memory' },
  { key: 'ladder', label: 'The intelligence ladder', href: '/ladder' },
  { key: 'patterns', label: 'Context patterns', href: '/patterns' },
  { key: 'decisions', label: 'The decision catalog', href: '/decisions' },
  { key: 'security', label: 'Security practices', href: '/security' },
  { key: 'agentic-os', label: 'The Agentic OS', href: '/agentic-os' },
  { key: 'use-cases', label: 'Use cases', href: '/use-cases' },
  { key: 'choose', label: 'Choose where to start', href: '/use-cases/choose-where-to-start' },
  { key: 'packaged', label: 'Agents and packaged applications', href: '/use-cases/packaged-applications' },
  { key: 'value', label: 'Value and full cost', href: '/use-cases/value-and-investment' },
  { key: 'skills', label: 'Skills', href: '/skills' },
];

const lookup = new Map(CONCEPTS.map((concept) => [concept.key, concept]));

export function findConcept(key: string): Concept | undefined {
  return lookup.get(key.trim().toLowerCase());
}
