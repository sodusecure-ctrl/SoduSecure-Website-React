import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Calculator, Landmark, Flag, Award } from "lucide-react";
import { wikiArticles, wikiCategories, wikiTools } from "@/lib/wikiData";

// Bewusst noindex: Das Wiki soll nicht mit den SEO-Landingpages konkurrieren.
export const metadata: Metadata = {
  title: "Wiki – Compliance & IT-Sicherheit einfach erklärt",
  description:
    "Das Sodu Secure Wiki: NIS2, DSGVO, DORA, MDR, BSI C5, ISO 27001, TISAX & mehr – mit Umsetzungsschritten, offiziellen Quellen sowie allen Rechnern und Konfiguratoren.",
  robots: { index: false, follow: true },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "EU-Regulierung": <Flag className="w-4 h-4" />,
  Deutschland: <Landmark className="w-4 h-4" />,
  "Standards & Zertifizierung": <Award className="w-4 h-4" />,
};

export default function WikiHubPage() {
  return (
    <div className="min-h-screen bg-[#050506] text-white">
      {/* Hero */}
      <section className="premium-hero py-16 lg:py-24 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <BookOpen className="w-4 h-4 text-[#FF6B61]" />
            <span className="text-[#FF6B61] text-sm font-medium">Sodu Secure Wiki</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Compliance & IT-Sicherheit –<br />
            <span className="text-[#FF3B30]">verständlich erklärt, sauber belegt</span>
          </h1>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            NIS2, DSGVO, DORA, MDR, C5 &amp; Co.: Was gilt, wen es betrifft und wie man es umsetzt –
            jeder Artikel mit Schritt-für-Schritt-Anleitung und Links zu den offiziellen Quellen.
            Dazu alle Rechner, Checks und Konfiguratoren an einem Ort.
          </p>
        </div>
      </section>

      {/* Artikel nach Kategorie */}
      {wikiCategories.map((cat) => {
        const articles = wikiArticles.filter((a) => a.category === cat);
        if (articles.length === 0) return null;
        return (
          <section key={cat} className="py-12 lg:py-16 border-b border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-8 text-[#FF6B61]">
                {CATEGORY_ICONS[cat]}
                <h2 className="text-2xl font-bold text-white">{cat}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {articles.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/wiki/${a.slug}`}
                    className="group bg-[#0A0A0B] border border-white/10 hover:border-[#FF3B30]/40 rounded-2xl p-6 transition-colors flex flex-col"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40 mb-3">{a.badge}</span>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-[#FF6B61] transition-colors">{a.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed flex-1">{a.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#FF6B61]">
                      Zum Artikel <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Tools, Rechner & Konfiguratoren */}
      <section className="py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-3 text-[#FF6B61]">
            <Calculator className="w-4 h-4" />
            <h2 className="text-2xl font-bold text-white">Rechner, Checks &amp; Konfiguratoren</h2>
          </div>
          <p className="text-white/60 text-sm mb-8 max-w-2xl">
            Alle interaktiven Tools von Sodu Secure an einem Ort – vom Preis-Konfigurator bis zum Risiko-Check.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {wikiTools.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group bg-white/[0.03] border border-white/10 hover:border-[#FF3B30]/40 rounded-2xl p-6 transition-colors"
              >
                <h3 className="font-semibold mb-1.5 group-hover:text-[#FF6B61] transition-colors">{t.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Fragen zur Umsetzung?</h2>
          <p className="text-white/60 mb-8">
            Wir helfen bei Gap-Analyse, Penetrationstest und Audit-Vorbereitung – kostenlose Erstberatung.
          </p>
          <Link
            href="/request-pentest"
            className="inline-flex items-center justify-center gap-2 bg-[#FF3B30] hover:bg-[#E5332A] text-white px-8 py-4 rounded-2xl font-semibold transition-colors"
          >
            Jetzt Pentest Angebot anfordern <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
