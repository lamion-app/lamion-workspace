<template>
  <div class="py-6 px-6 xl:py-10 xl:px-12 bg-window">
    <div v-if="isProjectSelected" class="main">
      <div v-show="isAppLoaded" class="main-content">
        <div class="contents">
          <slot />
        </div>
      </div>

      <ProgressSpinner v-show="!isAppLoaded" />
    </div>

    <projects-view
      v-else
      class="w-full min-h-screen"
      :projects="projects"
      @select-project="selectedProject = $event"
    />
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

.main {
  @apply w-full min-h-full;
  @apply lg:rounded-tl-3xl lg:rounded-bl-3xl;
  @apply flex justify-center;

  .main-content {
    @apply size-full max-w-screen-2xl;
  }
}
</style>
