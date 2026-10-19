"use client";

import { useState } from "react";
import Link from "next/link";
import TrustedSources from "@/components/common/TrustedSources";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import TrustCertMarquee from "@/components/landing/TrustCertMarquee";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileSearch,
  Search,
  ClipboardCheck,
  Award,
  MessageSquare,
  Target,
  Lock,
  Users,
  Globe,
  Server,
  Building2,
  Banknote,
  Stethoscope,
  Scale,
  AlertTriangle,
  Network,
  HeartPulse,
  Landmark,
  Factory,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  check: CheckCircle,
  fileSearch: FileSearch,
  search: Search,
  clipboard: ClipboardCheck,
  award: Award,
  message: MessageSquare,
  target: Target,
  lock: Lock,
  users: Users,
  globe: Globe,
  server: Server,
  building: Building2,
  banknote: Banknote,
  stethoscope: Stethoscope,
  scale: Scale,
  alert: AlertTriangle,
  network: Network,
  heart: HeartPulse,
  landmark: Landmark,
  factory: Factory,
  briefcase: Briefcase,
};

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Shield;
  return <Cmp className={className} />;
}

export interface RegulationContent {
  slug: string;
  badgeIcon: string;
  badgeText: string;
  title: string;
  titleAccent: string;
  heroIntro: string;
  heroPrimaryCta: string;
  heroSecondary?: { href: string; label: string };
  whatIs: { title: string; paragraphs: string[] };
  facts: { label: string; value: string }[];
  penalties?: {
    title: string;
    intro: string;
    items: { value: string; label: string; desc: string }[];
  };
  obligations: {
    title: string;
    accent: string;
    intro: string;
    points: string[];
    sidebarTitle: string;
    steps: { label: string; sub: string }[];
  };
  servicesTitle: string;
  servicesIntro: string;
  services: { icon: string; title: string; desc: string }[];
  whoForTitle: string;
  whoForIntro: string;
  whoFor: { icon: string; title: string; desc: string }[];
  process: { step: string; title: string; desc: string; icon: string }[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string; desc: string }[];
  relatedHeading?: string;
  relatedSubtext?: string;
  ctaTitle?: string;
  ctaText?: string;
  /** 1–3 belegende Sätze + Links zu offiziellen Quellen (BSI, EUR-Lex, ISO …) */
  sourcesIntro?: string[];
  sources?: { label: string; url: string }[];
  /** Zertifikats-Marquee + Kundenstimmen direkt unter dem Hero (wie Startseite) */
  showTrustSection?: boolean;
}

const SITE_URL = "https://sodusecure.com";

