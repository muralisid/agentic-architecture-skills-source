import { cn } from '@/lib/cn';
import { appName } from '@/lib/shared';

/** The site wordmark: serif, with the ember full stop the marketing site puts on its headlines. */
export function Wordmark({ className, size = 'default' }: { className?: string; size?: 'default' | 'large' }) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline font-serif font-semibold tracking-tight text-fd-foreground',
        size === 'large' ? 'text-[1.5rem]' : 'text-[1.05rem]',
        className,
      )}
    >
      {appName}
      <span className="text-ember">.</span>
    </span>
  );
}
