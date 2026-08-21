import { Fragment } from 'react';
import type {
  FigureManifestEntry,
  VisualEdgeKind,
  VisualNodeKind,
} from '@/lib/figure-manifest';
import { cn } from '@/lib/cn';

const kindClasses: Record<VisualNodeKind, string> = {
  human: 'border-amber-500/45 bg-amber-500/10 text-amber-950 dark:text-amber-100',
  agent: 'border-violet-500/45 bg-violet-500/10 text-violet-950 dark:text-violet-100',
  system: 'border-blue-500/45 bg-blue-500/10 text-blue-950 dark:text-blue-100',
  control: 'border-slate-500/50 bg-slate-500/10 text-slate-950 dark:text-slate-100',
  evidence: 'border-teal-500/45 bg-teal-500/10 text-teal-950 dark:text-teal-100',
  risk: 'border-rose-500/45 bg-rose-500/10 text-rose-950 dark:text-rose-100',
  neutral: 'border-fd-border bg-fd-muted/40 text-fd-foreground',
};

const edgeClasses: Record<VisualEdgeKind, string> = {
  action: 'border-solid border-fd-foreground/45',
  advisory: 'border-dotted border-violet-500/70',
  evidence: 'border-double border-teal-600/70',
  feedback: 'border-dashed border-sky-600/70',
  blocked: 'border-dashed border-rose-600/70',
};

const svgNodePalette: Record<VisualNodeKind, { fill: string; stroke: string }> = {
  human: { fill: '#fffbeb', stroke: '#d97706' },
  agent: { fill: '#f5f3ff', stroke: '#7c3aed' },
  system: { fill: '#eff6ff', stroke: '#2563eb' },
  control: { fill: '#f8fafc', stroke: '#475569' },
  evidence: { fill: '#f0fdfa', stroke: '#0f766e' },
  risk: { fill: '#fff1f2', stroke: '#e11d48' },
  neutral: { fill: '#f8fafc', stroke: '#64748b' },
};

const svgEdgePalette: Record<VisualEdgeKind, { stroke: string; dash?: string }> = {
  action: { stroke: '#475569' },
  advisory: { stroke: '#7c3aed', dash: '3 5' },
  evidence: { stroke: '#0f766e', dash: '2 4' },
  feedback: { stroke: '#0284c7', dash: '8 5' },
  blocked: { stroke: '#e11d48', dash: '8 5' },
};

function nodeClass(kind?: VisualNodeKind) {
  return kindClasses[kind ?? 'neutral'];
}

