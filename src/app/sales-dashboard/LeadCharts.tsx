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
  type LeadStatus,
  STATUS_META,
  STATUS_ORDER,
  displaySource,
  displaySourceColor,
  formatEuro,
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

export function LeadsTrendChart({ leads, days = 30 }: { leads: Lead[]; days?: number }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const buckets: { key: string; label: string; count: number }[] = [];
  const index = new Map<string, number>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    index.set(key, buckets.length);
    buckets.push({
      key,
      label: d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      count: 0,
    });
  }
  for (const lead of leads) {
    const key = new Date(lead.created_at).toISOString().slice(0, 10);
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

export function StatusFunnel({ leads }: { leads: Lead[] }) {
  const data = STATUS_ORDER.map((status) => ({
    status,
    label: STATUS_META[status].label,
    count: leads.filter((l) => l.status === status).length,
  }));
  const colors: Record<LeadStatus, string> = {
    new: '#0ea5e9',
    contacted: '#f59e0b',
    qualified: '#8b5cf6',
    won: '#10b981',
    lost: '#f43f5e',
  };

  return (
    <ChartCard title="Pipeline nach Status">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <XAxis dataKey="label" tick={AXIS} tickLine={false} axisLine={false} />
          <YAxis tick={AXIS} tickLine={false} axisLine={false} allowDecimals={false} width={32} />
          <Tooltip
            cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipBox label={String(label)} rows={[{ name: 'Leads', value: String(payload[0].value) }]} />
              ) : null
            }
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((d) => (
              <Cell key={d.status} fill={colors[d.status]} />
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
  const data = STATUS_ORDER.map((status) => ({
    status,
    label: STATUS_META[status].label,
    value: leads
      .filter((l) => l.status === status)
      .reduce((sum, l) => sum + (l.est_value ?? 0), 0),
  }));
  const colors: Record<LeadStatus, string> = {
    new: '#0ea5e9',
    contacted: '#f59e0b',
    qualified: '#8b5cf6',
    won: '#10b981',
    lost: '#64748b',
  };

  return (
    <ChartCard title="Pipeline-Wert nach Status" subtitle="Geschätztes Volumen">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
          <XAxis dataKey="label" tick={AXIS} tickLine={false} axisLine={false} />
          <YAxis
            tick={AXIS}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))}
          />
          <Tooltip
            cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipBox label={String(label)} rows={[{ name: 'Wert', value: formatEuro(Number(payload[0].value)) }]} />
              ) : null
            }
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((d) => (
              <Cell key={d.status} fill={colors[d.status]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
