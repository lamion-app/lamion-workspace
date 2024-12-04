<script setup lang="ts">
const route = useRoute();

const isNavigationDisplaying = ref(false);

const { data: navigation } = await useAsyncData("navigation", () =>
  fetchContentNavigation(queryContent("docs"))
);

const navigationItems = computed(() => {
  if (!navigation.value) return [];

  const docsLinks = navigation.value[0].children ?? [];

  return docsLinks
    .sort((a, b) => a.order - b.order)
    .map((x) => {
      return {
        ...x,
        children: x.children?.sort((a, b) => a.order - b.order),
      };
    });
});
</script>

<template>
  <div class="docs">
    <Button class="mt-8 xl:!hidden" @click="isNavigationDisplaying = true">
      Show navigation
    </Button>

    <nav
      v-show="isNavigationDisplaying || $viewport.isGreaterOrEquals('xl')"
      class="navigation col gap-3"
    >
      <Button
        class="xl:!hidden mb-8 w-[200px]"
        @click="isNavigationDisplaying = false"
      >
        <m-icon value="close" />
        <span>Close</span>
      </Button>

      <template v-for="link in navigationItems" :key="link._path">
        <span class="docs-link">{{ link.title }}</span>

        <div
          v-if="link.children"
          class="col ms-2 border-primary border-l-2 border-opacity-30"
        >
          <nuxt-link
            v-for="childLink in link.children"
            :key="childLink._path"
            :to="childLink._path"
            class="ps-4 -ml-0.5 docs-link text-secondary"
            :class="{
              active: route.path == childLink._path,
            }"
            @click="isNavigationDisplaying = false"
            >{{ childLink.title }}</nuxt-link
          >
        </div>
      </template>
    </nav>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
$navigation-width: 260px;

.docs {
  @screen xl {
    @apply grid;
    grid-template-columns: $navigation-width 1fr;
  }

  .navigation {
    @apply fixed top-0 left-0;
    @apply w-full;
    @apply py-4;
    @apply overflow-x-hidden overflow-y-auto;

    @apply max-xl:h-screen;
    @apply max-xl:px-8;
    @apply max-xl:bg-gray-800;

    @screen xl {
      @apply sticky;
      max-height: calc(100vh - var(--header-height));
    }
  }

  .content {
    @apply size-full;
    @apply xl:px-4 py-4;
  }

  .docs-link {
    @apply flex items-center;
    @apply h-[28px];

    @apply text-base font-medium;
    @apply border-l-2 border-transparent;

    &.active {
      @apply text-primary;
      @apply border-primary;
    }
  }
}
</style>
