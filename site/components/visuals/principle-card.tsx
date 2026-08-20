import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { VisualNodeKind } from '@/lib/figure-manifest';

const principleClasses: Record<VisualNodeKind, string> = {
  human: 'border-amber-500/40 bg-amber-500/10',
  agent: 'border-violet-500/40 bg-violet-500/10',
  system: 'border-blue-500/40 bg-blue-500/10',
  control: 'border-slate-500/45 bg-slate-500/10',
  evidence: 'border-teal-500/40 bg-teal-500/10',
  risk: 'border-rose-500/40 bg-rose-500/10',
  neutral: 'border-fd-border bg-fd-card',
};

export interface PrincipleCardProps {
  title: string;
  children: ReactNode;
  eyebrow?: string;
  kind?: VisualNodeKind;
  className?: string;
}

export function PrincipleCard({ title, children, eyebrow = 'Design principle', kind = 'neutral', className }: PrincipleCardProps) {
  return (
    <aside className={cn('not-prose my-5 rounded-xl border-l-4 p-4 sm:p-5', principleClasses[kind], className)}>
      <p className="m-0 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-fd-muted-foreground">{eyebrow}</p>
      <h3 className="mb-0 mt-1 text-base font-semibold tracking-tight">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-fd-muted-foreground">{children}</div>
    </aside>
  );
}
