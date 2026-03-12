"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { MEDIA } from "@/lib/media";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  // Top-left — "Verified drivers & riders"
  { src: MEDIA.moments[3], label: "Verified drivers & riders",  rotate: -8,  left: "18%", top: "8%",  pos: "center" },
  // Top-center — "Every major route, covered"
  { src: MEDIA.moments[5], label: "Every major route, covered",  rotate: 2,   left: "40%", top: "0%",  pos: "center top" },
  // Top-right — "Share costs, not strangers"
  { src: MEDIA.moments[1], label: "Share costs, not strangers",  rotate: 8,   left: "62%", top: "4%",  pos: "center" },
  // Mid-left — "Built for Costa Rica's roads"
  { src: MEDIA.moments[4], label: "Built for Costa Rica's roads", rotate: -6,  left: "5%",  top: "38%", pos: "center" },
  // Mid-right — "Diay, vamos"
  { src: MEDIA.moments[0], label: "Diay, vamos",                  rotate: 6,   left: "82%", top: "28%", pos: "center" },
  // Bot-left — "Que buena nota mae"
  { src: MEDIA.moments[2], label: "Que buena nota mae",           rotate: -12, left: "15%", top: "68%", pos: "center" },
  // Bot-center — "Tico-built, road-tested"
  { src: MEDIA.moments[6], label: "Tico-built, road-tested",      rotate: 4,   left: "42%", top: "74%", pos: "center 40%" },
  // Bot-right — "Pura Vida"
  { src: MEDIA.moments[2], label: "Pura Vida",                    rotate: 10,  left: "68%", top: "64%", pos: "center" },
] as const;

interface SocialProofCardsProps {
  dictionary: {
    cta: { title: string; subtitle: string };
    nav: { download: string };
  };
}

export default function SocialProofCards({ dictionary }: SocialProofCardsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!section || cards.length === 0) return;

    // Set initial state: centered, blurred, invisible
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      left: "50%",
      top: "50%",
      opacity: 0,
      filter: "blur(12px)",
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
      const data = CARDS[i];
      tl.to(
        card,
        {
          left: data.left,
          top: data.top,
          xPercent: 0,
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
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
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-28 md:py-36"
      style={{ minHeight: "clamp(520px, 90vw, 800px)" }}
    >
      {/* Scattered photo cards */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
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
            style={{ fontSize: "clamp(1.75rem, 4vw, 50px)", lineHeight: 1.1 }}
          >
            Your next ride starts here
          </h2>
          <p className="text-[16px] sm:text-[18px] font-sans font-normal text-black leading-[1.3] max-w-[440px]">
            {"Guana connects Costa Rica's roads with the people already traveling them. Be first on the list."}
          </p>
          <a
            href="#waitlist"
            className="inline-flex items-center px-[24px] sm:px-[30px] py-[10px] rounded-full bg-brand-blue hover:bg-brand-blue-hover text-white text-[16px] sm:text-[18px] font-sans font-normal transition-colors duration-200 mt-2"
          >
            {dictionary.nav.download ?? "Join waitlist"}
          </a>
        </div>
      </div>
    </section>
  );
}
