<template>
  <div class="flex flex-col gap-12">
    <h3 class="text-5xl font-black">Your projects</h3>

    <div class="project-list pt-4">
      <app-card
        hover-color="primary-800"
        active-color="primary-700"
        class="project-item item-primary"
        @click="$emit('addProject')"
      >
        <span class="material-icons text-5xl">add</span>

        <span class="text-2xl font-black pt-2">Add project</span>
      </app-card>

      <app-card
        v-for="project in projects"
        :key="project.id"
        class="project-item"
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
          @click="$emit('openTemplates')"
        >
          <span class="material-symbols-outlined text-4xl">explore</span>

          <h5 class="project-title pt-3">See templates</h5>

          <span class="project-description !text-sm"
            >Browse 30+ templates from Lamion <br >
            team and community!</span
          >
        </app-card>

        <app-card
          v-if="showDocs"
          class="project-item item-secondary"
          @click="$emit('openDocs')"
        >
          <span class="material-symbols-outlined text-4xl">library_books</span>

          <h5 class="project-title pt-3">See docs 😊👍</h5>
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

    @apply justify-center items-center;
    @apply text-center;

    &.item-primary {
      @apply hover:bg-primary-800 active:bg-primary-700;
    }

    &.item-secondary {
      @apply hover:bg-sky-900 active:bg-sky-700;
    }

    &:not(.item-primary, .item-secondary) {
      @apply hover:bg-surface-800 active:bg-surface-700;
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
