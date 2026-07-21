import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { GOOGLE_ADS_ID, GA_MEASUREMENT_ID } from "@/lib/gtag";
import "./globals.css";
import LayoutContent from './LayoutContent';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import TrackingBeacon from '@/components/common/TrackingBeacon';

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
  alternates: { canonical: '/' },
  title: {
    default: "Sodu Secure – zertifizierte Penetrationstests aus Berlin",
    template: "%s | Sodu Secure"
  },
  description: "Penetrationstests von OSCP-zertifizierten Experten aus Berlin. Echte Angriffsketten, klare Fix-Empfehlungen, kostenloser Retest. Festpreis – Angebot in 24 h.",
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
    'Pentest KMU',
    'Cyber-Spezialist',
    'Cybersecurity Deutschland',
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
    locale: 'de_DE',
    url: baseUrl,
    title: 'Sodu Secure – zertifizierte Penetrationstests aus Berlin',
    description: 'Ist Ihr Unternehmen hackbar? Jetzt kostenlos testen. OSCP-zertifizierter Pentest – Web, API, AD. Preis sofort online berechnen. Festpreis ab 1.499 €.',
    siteName: 'Sodu Secure',
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
    title: 'Sodu Secure – zertifizierte Penetrationstests aus Berlin',
    description: 'Zertifizierte Pentester – transparente Festpreise ab 1.499 €. Pentest sofort konfigurieren & Preis berechnen. Web, API, AD & Cloud.',
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

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Sodu Secure',
    url: baseUrl,
    logo: `${baseUrl}/icons/logo.png`,
    image: `${baseUrl}/images/og-image.jpg`,
    description:
      'Penetrationstests und IT-Security aus Berlin – manuell von OSCP-zertifizierten Hackern, transparenter Festpreis ab 2.500 €.',
    email: 'info@sodusecure.com',
    telephone: '+49-177-7750985',
    areaServed: ['DE', 'AT', 'CH'],
    address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    priceRange: '€€',
    knowsAbout: ['Penetrationstest', 'NIS2', 'ISO 27001', 'DORA', 'Red Teaming', 'Active Directory', 'Cloud Security'],
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {/* Theme – set before paint to avoid a flash of the wrong design */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'dark';window.__theme=t;var e=document.documentElement;e.classList.toggle('dark',t!=='light');e.classList.toggle('light',t==='light');e.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id=GTM-K5F9VXCT'+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K5F9VXCT');`,
          }}
        />
        {/* End Google Tag Manager */}

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
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K5F9VXCT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <LayoutContent>{children}</LayoutContent>
          </ThemeProvider>
          <Toaster />
        </NextIntlClientProvider>
        {/* Kampagnen-Tracking: Attribution aus /t/<slug>-Links + page_views */}
        <TrackingBeacon />
        {/* Google Ads – Basis-Tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
        {/* LinkedIn Insight Tag */}
        <Script id="linkedin-insight-init" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "10516833";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=10516833&fmt=gif"
          />
        </noscript>
        {/* End LinkedIn Insight Tag */}
      </body>
    </html>
  );
}
