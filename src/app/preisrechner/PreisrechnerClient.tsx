"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Check, ChevronRight, ChevronLeft, Globe, Smartphone, Server,
  Network, Shield, Laptop, HelpCircle, FileText, Video,
  MapPin, Zap, Code, Bug, Search, FileCheck,
  RefreshCw, Workflow, Eye, Package, Fish, Euro, Timer
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { trackConversion } from '@/lib/gtag';

// ── Types ──────────────────────────────────────────────────────────────
type FormData = {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  companySize: string;
  additionalInfo: string;
  agreed: boolean;
};

type CategoryItem = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

type ScopeOption = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

type AddOnOption = {
  id: string;
  title: string;
  description: string;
  price: string;
  icon: React.ReactNode;
};

type ReportOption = {
  id: string;
  title: string;
  price: string;
  icon: React.ReactNode;
  included?: boolean;
};

// ── Preisspannen pro Kategorie & Umfang ────────────────────────────────
const PRICE_RANGES: Record<string, Record<string, [number, number]>> = {
  'web-app': { small: [1500, 4000], medium: [6000, 9000], large: [9000, 15000] },
  'mobile-app': { small: [1500, 4000], medium: [5500, 8500], large: [8500, 14000] },
  'api': { small: [1200, 3500], medium: [5000, 8000], large: [8000, 13000] },
  'internal-infra': { small: [2500, 5000], medium: [8000, 12000], large: [15000, 25000] },
  'public-infra': { small: [2500, 5000], medium: [8000, 12000], large: [15000, 25000] },
  'active-directory': { small: [2500, 5000], medium: [8000, 12000], large: [15000, 25000] },
  'kmu': { basis: [7000, 9500], 'basis-intern': [9500, 12500], komplett: [12000, 15000] },
  'phishing': { starter: [1800, 2500], professional: [4000, 5500], enterprise: [7000, 9500] },
};

const formatEuro = (n: number) => `${n.toLocaleString('de-DE')} €`;

const getPriceRange = (categoryId: string, scopeId: string): [number, number] | null =>
  PRICE_RANGES[categoryId]?.[scopeId] ?? null;

// ── Static Data ────────────────────────────────────────────────────────

const getCategories = (): CategoryItem[] => [
  { id: 'web-app', title: 'Web-Applikation', icon: <Globe className="w-8 h-8" /> },
  { id: 'mobile-app', title: 'Mobil-Applikation', icon: <Smartphone className="w-8 h-8" /> },
  { id: 'api', title: 'API-Schnittstelle', icon: <Server className="w-8 h-8" /> },
  { id: 'internal-infra', title: 'Interne Infrastruktur', icon: <Network className="w-8 h-8" /> },
  { id: 'public-infra', title: 'Öffentliche Infrastruktur', icon: <Shield className="w-8 h-8" /> },
  { id: 'active-directory', title: 'Active Directory', icon: <Laptop className="w-8 h-8" /> },
  { id: 'kmu', title: 'KMU Pentest', icon: <Package className="w-8 h-8" /> },
  { id: 'phishing', title: 'Phishing-Kampagne', icon: <Fish className="w-8 h-8" /> },
  { id: 'other', title: 'Anderer Pentest / Sonderanfrage', icon: <HelpCircle className="w-8 h-8" /> },
];

