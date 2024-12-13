<template>
  <div
    class="navigation"
    :class="{
      expanded: expanded,
    }"
  >
    <app-logo class="logo" :expanded="expanded" @click="$emit('hide')" />

    <div v-if="!!$slots['before-menu']" class="navigation-extra extra-start">
      <slot name="before-menu" />
    </div>

    <div class="menu">
      <component
        :is="item.route == route.name ? 'div' : NuxtLink"
        v-for="item in items"
        :key="item.route"
        class="menu-item"
        :to="createProjectLink(item.route)"
        :class="{
          active: route.name == `${item.route}___${locale}`,
        }"
        @click="$emit('hide')"
      >
        <m-icon v-if="item.icon" :value="item.icon" />

        <span class="item-text line-clamp-1" v-text="item.name" />
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
  expanded: boolean;
  items: Array<NavigationItem>;
}>();

defineEmits<{
  hide: [];
}>();

const route = useRoute();
const { locale } = useI18n();
</script>

<style scoped lang="scss">
.navigation {
  @apply relative size-full;
  @apply flex flex-col gap-6 items-center;
  @apply pt-12 pb-6 px-3;
  @apply overflow-x-hidden;

  &.expanded {
    @apply px-6;
    @apply overflow-y-auto;
  }

  &:not(.expanded) {
    .item-text {
      display: none;
    }
  }

  .logo,
  .menu,
  .navigation-extra {
    @apply w-full;
  }

  .logo {
    flex-shrink: 0;
    flex-grow: 0;
  }

  .menu {
    @apply flex flex-col gap-2;

    .menu-item {
      @apply w-full;
      @apply flex items-center gap-3;
      @apply py-4 px-4;
      @apply text-lg font-bold;
      @apply rounded-2xl;
      @apply hover:bg-surface-300 active:bg-surface-400;
      @apply dark:hover:bg-surface-800 dark:active:bg-surface-700;
      @apply transition-all;

      &.active {
        @apply cursor-default;
        @apply bg-surface-300 dark:bg-surface-800;
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
