import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createRouteMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/json-ld";
import {
  routes,
  getRouteBySlug,
  getAllRouteSlugs,
  getRouteLocalized,
} from "@/lib/routes/data";
import { SITE_URL, APP_STORE_URL, ROUTES } from "@/lib/tokens";
import { localePath } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Accordion } from "@/components/ui/Accordion";
import { RouteCard } from "@/components/ui/RouteCard";

export async function generateStaticParams() {
  const slugs = getAllRouteSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of i18n.locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};

  return createRouteMetadata(route, locale as Locale);
}

function DistanceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433a19.695 19.695 0 0 0 2.683-2.007c1.984-1.764 4.065-4.544 4.065-8.342A8.12 8.12 0 0 0 10 0 8.12 8.12 0 0 0 1.88 8c0 3.798 2.08 6.578 4.065 8.342a19.695 19.695 0 0 0 2.683 2.007 14.21 14.21 0 0 0 .757.433l.281.14.018.008.006.003ZM10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.798 7.45c.512-.67 1.135-.95 1.702-.95s1.19.28 1.702.95a.75.75 0 0 0 1.196-.91C12.637 5.55 11.5 5 10.5 5s-2.137.55-2.898 1.54A4.489 4.489 0 0 0 6.5 9.5c0 1.152.398 2.18 1.102 2.96C8.363 13.45 9.5 14 10.5 14s2.137-.55 2.898-1.54a.75.75 0 0 0-1.196-.91c-.512.67-1.135.95-1.702.95s-1.19-.28-1.702-.95A2.989 2.989 0 0 1 8 9.5c0-.766.259-1.508.798-2.05Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const route = getRouteBySlug(slug);

  if (!route) {
    notFound();
  }

  const dict = await getDictionary(locale as Locale);
  const localized = getRouteLocalized(route, locale as Locale);

  const routeName = `${localized.originName} ${locale === "es" ? "a" : "to"} ${localized.destinationName}`;

  // Split description into snippet (first paragraph) and full body
  const descriptionParts = localized.description.split("\n\n");
  const snippet = descriptionParts[0];
  const fullDescription = descriptionParts.slice(1).join("\n\n");

  // Build "How to book" steps with origin/destination substitution
  const howToBookSteps = dict.routeDetail.howToBookSteps.map((step: string) =>
    step
      .replace("{origin}", localized.originName)
      .replace("{destination}", localized.destinationName),
  );

  // Related routes
  const relatedRoutes = route.related
    .map((relSlug) => routes.find((r) => r.slug === relSlug))
    .filter(Boolean);

  // JSON-LD
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
    {
      name: routeName,
      url:
        locale === "en"
          ? `${SITE_URL}/routes/${route.slug}`
          : `${SITE_URL}/es/routes/${route.slug}`,
    },
  ]);

  const faqStructuredData = faqSchema(
    localized.faq.map((item) => ({
      question: item.q,
      answer: item.a,
    })),
  );

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

      {/* Hero header */}
      <section className="bg-gradient-to-b from-cream to-white section-padding">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href={localePath(ROUTES.routes, locale)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                  clipRule="evenodd"
                />
              </svg>
              {dict.common.backToRoutes}
            </Link>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-deep sm:text-5xl">
              {routeName}
            </h1>

            {/* Snippet paragraph - optimized for search snippets */}
            <p className="mt-6 text-lg text-deep/70 leading-relaxed">
              {snippet}
            </p>

            {/* Metadata chips */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Chip icon={<DistanceIcon />}>
                {dict.routes.distance}: {route.distance}
              </Chip>
              <Chip icon={<ClockIcon />}>
                {dict.routes.duration}: {route.duration}
              </Chip>
              <Chip icon={<PriceIcon />}>
                {dict.routes.price}: {route.price}
              </Chip>
            </div>
          </div>
        </Container>
      </section>

      {/* Full description */}
      {fullDescription && (
        <section className="section-padding">
          <Container size="narrow">
            <h2 className="text-2xl font-bold text-deep">
              {dict.routeDetail.aboutRoute}
            </h2>
            <div className="mt-4 space-y-4 text-deep/70 leading-relaxed">
              {fullDescription.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Highlights */}
            {localized.highlights.length > 0 && (
              <ul className="mt-8 space-y-3" role="list">
                {localized.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-deep/70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </section>
      )}

      {/* How to book */}
      <section className="section-padding bg-cream/50">
        <Container size="narrow">
          <h2 className="text-2xl font-bold text-deep">
            {dict.routeDetail.howToBook}
          </h2>
          <ol className="mt-8 space-y-6" role="list">
            {howToBookSteps.map((step: string, i: number) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <span className="pt-1 text-deep/70 leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      {localized.faq.length > 0 && (
        <section className="section-padding">
          <Container size="narrow">
            <h2 className="text-2xl font-bold text-deep">
              {dict.routeDetail.faqTitle}
            </h2>
            <div className="mt-6">
              <Accordion
                items={localized.faq.map((item) => ({
                  question: item.q,
                  answer: item.a,
                }))}
              />
            </div>
          </Container>
        </section>
      )}

      {/* Related routes */}
      {relatedRoutes.length > 0 && (
        <section className="section-padding bg-cream/50">
          <Container>
            <h2 className="text-2xl font-bold text-deep">
              {dict.routeDetail.relatedRoutes}
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedRoutes.map((related) => (
                <RouteCard
                  key={related!.slug}
                  route={related!}
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
      )}

      {/* CTA */}
      <section className="section-padding">
        <Container size="narrow">
          <div className="rounded-2xl bg-gradient-to-br from-teal to-teal-600 px-8 py-12 text-center text-white sm:px-12">
            <h2 className="text-2xl font-bold sm:text-3xl">
              {dict.routeDetail.downloadCta}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-white/80">
              {dict.cta.subtitle}
            </p>
            <div className="mt-8">
              <Button
                href={APP_STORE_URL}
                variant="secondary"
                size="lg"
              >
                {dict.cta.download}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
