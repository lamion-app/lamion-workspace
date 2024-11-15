<script setup lang="ts">
withDefaults(
  defineProps<{
    isLoading?: boolean;
  }>(),
  {
    isLoading: false,
  },
);

const { isAppLoaded } = storeToRefs(useAppStore());

const { selectedProjectState, selectedProject } = useProjects();
</script>

<template>
  <main class="main">
    <div v-if="isAppLoaded" class="main-content">
      <template
        v-if="
          isLoading ||
          selectedProjectState == undefined ||
          selectedProjectState == SelectedProjectState.LOADING
        "
      >
        <progress-spinner />
      </template>

      <template v-else-if="selectedProjectState == SelectedProjectState.ERROR">
        <slot name="error">
          <div class="col center gap-2">
            <h1 class="text-3xl font-black text-red-500">
              {{ $locale("loadingError") }}
            </h1>

            <span class="text-lg">{{
              $locale("tryAgainLaterOrContactToSupport")
            }}</span>

            <Button
              as="router-link"
              class="mt-4"
              to="/"
              text
              rounded
              severity="secondary"
              :label="$locale('goToDashboard')"
            />
          </div>
        </slot>
      </template>

      <template
        v-else-if="
          selectedProjectState == SelectedProjectState.READY &&
          !!selectedProject
        "
      >
        <div class="w-full">
          <slot name="default" :project="selectedProject" />
        </div>
      </template>

      <div
        v-else-if="selectedProjectState == SelectedProjectState.NOT_FOUND"
        class="col center gap-4"
      >
        <h1 class="text-7xl text-center">
          {{ $locale("app.errors.projectNotFound.title") }}
        </h1>
        <span class="text-center whitespace-pre-line">{{
          $locale("app.errors.projectNotFound.subtitle")
        }}</span>
      </div>
    </div>
  </main>
</template>

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
