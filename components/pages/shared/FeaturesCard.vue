<template>
  <app-card class="functions">
    <div class="-mx-5 px-5 overflow-x-auto no-scrollbar flex gap-2">
      <Chip
        v-for="period in datePeriods"
        :key="period.value"
        class="font-bold cursor-pointer transition-all"
        :class="{
          '!bg-primary-500': period.value === tab,
        }"
        @click="tab = period.value"
      >
        <span class="w-max">{{ period.name }}</span>
      </Chip>
    </div>

    <div class="h-full flex flex-col lg:flex-row gap-2 max-lg:gap-4">
      <div
        class="info flex flex-wrap gap-4 lg:h-full lg:flex-col lg:justify-end"
      >
        <div class="col">
          <span class="text-xl text-secondary">{{
            $locale("dashboard.featuresRating.byAllTime")
          }}</span>

          <value-quantity
            class="text-4xl"
            value="5.67"
            quantity-class="text-3xl text-secondary"
          />
        </div>

        <div class="col">
          <span class="text-xl text-secondary">{{
            $locale("dashboard.featuresRating.bySelectedPeriod")
          }}</span>
          <value-quantity
            class="text-4xl"
            value="300"
            quantity-class="text-3xl text-secondary"
          />
        </div>
      </div>

      <bar-chart
        class="chart h-full flex-1 max-lg:-mx-3 rounded bg-transparent"
        color="sky"
        :name="$locale('dashboard.featuresRating.chartName')"
        :data="array"
      >
        <template #tooltip="{ index }">
          <div class="w-20 bg-surface-800 rounded-xl p-5">
            <span>{{ array[index].name }}</span>
            <hr />
            <span>{{ array[index].number }}</span>
          </div>
        </template>
      </bar-chart>
    </div>
  </app-card>
</template>

<script setup lang="ts">
const { t } = useI18n();

const tab = ref(DatePeriod.DAY);

const datePeriodNames = new Map<DatePeriod, string>([
  [DatePeriod.DAY, t("datetime.periods.daily")],
  [DatePeriod.WEEK, t("datetime.periods.weekly")],
  [DatePeriod.MONTH, t("datetime.periods.monthly")],
  [DatePeriod.YEAR, t("datetime.periods.yearly")],
  [DatePeriod.ALL_TIME, t("datetime.periods.all_time")],
]);
const datePeriods = DatePeriodEntries.map((d) => ({
  value: d,
  name: datePeriodNames.get(d),
}));

const array = [
  {
    name: "AAA",
    number: 1200,
  },
  {
    name: "BBB",
    number: 754,
  },
  {
    name: "CCC",
    number: 1232,
  },
  {
    name: "FFF",
    number: 2000,
  },
  {
    name: "DDD",
    number: 457,
  },
  {
    name: "!@#",
    number: 765,
  },
  {
    name: "EEE",
    number: 257,
  },
  {
    name: "123",
    number: 831,
  },
  {
    name: "7452",
    number: 1034,
  },
];
</script>

<style scoped lang="scss">
.functions {
  .page-content,
  .data {
    @apply gap-8;
  }
}
</style>
