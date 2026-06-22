# SEO_AUDIT.md — sodusecure.com

**Phase 0 – Bestandsaufnahme.** Read-only Audit, keine Code-Änderungen. Stand: 2026-06-22.

---

## 0. Stack-Verifikation

| Punkt | Befund |
|---|---|
| Framework | **Next.js 15.0.7**, **App Router** (`src/app/**`) |
| React | 19.1.0 |
| Styling | Tailwind v4 |
| i18n | **next-intl 4.6.1** über `i18n/request.js` (Plugin in `next.config.ts`) |
| Locale-Mechanik | **Cookie-/Server-basiert** (`getLocale()` im Root-Layout). `src/lib/localeRouting.ts` hält für **alle** Routes denselben Pfad für DE und EN („to avoid /en/* 404s"). Einzige Ausnahme: `/request-pentest`, `/request-pentest-ads`, `/request-pentest-ads-g` haben echte `…/en`-Pfade. |
| Routes gesamt | **116** `page.tsx` (inkl. `/api`-frei; dynamische `[id]`, `[plan]`, `[certId]`). |
| Metadata-Quellen | `page.tsx export const metadata` (49) · `layout.tsx export const metadata` (~26) · `generateMetadata` (2: `verify/[certId]`, `get-started/[plan]`) · **ohne Metadata** (Rest → erbt Root-Title). |

### 🔴 Architektur-Kernbefund (entscheidet Phase 3 hreflang)
Weil DE und EN **auf derselben URL** liegen (Cookie steuert die Sprache), existiert **keine separat indexierbare EN-Version** pro Seite. Folgen:
- **hreflang lässt sich nicht sauber pro Seite umsetzen** (es gibt keine distinkte `…/en`-URL als Ziel). Aktuell setzt `src/lib/metadata.ts` nur `languages: { de: url }`.
- Google sieht im Crawl immer die **Default-Sprache (DE)**. Die EN-Inhalte sind faktisch unsichtbar für die Suche.
- **Empfehlung (Phase 1-Entscheid nötig):** Entweder (a) hreflang ehrlich auf „nur DE" beschränken und `x-default` = DE setzen, oder (b) später echte `/en/*`-Pfade einführen (größerer Umbau, **nicht** Teil dieses On-Page-Auftrags). Für jetzt: Option (a) sauber umsetzen, kein Fake-hreflang.

---

## 1. Globale SEO-Infrastruktur

### 1.1 Root-Layout (`src/app/layout.tsx`)
- ✅ `metadataBase`, Title-**Template** `%s | SODU Secure`, Default-Title `Pentest Berlin – Preis sofort berechnen | SODU Secure`, Description, OG, Twitter, robots, Icons/Manifest, GTM, Google Ads, Vercel Analytics/Speed-Insights.
- 🟠 `verification.google = 'your-google-verification-code'`, `yandex`/`bing` ebenfalls **Platzhalter** → entfernen oder echte Codes setzen (sonst ungültiges `<meta>`).
- 🟠 `<html lang={locale}>` ist dynamisch korrekt, aber siehe hreflang-Befund oben.

### 1.2 Metadata-Helper (`src/lib/metadata.ts`)
- 🟠 `generatePageMetadata()` hängt **englischen** Suffix an: `… | sodusecure - Professional Penetration Testing` — inkonsistent zur Marke „SODU Secure" und macht Titles **zu lang** (>60). **Aktuell offenbar nirgends aktiv verwendet** (alle realen Titles kommen aus page/layout). Kandidat zum Aufräumen/Vereinheitlichen.
- 🔴 `serviceMetadata` (webAppTesting, mobileAppTesting, apiSecurity, networkAudit, infrastructureTesting, cloudDevOps, securityAudit, vulnerabilityAssessment, smePackages) ist **definiert, aber für `/services/*` ungenutzt** → siehe §2 Scopes.

### 1.3 JSON-LD-Helper (`src/lib/jsonld.tsx`)
- Vorhanden: `Organization`, `Service`, `FAQPage`, `BreadcrumbList`, `WebPage`. ✅ gute Basis.
- 🔴 **Kaum eingesetzt.** JSON-LD existiert nur punktuell (einige `layout.tsx` mit inline Service/Offer/FAQ; `ProfessionalService` auf den Check-Seiten; `Organization`+`FAQPage` auf der Startseite). Es gibt **nirgends** `BreadcrumbList`, **kein** `LocalBusiness` (trotz Sitz Berlin), und auf den wichtigsten Compliance-Seiten **gar kein** Schema (siehe §2).

### 1.4 `sitemap.ts`
- Statische, **hand-gepflegte** Liste + Service-Routes + Blog-Posts. 🔴 **Veraltet/unvollständig:**
  - **Fehlen** u. a.: `/pentest-schnellcheck`, `/pentest-risiko-check`, `/brauche-ich-pentest` (neue Check-Seiten), `/pricing`, `/corporate*`, `/security`, `/cyber-security-check(-kosten/-preis)`, `/phishing-simulation`, `/red-team-assessment(-service)`, `/vulnerability-assessment(-service)`, `/penetration-testing-service`, `/pentesting-service`, `/penetration-testing-anbieter`, sowie der gesamte **AuditAI/Claude-Cluster**.
  - **Enthält** `/brauche-ich-einen-pentest` (ältere Variante) — Dublette zur neuen `/brauche-ich-pentest`.
  - Lastmod-Daten teils in der Zukunft/inkonsistent, manuell gepflegt → fehleranfällig.
- **Empfehlung:** auf semi-automatische Generierung umstellen (statische Kuratierung + bewusste `noindex`-Ausnahmen), damit neue Seiten nicht vergessen werden.

### 1.5 `robots.ts`
- ✅ erlaubt `/`, sperrt `/api/`, OTP/verify-Routen.
- 🟠 `host` ist non-standard/deprecated (Google ignoriert es). 🟠 Junk-Route `/ifudhuhdksjhfoiadfh` und ggf. `/corporate*`-Testvarianten nicht ausgeschlossen.

---

## 2. Route-Inventar nach Keyword-Cluster

Legende: ✅ ok · 🟠 verbesserbar · 🔴 Lücke. „Title-Quelle" = wo die Metadata herkommt.

### Cluster 4 — Compliance & Regulatorik (PRIO 1, wichtigster Cluster)

| Route | Title-Quelle | Title (Länge) | Description | H1 | JSON-LD | Canonical | Status / Lücke |
|---|---|---|---|---|---|---|---|
| `/iso-27001` | page | „ISO 27001: Zertifizierung, Anforderungen & Pentest \| SODU Secure" (73) | ✅ 194 | ✅ 1 (RegulationPage) | 🔴 **keins** | ✅ `/iso-27001` | Title >60; **kein FAQPage/Service/Breadcrumb** trotz FAQ-Block |
| `/nis2` | page | „NIS2-Richtlinie: Anforderungen & Umsetzung \| SODU Secure" (76) | ✅ 179 | ✅ 1 | 🔴 keins | ✅ | wie oben |
| `/dora` | page | „DORA-Verordnung: Digitale operationale Resilienz \| SODU Secure" (74) | ✅ 171 | ✅ 1 | 🔴 keins | ✅ | wie oben; **TLPT** nur als Abschnitt, keine eigene Seite |
| `/mdr` | page | „MDR & Cybersecurity für Medizinprodukte \| SODU Secure" (64) | ✅ 176 | ✅ 1 | 🔴 keins | ✅ | wie oben |
| `/bsig` | page | „BSIG & KRITIS: § 8a Nachweis & Pentests \| SODU Secure" (66) | ✅ 182 | ✅ 1 | 🔴 keins | ✅ | wie oben |
| `/bsi-tr-03161` | page | „BSI TR-03161: Sicherheit für DiGA & DiPA \| SODU Secure" (67) | ✅ 206 (>160) | ✅ 1 | 🔴 keins | ✅ | Desc kürzen; Schema fehlt |
| `/iso-27001-pentest-anforderungen` | **none (use client)** | 🔴 erbt Root-Title | 🔴 keine | ✅ 1 (JSX) | 🔴 keins | 🔴 keins | **Kein Metadata** → Duplicate-Title; canonical fehlt |
| `/iso-27001-zertifizierung` | **none (use client)** | 🔴 erbt Root-Title | 🔴 keine | 🟠 prüfen (evtl. 0) | 🔴 keins | 🔴 keins | **Kein Metadata**; H1 verifizieren |
| `/pentest-gesundheitsanwendungen` | **none (use client)** | 🔴 erbt Root-Title | 🔴 keine | ✅ 1 | 🔴 keins | 🔴 keins | **Kein Metadata** (DiGA-Keyword!) |
| `/anfrage-tr03161` | **none (use client)** | 🔴 erbt Root-Title | 🔴 keine | ✅ 1 | 🔴 keins | 🔴 keins | Formularseite; min. `noindex` ODER echte Metadata |

**Fehlende Compliance-Seiten (für Phase 1 vorzuschlagen):** **TLPT / Threat-Led Penetration Testing**, **TISAX**, **PCI DSS Penetrationstest**. (DiGA = `/pentest-gesundheitsanwendungen` vorhanden, aber ohne Metadata.)

### Cluster 2 — Kosten & Preise (PRIO 1) — **überwiegend gut**

| Route | Title-Quelle | Title (Länge) | Schema | Canonical | Status |
|---|---|---|---|---|---|
| `/pentest-kosten` | layout | „Pentest Kosten 2025 – Was kostet ein Penetrationstest? \| SODU Secure" (~67) | ✅ (Service/FAQ inline) | ✅ | ✅ gut · 🟠 „2025"→Jahr aktualisieren |
| `/pentest-preis` | layout | „Pentest Preis – Aktuelle Preisliste… \| SODU Secure" | ✅ | ✅ | ✅ |
| `/pentest-preis-rechner` | layout | „Pentest Preis Rechner – Kosten berechnen \| SODU Secure" (~55) | ✅ | ✅ | ✅ Konfigurator-LP |
| `/pentest-konfigurator` | layout | „Pentest Konfigurator… \| SODU Secure" | ✅ | ✅ | ✅ |
| `/pentest-angebot` | layout | „Pentest Angebot – Festpreis in 24 Stunden \| SODU Secure" | ✅ (Offer) | ✅ | ✅ |
| `/cyber-security-check-kosten` | layout | ✅ | ✅ | ✅ | 🟠 thematische Dublette zu `/pentest-kosten` |
| `/cyber-security-check-preis` | layout | ✅ | ✅ | ✅ | 🟠 Dublette zu `/pentest-preis` |

🟠 **Cannibalization:** `/pentest-kosten` vs `/pentest-preis` vs `/pentest-preis-rechner` vs `/pentest-konfigurator` vs `/pentest-angebot` vs `/cyber-security-check-kosten` vs `/cyber-security-check-preis` zielen auf eng benachbarte Intentionen. Interne Verlinkung + klare Haupt-/Nebenrolle nötig (kein Keyword-Krieg untereinander).

### Cluster 3 — Scopes / Pentest-Arten (PRIO 2) — 🔴 **größte technische Lücke**

| Route | Title-Quelle | Status |
|---|---|---|
| `/services/web-application-testing` | **none (use client + useTranslations)** | 🔴 **erbt Root-Title** „Pentest Berlin…" — keine Desc, kein Canonical, kein Schema |
| `/services/mobile-app-testing` | none | 🔴 dito |
| `/services/api-security-testing` | none | 🔴 dito |
| `/services/network-audit` | none | 🔴 dito |
| `/services/infrastructure-testing` | none | 🔴 dito |
| `/services/cloud-devops-testing` | none | 🔴 dito |
| `/services/security-audit` | none | 🔴 dito |
| `/services/vulnerability-assessment` | none | 🔴 dito |
| `/services/iso-27001` | layout | ✅ hat Service/FAQ-Schema |
| `/services/sme-packages` | layout (metadata.ts) | ✅ |

🔴 **8 Scope-Seiten teilen denselben Root-Title (massives Duplicate-Title-Problem)** und haben **keine** Description. Gleichzeitig liegen passende Texte **ungenutzt** in `serviceMetadata` (`src/lib/metadata.ts`). Zudem fehlen dedizierte Seiten für **Active Directory Pentest** und **AWS Penetrationstest** (nur als Abschnitte vorhanden).

### Cluster 7 — Lokal & Geo (PRIO 2) — überwiegend gut

| Route | Status |
|---|---|
| `/pentest-berlin` (+ `/kosten`, `/kmu`, `/intern-extern`, `/iso-27001`) | layout-Metadata vorhanden (über `pentest-berlin/layout.tsx`), 🟠 Subpages-H1/Schema in Phase 2 prüfen |
| `/berlin-kmu-pilot` | ✅ vollständige Metadata + OG + Offer-Schema |
| `/penetrationstest-anbieter` | 🔴 use client, **kein Metadata** (Ratgeber „Anbieter erkennen") |
| **fehlt** | „Penetrationstest Deutschland" (nationale LP), später München/Hamburg |

### Cluster 1 — Core / Money (LAUFEND)

| Route | Title-Quelle | Schema | Status |
|---|---|---|---|
| `/penetration-testing` | layout | ✅ (Service) | ✅ · 🟠 Title = „Penetrationstest Berlin…" (Geo-Überschneidung mit /pentest-berlin) |
| `/penetration-testing-service` | layout | ✅ | 🟠 Near-Dup zu /pentesting-service |
| `/pentesting-service` | layout | ✅ (Offer-Liste) | 🟠 Near-Dup |
| `/penetration-testing-anbieter` | layout | ✅ | 🟠 Near-Dup zu /penetrationstest-anbieter (das **ohne** Metadata) |
| `/pentest` | layout (+page) | ✅ | ✅ · 🟠 Preisangabe „ab 1.200 €" in `pentest/layout.tsx` widerspricht neuer Preislogik (Scan ab 1.500 / Pentest ab 7.000) → **Fakten-Konsistenz prüfen** |
| `/pentest-certification` | layout | ✅ | ✅ |
| `/request-pentest` (+`/en`, ads-Varianten) | layout | – | Conversion-Seite; `/en` ist die **einzige** echte EN-URL |

🟠 **Core-Cannibalization-Cluster:** `/penetration-testing`, `/penetration-testing-service`, `/pentesting-service`, `/penetration-testing-anbieter`, `/penetrationstest-anbieter`, `/pentest` überschneiden sich stark. Klare Pillar-Wahl + Canonical-/Verlinkungsstrategie nötig.

### Cluster 5/6 — Wissen & Branche (PRIO 3)
- 🔴 **Kein dedizierter Ratgeber-/Glossar-Bereich** für „Was ist ein Penetrationstest", „Ablauf", „Black/White Box", „intern vs extern", „Scan vs Pentest", „wie oft", „Beispielbericht", „Red Teaming". Teilweise als Abschnitte/Blog vorhanden (`/sample-report`, `case-studies/blogs`), aber keine eigenständigen ToFu-URLs.
- 🔴 **Keine Branchen-LPs** (KMU/SaaS/E-Commerce/Gesundheit/Finanz) außer Teilabdeckung (`/services/sme-packages`, `/berlin-kmu-pilot`, `/pentest-gesundheitsanwendungen`).

### Cluster 8 — Brand & AuditAI (LAUFEND) — gut, aber außerhalb Pentest-Scope
- Startseite `/` ✅ (Organization + FAQPage Schema). `/about`, `/contact` (use client, Metadata via layout/none — in Phase 2 prüfen).
- **AuditAI/Claude-Cluster** (`/sodu-audit-ai`, `/claude-*`, `/ai-code-review-deutschland`, …): ✅ haben jeweils Title/Desc/Canonical (page-Metadata), 🟠 **kein Schema**, 🔴 **nicht in der Sitemap**. `/sodu-audit-ai` ist **`robots: noindex`** (verifizieren, ob gewollt). Diese Seiten liegen **außerhalb** der Pentest-Keyword-Cluster dieses Auftrags.

---

## 3. Querschnitt-Lücken (priorisiert)

| # | Befund | Schwere | Betroffen |
|---|---|---|---|
| G1 | **Compliance-Seiten ohne JSON-LD** (FAQPage, Service, BreadcrumbList) | 🔴 hoch | nis2, dora, mdr, bsig, bsi-tr-03161, iso-27001 (`RegulationPage`) |
| G2 | **`/services/*` Scope-Seiten ohne Metadata** → 8× Duplicate-Title, keine Desc/Canonical/Schema | 🔴 hoch | services/web/mobile/api/network/infra/cloud/security/vuln |
| G3 | **Compliance-Unterseiten & DiGA ohne Metadata** | 🔴 hoch | iso-27001-pentest-anforderungen, iso-27001-zertifizierung, pentest-gesundheitsanwendungen, penetrationstest-anbieter, anfrage-tr03161 |
| G4 | **Sitemap unvollständig/veraltet** (neue Check-, Pricing-, Corporate-, AuditAI-Seiten fehlen; alte Variante enthalten) | 🔴 hoch | sitemap.ts |
| G5 | **Fehlende Compliance-LPs**: TLPT, TISAX, PCI DSS | 🟠 mittel | neu |
| G6 | **Keyword-Cannibalization** in Core + Kosten-Cluster | 🟠 mittel | s. §2 |
| G7 | **hreflang nicht umsetzbar** wegen Single-URL-i18n; aktuell `languages:{de}` halbgar | 🟠 mittel | global |
| G8 | **Verification-Platzhalter** (`your-google-verification-code` etc.) | 🟠 mittel | layout.tsx, metadata.ts |
| G9 | **Kein LocalBusiness-Schema** trotz Sitz Berlin | 🟠 mittel | global/Startseite |
| G10 | **Fakten-Inkonsistenz Preise**: `/pentest` layout „ab 1.200 €" vs neue Logik (Scan 1.500 / Pentest 7.000) | 🟠 mittel | pentest/layout.tsx (+ ggf. weitere „ab 2.500 €"-Angaben) |
| G11 | **Junk-Route** `/ifudhuhdksjhfoiadfh` indexierbar | 🟠 niedrig | robots/route |
| G12 | **Bild-Alt-Texte** nicht systematisch geprüft (next/image-Nutzung, generische OG-Alts) | 🟠 niedrig | global → Phase 2 pro Seite |
| G13 | **Title-Längen >60 / Desc >160** auf mehreren Compliance-Seiten | 🟠 niedrig | s. §2 |
| G14 | **Doppelte Check-Seiten** `/brauche-ich-pentest` vs `/brauche-ich-einen-pentest`; `/pentest-schnellcheck` vs `/corporate/schnellcheck` etc. | 🟠 mittel | Canonical-Strategie nötig |

---

## 4. Cluster → Seiten-Mapping (Ist)

| Cluster | Vorhandene Money-/Service-Pages | Fehlt |
|---|---|---|
| 1 Core | penetration-testing, pentesting-service, penetration-testing-service, penetration-testing-anbieter, penetrationstest-anbieter, pentest, request-pentest | „PTaaS"-Begriff schwach besetzt |
| 2 Kosten | pentest-kosten, pentest-preis, pentest-preis-rechner, pentest-konfigurator, pentest-angebot | (gut) |
| 3 Scopes | services/* (8, ohne Metadata), services/iso-27001, services/sme-packages | **AD-Pentest**, **AWS-Pentest** als eigene LP |
| 4 Compliance | iso-27001(+2 Unterseiten), nis2, dora, mdr, bsig, bsi-tr-03161, pentest-gesundheitsanwendungen | **TLPT, TISAX, PCI DSS** |
| 5 Wissen | sample-report, case-studies/blogs/* | eigenständige Ratgeber/Glossar-URLs |
| 6 Branche | services/sme-packages, berlin-kmu-pilot, pentest-gesundheitsanwendungen | SaaS, E-Commerce, Finanz |
| 7 Lokal | pentest-berlin(+4), berlin-kmu-pilot | „Penetrationstest Deutschland", München, Hamburg |
| 8 Brand | / , about, contact, sodu-audit-ai, claude-* | Trust/Erfahrungen-Seite |

---

**Nächster Schritt:** `SEO_PLAN.md` (Keyword→URL-Map + priorisierte Änderungsliste + neue Seiten). **Danach STOPP zur Freigabe** vor großflächigen Edits (Phase 2).
