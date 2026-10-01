import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import RiskCheckLanding from '../pentest-risiko-check/RiskCheckLanding';
import LandingFaq, { type LandingFaqItem } from '@/components/common/LandingFaq';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Welche Gesetze treffen auf mein Unternehmen zu? NIS2, DSGVO, DORA & MDR Check',
  description:
    'Compliance-Schnellcheck in 60 Sekunden: Beantworten Sie 5 Fragen zu Branche, Größe und Daten und erfahren Sie sofort, ob NIS2, DSGVO, DORA oder MDR auf Ihr Unternehmen zutrifft - mit Rechtsgrundlage. Kostenlos & ohne Anmeldung.',
  keywords: [
    'welche gesetze treffen auf mich zu', 'bin ich von NIS2 betroffen', 'NIS2 Betroffenheit prüfen',
    'NIS2 Betroffenheitscheck', 'DORA Betroffenheit', 'MDR Pflicht', 'DSGVO Pflicht',
    'Compliance Check', 'Cybersicherheit Gesetze', 'NIS2 DSGVO DORA MDR', 'Pentest Pflicht',
  ],
  openGraph: {
    title: 'Welche Gesetze treffen auf mein Unternehmen zu? NIS2, DSGVO, DORA & MDR',
    description: 'Compliance-Schnellcheck: In 5 Fragen erfahren Sie, ob NIS2, DSGVO, DORA oder MDR auf Sie zutrifft - mit Rechtsgrundlage.',
    url: `${baseUrl}/welche-gesetze-treffen-zu`,
    type: 'website',
    siteName: 'Sodu Secure',
    locale: 'de_DE',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Compliance-Check NIS2 DSGVO DORA MDR – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welche Gesetze treffen auf mein Unternehmen zu? NIS2, DSGVO, DORA & MDR',
    description: 'Compliance-Schnellcheck: In 5 Fragen zur Betroffenheit von NIS2, DSGVO, DORA oder MDR.',
  },
  alternates: { canonical: `${baseUrl}/welche-gesetze-treffen-zu` },
  robots: { index: true, follow: true },
};

