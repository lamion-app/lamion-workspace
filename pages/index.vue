<template>
  <div>
    <dashboard v-if="isProjectSelected" />

    <projects-view
      v-else
      :projects="projects"
      @select-project="selectedProject = $event"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

const projectStore = useProjectsStore();

const { projects, isProjectSelected, selectedProject } =
  storeToRefs(projectStore);
</script>

<style scoped lang="scss"></style>
