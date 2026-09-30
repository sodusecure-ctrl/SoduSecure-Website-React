export type ProviderFaq = { q: string; a: string };

export const FAQS: ProviderFaq[] = [
  {
    q: "Wie viel kostet ein seriöser Penetrationstest?",
    a: "Es kommt auf den Scope an. Ein automatisierter Schwachstellenscan startet ab 1.499 €. Ein manueller Pentest wird individuell auf das Projekt zugeschnitten und nach Aufwand und Tagessätzen kalkuliert - meist 4.000 bis 20.000 €, Enterprise-Projekte auch darüber. Deutlich billigere Angebote = meist unseriös oder nur ein Scan.",
  },
  {
    q: "Was ist der Unterschied zwischen internem und externem Penetrationstest?",
    a: "Ein externer Penetrationstest greift die aus dem Internet erreichbare Angriffsfläche an: Webanwendungen, APIs, VPN-Gateways, Mailserver. Ein interner Test startet aus dem Firmennetz und bildet ab, was ein Angreifer nach dem ersten erfolgreichen Zugriff erreichen kann - Lateral Movement, Privilege Escalation, Übernahme der Active-Directory-Domäne. Interne Tests finden meist mehr Findings, weil interne Netze historisch weniger gehärtet sind.",
  },
  {
    q: "Wie prüfe ich, ob ein Pentester wirklich kompetent ist?",
    a: "Fünf Rückfragen reichen aus: Welche praktischen Zertifikate haben die konkret eingesetzten Tester? Gibt es einen geschwärzten Musterbericht? Welche Referenzprojekte in vergleichbaren Umgebungen existieren? Nach welcher Methodik wird getestet - OWASP WSTG, PTES, BSI-Praxis-Leitfaden? Und: Was findet ein Mensch, was ein Scanner nicht findet? Wer die letzte Frage konkret beantwortet, testet in der Regel wirklich manuell.",
  },
  {
    q: "Brauche ich einen Pentester mit Branchenerfahrung?",
    a: "Zwingend ist Branchenerfahrung nicht, sie verkürzt aber die Einarbeitung und verbessert die Bewertung der Findings. Wer Zahlungsprozesse, Patientendaten oder Fertigungsnetze schon getestet hat, kennt die typischen Fehlerbilder und die jeweilige Regulierung - DORA im Finanzsektor, MDR im Medizinprodukte-Bereich, TISAX in der Automobilindustrie. Das spart Erklärungsaufwand auf beiden Seiten.",
  },
  {
    q: "Kann die eigene IT-Abteilung den Penetrationstest durchführen?",
    a: "Möglich ist es, sinnvoll selten. Wer eine Umgebung selbst konzipiert und betreibt, testet gegen die eigenen Annahmen und übersieht genau die blinden Flecken, die ein Angreifer sucht. Das BSI empfiehlt deshalb externe, unabhängige Prüfer, die weder an der Konzeption noch am Betrieb der geprüften Systeme mitgewirkt haben. Für Audit-Nachweise ist die Unabhängigkeit ohnehin Voraussetzung.",
  },
  {
    q: "Wie lange sind Pentest-Ergebnisse aussagekräftig?",
    a: "Ein Penetrationstest ist eine Momentaufnahme des Testzeitpunkts. Nach jeder größeren Architektur- oder Release-Änderung verliert das Ergebnis an Aussagekraft, weil neue Angriffsfläche entsteht. Das BSI empfiehlt vollständige Wiederholungsprüfungen alle zwei bis drei Jahre; bei hohem Schutzbedarf oder agiler Entwicklung testen Unternehmen in der Praxis jährlich. Der Retest nach der Behebung ersetzt keine Wiederholungsprüfung.",
  },
  {
    q: "Woran erkenne ich einen seriösen Pentest-Dienstleister?",
    a: "An fünf Punkten: (1) Tester mit praktischen Zertifikaten wie OSCP, OSWE oder OSEP, namentlich benannt. (2) Dokumentierte Methodik nach OWASP, PTES oder BSI-Praxis-Leitfaden. (3) Geschwärzter Musterbericht mit Management Summary und CVSS-Bewertung. (4) Schriftlicher Vertrag mit Scope, NDA und Haftungsregelung. (5) Retest nach der Behebung im Angebot enthalten.",
  },
  {
    q: "Brauche ich zwingend einen BSI-zertifizierten Penetrationstest-Anbieter?",
    a: "Nein. Die BSI-Zertifizierung als IS-Penetrationstest-Dienstleister ist vor allem relevant, wenn Behörden oder KRITIS-Betreiber sie in Ausschreibungen fordern. Für die meisten Unternehmen sind die Qualifikation der eingesetzten Tester (z. B. OSCP – vom BSI selbst als Praxis-Kompetenznachweis anerkannt) und eine Methodik nach BSI-Empfehlungen entscheidender als das Firmen-Zertifikat.",
  },
  {
    q: "Wie unterscheide ich einen echten Pentest von einem automatisierten Schwachstellenscan?",
    a: "Fragen Sie nach dem manuellen Anteil und nach Proof-of-Concepts im Bericht. Ein Scan liefert ungefilterte Tool-Ausgaben mit vielen False Positives; ein echter Pentest verifiziert Schwachstellen manuell, kombiniert sie zu Angriffsketten und dokumentiert nachvollziehbare PoCs. Auch der Preis ist ein Indiz: Pauschal-Angebote ohne Scoping-Gespräch deutlich unter marktüblichen Tagessätzen sind laut CODE-LEIN (unter rund 2.000 €) und Yekta IT (unter etwa 3.000 €) in der Regel automatisierte Scans - anders als bewusst eng geschnittene Festpreis-Scopes nach Scoping.",
  },
  {
    q: "Ist ein Retest nach der Behebung der Schwachstellen im Preis enthalten?",
    a: "Das sollte er sein – fragen Sie explizit danach. Ohne Nachtest fehlt der Nachweis, dass die Behebung wirksam war. Bei Sodu Secure ist der Retest der behobenen Findings kostenlos enthalten; das BSI empfiehlt darüber hinaus vollständige Wiederholungsprüfungen alle zwei bis drei Jahre.",
  },
];
