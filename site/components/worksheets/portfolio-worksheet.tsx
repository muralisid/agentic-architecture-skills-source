'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type BinaryAnswer = 'yes' | 'no' | '';
type GroundingAnswer = 'exists' | 'within-period' | 'not-within-period' | '';
type Zone = 'Access control' | 'Movement of money' | 'Safety actuation' | 'Formal regulatory record';

type PortfolioForm = {
  name: string;
  tasks: BinaryAnswer;
  baseline: BinaryAnswer;
  zoneReview: 'selected' | 'none' | '';
  zones: Zone[];
  redesign: BinaryAnswer;
  grounding: GroundingAnswer;
  value: string;
  volume: string;
  cost: string;
  reversibility: string;
};

const emptyForm: PortfolioForm = {
  name: '',
  tasks: '',
  baseline: '',
  zoneReview: '',
  zones: [],
  redesign: '',
  grounding: '',
  value: '',
  volume: '',
  cost: '',
  reversibility: '',
};

const fictionalForm: PortfolioForm = {
  name: 'Supplier-invoice exception evidence pack (35 eval cases)',
  tasks: 'yes',
  baseline: 'yes',
  zoneReview: 'selected',
  zones: ['Movement of money'],
  redesign: 'yes',
  grounding: 'exists',
  value: '45',
  volume: '1200',
  cost: '12',
  reversibility: '0.9',
};

const zones: Zone[] = [
  'Access control',
  'Movement of money',
  'Safety actuation',
  'Formal regulatory record',
];

const radioClass = 'size-4 accent-[var(--color-fd-primary)]';
const inputClass =
  'mt-1.5 w-full rounded-lg border bg-fd-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-fd-ring';

function GateStatus({ state, children }: { state: 'pass' | 'stop' | 'waiting'; children: ReactNode }) {
  const label = state === 'pass' ? 'Pass' : state === 'stop' ? 'Stop' : 'Waiting';
  return (
    <li className="flex gap-3 rounded-lg border bg-fd-background p-3">
      <span className="min-w-16 text-sm font-semibold">{label}</span>
      <span className="text-sm leading-6 text-fd-muted-foreground">{children}</span>
    </li>
  );
}

