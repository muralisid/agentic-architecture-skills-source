import type { EvidenceStatus } from '@/lib/figure-manifest';
import { cn } from '@/lib/cn';

const evidenceLabels: Record<EvidenceStatus, string> = {
  'conceptual-guide': 'Guide model',
  'primary-source': 'Primary source',
  'independently-measured': 'Independently measured',
  'vendor-reported': 'Vendor reported',
  'preprint-or-prototype': 'Preprint or prototype',
  'author-position': 'Author position',
  'no-published-precedent': 'Open evidence gap',
  'mixed-evidence': 'Mixed evidence',
};

const evidenceClasses: Record<EvidenceStatus, string> = {
  'conceptual-guide': 'border-sky-500/35 bg-sky-500/10 text-sky-800 dark:text-sky-200',
  'primary-source': 'border-emerald-500/35 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200',
  'independently-measured': 'border-teal-500/35 bg-teal-500/10 text-teal-800 dark:text-teal-200',
  'vendor-reported': 'border-blue-500/35 bg-blue-500/10 text-blue-800 dark:text-blue-200',
  'preprint-or-prototype': 'border-violet-500/35 bg-violet-500/10 text-violet-800 dark:text-violet-200',
  'author-position': 'border-amber-500/40 bg-amber-500/10 text-amber-900 dark:text-amber-200',
  'no-published-precedent': 'border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-200',
  'mixed-evidence': 'border-slate-500/40 bg-slate-500/10 text-slate-800 dark:text-slate-200',
};

export interface EvidenceBadgeProps {
  status: EvidenceStatus;
  className?: string;
  compact?: boolean;
}

export function EvidenceBadge({ status, className, compact = false }: EvidenceBadgeProps) {
  return (
    <span
      data-evidence-status={status}
      className={cn(
        'inline-flex w-fit items-center rounded-full border font-medium leading-none',
        compact ? 'px-2 py-1 text-[0.6875rem]' : 'px-2.5 py-1.5 text-xs',
        evidenceClasses[status],
        className,
      )}
    >
      {evidenceLabels[status]}
    </span>
  );
}

export { evidenceLabels };
