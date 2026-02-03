"use client";

import { Award, Building2, CheckCircle, Eye, Headphones, Lock, Shield, Target, TrendingUp, Users } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '../../components/ui/button';
import Link from 'next/link';

export default function AboutSection() {
  const t = useTranslations('about');

  const pathname = usePathname();

  // Get team members from translations
  const teamMembersData = t.raw('team.members') as Array<{
    name: string;
    role: string;
    certifications: string[];
    image: string;
  }>;

  const teamMembers = teamMembersData.map(member => ({
    name: member.name,
    role: member.role,
    image: member.image,
    tags: member.certifications
  }));

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: t('whyTrust.features.manualTesting.title'),
      description: t('whyTrust.features.manualTesting.description')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('whyTrust.features.certifiedExperts.title'),
      description: t('whyTrust.features.certifiedExperts.description')
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: t('whyTrust.features.clearReporting.title'),
      description: t('whyTrust.features.clearReporting.description')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('whyTrust.features.confidentiality.title'),
      description: t('whyTrust.features.confidentiality.description')
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t('whyTrust.features.fastDelivery.title'),
      description: t('whyTrust.features.fastDelivery.description')
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: t('whyTrust.features.support.title'),
      description: t('whyTrust.features.support.description')
    }
  ];

  const certifications = [
    { name: 'ISO', subtitle: 'ISO 27001' },
    { name: 'OSCP', subtitle: 'Offensive Security' },
    { name: 'CEH', subtitle: 'EC-Council' },
    { name: 'CISSP', subtitle: 'ISC²' },
    { name: 'AWS', subtitle: 'AWS Partner' },
    { name: 'MS', subtitle: 'Microsoft Partner' }
  ];




  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const el = document.getElementById(hash);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <button className="border border-red-600 text-red-600 px-4 sm:px-6 py-2 rounded hover:bg-red-600 hover:text-white transition-colors mb-4 sm:mb-6 text-xs sm:text-sm font-medium">
            {t('hero.badge')}
          </button>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
            {t('hero.title')}
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            {t('hero.description')}
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-600 mb-1 sm:mb-2">10+</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('stats.years')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-600 mb-1 sm:mb-2">500+</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('stats.tests')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-600 mb-1 sm:mb-2">10+</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('stats.countries')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-red-600 mb-1 sm:mb-2">OSCP</div>
              <div className="text-gray-600 text-xs sm:text-sm">{t('stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">
                {t('whoWeAre.title')}
              </h2>

              <div className="space-y-3 sm:space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                {t.raw('whoWeAre.paragraphs').map((paragraph: string, index: number) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image/Visual Section */}
            <div className="relative order-1 lg:order-2">
              <div className="bg-black rounded-lg overflow-hidden h-64 sm:h-72 lg:h-96 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black"></div>

                {/* Shield Icon */}
                <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full border-2 sm:border-3 lg:border-4 border-red-600 flex items-center justify-center">
                    <Building2 className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-red-600" />
                  </div>
                  <p className="text-white text-center text-xs sm:text-sm max-w-xs px-4">
                    {t('whoWeAre.imageAlt')}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-12 h-12 sm:w-16 sm:h-16 border border-red-600/30 rounded-lg"></div>
                <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 w-12 h-12 sm:w-20 sm:h-20 border border-red-600/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Values Section */}
      <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('mission.title')}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              {t('mission.subtitle')}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Integrity */}
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 border border-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('mission.values.integrity.title')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('mission.values.integrity.description')}
              </p>
            </div>

            {/* Accuracy */}
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 border border-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('mission.values.accuracy.title')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('mission.values.accuracy.description')}
              </p>
            </div>

            {/* Transparency */}
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 border border-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('mission.values.transparency.title')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('mission.values.transparency.description')}
              </p>
            </div>

            {/* Security First */}
            <div className="text-center group">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 border border-red-600 rounded-lg flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <Lock className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-red-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{t('mission.values.securityFirst.title')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('mission.values.securityFirst.description')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div id='#team' className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 sm:mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg mb-2 sm:mb-3">
              <span className="font-semibold text-lg sm:text-xl lg:text-2xl">{t('team.title')}</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">{member.role}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {member.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('whyTrust.title')}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              {t('whyTrust.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto mb-4 sm:mb-6 text-red-600 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t('certifications.title')}</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {t('certifications.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{cert.name}</div>
                  <div className="text-xs text-gray-500">{cert.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-red-600 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
            {t('cta.title')}
          </h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <Link href="/request-pentest">
            <Button
              className="bg-white text-red-600 hover:bg-gray-100 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
            >
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}