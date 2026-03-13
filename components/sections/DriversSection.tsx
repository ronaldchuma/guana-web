import Image from "next/image";
import { MEDIA } from "@/lib/media";

/* Inline check icon for all cards */
function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 3.33989C18.5083 4.21075 19.7629 5.46042 20.6398 6.96519C21.5167 8.46997 21.9854 10.1777 21.9994 11.9192C22.0135 13.6608 21.5725 15.3758 20.72 16.8946C19.8676 18.4133 18.6332 19.6831 17.1392 20.5782C15.6452 21.4733 13.9434 21.9627 12.2021 21.998C10.4608 22.0332 8.74055 21.6131 7.21155 20.7791C5.68256 19.9452 4.39787 18.7264 3.48467 17.2434C2.57146 15.7604 2.06141 14.0646 2.005 12.3239L2 11.9999L2.005 11.6759C2.061 9.94888 2.56355 8.26585 3.46364 6.79089C4.36373 5.31592 5.63065 4.09934 7.14089 3.25977C8.65113 2.42021 10.3531 1.98629 12.081 2.00033C13.8089 2.01437 15.5036 2.47589 17 3.33989ZM15.707 9.29289C15.5348 9.12072 15.3057 9.01729 15.0627 9.002C14.8197 8.98672 14.5794 9.06064 14.387 9.20989L14.293 9.29289L11 12.5849L9.707 11.2929L9.613 11.2099C9.42058 11.0607 9.18037 10.9869 8.9374 11.0022C8.69444 11.0176 8.46541 11.121 8.29326 11.2932C8.12112 11.4653 8.01768 11.6943 8.00235 11.9373C7.98702 12.1803 8.06086 12.4205 8.21 12.6129L8.293 12.7069L10.293 14.7069L10.387 14.7899C10.5624 14.926 10.778 14.9998 11 14.9998C11.222 14.9998 11.4376 14.926 11.613 14.7899L11.707 14.7069L15.707 10.7069L15.79 10.6129C15.9393 10.4205 16.0132 10.1802 15.9979 9.93721C15.9826 9.69419 15.8792 9.46509 15.707 9.29289Z" fill="#002600"/>
    </svg>
  );
}

interface DriversSectionProps {
  dictionary: {
    driversSection: {
      eyebrow: string;
      title: string;
      subtitle: string;
      benefits: string[];
      cta: string;
      photoAlt: string;
    };
  };
}

export default function DriversSection({ dictionary }: DriversSectionProps) {
  const { driversSection } = dictionary;

  return (
    <section id="drivers" className="py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px]">
        {/* Section header */}
        <div className="text-center mb-14 flex flex-col items-center gap-[10px]">
          <span className="text-[18px] font-sans font-normal bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
            {driversSection.eyebrow}
          </span>
          <div className="flex flex-col gap-5 items-center">
            <h2
              className="font-sans font-normal text-black"
              style={{ fontSize: "clamp(2rem, 4vw, 50px)", lineHeight: 1 }}
            >
              {driversSection.title}
            </h2>
            <p className="text-[18px] font-sans font-normal text-black leading-[1.2] max-w-[440px]">
              {driversSection.subtitle}
            </p>
          </div>
        </div>

        {/* Two-column layout — stacks on mobile */}
        <div className="flex flex-col md:flex-row gap-5 items-start">
          {/* Left: lifestyle photo */}
          <div className="w-full md:flex-1 rounded-[10px] overflow-hidden h-[280px] md:h-[388px]">
            <Image
              src={MEDIA.driversPhoto}
              alt={driversSection.photoAlt}
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: benefit cards grid */}
          <div className="w-full md:flex-[1.4] flex flex-col gap-3 md:gap-5">
            {/* Row 1 */}
            <div className="flex gap-3 md:gap-5">
              {driversSection.benefits.slice(0, 2).map((label) => (
                <div
                  key={label}
                  className="flex-1 bg-[#f2f2f2] rounded-[10px] p-4 md:p-5 flex flex-col justify-between gap-3 h-[100px] md:h-[116px]"
                >
                  <CheckIcon />
                  <p className="font-sans font-normal text-[16px] md:text-[18px] text-black leading-[1.2]">{label}</p>
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-3 md:gap-5">
              {driversSection.benefits.slice(2, 4).map((label) => (
                <div
                  key={label}
                  className="flex-1 bg-[#f2f2f2] rounded-[10px] p-4 md:p-5 flex flex-col justify-between gap-3 h-[100px] md:h-[116px]"
                >
                  <CheckIcon />
                  <p className="font-sans font-normal text-[16px] md:text-[18px] text-black leading-[1.2]">{label}</p>
                </div>
              ))}
            </div>

            {/* Row 3 */}
            <div className="flex gap-3 md:gap-5">
              <div className="flex-1 bg-[#f2f2f2] rounded-[10px] p-4 md:p-5 flex flex-col justify-between gap-3 h-[100px] md:h-[116px]">
                <CheckIcon />
                <p className="font-sans font-normal text-[16px] md:text-[18px] text-black leading-[1.2]">{driversSection.benefits[4]}</p>
              </div>

              {/* CTA card — golden gradient */}
              <a
                href="#waitlist"
                className="group flex-1 rounded-[10px] p-4 md:p-5 flex flex-col justify-end h-[100px] md:h-[116px] relative overflow-hidden"
                style={{ background: "linear-gradient(109.5deg, #ffd66f 0%, #ffb600 100%)" }}
              >
                {/* Shine sweep */}
                <div className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                <p className="relative font-sans font-normal text-[16px] md:text-[18px] text-black leading-[1.2]">{driversSection.cta}</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
