/**
 * Plain-words glossary for the product pages. One entry per term, written for
 * any reader in the organisation. Keys are lowercase; aliases let pages use
 * acronyms and plurals.
 */
export type GlossaryGroup =
  | 'Agents and autonomy'
  | 'Control and security'
  | 'Data and knowledge'
  | 'Learning and quality'
  | 'Running it day to day'
  | 'Standards and regulation';

export interface GlossaryEntry {
  key: string;
  term: string;
  plain: string;
  group: GlossaryGroup;
  aliases?: string[];
}

export const GLOSSARY: GlossaryEntry[] = [
  // Agents and autonomy
  { key: 'agent', term: 'Agent', group: 'Agents and autonomy', plain: 'Software that uses an AI model to work toward a goal on its own: it reads, decides the next step, uses tools, and keeps going until the job is done or a limit stops it.' },
  { key: 'workflow', term: 'Workflow', group: 'Agents and autonomy', plain: 'A fixed sequence of steps written in code. Cheaper and more predictable than an agent, and preferred whenever the task allows.' },
  { key: 'model', term: 'Model', group: 'Agents and autonomy', aliases: ['llm', 'large language model', 'language model'], plain: 'The AI engine that reads and writes text. On its own it has no access to your systems; everything built around it decides what it may do.' },
  { key: 'prompt', term: 'Prompt', group: 'Agents and autonomy', plain: 'The instructions and information given to the model for a task. A prompt is advice to the model, not a control on it.' },
  { key: 'tool', term: 'Tool', group: 'Agents and autonomy', aliases: ['tools', 'tool call'], plain: 'A function an agent can call to do something real: look up a record, send an email, run a query. Tools are where agents touch your systems.' },
  { key: 'harness', term: 'Harness', group: 'Agents and autonomy', plain: 'The engineering shell around the model: what goes into its working memory, which tools it can call, when it must stop, how much it may spend, and how it recovers when something fails.' },
  { key: 'context window', term: 'Context window', group: 'Agents and autonomy', aliases: ['context'], plain: 'The model\'s working memory for one task. It is limited in size, so what goes in and what gets left out is a design decision.' },
  { key: 'agent platform', term: 'Agent platform', group: 'Agents and autonomy', aliases: ['runtime'], plain: 'The software that runs agents: the runtime, the harness, the list of approved agents, and the rules for how they start, stop, and change.' },
  { key: 'autonomy level', term: 'Autonomy level (A0 to A5)', group: 'Agents and autonomy', aliases: ['a0', 'a5', 'a x l', 'autonomy'], plain: 'How much an agent may do without a person in the loop, from manual (A0) to governed lights-out operation (A5). Set per task, not per agent.' },
  { key: 'learning level', term: 'Learning level (L0 to L3)', group: 'Agents and autonomy', aliases: ['l0', 'l3'], plain: 'How an agent\'s behaviour is allowed to change over time, from fixed (L0) to continuous learning inside guardrails (L3).' },
  { key: 'orchestration', term: 'Orchestration', group: 'Agents and autonomy', aliases: ['orchestrator'], plain: 'Coordinating several agents or steps so they work together on one job. Useful for breadth; it does not make any single step smarter.' },
  { key: 'multi-agent', term: 'Multi-agent', group: 'Agents and autonomy', plain: 'Several agents splitting one job. It costs many times more than one agent and pays off only when the work is wide and the parts are independent.' },
  { key: 'plane', term: 'Plane (the seven planes)', group: 'Agents and autonomy', aliases: ['planes', 'seven planes'], plain: 'One of seven groups of capabilities in the agent system: execution, action, knowledge, control, improvement, evidence, and human. Planes are what you build; layers are what you already own.' },
  { key: 'layer', term: 'Layer (the fourteen layers)', group: 'Agents and autonomy', aliases: ['layers', 'fourteen layers'], plain: 'One of fourteen parts of the enterprise estate that agents touch, from infrastructure (R01) to agent data engineering (R14).' },
  { key: 'cross-cutting concern', term: 'Cross-cutting concern', group: 'Agents and autonomy', aliases: ['cross-cutting concerns', 'concern'], plain: 'A requirement every layer must honour, such as identity, privacy, or cost, that no single team owns end to end.' },
  { key: 'challenged default', term: 'Challenged default', group: 'Agents and autonomy', aliases: ['contested choice', 'cd'], plain: 'A technology choice most people treat as obvious, re-examined here against the simplest credible alternative on evidence and cost.' },
  { key: 'two estates', term: 'Two estates (metered and licensed)', group: 'Agents and autonomy', aliases: ['metered estate', 'licensed estate'], plain: 'Metered: agent traffic that flows through your own gateway and can be fully governed. Licensed: agents inside vendor products that run on the vendor\'s controls, governed only through their settings and exports.' },
  { key: 'sponsor', term: 'Sponsor and owner', group: 'Agents and autonomy', aliases: ['owner', 'sponsor and owner'], plain: 'The sponsor is the business person accountable for why an agent exists. The owner is the technical person who keeps it configured and secure.' },
  { key: 'registry', term: 'Agent registry', group: 'Agents and autonomy', aliases: ['agent registry'], plain: 'The official list of agents: what each is for, who owns it, what it may touch, and which version is live.' },

  // Control and security
  { key: 'policy decision point', term: 'Policy decision point', group: 'Control and security', aliases: ['pdp', 'decision point'], plain: 'The component that says yes or no to an action by checking rules against who is asking. The agent asks, the decision point decides, and the agent cannot skip it.' },
  { key: 'policy-as-code', term: 'Policy-as-code', group: 'Control and security', plain: 'Rules written as versioned code that a computer evaluates the same way every time, reviewed and deployed like any software change.' },
  { key: 'gateway', term: 'Gateway', group: 'Control and security', aliases: ['tool gateway', 'mcp gateway', 'llm gateway'], plain: 'The single door every agent request passes through on its way to a tool or model. Because everything goes through it, it is where rules are enforced and activity is recorded.' },
  { key: 'mcp', term: 'MCP (Model Context Protocol)', group: 'Control and security', aliases: ['model context protocol'], plain: 'An open standard for connecting agents to tools and data, like a universal plug. An MCP gateway is the governed version of that plug.' },
  { key: 'guardrail', term: 'Guardrail', group: 'Control and security', aliases: ['guardrails'], plain: 'A filter that uses an AI model to catch bad inputs or outputs. Useful as an early warning, but not reliable enough to be the thing that grants or denies an action.' },
  { key: 'deterministic', term: 'Deterministic', group: 'Control and security', plain: 'Always gives the same answer for the same input by following fixed rules. The opposite of probabilistic, where the answer can vary.' },
  { key: 'probabilistic', term: 'Probabilistic', group: 'Control and security', plain: 'Produces a best guess that can vary from run to run. AI models are probabilistic, which is why their output informs decisions rather than making them in the four zones.' },
  { key: 'deterministic zone', term: 'Deterministic zone', group: 'Control and security', aliases: ['deterministic zones', 'four zones', 'zone'], plain: 'One of four areas (access, money, safety actuation, formal records) where the final decision must come from fixed rules, never from a model.' },
  { key: 'agent identity', term: 'Agent identity', group: 'Control and security', aliases: ['identity'], plain: 'A registered account for an agent with a named owner, limited permissions, and credentials that expire, so every action can be traced to who asked.' },
  { key: 'workload identity', term: 'Workload identity', group: 'Control and security', aliases: ['spiffe', 'wimse'], plain: 'Proof of who a piece of running software is, issued by the platform rather than typed in as a password. The machine equivalent of an ID badge.' },
  { key: 'token exchange', term: 'Token exchange (on-behalf-of)', group: 'Control and security', aliases: ['on-behalf-of', 'obo', 'delegation'], plain: 'Swapping one credential for another so an agent acts with the permissions of the person who asked, not with its own broader powers.' },
  { key: 'run-as-user', term: 'Run-as-user', group: 'Control and security', plain: 'Making the agent operate inside a business system exactly as the requesting person would, with that person\'s permissions, so nothing is visible or changeable that the person could not see or change.' },
  { key: 'least privilege', term: 'Least privilege', group: 'Control and security', plain: 'Giving an agent only the access its current task needs, and taking it back when the task ends.' },
  { key: 'just-in-time access', term: 'Just-in-time access', group: 'Control and security', aliases: ['jit', 'jit elevation'], plain: 'Access granted for a short window when it is needed, then withdrawn automatically.' },
  { key: 'entitlement', term: 'Entitlement', group: 'Control and security', aliases: ['entitlements'], plain: 'A specific permission a person or agent holds in a system, such as the right to approve an invoice.' },
  { key: 'kill switch', term: 'Kill switch', group: 'Control and security', plain: 'A guaranteed way to stop an agent immediately, built at more than one point so that one failure cannot disable it.' },
  { key: 'mandate', term: 'Mandate (payments)', group: 'Control and security', aliases: ['mandates'], plain: 'A signed, scoped permission to spend: how much, with whom, for what, until when. The payment network checks it, and the agent cannot change it.' },
  { key: 'prompt injection', term: 'Prompt injection', group: 'Control and security', aliases: ['injection', 'indirect prompt injection'], plain: 'An attack where instructions hidden in content the agent reads (an email, a web page, a document) trick it into doing something its user never asked for.' },
  { key: 'capability surface', term: 'Capability surface', group: 'Control and security', plain: 'Everything an agent can actually do: which systems it can read, write, send from, or appear in. Controls are chosen from this list, not from the product\'s name.' },
  { key: 'sandbox', term: 'Sandbox', group: 'Control and security', aliases: ['sandboxes', 'isolation'], plain: 'An isolated environment where agent code runs with limited access to the network and the rest of the machine, so mistakes and attacks stay contained.' },
  { key: 'egress control', term: 'Egress control', group: 'Control and security', aliases: ['egress'], plain: 'Rules about what a sandbox or agent is allowed to send out to the internet or to other systems.' },
  { key: 'siem', term: 'SIEM', group: 'Control and security', plain: 'The security team\'s central system for collecting and analysing security events.' },
  { key: 'soc', term: 'SOC (security operations centre)', group: 'Control and security', plain: 'The team that watches for and responds to security incidents.' },
  { key: 'hallucination', term: 'Hallucination', group: 'Control and security', plain: 'When a model states something false with confidence. Grounding and refusal rules reduce it; verification catches the rest.' },

  // Data and knowledge
  { key: 'grounding', term: 'Grounding', group: 'Data and knowledge', aliases: ['grounded'], plain: 'Making an agent answer from trusted company sources it can point to, and refusing when the evidence is weak.' },
  { key: 'retrieval', term: 'Retrieval', group: 'Data and knowledge', aliases: ['rag', 'retrieve'], plain: 'Finding the few relevant pieces of company information for a task and placing them in front of the model.' },
  { key: 'embedding', term: 'Embedding', group: 'Data and knowledge', aliases: ['embeddings', 'embed'], plain: 'A numeric fingerprint of a piece of text that lets a computer find similar meaning quickly. Embeddings are derived data and inherit the protections of what they came from.' },
  { key: 'vector index', term: 'Vector index', group: 'Data and knowledge', aliases: ['vector database', 'vector store', 'index'], plain: 'A database of embeddings built for finding similar meaning fast. The storage behind most retrieval.' },
  { key: 'chunking', term: 'Chunking', group: 'Data and knowledge', aliases: ['chunk', 'chunks'], plain: 'Splitting documents into pieces small enough for retrieval. How you split changes what the agent finds.' },
  { key: 'provenance', term: 'Provenance', group: 'Data and knowledge', plain: 'The record of where a piece of information came from, carried with it so every answer can be traced back to its source.' },
  { key: 'lineage', term: 'Lineage', group: 'Data and knowledge', plain: 'The chain of steps data went through to reach its current form.' },
  { key: 'curation', term: 'Curation', group: 'Data and knowledge', aliases: ['curated', 'curator'], plain: 'Preparing data for a specific purpose before agents use it, with a named owner responsible for its quality.' },
  { key: 'semantic layer', term: 'Semantic layer', group: 'Data and knowledge', aliases: ['semantic contract'], plain: 'A shared set of business definitions (what counts as revenue, or an active customer) that keeps agents and reports using the same meaning.' },
  { key: 'memory', term: 'Agent memory', group: 'Data and knowledge', aliases: ['agent memory', 'memory tiers', 'instance memory'], plain: 'What an agent keeps between tasks, from the current conversation up to long-term knowledge about customers or assets. The longer it is kept, the more privacy and retention duties it carries.' },
  { key: 'erasure cascade', term: 'Erasure cascade', group: 'Data and knowledge', aliases: ['erasure'], plain: 'When a record is deleted, every copy derived from it (embeddings, memories, traces, test data) is deleted too.' },
  { key: 'acl-aware retrieval', term: 'ACL-aware retrieval', group: 'Data and knowledge', aliases: ['acl', 'permission-aware retrieval'], plain: 'Retrieval that checks the requester\'s permissions before returning information, so an agent cannot surface documents its user could not open.' },
  { key: 'entity resolution', term: 'Entity resolution', group: 'Data and knowledge', plain: 'Working out that records in different systems refer to the same real customer, asset, or case.' },
  { key: 'data residency', term: 'Data residency and sovereignty', group: 'Data and knowledge', aliases: ['residency', 'sovereignty'], plain: 'Rules about which country or region data may be stored and processed in, including the copies created for agents.' },
  { key: 'classification', term: 'Classification (data)', group: 'Data and knowledge', plain: 'A label for how sensitive data is. Anything derived from data inherits the strictest label of its sources.' },
  { key: 'cdc', term: 'Change data capture (CDC)', group: 'Data and knowledge', aliases: ['change data capture'], plain: 'Streaming each change in a database as it happens, so copies, including agent indexes, stay current.' },
  { key: 'api', term: 'API', group: 'Data and knowledge', aliases: ['apis'], plain: 'A defined way for software to talk to other software. Agents reach systems through governed APIs rather than through screens.' },
  { key: 'rpa', term: 'RPA (robotic process automation)', group: 'Data and knowledge', plain: 'Older software bots that click through screens on fixed scripts. Kept alongside agents rather than replaced on day one.' },
  { key: 'esb', term: 'ESB (enterprise service bus)', group: 'Data and knowledge', plain: 'An older central integration system that many companies still run.' },

  // Learning and quality
  { key: 'eval', term: 'Eval (evaluation suite)', group: 'Learning and quality', aliases: ['evals', 'eval suite', 'evaluation'], plain: 'A set of test tasks with known right answers, written by people who know the work, used to check an agent before and after any change.' },
  { key: 'judge', term: 'Judge (model judge)', group: 'Learning and quality', aliases: ['judges', 'llm-as-judge'], plain: 'An AI model used to grade another model\'s answers at scale. Checked regularly against human graders, and never allowed to grade its own work.' },
  { key: 'counterexample', term: 'Counterexample', group: 'Learning and quality', aliases: ['counterexamples'], plain: 'A test case built from a real failure, used to prove that a proposed rule or change actually holds.' },
  { key: 'promotion', term: 'Promotion and demotion', group: 'Learning and quality', aliases: ['demotion', 'promote', 'demote'], plain: 'Promotion moves a proven improvement into production. Demotion pulls it back out when it stops passing.' },
  { key: 'canary', term: 'Canary release', group: 'Learning and quality', aliases: ['canary release'], plain: 'Letting a small share of traffic (1 to 5 percent) use a change first, watching the results, then widening it.' },
  { key: 'shadow mode', term: 'Shadow mode', group: 'Learning and quality', aliases: ['shadow'], plain: 'Running a change alongside production without it affecting anything, to see what it would have done.' },
  { key: 'fine-tuning', term: 'Fine-tuning', group: 'Learning and quality', aliases: ['fine-tune', 'rft', 'sft'], plain: 'Adjusting a model\'s internal weights with examples. Slow, hard to undo, and rarely the right first step.' },
  { key: 'distillation', term: 'Distillation', group: 'Learning and quality', plain: 'Teaching a smaller, cheaper model to imitate a larger one on a narrow task once enough good examples exist.' },
  { key: 'flywheel', term: 'Learning flywheel', group: 'Learning and quality', aliases: ['learning flywheel'], plain: 'The controlled loop that makes agents better over time: collect evidence, test, approve, roll out in stages, and pull back what fails.' },
  { key: 'reward hacking', term: 'Reward hacking', group: 'Learning and quality', plain: 'When a model learns to score well on the measure rather than do the task. The reason measures are protected and humans spot-check.' },
  { key: 'benchmark', term: 'Benchmark', group: 'Learning and quality', aliases: ['benchmarks'], plain: 'A public test used to compare models or agents. Useful for orientation; scores can be gamed, so they are claims rather than measurements.' },

  // Running it day to day
  { key: 'observability', term: 'Observability', group: 'Running it day to day', plain: 'Being able to see what agents did, step by step, from records the agent cannot alter.' },
  { key: 'trace', term: 'Trace', group: 'Running it day to day', aliases: ['traces'], plain: 'The step-by-step log of one agent run: what it read, what it called, and what it decided.' },
  { key: 'telemetry', term: 'Telemetry', group: 'Running it day to day', plain: 'The stream of measurements a system emits about itself, collected centrally.' },
  { key: 'token', term: 'Token', group: 'Running it day to day', aliases: ['tokens'], plain: 'The unit AI usage is measured and billed in, roughly three-quarters of a word.' },
  { key: 'budget envelope', term: 'Budget envelope', group: 'Running it day to day', aliases: ['budget'], plain: 'A spending allowance for an agent with hard per-run caps and alarms, owned by its business sponsor.' },
  { key: 'cost per resolved outcome', term: 'Cost per resolved outcome', group: 'Running it day to day', plain: 'What it costs to actually solve one case, including supervision time and the cost of wrong answers, rather than what one run costs.' },
  { key: 'finops', term: 'FinOps', group: 'Running it day to day', plain: 'The discipline of tracking and controlling cloud and AI spend and attributing it to the people who own it.' },
  { key: 'latency', term: 'Latency', group: 'Running it day to day', plain: 'How long a request takes to come back.' },
  { key: 'degraded mode', term: 'Degraded mode', group: 'Running it day to day', aliases: ['fail closed', 'fail-close'], plain: 'What a system does when a part fails. For agents, that means falling back to a human queue rather than guessing.' },
  { key: 'durable execution', term: 'Durable execution', group: 'Running it day to day', aliases: ['checkpoint', 'checkpoints'], plain: 'Running long jobs so they survive a crash or restart and pick up where they left off.' },
  { key: 'burst rate', term: 'Burst rate', group: 'Running it day to day', plain: 'Demand measured at its busiest moments rather than averaged over a day. Oversight capacity is planned against bursts.' },
  { key: 'fan-out', term: 'Fan-out', group: 'Running it day to day', plain: 'How many agents or tasks one supervisor can watch at once, which shrinks as waiting times grow.' },
  { key: 'containment', term: 'Containment versus resolution', group: 'Running it day to day', aliases: ['resolution', 'deflection'], plain: 'Containment counts conversations that never reached a person. Resolution counts problems actually solved. Target resolution.' },
  { key: 'calibrated oversight', term: 'Calibrated oversight', group: 'Running it day to day', plain: 'As operators gain experience they grant broader standing permission and also step in more often, rather than supervising less.' },
  { key: 'evidence floor', term: 'Evidence floor', group: 'Running it day to day', plain: 'The minimum records every production agent keeps: a registry entry, action logs, named oversight, and traceable sources.' },

  // Standards and regulation
  { key: 'ai act', term: 'EU AI Act', group: 'Standards and regulation', aliases: ['eu ai act', 'article 12', 'annex iii'], plain: 'The European Union\'s AI regulation. Most duties fall on high-risk uses; this guide keeps an evidence floor for every agent and deeper records for the tier that could classify as high-risk.' },
  { key: 'ot', term: 'OT (operational technology)', group: 'Standards and regulation', aliases: ['operational technology', 'scada'], plain: 'The systems that run physical equipment: plants, grids, vehicles. Safety rules keep AI out of the control loop.' },
  { key: 'sis', term: 'Safety instrumented system (SIS)', group: 'Standards and regulation', aliases: ['safety instrumented system', 'iec 61511'], plain: 'Certified equipment that shuts a process down safely when limits are crossed. Standards exclude AI from it.' },
  { key: 'digital twin', term: 'Digital twin', group: 'Standards and regulation', plain: 'A simulation of a real asset or process, used to test a proposed action before it reaches the real thing.' },
  { key: 'validation loop', term: 'Validation loop', group: 'Standards and regulation', plain: 'Checking an agent\'s proposal against rules or a simulation before a person sees it, so only options that pass are shown.' },
  { key: 'attestation', term: 'Attestation', group: 'Standards and regulation', aliases: ['attest'], plain: 'A named person formally confirming that a record is true and taking responsibility for it. A model can draft; only a person can attest.' },
];

const lookup = new Map<string, GlossaryEntry>();
for (const entry of GLOSSARY) {
  lookup.set(entry.key, entry);
  for (const alias of entry.aliases ?? []) lookup.set(alias.toLowerCase(), entry);
}

export function findTerm(key: string): GlossaryEntry | undefined {
  return lookup.get(key.trim().toLowerCase());
}

export const GLOSSARY_GROUPS: GlossaryGroup[] = [
  'Agents and autonomy',
  'Control and security',
  'Data and knowledge',
  'Learning and quality',
  'Running it day to day',
  'Standards and regulation',
];
