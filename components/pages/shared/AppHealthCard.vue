<template>
  <app-card
    class="app-health"
    :class="{
      healthy: isHealth,
      unhealthy: !isHealth,
    }"
    container-class="size-full col center !gap-2"
  >
    <template v-if="isHealth">
      <span class="state text-7xl font-black">Health</span>

      <div class="text-lg font-medium">
        <span v-if="crashes.count == 0">No any crashes in the last week</span>

        <p v-else>
          <span>Only </span>

          <value-quantity
            class="inline text-pink-300"
            :value="crashes.count"
            :quantity="crashes.quantity"
            quantity-class="opacity-70"
          />

          <span> crashes in the last week</span>
        </p>
      </div>
    </template>

    <template v-else>
      <span class="text-4xl font-black text-red-100">Crash alert</span>

      <p>
        <value-quantity
          class="text-7xl font-black"
          :value="crashes.count"
          :quantity="crashes.quantity"
          quantity-class="text-red-400"
        />

        <span class="ms-2 quantity text-4xl font-bold text-red-400"
          >crashes</span
        >
      </p>
    </template>
  </app-card>
</template>

<script setup lang="ts">
const state = ref({
  crashes: 500,
});

const isHealth = computed(() => state.value.crashes < 1000);

const crashes = computed(() => {
  if (state.value.crashes > 1000) {
    return {
      count: state.value.crashes / 1000,
      quantity: "K",
    };
  }

  return {
    count: state.value.crashes,
    quantity: null,
  };
});
</script>

<style scoped lang="scss">
.app-health {
  &.healthy {
    @apply justify-center !important;
    background: linear-gradient(
      170deg,
      var(--p-sky-800) 0%,
      var(--p-rose-800) 150%
    );

    .content {
      @apply items-center;
    }

    .state {
      @apply text-sky-500;
    }
  }

  &.unhealthy {
    background: linear-gradient(
      135deg,
      var(--p-rose-800) 0%,
      var(--p-rose-950) 120%
    );
  }
}
</style>
