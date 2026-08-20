'use client';

import { useMemo, useState } from 'react';

type FactorId =
  | 'audience'
  | 'archetype'
  | 'regulation'
  | 'sovereignty'
  | 'risk'
  | 'vendor'
  | 'capacity'
  | 'cost';

type Answers = Record<FactorId, string>;
type ReadinessId = 'data' | 'integration' | 'identity' | 'operations' | 'governance' | 'workforce';
type ReadinessProfile = Record<ReadinessId, number | ''>;
type HighestProvenExit = 'unanswered' | 'none' | '0' | '1' | '2' | '3' | '4' | '5';

type Factor = {
  id: FactorId;
  number: number;
  label: string;
  prompt: string;
  options: { value: string; label: string }[];
};

type Stage = {
  number: number;
  title: string;
  entry: string;
  work: string;
  exit: string;
};

const factors: Factor[] = [
  {
    id: 'audience',
    number: 1,
    label: 'Audience',
    prompt: 'Which lane must the programme serve first?',
    options: [
      { value: 'internal', label: 'Internal first' },
      { value: 'customer', label: 'Customer-facing now' },
      { value: 'both', label: 'Internal and customer-facing' },
    ],
  },
  {
    id: 'archetype',
    number: 2,
    label: 'Enterprise archetype',
    prompt: 'Which operating shape best describes the enterprise?',
    options: [
      { value: 'global', label: 'Global regulated enterprise' },
      { value: 'midmarket', label: 'Mid-market enterprise' },
      { value: 'digital', label: 'Digital native' },
    ],
  },
  {
    id: 'regulation',
    number: 3,
    label: 'Regulatory intensity',
    prompt: 'What is the most restrictive plausible regulatory posture?',
    options: [
      { value: 'light', label: 'Light' },
      { value: 'sectoral', label: 'Sectoral regulation' },
      { value: 'high', label: 'High-risk plausible' },
    ],
  },
  {
    id: 'sovereignty',
    number: 4,
    label: 'Sovereignty',
    prompt: 'Which sovereignty tier must the target workload meet?',
    options: [
      { value: 'sv0-1', label: 'SV0–SV1: standard or residency-selected service' },
      { value: 'sv2', label: 'SV2: sovereign offering' },
      { value: 'sv3-4', label: 'SV3–SV4: customer-controlled or disconnected' },
    ],
  },
  {
    id: 'risk',
    number: 5,
    label: 'Risk appetite',
    prompt: 'How should reversibility and blast radius shape sequencing?',
    options: [
      { value: 'conservative', label: 'Conservative' },
      { value: 'balanced', label: 'Balanced' },
      { value: 'aggressive', label: 'Aggressive' },
    ],
  },
  {
    id: 'vendor',
    number: 7,
    label: 'Vendor gravity',
    prompt: 'Where do the dominant data and permission boundaries live?',
    options: [
      { value: 'productivity', label: 'Productivity-suite led' },
      { value: 'record', label: 'System-of-record led' },
      { value: 'cloud', label: 'Cloud native' },
    ],
  },
  {
    id: 'capacity',
    number: 8,
    label: 'Build capacity',
    prompt: 'What platform capability can the enterprise operate?',
    options: [
      { value: 'none', label: 'No platform team' },
      { value: 'one', label: 'One platform team' },
      { value: 'org', label: 'Platform organisation' },
    ],
  },
  {
    id: 'cost',
    number: 9,
    label: 'Cost preference',
    prompt: 'Which commercial meter dominates?',
    options: [
      { value: 'fixed', label: 'Fixed, seat-based' },
      { value: 'metered', label: 'Variable, metered' },
      { value: 'mixed', label: 'Mixed estates' },
    ],
  },
];

const readinessDimensions: { id: ReadinessId; label: string }[] = [
  { id: 'data', label: 'Data' },
  { id: 'integration', label: 'Integration' },
  { id: 'identity', label: 'Identity' },
  { id: 'operations', label: 'Operations' },
  { id: 'governance', label: 'Governance/value' },
  { id: 'workforce', label: 'Workforce' },
];

