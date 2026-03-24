import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Phishing-Kampagne – Social Engineering Test | SODU Secure',
  description: 'Professionelle Phishing-Kampagne zur Überprüfung der Mitarbeiter-Awareness. Erfahren Sie, wie anfällig Ihr Unternehmen für Social Engineering Angriffe ist. Kostenlose Testkampagne verfügbar.',
  keywords: [
    'Phishing Kampagne',
    'Phishing Simulation',
    'Social Engineering Test',
    'Phishing Training',
    'IT-Sicherheit',
    'Phishing Awareness',
    'Social Engineering Angriff',
    'Phishing Test Unternehmen',
    'Cybersecurity Training',
    'Phishing Kosten',
    'Phishing Angebot',
    'SODU Secure Phishing',
    'Security Awareness',
    'IT Security',
    'Cybersecurity',
    'Phishing Simulation',
    'Awareness Training',
    'Social Engineering Test',
    'Phishing Kampagne Kosten',
  ],
  openGraph: {
    title: 'Phishing-Kampagne – Social Engineering Test | SODU Secure',
    description: 'Professionelle Phishing-Kampagne zur Überprüfung der Mitarbeiter-Awareness. Erfahren Sie, wie anfällig Ihr Unternehmen für Social Engineering Angriffe ist.',
    url: `${baseUrl}/phishing`,
    type: 'website',
    siteName: 'SODU Secure',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phishing-Kampagne – Social Engineering Test | SODU Secure',
    description: 'Professionelle Phishing-Kampagne zur Überprüfung der Mitarbeiter-Awareness.',
  },
  alternates: {
    canonical: `${baseUrl}/phishing`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BerlinKMUPhishingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}