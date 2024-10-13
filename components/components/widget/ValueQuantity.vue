<template>
  <div>
    <span :class="valueClass">{{ value }}</span>
    <span v-if="quantity != null" :class="quantityClass">{{ quantity }}</span>
  </div>
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

<style scoped></style>
