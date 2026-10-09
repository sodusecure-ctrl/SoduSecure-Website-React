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
  // Kein globales canonical: '/' hier — es würde sich auf alle Seiten ohne
  // eigenes alternates vererben und sie auf die Homepage kanonisieren.
  // Das Homepage-Canonical liegt in src/app/page.tsx.
  title: {
    default: "Sodu Secure | zertifizierte Penetrationstests aus Berlin",
    template: "%s | Sodu Secure"
  },
  description: "Penetrationstests von OSCP-zertifizierten Experten aus Berlin. Echte Angriffsketten, klare Fix-Empfehlungen, kostenloser Retest. Festpreis - Angebot in 24 h.",
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
    // Bewusst KEIN festes title/description hier: Next.js vererbt diesen Block
    // an jede Seite ohne eigenes openGraph. Dadurch trugen ~85 Seiten denselben
    // og:title, der ihrem eigenen <title> widersprach. Google nennt genau das
    // als Grund, einen Titel zu ersetzen ("duplicate titles across multiple
    // pages", "title doesn't reflect page content") – bei "pentest berlin"
    // wurde daraus in der SERP nur noch "Sodu Secure". Ohne die Felder leitet
    // Next.js og:title/og:description pro Seite aus title/description ab.
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
    // Ebenfalls ohne festes title/description – siehe Begruendung bei openGraph.
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

  // Zentrale Entität der Website. Alle anderen Schemas sollten per
  // { '@id': `${baseUrl}/#organization` } hierauf referenzieren, statt Name und
  // URL erneut als Strings zu duplizieren — sonst entstehen für Crawler mehrere
  // scheinbar verschiedene Firmen.
  //
  // Regel für dieses Objekt: Jeder Wert hier muss auch sichtbar im HTML stehen
  // (Preise auf /pentest-kosten und /sodu-audit-ai, Firmendaten im Impressum).
  // Keine Angabe aufnehmen, die nicht auf der Website belegt ist.
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'Sodu Secure',
    legalName: 'Sodu Secure GmbH',
    url: baseUrl,
    logo: `${baseUrl}/icons/logo.png`,
    image: `${baseUrl}/images/og-image.jpg`,
    description:
      'Penetrationstests und IT-Security aus Berlin – manuell von OSCP-zertifizierten Hackern. Schwachstellenscan ab 1.499 €, manuelle Pentests individuell kalkuliert.',
    email: 'info@sodusecure.com',
    telephone: '+49-177-7750985',
    // Nur verifizierte, im Footer verlinkte Profile. Der GitHub-Link im Footer
    // zeigt auf github.com ohne Organisation und ist deshalb hier bewusst nicht
    // aufgeführt — eine falsche sameAs-Angabe schadet der Entitätszuordnung.
    sameAs: [
      'https://www.linkedin.com/company/sodu-secure-gmbh',
      'https://x.com/SoduSecure',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Riemannstr. 8',
      postalCode: '10961',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      addressCountry: 'DE',
    },
    // Handelsregisterangabe aus dem Impressum – macht die Entität gegen ein
    // öffentliches Register prüfbar.
    identifier: {
      '@type': 'PropertyValue',
      name: 'Handelsregister',
      value: 'HRB284458B',
    },
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Berlin', addressCountry: 'DE' },
    },
    areaServed: [
      { '@type': 'Country', name: 'Deutschland' },
      { '@type': 'Country', name: 'Österreich' },
      { '@type': 'Country', name: 'Schweiz' },
    ],
    availableLanguage: [
      { '@type': 'Language', name: 'Deutsch', alternateName: 'de' },
      { '@type': 'Language', name: 'Englisch', alternateName: 'en' },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+49-177-7750985',
        email: 'info@sodusecure.com',
        areaServed: ['DE', 'AT', 'CH'],
        availableLanguage: ['de', 'en'],
        url: `${baseUrl}/request-pentest`,
      },
    ],
    priceRange: '€€',
    knowsAbout: [
      'Penetrationstest',
      'Webanwendungs-Pentest',
      'API-Penetrationstest',
      'Mobile-App-Pentest',
      'Active-Directory-Penetrationstest',
      'Cloud-Penetrationstest',
      'Infrastruktur-Penetrationstest',
      'Schwachstellenscan',
      'Red Teaming',
      'Phishing-Simulation',
      'Security Awareness',
      'OWASP Web Security Testing Guide',
      'PTES',
      'NIS2',
      'DORA',
      'TLPT',
      'ISO/IEC 27001',
      'TISAX',
      'PCI DSS',
      'BSI TR-03161',
      'DSGVO Art. 32',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Leistungen Sodu Secure',
      itemListElement: [
        {
          '@type': 'Offer',
          url: `${baseUrl}/schwachstellenscan`,
          priceCurrency: 'EUR',
          price: '1499',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
            minPrice: 1499,
            valueAddedTaxIncluded: false,
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Automatisierter Schwachstellenscan',
            serviceType: 'Schwachstellenscan',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
        {
          '@type': 'Offer',
          url: `${baseUrl}/pentest-kosten`,
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
            minPrice: 4000,
            maxPrice: 20000,
            valueAddedTaxIncluded: false,
            description:
              'Manuelle Penetrationstests werden individuell nach Aufwand und Tagessätzen kalkuliert und liegen meist zwischen 4.000 und 20.000 € – zum Festpreis inklusive kostenlosem Retest.',
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Manueller Penetrationstest',
            serviceType: 'Penetrationstest',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
        {
          '@type': 'Offer',
          url: `${baseUrl}/sodu-audit-ai`,
          priceCurrency: 'EUR',
          price: '99',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'EUR',
            minPrice: 99,
            valueAddedTaxIncluded: false,
            description: 'Sodu AuditAI, ab 99 € pro Monat (enthält ein Repository und einen Audit-Lauf je Monat).',
          },
          itemOffered: {
            '@type': 'Service',
            name: 'Sodu AuditAI – KI-gestütztes Code-Audit',
            serviceType: 'Code Security Review',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
        {
          '@type': 'Offer',
          url: `${baseUrl}/red-team-assessment`,
          itemOffered: {
            '@type': 'Service',
            name: 'Red Team Assessment',
            serviceType: 'Red Teaming',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
        {
          '@type': 'Offer',
          url: `${baseUrl}/phishing-simulation`,
          itemOffered: {
            '@type': 'Service',
            name: 'Phishing-Simulation',
            serviceType: 'Phishing-Simulation',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
        {
          '@type': 'Offer',
          url: `${baseUrl}/ki-penetrationstest`,
          itemOffered: {
            '@type': 'Service',
            name: 'KI-Penetrationstest',
            serviceType: 'KI-Sicherheitsprüfung',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
        {
          '@type': 'Offer',
          url: `${baseUrl}/security-awareness-schulung`,
          itemOffered: {
            '@type': 'Service',
            name: 'Security-Awareness-Schulung',
            serviceType: 'Security Awareness Training',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
        {
          '@type': 'Offer',
          url: `${baseUrl}/soc-as-a-service`,
          itemOffered: {
            '@type': 'Service',
            name: 'SOC as a Service',
            serviceType: 'Security Operations',
            provider: { '@id': `${baseUrl}/#organization` },
          },
        },
      ],
    },
  };

  // WebSite-Entität, damit Article-/WebPage-Schemas per isPartOf referenzieren können.
  // Bewusst OHNE potentialAction/SearchAction: Die Website hat keine eigene
  // Suchfunktion (keine /search-Route, kein Suchformular) — eine SearchAction wäre
  // eine Falschangabe und würde ins Leere zeigen.
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Sodu Secure',
    inLanguage: ['de-DE', 'en'],
    publisher: { '@id': `${baseUrl}/#organization` },
  };

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        {/* Theme – set before paint to avoid a flash of the wrong design */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme-v2')||'light';window.__theme=t;var e=document.documentElement;e.classList.toggle('dark',t!=='light');e.classList.toggle('light',t==='light');e.setAttribute('data-theme',t);}catch(e){}})();`,
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

        {/* ChatGPT Ads Tracking Pixel (OpenAI) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"FpMPRTfLxnxYtmE7cGPApV",debug:true});`,
          }}
        />
        {/* End ChatGPT Ads Tracking Pixel */}

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
