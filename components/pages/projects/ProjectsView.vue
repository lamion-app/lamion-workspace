<template>
  <div class="col gap-12">
    <h3 class="text-5xl font-black">{{ $locale("projects.yourProjects") }}</h3>

    <div class="project-list pt-4">
      <app-card
        class="project-item item-primary"
        container-class="col center"
        @click="$emit('addProject')"
      >
        <m-icon class="text-5xl" value="add" />

        <span class="text-2xl font-black pt-2">{{
          $locale("projects.addProject")
        }}</span>
      </app-card>

      <app-card
        v-for="project in projects"
        :key="project.id"
        class="project-item"
        container-class="col center"
        @click="$emit('selectProject', project)"
      >
        <span class="project-title" v-text="project.name" />

        <span class="project-description" v-text="project.description" />
      </app-card>
    </div>

    <template v-if="showTemplates || showDocs">
      <divider />

      <div class="project-list">
        <app-card
          v-if="showTemplates"
          class="project-item item-secondary"
          container-class="col center"
          @click="$emit('openTemplates')"
        >
          <m-icon value="explore" class="text-4xl" />

          <h5 class="project-title pt-3">{{ $locale("projects.aboutUs") }}</h5>
        </app-card>

        <app-card
          v-if="showDocs"
          class="project-item item-secondary"
          container-class="col center"
          @click="$emit('openDocs')"
        >
          <m-icon value="library_books" class="text-4xl" />

          <h5 class="project-title pt-3">{{ $locale("projects.seeDocs") }}</h5>
        </app-card>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    projects: Array<Project>;
    showTemplates?: boolean;
    showDocs?: boolean;
  }>(),
  {
    showTemplates: true,
    showDocs: true,
  },
);

defineEmits<{
  addProject: [];
  selectProject: [Project];
  openTemplates: [];
  openDocs: [];
}>();
</script>

<style scoped lang="scss">
.project-list {
  @apply flex flex-col gap-4;
  @apply lg:grid lg:grid-cols-2 xl:grid-cols-4;

  .project-item {
    min-height: 12rem;
    cursor: pointer;

    @apply gap-2 justify-center items-center;
    @apply text-center;

    &.item-primary {
      @apply hover:bg-primary-200 active:bg-primary-300;
      @apply dark:hover:bg-primary-800 dark:active:bg-primary-700;
    }

    &.item-secondary {
      @apply hover:bg-sky-200 active:bg-sky-300;
      @apply dark:hover:bg-sky-900 dark:active:bg-sky-700;
    }

    &:not(.item-primary, .item-secondary) {
      @apply hover:bg-surface-200 active:bg-surface-300;
      @apply dark:hover:bg-surface-800 dark:active:bg-surface-700;
    }

    .project-title {
      @apply text-2xl font-bold;
    }

    .project-description {
      @apply text-base font-light;
      @apply pt-1;
    }
  }
}
</style>
