'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck, ShieldAlert, HelpCircle, ArrowRight, ChevronLeft, RotateCcw,
  Check, AlertTriangle, Activity, Euro, Clock, Phone, Mail, Building2, FileCheck, CheckCircle2,
} from 'lucide-react';
import {
  FULL_QUESTIONS, SHORT_QUESTIONS, PENTEST_QUESTIONS,
  makeRiskResult, computeVerdict, fmtEUR, CLOSINGS_DE, CLOSINGS_EN,
  type Question, type Answers, type RiskResult, type Verdict,
} from '../pentest-risiko-check/RiskCheckLanding';
import { CorporateHeader, CorporateFooter, CorporateContactBand } from './CorporateChrome';

type Variant = 'short' | 'full' | 'pentest';

const levelColor = (key: string) =>
  key === 'critical' ? '#DC2626' : key === 'high' ? '#EA580C' : key === 'elevated' ? '#D97706' : '#16A34A';
const verdictColor = (key: string) =>
  key === 'muss' ? '#DC2626' : key === 'sollte' ? '#D97706' : '#16A34A';

// ── Light narrative (corporate accent) ───────────────────────────────────
function narrative(r: RiskResult, isDe: boolean) {
  const ind = <strong className="text-[#0B2A4A]">{r.industryName}</strong>;
  const sz = <strong className="text-[#0B2A4A]">{r.sizeName}</strong>;
  const rate = <strong className="text-[#DC2626]">{r.attackRate}%</strong>;
  const dmg = <strong className="text-[#DC2626]">{fmtEUR(r.damage)}</strong>;
  const dt = <strong className="text-[#DC2626]">{r.downtime} {isDe ? 'Tagen' : 'days'}</strong>;
  const de = [
    <>Unternehmen in der Branche {ind} mit {sz} wurden in den letzten 2 Jahren zu {rate} Ziel eines Cyberangriffs. Der durchschnittliche finanzielle Schaden lag bei {dmg}, bei einem Betriebsausfall von {dt}.</>,
    <>{rate} der Unternehmen in {ind} Ihrer Größenordnung verzeichneten zuletzt mindestens einen ernsten Sicherheitsvorfall – mit Kosten von durchschnittlich {dmg} und {dt} Ausfall.</>,
    <>Statistisch wird ein Unternehmen wie Ihres ({ind}, {sz}) mit {rate} Wahrscheinlichkeit innerhalb von zwei Jahren angegriffen. Durchschnittlicher Schaden: {dmg}. Durchschnittlicher Betriebsausfall: {dt}.</>,
    <>In {ind} trifft es inzwischen {rate} der Betriebe Ihrer Größe. Ein erfolgreicher Angriff kostet im Schnitt {dmg} und legt den Betrieb {dt} lahm.</>,
  ];
  const en = [
    <>Companies in {ind} with {sz} were targeted by a cyber attack in {rate} of cases over the last two years. Average financial damage was {dmg}, with {dt} of business interruption.</>,
    <>{rate} of companies in {ind} of your size recorded at least one serious security incident recently – costing {dmg} on average and {dt} of downtime.</>,
    <>Statistically, a company like yours ({ind}, {sz}) is attacked within two years with {rate} probability. Average damage: {dmg}. Average downtime: {dt}.</>,
    <>In {ind} it now hits {rate} of businesses your size. A successful attack costs {dmg} on average and halts operations for {dt}.</>,
  ];
  const arr = isDe ? de : en;
  return arr[r.templateIdx] ?? arr[0];
}

