import { buildCityMetadata, CityJsonLd } from "@/components/landing/cityMeta";

export const metadata = buildCityMetadata("koeln");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CityJsonLd slug="koeln" />
      {children}
    </>
  );
}
