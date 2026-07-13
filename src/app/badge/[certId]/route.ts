import { getCertificate, SCORE_META, type Certificate } from "@/data/certificates";

/**
 * Liefert das Prüfsiegel als eigenständiges SVG-Bild, z. B. /badge/SS-2026-0001.
 * Kunden binden es als <img> ein – funktioniert damit in jedem CMS, Baukasten
 * und auch in React/JSX (keine Inline-Style-Strings nötig).
 */

const FONT = "'Segoe UI',system-ui,-apple-system,sans-serif";

function badgeSvg(cert: Certificate): string {
  const meta = SCORE_META[cert.category];
  const scoreDisplay = cert.score.toFixed(1).replace(".", ",");
  const year = new Date(cert.date).getFullYear();
  const label = meta.label.toUpperCase();
  const pillWidth = Math.max(76, label.length * 7.5 + 30);
  const pillX = (200 - pillWidth) / 2;

  // Score-Ring: 1,0 = voll, 5,0 = leer
  const progress = Math.min(1, Math.max(0.05, (5 - cert.score) / 4));
  const r = 34;
  const circumference = 2 * Math.PI * r;
  const dash = (progress * circumference).toFixed(1);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="256" viewBox="0 0 200 256" role="img" aria-label="Sodu Secure Security-Zertifikat ${cert.id}: ${meta.label}, Score ${scoreDisplay}">
  <title>Sodu Secure Security-Zertifikat ${cert.id} – ${meta.label} (${scoreDisplay})</title>
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#0f172a" flood-opacity="0.14"/>
    </filter>
    <linearGradient id="hdr" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#E01010"/>
      <stop offset="1" stop-color="#9E0000"/>
    </linearGradient>
  </defs>

  <!-- Karte -->
  <rect x="4" y="4" width="192" height="248" rx="16" fill="#ffffff" stroke="#E5E7EB" stroke-width="1" filter="url(#shadow)"/>

  <!-- Header-Band -->
  <path d="M20 4 h160 a16 16 0 0 1 16 16 v42 h-192 v-42 a16 16 0 0 1 16 -16 z" fill="url(#hdr)"/>
  <g transform="translate(18,17)">
    <path d="M16 1 L29 7 L29 19 C29 26 22.5 31.5 16 33 C9.5 31.5 3 26 3 19 L3 7 Z" fill="#ffffff"/>
    <text x="16" y="23" text-anchor="middle" font-size="14" font-weight="900" fill="#C00000" font-family="${FONT}">S</text>
  </g>
  <text x="58" y="32" font-size="13" font-weight="800" letter-spacing="0.5" fill="#ffffff" font-family="${FONT}">SODU SECURE</text>
  <text x="58" y="46" font-size="7.5" letter-spacing="1.4" fill="#ffffff" fill-opacity="0.8" font-family="${FONT}">GEPRÜFTE IT-SICHERHEIT</text>

  <!-- Caption -->
  <text x="100" y="88" text-anchor="middle" font-size="9" letter-spacing="1.8" fill="#94A3B8" font-family="${FONT}">SECURITY SCORE</text>

  <!-- Score-Ring -->
  <g transform="rotate(-90 100 138)">
    <circle cx="100" cy="138" r="${r}" fill="none" stroke="#EEF2F7" stroke-width="7"/>
    <circle cx="100" cy="138" r="${r}" fill="none" stroke="${meta.color}" stroke-width="7" stroke-linecap="round"
      stroke-dasharray="${dash} ${circumference.toFixed(1)}"/>
  </g>
  <text x="100" y="144" text-anchor="middle" font-size="27" font-weight="800" fill="${meta.color}" font-family="${FONT}">${scoreDisplay}</text>
  <text x="100" y="158" text-anchor="middle" font-size="8.5" fill="#94A3B8" font-family="${FONT}">von 1,0</text>

  <!-- Kategorie-Pill -->
  <rect x="${pillX}" y="186" width="${pillWidth}" height="24" rx="12" fill="${meta.bg}" stroke="${meta.border}" stroke-opacity="0.4"/>
  <text x="100" y="202" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="0.8" fill="${meta.color}" font-family="${FONT}">${label}</text>

  <text x="100" y="224" text-anchor="middle" font-size="9" fill="#94A3B8" font-family="${FONT}">Pentest ${year} · ${cert.id}</text>

  <!-- Trenner + Verifizieren -->
  <line x1="24" y1="232" x2="176" y2="232" stroke="#F1F5F9" stroke-width="1"/>
  <path d="M55 242.5 l3.2 3.2 l6 -6.4" stroke="#C00000" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="71" y="246" font-size="9.5" font-weight="600" fill="#C00000" font-family="${FONT}">Zertifikat verifizieren</text>
</svg>`;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ certId: string }> }
) {
  const { certId } = await params;
  // .svg-Endung erlauben: /badge/SS-2026-0001.svg
  const id = certId.replace(/\.svg$/i, "");
  const cert = getCertificate(id);
  if (!cert) {
    return new Response("Zertifikat nicht gefunden", { status: 404 });
  }
  return new Response(badgeSvg(cert), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Badge-Rev": "2",
    },
  });
}
