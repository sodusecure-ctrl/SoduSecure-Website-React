export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  { q: "Was ist eine Schwachstellenanalyse?", a: "Eine Schwachstellenanalyse (Vulnerability Assessment) ist eine systematische Prüfung Ihrer IT-Systeme auf bekannte Sicherheitslücken. Im Gegensatz zum Penetrationstest werden Schwachstellen identifiziert und nach CVSS bewertet, aber nicht aktiv ausgenutzt." },
  { q: "Was ist der Unterschied zwischen Schwachstellenanalyse und Penetrationstest?", a: "Schwachstellenanalyse = Identifikation und Bewertung von Sicherheitslücken (CVSS 3.1). Penetrationstest = Zusätzlich manuelle Exploitation mit Proof-of-Concepts. Für NIS2 Art. 21 empfiehlt sich ein vollständiger Penetrationstest. Bei eingeschränktem Budget ist die Schwachstellenanalyse ein guter Einstieg." },
  { q: "Was kostet eine Schwachstellenanalyse?", a: "Eine professionelle Schwachstellenanalyse kostet bei Sodu Secure ab 1.500 € (reine Analyse) bzw. ab 2.500 € für Schwachstellenanalyse mit manuellem Vertiefungs-Pentest. Nutzen Sie den Konfigurator für den genauen Festpreis." },
  { q: "Wie lange dauert eine Schwachstellenanalyse?", a: "Eine fokussierte Schwachstellenanalyse (1–2 Systeme) dauert 1–3 Tage. Eine umfassende Analyse der gesamten Infrastruktur 3–7 Tage. Der Bericht wird innerhalb von 48 Stunden nach Abschluss geliefert." },
  { q: "Welche Tools werden bei der Schwachstellenanalyse eingesetzt?", a: "Sodu Secure kombiniert automatisierte Basis-Tools (Nessus, OpenVAS, Nikto) mit manueller Vertiefung durch OSCP-zertifizierte Experten. Das Ergebnis: keine False Positives, echte Proof-of-Concepts für kritische Findings." },
  { q: "Reicht eine Schwachstellenanalyse für ISO 27001?", a: "Eine Schwachstellenanalyse erfüllt die Grundanforderungen von ISO 27001 Annex A.12.6. Für eine vollständige ISO 27001-Zertifizierung und NIS2 Art. 21-Nachweis empfiehlt sich ergänzend ein vollständiger Penetrationstest." },
];