const FAQS_DE: LandingFaqItem[] = [
  {
    q: 'Welche Gesetze treffen auf mein Unternehmen zu?',
    a: 'Welche Gesetze auf Ihr Unternehmen zutreffen, hängt von Branche, Größe und den verarbeiteten Daten ab. In Deutschland sind vor allem vier Regelwerke relevant: die NIS2-Richtlinie, die DSGVO, DORA für den Finanzsektor und die MDR für Medizinprodukt-Software. Unser Schnellcheck zeigt Ihnen nach fünf Fragen sofort, welche Verordnung für Sie greift - inklusive Rechtsgrundlage.',
  },
  {
    q: 'Wie finde ich heraus, welche Gesetze auf mein Unternehmen zutreffen?',
    a: 'Beantworten Sie im Schnellcheck fünf Fragen zu Branche, Mitarbeiterzahl, Umsatz und Datenverarbeitung. Daraus leitet der Check ab, welche Gesetze auf Ihr Unternehmen zutreffen, und nennt die konkrete Rechtsgrundlage, etwa NIS2 Art. 21 oder DSGVO Art. 32. Der Check ist kostenlos, dauert rund 60 Sekunden und erfordert keine Anmeldung.',
  },
  {
    q: 'Bin ich von NIS2 betroffen?',
    a: 'NIS2 betrifft Unternehmen in erfassten Sektoren wie Energie, Transport, Gesundheit, digitale Dienste oder Produktion, die kumulativ mindestens 50 Beschäftigte und mehr als 10 Mio. € Jahresumsatz oder Jahresbilanzsumme erreichen. Ab 250 Beschäftigten bzw. über 50 Mio. € Jahresumsatz gelten Sie in hochkritischen Sektoren als wesentliche Einrichtung mit strengeren Pflichten und schärferer Aufsicht.',
  },
  {
    q: 'Welche Gesetze verlangen einen Penetrationstest?',
    a: 'Mehrere Gesetze verlangen regelmäßige Sicherheitstests: NIS2 fordert in Art. 21 die Bewertung der Wirksamkeit Ihrer Maßnahmen, DORA in Art. 24 bis 27 Resilienztests inklusive TLPT, die MDR verlangt in Anhang I nach dem Stand der Technik abgesicherte Medizinprodukt-Software und die DSGVO in Art. 32 die regelmäßige Wirksamkeitsprüfung. Ein Penetrationstest ist dafür das anerkannte Mittel.',
  },
  {
    q: 'Kann mein Unternehmen gleichzeitig unter NIS2 und DORA fallen?',
    a: 'Ja, der Anwendungsbereich überschneidet sich. Ein Zahlungsdienstleister oder ein IT-Anbieter für Banken erfüllt oft beide Definitionen. Aufgelöst wird das über die Spezialität: Für Finanzunternehmen treten die IKT-Anforderungen aus DORA an die Stelle der NIS2-Risikomanagementpflichten, während Sie in anderen Geschäftsbereichen weiterhin unter NIS2 fallen können. Ein IT-Dienstleister mit Finanz- und Industriekunden bleibt deshalb regelmäßig in beiden Welten. Die Details stehen auf unseren Seiten zu NIS2 und DORA.',
  },
  {
    q: 'Welche Vorschrift gilt vorrangig, wenn mehrere zutreffen?',
    a: 'Die speziellere Regelung geht vor: DORA vor NIS2 für Finanzunternehmen, die MDR vor allgemeinen Anforderungen für Medizinprodukt-Software. Die DSGVO verdrängt aber nichts und wird auch von nichts verdrängt, sie gilt parallel, sobald personenbezogene Daten im Spiel sind. ISO 27001 steht daneben, weil es kein Gesetz ist, sondern eine freiwillige Norm, mit der Sie gesetzliche Pflichten belegen können. Der Schnellcheck nennt Ihnen die primäre Vorschrift mit Begründung.',
  },
  {
    q: 'Reicht ein Penetrationstest als Nachweis für mehrere Vorschriften?',
    a: 'In der Regel ja, wenn Scope und Bericht das hergeben. Derselbe Test kann die Wirksamkeitsprüfung nach Art. 32 DSGVO, die Bewertung der Maßnahmen nach NIS2 Art. 21 und den Nachweis zu Control 8.8 und 8.29 der ISO 27001 abdecken. Voraussetzung ist, dass der geprüfte Umfang alle relevanten Systeme enthält und der Bericht Scope, Methodik, Befunde mit Risikobewertung und die Behebung dokumentiert. Nicht abgedeckt ist das bedrohungsgeleitete TLPT nach DORA, das einen eigenen Ablauf hat.',
  },
  {
    q: 'Welche Nachweise verlangen NIS2, DSGVO und ISO 27001 jeweils unterschiedlich?',
    a: 'NIS2 zielt auf die Geschäftsleitung: Sie muss die Maßnahmen billigen, überwachen und geschult sein, dazu kommen Registrierung beim BSI und Meldewege mit festen Fristen. Die DSGVO zielt auf die Verarbeitung: Verzeichnis der Verarbeitungstätigkeiten, technische und organisatorische Maßnahmen, Auftragsverarbeitungsverträge und die Prüfung ihrer Wirksamkeit. ISO 27001 zielt auf das Managementsystem: Geltungsbereich, Erklärung zur Anwendbarkeit, Risikobehandlungsplan, interne Audits und Managementbewertung. Der technische Prüfbericht ist der gemeinsame Baustein, der Rahmen drumherum unterscheidet sich.',
  },
  {
    q: 'Wie finde ich heraus, in welchen NIS2-Sektor wir fallen?',
    a: 'Die Richtlinie führt die Sektoren in zwei Anhängen: Anhang I enthält die Sektoren mit hoher Kritikalität, etwa Energie, Verkehr, Bankwesen, Gesundheit, Trinkwasser, digitale Infrastruktur und öffentliche Verwaltung. Anhang II enthält die sonstigen kritischen Sektoren, darunter Post- und Kurierdienste, Abfallwirtschaft, Chemie, Lebensmittel, verarbeitendes Gewerbe, digitale Dienste und Forschung. Maßgeblich ist Ihre tatsächliche Haupttätigkeit, nicht der Eintrag im Handelsregister. Der Schnellcheck ordnet Sie anhand Ihrer Angaben zu, Details stehen auf unserer NIS2-Seite.',
  },
  {
    q: 'Welche Gesetze gelten für Software als Medizinprodukt?',
    a: 'Für Medizinprodukt-Software gilt die MDR, die in Anhang I Abschnitt 17 IT-Sicherheit nach dem Stand der Technik über den gesamten Produktlebenszyklus fordert. Parallel greift die DSGVO, da Gesundheitsdaten nach Art. 9 besonders geschützt sind. Für digitale Gesundheitsanwendungen im DiGA-Verzeichnis kommt zusätzlich der Sicherheitsnachweis nach BSI TR-03161 hinzu.',
  },
];

