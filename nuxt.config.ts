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
    "@vueuse/nuxt",
    "@nuxt/content",
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
    "nuxt-particles",
  ],
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
        },
      ],
    },
    keepalive: true,
  },
  components: [
    {
      path: "@/components",
      pathPrefix: false,
    },
  ],
  css: ["@/assets/css/main.scss"],
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
    dirs: ["types/**", "composables/**", "components-types/**"],
    presets: [
      {
        from: "vue-router",
        imports: ["LocationQuery"],
      },
    ],
  },
  runtimeConfig: {
    public: {
      app: {
        githubRepo: process.env.GITHUB_REPO_URL,
      },
      api: {
        origin: process.env.API_ORIGIN,
      },
      oauth: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          redirectUrl: process.env.GITHUB_REDIRECT_URL,
        },
      },
    },
  },
  site: {
    url: process.env.WORKSPACE_ORIGIN,
    name: "Lamion",
  },
  sitemap: {
    cacheMaxAgeSeconds: 3600,
    sources: ["/api/__sitemap__/urls"],
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
    baseUrl: process.env.WORKSPACE_ORIGIN,
    vueI18n: "./configs/i18n.config.ts",
    strategy: "no_prefix",
    defaultLocale: "ru",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    locales: [
      {
        code: "en",
        language: "en-US",
      },
      {
        code: "ru",
        language: "ru-RU",
      },
    ],
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
  content: {
    highlight: {
      theme: {
        default: "one-dark-pro",
        dark: "github-dark",
      },
    },
  },
  viewport: {
    breakpoints: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
    defaultBreakpoints: {
      desktop: "lg",
      mobile: "xs",
      tablet: "md",
    },
    fallbackBreakpoint: "lg",
  },
  particles: {
    mode: "slim",
    lazy: true,
  },
  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    globalAppMiddleware: false,
    provider: {
      type: "local",
      session: {
        dataType: {
          id: "number",
          username: "string",
          avatar: "string | undefined",
        },
      },
      pages: {
        login: "/auth/login",
      },
      endpoints: {
        signIn: { path: "auth/signIn", method: "post" },
        signOut: false,
        signUp: { path: "auth/signUp", method: "post" },
        getSession: { path: "account/me", method: "get" },
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: "auth/refresh", method: "post" },
      },
      token: {
        signInResponseTokenPointer: "/refreshToken",
        type: "Bearer",
        cookieName: "auth.token",
        headerName: "Authorization",
        maxAgeInSeconds: 60 * 60 * 24 * 3,
        sameSiteAttribute: "lax",
        secureCookieAttribute: false,
        httpOnlyCookieAttribute: false,
      },
    },
  },
});