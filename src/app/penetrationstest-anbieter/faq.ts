export type ProviderFaq = { q: string; a: string };

export const FAQS: ProviderFaq[] = [
  {
    q: "Wie viel kostet ein seriöser Penetrationstest?",
    a: "Es kommt auf den Scope an. Ein automatisierter Schwachstellenscan startet ab 1.499 €. Ein manueller Pentest wird individuell auf das Projekt zugeschnitten und nach Aufwand und Tagessätzen kalkuliert - meist 4.000 bis 20.000 €, Enterprise-Projekte auch darüber. Deutlich billigere Angebote = meist unseriös oder nur ein Scan.",
  },
  {
    q: "Was ist der Unterschied zwischen internem und externem Penetrationstest?",
    a: "Extern: Angriff von außen (Internet). Intern: Angriff von innerhalb des Netzwerks. Intern findet oft mehr Probleme, weil der Attacker schon 'ins Netzwerk gekommen' ist.",
  },
  {
    q: "Wie prüfe ich, ob ein Pentester wirklich kompetent ist?",
    a: "Fragen: (1) Welche Zertifizierungen? (2) Sample-Reports? (3) Referenzen? (4) Beschreibt die Methodik – OWASP, PTES? (5) Findet manuell, nicht nur mit Tools?",
  },
  {
    q: "Brauche ich einen Pentester mit Branchenerfahrung?",
    a: "Nicht unbedingt, aber hilfreich. Fin-Tech Pentest ist anders als Healthcare Pentest. Mit Branchenerfahrung: bessere Findings, weniger Missverständnisse.",
  },
  {
    q: "Kann ich meinen eigenen IT-Admin einen Pentest machen lassen?",
    a: "Theoretisch ja, praktisch nein. IT-Admin kennt die Infrastruktur – kann nicht 'angreifen' wie ein Außenstehender. Auch das BSI empfiehlt grundsätzlich externe, unabhängige Prüfer, die nicht an Konzeption oder Betrieb der getesteten Systeme mitgewirkt haben.",
  },
  {
    q: "Wie lange sind Pentest-Ergebnisse 'gültig'?",
    a: "Nicht lange! Nach 3–6 Monaten sollte ein Retest durchgeführt werden, da neue Schwachstellen entstehen. Nach größeren Änderungen: sofort retest. Das BSI empfiehlt vollständige Wiederholungsprüfungen alle 2–3 Jahre.",
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
