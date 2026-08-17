import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  title: "Penetrationstest Anbieter mit Zertifizierung",
  description:
    "Ihr Penetrationstest Anbieter aus Deutschland: OSCP-zertifiziert, DSGVO-konform, 500+ erfolgreiche Pentests. Kostenlose Erstberatung innerhalb von 24h.",
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
    title: "Penetrationstest Anbieter mit Zertifizierung | Sodu Secure",
    description:
      "Ihr Penetrationstest Anbieter aus Deutschland: OSCP-zertifiziert, DSGVO-konform, 500+ erfolgreiche Pentests. Kostenlose Erstberatung innerhalb von 24h.",
    url: `${baseUrl}/penetrationstest-anbieter`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
