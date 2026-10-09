import type { Metadata } from "next";

const baseUrl = "https://sodusecure.com";

export const metadata: Metadata = {
  // Die SERP zu "pentest anbieter" besteht fast nur aus Vergleichslisten
  // (Marktuebersicht, Top 5, "vollstaendige Liste"), die PAA-Fragen drehen sich
  // um Serioesitaet und Marktfuehrerschaft. Gesucht wird Orientierung. Der alte
  // Titel bot ein Feature an (kostenloser Retest) und bediente die Absicht
  // nicht. Die Seite selbst ist laengst ein Auswahlratgeber - der Titel sagt
  // das jetzt auch. absolute: ohne Brand-Suffix, das Google hier ohnehin kuerzt.
  title: { absolute: 'Pentest Anbieter vergleichen | 8 Auswahlkriterien' },
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
    title: "Pentest Anbieter vergleichen | 8 Auswahlkriterien",
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
