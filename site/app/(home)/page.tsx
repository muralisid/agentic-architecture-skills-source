import Link from 'next/link';
import {
  ArrowUpRight,
  Cable,
  CheckCircle2,
  FlaskConical,
  Gauge,
  KeyRound,
  RefreshCw,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import { appName } from '@/lib/shared';
import { DiagramRenderer } from '@/components/visuals/diagram-renderer';
import { getFigure } from '@/lib/figure-manifest';
import { StatTiles } from '@/components/visuals/result-chart';
import { SkillsStrip } from '@/components/skills/skills-catalog';
import { CopyLine } from '@/components/skills/copy-line';
import { installCommands, skillCount } from '@/lib/skills';
import { SiteFooter } from '@/components/site/site-footer';
import { Eyebrow, FeatureCard, PillLink, SectionDecor, SectionHeading } from '@/components/site/section';

const spine = [
  {
    title: 'The four deterministic zones',
    href: '/architecture/deterministic-zones',
    icon: ShieldCheck,
    body: 'Four places where a model may advise but never decide: access, money, physical safety, and official records. What sits in each, and how to build the boundary.',
  },
  {
    title: 'The identity and delegation chain',
    href: '/architecture/identity-chain',
    icon: KeyRound,
    body: "How every agent action stays traceable to the person who asked for it, from the agent's own identity through to the business system it touches.",
  },
  {
    title: 'Enforcement outside the model',
    href: '/architecture/enforcement',
    icon: Cable,
    body: 'Why the rules that stop an agent live outside the model, in a gateway and a policy engine, and why AI filters alone are not enough.',
  },
  {
    title: 'The data-to-memory pipeline',
    href: '/architecture/data-to-memory',
    icon: Workflow,
    body: 'How company information reaches an agent: prepared, indexed, permission-checked, cited back to its source, and deleted everywhere when it must be.',
  },
  {
    title: 'The learning flywheel',
    href: '/architecture/learning-flywheel',
    icon: RefreshCw,
    body: 'How agents get better over time without anyone losing control: every change is tested, approved, rolled out in stages, and can be pulled back.',
  },
  {
    title: 'The autonomy contract',
    href: '/architecture/autonomy-contract',
    icon: Gauge,
    body: 'How much an agent may do on its own, decided per task, with the controls each level requires and the checks that must pass before autonomy rises.',
  },
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

const trust = ['Every claim dated and sourced', 'Vendor figures labelled', 'Negative results published'] as const;

const researchStats = [
  { value: '0.815 to 0.294', label: 'One vector per document', note: 'nDCG@10 as a document grows from one aspect to ten. The single-vector index collapses.' },
  { value: '+0.188', label: 'Purpose views, aspect-targeted queries', note: 'Over matched chunks at ten aspects per document, with 25 percent fewer embeddings.' },
  { value: '−0.032', label: 'Purpose views, whole-document queries', note: 'Below matched chunks on human-judged scientific abstracts. The boundary of the method.' },
  { value: '0 of 5', label: 'Objective conditioning', note: 'Forms of telling the index the goal that survived testing, including real human-judged data.' },
];

export default function HomePage() {
  const hero = getFigure('seven-plane-architecture');

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(50% 45% at 22% 18%, rgba(240,74,42,0.12), transparent 70%), radial-gradient(40% 40% at 88% 75%, rgba(240,74,42,0.07), transparent 72%)',
          }}
        />
        <SectionDecor circles="both" dots="tr" />
        <div className="relative mx-auto w-full max-w-4xl px-6 pt-16 pb-12 text-center md:pt-24 md:pb-16">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-ember-deep">
            Target-state architecture for the agentic enterprise
          </p>
          <h1 className="mt-6 font-serif text-[40px] font-medium leading-[1.06] text-fd-foreground sm:text-5xl lg:text-6xl">
            Seven planes across <span className="italic text-ember">fourteen layers.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-[1.75] text-fd-muted-foreground md:text-[17px]">
            The components, protocols, control points, and contested choices, with the evidence behind each and the
            refusals stated plainly. Built for the architects who will design it, and written so that everyone who will
            live with it can follow: every page opens in plain terms, and every technical word explains itself.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PillLink href="/architecture">The target-state architecture</PillLink>
            <PillLink href="/layers" variant="outline">
              Go layer by layer
            </PillLink>
            <PillLink href="/skills" variant="soft" arrow>
              Install it into your agent
            </PillLink>
          </div>
          <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-fd-muted-foreground">
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-ember" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 md:px-8">
          <div className="card-soft p-4 sm:p-6">
            <DiagramRenderer figure={hero} />
            <p className="mt-3 mb-0 text-sm text-fd-muted-foreground">{hero.takeaway}</p>
          </div>
        </div>
      </section>

      {/* The skills */}
      <section className="relative overflow-hidden bg-fd-card/60 py-20 md:py-24">
        <SectionDecor circles="tr" dots="bl" />
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Read it, or install it"
            title={
              <>
                {skillCount()} skills your agent can <span className="italic text-ember">use directly.</span>
              </>
            }
            sub="Every section of this site is published as an Agent Skill: a folder your agent reads, carrying the architecture, the decisions and the measured evidence with the sources intact. One command installs the catalogue into Claude Code, Codex, Cursor, Gemini CLI or Copilot."
          />
          <div className="mx-auto mt-8 max-w-2xl">
            <CopyLine command={installCommands.everything} />
          </div>
          <div className="mt-10">
            <SkillsStrip limit={6} />
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PillLink href="/skills">The full catalogue</PillLink>
            <PillLink href="/skills/install" variant="outline">
              Per-agent instructions
            </PillLink>
          </div>
        </div>
      </section>

      {/* The spine */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <SectionDecor circles="bl" dots="none" />
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
          <SectionHeading
            eyebrow="The cross-layer spine"
            title={
              <>
                Six things every design must get <span className="italic text-ember">right.</span>
              </>
            }
            sub="Each one cuts across every layer of the estate. Get these right and the layer-by-layer choices become ordinary engineering."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {spine.map((s) => (
              <FeatureCard key={s.href} href={s.href} title={s.title} icon={<s.icon className="size-6" strokeWidth={1.8} />}>
                {s.body}
              </FeatureCard>
            ))}
          </div>
        </div>
      </section>

      {/* The layers */}
      <section className="relative overflow-hidden bg-fd-card/60 py-20 md:py-24">
        <SectionDecor circles="tr" dots="tl" />
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
          <SectionHeading
            eyebrow="Layer by layer"
            title={
              <>
                What you already own, and what changes in <span className="italic text-ember">each part.</span>
              </>
            }
            sub="Fourteen deep pages. Each one states the target state, the mechanisms, the contested choices with verdicts, the cross-cutting concerns, and where the evidence runs out."
          />
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {layers.map(([code, name, href]) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 rounded-full border border-fd-border bg-fd-card px-4 py-3 text-sm shadow-[0_2px_12px_rgba(15,23,42,0.03)] transition-all hover:-translate-y-0.5 hover:border-ember/40 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ember-soft font-mono text-[11px] font-semibold text-ember-ink dark:bg-fd-accent dark:text-fd-accent-foreground">
                  {code}
                </span>
                <span className="font-medium text-fd-foreground">{name}</span>
                <ArrowUpRight className="ml-auto size-4 text-fd-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The research */}
      <section className="relative overflow-hidden bg-fd-card/60 py-20 md:py-24">
        <SectionDecor circles="both" dots="br" />
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <Eyebrow>Tested, not asserted</Eyebrow>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] text-fd-foreground md:text-5xl">
                We ran the experiments. Here is what held<span className="text-ember">.</span>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.7] text-fd-muted-foreground md:text-[17px]">
                Five rounds on public corpora with human relevance judgements, seeded and reproducible to the byte. The{' '}
                <span className="mark-wash">multi-vector result held</span>, the purpose-view result held under one
                condition, and the idea the programme was built to prove{' '}
                <span className="mark-wash">did not survive</span>. All of it is published, with the reversals.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PillLink href="/research">
                  <FlaskConical className="size-4" />
                  Read the findings
                </PillLink>
                <PillLink href="/research/recommended-approach" variant="outline">
                  The recommended approach
                </PillLink>
              </div>
              <Link
                href="/research/method-and-reversals"
                className="mt-5 inline-flex items-center gap-1 text-[14px] font-semibold text-ember-deep hover:text-ember-ink"
              >
                How we caught our own errors
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <StatTiles items={researchStats} columns={2} />
          </div>
        </div>
      </section>

      {/* How this is written */}
      <section className="relative overflow-hidden py-20 md:py-24">
        <div className="relative mx-auto w-full max-w-6xl px-6 md:px-8">
          <SectionHeading
            eyebrow="How this is written"
            title={
              <>
                Verdicts, sources, and gaps stated <span className="italic text-ember">as gaps.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            <FeatureCard title="Evidence status on every claim">
              Vendor-published figures are labelled. Author positions are labelled. Unverified claims are excluded and
              the exclusion is stated.
            </FeatureCard>
            <FeatureCard title="Verdicts, not surveys">
              Every contested choice ends in a decision with the discriminator that decides your case, and what would
              change it.
            </FeatureCard>
            <FeatureCard title="Gaps published as gaps">
              Six cross-cutting concerns have no complete answer anywhere. They are listed with their status rather than
              papered over.
            </FeatureCard>
          </div>
        </div>
      </section>

      {/* Final call */}
      <section className="relative overflow-hidden bg-fd-card/60 py-20 md:py-28">
        <SectionDecor circles="both" dots="none" />
        <div className="relative mx-auto w-full max-w-3xl px-6 text-center">
          <Eyebrow center>Ready when you are</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] text-fd-foreground md:text-5xl">
            Pick your layer.
            <br />
            <span className="text-ember">Walk away with the design.</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PillLink href="/architecture">Start with the architecture</PillLink>
            <PillLink href="/decisions" variant="outline">
              25 decisions with verdicts
            </PillLink>
          </div>
          <p className="mt-5 text-[13px] text-fd-muted-foreground">{appName}</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
