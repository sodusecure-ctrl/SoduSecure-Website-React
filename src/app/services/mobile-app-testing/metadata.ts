import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Mobile App Penetration Testing - iOS & Android Security',
  description: 'Comprehensive mobile application security testing for iOS and Android apps. Identify vulnerabilities in mobile apps before attackers do. OWASP MASVS compliant testing.',
  keywords: [
    'mobile app pentesting',
    'iOS security testing',
    'Android security testing',
    'mobile application security',
    'OWASP MASVS',
    'mobile penetration testing',
  ],
  openGraph: {
    title: 'Mobile App Penetration Testing - sodusecure',
    description: 'Professional mobile application security testing for iOS and Android.',
    url: `${baseUrl}/services/mobile-app-testing`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/mobile-app-testing`,
  },
};
