'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Brand = 'pentest' | 'auditai';

type Ctx = {
  brand: Brand;
  setBrand: (b: Brand) => void;
};

const BrandContext = createContext<Ctx>({ brand: 'pentest', setBrand: () => {} });

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>('pentest');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try { localStorage.removeItem('sodu-brand'); } catch {}
    }
  }, []);

  const setBrand = (b: Brand) => {
    setBrandState(b);
  };

  return <BrandContext.Provider value={{ brand, setBrand }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  return useContext(BrandContext);
}
