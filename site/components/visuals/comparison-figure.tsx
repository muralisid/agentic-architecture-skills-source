import { getFigure } from '@/lib/figure-manifest';
import { GuideFigure, type GuideFigureProps } from './guide-figure';

export type ComparisonFigureProps = Omit<GuideFigureProps, 'zoomable'>;

/** Renders a manifest figure and guards accidental use with non-comparison data. */
export function ComparisonFigure(props: ComparisonFigureProps) {
  const figure = getFigure(props.id);
  if (!figure.data.columns?.length) {
    throw new Error(`ComparisonFigure requires column data; "${props.id}" has type "${figure.type}".`);
  }
  return <GuideFigure {...props} zoomable={false} />;
}
