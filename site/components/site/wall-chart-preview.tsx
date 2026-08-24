import Link from 'next/link';
import { ArrowUpRight, Download, Maximize2 } from 'lucide-react';
import { wallChartAsOf } from '@/lib/shared';
import { cn } from '@/lib/cn';

const SRC = '/diagrams/target-state.svg';

/** What the chart actually contains, which is the reason to open it. */
const CONTENTS = [
  { count: '14', label: 'estate layers', detail: 'each with its control point and key mechanisms' },
  { count: '7', label: 'planes', detail: 'the agent system built across the estate' },
  { count: '10', label: 'cross-cutting concerns', detail: 'as columns, marked where each is owned and enforced' },
  { count: '4', label: 'deterministic zones', detail: 'underneath, as boundaries no model decision crosses' },
];

/**
 * The one-page architecture, as the landing page's lead artefact.
 *
 * The chart is a tall, dense reference meant to be zoomed and printed, so the
 * home page shows a bounded preview that fades out rather than the whole
 * two-and-a-half-thousand pixels: enough to see that it is real and detailed,
 * with the full version one click away. The in-page version on /architecture
 * renders it complete.
 */
export function WallChartPreview({ className }: { className?: string }) {
  return (
    <figure className={cn('card-soft not-prose overflow-hidden p-0', className)}>
      <div className="flex flex-col gap-3 border-b border-fd-border p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
        <div className="max-w-2xl">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.14em] text-ember-deep">The whole thing, on one page</p>
          <h2 className="mb-0 mt-2 font-serif text-2xl font-medium tracking-tight text-fd-foreground sm:text-3xl">
            The agentic enterprise, as one chart
          </h2>
          <p className="mb-0 mt-2 text-[14.5px] leading-[1.6] text-fd-muted-foreground">
            Every layer, plane, control point and boundary in a single reference you can zoom, print, and put on a
            wall. Products are named for orientation as of {wallChartAsOf}: representative, not exhaustive, and not
            endorsements.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={SRC}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-ember px-4 py-2 text-[13px] font-semibold text-white shadow-md shadow-ember/20 transition-colors hover:bg-ember-deep"
          >
            <Maximize2 className="size-3.5" aria-hidden="true" />
            Open full size
          </a>
          <a
            href={SRC}
            download
            className="inline-flex items-center gap-1.5 rounded-full border border-fd-border bg-fd-card px-4 py-2 text-[13px] font-semibold text-fd-foreground transition-colors hover:border-ember/40 hover:text-ember-ink"
          >
            <Download className="size-3.5" aria-hidden="true" />
            SVG
          </a>
        </div>
      </div>

      <a
        href={SRC}
        target="_blank"
        rel="noreferrer"
        aria-label="The agentic enterprise on one page. Opens the full-size chart in a new tab."
        className="group relative block max-h-[30rem] overflow-hidden bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring sm:max-h-[34rem]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SRC}
          alt="The agentic enterprise target-state architecture on one page: fourteen estate layers with their control points and mechanisms, grouped into seven planes, with ten cross-cutting concerns as columns and four deterministic zones beneath."
          className="block h-auto w-full"
          loading="eager"
        />
        {/* The chart continues past the fold; the fade says so without cropping hard. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white"
        />
        <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/85 px-4 py-1.5 text-[12px] font-semibold text-white shadow-lg transition-transform group-hover:scale-105">
          Open the full chart
        </span>
      </a>

      <figcaption className="grid gap-x-6 gap-y-3 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
        {CONTENTS.map((item) => (
          <div key={item.label}>
            <p className="m-0 font-sans text-[22px] font-semibold leading-none text-fd-foreground">
              {item.count}{' '}
              <span className="text-[13px] font-medium tracking-tight text-ember-deep">{item.label}</span>
            </p>
            <p className="m-0 mt-1.5 text-[12.5px] leading-[1.5] text-fd-muted-foreground">{item.detail}</p>
          </div>
        ))}
      </figcaption>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-fd-border px-5 py-4 text-[13px] sm:px-6">
        <Link href="/architecture" className="inline-flex items-center gap-1 font-semibold text-ember-deep hover:text-ember-ink">
          How to read it
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        <Link href="/layers" className="text-fd-muted-foreground transition-colors hover:text-fd-foreground">
          Go layer by layer for the detail
        </Link>
        <Link href="/decisions" className="text-fd-muted-foreground transition-colors hover:text-fd-foreground">
          The choices behind it
        </Link>
      </div>
    </figure>
  );
}
