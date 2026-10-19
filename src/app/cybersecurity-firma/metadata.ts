import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  title: "Pentest Firma & Cybersecurity Dienstleister",
  description:
    "Pentest Firma aus Deutschland: OSCP-zertifizierte Penetrationstests, Vulnerability Assessment, Red Teaming und ISO 27001 Beratung für Unternehmen jeder Größe. Festpreis ab 2.500 €.",
  keywords: [
    "pentest firma",
    "firma pentesting",
    "pentest firma deutschland",
    "cybersecurity firma",
    "cyber security firma",
    "it security firma",
    "cybersecurity dienstleister",
    "cybersecurity unternehmen",
  ],
  alternates: {
    canonical: `${baseUrl}/cybersecurity-firma`,
  },
  openGraph: {
    title: "Pentest Firma & Cybersecurity Dienstleister",
    description:
      "Pentest Firma aus Deutschland: Penetrationstests, Compliance, ISMS und Security Consulting aus einer Hand. OSCP-zertifiziert, Festpreis.",
    url: `${baseUrl}/cybersecurity-firma`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
