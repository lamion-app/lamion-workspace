<template>
  <div class="mt-1 flex gap-1.5 items-center text-sm font-bold">
    <div
      class="flex center size-5 rounded-full"
      :class="{
        'bg-primary-500': isUp,
        'bg-red-500': !isUp,
      }"
    >
      <span
        class="material-symbols-outlined text-surface-200 dark:text-surface-800 text-center"
        :class="{
          'rotate-180': value <= 0,
        }"
        >&#xe316;</span
      >
    </div>

    <span
      :class="{
        'text-primary-500': isUp,
        'text-red-500': !isUp,
      }"
      >{{ `${Math.abs(value)}${quantity}` }}</span
    >
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number;
    quantity: string;
    revert?: boolean;
  }>(),
  {
    revert: false,
  },
);

const isUp = computed(() => {
  return props.value > 0 ? !props.revert : props.revert;
});
</script>

<style scoped></style>
