import { Metadata } from 'next';

const baseUrl = 'https://www.sodusecure.com';

export const metadata: Metadata = {
  title: 'Penetration Testing Service – Professional Pentesting | SODU Secure',
  description:
    'Professional penetration testing service for businesses of all sizes. SODU Secure delivers manual web app, network, API & Active Directory pentests with actionable reports. Get your quote today.',
  keywords: [
    'penetration testing service',
    'pentest service',
    'professional penetration testing',
    'penetration testing company',
    'penetration testing provider',
    'pentest provider',
    'web application penetration testing',
    'network penetration testing',
    'API penetration testing',
    'cloud penetration testing',
    'Active Directory penetration testing',
    'ethical hacking service',
    'cybersecurity pentest',
    'OWASP penetration testing',
    'red team service',
    'vulnerability assessment service',
    'NIS2 penetration testing',
    'ISO 27001 penetration testing',
    'pentest cost',
    'penetration test price',
    'SODU Secure pentest',
    'pentest Berlin',
    'penetration testing Germany',
  ],
  openGraph: {
    title: 'Penetration Testing Service – Professional Pentest | SODU Secure',
    description:
      'Manual penetration testing service for web apps, networks, APIs & Active Directory. Real attack simulation – prioritised findings – actionable remediation. Get your fixed-price quote within 24h.',
    url: `${baseUrl}/penetration-testing-service`,
    type: 'website',
    siteName: 'SODU Secure',
    images: [
      {
        url: `${baseUrl}/images/blogs/image9.png`,
        width: 1200,
        height: 630,
        alt: 'Penetration Testing Service – SODU Secure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Penetration Testing Service – Professional Pentest | SODU Secure',
    description:
      'SODU Secure – Penetration testing for web apps, networks, APIs & Active Directory. Fixed-price quotes. OWASP, PTES & MITRE ATT&CK aligned.',
  },
  alternates: {
    canonical: `${baseUrl}/penetration-testing-service`,
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

export default function PenetrationTestingServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdService = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SODU Secure – Penetration Testing Service',
    description:
      'Professional penetration testing service for businesses: web applications, networks, APIs, Active Directory and cloud infrastructure. SODU Secure delivers manual, OWASP-aligned pentests with prioritised reports.',
    url: `${baseUrl}/penetration-testing-service`,
    logo: `${baseUrl}/icons/logo.png`,
    image: `${baseUrl}/images/blogs/image9.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      addressCountry: 'DE',
    },
    areaServed: ['Germany', 'Europe', 'Worldwide'],
    serviceType: [
      'Penetration Testing Service',
      'Web Application Pentest',
      'Network Penetration Testing',
      'API Security Testing',
      'Active Directory Pentest',
      'Cloud Penetration Testing',
      'Phishing Simulation',
      'Red Team Engagement',
    ],
    telephone: '+49-177-7750985',
    email: 'info@sodusecure.com',
    priceRange: '€€',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Penetration Testing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Application Penetration Testing',
            description:
              'OWASP Top 10, Business Logic Flaws, Auth Bypasses, IDOR – manual testing focused on real exploitability, not scanner noise.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Network Penetration Testing',
            description:
              'Firewall rules, segmentation, exposed services, SNMP misconfigurations – systematic testing of internal and external network infrastructure.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Active Directory Penetration Testing',
            description:
              'Kerberoasting, Pass-the-Hash, AS-REP Roasting, GPO exploits – real AD attack chains including Domain Admin scenarios.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'API Security Testing',
            description:
              'OWASP API Security Top 10, authentication flaws, broken object level authorisation, injection – comprehensive API pentest.',
          },
        },
      ],
    },
    sameAs: [
      `${baseUrl}`,
      `${baseUrl}/pentest-berlin`,
      `${baseUrl}/berlin-kmu-pilot`,
    ],
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a penetration testing service?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A penetration testing service simulates real-world cyberattacks against your systems to identify exploitable vulnerabilities before malicious actors do. Unlike automated vulnerability scans, a professional pentest involves a human tester actively attempting to exploit weaknesses, chain attack paths, and demonstrate real business risk.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does a penetration testing service cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Penetration testing service costs range from €2,500 for a focused web application test to €15,000+ for a full SME pentest including Active Directory and phishing simulation. Pricing depends on scope, number of targets, and test depth. SODU Secure provides fixed-price quotes within 24 hours.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a penetration testing engagement take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A focused web application pentest typically takes 3–5 business days of active testing. A comprehensive SME engagement (external + Active Directory + phishing) runs 2–4 weeks from kick-off to final report delivery.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between a penetration test and a vulnerability scan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A vulnerability scan runs automated tools to detect known CVEs – producing many false positives. A penetration test goes further: a human tester actively exploits vulnerabilities, chains attack paths, and simulates real adversary behaviour. Only a pentest shows whether a vulnerability is actually exploitable in your environment.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is penetration testing required for NIS2 compliance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The NIS2 Directive (and its German implementation NIS2UmsuCG) requires in-scope organisations to conduct regular security reviews. Penetration tests are a central tool for demonstrating compliance. The BSI explicitly recommends pentests in IT-Grundschutz (BSI-Standard 200-3).',
        },
      },
      {
        '@type': 'Question',
        name: 'What deliverables do I receive after a penetration test?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You receive an Executive Summary suitable for management and board-level review, a detailed technical report with CVSS-scored findings, a prioritised remediation roadmap, and an optional close-out presentation walkthrough with your team.',
        },
      },
    ],
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'SODU Secure',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Penetration Testing Service',
        item: `${baseUrl}/penetration-testing-service`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      {children}
    </>
  );
}
