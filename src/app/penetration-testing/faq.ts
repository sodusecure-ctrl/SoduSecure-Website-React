export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Was ist ein Penetrationstest (Pentest)?",
    a: "Ein Penetrationstest ist ein autorisierter, simulierter Angriff auf Ihre IT-Systeme. Zertifizierte Sicherheitsexperten versuchen, Schwachstellen aktiv auszunutzen – genau wie ein echter Angreifer. Das Ergebnis ist ein validierter, priorisierter Bericht mit konkreten Maßnahmenempfehlungen.",
  },
  {
    q: "Was ist der Unterschied zwischen Penetrationstest und Vulnerability Scan?",
    a: "Ein Vulnerability Scan ist vollautomatisiert und listet theoretische Schwachstellen – mit vielen Falschmeldungen. Ein Penetrationstest ist manuell: Experten nutzen Schwachstellen aktiv aus, verknüpfen sie zu Angriffspfaden und demonstrieren den realen Geschäftsschaden.",
  },
  {
    q: "Was kostet ein Penetrationstest?",
    a: "Ein automatisierter Schwachstellenscan kostet bei Sodu Secure ab 1.499 €. Ein manueller Penetrationstest wird individuell auf Ihr Projekt zugeschnitten und nach Aufwand und Tagessätzen kalkuliert – meist zwischen 4.000 und 20.000 €. Nutzen Sie unseren Pentest-Konfigurator für eine individuelle Schätzung.",
  },
  {
    q: "Wie lange dauert ein Penetrationstest?",
    a: "Ein fokussierter Web-App-Pentest dauert 3–5 Werktage, ein umfassendes KMU-Engagement mit Active Directory und Phishing 7–15 Werktage. Vom Erstkontakt bis zum finalen Bericht vergehen in der Regel 2–4 Wochen.",
  },
  {
    q: "Ist ein Penetrationstest für KMUs sinnvoll?",
    a: "Ja – KMUs sind besonders häufige Ziele, weil Angreifer automatisierte Tools nutzen, die unabhängig von der Unternehmensgröße scannen. Der Einstieg gelingt mit unserem automatisierten Schwachstellenscan ab 1.499 €; manuelle KMU-Pentests kalkulieren wir individuell nach Aufwand.",
  },
  {
    q: "Welche Compliance-Anforderungen verlangen einen Penetrationstest?",
    a: "NIS2, ISO/IEC 27001:2022, DSGVO Art. 32, DORA und viele Cyberversicherungen verlangen regelmäßige Penetrationstests. Sodu Secure berät Sie zur Anwendbarkeit und stellt compliance-konforme Berichte aus.",
  },
  {
    q: "Ist ein Penetrationstest DSGVO-konform?",
    a: "Alle Tests laufen auf Basis eines unterzeichneten Pentest-Vertrags mit klar definiertem Scope. Wir verarbeiten keine personenbezogenen Daten ohne Rechtsgrundlage und schließen auf Wunsch einen Auftragsverarbeitungsvertrag (AVV) ab.",
  },
  {
    q: "Wer führt bei Sodu Secure die Penetrationstests durch?",
    a: "Alle Tests werden von zertifizierten Sicherheitsexperten (OSCP, CEH, ISO 27001 Lead Auditor) durchgeführt – keine Junior-Analysten, keine reinen Scan-Reports. Sie kommunizieren direkt mit dem Pentester.",
  },
  {
    q: "Wie läuft ein Penetrationstest ab?",
    a: "In fünf Schritten: Im Scoping legen Sie Prüfobjekte, Testfenster und erlaubte Techniken schriftlich fest. Es folgen Informationssammlung und Schwachstellenidentifikation, danach die manuelle Ausnutzung der Funde mit Proof-of-Concept. Anschließend erhalten Sie den priorisierten Bericht und ein Abschlussgespräch. Nach Behebung der Schwachstellen prüfen wir im kostenlosen Retest nach, ob die Maßnahmen greifen.",
  },
  {
    q: "Was bedeutet Pentester?",
    a: "Ein Pentester ist ein Sicherheitsexperte, der Systeme im Auftrag des Eigentümers angreift, um ausnutzbare Schwachstellen zu finden, bevor es echte Angreifer tun. Die Grundlage ist immer ein schriftlicher Auftrag mit definiertem Scope. Fachliche Nachweise sind praktische Zertifizierungen wie OSCP oder OSWE, bei denen in einer Prüfung reale Systeme kompromittiert werden müssen.",
  },
  {
    q: "Was steht im Bericht nach einem Penetrationstest?",
    a: "Der Bericht enthält eine Executive Summary für die Geschäftsführung, den dokumentierten Prüfumfang und die Methodik sowie jede Schwachstelle einzeln: Schweregrad, betroffenes System, Nachweis der Ausnutzbarkeit und konkrete Fix-Empfehlung. Dazu kommt ein priorisierter Maßnahmenkatalog. Sie erhalten den Bericht auf Deutsch und Englisch, sodass er auch international vorgelegt werden kann.",
  },
  {
    q: "Beeinträchtigt ein Penetrationstest den laufenden Betrieb?",
    a: "In der Regel nicht. Testfenster, erlaubte Techniken und Eskalationswege werden vor dem Start schriftlich festgelegt, Prüfungen mit absichtlicher Überlastung finden nur nach ausdrücklicher Freigabe statt. Sensible Produktivsysteme testen wir auf Wunsch außerhalb der Geschäftszeiten oder gegen eine Staging-Umgebung. Während des Tests ist der Pentester für Ihr Team direkt erreichbar.",
  },
];
