import Link from 'next/link';
import type { ReactNode } from 'react';
import { appShortName } from '@/lib/shared';

const links = [
  { href: '/tools/readiness', label: 'Readiness' },
  { href: '/tools/portfolio', label: 'Use-case portfolio' },
  { href: '/tools/roadmap', label: 'Roadmap' },
];

export default function ToolsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-fd-background text-fd-foreground">
      <header className="border-b print:hidden">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link href="/" className="font-semibold tracking-tight">
            {appShortName}
          </Link>
          <nav aria-label="Worksheet navigation">
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li>
                <Link href="/tools" className="text-fd-muted-foreground hover:text-fd-foreground">
                  Tools
                </Link>
              </li>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-fd-muted-foreground hover:text-fd-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/docs" className="text-fd-muted-foreground hover:text-fd-foreground">
                  Guide
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
