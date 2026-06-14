'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import {
  ArrowRight,
  Check,
  FileText,
  GitBranch,
  Layers,
  Lock,
  Shield,
  Sparkles,
  Workflow,
  Zap,
  Target,
  Users,
  Award,
  Star,
} from 'lucide-react';
import { CTA, FeatureCard, SectionLabel, SectionLabelDark, StatRow } from './ui';
import { useBrand } from './BrandContext';
import TestimonialsMarquee from './TestimonialsMarquee';

type BrandCopy = {
  heroH1Top: string;
  heroH1Bottom: string;
  heroSub: string;
  heroPrimaryCta: string;
  heroPrimaryHref: string;
  heroSecondaryCta: string;
  heroSecondaryHref: string;
  heroFootnote: string;
  heroPills: string[];
  trustEyebrow: string;
  featureLabel: string;
  featureHeadline: string;
  featureSub: string;
  features: { title: string; text: string; icon: React.ReactNode }[];
  methodLabel: string;
  methodHeadline: string;
  methodFullLink: string;
  methodLinkHref: string;
  steps: { n: string; t: string; d: string; icon: React.ReactNode }[];
  stats: { value: string; label: string }[];
  sampleLabel: string;
  sampleHeadline: string;
  sampleSub: string;
  samplePrimary: string;
  samplePrimaryHref: string;
  sampleSecondary: string;
  sampleSecondaryHref: string;
  findingId: string;
  findingSeverity: string;
  findingTitle: string;
  findingMeta: string;
  findingFix: string;
  sampleStats: { value: string; label: string; tone: 'red' | 'amber' | 'green' }[];
  pricingHeadline: React.ReactNode;
  pricingSub: string;
  pricingPrimary: string;
  pricingPrimaryHref: string;
  pricingSecondary: string;
  pricingPlans: [string, string, string][];
  pricingPerMonth: string;
  securityBlurb: string;
  securityFeatures: { title: string; text: string; icon: React.ReactNode }[];
  ctaH2: React.ReactNode;
  ctaSub: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSwitch: string;
};

type SharedCopy = {
  productEyebrow: string;
  toggle: { pentest: string; auditai: string };
  twoProductsLabel: string;
  twoProductsHeadlineA: string;
  twoProductsHeadlineB: string;
  twoProductsSub: string;
  productLabel: string;
  current: string;
  pentestProductTag: string;
  auditaiProductTag: string;
  pentestCardTitle: string;
  pentestCardSub: string;
  pentestCardBullets: string[];
  pentestCardPriceLabel: string;
  pentestCardPrice: string;
  pentestCardCtaPrimary: string;
  pentestCardCtaSecondary: string;
  auditaiCardTitle: string;
  auditaiCardSub: string;
  auditaiCardBullets: string[];
  auditaiCardPriceLabel: string;
  auditaiCardPrice: string;
  auditaiCardPriceUnit: string;
  auditaiCardCtaPrimary: string;
  auditaiCardCtaSecondary: string;
  combineTitle: string;
  combineSub: string;
  combineCta: string;
  securityLabel: string;
  securityHeadline: string;
  securityLink: string;
  pricingLabel: string;
  fullLink: string;
};

const sharedDe: SharedCopy = {
  productEyebrow: 'Sodu',
  toggle: { pentest: '/Pentest', auditai: '/AuditAI' },
  twoProductsLabel: 'Made in Germany · In Berlin gehärtet',
  twoProductsHeadlineA: 'Made in Germany. ',
  twoProductsHeadlineB: 'In Berlin gehärtet.',
  twoProductsSub: 'Zwei Produkte, ein Versprechen: Sicherheit, die wirklich angreift, geschrieben von Hackern aus Deutschland. Wählen Sie eines - oder beides für maximale Abdeckung.',
  productLabel: 'Produkt',
  current: 'Aktuell',
  pentestProductTag: 'Sodu /Pentest',
  auditaiProductTag: 'Sodu /AuditAI',
  pentestCardTitle: 'Wie ein echter Hacker. Nur auf Ihrer Seite.',
  pentestCardSub: 'Hand-getestet von OSCP-zertifizierten Hackern aus Berlin. Kein Scanner-Output, sondern echte Angriffe mit echten Proof-of-Concepts.',
  pentestCardBullets: ['Web · API · Mobile · Infra · AD', 'OWASP / OSSTMM / NIST', 'Executive- + technischer Bericht', 'Kostenloser Retest nach Fix'],
  pentestCardPriceLabel: 'Festpreis ab',
  pentestCardPrice: '2.500 €',
  pentestCardCtaPrimary: 'Pentest anfragen',
  pentestCardCtaSecondary: 'Mehr erfahren',
  auditaiCardTitle: 'Ihr IT-Security-Team. Ab 99 €.',
  auditaiCardSub: 'Wie ein vollwertiger Security-Spezialist und Code-Reviewer, der jede Woche Ihren Code prüft. State-of-the-Art KI, trainiert von echten Hackern. Enterprise-Niveau zum Bruchteil eines Gehalts.',
  auditaiCardBullets: ['GitHub-App-Anbindung', 'Trend-Tracking Woche für Woche', 'DE & EN Lieferung', 'Kein neues Dashboard'],
  auditaiCardPriceLabel: 'Ab',
  auditaiCardPrice: '99 €',
  auditaiCardPriceUnit: '/ Repo / Monat',
  auditaiCardCtaPrimary: 'Demo anfragen',
  auditaiCardCtaSecondary: 'Beispielbericht',
  combineTitle: 'Beides kombinieren',
  combineSub: 'Pentest zertifiziert den Moment. AuditAI schützt zwischen Releases.',
  combineCta: 'Bundle anfragen',
  securityLabel: 'Vertrauen',
  securityHeadline: 'Ihr Code. Ihre Kontrolle.',
  securityLink: 'Security-Details',
  pricingLabel: 'Preis',
  fullLink: 'Vollständig ansehen →',
};

