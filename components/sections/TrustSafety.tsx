"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { useSectionReveal } from "@/components/motion/use-gsap";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface TrustCard {
  title: string;
}

interface TrustDictionary {
  trust: {
    title: string;
    subtitle: string;
    cta: string;
    cards: TrustCard[];
  };
}

interface TrustSafetyProps {
  dictionary: TrustDictionary;
}

/* -------------------------------------------------------------------------- */
/*  Card visual config — gradients & decorative SVG icons                     */
/* -------------------------------------------------------------------------- */

const cardGradients = [
  "bg-gradient-to-b from-teal-700 via-teal-800 to-deep",
  "bg-gradient-to-b from-deep-600 via-deep-700 to-deep",
  "bg-gradient-to-b from-deep-700 via-deep to-deep",
];

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="1" opacity="0.12" />
      <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
      <path
        d="M60 22C60 22 42 30 32 34V56C32 74 44 88 60 96C76 88 88 74 88 56V34C78 30 60 22 60 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.2"
        fill="currentColor"
        fillOpacity="0.04"
      />
      <path
        d="M48 58L56 66L72 50"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <ellipse cx="60" cy="85" rx="35" ry="8" fill="currentColor" fillOpacity="0.06" />
      <rect
        x="38" y="52" width="44" height="32" rx="6"
        stroke="currentColor" strokeWidth="1.5" opacity="0.2"
        fill="currentColor" fillOpacity="0.04"
      />
      <path
        d="M46 52V42C46 34.268 52.268 28 60 28C67.732 28 74 34.268 74 42V52"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.25"
      />
      <circle cx="60" cy="66" r="4" fill="currentColor" fillOpacity="0.25" />
      <path d="M60 70V76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.25" />
    </svg>
  );
}

function TrackingIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      aria-hidden="true"
    >
      <circle cx="60" cy="60" r="45" stroke="currentColor" strokeWidth="0.5" opacity="0.08" />
      <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="0.5" opacity="0.12" />
      <circle cx="60" cy="60" r="19" stroke="currentColor" strokeWidth="0.5" opacity="0.16" />
      <path
        d="M60 30C49.507 30 41 38.507 41 49C41 64.5 60 86 60 86C60 86 79 64.5 79 49C79 38.507 70.493 30 60 30Z"
        stroke="currentColor" strokeWidth="1.5" opacity="0.2"
        fill="currentColor" fillOpacity="0.05"
      />
      <circle cx="60" cy="49" r="7" stroke="currentColor" strokeWidth="1.5" opacity="0.25" />
      <circle cx="60" cy="49" r="3" fill="currentColor" fillOpacity="0.3" />
    </svg>
  );
}

const cardIcons = [ShieldIcon, LockIcon, TrackingIcon];

/* -------------------------------------------------------------------------- */
/*  TrustSafety                                                               */
/* -------------------------------------------------------------------------- */

export default function TrustSafety({ dictionary }: TrustSafetyProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useSectionReveal(sectionRef, { stagger: 0.08 });

  const { trust } = dictionary;

  return (
    <section
      ref={sectionRef}
      aria-label={trust.title}
      className="bg-white py-28 md:py-36 lg:py-44"
    >
      <div className="container-guana">
        {/* ── Section header ───────────────────────────────────────── */}
        <div data-reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading u-text-h1 font-bold text-deep">
            {trust.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl u-text-large text-deep/60">
            {trust.subtitle}
          </p>
        </div>

        {/* ── CTA button ───────────────────────────────────────────── */}
        <div data-reveal className="mt-10 flex justify-center md:mt-12">
          <Button
            href="/safety"
            variant="secondary"
            size="lg"
            className="rounded-full"
          >
            {trust.cta}
          </Button>
        </div>

        {/* ── Feature cards ────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-1 gap-fluid-3 sm:grid-cols-2 lg:grid-cols-3 md:mt-20">
          {trust.cards.map((card, i) => {
            const Icon = cardIcons[i];
            return (
              <div key={i} data-reveal>
                <div
                  className={`relative flex flex-col overflow-hidden rounded-2xl text-white ${cardGradients[i]}`}
                  style={{ minHeight: "clamp(24rem, 30vw, 30rem)" }}
                >
                  {/* Card title */}
                  <div className="relative z-10 p-7 pb-0 lg:p-9 lg:pb-0">
                    <h3 className="max-w-[16em] font-heading u-text-h4 font-bold">
                      {card.title}
                    </h3>
                  </div>

                  {/* Decorative icon */}
                  <div className="pointer-events-none mt-auto flex items-end justify-center px-7 pb-7 text-white/80 lg:px-9 lg:pb-9">
                    <div className="h-36 w-36 md:h-44 md:w-44">
                      {Icon && <Icon />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
