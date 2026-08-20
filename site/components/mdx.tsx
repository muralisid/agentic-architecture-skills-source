import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  ComparisonFigure,
  EvidenceBadge,
  GlossaryTerm,
  GuideFigure,
  PrincipleCard,
  ZoomableDiagram,
} from '@/components/visuals';
import { PortfolioWorksheet, ReadinessWorksheet, RoadmapWorksheet } from '@/components/worksheets';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComparisonFigure,
    EvidenceBadge,
    GlossaryTerm,
    GuideFigure,
    PrincipleCard,
    ZoomableDiagram,
    PortfolioWorksheet,
    ReadinessWorksheet,
    RoadmapWorksheet,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
