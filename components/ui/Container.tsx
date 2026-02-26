import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
}

const sizeClasses: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-7xl",
  narrow: "max-w-4xl",
  wide: "max-w-8xl",
};

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full", sizeClasses[size], className)}
      style={{
        paddingLeft: "var(--container-padding-x)",
        paddingRight: "var(--container-padding-x)",
      }}
    >
      {children}
    </div>
  );
}
