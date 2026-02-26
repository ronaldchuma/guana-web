import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
        ? `${dict.aboutPage.title} | Guana`
        : `${dict.aboutPage.title} | Guana`,
    description: dict.aboutPage.subtitle,
    path: ROUTES.about,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { aboutPage, common, cta } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    {
      name: dict.nav.about,
      url: `${SITE_URL}${localePath(ROUTES.about, locale)}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="bg-cream-light py-20 md:py-28">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="text-display-lg md:text-display-xl font-bold text-deep tracking-tight">
              {aboutPage.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-deep/60 max-w-2xl mx-auto leading-relaxed">
              {aboutPage.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28">
        <Container size="narrow">
          <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
            {aboutPage.mission.title}
          </h2>
          <div className="mt-8 space-y-6">
            {aboutPage.mission.description
              .split("\n")
              .filter((p: string) => p.trim() !== "")
              .map((paragraph: string, index: number) => (
                <p
                  key={index}
                  className="text-base md:text-lg text-deep/60 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cream-light py-20 md:py-28">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            {aboutPage.values.map(
              (
                value: { title: string; description: string },
                index: number,
              ) => (
                <Card key={index} hover className="p-8">
                  <h3 className="text-lg font-bold text-deep">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base text-deep/60 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              ),
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-display-md md:text-display-lg font-bold text-deep tracking-tight">
              {cta.title}
            </h2>
            <p className="mt-4 text-lg text-deep/60 max-w-lg mx-auto">
              {cta.subtitle}
            </p>
            <div className="mt-8">
              <Button href={APP_STORE_URL} size="lg">
                {cta.download}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
