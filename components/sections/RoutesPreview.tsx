"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import type { Locale } from "@/lib/i18n/config";
import { localePath } from "@/lib/utils";
import { ROUTES } from "@/lib/tokens";
import { routes, type RouteData } from "@/lib/routes/data";
import { MEDIA } from "@/lib/media";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useSectionReveal } from "@/components/motion/use-gsap";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface RoutesDictionary {
  routes: {
    title: string;
    subtitle: string;
    cta: string;
    ctaAll: string;
    distance: string;
    duration: string;
    price: string;
    perPerson: string;
  };
}

interface RoutesPreviewProps {
  dictionary: RoutesDictionary;
  locale: Locale;
}

/* -------------------------------------------------------------------------- */
/*  Gradient fallbacks for cards without images                               */
/* -------------------------------------------------------------------------- */

const CARD_GRADIENTS = [
  "linear-gradient(145deg, #0D7C66 0%, #2E6DB4 100%)",
  "linear-gradient(145deg, #2D8B4E 0%, #0D7C66 100%)",
  "linear-gradient(145deg, #2E6DB4 0%, #1E5593 100%)",
  "linear-gradient(145deg, #E2813B 0%, #D45D4C 100%)",
  "linear-gradient(145deg, #0D7C66 0%, #2D8B4E 100%)",
  "linear-gradient(145deg, #1E5593 0%, #0D7C66 100%)",
  "linear-gradient(145deg, #D45D4C 0%, #E2813B 100%)",
  "linear-gradient(145deg, #2D8B4E 0%, #2E6DB4 100%)",
];

/* -------------------------------------------------------------------------- */
/*  Arrow icon (top-right of each card)                                       */
/* -------------------------------------------------------------------------- */

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*  MarqueeRouteCard                                                          */
/* -------------------------------------------------------------------------- */

interface MarqueeRouteCardProps {
  route: RouteData;
  locale: Locale;
  index: number;
  priceLabel: string;
  perPerson: string;
  imageUrl: string;
}

