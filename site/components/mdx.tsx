import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import { H2WithIcon, H3WithIcon } from '@/components/mdx/heading-icon';
import { ResponsiveTable } from '@/components/mdx/responsive-table';
import { Glossary, PlainTerms, Term } from '@/components/mdx/term';
import { I, IconChip } from '@/components/mdx/icons';
import {
  ComparisonFigure,
  EvidenceBadge,
  GlossaryTerm,
  GuideFigure,
  PrincipleCard,
  ResultChart,
  StatTiles,
  WallChart,
} from '@/components/visuals';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    h2: H2WithIcon,
    h3: H3WithIcon,
    table: ResponsiveTable,
    ComparisonFigure,
    EvidenceBadge,
    GlossaryTerm,
    Glossary,
    GuideFigure,
    I,
    IconChip,
    PlainTerms,
    PrincipleCard,
    ResultChart,
    StatTiles,
    Step,
    Steps,
    Term,
    WallChart,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
