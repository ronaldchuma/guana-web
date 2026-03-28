import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/json-ld";
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
    title: `${dict.legalTerms.title} | Guana`,
    description:
      locale === "es"
        ? "Términos de servicio de Guana. Condiciones de uso de la plataforma."
        : "Guana terms of service. Conditions for using the platform.",
    path: ROUTES.terms,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { legalTerms, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    { name: "Legal", url: `${SITE_URL}${localePath(ROUTES.terms, locale)}` },
    {
      name: legalTerms.title,
      url: `${SITE_URL}${localePath(ROUTES.terms, locale)}`,
    },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Hero */}
      <section className="pt-[120px] sm:pt-[140px] pb-14 md:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px] flex flex-col items-center text-center gap-[10px]">
          <h1
            className="font-sans font-normal text-black"
            style={{ fontSize: "clamp(2rem, 5vw, 65px)", lineHeight: 1.1 }}
          >
            {legalTerms.title}
          </h1>
          <p className="text-[18px] font-sans font-normal text-black/50 leading-[1.2]">
            {legalTerms.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 md:pb-36">
        <div className="max-w-[800px] mx-auto px-6 lg:px-[100px] flex flex-col gap-14">
          {/* Intro */}
          <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
            {legalTerms.intro}
          </p>

          {/* Sections */}
          {legalTerms.sections.map(
            (
              section: {
                title: string;
                paragraphs: string[];
                items?: string[];
                paragraphs2?: string[];
              },
              i: number,
            ) => (
              <div key={i} className="flex flex-col gap-4">
                <h2
                  className="font-sans font-normal text-black"
                  style={{
                    fontSize: "clamp(1.5rem, 3vw, 40px)",
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </h2>

                {/* Paragraphs before items */}
                {section.paragraphs.map((p: string, j: number) => (
                  <p
                    key={j}
                    className="text-[18px] font-sans font-normal text-black leading-[1.4]"
                  >
                    {p}
                  </p>
                ))}

                {/* Items list */}
                {section.items && (
                  <ul className="list-disc pl-6 flex flex-col gap-2">
                    {section.items.map((item: string, j: number) => (
                      <li
                        key={j}
                        className="text-[18px] font-sans font-normal text-black leading-[1.4]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Additional paragraphs after items */}
                {section.paragraphs2?.map((p: string, j: number) => (
                  <p
                    key={`p2-${j}`}
                    className="text-[18px] font-sans font-normal text-black leading-[1.4]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ),
          )}

          {/* Contact email link */}
          <div className="rounded-[10px] border border-black/10 bg-black/[0.03] p-5 text-[16px] font-sans font-normal text-black/60 leading-[1.4]">
            {locale === "es"
              ? "¿Preguntas sobre estos términos? Escríbenos a "
              : "Questions about these terms? Contact us at "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium underline hover:text-black/80 transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
