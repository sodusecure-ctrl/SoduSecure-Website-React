"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronRight, Globe, Menu, Shield, Sparkles, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { localizeHref } from '@/lib/localeRouting';
import { useBrand } from '@/components/landing/BrandContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileBerlinOpen, setIsMobileBerlinOpen] = useState(false);
  const [isMobileTR03161Open, setIsMobileTR03161Open] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const isEnglish = locale === 'en';
  const t = useTranslations('header');
  const { brand, setBrand } = useBrand();
  const isPentest = brand === 'pentest';

  const toLocalizedPath = (path: string) => localizeHref(path, isEnglish);

  const switchLanguage = (toEnglish: boolean) => {
    const targetPath = localizeHref(pathname || '/', toEnglish);
    window.location.assign(`/lang/${toEnglish ? 'en' : 'de'}?to=${encodeURIComponent(targetPath)}`);
  };

  const handleServiceClick = (path: string) => {
    setIsServicesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
    router.push(toLocalizedPath(path));
  };

  const services = [
    { name: t('servicesList.infrastructureTesting'), path: '/services/infrastructure-testing' },
    { name: t('servicesList.webApplicationTesting'), path: '/services/web-application-testing' },
    { name: t('servicesList.mobileAppTesting'), path: '/services/mobile-app-testing' },
    { name: t('servicesList.apiSecurityTesting'), path: '/services/api-security-testing' },
    { name: t('servicesList.cloudDevopsTesting'), path: '/services/cloud-devops-testing' },
    { name: t('servicesList.networkAudit'), path: '/services/network-audit' },
    { name: t('servicesList.smePackages'), path: '/services/sme-packages' },
    { name: t('servicesList.iso27001Service'), path: '/services/iso-27001' },
  ];

  const berlinLinks = [
    { name: isEnglish ? 'Pentest Berlin · Overview' : 'Pentest Berlin · Übersicht', path: '/pentest-berlin' },
    { name: isEnglish ? 'What does a pentest cost?' : 'Was kostet ein Pentest?', path: '/pentest-berlin/kosten' },
    { name: isEnglish ? 'Pentest for SMEs Berlin' : 'Pentest für KMU Berlin', path: '/pentest-berlin/kmu' },
    { name: isEnglish ? 'Internal vs. external pentest' : 'Interner vs. externer Pentest', path: '/pentest-berlin/intern-extern' },
    { name: isEnglish ? 'ISO 27001 pentest Berlin' : 'ISO 27001 Pentest Berlin', path: '/pentest-berlin/iso-27001' },
  ];

  const tr03161Links = [
    { name: isEnglish ? 'BSI TR-03161 security review' : 'BSI TR-03161 Sicherheitsprüfung', path: '/bsi-tr-03161' },
    { name: isEnglish ? 'Health-app pentest' : 'Pentest für Gesundheitsanwendungen', path: '/pentest-gesundheitsanwendungen' },
    { name: isEnglish ? 'TR-03161 request' : 'TR-03161 Anfrage', path: '/anfrage-tr03161' },
  ];

  const priceLink = isPentest
    ? { label: isEnglish ? 'Pricing' : 'Preise', href: '/pricing' }
    : { label: isEnglish ? 'Pricing' : 'Preise', href: '/pricing' };

  const cta = isPentest
    ? { label: isEnglish ? 'Request pentest' : 'Pentest anfragen', href: '/request-pentest' }
    : { label: isEnglish ? 'Request demo' : 'Demo anfragen', href: '/contact' };

  const navLinks = [
    priceLink,
    { label: t('caseStudiesBlogs'), href: '/case-studies' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  const isActive = (path: string) => pathname === path;

  const triggerCls =
    'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[13px] font-medium text-white/75 transition hover:bg-white/5 hover:text-white focus:outline-none data-[state=open]:bg-white/5 data-[state=open]:text-white';
  const menuCls =
    'min-w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#0F1822]/95 p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl animate-in slide-in-from-top-2 fade-in-0';

  const itemCls = (active: boolean) =>
    `group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[13px] transition cursor-pointer ${
      active
        ? 'bg-white/10 text-[#FF3B30]'
        : 'text-white/85 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <nav className="sticky top-0 z-50 select-none border-b border-white/10 bg-[#0A0A0B]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-3 sm:h-[68px]">
          {/* Left: hamburger + logo + brand toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <button
              type="button"
              onClick={() => router.push(toLocalizedPath('/'))}
              className="flex items-center gap-2.5 rounded-full px-1 py-1 transition hover:opacity-90"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                <Image src="/icons/logo.png" height={64} width={64} alt="Logo" className="h-full w-full object-contain" />
              </span>
              <span className="hidden text-[15px] font-semibold tracking-tight text-white sm:inline">
                {t('brand')}
              </span>
            </button>

            <div className="relative ml-2 hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-0.5 text-[11px] font-semibold md:inline-flex">
              <span
                aria-hidden
                className="absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-[#FF3B30] shadow-[0_2px_10px_rgba(255,59,48,0.4)] transition-transform duration-300 ease-out"
                style={{ transform: isPentest ? 'translateX(0%)' : 'translateX(calc(100% + 4px))' }}
              />
              <button
                type="button"
                onClick={() => setBrand('pentest')}
                className={
                  'relative z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition ' +
                  (isPentest ? 'text-white' : 'text-white/65 hover:text-white')
                }
              >
                <Shield className="h-3 w-3" /> /Pentest
              </button>
              <button
                type="button"
                onClick={() => setBrand('auditai')}
                className={
                  'relative z-10 inline-flex items-center gap-1 rounded-full px-2.5 py-1 transition ' +
                  (!isPentest ? 'text-white' : 'text-white/65 hover:text-white')
                }
              >
                <Sparkles className="h-3 w-3" /> /AuditAI
              </button>
            </div>
          </div>

          {/* Center: nav */}
          <div className="hidden items-center gap-1 lg:flex">
            <DropdownMenu open={isServicesDropdownOpen} onOpenChange={setIsServicesDropdownOpen}>
              <DropdownMenuTrigger className={triggerCls}>
                {t('services')}
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className={menuCls} sideOffset={10} onCloseAutoFocus={(e) => e.preventDefault()}>
                <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  {t('chooseServices')}
                </div>
                {services.map((s, i) => (
                  <DropdownMenuItem
                    key={i}
                    className={itemCls(isActive(s.path))}
                    onClick={() => handleServiceClick(s.path)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span>{s.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  </DropdownMenuItem>
                ))}

                <div className="my-2 h-px bg-white/5" />
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Pentest Berlin
                </div>
                {berlinLinks.map((l, i) => (
                  <DropdownMenuItem
                    key={'b' + i}
                    className={itemCls(isActive(l.path))}
                    onClick={() => handleServiceClick(l.path)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span>{l.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  </DropdownMenuItem>
                ))}

                <div className="my-2 h-px bg-white/5" />
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  BSI TR-03161
                </div>
                {tr03161Links.map((l, i) => (
                  <DropdownMenuItem
                    key={'t' + i}
                    className={itemCls(isActive(l.path))}
                    onClick={() => handleServiceClick(l.path)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    <span>{l.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navLinks.map((l, i) => (
              <Link
                key={i}
                href={toLocalizedPath(l.href)}
                className={
                  'rounded-full px-3 py-1.5 text-[13px] font-medium transition hover:bg-white/5 hover:text-white ' +
                  (isActive(l.href) ? 'text-white' : 'text-white/75')
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: locale + CTA */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => switchLanguage(!isEnglish)}
              className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[12px] font-semibold text-white/80 transition hover:border-white/30 hover:text-white sm:inline-flex"
              aria-label={t('selectLanguage')}
            >
              <Globe className="h-3.5 w-3.5" />
              {isEnglish ? 'DE' : 'EN'}
            </button>

            <Link
              href={toLocalizedPath(cta.href)}
              className="premium-cta inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold text-white sm:px-4 sm:py-2.5 sm:text-[13px]"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={
          'fixed inset-0 z-40 transform bg-[#0A0A0B] transition-transform duration-300 ease-out lg:hidden ' +
          (isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full')
        }
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <span className="text-[15px] font-semibold tracking-tight text-white">{t('brand')}</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[calc(100vh-56px)] overflow-y-auto px-4 pt-4 pb-10">
          <div className="mb-4 inline-flex w-full items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-[12px] font-semibold">
            <button
              type="button"
              onClick={() => setBrand('pentest')}
              className={
                'flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 transition ' +
                (isPentest ? 'bg-[#FF3B30] text-white' : 'text-white/70')
              }
            >
              <Shield className="h-3.5 w-3.5" /> /Pentest
            </button>
            <button
              type="button"
              onClick={() => setBrand('auditai')}
              className={
                'flex flex-1 items-center justify-center gap-1.5 rounded-full px-3 py-2 transition ' +
                (!isPentest ? 'bg-[#FF3B30] text-white' : 'text-white/70')
              }
            >
              <Sparkles className="h-3.5 w-3.5" /> /AuditAI
            </button>
          </div>

          <MobileGroup
            label={t('services')}
            open={isMobileServicesOpen}
            onToggle={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
          >
            {services.map((s, i) => (
              <MobileLink
                key={i}
                label={s.name}
                active={isActive(s.path)}
                onClick={() => handleServiceClick(s.path)}
              />
            ))}
          </MobileGroup>

          <MobileGroup
            label="Pentest Berlin"
            open={isMobileBerlinOpen}
            onToggle={() => setIsMobileBerlinOpen(!isMobileBerlinOpen)}
          >
            {berlinLinks.map((l, i) => (
              <MobileLink
                key={i}
                label={l.name}
                active={isActive(l.path)}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileBerlinOpen(false);
                  router.push(toLocalizedPath(l.path));
                }}
              />
            ))}
          </MobileGroup>

          <MobileGroup
            label="BSI TR-03161"
            open={isMobileTR03161Open}
            onToggle={() => setIsMobileTR03161Open(!isMobileTR03161Open)}
          >
            {tr03161Links.map((l, i) => (
              <MobileLink
                key={i}
                label={l.name}
                active={isActive(l.path)}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileTR03161Open(false);
                  router.push(toLocalizedPath(l.path));
                }}
              />
            ))}
          </MobileGroup>

          <div className="mt-2 space-y-1">
            {navLinks.map((l, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  router.push(toLocalizedPath(l.href));
                }}
                className={
                  'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[14px] font-medium transition ' +
                  (isActive(l.href)
                    ? 'bg-white/10 text-[#FF3B30]'
                    : 'text-white/90 hover:bg-white/5')
                }
              >
                <span>{l.label}</span>
                <ChevronRight className="h-4 w-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-2">
            <Link
              href={toLocalizedPath(cta.href)}
              onClick={() => setIsMobileMenuOpen(false)}
              className="premium-cta inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-3 text-[14px] font-semibold text-white"
            >
              {cta.label}
            </Link>
            <button
              type="button"
              onClick={() => {
                setIsMobileMenuOpen(false);
                switchLanguage(!isEnglish);
              }}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 px-4 py-3 text-[13px] font-semibold text-white/85 transition hover:border-white/30"
            >
              <Globe className="h-3.5 w-3.5" />
              {isEnglish ? 'Auf Deutsch wechseln' : 'Switch to English'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[14px] font-medium text-white/90 transition hover:bg-white/5"
      >
        <span>{label}</span>
        <ChevronRight className={'h-4 w-4 transition-transform duration-200 ' + (open ? 'rotate-90' : '')} />
      </button>
      <div
        className={
          'overflow-hidden transition-all duration-300 ease-out ' +
          (open ? 'mt-1 max-h-[800px] opacity-100' : 'max-h-0 opacity-0')
        }
      >
        <div className="space-y-0.5 pl-3">{children}</div>
      </div>
    </div>
  );
}

function MobileLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        'flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-left text-[13px] transition ' +
        (active ? 'bg-white/10 text-[#FF3B30]' : 'text-white/75 hover:bg-white/5 hover:text-white')
      }
    >
      <span>{label}</span>
      <ChevronRight className="h-3.5 w-3.5 opacity-50" />
    </button>
  );
}
