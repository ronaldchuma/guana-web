import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Chip({ children, icon, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-deep/[0.06] bg-cream px-3 py-1.5 text-sm font-medium text-deep/80",
        className,
      )}
    >
      {icon && (
        <span className="flex-shrink-0 text-deep/50" aria-hidden="true">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
