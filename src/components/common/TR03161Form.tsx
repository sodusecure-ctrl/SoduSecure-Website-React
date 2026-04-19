"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

interface TR03161FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  applicationType: string;
  developmentStage: string;
  message: string;
  privacyAccepted: boolean;
}

interface FormErrors {
  fullName?: string;
  company?: string;
  email?: string;
  phone?: string;
  privacyAccepted?: string;
}

export default function TR03161Form() {
  const t = useTranslations("tr03161Form");

  const [formData, setFormData] = useState<TR03161FormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    applicationType: "",
    developmentStage: "",
    message: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const applicationTypes = [
    { value: "mobile-app", label: t("applicationTypes.mobileApp") },
    { value: "web-app", label: t("applicationTypes.webApp") },
    { value: "backend-api", label: t("applicationTypes.backendApi") },
    { value: "combination", label: t("applicationTypes.combination") },
    { value: "unsure", label: t("applicationTypes.unsure") },
  ];

  const developmentStages = [
    { value: "in-development", label: t("developmentStages.inDevelopment") },
    { value: "finished-unpublished", label: t("developmentStages.finishedUnpublished") },
    { value: "in-diga-registry", label: t("developmentStages.inDigaRegistry") },
    { value: "other", label: t("developmentStages.other") },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[\d\s\-()]{6,20}$/;

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = t("errors.fullName");
    }
    if (!formData.company.trim()) {
      newErrors.company = t("errors.company");
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t("errors.email");
    }
    if (formData.phone.trim() && !phoneRegex.test(formData.phone)) {
      newErrors.phone = t("errors.phone");
    }
    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = t("errors.privacy");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tr03161", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          company: formData.company.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          applicationType:
            applicationTypes.find((a) => a.value === formData.applicationType)
              ?.label || undefined,
          developmentStage:
            developmentStages.find((d) => d.value === formData.developmentStage)
              ?.label || undefined,
          message: formData.message.trim() || undefined,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");
      setIsSubmitted(true);
    } catch {
      setErrors({ fullName: t("errors.submitFailed") });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#0f1923] border border-green-500/30 rounded-2xl p-8 md:p-12 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          {t("success.title")}
        </h3>
        <p className="text-gray-300 text-lg">
          {t("success.message")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0f1923] border border-gray-700/50 rounded-2xl p-6 md:p-10 space-y-6"
      noValidate
    >
      <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
        {t("title")}
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        {t("subtitle")}
      </p>

      {/* Name & Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {t("fields.fullName")} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className={`w-full px-4 py-3 bg-[#131927] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors ${
              errors.fullName ? "border-red-500" : "border-gray-600"
            }`}
            placeholder={t("placeholders.fullName")}
          />
          {errors.fullName && (
            <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {t("fields.company")} <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className={`w-full px-4 py-3 bg-[#131927] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors ${
              errors.company ? "border-red-500" : "border-gray-600"
            }`}
            placeholder={t("placeholders.company")}
          />
          {errors.company && (
            <p className="text-red-400 text-xs mt-1">{errors.company}</p>
          )}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {t("fields.email")} <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`w-full px-4 py-3 bg-[#131927] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors ${
              errors.email ? "border-red-500" : "border-gray-600"
            }`}
            placeholder={t("placeholders.email")}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {t("fields.phone")}
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className={`w-full px-4 py-3 bg-[#131927] border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors ${
              errors.phone ? "border-red-500" : "border-gray-600"
            }`}
            placeholder={t("placeholders.phone")}
          />
          {errors.phone && (
            <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Application Type & Development Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {t("fields.applicationType")}
          </label>
          <select
            value={formData.applicationType}
            onChange={(e) =>
              setFormData({ ...formData, applicationType: e.target.value })
            }
            className="w-full px-4 py-3 bg-[#131927] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="">{t("placeholders.applicationType")}</option>
            {applicationTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">
            {t("fields.developmentStage")}
          </label>
          <select
            value={formData.developmentStage}
            onChange={(e) =>
              setFormData({ ...formData, developmentStage: e.target.value })
            }
            className="w-full px-4 py-3 bg-[#131927] border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors appearance-none cursor-pointer"
          >
            <option value="">{t("placeholders.developmentStage")}</option>
            {developmentStages.map((stage) => (
              <option key={stage.value} value={stage.value}>
                {stage.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">
          {t("fields.message")}
        </label>
        <textarea
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          rows={5}
          className="w-full px-4 py-3 bg-[#131927] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors resize-none"
          placeholder={t("placeholders.message")}
        />
      </div>

      {/* Privacy Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.privacyAccepted}
            onChange={(e) =>
              setFormData({ ...formData, privacyAccepted: e.target.checked })
            }
            className="mt-1 w-4 h-4 rounded border-gray-600 bg-[#131927] text-blue-500 focus:ring-blue-500/50"
          />
          <span className="text-sm text-gray-400">
            {t("fields.privacyText")}{" "}
            <Link href="/privacy" className="text-blue-400 hover:underline">
              {t("fields.privacyLink")}
            </Link>{" "}
            <span className="text-red-400">*</span>
          </span>
        </label>
        {errors.privacyAccepted && (
          <p className="text-red-400 text-xs mt-1">{errors.privacyAccepted}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors text-base"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t("submitting")}
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            {t("submit")}
          </>
        )}
      </button>
    </form>
  );
}
