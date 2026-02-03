import { Metadata } from 'next';

const baseUrl = 'https://sudosecure.com';

export const metadata: Metadata = {
  title: 'API Security Testing - REST, GraphQL & SOAP',
  description: 'Secure your APIs with comprehensive security testing. REST API, GraphQL, and SOAP penetration testing. Identify API vulnerabilities and authentication flaws.',
  keywords: [
    'API security testing',
    'REST API pentesting',
    'GraphQL security',
    'API penetration testing',
    'API vulnerability assessment',
    'SOAP security testing',
  ],
  openGraph: {
    title: 'API Security Testing - SudoSecure',
    description: 'Comprehensive API security testing for REST, GraphQL, and SOAP.',
    url: `${baseUrl}/services/api-security-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/api-security-testing`,
    languages: {
      en: `${baseUrl}/en/services/api-security-testing`,
      de: `${baseUrl}/de/services/api-security-testing`,
    },
  },
};
