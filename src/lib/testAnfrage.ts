/**
 * Erkennt eigene Testanfragen, damit sie die Verkaufszahlen nicht verfaelschen.
 *
 * Anlass: In der Auswertung vom 24.11.2026 standen vier Testeintraege in der
 * 90-Tage-Statistik - zweimal "Sodu Secure GmbH" ueber sodusecure@gmail.com,
 * einmal "Muster GmbH" ueber test@gmail.com und ein Stripe-Test "fsdsdf". Sie
 * blaehten die Pipeline um 29.388 € auf, machten 12,5 % aller Anfragen aus und
 * setzten "Sodu Secure GmbH" auf Platz 1 der Top-Firmen-Liste. Jede Kennzahl im
 * Dashboard war dadurch zu optimistisch.
 *
 * Die Erkennung laeuft ausschliesslich ueber die Adresse. Firmennamen wie
 * "Muster GmbH" oder "fsdsdf" zu erraten waere unzuverlaessig und wuerde
 * irgendwann einen echten Kunden treffen.
 *
 * Erkannte Anfragen werden **nicht abgewiesen** - sie laufen normal durch,
 * bekommen aber das Kennzeichen `intern-test`. Das Dashboard kann danach
 * filtern, und der Vorgang bleibt nachvollziehbar.
 */

/** Eigene Adressen und offensichtliche Wegwerf-Testadressen. */
const TEST_ADRESSEN = [
  'sodusecure@gmail.com',
  'info@sodusecure.com',
  'k.koc@sodusecure.com',
];

/** Domains, die per Norm nie echte Post zustellen (RFC 2606 und RFC 6761). */
const TEST_DOMAINS = ['example.com', 'example.org', 'example.net', 'invalid', 'test', 'localhost'];

export function istTestAnfrage(email: string | null | undefined): boolean {
  if (!email) return false;
  const e = String(email).trim().toLowerCase();
  if (!e.includes('@')) return false;

  if (TEST_ADRESSEN.includes(e)) return true;

  // Eigene Domain: Wer von sodusecure.com schreibt, fragt nicht bei sich selbst an.
  const domain = e.slice(e.lastIndexOf('@') + 1);
  if (domain === 'sodusecure.com' || domain.endsWith('.sodusecure.com')) return true;

  // Reservierte Testdomains
  if (TEST_DOMAINS.includes(domain)) return true;
  if (TEST_DOMAINS.some((d) => domain.endsWith('.' + d))) return true;

  // Ortsteil genau "test" oder "test+irgendwas" - nicht blosses Enthalten,
  // sonst traefe es echte Adressen wie "kontakt@protest-gmbh.de".
  const ortsteil = e.slice(0, e.lastIndexOf('@'));
  if (ortsteil === 'test' || ortsteil.startsWith('test+')) return true;

  return false;
}

/** Kennzeichen, das erkannte Testanfragen im Lead erhalten. */
export const TEST_TAG = 'intern-test';
