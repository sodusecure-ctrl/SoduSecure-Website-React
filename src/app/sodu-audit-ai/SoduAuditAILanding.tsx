"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Shield,
  Lock,
  FileText,
  Github,
  GitBranch,
  Workflow,
  Mail,
  Phone,
  User,
  Building2,
  ChevronDown,
  CircleCheckBig,
  CreditCard,
  XCircle,
  Plus,
  Trash2,
  Languages,
} from "lucide-react";
import { trackConversion } from "@/lib/gtag";

type Plan = "starter" | "studio" | "pro";
type BillingInterval = "month" | "year";
type Lang = "de" | "en";

const MAX_REPOS_BY_PLAN: Record<Plan, number> = {
  starter: 1,
  studio: 1,
  pro: 4,
};

type PriceVariant = {
  price: string;
  per: string;
  effective?: string;
  savings?: string;
  monthlyEquivalent?: string;
  totalLabel?: string;
};

type PlanCopy = {
  id: Plan;
  name: string;
  monthly: PriceVariant;
  yearly: PriceVariant;
  tagline: string;
  audience: string;
  features: string[];
  highlight?: boolean;
  badge?: string;
};

function buildPlans(lang: Lang): PlanCopy[] {
  const perMonth = lang === "en" ? "/month" : "/Monat";
  const perYear = lang === "en" ? "/year" : "/Jahr";
  const totalYear = (v: string) =>
    lang === "en" ? `${v} total per year` : `${v} im Jahr gesamt`;
  const effective = (v: string) =>
    lang === "en" ? `${v} / month effective` : `${v} / Monat effektiv`;
  const save = (v: string) => (lang === "en" ? `Save ${v}` : `Spare ${v}`);

  return [
    {
      id: "starter",
      name: "Starter",
      monthly: { price: "99 €", per: perMonth },
      yearly: {
        price: "1.068 €",
        per: perYear,
        monthlyEquivalent: "89 €",
        totalLabel: totalYear("1.068 €"),
        effective: effective("89 €"),
        savings: save("120 €"),
      },
      tagline:
        lang === "en"
          ? "The entry point into defensive AI."
          : "Der Einstieg in defensive KI.",
      audience:
        lang === "en"
          ? "Solo founders & early-stage startups"
          : "Solo-Gründer & frühe Startups",
      features:
        lang === "en"
          ? [
              "1 repository",
              "1 contributor",
              "1 audit run per month",
              "Report in DE & EN",
              "Ready-to-paste fix suggestions",
            ]
          : [
              "1 Repository",
              "1 Contributor",
              "1 Audit-Lauf pro Monat",
              "Bericht in DE & EN",
              "Fertige Fix-Vorschläge",
            ],
    },
    {
      id: "studio",
      name: "Studio",
      monthly: { price: "199 €", per: perMonth },
      yearly: {
        price: "2.148 €",
        per: perYear,
        monthlyEquivalent: "179 €",
        totalLabel: totalYear("2.148 €"),
        effective: effective("179 €"),
        savings: save("240 €"),
      },
      tagline:
        lang === "en"
          ? "Weekly. One codebase. Fully in control."
          : "Wöchentlich. Eine Codebasis. Voll im Griff.",
      audience:
        lang === "en" ? "Product teams, 1 repo" : "Produkt-Teams, 1 Repo",
      features:
        lang === "en"
          ? [
              "1 repository",
              "Unlimited contributors",
              "Weekly report",
              "Trend history & triage",
              "Priority support",
            ]
          : [
              "1 Repository",
              "Unbegrenzte Contributoren",
              "Wöchentlicher Bericht",
              "Trend-Historie & Triage",
              "Priority-Support",
            ],
      highlight: true,
      badge: lang === "en" ? "Most popular" : "Beliebteste Wahl",
    },
    {
      id: "pro",
      name: "Pro+",
      monthly: { price: "449 €", per: perMonth },
      yearly: {
        price: "4.848 €",
        per: perYear,
        monthlyEquivalent: "404 €",
        totalLabel: totalYear("4.848 €"),
        effective: effective("404 €"),
        savings: save("540 €"),
      },
      tagline:
        lang === "en"
          ? "Up to 4 repos plus quarterly full pentest."
          : "Bis zu 4 Repos plus quartalsweise Voll-Pentest.",
      audience:
        lang === "en"
          ? "Scale-ups, Series A & ISO 27001"
          : "Scale-ups, Series A & ISO 27001",
      features:
        lang === "en"
          ? [
              "Up to 4 repositories (1 project)",
              "Unlimited contributors",
              "Weekly report",
              "Quarterly full pentest (1 repo)",
              "Dedicated point of contact",
            ]
          : [
              "Bis zu 4 Repositories (1 Projekt)",
              "Unbegrenzte Contributoren",
              "Wöchentlicher Bericht",
              "Quartalsweise Voll-Pentest (1 Repo)",
              "Dedizierter Ansprechpartner",
            ],
    },
  ];
}

function priceFor(plan: PlanCopy, interval: BillingInterval): PriceVariant {
  return interval === "year" ? plan.yearly : plan.monthly;
}

function buildHeroPills(lang: Lang): string[] {
  return lang === "en"
    ? [
        "Made in Germany",
        "GDPR-compliant",
        "Reply in 24 h",
        "Read-only access",
        "Cancel anytime",
      ]
    : [
        "Made in Germany",
        "DSGVO-konform",
        "Antwort in 24 h",
        "Read-only Zugriff",
        "Jederzeit kündbar",
      ];
}

function buildFeatures(lang: Lang) {
  if (lang === "en") {
    return [
      {
        icon: <Sparkles className="h-5 w-5" />,
        title: "Senior-engineer level",
        text: "Multi-pass code reasoning with adversarial verification – not a pattern scanner, but real code reading.",
      },
      {
        icon: <FileText className="h-5 w-5" />,
        title: "Weekly report",
        text: "Executive summary plus technical appendix as PDF in DE and EN. Audit-grade, no patchwork output.",
      },
      {
        icon: <Workflow className="h-5 w-5" />,
        title: "Ready-to-paste fixes",
        text: "Every finding comes with a paste-ready code patch. OWASP and CWE mapping included.",
      },
      {
        icon: <Lock className="h-5 w-5" />,
        title: "Read-only & GDPR",
        text: "We can never write to your repo. Clones are deleted after every run. Hosted in Germany.",
      },
      {
        icon: <Github className="h-5 w-5" />,
        title: "Setup in 5 minutes",
        text: "GitHub App or read-only token. Onboarding included, no pipeline rebuild.",
      },
      {
        icon: <Shield className="h-5 w-5" />,
        title: "ISO 27001 & TR-03161",
        text: "The Pro+ plan includes manual pentests by OSCP pentesters – accepted by auditors and investors.",
      },
    ];
  }
  return [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Senior-Engineer-Niveau",
      text: "Multi-Pass Code-Reasoning mit adversarialer Verifikation - kein Pattern-Scanner, sondern echtes Code-Reading.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Wöchentlicher Bericht",
      text: "Executive Summary plus technischer Anhang als PDF in DE und EN. Audit-tauglich, ohne Bastel-Output.",
    },
    {
      icon: <Workflow className="h-5 w-5" />,
      title: "Fertige Fixes",
      text: "Jeder Befund mit paste-ready Code-Patch. OWASP- und CWE-Mapping inklusive.",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Read-only & DSGVO",
      text: "Wir können nie in Ihr Repo schreiben. Klone werden nach jedem Lauf gelöscht. Hosting in Deutschland.",
    },
    {
      icon: <Github className="h-5 w-5" />,
      title: "Setup in 5 Minuten",
      text: "GitHub-App oder Read-only Token. Onboarding inklusive, ohne Pipeline-Umbau.",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "ISO 27001 & TR-03161",
      text: "Pro+ Plan enthält manuelle Pentests durch OSCP-Pentester - akzeptiert von Auditoren und Investoren.",
    },
  ];
}

