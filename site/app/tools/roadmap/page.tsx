import Link from 'next/link';
import type { Metadata } from 'next';
import { RoadmapWorksheet } from '@/components/worksheets';

export const metadata: Metadata = {
  title: 'Gate-based roadmap generator',
  description: 'Compose nine enterprise factors into a selectable, printable six-stage agentic-enterprise roadmap without invented timelines.',
};

const stageRows = [
  ['Stage 0: Ground', 'Profile and admit', 'Recorded readiness, admitted use cases, sponsors, deterministic zones'],
  ['Stage 1: First value', 'Prove one bounded outcome', 'Measured outcome economics, owned evals, external traces'],
  ['Stage 2: Platform', 'Build control and knowledge foundations', 'Identity, deterministic gates, erasure, kill-switch proof'],
  ['Stage 3: Scale', 'Expand with governed learning and economics', 'Promotion and demotion, budgets, two-estate telemetry'],
  ['Stage 4: Autonomy', 'Operate within measured oversight capacity', 'Portfolio burst capacity and calibrated intervention'],
  ['Stage 5: Extend', 'Open customer and OT lanes', 'Lane-specific resolution, escalation, and safety evidence'],
];

export default function RoadmapPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-fd-muted-foreground print:hidden">
        <Link href="/tools" className="hover:text-fd-foreground">Tools</Link> / Roadmap
      </nav>
      <header className="mt-5 max-w-4xl print:hidden">
        <p className="text-sm font-medium text-fd-muted-foreground">Step 3 of 3</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Gate-based roadmap generator</h1>
        <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
          The roadmap is a proof sequence, not a calendar. Nine factors add work, gates, prohibitions, and defaults to a fixed
          six-stage spine. When answers conflict, the more restrictive constraint wins.
        </p>
      </header>

      <section aria-labelledby="spine-heading" role="region" tabIndex={0} className="mt-8 overflow-x-auto rounded-xl border bg-fd-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring">
        <h2 id="spine-heading" className="px-4 pt-4 text-lg font-semibold sm:px-5">The fixed spine</h2>
        <table className="mt-3 w-full min-w-[52rem] border-collapse text-left text-sm">
          <thead className="border-y bg-fd-muted text-fd-muted-foreground"><tr><th className="px-4 py-3 font-medium sm:px-5">Stage</th><th className="px-4 py-3 font-medium sm:px-5">Purpose</th><th className="px-4 py-3 font-medium sm:px-5">Exit proof</th></tr></thead>
          <tbody className="divide-y">
            {stageRows.map(([stage, purpose, proof]) => <tr key={stage}><th scope="row" className="px-4 py-3 font-medium sm:px-5">{stage}</th><td className="px-4 py-3 text-fd-muted-foreground sm:px-5">{purpose}</td><td className="px-4 py-3 text-fd-muted-foreground sm:px-5">{proof}</td></tr>)}
          </tbody>
        </table>
      </section>

      <aside className="mt-6 rounded-xl border border-dashed p-4 text-sm leading-6 print:hidden">
        <strong>Conflict rule:</strong> restrictive requirements accumulate. For example, aggressive risk appetite cannot cancel
        sector regulation; no platform team changes the delivery model to rented capability but does not remove sovereignty or
        evidence duties; a customer-facing lane keeps the lower applicable autonomy cap.
      </aside>

      <div className="mt-8"><RoadmapWorksheet /></div>

      <section aria-labelledby="not-decided-heading" className="mt-8 rounded-xl border p-4 sm:p-5 print:hidden">
        <h2 id="not-decided-heading" className="font-semibold">What this generator does not decide</h2>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-6 text-fd-muted-foreground">
          <li>No durations: stage progress depends on exit evidence, not a generic timetable.</li>
          <li>No vendor selection: evaluate vendors after workload, architecture, and control needs are known.</li>
          <li>No use-case order inside a stage: rerun the portfolio quarterly using measured inputs.</li>
          <li>No compliance attestation: applicable legal, regulatory, workforce, security, and assurance owners must review the result.</li>
        </ul>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <Link href="/docs/frameworks/roadmap-checklist" className="rounded-lg border px-4 py-2.5 text-sm font-medium">Read the evidence and complete modifier tables</Link>
        <Link href="/docs/architecture" className="rounded-lg bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground">Next: design the architecture</Link>
      </div>
    </main>
  );
}
