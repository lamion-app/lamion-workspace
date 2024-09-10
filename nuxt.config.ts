import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "nuxt-viewport"
  ],
  typescript: {
    typeCheck: true,
  },
  eslint: {
    checker: true,
  },
  i18n: {
    vueI18n: "./configs/i18n.config.ts",
  },
  tailwindcss: {
    configPath: "./configs/tailwind.config.ts",
  },
});
