import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Decision worksheets',
  description: 'Interactive, local-only worksheets for agent readiness, use-case admission, and gate-based roadmap composition.',
};

const tools = [
  {
    href: '/tools/readiness',
    step: '1',
    title: 'Assess readiness',
    body: 'Answer 24 practical questions to produce a six-dimension profile and workload-specific autonomy ceiling.',
    output: 'Output: readiness profile, never a grand total',
  },
  {
    href: '/tools/portfolio',
    step: '2',
    title: 'Route a use case',
    body: 'Apply evaluability, deterministic-zone, and grounding gates before using outcome economics to rank a candidate.',
    output: 'Output: admit, redesign, prepare, or make evaluable',
  },
  {
    href: '/tools/roadmap',
    step: '3',
    title: 'Compose the roadmap',
    body: 'Combine nine enterprise factors with a fixed six-stage spine whose entry and exit gates carry the proof.',
    output: 'Output: selectable and printable gate-based roadmap',
  },
];

export default function ToolsPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-fd-muted-foreground">Decision tools</p>
      <h1 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
        Turn the guide into three defensible decisions
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-fd-muted-foreground">
        Work from workload readiness to use-case admission to roadmap composition. All answers remain only in this browser tab;
        the tools do not save or transmit assessment data.
      </p>

      <ol className="mt-10 grid gap-5 lg:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="flex h-full flex-col rounded-2xl border bg-fd-card p-5 transition-colors hover:bg-fd-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-fd-primary text-sm font-semibold text-fd-primary-foreground">
                {tool.step}
              </span>
              <h2 className="mt-5 text-xl font-semibold">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{tool.body}</p>
              <p className="mt-auto pt-5 text-xs font-medium uppercase tracking-[0.12em] text-fd-muted-foreground">
                {tool.output}
              </p>
            </Link>
          </li>
        ))}
      </ol>

      <section className="mt-10 rounded-xl border border-dashed p-5">
        <h2 className="font-semibold">Use these as decision aids, not compliance attestations</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-fd-muted-foreground">
          The tools implement the guide’s published rules. They do not replace domain, security, legal, regulatory, workforce,
          or architecture review. Re-run them when the target workload or any factor changes.
        </p>
      </section>
    </main>
  );
}
