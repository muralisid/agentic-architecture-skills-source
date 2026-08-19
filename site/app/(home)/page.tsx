import Link from 'next/link';
import { appName, appDescription, repoUrl } from '@/lib/shared';

const sections = [
  { title: 'Architecture', href: '/docs/architecture', body: 'Ten cross-layer chapters: the A x L maturity model, three target-state architectures, the concerns matrix, memory pipelines, economics, sovereignty, identity, learning loops.' },
  { title: 'Layer guides', href: '/docs/layers', body: 'Fourteen research tracks, one per layer of the enterprise landscape, each with a brief, findings, a vendor map, and dated sources.' },
  { title: 'Frameworks', href: '/docs/frameworks', body: 'Assess readiness, decide which use cases get budget, and generate a roadmap from nine factor answers.' },
  { title: 'Blueprints', href: '/docs/blueprints', body: 'Seven department and four vertical target states, each with a mandatory honest-limits section.' },
  { title: 'Vendor hub', href: '/docs/vendors', body: 'A question bank written before any profile, a scorecard that runs disqualifiers before scores, and coverage across all 14 layers.' },
  { title: 'Techniques', href: '/docs/techniques', body: 'Production patterns with their token economics, including multi-view embeddings and when a knowledge graph earns its keep.' },
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-5xl px-6 pt-20 pb-14">
        <p className="text-sm font-medium text-fd-muted-foreground">Open reference, updated continuously</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{appName}</h1>
        <p className="mt-5 max-w-3xl text-lg text-fd-muted-foreground">{appDescription}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
          >
            Start here
          </Link>
          <Link
            href="/docs/architecture/maturity-model"
            className="rounded-lg border px-5 py-2.5 text-sm font-medium"
          >
            The A x L maturity model
          </Link>
          <a href={repoUrl} className="rounded-lg border px-5 py-2.5 text-sm font-medium">
            Repository
          </a>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="rounded-xl border p-5 transition-colors hover:bg-fd-accent"
            >
              <h2 className="font-medium">{s.title}</h2>
              <p className="mt-2 text-sm text-fd-muted-foreground">{s.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-24">
        <h2 className="text-xl font-semibold">How this guide is written</h2>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-medium">Evidence over buzz</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">
              Nothing is recommended on adoption momentum or vendor narrative. Every recommended component must beat the
              simplest credible alternative on technical merit and enterprise economics.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Unsolved problems published as unsolved</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">
              Six cross-cutting concerns have no complete answer anywhere. No credible human-to-agent supervision ratio
              has ever been published, and the maturity model is built around that absence rather than around a guess.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Positions labelled as positions</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">
              Where the authors take a view ahead of the evidence, the text says so. Research tested the maintainer&apos;s
              own positions and several were revised or contradicted in public.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Sources dated and flagged</h3>
            <p className="mt-1.5 text-sm text-fd-muted-foreground">
              Vendor-published numbers are labelled as such. Volatile facts carry as-of dates and sit on a quarterly
              re-verification list.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
