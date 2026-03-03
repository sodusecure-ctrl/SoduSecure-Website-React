import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Web Application Pentest – OWASP Top 10 | Zertifizierte Pentester | SODU Secure',
  description: 'Web Application Pentest: OWASP Top 10, SQL Injection, Auth-Bypasses – manuell getestet von zertifizierten Pentestern. Transparenter Festpreis. Jetzt Preis berechnen – ab 2.500 €.',
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
    title: 'Web Application Pentest – OWASP Top 10 | SODU Secure',
    description: 'OWASP Top 10, SQL Injection, Auth-Bypasses – manuell getestet, zertifizierte Pentester. Festpreis ab 2.500 €.',
    url: `${baseUrl}/services/web-application-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/web-application-testing`,
  },
};
