/**
 * Stand der inhaltlichen Pruefung dieser Seite.
 *
 * Warum das hier steht: Auf der Trefferliste zu "pentest anbieter" und
 * "penetrationstest anbieter" zeigt Google bei *jedem* Wettbewerber ein Datum
 * neben dem Treffer - DeepStrike 28.04.2026, Blaze 16.12.2024, CODE-LEIN
 * 11.09.2026, DATUREX 11.11.2026. Bei uns stand dort nichts. Auf einer
 * Vergleichssuche ist das Datum ein Klicksignal: Wer Anbieter vergleicht, will
 * wissen, ob der Vergleich noch gilt.
 *
 * WICHTIG - nur von Hand aendern, und nur dann, wenn die acht Kriterien und
 * die sechs Warnsignale tatsaechlich durchgesehen wurden. Ein Datum, das sich
 * bei jedem Deploy mitzieht, ist ein vorgetaeuschtes Frischesignal: Es
 * taeuscht Leser und Google ueber den Pflegezustand und faellt irgendwann auf.
 * Dieselbe Regel gilt fuer `updated` in blogData.ts und PRICE_INDEX_META.
 */
export const ANBIETER_STAND = {
  /** Erstveroeffentlichung der Seite in der heutigen Form. */
  datePublished: '2026-09-29',
  /** Letzte inhaltliche Durchsicht: Kriterien und Warnsignale gegengeprueft. */
  dateModified: '2026-11-23',
  /** Ausgeschriebene Anzeigeform fuer den sichtbaren Hinweis. */
  label: '23. November 2026',
} as const;
