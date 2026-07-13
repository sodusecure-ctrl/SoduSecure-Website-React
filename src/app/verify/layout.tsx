import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pentest-Zertifikat verifizieren",
  description:
    "Überprüfen Sie die Echtheit eines Sodu Secure Pentest-Zertifikats. Geben Sie die Zertifikat-ID ein um Bewertung, Scope und Gültigkeit zu verifizieren.",
  robots: { index: false, follow: true },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
