import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/json-ld";
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
    title: `${dict.helpCenter.title} | Guana`,
    description:
      locale === "es"
        ? "Centro de ayuda de Guana. Aprende a crear tu cuenta, publicar viajes, reservar asientos y más."
        : "Guana help center. Learn how to create your account, publish trips, book seats, and more.",
    path: ROUTES.help,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function HelpCenterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { helpCenter, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    {
      name: helpCenter.title,
      url: `${SITE_URL}${localePath(ROUTES.help, locale)}`,
    },
  ]);

  /* Flatten all FAQ items for structured data */
  const allItems = Object.values(
    helpCenter.categories as Record<
      string,
      { title: string; items: { q: string; a: string }[] }
    >,
  ).flatMap((cat) => cat.items);

  const faqLd = faqSchema(allItems);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Hero */}
      <section className="pt-[120px] sm:pt-[140px] pb-14 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px] flex flex-col items-center text-center gap-[10px]">
          <h1
            className="font-sans font-normal text-black"
            style={{ fontSize: "clamp(2rem, 5vw, 65px)", lineHeight: 1.1 }}
          >
            {helpCenter.title}
          </h1>
          <p className="text-[18px] font-sans font-normal text-black/50 leading-[1.2]">
            {helpCenter.subtitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 md:pb-36">
        <div className="max-w-[800px] mx-auto px-6 lg:px-[100px] flex flex-col gap-16">
          {Object.entries(
            helpCenter.categories as Record<
              string,
              { title: string; items: { q: string; a: string }[] }
            >,
          ).map(([key, category]) => (
            <div key={key} className="flex flex-col gap-8">
              <h2
                className="font-sans font-normal text-black"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 40px)",
                  lineHeight: 1.2,
                }}
              >
                {category.title}
              </h2>

              <div className="flex flex-col gap-6">
                {category.items.map(
                  (item: { q: string; a: string }, i: number) => (
                    <details
                      key={i}
                      className="group rounded-[10px] border border-black/10 bg-black/[0.02] overflow-hidden"
                    >
                      <summary className="cursor-pointer select-none p-5 text-[18px] font-sans font-medium text-black leading-[1.3] flex items-center justify-between gap-4 hover:bg-black/[0.03] transition-colors">
                        {item.q}
                        <span className="shrink-0 text-black/30 text-[24px] leading-none group-open:rotate-45 transition-transform">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-5">
                        <p className="text-[16px] font-sans font-normal text-black/70 leading-[1.5]">
                          {item.a}
                        </p>
                      </div>
                    </details>
                  ),
                )}
              </div>
            </div>
          ))}

          {/* Contact support */}
          <div className="rounded-[10px] border border-black/10 bg-black/[0.03] p-5 flex flex-col gap-2">
            <p className="text-[16px] font-sans font-medium text-black leading-[1.4]">
              {locale === "es"
                ? "¿No encontraste lo que buscabas?"
                : "Didn't find what you were looking for?"}
            </p>
            <p className="text-[16px] font-sans font-normal text-black/60 leading-[1.4]">
              {locale === "es"
                ? "Escríbenos a "
                : "Contact us at "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium underline hover:text-black/80 transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
              {locale === "es"
                ? " y te responderemos dentro de 48 horas."
                : " and we'll get back to you within 48 hours."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
