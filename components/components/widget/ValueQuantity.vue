<template>
  <span>
    <span v-if="!!prefix">{{ prefix }}</span>
    <span :class="valueClass">{{ formatted.value }}</span>
    <span
      v-if="!!formatted.quantity || !!customQuantity"
      :class="quantityClass"
      >{{ customQuantity ?? formatted.quantity }}</span
    >
  </span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: number | string;
    customQuantity?: string | null;
    valueClass?: string;
    quantityClass?: string;
    prefix?: string;
  }>(),
  {
    customQuantity: null,
    valueClass: "",
    quantityClass: "",
    prefix: undefined,
  },
);

const { t } = useI18n();

const quantityMap = [
  null,
  "common.quantity.short.thousand",
  "common.quantity.short.million",
  "common.quantity.short.billion",
  "common.quantity.short.trillion",
  "common.quantity.short.quadrillion",
];

const formatted = computed(() => {
  if (typeof props.value == "string") {
    return {
      value: props.value,
      quantity: null,
    };
  }

  const value = Number(props.value);

  for (let i = quantityMap.length - 1; i >= 0; i--) {
    const s = Math.pow(1000, i);

    if (value >= s) {
      const q = quantityMap[i];

      return {
        value: round(props.value / s),
        quantity: q ? t(q) : null,
      };
    }
  }

  return {
    value: props.value,
    quantity: null,
  };
});
</script>
