import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  title: "Penetrationstest Anbieter vergleichen & richtig wählen | Sodu Secure",
  description:
    "Penetrationstest Anbieter vergleichen: Woran Sie seriöse, BSI- & OSCP-zertifizierte Anbieter erkennen – Zertifizierungen, Red Flags, Report-Qualität und Preise im Überblick.",
  keywords: [
    "penetrationstest anbieter",
    "penetrationstest anbieter vergleichen",
    "seriöser penetrationstest anbieter",
    "zertifizierter penetrationstest anbieter",
    "bsi zertifizierte penetrationstest anbieter",
    "penetration testing anbieter",
    "pentester deutschland",
    "oscp pentester",
  ],
  alternates: {
    canonical: `${baseUrl}/penetrationstest-anbieter`,
  },
  openGraph: {
    title: "Penetrationstest Anbieter vergleichen & richtig wählen | Sodu Secure",
    description:
      "Guide für Unternehmen: seriöse, BSI- und OSCP-zertifizierte Penetrationstest Anbieter erkennen, vergleichen und den richtigen Partner wählen.",
    url: `${baseUrl}/penetrationstest-anbieter`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
