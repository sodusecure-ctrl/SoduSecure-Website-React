import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Internes Audit ISO 27001 | Extern durchführen lassen',
  description:
    'Internes Audit nach ISO 27001 Kapitel 9.2 extern durchführen lassen - unabhängig, auditsicher dokumentiert, mit Maßnahmenplan. Auch NIS2-Gap-Assessment und TISAX-Vorbereitung. Jetzt anfragen.',
  keywords: [
    'Internes Audit ISO 27001',
    'internes Audit extern vergeben',
    'ISO 27001 Audit',
    'ISMS internes Audit',
    'ISO 27001 internes Audit Pflicht',
    'Gap-Analyse ISO 27001',
    'NIS2 Gap Assessment',
    'TISAX Vorbereitung',
    'Auditprogramm ISO 27001',
    'Zertifizierungsvorbereitung ISO 27001',
  ],
  openGraph: {
    title: 'Internes Audit ISO 27001 | Sodu Secure',
    description:
      'Konformität prüfen und Risiken identifizieren: Internes Audit nach ISO 27001 Kap. 9.2 durch unabhängige externe Auditoren.',
    url: `${baseUrl}/internes-audit`,
    type: 'website',
    siteName: 'Sodu Secure',
    images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: 'Internes Audit – Sodu Secure' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internes Audit ISO 27001 extern durchführen lassen',
    description: 'Unabhängige interne Audits nach ISO 27001 Kap. 9.2 - auditsicher dokumentiert, mit Maßnahmenplan.',
  },
  alternates: { canonical: `${baseUrl}/internes-audit` },
  robots: { index: true, follow: true },
};

export default function InternesAuditLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Sodu Secure – Internes Audit',
    description: 'Interne Audits nach ISO 27001 Kapitel 9.2 durch unabhängige externe Auditoren – inkl. NIS2-Gap-Assessment und TISAX-Vorbereitung.',
    url: `${baseUrl}/internes-audit`,
    logo: `${baseUrl}/icons/logo.png`,
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    areaServed: ['Germany', 'Austria', 'Switzerland'],
    serviceType: ['ISO 27001 Internal Audit', 'ISMS Audit', 'Gap Assessment'],
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
