"use client";

import { useRef } from "react";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { useSplitTextHighlight } from "@/components/motion/use-gsap";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface HowItWorksDictionary {
  howItWorks: {
    headline: string;
    cta: string;
  };
}

interface HowItWorksProps {
  dictionary: HowItWorksDictionary;
  locale: Locale;
}

/* -------------------------------------------------------------------------- */
/*  HowItWorks — Value Proposition                                           */
/* -------------------------------------------------------------------------- */

export default function HowItWorks({ dictionary, locale }: HowItWorksProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useSplitTextHighlight(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="bg-white py-28 md:py-36 lg:py-44"
    >
      <div className="container-bar text-center">
        <p
          data-highlight-text
          className="font-heading text-fluid-h2 leading-snug text-deep"
        >
          {dictionary.howItWorks.headline}
        </p>

        <div className="mt-10 md:mt-12">
          <Button href={`/${locale}/#download`} variant="primary" size="lg">
            {dictionary.howItWorks.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
