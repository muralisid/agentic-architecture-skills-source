import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import { H2WithIcon, H3WithIcon } from '@/components/mdx/heading-icon';
import { ResponsiveTable } from '@/components/mdx/responsive-table';
import { Glossary, PlainTerms, Term } from '@/components/mdx/term';
import { I, IconChip } from '@/components/mdx/icons';
import { SkillsCatalog, SkillsStrip } from '@/components/skills/skills-catalog';
import { CopyLine } from '@/components/skills/copy-line';
import {
  ComparisonFigure,
  EvidenceBadge,
  GlossaryTerm,
  GuideFigure,
  PrincipleCard,
  ResultChart,
  Slide,
  SlideJourney,
  StatTiles,
  TeachingIllustration,
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
    CopyLine,
    PrincipleCard,
    ResultChart,
    SkillsCatalog,
    SkillsStrip,
    Slide,
    SlideJourney,
    StatTiles,
    TeachingIllustration,
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
