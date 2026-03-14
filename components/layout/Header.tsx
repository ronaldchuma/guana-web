"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CSSPlugin } from "gsap/CSSPlugin";
import { cn, localePath } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/tokens";
import { GuanaLogo } from "@/components/ui/GuanaLogo";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CSSPlugin);
}

/* ── Section anchors for ScrollTrigger ── */
const SECTION_IDS = ["top", "how-it-works", "features", "safety", "drivers", "waitlist"];

interface HeaderProps {
  locale: string;
  dictionary: {
    nav: Record<string, string>;
  };
}

export function Header({ locale, dictionary }: HeaderProps) {
  const { nav } = dictionary;
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();

  const [mobileOpen, setMobileOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Entrance animation ── */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion) return;
    gsap.fromTo(bar, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 });
  }, [prefersReducedMotion]);

  /* ── Progress indicator via ScrollTrigger ── */
  useEffect(() => {
    const navList = navListRef.current;
    const indicator = indicatorRef.current;
    if (!navList || !indicator) return;

    function updateIndicator(activeLink: HTMLElement) {
      const parentRect = navList!.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const parentWidth = navList!.offsetWidth;
      const parentHeight = navList!.offsetHeight;

      const leftPercent = ((linkRect.left - parentRect.left) / parentWidth) * 100;
      const topPercent = ((linkRect.top - parentRect.top) / parentHeight) * 100;
      const widthPercent = (activeLink.offsetWidth / parentWidth) * 100;
      const heightPercent = (activeLink.offsetHeight / parentHeight) * 100;

      indicator!.style.left = leftPercent + "%";
      indicator!.style.top = topPercent + "%";
      indicator!.style.width = widthPercent + "%";
      indicator!.style.height = heightPercent + "%";
    }

    const triggers: ScrollTrigger[] = [];

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (!section) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "0% 50%",
        end: "100% 50%",
        onEnter: () => {
          const activeLink = navList!.querySelector(`[data-nav-target="#${id}"]`) as HTMLElement | null;
          if (!activeLink) return;
          navList!.querySelectorAll("[data-nav-target]").forEach((el) => el.classList.remove("is-active"));
          activeLink.classList.add("is-active");
          updateIndicator(activeLink);
        },
        onEnterBack: () => {
          const activeLink = navList!.querySelector(`[data-nav-target="#${id}"]`) as HTMLElement | null;
          if (!activeLink) return;
          navList!.querySelectorAll("[data-nav-target]").forEach((el) => el.classList.remove("is-active"));
          activeLink.classList.add("is-active");
          updateIndicator(activeLink);
        },
      });
      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  /* ── Smooth scroll handler ── */
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  }, []);

  /* ── Mobile menu animation ── */
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const links = mobileLinksRef.current;
    if (!menu || !links) return;
    if (mobileOpen) {
      if (prefersReducedMotion) {
        menu.style.opacity = "1";
        menu.style.pointerEvents = "auto";
        Array.from(links.children).forEach((child) => { (child as HTMLElement).style.opacity = "1"; });
      } else {
        gsap.to(menu, { opacity: 1, pointerEvents: "auto", duration: 0.3, ease: "power3.out" });
        gsap.fromTo(links.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", stagger: 0.06, delay: 0.05 });
      }
    } else {
      if (prefersReducedMotion) {
        menu.style.opacity = "0";
        menu.style.pointerEvents = "none";
      } else {
        gsap.to(menu, { opacity: 0, pointerEvents: "none", duration: 0.25, ease: "power3.in" });
      }
    }
  }, [mobileOpen, prefersReducedMotion]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  return (
    <>
      {/* ══════ Navbar ══════ */}
      <header role="banner" className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-[100px] pt-[30px]">
          <div ref={barRef} className="pointer-events-auto relative flex items-center justify-between">

            {/* ── Logo ── */}
            <Link href={localePath("/", locale)} aria-label={nav.ariaHome ?? "Guana — Home"} className="shrink-0 relative z-[70]">
              <GuanaLogo height={32} />
            </Link>

            {/* ── Desktop progress nav ── */}
            <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2" aria-label={nav.ariaMainNav ?? "Main navigation"}>
              <div className="rounded-full p-[5px]">
                <div ref={navListRef} className="relative flex items-center rounded-full overflow-hidden">
                  {/* Sliding indicator */}
                  <div
                    ref={indicatorRef}
                    className="progress-nav-indicator absolute z-[2] bg-brand-blue/[0.05] backdrop-blur-[15px] rounded-full h-[2.5em] w-[2.5em] left-[-2.5em]"
                  />
                  {/* Hidden before/after targets for smooth enter/exit */}
                  <div data-nav-target="#top" className="absolute right-full z-[1] w-[2.5em] h-[2.5em]" />
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      data-nav-target={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="progress-nav-btn relative z-[3] flex items-center justify-center h-[2.5em] px-5 cursor-pointer"
                    >
                      <span className="progress-nav-text whitespace-nowrap text-[18px] font-normal text-brand-blue/70 flex items-center h-full">
                        {nav[link.key] ?? link.key}
                      </span>
                      <span className="progress-nav-text progress-nav-text--dup absolute whitespace-nowrap text-[18px] font-normal text-brand-blue/70 flex items-center justify-center h-full">
                        {nav[link.key] ?? link.key}
                      </span>
                    </a>
                  ))}
                  <div data-nav-target="#waitlist" className="absolute left-full z-[1] w-[2.5em] h-[2.5em]" />
                </div>
              </div>
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center shrink-0">
              <a
                href="#waitlist"
                onClick={(e) => handleNavClick(e, "#waitlist")}
                className="progress-nav-cta relative px-[30px] rounded-full text-[18px] font-sans font-normal text-lime bg-brand-blue hover:bg-brand-blue-hover transition-colors duration-200 overflow-hidden h-[44px] flex items-center"
              >
                <span className="progress-nav-text block leading-[44px]">
                  {nav.download}
                </span>
                <span className="progress-nav-text progress-nav-text--dup absolute left-0 right-0 text-center leading-[44px]">
                  {nav.download}
                </span>
              </a>
            </div>

            {/* ── Mobile hamburger ── */}
            <button
              onClick={toggleMobile}
              className="lg:hidden relative z-[70] flex flex-col items-center justify-center w-10 h-10 -mr-2"
              aria-label={mobileOpen ? (nav.ariaCloseMenu ?? "Close menu") : (nav.ariaOpenMenu ?? "Open menu")}
              aria-expanded={mobileOpen}
            >
              <span className={cn("block h-[1.5px] w-5 bg-black rounded-full transition-all duration-300", mobileOpen && "translate-y-[5px] rotate-45")} />
              <span className={cn("block h-[1.5px] w-5 bg-black rounded-full transition-all duration-300 mt-1.5", mobileOpen && "opacity-0 scale-x-0")} />
              <span className={cn("block h-[1.5px] w-5 bg-black rounded-full transition-all duration-300 mt-1.5", mobileOpen && "-translate-y-[11px] -rotate-45")} />
            </button>
          </div>
        </div>
      </header>

      {/* ══════ Mobile Menu ══════ */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label={nav.ariaNavMenu ?? "Navigation menu"}
        className="fixed inset-0 z-[60] lg:hidden bg-white flex flex-col opacity-0 pointer-events-none"
      >
        {/* Spacer matching the header height so content doesn't overlap the fixed navbar */}
        <div className="h-[72px] shrink-0" />
        <nav className="flex-1 flex flex-col justify-center px-8 overflow-y-auto">
          <div ref={mobileLinksRef} className="space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block text-3xl font-sans font-normal py-3 text-black/50 hover:text-black transition-colors"
              >
                {nav[link.key] ?? link.key}
              </a>
            ))}
            <div className="pt-8">
              <a
                href="#waitlist"
                onClick={(e) => handleNavClick(e, "#waitlist")}
                className="flex items-center justify-center w-full px-8 py-4 rounded-full bg-brand-blue text-lime text-lg font-sans"
              >
                {nav.download}
              </a>
            </div>
            <div className="pt-4 flex justify-center">
              <LanguageSwitch locale={locale} className="text-sm px-4 py-2" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
