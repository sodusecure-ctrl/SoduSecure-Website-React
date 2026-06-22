# SEO_PLAN.md — sodusecure.com (Phase 1)

Vorschlag zur **Freigabe**. Basis: `SEO_AUDIT.md`. Keine Edits bis zu deinem „Go".
Regeln eingehalten: 1 Fokus-Keyword/Seite, 1 H1/Seite, keine erfundenen Fakten, kein Design-Umbau.

---

## A. Keyword → URL-Mapping (Fokus-Keyword pro Seite)

### PRIO 1 — Compliance (Cluster 4)
| Fokus-Keyword | URL | Status |
|---|---|---|
| ISO 27001 Penetrationstest | `/iso-27001` | vorhanden, Schema+Title optimieren |
| ISO 27001 Pentest Anforderungen (A.8.x) | `/iso-27001-pentest-anforderungen` | **Metadata neu** |
| ISO 27001 Zertifizierung | `/iso-27001-zertifizierung` | **Metadata neu** |
| NIS2 Penetrationstest | `/nis2` | optimieren |
| DORA Penetrationstest | `/dora` | optimieren |
| TLPT / Threat-Led Penetration Testing | `/tlpt` | **neu (Vorschlag)** |
| BSI TR-03161 Prüfung | `/bsi-tr-03161` | optimieren |
| DiGA Sicherheitsprüfung | `/pentest-gesundheitsanwendungen` | **Metadata neu** |
| MDR Penetrationstest | `/mdr` | optimieren |
| TISAX Penetrationstest | `/tisax` | **neu (Vorschlag)** |
| PCI DSS Penetrationstest | `/pci-dss-penetrationstest` | **neu (Vorschlag)** |
| BSIG / KRITIS | `/bsig` | optimieren |

### PRIO 1 — Kosten (Cluster 2)
| Fokus-Keyword | URL |
|---|---|
| Was kostet ein Penetrationstest / Pentest Kosten | `/pentest-kosten` (Pillar) |
| Penetrationstest Preise / Pentest Preis | `/pentest-preis` |
| Penetrationstest Kostenrechner | `/pentest-preis-rechner` |
| Pentest konfigurieren / Festpreis | `/pentest-konfigurator`, `/pentest-angebot` |

### PRIO 2 — Scopes (Cluster 3) + Lokal (Cluster 7)
| Fokus-Keyword | URL | Status |
|---|---|---|
| Web Application Penetrationstest | `/services/web-application-testing` | **Metadata neu** |
| API Penetrationstest | `/services/api-security-testing` | **Metadata neu** |
| Mobile App Penetrationstest | `/services/mobile-app-testing` | **Metadata neu** |
| Netzwerk Penetrationstest | `/services/network-audit` | **Metadata neu** |
| Infrastruktur Penetrationstest | `/services/infrastructure-testing` | **Metadata neu** |
| Cloud Penetrationstest | `/services/cloud-devops-testing` | **Metadata neu** |
| Active Directory Pentest | `/services/active-directory` | **neu (Vorschlag)** |
| AWS Penetrationstest | `/services/aws-penetrationstest` | **neu (Vorschlag)** |
| Pentest Berlin / Penetrationstest Berlin | `/pentest-berlin` (+ Unterseiten) | optimieren |
| Penetrationstest Deutschland | `/penetrationstest-deutschland` | **neu (Vorschlag)** |

