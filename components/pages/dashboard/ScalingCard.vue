<template>
  <app-card
    :title="title"
    :subtitle="$locale('dashboard.todaySummary')"
    title-class="text-5xl font-black"
    title-tag="h1"
  >
    <div class="scaling-container">
      <app-card
        v-for="item in items"
        :key="item.name"
        class="flex-1 bg-window"
        :title="item.name"
        title-class="text-sm font-bold text-secondary"
      >
        <div class="flex gap-4 items-center overflow-hidden">
          <value-quantity
            class="text-6xl"
            :value="item.value"
            quantity-class="text-secondary"
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
import type { DashboardScaling } from "@/components-types/pages/Dashboard";

const { t } = useI18n();

const props = defineProps<{
  title: string;
  data: DashboardScaling;
}>();

const items = computed(() => [
  {
    name: t("dashboard.totalUsers"),
    value: props.data.total_users.actual,
    change: {
      value: 10,
      quantity: "%",
    },
  },
  {
    name: t("dashboard.activeUsers"),
    value: props.data.active_users.actual,
    change: {
      value: 30,
      quantity: "%",
    },
  },
  {
    name: t("dashboard.crashes"),
    value: props.data.total_crashes.actual,
    change: {
      value: -5,
      quantity: "%",
      revert: true,
    },
  },
  {
    name: t("dashboard.triggeredEvents"),
    value: props.data.triggered_events.actual,
    change: {
      value: -5,
      quantity: "%",
    },
  },
]);
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
