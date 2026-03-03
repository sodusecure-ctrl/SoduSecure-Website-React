import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Pentest Case Studies & Security Blog | SODU Secure',
  description: 'Pentest Case Studies & Security Blog: Echte Befunde, OWASP Top 10, AD-Angriffe & Cloud-Risiken. Von zertifizierten Pentestern – Praxis statt Theorie.',
  keywords: [
    'security blog',
    'case studies',
    'penetration testing blog',
    'cybersecurity insights',
    'security vulnerabilities',
    'pentesting examples',
    'OWASP',
    'SQL injection',
    'API security',
  ],
  openGraph: {
    title: 'Pentest Case Studies & Security Blog | SODU Secure',
    description: 'Echte Pentest-Befunde, OWASP Top 10 & AD-Angriffe. Von zertifizierten Pentestern – Praxis statt Theorie.',
    url: `${baseUrl}/case-studies`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/case-studies`,
  },
};
