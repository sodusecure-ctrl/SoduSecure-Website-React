"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield,
  Calculator,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Star,
  Phone,
  Mail,
  BookOpen,
  ExternalLink,
  Clock,
  Award,
  Target,
  Zap,
  AlertTriangle,
  Eye,
  Lock,
  Activity,
} from "lucide-react";

const PHONE = "(+49) 01777750985";
const PHONE_HREF = "tel:+491777750985";
const EMAIL = "info@sodusecure.com";
const EMAIL_HREF = "mailto:info@sodusecure.com";

const ANGRIFFSVEKTOREN = [
  { icon: Eye, title: "Phishing & Social Engineering", desc: "Realistische Phishing-Kampagnen – vom spear-phishing bis zur CEO-Fraud-Simulation. Schult Awareness und testet technische Schutzmechanismen.", color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" },
  { icon: Target, title: "Web Application Attacks", desc: "SQLi, XSS, SSRF, Auth-Bypasses – echte Angriffstechniken wie ein echter Hacker sie einsetzen würde.", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
  { icon: Activity, title: "Active Directory Exploitation", desc: "Kerberoasting, DCSync, Pass-the-Hash, Golden Ticket – Angriffe die in 85 % aller Ransomware-Vorfälle verwendet werden.", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { icon: Lock, title: "Lateral Movement & Privilege Escalation", desc: "Simulation wie Angreifer sich nach dem Erstzugang durch das Netzwerk bewegen und Rechte eskalieren.", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
  { icon: AlertTriangle, title: "Cloud-Angriffe (AWS/Azure/GCP)", desc: "IAM-Privilege-Eskalation, Metadata-Angriffe, Storage-Zugriffe, Secrets aus Environment Variables.", color: "text-cyan-400", bg: "bg-cyan-500/10 border-cyan-500/20" },
  { icon: Zap, title: "API & Mobile Exploitation", desc: "OWASP API Top 10, JWT-Manipulation, Business Logic Bypasses, Race Conditions.", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" },
];

const UNTERSCHIED = [
  { aspect: "Ziel", simulation: "Echte Angriffswege beweisen (Proof-of-Concept)", scan: "Liste potenzieller Schwachstellen" },
  { aspect: "Methode", simulation: "Manuelle Exploitation durch zertifizierte Pentester", scan: "Automatisierter Scanner-Lauf" },
  { aspect: "Ergebnis", simulation: "Vollständige Angriffsketten mit PoC", scan: "CVE-Liste mit CVSS-Score" },
  { aspect: "Wert für NIS2", simulation: "Vollständiger Nachweis (Art. 21)", scan: "Eingeschränkt (nicht ausreichend)" },
  { aspect: "Preis (SODU)", simulation: "ab 2.500 € Festpreis", scan: "650 € – 1.500 €" },
];

const FAQS = [
  { q: "Was ist eine Hacker Simulation?", a: "Bei einer Hacker Simulation (auch Penetrationstest oder Ethical Hacking) greifen autorisierte Sicherheitsexperten Ihr Unternehmen mit denselben Methoden an wie echte Hacker. Das Ziel: Schwachstellen finden und beheben, bevor echte Angreifer sie ausnutzen." },
  { q: "Ist eine Hacker Simulation legal?", a: "Ja – autorisiertes Ethical Hacking ist vollständig legal. SODU Secure führt alle Tests ausschließlich mit schriftlicher Genehmigung des Systeminhabers und in klar definiertem Scope durch. Wir stellen alle rechtlichen Dokumente (NDA, ROE, Scope-Agreement) bereit." },
  { q: "Was kostet eine Hacker Simulation?", a: "Eine professionelle Hacker Simulation kostet bei SODU Secure ab 2.500 € als Festpreis. Der genaue Preis hängt vom Umfang ab (ein System vs. gesamtes Unternehmen). Über den Konfigurator erhalten Sie sofort ein Festpreisangebot – kein Tagessatz." },
  { q: "Wie unterscheidet sich Hacker Simulation von einem Pentest?", a: "Hacker Simulation und Penetrationstest sind weitgehend synonym. Eine Hacker Simulation betont die Realitätsnähe – echte Angriffstechniken, echte Tools (Metasploit, BloodHound, Burp Suite), echte Proof-of-Concepts. SODU Secure kombiniert klassischen OWASP-basierten Pentest mit simulierten Angriffen." },
  { q: "Wie lange dauert eine Hacker Simulation?", a: "Eine fokussierte Hacker Simulation (z.B. nur Web-App) dauert 2–3 Tage. Eine vollständige Unternehmens-Simulation (Web + Netzwerk + AD + Phishing) 1–2 Wochen. Der Bericht wird 48 Stunden nach Testende geliefert." },
  { q: "Was passiert wenn die Hacker Simulation kritische Lücken findet?", a: "Bei kritischen Findings kommunizieren wir sofort – noch während des Tests, bevor der Abschlussbericht fertig ist. Sie erhalten Sofortmaßnahmen und können direkt reagieren. Anschließend folgen detaillierter Bericht und kostenloser Retest." },
];

export default function HackerSimulationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#0a0a0f] text-white min-h-screen">
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">SODU Secure</Link>
            <span>/</span>
            <span className="text-gray-300">Hacker Simulation</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
            <Target className="w-3.5 h-3.5" />
            <span>Hacker Simulation · Ethical Hacking · OSCP-zertifiziert · Festpreis</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Hacker Simulation –</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Angriff simulieren. Lücken schließen.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            SODU Secure simuliert realistische Hackerangriffe auf Ihr Unternehmen –
            autorisiert, OSCP-zertifiziert, mit echten Angriffstechniken.
            Finden Sie Sicherheitslücken, bevor echte Hacker es tun.
          </p>
          <p className="text-sm text-red-400 mb-10 font-medium">
            ⚡ Festpreisangebot per Konfigurator – Angebot in 24 h, Ergebnis in 2–10 Tagen
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/request-pentest"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 hover:scale-105">
              <Calculator className="w-5 h-5" />Hacker Simulation konfigurieren
            </Link>
            <a href={PHONE_HREF}
              className="inline-flex items-center gap-2 border border-red-500/30 hover:border-red-500/60 text-red-400 hover:text-red-300 font-semibold px-8 py-4 rounded-xl transition-all duration-200">
              <Phone className="w-4 h-4" />{PHONE}
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            {["100 % autorisiert & legal", "OSCP-zertifizierte Hacker", "Festpreis – keine Tagessätze", "Sofort-Kommunikation kritischer Findings"].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /><span>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WAS WIRD SIMULIERT ────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Was wird simuliert?</h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              SODU Secure simuliert die Angriffstechniken, die echte Hacker und
              Ransomware-Gruppen tatsächlich einsetzen.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ANGRIFFSVEKTOREN.map((v) => (
              <div key={v.title} className={`bg-white/[0.03] border rounded-2xl p-6 ${v.bg}`}>
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-3 ${v.bg}`}>
                  <v.icon className={`w-5 h-5 ${v.color}`} />
                </div>
                <h3 className="font-semibold text-white mb-2 text-sm">{v.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VERGLEICH ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Hacker Simulation vs.{" "}
            <span className="text-red-400">automatisierter Scan</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Warum ein manueller simulierter Hackerangriff wertvoller ist als ein Vulnerability-Scan.
          </p>
        </div>
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-3 bg-white/[0.03] border-b border-white/10">
            <span>Kriterium</span>
            <span className="text-red-400">Hacker Simulation</span>
            <span>Auto. Scan</span>
          </div>
          {UNTERSCHIED.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 px-6 py-4 text-sm border-b border-white/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
              <span className="text-gray-400 text-xs">{row.aspect}</span>
              <span className="text-gray-200 text-xs">{row.simulation}</span>
              <span className="text-gray-500 text-xs">{row.scan}</span>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Hacker Simulation konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── WARUM SODU ────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Warum SODU Secure für Ihre Hacker Simulation?
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Award, title: "OSCP-zertifizierte Pentester", desc: "Nachgewiesene Exploitation-Kompetenz – kein Tool-Reselling." },
                  { icon: Zap, title: "Schnellste Abwicklung Deutschlands", desc: "Angebot in 24 h, Test startet innerhalb einer Woche, Bericht in 48 h nach Testende." },
                  { icon: Calculator, title: "Sofortiger Festpreis per Konfigurator", desc: "Kein Anruf, kein Vertrieb – Preis online in 2 Minuten berechnen." },
                  { icon: Shield, title: "Sofortige Kommunikation bei kritischen Lücken", desc: "Kein Warten auf den Abschlussbericht – kritische Findings sofort gemeldet." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-red-500/10 border border-red-500/20 rounded-lg flex-shrink-0">
                      <item.icon className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.03] border border-red-500/20 rounded-2xl p-8 text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">85 %</div>
              <p className="text-sm text-gray-300 mb-4">aller erfolgreichen Ransomware-Angriffe nutzen Active Directory-Schwachstellen</p>
              <div className="text-4xl font-bold text-orange-400 mb-2">72 h</div>
              <p className="text-sm text-gray-300 mb-4">mittlere Zeit bis ein Angreifer im Netzwerk unentdeckt bleibt</p>
              <div className="text-4xl font-bold text-green-400 mb-2">2.500 €</div>
              <p className="text-sm text-gray-300">Festpreis für Hacker Simulation bei SODU Secure</p>
              <Link href="/request-pentest"
                className="mt-6 inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 hover:scale-105 w-full justify-center">
                <Calculator className="w-4 h-4" />Jetzt konfigurieren
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PILOT ─────────────────────────────────────────────────────────────── */}
      <section className="py-12 bg-gradient-to-r from-red-950/40 to-orange-950/40 border-y border-red-500/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-full px-4 py-1.5 text-sm text-red-300 mb-4">
            <Star className="w-3.5 h-3.5" /><span>2 Plätze – Berlin KMU Pilot 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Kostenlose Hacker Simulation für Berliner KMUs</h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-6 text-sm">
            Berliner Unternehmen mit Microsoft-Infrastruktur erhalten eine vollständige
            Hacker Simulation im Wert von bis zu 15.000 € gratis.
          </p>
          <Link href="/berlin-kmu-pilot"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            Kostenlos bewerben <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hacker Simulation – FAQ</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left flex items-center justify-between px-6 py-5 gap-4 hover:bg-white/[0.03] transition-colors"
                aria-expanded={openFaq === i}>
                <span className="font-medium text-white text-sm sm:text-base">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="w-5 h-5 text-red-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── EXTERNE QUELLEN ───────────────────────────────────────────────────── */}
      <section className="py-10 bg-[#131927] border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2"><BookOpen className="w-4 h-4" />Externe Quellen</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: "MITRE ATT&CK – Echte Angriffstechniken", href: "https://attack.mitre.org/" },
              { label: "Offensive Security – OSCP Zertifizierung", href: "https://www.offensive-security.com/pwk-oscp/" },
              { label: "OWASP Testing Guide – Web Exploitation", href: "https://owasp.org/www-project-web-security-testing-guide/" },
              { label: "BSI – Penetrationstest Bundesbehörden", href: "https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Penetrationstests/penetrationstests_node.html" },
            ].map((src) => (
              <a key={src.label} href={src.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-white/5 transition-colors group">
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-gray-400 flex-shrink-0" />
                <span className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{src.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-sm text-red-400 mb-6">
          <Clock className="w-3.5 h-3.5" />Angebot in 24 h – kostenlos & unverbindlich
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Jetzt Hacker Simulation beauftragen
        </h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          OSCP-zertifizierte Pentester. Festpreis per Online-Konfigurator.
          Ergebnis in 2–10 Tagen.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/request-pentest"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-200 shadow-lg hover:scale-105">
            <Calculator className="w-5 h-5" />Hacker Simulation konfigurieren <ArrowRight className="w-5 h-5" />
          </Link>
          <a href={PHONE_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Phone className="w-4 h-4" />{PHONE}
          </a>
          <a href={EMAIL_HREF} className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-gray-300 hover:text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200">
            <Mail className="w-4 h-4" />{EMAIL}
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          {["100 % autorisiert", "OSCP-zertifiziert", "Festpreis", "Sofort-Reporting"].map((t) => (
            <span key={t} className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-400" />{t}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
