<script setup lang="ts">
definePageMeta({
  title: "dashboard.title",
  layout: "main",
  key: "static",
  auth: true,
});

const { useProjectLoadAlias } = useProjects();

const { isLoading, data } = useProjectLoadAlias((id: Id) =>
  useApiCall<DashboardFull>(`/project/${id}/dashboard/full`),
);

const calendarItems = computed(() => mapCalendarItems(data.value?.calendar));

const userActivityItems = computed(() =>
  mapTimeChartDto(data.value?.user_activity_time),
);
</script>

<template>
  <app-layout :is-loading="isLoading">
    <dashboard-layout v-if="!!data">
      <scaling-card
        class="col-span-full 2xl:col-span-9"
        :title="data.title"
        :data="data.scaling"
      />

      <app-health-card
        class="col-span-full 2xl:col-span-3 cursor-pointer"
        :crashes="data.scaling.total_crashes.actual"
        @click="createProjectLink('crashes')"
      />

      <features-card
        class="!h-[600px] lg:!h-full col-span-full lg:col-span-8 2xl:col-span-8"
      />

      <in-app-activity-card
        class="col-span-full lg:col-span-4 2xl:col-span-4"
        :items="data.top_features"
      />

      <activity-report-card
        :items="calendarItems"
        class="col-span-full lg:col-span-5 2xl:col-span-5"
      />

      <app-card
        class="col-span-full lg:col-span-7 2xl:col-span-7 !overflow-x-auto"
        :title="$locale('userActivityTime.title')"
        title-class="text-xl font-bold"
      >
        <user-activity-time class="-mx-3 -mb-3" :items="userActivityItems" />
      </app-card>
    </dashboard-layout>
  </app-layout>
</template>
