const BASE_URL = "https://guana.app";

/**
 * Organization schema for Guana.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Guana",
    url: BASE_URL,
    logo: "https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/guana-logo.png",
    description:
      "Guana is a ridesharing platform connecting travelers across Costa Rica with affordable, social, and sustainable shared rides.",
    foundingDate: "2024",
    areaServed: {
      "@type": "Country",
      name: "Costa Rica",
    },
    sameAs: [
      "https://www.instagram.com/guana.app",
      "https://www.facebook.com/guana.app",
      "https://www.tiktok.com/@guana.app",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@guana.app",
      availableLanguage: ["English", "Spanish"],
    },
  };
}

/**
 * BreadcrumbList schema for structured navigation breadcrumbs.
 */
export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * SoftwareApplication schema for the Guana iOS app.
 */
export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Guana",
    operatingSystem: "iOS",
    applicationCategory: "TravelApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Costa Rica's ridesharing app. Find or offer shared rides between cities and beach destinations.",
    url: BASE_URL,
    downloadUrl: "https://apps.apple.com/app/guana/id6504720981",
  };
}

/**
 * FAQPage schema — helps answer engines surface Q&A directly.
 */
export function faqSchema(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * HowTo schema for step-by-step processes.
 */
export function howToSchema(
  name: string,
  description: string,
  steps: { name: string; text: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

/**
 * WebSite schema for sitelinks.
 */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Guana",
    url: BASE_URL,
    description:
      "Find affordable shared rides between Costa Rica's cities and surf destinations.",
    inLanguage: ["en", "es"],
  };
}
