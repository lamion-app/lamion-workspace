<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: "large" | "normal";
  }>(),
  {
    size: "normal",
  }
);
</script>

<template>
  <section class="landing-section" :class="size">
    <slot />
  </section>
</template>

<style scoped lang="scss">
.landing-section {
  @apply w-full;
  min-height: 30vh;
  @apply flex flex-col justify-center gap-12;
  @apply py-20 lg:py-28;

  &.large {
    @apply min-h-[50vh] lg:min-h-[65vh];
    @apply py-28 lg:py-36 text-center;
  }
}
</style>
