<template>
  <div
    class="app-card"
    :class="{
      filled: variant == 'filled',
      outlined: variant == 'outlined',
      'gap-0': noGap,
      'gap-2': !noGap,
    }"
  >
    <div v-if="!!title || !!subtitle" class="flex items-start">
      <div class="flex-1 col gap-2">
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

    <div v-if="!!$slots['default']" class="flex-1 flex gap-[inherit]" :class="containerClass">
      <slot />
    </div>

    <Loader v-if="loading" />
  </div>
</template>

<script setup lang="ts">
type CardType = "filled" | "outlined";

withDefaults(
  defineProps<{
    title?: string | null;
    subtitle?: string | null;
    titleClass?: string;
    action?: string;
    variant?: CardType;
    loading?: boolean;
    containerClass?: string;
    noGap?: boolean;
  }>(),
  {
    title: undefined,
    subtitle: undefined,
    titleClass: undefined,
    action: undefined,
    variant: "filled",
    loading: false,
    containerClass: "flex-col",
    noGap: false,
  },
);

defineEmits<{
  "click:action": [];
}>();
</script>

<style lang="scss">
.app-card {
  @apply relative;
  @apply flex flex-col justify-between;
  @apply p-5 rounded-xl overflow-hidden;

  &.filled {
    @apply bg-surface-900;

    & .app-card.filled {
      @apply bg-surface-800 bg-opacity-40;
      @apply px-3 py-2;
    }
  }

  &.outlined {
    @apply border-[1px] border-surface-700;
  }
}
</style>
