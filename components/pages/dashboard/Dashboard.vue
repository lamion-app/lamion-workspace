<template>
  <div class="dashboard">
    <in-app-activity-card id="app-activity" class="col-span-1 row-span-18" />

    <features-card id="features" class="h-full col-span-2 row-span-22" />

    <crash-statistics-card
      id="crash-free-users"
      class="h-full col-span-1 row-span-9"
    />

    <activity-report-card
      id="activity-report"
      class="h-full col-span-1 row-span-16"
    />

    <scaling-card class="h-full col-span-1 row-span-12" />

    <devices-card id="top-devices" class="col-span-1 row-span-16" />

    <app-card class="h-full col-span-1 row-span-17">
      top regions by users
    </app-card>

    <user-activity-time
      id="activity_time"
      class="h-full col-span-1 row-span-13"
    />

    <app-card class="h-full col-span-1 row-span-8">
      ...
    </app-card>
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  @apply size-full;
  @apply grid gap-4 grid-flow-row items-start justify-start;

  grid-template-columns: 3fr 7fr 3fr;
  grid-auto-rows: 12px;

  & > * {
    max-height: 100%;
  }
}
</style>
<script setup lang="ts">
</script>