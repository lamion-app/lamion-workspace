<template>
  <main class="main">
    <div v-if="isAppLoaded" class="main-content">
      <template v-if="isSelectedProjectLoading">
        <progress-spinner />
      </template>
      <template v-else-if="isSelectedProjectError">
        <slot name="error">
          <div class="col center gap-2">
            <h1 class="text-3xl font-black text-red-500">Loading error</h1>

            <span class="text-lg">Try again later or contact to support</span>

            <Button
              as="router-link"
              class="mt-4"
              to="/"
              text
              rounded
              severity="secondary"
              label="Go to dashboard"
            />
          </div>
        </slot>
      </template>
      <template v-else-if="selectedProject != null">
        <div class="w-full">
          <slot name="default" :project="selectedProject" />
        </div>
      </template>
    </div>

    <ProgressSpinner v-else />
  </main>
</template>

<script setup lang="ts">
const { isAppLoaded } = storeToRefs(useAppStore());

const { isSelectedProjectError, isSelectedProjectLoading, selectedProject } =
  useProjects();
</script>

<style scoped lang="scss">
@import url(@/assets/css/main.scss);

.main {
  @apply min-h-screen;
  @apply bg-window lg:rounded-tl-3xl lg:rounded-bl-3xl;
  @apply py-6 px-6 xl:py-10 xl:px-12;

  .main-content {
    @apply max-w-screen-2xl w-full min-h-full;
    @apply mx-auto;
    @apply flex justify-center;
  }
}
</style>
