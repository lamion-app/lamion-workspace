<script setup lang="ts">
import AddProjectDialog from "~/components/pages/projects/AddProjectDialog.vue";

definePageMeta({
  title: "projects.yourProjects",
  key: "static",
  auth: true,
});

const { isProjectsLoading, projects, openProject } = useProjects();

const isAddProjectDialogVisible = ref(false);
</script>

<template>
  <main class="w-full min-h-screen py-6 px-6 xl:py-10 xl:px-12 bg-window">
    <div v-if="isProjectsLoading" class="size-full flex center">
      <progress-spinner class="!mx-auto" />
    </div>

    <projects-view
      v-else-if="projects != null"
      class="w-full min-h-screen"
      :projects="projects!"
      @add-project="isAddProjectDialogVisible = true"
      @select-project="openProject($event.id)"
    />

    <add-project-dialog v-model:visible="isAddProjectDialogVisible" />
  </main>
</template>
