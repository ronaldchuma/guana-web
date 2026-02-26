export const SITE_URL = "https://guana.app";

export const APP_STORE_URL =
  "https://apps.apple.com/app/guana/id6504720981";

export const APP_ID = "6504720981";

export const ROUTES = {
  home: "/",
  routes: "/routes",
  drivers: "/drivers",
  safety: "/safety",
  faq: "/faq",
  about: "/about",
  support: "/support",
  download: "/download",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
} as const;

/* ── Nav link types ── */
export interface NavDropdownItem {
  key: string;
  href: string;
  icon: string; // Lucide-style icon identifier
  description?: string;
}

export interface NavLink {
  key: string;
  href: string;
  dropdown?: NavDropdownItem[];
}

export const NAV_LINKS: NavLink[] = [
  {
    key: "routes",
    href: ROUTES.routes,
    dropdown: [
      {
        key: "popular_routes",
        href: ROUTES.routes,
        icon: "map-pin",
        description: "Explore popular destinations and routes across Costa Rica.",
      },
      {
        key: "airport_transfers",
        href: ROUTES.routes + "#airport",
        icon: "plane",
        description: "Reliable airport pickup and drop-off services.",
      },
    ],
  },
  {
    key: "drivers",
    href: ROUTES.drivers,
    dropdown: [
      {
        key: "become_driver",
        href: ROUTES.drivers,
        icon: "car",
        description: "Join our network and start earning on your own schedule.",
      },
      {
        key: "driver_safety",
        href: ROUTES.safety,
        icon: "shield",
        description: "How we keep drivers and riders safe on every trip.",
      },
      {
        key: "driver_support",
        href: ROUTES.support,
        icon: "headphones",
        description: "Get help, report issues, and access driver resources.",
      },
    ],
  },
  { key: "safety", href: ROUTES.safety },
  { key: "faq", href: ROUTES.faq },
  { key: "about", href: ROUTES.about },
];

export const SOCIAL_LINKS = {
  instagram: "https://instagram.com/guanacr",
  facebook: "https://facebook.com/guanacr",
  whatsapp: "https://wa.me/50600000000",
} as const;

export const CONTACT_EMAIL = "hello@guana.app";

export const LEGAL_LINKS = [
  { href: ROUTES.privacy, key: "privacy" },
  { href: ROUTES.terms, key: "terms" },
] as const;
