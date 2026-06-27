import React from "react";

const SITE_URL = "https://sodusecure.com";

/**
 * Server-rendered JSON-LD for a service / scope landing page.
 * Emits BreadcrumbList + Service. Use inside a route `layout.tsx`.
 */
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_URL}${path}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name,
      serviceType: "Penetration Testing",
      provider: { "@type": "Organization", name: "Sodu Secure", url: SITE_URL },
      areaServed: { "@type": "Country", name: "Germany" },
      url,
      description,
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
