"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, FileText, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

export default function CertificationsToolsSection() {
  const t = useTranslations('home.certificationsTools');
  const certifications = t.raw('certifications') as string[];
  const compliance = t.raw('compliance') as string[];
  const tools = t.raw('toolsList') as string[];
  const methodologies = t.raw('methodologies') as string[];

  const handleDownloadReport = () => {
    toast.error(t('toastNotReady'));

  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {/* Certifications & Compliance Section */}
          <div>
            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-600 flex-shrink-0 flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {t('title')}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {t('subtitle')}
                </p>
              </div>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-gray-50 border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <div className="text-red-600"><Shield className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{cert}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Compliance Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {compliance.map((item, index) => (
                <Card key={index} className="bg-gray-50 border-gray-200 hover:border-gray-300 transition-colors">
                  <CardContent className="p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                    <div className="text-red-600"><FileText className="w-4 h-4 sm:w-5 sm:h-5" /></div>
                    <span className="font-medium text-gray-900 text-sm sm:text-base">{item}</span>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Confidentiality Notice */}
            <Card className="bg-gray-50 border-gray-200 mb-6 sm:mb-8">
              <CardContent className="p-4 sm:p-6">
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {t('confidentiality')}
                </p>
              </CardContent>
            </Card>

            {/* Download Button */}
            <Button
              variant="outline"
              className="w-full sm:w-auto border-gray-300 text-gray-900 hover:bg-gray-50 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              onClick={handleDownloadReport}
            >
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              {t('button')}
            </Button>
          </div>

          {/* Tools & Methodology Section */}
          <div>
            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-red-600 flex-shrink-0 flex items-center justify-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {t('toolsTitle')}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  {t('toolsSubtitle')}
                </p>
              </div>
            </div>

            {/* Security Testing Tools */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                {t('testingToolsLabel')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 text-gray-900 hover:bg-gray-200 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-normal"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Testing Methodology */}
            <Card className="bg-black text-white border-0">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">{t('testingMethodology')}</h3>
                <ul className="space-y-3 sm:space-y-4">
                  {methodologies.map((method, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <span className="text-red-600 mt-0.5 sm:mt-1 flex-shrink-0">▸</span>
                      <span className="text-gray-300 text-sm sm:text-base">{method}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
