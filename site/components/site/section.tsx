import Link from 'next/link';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';

/** Uppercase eyebrow with hairline rules, the marketing site's section-heading contract. */
export function Eyebrow({ children, center = false, className }: { children: ReactNode; center?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.14em] text-ember',
        center && 'justify-center',
        className,
      )}
    >
      <span className="h-px w-10 bg-ember/60" />
      <span>{children}</span>
      {center && <span className="h-px w-10 bg-ember/60" />}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div className={cn('max-w-2xl', centered ? 'mx-auto text-center' : 'text-left', className)}>
      <Eyebrow center={centered}>{eyebrow}</Eyebrow>
      <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.1] text-fd-foreground md:text-5xl">{title}</h2>
      {sub ? <p className="mt-5 text-[16px] leading-[1.7] text-fd-muted-foreground md:text-[17px]">{sub}</p> : null}
    </div>
  );
}

/** Thin circles bleeding off the section edges plus the ember dot grid. Parent must be `relative overflow-hidden`. */
export function SectionDecor({
  circles = 'both',
  dots = 'tr',
  className,
}: {
  circles?: 'tr' | 'bl' | 'both' | 'none';
  dots?: 'tr' | 'tl' | 'br' | 'bl' | 'none';
  className?: string;
}) {
  const dotsPosition = { tr: 'top-10 right-10', tl: 'top-10 left-10', br: 'right-10 bottom-10', bl: 'bottom-10 left-10', none: '' }[dots];
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {(circles === 'tr' || circles === 'both') && (
        <div className="decor-circle absolute -top-64 -right-32 h-[580px] w-[580px]" />
      )}
      {(circles === 'bl' || circles === 'both') && (
        <div className="decor-circle absolute -bottom-48 -left-56 h-[480px] w-[480px]" style={{ ['--circle-color' as string]: 'rgba(148,163,184,0.35)' } as CSSProperties} />
      )}
      {dots !== 'none' && <div className={cn('dot-grid absolute hidden lg:block', dotsPosition)} />}
    </div>
  );
}

type PillVariant = 'solid' | 'outline' | 'soft';

const pillClasses: Record<PillVariant, string> = {
  solid: 'bg-ember text-white shadow-md shadow-ember/20 hover:bg-ember-deep hover:shadow-lg hover:shadow-ember/30',
  outline: 'border border-fd-border bg-fd-card text-fd-foreground hover:border-ember/40 hover:text-ember-ink',
  soft: 'bg-ember-soft text-ember-ink hover:bg-ember-wash dark:bg-fd-accent dark:text-fd-accent-foreground',
};

export function PillLink({
  href,
  variant = 'solid',
  arrow = false,
  className,
  children,
  ...rest
}: ComponentProps<typeof Link> & { variant?: PillVariant; arrow?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all',
        pillClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </Link>
  );
}

/** White card with an icon disc, a title and a line of copy; links when `href` is given. */
export function FeatureCard({
  href,
  icon,
  title,
  children,
  eyebrow,
  className,
}: {
  href?: string;
  icon?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  eyebrow?: string;
  className?: string;
}) {
  const body = (
    <>
      {icon ? <span className="flex size-12 items-center justify-center rounded-2xl bg-ember-soft text-ember dark:bg-fd-accent">{icon}</span> : null}
      {eyebrow ? <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-ember-deep">{eyebrow}</p> : null}
      <h3 className={cn('text-[17px] font-semibold tracking-[-0.01em] text-fd-foreground', icon || eyebrow ? 'mt-3' : '')}>{title}</h3>
      {children ? <div className="mt-2 text-[14.5px] leading-[1.65] text-fd-muted-foreground">{children}</div> : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cn('card-soft block p-6', className)}>
        {body}
      </Link>
    );
  }
  return <div className={cn('card-soft p-6', className)}>{body}</div>;
}
