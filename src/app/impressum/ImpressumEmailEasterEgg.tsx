'use client';

import { useEffect, useRef, useState } from 'react';
import { Bug, X, Trophy, Crosshair } from 'lucide-react';

const EMAIL = 'info@sodusecure.com';

export default function ImpressumEmailEasterEgg() {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const clickRef = useRef({ count: 0, last: 0 });

  const onEmailClick = () => {
    try {
      navigator.clipboard?.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      /* ignore */
    }
    const now = Date.now();
    const c = clickRef.current;
    c.count = now - c.last < 1500 ? c.count + 1 : 1;
    c.last = now;
    if (c.count >= 5) {
      c.count = 0;
      setOpen(true);
    }
  };

  return (
    <>
      <span className="inline-flex items-center gap-2">
        <button onClick={onEmailClick} className="text-[#FF3B30] hover:underline" title={EMAIL}>
          {EMAIL}
        </button>
        {copied && <span className="text-xs font-medium text-emerald-600">✓ kopiert</span>}
      </span>
      {open && <BugGame onClose={() => setOpen(false)} />}
    </>
  );
}

type BugItem = { id: number; x: number; y: number };

function BugGame({ onClose }: { onClose: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'playing' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [bugs, setBugs] = useState<BugItem[]>([]);
  const [best, setBest] = useState(0);
  const idRef = useRef(0);

  useEffect(() => {
    try {
      const b = Number(localStorage.getItem('bughunt_best') || '0');
      if (!Number.isNaN(b)) setBest(b);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = window.setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    const spawn = window.setInterval(() => {
      const id = idRef.current++;
      const x = 6 + Math.random() * 80;
      const y = 14 + Math.random() * 66;
      setBugs((b) => [...b, { id, x, y }]);
      window.setTimeout(() => setBugs((b) => b.filter((z) => z.id !== id)), 1100);
    }, 640);
    return () => {
      window.clearInterval(timer);
      window.clearInterval(spawn);
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'playing' && time === 0) {
      setPhase('over');
      setBugs([]);
      setScore((s) => {
        setBest((prevBest) => {
          const nb = Math.max(prevBest, s);
          try {
            localStorage.setItem('bughunt_best', String(nb));
          } catch {
            /* ignore */
          }
          return nb;
        });
        return s;
      });
    }
  }, [time, phase]);

  const start = () => {
    setScore(0);
    setTime(20);
    setBugs([]);
    setPhase('playing');
  };
  const hit = (id: number) => {
    setBugs((b) => b.filter((z) => z.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/12 bg-[#0F0E12] text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3.5">
          <div className="flex items-center gap-2 text-sm font-bold">
            <Bug className="h-4 w-4 text-[#FF6B61]" /> Bug Hunt
          </div>
          <div className="flex items-center gap-4">
            {phase === 'playing' && (
              <>
                <span className="text-xs font-semibold text-white/70">⏱ {time}s</span>
                <span className="text-xs font-semibold text-[#FF6B61]">🐛 {score}</span>
              </>
            )}
            <button onClick={onClose} aria-label="Schließen" className="text-white/50 transition hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Play area */}
        <div className="relative h-[360px] select-none bg-[radial-gradient(circle_at_50%_0%,rgba(255,59,48,0.12),transparent_60%)]">
          {phase === 'idle' && (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF3B30]/15 text-[#FF6B61]">
                <Crosshair className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-xl font-bold">Schwachstellen jagen!</h3>
              <p className="mt-2 text-sm text-white/60">
                Klicke in 20 Sekunden so viele Bugs wie möglich weg, bevor ein Angreifer sie findet.
              </p>
              {best > 0 && <p className="mt-3 text-xs text-white/45">Bestwert: {best} 🐛</p>}
              <button
                onClick={start}
                className="premium-cta mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
              >
                Los geht&apos;s
              </button>
            </div>
          )}

          {phase === 'playing' &&
            bugs.map((b) => (
              <button
                key={b.id}
                onClick={() => hit(b.id)}
                className="absolute inline-flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF3B30]/15 text-[#FF6B61] ring-1 ring-[#FF3B30]/30 transition hover:scale-110 active:scale-90"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                aria-label="Bug"
              >
                <Bug className="h-6 w-6" />
              </button>
            ))}

          {phase === 'over' && (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
                <Trophy className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-xl font-bold">Zeit abgelaufen!</h3>
              <p className="mt-2 text-sm text-white/60">
                Du hast <span className="font-bold text-[#FF6B61]">{score}</span> Schwachstellen gefunden.
              </p>
              <p className="mt-1 text-xs text-white/45">Bestwert: {best} 🐛</p>
              <div className="mt-6 flex gap-3">
                <button onClick={start} className="premium-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white">
                  Nochmal
                </button>
                <button onClick={onClose} className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30">
                  Schließen
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-white/10 px-5 py-2.5 text-center text-[11px] text-white/35">
          Easter Egg · Sodu Secure 🛡️
        </div>
      </div>
    </div>
  );
}
