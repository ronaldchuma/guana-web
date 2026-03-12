"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MEDIA } from "@/lib/media";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StepItem {
  title: string;
  description: string;
}

interface HowItWorksProps {
  dictionary: {
    steps: {
      title: string;
      subtitle: string;
      items: StepItem[];
    };
  };
}

/* One image per step — use lifestyle/moments photos */
const STEP_IMAGES = [
  MEDIA.moments[0],
  MEDIA.moments[1],
  MEDIA.moments[2],
];

export default function HowItWorks({ dictionary }: HowItWorksProps) {
  const { steps } = dictionary;
  const total = steps.items.length;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const textBlockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  const setTextRef = useCallback((el: HTMLDivElement | null, i: number) => { textBlockRefs.current[i] = el; }, []);
  const setImageRef = useCallback((el: HTMLDivElement | null, i: number) => { imageRefs.current[i] = el; }, []);

  /* ── Scroll-driven step activation (desktop) ── */
  useEffect(() => {
    if (!scrollAreaRef.current || prefersReducedMotion) return;
    const mql = window.matchMedia("(min-width: 768px)");
    if (!mql.matches) return;

    let current = 0;

    const ctx = gsap.context(() => {
      const panels = textBlockRefs.current.filter(Boolean) as HTMLDivElement[];
      if (!panels.length) return;

      function activate(index: number) {
        const dir = index > current ? 1 : -1;
        current = index;

        if (counterRef.current) {
          gsap.to(counterRef.current, {
            y: `${-dir * 40}%`, opacity: 0, duration: 0.2, ease: "power2.out",
            onComplete() {
              if (counterRef.current) {
                counterRef.current.textContent = String(index + 1).padStart(2, "0");
                gsap.fromTo(counterRef.current, { y: `${dir * 40}%`, opacity: 0 }, { y: "0%", opacity: 1, duration: 0.3, ease: "power2.out" });
              }
            },
          });
        }

        panels.forEach((panel, i) => gsap.to(panel, { opacity: i === index ? 1 : 0.15, duration: 0.5, ease: "power2.out" }));
        imageRefs.current.forEach((img, i) => {
          if (!img) return;
          gsap.to(img, { opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.06, duration: 0.7, ease: "power2.out" });
        });
      }

      panels.forEach((panel, i) => {
        ScrollTrigger.create({
          trigger: panel, start: "top center", end: "bottom center",
          onEnter: () => activate(i), onEnterBack: () => activate(i),
        });
      });
      activate(0);
    }, scrollAreaRef);

    return () => ctx.revert();
  }, [prefersReducedMotion, total]);

  return (
    <section id="how-it-works" className="">
      {/* ── Section header ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px] pt-28 pb-14 md:pb-20 flex flex-col items-start lg:items-center lg:text-center gap-[10px]">
        {/* Eyebrow */}
        <span className="text-[18px] font-sans font-normal bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
          How it works
        </span>
        <div className="flex flex-col gap-5">
          <h2
            className="font-sans font-normal text-black"
            style={{ fontSize: "clamp(2rem, 4vw, 50px)", lineHeight: 1 }}
          >
            {steps.title}
          </h2>
          <p className="text-[18px] font-sans font-normal text-black leading-[1.2] max-w-[440px] lg:max-w-none">
            {steps.subtitle}
          </p>
        </div>
      </div>

      {/* ── Desktop: sticky scroll ── */}
      <div ref={scrollAreaRef} className="hidden md:block max-w-[1400px] mx-auto px-6 lg:px-[100px]">
        <div className="flex gap-16 lg:gap-24">
          {/* Left: step number + scrolling text blocks */}
          <div className="w-[480px] shrink-0 flex gap-10">
            {/* Counter */}
            <div className="sticky top-0 h-screen flex items-center shrink-0">
              <div className="flex items-baseline gap-1">
                <div
                  className="overflow-hidden"
                  style={{
                    height: "48px",
                    maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
                  }}
                >
                  <span
                    ref={counterRef}
                    className="block font-sans font-normal text-black tabular-nums"
                    style={{ fontSize: "36.7px", lineHeight: "48px", width: "1.4em", letterSpacing: "-1.2px" }}
                  >
                    01
                  </span>
                </div>
                <span className="font-sans font-normal text-black/50 text-[12px]">/{total}</span>
              </div>
            </div>

            {/* Text panels */}
            <div className="flex flex-col">
              {steps.items.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => setTextRef(el, i)}
                  className="min-h-screen flex items-center"
                  style={{ opacity: i === 0 ? 1 : 0.15 }}
                >
                  <div className="flex flex-col gap-[15px] max-w-[393px]">
                    <h3
                      className="font-sans font-normal text-black"
                      style={{ fontSize: "40px", lineHeight: 1.2 }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-[18px] font-sans font-normal text-black leading-[1.2]">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: sticky image */}
          <div className="flex-1 sticky top-0 h-screen flex items-center py-16">
            <div className="relative w-full h-[564px] rounded-[10px] overflow-hidden">
              {STEP_IMAGES.map((src, i) => (
                <div
                  key={i}
                  ref={(el) => setImageRef(el, i)}
                  className="absolute inset-0 will-change-[transform,opacity]"
                  style={{ opacity: i === 0 ? 1 : 0, scale: i === 0 ? "1" : "1.06" }}
                >
                  <Image src={src} alt={steps.items[i]?.title ?? ""} fill sizes="50vw" className="object-cover" priority={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="md:hidden max-w-[1400px] mx-auto px-6 pb-24 flex flex-col gap-14">
        {steps.items.map((item, i) => (
          <div key={i} className="flex flex-col gap-5">
            <div>
              <span className="font-sans font-normal text-black/30 text-2xl block mb-2">
                {String(i + 1).padStart(2, "0")}/{total}
              </span>
              <h3 className="font-sans font-normal text-black text-2xl leading-tight">{item.title}</h3>
              <p className="mt-3 text-[18px] font-sans font-normal text-black leading-[1.2]">{item.description}</p>
            </div>
            <div className="relative w-full aspect-[4/3] rounded-[10px] overflow-hidden">
              <Image src={STEP_IMAGES[i]} alt={item.title} fill sizes="100vw" className="object-cover" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
