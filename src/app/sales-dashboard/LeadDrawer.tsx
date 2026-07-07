'use client';

import { useEffect, useState } from 'react';
import {
  Building2,
  Check,
  Copy,
  Mail,
  Phone,
  Trash2,
  X,
} from 'lucide-react';
import {
  type Lead,
  type LeadStatus,
  STATUS_META,
  STATUS_ORDER,
  displaySource,
  formatDateTime,
  initials,
  sourceColor,
} from './types';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="text-sm text-foreground break-words">{children || '—'}</div>
    </div>
  );
}

export default function LeadDrawer({
  lead,
  onClose,
  onUpdate,
  onDelete,
  saving,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (id: number, fields: { status?: LeadStatus; notes?: string; est_value?: number }) => void;
  onDelete: (id: number) => void;
  saving: boolean;
}) {
  const [notes, setNotes] = useState(lead.notes ?? '');
  const [value, setValue] = useState(String(lead.est_value ?? ''));
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setNotes(lead.notes ?? '');
    setValue(String(lead.est_value ?? ''));
    setConfirmDelete(false);
  }, [lead]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const notesDirty = (lead.notes ?? '') !== notes;
  const valueDirty = String(lead.est_value ?? '') !== value;

  function copyEmail() {
    if (!lead.email) return;
    navigator.clipboard?.writeText(lead.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-border p-5">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white"
            style={{ background: sourceColor(lead.source) }}
          >
            {initials(lead)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-base font-semibold text-foreground">
              {lead.company || lead.name || lead.email || 'Unbenannter Lead'}
            </div>
            <div className="truncate text-xs text-muted-foreground">
              {displaySource(lead)} · {formatDateTime(lead.created_at)}
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5">
          {/* Quick actions */}
          <div className="flex flex-wrap gap-2">
            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-500/15 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/25"
              >
                <Mail className="h-3.5 w-3.5" /> E-Mail
              </a>
            )}
            {lead.phone && (
              <a
                href={`tel:${lead.phone}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500/15 px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:bg-sky-500/25"
              >
                <Phone className="h-3.5 w-3.5" /> Anrufen
              </a>
            )}
            {lead.email && (
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-foreground"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Kopiert' : 'E-Mail kopieren'}
              </button>
            )}
          </div>

          {/* Status selector */}
          <div>
            <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Status
            </div>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_ORDER.map((s) => {
                const active = lead.status === s;
                return (
                  <button
                    key={s}
                    disabled={saving}
                    onClick={() => !active && onUpdate(lead.id, { status: s })}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition disabled:opacity-60 ${
                      active
                        ? STATUS_META[s].badge
                        : 'border-border bg-transparent text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {STATUS_META[s].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name">{lead.name}</Field>
            <Field label="Firma">
              {lead.company && (
                <span className="inline-flex items-center gap-1">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  {lead.company}
                </span>
              )}
            </Field>
            <Field label="E-Mail">
              {lead.email && (
                <a href={`mailto:${lead.email}`} className="text-rose-400 hover:underline">
                  {lead.email}
                </a>
              )}
            </Field>
            <Field label="Telefon">{lead.phone}</Field>
            <Field label="Firmengröße">{lead.company_size}</Field>
            <Field label="Service">{lead.service}</Field>
          </div>

          {/* Check result */}
          {lead.check_type && (
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-wider text-violet-300">
                Schnellcheck-Ergebnis
              </div>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <Field label="Typ">{lead.check_type}</Field>
                <Field label="Score">
                  {lead.check_score !== null ? `${lead.check_score}/100` : null}
                </Field>
                <Field label="Ergebnis">{lead.check_verdict}</Field>
              </div>
            </div>
          )}

          {/* Estimated value */}
          <div>
            <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Geschätzter Wert (€)
            </div>
            <div className="flex gap-2">
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-rose-500/60"
              />
              {valueDirty && (
                <button
                  disabled={saving}
                  onClick={() => onUpdate(lead.id, { est_value: Number(value) || 0 })}
                  className="shrink-0 rounded-lg bg-rose-500 px-3 py-2 text-xs font-medium text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  Speichern
                </button>
              )}
            </div>
          </div>

          {/* Message */}
          {lead.message && (
            <div>
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Nachricht / Details
              </div>
              <pre className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-lg border border-border bg-background p-3 text-xs text-foreground/90">
                {lead.message}
              </pre>
            </div>
          )}

          {/* Notes */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Interne Notizen
              </span>
              {notesDirty && (
                <button
                  disabled={saving}
                  onClick={() => onUpdate(lead.id, { notes })}
                  className="rounded-md bg-rose-500 px-2 py-0.5 text-[11px] font-medium text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  Speichern
                </button>
              )}
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Notizen, nächste Schritte, Gesprächsnotizen…"
              className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-rose-500/60"
            />
          </div>

          {/* Meta */}
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4 text-xs">
            <Field label="Lead-ID">#{lead.id}</Field>
            <Field label="Tag">{lead.tag}</Field>
            <Field label="Kampagnen-Link">
              {lead.link_slug ? (
                <a
                  href="/tracking"
                  className="inline-flex items-center gap-1 rounded-md bg-violet-500/15 px-2 py-0.5 font-medium text-violet-300 hover:bg-violet-500/25"
                  title="Über Tracking-Link gekommen – Details im Tracking-Dashboard"
                >
                  /t/{lead.link_slug}
                </a>
              ) : null}
            </Field>
            <Field label="Herkunftsseite">
              {lead.source_page ? (
                <span className="break-all text-muted-foreground">{lead.source_page}</span>
              ) : null}
            </Field>
          </div>
        </div>

        {/* Footer: delete */}
        <div className="border-t border-border p-4">
          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <span className="flex-1 text-xs text-muted-foreground">
                Lead endgültig löschen?
              </span>
              <button
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted"
              >
                Abbrechen
              </button>
              <button
                disabled={saving}
                onClick={() => onDelete(lead.id)}
                className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-medium text-white transition hover:brightness-110 disabled:opacity-60"
              >
                Löschen
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-rose-400 transition hover:bg-rose-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" /> Lead löschen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
