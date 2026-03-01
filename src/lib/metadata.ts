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
  description: 'Comprehensive penetration testing services to identify and remediate security vulnerabilities. Expert cybersecurity team protecting your digital assets with advanced security testing.',
  keywords: ['ethical hacking', 'security audit', 'VAPT', 'cyber security services'],
};

export const serviceMetadata = {
  webAppTesting: {
    title: 'Web Application Penetration Testing',
    description: 'Professional web application security testing to identify vulnerabilities in your web apps. OWASP Top 10 testing, SQL injection, XSS, and more.',
    keywords: ['web app pentesting', 'OWASP testing', 'web security', 'application security'],
  },
  mobileAppTesting: {
    title: 'Mobile Application Security Testing',
    description: 'Comprehensive mobile app penetration testing for iOS and Android applications. Identify security flaws before attackers do.',
    keywords: ['mobile pentesting', 'iOS security', 'Android security', 'mobile app security'],
  },
  apiSecurity: {
    title: 'API Security Testing',
    description: 'Secure your APIs with comprehensive security testing. REST API, GraphQL, and SOAP testing to protect your backend services.',
    keywords: ['API security', 'REST API testing', 'GraphQL security', 'API pentesting'],
  },
  networkAudit: {
    title: 'Network Security Audit',
    description: 'Complete network security audits to identify vulnerabilities in your network infrastructure. Protect against network attacks.',
    keywords: ['network security', 'network pentesting', 'infrastructure audit', 'network vulnerability'],
  },
  infrastructureTesting: {
    title: 'Infrastructure Penetration Testing',
    description: 'Comprehensive infrastructure security testing including servers, databases, and internal systems.',
    keywords: ['infrastructure security', 'server pentesting', 'database security', 'internal security'],
  },
  cloudDevOps: {
    title: 'Cloud & DevOps Security Testing',
    description: 'Secure your cloud infrastructure and DevOps pipelines. AWS, Azure, GCP security testing and CI/CD pipeline security.',
    keywords: ['cloud security', 'DevOps security', 'AWS pentesting', 'Azure security', 'GCP security'],
  },
  securityAudit: {
    title: 'Comprehensive Security Audit',
    description: 'Full-scale security audits covering all aspects of your digital infrastructure. Identify risks and get actionable remediation plans.',
    keywords: ['security audit', 'compliance audit', 'security assessment', 'risk assessment'],
  },
  vulnerabilityAssessment: {
    title: 'Vulnerability Assessment Services',
    description: 'Professional vulnerability assessment to identify security weaknesses. Automated and manual testing for comprehensive coverage.',
    keywords: ['vulnerability scanning', 'security assessment', 'vulnerability management', 'security scan'],
  },
  smePackages: {
    title: 'SME Security Packages',
    description: 'Affordable penetration testing packages designed for small and medium enterprises. Professional security testing within your budget.',
    keywords: ['SME security', 'affordable pentesting', 'small business security', 'budget security testing'],
  },
};