const getScopeOptions = (categoryId: string): ScopeOption[] => {
  const baseScopes: Record<string, ScopeOption[]> = {
    'web-app': [
      { id: 'small', title: 'Klein', description: 'Ideal für einfache Webanwendungen mit begrenztem Umfang. Dauer: 5 Tage.', icon: <Search className="w-5 h-5" /> },
      { id: 'medium', title: 'Mittel', description: 'Umfassender manueller Pentest inkl. OWASP Top 10, Authentifizierung & Session-Management. Dauer: 4 Wochen.', icon: <Bug className="w-5 h-5" /> },
      { id: 'large', title: 'Groß', description: 'Tiefgehende Analyse inkl. Business-Logic-Tests, API-Endpunkte & komplexe Angriffsszenarien. Dauer: 4 Wochen.', icon: <Code className="w-5 h-5" /> },
    ],
    'mobile-app': [
      { id: 'small', title: 'Klein', description: 'Statische Analyse & grundlegende dynamische Tests der mobilen Anwendung. Dauer: 5 Tage.', icon: <Search className="w-5 h-5" /> },
      { id: 'medium', title: 'Mittel', description: 'Vollständige Analyse inkl. API-Kommunikation, Datenspeicherung & Reverse Engineering. Dauer: 4 Wochen.', icon: <Bug className="w-5 h-5" /> },
      { id: 'large', title: 'Groß', description: 'Tiefgehende Prüfung inkl. Binary-Analyse, Runtime-Manipulation & Backend-Integration. Dauer: 4 Wochen.', icon: <Code className="w-5 h-5" /> },
    ],
    'api': [
      { id: 'small', title: 'Klein', description: 'Prüfung der API-Endpunkte auf gängige Schwachstellen & Fehlkonfigurationen. Dauer: 2 Wochen.', icon: <Search className="w-5 h-5" /> },
      { id: 'medium', title: 'Mittel', description: 'Umfassender API-Test inkl. Authentifizierung, Autorisierung & Datenvalidierung. Dauer: 4 Wochen.', icon: <Bug className="w-5 h-5" /> },
      { id: 'large', title: 'Groß', description: 'Vollständige API-Sicherheitsanalyse mit Business-Logic-Tests & Rate-Limiting-Prüfung. Dauer: 6 Wochen.', icon: <Code className="w-5 h-5" /> },
    ],
    'internal-infra': [
      { id: 'small', title: 'Klein (5 Systeme)', description: 'Schwachstellenscan & manuelle Verifikation der internen Netzwerk-Infrastruktur.', icon: <Search className="w-5 h-5" /> },
      { id: 'medium', title: 'Mittel (100 Systeme)', description: 'Umfassender Pentest inkl. Lateral Movement, Privilege Escalation & Segmentierungsprüfung.', icon: <Bug className="w-5 h-5" /> },
      { id: 'large', title: 'Groß (250 Systeme)', description: 'Tiefgehende Analyse mit Active Directory Angriffspfaden & vollständiger Netzwerk-Penetration.', icon: <Code className="w-5 h-5" /> },
    ],
    'public-infra': [
      { id: 'small', title: 'Klein (5 Systeme)', description: 'Externer Schwachstellenscan & manuelle Verifikation der öffentlich erreichbaren Systeme.', icon: <Search className="w-5 h-5" /> },
      { id: 'medium', title: 'Mittel (100 Systeme)', description: 'Umfassender externer Pentest inkl. Service-Enumeration & Exploit-Verifikation.', icon: <Bug className="w-5 h-5" /> },
      { id: 'large', title: 'Groß (250 Systeme)', description: 'Vollständige externe Sicherheitsanalyse mit mehrstufigen Angriffsszenarien.', icon: <Code className="w-5 h-5" /> },
    ],
    'active-directory': [
      { id: 'small', title: 'Klein', description: 'Überprüfung der AD-Konfiguration, Passwort-Policy & grundlegende Schwachstellen.', icon: <Search className="w-5 h-5" /> },
      { id: 'medium', title: 'Mittel', description: 'Umfassende AD-Analyse inkl. Kerberos-Angriffe, ACL-Missbrauch & Trust-Relationships.', icon: <Bug className="w-5 h-5" /> },
      { id: 'large', title: 'Groß', description: 'Vollständiges AD Red Team Assessment mit Domain Dominance & Persistence-Techniken.', icon: <Code className="w-5 h-5" /> },
    ],
    'kmu': [
      { id: 'basis', title: 'Basis', description: 'Grundlegendes Sicherheitspaket für kleine Unternehmen. Dauer: 3–4 Wochen.', icon: <Search className="w-5 h-5" /> },
      { id: 'basis-intern', title: 'Basis + Intern', description: 'Erweitertes Paket inkl. interner Infrastrukturprüfung. Dauer: 4–5 Wochen.', icon: <Bug className="w-5 h-5" /> },
      { id: 'komplett', title: 'Komplett', description: 'Umfassendes Sicherheitspaket mit allen Prüfbereichen. Dauer: 5–6 Wochen.', icon: <Code className="w-5 h-5" /> },
    ],
    'phishing': [
      { id: 'starter', title: 'Starter', description: 'Grundlegende Phishing-Simulation per E-Mail inkl. Auswertung & Bericht. Dauer: 2 Wochen.', icon: <Search className="w-5 h-5" /> },
      { id: 'professional', title: 'Professional', description: 'Umfassende Phishing-Kampagne mit mehreren Angriffsszenarien & Mitarbeiter-Awareness-Bewertung. Dauer: 4 Wochen.', icon: <Bug className="w-5 h-5" /> },
      { id: 'enterprise', title: 'Enterprise', description: 'Vollständige Social-Engineering-Kampagne inkl. Spear-Phishing, Vishing & detailliertem Executive Report. Dauer: 6 Wochen.', icon: <Code className="w-5 h-5" /> },
    ],
    'other': [],
  };
  return baseScopes[categoryId] || [];
};

