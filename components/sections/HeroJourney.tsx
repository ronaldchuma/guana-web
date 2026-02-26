"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
// @ts-ignore — type file is flip.d.ts (lowercase) but module is gsap/Flip
import { Flip } from "gsap/Flip";
import { MEDIA } from "@/lib/media";
import { APP_STORE_URL } from "@/lib/tokens";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/* -------------------------------------------------------------------------- */
/*  Plugin registration                                                       */
/* -------------------------------------------------------------------------- */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface HeroJourneyDictionary {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  howItWorks: {
    headline: string;
    cta: string;
  };
  common: {
    learnMore: string;
    getApp: string;
    [key: string]: string;
  };
}

interface HeroJourneyProps {
  dictionary: HeroJourneyDictionary;
  locale: Locale;
}

/* -------------------------------------------------------------------------- */
/*  Gallery images — 4 columns × 4 images = 16                               */
/*  Cycle through 7 moment images to fill 16 slots                           */
/* -------------------------------------------------------------------------- */

const M = MEDIA.moments;
const img = (i: number) => M[i % M.length];

const COL_FAR_LEFT   = [img(0), img(1), img(2), img(3)];
const COL_INNER_LEFT = [img(4), img(5), img(6), img(0)];
const COL_INNER_RIGHT = [img(1), img(2), img(3), img(4)];
const COL_FAR_RIGHT  = [img(5), img(6), img(0), img(1)];

/** Final image uses lifestyle (distinct from gallery moments) */
const FINAL_IMAGE = MEDIA.lifestyle;

/* -------------------------------------------------------------------------- */
/*  Scroll height — generous room for smooth scrub                            */
/* -------------------------------------------------------------------------- */

const SCROLL_HEIGHT = "1100vh";

/* -------------------------------------------------------------------------- */
/*  HeroJourney                                                               */
/* -------------------------------------------------------------------------- */