// ── Light callback form ──────────────────────────────────────────────────
function CallbackForm({ isDe, getPayload }: { isDe: boolean; getPayload: () => { companySize: string; additionalInfo: string } }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  const [form, setForm] = useState({ company: '', email: '', phone: '' });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const field = (k: 'company' | 'email' | 'phone', v: string) => {
    setForm((p) => ({ ...p, [k]: v }));
    if (err[k]) setErr((p) => { const n = { ...p }; delete n[k]; return n; });
  };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.company.trim()) errs.company = t('Bitte Firma angeben', 'Please enter your company');
    if (!form.email.trim()) errs.email = t('Bitte E-Mail angeben', 'Please enter your email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t('Ungültige E-Mail', 'Invalid email');
    if (!form.phone.trim()) errs.phone = t('Bitte Telefonnummer angeben', 'Please enter your phone number');
    if (Object.keys(errs).length) { setErr(errs); return; }
    setSending(true);
    try {
      const p = getPayload();
      const res = await fetch('/api/pentest', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: form.company, companyName: form.company, email: form.email, phone: form.phone, companySize: p.companySize, additionalInfo: p.additionalInfo, selectedCategory: 'other', selectedLanguage: isDe ? 'de' : 'en' }),
      });
      if (!res.ok) throw new Error('failed');
      setSent(true);
    } catch {
      setErr({ submit: t('Senden fehlgeschlagen. Bitte rufen Sie uns an.', 'Sending failed. Please call us.') });
    } finally { setSending(false); }
  };

  if (sent) {
    return (
      <div className="mt-7 rounded-xl border border-[#16A34A]/30 bg-[#16A34A]/[0.06] p-6 text-center">
        <span className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#16A34A]/15 text-[#16A34A]"><Check className="h-6 w-6" /></span>
        <h4 className="text-lg font-bold text-[#0B2A4A]">{t('Vielen Dank – wir melden uns!', 'Thank you – we will be in touch!')}</h4>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">{t('Ihre Anfrage inklusive Check-Ergebnis ist bei unserem Security-Team. Sie hören innerhalb von 24 Stunden von uns.', 'Your request including the check result has reached our security team. You will hear from us within 24 hours.')}</p>
        <a href="tel:+491777750985" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0B2A4A] hover:text-[#DC2626]"><Phone className="h-4 w-4" /> (+49) 0177 7750985</a>
      </div>
    );
  }
  const inputCls = (e?: string) =>
    `h-12 w-full rounded-md border bg-white pl-9 pr-3 text-sm text-[#0B2A4A] placeholder:text-slate-400 outline-none transition focus:border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/15 ${e ? 'border-[#DC2626]' : 'border-slate-300'}`;

  return (
    <form onSubmit={submit} className="mt-7 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
      <h4 className="text-base font-bold text-[#0B2A4A]">{t('Rückruf vereinbaren – kostenlose Erstberatung', 'Request a callback – free initial consultation')}</h4>
      <p className="mt-1 text-sm text-slate-600">{t('Wir gehen Ihr Ergebnis persönlich mit Ihnen durch. Antwort innerhalb von 24 Stunden.', 'We walk through your result with you personally. Reply within 24 hours.')}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div>
          <div className="relative">
            <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={form.company} onChange={(e) => field('company', e.target.value)} placeholder={t('Firma', 'Company')} className={inputCls(err.company)} />
          </div>
          {err.company && <p className="mt-1 text-xs text-[#DC2626]">{err.company}</p>}
        </div>
        <div>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="email" value={form.email} onChange={(e) => field('email', e.target.value)} placeholder={t('E-Mail', 'Email')} className={inputCls(err.email)} />
          </div>
          {err.email && <p className="mt-1 text-xs text-[#DC2626]">{err.email}</p>}
        </div>
        <div>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input type="tel" value={form.phone} onChange={(e) => field('phone', e.target.value)} placeholder={t('Telefonnummer', 'Phone number')} className={inputCls(err.phone)} />
          </div>
          {err.phone && <p className="mt-1 text-xs text-[#DC2626]">{err.phone}</p>}
        </div>
      </div>
      {err.submit && <p className="mt-3 text-sm text-[#DC2626]">{err.submit}</p>}
      <button type="submit" disabled={sending} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#DC2626] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#B91C1C] disabled:opacity-70">
        {sending ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />{t('Wird gesendet…', 'Sending…')}</>) : (<>{t('Rückruf vereinbaren', 'Request a callback')}<ArrowRight className="h-4 w-4" /></>)}
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">{t('Unverbindlich · DSGVO-konform · Ihr Check-Ergebnis wird automatisch mitgesendet', 'No obligation · GDPR-compliant · your check result is sent along automatically')}</p>
    </form>
  );
}

