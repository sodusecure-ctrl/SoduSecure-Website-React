# SEO_CHANGELOG.md — sodusecure.com

Branch: `seo-optimierung`. Build nach jeder Einheit grün (Typecheck ✓, Lint ✓, `next build` ✓ — 137 Seiten).
Preis-Aussage vereinheitlicht (Vorgabe): **automatisierter Scan ab 1.500 €**, **manueller Pentest individuell, meist 7.000–15.000 € (Ø ~8.000 €)**.

## Welle 1 — umgesetzt

| Commit | Datei(en) | Änderung | Wirkung |
|---|---|---|---|
| docs | `SEO_AUDIT.md`, `SEO_PLAN.md` | Phase-0-Audit + Phase-1-Plan | Grundlage |
| style(nav) | `components/common/Header.tsx`, `Footer.tsx` | „Über uns" & „Kontakt" aus Top-Nav → Footer (neben Impressum); „Fallstudien & Blogs"-Label → „Fallstudien"/„Case studies" | Aufgeräumte, klickfreundlichere Top-Nav |
| feat(seo) | `components/common/RegulationPage.tsx` | JSON-LD **Service + FAQPage + BreadcrumbList** zentral | Schema für **nis2, dora, mdr, bsig, bsi-tr-03161, iso-27001** (6 Seiten) auf einen Schlag |
| feat(seo) | `lib/serviceJsonLd.tsx` (neu) + 8× `services/*/layout.tsx` (neu) | Eigene Title/Desc/Canonical/OG + Service-Schema | Behebt **8× Duplicate-Title** (alle erbten zuvor den Root-Title); deutsche Fokus-Keywords je Scope |
| feat(seo) | `iso-27001-pentest-anforderungen/`, `iso-27001-zertifizierung/`, `penetrationstest-anbieter/` (layout.tsx neu) | Verwaiste `metadata.ts` **verdrahtet** + ServiceJsonLd; ASCII-Schreibweisen (fuer/seriouse/Qualitaet) → echte Umlaute | 3 Compliance-/Anbieter-Seiten erstmals mit wirksamer, sauberer Metadata |
| feat(seo) | `pentest-gesundheitsanwendungen/layout.tsx` | ServiceJsonLd (DiGA) ergänzt | Schema für DiGA-Pentest |
| fix(seo) | `app/sitemap.ts` | 16 fehlende Routes ergänzt (Check-Seiten, /pricing, Service-Dubletten, Cyber-Security-Check, /security) | Indexierung neuer/wichtiger Seiten |

### Korrektur am Audit
`pentest-gesundheitsanwendungen` und `anfrage-tr03161` hatten **bereits** Metadata (über `metadata.ts` + Layout-Re-Export) — im ersten Audit fälschlich als „fehlend" markiert (Grep-Ausgabe war abgeschnitten). Nicht überschrieben.

---

## Offen (nächste Wellen — zur Freigabe/Fortsetzung)

**Welle 2 (Prio 1/2 Feinschliff):**
- Compliance-Titles/Descriptions auf 50–60 / 140–160 Zeichen trimmen (z. T. >60/>160).
- Preis-Fakten in bestehenden Titles/Descriptions vereinheitlichen (u. a. `pentest/layout.tsx` „ab 1.200 €", diverse „ab 2.500 €" → neue Aussage).
- Berlin-Unterseiten: H1/BreadcrumbList prüfen/ergänzen.

**Welle 3 (neue Seiten — im bestehenden Template, nur belegbare Fakten):**
- Compliance: `/tlpt`, `/tisax`, `/pci-dss-penetrationstest` (RegulationPage-Template).
- Scopes: `/services/active-directory`, `/services/aws-penetrationstest`.
- Lokal: `/penetrationstest-deutschland`.
- Wissen-Hub `/wissen/*` + Branchen-Hub `/branchen/*` (ToFu → interne Verlinkung auf Money-Pages).

**Welle 4 (technisch):**
- Cannibalization: Near-Dubletten (`/penetration-testing-service`, `/pentesting-service`, `/penetrationstest-anbieter`, `/brauche-ich-einen-pentest`) per `canonical` auf Pillar bündeln.
- hreflang ehrlich (nur DE / x-default — keine echten EN-URLs außer `/request-pentest/en`).
- Organization/LocalBusiness-Schema (Berlin) global; `robots.ts` `host` entfernen, `/ifudhuhdksjhfoiadfh` ausschließen.
- Verification-Platzhalter entfernen/echte Codes (von dir).
- AggregateRating/Review nur mit echter Quelle (in der Codebase nicht vorhanden → bislang weggelassen).
- Core Web Vitals pro Seite (next/image für `<img>`, Lazy-Loading, CLS-Check) — ohne Layout-Bruch.
