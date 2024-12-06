<template>
  <div class="logo flex center">
    <NuxtLink to="/">
      <span
        v-if="expanded"
        class="text-logo text-4xl font-black text-primary select-none cursor-pointer"
        >{{ $locale("app.title") }}</span
      >

      <img
        v-else
        :label="$locale('app.title').charAt(0)"
        src="/favicon.ico"
        class="max-w-12 aspect-square"
      >
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    expanded?: boolean;
  }>(),
  {
    expanded: true,
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
