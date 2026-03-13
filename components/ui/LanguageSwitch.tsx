"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  locale: string;
  className?: string;
}

export function LanguageSwitch({ locale, className }: LanguageSwitchProps) {
  const pathname = usePathname();

  function buildPath(targetLocale: string) {
    if (targetLocale === "es") {
      // Strip /en prefix to get bare path
      return pathname.replace(/^\/en/, "") || "/";
    }
    // Add /en prefix
    return `/en${pathname.replace(/^\/en/, "") || ""}`;
  }

  const handleClick = (targetLocale: string) => {
    document.cookie = `NEXT_LOCALE=${targetLocale};path=/;max-age=31536000;SameSite=Lax`;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 overflow-hidden",
        className,
      )}
    >
      {(["ES", "EN"] as const).map((lang) => {
        const code = lang.toLowerCase();
        const isActive = locale === code;

        if (isActive) {
          return (
            <span
              key={lang}
              className="px-3 py-1.5 text-xs font-semibold tracking-wide bg-black text-white cursor-default"
            >
              {lang}
            </span>
          );
        }

        return (
          <Link
            key={lang}
            href={buildPath(code)}
            locale={false}
            onClick={() => handleClick(code)}
            className="px-3 py-1.5 text-xs font-semibold tracking-wide text-black/50 hover:text-black transition-colors"
          >
            {lang}
          </Link>
        );
      })}
    </div>
  );
}
