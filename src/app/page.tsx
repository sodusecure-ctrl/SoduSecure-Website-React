import type { Metadata } from 'next';
import HomeClient from '@/components/landing/HomeClient';

const baseUrl = 'https://sodusecure.com';

export const metadata: Metadata = {
  title: 'Sodu Secure - Pentest & AuditAI',
  description:
    'Manueller Penetrationstest von OSCP-Experten und wöchentliches AI-Code-Review. Wechseln Sie zwischen Sodu /Pentest und Sodu /AuditAI.',
  alternates: { canonical: '/' },
};

export default function Home() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sodu Secure',
    url: baseUrl,
    logo: `${baseUrl}/images/logo.png`,
    description: 'Manual penetration testing and continuous AI-driven code security review.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-177-7750985',
      contactType: 'Sales',
      email: 'info@sodusecure.com',
      availableLanguage: ['German', 'English'],
    },
  };

  // Muss inhaltlich mit den sichtbaren DE-FAQs in HomeClient.tsx übereinstimmen.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Was ist der Unterschied zwischen Sodu /Pentest und Sodu /AuditAI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sodu /Pentest ist ein manueller, punktueller Penetrationstest durch zertifizierte Tester: echte Angriffe, reproduzierbare Proof-of-Concepts und ein klarer Bericht. Sodu /AuditAI ist ein kontinuierliches, KI-gestütztes Code-Review, das jede Woche einen Sicherheitsbericht zu Ihrem Repository liefert. Der Pentest prüft den Ist-Zustand in der Tiefe, AuditAI schützt zwischen den Releases - beides lässt sich kombinieren.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was kostet ein Pentest bei Sodu Secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ein automatisierter Schwachstellenscan startet bei Sodu Secure ab 1.499 €. Ein manueller Pentest wird individuell auf Ihr Projekt zugeschnitten und nach Aufwand und Tagessätzen kalkuliert - meist zwischen 4.000 und 20.000 €. Nach Ihrer Anfrage erhalten Sie innerhalb von 24 Stunden ein verbindliches Angebot. Im Preis enthalten sind der Bericht in Deutsch und Englisch sowie der kostenlose Retest nach der Behebung.',
        },
      },
      {
        '@type': 'Question',
        name: 'Ist der Zugriff auf mein Repository bei Sodu /AuditAI read-only?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Ihr Repository wird ausschließlich read-only über eine GitHub-App oder einen Token geklont - wir können zu keinem Zeitpunkt in Ihren Code schreiben. Jede Analyse läuft in einer isolierten, kurzlebigen Umgebung, langlebige Secrets speichern wir nicht. Das Ergebnis erhalten Sie als wöchentlichen Bericht, ohne ein neues Dashboard einführen zu müssen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wer führt die Penetrationstests bei Sodu Secure durch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Die Penetrationstests bei Sodu Secure führen OSCP-, OSWE- und CEH-zertifizierte Tester aus Berlin durch - manuell statt reinem Scanner-Einsatz, mit der Erfahrung aus über 500 durchgeführten Pentests. Jedes Finding wird mit einem reproduzierbaren Proof-of-Concept belegt und mit konkreten Fix-Empfehlungen dokumentiert. Getestet wird remote oder auf Wunsch vor Ort.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie schnell kann Sodu Secure mit einem Pentest starten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Auf Ihre Anfrage antwortet Sodu Secure innerhalb von 24 Stunden mit einem verbindlichen Festpreis-Angebot. Im kurzen Scoping-Gespräch legen wir Ziele, Umfang und Prüftiefe fest und stimmen den Testzeitraum mit Ihrem Team ab. Nach dem Test erhalten Sie den Bericht in Deutsch und Englisch; der Retest der behobenen Schwachstellen ist kostenlos enthalten.',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HomeClient />
    </>
  );
}
