import { NextRequest, NextResponse } from "next/server";
import { i18n } from "@/lib/i18n/config";

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (i18n.locales.includes(maybeLocale as any)) {
    return maybeLocale;
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, API routes, and well-known paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/.well-known") ||
    pathname.startsWith("/auth") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameLocale = getLocaleFromPath(pathname);
  if (pathnameLocale) {
    return NextResponse.next();
  }

  // For paths without locale, rewrite to default locale (en)
  // This keeps URLs clean: / -> internally routes to /en
  const url = request.nextUrl.clone();
  url.pathname = `/${i18n.defaultLocale}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|auth|\\.well-known|.*\\.).*)"],
};
