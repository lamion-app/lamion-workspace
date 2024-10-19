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
        <slot name="extras" />
      </div>

      <bar-chart
        class="chart h-full flex-1 max-lg:-mx-3 rounded bg-transparent"
        color="sky"
        name="Daily calls"
        :data="array"
      >
        <template #tooltip="{ index }">
          <div class="w-20 bg-surface-800 rounded-xl p-5">
            <span>{{ array[index].name }}</span>
            <hr >
            <span>{{ array[index].number }}</span>
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
}
</style>