const FAQS_EN: LandingFaqItem[] = [
  {
    q: 'Which laws apply to my company?',
    a: 'Which laws apply to your company depends on your industry, size and the data you process. In Germany, four frameworks matter most: the NIS2 Directive, the GDPR, DORA for the financial sector and the MDR for medical device software. Our quick check asks five questions and immediately shows which regulation applies to you, including the legal basis.',
  },
  {
    q: 'How do I find out which laws apply to my company?',
    a: 'Answer five short questions about your industry, headcount, turnover and data processing. The check then derives which laws apply to your company and names the specific legal basis, such as NIS2 Art. 21 or GDPR Art. 32. It is free, takes about 60 seconds and requires no registration.',
  },
  {
    q: 'Is my company affected by NIS2?',
    a: 'NIS2 covers companies in listed sectors such as energy, transport, healthcare, digital services and manufacturing that cumulatively reach at least 50 employees and more than EUR 10 million in annual turnover or annual balance sheet total. From 250 employees or over EUR 50 million turnover, companies in highly critical sectors count as essential entities with stricter duties and supervision.',
  },
  {
    q: 'Which laws require a penetration test?',
    a: 'Several laws require regular security testing: NIS2 Art. 21 demands assessing the effectiveness of your measures, DORA Art. 24 to 27 requires resilience testing including TLPT, the MDR requires medical device software secured to the state of the art in Annex I, and GDPR Art. 32 requires regularly testing your technical safeguards. A penetration test is the recognised means of evidence.',
  },
  {
    q: 'Can my company fall under NIS2 and DORA at the same time?',
    a: 'Yes, the scopes overlap. A payment service provider or an IT vendor serving banks often meets both definitions. The conflict is resolved by specificity: for financial entities the ICT requirements of DORA replace the NIS2 risk management duties, while other parts of your business can still fall under NIS2. An IT provider with both financial and industrial clients therefore regularly stays in both worlds. The detail sits on our NIS2 and DORA pages.',
  },
  {
    q: 'Which regulation takes precedence when several apply?',
    a: 'The more specific regime wins: DORA over NIS2 for financial entities, the MDR over general requirements for medical device software. The GDPR neither supersedes nor is superseded, it applies in parallel as soon as personal data is involved. ISO 27001 sits beside all of them because it is not a law but a voluntary standard you can use to evidence legal duties. The quick check names your primary regulation with reasoning.',
  },
  {
    q: 'Can one penetration test serve as evidence for several regulations?',
    a: 'Usually yes, provided the scope and the report support it. The same test can cover the effectiveness review under Art. 32 GDPR, the assessment of measures under NIS2 Art. 21 and the evidence for ISO 27001 controls 8.8 and 8.29. The condition is that the tested scope includes all relevant systems and that the report documents scope, methodology, findings with risk rating and remediation. Threat-led penetration testing under DORA is not covered, it follows its own process.',
  },
  {
    q: 'What evidence do NIS2, GDPR and ISO 27001 each require differently?',
    a: 'NIS2 targets management: it must approve and supervise the measures and be trained, plus registration with the BSI and reporting within fixed deadlines. The GDPR targets the processing: records of processing activities, technical and organisational measures, processor agreements and testing their effectiveness. ISO 27001 targets the management system: scope, statement of applicability, risk treatment plan, internal audits and management review. The technical test report is the shared building block, the framework around it differs.',
  },
  {
    q: 'How do I find out which NIS2 sector we belong to?',
    a: 'The directive lists the sectors in two annexes. Annex I covers sectors of high criticality such as energy, transport, banking, health, drinking water, digital infrastructure and public administration. Annex II covers other critical sectors including postal and courier services, waste management, chemicals, food, manufacturing, digital providers and research. What counts is your actual main activity, not your commercial register entry. The quick check classifies you from your answers, the detail sits on our NIS2 page.',
  },
  {
    q: 'Which laws apply to software as a medical device?',
    a: 'Medical device software falls under the MDR, whose Annex I section 17 requires IT security in line with the state of the art across the entire product lifecycle. The GDPR applies in parallel because health data is specially protected under Art. 9. Digital health applications listed in the German DiGA register additionally need the BSI TR-03161 security evidence.',
  },
];

