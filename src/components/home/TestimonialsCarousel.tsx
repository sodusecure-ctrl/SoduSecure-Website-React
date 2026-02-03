"use client";
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

export default function TestimonialsCarousel() {
  const t = useTranslations('home.testimonialsCarousel');
  const testimonials = useMemo(() => t.raw('items') as {
    id?: number;
    text: string;
    author: string;
    position: string;
    initial: string;
    rating: number;
  }[], [t]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, handleNext]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-sm sm:text-base lg:text-lg">
            {t('subtitle')}
          </p>
        </div>

        {/* Testimonial Card */}
        <Card className={`bg-white shadow-sm sm:shadow-md lg:shadow-lg border-gray-200 transition-opacity duration-300 ${isAnimating ? 'opacity-90' : 'opacity-100'}`}>
          <CardContent className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            {/* Stars */}
            <div className="flex gap-0.5 sm:gap-1 mb-4 sm:mb-5 lg:mb-6">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-red-500 text-red-500"
                  strokeWidth={1.5}
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-gray-900 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-relaxed lg:leading-relaxed mb-6 sm:mb-7 lg:mb-8">
              &quot;{currentTestimonial.text}&quot;
            </blockquote>

            {/* Author Info and Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center">
                  <span className="text-red-600 font-medium text-base sm:text-lg">
                    {currentTestimonial.initial}
                  </span>
                </div>

                {/* Author Details */}
                <div>
                  <div className="font-semibold text-gray-900 text-sm sm:text-base">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-gray-500 text-xs sm:text-sm">
                    {currentTestimonial.position}
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  aria-label="Previous testimonial"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/20"
                  aria-label="Next testimonial"
                  disabled={isAnimating}
                >
                  <ChevronRight className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-7 lg:mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (isAnimating) return;
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 300);
                  }}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 ${index === currentIndex
                    ? 'w-6 sm:w-8 bg-red-500'
                    : 'w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                  disabled={isAnimating}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <p className="text-gray-500 text-xs sm:text-sm">
            {t('footerNote')}
          </p>
        </div>
      </div>
    </div>
  );
}
