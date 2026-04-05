"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, CheckCircle, Award, Search } from "lucide-react";

function VerifySearchForm() {
  const router = useRouter();
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = value.trim().toUpperCase();
    if (!id) return;
    router.push(`/verify/${id}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Zertifikat-ID, z.B. SS-2025-0042"
        className="flex-1 bg-[#111] border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500 transition-colors font-mono"
        autoComplete="off"
        spellCheck={false}
      />
      <button
        type="submit"
        className="flex items-center gap-2 bg-red-600 hover:bg-red-500 transition-colors rounded-xl px-5 py-3 text-sm font-bold text-white shrink-0"
      >
        <Search size={16} />
        Prüfen
      </button>
    </form>
  );
}

export default function VerifyIndexPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Top bar */}
      <div className="border-b border-white/10 bg-[#111]">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" rx="20" fill="#cc0000" />
              <path
                d="M50 10 L82 26 L82 58 C82 74 65 88 50 92 C35 88 18 74 18 58 L18 26 Z"
                fill="white"
              />
              <text
                x="50"
                y="66"
                textAnchor="middle"
                fontSize="38"
                fontWeight="900"
                fill="#cc0000"
                fontFamily="Segoe UI,sans-serif"
              >
                S
              </text>
            </svg>
            <div className="leading-tight">
              <div className="font-bold text-base">SODU</div>
              <div className="text-xs text-gray-400 -mt-1">Secure</div>
            </div>
          </Link>
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            Zertifikats-Verifikation
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-red-900/20 border border-red-800/40">
              <Shield size={48} className="text-red-500" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-black mb-3">Zertifikat verifizieren</h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Geben Sie die Zertifikat-ID aus dem Sicherheits-Badge ein, um die Echtheit und
              Details des Pentest-Zertifikats zu prüfen.
            </p>
          </div>

          {/* Search form */}
          <VerifySearchForm />

          {/* How it works */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-left space-y-4">
            <h2 className="text-sm font-bold text-white uppercase tracking-widest">
              So funktioniert es
            </h2>
            <div className="space-y-3">
              {[
                {
                  icon: Search,
                  title: "ID eingeben",
                  desc: 'Die Zertifikat-ID steht auf dem Badge – Format: SS-JJJJ-XXXX, z.B. "SS-2025-0042"',
                },
                {
                  icon: CheckCircle,
                  title: "Details prüfen",
                  desc: "Scope, Bewertung, Gültigkeitsdatum und Testergebnisse werden angezeigt",
                },
                {
                  icon: Award,
                  title: "Badge einbetten",
                  desc: "Den fertigen HTML-Code direkt auf der Verifikationsseite kopieren und einbetten",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-3 text-sm">
                  <div className="shrink-0 mt-0.5">
                    <Icon size={16} className="text-red-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{title}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demo link */}
          <p className="text-xs text-gray-600">
            Demo-Zertifikat:{" "}
            <Link
              href="/verify/SS-2025-DEMO"
              className="text-red-500 hover:text-red-400 font-mono transition-colors"
            >
              SS-2025-DEMO
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
