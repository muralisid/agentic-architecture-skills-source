import Link from 'next/link';
import type { Metadata } from 'next';
import { ReadinessWorksheet } from '@/components/worksheets';

export const metadata: Metadata = {
  title: 'Agent readiness worksheet',
  description: 'Build a six-dimension agent-readiness profile and determine a workload-specific autonomy ceiling.',
};

const dimensions = [
  ['Data', 'Owned, permission-aware, purpose-scoped grounding and derived artifacts'],
  ['Integration', 'Governed APIs, tool controls, delegation, and reliable long-running actions'],
  ['Identity', 'First-class agent identity, scoped credentials, review, and revocation'],
  ['Operations', 'Evals, external traces, incident response, drift, cost, and rollback'],
  ['Governance/value', 'Outcomes, deterministic zones, evidence duties, kill criteria, and budgets'],
  ['Workforce', 'Named owners, human exceptions, portfolio supervision capacity, and role impacts'],
];

export default function ReadinessPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-fd-muted-foreground print:hidden">
        <Link href="/tools" className="hover:text-fd-foreground">Tools</Link> / Readiness
      </nav>
      <header className="mt-5 max-w-4xl">
        <p className="text-sm font-medium text-fd-muted-foreground">Step 1 of 3</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Agent readiness assessment</h1>
        <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
          Answer for one target workload. A strong average cannot compensate for a missing identity, operations, or data
          control, so the instrument publishes six separate values and applies explicit autonomy gates.
        </p>
      </header>

      <section aria-labelledby="dimensions-heading" role="region" tabIndex={0} className="mt-8 overflow-x-auto rounded-xl border bg-fd-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring">
        <h2 id="dimensions-heading" className="px-4 pt-4 text-lg font-semibold sm:px-5">What the profile measures</h2>
        <table className="mt-3 w-full min-w-[42rem] border-collapse text-left text-sm">
          <thead className="border-y bg-fd-muted text-fd-muted-foreground">
            <tr><th className="px-4 py-3 font-medium sm:px-5">Dimension</th><th className="px-4 py-3 font-medium sm:px-5">Evidence sought</th></tr>
          </thead>
          <tbody className="divide-y">
            {dimensions.map(([name, purpose]) => (
              <tr key={name}><th scope="row" className="px-4 py-3 font-medium sm:px-5">{name}</th><td className="px-4 py-3 text-fd-muted-foreground sm:px-5">{purpose}</td></tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="mt-8"><ReadinessWorksheet /></div>

      <section aria-labelledby="ceiling-heading" role="region" tabIndex={0} className="mt-8 overflow-x-auto rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring">
        <h2 id="ceiling-heading" className="px-4 pt-4 text-lg font-semibold sm:px-5">Static autonomy-gate reference</h2>
        <table className="mt-3 w-full min-w-[46rem] border-collapse text-left text-sm">
          <thead className="border-y bg-fd-muted text-fd-muted-foreground"><tr><th className="px-4 py-3 font-medium sm:px-5">Minimum profile</th><th className="px-4 py-3 font-medium sm:px-5">Safe ceiling</th></tr></thead>
          <tbody className="divide-y">
            <tr><td className="px-4 py-3 sm:px-5">Any dimension at 0</td><td className="px-4 py-3 sm:px-5">A1: assisted only</td></tr>
            <tr><td className="px-4 py-3 sm:px-5">Data and integration 2+; all others 1+</td><td className="px-4 py-3 sm:px-5">A2: delegated tasks</td></tr>
            <tr><td className="px-4 py-3 sm:px-5">Data, integration, identity, and operations 2+</td><td className="px-4 py-3 sm:px-5">A3: supervised autonomy</td></tr>
            <tr><td className="px-4 py-3 sm:px-5">All six 2+; operations and governance 3</td><td className="px-4 py-3 sm:px-5">A4: managed autonomy</td></tr>
            <tr><td className="px-4 py-3 sm:px-5">All six 3 plus separately verified regulator-ready evidence</td><td className="px-4 py-3 sm:px-5">A5 candidacy, per domain</td></tr>
          </tbody>
        </table>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <Link href="/tools/portfolio" className="rounded-lg bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground">Next: route a use case</Link>
        <Link href="/docs/frameworks/readiness-assessments" className="rounded-lg border px-4 py-2.5 text-sm font-medium">Read the evidence and heavy-mode mappings</Link>
      </div>
    </main>
  );
}
