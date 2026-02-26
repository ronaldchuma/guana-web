"use client";

import { useEffect, useState } from "react";
import { APP_STORE_URL } from "@/lib/tokens";

export default function AuthCallbackPage() {
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    // The Universal Link system should handle this redirect natively.
    // As a fallback, try to open the app via custom scheme with the
    // current URL's search params (which contain the auth tokens).
    const searchParams = window.location.search;
    const hashParams = window.location.hash;

    // Attempt to open the app via custom URL scheme
    const appUrl = `guana://auth/callback${searchParams}${hashParams}`;
    window.location.href = appUrl;

    // After a timeout, show the manual fallback button
    const timer = setTimeout(() => {
      setShowManual(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
            backgroundColor: "#FAFAF5",
            color: "#1A2B2A",
            padding: "24px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            {/* Logo */}
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "16px",
                backgroundColor: "#0D7C66",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <span
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                G
              </span>
            </div>

            <h1
              style={{
                marginTop: "24px",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Redirecting to Guana...
            </h1>

            <p
              style={{
                marginTop: "8px",
                fontSize: "14px",
                color: "rgba(26, 43, 42, 0.6)",
              }}
            >
              Completing your sign-in.
            </p>

            {/* Loading spinner */}
            {!showManual && (
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(13, 124, 102, 0.5)",
                    animation: "pulse 1.4s ease-in-out infinite",
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(13, 124, 102, 0.5)",
                    animation: "pulse 1.4s ease-in-out 0.2s infinite",
                  }}
                />
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(13, 124, 102, 0.5)",
                    animation: "pulse 1.4s ease-in-out 0.4s infinite",
                  }}
                />
              </div>
            )}

            {/* Manual fallback */}
            {showManual && (
              <div style={{ marginTop: "32px" }}>
                <a
                  href={APP_STORE_URL}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px 32px",
                    borderRadius: "9999px",
                    backgroundColor: "#0D7C66",
                    color: "white",
                    fontWeight: "600",
                    fontSize: "16px",
                    textDecoration: "none",
                    transition: "background-color 0.2s",
                  }}
                >
                  Open Guana
                </a>
              </div>
            )}

            <style
              dangerouslySetInnerHTML={{
                __html: `
                  @keyframes pulse {
                    0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
                    40% { opacity: 1; transform: scale(1); }
                  }
                `,
              }}
            />
          </div>
        </div>
      </body>
    </html>
  );
}
