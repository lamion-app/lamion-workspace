<template>
  <app-layout>
    <dashboard-layout>
      <scaling-card class="col-span-full 2xl:col-span-9" />

      <app-health-card class="col-span-full 2xl:col-span-3" />

      <features-card
        class="!h-[600px] lg:!h-full col-span-full lg:col-span-8 2xl:col-span-8"
      >
        <template #extras>
          <div class="info-section">
            <div class="label text-xl text-surface-400">Total events</div>
            <div class="value text-4xl">
              <span class="state">5.67</span>
              <span class="unit text-3xl text-surface-400">M</span>
            </div>
          </div>

          <div class="info-section">
            <div class="label text-xl text-surface-400">Events per day</div>
            <div class="value text-4xl">
              <span class="state">200</span>
              <span class="unit text-3xl text-surface-400">K</span>
            </div>
          </div>
        </template>
      </features-card>

      <in-app-activity-card
        class="col-span-full lg:col-span-4 2xl:col-span-4"
      />

      <activity-report-card
        class="col-span-full lg:col-span-5 2xl:col-span-5"
      />

      <app-card
        class="col-span-full lg:col-span-7 2xl:col-span-7 !overflow-x-auto"
        title="User activity time"
        title-class="text-xl font-bold"
      >
        <user-activity-time class="-mx-3 -mb-3" />
      </app-card>
    </dashboard-layout>
  </app-layout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "main",
});
</script>