function buildFaq(lang: Lang) {
  if (lang === "en") {
    return [
      {
        q: "How fast do we start?",
        a: "Within 24 hours of your request you'll get an onboarding slot. GitHub connection in 5 minutes, first report usually within 7 days.",
      },
      {
        q: "Are the prices with or without VAT?",
        a: "All listed prices are net. 19 % German VAT is added on every invoice – Stripe shows VAT correctly on the receipt.",
      },
      {
        q: "What does onboarding cost?",
        a: "Nothing extra. Setup & onboarding (repo connection, baseline audit, Slack/Teams integration) are included in every plan – no separate setup fee.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. On the monthly plan you cancel by the next billing cycle — no minimum term. On the annual plan you cancel by the end of the term and save ~10 %.",
      },
      {
        q: "What happens to my code?",
        a: "Read-only access via GitHub App. Clones run exclusively on our ISO-compliant infrastructure in Germany and are fully deleted after every audit run.",
      },
      {
        q: "Does this replace a pentest for ISO 27001?",
        a: "Studio replaces code audits. For ISO 27001 / BSI TR-03161, Pro+ additionally includes quarterly manual pentests with a certificate – accepted by auditors.",
      },
    ];
  }
  return [
    {
      q: "Wie schnell starten wir?",
      a: "Innerhalb von 24 Stunden nach Anfrage erhalten Sie einen Onboarding-Slot. GitHub-Anbindung in 5 Minuten, erster Bericht meist in 7 Tagen.",
    },
    {
      q: "Sind die Preise mit oder ohne MwSt.?",
      a: "Alle ausgewiesenen Preise sind Nettopreise. Auf jede Rechnung kommen 19 % deutsche Umsatzsteuer obendrauf - Stripe weist die MwSt. korrekt auf der Rechnung aus.",
    },
    {
      q: "Was kostet das Onboarding?",
      a: "Nichts extra. Das Setup & Onboarding (Repo-Anbindung, Baseline-Audit, Slack/Teams-Integration) ist im Plan inklusive – keine separate Setup-Gebühr.",
    },
    {
      q: "Kann ich jederzeit kündigen?",
      a: "Ja. Im Monats-Abo kündigen Sie zur nächsten Abrechnung — keine Mindestlaufzeit. Im Jahres-Abo kündigen Sie zum Laufzeitende und sparen ~10 %.",
    },
    {
      q: "Was passiert mit meinem Code?",
      a: "Read-only Zugriff über GitHub-App. Klone laufen ausschließlich in unserer ISO-konformen Infrastruktur in Deutschland und werden nach jedem Audit-Lauf vollständig gelöscht.",
    },
    {
      q: "Reicht das als Pentest-Ersatz für ISO 27001?",
      a: "Studio ersetzt Code-Audits. For ISO 27001 / BSI TR-03161 enthält Pro+ zusätzlich quartalsweise manuelle Pentests mit Zertifikat - akzeptiert von Auditoren.",
    },
  ];
}

function buildComparisonRows(lang: Lang) {
  if (lang === "en") {
    return [
      { f: "Repositories", s: "1", st: "1", p: "up to 4 (1 project)" },
      { f: "Contributors", s: "1", st: "Unlimited", p: "Unlimited" },
      { f: "Audit cadence", s: "Monthly", st: "Weekly", p: "Weekly" },
      { f: "Setup & onboarding", s: "Included", st: "Included", p: "Included" },
      { f: "Audit report (DE & EN)", s: true, st: true, p: true },
      { f: "Ready-to-paste code fixes", s: true, st: true, p: true },
      { f: "OWASP Top 10 + CWE mapping", s: true, st: true, p: true },
      { f: "Trend history & triage", s: false, st: true, p: true },
      { f: "Priority support (24h SLA)", s: false, st: true, p: true },
      { f: "Slack/Teams integration", s: false, st: true, p: true },
      { f: "Quarterly pentest (manual, OSCP)", s: false, st: false, p: true },
      { f: "ISO 27001 / TR-03161 audit pack", s: false, st: false, p: true },
      { f: "Dedicated Security Lead", s: false, st: false, p: true },
      { f: "Monthly or annual (−10 %)", s: true, st: true, p: true },
    ] as Array<{ f: string; s: boolean | string; st: boolean | string; p: boolean | string }>;
  }
  return [
    { f: "Repositories", s: "1", st: "1", p: "bis zu 4 (1 Projekt)" },
    { f: "Contributoren", s: "1", st: "Unbegrenzt", p: "Unbegrenzt" },
    { f: "Audit-Cadence", s: "Monatlich", st: "Wöchentlich", p: "Wöchentlich" },
    {
      f: "Setup & Onboarding",
      s: "Inklusive",
      st: "Inklusive",
      p: "Inklusive",
    },
    { f: "Audit-Bericht (DE & EN)", s: true, st: true, p: true },
    { f: "Fertige Code-Fix-Vorschläge", s: true, st: true, p: true },
    { f: "OWASP Top 10 + CWE-Mapping", s: true, st: true, p: true },
    { f: "Trend-Historie & Triage", s: false, st: true, p: true },
    { f: "Priority-Support (24h SLA)", s: false, st: true, p: true },
    { f: "Slack/Teams-Integration", s: false, st: true, p: true },
    { f: "Quartals-Pentest (manuell, OSCP)", s: false, st: false, p: true },
    { f: "ISO 27001 / TR-03161 Auditpaket", s: false, st: false, p: true },
    { f: "Dedicated Security Lead", s: false, st: false, p: true },
    { f: "Monatlich oder jährlich (−10 %)", s: true, st: true, p: true },
  ] as Array<{ f: string; s: boolean | string; st: boolean | string; p: boolean | string }>;
}

type Provider = "github" | "gitlab";

