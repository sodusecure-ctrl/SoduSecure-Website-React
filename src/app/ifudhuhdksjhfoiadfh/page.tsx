"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, ArrowRight, Phone, Mail, Loader2 } from "lucide-react";

export default function ThankYouPage() {
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackSending, setFeedbackSending] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const sendFeedback = async () => {
    if (!rating && !feedback.trim()) return;
    setFeedbackSending(true);
    try {
      const resp = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, feedback }),
      });
      if (resp.ok) setFeedbackSent(true);
    } catch {
      /* silent */
    } finally {
      setFeedbackSending(false);
    }
  };

  const ratingEmojis = ["😡", "😕", "😐", "🙂", "😄"];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-[#2f0000] to-[#250000] flex items-center justify-center px-4 py-8 sm:py-14 lg:py-20">
      <div
        className={`max-w-xl w-full text-center transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-red-800/30 border border-red-400 rounded-full p-4 sm:p-5 shadow-lg shadow-red-900/70">
            <CheckCircle className="w-10 h-10 sm:w-14 sm:h-14 text-red-300" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-red-200 mb-2 sm:mb-3 leading-tight">
          Vielen Dank!
        </h1>
        <p className="text-red-200 text-sm sm:text-base mb-1 sm:mb-2">
          Ihre Anfrage ist bei uns eingegangen.
        </p>
        <p className="text-red-100/80 text-xs sm:text-sm mb-5 sm:mb-10">
          Unser Team meldet sich in der Regel innerhalb von <span className="text-red-100 font-semibold">2 Stunden</span> persönlich bei Ihnen.
        </p>

        {/* Divider */}
        <div className="border-t border-white/10 mb-5 sm:mb-10" />

        {/* Contact info */}
        <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-5">Bei dringenden Fragen erreichen Sie uns direkt:</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-5 sm:mb-8">
          <a
            href="tel:+491777750985"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl px-5 py-3 sm:px-6 sm:py-4 text-base sm:text-lg font-bold transition shadow-lg hover:shadow-xl"
          >
            <Phone className="w-5 h-5 text-red-400" />
            <span className="text-base sm:text-xl font-extrabold">0177 7750985</span>
          </a>
          <a
            href="mailto:sodusecure@gmail.com"
            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-4 py-2.5 sm:px-5 sm:py-3 text-xs sm:text-sm transition"
          >
            <Mail className="w-4 h-4 text-red-400" />
            sodusecure@gmail.com
          </a>
        </div>

        {/* Feedback */}
        <div className="mb-5 sm:mb-8 text-left text-white">
          <p className="text-xs sm:text-sm mb-2">Wie fanden Sie die Seite? Bitte bewerten:</p>
          <div className="flex justify-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            {ratingEmojis.map((emoji, index) => {
              const value = index + 1;
              return (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`text-xl sm:text-2xl p-1.5 sm:p-2 rounded-full transition ${rating === value ? 'bg-white/30' : 'bg-white/10 hover:bg-white/20'}`}
                  aria-label={`Bewertung ${value}`}
                >
                  {emoji}
                </button>
              );
            })}
          </div>

          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Wie du die Seite fandest..."
            className="w-full p-2.5 sm:p-3 rounded-lg border border-white/20 bg-white/5 text-white text-sm placeholder:text-white/60"
            rows={2}
          />

          {feedbackSent ? (
            <p className="mt-2 text-center text-sm text-green-400 font-medium">
              ✓ Danke für dein Feedback!
            </p>
          ) : (
            <button
              onClick={sendFeedback}
              disabled={feedbackSending || (!rating && !feedback.trim())}
              className="mt-2 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg text-sm transition"
            >
              {feedbackSending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Feedback senden"
              )}
            </button>
          )}
        </div>

        {/* CTA back to site */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] text-sm sm:text-base"
        >
          Zurück zur Startseite
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}
