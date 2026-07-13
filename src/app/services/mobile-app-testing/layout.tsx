import type { Metadata } from "next";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/mobile-app-testing";
const NAME = "Mobile App Penetrationstest";
const DESC =
  "Mobile App Penetrationstest für iOS & Android nach OWASP MASVS – manuell, inkl. Reverse Engineering & Datenschutz-Checks. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Mobile App Penetrationstest – iOS & Android",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Mobile App Penetrationstest – iOS & Android",
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
