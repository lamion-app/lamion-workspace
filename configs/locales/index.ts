import type { DateTimeFormat } from "@intlify/core-base";

export const EnglishLocale = {
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
      weekday: "long",
    },
  },
};
