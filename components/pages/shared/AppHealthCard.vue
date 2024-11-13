<template>
  <app-card
    as="router-link"
    :to="createProjectLink('features-crashes')"
    class="app-health"
    :class="{
      healthy: isHealth,
      unhealthy: !isHealth,
    }"
    container-class="size-full col center !gap-2"
  >
    <template v-if="isHealth">
      <span class="state text-7xl font-black">{{
        $locale("health.title")
      }}</span>

      <div class="text-lg font-medium">
        <span v-if="crashes == 0">{{ $locale("health.noCrashes") }}</span>

        <p v-else class="text-center">
          <span>{{ $locale("common.simple.only") }} </span>

          <value-quantity
            class="mx-1 text-pink-500 dark:text-pink-300"
            :value="crashes"
            quantity="k"
            quantity-class="opacity-70"
          />

          <span> {{ $locale("health.crashes") }}</span>
        </p>
      </div>
    </template>

    <template v-else>
      <span class="text-4xl font-black text-red-700 dark:text-red-100">{{
        $locale("health.crashAlert")
      }}</span>

      <p>
        <value-quantity
          class="text-7xl font-black"
          :value="crashes"
          quantity="k"
          quantity-class="text-red-700 dark:text-red-400"
        />

        <span
          class="ms-2 quantity text-4xl font-bold text-red-700 dark:text-red-400"
          >{{ $locale("health.crashesCount") }}</span
        >
      </p>
    </template>
  </app-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  crashes: number;
}>();

const isHealth = computed(() => props.crashes < 1000);

// const crashes = computed(() => {
//   if (state.value.crashes > 1000) {
//     return {
//       count: state.value.crashes / 1000,
//       quantity: "K",
//     };
//   }
//
//   return {
//     count: state.value.crashes,
//     quantity: null,
//   };
// });
</script>

<style scoped lang="scss">
.app-health {
  &.healthy {
    @apply justify-center !important;

    background: linear-gradient(
      170deg,
      var(--p-sky-200) 0%,
      var(--p-rose-200) 150%
    );

    @media (prefers-color-scheme: dark) {
      background: linear-gradient(
        170deg,
        var(--p-sky-800) 0%,
        var(--p-rose-800) 150%
      );
    }

    .page-content {
      @apply items-center;
    }

    .state {
      @apply text-sky-500;
    }
  }

  &.unhealthy {
    background: linear-gradient(
      135deg,
      var(--p-rose-400) 0%,
      var(--p-rose-300) 120%
    );

    @media (prefers-color-scheme: dark) {
      background: linear-gradient(
        135deg,
        var(--p-rose-800) 0%,
        var(--p-rose-950) 120%
      );
    }
  }
}
</style>
