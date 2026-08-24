import { author } from '@/lib/shared';
import { cn } from '@/lib/cn';

/** The LinkedIn mark, inline: the icon set no longer ships brand icons. */
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

/** Formats an ISO date the way the pages read: 23 August 2026. */
export function readableDate(value?: string) {
  if (!value) return undefined;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return undefined;
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    date,
  );
}

/**
 * The byline every page carries.
 *
 * Visible attribution matters for the same reason the structured data does: a
 * reader, a crawler and a model should all find the same answer to "who wrote
 * this", in the same place, on every page.
 */
export function Byline({
  datePublished,
  dateModified,
  className,
}: {
  datePublished?: string;
  dateModified?: string;
  className?: string;
}) {
  const published = readableDate(datePublished);
  const modified = readableDate(dateModified);
  const showModified = modified && modified !== published;

  return (
    <div className={cn('not-prose flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-fd-muted-foreground', className)}>
      <span>
        By{' '}
        <a
          href={author.linkedin}
          rel="author noopener"
          target="_blank"
          className="font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 hover:decoration-ember"
        >
          {author.name}
        </a>
      </span>
      <a
        href={author.linkedin}
        rel="me noopener"
        target="_blank"
        aria-label={`${author.name} on LinkedIn`}
        className="inline-flex items-center gap-1 text-fd-muted-foreground transition-colors hover:text-ember-ink"
      >
        <LinkedInMark className="size-3.5" />
        <span className="text-xs">LinkedIn</span>
      </a>
      {published ? (
        <span className="text-xs">
          Published <time dateTime={datePublished}>{published}</time>
        </span>
      ) : null}
      {showModified ? (
        <span className="text-xs">
          Updated <time dateTime={dateModified}>{modified}</time>
        </span>
      ) : null}
    </div>
  );
}
