"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { MEDIA } from "@/lib/media";
import { APP_STORE_URL } from "@/lib/tokens";
import type { Locale } from "@/lib/i18n/config";
import { Button } from "@/components/ui/Button";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface HeroDictionary {
  hero: {
    badge: string;
    title: string;
    titlePrefix: string;
    titleWords: string[];
    subtitle: string;
    cta: string;
    ctaSecondary: string;
  };
  common: {
    learnMore: string;
    getApp: string;
    [key: string]: string;
  };
}

interface HeroProps {
  dictionary: HeroDictionary;
  locale: Locale;
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

export default function Hero({ dictionary }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const isFirstRef = useRef(true);
  const prevWidthRef = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [wordIndex, setWordIndex] = useState(0);

  /* ── Entrance animation ─────────────────────────────────────────────── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /* Background scale-in */
      gsap.fromTo(
        bgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.8, ease: "power3.out" },
      );

      /* Center content — staggered fade-up */
      const centerEls = centerRef.current?.querySelectorAll("[data-reveal]");
      if (centerEls?.length) {
        gsap.fromTo(
          centerEls,
          { y: 50, autoAlpha: 0, filter: "blur(6px)" },
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
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  /* ── Subtle parallax on background (via ScrollTrigger for Lenis sync) ── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const bg = bgRef.current;
    const section = sectionRef.current;
    if (!bg || !section) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 15,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const { hero } = dictionary;
  const words = hero.titleWords;
  const currentWord = words?.[wordIndex] ?? "";

  /* ── Rotating word — letter-by-letter stagger ──────────────────────── */
  useEffect(() => {
    if (!words?.length || words.length <= 1 || prefersReducedMotion) return;

    const container = wordRef.current;
    if (!container) return;

    let cancelled = false;
    const letters = container.querySelectorAll("[data-letter]");

    /* Smooth width transition between words */
    gsap.set(container, { width: "auto" });
    const newWidth = container.offsetWidth;

    if (!isFirstRef.current && prevWidthRef.current > 0) {
      gsap.fromTo(
        container,
        { width: prevWidthRef.current },
        { width: newWidth, duration: 0.5, ease: "power3.inOut" },
      );
    } else {
      gsap.set(container, { width: newWidth });
    }
    prevWidthRef.current = newWidth;

    /* Animate in new letters (skip first render — entrance handles it) */
    if (!isFirstRef.current) {
      gsap.fromTo(
        letters,
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.45, stagger: 0.03, ease: "power3.out" },
      );
    }

    /* Schedule exit → swap */
    const delay = isFirstRef.current ? 4 : 3;
    const delayedCall = gsap.delayedCall(delay, () => {
      isFirstRef.current = false;
      const currentLetters = container.querySelectorAll("[data-letter]");
      gsap.to(currentLetters, {
        yPercent: -110,
        autoAlpha: 0,
        duration: 0.35,
        stagger: 0.025,
        ease: "power3.in",
        onComplete: () => {
          if (!cancelled) setWordIndex((prev) => (prev + 1) % words.length);
        },
      });
    });

    return () => {
      cancelled = true;
      delayedCall.kill();
      gsap.killTweensOf(letters);
      gsap.killTweensOf(container);
    };
  }, [wordIndex, words, prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label={hero.badge}
      className="relative flex h-auto min-h-[80svh] flex-col overflow-hidden bg-white md:h-[100svh] md:min-h-[640px]"
    >
      {/* ── Background image ──────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <div ref={bgRef} className="absolute inset-0 will-change-transform">
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
        <div className="absolute inset-0 bg-deep/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/20 to-deep/40" />
      </div>

      {/* ── Centered content (headline + CTA) ─────────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pt-32 pb-24 md:pt-0 md:pb-0">
        <div ref={centerRef} className="text-center">
          <h1
            data-reveal
            className="mx-auto u-text-display font-bold text-white"
            style={{ visibility: prefersReducedMotion ? "visible" : "hidden" }}
          >
            <span className="block">{hero.title}</span>
            <span className="block">
              {hero.titlePrefix}{" "}
              <span ref={wordRef} className="inline-block whitespace-nowrap">
                {currentWord.split("").map((char, j) => (
                  <span
                    key={`${wordIndex}-${j}`}
                    data-letter
                    className="inline-block"
                    style={isFirstRef.current ? undefined : { opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          <div
            data-reveal
            className="mt-8 flex justify-center"
            style={{ visibility: prefersReducedMotion ? "visible" : "hidden" }}
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
    </section>
  );
}
