import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { RouteData } from "@/lib/routes/data";
import { cn, localePath } from "@/lib/utils";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";

interface RouteCardProps {
  route: RouteData;
  locale: Locale;
  dictionary: {
    cta: string;
    distance: string;
    duration: string;
    price: string;
  };
}

function DistanceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433a19.695 19.695 0 0 0 2.683-2.007c1.984-1.764 4.065-4.544 4.065-8.342A8.12 8.12 0 0 0 10 0 8.12 8.12 0 0 0 1.88 8c0 3.798 2.08 6.578 4.065 8.342a19.695 19.695 0 0 0 2.683 2.007 14.21 14.21 0 0 0 .757.433l.281.14.018.008.006.003ZM10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-3.5 w-3.5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.798 7.45c.512-.67 1.135-.95 1.702-.95s1.19.28 1.702.95a.75.75 0 0 0 1.196-.91C12.637 5.55 11.5 5 10.5 5s-2.137.55-2.898 1.54A4.489 4.489 0 0 0 6.5 9.5c0 1.152.398 2.18 1.102 2.96C8.363 13.45 9.5 14 10.5 14s2.137-.55 2.898-1.54a.75.75 0 0 0-1.196-.91c-.512.67-1.135.95-1.702.95s-1.19-.28-1.702-.95A2.989 2.989 0 0 1 8 9.5c0-.766.259-1.508.798-2.05Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4 flex-shrink-0 text-teal"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function RouteCard({ route, locale, dictionary }: RouteCardProps) {
  const origin = route.origin[locale];
  const destination = route.destination[locale];
  const href = localePath(`/routes/${route.slug}`, locale);

  return (
    <Card hover className="flex flex-col p-6">
      {/* Origin -> Destination */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-lg font-semibold text-deep">{origin}</span>
        <ArrowIcon />
        <span className="text-lg font-semibold text-deep">{destination}</span>
      </div>

      {/* Metadata chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Chip icon={<DistanceIcon />}>
          {dictionary.distance}: {route.distance}
        </Chip>
        <Chip icon={<ClockIcon />}>
          {dictionary.duration}: {route.duration}
        </Chip>
        <Chip icon={<PriceIcon />}>
          {dictionary.price}: {route.price}
        </Chip>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Button href={href} size="sm" className="w-full">
          {dictionary.cta}
        </Button>
      </div>
    </Card>
  );
}
