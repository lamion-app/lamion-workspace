<template>
  <div class="app-card" :class="variant">
    <div v-if="!!title || !!subtitle" class="flex flex-col gap-2">
      <span
        v-if="!!title"
        :class="!!titleClass ? titleClass : 'text-2xl font-black'"
        v-text="title"
      />
      <span v-if="!!subtitle" class="text-sm" v-text="subtitle" />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
type CardType = "filled" | "outlined";

withDefaults(
  defineProps<{
    title?: string | null;
    subtitle?: string | null;
    titleClass?: string | null;
    variant?: CardType;
  }>(),
  {
    title: null,
    subtitle: null,
    titleClass: null,
    variant: "filled",
  },
);
</script>

<style scoped lang="scss">
.app-card {
  @apply flex flex-col gap-6 justify-between;
  @apply p-5 rounded-xl overflow-hidden;

  &.filled {
    @apply bg-surface-900;
  }

  &.outlined {
    @apply border-[1px] border-surface-700;
  }
}
</style>
