import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { Check, ArrowLeft } from 'lucide-react';
import { GetStartedForm } from '@/components/forms/GetStartedForm';
import { SectionLabelDark } from '@/components/landing/ui';

type Plan = 'starter' | 'studio' | 'pro';

const VALID: Plan[] = ['starter', 'studio', 'pro'];

type PlanCopy = {
  name: string;
  price: string;
  perMonth: string;
  audience: string;
  features: string[];
};

type PageCopy = {
  back: string;
  eyebrow: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  yourPlan: string;
  formHeadline: string;
  formSub: string;
  trust: string[];
  plans: Record<Plan, PlanCopy>;
  formLabels: Parameters<typeof GetStartedForm>[0]['labels'];
};

const de: PageCopy = {
  back: '← Zurück zu den Preisen',
  eyebrow: 'Loslegen',
  heroLine1: 'Ein Schritt.',
  heroLine2: 'Wir melden uns in 24h.',
  heroSub: 'Kein Vertrag, keine Kreditkarte. Nur die nötigsten Informationen, damit wir Ihr Onboarding vorbereiten können.',
  yourPlan: 'Ihr gewählter Plan',
  formHeadline: 'Sagen Sie uns, wer Sie sind.',
  formSub: 'E-Mail genügt. Alles andere hilft uns, schneller zu sein.',
  trust: ['Antwort in 24h', 'Read-only Zugriff', 'DSGVO-konform', 'Jederzeit kündbar'],
  plans: {
    starter: {
      name: 'Starter',
      price: '99 €',
      perMonth: '/Monat',
      audience: 'Kleine Teams · bis 2 Entwickler',
      features: ['1 Repository', 'Bis zu 2 Contributoren', 'Bericht alle 2 Wochen', 'DE & EN Lieferung', 'Fertige Fix-Vorschläge'],
    },
    studio: {
      name: 'Studio',
      price: '199 €',
      perMonth: '/Monat',
      audience: 'Produkt-Teams · 1 Repo, jede Woche',
      features: ['1 Repository', 'Unbegrenzte Contributoren', 'Wöchentlicher Bericht', 'Trend-Historie & Triage', 'Priority-Support'],
    },
    pro: {
      name: 'Pro+',
      price: '449 €',
      perMonth: '/Monat',
      audience: 'Scale-ups · mehrere Repos + Pentest',
      features: ['Mehrere Repositories', 'Unbegrenzte Contributoren', 'Wöchentlicher Bericht', 'Quartalsweise Voll-Pentest (1 Repo)', 'Dedizierter Ansprechpartner'],
    },
  },
  formLabels: {
    emailLabel: 'E-Mail',
    emailPlaceholder: 'sie@firma.de',
    nameLabel: 'Vor- und Nachname',
    namePlaceholder: 'Max Mustermann',
    companyLabel: 'Firma',
    companyPlaceholder: 'Acme GmbH',
    githubLabel: 'GitHub-Organisation',
    githubPlaceholder: 'acme-corp',
    phoneLabel: 'Telefon',
    phonePlaceholder: '+49 30 1234567',
    submit: 'Anfrage abschicken',
    submitting: 'Wird gesendet…',
    successTitle: 'Danke - wir melden uns.',
    successBody: 'Sie erhalten in den nächsten Minuten eine Bestätigung per E-Mail. Innerhalb von 24 Stunden hören Sie persönlich von uns.',
    errorGeneric: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
    errorEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errorIdentity: 'Bitte geben Sie Ihren Namen oder Ihre Firma an.',
    optional: 'optional',
    legal: 'Mit dem Absenden stimmen Sie unserer Datenschutzerklärung zu.',
  },
};

