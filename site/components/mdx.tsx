import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  ComparisonFigure,
  EvidenceBadge,
  GlossaryTerm,
  GuideFigure,
  PrincipleCard,
  WallChart,
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
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
