<script setup lang="ts">
import type { TopFeaturesResponse } from "~/components-types/widget/FeatureCard";

const { t } = useI18n();
const { useProjectLoad } = useProjects();

const selectedPeriod = ref(DatePeriod.DAY);

const { data, isLoading } = useProjectLoad({
  load: (id, tab: DatePeriod) =>
    useApiCall<TopFeaturesResponse>(`/project/${id}/features/chart`, {
      query: {
        period: DatePeriod[tab],
      }
    }),
  customRefs: [selectedPeriod],
});

const datePeriods = computed(() =>
  DatePeriodEntries.map((d) => ({
    value: d,
    name: t(datePeriodNames.get(d)!),
  })),
);

const chartItems = computed(
  () =>
    data.value?.items?.map((x) => {
      const name = x.key.title;

      return {
        name: name.length > 5 ? name.substring(0, 5) : name,
        number: x.value,
      };
    }) ?? [],
);
</script>

<template>
  <app-card class="functions" :loading="isLoading">
    <div class="-mx-5 px-5 overflow-x-auto no-scrollbar flex gap-2">
      <Chip
        v-for="period in datePeriods"
        :key="period.value"
        class="font-bold cursor-pointer transition-all"
        :class="{
          '!bg-primary-500': period.value === selectedPeriod,
        }"
        @click="selectedPeriod = period.value"
      >
        <span class="w-max">{{ period.name }}</span>
      </Chip>
    </div>

    <div
      v-if="data"
      class="h-full flex flex-col lg:flex-row gap-2 max-lg:gap-4"
    >
      <div
        class="info flex flex-wrap gap-4 lg:h-full lg:flex-col lg:justify-end"
      >
        <div class="col">
          <span class="text-xl text-secondary">{{
            $locale("dashboard.featuresRating.byAllTime")
          }}</span>

          <value-quantity
            class="text-4xl"
            :value="data.total_events"
            quantity-class="text-3xl text-secondary"
          />
        </div>

        <div class="col">
          <span class="text-xl text-secondary">{{
            $locale("dashboard.featuresRating.bySelectedPeriod")
          }}</span>
          <value-quantity
            class="text-4xl"
            :value="data.avg_events_per_day"
            quantity-class="text-3xl text-secondary"
          />
        </div>
      </div>

      <bar-chart
        class="chart h-full flex-1 max-lg:-mx-3 rounded bg-transparent"
        color="sky"
        :name="$locale('dashboard.featuresRating.chartName')"
        :data="chartItems"
      >
        <template #tooltip="{ index }">
          <div class="w-[300px] bg-surface-800 rounded-xl p-5">
            <div class="flex gap-1 text-secondary">
              <span>Feature:</span
              ><span class="line-clamp-1">{{
                data.items[index].key.title
              }}</span>
            </div>

            <div class="flex gap-1">
              <span class="text-secondary">Events:</span>
              <span class="text-primary">{{ data.items[index].value }}</span>
            </div>
          </div>
        </template>
      </bar-chart>
    </div>
  </app-card>
</template>

<style scoped lang="scss">
.functions {
  .page-content,
  .data {
    @apply gap-8;
  }
}
</style>
