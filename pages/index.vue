<template>
  <app-layout scrollable>
    <dashboard-page />
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

// const projectStore = useProjectsStore();
//
// const { projects, isProjectSelected, selectedProject } =
//   storeToRefs(projectStore);
</script>

<style scoped lang="scss"></style>