export default function RegulationPage({ data }: { data: RegulationContent }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const pageUrl = `${SITE_URL}/${data.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: data.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${data.title} – ${data.titleAccent}`,
      serviceType: "Penetration Testing & Compliance",
      provider: {
        "@type": "Organization",
        name: "Sodu Secure",
        url: SITE_URL,
        areaServed: "DE",
      },
      areaServed: { "@type": "Country", name: "Germany" },
      url: pageUrl,
      description: data.heroIntro,
    },
    ...(data.faqs?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: data.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24">
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.04em] text-white/65">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.8)]" />
            <Icon name={data.badgeIcon} className="h-3.5 w-3.5 text-[#FF3B30]" />
            <span>{data.badgeText}</span>
          </div>

          <h1 className="mt-8 max-w-5xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance] sm:text-[44px] sm:leading-[1.04] md:text-6xl lg:text-7xl">
            <span className="premium-silver">{data.title}</span>{" "}
            <span className="premium-headline-accent">{data.titleAccent}</span>
          </h1>

          <p className="mt-6 flex max-w-2xl items-start gap-3 text-base leading-relaxed text-white/70 sm:mt-7 md:text-lg">
            <span aria-hidden className="mt-[0.75em] h-[2px] w-8 shrink-0 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF3B30]/0 sm:w-12" />
            <span>{data.heroIntro}</span>
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="premium-cta inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              {data.heroPrimaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/penetration-testing"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              <Search className="h-4 w-4" />
              Penetrationstest
            </Link>
          </div>
        </div>
      </section>

      {data.showTrustSection && (
        <>
          <TrustCertMarquee />
          <TestimonialsSection />
        </>
      )}

      {/* What is it */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{data.whatIs.title}</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {data.whatIs.paragraphs.map((p, i) => (
              <p key={i} className="text-white/60 text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        {/* Quick facts */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {data.facts.map((f, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-[#1B181F] to-[#141217] border border-white/10 rounded-xl p-5 text-center"
            >
              <p className="text-xs uppercase tracking-wider text-white/40 mb-2">{f.label}</p>
              <p className="text-lg font-bold text-white">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Obligations / why */}
      <section className="bg-[#0A0A0B] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold mb-6">
                {data.obligations.title}{" "}
                <span className="text-[#FF6B61]">{data.obligations.accent}</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">{data.obligations.intro}</p>
              <div className="space-y-4">
                {data.obligations.points.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#FF6B61] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#1B181F] to-[#141217] border border-white/10 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <Lock className="w-6 h-6 text-[#FF6B61]" />
                  <span>{data.obligations.sidebarTitle}</span>
                </div>
                {data.obligations.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FF3B30]/15 border border-[#FF3B30]/30 flex items-center justify-center flex-shrink-0 text-sm font-bold text-[#FF6B61]">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{step.label}</p>
                      <p className="text-white/50 text-sm">{step.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penalties / consequences */}
      {data.penalties && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/30 rounded-full px-4 py-1.5 mb-4">
              <AlertTriangle className="w-4 h-4 text-[#FF6B61]" />
              <span className="text-[#FF6B61] text-sm font-medium">
                Konsequenzen bei Nichteinhaltung
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{data.penalties.title}</h2>
            <p className="text-white/60 max-w-3xl mx-auto text-lg leading-relaxed">
              {data.penalties.intro}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.penalties.items.map((item, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-[#241619] to-[#1A1113] border border-[#FF3B30]/25 rounded-xl p-6"
              >
                <p className="text-2xl md:text-3xl font-bold text-[#FF6B61] mb-2 leading-tight">
                  {item.value}
                </p>
                <p className="font-semibold text-white mb-1">{item.label}</p>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What we offer */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">{data.servicesTitle}</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">{data.servicesIntro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.services.map((service, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-[#1B181F] to-[#141217] border border-white/10 rounded-xl p-6 hover:border-[#FF3B30]/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20 flex items-center justify-center mb-4">
                <Icon name={service.icon} className="w-6 h-6 text-[#FF6B61]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who for */}
      <section className="bg-[#0A0A0B] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{data.whoForTitle}</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">{data.whoForIntro}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.whoFor.map((group, i) => (
              <div
                key={i}
                className="bg-gradient-to-b from-[#1B181F] to-[#141217] border border-white/10 rounded-xl p-6 text-center hover:border-[#FF3B30]/30 transition-colors"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#FF3B30]/10 flex items-center justify-center">
                    <Icon name={group.icon} className="w-7 h-7 text-[#FF6B61]" />
                  </div>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{group.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{group.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Unser Vorgehen</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Ein klar strukturierter Prozess – von der ersten Beratung bis zum prüffähigen Nachweis.
          </p>
        </div>
        <div className="space-y-6">
          {data.process.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-6 bg-gradient-to-b from-[#1B181F] to-[#141217] border border-white/10 rounded-xl p-6 hover:border-[#FF3B30]/20 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20 flex items-center justify-center">
                  <span className="text-[#FF6B61] font-bold text-lg">{step.step}</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{step.title}</h3>
                <p className="text-white/55 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      {data.related.length > 0 && (
        <section className="bg-[#0A0A0B] py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{data.relatedHeading ?? "Weitere Standards & Regularien"}</h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                {data.relatedSubtext ?? "Wir decken die gängigen Sicherheits- und Compliance-Anforderungen ab. Sehen Sie sich verwandte Themen an."}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.related.map((rel, i) => (
                <Link
                  key={i}
                  href={rel.href}
                  className="group bg-gradient-to-b from-[#1B181F] to-[#141217] border border-white/10 rounded-xl p-6 hover:border-[#FF3B30]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{rel.label}</h3>
                    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#FF6B61] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{rel.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Häufige Fragen</h2>
        </div>
        <div className="space-y-3">
          {data.faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gradient-to-b from-[#1B181F] to-[#141217] border border-white/10 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp className="w-5 h-5 text-white/40 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5">
                  <p className="text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Offizielle Quellen */}
      {data.sources && data.sources.length > 0 && (
        <TrustedSources
          title="Rechtsgrundlagen & offizielle Quellen"
          paragraphs={data.sourcesIntro ?? []}
          sources={data.sources}
        />
      )}

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#FF3B30] to-[#E5332A] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
            {data.ctaTitle ?? `${data.title} betrifft Sie? Sprechen wir darüber.`}
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            {data.ctaText ?? "Kostenlose Erstberatung – wir analysieren Ihre Ausgangslage und zeigen den schnellsten Weg zur Konformität."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#16141A] text-white font-semibold rounded-lg hover:bg-black/80 transition-colors"
            >
              Kostenlose Erstberatung anfragen
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/penetration-testing"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/10 border border-white/40 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors"
            >
              <Search className="w-5 h-5" />
              Zum Penetrationstest
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
