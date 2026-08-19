import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'SOC as a Service | 24/7 Security Monitoring für KMU',
  description:
    'SOC as a Service - Security Operations Center ohne eigenes Team: 24/7 Monitoring, Alert-Triage durch Analysten und Incident Response. NIS2-taugliche Detektion und Meldeprozesse. Jetzt anfragen.',
  keywords: [
    'SOC as a Service',
    'Security Operations Center',
    'SOC Dienstleister',
    'Managed SOC',
    'SOC für KMU',
    '24/7 Security Monitoring',
    'Managed Detection and Response',
    'MDR Service',
    'SIEM as a Service',
    'Incident Response Service',
    'NIS2 Detektion',
  ],
  openGraph: {
    title: 'SOC as a Service | Sodu Secure',
    description:
      'Security Operations Center ohne eigenes Team: 24/7 Monitoring, Analysten-Triage und Incident Response - NIS2-tauglich.',
    url: `${baseUrl}/soc-as-a-service`,
    type: 'website',
    siteName: 'Sodu Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'SOC as a Service – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOC as a Service für Unternehmen',
    description: '24/7 Security Monitoring, Alert-Triage und Incident Response ohne eigenes SOC-Team.',
  },
  alternates: { canonical: `${baseUrl}/soc-as-a-service` },
  robots: { index: true, follow: true },
};

export default function SocAsAServiceLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – SOC as a Service',
    description: 'Security Operations Center als Service: 24/7 Monitoring, Alert-Triage und Incident Response für Unternehmen.',
    url: `${baseUrl}/soc-as-a-service`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['SOC as a Service', 'Managed Detection and Response', 'Security Monitoring'],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€€',
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
