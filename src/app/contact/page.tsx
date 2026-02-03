"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FormEvent, useState } from 'react';

// Define types for form data
interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  privacyAccepted: boolean;
}

// Define types for form errors
interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  privacyAccepted?: string;
}

export default function ContactSection() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    privacyAccepted: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Phone validation regex (supports international formats)
  const phoneRegex = /^[\+]?[0-9\s\-\(\)\.]{10,20}$/;

  // Validate form function
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('form.errors.fullName');
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = t('form.errors.fullName');
    } else if (formData.fullName.trim().length > 100) {
      newErrors.fullName = t('form.errors.fullName');
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = t('form.errors.email');
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t('form.errors.email');
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = t('form.errors.phone');
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = t('form.errors.message');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('form.errors.message');
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = t('form.errors.message');
    }

    // Privacy policy acceptance validation
    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = t('form.errors.privacy');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    // Validate form
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-error="true"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit form');
      }

      // Success - reset form and show success message
      setFormData({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        message: '',
        privacyAccepted: false
      });
      setSubmitSuccess(true);

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input change
  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }

    // Clear general submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <div className="bg-black text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <button className="border border-red-600 text-red-600 px-4 sm:px-6 py-2 rounded hover:bg-red-600 hover:text-white transition-colors mb-4 sm:mb-6 text-xs sm:text-sm font-medium">
            {t('hero.badge')}
          </button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl">
            {t('hero.description')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 leading-tight">
              {t('form.title')}
            </h2>

            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800 text-sm sm:text-base">{t('form.success.title')}</p>
                    <p className="text-xs sm:text-sm text-green-600">
                      {t('form.success.message')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800 text-sm sm:text-base">{submitError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" noValidate>
              {/* Full Name Field */}
              <div data-error={!!errors.fullName}>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">
                  {t('form.fields.fullName.label')} <span className="text-red-600">*</span>
                </label>
                <Input
                  type="text"
                  placeholder={t('form.fields.fullName.placeholder')}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className={`w-full ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                />
                {errors.fullName && (
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">{t('form.fields.company.label')}</label>
                <Input
                  type="text"
                  placeholder={t('form.fields.company.placeholder')}
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Email Field */}
                <div data-error={!!errors.email}>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">
                    {t('form.fields.email.label')} <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder={t('form.fields.email.placeholder')}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    required
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div data-error={!!errors.phone}>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">{t('form.fields.phone.label')}</label>
                  <Input
                    type="tel"
                    placeholder={t('form.fields.phone.placeholder')}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div data-error={!!errors.message}>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">
                  {t('form.fields.message.label')} <span className="text-red-600">*</span>
                </label>
                <Textarea
                  placeholder={t('form.fields.message.placeholder')}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full min-h-32 ${errors.message ? 'border-red-500 focus:ring-red-500' : ''}`}
                  required
                  disabled={isSubmitting}
                />
                <div className="flex justify-between items-center mt-1.5">
                  {errors.message && (
                    <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                      {errors.message}
                    </p>
                  )}
                  <span className={`text-xs ${formData.message.length > 1000 ? 'text-red-600' : 'text-gray-500'}`}>
                    {formData.message.length}/1000
                  </span>
                </div>
              </div>

              {/* Privacy Policy Checkbox */}
              <div data-error={!!errors.privacyAccepted} className="flex items-start gap-3">
                <Checkbox
                  id="privacy"
                  checked={formData.privacyAccepted}
                  onCheckedChange={(checked) => handleInputChange('privacyAccepted', checked === true)}
                  disabled={isSubmitting}
                  className={`mt-0.5 ${errors.privacyAccepted ? 'border-red-500' : ''}`}
                />
                <label htmlFor="privacy" className="text-xs sm:text-sm text-gray-600 cursor-pointer select-none">
                  {t('form.privacy.text')} <br />
                  {t('form.privacy.policy')} *
                </label>
              </div>
              {errors.privacyAccepted && (
                <p className="text-xs sm:text-sm text-red-600 flex items-center gap-1 ml-8 sm:ml-9">
                  <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  {errors.privacyAccepted}
                </p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 sm:py-6 text-sm sm:text-base lg:text-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-xs sm:text-sm lg:text-base">{t('form.submit.sending')}</span>
                  </>
                ) : (
                  <>
                    <span className="text-xs sm:text-sm lg:text-base">{t('form.submit.send')}</span>
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            {/* Interactive Map */}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Riemannstr+8,+10961+Berlin,+Germany" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-black rounded-lg h-40 sm:h-48 lg:h-56 relative overflow-hidden group cursor-pointer hover:ring-2 hover:ring-red-600 transition-all"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.8668395447386!2d13.389599776762938!3d52.49383337207086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84fb1e1d8b8b5%3A0x6a9b4c5d7e8f9a0b!2sRiemannstra%C3%9Fe%208%2C%2010961%20Berlin!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="pointer-events-none"
              ></iframe>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                <span className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                  Route in Google Maps öffnen
                </span>
              </div>
            </a>

            {/* Contact Details */}
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 leading-tight">
                {t('info.title')}
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base mb-1">{t('info.address.title')}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{t('info.address.line1')}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{t('info.address.line2')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base mb-1">{t('info.email.title')}</p>
                    <p className="text-xs sm:text-sm text-gray-600 break-all">{t('info.email.value')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base mb-1">{t('info.phone.title')}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{t('info.phone.value')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base mb-1">{t('info.hours.title')}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{t('info.hours.line1')}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{t('info.hours.line2')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact */}
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 leading-tight">
                {t('quickContact.title')}
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                    <p className="font-semibold text-sm sm:text-base">{t('quickContact.email.title')}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 break-all">{t('quickContact.email.value')}</p>
                </div>

                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                    <p className="font-semibold text-sm sm:text-base">{t('quickContact.call.title')}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{t('quickContact.call.value')}</p>
                </div>

                <div className="p-3 sm:p-4 bg-red-600 text-white rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                    <p className="font-semibold text-sm sm:text-base">{t('quickContact.emergency.title')}</p>
                  </div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">{t('quickContact.emergency.number')}</p>
                  <p className="text-xs sm:text-sm opacity-90 mt-1">
                    {t('quickContact.emergency.note')}
                  </p>
                </div>

                <div className="p-3 sm:p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 flex-shrink-0" />
                    <p className="font-semibold text-sm sm:text-base">{t('quickContact.chat.title')}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{t('quickContact.chat.value')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-black text-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('faq.title')}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('faq.questions.start.question')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('faq.questions.start.answer')}
              </p>
            </div>

            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('faq.questions.response.question')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('faq.questions.response.answer')}
              </p>
            </div>

            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('faq.questions.nda.question')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('faq.questions.nda.answer')}
              </p>
            </div>

            <div className="bg-gray-900/50 p-4 sm:p-6 rounded-lg">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{t('faq.questions.industries.question')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {t('faq.questions.industries.answer')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}