const en: PageCopy = {
  back: '← Back to pricing',
  eyebrow: 'Get started',
  heroLine1: 'One step.',
  heroLine2: 'We reply in 24h.',
  heroSub: 'No contract, no credit card. Just the basics so we can prepare your onboarding.',
  yourPlan: 'Your selected plan',
  formHeadline: 'Tell us who you are.',
  formSub: 'Email is enough. Everything else helps us be faster.',
  trust: ['24h reply', 'Read-only access', 'GDPR-aware', 'Cancel anytime'],
  plans: {
    starter: {
      name: 'Starter',
      price: '€99',
      perMonth: '/mo',
      audience: 'Small teams · up to 2 developers',
      features: ['1 repository', 'Up to 2 contributors', 'Report every 2 weeks', 'EN + DE deliverable', 'Paste-ready fix proposals'],
    },
    studio: {
      name: 'Studio',
      price: '€199',
      perMonth: '/mo',
      audience: 'Product teams · 1 repo, weekly',
      features: ['1 repository', 'Unlimited contributors', 'Weekly report', 'Trend history & triage', 'Priority support'],
    },
    pro: {
      name: 'Pro+',
      price: '€449',
      perMonth: '/mo',
      audience: 'Scale-ups · multi-repo + pentest',
      features: ['Multiple repositories', 'Unlimited contributors', 'Weekly report', 'Quarterly full pentest (1 repo)', 'Dedicated point of contact'],
    },
  },
  formLabels: {
    emailLabel: 'Email',
    emailPlaceholder: 'you@company.com',
    nameLabel: 'First and last name',
    namePlaceholder: 'Jane Doe',
    companyLabel: 'Company',
    companyPlaceholder: 'Acme Inc.',
    githubLabel: 'GitHub organisation',
    githubPlaceholder: 'acme-corp',
    phoneLabel: 'Phone',
    phonePlaceholder: '+1 555 123 4567',
    submit: 'Send request',
    submitting: 'Sending…',
    successTitle: 'Thanks - we will be in touch.',
    successBody: 'You will receive a confirmation email in the next minutes. We will personally follow up within 24 hours.',
    errorGeneric: 'Something went wrong. Please try again.',
    errorEmail: 'Please enter a valid email address.',
    errorIdentity: 'Please share your name or company.',
    optional: 'optional',
    legal: 'By submitting you agree to our privacy policy.',
  },
};

export async function generateStaticParams() {
  return VALID.map((plan) => ({ plan }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plan: string }>;
}): Promise<Metadata> {
  const { plan } = await params;
  if (!VALID.includes(plan as Plan)) return { title: 'Get started · Sodu Secure' };
  const locale = await getLocale();
  const c = locale === 'en' ? en : de;
  const p = c.plans[plan as Plan];
  return {
    title: `${p.name} · ${locale === 'en' ? 'Get started' : 'Loslegen'} - Sodu /AuditAI`,
    description: c.heroSub,
  };
}

export default async function GetStartedPage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan } = await params;
  if (!VALID.includes(plan as Plan)) notFound();
  const typedPlan = plan as Plan;

  const locale = await getLocale();
  const c = locale === 'en' ? en : de;
  const p = c.plans[typedPlan];

  return (
    <main className="bg-transparent text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-14 lg:pt-24 lg:pb-20">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 text-xs font-medium text-white/60 transition hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> {c.back}
          </Link>
          <div className="mt-8">
            <SectionLabelDark>{c.eyebrow} · {p.name}</SectionLabelDark>
          </div>
          <h1 className="mt-6 max-w-4xl text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl lg:text-[72px]">
            <span className="premium-silver">{c.heroLine1}</span>
            <br />
            <span className="premium-headline-accent">{c.heroLine2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-white/70">{c.heroSub}</p>

          <div className="mt-10 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {c.trust.map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* PLAN SUMMARY */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 premium-card p-8 shadow-[0_30px_80px_-30px_rgba(255,59,48,0.30)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{ backgroundImage: 'radial-gradient(70% 50% at 100% 0%, rgba(255,59,48,0.14), transparent 60%)' }}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
                  {c.yourPlan}
                </div>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="premium-tabular text-5xl font-extrabold tracking-tight text-white">{p.price}</span>
                  <span className="text-sm text-white/50">{p.perMonth}</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#FF3B30]/30 bg-[#FF3B30]/10 px-3 py-1 text-xs font-semibold tracking-tight text-[#FF6B61]">
                  {p.name}
                </div>
                <p className="mt-3 text-sm text-white/65">{p.audience}</p>

                <div className="my-6 h-px bg-white/10" />

                <ul className="space-y-3 text-sm text-white/85">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {(['starter', 'studio', 'pro'] as Plan[]).map((alt) => {
                const active = alt === typedPlan;
                return (
                  <Link
                    key={alt}
                    href={`/get-started/${alt}`}
                    className={
                      'rounded-xl border px-3 py-2.5 text-xs font-semibold transition ' +
                      (active
                        ? 'border-[#FF3B30]/40 bg-[#FF3B30]/15 text-white shadow-[0_0_24px_-6px_rgba(255,59,48,0.5)]'
                        : 'border-white/10 bg-white/[0.03] text-white/70 hover:border-white/25 hover:bg-white/[0.06] hover:text-white')
                    }
                  >
                    {c.plans[alt].name}
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* FORM */}
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl">{c.formHeadline}</h2>
            <p className="mt-3 text-[#525866]">{c.formSub}</p>

            <div className="mt-8">
              <GetStartedForm plan={typedPlan} labels={c.formLabels} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
