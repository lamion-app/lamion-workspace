<template>
  <main class="w-full min-h-screen py-6 px-6 xl:py-10 xl:px-12">
    <div v-if="isProjectsLoading" class="size-full flex center">
      <progress-spinner class="!mx-auto" />
    </div>

    <projects-view
      v-else-if="projects != null"
      class="w-full min-h-screen"
      :projects="projects!"
      @select-project="openProject"
    />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  title: "projects.yourProjects",
  key: "static",
});

const { isProjectsLoading, projects, openProject } = useProjects();
</script>
