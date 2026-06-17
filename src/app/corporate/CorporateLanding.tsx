'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Phone, Mail, Menu, X, ArrowRight, CheckCircle2, ShieldCheck,
  Globe, Server, Network, Cloud, KeyRound, Fish, Bug,
  ClipboardList, Search, FileText, RefreshCw, Award, Lock,
  Building2, Scale, Clock, Users, ChevronRight, Star, MapPin,
} from 'lucide-react';
import { getTestimonials } from '@/components/landing/TestimonialsMarquee';

export default function CorporateLanding({ isDe }: { isDe: boolean }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  const [menuOpen, setMenuOpen] = useState(false);

  const nav = [
    { href: '#leistungen', label: t('Leistungen', 'Services') },
    { href: '#ablauf', label: t('Ablauf', 'Process') },
    { href: '#compliance', label: t('Compliance', 'Compliance') },
    { href: '#referenzen', label: t('Referenzen', 'References') },
    { href: '#kontakt', label: t('Kontakt', 'Contact') },
  ];

  const certs = ['OSCP', 'OSWE', 'CEH', 'ISO 27001', 'BSI IT-Grundschutz', 'DSGVO'];

  const services = [
    { icon: <Globe className="h-6 w-6" />, title: t('Web-Applikationen', 'Web applications'), text: t('Manuelle Prüfung Ihrer Web-Anwendungen nach OWASP Top 10, inkl. Authentifizierung, Session- und Business-Logik.', 'Manual testing of your web applications per OWASP Top 10, incl. authentication, session and business logic.') },
    { icon: <Server className="h-6 w-6" />, title: t('API-Schnittstellen', 'API interfaces'), text: t('Sicherheitsanalyse Ihrer REST-/GraphQL-Schnittstellen: Autorisierung, Datenvalidierung und Rate-Limiting.', 'Security analysis of your REST/GraphQL interfaces: authorisation, input validation and rate limiting.') },
    { icon: <Network className="h-6 w-6" />, title: t('Netzwerk & Infrastruktur', 'Network & infrastructure'), text: t('Interne und externe Infrastrukturtests inkl. Lateral Movement, Privilege Escalation und Segmentierung.', 'Internal and external infrastructure tests incl. lateral movement, privilege escalation and segmentation.') },
    { icon: <KeyRound className="h-6 w-6" />, title: 'Active Directory', text: t('Tiefenanalyse Ihrer AD-Umgebung: Kerberos-Angriffe, ACL-Missbrauch und Trust-Beziehungen.', 'In-depth analysis of your AD environment: Kerberos attacks, ACL abuse and trust relationships.') },
    { icon: <Cloud className="h-6 w-6" />, title: t('Cloud & DevOps', 'Cloud & DevOps'), text: t('Prüfung Ihrer Cloud-Konfiguration (AWS, Azure, GCP) und CI/CD-Pipelines auf Fehlkonfigurationen.', 'Review of your cloud configuration (AWS, Azure, GCP) and CI/CD pipelines for misconfigurations.') },
    { icon: <Fish className="h-6 w-6" />, title: t('Phishing & Awareness', 'Phishing & awareness'), text: t('Realistische Phishing-Simulationen und Mitarbeiterschulungen zur Stärkung Ihrer ersten Verteidigungslinie.', 'Realistic phishing simulations and staff training to strengthen your first line of defence.') },
  ];

  const benefits = [
    { title: t('Zertifizierte Experten', 'Certified experts'), text: t('Alle Tests werden manuell von OSCP-, OSWE- und CEH-zertifizierten Penetrationstestern durchgeführt.', 'All tests are performed manually by OSCP-, OSWE- and CEH-certified penetration testers.') },
    { title: t('Transparenter Festpreis', 'Transparent fixed price'), text: t('Kein Stundenrisiko: Sie erhalten ein verbindliches Angebot mit klarem Leistungsumfang innerhalb von 24 Stunden.', 'No hourly risk: you receive a binding quote with a clear scope within 24 hours.') },
    { title: t('Rechts- & Auditsicherheit', 'Legal & audit certainty'), text: t('Unsere Berichte erfüllen die Nachweispflichten für ISO 27001, NIS2, DORA, TISAX und Ihre Cyber-Versicherung.', 'Our reports satisfy the evidence requirements for ISO 27001, NIS2, DORA, TISAX and your cyber insurance.') },
    { title: t('Kostenloser Retest', 'Free retest'), text: t('Nach der Behebung verifizieren wir jede Schwachstelle persönlich erneut – ohne Zusatzkosten.', 'After remediation we personally re-verify every finding – at no extra cost.') },
    { title: t('DSGVO-konform aus der DACH-Region', 'GDPR-compliant from the DACH region'), text: t('Deutsches Team, deutsche Verträge, deutsche Datenhaltung. Ihre Daten bleiben unter Ihrer Kontrolle.', 'German team, German contracts, German data residency. Your data stays under your control.') },
    { title: t('Verständliche Berichte', 'Reports you can act on'), text: t('Priorisierter Maßnahmenkatalog auf Deutsch und Englisch – für Management und Entwicklung gleichermaßen nutzbar.', 'Prioritised remediation catalog in German and English – usable by management and engineering alike.') },
  ];

  const steps = [
    { icon: <ClipboardList className="h-6 w-6" />, n: '01', title: t('Scoping & Angebot', 'Scoping & quote'), text: t('Wir definieren gemeinsam den Prüfumfang und erstellen ein verbindliches Festpreisangebot binnen 24 Stunden.', 'We define the scope together and provide a binding fixed-price quote within 24 hours.') },
    { icon: <Search className="h-6 w-6" />, n: '02', title: t('Durchführung', 'Execution'), text: t('Unsere zertifizierten Tester prüfen Ihre Systeme kontrolliert und manuell nach anerkannten Standards.', 'Our certified testers assess your systems in a controlled, manual way per recognised standards.') },
    { icon: <FileText className="h-6 w-6" />, n: '03', title: t('Bericht & Präsentation', 'Report & presentation'), text: t('Sie erhalten einen priorisierten Maßnahmenkatalog und eine persönliche Abschlusspräsentation.', 'You receive a prioritised remediation catalog and a personal closing presentation.') },
    { icon: <RefreshCw className="h-6 w-6" />, n: '04', title: t('Retest', 'Retest'), text: t('Nach der Behebung verifizieren wir die Wirksamkeit der Maßnahmen – kostenfrei inklusive.', 'After remediation we verify the effectiveness of the measures – included free of charge.') },
  ];

  const stats = [
    { value: '150+', label: t('durchgeführte Pentests', 'pentests delivered') },
    { value: '24 h', label: t('bis zum Angebot', 'to your quote') },
    { value: '100 %', label: t('manuell verifiziert', 'manually verified') },
    { value: 'DACH', label: t('Team & Datenhaltung', 'team & data residency') },
  ];

  const compliance = [
    { icon: <ShieldCheck className="h-6 w-6" />, title: 'ISO 27001', text: t('Nachweis der Sicherheitstests für Ihr ISMS und die Zertifizierung.', 'Evidence of security testing for your ISMS and certification.') },
    { icon: <Scale className="h-6 w-6" />, title: 'NIS2', text: t('Bewertung der Wirksamkeit Ihrer Sicherheitsmaßnahmen gemäß Art. 21.', 'Assessment of the effectiveness of your security measures per Art. 21.') },
    { icon: <Building2 className="h-6 w-6" />, title: 'DORA', text: t('Resilienz-Tests und Penetrationstests für den Finanzsektor.', 'Resilience and penetration testing for the financial sector.') },
    { icon: <Lock className="h-6 w-6" />, title: 'DSGVO', text: t('Regelmäßige Überprüfung der Schutzmaßnahmen nach Art. 32.', 'Regular review of safeguards per Art. 32.') },
  ];

  const testimonials = getTestimonials(isDe).slice(0, 3);

  const PrimaryBtn = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-md bg-[#DC2626] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#B91C1C] ${className}`}>
      {children}
    </Link>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B] antialiased">
      {/* ── Utility top bar ── */}
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

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/corporate" className="flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[#0B2A4A] text-white"><ShieldCheck className="h-5 w-5" /></span>
            <span className="text-lg font-bold tracking-tight text-[#0B2A4A]">SODU<span className="text-[#DC2626]"> SECURE</span></span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-slate-600 transition hover:text-[#0B2A4A]">{n.label}</a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <PrimaryBtn href="/request-pentest">{t('Angebot anfordern', 'Request a quote')}</PrimaryBtn>
          </div>
          <button onClick={() => setMenuOpen((v) => !v)} className="lg:hidden" aria-label="Menu">
            {menuOpen ? <X className="h-6 w-6 text-[#0B2A4A]" /> : <Menu className="h-6 w-6 text-[#0B2A4A]" />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <div className="space-y-1 px-6 py-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">{n.label}</a>
              ))}
              <PrimaryBtn href="/request-pentest" className="mt-2 w-full">{t('Angebot anfordern', 'Request a quote')}</PrimaryBtn>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#DC2626]">
              <ShieldCheck className="h-3.5 w-3.5" /> {t('Penetrationstests & IT-Sicherheit', 'Penetration testing & IT security')}
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-[#0B2A4A] sm:text-5xl">
              {t('Professionelle Penetrationstests für Ihr Unternehmen', 'Professional penetration testing for your business')}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              {t('Wir decken Schwachstellen in Ihren Systemen auf, bevor Angreifer sie ausnutzen – manuell, zertifiziert und nachweissicher für Ihre Compliance. Verbindliches Festpreisangebot innerhalb von 24 Stunden.',
                 'We uncover vulnerabilities in your systems before attackers exploit them – manual, certified and audit-proof for your compliance. Binding fixed-price quote within 24 hours.')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PrimaryBtn href="/request-pentest">{t('Kostenloses Angebot anfordern', 'Request a free quote')} <ArrowRight className="h-4 w-4" /></PrimaryBtn>
              <a href="tel:+491777750985" className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-[#0B2A4A] transition hover:border-slate-400 hover:bg-slate-50">
                <Phone className="h-4 w-4" /> {t('Rückruf vereinbaren', 'Request a callback')}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#16A34A]" /> {t('OSCP-zertifiziert', 'OSCP certified')}</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#16A34A]" /> {t('DSGVO-konform', 'GDPR-compliant')}</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#16A34A]" /> {t('Festpreis & Retest inklusive', 'Fixed price & retest included')}</span>
            </div>
          </div>

          {/* Hero card */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(11,42,74,0.35)]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-sm font-semibold text-[#0B2A4A]">{t('Warum Sodu Secure?', 'Why Sodu Secure?')}</span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#16A34A]/10 px-2.5 py-1 text-xs font-semibold text-[#16A34A]"><ShieldCheck className="h-3.5 w-3.5" /> {t('Geprüft', 'Vetted')}</span>
              </div>
              <ul className="mt-5 space-y-4">
                {[
                  { icon: <Award className="h-5 w-5" />, k: t('Zertifizierte Tester', 'Certified testers'), v: 'OSCP · OSWE · CEH' },
                  { icon: <Clock className="h-5 w-5" />, k: t('Angebot', 'Quote'), v: t('innerhalb von 24 Stunden', 'within 24 hours') },
                  { icon: <Bug className="h-5 w-5" />, k: t('Vorgehen', 'Approach'), v: t('100 % manuell verifiziert', '100% manually verified') },
                  { icon: <FileText className="h-5 w-5" />, k: t('Ergebnis', 'Deliverable'), v: t('prüfsicherer Bericht (DE/EN)', 'audit-proof report (DE/EN)') },
                ].map((row) => (
                  <li key={row.k} className="flex items-center gap-4">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#DC2626]/10 text-[#DC2626]">{row.icon}</span>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-slate-400">{row.k}</div>
                      <div className="text-sm font-semibold text-[#0B2A4A]">{row.v}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications strip ── */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
            {t('Zertifizierungen & Standards, nach denen wir prüfen', 'Certifications & standards we test against')}
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {certs.map((c) => (
              <span key={c} className="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-[#0B2A4A]">{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section id="leistungen" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#DC2626]">{t('Leistungen', 'Services')}</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B2A4A] md:text-4xl">{t('Unsere Penetrationstests im Überblick', 'Our penetration testing services')}</h2>
            <p className="mt-4 text-slate-600">{t('Von der Web-Anwendung bis zur gesamten Infrastruktur – wir prüfen genau die Systeme, die für Ihr Unternehmen geschäftskritisch sind.', 'From web applications to your entire infrastructure – we test exactly the systems that are business-critical for you.')}</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((sv) => (
              <article key={sv.title} className="group rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#DC2626]/40 hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#DC2626]/10 text-[#DC2626] transition group-hover:bg-[#DC2626] group-hover:text-white">{sv.icon}</div>
                <h3 className="mt-5 text-lg font-bold text-[#0B2A4A]">{sv.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{sv.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-[#DC2626]">{t('Ihre Vorteile', 'Your benefits')}</span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B2A4A] md:text-4xl">{t('Warum Unternehmen auf uns vertrauen', 'Why companies trust us')}</h2>
              <p className="mt-4 text-slate-600">{t('Wir liefern nicht nur eine PDF, sondern belastbare Sicherheit und die Nachweise, die Ihr Management, Ihre Auditoren und Ihre Kunden erwarten.', 'We deliver more than a PDF: robust security and the evidence your management, auditors and customers expect.')}</p>
              <div className="mt-8">
                <PrimaryBtn href="/request-pentest">{t('Jetzt Angebot anfordern', 'Request a quote now')} <ArrowRight className="h-4 w-4" /></PrimaryBtn>
              </div>
            </div>
            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex gap-4">
                  <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-[#16A34A]" />
                  <div>
                    <h3 className="font-bold text-[#0B2A4A]">{b.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{b.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section id="ablauf" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#DC2626]">{t('Ablauf', 'Process')}</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B2A4A] md:text-4xl">{t('In vier Schritten zu mehr Sicherheit', 'Four steps to more security')}</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((st) => (
              <div key={st.n} className="relative rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B2A4A] text-white">{st.icon}</span>
                  <span className="text-3xl font-extrabold text-slate-200">{st.n}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#0B2A4A]">{st.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{st.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats band ── */}
      <section className="bg-[#0B2A4A] py-16 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl font-extrabold tracking-tight md:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Compliance ── */}
      <section id="compliance" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#DC2626]">{t('Compliance', 'Compliance')}</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B2A4A] md:text-4xl">{t('Erfüllen Sie Ihre regulatorischen Pflichten', 'Meet your regulatory obligations')}</h2>
            <p className="mt-4 text-slate-600">{t('Ob ISO 27001, NIS2, DORA oder DSGVO – unsere Berichte liefern den prüfsicheren Nachweis für Auditoren, Behörden, Kunden und Versicherer.', 'Whether ISO 27001, NIS2, DORA or GDPR – our reports provide audit-proof evidence for auditors, authorities, customers and insurers.')}</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {compliance.map((cp) => (
              <div key={cp.title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#DC2626] shadow-sm">{cp.icon}</div>
                <h3 className="mt-4 text-lg font-bold text-[#0B2A4A]">{cp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{cp.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">
            {t('Unsicher, welche Pflichten für Sie gelten? ', 'Unsure which obligations apply to you? ')}
            <Link href="/brauche-ich-pentest" className="font-semibold text-[#DC2626] hover:underline">
              {t('Machen Sie den kostenlosen Pflicht-Check', 'Take the free requirement check')} <ChevronRight className="inline h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
      </section>

      {/* ── References / Testimonials ── */}
      <section id="referenzen" className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-[#DC2626]">{t('Referenzen', 'References')}</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0B2A4A] md:text-4xl">{t('Was unsere Kunden sagen', 'What our clients say')}</h2>
            <p className="mt-4 text-slate-600">{t('Teams aus der DACH-Region vertrauen auf Sodu Secure, um kritische Schwachstellen zu finden, bevor Angreifer es tun.', 'Teams across the DACH region rely on Sodu Secure to find critical vulnerabilities before attackers do.')}</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((tm) => (
              <figure key={tm.author} className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B]" />)}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">&ldquo;{tm.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4">
                  <div className="text-sm font-bold text-[#0B2A4A]">{tm.author}</div>
                  <div className="text-xs text-slate-500">{tm.role} · {tm.company}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ── */}
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

      {/* ── Footer ── */}
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
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white/80">{t('Unternehmen', 'Company')}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                <li><Link href="/about" className="hover:text-white">{t('Über uns', 'About us')}</Link></li>
                <li><Link href="/case-studies" className="hover:text-white">{t('Referenzen', 'Case studies')}</Link></li>
                <li><Link href="/careers" className="hover:text-white">{t('Karriere', 'Careers')}</Link></li>
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
              <Link href="/imprint" className="hover:text-white">{t('Impressum', 'Imprint')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
