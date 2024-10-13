<template>
  <div class="main">
    <div
      class="main-container bg-window"
      :class="{
        scrollable: scrollable,
      }"
    >
      <div v-show="isAppLoaded" class="main-content">
        <!-- TODO need not to draw page when project is not selected -->
        <div v-show="isProjectSelected" class="contents">
          <slot />
        </div>

        <projects-view
          v-show="!isProjectSelected"
          :projects="projects"
          @select-project="selectedProject = $event"
        />
      </div>

      <ProgressSpinner v-show="!isAppLoaded" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { isAppLoaded } = storeToRefs(useAppStore());
const projectsStore = useProjectsStore();
const { projects, selectedProject, isProjectSelected } =
  storeToRefs(projectsStore);

withDefaults(
  defineProps<{
    scrollable?: boolean;
  }>(),
  {
    scrollable: false,
  },
);

onMounted(() => {
  projectsStore.loadInitProject();
});
</script>

<style scoped lang="scss">
.main {
  @apply max-h-screen overflow-x-hidden overflow-y-auto;

  .main-container {
    @apply w-full min-h-full;
    @apply py-6 px-6 xl:py-10 xl:px-12;
    @apply rounded-tl-3xl rounded-bl-3xl;
    @apply flex items-center justify-center;

    &.scrollable {
      @apply min-h-full;
    }

    &:not(.scrollable) {
      @apply h-full;
    }

    .main-content {
      @apply size-full max-w-screen-2xl;
      padding-top: var(--header-height);
    }
  }

  @screen xl {
    .main-content {
      padding-top: 0 !important;
    }
  }
}
</style>
