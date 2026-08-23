'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ComponentProps } from 'react';
import { useHomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight, Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/layout.shared';
import { Wordmark } from './wordmark';
import { cn } from '@/lib/cn';

/**
 * The landing page header: a floating pill with the wordmark, the section links,
 * search, the theme switch and one call to action. Registered as the home
 * layout's `slots.header`, so Fumadocs still owns search and theming.
 */
export function SiteHeader(props: ComponentProps<'header'>) {
  const { slots } = useHomeLayout();
  const pathname = usePathname() ?? '';
  const [open, setOpen] = useState(false);

  const SearchFull = slots.searchTrigger ? slots.searchTrigger.full : null;
  const SearchSmall = slots.searchTrigger ? slots.searchTrigger.sm : null;
  const ThemeSwitch = slots.themeSwitch ? slots.themeSwitch : null;

  return (
    <header {...props} id="nd-nav" className={cn('sticky top-0 z-40 px-3 pt-3 sm:px-6', props.className)}>
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 rounded-full border border-fd-border bg-fd-card/90 px-4 shadow-[0_8px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:px-5">
        <Link href="/" className="shrink-0" aria-label="Home">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Sections">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.url || pathname.startsWith(`${link.url}/`);
            return (
              <Link
                key={link.url}
                href={link.url}
                className={cn(
                  'relative text-sm font-medium whitespace-nowrap transition-colors',
                  active ? 'text-ember-deep' : 'text-fd-muted-foreground hover:text-fd-foreground',
                )}
              >
                {link.text}
                {active && <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-ember" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {SearchFull ? (
            <SearchFull hideIfDisabled className="hidden w-full max-w-[220px] rounded-full ps-2.5 lg:inline-flex" />
          ) : null}
          {SearchSmall ? <SearchSmall hideIfDisabled className="p-2 lg:hidden" /> : null}
          {ThemeSwitch ? (
            <span className="inline-flex shrink-0">
              <ThemeSwitch />
            </span>
          ) : null}
          <Link
            href="/architecture"
            className="hidden items-center gap-1.5 rounded-full bg-ember px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-md shadow-ember/20 transition-colors hover:bg-ember-deep md:inline-flex"
          >
            Start with the architecture
            <ArrowRight className="size-3.5" />
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-9 items-center justify-center rounded-full text-fd-foreground transition-colors hover:bg-fd-accent lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="mx-auto mt-2 w-full max-w-6xl rounded-3xl border border-fd-border bg-fd-card p-3 shadow-lg lg:hidden">
          <nav className="flex flex-col" aria-label="Sections">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-fd-foreground transition-colors hover:bg-fd-accent"
              >
                {link.text}
              </Link>
            ))}
          </nav>
          <Link
            href="/architecture"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center gap-1.5 rounded-full bg-ember px-4 py-2.5 text-sm font-semibold text-white md:hidden"
          >
            Start with the architecture
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
