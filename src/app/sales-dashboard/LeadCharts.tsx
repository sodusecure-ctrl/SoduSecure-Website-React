'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  type Lead,
  STATUS_META,
  STATUS_ORDER,
  normalizeStatus,
  weightedValue,
  displaySource,
  displaySourceColor,
  formatEuro,
  trafficColor,
  trafficLabelOf,
} from './types';

const AXIS = { fontSize: 11, fill: 'var(--muted-foreground)' };

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function TooltipBox({
  label,
  rows,
}: {
  label?: string;
  rows: { name: string; value: string; color?: string }[];
}) {
  return (
    <div className="rounded-lg border border-border bg-popover/95 px-3 py-2 text-xs shadow-xl backdrop-blur">
      {label && <div className="mb-1 font-medium text-foreground">{label}</div>}
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2 text-muted-foreground">
          {r.color && (
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: r.color }}
            />
          )}
          <span>{r.name}:</span>
          <span className="font-medium text-foreground">{r.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

/** Lokaler Datums-Key (YYYY-MM-DD) – toISOString würde in UTC kippen und
 *  heutige Leads in den falschen (oder gar keinen) Tages-Bucket sortieren. */
function localDayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function LeadsTrendChart({ leads, days = 30 }: { leads: Lead[]; days?: number }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const buckets: { key: string; label: string; count: number }[] = [];
  const index = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = localDayKey(d);
    index.set(key, buckets.length);
    buckets.push({
      key,
      label: d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      count: 0,
    });
  }
  for (const lead of leads) {
    const key = localDayKey(new Date(lead.created_at));
    const i = index.get(key);
    if (i !== undefined) buckets[i].count += 1;
  }

  return (
    <ChartCard title="Leads im Zeitverlauf" subtitle={`Letzte ${days} Tage`}>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={buckets} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" tick={AXIS} tickLine={false} axisLine={false} interval="preserveStartEnd" minTickGap={24} />
          <YAxis tick={AXIS} tickLine={false} axisLine={false} allowDecimals={false} width={32} />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipBox
                  label={String(label)}
                  rows={[{ name: 'Leads', value: String(payload[0].value), color: '#f43f5e' }]}
                />
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#f43f5e"
            strokeWidth={2}
            fill="url(#trendFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SourceDonut({ leads }: { leads: Lead[] }) {
  const groups = new Map<string, { value: number; color: string }>();
  for (const l of leads) {
    const label = displaySource(l);
    const existing = groups.get(label);
    if (existing) existing.value += 1;
    else groups.set(label, { value: 1, color: displaySourceColor(l) });
  }
  const data = [...groups.entries()]
    .map(([label, { value, color }]) => ({ source: label, value, color, label }))
    .sort((a, b) => b.value - a.value);
  const total = leads.length || 1;

  return (
    <ChartCard title="Leads nach Quelle" subtitle={`${leads.length} gesamt`}>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="55%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.source} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <TooltipBox
                    rows={[
                      {
                        name: String(payload[0].payload.label),
                        value: `${payload[0].value} (${Math.round((Number(payload[0].value) / total) * 100)}%)`,
                        color: payload[0].payload.color,
                      },
                    ]}
                  />
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {data.map((d) => (
            <div key={d.source} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
              <span className="flex-1 text-muted-foreground">{d.label}</span>
              <span className="font-medium text-foreground">{d.value}</span>
            </div>
          ))}
          {data.length === 0 && (
            <p className="text-xs text-muted-foreground">Keine Daten</p>
          )}
        </div>
      </div>
    </ChartCard>
  );
}

/** Woher kamen die Leads? (Google Ads, ChatGPT, Kampagnen-Links, organisch …) */
export function TrafficDonut({ leads }: { leads: Lead[] }) {
  const groups = new Map<string, { value: number; color: string }>();
  for (const l of leads) {
    const label = trafficLabelOf(l);
    const existing = groups.get(label);
    if (existing) existing.value += 1;
    else groups.set(label, { value: 1, color: trafficColor(label) });
  }
  const data = [...groups.entries()]
    .map(([label, { value, color }]) => ({ source: label, value, color, label }))
    .sort((a, b) => b.value - a.value);
  const total = leads.length || 1;

  return (
    <ChartCard title="Leads nach Traffic-Quelle" subtitle="Woher die Besucher kamen">
      <div className="flex items-center gap-4">
        <ResponsiveContainer width="55%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((d) => (
                <Cell key={d.source} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <TooltipBox
                    rows={[
                      {
                        name: String(payload[0].payload.label),
                        value: `${payload[0].value} (${Math.round((Number(payload[0].value) / total) * 100)}%)`,
                        color: payload[0].payload.color,
                      },
                    ]}
                  />
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {data.map((d) => (
            <div key={d.source} className="flex items-center gap-2 text-xs">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="flex-1 break-all text-muted-foreground">{d.label}</span>
              <span className="font-medium text-foreground">{d.value}</span>
            </div>
          ))}
          {data.length === 0 && (
            <p className="text-xs text-muted-foreground">Keine Daten</p>
          )}
        </div>
      </div>
    </ChartCard>
  );
}

export function StatusFunnel({ leads }: { leads: Lead[] }) {
  // Zehn Stufenlabels passen nicht nebeneinander auf eine X-Achse, deshalb
  // liegende Balken. Die Farben kommen aus STATUS_META, damit neue Stufen
  // automatisch mitgezeichnet werden.
  const data = STATUS_ORDER.map((status) => ({
    status,
    label: STATUS_META[status].short,
    count: leads.filter((l) => normalizeStatus(l.status) === status).length,
  })).filter((d) => d.count > 0 || STATUS_META[d.status].group === 'open');

  return (
    <ChartCard title="Pipeline nach Stufe" subtitle="Anzahl Leads je Stufe">
      <ResponsiveContainer width="100%" height={Math.max(220, data.length * 26)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="label"
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            width={92}
          />
          <Tooltip
            cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipBox label={String(label)} rows={[{ name: 'Leads', value: String(payload[0].value) }]} />
              ) : null
            }
          />
          <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={14}>
            {data.map((d) => (
              <Cell key={d.status} fill={STATUS_META[d.status].chart} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function TopCompanies({ leads }: { leads: Lead[] }) {
  const counts = new Map<string, number>();
  for (const l of leads) {
    const name = (l.company || '').trim();
    if (name) counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  const data = [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  return (
    <ChartCard title="Top Firmen" subtitle="Nach Anzahl Leads">
      {data.length === 0 ? (
        <p className="text-xs text-muted-foreground">Noch keine Firmendaten</p>
      ) : (
        <ResponsiveContainer width="100%" height={Math.max(160, data.length * 34)}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
          >
            <XAxis type="number" hide allowDecimals={false} />
            <YAxis
              type="category"
              dataKey="name"
              tick={AXIS}
              tickLine={false}
              axisLine={false}
              width={120}
            />
            <Tooltip
              cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
              content={({ active, payload, label }) =>
                active && payload?.length ? (
                  <TooltipBox label={String(label)} rows={[{ name: 'Leads', value: String(payload[0].value) }]} />
                ) : null
              }
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="#f43f5e" barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
}

export function ValueByStatus({ leads }: { leads: Lead[] }) {
  // Rohes Volumen plus den mit der Stufenwahrscheinlichkeit gewichteten Wert –
  // letzterer ist die realistische Erwartung und steht im Tooltip.
  const data = STATUS_ORDER.map((status) => {
    const inStage = leads.filter((l) => normalizeStatus(l.status) === status);
    return {
      status,
      label: STATUS_META[status].short,
      value: inStage.reduce((sum, l) => sum + (l.est_value ?? 0), 0),
      weighted: Math.round(inStage.reduce((sum, l) => sum + weightedValue(l), 0)),
    };
  }).filter((d) => d.value > 0 || STATUS_META[d.status].group === 'open');

  return (
    <ChartCard title="Pipeline-Wert nach Stufe" subtitle="Volumen und gewichteter Forecast">
      <ResponsiveContainer width="100%" height={Math.max(220, data.length * 26)}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        >
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="label"
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            width={92}
          />
          <Tooltip
            cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipBox
                  label={String(label)}
                  rows={[
                    { name: 'Volumen', value: formatEuro(Number(payload[0].value)) },
                    {
                      name: 'Gewichtet',
                      value: formatEuro(Number(payload[0].payload?.weighted ?? 0)),
                    },
                  ]}
                />
              ) : null
            }
          />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14}>
            {data.map((d) => (
              <Cell key={d.status} fill={STATUS_META[d.status].chart} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
