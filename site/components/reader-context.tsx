import Link from 'next/link';
import type { ReactElement } from 'react';
import { ArrowRight, CheckCircle2, Clock3, Compass, ShieldCheck, Users } from 'lucide-react';

export interface ReaderContextProps {
  audience?: string[];
  decisionOrOutput?: string;
  prerequisites?: string[];
  readingTime?: string;
  evidenceStatus?: string;
  next?: string;
}

export function ReaderContext({
  audience,
  decisionOrOutput,
  prerequisites,
  readingTime,
  evidenceStatus,
  next,
}: ReaderContextProps) {
  if (!audience?.length && !decisionOrOutput && !prerequisites?.length && !readingTime && !evidenceStatus && !next) {
    return null;
  }

  return (
    <aside className="not-prose my-6 rounded-2xl border bg-fd-card/55 p-4 sm:p-5" aria-label="How to use this page">
      <div className="grid gap-4 sm:grid-cols-2">
        {audience?.length ? <MetaItem icon={<Users className="size-4" aria-hidden />} label="For" value={audience.join(' · ')} /> : null}
        {readingTime ? <MetaItem icon={<Clock3 className="size-4" aria-hidden />} label="Reading time" value={readingTime} /> : null}
        {decisionOrOutput ? <MetaItem icon={<Compass className="size-4" aria-hidden />} label="You will leave with" value={decisionOrOutput} /> : null}
        {evidenceStatus ? <MetaItem icon={<ShieldCheck className="size-4" aria-hidden />} label="Evidence status" value={evidenceStatus} /> : null}
      </div>
      {prerequisites?.length ? (
        <div className="mt-4 border-t pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fd-muted-foreground">Read first</p>
          <ul className="mt-2 space-y-1 text-sm">
            {prerequisites.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-fd-primary" aria-hidden />
                {item.startsWith('/') ? (
                  <Link
                    href={item}
                    className="font-medium text-fd-primary underline decoration-fd-border underline-offset-4 hover:text-fd-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring"
                  >
                    {labelForPath(item)}
                  </Link>
                ) : <span>{item}</span>}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {next ? (
        <Link href={next} className="mt-4 inline-flex items-center gap-2 border-t pt-4 text-sm font-medium text-fd-primary">
          Continue to {labelForPath(next)} <ArrowRight className="size-4" aria-hidden />
        </Link>
      ) : null}
    </aside>
  );
}

function labelForPath(value: string) {
  const segment = value.split('/').filter(Boolean).at(-1) ?? value;
  return segment
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function MetaItem({ icon, label, value }: { icon: ReactElement<{ className?: string; 'aria-hidden'?: boolean }>; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 text-fd-primary">{icon}</span>
      <div><p className="text-xs font-semibold uppercase tracking-[0.12em] text-fd-muted-foreground">{label}</p><p className="mt-1 text-sm leading-6">{value}</p></div>
    </div>
  );
}
