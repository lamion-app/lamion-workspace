<template>
  <div
    class="root"
    :class="{
      'navigation-expanded': navigationExpanded,
      'navigation-visible': isProjectSelected,
    }"
  >
    <template v-if="isProjectSelected && isAppLoaded">
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
      </header>

      <div class="nav-controller drawer">
        <button
          class="btn-expand"
          aria-label="Expand"
          @click="navigationExpanded = !navigationExpanded"
        >
          <m-icon class="text-lg font-black" value="chevron_right" />
        </button>

        <navigation
          v-if="isProjectSelected && isAppLoaded"
          :expanded="navigationExpanded"
          :items="appNavigation.navigationItems"
          @hide="navigationExpanded = false"
        >
          <template v-if="navigationExpanded" #before-menu>
            <ProjectSelect v-model="selectedProject!" :projects="projects" />
          </template>

          <template v-if="!!account" #after-menu>
            <Profile :expanded="navigationExpanded" :account="account" />
          </template>
        </navigation>
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
const projectsStore = useProjectsStore();
const { projects, selectedProject, isProjectSelected } =
  storeToRefs(projectsStore);

const appNavigation = useNavigation();
const router = useRouter();

const navigationExpanded = ref(false);
const pageTitle = ref("");

const isRootRoute = computed(
  () =>
    appNavigation.navigationItems.filter(
      (x) => x.route == router.currentRoute.value.name,
    ).length > 0,
);

onMounted(() => {
  projectsStore.loadInitProject();
});

onMounted(() => {
  const target = document.querySelector("title")!;

  const observer = new MutationObserver(function () {
    pageTitle.value = target.text;
  });

  const config = { subtree: true, characterData: true, childList: true };

  observer.observe(target, config);
});

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

.root {
  @apply bg-surface-950;

  .header {
    @apply absolute top-0 lg:-top-full left-0 z-30;
    @apply w-full;
    height: vars.$header-height;
    @apply flex gap-6 items-center;
    @apply px-6;
    @apply bg-surface-900 transition-all;
  }

  .nav-controller {
    @apply fixed top-0 left-0;
    max-width: min(85vw, 450px);
    @apply w-full h-screen;
    @apply transition;
    transition-property: width, transform;
    @apply bg-surface-950;
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
      @apply rounded-full bg-surface-800 text-primary transition-all;
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
  }

  &.navigation-visible {
    @screen lg {
      .page-content {
        padding-left: vars.$navigation-collapsed-width;
      }

      &.navigation-expanded {
        .page-content {
          padding-left: vars.$navigation-expanded-width;
        }
      }
    }
  }
}
</style>
