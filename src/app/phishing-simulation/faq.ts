export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist eine Phishing Simulation?",
    a: "Eine Phishing Simulation ist ein kontrollierter, genehmigter Test, bei dem Ihr Unternehmen realistische Phishing-Angriffe gegen die eigenen Mitarbeiter simuliert - um Sicherheitsbewusstsein zu messen und gezielt zu verbessern. Die Mitarbeiter werden dabei nicht bestraft, sondern im Moment des Reinfallens sofort geschult.",
  },
  {
    q: "Ist eine Phishing Simulation legal?",
    a: "Ja - mit entsprechender Genehmigung durch Unternehmensführung und Betriebsrat (falls vorhanden). Sodu Secure stellt alle notwendigen rechtlichen Dokumente bereit und führt Simulationen DSGVO-konform durch.",
  },
  {
    q: "Wie viel kostet eine Phishing Simulation?",
    a: "Eine einfache Phishing-Kampagne beginnt ab 800 €. Umfangreiche Multi-Vektor-Simulationen (E-Mail + Vishing + QRishing) für größere Unternehmen kosten zwischen 2.000 € und 8.000 €. Festpreisangebot auf Anfrage.",
  },
  {
    q: "Wie läuft eine Phishing Simulation ab?",
    a: "Eine Phishing Simulation läuft in fünf Schritten ab: Abstimmung von Zielgruppe, Szenario und Zeitraum, Freigabe durch Geschäftsführung und gegebenenfalls Betriebsrat, technische Vorbereitung inklusive Zustellbarkeit, Versand der Kampagne und Auswertung. Sie erhalten einen Bericht mit Kennzahlen und eine Empfehlung, welche Bereiche als Nächstes geschult werden sollten.",
  },
  {
    q: "Was benötigen Sie von uns für eine Phishing Simulation?",
    a: "Wir brauchen die Liste der teilnehmenden E-Mail-Adressen oder eine Verteilerdefinition, einen technischen Ansprechpartner für die Zustellbarkeit und die schriftliche Freigabe der Geschäftsführung. Besteht ein Betriebsrat, holen Sie dessen Zustimmung ein - die Unterlagen dafür liefern wir. Der Aufwand auf Ihrer Seite liegt meist unter zwei Stunden.",
  },
  {
    q: "Kommen die Phishing-Mails überhaupt durch unseren Spamfilter?",
    a: "Ja, sofern Ihre IT die Simulation mitträgt. Wir stimmen vorab ab, ob die Mails regulär zugestellt oder die Filter für die Testabsender geöffnet werden. Beides hat seinen Zweck: Der ungefilterte Versand misst das Verhalten der Mitarbeiter, der gefilterte Durchlauf zeigt zusätzlich, wie gut Ihre technischen Schutzmaßnahmen greifen.",
  },
  {
    q: "Was wird bei einer Phishing Simulation gemessen?",
    a: "Gemessen werden Zustellungen, Öffnungen, Klicks auf den Link, Eingaben von Zugangsdaten sowie Meldungen an Ihre IT. Besonders aussagekräftig ist die Meldequote: Sie zeigt, ob Mitarbeiter Verdachtsfälle tatsächlich weitergeben. Ausgewertet wird nach Abteilung und Zeitverlauf, damit Sie Fortschritte über mehrere Kampagnen belegen können.",
  },
  {
    q: "Wie oft sollte eine Phishing Simulation durchgeführt werden?",
    a: "Experten empfehlen 3 bis 4 Mal pro Jahr. So bleiben Mitarbeiter sensibilisiert und Fortschritte können gemessen werden. Für NIS2-Compliance wird eine regelmäßige Frequenz explizit empfohlen.",
  },
  {
    q: "Was passiert mit Mitarbeitern, die auf den Phishing-Link klicken?",
    a: "Betroffene Mitarbeiter sehen sofort eine Lernseite, die erklärt, was gerade passiert ist und warum dies gefährlich war. Es geht nicht um Bestrafung, sondern um Learning by Experience - der wirksamste Weg zur Sensibilisierung.",
  },
  {
    q: "Ist eine Phishing Simulation DSGVO-konform?",
    a: "Ja, wenn die Auswertung nicht auf Einzelpersonen abzielt. Wir berichten standardmäßig aggregiert nach Gruppen oder Abteilungen, nicht namentlich. Zweck, Datenumfang und Löschfristen werden vorab schriftlich festgehalten, bei Bedarf über einen Auftragsverarbeitungsvertrag nach DSGVO Art. 28. Beziehen Sie Datenschutzbeauftragten und Betriebsrat früh ein, dann ist die Freigabe unkompliziert.",
  },
  {
    q: "Ersetzt eine Phishing Simulation die Security-Awareness-Schulung?",
    a: "Nein, beides gehört zusammen. Die Simulation zeigt messbar, wo Ihr Unternehmen anfällig ist, vermittelt aber kein Wissen. Die Schulung vermittelt Erkennungsmerkmale und Meldewege, misst aber nicht die Wirkung. Wirksam wird die Kombination: Simulation als Ausgangsmessung, Schulung direkt danach, zweite Simulation als Nachweis des Fortschritts.",
  },
  {
    q: "Gilt Phishing Simulation auch für NIS2 und ISO 27001?",
    a: "Ja. Phishing Simulationen sind ein anerkannter Nachweis für Sicherheitsmaßnahmen unter NIS2 (Art. 21), ISO 27001 (A.6.3 - Information Security Awareness) und BSI IT-Grundschutz.",
  },
];
