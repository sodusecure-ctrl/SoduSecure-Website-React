import { sql } from '@vercel/postgres';
import { isDbConfigured } from './leads-db';

/**
 * Speichert die Ereignisse des Pentest-Konfigurators.
 *
 * Anlass: Bei der Auswertung am 24.11.2026 war die Frage "bei welchem Schritt
 * springen die meisten ab" nicht zu beantworten. /api/pentest/track verschickte
 * bei Formularstart, Schrittwechsel und Abbruch zwar eine E-Mail, schrieb aber
 * nichts in die Datenbank - und Vercel bewahrt Laufzeitprotokolle nicht ueber
 * Monate auf. Die Abbruchquote des wichtigsten Formulars der Website war damit
 * schlicht unbekannt.
 *
 * Die Mails bleiben unveraendert bestehen. Der Inhaber hat am 12.10.2026
 * ausdruecklich festgehalten, dass die Funnel- und Abbruchmails aktiv bleiben
 * muessen; diese Tabelle kommt zusaetzlich, nicht als Ersatz.
 *
 * Bewusst eine eigene Tabelle statt tracking_events: Jene verlangt link_slug,
 * visitor_id und session_id und gehoert zur Kampagnen-Nachverfolgung. Die
 * Konfigurator-Ereignisse haben eine andere Form.
 */

export type FunnelEreignis = {
  /** 'form-started' | 'step-reached' | 'form-abandoned' | 'submitted' | 'blocked' */
  aktion: string;
  /** Erreichter Schritt, 1-basiert. */
  schritt?: number | null;
  /** Gesamtzahl der Schritte im Formular, zum Zeitpunkt des Ereignisses. */
  schritteGesamt?: number | null;
  /** Gewaehlte Pruefart, soweit schon ausgewaehlt. */
  kategorie?: string | null;
  /** Lesbare Herkunft, z. B. "Google Ads". */
  quelle?: string | null;
  /** Kampagnen-Kennzeichen. */
  tag?: string | null;
  /** Seite, von der das Ereignis kam. */
  pfad?: string | null;
  /** Alles Weitere, unstrukturiert. */
  meta?: Record<string, unknown> | null;
};

let schemaBereit: Promise<void> | null = null;

export async function ensureFunnelSchema(): Promise<void> {
  if (!isDbConfigured()) return;
  if (!schemaBereit) {
    schemaBereit = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS funnel_events (
          id             BIGSERIAL PRIMARY KEY,
          created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
          aktion         TEXT NOT NULL,
          schritt        INTEGER,
          schritte_gesamt INTEGER,
          kategorie      TEXT,
          quelle         TEXT,
          tag            TEXT,
          pfad           TEXT,
          meta           JSONB
        );
      `;
      await sql`CREATE INDEX IF NOT EXISTS funnel_events_zeit_idx ON funnel_events (created_at DESC);`;
      await sql`CREATE INDEX IF NOT EXISTS funnel_events_aktion_idx ON funnel_events (aktion, schritt);`;
    })().catch((err) => {
      schemaBereit = null;
      throw err;
    });
  }
  return schemaBereit;
}

/**
 * Schreibt ein Ereignis. Wirft nie.
 *
 * Das ist Absicht: Der Aufrufer ist die Track-Route, an der der Mailversand
 * haengt. Eine nicht erreichbare Datenbank darf die Abbruchmail nicht
 * verhindern - genau dieser Fehler hat im Oktober schon einmal dazu gefuehrt,
 * dass eine Bestaetigungsmail ausblieb und der Besucher einen 500er sah.
 */
export async function speichereFunnelEreignis(e: FunnelEreignis): Promise<void> {
  if (!isDbConfigured()) return;
  try {
    await ensureFunnelSchema();
    await sql`
      INSERT INTO funnel_events (aktion, schritt, schritte_gesamt, kategorie, quelle, tag, pfad, meta)
      VALUES (
        ${e.aktion},
        ${e.schritt ?? null},
        ${e.schritteGesamt ?? null},
        ${e.kategorie ?? null},
        ${e.quelle ?? null},
        ${e.tag ?? null},
        ${e.pfad ?? null},
        ${e.meta ? JSON.stringify(e.meta) : null}
      );
    `;
  } catch (err) {
    console.error('[funnel-db] Ereignis nicht gespeichert:', err);
  }
}

/**
 * Abbruchquote je Schritt ueber die letzten `tage` Tage.
 *
 * Liefert je Schritt, wie viele ihn erreicht und wie viele dort abgebrochen
 * haben. Damit laesst sich die Frage beantworten, an welcher Stelle des
 * Konfigurators die meisten Besucher verloren gehen.
 */
export async function abbruchJeSchritt(tage = 30): Promise<
  { schritt: number; erreicht: number; abgebrochen: number }[]
> {
  if (!isDbConfigured()) return [];
  try {
    await ensureFunnelSchema();
    const { rows } = await sql<{ schritt: number; erreicht: number; abgebrochen: number }>`
      SELECT
        schritt,
        COUNT(*) FILTER (WHERE aktion IN ('step-reached', 'form-started'))::int AS erreicht,
        COUNT(*) FILTER (WHERE aktion = 'form-abandoned')::int                  AS abgebrochen
      FROM funnel_events
      WHERE schritt IS NOT NULL
        AND created_at > now() - (${tage}::text || ' days')::interval
      GROUP BY schritt
      ORDER BY schritt;
    `;
    return rows;
  } catch (err) {
    console.error('[funnel-db] Auswertung fehlgeschlagen:', err);
    return [];
  }
}
