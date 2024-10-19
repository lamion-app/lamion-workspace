<template>
  <div
    class="flex items-center gap-1"
    :class="{
      'text-primary': value > 0,
      'text-red-500': value <= 0,
    }"
  >
    <m-icon
      class="size-6 rounded border-[1px] col center text-sm"
      :class="{
        'border-primary': value > 0,
        'border-red-500': value <= 0,
      }"
      :value="icon"
    />

    <span class="font-bold">{{ value }}{{ quantity }}</span>

    <span class="text-surface-200">
      <slot name="label">
        <p v-if="!!label">{{ label }}</p>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  value: number;
  quantity: string;
  label?: string;
}>();
</script>
