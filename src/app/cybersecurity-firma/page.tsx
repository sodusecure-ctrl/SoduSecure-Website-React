"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  Target,
  Zap,
  Users,
  Award,
  Lock,
  AlertTriangle,
  TrendingUp,
  Briefcase,
  Globe,
  FileText,
} from "lucide-react";

const PHONE_HREF = "tel:+491777750985";
const PHONE = "(+49) 01777750985";
const EMAIL_HREF = "mailto:info@sodusecure.com";
const EMAIL = "info@sodusecure.com";

const SERVICES = [
  {
    icon: Target,
    title: "Penetrationstests",
    desc: "Web, Netzwerk, API, Cloud, Active Directory â€“ manuelle Pentests von zertifizierten Experten.",
    slug: "/penetration-testing",
    color: "red",
  },
  {
    icon: AlertTriangle,
    title: "Vulnerability Assessment",
    desc: "Schnelle Schwachstellenanalyse mit automatisierten Tools. Basis fÃ¼r tiefere Assessments.",
    slug: "/vulnerability-assessment-service",
    color: "orange",
  },
  {
    icon: Lock,
    title: "ISO 27001 Beratung & Zertifizierung",
    desc: "Implementierung der internationalen Informationssicherheitsnorm. Audit-ready in 6â€“12 Monaten.",
    slug: "/iso-27001",
    color: "green",
  },
  {
    icon: Globe,
    title: "Red Team Assessment",
    desc: "Realistische Angriffssimulation. Wie weit kommt ein echter Hacker in Ihr Unternehmen?",
    slug: "/red-team-assessment-service",
    color: "purple",
  },
  {
    icon: Users,
    title: "Security Consulting",
    desc: "Strategische Security-Planung. Roadmaps, Risikomanagement, Compliance-Strategien.",
    slug: "/services/security-audit",
    color: "blue",
  },
  {
    icon: Briefcase,
    title: "ISMS & Risk Management",
    desc: "Aufbau von Information Security Management Systemen. Governance & Compliance.",
    slug: "/iso-27001",
    color: "teal",
  },
];

const colorMap: Record<string, string> = {
  red: "bg-[#FF3B30]/10 border-[#FF3B30]/20 text-[#FF3B30]",
  orange: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  green: "bg-green-500/10 border-green-500/20 text-green-400",
  purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  teal: "bg-teal-500/10 border-teal-500/20 text-teal-400",
};

const EXPERTISE = [
  {
    icon: Award,
    title: "Zertifizierte Pentester & Auditor*innen",
    desc: "OSCP, CEH, CISSP â€“ unsere Experten sind offiziell zertifiziert. StÃ¤ndige Weiterbildung.",
  },
  {
    icon: Briefcase,
    title: "10+ Jahre Erfahrung",
    desc: "Seit 2013 unterstÃ¼tzen wir Unternehmen mit praxisnaher Cybersecurity. Start-ups bis DAX-Konzerne.",
  },
  {
    icon: Target,
    title: "Branchenkompetenz",
    desc: "Fintech, Healthcare, E-Commerce, Industrie 4.0 â€“ Wir verstehen Ihre branchenspezifischen Anforderungen.",
  },
  {
    icon: Globe,
    title: "Deutschlandweit tÃ¤tig",
    desc: "Von Berlin bis MÃ¼nchen: On-site Pentests, Audits, Schulungen in Ihrem BÃ¼ro.",
  },
  {
    icon: Zap,
    title: "Schnelle Response",
    desc: "Kostenlose Initialberatung innerhalb 24h. Angebot in 2â€“3 Tagen. Keine langwierigen Prozesse.",
  },
  {
    icon: Lock,
    title: "100% Vertraulichkeit",
    desc: "Umfassendes NDA, DSGVO-konform, sichere Speicherung. Ihre Sicherheit ist unsere Geheimnis.",
  },
];

const EXPERIENCE = [
  {
    industry: "Finanzsektor",
    examples: "Banken, Fintechs, Versicherungen, Payment-Provider",
    challenges: "Regulierung (PCI-DSS, DSGVO), Fraud Prevention, Kryptosicherheit",
  },
  {
    industry: "Healthcare & Pharma",
    examples: "KrankenhÃ¤user, Arztpraxen, Pharmaunternehmen, medizinische GerÃ¤te",
    challenges: "Datenschutz, FDA-Compliance, MedizingerÃ¤te-Sicherheit",
  },
  {
    industry: "E-Commerce & Retail",
    examples: "Online-Shops, Marketplace-Betreiber, POS-Systeme",
    challenges: "PCI-DSS, Kundendatenmanagement, Fraud Prevention",
  },
  {
    industry: "Industrie & Infrastruktur",
    examples: "Maschinenbau, Utilities, Telekommunikation, Transport",
    challenges: "OT-Sicherheit, ICS/SCADA, BSI-Grundschutz, Kritische Infrastrukturen",
  },
  {
    industry: "Ã–ffentliche Verwaltung",
    examples: "BehÃ¶rden, Kommunen, Ã¶ffentliche Dienste",
    challenges: "BSI-Grundschutz, DSGVO, IT-Grundschutzprofil (ITSEC), Audit-KonformitÃ¤t",
  },
  {
    industry: "Tech & SaaS",
    examples: "Softwareunternehmen, Cloud-Anbieter, APIs, Entwickler-Tools",
    challenges: "API-Sicherheit, Secure SDLC, Multi-Tenant-Sicherheit, Compliance Mapping",
  },
];

