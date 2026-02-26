"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/* -------------------------------------------------------------------------- */
/*  Plugin registration                                                       */
/* -------------------------------------------------------------------------- */

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/*  Gallery images — Costa Rica vibes                                         */
/* -------------------------------------------------------------------------- */

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=600&h=600&fit=crop",
    alt: "Costa Rica jungle road",
  },
  {
    src: "https://images.unsplash.com/photo-1518259102261-b57b7f219b5a?w=600&h=600&fit=crop",
    alt: "Tropical beach sunset",
  },
  {
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=600&fit=crop",
    alt: "Palm-lined coast",
  },
  {
    src: "https://images.unsplash.com/photo-1502680390548-bdbac40a5e48?w=600&h=600&fit=crop",
    alt: "Friends on the road",
  },
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=600&fit=crop",
    alt: "White sand beach",
  },
  {
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&h=600&fit=crop",
    alt: "Surf break waves",
  },
  {
    src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=600&fit=crop",
    alt: "Mountain road vista",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=600&fit=crop",
    alt: "Volcanic landscape",
  },
];

const TOTAL = GALLERY_IMAGES.length;
const ROTATION_STEP = 360 / TOTAL; // 45° per slot

/* -------------------------------------------------------------------------- */
/*  ScrollGallery                                                             */
/* -------------------------------------------------------------------------- */

export default function ScrollGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container || prefersReducedMotion) return;

    const wrappers = container.querySelectorAll<HTMLElement>("[data-gallery-wrapper]");
    const images = container.querySelectorAll<HTMLElement>("[data-gallery-img]");

    if (!wrappers.length || !images.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: container,
        },
      });

      tl.to(
        wrappers,
        {
          rotation: "+=180",
          duration: 1,
          ease: "none",
          stagger: 0.04,
        },
        0,
      );

      tl.fromTo(
        images,
        {
          x: "60vw",
          rotation: 0,
          autoAlpha: 0,
        },
        {
          x: "0vw",
          rotation: "-=180",
          autoAlpha: 1,
          duration: 1,
          ease: "none",
          stagger: 0.04,
        },
        0,
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  /* ── Reduced-motion fallback: simple grid ──────────────────────────── */
  if (prefersReducedMotion) {
    return (
      <section className="bg-white py-28 md:py-36">
        <div className="container-guana">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Animated version ──────────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={{ height: "500vh" }}
    >
      {/* Pinned container — centered in viewport */}
      <div
        ref={containerRef}
        className="flex h-screen w-full items-center justify-center overflow-hidden"
      >
        {/* Square stage */}
        <div
          className="relative"
          style={{
            width: "min(18vw, 280px)",
            aspectRatio: "1 / 1",
          }}
        >
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              data-gallery-wrapper
              className="absolute inset-0"
              style={{
                rotate: `${ROTATION_STEP * i}deg`,
              }}
            >
              <div
                data-gallery-img
                className="absolute inset-0 overflow-hidden rounded-xl"
                style={{ visibility: "hidden" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="min(18vw, 280px)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
