"use client";

import { usePathname } from 'next/navigation';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/auth');
  const isDashboardRoute = pathname?.startsWith('/my-dashboard');
  const isLandingPage = pathname?.startsWith('/berlin-kmu-pilot');

  return (
    <>
      {!isAuthRoute && !isDashboardRoute && !isLandingPage && <Header />}
      {children}
      {!isAuthRoute && !isDashboardRoute && !isLandingPage && <Footer />}
    </>
  );
}

export default LayoutContent;
