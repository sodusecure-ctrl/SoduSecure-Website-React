'use client';

import { useEffect } from 'react';

/**
 * Globale Fehlergrenze. Häufigster Fall in Produktion: Nach einem Deployment
 * referenziert eine gecachte Seite alte JS-Chunks, die es nicht mehr gibt
 * ("ChunkLoadError") – das heilt ein einmaliger harter Reload. Alle anderen
 * Fehler bekommen eine freundliche Seite statt "Application error".
 */
const CHUNK_ERROR = /ChunkLoadError|Loading chunk|dynamically imported module|Importing a module script failed/i;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (CHUNK_ERROR.test(error?.message ?? '')) {
      try {
        if (!sessionStorage.getItem('sodu-chunk-reload')) {
          sessionStorage.setItem('sodu-chunk-reload', '1');
          window.location.reload();
        }
      } catch {
        window.location.reload();
      }
    }
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 text-center gap-6">
      <div>
        <h1 className="text-2xl font-black mb-2">Da ist etwas schiefgelaufen</h1>
        <p className="text-gray-400 text-sm max-w-md">
          Die Seite konnte nicht geladen werden. Meist hilft ein Neuladen – Ihre Daten sind
          davon nicht betroffen.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-500 transition-colors rounded-xl px-6 py-3 text-sm font-bold text-white"
        >
          Seite neu laden
        </button>
        <button
          onClick={reset}
          className="border border-white/20 hover:border-white/40 transition-colors rounded-xl px-6 py-3 text-sm font-semibold text-gray-300"
        >
          Erneut versuchen
        </button>
      </div>
    </main>
  );
}
