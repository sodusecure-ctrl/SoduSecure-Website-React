import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com'; // Update with your actual domain

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  locale?: string;
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path,
  locale = 'en',
}: PageMetadata): Metadata {
  const fullTitle = `${title} | sodusecure - Professional Penetration Testing`;
  const url = `${baseUrl}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'penetration testing',
      'cybersecurity',
      'security testing',
      'vulnerability assessment',
      'web application security',
      ...keywords,
    ],
    authors: [{ name: 'sodusecure' }],
    creator: 'sodusecure',
    publisher: 'sodusecure',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/en${path}`,
        de: `${baseUrl}/de${path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'de_DE',
      url,
      title: fullTitle,
      description,
      siteName: 'sodusecure',
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'sodusecure - Professional Penetration Testing Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${baseUrl}/images/twitter-image.jpg`],
      creator: '@sodusecure',
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
    verification: {
      google: 'your-google-verification-code', // Add your Google Search Console verification code
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

export const homeMetadata = {
  title: 'Professional Penetration Testing Services',
  description: 'Transparente Pentest Preise ohne Wartezeit. Web, API & Mobile Security Audits inkl. Bericht. Jetzt Pentest konfigurieren oder kostenlos beraten lassen. Zertifizierte Pentester – Festpreis ab 2.500 €.',
  keywords: ['ethical hacking', 'security audit', 'VAPT', 'cyber security services'],
};

export const serviceMetadata = {
  webAppTesting: {
    title: 'Web Application Penetration Testing',
    description: 'Web Application Pentest: OWASP Top 10, SQL Injection, Auth-Bypasses – manuell getestet von zertifizierten Pentestern. Transparenter Festpreis. Jetzt Preis berechnen – ab 2.500 €.',
    keywords: ['web app pentesting', 'OWASP testing', 'web security', 'application security'],
  },
  mobileAppTesting: {
    title: 'Mobile Application Security Testing',
    description: 'Mobile App Pentest für iOS & Android: OWASP MASVS, Reverse Engineering & Datenschutz-Checks. Zertifizierte Pentester, transparenter Festpreis. Preis sofort berechnen – ab 2.500 €.',
    keywords: ['mobile pentesting', 'iOS security', 'Android security', 'mobile app security'],
  },
  apiSecurity: {
    title: 'API Security Testing',
    description: 'API Security Testing: OWASP API Top 10, Auth-Fehler & Injection – manuell validiert. Zertifizierte Pentester, transparenter Festpreis. Jetzt API Pentest konfigurieren.',
    keywords: ['API security', 'REST API testing', 'GraphQL security', 'API pentesting'],
  },
  networkAudit: {
    title: 'Network Security Audit',
    description: 'Netzwerk Pentest: Firewall, Segmentierung & exponierte Dienste – systematisch geprüft von zertifizierten Pentestern. Transparente Preise. Jetzt Pentest konfigurieren.',
    keywords: ['network security', 'network pentesting', 'infrastructure audit', 'network vulnerability'],
  },
  infrastructureTesting: {
    title: 'Infrastructure Penetration Testing',
    description: 'Infrastruktur Pentest: Active Directory, Server & Datenbanken – Kerberoasting, Pass-the-Hash & mehr. Zertifizierte Pentester. Preis sofort berechnen.',
    keywords: ['infrastructure security', 'server pentesting', 'database security', 'internal security'],
  },
  cloudDevOps: {
    title: 'Cloud & DevOps Security Testing',
    description: 'Cloud Pentest: AWS, Azure & GCP – IAM-Eskalation, Fehlkonfigs & CI/CD-Secrets. Zertifizierte Pentester, Festpreis. Jetzt Cloud Pentest konfigurieren & Preis berechnen.',
    keywords: ['cloud security', 'DevOps security', 'AWS pentesting', 'Azure security', 'GCP security'],
  },
  securityAudit: {
    title: 'Comprehensive Security Audit',
    description: 'Security Audit: NIS2 & ISO 27001 konform. Zertifizierte Pentester prüfen Ihre IT vollständig. Transparenter Festpreis, Bericht inkl. Jetzt Preis berechnen.',
    keywords: ['security audit', 'compliance audit', 'security assessment', 'risk assessment'],
  },
  vulnerabilityAssessment: {
    title: 'Vulnerability Assessment Services',
    description: 'Vulnerability Assessment: Automatisiert + manuell validiert von zertifizierten Pentestern. CVSS-Bericht & Remediation-Roadmap. Transparente Preise – jetzt konfigurieren.',
    keywords: ['vulnerability scanning', 'security assessment', 'vulnerability management', 'security scan'],
  },
  smePackages: {
    title: 'SME Security Packages',
    description: 'KMU Pentest ab 8.000 €: Externer Pentest, Active Directory & Phishing-Simulation. Zertifizierte Pentester, transparenter Festpreis. Jetzt KMU Pentest konfigurieren.',
    keywords: ['SME security', 'affordable pentesting', 'small business security', 'budget security testing'],
  },
};
