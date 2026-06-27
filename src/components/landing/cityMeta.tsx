import type { Metadata } from "next";
import { CITIES } from "./cityData";

const baseUrl = "https://sodusecure.com";

export function buildCityMetadata(slug: string): Metadata {
  const c = CITIES[slug];
  const url = `${baseUrl}/${c.slug}`;
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url,
      type: "website",
      siteName: "SODU Secure",
      locale: "de_DE",
      images: [{ url: `${baseUrl}/images/blogs/image9.png`, width: 1200, height: 630, alt: `Penetration Testing ${c.city} – SODU Secure` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Penetration Testing ${c.city} – SODU Secure`,
      description: c.metaDescription,
    },
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export function CityJsonLd({ slug }: { slug: string }) {
  const c = CITIES[slug];
  const url = `${baseUrl}/${c.slug}`;

  const jsonLdService = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `SODU Secure – Penetration Testing ${c.city}`,
    description: c.metaDescription,
    url,
    logo: `${baseUrl}/icons/logo.png`,
    image: `${baseUrl}/images/blogs/image9.png`,
    address: { "@type": "PostalAddress", addressLocality: c.city, addressRegion: c.region, addressCountry: "DE" },
    areaServed: { "@type": "City", name: c.city },
    serviceType: ["Penetration Testing", "Pentesting", "Security Audit", "Red Team Testing"],
    telephone: "+49-177-7750985",
    email: "info@sodusecure.com",
    priceRange: "€€",
    sameAs: ["https://sodusecure.com"],
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: `Penetration Testing ${c.city}`, item: url },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
    </>
  );
}
