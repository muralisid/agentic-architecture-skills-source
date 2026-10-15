import Link from 'next/link';
import { findConcept } from '@/lib/concepts';

/**
 * The concept pages this page relies on, one click away. Rendered from the
 * page's `concepts` frontmatter; unknown keys are skipped and the current
 * page is left out.
 */
export function RelatedConcepts({ keys, current, className }: { keys?: string[]; current: string; className?: string }) {
  const concepts = (keys ?? []).map(findConcept).filter((c): c is NonNullable<typeof c> => Boolean(c) && c!.href !== current);
  if (concepts.length === 0) return null;
  return (
    <nav aria-label="Related concepts" className={className}>
      <p className="m-0 text-[0.75rem] font-semibold uppercase tracking-wide text-fd-muted-foreground">Related concepts</p>
      <ul className="m-0 mt-2 flex list-none flex-wrap gap-2 p-0">
        {concepts.map((concept) => (
          <li key={concept.key} className="m-0">
            <Link href={concept.href} className="inline-block rounded-full border border-fd-border bg-fd-card px-3 py-1 text-sm font-medium no-underline hover:border-ember hover:text-ember-deep">
              {concept.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
