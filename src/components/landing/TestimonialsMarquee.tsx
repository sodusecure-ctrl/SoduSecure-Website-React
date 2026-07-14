'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo?: string;
};

export function getTestimonials(isDe: boolean): Testimonial[] {
  return isDe
    ? [
        {
          quote:
            'Die Zusammenarbeit mit Sodu Secure war von Anfang an sehr professionell und angenehm. Besonders beeindruckt hat uns der detaillierte Abschlussbericht mit klaren Handlungsempfehlungen zur Behebung der gefundenen Probleme. Wir empfehlen Sodu Secure gerne als kompetenten und zuverlässigen Partner weiter.',
          author: 'Savas Großmann',
          role: '',
          company: 'Acut Fulfillment GmbH',
          logo: '/images/testemonials-logo/acut-logo-color.png',
        },
        {
          quote:
            'Endlich ein Pentest-Partner, der nicht nur eine PDF abliefert. Das Team hat im Retest jede Schwachstelle persönlich verifiziert. Für unsere ISO-27001-Zertifizierung war das Gold wert.',
          author: 'Sandra K.',
          role: 'Head of IT',
          company: 'Advosoft',
          logo: '/images/testemonials-logo/Advosoft_Neu.png',
        },
        {
          quote:
            'Schnell, professionell und auf Augenhöhe mit unseren Entwicklern. Das wöchentliche AuditAI-Review fängt Probleme ab, bevor sie überhaupt in Produktion gehen.',
          author: 'Tobias R.',
          role: 'Geschäftsführer',
          company: 'Berliner SaaS-Startup',
          logo: '',
        },
        {
          quote:
            'Als Beratungshaus stehen und fallen wir mit dem Vertrauen unserer Mandanten. Sodu Secure hat unsere Systeme gründlich geprüft und uns nachvollziehbar gezeigt, wo wir nachbessern mussten. Absolut empfehlenswert.',
          author: 'Günel A.',
          role: 'Geschäftsführer',
          company: 'Günel Consulting',
          logo: '/images/testemonials-logo/guenel-consulting-logo.png',
        },
        {
          quote:
            'Wir hatten Angst vor einem Pentest – am Ende war es der entspannteste IT-Termin des Jahres. Klare Sprache, faire Preise, echte Ergebnisse.',
          author: 'Julia B.',
          role: 'Geschäftsführerin',
          company: 'E-Commerce KMU',
          logo: '',
        },
        {
          quote:
            'Die gefundenen Schwachstellen waren keine Theorie – das Team hat live demonstriert, wie ein Angreifer an unsere Kundendaten gekommen wäre. Das hat im Management sofort gesessen.',
          author: 'Michael W.',
          role: 'IT-Leiter',
          company: 'Finanzdienstleister',
          logo: '',
        },
      ]
    : [
        {
          quote:
            'Working with Sodu Secure was professional and pleasant from day one. We were particularly impressed by the detailed final report with clear, actionable recommendations for fixing the issues found. We are happy to recommend Sodu Secure as a competent and reliable partner.',
          author: 'Savas Großmann',
          role: '',
          company: 'Acut Fulfillment GmbH',
          logo: '/images/testemonials-logo/acut-logo-color.png',
        },
        {
          quote:
            'Finally a pentest partner that does not just hand over a PDF. The team personally verified every finding in the retest. Invaluable for our ISO 27001 certification.',
          author: 'Sandra K.',
          role: 'Head of IT',
          company: 'Advosoft',
          logo: '/images/testemonials-logo/Advosoft_Neu.png',
        },
        {
          quote:
            'Fast, professional and on eye level with our engineers. The weekly AuditAI review catches issues before they ever reach production.',
          author: 'Tobias R.',
          role: 'Managing Director',
          company: 'Berlin SaaS startup',
          logo: '',
        },
        {
          quote:
            'As a consulting firm we live and die by our clients\u2019 trust. Sodu Secure thoroughly tested our systems and clearly showed us where we needed to improve. Highly recommended.',
          author: 'Günel A.',
          role: 'Managing Director',
          company: 'Günel Consulting',
          logo: '/images/testemonials-logo/guenel-consulting-logo.png',
        },
        {
          quote:
            'We were nervous about a pentest – it turned out to be the most relaxed IT meeting of the year. Clear language, fair pricing, real results.',
          author: 'Julia B.',
          role: 'Managing Director',
          company: 'E-commerce SME',
          logo: '',
        },
        {
          quote:
            'The vulnerabilities they found were not theory – the team showed live how an attacker would have reached our customer data. That landed immediately with management.',
          author: 'Michael W.',
          role: 'Head of IT',
          company: 'Financial services',
          logo: '',
        },
      ];
}

function TestimonialCard({ tm }: { tm: Testimonial }) {
  return (
    <figure className="flex h-full w-[300px] flex-shrink-0 flex-col rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-7 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:w-[380px]">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-[#FF3B30] text-[#FF3B30]" />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-white/85">
        &ldquo;{tm.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
        <div>
          <div className="text-sm font-semibold text-white">{tm.author}</div>
          <div className="text-xs text-white/55">
            {tm.role ? `${tm.role} · ${tm.company}` : tm.company}
          </div>
        </div>
        {tm.logo ? (
          <span className="inline-flex h-10 w-24 items-center justify-end">
            <Image
              src={tm.logo}
              alt={tm.company}
              width={120}
              height={40}
              className="max-h-9 w-auto object-contain opacity-90 brightness-0 invert"
            />
          </span>
        ) : (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF3B30]/15 text-xs font-bold text-[#FF6B61]">
            {tm.author
              .split(' ')
              .map((p) => p.charAt(0))
              .join('')}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export default function TestimonialsMarquee({ isDe }: { isDe: boolean }) {
  const items = getTestimonials(isDe);
  // Duplicate the list so the loop is seamless (-50% translate).
  const loop = [...items, ...items];

  return (
    <div className="testimonial-marquee group relative overflow-hidden">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0A0A0B] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0A0A0B] to-transparent sm:w-28" />

      <div className="testimonial-track gap-6 py-2">
        {loop.map((tm, i) => (
          <TestimonialCard key={`${tm.author}-${i}`} tm={tm} />
        ))}
      </div>
    </div>
  );
}
