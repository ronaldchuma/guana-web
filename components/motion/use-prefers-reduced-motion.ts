"use client";

import { useState, useEffect } from "react";

/**
 * Media query string for detecting reduced-motion preference.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
 */
const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Detects whether the user has requested reduced motion via their
 * operating system or browser accessibility settings.
 *
 * Defaults to `false` (animations allowed) during SSR and initial hydration.
 * This is safe because animation hooks run in effects (post-hydration) and
 * CSS `[data-reveal] { opacity: 0 }` handles the pre-JS state. After mount,
 * the actual media query value is read and subscribed to live changes.
 *
 * @returns `true` when the user prefers reduced motion, `false` otherwise.
 */
export function usePrefersReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent): void => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
