<template>
  <dashboard-layout>
    <scaling-card class="col-span-full 2xl:col-span-9" />

    <app-health-card class="col-span-full 2xl:col-span-3" />

    <features-card class="!h-[600px] lg:!h-full lg:col-span-8 2xl:col-span-8" />

    <in-app-activity-card class="lg:col-span-4 2xl:col-span-4" />

    <activity-report-card class="lg:col-span-5 2xl:col-span-5" />

    <user-activity-time class="lg:col-span-7 2xl:col-span-7" />
  </dashboard-layout>
</template>

<style scoped lang="scss"></style>
