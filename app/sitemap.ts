import { MetadataRoute } from "next";
import { getAllRouteSlugs } from "@/lib/routes/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://guana.app";
  const routeSlugs = getAllRouteSlugs();
  const now = new Date();

  const locales = ["en", "es"] as const;

  function localizedUrl(path: string, locale: "en" | "es"): string {
    if (locale === "en") return `${baseUrl}${path}`;
    return `${baseUrl}/es${path}`;
  }

  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of locales) {
    entries.push({
      url: locale === "en" ? baseUrl : `${baseUrl}/es`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // Routes hub
  for (const locale of locales) {
    entries.push({
      url: localizedUrl("/routes", locale),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  }

  // Individual route pages
  for (const slug of routeSlugs) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(`/routes/${slug}`, locale),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // FAQ
  for (const locale of locales) {
    entries.push({
      url: localizedUrl("/faq", locale),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Safety
  for (const locale of locales) {
    entries.push({
      url: localizedUrl("/safety", locale),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Drivers
  for (const locale of locales) {
    entries.push({
      url: localizedUrl("/drivers", locale),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // About
  for (const locale of locales) {
    entries.push({
      url: localizedUrl("/about", locale),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Support
  for (const locale of locales) {
    entries.push({
      url: localizedUrl("/support", locale),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  // Legal pages
  for (const locale of locales) {
    entries.push({
      url: localizedUrl("/legal/privacy", locale),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
    entries.push({
      url: localizedUrl("/legal/terms", locale),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    });
  }

  // Download (English only - locale-independent utility page)
  entries.push({
    url: `${baseUrl}/download`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  });

  return entries;
}
