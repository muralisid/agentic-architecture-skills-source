import Link from 'next/link';
import { appName, repoUrl, sourceRepositoryPublic } from '@/lib/shared';
import { DiagramRenderer } from '@/components/visuals/diagram-renderer';
import { getFigure } from '@/lib/figure-manifest';

const industries = [
  { title: 'Utilities and energy', href: '/industries/utilities-and-energy', body: 'Agents on the information path, operators holding every decision.' },
  { title: 'Banking and financial services', href: '/industries/banking-and-financial-services', body: 'Decision-ready files everywhere; payments, credit, and filings stay deterministic.' },
  { title: 'Manufacturing and supply chain', href: '/industries/manufacturing-and-supply-chain', body: 'Exceptions worked overnight, the OT boundary absolute.' },
  { title: 'Public sector', href: '/industries/public-sector', body: 'Cases arriving decision-ready, every decision explainable on appeal.' },
];

const departments = [
  { title: 'IT and service desk', href: '/departments/it-and-service-desk' },
  { title: 'Customer service', href: '/departments/customer-service' },
  { title: 'Finance', href: '/departments/finance' },
  { title: 'HR', href: '/departments/hr' },
  { title: 'Sales', href: '/departments/sales' },
  { title: 'Marketing', href: '/departments/marketing' },
  { title: 'Supply chain', href: '/departments/supply-chain' },
];

const answers = [
  { title: 'How many agents can one person supervise?', href: '/answers/how-many-agents-can-one-person-supervise' },
  { title: 'What must an agent never decide?', href: '/answers/what-an-agent-must-never-decide' },
  { title: 'Who pays for the loop?', href: '/answers/who-pays-for-the-loop' },
  { title: 'Which use cases first?', href: '/answers/which-use-cases-first' },
  { title: 'The maturity ladder', href: '/answers/the-maturity-ladder' },
  { title: 'The target architecture', href: '/answers/the-target-architecture' },
];

export default function HomePage() {
  const hero = getFigure('seven-plane-architecture');

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-5xl px-6 pt-16 pb-10">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Employees and agents. One team.
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-fd-muted-foreground">
          Agents run the routine work; your people decide, supervise, and handle what matters. This
          is buildable today, and your plan is already written: pick your industry and walk away
          with the architecture, the first use cases, and the steps.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/industries"
            className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground"
          >
            Pick your industry
          </Link>
          <Link href="/departments" className="rounded-lg border px-5 py-2.5 text-sm font-medium">
            Or start with a department
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
        <h2 className="text-xl font-semibold">Your industry, done for you</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {industries.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border p-5 transition-colors hover:bg-fd-accent"
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1.5 mb-0 text-sm text-fd-muted-foreground">{item.body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-12">
        <h2 className="text-xl font-semibold">Or your department</h2>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {departments.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-fd-accent"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 pb-16">
        <h2 className="text-xl font-semibold">The questions everyone reaches</h2>
        <ul className="mt-4 grid list-none gap-2 p-0 sm:grid-cols-2">
          {answers.map((item) => (
            <li key={item.href} className="m-0">
              <Link href={item.href} className="text-sm font-medium underline-offset-4 hover:underline">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-sm text-fd-muted-foreground">
          <span>{appName}</span>
          <span className="flex flex-wrap gap-4">
            <Link href="/vendors" className="hover:text-fd-foreground">Vendors</Link>
            <Link href="/library" className="hover:text-fd-foreground">The research behind this site</Link>
            {sourceRepositoryPublic ? (
              <a href={repoUrl} className="hover:text-fd-foreground">Repository</a>
            ) : null}
          </span>
        </div>
      </footer>
    </main>
  );
}
