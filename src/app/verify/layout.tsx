import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pentest-Zertifikat verifizieren | SODU Secure",
  description:
    "Überprüfen Sie die Echtheit eines SODU Secure Pentest-Zertifikats. Geben Sie die Zertifikat-ID ein um Bewertung, Scope und Gültigkeit zu verifizieren.",
  robots: { index: true, follow: true },
};

export default function VerifyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
