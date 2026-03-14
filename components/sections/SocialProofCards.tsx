"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MEDIA } from "@/lib/media";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSPlugin } from "gsap/CSSPlugin";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CSSPlugin);
}

/* Desktop positions */
const CARD_LAYOUT = [
  { src: MEDIA.moments[3], rotate: -8,  left: "18%", top: "8%",  pos: "center" },
  { src: MEDIA.moments[5], rotate: 2,   left: "40%", top: "0%",  pos: "center top" },
  { src: MEDIA.moments[1], rotate: 8,   left: "62%", top: "4%",  pos: "center" },
  { src: MEDIA.moments[4], rotate: -6,  left: "5%",  top: "38%", pos: "center" },
  { src: MEDIA.moments[0], rotate: 6,   left: "82%", top: "28%", pos: "center" },
  { src: MEDIA.moments[2], rotate: -12, left: "15%", top: "68%", pos: "center" },
  { src: MEDIA.moments[6], rotate: 4,   left: "42%", top: "74%", pos: "center 40%" },
  { src: MEDIA.moments[2], rotate: 10,  left: "68%", top: "64%", pos: "center" },
] as const;

/* Mobile positions — push cards to top/bottom edges, keep center clear for text */
const CARD_LAYOUT_MOBILE = [
  { src: MEDIA.moments[3], rotate: -8,  left: "2%",  top: "8%",  pos: "center" },
  { src: MEDIA.moments[5], rotate: 2,   left: "35%", top: "4%",  pos: "center top" },
  { src: MEDIA.moments[1], rotate: 8,   left: "68%", top: "6%",  pos: "center" },
  { src: MEDIA.moments[4], rotate: -6,  left: "-8%", top: "32%", pos: "center" },
  { src: MEDIA.moments[0], rotate: 6,   left: "88%", top: "26%", pos: "center" },
  { src: MEDIA.moments[2], rotate: -12, left: "2%",  top: "68%", pos: "center" },
  { src: MEDIA.moments[6], rotate: 4,   left: "35%", top: "72%", pos: "center 40%" },
  { src: MEDIA.moments[2], rotate: 10,  left: "68%", top: "66%", pos: "center" },
] as const;

interface SocialProofCardsProps {
  dictionary: {
    cta: { title: string; subtitle: string };
    nav: { download: string };
    socialProof: {
      cards: string[];
      heading: string;
      subtitle: string;
    };
  };
}

function getLayout() {
  return typeof window !== "undefined" && window.innerWidth < 640
    ? CARD_LAYOUT_MOBILE
    : CARD_LAYOUT;
}

export default function SocialProofCards({ dictionary }: SocialProofCardsProps) {
  const { socialProof } = dictionary;
  const CARDS = CARD_LAYOUT.map((layout, i) => ({
    ...layout,
    label: socialProof.cards[i] ?? "",
  }));

  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;

    const layout = getLayout();

    // When reduced motion is preferred, place cards at final positions immediately
    if (prefersReducedMotion) {
      cards.forEach((card, i) => {
        const data = layout[i];
        gsap.set(card, {
          left: data.left,
          top: data.top,
          opacity: 1,
          scale: 1,
          rotate: data.rotate,
        });
      });
      return;
    }

    // Set initial state: centered, invisible (use opacity instead of blur for perf)
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      left: "50%",
      top: "50%",
      opacity: 0,
      scale: 0.6,
      rotate: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "top 20%",
        toggleActions: "play none none none",
      },
    });

    cards.forEach((card, i) => {
      const data = layout[i];
      tl.to(
        card,
        {
          left: data.left,
          top: data.top,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotate: data.rotate,
          duration: 1.2,
          ease: "back.out(0.8)",
        },
        i * 0.06
      );
    });

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative py-48 sm:py-28 md:py-36 overflow-hidden"
      style={{ minHeight: "clamp(750px, 115vw, 800px)" }}
    >
      {/* Scattered photo cards */}
      {/* On mobile: wider container (-15% each side) so %-based positions spread cards further apart */}
      <div className="absolute top-0 bottom-0 -left-[15%] -right-[15%] sm:left-0 sm:right-0 pointer-events-none select-none overflow-visible sm:overflow-hidden" aria-hidden="true">
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className="absolute will-change-transform"
            style={{
              left: card.left,
              top: card.top,
              transform: `rotate(${card.rotate}deg)`,
            }}
          >
            <div className="relative w-[100px] h-[118px] sm:w-[130px] sm:h-[153px] md:w-[152px] md:h-[179px] rounded-[10px] overflow-hidden shadow-lg">
              <Image
                src={card.src}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: card.pos }}
                sizes="(min-width: 768px) 152px, (min-width: 640px) 130px, 100px"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[37%] to-black/80 rounded-[10px]" />
              <p className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 text-white text-[11px] sm:text-[13px] md:text-[14px] font-sans font-normal leading-[1.2]">
                {card.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Center content — absolutely centered */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
        <div className="flex flex-col gap-3 sm:gap-5 items-center max-w-[495px]">
          <h2
            className="font-sans font-normal text-black"
            style={{ fontSize: "clamp(2.25rem, 5vw, 50px)", lineHeight: 1.1 }}
          >
            {socialProof.heading}
          </h2>
          <p className="text-[16px] sm:text-[18px] font-sans font-normal text-black leading-[1.3] max-w-[440px]">
            {socialProof.subtitle}
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center px-[24px] sm:px-[30px] py-[10px] rounded-full bg-brand-blue hover:bg-brand-blue-hover text-lime text-[16px] sm:text-[18px] font-sans font-normal transition-colors duration-200 mt-2"
          >
            {dictionary.nav.download}
          </a>
        </div>
      </div>
    </section>
  );
}
