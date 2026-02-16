# Guana Web — Technical Context

## Purpose of This Site

This static site hosted at `guana.app` serves three functions:

1. **Apple App Site Association (AASA)** — enables Universal Links so iOS opens the app directly from email links
2. **Auth callback fallback** — catches Supabase auth redirects when Universal Links don't fire
3. **Public pages** — landing page, privacy policy, terms of service

## Infrastructure

| Component | Service |
|-----------|---------|
| Domain | guana.app |
| Hosting | Vercel (static) |
| DNS | Configured via domain registrar → Vercel |
| iOS app repo | github.com/ronaldchuma/Guana |
| Website repo | github.com/ronaldchuma/guana-web |
| Backend | Supabase (auth, database, storage) |

## Universal Links

### How It Works

1. User clicks email confirmation link
2. Browser hits Supabase server → email gets confirmed
3. Supabase redirects to `https://guana.app/auth/callback#access_token=...&type=signup`
4. **With Associated Domains** (requires Apple Developer Program): iOS intercepts the URL and opens the app directly
5. **Without Associated Domains** (current state): browser loads the callback page, which auto-redirects to `guana://auth/callback#tokens` via JavaScript

### AASA File

Located at `/.well-known/apple-app-site-association`

- **Team ID:** M9PF7F628M
- **Bundle ID:** Guana.Guana
- **Full App ID:** M9PF7F628M.Guana.Guana
- **Matched path:** `/auth/callback`

**Important:** This file must be served at the exact path `/.well-known/apple-app-site-association` with `Content-Type: application/json`. Vercel handles this automatically.

### iOS App Requirements (for Universal Links to work)

When the developer enrolls in Apple Developer Program:
1. Add `applinks:guana.app` to Associated Domains capability in Xcode
2. Enable Associated Domains on the App ID in Apple Developer portal

Until then, the custom URL scheme fallback (`guana://`) handles the redirect.

## Auth Callback Page

`/auth/callback/index.html`

When loaded in a browser (Universal Links didn't fire), this page:
1. Reads the URL fragment (`#access_token=...&type=signup`)
2. Constructs a custom scheme URL: `guana://auth/callback#same_fragment`
3. Auto-redirects to the custom scheme after 600ms
4. Shows a branded "Open Guana" button as manual fallback

The iOS app's `onOpenURL` handler parses the fragment tokens from either URL format.

## Supabase Configuration

### URL Configuration (Dashboard → Authentication → URL Configuration)

| Setting | Value |
|---------|-------|
| Site URL | `https://guana.app` |
| Redirect URLs | `https://guana.app/auth/callback` |

### Email Templates

Custom branded HTML template set for "Confirm signup" in Supabase Dashboard → Authentication → Email Templates. Uses `{{ .ConfirmationURL }}` which Supabase generates automatically.

### Auth Flow

```
Signup → Supabase sends email with {{ .ConfirmationURL }}
  → User clicks link
  → Browser hits: https://<project>.supabase.co/auth/v1/verify?token=...&redirect_to=https://guana.app/auth/callback
  → Supabase confirms email
  → 302 redirect to: https://guana.app/auth/callback#access_token=...&refresh_token=...&type=signup
  → App opens (via Universal Links or custom scheme fallback)
  → OR user returns to app manually → foreground check detects verification
```

## Custom URL Scheme

| Setting | Value |
|---------|-------|
| Scheme | `guana` |
| Full URL | `guana://auth/callback` |
| Registered in | iOS app's Info.plist (`CFBundleURLTypes`) |

Used as a fallback when Universal Links are not available.

## File Structure

```
guana-web/
├── .well-known/
│   └── apple-app-site-association   ← Universal Links config (DO NOT RENAME)
├── auth/
│   └── callback/
│       └── index.html               ← Auth redirect fallback page
├── privacy/
│   └── index.html                   ← Privacy Policy
├── terms/
│   └── index.html                   ← Terms of Service
├── brand.css                        ← Shared design tokens and base styles
├── index.html                       ← Landing page
├── BRAND.md                         ← Brand guide (colors, voice, typography)
├── APP.md                           ← App features and product context
└── TECHNICAL.md                     ← This file
```

## Deployment

- Push to `main` branch → Vercel auto-deploys
- No build step — plain static files
- Framework preset: Other

## Pages Needed (Future)

- [ ] Full landing page with app screenshots and feature sections
- [ ] App Store badge when published
- [ ] Blog or updates section (optional)
- [ ] Support / contact page
- [ ] FAQ page
