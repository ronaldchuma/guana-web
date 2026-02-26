import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ROUTES, APP_STORE_URL, SITE_URL } from "@/lib/tokens";
import { localePath } from "@/lib/utils";

/* ── Inline SVG Icons ── */

function ShieldIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-teal"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-teal"
      aria-hidden="true"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-3.4-4.3a2 2 0 0 0-1.6-.7H7a2 2 0 0 0-1.6.7L2 10l-1.5 1.1C.2 11.3 0 12.1 0 13v3c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}

function CheckBadgeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-teal"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-teal"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-teal"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-teal"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8 text-teal"
      aria-hidden="true"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const SECTION_ICONS = [
  ShieldIcon,
  CarIcon,
  CheckBadgeIcon,
  ChatIcon,
  StarIcon,
  LockIcon,
  UsersIcon,
];

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
        ? `${dict.safetyPage.title} | Guana`
        : `${dict.safetyPage.title} | Guana`,
    description: dict.safetyPage.subtitle,
    path: ROUTES.safety,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function SafetyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { safetyPage, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    {
      name: dict.nav.safety,
      url: `${SITE_URL}${localePath(ROUTES.safety, locale)}`,
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
              {safetyPage.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-deep/60 max-w-2xl mx-auto leading-relaxed">
              {safetyPage.subtitle}
            </p>
          </div>
        </Container>
      </section>

      {/* Safety Sections */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="space-y-16 md:space-y-24">
            {safetyPage.sections.map(
              (
                section: { title: string; description: string },
                index: number,
              ) => {
                const Icon = SECTION_ICONS[index] ?? ShieldIcon;
                const isReversed = index % 2 !== 0;

                return (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 ${
                      isReversed ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Icon area */}
                    <div className="flex-shrink-0">
                      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-50">
                        <Icon />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-display-sm md:text-display-md font-bold text-deep tracking-tight">
                        {section.title}
                      </h2>
                      <p className="mt-4 text-base md:text-lg text-deep/60 leading-relaxed max-w-xl">
                        {section.description}
                      </p>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-cream py-20 md:py-28">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="text-display-md md:text-display-lg font-bold text-deep tracking-tight">
              {dict.cta.title}
            </h2>
            <p className="mt-4 text-lg text-deep/60 max-w-lg mx-auto">
              {dict.cta.subtitle}
            </p>
            <div className="mt-8">
              <Button href={APP_STORE_URL} size="lg">
                {dict.cta.download}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
