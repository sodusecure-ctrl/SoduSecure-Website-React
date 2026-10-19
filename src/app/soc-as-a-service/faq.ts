export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist SOC as a Service?",
    a: "Ein Security Operations Center (SOC) überwacht Ihre IT rund um die Uhr auf Angriffe und reagiert auf Vorfälle. Als Service heißt das: Sie bekommen Technologie (SIEM, EDR), Prozesse und erfahrene Analysten aus einer Hand – ohne ein eigenes Team aufbauen zu müssen, das im 24/7-Schichtbetrieb arbeitet.",
  },
  {
    q: "Brauchen KMU wirklich ein SOC?",
    a: "Angriffe treffen längst nicht mehr nur Konzerne – Ransomware-Gruppen zielen gezielt auf den Mittelstand, weil dort seltener jemand hinschaut. Ein eigenes SOC ist für KMU unwirtschaftlich (mindestens 5 Vollzeitstellen für 24/7); als Service ist derselbe Schutz zu einem Bruchteil der Kosten machbar.",
  },
  {
    q: "Was kostet SOC as a Service?",
    a: "Der Einstieg für KMU beginnt ab 990 € pro Monat, abhängig von Anzahl der Endpoints und Log-Quellen. Größere Umgebungen mit erweiterten SLAs liegen typischerweise zwischen 2.500 € und 8.000 € monatlich. Festpreisangebot nach kurzer Bestandsaufnahme.",
  },
  {
    q: "Hilft das SOC bei NIS2?",
    a: "Ja, zentral: NIS2 verlangt Detektions- und Bewältigungsfähigkeiten (Art. 21) und die Meldung erheblicher Vorfälle binnen 24 Stunden (Art. 23). Genau das leistet ein SOC – inklusive Unterstützung bei der fristgerechten Meldung und der Dokumentation für die Aufsicht.",
  },
  {
    q: "Was ist der Unterschied zwischen SOC und MDR?",
    a: "MDR (Managed Detection and Response) ist im Kern ein SOC-Service mit Fokus auf Endpoint-Erkennung und Reaktion. Unser SOC as a Service umfasst MDR und geht darüber hinaus: Log-Korrelation über die gesamte Infrastruktur, Schwachstellen-Monitoring und Compliance-Reporting.",
  },
  {
    q: "Wie lange dauert das Onboarding?",
    a: "Typischerweise 2 bis 4 Wochen: Log-Quellen anbinden, Endpoint-Agenten ausrollen, Baselining und Eskalationswege abstimmen. Danach läuft die Überwachung im Regelbetrieb.",
  },
];
