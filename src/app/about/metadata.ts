import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.de';

export const metadata: Metadata = {
  title: 'About Us - Expert Penetration Testing Team',
  description: 'Meet our team of certified penetration testers and cybersecurity experts. Years of experience in identifying and fixing security vulnerabilities across industries.',
  keywords: [
    'cybersecurity team',
    'penetration testing experts',
    'certified ethical hackers',
    'security consultants',
    'OSCP',
    'CEH',
  ],
  openGraph: {
    title: 'About sodusecure - Expert Penetration Testing Team',
    description: 'Meet our team of certified penetration testers and cybersecurity experts.',
    url: `${baseUrl}/about`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/about`,
    languages: {
      en: `${baseUrl}/en/about`,
      de: `${baseUrl}/de/about`,
    },
  },
};
