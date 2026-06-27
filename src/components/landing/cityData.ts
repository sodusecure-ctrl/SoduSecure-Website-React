// ─────────────────────────────────────────────────────────────────────────────
// City data for /penetration-testing-[stadt] landing pages.
//
// Each city carries genuinely UNIQUE, localised content (local economy, local
// data-protection authority, personal trust intro, city-specific FAQs) so the
// pages are real local landing pages — not thin "doorway" duplicates.
//
// Icons are referenced by NAME (string) and resolved in CityPentestLanding.tsx,
// so this module stays free of React/JSX and can be imported anywhere.
// ─────────────────────────────────────────────────────────────────────────────

export type CitySector = {
  name: string;
  count: string;
  iconName: string;
  desc: string;
};

export type CityFaq = { q: string; a: string };

export type CityData = {
  slug: string;                 // URL segment, e.g. "penetration-testing-hamburg"
  city: string;                 // "Hamburg"
  cityAdj: string;              // "Hamburger"
  bundesland: string;           // "Hamburg"
  region: string;               // schema addressRegion
  // hero
  heroBadge: string;
  heroH1Line2: string;          // gradient middle line of the H1
  heroSub: string;
  // personal / local trust intro
  localIntro: string[];         // paragraphs ("Wir haben viele Kunden in … betreut")
  localHighlight: string;       // one-line local fact under the intro
  // local economy
  sectorsIntro: string;
  sectors: CitySector[];
  // local data-protection authority
  dpaName: string;
  dpaUrl: string;
  dpaNote: string;
  // compliance angle most relevant to this city (links to existing pages)
  complianceFocus: { label: string; href: string; note: string }[];
  // FAQ (at least 2 are city-specific)
  faqs: CityFaq[];
  // metadata
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

// ── BERLIN ───────────────────────────────────────────────────────────────────
const berlin: CityData = {
  slug: "penetration-testing-berlin",
  city: "Berlin",
  cityAdj: "Berliner",
  bundesland: "Berlin",
  region: "Berlin",
  heroBadge: "Penetration Testing Anbieter aus Berlin · OSCP · CEH",
  heroH1Line2: "Penetration Testing für Berliner Unternehmen",
  heroSub:
    "SODU Secure ist Ihr Penetration Testing Anbieter aus Berlin. Wir simulieren reale Angriffe auf Ihre Web-Apps, Netzwerke, Active Directory und Cloud – manuell, OSCP-zertifiziert und mit transparentem Festpreis ab 1.499 €.",
  localIntro: [
    "Wir haben zahlreiche Berliner Unternehmen bei Penetrationstests begleitet – vom Charlottenburger Mittelständler über Startups in Kreuzberg und Mitte bis zu Gesundheitsdienstleistern im Berliner Umland. Diese Nähe ist kein Zufall: SODU Secure ist in Berlin verwurzelt.",
    "Berlin ist Deutschlands größter Startup-Hub und gleichzeitig Sitz von Kliniken, Behörden und einer wachsenden Finanzszene. Diese Dichte macht die Stadt zu einem der attraktivsten Ziele für Cyberkriminelle in Deutschland – und genau deshalb kennen wir die typischen Angriffsflächen Berliner Firmen sehr genau.",
  ],
  localHighlight:
    "Über 4.000 Tech-Startups, die Charité als Europas größte Universitätsklinik und eine der aktivsten Datenschutzbehörden Deutschlands – Berlin braucht Security-Partner, die vor Ort sind.",
  sectorsIntro:
    "Berlins Wirtschaft ist vielfältig und digital – und damit besonders exponiert. Diese Branchen begegnen uns in Berlin am häufigsten:",
  sectors: [
    { name: "Startups & Tech", count: "4.000+", iconName: "Zap", desc: "Berlins digitales Ökosystem ist das größte Deutschlands – schnelle Releases, viele APIs, hohe Angriffsfläche." },
    { name: "Gesundheit & Kliniken", count: "80+", iconName: "Shield", desc: "Charité & Co.: sensible Patientendaten und kritische Infrastruktur stehen besonders im Visier." },
    { name: "Produktion & Industrie", count: "3.500+", iconName: "Factory", desc: "IT/OT-Konvergenz in der Berliner Industrie schafft neue, oft ungetestete Angriffsvektoren." },
    { name: "Finanzen & Fintech", count: "900+", iconName: "Landmark", desc: "Berliner Fintechs und Versicherer unterliegen strengen Auflagen (DORA, BaFin) – Pentests sind Pflicht." },
  ],
  dpaName: "Berliner Beauftragte für Datenschutz und Informationsfreiheit (BlnBDI)",
  dpaUrl: "https://www.datenschutz-berlin.de/",
  dpaNote:
    "Die BlnBDI gehört zu den aktivsten Aufsichtsbehörden Deutschlands. Ein dokumentierter Penetrationstest ist ein anerkannter Nachweis technischer Maßnahmen nach Art. 32 DSGVO – wir stellen Ihre Berichte audit- und prüfungssicher aus.",
  complianceFocus: [
    { label: "NIS2 für Berliner Unternehmen", href: "/nis2", note: "Viele Berliner Mittelständler fallen unter NIS2 – wir prüfen Betroffenheit und Umsetzung." },
    { label: "DORA für Fintechs", href: "/dora", note: "Berliner Finanzunternehmen brauchen Threat-Led Penetration Testing nach DORA." },
    { label: "ISO 27001 Pentest", href: "/iso-27001", note: "Pentest-Nachweise für Annex-A-Controls Ihrer ISO-27001-Zertifizierung." },
  ],
  faqs: [
    { q: "Was kostet ein Penetration Test in Berlin?", a: "Je nach Scope zwischen 1.499 € für einen fokussierten Webapplikationstest und 15.000 € für einen vollständigen KMU-Pentest inklusive Active Directory und Phishing-Simulation. Als Berliner Anbieter erstellen wir nach einem kurzen Erstgespräch ein transparentes Festpreis-Angebot – ohne versteckte Tagessätze." },
    { q: "Testet SODU Secure auch vor Ort in Berlin?", a: "Ja. Die meisten Penetrationstests laufen remote über VPN-Zugänge, aber für Kick-offs, interne Tests oder Abschlusspräsentationen sind wir in Berlin persönlich vor Ort – kurze Wege, schnelle Reaktion." },
    { q: "Welche Berliner Unternehmen brauchen einen Pentest?", a: "Praktisch jedes Unternehmen mit Webpräsenz, Kundendaten oder Active Directory. Besonders relevant für Berliner Startups (Investor- und Enterprise-Anforderungen), Kliniken (Patientendaten), Fintechs (DORA/BaFin) und Mittelständler unter NIS2." },
    { q: "Wie schnell bekomme ich ein Angebot?", a: "Innerhalb von 24 Stunden nach dem Erstgespräch erhalten Sie ein fest kalkuliertes Angebot. Bei dringenden Fällen – etwa vor einer Finanzierungsrunde oder einem Audit – richten wir uns nach Ihrem Zeitplan." },
    { q: "Ist der Pentest DSGVO-konform?", a: "Ja. Alle Tests laufen auf Basis eines schriftlichen Vertrags mit klar definiertem Scope, auf Wunsch mit AVV und NDA. Der Bericht ist als Nachweis technischer Maßnahmen nach Art. 32 DSGVO gegenüber der Berliner Datenschutzbehörde verwendbar." },
  ],
  metaTitle: "Penetration Testing Berlin – Pentest Anbieter ab 1.499 € | SODU Secure",
  metaDescription:
    "Penetration Testing in Berlin von OSCP-zertifizierten Pentestern. SODU Secure: manuelle Tests, DSGVO-konform, Festpreis ab 1.499 €. Pentest Anbieter Berlin – Angebot in 24h.",
  keywords: [
    "penetration testing berlin",
    "pentest berlin",
    "penetrationstest berlin",
    "pentest anbieter berlin",
    "bester penetrationstest anbieter berlin",
    "pentest dienstleister berlin",
    "penetration test berlin",
    "pentest firma berlin",
    "cybersecurity berlin",
  ],
};

// ── HAMBURG ──────────────────────────────────────────────────────────────────
const hamburg: CityData = {
  slug: "penetration-testing-hamburg",
  city: "Hamburg",
  cityAdj: "Hamburger",
  bundesland: "Hamburg",
  region: "Hamburg",
  heroBadge: "Penetration Testing Anbieter für Hamburg · OSCP · CEH",
  heroH1Line2: "Penetration Testing für Hamburger Unternehmen",
  heroSub:
    "SODU Secure ist Ihr Penetration Testing Partner für Hamburg. Wir simulieren reale Angriffe auf Web-Apps, Logistik- und Netzwerk-Infrastruktur, Active Directory und Cloud – manuell, OSCP-zertifiziert, mit transparentem Festpreis ab 1.499 €.",
  localIntro: [
    "Wir haben viele Hamburger Unternehmen bei Penetrationstests betreut – von Logistik- und Handelsbetrieben rund um den Hafen über Medienhäuser bis zu E-Commerce-Teams in der HafenCity. Hamburg ist für uns kein anonymer Markt, sondern ein Standort, dessen Risikoprofil wir aus der Praxis kennen.",
    "Als Deutschlands größter Seehafen und wichtiger Logistik-, Medien- und Handelsknoten ist Hamburg besonders abhängig von funktionierender, vernetzter IT – und damit ein lohnendes Ziel für Ransomware und Supply-Chain-Angriffe. Genau dort setzen unsere Tests an.",
  ],
  localHighlight:
    "Der größte deutsche Seehafen, über 130.000 Logistik-Beschäftigte, Airbus, große Verlagshäuser und die Otto Group – Hamburgs vernetzte Wirtschaft braucht belastbare IT-Sicherheit.",
  sectorsIntro:
    "Hamburgs Wirtschaft ist stark vernetzt und logistikgetrieben. Diese Branchen begegnen uns in der Hansestadt am häufigsten:",
  sectors: [
    { name: "Hafen & Logistik", count: "Größter dt. Hafen", iconName: "Ship", desc: "Vernetzte Logistik- und OT-Systeme: ein Ausfall legt Lieferketten lahm – ein attraktives Ransomware-Ziel." },
    { name: "Medien & Verlage", count: "Top-Medienstadt", iconName: "Newspaper", desc: "Verlags- und Medienhäuser verarbeiten wertvolle Daten und exponierte Web-Plattformen." },
    { name: "Luftfahrt & Industrie", count: "Airbus & Zulieferer", iconName: "Plane", desc: "Luftfahrt- und Industriebetriebe mit hohem IP-Wert und strengen Supply-Chain-Anforderungen." },
    { name: "Handel & E-Commerce", count: "Otto, Tchibo & Co.", iconName: "Globe", desc: "Große E-Commerce-Plattformen mit APIs, Zahlungsflüssen und Millionen Kundendatensätzen." },
  ],
  dpaName: "Der Hamburgische Beauftragte für Datenschutz und Informationsfreiheit (HmbBfDI)",
  dpaUrl: "https://datenschutz-hamburg.de/",
  dpaNote:
    "Der HmbBfDI ist für seine konsequente Aufsichtspraxis bekannt. Ein dokumentierter Penetrationstest belegt die nach Art. 32 DSGVO geforderten technischen Maßnahmen – wir liefern prüfungssichere Berichte für Hamburger Unternehmen.",
  complianceFocus: [
    { label: "NIS2 für Logistik & Industrie", href: "/nis2", note: "Logistik, Lebensmittel und Industrie zählen zu den NIS2-Sektoren – Hamburg ist stark betroffen." },
    { label: "ISO 27001 Pentest", href: "/iso-27001", note: "Pentest-Nachweise für Annex-A-Controls Ihrer ISO-27001-Zertifizierung." },
    { label: "TISAX für Zulieferer", href: "/tisax", note: "Industrie- und Automotive-Zulieferer brauchen TISAX-konforme Sicherheitsnachweise." },
  ],
  faqs: [
    { q: "Was kostet ein Penetration Test in Hamburg?", a: "Je nach Scope zwischen 1.499 € für einen fokussierten Webapplikationstest und 15.000 € für einen vollständigen KMU-Pentest inklusive Active Directory und Phishing-Simulation. Wir erstellen nach einem kurzen Erstgespräch ein transparentes Festpreis-Angebot für Ihr Hamburger Unternehmen." },
    { q: "Testen Sie auch Logistik- und OT-nahe Systeme in Hamburg?", a: "Ja. Gerade in Hamburg ist die Verzahnung von IT und Logistik-/OT-Systemen ein zentrales Risiko. Wir testen externe und interne Netzwerke, Schnittstellen zu Logistiksystemen und prüfen, wie weit ein Angreifer in vernetzten Umgebungen kommt – ohne den Betrieb zu stören." },
    { q: "Sind Sie für Vor-Ort-Termine in Hamburg verfügbar?", a: "Die meisten Tests laufen remote. Für Kick-offs, interne Tests oder Abschlusspräsentationen kommen wir nach Hamburg – persönlich und mit kurzer Reaktionszeit." },
    { q: "Brauchen Hamburger Unternehmen wegen NIS2 einen Pentest?", a: "Viele ja. Logistik, Lebensmittel, Industrie und digitale Dienste fallen unter NIS2 – und Hamburg ist in genau diesen Sektoren stark. Wir prüfen Ihre Betroffenheit und liefern die geforderten Sicherheitsnachweise." },
    { q: "Wie schnell erhalte ich ein Angebot?", a: "Innerhalb von 24 Stunden nach dem Erstgespräch erhalten Sie ein fest kalkuliertes Festpreis-Angebot – ohne versteckte Tagessätze." },
  ],
  metaTitle: "Penetration Testing Hamburg – Pentest Anbieter ab 1.499 € | SODU Secure",
  metaDescription:
    "Penetration Testing in Hamburg von OSCP-zertifizierten Pentestern. SODU Secure: manuelle Tests für Logistik, Handel & Industrie, DSGVO-konform, Festpreis ab 1.499 €. Angebot in 24h.",
  keywords: [
    "penetration testing hamburg",
    "pentest hamburg",
    "penetrationstest hamburg",
    "pentest anbieter hamburg",
    "bester penetrationstest anbieter hamburg",
    "pentest dienstleister hamburg",
    "penetration test hamburg",
    "pentest firma hamburg",
    "cybersecurity hamburg",
  ],
};

// ── MÜNCHEN ──────────────────────────────────────────────────────────────────
const muenchen: CityData = {
  slug: "penetration-testing-muenchen",
  city: "München",
  cityAdj: "Münchner",
  bundesland: "Bayern",
  region: "Bayern",
  heroBadge: "Penetration Testing Anbieter für München · OSCP · CEH",
  heroH1Line2: "Penetration Testing für Münchner Unternehmen",
  heroSub:
    "SODU Secure ist Ihr Penetration Testing Partner für München und Bayern. Wir simulieren reale Angriffe auf Web-Apps, Netzwerke, Active Directory und Cloud – manuell, OSCP-zertifiziert, mit transparentem Festpreis ab 1.499 €.",
  localIntro: [
    "Wir haben zahlreiche Münchner Unternehmen bei Penetrationstests begleitet – von Versicherern und Finanzdienstleistern über Automotive-Zulieferer bis zu Tech- und Biotech-Firmen im Raum München. Bayerns Wirtschaftskraft bringt besonders hohe Anforderungen an Cybersicherheit mit sich, und genau darauf sind wir eingestellt.",
    "München ist Heimat von DAX-Konzernen, einer der dichtesten Versicherungs- und Finanzlandschaften Europas und eines starken Tech- und Life-Science-Clusters. Diese Konzentration wertvoller Daten und geistigen Eigentums macht Münchner Unternehmen zu bevorzugten Zielen gezielter Angriffe.",
  ],
  localHighlight:
    "Allianz, Munich Re, BMW, große Tech-Standorte und das Biotech-Cluster Martinsried – München vereint hochwertige Daten, IP und strenge Regulierung wie kaum eine andere deutsche Stadt.",
  sectorsIntro:
    "Münchens Wirtschaft ist hochwertig, reguliert und innovationsstark. Diese Branchen begegnen uns in der Region am häufigsten:",
  sectors: [
    { name: "Versicherung & Finanzen", count: "Europas Top-Cluster", iconName: "Landmark", desc: "Versicherer und Finanzdienstleister unter DORA & BaFin: Threat-Led Penetration Testing wird verbindlich." },
    { name: "Automotive & Maschinenbau", count: "BMW & Zulieferer", iconName: "Car", desc: "Hoher IP-Wert und enge OEM-Lieferketten – Angriffe zielen auf Konstruktionsdaten und Zugänge." },
    { name: "IT & Tech", count: "Big-Tech-Standorte", iconName: "Server", desc: "Internationale Tech-Konzerne und Software-Häuser mit großen Cloud- und API-Landschaften." },
    { name: "Life Science & Biotech", count: "Cluster Martinsried", iconName: "Microscope", desc: "Forschungs- und Biotech-Firmen mit wertvollem geistigem Eigentum und sensiblen Daten." },
  ],
  dpaName: "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)",
  dpaUrl: "https://www.lda.bayern.de/",
  dpaNote:
    "Das BayLDA beaufsichtigt den nicht-öffentlichen Bereich in Bayern und prüft technische und organisatorische Maßnahmen aktiv. Ein dokumentierter Penetrationstest ist ein anerkannter Nachweis nach Art. 32 DSGVO – wir stellen Ihre Berichte prüfungssicher aus.",
  complianceFocus: [
    { label: "DORA für Versicherer & Banken", href: "/dora", note: "Münchens Versicherungs- und Finanzsektor braucht DORA-konformes Threat-Led Penetration Testing." },
    { label: "TISAX für Automotive", href: "/tisax", note: "BMW-Zulieferer und Automotive-Dienstleister benötigen TISAX-konforme Sicherheitsnachweise." },
    { label: "ISO 27001 Pentest", href: "/iso-27001", note: "Pentest-Nachweise für Annex-A-Controls Ihrer ISO-27001-Zertifizierung." },
  ],
  faqs: [
    { q: "Was kostet ein Penetration Test in München?", a: "Je nach Scope zwischen 1.499 € für einen fokussierten Webapplikationstest und 15.000 € für einen vollständigen KMU-Pentest inklusive Active Directory und Phishing-Simulation. Wir erstellen nach einem kurzen Erstgespräch ein transparentes Festpreis-Angebot für Ihr Münchner Unternehmen." },
    { q: "Erfüllen Ihre Pentests die DORA-Anforderungen für Münchner Versicherer?", a: "Ja. Für Finanz- und Versicherungsunternehmen führen wir Tests durch, die sich an den DORA-Anforderungen an Threat-Led Penetration Testing (TLPT) orientieren, inklusive Bedrohungsmodellierung und auditfähiger Berichte für die BaFin." },
    { q: "Testen Sie auch Automotive-Zulieferer im Raum München?", a: "Ja. Wir kennen die Anforderungen der OEM-Lieferketten und liefern Pentest-Nachweise, die sich in TISAX-Assessments einbringen lassen – mit Fokus auf Schutz von Konstruktionsdaten und privilegierten Zugängen." },
    { q: "Sind Sie für Vor-Ort-Termine in München verfügbar?", a: "Die meisten Tests laufen remote. Für Kick-offs, interne Tests oder Abschlusspräsentationen kommen wir nach München – persönlich und mit kurzer Reaktionszeit." },
    { q: "Wie schnell erhalte ich ein Angebot?", a: "Innerhalb von 24 Stunden nach dem Erstgespräch erhalten Sie ein fest kalkuliertes Festpreis-Angebot – ohne versteckte Tagessätze." },
  ],
  metaTitle: "Penetration Testing München – Pentest Anbieter ab 1.499 € | SODU Secure",
  metaDescription:
    "Penetration Testing in München von OSCP-zertifizierten Pentestern. SODU Secure: manuelle Tests für Versicherer, Automotive & Tech, DORA- & DSGVO-konform, Festpreis ab 1.499 €.",
  keywords: [
    "penetration testing münchen",
    "pentest münchen",
    "penetrationstest münchen",
    "pentest anbieter münchen",
    "bester penetrationstest anbieter münchen",
    "pentest dienstleister münchen",
    "penetration test muenchen",
    "pentest firma münchen",
    "cybersecurity münchen",
  ],
};

// ── STUTTGART ────────────────────────────────────────────────────────────────
const stuttgart: CityData = {
  slug: "penetration-testing-stuttgart",
  city: "Stuttgart",
  cityAdj: "Stuttgarter",
  bundesland: "Baden-Württemberg",
  region: "Baden-Württemberg",
  heroBadge: "Penetration Testing Anbieter für Stuttgart · OSCP · CEH",
  heroH1Line2: "Penetration Testing für Stuttgarter Unternehmen",
  heroSub:
    "SODU Secure ist Ihr Penetration Testing Partner für Stuttgart und die Region. Wir simulieren reale Angriffe auf Web-Apps, Netzwerke, Active Directory und Cloud – manuell, OSCP-zertifiziert, mit transparentem Festpreis ab 1.499 €.",
  localIntro: [
    "Wir haben viele Stuttgarter Unternehmen bei Penetrationstests betreut – von Automotive-Zulieferern und Maschinenbauern bis zu den vielen „Hidden Champions“ des baden-württembergischen Mittelstands. Die Region steht für Ingenieurskunst und Exportstärke – und genau diese wertvollen Daten gilt es zu schützen.",
    "Stuttgart ist das Herz der deutschen Automobil- und Maschinenbauindustrie: Mercedes-Benz, Porsche, Bosch und tausende spezialisierte Zulieferer. Diese Lieferketten sind eng vernetzt – ein einziger kompromittierter Zulieferer kann zum Einfallstor für Angriffe auf einen ganzen OEM werden.",
  ],
  localHighlight:
    "Mercedes-Benz, Porsche, Bosch und hunderte Hidden Champions: Stuttgarts exportstarker Mittelstand besitzt geistiges Eigentum von Weltrang – ein primäres Ziel für Industriespionage.",
  sectorsIntro:
    "Stuttgarts Wirtschaft ist von Industrie und exportstarkem Mittelstand geprägt. Diese Branchen begegnen uns in der Region am häufigsten:",
  sectors: [
    { name: "Automotive & Zulieferer", count: "Daimler, Porsche, Bosch", iconName: "Car", desc: "Eng vernetzte OEM-Lieferketten: ein kompromittierter Zulieferer gefährdet die gesamte Kette." },
    { name: "Maschinenbau", count: "Weltmarktführer", iconName: "Factory", desc: "IT/OT-Konvergenz und vernetzte Produktion schaffen neue, oft ungetestete Angriffsflächen." },
    { name: "Hidden Champions / Mittelstand", count: "Hunderte", iconName: "Award", desc: "Weltmarktführer im Mittelstand mit wertvollem IP – aber oft ohne dediziertes Security-Team." },
    { name: "IT & Engineering", count: "Wachsend", iconName: "Server", desc: "Engineering-Dienstleister und Software-Häuser mit Zugängen zu sensiblen Kundendaten." },
  ],
  dpaName: "Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg (LfDI BW)",
  dpaUrl: "https://www.baden-wuerttemberg.datenschutz.de/",
  dpaNote:
    "Der LfDI Baden-Württemberg ist eine der profiliertesten Datenschutzbehörden Deutschlands. Ein dokumentierter Penetrationstest belegt die nach Art. 32 DSGVO geforderten technischen Maßnahmen – wir liefern prüfungssichere Berichte für Stuttgarter Unternehmen.",
  complianceFocus: [
    { label: "TISAX für Automotive", href: "/tisax", note: "Für Mercedes-, Porsche- und Bosch-Zulieferer ist TISAX faktisch Pflicht – wir liefern die Sicherheitsnachweise." },
    { label: "NIS2 für Industrie", href: "/nis2", note: "Produzierendes Gewerbe und Maschinenbau fallen zunehmend unter NIS2 – wir prüfen Betroffenheit und Umsetzung." },
    { label: "ISO 27001 Pentest", href: "/iso-27001", note: "Pentest-Nachweise für Annex-A-Controls Ihrer ISO-27001-Zertifizierung." },
  ],
  faqs: [
    { q: "Was kostet ein Penetration Test in Stuttgart?", a: "Je nach Scope zwischen 1.499 € für einen fokussierten Webapplikationstest und 15.000 € für einen vollständigen KMU-Pentest inklusive Active Directory und Phishing-Simulation. Wir erstellen nach einem kurzen Erstgespräch ein transparentes Festpreis-Angebot für Ihr Stuttgarter Unternehmen." },
    { q: "Können Sie Pentest-Nachweise für TISAX liefern?", a: "Ja. Viele Stuttgarter Zulieferer benötigen für die Zusammenarbeit mit OEMs einen TISAX-Nachweis. Unsere Penetrationstests prüfen genau die technischen Sicherheitsmaßnahmen, die im TISAX-Assessment gefordert werden, und liefern auditfähige Berichte." },
    { q: "Schützen Sie auch Produktions- und OT-Umgebungen?", a: "Ja. Gerade im Stuttgarter Maschinenbau ist die Verzahnung von IT und Produktion (OT) ein zentrales Risiko. Wir testen Netzwerksegmentierung und exponierte Systeme behutsam und ohne den Produktionsbetrieb zu gefährden." },
    { q: "Sind Sie für Vor-Ort-Termine in Stuttgart verfügbar?", a: "Die meisten Tests laufen remote. Für Kick-offs, interne Tests oder Abschlusspräsentationen kommen wir nach Stuttgart und in die Region – persönlich und mit kurzer Reaktionszeit." },
    { q: "Wie schnell erhalte ich ein Angebot?", a: "Innerhalb von 24 Stunden nach dem Erstgespräch erhalten Sie ein fest kalkuliertes Festpreis-Angebot – ohne versteckte Tagessätze." },
  ],
  metaTitle: "Penetration Testing Stuttgart – Pentest Anbieter ab 1.499 € | SODU Secure",
  metaDescription:
    "Penetration Testing in Stuttgart von OSCP-zertifizierten Pentestern. SODU Secure: manuelle Tests für Automotive, Maschinenbau & Mittelstand, TISAX- & DSGVO-konform, Festpreis ab 1.499 €.",
  keywords: [
    "penetration testing stuttgart",
    "pentest stuttgart",
    "penetrationstest stuttgart",
    "pentest anbieter stuttgart",
    "bester penetrationstest anbieter stuttgart",
    "pentest dienstleister stuttgart",
    "penetration test stuttgart",
    "pentest firma stuttgart",
    "cybersecurity stuttgart",
  ],
};

// ── KÖLN ─────────────────────────────────────────────────────────────────────
const koeln: CityData = {
  slug: "penetration-testing-koeln",
  city: "Köln",
  cityAdj: "Kölner",
  bundesland: "Nordrhein-Westfalen",
  region: "Nordrhein-Westfalen",
  heroBadge: "Penetration Testing Anbieter für Köln · OSCP · CEH",
  heroH1Line2: "Penetration Testing für Kölner Unternehmen",
  heroSub:
    "SODU Secure ist Ihr Penetration Testing Partner für Köln und das Rheinland. Wir simulieren reale Angriffe auf Web-Apps, Netzwerke, Active Directory und Cloud – manuell, OSCP-zertifiziert, mit transparentem Festpreis ab 1.499 €.",
  localIntro: [
    "Wir haben viele Kölner Unternehmen bei Penetrationstests begleitet – von Medien- und Versicherungsunternehmen über Games-Studios bis zu Handels- und Logistikbetrieben im Rheinland. Köln ist ein dichter Medien-, Versicherungs- und Digitalstandort, dessen Risikoprofil wir aus der Praxis kennen.",
    "Als einer der größten Medien- und Versicherungsstandorte Deutschlands und Heimat der größten Games-Branche des Landes verarbeitet Köln riesige Mengen sensibler Kunden- und Nutzerdaten. Diese Datenfülle macht Kölner Unternehmen zu attraktiven Zielen für Datendiebstahl und Erpressung.",
  ],
  localHighlight:
    "RTL, WDR, große Versicherer wie Gothaer und DEVK, Deutschlands stärkstes Games-Cluster und die Koelnmesse – Kölns Digital- und Datenwirtschaft braucht belastbare IT-Sicherheit.",
  sectorsIntro:
    "Kölns Wirtschaft ist medien-, versicherungs- und digitalgetrieben. Diese Branchen begegnen uns im Rheinland am häufigsten:",
  sectors: [
    { name: "Medien & Rundfunk", count: "RTL, WDR & Co.", iconName: "Radio", desc: "Medienhäuser mit exponierten Plattformen, großen Nutzerdatenbanken und hoher Sichtbarkeit." },
    { name: "Versicherungen", count: "Gothaer, DEVK, AXA", iconName: "Landmark", desc: "Versicherer unter DORA & BaFin verarbeiten hochsensible Daten – Pentests werden verbindlich." },
    { name: "Games & Digital", count: "Größtes dt. Cluster", iconName: "Gamepad2", desc: "Games-Studios und Online-Plattformen mit APIs, Zahlungsflüssen und Millionen Accounts." },
    { name: "Handel & Logistik", count: "Messe & Rheinland", iconName: "Globe", desc: "Handels-, Messe- und Logistikbetriebe mit vernetzten Systemen und Kundendaten." },
  ],
  dpaName: "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW)",
  dpaUrl: "https://www.ldi.nrw.de/",
  dpaNote:
    "Die LDI NRW beaufsichtigt das bevölkerungsreichste Bundesland und prüft technische Maßnahmen konsequent. Ein dokumentierter Penetrationstest ist ein anerkannter Nachweis nach Art. 32 DSGVO – wir stellen Ihre Berichte prüfungssicher aus.",
  complianceFocus: [
    { label: "DORA für Versicherer", href: "/dora", note: "Kölns Versicherungssektor braucht DORA-konformes Threat-Led Penetration Testing." },
    { label: "NIS2 für digitale Dienste", href: "/nis2", note: "Medien, digitale Dienste und Logistik fallen zunehmend unter NIS2 – wir prüfen Betroffenheit und Umsetzung." },
    { label: "ISO 27001 Pentest", href: "/iso-27001", note: "Pentest-Nachweise für Annex-A-Controls Ihrer ISO-27001-Zertifizierung." },
  ],
  faqs: [
    { q: "Was kostet ein Penetration Test in Köln?", a: "Je nach Scope zwischen 1.499 € für einen fokussierten Webapplikationstest und 15.000 € für einen vollständigen KMU-Pentest inklusive Active Directory und Phishing-Simulation. Wir erstellen nach einem kurzen Erstgespräch ein transparentes Festpreis-Angebot für Ihr Kölner Unternehmen." },
    { q: "Testen Sie Web-Plattformen und APIs von Kölner Medien- und Games-Firmen?", a: "Ja. Für Medien-, Games- und Digitalunternehmen sind Web-Applikationen und APIs die kritischste Angriffsfläche. Wir testen nach OWASP Top 10 und OWASP API Top 10 – inklusive Authentifizierung, Business-Logik und Zahlungsflüssen." },
    { q: "Erfüllen Ihre Pentests die Anforderungen Kölner Versicherer?", a: "Ja. Für Versicherer und Finanzdienstleister führen wir Tests durch, die sich an DORA und den BaFin-Anforderungen orientieren, inklusive auditfähiger Berichte und Threat-Led-Ansatz." },
    { q: "Sind Sie für Vor-Ort-Termine in Köln verfügbar?", a: "Die meisten Tests laufen remote. Für Kick-offs, interne Tests oder Abschlusspräsentationen kommen wir nach Köln und ins Rheinland – persönlich und mit kurzer Reaktionszeit." },
    { q: "Wie schnell erhalte ich ein Angebot?", a: "Innerhalb von 24 Stunden nach dem Erstgespräch erhalten Sie ein fest kalkuliertes Festpreis-Angebot – ohne versteckte Tagessätze." },
  ],
  metaTitle: "Penetration Testing Köln – Pentest Anbieter ab 1.499 € | SODU Secure",
  metaDescription:
    "Penetration Testing in Köln von OSCP-zertifizierten Pentestern. SODU Secure: manuelle Tests für Medien, Versicherer & Games, DSGVO-konform, Festpreis ab 1.499 €. Angebot in 24h.",
  keywords: [
    "penetration testing köln",
    "pentest köln",
    "penetrationstest köln",
    "pentest anbieter köln",
    "bester penetrationstest anbieter köln",
    "pentest dienstleister köln",
    "penetration test koeln",
    "pentest firma köln",
    "cybersecurity köln",
  ],
};

export const CITIES: Record<string, CityData> = {
  berlin,
  hamburg,
  muenchen,
  stuttgart,
  koeln,
};

// Used for the "Pentest in anderen Städten" cross-link cluster.
export const CITY_LINKS = [
  { slug: berlin.slug, city: "Berlin" },
  { slug: hamburg.slug, city: "Hamburg" },
  { slug: muenchen.slug, city: "München" },
  { slug: stuttgart.slug, city: "Stuttgart" },
  { slug: koeln.slug, city: "Köln" },
];
