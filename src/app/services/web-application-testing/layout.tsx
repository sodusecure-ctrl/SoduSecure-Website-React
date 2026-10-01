import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/web-application-testing";
const NAME = "Web Application Penetrationstest";
const DESC =
  "Web Application Penetrationstest nach OWASP Top 10 – manuell von OSCP-Testern, inkl. Business-Logic-Tests & Auth-Bypass. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Web Application Penetrationstest | OWASP Top 10",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Web Application Penetrationstest | OWASP Top 10",
    description: DESC,
    url: `https://sodusecure.com${PATH}`,
    type: "website",
    siteName: "Sodu Secure",
  },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("serviceCommon");
  const tPage = await getTranslations("webApplicationTesting");
  // EIN FAQPage je Route: gemeinsamer Service-FAQ + seitenspezifischer FAQ-Block.
  const faqItems = [
    ...(t.raw("faq.items") as Array<{ question: string; answer: string }>),
    ...(tPage.raw("pageFaq.items") as Array<{ question: string; answer: string }>),
  ];
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
