<template>
  <app-card
    title="Dashboard"
    subtitle="Today's summary"
    title-class="text-4xl font-black"
  >
    <div class="scaling-container">
      <app-card
        v-for="item in items"
        :key="item.name"
        class="flex-1 bg-window"
        :title="item.name"
        title-class="text-sm font-bold text-surface-300"
      >
        <div class="flex gap-4 items-center overflow-hidden">
          <value-quantity
            class="text-6xl"
            :value="item.value"
            :quantity="item.quantity"
            quantity-class="text-surface-400"
          />

          <up-down-indicator
            :value="item.change.value"
            :quantity="item.change.quantity"
            :revert="item.change.revert"
          />
        </div>
      </app-card>
    </div>
  </app-card>
</template>

<script setup lang="ts">
const items = [
  {
    name: "Total users",
    value: 300,
    quantity: "K",
    change: {
      value: 10,
      quantity: "%",
    },
  },
  {
    name: "Active users",
    value: 2.2,
    quantity: "K",
    change: {
      value: 30,
      quantity: "%",
    },
  },
  {
    name: "Crashes",
    value: 12,
    quantity: "K",
    change: {
      value: -5,
      quantity: "%",
      revert: true,
    },
  },
  {
    name: "Triggered events",
    value: 616,
    quantity: "B",
    change: {
      value: -5,
      quantity: "%",
    },
  },
];
</script>

<style scoped lang="scss">
.scaling-container {
  @apply h-full gap-4;
  @apply grid sm:grid-cols-2;

  @media (min-width: 1580px) {
    @apply grid-cols-4;
  }
}
</style>
