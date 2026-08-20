import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  ComparisonFigure,
  EvidenceBadge,
  GlossaryTerm,
  GuideFigure,
  PrincipleCard,
  WallChart,
  ZoomableDiagram,
} from '@/components/visuals';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ComparisonFigure,
    EvidenceBadge,
    GlossaryTerm,
    GuideFigure,
    PrincipleCard,
    WallChart,
    ZoomableDiagram,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
