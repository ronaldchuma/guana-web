import Image from "next/image";

interface GuanaLogoProps {
  className?: string;
  height?: number;
}

export function GuanaLogo({ className, height = 32 }: GuanaLogoProps) {
  const width = Math.round((34 / 50) * height);
  return (
    <Image
      src="/images/guana-logo.svg"
      alt="Guana"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
