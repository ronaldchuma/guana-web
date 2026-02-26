"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn, localePath } from "@/lib/utils";
import {
  SOCIAL_LINKS,
  CONTACT_EMAIL,
  APP_STORE_URL,
  ROUTES,
} from "@/lib/tokens";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/* -------------------------------------------------------------------------- */
/*  Social SVG Icons                                                          */
/* -------------------------------------------------------------------------- */

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  whatsapp: WhatsAppIcon,
};

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface FooterProps {
  locale: string;
  dictionary: {
    nav: Record<string, string>;
    footer: Record<string, string>;
    common: Record<string, string>;
  };
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

export function Footer({ locale, dictionary }: FooterProps) {
  const { nav, footer } = dictionary;
  const footerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  /* ── GSAP scroll-triggered reveal ── */
  useEffect(() => {
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const el = footerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const revealItems = el.querySelectorAll("[data-reveal]");
      if (!revealItems.length) return;

      gsap.fromTo(
        revealItems,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <footer
      ref={footerRef}
      role="contentinfo"
      className="relative overflow-hidden"
    >
      {/* ═══════════════════════════════════════════════
          Background image — spans the entire footer
          ═══════════════════════════════════════════════ */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/e15fbf5a-678f-4b16-a096-332193e85e49.jpeg"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          quality={80}
          priority={false}
        />
        <div className="absolute inset-0 bg-deep/60" />
      </div>

      {/* ═══════════════════════════════════════════════
          Content — padded generously so the bg image shows
          ═══════════════════════════════════════════════ */}
      <div className="relative z-10 py-16 md:py-24 lg:py-32">
        <div className="container-guana">
          {/* ── White card with links ── */}
          <div
            className={cn(
              "rounded-2xl md:rounded-3xl",
              "bg-white/95 backdrop-blur-sm",
              "text-[#101010]",
              "px-10 md:px-14 lg:px-20 py-10 md:py-14",
            )}
          >
            {/* ── Large logo inside the card ── */}
            <div className="mb-10 md:mb-12" data-reveal>
              <Link
                href={localePath("/", locale)}
                className="inline-flex items-baseline gap-1 group"
                aria-label="Guana — Home"
              >
                <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-medium tracking-tighter text-[#101010]">
                  guana
                </span>
                <span
                  className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-teal group-hover:scale-125 transition-transform duration-200"
                  aria-hidden="true"
                />
              </Link>
            </div>

            {/* ── Link Grid ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-10 lg:gap-x-16">
              {/* ── Column 1: Ride with Guana ── */}
              <div data-reveal>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#101010]/40 mb-5">
                  {footer.ride ?? "Ride with Guana"}
                </p>
                <ul className="space-y-1" role="list">
                  {[
                    { href: ROUTES.routes, label: footer.popular_routes ?? "Popular Routes" },
                    { href: ROUTES.routes + "#airport", label: footer.airport_transfers ?? "Airport Transfers" },
                    { href: ROUTES.safety, label: nav.safety ?? "Safety" },
                    { href: ROUTES.faq, label: nav.faq ?? "FAQ" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localePath(link.href, locale)}
                        className="group/flink relative inline-flex items-center px-2.5 py-1.5 rounded-lg overflow-hidden text-base text-[#101010]/80 hover:text-[#101010] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        <span className="absolute inset-0 rounded-lg origin-bottom bg-[#101010]/[0.05] scale-y-0 group-hover/flink:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
                        <span className="relative z-[1]">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Column 2: Drive with Guana ── */}
              <div data-reveal>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#101010]/40 mb-5">
                  {footer.drive ?? "Drive with Guana"}
                </p>
                <ul className="space-y-1" role="list">
                  {[
                    { href: ROUTES.drivers, label: footer.become_driver ?? "Become a Driver" },
                    { href: ROUTES.support, label: footer.driver_resources ?? "Driver Resources" },
                    { href: ROUTES.safety, label: nav.safety ?? "Safety" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={localePath(link.href, locale)}
                        className="group/flink relative inline-flex items-center px-2.5 py-1.5 rounded-lg overflow-hidden text-base text-[#101010]/80 hover:text-[#101010] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        <span className="absolute inset-0 rounded-lg origin-bottom bg-[#101010]/[0.05] scale-y-0 group-hover/flink:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
                        <span className="relative z-[1]">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Column 3: Company ── */}
              <div data-reveal>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#101010]/40 mb-5">
                  {footer.company ?? "Company"}
                </p>
                <ul className="space-y-1" role="list">
                  {[
                    { href: ROUTES.about, label: nav.about ?? "About" },
                    { href: ROUTES.privacy, label: footer.privacy ?? "Privacy Policy" },
                    { href: ROUTES.terms, label: footer.terms ?? "Terms of Service" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link
                        href={localePath(link.href, locale)}
                        className="group/flink relative inline-flex items-center px-2.5 py-1.5 rounded-lg overflow-hidden text-base text-[#101010]/80 hover:text-[#101010] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      >
                        <span className="absolute inset-0 rounded-lg origin-bottom bg-[#101010]/[0.05] scale-y-0 group-hover/flink:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
                        <span className="relative z-[1]">{link.label}</span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="group/flink relative inline-flex items-center px-2.5 py-1.5 rounded-lg overflow-hidden text-base text-[#101010]/80 hover:text-[#101010] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      <span className="absolute inset-0 rounded-lg origin-bottom bg-[#101010]/[0.05] scale-y-0 group-hover/flink:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
                      <span className="relative z-[1]">{CONTACT_EMAIL}</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* ── Column 4: Get the App ── */}
              <div data-reveal>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#101010]/40 mb-5">
                  {footer.getApp ?? "Get the App"}
                </p>
                <p className="text-base text-[#101010]/50 leading-relaxed mb-6 max-w-[16.25rem]">
                  {footer.tagline}
                </p>
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center gap-3 px-5 py-2.5 rounded-xl",
                    "bg-[#101010] text-cream text-base font-semibold",
                    "hover:bg-[#101010]/90",
                    "transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
                  )}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                  <svg
                    className="w-3.5 h-3.5 opacity-60"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </a>

                {/* Social icons */}
                <div className="flex items-center gap-3 mt-6">
                  {Object.entries(SOCIAL_LINKS).map(([name, url]) => {
                    const Icon = SOCIAL_ICON_MAP[name];
                    return (
                      <a
                        key={name}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/flink relative inline-flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden text-[#101010]/50 hover:text-[#101010] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        aria-label={name}
                      >
                        <span className="absolute inset-0 rounded-lg origin-bottom bg-[#101010]/[0.05] scale-y-0 group-hover/flink:scale-y-100 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" aria-hidden="true" />
                        {Icon && <Icon className="relative z-[1] w-4.5 h-4.5" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Divider ── */}
            <div className="mt-10 md:mt-14 mb-5" aria-hidden="true">
              <div className="h-px w-full bg-[#101010]/10" />
            </div>

            {/* ── Bottom Bar ── */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[0.9375rem] text-[#101010]/40">
                {footer.copyright
                  ? footer.copyright.replace(
                      "{year}",
                      new Date().getFullYear().toString(),
                    )
                  : `\u00A9 ${new Date().getFullYear()} Guana. All rights reserved.`}
              </p>

              <p className="text-[0.9375rem] text-[#101010]/40">
                {footer.madeWith ?? (
                  <>
                    Made with{" "}
                    <span className="text-coral" aria-label="love">
                      &#9829;
                    </span>{" "}
                    in Costa Rica
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