const sharedEn: SharedCopy = {
  productEyebrow: 'Sodu',
  toggle: { pentest: '/Pentest', auditai: '/AuditAI' },
  twoProductsLabel: 'Made in Germany · Hardened in Berlin',
  twoProductsHeadlineA: 'Made in Germany. ',
  twoProductsHeadlineB: 'Hardened in Berlin.',
  twoProductsSub: 'Two products, one promise: security that actually attacks, written by hackers from Germany. Pick one - or combine both for maximum coverage.',
  productLabel: 'Product',
  current: 'Current',
  pentestProductTag: 'Sodu /Pentest',
  auditaiProductTag: 'Sodu /AuditAI',
  pentestCardTitle: 'Like a real hacker. Just on your side.',
  pentestCardSub: 'Hand-tested by OSCP-certified hackers from Berlin. Not scanner output - real attacks with real proof-of-concepts.',
  pentestCardBullets: ['Web · API · Mobile · Infra · AD', 'OWASP / OSSTMM / NIST', 'Executive + technical report', 'Free retest after fix'],
  pentestCardPriceLabel: 'Fixed price from',
  pentestCardPrice: '€2,500',
  pentestCardCtaPrimary: 'Request pentest',
  pentestCardCtaSecondary: 'Learn more',
  auditaiCardTitle: 'Your security team. From €99.',
  auditaiCardSub: 'Like a full-time security specialist and code reviewer auditing your code every week. State-of-the-art AI, trained by real hackers. Enterprise-grade results for a fraction of one salary.',
  auditaiCardBullets: ['GitHub App connect', 'Week-over-week trend tracking', 'EN + DE deliverable', 'No new dashboard'],
  auditaiCardPriceLabel: 'From',
  auditaiCardPrice: '€99',
  auditaiCardPriceUnit: '/ repo / month',
  auditaiCardCtaPrimary: 'Request demo',
  auditaiCardCtaSecondary: 'Sample report',
  combineTitle: 'Combine both',
  combineSub: 'Pentest certifies the moment. AuditAI protects between releases.',
  combineCta: 'Request bundle',
  securityLabel: 'Trust',
  securityHeadline: 'Your code. Your control.',
  securityLink: 'Security details',
  pricingLabel: 'Pricing',
  fullLink: 'See full page →',
};

