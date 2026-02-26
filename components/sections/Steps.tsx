"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { EASINGS } from "@/components/motion/animations";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface StepItem {
  title: string;
  description: string;
}

interface StepsDictionary {
  steps: {
    title: string;
    subtitle: string;
    items: StepItem[];
  };
}

interface StepsProps {
  dictionary: StepsDictionary;
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const STEP_IMAGES = [
  "/images/steps/step-1.jpg",
  "/images/steps/step-2.jpg",
  "/images/steps/step-3.jpg",
];

/* -------------------------------------------------------------------------- */
/*  Steps — Scroll-driven "How it works" section                             */
/* -------------------------------------------------------------------------- */

export default function Steps({ dictionary }: StepsProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion = usePrefersReducedMotion();
  const { steps } = dictionary;
  const total = steps.items.length;

  const setTextBlockRef = useCallback(
    (el: HTMLDivElement | null, i: number) => {
      textBlockRefs.current[i] = el;
    },
    [],
  );

  const setImageRef = useCallback((el: HTMLDivElement | null, i: number) => {
    imageRefs.current[i] = el;
  }, []);

  /* ── GSAP scroll animation (desktop only) ────────────────────────────── */

  useEffect(() => {
    if (!scrollAreaRef.current || prefersReducedMotion) return;

    const mql = window.matchMedia("(min-width: 768px)");
    if (!mql.matches) return;

    const ctx = gsap.context(() => {
      const panels = textBlockRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!panels.length) return;

      let currentStep = 0;

      function activateStep(index: number) {
        if (index === currentStep && index !== 0) return;
        const dir = index > currentStep ? 1 : -1;
        currentStep = index;

        /* ── Counter: slide out in scroll direction, swap, slide in ── */
        if (counterRef.current) {
          gsap.to(counterRef.current, {
            y: `${-dir * 40}%`,
            opacity: 0,
            duration: 0.2,
            ease: EASINGS.smooth,
            onComplete() {
              if (counterRef.current) {
                counterRef.current.textContent = String(index + 1).padStart(2, "0");
                gsap.fromTo(
                  counterRef.current,
                  { y: `${dir * 40}%`, opacity: 0 },
                  { y: "0%", opacity: 1, duration: 0.3, ease: EASINGS.snappy },
                );
              }
            },
          });
        }

        /* ── Text opacity ────────────────────────────────────────── */
        panels.forEach((panel, i) => {
          gsap.to(panel, {
            opacity: i === index ? 1 : 0.15,
            duration: 0.5,
            ease: EASINGS.smooth,
          });
        });

        /* ── Image crossfade with scale + blur ───────────────────── */
        imageRefs.current.forEach((img, i) => {
          if (!img) return;
          gsap.to(img, {
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1 : 1.08,
            duration: 0.7,
            ease: EASINGS.smooth,
          });
        });
      }

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => activateStep(i),
          onEnterBack: () => activateStep(i),
        });
      });

      activateStep(0);
    }, scrollAreaRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, total]);

  /* ── Render ──────────────────────────────────────────────────────────── */

  return (
    <section className="bg-white">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="container-bar text-center pt-section pb-12 md:pb-16">
        <h2 className="font-heading text-fluid-h1 text-deep">{steps.title}</h2>
        <p className="mt-6 u-text-large text-deep/50 max-w-2xl mx-auto">
          {steps.subtitle}
        </p>
      </div>

      {/* ── Desktop: two-column sticky scroll ────────────────────────── */}
      <div ref={scrollAreaRef} className="hidden md:block container-guana">
        <div className="flex gap-8 lg:gap-20 xl:gap-28">
          {/* Left: sticky counter + scrolling text */}
          <div className="flex-1 flex gap-6 lg:gap-12">
            {/* Counter — masked slide */}
            <div className="flex sticky top-0 h-screen items-center">
              <div className="flex items-baseline gap-1.5">
                <div
                  className="overflow-hidden font-heading text-4xl lg:text-[2.5rem] text-deep tracking-tight"
                  style={{
                    height: "1.3em",
                    maskImage:
                      "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
                  }}
                >
                  <span
                    ref={counterRef}
                    className="block text-center tabular-nums"
                    style={{ width: "1.4em", lineHeight: "1.3" }}
                  >
                    01
                  </span>
                </div>
                <span className="text-xs text-deep/40 tracking-wide">
                  /{total}
                </span>
              </div>
            </div>

            {/* Text panels */}
            <div className="flex flex-col">
              {steps.items.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => setTextBlockRef(el, i)}
                  className="min-h-screen flex items-center"
                  style={{ opacity: i === 0 ? 1 : 0.15 }}
                >
                  <div className="max-w-xs lg:max-w-sm">
                    <h3 className="font-heading text-fluid-h3 text-deep leading-tight">
                      {item.title}
                    </h3>
                    <p className="mt-4 u-text-main text-deep/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: sticky image */}
          <div className="flex-1 sticky top-0 h-screen flex items-center py-20 lg:py-24">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-deep">
              {steps.items.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => setImageRef(el, i)}
                  className="absolute inset-0 will-change-[transform,opacity]"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    scale: i === 0 ? "1" : "1.08",
                  }}
                >
                  <Image
                    src={STEP_IMAGES[i]}
                    alt={item.title}
                    fill
                    sizes="50vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked steps ────────────────────────────────────── */}
      <div className="md:hidden container-guana flex flex-col gap-16 pb-section">
        {steps.items.map((item, i) => (
          <div key={i} className="flex flex-col gap-6">
            <div>
              <span className="font-heading text-xl text-deep/30 mb-3 block">
                {String(i + 1).padStart(2, "0")}/{total}
              </span>
              <h3 className="font-heading text-fluid-h3 text-deep leading-tight">
                {item.title}
              </h3>
              <p className="mt-3 u-text-main text-deep/70 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="relative w-full aspect-square rounded-xl overflow-hidden">
              <Image
                src={STEP_IMAGES[i]}
                alt={item.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
