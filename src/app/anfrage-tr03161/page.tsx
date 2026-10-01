"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import TR03161Form from "@/components/common/TR03161Form";
import LandingFaq from "@/components/common/LandingFaq";

const FAQS = [
  {
    q: "Wie läuft die TR-03161 Sicherheitsprüfung nach der Anfrage ab?",
    a: "Nach Ihrer TR-03161-Anfrage melden wir uns innerhalb von 1 - 2 Werktagen für ein kostenloses Erstgespräch. Anschließend folgen eine Gap-Analyse gegen die Prüfaspekte der Richtlinie, Penetrationstests von mobiler App, Web-Anwendung und Backend sowie ein detaillierter Bericht mit priorisierten Empfehlungen. Auf Wunsch begleiten wir Sie bis zur offiziellen Zertifizierung durch eine BSI-anerkannte Prüfstelle.",
  },
  {
    q: "Was kostet eine TR-03161 Sicherheitsprüfung?",
    a: "Die Kosten einer TR-03161 Sicherheitsprüfung richten sich nach dem Umfang: Anzahl der Komponenten (mobile App, Web-Frontend, Backend/APIs), Komplexität und gewünschte Prüftiefe. Ein automatisierter Schwachstellenscan startet ab 1.499 €; die manuelle TR-03161-Prüfung wird individuell auf Ihr Projekt zugeschnitten und nach Aufwand und Tagessätzen kalkuliert - meist zwischen 4.000 und 20.000 €. Nach dem Erstgespräch erhalten Sie ein verbindliches Angebot, sodass Sie volle Kostentransparenz vor Projektstart haben.",
  },
  {
    q: "Ersetzt die TR-03161-Prüfung das offizielle BSI-Zertifikat?",
    a: "Nein. Das offizielle TR-03161-Zertifikat darf nur eine vom BSI anerkannte Prüfstelle ausstellen. Unsere Prüfung ist die Vorbereitung darauf: Wir identifizieren Schwachstellen und offene Anforderungen vorab, damit Sie die Zertifizierung möglichst beim ersten Anlauf bestehen und teure Nachprüfungen sowie Verzögerungen beim DiGA-Antrag vermeiden.",
  },
  {
    q: "Welche Unterlagen benötige ich für die TR-03161-Anfrage?",
    a: "Für die TR-03161-Anfrage genügen die Angaben im Formular: Ihre Anwendung, die betroffenen Komponenten und der aktuelle Entwicklungsstand. Technische Details wie Architektur, Testzugänge oder vorhandene Dokumentation klären wir gemeinsam im kostenlosen Erstgespräch. Sie müssen also nichts weiter vorbereiten, um die Anfrage zu stellen.",
  },
  {
    q: "Wer führt die Sicherheitsprüfung durch?",
    a: "Die Prüfung führen OSCP-, OSWE- und CEH-zertifizierte Penetrationstester von Sodu Secure aus Berlin durch. Die Methodik orientiert sich an den Prüfaspekten der TR-03161 sowie an OWASP MASVS, MASTG und ASVS. Sie erhalten einen Bericht in Deutsch und Englisch, dessen Kapitel den drei Teilen der Richtlinie folgen: mobile App, Web-Anwendung und Hintergrundsystem.",
  },
  {
    q: "Wie schnell erhalte ich nach der TR-03161-Anfrage ein Angebot?",
    a: "Nach dem kostenlosen Erstgespräch erhalten Sie das Angebot in der Regel innerhalb von 24 Stunden. Darin stehen Scope, Zeitplan, Prüftiefe und Festpreis. Wenn Sie vorab eine Orientierung zur Größenordnung möchten, liefert der Online-Konfigurator in rund 3 Minuten eine Preisspanne, ohne dass Sie mit jemandem sprechen müssen.",
  },
  {
    q: "Ist die Anfrage unverbindlich?",
    a: "Ja. Die Anfrage und das anschließende Erstgespräch sind kostenlos und unverbindlich. Es entstehen erst Kosten, wenn Sie ein konkretes Angebot beauftragen. Auch wenn sich im Gespräch herausstellt, dass für Ihren Fall eine kleinere Prüfung genügt, sagen wir Ihnen das offen.",
  },
  {
    q: "In welcher Entwicklungsphase sollten wir die TR-03161-Prüfung anfragen?",
    a: "Am besten, sobald Backend und erste App-Version funktionsfähig sind. Dann lassen sich Architektur- und Kryptographie-Themen noch ohne großen Aufwand korrigieren. Eine Anfrage kurz vor dem geplanten BfArM-Antrag ist ebenfalls möglich, erhöht aber das Risiko, dass Befunde den Zeitplan verschieben. Auch laufende Projekte mit bestehender Listung prüfen wir nach größeren Releases.",
  },
  {
    q: "Wird die TR-03161-Prüfung remote oder vor Ort durchgeführt?",
    a: "Standardmäßig remote über VPN-Zugang, Testkonten oder eine bereitgestellte Staging-Umgebung. Das spart Zeit und Reisekosten und ist für App-, Web- und Backend-Tests vollständig ausreichend. Wenn interne Systeme oder Workshops mit Ihrem Entwicklungsteam es sinnvoll machen, kommen wir von Berlin aus auch vor Ort zu Ihnen.",
  },
  {
    q: "Behandeln Sie unsere Angaben aus der Anfrage vertraulich?",
    a: "Ja. Alle Angaben aus dem Formular und dem Erstgespräch behandeln wir vertraulich und geben sie nicht an Dritte weiter. Vor Projektstart schließen wir auf Wunsch eine Geheimhaltungsvereinbarung; werden personenbezogene Daten berührt, kommt ein Auftragsverarbeitungsvertrag nach DSGVO Art. 28 hinzu. Berichte und Zugangsdaten werden verschlüsselt übermittelt.",
  },
];

export default function AnfrageTR03161Page() {
  return (
    <main className="bg-[#0d1117] text-white min-h-screen">
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        {/* Back link */}
        <Link
          href="/bsi-tr-03161"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur BSI TR-03161 Übersicht
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">
              BSI TR-03161 Anfrage
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Anfrage für TR-03161 Sicherheitsprüfung
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Füllen Sie das Formular aus und wir melden uns innerhalb von 1–2
            Werktagen für ein kostenloses Erstgespräch bei Ihnen.
          </p>
        </div>

        {/* Form */}
        <TR03161Form />

        {/* Links */}
        <div className="mt-12 text-center space-y-3">
          <p className="text-gray-500 text-sm">
            Mehr erfahren:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bsi-tr-03161"
              className="text-blue-400 hover:underline text-sm"
            >
              BSI TR-03161 Sicherheitsprüfung
            </Link>
            <Link
              href="/pentest-gesundheitsanwendungen"
              className="text-blue-400 hover:underline text-sm"
            >
              Pentest für Gesundheitsanwendungen
            </Link>
          </div>
        </div>
      </section>

      <LandingFaq faqs={FAQS} />
    </main>
  );
}
