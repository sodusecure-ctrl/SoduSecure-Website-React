import { Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const serviceLabels = t.raw('sections.services.links') as string[];
  const companyLabels = t.raw('sections.company.links') as string[];
  const resourceLabels = t.raw('sections.resources.links') as string[];

  const serviceLinks = [
    { label: serviceLabels?.[0], href: '/services/infrastructure-testing' },
    { label: serviceLabels?.[1], href: '/services/web-application-testing' },
    { label: serviceLabels?.[2], href: '/services/mobile-app-testing' },
    { label: serviceLabels?.[3], href: '/services/api-security-testing' },
    { label: serviceLabels?.[4], href: '/services/cloud-devops-testing' }
  ];

  const companyLinks = [
    { label: companyLabels?.[0], href: '/about' },
    { label: companyLabels?.[1], href: '/about#team' },
    { label: companyLabels?.[2], href: '/careers' },
    { label: companyLabels?.[3], href: '/case-studies' },
    { label: companyLabels?.[4], href: '/contact' }
  ];

  const resourceLinks = [
    { label: resourceLabels?.[0], href: '/case-studies' },
    { label: resourceLabels?.[1], href: '/case-studies/study/5' },
    { label: resourceLabels?.[2], href: '/contact' },
    { label: resourceLabels?.[3], href: '/services/network-audit' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10 lg:mb-12">
          {/* Company Info - Full width on mobile, 2 columns on sm, 1 column on lg+ */}
          <div className="space-y-4 lg:space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <Image
                  src={"/icons/logo.png"}
                  height={900}
                  width={900}
                  alt='Logo'
                  className='w-full h-full rounded shadow'
                />
              </div>
              <span className="text-white text-lg lg:text-xl font-semibold">{t('brand')}</span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              {t('tagline')}
            </p>

            <div className="space-y-2 lg:space-y-3">
              <a
                href="mailto:contact@sodusecure.com"
                className="flex items-center gap-2 lg:gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all lg:break-normal">{t('contact.email')}</span>
              </a>

              <a
                href="tel:+12345678900"
                className="flex items-center gap-2 lg:gap-3 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0" />
                {t('contact.phone')}
              </a>

              <div className="flex items-start gap-2 lg:gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{t('contact.location')}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 lg:mb-6">{t('sections.services.title')}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {serviceLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 lg:mb-6">{t('sections.company.title')}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 lg:mb-6">{t('sections.resources.title')}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {resourceLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6 lg:mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Legal Links - Stack on mobile, row on md+ */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            <Link
              href="/privacy"
              className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm py-1"
            >
              {t('legal.privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm py-1"
            >
              {t('legal.terms')}
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 lg:gap-4">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-6 lg:mt-8 mb-4 lg:mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-xs lg:text-sm">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="text-gray-600 text-xs mt-2">
            {t('trustLine')}
          </p>
        </div>

        {/* Mobile Optimizations */}
        <div className="lg:hidden mt-8 pt-6 border-t border-gray-800">
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-4">
              {t('contact.needHelp')}
            </p>
            <a
              href="tel:+12345678900"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
            >
              <Phone className="w-4 h-4 mr-2" />
              {t('contact.emergency')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}