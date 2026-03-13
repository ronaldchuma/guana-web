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
    default: "Guana — Comparte viajes por Costa Rica",
    template: "%s | Guana",
  },
  description:
    "Encuentra viajes accesibles entre las ciudades de Costa Rica y sus mejores destinos de surf. O comparte tu viaje y reduce costos.",
  keywords: [
    "viaje compartido Costa Rica",
    "ridesharing Costa Rica",
    "carpooling Costa Rica",
    "viaje a Jacó",
    "viaje a Tamarindo",
    "viaje a Santa Teresa",
    "viaje a Nosara",
    "viaje a Arenal",
    "transporte surf Costa Rica",
    "San José a playa",
    "viaje intercity Costa Rica",
    "Costa Rica rideshare",
    "shared ride Costa Rica",
    "Guana app",
    "Guana rideshare",
  ],
  openGraph: {
    type: "website",
    siteName: "Guana",
    title: "Guana — Comparte viajes por Costa Rica",
    description:
      "Viajes compartidos para surfers, viajeros y locales que se mueven entre las ciudades y playas de Costa Rica.",
    locale: "es_CR",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guana — Comparte viajes por Costa Rica",
    description:
      "Encuentra o comparte viajes entre las ciudades y destinos de surf de Costa Rica.",
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
    <html lang="es" className={`${neueHaas.variable} ${easeDisplay.variable}`} suppressHydrationWarning>
      <body>
        <ClientSmoothScroll />
        {children}
      </body>
    </html>
  );
}
