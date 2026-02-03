import { Metadata } from 'next';

const baseUrl = 'https://sodusecure.de';

export const metadata: Metadata = {
  title: 'Contact Us - Get Your Free Security Consultation',
  description: 'Contact sodusecure for professional penetration testing services. Get a free consultation and quote for your security needs. Available in English and German.',
  keywords: [
    'contact cybersecurity',
    'penetration testing quote',
    'security consultation',
    'get pentest quote',
  ],
  openGraph: {
    title: 'Contact sodusecure - Get Your Free Security Consultation',
    description: 'Contact us for professional penetration testing services. Free consultation available.',
    url: `${baseUrl}/contact`,
    type: 'website',
  },
  alternates: {
    canonical: `${baseUrl}/contact`,
    languages: {
      en: `${baseUrl}/en/contact`,
      de: `${baseUrl}/de/contact`,
    },
  },
};