const stages: Stage[] = [
  {
    number: 0,
    title: 'Ground',
    entry: 'None. Every enterprise starts by establishing what exists, including enterprises with agents already in production.',
    work: 'Run the six-dimension readiness assessment and the first use-case portfolio round. Define the sponsor model and agree the business-specific deterministic-zone list.',
    exit: 'A recorded readiness profile; at least three use cases through all admission gates; a named sponsor per candidate; and an explicit deterministic-zone list.',
  },
  {
    number: 1,
    title: 'First value',
    entry: 'Stage 0 exit gate.',
    work: 'Ship one evaluable, bounded A2 use case. Establish the evidence floor: registry entry, retained action logs, named oversight, and provenance-carrying grounding.',
    exit: 'Measured cost per resolved outcome; a domain-owned eval suite; and traces collected outside the agent’s control.',
  },
  {
    number: 2,
    title: 'Platform',
    entry: 'Stage 1 exit gate.',
    work: 'Establish the control and knowledge planes: registered identities, policy in the tool path, governed API wrappers, purpose-scoped curation, ACL propagation, and parse-time provenance.',
    exit: 'No credential-only production agents; deterministic gates on consequential actions; an end-to-end erasure cascade; and kill switches drilled at more than one point.',
  },
  {
    number: 3,
    title: 'Scale',
    entry: 'Stage 2 exit gate.',
    work: 'Expand the admitted portfolio. Operate governed promotion and demotion, per-agent budget envelopes, and one view across licensed and metered estates.',
    exit: 'At least one promoted and one demoted artifact; live budget anomaly alerts; and licensed-estate telemetry visible with metered usage.',
  },
  {
    number: 4,
    title: 'Autonomy',
    entry: 'Stage 3 exit gate plus measured oversight burst capacity, including wait time and the whole approved portfolio.',
    work: 'Run A4 candidates while measuring supervision load, intervention triggers, escalation mix, wait time, and skill-retention controls.',
    exit: 'Production burst demand remains inside measured capacity, and intervention behaviour demonstrates calibrated oversight rather than absent oversight.',
  },
  {
    number: 5,
    title: 'Extend',
    entry: 'Stage 4 exit gate for the internal lane.',
    work: 'Open lanes with different failure models: a separate customer edge on the shared control plane; advisory-only OT with tested revert-to-manual.',
    exit: 'Lane-specific proof: customer resolution and real-human escalation; OT specialist outcomes with agent output visually distinct from configured alarms.',
  },
];

const emptyAnswers: Answers = {
  audience: '',
  archetype: '',
  regulation: '',
  sovereignty: '',
  risk: '',
  vendor: '',
  capacity: '',
  cost: '',
};

const emptyReadiness: ReadinessProfile = {
  data: '',
  integration: '',
  identity: '',
  operations: '',
  governance: '',
  workforce: '',
};

const fictionalAnswers: Answers = {
  audience: 'internal',
  archetype: 'midmarket',
  regulation: 'sectoral',
  sovereignty: 'sv0-1',
  risk: 'balanced',
  vendor: 'record',
  capacity: 'one',
  cost: 'mixed',
};

const fictionalReadiness: ReadinessProfile = {
  data: 2,
  integration: 2,
  identity: 1,
  operations: 1,
  governance: 2,
  workforce: 1,
};

const selectClass =
  'mt-1.5 w-full rounded-lg border bg-fd-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-fd-ring';

function readinessCeiling(profile: ReadinessProfile) {
  const values = Object.values(profile).map(Number);
  if (values.some((value) => value === 0)) return 1;
  if (
    values.every((value) => value >= 2) &&
    Number(profile.operations) === 3 &&
    Number(profile.governance) === 3
  ) return 4;
  if (
    Number(profile.data) >= 2 &&
    Number(profile.integration) >= 2 &&
    Number(profile.identity) >= 2 &&
    Number(profile.operations) >= 2
  ) return 3;
  if (
    Number(profile.data) >= 2 &&
    Number(profile.integration) >= 2 &&
    values.every((value) => value >= 1)
  ) return 2;
  return 1;
}