function getPentestCopy(de: boolean): BrandCopy {
  return de
    ? {
        heroH1Top: 'Ein Pentest, der angreift',
        heroH1Bottom: 'wie ein echter Hacker.',
        heroSub: 'Hand-getestet von OSCP-zertifizierten Hackern aus Berlin. Echte Angriffsketten, reproduzierbare Proof-of-Concepts, klare Fix-Empfehlungen - Festpreis ab 2.500 €.',
        heroPrimaryCta: 'Pentest anfragen',
        heroPrimaryHref: '/request-pentest',
        heroSecondaryCta: 'Preis berechnen',
        heroSecondaryHref: '/pentest-konfigurator',
        heroFootnote: 'Verbindliches Angebot in 24h. Made in Germany.',
        heroPills: ['Made in Germany', 'OSCP+ / OSWE', 'OWASP / OSSTMM', 'Kostenloser Retest'],
        trustEyebrow: 'Made in Germany · OSCP-zertifiziert · Hand-getestet',
        featureLabel: 'Was wir testen',
        featureHeadline: 'Härter testen. Klarer berichten.',
        featureSub: 'Wir denken wie Angreifer und dokumentieren wie Auditoren. Web, API, Mobile, Infrastruktur, Active Directory - voller Stack, volle Tiefe.',
        features: [
          { icon: <Target className="h-5 w-5" />, title: 'Web & API', text: 'OWASP Top 10, Business-Logic, Auth-Flows, Token-Handling.' },
          { icon: <Layers className="h-5 w-5" />, title: 'Infrastruktur & AD', text: 'Netzwerk, Active Directory, Privilege Escalation, Lateral Movement.' },
          { icon: <Shield className="h-5 w-5" />, title: 'Mobile & Cloud', text: 'iOS/Android, Reverse Engineering, AWS/Azure-Konfigurationen.' },
          { icon: <FileText className="h-5 w-5" />, title: 'Klarer Bericht', text: 'Executive Summary + technischer Anhang. Auf Deutsch und Englisch.' },
          { icon: <Award className="h-5 w-5" />, title: 'Kostenloser Retest', text: 'Nach dem Fix prüfen wir kostenlos nach. Damit es wirklich behoben ist.' },
          { icon: <Users className="h-5 w-5" />, title: 'Compliance-ready', text: 'Passend zu ISO 27001, BSI TR-03161, DiGA, NIS2, DORA, MDR & BSIG.' },
        ],
        methodLabel: 'Methodik',
        methodHeadline: 'Vier Phasen. Ein klarer Plan.',
        methodFullLink: 'Vollständig ansehen →',
        methodLinkHref: '/pentest',
        steps: [
          { n: '01', t: 'Scoping', d: 'Ziele, Systeme und Risikoschwerpunkte gemeinsam definieren.', icon: <Target className="h-5 w-5" /> },
          { n: '02', t: 'Recon', d: 'Aufklärung, Mapping und Identifikation der Angriffsflächen.', icon: <Layers className="h-5 w-5" /> },
          { n: '03', t: 'Exploit', d: 'Manuelle Tests, Verkettung von Schwachstellen, Proof-of-Concept.', icon: <Workflow className="h-5 w-5" /> },
          { n: '04', t: 'Bericht & Retest', d: 'Klarer Bericht, Fix-Begleitung und kostenloser Nachtest.', icon: <FileText className="h-5 w-5" /> },
        ],
        stats: [
          { value: '2.500 €', label: 'Festpreis ab' },
          { value: '24h', label: 'Angebot' },
          { value: 'OSCP+', label: 'Zertifiziert' },
          { value: 'Gratis', label: 'Retest' },
        ],
        sampleLabel: 'Bericht',
        sampleHeadline: 'Klarer Bericht. Fix-Begleitung.',
        sampleSub: 'Executive Summary für die Geschäftsleitung. Technischer Anhang mit reproduzierbaren PoCs für Ihr Dev-Team.',
        samplePrimary: 'Beispielbericht ansehen',
        samplePrimaryHref: '/pentest',
        sampleSecondary: 'Termin vereinbaren',
        sampleSecondaryHref: '/contact',
        findingId: 'Finding #P-2026-022',
        findingSeverity: 'Critical',
        findingTitle: 'IDOR im Customer-API-Endpoint',
        findingMeta: 'CWE-639 · Auth-Bypass möglich · /api/customers/:id',
        findingFix: `// Empfohlener Fix
if (req.user.id !== params.id && !req.user.isAdmin) {
  return res.status(403).json({ error: 'forbidden' });
}`,
        sampleStats: [
          { value: '3', label: 'Critical', tone: 'red' },
          { value: '8', label: 'High', tone: 'amber' },
          { value: '12', label: 'Info', tone: 'green' },
        ],
        pricingHeadline: (
          <>
            Festpreis ab <span className="text-[#FF3B30]">2.500 €</span>. Transparent. Sofort online.
          </>
        ),
        pricingSub: 'Berechnen Sie Ihren individuellen Pentest-Preis online - in unter 2 Minuten.',
        pricingPrimary: 'Preis berechnen',
        pricingPrimaryHref: '/pentest-konfigurator',
        pricingSecondary: 'Mit Sales sprechen',
        pricingPlans: [
          ['Web-App', 'ab 2.500 €', 'Einzelne Web-/API-Anwendung'],
          ['Internes Pentest', 'ab 4.900 €', 'Netzwerk + Active Directory'],
          ['Enterprise', 'individuell', 'Multi-Scope, Red Team'],
        ],
        pricingPerMonth: '',
        securityBlurb: 'NDA standardmäßig, sicheres Reporting, klare Datenverarbeitung - DSGVO-konform.',
        securityFeatures: [
          { icon: <Lock className="h-5 w-5" />, title: 'Read-only', text: 'Wir können nie in Ihr Repository schreiben - niemals.' },
          { icon: <Shield className="h-5 w-5" />, title: 'Isolierte Runs', text: 'Jede Analyse läuft in einer ephemeren, single-tenant Umgebung.' },
          { icon: <GitBranch className="h-5 w-5" />, title: 'Keine Keys gespeichert', text: 'OAuth via Ihrem Versionssystem - keine langlebigen Secrets bei uns.' },
          { icon: <FileText className="h-5 w-5" />, title: 'AVV auf Anfrage', text: 'DSGVO-konform. Standard-AVV verfügbar bevor Sie starten.' },
        ],
        ctaH2: (
          <>
            <span className="premium-silver">Bereit für einen Pentest, </span>
            <span className="premium-headline-accent">der wirklich angreift</span>
            <span className="premium-silver">?</span>
          </>
        ),
        ctaSub: 'Made in Germany. Hand-getestet. Verbindliches Angebot in 24 Stunden.',
        ctaPrimary: 'Pentest anfragen',
        ctaPrimaryHref: '/request-pentest',
        ctaSwitch: 'Oder zu /AuditAI wechseln',
      }
    : {
        heroH1Top: 'A pentest that attacks',
        heroH1Bottom: 'like a real hacker.',
        heroSub: 'Hand-tested by OSCP-certified hackers from Berlin. Real attack chains, reproducible proof-of-concepts, clear fix recommendations - fixed price from €2,500.',
        heroPrimaryCta: 'Request pentest',
        heroPrimaryHref: '/request-pentest',
        heroSecondaryCta: 'Calculate price',
        heroSecondaryHref: '/pentest-konfigurator',
        heroFootnote: 'Binding quote in 24h. Made in Germany.',
        heroPills: ['Made in Germany', 'OSCP+ / OSWE', 'OWASP / OSSTMM', 'Free retest'],
        trustEyebrow: 'Made in Germany · OSCP-certified · Hand-tested',
        featureLabel: 'What we test',
        featureHeadline: 'Test harder. Report clearer.',
        featureSub: 'We think like attackers and document like auditors. Web, API, mobile, infrastructure, Active Directory - full stack, full depth.',
        features: [
          { icon: <Target className="h-5 w-5" />, title: 'Web & API', text: 'OWASP Top 10, business logic, auth flows, token handling.' },
          { icon: <Layers className="h-5 w-5" />, title: 'Infrastructure & AD', text: 'Network, Active Directory, privilege escalation, lateral movement.' },
          { icon: <Shield className="h-5 w-5" />, title: 'Mobile & Cloud', text: 'iOS/Android, reverse engineering, AWS/Azure configurations.' },
          { icon: <FileText className="h-5 w-5" />, title: 'Clear report', text: 'Executive summary + technical appendix. EN and DE.' },
          { icon: <Award className="h-5 w-5" />, title: 'Free retest', text: "After the fix we re-check at no cost. So it's actually fixed." },
          { icon: <Users className="h-5 w-5" />, title: 'Compliance-ready', text: 'Aligned with ISO 27001, BSI TR-03161, DiGA, NIS2, DORA, MDR & BSIG.' },
        ],
        methodLabel: 'Methodology',
        methodHeadline: 'Four phases. One clear plan.',
        methodFullLink: 'See full page →',
        methodLinkHref: '/pentest',
        steps: [
          { n: '01', t: 'Scoping', d: 'Targets, systems and risk priorities defined together.', icon: <Target className="h-5 w-5" /> },
          { n: '02', t: 'Recon', d: 'Reconnaissance, mapping and attack-surface identification.', icon: <Layers className="h-5 w-5" /> },
          { n: '03', t: 'Exploit', d: 'Manual tests, vulnerability chaining, proof-of-concept.', icon: <Workflow className="h-5 w-5" /> },
          { n: '04', t: 'Report & retest', d: 'Clear report, fix support and free retest.', icon: <FileText className="h-5 w-5" /> },
        ],
        stats: [
          { value: '€2,500', label: 'Fixed price from' },
          { value: '24h', label: 'Quote' },
          { value: 'OSCP+', label: 'Certified' },
          { value: 'Free', label: 'Retest' },
        ],
        sampleLabel: 'Report',
        sampleHeadline: 'Clear report. Fix support.',
        sampleSub: 'Executive summary for leadership. Technical appendix with reproducible PoCs for your dev team.',
        samplePrimary: 'See sample report',
        samplePrimaryHref: '/pentest',
        sampleSecondary: 'Book a call',
        sampleSecondaryHref: '/contact',
        findingId: 'Finding #P-2026-022',
        findingSeverity: 'Critical',
        findingTitle: 'IDOR in customer API endpoint',
        findingMeta: 'CWE-639 · Auth bypass possible · /api/customers/:id',
        findingFix: `// Suggested fix
if (req.user.id !== params.id && !req.user.isAdmin) {
  return res.status(403).json({ error: 'forbidden' });
}`,
        sampleStats: [
          { value: '3', label: 'Critical', tone: 'red' },
          { value: '8', label: 'High', tone: 'amber' },
          { value: '12', label: 'Info', tone: 'green' },
        ],
        pricingHeadline: (
          <>
            Fixed price from <span className="text-[#FF3B30]">€2,500</span>. Transparent. Online instantly.
          </>
        ),
        pricingSub: 'Calculate your individual pentest price online - in under 2 minutes.',
        pricingPrimary: 'Calculate price',
        pricingPrimaryHref: '/pentest-konfigurator',
        pricingSecondary: 'Talk to sales',
        pricingPlans: [
          ['Web app', 'from €2,500', 'Single web/API app'],
          ['Internal pentest', 'from €4,900', 'Network + Active Directory'],
          ['Enterprise', 'custom', 'Multi-scope, red team'],
        ],
        pricingPerMonth: '',
        securityBlurb: 'NDA by default, secure reporting, clear data processing - GDPR-aware.',
        securityFeatures: [
          { icon: <Lock className="h-5 w-5" />, title: 'Read-only', text: 'We can never write to your repository - ever.' },
          { icon: <Shield className="h-5 w-5" />, title: 'Isolated runs', text: 'Every analysis runs in an ephemeral, single-tenant environment.' },
          { icon: <GitBranch className="h-5 w-5" />, title: 'No keys stored', text: 'OAuth via your VCS - no long-lived secrets on our side.' },
          { icon: <FileText className="h-5 w-5" />, title: 'DPA on request', text: 'GDPR-aware. Standard DPA available before you start.' },
        ],
        ctaH2: (
          <>
            <span className="premium-silver">Ready for a pentest </span>
            <span className="premium-headline-accent">that really attacks</span>
            <span className="premium-silver">?</span>
          </>
        ),
        ctaSub: 'Made in Germany. Hand-tested. Binding quote in 24 hours.',
        ctaPrimary: 'Request pentest',
        ctaPrimaryHref: '/request-pentest',
        ctaSwitch: 'Or switch to /AuditAI',
      };
}

