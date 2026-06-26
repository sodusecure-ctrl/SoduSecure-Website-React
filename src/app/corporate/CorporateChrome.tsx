'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, Menu, X, ArrowRight, ShieldCheck, MapPin, Users } from 'lucide-react';
import { ThemeToggleInline } from '@/components/theme/ThemeToggle';

export function CorporateHeader({ isDe }: { isDe: boolean }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { href: '/corporate#leistungen', label: t('Leistungen', 'Services') },
    { href: '/corporate#ablauf', label: t('Ablauf', 'Process') },
    { href: '/corporate#compliance', label: t('Compliance', 'Compliance') },
    { href: '/corporate#referenzen', label: t('Referenzen', 'References') },
  ];

  return (
    <>
      {/* Utility top bar */}
      <div className="hidden bg-[#0B2A4A] text-white md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <div className="flex items-center gap-6 text-white/80">
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> Berlin · DACH</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> {t('Zertifizierte Penetrationstester', 'Certified penetration testers')}</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="tel:+491777750985" className="inline-flex items-center gap-1.5 hover:text-white"><Phone className="h-3.5 w-3.5" /> (+49) 0177 7750985</a>
            <a href="mailto:info@sodusecure.com" className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="h-3.5 w-3.5" /> info@sodusecure.com</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0B2A4A] text-white"><ShieldCheck className="h-5 w-5" /></span>
            <span className="text-lg font-bold tracking-tight text-[#0B2A4A]">SODU<span className="text-[#DC2626]"> SECURE</span></span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-slate-600 transition hover:text-[#0B2A4A]">{n.label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggleInline tone="light" />
            <div className="hidden lg:block">
              <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B91C1C]">
                {t('Angebot anfordern', 'Request a quote')}
              </Link>
            </div>
            <button onClick={() => setMenuOpen((v) => !v)} className="lg:hidden" aria-label="Menu">
              {menuOpen ? <X className="h-6 w-6 text-[#0B2A4A]" /> : <Menu className="h-6 w-6 text-[#0B2A4A]" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="space-y-1 px-6 py-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">{n.label}</a>
              ))}
              <Link href="/request-pentest" className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white">
                {t('Angebot anfordern', 'Request a quote')}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export function CorporateFooter({ isDe }: { isDe: boolean }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  return (
    <footer className="border-t border-slate-200 bg-[#081F38] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10 text-white"><ShieldCheck className="h-5 w-5" /></span>
              <span className="text-lg font-bold tracking-tight">SODU SECURE</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">
              {t('Manuelle Penetrationstests und IT-Sicherheit von zertifizierten Experten aus der DACH-Region.', 'Manual penetration testing and IT security by certified experts from the DACH region.')}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">{t('Leistungen', 'Services')}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/55">
              <li><Link href="/pentest" className="hover:text-white">{t('Penetrationstest', 'Penetration testing')}</Link></li>
              <li><Link href="/vulnerability-assessment" className="hover:text-white">{t('Schwachstellenanalyse', 'Vulnerability assessment')}</Link></li>
              <li><Link href="/phishing-simulation" className="hover:text-white">{t('Phishing-Simulation', 'Phishing simulation')}</Link></li>
              <li><Link href="/red-team-assessment" className="hover:text-white">Red Teaming</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">{t('Checks', 'Checks')}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/55">
              <li><Link href="/corporate/schnellcheck" className="hover:text-white">{t('Schnell-Check', 'Quick check')}</Link></li>
              <li><Link href="/corporate/risiko-check" className="hover:text-white">{t('Risiko-Check', 'Risk check')}</Link></li>
              <li><Link href="/corporate/pentest-check" className="hover:text-white">{t('Pentest-Pflicht-Check', 'Requirement check')}</Link></li>
              <li><Link href="/contact" className="hover:text-white">{t('Kontakt', 'Contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">{t('Kontakt', 'Contact')}</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/55">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (+49) 0177 7750985</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@sodusecure.com</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Berlin, {t('Deutschland', 'Germany')}</li>
              <li className="flex items-center gap-2"><Users className="h-4 w-4" /> {t('Mo–Fr, persönlicher Ansprechpartner', 'Mon–Fri, personal contact')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <span>© {t('Sodu Secure. Alle Rechte vorbehalten.', 'Sodu Secure. All rights reserved.')}</span>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-white">{t('Datenschutz', 'Privacy')}</Link>
            <Link href="/impressum" className="hover:text-white">{t('Impressum', 'Imprint')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function CorporateContactBand({ isDe }: { isDe: boolean }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  return (
    <section id="kontakt" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-2xl bg-[#0B2A4A] px-8 py-14 text-center text-white sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            {t('Sichern Sie Ihr Unternehmen, bevor es ein Angreifer testet.', 'Secure your business before an attacker tests it.')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            {t('Fordern Sie jetzt ein unverbindliches Festpreisangebot an – Antwort innerhalb von 24 Stunden, persönlicher Ansprechpartner garantiert.', 'Request a no-obligation fixed-price quote now – reply within 24 hours, a personal contact guaranteed.')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 rounded-md bg-[#DC2626] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B91C1C]">
              {t('Angebot anfordern', 'Request a quote')} <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+491777750985" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
              <Phone className="h-4 w-4" /> (+49) 0177 7750985
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
