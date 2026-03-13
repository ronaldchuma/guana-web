import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): string {
  // 1. Check cookie (user's explicit choice via switcher)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as typeof i18n.locales[number])) {
    return cookieLocale;
  }

  // 2. Parse Accept-Language header
  const acceptLang = request.headers.get("Accept-Language") || "";
  const preferred = acceptLang
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=");
      return { code: code.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .find((lang) => i18n.locales.includes(lang.code as typeof i18n.locales[number]));

  return preferred?.code || i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, auth, etc.
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/.well-known")
  ) {
    return;
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect preferred locale
  const locale = getPreferredLocale(request);

  // Default locale (es) — no redirect, let next.config rewrites handle it
  if (locale === i18n.defaultLocale) return;

  // Non-default locale (en) — redirect to /en/...
  return NextResponse.redirect(
    new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    "/((?!api|_next|auth|\\.well-known|favicon\\.ico|robots\\.txt|sitemap\\.xml|site\\.webmanifest).*)",
  ],
};