const CERTIFICATIONS = [
  { name: "OSCP", level: "Pentester", count: "3+" },
  { name: "CEH", level: "Ethical Hacker", count: "5+" },
  { name: "CISSP", level: "Senior Security", count: "2+" },
  { name: "ISO 27001", level: "Lead Auditor", count: "Mehrere" },
  { name: "BSI-GS Auditor", level: "Grundschutz", count: "Mehrere" },
  { name: "GPEN", level: "Pentester", count: "1+" },
];

const WHAT_DIFFERENTIATES = [
  {
    icon: Users,
    title: "Menschen, nicht nur Tools",
    desc: "Unsere Pentester denken wie echte Hacker. Automatisierte Scans ersetzen keine KreativitÃ¤t und Expertise.",
  },
  {
    icon: FileText,
    title: "Audit-Ready Reports",
    desc: "Nicht nur Technologie, sondern auch GeschÃ¤ftskontext. Executive Summary fÃ¼r CxOs, technische Details fÃ¼r IT-Teams.",
  },
  {
    icon: Zap,
    title: "Partnerschaftlicher Ansatz",
    desc: "Wir sind kein externes Audit-Unternehmen, das 'Probleme findet'. Wir helfen Ihnen, sie zu lÃ¶sen.",
  },
  {
    icon: Target,
    title: "Langzeitpartnerschaft",
    desc: "Nicht nur Pentest, dann vorbei. Wir unterstÃ¼tzen Sie Ã¼ber Jahre: Riskmanagement, Compliance, Verbesserungen.",
  },
];

const FAQS = [
  {
    q: "Wie viel kostet ein Cybersecurity Audit?",
    a: "Das hÃ¤ngt vom Scope ab: Schnell-Assessment: â‚¬2.000â€“â‚¬5.000. VollstÃ¤ndiger Pentest: â‚¬5.000â€“â‚¬15.000. ISO 27001 Implementierung: â‚¬10.000â€“â‚¬40.000. Wir bieten Kostenlose Initialberatung.",
  },
  {
    q: "Brauche ich eine Cybersecurity Firma fÃ¼r kleinere Unternehmen?",
    a: "Ja, auch KMU sind gehÃ¤ckt. Sogar kleine Unternehmen mÃ¼ssen DSGVO erfÃ¼llen. Ein grundlegender Pentest (â‚¬3.000) ist sinnvoller als gar nichts.",
  },
  {
    q: "Wie lange dauert ein vollstÃ¤ndiger Security Assessment?",
    a: "Scope-abhÃ¤ngig: Web-App: 3â€“5 Tage. Netzwerk: 5â€“10 Tage. Enterprise: 2â€“4 Wochen. Bericht: 72 Stunden nach Abschluss.",
  },
  {
    q: "KÃ¶nnte meine interne IT das auch machen?",
    a: "Teilweise ja, aber: (1) UnabhÃ¤ngigkeit ist wichtig â€“ interne IT kennt die Infrastruktur. (2) Externe Auditor*innen bevorzugen externe Pentester. (3) Externe haben oft mehr Erfahrung.",
  },
  {
    q: "Wie oft sollten Penetrationstests durchgefÃ¼hrt werden?",
    a: "Mindestens 1x pro Jahr. Nach grÃ¶ÃŸeren SystemÃ¤nderungen, Deployments oder neuen Services: zeitnah retest. ISO 27001 & Compliance verlangt regelmÃ¤ÃŸige Tests.",
  },
  {
    q: "Was ist der Unterschied zwischen uns und anderen Cybersecurity Firmen?",
    a: "Manche sind Berater (wenig Hands-On), manche sind reine Tech-Dienstleister (wenig Strategie). Wir sind beides: Technische Expertise + GeschÃ¤ftsverstÃ¤ndnis + Langzeitpartnerschaft.",
  },
];

