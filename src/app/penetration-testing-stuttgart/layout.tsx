import { buildCityMetadata, CityJsonLd } from "@/components/landing/cityMeta";

export const metadata = buildCityMetadata("stuttgart");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CityJsonLd slug="stuttgart" />
      {children}
    </>
  );
}
