<template>
  <div class="main-container">
    <div class="main">
      <div v-show="isAppLoaded" class="main-content">
        <div v-if="isProjectSelected" class="contents">
          <slot />
        </div>

        <projects-view
          v-else
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

onMounted(() => {
  projectsStore.loadInitProject();
});
</script>

<style scoped lang="scss">
@import url(@/assets/css/main.scss);

.main-container {
  @apply w-full min-h-full max-h-screen;
  @apply overflow-x-hidden overflow-y-auto;

  .main {
    @apply w-full min-h-full;
    @apply py-6 px-6 xl:py-10 xl:px-12;
    @apply lg:rounded-tl-3xl lg:rounded-bl-3xl;
    @apply flex justify-center;

    @apply bg-window;

    .main-content {
      @apply size-full max-w-screen-2xl;
      padding-top: var(--header-height);
    }
  }

  @screen lg {
    .main-content {
      padding-top: 0 !important;
    }
  }
}
</style>
