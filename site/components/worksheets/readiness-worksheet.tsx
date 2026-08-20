'use client';

import { useMemo, useState } from 'react';

type Answer = 'yes' | 'partly' | 'no';
type AnswerState = Record<string, Answer | undefined>;

type Dimension = {
  id: string;
  shortLabel: string;
  title: string;
  questions: string[];
};

const dimensions: Dimension[] = [
  {
    id: 'data',
    shortLabel: 'Data',
    title: 'Data readiness',
    questions: [
      'Can you name the system of record and accountable data owner for each entity this agent will use or change?',
      'Are material quality issues measured, visible, and assigned for remediation?',
      'Do source permissions propagate into indexes, caches, traces, and other derived artifacts?',
      'Can a purpose-scoped corpus be assembled, refreshed, and erased within the funding period?',
    ],
  },
  {
    id: 'integration',
    shortLabel: 'Integration',
    title: 'Integration readiness',
    questions: [
      'Do required systems expose governed APIs rather than depend on screen automation?',
      'Does a tool gateway enforce allowlists, runtime credential injection, and audit?',
      'Does the requesting human’s identity survive every hop through on-behalf-of or equivalent delegation?',
      'Are events, idempotency, retry, and compensation available for long-running or consequential actions?',
    ],
  },
  {
    id: 'identity',
    shortLabel: 'Identity',
    title: 'Identity readiness',
    questions: [
      'Does every production agent have an ID2 first-class identity and named business sponsor?',
      'Are credentials short-lived, injected at execution, and never stored by the agent?',
      'Are permissions task-scoped and reviewed whenever tools or capabilities change?',
      'Has revocation or a kill switch been exercised end to end?',
    ],
  },
  {
    id: 'operations',
    shortLabel: 'Operations',
    title: 'Operational discipline',
    questions: [
      'Does a domain SME own 20–50 pass/fail eval tasks and a human baseline?',
      'Are traces and action logs collected outside the agent’s control?',
      'Is an incident owner alerted after hours, with a tested escalation path?',
      'Are drift, cost, supervision load, and rollback measured or drilled in production?',
    ],
  },
  {
    id: 'governance',
    shortLabel: 'Governance',
    title: 'Governance and value discipline',
    questions: [
      'Does intake define a resolved outcome, its value, and kill criteria before funding?',
      'Are deterministic zones identified, with decisions enforced outside the model?',
      'Are risk/classification tier, retention, and evidence duties set before launch?',
      'Is cost per resolved outcome measured including supervision and wrong-outcome cost, with a budget envelope?',
    ],
  },
  {
    id: 'workforce',
    shortLabel: 'Workforce',
    title: 'Workforce and operating model',
    questions: [
      'Are business sponsor, technical owner, corpus owner, and supervisor named?',
      'Does the affected team know which exceptions stay human and where escalation goes?',
      'Is burst supervision capacity calculated across the whole approved portfolio?',
      'Are role, skill, works-council where relevant, and unassisted-practice impacts planned?',
    ],
  },
];

const answerOptions: { value: Answer; label: string; explanation: string; points: number }[] = [
  { value: 'yes', label: 'Yes', explanation: 'Current and evidenced', points: 3 },
  { value: 'partly', label: 'Partly', explanation: 'Partial or unevidenced', points: 1 },
  { value: 'no', label: 'No', explanation: 'Absent', points: 0 },
];

const fictionalAnswers: AnswerState = Object.fromEntries(
  [
    ['yes', 'yes', 'partly', 'partly'],
    ['yes', 'partly', 'yes', 'partly'],
    ['yes', 'partly', 'partly', 'no'],
    ['partly', 'yes', 'partly', 'no'],
    ['yes', 'yes', 'partly', 'partly'],
    ['yes', 'partly', 'partly', 'no'],
  ].flatMap((answers, dimensionIndex) =>
    answers.map((answer, questionIndex) => [
      `${dimensions[dimensionIndex].id}-${questionIndex}`,
      answer as Answer,
    ]),
  ),
);

