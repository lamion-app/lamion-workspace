<template>
  <div
    class="flex items-center gap-1"
    :class="{
      'text-primary': value > 0 && indicate,
      'text-red-500': value < 0 && indicate,
      'text-secondary': !indicate,
    }"
  >
    <m-icon
      class="size-6 rounded border-[1px] col center text-sm"
      :class="{
        'border-primary': value > 0 && indicate,
        'border-red-500': value < 0 && indicate,
        'border-surface-600': !indicate,
      }"
      :value="icon"
    />

    <span class="font-bold">{{ `${value}${quantity}` }}</span>

    <span class="text-secondary">
      <slot name="label">
        <span v-if="!!label" class="line-clamp-1" :title="label">{{
          label
        }}</span>
      </slot>
    </span>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    value: number;
    quantity: string;
    label?: string;
    indicate?: boolean;
  }>(),
  {
    label: undefined,
    indicate: true,
  },
);
</script>
