export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  { q: "Was bedeutet IT Sicherheit testen?", a: "IT Sicherheit testen bedeutet, die eigene IT-Infrastruktur – Web-Apps, Netzwerke, Cloud, Active Directory – gezielt auf Schwachstellen zu prüfen, bevor Angreifer sie finden. Ein professioneller IT Sicherheitstest wird von zertifizierten Experten manuell durchgeführt." },
  { q: "Wie oft sollte ich IT Sicherheit testen lassen?", a: "Mindestens einmal jährlich, und nach jeder größeren Systemänderung (Deployment, neue Infrastruktur). NIS2 und ISO 27001 fordern regelmäßige Sicherheitsprüfungen. Viele Unternehmen testen halbjährlich oder nach jedem Release-Zyklus." },
  { q: "Was kostet ein IT Sicherheitstest?", a: "Ein automatisierter Schwachstellenscan kostet bei Sodu Secure ab 1.499 €. Ein manueller IT Sicherheitstest (Pentest) wird individuell auf Ihr Projekt zugeschnitten und nach Aufwand und Tagessätzen kalkuliert – meist zwischen 4.000 und 20.000 €. Nutzen Sie den Online-Konfigurator für ein schnelles, unverbindliches Angebot." },
  { q: "Kann ich IT Sicherheit remote testen lassen?", a: "Ja – alle IT Sicherheitstests können vollständig remote über VPN oder Test-Account durchgeführt werden. Sodu Secure testet deutschlandweit und international." },
  { q: "Was sind die häufigsten Schwachstellen beim IT Sicherheitstest?", a: "Die häufigsten Findings: schwache Authentifizierung (72 %), veraltete Software/CVEs (68 %), unsichere API-Endpunkte (61 %), Active Directory-Fehlkonfigurationen (55 %), überprivilegierte Cloud-Rollen (49 %)." },
  { q: "Bekomme ich nach dem IT Sicherheitstest Unterstützung bei der Behebung?", a: "Ja – der Sodu Secure Pentest-Bericht enthält konkrete Remediation-Empfehlungen für jedes Finding. Optional bieten wir einen kostenlosen Retest kritischer Lücken an, um die Behebung zu verifizieren." },
];
