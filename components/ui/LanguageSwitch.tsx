"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitchProps {
  locale: string;
  ariaLabel?: string;
  className?: string;
}

export function LanguageSwitch({ locale, ariaLabel, className }: LanguageSwitchProps) {
  const pathname = usePathname();

  const otherLocale = locale === "en" ? "es" : "en";
  const label = otherLocale.toUpperCase();

  // Build the equivalent path in the other locale
  let targetPath: string;

  if (otherLocale === "en") {
    // Switching from ES to EN: prefix with /en
    targetPath = `/en${pathname}`;
  } else {
    // Switching from EN to ES: strip the /en prefix
    targetPath = pathname.replace(/^\/en/, "") || "/";
  }

  const handleClick = () => {
    document.cookie = `NEXT_LOCALE=${otherLocale};path=/;max-age=31536000;SameSite=Lax`;
  };

  return (
    <Link
      href={targetPath}
      locale={false}
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-deep/10 px-3 py-1.5",
        "text-xs font-semibold tracking-wide text-deep/70",
        "transition-colors duration-200 ease-out",
        "hover:bg-deep/5 hover:text-deep",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light",
        className,
      )}
      aria-label={ariaLabel ?? `Switch to ${otherLocale === "es" ? "Spanish" : "English"}`}
    >
      {label}
    </Link>
  );
}
