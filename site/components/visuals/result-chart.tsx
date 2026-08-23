'use client';

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Small, honest charts for the research pages. Built to the dataviz rules the
 * guide follows: thin marks, one baseline, hairline solid grid, text in text
 * tokens, a legend for two or more series, a hover layer, and a table twin.
 * Colours come from the validated `--viz-*` tokens in app/global.css.
 */

export type VizColor = 'ember' | 'slate' | 'aqua' | 'gold' | 'gray';

const COLOR: Record<VizColor, string> = {
  ember: 'var(--viz-ember)',
  slate: 'var(--viz-slate)',
  aqua: 'var(--viz-aqua)',
  gold: 'var(--viz-gold)',
  gray: 'var(--viz-gray)',
};

const SLOT_ORDER: VizColor[] = ['ember', 'slate', 'aqua', 'gold'];

export interface ChartSeries {
  name: string;
  values: Array<number | null>;
  color?: VizColor;
}

export interface ChartPoint {
  label: string;
  x: number;
  y: number;
  color?: VizColor;
  anchor?: 'start' | 'end';
  emphasis?: boolean;
}

export interface ChartInterval {
  low: number;
  high: number;
}

export interface ResultChartProps {
  title: string;
  subtitle?: string;
  kind: 'bars' | 'lines' | 'dots' | 'scatter';
  /** Category labels: bar rows, line x positions, or dot rows. */
  categories?: string[];
  /** Numeric x positions for `lines` when the categories are not evenly spaced. */
  xValues?: number[];
  series?: ChartSeries[];
  /** For `scatter`. */
  points?: ChartPoint[];
  /** For `dots`: one interval per category, around series[0]. */
  intervals?: Array<ChartInterval | null>;
  /** Bars: categories drawn in the accent colour (the rest are de-emphasised). Lines: series names to emphasise. */
  emphasis?: string[];
  min?: number;
  max?: number;
  ticks?: number[];
  decimals?: number;
  /** Prefix positive numbers with a plus sign (deltas). */
  signed?: boolean;
  xLabel?: string;
  yLabel?: string;
  /** Draw an emphasised hairline at this value (for example zero on a delta chart). */
  baseline?: number;
  caption?: string;
  /** Where the numbers come from: the experiment artifact and its date. */
  source: string;
  className?: string;
}

function useContainerWidth(fallback = 640) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(fallback);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width;
      if (next && Math.abs(next - width) > 1) setWidth(next);
    });
    observer.observe(element);
    setWidth(element.getBoundingClientRect().width || fallback);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, width };
}

function format(value: number | null | undefined, decimals: number, signed: boolean) {
  if (value === null || value === undefined || Number.isNaN(value)) return 'n/a';
  const text = value.toFixed(decimals);
  if (signed && value > 0) return `+${text}`;
  if (value < 0) return `−${Math.abs(value).toFixed(decimals)}`;
  return text;
}

function niceTicks(min: number, max: number, count = 5): number[] {
  if (max <= min) return [min];
  const raw = (max - min) / count;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const candidates = [1, 2, 2.5, 5, 10].map((m) => m * magnitude);
  const step = candidates.find((c) => c >= raw) ?? candidates[candidates.length - 1];
  const ticks: number[] = [];
  for (let t = Math.ceil(min / step) * step; t <= max + step / 1000; t += step) ticks.push(Number(t.toFixed(6)));
  return ticks;
}

function domainOf(values: number[], min?: number, max?: number, pad = 0.08): [number, number] {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  if (min !== undefined && max !== undefined) return [min, max];
  const span = hi - lo || 1;
  return [min ?? lo - span * pad, max ?? hi + span * pad];
}

function seriesColor(series: ChartSeries, index: number, emphasis?: string[]): string {
  if (series.color) return COLOR[series.color];
  if (emphasis?.length) return emphasis.includes(series.name) ? COLOR.ember : COLOR.gray;
  return COLOR[SLOT_ORDER[index % SLOT_ORDER.length]];
}

function Legend({ series, colors }: { series: ChartSeries[]; colors: string[] }) {
  if (series.length < 2) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-fd-muted-foreground" aria-label="Legend">
      {series.map((s, i) => (
        <li key={s.name} className="inline-flex items-center gap-1.5">
          <span className="inline-block h-[3px] w-4 rounded-full" style={{ background: colors[i] }} aria-hidden="true" />
          <span>{s.name}</span>
        </li>
      ))}
    </ul>
  );
}

