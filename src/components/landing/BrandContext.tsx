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
    const stored = (typeof window !== 'undefined' && (localStorage.getItem('sodu-brand') as Brand | null)) || null;
    if (stored === 'pentest' || stored === 'auditai') setBrandState(stored);
  }, []);

  const setBrand = (b: Brand) => {
    setBrandState(b);
    if (typeof window !== 'undefined') localStorage.setItem('sodu-brand', b);
  };

  return <BrandContext.Provider value={{ brand, setBrand }}>{children}</BrandContext.Provider>;
}

export function useBrand() {
  return useContext(BrandContext);
}
