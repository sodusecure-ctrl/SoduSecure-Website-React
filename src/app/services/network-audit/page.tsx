"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, FileText, Globe, Image, List, Lock, Network, RotateCcw, Shield, Target, Wifi } from 'lucide-react';
import ComprehensiveTesting from '../../../components/service/ComprehensiveTesting';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function NetworkSecurityAuditLanding() {
  const router = useRouter();
  const t = useTranslations('networkAudit');
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
    { icon: Shield, title: t('scopeCoverage.items.firewallSecurity.title'), desc: t('scopeCoverage.items.firewallSecurity.description') },
    { icon: Network, title: t('scopeCoverage.items.networkSegmentation.title'), desc: t('scopeCoverage.items.networkSegmentation.description') },
    { icon: Wifi, title: t('scopeCoverage.items.wirelessSecurity.title'), desc: t('scopeCoverage.items.wirelessSecurity.description') },
    { icon: Lock, title: t('scopeCoverage.items.vpnSecurity.title'), desc: t('scopeCoverage.items.vpnSecurity.description') },
    { icon: Globe, title: t('scopeCoverage.items.routingProtocols.title'), desc: t('scopeCoverage.items.routingProtocols.description') },
    { icon: Target, title: t('scopeCoverage.items.networkMonitoring.title'), desc: t('scopeCoverage.items.networkMonitoring.description') },
    { icon: AlertCircle, title: t('scopeCoverage.items.accessControls.title'), desc: t('scopeCoverage.items.accessControls.description') },
    { icon: List, title: t('scopeCoverage.items.trafficAnalysis.title'), desc: t('scopeCoverage.items.trafficAnalysis.description') }
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
      <div className="relative px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6 md:mb-8">
            {/* Logo/Badge */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-600 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
              <Network className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-snug sm:leading-tight">
              {t('hero.title')}
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-full sm:max-w-2xl mb-6 sm:mb-8 leading-relaxed">
              {t('hero.description')}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button onClick={() => router.push("/request-pentest")} className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto justify-center">
                {t('hero.requestPentest')}
              </Button>
              <Button onClick={() => router.push("/contact")} variant="outline" className="border-white text-white bg-black hover:bg-gray-100 hover:text-black px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base w-full sm:w-auto justify-center">
                {t('hero.scheduleConsultation')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included Section */}
      <div className="bg-white text-black px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('whatsIncluded.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {includedItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-2 sm:p-3 hover:bg-gray-50 rounded-lg transition-colors">
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
      <div className="bg-gray-50 text-black px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('scopeCoverage.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {scopeItems.map((item, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow h-full bg-white">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="bg-white text-black px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{t('deliverables.title')}</h2>
          <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {deliverables.map((item, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-red-600 transition-colors h-full hover:shadow-lg">
                <CardContent className="p-4 sm:p-6">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 mb-3 sm:mb-4" strokeWidth={1.5} />
                  <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{item.desc}</p>
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