import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Careers - Join Our Cybersecurity Team',
  description: 'Join sodusecure and work on cutting-edge penetration testing projects. Open positions for penetration testers, security analysts, and cybersecurity experts.',
  keywords: [
    'cybersecurity jobs',
    'penetration tester jobs',
    'security analyst careers',
    'ethical hacker jobs',
  ],
  openGraph: {
    title: 'Careers at sodusecure - Join Our Cybersecurity Team',
    description: 'Join our team of expert penetration testers and security professionals.',
    url: `${baseUrl}/careers`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/careers`,
    languages: {
      en: `${baseUrl}/en/careers`,
      de: `${baseUrl}/de/careers`,
    },
  },
};
