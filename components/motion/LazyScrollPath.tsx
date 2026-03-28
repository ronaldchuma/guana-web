"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const ScrollPath = lazy(() =>
  import("./ScrollPath").then((m) => ({ default: m.ScrollPath })),
);

export function LazyScrollPath() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <ScrollPath />
    </Suspense>
  );
}
