import type { Metadata } from "next";
import RegulationPage, { type RegulationContent } from "@/components/common/RegulationPage";

export const metadata: Metadata = {
  title: "NIS2-Pentest: Anforderungen & Compliance",
  description:
    "Was ist NIS2? Wer ist betroffen, welche Pflichten gelten - und wie wir Sie mit Gap-Analyse, Penetrationstests und technischen Maßnahmen nach Art. 21 NIS2-konform machen.",
  alternates: { canonical: "/nis2" },
};

const data: RegulationContent = {
  slug: "nis2",
  sourcesIntro: [
    "Artikel 21 Abs. 2 der NIS2-Richtlinie verlangt von betroffenen Einrichtungen ausdrücklich „Konzepte und Verfahren zur Bewertung der Wirksamkeit von Risikomanagementmaßnahmen im Bereich der Cybersicherheit“. Regelmäßige technische Prüfungen wie Penetrationstests sind der anerkannte Weg, diese Wirksamkeit gegenüber Aufsicht und Geschäftsführung nachzuweisen.",
    "Die Bedrohungslage bleibt laut BSI-Lagebericht angespannt – Ransomware und die Ausnutzung ungepatchter Schwachstellen zählen zu den größten Risiken für Unternehmen in Deutschland."
  ],
  sources: [
    {
      "label": "EUR-Lex: Richtlinie (EU) 2022/2555 (NIS2)",
      "url": "https://eur-lex.europa.eu/eli/dir/2022/2555/oj"
    },
    {
      "label": "BSI-Lagebericht zur IT-Sicherheit in Deutschland",
      "url": "https://www.bsi.bund.de/DE/Service-Navi/Publikationen/Lagebericht/lagebericht_node.html"
    }
  ],
  badgeIcon: "network",
  badgeText: "NIS2 · EU 2022/2555 · NIS2UmsuCG",
  title: "NIS2",
  titleAccent: "Cybersicherheit nachweisen",
  heroIntro:
    "Die NIS2-Richtlinie verpflichtet zehntausende Unternehmen in Deutschland zu konkreten Cybersicherheitsmaßnahmen. Wir prüfen Ihre Sicherheit technisch, schließen Lücken und machen Sie nachweisbar konform.",
  heroPrimaryCta: "Kostenlose NIS2-Erstberatung",
  heroSecondary: { href: "/penetration-testing", label: "Mehr zum Penetrationstest" },
  whatIs: {
    title: "Was ist die NIS2-Richtlinie?",
    paragraphs: [
      "NIS2 (Richtlinie (EU) 2022/2555) ist die überarbeitete EU-Richtlinie zur Netz- und Informationssicherheit. Sie löst die bisherige NIS-Richtlinie ab und erweitert den Kreis der betroffenen Unternehmen erheblich – auf rund 30.000 Einrichtungen allein in Deutschland.",
      "Betroffene Unternehmen werden in „wesentliche\" und „wichtige Einrichtungen\" unterteilt und müssen ein angemessenes Risikomanagement, technische Sicherheitsmaßnahmen, Meldepflichten bei Vorfällen sowie eine Registrierung beim BSI umsetzen. In Deutschland erfolgt die Umsetzung über das NIS2-Umsetzungsgesetz (NIS2UmsuCG).",
    ],
  },
  facts: [
    { label: "Rechtsgrundlage", value: "EU 2022/2555" },
    { label: "Betroffen in DE", value: "~30.000 Unternehmen" },
    { label: "Sektoren", value: "18 Branchen" },
  ],
  penalties: {
    title: "Was passiert bei Nichteinhaltung von NIS2?",
    intro:
      "NIS2 ist kein unverbindlicher Leitfaden. Die Richtlinie sieht empfindliche Bußgelder, die persönliche Haftung der Geschäftsleitung und direkte Eingriffe der Aufsichtsbehörde vor.",
    items: [
      {
        value: "Bis 10 Mio. €",
        label: "Bußgeld für wesentliche Einrichtungen",
        desc: "…oder 2 % des weltweiten Jahresumsatzes – je nachdem, welcher Betrag höher ist. Für wichtige Einrichtungen bis 7 Mio. € bzw. 1,4 %.",
      },
      {
        value: "Persönliche Haftung",
        label: "Geschäftsleitung in der Pflicht",
        desc: "Die Leitung muss die Sicherheitsmaßnahmen billigen und überwachen. Bei Verstößen haftet sie persönlich und kann von Leitungsaufgaben ausgeschlossen werden.",
      },
      {
        value: "Aufsicht & Anordnungen",
        label: "Eingriff durch das BSI",
        desc: "Das BSI kann Audits anordnen, verbindliche Anweisungen erteilen und im Extremfall die Tätigkeit einschränken – dazu kommen Reputations- und Vertrauensverluste.",
      },
    ],
  },
  obligations: {
    title: "Welche Pflichten bringt",
    accent: "NIS2 mit sich?",
    intro:
      "NIS2 verlangt einen risikobasierten Ansatz nach dem Stand der Technik. Die Geschäftsleitung haftet persönlich für die Umsetzung der Sicherheitsmaßnahmen und muss diese überwachen.",
    points: [
      "Risikomanagementmaßnahmen nach Art. 21 (u.a. Risikoanalyse, Incident Handling, Backup, Verschlüsselung, Zugriffskontrolle)",
      "Meldepflichten bei Sicherheitsvorfällen: Frühwarnung in 24h, Meldung in 72h, Abschlussbericht in 1 Monat",
      "Registrierung beim BSI und Nachweis der getroffenen Maßnahmen",
      "Persönliche Haftung und Schulungspflicht der Geschäftsleitung",
    ],
    sidebarTitle: "Der Weg zur NIS2-Konformität",
    steps: [
      { label: "Betroffenheit klären", sub: "Fällt Ihr Unternehmen unter NIS2? Wesentlich oder wichtig?" },
      { label: "Gap-Analyse", sub: "Soll-Ist-Abgleich gegen die Anforderungen aus Art. 21" },
      { label: "Technische Prüfung", sub: "Penetrationstests und Schwachstellenanalyse Ihrer Systeme" },
      { label: "Maßnahmen umsetzen", sub: "Lücken schließen, Prozesse und Meldewege etablieren" },
      { label: "Nachweis & Betrieb", sub: "Dokumentation, kontinuierliches Monitoring, Wiederholungstests" },
    ],
  },
  servicesTitle: "Wie wir Sie NIS2-konform machen",
  servicesIntro:
    "Wir setzen am technischen Kern von NIS2 an: Wir testen Ihre Systeme so, wie es ein echter Angreifer tun würde, und liefern prüffähige Nachweise.",
  services: [
    { icon: "fileSearch", title: "NIS2 Gap-Analyse", desc: "Strukturierter Abgleich Ihrer aktuellen Sicherheitslage gegen die Risikomanagementmaßnahmen aus Art. 21 NIS2 – mit priorisiertem Maßnahmenplan." },
    { icon: "search", title: "Penetrationstests", desc: "Manuelle Sicherheitstests Ihrer Web-Anwendungen, APIs, Netzwerke und Infrastruktur – als technischer Nachweis Ihres Sicherheitsniveaus." },
    { icon: "alert", title: "Incident-Response-Readiness", desc: "Wir prüfen Ihre Erkennungs- und Reaktionsfähigkeit und helfen, die geforderten Melde- und Reaktionsprozesse aufzubauen." },
    { icon: "clipboard", title: "Maßnahmen & Reporting", desc: "Konkrete, priorisierte Handlungsempfehlungen und revisionssichere Berichte, die Sie gegenüber Behörden und Kunden vorlegen können." },
  ],
  whoForTitle: "Wer ist von NIS2 betroffen?",
  whoForIntro:
    "NIS2 gilt für mittlere und große Unternehmen in 18 Sektoren – sowie für viele kleinere Betriebe als Teil der Lieferkette.",
  whoFor: [
    { icon: "factory", title: "Energie & Industrie", desc: "Energieversorger, produzierendes Gewerbe, Maschinenbau und Chemie." },
    { icon: "heart", title: "Gesundheit & Pharma", desc: "Kliniken, Labore, Hersteller von Arzneimitteln und Medizinprodukten." },
    { icon: "server", title: "IT & Digitale Dienste", desc: "Cloud-Anbieter, Rechenzentren, Managed-Service-Provider und Software-Häuser." },
    { icon: "briefcase", title: "Transport, Wasser & mehr", desc: "Verkehr, Wasserwirtschaft, Lebensmittel, öffentliche Verwaltung und Zulieferer." },
  ],
  process: [
    { step: "01", title: "Erstgespräch & Betroffenheitsanalyse", desc: "Kostenlos: Wir klären, ob und wie NIS2 für Sie gilt und wo Ihre größten Risiken liegen.", icon: "message" },
    { step: "02", title: "Gap-Analyse nach Art. 21", desc: "Systematischer Soll-Ist-Abgleich gegen alle relevanten Risikomanagementmaßnahmen.", icon: "fileSearch" },
    { step: "03", title: "Technische Sicherheitsprüfung", desc: "Penetrationstests und Schwachstellenanalyse Ihrer Systeme, Netzwerke und Anwendungen.", icon: "target" },
    { step: "04", title: "Bericht & Maßnahmenplan", desc: "Detaillierter Bericht mit CVSS-Bewertung und priorisierten, umsetzbaren Empfehlungen.", icon: "clipboard" },
    { step: "05", title: "Begleitung & Wiederholungstest", desc: "Unterstützung bei der Umsetzung und kostenloser Retest nach Behebung der Findings.", icon: "award" },
  ],
  faqs: [
    { q: "Ist NIS2 verpflichtend?", a: "Ja. NIS2 ist eine EU-Richtlinie und für betroffene Einrichtungen verbindlich. In Deutschland wird sie über das NIS2-Umsetzungsgesetz (NIS2UmsuCG) in das BSI-Gesetz überführt. Freiwillig ist allein der Zeitpunkt, zu dem Sie mit der Umsetzung beginnen - die Pflichten selbst hängen nicht davon ab, ob Sie sich beim BSI bereits registriert haben. Wer wartet, verkürzt nur die eigene Vorbereitungszeit." },
    { q: "Was muss bei NIS2 gemacht werden?", a: "Betroffene Unternehmen setzen die Risikomanagementmaßnahmen aus Art. 21 um: Risikoanalyse, Incident Handling, Business Continuity und Backup, Sicherheit der Lieferkette, sichere Beschaffung und Entwicklung, Bewertung der Wirksamkeit, Cyberhygiene und Schulungen, Kryptografie, Personal- und Zugriffskontrolle sowie Multi-Faktor-Authentifizierung. Dazu kommen Meldepflichten bei Vorfällen, die Registrierung beim BSI und die nachweisbare Überwachung durch die Geschäftsleitung." },
    { q: "Woran erkenne ich, ob mein Unternehmen betroffen ist?", a: "Maßgeblich sind Sektor und Unternehmensgröße. Die Größenschwelle gilt kumulativ: mehr als 50 Beschäftigte und mehr als 10 Mio. EUR Jahresumsatz beziehungsweise Jahresbilanzsumme. Unabhängig von der Größe erfasst das Gesetz bestimmte Betreiber, etwa aus der digitalen Infrastruktur. Auch kleinere Betriebe geraten als Zulieferer indirekt in die Pflicht. In der kostenlosen Erstberatung klären wir Ihre Betroffenheit." },
    { q: "Schreibt NIS2 Penetrationstests vor?", a: "NIS2 verlangt Maßnahmen „nach dem Stand der Technik\", einschließlich der Bewertung der Wirksamkeit von Sicherheitsmaßnahmen. Penetrationstests sind der etablierte Weg, dieses Sicherheitsniveau technisch nachzuweisen und Schwachstellen vor Angreifern zu finden. Ein aktueller Prüfbericht ist gegenüber Aufsicht, Kunden und Geschäftsleitung der einfachste Beleg dafür, dass Ihre Maßnahmen wirklich greifen." },
    { q: "Welche Pentest-Arten sind für NIS2 Art. 21 relevant?", a: "Art. 21 verlangt die Bewertung der Wirksamkeit Ihrer Maßnahmen, nicht eine bestimmte Testart. In der Praxis deckt eine Kombination aus vier Prüfungen die genannten Pflichten ab: der externe Netzwerktest für die aus dem Internet erreichbaren Dienste, der interne Test für Zugriffskontrolle und Multi-Faktor-Authentifizierung, der Web- und API-Test für Ihre kritischen Anwendungen sowie Phishing-Simulationen für Cyberhygiene und Schulung. Welche Kombination Sie brauchen, leiten wir aus Ihren kritischen Diensten und Ihrer Risikoanalyse ab. Eine Übersicht aller Testarten finden Sie auf unserer Seite zum Penetrationstest." },
    { q: "Wie oft müssen wir für NIS2 einen Penetrationstest durchführen?", a: "NIS2 nennt kein festes Intervall. Etabliert und gegenüber der Aufsicht gut begründbar ist ein Test pro Jahr, zusätzlich nach wesentlichen Änderungen an Architektur, Anwendungen oder Netzwerk. Zwischen den Tests empfehlen wir laufende Schwachstellenscans, damit neu bekannt gewordene Lücken nicht bis zum nächsten Pentest offen bleiben." },
    { q: "Was kostet ein Penetrationstest für NIS2?", a: "Ein manueller Penetrationstest wird individuell nach Aufwand kalkuliert und liegt meist zwischen 4.000 und 20.000 EUR, abhängig von Anzahl der Systeme, Anwendungen und Standorte. Als Einstieg kostet ein automatisierter Schwachstellenscan ab 1.499 EUR. Günstiger bleibt, wer den Prüfumfang auf die Systeme begrenzt, die in der NIS2-Risikoanalyse als wesentlich für die Erbringung der Dienstleistung eingestuft sind, statt die gesamte IT pauschal prüfen zu lassen." },
    { q: "Gilt NIS2 auch für unsere Lieferanten und IT-Dienstleister?", a: "Art. 21 verpflichtet Sie ausdrücklich, die Sicherheit Ihrer Lieferkette zu steuern. Ihre Dienstleister fallen damit entweder selbst unter NIS2, oder Sie müssen deren Sicherheitsniveau vertraglich absichern und überprüfen. Deshalb verlangen immer mehr regulierte Unternehmen von ihren Zulieferern einen aktuellen Pentest-Bericht oder ein ISO-27001-Zertifikat." },
    { q: "Wer haftet im Unternehmen für NIS2?", a: "Die Geschäftsleitung. Sie muss die Risikomanagementmaßnahmen billigen, ihre Umsetzung überwachen und sich selbst schulen lassen. Bei Verstößen haftet sie persönlich und kann von Leitungsaufgaben ausgeschlossen werden. Die Aufgabe an die IT-Abteilung zu delegieren entlastet nicht: Freigabe und Kontrolle bleiben in der Verantwortung der Geschäftsführung." },
    { q: "Erfüllen wir NIS2 automatisch, wenn wir nach ISO 27001 zertifiziert sind?", a: "Nein, aber Sie sind deutlich weiter. ISO 27001 deckt große Teile der Anforderungen aus Art. 21 ab, etwa Risikomanagement, Zugriffskontrolle und Kryptografie. NIS2-spezifisch bleiben die Meldefristen von 24 und 72 Stunden, die Registrierung beim BSI und die persönliche Pflicht der Geschäftsleitung. Wir gleichen beide Anforderungswelten in einer Gap-Analyse ab." },
    { q: "Was droht bei Nichteinhaltung?", a: "NIS2 sieht empfindliche Bußgelder vor: für wesentliche Einrichtungen bis zu 10 Mio. EUR oder 2 % des weltweiten Jahresumsatzes, für wichtige Einrichtungen bis 7 Mio. EUR oder 1,4 %. Zusätzlich haftet die Geschäftsleitung persönlich, und das BSI kann Audits anordnen sowie verbindliche Anweisungen erteilen." },
    { q: "Wie schnell können wir starten?", a: "Eine erste Gap-Analyse lässt sich meist innerhalb von 1 bis 2 Wochen durchführen. Auf dieser Basis planen wir gemeinsam die technischen Prüfungen und Maßnahmen. Für die Gap-Analyse genügt ein Remote-Termin mit Ihrer IT; erst die späteren internen Netzwerktests finden auf Wunsch vor Ort statt." },
  ],
  related: [
    { href: "/bsig", label: "BSIG / KRITIS", desc: "Pflichten für Betreiber Kritischer Infrastrukturen nach dem BSI-Gesetz." },
    { href: "/dora", label: "DORA", desc: "Digitale operationale Resilienz für den Finanzsektor." },
    { href: "/iso-27001", label: "ISO 27001", desc: "Der internationale Standard für Informationssicherheits-Managementsysteme." },
  ],
};

export default function Page() {
  return <RegulationPage data={data} />;
}
