import Image from "next/image";
import { MEDIA } from "@/lib/media";
import WaitlistForm from "@/components/ui/WaitlistForm";

interface FinalCTAProps {
  dictionary: {
    cta: {
      title: string;
      subtitle: string;
    };
  };
}

export default function FinalCTA({ dictionary }: FinalCTAProps) {
  return (
    <section id="waitlist" className="py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px]">
        <div className="flex flex-col items-center gap-[30px]">
          {/* App mockup — fading from bottom */}
          <div className="relative w-[470px] max-w-full h-[398px] -mb-16">
            <Image
              src={MEDIA.phoneMockup}
              alt="Guana app"
              fill
              className="object-contain object-top"
              sizes="470px"
            />
            {/* Fade gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-[10px] text-center max-w-[595px]">
            {/* Eyebrow */}
            <span className="text-[18px] font-sans font-normal bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              Early access
            </span>
            <div className="flex flex-col gap-5 items-center">
              <h2
                className="font-sans font-normal text-black"
                style={{ fontSize: "clamp(2rem, 4vw, 50px)", lineHeight: 1 }}
              >
                {dictionary.cta.title}
              </h2>
              <p className="text-[18px] font-sans font-normal text-black leading-[1.2] max-w-[440px]">
                {dictionary.cta.subtitle}
              </p>
            </div>
          </div>

          {/* Waitlist form */}
          <WaitlistForm variant="stacked" />
        </div>
      </div>
    </section>
  );
}
