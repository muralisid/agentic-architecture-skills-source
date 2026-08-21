import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface GlossaryTermProps {
  term: string;
  definition: string;
  children?: ReactNode;
  className?: string;
}

/**
 * Keyboard-focusable inline definition. On small screens the definition opens
 * as a fixed bottom sheet so it can never widen the page; from the sm
 * breakpoint it floats above the term, left-aligned so it stays in the column.
 */
export function GlossaryTerm({ term, definition, children, className }: GlossaryTermProps) {
  return (
    <span className={cn('group/glossary relative inline', className)}>
      <dfn
        tabIndex={0}
        aria-label={`${term}: ${definition}`}
        className="cursor-help rounded-sm not-italic underline decoration-fd-primary/50 decoration-dotted decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
      >
        {children ?? term}
      </dfn>
      <span
        role="tooltip"
        aria-hidden="true"
        className="invisible fixed inset-x-3 bottom-3 z-40 rounded-xl border bg-fd-popover px-4 py-3 text-left text-sm font-normal leading-6 text-fd-popover-foreground opacity-0 shadow-lg motion-safe:transition-opacity group-hover/glossary:visible group-hover/glossary:opacity-100 group-focus-within/glossary:visible group-focus-within/glossary:opacity-100 sm:absolute sm:inset-x-auto sm:bottom-[calc(100%+0.5rem)] sm:left-0 sm:w-[min(20rem,calc(100vw-2rem))] sm:rounded-lg sm:px-3 sm:py-2 sm:text-xs sm:leading-5"
      >
        <strong className="font-semibold">{term}.</strong> {definition}
      </span>
    </span>
  );
}
