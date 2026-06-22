import type { Metadata } from "next";

const baseUrl = "https://www.sodusecure.com";

export const metadata: Metadata = {
  title: "Penetrationstest Anbieter: So waehlen Sie richtig | SODU Secure",
  description:
    "Penetrationstest Anbieter vergleichen: Zertifizierungen, Red Flags, Report-Qualität, Preise und Auswahlkriterien für seriöse Pentester.",
  keywords: [
    "penetrationstest anbieter",
    "pentest anbieter",
    "penetration testing anbieter",
    "pentester deutschland",
    "oscp pentester",
    "pentest firma",
  ],
  alternates: {
    canonical: `${baseUrl}/penetrationstest-anbieter`,
  },
  openGraph: {
    title: "Penetrationstest Anbieter: So waehlen Sie richtig | SODU Secure",
    description:
      "Guide für Unternehmen: Anbieter vergleichen, Qualität erkennen und den richtigen Pentest-Partner wählen.",
    url: `${baseUrl}/penetrationstest-anbieter`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