const getAddOns = (categoryId: string): AddOnOption[] => {
  if (categoryId === 'other') return [];
  const common: AddOnOption[] = [
    { id: 'retest', title: 'Kostenloser Re-Test', description: '2 Monate kostenloser Re-Test nach Behebung der gefundenen Schwachstellen zur Verifizierung der Maßnahmen.', price: 'Inklusive', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'code-review', title: 'Code-unterstützter Review', description: 'Ergänzende Quellcode-Analyse der sicherheitskritischen Bereiche Ihrer Anwendung.', price: '+ 1.500 €', icon: <Code className="w-5 h-5" /> },
    { id: 'onsite', title: 'Onsite-Abschlusspräsentation', description: 'Persönliche Präsentation der Ergebnisse vor Ort in Ihrem Unternehmen.', price: '+ 500 €', icon: <MapPin className="w-5 h-5" /> },
  ];
  const specific: Record<string, AddOnOption[]> = {
    'internal-infra': [
      { id: 'extended-scope', title: 'Erweiterter Umfang', description: 'Erweiterung des Prüfumfangs auf zusätzliche Netzwerksegmente & Systeme.', price: '+ 2.000 €', icon: <Network className="w-5 h-5" /> },
    ],
    'kmu': [
      { id: 'awareness-training', title: 'Security Awareness Training', description: 'Ergänzendes Mitarbeiter-Training zur Steigerung des Sicherheitsbewusstseins.', price: '+ 1.500 €', icon: <Eye className="w-5 h-5" /> },
    ],
    'phishing': [
      { id: 'executive-workshop', title: 'Executive Workshop', description: 'Zusätzlicher Workshop für die Geschäftsleitung zur Awareness-Strategie.', price: '+ 1.200 €', icon: <Eye className="w-5 h-5" /> },
      { id: 'onsite-training', title: 'Onsite-Training', description: 'Vor-Ort-Schulung für Ihre Mitarbeiter inkl. praktischer Übungen.', price: '+ 1.800 €', icon: <MapPin className="w-5 h-5" /> },
    ],
  };
  return [...common, ...(specific[categoryId] || [])];
};

const getReportOptions = (): ReportOption[] => [
  { id: 'report-only', title: 'Abschlussbericht & Maßnahmenkatalog', price: 'Inklusive', icon: <FileText className="w-6 h-6" />, included: true },
  { id: 'webconf', title: 'Abschlussgespräch via Webkonferenz', price: '+ 599 €', icon: <Video className="w-6 h-6" /> },
  { id: 'onsite', title: 'Persönliches vor Ort Abschlussgespräch', price: '+ 999 €', icon: <MapPin className="w-6 h-6" /> },
];

// ── Step labels ────────────────────────────────────────────────────────
const STEP_LABELS = [
  { num: 1, title: 'Test-Kategorie', subtitle: 'Was soll getestet werden?' },
  { num: 2, title: 'Prüfumfang & Add-Ons', subtitle: 'Umfang & Zusatzoptionen' },
  { num: 3, title: 'Projektinformationen', subtitle: 'Bericht' },
  { num: 4, title: 'Ihre Preisspanne', subtitle: 'Kontaktdaten eingeben' },
];

// ── Countdown-Banner-Texte ("Noch X Schritte bis zum Preis") ───────────
const getCountdownText = (step: number): string => {
  switch (step) {
    case 1: return 'Noch 3 Schritte – dann sehen Sie Ihre Preisspanne';
    case 2: return 'Noch 2 Schritte – dann sehen Sie Ihre Preisspanne';
    case 3: return 'Noch 1 Schritt – gleich sehen Sie Ihre Preisspanne';
    default: return 'Nur noch Ihre Kontaktdaten – dann sehen Sie den Preis sofort';
  }
};

const REDIRECT_SECONDS = 9;

