'use client';

import { useRef, useState } from 'react';
import { Play, Volume2 } from 'lucide-react';

/**
 * Imagefilm im Hero der Startseite.
 *
 * Zwei Dateien statt einer, aus Ruecksicht auf die Ladezeit:
 *
 *   hero-loop.mp4   14 s, stumm, ohne Ton-Spur, rund 800 KB. Laeuft als
 *                   Endlosschleife und zeigt sofort Bewegung.
 *   imagefilm.mp4   der vollstaendige Film mit Ton. Steht auf preload="none"
 *                   und wird erst geladen, wenn jemand auf Abspielen drueckt.
 *
 * Der ganze Film im Hero wuerde den Largest Contentful Paint der Startseite
 * belasten - und die Startseite ist die einzige Seite mit brauchbarer CTR
 * (3,8 %). Das Poster traegt den LCP, der Rest kommt danach.
 */
export default function HeroVideo({ locale = 'de' }: { locale?: string }) {
  const [vollbild, setVollbild] = useState(false);
  const refVoll = useRef<HTMLVideoElement>(null);
  const en = locale === 'en';

  const starten = () => {
    setVollbild(true);
    // Nach dem Einblenden abspielen; der Nutzerklick zaehlt als Freigabe,
    // deshalb ist Ton hier erlaubt.
    requestAnimationFrame(() => {
      const v = refVoll.current;
      if (v) {
        v.currentTime = 0;
        void v.play().catch(() => { /* Browser kann ablehnen, dann Controls nutzen */ });
      }
    });
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0A0A0B] shadow-2xl shadow-black/50">
      <div className="relative aspect-video">
        {/* Stumme Schleife - immer im DOM, damit der Wechsel nicht flackert */}
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${vollbild ? 'opacity-0' : 'opacity-100'}`}
          src="/videos/hero-loop.mp4"
          poster="/videos/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />

        {/* Vollstaendiger Film - laedt erst auf Klick */}
        <video
          ref={refVoll}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${vollbild ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          src="/videos/imagefilm.mp4"
          poster="/videos/hero-poster.jpg"
          controls={vollbild}
          playsInline
          preload="none"
          title={en ? 'Sodu Secure company film' : 'Sodu Secure Imagefilm'}
        />

        {!vollbild && (
          <button
            type="button"
            onClick={starten}
            className="group absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/10"
            aria-label={en ? 'Play company film with sound' : 'Imagefilm mit Ton abspielen'}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3B30] shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-6 w-6 fill-white text-white" />
            </span>
          </button>
        )}
      </div>

      {/* Schriftfarbe bewusst als Literal: globals.css faerbt im hellen Modus
          jede Klasse mit "text-white" dunkel ein (Zeile 569 f.). Auf dem
          schwarzen Balken waere die Schrift sonst unlesbar. */}
      {!vollbild && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center gap-1.5 bg-black/70 px-4 py-2 text-[11px] font-medium text-[#FFFFFF] backdrop-blur-sm">
          <Volume2 className="h-3.5 w-3.5" />
          {en ? 'Company film · click for sound' : 'Imagefilm · für Ton klicken'}
        </div>
      )}
    </div>
  );
}
