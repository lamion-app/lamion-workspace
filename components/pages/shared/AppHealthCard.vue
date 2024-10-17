<template>
  <app-card
    class="app-health"
    :class="{
      healthy: isHealth,
      unhealthy: !isHealth,
    }"
    :title="isHealth ? null : 'Crash alert'"
    :title-class="isHealth ? 'text-xl font-bold' : 'text-4xl font-black'"
  >
    <div class="content w-full flex flex-col gap-2">
      <div class="data flex flex-wrap gap-2 items-end">
        <div class="state text-7xl font-black">
          <span v-if="isHealth">Health</span>

          <value-quantity
            v-else
            :value="crashes.count"
            :quantity="crashes.quantity"
            quantity-class="opacity-40"
          />
        </div>

        <span v-if="!isHealth" class="quantity text-4xl font-bold"
          >crashes</span
        >
      </div>

      <div v-if="isHealth" class="mt-2 text-lg font-medium">
        <span v-if="crashes.count == 0"> No any crashes in the last week </span>

        <div v-else>
          <span>Only </span>

          <value-quantity
            class="inline text-pink-300"
            :value="crashes.count"
            :quantity="crashes.quantity"
            quantity-class="opacity-70"
          />

          <span> crashes in the last week</span>
        </div>
      </div>
    </div>
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
    @apply justify-center !important;;
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
      var(--p-rose-900) 0%,
      var(--p-rose-950) 120%
    );

    .state {
      @apply text-red-500;
    }

    .quantity {
      @apply text-red-300;
    }
  }
}
</style>
