"use client";

import { Button } from '@/components/ui/button';
import { ArrowRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function ConsultationCTA() {
  const router = useRouter();
  const t = useTranslations('home.consultationCTA');
  const handleBookCall = () => {
    router.push('/contact');
  };

  const handleRequestPentest = () => {
    router.push('/request-pentest');
    // Add your pentest request logic here
  };

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-red-600 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Circles */}
        <div className="absolute -top-20 -right-20 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '4s' }} />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-white/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }} />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px),
                             linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      {/* Decorative Element at Top */}
      <div className="absolute top-4 sm:top-6 lg:top-8 xl:top-12 left-1/2 transform -translate-x-1/2 w-32 h-4 sm:w-48 sm:h-6 lg:w-64 lg:h-8 bg-white rounded-full opacity-20"></div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Heading */}
        <p className="text-sm sm:text-base text-white/80 font-medium mb-2 sm:mb-3">
          {t('title')}
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-5 lg:mb-6 leading-tight">
          {t('heading')}
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 lg:mb-10 max-w-full sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
          {t('description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5 lg:mb-6">
          <Button
            size="lg"
            onClick={handleBookCall}
            className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl min-w-[140px] sm:min-w-[180px] lg:min-w-[200px] w-full sm:w-auto justify-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            {t('bookCall')}
          </Button>

          <Button
            size="lg"
            onClick={handleRequestPentest}
            className="bg-black text-white hover:bg-gray-900 font-semibold px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 text-sm sm:text-base lg:text-lg rounded-lg sm:rounded-xl min-w-[140px] sm:min-w-[180px] lg:min-w-[200px] w-full sm:w-auto justify-center transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t('requestPentest')}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 sm:ml-2" />
          </Button>
        </div>

        {/* Response Time Notice */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <p className="text-xs sm:text-sm text-white/90 font-medium">
            {t('responseTime')}
          </p>
        </div>
      </div>
    </section>
  );
}
