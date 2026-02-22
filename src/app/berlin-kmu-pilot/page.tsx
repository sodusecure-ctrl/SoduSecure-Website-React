"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
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
const PHONE = "+49 179 239 6294";
const PHONE_HREF = "tel:+4917923962949";
const EMAIL = "sodusecure@gmail.com";
const EMAIL_HREF = "mailto:sodusecure@gmail.com";
const TOTAL_SPOTS = 7;
const TAKEN_SPOTS = 1;
const DEADLINE = "31. März 2026";

const SERVICES = [
  {
    icon: Globe,
    title: "Externer Pentest",
    desc: "Öffentliche IPs, Server, Webanwendungen und Cloud-Exposition – wir testen Ihre gesamte externe Angriffsfläche.",
    color: "red",
  },
  {
    icon: Server,
    title: "Active Directory Analyse",
    desc: "Privilegien-Eskalation, Fehlkonfigurationen und laterale Bewegungen – wir decken interne Schwachstellen auf.",
    color: "blue",
  },
  {
    icon: Users,
    title: "Phishing Simulation",
    desc: "Realistische Kampagne mit Klickrate-Auswertung und Awareness-Bewertung Ihrer Mitarbeitenden.",
    color: "amber",
  },
  {
    icon: FileText,
    title: "Executive Report",
    desc: "Management Summary, technischer Bericht und priorisierte Handlungsempfehlungen – verständlich für GF und IT.",
    color: "green",
  },
];

const STATS = [
  { value: "68%", label: "aller KMU wurden bereits Ziel eines Cyberangriffs" },
  { value: "40%", label: "der Phishing-Mails werden geöffnet und geklickt" },
  { value: "80%", label: "der AD-Umgebungen haben kritische Fehlkonfigurationen" },
  { value: "287", label: "Tage bleibt ein Angreifer unentdeckt im Netzwerk" },
];

const REQUIREMENTS = [
  { icon: Building2, text: "20–150 Mitarbeiter" },
  { icon: Server, text: "Microsoft-basierte Infrastruktur (M365 / AD)" },
  { icon: MapPin, text: "Standort Berlin oder Brandenburg" },
  { icon: UserCheck, text: "Ansprechpartner für IT-Sicherheit vorhanden" },
  { icon: CheckCircle, text: "Bereitschaft für gemeinsames Abschlussmeeting" },
];

