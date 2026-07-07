'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Lock, Link2, Loader2 } from 'lucide-react';

export default function PinGate() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!pin.trim() || loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/tracking/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Anmeldung fehlgeschlagen');
        setPin('');
      }
    } catch {
      setError('Netzwerkfehler. Bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex items-center justify-center p-6 relative overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-sky-600/20 blur-[120px]" />

      <form
        onSubmit={submit}
        className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-card/80 backdrop-blur-xl p-8 shadow-2xl"
      >
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg shadow-violet-900/40">
            <Link2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">Tracking Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Kampagnen & Links · PIN erforderlich
          </p>
        </div>

        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
          PIN-Code
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="password"
            inputMode="text"
            autoFocus
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="••••••"
            className="w-full rounded-xl border border-white/10 bg-background/60 py-3 pl-10 pr-4 text-center text-lg tracking-[0.3em] text-foreground outline-none transition focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/30"
          />
        </div>

        {error && (
          <p className="mt-3 text-center text-sm text-rose-400">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !pin.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 py-3 font-medium text-white shadow-lg shadow-violet-900/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Prüfe…
            </>
          ) : (
            'Entsperren'
          )}
        </button>

        <p className="mt-6 text-center text-[11px] text-muted-foreground/70">
          Sodu Secure · Nur für autorisierte Mitarbeiter
        </p>
      </form>
    </div>
  );
}
