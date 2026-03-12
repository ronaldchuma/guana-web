"use client";

import { useRef } from "react";
import { useSplitTextHighlight } from "@/components/motion/use-gsap";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  useSplitTextHighlight(sectionRef);

  return (
    <section ref={sectionRef} className="py-28 md:py-40 lg:py-52">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px]">
        <div
          data-highlight-text
          role="text"
          className="font-sans font-normal text-black text-center"
          style={{ fontSize: "clamp(1.75rem, 4vw, 50px)", lineHeight: 1 }}
        >
          {"Costa Rica's roads are already full of stories. Guana just connects them."}
        </div>
      </div>
    </section>
  );
}
