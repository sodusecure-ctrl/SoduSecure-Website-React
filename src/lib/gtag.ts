// Google Ads Measurement ID
export const GOOGLE_ADS_ID = 'AW-17937869852';

// Declare gtag on the window object for TypeScript
declare global {
  interface Window {
    gtag: (
      command: string,
      action: string,
      params?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Fire a Google Ads conversion event.
 * Call this after every successful form submission.
 */
export function trackConversion(): void {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID,
    });
  }
}