export default function CybersecurityFirmaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0A0A0B] text-white min-h-screen">
      {/* Hero */}
      <section className="premium-hero py-20 lg:py-32 border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.08),transparent_50%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#FF3B30] text-sm font-medium">Cybersecurity Firma Â· Pentest Â· ISO 27001 Â· Consulting</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            SODU Secure â€“<br />
            <span className="text-[#FF3B30]">Ihre Cybersecurity Partneragentur</span>
          </h1>
          <p className="text-white/70 text-lg sm:text-xl max-w-3xl mx-auto mb-10">
            Penetrationstests, Vulnerability Assessments, ISO 27001 Zertifizierung, Red Team Assessments â€“ alles von einer erfahrenen, zertifizierten Cybersecurity Firma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/request-pentest" className="inline-flex items-center justify-center gap-2 premium-cta text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              <Phone className="w-5 h-5" />Kostenlose Beratung
            </Link>
            <Link href="/penetration-testing" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-8 py-4 rounded-2xl font-semibold transition-colors text-base">
              Services Ãœbersicht <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Trust bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[["500+", "Erfolgreiche Projekte"], ["10+", "Jahre Erfahrung"], ["100+", "Zufriedene Clients"], ["24h", "Support Response"]].map(([stat, label]) => (
              <div key={stat} className="bg-[#0A0A0B] border border-white/10 rounded-xl py-3 px-2 text-center">
                <div className="text-xl font-bold text-[#FF3B30]">{stat}</div>
                <div className="text-white/50 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Unsere Cybersecurity Services</h2>
            <p className="text-white/60 max-w-2xl mx-auto">VollstÃ¤ndiges Portfolio fÃ¼r Ihre Informationssicherheit.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link href={service.slug} key={service.title} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6 hover:border-white/15 transition-colors group">
                  <div className={`inline-flex p-2.5 rounded-2xl border mb-4 ${colorMap[service.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF3B30] transition-colors">{service.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#FF3B30] text-sm">
                    Mehr erfahren <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Unsere Expertise</h2>
            <p className="text-white/60">Warum wir der richtige Partner sind.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPERTISE.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-5">
                  <div className="w-10 h-10 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#FF3B30]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Branchenerfahrung */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Branchenerfahrung</h2>
            <p className="text-white/60">Wir verstehen Ihre Branche und deren spezifische Anforderungen.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                <h3 className="font-bold text-lg text-[#FF3B30] mb-3">{exp.industry}</h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-white/50">Beispiele:</span>
                    <p className="text-white/70">{exp.examples}</p>
                  </div>
                  <div>
                    <span className="text-white/50">Anforderungen:</span>
                    <p className="text-white/70">{exp.challenges}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zertifizierungen */}
      <section className="py-16 lg:py-20 bg-[#0A0A0B]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Zertifizierungen</h2>
            <p className="text-white/60">Offizielle Qualifikationen unserer Experten.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.name} className="bg-[#0A0A0B] border border-white/10 rounded-xl p-5 text-center">
                <div className="font-bold text-lg text-[#FF3B30] mb-1">{cert.name}</div>
                <div className="text-xs text-white/50 mb-2">{cert.level}</div>
                <div className="text-sm text-white/60">{cert.count} im Team</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Was differentiiert */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Das macht uns unterschiedlich</h2>
            <p className="text-white/60">Warum wir nicht wie andere Cybersecurity Firmen sind.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHAT_DIFFERENTIATES.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4 bg-[#0A0A0B] border border-white/10 rounded-xl p-6">
                  <div className="w-12 h-12 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-[#FF3B30]" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compliance Banner */}
      <section className="py-10 bg-[#1a0a0a]/10 border-y border-[#A02520]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-7 h-7 text-[#FF3B30] mx-auto mb-3" />
          <h3 className="text-lg font-bold mb-2">Compliance ist nicht optional</h3>
          <p className="text-white/60 text-sm max-w-2xl mx-auto">
            DSGVO, NIS2, BSI-Grundschutz, ISO 27001 â€“ Ihre Compliance ist unsere Mission. Mit SODU Secure: Audit-ready in Monaten, nicht Jahren.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-10">HÃ¤ufige Fragen zu unserer Cybersecurity Firma</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-[#0A0A0B] border border-white/10 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
                  <span className="font-medium">{faq.q}</span>
                  {openFaq === i ? <ChevronUp className="w-5 h-5 text-white/60 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-white/60 flex-shrink-0" />}
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/10 pt-4">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-red-900/20 via-[#0A0A0B] to-[#0A0A0B] border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-14 h-14 text-[#FF3B30] mx-auto mb-4" />
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Starten Sie jetzt mit SODU Secure</h2>
          <p className="text-white/60 text-lg mb-8">
            Kostenlose Erstberatung Â· Festpreisangebote Â· Zertifizierte Experten
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={PHONE_HREF} className="inline-flex items-center justify-center gap-2 premium-cta text-white px-10 py-4 rounded-2xl font-semibold transition-colors text-lg">
              <Phone className="w-5 h-5" />{PHONE}
            </a>
            <a href={EMAIL_HREF} className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white px-10 py-4 rounded-2xl font-semibold transition-colors">
              <Mail className="w-5 h-5" />{EMAIL}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            <Link href="/penetration-testing" className="text-[#FF3B30] hover:text-[#FF6B61]">Pentest Info</Link>
            <Link href="/iso-27001" className="text-[#FF3B30] hover:text-[#FF6B61]">ISO 27001</Link>
            <Link href="/pentest-konfigurator" className="text-[#FF3B30] hover:text-[#FF6B61]">Konfigurator</Link>
            <Link href="/request-pentest" className="text-[#FF3B30] hover:text-[#FF6B61]">Beratung buchen</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
