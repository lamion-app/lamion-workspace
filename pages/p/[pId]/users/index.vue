<template>
  <app-layout>
    <dashboard-layout>
      <total-users-card class="!h-[300px] col-span-4 2xl:col-span-3" />

      <active-users-card class="!h-[300px] col-span-4" />

      <growth-rate-card class="!hidden 2xl:!flex col-span-2" />

      <platform-collation-card class="col-span-4 2xl:col-span-3 row-span-2" />

      <app-card
        :title="$locale('userActivityTime')"
        class="col-span-8 2xl:col-span-9 row-span-1 !overflow-x-auto"
      >
        <user-activity-time class="-mx-5" />
      </app-card>

      <app-card
        class="col-span-full"
        :title="$locale('devicesInfo')"
        title-class="text-2xl font-bold"
      >
        <template #action>
          <SelectButton
            :model-value="$locale('daily')"
            :options="[$locale('daily'), $locale('monthly'), $locale('yearly')]"
            aria-labelledby="basic"
          />
        </template>

        <template #default>
          <devices-table />
        </template>
      </app-card>
    </dashboard-layout>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});

useHead({
  title: "Users",
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
