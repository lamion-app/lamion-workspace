<template>
  <div class="logo flex center">
    <component :is="link ? NuxtLink : 'span'" to="/">
      <span
        v-if="expanded"
        class="text-logo text-4xl font-black text-primary select-none"
        :class="{
          'cursor-pointer': link,
        }"
        >{{ $locale("app.title") }}</span
      >

      <img v-else src="/favicon.ico" class="size-full aspect-square" >
    </component>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

withDefaults(
  defineProps<{
    expanded?: boolean;
    link?: boolean;
  }>(),
  {
    expanded: true,
    link: true,
  }
);
</script>

<style lang="scss" scoped>
.logo {
  height: 60px;

  .text-logo {
    white-space: nowrap;
  }
}
</style>
