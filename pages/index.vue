<template>
  <div class="main py-20 px-12">
    <div class="w-full max-w-screen-xl flex flex-col gap-12">
      <h3 class="text-5xl font-black">Your projects</h3>

      <div class="project-list pt-4">
        <app-card
          hover-color="primary-800"
          active-color="primary-700"
          class="project-item item-primary"
        >
          <span class="material-icons text-5xl">add</span>

          <span class="text-2xl font-black pt-2">Add project</span>
        </app-card>

        <app-card
          v-for="(i, index) in Array(5)"
          :key="i"
          class="project-item"
          @click="showAlert"
        >
          <span class="project-title" v-text="`Project #${index + 1}`" />

          <span class="project-description">Project description</span>
        </app-card>
      </div>

      <divider />

      <div class="project-list">
        <app-card class="project-item item-secondary">
          <span class="material-symbols-outlined text-4xl">explore</span>

          <h5 class="project-title pt-3">See templates</h5>

          <span class="project-description !text-sm"
            >Browse 30+ templates from Lamion <br >
            team and community!</span
          >
        </app-card>

        <app-card class="project-item item-secondary">
          <span class="material-symbols-outlined text-4xl">library_books</span>

          <h5 class="project-title pt-3">See docs 😊👍</h5>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: true,
});

function showAlert() {
  console.log("AAA");
}
</script>

<style scoped lang="scss">
.project-list {
  @apply flex;
  @apply flex-col;
  @apply md:grid;
  @apply md:grid-cols-2;
  @apply lg:grid-cols-4;
  @apply gap-4;

  .project-item {
    min-height: 10rem;
    cursor: pointer;

    @apply text-center;

    &.item-primary {
      @apply hover:bg-primary-800;
      @apply active:bg-primary-700;
    }

    &.item-secondary {
      @apply hover:bg-sky-900;
      @apply active:bg-sky-700;
    }

    &:not(.item-primary, .item-secondary) {
      @apply hover:bg-surface-800;
      @apply active:bg-surface-700;
    }

    .project-title {
      @apply text-2xl;
      @apply font-bold;
    }

    .project-description {
      @apply text-base;
      @apply font-light;
      @apply pt-1;
    }
  }
}
</style>
