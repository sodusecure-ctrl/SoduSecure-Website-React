export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist der Unterschied zwischen Schwachstellenscan und Pentest?",
    a: "Ein Schwachstellenscan prüft automatisiert und regelmäßig auf bekannte Schwachstellen – breit und wiederholbar. Ein Penetrationstest geht deutlich tiefer: Zertifizierte Pentester verketten Schwachstellen manuell zu echten Angriffspfaden und finden Logikfehler, die kein Scanner erkennt. Ideal ist die Kombination: regelmäßige Scans plus ein jährlicher Pentest.",
  },
  {
    q: "Wie oft sollte ein Schwachstellenscan durchgeführt werden?",
    a: "Empfohlen sind mindestens quartalsweise Scans, für exponierte Systeme monatlich. Standards wie ISO 27001 und NIS2 verlangen ein kontinuierliches Schwachstellenmanagement – ein einmaliger Scan reicht dafür nicht aus.",
  },
  {
    q: "Was kostet ein Schwachstellenscan?",
    a: "Ein einzelner externer Scan mit validiertem Bericht beginnt ab 490 €. Wiederkehrende Scans im Abo (quartalsweise, inkl. Re-Scans und Trend-Reporting) ab 990 € pro Quartal. Der genaue Preis hängt von der Anzahl der Systeme ab – Festpreisangebot in 24h.",
  },
  {
    q: "Erzeugt der Scan Ausfälle oder Störungen?",
    a: "Nein. Wir verwenden produktionssichere Scan-Profile und stimmen Zeitfenster mit Ihnen ab. Aggressive Tests, die Systeme stören könnten, gehören in einen Pentest mit explizitem Scope – nicht in einen regelmäßigen Scan.",
  },
  {
    q: "Bekomme ich nur einen Rohbericht aus dem Scanner?",
    a: "Nein – das ist der zentrale Unterschied zu reinen Scan-Tools: Unsere Pentester validieren jedes Ergebnis, entfernen False Positives und priorisieren nach echtem Risiko für Ihr Unternehmen. Sie erhalten eine umsetzbare Maßnahmenliste, keinen 300-Seiten-Export.",
  },
  {
    q: "Zählt der Schwachstellenscan als Nachweis für ISO 27001 oder NIS2?",
    a: "Ja. Regelmäßige, dokumentierte Schwachstellenscans mit nachverfolgter Behebung sind ein anerkannter Baustein des technischen Schwachstellenmanagements nach ISO 27001 (A.8.8) und der Risikomaßnahmen nach NIS2 Art. 21.",
  },
];
