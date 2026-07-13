import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Web Application Pentest – OWASP Top 10 | Zertifizierte Pentester',
  description: 'Web Application Pentest: OWASP Top 10, SQL Injection, Auth-Bypasses – manuell getestet von zertifizierten Pentestern. Transparenter Festpreis. Jetzt Preis berechnen – ab 1.499 €.',
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
    title: 'Web Application Pentest – OWASP Top 10',
    description: 'OWASP Top 10, SQL Injection, Auth-Bypasses – manuell getestet, zertifizierte Pentester. Festpreis ab 1.499 €.',
    url: `${baseUrl}/services/web-application-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/web-application-testing`,
  },
};
