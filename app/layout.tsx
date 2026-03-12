import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ClientSmoothScroll } from "@/components/motion/ClientSmoothScroll";
import "./globals.css";

/* Neue Haas Grotesk Display Pro — 55 Roman (normal) + 65 Medium (medium) */
const neueHaas = localFont({
  src: [
    {
      path: "../public/fonts/Neue Haas Grotesk Display Pro 55 Roman.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Neue Haas Grotesk Display Pro 65 Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-nhgdp",
  display: "optional",
});

const easeDisplay = localFont({
  src: "../public/fonts/EaseDisplay-Medium.woff2",
  variable: "--font-ease-display",
  display: "optional",
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
    "ridesharing Costa Rica",
    "carpooling Costa Rica",
    "ride to Jaco",
    "ride to Tamarindo",
    "ride to Santa Teresa",
    "ride to Nosara",
    "ride to Arenal",
    "surf transport Costa Rica",
    "San Jose to beach shuttle",
    "intercity travel Costa Rica",
    "shared ride Costa Rica",
    "viaje compartido Costa Rica",
    "Guana app",
    "Guana rideshare",
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
  verification: {
    google: "7CiTFgsTm031CuGPcH2BA5zje_gPqmQxYn3NttdJN4U",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: "/images/favicon.png",
  },
  manifest: "/site.webmanifest",
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
    <html lang="en" className={`${neueHaas.variable} ${easeDisplay.variable}`} suppressHydrationWarning>
      <body>
        <ClientSmoothScroll />
        {children}
      </body>
    </html>
  );
}
