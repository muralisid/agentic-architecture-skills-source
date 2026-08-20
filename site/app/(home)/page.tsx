import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Compass,
  Layers3,
  Route,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { appName, repoUrl, sourceRepositoryPublic } from '@/lib/shared';

const journey = [
  { title: 'Vision', body: 'Define the target and what remains human.', href: '/docs/architecture/vision-and-target-state' },
  { title: 'Archetype', body: 'Identify the structural context that changes the design.', href: '/docs/architecture/archetype-grid' },
  { title: 'Readiness', body: 'Find the autonomy ceiling for this workload.', href: '/docs/frameworks/readiness-assessments' },
  { title: 'Use-case portfolio', body: 'Admit work that is evaluable, governable, and grounded.', href: '/docs/frameworks/use-case-portfolio' },
  { title: 'Roadmap', body: 'Compose stages from gates rather than dates.', href: '/docs/frameworks/roadmap-checklist' },
  { title: 'Architecture', body: 'Apply the seven planes and deterministic boundaries.', href: '/docs/architecture/master-target-state' },
  { title: 'Blueprint', body: 'Adapt a scenario, controls, metrics, and honest limits.', href: '/docs/blueprints' },
  { title: 'Vendor evaluation', body: 'Write neutral questions, then run disqualifiers before weighted scores.', href: '/docs/frameworks/vendor-question-bank' },
];

const sections = [
  { title: 'Start', href: '/docs', body: 'Take the five-minute tour and choose the CIO/CTO or enterprise-architect path.', icon: Route },
  { title: 'Decide', href: '/docs/decide', body: 'Vision, archetype, readiness, use-case admission, maturity, and a gate-based roadmap.', icon: Compass },
  { title: 'Design', href: '/docs/design', body: 'Seven planes, identity, memory, learning, economics, sovereignty, and evidence.', icon: Layers3 },
  { title: 'Apply', href: '/docs/apply', body: 'Department and industry blueprints with controls, economics, limits, and metrics.', icon: Building2 },
  { title: 'Reference', href: '/docs/reference', body: 'Vendor evaluation, fourteen research layers, production techniques, and vocabulary.', icon: BookOpenCheck },
  { title: 'About / Evidence', href: '/docs/about-evidence', body: 'Decision history, claim freshness, guide changes, and contribution rules.', icon: ShieldCheck },
];

const principles = [
  ['Evidence before confidence', 'Claims separate independent measurement, vendor reporting, author position, and open gaps.'],
  ['Models inform; rules decide', 'Access, money, safety actuation, and formal records stay inside deterministic boundaries.'],
  ['Outcomes before activity', 'Measure resolved outcomes, supervision, reversibility, and wrong-outcome cost, not agent runs alone.'],
  ['Vendor choice comes last', 'Use cases reveal the records, permissions, controls, and pricing regime that the architecture must serve.'],
];