### PRIO 3 — Wissen (Cluster 5) + Branche (Cluster 6)
| Fokus-Keyword | URL (Vorschlag, ToFu) |
|---|---|
| Was ist ein Penetrationstest | `/wissen/was-ist-ein-penetrationstest` |
| Penetrationstest Ablauf | `/wissen/penetrationstest-ablauf` |
| Black Box vs White Box Pentest | `/wissen/black-box-white-box` |
| interner vs externer Penetrationstest | `/wissen/intern-extern` (Hinweis: `/pentest-berlin/intern-extern` existiert → eins als Pillar, anderes canonical) |
| Schwachstellenscan vs Penetrationstest | `/wissen/scan-vs-pentest` |
| wie oft Penetrationstest | `/wissen/wie-oft-penetrationstest` |
| Penetrationstest Beispielbericht | `/sample-report` (vorhanden, ausbauen) |
| Red Teaming | `/red-team-assessment` (Pillar wählen, Service-Dublette canonicalisieren) |
| Penetrationstest KMU | `/branchen/kmu` bzw. `/services/sme-packages` |
| Pentest SaaS / E-Commerce / Finanz | `/branchen/*` **neu** |

### LAUFEND — Core (Cluster 1) + Brand (Cluster 8)
- **Pillar-Entscheidung nötig** (siehe Decisions): genau **eine** Core-Money-Page als „Penetrationstest"-Pillar; die übrigen (penetration-testing-service, pentesting-service, *-anbieter) per interner Verlinkung + ggf. `canonical` einordnen.

---

## B. Priorisierte Änderungsliste (Phase 2, pro Seite — nicht-invasiv)

