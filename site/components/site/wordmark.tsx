import { cn } from '@/lib/cn';

/** The guide's wordmark: serif, with the ember full stop the marketing site puts on its headlines. */
export function Wordmark({ className, size = 'default' }: { className?: string; size?: 'default' | 'large' }) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-semibold tracking-tight text-fd-foreground',
        size === 'large' ? 'text-[1.6rem]' : 'text-[1.15rem]',
        className,
      )}
    >
      Agentic Enterprise<span className="text-ember">.</span>
    </span>
  );
}
