import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Steps from "@/components/sections/Steps";
import Features from "@/components/sections/Features";
import RoutesPreview from "@/components/sections/RoutesPreview";
import TrustSafety from "@/components/sections/TrustSafety";
import FinalCTA from "@/components/sections/FinalCTA";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale as Locale);

  return (
    <>
      <Hero
        dictionary={{ hero: dict.hero, common: dict.common }}
        locale={locale as Locale}
      />
      <HowItWorks
        dictionary={{ howItWorks: dict.howItWorks }}
        locale={locale as Locale}
      />
      <Steps dictionary={{ steps: dict.steps }} />
      <Features dictionary={{ features: dict.features }} />
      <RoutesPreview dictionary={{ routes: dict.routes }} locale={locale as Locale} />
      <TrustSafety dictionary={{ trust: dict.trust }} />
      <FinalCTA dictionary={{ cta: dict.cta }} locale={locale as Locale} />
    </>
  );
}
