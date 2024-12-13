import * as Locales from "@/configs/locales";

export default defineI18nConfig(() => ({
  fallbackLocale: "en",
  datetimeFormats: {
    en: Locales.EnglishLocale.datetime,
    ru: Locales.RussianLocale.datetime,
  },
}));
