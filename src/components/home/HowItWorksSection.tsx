"use client";

import { ClipboardList, FileText, RotateCcw, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function HowItWorksSection() {
  const router = useRouter();
  const t = useTranslations('home.howItWorks');
  const steps = [
    {
      number: "01",
      icon: <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: t('steps.scope.title'),
      items: t.raw('steps.scope.items')
    },
    {
      number: "02",
      icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: t('steps.testing.title'),
      items: t.raw('steps.testing.items')
    },
    {
      number: "03",
      icon: <FileText className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: t('steps.reporting.title'),
      items: t.raw('steps.reporting.items')
    },
    {
      number: "04",
      icon: <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: t('steps.retest.title'),
      items: t.raw('steps.retest.items')
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0">
            {t('subtitle')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Lines */}
              {/* Horizontal connector for mobile/tablet */}
              {index < steps.length - 1 && (
                <>
                  {/* Horizontal connector for mobile/tablet */}
                  <div className="block sm:block lg:hidden absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gray-800"></div>

                  {/* Horizontal connector for 2-column layout */}
                  <div className="hidden sm:block lg:hidden absolute top-1/2 left-full w-8 h-0.5 bg-gray-800 -ml-4"
                    style={{ display: index % 2 === 0 && index < steps.length - 1 ? 'block' : 'none' }}>
                  </div>

                  {/* Horizontal connector for desktop */}
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 -ml-4"
                    style={{ width: 'calc(100% - 2rem)' }}>
                  </div>
                </>
              )}

              {/* Step Content */}
              <div className="relative z-10 bg-gray-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-gray-800/50 transition-all duration-300 hover:scale-[1.02] border border-gray-800/50">
                {/* Icon and Number - Responsive layout */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                    <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">
                      {step.number}
                    </span>
                  </div>

                  {/* Title for mobile - moved here for better vertical flow */}
                  <h3 className="text-xl sm:text-2xl font-bold sm:ml-auto lg:hidden">
                    {step.title}
                  </h3>
                </div>

                {/* Title for desktop */}
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 hidden lg:block">
                  {step.title}
                </h3>

                {/* Items List */}
                <ul className="space-y-2 sm:space-y-3">
                  {step.items.map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-400">
                      <span className="text-red-600 mt-1 flex-shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 rounded-xl sm:rounded-2xl p-1 shadow-lg">
            <div className="bg-black rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-3 sm:mb-4 font-medium">
                {t('cta.text')}
              </p>
              <button onClick={() => router.push("/request-pentest")} className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base w-full sm:w-auto">
                {t('cta.button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
