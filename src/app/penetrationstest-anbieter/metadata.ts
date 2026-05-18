import type { Metadata } from "next";

const baseUrl = "https://www.sodusecure.com";

export const metadata: Metadata = {
  title: "Penetrationstest Anbieter: So waehlen Sie richtig | SODU Secure",
  description:
    "Penetrationstest Anbieter vergleichen: Zertifizierungen, Red Flags, Report-Qualitaet, Preise und Auswahlkriterien fuer seriouse Pentester.",
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
      "Guide fuer Unternehmen: Anbieter vergleichen, Qualitaet erkennen und den richtigen Pentest-Partner waehlen.",
    url: `${baseUrl}/penetrationstest-anbieter`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
