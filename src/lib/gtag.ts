// Google Ads Measurement ID
export const GOOGLE_ADS_ID = 'AW-17937869852';

// Google Analytics 4 Measurement ID
export const GA_MEASUREMENT_ID = 'G-RTKDCGK33G';

/**
 * Conversion-Label aus dem Google-Ads-Konto.
 *
 * Google erwartet in `send_to` die Form `AW-XXXXXXXXX/LABEL`. Steht dort nur
 * die Konto-ID ohne Label, kann Google Ads das Ereignis keiner
 * Conversion-Aktion zuordnen - die Conversion wird dann nicht gezaehlt.
 * Genau so lief es hier bisher.
 *
 * Folgen, solange das Label fehlt:
 * - Smart Bidding (Conversions maximieren, Ziel-CPA) funktioniert nicht, weil
 *   es keine Conversions zu optimieren gibt. Es bleibt "Klicks maximieren" -
 *   und das kauft genau die billigen, wertlosen Klicks, die man nicht will.
 * - Die Kosten pro Anfrage lassen sich nicht messen.
 *
 * Zu finden im Google-Ads-Konto unter Ziele > Conversions > die Aktion
 * oeffnen > "Tag einrichten" > "Tag selbst hinzufuegen". Dort steht eine
 * Zeile wie:
 *     gtag('event', 'conversion', {'send_to': 'AW-17937869852/AbC-D_efG…'});
 * Der Teil hinter dem Schraegstrich ist das Label.
 *
 * Eintragen als Umgebungsvariable NEXT_PUBLIC_ADS_CONVERSION_LABEL in Vercel
 * (alle Umgebungen), nicht hier fest verdrahten - so laesst es sich wechseln,
 * ohne den Code anzufassen.
 */
export const GOOGLE_ADS_CONVERSION_LABEL =
  process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL ?? '';

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
 * Meldet eine Conversion an Google Ads.
 *
 * Nach jedem erfolgreichen Absenden eines Formulars aufrufen.
 *
 * @param label Abweichendes Conversion-Label, wenn ein Formular auf eine
 *   eigene Conversion-Aktion laufen soll. Sinnvoll, sobald sich die Formulare
 *   im Wert unterscheiden: Eine Anfrage ueber den Konfigurator ist mehr wert
 *   als eine Nachricht ueber das Kontaktformular, und nur mit getrennten
 *   Aktionen kann Google auf die wertvollere bieten.
 */
export function trackConversion(label: string = GOOGLE_ADS_CONVERSION_LABEL): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  if (!label) {
    // Laut und nur in der Entwicklung: Ohne Label zaehlt Google Ads nichts,
    // und das faellt sonst erst auf, wenn das Budget schon ausgegeben ist.
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[gtag] NEXT_PUBLIC_ADS_CONVERSION_LABEL ist nicht gesetzt. ' +
          'Die Conversion wird ohne Label gesendet und von Google Ads keiner ' +
          'Conversion-Aktion zugeordnet.'
      );
    }
    window.gtag('event', 'conversion', { send_to: GOOGLE_ADS_ID });
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
  });
}
