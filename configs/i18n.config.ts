import * as Locales from "@/configs/locales";

export default defineI18nConfig(() => ({
  fallbackLocale: "ru",
  messages: {
    en: Locales.EnglishLocale,
    ru: Locales.RussianLocale,
  },
}));
