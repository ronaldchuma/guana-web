"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { cn, localePath } from "@/lib/utils";
import { NAV_LINKS, APP_STORE_URL, type NavLink, type NavDropdownItem } from "@/lib/tokens";

/* ─── Custom easing ─────────────────────────────────────────────────────── */
const EASE_OUT = "power4.out";        // smooth decel for enter
const EASE_IN  = "power3.inOut";      // gentle for exit
const EASE_SPRING = "back.out(1.2)";  // subtle overshoot for playfulness

/* ─── Global close timer — single timer shared at Header level ──────────── */
let _globalCloseTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleClose(fn: () => void, delay = 120) {
  cancelClose();
  _globalCloseTimer = setTimeout(fn, delay);
}
function cancelClose() {
  if (_globalCloseTimer) {
    clearTimeout(_globalCloseTimer);
    _globalCloseTimer = null;
  }
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Language Switch                                                          */
/* ────────────────────────────────────────────────────────────────────────── */

function LanguageSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();
  const pathnameWithoutLocale = pathname.replace(/^\/(en|es)/, "") || "/";
  const otherLocale = locale === "es" ? "en" : "es";
  const href = localePath(pathnameWithoutLocale, otherLocale);

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md",
        "text-xs font-semibold tracking-wide uppercase",
        "text-deep/60 hover:text-deep",
        "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
      )}
      aria-label={`Switch to ${otherLocale === "en" ? "English" : "Español"}`}
    >
      {otherLocale.toUpperCase()}
    </Link>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Dropdown Panel — minimalist, animated from bottom with mask grow effect  */
/* ────────────────────────────────────────────────────────────────────────── */

