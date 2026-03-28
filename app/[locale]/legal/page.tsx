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
    title: `${dict.legalNotice.title} | Guana`,
    description:
      locale === "es"
        ? "Aviso legal de Guana. Información del desarrollador, propiedad intelectual y descargos de responsabilidad."
        : "Guana legal notice. Developer information, intellectual property, and disclaimers.",
    path: ROUTES.legal,
    locale: locale as Locale,
  });
}

/* ── Page ── */

export default async function LegalNoticePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);
  const { legalNotice, common } = dict;

  const breadcrumbs = breadcrumbSchema([
    { name: common.home, url: `${SITE_URL}${localePath(ROUTES.home, locale)}` },
    {
      name: legalNotice.title,
      url: `${SITE_URL}${localePath(ROUTES.legal, locale)}`,
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
            {legalNotice.title}
          </h1>
          <p className="text-[18px] font-sans font-normal text-black/50 leading-[1.2]">
            {legalNotice.lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-28 md:pb-36">
        <div className="max-w-[800px] mx-auto px-6 lg:px-[100px] flex flex-col gap-14">
          {/* Intro */}
          <p className="text-[18px] font-sans font-normal text-black leading-[1.4]">
            {legalNotice.intro}
          </p>

          {/* Sections */}
          {legalNotice.sections.map(
            (
              section: {
                title: string;
                paragraphs: string[];
                items?: string[];
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

                {section.paragraphs.map((p: string, j: number) => (
                  <p
                    key={j}
                    className="text-[18px] font-sans font-normal text-black leading-[1.4]"
                  >
                    {p}
                  </p>
                ))}

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
              </div>
            ),
          )}

          {/* Related legal links */}
          <div className="rounded-[10px] border border-black/10 bg-black/[0.03] p-5 flex flex-col gap-2">
            <p className="text-[16px] font-sans font-medium text-black/60 leading-[1.4]">
              {locale === "es" ? "Documentos relacionados" : "Related documents"}
            </p>
            <div className="flex flex-col gap-1">
              <a
                href={localePath(ROUTES.privacy, locale)}
                className="text-[16px] font-sans font-normal text-black/60 underline hover:text-black/80 transition-colors leading-[1.4]"
              >
                {dict.legalPrivacy.title}
              </a>
              <a
                href={localePath(ROUTES.terms, locale)}
                className="text-[16px] font-sans font-normal text-black/60 underline hover:text-black/80 transition-colors leading-[1.4]"
              >
                {dict.legalTerms.title}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
