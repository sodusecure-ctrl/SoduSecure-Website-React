'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { getTrafficSource, track } from '@/lib/tracker';

/**
 * Misst das Besucherverhalten auf einer Seite und schickt es an /api/t/events.
 *
 * WAS ERFASST WIRD
 *   page_view      einmal beim Aufruf, mit Herkunft (Referrer, UTM, Kanal),
 *                  Geraeteklasse, Viewport und Sprache
 *   scroll_depth   beim erstmaligen Erreichen von 25/50/75/100 Prozent
 *   element_click  Klicks auf Buttons und Links - mit einem LABEL, nicht mit
 *                  dem Inhalt eines Eingabefelds
 *   field_focus    welches Formularfeld angefasst bzw. gefuellt wurde
 *   page_exit      beim Verlassen, mit Verweildauer in Sekunden
 *
 * WAS BEWUSST NICHT ERFASST WIRD
 *   Die Inhalte der Eingabefelder. Wer tippt und nicht absendet, hat in keine
 *   Verarbeitung eingewilligt - eine dauerhafte Speicherung dieser Daten waere
 *   etwas anderes als die bestehende Abbruch-Mail an den Betreiber. Gespeichert
 *   wird deshalb nur, WELCHES Feld angefasst wurde und wie lang die Eingabe ist
 *   (als grobe Stufe), nie der Text selbst. Die vollstaendigen Eingaben stehen
 *   weiterhin in der Abbruch-Mail; die bleibt unveraendert.
 *
 * Das Tracking darf die Seite niemals brechen: alles in try/catch, alle Sender
 * sind fire-and-forget (sendBeacon mit fetch-Fallback in track()).
 */
export default function VisitorTracker({ enabled = true }: { enabled?: boolean }) {
  const pathname = usePathname();
  const startedAt = useRef<number>(Date.now());
  const maxScroll = useRef(0);
  const sentDepths = useRef<Set<number>>(new Set());
  const exitSent = useRef(false);
  const seenFields = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    startedAt.current = Date.now();
    maxScroll.current = 0;
    sentDepths.current = new Set();
    exitSent.current = false;

    // ── Herkunft und Geraet, einmalig beim Aufruf ──────────────────────────
    try {
      const src = getTrafficSource();
      const w = window.innerWidth;
      track('page_view', {
        sourceLabel: src?.label ?? null,
        referrer: src?.referrer ?? (document.referrer || null),
        utmSource: src?.utmSource ?? null,
        utmMedium: src?.utmMedium ?? null,
        utmCampaign: src?.utmCampaign ?? null,
        landingPage: src?.landingPage ?? null,
        device: w < 640 ? 'mobil' : w < 1024 ? 'tablet' : 'desktop',
        viewport: `${w}x${window.innerHeight}`,
        language: navigator.language || null,
      });
    } catch { /* Tracking darf nie stoeren */ }

    // ── Scrolltiefe in 25er-Stufen ────────────────────────────────────────
    const onScroll = () => {
      try {
        const doc = document.documentElement;
        const scrollbar = doc.scrollHeight - window.innerHeight;
        if (scrollbar <= 0) return;
        const pct = Math.min(100, Math.round((window.scrollY / scrollbar) * 100));
        if (pct <= maxScroll.current) return;
        maxScroll.current = pct;
        for (const stufe of [25, 50, 75, 100]) {
          if (pct >= stufe && !sentDepths.current.has(stufe)) {
            sentDepths.current.add(stufe);
            track('scroll_depth', { pct: stufe });
          }
        }
      } catch { /* ignorieren */ }
    };

    // ── Klicks auf Bedienelemente ─────────────────────────────────────────
    const onClick = (e: MouseEvent) => {
      try {
        const el = (e.target as HTMLElement | null)?.closest('button, a, [role="button"]');
        if (!el) return;
        // Beschriftung statt Inhalt: aria-label, sonst sichtbarer Text.
        const roh =
          el.getAttribute('aria-label') ||
          (el as HTMLElement).innerText ||
          el.getAttribute('title') ||
          '';
        const label = roh.replace(/\s+/g, ' ').trim().slice(0, 60);
        if (!label) return;
        const href = el.tagName === 'A' ? (el as HTMLAnchorElement).getAttribute('href') : null;
        track('element_click', {
          label,
          tag: el.tagName.toLowerCase(),
          ...(href ? { href: href.slice(0, 120) } : {}),
        });
      } catch { /* ignorieren */ }
    };

    // ── Formularfelder: nur welches Feld, nie der Inhalt ──────────────────
    const onFieldChange = (e: Event) => {
      try {
        const el = e.target as HTMLInputElement | HTMLTextAreaElement | null;
        if (!el || !('value' in el)) return;
        const name = el.id || el.getAttribute('name') || el.getAttribute('type') || 'feld';
        const wert = String(el.value ?? '');
        if (!wert.trim()) return;
        if (seenFields.current.has(name)) return;
        seenFields.current.add(name);
        track('field_focus', {
          field: name,
          // Nur eine grobe Laengenstufe - erlaubt die Unterscheidung zwischen
          // "kurz angetippt" und "ausgefuellt", ohne den Text zu speichern.
          laenge: wert.length < 5 ? 'kurz' : wert.length < 25 ? 'mittel' : 'lang',
        });
      } catch { /* ignorieren */ }
    };

    // ── Verlassen der Seite mit Verweildauer ──────────────────────────────
    const sendExit = () => {
      if (exitSent.current) return;
      exitSent.current = true;
      try {
        track('page_exit', {
          seconds: Math.round((Date.now() - startedAt.current) / 1000),
          pct: maxScroll.current,
        });
      } catch { /* ignorieren */ }
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') sendExit();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick, true);
    document.addEventListener('change', onFieldChange, true);
    window.addEventListener('pagehide', sendExit);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      sendExit();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick, true);
      document.removeEventListener('change', onFieldChange, true);
      window.removeEventListener('pagehide', sendExit);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [enabled, pathname]);

  return null;
}
