<template>
  <app-card class="functions">
    <div class="date-filter flex gap-2">
      <Chip
        v-for="period in datePeriods"
        :key="period.value"
        :label="period.name"
        class="font-bold cursor-pointer transition-all"
        :class="{
          '!bg-primary-500': period.value === tab,
        }"
        @click="tab = period.value"
      />
    </div>

    <div class="h-full data flex flex-col lg:flex-row">
      <div class="info flex flex-wrap gap-8 lg:h-full lg:flex-col lg:justify-end">
        <div class="info-section">
          <div class="label text-xl text-surface-400">Total requests</div>
          <div class="value text-4xl">
            <span class="state">5.67</span>
            <span class="unit text-3xl text-surface-400">M</span>
          </div>
        </div>

        <div class="info-section">
          <div class="label text-xl text-surface-400">New users</div>
          <div class="value text-4xl">
            <span class="state">200</span>
            <span class="unit text-3xl text-surface-400">K</span>
          </div>
        </div>
      </div>

      <bar-chart
        class="chart h-full flex-1 rounded bg-transparent"
        color="sky"
        name="Daily calls"
        :data="array"
      >
        <template #tooltip="{ item }">
          <div class="w-20 bg-surface-800 rounded-xl p-5">
            <span>{{ array[item].name }}</span>
            <hr >
            <span>{{ array[item].number }}</span>
          </div>
        </template>
      </bar-chart>
    </div>
  </app-card>
</template>

<script setup lang="ts">
const tab = ref(DatePeriod.DAY);

const datePeriodNames = new Map<DatePeriod, string>([
  [DatePeriod.DAY, "Daily"],
  [DatePeriod.WEEK, "Weekly"],
  [DatePeriod.MONTH, "Monthly"],
  [DatePeriod.YEAR, "Yearly"],
  [DatePeriod.ALL_TIME, "All time"],
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
  .content,
  .data {
    @apply gap-8;
  }

  .data {
    height: 100%;
  }
}
</style>
