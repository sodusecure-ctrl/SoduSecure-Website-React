import { ServiceJsonLd } from "@/lib/serviceJsonLd";

export { metadata } from "./metadata";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceJsonLd
        name="Penetrationstest Anbieter"
        description="Woran erkennen Sie einen seriösen Penetrationstest-Anbieter? OSCP/CEH-Zertifizierung, manuelles Testing statt Scan und klare Berichte – plus was SODU Secure auszeichnet."
        path="/penetrationstest-anbieter"
      />
      {children}
    </>
  );
}
