import { Metadata } from 'next';

const baseUrl = 'https://sudosecure.com';

export const metadata: Metadata = {
  title: 'SME Security Packages - Affordable Penetration Testing',
  description: 'Affordable penetration testing packages designed for small and medium enterprises. Professional security testing within your budget. Get started today.',
  keywords: [
    'SME security',
    'affordable pentesting',
    'small business security',
    'budget penetration testing',
    'SME packages',
  ],
  openGraph: {
    title: 'SME Security Packages - SudoSecure',
    description: 'Affordable penetration testing packages for small and medium enterprises.',
    url: `${baseUrl}/services/sme-packages`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/sme-packages`,
    languages: {
      en: `${baseUrl}/en/services/sme-packages`,
      de: `${baseUrl}/de/services/sme-packages`,
    },
  },
};
