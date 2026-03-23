"use client";

import dynamic from "next/dynamic";

const ScrollPath = dynamic(
  () => import("./ScrollPath").then((m) => m.ScrollPath),
  { ssr: false },
);

export function LazyScrollPath() {
  return <ScrollPath />;
}
