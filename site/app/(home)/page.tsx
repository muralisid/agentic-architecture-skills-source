import Link from 'next/link';
import { appName, repoUrl, sourceRepositoryPublic } from '@/lib/shared';
import { DiagramRenderer } from '@/components/visuals/diagram-renderer';
import { getFigure } from '@/lib/figure-manifest';

const spine = [
  { title: 'The four deterministic zones', href: '/architecture/deterministic-zones', body: 'Access, money, safety actuation, formal records: where model output stays advisory, and the standards that say so.' },
  { title: 'The identity and delegation chain', href: '/architecture/identity-chain', body: 'Workload identity, token exchange, run-as-user: how every action stays attributable to the human who asked.' },
  { title: 'Enforcement outside the model', href: '/architecture/enforcement', body: 'Gateway, policy decision point, promoted policy-as-code, and the measured limits of guardrails.' },
  { title: 'The data-to-memory pipeline', href: '/architecture/data-to-memory', body: 'Parse, chunk, embed, index, retrieve, cite: provenance intact and erasure that cascades.' },
  { title: 'The learning flywheel', href: '/architecture/learning-flywheel', body: 'Gated promotion, calibrated judges, staged rollout, and the demotion path most pipelines lack.' },
  { title: 'The autonomy contract', href: '/architecture/autonomy-contract', body: 'A x L with a controls column that is the contract, readiness gates, and an oversight gate as a burst rate.' },
];

const layers = [
  ['R01', 'Infrastructure and compute', '/layers/r01-infrastructure'],
  ['R02', 'Data platform', '/layers/r02-data-platform'],
  ['R03', 'Integration fabric', '/layers/r03-integration-fabric'],
  ['R04', 'Systems of record', '/layers/r04-systems-of-record'],
  ['R05', 'Line of business and OT', '/layers/r05-lob-and-ot'],
  ['R06', 'Intelligence and learning', '/layers/r06-intelligence-and-learning'],
  ['R07', 'Agent platform', '/layers/r07-agent-platform'],
  ['R08', 'Productivity and collaboration', '/layers/r08-productivity-and-collaboration'],
  ['R09', 'Experience and channels', '/layers/r09-experience-and-channels'],
  ['R10', 'Security and identity', '/layers/r10-security-and-identity'],
  ['R11', 'Governance, risk and sovereignty', '/layers/r11-governance-risk-sovereignty'],
  ['R12', 'Observability and FinOps', '/layers/r12-observability-and-finops'],
  ['R13', 'Supervision and oversight', '/layers/r13-operating-model'],
  ['R14', 'Agent data engineering', '/layers/r14-agent-data-engineering'],
] as const;

export default function HomePage() {
  const hero = getFigure('seven-plane-architecture');

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-10">
        <p className="text-sm font-medium text-fd-muted-foreground">Target-state architecture for the agentic enterprise</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Seven planes across fourteen layers.
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-fd-muted-foreground">
          The components, protocols, control points, and contested choices, with the evidence behind each and
          the refusals stated plainly. Written for architects who want the design, not the pitch.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/architecture" className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground">
            The target-state architecture
          </Link>
          <Link href="/layers" className="rounded-lg border px-5 py-2.5 text-sm font-medium">
            Go layer by layer
          </Link>
          <Link href="/decisions" className="rounded-lg border px-5 py-2.5 text-sm font-medium">
            24 decisions with verdicts
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <div className="rounded-2xl border bg-fd-card p-4 sm:p-6">
          <DiagramRenderer figure={hero} />
          <p className="mt-3 mb-0 text-sm text-fd-muted-foreground">{hero.takeaway}</p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold">The cross-layer spine</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {spine.map((s) => (
            <Link key={s.href} href={s.href} className="rounded-xl border p-5 transition-colors hover:bg-fd-accent">
              <h3 className="font-medium">{s.title}</h3>
              <p className="mt-1.5 mb-0 text-sm text-fd-muted-foreground">{s.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold">The fourteen layers</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map(([code, name, href]) => (
            <Link key={href} href={href} className="flex items-baseline gap-2.5 rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-fd-accent">
              <span className="font-mono text-xs text-fd-muted-foreground">{code}</span>
              <span className="font-medium">{name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="text-xl font-semibold">How this is written</h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-3">
          <div>
            <h3 className="font-medium">Evidence status on every claim</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">
              Vendor-published figures are labelled. Author positions are labelled. Unverified claims are excluded
              and the exclusion is stated.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Verdicts, not surveys</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">
              Every contested choice ends in a decision with the discriminator that decides your case, and what
              would change it.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Gaps published as gaps</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">
              Six cross-cutting concerns have no complete answer anywhere. They are listed with their status
              rather than papered over.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-fd-muted-foreground">
          <span>{appName}</span>
          <span className="flex flex-wrap gap-4">
            <Link href="/architecture/concern-matrix" className="hover:text-fd-foreground">Concern matrix</Link>
            <Link href="/library" className="hover:text-fd-foreground">Research library</Link>
            {sourceRepositoryPublic ? <a href={repoUrl} className="hover:text-fd-foreground">Repository</a> : null}
          </span>
        </div>
      </footer>
    </main>
  );
}
