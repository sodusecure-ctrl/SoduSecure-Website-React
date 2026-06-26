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
    ];
  },
};

export default withNextIntl(nextConfig);
