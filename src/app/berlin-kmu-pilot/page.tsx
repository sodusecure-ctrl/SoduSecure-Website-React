"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { trackConversion } from "@/lib/gtag";
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertTriangle,
  Globe,
  Server,
  Users,
  FileText,
  ChevronDown,
  ChevronUp,
  Lock,
  Target,
  Zap,
  ArrowRight,
  Clock,
  Star,
  Building2,
  UserCheck,
  Download,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface QuickFormData {
  company: string;
  contactName: string;
  email: string;
}

interface FullFormData {
  company: string;
  contactName: string;
  email: string;
  phone: string;
  employees: string;
  itStructure: string;
  description: string;
  privacyAccepted: boolean;
}

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const PHONE = "(+49) 01777750985";
const PHONE_HREF = "tel:+491777750985";
const EMAIL = "info@sodusecure.com";
const EMAIL_HREF = "mailto:info@sodusecure.com";
const TOTAL_SPOTS = 0;
const TAKEN_SPOTS = 7;
const DEADLINE = "Ausgelaufen";

const SERVICES = [
  {
    icon: Globe,
    title: "External pen test",
    desc: "Öffentliche IPs, Server, Webanwendungen und Cloud-Exposition – wir testen Ihre gesamte externe Angriffsfläche.",
    color: "red",
  },
  {
    icon: Server,
    title: "Active Directory analysis",
    desc: "Privilegien-Eskalation, Fehlkonfigurationen und laterale Bewegungen – wir decken interne Schwachstellen auf.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Phishing simulation",
    desc: "Realistische Kampagne mit Klickrate-Auswertung und Awareness-Bewertung Ihrer Mitarbeitenden.",
    color: "amber",
  },
  {
    icon: FileText,
    title: "Executive report",
    desc: "Management Summary, technischer Bericht und priorisierte Handlungsempfehlungen – verständlich für GF und IT.",
    color: "green",
  },
];

const STATS = [
  { value: "68%", label: "of all SMEs have already been the target of a cyber attack" },
  { value: "40%", label: "of phishing emails are opened and clicked" },
  { value: "80%", label: "of AD environments have critical misconfigurations" },
  { value: "287", label: "An attacker remains undetected in the network for days" },
];

const REQUIREMENTS = [
  { icon: Building2, text: "20-150 employees" },
  { icon: Server, text: "Microsoft-based infrastructure (M365 / AD)" },
  { icon: MapPin, text: "Location Berlin or Brandenburg" },
  { icon: UserCheck, text: "Contact person for IT security available" },
  { icon: CheckCircle, text: "Willingness for joint final meeting" },
];

const FAQS = [
  {
    q: "Ist das Pilotprogramm noch verfügbar?",
    a: "Das kostenlose Pilotprogramm ist ausgelaufen. Wir haben erfolgreich 7 KMUs unterstützt und freuen uns über deren Zufriedenheit. Jetzt bieten wir bezahlte Pentest-Dienstleistungen für KMUs an – kontaktieren Sie uns für ein individuelles Angebot.",
  },
  {
    q: "Gibt es versteckte Verpflichtungen oder Folgeverkäufe?",
    a: "Nein. Bei unseren bezahlten Dienstleistungen gibt es keine versteckten Kosten. Wir präsentieren Ihnen nach dem Test unsere Ergebnisse – was Sie damit machen, entscheiden Sie.",
  },
  {
    q: "Wird der Betrieb durch den Test beeinträchtigt?",
    a: "Alle Tests werden vorab mit Ihnen abgestimmt. Zeitpunkt, Umfang und Vorgehensweise werden gemeinsam festgelegt. Produktionssysteme werden niemals ohne Freigabe getestet.",
  },
  {
    q: "Wie lange dauert das Projekt?",
    a: "Von Kick-off bis Abschlusspräsentation rechnen Sie mit 2–4 Wochen, abhängig von der Größe Ihrer Infrastruktur.",
  },
  {
    q: "Was passiert, wenn Schwachstellen gefunden werden?",
    a: "Sie erhalten einen priorisierten Maßnahmenkatalog. Auf Wunsch begleiten wir Sie auch bei der Umsetzung – das ist jedoch ein separates, kostenpflichtiges Angebot.",
  },
  {
    q: "Wer führt die Tests durch?",
    a: "Alle Tests werden von zertifizierten Sicherheitsexperten der SODU Secure GmbH durchgeführt – manuell, nicht rein automatisiert.",
  },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

function SpotsCounter() {
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
      <div className="flex gap-1">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-sm bg-green-500"
          />
        ))}
      </div>
      <span className="text-sm text-white/80">
        <span className="text-green-400 font-bold">7 out of 7</span> Plätzen vergeben
      </span>
    </div>
  );
}

