import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Web Application Penetration Testing - OWASP Top 10',
  description: 'Professional web application security testing. Identify SQL injection, XSS, CSRF, and other OWASP Top 10 vulnerabilities. Comprehensive web app pentesting services.',
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
    title: 'Web Application Penetration Testing - sodusecure',
    description: 'Professional web application security testing to identify and fix vulnerabilities.',
    url: `${baseUrl}/services/web-application-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/web-application-testing`,
  },
};
