"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, FileCode, FileText, Globe, Image, Key, LayoutDashboard, List, Lock, RotateCcw, ShoppingCart, Upload } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import ComprehensiveTesting from '../../../components/service/ComprehensiveTesting';

export default function WebAppPentestLanding() {
  const router = useRouter();
  const t = useTranslations('webApplicationTesting');

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
    { icon: Lock, title: t('scopeCoverage.items.loginSignup.title'), desc: t('scopeCoverage.items.loginSignup.description') },
    { icon: LayoutDashboard, title: t('scopeCoverage.items.dashboard.title'), desc: t('scopeCoverage.items.dashboard.description') },
    { icon: FileCode, title: t('scopeCoverage.items.apis.title'), desc: t('scopeCoverage.items.apis.description') },
    { icon: Upload, title: t('scopeCoverage.items.fileUploads.title'), desc: t('scopeCoverage.items.fileUploads.description') },
    { icon: ShoppingCart, title: t('scopeCoverage.items.paymentFlow.title'), desc: t('scopeCoverage.items.paymentFlow.description') },
    { icon: Key, title: t('scopeCoverage.items.passwordReset.title'), desc: t('scopeCoverage.items.passwordReset.description') },
    { icon: AlertCircle, title: t('scopeCoverage.items.errorHandling.title'), desc: t('scopeCoverage.items.errorHandling.description') },
    { icon: FileText, title: t('scopeCoverage.items.inputValidation.title'), desc: t('scopeCoverage.items.inputValidation.description') }
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
      <div className="relative px-6 py-16 md:px-12 lg:px-24">


        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="w-14 h-14 bg-red-600 rounded-lg flex items-center justify-center mb-6">
              <Globe className="w-8 h-8" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>

            <p className="text-gray-400 text-lg max-w-2xl mb-8">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button onClick={() => router.push("/request-pentest")} className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-base">
                {t('hero.requestPentest')}
              </Button>
              <Button onClick={() => router.push("/contact")} variant="outline" className="border-white text-white bg-black hover:bg-gray-100 hover:text-black px-8 py-6 text-base">
                {t('hero.scheduleConsultation')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* What's Included Section */}
      <div className="bg-white text-black px-6 py-16 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-2">{t('whatsIncluded.title')}</h2>
          <div className="w-16 h-1 bg-red-600 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black rounded flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm leading-relaxed">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scope Coverage Section */}
      <div className="bg-gray-50 text-black px-6 py-16 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-2">{t('scopeCoverage.title')}</h2>
          <div className="w-16 h-1 bg-red-600 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scopeItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables Section */}
      <div className="bg-white text-black px-6 py-16 md:px-12 lg:px-24">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-2">{t('deliverables.title')}</h2>
          <div className="w-16 h-1 bg-red-600 mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliverables.map((item, index) => (
              <Card key={index} className="border-2 border-gray-200 hover:border-red-600 transition-colors">
                <CardContent className="p-6">
                  <item.icon className="w-12 h-12 mb-4" strokeWidth={1.5} />
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <ComprehensiveTesting />
    </div>
  );
}
