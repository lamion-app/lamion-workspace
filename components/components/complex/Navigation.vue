<template>
  <div class="navigation">
    <app-logo class="logo" />

    <div v-if="!!$slots['before-menu']" class="navigation-extra extra-start">
      <slot name="before-menu" />
    </div>

    <div class="menu">
      <component
        :is="item.route == route.name ? 'div' : NuxtLink"
        v-for="item in items"
        :key="item.route"
        class="menu-item"
        :to="{
          name: item.route,
        }"
        :class="{
          active: item.route == route.name,
        }"
      >
        <span v-if="item.icon" class="material-symbols-outlined" v-text="item.icon" />
        <span v-text="item.name" />
      </component>
    </div>

    <div v-if="!!$slots['after-menu']" class="navigation-extra extra-end">
      <slot name="after-menu" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

defineProps<{
  items: Array<NavigationItem>;
}>();

const route = useRoute();
</script>

<style scoped lang="scss">
.navigation {
  @apply flex flex-col gap-6;
  @apply py-6;

  .logo,
  .menu,
  .navigation-extra {
    @apply mx-6;
  }

  .logo {
    @apply pt-4;
    @apply pb-4;
  }

  .menu {
    @apply flex flex-col gap-2;

    .menu-item {
      @apply w-full;
      @apply flex items-center gap-3;
      @apply py-4 px-4;

      @apply text-lg font-bold;

      @apply rounded-2xl;
      @apply hover:bg-surface-800 active:bg-surface-700;
      @apply transition-all;

      &.active {
        @apply bg-surface-800;
      }
    }
  }

  .navigation-extra {
    &.extra-end {
      @apply h-full;
      @apply flex items-end;
    }
  }
}
</style>
