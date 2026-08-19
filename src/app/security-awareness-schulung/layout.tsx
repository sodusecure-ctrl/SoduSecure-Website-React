import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Security Awareness Schulung | Individuelles Training',
  description:
    'Individuelle Security Awareness Schulungen für Mitarbeiter, Entwickler und Führungskräfte - vor Ort oder remote, mit Wissenstest und Compliance-Nachweis für NIS2 und ISO 27001. Jetzt anfragen.',
  keywords: [
    'Security Awareness Schulung',
    'Security Awareness Training',
    'IT-Sicherheitsschulung',
    'Mitarbeiterschulung IT-Sicherheit',
    'Awareness Schulung NIS2',
    'ISO 27001 Schulung Mitarbeiter',
    'Secure Coding Schulung',
    'Phishing Schulung',
    'Cybersecurity Schulung Unternehmen',
    'Security Schulung KMU',
  ],
  openGraph: {
    title: 'Security Awareness Schulung | Sodu Secure',
    description:
      'Maßgeschneidertes Awareness-Training für Ihr Team: praxisnah, von echten Pentestern, mit Nachweis für NIS2 und ISO 27001.',
    url: `${baseUrl}/security-awareness-schulung`,
    type: 'website',
    siteName: 'Sodu Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Security Awareness Schulung – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security Awareness Schulung für Unternehmen',
    description: 'Individuelle Schulungen von echten Pentestern - praxisnah, remote oder vor Ort.',
  },
  alternates: { canonical: `${baseUrl}/security-awareness-schulung` },
  robots: { index: true, follow: true },
};

export default function SecurityAwarenessSchulungLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – Security Awareness Schulungen',
    description: 'Individuelle Security-Awareness-Schulungen für Mitarbeiter, Entwickler und Führungskräfte – vor Ort oder remote.',
    url: `${baseUrl}/security-awareness-schulung`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['Security Awareness Training', 'IT-Sicherheitsschulung', 'Secure Coding Training'],
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
