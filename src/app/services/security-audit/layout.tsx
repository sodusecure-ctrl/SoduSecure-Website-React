import type { Metadata } from "next";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/security-audit";
const NAME = "Security Audit";
const DESC =
  "Security Audit für NIS2, ISO 27001 & DORA – manuelle, prüfsichere Bewertung Ihrer IT von zertifizierten Experten. Festpreis & prüffähiger Bericht, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Security Audit – NIS2 & ISO 27001 konform",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Security Audit – NIS2 & ISO 27001 konform | Sodu Secure",
    description: DESC,
    url: `https://sodusecure.com${PATH}`,
    type: "website",
    siteName: "Sodu Secure",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd name={NAME} description={DESC} path={PATH} />
      {children}
    </>
  );
}
