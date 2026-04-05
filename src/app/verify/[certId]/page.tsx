import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getCertificate,
  SCORE_META,
  SCOPE_LABELS,
  CERTIFICATES,
  type Certificate,
} from "@/data/certificates";
import {
  Shield,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  ExternalLink,
  Copy,
} from "lucide-react";

// ── Static params for pre-rendering ──────────────────────────────────────────
export async function generateStaticParams() {
  return CERTIFICATES.map((c) => ({ certId: c.id }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ certId: string }>;
}): Promise<Metadata> {
  const { certId } = await params;
  const cert = getCertificate(certId);
  if (!cert) {
    return { title: "Zertifikat nicht gefunden | SODU Secure" };
  }
  const meta = SCORE_META[cert.category];
  return {
    title: `Security-Zertifikat ${cert.id} – ${cert.company} | SODU Secure`,
    description: `${cert.company} hat einen verifizierten Penetrationstest durch SODU Secure bestanden. Bewertung: ${meta.label} (${cert.score.toFixed(1).replace(".", ",")}). Ausgestellt am ${new Date(cert.date).toLocaleDateString("de-DE")}.`,
    robots: { index: true, follow: true },
    openGraph: {
      title: `${cert.company} – Sicherheitszertifikat ${meta.label}`,
      description: `Verifizierter Pentest von SODU Secure. Score: ${cert.score.toFixed(1).replace(".", ",")} (${meta.label})`,
      url: `https://www.sodusecure.com/verify/${cert.id}`,
      siteName: "SODU Secure",
    },
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function isExpired(validUntil: string) {
  return new Date(validUntil) < new Date();
}

function FindingBar({
  label,
  count,
  color,
  max,
}: {
  label: string;
  count: number;
  color: string;
  max: number;
}) {
  const pct = max > 0 ? Math.round((count / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-20 shrink-0 text-gray-400">{label}</span>
      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-6 text-right font-semibold text-white">{count}</span>
    </div>
  );
}

// ── Badge embed code helper ───────────────────────────────────────────────────
function getBadgeCode(cert: Certificate): string {
  const meta = SCORE_META[cert.category];
  const scoreDisplay = cert.score.toFixed(1).replace(".", ",");
  const year = new Date(cert.date).getFullYear();
  return `<!-- SoduSecure Security Badge – sodusecure.com/verify/${cert.id} -->
<a href="https://www.sodusecure.com/verify/${cert.id}"
   target="_blank" rel="noopener"
   style="display:inline-flex;flex-direction:column;align-items:center;
          background:#fff;border:2px solid #cc0000;border-radius:10px;
          padding:12px 16px 10px;text-decoration:none;color:#1a1a1a;
          font-family:'Segoe UI',system-ui,sans-serif;min-width:130px;">
  <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px;">
    <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="#cc0000"/>
      <path d="M50 10 L82 26 L82 58 C82 74 65 88 50 92 C35 88 18 74 18 58 L18 26 Z" fill="white"/>
      <text x="50" y="66" text-anchor="middle" font-size="38" font-weight="900" fill="#cc0000" font-family="Segoe UI,sans-serif">S</text>
    </svg>
    <div style="font-size:13px;font-weight:700;color:#cc0000;line-height:1.2;">
      sodu<span style="display:block;font-weight:400;color:#444;font-size:11px;">Secure</span>
    </div>
  </div>
  <div style="font-size:10px;color:#888;text-transform:uppercase;letter-spacing:.08em;margin-bottom:2px;">Security Score</div>
  <div style="font-size:24px;font-weight:700;color:${meta.color};line-height:1;">${scoreDisplay}</div>
  <div style="font-size:12px;color:#aaa;margin-bottom:8px;">von 1,0</div>
  <div style="font-size:10px;font-weight:600;padding:3px 10px;border-radius:20px;margin-bottom:6px;
              letter-spacing:.05em;text-transform:uppercase;background:${meta.bg};color:${meta.color};">
    ${meta.label}
  </div>
  <div style="font-size:10px;color:#bbb;">Pentest ${year}</div>
  <div style="margin-top:8px;font-size:10px;color:#cc0000;border-top:1px solid #f0e0e0;
              padding-top:7px;width:100%;text-align:center;letter-spacing:.04em;">
    ✓ Zertifikat verifizieren
  </div>
</a>`;
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function VerifyPage({
  params,
}: {
  params: Promise<{ certId: string }>;
}) {
  const { certId } = await params;
  const cert = getCertificate(certId);
  if (!cert) notFound();

  const meta = SCORE_META[cert.category];
  const expired = isExpired(cert.validUntil);
  const scoreDisplay = cert.score.toFixed(1).replace(".", ",");
  const embedCode = getBadgeCode(cert);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Certification",
    name: `SODU Secure Security-Zertifikat ${cert.id}`,
    description: cert.description ?? `Verifizierter Penetrationstest für ${cert.company}`,
    dateCreated: cert.date,
    validThrough: cert.validUntil,
    certificationStatus: expired ? "Expired" : "Active",
    issuedBy: {
      "@type": "Organization",
      name: "SODU Secure GmbH",
      url: "https://www.sodusecure.com",
    },
    recognizedBy: {
      "@type": "Organization",
      name: cert.company,
      url: cert.companyUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#0a0a0a] text-white">
        {/* ── Top bar ── */}
        <div className="border-b border-white/10 bg-[#111]">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-white hover:text-red-400 transition-colors"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100" height="100" rx="20" fill="#cc0000" />
                <path
                  d="M50 10 L82 26 L82 58 C82 74 65 88 50 92 C35 88 18 74 18 58 L18 26 Z"
                  fill="white"
                />
                <text
                  x="50"
                  y="66"
                  textAnchor="middle"
                  fontSize="38"
                  fontWeight="900"
                  fill="#cc0000"
                  fontFamily="Segoe UI,sans-serif"
                >
                  S
                </text>
              </svg>
              <div className="leading-tight">
                <div className="font-bold text-base">SODU</div>
                <div className="text-xs text-gray-400 -mt-1">Secure</div>
              </div>
            </Link>
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              Zertifikats-Verifikation
            </span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">

          {/* ── Status banner ── */}
          {expired ? (
            <div className="flex items-center gap-3 bg-yellow-900/30 border border-yellow-700/50 rounded-xl px-5 py-4 text-yellow-300">
              <AlertTriangle className="shrink-0" size={20} />
              <span className="text-sm font-medium">
                Dieses Zertifikat ist abgelaufen (gültig bis{" "}
                {formatDate(cert.validUntil)}). Der Pentest-Status muss erneuert werden.
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-green-900/30 border border-green-700/50 rounded-xl px-5 py-4 text-green-300">
              <CheckCircle className="shrink-0" size={20} />
              <span className="text-sm font-medium">
                Dieses Zertifikat ist <strong>aktiv und verifiziert</strong>. Gültig bis{" "}
                {formatDate(cert.validUntil)}.
              </span>
            </div>
          )}

          {/* ── Hero card ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Score card */}
            <div
              className="flex flex-col items-center justify-center rounded-2xl p-8 text-center"
              style={{
                background: `${meta.bg}18`,
                border: `2px solid ${meta.border}55`,
              }}
            >
              <div className="text-xs uppercase tracking-widest text-gray-400 mb-3">
                Security Score
              </div>
              <div
                className="text-6xl font-black leading-none mb-2"
                style={{ color: meta.color }}
              >
                {scoreDisplay}
              </div>
              <div className="text-sm text-gray-500 mb-4">von 1,0 (Bestwert)</div>
              <div
                className="px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider"
                style={{ background: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
              >
                {meta.label}
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                  Unternehmen
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">{cert.company}</span>
                  {cert.companyUrl && (
                    <Link
                      href={cert.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <ExternalLink size={16} />
                    </Link>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    Zertifikat-ID
                  </div>
                  <div className="font-mono text-red-400 font-semibold">{cert.id}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    Prüfer
                  </div>
                  <div className="text-white">{cert.tester}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    Ausgestellt am
                  </div>
                  <div className="flex items-center gap-1.5 text-white">
                    <Calendar size={13} className="text-gray-500" />
                    {formatDate(cert.date)}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">
                    Gültig bis
                  </div>
                  <div
                    className={`flex items-center gap-1.5 ${
                      expired ? "text-yellow-400" : "text-white"
                    }`}
                  >
                    <Calendar size={13} className="text-gray-500" />
                    {formatDate(cert.validUntil)}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                  Testumfang (Scope)
                </div>
                <div className="flex flex-wrap gap-2">
                  {cert.scope.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1 rounded-full bg-red-900/30 border border-red-800/50 text-red-300"
                    >
                      {SCOPE_LABELS[s]}
                    </span>
                  ))}
                </div>
              </div>

              {cert.description && (
                <div className="text-sm text-gray-400 border-t border-white/10 pt-3">
                  {cert.description}
                </div>
              )}
            </div>
          </div>

          {/* ── Findings ── */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Testergebnisse</h2>
            <p className="text-xs text-gray-500 mb-5">
              Anzahl identifizierter Schwachstellen nach Schweregrad
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <FindingBar
                  label="Kritisch"
                  count={cert.findingsCritical}
                  color="#cc0000"
                  max={cert.findingsTotal || 1}
                />
                <FindingBar
                  label="Hoch"
                  count={cert.findingsHigh}
                  color="#e05c00"
                  max={cert.findingsTotal || 1}
                />
                <FindingBar
                  label="Mittel"
                  count={cert.findingsMedium}
                  color="#cc8800"
                  max={cert.findingsTotal || 1}
                />
                <FindingBar
                  label="Niedrig"
                  count={cert.findingsLow}
                  color="#2266cc"
                  max={cert.findingsTotal || 1}
                />
                <FindingBar
                  label="Info"
                  count={cert.findingsInfo}
                  color="#555"
                  max={cert.findingsTotal || 1}
                />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-gray-400">Gefundene Schwachstellen gesamt</span>
                  <span className="font-bold text-white text-lg">{cert.findingsTotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Alle kritischen Findings behoben</span>
                  {cert.allCriticalFixed ? (
                    <span className="flex items-center gap-1.5 text-green-400 font-semibold">
                      <CheckCircle size={15} /> Ja
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                      <XCircle size={15} /> Nein
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Zertifikatsstatus</span>
                  {expired ? (
                    <span className="text-yellow-400 font-semibold">Abgelaufen</span>
                  ) : (
                    <span className="text-green-400 font-semibold">Aktiv</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Bewertungsskala ── */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Bewertungsskala</h2>
            <p className="text-xs text-gray-500 mb-5">
              So wird der Security Score ermittelt
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(SCORE_META).map(([key, m]) => (
                <div
                  key={key}
                  className={`rounded-xl p-3 border ${
                    key === cert.category ? "outline outline-2" : ""
                  }`}
                  style={{
                    background: `${m.bg}22`,
                    borderColor: `${m.border}55`,
                    outlineColor: key === cert.category ? m.border : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-bold uppercase tracking-wider"
                      style={{ color: m.color }}
                    >
                      {m.label}
                    </span>
                    {key === cert.category && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: m.bg, color: m.color }}
                      >
                        Diese Bewertung
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    Score:{" "}
                    {m.minScore === m.maxScore
                      ? m.minScore.toFixed(1).replace(".", ",")
                      : `${m.minScore.toFixed(1).replace(".", ",")} – ${m.maxScore.toFixed(1).replace(".", ",")}`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Was bedeutet der Score ── */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white">Was bedeutet der Score?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
              <div className="space-y-2">
                <p>
                  <strong className="text-white">0,7 – Ausgezeichnet+:</strong> Das Unternehmen hat
                  nicht nur alle Tests bestanden, sondern geht proaktiv über den Mindeststandard
                  hinaus – z.B. durch Bug-Bounty-Programme, Penetrationstest-Erfahrung oder bereits
                  implementierte Security-Prozesse.
                </p>
                <p>
                  <strong className="text-white">1,0 – Testsieger:</strong> Höchstnote. Alle
                  getesteten Bereiche haben den Test bestanden. Keine kritischen oder hohen
                  Findings zum Zeitpunkt der Zertifizierung offen.
                </p>
                <p>
                  <strong className="text-white">1,5 – Sehr gut:</strong> Kleinere
                  Schwachstellen wurden gefunden. Alle kritischen und hohen Findings wurden vor
                  Abschluss des Tests vollständig behoben.
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong className="text-white">2,0 – Gut:</strong> Mehrere Schwachstellen
                  identifiziert. Alle kritischen Findings behoben, einzelne mittlere offen – mit
                  dokumentiertem Behebungsplan.
                </p>
                <p>
                  <strong className="text-white">2,5 – Befriedigend:</strong> Mittlere bis hohe
                  Schwachstellen identifiziert, Nachbesserungen laufen aktiv. Keine direkte Gefahr
                  für Nutzerdaten.
                </p>
                <p>
                  <strong className="text-white">3,0 – 5,0:</strong> Erhebliche Schwachstellen
                  offen. Zertifikat wird in der Regel erst nach vollständiger Behebung ausgestellt.
                </p>
              </div>
            </div>
          </div>

          {/* ── Embed code ── */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <h2 className="text-base font-bold text-white mb-1">Badge Embed-Code</h2>
            <p className="text-xs text-gray-500 mb-4">
              Diesen HTML-Code in die Website einbetten – der Badge verlinkt automatisch auf diese
              Verifikationsseite.
            </p>
            <div className="relative">
              <pre className="text-xs text-green-300 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                {embedCode}
              </pre>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-gray-600">
            <span>
              Dieses Zertifikat wurde ausgestellt von{" "}
              <Link href="/" className="text-red-500 hover:text-red-400">
                SODU Secure GmbH
              </Link>
            </span>
            <div className="flex items-center gap-4">
              <Link href="/pentest-konfigurator" className="hover:text-gray-400 transition-colors">
                Eigenen Pentest anfragen
              </Link>
              <Link href="/contact" className="hover:text-gray-400 transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