function MarqueeRouteCard({ route, locale, index, priceLabel, perPerson, imageUrl }: MarqueeRouteCardProps) {
  const origin = route.origin[locale];
  const destination = route.destination[locale];
  const href = localePath(`/routes/${route.slug}`, locale);
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <Link
      href={href}
      className="group relative flex-shrink-0 block w-[260px] sm:w-[280px] md:w-[300px] overflow-hidden rounded-3xl"
      style={{ aspectRatio: "3 / 4" }}
    >
      {/* Background image with gradient fallback */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
        style={{
          background: `url(${imageUrl}) center/cover no-repeat, ${gradient}`,
        }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {/* Arrow button */}
      <div className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-deep transition-all duration-500 ease-out group-hover:scale-110 group-hover:rotate-12">
        <ArrowUpRight className="h-5 w-5" />
      </div>

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-5 sm:p-6">
        <h3 className="font-heading text-lg font-bold text-white sm:text-xl leading-tight">
          {origin}
        </h3>
        <svg className="my-1 h-4 w-4 text-white/50" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 2v10m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className="font-heading text-lg font-bold text-white sm:text-xl leading-tight">
          {destination}
        </p>
        <div className="mt-2">
          <p className="text-xs font-medium uppercase tracking-widest text-white/60">
            {priceLabel}
          </p>
          <p className="text-sm text-white/80">
            <span className="text-lg font-bold text-white">{route.price}</span>
            <span className="text-white/50">/ {perPerson}</span>
          </p>
        </div>
      </div>

      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-white/25" />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  useMarquee — GSAP-powered infinite horizontal scroll with Observer        */
/* -------------------------------------------------------------------------- */

function useMarquee(
  componentRef: React.RefObject<HTMLElement | null>,
  prefersReducedMotion: boolean,
) {
  useEffect(() => {
    const component = componentRef.current;
    if (!component || prefersReducedMotion) return;

    const panels = component.querySelectorAll<HTMLElement>(".marquee-panel");
    if (!panels.length) return;

    const speed = 40;
    const timeScale = { value: 1 };
    let direction = 1;

    const tl = gsap.timeline({
      repeat: -1,
      onReverseComplete() {
        tl.progress(1);
      },
      overwrite: true,
    });

    tl.fromTo(
      panels,
      { xPercent: 0 },
      {
        xPercent: -100,
        duration: Math.max(800, panels[0].offsetWidth) / speed,
        ease: "none",
      },
    );

    const observer = Observer.create({
      target: component,
      type: "pointer,touch",
      onChangeX(self) {
        let v = self.velocityX * -0.01;
        v = gsap.utils.clamp(-30, 30, v);
        direction = v < 0 ? -1 : 1;

        const tl2 = gsap.timeline({
          onUpdate: () => { tl.timeScale(timeScale.value); },
        });
        tl2.to(timeScale, { value: v, duration: 0.1 });
        tl2.to(timeScale, { value: direction * 1, duration: 1 });
      },
    });

    // Pause on hover
    const handleEnter = () => {
      gsap.to(timeScale, {
        value: 0.3 * direction,
        duration: 0.8,
        overwrite: true,
        onUpdate: () => { tl.timeScale(timeScale.value); },
      });
    };
    const handleLeave = () => {
      gsap.to(timeScale, {
        value: 1 * direction,
        duration: 0.8,
        overwrite: true,
        onUpdate: () => { tl.timeScale(timeScale.value); },
      });
    };

    component.addEventListener("mouseenter", handleEnter);
    component.addEventListener("mouseleave", handleLeave);

    return () => {
      observer.kill();
      tl.kill();
      component.removeEventListener("mouseenter", handleEnter);
      component.removeEventListener("mouseleave", handleLeave);
    };
  }, [componentRef, prefersReducedMotion]);
}

/* -------------------------------------------------------------------------- */
/*  RoutesPreview                                                             */
/* -------------------------------------------------------------------------- */

export default function RoutesPreview({
  dictionary,
  locale,
}: RoutesPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useSectionReveal(sectionRef, { stagger: 0.08 });
  useMarquee(marqueeRef, prefersReducedMotion);

  const { routes: dict } = dictionary;

  const momentImages = MEDIA.moments;
  const cards = routes.map((route, i) => (
    <MarqueeRouteCard
      key={route.slug}
      route={route}
      locale={locale}
      index={i}
      priceLabel={dict.price}
      perPerson={dict.perPerson}
      imageUrl={momentImages[i % momentImages.length]}
    />
  ));

  return (
    <section
      ref={sectionRef}
      aria-label={dict.title}
      className="bg-white py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* ── Section header ───────────────────────────────────────── */}
      <Container>
        <div data-reveal className="mx-auto mb-16 max-w-2xl text-center md:mb-20">
          <h2 className="text-display-lg font-bold text-deep md:text-display-xl">
            {dict.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-deep/60 md:text-lg">
            {dict.subtitle}
          </p>
        </div>
      </Container>

      {/* ── Marquee ──────────────────────────────────────────────── */}
      <div
        data-reveal
        ref={marqueeRef}
        className="relative flex select-none"
        style={{ cursor: "grab" }}
      >
        {/* Panel A */}
        <div className="marquee-panel flex flex-shrink-0 gap-4 px-2 sm:gap-5 md:gap-6">
          {cards}
        </div>
        {/* Panel B (duplicate for seamless loop) */}
        <div className="marquee-panel flex flex-shrink-0 gap-4 px-2 sm:gap-5 md:gap-6" aria-hidden="true">
          {cards}
        </div>
      </div>

      {/* ── See all link ─────────────────────────────────────────── */}
      <Container>
        <div data-reveal className="mt-12 text-center md:mt-16">
          <Button
            href={localePath(ROUTES.routes, locale)}
            variant="outline"
            size="lg"
          >
            {dict.ctaAll}
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
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Button>
        </div>
      </Container>
    </section>
  );
}
