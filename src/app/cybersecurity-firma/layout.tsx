import { ServiceJsonLd } from "@/lib/serviceJsonLd";

export { metadata } from "./metadata";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd
        name="Pentest Firma & Cybersecurity Dienstleister"
        description="Sodu Secure ist eine Pentest Firma aus Deutschland: OSCP-zertifizierte Penetrationstests, Vulnerability Assessment, Red Teaming und ISO 27001 Beratung – Festpreis ab 2.500 €."
        path="/cybersecurity-firma"
      />
      {children}
    </>
  );
}
