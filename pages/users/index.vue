<template>
  <app-layout scrollable>
    <dashboard-layout>
      <total-users-card class="!h-[300px] col-span-4 2xl:col-span-3" />

      <active-users-card class="!h-[300px] col-span-4" />

      <growth-rate-card class="!hidden 2xl:!flex col-span-2" />

      <platform-collation-card class="col-span-4 2xl:col-span-3 row-span-2" />

      <app-card
        title="User activity time"
        class="col-span-8 2xl:col-span-9 row-span-1 !overflow-x-auto"
      >
        <user-activity-time class="-mx-5" />
      </app-card>

      <app-card class="col-span-full">
        <div class="flex flex-wrap items-center justify-between">
          <span class="text-2xl font-bold">Devices info</span>

          <SelectButton
            model-value="Today"
            :options="['Today', 'Month', 'Yearly']"
            aria-labelledby="basic"
          />
        </div>

        <devices-table />
      </app-card>
    </dashboard-layout>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>

<style scoped lang="scss">
.users-page {
  .data,
  .display {
    @apply flex-1;
  }
}
</style>
