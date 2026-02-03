import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get("SODUSECURE_LOCALE")?.value || "de";

  // Validate locale and fallback to "de" if invalid
  const locale = ["en", "de"].includes(cookieLocale) ? cookieLocale : "de";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});