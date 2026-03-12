"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { MEDIA } from "@/lib/media";
import type { Locale } from "@/lib/i18n/config";

/* ── Config ──────────────────────────────────────────────── */
const DURATION = 0.65;
const EASE = "power3.inOut";
const GAP = 8; // px between slides

const BREAKPOINTS = [
  { maxWidth: 479,      activeWidth: 0.85, siblingWidth: 0.06 },
  { maxWidth: 767,      activeWidth: 0.78, siblingWidth: 0.08 },
  { maxWidth: 991,      activeWidth: 0.65, siblingWidth: 0.10 },
  { maxWidth: Infinity, activeWidth: 0.60, siblingWidth: 0.13 },
];

const BASE_ROUTES = [
  { origin: "San José", destination: "Arenal",       price: "₡5,000",  image: MEDIA.moments[5] },
  { origin: "San José", destination: "Jacó",         price: "₡4,500",  image: MEDIA.moments[4] },
  { origin: "San José", destination: "Tamarindo",    price: "₡8,000",  image: MEDIA.moments[3] },
  { origin: "San José", destination: "Santa Teresa", price: "₡10,000", image: MEDIA.moments[0] },
  { origin: "San José", destination: "Nosara",       price: "₡9,000",  image: MEDIA.moments[1] },
];

// Duplicate until >= 9 slides for seamless looping
const SLIDES = (() => {
  const r = [...BASE_ROUTES];
  while (r.length < 9) r.push(...BASE_ROUTES);
  return r;
})();

function debounce<T extends (...args: unknown[]) => void>(fn: T, ms: number): T {
  let t: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); }) as T;
}

/* ── Types ───────────────────────────────────────────────── */
interface RoutesPreviewProps {
  dictionary: { routes: { title: string; subtitle: string } };
  locale: Locale;
}

