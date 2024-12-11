<script setup lang="ts">
const colorMode = useColorMode();
const config = useRuntimeConfig();

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

const setupSteps = [
  {
    title: "Setup new project",
    description: "Sign up and create project",
  },
  {
    title: "Create access key",
    description: "Generate access key for your project",
  },
  {
    title: "Start using Lamion",
    description: "Install dependencies and setup logger by guide",
  },
];

const advantages = [
  {
    title: "Lightweight",
    description:
      "Lamion is a small library that will not overload your project. Bundle size is only 11 KB!",
    icon: "flare",
    tint: "text-sky-500",
  },
  {
    title: "Developer-oriented",
    description:
      "The main purpose of the project is to help independent developers with their projects.",
    icon: "developer_mode",
    tint: "text-primary",
  },
  {
    title: "Metrics, Dimensions, Reports",
    description:
      "Lamion provides a comprehensive detailed report on your project's activities. ",
    icon: "monitoring",
    tint: "text-rose-500",
  },
];

const usecases = [
  {
    title: "Small student projects",
  },
  {
    title: "Projects with one developer",
  },
  {
    title: "Projects not requiring in-depth analytics",
  },
  {
    title: "Demonstration projects for learning WEB development",
  },
];
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

          <Button
            class="max-sm:!hidden !px-4 !py-1 !text-sky-500"
            as="router-link"
            to="/p"
            severity="info"
            text
          >
            <span>Go to dasboard</span>
          </Button>
        </div>
      </header>

      <main>
        <landing-section class="viewport-wrapper !min-h-[75vh]" size="large">
          <div
            class="max-sm:items-start max-sm:justify-start max-sm:text-start col gap-12"
          >
            <h1 class="text-4xl sm:text-6xl font-bold">
              {{ $locale("landing.title_1") }}
              <br />
              <span class="text-primary font-black">{{
                $locale("landing.title_2")
              }}</span>
            </h1>

            <p class="text-lg max-w-[650px] mx-auto">
              {{ $locale("landing.subtitle") }}
            </p>
          </div>

          <div class="flex flex-wrap justify-center gap-4">
            <Button class="w-full max-w-[180px]" as="router-link" to="/p"
              >Get started</Button
            >

            <Button
              class="w-full max-w-[180px]"
              as="router-link"
              to="/docs"
              text
              >Read docs</Button
            >
          </div>
        </landing-section>

        <div class="jump large" />

        <landing-section class="black">
          <div class="viewport-wrapper w-full text-start">
            <div class="col gap-8 lg:max-w-[60%]">
              <h2 class="text-6xl font-bold">Easiest to use</h2>

              <p class="text-xl">
                The project development process becomes clear when intuitive
                dashboards provide instant access to data without requiring any
                SQL or analytics skills.
              </p>
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
            <span class="text-6xl font-bold">Advantages</span>

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
                <span class="text-gray-300">{{ item.description }}</span>
              </div>
            </div>
          </div>
        </landing-section>

        <landing-section class="medium">
          <div class="viewport-wrapper">
            <h2 class="text-center text-6xl font-bold">Use cases</h2>

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
          <div class="viewport-wrapper grid grid-cols-2 gap-8">
            <div class="col">
              <h3 class="text-7xl font-black">Focus on creativity</h3>
              <span class="text-3xl mt-8"
                >With Lamion, you don't have to worry about any analytics issues
                in your app. Set it up once - use it everywhere.</span
              >
            </div>

            <div>
              <div class="rounded-xl shadow-lg overflow-hidden">
                <div class="markdown bg-gray-900 pb-4">
                  <ContentDoc path="/code/init" />
                </div>

                <div class="bg-gray-900/60 px-5 py-4">
                  <Button
                    class="!bg-transparent"
                    as="router-link"
                    to="/docs"
                    severity="secondary"
                  >
                    <span>Read docs</span>

                    <m-icon value="chevron_right" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </landing-section>

        <div class="jump" />

        <landing-section size="large" class="semi-transparent">
          <div class="viewport-wrapper">
            <div class="mx-auto max-w-[80%] col items-center gap-8">
              <h2 class="text-2xl font-black text-primary">Contributing</h2>

              <span class="text-6xl font-bold">Help us improve Lamion</span>

              <p class="text-xl">
                You can help improve Lamion by contributing to our GitHub
                repositories.
                <br />
                We believe that your opinions and ideas will help make Lamion
                even better.
              </p>

              <Button
                severity="contrast"
                as="a"
                :href="config.public.app.githubRepo"
                target="_blank"
                rel="noopener"
              >
                <img
                  class="size-6 object-cover light:invert"
                  src="/img/github.png"
                  alt="GitHub"
                />

                <span class="ms-2">Go to Lamion's GitHub page</span>
              </Button>

              <p class="text-xl">
                If you have any suggestions, improvements or fixes, please
                create a pull request or open an issue in our repositories. We
                appreciate every help and will be happy to consider your
                suggestions!
              </p>
            </div>
          </div>
        </landing-section>

        <div class="jump" />

        <landing-section class="viewport-wrapper !pb-56">
          <div class="viewport-wrapper col center gap-4">
            <app-logo class="!size-28" :link="false" :expanded="false" />

            <h3 class="mt-4 text-6xl font-medium">Try Lamion today</h3>
            <p>No payment or anything else is required</p>

            <Button
              class="w-full max-w-[180px] mt-8"
              as="router-link"
              to="/p"
              rounded
              >Get started</Button
            >
          </div>
        </landing-section>

        <div class="jump large" />

        <footer class="landing-section black h-[300px]">
          <div class="viewport-wrapper">Footer</div>
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
      @apply bg-gray-950;
    }

    &.medium {
      @apply bg-gray-900;
    }

    &.semi-transparent {
      @apply bg-gray-900 bg-opacity-40;
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

  .landing-section.black + .jump {
    @apply from-gray-950;
  }
  .landing-section.medium + .jump {
    @apply from-gray-900;
  }
  .landing-section.semi-transparent + .jump {
    --tw-gradient-from: color-mix(in srgb, var(--p-gray-900) 40%, transparent);
  }
}
</style>
