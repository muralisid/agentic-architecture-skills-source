'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Start each page at the top.
 *
 * Client-side navigation in this layout leaves the window where the previous
 * page was scrolled to, so a link followed from halfway down one page opens
 * the next one halfway down. Two cases must still keep their position: a link
 * that names an anchor, because /decisions#cd-25 should land on the decision
 * rather than the top of the catalogue, and back or forward, because the
 * reader is returning to somewhere they already were.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const cameFromHistory = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      cameFromHistory.current = true;
      // A hash-only back step changes no pathname, so nothing below would
      // clear the flag and the next link click would lose its reset.
      window.setTimeout(() => {
        cameFromHistory.current = false;
      }, 100);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (cameFromHistory.current) {
      cameFromHistory.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
