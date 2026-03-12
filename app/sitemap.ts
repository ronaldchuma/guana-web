import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://guana.app";
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

  return entries;
}
