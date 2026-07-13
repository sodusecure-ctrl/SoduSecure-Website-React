import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "AWS Penetrationstest – Cloud-Sicherheit für Amazon Web Services",
  description:
    "AWS Penetrationstest: Wir prüfen IAM, S3, EC2 & Konfiguration Ihrer Amazon-Web-Services-Umgebung auf ausnutzbare Schwachstellen. OSCP-zertifiziert, DSGVO-konform.",
  alternates: { canonical: "/services/aws-penetrationstest" },
};

const data: RegulationContent = {
  slug: "services/aws-penetrationstest",
  badgeIcon: "server",
  badgeText: "AWS · Cloud Penetration Testing",
  title: "AWS Penetrationstest",
  titleAccent: "Sicherheit Ihrer Amazon-Web-Services-Umgebung",
  heroIntro:
    "Cloud-Fehlkonfigurationen sind heute eine der häufigsten Ursachen für Datenlecks. Wir prüfen Ihre AWS-Umgebung gezielt auf ausnutzbare Schwachstellen – von IAM und S3 bis zu EC2 und Serverless – innerhalb des AWS-Modells der geteilten Verantwortung.",
  heroPrimaryCta: "Kostenlose AWS-Erstberatung",
  whatIs: {
    title: "Was ist ein AWS Penetrationstest?",
    paragraphs: [
      "Ein AWS Penetrationstest ist eine gezielte Sicherheitsprüfung Ihrer in Amazon Web Services betriebenen Workloads und Konfigurationen. Im Vordergrund stehen nicht die AWS-Rechenzentren selbst (dafür ist Amazon verantwortlich), sondern Ihr Teil im Modell der geteilten Verantwortung: IAM-Rechte, Speicher, Netzwerk und Anwendungskonfiguration.",
      "Typische Schwachstellen sind überprivilegierte IAM-Rollen und Möglichkeiten zur Privilege Escalation, öffentlich erreichbare oder falsch berechtigte S3-Buckets, zu offene Security Groups sowie unsichere Konfigurationen von EC2-, Lambda- oder Container-Diensten. AWS erlaubt Kunden das Pentesting der eigenen Ressourcen für viele Dienste ohne vorherige Freigabe – im Rahmen der AWS-Richtlinie für Kundentests.",
    ],
  },
  facts: [
    { label: "Fokus", value: "AWS-Konto & Workloads" },
    { label: "Schwerpunkt", value: "IAM · S3 · EC2" },
    { label: "Modell", value: "Shared Responsibility" },
  ],
  obligations: {
    title: "Was prüft ein",
    accent: "AWS-Pentest?",
    intro:
      "Wir kombinieren eine Konfigurationsanalyse mit aktiver Exploitation der gefundenen Schwachstellen – immer beschränkt auf Ihre eigenen Ressourcen und im Rahmen der AWS-Testrichtlinie.",
    points: [
      "IAM-Analyse: überprivilegierte Rollen, Policies und Privilege-Escalation-Pfade",
      "Speicher: öffentlich erreichbare oder falsch berechtigte S3-Buckets",
      "Netzwerk: zu offene Security Groups, exponierte Dienste und Endpunkte",
      "Workloads: EC2-, Lambda- und Container-Konfiguration sowie Secrets-Handling",
    ],
    sidebarTitle: "Ablauf des AWS-Pentests",
    steps: [
      { label: "Scope & Konten", sub: "Accounts, Dienste und Testfenster festlegen" },
      { label: "Konfigurations-Review", sub: "IAM, S3, Netzwerk und Workloads analysieren" },
      { label: "Exploitation", sub: "Gefundene Schwachstellen kontrolliert ausnutzen" },
      { label: "Bericht", sub: "Priorisierte Findings mit Proof-of-Concept" },
      { label: "Re-Test", sub: "Behebung prüfen und nachweisen" },
    ],
  },
  servicesTitle: "Was wir in der AWS-Umgebung prüfen",
  servicesIntro:
    "Konfigurationsanalyse und aktive Tests Hand in Hand – mit nachvollziehbaren Belegen statt reiner Tool-Ausgabe.",
  services: [
    { icon: "lock", title: "IAM & Privilege Escalation", desc: "Analyse von Rollen, Policies und Pfaden zur unberechtigten Rechteausweitung im Konto." },
    { icon: "server", title: "S3 & Datenspeicher", desc: "Prüfung auf öffentlich erreichbare oder falsch berechtigte Buckets und Datenabfluss." },
    { icon: "network", title: "Netzwerk & Security Groups", desc: "Identifikation zu offener Regeln, exponierter Dienste und unsicherer Endpunkte." },
    { icon: "search", title: "Workloads & Serverless", desc: "EC2-, Lambda- und Container-Konfiguration inklusive Secrets- und Logging-Hygiene." },
  ],
  whoForTitle: "Für wen ist ein AWS-Pentest sinnvoll?",
  whoForIntro:
    "Jede Organisation, die produktive Workloads oder sensible Daten in AWS betreibt, sollte ihre Cloud-Konfiguration regelmäßig prüfen lassen.",
  whoFor: [
    { icon: "globe", title: "SaaS & Cloud-native", desc: "Unternehmen, deren Produkt vollständig auf AWS läuft und kontinuierlich ausgerollt wird." },
    { icon: "building", title: "Mittelstand mit Cloud-Migration", desc: "Organisationen, die Workloads nach AWS verlagern und Sicherheit absichern wollen." },
    { icon: "shield", title: "Compliance-Pflichtige", desc: "Unternehmen mit ISO-27001-, NIS2- oder DSGVO-Anforderungen an ihre Cloud." },
    { icon: "users", title: "DevOps-Teams", desc: "Teams, die ihre Infrastructure-as-Code und Konfiguration extern verifizieren lassen wollen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir legen Konten, Dienste, Testfenster und Ziele fest.", icon: "message" },
    { step: "02", title: "Konfigurations-Review", desc: "Analyse von IAM, S3, Netzwerk und Workloads.", icon: "fileSearch" },
    { step: "03", title: "Exploitation", desc: "Kontrollierte Ausnutzung der gefundenen Schwachstellen auf Ihren Ressourcen.", icon: "target" },
    { step: "04", title: "Bericht & Maßnahmen", desc: "Priorisierter Bericht mit Proof-of-Concepts und Härtungsempfehlungen.", icon: "clipboard" },
    { step: "05", title: "Re-Test", desc: "Kostenloser Nachtest der behobenen Findings.", icon: "award" },
  ],
  faqs: [
    { q: "Ist ein Penetrationstest in AWS erlaubt?", a: "Ja. AWS gestattet Kunden das Penetrationstesting ihrer eigenen Ressourcen für eine Reihe von Diensten ohne vorherige Genehmigung, im Rahmen der AWS Customer Support Policy for Penetration Testing. Bestimmte Tests (z. B. groß angelegte oder DoS-artige) bedürfen weiterhin einer Abstimmung mit AWS. Wir halten diese Vorgaben strikt ein." },
    { q: "Was wird bei einem AWS-Pentest geprüft?", a: "Schwerpunkte sind IAM (überprivilegierte Rollen, Privilege Escalation), S3-Speicher (öffentliche oder falsch berechtigte Buckets), Netzwerk (Security Groups, exponierte Dienste) sowie Workloads wie EC2, Lambda und Container inklusive Secrets-Handling." },
    { q: "Was bedeutet das Modell der geteilten Verantwortung?", a: "Im AWS Shared Responsibility Model ist Amazon für die Sicherheit der Cloud-Infrastruktur selbst verantwortlich, der Kunde für die Sicherheit in der Cloud – also Konfiguration, Identitäten, Daten und Anwendungen. Genau dieser Kundenbereich ist Gegenstand des Pentests." },
    { q: "Testet ihr auch andere Clouds?", a: "Ja. Neben AWS prüfen wir auch andere Cloud-Umgebungen. Der Ansatz – Konfigurationsanalyse plus aktive Exploitation der Kundenressourcen – ist vergleichbar; die konkreten Dienste und Schwachstellenklassen unterscheiden sich je Anbieter." },
    { q: "Was kostet ein AWS-Pentest?", a: "Der Preis richtet sich nach Umfang (Anzahl Konten, Dienste und Tiefe). Nach einem kostenlosen Scoping-Gespräch erstellen wir ein verbindliches Festpreisangebot – nutzen Sie auch unseren Pentest-Konfigurator für eine erste Einordnung." },
  ],
  related: [
    { href: "/services/cloud-devops-testing", label: "Cloud & DevOps", desc: "Cloud-Sicherheit und CI/CD-Pipelines im Detail prüfen." },
    { href: "/services/infrastructure-testing", label: "Infrastruktur-Pentest", desc: "Server, Dienste und Systeme umfassend testen." },
    { href: "/penetration-testing", label: "Penetrationstest", desc: "Alle Pentest-Leistungen im Überblick." },
  ],
  relatedHeading: "Weitere Pentest-Leistungen",
  relatedSubtext: "AWS ist oft Teil eines größeren Cloud- oder Infrastruktur-Scopes. Sehen Sie sich verwandte Leistungen an.",
  ctaTitle: "Bereit, Ihre AWS-Umgebung abzusichern?",
  ctaText: "Kostenlose Erstberatung – wir zeigen Ihnen, welche Cloud-Fehlkonfigurationen in Ihrem Konto tatsächlich ausnutzbar sind.",
};

export default function Page() {
  return <RegulationPage data={data} />;
}
