/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["lenis"],

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/legal/privacy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/legal/terms",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path((?!en|es|api|_next|auth|images|\\.well-known|favicon\\.ico|robots\\.txt|sitemap\\.xml|site\\.webmanifest).*)",
          destination: "/es/:path",
        },
      ],
    };
  },
};

export default nextConfig;
