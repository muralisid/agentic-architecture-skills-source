import Link from 'next/link';
import { ArrowUpRight, Building2, Layers3 } from 'lucide-react';
import { SiteFooter } from '@/components/site/site-footer';
import { TeachingIllustration } from '@/components/visuals/teaching-illustration';

export default function HomePage() {
  return <div id="main-content" className="flex-1">
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:px-8 md:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ember-deep">Model intelligence. Enterprise capability.</p>
      <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.12] sm:text-5xl lg:text-6xl">Turn your enterprise into an <span className="italic text-ember-deep">agentic enterprise.</span></h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground">How to distill model intelligence into useful work, connect it to the enterprise, and measure the business result. Start with the question that matters to you.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Link href="/use-cases" className="group rounded-2xl border border-fd-border bg-fd-card p-7 transition-colors hover:border-ember focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember">
          <Building2 className="size-7 text-ember-deep" aria-hidden="true" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">Start with the business</p>
          <h2 className="mt-2 font-serif text-3xl">What could agents do for us?</h2>
          <p className="mt-4 leading-7 text-fd-muted-foreground">Explore growth, production, service, safety, and compliance through concrete examples from utilities, mining, and across the enterprise.</p>
          <span className="mt-7 inline-flex items-center gap-2 font-semibold text-ember-deep">Explore use cases <ArrowUpRight className="size-4" /></span>
        </Link>
        <Link href="/architecture" className="group rounded-2xl border border-fd-border bg-fd-card p-7 transition-colors hover:border-ember focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ember">
          <Layers3 className="size-7 text-ember-deep" aria-hidden="true" />
          <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground">Start with the architecture</p>
          <h2 className="mt-2 font-serif text-3xl">How does it all fit together?</h2>
          <p className="mt-4 leading-7 text-fd-muted-foreground">Explore fourteen enterprise layers, then open the components, interfaces, controls, and design choices behind a working agent.</p>
          <span className="mt-7 inline-flex items-center gap-2 font-semibold text-ember-deep">Explore architecture <ArrowUpRight className="size-4" /></span>
        </Link>
      </div>
    </section>
    <section className="border-y bg-fd-card/40">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <h2 className="font-serif text-3xl">Follow your interest</h2>
        <div className="mt-7 grid gap-x-9 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Intelligence ladder', '/ladder', 'Instructions, context, tools, and model adaptation. Choose what improves the task.'],
            ['Knowledge & memory', '/memory', 'Represent and retrieve documents, images, locations, and equipment behavior.'],
            ['Research', '/research', 'Read the results, the limitations, and the questions still worth investigating.'],
            ['Skills', '/skills', 'Apply the guide to a design, readiness assessment, or implementation decision.'],
          ].map(([title,href,body]) => <div key={href}><Link className="font-semibold underline decoration-fd-border underline-offset-4 hover:text-ember-deep" href={href}>{title} ↗</Link><p className="mt-2 text-sm leading-6 text-fd-muted-foreground">{body}</p></div>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-6xl px-6 py-14 md:px-8">
      <h2 className="font-serif text-3xl">From a useful task to an enterprise capability</h2>
      <TeachingIllustration src="/figures/use-cases/enterprise-flow.svg" mobileSrc="/figures/use-cases/enterprise-flow-mobile.svg" title="The same goal, different starting points" alt="Business intent leads to an agent capability, connected enterprise systems, people and controls, and a measured business result." caption="Use cases explain the work. Architecture explains the system that makes it possible. Research helps us test and improve both." />
      <div className="grid gap-8 border-t pt-9 md:grid-cols-[1fr_2fr]">
        <div><p className="text-xs font-semibold uppercase tracking-wider text-ember-deep">Evidence and open questions</p><h2 className="mt-3 font-serif text-3xl">Know where things stand.</h2></div>
        <div className="space-y-5">
          <p className="leading-7 text-fd-muted-foreground">The guide distinguishes measured findings, external reports, and proposed designs. New ideas sit alongside the results that changed our earlier advice.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
            <Link href="/research/what-changed" className="underline underline-offset-4">What changed our advice</Link>
            <Link href="/research/questions" className="underline underline-offset-4">Questions to investigate</Link>
            <Link href="/research/industrial-examples" className="underline underline-offset-4">Industrial examples</Link>
          </div>
        </div>
      </div>
    </section>
    <SiteFooter />
  </div>;
}
