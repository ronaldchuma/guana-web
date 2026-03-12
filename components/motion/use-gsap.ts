"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Observer } from "gsap/Observer";
import { CSSPlugin } from "gsap/CSSPlugin";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";
import { DURATIONS, EASINGS, STAGGER, PRESETS } from "./animations";

// ---------------------------------------------------------------------------
// Plugin registration (client-only)
// ---------------------------------------------------------------------------

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, Observer, CSSPlugin);
}

// ---------------------------------------------------------------------------
// useOnLoadReveal — fires immediately on mount (no ScrollTrigger)
// ---------------------------------------------------------------------------

/** Options accepted by {@link useOnLoadReveal}. */
export interface OnLoadRevealOptions {
  /** Initial delay before the sequence starts (seconds). @default 0.15 */
  delay?: number;
  /** Vertical offset (px) elements animate from. @default 40 */
  y?: number;
  /** Delay between each child element (seconds). @default 0.12 */
  stagger?: number;
  /** Tween duration (seconds). @default 1 */
  duration?: number;
  /** GSAP easing string. @default EASINGS.snappy */
  ease?: string;
}

/**
 * On-load reveal animation for above-the-fold content (e.g. the Hero).
 *
 * Unlike {@link useSectionReveal}, this hook fires immediately after mount
 * using a GSAP timeline — no ScrollTrigger dependency. This avoids the
 * race condition where scroll-triggered animations can delay or miss the
 * first paint for content already in the viewport.
 *
 * All children marked with `data-reveal` are animated with a staggered
 * fade-up entrance.
 */
export function useOnLoadReveal(
  scopeRef: React.RefObject<HTMLElement | null>,
  options?: OnLoadRevealOptions,
): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const elements = scope.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!elements.length) return;

    if (prefersReducedMotion) {
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(elements, { opacity: 0, y: options?.y ?? 40 });

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: options?.duration ?? 1,
        stagger: options?.stagger ?? 0.12,
        ease: options?.ease ?? EASINGS.snappy,
        delay: options?.delay ?? 0.15,
      });
    }, scope);

    return () => {
      ctx.revert();
    };
  }, [
    scopeRef,
    prefersReducedMotion,
    options?.delay,
    options?.y,
    options?.stagger,
    options?.duration,
    options?.ease,
  ]);
}

// ---------------------------------------------------------------------------
// useGSAPContext
// ---------------------------------------------------------------------------

/**
 * Creates a scoped GSAP context tied to a container ref.
 *
 * Any GSAP tweens or ScrollTriggers created inside descendants of
 * `scopeRef` are automatically collected by the context and reverted
 * when the component unmounts or when `prefersReducedMotion` changes.
 */
export function useGSAPContext(
  scopeRef: React.RefObject<HTMLElement | null>,
): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = scopeRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {}, el);

    return () => {
      ctx.revert();
    };
  }, [scopeRef, prefersReducedMotion]);
}

// ---------------------------------------------------------------------------
// useSectionReveal
// ---------------------------------------------------------------------------

/** Options accepted by {@link useSectionReveal}. */
export interface SectionRevealOptions {
  /** ScrollTrigger `start` value. @default "top 80%" */
  start?: string;
  /** Vertical offset (px) elements animate from. @default 30 */
  y?: number;
  /** Delay between each child element (seconds). @default STAGGER.normal */
  stagger?: number;
  /** Tween duration (seconds). @default DURATIONS.slow */
  duration?: number;
  /** GSAP easing string. @default EASINGS.snappy */
  ease?: string;
}

/**
 * Scroll-triggered reveal animation for a section element.
 *
 * All direct or nested children marked with `data-reveal` are batch-animated
 * with a staggered fade-up entrance the first time the section scrolls
 * into view. When the user prefers reduced motion the elements are made
 * visible immediately with no animation.
 *
 * @param sectionRef - React ref pointing to the section wrapper.
 * @param options    - Optional overrides for timing, easing, and trigger.
 *
 * @example
 * ```tsx
 * const sectionRef = useRef<HTMLElement>(null);
 * useSectionReveal(sectionRef, { stagger: 0.12 });
 *
 * return (
 *   <section ref={sectionRef}>
 *     <h2 data-reveal>Title</h2>
 *     <p data-reveal>Body copy</p>
 *   </section>
 * );
 * ```
 */
export function useSectionReveal(
  sectionRef: React.RefObject<HTMLElement | null>,
  options?: SectionRevealOptions,
): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    // When the user prefers reduced motion, skip all animation and ensure
    // every reveal target is fully visible from the start.
    if (prefersReducedMotion) {
      const elements = section.querySelectorAll<HTMLElement>("[data-reveal]");
      elements.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const elements = section.querySelectorAll("[data-reveal]");
      if (!elements.length) return;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: options?.y ?? PRESETS.fadeUp.from.y,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? DURATIONS.slow,
          stagger: options?.stagger ?? STAGGER.normal,
          ease: options?.ease ?? EASINGS.snappy,
          scrollTrigger: {
            trigger: section,
            start: options?.start ?? "top 80%",
            once: true,
          },
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [
    sectionRef,
    prefersReducedMotion,
    options?.start,
    options?.y,
    options?.stagger,
    options?.duration,
    options?.ease,
  ]);
}