function getAuditAiCopy(de: boolean): BrandCopy {
  return de
    ? {
        heroH1Top: 'Ihr Security-Spezialist.',
        heroH1Bottom: 'Für 99 € im Monat.',
        heroSub: 'Sodu /AuditAI ist wie ein vollwertiger IT-Security- und Code-Review-Spezialist, der jede Woche Ihren Code prüft - State-of-the-Art KI, trainiert von echten Hackern. Sie bekommen Enterprise-Sicherheitsstandards zum Bruchteil eines Gehalts. Anfrage schicken, wir machen den Rest. Ihre Software-Entwicklung wird Woche für Woche sicherer.',
        heroPrimaryCta: 'Ersten Bericht erhalten',
        heroPrimaryHref: '/sodu-audit-ai',
        heroSecondaryCta: 'So funktioniert es',
        heroSecondaryHref: '/how-it-works',
        heroFootnote: 'Jede Woche einen Schritt sicherer. Ab 99 € / Repo. Made in Germany.',
        heroPills: ['Wie ein Security-Team', 'Von Hackern trainiert', 'Wöchentlicher Bericht', 'Made in Germany'],
        trustEyebrow: 'Vollwertiges Security-Team · Von Hackern trainiert · Made in Germany',
        featureLabel: 'Was Sie bekommen',
        featureHeadline: 'Sicherheit der Großen. Preis der Kleinen.',
        featureSub: 'Anfrage schicken, wir machen den Rest. Jeden Montag bekommen Sie einen sauberen Bericht: was unsicher ist, warum, wie es zu fixen ist. Ein Repo, ein Preis, kein neues Dashboard - nur Ergebnisse.',
        features: [
          { icon: <Sparkles className="h-5 w-5" />, title: 'Tiefe statt Regex', text: 'Echtes Datenfluss-Verständnis statt statischer Pattern-Suche.' },
          { icon: <Zap className="h-5 w-5" />, title: 'Signal statt Volumen', text: 'Adversariale Verifikation und Trend-Tracking schneiden False Positives drastisch.' },
          { icon: <FileText className="h-5 w-5" />, title: 'Antwort statt Dashboard', text: 'Ein wöchentliches PDF, das Devs und Geschäftsleitung beide lesen können.' },
          { icon: <Layers className="h-5 w-5" />, title: 'Trend über Zeit', text: 'Regressionen und Verbesserungen Woche für Woche sichtbar.' },
          { icon: <Workflow className="h-5 w-5" />, title: 'Fixes statt Tickets', text: 'Jeder Befund kommt mit fertigem Code-Fix zum Einfügen.' },
          { icon: <Lock className="h-5 w-5" />, title: 'Read-only Zugriff', text: 'Wir können nie in Ihr Repo schreiben. OAuth, kurzlebige Tokens.' },
        ],
        methodLabel: 'Workflow',
        methodHeadline: 'Vier Schritte. Jeden Montag. Null Lärm.',
        methodFullLink: 'Vollständig ansehen →',
        methodLinkHref: '/how-it-works',
        steps: [
          { n: '01', t: 'Anbinden', d: 'Repo via GitHub-App oder Token. Read-only.', icon: <GitBranch className="h-5 w-5" /> },
          { n: '02', t: 'Prüfen', d: 'Multi-Pass-Review: Datenfluss, Auth, Secrets, Logik.', icon: <Workflow className="h-5 w-5" /> },
          { n: '03', t: 'Vergleichen', d: 'Diff-bewusst gegen letzte Woche. Regressionen markiert.', icon: <Layers className="h-5 w-5" /> },
          { n: '04', t: 'Berichten', d: 'DE & EN PDF mit Executive Summary und fertigen Fixes.', icon: <FileText className="h-5 w-5" /> },
        ],
        stats: [
          { value: '99 €', label: 'ab / Monat' },
          { value: '7 Tage', label: 'Takt' },
          { value: 'DE + EN', label: 'Bericht' },
          { value: 'Read-only', label: 'Zugriff' },
        ],
        sampleLabel: 'Beispielbericht',
        sampleHeadline: 'Was Sie Montag früh bekommen.',
        sampleSub: 'Management-Summary oben. Technischer Anhang unten. Jeder Befund mit fertigem Fix-Vorschlag - nicht nur einer CWE-Nummer.',
        samplePrimary: 'Vollständiges Beispiel',
        samplePrimaryHref: '/sample-report',
        sampleSecondary: 'Demo anfragen',
        sampleSecondaryHref: '/contact',
        findingId: 'Finding #A-2026-014',
        findingSeverity: 'High',
        findingTitle: 'Broken Access Control im Admin-Endpoint',
        findingMeta: 'CWE-284 · Neu diese Woche · /api/admin/*',
        findingFix: `// Empfohlener Fix
if (!user || !user.roles.includes('admin')) {
  return NextResponse.json(
    { error: 'forbidden' },
    { status: 403 },
  );
}`,
        sampleStats: [
          { value: '4', label: 'Neu', tone: 'red' },
          { value: '7', label: 'Behoben', tone: 'amber' },
          { value: '2', label: 'Offen', tone: 'green' },
        ],
        pricingHeadline: (
          <>
            Ab <span className="text-[#FF3B30]">99 €</span> pro Repo. Monatlich. Jederzeit kündbar.
          </>
        ),
        pricingSub: 'Drei Pläne. Keine Überraschungen. Jederzeit kündbar.',
        pricingPrimary: 'Preise ansehen',
        pricingPrimaryHref: '/pricing',
        pricingSecondary: 'Mit Sales sprechen',
        pricingPlans: [
          ['Startup-Paket', '99 €', 'Solo-Gründer & kleine Startups'],
          ['Studio', '199 €', 'Agenturen & mehrere Repos'],
          ['Pro+', '449 €', 'Scale-ups & kritische Produkte'],
        ],
        pricingPerMonth: ' /Monat',
        securityBlurb: 'Read-only Clone, kurzlebige Tokens, isolierte Worker, hart gelöscht nach Analyse.',
        securityFeatures: [
          { icon: <Lock className="h-5 w-5" />, title: 'Read-only', text: 'Wir können nie in Ihr Repository schreiben - niemals.' },
          { icon: <Shield className="h-5 w-5" />, title: 'Isolierte Runs', text: 'Jede Analyse läuft in einer ephemeren, single-tenant Umgebung.' },
          { icon: <GitBranch className="h-5 w-5" />, title: 'Keine Keys gespeichert', text: 'OAuth via Ihrem Versionssystem - keine langlebigen Secrets bei uns.' },
          { icon: <FileText className="h-5 w-5" />, title: 'AVV auf Anfrage', text: 'DSGVO-konform. Standard-AVV verfügbar bevor Sie starten.' },
        ],
        ctaH2: (
          <>
            <span className="premium-silver">Jede Woche </span>
            <span className="premium-headline-accent">ein Schritt sicherer</span>
            <span className="premium-silver">.</span>
          </>
        ),
        ctaSub: 'Anfrage schicken, wir machen den Rest. 5-Minuten-Setup, wöchentlicher Bericht, null Schmerz.',
        ctaPrimary: 'Jetzt buchen',
        ctaPrimaryHref: '/sodu-audit-ai',
        ctaSwitch: 'Oder zu /Pentest wechseln',
      }
    : {
        heroH1Top: 'Your security specialist.',
        heroH1Bottom: 'For €99 a month.',
        heroSub: 'Sodu /AuditAI is like a full-time IT security and code review specialist auditing your code every week - state-of-the-art AI, trained by real hackers. You get enterprise-grade security standards for a fraction of one salary. Send a request, we handle the rest. Your software development gets safer week by week.',
        heroPrimaryCta: 'Get my first report',
        heroPrimaryHref: '/sodu-audit-ai',
        heroSecondaryCta: 'How it works',
        heroSecondaryHref: '/how-it-works',
        heroFootnote: 'One step safer every week. From €99 / repo. Made in Germany.',
        heroPills: ['Like a security team', 'Trained by hackers', 'Weekly report', 'Made in Germany'],
        trustEyebrow: 'Full security team · Trained by hackers · Made in Germany',
        featureLabel: 'What you get',
        featureHeadline: 'Enterprise security. Startup pricing.',
        featureSub: 'Send a request, we handle the rest. Every Monday you get a clean report: what is unsafe, why, and how to fix it. One repo, one price, no new dashboard - just results.',
        features: [
          { icon: <Sparkles className="h-5 w-5" />, title: 'Depth, not regex', text: 'Real data-flow reasoning, not static pattern matching.' },
          { icon: <Zap className="h-5 w-5" />, title: 'Signal, not volume', text: 'Adversarial verification and trend tracking cut false positives drastically.' },
          { icon: <FileText className="h-5 w-5" />, title: 'Answer, not dashboard', text: 'A weekly PDF that devs and execs can both read.' },
          { icon: <Layers className="h-5 w-5" />, title: 'Trend over time', text: 'Week-over-week regressions and improvements at a glance.' },
          { icon: <Workflow className="h-5 w-5" />, title: 'Fixes, not tickets', text: 'Each finding ships with a paste-ready code fix.' },
          { icon: <Lock className="h-5 w-5" />, title: 'Read-only access', text: 'We can never write to your repo. OAuth, short-lived tokens.' },
        ],
        methodLabel: 'Workflow',
        methodHeadline: 'Four steps. Every Monday. Zero noise.',
        methodFullLink: 'See full page →',
        methodLinkHref: '/how-it-works',
        steps: [
          { n: '01', t: 'Connect', d: 'Repo via GitHub App or token. Read-only.', icon: <GitBranch className="h-5 w-5" /> },
          { n: '02', t: 'Review', d: 'Multi-pass review: data flow, auth, secrets, logic.', icon: <Workflow className="h-5 w-5" /> },
          { n: '03', t: 'Compare', d: 'Diff-aware against last week. Regressions flagged.', icon: <Layers className="h-5 w-5" /> },
          { n: '04', t: 'Report', d: 'EN + DE PDF with exec summary and paste-ready fixes.', icon: <FileText className="h-5 w-5" /> },
        ],
        stats: [
          { value: '€99', label: 'from / month' },
          { value: '7 days', label: 'Cadence' },
          { value: 'EN + DE', label: 'Output' },
          { value: 'Read-only', label: 'Access' },
        ],
        sampleLabel: 'Sample report',
        sampleHeadline: 'What you get Monday morning.',
        sampleSub: 'Management summary on top. Technical appendix below. Each finding with a paste-ready fix - not just a CWE number.',
        samplePrimary: 'Full sample',
        samplePrimaryHref: '/sample-report',
        sampleSecondary: 'Request demo',
        sampleSecondaryHref: '/contact',
        findingId: 'Finding #A-2026-014',
        findingSeverity: 'High',
        findingTitle: 'Broken access control in admin endpoint',
        findingMeta: 'CWE-284 · New this week · /api/admin/*',
        findingFix: `// Suggested fix
if (!user || !user.roles.includes('admin')) {
  return NextResponse.json(
    { error: 'forbidden' },
    { status: 403 },
  );
}`,
        sampleStats: [
          { value: '4', label: 'New', tone: 'red' },
          { value: '7', label: 'Fixed', tone: 'amber' },
          { value: '2', label: 'Overdue', tone: 'green' },
        ],
        pricingHeadline: (
          <>
            From <span className="text-[#FF3B30]">€99</span> per repo. Monthly. Cancel anytime.
          </>
        ),
        pricingSub: 'Three plans. No surprises. Cancel anytime.',
        pricingPrimary: 'See pricing',
        pricingPrimaryHref: '/pricing',
        pricingSecondary: 'Talk to sales',
        pricingPlans: [
          ['Startup pack', '€99', 'Solo founders & early startups'],
          ['Studio', '€199', 'Agencies & multi-repo'],
          ['Pro+', '€449', 'Scale-ups & critical products'],
        ],
        pricingPerMonth: ' /mo',
        securityBlurb: 'Read-only clone, short-lived tokens, isolated workers, hard-deleted after analysis.',
        securityFeatures: [
          { icon: <Lock className="h-5 w-5" />, title: 'Read-only', text: 'We can never write to your repository - ever.' },
          { icon: <Shield className="h-5 w-5" />, title: 'Isolated runs', text: 'Every analysis runs in an ephemeral, single-tenant environment.' },
          { icon: <GitBranch className="h-5 w-5" />, title: 'No keys stored', text: 'OAuth via your VCS - no long-lived secrets on our side.' },
          { icon: <FileText className="h-5 w-5" />, title: 'DPA on request', text: 'GDPR-aware. Standard DPA available before you start.' },
        ],
        ctaH2: (
          <>
            <span className="premium-silver">Every week, </span>
            <span className="premium-headline-accent">one step safer</span>
            <span className="premium-silver">.</span>
          </>
        ),
        ctaSub: 'Send a request, we handle the rest. Five-minute setup, weekly report, zero pain.',
        ctaPrimary: 'Buy now',
        ctaPrimaryHref: '/sodu-audit-ai',
        ctaSwitch: 'Or switch to /Pentest',
      };
}

