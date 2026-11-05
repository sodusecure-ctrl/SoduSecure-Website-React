'use client';

import { useLocale } from 'next-intl';
import YouTubeEmbed from './YouTubeEmbed';

/**
 * Drei Videos vom eigenen Kanal. Titel und Datum stammen aus dem Kanal-Feed,
 * die Beschreibungen fassen den Inhalt zusammen. Die Vorschaubilder liegen
 * lokal unter /public/images/videos.
 *
 * Die Liste steht hier und nicht mehr in about/page.tsx: Der Abschnitt laeuft
 * seit 05.11.2026 auf zwei Seiten (Startseite ganz unten und /about). Zwei
 * Kopien waeren spaetestens beim naechsten Video auseinandergelaufen.
 */
export const KANAL_VIDEOS = [
  {
    id: 'CcHGtpaKPkY',
    title: 'Wir hacken Firmen. Legal.',
    description: 'Was ein Penetrationstest wirklich macht und wie sich zeigt, ob Ihre Systeme standhalten.',
    uploadDate: '2026-07-13',
  },
  {
    id: 'HOMcH6Bhtm0',
    title: 'Was sind Cyberrisiken?',
    description: 'Die größten Gefahren für Unternehmen - verständlich erklärt, ohne Fachchinesisch.',
    uploadDate: '2026-10-12',
  },
  {
    id: 'f0CCG5V_shg',
    title: 'Cyberangriff: Wer ist verantwortlich?',
    description: 'CTO, HR oder IT - wer im Ernstfall haftet und wer vorher handeln muss.',
    uploadDate: '2026-10-19',
  },
];

/**
 * Der Kanal-Abschnitt. Die Videos laden erst auf Klick - bis dahin steht dort
 * nur ein lokales Vorschaubild, es geht nichts an Google.
 *
 * bg-black und text-white sind Absicht: globals.css dreht im hellen Modus
 * beide gemeinsam um (Z. 569 ff. und 662 ff.). Eigene Farbwerte wuerden aus
 * dieser Mechanik ausbrechen und im hellen Modus unlesbar.
 */
export default function YouTubeKanal() {
  const isEnglish = useLocale() === 'en';

  return (
    <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-10 text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2">
            {isEnglish ? 'Sodu Secure on YouTube' : 'Sodu Secure auf YouTube'}
          </h2>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            {isEnglish
              ? 'Cybersecurity explained for decision-makers - short, practical, without jargon.'
              : 'Cybersecurity für Entscheider erklärt - kurz, praxisnah und ohne Fachchinesisch.'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {KANAL_VIDEOS.map((v) => (
            <YouTubeEmbed key={v.id} video={v} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href="https://www.youtube.com/@SoduSecure"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/10"
          >
            {isEnglish ? 'View channel on YouTube' : 'Kanal auf YouTube ansehen'}
          </a>
        </div>
      </div>
    </div>
  );
}
