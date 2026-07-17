/**
 * Sodu Secure Wiki – Wissensdatenbank zu Regulierungen, Standards und Compliance.
 *
 * WICHTIG (SEO): Alle Wiki-Seiten sind bewusst auf noindex gesetzt und stehen
 * NICHT in der Sitemap, damit sie nicht mit den Landingpages konkurrieren.
 * Neue Artikel einfach unten ans Array anhängen – die Route /wiki/[slug]
 * rendert sie automatisch.
 */

export interface WikiSource {
  label: string;
  url: string;
}

export interface WikiSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface WikiArticle {
  slug: string;
  title: string;
  /** Kurzbeschreibung für die Hub-Karte */
  short: string;
  category: "EU-Regulierung" | "Deutschland" | "Standards & Zertifizierung" | "Branchen";
  badge: string;
  updated: string;
  intro: string[];
  facts: { label: string; value: string }[];
  sections: WikiSection[];
  /** "So setzen Sie es um" – Schritt-für-Schritt */
  steps: { title: string; desc: string }[];
  penalties?: string;
  pentestNote: string;
  service?: { href: string; label: string };
  sources: WikiSource[];
}

export const wikiArticles: WikiArticle[] = [
  // ── EU-Regulierung ────────────────────────────────────────────────────────
  {
    slug: "nis2",
    title: "NIS2 – Netz- und Informationssicherheitsrichtlinie",
    short: "EU-weite Cybersicherheitspflichten für 18 Sektoren: Risikomanagement, Meldepflichten, Geschäftsleitungshaftung.",
    category: "EU-Regulierung",
    badge: "Richtlinie (EU) 2022/2555",
    updated: "2026-07-17",
    intro: [
      "NIS2 ist die zweite EU-Richtlinie zur Netz- und Informationssicherheit (Richtlinie (EU) 2022/2555). Sie ist am 16. Januar 2023 in Kraft getreten und musste bis zum 17. Oktober 2024 in nationales Recht umgesetzt werden. In Deutschland erfolgt die Umsetzung über das NIS2-Umsetzungs- und Cybersicherheitsstärkungsgesetz (NIS2UmsuCG), das das BSI-Gesetz umfassend novelliert.",
      "Im Vergleich zur ersten NIS-Richtlinie wird der Anwendungsbereich massiv ausgeweitet: Statt weniger kritischer Infrastrukturen sind nun 18 Sektoren erfasst – von Energie und Transport über digitale Dienste bis zu produzierendem Gewerbe und Lebensmitteln. Nach BSI-Schätzungen fallen in Deutschland rund 30.000 Unternehmen unter die neuen Pflichten.",
    ],
    facts: [
      { label: "Rechtsakt", value: "Richtlinie (EU) 2022/2555" },
      { label: "Umsetzungsfrist", value: "17. Oktober 2024" },
      { label: "Betroffen (DE)", value: "ca. 30.000 Unternehmen" },
    ],
    sections: [
      {
        heading: "Wer ist betroffen?",
        paragraphs: [
          "NIS2 unterscheidet zwischen „wesentlichen Einrichtungen“ (Anhang I, z. B. Energie, Verkehr, Banken, Gesundheit, digitale Infrastruktur) und „wichtigen Einrichtungen“ (Anhang II, z. B. Post, Abfall, Chemie, Lebensmittel, verarbeitendes Gewerbe, digitale Dienste). Als Grundregel gilt die Size-Cap-Regel: erfasst sind Unternehmen ab 50 Mitarbeitenden oder mehr als 10 Mio. € Jahresumsatz – unabhängig davon in Sonderfällen (z. B. DNS-Dienste, Vertrauensdienste) auch kleinere Anbieter.",
        ],
      },
      {
        heading: "Die Kernpflichten (Art. 20, 21, 23)",
        bullets: [
          "Risikomanagement (Art. 21): mindestens 10 Maßnahmenbereiche, u. a. Risikoanalyse, Incident-Handling, Business Continuity, Lieferkettensicherheit, Kryptografie, Zugriffskontrolle und Schwachstellenmanagement.",
          "Meldepflichten (Art. 23): Frühwarnung an die Behörde binnen 24 Stunden, vollständige Meldung binnen 72 Stunden, Abschlussbericht nach spätestens einem Monat.",
          "Governance (Art. 20): Die Geschäftsleitung muss die Maßnahmen billigen, ihre Umsetzung überwachen und an Schulungen teilnehmen – bei Verstößen haftet sie persönlich.",
          "Registrierungspflicht bei der zuständigen Behörde (in Deutschland: BSI).",
        ],
      },
    ],
    steps: [
      { title: "Betroffenheit prüfen", desc: "Mit der BSI-Betroffenheitsprüfung klären, ob Ihr Unternehmen als wesentliche oder wichtige Einrichtung gilt." },
      { title: "Gap-Analyse durchführen", desc: "Ist-Stand der Sicherheitsmaßnahmen gegen die 10 Maßnahmenbereiche aus Art. 21 Abs. 2 abgleichen." },
      { title: "Risikomanagement aufbauen", desc: "Risikoanalyse, Richtlinien, Incident-Response-Plan und Business-Continuity-Konzept dokumentieren." },
      { title: "Technische Maßnahmen umsetzen", desc: "MFA, Verschlüsselung, Netzsegmentierung, Backup-Konzept und Schwachstellenmanagement etablieren." },
      { title: "Wirksamkeit nachweisen", desc: "Regelmäßige Penetrationstests und Audits belegen die Wirksamkeit der Maßnahmen (Art. 21 Abs. 2 lit. f)." },
      { title: "Meldeprozesse einrichten", desc: "24h/72h-Meldeketten definieren, Verantwortliche benennen, Meldewege zum BSI testen." },
    ],
    penalties: "Bußgelder bis 10 Mio. € oder 2 % des weltweiten Jahresumsatzes (wesentliche Einrichtungen) bzw. bis 7 Mio. € oder 1,4 % (wichtige Einrichtungen). Zusätzlich: persönliche Haftung der Geschäftsleitung und mögliche vorübergehende Untersagung von Leitungsfunktionen.",
    pentestNote: "Art. 21 Abs. 2 lit. f NIS2 verlangt „Konzepte und Verfahren zur Bewertung der Wirksamkeit von Risikomanagementmaßnahmen“ – regelmäßige Penetrationstests sind der anerkannte Weg, diesen Nachweis zu erbringen.",
    service: { href: "/nis2", label: "NIS2-Compliance mit Sodu Secure" },
    sources: [
      { label: "Richtlinie (EU) 2022/2555 im EU-Amtsblatt (EUR-Lex)", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32022L2555" },
      { label: "BSI: NIS-2-Regulierung – Informationen für Unternehmen", url: "https://www.bsi.bund.de/DE/Das-BSI/Auftrag/Gesetze-und-Verordnungen/NIS-Richtlinien/nis-richtlinien_node.html" },
      { label: "BSI: NIS-2-Betroffenheitsprüfung", url: "https://www.bsi.bund.de/DE/Das-BSI/Auftrag/Gesetze-und-Verordnungen/NIS-Richtlinien/NIS-2-regulierte-Unternehmen/NIS-2-Betroffenheitspruefung/nis-2-betroffenheitspruefung_node.html" },
      { label: "BMI: NIS2-Umsetzungs- und Cybersicherheitsstärkungsgesetz", url: "https://www.bmi.bund.de/SharedDocs/gesetzgebungsverfahren/DE/nis2umsucg.html" },
      { label: "ENISA: NIS2 Directive – Technical Implementation Guidance", url: "https://www.enisa.europa.eu/topics/cybersecurity-policy/nis-directive-2" },
    ],
  },
  {
    slug: "dsgvo",
    title: "DSGVO – Datenschutz-Grundverordnung",
    short: "EU-Datenschutzrecht seit 2018: technische und organisatorische Maßnahmen (Art. 32), Meldepflichten, Bußgelder bis 4 % des Umsatzes.",
    category: "EU-Regulierung",
    badge: "Verordnung (EU) 2016/679",
    updated: "2026-07-17",
    intro: [
      "Die Datenschutz-Grundverordnung (Verordnung (EU) 2016/679) gilt seit dem 25. Mai 2018 unmittelbar in allen EU-Mitgliedstaaten. Sie regelt die Verarbeitung personenbezogener Daten und verpflichtet Verantwortliche und Auftragsverarbeiter zu einem risikobasierten Schutz – einschließlich nachweisbarer technischer und organisatorischer Maßnahmen (TOM).",
      "Für die IT-Sicherheit ist vor allem Art. 32 DSGVO zentral: Er fordert ein dem Risiko angemessenes Schutzniveau – ausdrücklich inklusive eines „Verfahrens zur regelmäßigen Überprüfung, Bewertung und Evaluierung der Wirksamkeit der technischen und organisatorischen Maßnahmen“ (Art. 32 Abs. 1 lit. d).",
    ],
    facts: [
      { label: "Rechtsakt", value: "Verordnung (EU) 2016/679" },
      { label: "Gültig seit", value: "25. Mai 2018" },
      { label: "Max. Bußgeld", value: "20 Mio. € / 4 % Umsatz" },
    ],
    sections: [
      {
        heading: "Die wichtigsten Sicherheitspflichten",
        bullets: [
          "Art. 32 – Sicherheit der Verarbeitung: Pseudonymisierung/Verschlüsselung, Vertraulichkeit, Integrität, Verfügbarkeit, Belastbarkeit und regelmäßige Wirksamkeitsüberprüfung der Maßnahmen.",
          "Art. 33 – Meldung von Datenschutzverletzungen an die Aufsichtsbehörde binnen 72 Stunden.",
          "Art. 34 – Benachrichtigung betroffener Personen bei hohem Risiko.",
          "Art. 35 – Datenschutz-Folgenabschätzung (DSFA) bei voraussichtlich hohem Risiko.",
          "Art. 30 – Verzeichnis von Verarbeitungstätigkeiten (VVT) als Nachweisgrundlage.",
          "Art. 28 – Auftragsverarbeitung: AV-Vertrag mit Dienstleistern, die personenbezogene Daten verarbeiten.",
        ],
      },
      {
        heading: "Stand der Technik",
        paragraphs: [
          "Die DSGVO verlangt Maßnahmen „unter Berücksichtigung des Stands der Technik“. Orientierung geben die Kurzpapiere der Datenschutzkonferenz (DSK), die Leitlinien des Europäischen Datenschutzausschusses (EDSA/EDPB) sowie die Handreichungen von TeleTrusT zum Stand der Technik. Faktisch bedeutet das: aktuelle Verschlüsselung, Härtung, Patch-Management und regelmäßige Sicherheitstests.",
        ],
      },
    ],
    steps: [
      { title: "Datenlandkarte erstellen", desc: "Verarbeitungstätigkeiten erfassen (Art. 30 VVT): Welche personenbezogenen Daten liegen wo, wer greift zu?" },
      { title: "Risiken bewerten", desc: "Schutzbedarf und Risiken je Verarbeitung bewerten; bei hohem Risiko DSFA nach Art. 35 durchführen." },
      { title: "TOMs definieren und umsetzen", desc: "Verschlüsselung, Zugriffskontrolle, Backup, Logging – dokumentiert als TOM-Katalog." },
      { title: "Dienstleister vertraglich binden", desc: "AV-Verträge (Art. 28) mit allen Auftragsverarbeitern schließen und deren Maßnahmen prüfen." },
      { title: "Wirksamkeit regelmäßig testen", desc: "Art. 32 Abs. 1 lit. d umsetzen: Penetrationstests und Audits in festen Intervallen, Ergebnisse dokumentieren." },
      { title: "Incident-Prozess aufsetzen", desc: "72h-Meldeprozess (Art. 33) mit Verantwortlichkeiten, Vorlagen und Kontakt zur Aufsichtsbehörde etablieren." },
    ],
    penalties: "Bußgelder bis 20 Mio. € oder 4 % des weltweiten Jahresumsatzes (je nachdem, welcher Wert höher ist). Verstöße gegen Art. 32 werden mit bis zu 10 Mio. € bzw. 2 % geahndet. Hinzu kommen Schadensersatzansprüche Betroffener nach Art. 82.",
    pentestNote: "Ein Penetrationstest ist das etablierte „Verfahren zur regelmäßigen Überprüfung“ im Sinne von Art. 32 Abs. 1 lit. d DSGVO – der Prüfbericht dient gegenüber Aufsichtsbehörden als Wirksamkeitsnachweis der TOMs.",
    service: { href: "/penetration-testing", label: "DSGVO-konformer Penetrationstest" },
    sources: [
      { label: "Verordnung (EU) 2016/679 (DSGVO) auf EUR-Lex", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32016R0679" },
      { label: "BfDI – Der Bundesbeauftragte für den Datenschutz", url: "https://www.bfdi.bund.de/DE/Home/home_node.html" },
      { label: "Datenschutzkonferenz (DSK): Kurzpapiere und Orientierungshilfen", url: "https://www.datenschutzkonferenz-online.de/orientierungshilfen.html" },
      { label: "EDPB (Europäischer Datenschutzausschuss): Guidelines", url: "https://www.edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_de" },
      { label: "TeleTrusT: Handreichung zum Stand der Technik", url: "https://www.teletrust.de/publikationen/broschueren/stand-der-technik/" },
    ],
  },
  {
    slug: "dora",
    title: "DORA – Digital Operational Resilience Act",
    short: "Digitale Resilienz für den Finanzsektor: IKT-Risikomanagement, Meldewesen und verpflichtende Resilienz-Tests inkl. TLPT.",
    category: "EU-Regulierung",
    badge: "Verordnung (EU) 2022/2554",
    updated: "2026-07-17",
    intro: [
      "Der Digital Operational Resilience Act (Verordnung (EU) 2022/2554) gilt seit dem 17. Januar 2025 unmittelbar für nahezu den gesamten europäischen Finanzsektor – von Banken und Versicherungen über Wertpapierfirmen bis zu Krypto-Dienstleistern – sowie für kritische IKT-Drittdienstleister.",
      "DORA harmonisiert die Anforderungen an die digitale Betriebsstabilität und ersetzt bzw. ergänzt bestehende Aufsichtsanforderungen wie BAIT und VAIT. Zuständige Aufsicht in Deutschland ist die BaFin.",
    ],
    facts: [
      { label: "Rechtsakt", value: "Verordnung (EU) 2022/2554" },
      { label: "Anwendbar seit", value: "17. Januar 2025" },
      { label: "Aufsicht (DE)", value: "BaFin" },
    ],
    sections: [
      {
        heading: "Die fünf Säulen von DORA",
        bullets: [
          "IKT-Risikomanagement (Art. 5–16): Governance, Schutz, Erkennung, Wiederherstellung und Lernen aus Vorfällen.",
          "Meldung IKT-bezogener Vorfälle (Art. 17–23): Klassifizierung und fristgebundene Meldung schwerwiegender Vorfälle an die Aufsicht.",
          "Testen der digitalen Betriebsstabilität (Art. 24–27): jährliches Testprogramm; für bedeutende Institute bedrohungsorientierte Penetrationstests (TLPT) mindestens alle drei Jahre.",
          "IKT-Drittparteienrisiko (Art. 28–44): Vertragsanforderungen, Konzentrationsrisiken, Überwachungsrahmen für kritische Anbieter.",
          "Informationsaustausch (Art. 45): freiwilliger Austausch von Cyber-Bedrohungsinformationen.",
        ],
      },
      {
        heading: "Resilienz-Tests im Detail",
        paragraphs: [
          "Art. 25 verlangt ein risikobasiertes Testprogramm, das u. a. Schwachstellenscans, Open-Source-Analysen, Netzwerksicherheitsbewertungen, physische Sicherheitsprüfungen, szenariobasierte Tests und Penetrationstests umfasst. Für als bedeutend eingestufte Finanzunternehmen kommen TLPT nach dem TIBER-EU-Rahmenwerk hinzu – durchgeführt auf kritischen Live-Systemen.",
        ],
      },
    ],
    steps: [
      { title: "Anwendbarkeit klären", desc: "Prüfen, unter welche der 21 Finanzunternehmens-Kategorien Ihr Institut fällt und ob Verhältnismäßigkeits-Erleichterungen greifen." },
      { title: "IKT-Risikorahmen dokumentieren", desc: "Governance, Rollen, Asset-Inventar, Schutzmaßnahmen und Wiederanlaufpläne nach Art. 5–16 aufbauen." },
      { title: "Vorfalls-Klassifizierung einführen", desc: "Kriterien und Meldeketten für schwerwiegende IKT-Vorfälle gemäß den technischen Standards (RTS) der ESAs umsetzen." },
      { title: "Testprogramm aufsetzen", desc: "Jährliche Tests aller kritischen Systeme planen – inkl. Penetrationstests und szenariobasierter Übungen (Art. 25)." },
      { title: "Drittparteien-Register führen", desc: "Informationsregister aller IKT-Dienstleister pflegen und Verträge um DORA-Pflichtklauseln (Art. 30) ergänzen." },
      { title: "TLPT vorbereiten (falls bedeutend)", desc: "Scoping mit der Aufsicht abstimmen und bedrohungsorientierte Tests nach TIBER-Methodik alle 3 Jahre einplanen." },
    ],
    penalties: "Die Sanktionen legen die Mitgliedstaaten fest; die BaFin kann Anordnungen, Zwangsgelder und Bußgelder verhängen. Für kritische IKT-Drittdienstleister sieht DORA Zwangsgelder von bis zu 1 % des durchschnittlichen weltweiten Tagesumsatzes vor (Art. 35).",
    pentestNote: "DORA macht Penetrationstests explizit zur Pflicht: Art. 24–25 verlangen sie als Teil des jährlichen Testprogramms, Art. 26–27 regeln TLPT für bedeutende Institute. Ein dokumentierter, methodisch sauberer Pentest ist damit direkter Compliance-Baustein.",
    service: { href: "/dora", label: "DORA-Compliance mit Sodu Secure" },
    sources: [
      { label: "Verordnung (EU) 2022/2554 (DORA) auf EUR-Lex", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32022R2554" },
      { label: "BaFin: DORA – Digital Operational Resilience Act", url: "https://www.bafin.de/DE/Aufsicht/DORA/DORA_node.html" },
      { label: "ESAs: Joint Technical Standards zu DORA (EBA)", url: "https://www.eba.europa.eu/regulation-and-policy/digital-operational-resilience-act-dora" },
      { label: "ECB: TIBER-EU Framework (Grundlage für TLPT)", url: "https://www.ecb.europa.eu/paym/cyber-resilience/tiber-eu/html/index.en.html" },
      { label: "Deutsche Bundesbank: TIBER-DE", url: "https://www.bundesbank.de/de/aufgaben/unbarer-zahlungsverkehr/tiber-de" },
    ],
  },
  {
    slug: "mdr",
    title: "MDR – Medical Device Regulation",
    short: "EU-Medizinprodukteverordnung: Cybersecurity-Anforderungen für Software als Medizinprodukt nach Anhang I und MDCG 2019-16.",
    category: "EU-Regulierung",
    badge: "Verordnung (EU) 2017/745",
    updated: "2026-07-17",
    intro: [
      "Die Medical Device Regulation (Verordnung (EU) 2017/745) gilt seit dem 26. Mai 2021 und regelt das Inverkehrbringen von Medizinprodukten in der EU – einschließlich Software, die eigenständig als Medizinprodukt gilt (Software as a Medical Device).",
      "Cybersicherheit ist dabei Zulassungsvoraussetzung: Anhang I der MDR (Grundlegende Sicherheits- und Leistungsanforderungen) verlangt in Abschnitt 17.2, dass Software nach dem Stand der Technik entwickelt wird – ausdrücklich inklusive IT-Sicherheit. Die Leitlinie MDCG 2019-16 konkretisiert, wie Hersteller Cybersecurity über den gesamten Lebenszyklus nachweisen müssen.",
    ],
    facts: [
      { label: "Rechtsakt", value: "Verordnung (EU) 2017/745" },
      { label: "Gültig seit", value: "26. Mai 2021" },
      { label: "Security-Leitlinie", value: "MDCG 2019-16" },
    ],
    sections: [
      {
        heading: "Cybersecurity-Anforderungen der MDR",
        bullets: [
          "Anhang I, 17.2: Entwicklung nach dem Stand der Technik – Lebenszyklus, Risikomanagement, Verifizierung und Validierung inkl. IT-Sicherheit.",
          "Anhang I, 17.4: Hersteller müssen Mindestanforderungen an Hardware, IT-Netze und IT-Sicherheitsmaßnahmen der Betriebsumgebung festlegen.",
          "Post-Market Surveillance (Art. 83 ff.): Schwachstellen müssen auch nach Markteinführung überwacht und behoben werden.",
          "Vigilanz (Art. 87 ff.): Schwerwiegende Vorkommnisse – auch security-bedingte – sind meldepflichtig.",
          "MDCG 2019-16 verlangt u. a. Threat Modeling, Security-Risk-Management, Security-Testing (inkl. Penetrationstests) und einen koordinierten Umgang mit Schwachstellen.",
        ],
      },
      {
        heading: "Relevante Normen",
        paragraphs: [
          "Für den Nachweis haben sich IEC 81001-5-1 (Security-Aktivitäten im Software-Lebenszyklus für Health Software), ISO 14971 (Risikomanagement) und IEC 62304 (Software-Lebenszyklus) etabliert. Benannte Stellen prüfen die technische Dokumentation zunehmend gezielt auf Cybersecurity-Nachweise – fehlende Security-Tests sind ein häufiger Grund für Nachforderungen im Konformitätsbewertungsverfahren.",
        ],
      },
    ],
    steps: [
      { title: "Produkt klassifizieren", desc: "Prüfen, ob Ihre Software ein Medizinprodukt ist (MDCG 2019-11) und welche Risikoklasse (I–III) gilt." },
      { title: "Security-Risikomanagement aufsetzen", desc: "Threat Modeling und Security-Risikoanalyse nach ISO 14971 / IEC 81001-5-1 in die technische Dokumentation integrieren." },
      { title: "Sichere Entwicklung etablieren", desc: "Secure-Coding-Richtlinien, Code-Reviews und SBOM (Software Bill of Materials) im Entwicklungsprozess verankern." },
      { title: "Security-Tests durchführen", desc: "Penetrationstests und Schwachstellenanalysen als Verifizierungsnachweis für Anhang I 17.2 dokumentieren." },
      { title: "Begleitdokumente erstellen", desc: "Sicherheitsanforderungen an die Betriebsumgebung (Anhang I 17.4) in der Gebrauchsanweisung festhalten." },
      { title: "Post-Market-Prozess einrichten", desc: "Schwachstellen-Monitoring, Patch-Prozess und Vigilanz-Meldewege für die Zeit nach Markteinführung aufbauen." },
    ],
    penalties: "Sanktionen regeln die Mitgliedstaaten (in Deutschland: MPDG) – von Bußgeldern bis zu Vertriebsverboten. Praktisch gravierender: Ohne ausreichende Cybersecurity-Nachweise verweigert die Benannte Stelle das CE-Zertifikat, das Produkt darf nicht in Verkehr gebracht werden.",
    pentestNote: "MDCG 2019-16 nennt Penetrationstests ausdrücklich als Bestandteil der Security-Verifizierung. Ein Pentest-Bericht mit Methodik, Findings und Retest ist ein direkt verwertbarer Nachweis für die technische Dokumentation gegenüber der Benannten Stelle.",
    service: { href: "/mdr", label: "MDR-Cybersecurity mit Sodu Secure" },
    sources: [
      { label: "Verordnung (EU) 2017/745 (MDR) auf EUR-Lex", url: "https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX%3A32017R0745" },
      { label: "MDCG 2019-16: Guidance on Cybersecurity for medical devices", url: "https://health.ec.europa.eu/document/download/b45335c5-1679-4c71-a91c-fc7a4d37f12b_en" },
      { label: "BfArM: Medizinprodukte – Übersicht", url: "https://www.bfarm.de/DE/Medizinprodukte/_node.html" },
      { label: "IEC 81001-5-1: Health software – Security activities in the product life cycle", url: "https://webstore.iec.ch/publication/59543" },
      { label: "Europäische Kommission: MDCG Guidance-Dokumente", url: "https://health.ec.europa.eu/medical-devices-sector/new-regulations/guidance-mdcg-endorsed-documents-and-other-guidance_en" },
    ],
  },
  // ── Deutschland ───────────────────────────────────────────────────────────
  {
    slug: "kritis-bsig",
    title: "KRITIS & BSIG – Kritische Infrastrukturen",
    short: "BSI-Gesetz und KRITIS-Verordnung: Stand der Technik, Angriffserkennung und Nachweispflicht alle zwei Jahre (§ 8a BSIG).",
    category: "Deutschland",
    badge: "BSIG · BSI-KritisV",
    updated: "2026-07-17",
    intro: [
      "Betreiber Kritischer Infrastrukturen (KRITIS) unterliegen in Deutschland dem BSI-Gesetz (BSIG). Ob ein Unternehmen KRITIS-Betreiber ist, bestimmt die BSI-Kritisverordnung (BSI-KritisV) anhand von Anlagenkategorien und Schwellenwerten – etwa in den Sektoren Energie, Wasser, Ernährung, IT und TK, Gesundheit, Finanzen, Transport und Siedlungsabfallentsorgung.",
      "Kernpflicht ist § 8a BSIG: angemessene organisatorische und technische Vorkehrungen nach dem Stand der Technik, seit dem IT-Sicherheitsgesetz 2.0 ausdrücklich inklusive Systemen zur Angriffserkennung. Die Wirksamkeit muss dem BSI alle zwei Jahre nachgewiesen werden. Mit der NIS2-Umsetzung wird das BSIG umfassend novelliert und der Kreis der verpflichteten Unternehmen deutlich erweitert.",
    ],
    facts: [
      { label: "Rechtsgrundlage", value: "§ 8a BSIG · BSI-KritisV" },
      { label: "Nachweiszyklus", value: "alle 2 Jahre" },
      { label: "Aufsicht", value: "BSI" },
    ],
    sections: [
      {
        heading: "Die Pflichten im Überblick",
        bullets: [
          "Stand der Technik (§ 8a Abs. 1 BSIG): angemessene technische und organisatorische Vorkehrungen zum Schutz der kritischen Dienstleistung.",
          "Systeme zur Angriffserkennung (§ 8a Abs. 1a BSIG): kontinuierliche Erkennung und Abwehr von Angriffen, verpflichtend seit Mai 2023.",
          "Nachweispflicht (§ 8a Abs. 3 BSIG): Nachweis der Erfüllung alle zwei Jahre durch Audits, Prüfungen oder Zertifizierungen.",
          "Meldepflicht (§ 8b BSIG): erhebliche Störungen sind unverzüglich an das BSI zu melden; Kontaktstelle ist zu benennen.",
          "Branchenspezifische Sicherheitsstandards (B3S) können als anerkannter Prüfmaßstab genutzt werden.",
        ],
      },
    ],
    steps: [
      { title: "KRITIS-Eigenschaft prüfen", desc: "Anlagen gegen die Schwellenwerte der BSI-KritisV abgleichen – auch bei Wachstum regelmäßig neu bewerten." },
      { title: "Geltungsbereich festlegen", desc: "Kritische Dienstleistung und die dafür nötigen Systeme (inkl. OT) sauber abgrenzen." },
      { title: "B3S oder ISO 27001 als Rahmen wählen", desc: "Branchenspezifischen Sicherheitsstandard oder ISMS als Grundlage für den § 8a-Nachweis nutzen." },
      { title: "Angriffserkennung umsetzen", desc: "SIEM/IDS nach der BSI-Orientierungshilfe zur Angriffserkennung einführen und Reifegrad dokumentieren." },
      { title: "Wirksamkeit prüfen lassen", desc: "Penetrationstests und § 8a-Audits durch prüfende Stellen; Mängel mit Umsetzungsplan nacharbeiten." },
      { title: "Nachweis fristgerecht einreichen", desc: "Alle zwei Jahre Nachweisdokumente ans BSI übermitteln und Meldewege aktuell halten." },
    ],
    penalties: "Bußgelder nach § 14 BSIG: je nach Verstoß bis zu 2 Mio. € (bei fehlenden Vorkehrungen oder Nachweisen), i. V. m. § 30 OWiG gegen Unternehmen bis zu 20 Mio. €. Mit der NIS2-Novelle steigen die Rahmen auf bis zu 10 Mio. € bzw. 2 % des weltweiten Umsatzes.",
    pentestNote: "Penetrationstests sind fester Bestandteil der § 8a-Nachweisprüfung: Sie belegen den „Stand der Technik“ gegenüber prüfender Stelle und BSI – insbesondere für extern erreichbare Systeme und die Netztrennung zwischen IT und OT.",
    service: { href: "/bsig", label: "BSIG/KRITIS-Unterstützung von Sodu Secure" },
    sources: [
      { label: "BSI-Gesetz (BSIG) auf gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/bsig_2009/" },
      { label: "BSI-Kritisverordnung (BSI-KritisV)", url: "https://www.gesetze-im-internet.de/bsi-kritisv/" },
      { label: "BSI: KRITIS – Kritische Infrastrukturen", url: "https://www.bsi.bund.de/DE/Themen/KRITIS-und-regulierte-Unternehmen/Kritische-Infrastrukturen/kritische-infrastrukturen_node.html" },
      { label: "BSI: Orientierungshilfe zum Einsatz von Systemen zur Angriffserkennung", url: "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/KRITIS/oh-sza.html" },
      { label: "OpenKRITIS: Übersicht KRITIS-Regulierung (unabhängiges Fachportal)", url: "https://www.openkritis.de/" },
    ],
  },
  {
    slug: "bsi-tr-03161",
    title: "BSI TR-03161 – Sicherheit für Gesundheits-Apps",
    short: "Technische Richtlinie des BSI für DiGA/DiPA: verbindliche Sicherheitsanforderungen für Apps, Web-Frontends und Backends.",
    category: "Deutschland",
    badge: "BSI TR-03161 · § 139e SGB V",
    updated: "2026-07-17",
    intro: [
      "Die Technische Richtlinie BSI TR-03161 „Anforderungen an Anwendungen im Gesundheitswesen“ definiert Sicherheitsanforderungen für digitale Gesundheitsanwendungen. Sie gliedert sich in drei Teile: Teil 1 für mobile Anwendungen, Teil 2 für Web-Anwendungen und Teil 3 für Hintergrundsysteme (Backends/APIs).",
      "Für Hersteller von DiGA (digitale Gesundheitsanwendungen nach § 139e SGB V) und DiPA ist die Erfüllung verpflichtend: Die DiGA-Verordnung (DiGAV) verlangt den Nachweis der Anforderungen, seit 2025 in Form eines BSI-Zertifikats nach TR-03161 als Voraussetzung für die Aufnahme ins DiGA-Verzeichnis des BfArM.",
    ],
    facts: [
      { label: "Herausgeber", value: "BSI" },
      { label: "Struktur", value: "3 Teile (App, Web, Backend)" },
      { label: "Pflicht für", value: "DiGA & DiPA" },
    ],
    sections: [
      {
        heading: "Was die Richtlinie fordert",
        bullets: [
          "Sichere Architektur und Zweckbindung: Datensparsamkeit, klare Trennung sensibler Funktionen, dokumentierte Bedrohungsmodelle.",
          "Kryptografie nach BSI TR-02102: aktuelle Algorithmen und Protokolle für Speicherung und Transport (TLS).",
          "Authentifizierung und Session-Management: starke Verfahren, sichere Token-Behandlung, Schutz vor Brute-Force.",
          "Plattform-Sicherheit: sichere Nutzung von iOS/Android-APIs, Schutz lokaler Daten, Umgang mit Berechtigungen.",
          "Resilienz der Backends: Härtung, Eingabevalidierung, Logging und Schwachstellenmanagement für alle Hintergrundsysteme.",
        ],
      },
    ],
    steps: [
      { title: "Scope bestimmen", desc: "Festlegen, welche Teile der TR (1/2/3) Ihre Anwendungskomponenten abdecken müssen." },
      { title: "Gap-Analyse gegen den Prüfkatalog", desc: "Jede Anforderung der relevanten Teile mit dem Ist-Stand abgleichen und Lücken priorisieren." },
      { title: "Maßnahmen umsetzen", desc: "Kryptografie, Authentifizierung, Datenhaltung und Backend-Härtung auf TR-Niveau bringen." },
      { title: "Vorbereitende Sicherheitsprüfung", desc: "Penetrationstest entlang der TR-03161-Prüfaspekte, um Findings vor der offiziellen Prüfung zu beheben." },
      { title: "Zertifizierung durchlaufen", desc: "Prüfung bei einer vom BSI anerkannten Prüfstelle beauftragen; Zertifikat beim BfArM-Antrag einreichen." },
      { title: "Aufrechterhaltung planen", desc: "Re-Zertifizierung, Patch-Prozesse und Monitoring für Folgeversionen von Beginn an einplanen." },
    ],
    penalties: "Ohne Nachweis keine Aufnahme bzw. Streichung aus dem DiGA-Verzeichnis (§ 139e SGB V i. V. m. DiGAV) – damit entfällt die Erstattungsfähigkeit durch die gesetzlichen Krankenkassen. Zusätzlich drohen bei Datenpannen DSGVO-Bußgelder, da Gesundheitsdaten besonders geschützt sind (Art. 9 DSGVO).",
    pentestNote: "Eine vorbereitende Sicherheitsprüfung entlang der TR-03161-Prüfaspekte deckt Findings auf, bevor die offizielle BSI-Prüfstelle sie findet – das spart teure Prüfschleifen und beschleunigt die DiGA-Zulassung.",
    service: { href: "/bsi-tr-03161", label: "TR-03161-Vorbereitung mit Sodu Secure" },
    sources: [
      { label: "BSI: Technische Richtlinie TR-03161", url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr03161/tr03161_node.html" },
      { label: "§ 139e SGB V (DiGA-Verzeichnis) auf gesetze-im-internet.de", url: "https://www.gesetze-im-internet.de/sgb_5/__139e.html" },
      { label: "DiGA-Verordnung (DiGAV)", url: "https://www.gesetze-im-internet.de/digav/" },
      { label: "BfArM: DiGA-Leitfaden", url: "https://www.bfarm.de/DE/Medizinprodukte/Aufgaben/DiGA-und-DiPA/DiGA/_node.html" },
      { label: "BSI TR-02102: Kryptographische Verfahren (Referenz der TR-03161)", url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/Technische-Richtlinien/TR-nach-Thema-sortiert/tr02102/tr02102_node.html" },
    ],
  },
  {
    slug: "bsi-c5",
    title: "BSI C5 – Cloud Computing Compliance Criteria",
    short: "Der BSI-Kriterienkatalog für sichere Cloud-Dienste: 121 Kriterien, Typ-1/Typ-2-Testate – Pflicht für Gesundheitsdaten in der Cloud.",
    category: "Deutschland",
    badge: "C5:2020 · § 393 SGB V",
    updated: "2026-07-17",
    intro: [
      "Der Cloud Computing Compliance Criteria Catalogue (C5) des BSI ist der deutsche De-facto-Standard für die Sicherheit von Cloud-Diensten. Die aktuelle Fassung C5:2020 umfasst 121 Kriterien in 17 Themenbereichen – von Organisation und Personal über Identitätsmanagement bis zu Umgang mit Schwachstellen.",
      "Der Nachweis erfolgt durch ein Testat eines Wirtschaftsprüfers nach ISAE 3000: Typ 1 bestätigt die Angemessenheit der Kontrollen zu einem Stichtag, Typ 2 zusätzlich deren Wirksamkeit über einen Zeitraum. Besondere Relevanz hat C5 im Gesundheitswesen: § 393 SGB V verlangt für die Verarbeitung von Sozial- und Gesundheitsdaten in der Cloud ein aktuelles C5-Testat.",
    ],
    facts: [
      { label: "Herausgeber", value: "BSI (C5:2020)" },
      { label: "Umfang", value: "121 Kriterien / 17 Bereiche" },
      { label: "Nachweis", value: "ISAE-3000-Testat (Typ 1/2)" },
    ],
    sections: [
      {
        heading: "Die 17 Themenbereiche (Auswahl)",
        bullets: [
          "OIS – Organisation der Informationssicherheit und Sicherheitsrichtlinien.",
          "IDM – Identitäts- und Berechtigungsmanagement inkl. MFA für privilegierte Zugriffe.",
          "OPS – Betrieb: Logging, Monitoring, Schwachstellen- und Patch-Management.",
          "DEV – Beschaffung, Entwicklung und Änderung von Systemen (sichere Entwicklung, Security-Tests).",
          "SIM – Security Incident Management mit definierten Reaktionsprozessen.",
          "BCM – Betriebskontinuität und Notfallmanagement.",
          "Zusätzlich: kundenspezifische Transparenzangaben (Jurisdiktion, Subunternehmer, Datenstandorte).",
        ],
      },
    ],
    steps: [
      { title: "Anwendbarkeit klären", desc: "Prüfen, ob Sie als Cloud-Anbieter ein Testat brauchen (z. B. wegen § 393 SGB V oder Kundenanforderungen)." },
      { title: "Scope definieren", desc: "Dienste, Standorte und Subdienstleister festlegen, die das Testat abdecken soll." },
      { title: "Readiness-Assessment", desc: "Gap-Analyse gegen alle 121 Kriterien; Kontrollbeschreibungen und Nachweise vorbereiten." },
      { title: "Kontrollen härten", desc: "Lücken schließen – typisch: Schwachstellenmanagement, Logging, Notfalltests und Lieferantensteuerung." },
      { title: "Sicherheitstests belegen", desc: "Regelmäßige Penetrationstests als Nachweis für die OPS-/DEV-Kriterien dokumentieren." },
      { title: "Testat beauftragen", desc: "Wirtschaftsprüfer für ISAE-3000-Prüfung mandatieren; erst Typ 1, im Folgejahr Typ 2 anstreben." },
    ],
    penalties: "C5 selbst ist kein Gesetz – aber ohne Testat verlieren Sie Ausschreibungen und dürfen bestimmte Daten nicht verarbeiten: § 393 SGB V macht das C5-Testat zur Zulassungsvoraussetzung für Cloud-Dienste im Gesundheitswesen; die öffentliche Hand fordert C5 regelmäßig in Vergaben.",
    pentestNote: "Mehrere C5-Kriterien (u. a. OPS-18 ff. zum Schwachstellenmanagement und DEV zur sicheren Entwicklung) setzen regelmäßige Sicherheitstests voraus – ein dokumentierter Penetrationstest ist ein zentraler Nachweis im Testat-Verfahren.",
    service: { href: "/penetration-testing", label: "Pentest für Ihr C5-Testat" },
    sources: [
      { label: "BSI: Kriterienkatalog C5", url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Empfehlungen-nach-Angriffszielen/Cloud-Computing/Kriterienkatalog-C5/kriterienkatalog-c5_node.html" },
      { label: "BSI: C5:2020 – Katalog als PDF", url: "https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/CloudComputing/Anforderungskatalog/2020/C5_2020.html" },
      { label: "§ 393 SGB V (Cloud-Einsatz im Gesundheitswesen)", url: "https://www.gesetze-im-internet.de/sgb_5/__393.html" },
      { label: "IDW: Prüfungsstandard ISAE 3000 (Testat-Grundlage)", url: "https://www.idw.de/idw/idw-verlautbarungen" },
    ],
  },
  // ── Standards & Zertifizierung ────────────────────────────────────────────
  {
    slug: "iso-27001",
    title: "ISO/IEC 27001 – Informationssicherheits-Management",
    short: "Der weltweite ISMS-Standard: 93 Controls, Zertifizierung im 3-Jahres-Zyklus, Basis für NIS2-, KRITIS- und Kundenanforderungen.",
    category: "Standards & Zertifizierung",
    badge: "ISO/IEC 27001:2022",
    updated: "2026-07-17",
    intro: [
      "ISO/IEC 27001 ist der international führende Standard für Informationssicherheits-Managementsysteme (ISMS). Die aktuelle Fassung ISO/IEC 27001:2022 definiert Anforderungen an Aufbau, Betrieb und kontinuierliche Verbesserung eines ISMS; Anhang A enthält 93 Sicherheitsmaßnahmen (Controls) in vier Themengruppen.",
      "Die Zertifizierung erfolgt durch akkreditierte Stellen (in Deutschland über die DAkkS) im Drei-Jahres-Zyklus: Erstzertifizierung, zwei Überwachungsaudits, Re-Zertifizierung. Für viele Auftraggeber, Ausschreibungen und Regulierungen (NIS2, KRITIS-Nachweise, TISAX-Basis) ist ISO 27001 der anerkannte Nachweis gelebter Informationssicherheit.",
    ],
    facts: [
      { label: "Standard", value: "ISO/IEC 27001:2022" },
      { label: "Controls", value: "93 (Anhang A)" },
      { label: "Zyklus", value: "3 Jahre + Überwachungsaudits" },
    ],
    sections: [
      {
        heading: "Sicherheitstests im Standard",
        bullets: [
          "A.8.8 – Management technischer Schwachstellen: Schwachstellen müssen identifiziert, bewertet und behandelt werden.",
          "A.8.29 – Sicherheitsprüfungen in Entwicklung und Abnahme: Security-Tests sind Teil des Entwicklungszyklus.",
          "A.5.35 – Unabhängige Überprüfung der Informationssicherheit in geplanten Abständen.",
          "A.8.25–8.34 – sichere Entwicklung: von Anforderungen über Coding bis Testdaten.",
          "Kapitel 9 (Bewertung der Leistung) verlangt Nachweise, dass Maßnahmen wirksam sind – Auditoren erwarten hierfür regelmäßig Pentest-Berichte.",
        ],
      },
      {
        heading: "Abgrenzung: ISO 27001 vs. BSI IT-Grundschutz",
        paragraphs: [
          "In Deutschland existiert mit dem BSI IT-Grundschutz ein alternativer, detaillierterer Ansatz; eine Zertifizierung „ISO 27001 auf Basis von IT-Grundschutz“ kombiniert beide Welten. International anerkannt und für die meisten Unternehmen schlanker umsetzbar ist die native ISO-27001-Zertifizierung.",
        ],
      },
    ],
    steps: [
      { title: "Geltungsbereich festlegen", desc: "Scope des ISMS definieren: Standorte, Prozesse, Systeme – klein starten ist zulässig und üblich." },
      { title: "Risikoanalyse durchführen", desc: "Assets, Bedrohungen und Risiken bewerten; Risikobehandlungsplan und Statement of Applicability (SoA) erstellen." },
      { title: "Controls umsetzen", desc: "Die anwendbaren Anhang-A-Controls implementieren – Richtlinien, technische Maßnahmen, Schulungen." },
      { title: "Wirksamkeit belegen", desc: "Internes Audit, Management-Review und Penetrationstest als Wirksamkeitsnachweis (A.8.8, A.5.35) durchführen." },
      { title: "Zertifizierungsaudit", desc: "Stage 1 (Dokumentenprüfung) und Stage 2 (Umsetzungsprüfung) mit akkreditierter Zertifizierungsstelle." },
      { title: "ISMS weiterbetreiben", desc: "KVP leben: jährliche Überwachungsaudits, Re-Zertifizierung nach drei Jahren, Tests in festen Intervallen." },
    ],
    penalties: "ISO 27001 ist freiwillig – es gibt keine gesetzlichen Bußgelder. Das Zertifikat kann jedoch bei Audit-Abweichungen ausgesetzt oder entzogen werden, was Kundenverträge und Ausschreibungen gefährdet, die eine gültige Zertifizierung voraussetzen.",
    pentestNote: "Auditoren akzeptieren Penetrationstests als zentralen Wirksamkeitsnachweis für A.8.8 (Schwachstellenmanagement) und A.5.35 (unabhängige Überprüfung). Ein jährlicher Pentest mit Retest ist gelebte Best Practice zertifizierter Unternehmen.",
    service: { href: "/iso-27001-pentest-anforderungen", label: "Pentest-Anforderungen der ISO 27001" },
    sources: [
      { label: "ISO: ISO/IEC 27001 – offizielle Standardseite", url: "https://www.iso.org/standard/27001" },
      { label: "ISO: ISO/IEC 27002:2022 (Umsetzungsleitfaden zu den Controls)", url: "https://www.iso.org/standard/75652.html" },
      { label: "DAkkS: Akkreditierte Zertifizierungsstellen finden", url: "https://www.dakks.de/de/akkreditierte-stellen-suche.html" },
      { label: "BSI: IT-Grundschutz und ISO 27001", url: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/it-grundschutz_node.html" },
    ],
  },
  {
    slug: "tisax",
    title: "TISAX – Informationssicherheit in der Automobilindustrie",
    short: "Der Prüf- und Austauschmechanismus der Automobilbranche auf Basis des VDA ISA: Assessment-Level, Labels und 3 Jahre Gültigkeit.",
    category: "Standards & Zertifizierung",
    badge: "ENX · VDA ISA",
    updated: "2026-07-17",
    intro: [
      "TISAX (Trusted Information Security Assessment Exchange) ist der Standard-Nachweis für Informationssicherheit in der Automobil-Lieferkette. Er wird von der ENX Association betrieben und basiert auf dem Prüfkatalog VDA ISA des Verbands der Automobilindustrie.",
      "OEMs und Tier-1-Zulieferer verlangen TISAX-Labels als Voraussetzung für die Zusammenarbeit – insbesondere beim Austausch vertraulicher Entwicklungs- und Prototypendaten. Ein Assessment-Ergebnis ist drei Jahre gültig und wird über die ENX-Plattform mit Partnern geteilt, statt dass jeder Kunde einzeln auditiert.",
    ],
    facts: [
      { label: "Betreiber", value: "ENX Association" },
      { label: "Prüfkatalog", value: "VDA ISA" },
      { label: "Gültigkeit", value: "3 Jahre" },
    ],
    sections: [
      {
        heading: "Assessment-Level und Labels",
        bullets: [
          "AL 1: Selbstauskunft ohne externe Prüfung – nur für geringe Schutzbedarfe, kein Label.",
          "AL 2: Plausibilitätsprüfung der Selbstauskunft durch einen Prüfdienstleister (remote) – für hohen Schutzbedarf.",
          "AL 3: umfassendes Vor-Ort-Assessment inkl. Interviews und Begehung – für sehr hohen Schutzbedarf (z. B. Prototypenschutz).",
          "Labels u. a. für Informationssicherheit (hoch/sehr hoch), Prototypenschutz und Datenschutz.",
          "Grundlage ist ein gelebtes ISMS – der VDA ISA lehnt sich eng an ISO 27001 an.",
        ],
      },
    ],
    steps: [
      { title: "Anforderungen des Kunden klären", desc: "Welches Label und welches Assessment-Level verlangt Ihr OEM/Auftraggeber?" },
      { title: "ENX-Registrierung", desc: "Unternehmen und Standorte auf der ENX-Plattform registrieren, Scope festlegen." },
      { title: "Self-Assessment nach VDA ISA", desc: "Alle Kontrollfragen bewerten; Ziel-Reifegrad ist in der Regel 3 („etabliert“)." },
      { title: "Lücken schließen", desc: "Maßnahmen aus dem Self-Assessment umsetzen – technisch wie organisatorisch, inkl. Sicherheitstests." },
      { title: "Prüfdienstleister beauftragen", desc: "Von ENX zugelassenen Auditor wählen und Assessment (AL 2/3) durchführen lassen." },
      { title: "Label teilen und pflegen", desc: "Ergebnis über die ENX-Plattform freigeben; Korrekturmaßnahmen fristgerecht nachweisen." },
    ],
    penalties: "TISAX ist keine gesetzliche Pflicht, aber faktische Marktzugangsvoraussetzung: Ohne gültiges Label vergeben viele OEMs und Tier-1 keine Aufträge mit vertraulichen Daten. Nicht bestandene Assessments verzögern Projekte um Monate.",
    pentestNote: "Der VDA ISA fragt gezielt nach technischer Prüfung der IT-Systeme und Schwachstellenmanagement – ein aktueller Penetrationstest liefert die Nachweise für hohe Reifegrade und verhindert Abweichungen im Assessment.",
    service: { href: "/tisax", label: "TISAX-Vorbereitung mit Sodu Secure" },
    sources: [
      { label: "ENX Association: TISAX – offizielles Portal", url: "https://enx.com/de-DE/tisax/" },
      { label: "VDA: ISA-Katalog (Information Security Assessment)", url: "https://www.vda.de/de/themen/digitalisierung/daten/informationssicherheit" },
      { label: "ENX: TISAX Participant Handbook", url: "https://enx.com/handbook/tisax-participant-handbook.html" },
      { label: "ISO/IEC 27001 (Basis des VDA ISA)", url: "https://www.iso.org/standard/27001" },
    ],
  },
  {
    slug: "soc2",
    title: "SOC 2 – Trust Services für SaaS & Dienstleister",
    short: "Der US-Prüfungsstandard für Dienstleister: Trust Services Criteria, Typ-I/II-Reports – Standard-Anforderung internationaler Kunden.",
    category: "Standards & Zertifizierung",
    badge: "AICPA · Trust Services Criteria",
    updated: "2026-07-17",
    intro: [
      "SOC 2 (System and Organization Controls 2) ist ein Prüfungsrahmen des amerikanischen Wirtschaftsprüferverbands AICPA. Geprüft wird gegen die Trust Services Criteria: Security (verpflichtend) sowie optional Availability, Processing Integrity, Confidentiality und Privacy.",
      "Für SaaS-Anbieter und IT-Dienstleister mit internationalen Kunden – insbesondere aus den USA – ist ein SOC-2-Report häufig Vertragsvoraussetzung. Ein Typ-I-Report bewertet das Kontrolldesign zu einem Stichtag, der aussagekräftigere Typ-II-Report die Wirksamkeit der Kontrollen über einen Zeitraum von üblicherweise 3–12 Monaten.",
    ],
    facts: [
      { label: "Herausgeber", value: "AICPA (USA)" },
      { label: "Kriterien", value: "5 Trust Services Criteria" },
      { label: "Report-Typen", value: "Typ I (Stichtag) / Typ II (Zeitraum)" },
    ],
    sections: [
      {
        heading: "Typische Kontrollbereiche",
        bullets: [
          "Zugriffskontrolle: Least Privilege, MFA, Offboarding-Prozesse.",
          "Change Management: nachvollziehbare, getestete und freigegebene Änderungen.",
          "Monitoring & Incident Response: Alarmierung, definierte Reaktionswege, Post-Mortems.",
          "Schwachstellenmanagement: Scans, Penetrationstests und fristgerechte Behebung.",
          "Lieferantenmanagement und Risikoanalysen als wiederkehrende Prozesse.",
        ],
      },
      {
        heading: "SOC 2 und europäische Standards",
        paragraphs: [
          "SOC 2 ersetzt weder ISO 27001 noch ein C5-Testat – die Rahmenwerke überlappen sich aber stark. Wer bereits ein ISMS betreibt, kann einen Großteil der Nachweise wiederverwenden. Für den deutschen Markt ist häufig die Kombination sinnvoll: ISO 27001 oder C5 für europäische Kunden, SOC 2 für den US-Markt.",
        ],
      },
    ],
    steps: [
      { title: "Kriterien wählen", desc: "Security ist Pflicht; weitere Trust Services Criteria nur aufnehmen, wenn Kunden sie verlangen." },
      { title: "Readiness-Assessment", desc: "Kontrolllücken gegen die Criteria identifizieren – meist mit einem spezialisierten Auditor oder Tool." },
      { title: "Kontrollen implementieren", desc: "Policies, technisches Monitoring, Offboarding, Change- und Vulnerability-Management etablieren." },
      { title: "Evidenz sammeln", desc: "Nachweise über den Beobachtungszeitraum automatisiert erfassen (Tickets, Logs, Scans, Pentest-Berichte)." },
      { title: "Typ-I-Report erstellen lassen", desc: "CPA-Firma prüft das Kontrolldesign zum Stichtag – schneller erster Nachweis für Kunden." },
      { title: "Typ-II-Zeitraum durchlaufen", desc: "3–12 Monate Wirksamkeit nachweisen und den Report jährlich erneuern." },
    ],
    penalties: "SOC 2 ist freiwillig – ohne Report scheitern jedoch regelmäßig Enterprise-Deals und Security-Reviews von US-Kunden. Ein „qualified opinion“ (Prüfungsvorbehalt) im Report wirkt gegenüber Kunden wie ein Warnsignal.",
    pentestNote: "Die Trust Services Criteria (CC7) verlangen die Erkennung und Behebung von Schwachstellen – jährliche Penetrationstests sind der Standard-Nachweis, den Auditoren und Enterprise-Kunden im SOC-2-Kontext erwarten.",
    service: { href: "/penetration-testing", label: "Pentest für Ihren SOC-2-Report" },
    sources: [
      { label: "AICPA: SOC 2 – SOC for Service Organizations", url: "https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2" },
      { label: "AICPA: Trust Services Criteria (2017, rev. 2022)", url: "https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022" },
      { label: "ISO/IEC 27001 (Vergleichsrahmen für Mapping)", url: "https://www.iso.org/standard/27001" },
    ],
  },
];

export const wikiCategories: WikiArticle["category"][] = [
  "EU-Regulierung",
  "Deutschland",
  "Standards & Zertifizierung",
];

export function getWikiArticle(slug: string): WikiArticle | undefined {
  return wikiArticles.find((a) => a.slug === slug);
}

/** Rechner, Checks & Konfiguratoren – zentrale Tool-Übersicht für den Wiki-Hub */
export const wikiTools: { href: string; title: string; desc: string }[] = [
  { href: "/pentest-konfigurator", title: "Pentest-Konfigurator", desc: "Stellen Sie Ihren Penetrationstest zusammen und sehen Sie sofort eine Preisspanne." },
  { href: "/pentest-kosten", title: "Pentest-Kosten-Übersicht", desc: "Transparente Preise für alle Pentest-Typen – von Web-App bis Active Directory." },
  { href: "/pentest-risiko-check", title: "Pentest Risiko-Check", desc: "In wenigen Minuten das eigene Risikoprofil einschätzen." },
  { href: "/pentest-schnellcheck", title: "Pentest Schnellcheck", desc: "Kurzer Selbsttest: Wie angreifbar ist Ihr Unternehmen?" },
  { href: "/brauche-ich-einen-pentest", title: "Brauche ich einen Pentest?", desc: "Interaktiver Bedarfs-Check mit konkreter Empfehlung." },
  { href: "/it-sicherheitscheck", title: "IT-Sicherheitscheck", desc: "Schneller Sicherheits-Check Ihrer IT mit klaren Ergebnissen." },
  { href: "/cyber-security-check", title: "Cyber Security Check", desc: "Kompakter Check Ihrer Sicherheitslage mit Maßnahmenempfehlungen." },
];
