"use client";
import { ArrowRight, Briefcase, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function CareersPage() {
  const router = useRouter();
  const t = useTranslations('careers');
  const benefits = [
    {
      title: t('whyWorkWithUs.benefits.cuttingEdgeWork.title'),
      description: t('whyWorkWithUs.benefits.cuttingEdgeWork.description')
    },
    {
      title: t('whyWorkWithUs.benefits.continuousLearning.title'),
      description: t('whyWorkWithUs.benefits.continuousLearning.description')
    },
    {
      title: t('whyWorkWithUs.benefits.workLifeBalance.title'),
      description: t('whyWorkWithUs.benefits.workLifeBalance.description')
    },
    {
      title: t('whyWorkWithUs.benefits.collaborativeCulture.title'),
      description: t('whyWorkWithUs.benefits.collaborativeCulture.description')
    },
    {
      title: t('whyWorkWithUs.benefits.competitiveBenefits.title'),
      description: t('whyWorkWithUs.benefits.competitiveBenefits.description')
    },
    {
      title: t('whyWorkWithUs.benefits.makeAnImpact.title'),
      description: t('whyWorkWithUs.benefits.makeAnImpact.description')
    }
  ];

  const positions = [
    {
      _id: 1,
      title: t('openPositions.positions.seniorPenetrationTester.title'),
      type: t('openPositions.positions.seniorPenetrationTester.type'),
      location: t('openPositions.positions.seniorPenetrationTester.location'),
      description: t('openPositions.positions.seniorPenetrationTester.description')
    },
    {
      _id: 2,
      title: t('openPositions.positions.juniorPenetrationTester.title'),
      type: t('openPositions.positions.juniorPenetrationTester.type'),
      location: t('openPositions.positions.juniorPenetrationTester.location'),
      description: t('openPositions.positions.juniorPenetrationTester.description')
    },
    {
      _id: 3,
      title: t('openPositions.positions.werkstudentPenetrationTester.title'),
      type: t('openPositions.positions.werkstudentPenetrationTester.type'),
      location: t('openPositions.positions.werkstudentPenetrationTester.location'),
      description: t('openPositions.positions.werkstudentPenetrationTester.description')
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <button className="border border-red-600 text-red-600 px-4 sm:px-6 py-2 rounded hover:bg-red-600 hover:text-white transition-colors mb-4 sm:mb-6 text-xs sm:text-sm font-medium">
            {t('hero.badge')}
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl">
            {t('hero.description')}
          </p>
        </div>
      </div>

      {/* Why Work With Us Section */}
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('whyWorkWithUs.title')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              {t('whyWorkWithUs.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('openPositions.title')}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              <span className="font-semibold text-red-600">{positions.length}</span> {t('openPositions.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {positions.map((position) => (
              <div
                key={position._id}
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight">
                    {position.title}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 w-fit sm:w-auto">
                    {position.type}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-xs sm:text-sm">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{position.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 text-xs sm:text-sm">
                    <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>Full-time</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  {position.description}
                </p>

                <button
                  onClick={() => router.push(`/careers/${position._id}`)}
                  className="text-red-600 cursor-pointer font-semibold text-sm sm:text-base flex items-center gap-1.5 sm:gap-2 hover:gap-3 transition-all group w-fit"
                  aria-label={`View details for ${position.title}`}
                >
                  <span>{t('openPositions.viewDetails')}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6">
            {t('cta.description')}
          </p>
          <a 
            href={`mailto:${t('cta.email')}`}
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base lg:text-lg font-semibold rounded-lg transition-colors"
          >
            {t('cta.email')}
          </a>
        </div>
      </div>

      {/* Additional Info Section for Mobile */}
      <div className="lg:hidden bg-gray-50 py-6 sm:py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800">
              {t('applicationProcess.title')}
            </h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">{t('applicationProcess.steps.submitApplication.title')}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('applicationProcess.steps.submitApplication.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">{t('applicationProcess.steps.technicalInterview.title')}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('applicationProcess.steps.technicalInterview.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">{t('applicationProcess.steps.teamInterview.title')}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('applicationProcess.steps.teamInterview.description')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <p className="font-medium text-sm sm:text-base mb-1">{t('applicationProcess.steps.offerOnboarding.title')}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{t('applicationProcess.steps.offerOnboarding.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
