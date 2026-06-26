import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  title: "ISO 27001 Zertifizierung: Ablauf, Kosten, Pentest | SODU Secure",
  description:
    "ISO 27001 Zertifizierung mit klarer Roadmap: Gap-Analyse, ISMS-Implementierung, Pentest, Audit-Vorbereitung und erfolgreiche Zertifikatserteilung.",
  keywords: [
    "iso 27001 zertifizierung",
    "iso 27001 kosten",
    "iso 27001 audit",
    "iso 27001 beratung",
    "isms zertifizierung",
    "iso 27001 pentest",
  ],
  alternates: {
    canonical: `${baseUrl}/iso-27001-zertifizierung`,
  },
  openGraph: {
    title: "ISO 27001 Zertifizierung: Ablauf, Kosten, Pentest | SODU Secure",
    description:
      "Von der Vorbereitung bis zum Zertifikat: ISO 27001 Zertifizierung inklusive Pentest und Audit-ready Dokumentation.",
    url: `${baseUrl}/iso-27001-zertifizierung`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
