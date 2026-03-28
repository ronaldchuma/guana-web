"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Renders Vercel Analytics and Speed Insights only after hydration.
 * This prevents content blockers from stripping server-rendered script
 * tags before React hydrates, which would cause a hydration mismatch
 * (React error #300).
 */
export function DeferredAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
