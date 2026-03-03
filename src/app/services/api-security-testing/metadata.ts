import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'API Security Testing – REST, GraphQL & SOAP | SODU Secure',
  description: 'API Security Testing: OWASP API Top 10, Auth-Fehler & Injection – manuell validiert von zertifizierten Pentestern. Transparenter Festpreis. Jetzt API Pentest konfigurieren.',
  keywords: [
    'API security testing',
    'REST API pentesting',
    'GraphQL security',
    'API penetration testing',
    'API vulnerability assessment',
    'SOAP security testing',
  ],
  openGraph: {
    title: 'API Security Testing – REST, GraphQL & SOAP | SODU Secure',
    description: 'OWASP API Top 10, Auth-Fehler & Injection – manuell validiert, zertifizierte Pentester. Jetzt konfigurieren.',
    url: `${baseUrl}/services/api-security-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/api-security-testing`,
  },
};
