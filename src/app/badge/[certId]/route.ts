import { getCertificate, SCORE_META, type Certificate } from "@/data/certificates";

/**
 * Liefert das Prüfsiegel als eigenständiges SVG-Bild, z. B. /badge/SS-2026-0001.
 * Kunden binden es als <img> ein – funktioniert damit in jedem CMS, Baukasten
 * und auch in React/JSX (keine Inline-Style-Strings nötig).
 */

function badgeSvg(cert: Certificate): string {
  const meta = SCORE_META[cert.category];
  const scoreDisplay = cert.score.toFixed(1).replace(".", ",");
  const year = new Date(cert.date).getFullYear();
  const label = meta.label.toUpperCase();
  const pillWidth = Math.max(72, label.length * 7 + 28);
  const pillX = (178 - pillWidth) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="178" height="222" viewBox="0 0 178 222" role="img" aria-label="Sodu Secure Security-Zertifikat ${cert.id}: ${meta.label}, Score ${scoreDisplay}">
  <title>Sodu Secure Security-Zertifikat ${cert.id} – ${meta.label} (${scoreDisplay})</title>
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.10"/>
    </filter>
  </defs>

  <!-- Karte -->
  <rect x="5" y="4" width="168" height="212" rx="14" fill="#ffffff" stroke="#E2E8F0" stroke-width="1" filter="url(#shadow)"/>
  <!-- roter Akzent oben -->
  <rect x="5" y="4" width="168" height="5" rx="2.5" fill="#cc0000"/>

  <!-- Logo -->
  <g transform="translate(50,22)">
    <rect width="30" height="30" rx="7" fill="#cc0000"/>
    <path d="M15 3 L24.6 7.8 L24.6 17.4 C24.6 22.2 19.5 26.4 15 27.6 C10.5 26.4 5.4 22.2 5.4 17.4 L5.4 7.8 Z" fill="#ffffff"/>
    <text x="15" y="20.5" text-anchor="middle" font-size="12" font-weight="900" fill="#cc0000" font-family="'Segoe UI',system-ui,sans-serif">S</text>
  </g>
  <text x="88" y="35" font-size="14" font-weight="700" fill="#cc0000" font-family="'Segoe UI',system-ui,sans-serif">sodu</text>
  <text x="88" y="47" font-size="10" fill="#64748B" font-family="'Segoe UI',system-ui,sans-serif">Secure</text>

  <!-- Score -->
  <text x="89" y="76" text-anchor="middle" font-size="9" letter-spacing="1.6" fill="#94A3B8" font-family="'Segoe UI',system-ui,sans-serif">SECURITY SCORE</text>
  <text x="89" y="112" text-anchor="middle" font-size="36" font-weight="800" fill="${meta.color}" font-family="'Segoe UI',system-ui,sans-serif">${scoreDisplay}</text>
  <text x="89" y="128" text-anchor="middle" font-size="10" fill="#94A3B8" font-family="'Segoe UI',system-ui,sans-serif">von 1,0 (Bestwert)</text>

  <!-- Kategorie-Pill -->
  <rect x="${pillX}" y="139" width="${pillWidth}" height="22" rx="11" fill="${meta.bg}" stroke="${meta.border}" stroke-opacity="0.35"/>
  <text x="89" y="154" text-anchor="middle" font-size="9.5" font-weight="700" letter-spacing="0.6" fill="${meta.color}" font-family="'Segoe UI',system-ui,sans-serif">${label}</text>

  <text x="89" y="177" text-anchor="middle" font-size="10" fill="#94A3B8" font-family="'Segoe UI',system-ui,sans-serif">Pentest ${year} · ${cert.id}</text>

  <!-- Trenner + Verifizieren -->
  <line x1="21" y1="188" x2="157" y2="188" stroke="#F1F5F9" stroke-width="1"/>
  <text x="89" y="206" text-anchor="middle" font-size="10" font-weight="600" fill="#cc0000" font-family="'Segoe UI',system-ui,sans-serif">✓ Zertifikat verifizieren</text>
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
    },
  });
}
