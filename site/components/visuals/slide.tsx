import type { ReactNode } from 'react';
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

export interface SlideProps {
  /** The journey id, which is also its folder under public/slides, e.g. "ladder/index". */
  journey: string;
  /** The slide id inside that journey, e.g. "ov-02". */
  id: string;
  /** The explanation. Each paragraph is one build of the slide, and the video speaks the same words. */
  children?: ReactNode;
  className?: string;
}

// One slide and its explanation. The paragraphs run together as one block of text on the page.
export function Slide({ journey: journeyId, id, children, className }: SlideProps) {
  const journey = (JOURNEYS as Record<string, Journey>)[journeyId];
  if (!journey) throw new Error(`Unknown slide journey: ${journeyId}`);
  const index = journey.slides.findIndex((s) => s.id === id);
  if (index < 0) throw new Error(`Slide journey ${journeyId} has no slide named ${id}`);
  const slide = journey.slides[index];

  return (
    <div id={slide.id} className={cn('my-10 scroll-mt-24', className)}>
      <figure className="not-prose m-0 overflow-hidden rounded-2xl border bg-[#fbfaf8] shadow-sm print:break-inside-avoid">
        <img
          src={slide.src}
          alt={slide.title}
          width={1920}
          height={1080}
          loading={index < 2 ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-auto w-full"
        />
      </figure>
      <div className="mt-5 [&>p]:inline [&>p+p]:ml-1">{children}</div>
    </div>
  );
}
