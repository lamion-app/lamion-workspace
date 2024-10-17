<template>
  <div class="app-card" :class="variant">
    <div v-if="!!title || !!subtitle" class="flex">
      <div class="flex-1 flex flex-col gap-2">
        <span
          v-if="!!title"
          class="flex-1"
          :class="!!titleClass ? titleClass : 'text-2xl font-black'"
          v-text="title"
        />
        <span v-if="!!subtitle" class="text-sm" v-text="subtitle" />
      </div>

      <slot name="action">
        <icon-button
          v-if="action"
          :icon="action"
          @click="$emit('click:action')"
        />
      </slot>
    </div>

    <slot />

    <div v-if="loading" class="loader">
      <progress-spinner />
    </div>
  </div>
</template>

<script setup lang="ts">
type CardType = "filled" | "outlined";

withDefaults(
  defineProps<{
    title?: string | null;
    subtitle?: string | null;
    titleClass?: string | null;
    action?: string | null;
    variant?: CardType;
    loading?: boolean;
  }>(),
  {
    title: null,
    subtitle: null,
    titleClass: null,
    action: null,
    variant: "filled",
    loading: false,
  },
);

defineEmits<{
  "click:action": [];
}>();
</script>

<style scoped lang="scss">
.app-card {
  @apply relative;
  @apply flex flex-col gap-6 justify-between;
  @apply p-5 rounded-xl overflow-hidden;

  &.filled {
    @apply bg-surface-900;
  }

  &.outlined {
    @apply border-[1px] border-surface-700;
  }

  .loader {
    @apply flex items-center justify-center;
    @apply absolute top-0 left-0 size-full;
    @apply bg-surface-700 bg-opacity-40;
  }
}
</style>
