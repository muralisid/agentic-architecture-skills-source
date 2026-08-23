import Link from 'next/link';
import { BookMarked, ArrowUpRight } from 'lucide-react';
import { appName, repoUrl, sourceRepositoryPublic } from '@/lib/shared';
import { Wordmark } from './wordmark';
import { cn } from '@/lib/cn';

const LINK_GROUPS: { category: string; links: { name: string; href: string }[] }[] = [
  {
    category: 'The guide',
    links: [
      { name: 'Architecture', href: '/architecture' },
      { name: 'The fourteen layers', href: '/layers' },
      { name: 'Decisions', href: '/decisions' },
      { name: 'Research', href: '/patterns' },
      { name: 'Plain words', href: '/architecture/plain-words' },
    ],
  },
  {
    category: 'Research',
    links: [
      { name: 'The experiments', href: '/patterns' },
      { name: 'Recommended approach', href: '/patterns' },
      { name: 'Method and reversals', href: '/patterns/how-to-test-a-context-design' },
      { name: 'Reading list', href: '/patterns/reading-list' },
    ],
  },
  {
    category: 'Library',
    links: [
      { name: 'Research library', href: '/library' },
      { name: 'Techniques', href: '/library/techniques' },
      { name: 'Frameworks', href: '/library/frameworks' },
      { name: 'Blueprints', href: '/library/blueprints' },
      { name: 'Vendor research', href: '/library/vendors' },
    ],
  },
  {
    category: 'About',
    links: [
      { name: 'Decision log', href: '/library/decisions' },
      { name: 'Re-verification list', href: '/library/re-verification' },
      { name: 'Changelog', href: '/library/changelog' },
      { name: 'Contributing', href: '/library/contributing' },
    ],
  },
];

/** The site footer: brand column, link groups, an evidence banner, and the licence line. */
export function SiteFooter({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <footer className={cn('relative z-10 w-full border-t border-fd-border bg-fd-background', className)}>
      <div className={cn('mx-auto w-full max-w-6xl px-6 md:px-8', compact ? 'py-12' : 'py-16 md:py-20')}>
        {!compact && (
          <div className="mb-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-8">
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <Link href="/" className="inline-flex">
                <Wordmark size="large" />
              </Link>
              <p className="mt-4 max-w-sm text-[14px] leading-[1.7] text-fd-muted-foreground">
                An open, vendor-neutral reference for the architecture of the agentic enterprise: the components, the
                control points, the contested choices, and the evidence behind each.
              </p>
            </div>
            {LINK_GROUPS.map((group, index) => (
              <div key={group.category} className={index === 0 ? 'lg:pl-8' : ''}>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-fd-foreground">{group.category}</h4>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[14px] text-fd-muted-foreground transition-colors hover:text-fd-foreground">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!compact && (
          <div className="card-soft mb-10 p-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ember-soft dark:bg-fd-accent">
                  <BookMarked className="size-5 text-ember" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-fd-foreground">Every claim carries a dated source</p>
                  <p className="text-[13px] text-fd-muted-foreground">
                    Vendor numbers are labelled, positions are labelled, and the negative results are published too.
                  </p>
                </div>
              </div>
              <Link
                href="/library"
                className="group inline-flex items-center gap-2 rounded-full bg-ember-soft px-5 py-2.5 text-[13px] font-semibold text-ember-ink transition-colors hover:bg-ember-wash dark:bg-fd-accent dark:text-fd-accent-foreground"
              >
                Open the research library
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        )}

        <div className={cn('flex flex-col items-center justify-between gap-3 md:flex-row', !compact && 'border-t border-fd-border pt-8')}>
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-[13px] text-fd-muted-foreground">{appName}</p>
            <p className="text-[11px] text-fd-muted-foreground/80">
              Maintained by{' '}
              <a href="https://github.com/muralisidfn7" className="underline decoration-fd-border underline-offset-2 hover:text-fd-foreground">
                Murali Sid
              </a>
              . Content CC BY-SA 4.0, code MIT.
            </p>
          </div>
          <div className="flex items-center gap-5 text-[13px] text-fd-muted-foreground">
            <Link href="/architecture/concern-matrix" className="transition-colors hover:text-fd-foreground">
              Concern matrix
            </Link>
            <Link href="/library/glossary" className="transition-colors hover:text-fd-foreground">
              Glossary
            </Link>
            {sourceRepositoryPublic ? (
              <a href={repoUrl} className="transition-colors hover:text-fd-foreground">
                Repository
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
