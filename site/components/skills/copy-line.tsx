'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/cn';

/** A shell line with a copy button. The command is the point, so it stays selectable. */
export function CopyLine({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={cn(
        'not-prose flex items-center gap-3 rounded-full border border-fd-border bg-fd-card px-4 py-2.5 font-mono text-[13px]',
        className,
      )}
    >
      <span className="shrink-0 select-none text-fd-muted-foreground">$</span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-fd-foreground">{command}</code>
      <button
        type="button"
        aria-label={copied ? 'Copied' : 'Copy the command'}
        onClick={() => {
          void navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        className="inline-flex size-7 shrink-0 items-center justify-center rounded-full text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-ember-ink"
      >
        {copied ? <Check className="size-3.5 text-leaf" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}