export function PortfolioWorksheet() {
  const [form, setForm] = useState<PortfolioForm>(emptyForm);
  const [fictional, setFictional] = useState(false);

  function update<K extends keyof PortfolioForm>(key: K, value: PortfolioForm[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setFictional(false);
  }

  function toggleZone(zone: Zone) {
    setForm((current) => {
      const nextZones = current.zones.includes(zone)
        ? current.zones.filter((item) => item !== zone)
        : [...current.zones, zone];
      return {
        ...current,
        zoneReview: nextZones.length ? 'selected' : '',
        zones: nextZones,
        redesign: '',
      };
    });
    setFictional(false);
  }

  function toggleNoZones() {
    setForm((current) => ({
      ...current,
      zoneReview: current.zoneReview === 'none' ? '' : 'none',
      zones: [],
      redesign: '',
    }));
    setFictional(false);
  }

  const route = useMemo(() => {
    const gate1Complete = form.tasks !== '' && form.baseline !== '';
    const gate1Pass = form.tasks === 'yes' && form.baseline === 'yes';

    if (!gate1Complete) {
      return {
        outcome: 'Complete Gate 1',
        detail: 'Confirm both task evaluability and baseline availability before this use case can proceed.',
        stage: 1,
      };
    }
    if (!gate1Pass) {
      return {
        outcome: 'Make it evaluable',
        detail:
          'Do not fund the agent yet. Fund a domain SME to write 20–50 pass-or-fail tasks from real failures and instrument the current process to establish a baseline.',
        stage: 1,
      };
    }

    if (form.zoneReview === '') {
      return {
        outcome: 'Complete Gate 2',
        detail: 'Review all four deterministic zones and explicitly confirm either the applicable zones or that none apply.',
        stage: 2,
      };
    }
    if (form.zoneReview === 'selected' && form.redesign === '') {
      return {
        outcome: 'Complete Gate 2',
        detail: 'This use case touches a deterministic zone. Decide whether its value survives a model-informs, rule-decides redesign.',
        stage: 2,
      };
    }
    if (form.zoneReview === 'selected' && form.redesign === 'no') {
      return {
        outcome: 'Redesign or reject',
        detail:
          'The value depends on a model making an irreversible decision. Redesign the decision boundary or remove the use case from the portfolio.',
        stage: 2,
      };
    }

    if (form.grounding === '') {
      return {
        outcome: 'Complete Gate 3',
        detail: 'Confirm whether a purpose-scoped, curated corpus with a named owner can exist inside the funding period.',
        stage: 3,
      };
    }
    if (form.grounding === 'not-within-period') {
      return {
        outcome: 'Prepare grounding first',
        detail:
          'Hold agent delivery. Fund corpus ownership, scoping, access-control propagation, provenance, and quality work before admission.',
        stage: 3,
      };
    }

    return {
      outcome: 'Admit for prioritisation',
      detail:
        form.zones.length > 0
          ? 'All three gates pass with a mandatory redesign: the model may assemble evidence or recommend, while a deterministic system makes the decision.'
          : 'All three gates pass. Compare this use case with the other admitted candidates using measured outcome economics and shared supervision capacity.',
      stage: 4,
    };
  }, [form]);

  const score = useMemo(() => {
    if (form.value === '' || form.volume === '' || form.cost === '' || form.reversibility === '') {
      return null;
    }
    const value = Number(form.value);
    const volume = Number(form.volume);
    const cost = Number(form.cost);
    const reversibility = Number(form.reversibility);
    if (
      route.stage !== 4 ||
      !Number.isFinite(value) ||
      !Number.isFinite(volume) ||
      !Number.isFinite(cost) ||
      !Number.isFinite(reversibility) ||
      value < 0 ||
      volume < 0 ||
      cost <= 0 ||
      reversibility <= 0
    ) {
      return null;
    }
    return (value * volume * reversibility) / cost;
  }, [form, route.stage]);

  return (
    <section aria-labelledby="portfolio-tool-title" className="rounded-2xl border bg-fd-card p-4 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">Interactive worksheet</p>
          <h2 id="portfolio-tool-title" className="mt-2 text-2xl font-semibold tracking-tight">
            Route one use case through the admission gates
          </h2>
          <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
            Admission and ranking are separate. A high-value use case cannot outscore a failed gate.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <button
            type="button"
            onClick={() => {
              setForm(fictionalForm);
              setFictional(true);
            }}
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
          >
            Load fictional example
          </button>
          <button
            type="button"
            onClick={() => {
              setForm(emptyForm);
              setFictional(false);
            }}
            className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
          >
            Reset
          </button>
        </div>
      </div>

      {fictional ? (
        <div role="status" className="mt-5 rounded-lg border border-dashed p-3 text-sm">
          <strong>Fictional teaching example.</strong> These values are invented to demonstrate the method. They are not a
          benchmark, forecast, or recommendation.
        </div>
      ) : null}

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.8fr)]">
        <div className="space-y-6">
          <label className="block text-sm font-medium">
            Use-case name
            <input
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              className={inputClass}
              placeholder="For example, service-ticket resolution assistant"
            />
          </label>

          <fieldset className="rounded-xl border p-4">
            <legend className="px-1 text-base font-semibold">Gate 1: Evaluability</legend>
            <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
              Both conditions must be true. Domain experts, not the platform team, own this decision.
            </p>
            <div className="mt-4 space-y-5">
              {[
                {
                  key: 'tasks' as const,
                  label: 'Can a domain SME write 20–50 pass-or-fail tasks drawn from real failures?',
                },
                {
                  key: 'baseline' as const,
                  label: 'Does a current human baseline exist, or can it be measured inside the funding period?',
                },
              ].map((question) => (
                <fieldset key={question.key}>
                  <legend className="text-sm font-medium leading-6">{question.label}</legend>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {(['yes', 'no'] as const).map((answer) => (
                      <label key={answer} className="flex cursor-pointer items-center gap-2 text-sm">
                        <input
                          type="radio"
                          name={question.key}
                          value={answer}
                          checked={form[question.key] === answer}
                          onChange={() => update(question.key, answer)}
                          className={radioClass}
                        />
                        {answer === 'yes' ? 'Yes' : 'No'}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-xl border p-4">
            <legend className="px-1 text-base font-semibold">Gate 2: Deterministic-zone check</legend>
            <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
              Select every irreversible decision the proposed workflow would make, or explicitly confirm that none apply.
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {zones.map((zone) => (
                <label key={zone} className="flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm">
                  <input
                    type="checkbox"
                    checked={form.zones.includes(zone)}
                    onChange={() => toggleZone(zone)}
                    className="mt-0.5 size-4 accent-[var(--color-fd-primary)]"
                  />
                  {zone}
                </label>
              ))}
            </div>
            <label className="mt-3 flex cursor-pointer items-start gap-2 rounded-lg border border-dashed p-3 text-sm">
              <input
                type="checkbox"
                checked={form.zoneReview === 'none'}
                onChange={toggleNoZones}
                className="mt-0.5 size-4 accent-[var(--color-fd-primary)]"
              />
              None of these apply; the deterministic-zone review is complete.
            </label>
            {form.zoneReview === 'selected' ? (
              <fieldset className="mt-4 rounded-lg bg-fd-muted p-3">
                <legend className="px-1 text-sm font-medium leading-6">
                  Does the value survive a redesign in which the model informs and a deterministic rule decides?
                </legend>
                <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                  {(['yes', 'no'] as const).map((answer) => (
                    <label key={answer} className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="redesign"
                        value={answer}
                        checked={form.redesign === answer}
                        onChange={() => update('redesign', answer)}
                        className={radioClass}
                      />
                      {answer === 'yes' ? 'Yes: redesign is viable' : 'No: the model must decide'}
                    </label>
                  ))}
                </div>
              </fieldset>
            ) : null}
          </fieldset>

          <fieldset className="rounded-xl border p-4">
            <legend className="px-1 text-base font-semibold">Gate 3: Grounding readiness</legend>
            <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
              Can a purpose-scoped, curated corpus with a named owner support this use case?
            </p>
            <div className="mt-3 grid gap-2">
              {[
                ['exists', 'Yes: it exists now'],
                ['within-period', 'It can exist inside the funding period'],
                ['not-within-period', 'No: not inside the funding period'],
              ].map(([value, label]) => (
                <label key={value} className="flex cursor-pointer items-start gap-2 rounded-lg border p-3 text-sm">
                  <input
                    type="radio"
                    name="grounding"
                    value={value}
                    checked={form.grounding === value}
                    onChange={() => update('grounding', value as GroundingAnswer)}
                    className={`${radioClass} mt-0.5`}
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="rounded-xl border p-4">
            <legend className="px-1 text-base font-semibold">Prioritisation inputs</legend>
            <p className="mt-1 text-sm leading-6 text-fd-muted-foreground">
              These inputs matter only after all three gates pass. Use one consistent currency.
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium">
                Value per resolved outcome
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={form.value}
                  onChange={(event) => update('value', event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="text-sm font-medium">
                Resolved outcomes per quarter
                <input
                  type="number"
                  min="0"
                  step="any"
                  inputMode="decimal"
                  value={form.volume}
                  onChange={(event) => update('volume', event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="text-sm font-medium">
                Cost per resolved outcome
                <input
                  type="number"
                  min="0.01"
                  step="any"
                  inputMode="decimal"
                  value={form.cost}
                  onChange={(event) => update('cost', event.target.value)}
                  className={inputClass}
                />
              </label>
              <label className="text-sm font-medium">
                Reversibility factor
                <select
                  value={form.reversibility}
                  onChange={(event) => update('reversibility', event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select one</option>
                  <option value="1">1.00: easily caught and corrected internally</option>
                  <option value="0.9">0.90: highly reversible with controlled follow-up</option>
                  <option value="0.75">0.75: contained but meaningful rework</option>
                  <option value="0.5">0.50: costly customer or operational correction</option>
                  <option value="0.25">0.25: difficult or externally binding correction</option>
                </select>
              </label>
            </div>
          </fieldset>
        </div>

        <aside className="self-start rounded-xl border bg-fd-background p-4 xl:sticky xl:top-6" aria-live="polite">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fd-muted-foreground">Current route</p>
          <h3 className="mt-2 text-xl font-semibold">{route.outcome}</h3>
          <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{route.detail}</p>

          <ol className="mt-5 space-y-2" aria-label="Admission gate results">
            <GateStatus state={route.stage > 1 ? 'pass' : route.outcome === 'Make it evaluable' ? 'stop' : 'waiting'}>
              Gate 1: evaluability and baseline
            </GateStatus>
            <GateStatus
              state={route.stage > 2 ? 'pass' : route.stage === 2 && route.outcome === 'Redesign or reject' ? 'stop' : 'waiting'}
            >
              Gate 2: deterministic decision boundary
            </GateStatus>
            <GateStatus
              state={route.stage > 3 ? 'pass' : route.stage === 3 && route.outcome === 'Prepare grounding first' ? 'stop' : 'waiting'}
            >
              Gate 3: purpose-scoped grounding
            </GateStatus>
          </ol>

          {score !== null ? (
            <div className="mt-5 rounded-lg bg-fd-muted p-3">
              <p className="text-sm font-medium">Comparable priority index</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">{score.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
              <p className="mt-1 text-xs leading-5 text-fd-muted-foreground">
                A relative ranking aid, not a business-case value. Compare only candidates using the same units and assumptions.
              </p>
            </div>
          ) : null}

          {form.zones.length > 0 ? (
            <div className="mt-5">
              <p className="text-sm font-medium">Selected deterministic zones</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-fd-muted-foreground">
                {form.zones.map((zone) => (
                  <li key={zone}>{zone}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
