export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist ein Schwachstellenscan?",
    a: "Ein Schwachstellenscan ist eine automatisierte Prüfung Ihrer Systeme auf bekannte Sicherheitslücken. Der Scanner gleicht Betriebssysteme, Dienste und Softwareversionen gegen Schwachstellendatenbanken ab und meldet jeden Treffer mit Risikobewertung. Anders als beim Penetrationstest werden die Lücken nicht ausgenutzt - es geht um Breite und Wiederholbarkeit, nicht um Angriffstiefe.",
  },
  {
    q: "Was ist der Unterschied zwischen Schwachstellenscan und Pentest?",
    a: "Ein Schwachstellenscan prüft automatisiert und regelmäßig auf bekannte Schwachstellen - breit und wiederholbar. Ein Penetrationstest geht deutlich tiefer: Zertifizierte Pentester verketten Schwachstellen manuell zu echten Angriffspfaden und finden Logikfehler, die kein Scanner erkennt. Ideal ist die Kombination: regelmäßige Scans plus ein jährlicher Pentest.",
  },
  {
    q: "Wie oft sollte ein Schwachstellenscan durchgeführt werden?",
    a: "Empfohlen sind mindestens quartalsweise Scans, für exponierte Systeme monatlich. Standards wie ISO 27001 und NIS2 verlangen ein kontinuierliches Schwachstellenmanagement - ein einmaliger Scan reicht dafür nicht aus.",
  },
  {
    q: "Was kostet ein Schwachstellenscan?",
    a: "Ein einzelner externer Scan mit validiertem Bericht beginnt ab 490 €. Wiederkehrende Scans im Abo (quartalsweise, inkl. Re-Scans und Trend-Reporting) ab 990 € pro Quartal. Der genaue Preis hängt von der Anzahl der Systeme ab - Festpreisangebot in 24h.",
  },
  {
    q: "Wie lange dauert ein Schwachstellenscan?",
    a: "Ein externer Scan einzelner Systeme läuft in wenigen Stunden durch, größere Adressbereiche über Nacht. Rechnen Sie mit zwei bis fünf Werktagen von der Freigabe bis zum validierten Bericht - die Zeit geht überwiegend in die manuelle Prüfung der Treffer. Ein reiner Scanner-Lauf ohne diese Verifikation wäre schneller fertig, liefert aber Fehlalarme statt belastbarer Befunde.",
  },
  {
    q: "Welche Systeme lassen sich per Schwachstellenscan prüfen?",
    a: "Von außen erreichbare Server, Webanwendungen, VPN- und Mail-Gateways, Firewalls sowie Cloud-Dienste. Intern zusätzlich Clients, Server, Active Directory und Netzwerkkomponenten - dafür stellen wir ein Prüfgerät bereit oder nutzen einen VPN-Zugang. Sie legen den Umfang fest; geprüft wird ausschließlich, was schriftlich freigegeben ist.",
  },
  {
    q: "Erzeugt der Scan Ausfälle oder Störungen?",
    a: "Nein. Wir verwenden produktionssichere Scan-Profile und stimmen Zeitfenster mit Ihnen ab. Aggressive Tests, die Systeme stören könnten, gehören in einen Pentest mit explizitem Scope - nicht in einen regelmäßigen Scan.",
  },
  {
    q: "Gibt es einen kostenlosen Schwachstellenscanner?",
    a: "Ja, OpenVAS, Nuclei und die Skripte von Nmap sind kostenlos und technisch brauchbar. Der Aufwand liegt aber nicht im Werkzeug, sondern danach: Konfiguration, Auswertung, Aussortieren von False Positives und Priorisierung kosten mehr Zeit als der Scan selbst. Für interne Vorprüfungen reichen sie, für einen Bericht gegenüber Auditoren oder Kunden nicht.",
  },
  {
    q: "Was sind CVE-Schwachstellen?",
    a: "CVE (Common Vulnerabilities and Exposures) ist der internationale Katalog öffentlich bekannter Sicherheitslücken. Jede Lücke erhält eine eindeutige Nummer nach dem Muster CVE-2024-3400, dazu Beschreibung und betroffene Produktversionen. Ein Schwachstellenscan meldet genau diese CVEs für Ihre Systeme. Wie schwer eine Lücke wiegt, drückt der CVSS-Score von 0 bis 10 aus.",
  },
  {
    q: "Welche Tools für das Schwachstellenmanagement gibt es?",
    a: "Verbreitet sind Nessus, Qualys, Rapid7 InsightVM und Greenbone/OpenVAS für das Scanning, ergänzt um ein Ticketsystem zur Nachverfolgung der Behebung. Sodu Secure setzt marktübliche Scanner ein und verifiziert die Ergebnisse manuell. Entscheidend für ISO 27001 A.8.8 ist nicht das Werkzeug, sondern der dokumentierte Prozess aus Scan, Bewertung, Behebung und Kontrolle.",
  },
  {
    q: "Bekomme ich nur einen Rohbericht aus dem Scanner?",
    a: "Nein - das ist der zentrale Unterschied zu reinen Scan-Tools: Unsere Pentester validieren jedes Ergebnis, entfernen False Positives und priorisieren nach echtem Risiko für Ihr Unternehmen. Sie erhalten eine umsetzbare Maßnahmenliste, keinen 300-Seiten-Export.",
  },
  {
    q: "Zählt der Schwachstellenscan als Nachweis für ISO 27001 oder NIS2?",
    a: "Ja. Regelmäßige, dokumentierte Schwachstellenscans mit nachverfolgter Behebung sind ein anerkannter Baustein des technischen Schwachstellenmanagements nach ISO 27001 (A.8.8) und der Risikomaßnahmen nach NIS2 Art. 21.",
  },
];
