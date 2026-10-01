import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/cloud-devops-testing";
const NAME = "Cloud Penetrationstest";
const DESC =
  "Cloud Penetrationstest für AWS, Azure & GCP – IAM-Eskalation, Fehlkonfigurationen & CI/CD-Secrets manuell aufgedeckt. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Cloud Penetrationstest | AWS, Azure & GCP",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Cloud Penetrationstest | AWS, Azure & GCP",
    description: DESC,
    url: `https://sodusecure.com${PATH}`,
    type: "website",
    siteName: "Sodu Secure",
  },
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const t = await getTranslations("serviceCommon");
  const tPage = await getTranslations("cloudDevopsTesting");
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
