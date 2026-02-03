"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export function useLocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    // Start a transition to change the locale
    startTransition(() => {
      // Update the cookie
      if (typeof document !== "undefined") {
        document.cookie = `SODUSECURE_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      }

      // Instead of reloading, we'll redirect to the same page with new locale
      // Extract the current path without locale prefix
      const segments = pathname.split("/");
      const currentLocale = segments[1]; // First segment after /

      // Check if the current path already has a locale prefix
      let newPathname = pathname;
      if (["en", "de"].includes(currentLocale)) {
        // Replace the locale segment
        segments[1] = newLocale;
        newPathname = segments.join("/");
      } else {
        // Add locale prefix
        newPathname = `/${newLocale}${pathname}`;
      }

      // Navigate to the new path
      router.push(newPathname);
    });
  };

  return { locale, switchLocale, isPending };
}