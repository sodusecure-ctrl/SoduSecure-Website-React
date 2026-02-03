import { AlertTriangle, ArrowRight, Cpu, FileText, Plus, Shield, Terminal, TrendingUp, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from '../ui/button';
import { useTranslations } from 'next-intl';

export default function ComprehensiveTesting() {
  const [isOpen, setIsOpen] = React.useState(true);
  const [openFAQ, setOpenFAQ] = React.useState<number | null>(null);
  const router = useRouter();
  const t = useTranslations('serviceCommon');
  
  const faqItems = t.raw('faq.items') as Array<{question: string; answer: string}>;

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Close Button */}
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 hover:bg-gray-800 rounded-full transition-colors z-50"
        aria-label="Close"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Testing Approach Section */}
      <div className="px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{t('testingApproach.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-12 md:mb-16">
            {/* Manual Testing Card */}
            <div className="border border-gray-800 rounded-lg p-4 sm:p-6 bg-black">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{t('testingApproach.manualTesting.title')}</h3>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {(t.raw('testingApproach.manualTesting.items') as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <span className="text-red-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Automated Scanning Card */}
            <div className="border border-gray-800 rounded-lg p-4 sm:p-6 bg-black">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold">{t('testingApproach.automatedScanning.title')}</h3>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {(t.raw('testingApproach.automatedScanning.items') as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                    <span className="text-red-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Industry Standards */}
          <div className="border border-gray-800 rounded-lg p-4 sm:p-6 bg-black">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-red-600 rounded flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold">{t('testingApproach.industryStandards.title')}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <h4 className="text-red-600 font-bold text-xs sm:text-sm mb-1 sm:mb-2">{t('testingApproach.industryStandards.owasp.title')}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {t('testingApproach.industryStandards.owasp.description')}
                </p>
              </div>
              <div>
                <h4 className="text-red-600 font-bold text-xs sm:text-sm mb-1 sm:mb-2">{t('testingApproach.industryStandards.osstmm.title')}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {t('testingApproach.industryStandards.osstmm.description')}
                </p>
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <h4 className="text-red-600 font-bold text-xs sm:text-sm mb-1 sm:mb-2">{t('testingApproach.industryStandards.nist.title')}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {t('testingApproach.industryStandards.nist.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why This Test Matters Section */}
      <div className="bg-white text-black px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{t('whyMatters.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Business Impact Card */}
            <div className="border-2 border-gray-200 rounded-lg p-4 sm:p-6 bg-white">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                <h3 className="text-lg sm:text-xl font-bold">{t('whyMatters.businessImpact.title')}</h3>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {(t.raw('whyMatters.businessImpact.items') as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Compliance Benefits Card */}
            <div className="border-2 border-gray-900 rounded-lg p-4 sm:p-6 bg-black text-white">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                <h3 className="text-lg sm:text-xl font-bold">{t('whyMatters.complianceBenefits.title')}</h3>
              </div>

              <ul className="space-y-2 sm:space-y-3">
                {(t.raw('whyMatters.complianceBenefits.items') as string[]).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                    <span className="text-red-600 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 text-black px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">{t('faq.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="space-y-3 sm:space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg bg-white  transition-shadow"
              >
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 text-left cursor-pointer transition-colors"
                  aria-expanded={openFAQ === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-medium text-sm sm:text-base pr-3 sm:pr-4">{item.question}</span>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-black rounded flex items-center justify-center flex-shrink-0">
                    <Plus className={`w-3 h-3 sm:w-4 sm:h-4 text-white transition-transform duration-300 ${openFAQ === index ? 'rotate-45' : ''}`} />
                  </div>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${openFAQ === index ? 'max-h-96' : 'max-h-0'}`}
                >
                  <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 text-gray-600 text-xs sm:text-sm">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="relative w-full  bg-black flex items-center justify-center overflow-hidden">
        {/* Red border top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

        {/* Red border bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600"></div>

        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Content container */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          {/* Main heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            {t('cta.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            {t('cta.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => router.push("/request-pentest")}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-base font-medium transition-all duration-200 shadow-lg shadow-red-600/50 hover:shadow-red-600/70 group"
              size="lg"
            >
              {t('cta.requestPentest')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="outline"
              className="border border-white text-white bg-black hover:bg-white hover:text-black px-8 py-6 text-base font-medium transition-all duration-200"
              size="lg"
            >
              {t('cta.scheduleCall')}
            </Button>
          </div>
        </div>

        {/* Ambient glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl"></div>
      </div>


    </div>
  );
}