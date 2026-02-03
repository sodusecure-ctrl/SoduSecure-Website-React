"use client";

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<string>("de");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('header');

  // Get locale from cookie
  useEffect(() => {
    const getLocale = () => {
      if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";");
        const localeCookie = cookies.find((cookie) =>
          cookie.trim().startsWith("SODUSECURE_LOCALE=")
        );
        if (localeCookie) {
          const locale = localeCookie.split("=")[1]?.trim();
          if (locale === "de" || locale === "en") {
            return locale;
          }
        }
      }
      return "de";
    };
    const locale = getLocale();
    setCurrentLocale(locale);
  }, []);

  // Language toggle handler (WITHOUT page reload)
  const handleLanguageToggle = () => {
    const newLocale = currentLocale === "de" ? "en" : "de";

    // 1. Update state
    setCurrentLocale(newLocale);

    // 2. Set cookie
    if (typeof document !== "undefined") {
      document.cookie = `SODUSECURE_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }

    // 3. Trigger re-render by forcing router refresh (without full page reload)
    startTransition(() => {
      router.refresh();
    });
  };

  const handleServiceClick = (path: string) => {
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    router.push(path);
  };

  const services = [
    {
      name: t('servicesList.infrastructureTesting'),
      path: '/services/infrastructure-testing'
    },
    {
      name: t('servicesList.webApplicationTesting'),
      path: '/services/web-application-testing'
    },
    {
      name: t('servicesList.mobileAppTesting'),
      path: '/services/mobile-app-testing'
    },
    {
      name: t('servicesList.apiSecurityTesting'),
      path: '/services/api-security-testing'
    },
    {
      name: t('servicesList.cloudDevopsTesting'),
      path: '/services/cloud-devops-testing'
    },
    {
      name: t('servicesList.networkAudit'),
      path: '/services/network-audit'
    },
    {
      name: t('servicesList.smePackages'),
      path: '/services/sme-packages'
    },
  ];

  const navLinks = [
    { name: t('about'), path: '/about' },
    { name: t('caseStudiesBlogs'), path: '/case-studies' },
    { name: t('careers'), path: '/careers' },
    { name: t('contact'), path: '/contact' },
  ];

  const isServiceActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#131927] select-none sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo and Hamburger for Mobile */}
          <div className="flex items-center gap-3">
            {/* Hamburger Menu Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 rounded-md hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div
              onClick={() => router.push("/")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="w-11 h-10 sm:w-12 sm:h-12 rounded-3xl flex items-center justify-center">
                <Image
                  src={"/icons/logo.png"}
                  height={900}
                  width={900}
                  alt='Logo'
                  className='w-full h-full rounded shadow'
                />
              </div>
              <span className="text-white sm:block hidden text-xl sm:text-2xl font-semibold">
                {t('brand')}
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <DropdownMenu open={isServicesDropdownOpen} onOpenChange={setIsServicesDropdownOpen}>
              <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none border-none cursor-pointer select-none text-white hover:text-gray-300 transition-colors text-sm xl:text-base">
                {t('services')}
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-4 min-w-[280px] xl:min-w-[320px] shadow-xl animate-in slide-in-from-top-2 fade-in-0"
                onCloseAutoFocus={(e) => e.preventDefault()}
                sideOffset={5}
              >
                {/* Header */}
                <div className="pb-3 mb-3 border-b border-gray-700">
                  <h3 className="text-red-500 font-bold text-base xl:text-lg">
                    {t('chooseServices')}
                  </h3>
                </div>

                {/* Menu Items */}
                {services.map((service, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={`
                      flex items-center justify-between py-2 px-3 cursor-pointer 
                      rounded-md transition-colors group text-sm xl:text-base
                      ${isServiceActive(service.path)
                        ? 'bg-gray-800 text-red-500'
                        : 'text-white hover:bg-gray-800'
                      }
                    `}
                    onClick={() => {
                      handleServiceClick(service.path);
                    }}
                    onSelect={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <span>{service.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className="text-white hover:text-gray-300 transition-colors text-sm xl:text-base"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <label className="language-switch relative inline-block w-20 h-8 cursor-pointer" htmlFor="language">
                <input
                  id="language"
                  type="checkbox"
                  checked={currentLocale === "de"}
                  onChange={handleLanguageToggle}
                  disabled={isPending}
                  className="hidden"
                />
                <span className="switch-track absolute top-0 left-0 right-0 bottom-0 bg-gray-800 rounded-full transition-colors duration-300">
                  <span className="language-option absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">
                    EN
                  </span>
                  <span className="language-option absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">
                    DE
                  </span>
                  <span className="switch-thumb absolute top-1 left-1 w-6 h-6 bg-red-600 rounded-full transition-transform duration-300 transform"
                    style={{ transform: currentLocale === "de" ? 'translateX(32px)' : 'translateX(0)' }}>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {currentLocale === "de" ? "DE" : "EN"}
                    </span>
                  </span>
                </span>
              </label>
            </div>

            {/* Request Pentest Button */}
            <Button
              onClick={() => router.push("/request-pentest")}
              className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-lg font-medium transition-colors text-sm sm:text-base whitespace-nowrap"
            >
              {t('requestPentest')}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden fixed inset-0 z-40 bg-[#131927] transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          {/* Close button inside mobile menu */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2 hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="px-6 pt-4 pb-8 overflow-y-auto max-h-[calc(100vh-80px)]">
            {/* Mobile Services */}
            <div className="mb-4">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
              >
                <span className="text-base font-medium">{t('services')}</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-90' : ''
                    }`}
                />
              </button>

              {/* Mobile Services Child Items */}
              <div className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${isMobileServicesOpen ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0'}
              `}>
                <div className="space-y-1 pl-4">
                  {services.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => handleServiceClick(service.path)}
                      className={`
                        flex items-center justify-between w-full py-3 px-4 
                        rounded-lg transition-colors text-left text-sm
                        ${isServiceActive(service.path)
                          ? 'bg-gray-800 text-red-500'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }
                      `}
                    >
                      <span>{service.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Other Navigation Links */}
            <div className="space-y-2">
              {navLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsMobileServicesOpen(false);
                    router.push(link.path);
                  }}
                  className={`
                    w-full py-3 px-4 
                    rounded-lg transition-colors text-left
                    ${pathname === link.path
                      ? 'bg-gray-800 text-red-500'
                      : 'text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <span className="text-base">{link.name}</span>
                </button>
              ))}
            </div>

            {/* Mobile Language Selector */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <h3 className="text-white font-medium mb-4 pl-2">{t('language')}</h3>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">{t('selectLanguage')}</span>
                <label className="language-switch relative inline-block w-16 h-8 cursor-pointer" htmlFor="language-mobile">
                  <input
                    id="language-mobile"
                    type="checkbox"
                    checked={currentLocale === "de"}
                    onChange={handleLanguageToggle}
                    disabled={isPending}
                    className="hidden"
                  />
                  <span className="switch-track absolute top-0 left-0 right-0 bottom-0 bg-gray-800 rounded-full transition-colors duration-300">
                    <span className="language-option absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">
                      EN
                    </span>
                    <span className="language-option absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-white">
                      DE
                    </span>
                    <span className="switch-thumb absolute top-1 left-1 w-6 h-6 bg-red-600 rounded-full transition-transform duration-300 transform"
                      style={{ transform: currentLocale === "de" ? 'translateX(32px)' : 'translateX(0)' }}>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {currentLocale === "de" ? "DE" : "EN"}
                      </span>
                    </span>
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
