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
      class="h-full col-span-1 row-span-14"
    />

    <app-card
      class="h-full col-span-1 row-span-12"
      title="Scaling"
      subtitle="This month (August 2024)"
    >
      <div class="text-lg font-normal">
        <div class="flex gap-2">
          <span class="text-primary-500 font-bold">+25K</span>
          <span class="w-max">regular users</span>
        </div>

        <div class="flex gap-2">
          <span class="text-sky-500 font-bold">+25 min</span>
          <span class="w-max">in app time</span>
        </div>
      </div>

      <div class="-mx-3 -mb-3 rounded-lg bg-surface-800 px-4 py-2">
        <span class="text-sm font-bold text-surface-300">Total users</span>

        <div class="-mt-2 flex gap-4 items-center">
          <div class="text-8xl">
            <span>300</span>
            <span class="text-surface-400">K</span>
          </div>

          <div class="mt-1 flex gap-1.5 items-center text-sm font-bold">
            <div
              class="flex items-center justify-center size-5 bg-primary-500 rounded-full"
            >
              <span
                class="material-symbols-outlined text-surface-800 text-center"
                >&#xe316;</span
              >
            </div>

            <span class="text-primary-500">10%</span>
          </div>
        </div>
      </div>
    </app-card>

    <devices-card id="top-devices" class="col-span-1 row-span-22" />

    <app-card class="h-full col-span-1 row-span-15">
      top regions by users
    </app-card>

    <user-activity-time
      id="activity_time"
      class="h-full col-span-1 row-span-13"
    />
  </div>
</template>

<style scoped lang="scss">
.dashboard {
  @apply size-full;
  @apply grid gap-4 grid-flow-row items-start justify-start;

  grid-template-columns: 3fr 5fr 4fr;
  grid-auto-rows: 12px;

  & > * {
    max-height: 100%;
  }
}
</style>
<script setup lang="ts"></script>
