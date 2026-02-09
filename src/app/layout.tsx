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
  },
  icons: {
    icon: '/-origin.png',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
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
