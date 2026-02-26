"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ force3D: true });
}

/**
 * Initialises Lenis smooth scrolling and keeps GSAP ScrollTrigger in sync.
 *
 * Renders nothing — mount once near the root of the component tree.
 * Automatically disabled when the user prefers reduced motion.
 */
export function SmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Keep ScrollTrigger in sync with Lenis scroll position
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's shared ticker for frame-perfect sync
    const onTick = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker uses seconds, Lenis expects ms
    };
    gsap.ticker.add(onTick);

    // Lenis manages its own rAF when driven by the ticker
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return null;
}
