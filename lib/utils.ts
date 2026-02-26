import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function localePath(path: string, locale: string): string {
  if (locale === "en") return path;
  return `/${locale}${path}`;
}
