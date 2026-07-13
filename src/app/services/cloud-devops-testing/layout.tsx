import type { Metadata } from "next";
import { ServiceJsonLd } from "@/lib/serviceJsonLd";

const PATH = "/services/cloud-devops-testing";
const NAME = "Cloud Penetrationstest";
const DESC =
  "Cloud Penetrationstest für AWS, Azure & GCP – IAM-Eskalation, Fehlkonfigurationen & CI/CD-Secrets manuell aufgedeckt. Festpreis nach Scoping, Angebot in 24 h.";

export const metadata: Metadata = {
  title: "Cloud Penetrationstest – AWS, Azure & GCP",
  description: DESC,
  alternates: { canonical: `https://sodusecure.com${PATH}` },
  openGraph: {
    title: "Cloud Penetrationstest – AWS, Azure & GCP",
    description: DESC,
    url: `https://sodusecure.com${PATH}`,
    type: "website",
    siteName: "Sodu Secure",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd name={NAME} description={DESC} path={PATH} />
      {children}
    </>
  );
}
