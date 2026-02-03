"use client";

import { Button } from '@/components/ui/button';
import { CheckCircle, Lock, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const t = useTranslations('home.hero');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                           linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-0 -right-24 sm:right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '4s' }} />
      <div className="absolute -bottom-24 -left-24 sm:bottom-0 sm:left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gray-900/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDuration: '6s', animationDelay: '1s' }} />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight">
                <span className="text-gray-800 inline-block animate-slide-up">
                  {t('title.line1')}
                </span>
                <br />
                <span className="text-gray-800 inline-block animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  {t('title.line2')}
                </span>
                <br />
                <span className=" font-extrabold inline-block animate-slide-up bg-gradient-to-r from-gray-900 to-red-600 bg-clip-text text-transparent"
                  style={{ animationDelay: '0.2s' }}>
                  {t('title.line3')}
                </span>
                <span className="text-red-600 text-4xl sm:text-5xl md:text-6xl lg:text-7xl animate-bounce-slow inline-block ml-1">.</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
                {t('subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Button
                onClick={() => router.push("/request-pentest")}
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                {t('cta.requestPentest')}
              </Button>
              <Button
                size="lg"
                onClick={()=>router.push("/contact")}
                variant="outline"
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('cta.contactUs')}
              </Button>
            </div>

            {/* Certifications */}
            <div className="space-y-3 sm:space-y-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <h3 className="text-red-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                {t('trustedCertified')}
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {t.raw('certifications').map((cert: string, index: number) => (
                  <div
                    key={cert}
                    className="px-4 sm:px-5 lg:px-6 py-2 sm:py-3 bg-gray-200/80 backdrop-blur-sm rounded-full text-gray-700 font-medium text-xs sm:text-sm hover:bg-gray-300 transition-all duration-300 hover:scale-105 cursor-default animate-slide-up"
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Logo Animation */}
          <div className={`relative flex items-center justify-center lg:justify-end transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ animationDelay: '0.4s' }}>
            {/* Decorative Elements */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-gradient-to-br from-red-500/10 to-gray-900/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '3s' }} />
            </div>

            {/* Main Logo Container */}
            <div className="relative z-10 space-y-6 sm:space-y-8 max-w-sm mx-auto lg:mx-0">
              {/* Lock Icon */}
              <div className="flex justify-end animate-float">
                <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl sm:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-110">
                  <Lock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>

              {/* Main Logo */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl sm:shadow-2xl hover:shadow-red-500/20 transition-all duration-500 hover:scale-105 group">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="relative">
                    <div className="absolute inset-0  rounded-xl sm:rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

                    <div className=''>
                      <Image src={"/icons/logo2.png"} height={1000} width={1000} alt='' className='w-full h-32' />
                    </div>

                  </div>
                </div>
              </div>

              {/* Check Icon */}
              <div className="flex justify-start animate-float-delayed mt-6 sm:mt-8">
                <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl sm:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:scale-110">
                  <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @media (min-width: 640px) {
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        }

        @media (min-width: 1024px) {
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite;
          animation-delay: 1s;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}