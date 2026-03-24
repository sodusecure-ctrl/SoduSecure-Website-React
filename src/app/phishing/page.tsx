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
  X,
  Check,
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
const TAKEN_SPOTS = 0;
const DEADLINE = "Ende April 2026";

const PHISHING_EXAMPLES = [
  {
    email: {
      subject: "Dringend: Rechnungskorrektur erforderlich",
      from: "rechnung@paypal-support.de",
      body: "Sehr geehrter Kunde,\n\nIhre letzte Zahlung wurde nicht verarbeitet. Bitte klicken Sie hier, um Ihre Zahlungsdaten zu aktualisieren.\n\n[Link: paypal-secure-update.com]\n\nMit freundlichen Grüßen,\nPayPal Support",
    },
    isFake: true,
    explanation: "Falsche Domain: paypal-support.de statt paypal.com. Dringlichkeit erzeugt Druck.",
  },
  {
    email: {
      subject: "Ihre Amazon-Bestellung wurde versendet",
      from: "orders@amazon.de",
      body: "Hallo,\n\nIhre Bestellung #12345 wurde erfolgreich versendet. Verfolgen Sie den Status hier:\n\n[Link: amazon-tracking.de]\n\nVielen Dank für Ihren Einkauf!\nAmazon",
    },
    isFake: false,
    explanation: "Echte Amazon-E-Mail mit korrekter Domain. Keine verdächtigen Links.",
  },
  {
    email: {
      subject: "Sicherheitswarnung: Ihr Konto wurde gehackt",
      from: "security@microsoft-support.com",
      body: "Ihr Microsoft-Konto wurde kompromittiert. Ändern Sie sofort Ihr Passwort:\n\n[Link: microsoft-secure-login.com]\n\nMicrosoft Security Team",
    },
    isFake: true,
    explanation: "Falsche Domain: microsoft-support.com statt microsoft.com. Panik erzeugen.",
  },
  {
    email: {
      subject: "Gewinn: Sie haben 1000€ gewonnen!",
      from: "gewinn@lotto.de",
      body: "Herzlichen Glückwunsch! Sie haben in unserer Lotterie gewonnen. Klicken Sie hier, um Ihren Gewinn abzuholen:\n\n[Link: lotto-gewinn.de]\n\nLotto Deutschland",
    },
    isFake: true,
    explanation: "Zu gut um wahr zu sein. Lotto verschickt keine E-Mails mit Gewinnen.",
  },
  {
    email: {
      subject: "Rechnung für IT-Support Dienstleistungen",
      from: "billing@it-support-berlin.de",
      body: "Anbei finden Sie die Rechnung für unsere letzten Dienstleistungen. Bitte prüfen und überweisen Sie den Betrag.\n\n[Anhang: rechnung.pdf]\n\nMit freundlichen Grüßen,\nIT Support Berlin",
    },
    isFake: true,
    explanation: "Unverlangte Rechnung mit Anhang. Überprüfen Sie immer den Absender.",
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

function PhishingGame() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [feedback, setFeedback] = useState<string>('');

  const handleAnswer = (isFake: boolean) => {
    setSelectedAnswer(isFake);
    const correct = isFake === PHISHING_EXAMPLES[currentQuestion].isFake;
    if (correct) {
      setScore(score + 1);
      setFeedback('🎉 Richtig! Gut erkannt!');
    } else {
      setFeedback('❌ Falsch! Schau dir die Erklärung an.');
    }
    setTimeout(() => {
      if (currentQuestion < PHISHING_EXAMPLES.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setFeedback('');
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setFeedback('');
  };

  if (showResult) {
    const percentage = Math.round((score / PHISHING_EXAMPLES.length) * 100);
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 text-center shadow-2xl border border-blue-200">
        <div className="mb-6">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎖️' : percentage >= 40 ? '👍' : '🤔'}
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">Dein Ergebnis: {score} von {PHISHING_EXAMPLES.length}</h3>
          <p className="text-gray-600 text-lg mb-4">{percentage}% richtig</p>
          <div className="flex justify-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-2xl ${i < Math.round(score / PHISHING_EXAMPLES.length * 5) ? 'text-yellow-400' : 'text-gray-300'}`}>
                ⭐
              </span>
            ))}
          </div>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            {percentage >= 80 ? "Ausgezeichnet! Du hast ein scharfes Auge für Phishing." : 
             percentage >= 60 ? "Gut gemacht! Aber es gibt noch Raum für Verbesserung." : 
             percentage >= 40 ? "Nicht schlecht, aber Phishing kann gefährlich sein." : 
             "Vorsicht! Phishing-Angriffe könnten dein Unternehmen bedrohen."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={resetGame}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            🔄 Nochmal spielen
          </button>
          <Link
            href="#bewerben"
            className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105 shadow-lg"
          >
            🎯 Jetzt gratis testen lassen
          </Link>
        </div>
      </div>
    );
  }

  const example = PHISHING_EXAMPLES[currentQuestion];
  const progress = ((currentQuestion + 1) / PHISHING_EXAMPLES.length) * 100;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Frage {currentQuestion + 1} von {PHISHING_EXAMPLES.length}</span>
          <span>{Math.round(progress)}% fertig</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">🕵️‍♂️ Phishing-Detektiv: Ist diese E-Mail sicher?</h3>
      
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl mb-6 border border-gray-200 shadow-inner">
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Von:</span>
            <span className="text-gray-900 bg-white px-2 py-1 rounded border">{example.email.from}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">Betreff:</span>
            <span className="text-gray-900 bg-white px-2 py-1 rounded border flex-1">{example.email.subject}</span>
          </div>
          <div className="mt-4">
            <span className="font-semibold text-gray-700 block mb-2">Nachricht:</span>
            <div className="bg-white p-4 rounded-lg border text-gray-800 whitespace-pre-line text-sm leading-relaxed shadow-sm">
              {example.email.body}
            </div>
          </div>
        </div>
      </div>

      {selectedAnswer !== null ? (
        <div className={`p-6 rounded-2xl mb-6 border-2 shadow-lg transition-all duration-500 ${
          selectedAnswer === example.isFake 
            ? 'bg-green-50 border-green-300 text-green-800' 
            : 'bg-red-50 border-red-300 text-red-800'
        }`}>
          <div className="flex items-center gap-3 mb-3">
            {selectedAnswer === example.isFake ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <X className="w-8 h-8 text-red-600" />
            )}
            <h4 className="text-xl font-bold">
              {selectedAnswer === example.isFake ? 'Richtig!' : 'Falsch!'}
            </h4>
          </div>
          <p className="text-lg font-medium mb-2">{feedback}</p>
          <p className="text-base leading-relaxed">{example.explanation}</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-700 mb-6 text-lg">Ist diese E-Mail ein Phishing-Versuch?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-red-500/50 flex items-center justify-center gap-3 text-lg"
            >
              <X className="w-6 h-6" />
              Ja, Phishing!
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-500/50 flex items-center justify-center gap-3 text-lg"
            >
              <CheckCircle className="w-6 h-6" />
              Nein, sicher!
            </button>
          </div>
        </div>
      )}
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
          <>Platz sichern <ArrowRight className="w-4 h-4" /></>
        )}
      </button>
      <p className="text-white/40 text-xs text-center">
        Wir melden uns innerhalb von 24 Stunden.
      </p>
    </form>
  );
}

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */

export default function BerlinKMUPhishingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── LOGO NAV ────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src="/icons/logo.png"
                width={900}
                height={900}
                alt="SODU Secure Logo"
                className="w-full h-full object-contain rounded shadow"
              />
            </div>
            <span className="text-white text-lg font-semibold group-hover:text-red-400 transition-colors hidden sm:block">
              SODU Secure
            </span>
          </Link>
        </div>
      </nav>

      {/* ── URGENCY BANNER ──────────────────────── */}
      <div className="bg-red-600 text-white py-2.5 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>
              <strong>Kostenlose Phishing-Kampagne verfügbar</strong> · Begrenzte Plätze
            </span>
          </div>
          <SpotsCounter />
        </div>
      </div>

      {/* ── HERO ────────────────────────────────── */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className={`flex justify-center lg:justify-start mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <span className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">
              <Shield className="w-3.5 h-3.5" />
              Phishing-Kampagne – Social Engineering Test
            </span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className={`space-y-6 text-center lg:text-left transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                Phishing-Kampagne:{" "}
                <span className="text-red-500">Wie anfällig sind Ihre Mitarbeiter wirklich?</span>
              </h1>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                SODU Secure führt professionelle Social Engineering Tests durch – Phishing, Vishing und Smishing.
                Vollständige Awareness-Kampagne für{" "}
                <span className="text-white font-semibold">Unternehmen – jetzt kostenlos testen.</span>
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  "Regulärer Wert: 5.000–8.000 €",
                  "Jetzt kostenlos testen",
                  "Begrenzte Plätze",
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

              <p className="text-gray-400 text-sm text-center lg:text-left">
                Kein Berliner KMU?{" "}
                <Link href="/phishing-simulation" className="text-red-400 hover:text-red-300 underline underline-offset-2 transition-colors">
                  Alle Phishing-Kampagnen &amp; Preise →
                </Link>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 justify-center lg:justify-start pt-2">
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Berliner GmbH</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Zertifizierte Experten</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> DSGVO-konform</span>
                <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" /> Keine schädlichen Inhalte</span>
              </div>
            </div>

            <div className={`transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <QuickForm />
              <div className="mt-4 text-center">
                <p className="text-white/40 text-xs mb-2">Oder direkt sprechen:</p>
                <a href={PHONE_HREF} className="text-white font-bold text-lg hover:text-red-400 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-red-400" />
                  {PHONE}
                </a>
                <p className="text-gray-500 text-xs mt-1">Persönlicher Ansprechpartner: Kerim K., Geschäftsführer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PHISHING MATTERS ────────────────── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Warum Phishing-Kampagnen wichtig sind</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Warum Ihr KMU eine Phishing-Kampagne braucht</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Phishing ist der häufigste Einstiegspunkt für Cyberangriffe. Erfahren Sie, warum regelmäßige Tests entscheidend sind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: AlertTriangle,
                title: "90% aller Angriffe starten mit Social Engineering",
                desc: "Phishing ist nicht nur ein technisches Problem – es ist ein menschliches.",
              },
              {
                icon: Target,
                title: "40% der Mails werden geöffnet und geklickt",
                desc: "Selbst geschulte Mitarbeiter fallen auf ausgeklügelte Angriffe herein.",
              },
              {
                icon: Shield,
                title: "Awareness-Training wirkt nur kurzfristig",
                desc: "Ohne regelmäßige Tests veralten Schulungen schnell.",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-red-50 border border-red-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Testen Sie Ihr Wissen!</h3>
            <PhishingGame />
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ──────────────────────────── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-red-600 font-semibold text-sm uppercase tracking-wider">Unsere Phishing-Kampagne</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">Was unsere Kampagne umfasst</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Eine vollständige Social Engineering Kampagne für Berliner KMUs – manuell durchgeführt von Sicherheitsexperten.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: "Phishing-E-Mails",
                desc: "Realistische E-Mail-Phishing-Angriffe mit personalisierten Inhalten.",
                color: "amber",
              },
              {
                icon: Phone,
                title: "Vishing (Telefon)",
                desc: "Sozialtechnische Angriffe per Telefon zur Überprüfung der Awareness.",
                color: "red",
              },
              {
                icon: FileText,
                title: "Detaillierter Report",
                desc: "Umfassende Auswertung mit Klickraten und individuellen Empfehlungen.",
                color: "green",
              },
              {
                icon: Shield,
                title: "Awareness-Training",
                desc: "Anschließendes Training für alle Mitarbeiter mit Best Practices.",
                color: "blue",
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color === 'red' ? 'bg-red-50 text-red-600' : s.color === 'blue' ? 'bg-blue-50 text-blue-600' : s.color === 'amber' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ────────────────────────── */}
      <section id="bewerben" className="py-16 sm:py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-red-400 font-semibold text-sm uppercase tracking-wider">Jetzt bewerben</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Testen Sie Ihre Firma – Kostenlos!</h2>
            <p className="mt-3 text-gray-300 max-w-2xl mx-auto">
              Sichern Sie sich einen der 7 Plätze für unsere gratis Phishing-Kampagne. Erfahren Sie, wie sicher Ihre Mitarbeiter wirklich sind.
            </p>
          </div>

          <div ref={formRef} className="max-w-2xl mx-auto">
            <QuickForm />
          </div>
        </div>
      </section>
    </div>
  );
}