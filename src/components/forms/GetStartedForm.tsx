'use client';

import { useState, FormEvent } from 'react';
import { ArrowRight, Check, Mail, User, Building2, Github, Phone } from 'lucide-react';

type Plan = 'starter' | 'studio' | 'pro';

type Labels = {
  emailLabel: string;
  emailPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  githubLabel: string;
  githubPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorGeneric: string;
  errorEmail: string;
  errorIdentity: string;
  optional: string;
  legal: string;
};

export function GetStartedForm({ plan, labels }: { plan: Plan; labels: Labels }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [githubOrg, setGithubOrg] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(labels.errorEmail);
      return;
    }
    if (!name.trim() && !company.trim()) {
      setError(labels.errorIdentity);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/get-started', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          email: email.trim(),
          name: name.trim() || undefined,
          company: company.trim() || undefined,
          githubOrg: githubOrg.trim() || undefined,
          phone: phone.trim() || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || labels.errorGeneric);
      } else {
        setSuccess(true);
      }
    } catch {
      setError(labels.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-[#067647]/20 bg-gradient-to-br from-[#ECFDF3] to-white p-10 text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#067647] text-white">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.01em] text-white">{labels.successTitle}</h3>
        <p className="mt-3 text-[#525866]">{labels.successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field
        icon={<Mail className="h-4 w-4" />}
        label={labels.emailLabel}
        required
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={labels.emailPlaceholder}
          required
          autoComplete="email"
          className="w-full bg-transparent text-[15px] text-white placeholder:text-[#9AA0A6] focus:outline-none"
        />
      </Field>

      <div className="grid gap-5 md:grid-cols-2">
        <Field icon={<User className="h-4 w-4" />} label={labels.nameLabel} hint={labels.optional}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={labels.namePlaceholder}
            autoComplete="name"
            className="w-full bg-transparent text-[15px] text-white placeholder:text-[#9AA0A6] focus:outline-none"
          />
        </Field>
        <Field icon={<Building2 className="h-4 w-4" />} label={labels.companyLabel} hint={labels.optional}>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={labels.companyPlaceholder}
            autoComplete="organization"
            className="w-full bg-transparent text-[15px] text-white placeholder:text-[#9AA0A6] focus:outline-none"
          />
        </Field>
      </div>

      <Field icon={<Github className="h-4 w-4" />} label={labels.githubLabel} hint={labels.optional}>
        <input
          type="text"
          value={githubOrg}
          onChange={(e) => setGithubOrg(e.target.value)}
          placeholder={labels.githubPlaceholder}
          className="w-full bg-transparent text-[15px] text-white placeholder:text-[#9AA0A6] focus:outline-none"
        />
      </Field>

      <Field icon={<Phone className="h-4 w-4" />} label={labels.phoneLabel} hint={labels.optional}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={labels.phonePlaceholder}
          autoComplete="tel"
          className="w-full bg-transparent text-[15px] text-white placeholder:text-[#9AA0A6] focus:outline-none"
        />
      </Field>

      {error && (
        <div className="rounded-2xl border border-[#B42318]/20 bg-[#FFF4F2] px-4 py-3 text-sm text-[#B42318]">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="premium-cta inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? labels.submitting : labels.submit}
        {!submitting && <ArrowRight className="h-4 w-4" />}
      </button>

      <p className="text-center text-xs text-[#9AA0A6]">{labels.legal}</p>
    </form>
  );
}

function Field({
  icon,
  label,
  hint,
  required,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="group block rounded-2xl border border-white/10 bg-[#16141A] px-5 py-3.5 transition focus-within:border-[#0A0A0B] focus-within:shadow-[0_0_0_4px_rgba(10,10,11,0.04)] hover:border-black/25">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
          <span className="text-white/60">{icon}</span>
          {label}
          {required && <span className="text-[#FF3B30]">*</span>}
        </span>
        {hint && <span className="text-[10px] text-[#9AA0A6]">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