function StageDiagram({ figure }: { figure: FigureManifestEntry }) {
  const stages = figure.data.stages ?? [];
  const isLoop = figure.type === 'loop';

  const singleRow = stages.length <= 4;

  return (
    <div className="rounded-md print:overflow-visible">
      <ol
        className={cn(
          'grid grid-flow-row gap-3 px-1 pb-3 pt-1 print:grid-flow-row print:grid-cols-3',
          singleRow ? 'sm:grid-flow-col sm:auto-cols-fr' : 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {stages.map((stage, index) => (
          <li key={`${stage.label}-${index}`} className="relative min-w-0 snap-start">
            <div className={cn('h-full rounded-xl border p-4 shadow-sm', nodeClass(stage.kind))}>
              <div className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current/25 bg-white/45 text-xs font-semibold dark:bg-black/15">
                  {index + 1}
                </span>
                <p className="m-0 text-sm font-semibold leading-5">{stage.label}</p>
              </div>
              <p className="mb-0 mt-2 text-xs leading-5 opacity-85">{stage.detail}</p>
              {stage.gate ? (
                <p className="mb-0 mt-3 rounded-md border border-current/25 bg-white/35 px-2 py-1.5 text-[0.6875rem] font-medium leading-4 dark:bg-black/10">
                  Gate · {stage.gate}
                </p>
              ) : null}
            </div>
            {singleRow && index < stages.length - 1 ? (
              <span className="pointer-events-none absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-sm font-semibold text-fd-muted-foreground sm:block" aria-hidden="true">
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {isLoop ? (
        <div className="mx-auto mt-2 flex max-w-xl items-center justify-center gap-3 rounded-full border border-dashed border-sky-500/50 bg-sky-500/5 px-4 py-2 text-center text-xs font-medium text-sky-900 dark:text-sky-100">
          <span aria-hidden="true">↶</span>
          Evidence feeds the next governed cycle
        </div>
      ) : null}
    </div>
  );
}

const funnelWidths = [
  'sm:w-full',
  'sm:w-[94%]',
  'sm:w-[88%]',
  'sm:w-[82%]',
  'sm:w-[76%]',
  'sm:w-[70%]',
  'sm:w-[64%]',
  'sm:w-[58%]',
] as const;

function FunnelDiagram({ figure }: { figure: FigureManifestEntry }) {
  const stages = figure.data.stages ?? [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-3 flex items-center justify-between gap-4 px-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fd-muted-foreground" aria-hidden="true">
        <span>All candidates</span>
        <span>Qualified result</span>
      </div>
      <ol className="m-0 list-none space-y-0 p-0">
        {stages.map((stage, index) => {
          const isResult = index === stages.length - 1;
          const widthClass = funnelWidths[Math.min(index, funnelWidths.length - 1)];

          return (
            <li key={`${stage.label}-${index}`} className={cn('mx-auto w-full', widthClass)}>
              <div className={cn('rounded-xl border px-4 py-3 shadow-sm', nodeClass(stage.kind), isResult && 'ring-2 ring-teal-500/35')}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-wider opacity-60">
                      {isResult ? 'Result' : `Filter ${index + 1}`}
                    </p>
                    <p className="mb-0 mt-1 text-sm font-semibold leading-5">{stage.label}</p>
                    <p className="mb-0 mt-1 text-xs leading-5 opacity-80">{stage.detail}</p>
                  </div>
                  {stage.gate ? (
                    <span className="shrink-0 rounded-full border border-current/25 bg-white/35 px-2.5 py-1 text-[0.6875rem] font-medium dark:bg-black/10">
                      {stage.gate}
                    </span>
                  ) : null}
                </div>
              </div>
              {!isResult ? (
                <div className="flex h-5 items-center justify-center" aria-hidden="true">
                  <span className="h-3 w-px bg-fd-border" />
                  <span className="-ml-1 mt-2 size-2 rotate-45 border-b border-r border-fd-border" />
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function TimelineDiagram({ figure }: { figure: FigureManifestEntry }) {
  const stages = figure.data.stages ?? [];

  return (
    <div className="relative">
      <span
        className="absolute bottom-5 left-[1.125rem] top-5 w-px bg-fd-border lg:bottom-auto lg:left-5 lg:right-5 lg:top-[1.125rem] lg:h-px lg:w-auto print:hidden"
        aria-hidden="true"
      />
      <ol className="relative m-0 grid list-none gap-4 p-0 lg:grid-flow-col lg:auto-cols-fr lg:gap-3 print:grid-flow-row print:grid-cols-3">
        {stages.map((stage, index) => (
          <li key={`${stage.label}-${index}`} className="relative grid min-w-0 grid-cols-[2.25rem_1fr] gap-3 lg:block">
            <span className={cn('relative z-10 flex size-9 items-center justify-center rounded-full border text-xs font-semibold shadow-sm', nodeClass(stage.kind))}>
              {index + 1}
            </span>
            <div className="min-w-0 rounded-xl border bg-fd-background p-3 lg:mt-3 lg:min-h-36">
              <p className="m-0 text-sm font-semibold leading-5">{stage.label}</p>
              <p className="mb-0 mt-2 text-xs leading-5 text-fd-muted-foreground">{stage.detail}</p>
              {stage.gate ? (
                <p className="mb-0 mt-3 border-t pt-2 text-[0.6875rem] font-medium leading-4 text-fd-muted-foreground">
                  Advance when: <span className="text-fd-foreground">{stage.gate}</span>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SpectrumDiagram({ figure }: { figure: FigureManifestEntry }) {
  const stages = figure.data.stages ?? [];

  return (
    <div className="max-w-full rounded-md pb-2">
      <div>
        <div className="hidden items-center justify-between gap-4 px-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-fd-muted-foreground sm:flex">
          <span>Start of range</span>
          <span>End of range</span>
        </div>
        <div className="relative mx-4 mt-3 hidden h-2 rounded-full bg-fd-muted sm:block" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-teal-500/65" />
          <div className="absolute inset-y-0 left-1/3 w-1/3 bg-violet-500/60" />
          <div className="absolute inset-y-0 right-0 w-1/3 rounded-full bg-rose-500/60" />
        </div>
        <ol className="m-0 mt-2 grid list-none grid-flow-row gap-2 p-0 sm:mt-[-0.625rem] sm:auto-cols-fr sm:grid-flow-col print:grid-flow-row print:grid-cols-3">
          {stages.map((stage, index) => (
            <li key={`${stage.label}-${index}`} className="relative min-w-0 pt-0">
              <span className={cn('relative z-10 mx-auto flex size-5 items-center justify-center rounded-full border-2 border-fd-background text-[0.625rem] font-semibold shadow-sm', nodeClass(stage.kind))} aria-hidden="true">
                {index + 1}
              </span>
              <div className={cn('mt-3 h-[calc(100%-2rem)] rounded-xl border p-3', nodeClass(stage.kind))}>
                <p className="m-0 text-xs font-semibold leading-5">{stage.label}</p>
                <p className="mb-0 mt-1 text-[0.6875rem] leading-4 opacity-80">{stage.detail}</p>
                {stage.gate ? <p className="mb-0 mt-2 text-[0.6875rem] font-medium leading-4">{stage.gate}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

const stackWidths = [
  'sm:w-[72%]',
  'sm:w-[79%]',
  'sm:w-[86%]',
  'sm:w-[93%]',
  'sm:w-full',
] as const;

function StackDiagram({ figure }: { figure: FigureManifestEntry }) {
  const stages = figure.data.stages ?? [];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-3 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-wider text-fd-muted-foreground">
        <span>Increasing persistence and obligation</span>
        <span className="h-px flex-1 bg-fd-border" aria-hidden="true" />
        <span aria-hidden="true">↓</span>
      </div>
      <ol className="m-0 list-none space-y-1 p-0">
        {stages.map((stage, index) => {
          const proportionalIndex = stages.length > 1
            ? Math.round((index / (stages.length - 1)) * (stackWidths.length - 1))
            : stackWidths.length - 1;

          return (
            <li key={`${stage.label}-${index}`} className={cn('mx-auto w-full', stackWidths[proportionalIndex])}>
              <div className={cn('grid gap-2 rounded-lg border px-4 py-3 shadow-sm sm:grid-cols-[2.25rem_minmax(8rem,0.7fr)_minmax(10rem,1.3fr)] sm:items-center', nodeClass(stage.kind))}>
                <span className="flex size-8 items-center justify-center rounded-md border border-current/25 bg-white/35 text-xs font-semibold dark:bg-black/10">
                  {index + 1}
                </span>
                <p className="m-0 text-sm font-semibold leading-5">{stage.label}</p>
                <div className="min-w-0">
                  <p className="m-0 text-xs leading-5 opacity-80">{stage.detail}</p>
                  {stage.gate ? <p className="mb-0 mt-1 text-[0.6875rem] font-medium leading-4">Control: {stage.gate}</p> : null}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const loopPositions = [
  'sm:col-start-1 sm:row-start-1',
  'sm:col-start-2 sm:row-start-1',
  'sm:col-start-3 sm:row-start-1',
  'sm:col-start-3 sm:row-start-3',
  'sm:col-start-2 sm:row-start-3',
  'sm:col-start-1 sm:row-start-3',
] as const;

function LoopDiagram({ figure }: { figure: FigureManifestEntry }) {
  const stages = figure.data.stages ?? [];
  const columns = figure.data.columns ?? [];

  if (columns.length) {
    return (
      <div data-semantic="loop" className="relative mx-auto max-w-4xl rounded-[2rem] border-2 border-dashed border-sky-600/45 p-4 sm:p-8">
        <div className="grid items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr] sm:gap-5">
          {columns.map((column, index) => (
            <Fragment key={column.label}>
              {index > 0 ? (
                <div className="flex items-center justify-center gap-3 text-xl font-semibold sm:flex-col sm:gap-2" aria-hidden="true">
                  <span className="text-sky-700 sm:hidden">↓</span>
                  <span className="text-sky-700/55 sm:hidden">↑</span>
                  <span className="hidden text-sky-700 sm:block">→</span>
                  <span className="hidden text-sky-700/55 sm:block">←</span>
                </div>
              ) : null}
              <section className={cn('rounded-2xl border p-5 shadow-sm', nodeClass(column.kind))}>
                <p className="m-0 text-sm font-semibold">{column.label}</p>
                <ol className="mb-0 mt-3 space-y-2 pl-5 text-xs leading-5">
                  {column.items.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </section>
            </Fragment>
          ))}
        </div>
        <p className="mx-auto mb-0 mt-6 w-fit rounded-full border bg-fd-background px-4 py-2 text-center text-xs font-semibold text-sky-900 dark:text-sky-100">
          <span aria-hidden="true">↻ </span>Memory evidence and judged learning feed the next governed cycle
        </p>
      </div>
    );
  }

  return (
    <div data-semantic="loop" className="relative mx-auto max-w-5xl rounded-[2rem] border-2 border-dashed border-sky-600/45 p-3 sm:p-7">
      <span data-loop-path="closed" className="pointer-events-none absolute inset-5 hidden rounded-[2.5rem] border-2 border-dashed border-sky-600/40 sm:block" aria-hidden="true" />
      <ol className="relative m-0 grid list-none gap-3 p-0 sm:grid-cols-3 sm:grid-rows-[auto_4.5rem_auto]">
        {stages.map((stage, index) => (
          <li key={`${stage.label}-${index}`} className={cn('relative z-10 min-w-0', loopPositions[index] ?? '')}>
            <div className={cn('h-full rounded-xl border p-4 shadow-sm', nodeClass(stage.kind))}>
              <div className="flex items-center gap-2">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current/25 bg-white/45 text-xs font-semibold dark:bg-black/15">{index + 1}</span>
                <p className="m-0 text-sm font-semibold leading-5">{stage.label}</p>
              </div>
              <p className="mb-0 mt-2 text-xs leading-5 opacity-85">{stage.detail}</p>
            </div>
            {index < stages.length - 1 ? <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-sky-700 sm:block" aria-hidden="true">→</span> : null}
          </li>
        ))}
        <li className="relative z-10 hidden items-center justify-center sm:col-start-2 sm:row-start-2 sm:flex" aria-hidden="true">
          <span className="rounded-full border bg-fd-background px-4 py-2 text-center text-xs font-semibold text-sky-900 dark:text-sky-100">↻ Governed cycle</span>
        </li>
      </ol>
      <p className="mb-0 mt-3 text-center text-xs font-medium text-sky-900 dark:text-sky-100">The final evidence feeds the next controlled pass.</p>
    </div>
  );
}

function TopologyMapDiagram({ figure }: { figure: FigureManifestEntry }) {
  const nodes = figure.data.nodes ?? [];
  const edges = figure.data.edges ?? [];
  const columns = nodes.length > 6 ? 5 : 3;
  const rows = Math.ceil(nodes.length / columns);
  const width = 1000;
  const gapX = 28;
  const gapY = 52;
  const margin = 34;
  const nodeWidth = (width - margin * 2 - gapX * (columns - 1)) / columns;
  const nodeHeight = 92;
  const height = margin * 2 + rows * nodeHeight + (rows - 1) * gapY;
  const positions = nodes.map((node, index) => ({
    node,
    x: margin + (index % columns) * (nodeWidth + gapX),
    y: margin + Math.floor(index / columns) * (nodeHeight + gapY),
  }));
  const markerId = `map-arrow-${figure.id}`;

  return (
    <div data-semantic="topology-map" className="max-w-full rounded-xl border bg-white">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" aria-hidden="true" focusable="false">
        <defs>
          <marker id={markerId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
          </marker>
        </defs>
        {edges.map((edge, index) => {
          const from = positions.find((position) => position.node.id === edge.from);
          const to = positions.find((position) => position.node.id === edge.to);
          if (!from || !to) return null;
          const style = svgEdgePalette[edge.kind ?? 'action'];
          return (
            <line
              key={`${edge.from}-${edge.to}-${index}`}
              data-map-edge={index}
              x1={from.x + nodeWidth / 2}
              y1={from.y + nodeHeight / 2}
              x2={to.x + nodeWidth / 2}
              y2={to.y + nodeHeight / 2}
              stroke={style.stroke}
              strokeWidth="3"
              strokeDasharray={style.dash}
              markerEnd={`url(#${markerId})`}
            />
          );
        })}
        {positions.map(({ node, x, y }, index) => {
          const palette = svgNodePalette[node.kind ?? 'neutral'];
          return (
            <g key={node.id} data-map-node={index}>
              <rect x={x} y={y} width={nodeWidth} height={nodeHeight} rx="16" fill={palette.fill} stroke={palette.stroke} strokeWidth="2" />
              <rect x={x} y={y} width="7" height={nodeHeight} rx="3.5" fill={palette.stroke} />
              <text x={x + 22} y={y + 38} fill="#0f172a" fontSize="16" fontWeight="700">{node.label}</text>
              {node.detail ? <text x={x + 22} y={y + 64} fill="#475569" fontSize="12">{node.detail}</text> : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function ArchitectureDiagram({ figure }: { figure: FigureManifestEntry }) {
  const nodes = figure.data.nodes ?? [];
  const edges = figure.data.edges ?? [];
  // The seven-plane figure describes planes; layer diagrams describe the
  // components inside one layer, so the row and flow labels follow the figure.
  const isPlaneFigure = figure.category === 'foundation';
  const rowNoun = isPlaneFigure ? 'Plane' : 'Component';
  const flowsLabel = isPlaneFigure ? 'Cross-plane flows' : 'Flows';

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(15rem,0.42fr)]">
      <ol className="m-0 list-none space-y-2 p-0" aria-label={isPlaneFigure ? 'Architecture planes' : 'Architecture components'}>
        {nodes.map((node, index) => (
          <li key={node.id} className="grid min-w-0 grid-cols-[2.5rem_1fr] gap-2 sm:grid-cols-[2.5rem_7rem_1fr]">
            <span className="flex items-center justify-center rounded-lg border bg-fd-background text-[0.6875rem] font-semibold text-fd-muted-foreground" aria-label={`${rowNoun} ${index + 1}`}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="hidden items-center rounded-lg border bg-fd-muted/35 px-3 text-[0.6875rem] font-semibold uppercase tracking-wider text-fd-muted-foreground sm:flex">
              {node.group ?? rowNoun}
            </span>
            <section className={cn('min-w-0 rounded-lg border px-4 py-3', nodeClass(node.kind), node.emphasis && 'ring-2 ring-current/40')}>
              {node.group ? <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-wider opacity-60 sm:hidden">{node.group}</p> : null}
              <p className="m-0 text-sm font-semibold">{node.label}</p>
              {node.detail ? <p className="mb-0 mt-1 text-xs leading-5 opacity-80">{node.detail}</p> : null}
            </section>
          </li>
        ))}
      </ol>
      {edges.length ? (
        <aside className="rounded-xl border bg-fd-background p-3" aria-label={flowsLabel}>
          <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-wider text-fd-muted-foreground">{flowsLabel}</p>
          <ul className="mb-0 mt-3 space-y-2 pl-0 text-xs" role="list">
            {edges.map((edge, index) => {
              const from = nodes.find((node) => node.id === edge.from)?.label ?? edge.from;
              const to = nodes.find((node) => node.id === edge.to)?.label ?? edge.to;

              return (
                <li key={`${edge.from}-${edge.to}-${index}`} className={cn('rounded-r-lg border-l-2 bg-fd-card px-3 py-2', edgeClasses[edge.kind ?? 'action'])}>
                  <div className="flex items-center gap-2 font-medium">
                    <span>{from}</span>
                    <span aria-hidden="true">→</span>
                    <span>{to}</span>
                  </div>
                  {edge.label ? <p className="mb-0 mt-1 text-[0.6875rem] leading-4 text-fd-muted-foreground">{edge.label}</p> : null}
                </li>
              );
            })}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}

function ColumnsDiagram({ figure }: { figure: FigureManifestEntry }) {
  const columns = figure.data.columns ?? [];

  return (
    <div className={cn('grid gap-3', columns.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3')}>
      {columns.map((column) => (
        <section key={column.label} className={cn('rounded-xl border p-4', nodeClass(column.kind))}>
          <p className="m-0 text-sm font-semibold">{column.label}</p>
          {column.detail ? <p className="mb-0 mt-2 text-xs opacity-80">{column.detail}</p> : null}
          <ul className="mb-0 mt-3 space-y-2 pl-0 text-xs leading-5" role="list">
            {column.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-current opacity-55" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function MatrixDiagram({ figure }: { figure: FigureManifestEntry }) {
  const rows = figure.data.rows ?? [];
  const columns = figure.data.axisColumns ?? [];
  const cells = figure.data.cells ?? [];
  const cellFor = (row: string, column: string) =>
    cells.find((candidate) => candidate.row === row && candidate.column === column);

  return (
    <div className="rounded-xl border bg-fd-background">
      <table className="m-0 hidden w-full table-fixed border-collapse text-left text-xs sm:table print:table">
        <thead>
          <tr className="bg-fd-muted/55">
            <th className="w-[18%] break-words border-b border-r px-3 py-3 font-semibold" scope="col">Dimension</th>
            {columns.map((column) => (
              <th key={column} className="break-words border-b border-r px-2 py-3 font-semibold last:border-r-0" scope="col">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row}>
              <th className="break-words border-b border-r bg-fd-muted/25 px-3 py-3 font-medium last:border-b-0" scope="row">{row}</th>
              {columns.map((column) => {
                const cell = cellFor(row, column);
                return (
                  <td key={`${row}-${column}`} className={cn('break-words border-b border-r px-2 py-3 align-top last:border-r-0', cell?.emphasis && 'bg-teal-500/10')}>
                    {cell ? (
                      <>
                        <span className="font-medium">{cell.label}</span>
                        {cell.detail ? <span className="mt-1 block text-fd-muted-foreground">{cell.detail}</span> : null}
                      </>
                    ) : (
                      <span className="text-fd-muted-foreground/55" aria-label="No special annotation">·</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="divide-y sm:hidden print:hidden">
        {rows.map((row) => (
          <div key={row} className="p-3">
            <p className="m-0 text-xs font-semibold">{row}</p>
            <ul className="m-0 mt-2 list-none space-y-1.5 p-0 text-xs leading-5">
              {columns.map((column) => {
                const cell = cellFor(row, column);
                if (!cell) return null;
                return (
                  <li key={`${row}-${column}`} className="flex flex-wrap gap-x-2">
                    <span className="font-medium text-fd-muted-foreground">{column}:</span>
                    <span className={cn(cell.emphasis && 'font-semibold')}>
                      {cell.label}
                      {cell.detail ? ` (${cell.detail})` : ''}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function SwimlaneDiagram({ figure }: { figure: FigureManifestEntry }) {
  const lanes = figure.data.lanes ?? [];

  return (
    <div className="space-y-2">
      {lanes.map((lane) => (
        <div key={lane.label} className="grid gap-2 rounded-xl border bg-fd-background p-2 sm:grid-cols-[8rem_1fr]">
          <div className={cn('flex items-center rounded-lg border px-3 py-2 text-xs font-semibold', nodeClass(lane.kind))}>{lane.label}</div>
          <ol className="m-0 flex list-none flex-wrap items-stretch gap-2 p-0">
            {lane.steps.map((step, index) => (
              <li key={`${step}-${index}`} className="flex min-w-[12rem] flex-1 items-center rounded-lg border bg-fd-card px-3 py-2 text-xs leading-5">
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function MetricsDiagram({ figure }: { figure: FigureManifestEntry }) {
  const metrics = figure.data.metrics ?? [];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map((metric) => (
        <section key={metric.label} className="rounded-xl border bg-fd-background p-4">
          <p className="m-0 text-xs font-medium text-fd-muted-foreground">{metric.label}</p>
          <p className="mb-0 mt-2 text-lg font-semibold tracking-tight">{metric.value}</p>
          {metric.detail ? <p className="mb-0 mt-2 text-xs leading-5 text-fd-muted-foreground">{metric.detail}</p> : null}
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-fd-muted" aria-hidden="true">
            <div className={cn('h-full rounded-full', metric.direction === 'down' ? 'w-1/3 bg-rose-500' : metric.direction === 'up' ? 'w-4/5 bg-teal-500' : 'w-3/5 bg-sky-500')} />
          </div>
        </section>
      ))}
    </div>
  );
}

function ItemsDiagram({ figure }: { figure: FigureManifestEntry }) {
  const items = figure.data.items ?? [];

  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <div key={`${item.label}-${index}`} className={cn('rounded-lg border px-3 py-3 text-xs', nodeClass(item.kind), item.active && 'ring-2 ring-violet-500 ring-offset-2 ring-offset-fd-background')}>
          <p className="m-0 font-semibold">{item.label}</p>
          {item.detail ? <p className="mb-0 mt-1 leading-4 opacity-75">{item.detail}</p> : null}
          {item.active ? <span className="mt-2 inline-flex rounded-full bg-violet-600 px-2 py-0.5 text-[0.6875rem] font-semibold text-white">This layer</span> : null}
        </div>
      ))}
    </div>
  );
}

function NodesDiagram({ figure }: { figure: FigureManifestEntry }) {
  const nodes = figure.data.nodes ?? [];
  const edges = figure.data.edges ?? [];
  const groups = Array.from(new Set(nodes.map((node) => node.group).filter(Boolean)));

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {nodes.map((node) => (
          <section key={node.id} className={cn('rounded-xl border p-4', nodeClass(node.kind), node.emphasis && 'ring-2 ring-current/40')}>
            {node.group ? <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-wider opacity-60">{node.group}</p> : null}
            <p className="mb-0 mt-1 text-sm font-semibold">{node.label}</p>
            {node.detail ? <p className="mb-0 mt-2 text-xs leading-5 opacity-80">{node.detail}</p> : null}
          </section>
        ))}
      </div>
      {edges.length ? (
        <div className="rounded-xl border bg-fd-background p-3">
          <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-wider text-fd-muted-foreground">Connections</p>
          <ul className="mb-0 mt-2 grid gap-2 pl-0 text-xs sm:grid-cols-2" role="list">
            {edges.map((edge, index) => {
              const from = nodes.find((node) => node.id === edge.from)?.label ?? edge.from;
              const to = nodes.find((node) => node.id === edge.to)?.label ?? edge.to;
              return (
                <li key={`${edge.from}-${edge.to}-${index}`} className={cn('flex items-center gap-2 border-l-2 py-1 pl-2', edgeClasses[edge.kind ?? 'action'])}>
                  <span className="font-medium">{from}</span>
                  <span aria-hidden="true">→</span>
                  <span>{to}</span>
                  {edge.label ? <span className="text-fd-muted-foreground">· {edge.label}</span> : null}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      {groups.length > 1 ? <p className="m-0 text-center text-[0.6875rem] text-fd-muted-foreground">Grouped by {groups.join(' · ')}</p> : null}
    </div>
  );
}

export interface DiagramRendererProps {
  figure: FigureManifestEntry;
  className?: string;
  labelled?: boolean;
}

export function DiagramRenderer({ figure, className, labelled = true }: DiagramRendererProps) {
  let content;

  if (figure.type === 'loop') content = <LoopDiagram figure={figure} />;
  else if (figure.type === 'map' && figure.data.nodes?.length && figure.data.edges?.length) content = <TopologyMapDiagram figure={figure} />;
  else if (figure.data.lanes?.length) content = <SwimlaneDiagram figure={figure} />;
  else if (figure.data.rows?.length && figure.data.axisColumns?.length) content = <MatrixDiagram figure={figure} />;
  else if (figure.type === 'comparison' && figure.data.columns?.length) content = <ColumnsDiagram figure={figure} />;
  else if (figure.type === 'architecture' && figure.data.nodes?.length) content = <ArchitectureDiagram figure={figure} />;
  else if (figure.type === 'funnel' && figure.data.stages?.length) content = <FunnelDiagram figure={figure} />;
  else if (figure.type === 'timeline' && figure.data.stages?.length) content = <TimelineDiagram figure={figure} />;
  else if (figure.type === 'spectrum' && figure.data.stages?.length) content = <SpectrumDiagram figure={figure} />;
  else if (figure.type === 'stack' && figure.data.stages?.length) content = <StackDiagram figure={figure} />;
  else if (figure.data.columns?.length) content = <ColumnsDiagram figure={figure} />;
  else if (figure.data.stages?.length) content = <StageDiagram figure={figure} />;
  else if (figure.data.metrics?.length) content = <MetricsDiagram figure={figure} />;
  else if (figure.data.nodes?.length) content = <NodesDiagram figure={figure} />;
  else content = <ItemsDiagram figure={figure} />;

  return (
    <div
      role={labelled ? 'group' : undefined}
      aria-label={labelled ? figure.alt : undefined}
      aria-hidden={labelled ? undefined : true}
      className={cn('not-prose rounded-2xl border bg-fd-card/55 p-3 sm:p-5', className)}
    >
      {content}
      {figure.data.note ? (
        <p className="mb-0 mt-4 rounded-lg border border-amber-500/35 bg-amber-500/10 px-3 py-2 text-xs leading-5 text-amber-950 dark:text-amber-100">
          {figure.data.note}
        </p>
      ) : null}
    </div>
  );
}
