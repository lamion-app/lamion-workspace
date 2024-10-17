<template>
  <div class="root">
    <template v-if="isProjectSelected && isAppLoaded">
      <header class="header">
        <button @click="navigationExpanded = !navigationExpanded">
          <span class="material-symbols-outlined text-3xl font-black"
            >&#xe5d2;</span
          >
        </button>

        <!-- TODO -->
        <h3 class="text-lg font-medium text-nowrap">Current page name</h3>
      </header>

      <div
        class="nav-controller drawer"
        :class="{
          expanded: navigationExpanded
        }"
      >
        <button
          class="btn-expand"
          aria-label="Expand"
          @click="navigationExpanded = !navigationExpanded"
        >
          <span class="material-symbols-outlined text-lg font-black"
            >&#xe5cc;</span
          >
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

    <slot />
  </div>
</template>

<script setup lang="ts">
const { isAppLoaded } = storeToRefs(useAppStore());
const { account } = useAuthProviders();
const projectsStore = useProjectsStore();
const { projects, selectedProject, isProjectSelected } =
  storeToRefs(projectsStore);

const appNavigation = useNavigation();

const navigationExpanded = ref(false);

onMounted(() => {
  projectsStore.loadInitProject();
});
</script>

<style scoped lang="scss">
.root {
  @apply flex;
  @apply bg-surface-950;

  .header {
    @apply absolute top-0 left-0 z-30;
    @apply w-full;
    height: var(--header-height);
    @apply flex gap-6 items-center;
    @apply px-6;
    @apply bg-surface-800 transition-all;
  }

  .nav-controller {
    @apply absolute;
    max-width: min(85vw, 450px);
    @apply w-full h-screen;
    @apply transition;
    transition-property: width, transform;
    @apply bg-surface-950;
    z-index: 500;

    &:not(.expanded) {
      @apply -translate-x-full;
    }

    .btn-expand {
      display: none;

      @apply absolute right-0 z-10;
      @apply size-6 rounded-full;
      @apply items-center justify-center;
      @apply bg-surface-800 text-primary transition-all;

      top: 6rem;
      transform: translateX(50%);
    }

    &.expanded {
      .btn-expand {
        transform: translateX(50%) rotate(180deg);
      }
    }
  }

  .scrim {
    @apply absolute top-0 left-0 right-0 bottom-0;
    @apply bg-surface-900 opacity-75;
    z-index: 400;
  }

  @screen xl {
    .header {
      top: -100%;
    }

    .nav-controller {
      width: 300px;
      @apply relative;
      @apply flex-grow-0 flex-shrink-0;
      @apply transform-none !important;

      &:not(.expanded) {
        width: 80px;
      }

      .btn-expand {
        @apply flex !important;
      }
    }

    .scrim {
      display: none;
    }

    .main-content {
      padding-top: 0 !important;
    }
  }
}
</style>