function QuickForm() {
  const [form, setForm] = useState<QuickFormData>({ company: "", contactName: "", email: "" });
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.contactName || !form.email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, employees: "", itStructure: "", description: "", phone: "" }),
      });
      if (!res.ok) throw new Error();
      setStep("success");
      trackConversion();
      router.push('/ifudhuhdksjhfoiadfh');
    } catch {
      setError("Fehler beim Senden. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
        <h3 className="text-white font-bold text-lg mb-2">Request received!</h3>
        <p className="text-white/70 text-sm">We will contact you personally within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4">
      <p className="text-white font-semibold text-sm uppercase tracking-wider">Inquire now without obligation</p>
      <input
        required
        type="text"
        placeholder="Company name *"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
      />
      <input
        required
        type="text"
        placeholder="Contact person *"
        value={form.contactName}
        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
      />
      <input
        required
        type="email"
        placeholder="E-mail address *"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:premium-cta disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
      >
        {loading ? "Wird gesendet..." : (
          <>Secure a pilot spot<ArrowRight className="w-4 h-4" /></>
        )}
      </button>
      <p className="text-white/40 text-xs text-center">
        Wir melden uns innerhalb von 24 Stunden.
      </p>
    </form>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-[#16141A] hover:bg-white/5 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-[#FF3B30] flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-4 bg-[#16141A]">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

function FullApplicationForm() {
  const [form, setForm] = useState<FullFormData>({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    employees: "",
    itStructure: "",
    description: "",
    privacyAccepted: false,
  });
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.privacyAccepted) {
      setError("Bitte akzeptieren Sie die Datenschutzerklärung.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStep("success");
      trackConversion();
      router.push('/ifudhuhdksjhfoiadfh');
    } catch {
      setError("Fehler beim Senden. Bitte rufen Sie uns direkt an: " + PHONE);
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Application received!</h3>
        <p className="text-gray-600 mb-2">
          Vielen Dank, <strong>{form.contactName}</strong>.We will check your application and get back to you within<strong>48 hours</strong> persönlich.
        </p>
        <p className="text-gray-500 text-sm">
          Bei dringenden Fragen: <a href={PHONE_HREF} className="text-[#FF3B30] font-semibold">{PHONE}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Company name *</label>
          <input
            required
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border border-white/12 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Muster GmbH"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contact person *</label>
          <input
            required
            type="text"
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            className="w-full border border-white/12 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Max Doe"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-white/12 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="m.mustermann@firma.de"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">phone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-white/12 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="+49 30 ..."
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of employees</label>
          <select
            value={form.employees}
            onChange={(e) => setForm({ ...form, employees: e.target.value })}
            className="w-full border border-white/12 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-[#16141A]"
          >
            <option value="">Please choose</option>
            <option value="20-50">20-50 employees</option>
            <option value="51-100">51-100 employees</option>
            <option value="101-150">101-150 employees</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IT structure</label>
          <select
            value={form.itStructure}
            onChange={(e) => setForm({ ...form, itStructure: e.target.value })}
            className="w-full border border-white/12 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-[#16141A]"
          >
            <option value="">Please choose</option>
            <option value="Eigene IT + Microsoft 365">Own IT + Microsoft 365</option>
            <option value="Externer IT-Dienstleister">External IT service provider</option>
            <option value="Active Directory (on-premise)">Active Directory (on-premise)</option>
            <option value="Azure AD / Entra ID">Azure AD / Entra ID</option>
            <option value="Mischbetrieb">Mixed operation</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kurze Beschreibung Ihrer IT-Umgebung <span className="text-gray-400">(optional)</span>
        </label>
        <textarea
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border border-white/12 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
          placeholder="e.g.B. approx. 50 workstations, Windows Server 2019, Microsoft 365, IT service provider in Berlin..."
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          checked={form.privacyAccepted}
          onChange={(e) => setForm({ ...form, privacyAccepted: e.target.checked })}
          className="mt-0.5 w-4 h-4 text-[#FF3B30] border-white/12 rounded cursor-pointer"
        />
        <label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer">
          Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
          <Link href="/privacy" target="_blank" className="text-[#FF3B30] underline hover:text-[#FF6B61]">
            Datenschutzerklärung
          </Link>{" "}
          zu. *
        </label>
      </div>
      {error && (
        <div className="bg-[#FF3B30]/10 border border-[#FF3B30]/25 text-[#FF6B61] rounded-lg px-4 py-3 text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:premium-cta disabled:opacity-60 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:scale-[1.01] text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {loading ? (
          "Wird gesendet..."
        ) : (
          <>
            <Lock className="w-5 h-5" />Apply for a pilot place now<ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
      <p className="text-center text-gray-400 text-xs">
        Wir melden uns innerhalb von 48 Stunden · Kein Spam · Jederzeit widerrufbar
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */

export default function BerlinKMUPilotPage() {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const iconColorMap: Record<string, string> = {
    red: "bg-[#FF3B30]/10 text-[#FF3B30]",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="min-h-screen bg-[#16141A] font-sans">

      {/* ── LOGO NAV ────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/icons/logo.png"
                width={900}
                height={900}
                alt="SODU Secure logo"
                className="w-full h-full object-contain rounded shadow"
              />
            </div>
            <span className="text-white text-lg font-semibold group-hover:text-red-400 transition-colors hidden sm:block">
              SODU Secure
            </span>
          </Link>
        </div>
      </nav>

      {/* ── TOP BAR ─────────────────────────────── */}
      <div className="bg-gray-900 text-white py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-xs sm:text-sm">
          <div className="flex items-center gap-1 text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>SODU Secure GmbH · Berlin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={PHONE_HREF} className="flex items-center gap-1.5 text-white hover:text-red-400 transition-colors font-medium">
              <Phone className="w-3.5 h-3.5" />
              {PHONE}
            </a>
            <a href={EMAIL_HREF} className="flex items-center gap-1.5 text-gray-300 hover:text-red-400 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              {EMAIL}
            </a>
          </div>
        </div>
      </div>

      <div className="bg-red-600 text-white py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Pilot program expired</strong> · 7 KMUs erfolgreich unterstützt
            </span>
          </div>
          <SpotsCounter />
        </div>
      </div>

      {/* ── HERO ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              Pentest Berlin – KMU Cybersecurity (Pilotprogramm ausgelaufen)
            </span>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div className={`space-y-6 text-center lg:text-left transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Pentest Berlin:{" "}
                <span className="text-red-500">How secure is your SME really?</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                SODU Secure führt professionelle Penetrationstests in Berlin durch – extern, intern und organisatorisch.
                Vollständiger Pentest, Active Directory Analyse und Phishing-Simulation für{" "}
                <span className="text-white font-semibold">SMEs – now as a paid service.</span>
              </p>

              {/* Value badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  "Regulärer Wert: 8.000–15.000 €",
                  "Pilotprogramm: Ausgelaufen",
                  "7 zufriedene KMU-Kunden",
                ].map((badge, i) => (
                  <span
                    key={i}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                      i === 1
                        ? "bg-gray-500/20 border border-gray-500/30 text-gray-400"
                        : i === 2
                        ? "bg-green-500/20 border border-green-500/30 text-green-400"
                        : "bg-white/10 border border-white/20 text-gray-300"
                    }`}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <button
                  onClick={scrollToForm}
                  className="bg-red-600 hover:premium-cta text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-600/25 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Jetzt Pentest anfragen
                </button>
                <a
                  href={PHONE_HREF}
                  className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Direkt anrufen
                </a>
              </div>
              <p className="text-gray-400 text-sm text-center lg:text-left">
                Kein Berliner KMU?{" "}
                <Link href="/pentest-berlin" className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors">
                  Alle Pentest Berlin Leistungen &amp; Preise →
                </Link>
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 justify-center lg:justify-start pt-2">
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Berliner GmbH</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" />Certified experts</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> DSGVO-konform</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Schriftlicher Scope</span>
              </div>
            </div>

            {/* Right – Quick Form */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <QuickForm />
              <div className="mt-4 text-center">
                <p className="text-white/40 text-xs mb-2">Or speak directly:</p>
                <a href={PHONE_HREF} className="text-white font-bold text-lg hover:text-red-400 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-red-400" />
                  {PHONE}
                </a>
                <p className="text-gray-500 text-xs mt-1">Personal contact: Kerim K., Managing Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────── */}
      <section className="bg-gray-900 border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">The reality – based on current studies</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-black text-red-500 mb-2">{s.value}</div>
                <div className="text-gray-400 text-xs sm:text-sm leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FREE PDF DOWNLOAD ────────────────────── */}
      <section className="py-14 sm:py-16 bg-gradient-to-r from-red-700 via-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0 flex items-center justify-center">
              <div className="w-24 h-28 bg-[#16141A] rounded-xl shadow-2xl flex flex-col items-center justify-center gap-2 p-3">
                <FileText className="w-10 h-10 text-[#FF3B30]" />
                <span className="text-xs font-bold text-[#FF3B30] text-center leading-tight">PDF<br />For free</span>
              </div>
            </div>
            <div className="flex-1 text-white text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 bg-white/20 border border-white/30 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                <span className="w-1.5 h-1.5 bg-[#16141A] rounded-full animate-pulse" />
                Kostenloser Leitfaden
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-3 leading-tight">
                5 Sicherheitslücken, die wir bei nahezu jedem KMU finden
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
                Ransomware, AD-Übernahmen, Phishing – in diesem kostenlosen PDF zeigen wir,
                welche kritischen Schwachstellen wir regelmäßig bei Berliner KMUs entdecken
                und was Sie konkret dagegen tun können. Sofort umsetzbare Erkenntnisse aus echten Pentests.
              </p>
                <a
                  href="/pdf/5_Sicherheitsluecken_KMU.pdf"
                  download="5_Sicherheitsluecken_KMU.pdf"
                  className="inline-flex items-center justify-center gap-2 bg-[#16141A] text-[#FF6B61] hover:bg-[#FF3B30]/15 font-black px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg text-base"
                >
                  <Download className="w-5 h-5" />
                  Jetzt kostenlos herunterladen
                </a>
                <a
                  href="/pdf/5_Sicherheitsluecken_KMU.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white hover:bg-white/10 font-semibold px-6 py-4 rounded-xl transition-all duration-200 hover:scale-105 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Im Browser öffnen
                </a>
              <p className="text-white/50 text-xs mt-4">No form · No login · Download directly</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#16141A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#FF3B30] font-semibold text-sm uppercase tracking-wider">The problem</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Die meisten KMUs glauben, sie sind sicher.<br />
                <span className="text-[#FF3B30]">Until the attack comes.</span>
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ransomware, Phishing und Active Directory-Exploits treffen längst nicht mehr nur Konzerne.
                Berliner KMUs sind besonders gefährdet – oft gut vernetzt, aber schlecht gesichert.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  "Ein erfolgreicher Ransomware-Angriff kostet KMUs durchschnittlich 200.000 €",
                  "DSGVO-Haftung trifft den Geschäftsführer persönlich",
                  "Active Directory Fehlkonfigurationen sind in 80 % der Fälle vorhanden",
                  "Phishing funktioniert – Mitarbeitende klicken trotz Schulung",
                  "Externe Angriffsflächen sind selten vollständig bekannt",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900 rounded-2xl p-8 text-white space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <span className="font-bold text-lg">Typical SMB attack</span>
              </div>
              {[
                { step: "1", label: "Phishing email", desc: "Mitarbeiter klickt → Zugangsdaten kompromittiert" },
                { step: "2", label: "Lateral Movement", desc: "Angreifer bewegt sich unbemerkt durchs Netzwerk" },
                { step: "3", label: "AD takeover", desc: "Domain Admin erreicht – vollständige Kontrolle" },
                { step: "4", label: "Ransomware", desc: "Alle Daten verschlüsselt – Betrieb steht still" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-red-600/20 border border-red-600/30 rounded-full flex items-center justify-center flex-shrink-0 text-red-400 font-bold text-sm">{item.step}</div>
                  <div>
                    <p className="font-semibold text-white text-sm">{item.label}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <p className="text-red-400 text-sm font-semibold">Average detection time:<span className="text-white">287 days</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE TEST ────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#FF3B30] font-semibold text-sm uppercase tracking-wider">Pentest Berlin – The pilot program</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">What our pentest in Berlin includes</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Ein vollständiger Pentest für Berliner KMUs – manuell durchgeführt von zertifizierten Penetrationstestern.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-[#16141A] rounded-2xl p-6 shadow-sm border border-white/8 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconColorMap[s.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Timeline */}
          <div className="mt-12 bg-[#16141A] rounded-2xl p-8 border border-white/8 shadow-sm">
            <h3 className="font-bold text-gray-900 text-center mb-6">Project process</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
              {[
                { week: "Woche 1", label: "Kick-off & Scope", icon: Zap },
                { week: "Woche 1–2", label: "External pen test", icon: Globe },
                { week: "Woche 2–3", label: "AD & Phishing", icon: Shield },
                { week: "Woche 3–4", label: "Report & Presentation", icon: Star },
              ].map((item, i, arr) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="sm:text-center">
                      <p className="text-xs text-[#FF3B30] font-semibold">{item.week}</p>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden sm:block flex-1 h-px bg-gray-200 mx-2" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE SECTION ───────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#16141A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[#FF3B30] font-semibold text-sm uppercase tracking-wider">The value</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">What the project normally costs</h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Ein vollständiger Pentest inkl. AD-Analyse, Phishing-Kampagne und Management-Report kostet marktüblich zwischen 8.000 und 15.000 €.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { item: "Externer Pentest (inkl. Bericht)", value: "3.500–7.000 €" },
                  { item: "Active Directory Analyse", value: "2.000–4.000 €" },
                  { item: "Phishing Simulation + Auswertung", value: "1.500–2.500 €" },
                  { item: "Abschlusspräsentation & Handlungsempfehlungen", value: "1.000–1.500 €" },
                ].map((r) => (
                  <div key={r.item} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-gray-700 text-sm">{r.item}</span>
                    <span className="text-gray-900 font-semibold text-sm">{r.value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-gray-900 text-white rounded-lg px-4 py-3">
                  <span className="font-semibold">Total value</span>
                  <span className="font-black text-red-400">8.000–15.000 €</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <span className="text-green-900 font-semibold">Your pilot price</span>
                  <span className="font-black text-green-600 text-lg">0 €</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Conditions */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-white/8">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Ihre Bedingungen für 0 €
                </h3>
                <ul className="space-y-3">
                  {[
                    "Ehrliches Feedback nach Projektabschluss",
                    "Testimonial (Text oder Video) bei Zufriedenheit",
                    "Erlaubnis, Ihr Logo als Referenz zu verwenden",
                    "Empfehlung an 2–3 Geschäftspartner bei positivem Erlebnis",
                  ].map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why we do this */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-3">Why do we offer this for free?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Als neue Berliner Cybersecurity GmbH bauen wir strategische Referenzen im KMU-Bereich auf.
                  Unser Ziel ist eine langfristige Partnerschaft – kein kurzfristiger Verkauf.
                  Wir denken in Vertrauen, nicht in Transaktionen.
                </p>
                <p className="mt-3 text-gray-700 text-sm font-medium">
                  Ehrlich gesagt: Wir wollen zeigen, was wir können.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ──────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">The team</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Who is behind SODU Secure?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Kerim K.",
                role: "Geschäftsführer & Offensive Security",
                bio: "Informatikstudent TU Berlin, Gründer, Fokus auf Red Teaming und Penetration Testing.",
              },
              {
                name: "Burak S.",
                role: "Active Directory & Infrastructure",
                bio: "Spezialist für Windows-Infrastrukturen, Active Directory und interne Netzwerksicherheit.",
              },
              {
                name: "Markus F.",
                role: "Phishing & Social Engineering",
                bio: "Experte für Human-Layer Security, Phishing-Kampagnen und Security Awareness.",
              },
            ].map((m, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-red-600/20 border border-red-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="font-bold text-white mb-1">{m.name}</h3>
                <p className="text-red-400 text-xs font-semibold mb-3">{m.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-4 gap-6 text-center">
            {[
              { val: "7", label: "Satisfied SME customers" },
              { val: "3", label: "Certified experts" },
              { val: "100%", label: "Berlin focus" },
              { val: "0€", label: "Pilot program was free" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-red-500 mb-1">{s.val}</div>
                <div className="text-gray-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUIREMENTS ────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#16141A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#FF3B30] font-semibold text-sm uppercase tracking-wider">Exclusive</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Participation requirements</h2>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto">
            Nicht jedes Unternehmen wird aufgenommen. Wir wählen 7 Berliner KMUs aus, die folgende Kriterien erfüllen:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {REQUIREMENTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 border border-white/8">
                  <div className="w-8 h-8 bg-[#FF3B30]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-[#FF3B30]" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{r.text}</span>
                </div>
              );
            })}
          </div>
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-5 text-left max-w-2xl mx-auto">
            <p className="text-amber-800 text-sm font-medium flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600" />
              Die Auswahl erfolgt nach Eingang der Bewerbungen. Bewerben Sie sich jetzt, um Ihren Platz zu sichern – bei Bewerbungsschluss am {DEADLINE} entscheiden wir über die endgültige Zusammensetzung.
            </p>
          </div>
        </div>
      </section>

      {/* ── FULL APPLICATION FORM ───────────────── */}
      <section
        ref={formRef}
        id="bewerbung"
        className="py-16 sm:py-20 bg-gray-50"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#FF3B30] font-semibold text-sm uppercase tracking-wider">Application</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Apply for a pilot place now</h2>
            <p className="mt-3 text-gray-500">
              Füllen Sie das Formular aus – wir melden uns innerhalb von 48 Stunden persönlich bei Ihnen.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm">
              <div className="flex gap-1">
                {Array.from({ length: TOTAL_SPOTS }).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-sm ${i < TAKEN_SPOTS ? "bg-red-500" : "bg-gray-200"}`} />
                ))}
              </div>
              <span className="text-gray-500">
                <strong className="text-[#FF3B30]">{TOTAL_SPOTS - TAKEN_SPOTS}</strong> von {TOTAL_SPOTS} Plätzen frei
              </span>
            </div>
          </div>

          <div className="bg-[#16141A] rounded-2xl p-8 shadow-sm border border-white/8">
            <FullApplicationForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-2">Would you rather speak in person?</p>
            <a href={PHONE_HREF} className="text-2xl font-black text-gray-900 hover:text-[#FF3B30] transition-colors flex items-center justify-center gap-2">
              <Phone className="w-6 h-6 text-[#FF3B30]" />
              {PHONE}
            </a>
            <p className="text-gray-400 text-sm mt-1">
              Kerim K. · Geschäftsführer · SODU Secure GmbH
            </p>
            <a href={EMAIL_HREF} className="mt-2 text-gray-500 hover:text-[#FF3B30] transition-colors text-sm flex items-center justify-center gap-1">
              <Mail className="w-4 h-4" />
              {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-[#16141A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[#FF3B30] font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED CONTENT ─────────────────────── */}
      <section className="py-12 bg-gray-50 border-t border-white/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-bold text-gray-900 mb-6">Further information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/pentest-berlin"
              className="group flex flex-col gap-2 bg-[#16141A] border border-white/10 rounded-xl p-5 hover:border-[#FF3B30]/30 hover:shadow-sm transition-all"
            >
              <span className="text-xs font-semibold text-[#FF3B30] uppercase tracking-wider">Pentest Berlin</span>
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#FF3B30] transition-colors leading-snug">
                Alle Pentest-Leistungen in Berlin – Preise, Ablauf &amp; Anbieter-Auswahl
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Was kostet ein Pentest in Berlin? Welche Arten gibt es? Alles auf einer Seite – inkl. Checkliste für den richtigen Anbieter.
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs text-red-500 font-medium">
                Jetzt lesen <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
            <Link
              href="/case-studies/blogs/pentest-berlin-leitfaden"
              className="group flex flex-col gap-2 bg-[#16141A] border border-white/10 rounded-xl p-5 hover:border-[#FF3B30]/30 hover:shadow-sm transition-all"
            >
              <span className="text-xs font-semibold text-[#FF3B30] uppercase tracking-wider">Blog · Pentest Berlin</span>
              <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#FF3B30] transition-colors leading-snug">
                Pentest Berlin 2026: Der vollständige Leitfaden für Berliner Unternehmen
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Kosten, Dauer, Ablauf und die häufigsten Fragen rund um den Penetrationstest in Berlin – kompakt erklärt.
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-xs text-red-500 font-medium">
                Artikel lesen <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Lock className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sicherheit ist kein Gefühl –<br />
            <span className="text-red-400">Your pentest in Berlin makes it measurable.</span>
          </h2>
          <p className="text-gray-300 mb-2 leading-relaxed">
            Bewerben Sie sich jetzt für einen der{" "}
            <strong className="text-white">{TOTAL_SPOTS - TAKEN_SPOTS} verbleibenden Pilotplätze.</strong>
          </p>
          <p className="text-gray-400 text-sm mb-8">Application deadline:<strong className="text-white">{DEADLINE}</strong></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="bg-red-600 hover:premium-cta text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Jetzt bewerben
            </button>
            <a
              href={PHONE_HREF}
              className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* ── MINI FOOTER ─────────────────────────── */}
      <footer className="bg-black text-gray-400 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold">SODU Secure GmbH</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <Link href="/" className="hover:text-white transition-colors">sodusecure.com</Link>
            <Link href="/pentest-berlin" className="hover:text-white transition-colors">Pentest Berlin</Link>
            <Link href="/case-studies/blogs/pentest-berlin-leitfaden" className="hover:text-white transition-colors">Pentest Berlin Guide</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Data protection</Link>
            <Link href="/impressum" className="hover:text-white transition-colors">imprint</Link>
            <a href={EMAIL_HREF} className="hover:text-white transition-colors">{EMAIL}</a>
          </div>
          <p className="text-xs text-center sm:text-right">© 2026 SODU Secure GmbH · Berlin</p>
        </div>
      </footer>

    </div>
  );
}