// ---------------------------------------------------------------------------
// useParallax
// ---------------------------------------------------------------------------

/** Options accepted by {@link useParallax}. */
export interface ParallaxOptions {
  /** ScrollTrigger `start` value. @default "top bottom" */
  start?: string;
  /** ScrollTrigger `end` value. @default "bottom top" */
  end?: string;
}

/**
 * Applies a scroll-linked parallax translation to an element.
 *
 * The element is translated vertically by `speed * 100 %` of the scroll
 * distance between the trigger's `start` and `end` positions, producing
 * a subtle depth effect. The tween is scrubbed (continuously updated)
 * so it stays perfectly in sync with the scroll position.
 *
 * Automatically disabled when the user prefers reduced motion.
 *
 * @param elementRef - React ref pointing to the element to parallax.
 * @param speed      - Multiplier for the translation distance.
 *                     Positive values move the element downward as the
 *                     user scrolls; negative values move it upward.
 *                     @default 0.3
 * @param options    - Optional ScrollTrigger start/end overrides.
 *
 * @example
 * ```tsx
 * const imgRef = useRef<HTMLDivElement>(null);
 * useParallax(imgRef, 0.2);
 *
 * return <div ref={imgRef}><img src="/hero.jpg" /></div>;
 * ```
 */
export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  speed: number = 0.3,
  options?: ParallaxOptions,
): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = elementRef.current;
    if (!el || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: `${speed * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: options?.start ?? "top bottom",
          end: options?.end ?? "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, [elementRef, speed, prefersReducedMotion, options?.start, options?.end]);
}

// ---------------------------------------------------------------------------
// useSplitTextHighlight
// ---------------------------------------------------------------------------

/** Options accepted by {@link useSplitTextHighlight}. */
export interface SplitTextHighlightOptions {
  /** ScrollTrigger `start` value. @default "top 90%" */
  start?: string;
  /** ScrollTrigger `end` value. @default "center 40%" */
  end?: string;
  /** Initial opacity for faded characters (0–1). @default 0.2 */
  fade?: number;
  /** Stagger between characters (seconds). @default 0.1 */
  stagger?: number;
}

/**
 * Scroll-scrubbed SplitText highlight animation.
 *
 * Splits the text content of all elements matching `[data-highlight-text]`
 * inside the scope into individual characters, then animates them from a
 * faded state to full opacity as the user scrolls through the trigger zone.
 *
 * Each target element can override defaults via data attributes:
 * - `data-highlight-scroll-start` → ScrollTrigger start
 * - `data-highlight-scroll-end`   → ScrollTrigger end
 * - `data-highlight-fade`         → initial char opacity
 * - `data-highlight-stagger`      → char stagger delay
 *
 * Automatically disabled when the user prefers reduced motion.
 */
export function useSplitTextHighlight(
  scopeRef: React.RefObject<HTMLElement | null>,
  options?: SplitTextHighlightOptions,
): void {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope || prefersReducedMotion) return;

    const targets = scope.querySelectorAll<HTMLElement>("[data-highlight-text]");
    if (!targets.length) return;

    const contexts: gsap.Context[] = [];

    targets.forEach((heading) => {
      const scrollStart =
        heading.getAttribute("data-highlight-scroll-start") ??
        options?.start ??
        "top 90%";
      const scrollEnd =
        heading.getAttribute("data-highlight-scroll-end") ??
        options?.end ??
        "center 40%";
      const fadedValue = parseFloat(
        heading.getAttribute("data-highlight-fade") ??
          String(options?.fade ?? 0.2),
      );
      const staggerValue = parseFloat(
        heading.getAttribute("data-highlight-stagger") ??
          String(options?.stagger ?? 0.1),
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const split = new SplitText(heading, {
        type: "words,chars",
        autoSplit: true,
        onSplit(self: SplitText) {
          const ctx = gsap.context(() => {
            const tl = gsap.timeline({
              scrollTrigger: {
                scrub: true,
                trigger: heading,
                start: scrollStart,
                end: scrollEnd,
              },
            });
            tl.from(self.chars, {
              autoAlpha: fadedValue,
              stagger: staggerValue,
              ease: "linear",
            });
          });
          contexts.push(ctx);
          return ctx;
        },
      });
    });

    return () => {
      contexts.forEach((ctx) => ctx.revert());
    };
  }, [
    scopeRef,
    prefersReducedMotion,
    options?.start,
    options?.end,
    options?.fade,
    options?.stagger,
  ]);
}
