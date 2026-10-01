export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "Welche Anbieter von Cybersecurity gibt es in Deutschland?",
    a: "Der Markt teilt sich grob in drei Gruppen: große Wirtschaftsprüfungs- und Beratungshäuser, IT-Systemhäuser mit angehängtem Security-Bereich und spezialisierte Pentest-Firmen wie Sodu Secure aus Berlin. Beratungshäuser liefern viel Dokumentation, Systemhäuser prüfen oft die Systeme, die sie selbst betreiben. Spezialisierte Anbieter testen technisch in der Tiefe und sind unabhängig vom Betrieb.",
  },
  {
    q: "Woran erkenne ich eine seriöse Cybersecurity Firma?",
    a: "An vier Punkten: nachweisbare Zertifizierungen der Tester (OSCP, OSWE, CEH), ein Musterbericht vor Auftragsvergabe, ein klar definierter Scope mit Festpreis statt offener Tagessätze und Unabhängigkeit vom Betrieb Ihrer Systeme. Seriöse Anbieter nennen außerdem offen, was ihre Prüfung nicht abdeckt, und drängen nicht in Zertifikate, die Sie nicht brauchen.",
  },
  {
    q: "Was kostet eine Cybersecurity Firma?",
    a: "Ein automatisierter Schwachstellenscan ist ab 1.499 € zu haben. Ein manueller Penetrationstest wird individuell nach Aufwand kalkuliert und liegt meist zwischen 4.000 und 20.000 €, je nach Anzahl der Systeme und Prüftiefe. Kontinuierliche Überwachung mit AuditAI gibt es ab 99 € pro Monat. Welche Kombination passt, hängt davon ab, ob ein einmaliger Nachweis ansteht oder die Angriffsfläche dauerhaft unter Beobachtung bleiben soll.",
  },
  {
    q: "Welche Leistungen bietet eine Cybersecurity Firma?",
    a: "Typisch sind Penetrationstests von Web-Anwendungen, APIs, Netzwerken, Active Directory und Cloud-Umgebungen, Schwachstellenscans, Red-Team-Simulationen, Phishing-Tests sowie Compliance-Unterstützung für NIS2, ISO 27001, DSGVO und DORA. Sodu Secure deckt davon die technische Prüfung ab und verzichtet bewusst auf Betrieb und Produktvertrieb, damit die Bewertung unabhängig bleibt.",
  },
  {
    q: "Brauchen kleine und mittelständische Unternehmen eine Cybersecurity Firma?",
    a: "Ja. Angriffe laufen automatisiert und suchen nach verwundbaren Systemen, nicht nach bekannten Firmennamen. Auch KMU unterliegen der DSGVO, geraten über NIS2 als Zulieferer in die Lieferkettenanforderungen ihrer Kunden und müssen bei Cyberversicherungen Nachweise erbringen. Für den Einstieg reicht oft ein Schwachstellenscan ab 1.499 € oder ein fokussierter Pentest der externen Angriffsfläche.",
  },
  {
    q: "Welche Zertifizierungen sollte eine Cybersecurity Firma vorweisen?",
    a: "Achten Sie auf praktische Tester-Zertifizierungen: OSCP und OSWE von Offensive Security belegen bestandene Hands-on-Prüfungen, CEH deckt methodisches Grundwissen ab. Die Tester von Sodu Secure sind OSCP-, OSWE- und CEH-zertifiziert. Wichtig: ISO 27001 zertifiziert Organisationen und deren Managementsystem, nicht einzelne Personen - es ersetzt keine Tester-Qualifikation.",
  },
  {
    q: "Könnte unsere interne IT das nicht selbst machen?",
    a: "Teilweise, aber es fehlen drei Dinge: Unabhängigkeit, weil die interne IT ihre eigene Konfiguration prüfen würde, Angreiferperspektive aus hunderten Projekten und die Akzeptanz bei Auditoren, Versicherungen und Kunden, die einen externen Nachweis verlangen. Sinnvoll ist die Kombination: interne IT betreibt und behebt, ein externer Pentest prüft unabhängig.",
  },
  {
    q: "Wie lange dauert ein Projekt mit einer Cybersecurity Firma?",
    a: "Rechnen Sie vom Erstgespräch bis zum Bericht mit zwei bis vier Wochen. Zwischen Scoping und Testbeginn vergehen meist nur wenige Tage, Engpass ist in der Praxis die Bereitstellung von Testzugängen auf Ihrer Seite. Die aktive Prüfung selbst nimmt je nach Zuschnitt einige Tage bis zwei Wochen ein, bei unternehmensweiten Projekten mit Active Directory und Cloud entsprechend länger. Den Bericht erhalten Sie innerhalb von 48 Stunden nach Testabschluss, kritische Findings melden wir sofort.",
  },
  {
    q: "Wie oft sollten Penetrationstests durchgeführt werden?",
    a: "Mindestens einmal jährlich und zusätzlich nach größeren Systemänderungen, Migrationen oder neuen öffentlich erreichbaren Services. NIS2, ISO 27001 und DSGVO Art. 32 verlangen eine regelmäßige Überprüfung der Wirksamkeit Ihrer Maßnahmen. Zwischen den Tests schließen kontinuierliche Scans die Lücke, etwa mit AuditAI ab 99 € pro Monat.",
  },
  {
    q: "Arbeitet eine Cybersecurity Firma remote oder vor Ort?",
    a: "Externe Systeme, Web-Anwendungen, APIs und Cloud-Umgebungen prüfen wir vollständig remote über VPN oder Testzugänge - das spart Zeit und Reisekosten. Für interne Netzwerk- und Active-Directory-Tests, WLAN-Prüfungen oder Social-Engineering-Szenarien kommen wir von Berlin aus auch vor Ort zu Ihnen. Sodu Secure arbeitet deutschlandweit und international.",
  },
  {
    q: "Was bekommen wir von einer Cybersecurity Firma am Ende konkret geliefert?",
    a: "Einen Bericht mit Management-Zusammenfassung für die Geschäftsführung, jedem Finding mit CVSS-Bewertung, Nachweis und konkreter Behebungsempfehlung sowie einer nach Risiko sortierten Maßnahmenliste. Sodu Secure liefert ihn in Deutsch und Englisch und prüft die behobenen Punkte danach ohne Aufpreis nach. Damit lässt sich der erreichte Stand gegenüber Auditoren, Kunden und Versicherern belegen, ohne dass Sie den Erstbericht mit offenen Findings herausgeben müssen.",
  },
];
