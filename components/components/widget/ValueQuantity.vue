<template>
  <span>
    <span :class="valueClass">{{ value }}</span>
    <span v-if="quantity != null" :class="quantityClass">{{ quantity }}</span>
  </span>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    value: number | string;
    quantity?: string | null;
    valueClass?: string;
    quantityClass?: string;
  }>(),
  {
    quantity: null,
    valueClass: "",
    quantityClass: "",
  },
);
</script>
