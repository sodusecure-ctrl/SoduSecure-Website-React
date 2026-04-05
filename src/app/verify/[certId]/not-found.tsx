import Link from "next/link";
import { ShieldX } from "lucide-react";

export default function CertNotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 text-center gap-6">
      <div className="p-4 rounded-full bg-red-900/20 border border-red-800/40">
        <ShieldX size={48} className="text-red-500" />
      </div>
      <div>
        <h1 className="text-2xl font-black mb-2">Zertifikat nicht gefunden</h1>
        <p className="text-gray-400 text-sm max-w-md">
          Diese Zertifikat-ID existiert nicht in unserer Datenbank. Überprüfen Sie die ID auf
          dem Badge oder kontaktieren Sie uns direkt.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/verify"
          className="bg-red-600 hover:bg-red-500 transition-colors rounded-xl px-6 py-3 text-sm font-bold text-white"
        >
          Erneut suchen
        </Link>
        <Link
          href="/contact"
          className="border border-white/20 hover:border-white/40 transition-colors rounded-xl px-6 py-3 text-sm font-semibold text-gray-300"
        >
          Kontakt aufnehmen
        </Link>
      </div>
    </main>
  );
}
