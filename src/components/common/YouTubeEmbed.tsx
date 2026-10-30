'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * YouTube-Einbindung als Fassade: Bis zum Klick laeuft nichts von Google.
 *
 * Ein normales <iframe src="youtube.com/..."> laedt beim Seitenaufruf rund
 * 1 MB JavaScript nach, setzt Cookies und kostet messbar Ladezeit - auf einer
 * Seite, die um Position 10 kaempft, ist das der falsche Tausch. Stattdessen
 * steht hier zuerst nur ein lokales Vorschaubild. Erst der Klick ersetzt es
 * durch das iframe, und zwar ueber youtube-nocookie.com.
 *
 * Das Vorschaubild liegt unter /public/images/videos/<id>.jpg und wird nicht
 * von i.ytimg.com geladen - sonst ginge die IP des Besuchers schon beim
 * Betrachten an Google, was bei einem Sicherheitsanbieter schlecht aussieht.
 */
export type YouTubeVideo = {
  id: string;
  title: string;
  /** Kurzbeschreibung unter dem Titel; auch fuer das VideoObject-Schema. */
  description: string;
  /** ISO-Datum der Veroeffentlichung, fuer das Schema. */
  uploadDate: string;
};

export default function YouTubeEmbed({
  video,
  className = '',
}: {
  video: YouTubeVideo;
  className?: string;
}) {
  const [aktiv, setAktiv] = useState(false);

  return (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0B] ${className}`}>
      <div className="relative aspect-video">
        {aktiv ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setAktiv(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Video abspielen: ${video.title}`}
          >
            <Image
              src={`/images/videos/${video.id}.jpg`}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#FF3B30] shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-0.5 h-7 w-7 fill-white text-white" />
            </span>
          </button>
        )}
      </div>
      <div className="p-4 lg:p-5">
        <h3 className="text-sm lg:text-base font-semibold leading-snug text-white">{video.title}</h3>
        <p className="mt-1.5 text-xs lg:text-[13px] leading-relaxed text-white/60">{video.description}</p>
      </div>
    </div>
  );
}

/**
 * VideoObject je Video. Die Angaben stammen aus dem Kanal-Feed, sind also
 * belegt - hier wird nichts behauptet, was nicht auf YouTube steht.
 */
export function videoJsonLd(video: YouTubeVideo, baseUrl = 'https://sodusecure.com') {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: video.title,
    description: video.description,
    thumbnailUrl: `${baseUrl}/images/videos/${video.id}.jpg`,
    uploadDate: video.uploadDate,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
    publisher: { '@type': 'Organization', name: 'Sodu Secure', url: baseUrl },
  };
}
