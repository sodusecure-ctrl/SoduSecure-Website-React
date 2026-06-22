import type { Metadata } from "next";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/infrastructure-testing";
const NAME = "Infrastruktur Penetrationstest";
const DESC =
  "Infrastruktur Penetrationstest inkl. Active Directory – Kerberoasting, Pass-the-Hash & Lateral Movement, manuell geprüft. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Infrastruktur Penetrationstest & Active Directory",
  description: DESC,
  alternates: { canonical: `https://www.sodusecure.com${PATH}` },
  openGraph: {
    title: "Infrastruktur Penetrationstest & Active Directory | SODU Secure",
    description: DESC,
    url: `https://www.sodusecure.com${PATH}`,
    type: "website",
    siteName: "SODU Secure",
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
