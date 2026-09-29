import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Web Application Pentest | OWASP Top 10 | Zertifizierte Pentester',
  description: 'Web Application Pentest: OWASP Top 10, SQL Injection, Auth-Bypasses - manuell getestet von zertifizierten Pentestern. Individuell kalkuliert, meist 4.000 bis 20.000 €. Jetzt Preis berechnen.',
  keywords: [
    'web app pentesting',
    'OWASP testing',
    'web security testing',
    'SQL injection testing',
    'XSS testing',
    'web application security',
    'application penetration testing',
  ],
  openGraph: {
    title: 'Web Application Pentest | OWASP Top 10',
    description: 'OWASP Top 10, SQL Injection, Auth-Bypasses - manuell getestet, zertifizierte Pentester. Individuell kalkuliert, meist 4.000 bis 20.000 €.',
    url: `${baseUrl}/services/web-application-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/web-application-testing`,
  },
};
