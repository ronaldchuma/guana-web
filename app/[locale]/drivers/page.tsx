import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ROUTES, APP_STORE_URL, SITE_URL } from "@/lib/tokens";
import { localePath } from "@/lib/utils";

/* ── Metadata ── */

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
        ? `${dict.driversPage.title} | Guana`
        : `${dict.driversPage.title} | Guana`,
    description: dict.driversPage.subtitle,
    path: ROUTES.drivers,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function DriversPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { driversPage, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    {
      name: dict.nav.drivers,
      url: `${SITE_URL}${localePath(ROUTES.drivers, locale)}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-ocean py-24 md:py-34">
        {/* Decorative blurred circle */}
        <div
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl"
          aria-hidden="true"
        />
        <Container size="narrow">
          <div className="relative text-center">
            <h1 className="text-display-lg md:text-display-xl font-bold text-white tracking-tight">
              {driversPage.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {driversPage.subtitle}
            </p>
            <div className="mt-10">
              <Button href={APP_STORE_URL} size="lg" variant="secondary">
                {driversPage.cta}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* How publishing works */}
      <section className="py-20 md:py-28">
        <Container size="narrow">
          <h2 className="text-center text-display-md md:text-display-lg font-bold text-deep tracking-tight">
            {driversPage.howTitle}
          </h2>

          <div className="relative mt-14">
            {/* Vertical timeline line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px bg-teal-100 hidden md:block"
              aria-hidden="true"
            />

            <ol className="space-y-10">
              {driversPage.howSteps.map(
                (
                  step: { title: string; description: string },
                  index: number,
                ) => (
                  <li key={index} className="relative flex gap-6 items-start">
                    {/* Step number */}
                    <div className="relative z-10 flex-shrink-0">
                      <Badge
                        variant="verified"
                        size="md"
                        className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold"
                        icon={
                          <span className="text-base font-bold">
                            {index + 1}
                          </span>
                        }
                      >
                        {""}
                      </Badge>
                    </div>

                    {/* Step content */}
                    <div className="pt-1">
                      <h3 className="text-lg font-bold text-deep">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 text-base text-deep/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="bg-cream-light py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {driversPage.benefits.map(
              (
                benefit: { title: string; description: string },
                index: number,
              ) => (
                <Card key={index} hover className="p-8">
                  <h3 className="text-lg font-bold text-deep">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base text-deep/60 leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-jungle py-20 md:py-28">
        <div
          className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden="true"
        />
        <Container size="narrow">
          <div className="relative text-center">
            <h2 className="text-display-md md:text-display-lg font-bold text-white tracking-tight">
              {dict.cta.title}
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-lg mx-auto">
              {dict.cta.subtitle}
            </p>
            <div className="mt-8">
              <Button href={APP_STORE_URL} size="lg" variant="secondary">
                {driversPage.cta}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
