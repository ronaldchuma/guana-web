import Link from "next/link";
import { localePath } from "@/lib/utils";
import { GuanaLogo } from "@/components/ui/GuanaLogo";

interface FooterProps {
  locale: string;
  dictionary: {
    footer: {
      tagline: string;
      privacy: string;
      terms: string;
    };
    nav: {
      home: string;
    };
  };
}

export function Footer({ locale, dictionary }: FooterProps) {
  const { footer, nav } = dictionary;

  return (
    <footer className="pt-10 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px]">
        {/* Logo — centered */}
        <div className="flex justify-center mb-8">
          <GuanaLogo height={96} />
        </div>

        {/* Bottom row: nav left | tagline center | legal right */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex gap-[30px] items-center">
            <Link href={localePath("/", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
              {nav.home}
            </Link>
          </div>

          <p className="text-[20px] font-sans font-normal text-black text-center max-w-[293px] leading-[1.2]">
            {footer.tagline}
          </p>

          <div className="flex gap-[30px] items-center justify-end">
            <Link href={localePath("/legal/privacy", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
              {footer.privacy}
            </Link>
            <Link href={localePath("/legal/terms", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
              {footer.terms}
            </Link>
          </div>
        </div>

        {/* Mobile fallback */}
        <div className="flex md:hidden flex-col items-center gap-4">
          <p className="text-[20px] font-sans font-normal text-black text-center max-w-[293px] leading-[1.2]">
            {footer.tagline}
          </p>
          <div className="flex gap-[30px] items-center">
            <Link href={localePath("/", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
              {nav.home}
            </Link>
          </div>
          <div className="flex gap-[30px] items-center">
            <Link href={localePath("/legal/privacy", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
              {footer.privacy}
            </Link>
            <Link href={localePath("/legal/terms", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
              {footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
