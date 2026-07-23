"use client"

import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Code, FileCode, FileText, Image, List, Lock, RotateCcw, Shield, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ComprehensiveTesting from '../../../components/service/ComprehensiveTesting';

export default function APISecurityTestingLanding() {
  const router = useRouter();
  const t = useTranslations('apiSecurityTesting');
  const includedItems = [
    { text: t('whatsIncluded.items.0') },
    { text: t('whatsIncluded.items.1') },
    { text: t('whatsIncluded.items.2') },
    { text: t('whatsIncluded.items.3') },
    { text: t('whatsIncluded.items.4') },
    { text: t('whatsIncluded.items.5') },
    { text: t('whatsIncluded.items.6') },
    { text: t('whatsIncluded.items.7') }
  ];

  const scopeItems = [
    { icon: FileCode, title: t('scopeCoverage.items.restApis.title'), desc: t('scopeCoverage.items.restApis.description') },
    { icon: Code, title: t('scopeCoverage.items.graphql.title'), desc: t('scopeCoverage.items.graphql.description') },
    { icon: Code, title: t('scopeCoverage.items.microservices.title'), desc: t('scopeCoverage.items.microservices.description') },
    { icon: Lock, title: t('scopeCoverage.items.authentication.title'), desc: t('scopeCoverage.items.authentication.description') },
    { icon: Zap, title: t('scopeCoverage.items.rateLimiting.title'), desc: t('scopeCoverage.items.rateLimiting.description') },
    { icon: Shield, title: t('scopeCoverage.items.authorization.title'), desc: t('scopeCoverage.items.authorization.description') },
    { icon: FileText, title: t('scopeCoverage.items.inputValidation.title'), desc: t('scopeCoverage.items.inputValidation.description') },
    { icon: AlertCircle, title: t('scopeCoverage.items.errorHandling.title'), desc: t('scopeCoverage.items.errorHandling.description') }
  ];

  const deliverables = [
    { icon: FileText, title: t('deliverables.items.fullReport.title'), desc: t('deliverables.items.fullReport.description') },
    { icon: List, title: t('deliverables.items.findingsList.title'), desc: t('deliverables.items.findingsList.description') },
    { icon: Image, title: t('deliverables.items.screenshotsPoc.title'), desc: t('deliverables.items.screenshotsPoc.description') },
    { icon: RotateCcw, title: t('deliverables.items.freeRetest.title'), desc: t('deliverables.items.freeRetest.description') }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-6 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24">
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.04em] text-white/65">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.8)]" />
            <FileCode className="h-3.5 w-3.5 text-[#FF3B30]" />
          </div>
          <h1 className="mt-8 max-w-5xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] [text-wrap:balance] sm:text-[44px] sm:leading-[1.04] md:text-6xl lg:text-7xl">
            <span className="premium-silver">{t('hero.title')}</span>
          </h1>
          <p className="mt-6 flex max-w-2xl items-start gap-3 text-base leading-relaxed text-white/70 sm:mt-7 md:text-lg">
            <span aria-hidden className="mt-[0.75em] h-[2px] w-8 shrink-0 rounded-full bg-gradient-to-r from-[#FF3B30] to-[#FF3B30]/0 sm:w-12" />
            <span>{t('hero.description')}</span>
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <button onClick={() => router.push("/request-pentest")} className="premium-cta inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white">
              {t('hero.requestPentest')}
            </button>
            <button onClick={() => router.push("/contact")} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]">
              {t('hero.scheduleConsultation')}
            </button>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <div className="bg-[#0a0a0a] text-white border-y border-zinc-900 px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('whatsIncluded.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {includedItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-2 sm:p-3 hover:bg-white/5 rounded-lg transition-colors">
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-xs sm:text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scope Coverage Section */}
      <div className="bg-black text-white px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('scopeCoverage.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {scopeItems.map((item, index) => (
              <Card key={index} className="border border-zinc-800 hover:border-red-600/60 transition-all h-full bg-[#16141A] hover:bg-zinc-900/80 shadow-none">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/10 border border-red-600/30 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="bg-[#0a0a0a] text-white border-t border-zinc-900 px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('deliverables.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {deliverables.map((item, index) => (
              <Card key={index} className="border border-zinc-800 hover:border-red-600 transition-all h-full bg-[#16141A] shadow-none">
                <CardContent className="p-4 sm:p-6">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4 text-red-500" strokeWidth={1.5} />
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Testing Component */}
      <ComprehensiveTesting />
    </div>
  );
}
