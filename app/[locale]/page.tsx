import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { faqSchema, howToSchema } from "@/lib/seo/json-ld";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import SocialProofCards from "@/components/sections/SocialProofCards";
import HowItWorks from "@/components/sections/HowItWorks";
import RoutesPreview from "@/components/sections/RoutesPreview";
import TrustSafety from "@/components/sections/TrustSafety";
import DriversSection from "@/components/sections/DriversSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  const faqItems = Object.values(
    dict.faqPage.categories as Record<string, { items: { q: string; a: string }[] }>
  ).flatMap((cat) =>
    cat.items.map((item) => ({
      question: item.q,
      answer: item.a,
    }))
  );

  const howToSteps = dict.steps.items.map((item: { title: string; description: string }) => ({
    name: item.title,
    text: item.description,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(faqItems)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(howToSchema(
            dict.steps.title,
            dict.steps.subtitle,
            howToSteps,
          )),
        }}
      />
      <Hero
        dictionary={{ hero: dict.hero }}
        locale={locale as Locale}
      />
      <Manifesto />
      <SocialProofCards
        dictionary={{ cta: dict.cta, nav: dict.nav }}
      />
      <HowItWorks
        dictionary={{ steps: dict.steps }}
      />
      <RoutesPreview
        dictionary={{ routes: dict.routes }}
        locale={locale as Locale}
      />
      <TrustSafety
        dictionary={{ trust: dict.trust }}
      />
      <DriversSection />
      <FinalCTA
        dictionary={{ cta: dict.cta }}
      />
    </>
  );
}