const levelNames = ['Absent', 'Ad hoc', 'Managed', 'Operated'];

function scoreDimension(dimension: Dimension, answers: AnswerState) {
  const answered = dimension.questions.map((_, index) => answers[`${dimension.id}-${index}`]);
  if (answered.some((answer) => answer === undefined)) return null;
  const sum = answered.reduce((total, answer) => {
    const option = answerOptions.find((item) => item.value === answer);
    return total + (option?.points ?? 0);
  }, 0);
  return Math.floor(sum / dimension.questions.length);
}

function autonomyRecommendation(profile: Record<string, number | null>) {
  if (Object.values(profile).some((score) => score === null)) {
    return {
      level: 'Not yet available',
      detail: 'Answer all 24 questions to calculate the workload-specific readiness ceiling.',
    };
  }

  const scores = Object.fromEntries(Object.entries(profile).map(([key, value]) => [key, value ?? 0]));
  const all = Object.values(scores);

  if (all.some((score) => score === 0)) {
    return {
      level: 'A1: assisted only',
      detail: 'At least one readiness dimension is absent. Keep the model advisory while the zero is remediated.',
    };
  }
  if (all.every((score) => score === 3)) {
    return {
      level: 'A4: managed autonomy',
      detail:
        'The profile supports A4. It is eligible for a separate A5 candidacy review, which must be domain-specific and verify regulator-ready evidence.',
    };
  }
  if (
    all.every((score) => score >= 2) &&
    scores.operations === 3 &&
    scores.governance === 3
  ) {
    return {
      level: 'A4: managed autonomy',
      detail: 'All dimensions are managed, with operated controls in operations and governance. Governed learning is still required.',
    };
  }
  if (
    scores.data >= 2 &&
    scores.integration >= 2 &&
    scores.identity >= 2 &&
    scores.operations >= 2
  ) {
    return {
      level: 'A3: supervised autonomy',
      detail: 'Core data, integration, identity, and operational controls are managed. Supervision remains explicit and measured.',
    };
  }
  if (
    scores.data >= 2 &&
    scores.integration >= 2 &&
    all.every((score) => score >= 1)
  ) {
    return {
      level: 'A2: delegated tasks',
      detail: 'Data and integration are managed, while the remaining dimensions are at least ad hoc. Keep tasks bounded and reviewable.',
    };
  }
  return {
    level: 'A1: assisted only',
    detail: 'The profile does not yet meet the A2 gate. Use the gaps as a remediation queue rather than averaging them away.',
  };
}

