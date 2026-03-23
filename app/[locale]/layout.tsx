import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { i18n, isValidLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { organizationSchema, webSiteSchema, softwareApplicationSchema } from "@/lib/seo/json-ld";
import { LazyScrollPath } from "@/components/motion/LazyScrollPath";

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = await getDictionary(locale as Locale);

  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical:
        locale === "es" ? "https://guana.app" : `https://guana.app/en`,
      languages: {
        es: "https://guana.app",
        en: "https://guana.app/en",
        "x-default": "https://guana.app",
      },
    },
    openGraph: {
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      locale: locale === "es" ? "es_CR" : "en_US",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <>
      {locale !== "es" && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.lang="${locale}"`,
          }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema()),
        }}
      />
      <div className="relative isolate">
        <LazyScrollPath />
        <Header locale={locale} dictionary={{ nav: dict.nav }} />
        <main id="main-content">{children}</main>
        <Footer
          locale={locale}
          dictionary={{
            nav: dict.nav,
            footer: dict.footer,
          }}
        />
      </div>
    </>
  );
}
