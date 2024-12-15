<template>
  <div class="logo flex center">
    <component :is="link ? NuxtLinkLocale : 'span'" to="/">
      <span
        v-if="expanded"
        class="text-logo text-4xl font-black text-primary select-none"
        :class="{
          'cursor-pointer': link,
        }"
        >{{ $locale("app.title") }}</span
      >

      <nuxt-img
        v-else
        src="/img/app_icon.png"
        alt="APP LOGO"
        class="size-full aspect-square"
      />
    </component>
  </div>
</template>

<script setup lang="ts">
import { NuxtLinkLocale } from "#components";

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
