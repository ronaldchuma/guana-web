import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import type { RouteData } from "@/lib/routes/data";
import { getRouteLocalized } from "@/lib/routes/data";

const BASE_URL = "https://guana.app";

const APP_ID = "6740594867"; // Apple App Store ID for Guana

/**
 * Build a canonical URL for the given path and locale.
 * English paths have no prefix; Spanish paths are prefixed with /es.
 */
function buildUrl(path: string, locale: Locale): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === "es") {
    return `${BASE_URL}/es${normalizedPath}`;
  }
  return `${BASE_URL}${normalizedPath}`;
}

/**
 * Create a complete Next.js Metadata object with Open Graph, Twitter,
 * alternate-language links, and Apple smart-app-banner meta.
 */
export function createMetadata({
  title,
  description,
  path,
  locale,
  image,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  image?: string;
}): Metadata {
  const canonicalUrl = buildUrl(path, locale);
  const alternateLocale = locale === "en" ? "es" : "en";
  const alternateUrl = buildUrl(path, alternateLocale);

  const ogImage = image ?? `${BASE_URL}/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: buildUrl(path, "en"),
        es: buildUrl(path, "es"),
        "x-default": buildUrl(path, "en"),
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Guana",
      locale: locale === "es" ? "es_CR" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_CR",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    other: {
      "apple-itunes-app": `app-id=${APP_ID}`,
    },
  };
}

/**
 * Create metadata specifically for a route page.
 * Generates a descriptive title and pulls the localized route description.
 */
export function createRouteMetadata(
  route: RouteData,
  locale: Locale,
): Metadata {
  const localized = getRouteLocalized(route, locale);

  const title =
    locale === "es"
      ? `${localized.originName} a ${localized.destinationName} | Viaje compartido | Guana`
      : `${localized.originName} to ${localized.destinationName} | Shared Ride | Guana`;

  const description =
    locale === "es"
      ? `Viaje compartido de ${localized.originName} a ${localized.destinationName} (${route.distance}, ~${route.duration}) desde ${route.price}. Reserva tu lugar con Guana.`
      : `Shared ride from ${localized.originName} to ${localized.destinationName} (${route.distance}, ~${route.duration}) from ${route.price}. Book your seat with Guana.`;

  const path = `/routes/${route.slug}`;

  return createMetadata({
    title,
    description,
    path,
    locale,
    image: route.image
      ? `${BASE_URL}${route.image}`
      : undefined,
  });
}
