import type { ReactNode } from 'react';
import { GlossaryTerm } from '@/components/visuals/glossary-term';
import { IconChip, type ArticleIconName } from '@/components/mdx/icons';
import { findTerm, GLOSSARY, GLOSSARY_GROUPS, type GlossaryGroup } from '@/lib/glossary';

/** Inline glossary reference: `<Term k="gateway">gateways</Term>`. Unknown keys render their text unchanged. */
export function Term({ k, children }: { k: string; children?: ReactNode }) {
  const entry = findTerm(k);
  if (!entry) return <>{children ?? k}</>;
  return (
    <GlossaryTerm term={entry.term} definition={entry.plain}>
      {children ?? k}
    </GlossaryTerm>
  );
}

/** Page opener written for any reader: what this is, why it matters, what to remember. */
export function PlainTerms({ children, title = 'In plain terms' }: { children: ReactNode; title?: string }) {
  return (
    <aside data-plain-terms className="not-prose my-6 rounded-2xl border border-fd-primary/20 bg-fd-primary/5 p-5 sm:p-6">
      <p className="m-0 flex items-center text-[0.75rem] font-semibold uppercase tracking-wide text-fd-primary">
        <IconChip name="message" className="text-base" />
        {title}
      </p>
      <div className="mt-3 space-y-3 text-[0.98rem] leading-7 text-fd-foreground [&_p]:m-0 [&_strong]:font-semibold">{children}</div>
    </aside>
  );
}

const GROUP_ICONS: Record<GlossaryGroup, ArticleIconName> = {
  'Agents and autonomy': 'bot',
  'Control and security': 'shield',
  'Data and knowledge': 'database',
  'Learning and quality': 'refresh',
  'Running it day to day': 'activity',
  'Standards and regulation': 'landmark',
};

/** The full plain-words glossary, grouped, rendered from the single registry. */
export function Glossary() {
  return (
    <div className="not-prose space-y-10">
      {GLOSSARY_GROUPS.map((group) => {
        const entries = GLOSSARY.filter((entry) => entry.group === group).sort((a, b) => a.term.localeCompare(b.term));
        const id = group.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return (
          <section key={group} id={id}>
            <h2 className="flex scroll-m-28 items-center text-xl font-semibold">
              <IconChip name={GROUP_ICONS[group]} />
              {group}
            </h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {entries.map((entry) => (
                <div key={entry.key} id={`term-${entry.key.replace(/[^a-z0-9]+/g, '-')}`} className="rounded-xl border bg-fd-card p-4">
                  <dt className="font-semibold">{entry.term}</dt>
                  <dd className="mt-1.5 text-sm leading-6 text-fd-muted-foreground">{entry.plain}</dd>
                </div>
              ))}
            </dl>
          </section>
        );
      })}
    </div>
  );
}
