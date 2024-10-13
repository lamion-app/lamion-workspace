<template>
  <dashboard-layout>
    <scaling-card class="col-span-full 2xl:col-span-9" />

    <app-health-card class="col-span-full 2xl:col-span-3" />

    <features-card
      class="!h-[600px] lg:!h-full col-span-full lg:col-span-8 2xl:col-span-8"
    />

    <in-app-activity-card class="col-span-full lg:col-span-4 2xl:col-span-4" />

    <activity-report-card class="col-span-full lg:col-span-5 2xl:col-span-5" />

    <app-card
      class="col-span-full lg:col-span-7 2xl:col-span-7"
      title="User activity time"
      title-class="text-xl font-bold"
    >
      <user-activity-time class="-mx-3 -mb-3" />
    </app-card>
  </dashboard-layout>
</template>
