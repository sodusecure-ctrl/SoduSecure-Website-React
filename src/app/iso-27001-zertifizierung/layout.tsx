import { ServiceJsonLd } from "@/lib/serviceJsonLd";

export { metadata } from "./metadata";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd
        name="ISO 27001 Zertifizierung"
        description="ISO 27001 Zertifizierung Schritt für Schritt: Gap-Analyse, ISMS-Aufbau, Penetrationstests und Audit-Vorbereitung – von zertifizierten Experten begleitet."
        path="/iso-27001-zertifizierung"
      />
      {children}
    </>
  );
}
