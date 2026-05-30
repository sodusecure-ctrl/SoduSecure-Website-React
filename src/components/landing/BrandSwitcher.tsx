'use client';

import Link from 'next/link';
import { Shield, Sparkles } from 'lucide-react';
import { useBrand } from './BrandContext';

export default function BrandSwitcher() {
  const { brand, setBrand } = useBrand();

  return (
    <div className="w-full border-b border-white/10 bg-[#050506]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6">
        <Link href="/" className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70 hover:text-white">
          Sodu Secure
        </Link>

        <div className="relative inline-flex items-center rounded-full border border-white/10 bg-white/5 p-1 text-[12px] font-semibold">
          <span
            aria-hidden
            className="absolute top-1 bottom-1 w-1/2 rounded-full bg-[#FF3B30] transition-transform duration-300 ease-out"
            style={{ transform: brand === 'pentest' ? 'translateX(0%)' : 'translateX(100%)' }}
          />
          <button
            type="button"
            onClick={() => setBrand('pentest')}
            className={
              'relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ' +
              (brand === 'pentest' ? 'text-white' : 'text-white/70 hover:text-white')
            }
          >
            <Shield className="h-3.5 w-3.5" />
            <span>/Pentest</span>
          </button>
          <button
            type="button"
            onClick={() => setBrand('auditai')}
            className={
              'relative z-10 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ' +
              (brand === 'auditai' ? 'text-white' : 'text-white/70 hover:text-white')
            }
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>/AuditAI</span>
          </button>
        </div>

        <Link
          href={brand === 'pentest' ? '/request-pentest' : '/contact'}
          className="hidden items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-1.5 text-[12px] font-semibold text-white/85 transition hover:border-white/40 hover:text-white sm:inline-flex"
        >
          {brand === 'pentest' ? 'Pentest anfragen' : 'Demo anfragen'}
        </Link>
      </div>
    </div>
  );
}
