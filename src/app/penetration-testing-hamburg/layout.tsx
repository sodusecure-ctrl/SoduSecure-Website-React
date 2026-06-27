import { buildCityMetadata, CityJsonLd } from "@/components/landing/cityMeta";

export const metadata = buildCityMetadata("hamburg");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CityJsonLd slug="hamburg" />
      {children}
    </>
  );
}
