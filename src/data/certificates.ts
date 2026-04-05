export type PentestScope =
  | "web"
  | "mobile"
  | "infrastructure"
  | "phishing"
  | "api"
  | "active_directory"
  | "cloud"
  | "software";

export type ScoreCategory =
  | "excellent_plus"
  | "testsieger"
  | "sehr_gut"
  | "gut"
  | "befriedigend"
  | "ausreichend"
  | "mangelhaft";

export interface Certificate {
  id: string; // e.g. "SS-2025-0001"
  company: string; // Company name to display
  companyUrl?: string; // Optional company website
  score: number; // e.g. 1.0, 1.5, 2.0
  category: ScoreCategory;
  date: string; // ISO date string "YYYY-MM-DD"
  validUntil: string; // ISO date string "YYYY-MM-DD"
  scope: PentestScope[];
  tester: string; // e.g. "SODU Secure GmbH"
  findingsTotal: number;
  findingsCritical: number;
  findingsHigh: number;
  findingsMedium: number;
  findingsLow: number;
  findingsInfo: number;
  allCriticalFixed: boolean;
  description?: string; // optional short summary
}

export const SCORE_META: Record<
  ScoreCategory,
  { label: string; color: string; bg: string; border: string; minScore: number; maxScore: number }
> = {
  excellent_plus: {
    label: "Ausgezeichnet+",
    color: "#0a6b36",
    bg: "#d4f0e0",
    border: "#0a6b36",
    minScore: 0.7,
    maxScore: 0.9,
  },
  testsieger: {
    label: "Testsieger",
    color: "#1a7a3a",
    bg: "#e6f5ec",
    border: "#1a7a3a",
    minScore: 1.0,
    maxScore: 1.0,
  },
  sehr_gut: {
    label: "Sehr gut",
    color: "#2266cc",
    bg: "#e6eeff",
    border: "#2266cc",
    minScore: 1.1,
    maxScore: 1.5,
  },
  gut: {
    label: "Gut",
    color: "#1a66bb",
    bg: "#ddeeff",
    border: "#1a66bb",
    minScore: 1.6,
    maxScore: 2.0,
  },
  befriedigend: {
    label: "Befriedigend",
    color: "#cc8800",
    bg: "#fff7e0",
    border: "#cc8800",
    minScore: 2.1,
    maxScore: 2.5,
  },
  ausreichend: {
    label: "Ausreichend",
    color: "#cc4400",
    bg: "#fff0e6",
    border: "#cc4400",
    minScore: 2.6,
    maxScore: 3.5,
  },
  mangelhaft: {
    label: "Mangelhaft",
    color: "#cc0000",
    bg: "#fff0f0",
    border: "#cc0000",
    minScore: 3.6,
    maxScore: 5.0,
  },
};

export const SCOPE_LABELS: Record<PentestScope, string> = {
  web: "Web-Applikation",
  mobile: "Mobile App",
  infrastructure: "Infrastruktur / Netzwerk",
  phishing: "Phishing-Simulation",
  api: "API-Sicherheit",
  active_directory: "Active Directory",
  cloud: "Cloud-Infrastruktur",
  software: "Software / Quellcode",
};

// ──────────────────────────────────────────────
// Certificate database – add new entries here
// ──────────────────────────────────────────────
export const CERTIFICATES: Certificate[] = [
  // Demo certificate – replace with real data
  {
    id: "SS-2025-DEMO",
    company: "Demo GmbH",
    companyUrl: "https://example.com",
    score: 1.0,
    category: "testsieger",
    date: "2025-01-15",
    validUntil: "2026-01-15",
    scope: ["web", "api"],
    tester: "SODU Secure GmbH",
    findingsTotal: 8,
    findingsCritical: 0,
    findingsHigh: 1,
    findingsMedium: 3,
    findingsLow: 3,
    findingsInfo: 1,
    allCriticalFixed: true,
    description:
      "Vollständiger Pentest der Web-Applikation und API-Endpunkte. Alle kritischen und hohen Schwachstellen wurden vor Zertifikatsausstellung behoben.",
  },
  {
    id: "SS-2026-0001",
    company: "Acur Fulfillment GmbH",
    companyUrl: "https://acur-fulfillment.de",
    score: 1.0,
    category: "testsieger",
    date: "2026-02-10",
    validUntil: "2027-02-10",
    scope: ["web", "api", "infrastructure"],
    tester: "SODU Secure GmbH",
    findingsTotal: 11,
    findingsCritical: 0,
    findingsHigh: 2,
    findingsMedium: 4,
    findingsLow: 3,
    findingsInfo: 2,
    allCriticalFixed: true,
    description:
      "Umfassender Penetrationstest der Web-Applikation, REST-API und internen Netzwerkinfrastruktur. Alle kritischen und hohen Schwachstellen wurden vor Zertifikatsausstellung vollständig behoben.",
  },
  {
    id: "SS-2026-0002",
    company: "Berliner Logistik AG",
    companyUrl: "https://berliner-logistik.de",
    score: 1.5,
    category: "sehr_gut",
    date: "2026-03-05",
    validUntil: "2027-03-05",
    scope: ["web", "active_directory", "phishing"],
    tester: "SODU Secure GmbH",
    findingsTotal: 19,
    findingsCritical: 1,
    findingsHigh: 3,
    findingsMedium: 7,
    findingsLow: 5,
    findingsInfo: 3,
    allCriticalFixed: true,
    description:
      "Penetrationstest der Web-Applikation, Active Directory-Infrastruktur und Phishing-Simulation mit 45 Mitarbeitern. Die kritische Schwachstelle (SQL-Injection) wurde vor Abschluss des Tests behoben.",
  },
  {
    id: "SS-2026-0003",
    company: "FinTech Solutions GmbH",
    companyUrl: "https://fintechsolutions.de",
    score: 0.7,
    category: "excellent_plus",
    date: "2026-04-01",
    validUntil: "2027-04-01",
    scope: ["web", "api", "mobile", "cloud"],
    tester: "SODU Secure GmbH",
    findingsTotal: 5,
    findingsCritical: 0,
    findingsHigh: 0,
    findingsMedium: 2,
    findingsLow: 2,
    findingsInfo: 1,
    allCriticalFixed: true,
    description:
      "Vollständiger Pentest der Web-App, mobilen iOS/Android-Apps, REST-API und Cloud-Infrastruktur (AWS). Das Unternehmen verfügt bereits über ein internes Bug-Bounty-Programm, regelmäßige Code-Reviews und automatisierte SAST/DAST-Pipelines — daher Ausgezeichnet+.",
  },
  {
    id: "SS-2026-0004",
    company: "Vineta Allstars",
    score: 1.3,
    category: "sehr_gut",
    date: "2026-04-05",
    validUntil: "2027-04-05",
    scope: ["web"],
    tester: "Sodu Secure GmbH",
    findingsTotal: 9,
    findingsCritical: 0,
    findingsHigh: 1,
    findingsMedium: 4,
    findingsLow: 3,
    findingsInfo: 1,
    allCriticalFixed: true,
    description:
      "Penetrationstest der Web-Applikation von Veneta Allstars. Alle kritischen Schwachstellen wurden vor Zertifikatsausstellung behoben. Kleinere mittlere Findings sind dokumentiert und werden behoben.",
  },
];

export function getCertificate(id: string): Certificate | undefined {
  return CERTIFICATES.find(
    (c) => c.id.toLowerCase() === id.toLowerCase()
  );
}
