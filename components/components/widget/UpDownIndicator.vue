<template>
  <div class="mt-1 flex gap-1.5 items-center text-sm font-bold">
    <div
      class="flex items-center justify-center size-5 rounded-full"
      :class="{
        'bg-primary-500': value > 0,
        'bg-red-500': value <= 0,
      }"
    >
      <span
        class="material-symbols-outlined text-surface-800 text-center"
        :class="{
          'rotate-180': value <= 0,
        }"
        >&#xe316;</span
      >
    </div>

    <span
      :class="{
        'text-primary-500': value > 0,
        'text-red-500': value <= 0,
      }"
      >{{ Math.abs(value) }}{{ quantity }}</span
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: number;
  quantity: string;
}>();
</script>

<style scoped></style>
