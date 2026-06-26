import type { Metadata } from "next";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/api-security-testing";
const NAME = "API Penetrationstest";
const DESC =
  "API Penetrationstest nach OWASP API Top 10 – REST, GraphQL & SOAP manuell geprüft auf Auth-Fehler, BOLA & Injection. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "API Penetrationstest – OWASP API Top 10",
  description: DESC,
  alternates: { canonical: `https://www.sodusecure.com${PATH}` },
  openGraph: {
    title: "API Penetrationstest – OWASP API Top 10 | SODU Secure",
    description: DESC,
    url: `https://www.sodusecure.com${PATH}`,
    type: "website",
    siteName: "Penetration Testing | Dein Zertifizierter IT Spezialist",
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