const FAQS = [
  {
    q: "Ist das wirklich vollständig kostenfrei?",
    a: "Ja. Es entstehen für Sie keine Kosten. Im Gegenzug bitten wir Sie um ehrliches Feedback, ein Testimonial bei Zufriedenheit sowie die Erlaubnis, Ihr Logo als Referenz zu nutzen.",
  },
  {
    q: "Gibt es versteckte Verpflichtungen oder Folgeverkäufe?",
    a: "Nein. Es gibt keine Verpflichtung, weitere Leistungen zu kaufen. Wir präsentieren Ihnen nach dem Test unsere Ergebnisse – was Sie damit machen, entscheiden Sie.",
  },
  {
    q: "Wird der Betrieb durch den Test beeinträchtigt?",
    a: "Alle Tests werden vorab mit Ihnen abgestimmt. Zeitpunkt, Umfang und Vorgehensweise werden gemeinsam festgelegt. Produktionssysteme werden niemals ohne Freigabe getestet.",
  },
  {
    q: "Wie lange dauert das Pilotprojekt?",
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
  const remaining = TOTAL_SPOTS - TAKEN_SPOTS;
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
      <div className="flex gap-1">
        {Array.from({ length: TOTAL_SPOTS }).map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-sm ${
              i < TAKEN_SPOTS ? "bg-red-500" : "bg-white/20 border border-white/30"
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-white/80">
        <span className="text-red-400 font-bold">{remaining} von {TOTAL_SPOTS}</span> Plätzen frei
      </span>
    </div>
  );
}

function QuickForm() {
  const [form, setForm] = useState<QuickFormData>({ company: "", contactName: "", email: "" });
  const [step, setStep] = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        <h3 className="text-white font-bold text-lg mb-2">Anfrage erhalten!</h3>
        <p className="text-white/70 text-sm">Wir melden uns innerhalb von 48 Stunden persönlich bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4">
      <p className="text-white font-semibold text-sm uppercase tracking-wider">Jetzt unverbindlich anfragen</p>
      <input
        required
        type="text"
        placeholder="Firmenname *"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
      />
      <input
        required
        type="text"
        placeholder="Ansprechpartner *"
        value={form.contactName}
        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
      />
      <input
        required
        type="email"
        placeholder="E-Mail-Adresse *"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-red-400 transition"
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
      >
        {loading ? "Wird gesendet..." : (
          <>Pilotplatz sichern <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
      <p className="text-white/40 text-xs text-center">
        Wir melden uns innerhalb von 24–48 Stunden.
      </p>
    </form>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-red-600 flex-shrink-0 ml-4" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>
      {open && (
        <div className="px-6 pb-4 bg-white">
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
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Bewerbung eingegangen!</h3>
        <p className="text-gray-600 mb-2">
          Vielen Dank, <strong>{form.contactName}</strong>. Wir prüfen Ihre Bewerbung und melden uns innerhalb von <strong>48 Stunden</strong> persönlich.
        </p>
        <p className="text-gray-500 text-sm">
          Bei dringenden Fragen: <a href={PHONE_HREF} className="text-red-600 font-semibold">{PHONE}</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Firmenname *</label>
          <input
            required
            type="text"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Muster GmbH"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ansprechpartner *</label>
          <input
            required
            type="text"
            value={form.contactName}
            onChange={(e) => setForm({ ...form, contactName: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="Max Mustermann"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail *</label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="m.mustermann@firma.de"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            placeholder="+49 30 ..."
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mitarbeiterzahl</label>
          <select
            value={form.employees}
            onChange={(e) => setForm({ ...form, employees: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
          >
            <option value="">Bitte wählen</option>
            <option value="20-50">20–50 Mitarbeiter</option>
            <option value="51-100">51–100 Mitarbeiter</option>
            <option value="101-150">101–150 Mitarbeiter</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IT-Struktur</label>
          <select
            value={form.itStructure}
            onChange={(e) => setForm({ ...form, itStructure: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition bg-white"
          >
            <option value="">Bitte wählen</option>
            <option value="Eigene IT + Microsoft 365">Eigene IT + Microsoft 365</option>
            <option value="Externer IT-Dienstleister">Externer IT-Dienstleister</option>
            <option value="Active Directory (on-premise)">Active Directory (on-premise)</option>
            <option value="Azure AD / Entra ID">Azure AD / Entra ID</option>
            <option value="Mischbetrieb">Mischbetrieb</option>
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
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"
          placeholder="z. B. ca. 50 Arbeitsplätze, Windows Server 2019, Microsoft 365, IT-Dienstleister in Berlin ..."
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="privacy"
          checked={form.privacyAccepted}
          onChange={(e) => setForm({ ...form, privacyAccepted: e.target.checked })}
          className="mt-0.5 w-4 h-4 text-red-600 border-gray-300 rounded cursor-pointer"
        />
        <label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer">
          Ich stimme der Verarbeitung meiner Daten gemäß der{" "}
          <Link href="/privacy" target="_blank" className="text-red-600 underline hover:text-red-700">
            Datenschutzerklärung
          </Link>{" "}
          zu. *
        </label>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:scale-[1.01] text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        {loading ? (
          "Wird gesendet..."
        ) : (
          <>
            <Lock className="w-5 h-5" />
            Jetzt Pilotplatz beantragen
            <ArrowRight className="w-5 h-5" />
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
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="min-h-screen bg-white font-sans">

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

      {/* ── URGENCY BANNER ──────────────────────── */}
      <div className="bg-red-600 text-white py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Bewerbungsschluss: {DEADLINE}</strong> · Nur limitierte Plätze verfügbar
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
          <div className={`flex justify-center lg:justify-start mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              Berlin KMU Cybersecurity Pilotprogramm 2026
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div className={`space-y-6 text-center lg:text-left transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Wie angreifbar ist Ihr Unternehmen{" "}
                <span className="text-red-500">wirklich?</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                SODU Secure validiert Ihre gesamte IT-Infrastruktur – extern, intern und organizatorisch.
                Vollständiger Pentest, Active Directory Analyse und Phishing-Simulation für{" "}
                <span className="text-white font-semibold">ausgewählte Berliner KMUs.</span>
              </p>

              {/* Value badges */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  "Regulärer Wert: 8.000–15.000 €",
                  "Für Pilotteilnehmer: 0 €",
                  "Nur 7 Plätze",
                ].map((badge, i) => (
                  <span
                    key={i}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full ${
                      i === 1
                        ? "bg-green-500/20 border border-green-500/30 text-green-400"
                        : i === 2
                        ? "bg-red-500/20 border border-red-500/30 text-red-400"
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
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-600/25 flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Jetzt bewerben
                </button>
                <a
                  href={PHONE_HREF}
                  className="border-2 border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Direkt anrufen
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 justify-center lg:justify-start pt-2">
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Berliner GmbH</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Zertifizierte Experten</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> DSGVO-konform</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Schriftlicher Scope</span>
              </div>
            </div>

            {/* Right – Quick Form */}
            <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <QuickForm />
              <div className="mt-4 text-center">
                <p className="text-white/40 text-xs mb-2">Oder direkt sprechen:</p>
                <a href={PHONE_HREF} className="text-white font-bold text-lg hover:text-red-400 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-red-400" />
                  {PHONE}
                </a>
                <p className="text-gray-500 text-xs mt-1">Persönlicher Ansprechpartner: Kerim Koc, Geschäftsführer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ───────────────────────────────── */}
      <section className="bg-gray-900 border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm uppercase tracking-widest mb-8">Die Realität – basierend auf aktuellen Studien</p>
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

      {/* ── PROBLEM SECTION ─────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Das Problem</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Die meisten KMUs glauben, sie sind sicher.<br />
                <span className="text-red-600">Bis der Angriff kommt.</span>
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
                <span className="font-bold text-lg">Typischer KMU-Angriff</span>
              </div>
              {[
                { step: "1", label: "Phishing-Mail", desc: "Mitarbeiter klickt → Zugangsdaten kompromittiert" },
                { step: "2", label: "Lateral Movement", desc: "Angreifer bewegt sich unbemerkt durchs Netzwerk" },
                { step: "3", label: "AD-Übernahme", desc: "Domain Admin erreicht – vollständige Kontrolle" },
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
                <p className="text-red-400 text-sm font-semibold">Durchschnittliche Erkennungszeit: <span className="text-white">287 Tage</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE TEST ────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Das Pilotprogramm</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Was wir testen</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Ein vollständiges KMU Security Komplettpaket – manuell durchgeführt von zertifizierten Experten.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
          <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 text-center mb-6">Projektablauf</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
              {[
                { week: "Woche 1", label: "Kick-off & Scope", icon: Zap },
                { week: "Woche 1–2", label: "Externer Pentest", icon: Globe },
                { week: "Woche 2–3", label: "AD & Phishing", icon: Shield },
                { week: "Woche 3–4", label: "Report & Präsentation", icon: Star },
              ].map((item, i, arr) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1">
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="sm:text-center">
                      <p className="text-xs text-red-600 font-semibold">{item.week}</p>
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
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Der Wert</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Was das Projekt regulär kostet</h2>
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
                  <span className="font-semibold">Gesamtwert</span>
                  <span className="font-black text-red-400">8.000–15.000 €</span>
                </div>
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  <span className="text-green-900 font-semibold">Ihr Pilotpreis</span>
                  <span className="font-black text-green-600 text-lg">0 €</span>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Conditions */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
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
                <h3 className="font-bold text-gray-900 mb-3">Warum bieten wir das kostenfrei an?</h3>
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
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Das Team</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Wer steckt hinter SODU Secure?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Kerim Koc",
                role: "Geschäftsführer & Offensive Security",
                bio: "Informatikstudent TU Berlin, Gründer, Fokus auf Red Teaming und Penetration Testing.",
              },
              {
                name: "Team Member 2",
                role: "Active Directory & Infrastructure",
                bio: "Spezialist für Windows-Infrastrukturen, Active Directory und interne Netzwerksicherheit.",
              },
              {
                name: "Team Member 3",
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
              { val: "3", label: "Monate als GmbH" },
              { val: "3", label: "Zertifizierte Experten" },
              { val: "100%", label: "Berliner Fokus" },
              { val: "0€", label: "Für Pilotteilnehmer" },
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
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Exklusiv</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Teilnahmevoraussetzungen</h2>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto">
            Nicht jedes Unternehmen wird aufgenommen. Wir wählen 7 Berliner KMUs aus, die folgende Kriterien erfüllen:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            {REQUIREMENTS.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4 border border-gray-100">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-red-600" />
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
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Bewerbung</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Jetzt Pilotplatz beantragen</h2>
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
                <strong className="text-red-600">{TOTAL_SPOTS - TAKEN_SPOTS}</strong> von {TOTAL_SPOTS} Plätzen frei
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <FullApplicationForm />
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm mb-2">Lieber persönlich sprechen?</p>
            <a href={PHONE_HREF} className="text-2xl font-black text-gray-900 hover:text-red-600 transition-colors flex items-center justify-center gap-2">
              <Phone className="w-6 h-6 text-red-600" />
              {PHONE}
            </a>
            <p className="text-gray-400 text-sm mt-1">
              Kerim Koc · Geschäftsführer · SODU Secure GmbH
            </p>
            <a href={EMAIL_HREF} className="mt-2 text-gray-500 hover:text-red-600 transition-colors text-sm flex items-center justify-center gap-1">
              <Mail className="w-4 h-4" />
              {EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Häufige Fragen</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
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
            <span className="text-red-400">sie ist messbar.</span>
          </h2>
          <p className="text-gray-300 mb-2 leading-relaxed">
            Bewerben Sie sich jetzt für einen der{" "}
            <strong className="text-white">{TOTAL_SPOTS - TAKEN_SPOTS} verbleibenden Pilotplätze.</strong>
          </p>
          <p className="text-gray-400 text-sm mb-8">Bewerbungsschluss: <strong className="text-white">{DEADLINE}</strong></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToForm}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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
            <Link href="/privacy" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="/impressum" className="hover:text-white transition-colors">Impressum</Link>
            <a href={EMAIL_HREF} className="hover:text-white transition-colors">{EMAIL}</a>
          </div>
          <p className="text-xs text-center sm:text-right">© 2026 SODU Secure GmbH · Berlin</p>
        </div>
      </footer>

    </div>
  );
}
