"use client";

import { useState } from 'react';
import { ChevronDown, ChevronUp, Github, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { isEnglishPath, localizeHref } from '@/lib/localeRouting';
import { CITY_LINKS } from '@/components/landing/cityData';

export default function Footer() {
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const pathname = usePathname();
  const isEnglish = isEnglishPath(pathname);
  const t = useTranslations('footer');
  const toLocalizedPath = (path: string) => localizeHref(path, isEnglish);
  const serviceLabels = t.raw('sections.services.links') as string[];
  const companyLabels = t.raw('sections.company.links') as string[];
  const resourceLabels = t.raw('sections.resources.links') as string[];

  const serviceLinks = [
    { label: serviceLabels?.[0], href: '/services/infrastructure-testing' },
    { label: serviceLabels?.[1], href: '/services/web-application-testing' },
    { label: serviceLabels?.[2], href: '/services/mobile-app-testing' },
    { label: serviceLabels?.[3], href: '/services/api-security-testing' },
    { label: serviceLabels?.[4], href: '/services/cloud-devops-testing' },
    { label: 'Active Directory Pentest', href: '/services/active-directory' },
    { label: 'AWS Penetrationstest', href: '/services/aws-penetrationstest' },
    { label: 'Security Audit', href: '/services/security-audit' },
    { label: 'Vulnerability Assessment (Service)', href: '/services/vulnerability-assessment' },
    { label: 'Penetrationstest', href: '/penetration-testing' },
    { label: 'Pentest Kosten', href: '/pentest-kosten' },
    { label: 'Pentest Konfigurator', href: '/pentest-konfigurator' },
    { label: 'Cyber Security Check', href: '/cyber-security-check' },
    { label: 'Phishing Simulation', href: '/phishing-simulation' },
    { label: 'Vulnerability Assessment', href: '/vulnerability-assessment-service' },
    { label: 'Red Team Assessment', href: '/red-team-assessment' },
    { label: 'Pentest Berlin', href: '/pentest-berlin' },
    { label: 'Penetrationstest Deutschland', href: '/penetrationstest-deutschland' },
    { label: 'Pentest Zertifizierung', href: '/pentest-certification' },
    { label: 'Pentest Anbieter', href: '/penetrationstest-anbieter' },
    { label: 'Cybersecurity Firma', href: '/cybersecurity-firma' },
    { label: 'ISO 27001', href: '/iso-27001' },
    { label: 'ISO 27001 Pentest Anforderungen', href: '/iso-27001-pentest-anforderungen' },
    { label: 'ISO 27001 Zertifizierung', href: '/iso-27001-zertifizierung' },
    { label: 'NIS2', href: '/nis2' },
    { label: 'DORA', href: '/dora' },
    { label: 'MDR', href: '/mdr' },
    { label: 'BSIG / KRITIS', href: '/bsig' },
    { label: 'BSI TR-03161', href: '/bsi-tr-03161' },
    { label: 'TLPT (DORA)', href: '/tlpt' },
    { label: 'TISAX Penetrationstest', href: '/tisax' },
    { label: 'PCI DSS Penetrationstest', href: '/pci-dss-penetrationstest' },
    { label: 'DSGVO-Penetrationstest', href: '/dsgvo-penetrationstest' },
    { label: 'Welche Gesetze treffen zu? (NIS2/DORA/MDR-Check)', href: '/welche-gesetze-treffen-zu' },
    { label: 'IT Sicherheitscheck', href: '/it-sicherheitscheck' },
    { label: 'Cybersecurity Audit', href: '/cybersecurity-audit' },
    { label: 'Hacker Simulation', href: '/hacker-simulation' },
    { label: 'IT Sicherheit testen', href: '/it-sicherheit-testen' },
    { label: 'Schwachstellenanalyse', href: '/schwachstellenanalyse' },
    { label: 'Sicherheitsaudit', href: '/sicherheitsaudit' },
    // AuditAI · SEO landing pages
    { label: 'Claude Mythos Alternative', href: '/claude-mythos-alternative' },
    { label: 'Claude Mythos im Abo', href: '/claude-mythos-im-abo' },
    { label: 'Claude Mythos für KMU', href: '/claude-mythos-fuer-kmu' },
    { label: 'Claude Mythos für Softwareentwicklung', href: '/claude-mythos-fuer-softwareentwicklung' },
    { label: 'Claude Mythos für Software-Team', href: '/claude-mythos-fuer-software-team' },
    { label: 'Claude Mythos für Software-Sicherheit', href: '/claude-mythos-fuer-software-sicherheit' },
    { label: 'Claude Code Review', href: '/claude-code-review' },
    { label: 'Claude Security Audit', href: '/claude-security-audit' },
    { label: 'Claude AI Pentest', href: '/claude-ai-pentest' },
    { label: 'Claude Opus Security Review', href: '/claude-opus-security-review' },
    { label: 'Claude Sonnet Code Audit', href: '/claude-sonnet-code-audit' },
    { label: 'Powered by Claude · Security', href: '/powered-by-claude-security' },
    { label: 'Claude vs Snyk', href: '/claude-vs-snyk' },
    { label: 'Claude Pentest Deutschland', href: '/claude-pentest-deutschland' },
    { label: 'KI Code Review Deutschland', href: '/ai-code-review-deutschland' },
    { label: 'Automatisiertes Code-Audit', href: '/automatisiertes-code-audit' },
    { label: 'Wöchentlicher Security-Bericht', href: '/wochentlicher-security-bericht' },
    { label: 'Secure Coding as a Service', href: '/secure-coding-as-a-service' },
    { label: 'GitHub Security Scanner', href: '/github-security-scanner' },
    { label: 'DevSecOps für KMU', href: '/devsecops-fuer-kmu' },
    { label: 'KI Code Audit ab 99 €', href: '/ki-code-audit-99-euro' },
    { label: 'Code Review für Startups', href: '/code-review-startup-security' },
  ];

  const VISIBLE_COUNT = 5;

  const companyLinks = [
    { label: companyLabels?.[0], href: '/about' },
    { label: companyLabels?.[1], href: '/about#team' },
    { label: companyLabels?.[2], href: '/case-studies' },
    { label: companyLabels?.[3], href: '/contact' }
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
                href="mailto:info@sodusecure.com"
                className="flex items-center gap-2 lg:gap-3 text-gray-400 hover:text-white transition-colors text-sm group"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="break-all lg:break-normal">{t('contact.email')}</span>
              </a>

              <a
                href="tel:+491777750985"
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
              {/* Alle Links im DOM (crawlbar); Überzahl nur visuell eingeklappt */}
              {serviceLinks.map((item, index) => (
                <li key={index} className={index >= VISIBLE_COUNT && !servicesExpanded ? 'hidden' : ''}>
                  <Link
                    href={toLocalizedPath(item.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="mt-3 flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors text-xs font-medium"
            >
              {servicesExpanded ? (
                <><ChevronUp className="w-3.5 h-3.5" />Weniger anzeigen</>
              ) : (
                <><ChevronDown className="w-3.5 h-3.5" />Alle {serviceLinks.length} Services</>
              )}
            </button>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-base lg:text-lg mb-4 lg:mb-6">{t('sections.company.title')}</h3>
            <ul className="space-y-2 lg:space-y-3">
              {companyLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={toLocalizedPath(item.href)}
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
                    href={toLocalizedPath(item.href)}
                    className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Deutschlandweit aktiv – lokale Penetration-Testing-Standorte */}
        <div className="border-t border-gray-800 pt-8 lg:pt-10 mb-10 lg:mb-12">
          <h3 className="text-white font-semibold text-base lg:text-lg mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-red-500" />
            Deutschlandweit aktiv
          </h3>
          <p className="text-gray-400 text-sm mb-4 max-w-2xl">
            Penetration Testing mit lokalem Fokus in den wichtigsten Wirtschaftszentren – persönlich vor Ort und remote.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {CITY_LINKS.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/${city.slug}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm inline-flex items-center gap-1.5 py-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-red-500/70 flex-shrink-0" />
                  Penetration Testing {city.city}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={toLocalizedPath('/penetrationstest-deutschland')}
                className="text-red-400 hover:text-red-300 transition-colors text-sm font-medium inline-flex items-center gap-1.5 py-1"
              >
                Pentest deutschlandweit
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6 lg:mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Legal Links - Stack on mobile, row on md+ */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            <Link
              href={toLocalizedPath('/about')}
              className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm py-1"
            >
              {isEnglish ? 'About' : 'Über uns'}
            </Link>
            <Link
              href={toLocalizedPath('/contact')}
              className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm py-1"
            >
              {isEnglish ? 'Contact' : 'Kontakt'}
            </Link>
            <Link
              href={toLocalizedPath('/privacy')}
              className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm py-1"
            >
              {t('legal.privacy')}
            </Link>
            <Link
              href={toLocalizedPath('/terms')}
              className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm py-1"
            >
              {t('legal.terms')}
            </Link>
            <Link
              href={toLocalizedPath('/impressum')}
              className="text-gray-400 hover:text-white transition-colors text-xs lg:text-sm py-1"
            >
              Impressum
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 lg:gap-4">
            <a
              href="https://www.linkedin.com/company/sodu-secure-gmbh"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 lg:w-5 lg:h-5" />
            </a>
            <a
              href="https://x.com/SoduSecure"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 lg:w-10 lg:h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="X"
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
              href="tel:+491777750985"
              className="inline-flex items-center justify-center bg-red-600 hover:premium-cta text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm"
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
