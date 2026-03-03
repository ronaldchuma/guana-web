"use client";

import { useEffect, useState } from "react";
import { APP_STORE_URL } from "@/lib/tokens";

export default function AuthCallbackPage() {
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    const searchParams = window.location.search;
    const hashParams = window.location.hash;

    const appUrl = `guana://auth/callback${searchParams}${hashParams}`;
    window.location.href = appUrl;

    const timer = setTimeout(() => {
      setShowManual(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-6 font-sans text-deep">
      <div className="max-w-sm text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-teal">
          <span className="text-3xl font-bold text-white">G</span>
        </div>

        <h1 className="mt-6 text-2xl font-bold">Redirecting to Guana...</h1>
        <p className="mt-2 text-sm text-deep/60">Completing your sign-in.</p>

        {!showManual && (
          <div className="mt-6 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal/20 border-t-teal" />
          </div>
        )}

        {showManual && (
          <div className="mt-8">
            <a
              href={APP_STORE_URL}
              className="inline-flex items-center justify-center rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal/90"
            >
              Open Guana
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