export default async function Page() {
  const locale = await getLocale();
  const isDe = locale !== 'en';

  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – Compliance-Check (NIS2, DSGVO, DORA, MDR)',
    description: 'Kostenloser Compliance-Schnellcheck: Welche Cybersicherheits-Verordnung (NIS2, DSGVO, DORA, MDR) verpflichtet Ihr Unternehmen? Anschließend prüfsicherer Penetrationstest-Nachweis.',
    url: `${baseUrl}/welche-gesetze-treffen-zu`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['Compliance Assessment', 'NIS2', 'DORA', 'MDR', 'DSGVO', 'Penetrationstest'],
  };

  const faqs = isDe ? FAQS_DE : FAQS_EN;

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <RiskCheckLanding isDe={isDe} variant="compliance" />
      <LandingFaq
        faqs={faqs}
        withSchema={false}
        headline={isDe ? 'Häufige Fragen' : 'Frequently asked questions'}
      />
      <section className="premium-section border-t border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <h2 className="text-lg font-semibold text-white">
            {isDe ? 'Einzelne Vorschrift im Detail' : 'Each regulation in detail'}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { href: '/nis2', title: 'NIS2', de: 'Betroffenheit, Art. 21 und Meldepflichten.', en: 'Scope, Art. 21 duties and reporting deadlines.' },
              { href: '/dora', title: 'DORA', de: 'Fünf Säulen, Testprogramm und Drittdienstleister.', en: 'Five pillars, testing programme and third-party risk.' },
              { href: '/dsgvo-penetrationstest', title: isDe ? 'DSGVO' : 'GDPR', de: 'Art. 32, Wirksamkeitsprüfung und Auftragsverarbeitung.', en: 'Art. 32, effectiveness testing and processors.' },
              { href: '/iso-27001', title: 'ISO 27001', de: 'ISMS, Anhang A und technische Nachweise.', en: 'ISMS, Annex A and technical evidence.' },
              { href: '/tlpt', title: 'TLPT', de: 'Bedrohungsgeleitetes Testen nach DORA Art. 26.', en: 'Threat-led testing under DORA Art. 26.' },
              { href: '/bsig', title: 'BSIG / KRITIS', de: 'Stand der Technik und Nachweis gegenüber dem BSI.', en: 'State of the art and evidence towards the BSI.' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="premium-card rounded-2xl p-5 transition hover:ring-1 hover:ring-[#FF3B30]/25"
              >
                <span className="block text-base font-semibold text-white">{item.title}</span>
                <span className="mt-2 block text-sm text-white/70">{isDe ? item.de : item.en}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
