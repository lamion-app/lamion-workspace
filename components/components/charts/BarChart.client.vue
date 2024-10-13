<template>
  <div class="relative overflow-hidden text-surface-500">
    <div
      ref="tooltipHost"
      class="tooltip-host"
      :class="{
        visible: tooltipData.visible,
      }"
      :style="{
        top: tooltipData.y + 'px',
        left: tooltipData.x + 'px',
      }"
    >
      <slot
        v-if="tooltipData.item != null"
        name="tooltip"
        :index="tooltipData.item"
      />
    </div>

    <Chart
      class="w-full !absolute top-0"
      :style="{
        bottom: `${-axisPadding}px`,
      }"
      type="bar"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>

<script setup lang="ts">
import type { Chart, ChartOptions, TooltipModel } from "chart.js";
import type { ContextProxy } from "chart.js/helpers";

const slots = useSlots();

const props = withDefaults(
  defineProps<{
    name: string;
    data: ChartItem[];
    averageThresholdPercent?: number;
    theme?: BarChartTheme;
    color?: string;
    borderRadius?: number;
    showYAxisLabels?: boolean;
    yAxisLabelsCount?: number;
    axisPadding?: number;
  }>(),
  {
    averageThresholdPercent: 20,
    color: "primary",
    borderRadius: 24,
    theme: undefined,
    axisPadding: 16,
    showYAxisLabels: false,
    yAxisLabelsCount: undefined,
  },
);

const tooltipData = ref({
  item: null as number | null,
  x: 0,
  y: 0,
  visible: false,
});

const maxValue = computed(() => {
  return Math.max(...props.data.map((i) => i.number));
});

const chartData = computed(() => {
  const theme = props.theme ?? defaultBarChartTheme(props.color);
  const labels = props.data.map((i) => i.name);

  const avg = props.data.reduce((a, b) => a + b.number, 0) / props.data.length;
  const colors = props.data.map((item) => {
    const diff = Math.abs(avg - item.number);
    const diffPercent = (diff / maxValue.value) * 100;

    if (diffPercent < props.averageThresholdPercent) {
      return theme.normal;
    }

    if (item.number < avg) {
      return theme.low;
    }

    return theme.high;
  });

  return {
    labels: labels,
    datasets: [
      {
        label: props.name,
        data: props.data.map((i) => i.number),
        borderRadius: props.borderRadius,
        borderSkipped: false,
        backgroundColor: (context: ContextProxy) => {
          if (!context.chart.chartArea) {
            return;
          }

          const index = context.dataIndex;
          const { ctx, chartArea } = context.chart;

          const color = colors[index];

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(
            1 - props.data[index].number / maxValue.value,
            color.start,
          );
          gradient.addColorStop(1, color.end);

          return gradient;
        },
      },
    ],
  };
});

const chartOptions = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement);

  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color",
  );

  return {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: !slots["tooltip"],
        position: "nearest",
        external(context: { chart: Chart; tooltip: TooltipModel<never> }) {
          const itemName = context.tooltip.title[0];
          const itemIndex = props.data.findIndex((i) => i.name === itemName);

          tooltipData.value = {
            item: itemIndex ?? tooltipData.value.item,
            x: context.chart.canvas.offsetLeft + context.tooltip.caretX,
            y: context.chart.canvas.offsetTop + context.tooltip.caretY,
            visible: context.tooltip.opacity > 0,
          };
        },
      },
    },
    chartTheme: {
      backgroundColor: documentStyle.getPropertyValue("background-color"),
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: textColor,
          padding: props.axisPadding,
        },
      },
      y: {
        max: maxValue.value,
        stacked: true,
        position: "right",
        display: false,
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          maxTicksLimit: props.yAxisLabelsCount,
          color: textColorSecondary,
        },
      },
    },
  } as ChartOptions;
});
</script>

<style scoped lang="scss">
@import url(/assets/css/charts.scss);
</style>
