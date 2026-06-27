import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "Active Directory Pentest – Windows-Domäne absichern | Sodu Secure",
  description:
    "Active Directory Pentest: Wir finden Angriffspfade in Ihrer Windows-Domäne – Kerberoasting, ACL-Missbrauch, Lateral Movement bis Domain Admin. OSCP-zertifiziert, ab 2.500 €.",
  alternates: { canonical: "/services/active-directory" },
};

const data: RegulationContent = {
  slug: "services/active-directory",
  badgeIcon: "server",
  badgeText: "Active Directory · Windows-Domäne",
  title: "Active Directory Pentest",
  titleAccent: "Angriffspfade in Ihrer Windows-Domäne finden",
  heroIntro:
    "Das Active Directory ist das Herz fast jeder Unternehmens-IT – und das bevorzugte Ziel von Angreifern. Wir simulieren reale Angriffe auf Ihre Windows-Domäne und zeigen die Pfade vom normalen Benutzer bis zum Domain Admin, bevor es jemand anderes tut.",
  heroPrimaryCta: "Kostenlose AD-Erstberatung",
  whatIs: {
    title: "Was ist ein Active Directory Pentest?",
    paragraphs: [
      "Ein Active Directory Pentest ist eine gezielte Angriffssimulation gegen Ihre Windows-Domäne. Statt einzelne Server isoliert zu betrachten, folgt der Test den Pfaden, die echte Angreifer nach einem ersten Zugang nutzen: Berechtigungen ausweiten, sich seitlich durch das Netz bewegen (Lateral Movement) und schließlich die Kontrolle über die gesamte Domäne übernehmen.",
      "Im Fokus stehen typische AD-Schwachstellen: schwache Kerberos-Konfigurationen (Kerberoasting, AS-REP Roasting), fehlerhafte ACLs und Delegationen, unsichere Passwort-Richtlinien sowie Fehlkonfigurationen, die sich mit Werkzeugen wie BloodHound zu vollständigen Angriffspfaden verketten lassen.",
    ],
  },
  facts: [
    { label: "Fokus", value: "Windows-Domäne" },
    { label: "Methoden", value: "Kerberos · ACL · BloodHound" },
    { label: "Einstieg", value: "ab 2.500 €" },
  ],
  obligations: {
    title: "Was prüft ein",
    accent: "AD-Pentest?",
    intro:
      "Wir bilden die gesamte Angriffskette nach – von der ersten Aufklärung bis zur Domänenübernahme – und dokumentieren jeden ausnutzbaren Schritt nachvollziehbar.",
    points: [
      "Enumeration & Angriffspfad-Analyse (u. a. mit BloodHound)",
      "Kerberos-Angriffe: Kerberoasting, AS-REP Roasting, Delegation-Abuse",
      "Credential-Zugriff & Lateral Movement zwischen Systemen",
      "Privilege Escalation über ACL-Missbrauch bis zur Domain Dominance",
    ],
    sidebarTitle: "Vom Benutzer zum Domain Admin",
    steps: [
      { label: "Recon & Enumeration", sub: "Domänenstruktur, Nutzer, Gruppen und Trusts erfassen" },
      { label: "Angriffspfade", sub: "Mit BloodHound ausnutzbare Pfade identifizieren" },
      { label: "Kerberos & Credentials", sub: "Tickets und Anmeldedaten angreifen" },
      { label: "Lateral Movement", sub: "Seitliche Ausbreitung durch das Netz" },
      { label: "Domain Dominance", sub: "Übernahme nachweisen, Persistenz aufzeigen" },
    ],
  },
  servicesTitle: "Was wir im AD-Pentest abdecken",
  servicesIntro:
    "Manuelle Tiefe statt reiner Scanner-Ausgabe – jeder Befund wird mit Proof-of-Concept belegt und priorisiert.",
  services: [
    { icon: "search", title: "Enumeration & BloodHound", desc: "Vollständige Erfassung der Domäne und automatisierte Analyse ausnutzbarer Angriffspfade." },
    { icon: "lock", title: "Kerberos-Angriffe", desc: "Kerberoasting, AS-REP Roasting und Delegation-Abuse gegen schwach konfigurierte Konten." },
    { icon: "network", title: "Lateral Movement", desc: "Nachstellen der seitlichen Ausbreitung zwischen Workstations und Servern." },
    { icon: "target", title: "Privilege Escalation", desc: "ACL-Missbrauch und Fehlkonfigurationen bis hin zur vollständigen Domänenübernahme." },
  ],
  whoForTitle: "Für wen ist ein AD-Pentest sinnvoll?",
  whoForIntro:
    "Jedes Unternehmen, das eine Windows-Domäne betreibt, sollte deren Angriffspfade kennen – besonders vor Audits oder nach Vorfällen.",
  whoFor: [
    { icon: "building", title: "Mittelstand & Konzerne", desc: "Organisationen mit gewachsener Windows-Infrastruktur und vielen Benutzerkonten." },
    { icon: "shield", title: "NIS2-/ISO-27001-Pflichtige", desc: "Unternehmen, die technische Wirksamkeitsnachweise für ihre Compliance benötigen." },
    { icon: "users", title: "IT-Abteilungen", desc: "Teams, die ihre AD-Härtung objektiv und durch externe Experten überprüfen lassen wollen." },
    { icon: "alert", title: "Nach einem Vorfall", desc: "Organisationen, die nach einem Angriff verbleibende Angriffspfade ausschließen müssen." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Scoping", desc: "Kostenlos: Wir legen Umfang, Zugangsmodell und Ziele für Ihre Domäne fest.", icon: "message" },
    { step: "02", title: "Recon & Angriffspfade", desc: "Enumeration der Domäne und Analyse ausnutzbarer Pfade.", icon: "search" },
    { step: "03", title: "Exploitation", desc: "Kerberos-, Credential- und ACL-Angriffe bis zur Domänenübernahme.", icon: "target" },
    { step: "04", title: "Bericht & Maßnahmen", desc: "Priorisierter Bericht mit Proof-of-Concepts und konkreter Härtungs-Roadmap.", icon: "clipboard" },
    { step: "05", title: "Re-Test", desc: "Kostenloser Nachtest der behobenen Findings.", icon: "award" },
  ],
  faqs: [
    { q: "Was ist ein Active Directory Pentest?", a: "Ein Active Directory Pentest ist eine manuelle Angriffssimulation gegen Ihre Windows-Domäne. Ziel ist es, reale Angriffspfade vom normalen Benutzerkonto bis zur vollständigen Domänenübernahme (Domain Admin) aufzudecken und nachvollziehbar zu dokumentieren." },
    { q: "Welche Angriffe werden getestet?", a: "Typischerweise Enumeration und Angriffspfad-Analyse mit BloodHound, Kerberos-Angriffe wie Kerberoasting und AS-REP Roasting, ACL- und Delegation-Missbrauch, Credential-Zugriff sowie Lateral Movement und Privilege Escalation bis zur Domain Dominance." },
    { q: "Was ist BloodHound?", a: "BloodHound ist ein etabliertes Analyse-Tool, das Beziehungen und Berechtigungen in einem Active Directory als Graph darstellt. Damit lassen sich oft nicht offensichtliche Angriffspfade zum Domain Admin sichtbar machen – ein Standardwerkzeug im AD-Pentest." },
    { q: "Wie lange dauert ein AD-Pentest?", a: "Je nach Größe und Komplexität der Domäne typischerweise ein bis drei Wochen. Den genauen Aufwand legen wir nach einem kostenlosen Scoping-Gespräch fest und bieten einen Festpreis an." },
    { q: "Was kostet ein Active Directory Pentest?", a: "Ein fokussierter AD-Pentest startet bei Sodu Secure ab 2.500 €. Der genaue Preis hängt von der Anzahl der Systeme und der gewünschten Tiefe ab und wird als Festpreis angeboten – nutzen Sie auch unseren Pentest-Konfigurator." },
  ],
  related: [
    { href: "/services/network-audit", label: "Netzwerk-Pentest", desc: "Prüfung interner und externer Netzwerk-Infrastruktur." },
    { href: "/services/infrastructure-testing", label: "Infrastruktur-Pentest", desc: "Server, Dienste und Systeme im Detail testen." },
    { href: "/penetration-testing", label: "Penetrationstest", desc: "Alle Pentest-Leistungen im Überblick." },
  ],
  relatedHeading: "Weitere Pentest-Leistungen",
  relatedSubtext: "Active Directory ist oft Teil eines größeren Scopes. Sehen Sie sich verwandte Leistungen an.",
  ctaTitle: "Bereit, Ihre Active Directory abzusichern?",
  ctaText: "Kostenlose Erstberatung – wir zeigen Ihnen, welche Angriffspfade in Ihrer Domäne tatsächlich ausnutzbar sind.",
};

export default function Page() {
  return <RegulationPage data={data} />;
}
