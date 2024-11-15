import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import type { DateTimeFormat } from "@intlify/core-base";

export const EnglishLocale = {
  strings: en,
  datetime: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
  } as DateTimeFormat,
};

type Locale = typeof EnglishLocale;

export const RussianLocale: Locale = {
  strings: ru,
  datetime: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
  },
};
