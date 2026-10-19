import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/security-audit";
const NAME = "Security Audit";
const DESC =
  "Security Audit für NIS2, ISO 27001 & DORA – manuelle, prüfsichere Bewertung Ihrer IT von zertifizierten Experten. Festpreis & prüffähiger Bericht, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Security Audit | NIS2 & ISO 27001 konform",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Security Audit | NIS2 & ISO 27001 konform",
    description: DESC,
    url: `https://sodusecure.com${PATH}`,
    type: "website",
    siteName: "Sodu Secure",
  },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("serviceCommon");
  const faqItems = t.raw("faq.items") as Array<{ question: string; answer: string }>;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <ServiceJsonLd name={NAME} description={DESC} path={PATH} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
