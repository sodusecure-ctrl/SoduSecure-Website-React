"use client";

import { usePathname } from 'next/navigation';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/auth');
  const isDashboardRoute = pathname?.startsWith('/my-dashboard');
  const isLandingPage = pathname?.startsWith('/berlin-kmu-pilot');
  const isAdsPage = pathname?.startsWith('/request-pentest-ads');

  return (
    <>
      {!isAuthRoute && !isDashboardRoute && !isLandingPage && !isAdsPage && <Header />}
      {children}
      {!isAuthRoute && !isDashboardRoute && !isLandingPage && !isAdsPage && <Footer />}
    </>
  );
}

export default LayoutContent;
