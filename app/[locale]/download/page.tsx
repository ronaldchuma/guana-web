"use client";

import { useEffect, useState } from "react";
import { APP_STORE_URL } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function DownloadPage() {
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = APP_STORE_URL;
      setRedirected(true);
    }, 1000);

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
              {redirected ? "Opening App Store..." : "Get Guana"}
            </h1>

            {/* Loading indicator */}
            {!redirected && (
              <div className="mt-4 flex items-center justify-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal/60" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal/60 [animation-delay:0.2s]" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-teal/60 [animation-delay:0.4s]" />
              </div>
            )}

            {redirected && (
              <p className="mt-3 text-sm text-deep/60">
                If the App Store didn&apos;t open automatically:
              </p>
            )}

            <div className="mt-6">
              <Button href={APP_STORE_URL} size="lg" className="w-full">
                Download on the App Store
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
