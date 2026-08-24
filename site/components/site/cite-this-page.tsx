import { appName, author, citation, siteUrl } from '@/lib/shared';
import { readableDate } from './byline';
import { CopyLine } from '@/components/skills/copy-line';

/**
 * A citation, ready to copy.
 *
 * The point is not tidiness. A page that states its own author, title, date and
 * canonical URL in one block gives a person writing a paper, and a model asked
 * where a claim came from, the same unambiguous answer, instead of leaving both
 * to assemble one from the layout.
 */
export function CiteThisPage({
  title,
  path,
  dateModified,
}: {
  title: string;
  path: string;
  dateModified?: string;
}) {
  const url = `${siteUrl}${path}`;
  const year = dateModified?.slice(0, 4) ?? new Date().getUTCFullYear().toString();
  const accessed = readableDate(dateModified);
  const line = `${author.name} (${year}). ${title}. ${appName}. ${url}`;

  return (
    <section
      aria-labelledby="cite-this-page"
      className="not-prose mt-12 rounded-2xl border border-fd-border bg-fd-card/60 p-5 sm:p-6"
    >
      <h2 id="cite-this-page" className="m-0 text-sm font-semibold tracking-tight text-fd-foreground">
        Cite this page
      </h2>
      <p className="mt-1.5 mb-0 text-[13px] leading-6 text-fd-muted-foreground">
        Written by{' '}
        <a
          href={author.linkedin}
          rel="author noopener"
          target="_blank"
          className="font-medium text-fd-foreground underline decoration-fd-border underline-offset-4 hover:decoration-ember"
        >
          {author.name}
        </a>
        , {author.jobTitle}
        {accessed ? <>, last updated {accessed}</> : null}. Licensed {citation.license}, so quote it freely with
        attribution.
      </p>
      <div className="mt-3">
        <CopyLine command={line} prompt={false} className="font-sans text-[12.5px]" />
      </div>
      <p className="mt-3 mb-0 text-[12px] text-fd-muted-foreground">
        Machine-readable version of this page:{' '}
        <a href={`${path}.md`} className="underline decoration-fd-border underline-offset-4 hover:text-fd-foreground">
          {path}.md
        </a>
      </p>
    </section>
  );
}
