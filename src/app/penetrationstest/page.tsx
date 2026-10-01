import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle,
  Cloud,
  FileLock2,
  Globe,
  KeyRound,
  Landmark,
  Network,
  Scale,
  ScrollText,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  Wifi,
} from 'lucide-react';
import { SectionLabel, SectionLabelDark, StatRow } from '@/components/landing/ui';
import { ORGANIZATION_ID } from '@/lib/authors';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  // "Definition" raus (liefert die AI Overview bereits), "Kosten" raus (gehört
  // /pentest-kosten). Die Zahl 5 bleibt: Zahlen im Titel zu entfernen kostet CTR.
  title: 'Penetrationstest | Ablauf in 5 Phasen erklärt',
  description:
    'Definition nach BSI, Ablauf in 5 Phasen, Testarten und Standards - erklärt von OSCP-zertifizierten Testern aus Berlin. Preis in 3 Minuten berechnen.',
  keywords: [
    'penetrationstest',
    'penetrationstest definition',
    'penetrationstest ablauf',
    'penetrationstest arten',
    'penetrationstest kosten',
    'pentest',
    'was ist ein penetrationstest',
    'penetrationstest bsi',
    'penetrationstest pflicht',
  ],
  alternates: {
    canonical: `${baseUrl}/penetrationstest`,
  },
  openGraph: {
    title: 'Penetrationstest | Ablauf in 5 Phasen erklärt | Sodu Secure',
    description:
      'Definition nach BSI, Ablauf in 5 Phasen, Testarten und Standards - erklärt von OSCP-zertifizierten Testern aus Berlin. Preis in 3 Minuten berechnen.',
    url: `${baseUrl}/penetrationstest`,
    type: 'website',
    siteName: 'Sodu Secure',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ---------- Quellen (extern, verifiziert) ---------- */
const SRC = {
  bsiLeitfaden:
    'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Sicherheitsberatung/Pentest_Webcheck/Leitfaden_Penetrationstest.pdf?__blob=publicationFile&v=10',
  bsiStudie:
    'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/Studien/Penetrationstest/penetrationstest.pdf?__blob=publicationFile&v=3',
  nistPentest: 'https://csrc.nist.gov/glossary/term/penetration_testing',
  nistRedTeam: 'https://csrc.nist.gov/glossary/term/red_team',
  owaspTop10: 'https://top10.owasp.org/2025',
  owaspWstg: 'https://owasp.org/www-project-web-security-testing-guide/',
  ptes: 'https://pentest-standard.readthedocs.io/en/latest/',
  osstmm: 'https://www.isecom.org/research.html',
  iso27001A88:
    'https://www.isms.online/iso-27001/annex-a/8-8-management-of-technical-vulnerabilities-2022/',
  dsgvoArt32: 'https://dsgvo-gesetz.de/art-32-dsgvo/',
  bafinTlpt:
    'https://www.bafin.de/DE/unternehmen-maerkte/aufsicht/alle-unternehmen/dora/digitale_resilienz/digitale_resilienz_TLPT_node.html',
  bsig30: 'https://www.gesetze-im-internet.de/bsig_2025/__30.html',
  bsig39: 'https://www.gesetze-im-internet.de/bsig_2025/__39.html',
  tisaxEnx: 'https://portal.enx.com/en-US/TISAX/',
  bsiLage2025:
    'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/Lageberichte/Lagebericht2025_Achtseiter.pdf?__blob=publicationFile&v=7',
  bitkom2026:
    'https://www.bitkom.org/Presse/Presseinformation/Angriffe-auf-deutsche-Wirtschaft-Spur-auslaendische-Geheimdienste',
  verizonDbir: 'https://www.verizon.com/about/news/breach-industry-wide-dbir-finds',
} as const;

/* ---------- Typen ---------- */
type Seg = { t: string; href?: string; ext?: boolean };
type Para = Seg[];

type Copy = {
  heroLabel: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  answerLabel: string;
  answerBox: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: { value: string; label: string }[];

  defLabel: string;
  defHeadline: string;
  defQuote: { text: string; src: string; srcUrl: string };
  defQuote2: { lead: string; text: string; src: string; srcUrl: string };
  defParas: Para[];
  defObjectsTitle: string;
  defObjectsIntro: Para;
  defObjects: string[];

  vsLabel: string;
  vsHeadline: string;
  vsSub: string;
  vsTableCaption: string;
  vsTableHead: [string, string, string, string];
  vsRows: { crit: string; scan: string; pentest: string; red: string }[];
  vsGlossaryTitle: string;
  vsGlossary: { term: string; def: string }[];
  vsParas: Para[];

  artenLabel: string;
  artenHeadline: string;
  artenSub: string;
  boxes: { title: string; desc: string }[];
  boxNote: Para;
  criteriaTitle: string;
  criteriaIntro: Para;
  criteria: { title: string; desc: string }[];
  objektTitle: string;
  objektSub: string;
  objekte: { title: string; desc: string; href: string; linkLabel: string }[];

  stdLabel: string;
  stdHeadline: string;
  stdSub: string;
  standards: { title: string; text: string; links: { label: string; url: string }[] }[];

  ablaufLabel: string;
  ablaufHeadline: string;
  ablaufSub: Para;
  phases: { title: string; desc: string }[];
  durationTitle: string;
  durationParas: Para[];

  pflichtLabel: string;
  pflichtHeadline: string;
  pflichtSub: string;
  pflichtQuote: { lead: string; text: string; src: string; srcUrl: string };
  pflichtTableCaption: string;
  pflichtTableHead: [string, string, string];
  pflichtRows: { reg: string; href?: string; req: string; praxis: string; srcUrl: string }[];
  pflichtParas: Para[];
  disclaimer: string;

  threatLabel: string;
  threatHeadline: string;
  threatSub: string;
  threatSourceLabel: string;
  threats: { value: string; label: string; srcLabel: string; srcUrl: string }[];
  threatOutro: Para;

  kostenLabel: string;
  kostenHeadline: string;
  kostenParas: Para[];
  kostenAnchors: { name: string; price: string; desc: string }[];
  kostenFactorsTitle: string;
  kostenFactors: string[];
  kostenCta: string;
  kostenCta2: string;

  anbieterLabel: string;
  anbieterHeadline: string;
  anbieterSub: Para;
  checklist: string[];
  legalTitle: string;
  legalParas: Para[];
  anbieterCta: string;

  soduLabel: string;
  soduHeadline: string;
  soduSub: Para;
  soduPoints: { title: string; text: string }[];
  soduSteps: { title: string; desc: string }[];
  soduCta: string;
  soduCta2: string;

  faqLabel: string;
  faqHeadline: string;
  faqs: { q: string; a: string }[];

  weiterLabel: string;
  weiterHeadline: string;
  weiterLinks: { title: string; desc: string; href: string }[];

  finalHeadline: string;
  finalSub: string;
  finalPrimary: string;
  finalSecondary: string;
};

/* ---------- DE ---------- */
const de: Copy = {
  heroLabel: 'Penetrationstest · Wissen kompakt',
  heroLine1: 'Penetrationstest:',
  heroLine2: 'Definition, Ablauf in 5 Phasen, Arten, Kosten.',
  heroSub:
    'Der vollständige Überblick für Unternehmen: Was ein Penetrationstest ist, wie der Ablauf in 5 Phasen nach BSI-Methodik aussieht, welche Arten und Standards es gibt, was er kostet und wann Regulierungen wie NIS2, DORA oder ISO 27001 ihn faktisch verlangen.',
  answerLabel: 'Kurz erklärt',
  answerBox:
    'Ein Penetrationstest (Pentest) ist eine autorisierte, methodische Sicherheitsprüfung, bei der Fachleute mit den Techniken echter Angreifer kontrolliert versuchen, in IT-Systeme, Netzwerke oder Anwendungen einzudringen. Ziel ist es, Schwachstellen nachzuweisen, das reale Angriffspotenzial einzuschätzen und die Wirksamkeit vorhandener Sicherheitsmaßnahmen zu überprüfen - bevor es ein Angreifer tut.',
  ctaPrimary: 'Unverbindliches Angebot anfragen',
  ctaSecondary: 'Kosten ansehen',
  stats: [
    { value: '500+', label: 'Pentests durchgeführt' },
    { value: 'OSCP+', label: 'Zertifizierte Tester' },
    { value: 'DE + EN', label: 'Berichte in zwei Sprachen' },
    { value: '0 €', label: 'Retest nach Behebung' },
  ],

  defLabel: 'Definition',
  defHeadline: 'Was ist ein Penetrationstest?',
  defQuote: {
    text: '„Ein IS-Penetrationstest ist ein erprobtes und geeignetes Vorgehen, um das Angriffspotenzial auf ein IT-Netz, ein einzelnes IT-System oder eine (Web-)Anwendung festzustellen.“',
    src: 'BSI, Praxis-Leitfaden für IS-Penetrationstests',
    srcUrl: SRC.bsiLeitfaden,
  },
  defQuote2: {
    lead: 'Die international gebräuchliche Definition stammt aus dem NIST-Glossar und verweist auf NIST SP 800-115:',
    text: '„Security testing in which evaluators mimic real-world attacks in an attempt to identify ways to circumvent the security features of an application, system, or network.“',
    src: 'NIST Computer Security Resource Center, Glossareintrag „penetration testing“ (NIST SP 800-115)',
    srcUrl: SRC.nistPentest,
  },
  defParas: [
    [
      { t: 'Das Bundesamt für Sicherheit in der Informationstechnik beschreibt den Penetrationstest in seiner ' },
      { t: 'Studie „Durchführungskonzept für Penetrationstests“', href: SRC.bsiStudie, ext: true },
      {
        t: ' als kontrollierten Versuch, von außen in ein bestimmtes Computersystem oder Netzwerk einzudringen, um Schwachstellen zu identifizieren - mit denselben Techniken, die auch bei einem realen Angriff zum Einsatz kämen.',
      },
    ],
    [
      { t: 'Das ' },
      { t: 'NIST-Glossar (SP 800-115)', href: SRC.nistPentest, ext: true },
      {
        t: ' definiert Penetration Testing gleichbedeutend als Sicherheitstest, bei dem Prüfer reale Angriffe nachbilden, um Wege zur Umgehung der Sicherheitsfunktionen einer Anwendung, eines Systems oder Netzwerks zu finden. Beide Definitionen betonen dasselbe: Es geht nicht um Theorie, sondern um den praktischen Nachweis, was ein Angreifer bei Ihnen tatsächlich erreichen könnte.',
      },
    ],
    [
      {
        t: 'Aus dem Ergebnis leiten Unternehmen zwei Dinge ab: ergänzende Sicherheitsmaßnahmen für die gefundenen Schwachstellen - und einen belastbaren Nachweis, ob die bereits vorhandenen Maßnahmen in der Praxis wirken.',
      },
    ],
  ],
  defObjectsTitle: 'Typische Prüfobjekte',
  defObjectsIntro: [
    { t: 'Der ' },
    { t: 'BSI-Praxis-Leitfaden', href: SRC.bsiLeitfaden, ext: true },
    { t: ' nennt als typische Ansatzpunkte eines Penetrationstests unter anderem:' },
  ],
  defObjects: [
    'Server (Web-, Mail-, Datenbankserver)',
    'Webanwendungen',
    'Netzkoppelelemente (Router, Switches)',
    'Sicherheitsgateways (Firewalls)',
    'Clients und Arbeitsplatzsysteme',
    'Drahtlose Netze (WLAN)',
    'Telekommunikationsanlagen',
  ],

  vsLabel: 'Abgrenzung',
  vsHeadline: 'Penetrationstest vs. Schwachstellenscan vs. Red Teaming',
  vsSub:
    'Ein Schwachstellenscan sucht automatisiert nach bekannten Lücken, ein Penetrationstest weist Schwachstellen manuell nach und verkettet sie zu Angriffspfaden, ein Red Teaming prüft verdeckt, ob die eigene Verteidigung einen Angriff überhaupt bemerkt. Die drei Formate unterscheiden sich also nicht im Anspruch, sondern in der Fragestellung.',
  vsTableCaption:
    'Vergleich von Schwachstellenscan, Penetrationstest und Red Teaming nach Ziel, Methode, Prüftiefe, Ergebnis und Aufwand',
  vsTableHead: ['Kriterium', 'Schwachstellenscan', 'Penetrationstest', 'Red Teaming'],
  vsRows: [
    {
      crit: 'Ziel',
      scan: 'Bekannte Schwachstellen automatisiert erkennen',
      pentest: 'Schwachstellen nachweisen, verketten und Angriffspotenzial bewerten',
      red: 'Erkennung und Reaktion der Verteidigung (Blue Team) testen',
    },
    {
      crit: 'Methode',
      scan: 'Überwiegend automatisiert (Scanner)',
      pentest: 'Überwiegend manuell, toolgestützt',
      red: 'Verdeckte Angriffssimulation nach realen Taktiken',
    },
    {
      crit: 'Tiefe',
      scan: 'Oberfläche - laut BSI mit vielen False Positives',
      pentest: 'Verifizierte Findings inkl. Logik- und Konfigurationsfehlern',
      red: 'Wenige, dafür vollständige Angriffspfade bis zum Ziel',
    },
    {
      crit: 'Ergebnis',
      scan: 'Rohliste möglicher Schwachstellen',
      pentest: 'Priorisierter Bericht mit Nachweis (PoC) und Empfehlungen',
      red: 'Erkenntnisse zu Detektion, Alarmierung und Response',
    },
    {
      crit: 'Aufwand',
      scan: 'Gering',
      pentest: 'Mittel - abhängig von Scope und Prüftiefe',
      red: 'Hoch - mehrwöchige Kampagnen',
    },
  ],
  vsGlossaryTitle: 'Die vier Begriffe kurz definiert',
  vsGlossary: [
    {
      term: 'Schwachstellenscan',
      def: 'Automatisierter Abgleich eines Systems gegen Datenbanken bekannter Schwachstellen. Liefert schnell eine Rohliste, verifiziert die Treffer aber nicht - daher laut BSI mit vielen False Positives.',
    },
    {
      term: 'Penetrationstest',
      def: 'Autorisierte, überwiegend manuelle Sicherheitsprüfung, die Schwachstellen mit einem Proof-of-Concept nachweist, sie zu Angriffspfaden verkettet und das reale Angriffspotenzial bewertet.',
    },
    {
      term: 'Red Teaming',
      def: 'Verdeckte, mehrwöchige Angriffssimulation entlang realer Angreifer-Taktiken. Geprüft wird nicht die Schwachstellenliste, sondern ob das Verteidigungsteam den Angriff erkennt und darauf reagiert.',
    },
    {
      term: 'TLPT',
      def: 'Threat-Led Penetration Testing: bedrohungsgeleitete Prüfung auf Basis echter Bedrohungsdaten, für bestimmte Finanzunternehmen in Art. 26 und 27 DORA ausdrücklich vorgeschrieben.',
    },
  ],
  vsParas: [
    [
      { t: 'Der ' },
      { t: 'BSI-Praxis-Leitfaden', href: SRC.bsiLeitfaden, ext: true },
      {
        t: ' ordnet die Prüftiefen als Stufenmodell: Ein technisches Sicherheitsaudit sichtet Versionen und Konfigurationen, ein nicht invasiver Schwachstellenscan prüft automatisiert (mit dem Nachteil vieler False Positives), ein invasiver Scan setzt bereits Exploits ein. Der Penetrationstest geht darüber hinaus: Er sucht gezielt Wege, Sicherheitsmaßnahmen zu umgehen. Das BSI empfiehlt dabei eine moderate Angriffsstärke - Schwachstellen nachweisen, Exploits nur einsetzen, wenn es unvermeidbar und der Exploit ausreichend getestet ist.',
      },
    ],
    [
      { t: 'Red Teaming definiert das ' },
      { t: 'NIST', href: SRC.nistRedTeam, ext: true },
      {
        t: ' als autorisierte Gruppe, die die Angriffs-Fähigkeiten eines realen Gegners gegen die Sicherheitsaufstellung eines Unternehmens nachbildet - das Ziel ist die Verbesserung der Verteidigung, nicht die möglichst vollständige Schwachstellenliste. Mehr dazu auf unseren Seiten zum ',
      },
      { t: 'Schwachstellenscan', href: '/schwachstellenscan' },
      { t: ', zum ' },
      { t: 'Red Team Assessment', href: '/red-team-assessment' },
      { t: ' und zum bedrohungsgeleiteten ' },
      { t: 'TLPT nach DORA', href: '/tlpt' },
      { t: '.' },
    ],
  ],

  artenLabel: 'Arten',
  artenHeadline: 'Welche Arten von Penetrationstests gibt es?',
  artenSub:
    'Penetrationstests werden nach drei Achsen unterschieden: nach der Informationsbasis (Black-, Grey- oder White-Box), nach den sechs Klassifikationskriterien des BSI und nach dem Prüfobjekt - also Webanwendung, API, Infrastruktur, Active Directory, Cloud, Mobile App oder WLAN. Festgelegt werden alle drei Achsen im Scoping vor Vertragsschluss.',
  boxes: [
    {
      title: 'Black-Box',
      desc: 'Die Tester erhalten vorab keine internen Informationen - wie ein externer Angreifer. Realistisch, aber aufwendig: Vieles der Testzeit fließt in die Informationsbeschaffung.',
    },
    {
      title: 'Grey-Box',
      desc: 'Teilwissen, z. B. Testaccounts oder Netzpläne. In der Praxis der häufigste Kompromiss aus Realismus und Effizienz.',
    },
    {
      title: 'White-Box',
      desc: 'Volle Transparenz über Systeme, Konfigurationen, ggf. Quellcode. Maximale Testabdeckung pro Testtag.',
    },
  ],
  boxNote: [
    { t: 'Das ' },
    { t: 'BSI empfiehlt grundsätzlich Whitebox-Tests', href: SRC.bsiLeitfaden, ext: true },
    {
      t: ', da bei einem Blackbox-Test aufgrund fehlender Informationen Schwachstellen übersehen werden können - bei zugleich höherem Schadensrisiko und deutlich größerem Aufwand.',
    },
  ],
  criteriaTitle: 'Die 6 Klassifikationskriterien des BSI',
  criteriaIntro: [
    { t: 'Das ' },
    { t: 'BSI-Durchführungskonzept', href: SRC.bsiStudie, ext: true },
    { t: ' klassifiziert jeden Penetrationstest anhand von sechs Kriterien, die im Scoping festgelegt werden:' },
  ],
  criteria: [
    { title: '1 · Informationsbasis', desc: 'Black-Box oder White-Box: Wie viel wissen die Tester vorab?' },
    { title: '2 · Aggressivität', desc: 'Von passiv scannend über vorsichtig und abwägend bis aggressiv.' },
    { title: '3 · Umfang', desc: 'Vollständig, begrenzt oder fokussiert auf einzelne Systeme.' },
    { title: '4 · Vorgehensweise', desc: 'Verdeckt (unangekündigt) oder offensichtlich (mit der IT abgestimmt).' },
    { title: '5 · Technik', desc: 'Netzwerkzugang, sonstige Kommunikation, physischer Zugang oder Social Engineering.' },
    { title: '6 · Ausgangspunkt', desc: 'Von außen (Internet) oder von innen (Innentäter-Perspektive).' },
  ],
  objektTitle: 'Nach Prüfobjekt',
  objektSub: 'In der Praxis wird der Penetrationstest meist nach dem Zielsystem benannt:',
  objekte: [
    {
      title: 'Webanwendungs-Pentest',
      desc: 'Login, Session-Handling, Berechtigungen, Business-Logik - geprüft nach OWASP Top 10 und WSTG.',
      href: '/services/web-application-testing',
      linkLabel: 'Web-App-Pentest',
    },
    {
      title: 'API-Pentest',
      desc: 'REST, GraphQL und gRPC: Authentifizierung, Autorisierung, Datenexposition, Rate Limiting.',
      href: '/services/api-security-testing',
      linkLabel: 'API-Sicherheitstest',
    },
    {
      title: 'Externe & interne Infrastruktur',
      desc: 'Angriffsfläche aus dem Internet sowie interne Netze inkl. Lateral Movement und Privilege Escalation.',
      href: '/services/infrastructure-testing',
      linkLabel: 'Infrastruktur-Pentest',
    },
    {
      title: 'Active Directory',
      desc: 'Kerberoasting, Delegationen, ACL-Missbrauch - die typischen Pfade zur Domänen-Übernahme.',
      href: '/services/active-directory',
      linkLabel: 'Active-Directory-Pentest',
    },
    {
      title: 'Cloud (AWS, Azure, M365)',
      desc: 'IAM-Rechte, Storage, Netzwerksegmentierung und Logging in Cloud-Umgebungen.',
      href: '/services/cloud-devops-testing',
      linkLabel: 'Cloud-Pentest',
    },
    {
      title: 'Mobile Apps',
      desc: 'iOS und Android nach OWASP MASVS - inklusive der dahinterliegenden Backend-APIs.',
      href: '/services/mobile-app-testing',
      linkLabel: 'Mobile-App-Pentest',
    },
    {
      title: 'WLAN & Netzwerk-Audit',
      desc: 'Funknetze, Segmentierung und Netzwerkkonfiguration als Einfallstor ins interne Netz.',
      href: '/services/network-audit',
      linkLabel: 'Netzwerk-Audit',
    },
    {
      title: 'Phishing & Social Engineering',
      desc: 'Der Faktor Mensch - laut BSI nur unter klar definierten Rahmenbedingungen und mit Einbeziehung der Personalvertretung.',
      href: '/phishing-simulation',
      linkLabel: 'Phishing-Simulation',
    },
  ],

  stdLabel: 'Standards & Methodik',
  stdHeadline: 'Wonach seriöse Anbieter testen.',
  stdSub:
    'Professionelle Penetrationstests folgen vier etablierten Methodiken: der BSI-Systematik für Tests in Deutschland, dem OWASP Web Security Testing Guide für Webanwendungen, dem PTES für den Projektablauf und NIST SP 800-115 für technisches Sicherheitstesten. Dokumentierte Methodik macht Ergebnisse nachvollziehbar, reproduzierbar und zwischen Anbietern vergleichbar.',
  standards: [
    {
      title: 'BSI-Methodik',
      text: 'Das Durchführungskonzept für Penetrationstests und der Praxis-Leitfaden für IS-Penetrationstests definieren Phasen, Klassifikation und Anforderungen an Prüfer - die Referenz für Tests in Deutschland.',
      links: [
        { label: 'BSI-Durchführungskonzept', url: SRC.bsiStudie },
        { label: 'BSI-Praxis-Leitfaden', url: SRC.bsiLeitfaden },
      ],
    },
    {
      title: 'OWASP Top 10 & WSTG',
      text: 'Die OWASP Top 10 sind der Referenzstandard für die kritischsten Webanwendungs-Risiken (aktuell: Version 2025, angeführt von Broken Access Control). Der Web Security Testing Guide (v4.2) liefert das strukturierte Testframework dazu.',
      links: [
        { label: 'OWASP Top 10:2025', url: SRC.owaspTop10 },
        { label: 'OWASP WSTG', url: SRC.owaspWstg },
      ],
    },
    {
      title: 'PTES',
      text: 'Der Penetration Testing Execution Standard gliedert einen Pentest in sieben Abschnitte: Pre-Engagement, Intelligence Gathering, Threat Modeling, Vulnerability Analysis, Exploitation, Post Exploitation und Reporting.',
      links: [{ label: 'PTES-Dokumentation', url: SRC.ptes }],
    },
    {
      title: 'OSSTMM',
      text: 'Das Open Source Security Testing Methodology Manual von ISECOM (Version 3) ist eine vollständige Methodik für Sicherheits- und Penetrationstests - von physischer Sicherheit bis Funk, inkl. Metriken.',
      links: [{ label: 'ISECOM / OSSTMM', url: SRC.osstmm }],
    },
    {
      title: 'NIST SP 800-115 & CVSS',
      text: 'NIST SP 800-115 beschreibt technisches Sicherheitstesten methodisch; die Risikobewertung einzelner Findings erfolgt in der Praxis über CVSS-Scores, damit Sie Behebungen sauber priorisieren können.',
      links: [{ label: 'NIST-Definition Penetration Testing', url: SRC.nistPentest }],
    },
  ],

  ablaufLabel: 'Ablauf',
  ablaufHeadline: 'Wie läuft ein Penetrationstest ab?',
  ablaufSub: [
    {
      t: 'Ein Penetrationstest läuft in fünf Phasen ab: Vorbereitung, Informationsbeschaffung, Bewertung der gesammelten Informationen, aktive Eindringversuche und Abschlussanalyse mit Bericht. Diese Gliederung stammt aus dem ',
    },
    { t: 'BSI-Durchführungskonzept', href: SRC.bsiStudie, ext: true },
    {
      t: '. In der Praxis kommt als sechster Schritt der Retest hinzu, der die Behebung der Findings verifiziert.',
    },
  ],
  phases: [
    {
      title: '1 · Vorbereitung',
      desc: 'Scoping, Ziele, Prüftiefe, Zeitfenster, schriftliche Beauftragung inkl. NDA - die vertragliche und organisatorische Basis.',
    },
    {
      title: '2 · Informationsbeschaffung',
      desc: 'Passive und aktive Aufklärung: Asset Discovery, eingesetzte Technologien, Angriffsflächen-Mapping.',
    },
    {
      title: '3 · Bewertung & Risikoanalyse',
      desc: 'Die gesammelten Informationen werden bewertet: Wo lohnen sich Eindringversuche, wo drohen Risiken für den Betrieb?',
    },
    {
      title: '4 · Aktive Eindringversuche',
      desc: 'Manuelle Angriffe auf die ausgewählten Systeme - kontrolliert, dokumentiert und mit abgestimmter Aggressivität.',
    },
    {
      title: '5 · Abschlussanalyse',
      desc: 'Auswertung, Clean-up der Testartefakte und Bericht mit Management Summary, Findings, Nachweisen und Empfehlungen.',
    },
    {
      title: '6 · Retest (Praxis)',
      desc: 'Nach der Behebung werden die Findings erneut geprüft. Bei Sodu Secure ist der Retest innerhalb von 30 Tagen kostenlos.',
    },
  ],
  durationTitle: 'Wie lange dauert ein Penetrationstest?',
  durationParas: [
    [
      {
        t: 'Die Dauer hängt vom Scope ab: Eine fokussierte Webanwendung liegt typischerweise bei wenigen Testtagen, große interne Infrastrukturen können mehrere Wochen beanspruchen. Den genauen Aufwand legt das Scoping vor Vertragsschluss fest - inklusive der Testfenster, die mit Ihrem Betrieb abgestimmt werden.',
      },
    ],
    [
      { t: 'Wichtig für die Planung: Ein Penetrationstest ist laut ' },
      { t: 'BSI', href: SRC.bsiLeitfaden, ext: true },
      {
        t: ' immer nur eine Momentaufnahme. Das BSI empfiehlt, alle zwei bis drei Jahre Wiederholungsprüfungen durchzuführen - und je höher der Schutzbedarf, desto häufiger sollte getestet werden.',
      },
    ],
  ],

  pflichtLabel: 'Regulatorik',
  pflichtHeadline: 'Wann sind Penetrationstests Pflicht?',
  pflichtSub:
    'Kaum eine Norm schreibt das Wort „Penetrationstest“ wörtlich vor - fast alle relevanten Regulierungen verlangen aber den Nachweis, dass Ihre Sicherheitsmaßnahmen wirksam sind. Der Pentest ist dafür das etablierte Mittel.',
  pflichtQuote: {
    lead: 'Wie indirekt diese Pflicht formuliert ist, zeigt § 30 Abs. 2 Nr. 6 BSIG - die deutsche Umsetzung der NIS2-Richtlinie. Gefordert werden dort:',
    text: '„Konzepte und Verfahren zur Bewertung der Wirksamkeit von Risikomanagementmaßnahmen im Bereich der Sicherheit in der Informationstechnik“',
    src: '§ 30 Abs. 2 Nr. 6 BSIG, gesetze-im-internet.de',
    srcUrl: SRC.bsig30,
  },
  pflichtTableCaption:
    'Regulatorische Anforderungen mit Pentest-Bezug: ISO 27001, NIS2, KRITIS, DORA, DSGVO und TISAX im Vergleich, je mit Normstelle und Bedeutung für die Praxis',
  pflichtTableHead: ['Regulierung', 'Anforderung', 'Bedeutung für die Praxis'],
  pflichtRows: [
    {
      reg: 'ISO 27001:2022',
      href: '/iso-27001-pentest-anforderungen',
      req: 'Annex A 8.8: Technische Schwachstellen identifizieren, bewerten und behandeln.',
      praxis: 'Regelmäßige, dokumentierte Pentests sind das gängige Umsetzungs- und Nachweismittel im Audit.',
      srcUrl: SRC.iso27001A88,
    },
    {
      reg: 'NIS2 / § 30 BSIG',
      href: '/nis2',
      req: '§ 30 Abs. 2 Nr. 6 BSIG fordert Verfahren zur Bewertung der Wirksamkeit der Risikomanagementmaßnahmen.',
      praxis: 'Der klassische Ansatzpunkt für Penetrationstests bei wichtigen und besonders wichtigen Einrichtungen.',
      srcUrl: SRC.bsig30,
    },
    {
      reg: 'KRITIS / § 39 BSIG',
      req: 'Betreiber kritischer Anlagen müssen die Umsetzung ihrer Maßnahmen alle drei Jahre gegenüber dem BSI nachweisen.',
      praxis: 'Nachweis erfolgt durch Sicherheitsaudits, Prüfungen oder Zertifizierungen - Pentests liefern die technische Substanz.',
      srcUrl: SRC.bsig39,
    },
    {
      reg: 'DORA',
      href: '/tlpt',
      req: 'Risikobasiertes, proportionales Testprogramm; für bestimmte Finanzunternehmen zusätzlich TLPT nach Art. 26/27.',
      praxis: 'Verpflichtete Institute erhalten laut BaFin einen Bescheid - TLPT im Regelfall im Drei-Jahres-Rhythmus.',
      srcUrl: SRC.bafinTlpt,
    },
    {
      reg: 'DSGVO Art. 32',
      href: '/dsgvo-penetrationstest',
      req: 'Verfahren zur regelmäßigen Überprüfung, Bewertung und Evaluierung der Wirksamkeit der TOM.',
      praxis: 'Pentests sind ein anerkanntes Verfahren, diese Prüfpflicht für personenbezogene Daten zu erfüllen.',
      srcUrl: SRC.dsgvoArt32,
    },
    {
      reg: 'TISAX / VDA ISA',
      href: '/tisax',
      req: 'Automotive-Prüfstandard der ENX Association; Labels sind drei Jahre gültig.',
      praxis: 'Wirksame technische Sicherheitsmaßnahmen müssen belegt werden - Pentest-Berichte stützen das Assessment.',
      srcUrl: SRC.tisaxEnx,
    },
  ],
  pflichtParas: [
    [
      { t: 'Für Finanzunternehmen unter ' },
      { t: 'DORA', href: '/dora' },
      {
        t: ' ist der bedrohungsgeleitete Penetrationstest (TLPT) die einzige Stelle, an der ein Pentest ausdrücklich vorgeschrieben ist - Details dazu auf unserer ',
      },
      { t: 'TLPT-Seite', href: '/tlpt' },
      { t: '. Welche Anforderungen ISO 27001 konkret an Pentests stellt, erklärt unsere Seite zu den ' },
      { t: 'ISO-27001-Pentest-Anforderungen', href: '/iso-27001-pentest-anforderungen' },
      { t: '; für die Prüfpflichten bei personenbezogenen Daten siehe ' },
      { t: 'DSGVO-Penetrationstest', href: '/dsgvo-penetrationstest' },
      { t: '.' },
    ],
  ],
  disclaimer:
    'Hinweis: Diese Übersicht ist keine Rechtsberatung. Ob und in welcher Frequenz Ihre Organisation testen muss, hängt von Einstufung, Branche und Aufsicht ab.',

  threatLabel: 'Bedrohungslage',
  threatHeadline: 'Warum Penetrationstests? Die Lage in Zahlen.',
  threatSub:
    'Genau die Schwachstellen, die ein Pentest vorab aufdeckt, sind inzwischen der häufigste Einstiegspunkt echter Angriffe.',
  threatSourceLabel: 'Quelle',
  threats: [
    {
      value: '119',
      label: 'neu bekannt gewordene Schwachstellen pro Tag - ein Plus von rund 24 %',
      srcLabel: 'BSI-Lagebericht 2025',
      srcUrl: SRC.bsiLage2025,
    },
    {
      value: '31 %',
      label: 'aller Breaches beginnen mit der Ausnutzung einer Schwachstelle - erstmals vor gestohlenen Zugangsdaten',
      srcLabel: 'Verizon DBIR 2026',
      srcUrl: SRC.verizonDbir,
    },
    {
      value: '96 %',
      label: 'der Unternehmen in Deutschland von Datendiebstahl, Spionage oder Sabotage betroffen oder vermutlich betroffen - Schaden: 211 bis 270,8 Mrd. €',
      srcLabel: 'Bitkom Wirtschaftsschutz 2026',
      srcUrl: SRC.bitkom2026,
    },
    {
      value: '~80 %',
      label: 'der angezeigten Angriffe, etwa mit Ransomware, richteten sich gegen kleine und mittlere Unternehmen',
      srcLabel: 'BSI-Lagebericht 2025',
      srcUrl: SRC.bsiLage2025,
    },
  ],
  threatOutro: [
    {
      t: 'Die Schlussfolgerung ist unbequem, aber einfach: Wer seine Schwachstellen nicht selbst sucht, überlässt das Finden den Angreifern. Ein Penetrationstest dreht die Reihenfolge um.',
    },
  ],

  kostenLabel: 'Kosten',
  kostenHeadline: 'Was kostet ein Penetrationstest?',
  kostenParas: [
    [
      {
        t: 'Ein automatisierter Schwachstellenscan startet bei Sodu Secure ab 1.499 €. Ein manueller Penetrationstest wird individuell kalkuliert und liegt meist zwischen 4.000 und 20.000 €, abhängig von Scope, Prüftiefe und Komplexität des Ziels. Seriöse Anbieter nennen den Preis erst nach dem Scoping, nicht pauschal.',
      },
    ],
    [
      { t: 'Marktübliche Preisspannen anderer Anbieter, Tagessatz-Belege und eine Einordnung fremder Angebote finden Sie auf der Seite ' },
      { t: 'Pentest Kosten', href: '/pentest-kosten' },
      { t: '. Die drei Festpreis-Anker von Sodu Secure:' },
    ],
  ],
  kostenAnchors: [
    {
      name: 'Schwachstellenscan (automatisiert)',
      price: 'ab 1.499 €',
      desc: 'Automatisierter Scan mit Report - schneller Einstieg, kein manueller Pentest.',
    },
    {
      name: 'Manueller Pentest (Web, API, Netzwerk, AD)',
      price: 'meist 4.000 – 20.000 €',
      desc: 'Individuell auf das Projekt zugeschnitten, kalkuliert nach Aufwand und Tagessätzen.',
    },
    {
      name: 'Multi-Scope / Enterprise',
      price: 'individuell',
      desc: 'Mehrere Systeme, Cloud, wiederkehrende Tests - Angebot nach Scoping-Call.',
    },
  ],
  kostenFactorsTitle: 'Die wichtigsten Kostenfaktoren',
  kostenFactors: [
    'Scope: Anzahl und Größe der Systeme, Rollen und Schnittstellen',
    'Prüftiefe und Testansatz (Black-, Grey- oder White-Box)',
    'Komplexität der Umgebung (Legacy, Cloud, Segmentierung)',
    'Berichtsumfang, Abschlussgespräch und Retest',
  ],
  kostenCta: 'Pentest Kosten im Detail',
  kostenCta2: 'Preisspanne online berechnen',

  anbieterLabel: 'Anbieterwahl',
  anbieterHeadline: 'Den richtigen Anbieter auswählen.',
  anbieterSub: [
    { t: 'Der ' },
    { t: 'BSI-Praxis-Leitfaden', href: SRC.bsiLeitfaden, ext: true },
    {
      t: ' formuliert klare Anforderungen an Prüfer und Auftrag. Diese Checkliste trennt seriöse Anbieter von Scan-Verkäufern:',
    },
  ],
  checklist: [
    'Externe, unabhängige Prüfer beauftragen - nicht die hauseigene IT (BSI-Empfehlung)',
    'Testteam aus mindestens zwei Personen: Vier-Augen-Prinzip',
    'Nachweisbare Qualifikation: OSCP, BSI-Personenzertifizierung, CREST oder CEH',
    'Erfahrung belegen lassen - BSI-Kriterium: mindestens 6 Penetrationstests in den letzten 3 Jahren',
    'Schriftlicher Vertrag mit Prüfzeitraum, Prüfobjekt, Prüftiefe, NDA und Datenschutzregelungen',
    'Berichtsqualität prüfen: Management Summary, reproduzierbare Findings, konkrete Empfehlungen',
    'Retest nach Behebung inklusive - sonst fehlt die Qualitätskontrolle',
  ],
  legalTitle: 'Rechtliche Absicherung',
  legalParas: [
    [
      {
        t: 'Ohne ausdrückliche schriftliche Beauftragung wäre das Eindringen in fremde IT-Systeme strafbar (§ 202a ff. StGB). Ein schriftlicher Vertrag mit definiertem Prüfzeitraum, Prüfobjekt und Prüftiefe ist deshalb laut BSI Pflicht - er schützt Auftraggeber und Tester gleichermaßen. Worauf Sie darüber hinaus achten sollten, zeigt unser Leitfaden ',
      },
      { t: 'Penetrationstest Anbieter erkennen', href: '/penetrationstest-anbieter' },
      { t: '.' },
    ],
  ],
  anbieterCta: 'Zum Anbieter-Leitfaden',

  soduLabel: 'Sodu Secure',
  soduHeadline: 'Penetrationstest vom Anbieter aus Berlin.',
  soduSub: [
    {
      t: 'Sodu Secure führt manuelle Penetrationstests nach BSI-orientierter Methodik, OWASP und PTES durch - mit zertifizierten Testern, Festpreisen und Berichten, mit denen Ihre Teams direkt arbeiten können. Eine kompakte Übersicht aller Leistungen finden Sie auf der ',
    },
    { t: 'Pentest-Service-Seite', href: '/penetration-testing' },
    { t: ', regionale Informationen unter ' },
    { t: 'Pentest Berlin', href: '/pentest-berlin' },
    { t: '.' },
  ],
  soduPoints: [
    {
      title: 'OSCP-zertifizierte Tester',
      text: 'Manuelles Testing durch zertifizierte Experten (OSCP+, OSWE, CEH) - über 500 durchgeführte Pentests.',
    },
    {
      title: 'Berichte in DE & EN',
      text: 'Management Summary plus technischer Teil mit PoC, CVSS-Bewertung und konkreten Fix-Empfehlungen.',
    },
    {
      title: 'Festpreis & kostenloser Retest',
      text: 'Verbindliches Angebot nach dem Scoping-Call, Retest der behobenen Findings innerhalb von 30 Tagen inklusive.',
    },
  ],
  soduSteps: [
    { title: '1 · Scoping-Call', desc: 'Kostenlos und unverbindlich: Ziele, Systeme, Prüftiefe, Zeitfenster.' },
    { title: '2 · Test & Bericht', desc: 'Manueller Penetrationstest mit laufender Abstimmung und finalem Bericht.' },
    { title: '3 · Retest', desc: 'Verifikation Ihrer Fixes und bereinigtes Ergebnis - ohne Mehrkosten.' },
  ],
  soduCta: 'Pentest anfragen',
  soduCta2: 'Antwort innerhalb von 24 Stunden',

  faqLabel: 'FAQ',
  faqHeadline: 'Häufige Fragen zum Penetrationstest.',
  faqs: [
    {
      q: 'Was ist ein Penetrationstest einfach erklärt?',
      a: 'Ein Penetrationstest ist ein beauftragter, kontrollierter Hackerangriff auf die eigenen Systeme: Sicherheitsexperten versuchen mit den Methoden echter Angreifer, in Anwendungen, Netzwerke oder Cloud-Umgebungen einzudringen. Das Ergebnis ist ein Bericht, der nachgewiesene Schwachstellen, deren Risiko und konkrete Behebungsempfehlungen enthält.',
    },
    {
      q: 'Welche Arten von Penetrationstests gibt es?',
      a: 'Unterschieden wird nach Prüfobjekt und nach Perspektive. Nach Prüfobjekt: Webanwendung, API, externe und interne Infrastruktur, Active Directory, Cloud, Mobile App, WLAN und Social Engineering. Nach Perspektive: extern aus dem Internet oder intern aus dem Firmennetz, jeweils als Black-, Grey- oder White-Box. Das BSI unterscheidet zusätzlich nach Informationsbasis, Aggressivität, Umfang, Vorgehensweise, Technik und Ausgangspunkt.',
    },
    {
      q: 'Was kostet ein Penetrationstest?',
      a: 'Die Kosten hängen von Scope und Prüftiefe ab. Ein automatisierter Schwachstellenscan startet bei Sodu Secure ab 1.499 €. Ein manueller Penetrationstest wird individuell auf das Projekt zugeschnitten und nach Aufwand und Tagessätzen kalkuliert - meist zwischen 4.000 und 20.000 €. Den verbindlichen Festpreis erhalten Sie nach dem Scoping-Call. Vorsicht bei Pauschalpreisen ohne Scoping - dahinter steckt oft nur ein automatisierter Scan.',
    },
    {
      q: 'Wie lange dauert ein Penetrationstest?',
      a: 'Je nach Scope wenige Testtage bis mehrere Wochen: Eine fokussierte Webanwendung ist meist innerhalb weniger Tage getestet, große interne Infrastrukturen brauchen länger. Der genaue Zeitrahmen wird im Scoping festgelegt und mit Ihrem Betrieb abgestimmt.',
    },
    {
      q: 'Wie läuft ein Penetrationstest ab?',
      a: 'In vier Schritten: Im Scoping werden Prüfobjekt, Prüftiefe, Zeitraum und Eskalationswege schriftlich festgelegt. Danach folgt die Informationsbeschaffung über Systeme, Dienste und erreichbare Angriffsfläche, anschließend die aktive Prüfung, bei der jeder Fund manuell verifiziert und zu realen Angriffspfaden verkettet wird. Zum Abschluss erhalten Sie den Bericht mit Management Summary, CVSS-Bewertung und Proof-of-Concept; nach Ihrer Behebung verifiziert der kostenlose Retest die Fixes.',
    },
    {
      q: 'Wie oft sollte ein Penetrationstest durchgeführt werden?',
      a: 'Das BSI empfiehlt Wiederholungsprüfungen alle zwei bis drei Jahre, da regelmäßig neue Schwachstellen und Angriffsmethoden bekannt werden - je höher der Schutzbedarf, desto häufiger. In der Praxis testen Unternehmen mit agiler Entwicklung oder hohem Schutzbedarf jährlich oder nach jedem größeren Release, denn jeder Pentest ist nur eine Momentaufnahme.',
    },
    {
      q: 'Was ist der Unterschied zwischen Penetrationstest und Schwachstellenscan?',
      a: 'Ein Schwachstellenscan prüft automatisiert gegen bekannte Schwachstellen und liefert laut BSI viele False Positives. Ein Penetrationstest geht darüber hinaus: Erfahrene Tester verifizieren Schwachstellen manuell, verketten sie zu realen Angriffspfaden und finden auch Logik- und Konfigurationsfehler, die kein Scanner erkennt.',
    },
    {
      q: 'Ist ein Penetrationstest gesetzlich vorgeschrieben?',
      a: 'Wörtlich vorgeschrieben ist er nur in Ausnahmen - etwa der TLPT nach DORA für bestimmte Finanzunternehmen. ISO 27001 (Annex A 8.8), NIS2 bzw. § 30 BSIG und DSGVO Art. 32 verlangen aber Schwachstellenmanagement und regelmäßige Wirksamkeitsprüfungen der Sicherheitsmaßnahmen - Penetrationstests sind das etablierte Mittel, diese Anforderungen zu erfüllen und nachzuweisen.',
    },
    {
      q: 'Sind Penetrationstests legal - und was muss vertraglich geregelt werden?',
      a: 'Ja, mit ausdrücklicher Genehmigung des Systemeigentümers. Ohne Beauftragung wäre das Eindringen in fremde Systeme strafbar (§ 202a ff. StGB). Das BSI verlangt einen schriftlichen Vertrag mit Prüfzeitraum, Prüfobjekt, Prüftiefe sowie NDA- und Datenschutzregelungen.',
    },
    {
      q: 'Was ist der Unterschied zwischen Pentest und Red Teaming?',
      a: 'Der Pentest sucht möglichst viele nachweisbare Schwachstellen in einem definierten Scope. Red Teaming simuliert laut NIST-Definition gezielt einen realen Gegner, um die Erkennungs- und Reaktionsfähigkeit der Verteidigung zu testen - verdeckt, über längere Zeit und mit Fokus auf wenige vollständige Angriffspfade statt auf Vollständigkeit.',
    },
    {
      q: 'Black-Box, Grey-Box oder White-Box: Welcher Ansatz ist der richtige?',
      a: 'Das BSI empfiehlt grundsätzlich Whitebox-Tests, weil bei Blackbox-Tests mangels Informationen Schwachstellen übersehen werden können - bei höherem Schadensrisiko und größerem Aufwand. In der Praxis ist Grey-Box oft der beste Kompromiss: Testaccounts und Grundinformationen maximieren die Abdeckung pro Testtag, ohne den Angreifer-Blick zu verlieren.',
    },
    {
      q: 'Kann ein Penetrationstest den laufenden Betrieb stören?',
      a: 'Bei professioneller Durchführung ist das Risiko gering: Das BSI empfiehlt eine moderate Angriffsstärke, Exploits werden nur eingesetzt, wenn sie ausreichend getestet sind. Prüfzeiträume, kritische Systeme und Eskalationswege werden vorab abgestimmt - auf Wunsch wird ausschließlich auf Staging-Umgebungen getestet.',
    },
  ],

  weiterLabel: 'Weiterführend',
  weiterHeadline: 'Vertiefende Inhalte zum Penetrationstest.',
  weiterLinks: [
    { title: 'Pentest Kosten', desc: 'Preisspannen, Kostenfaktoren und Beispielrechnungen im Detail.', href: '/pentest-kosten' },
    { title: 'Penetrationstest Anbieter', desc: 'Zertifizierungen, Red Flags und die richtige Auswahl.', href: '/penetrationstest-anbieter' },
    { title: 'Pentest-Leistungen', desc: 'Die kompakte Service-Übersicht: Web, API, Netzwerk, AD, Cloud.', href: '/penetration-testing' },
    { title: 'TLPT nach DORA', desc: 'Bedrohungsgeleitete Penetrationstests für Finanzunternehmen.', href: '/tlpt' },
    { title: 'ISO 27001 & Pentest', desc: 'Was die Norm verlangt und wie der Bericht das Audit stützt.', href: '/iso-27001-pentest-anforderungen' },
    { title: 'DSGVO-Penetrationstest', desc: 'Art. 32 DSGVO und die Prüfpflicht für personenbezogene Daten.', href: '/dsgvo-penetrationstest' },
    { title: 'TISAX', desc: 'Informationssicherheit in der Automobilindustrie nachweisen.', href: '/tisax' },
    { title: 'Pentest Berlin', desc: 'Penetrationstests für Unternehmen in Berlin und Umgebung.', href: '/pentest-berlin' },
    { title: 'Schwachstellenscan', desc: 'Automatisierte Scans als Ergänzung - nicht als Ersatz.', href: '/schwachstellenscan' },
  ],

  finalHeadline: 'Bereit für Ihren Penetrationstest?',
  finalSub: 'Unverbindliches Angebot nach kostenlosem Scoping-Call - Antwort innerhalb von 24 Stunden.',
  finalPrimary: 'Pentest anfragen',
  finalSecondary: 'Kosten ansehen',
};

/* ---------- EN ---------- */
const en: Copy = {
  heroLabel: 'Penetration testing · Knowledge base',
  heroLine1: 'Penetration testing:',
  heroLine2: 'definition, 5 phases, types, costs.',
  heroSub:
    'The complete overview for businesses: what a penetration test is, how the process runs in 5 phases along the German BSI methodology, which types and standards exist, what it costs and when regulations such as NIS2, DORA or ISO 27001 effectively require it.',
  answerLabel: 'In short',
  answerBox:
    'A penetration test (pentest) is an authorized, methodical security assessment in which professionals use the techniques of real attackers to attempt controlled intrusions into IT systems, networks or applications. The goal is to prove vulnerabilities, assess the realistic attack potential and verify whether existing security controls actually work - before an attacker does.',
  ctaPrimary: 'Request a quote',
  ctaSecondary: 'See pricing',
  stats: [
    { value: '500+', label: 'Pentests delivered' },
    { value: 'OSCP+', label: 'Certified testers' },
    { value: 'DE + EN', label: 'Bilingual reports' },
    { value: '€0', label: 'Retest after fixes' },
  ],

  defLabel: 'Definition',
  defHeadline: 'What is a penetration test?',
  defQuote: {
    text: '“Security testing in which evaluators mimic real-world attacks in an attempt to identify ways to circumvent the security features of an application, system, or network.”',
    src: 'NIST glossary (SP 800-115), penetration testing',
    srcUrl: SRC.nistPentest,
  },
  defQuote2: {
    lead: 'The German reference definition comes from the BSI practical guide for IS penetration tests:',
    text: '“Ein IS-Penetrationstest ist ein erprobtes und geeignetes Vorgehen, um das Angriffspotenzial auf ein IT-Netz, ein einzelnes IT-System oder eine (Web-)Anwendung festzustellen.”',
    src: 'BSI, practical guide for IS penetration tests (German original)',
    srcUrl: SRC.bsiLeitfaden,
  },
  defParas: [
    [
      { t: 'The German Federal Office for Information Security (BSI) defines it equivalently in its ' },
      { t: 'penetration testing study', href: SRC.bsiStudie, ext: true },
      {
        t: ': the controlled attempt to intrude into a specific computer system or network from the outside in order to identify vulnerabilities - using the same techniques a real attacker would use.',
      },
    ],
    [
      { t: 'In its ' },
      { t: 'practical guide for IS penetration tests', href: SRC.bsiLeitfaden, ext: true },
      {
        t: ' the BSI describes the pentest as a proven approach to determine the attack potential against an IT network, a single system or a (web) application. Both definitions stress the same point: it is not about theory but about practically proving what an attacker could actually achieve in your environment.',
      },
    ],
    [
      {
        t: 'Companies derive two things from the result: additional controls for the vulnerabilities found - and reliable evidence of whether the controls already in place actually work.',
      },
    ],
  ],
  defObjectsTitle: 'Typical targets',
  defObjectsIntro: [
    { t: 'The ' },
    { t: 'BSI practical guide', href: SRC.bsiLeitfaden, ext: true },
    { t: ' lists these typical starting points of a penetration test, among others:' },
  ],
  defObjects: [
    'Servers (web, mail, database)',
    'Web applications',
    'Network components (routers, switches)',
    'Security gateways (firewalls)',
    'Clients and workstations',
    'Wireless networks (WLAN)',
    'Telecommunication systems',
  ],

  vsLabel: 'Comparison',
  vsHeadline: 'Penetration test vs. vulnerability scan vs. red teaming',
  vsSub:
    'A vulnerability scan looks for known issues automatically, a penetration test proves vulnerabilities manually and chains them into attack paths, and red teaming covertly checks whether your defence notices an attack at all. The three formats differ in the question they answer, not in ambition.',
  vsTableCaption:
    'Comparison of vulnerability scan, penetration test and red teaming by goal, method, depth, result and effort',
  vsTableHead: ['Criterion', 'Vulnerability scan', 'Penetration test', 'Red teaming'],
  vsRows: [
    {
      crit: 'Goal',
      scan: 'Detect known vulnerabilities automatically',
      pentest: 'Prove and chain vulnerabilities, assess attack potential',
      red: 'Test detection and response of the defense (blue team)',
    },
    {
      crit: 'Method',
      scan: 'Mostly automated (scanners)',
      pentest: 'Mostly manual, tool-assisted',
      red: 'Covert attack simulation along real-world tactics',
    },
    {
      crit: 'Depth',
      scan: 'Surface level - per BSI with many false positives',
      pentest: 'Verified findings incl. logic and configuration flaws',
      red: 'Few, but complete attack paths to the objective',
    },
    {
      crit: 'Result',
      scan: 'Raw list of potential vulnerabilities',
      pentest: 'Prioritized report with proof (PoC) and recommendations',
      red: 'Insights into detection, alerting and response',
    },
    {
      crit: 'Effort',
      scan: 'Low',
      pentest: 'Medium - depending on scope and depth',
      red: 'High - multi-week campaigns',
    },
  ],
  vsGlossaryTitle: 'The four terms defined',
  vsGlossary: [
    {
      term: 'Vulnerability scan',
      def: 'Automated comparison of a system against databases of known vulnerabilities. Fast, but the hits are not verified - hence, per BSI, many false positives.',
    },
    {
      term: 'Penetration test',
      def: 'Authorized, largely manual security assessment that proves vulnerabilities with a proof of concept, chains them into attack paths and rates the realistic attack potential.',
    },
    {
      term: 'Red teaming',
      def: 'Covert, multi-week attack simulation along real adversary tactics. What is tested is not the vulnerability list but whether the defence team detects and responds to the attack.',
    },
    {
      term: 'TLPT',
      def: 'Threat-led penetration testing: assessment driven by real threat intelligence, explicitly prescribed for certain financial entities in Art. 26 and 27 DORA.',
    },
  ],
  vsParas: [
    [
      { t: 'The ' },
      { t: 'BSI practical guide', href: SRC.bsiLeitfaden, ext: true },
      {
        t: ' arranges test depths as a staged model: a technical security audit reviews versions and configurations, a non-invasive vulnerability scan tests automatically (with the downside of many false positives), an invasive scan already uses exploits. The penetration test goes further: it actively looks for ways to bypass security controls. The BSI recommends a moderate attack strength - prove vulnerabilities, use exploits only where unavoidable and sufficiently tested.',
      },
    ],
    [
      { t: 'Red teaming is defined by ' },
      { t: 'NIST', href: SRC.nistRedTeam, ext: true },
      {
        t: ' as an authorized group emulating a potential adversary against an enterprise security posture - the goal is improving the defense, not producing the most complete vulnerability list. Read more on our ',
      },
      { t: 'vulnerability scan', href: '/schwachstellenscan' },
      { t: ', ' },
      { t: 'red team assessment', href: '/red-team-assessment' },
      { t: ' and threat-led ' },
      { t: 'TLPT under DORA', href: '/tlpt' },
      { t: ' pages.' },
    ],
  ],

  artenLabel: 'Types',
  artenHeadline: 'Which types of penetration tests exist?',
  artenSub:
    'Penetration tests are distinguished along three axes: by information basis (black, grey or white box), by the six BSI classification criteria and by target system - web application, API, infrastructure, Active Directory, cloud, mobile app or wireless. All three are fixed during scoping, before the contract is signed.',
  boxes: [
    {
      title: 'Black box',
      desc: 'Testers receive no internal information upfront - like an external attacker. Realistic, but costly: much of the test time goes into reconnaissance.',
    },
    {
      title: 'Grey box',
      desc: 'Partial knowledge, e.g. test accounts or network diagrams. In practice the most common compromise between realism and efficiency.',
    },
    {
      title: 'White box',
      desc: 'Full transparency about systems, configurations and possibly source code. Maximum test coverage per testing day.',
    },
  ],
  boxNote: [
    { t: 'The ' },
    { t: 'BSI generally recommends white-box tests', href: SRC.bsiLeitfaden, ext: true },
    {
      t: ', since black-box tests can miss vulnerabilities due to missing information - while carrying a higher risk of damage and substantially more effort.',
    },
  ],
  criteriaTitle: 'The 6 BSI classification criteria',
  criteriaIntro: [
    { t: 'The ' },
    { t: 'BSI study', href: SRC.bsiStudie, ext: true },
    { t: ' classifies every penetration test along six criteria that are fixed during scoping:' },
  ],
  criteria: [
    { title: '1 · Information basis', desc: 'Black box or white box: how much do the testers know upfront?' },
    { title: '2 · Aggressiveness', desc: 'From passive scanning through cautious and calculated to aggressive.' },
    { title: '3 · Scope', desc: 'Complete, limited or focused on individual systems.' },
    { title: '4 · Approach', desc: 'Covert (unannounced) or overt (coordinated with IT).' },
    { title: '5 · Technique', desc: 'Network access, other communication, physical access or social engineering.' },
    { title: '6 · Starting point', desc: 'From outside (internet) or from inside (insider perspective).' },
  ],
  objektTitle: 'By target system',
  objektSub: 'In practice, penetration tests are usually named after the system under test:',
  objekte: [
    {
      title: 'Web application pentest',
      desc: 'Login, session handling, authorization, business logic - tested along OWASP Top 10 and WSTG.',
      href: '/services/web-application-testing',
      linkLabel: 'Web app pentest',
    },
    {
      title: 'API pentest',
      desc: 'REST, GraphQL and gRPC: authentication, authorization, data exposure, rate limiting.',
      href: '/services/api-security-testing',
      linkLabel: 'API security test',
    },
    {
      title: 'External & internal infrastructure',
      desc: 'Internet-facing attack surface plus internal networks incl. lateral movement and privilege escalation.',
      href: '/services/infrastructure-testing',
      linkLabel: 'Infrastructure pentest',
    },
    {
      title: 'Active Directory',
      desc: 'Kerberoasting, delegations, ACL abuse - the typical paths to domain compromise.',
      href: '/services/active-directory',
      linkLabel: 'Active Directory pentest',
    },
    {
      title: 'Cloud (AWS, Azure, M365)',
      desc: 'IAM permissions, storage, network segmentation and logging in cloud environments.',
      href: '/services/cloud-devops-testing',
      linkLabel: 'Cloud pentest',
    },
    {
      title: 'Mobile apps',
      desc: 'iOS and Android along OWASP MASVS - including the backend APIs behind them.',
      href: '/services/mobile-app-testing',
      linkLabel: 'Mobile app pentest',
    },
    {
      title: 'WLAN & network audit',
      desc: 'Wireless networks, segmentation and network configuration as entry points into the internal network.',
      href: '/services/network-audit',
      linkLabel: 'Network audit',
    },
    {
      title: 'Phishing & social engineering',
      desc: 'The human factor - per BSI only under clearly defined conditions and with employee representatives involved.',
      href: '/phishing-simulation',
      linkLabel: 'Phishing simulation',
    },
  ],

  stdLabel: 'Standards & methodology',
  stdHeadline: 'What serious providers test against.',
  stdSub:
    'Professional penetration tests follow four established methodologies: the BSI system for tests in Germany, the OWASP Web Security Testing Guide for web applications, PTES for the project structure and NIST SP 800-115 for technical security testing. Documented methodology makes results traceable, reproducible and comparable across providers.',
  standards: [
    {
      title: 'BSI methodology',
      text: 'The BSI penetration testing study and the practical guide for IS penetration tests define phases, classification and requirements for testers - the reference for tests in Germany.',
      links: [
        { label: 'BSI study (German)', url: SRC.bsiStudie },
        { label: 'BSI practical guide (German)', url: SRC.bsiLeitfaden },
      ],
    },
    {
      title: 'OWASP Top 10 & WSTG',
      text: 'The OWASP Top 10 is the reference standard for the most critical web application risks (current: the 2025 edition, led by Broken Access Control). The Web Security Testing Guide (v4.2) provides the structured test framework.',
      links: [
        { label: 'OWASP Top 10:2025', url: SRC.owaspTop10 },
        { label: 'OWASP WSTG', url: SRC.owaspWstg },
      ],
    },
    {
      title: 'PTES',
      text: 'The Penetration Testing Execution Standard structures a pentest into seven sections: pre-engagement, intelligence gathering, threat modeling, vulnerability analysis, exploitation, post exploitation and reporting.',
      links: [{ label: 'PTES documentation', url: SRC.ptes }],
    },
    {
      title: 'OSSTMM',
      text: 'The Open Source Security Testing Methodology Manual by ISECOM (version 3) is a complete methodology for security and penetration testing - from physical security to wireless, including metrics.',
      links: [{ label: 'ISECOM / OSSTMM', url: SRC.osstmm }],
    },
    {
      title: 'NIST SP 800-115 & CVSS',
      text: 'NIST SP 800-115 describes technical security testing methodically; individual findings are risk-rated via CVSS scores in practice, so you can prioritize remediation cleanly.',
      links: [{ label: 'NIST definition of penetration testing', url: SRC.nistPentest }],
    },
  ],

  ablaufLabel: 'Process',
  ablaufHeadline: 'How does a penetration test work?',
  ablaufSub: [
    {
      t: 'A penetration test runs in five phases: preparation, information gathering, assessment of the collected information, active intrusion attempts and final analysis with the report. That structure comes from the ',
    },
    { t: 'BSI study', href: SRC.bsiStudie, ext: true },
    { t: '. In practice, a sixth step is added: the retest that verifies remediation.' },
  ],
  phases: [
    {
      title: '1 · Preparation',
      desc: 'Scoping, goals, test depth, time window, written engagement incl. NDA - the contractual and organizational basis.',
    },
    {
      title: '2 · Reconnaissance',
      desc: 'Passive and active information gathering: asset discovery, technology stack, attack surface mapping.',
    },
    {
      title: '3 · Analysis & risk assessment',
      desc: 'The collected information is evaluated: where are intrusion attempts worthwhile, where are operational risks?',
    },
    {
      title: '4 · Active intrusion attempts',
      desc: 'Manual attacks against the selected systems - controlled, documented and with agreed aggressiveness.',
    },
    {
      title: '5 · Final analysis',
      desc: 'Evaluation, clean-up of test artifacts and the report with management summary, findings, proof and recommendations.',
    },
    {
      title: '6 · Retest (practice)',
      desc: 'After remediation, findings are verified again. At Sodu Secure the retest within 30 days is free of charge.',
    },
  ],
  durationTitle: 'How long does a penetration test take?',
  durationParas: [
    [
      {
        t: 'Duration depends on scope: a focused web application typically takes a few testing days, large internal infrastructures can take several weeks. The exact effort is fixed during scoping before the contract - including test windows coordinated with your operations.',
      },
    ],
    [
      { t: 'Important for planning: according to the ' },
      { t: 'BSI', href: SRC.bsiLeitfaden, ext: true },
      {
        t: ', a penetration test is always just a snapshot. The BSI recommends repeat tests every two to three years - and the higher the protection needs, the more frequently you should test.',
      },
    ],
  ],

  pflichtLabel: 'Regulation',
  pflichtHeadline: 'When are penetration tests mandatory?',
  pflichtSub:
    'Hardly any standard literally prescribes the word "penetration test" - but almost all relevant regulations require proof that your security controls are effective. The pentest is the established means to provide it.',
  pflichtQuote: {
    lead: 'How indirectly this obligation is worded shows in Sec. 30 (2) no. 6 BSIG, the German implementation of NIS2, which requires:',
    text: '“Konzepte und Verfahren zur Bewertung der Wirksamkeit von Risikomanagementmaßnahmen im Bereich der Sicherheit in der Informationstechnik” (concepts and procedures to assess the effectiveness of IT security risk management measures)',
    src: 'Sec. 30 (2) no. 6 BSIG, gesetze-im-internet.de',
    srcUrl: SRC.bsig30,
  },
  pflichtTableCaption:
    'Regulatory requirements with pentest relevance: ISO 27001, NIS2, KRITIS, DORA, GDPR and TISAX compared, each with the relevant clause and its practical meaning',
  pflichtTableHead: ['Regulation', 'Requirement', 'What it means in practice'],
  pflichtRows: [
    {
      reg: 'ISO 27001:2022',
      href: '/iso-27001-pentest-anforderungen',
      req: 'Annex A 8.8: identify, evaluate and treat technical vulnerabilities.',
      praxis: 'Regular, documented pentests are the common implementation and audit evidence.',
      srcUrl: SRC.iso27001A88,
    },
    {
      reg: 'NIS2 / § 30 BSIG',
      href: '/nis2',
      req: 'Sec. 30 (2) no. 6 of the German BSIG requires procedures to assess the effectiveness of risk management measures.',
      praxis: 'The classic entry point for penetration tests at important and essential entities.',
      srcUrl: SRC.bsig30,
    },
    {
      reg: 'KRITIS / § 39 BSIG',
      req: 'Operators of critical facilities must prove implementation of their measures to the BSI every three years.',
      praxis: 'Evidence comes from security audits, examinations or certifications - pentests provide the technical substance.',
      srcUrl: SRC.bsig39,
    },
    {
      reg: 'DORA',
      href: '/tlpt',
      req: 'Risk-based, proportionate testing program; certain financial entities additionally need TLPT under Art. 26/27.',
      praxis: 'Obligated institutions receive a formal notice from BaFin - TLPT usually on a three-year cycle.',
      srcUrl: SRC.bafinTlpt,
    },
    {
      reg: 'GDPR Art. 32',
      href: '/dsgvo-penetrationstest',
      req: 'A process for regularly testing, assessing and evaluating the effectiveness of technical and organizational measures.',
      praxis: 'Penetration tests are a recognized procedure to fulfill this obligation for personal data.',
      srcUrl: SRC.dsgvoArt32,
    },
    {
      reg: 'TISAX / VDA ISA',
      href: '/tisax',
      req: 'Automotive assessment standard governed by the ENX Association; labels are valid for three years.',
      praxis: 'Effective technical controls must be demonstrated - pentest reports support the assessment.',
      srcUrl: SRC.tisaxEnx,
    },
  ],
  pflichtParas: [
    [
      { t: 'For financial entities under ' },
      { t: 'DORA', href: '/dora' },
      {
        t: ', the threat-led penetration test (TLPT) is the one place where a pentest is explicitly prescribed - details on our ',
      },
      { t: 'TLPT page', href: '/tlpt' },
      { t: '. What ISO 27001 specifically expects from pentests is covered on our ' },
      { t: 'ISO 27001 pentest requirements', href: '/iso-27001-pentest-anforderungen' },
      { t: ' page; for testing obligations around personal data see ' },
      { t: 'GDPR penetration testing', href: '/dsgvo-penetrationstest' },
      { t: '.' },
    ],
  ],
  disclaimer:
    'Note: this overview is not legal advice. Whether and how often your organization must test depends on classification, industry and supervisory authority.',

  threatLabel: 'Threat landscape',
  threatHeadline: 'Why penetration testing? The numbers.',
  threatSub:
    'The very vulnerabilities a pentest uncovers in advance have become the most common entry point of real attacks.',
  threatSourceLabel: 'Source',
  threats: [
    {
      value: '119',
      label: 'newly disclosed vulnerabilities per day - an increase of around 24%',
      srcLabel: 'BSI State of IT Security 2025',
      srcUrl: SRC.bsiLage2025,
    },
    {
      value: '31%',
      label: 'of all breaches start with vulnerability exploitation - for the first time ahead of stolen credentials',
      srcLabel: 'Verizon DBIR 2026',
      srcUrl: SRC.verizonDbir,
    },
    {
      value: '96%',
      label: 'of German companies affected or presumably affected by data theft, espionage or sabotage - damage: €211 to €270.8 billion',
      srcLabel: 'Bitkom Wirtschaftsschutz 2026',
      srcUrl: SRC.bitkom2026,
    },
    {
      value: '~80%',
      label: 'of reported attacks, e.g. with ransomware, targeted small and medium-sized businesses',
      srcLabel: 'BSI State of IT Security 2025',
      srcUrl: SRC.bsiLage2025,
    },
  ],
  threatOutro: [
    {
      t: 'The conclusion is uncomfortable but simple: if you do not look for your vulnerabilities yourself, you leave the finding to attackers. A penetration test reverses that order.',
    },
  ],

  kostenLabel: 'Costs',
  kostenHeadline: 'How much does a penetration test cost?',
  kostenParas: [
    [
      {
        t: 'An automated vulnerability scan at Sodu Secure starts from €1,499. A manual penetration test is scoped individually and typically lands between €4,000 and €20,000, depending on scope, test depth and target complexity. Serious providers quote after scoping, not with flat rates.',
      },
    ],
    [
      { t: 'Market ranges of other providers, day-rate evidence and help with judging third-party quotes are on our ' },
      { t: 'pentest costs page', href: '/pentest-kosten' },
      { t: '. The three fixed-price anchors at Sodu Secure:' },
    ],
  ],
  kostenAnchors: [
    {
      name: 'Vulnerability scan (automated)',
      price: 'from €1,499',
      desc: 'Automated scan with report - a fast entry point, not a manual pentest.',
    },
    {
      name: 'Manual pentest (web, API, network, AD)',
      price: 'typically €4,000 – €20,000',
      desc: 'Individually scoped, calculated based on effort and day rates.',
    },
    {
      name: 'Multi-scope / enterprise',
      price: 'custom',
      desc: 'Multiple systems, cloud, recurring tests - quote after the scoping call.',
    },
  ],
  kostenFactorsTitle: 'The main cost drivers',
  kostenFactors: [
    'Scope: number and size of systems, roles and interfaces',
    'Test depth and approach (black, grey or white box)',
    'Complexity of the environment (legacy, cloud, segmentation)',
    'Report scope, debrief and retest',
  ],
  kostenCta: 'Pentest costs in detail',
  kostenCta2: 'Calculate a price range online',

  anbieterLabel: 'Choosing a provider',
  anbieterHeadline: 'Selecting the right provider.',
  anbieterSub: [
    { t: 'The ' },
    { t: 'BSI practical guide', href: SRC.bsiLeitfaden, ext: true },
    { t: ' sets clear requirements for testers and engagements. This checklist separates serious providers from scan resellers:' },
  ],
  checklist: [
    'Engage external, independent testers - not your in-house IT (BSI recommendation)',
    'Test team of at least two people: four-eyes principle',
    'Verifiable qualification: OSCP, BSI personal certification, CREST or CEH',
    'Ask for proven experience - BSI criterion: at least 6 penetration tests within the last 3 years',
    'Written contract with test period, target, test depth, NDA and data protection terms',
    'Check report quality: management summary, reproducible findings, concrete recommendations',
    'Retest after remediation included - otherwise quality control is missing',
  ],
  legalTitle: 'Legal protection',
  legalParas: [
    [
      {
        t: 'Without an explicit written engagement, intruding into third-party IT systems would be a criminal offense under German law (Sec. 202a et seq. StGB). A written contract with defined test period, target and depth is therefore mandatory per BSI - it protects client and tester alike. What else to look for is covered in our guide ',
      },
      { t: 'how to recognize a serious pentest provider', href: '/penetrationstest-anbieter' },
      { t: '.' },
    ],
  ],
  anbieterCta: 'Read the provider guide',

  soduLabel: 'Sodu Secure',
  soduHeadline: 'Penetration testing from Berlin.',
  soduSub: [
    {
      t: 'Sodu Secure performs manual penetration tests along BSI-oriented methodology, OWASP and PTES - with certified testers, fixed prices and reports your teams can work with directly. Find the compact overview of all services on our ',
    },
    { t: 'penetration testing service page', href: '/penetration-testing' },
    { t: ' and regional information at ' },
    { t: 'Pentest Berlin', href: '/pentest-berlin' },
    { t: '.' },
  ],
  soduPoints: [
    {
      title: 'OSCP-certified testers',
      text: 'Manual testing by certified experts (OSCP+, OSWE, CEH) - more than 500 pentests delivered.',
    },
    {
      title: 'Reports in DE & EN',
      text: 'Management summary plus technical part with PoC, CVSS rating and concrete fix recommendations.',
    },
    {
      title: 'Fixed price & free retest',
      text: 'Binding quote after the scoping call, retest of fixed findings within 30 days included.',
    },
  ],
  soduSteps: [
    { title: '1 · Scoping call', desc: 'Free and non-binding: goals, systems, test depth, timeline.' },
    { title: '2 · Test & report', desc: 'Manual penetration test with ongoing coordination and the final report.' },
    { title: '3 · Retest', desc: 'Verification of your fixes and a clean result - at no extra cost.' },
  ],
  soduCta: 'Request pentest',
  soduCta2: 'Reply within 24 hours',

  faqLabel: 'FAQ',
  faqHeadline: 'Frequently asked questions.',
  faqs: [
    {
      q: 'What is a penetration test in simple terms?',
      a: 'A penetration test is a commissioned, controlled hacking attack on your own systems: security experts use the methods of real attackers to try to intrude into applications, networks or cloud environments. The result is a report with proven vulnerabilities, their risk and concrete remediation recommendations.',
    },
    {
      q: 'What types of penetration tests are there?',
      a: 'Tests are distinguished by target and by perspective. By target: web application, API, external and internal infrastructure, Active Directory, cloud, mobile app, Wi-Fi and social engineering. By perspective: external from the internet or internal from the corporate network, each as black, grey or white box. The BSI additionally classifies tests by information base, aggressiveness, scope, approach, technique and starting point.',
    },
    {
      q: 'How much does a penetration test cost?',
      a: 'Costs depend on scope and test depth. An automated vulnerability scan at Sodu Secure starts from €1,499. Manual pentests are individually scoped and calculated based on effort and day rates - typically €4,000 to €20,000. You receive a binding fixed price after the scoping call. Be cautious with flat rates offered without scoping - they usually hide an automated scan.',
    },
    {
      q: 'How long does a penetration test take?',
      a: 'Depending on scope, from a few testing days to several weeks: a focused web application is usually tested within days, large internal infrastructures take longer. The exact timeline is fixed during scoping and coordinated with your operations.',
    },
    {
      q: 'How does a penetration test work step by step?',
      a: 'In four steps: scoping fixes the target, test depth, time frame and escalation paths in writing. Next comes information gathering on systems, services and reachable attack surface, followed by active testing in which every finding is verified manually and chained into real attack paths. Finally you receive the report with executive summary, CVSS rating and proof of concept; after your remediation the free retest verifies the fixes.',
    },
    {
      q: 'How often should a penetration test be performed?',
      a: 'The BSI recommends repeat tests every two to three years, since new vulnerabilities and attack methods emerge continuously - the higher the protection needs, the more often. In practice, companies with agile development or high protection needs test annually or after every major release, because every pentest is only a snapshot.',
    },
    {
      q: 'What is the difference between a penetration test and a vulnerability scan?',
      a: 'A vulnerability scan checks automatically against known vulnerabilities and, per BSI, produces many false positives. A penetration test goes further: experienced testers verify vulnerabilities manually, chain them into real attack paths and also find logic and configuration flaws no scanner detects.',
    },
    {
      q: 'Are penetration tests legally required?',
      a: 'Literally prescribed only in exceptional cases - such as TLPT under DORA for certain financial entities. However, ISO 27001 (Annex A 8.8), NIS2 respectively Sec. 30 BSIG and GDPR Art. 32 require vulnerability management and regular effectiveness testing of security controls - penetration tests are the established means to fulfill and evidence these requirements.',
    },
    {
      q: 'Are penetration tests legal - and what must be agreed contractually?',
      a: 'Yes, with the explicit authorization of the system owner. Without an engagement, intruding into third-party systems would be a criminal offense (Sec. 202a et seq. of the German Criminal Code). The BSI requires a written contract covering test period, target, test depth plus NDA and data protection terms.',
    },
    {
      q: 'What is the difference between a pentest and red teaming?',
      a: 'The pentest looks for as many provable vulnerabilities as possible within a defined scope. Red teaming, per the NIST definition, emulates a real adversary to test the detection and response capability of the defense - covertly, over a longer period and focused on few complete attack paths rather than completeness.',
    },
    {
      q: 'Black box, grey box or white box: which approach is right?',
      a: 'The BSI generally recommends white-box testing, because black-box tests can miss vulnerabilities due to missing information - at higher risk of damage and greater effort. In practice grey box is often the best compromise: test accounts and basic information maximize coverage per testing day without losing the attacker perspective.',
    },
    {
      q: 'Can a penetration test disrupt live operations?',
      a: 'With professional execution the risk is low: the BSI recommends a moderate attack strength, and exploits are only used when sufficiently tested. Test periods, critical systems and escalation paths are agreed upfront - on request, testing is restricted to staging environments.',
    },
  ],

  weiterLabel: 'Further reading',
  weiterHeadline: 'Deep dives on penetration testing.',
  weiterLinks: [
    { title: 'Pentest costs', desc: 'Price ranges, cost drivers and sample calculations in detail.', href: '/pentest-kosten' },
    { title: 'Pentest providers', desc: 'Certifications, red flags and making the right choice.', href: '/penetrationstest-anbieter' },
    { title: 'Pentest services', desc: 'The compact service overview: web, API, network, AD, cloud.', href: '/penetration-testing' },
    { title: 'TLPT under DORA', desc: 'Threat-led penetration testing for financial entities.', href: '/tlpt' },
    { title: 'ISO 27001 & pentesting', desc: 'What the standard expects and how the report supports the audit.', href: '/iso-27001-pentest-anforderungen' },
    { title: 'GDPR penetration testing', desc: 'GDPR Art. 32 and testing obligations for personal data.', href: '/dsgvo-penetrationstest' },
    { title: 'TISAX', desc: 'Demonstrating information security in the automotive industry.', href: '/tisax' },
    { title: 'Pentest Berlin', desc: 'Penetration testing for companies in and around Berlin.', href: '/pentest-berlin' },
    { title: 'Vulnerability scan', desc: 'Automated scans as a complement - not a replacement.', href: '/schwachstellenscan' },
  ],

  finalHeadline: 'Ready for your penetration test?',
  finalSub: 'Non-binding quote after a free scoping call - reply within 24 hours.',
  finalPrimary: 'Request pentest',
  finalSecondary: 'See pricing',
};

/* ---------- Render-Helfer ---------- */
function RichText({ para }: { para: Para }) {
  return (
    <>
      {para.map((seg, i) => {
        if (!seg.href) return <span key={i}>{seg.t}</span>;
        if (seg.ext) {
          return (
            <a
              key={i}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF6B61] transition hover:text-[#FF8077]"
            >
              {seg.t}
            </a>
          );
        }
        return (
          <Link key={i} href={seg.href} className="text-[#FF6B61] transition hover:text-[#FF8077]">
            {seg.t}
          </Link>
        );
      })}
    </>
  );
}

const CRITERIA_ICONS = [BookOpen, ShieldCheck, Scale, FileLock2, Network, Globe];
const OBJEKT_ICONS = [Globe, KeyRound, Server, ShieldCheck, Cloud, Smartphone, Wifi, Users];
const PFLICHT_ICONS = [ScrollText, Landmark, Building2, Scale, FileLock2, CheckCircle];

export default async function PenetrationstestPage() {
  const locale = await getLocale();
  const c = locale === 'en' ? en : de;

  const pageUrl = `${baseUrl}/penetrationstest`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
        { '@type': 'ListItem', position: 2, name: 'Penetrationstest', item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Penetrationstest',
      serviceType: 'Penetration Testing',
      // Referenz auf die zentrale Organisations-Entitaet aus src/app/layout.tsx statt eines
      // zweiten, unverknuepften Organization-Objekts.
      provider: { '@id': ORGANIZATION_ID, '@type': 'Organization', name: 'Sodu Secure', url: baseUrl },
      areaServed: { '@type': 'Country', name: 'Germany' },
      url: pageUrl,
      description:
        'Penetrationstest verständlich erklärt: Definition nach BSI, Ablauf in 5 Phasen, Arten, Standards, Kosten und regulatorische Anforderungen - vom zertifizierten Pentest-Anbieter aus Berlin.',
    },
    // HowTo spiegelt exakt die sichtbare Phasenliste (Abschnitt "Ablauf", c.phases) -
    // inklusive des sechsten Praxisschritts Retest, der dort ebenfalls gelistet ist.
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${pageUrl}#ablauf`,
      name: c.ablaufHeadline,
      description: c.ablaufSub.map((seg) => seg.t).join(''),
      url: `${pageUrl}#ablauf`,
      step: c.phases.map((p, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: p.title.split(' · ')[1] ?? p.title,
        text: p.desc,
        url: `${pageUrl}#ablauf`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: c.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ];

  return (
    <main className="bg-transparent text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:pt-24 lg:pb-28">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionLabelDark>{c.heroLabel}</SectionLabelDark>
              <h1 className="mt-6 text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] md:text-5xl lg:text-6xl">
                <span className="premium-silver">{c.heroLine1}</span>
                <br />
                <span className="premium-headline-accent">{c.heroLine2}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base text-white/75 md:text-lg">{c.heroSub}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/request-pentest"
                  className="premium-cta inline-flex items-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
                >
                  {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pentest-kosten"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
                >
                  {c.ctaSecondary} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* GEO/AEO-Antwortblock */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 shadow-xl shadow-black/20 lg:p-8">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF3B30]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
                {c.answerLabel}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">{c.answerBox}</p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-6">
        <StatRow items={c.stats} />
      </section>

      {/* DEFINITION */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.defLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.defHeadline}</h2>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <blockquote className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-lg leading-relaxed text-white md:text-xl">{c.defQuote.text}</p>
              <footer className="mt-4 text-sm text-white/60">
                <a
                  href={c.defQuote.srcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6B61] transition hover:text-[#FF8077]"
                >
                  {c.defQuote.src}
                </a>
              </footer>
            </blockquote>
            {c.defParas.map((p, i) => (
              <p key={i} className="mt-6 text-sm leading-relaxed text-white/70 md:text-base">
                <RichText para={p} />
              </p>
            ))}

            <p className="mt-8 text-sm leading-relaxed text-white/70 md:text-base">{c.defQuote2.lead}</p>
            <blockquote className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-base leading-relaxed text-white/90 md:text-lg">{c.defQuote2.text}</p>
              <footer className="mt-4 text-sm text-white/60">
                <a
                  href={c.defQuote2.srcUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6B61] transition hover:text-[#FF8077]"
                >
                  {c.defQuote2.src}
                </a>
              </footer>
            </blockquote>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-transparent p-7">
            <h3 className="text-lg font-semibold tracking-tight text-white">{c.defObjectsTitle}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              <RichText para={c.defObjectsIntro} />
            </p>
            <ul className="mt-5 space-y-3">
              {c.defObjects.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm text-white/75">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3B30]" />
                  {o}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      {/* VS TABLE */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>{c.vsLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.vsHeadline}</h2>
          <p className="mt-4 max-w-3xl text-white/70">{c.vsSub}</p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[760px] text-sm">
              <caption className="sr-only">{c.vsTableCaption}</caption>
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {c.vsTableHead.map((h, i) => (
                    <th
                      key={h}
                      scope="col"
                      className={
                        'px-4 py-3.5 text-left font-semibold ' + (i === 2 ? 'text-[#FF6B61]' : 'text-white')
                      }
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.vsRows.map((row) => (
                  <tr key={row.crit} className="border-b border-white/10 last:border-b-0">
                    <th scope="row" className="px-4 py-3.5 text-left font-semibold text-white">
                      {row.crit}
                    </th>
                    <td className="px-4 py-3.5 text-white/70">{row.scan}</td>
                    <td className="px-4 py-3.5 text-white/85">{row.pentest}</td>
                    <td className="px-4 py-3.5 text-white/70">{row.red}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-12 text-2xl font-bold tracking-tight md:text-3xl">{c.vsGlossaryTitle}</h3>
          <dl className="mt-6 grid gap-4 md:grid-cols-2">
            {c.vsGlossary.map((g) => (
              <div key={g.term} className="rounded-2xl border border-white/10 bg-transparent p-6 transition hover:border-white/20">
                <dt className="text-base font-semibold tracking-tight text-white">{g.term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-white/70">{g.def}</dd>
              </div>
            ))}
          </dl>

          {c.vsParas.map((p, i) => (
            <p key={i} className="mt-6 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
              <RichText para={p} />
            </p>
          ))}
        </div>
      </section>

      {/* ARTEN */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.artenLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.artenHeadline}</h2>
        <p className="mt-4 max-w-3xl text-white/70">{c.artenSub}</p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {c.boxes.map((b) => (
            <article
              key={b.title}
              className="rounded-3xl border border-white/10 bg-transparent p-7 transition hover:border-white/20"
            >
              <h3 className="text-lg font-semibold tracking-tight text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{b.desc}</p>
            </article>
          ))}
        </div>
        <div className="mt-6 rounded-2xl border border-[#FF3B30]/20 bg-[#FF3B30]/10 p-6">
          <p className="text-sm leading-relaxed text-white/85">
            <RichText para={c.boxNote} />
          </p>
        </div>

        <h3 className="mt-16 text-2xl font-bold tracking-tight md:text-3xl">{c.criteriaTitle}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          <RichText para={c.criteriaIntro} />
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {c.criteria.map((cr, i) => {
            const Icon = CRITERIA_ICONS[i % CRITERIA_ICONS.length];
            return (
              <div key={cr.title} className="rounded-2xl border border-white/10 bg-transparent p-6 transition hover:border-white/20">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0B] text-[#FF3B30]">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="mt-4 text-base font-semibold text-white">{cr.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{cr.desc}</p>
              </div>
            );
          })}
        </div>

        <h3 className="mt-16 text-2xl font-bold tracking-tight md:text-3xl">{c.objektTitle}</h3>
        <p className="mt-3 max-w-2xl text-white/70">{c.objektSub}</p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {c.objekte.map((o, i) => {
            const Icon = OBJEKT_ICONS[i % OBJEKT_ICONS.length];
            return (
              <article
                key={o.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-transparent p-6 transition hover:border-white/20"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0A0A0B] text-white">
                  <Icon className="h-4 w-4" />
                </div>
                <h4 className="mt-4 text-base font-semibold tracking-tight text-white">{o.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{o.desc}</p>
                <Link
                  href={o.href}
                  className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.18em] text-[#FF3B30] transition hover:text-[#FF6B61]"
                >
                  {o.linkLabel} <ArrowRight className="h-3 w-3" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* STANDARDS */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>{c.stdLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.stdHeadline}</h2>
          <p className="mt-4 max-w-3xl text-white/70">{c.stdSub}</p>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.standards.map((s) => (
              <article
                key={s.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 premium-card p-6 transition hover:border-[#FF3B30]"
              >
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0B] text-[#FF3B30]">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                  {s.links.map((l) => (
                    <a
                      key={l.url}
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#FF6B61] transition hover:text-[#FF8077]"
                    >
                      {l.label} <ArrowRight className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ABLAUF - id ist der Anker fuer das HowTo-Schema (#ablauf) */}
      <section id="ablauf" className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.ablaufLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.ablaufHeadline}</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
          <RichText para={c.ablaufSub} />
        </p>

        <ol className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {c.phases.map((p) => (
            <li key={p.title} className="rounded-2xl border border-white/10 bg-transparent p-6 transition hover:border-white/20">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF3B30]">
                {p.title.split(' · ')[0]}
              </div>
              <div className="mt-2 text-lg font-semibold tracking-tight text-white">{p.title.split(' · ')[1]}</div>
              <p className="mt-2 text-sm text-white/70">{p.desc}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-14 text-2xl font-bold tracking-tight md:text-3xl">{c.durationTitle}</h3>
        {c.durationParas.map((p, i) => (
          <p key={i} className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            <RichText para={p} />
          </p>
        ))}
      </section>

      {/* PFLICHT / REGULATORIK */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>{c.pflichtLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.pflichtHeadline}</h2>
          <p className="mt-4 max-w-3xl text-white/70">{c.pflichtSub}</p>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">{c.pflichtQuote.lead}</p>
          <blockquote className="mt-4 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-base leading-relaxed text-white/90 md:text-lg">{c.pflichtQuote.text}</p>
            <footer className="mt-4 text-sm text-white/60">
              <a
                href={c.pflichtQuote.srcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FF6B61] transition hover:text-[#FF8077]"
              >
                {c.pflichtQuote.src}
              </a>
            </footer>
          </blockquote>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[760px] text-sm">
              <caption className="sr-only">{c.pflichtTableCaption}</caption>
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  {c.pflichtTableHead.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3.5 text-left font-semibold text-white">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.pflichtRows.map((row, i) => {
                  const Icon = PFLICHT_ICONS[i % PFLICHT_ICONS.length];
                  return (
                    <tr key={row.reg} className="border-b border-white/10 last:border-b-0 align-top">
                      <th scope="row" className="px-4 py-4 text-left font-semibold text-white">
                        <span className="inline-flex items-center gap-2">
                          <Icon className="h-4 w-4 shrink-0 text-[#FF3B30]" />
                          {row.href ? (
                            <Link href={row.href} className="text-[#FF6B61] transition hover:text-[#FF8077]">
                              {row.reg}
                            </Link>
                          ) : (
                            row.reg
                          )}
                        </span>
                      </th>
                      <td className="px-4 py-4 text-white/75">
                        {row.req}{' '}
                        <a
                          href={row.srcUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap text-[12px] text-white/50 underline underline-offset-2 transition hover:text-white/75"
                        >
                          {locale === 'en' ? 'Source' : 'Quelle'}
                        </a>
                      </td>
                      <td className="px-4 py-4 text-white/70">{row.praxis}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {c.pflichtParas.map((p, i) => (
            <p key={i} className="mt-6 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
              <RichText para={p} />
            </p>
          ))}
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-white/50">{c.disclaimer}</p>
        </div>
      </section>

      {/* BEDROHUNGSLAGE */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.threatLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.threatHeadline}</h2>
        <p className="mt-4 max-w-2xl text-white/70">{c.threatSub}</p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {c.threats.map((s) => (
            <div key={s.label} className="flex flex-col bg-[#16141A] p-6">
              <div className="premium-tabular text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                {s.value}
              </div>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/70">{s.label}</p>
              <a
                href={s.srcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#FF6B61] transition hover:text-[#FF8077]"
              >
                {c.threatSourceLabel}: {s.srcLabel}
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
          <RichText para={c.threatOutro} />
        </p>
      </section>

      {/* KOSTEN */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>{c.kostenLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.kostenHeadline}</h2>
          {c.kostenParas.map((p, i) => (
            <p key={i} className="mt-4 max-w-2xl text-white/70">
              <RichText para={p} />
            </p>
          ))}

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {c.kostenAnchors.map((p, i) => (
              <article
                key={p.name}
                className={
                  'flex flex-col rounded-3xl border p-8 transition ' +
                  (i === 1 ? 'border-[#0A0A0B] bg-[#0A0A0B] text-white' : 'border-white/10 bg-transparent hover:border-white/20')
                }
              >
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/65">{p.name}</div>
                <div className="mt-4 premium-tabular text-4xl font-extrabold tracking-tight">{p.price}</div>
                <p className="mt-3 text-sm text-white/70">{p.desc}</p>
              </article>
            ))}
          </div>

          <h3 className="mt-12 text-xl font-bold tracking-tight md:text-2xl">{c.kostenFactorsTitle}</h3>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {c.kostenFactors.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-white/75">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3B30]" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/pentest-kosten"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-black"
            >
              {c.kostenCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/preisrechner"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
            >
              {c.kostenCta2} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ANBIETERWAHL */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.anbieterLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.anbieterHeadline}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
          <RichText para={c.anbieterSub} />
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ul className="space-y-4">
            {c.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-transparent p-5 text-sm text-white/80 transition hover:border-white/20">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#FF3B30]" />
                {item}
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl border border-white/10 bg-transparent p-7">
            <h3 className="text-lg font-semibold tracking-tight text-white">{c.legalTitle}</h3>
            {c.legalParas.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-white/70">
                <RichText para={p} />
              </p>
            ))}
            <Link
              href="/penetrationstest-anbieter"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
            >
              {c.anbieterCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      {/* SODU SECURE */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>{c.soduLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.soduHeadline}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            <RichText para={c.soduSub} />
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {c.soduPoints.map((p) => (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 premium-card p-6 transition hover:border-[#FF3B30]"
              >
                <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0B] text-[#FF3B30]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{p.text}</p>
              </article>
            ))}
          </div>

          <ol className="mt-8 grid gap-3 md:grid-cols-3">
            {c.soduSteps.map((s) => (
              <li key={s.title} className="rounded-2xl border border-white/10 bg-transparent p-6 transition hover:border-white/20">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#FF3B30]">
                  {s.title.split(' · ')[0]}
                </div>
                <div className="mt-2 text-lg font-semibold tracking-tight text-white">{s.title.split(' · ')[1]}</div>
                <p className="mt-2 text-sm text-white/70">{s.desc}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/request-pentest"
              className="premium-cta inline-flex items-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              {c.soduCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-sm text-white/60">{c.soduCta2}</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-24">
        <SectionLabel>{c.faqLabel}</SectionLabel>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.faqHeadline}</h2>

        <div className="mt-10 space-y-3">
          {c.faqs.map((f) => (
            <details key={f.q} className="premium-card group rounded-2xl p-6 open:ring-1 open:ring-[#FF3B30]/25 transition">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-white">
                <span>{f.q}</span>
                <span className="text-[#FF3B30] text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* WEITERFUEHRENDE INHALTE */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <SectionLabel>{c.weiterLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.weiterHeadline}</h2>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.weiterLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group rounded-2xl border border-white/10 bg-transparent p-6 transition hover:border-white/20"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">{l.title}</h3>
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#FF3B30] transition group-hover:translate-x-0.5" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] md:text-6xl">
            <span className="premium-silver">{c.finalHeadline}</span>
          </h2>
          <p className="mt-4 text-white/60">{c.finalSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/request-pentest"
              className="premium-cta inline-flex items-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              {c.finalPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pentest-kosten"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white/85 transition hover:border-white/50 hover:text-white"
            >
              {c.finalSecondary} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
