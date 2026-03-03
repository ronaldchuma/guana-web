import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream p-6 font-sans text-deep">
      <div className="max-w-md text-center">
        <p className="text-[80px] font-bold leading-none text-teal/20">404</p>
        <h1 className="mt-4 text-[28px] font-bold">Page not found</h1>
        <p className="mt-3 text-base leading-relaxed text-deep/60">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-teal px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-teal/90"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
