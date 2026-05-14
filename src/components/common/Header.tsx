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
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isBerlinDropdownOpen, setIsBerlinDropdownOpen] = useState(false);
  const [isMobileBerlinOpen, setIsMobileBerlinOpen] = useState(false);
  const [isTR03161DropdownOpen, setIsTR03161DropdownOpen] = useState(false);
  const [isMobileTR03161Open, setIsMobileTR03161Open] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('header');

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

  const berlinLinks = [
    { name: 'Pentest Berlin – Übersicht', path: '/pentest-berlin' },
    { name: 'Was kostet ein Pentest?', path: '/pentest-berlin/kosten' },
    { name: 'Pentest für KMU Berlin', path: '/pentest-berlin/kmu' },
    { name: 'Interner vs. Externer Pentest', path: '/pentest-berlin/intern-extern' },
    { name: 'ISO 27001 Pentest Berlin', path: '/pentest-berlin/iso-27001' },
  ];

  const tr03161Links = [
    { name: 'BSI TR-03161 Sicherheitsprüfung', path: '/bsi-tr-03161' },
    { name: 'Pentest für Gesundheitsanwendungen', path: '/pentest-gesundheitsanwendungen' },
    { name: 'TR-03161 Anfrage', path: '/anfrage-tr03161' },
  ];

  const navLinks = [
    { name: t('caseStudiesBlogs'), path: '/case-studies' },
    { name: t('about'), path: '/about' },
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

            <DropdownMenu open={isBerlinDropdownOpen} onOpenChange={setIsBerlinDropdownOpen}>
              <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none border-none cursor-pointer select-none text-white hover:text-gray-300 transition-colors text-sm xl:text-base">
                Pentest Berlin
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-4 min-w-[280px] xl:min-w-[320px] shadow-xl animate-in slide-in-from-top-2 fade-in-0"
                onCloseAutoFocus={(e) => e.preventDefault()}
                sideOffset={5}
              >
                <div className="pb-3 mb-3 border-b border-gray-700">
                  <h3 className="text-red-500 font-bold text-base xl:text-lg">Pentest Berlin</h3>
                </div>
                {berlinLinks.map((link, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={`
                      flex items-center justify-between py-2 px-3 cursor-pointer
                      rounded-md transition-colors group text-sm xl:text-base
                      ${isServiceActive(link.path)
                        ? 'bg-gray-800 text-red-500'
                        : 'text-white hover:bg-gray-800'
                      }
                    `}
                    onClick={() => { setIsBerlinDropdownOpen(false); router.push(link.path); }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={isTR03161DropdownOpen} onOpenChange={setIsTR03161DropdownOpen}>
              <DropdownMenuTrigger className="flex items-center gap-1 focus:outline-none border-none cursor-pointer select-none text-white hover:text-gray-300 transition-colors text-sm xl:text-base">
                BSI TR-03161
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-[#1a1f2e] border border-gray-700 rounded-lg p-4 min-w-[280px] xl:min-w-[320px] shadow-xl animate-in slide-in-from-top-2 fade-in-0"
                onCloseAutoFocus={(e) => e.preventDefault()}
                sideOffset={5}
              >
                <div className="pb-3 mb-3 border-b border-gray-700">
                  <h3 className="text-red-500 font-bold text-base xl:text-lg">BSI TR-03161</h3>
                </div>
                {tr03161Links.map((link, index) => (
                  <DropdownMenuItem
                    key={index}
                    className={`
                      flex items-center justify-between py-2 px-3 cursor-pointer
                      rounded-md transition-colors group text-sm xl:text-base
                      ${isServiceActive(link.path)
                        ? 'bg-gray-800 text-red-500'
                        : 'text-white hover:bg-gray-800'
                      }
                    `}
                    onClick={() => { setIsTR03161DropdownOpen(false); router.push(link.path); }}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span>{link.name}</span>
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

            {/* Mobile Berlin Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => setIsMobileBerlinOpen(!isMobileBerlinOpen)}
                className="flex items-center justify-between w-full py-3 px-4 text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
              >
                <span className="text-base font-medium">Pentest Berlin</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileBerlinOpen ? 'rotate-90' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileBerlinOpen ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-1 pl-4">
                  {berlinLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileBerlinOpen(false); router.push(link.path); }}
                      className={`
                        flex items-center justify-between w-full py-3 px-4
                        rounded-lg transition-colors text-left text-sm
                        ${isServiceActive(link.path)
                          ? 'bg-gray-800 text-red-500'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }
                      `}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile TR-03161 Dropdown */}
            <div className="mb-4">
              <button
                onClick={() => setIsMobileTR03161Open(!isMobileTR03161Open)}
                className="flex items-center justify-between w-full py-3 px-4 text-white hover:bg-gray-800 rounded-lg transition-colors text-left"
              >
                <span className="text-base font-medium">BSI TR-03161</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileTR03161Open ? 'rotate-90' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileTR03161Open ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="space-y-1 pl-4">
                  {tr03161Links.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileTR03161Open(false); router.push(link.path); }}
                      className={`
                        flex items-center justify-between w-full py-3 px-4
                        rounded-lg transition-colors text-left text-sm
                        ${isServiceActive(link.path)
                          ? 'bg-gray-800 text-red-500'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }
                      `}
                    >
                      <span>{link.name}</span>
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

          </div>
        </div>
      </div>
    </nav>
  );
}