function Tooltip({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 min-w-[9rem] rounded-lg border border-fd-border bg-fd-popover px-3 py-2 text-xs text-fd-popover-foreground shadow-lg"
      style={{ left: x, top: y, transform: 'translate(-50%, -100%)' }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Bars: horizontal, HTML, ≤24px thick, rounded data-end, value at the tip.   */
/* ------------------------------------------------------------------------- */

function Bars({
  categories,
  series,
  emphasis,
  min,
  max,
  decimals,
  signed,
  ticks,
}: Required<Pick<ResultChartProps, 'categories' | 'series' | 'decimals' | 'signed'>> &
  Pick<ResultChartProps, 'emphasis' | 'min' | 'max' | 'ticks'>) {
  const single = series.length === 1;
  const values = series.flatMap((s) => s.values.filter((v): v is number => v !== null));
  const [lo, hi] = domainOf([0, ...values], min ?? 0, max, 0.12);
  const axis = ticks ?? niceTicks(lo, hi, 4);
  const pct = (v: number) => `${Math.max(0, Math.min(100, ((v - lo) / (hi - lo)) * 100))}%`;
  const colors = series.map((s, i) => (single ? COLOR.ember : seriesColor(s, i, undefined)));

  return (
    <div>
      <div className="space-y-2.5">
        {categories.map((category, row) => {
          const highlighted = single && emphasis?.length ? emphasis.includes(category) : true;
          return (
            <div key={category} className="grid grid-cols-[minmax(7rem,30%)_1fr] items-center gap-3">
              <div className={cn('text-[13px] leading-tight', highlighted ? 'text-fd-foreground' : 'text-fd-muted-foreground')}>
                {category}
              </div>
              <div className="relative">
                {axis.map((t) => (
                  <span
                    key={t}
                    className="pointer-events-none absolute inset-y-0 w-px"
                    style={{ left: pct(t), background: 'var(--viz-grid)' }}
                    aria-hidden="true"
                  />
                ))}
                <div className="relative flex flex-col gap-0.5 py-0.5">
                  {series.map((s, i) => {
                    const v = s.values[row];
                    if (v === null || v === undefined) return null;
                    const color = single ? (highlighted ? COLOR.ember : COLOR.gray) : colors[i];
                    return (
                      <div
                        key={s.name}
                        className="group relative flex h-5 items-center"
                        tabIndex={0}
                        aria-label={`${category}${single ? '' : `, ${s.name}`}: ${format(v, decimals, signed)}`}
                      >
                        <div
                          className="h-[18px] rounded-r-[4px]"
                          style={{ width: pct(v), background: color, minWidth: v > lo ? 2 : 0 }}
                        />
                        <span className="ml-2 text-[12px] font-medium tabular-nums text-fd-foreground">
                          {format(v, decimals, signed)}
                        </span>
                        <span className="pointer-events-none absolute -top-8 left-0 hidden rounded-md border border-fd-border bg-fd-popover px-2 py-1 text-[11px] whitespace-nowrap text-fd-popover-foreground shadow-md group-hover:block group-focus-visible:block">
                          <strong className="font-semibold">{format(v, decimals, signed)}</strong>
                          <span className="text-fd-muted-foreground"> {single ? category : s.name}</span>
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-[minmax(7rem,30%)_1fr] gap-3">
        <span />
        <div className="relative h-4 text-[11px] text-fd-muted-foreground">
          {axis.map((t) => (
            <span key={t} className="absolute -translate-x-1/2 tabular-nums" style={{ left: pct(t) }}>
              {format(t, decimals, false)}
            </span>
          ))}
        </div>
      </div>
      <Legend series={series} colors={colors} />
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Lines: SVG in container pixels, 2px strokes, ringed markers, crosshair.    */
/* ------------------------------------------------------------------------- */

function Lines({
  width,
  categories,
  xValues,
  series,
  emphasis,
  min,
  max,
  ticks,
  decimals,
  signed,
  xLabel,
  yLabel,
}: Required<Pick<ResultChartProps, 'categories' | 'series' | 'decimals' | 'signed'>> &
  Pick<ResultChartProps, 'xValues' | 'emphasis' | 'min' | 'max' | 'ticks' | 'xLabel' | 'yLabel'> & { width: number }) {
  const height = 300;
  // Direct end-labels need a gutter sized to the longest series name; on narrow
  // screens the legend carries identity and the gutter collapses.
  const longest = Math.max(...series.map((s) => s.name.length));
  const showEndLabels = width >= 520;
  const gutter = showEndLabels ? Math.min(Math.round(width * 0.36), Math.round(longest * 6.4) + 18) : 16;
  const padding = { top: 16, right: gutter, bottom: xLabel ? 44 : 28, left: yLabel ? 62 : 44 };
  const plotW = Math.max(120, width - padding.left - padding.right);
  const plotH = height - padding.top - padding.bottom;
  const xs = xValues ?? categories.map((_, i) => i);
  const [xLo, xHi] = [Math.min(...xs), Math.max(...xs)];
  const values = series.flatMap((s) => s.values.filter((v): v is number => v !== null));
  const [yLo, yHi] = domainOf(values, min, max);
  const yTicks = ticks ?? niceTicks(yLo, yHi, 4);
  const sx = (x: number) => padding.left + ((x - xLo) / (xHi - xLo || 1)) * plotW;
  const sy = (y: number) => padding.top + (1 - (y - yLo) / (yHi - yLo || 1)) * plotH;
  const colors = series.map((s, i) => seriesColor(s, i, emphasis));
  const [active, setActive] = useState<number | null>(null);

  const endLabels = useMemo(() => {
    const items = series
      .map((s, i) => {
        // Label at the last plotted point, which may not be the last category.
        let lastIndex = s.values.length - 1;
        while (lastIndex >= 0 && (s.values[lastIndex] === null || s.values[lastIndex] === undefined)) lastIndex -= 1;
        const v = lastIndex >= 0 ? s.values[lastIndex] : null;
        return v === null || v === undefined ? null : { name: s.name, y: sy(v), color: colors[i] };
      })
      .filter((item): item is { name: string; y: number; color: string } => item !== null)
      .sort((a, b) => a.y - b.y);
    for (let i = 1; i < items.length; i++) {
      if (items[i].y - items[i - 1].y < 14) items[i].y = items[i - 1].y + 14;
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [series, width, yLo, yHi]);

  const onMove = (clientX: number, rect: DOMRect) => {
    const px = clientX - rect.left;
    let best = 0;
    let bestD = Infinity;
    xs.forEach((x, i) => {
      const d = Math.abs(sx(x) - px);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    setActive(best);
  };

  const onKey = (event: KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'ArrowRight') setActive((a) => Math.min(xs.length - 1, (a ?? -1) + 1));
    if (event.key === 'ArrowLeft') setActive((a) => Math.max(0, (a ?? xs.length) - 1));
    if (event.key === 'Escape') setActive(null);
  };

  return (
    <div className="relative">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Line chart; the table below carries the same values"
        tabIndex={0}
        onKeyDown={onKey}
        onFocus={() => setActive((a) => a ?? xs.length - 1)}
        onBlur={() => setActive(null)}
        onPointerMove={(e) => onMove(e.clientX, e.currentTarget.getBoundingClientRect())}
        onPointerLeave={() => setActive(null)}
        className="block max-w-full outline-none"
      >
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={padding.left} x2={padding.left + plotW} y1={sy(t)} y2={sy(t)} stroke="var(--viz-grid)" strokeWidth={1} />
            <text x={padding.left - 8} y={sy(t) + 4} textAnchor="end" fontSize={11} fill="var(--viz-muted)">
              {format(t, decimals, false)}
            </text>
          </g>
        ))}
        <line x1={padding.left} x2={padding.left + plotW} y1={padding.top + plotH} y2={padding.top + plotH} stroke="var(--viz-grid)" strokeWidth={1} />
        {xs.reduce<{ nodes: ReactNode[]; lastX: number }>(
          (acc, x, i) => {
            // Skip a tick label that would collide with the previous one on a numeric axis.
            const px = sx(x);
            const minGap = Math.max(28, categories[i].length * 6.5);
            if (i > 0 && px - acc.lastX < minGap) return acc;
            acc.nodes.push(
              <text key={i} x={px} y={padding.top + plotH + 16} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
                {categories[i]}
              </text>,
            );
            acc.lastX = px;
            return acc;
          },
          { nodes: [], lastX: -Infinity },
        ).nodes}
        {xLabel ? (
          <text x={padding.left + plotW / 2} y={height - 8} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
            {xLabel}
          </text>
        ) : null}
        {yLabel ? (
          <text transform={`translate(12 ${padding.top + plotH / 2}) rotate(-90)`} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
            {yLabel}
          </text>
        ) : null}
        {active !== null ? (
          <line x1={sx(xs[active])} x2={sx(xs[active])} y1={padding.top} y2={padding.top + plotH} stroke="var(--viz-muted)" strokeWidth={1} />
        ) : null}
        {series.map((s, i) => {
          const path = s.values
            .map((v, j) => (v === null || v === undefined ? null : `${j === 0 || s.values[j - 1] === null ? 'M' : 'L'}${sx(xs[j])},${sy(v)}`))
            .filter(Boolean)
            .join(' ');
          return (
            <g key={s.name}>
              <path d={path} fill="none" stroke={colors[i]} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              {s.values.map((v, j) =>
                v === null || v === undefined ? null : (
                  <circle key={j} cx={sx(xs[j])} cy={sy(v)} r={4} fill={colors[i]} stroke="var(--viz-surface)" strokeWidth={2} />
                ),
              )}
            </g>
          );
        })}
        {showEndLabels
          ? endLabels.map((item) => (
              <text key={item.name} x={padding.left + plotW + 10} y={item.y + 4} fontSize={11.5} fill="var(--viz-ink)">
                {item.name}
              </text>
            ))
          : null}
      </svg>
      {active !== null ? (
        <Tooltip x={sx(xs[active])} y={padding.top - 4}>
          <div className="mb-1 font-semibold">{categories[active]}</div>
          {series.map((s, i) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="inline-block h-[3px] w-3 rounded-full" style={{ background: colors[i] }} aria-hidden="true" />
              <strong className="font-semibold tabular-nums">{format(s.values[active], decimals, signed)}</strong>
              <span className="text-fd-muted-foreground">{s.name}</span>
            </div>
          ))}
        </Tooltip>
      ) : null}
      <Legend series={series} colors={colors} />
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Dots: an estimate with its interval per row, against a baseline.           */
/* ------------------------------------------------------------------------- */

function Dots({
  width,
  categories,
  series,
  intervals,
  min,
  max,
  ticks,
  decimals,
  signed,
  baseline,
  xLabel,
}: Required<Pick<ResultChartProps, 'categories' | 'series' | 'decimals' | 'signed'>> &
  Pick<ResultChartProps, 'intervals' | 'min' | 'max' | 'ticks' | 'baseline' | 'xLabel'> & { width: number }) {
  const rowH = 34;
  // The label gutter follows the longest category label, within half the width.
  const longest = Math.max(...categories.map((c) => c.length));
  const padding = { top: 8, right: 16, bottom: xLabel ? 40 : 26, left: Math.min(Math.round(width * 0.5), Math.max(96, Math.round(longest * 6.8) + 16)) };
  const height = padding.top + rowH * categories.length + padding.bottom;
  const plotW = Math.max(120, width - padding.left - padding.right);
  const estimates = series[0].values;
  const values = [
    ...estimates.filter((v): v is number => v !== null),
    ...(intervals ?? []).flatMap((iv) => (iv ? [iv.low, iv.high] : [])),
    ...(baseline !== undefined ? [baseline] : []),
  ];
  const [lo, hi] = domainOf(values, min, max, 0.15);
  const axis = ticks ?? niceTicks(lo, hi, 4);
  const sx = (x: number) => padding.left + ((x - lo) / (hi - lo || 1)) * plotW;
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Estimates with intervals; the table below carries the same values" className="block max-w-full">
        {axis.map((t) => (
          <g key={t}>
            <line x1={sx(t)} x2={sx(t)} y1={padding.top} y2={padding.top + rowH * categories.length} stroke="var(--viz-grid)" strokeWidth={1} />
            <text x={sx(t)} y={padding.top + rowH * categories.length + 16} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
              {format(t, decimals, signed)}
            </text>
          </g>
        ))}
        {baseline !== undefined ? (
          <line x1={sx(baseline)} x2={sx(baseline)} y1={padding.top} y2={padding.top + rowH * categories.length} stroke="var(--viz-muted)" strokeWidth={1.5} />
        ) : null}
        {xLabel ? (
          <text x={padding.left + plotW / 2} y={height - 6} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
            {xLabel}
          </text>
        ) : null}
        {categories.map((category, i) => {
          const v = estimates[i];
          const iv = intervals?.[i] ?? null;
          const cy = padding.top + rowH * i + rowH / 2;
          const significant = iv ? (baseline === undefined ? true : iv.low > baseline || iv.high < baseline) : true;
          const color = significant ? COLOR.ember : COLOR.gray;
          return (
            <g
              key={category}
              tabIndex={0}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              aria-label={`${category}: ${format(v, decimals, signed)}${iv ? `, interval ${format(iv.low, decimals, signed)} to ${format(iv.high, decimals, signed)}` : ''}`}
              className="outline-none"
            >
              <rect x={0} y={padding.top + rowH * i} width={width} height={rowH} fill="transparent" />
              <text x={padding.left - 10} y={cy + 4} textAnchor="end" fontSize={12} fill="var(--viz-ink)">
                {category}
              </text>
              {iv ? <line x1={sx(iv.low)} x2={sx(iv.high)} y1={cy} y2={cy} stroke={color} strokeWidth={2} strokeLinecap="round" /> : null}
              {v !== null && v !== undefined ? <circle cx={sx(v)} cy={cy} r={5} fill={color} stroke="var(--viz-surface)" strokeWidth={2} /> : null}
            </g>
          );
        })}
      </svg>
      {active !== null ? (
        <Tooltip x={sx(estimates[active] ?? lo)} y={padding.top + rowH * active + 4}>
          <strong className="font-semibold tabular-nums">{format(estimates[active], decimals, signed)}</strong>
          <span className="text-fd-muted-foreground"> {categories[active]}</span>
          {intervals?.[active] ? (
            <div className="mt-0.5 text-fd-muted-foreground">
              95% interval {format(intervals[active]!.low, decimals, signed)} to {format(intervals[active]!.high, decimals, signed)}
            </div>
          ) : null}
        </Tooltip>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Scatter: labelled points, emphasis in the accent, the rest de-emphasised.  */
/* ------------------------------------------------------------------------- */

function Scatter({
  width,
  points,
  min,
  max,
  decimals,
  xLabel,
  yLabel,
}: Required<Pick<ResultChartProps, 'points' | 'decimals'>> & Pick<ResultChartProps, 'min' | 'max' | 'xLabel' | 'yLabel'> & { width: number }) {
  const height = 320;
  const padding = { top: 18, right: 24, bottom: xLabel ? 46 : 30, left: yLabel ? 62 : 44 };
  const plotW = Math.max(120, width - padding.left - padding.right);
  const plotH = height - padding.top - padding.bottom;
  const [xLo, xHi] = domainOf(points.map((p) => p.x), undefined, undefined, 0.12);
  const [yLo, yHi] = domainOf(points.map((p) => p.y), min, max, 0.12);
  const xTicks = niceTicks(xLo, xHi, 4);
  const yTicks = niceTicks(yLo, yHi, 4);
  const sx = (x: number) => padding.left + ((x - xLo) / (xHi - xLo || 1)) * plotW;
  const sy = (y: number) => padding.top + (1 - (y - yLo) / (yHi - yLo || 1)) * plotH;
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="relative">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Scatter plot; the table below carries the same values" className="block max-w-full">
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={padding.left} x2={padding.left + plotW} y1={sy(t)} y2={sy(t)} stroke="var(--viz-grid)" strokeWidth={1} />
            <text x={padding.left - 8} y={sy(t) + 4} textAnchor="end" fontSize={11} fill="var(--viz-muted)">
              {format(t, decimals, false)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <g key={`x${t}`}>
            <line x1={sx(t)} x2={sx(t)} y1={padding.top} y2={padding.top + plotH} stroke="var(--viz-grid)" strokeWidth={1} />
            <text x={sx(t)} y={padding.top + plotH + 16} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
              {format(t, decimals, false)}
            </text>
          </g>
        ))}
        {xLabel ? (
          <text x={padding.left + plotW / 2} y={height - 8} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
            {xLabel}
          </text>
        ) : null}
        {yLabel ? (
          <text transform={`translate(12 ${padding.top + plotH / 2}) rotate(-90)`} textAnchor="middle" fontSize={11} fill="var(--viz-muted)">
            {yLabel}
          </text>
        ) : null}
        {points.map((p, i) => {
          const color = p.color ? COLOR[p.color] : p.emphasis ? COLOR.ember : COLOR.gray;
          const anchor = p.anchor ?? 'start';
          return (
            <g
              key={p.label}
              tabIndex={0}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onPointerEnter={() => setActive(i)}
              onPointerLeave={() => setActive(null)}
              aria-label={`${p.label}: x ${format(p.x, decimals, false)}, y ${format(p.y, decimals, false)}`}
              className="outline-none"
            >
              <circle cx={sx(p.x)} cy={sy(p.y)} r={14} fill="transparent" />
              <circle cx={sx(p.x)} cy={sy(p.y)} r={5.5} fill={color} stroke="var(--viz-surface)" strokeWidth={2} />
              <text
                x={sx(p.x) + (anchor === 'start' ? 10 : -10)}
                y={sy(p.y) + 4}
                textAnchor={anchor}
                fontSize={11.5}
                fontWeight={p.emphasis ? 600 : 400}
                fill="var(--viz-ink)"
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
      {active !== null ? (
        <Tooltip x={sx(points[active].x)} y={sy(points[active].y) - 10}>
          <div className="font-semibold">{points[active].label}</div>
          <div className="text-fd-muted-foreground">
            {xLabel ?? 'x'} <strong className="font-semibold text-fd-popover-foreground">{format(points[active].x, decimals, false)}</strong>
          </div>
          <div className="text-fd-muted-foreground">
            {yLabel ?? 'y'} <strong className="font-semibold text-fd-popover-foreground">{format(points[active].y, decimals, false)}</strong>
          </div>
        </Tooltip>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------------- */

function TableView({ categories, series, points, intervals, decimals, signed, xLabel, yLabel }: Pick<ResultChartProps, 'categories' | 'series' | 'points' | 'intervals' | 'xLabel' | 'yLabel'> & { decimals: number; signed: boolean }) {
  if (points) {
    return (
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="border-b border-fd-border text-fd-muted-foreground">
            <th className="py-1.5 pr-3 font-medium">Point</th>
            <th className="py-1.5 pr-3 font-medium">{xLabel ?? 'x'}</th>
            <th className="py-1.5 font-medium">{yLabel ?? 'y'}</th>
          </tr>
        </thead>
        <tbody>
          {points.map((p) => (
            <tr key={p.label} className="border-b border-fd-border/60">
              <td className="py-1.5 pr-3">{p.label}</td>
              <td className="py-1.5 pr-3 tabular-nums">{format(p.x, decimals, false)}</td>
              <td className="py-1.5 tabular-nums">{format(p.y, decimals, false)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  if (!categories || !series) return null;
  return (
    <table className="w-full text-left text-xs">
      <thead>
        <tr className="border-b border-fd-border text-fd-muted-foreground">
          <th className="py-1.5 pr-3 font-medium">Category</th>
          {series.map((s) => (
            <th key={s.name} className="py-1.5 pr-3 font-medium">
              {s.name}
            </th>
          ))}
          {intervals ? <th className="py-1.5 font-medium">95% interval</th> : null}
        </tr>
      </thead>
      <tbody>
        {categories.map((c, i) => (
          <tr key={c} className="border-b border-fd-border/60">
            <td className="py-1.5 pr-3">{c}</td>
            {series.map((s) => (
              <td key={s.name} className="py-1.5 pr-3 tabular-nums">
                {format(s.values[i], decimals, signed)}
              </td>
            ))}
            {intervals ? (
              <td className="py-1.5 tabular-nums">
                {intervals[i] ? `${format(intervals[i]!.low, decimals, signed)} to ${format(intervals[i]!.high, decimals, signed)}` : ''}
              </td>
            ) : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ResultChart(props: ResultChartProps) {
  const { title, subtitle, kind, caption, source, className } = props;
  const decimals = props.decimals ?? 3;
  const signed = props.signed ?? false;
  const { ref, width } = useContainerWidth();
  const id = useId();

  let body: ReactNode = null;
  if (kind === 'bars' && props.categories && props.series) {
    body = <Bars categories={props.categories} series={props.series} emphasis={props.emphasis} min={props.min} max={props.max} ticks={props.ticks} decimals={decimals} signed={signed} />;
  } else if (kind === 'lines' && props.categories && props.series) {
    body = (
      <Lines
        width={width}
        categories={props.categories}
        xValues={props.xValues}
        series={props.series}
        emphasis={props.emphasis}
        min={props.min}
        max={props.max}
        ticks={props.ticks}
        decimals={decimals}
        signed={signed}
        xLabel={props.xLabel}
        yLabel={props.yLabel}
      />
    );
  } else if (kind === 'dots' && props.categories && props.series) {
    body = (
      <Dots
        width={width}
        categories={props.categories}
        series={props.series}
        intervals={props.intervals}
        min={props.min}
        max={props.max}
        ticks={props.ticks}
        decimals={decimals}
        signed={signed}
        baseline={props.baseline}
        xLabel={props.xLabel}
      />
    );
  } else if (kind === 'scatter' && props.points) {
    body = <Scatter width={width} points={props.points} min={props.min} max={props.max} decimals={decimals} xLabel={props.xLabel} yLabel={props.yLabel} />;
  }

  return (
    <figure
      data-result-chart
      aria-labelledby={`${id}-title`}
      className={cn('not-prose my-8 rounded-[22px] border border-fd-border bg-fd-card p-4 shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:p-6', className)}
    >
      <figcaption className="mb-4">
        <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ember-deep">Measured result</p>
        <h3 id={`${id}-title`} className="mb-0 mt-1 text-base font-semibold tracking-tight text-fd-foreground sm:text-lg">
          {title}
        </h3>
        {subtitle ? <p className="mb-0 mt-1 text-sm leading-6 text-fd-muted-foreground">{subtitle}</p> : null}
      </figcaption>
      <div ref={ref} className="w-full">
        {body}
      </div>
      {caption ? <p className="mt-4 text-sm leading-6 text-fd-muted-foreground">{caption}</p> : null}
      <details className="mt-3 text-xs">
        <summary className="cursor-pointer text-fd-muted-foreground hover:text-fd-foreground">Table view</summary>
        <div className="mt-2 overflow-x-auto">
          <TableView
            categories={props.categories}
            series={props.series}
            points={props.points}
            intervals={props.intervals}
            decimals={decimals}
            signed={signed}
            xLabel={props.xLabel}
            yLabel={props.yLabel}
          />
        </div>
      </details>
      <p className="mt-3 text-[11px] leading-5 text-fd-muted-foreground">Source: {source}</p>
    </figure>
  );
}

/* ------------------------------------------------------------------------- */
/* Stat tiles: the headline numbers, in the sans, with a label and a note.    */
/* ------------------------------------------------------------------------- */

export interface StatTileItem {
  value: string;
  label: string;
  note?: string;
  tone?: 'neutral' | 'good' | 'bad';
}

export function StatTiles({ items, columns = 4, className }: { items: StatTileItem[]; columns?: 2 | 3 | 4; className?: string }) {
  const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' }[columns];
  return (
    <div className={cn('not-prose my-6 grid gap-4', cols, className)}>
      {items.map((item) => (
        <div key={item.label} className="card-soft p-5">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-fd-muted-foreground">{item.label}</p>
          <p
            className={cn(
              'm-0 mt-2 font-sans text-[28px] font-semibold leading-none tracking-tight',
              item.tone === 'good' && 'text-leaf',
              item.tone === 'bad' && 'text-ember-deep',
              (!item.tone || item.tone === 'neutral') && 'text-fd-foreground',
            )}
          >
            {item.value}
          </p>
          {item.note ? <p className="m-0 mt-2.5 text-[13px] leading-[1.55] text-fd-muted-foreground">{item.note}</p> : null}
        </div>
      ))}
    </div>
  );
}