**Welle 1 (PRIO 1):**
1. **Compliance-Schema-Komponente** bauen (`RegulationPage`): generische `FAQPage`-, `Service`- und `BreadcrumbList`-JSON-LD aus den bereits vorhandenen `data`-Feldern (faqs, services, slug, title). → schaltet Schema für nis2/dora/mdr/bsig/bsi-tr-03161/iso-27001 **auf einen Schlag** frei, ohne Design-Änderung.
2. **iso-27001-pentest-anforderungen, iso-27001-zertifizierung, pentest-gesundheitsanwendungen, anfrage-tr03161, penetrationstest-anbieter:** je eine **`layout.tsx` mit `export const metadata`** (Title/Desc/Canonical/OG/Twitter) ergänzen — Pattern identisch zu bestehenden Layouts (kein Eingriff in die `use client`-Pages).
3. **Title/Desc-Feinschliff** Compliance (Längen 50–60 / 140–160), Fokus-Keyword vorn (z. B. „ISO 27001 Penetrationstest: Anforderungen & Ablauf | SODU Secure").
4. **Kosten-Cluster:** „2025"→ Jahr neutralisieren; interne Verlinkung Pillar↔Rechner↔Konfigurator schärfen.

**Welle 2 (PRIO 2):**
5. **`/services/*` (8 Seiten):** je `layout.tsx` mit Metadata aus dem **bereits vorhandenen** `serviceMetadata` (`src/lib/metadata.ts`) — deutsche Fokus-Keywords als Title (statt englischer Default), Desc, Canonical, `Service`-Schema. Behebt G2 (Duplicate-Title) zentral.
6. **Berlin-Unterseiten:** H1/Schema/`BreadcrumbList` prüfen & ergänzen.

**Welle 3 (PRIO 3 / laufend):**
7. Wissen/Branche-Seiten (nur nach Freigabe, s. C).
8. Core-Pillar-Konsolidierung + interne Silo-Verlinkung (Ratgeber → Money-Page je Cluster).

---

## C. Neue Seiten (erst nach Freigabe, im bestehenden Layout-/Komponentenstil)

Reuse vorhandener Templates → **kein** neues Design:
- **`RegulationPage`-Template** (wie nis2/dora): `/tlpt`, `/tisax`, `/pci-dss-penetrationstest`. Inhalt nur aus belegbaren Normtexten (DORA Art. 26 TLPT/TIBER-EU; TISAX/VDA-ISA; PCI DSS v4.0 Req. 11.4) — **keine erfundenen Zahlen/Kunden**.
- **Service/Scope-Template:** `/services/active-directory`, `/services/aws-penetrationstest`.
- **Lokal:** `/penetrationstest-deutschland`.
- **Wissen-Hub** `/wissen/*` + **Branchen-Hub** `/branchen/*` (ToFu, interne Verlinkung auf Money-Pages).

> Umfang offen — bitte in den Decisions auswählen, welche dieser Seiten ich anlegen soll.

---

## D. Technisches SEO & Structured Data (Phase 3)

| Maßnahme | Vorgehen |
|---|---|
| **JSON-LD zentralisieren** | Wiederverwendbare Server-Komponenten (`<OrganizationLd/>`, `<LocalBusinessLd/>` Berlin-Adresse, `<ServiceLd/>`, `<FaqLd/>`, `<BreadcrumbLd/>`) auf Basis des vorhandenen `jsonld.tsx`. Pro Seitentyp einbinden. |
| **Canonical** | Default-Canonical-Helper; jede Money-Page mit `alternates.canonical`. Dubletten (s. G6/G14) gezielt auf Pillar canonicalisieren. |
| **hreflang** | **Entscheid nötig (Decisions):** aktuell keine echten EN-URLs → ehrlich `x-default`+`de` only, **kein** Fake-`en`. |
| **Sitemap** | `sitemap.ts` auf vollständige, gepflegte Route-Liste bringen (neue Check-/Pricing-/Compliance-Seiten rein, `/brauche-ich-einen-pentest`-Altvariante & `noindex`-Seiten raus). Optional teil-automatisieren. |
| **robots** | `/ifudhuhdksjhfoiadfh` + Test-/Dublettenrouten ausschließen; `host` entfernen. |
| **OG/Twitter** | Pro neuer/optimierter Seite setzen (Fallback bleibt Root). |
| **Core Web Vitals** | `next/image` für `<img>`-Funde, Font bereits via `next/font` (ok), Lazy-Loading prüfen, CLS auf Hero/Calendly-iframes prüfen. **Pro Seite in Phase 2**, ohne Layout-Bruch. |
| **Verification** | Platzhalter-Codes entfernen oder echte einsetzen (brauche echte Codes von dir). |
| **AggregateRating/Review (4,8/5)** | **Nur mit echter Datenquelle.** In der Codebase **nicht** gefunden → ohne Beleg **kein** Rating-Schema (rechtlich/Trust-Risiko). Bitte Quelle liefern, sonst weglassen. |

---

## E. 🚦 Entscheidungen, die ich von dir brauche (Freigabe-Gate)

1. **Neue Seiten:** Welche der vorgeschlagenen neuen URLs soll ich anlegen? (TLPT, TISAX, PCI DSS, AD-Pentest, AWS-Pentest, Penetrationstest-Deutschland, Wissen-Hub, Branchen-Hub — oder Teilmenge / keine.)
2. **hreflang/i18n:** Bei der jetzigen Single-URL-Architektur → bestätige „nur DE/x-default, kein Fake-EN" — oder ist ein späterer echter `/en/*`-Umbau gewünscht (separater Auftrag)?
3. **Cannibalization:** Darf ich Near-Dubletten (z. B. `/penetration-testing-service`, `/pentesting-service`, `/penetrationstest-anbieter`, `/brauche-ich-einen-pentest`) per `canonical` auf die jeweilige Pillar bündeln? (Kein Löschen, kein Redirect ohne deine Freigabe.)
4. **Fakten-Konsistenz:** `/pentest` (layout) nennt „ab 1.200 €", andere Seiten „ab 2.500 €" — nach deiner neuen Logik gilt Scan ab 1.500 € / manueller Pentest ab 7.000 €. Soll ich Preisangaben in Titles/Descriptions auf **eine** konsistente Aussage vereinheitlichen? Welche?
5. **Verification-Codes** (Google/Bing) und ggf. **echte Bewertungsdaten** (für Rating-Schema): bitte liefern, sonst lasse ich beides leer/weg.
6. **`/sodu-audit-ai` = `noindex`:** beabsichtigt? (sonst korrigieren.)

**STOPP — ich warte auf deine Freigabe (mind. Punkte 1–4), bevor ich mit Phase 2 (On-Page-Edits) beginne.**
