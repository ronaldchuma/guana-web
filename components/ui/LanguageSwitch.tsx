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

  const otherLocale = locale === "en" ? "es" : "en";
  const label = otherLocale.toUpperCase();

  // Build the equivalent path in the other locale
  let targetPath: string;

  if (otherLocale === "es") {
    // Switching from EN to ES: prefix with /es
    targetPath = `/es${pathname}`;
  } else {
    // Switching from ES to EN: strip the /es prefix
    targetPath = pathname.replace(/^\/es/, "") || "/";
  }

  return (
    <Link
      href={targetPath}
      locale={false}
      className={cn(
        "inline-flex items-center justify-center rounded-lg border border-deep/10 px-3 py-1.5",
        "text-xs font-semibold tracking-wide text-deep/70",
        "transition-colors duration-200 ease-out",
        "hover:bg-deep/5 hover:text-deep",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-light",
        className,
      )}
      aria-label={`Switch to ${otherLocale === "es" ? "Spanish" : "English"}`}
    >
      {label}
    </Link>
  );
}
