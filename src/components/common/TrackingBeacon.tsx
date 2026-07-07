'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttributionFromUrl, getAttribution, track } from '@/lib/tracker';

/**
 * Unsichtbarer Begleiter im Root-Layout: übernimmt die Attribution aus
 * ?sl=<slug> (vom /t/-Redirect) und meldet für attribuierte Besucher jeden
 * Seitenwechsel als page_view. Rendert nichts, sendet nichts ohne Attribution.
 */
export default function TrackingBeacon() {
  const pathname = usePathname();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    captureAttributionFromUrl();
    if (!getAttribution()) return;
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    track('page_view');
  }, [pathname]);

  return null;
}
