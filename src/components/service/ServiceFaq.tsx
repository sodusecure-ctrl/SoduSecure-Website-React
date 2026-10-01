"use client";

import { useTranslations } from "next-intl";

type ServiceFaqItem = { question: string; answer: string };

type ServiceFaqProps = {
  /** Namespace der Seite in messages/de.json bzw. en.json, z. B. "apiSecurityTesting". */
  namespace: string;
};

/**
 * Seitenspezifischer FAQ-Block fuer die /services/*-Seiten.
 * Liest `<namespace>.pageFaq` aus den next-intl-Messages und ergaenzt damit den
 * gemeinsamen serviceCommon-FAQ-Block aus ComprehensiveTesting.
 *
 * Kein eigenes FAQPage-JSON-LD: Das Schema wird pro Route im layout.tsx aus
 * serviceCommon.faq.items + <namespace>.pageFaq.items zusammengebaut, damit es
 * je Seite genau EIN FAQPage gibt. Die Antworten stehen ueber <details> immer
 * im DOM und sind damit indexierbar.
 */
export default function ServiceFaq({ namespace }: ServiceFaqProps) {
  const t = useTranslations(namespace);
  const items = t.raw("pageFaq.items") as ServiceFaqItem[];

  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <section className="bg-black text-white border-t border-zinc-900 px-4 sm:px-6 py-12 md:py-16 lg:py-20 md:px-8 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          {t("pageFaq.title")}
        </h2>
        <div className="w-12 sm:w-16 h-1 bg-red-600 mb-8 sm:mb-12" />

        <div className="space-y-3 sm:space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-zinc-800 bg-[#16141A] p-4 transition-colors hover:border-red-600/40 sm:p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-white sm:gap-4 sm:text-base">
                <span>{item.question}</span>
                <span
                  aria-hidden
                  className="text-xl leading-none text-red-500 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-xs leading-relaxed text-gray-400 sm:mt-4 sm:text-sm">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
