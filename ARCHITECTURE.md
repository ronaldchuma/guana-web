# Guana Website — Architecture

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 14 App Router | SSG/SSR for SEO, dynamic routes for route pages, middleware for i18n |
| Styling | Tailwind CSS + CSS custom properties | Utility-first with design token layer |
| Animation | GSAP + ScrollTrigger + Lenis | Premium motion, scroll-driven reveals, smooth scrolling |
| Content | TypeScript data files | No CMS needed for MVP; route/FAQ data as typed objects |
| Backend | Supabase (existing) | Contact form + waitlist endpoints |
| Hosting | Vercel | Edge-first, auto-deploy from main, great Next.js support |
| Domain | guana.app | Already configured for Universal Links |

## i18n Strategy

- **URL pattern**: `/` = English (default), `/es/` = Spanish
- **Middleware**: Detects locale from URL path prefix, redirects if needed
- **Dictionaries**: JSON files per locale, loaded server-side per page
- **hreflang**: Added via `<link>` tags in layout, pointing to alternate locale URLs
- **Content**: All pages fully translated EN + ES

## Folder Structure

```
guana-web/
├── app/
│   ├── [locale]/                 # Dynamic locale segment (en | es)
│   │   ├── layout.tsx            # Locale-aware layout (Header, Footer, metadata)
│   │   ├── page.tsx              # Home page
│   │   ├── routes/
│   │   │   ├── page.tsx          # Routes hub
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Route detail (SSG with generateStaticParams)
│   │   ├── faq/page.tsx
│   │   ├── safety/page.tsx
│   │   ├── drivers/page.tsx
│   │   ├── about/page.tsx
│   │   ├── support/page.tsx
│   │   ├── download/page.tsx
│   │   ├── trip/[id]/page.tsx    # Deep link handler
│   │   └── legal/
│   │       ├── privacy/page.tsx
│   │       └── terms/page.tsx
│   ├── layout.tsx                # Root HTML shell (font loading)
│   ├── not-found.tsx
│   ├── sitemap.ts                # Dynamic sitemap generation
│   ├── robots.ts                 # Robots.txt generation
│   ├── auth/callback/page.tsx    # Auth callback handler
│   └── api/
│       ├── contact/route.ts
│       └── waitlist/route.ts
├── components/
│   ├── ui/                       # Design system primitives
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Accordion.tsx
│   │   ├── Chip.tsx
│   │   ├── RouteCard.tsx
│   │   └── LanguageSwitch.tsx
│   ├── layout/                   # Structural components
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── sections/                 # Home page sections
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Features.tsx
│   │   ├── RoutesPreview.tsx
│   │   ├── TrustSafety.tsx
│   │   └── FinalCTA.tsx
│   └── motion/                   # GSAP utilities
│       ├── use-prefers-reduced-motion.ts
│       ├── use-gsap.ts
│       └── animations.ts
├── lib/
│   ├── i18n/
│   │   ├── config.ts             # Locale definitions
│   │   ├── get-dictionary.ts     # Dictionary loader
│   │   └── dictionaries/
│   │       ├── en.json
│   │       └── es.json
│   ├── routes/
│   │   └── data.ts               # Route definitions + content
│   ├── seo/
│   │   ├── metadata.ts           # Metadata template utilities
│   │   └── json-ld.ts            # JSON-LD schema generators
│   ├── supabase.ts
│   ├── media.ts
│   ├── tokens.ts
│   └── utils.ts
├── public/
│   ├── .well-known/
│   │   └── apple-app-site-association
│   └── images/
├── middleware.ts                  # i18n routing
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Design System Tokens

Colors, typography, spacing, and shadows are defined as:
1. CSS custom properties in `globals.css` (runtime theming)
2. Tailwind config references CSS vars (utility classes)
3. Semantic naming: `--color-surface`, `--color-text-primary`, etc.

## Motion System

- `usePrefersReducedMotion()` — checks media query, returns boolean
- `useGSAPContext()` — scoped GSAP context with auto-cleanup
- `ANIM` constants — standardized durations, easings, stagger values
- All animations wrapped in reduced-motion checks
- ScrollTrigger for scroll-driven reveals
- Lenis for smooth scrolling (initialized once in root layout)

## SEO Strategy

- All pages server-rendered or statically generated
- Per-page metadata via Next.js `generateMetadata()`
- JSON-LD schemas: Organization, BreadcrumbList, FAQPage
- hreflang links for all bilingual pages
- Sitemap.xml generated from route data
- Route pages optimized for featured snippets (answer blocks)

## Deep Linking

- AASA file at `/.well-known/apple-app-site-association`
- `/trip/[id]` attempts Universal Link → App Store fallback
- `/auth/callback` passes tokens to app via Universal Link
- Smart App Banner meta tag on key pages
