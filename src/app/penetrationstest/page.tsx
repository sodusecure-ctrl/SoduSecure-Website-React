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

/**
 * Stand der inhaltlichen Pruefung dieser Seite.
 *
 * Auf der Trefferliste zu "penetrationstest" zeigt Google bei mehreren
 * Wettbewerbern ein Datum neben dem Treffer - heise 15.06.2026, keepbit
 * 31.10.2025, n-komm "vor 7 Tagen", IT-Schulungen 17.10.2025. Bei uns stand
 * dort nichts, obwohl die Seite 21 Schema-Typen traegt: datePublished und
 * dateModified fehlten als einzige.
 *
 * NUR von Hand hochsetzen, und nur wenn Phasen, Testarten und Standards
 * tatsaechlich durchgesehen wurden. Ein Datum, das bei jedem Deploy
 * mitwandert, ist ein vorgetaeuschtes Frischesignal.
 */
const STAND = {
  datePublished: '2026-09-29',
  dateModified: '2026-11-24',
  label: '24. November 2026',
} as const;

export const metadata: Metadata = {
  // "Definition" raus (liefert die AI Overview bereits), "Kosten" raus (gehört
  // /pentest-kosten). Die Zahl 5 bleibt: Zahlen im Titel zu entfernen kostet CTR.
  //
  // Trenner "|" ersetzt durch einen durchgehenden Satz. Auf /pentest-kosten und
  // /penetrationstest-anbieter hat Google Titel mit "|" verworfen und
  // stattdessen die H1 angezeigt - offenbar liest es solche Titel als
  // Stueckwerk. Seit der Umstellung auf ganze Saetze uebernimmt Google sie
  // woertlich. Titel und H1 tragen jetzt dieselbe Aussage.
  // absolute: Ohne das haengt das Root-Template " | Sodu Secure" an und der
  // Titel wird gekappt.
  //
  // Von "Ablauf in 5 Phasen" auf eine Leistungsaussage umgestellt. Vorbild ist
  // SySS, die auf dieser Suche Platz 4 halten mit "Pentest - IT-Sicherheit auf
  // Schwachstellen pruefen": Begriff vorn, danach was man davon hat. Ein Titel,
  // der eine Gliederung ankuendigt, spricht Nachschlagende an; einer, der eine
  // Leistung benennt, spricht Einkaufende an. "Manuell" steht bewusst drin, das
  // ist der Unterschied zum Scanner-Export und der Grund, warum jemand hier
  // kauft statt dort. Gemessen 581 px bei einer Grenze von rund 600.
  title: { absolute: 'Penetrationstest: IT-Systeme manuell auf Schwachstellen prüfen' },
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
    title: 'Penetrationstest: Ablauf in 5 Phasen, Arten und Standards',
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

  sinnvollLabel: string;
  sinnvollHeadline: string;
  sinnvollIntro: Para;
  sinnvollAnlaesse: { titel: string; text: string }[];

  moduleLabel: string;
  moduleHeadline: string;
  moduleSub: string;
  moduleGruppen: { titel: string; text: string; items: { name: string; href: string }[] }[];

  beratungHeadline: string;
  beratungText: string;
  beratungCta: string;

  praxisLabel: string;
  praxisHeadline: string;
  praxisIntro: Para;
  praxisFunde: { titel: string; was: string; warum: string }[];
  praxisOutro: Para;

  ablaufLabel: string;
  ablaufHeadline: string;
  ablaufSub: Para;
  phases: { title: string; desc: string }[];
  durationTitle: string;
  durationParas: Para[];

  kostenCta2: string;

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
  // Ueberschrift auf eine Leistungsaussage umgestellt, passend zum Titel.
  //
  // Vorher: "Penetrationstest: Definition, Ablauf in 5 Phasen, Arten, Kosten."
  // Das kuendigt eine Gliederung an - also ein Nachschlagewerk. Auf dieser
  // Trefferliste steht Wikipedia auf Platz 1; gegen das beste Nachschlagewerk
  // gewinnt niemand. SySS haelt Platz 4 mit "Pentest von SySS - Kompetenz, die
  // Ihre Systeme schuetzt": Leistung statt Inhaltsverzeichnis.
  //
  // Abwaegung: "Definition", "Arten" und "Kosten" fallen aus der H1 heraus und
  // damit ein Relevanzsignal fuer diese Suchanfragen. Die Begriffe stehen aber
  // weiterhin als eigene H2 auf der Seite ("Was ist ein Penetrationstest?",
  // "Welche Arten von Penetrationstests gibt es?", "Was kostet ein
  // Penetrationstest?"), die thematische Abdeckung bleibt also erhalten.
  heroLine1: 'Penetrationstest:',
  heroLine2: 'IT-Systeme manuell auf Schwachstellen prüfen.',
  heroSub:
    'Wir greifen Ihre Systeme kontrolliert an, bevor es jemand anders tut - von Hand, nach OWASP, PTES und BSI-Methodik, nicht per Scanner-Export. Jeder Befund kommt mit Machbarkeitsnachweis, CVSS-Vektor und einer Empfehlung, die Ihre Entwickler umsetzen können. Festpreis, Angebot in 24 Stunden, Retest nach der Behebung inklusive.',
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

  sinnvollLabel: 'Anlass',
  sinnvollHeadline: 'Wann ein Penetrationstest sinnvoll ist.',
  sinnvollIntro: [
    { t: 'Die ehrliche Antwort: nicht ständig, aber regelmäßig und immer dann, wenn sich etwas Grundlegendes ändert. Ein Test auf einem System, das morgen umgebaut wird, ist verschwendetes Geld. Diese sechs Anlässe decken die allermeisten Fälle ab.' },
  ],
  sinnvollAnlaesse: [
    { titel: 'Vor dem Go-Live', text: 'Eine neue Anwendung oder ein neues Portal geht an den Start. Vorher prüfen ist billiger als hinterher abschalten.' },
    { titel: 'Nach größeren Umbauten', text: 'Migration in die Cloud, neues ERP, umgestelltes Active Directory. Jede Architekturänderung bringt neue Angriffswege mit.' },
    { titel: 'Für eine Zertifizierung', text: 'ISO 27001, TISAX oder eine NIS2-Prüfung verlangen einen Nachweis, dass die technischen Maßnahmen wirken. Der Bericht liefert ihn.' },
    { titel: 'Weil ein Kunde ihn verlangt', text: 'Ausschreibungen und Konzernlieferanten fragen zunehmend einen aktuellen Pentest-Bericht ab, oft mit Datum aus den letzten zwölf Monaten.' },
    { titel: 'Nach einem Vorfall', text: 'Nach Phishing, Ransomware oder einem auffälligen Login gehört geprüft, ob der Weg hinein wirklich geschlossen ist.' },
    { titel: 'Einmal im Jahr als Routine', text: 'Ohne besonderen Anlass. Die Angriffsfläche verändert sich auch dann, wenn niemand bewusst etwas umbaut.' },
  ],

  moduleLabel: 'Leistungen',
  moduleHeadline: 'Was wir für Sie prüfen.',
  moduleSub: 'Jedes Modul lässt sich einzeln beauftragen oder kombinieren. Der Umfang wird im Scoping festgelegt, der Preis steht danach fest - ohne Nachträge.',
  moduleGruppen: [
    {
      titel: 'Netzwerk und Infrastruktur',
      text: 'Von außen erreichbare Systeme, das interne Netz und die Windows-Domäne. Hier entstehen die Angriffsketten, die vom ersten Fuß in der Tür bis zum Domänenadministrator führen.',
      items: [
        { name: 'Externe Infrastruktur', href: '/services/infrastructure-testing' },
        { name: 'Internes Netzwerk', href: '/services/network-audit' },
        { name: 'Active Directory', href: '/services/active-directory' },
      ],
    },
    {
      titel: 'Anwendungen und Cloud',
      text: 'Webanwendungen, Schnittstellen, mobile Apps und Cloud-Konten. Geprüft wird nicht nur, ob der erlaubte Weg funktioniert, sondern ob der verbotene es auch tut.',
      items: [
        { name: 'Webanwendung', href: '/services/web-application-testing' },
        { name: 'API', href: '/services/api-security-testing' },
        { name: 'Mobile App', href: '/services/mobile-app-testing' },
        { name: 'Cloud und DevOps', href: '/services/cloud-devops-testing' },
        { name: 'AWS', href: '/services/aws-penetrationstest' },
      ],
    },
    {
      titel: 'Mensch und Organisation',
      text: 'Technik lässt sich härten, Menschen nicht patchen. Diese Module prüfen, wie weit ein Angreifer ohne eine einzige technische Schwachstelle kommt.',
      items: [
        { name: 'Phishing-Simulation', href: '/phishing-simulation' },
        { name: 'Security-Awareness', href: '/security-awareness-schulung' },
        { name: 'Red Team Assessment', href: '/red-team-assessment' },
      ],
    },
    {
      titel: 'KI-Systeme',
      text: 'Sprachmodelle, RAG-Anwendungen und Agenten bringen Angriffswege mit, die in keinem klassischen Prüfkatalog stehen - Prompt Injection, Datenabfluss über Werkzeuge, umgangene Leitplanken.',
      items: [
        { name: 'KI-Penetrationstest', href: '/ki-penetrationstest' },
        { name: 'KI-gestütztes Code-Audit', href: '/sodu-audit-ai' },
      ],
    },
  ],

  beratungHeadline: 'Welcher Test passt zu Ihnen?',
  beratungText: 'Wenn Sie unsicher sind, welches Modul Ihr Risiko tatsächlich abdeckt, klären wir das in einem kurzen Gespräch - kostenlos und ohne Verpflichtung. Danach wissen Sie, was geprüft werden sollte und was es kostet.',
  beratungCta: 'Scope in 3 Minuten festlegen',

  praxisLabel: 'Aus der Praxis',
  praxisHeadline: 'Was wir in fast jedem Projekt wiederfinden.',
  praxisIntro: [
    { t: 'Die Lehrbuchantwort auf "Was findet ein Pentest?" lautet: Schwachstellen. Das stimmt und hilft niemandem. Nützlicher ist, was tatsächlich immer wieder auftaucht. Die folgenden fünf Befunde begegnen uns in nahezu jedem mittelständischen Netz - unabhängig von Branche und Größe. Ausführlich mit Gegenmaßnahmen stehen sie in unserem Artikel ' },
    { t: '5 Sicherheitslücken, die wir bei nahezu jedem KMU finden', href: '/case-studies/blogs/5-sicherheitsluecken-kmu' },
    { t: '.' },
  ],
  praxisFunde: [
    {
      titel: 'Ein Active Directory, das über Jahre gewachsen ist',
      was: 'Dienstkonten mit mehr Rechten als nötig, fehlende Segmentierung zwischen Abteilungen, und Altprotokolle wie NTLMv1 oder SMBv1, die nie abgeschaltet wurden.',
      warum: 'Dann genügt ein einziges übernommenes Benutzerkonto. Kerberoasting und Pass-the-Hash setzen genau hier an, und der Weg bis zum Domänenadministrator ist kürzer, als die meisten IT-Abteilungen vermuten.',
    },
    {
      titel: 'Von außen erreichbare Systeme, die niemand mehr auf dem Schirm hat',
      was: 'Ein VPN-Gateway aus der Homeoffice-Zeit, ein offener Verwaltungsport, eine TLS-Konfiguration von vor fünf Jahren.',
      warum: 'Solche Systeme stehen in jedem Massenscan des Internets. Zwischen der Veröffentlichung einer VPN-Schwachstelle und den ersten automatisierten Angriffen liegen heute oft Stunden, nicht Wochen.',
    },
    {
      titel: 'E-Mail-Absicherung, die nur auf dem Papier existiert',
      was: 'SPF ist gesetzt, DKIM fehlt, und DMARC steht auf p=none.',
      warum: 'p=none meldet nur, es blockiert nichts. Wer das übersieht, lässt zu, dass Fremde im Namen der Geschäftsführung schreiben - die Grundlage jedes gezielten Rechnungsbetrugs.',
    },
    {
      titel: 'Webanwendungen, die nur funktional getestet wurden',
      was: 'Fehlende Zugriffskontrollen zwischen Mandanten, veränderbare Objekt-IDs in der Adresszeile, Authentifizierung ohne zweiten Faktor.',
      warum: 'Ein Funktionstest prüft, ob der erlaubte Weg funktioniert. Ein Penetrationstest prüft, ob der verbotene auch funktioniert. Die OWASP Top 10 führen Broken Access Control nicht ohne Grund auf Platz eins.',
    },
    {
      titel: 'Sicherungen, die nie zurückgespielt wurden',
      was: 'Keine Offline-Kopie, keine dokumentierte Wiederanlaufzeit, kein Test der Rückspielung.',
      warum: 'Eine Sicherung, deren Wiederherstellung nie geprobt wurde, ist keine Sicherung, sondern eine Annahme. Moderne Ransomware verschlüsselt erreichbare Sicherungen zuerst, genau deshalb.',
    },
  ],
  praxisOutro: [
    { t: 'Keiner dieser Punkte ist exotisch, und keiner lässt sich mit einem Werkzeugkauf lösen. Sie entstehen, weil Systeme über Jahre wachsen und niemand von außen draufschaut. Vier der fünf fallen bei einem ' },
    { t: 'automatisierten Schwachstellenscan', href: '/schwachstellenscan' },
    { t: ' übrigens nicht auf - ein Scanner prüft bekannte Versionsstände, keine Rechtelogik und keine Angriffsketten.' },
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

  kostenCta2: 'Preisspanne online berechnen',

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
    { title: 'Pentest Preisindex', desc: 'Unsere Preisstufen und belegte Marktspannen deutscher Anbieter im Vergleich.', href: '/pentest-preisindex' },
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
  heroLine2: 'checking IT systems for weaknesses, by hand.',
  heroSub:
    'We attack your systems under control before someone else does - manually, following OWASP, PTES and the German BSI methodology, not by exporting a scanner report. Every finding comes with a proof of concept, a CVSS vector and a recommendation your developers can act on. Fixed price, quote within 24 hours, retest after remediation included.',
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

  sinnvollLabel: 'Trigger',
  sinnvollHeadline: 'When a penetration test makes sense.',
  sinnvollIntro: [
    { t: 'The honest answer: not constantly, but regularly, and always when something fundamental changes. Testing a system that will be rebuilt tomorrow is wasted money. These six triggers cover almost every case.' },
  ],
  sinnvollAnlaesse: [
    { titel: 'Before go-live', text: 'A new application or portal is about to launch. Checking beforehand is cheaper than switching it off afterwards.' },
    { titel: 'After major changes', text: 'A cloud migration, a new ERP, a rebuilt Active Directory. Every architectural change brings new ways in.' },
    { titel: 'For a certification', text: 'ISO 27001, TISAX or a NIS2 review require evidence that technical measures work. The report provides it.' },
    { titel: 'Because a customer asks', text: 'Tenders and corporate supply chains increasingly ask for a current pentest report, often dated within the last twelve months.' },
    { titel: 'After an incident', text: 'Following phishing, ransomware or a suspicious login, the way in needs checking - properly closed, or only appearing so.' },
    { titel: 'Once a year as routine', text: 'With no particular trigger. The attack surface changes even when nobody deliberately rebuilds anything.' },
  ],

  moduleLabel: 'Services',
  moduleHeadline: 'What we test for you.',
  moduleSub: 'Each module can be booked on its own or combined. Scope is agreed up front, the price is fixed afterwards - no change requests.',
  moduleGruppen: [
    {
      titel: 'Network and infrastructure',
      text: 'Internet-facing systems, the internal network and the Windows domain. This is where the chains form that lead from a first foot in the door to domain admin.',
      items: [
        { name: 'External infrastructure', href: '/services/infrastructure-testing' },
        { name: 'Internal network', href: '/services/network-audit' },
        { name: 'Active Directory', href: '/services/active-directory' },
      ],
    },
    {
      titel: 'Applications and cloud',
      text: 'Web applications, interfaces, mobile apps and cloud accounts. We check not only whether the permitted path works, but whether the forbidden one does too.',
      items: [
        { name: 'Web application', href: '/services/web-application-testing' },
        { name: 'API', href: '/services/api-security-testing' },
        { name: 'Mobile app', href: '/services/mobile-app-testing' },
        { name: 'Cloud and DevOps', href: '/services/cloud-devops-testing' },
        { name: 'AWS', href: '/services/aws-penetrationstest' },
      ],
    },
    {
      titel: 'People and organisation',
      text: 'Technology can be hardened, people cannot be patched. These modules test how far an attacker gets without a single technical vulnerability.',
      items: [
        { name: 'Phishing simulation', href: '/phishing-simulation' },
        { name: 'Security awareness', href: '/security-awareness-schulung' },
        { name: 'Red team assessment', href: '/red-team-assessment' },
      ],
    },
    {
      titel: 'AI systems',
      text: 'Language models, RAG applications and agents bring attack paths that appear in no classic test catalogue - prompt injection, data exfiltration through tools, bypassed guardrails.',
      items: [
        { name: 'AI penetration test', href: '/ki-penetrationstest' },
        { name: 'AI-assisted code audit', href: '/sodu-audit-ai' },
      ],
    },
  ],

  beratungHeadline: 'Which test fits your situation?',
  beratungText: 'If you are unsure which module actually covers your risk, we clarify it in a short call - free and without obligation. Afterwards you know what should be tested and what it costs.',
  beratungCta: 'Define scope in 3 minutes',

  praxisLabel: 'From practice',
  praxisHeadline: 'What we find in almost every engagement.',
  praxisIntro: [
    { t: 'The textbook answer to "what does a pentest find?" is: vulnerabilities. True, and useless. More helpful is what actually keeps coming up. These five findings appear in nearly every mid-sized network we test, regardless of industry or size. Covered in full, with remediation, in our article ' },
    { t: '5 security gaps we find at almost every SME', href: '/case-studies/blogs/5-sicherheitsluecken-kmu' },
    { t: '.' },
  ],
  praxisFunde: [
    {
      titel: 'An Active Directory grown over many years',
      was: 'Service accounts with more rights than they need, no segmentation between departments, and legacy protocols such as NTLMv1 or SMBv1 that were never switched off.',
      warum: 'One compromised user account is then enough. Kerberoasting and pass-the-hash start exactly here, and the path to domain admin is shorter than most IT departments assume.',
    },
    {
      titel: 'Internet-facing systems nobody tracks any more',
      was: 'A VPN gateway from the remote-work years, an exposed management port, a TLS configuration from five years ago.',
      warum: 'Systems like these show up in every internet-wide scan. The gap between a VPN vulnerability going public and the first automated attacks is now measured in hours, not weeks.',
    },
    {
      titel: 'Email protection that exists only on paper',
      was: 'SPF is set, DKIM is missing, and DMARC sits at p=none.',
      warum: 'p=none only reports, it blocks nothing. Overlook it and strangers can write in the name of your management - the basis of every targeted invoice fraud.',
    },
    {
      titel: 'Web applications tested only for function',
      was: 'Missing access controls between tenants, object IDs that can be changed in the address bar, authentication without a second factor.',
      warum: 'A functional test checks whether the permitted path works. A penetration test checks whether the forbidden one works too. There is a reason the OWASP Top 10 place broken access control first.',
    },
    {
      titel: 'Backups that were never restored',
      was: 'No offline copy, no documented recovery time, no restore test.',
      warum: 'A backup whose restoration has never been rehearsed is not a backup, it is an assumption. Modern ransomware encrypts reachable backups first, precisely for that reason.',
    },
  ],
  praxisOutro: [
    { t: 'None of this is exotic, and none of it is solved by buying a tool. These gaps appear because systems grow over years and nobody looks at them from the outside. Four of the five, incidentally, are invisible to an ' },
    { t: 'automated vulnerability scan', href: '/schwachstellenscan' },
    { t: ' - a scanner checks known version numbers, not permission logic and not attack chains.' },
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

  kostenCta2: 'Calculate a price range online',

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
    { title: 'Pentest price index', desc: 'Our price tiers next to sourced market ranges from German providers.', href: '/pentest-preisindex' },
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
      // WebPage traegt das Pruefdatum. Die uebrigen 21 Typen beschreiben die
      // Leistung, keiner von ihnen sagt Google, wann die Seite zuletzt
      // durchgesehen wurde.
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: 'Penetrationstest: IT-Systeme manuell auf Schwachstellen prüfen',
      inLanguage: locale === 'en' ? 'en' : 'de-DE',
      datePublished: STAND.datePublished,
      dateModified: STAND.dateModified,
      isPartOf: { '@id': `${baseUrl}/#website` },
      publisher: { '@id': ORGANIZATION_ID },
    },
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

      {/* WANN SINNVOLL - SySS fuehrt diesen Abschnitt, wir hatten ihn nicht.
          Er faengt die Suchenden ab, die schon wissen was ein Pentest ist und
          nur noch den Anlass suchen. */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <SectionLabel>{c.sinnvollLabel}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.sinnvollHeadline}</h2>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          <RichText para={c.sinnvollIntro} />
        </p>
        <ul className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-2">
          {c.sinnvollAnlaesse.map((a) => (
            <li key={a.titel} className="flex flex-col gap-2 bg-[#16141A] p-6">
              <h3 className="text-base font-bold text-white">{a.titel}</h3>
              <p className="text-sm leading-relaxed text-white/65">{a.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* MODULE - der Leistungskatalog. Das ist der strukturelle Unterschied zu
          vorher: Die Seite zeigt jetzt, was man buchen kann, statt welche
          Testarten es theoretisch gibt. Jede Karte verlinkt auf die
          Leistungsseite, die es ohnehin schon gibt. */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>{c.moduleLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{c.moduleHeadline}</h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">{c.moduleSub}</p>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {c.moduleGruppen.map((g) => (
              <div key={g.titel} className="rounded-2xl border border-white/10 bg-[#16141A] p-6 lg:p-7">
                <h3 className="text-lg font-bold text-white">{g.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{g.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li key={it.href}>
                      <Link
                        href={it.href}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-white/80 transition hover:border-[#FF3B30]/40 hover:text-white"
                      >
                        {it.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BERATUNG - Zwischenruf mitten auf der Seite. SySS setzt denselben
          Block ein, weil nicht jeder Besucher bis zum Schluss liest. */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#1B181F] to-[#141217] p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{c.beratungHeadline}</h2>
              <p className="mt-3 text-base leading-relaxed text-white/70">{c.beratungText}</p>
            </div>
            <div className="flex flex-none flex-col items-stretch gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/request-pentest"
                className="premium-cta inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-semibold text-white"
              >
                {c.beratungCta} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+491777750985"
                className="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30"
              >
                +49 177 7750985
              </a>
            </div>
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

      {/* PRAXIS - eigene Befunde, das inhaltliche Alleinstellungsmerkmal
          gegenueber den Wettbewerbern auf dieser Suche. Die ranken alle mit
          Lehrbuchtexten; keiner von ihnen schreibt, was er tatsaechlich
          vorfindet. */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <SectionLabel>{c.praxisLabel}</SectionLabel>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">
            {c.praxisHeadline}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
            <RichText para={c.praxisIntro} />
          </p>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] lg:grid-cols-2">
            {c.praxisFunde.map((f, i) => (
              <li key={f.titel} className="flex flex-col gap-3 bg-[#16141A] p-6 lg:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="premium-tabular text-sm font-extrabold text-[#FF6B61]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold leading-snug text-white">{f.titel}</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{f.was}</p>
                <p className="text-sm leading-relaxed text-white/55">{f.warum}</p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
            <RichText para={c.praxisOutro} />
          </p>
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
