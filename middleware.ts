import { NextRequest, NextResponse } from "next/server";

const DEFAULT_LOCALE = "en";
const LOCALES = ["en", "es"];

function getLocaleFromPath(pathname: string): string | null {
  const maybeLocale = pathname.split("/")[1];
  return LOCALES.includes(maybeLocale) ? maybeLocale : null;
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
  if (getLocaleFromPath(pathname)) {
    return NextResponse.next();
  }

  // For paths without locale, rewrite to default locale (en)
  // This keeps URLs clean: / -> internally routes to /en
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next|api|auth|\\.well-known|.*\\.).*)"],
};
