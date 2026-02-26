"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const SmoothScroll = lazy(() =>
  import("./SmoothScroll").then((m) => ({ default: m.SmoothScroll })),
);

export function ClientSmoothScroll() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <SmoothScroll />
    </Suspense>
  );
}