export default function HomePage() {
  return (
    <div id="main-content" className="flex flex-1 flex-col overflow-hidden">
      <section className="relative border-b">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,color-mix(in_oklab,var(--color-fd-primary)_12%,transparent),transparent_34%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-24">
          <div className="self-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fd-muted-foreground">A visual, vendor-neutral decision guide</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{appName}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground">
              Decide where agents belong, how much autonomy they should earn, and which controls and evidence must exist before they scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/docs" className="inline-flex items-center gap-2 rounded-lg bg-fd-primary px-5 py-3 text-sm font-medium text-fd-primary-foreground">
                Take the five-minute tour <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/docs/frameworks/readiness-assessments" className="rounded-lg border px-5 py-3 text-sm font-medium">Assess readiness</Link>
            </div>
            <dl className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <div className="flex items-baseline gap-2"><dt className="text-fd-muted-foreground">Estate</dt><dd className="font-semibold">14 layers</dd></div>
              <div className="flex items-baseline gap-2"><dt className="text-fd-muted-foreground">Agent system</dt><dd className="font-semibold">7 planes</dd></div>
              <div className="flex items-baseline gap-2"><dt className="text-fd-muted-foreground">Application</dt><dd className="font-semibold">11 blueprints</dd></div>
            </dl>
          </div>

          <div className="relative rounded-3xl border bg-fd-card p-5 shadow-2xl shadow-black/5 sm:p-7" aria-label="Agentic enterprise operating model">
            <div className="flex items-center justify-between gap-4 border-b pb-4">
              <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">In one picture</p><h2 className="mt-1 text-lg font-semibold">Accountability stays human</h2></div>
              <ShieldCheck className="size-8 text-fd-primary" aria-hidden />
            </div>
            <div className="mt-5 space-y-3">
              <VisualActor tone="amber" icon={<Building2 className="size-4" aria-hidden />} title="Humans" body="Set intent, supervise, handle exceptions, and remain accountable." />
              <Connector />
              <VisualActor tone="violet" icon={<Route className="size-4" aria-hidden />} title="Agents" body="Execute scoped routine work, use tools, and return evidence or exceptions." />
              <Connector />
              <VisualActor tone="slate" icon={<Scale className="size-4" aria-hidden />} title="Deterministic systems" body="Enforce identity, policy, entitlements, approvals, and audit outside the model." />
            </div>
            <p className="mt-5 border-t pt-4 text-sm leading-6 text-fd-muted-foreground">Agents may reason about consequential work. They do not replace the systems that authorize it.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">Five-minute visual tour</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Start with the decision, not the vendor</h2>
          <p className="mt-3 leading-7 text-fd-muted-foreground">Follow one evidence-led path. Each step produces the input for the next, and measurement sends the portfolio through the loop again.</p>
        </div>
        <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Guide decision journey">
          {journey.map((item, index) => (
            <li key={item.title}>
              <Link href={item.href} className="group block h-full rounded-2xl border bg-fd-card p-5 transition hover:-translate-y-0.5 hover:border-fd-primary/40 hover:shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-fd-primary text-sm font-semibold text-fd-primary-foreground">{index + 1}</span>
                  <ArrowRight className="size-4 text-fd-muted-foreground transition group-hover:translate-x-1 group-hover:text-fd-primary" aria-hidden />
                </div>
                <h3 className="mt-5 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{item.body}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y bg-fd-card/40">
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 py-16 lg:grid-cols-2">
          <RolePath eyebrow="CIO / CTO path" title="What should the enterprise do first?" body="Begin with the shared vision, then choose the archetype, assess readiness, and admit use cases before funding a roadmap." href="/docs/architecture/vision-and-target-state" action="Start with the vision" />
          <RolePath eyebrow="Enterprise architect path" title="Which enterprise context shapes the design?" body="Begin with the archetype, then use the readiness profile and roadmap to design the seven-plane target state and its controls." href="/docs/architecture/archetype-grid" action="Choose the archetype" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.title} href={section.href} className="group rounded-2xl border p-5 transition hover:border-fd-primary/40 hover:bg-fd-accent/50">
                <Icon className="size-6 text-fd-primary" aria-hidden /><h2 className="mt-5 font-semibold">{section.title}</h2><p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{section.body}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-3xl border bg-fd-card p-6 sm:p-9">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">How to read the evidence</p><h2 className="mt-2 text-2xl font-semibold">Strong positions, visible limits</h2></div>
            {sourceRepositoryPublic ? (
              <a href={repoUrl} className="text-sm font-medium text-fd-primary">View the evidence repository</a>
            ) : (
              <Link href="/docs/about-evidence" className="text-sm font-medium text-fd-primary">Review the evidence method</Link>
            )}
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {principles.map(([title, body]) => (
              <div key={title} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-fd-primary" aria-hidden /><div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-6 text-fd-muted-foreground">{body}</p></div></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Connector() {
  return <div className="mx-auto h-4 w-px border-l border-dashed" aria-hidden />;
}

function VisualActor({ tone, icon, title, body }: { tone: 'amber' | 'violet' | 'slate'; icon: ReactNode; title: string; body: string }) {
  const tones = {
    amber: 'border-amber-500/35 bg-amber-500/10 [&_.actor-icon]:bg-amber-500/20',
    violet: 'border-violet-500/35 bg-violet-500/10 [&_.actor-icon]:bg-violet-500/20',
    slate: 'border-slate-500/40 bg-slate-500/10 [&_.actor-icon]:bg-slate-500/20',
  };
  return <div className={`rounded-2xl border p-4 ${tones[tone]}`}><div className="flex items-center gap-3"><span className="actor-icon flex size-9 items-center justify-center rounded-xl">{icon}</span><div><p className="font-medium">{title}</p><p className="text-sm text-fd-muted-foreground">{body}</p></div></div></div>;
}

function RolePath({ eyebrow, title, body, href, action }: { eyebrow: string; title: string; body: string; href: string; action: string }) {
  return <div className="rounded-2xl border bg-fd-background p-6 sm:p-8"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-fd-muted-foreground">{eyebrow}</p><h2 className="mt-2 text-2xl font-semibold">{title}</h2><p className="mt-3 leading-7 text-fd-muted-foreground">{body}</p><Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-fd-primary">{action} <ArrowRight className="size-4" aria-hidden /></Link></div>;
}
