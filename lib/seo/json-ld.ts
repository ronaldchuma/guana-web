const BASE_URL = "https://guana.app";

/**
 * Organization schema for Guana.
 * Renders as a <script type="application/ld+json"> in the document head.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Guana",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
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
 *
 * @param items - Ordered array of breadcrumb items, each with a name and
 *                absolute URL. The last item is treated as the current page.
 *
 * @example
 * breadcrumbSchema([
 *   { name: "Home", url: "https://guana.app" },
 *   { name: "Routes", url: "https://guana.app/routes" },
 *   { name: "San José to Jacó", url: "https://guana.app/routes/san-jose-jaco" },
 * ])
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
 * FAQPage schema for rendering FAQ rich results in search engines.
 *
 * @param items - Array of question/answer pairs.
 *
 * @example
 * faqSchema([
 *   { question: "How long is the drive?", answer: "About 1.5 hours." },
 * ])
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
