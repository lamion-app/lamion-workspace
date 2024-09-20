import { defineNuxtConfig } from "nuxt/config";
import Aura from "@primevue/themes/aura";

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/i18n",
    "nuxt-viewport",
    "@sidebase/nuxt-auth",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
  ],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
        },
      ],
    },
  },
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  css: ["@/assets/css/_normalize.scss", "@/assets/css/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
  },
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
  pinia: {
    storesDirs: ["./store/**"],
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
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
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
});
