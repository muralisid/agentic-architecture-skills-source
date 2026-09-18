import { cn } from '@/lib/cn';

export interface TeachingIllustrationProps {
  src: string;
  mobileSrc?: string;
  expandable?: boolean;
  alt: string;
  title: string;
  caption: string;
  className?: string;
}

export function TeachingIllustration({ src, mobileSrc, alt, title, caption, className, expandable = false }: TeachingIllustrationProps) {
  return (
    <figure className={cn('not-prose my-8 overflow-hidden rounded-2xl border bg-[#f8f3e8] shadow-sm print:break-inside-avoid', className)}>
      <picture>
        {mobileSrc ? <source media="(max-width: 640px)" srcSet={mobileSrc} /> : null}
      <img src={src} alt={alt} width={1600} height={898} loading="lazy" decoding="async" className="block h-auto w-full" />
      </picture>
      <figcaption className="border-t bg-fd-background px-4 py-4 sm:px-6">
        <strong className="block text-sm font-semibold text-fd-foreground">{title}</strong>
        <span className="mt-1 block text-sm leading-6 text-fd-muted-foreground">{caption}</span>
        {expandable ? <a href={src} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-medium underline underline-offset-4" aria-label={`Open full-size image: ${title}`}>Open image at full size ↗</a> : null}
      </figcaption>
    </figure>
  );
}
