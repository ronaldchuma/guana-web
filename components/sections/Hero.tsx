import Image from "next/image";
import { MEDIA } from "@/lib/media";

import type { Locale } from "@/lib/i18n/config";
import WaitlistForm from "@/components/ui/WaitlistForm";

// ── Hero ───────────────────────────────────────────────────────────────────

interface HeroProps {
  dictionary: {
    hero: {
      title: string;
      titlePrefix: string;
      titleWords: string[];
      subtitle: string;
      cta: string;
      appScreenshotAlt: string;
    };
    waitlistForm: {
      emailLabel: string;
      placeholder: string;
      submit: string;
      submitStacked: string;
      loading: string;
      error: string;
      disclaimer: string;
      successTitle: string;
      successMessage: string;
    };
  };
  locale: Locale;
}

export default function Hero({ dictionary }: HeroProps) {
  const { hero } = dictionary;
  const currentWord = hero.titleWords?.[0] ?? "";

  return (
    <section
      id="top"
      className="relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px] pt-[80px] sm:pt-[100px] lg:pt-[136px] pb-0">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">

          {/* ── Left: Headline + CTA ── */}
          <div className="flex flex-col gap-[24px] sm:gap-[30px] items-center lg:items-start text-center lg:text-left w-full lg:w-[595px] shrink-0 pt-[30px] sm:pt-[50px] lg:pt-[130px] pb-[20px] lg:pb-[70px]">

            {/* H1 */}
            <h1
              className="flex flex-col gap-0 font-sans font-normal text-black"
              style={{ fontSize: "clamp(2rem, 5vw, 65px)", lineHeight: 1.1 }}
            >
              <span className="block">{hero.title}</span>
              <span className="block">
                {hero.titlePrefix}{" "}
                <span className="bg-gradient-to-r from-[#ff3126] to-[#fc6b3e] bg-clip-text text-transparent">{currentWord}</span>
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[16px] sm:text-[18px] font-sans font-normal text-black leading-[1.3] max-w-[440px]">
              {hero.subtitle}
            </p>

            {/* Waitlist form */}
            <WaitlistForm variant="inline" dictionary={dictionary.waitlistForm} />

            {/* ── Mobile/Tablet: Phone mockup ── */}
            <div className="lg:hidden flex justify-center w-full" aria-hidden="true">
              <div className="relative w-[220px] h-[451px] sm:w-[294px] sm:h-[604px]">
                <Image
                  src={MEDIA.appMockup}
                  alt={hero.appScreenshotAlt}
                  fill
                  priority
                  fetchPriority="high"
                  className="object-contain"
                  sizes="(min-width: 640px) 294px, 220px"
                />
              </div>
            </div>
          </div>

          {/* ── Right: Phone mockup (desktop) ── */}
          <div className="hidden lg:block relative flex-1 min-h-[670px]" aria-hidden="true">
            <div className="absolute top-0 right-0 w-[294px] h-[604px] z-10">
              <Image
                src={MEDIA.appMockup}
                alt={hero.appScreenshotAlt}
                fill
                className="object-contain object-top"
                sizes="294px"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
