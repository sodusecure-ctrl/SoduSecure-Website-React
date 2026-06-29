"use client";

import { Star } from "lucide-react";
import TestimonialsMarquee from "./TestimonialsMarquee";

/**
 * Scrolling customer testimonials (marquee) – same component as the homepage,
 * wrapped in a brand red/black section with a heading. Drop into any landing page.
 */
export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#0A0A0B] border-y border-white/10 overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-full px-4 py-1.5 text-sm text-[#FF6B61] mb-4">
          <Star className="w-3.5 h-3.5" />
          <span>Kundenstimmen</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">Was unsere Kunden sagen</h2>
        <p className="text-white/60 text-sm">
          Teams aus der DACH-Region vertrauen auf Sodu Secure, um kritische Schwachstellen zu finden, bevor Angreifer es tun.
        </p>
      </div>
      <TestimonialsMarquee isDe={true} />
    </section>
  );
}
