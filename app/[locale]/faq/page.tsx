import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/json-ld";
import { SITE_URL, ROUTES } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Accordion } from "@/components/ui/Accordion";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return createMetadata({
    title: locale === "es" ? "Preguntas Frecuentes | Guana" : "FAQ | Guana",
    description:
      locale === "es"
        ? "Respuestas a las preguntas más comunes sobre viajes compartidos con Guana en Costa Rica. Pasajeros, conductores, seguridad y más."
        : "Answers to common questions about ridesharing with Guana in Costa Rica. Passengers, drivers, safety, and more.",
    path: ROUTES.faq,
    locale: locale as Locale,
  });
}

const CATEGORY_ORDER = [
  "general",
  "passengers",
  "drivers",
  "safety",
  "account",
] as const;

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const faqDict = dict.faqPage;

  // Collect all Q&A items across all categories for JSON-LD
  const allFaqItems: { question: string; answer: string }[] = [];

  for (const key of CATEGORY_ORDER) {
    const category =
      faqDict.categories[key as keyof typeof faqDict.categories];
    if (category) {
      for (const item of category.items) {
        allFaqItems.push({ question: item.q, answer: item.a });
      }
    }
  }

  const breadcrumbs = breadcrumbSchema([
    {
      name: dict.common.home,
      url: locale === "en" ? SITE_URL : `${SITE_URL}/es`,
    },
    {
      name: dict.nav.faq,
      url:
        locale === "en"
          ? `${SITE_URL}${ROUTES.faq}`
          : `${SITE_URL}/es${ROUTES.faq}`,
    },
  ]);

  const faqStructuredData = faqSchema(allFaqItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section className="section-padding">
        <Container size="narrow">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-deep sm:text-5xl">
              {faqDict.title}
            </h1>
            <p className="mt-4 text-lg text-deep/60 leading-relaxed">
              {faqDict.subtitle}
            </p>
          </div>

          <div className="mt-16 space-y-16">
            {CATEGORY_ORDER.map((key) => {
              const category =
                faqDict.categories[key as keyof typeof faqDict.categories];
              if (!category) return null;

              return (
                <div key={key}>
                  <h2 className="text-2xl font-bold text-deep">
                    {category.title}
                  </h2>
                  <div className="mt-6">
                    <Accordion
                      items={category.items.map(
                        (item: { q: string; a: string }) => ({
                          question: item.q,
                          answer: item.a,
                        }),
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
