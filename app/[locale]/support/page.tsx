import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { ContactForm } from "@/components/support/ContactForm";
import { ROUTES, CONTACT_EMAIL, SITE_URL } from "@/lib/tokens";
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
        ? `${dict.supportPage.title} | Guana`
        : `${dict.supportPage.title} | Guana`,
    description: dict.supportPage.subtitle,
    path: ROUTES.support,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { supportPage, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    {
      name: dict.nav.support,
      url: `${SITE_URL}${localePath(ROUTES.support, locale)}`,
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
              {supportPage.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-deep/60 max-w-2xl mx-auto leading-relaxed">
              {supportPage.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form + Email */}
      <section className="py-20 md:py-28">
        <Container size="narrow">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Form */}
            <div className="md:col-span-3">
              <Card className="p-8 md:p-10">
                <ContactForm labels={supportPage.form} />
              </Card>
            </div>

            {/* Sidebar */}
            <aside className="md:col-span-2">
              <div className="sticky top-8 space-y-8">
                {/* Email contact */}
                <div>
                  <h2 className="text-sm font-semibold uppercase tracking-overline text-deep/40">
                    {supportPage.emailLabel}
                  </h2>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-teal hover:text-teal-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                      aria-hidden="true"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
