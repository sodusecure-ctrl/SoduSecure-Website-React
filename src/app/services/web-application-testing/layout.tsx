import type { Metadata } from "next";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/web-application-testing";
const NAME = "Web Application Penetrationstest";
const DESC =
  "Web Application Penetrationstest nach OWASP Top 10 – manuell von OSCP-Testern, inkl. Business-Logic-Tests & Auth-Bypass. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Web Application Penetrationstest – OWASP Top 10",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Web Application Penetrationstest – OWASP Top 10",
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