// ── Light question runner ────────────────────────────────────────────────
function QuestionRunner({ isDe, label, icon, questions, answers, step, pending, onSelect, onBack }: {
  isDe: boolean; label: string; icon: React.ReactNode; questions: Question[]; answers: Answers;
  step: number; pending: string | null; onSelect: (id: string) => void; onBack: () => void;
}) {
  const t = (de: string, en: string) => (isDe ? de : en);
  const total = questions.length;
  const q = questions[step];
  const progress = ((step + (answers[q?.id] ? 1 : 0)) / total) * 100;
  return (
    <>
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0B2A4A]">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#DC2626]/10 text-[#DC2626]">{icon}</span>
          {label}
        </div>
        <span className="text-xs font-medium uppercase tracking-widest text-slate-400">{t(`Frage ${step + 1} / ${total}`, `Question ${step + 1} / ${total}`)}</span>
      </div>
      <div className="h-1 w-full bg-slate-100">
        <div className="h-full rounded-r-full bg-[#DC2626] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="p-6 sm:p-9">
        <div key={step} className="qc-step">
          <div className="mb-2 flex items-center gap-2 text-[#DC2626]">{q.icon}</div>
          <h3 className="text-xl font-bold tracking-tight text-[#0B2A4A] sm:text-2xl">{isDe ? q.titleDe : q.titleEn}</h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">{isDe ? q.subDe : q.subEn}</p>
          <div className={`mt-6 grid gap-3 ${q.columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3'}`}>
            {q.choices.map((c) => {
              const active = answers[q.id] === c.id;
              const isPending = pending === c.id;
              return (
                <button key={c.id} onClick={() => onSelect(c.id)}
                  className={`group flex items-center justify-between gap-3 rounded-lg border-2 px-5 py-4 text-left transition-all duration-200 ${isPending ? 'qc-pop' : ''} ${active ? 'border-[#DC2626] bg-[#DC2626]/[0.06]' : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'}`}>
                  <span className={`text-sm font-semibold ${active ? 'text-[#DC2626]' : 'text-[#0B2A4A]'}`}>{isDe ? c.labelDe : c.labelEn}</span>
                  <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${active ? 'border-[#DC2626] bg-[#DC2626] text-white' : 'border-slate-300 text-transparent group-hover:border-slate-400'}`}>
                    {active ? <Check className="qc-check h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>
          {step > 0 && (
            <button onClick={onBack} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-[#0B2A4A]">
              <ChevronLeft className="h-4 w-4" />{t('Zurück', 'Back')}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

const ResultHeader = ({ isDe, label, icon, onRestart }: { isDe: boolean; label: string; icon: React.ReactNode; onRestart: () => void }) => (
  <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 sm:px-8">
    <div className="flex items-center gap-2.5 text-sm font-semibold text-[#0B2A4A]">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[#DC2626]/10 text-[#DC2626]">{icon}</span>{label}
    </div>
    <button onClick={onRestart} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-[#0B2A4A]">
      <RotateCcw className="h-3.5 w-3.5" />{isDe ? 'Neu starten' : 'Restart'}
    </button>
  </div>
);

// ── Risk check (short & full) ────────────────────────────────────────────
function RiskCheck({ isDe, questions, label }: { isDe: boolean; questions: Question[]; label: string }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pending, setPending] = useState<string | null>(null);
  const [result, setResult] = useState<RiskResult | null>(null);
  const total = questions.length;

  const select = (choiceId: string) => {
    if (pending) return;
    setPending(choiceId);
    const next = { ...answers, [questions[step].id]: choiceId };
    setAnswers(next);
    window.setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setResult(makeRiskResult(next, isDe, questions));
      setPending(null);
    }, 300);
  };
  const back = () => { if (step > 0) setStep(step - 1); };
  const restart = () => { setAnswers({}); setStep(0); setResult(null); };

  const summary = (r: RiskResult) => {
    const lines = questions.map((qq) => { const c = qq.choices.find((x) => x.id === answers[qq.id]); return `• ${qq.titleDe} → ${c ? c.labelDe : '—'}`; });
    return [`=== ${label.toUpperCase()} ===`, `Gefährdungsgrad: ${r.level.labelDe} (${r.score}/100)`, `Branche: ${r.industryName} · Größe: ${r.sizeName}`, `Kennzahlen: ${r.attackRate}% angegriffen · Ø Schaden ${fmtEUR(r.damage)} · ${r.downtime} Tage Ausfall`, '', '--- Antworten ---', ...lines].join('\n');
  };

  const lc = result ? levelColor(result.level.key) : '#DC2626';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-30px_rgba(11,42,74,0.25)]">
      {!result ? (
        <QuestionRunner isDe={isDe} label={label} icon={<ShieldAlert className="h-4 w-4" />} questions={questions} answers={answers} step={step} pending={pending} onSelect={select} onBack={back} />
      ) : (
        <>
          <ResultHeader isDe={isDe} label={label} icon={<ShieldAlert className="h-4 w-4" />} onRestart={restart} />
          <div className="p-6 sm:p-9">
            <div className="qc-result">
              <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{t('Ihr Gefährdungsgrad', 'Your exposure level')}</span>
                  <div className="mt-1 flex items-baseline gap-3">
                    <span className="text-5xl font-extrabold tracking-tight" style={{ color: lc }}>{isDe ? result.level.labelDe : result.level.labelEn}</span>
                    <span className="text-lg font-bold text-slate-300">{result.score}/100</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold" style={{ borderColor: `${lc}55`, color: lc, background: `${lc}12` }}>
                  <AlertTriangle className="h-4 w-4" />{result.industryName} · {result.sizeName}
                </span>
              </div>
              <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="qc-bar h-full rounded-full" style={{ width: `${result.score}%`, background: 'linear-gradient(90deg, #16A34A, #D97706, #DC2626)' }} />
              </div>
              <div className="mt-7 rounded-xl border border-[#DC2626]/20 bg-[#DC2626]/[0.04] p-5 sm:p-6">
                <p className="text-[15px] leading-relaxed text-slate-700">{narrative(result, isDe)}</p>
                <p className="mt-3 text-sm font-semibold text-[#0B2A4A]">{isDe ? CLOSINGS_DE[result.closingIdx] : CLOSINGS_EN[result.closingIdx]}</p>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <Activity className="mx-auto mb-1.5 h-5 w-5 text-[#DC2626]" />
                  <div className="text-xl font-extrabold text-[#0B2A4A]">{result.attackRate}%</div>
                  <div className="text-[10px] uppercase tracking-wide text-slate-400">{t('angegriffen', 'attacked')}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <Euro className="mx-auto mb-1.5 h-5 w-5 text-[#DC2626]" />
                  <div className="text-xl font-extrabold text-[#0B2A4A]">{fmtEUR(result.damage)}</div>
                  <div className="text-[10px] uppercase tracking-wide text-slate-400">{t('Ø Schaden', 'avg. damage')}</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <Clock className="mx-auto mb-1.5 h-5 w-5 text-[#DC2626]" />
                  <div className="text-xl font-extrabold text-[#0B2A4A]">{result.downtime} {t('Tage', 'days')}</div>
                  <div className="text-[10px] uppercase tracking-wide text-slate-400">{t('Ausfall', 'downtime')}</div>
                </div>
              </div>
              <CallbackForm isDe={isDe} getPayload={() => ({ companySize: result.sizeName, additionalInfo: summary(result) })} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Pentest necessity check ──────────────────────────────────────────────
function PentestCheck({ isDe }: { isDe: boolean }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [pending, setPending] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const questions = PENTEST_QUESTIONS;
  const total = questions.length;
  const label = t('Brauche ich einen Pentest?', 'Do I need a pentest?');

  const select = (choiceId: string) => {
    if (pending) return;
    setPending(choiceId);
    const next = { ...answers, [questions[step].id]: choiceId };
    setAnswers(next);
    window.setTimeout(() => {
      if (step < total - 1) setStep(step + 1);
      else setVerdict(computeVerdict(next, isDe));
      setPending(null);
    }, 300);
  };
  const back = () => { if (step > 0) setStep(step - 1); };
  const restart = () => { setAnswers({}); setStep(0); setVerdict(null); };

  const badge = (v: Verdict) => ({ muss: isDe ? 'MUSS' : 'MUST', sollte: isDe ? 'SOLLTE' : 'SHOULD', kann: isDe ? 'KANN' : 'OPTIONAL' }[v.key]);
  const summary = (v: Verdict) => {
    const lines = questions.map((qq) => { const c = qq.choices.find((x) => x.id === answers[qq.id]); return `• ${qq.titleDe} → ${c ? c.labelDe : '—'}`; });
    return [`=== BRAUCHE ICH EINEN PENTEST? ===`, `Ergebnis: ${badge(v)} – ${v.headlineDe}`, `${v.basisLabelDe}: ${v.basisDe}`, v.reasons.length ? `Weitere Gründe:\n${v.reasons.map((r) => `  - ${r.de}`).join('\n')}` : '', '', '--- Antworten ---', ...lines].filter(Boolean).join('\n');
  };

  const vc = verdict ? verdictColor(verdict.key) : '#DC2626';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-30px_rgba(11,42,74,0.25)]">
      {!verdict ? (
        <QuestionRunner isDe={isDe} label={label} icon={<HelpCircle className="h-4 w-4" />} questions={questions} answers={answers} step={step} pending={pending} onSelect={select} onBack={back} />
      ) : (
        <>
          <ResultHeader isDe={isDe} label={label} icon={<HelpCircle className="h-4 w-4" />} onRestart={restart} />
          <div className="p-6 sm:p-9">
            <div className="qc-result">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <span className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-2xl font-extrabold tracking-tight" style={{ borderColor: `${vc}66`, color: vc, background: `${vc}12` }}>
                  {verdict.key === 'kann' ? <ShieldCheck className="h-6 w-6" /> : verdict.key === 'sollte' ? <AlertTriangle className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6" />}
                  {badge(verdict)}
                </span>
                <p className="text-lg font-bold leading-snug text-[#0B2A4A]">{isDe ? verdict.headlineDe : verdict.headlineEn}</p>
              </div>
              <div className="mt-6 rounded-xl border p-5 sm:p-6" style={{ borderColor: `${vc}33`, background: `${vc}0a` }}>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: vc }}>
                  <FileCheck className="h-4 w-4" />{isDe ? verdict.basisLabelDe : verdict.basisLabelEn}
                </div>
                <p className="text-[15px] leading-relaxed text-slate-700">{isDe ? verdict.basisDe : verdict.basisEn}</p>
              </div>
              {verdict.reasons.length > 0 && (
                <div className="mt-5">
                  <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-slate-400">{t('Weitere Gründe für einen Pentest', 'Further reasons for a pentest')}</h4>
                  <ul className="space-y-2.5">
                    {verdict.reasons.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#16A34A]" />
                        <span className="text-sm leading-relaxed text-slate-700">{isDe ? r.de : r.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <CallbackForm isDe={isDe} getPayload={() => ({ companySize: '', additionalInfo: summary(verdict) })} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── Per-variant hero copy ────────────────────────────────────────────────
const COPY: Record<Variant, { labelDe: string; labelEn: string; h1De: string; h1En: string; subDe: string; subEn: string }> = {
  short: {
    labelDe: 'Schnell-Check', labelEn: 'Quick check',
    h1De: 'In 60 Sekunden zur Sicherheits-Einschätzung', h1En: 'A security assessment in 60 seconds',
    subDe: 'Beantworten Sie sechs kurze Fragen zu Ihrem Unternehmen und erhalten Sie sofort eine realistische Einschätzung Ihres Cyber-Risikos – inklusive durchschnittlichem Schaden in Ihrer Branche.',
    subEn: 'Answer six short questions about your company and instantly receive a realistic assessment of your cyber risk – including average damage in your industry.',
  },
  full: {
    labelDe: 'Risiko-Check', labelEn: 'Risk check',
    h1De: 'Wie gefährdet ist Ihr Unternehmen wirklich?', h1En: 'How exposed is your business really?',
    subDe: 'Der ausführliche Sicherheits-Check: 14 gezielte Fragen zeigen Ihnen Ihren Gefährdungsgrad, das Schadenspotenzial in Ihrer Branche und wo Sie konkret nachbessern sollten.',
    subEn: 'The detailed security check: 14 targeted questions reveal your exposure level, the damage potential in your industry and where you should improve.',
  },
  pentest: {
    labelDe: 'Pentest-Pflicht-Check', labelEn: 'Pentest requirement check',
    h1De: 'Brauche ich einen Penetrationstest?', h1En: 'Do I need a penetration test?',
    subDe: 'Muss, sollte oder kann? Sieben Fragen genügen für eine belastbare Antwort – mit konkreter Rechtsgrundlage (DORA, NIS2, MDR, EU AI Act, PCI DSS, ISO 27001, DSGVO) und allen geschäftlichen Gründen.',
    subEn: 'Must, should or could? Seven questions for a solid answer – with the concrete legal basis (DORA, NIS2, MDR, EU AI Act, PCI DSS, ISO 27001, GDPR) and every business reason.',
  },
};

// ── Page shell ───────────────────────────────────────────────────────────
export default function CorporateCheck({ isDe, variant }: { isDe: boolean; variant: Variant }) {
  const t = (de: string, en: string) => (isDe ? de : en);
  const c = COPY[variant];

  return (
    <div className="theme-static min-h-screen bg-white font-sans text-[#1E293B] antialiased">
      <CorporateHeader isDe={isDe} />

      {/* Hero + configurator */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#DC2626]/20 bg-[#DC2626]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#DC2626]">
              <ShieldCheck className="h-3.5 w-3.5" /> {isDe ? c.labelDe : c.labelEn}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-[1.12] tracking-tight text-[#0B2A4A] sm:text-4xl">{isDe ? c.h1De : c.h1En}</h1>
            <p className="mt-4 text-slate-600">{isDe ? c.subDe : c.subEn}</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#16A34A]" /> {t('Ohne Anmeldung', 'No sign-up')}</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#16A34A]" /> {t('Sofortiges Ergebnis', 'Instant result')}</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-[#16A34A]" /> {t('DSGVO-konform', 'GDPR-compliant')}</span>
            </div>
          </div>

          <div className="mt-10">
            {variant === 'pentest'
              ? <PentestCheck isDe={isDe} />
              : <RiskCheck isDe={isDe} questions={variant === 'short' ? SHORT_QUESTIONS : FULL_QUESTIONS} label={isDe ? c.labelDe : c.labelEn} />}
          </div>

          {/* cross-links to the other checks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm">
            <span className="text-slate-400">{t('Anderer Check:', 'Other check:')}</span>
            {variant !== 'short' && <Link href="/corporate/schnellcheck" className="font-semibold text-[#DC2626] hover:underline">{t('Schnell-Check', 'Quick check')}</Link>}
            {variant !== 'full' && <Link href="/corporate/risiko-check" className="font-semibold text-[#DC2626] hover:underline">{t('Risiko-Check', 'Risk check')}</Link>}
            {variant !== 'pentest' && <Link href="/corporate/pentest-check" className="font-semibold text-[#DC2626] hover:underline">{t('Brauche ich einen Pentest?', 'Do I need a pentest?')}</Link>}
          </div>
        </div>
      </section>

      <CorporateContactBand isDe={isDe} />
      <CorporateFooter isDe={isDe} />
    </div>
  );
}
