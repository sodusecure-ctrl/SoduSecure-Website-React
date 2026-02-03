"use client";

import { Award, FileText, HandMetal, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function WhyChooseSection() {
  const t = useTranslations('home.whyChoose');
  const features = [
    {
      icon: <HandMetal className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: t('features.manualTesting.title'),
      description: t('features.manualTesting.description')
    },
    {
      icon: <Award className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: t('features.certifiedExperts.title'),
      description: t('features.certifiedExperts.description')
    },
    {
      icon: <FileText className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: t('features.clearDocumentation.title'),
      description: t('features.clearDocumentation.description')
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
      title: t('features.fastDelivery.title'),
      description: t('features.fastDelivery.description')
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto px-2 sm:px-0">
            {t('subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-red-50 text-red-600 mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
          <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 rounded-xl sm:rounded-2xl p-1 shadow-lg">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-sm sm:text-base lg:text-lg text-gray-800 mb-3 sm:mb-4 font-medium">
                {t('cta.title')}
              </p>
              <Link href="/request-pentest" className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg text-sm sm:text-base">
                {t('cta.button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}