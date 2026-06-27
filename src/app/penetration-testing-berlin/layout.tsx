import { buildCityMetadata, CityJsonLd } from "@/components/landing/cityMeta";

export const metadata = buildCityMetadata("berlin");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CityJsonLd slug="berlin" />
      {children}
    </>
  );
}
