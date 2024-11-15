<script lang="ts" setup>
defineProps<{
  actual: number;
  past: number;
}>();

function round(n: number) {
  return Math.round(n * 10) / 10;
}
</script>

<template>
  <app-card :title="$locale('users.growthRate')" no-gap>
    <div class="h-full col justify-end gap-6">
      <value-quantity
        class="text-8xl font-medium"
        :class="{
          'text-red-500': actual < 0,
        }"
        :value="Math.abs(round(actual))"
        quantity="%"
        quantity-class="text-7xl"
      />

      <text-up-down-indicator
        :indicate="actual > 0"
        icon="&#xf22b;"
        :value="round(actual - past)"
        quantity="%"
        :label="$locale('common.phrases.fromLastMonth')"
      />
    </div>
  </app-card>
</template>
