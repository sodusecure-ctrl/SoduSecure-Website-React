import type { Metadata } from 'next';
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
    a: 'NIS2 betrifft Unternehmen in erfassten Sektoren wie Energie, Transport, Gesundheit, digitale Dienste oder Produktion ab mindestens 50 Beschäftigten oder über 10 Mio. € Jahresumsatz. Ab 250 Beschäftigten bzw. über 50 Mio. € Umsatz gelten Sie in hochkritischen Sektoren als wesentliche Einrichtung mit strengeren Pflichten und schärferer Aufsicht.',
  },
  {
    q: 'Welche Gesetze verlangen einen Penetrationstest?',
    a: 'Mehrere Gesetze verlangen regelmäßige Sicherheitstests: NIS2 fordert in Art. 21 die Bewertung der Wirksamkeit Ihrer Maßnahmen, DORA in Art. 24 bis 27 Resilienztests inklusive TLPT, die MDR verlangt in Anhang I nach dem Stand der Technik abgesicherte Medizinprodukt-Software und die DSGVO in Art. 32 die regelmäßige Wirksamkeitsprüfung. Ein Penetrationstest ist dafür das anerkannte Mittel.',
  },
  {
    q: 'Was gilt, wenn mehrere Gesetze auf mein Unternehmen zutreffen?',
    a: 'Treffen mehrere Gesetze auf Ihr Unternehmen zu, gilt meist die speziellere Regelung vorrangig: Für Finanzunternehmen verdrängt DORA die NIS2-Richtlinie weitgehend, die MDR gilt für Medizinprodukt-Software unabhängig von der Unternehmensgröße. Die DSGVO gilt parallel, sobald Sie personenbezogene Daten verarbeiten. Der Check zeigt Ihnen die primäre Verordnung mit Begründung.',
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
    a: 'NIS2 covers companies in listed sectors such as energy, transport, healthcare, digital services and manufacturing with at least 50 employees or more than EUR 10 million in annual turnover. From 250 employees or over EUR 50 million turnover, companies in highly critical sectors count as essential entities with stricter duties and supervision.',
  },
  {
    q: 'Which laws require a penetration test?',
    a: 'Several laws require regular security testing: NIS2 Art. 21 demands assessing the effectiveness of your measures, DORA Art. 24 to 27 requires resilience testing including TLPT, the MDR requires medical device software secured to the state of the art in Annex I, and GDPR Art. 32 requires regularly testing your technical safeguards. A penetration test is the recognised means of evidence.',
  },
  {
    q: 'What applies if several laws affect my company?',
    a: 'If several laws apply to your company, the more specific regime usually takes precedence: for financial entities DORA largely supersedes NIS2, while the MDR applies to medical device software regardless of company size. The GDPR applies in parallel whenever you process personal data. The check shows your primary regulation with reasoning.',
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
    </>
  );
}
