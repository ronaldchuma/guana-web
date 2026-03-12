export const SITE_URL = "https://guana.app";

export const APP_STORE_URL =
  "https://apps.apple.com/app/guana/id6504720981";

export const APP_ID = "6504720981";

export const ROUTES = {
  home: "/",
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
  { key: "howItWorks", href: "#how-it-works" },
  { key: "features", href: "#features" },
  { key: "safety", href: "#safety" },
  { key: "drivers", href: "#drivers" },
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
