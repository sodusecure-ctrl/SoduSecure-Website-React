import { buildCityMetadata, CityJsonLd } from "@/components/landing/cityMeta";

export const metadata = buildCityMetadata("muenchen");

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CityJsonLd slug="muenchen" />
      {children}
    </>
  );
}
