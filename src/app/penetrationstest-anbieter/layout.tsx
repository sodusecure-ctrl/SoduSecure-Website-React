import { ServiceJsonLd } from "@/lib/serviceJsonLd";
import { FAQS } from "./faq";
import { ANBIETER_STAND } from "./stand";

export { metadata } from "./metadata";

export default function Layout({ children }: { children: React.ReactNode }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  // ItemList ueber die acht Auswahlkriterien. Auf dieser SERP bestehen die
  // konkurrierenden Treffer durchweg aus Listen ("Marktuebersicht", "Top 5",
  // "eine ausgewaehlte Liste von Fachunternehmen") - Google zeigt dort
  // Aufzaehlungen im Snippet. Die Liste existiert auf der Seite laengst, war
  // aber nicht als solche ausgezeichnet. Die itemListElement-Namen sind exakt
  // die sichtbaren Kriterien, keine erfundenen Zusatzpunkte.
  const criteriaJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "8 Auswahlkriterien für Penetrationstest-Anbieter",
    description:
      "Kriterien, mit denen sich Penetrationstest-Anbieter strukturiert vergleichen lassen - aufgebaut auf dem BSI-Praxis-Leitfaden für IS-Penetrationstests.",
    numberOfItems: 8,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: [
      "Tester-Zertifikate",
      "Methodik",
      "Unabhängigkeit",
      "Vertrag & Haftung",
      "Referenzen",
      "Berichtqualität",
      "Retest",
      "Preistransparenz",
    ].map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      url: "https://sodusecure.com/penetrationstest-anbieter#auswahlkriterien",
    })),
  };

  // WebPage mit Pruefdatum. Auf dieser Trefferliste zeigt Google bei jedem
  // Wettbewerber ein Datum neben dem Treffer, bei uns bisher nicht. Wer
  // Anbieter vergleicht, will wissen, ob der Vergleich noch gilt - deshalb ist
  // das Datum hier ein Klicksignal und kein Beiwerk. Die Werte stehen in
  // stand.ts und werden nur bei echter Durchsicht geaendert.
  const seitenJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://sodusecure.com/penetrationstest-anbieter#webpage",
    url: "https://sodusecure.com/penetrationstest-anbieter",
    name: "Pentest Anbieter vergleichen: 8 Kriterien und 6 Warnsignale",
    description:
      "Acht Kriterien zum Vergleich von Penetrationstest-Anbietern und sechs Warnsignale, die gegen einen Anbieter sprechen.",
    inLanguage: "de-DE",
    datePublished: ANBIETER_STAND.datePublished,
    dateModified: ANBIETER_STAND.dateModified,
    isPartOf: { "@id": "https://sodusecure.com/#website" },
    publisher: { "@id": "https://sodusecure.com/#organization" },
  };

  return (
    <>
      <ServiceJsonLd
        name="Penetrationstest Anbieter"
        description="Woran erkennen Sie einen seriösen Penetrationstest-Anbieter? OSCP/CEH-Zertifizierung, manuelles Testing statt Scan und klare Berichte – plus was Sodu Secure auszeichnet."
        path="/penetrationstest-anbieter"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(criteriaJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seitenJsonLd) }}
      />
      {children}
    </>
  );
}
