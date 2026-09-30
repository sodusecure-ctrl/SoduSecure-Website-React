import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  // "Pentest Anbieter" statt "Penetrationstest Anbieter": Die Impressionen liegen
  // auf der Kurzform (187/Woche vs. 105). Die Langform bleibt über URL und H1 erhalten.
  title: "Pentest Anbieter mit kostenlosem Retest",
  description:
    "Pentest Anbieter aus Berlin: OSCP-zertifizierte Tester, über 500 Pentests, Bericht auf Deutsch und Englisch. Retest nach Behebung kostenlos inklusive.",
  keywords: [
    "pentest anbieter",
    "penetrationstest anbieter",
    "pentest dienstleister",
    "penetrationstest dienstleister",
    "pentest anbieter vergleich",
    "bsi zertifizierte penetrationstest anbieter",
    "penetration test anbieter",
    "pentester deutschland",
    "oscp pentester",
  ],
  alternates: {
    canonical: `${baseUrl}/penetrationstest-anbieter`,
  },
  openGraph: {
    title: "Pentest Anbieter mit kostenlosem Retest | Sodu Secure",
    description:
      "Pentest Anbieter aus Berlin: OSCP-zertifizierte Tester, über 500 Pentests, Bericht auf Deutsch und Englisch. Retest nach Behebung kostenlos inklusive.",
    url: `${baseUrl}/penetrationstest-anbieter`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
