<template>
  <div class="root">
    <navigation
      v-if="isProjectSelected && isAppLoaded"
      class="navigation"
      :items="appNavigation.navigationItems"
    >
      <template #before-menu>
        <ProjectSelect v-model="selectedProject!" :projects="projects" />
      </template>

      <template v-if="!!account" #after-menu>
        <Profile :account="account" />
      </template>
    </navigation>

    <div class="main">
      <div class="main-container">
        <div v-show="isAppLoaded" class="main-content">
          <slot />
        </div>

        <ProgressSpinner v-show="!isAppLoaded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isAppLoaded } = storeToRefs(useAppStore());
const { account } = useAuthProviders();
const { projects, selectedProject, isProjectSelected } =
  storeToRefs(useProjectsStore());

const appNavigation = useNavigation();
</script>

<style scoped lang="scss">
.root {
  @apply flex;
  @apply bg-surface-950;

  .navigation {
    width: 360px;
    @apply max-h-screen overflow-x-hidden overflow-y-auto;
    @apply flex-grow-0 flex-shrink-0;
  }

  .main {
    @apply max-h-screen overflow-x-hidden overflow-y-auto;

    .main-container {
      @apply w-full h-max min-h-full;
      @apply py-20 px-20;
      @apply rounded-tl-3xl rounded-bl-3xl;

      @apply flex items-center justify-center;

      background-color: color-mix(
        in srgb,
        var(--p-surface-900) 40%,
        transparent
      );
    }

    .main-content {
      @apply w-full max-w-screen-xl;
    }
  }
}
</style>
