import * as Locales from "@/configs/locales";

export default defineI18nConfig(() => ({
  fallbackLocale: "ru",
  messages: {
    en: Locales.EnglishLocale.strings,
    ru: Locales.RussianLocale.strings,
  },
  datetimeFormats: {
    en: Locales.EnglishLocale.datetime,
    ru: Locales.RussianLocale.datetime,
  },
}));
