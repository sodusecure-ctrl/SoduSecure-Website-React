"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, CheckCircle, Clock, Shield, Target } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CaseStudyDetail() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const t = useTranslations('caseStudyDetail');

  const handleBack = () => {
    window.history.back();
  };

  const handleRequestPentest = () => {
    router.push('/request-pentest');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 sm:mb-6 text-sm sm:text-base"
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{t('backToCaseStudies')}</span>
          </button>

          <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-4">
            <Badge variant="outline" className="border-red-500 text-red-500 text-xs sm:text-sm">
              {t('category')}
            </Badge>
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('date')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('duration')}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            {t('title')}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">
            {t('description')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8 sm:space-y-12">
            {/* Client Overview Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{t('sections.clientOverview.title')}</h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-6">
                {t('sections.clientOverview.content')}
              </p>

              <div className="bg-gray-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-r-lg my-6 sm:my-8">
                <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 text-lg sm:text-xl flex items-center gap-2">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  {t('sections.clientOverview.challenge.title')}
                </h3>
                <p className="text-gray-700 text-sm sm:text-base mb-4">{t('sections.clientOverview.challenge.intro')}</p>
                <ul className="space-y-2.5 sm:space-y-3">
                  {Array.from({ length: 5 }, (_, i) => t(`sections.clientOverview.challenge.items.${i}`)).map((item, index) => (
                    <li key={index} className="flex gap-2.5 sm:gap-3">
                      <span className="text-red-500 font-bold mt-0.5 text-lg">▸</span>
                      <span className="text-gray-700 text-sm sm:text-base flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Our Approach Section */}
            <section className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{t('sections.ourApproach.title')}</h2>

              <div className="space-y-6 sm:space-y-8">
                {Array.from({ length: 4 }, (_, i) => ({
                  phase: t(`sections.ourApproach.phases.${i}.phase`),
                  description: t(`sections.ourApproach.phases.${i}.description`),
                  icon: i === 0 || i === 2 ? Shield : i === 1 ? Target : CheckCircle
                })).map((phase, index) => (
                  <div key={index} className="border-l-4 border-red-500 pl-4 sm:pl-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <phase.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{phase.phase}</h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Findings - Mobile Accordion */}
            <div className="lg:hidden">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">{t('sections.keyFindings.title')}</h3>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-gray-200 space-y-4">
                    {[
                      "Critical SQL injection in payment processing module",
                      "Broken authentication allowing bypass of 2FA",
                      "Server-side request forgery (SSRF) in file upload feature",
                      "Insecure direct object references exposing sensitive data",
                      "Cross-site scripting (XSS) in customer portal"
                    ].map((finding, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <span className="text-gray-700 text-sm sm:text-base">{finding}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Results & Impact Section */}
            <section className="bg-black text-white rounded-lg overflow-hidden">
              <div className="p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8">{t('sections.impactAnalysis.title')}</h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">98%</div>
                    <div className="text-gray-400 text-xs sm:text-sm">Vulnerabilities Fixed</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">5 Days</div>
                    <div className="text-gray-400 text-xs sm:text-sm">To Pass Compliance</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg col-span-2 sm:col-span-1">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-500 mb-1 sm:mb-2">{t('sections.impactAnalysis.metrics.potentialLoss')}</div>
                    <div className="text-gray-400 text-xs sm:text-sm">Potential Loss Prevented</div>
                  </div>
                </div>

                {/* Testimonial */}
                <blockquote className="border-l-4 border-red-500 pl-4 sm:pl-6 mb-6">
                  <p className="text-base sm:text-lg italic mb-3 sm:mb-4">
                    &ldquo;{t('testimonials.quote')}&rdquo;
                  </p>
                  <cite className="text-gray-400 text-sm not-italic">
                    — {t('testimonials.author')}
                  </cite>
                </blockquote>
              </div>
            </section>

            {/* Mobile CTA Button */}
            <div className="lg:hidden">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-6 text-base"
                onClick={handleRequestPentest}
              >
                {t('cta.buttonText')}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4 sm:space-y-6">
              {/* Project Details Card */}
              <Card className="border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4">Project Details</h3>

                  <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <div>
                      <div className="text-gray-500 mb-1">Industry</div>
                      <div className="text-gray-900 font-semibold">{t('category')}</div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="text-gray-500 mb-1">Service Type</div>
                      <div className="text-gray-900 font-semibold">Web Application Security</div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="text-gray-500 mb-1">Project Duration</div>
                      <div className="text-gray-900 font-semibold">{t('duration')}</div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="text-gray-500 mb-1">Year Completed</div>
                      <div className="text-gray-900 font-semibold">2024</div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 sm:pt-4">
                      <div className="text-gray-500 mb-1">Compliance</div>
                      <div className="text-gray-900 font-semibold">PCI DSS, ISO 27001</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Findings - Desktop */}
              <div className="hidden lg:block">
                <Card className="border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{t('sections.keyFindings.title')}</h3>
                    <ul className="space-y-3">
                      {[
                        t('sections.keyFindings.critical.items.0'),
                        t('sections.keyFindings.critical.items.1'),
                        t('sections.keyFindings.critical.items.2'),
                        t('sections.keyFindings.high.items.0'),
                        t('sections.keyFindings.high.items.1')
                      ].map((finding, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold">{index + 1}</span>
                          </div>
                          <span className="text-gray-700 text-sm">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Tools & Technologies Card */}
              <Card className="border-gray-200">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {["Burp Suite Pro", "Nmap", "Metasploit", "OWASP ZAP", "SQLMap", "Custom Scripts", "Postman", "Wireshark"].map((tool, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-gray-100 text-gray-900 hover:bg-gray-200 text-xs sm:text-sm"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA Card */}
              <Card className="bg-red-600 text-white border-0">
                <CardContent className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('cta.title')}</h3>
                  <p className="text-sm mb-4 sm:mb-6 text-red-50">
                    {t('cta.description')}
                  </p>
                  <Button
                    className="w-full bg-white text-red-600 hover:bg-gray-100 font-semibold py-3 sm:py-4 text-sm sm:text-base"
                    onClick={handleRequestPentest}
                  >
                    {t('cta.buttonText')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Services Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{t('relatedServices.title')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: t('relatedServices.services.0.title'), desc: t('relatedServices.services.0.desc'), route: "/services/api-security-testing" },
              { title: t('relatedServices.services.1.title'), desc: t('relatedServices.services.1.desc'), route: "/services/cloud-devops-testing" },
              { title: t('relatedServices.services.2.title'), desc: t('relatedServices.services.2.desc'), route: "/services/mobile-app-testing" },
            ].map((service, index) => (
              <Card key={index} className="border-gray-200 hover:border-red-300 transition-colors">
                <CardContent className="p-4 sm:p-6">
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">{service.title}</h4>
                  <p className="text-gray-600 text-sm sm:text-base mb-4">{service.desc}</p>
                  <Button onClick={() => router.push(service.route)} variant="link" className="text-red-600 hover:text-red-700 p-0 text-sm sm:text-base">
                    {t('relatedServices.learnMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Floating CTA for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold text-sm">Ready to secure your application?</p>
            <p className="text-gray-600 text-xs">Get a comprehensive security assessment</p>
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2.5 text-sm"
            onClick={handleRequestPentest}
          >
            Request Now
          </Button>
        </div>
      </div>
    </div>
  );
}