export default function HeroJourney({ dictionary, locale }: HeroJourneyProps) {
  /* ── Refs ──────────────────────────────────────────────────────────── */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  /* Hero */
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);

  /* Gallery columns */
  const colFarLeftRef = useRef<HTMLDivElement>(null);
  const colInnerLeftRef = useRef<HTMLDivElement>(null);
  const colInnerRightRef = useRef<HTMLDivElement>(null);
  const colFarRightRef = useRef<HTMLDivElement>(null);

  /* Center value text — NOTE: <div> not <p> to avoid SplitText invalid HTML */
  const centerTextRef = useRef<HTMLDivElement>(null);
  const centerCtaRef = useRef<HTMLDivElement>(null);

  /* Final image + CTA section */
  const finalImageRef = useRef<HTMLDivElement>(null);
  const finalSectionRef = useRef<HTMLDivElement>(null);

  /* Flip zones — invisible positioning targets */
  const flipZoneHeroFullRef = useRef<HTMLDivElement>(null);
  const flipZoneHeroSmallRef = useRef<HTMLDivElement>(null);
  const flipZoneFinalSmallRef = useRef<HTMLDivElement>(null);
  const flipZoneFinalLargeRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { hero, howItWorks } = dictionary;

  /* ── Entrance animation (on load) ─────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const pin = pinRef.current;
    if (!pin) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.15 },
        { scale: 1.05, duration: 1.8, ease: "power3.out" },
      );
      const textEls = heroTextRef.current?.querySelectorAll("[data-hero-reveal]");
      if (textEls?.length) {
        gsap.fromTo(
          textEls,
          { y: 40, autoAlpha: 0, filter: "blur(4px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            delay: 0.3,
          },
        );
      }
    }, pin);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  /* ── Main scroll-driven timeline ─────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const wrapper = wrapperRef.current;
    const pin = pinRef.current;
    if (!wrapper || !pin) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop } = context.conditions!;

        const ctx = gsap.context(() => {
          /* GPU-accelerated transforms */
          gsap.defaults({ force3D: true });

          /* ────────────────────────────────────────────────────────── */
          /* Main scrubbed timeline                                    */
          /* ────────────────────────────────────────────────────────── */
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapper,
              pin: pin,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          });

          /*
           * Timeline duration = 100 units
           *
           *   0–15  : Hero text blurs out
           *  10–40  : Hero image Flip.fits fullscreen → gallery size
           *  12–24  : Border-radius + overlay fade
           *  18–73  : Gallery columns — SINGLE continuous parallax (no competing tweens)
           *  35–57  : Center text SplitText word fill
           *  58–66  : Everything fades out
           *  62–80  : Final image enters + Flip.fits to large
           *  82–100 : Final section text reveals
           */

          /* ────────────────────────────────────────────────────────── */
          /* STAGE 1 (0→15): Hero text blurs out                       */
          /* ────────────────────────────────────────────────────────── */

          tl.to(
            heroTextRef.current,
            {
              autoAlpha: 0,
              scale: 0.96,
              y: -30,
              duration: 15,
              ease: "power3.in",
            },
            0,
          );

          /* ────────────────────────────────────────────────────────── */
          /* STAGE 2 (10→40): Hero image Flip.fits down                */
          /* ────────────────────────────────────────────────────────── */

          if (
            flipZoneHeroFullRef.current &&
            flipZoneHeroSmallRef.current &&
            heroImageRef.current
          ) {
            const heroFlip = Flip.fit(
              heroImageRef.current,
              flipZoneHeroSmallRef.current,
              {
                duration: 30,
                ease: "power2.inOut",
                scale: true,
              },
            );
            if (heroFlip) tl.add(heroFlip as gsap.core.Animation, 10);
          }

          // Border-radius during transition
          tl.to(
            heroImageRef.current,
            {
              borderRadius: isDesktop ? 16 : 12,
              duration: 20,
              ease: "power2.inOut",
            },
            12,
          );

          // Overlay fades away as image shrinks
          tl.to(
            heroOverlayRef.current,
            { opacity: 0, duration: 15, ease: "power1.out" },
            12,
          );

          /* ────────────────────────────────────────────────────────── */
          /* STAGE 3 (18→73): Gallery columns — SINGLE continuous      */
          /* parallax per column. No competing tweens.                  */
          /* Outer = faster range, inner = slower range.                */
          /* Uses yPercent for GPU compositing.                         */
          /* ────────────────────────────────────────────────────────── */

          if (isDesktop) {
            // Outer columns: large travel range (faster parallax)
            tl.fromTo(
              colFarLeftRef.current,
              { yPercent: 140, autoAlpha: 0 },
              { yPercent: -90, autoAlpha: 1, duration: 55, ease: "none" },
              18,
            );
            tl.fromTo(
              colFarRightRef.current,
              { yPercent: 140, autoAlpha: 0 },
              { yPercent: -90, autoAlpha: 1, duration: 55, ease: "none" },
              18,
            );

            // Inner columns: smaller travel range (slower parallax)
            tl.fromTo(
              colInnerLeftRef.current,
              { yPercent: 100, autoAlpha: 0 },
              { yPercent: -55, autoAlpha: 1, duration: 55, ease: "none" },
              20,
            );
            tl.fromTo(
              colInnerRightRef.current,
              { yPercent: 100, autoAlpha: 0 },
              { yPercent: -55, autoAlpha: 1, duration: 55, ease: "none" },
              20,
            );
          } else {
            // Mobile: hide gallery columns
            tl.set(colFarLeftRef.current, { autoAlpha: 0 });
            tl.set(colInnerLeftRef.current, { autoAlpha: 0 });
            tl.set(colInnerRightRef.current, { autoAlpha: 0 });
            tl.set(colFarRightRef.current, { autoAlpha: 0 });
          }

          /* ────────────────────────────────────────────────────────── */
          /* STAGE 4 (35→57): Center value text — SplitText word fill  */
          /* Target is <div> (not <p>) to allow valid <div> children   */
          /* ────────────────────────────────────────────────────────── */

          tl.fromTo(
            centerTextRef.current,
            { autoAlpha: 0, y: 30 },
            { autoAlpha: 1, y: 0, duration: 8, ease: "power2.out" },
            33,
          );

          if (centerTextRef.current) {
            new SplitText(centerTextRef.current, {
              type: "words",
              autoSplit: true,
              onSplit(self: SplitText) {
                // Ensure word wrappers stay inline (SplitText uses <div>)
                gsap.set(self.words, { display: "inline-block" });

                tl.fromTo(
                  self.words,
                  { autoAlpha: 0.12 },
                  {
                    autoAlpha: 1,
                    stagger: 0.04,
                    duration: 22,
                    ease: "none",
                  },
                  35,
                );
              },
            });
          }

          // CTA button
          tl.fromTo(
            centerCtaRef.current,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 8, ease: "power2.out" },
            52,
          );

          /* ────────────────────────────────────────────────────────── */
          /* STAGE 5 (58→66): Fade out everything                      */
          /* ────────────────────────────────────────────────────────── */

          tl.to(
            centerTextRef.current,
            { autoAlpha: 0, duration: 8, ease: "power1.in" },
            58,
          );
          tl.to(centerCtaRef.current, { autoAlpha: 0, duration: 6 }, 58);
          tl.to(
            heroImageRef.current,
            { autoAlpha: 0, duration: 8, ease: "power1.in" },
            59,
          );

          if (isDesktop) {
            tl.to(colFarLeftRef.current, { autoAlpha: 0, duration: 8 }, 59);
            tl.to(colInnerLeftRef.current, { autoAlpha: 0, duration: 8 }, 59);
            tl.to(colInnerRightRef.current, { autoAlpha: 0, duration: 8 }, 59);
            tl.to(colFarRightRef.current, { autoAlpha: 0, duration: 8 }, 59);
          }

          /* ────────────────────────────────────────────────────────── */
          /* STAGE 6 (62→80): Final image enters from below            */
          /* Flip.fits from small center → large left                   */
          /* ────────────────────────────────────────────────────────── */

          if (
            flipZoneFinalSmallRef.current &&
            flipZoneFinalLargeRef.current &&
            finalImageRef.current
          ) {
            // Start positioned at the small center zone
            Flip.fit(finalImageRef.current, flipZoneFinalSmallRef.current, {
              scale: true,
            });

            // Scroll up from below viewport
            tl.fromTo(
              finalImageRef.current,
              { y: "100vh", autoAlpha: 0 },
              { y: "0vh", autoAlpha: 1, duration: 14, ease: "power2.out" },
              62,
            );

            // Flip.fit to the large position
            const finalFlip = Flip.fit(
              finalImageRef.current,
              flipZoneFinalLargeRef.current,
              {
                duration: 14,
                ease: "power2.inOut",
                scale: true,
              },
            );
            if (finalFlip) tl.add(finalFlip as gsap.core.Animation, 72);
          }

          // Border radius during final expand
          tl.to(
            finalImageRef.current,
            { borderRadius: isDesktop ? 20 : 14, duration: 12 },
            72,
          );

          /* ────────────────────────────────────────────────────────── */
          /* STAGE 7 (82→100): Final section text reveals              */
          /* ────────────────────────────────────────────────────────── */

          tl.fromTo(
            finalSectionRef.current,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 12, ease: "power2.out" },
            82,
          );

          // Subtle zoom on final image during hold
          tl.to(
            finalImageRef.current,
            { scale: 1.04, duration: 18, ease: "power1.inOut" },
            84,
          );
        }, pin);

        return () => ctx.revert();
      },
    );

    return () => mm.revert();
  }, [prefersReducedMotion]);

  /* ── Reduced-motion fallback ─────────────────────────────────────── */
  if (prefersReducedMotion) {
    return (
      <>
        <section
          aria-label={hero.badge}
          className="relative flex min-h-[80svh] flex-col overflow-hidden bg-white md:h-[100svh] md:min-h-[640px]"
        >
          <div className="absolute inset-0">
            <Image
              src={MEDIA.hero}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-deep/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-deep/40" />
          </div>
          <div className="relative z-10 flex flex-1 items-end pb-16 md:pb-20">
            <div className="container-guana">
              <h1 className="max-w-3xl u-text-display font-bold text-white">
                {hero.title}
              </h1>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-base lg:text-fluid-large">
                {hero.subtitle}
              </p>
              <div className="mt-8">
                <Button
                  href={APP_STORE_URL}
                  size="lg"
                  className="bg-teal text-white hover:bg-teal-600 active:bg-teal-700 shadow-lg"
                >
                  {hero.cta}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-28 md:py-36 lg:py-44">
          <div className="container-bar text-center">
            <p className="font-heading text-fluid-h2 leading-snug text-deep">
              {howItWorks.headline}
            </p>
            <div className="mt-10 md:mt-12">
              <Button href={`/${locale}/#download`} variant="primary" size="lg">
                {howItWorks.cta}
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  /* ── Main render ──────────────────────────────────────────────────── */
  return (
    <div ref={wrapperRef} className="relative" style={{ height: SCROLL_HEIGHT }}>
      <div
        ref={pinRef}
        className="relative h-svh w-full overflow-hidden bg-white"
        aria-label={hero.badge}
      >
        {/* ── Flip zones (invisible positioning targets) ─────────── */}

        {/* Zone: Hero fullscreen (start) */}
        <div
          ref={flipZoneHeroFullRef}
          data-flip-zone="hero-full"
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
        />

        {/* Zone: Hero scaled down to gallery-card size (end) */}
        <div
          ref={flipZoneHeroSmallRef}
          data-flip-zone="hero-small"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:h-[28%] md:w-[22%] h-[30%] w-[50%]"
          aria-hidden="true"
        />

        {/* Zone: Final image small center (start) */}
        <div
          ref={flipZoneFinalSmallRef}
          data-flip-zone="final-small"
          className="pointer-events-none absolute left-1/2 top-[85%] -translate-x-1/2 -translate-y-1/2 h-[18%] w-[18%]"
          aria-hidden="true"
        />

        {/* Zone: Final image large left (end — for split layout) */}
        <div
          ref={flipZoneFinalLargeRef}
          data-flip-zone="final-large"
          className="pointer-events-none absolute md:left-[4%] md:top-[8%] md:h-[84%] md:w-[50%] left-[4%] top-[4%] h-[45%] w-[92%] rounded-2xl"
          aria-hidden="true"
        />

        {/* ── Hero background image ──────────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={heroImageRef}
            className="absolute inset-0 origin-center overflow-hidden will-change-transform"
          >
            <Image
              src={MEDIA.hero}
              alt=""
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>

          {/* Overlays */}
          <div
            ref={heroOverlayRef}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute inset-0 bg-deep/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-deep/40" />
          </div>
        </div>

        {/* ── Hero text (bottom-left, stays in place, blurs out) ── */}
        <div
          ref={heroTextRef}
          className="absolute inset-0 z-10 flex items-end pb-16 md:pb-20"
        >
          <div className="container-guana">
            <h1
              data-hero-reveal
              className="max-w-3xl u-text-display font-bold text-white"
              style={{ visibility: "hidden" }}
            >
              {hero.title}
            </h1>
            <p
              data-hero-reveal
              className="mt-4 max-w-lg text-sm leading-relaxed text-white/70 md:text-base lg:text-fluid-large"
              style={{ visibility: "hidden" }}
            >
              {hero.subtitle}
            </p>
            <div
              data-hero-reveal
              className="mt-8"
              style={{ visibility: "hidden" }}
            >
              <Button
                href={APP_STORE_URL}
                size="lg"
                className="bg-teal text-white hover:bg-teal-600 active:bg-teal-700 shadow-lg hover:shadow-xl"
              >
                {hero.cta}
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
            </div>
          </div>
        </div>

        {/* ── Gallery: 4 columns × 4 images each ───────────────── */}

        {/* Far left column — fastest parallax */}
        <div
          ref={colFarLeftRef}
          className="absolute left-[2%] top-0 z-10 hidden h-full w-[11%] flex-col items-center justify-center gap-3 md:flex"
          style={{ visibility: "hidden" }}
        >
          {COL_FAR_LEFT.map((src, i) => (
            <div
              key={`fl-${i}`}
              className="relative aspect-square w-full overflow-hidden rounded-xl"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="11vw" />
            </div>
          ))}
        </div>

        {/* Inner left column — slower parallax */}
        <div
          ref={colInnerLeftRef}
          className="absolute left-[15%] top-0 z-10 hidden h-full w-[11%] flex-col items-center justify-center gap-3 md:flex"
          style={{ visibility: "hidden" }}
        >
          {COL_INNER_LEFT.map((src, i) => (
            <div
              key={`il-${i}`}
              className="relative aspect-square w-full overflow-hidden rounded-xl"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="11vw" />
            </div>
          ))}
        </div>

        {/* Inner right column — slower parallax */}
        <div
          ref={colInnerRightRef}
          className="absolute right-[15%] top-0 z-10 hidden h-full w-[11%] flex-col items-center justify-center gap-3 md:flex"
          style={{ visibility: "hidden" }}
        >
          {COL_INNER_RIGHT.map((src, i) => (
            <div
              key={`ir-${i}`}
              className="relative aspect-square w-full overflow-hidden rounded-xl"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="11vw" />
            </div>
          ))}
        </div>

        {/* Far right column — fastest parallax */}
        <div
          ref={colFarRightRef}
          className="absolute right-[2%] top-0 z-10 hidden h-full w-[11%] flex-col items-center justify-center gap-3 md:flex"
          style={{ visibility: "hidden" }}
        >
          {COL_FAR_RIGHT.map((src, i) => (
            <div
              key={`fr-${i}`}
              className="relative aspect-square w-full overflow-hidden rounded-xl"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="11vw" />
            </div>
          ))}
        </div>

        {/* ── Center value text (anchored, short) ─────────────────── */}
        {/*
          FIX: Using <div> instead of <p> because SplitText wraps words
          in <div> elements — <div> inside <p> is invalid HTML and causes
          the browser to auto-close <p>, making words stack vertically.
        */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6">
          <div
            ref={centerTextRef}
            className="max-w-2xl text-center font-heading text-fluid-h3 leading-snug text-white"
            style={{ visibility: "hidden" }}
          >
            {howItWorks.headline}
          </div>
          <div
            ref={centerCtaRef}
            className="mt-8 md:mt-10"
            style={{ visibility: "hidden" }}
          >
            <Button href={`/${locale}/#download`} variant="primary" size="lg">
              {howItWorks.cta}
            </Button>
          </div>
        </div>

        {/* ── Final image (scrolls up, Flip.fits to large left) ──── */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <div
            ref={finalImageRef}
            className="absolute origin-center overflow-hidden rounded-2xl will-change-transform"
            style={{
              visibility: "hidden",
              width: "18%",
              height: "18%",
              left: "50%",
              top: "85%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Image
              src={FINAL_IMAGE}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 92vw"
            />
          </div>
        </div>

        {/* ── Final section text (right side — h2 + p + CTA) ──────── */}
        <div
          ref={finalSectionRef}
          className="absolute z-30 md:right-[4%] md:top-1/2 md:-translate-y-1/2 md:w-[38%] bottom-[8%] left-[4%] w-[92%] flex flex-col justify-center"
          style={{ visibility: "hidden" }}
        >
          <h2 className="font-heading text-fluid-h2 leading-tight text-white">
            {hero.title}
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
            {howItWorks.headline}
          </p>
          <div className="mt-8">
            <Button
              href={APP_STORE_URL}
              size="lg"
              className="bg-teal text-white hover:bg-teal-600 active:bg-teal-700 shadow-lg hover:shadow-xl pointer-events-auto"
            >
              {hero.cta}
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
          </div>
        </div>
      </div>
    </div>
  );
}