function buildPlainText(
  stageModifiers: Record<number, string[]>,
  readinessCeiling: number,
  effectiveCeiling: number,
  customerCeiling: number,
  conflicts: string[],
  applicableStage: Stage,
  terminal: boolean,
) {
  const lines = [
    'GENERATED GATE-BASED ROADMAP',
    `Readiness-derived autonomy ceiling: A${readinessCeiling}`,
    `Effective current internal ceiling: A${effectiveCeiling}`,
    `Effective current customer-lane ceiling: A${customerCeiling}`,
    `Current posture: Stage ${applicableStage.number}, ${applicableStage.title}`,
    terminal
      ? 'All selected Stage 5 lane exits are proven. Operate, monitor, and re-run the roadmap when factors change.'
      : `Evidence needed to leave it: ${applicableStage.exit}`,
    '',
    'CONFLICT RESOLUTION',
    ...conflicts.map((item) => `- ${item}`),
    '',
  ];
  for (const stage of stages) {
    lines.push(`STAGE ${stage.number}: ${stage.title.toUpperCase()}`);
    lines.push(`Entry gate: ${stage.entry}`);
    lines.push(`Work: ${stage.work}`);
    lines.push(`Exit gate: ${stage.exit}`);
    if (stageModifiers[stage.number]?.length) {
      lines.push('Selected modifiers:');
      lines.push(...stageModifiers[stage.number].map((modifier) => `- ${modifier}`));
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function RoadmapWorksheet() {
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [readiness, setReadiness] = useState<ReadinessProfile>(emptyReadiness);
  const [highestProvenExit, setHighestProvenExit] = useState<HighestProvenExit>('unanswered');
  const [copyStatus, setCopyStatus] = useState('');
  const [fictional, setFictional] = useState(false);

  const completedFactors =
    Object.values(answers).filter(Boolean).length + (Object.values(readiness).every((value) => value !== '') ? 1 : 0);
  const complete = completedFactors === 9 && highestProvenExit !== 'unanswered';

  const generated = useMemo(() => {
    if (!complete) return null;

    const modifiers: Record<number, string[]> = Object.fromEntries(stages.map((stage) => [stage.number, []]));
    const conflicts: string[] = [
      'All selected constraints are accumulated. A permissive answer never removes a base entry gate, exit gate, or prohibition.',
    ];
    const add = (stage: number, text: string) => modifiers[stage].push(text);

    if (answers.audience === 'internal') {
      add(5, 'Customer-facing work remains deferred until the internal lane has passed Stage 4.');
    } else if (answers.audience === 'customer') {
      add(2, 'Run a customer lane in parallel with a separate edge on the shared control plane.');
      add(2, 'Before launch: prove disclosure compliance, a real-human escalation queue, and resolution instrumentation.');
      add(3, 'Customer-facing autonomy remains at A2 until the Stage 3 exit gate passes.');
    } else {
      add(0, 'Operate two portfolios with separate supervision budgets.');
      add(2, 'Use separate internal and customer edges on one shared control plane; do not duplicate identity, knowledge, eval, or observability.');
      add(3, 'Customer-facing autonomy remains at A2 until the Stage 3 exit gate passes.');
    }

    if (answers.archetype === 'global') {
      add(2, 'Govern the metered estate and extract telemetry plus tenant policy from the licensed estate; one gateway cannot represent both.');
      add(2, 'Add sovereignty routing to the Stage 2 exit gate.');
    } else if (answers.archetype === 'midmarket') {
      add(2, 'Rent Stage 2 capabilities except corpus ownership and the knowledge discipline that must remain internal.');
      add(4, 'Treat Stage 4 as optional; do not enter it until genuine eval and oversight machinery exists.');
    } else {
      add(1, 'Pull control-plane and evidence-plane foundations forward into Stage 1 because they are costly to retrofit.');
      add(4, 'Complete an explicit A4 oversight-capacity self-assessment before entry.');
    }

    if (answers.regulation === 'light') {
      add(1, 'Operate the evidence floor; deeper instrumentation is required only if workload classification changes.');
    } else if (answers.regulation === 'sectoral') {
      add(0, 'Map sector-regulator requirements before architecture choices; the sector rule binds wherever it is stricter.');
      add(1, 'Add sector-specific evidence, oversight, retention, and reporting requirements to the evidence floor.');
    } else {
      add(0, 'Begin high-risk classification work now and treat provider-flip risk as an initial architecture constraint.');
      add(1, 'Apply Article-12-grade instrumentation to the plausibly high-risk tier.');
    }

    if (answers.sovereignty === 'sv2') {
      add(2, 'Select a sovereign offering and prove residency for indexes, caches, memories, traces, and other derived artifacts before exit.');
    } else if (answers.sovereignty === 'sv3-4') {
      add(1, 'Pass a serving-infrastructure sub-gate before Stage 2; explicitly own model-currency and disconnected-operation burdens.');
      add(2, 'Do not claim a cost advantage without workload-specific evidence; no general peer-reviewed unit economics settles the comparison.');
    }

    if (answers.risk === 'conservative') {
      add(0, 'Weight reversibility more heavily in the admitted portfolio.');
      add(4, 'A3 remains the ceiling until the Stage 4 exit gate passes.');
    } else if (answers.risk === 'aggressive') {
      add(0, 'Admit higher-blast-radius candidates earlier only when evaluable and grounded.');
      add(2, 'Raise the control-plane bar earlier; aggressive appetite does not remove or weaken any gate.');
    }

    const ceiling = readinessCeiling(readiness);
    if (ceiling === 1) {
      add(1, 'Readiness caps autonomy at A1. Stage 1 remains the active roadmap until every zero or sub-gate gap is fixed.');
    } else if (ceiling === 2) {
      add(1, 'Readiness permits A2 delegated tasks; higher autonomy remains prohibited until the profile is remediated.');
    } else if (ceiling === 3) {
      add(3, 'Readiness permits A3 only after the preceding stage gates pass; readiness does not waive those gates.');
    } else {
      add(4, 'Readiness supports A4 candidacy only after governed learning and the measured Stage 4 oversight-capacity gate are proven.');
    }
    if (Number(readiness.identity) < 2) {
      add(2, 'Identity below 2 imposes a hard A2 cap regardless of stronger dimensions.');
      conflicts.push('Identity below 2 overrides any more permissive readiness signal; the autonomy ceiling is capped at A2.');
    }

    if (answers.vendor === 'productivity') {
      add(1, 'Use bundled solitary-work wins and add licence utilisation to the exit evidence without mistaking utilisation for value.');
    } else if (answers.vendor === 'record') {
      add(2, 'Expose record-system actions through tool servers wrapping the suite’s governed APIs; use external orchestration for cross-suite work.');
    } else {
      add(2, 'Treat the registry, not gateway availability, as the likely gap; add allowlist discipline to the exit gate.');
    }

    if (answers.capacity === 'none') {
      add(2, 'Rent Stage 2. Operate at most one independent capability that the current team can genuinely support.');
    } else if (answers.capacity === 'one') {
      add(2, 'Build only the control plane. Buy or outsource knowledge-plane mechanics while retaining internal corpus ownership.');
    } else {
      add(2, 'The platform organisation may build the full spine, subject to every selected control and evidence gate.');
    }

    if (answers.cost === 'fixed') {
      add(1, 'Make licence utilisation an exit criterion and operate capability-surface gating as a live process.');
    } else if (answers.cost === 'metered') {
      add(2, 'Move per-run budget enforcement and loop-multiplier limits into the Stage 2 exit gate.');
    } else {
      add(3, 'Require a single two-estate cost view at the Stage 3 exit gate.');
    }

    if (answers.risk === 'aggressive' && answers.regulation !== 'light') {
      conflicts.push('Aggressive risk appetite cannot cancel regulatory controls; earlier consequential work is allowed only with the stricter controls pulled forward.');
    }
    if (answers.capacity === 'none' && (answers.archetype === 'global' || answers.sovereignty !== 'sv0-1')) {
      conflicts.push('Limited build capacity changes delivery to rented capability; it does not remove sovereignty, evidence, or dual-estate obligations.');
    }

    const selectedStageNumber = highestProvenExit === 'none'
      ? 0
      : Math.min(Number(highestProvenExit) + 1, 5);
    let applicableStageNumber = selectedStageNumber;
    if (ceiling === 1 && applicableStageNumber > 1) {
      applicableStageNumber = 1;
      conflicts.push(`The claimed Stage ${selectedStageNumber} position conflicts with a readiness dimension at 0. Stage 1 wins until every zero is fixed.`);
    }
    const applicableStage = stages[applicableStageNumber];
    const terminal = highestProvenExit === '5' && applicableStageNumber === 5;
    const stageCeilings = [1, 2, 2, 3, 4, 4];
    const stageCeiling = stageCeilings[applicableStageNumber];
    const stageFourExitProven = highestProvenExit !== 'none' && Number(highestProvenExit) >= 4;
    const riskCeiling = answers.risk === 'conservative' && !stageFourExitProven ? 3 : 5;
    const effectiveCeiling = Math.min(ceiling, stageCeiling, riskCeiling);
    if (stageCeiling < ceiling) {
      conflicts.push(`Readiness permits A${ceiling}, but the current Stage ${applicableStageNumber} evidence gate permits at most A${stageCeiling}. A${stageCeiling} wins now.`);
    }
    if (riskCeiling < Math.min(ceiling, stageCeiling)) {
      conflicts.push(`Readiness and stage evidence permit more, but conservative risk posture caps autonomy at A3 until the Stage 4 exit is proven. A3 wins now.`);
    }

    const stageThreeExitProven = highestProvenExit !== 'none' && Number(highestProvenExit) >= 3;
    const customerPolicyCeiling = stageThreeExitProven ? 5 : 2;
    const customerCeiling = Math.min(effectiveCeiling, customerPolicyCeiling);
    if (answers.audience !== 'internal' && customerCeiling < effectiveCeiling) {
      conflicts.push(`The internal lane permits A${effectiveCeiling}, but the customer-facing lane is capped at A2 until the Stage 3 exit is proven. A2 wins for that lane.`);
    }
    conflicts.push(`The effective current internal ceiling is A${effectiveCeiling}; it is the minimum of readiness A${ceiling}, Stage ${applicableStageNumber} evidence A${stageCeiling}, and the selected risk posture.`);

    return {
      modifiers,
      conflicts,
      ceiling,
      effectiveCeiling,
      customerCeiling,
      applicableStage,
      terminal,
      plainText: buildPlainText(modifiers, ceiling, effectiveCeiling, customerCeiling, conflicts, applicableStage, terminal),
    };
  }, [answers, complete, highestProvenExit, readiness]);

  async function copyRoadmap() {
    if (!generated) return;
    try {
      await navigator.clipboard.writeText(generated.plainText);
      setCopyStatus('Roadmap copied to the clipboard.');
    } catch {
      setCopyStatus('Copy was unavailable. Select the roadmap text below and copy it manually.');
    }
  }

  return (
    <section aria-labelledby="roadmap-tool-title" className="rounded-2xl border bg-fd-card p-4 sm:p-6">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">Interactive generator</p>
        <h2 id="roadmap-tool-title" className="mt-2 text-2xl font-semibold tracking-tight">
          Compose a gate-based roadmap
        </h2>
        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
          Answer nine factors. The tool adds their constraints to a fixed six-stage spine; it never invents durations or lets a permissive answer cancel a stricter one.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm print:hidden">
        <span className="font-medium">{completedFactors} of 9 factors complete</span>
        <div className="h-2 w-48 max-w-full overflow-hidden rounded-full bg-fd-muted" aria-hidden="true">
          <div className="h-full bg-fd-primary transition-[width]" style={{ width: `${(completedFactors / 9) * 100}%` }} />
        </div>
        <span className="sr-only">{Math.round((completedFactors / 9) * 100)} percent complete</span>
        <button
          type="button"
          onClick={() => {
            setAnswers(fictionalAnswers);
            setReadiness(fictionalReadiness);
            setHighestProvenExit('none');
            setFictional(true);
            setCopyStatus('');
          }}
          className="ml-auto rounded-lg border px-3 py-2 text-sm font-medium hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
        >
          Load fictional example
        </button>
        <button
          type="button"
          onClick={() => {
            setAnswers(emptyAnswers);
            setReadiness(emptyReadiness);
            setHighestProvenExit('unanswered');
            setCopyStatus('');
            setFictional(false);
          }}
          className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
        >
          Reset
        </button>
      </div>

      {fictional ? (
        <div role="status" className="mt-4 rounded-lg border border-dashed p-3 text-sm print:hidden">
          <strong>Fictional teaching example: Northstar Components.</strong> These factor answers are invented to demonstrate
          composition. They are not a benchmark, duration estimate, or recommendation.
        </div>
      ) : null}

      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {generated
          ? `Roadmap generated. Applicable stage: Stage ${generated.applicableStage.number}, ${generated.applicableStage.title}. Effective internal autonomy ceiling A${generated.effectiveCeiling}; customer-lane ceiling A${generated.customerCeiling}.`
          : `Roadmap waiting. ${completedFactors} of 9 factors complete${highestProvenExit === 'unanswered' ? '; current evidence gate not selected' : ''}.`}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 print:hidden">
        {factors.slice(0, 5).map((factor) => (
          <label key={factor.id} className="rounded-xl border p-4 text-sm font-medium">
            <span className="text-xs text-fd-muted-foreground">Factor {factor.number}</span>
            <span className="mt-1 block text-base">{factor.label}</span>
            <span className="mt-1 block font-normal leading-5 text-fd-muted-foreground">{factor.prompt}</span>
            <select
              value={answers[factor.id]}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, [factor.id]: event.target.value }));
                setFictional(false);
              }}
              className={selectClass}
            >
              <option value="">Select one</option>
              {factor.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}

        <fieldset className="rounded-xl border p-4 sm:col-span-2">
          <legend className="px-1 text-base font-semibold">Factor 6: Data and operating readiness</legend>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
            Enter the six-value profile from the readiness worksheet. The weakest relevant dimension governs; no total is used.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {readinessDimensions.map((dimension) => (
              <label key={dimension.id} className="text-sm font-medium">
                {dimension.label}
                <select
                  value={readiness[dimension.id]}
                  onChange={(event) => {
                    setReadiness((current) => ({
                      ...current,
                      [dimension.id]: event.target.value === '' ? '' : Number(event.target.value),
                    }));
                    setFictional(false);
                  }}
                  className={selectClass}
                >
                  <option value="">Select score</option>
                  <option value="0">0: absent</option>
                  <option value="1">1: ad hoc</option>
                  <option value="2">2: managed</option>
                  <option value="3">3: operated</option>
                </select>
              </label>
            ))}
          </div>
        </fieldset>

        {factors.slice(5).map((factor) => (
          <label key={factor.id} className="rounded-xl border p-4 text-sm font-medium">
            <span className="text-xs text-fd-muted-foreground">Factor {factor.number}</span>
            <span className="mt-1 block text-base">{factor.label}</span>
            <span className="mt-1 block font-normal leading-5 text-fd-muted-foreground">{factor.prompt}</span>
            <select
              value={answers[factor.id]}
              onChange={(event) => {
                setAnswers((current) => ({ ...current, [factor.id]: event.target.value }));
                setFictional(false);
              }}
              className={selectClass}
            >
              <option value="">Select one</option>
              {factor.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}

        <fieldset className="rounded-xl border p-4 sm:col-span-2">
          <legend className="px-1 text-base font-semibold">Current evidence gate</legend>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
            Select the highest stage whose exit evidence is fully proven. The first unpassed stage is the applicable stage now.
          </p>
          <div className="mt-3 grid gap-2">
            <label className="flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm">
              <input
                type="radio"
                name="highest-proven-exit"
                value="none"
                checked={highestProvenExit === 'none'}
                onChange={() => {
                  setHighestProvenExit('none');
                  setFictional(false);
                }}
                className="mt-0.5 size-4 accent-[var(--color-fd-primary)]"
              />
              <span><strong>No stage exit is proven yet.</strong> Stage 0: Ground is applicable.</span>
            </label>
            {stages.map((stage) => (
              <label key={stage.number} className="flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm">
                <input
                  type="radio"
                  name="highest-proven-exit"
                  value={stage.number}
                  checked={highestProvenExit === String(stage.number)}
                  onChange={() => {
                    setHighestProvenExit(String(stage.number) as HighestProvenExit);
                    setFictional(false);
                  }}
                  className="mt-0.5 size-4 accent-[var(--color-fd-primary)]"
                />
                <span>
                  <strong>Stage {stage.number}: {stage.title} exit is proven.</strong>{' '}
                  {stage.number < 5
                    ? `The applicable stage becomes Stage ${stage.number + 1}: ${stages[stage.number + 1].title}.`
                    : 'All selected lane exits are proven. Keep Stage 5 as the operating posture and re-run this roadmap when a factor changes.'}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {!generated ? (
        <div className="mt-8 rounded-xl border border-dashed p-5" role="status">
          <h3 className="font-semibold">Generated roadmap waiting</h3>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
            Complete all nine factors and identify the highest proven exit gate to compose the roadmap and current applicable stage.
          </p>
        </div>
      ) : (
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
            <div>
              <h3 className="text-xl font-semibold">Generated roadmap</h3>
              <p className="mt-1 text-sm text-fd-muted-foreground">Selectable text, structured by proof gates rather than dates.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyRoadmap}
                className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
              >
                Copy roadmap
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-lg bg-fd-primary px-3 py-2 text-sm font-medium text-fd-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
              >
                Print roadmap
              </button>
            </div>
          </div>
          <p className="mt-2 text-sm" role="status">{copyStatus}</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border bg-fd-background p-4">
              <p className="text-sm text-fd-muted-foreground">Readiness-derived ceiling</p>
              <p className="mt-1 text-xl font-semibold">A{generated.ceiling}</p>
            </div>
            <div className="rounded-xl border bg-fd-background p-4">
              <p className="text-sm text-fd-muted-foreground">Effective current internal ceiling</p>
              <p className="mt-1 text-xl font-semibold">A{generated.effectiveCeiling}</p>
            </div>
            <div className="rounded-xl border bg-fd-background p-4">
              <p className="text-sm text-fd-muted-foreground">Effective current customer-lane ceiling</p>
              <p className="mt-1 text-xl font-semibold">A{generated.customerCeiling}</p>
            </div>
            <div className="rounded-xl border border-fd-primary bg-fd-primary/5 p-4">
              <p className="text-sm text-fd-muted-foreground">{generated.terminal ? 'Operating posture' : 'Applicable now'}</p>
              <p className="mt-1 text-xl font-semibold">Stage {generated.applicableStage.number}: {generated.applicableStage.title}</p>
              <p className="mt-2 text-xs leading-5 text-fd-muted-foreground">
                {generated.terminal
                  ? 'All selected lane exits are proven. Monitor and re-run when factors change.'
                  : `Leave it only when: ${generated.applicableStage.exit}`}
              </p>
            </div>
          </div>

          <section aria-labelledby="conflict-heading" className="mt-5 rounded-xl border bg-fd-muted p-4">
            <h4 id="conflict-heading" className="font-semibold">More-restrictive-wins resolution</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-fd-muted-foreground">
              {generated.conflicts.map((conflict) => (
                <li key={conflict}>{conflict}</li>
              ))}
            </ul>
          </section>

          <ol className="mt-6 space-y-5" aria-label="Six-stage generated roadmap">
            {stages.map((stage) => (
              <li
                key={stage.number}
                aria-current={stage.number === generated.applicableStage.number ? 'step' : undefined}
                className={`break-inside-avoid rounded-xl border bg-fd-background p-4 sm:p-5 ${stage.number === generated.applicableStage.number ? 'border-fd-primary ring-2 ring-fd-primary/30' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-fd-primary text-sm font-semibold text-fd-primary-foreground">
                    {stage.number}
                  </span>
                  <h4 className="text-lg font-semibold">Stage {stage.number}: {stage.title}</h4>
                  {stage.number === generated.applicableStage.number ? (
                    <span className="ml-auto rounded-full bg-fd-primary px-2.5 py-1 text-xs font-semibold text-fd-primary-foreground">
                      {generated.terminal ? 'Operate and reassess' : 'Applicable now'}
                    </span>
                  ) : null}
                </div>
                <dl className="mt-4 grid gap-3 text-sm leading-6">
                  <div>
                    <dt className="font-semibold">Entry gate</dt>
                    <dd className="text-fd-muted-foreground">{stage.entry}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Work</dt>
                    <dd className="text-fd-muted-foreground">{stage.work}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Exit gate</dt>
                    <dd className="text-fd-muted-foreground">{stage.exit}</dd>
                  </div>
                </dl>
                {generated.modifiers[stage.number].length > 0 ? (
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-semibold">Selected modifiers</p>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-fd-muted-foreground">
                      {generated.modifiers[stage.number].map((modifier) => (
                        <li key={modifier}>{modifier}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
