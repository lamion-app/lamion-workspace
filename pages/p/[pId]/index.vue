<template>
  <app-layout>
    <progress-spinner v-if="isDataLoading || !data" />

    <dashboard-layout v-else>
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

<script setup lang="ts">
import type { DashboardFull } from "@/components-types/Dashboard";
import { parseISODateString, parseISOTimeString } from "@/utils/date";
import { CalendarActivityVariant } from "@/types/CalendarItem";

definePageMeta({
  title: "dashboard.title",
  layout: "main",
  key: "static",
});

const { selectedProjectId } = useProjects();

const isDataLoading = ref(false);
const data = ref<DashboardFull>();

const calendarItems = computed(() => {
  const items = data.value?.calendar;
  if (!items || items.length == 0) return [];

  return items.map((x) => ({
    date: parseISODateString(x.date),
    types: new Map(
      Object.keys(x.types).map((v) => [
        CalendarActivityVariant[v as keyof typeof CalendarActivityVariant],
        x.types[v],
      ]),
    ),
  }));
});

const userActivityItems = computed(() => {
  const items = data.value?.user_activity_time;
  if (!items || items.length == 0) return [];

  return items.map((x) => ({
    key: parseISOTimeString(x.key),
    value: x.value,
  }));
});

watch(selectedProjectId, async (projectId) => {
  if (!projectId) return;

  isDataLoading.value = true;

  data.value = await useApiCall<DashboardFull>(
    `/project/${projectId}/dashboard/full`,
  );

  isDataLoading.value = false;
});
</script>
