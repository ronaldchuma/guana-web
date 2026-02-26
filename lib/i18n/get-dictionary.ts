import { i18n, type Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  es: () => import("./dictionaries/es.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  const loader = dictionaries[locale] ?? dictionaries[i18n.defaultLocale];
  return loader();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
