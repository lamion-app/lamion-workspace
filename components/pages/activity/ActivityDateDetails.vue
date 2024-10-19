<template>
  <div class="col gap-6">
    <h2 class="text-4xl font-bold">{{ 1 + item * 3 }} August</h2>

    <div class="flex flex-wrap gap-2">
      <app-card
        class="min-w-[200px] flex-1 bg-window"
        title="Active users"
        title-class="text-sm font-bold text-surface-300"
      >
        <value-quantity
          class="text-6xl"
          value="40"
          quantity="K"
          quantity-class="text-secondary"
        />
      </app-card>

      <app-card
        class="min-w-[250px] flex-1 bg-window"
        title="Triggered events"
        title-class="text-sm font-bold text-surface-300"
      >
        <value-quantity
          class="text-6xl"
          value="100"
          quantity="K"
          quantity-class="text-secondary"
        />
      </app-card>

      <app-card
        class="min-w-[100px] flex-1 bg-window"
        title="Crashes"
        title-class="text-sm font-bold text-surface-300"
      >
        <value-quantity
          class="text-6xl"
          value="30"
          quantity-class="text-secondary"
        />
      </app-card>
    </div>

    <app-card
      class="!bg-surface-800 !gap-2"
      title="Most used features"
      title-class="text-sm font-medium text-secondary"
    >
      <div class="items col gap-2">
        <div class="flex gap-2 justify-between items-center">
          <div>
            <span class="font-bold">Sign in</span>

            <div class="flex items-center gap-1 text-sm text-secondary">
              <span>Total events:</span>

              <value-quantity class="font-black" value="1" quantity="K" />
            </div>
          </div>

          <value-quantity class="text-xs font-black" value="30" quantity="%" />
        </div>

        <divider class="!my-0" />

        <div class="flex gap-2 justify-between items-center">
          <div>
            <span class="font-bold">Sign in</span>

            <div class="flex items-center gap-1 text-sm text-secondary">
              <span>Total events:</span>

              <value-quantity class="font-black" value="1" quantity="K" />
            </div>
          </div>

          <value-quantity class="text-xs font-black" value="30" quantity="%" />
        </div>
      </div>
    </app-card>

    <app-card class="!bg-surface-800" title="In-app activity">
      <user-activity-time class="!max-h-[400px] -mx-3" />
    </app-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: number;
}>();
</script>
