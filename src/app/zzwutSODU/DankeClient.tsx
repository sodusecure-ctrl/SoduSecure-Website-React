"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleCheckBig, Mail, Phone } from "lucide-react";
import { trackConversion } from "@/lib/gtag";

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  studio: "Studio",
  pro: "Pro+",
};

export default function DankeClient() {
  const searchParams = useSearchParams();
  const isEN = searchParams?.get("lang") === "en";
  const planParam = searchParams?.get("plan") ?? "";
  const planName = PLAN_LABELS[planParam] ?? "";

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    trackConversion();
    // ChatGPT Ads Conversion (Pixel wird global in layout.tsx initialisiert)
    const oaiq = (window as unknown as { oaiq?: (...args: unknown[]) => void }).oaiq;
    oaiq?.("measure", "order_created", { type: "contents" });
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const steps = isEN
    ? [
        {
          t: "1 · Receipt",
          d: "Stripe receipt in your inbox. Invoice PDF follows with the first billing run.",
        },
        {
          t: "2 · Setup guide",
          d: "Within the next 24 hours you'll receive instructions on how to set everything up.",
        },
        {
          t: "3 · First report",
          d: "The day after setup you'll receive your first report, PDF in DE & EN.",
        },
      ]
    : [
        {
          t: "1 · Quittung",
          d: "Stripe-Beleg in Ihrem Posteingang. Rechnungs-PDF folgt mit dem ersten Abrechnungslauf.",
        },
        {
          t: "2 · Anleitung",
          d: "Sie bekommen in den nächsten 24 Stunden die Anleitung, wie Sie alles einrichten.",
        },
        {
          t: "3 · Erster Bericht",
          d: "Am Folgetag bekommen Sie Ihren ersten Bericht, PDF in DE & EN.",
        },
      ];

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white antialiased flex items-center justify-center px-6 py-16 lg:py-24">
      <div
        className={`mx-auto max-w-2xl text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
          <CircleCheckBig className="h-8 w-8" />
        </div>

        <h1 className="mt-7 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
          <span className="premium-silver">
            {isEN ? "Payment successful. Welcome." : "Zahlung erfolgreich. Willkommen."}
          </span>
        </h1>

        <p className="mt-4 text-[15px] text-white/65">
          {isEN ? (
            <>
              Your{planName ? ` ${planName} ` : " "}plan is active. Stripe has sent a
              receipt to your e-mail — we&apos;ll be in touch within 24 hours with the
              onboarding steps for your repository.
            </>
          ) : (
            <>
              Ihr{planName ? ` ${planName}-` : " "}Plan ist aktiv. Stripe hat eine
              Quittung an Ihre E-Mail geschickt - wir melden uns innerhalb von 24 Stunden
              mit den Onboarding-Schritten für Ihr Repository.
            </>
          )}
        </p>

        <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF6B61]">
                {s.t}
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">{s.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-[13px] text-white/55">
          {isEN
            ? "Questions in the meantime? Reach us directly:"
            : "Fragen in der Zwischenzeit? Sie erreichen uns direkt:"}
        </p>
        <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <a
            href="tel:+491777750985"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
          >
            <Phone className="h-4 w-4 text-[#FF6B61]" />
            0177 7750985
          </a>
          <a
            href="mailto:info@sodusecure.com"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/[0.06]"
          >
            <Mail className="h-4 w-4 text-[#FF6B61]" />
            info@sodusecure.com
          </a>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/sodu-audit-ai"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
          >
            {isEN ? "Back to Sodu /AuditAI" : "Zurück zu Sodu /AuditAI"}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-white/60 transition hover:text-white"
          >
            {isEN ? "Homepage" : "Startseite"}
          </Link>
        </div>
      </div>
    </main>
  );
}
