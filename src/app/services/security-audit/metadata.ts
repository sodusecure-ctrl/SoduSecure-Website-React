import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Security Audit – NIS2 & ISO 27001 konform | Zertifizierte Pentester | SODU Secure',
  description: 'Security Audit: NIS2 & ISO 27001 konform. Zertifizierte Pentester prüfen Ihre IT vollständig. Transparenter Festpreis, Bericht inkl. Jetzt Preis berechnen.',
  keywords: [
    'security audit',
    'compliance audit',
    'security assessment',
    'risk assessment',
    'security review',
    'compliance testing',
  ],
  openGraph: {
    title: 'Security Audit – NIS2 & ISO 27001 | SODU Secure',
    description: 'NIS2 & ISO 27001 konform. Zertifizierte Pentester, transparenter Festpreis inkl. Bericht. Jetzt Preis berechnen.',
    url: `${baseUrl}/services/security-audit`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/security-audit`,
  },
};
