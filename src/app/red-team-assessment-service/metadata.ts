import type { Metadata } from "next";

const baseUrl = "https://www.sodusecure.com";

export const metadata: Metadata = {
  title: "Red Team Assessment Service | SODU Secure",
  description:
    "Red Team Assessment fuer realistische Angriffssimulationen: Initial Access, Lateral Movement und Detection-Response-Testing fuer Enterprise Security.",
  keywords: [
    "red team assessment",
    "red teaming",
    "red team service",
    "angriffssimulation",
    "enterprise security test",
    "purple team",
  ],
  alternates: {
    canonical: `${baseUrl}/red-team-assessment-service`,
  },
  openGraph: {
    title: "Red Team Assessment Service | SODU Secure",
    description:
      "Kontrollierte, realistische Angriffssimulationen zur Pruefung von Technik, Prozessen und Security-Team-Reaktion.",
    url: `${baseUrl}/red-team-assessment-service`,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};
