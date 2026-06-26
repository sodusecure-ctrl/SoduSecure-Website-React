import type { Metadata } from "next";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/network-audit";
const NAME = "Netzwerk Penetrationstest";
const DESC =
  "Netzwerk Penetrationstest intern & extern – Firewalls, Segmentierung & exponierte Dienste systematisch geprüft von OSCP-Testern. Festpreis, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Netzwerk Penetrationstest – intern & extern",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Netzwerk Penetrationstest – intern & extern | SODU Secure",
    description: DESC,
    url: `https://sodusecure.com${PATH}`,
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
