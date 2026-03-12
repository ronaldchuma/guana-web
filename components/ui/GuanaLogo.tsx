import Image from "next/image";

interface GuanaLogoProps {
  className?: string;
  height?: number;
}

export function GuanaLogo({ className, height = 32 }: GuanaLogoProps) {
  const width = Math.round((34 / 50) * height);
  return (
    <Image
      src="https://zkmrnbemrbogwzztzpyj.supabase.co/storage/v1/object/public/Website%20Media/guana-logo.png"
      alt="Guana"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