function DropdownPanel({
  items,
  locale,
  nav,
  isOpen,
  onClose,
}: {
  items: NavDropdownItem[];
  locale: string;
  nav: Record<string, string>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  /* Animate on isOpen change — imperative gsap.to with overwrite: "auto"
     eliminates all race conditions when rapidly toggling or switching items.
     Using autoAlpha (visibility + opacity) avoids display:none layout thrash. */
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (isOpen) {
      // If first time, set initial hidden state
      if (!hasAnimated.current) {
        gsap.set(panel, { autoAlpha: 0, scale: 0.92, filter: "blur(8px)", pointerEvents: "none" });
        hasAnimated.current = true;
      }
      gsap.to(panel, {
        autoAlpha: 1,
        scale: 1,
        filter: "blur(0px)",
        pointerEvents: "auto",
        duration: 0.3,
        ease: EASE_OUT,
        overwrite: "auto",
      });
    } else {
      gsap.to(panel, {
        autoAlpha: 0,
        scale: 0.96,
        filter: "blur(4px)",
        pointerEvents: "none",
        duration: 0.2,
        ease: EASE_IN,
        overwrite: "auto",
      });
    }
  }, [isOpen]);

  /* Set initial hidden state on mount */
  useEffect(() => {
    const panel = panelRef.current;
    if (panel) {
      gsap.set(panel, { autoAlpha: 0, scale: 0.92, filter: "blur(8px)", pointerEvents: "none" });
      hasAnimated.current = true;
    }
  }, []);

  return (
    <div
      ref={panelRef}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 z-50 origin-top"
      style={{ visibility: "hidden" }}
      onMouseEnter={cancelClose}
      onMouseLeave={onClose}
    >
      {/* Invisible bridge between trigger and dropdown */}
      <div className="absolute -top-3 left-0 right-0 h-3" />

      <div
        className={cn(
          "bg-[#f8f7f4] rounded-xl",
          "border border-deep/[0.05]",
          "shadow-[0_12px_48px_-12px_rgba(11,18,16,0.12),0_4px_12px_-4px_rgba(11,18,16,0.04)]",
          "p-1.5",
          items.length > 2
            ? "w-[26.25rem] grid grid-cols-2 gap-0.5"
            : "w-[16.25rem] flex flex-col gap-0.5",
        )}
      >
        {items.map((item) => (
          <Link
            key={item.key}
            href={localePath(item.href, locale)}
            onClick={onClose}
            className={cn(
              "group block p-3 rounded-lg",
              "transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "hover:bg-white",
            )}
          >
            <span className={cn(
              "block text-[0.8125rem] font-medium text-deep/80",
              "group-hover:text-deep",
              "transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            )}>
              {nav[item.key] ?? item.key}
            </span>
            {item.description && (
              <span className={cn(
                "block text-[0.6875rem] text-deep/35 mt-0.5 leading-relaxed",
                "group-hover:text-deep/50",
                "transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
              )}>
                {nav[`${item.key}_desc`] ?? item.description}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Desktop Nav Item                                                         */
/* ────────────────────────────────────────────────────────────────────────── */

function DesktopNavItem({
  link,
  locale,
  nav,
  isActive,
  activeDropdown,
  onDropdownOpen,
  onDropdownClose,
}: {
  link: NavLink;
  locale: string;
  nav: Record<string, string>;
  isActive: boolean;
  activeDropdown: string | null;
  onDropdownOpen: (key: string) => void;
  onDropdownClose: () => void;
}) {
  const hasDropdown = !!link.dropdown?.length;
  const isDropdownOpen = activeDropdown === link.key;

  const handleMouseEnter = () => {
    cancelClose();
    if (hasDropdown) onDropdownOpen(link.key);
  };

  const handleMouseLeave = () => {
    scheduleClose(onDropdownClose, 100);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={localePath(link.href, locale)}
        className={cn(
          "nav-link group/link relative inline-flex items-center gap-1 px-3 py-1.5 rounded-lg overflow-hidden",
          "text-base font-medium tracking-[-0.01em]",
          "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isActive || isDropdownOpen
            ? "text-deep"
            : "text-deep/60 hover:text-deep",
        )}
      >
        {/* Background that scales from bottom on hover / active */}
        <span
          className={cn(
            "absolute inset-0 rounded-lg origin-bottom",
            "transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isActive || isDropdownOpen
              ? "bg-deep/[0.06] scale-y-100"
              : "bg-deep/[0.05] scale-y-0 group-hover/link:scale-y-100",
          )}
          aria-hidden="true"
        />
        <span className="relative z-[1]">{nav[link.key] ?? link.key}</span>
        {hasDropdown && (
          <svg
            className={cn(
              "relative z-[1] w-3 h-3 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
              isDropdownOpen && "rotate-180",
            )}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </Link>

      {hasDropdown && link.dropdown && (
        <DropdownPanel
          items={link.dropdown}
          locale={locale}
          nav={nav}
          isOpen={isDropdownOpen}
          onClose={() => scheduleClose(onDropdownClose, 100)}
        />
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Mobile Accordion Item – minimalist, no icons                             */
/* ────────────────────────────────────────────────────────────────────────── */

function MobileAccordionItem({
  link,
  locale,
  nav,
  isActive,
  onClose,
}: {
  link: NavLink;
  locale: string;
  nav: Record<string, string>;
  isActive: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasDropdown = !!link.dropdown?.length;

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (expanded) {
      gsap.to(el, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: EASE_OUT,
      });
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: EASE_IN,
      });
    }
  }, [expanded]);

  if (!hasDropdown) {
    return (
      <Link
        href={localePath(link.href, locale)}
        onClick={onClose}
        className={cn(
          "block text-2xl sm:text-3xl font-heading font-medium py-3",
          "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isActive ? "text-deep" : "text-deep/60 hover:text-deep",
        )}
      >
        {nav[link.key] ?? link.key}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex items-center gap-2 w-full text-left",
          "text-2xl sm:text-3xl font-heading font-medium py-3",
          "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isActive || expanded ? "text-deep" : "text-deep/60 hover:text-deep",
        )}
      >
        {nav[link.key] ?? link.key}
        <svg
          className={cn(
            "w-5 h-5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
            expanded && "rotate-180",
          )}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden">
        <div className="pb-3 pl-2 space-y-0.5">
          {link.dropdown!.map((item) => (
            <Link
              key={item.key}
              href={localePath(item.href, locale)}
              onClick={onClose}
              className={cn(
                "block p-3 rounded-lg",
                "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "hover:bg-deep/[0.03]",
              )}
            >
              <span className="block text-sm font-medium text-deep/70">
                {nav[item.key] ?? item.key}
              </span>
              {item.description && (
                <span className="block text-xs text-deep/30 mt-0.5">
                  {nav[`${item.key}_desc`] ?? item.description}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────── */
/*  Header                                                                   */
/* ────────────────────────────────────────────────────────────────────────── */

interface HeaderProps {
  locale: string;
  dictionary: {
    nav: Record<string, string>;
  };
}

export function Header({ locale, dictionary }: HeaderProps) {
  const { nav } = dictionary;
  const pathname = usePathname();

  /* ── State ── */
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  /* ── Refs ── */
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body scroll when mobile menu is open ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Animate bar on mount ── */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    gsap.fromTo(
      bar,
      { opacity: 0, y: -16 },
      { opacity: 1, y: 0, duration: 0.8, ease: EASE_SPRING, delay: 0.05 },
    );
  }, []);

  /* ── Animate mobile menu ── */
  useEffect(() => {
    const menu = mobileMenuRef.current;
    const links = mobileLinksRef.current;
    if (!menu || !links) return;

    if (mobileOpen) {
      gsap.to(menu, {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.4,
        ease: EASE_OUT,
      });
      gsap.fromTo(
        links.children,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: EASE_OUT,
          stagger: 0.05,
          delay: 0.08,
        },
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: EASE_IN,
      });
    }
  }, [mobileOpen]);

  /* ── Close mobile menu on route change ── */
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);

  const isActivePath = (href: string): boolean => {
    const localizedHref = localePath(href, locale);
    return pathname === localizedHref;
  };

  return (
    <>
      {/* ═══════════════════════ Navbar ═══════════════════════ */}
      <header
        ref={headerRef}
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="container-bar pt-3 sm:pt-4">
          <div
            ref={barRef}
            className={cn(
              "pointer-events-auto relative",
              "flex items-center justify-between",
              "px-5 sm:px-6 py-3 sm:py-3.5",
              // Subtle rounded rectangle — NOT a pill
              "rounded-xl",
              "border border-deep/[0.06]",
              // Smooth scroll-state transitions
              "transition-[background-color,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              scrolled
                ? "bg-white/92 backdrop-blur-xl shadow-[0_4px_32px_-8px_rgba(11,18,16,0.1),0_1px_3px_-1px_rgba(11,18,16,0.04)]"
                : "bg-white/60 backdrop-blur-md shadow-[0_1px_8px_-2px_rgba(11,18,16,0.04)]",
            )}
          >
            {/* ── Logo ── */}
            <Link
              href={localePath("/", locale)}
              className="flex items-center gap-0.5 group shrink-0"
              aria-label="Guana — Home"
            >
              <span className="text-xl font-heading font-medium tracking-tight text-deep">
                guana
              </span>
              <span
                className={cn(
                  "inline-block w-1.5 h-1.5 rounded-full bg-teal ml-0.5 mb-0.5",
                  "group-hover:scale-150 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                )}
                aria-hidden="true"
              />
            </Link>

            {/* ── Desktop Nav (center) ── */}
            <nav
              className="hidden lg:flex items-center gap-6"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map((link) => (
                <DesktopNavItem
                  key={link.key}
                  link={link}
                  locale={locale}
                  nav={nav}
                  isActive={isActivePath(link.href)}
                  activeDropdown={activeDropdown}
                  onDropdownOpen={setActiveDropdown}
                  onDropdownClose={() => setActiveDropdown(null)}
                />
              ))}
            </nav>

            {/* ── Desktop Right ── */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <LanguageSwitch locale={locale} />

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2 rounded-lg",
                  "text-[0.8125rem] font-semibold",
                  "bg-deep text-cream-light",
                  "hover:bg-deep-800 active:bg-deep-700",
                  "shadow-sm",
                  "transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  "hover:shadow-[0_4px_20px_-6px_rgba(11,18,16,0.25)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2",
                )}
              >
                {nav.download ?? "Get the App"}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={toggleMobile}
              className={cn(
                "lg:hidden relative z-[70] flex flex-col items-center justify-center",
                "w-10 h-10 -mr-2 rounded-lg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
              )}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  "block h-[1.5px] w-5 bg-deep rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                  mobileOpen && "translate-y-[4.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-[0.09375rem] w-5 bg-deep rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] mt-[0.375rem]",
                  mobileOpen && "opacity-0 scale-x-0",
                )}
              />
              <span
                className={cn(
                  "block h-[0.09375rem] w-5 bg-deep rounded-full transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center mt-[0.375rem]",
                  mobileOpen && "-translate-y-[10.5px] -rotate-45",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════════════ Mobile Menu Overlay ═══════════════════════ */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          "bg-cream-light/[0.97] backdrop-blur-2xl",
          "flex flex-col",
          "opacity-0 pointer-events-none",
        )}
      >
        {/* Close button */}
        <div className="h-20 shrink-0 flex items-center justify-end container-guana">
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMobile}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-xl",
              "text-deep/60 hover:text-deep hover:bg-deep/[0.06]",
              "transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav
          className="flex-1 flex flex-col justify-center container-guana overflow-y-auto"
          aria-label="Mobile navigation"
        >
          <div ref={mobileLinksRef} className="space-y-1">
            {NAV_LINKS.map((link) => (
              <MobileAccordionItem
                key={link.key}
                link={link}
                locale={locale}
                nav={nav}
                isActive={isActivePath(link.href)}
                onClose={closeMobile}
              />
            ))}

            {/* Mobile CTA */}
            <div className="pt-8">
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobile}
                className={cn(
                  "inline-flex items-center justify-center gap-2 w-full",
                  "px-8 py-4 rounded-xl",
                  "bg-deep text-cream-light text-base font-semibold",
                  "hover:bg-deep-800 active:bg-deep-700",
                  "transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                )}
              >
                {nav.download ?? "Get the App"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>

              <div className="flex justify-center pt-4">
                <LanguageSwitch locale={locale} />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
