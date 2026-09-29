export type PricingFaq = { q: string; a: string };

// Single Source für die sichtbaren Pentest-FAQs (DE) in PricingClient
// und das FAQPage-JSON-LD in page.tsx.
export const PENTEST_FAQ_DE: PricingFaq[] = [
  { q: 'Wie schnell startet das Pentest?', a: 'Nach Vertragsabschluss starten wir typischerweise binnen 1–2 Wochen, in dringenden Fällen auch innerhalb von 72 Stunden.' },
  { q: 'Wer testet?', a: 'Zertifizierte Tester mit OSCP+, OSWE, CEH, GPEN. Kein Outsourcing - alle Mitarbeiter sind in Deutschland angestellt.' },
  { q: 'Ist der Retest wirklich kostenlos?', a: 'Ja. Innerhalb 30 Tagen nach Bericht-Abgabe testen wir die behobenen Findings ohne Mehrkosten erneut.' },
  { q: 'Erhalten wir einen ISO-27001-konformen Bericht?', a: 'Ja. Unsere Berichte sind ISO 27001, BSI Grundschutz, NIS2 und DSGVO mappable.' },
  { q: 'Kann das Pentest unsere Systeme stören?', a: 'Wir arbeiten nicht-destruktiv und stimmen jeden potenziell impactvollen Test mit Ihnen ab. Auf Wunsch nur in der Staging-Umgebung.' },
  { q: 'Festpreis oder Tagessatz?', a: 'Festpreis nach Scoping-Call. Sie zahlen genau das, was vorab vereinbart wurde - keine versteckten Kosten.' },
];
