import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  title: "ISO 27001 Beratung und Pentest",
  description:
    "ISO 27001 verstehen, umsetzen und audit-ready werden: ISMS, A.12.6 Pentest-Anforderungen, Zertifizierung und kostenlose Erstberatung.",
  keywords: [
    "iso 27001",
    "iso27001",
    "iso 27001 anforderungen",
    "iso 27001 pentest",
    "isms",
    "iso 27001 beratung",
    "iso 27001 deutschland",
  ],
  alternates: {
    canonical: `${baseUrl}/iso-27001`,
  },
  openGraph: {
    title: "ISO 27001 Beratung und Pentest",
    description:
      "ISO 27001, ISMS und audit-konforme Pentests nach A.12.6. Roadmap, Umsetzung und Zertifizierungsbegleitung.",
    url: `${baseUrl}/iso-27001`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
