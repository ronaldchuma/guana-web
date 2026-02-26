import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: "#FAFAF5",
          color: "#1A2B2A",
        }}
      >
        <div
          style={{
            display: "flex",
            minHeight: "100vh",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "480px" }}>
            <p
              style={{
                fontSize: "80px",
                fontWeight: "bold",
                color: "rgba(13, 124, 102, 0.2)",
                lineHeight: 1,
                margin: 0,
              }}
            >
              404
            </p>
            <h1
              style={{
                marginTop: "16px",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Page not found
            </h1>
            <p
              style={{
                marginTop: "12px",
                fontSize: "16px",
                color: "rgba(26, 43, 42, 0.6)",
                lineHeight: 1.6,
              }}
            >
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </p>
            <div style={{ marginTop: "32px" }}>
              <Link
                href="/"
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
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
