"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calculator,
  Phone,
  Mail,
  Building2,
  ArrowRight,
  CheckCircle,
  Clock,
} from "lucide-react";

const PHONE = "(+49) 0177 7750985";
const PHONE_HREF = "tel:+491777750985";

/**
 * Two-path conversion block (brand red/black):
 *  A) "Ich will mich informieren" -> Pentest konfigurieren & Preis erfahren (/request-pentest)
 *  B) "Ich will mich beraten lassen" -> Kontaktformular -> Rückruf in 24 h (POST /api/pentest)
 *
 * `context` is included in the lead email so the team knows which page it came from.
 */
export default function LeadConversionSection({ context = "Landingpage" }: { context?: string }) {
  const [form, setForm] = useState({ company: "", email: "", phone: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const field = (k: keyof typeof form, v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (err[k]) setErr((p) => { const n = { ...p }; delete n[k]; return n; });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.company.trim()) errs.company = "Bitte Firma angeben";
    if (!form.email.trim()) errs.email = "Bitte E-Mail angeben";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Ungültige E-Mail";
    if (!form.phone.trim()) errs.phone = "Bitte Telefonnummer angeben";
    if (Object.keys(errs).length) { setErr(errs); return; }

    setSending(true);
    try {
      const res = await fetch("/api/pentest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.company,
          companyName: form.company,
          email: form.email,
          phone: form.phone,
          additionalInfo: `Kostenlose Beratung angefragt über: ${context}.${form.message ? `\n\nNachricht: ${form.message}` : ""}`,
          selectedCategory: "other",
          selectedLanguage: "de",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setSent(true);
    } catch {
      setErr({ submit: "Senden fehlgeschlagen. Bitte rufen Sie uns kurz an – wir helfen sofort." });
    } finally {
      setSending(false);
    }
  };

  const inputCls = (e?: string) =>
    `h-12 w-full rounded-xl border bg-white/[0.04] pl-9 pr-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-[#FF3B30]/60 focus:bg-white/[0.06] ${e ? "border-[#FF3B30]/70" : "border-white/12"}`;

  return (
    <section className="py-20 bg-white/[0.02] border-y border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 text-sm text-[#FF6B61] mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Zwei einfache Wege zu Ihrer Sicherheit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">Jetzt starten – kostenlos &amp; unverbindlich</h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm">
            Egal ob Sie schon konkret planen oder erst Orientierung brauchen – wählen Sie einfach den passenden Weg.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ── Weg A: informieren / Pentest konfigurieren ───────────────── */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 flex flex-col">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20 mb-5">
              <Calculator className="w-6 h-6 text-[#FF3B30]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ich möchte mich informieren</h3>
            <p className="text-sm text-white/60 leading-relaxed mb-5">
              Konfigurieren Sie Ihren Pentest in unter 3 Minuten und erfahren Sie <strong className="text-white">sofort &amp; kostenlos den Preis</strong> –
              transparent, ohne Verpflichtung und ohne Wartezeit.
            </p>
            <ul className="space-y-2 mb-7">
              {["Preis sofort online berechnen", "Transparenter Festpreis ab 2.500 €", "Keine Anmeldung nötig"].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-white/70">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />{t}
                </li>
              ))}
            </ul>
            <Link
              href="/request-pentest"
              className="mt-auto inline-flex items-center justify-center gap-2 premium-cta text-white font-semibold px-6 py-4 rounded-xl transition-all"
            >
              <Calculator className="w-5 h-5" />Pentest konfigurieren &amp; Preis erfahren<ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── Weg B: beraten lassen / Rückruf ──────────────────────────── */}
          <div className="bg-white/[0.03] border border-[#FF3B30]/20 rounded-2xl p-7 flex flex-col">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#FF3B30]/10 border border-[#FF3B30]/20 mb-5">
              <Phone className="w-6 h-6 text-[#FF3B30]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Ich möchte mich beraten lassen</h3>

            {sent ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
                <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
                  <CheckCircle className="h-6 w-6" />
                </span>
                <h4 className="text-lg font-bold text-white">Vielen Dank – wir melden uns!</h4>
                <p className="mt-2 max-w-sm text-sm text-white/65">
                  Ihre Anfrage ist bei unserem Security-Team. Wir rufen Sie innerhalb von <strong className="text-white">24 Stunden</strong> zurück
                  und beraten Sie kostenlos und unverbindlich.
                </p>
                <a href={PHONE_HREF} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
                  <Phone className="h-4 w-4" />Lieber direkt anrufen? {PHONE}
                </a>
              </div>
            ) : (
              <>
                <p className="text-sm text-white/60 leading-relaxed mb-5">
                  Hinterlassen Sie Ihre Kontaktdaten – wir rufen Sie innerhalb von <strong className="text-white">24 Stunden</strong> zurück
                  und beraten Sie <strong className="text-white">kostenlos &amp; unverbindlich</strong>.
                </p>
                <form onSubmit={submit} className="mt-auto space-y-3">
                  <div>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                      <input value={form.company} onChange={(e) => field("company", e.target.value)} placeholder="Firma" className={inputCls(err.company)} />
                    </div>
                    {err.company && <p className="mt-1 text-xs text-[#FF6B61]">{err.company}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                        <input type="email" value={form.email} onChange={(e) => field("email", e.target.value)} placeholder="E-Mail" className={inputCls(err.email)} />
                      </div>
                      {err.email && <p className="mt-1 text-xs text-[#FF6B61]">{err.email}</p>}
                    </div>
                    <div>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                        <input type="tel" value={form.phone} onChange={(e) => field("phone", e.target.value)} placeholder="Telefon" className={inputCls(err.phone)} />
                      </div>
                      {err.phone && <p className="mt-1 text-xs text-[#FF6B61]">{err.phone}</p>}
                    </div>
                  </div>
                  {err.submit && <p className="text-sm text-[#FF6B61]">{err.submit}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2 premium-cta text-white font-semibold px-6 py-4 rounded-xl transition-all disabled:opacity-70"
                  >
                    {sending ? (
                      <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />Wird gesendet…</>
                    ) : (
                      <><Phone className="w-5 h-5" />Kostenlosen Rückruf anfordern</>
                    )}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-white/40">
                    <Clock className="w-3.5 h-3.5" />Rückruf in 24 h · DSGVO-konform · unverbindlich
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