export default function SoduAuditAILanding() {
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const planParam = searchParams?.get("plan");
  const langParam = searchParams?.get("lang");
  const initialPlan: Plan | null =
    planParam === "starter" || planParam === "studio" || planParam === "pro"
      ? planParam
      : null;
  const initialLang: Lang = langParam === "en" ? "en" : "de";

  const [lang, setLang] = useState<Lang>(initialLang);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(initialPlan);
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("month");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(
    status === "success" ? 3 : status === "cancelled" ? 4 : initialPlan ? 2 : 1
  );

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [provider, setProvider] = useState<Provider | null>(null);
  const [repoUrls, setRepoUrls] = useState<string[]>([""]);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  // Localized data structures
  const PLANS = useMemo(() => buildPlans(lang), [lang]);
  const HERO_PILLS = useMemo(() => buildHeroPills(lang), [lang]);
  const FEATURES = useMemo(() => buildFeatures(lang), [lang]);
  const FAQ = useMemo(() => buildFaq(lang), [lang]);
  const COMPARISON_ROWS = useMemo(() => buildComparisonRows(lang), [lang]);

  const SETUP_INCLUDED_LABEL =
    lang === "en" ? "Setup & onboarding included" : "Setup & Onboarding inklusive";
  const VAT_NOTE =
    lang === "en" ? "All prices plus 19 % VAT." : "Alle Preise zzgl. 19 % MwSt.";
  const VAT_SHORT = lang === "en" ? "plus 19 % VAT." : "zzgl. 19 % MwSt.";

  const selectedPlanData = useMemo(
    () => PLANS.find((p) => p.id === selectedPlan) ?? null,
    [selectedPlan, PLANS]
  );

  const selectedPrice = useMemo(
    () => (selectedPlanData ? priceFor(selectedPlanData, billingInterval) : null),
    [selectedPlanData, billingInterval]
  );

  const maxRepos = selectedPlan ? MAX_REPOS_BY_PLAN[selectedPlan] : 1;

  useEffect(() => {
    setRepoUrls((prev) => {
      if (prev.length <= maxRepos) return prev;
      return prev.slice(0, maxRepos);
    });
  }, [maxRepos]);

  useEffect(() => {
    if (formRef.current && (step === 2 || step === 3 || step === 4)) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  useEffect(() => {
    if (status === "success") {
      trackConversion();
    }
  }, [status]);

  function handlePlanSelect(plan: Plan) {
    setSelectedPlan(plan);
    setStep(2);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  function scrollToPlans() {
    planRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const ERR = {
      pickPlan: lang === "en" ? "Please choose a plan." : "Bitte wählen Sie einen Plan.",
      email:
        lang === "en"
          ? "Please enter a valid e-mail address."
          : "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      nameOrCompany:
        lang === "en"
          ? "Please enter your name or company."
          : "Bitte geben Sie Ihren Namen oder Ihre Firma an.",
      provider:
        lang === "en"
          ? "Please choose GitHub or GitLab."
          : "Bitte wählen Sie GitHub oder GitLab.",
      atLeastOneRepo:
        lang === "en"
          ? "Please enter at least one repository URL or repo name."
          : "Bitte mindestens eine Repository-URL oder einen Repo-Namen angeben.",
      tooManyPro: (n: number) =>
        lang === "en"
          ? `Up to ${n} repositories per Pro+ subscription (all must belong to the same project).`
          : `Maximal ${n} Repositories pro Pro+-Abo (alle müssen zum selben Projekt gehören).`,
      tooManyOther: (n: number) =>
        lang === "en"
          ? `This plan supports only ${n} repository.`
          : `Dieser Plan unterstützt nur ${n} Repository.`,
      acceptTerms:
        lang === "en"
          ? "Please accept the terms and privacy policy to continue."
          : "Bitte bestätigen Sie die AGB und Datenschutzerklärung, um fortzufahren.",
      checkoutFailed:
        lang === "en"
          ? "Checkout could not be started. Please try again."
          : "Checkout konnte nicht gestartet werden. Bitte erneut versuchen.",
      missingUrl:
        lang === "en"
          ? "Checkout URL missing. Please try again."
          : "Checkout-URL fehlt. Bitte erneut versuchen.",
      generic:
        lang === "en"
          ? "Something went wrong. Please try again."
          : "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    };

    if (!selectedPlan) {
      setError(ERR.pickPlan);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(ERR.email);
      return;
    }
    if (!name.trim() && !company.trim()) {
      setError(ERR.nameOrCompany);
      return;
    }
    if (!provider) {
      setError(ERR.provider);
      return;
    }

    const cleanRepos = repoUrls.map((r) => r.trim()).filter((r) => r.length > 0);
    if (cleanRepos.length === 0) {
      setError(ERR.atLeastOneRepo);
      return;
    }
    if (cleanRepos.length > maxRepos) {
      setError(
        selectedPlan === "pro" ? ERR.tooManyPro(maxRepos) : ERR.tooManyOther(maxRepos)
      );
      return;
    }
    if (!acceptTerms) {
      setError(ERR.acceptTerms);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          billingInterval,
          email: email.trim(),
          name: name.trim() || undefined,
          company: company.trim() || undefined,
          phone: phone.trim() || undefined,
          provider,
          repoUrls: cleanRepos,
          acceptTerms,
          locale: lang,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || ERR.checkoutFailed);
        setSubmitting(false);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      setError(ERR.missingUrl);
      setSubmitting(false);
    } catch {
      setError(ERR.generic);
      setSubmitting(false);
    }
  }

  function updateRepoUrl(index: number, value: string) {
    setRepoUrls((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }

  function addRepoField() {
    setRepoUrls((prev) => (prev.length >= maxRepos ? prev : [...prev, ""]));
  }

  function removeRepoField(index: number) {
    setRepoUrls((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  }

  const isEN = lang === "en";

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white antialiased">
      {/* Minimal top bar */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:py-6">
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF5247] to-[#E5332A] shadow-[0_8px_24px_-8px_rgba(255,59,48,0.6)] ring-1 ring-white/10">
              <Shield className="h-4 w-4 text-white" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-white">
              Sodu <span className="text-white/55">/AuditAI</span>
            </span>
          </Link>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden items-center gap-6 text-xs text-white/55 md:flex">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                {isEN ? "Online · Reply in 24 h" : "Online · Antwort in 24 h"}
              </span>
              <span className="hidden lg:inline">
                {isEN ? "Made in Germany · GDPR-compliant" : "Made in Germany · DSGVO-konform"}
              </span>
            </div>

            {/* Language toggle */}
            <div
              role="group"
              aria-label={isEN ? "Language" : "Sprache"}
              className="inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5 backdrop-blur-sm"
            >
              <Languages className="ml-2 mr-0.5 h-3.5 w-3.5 text-white/55" aria-hidden />
              {(["de", "en"] as Lang[]).map((l) => {
                const active = lang === l;
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={active}
                    className={[
                      "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] transition",
                      active
                        ? "bg-white text-[#0A0A0B] shadow-[0_2px_8px_rgba(255,255,255,0.18)]"
                        : "text-white/65 hover:text-white",
                    ].join(" ")}
                  >
                    {l}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-16 lg:pt-16 lg:pb-24">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,0.85)]" />
              {isEN ? "Sodu /AuditAI · from €99 / month" : "Sodu /AuditAI · ab 99 € / Monat"}
            </span>
            <h1 className="mt-7 text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] md:text-[68px] lg:text-[84px]">
              <span className="premium-silver">
                {isEN ? "Senior code audit." : "Senior-Code-Audit."}
              </span>
              <br />
              <span className="premium-headline-accent">
                {isEN ? "As a weekly subscription." : "Im wöchentlichen Abo."}
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/72 md:text-[17px]">
              {isEN
                ? "Defensive AI reads your production code like a senior security engineer — data flow, auth paths, secrets, business logic. Every week. With ready-to-paste fix suggestions. Choose your plan, the rest is one e-mail."
                : "Defensive KI liest Ihren Production-Code wie ein Senior-Security-Engineer - Datenfluss, Auth-Pfade, Secrets, Business-Logik. Jede Woche. Mit fertigen Fix-Vorschlägen. Wählen Sie Ihren Plan, der Rest ist eine E-Mail."}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={scrollToPlans}
                className="premium-cta premium-cta-glow inline-flex items-center gap-2 rounded-full px-7 py-4 text-[14px] font-semibold text-white"
              >
                {isEN ? "Choose plan" : "Plan wählen"} <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-[14px] font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
              >
                {isEN ? "How it works" : "Wie es funktioniert"}
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-2 text-[12px] text-white/60">
              {HERO_PILLS.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Floating "preview report" card */}
          <div className="pointer-events-none absolute right-[-60px] top-24 hidden w-[420px] rotate-[2deg] xl:block">
            <div className="premium-card relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_40px_120px_-30px_rgba(255,59,48,0.35)]">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    {isEN ? "Weekly report · W23" : "Wöchentlicher Bericht · KW 23"}
                  </div>
                  <div className="text-sm font-semibold text-white">acme-corp / payments-api</div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2">
                {[
                  { v: "2", l: "Critical" },
                  { v: "5", l: "High" },
                  { v: "11", l: "Medium" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center"
                  >
                    <div className="premium-tabular text-2xl font-bold text-white">{s.v}</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-white/50">{s.l}</div>
                  </div>
                ))}
              </div>
              <ul className="mt-5 space-y-2.5 text-[13px] text-white/80">
                {(isEN
                  ? [
                      "JWT validation bypassable via alg=none",
                      "SSRF in /webhooks/inbound",
                      "Race condition in Stripe refund",
                    ]
                  : [
                      "JWT-Validierung umgehbar via alg=none",
                      "SSRF in /webhooks/inbound",
                      "Race condition im Stripe-Refund",
                    ]
                ).map((i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF3B30]" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-2.5 text-[11px] text-white/60">
                <span>OWASP · CWE-Mapping</span>
                <span className="text-emerald-400/90">
                  {isEN ? "Fixes: paste-ready" : "Fixes: paste-ready"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAN SELECTOR */}
      <section ref={planRef} id="plans" className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-2 lg:pb-20">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
                {isEN ? "Step 1 · Choose plan" : "Schritt 1 · Plan wählen"}
              </span>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-white md:text-5xl">
                <span className="premium-silver">
                  {isEN ? "Three plans." : "Drei Pläne."}
                </span>{" "}
                <span className="premium-headline-accent">
                  {isEN ? "One decision." : "Eine Entscheidung."}
                </span>
              </h2>
              <p className="mt-4 text-[15px] text-white/65">
                {isEN
                  ? "No minimum term on the monthly plan. Choose the plan that fits your codebase — upgrade or cancel anytime. Setup & onboarding always included."
                  : "Keine Mindestlaufzeit beim Monats-Abo. Wählen Sie den Plan, der zu Ihrer Codebasis passt - upgraden oder kündigen jederzeit. Setup & Onboarding immer inklusive."}
              </p>
            </div>

            {/* Billing interval toggle */}
            <div className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur-sm">
              {(
                [
                  { id: "month" as BillingInterval, label: isEN ? "Monthly" : "Monatlich" },
                  { id: "year" as BillingInterval, label: isEN ? "Annual" : "Jährlich", hint: "−10 %" },
                ]
              ).map((opt) => {
                const active = billingInterval === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBillingInterval(opt.id)}
                    aria-pressed={active}
                    className={[
                      "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition",
                      active
                        ? "bg-white text-[#0A0A0B] shadow-[0_4px_14px_rgba(255,255,255,0.18)]"
                        : "text-white/70 hover:text-white",
                    ].join(" ")}
                  >
                    {opt.label}
                    {opt.hint && (
                      <span
                        className={[
                          "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-tight",
                          active
                            ? "bg-[#FF3B30] text-white"
                            : "bg-[#FF3B30]/15 text-[#FF6B61]",
                        ].join(" ")}
                      >
                        {opt.hint}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {PLANS.map((p) => {
              const isSelected = selectedPlan === p.id;
              const variant = priceFor(p, billingInterval);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handlePlanSelect(p.id)}
                  aria-pressed={isSelected}
                  className={[
                    "group relative flex flex-col rounded-3xl border p-7 text-left transition-all duration-300",
                    "premium-card",
                    p.highlight
                      ? "border-[#FF3B30]/35 shadow-[0_30px_90px_-30px_rgba(255,59,48,0.55)]"
                      : "border-white/10",
                    isSelected
                      ? "ring-2 ring-[#FF3B30] shadow-[0_30px_90px_-30px_rgba(255,59,48,0.7)] -translate-y-1"
                      : "hover:-translate-y-1",
                  ].join(" ")}
                >
                  {p.highlight && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF5247] to-[#E5332A] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_-8px_rgba(255,59,48,0.7)]">
                      {p.badge}
                    </span>
                  )}

                  <div className="flex items-baseline justify-between">
                    <div>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                        Sodu /AuditAI
                      </div>
                      <div className="mt-1 text-[22px] font-semibold tracking-tight text-white">
                        {p.name}
                      </div>
                    </div>
                    <div
                      className={[
                        "inline-flex h-7 w-7 items-center justify-center rounded-full border transition",
                        isSelected
                          ? "border-[#FF3B30] bg-[#FF3B30] text-white"
                          : "border-white/15 bg-white/[0.04] text-transparent group-hover:border-white/35",
                      ].join(" ")}
                      aria-hidden
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="premium-tabular text-5xl font-extrabold tracking-tight text-white">
                      {billingInterval === "year" && variant.monthlyEquivalent
                        ? variant.monthlyEquivalent
                        : variant.price}
                    </span>
                    <span className="text-sm text-white/55">
                      {billingInterval === "year" && variant.monthlyEquivalent
                        ? isEN
                          ? "/month"
                          : "/Monat"
                        : variant.per}
                    </span>
                  </div>
                  {billingInterval === "year" && variant.totalLabel && (
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px]">
                      <span className="text-white/55">{variant.totalLabel}</span>
                      {variant.savings && (
                        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                          {variant.savings}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="mt-1.5 text-[11px] font-medium text-emerald-300/90">
                    {SETUP_INCLUDED_LABEL}
                  </div>
                  <div className="mt-0.5 text-[10px] text-white/40">{VAT_SHORT}</div>
                  <p className="mt-2 text-[13px] text-white/70">{p.tagline}</p>
                  <p className="mt-1 text-[12px] text-white/45">{p.audience}</p>

                  <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <ul className="space-y-2.5 text-[14px] text-white/85">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
                          <Check className="h-3 w-3" />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[13px] font-semibold text-white">
                    <span>
                      {isSelected
                        ? isEN
                          ? "Selected"
                          : "Ausgewählt"
                        : isEN
                          ? `Choose ${p.name}`
                          : `${p.name} wählen`}
                    </span>
                    <ArrowRight
                      className={[
                        "h-4 w-4 transition",
                        isSelected ? "text-[#FF6B61]" : "text-white/55 group-hover:translate-x-0.5 group-hover:text-white",
                      ].join(" ")}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[12px] text-white/45">
            {VAT_NOTE} ·{" "}
            {billingInterval === "year"
              ? isEN
                ? "Billed annually in advance, cancel by end of term"
                : "Jährlich vorab, kündbar zum Laufzeitende"
              : isEN
                ? "Cancel monthly"
                : "Monatlich kündbar"}{" "}
            ·{" "}
            {isEN ? "Read-only access" : "Read-only Zugriff"}
          </p>
          <p className="mt-1.5 text-center text-[11px] text-white/40">
            {isEN
              ? "Setup & onboarding included: repo connection, baseline audit, Slack/Teams integration & onboarding."
              : "Setup & Onboarding inklusive: Repo-Anbindung, Baseline-Audit, Slack/Teams-Integration & Onboarding."}
          </p>
        </div>
      </section>

      {/* CONTACT FORM / SUCCESS / CANCELLED */}
      <section ref={formRef} id="form" className="relative">
        <div className="premium-divider mx-auto max-w-6xl" />
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
          {step === 3 ? (
            <SuccessState
              planName={selectedPlanData?.name ?? ""}
              email={email}
              lang={lang}
            />
          ) : step === 4 ? (
            <CancelledState
              lang={lang}
              onRetry={() => {
                setStep(selectedPlan ? 2 : 1);
                if (!selectedPlan) scrollToPlans();
              }}
            />
          ) : (
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
              {/* Selected plan summary */}
              <aside className="lg:sticky lg:top-10 lg:self-start">
                <div className="relative overflow-hidden rounded-3xl border border-white/10 premium-card p-7">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-70"
                    style={{
                      backgroundImage:
                        "radial-gradient(70% 50% at 100% 0%, rgba(255,59,48,0.16), transparent 60%)",
                    }}
                    aria-hidden
                  />
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
                      {isEN ? "Step 2 · Your details" : "Schritt 2 · Ihre Daten"}
                    </span>

                    {selectedPlanData && selectedPrice ? (
                      <>
                        <div className="mt-6 flex items-baseline gap-2">
                          <span className="premium-tabular text-5xl font-extrabold tracking-tight text-white">
                            {billingInterval === "year" && selectedPrice.monthlyEquivalent
                              ? selectedPrice.monthlyEquivalent
                              : selectedPrice.price}
                          </span>
                          <span className="text-sm text-white/55">
                            {billingInterval === "year" && selectedPrice.monthlyEquivalent
                              ? isEN
                                ? "/month"
                                : "/Monat"
                              : selectedPrice.per}
                          </span>
                        </div>
                        {billingInterval === "year" && selectedPrice.totalLabel && (
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px]">
                            <span className="text-white/55">{selectedPrice.totalLabel}</span>
                            {selectedPrice.savings && (
                              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
                                {selectedPrice.savings}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="mt-3 inline-flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#FF3B30]/30 bg-[#FF3B30]/10 px-3 py-1 text-xs font-semibold tracking-tight text-[#FF6B61]">
                            {selectedPlanData.name}
                          </span>
                          <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold tracking-tight text-white/70">
                            {billingInterval === "year"
                              ? isEN
                                ? "Annual"
                                : "Jährlich"
                              : isEN
                                ? "Monthly"
                                : "Monatlich"}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-white/65">{selectedPlanData.audience}</p>

                        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                            {isEN ? "Due today" : "Heute fällig"}
                          </div>
                          <dl className="mt-3 space-y-1.5 text-[13px]">
                            <div className="flex items-center justify-between text-white/80">
                              <dt>
                                {selectedPlanData.name} ·{" "}
                                {billingInterval === "year"
                                  ? isEN
                                    ? "year"
                                    : "Jahr"
                                  : isEN
                                    ? "month"
                                    : "Monat"}
                              </dt>
                              <dd className="premium-tabular font-semibold text-white">
                                {selectedPrice.price}
                              </dd>
                            </div>
                            <div className="flex items-center justify-between text-emerald-300/85">
                              <dt>{isEN ? "Setup & onboarding" : "Setup & Onboarding"}</dt>
                              <dd className="premium-tabular font-semibold">
                                {isEN ? "included" : "inklusive"}
                              </dd>
                            </div>
                          </dl>
                          <p className="mt-3 border-t border-white/10 pt-2.5 text-[11px] text-white/50">
                            {isEN ? "After that just " : "Anschließend nur noch "}
                            {selectedPrice.price}
                            {selectedPrice.per}. {VAT_SHORT}
                          </p>
                        </div>

                        <div className="my-6 h-px bg-white/10" />

                        <ul className="space-y-2.5 text-[14px] text-white/85">
                          {selectedPlanData.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5">
                              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
                                <Check className="h-3 w-3" />
                              </span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>

                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            scrollToPlans();
                          }}
                          className="mt-7 inline-flex items-center gap-1.5 text-[12px] font-semibold text-white/70 transition hover:text-white"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />{" "}
                          {isEN ? "Change plan" : "Plan ändern"}
                        </button>
                      </>
                    ) : (
                      <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-6 text-center">
                        <p className="text-sm text-white/65">
                          {isEN
                            ? "Please choose a plan above first."
                            : "Wählen Sie zuerst oben einen Plan."}
                        </p>
                        <button
                          type="button"
                          onClick={scrollToPlans}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[12px] font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
                        >
                          {isEN ? "See plans" : "Pläne ansehen"}{" "}
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-[12px] text-white/55">
                  <div className="flex items-center gap-2 text-white/85">
                    <Lock className="h-3.5 w-3.5 text-[#FF6B61]" />
                    <span className="font-semibold">
                      {isEN ? "GDPR-compliant" : "DSGVO-konform"}
                    </span>
                  </div>
                  <p className="mt-2 leading-relaxed">
                    {isEN
                      ? "We only use your data to process your request. Hosted in Germany, no tracking, no sale to third parties."
                      : "Wir nutzen Ihre Daten ausschließlich zur Bearbeitung Ihrer Anfrage. Hosting in Deutschland, kein Tracking, kein Verkauf an Dritte."}
                  </p>
                </div>
              </aside>

              {/* Form */}
              <div>
                <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
                  {isEN
                    ? "Your details — then on to secure payment."
                    : "Ihre Daten - dann zur sicheren Zahlung."}
                </h2>
                <p className="mt-3 max-w-xl text-[15px] text-white/60">
                  {isEN
                    ? "E-mail, company and repository — that's all we need. Payment runs encrypted via Stripe, monthly cancellable."
                    : "E-Mail, Firma und Repository - mehr brauchen wir nicht. Bezahlung läuft verschlüsselt über Stripe, monatlich kündbar."}
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
                  <Field icon={<Mail className="h-4 w-4" />} label={isEN ? "E-mail" : "E-Mail"} required>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isEN ? "you@company.com" : "sie@firma.de"}
                      required
                      autoComplete="email"
                      disabled={!selectedPlan}
                      className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none disabled:opacity-40"
                    />
                  </Field>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      icon={<User className="h-4 w-4" />}
                      label={isEN ? "First and last name" : "Vor- und Nachname"}
                      hint={isEN ? "optional" : "optional"}
                    >
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={isEN ? "Jane Doe" : "Max Mustermann"}
                        autoComplete="name"
                        disabled={!selectedPlan}
                        className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none disabled:opacity-40"
                      />
                    </Field>
                    <Field
                      icon={<Building2 className="h-4 w-4" />}
                      label={isEN ? "Company" : "Firma"}
                      hint={isEN ? "optional" : "optional"}
                    >
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder={isEN ? "Acme Inc." : "Acme GmbH"}
                        autoComplete="organization"
                        disabled={!selectedPlan}
                        className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none disabled:opacity-40"
                      />
                    </Field>
                  </div>

                  <Field
                    icon={<Phone className="h-4 w-4" />}
                    label={isEN ? "Phone" : "Telefon"}
                    hint={isEN ? "optional" : "optional"}
                  >
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+49 30 1234567"
                      autoComplete="tel"
                      disabled={!selectedPlan}
                      className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none disabled:opacity-40"
                    />
                  </Field>

                  {/* Provider selector */}
                  <div className="space-y-2.5">
                    <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      <span className="text-white/70"><GitBranch className="h-4 w-4" /></span>
                      {isEN ? "Repository provider" : "Repository-Provider"}{" "}
                      <span className="text-[#FF6B61]">*</span>
                    </span>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {([
                        { id: "github" as Provider, label: "GitHub", hint: "github.com / GHE" },
                        { id: "gitlab" as Provider, label: "GitLab", hint: "gitlab.com / self-hosted" },
                      ]).map((p) => {
                        const active = provider === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setProvider(p.id)}
                            disabled={!selectedPlan}
                            aria-pressed={active}
                            className={[
                              "group flex items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition disabled:cursor-not-allowed disabled:opacity-40",
                              active
                                ? "border-[#FF3B30]/55 bg-[#FF3B30]/10 shadow-[0_0_0_1px_rgba(255,59,48,0.4)]"
                                : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]",
                            ].join(" ")}
                          >
                            <span className="flex items-center gap-3">
                              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] text-white ring-1 ring-white/10">
                                {p.id === "github" ? (
                                  <Github className="h-4 w-4" />
                                ) : (
                                  <GitBranch className="h-4 w-4" />
                                )}
                              </span>
                              <span>
                                <span className="block text-[14px] font-semibold text-white">{p.label}</span>
                                <span className="block text-[11px] text-white/50">{p.hint}</span>
                              </span>
                            </span>
                            <span
                              className={[
                                "inline-flex h-6 w-6 items-center justify-center rounded-full border transition",
                                active
                                  ? "border-[#FF3B30] bg-[#FF3B30] text-white"
                                  : "border-white/15 bg-white/[0.04] text-transparent",
                              ].join(" ")}
                              aria-hidden
                            >
                              <Check className="h-3 w-3" />
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Field
                    icon={<GitBranch className="h-4 w-4" />}
                    label={
                      provider === "gitlab"
                        ? selectedPlan === "pro"
                          ? isEN
                            ? "GitLab repositories (URL or path · max. 4)"
                            : "GitLab Repositories (URL oder Pfad · max. 4)"
                          : isEN
                            ? "GitLab repository (URL or path)"
                            : "GitLab Repository (URL oder Pfad)"
                        : selectedPlan === "pro"
                          ? isEN
                            ? "GitHub repositories (URL or owner/repo · max. 4)"
                            : "GitHub Repositories (URL oder owner/repo · max. 4)"
                          : isEN
                            ? "GitHub repository (URL or owner/repo)"
                            : "GitHub Repository (URL oder owner/repo)"
                    }
                    required
                  >
                    <div className="space-y-2.5">
                      {repoUrls.map((value, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateRepoUrl(idx, e.target.value)}
                            placeholder={
                              provider === "gitlab"
                                ? `https://gitlab.com/acme/service-${idx + 1}`
                                : isEN
                                  ? `https://github.com/acme/service-${idx + 1} or acme/service-${idx + 1}`
                                  : `https://github.com/acme/service-${idx + 1} oder acme/service-${idx + 1}`
                            }
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                            spellCheck={false}
                            disabled={!selectedPlan}
                            className="w-full bg-transparent text-[15px] text-white placeholder:text-white/35 focus:outline-none disabled:opacity-40"
                          />
                          {repoUrls.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRepoField(idx)}
                              disabled={!selectedPlan}
                              aria-label={
                                isEN
                                  ? `Remove repository ${idx + 1}`
                                  : `Repository ${idx + 1} entfernen`
                              }
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/55 transition hover:border-white/25 hover:text-white disabled:opacity-40"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </Field>

                  {selectedPlan === "pro" && (
                    <div className="-mt-2 flex flex-col gap-2 px-1 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[11px] text-white/55">
                        {isEN ? (
                          <>
                            Pro+ allows up to{" "}
                            <span className="font-semibold text-white/85">4 repositories</span> —{" "}
                            <span className="text-white/70">all must belong to the same project / product</span>{" "}
                            (see{" "}
                            <Link href="/terms" className="underline-offset-4 hover:underline">
                              Terms
                            </Link>
                            ).
                          </>
                        ) : (
                          <>
                            Pro+ erlaubt bis zu{" "}
                            <span className="font-semibold text-white/85">4 Repositories</span> —{" "}
                            <span className="text-white/70">alle müssen zum selben Projekt / Produkt gehören</span>{" "}
                            (siehe{" "}
                            <Link href="/terms" className="underline-offset-4 hover:underline">
                              AGB
                            </Link>
                            ).
                          </>
                        )}
                      </p>
                      <button
                        type="button"
                        onClick={addRepoField}
                        disabled={repoUrls.length >= maxRepos}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Plus className="h-3 w-3" />
                        {isEN ? "Add repo" : "Weiteres Repo"} ({repoUrls.length}/{maxRepos})
                      </button>
                    </div>
                  )}

                  {error && (
                    <div className="rounded-2xl border border-[#FF3B30]/30 bg-[#FF3B30]/10 px-4 py-3 text-sm text-[#FF8077]">
                      {error}
                    </div>
                  )}

                  <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-[12.5px] text-white/75 transition hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#FF3B30]"
                      aria-describedby="agb-hint"
                    />
                    <span id="agb-hint" className="leading-relaxed">
                      {isEN ? (
                        <>
                          I have read and accept the{" "}
                          <Link href="/terms#auditai-agb" target="_blank" rel="noopener" className="font-semibold text-white underline-offset-4 hover:underline">
                            Terms & Conditions
                          </Link>{" "}
                          and the{" "}
                          <Link href="/privacy" target="_blank" rel="noopener" className="font-semibold text-white underline-offset-4 hover:underline">
                            Privacy Policy
                          </Link>
                          . <span className="text-[#FF8077]">*</span>
                        </>
                      ) : (
                        <>
                          Ich habe die{" "}
                          <Link href="/terms#auditai-agb" target="_blank" rel="noopener" className="font-semibold text-white underline-offset-4 hover:underline">
                            Allgemeinen Geschäftsbedingungen
                          </Link>{" "}
                          und die{" "}
                          <Link href="/privacy" target="_blank" rel="noopener" className="font-semibold text-white underline-offset-4 hover:underline">
                            Datenschutzerklärung
                          </Link>{" "}
                          gelesen und akzeptiere sie. <span className="text-[#FF8077]">*</span>
                        </>
                      )}
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting || !selectedPlan || !acceptTerms}
                    className="premium-cta inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? (
                      isEN ? (
                        "Redirecting to Stripe…"
                      ) : (
                        "Weiterleitung zu Stripe…"
                      )
                    ) : selectedPlan && selectedPrice ? (
                      <>
                        <CreditCard className="h-4 w-4" />
                        {isEN ? "Book now · " : "Jetzt buchen · "}
                        {selectedPlanData?.name} {selectedPrice.price}
                        {selectedPrice.per}
                      </>
                    ) : isEN ? (
                      "Please choose a plan first"
                    ) : (
                      "Bitte zuerst einen Plan wählen"
                    )}
                    {!submitting && selectedPlan && <ArrowRight className="h-4 w-4" />}
                  </button>

                  <p className="text-center text-[12px] text-white/45">
                    {isEN ? (
                      <>
                        Secure payment via Stripe. SEPA, credit card and Apple/Google Pay. By submitting, you agree to our{" "}
                        <Link href="/privacy" className="underline-offset-4 hover:underline">
                          Privacy Policy
                        </Link>{" "}
                        and the{" "}
                        <Link href="/terms" className="underline-offset-4 hover:underline">
                          Terms
                        </Link>
                        . All prices plus 19 % VAT.{" "}
                        <span className="font-semibold text-white/70">
                          Setup & onboarding included.
                        </span>{" "}
                        {billingInterval === "year" ? (
                          <>Annual plan, cancel by end of term.</>
                        ) : (
                          <>Cancel monthly.</>
                        )}
                      </>
                    ) : (
                      <>
                        Sichere Zahlung über Stripe. SEPA, Kreditkarte und Apple/Google Pay. Mit dem Absenden stimmen Sie unserer{" "}
                        <Link href="/privacy" className="underline-offset-4 hover:underline">
                          Datenschutzerklärung
                        </Link>{" "}
                        und den{" "}
                        <Link href="/terms" className="underline-offset-4 hover:underline">
                          AGB
                        </Link>{" "}
                        zu. Alle Preise zzgl. 19 % MwSt.{" "}
                        <span className="font-semibold text-white/70">
                          Setup & Onboarding inklusive.
                        </span>{" "}
                        {billingInterval === "year" ? (
                          <>Jahresabo, kündbar zum Laufzeitende.</>
                        ) : (
                          <>Monatlich kündbar.</>
                        )}
                      </>
                    )}
                  </p>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES / HOW */}
      <section id="how" className="premium-section relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
              {isEN ? "What you get" : "Was Sie bekommen"}
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-white md:text-5xl">
              <span className="premium-silver">
                {isEN ? "Senior output." : "Senior-Output."}
              </span>{" "}
              <span className="premium-headline-accent">
                {isEN ? "Junior price." : "Junior-Preis."}
              </span>
            </h2>
            <p className="mt-4 text-[15px] text-white/65">
              {isEN
                ? "Not another pattern scanner. Defensive AI with real code reading, curated by OSCP-certified pentesters — reproducible every week."
                : "Nicht noch ein Pattern-Scanner. Defensive KI mit echtem Code-Reading, kuratiert von OSCP-zertifizierten Pentestern - jede Woche reproduzierbar."}
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-white/10 premium-card p-6 transition hover:border-white/20"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-[17px] font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
          <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
            {(isEN
              ? [
                  { v: "24 h", l: "Response time" },
                  { v: "5 min", l: "Setup" },
                  { v: "OWASP", l: "& CWE mapping" },
                  { v: "ISO 27001", l: "audit-grade (Pro+)" },
                ]
              : [
                  { v: "24 h", l: "Antwortzeit" },
                  { v: "5 min", l: "Setup" },
                  { v: "OWASP", l: "& CWE-Mapping" },
                  { v: "ISO 27001", l: "auditfähig (Pro+)" },
                ]
            ).map((s) => (
              <div
                key={s.l}
                className="bg-[#0A0A0B] p-7 text-center transition hover:bg-white/[0.02]"
              >
                <div className="premium-tabular bg-gradient-to-b from-white to-white/55 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                  {s.v}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-white/55">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
            {isEN ? "Plan comparison" : "Plan-Vergleich"}
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-white md:text-5xl">
            {isEN ? "All plans in detail." : "Alle Pläne im Detail."}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-white/60">
            {isEN
              ? "What's in? What's not? See it line by line."
              : "Was steckt drin? Was nicht? Hier sehen Sie es Zeile für Zeile."}
          </p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-[0.18em] text-white/55">
                <th className="px-6 py-5 font-medium">{isEN ? "Feature" : "Feature"}</th>
                {(["starter", "studio", "pro"] as Plan[]).map((pid) => {
                  const plan = PLANS.find((x) => x.id === pid)!;
                  const v = priceFor(plan, billingInterval);
                  const isHighlight = pid === "studio";
                  return (
                    <th key={pid} className="relative px-6 py-5 font-medium text-white">
                      {isHighlight && (
                        <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-[#FF3B30] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_4px_14px_rgba(255,59,48,0.45)]">
                          {isEN ? "Popular" : "Beliebt"}
                        </span>
                      )}
                      {plan.name}
                      <div className="mt-1 text-[13px] font-semibold normal-case tracking-normal text-white/70">
                        {v.price}
                        <span className="text-white/40">{v.per}</span>
                      </div>
                      <div className="text-[10px] font-normal normal-case tracking-normal text-white/40">
                        {VAT_SHORT}
                      </div>
                      {billingInterval === "year" && v.savings && (
                        <div className="mt-0.5 text-[11px] font-semibold normal-case tracking-normal text-emerald-300/90">
                          {v.savings}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="text-white/75">
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.f}
                  className={
                    "border-t border-white/5 " +
                    (i % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]")
                  }
                >
                  <td className="px-6 py-4 text-white/85">{row.f}</td>
                  {([row.s, row.st, row.p] as Array<boolean | string>).map((cell, idx) => (
                    <td
                      key={idx}
                      className={"px-6 py-4 " + (idx === 1 ? "bg-[#FF3B30]/[0.04]" : "")}
                    >
                      {typeof cell === "boolean" ? (
                        cell ? (
                          <Check className="h-5 w-5 text-[#FF6B61]" strokeWidth={2.5} />
                        ) : (
                          <span className="text-white/25">—</span>
                        )
                      ) : (
                        <span className="font-medium text-white">{cell}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t border-white/10 bg-white/[0.02]">
                <td className="px-6 py-5"></td>
                {(["starter", "studio", "pro"] as Plan[]).map((p) => (
                  <td
                    key={p}
                    className={"px-6 py-5 " + (p === "studio" ? "bg-[#FF3B30]/[0.04]" : "")}
                  >
                    <button
                      type="button"
                      onClick={() => handlePlanSelect(p)}
                      className={
                        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-semibold transition " +
                        (p === "studio"
                          ? "premium-cta text-white"
                          : "border border-white/15 bg-white/[0.03] text-white hover:border-white/30 hover:bg-white/[0.06]")
                      }
                    >
                      {isEN
                        ? `Choose ${p === "starter" ? "Starter" : p === "studio" ? "Studio" : "Pro+"}`
                        : `${p === "starter" ? "Starter" : p === "studio" ? "Studio" : "Pro+"} wählen`}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
          {isEN ? "FAQ" : "Häufige Fragen"}
        </span>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.025em] text-white md:text-4xl">
          {isEN ? "Quick answers." : "Schnell beantwortet."}
        </h2>

        <div className="mt-10 space-y-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="premium-card group rounded-2xl border border-white/10 p-6 transition open:ring-1 open:ring-[#FF3B30]/25"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-white">
                <span>{f.q}</span>
                <span className="text-2xl leading-none text-[#FF3B30] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 text-[14px] leading-relaxed text-white/75">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden border-t border-white/5">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-20 text-center lg:py-28">
          <h2 className="text-4xl font-semibold tracking-[-0.025em] md:text-5xl">
            <span className="premium-silver">
              {isEN
                ? "Ready to read your code defensively?"
                : "Bereit, Ihren Code defensiv zu lesen?"}
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] text-white/60">
            {isEN
              ? "Choose a plan, enter your details, onboarding slot within 24 h. No contracts, no credit card."
              : "Plan wählen, Daten eingeben, in 24 h Onboarding-Slot. Keine Verträge, keine Kreditkarte."}
          </p>
          <button
            type="button"
            onClick={scrollToPlans}
            className="premium-cta premium-cta-glow mt-10 inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white"
          >
            {isEN ? "Choose plan" : "Plan wählen"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Mini footer */}
      <footer className="border-t border-white/5 bg-[#08080A]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-7 text-[12px] text-white/45 md:flex-row">
          <span>© {new Date().getFullYear()} Sodu Secure · Made in Germany</span>
          <div className="flex items-center gap-5">
            <Link href="/impressum" className="transition hover:text-white">
              {isEN ? "Imprint" : "Impressum"}
            </Link>
            <Link href="/privacy" className="transition hover:text-white">
              {isEN ? "Privacy" : "Datenschutz"}
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              {isEN ? "Terms" : "AGB"}
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Field({
  icon,
  label,
  hint,
  required,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="group block rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-3.5 transition focus-within:border-[#FF3B30]/40 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_0_4px_rgba(255,59,48,0.08)] hover:border-white/20">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
          <span className="text-white/70">{icon}</span>
          {label}
          {required && <span className="text-[#FF6B61]">*</span>}
        </span>
        {hint && <span className="text-[10px] text-white/40">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function SuccessState({
  planName,
  email,
  lang,
}: {
  planName: string;
  email: string;
  lang: Lang;
}) {
  const isEN = lang === "en";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
        <CircleCheckBig className="h-8 w-8" />
      </div>
      <h2 className="mt-7 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
        <span className="premium-silver">
          {isEN ? "Payment successful. Welcome." : "Zahlung erfolgreich. Willkommen."}
        </span>
      </h2>
      <p className="mt-4 text-[15px] text-white/65">
        {isEN ? (
          <>
            Your{planName ? ` ${planName} ` : " "}plan is active. Stripe has sent a receipt to{" "}
            <span className="font-semibold text-white">{email || "your e-mail"}</span> —
            we'll be in touch within 24 hours with the onboarding steps for your repository.
          </>
        ) : (
          <>
            Ihr{planName ? ` ${planName}-` : " "}Plan ist aktiv. Stripe hat eine Quittung an{" "}
            <span className="font-semibold text-white">{email || "Ihre E-Mail"}</span> geschickt -
            wir melden uns innerhalb von 24 Stunden mit den Onboarding-Schritten für Ihr Repository.
          </>
        )}
      </p>

      <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
        {(isEN
          ? [
              {
                t: "1 · Receipt",
                d: "Stripe receipt in your inbox. Invoice PDF follows with the first billing run.",
              },
              {
                t: "2 · Repo access",
                d: "We send the GitHub/GitLab App link, read-only, setup in 5 minutes.",
              },
              {
                t: "3 · First report",
                d: "PDF in DE & EN, typically within 7 days.",
              },
            ]
          : [
              {
                t: "1 · Quittung",
                d: "Stripe-Beleg in Ihrem Posteingang. Rechnungs-PDF folgt mit dem ersten Abrechnungslauf.",
              },
              {
                t: "2 · Repo-Zugang",
                d: "Wir senden den GitHub-/GitLab-App-Link, Read-only, Setup in 5 Minuten.",
              },
              {
                t: "3 · Erster Bericht",
                d: "PDF in DE & EN, typischerweise innerhalb von 7 Tagen.",
              },
            ]
        ).map((s) => (
          <div key={s.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF6B61]">
              {s.t}
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-white/70">{s.d}</p>
          </div>
        ))}
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.07]"
      >
        {isEN ? "Back to homepage" : "Zurück zur Startseite"}
      </Link>
    </div>
  );
}

function CancelledState({ onRetry, lang }: { onRetry: () => void; lang: Lang }) {
  const isEN = lang === "en";
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/85">
        <XCircle className="h-8 w-8" />
      </div>
      <h2 className="mt-7 text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">
        <span className="premium-silver">
          {isEN ? "Checkout cancelled." : "Checkout abgebrochen."}
        </span>
      </h2>
      <p className="mt-4 text-[15px] text-white/65">
        {isEN ? (
          <>
            No payment made. You can restart the process at any time — or simply send us an e-mail at{" "}
            <a href="mailto:hello@sodusecure.com" className="font-semibold text-white underline-offset-4 hover:underline">
              hello@sodusecure.com
            </a>
            .
          </>
        ) : (
          <>
            Keine Zahlung erfolgt. Sie können den Vorgang jederzeit erneut starten - oder uns einfach eine Mail an{" "}
            <a href="mailto:hello@sodusecure.com" className="font-semibold text-white underline-offset-4 hover:underline">
              hello@sodusecure.com
            </a>{" "}
            schreiben.
          </>
        )}
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="premium-cta inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white"
        >
          {isEN ? "Try again" : "Erneut versuchen"} <ArrowRight className="h-4 w-4" />
        </button>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white/85 transition hover:border-white/30 hover:bg-white/[0.07] hover:text-white"
        >
          {isEN ? "Get in touch" : "Kontakt aufnehmen"}
        </Link>
      </div>
    </div>
  );
}
