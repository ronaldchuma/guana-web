"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Container } from "@/components/ui/Container";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { useSectionReveal } from "@/components/motion/use-gsap";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

interface FeaturesDictionary {
  features: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
    coverAlt?: string;
  };
}

interface FeaturesProps {
  dictionary: FeaturesDictionary;
}

/* -------------------------------------------------------------------------- */
/*  Icon renderer (same outline set as before — 24×24, 1.5 stroke)           */
/* -------------------------------------------------------------------------- */

function FeatureIcon({ name }: { name: string }) {
  const shared = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
    "aria-hidden": true as const,
  };

  switch (name) {
    case "search":
      return (
        <svg {...shared}>
          <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      );
    case "map":
      return (
        <svg {...shared}>
          <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      );
    case "message":
      return (
        <svg {...shared}>
          <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...shared}>
          <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    case "surfboard":
      return (
        <svg {...shared}>
          <path d="M12 3c-1.5 0-3 2-3.5 5.5S7 15 7 17.5c0 1.5.5 3 2 3.5 1 .3 2 .3 3 0s2-2 2-3.5c0-2.5-.5-5.5-1-9S13.5 3 12 3z" />
          <path d="M10 14h4" />
          <path d="M10.5 11h3" />
        </svg>
      );
    case "globe":
      return (
        <svg {...shared}>
          <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M12 3c2.2 2.6 3.4 5.6 3.4 9s-1.2 6.4-3.4 9c-2.2-2.6-3.4-5.6-3.4-9s1.2-6.4 3.4-9z" />
        </svg>
      );
    case "route":
      return (
        <svg {...shared}>
          <path d="M9 6.75V15m6-6v8.25m.503-11.065a1.5 1.5 0 00-2.122-2.122L9 8.69 4.939 4.628a1.5 1.5 0 00-2.122 2.122L7.19 11.12a2.25 2.25 0 003.126-.001L15 6.75z" />
          <path d="M3.75 21h16.5" />
          <circle cx="9" cy="15" r="1.5" />
          <circle cx="15" cy="17.25" r="1.5" />
        </svg>
      );
    case "edit":
      return (
        <svg {...shared}>
          <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      );
    case "star":
      return (
        <svg {...shared}>
          <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      );
    default:
      return (
        <svg {...shared}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

/* -------------------------------------------------------------------------- */
/*  Cover visual placeholder (gradient + icon grid)                           */
/* -------------------------------------------------------------------------- */

function CoverVisual({ items }: { items: FeatureItem[] }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-50 via-cream-light to-ocean/5">
      <div className="grid grid-cols-3 gap-5 p-10 opacity-25">
        {items.map((item) => (
          <div
            key={item.icon}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal"
          >
            <FeatureIcon name={item.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Feature visual (icon-based visual per feature)                            */
/* -------------------------------------------------------------------------- */

function FeatureVisual({ item }: { item: FeatureItem }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-50 to-cream-light">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal/10 text-teal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10"
            aria-hidden
          >
            <FeatureIconPath name={item.icon} />
          </svg>
        </div>
        <span className="text-sm font-medium text-deep/40">{item.title}</span>
      </div>
    </div>
  );
}

function FeatureIconPath({ name }: { name: string }) {
  switch (name) {
    case "search":
      return <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />;
    case "map":
      return (
        <>
          <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </>
      );
    case "message":
      return <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />;
    case "shield":
      return <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />;
    case "surfboard":
      return (
        <>
          <path d="M12 3c-1.5 0-3 2-3.5 5.5S7 15 7 17.5c0 1.5.5 3 2 3.5 1 .3 2 .3 3 0s2-2 2-3.5c0-2.5-.5-5.5-1-9S13.5 3 12 3z" />
          <path d="M10 14h4" />
          <path d="M10.5 11h3" />
        </>
      );
    case "globe":
      return (
        <>
          <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
          <path d="M3.6 9h16.8M3.6 15h16.8" />
          <path d="M12 3c2.2 2.6 3.4 5.6 3.4 9s-1.2 6.4-3.4 9c-2.2-2.6-3.4-5.6-3.4-9s1.2-6.4 3.4-9z" />
        </>
      );
    case "route":
      return (
        <>
          <path d="M9 6.75V15m6-6v8.25m.503-11.065a1.5 1.5 0 00-2.122-2.122L9 8.69 4.939 4.628a1.5 1.5 0 00-2.122 2.122L7.19 11.12a2.25 2.25 0 003.126-.001L15 6.75z" />
          <path d="M3.75 21h16.5" />
          <circle cx="9" cy="15" r="1.5" />
          <circle cx="15" cy="17.25" r="1.5" />
        </>
      );
    case "edit":
      return <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />;
    case "star":
      return <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />;
    default:
      return <circle cx="12" cy="12" r="9" />;
  }
}

/* -------------------------------------------------------------------------- */
/*  Plus/Close icon bars                                                      */
/* -------------------------------------------------------------------------- */

function PlusIcon() {
  return (
    <span className="fp-item-icon">
      <span className="fp-item-icon-bar" />
      <span className="fp-item-icon-bar is--horizontal" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  Features (expanding pills)                                                */
/* -------------------------------------------------------------------------- */

export default function Features({ dictionary }: FeaturesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  // Scroll-reveal for the section header
  useSectionReveal(sectionRef, { stagger: 0.06 });

  const { features } = dictionary;

  // Limit to 6 features for the pill layout
  const pillItems = features.items.slice(0, 6);

  /* ── GSAP-powered expanding pills logic ── */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const items = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-feature-pills-item]")
    );
    const visuals = Array.from(
      wrap.querySelectorAll<HTMLElement>("[data-feature-pills-visual]")
    );
    const cover = wrap.querySelector<HTMLElement>("[data-feature-pills-cover]");
    const closeBtn = wrap.querySelector<HTMLButtonElement>(
      "[data-feature-pills-close]"
    );

    if (!items.length) return;

    const ease = "back.out(2)";
    const animationDuration = 0.5;

    const getExpandedWidth = () =>
      getComputedStyle(wrap)
        .getPropertyValue("--content-item-expanded")
        .trim() || "";

    const getActiveIndex = (): number | null => {
      const active = items.find(
        (it) => it.getAttribute("data-active") === "true"
      );
      return active
        ? Number(active.getAttribute("data-feature-pills-index"))
        : null;
    };

    const setWrapActive = (isActive: boolean) => {
      wrap.setAttribute(
        "data-feature-pills-active",
        isActive ? "true" : "false"
      );
      if (closeBtn)
        closeBtn.setAttribute("aria-hidden", isActive ? "false" : "true");
      if (cover) {
        cover.setAttribute("data-active", isActive ? "false" : "true");
        cover.setAttribute("aria-hidden", isActive ? "true" : "false");
      }
    };

    const setVisualActive = (indexOrNull: number | null) => {
      if (!visuals.length) return;
      visuals.forEach((v) => {
        const idx = Number(v.getAttribute("data-feature-pills-index"));
        const isActive = indexOrNull !== null && idx === indexOrNull;
        v.setAttribute("data-active", isActive ? "true" : "false");
        v.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
    };

    const setItemA11y = (item: HTMLElement, isOpen: boolean) => {
      const btn = item.querySelector<HTMLElement>(
        "[data-feature-pills-button]"
      );
      const content = item.querySelector<HTMLElement>(
        "[data-feature-pills-content]"
      );
      if (!btn || !content) return;
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
      content.setAttribute("aria-hidden", isOpen ? "false" : "true");
    };

    const measureButtonH = (item: HTMLElement) => {
      const btn = item.querySelector<HTMLElement>(
        "[data-feature-pills-button]"
      );
      return btn ? Math.ceil(btn.getBoundingClientRect().height) : 0;
    };

    const measureInnerH = (item: HTMLElement, expandedW: string) => {
      const inner = item.querySelector<HTMLElement>(
        "[data-feature-pills-inner]"
      );
      if (!inner) return 0;

      const mask = item.querySelector<HTMLElement>(".fp-item-mask");
      const prevMaskOverflow = mask ? mask.style.overflow : null;
      if (mask) mask.style.overflow = "visible";

      const prevMaxW = inner.style.maxWidth;
      if (expandedW) inner.style.maxWidth = expandedW;

      const h = Math.ceil(inner.getBoundingClientRect().height);

      if (expandedW) inner.style.maxWidth = prevMaxW || "";
      if (mask) mask.style.overflow = prevMaskOverflow || "";

      return h;
    };

    const getHeights = (item: HTMLElement, expandedW: string) => {
      const buttonH = measureButtonH(item);
      const innerH = measureInnerH(item, expandedW);
      const openH = Math.max(buttonH, innerH);
      return { buttonH, openH };
    };

    const collapsedWidthPx = new Map<HTMLElement, number>();

    const captureCollapsedWidths = () => {
      items.forEach((item) => {
        const prev = item.style.width;
        item.style.width = "";
        collapsedWidthPx.set(
          item,
          Math.ceil(item.getBoundingClientRect().width)
        );
        item.style.width = prev;
      });
    };

    const animateBox = (
      el: HTMLElement,
      vars: { height?: number; width?: number | string }
    ) => {
      gsap.killTweensOf(el);
      if (prefersReducedMotion) {
        if (vars.height != null) el.style.height = `${vars.height}px`;
        if (vars.width != null)
          el.style.width =
            typeof vars.width === "number" ? `${vars.width}px` : vars.width;
        return;
      }
      gsap.to(el, {
        ...vars,
        duration: animationDuration,
        ease,
        overwrite: true,
      });
    };

    const openItem = (item: HTMLElement) => {
      const expandedW = getExpandedWidth();
      const { openH } = getHeights(item, expandedW);

      item.setAttribute("data-active", "true");
      setItemA11y(item, true);
      setWrapActive(true);

      const targetW =
        expandedW ||
        `${collapsedWidthPx.get(item) || Math.ceil(item.getBoundingClientRect().width)}px`;
      animateBox(item, { height: openH, width: targetW });
    };

    const closeItem = (item: HTMLElement) => {
      const expandedW = getExpandedWidth();
      const { buttonH } = getHeights(item, expandedW);

      item.setAttribute("data-active", "false");
      setItemA11y(item, false);

      const targetW =
        collapsedWidthPx.get(item) ||
        Math.ceil(item.getBoundingClientRect().width);
      animateBox(item, { height: buttonH, width: targetW });
    };

    const switchTo = (nextIndex: number) => {
      const current = getActiveIndex();
      if (current === nextIndex) return;

      const nextItem = items[nextIndex];
      if (!nextItem) return;

      if (current !== null) closeItem(items[current]);
      openItem(nextItem);
      setVisualActive(nextIndex);
    };

    const closeAll = () => {
      const current = getActiveIndex();
      if (current === null) return;
      closeItem(items[current]);
      setVisualActive(null);
      setWrapActive(false);
    };

    // Initialize items
    items.forEach((item, i) => {
      item.setAttribute("data-feature-pills-index", String(i));
      if (!item.hasAttribute("data-active"))
        item.setAttribute("data-active", "false");

      const btn = item.querySelector<HTMLElement>(
        "[data-feature-pills-button]"
      );
      const content = item.querySelector<HTMLElement>(
        "[data-feature-pills-content]"
      );
      if (btn) {
        btn.setAttribute("data-feature-pills-index", String(i));
        (btn as HTMLButtonElement).type = "button";
      }
      if (content && btn) {
        content.setAttribute("data-feature-pills-index", String(i));
        const panelId = `fp-panel-${i}`;
        if (!content.id) content.id = panelId;
        btn.setAttribute("aria-controls", content.id);
        content.setAttribute("role", "region");
        content.setAttribute("aria-labelledby", btn.id || `fp-trigger-${i}`);
        if (!btn.id) btn.id = `fp-trigger-${i}`;
        if (!content.hasAttribute("aria-hidden"))
          content.setAttribute("aria-hidden", "true");
        if (!btn.hasAttribute("aria-expanded"))
          btn.setAttribute("aria-expanded", "false");
      }
    });

    visuals.forEach((v, i) =>
      v.setAttribute("data-feature-pills-index", String(i))
    );

    if (closeBtn) {
      closeBtn.type = "button";
      if (!closeBtn.hasAttribute("aria-hidden"))
        closeBtn.setAttribute("aria-hidden", "true");
      closeBtn.addEventListener("click", closeAll);
    }

    // Set initial heights
    items.forEach((item) => {
      const h = measureButtonH(item);
      item.style.height = `${h}px`;
    });

    setWrapActive(false);
    setVisualActive(null);

    // Click handlers
    const clickHandlers: Array<{ btn: HTMLElement; handler: () => void }> = [];
    items.forEach((item, i) => {
      const btn = item.querySelector<HTMLElement>(
        "[data-feature-pills-button]"
      );
      if (!btn) return;
      const handler = () => switchTo(i);
      btn.addEventListener("click", handler);
      clickHandlers.push({ btn, handler });
    });

    // Keyboard
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    wrap.addEventListener("keydown", keyHandler);

    // Resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      const current = getActiveIndex();

      items.forEach((item) => {
        if (item.getAttribute("data-active") !== "true") item.style.width = "";
      });

      captureCollapsedWidths();

      if (current !== null) {
        const item = items[current];
        const expandedW = getExpandedWidth();
        const { openH } = getHeights(item, expandedW);
        const targetW = expandedW || "";

        if (prefersReducedMotion) {
          item.style.height = `${openH}px`;
          if (targetW) item.style.width = targetW;
        } else {
          const fallbackW = `${Math.ceil(item.getBoundingClientRect().width)}px`;
          gsap.set(item, { height: openH, width: targetW || fallbackW });
          if (targetW) item.style.width = targetW;
        }
      } else {
        items.forEach((item) => {
          const h = measureButtonH(item);
          item.style.height = `${h}px`;
        });
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 200);
    };

    captureCollapsedWidths();
    window.addEventListener("resize", debouncedResize, { passive: true });

    // Cleanup
    return () => {
      clickHandlers.forEach(({ btn, handler }) =>
        btn.removeEventListener("click", handler)
      );
      wrap.removeEventListener("keydown", keyHandler);
      window.removeEventListener("resize", debouncedResize);
      if (closeBtn) closeBtn.removeEventListener("click", closeAll);
      clearTimeout(resizeTimer);
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label={features.title}
      className="bg-white py-24 md:py-32 lg:py-40"
    >
      <Container>
        {/* ── Section header ─────────────────────────────────── */}
        <div data-reveal className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <h2 className="u-text-h2 font-bold text-deep">{features.title}</h2>
          <p className="mt-3 u-text-main text-deep/60">{features.subtitle}</p>
        </div>

        {/* ── Feature pills module ────────────────────────────── */}
        <div
          ref={wrapRef}
          data-reveal
          data-feature-pills-init=""
          data-feature-pills-active="false"
          data-edit-mode="false"
          aria-label="product features"
          className="fp-wrap mx-auto"
        >
          <div className="fp-layout">
            {/* Left: Pills */}
            <div className="fp-col">
              <div data-feature-pills-collection="" className="fp-info-collection">
                <ul role="list" data-feature-pills-list="" className="fp-info-list">
                  {pillItems.map((item) => (
                    <li
                      key={item.title}
                      data-feature-pills-item=""
                      data-active="false"
                      className="fp-info-item"
                    >
                      <div className="fp-item-bg" />
                      <button
                        data-feature-pills-button=""
                        aria-expanded="false"
                        className="fp-item-button"
                      >
                        <span className="fp-item-label">{item.title}</span>
                        <PlusIcon />
                      </button>
                      <div
                        aria-hidden="true"
                        data-feature-pills-content=""
                        className="fp-item-content"
                      >
                        <div className="fp-item-mask">
                          <div
                            data-feature-pills-inner=""
                            className="fp-item-inner"
                          >
                            <p className="fp-item-body">
                              {item.title}.
                              <br />
                              <br />
                              <span className="fp-item-body-span">
                                {item.description}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Visuals */}
            <div className="fp-col is--visual">
              <div className="fp-visual-collection">
                <div className="fp-visual-list">
                  {pillItems.map((item) => (
                    <div
                      key={`visual-${item.icon}`}
                      aria-hidden="true"
                      data-feature-pills-visual=""
                      className="fp-visual-item"
                    >
                      <FeatureVisual item={item} />
                    </div>
                  ))}
                </div>
              </div>
              <div
                data-feature-pills-cover=""
                className="fp-visual-cover"
              >
                <CoverVisual items={pillItems} />
              </div>
            </div>
          </div>

          {/* Close button */}
          <div className="fp-close">
            <button
              data-feature-pills-close=""
              aria-hidden="true"
              className="fp-close-button"
            >
              <span className="fp-item-icon-bar" />
              <span className="fp-item-icon-bar is--horizontal" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
