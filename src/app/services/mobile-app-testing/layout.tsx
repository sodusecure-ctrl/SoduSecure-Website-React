import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/mobile-app-testing";
const NAME = "Mobile App Penetrationstest";
const DESC =
  "Mobile App Penetrationstest für iOS & Android nach OWASP MASVS – manuell, inkl. Reverse Engineering & Datenschutz-Checks. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Mobile App Penetrationstest | iOS & Android",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Mobile App Penetrationstest | iOS & Android",
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
