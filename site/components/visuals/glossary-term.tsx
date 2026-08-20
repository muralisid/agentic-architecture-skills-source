import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface GlossaryTermProps {
  term: string;
  definition: string;
  children?: ReactNode;
  className?: string;
}

/** Keyboard-focusable inline definition with a CSS-only visible tooltip. */
export function GlossaryTerm({ term, definition, children, className }: GlossaryTermProps) {
  return (
    <span className={cn('group/glossary relative inline-flex', className)}>
      <dfn
        tabIndex={0}
        aria-label={`${term}: ${definition}`}
        className="cursor-help rounded-sm not-italic underline decoration-dotted decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
      >
        {children ?? term}
      </dfn>
      <span
        role="tooltip"
        aria-hidden="true"
        className="invisible absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 w-64 -translate-x-1/2 rounded-lg border bg-fd-popover px-3 py-2 text-left text-xs font-normal leading-5 text-fd-popover-foreground opacity-0 shadow-lg motion-safe:transition-opacity group-hover/glossary:visible group-hover/glossary:opacity-100 group-focus-within/glossary:visible group-focus-within/glossary:opacity-100"
      >
        <strong className="font-semibold">{term}.</strong> {definition}
      </span>
    </span>
  );
}
