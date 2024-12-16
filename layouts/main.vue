<template>
  <div
    class="root"
    :class="{
      'navigation-expanded': navigationExpanded,
    }"
  >
    <template v-if="isAppLoaded">
      <header class="header">
        <button class="size-[30px]" @click="onNavigationClick">
          <m-icon
            class="text-3xl font-black"
            :value="isRootRoute ? 'menu' : 'arrow_back'"
          />
        </button>

        <h3 class="text-lg font-medium text-nowrap">
          {{ pageTitle }}
        </h3>

        <div class="spacer" />

        <div id="header-actions" />
      </header>

      <div class="nav-controller drawer">
        <button
          class="btn-expand"
          @click="navigationExpanded = !navigationExpanded"
        >
          <m-icon class="text-lg font-black" value="chevron_right" />
        </button>

        <app-navigation
          :expanded="navigationExpanded"
          :items="navigationItems"
          @hide="navigationExpanded = false"
        >
          <template v-if="navigationExpanded" #before-menu>
            <ProjectSelect
              v-if="!!selectedProject && !!projects"
              :model-value="selectedProject!"
              :projects="projects"
              @update:model-value="openProject($event.id)"
            />
          </template>

          <template v-if="!!account" #after-menu>
            <profile-card
              :expanded="navigationExpanded"
              :account="account"
              @click="navigationExpanded = false"
            />
          </template>
        </app-navigation>
      </div>

      <div
        v-if="navigationExpanded"
        class="scrim"
        @click="navigationExpanded = false"
      />
    </template>

    <div class="page-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const viewport = useViewport();
const { isAppLoaded } = storeToRefs(useAppStore());
const { account } = useAppAuth();
const { t, locale } = useI18n();
const { projects, selectedProject, openProject } = useProjects();

const router = useRouter();
const route = useRoute();

const navigationExpanded = ref(false);
const { title: pageTitle } = useSeo();

const navigationItems = computed(() => [
  {
    name: t("app.navigation.dashboard"),
    icon: String.fromCodePoint(0xf190),
    route: "p-pId",
  },
  {
    name: t("app.navigation.users"),
    icon: String.fromCodePoint(0xe87c),
    route: "p-pId-users",
  },
  {
    name: t("app.navigation.features"),
    icon: String.fromCodePoint(0xf20e),
    route: "p-pId-features",
  },
  {
    name: t("app.navigation.activity"),
    icon: String.fromCodePoint(0xe1e6),
    route: "p-pId-activity",
  },
  {
    name: t("app.navigation.settings"),
    icon: "admin_panel_settings",
    route: "p-pId-settings",
  },
]);

const isRootRoute = computed(
  () =>
    route.meta.isRootRoute === true ||
    navigationItems.value.findIndex((x) => `${x.route}___${locale.value}` == route.name) != -1
);

watchEffect(() => {
  if (viewport.match("lg")) {
    navigationExpanded.value = false;
  }
});

function onNavigationClick() {
  if (isRootRoute.value) {
    navigationExpanded.value = !navigationExpanded.value;
  } else {
    router.go(-1);
  }
}
</script>

<style scoped lang="scss">
@use "@/assets/css/vars";

.root,
.nav-controller {
  @apply bg-surface-100 dark:bg-surface-950;
}

.root {
  .header {
    @apply absolute top-0 lg:-top-full left-0 z-30;
    @apply w-full;
    height: vars.$header-height;
    @apply flex gap-6 items-center;
    @apply px-6;
    @apply bg-surface-100 dark:bg-surface-900;
    @apply transition-all;

    #header-actions {
      > :not(:last-child) {
        display: none !important;
      }
    }
  }

  .nav-controller {
    @apply fixed top-0 left-0;
    max-width: min(85vw, 450px);
    @apply w-full h-screen;
    @apply transition;
    transition-property: width, transform;
    @apply -translate-x-full;
    z-index: 500;

    @screen lg {
      width: vars.$navigation-collapsed-width;
      @apply transform-none;
    }

    .btn-expand {
      @apply absolute top-[6rem] right-0 z-10;
      @apply size-6 max-xl:hidden flex;
      @apply items-center justify-center;
      @apply rounded-full text-primary transition-all;
      @apply bg-surface-300 dark:bg-surface-800;
      @apply translate-x-1/2;
    }
  }

  .scrim {
    @apply absolute top-0 left-0 right-0 bottom-0;
    @apply lg:hidden;
    @apply bg-surface-900 opacity-75;
    z-index: 400;
  }

  .page-content {
    @apply size-full;
    padding-top: vars.$header-height;

    @screen lg {
      padding-top: 0;
      padding-left: vars.$navigation-collapsed-width;
    }
  }

  &.navigation-expanded {
    .nav-controller {
      @apply translate-x-0;

      @screen xl {
        width: vars.$navigation-expanded-width;
      }

      .btn-expand {
        transform: translateX(50%) rotate(180deg);
      }
    }

    @screen lg {
      .page-content {
        padding-left: vars.$navigation-expanded-width;
      }
    }
  }
}
</style>
