import en from "~/locales/en.json";
import ru from "~/locales/ru.json";

export const EnglishLocale = en;

type Locale = typeof EnglishLocale;

export const RussianLocale: Locale = ru;
