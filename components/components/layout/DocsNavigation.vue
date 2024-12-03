<script setup lang="ts">
const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation(queryContent("docs"))
);

const navigationItems = computed(() => {
  if (!navigation.value) return [];

  return navigation.value[0].children;
});
</script>

<template>
  <div class="docs">
    <nav class="navigation col gap-4">
      <NuxtLink
        v-for="link in navigationItems"
        :key="link._path"
        :to="link._path"
      >
        {{ link.navTitle || link.title }}
      </NuxtLink>
    </nav>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
$navigation-width: 260px;

.docs {
  @apply grid;
  grid-template-columns: $navigation-width 1fr;

  .navigation {
    @apply sticky;
    @apply w-full;
    max-height: calc(100vh - var(--header-height));
    @apply py-4;
    @apply overflow-x-hidden overflow-y-auto;
  }

  .content {
    @apply size-full;
    @apply p-4;
  }
}
</style>
