import { GuideFigure, type GuideFigureProps } from './guide-figure';

export type ZoomableDiagramProps = Omit<GuideFigureProps, 'zoomable'>;

/** A convenience entry point for pages that want to require the large-view disclosure. */
export function ZoomableDiagram(props: ZoomableDiagramProps) {
  return <GuideFigure {...props} zoomable />;
}
