import { ServiceJsonLd } from "@/lib/serviceJsonLd";
import { FAQS } from './faq';

export { metadata } from "./metadata";

export default function Layout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <ServiceJsonLd
        name="Pentest Firma & Cybersecurity Dienstleister"
        description="Sodu Secure ist eine Pentest Firma aus Deutschland: OSCP-zertifizierte Penetrationstests, Vulnerability Assessment, Red Teaming und ISO 27001 Beratung – Festpreis ab 2.500 €."
        path="/cybersecurity-firma"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {children}
    </>
  );
}