export function ReadinessWorksheet() {
  const [answers, setAnswers] = useState<AnswerState>({});
  const [fictional, setFictional] = useState(false);

  const completed = Object.values(answers).filter(Boolean).length;
  const profile = useMemo(
    () => Object.fromEntries(dimensions.map((dimension) => [dimension.id, scoreDimension(dimension, answers)])),
    [answers],
  );
  const recommendation = useMemo(() => autonomyRecommendation(profile), [profile]);

  function setAnswer(key: string, answer: Answer) {
    setAnswers((current) => ({ ...current, [key]: answer }));
    setFictional(false);
  }

  return (
    <section aria-labelledby="readiness-tool-title" className="rounded-2xl border bg-fd-card p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">Interactive worksheet</p>
          <h2 id="readiness-tool-title" className="mt-2 text-2xl font-semibold tracking-tight">
            Build a six-dimension readiness profile
          </h2>
          <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
            Assess one target workload, not the enterprise in the abstract. The profile, not a grand total, sets the autonomy ceiling.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={() => {
              setAnswers(fictionalAnswers);
              setFictional(true);
            }}
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
          >
            Load fictional example
          </button>
          <button
            type="button"
            onClick={() => {
              setAnswers({});
              setFictional(false);
            }}
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-medium">{completed} of 24 answered</span>
        <div className="h-2 w-48 max-w-full overflow-hidden rounded-full bg-fd-muted" aria-hidden="true">
          <div className="h-full bg-fd-primary transition-[width]" style={{ width: `${(completed / 24) * 100}%` }} />
        </div>
        <span className="sr-only">{Math.round((completed / 24) * 100)} percent complete</span>
      </div>

      {fictional ? (
        <div role="status" className="mt-4 rounded-lg border border-dashed p-3 text-sm">
          <strong>Fictional teaching example: Northstar Components.</strong> The answers and resulting profile are invented to
          demonstrate the instrument. They are not a benchmark.
        </div>
      ) : null}

      <div className="mt-6 grid gap-7 xl:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.8fr)]">
        <div className="space-y-7">
          {dimensions.map((dimension, dimensionIndex) => (
            <section key={dimension.id} aria-labelledby={`${dimension.id}-heading`} className="rounded-xl border p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 id={`${dimension.id}-heading`} className="text-lg font-semibold">
                  {dimension.title}
                </h3>
                <span className="text-sm text-fd-muted-foreground">Questions {dimensionIndex * 4 + 1}–{dimensionIndex * 4 + 4}</span>
              </div>
              <div className="mt-4 divide-y">
                {dimension.questions.map((question, questionIndex) => {
                  const key = `${dimension.id}-${questionIndex}`;
                  return (
                    <fieldset key={key} className="py-4 first:pt-0 last:pb-0">
                      <legend className="text-sm font-medium leading-6">
                        <span className="mr-2 text-fd-muted-foreground">{dimensionIndex * 4 + questionIndex + 1}.</span>
                        {question}
                      </legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-3">
                        {answerOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm has-[:checked]:border-fd-primary has-[:checked]:bg-fd-accent"
                          >
                            <input
                              type="radio"
                              name={key}
                              value={option.value}
                              checked={answers[key] === option.value}
                              onChange={() => setAnswer(key, option.value)}
                              className="mt-0.5 size-4 accent-[var(--color-fd-primary)]"
                            />
                            <span>
                              <span className="block font-medium">{option.label}</span>
                              <span className="mt-0.5 block text-xs leading-5 text-fd-muted-foreground">{option.explanation}</span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        <aside className="self-start rounded-xl border bg-fd-background p-4 xl:sticky xl:top-6" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fd-muted-foreground">Readiness profile</p>
          <h3 className="mt-2 text-xl font-semibold">Recommended ceiling</h3>
          <p className="mt-2 text-lg font-semibold">{recommendation.level}</p>
          <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">{recommendation.detail}</p>

          <div className="mt-5 space-y-3">
            {dimensions.map((dimension) => {
              const score = profile[dimension.id];
              return (
                <div key={dimension.id}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-medium">{dimension.shortLabel}</span>
                    <span className="tabular-nums text-fd-muted-foreground">
                      {score === null ? 'Incomplete' : `${score}/3: ${levelNames[score]}`}
                    </span>
                  </div>
                  <div
                    role={score === null ? undefined : 'meter'}
                    aria-label={score === null ? undefined : `${dimension.title} score`}
                    aria-valuemin={score === null ? undefined : 0}
                    aria-valuemax={score === null ? undefined : 3}
                    aria-valuenow={score ?? undefined}
                    aria-valuetext={score === null ? undefined : `${score} of 3, ${levelNames[score]}`}
                    aria-hidden={score === null ? true : undefined}
                    className="mt-1.5 h-2 overflow-hidden rounded-full bg-fd-muted"
                  >
                    <div
                      className="h-full bg-fd-primary transition-[width]"
                      style={{ width: score === null ? '0%' : `${(score / 3) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-lg bg-fd-muted p-3 text-xs leading-5 text-fd-muted-foreground">
            <strong className="text-fd-foreground">Scoring:</strong> Yes = 3, Partly = 1, No = 0. Each dimension is the
            floor of its four-answer average. Weak dimensions stay visible; no grand total is calculated.
          </div>
        </aside>
      </div>
    </section>
  );
}
