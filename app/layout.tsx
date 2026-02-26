import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import { ClientSmoothScroll } from "@/components/motion/ClientSmoothScroll";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const easeDisplay = localFont({
  src: "../public/fonts/EaseDisplay-Medium.woff2",
  variable: "--font-ease-display",
  display: "swap",
  weight: "500",
});

export const viewport: Viewport = {
  themeColor: "#0D7C66",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://guana.app"),
  title: {
    default: "Guana — Share rides across Costa Rica",
    template: "%s | Guana",
  },
  description:
    "Find affordable rides between Costa Rica's cities and best surf spots. Or share your drive and offset costs.",
  keywords: [
    "Costa Rica rideshare",
    "ride to Jaco",
    "surf transport Costa Rica",
    "carpooling Costa Rica",
    "Guana",
    "ride sharing",
    "intercity travel",
    "Tamarindo",
    "Santa Teresa",
    "Nosara",
  ],
  openGraph: {
    type: "website",
    siteName: "Guana",
    title: "Guana — Share rides across Costa Rica",
    description:
      "Ridesharing for surfers, travelers, and locals moving between Costa Rica's cities and beach destinations.",
    locale: "en_US",
    alternateLocale: ["es_CR"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guana — Share rides across Costa Rica",
    description:
      "Find or offer rides between Costa Rica's cities and surf destinations.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  other: {
    "apple-itunes-app": "app-id=6504720981",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${plusJakarta.variable} ${easeDisplay.variable}`} suppressHydrationWarning>
      <body>
        <ClientSmoothScroll />
        {children}
      </body>
    </html>
  );
}
