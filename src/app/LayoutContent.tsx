"use client";

import { usePathname } from 'next/navigation';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import { BrandProvider } from '../components/landing/BrandContext';
import ThemeToggle from '../components/theme/ThemeToggle';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/auth');
  const isDashboardRoute = pathname?.startsWith('/my-dashboard');
  const isLandingPage = pathname?.startsWith('/berlin-kmu-pilot');
  const isAdsPage = pathname?.startsWith('/request-pentest-ads');
  const isVerifyPage = pathname?.startsWith('/verify');
  const isSoduAuditAiPage = pathname?.startsWith('/sodu-audit-ai');
  const isCorporatePage = pathname?.startsWith('/corporate');

  const hideChrome =
    isAuthRoute || isDashboardRoute || isLandingPage || isAdsPage || isVerifyPage || isSoduAuditAiPage || isCorporatePage;

  // The global Header carries the toggle (top-right). Corporate pages have their
  // own header with a toggle. Only the few genuinely header-less pages need the
  // floating fallback.
  const showFloatingToggle = hideChrome && !isCorporatePage && !isAuthRoute && !isDashboardRoute;

  return (
    <BrandProvider>
      {!hideChrome && <Header />}
      {children}
      {!hideChrome && <Footer />}
      {showFloatingToggle && <ThemeToggle />}
    </BrandProvider>
  );
}

export default LayoutContent;
