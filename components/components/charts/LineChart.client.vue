<template>
  <div class="flex gap-4 flex-col">
    <div class="chart relative flex-1">
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
        class="size-full"
        type="line"
        :data="chartData"
        :options="chartOptions"
      />
    </div>

    <div
      class="flex"
      :style="{
        marginLeft: `${100 / (items.length + 1) / 2}%`,
        marginRight: `${100 / (items.length + 1) / 2}%`,
      }"
    >
      <div
        v-for="(item, index) in props.items"
        :key="index"
        class="flex-1 flex justify-center"
      >
        <slot name="label" :item="item" :index="index">
          <span>{{ item.name }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContextProxy } from "chart.js/helpers";
import type { Chart, TooltipModel } from "chart.js";
import type {
  LineChartProps,
  LineChartTheme,
} from "~/components-types/charts/LineChart";

const props = withDefaults(
  defineProps<
    LineChartProps & {
      tension?: number;
      prevValue: number;
      nextValue: number;
    }
  >(),
  {
    ...LineChartDefaults,
    tension: 0.4,
  },
);

const slots = useSlots();

const tooltipData = ref({
  item: null as number | null,
  x: 0,
  y: 0,
  visible: false,
});

const dataNumbers = computed(() => [
  props.prevValue,
  ...props.items.map((i) => i.number),
  props.nextValue,
]);

const pointBorder = computed(() =>
  props.pointEnabled ? props.pointBorder : 0,
);

const buildDefaultTheme = (
  color: string,
  brightness: string,
): LineChartTheme => {
  const style = getComputedStyle(document.documentElement);

  const pointColor = style.getPropertyValue(`--p-${color}-200`);
  const strokeColor = style.getPropertyValue(`--p-${color}-${brightness}`);

  return {
    strokeColor: strokeColor,
    pointColor: pointColor,
  };
};

const chartData = computed(() => {
  const theme = props.theme ?? buildDefaultTheme(props.color, props.brightness);

  return {
    labels: ["---", ...props.items.map((i) => i.name), "---"],
    datasets: [
      {
        data: dataNumbers.value.map((item, index) => ({
          x: index,
          y: item,
        })),
        fill: true,
        tension: props.tension,
        borderColor: theme.strokeColor,
        borderWidth: props.strokeWidth,
        pointBackgroundColor: theme.strokeColor,
        pointBorderColor: theme.pointColor,
        pointBorderWidth: pointBorder.value,
        radius: (ctx: ContextProxy) => {
          const index = ctx.dataIndex;

          return index == 0 || index == dataNumbers.value.length - 1
            ? 0
            : props.pointRadius;
        },
        backgroundColor: function (context: ContextProxy) {
          if (!context.chart.chartArea) {
            return;
          }

          // const index = context.dataIndex;
          const { ctx, chartArea } = context.chart;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );

          gradient.addColorStop(0, theme.strokeColor);
          gradient.addColorStop(0.2, theme.strokeColor + "dd");
          gradient.addColorStop(0.6, theme.strokeColor + "40");
          gradient.addColorStop(1, theme.strokeColor + "00");

          return gradient;
        },
      },
    ],
  };
});

const chartOptions = computed(() => ({
  plugins: {
    tooltip: {
      enabled: !slots["tooltip"],
      position: "nearest",
      external(context: { chart: Chart; tooltip: TooltipModel<never> }) {
        const itemName = context.tooltip.title[0];
        const itemIndex = props.items.findIndex((i) => i.name === itemName);

        tooltipData.value = {
          item: itemIndex ?? tooltipData.value.item,
          x: context.chart.canvas.offsetLeft + context.tooltip.caretX,
          y: context.chart.canvas.offsetTop + context.tooltip.caretY,
          visible: context.tooltip.opacity > 0,
        };
      },
    },
    legend: {
      display: false,
    },
  },
  clip: false,
  layout: {
    padding: {
      bottom: props.pointRadius
    },
  },
  elements: {
    point: {
      radius: props.pointRadius,
      hitRadius: props.pointRadius,
      hoverRadius: props.pointRadius,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
}));
</script>

<style scoped lang="scss">
@import url(/assets/css/charts.scss);

.chart {
  width: 100%;
  height: 100%;
}
</style>
