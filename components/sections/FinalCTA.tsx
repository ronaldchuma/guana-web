"use client";

import { useRef } from "react";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/utils";
import { APP_STORE_URL, ROUTES } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useSectionReveal } from "@/components/motion/use-gsap";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface CTADictionary {
  cta: {
    title: string;
    subtitle: string;
    download: string;
    drivers: string;
    driversLink: string;
  };
}

interface FinalCTAProps {
  dictionary: CTADictionary;
  locale: Locale;
}

/* -------------------------------------------------------------------------- */
/*  FinalCTA                                                                  */
/* -------------------------------------------------------------------------- */

export default function FinalCTA({ dictionary, locale }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, { stagger: 0.12, y: 24 });

  const { cta } = dictionary;

  return (
    <section
      ref={sectionRef}
      aria-label={cta.title}
      className="bg-white py-28 md:py-36 lg:py-44"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2
            data-reveal
            className="font-heading u-text-display font-bold text-deep"
          >
            {cta.title}
          </h2>

          <p
            data-reveal
            className="mt-6 u-text-large leading-relaxed text-deep/60"
          >
            {cta.subtitle}
          </p>

          <div
            data-reveal
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              href={APP_STORE_URL}
              size="lg"
            >
              {cta.download}
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </Button>

            <Button
              href={localePath(ROUTES.drivers, locale)}
              size="lg"
              variant="outline"
            >
              {cta.driversLink}
            </Button>
          </div>

          <p
            data-reveal
            className="mt-8 text-sm text-deep/40"
          >
            {cta.drivers}
          </p>
        </div>
      </Container>
    </section>
  );
}