// ── Component ──────────────────────────────────────────────────────────
const PentestPreisrechner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedScope, setSelectedScope] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>({});
  const [selectedReport, setSelectedReport] = useState<string>('report-only');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [redirectSeconds, setRedirectSeconds] = useState(REDIRECT_SECONDS);
  const t = useTranslations('requestPentest');
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    companySize: '',
    additionalInfo: '',
    agreed: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  const categories = getCategories();
  const reportOptions = getReportOptions();

  const companySizes = ['1-10 Mitarbeiter', '11-50 Mitarbeiter', '51-200 Mitarbeiter', '201-1000 Mitarbeiter', '1000+ Mitarbeiter'];

  const priceRange = getPriceRange(selectedCategory, selectedScope);
  const categoryTitle = categories.find((c) => c.id === selectedCategory)?.title ?? '';
  const scopeTitle = getScopeOptions(selectedCategory).find((s) => s.id === selectedScope)?.title ?? '';

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);
  };

  // Nach der Preis-Anzeige automatisch zur Danke-Seite weiterleiten.
  useEffect(() => {
    if (!priceRevealed) return;
    if (redirectSeconds <= 0) {
      router.push('/ifudhuhdksjhfoiadfh');
      return;
    }
    const timer = setTimeout(() => setRedirectSeconds((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [priceRevealed, redirectSeconds, router]);

  // Es wird nur noch eine einzige Tracking-Mail verschickt: beim Start des
  // Formulars (erste Kategorie-Auswahl). Alle weiteren Schritte lösen keine
  // Mails mehr aus – erst wieder das abgeschickte Formular selbst.
  const hasTrackedStart = useRef(false);

  const trackFormStarted = async (categoryId: string) => {
    if (hasTrackedStart.current) return;
    hasTrackedStart.current = true;
    try {
      await fetch('/api/pentest/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentStep: 1,
          selectedCategory: categoryId,
          selectedScope,
          selectedAddOns,
          selectedReport,
          selectedLanguage: 'de',
          formData,
          action: 'form-started',
        }),
      });
    } catch (error) {
      console.error('Tracking failed:', error);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedCategory) return;
    if (currentStep === 2 && !selectedScope && selectedCategory !== 'other') return;
    const newStep = Math.min(currentStep + 1, totalSteps);
    setCurrentStep(newStep);
    scrollToTop();
  };

  const handleCategoryNext = () => {
    if (!selectedCategory) return;
    if (selectedCategory === 'other') {
      setCurrentStep(4);
    } else {
      handleNext();
      return;
    }
    scrollToTop();
  };

  const handleBack = () => {
    let newStep;
    if (currentStep === 4 && selectedCategory === 'other') {
      newStep = 1;
    } else {
      newStep = Math.max(currentStep - 1, 1);
    }
    setCurrentStep(newStep);
    scrollToTop();
  };

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSelectedScope('');
    setSelectedAddOns({});
    trackFormStarted(id);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const n = { ...prev };
        delete n[field];
        return n;
      });
    }
  };

  const validateForm = (): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = 'Bitte geben Sie Ihren Namen ein';
    if (!formData.companyName.trim()) e.companyName = 'Bitte geben Sie Ihren Firmennamen ein';
    if (!formData.email.trim()) {
      e.email = 'Bitte geben Sie Ihre E-Mail-Adresse ein';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
    }
    if (!formData.agreed) e.agreed = 'Bitte stimmen Sie den Datenschutzbestimmungen zu';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/pentest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          companySize: formData.companySize,
          additionalInfo: formData.additionalInfo,
          selectedCategory,
          selectedScope,
          selectedAddOns,
          selectedReport,
          selectedLanguage: 'de',
          tag: 'preisrechner',
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit');
      }
      trackConversion();
      if (priceRange) {
        // Preisspanne kurz anzeigen, danach automatische Weiterleitung.
        setPriceRevealed(true);
        scrollToTop();
      } else {
        // Sonderanfrage ohne Preisspanne: direkt zur Danke-Seite.
        router.push('/ifudhuhdksjhfoiadfh');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(t('submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Countdown-Banner (immer sichtbar über dem Formular) ──────────────
  const CountdownBanner = () => (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-[#FF3B30] to-[#CC2D24] text-white shadow-lg shadow-black/20">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-center">
        <Timer className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-semibold">
          {priceRevealed ? 'Ihre Preisspanne ist da!' : getCountdownText(currentStep)}
        </span>
      </div>
    </div>
  );

  // ── Progress bar ─────────────────────────────────────────────────────
  const ProgressBar = () => (
    <div className="w-full mb-6 lg:mb-0">
      {/* Desktop horizontal stepper */}
      <div className="hidden lg:flex items-center justify-between mb-8 px-2">
        {STEP_LABELS.map((step, idx) => (
          <div key={step.num} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  currentStep > step.num
                    ? 'bg-[#FF3B30] text-white shadow-lg shadow-[#FF3B30]/30'
                    : currentStep === step.num
                    ? 'bg-gradient-to-br from-[#FF3B30] to-[#CC2D24] text-white shadow-lg shadow-black/40 ring-2 ring-[#FF3B30]/40'
                    : 'bg-white/5 text-white/40 border border-white/10'
                }`}
              >
                {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-xs font-semibold ${currentStep >= step.num ? 'text-white' : 'text-white/70'}`}>
                  {step.title}
                </div>
              </div>
            </div>
            {idx < STEP_LABELS.length - 1 && (
              <div className="flex-1 mx-3 mt-[-1rem]">
                <div className={`h-[2px] rounded-full transition-all duration-500 ${currentStep > step.num ? 'bg-[#FF3B30]' : 'bg-white/15'}`} />
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Mobile progress */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/65 uppercase tracking-widest">{`Schritt ${currentStep} von ${totalSteps}`}</span>
          <span className="text-xs font-bold text-white">{STEP_LABELS[currentStep - 1].title}</span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#FF6B61] to-[#FF3B30] transition-all duration-500"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  // ── Navigation buttons ───────────────────────────────────────────────
  const NavButtons = ({ canContinue = true }: { canContinue?: boolean }) => (
    <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
      {currentStep > 1 ? (
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-2xl hover:bg-white/[0.02]"
        >
          <ChevronLeft className="w-4 h-4" />
          Zurück
        </button>
      ) : <div />}
      <button
        onClick={handleNext}
        disabled={!canContinue}
        className={`flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
          canContinue
            ? 'bg-gradient-to-r from-[#FF3B30] to-[#CC2D24] text-white hover:shadow-lg hover:shadow-black/30 hover:scale-[1.02] active:scale-[0.98]'
            : 'bg-white/5 text-white/30 cursor-not-allowed'
        }`}
      >
        Weiter
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );

  // ── Tooltip card (hover description) ─────────────────────────────────
  const TooltipCard = ({ text, visible }: { text: string; visible: boolean }) => {
    if (!visible) return null;
    return (
      <div className="absolute z-50 left-0 right-0 -bottom-1 translate-y-full pointer-events-none">
        <div className="bg-[#0A0A0B] text-white text-xs leading-relaxed rounded-2xl p-3 shadow-xl border border-white/15 max-w-xs mx-auto">
          {text}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0A0A0B] rotate-45 border-l border-t border-white/15" />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#16141A]">
      <CountdownBanner />

      {/* Hero header */}
      <div className="relative overflow-hidden bg-[#0A0A0B] text-white">
        <div className="premium-aurora" aria-hidden />
        <div className="absolute inset-0 premium-grid" aria-hidden />
        <div className="premium-noise" aria-hidden />
        <div className="relative max-w-5xl mx-auto px-4 py-10 lg:py-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
            Pentest-Preisrechner
          </div>
          <h1 className="mt-5 text-3xl lg:text-5xl font-semibold tracking-[-0.03em] leading-[1.05]">
            <span className="premium-silver">Was kostet Ihr Pentest?</span>
            <br />
            <span className="premium-headline-accent">Jetzt Preisspanne berechnen.</span>
          </h1>
          <p className="mt-4 text-white/70 text-sm lg:text-base max-w-2xl mx-auto">
            Beantworten Sie wenige Fragen zu Ihrem Projekt – direkt nach der Eingabe sehen Sie sofort Ihre unverbindliche Preisspanne.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 pb-16 relative z-20">
        <div className="premium-card rounded-2xl shadow-black/20 border border-white/10 overflow-hidden">
          <div className="p-6 lg:p-10">
            {priceRevealed ? (
              /* ═══════════ PREIS-ANZEIGE ═══════════ */
              <div className="text-center py-8 lg:py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF3B30]/10 border border-[#FF3B30]/30 mb-6">
                  <Euro className="w-8 h-8 text-[#FF6B61]" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Ihre unverbindliche Preisspanne</h2>
                <p className="text-white/65 text-sm mb-8">
                  {categoryTitle}{scopeTitle ? ` · ${scopeTitle}` : ''}
                </p>
                {priceRange && (
                  <div className="text-4xl lg:text-6xl font-bold tracking-tight premium-headline-accent mb-8">
                    {formatEuro(priceRange[0])} – {formatEuro(priceRange[1])}
                  </div>
                )}
                <div className="max-w-md mx-auto bg-white/[0.04] border border-white/10 rounded-2xl p-5 mb-8 text-left">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <p className="text-white/75 text-sm leading-relaxed">
                      Ihre Anfrage ist bei uns eingegangen. Sie erhalten innerhalb von <strong className="text-white">24 Stunden</strong> Ihr verbindliches Festpreisangebot per E-Mail.
                    </p>
                  </div>
                </div>
                <p className="text-white/50 text-xs mb-4">
                  Sie werden in {redirectSeconds} Sekunden automatisch weitergeleitet …
                </p>
                <button
                  onClick={() => router.push('/ifudhuhdksjhfoiadfh')}
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-[#FF3B30] to-[#CC2D24] text-white hover:shadow-lg hover:shadow-black/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                >
                  Weiter
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
            <>
            <ProgressBar />

            {/* ═══════════ STEP 1: Category Selection ═══════════ */}
            {currentStep === 1 && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Was soll getestet werden?</h2>
                  <p className="text-white/65 text-base">Wählen Sie die Kategorie, die am besten zu Ihrem Projekt passt.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 mb-4">
                  {categories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`group relative flex flex-col items-center justify-center p-4 lg:p-6 rounded-xl border-2 transition-all duration-200 text-center min-h-[120px] lg:min-h-[140px] ${
                          isSelected
                            ? 'border-[#FF3B30]/40 bg-[#FF3B30]/10 shadow-md shadow-[#FF3B30]/20'
                            : 'border-white/10 bg-transparent hover:border-white/10 hover:shadow-md hover:shadow-black/30 hover:-translate-y-0.5'
                        }`}
                      >
                        <div className={`mb-3 transition-colors ${isSelected ? 'text-[#FF6B61]' : 'text-white/70 group-hover:text-white/70'}`}>
                          {cat.icon}
                        </div>
                        <span className={`text-sm lg:text-base font-semibold leading-tight ${isSelected ? 'text-[#FF6B61]' : 'text-white'}`}>
                          {cat.title}
                        </span>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <div className="w-5 h-5 rounded-full bg-[#FF3B30] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/10">
                  <div />
                  <button
                    onClick={handleCategoryNext}
                    disabled={!selectedCategory}
                    className={`flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                      selectedCategory
                        ? 'bg-gradient-to-r from-[#FF3B30] to-[#CC2D24] text-white hover:shadow-lg hover:shadow-black/30 hover:scale-[1.02] active:scale-[0.98]'
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    {selectedCategory === 'other' ? 'Zur Anfrage' : 'Weiter'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* ═══════════ STEP 2: Scope & Add-Ons ═══════════ */}
            {currentStep === 2 && (
              <div>
                <div className="mb-5">
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-1">Prüfumfang &amp; Add-Ons</h2>
                  <p className="text-white/65 text-sm">
                    Wählen Sie den gewünschten Umfang und optionale Zusatzleistungen.
                  </p>
                </div>

                {/* Scope selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    Prüfumfang
                  </h3>
                  <div className={`grid gap-3 ${getScopeOptions(selectedCategory).length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-3'}`}>
                    {getScopeOptions(selectedCategory).map((scope) => {
                      const isSelected = selectedScope === scope.id;
                      const isHovered = hoveredItem === `scope-${scope.id}`;
                      return (
                        <div
                          key={scope.id}
                          className="relative"
                          onMouseEnter={() => setHoveredItem(`scope-${scope.id}`)}
                          onMouseLeave={() => setHoveredItem(null)}
                        >
                          <button
                            onClick={() => setSelectedScope(scope.id)}
                            className={`w-full relative flex flex-col items-center p-4 lg:p-5 rounded-xl border-2 transition-all duration-200 text-center ${
                              isSelected
                                ? 'border-[#FF3B30]/40 bg-[#FF3B30]/10 shadow-md'
                                : 'border-white/10 bg-transparent hover:border-white/10 hover:shadow-sm'
                            }`}
                          >
                            <div className={`mb-2 ${isSelected ? 'text-[#FF6B61]' : 'text-white/70'}`}>{scope.icon}</div>
                            <span className={`text-sm font-semibold ${isSelected ? 'text-[#FF6B61]' : 'text-white'}`}>{scope.title}</span>
                            {isSelected && (
                              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#FF3B30] flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </button>
                          <TooltipCard text={scope.description} visible={isHovered} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add-ons */}
                {getAddOns(selectedCategory).length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Workflow className="w-4 h-4 text-amber-300" />
                      Optionale Add-Ons
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {getAddOns(selectedCategory).map((addon) => {
                        const isIncluded = addon.id === 'retest';
                        const isSelected = isIncluded || selectedAddOns[addon.id];
                        const isHovered = hoveredItem === `addon-${addon.id}`;
                        return (
                          <div
                            key={addon.id}
                            className="relative"
                            onMouseEnter={() => setHoveredItem(`addon-${addon.id}`)}
                            onMouseLeave={() => setHoveredItem(null)}
                          >
                            <button
                              onClick={() => !isIncluded && toggleAddOn(addon.id)}
                              className={`w-full flex items-center gap-3 p-3 lg:p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                isIncluded
                                  ? 'border-[#FF3B30]/40 bg-[#FF3B30]/10 cursor-default'
                                  : isSelected
                                    ? 'border-amber-300/40 bg-amber-300/10'
                                    : 'border-white/10 bg-transparent hover:border-white/10'
                              }`}
                            >
                              <div className={`flex-shrink-0 w-8 h-8 rounded-2xl flex items-center justify-center ${
                                isIncluded ? 'bg-[#FF3B30]/15 text-[#FF6B61]' : isSelected ? 'bg-amber-300/15 text-amber-300' : 'bg-white/5 text-white/30'
                              }`}>
                                {addon.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className={`text-sm font-semibold block ${isIncluded ? 'text-[#FF6B61]' : isSelected ? 'text-amber-300' : 'text-white'}`}>{addon.title}</span>
                              </div>
                              <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                isIncluded ? 'border-[#FF3B30]/40 bg-[#FF3B30]' : isSelected ? 'border-amber-300/40 bg-amber-300/30' : 'border-white/10'
                              }`}>
                                {(isIncluded || isSelected) && <Check className="w-3 h-3 text-white" />}
                              </div>
                            </button>
                            <TooltipCard text={addon.description} visible={isHovered} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <NavButtons canContinue={!!selectedScope || selectedCategory === 'other'} />
              </div>
            )}

            {/* ═══════════ STEP 3: Project Information ═══════════ */}
            {currentStep === 3 && (
              <div>
                <div className="mb-5">
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-1">Projektinformationen</h2>
                  <p className="text-white/65 text-sm">
                    Wählen Sie den gewünschten Prüfabschluss.
                  </p>
                </div>

                {/* Report completion */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-[#FF6B61]" />
                    Prüfabschluss
                  </h3>
                  <p className="text-xs text-white/70 mb-3">
                    Bei jedem Pentest ist ein ausführlicher Bericht und ein Maßnahmenkatalog enthalten.
                  </p>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                    {reportOptions.map((opt) => {
                      const isSelected = selectedReport === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedReport(opt.id)}
                          className={`relative flex flex-col items-center p-5 rounded-xl border-2 transition-all duration-200 text-center ${
                            opt.included && isSelected
                              ? 'border-[#FF3B30]/40 bg-[#FF3B30]/10 shadow-md'
                              : isSelected
                              ? 'border-white/25 bg-white/[0.04] shadow-md'
                              : 'border-white/10 bg-transparent hover:border-white/10 hover:shadow-sm'
                          }`}
                        >
                          <div className={`mb-3 ${isSelected ? (opt.included ? 'text-[#FF6B61]' : 'text-white') : 'text-white/70'}`}>
                            {opt.icon}
                          </div>
                          <span className={`text-sm font-semibold ${isSelected ? (opt.included ? 'text-[#FF6B61]' : 'text-white') : 'text-white'}`}>
                            {opt.title}
                          </span>
                          {isSelected && (
                            <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center ${opt.included ? 'bg-[#FF3B30]' : 'bg-white/30'}`}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <NavButtons />
              </div>
            )}

            {/* ═══════════ STEP 4: Contact / Price ═══════════ */}
            {currentStep === 4 && (
              <div ref={formRef}>
                <div className="mb-6">
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-1">Fast geschafft – gleich sehen Sie Ihren Preis</h2>
                  <p className="text-white/65 text-sm">
                    Nur noch Ihre Kontaktdaten – direkt nach dem Absenden sehen Sie sofort Ihre unverbindliche Preisspanne. Ihr verbindliches Festpreisangebot erhalten Sie zusätzlich per E-Mail.
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="fullName" className="text-sm font-semibold text-white">
                        Vor- und Nachname <span className="text-[#FF3B30]">*</span>
                      </Label>
                      <Input
                        id="fullName"
                        placeholder="Max Mustermann"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className={`h-11 bg-white/[0.04] border-white/10 focus:border-white/15 focus:ring-[#FF3B30]/30 ${errors.fullName ? 'border-[#FF3B30]/60 bg-[#FF3B30]/10' : ''}`}
                      />
                      {errors.fullName && <p className="text-[#FF3B30] text-xs">{errors.fullName}</p>}
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <Label htmlFor="companyName" className="text-sm font-semibold text-white">
                        Unternehmen <span className="text-[#FF3B30]">*</span>
                      </Label>
                      <Input
                        id="companyName"
                        placeholder="Muster GmbH"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className={`h-11 bg-white/[0.04] border-white/10 focus:border-white/15 focus:ring-[#FF3B30]/30 ${errors.companyName ? 'border-[#FF3B30]/60 bg-[#FF3B30]/10' : ''}`}
                      />
                      {errors.companyName && <p className="text-[#FF3B30] text-xs">{errors.companyName}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-semibold text-white">
                        E-Mail-Adresse <span className="text-[#FF3B30]">*</span>
                      </Label>
                      <p className="text-[11px] text-[#FF6B61] font-medium">Nur noch die E-Mail – dann sehen Sie den Preis sofort.</p>
                      <Input
                        id="email"
                        type="email"
                        placeholder="max@beispiel.de"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`h-11 bg-white/[0.04] border-white/10 focus:border-white/15 focus:ring-[#FF3B30]/30 ${errors.email ? 'border-[#FF3B30]/60 bg-[#FF3B30]/10' : ''}`}
                      />
                      {errors.email && <p className="text-[#FF3B30] text-xs">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-sm font-semibold text-white">
                        Telefonnummer <span className="text-[#FF3B30]">*</span>
                      </Label>
                      <Input
                        id="phone"
                        placeholder="(+49) 01777750985"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`h-11 bg-white/[0.04] border-white/10 focus:border-white/15 focus:ring-[#FF3B30]/30 ${errors.phone ? 'border-[#FF3B30]/60 bg-[#FF3B30]/10' : ''}`}
                      />
                      {errors.phone && <p className="text-[#FF3B30] text-xs">{errors.phone}</p>}
                    </div>

                    {/* Company size */}
                    <div className="space-y-1.5">
                      <Label htmlFor="companySize" className="text-sm font-semibold text-white">
                        Unternehmensgröße <span className="text-white/65 text-xs font-normal">(optional)</span>
                      </Label>
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => handleInputChange('companySize', value)}
                      >
                        <SelectTrigger className="h-11 bg-white/[0.04] border-white/10 focus:border-white/15 w-full">
                          <SelectValue placeholder="Bitte auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Additional info */}
                  <div className="space-y-1.5 mb-4">
                    <Label htmlFor="additionalInfo" className="text-sm font-semibold text-white">
                      Zusätzliche Informationen <span className="text-white/65 text-xs font-normal">(optional)</span>
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      placeholder="Beschreiben Sie ggf. weitere Details zu Ihrem Projekt..."
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      rows={3}
                      className="bg-white/[0.04] border-white/10 focus:border-white/15 focus:ring-[#FF3B30]/30 resize-none"
                    />
                  </div>

                  {/* Terms */}
                  <div className="mb-6">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreed}
                        onCheckedChange={(checked) => handleInputChange('agreed', checked as boolean)}
                        className={`mt-0.5 ${errors.agreed ? 'border-[#FF3B30]/60' : ''}`}
                      />
                      <Label htmlFor="terms" className="text-xs font-normal text-white/65 leading-relaxed cursor-pointer">
                        <>
                          Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                          <a href="/privacy" className="text-white underline hover:text-white">Datenschutzerklärung</a>{' '}
                          zu und bin mit der Kontaktaufnahme bezüglich meiner Anfrage einverstanden.
                        </>
                      </Label>
                    </div>
                    {errors.agreed && <p className="text-[#FF3B30] text-xs mt-1">{errors.agreed}</p>}
                  </div>

                  {/* Submit */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-2xl hover:bg-white/[0.02]"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Zurück
                    </button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 h-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-[#FF3B30]/30 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Wird gesendet...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          {selectedCategory === 'other' ? 'Anfrage absenden' : 'Preis jetzt anzeigen'}
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            )}
            </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-xs">
            Fragen? Rufen Sie uns an:{' '}
            <a href="tel:+491777750985" className="text-white/70 font-medium hover:text-white transition-colors">
              (+49) 01777750985
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PentestPreisrechner;