const sevToneClass: Record<'red' | 'amber' | 'green', { bg: string; text: string }> = {
  red: { bg: 'bg-[#FFF4F2]', text: 'text-[#B42318]' },
  amber: { bg: 'bg-[#FEE4E4]', text: 'text-[#B54708]' },
  green: { bg: 'bg-[#ECFDF3]', text: 'text-[#067647]' },
};

export default function HomeClient() {
  const { brand, setBrand } = useBrand();
  const locale = useLocale();
  const isPentest = brand === 'pentest';
  const isDe = locale !== 'en';
  const s = isDe ? sharedDe : sharedEn;
  const c = isPentest ? getPentestCopy(isDe) : getAuditAiCopy(isDe);

  return (
    <main className="bg-transparent text-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />

        <div className="relative mx-auto max-w-7xl px-5 pt-12 pb-20 sm:px-6 sm:pt-14 sm:pb-28 lg:pt-20 lg:pb-36">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 text-[12px] font-medium tracking-[0.04em] text-white/65">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_12px_rgba(255,59,48,0.8)]" />
            <span>{s.productEyebrow} {isPentest ? s.toggle.pentest : s.toggle.auditai}</span>
          </div>

          {/* Toggle */}
          <div className="mt-6 inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-[12px] font-semibold backdrop-blur-md">
            <button
              type="button"
              onClick={() => setBrand('pentest')}
              className={
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ' +
                (isPentest ? 'bg-[#FF3B30] text-white shadow-[0_4px_14px_rgba(255,59,48,0.45)]' : 'text-white/70 hover:text-white')
              }
            >
              <Shield className="h-3.5 w-3.5" /> {s.toggle.pentest}
            </button>
            <button
              type="button"
              onClick={() => setBrand('auditai')}
              className={
                'inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition ' +
                (!isPentest ? 'bg-[#FF3B30] text-white shadow-[0_4px_14px_rgba(255,59,48,0.45)]' : 'text-white/70 hover:text-white')
              }
            >
              <Sparkles className="h-3.5 w-3.5" /> {s.toggle.auditai}
            </button>
          </div>

          <h1 className="mt-8 max-w-5xl text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[44px] sm:leading-[1.02] md:text-7xl lg:text-[88px]">
            <span className="premium-silver">{c.heroH1Top}</span>
            <br />
            <span className="premium-headline-accent">{c.heroH1Bottom}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:mt-7 md:text-lg">{c.heroSub}</p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center">
            <Link
              href={c.heroPrimaryHref}
              className="premium-cta inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              {c.heroPrimaryCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={c.heroSecondaryHref}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              {c.heroSecondaryCta} <ArrowRight className="h-4 w-4" />
            </Link>
            <span className="text-center text-xs text-white/45 sm:ml-3 sm:text-left">{c.heroFootnote}</span>
          </div>

          {/* SOCIAL PROOF STRIP */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/70">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#FF3B30]" />
              <span className="font-semibold text-white">{locale === 'en' ? 'ISO 27001 aligned' : 'ISO 27001-konform'}</span>
            </div>
            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#FF3B30]" />
              <span className="font-semibold text-white">{locale === 'en' ? 'GDPR · Made in Germany' : 'DSGVO · Made in Germany'}</span>
            </div>
            <span className="hidden h-4 w-px bg-white/15 sm:block" aria-hidden />
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-0.5 text-[#FFB800]">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </span>
              <span className="premium-tabular font-semibold text-white">{locale === 'en' ? '4.8/5' : '4,8/5'}</span>
              <span className="text-white/50">{locale === 'en' ? 'rating' : 'Bewertung'}</span>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-2 text-xs text-white/70">
            {c.heroPills.map((p) => (
              <span key={p} className="rounded-full border border-white/15 bg-white/5 px-3 py-1">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-6">
          <div className="flex items-center gap-8">
            <p className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{c.trustEyebrow}</p>
            <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
              <div className="premium-marquee flex w-max items-center gap-12 text-[13px] font-medium text-white/55">
                {[...Array(2)].map((_, dup) => {
                  const certs = ['OSCP+', 'OSWE', 'CEH', 'ISO 27001', 'BSI TR-03161', 'OWASP', 'NIST', 'GDPR', 'NIS2', 'DORA', 'MDR', 'BSIG'];
                  return (
                    <div key={dup} className="flex items-center gap-12 pr-12">
                      {certs.map((label, i) => (
                        <span key={label} className="flex items-center gap-12">
                          <span className="tracking-tight">{label}</span>
                          {i < certs.length - 1 && <span className="h-1 w-1 rounded-full bg-[#0A0A0B]/15" />}
                        </span>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
        <div className="max-w-2xl">
          <SectionLabel>{c.featureLabel}</SectionLabel>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.featureHeadline}</h2>
          <p className="mt-4 text-[#525866]">{c.featureSub}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {c.features.map((f) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} />
          ))}
        </div>
      </section>

      {/* TWO PRODUCTS */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
          <div className="max-w-2xl">
            <SectionLabel>{s.twoProductsLabel}</SectionLabel>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.02em] md:text-5xl">
              {s.twoProductsHeadlineA}
              <span className="text-white/55">{s.twoProductsHeadlineB}</span>
            </h2>
            <p className="mt-5 max-w-xl text-[#525866]">{s.twoProductsSub}</p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {/* /Pentest card */}
            <article
              className={
                'group relative overflow-hidden premium-card rounded-3xl p-8 transition lg:p-10 ' +
                (isPentest
                  ? 'border-[#FF3B30]/60 shadow-[0_24px_60px_-30px_rgba(255,59,48,0.45)]'
                  : 'border-white/10 hover:border-white/20 hover:shadow-[0_24px_60px_-30px_rgba(10,10,11,0.18)]')
              }
            >
              {isPentest && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
                  {s.current}
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A0A0B] text-[#FF3B30]">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{s.productLabel} 01</div>
                  <div className="text-sm font-semibold text-white">{s.pentestProductTag}</div>
                </div>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.01em] md:text-[28px]">{s.pentestCardTitle}</h3>
              <p className="mt-3 text-[#525866]">{s.pentestCardSub}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {s.pentestCardBullets.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3B30]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-baseline gap-2 border-t border-white/8 pt-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{s.pentestCardPriceLabel}</span>
                <span className="premium-tabular text-2xl font-semibold text-white">{s.pentestCardPrice}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/request-pentest"
                  className="premium-cta inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-white"
                >
                  {s.pentestCardCtaPrimary} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pentest"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
                >
                  {s.pentestCardCtaSecondary}
                </Link>
              </div>
            </article>

            {/* /AuditAI card */}
            <article
              className={
                'group relative overflow-hidden premium-card rounded-3xl p-8 transition lg:p-10 ' +
                (!isPentest
                  ? 'border-[#FF3B30]/60 shadow-[0_24px_60px_-30px_rgba(255,59,48,0.45)]'
                  : 'border-white/10 hover:border-white/20 hover:shadow-[0_24px_60px_-30px_rgba(10,10,11,0.18)]')
              }
            >
              {!isPentest && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0B] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
                  {s.current}
                </span>
              )}
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A0A0B] text-[#FF3B30]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">{s.productLabel} 02</div>
                  <div className="text-sm font-semibold text-white">{s.auditaiProductTag}</div>
                </div>
              </div>
              <h3 className="mt-7 text-2xl font-semibold tracking-[-0.01em] md:text-[28px]">{s.auditaiCardTitle}</h3>
              <p className="mt-3 text-[#525866]">{s.auditaiCardSub}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {s.auditaiCardBullets.map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3B30]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-baseline gap-2 border-t border-white/8 pt-6">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">{s.auditaiCardPriceLabel}</span>
                <span className="premium-tabular text-2xl font-semibold text-white">{s.auditaiCardPrice}</span>
                <span className="text-[11px] text-white/45">{s.auditaiCardPriceUnit}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/get-started/starter"
                  className="premium-cta inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold text-white"
                >
                  {s.auditaiCardCtaPrimary} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/sample-report"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:border-white/20"
                >
                  {s.auditaiCardCtaSecondary}
                </Link>
              </div>
            </article>
          </div>

          {/* Combine hint */}
          <div className="mt-8 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A0A0B] text-[#FF3B30]">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{s.combineTitle}</div>
                <div className="text-xs text-[#525866]">{s.combineSub}</div>
              </div>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline">
              {s.combineCta} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / METHODOLOGY */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <SectionLabel>{c.methodLabel}</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.methodHeadline}</h2>
          </div>
          <Link
            href={c.methodLinkHref}
            className="hidden text-sm font-semibold text-white underline-offset-4 hover:underline md:inline"
          >
            {c.methodFullLink}
          </Link>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] md:grid-cols-2 xl:grid-cols-4">
          {c.steps.map((step) => (
            <li key={step.n} className="bg-[#16141A] p-7">
              <div className="flex items-center justify-between">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0A0B] text-[#FF3B30]">
                  {step.icon}
                </span>
                <span className="font-mono text-xs text-[#6B7280]">{step.n}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#525866]">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* STATS */}
      <section className="premium-section">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6">
          <StatRow items={c.stats} />
        </div>
      </section>

      {/* SAMPLE PREVIEW */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionLabel>{c.sampleLabel}</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.sampleHeadline}</h2>
            <p className="mt-4 text-[#525866]">{c.sampleSub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTA href={c.samplePrimaryHref} variant="primary">
                {c.samplePrimary}
              </CTA>
              <CTA href={c.sampleSecondaryHref} variant="secondary">
                {c.sampleSecondary}
              </CTA>
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-3 shadow-[0_30px_80px_-30px_rgba(255,59,48,0.25)]">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
              style={{ backgroundImage: 'radial-gradient(60% 50% at 100% 0%, rgba(255,59,48,0.12), transparent 60%)' }}
              aria-hidden
            />
            <div className="relative rounded-2xl border border-white/10 premium-card p-6">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30] shadow-[0_0_8px_rgba(255,59,48,0.8)]" />
                  {c.findingId}
                </span>
                <span className="rounded-full border border-[#FF3B30]/30 bg-[#FF3B30]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#FF6B61]">
                  {c.findingSeverity}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{c.findingTitle}</h3>
              <p className="mt-2 text-sm text-white/55">{c.findingMeta}</p>
              <pre className="mt-5 overflow-x-auto rounded-xl border border-white/10 bg-[#0A0A0B] p-4 text-[12px] leading-relaxed text-white/90">{c.findingFix}</pre>
              <div className="mt-5 grid grid-cols-3 gap-2.5 text-center">
                {c.sampleStats.map((stat) => {
                  const tones: Record<string, { bg: string; text: string; border: string }> = {
                    red: { bg: 'bg-[#FF3B30]/10', text: 'text-[#FF6B61]', border: 'border-[#FF3B30]/25' },
                    amber: { bg: 'bg-amber-300/10', text: 'text-amber-300', border: 'border-amber-300/20' },
                    green: { bg: 'bg-emerald-400/10', text: 'text-emerald-300', border: 'border-emerald-400/20' },
                  };
                  const t = tones[stat.tone] ?? tones.red;
                  return (
                    <div key={stat.label} className={'rounded-xl border p-3 ' + t.bg + ' ' + t.border}>
                      <div className={'premium-tabular text-2xl font-bold ' + t.text}>{stat.value}</div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-white/55">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-white/10">
        <div className="py-20 lg:py-28">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <SectionLabel>{isDe ? 'Kundenstimmen' : 'Testimonials'}</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">
              {isDe ? 'Was unsere Kunden sagen' : 'What our clients say'}
            </h2>
            <p className="mt-4 text-[#525866]">
              {isDe
                ? 'Teams aus DACH vertrauen auf Sodu Secure, um kritische Schwachstellen zu finden, bevor Angreifer es tun.'
                : 'Teams across the DACH region rely on Sodu Secure to find critical vulnerabilities before attackers do.'}
            </p>
          </div>

          <div className="mt-14">
            <TestimonialsMarquee isDe={isDe} />
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:pb-28">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0B] text-white">
          <div className="relative grid gap-10 p-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:p-14">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'radial-gradient(50% 60% at 0% 100%, rgba(255,59,48,0.30), transparent 60%)',
              }}
            />
            <div className="relative">
              <SectionLabelDark>{s.pricingLabel}</SectionLabelDark>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-5xl">{c.pricingHeadline}</h2>
              <p className="mt-4 text-white/70">{c.pricingSub}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={c.pricingPrimaryHref}
                  className="inline-flex items-center gap-1.5 premium-cta rounded-full px-5 py-3 text-sm font-semibold text-white"
                >
                  {c.pricingPrimary} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
                >
                  {c.pricingSecondary}
                </Link>
              </div>
            </div>

            <div className="relative grid gap-3">
              {c.pricingPlans.map(([n, p, a]) => (
                <div key={n} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/60">{n}</div>
                    <div className="mt-1 text-sm text-white/85">{a}</div>
                  </div>
                  <div className="premium-tabular text-2xl font-extrabold">
                    {p}
                    {!isPentest && c.pricingPerMonth && <span className="text-sm text-white/50">{c.pricingPerMonth}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY STRIP */}
      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-3 lg:py-24">
          <div className="lg:col-span-1">
            <SectionLabel>{s.securityLabel}</SectionLabel>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight md:text-4xl">{s.securityHeadline}</h2>
            <p className="mt-4 text-[#525866]">{c.securityBlurb}</p>
            <Link href="/security" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-4 hover:underline">
              {s.securityLink} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {c.securityFeatures.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} text={f.text} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <h2 className="text-[32px] font-semibold leading-[1.07] tracking-[-0.03em] sm:text-4xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            {c.ctaH2}
          </h2>
          <p className="mt-6 text-white/60">{c.ctaSub}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href={c.ctaPrimaryHref}
              className="premium-cta inline-flex items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold text-white"
            >
              {c.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setBrand(isPentest ? 'auditai' : 'pentest')}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/[0.06]"
            >
              {c.ctaSwitch} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
