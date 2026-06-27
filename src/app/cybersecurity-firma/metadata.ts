import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  title: "Cybersecurity Firma fuer Pentest und ISO 27001 | Sodu Secure",
  description:
    "Cybersecurity Firma aus Deutschland: Penetrationstests, Vulnerability Assessment, Red Teaming und ISO 27001 Beratung fuer Unternehmen jeder Groesse.",
  keywords: [
    "cybersecurity firma",
    "cyber security firma",
    "cybersecurity unternehmen",
    "it security firma",
    "cybersecurity dienstleister",
    "pentest firma deutschland",
  ],
  alternates: {
    canonical: `${baseUrl}/cybersecurity-firma`,
  },
  openGraph: {
    title: "Cybersecurity Firma fuer Pentest und ISO 27001 | Sodu Secure",
    description:
      "Ganzheitliche Cybersecurity Services: Pentest, Compliance, ISMS und Security Consulting aus einer Hand.",
    url: `${baseUrl}/cybersecurity-firma`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
