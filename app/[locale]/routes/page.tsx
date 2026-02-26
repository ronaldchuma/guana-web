import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { routes } from "@/lib/routes/data";
import { SITE_URL, ROUTES } from "@/lib/tokens";
import { localePath } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { RouteCard } from "@/components/ui/RouteCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return createMetadata({
    title:
      locale === "es"
        ? "Rutas Populares | Guana"
        : "Popular Routes | Guana",
    description:
      locale === "es"
        ? "Encuentra viajes compartidos en las rutas más populares de Costa Rica. San José a Jacó, Tamarindo, Santa Teresa, Nosara y más."
        : "Find shared rides on Costa Rica's most popular routes. San José to Jacó, Tamarindo, Santa Teresa, Nosara, and more.",
    path: ROUTES.routes,
    locale: locale as Locale,
  });
}

export default async function RoutesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const breadcrumbs = breadcrumbSchema([
    {
      name: dict.common.home,
      url: locale === "en" ? SITE_URL : `${SITE_URL}/es`,
    },
    {
      name: dict.nav.routes,
      url:
        locale === "en"
          ? `${SITE_URL}${ROUTES.routes}`
          : `${SITE_URL}/es${ROUTES.routes}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="section-padding">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-deep sm:text-5xl">
              {dict.routes.title}
            </h1>
            <p className="mt-4 text-lg text-deep/60 leading-relaxed">
              {dict.routes.subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <RouteCard
                key={route.slug}
                route={route}
                locale={locale as Locale}
                dictionary={{
                  cta: dict.routes.cta,
                  distance: dict.routes.distance,
                  duration: dict.routes.duration,
                  price: dict.routes.price,
                }}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
