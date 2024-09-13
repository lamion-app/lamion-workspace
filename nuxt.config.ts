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
    "nuxt-viewport",
    "@sidebase/nuxt-auth",
  ],
  imports: {
    dirs: ["types", "types/**", "composables/**"],
    presets: [
      {
        from: "vue-router",
        imports: ["LocationQuery"],
      },
    ],
  },
  runtimeConfig: {
    api: {
      origin: process.env.API_ORIGIN,
    },
    auth: {
      origin: process.env.AUTH_ORIGIN,
      secret: process.env.AUTH_SECRET,
    },
    public: {
      oauth: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          redirectUrl: process.env.GITHUB_REDIRECT_URL,
        },
        google: {
          clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
          redirectUrl: process.env.GOOGLE_REDIRECT_URL,
        },
      },
    },
  },
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
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    globalAppMiddleware: true,
    provider: {
      type: "local",
      session: {
        dataType: {
          id: "string",
          username: "string",
        },
      },
      pages: {
        login: "/login",
      },
      endpoints: {
        signIn: { path: "login", method: "post" },
        signOut: { path: "logout", method: "post" },
        signUp: { path: "register", method: "post" },
        getSession: { path: "me", method: "get" },
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: "refresh", method: "post" },
      },
      token: {
        signInResponseTokenPointer: "/token",
        type: "Bearer",
        cookieName: "auth.token",
        headerName: "Authorization",
        maxAgeInSeconds: 1800,
        sameSiteAttribute: "lax",
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
    },
  },
  css: ["@/assets/css/_normalize.scss"],
});
