export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist SOC as a Service?",
    a: "Ein Security Operations Center (SOC) überwacht Ihre IT rund um die Uhr auf Angriffe und reagiert auf Vorfälle. Als Service heißt das: Sie bekommen Technologie (SIEM, EDR), Prozesse und erfahrene Analysten aus einer Hand - ohne ein eigenes Team aufbauen zu müssen, das im 24/7-Schichtbetrieb arbeitet.",
  },
  {
    q: "Brauchen KMU wirklich ein SOC?",
    a: "Angriffe treffen längst nicht mehr nur Konzerne - Ransomware-Gruppen zielen gezielt auf den Mittelstand, weil dort seltener jemand hinschaut. Ein eigenes SOC ist für KMU unwirtschaftlich, weil 24/7-Betrieb mehrere Vollzeitstellen bindet; als Service ist derselbe Schutz zu einem Bruchteil der Kosten machbar.",
  },
  {
    q: "Was kostet SOC as a Service?",
    a: "Der Einstieg für KMU beginnt ab 990 € pro Monat, abhängig von Anzahl der Endpoints und Log-Quellen. Größere Umgebungen mit erweiterten SLAs liegen typischerweise zwischen 2.500 € und 8.000 € monatlich. Festpreisangebot nach kurzer Bestandsaufnahme.",
  },
  {
    q: "Welche Systeme und Log-Quellen werden angebunden?",
    a: "Angebunden werden Endpoints über einen Agenten, Server und Domänencontroller, Firewalls und VPN-Gateways, Microsoft 365 und Entra ID, Cloud-Umgebungen wie Azure oder AWS sowie Mailsecurity und Backup-Systeme. Welche Quellen sinnvoll sind, klären wir in der Bestandsaufnahme - entscheidend ist, dass Identitäten, Endgeräte und Perimeter abgedeckt sind.",
  },
  {
    q: "Wie läuft die Reaktion auf einen Sicherheitsvorfall ab?",
    a: "Sobald eine Erkennung auslöst, prüft ein Analyst den Alarm, bewertet ihn und verwirft Fehlalarme. Bestätigt sich ein Vorfall, erhalten Sie eine Meldung mit Einschätzung und konkreten Handlungsempfehlungen; nach Absprache isolieren wir betroffene Systeme oder sperren Konten. Anschließend folgen Ursachenanalyse und ein Bericht, der auch als Nachweis gegenüber Aufsicht und Versicherung dient.",
  },
  {
    q: "Welche Reaktionszeiten gelten?",
    a: "Reaktionszeiten werden nach Kritikalität gestaffelt und vertraglich im Service Level Agreement festgehalten: kritische Vorfälle rund um die Uhr mit sofortiger Benachrichtigung, niedrigere Stufen innerhalb der Geschäftszeiten. Eskalationswege, Ansprechpartner und Rufbereitschaft legen wir im Onboarding gemeinsam fest, damit im Ernstfall klar ist, wer wen wann erreicht.",
  },
  {
    q: "Hilft das SOC bei NIS2?",
    a: "Ja, zentral: NIS2 verlangt Detektions- und Bewältigungsfähigkeiten (Art. 21) und die Meldung erheblicher Vorfälle binnen 24 Stunden (Art. 23). Genau das leistet ein SOC - inklusive Unterstützung bei der fristgerechten Meldung und der Dokumentation für die Aufsicht.",
  },
  {
    q: "Wo werden unsere Log-Daten gespeichert?",
    a: "Auf Wunsch ausschließlich in Rechenzentren innerhalb der EU. Zugriff haben nur die eingesetzten Analysten, Übertragung und Speicherung erfolgen verschlüsselt, Aufbewahrungsfristen legen wir vertraglich fest. Grundlage ist ein Auftragsverarbeitungsvertrag nach DSGVO Art. 28 samt technischen und organisatorischen Maßnahmen - diese Unterlagen brauchen Sie ohnehin für Ihre eigene Dokumentation.",
  },
  {
    q: "Was ist der Unterschied zwischen SOC und MDR?",
    a: "MDR (Managed Detection and Response) ist im Kern ein SOC-Service mit Fokus auf Endpoint-Erkennung und Reaktion. Unser SOC as a Service umfasst MDR und geht darüber hinaus: Log-Korrelation über die gesamte Infrastruktur, Schwachstellen-Monitoring und Compliance-Reporting.",
  },
  {
    q: "Ersetzt SOC as a Service unsere Firewall und den Virenschutz?",
    a: "Nein, es setzt darauf auf. Firewall und Virenschutz blockieren Bekanntes automatisch; sie sehen aber nicht, wenn ein Angreifer mit gültigen Zugangsdaten arbeitet oder sich langsam im Netz ausbreitet. Ein SOC korreliert Ereignisse über alle Systeme hinweg und bewertet sie im Zusammenhang. Ohne saubere Grundabsicherung erzeugt es allerdings vor allem Lärm.",
  },
  {
    q: "Brauchen wir trotz SOC noch Penetrationstests?",
    a: "Ja. Ein SOC erkennt Angriffe, die bereits laufen - ein Penetrationstest verhindert, dass sie gelingen. Beides greift ineinander: Der Pentest zeigt die Angriffswege, das SOC prüft, ob diese Wege auch erkannt werden. ISO 27001 und NIS2 verlangen beides, Detektion und regelmäßige Überprüfung der Wirksamkeit.",
  },
  {
    q: "Wie lange dauert das Onboarding?",
    a: "Typischerweise 2 bis 4 Wochen: Log-Quellen anbinden, Endpoint-Agenten ausrollen, Baselining und Eskalationswege abstimmen. Danach läuft die Überwachung im Regelbetrieb.",
  },
];
