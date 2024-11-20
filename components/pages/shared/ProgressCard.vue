<script lang="ts" setup>
import { round } from "~/utils/math";

const { d } = useI18n();

const props = defineProps<{
  title: string;
  overall: Comparison;
  data: {
    start: Date;
    end: Date;
    items: Array<DateChartItem>;
  };
  comparison: {
    icon: string;
    text: string;
  };
}>();

const chartItems = computed(() => {
  const startDate = props.data.start;
  startDate.setHours(0);
  startDate.setMinutes(0);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);

  const totalDays = dateDiffDays(startDate, props.data.end);

  return [...Array(totalDays).keys()].map((_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const dateInfo = props.data.items.find((x) => isSameDate(x.key, date));

    return {
      name: d(date),
      number: dateInfo?.value ?? 0,
    };
  });
});
</script>

<template>
  <app-card
    class="!overflow-visible"
    :title="title"
    title-class="text-lg text-secondary"
    no-gap
    container-class="col -mx-5 overflow-hidden"
  >
    <value-quantity
      class="mx-5 text-4xl font-medium"
      :value="overall.actual"
      quantity-class="text-3xl text-secondary"
    />

    <line-chart
      class="mt-2 flex-1"
      color="primary"
      brightness="500"
      stroke-opacity="ff"
      hide-labels
      :stroke-width="3"
      :point-radius="0"
      :prev-value="chartItems[0].number"
      :next-value="chartItems[chartItems.length - 1].number"
      :items="chartItems"
    >
      <template #tooltip="{ index }">
        <div
          class="px-2 py-1 rounded-lg bg-surface-400 dark:bg-surface-600 !bg-opacity-40"
        >
          <span>{{ chartItems[index].name }}:</span>
          <span class="ms-1 font-black">{{ chartItems[index].number }}</span>
        </div>
      </template>

      <template #label="{ item }">
        <div class="py-2">
          <span>{{ item.name }}</span>
        </div>
      </template>
    </line-chart>

    <text-up-down-indicator
      class="mx-5 mt-4"
      :icon="comparison.icon"
      :value="round((overall.actual / overall.past) * 100 - 100)"
      quantity="%"
      :label="comparison.text"
    />
  </app-card>
</template>
