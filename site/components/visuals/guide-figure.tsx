import { cn } from '@/lib/cn';
import { getFigure, type FigureManifestEntry } from '@/lib/figure-manifest';
import { DiagramRenderer } from './diagram-renderer';
import { EvidenceBadge } from './evidence-badge';

export interface GuideFigureProps {
  id: string;
  className?: string;
  fullWidth?: boolean;
  showSources?: boolean;
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

// Types whose layout is genuinely wider than a content column. Everything else
// reflows, so offering a "larger view" would just render the same thing twice.
// Almost every figure in the guide is an authors' synthesis of the research, so
// badging that adds no signal. The badge is reserved for the statuses that
// change how a reader should treat the diagram.
const DEFAULT_EVIDENCE = new Set(['author-position', 'conceptual-guide']);

const WIDE_TYPES = new Set(['matrix', 'architecture', 'map', 'swimlane']);

export function GuideFigure({
  id,
  className,
  fullWidth = false,
  showSources = true,
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
        {DEFAULT_EVIDENCE.has(figure.evidenceStatus) ? null : (
          <EvidenceBadge status={figure.evidenceStatus} compact />
        )}
      </header>

      <DiagramRenderer figure={figure} />

      <figcaption className="mt-4 text-sm leading-6 text-fd-muted-foreground">{figure.caption}</figcaption>

      {figure.longDescription ? (
        <p id={descriptionId} data-figure-long-description className="sr-only print:not-sr-only print:mt-3 print:block print:text-xs print:leading-5 print:text-slate-700">
          <strong>Diagram description:</strong> {figure.longDescription}
        </p>
      ) : null}

      {showSources ? <div className="mt-4"><FigureSources figure={figure} /></div> : null}
    </figure>
  );
}
