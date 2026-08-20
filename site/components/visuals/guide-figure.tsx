import { cn } from '@/lib/cn';
import { getFigure, type FigureManifestEntry } from '@/lib/figure-manifest';
import { DiagramRenderer } from './diagram-renderer';
import { EvidenceBadge } from './evidence-badge';

export interface GuideFigureProps {
  id: string;
  className?: string;
  fullWidth?: boolean;
  showSources?: boolean;
  zoomable?: boolean;
}

function FigureSources({ figure }: { figure: FigureManifestEntry }) {
  if (!figure.sources.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] text-fd-muted-foreground">
      <span>Reviewed {figure.reviewedAt}</span>
      <span aria-hidden="true">·</span>
      <span>Sources:</span>
      {figure.sources.map((source) => (
        <a key={`${source.href}-${source.label}`} href={source.href} className="underline decoration-fd-border underline-offset-4 hover:text-fd-foreground">
          {source.label}
        </a>
      ))}
    </div>
  );
}

export function GuideFigure({
  id,
  className,
  fullWidth = false,
  showSources = true,
  zoomable = true,
}: GuideFigureProps) {
  const figure = getFigure(id);
  const titleId = `figure-${figure.id}-title`;
  const takeawayId = `figure-${figure.id}-takeaway`;
  const descriptionId = `figure-${figure.id}-description`;

  return (
    <figure
      id={figure.anchor}
      data-guide-figure
      data-figure-id={figure.id}
      data-figure-type={figure.type}
      aria-labelledby={titleId}
      aria-describedby={figure.longDescription ? `${takeawayId} ${descriptionId}` : takeawayId}
      className={cn(
        'not-prose my-8 rounded-2xl border bg-fd-background p-4 shadow-sm sm:p-6 print:break-inside-avoid print:border-slate-300 print:shadow-none',
        fullWidth && 'w-full max-w-none xl:-mx-12 xl:w-[calc(100%+6rem)]',
        className,
      )}
    >
      <header className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fd-muted-foreground">
            {figure.category} · {figure.type}
          </p>
          <h2 id={titleId} className="mb-0 mt-1 text-lg font-semibold tracking-tight sm:text-xl">{figure.title}</h2>
          <p id={takeawayId} className="mb-0 mt-2 text-sm leading-6 text-fd-muted-foreground">{figure.takeaway}</p>
        </div>
        <EvidenceBadge status={figure.evidenceStatus} compact />
      </header>

      <DiagramRenderer figure={figure} />

      <figcaption className="mt-4 text-sm leading-6 text-fd-muted-foreground">{figure.caption}</figcaption>

      {figure.longDescription ? (
        <p id={descriptionId} data-figure-long-description className="sr-only print:not-sr-only print:mt-3 print:block print:text-xs print:leading-5 print:text-slate-700">
          <strong>Diagram description:</strong> {figure.longDescription}
        </p>
      ) : null}

      <div data-figure-controls className="mt-4 flex flex-col gap-2 border-t pt-4 print:hidden">
        {zoomable ? (
          <details className="group rounded-lg border bg-fd-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-xs font-medium marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring [&::-webkit-details-marker]:hidden">
              Open a larger view
              <span className="text-base motion-safe:transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div className="border-t p-3 sm:p-5">
              <div
                className="max-h-[75vh] max-w-full overflow-auto overscroll-contain rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                role="region"
                aria-label={`Scrollable larger view of ${figure.title}`}
                tabIndex={0}
              >
                <DiagramRenderer figure={figure} labelled={false} className="min-w-[42rem] bg-fd-background" />
              </div>
            </div>
          </details>
        ) : null}
        {figure.longDescription ? (
          <details className="group rounded-lg border bg-fd-card">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-xs font-medium marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring [&::-webkit-details-marker]:hidden">
              Read the diagram description
              <span className="text-base motion-safe:transition-transform group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="m-0 border-t px-3 py-3 text-xs leading-5 text-fd-muted-foreground">{figure.longDescription}</p>
          </details>
        ) : null}
      </div>

      {showSources ? <div className="mt-4"><FigureSources figure={figure} /></div> : null}
    </figure>
  );
}
