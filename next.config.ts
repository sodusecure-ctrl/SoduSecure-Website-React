import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.2.202'],
  async redirects() {
    return [
      // Kanonischer Host: non-www. 301 von www -> non-www (Backup zur Vercel-Domain-Einstellung).
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.sodusecure.com' }],
        destination: 'https://sodusecure.com/:path*',
        permanent: true,
      },
      // Tote URL /imprint -> /impressum (war 2x intern verlinkt, 404 in GSC).
      { source: '/imprint', destination: '/impressum', permanent: true },
      // Keyword-Kannibalisierung vermeiden: Berlin-Keywords gehören allein /pentest-berlin.
      { source: '/penetration-testing-berlin', destination: '/pentest-berlin', permanent: true },
      // SEO-Konsolidierung Juli 2026: Duplikat-Landingpages auf die jeweilige Hauptseite.
      // Haupt-Landingpage Pentest: /penetration-testing
      { source: '/pentest', destination: '/penetration-testing', permanent: true },
      { source: '/pentesting-service', destination: '/penetration-testing', permanent: true },
      { source: '/penetration-testing-service', destination: '/penetration-testing', permanent: true },
      // Haupt-Landingpage Kosten/Preis: /pentest-kosten
      { source: '/pentest-preis', destination: '/pentest-kosten', permanent: true },
      { source: '/pentest-preis-rechner', destination: '/pentest-kosten', permanent: true },
      { source: '/pentest-angebot', destination: '/pentest-kosten', permanent: true },
      // Cyber-Security-Check: eine Seite statt drei
      { source: '/cyber-security-check-kosten', destination: '/cyber-security-check', permanent: true },
      { source: '/cyber-security-check-preis', destination: '/cyber-security-check', permanent: true },
      // Service-Duplikate
      { source: '/red-team-assessment-service', destination: '/red-team-assessment', permanent: true },
      { source: '/vulnerability-assessment', destination: '/vulnerability-assessment-service', permanent: true },
      // Karriere-Seite entfernt (Juli 2026)
      { source: '/careers', destination: '/about', permanent: true },
      { source: '/careers/:id', destination: '/about', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
