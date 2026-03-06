"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Phone, Mail } from "lucide-react";

export default function ThankYouPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after mount
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4 py-20">
      <div
        className={`max-w-xl w-full text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-600/10 border border-red-600/30 rounded-full p-5">
            <CheckCircle className="w-14 h-14 text-red-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
          Vielen Dank!
        </h1>
        <p className="text-gray-400 text-lg mb-2">
          Ihre Anfrage ist bei uns eingegangen.
        </p>
        <p className="text-gray-500 text-base mb-10">
          Unser Team meldet sich in der Regel innerhalb von{" "}
          <span className="text-white font-semibold">24 Stunden</span> persönlich bei Ihnen.
        </p>

        {/* Divider */}
        <div className="border-t border-white/10 mb-10" />

        {/* Contact info */}
        <p className="text-gray-500 text-sm mb-5">Bei dringenden Fragen erreichen Sie uns direkt:</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          <a
            href="tel:+4917923962949"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-5 py-3 text-sm transition"
          >
            <Phone className="w-4 h-4 text-red-400" />
            +49 179 239 6294
          </a>
          <a
            href="mailto:info@sodusecure.com"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-5 py-3 text-sm transition"
          >
            <Mail className="w-4 h-4 text-red-400" />
            info@sodusecure.com
          </a>
        </div>

        {/* CTA back to site */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02]"
        >
          Zurück zur Startseite
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
