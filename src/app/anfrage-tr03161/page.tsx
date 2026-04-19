"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import TR03161Form from "@/components/common/TR03161Form";

export default function AnfrageTR03161Page() {
  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/bsi-tr-03161"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur BSI TR-03161 Übersicht
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              BSI TR-03161 Anfrage
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Anfrage für TR-03161 Sicherheitsprüfung
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Füllen Sie das Formular aus und wir melden uns innerhalb von 1–2
            Werktagen für ein kostenloses Erstgespräch bei Ihnen.
          </p>
        </div>

        {/* Form */}
        <TR03161Form />

        {/* Links */}
        <div className="mt-12 text-center space-y-3">
          <p className="text-gray-500 text-sm">
            Mehr erfahren:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bsi-tr-03161"
              className="text-blue-400 hover:underline text-sm"
            >
              BSI TR-03161 Sicherheitsprüfung
            </Link>
            <Link
              href="/pentest-gesundheitsanwendungen"
              className="text-blue-400 hover:underline text-sm"
            >
              Pentest für Gesundheitsanwendungen
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
