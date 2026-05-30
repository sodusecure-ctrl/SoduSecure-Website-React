import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

const supportedLocales = ["de", "en"];

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = supportedLocales.includes(cookieLocale) ? cookieLocale : "de";
  const messages = locale === "en"
    ? (await import("../messages/en.json")).default
    : (await import("../messages/de.json")).default;

  return {
    locale,
    messages,
  };
});