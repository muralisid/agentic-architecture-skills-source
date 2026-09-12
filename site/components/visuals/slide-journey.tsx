import { cn } from '@/lib/cn';
import { JOURNEYS } from '@/lib/journeys';

interface JourneySlide {
  id: string;
  src: string;
  title: string;
  caption: string;
}

interface Journey {
  id: string;
  title: string;
  slides: JourneySlide[];
}

export interface SlideJourneyProps {
  /** The journey id, which is also its folder under public/slides, e.g. "ladder/index". */
  id: string;
  /** Comma-separated slide ids to show at this point in the page. Leave out to show every slide. */
  slides?: string;
  className?: string;
}

// A page told as a run of simple slides, one idea each. A page can show its journey in parts,
// one part per section, and the numbering carries on across the parts. The video uses the same slides.
export function SlideJourney({ id, slides, className }: SlideJourneyProps) {
  const journey = (JOURNEYS as Record<string, Journey>)[id];
  if (!journey) throw new Error(`Unknown slide journey: ${id}`);

  const wanted = slides ? slides.split(',').map((s) => s.trim()) : null;
  const missing = wanted?.filter((w) => !journey.slides.some((s) => s.id === w)) ?? [];
  if (missing.length) throw new Error(`Slide journey ${id} has no slides named ${missing.join(', ')}`);

  const total = String(journey.slides.length).padStart(2, '0');
  const shown = journey.slides
    .map((slide, index) => ({ slide, index }))
    .filter(({ slide }) => !wanted || wanted.includes(slide.id));

  return (
    <section className={cn('not-prose my-8', className)} aria-label={journey.title}>
      <ol className="flex flex-col gap-6">
        {shown.map(({ slide, index }) => (
          <li key={slide.id} id={slide.id} className="scroll-mt-24">
            <figure className="overflow-hidden rounded-2xl border bg-[#fbfaf8] shadow-sm print:break-inside-avoid">
              <img
                src={slide.src}
                alt={slide.title}
                width={1920}
                height={1080}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
                className="block h-auto w-full"
              />
              <figcaption className="flex gap-4 border-t bg-fd-background px-4 py-4 sm:px-6">
                <span className="shrink-0 pt-0.5 text-xs font-semibold tabular-nums tracking-wide text-fd-muted-foreground">
                  {String(index + 1).padStart(2, '0')} / {total}
                </span>
                <span className="text-sm leading-6 text-fd-foreground">{slide.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>
    </section>
  );
}
