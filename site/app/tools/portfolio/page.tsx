import Link from 'next/link';
import type { Metadata } from 'next';
import { PortfolioWorksheet } from '@/components/worksheets';

export const metadata: Metadata = {
  title: 'Use-case portfolio worksheet',
  description: 'Route an agent use case through evaluability, deterministic-zone, and grounding gates before prioritisation.',
};

const gates = [
  ['1. Evaluability', 'A domain SME can write 20–50 pass/fail tasks from real failures, and a baseline exists or can be measured.', 'Make-it-evaluable queue'],
  ['2. Deterministic zone', 'If the workflow touches access, money, safety actuation, or a formal record, the model informs and a deterministic rule decides.', 'Redesign, or reject the current design'],
  ['3. Grounding', 'A purpose-scoped curated corpus with a named owner exists or can exist inside the funding period.', 'Prepare grounding first'],
];

export default function PortfolioPage() {
  return (
    <main id="main-content" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-6 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-fd-muted-foreground print:hidden">
        <Link href="/tools" className="hover:text-fd-foreground">Tools</Link> / Use-case portfolio
      </nav>
      <header className="mt-5 max-w-4xl">
        <p className="text-sm font-medium text-fd-muted-foreground">Step 2 of 3</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Use-case admission and prioritisation</h1>
        <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
          A candidate must pass all three admission gates before value can affect its rank. Failed evaluability is funded as
          definition work; an irreversible model decision is redesigned; unready grounding is prepared before agent delivery.
        </p>
      </header>

      <section aria-labelledby="gates-heading" role="region" tabIndex={0} className="mt-8 overflow-x-auto rounded-xl border bg-fd-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring">
        <h2 id="gates-heading" className="px-4 pt-4 text-lg font-semibold sm:px-5">The three gates remain visible without JavaScript</h2>
        <table className="mt-3 w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead className="border-y bg-fd-muted text-fd-muted-foreground"><tr><th className="px-4 py-3 font-medium sm:px-5">Gate</th><th className="px-4 py-3 font-medium sm:px-5">Pass condition</th><th className="px-4 py-3 font-medium sm:px-5">If it fails</th></tr></thead>
          <tbody className="divide-y">
            {gates.map(([gate, pass, fail]) => <tr key={gate}><th scope="row" className="px-4 py-3 font-medium sm:px-5">{gate}</th><td className="px-4 py-3 text-fd-muted-foreground sm:px-5">{pass}</td><td className="px-4 py-3 text-fd-muted-foreground sm:px-5">{fail}</td></tr>)}
          </tbody>
        </table>
      </section>

      <div className="mt-8"><PortfolioWorksheet /></div>

      <section aria-labelledby="fictional-heading" className="mt-8 rounded-xl border p-4 sm:p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fd-muted-foreground">Teaching-only data</p>
        <h2 id="fictional-heading" className="mt-2 text-lg font-semibold">Fictional worked portfolio, never a benchmark</h2>
        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">
          Northstar Components uses invented numbers only to show how the gates precede ranking. Currency units are intentionally unspecified.
        </p>
        <div className="mt-4 overflow-x-auto rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring" role="region" aria-label="Scrollable fictional portfolio comparison" tabIndex={0}>
          <table className="w-full min-w-[56rem] border-collapse text-left text-sm">
            <thead className="border-y bg-fd-muted text-fd-muted-foreground"><tr><th className="px-3 py-3 font-medium">Fictional candidate</th><th className="px-3 py-3 font-medium">Gate route</th><th className="px-3 py-3 font-medium">Value × outcomes ÷ cost × reversibility</th><th className="px-3 py-3 font-medium">Result</th></tr></thead>
            <tbody className="divide-y">
              <tr><th scope="row" className="px-3 py-3 font-medium">Supplier-invoice exception evidence pack</th><td className="px-3 py-3 text-fd-muted-foreground">35 eval cases; model assembles evidence; ERP plus authorised person decides payment; corpus owner exists</td><td className="px-3 py-3 text-fd-muted-foreground">45 × 1,200 ÷ 12 × 0.90</td><td className="px-3 py-3">Admit; index 4,050</td></tr>
              <tr><th scope="row" className="px-3 py-3 font-medium">Maintenance work-order assistant</th><td className="px-3 py-3 text-fd-muted-foreground">28 eval tasks; advisory only; corpus ready</td><td className="px-3 py-3 text-fd-muted-foreground">180 × 220 ÷ 35 × 0.80</td><td className="px-3 py-3">Admit; index 905</td></tr>
              <tr><th scope="row" className="px-3 py-3 font-medium">Customer-renewal negotiation</th><td className="px-3 py-3 text-fd-muted-foreground">Cannot yet define pass/fail tasks from real failures</td><td className="px-3 py-3 text-fd-muted-foreground">Not scored</td><td className="px-3 py-3">Make it evaluable</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="formula-heading" className="mt-8 rounded-xl border border-dashed p-4 sm:p-5">
        <h2 id="formula-heading" className="font-semibold">Ranking formula after admission</h2>
        <p className="mt-2 overflow-x-auto font-mono text-sm leading-6">priority = (value per resolved outcome × outcomes per quarter) ÷ cost per resolved outcome × reversibility factor</p>
        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground">Then apply portfolio constraints: shared supervision burst capacity, plane coverage, and a deliberate balance of blast radius. The index alone cannot form a runnable portfolio.</p>
      </section>

      <div className="mt-8 flex flex-wrap gap-3 print:hidden">
        <Link href="/tools/roadmap" className="rounded-lg bg-fd-primary px-4 py-2.5 text-sm font-medium text-fd-primary-foreground">Next: compose the roadmap</Link>
        <Link href="/docs/frameworks/use-case-portfolio" className="rounded-lg border px-4 py-2.5 text-sm font-medium">Read the full portfolio method</Link>
      </div>
    </main>
  );
}
