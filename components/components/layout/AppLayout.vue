<template>
  <div class="main bg-window">
    <template v-if="isAppLoaded">
      <div
        v-if="isProjectSelected"
        class="size-full max-w-screen-2xl lg:rounded-tl-3xl lg:rounded-bl-3xl"
      >
        <slot />
      </div>

      <projects-view
        v-else
        class="w-full min-h-screen"
        :projects="projects"
        @select-project="selectedProject = $event"
      />
    </template>

    <ProgressSpinner v-else />
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
  @apply w-full min-h-screen;
  @apply flex justify-center;
  @apply py-6 px-6 xl:py-10 xl:px-12;
}
</style>
