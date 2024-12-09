<script setup lang="ts">
import { datePeriodNames } from "~/types/DatePeriod";

definePageMeta({
  title: "users.title",
  layout: "main",
  auth: true,
});

const { t } = useI18n();

const { useProjectLoad } = useProjects();

const deviceTable = reactive({
  selectedDatePeriod: ref(DatePeriod.DAY),
  datePeriods: computed(() =>
    [DatePeriod.DAY, DatePeriod.MONTH, DatePeriod.YEAR].map((d) => ({
      value: d,
      name: t(datePeriodNames.get(d)!),
    }))
  ),
});

const { isLoading, data } = useProjectLoad({
  load: (id) => useApiCall<UsersFull>(`/project/${id}/users/full`),
});

const userActivityItems = computed(() =>
  mapTimeChartDto(data.value?.user_activity_time)
);

const platforms = computed(() => mapChartDto(data.value?.platforms));

const totalUsersCard = computed(() => {
  const info = data.value!.total_users;

  return {
    title: t("users.totalUsers"),
    overall: info.comparison,
    data: {
      start: parseISODateString(info.from),
      end: parseISODateString(info.to),
      items: mapDateChartDto(info.chart),
    },
    comparison: {
      icon: "person",
      text: t("common.phrases.fromLastMonth"),
    },
  };
});

const activeUsersCard = computed(() => {
  const info = data.value!.active_users;

  return {
    title: t("users.activeUsers"),
    overall: info.comparison,
    data: {
      start: parseISODateString(info.from),
      end: parseISODateString(info.to),
      items: mapDateChartDto(info.chart),
    },
    comparison: {
      icon: "person",
      text: t("common.phrases.fromLastMonth"),
    },
  };
});
</script>

<template>
  <app-layout :is-loading="isLoading">
    <dashboard-layout v-if="!!data" class="dashboard">
      <progress-card
        :class="data.growth_rate ? ['col-span-4 2xl:col-span-3'] : ['col-span-5 2xl:col-span-4']"
        :title="totalUsersCard.title"
        :overall="totalUsersCard.overall"
        :data="totalUsersCard.data"
        :comparison="totalUsersCard.comparison"
      />

      <progress-card
        :class="data.growth_rate ? ['col-span-4'] : ['col-span-5']"
        :title="activeUsersCard.title"
        :overall="activeUsersCard.overall"
        :data="activeUsersCard.data"
        :comparison="activeUsersCard.comparison"
      />

      <growth-rate-card
        v-if="data.growth_rate"
        class="max-2xl:!hidden col-span-2"
        :actual="data.growth_rate.actual"
        :past="data.growth_rate.past"
      />

      <platform-collation-card
        class="col-span-4 2xl:col-span-3 row-span-2"
        :platforms="platforms"
        :top-devices="data.top_devices"
      />

      <app-card
        :title="$locale('userActivityTime.title')"
        class="max-md:h-[400px] col-span-8 2xl:col-span-9 row-span-1 !overflow-x-auto no-scrollbar"
      >
        <user-activity-time class="-mx-5" :items="userActivityItems" />
      </app-card>

      <app-card
        class="col-span-full"
        :title="$locale('users.devicesInfo')"
        title-class="text-2xl font-bold"
      >
        <template #action>
          <SelectButton
            v-model="deviceTable.selectedDatePeriod"
            :options="deviceTable.datePeriods"
            option-label="name"
            option-value="value"
            aria-labelledby="basic"
          />
        </template>

        <template #default>
          <devices-table :date-period="deviceTable.selectedDatePeriod" />
        </template>
      </app-card>
    </dashboard-layout>
  </app-layout>
</template>

<style scoped lang="scss">
.dashboard {
  grid-template-rows: 280px 400px;

  @screen 2xl {
    grid-template-rows: 330px 450px;
  }
}
</style>
