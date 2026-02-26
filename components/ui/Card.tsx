import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({ children, className, hover, glass }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-deep/[0.06]",
        glass
          ? "bg-white/80 backdrop-blur-sm"
          : "bg-white",
        hover && "card-lift",
        className,
      )}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {children}
    </div>
  );
}
