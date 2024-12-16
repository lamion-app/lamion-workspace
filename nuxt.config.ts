import { defineOrganization } from "nuxt-schema-org/schema";
import { defineNuxtConfig } from "nuxt/config";
import Aura from "@primevue/themes/aura";

const STATIC_EXPIRES = 1;

const DEPLOY_URL =
  process.env.DEPLOY_SPECIAL_URL ??
  process.env.DEPLOY_PRIME_URL ??
  process.env.URL!;

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
    "@nuxt/image",
  ],
  nitro: {
    routeRules: {
      "/img/**": {
        headers: {
          "cache-control": `public,max-age=${STATIC_EXPIRES},s-maxage=${STATIC_EXPIRES}`,
        },
      },
    },
  },
  app: {
    head: {
      meta: [
        {
          name: "google-site-verification",
          content: "ZcKm2416laGr3KgHL1pAcT-ZD4RbnmyMnufrQ5s4x4s",
        },
        {
          name: "yandex-verification",
          content: "b6848af81e24d3b8",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
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
        contacts: {
          email: process.env.CONTACT_EMAIL,
        },
        socials: {
          github: process.env.GITHUB_REPO_URL,
          npm: process.env.NPM_URL,
        },
      },
      api: {
        origin: process.env.API_ORIGIN,
      },
      oauth: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID,
          redirectUrl: DEPLOY_URL + "auth/oauth/github",
        },
      },
    },
  },
  site: {
    url: DEPLOY_URL,
    name: "Lamion",
  },
  seo: {
    automaticDefaults: false,
  },
  schemaOrg: {
    identity: defineOrganization({
      name: "Lamion",
      alternateName: "Lamion Analytics",
      description: "Easiest analytics for WEB projects",
      email: process.env.CONTACT_EMAIL,
      url: DEPLOY_URL,
      logo: "/favicon.ico",
      sameAs: [process.env.NPM_URL!, process.env.GITHUB_REPO_URL!],
    }),
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
    baseUrl: DEPLOY_URL,
    vueI18n: "./configs/i18n.config.ts",
    strategy: "prefix_except_default",
    defaultLocale: process.env.DEFAULT_LOCALE?.toString() as never,
    lazy: true,
    locales: [
      {
        code: "en",
        language: "en-US",
        name: "English",
        file: "en-US.json",
      },
      {
        code: "ru",
        language: "ru-RU",
        name: "Русский",
        file: "ru-RU.json",
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
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
  image: {
    provider: process.env.NUXT_IMAGE_PROVIDER,
    domains: [DEPLOY_URL],
  },
  content: {
    highlight: {
      theme: {
        default: "one-dark-pro",
        dark: "github-dark",
      },
    },
    navigation: {
      fields: ["seoDescription"],
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
    baseURL: process.env.API_ORIGIN + "/",
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
