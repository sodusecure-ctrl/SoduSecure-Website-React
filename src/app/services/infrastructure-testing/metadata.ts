import { Metadata } from 'next';

const baseUrl = 'https://sudosecure.com';

export const metadata: Metadata = {
  title: 'Infrastructure Penetration Testing - Servers & Systems',
  description: 'Comprehensive infrastructure security testing including servers, databases, and internal systems. Identify vulnerabilities in your IT infrastructure.',
  keywords: [
    'infrastructure pentesting',
    'server security testing',
    'database security',
    'internal penetration testing',
    'IT infrastructure security',
  ],
  openGraph: {
    title: 'Infrastructure Penetration Testing - SudoSecure',
    description: 'Professional infrastructure security testing for servers and systems.',
    url: `${baseUrl}/services/infrastructure-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/infrastructure-testing`,
    languages: {
      en: `${baseUrl}/en/services/infrastructure-testing`,
      de: `${baseUrl}/de/services/infrastructure-testing`,
    },
  },
};
