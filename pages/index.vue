<script setup lang="ts">
definePageMeta({
  title: "landing.title",
  titlePrefix: false,
});

const colorMode = useColorMode();
const config = useRuntimeConfig();
const { isLoggedIn } = useAppAuth();
const { t, locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();

useHead({
  meta: [
    {
      name: "description",
      content: t("app.seo.description"),
    },
    {
      property: "og:description",
      content: t("app.seo.description"),
    },
  ],
});

const options = computed(() => ({
  fullScreen: {
    enable: true,
    zIndex: -1,
  },
  background: {
    color: {
      value: "transparent",
    },
  },
  particles: {
    color: {
      value: colorMode.value == "dark" ? "#fff" : "#000",
    },
    links: {
      value: colorMode.value == "dark" ? "#fff" : "#000",
      enable: true,
    },
    move: {
      enable: true,
    },
    number: {
      value: 100,
    },
  },
}));

const mainRedirectUrl = computed(() =>
  isLoggedIn ? localePath("/p") : localePath("/auth/login?callbackUrl=/p")
);

const setupSteps = [
  {
    title: t("landing.setup.items.setup.title"),
    description: t("landing.setup.items.setup.description"),
  },
  {
    title: t("landing.setup.items.accessKey.title"),
    description: t("landing.setup.items.accessKey.description"),
  },
  {
    title: t("landing.setup.items.start.title"),
    description: t("landing.setup.items.start.description"),
  },
];

const advantages = [
  {
    title: t("landing.advantages.items.developer.title"),
    description: t("landing.advantages.items.developer.description"),
    icon: "flare",
    tint: "text-sky-500",
  },
  {
    title: t("landing.advantages.items.lightweight.title"),
    description: t("landing.advantages.items.lightweight.description"),
    icon: "developer_mode",
    tint: "text-primary",
  },
  {
    title: t("landing.advantages.items.metrics.title"),
    description: t("landing.advantages.items.metrics.description"),
    icon: "monitoring",
    tint: "text-rose-500",
  },
];

const usecases = [
  {
    title: t("landing.usecases.items.student.title"),
  },
  {
    title: t("landing.usecases.items.single.title"),
  },
  {
    title: t("landing.usecases.items.simple.title"),
  },
  {
    title: t("landing.usecases.items.demo.title"),
  },
];

const socials = Object.entries(config.public.app.socials).map((x) => {
  let icon: string = "";

  if (x[0] == "github") icon = "/img/github.png";
  else if (x[0] == "npm") icon = "/img/npm.png";

  return {
    name: x[0],
    icon: icon,
    url: x[1],
  };
});
</script>

<template>
  <div class="relative">
    <div class="background">
      <NuxtParticles id="tsparticles" class="size-full" :options="options" />
    </div>

    <div class="scrim" />

    <div class="landing">
      <header class="header">
        <div class="viewport-wrapper">
          <app-logo :link="false" />

          <div class="flex flex-wrap gap-4">
            <Button
              v-if="isLoggedIn"
              class="max-sm:!hidden !px-4 !py-1 !text-sky-500"
              as="router-link"
              :to="mainRedirectUrl"
              severity="info"
              text
            >
              <span>{{ t("landing.initial.goToDashboard") }}</span>
            </Button>

            <Select
              class="!bg-transparent !border-0 !shadow-none hover:!shadow-lg"
              :model-value="locale"
              :options="locales"
              option-label="name"
              option-value="code"
              @update:model-value="navigateTo(switchLocalePath($event))"
            />
          </div>
        </div>
      </header>

      <main>
        <landing-section class="viewport-wrapper !min-h-[75vh]" size="large">
          <div
            class="max-sm:items-start max-sm:justify-start max-sm:text-start col gap-12"
          >
            <h1 class="text-4xl sm:text-6xl font-bold">
              {{ t("landing.initial.title_1") }}
              <br class="max-lg:hidden" >
              <span class="text-primary font-black">{{
                t("landing.initial.title_2")
              }}</span>
            </h1>

            <p class="text-lg max-w-[650px] mx-auto lg:whitespace-pre-wrap">
              {{ t("landing.initial.subtitle") }}
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4">
            <Button
              class="w-full max-w-[180px]"
              as="router-link"
              :to="mainRedirectUrl"
              >{{ t("landing.initial.getStarted") }}</Button
            >

            <Button as="router-link" :to="$localePath('/docs')" text>{{
              t("landing.initial.readDocs")
            }}</Button>
          </div>
        </landing-section>

        <div class="jump large" />

        <landing-section class="black">
          <div class="viewport-wrapper w-full text-start">
            <div class="col gap-8 lg:max-w-[60%]">
              <h2 class="text-6xl font-bold">
                {{ t("landing.setup.title") }}
              </h2>

              <p class="text-xl">{{ t("landing.setup.subtitle") }}</p>
            </div>

            <div class="mt-16 col gap-8">
              <div
                v-for="(item, index) in setupSteps"
                :key="index"
                class="flex gap-4 items-start"
              >
                <div
                  class="size-12 rounded-full border-2 border-primary flex center"
                >
                  <span class="text-xl font-black text-primary">{{
                    index + 1
                  }}</span>
                </div>

                <div class="flex-1 col">
                  <span class="font-medium">{{ item.title }}</span>
                  <span class="text-secondary">{{ item.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </landing-section>

        <div class="jump" />

        <landing-section class="medium">
          <div class="viewport-wrapper">
            <span class="text-6xl font-bold">{{
              t("landing.advantages.title")
            }}</span>

            <div class="mt-20 col lg:!grid lg:grid-cols-3 gap-6">
              <div
                v-for="(item, index) in advantages"
                :key="index"
                class="col gap-2"
              >
                <m-icon
                  :value="item.icon"
                  class="text-7xl"
                  :class="item.tint"
                />

                <h2 class="mt-6 text-2xl font-medium">{{ item.title }}</h2>
                <span class="text-secondary">{{ item.description }}</span>
              </div>
            </div>
          </div>
        </landing-section>

        <landing-section class="medium">
          <div class="viewport-wrapper">
            <h2 class="text-center text-6xl font-bold">
              {{ t("landing.usecases.title") }}
            </h2>

            <div class="mt-12 col lg:!grid gap-x-12 gap-y-6 grid-cols-2">
              <div
                v-for="(item, index) in usecases"
                :key="index"
                class="px-18 py-16 rounded-[60px] border-4 border-gray-300 flex center"
              >
                <h3 class="text-xl text-center">{{ item.title }}</h3>
              </div>
            </div>
          </div>
        </landing-section>

        <div class="jump" />

        <landing-section class="black">
          <div class="viewport-wrapper flex flex-col lg:grid grid-cols-2 gap-8">
            <div class="col">
              <h3 class="text-7xl font-black">
                {{ t("landing.code.title") }}
              </h3>
              <span class="text-3xl mt-8">{{
                t("landing.code.subtitle")
              }}</span>
            </div>

            <div>
              <div class="rounded-xl shadow-lg overflow-hidden">
                <div class="markdown bg-gray-900 pb-4">
                  <ContentDoc path="/code/init" />
                </div>

                <div
                  class="bg-gray-900 bg-opacity-80 dark:bg-opacity-60 px-5 py-4"
                >
                  <Button
                    class="!bg-transparent !text-white dark:!text-primary"
                    as="router-link"
                    :to="$localePath('/docs/getting-started/installation')"
                    severity="secondary"
                  >
                    <m-icon value="developer_guide" />

                    <span>{{ t("landing.initial.readDocs") }}</span>

                    <m-icon value="chevron_right" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </landing-section>

        <div class="jump" />

        <landing-section class="!min-h-screen" size="large">
          <div class="viewport-wrapper">
            <div class="mx-auto max-w-[80%] col items-center gap-8">
              <h2 class="text-2xl font-black text-primary">
                {{ t("landing.contributing.caption") }}
              </h2>

              <span class="text-6xl font-bold">{{
                t("landing.contributing.title")
              }}</span>

              <p class="text-xl whitespace-pre-wrap">
                {{ t("landing.contributing.subtitle") }}
              </p>

              <Button
                severity="contrast"
                as="a"
                :href="config.public.app.socials.github"
                target="_blank"
                rel="noopener"
              >
                <nuxt-img
                  class="size-6 object-cover invert dark:filter-none"
                  src="/img/github.png"
                  alt="GitHub"
                />

                <span class="ms-2">{{
                  t("landing.contributing.openGithub")
                }}</span>
              </Button>

              <p class="text-xl">{{ t("landing.contributing.text") }}</p>
            </div>
          </div>
        </landing-section>

        <div class="jump" />

        <footer class="landing-section black flex center">
          <div class="viewport-wrapper col gap-6 py-12">
            <div class="flex flex-col-reverse lg:grid grid-cols-3 gap-12">
              <div
                class="size-full col gap-2 lg:gap-8 items-start justify-center"
              >
                <div class="flex center gap-2">
                  <app-logo class="!size-8" :link="false" :expanded="false" />
                  <app-logo :link="false" expanded />
                </div>

                <div class="flex items-start justify-start gap-2">
                  <Button
                    v-for="item in socials"
                    :key="item.icon"
                    class="!size-11 !p-0"
                    as="a"
                    :href="item.url"
                    variant="outlined"
                    severity="secondary"
                    target="_blank"
                    rel="noopener"
                  >
                    <nuxt-img
                      class="size-6 dark:invert"
                      :alt="item.name"
                      :src="item.icon"
                    />
                  </Button>
                </div>
              </div>

              <div
                class="col-span-2 col gap-4 border-gray-900 border-2 rounded-[30px] px-8 py-12"
              >
                <h3 class="mt-4 text-6xl font-medium">
                  {{ $locale("landing.footer.getStarted.title") }}
                </h3>
                <p>{{ $locale("landing.footer.getStarted.subtitle") }}</p>

                <div class="flex flex-wrap gap-2 mt-4">
                  <Button
                    class="w-full lg:max-w-[180px]"
                    as="router-link"
                    :to="mainRedirectUrl"
                    severity="contrast"
                    >{{ $locale("landing.initial.getStarted") }}</Button
                  >

                  <Button
                    class="!bg-transparent max-lg:w-full"
                    as="router-link"
                    :to="$localePath('/docs')"
                    severity="secondary"
                    >{{ $locale("landing.initial.readDocs") }}
                  </Button>
                </div>
              </div>
            </div>

            <Divider />

            <div class="flex flex-wrap gap-2 text-secondary">
              <span>{{ t("landing.footer.copyright") }}</span>
              <span>{{ t("landing.footer.license") }}</span>

              <div class="spacer" />

              <div class="flex gap-2 center">
                <m-icon value="email" />
                <span>{{ config.public.app.contacts.email }}</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import url(/assets/css/landing.scss);

.background {
  @apply absolute top-0 left-0 right-0 bottom-0 -z-20;
}

.scrim {
  @apply absolute top-0 left-0 right-0 bottom-0 -z-10;
  height: calc(var(--header-height) * 2);
  @apply pointer-events-none;

  background: linear-gradient(180deg, var(--p-gray-100) 50%, transparent 100%);

  @media (prefers-color-scheme: dark) {
    background: linear-gradient(
      180deg,
      var(--p-gray-900) 50%,
      transparent 100%
    );
  }
}

.landing {
  @apply bg-gray-100 bg-opacity-90;
  @apply dark:bg-gray-800 dark:bg-opacity-95;

  .landing-section {
    &.black {
      @apply bg-gray-200 dark:bg-gray-950;
    }

    &.medium {
      @apply bg-gray-100 dark:bg-gray-900;
    }

    &.semi-transparent {
      @apply bg-gray-100 dark:bg-gray-900 bg-opacity-40;
    }
  }

  .jump {
    @apply w-full h-36;
    @apply bg-gradient-to-b;
    @apply from-transparent to-transparent;

    &.large {
      @apply h-48;
    }

    &:has(+ .landing-section.black) {
      @apply to-gray-200 !important;
    }

    &:has(+ .landing-section.medium) {
      @apply to-gray-100 !important;
    }

    &:has(+ .landing-section.semi-transparent) {
      --tw-gradient-to: color-mix(
        in srgb,
        var(--p-gray-100) 40%,
        transparent
      ) !important;
    }

    @media (prefers-color-scheme: dark) {
      &:has(+ .landing-section.black) {
        @apply to-gray-950 !important;
      }

      &:has(+ .landing-section.medium) {
        @apply to-gray-900 !important;
      }

      &:has(+ .landing-section.semi-transparent) {
        --tw-gradient-to: color-mix(
          in srgb,
          var(--p-gray-900) 40%,
          transparent
        ) !important;
      }
    }
  }

  .landing-section.black + .jump {
    @apply from-gray-200;
  }
  .landing-section.medium + .jump {
    @apply from-gray-100;
  }
  .landing-section.semi-transparent + .jump {
    --tw-gradient-from: color-mix(in srgb, var(--p-gray-100) 40%, transparent);
  }

  @media (prefers-color-scheme: dark) {
    .landing-section.black + .jump {
      @apply from-gray-950;
    }
    .landing-section.medium + .jump {
      @apply from-gray-900;
    }
    .landing-section.semi-transparent + .jump {
      --tw-gradient-from: color-mix(
        in srgb,
        var(--p-gray-900) 40%,
        transparent
      ) !important;
    }
  }
}
</style>
