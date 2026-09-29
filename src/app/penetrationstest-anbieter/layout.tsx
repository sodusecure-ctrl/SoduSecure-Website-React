import { ServiceJsonLd } from "@/lib/serviceJsonLd";
import { FAQS } from "./faq";

export { metadata } from "./metadata";

export default function Layout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <ServiceJsonLd
        name="Penetrationstest Anbieter"
        description="Woran erkennen Sie einen seriösen Penetrationstest-Anbieter? OSCP/CEH-Zertifizierung, manuelles Testing statt Scan und klare Berichte – plus was Sodu Secure auszeichnet."
        path="/penetrationstest-anbieter"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
