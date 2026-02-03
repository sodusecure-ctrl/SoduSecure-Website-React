import { Metadata } from 'next';

const baseUrl = 'https://sudosecure.com';

export const metadata: Metadata = {
  title: 'Network Security Audit & Penetration Testing',
  description: 'Complete network security audits to identify vulnerabilities in your network infrastructure. Network penetration testing to protect against external and internal threats.',
  keywords: [
    'network security audit',
    'network pentesting',
    'network vulnerability assessment',
    'infrastructure security',
    'network penetration testing',
  ],
  openGraph: {
    title: 'Network Security Audit - SudoSecure',
    description: 'Professional network security audits and penetration testing.',
    url: `${baseUrl}/services/network-audit`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/services/network-audit`,
    languages: {
      en: `${baseUrl}/en/services/network-audit`,
      de: `${baseUrl}/de/services/network-audit`,
    },
  },
};
