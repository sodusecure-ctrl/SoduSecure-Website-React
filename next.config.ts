import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

const nextConfig: NextConfig = {
  images: {
    domains: ['upload.wikimedia.org', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable compression
  compress: true,
  // Generate sitemap and robots.txt automatically
  // Optimize for production
  poweredByHeader: false,
  // Enable React strict mode for better SEO
  reactStrictMode: true,
  // Optimize bundle
  swcMinify: true,
};

export default withNextIntl(nextConfig);