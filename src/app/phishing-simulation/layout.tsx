import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Phishing Simulation – Mitarbeiter testen & schulen | SODU Secure',
  description:
    'Professionelle Phishing Simulation für Unternehmen: Testen Sie die Sicherheitsbewusstsein Ihrer Mitarbeiter mit realistischen Phishing-Angriffen. NIS2-konform, DSGVO-konform. Jetzt anfragen.',
  keywords: [
    'Phishing Simulation',
    'Phishing Test Unternehmen',
    'Phishing Simulation Kosten',
    'Social Engineering Test',
    'E-Mail Phishing Test',
    'Mitarbeiter Phishing Test',
    'Phishing Awareness Training',
    'Phishing Kampagne',
    'Spear Phishing Simulation',
    'Phishing Angriff simulieren',
    'NIS2 Phishing',
    'ISO 27001 Phishing Test',
    'Security Awareness Training',
    'Phishing Simulation Deutschland',
    'Phishing Test KMU',
  ],
  openGraph: {
    title: 'Phishing Simulation – Mitarbeiter auf echte Angriffe vorbereiten | SODU Secure',
    description:
      'Realistische Phishing Simulationen testen Ihr Team gegen E-Mail-, Spear-Phishing- und Voice-Angriffe. NIS2-konformer Nachweis inklusive.',
    url: `${baseUrl}/phishing-simulation`,
    type: 'website',
    siteName: 'SODU Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Phishing Simulation – SODU Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phishing Simulation für Unternehmen | SODU Secure',
    description: 'Testen Sie Ihre Mitarbeiter mit realistischen Phishing-Angriffen. NIS2-konform.',
  },
  alternates: { canonical: `${baseUrl}/phishing-simulation` },
  robots: { index: true, follow: true },
};

export default function PhishingSimulationLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SODU Secure – Phishing Simulation',
    description: 'Professionelle Phishing Simulationen für Unternehmen in Deutschland – NIS2- und ISO 27001-konform.',
    url: `${baseUrl}/phishing-simulation`,
    logo: `${baseUrl}/icons/logo.png`,
    image: `${baseUrl}/images/blogs/image9.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['Phishing Simulation', 'Social Engineering Test', 'Security Awareness Training'],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
