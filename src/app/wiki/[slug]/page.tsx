import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, ExternalLink, AlertTriangle, Shield } from "lucide-react";
import { getWikiArticle, wikiArticles } from "@/lib/wikiData";

export function generateStaticParams() {
  return wikiArticles.map((a) => ({ slug: a.slug }));
}

// Bewusst noindex: Wiki-Artikel dürfen nicht mit den SEO-Landingpages konkurrieren.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} – Wiki`,
    description: article.short,
    robots: { index: false, follow: true },
  };
}

export default async function WikiArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getWikiArticle(slug);
  if (!article) notFound();

  const related = wikiArticles.filter((a) => a.slug !== article.slug && a.category === article.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#050506] text-white">
      {/* Hero */}
      <section className="premium-hero py-14 lg:py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link href="/wiki" className="inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Zurück zum Wiki
          </Link>
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-5 ml-0 lg:ml-4">
            <BookOpen className="w-4 h-4 text-[#FF6B61]" />
            <span className="text-[#FF6B61] text-sm font-medium">{article.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{article.title}</h1>
          {article.intro.map((p, i) => (
            <p key={i} className="text-white/70 text-lg leading-relaxed mb-4">{p}</p>
          ))}
          {/* Quick facts */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {article.facts.map((f) => (
              <div key={f.label} className="bg-[#0A0A0B] border border-white/10 rounded-xl py-3 px-4">
                <div className="text-white/45 text-xs mb-0.5">{f.label}</div>
                <div className="font-semibold text-[#FF6B61] text-sm">{f.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inhalt */}
      <section className="py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {article.sections.map((s) => (
            <div key={s.heading}>
              <h2 className="text-2xl font-bold mb-4">{s.heading}</h2>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="text-white/65 leading-relaxed mb-4">{p}</p>
              ))}
              {s.bullets && (
                <ul className="space-y-3">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-white/70 leading-relaxed">
                      <CheckCircle className="w-5 h-5 text-[#FF6B61] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Umsetzung */}
          <div>
            <h2 className="text-2xl font-bold mb-6">So setzen Sie es um</h2>
            <ol className="space-y-4">
              {article.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/30 text-[#FF6B61] font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Sanktionen */}
          {article.penalties && (
            <div className="bg-[#FF3B30]/5 border border-[#FF3B30]/20 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-[#FF6B61]" />
                <h2 className="text-xl font-bold">Was droht bei Verstößen?</h2>
              </div>
              <p className="text-white/70 leading-relaxed">{article.penalties}</p>
            </div>
          )}

          {/* Pentest-Bezug */}
          <div className="bg-[#0A0A0B] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-[#FF6B61]" />
              <h2 className="text-xl font-bold">Die Rolle des Penetrationstests</h2>
            </div>
            <p className="text-white/70 leading-relaxed mb-5">{article.pentestNote}</p>
            {article.service && (
              <Link
                href={article.service.href}
                className="inline-flex items-center gap-2 bg-[#FF3B30] hover:bg-[#E5332A] text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm"
              >
                {article.service.label} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Quellen */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Offizielle Quellen &amp; Belege</h2>
            <p className="text-white/50 text-sm mb-5">
              Alle Angaben dieses Artikels stützen sich auf die folgenden Primärquellen (Stand: {article.updated}).
            </p>
            <ul className="space-y-2.5">
              {article.sources.map((src) => (
                <li key={src.url}>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-white/70 hover:text-[#FF6B61] transition-colors leading-relaxed"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0 mt-1" />
                    <span className="underline underline-offset-2 decoration-white/25">{src.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Verwandte Artikel */}
          {related.length > 0 && (
            <div className="border-t border-white/10 pt-10">
              <h2 className="text-xl font-bold mb-5">Verwandte Wiki-Artikel</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/wiki/${r.slug}`}
                    className="group bg-white/[0.03] border border-white/10 hover:border-[#FF3B30]/40 rounded-xl p-4 transition-colors"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 block mb-1.5">{r.badge}</span>
                    <span className="text-sm font-semibold group-hover:text-[#FF6B61] transition-colors">{r.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
