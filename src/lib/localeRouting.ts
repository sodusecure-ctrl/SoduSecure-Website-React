const REQUEST_PENTEST_BASE_ROUTES = [
  "/request-pentest",
  "/request-pentest-ads",
  "/request-pentest-ads-g",
] as const;

export function normalizePathname(pathname?: string | null): string {
  if (!pathname || pathname.trim() === "") {
    return "/";
  }

  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

export function isRequestPentestBaseRoute(pathname?: string | null): boolean {
  const cleanPath = normalizePathname(pathname);
  return REQUEST_PENTEST_BASE_ROUTES.some((route) => cleanPath === route);
}

export function isRequestPentestEnglishSuffixRoute(pathname?: string | null): boolean {
  const cleanPath = normalizePathname(pathname);
  return REQUEST_PENTEST_BASE_ROUTES.some((route) => cleanPath === `${route}/en`);
}

export function isEnglishPath(pathname?: string | null): boolean {
  const cleanPath = normalizePathname(pathname);

  return isRequestPentestEnglishSuffixRoute(cleanPath);
}

export function localizeHref(path: string, english: boolean): string {
  const cleanPath = normalizePathname(path);

  // Keep request-pentest routes as explicit /en suffix pages.
  if (english && isRequestPentestBaseRoute(cleanPath)) {
    return `${cleanPath}/en`;
  }

  if (!english && isRequestPentestEnglishSuffixRoute(cleanPath)) {
    return cleanPath.replace(/\/en$/, "");
  }

  // For all other routes, keep the same path to avoid /en/* 404s.
  if (cleanPath === "/en") {
    return "/";
  }

  if (cleanPath.startsWith("/en/")) {
    return cleanPath.replace("/en", "") || "/";
  }

  return cleanPath;
}

export function getLanguageTogglePath(pathname?: string | null): string {
  const cleanPath = normalizePathname(pathname);

  if (isRequestPentestEnglishSuffixRoute(cleanPath)) {
    return cleanPath.replace(/\/en$/, "");
  }

  if (isRequestPentestBaseRoute(cleanPath)) {
    return `${cleanPath}/en`;
  }

  if (cleanPath === "/en") {
    return "/";
  }

  if (cleanPath.startsWith("/en/")) {
    return cleanPath.replace("/en", "") || "/";
  }

  return cleanPath;
}
