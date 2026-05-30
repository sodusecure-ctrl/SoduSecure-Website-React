import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';

export const COLORS = {
  ink: '#0A0A0B',
  inkSoft: '#1A1A1C',
  yellow: '#FF3B30',
  yellowHover: '#E5332A',
  yellowSoft: '#FEE4E4',
  muted: '#525866',
  mutedLight: '#6B7280',
};

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#16141A] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
      {children}
    </span>
  );
}

export function SectionLabelDark({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
      <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
      {children}
    </span>
  );
}

type CTAProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'yellow';
  className?: string;
};

export function CTA({ href, children, variant = 'primary', className = '' }: CTAProps) {
  const styles: Record<string, string> = {
    primary: 'bg-[#0A0A0B] text-white hover:bg-[#1A1A1C] border border-[#0A0A0B]',
    secondary: 'bg-[#16141A] text-white border border-white/10 hover:border-white/20',
    ghost: 'text-white hover:text-black underline-offset-4 hover:underline border border-transparent',
    yellow: 'bg-[#FF3B30] text-white hover:bg-[#E5332A] border border-[#FF3B30]',
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`}
    >
      {children}
      {variant !== 'ghost' && <ArrowRight className="h-4 w-4" />}
    </Link>
  );
}

export function StatRow({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-4">
      {items.map((s) => (
        <div key={s.label} className="bg-[#16141A] p-5">
          <div className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">{s.value}</div>
          <div className="mt-1 text-xs uppercase tracking-wider text-[#6B7280]">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export function FeatureCard({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon?: ReactNode;
}) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 premium-card p-6 transition hover:border-[#FF3B30] hover:shadow-[0_8px_30px_rgb(255,59,48,0.12)]">
      {icon && (
        <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0B] text-[#FF3B30]">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#525866]">{text}</p>
    </article>
  );
}