/* ── Component ───────────────────────────────────────────── */
export default function RoutesPreview({ dictionary }: RoutesPreviewProps) {
  const viewportRef  = useRef<HTMLDivElement>(null);
  const slideRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const activeIdxRef = useRef(0);
  const goToRef      = useRef<(i: number) => void>(() => {});

  const setSlideRef = useCallback((el: HTMLDivElement | null, i: number) => {
    slideRefs.current[i] = el;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const slides = slideRefs.current.filter(Boolean) as HTMLDivElement[];
    const total  = slides.length;
    if (!total) return;

    let isAnimating = false;
    let slideWidth  = 0;
    const centers: Record<string, number> = {};
    const widths:  Record<string, number> = {};

    function getSettings() {
      const w = window.innerWidth;
      return BREAKPOINTS.find(b => w <= b.maxWidth) ?? BREAKPOINTS[BREAKPOINTS.length - 1];
    }

    function measure() {
      const { activeWidth, siblingWidth } = getSettings();
      const vw     = viewport!.offsetWidth;
      const activeW  = vw * activeWidth;
      const siblingW = vw * siblingWidth;
      const farW     = Math.max(0, (vw - activeW - 2 * siblingW - 4 * GAP) / 2);
      slideWidth = activeW;

      const slots = [
        { slot: -2, w: farW },
        { slot: -1, w: siblingW },
        { slot:  0, w: activeW },
        { slot:  1, w: siblingW },
        { slot:  2, w: farW },
      ];

      let x = 0;
      slots.forEach(({ slot, w }, i) => {
        centers[slot] = x + w / 2;
        widths[slot]  = w;
        if (i < slots.length - 1) x += w + GAP;
      });

      // Off-screen parking slots
      centers[-3] = centers[-2] - farW - GAP;
      widths[-3]  = farW;
      centers[3]  = centers[2]  + farW + GAP;
      widths[3]   = farW;

      slides.forEach(s => { s.style.width = slideWidth + "px"; });
    }

    function getOffset(idx: number, from = activeIdxRef.current) {
      let d = idx - from;
      const half = total / 2;
      if (d >  half) d -= total;
      if (d < -half) d += total;
      return d;
    }

    function slideProps(offset: number) {
      const c    = Math.max(-3, Math.min(3, offset));
      const slotW = widths[c] ?? 0;
      const clip  = Math.max(0, (slideWidth - slotW) / 2);
      return { x: (centers[c] ?? 0) - slideWidth / 2, "--clip": clip, zIndex: 10 - Math.abs(c) };
    }

    function layout(animate: boolean, prev?: number) {
      slides.forEach((slide, idx) => {
        const offset = getOffset(idx);

        if (offset < -3 || offset > 3) {
          if (animate && prev !== undefined) {
            const prevOffset = getOffset(idx, prev);
            if (prevOffset >= -2 && prevOffset <= 2) {
              gsap.to(slide, { ...slideProps(prevOffset < 0 ? -3 : 3), duration: DURATION, ease: EASE, overwrite: true });
              return;
            }
          }
          gsap.set(slide, slideProps(offset < 0 ? -3 : 3));
          return;
        }

        slide.setAttribute("data-status", offset === 0 ? "active" : "inactive");
        const props = slideProps(offset);
        if (animate) gsap.to(slide,  { ...props, duration: DURATION, ease: EASE, overwrite: true });
        else         gsap.set(slide, props);
      });
    }

    function goTo(target: number) {
      const normalized = ((target % total) + total) % total;
      if (isAnimating || normalized === activeIdxRef.current) return;
      isAnimating = true;

      const prev = activeIdxRef.current;
      const dir  = getOffset(normalized, prev) > 0 ? 1 : -1;

      slides.forEach((slide, idx) => {
        const curOffset  = getOffset(idx, prev);
        const nextOffset = getOffset(idx, normalized);
        if (curOffset < -3 || curOffset > 3) {
          if (nextOffset >= -2 && nextOffset <= 2)
            gsap.set(slide, slideProps(dir > 0 ? 3 : -3));
          if (Math.abs(nextOffset) === 3 && curOffset * nextOffset < 0)
            gsap.set(slide, slideProps(nextOffset > 0 ? 3 : -3));
        }
      });

      activeIdxRef.current = normalized;
      layout(true, prev);
      gsap.delayedCall(DURATION + 0.05, () => { isAnimating = false; });
    }

    goToRef.current = goTo;

    measure();
    layout(false);

    // Autoplay — advances every 4s, pauses while hovering the viewport
    let autoplayId: ReturnType<typeof setInterval>;
    const startAutoplay = () => { autoplayId = setInterval(() => goTo(activeIdxRef.current + 1), 4000); };
    const stopAutoplay  = () => clearInterval(autoplayId);
    startAutoplay();
    viewport.addEventListener("mouseenter", stopAutoplay);
    viewport.addEventListener("mouseleave", startAutoplay);

    const onResize = debounce(() => { measure(); layout(false); }, 100);
    window.addEventListener("resize", onResize);
    return () => {
      stopAutoplay();
      viewport.removeEventListener("mouseenter", stopAutoplay);
      viewport.removeEventListener("mouseleave", startAutoplay);
      window.removeEventListener("resize", onResize);
      gsap.killTweensOf(slides);
    };
  }, []);

  return (
    <section id="features" className="py-16 sm:py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px]">

        {/* Header */}
        <div className="text-center mb-14 flex flex-col items-center gap-5">
          <h2
            className="font-sans font-normal text-black"
            style={{ fontSize: "clamp(2rem, 4vw, 50px)", lineHeight: 1 }}
          >
            {dictionary.routes.title}
          </h2>
          <p className="text-[18px] font-sans font-normal text-black leading-[1.2] max-w-[440px]">
            {dictionary.routes.subtitle}
          </p>
        </div>

        {/* Cascading slider */}
        <div>
          {/* Viewport */}
          <div
            ref={viewportRef}
            role="region"
            aria-label="Featured routes"
            aria-roledescription="carousel"
            className="relative overflow-hidden w-full h-[280px] sm:h-[340px] md:h-[383px]"
          >
            {SLIDES.map((route, i) => (
              <div
                key={i}
                ref={(el) => setSlideRef(el, i)}
                role="group"
                aria-roledescription="slide"
                data-status={i === 0 ? "active" : "inactive"}
                onClick={() => goToRef.current(i)}
                className="absolute top-0 left-0 h-full cursor-pointer select-none"
                style={{
                  clipPath: "inset(0px calc(var(--clip) * 1px) round 10px)",
                  willChange: "transform, clip-path",
                } as React.CSSProperties}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[10px]">
                  {/* Photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={route.image}
                    alt={`${route.origin} to ${route.destination}`}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  />

                  {/* Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 pointer-events-none" />

                  {/* Route name — top-center on mobile, bottom-left on desktop */}
                  <div className="route-overlay absolute top-5 inset-x-0 flex justify-center md:top-auto md:bottom-5 md:inset-x-auto md:left-5">
                    <div className="backdrop-blur-[12.5px] bg-[rgba(255,201,66,0.1)] border border-[rgba(255,201,66,0.25)] rounded-[10px] px-4 py-3 flex items-center gap-3">
                      <span className="text-[16px] md:text-[18px] font-sans font-normal text-white whitespace-nowrap">{route.origin}</span>
                      <svg className="w-5 h-5 text-white shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span className="text-[16px] md:text-[18px] font-sans font-normal text-white whitespace-nowrap">{route.destination}</span>
                    </div>
                  </div>

                  {/* Price — bottom-center on mobile, bottom-right on desktop */}
                  <div className="route-overlay absolute bottom-5 inset-x-0 flex justify-center md:inset-x-auto md:right-5">
                    <div className="backdrop-blur-[12.5px] bg-[rgba(255,201,66,0.1)] border border-[rgba(255,201,66,0.25)] rounded-[10px] px-3 py-2 md:px-4 md:py-4 text-center">
                      <p className="text-[11px] md:text-[13px] font-sans font-normal text-white">From</p>
                      <p className="text-[22px] md:text-[30px] font-sans font-normal text-white leading-tight">{route.price}</p>
                      <p className="text-[11px] md:text-[13px] font-sans font-normal text-white">/seat</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <nav aria-label="Slider navigation" className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => goToRef.current(activeIdxRef.current - 1)}
              aria-label="Previous route"
              className="w-10 h-10 rounded-[5px] bg-brand-gold flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeMiterlimit="10">
                <path d="M14 19L7 12L14 5" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
                <path d="M7 12H26" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
              </svg>
            </button>
            <button
              onClick={() => goToRef.current(activeIdxRef.current + 1)}
              aria-label="Next route"
              className="w-10 h-10 rounded-[5px] bg-brand-gold flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeMiterlimit="10">
                <path d="M14 19L21 12L14 5" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
                <path d="M21 12H2" stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" />
              </svg>
            </button>
          </nav>
        </div>

      </div>
    </section>
  );
}
