"use client";

import { useEffect, useState } from "react";
import { APP_STORE_URL } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function TripDeepLinkPage() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // The page URL itself IS the universal link.
    // If the user has the app installed, iOS will intercept this URL
    // and open the app directly. If not, the web page renders.
    // After a short delay, show the fallback download UI.
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="section-padding">
      <Container size="narrow">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Card className="mx-auto w-full max-w-md p-8 text-center">
            {/* Logo */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-teal">
              <span className="text-3xl font-bold text-white">G</span>
            </div>

            <h1 className="mt-6 text-2xl font-bold text-deep">
              Opening Guana...
            </h1>

            <p className="mt-2 text-sm text-deep/60">
              We&apos;re opening this trip in the Guana app.
            </p>

            {/* Animated loading indicator */}
            {!showFallback && (
              <div className="mt-6 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal/20 border-t-teal" />
              </div>
            )}

            {/* Fallback UI */}
            {showFallback && (
              <div className="mt-8">
                <p className="text-sm font-medium text-deep/70">
                  Don&apos;t have the app yet?
                </p>
                <div className="mt-4">
                  <Button href={APP_STORE_URL} size="lg" className="w-full">
                    Download Guana
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Container>
    </section>
  );
}
