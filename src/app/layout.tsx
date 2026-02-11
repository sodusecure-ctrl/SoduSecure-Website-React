import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import LayoutContent from './LayoutContent';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "sodusecure - Professional Penetration Testing Services",
    template: "%s | sodusecure"
  },
  description: "Comprehensive penetration testing services to identify and remediate security vulnerabilities. Expert cybersecurity team protecting your digital assets with OWASP Top 10 testing, API security, and infrastructure audits.",
  keywords: [
    'penetration testing',
    'cybersecurity',
    'security testing',
    'vulnerability assessment',
    'ethical hacking',
    'web application security',
    'API security',
    'network security',
    'VAPT',
    'security audit',
  ],
  authors: [{ name: 'sodusecure' }],
  creator: 'sodusecure',
  publisher: 'sodusecure',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: 'sodusecure - Professional Penetration Testing Services',
    description: 'Comprehensive penetration testing services to identify and remediate security vulnerabilities. Expert cybersecurity team protecting your digital assets.',
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
    title: 'sodusecure - Professional Penetration Testing Services',
    description: 'Comprehensive penetration testing services to identify and remediate security vulnerabilities.',
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
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon-32x32.png' },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* Favicon - Alle Browser */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />

        {/* Apple Safari / iOS */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon-precomposed" sizes="180x180" href="/apple-touch-icon-precomposed.png" />
        <meta name="apple-mobile-web-app-title" content="SoduSecure" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Android Chrome / Samsung Internet / Brave / Opera / Vivaldi */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Microsoft Edge / IE */}
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        {/* Theme Color - alle Browser */}
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: light)" />

        {/* Yandex */}
        <meta name="yandex-tableau-widget" content="logo=/android-chrome-192x192.png, color=#000000" />

        {/* Allgemein */}
        <meta name="application-name" content="SoduSecure" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
