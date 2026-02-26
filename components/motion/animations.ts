/**
 * Standardized animation constants and GSAP defaults for the Guana
 * motion system.
 *
 * Import individual tokens or full groups to keep animations consistent
 * across the entire site:
 *
 * ```ts
 * import { DURATIONS, EASINGS, PRESETS } from "@/components/motion/animations";
 * ```
 */

// ---------------------------------------------------------------------------
// Durations (seconds)
// ---------------------------------------------------------------------------

/** Canonical duration tokens used across all GSAP tweens. */
export const DURATIONS = {
  /** Quick micro-interactions (tooltips, toggles). */
  fast: 0.3,
  /** Standard transitions (fade-ins, slides). */
  normal: 0.6,
  /** Deliberate, hero-level reveals. */
  slow: 0.85,
  /** Extra-slow dramatic entrances. */
  xslow: 1.2,
} as const;

/** Type helper for duration keys. */
export type DurationKey = keyof typeof DURATIONS;

// ---------------------------------------------------------------------------
// Easings (GSAP string format)
// ---------------------------------------------------------------------------

/**
 * Named easing curves written in GSAP's string notation so they can be
 * passed directly to `gsap.to()` / `gsap.fromTo()`.
 */
export const EASINGS = {
  /** Gentle deceleration -- good for most reveals. */
  smooth: "power2.out",
  /** Symmetric acceleration/deceleration for looping motions. */
  smoothInOut: "power2.inOut",
  /** Punchy deceleration -- good for elements that "land" in place. */
  snappy: "power3.out",
  /** Slight overshoot that settles back -- playful entrances. */
  bounce: "back.out(1.2)",
  /** Springy overshoot -- use sparingly for emphasis. */
  elastic: "elastic.out(1, 0.5)",
} as const;

/** Type helper for easing keys. */
export type EasingKey = keyof typeof EASINGS;

// ---------------------------------------------------------------------------
// Stagger values (seconds between each child)
// ---------------------------------------------------------------------------

/** Stagger intervals for sequenced child animations. */
export const STAGGER = {
  /** Almost simultaneous -- dense grids, icon sets. */
  tight: 0.04,
  /** Default cadence for list/card reveals. */
  normal: 0.08,
  /** Slightly slower -- good for fewer, larger elements. */
  relaxed: 0.12,
  /** Pronounced delay between items -- cinematic reveals. */
  wide: 0.2,
} as const;

/** Type helper for stagger keys. */
export type StaggerKey = keyof typeof STAGGER;

// ---------------------------------------------------------------------------
// Preset animation configs (for gsap.fromTo)
// ---------------------------------------------------------------------------

/** Reusable `from` / `to` pairs for common entrance animations. */
export const PRESETS = {
  /** Fade in while sliding up from below. */
  fadeUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
  },
  /** Simple opacity fade with no positional movement. */
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  /** Fade in while sliding in from the left. */
  fadeRight: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0 },
  },
  /** Fade in while sliding in from the right. */
  fadeLeft: {
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0 },
  },
  /** Fade in while scaling up from 90%. */
  scaleIn: {
    from: { opacity: 0, scale: 0.9 },
    to: { opacity: 1, scale: 1 },
  },
  /** Clip-style slide from fully off-screen below to in-place. */
  slideUp: {
    from: { y: "100%" },
    to: { y: "0%" },
  },
} as const;

/** Type helper for preset keys. */
export type PresetKey = keyof typeof PRESETS;
