import Link from "next/link";
import { localePath } from "@/lib/utils";
import { GuanaLogo } from "@/components/ui/GuanaLogo";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";

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
  const { footer } = dictionary;

  return (
    <footer className="pt-10 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px]">
        {/* Logo — centered */}
        <div className="flex justify-center mb-8">
          <GuanaLogo height={96} />
        </div>

        {/* Tagline — centered */}
        <p className="text-[20px] font-sans font-normal text-black text-center max-w-[293px] mx-auto leading-[1.2]">
          {footer.tagline}
        </p>

        {/* Divider */}
        <div className="border-t border-black/10 mt-8 pt-6">
          {/* Bottom row: legal left | language toggle right */}
          <div className="flex items-center justify-between">
            <div className="flex gap-[30px] items-center">
              <Link href={localePath("/legal/privacy", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
                {footer.privacy}
              </Link>
              <Link href={localePath("/legal/terms", locale)} className="text-[16px] font-sans font-normal text-black hover:text-black/60 transition-colors">
                {footer.terms}
              </Link>
            </div>
            <LanguageSwitch locale={locale} />
          </div>
        </div>
      </div>
    </footer>
  );
}
