<template>
  <div class="line-chart">
    <Chart
      class="chart"
      type="line"
      :data="chartData"
      :options="chartOptions"
    />

    <div class="axis">
      <div v-for="(item, index) in props.items" :key="index" class="tick">
        <div class="value">
          <slot name="value" :item="item" :index="index" />
        </div>
      </div>
    </div>

    <div class="legend">
      <div v-for="(item, index) in props.items" :key="index" class="label">
        <slot name="label" :item="item" :index="index">
          <span>{{ item.name }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  LineChartProps,
  LineChartTheme,
} from "~/components-types/charts/LineChart";

const props = withDefaults(
  defineProps<
    LineChartProps & {
      valueHeight?: string;
    }
  >(),
  {
    ...LineChartDefaults,
    valueHeight: "24px",
  },
);

const pointBorder = computed(() =>
  props.pointEnabled ? props.pointBorder : 0,
);

const buildDefaultTheme = (
  color: string,
  brightness: string,
  strokeOpacity: string,
): LineChartTheme => {
  const style = getComputedStyle(document.documentElement);

  const pointColor = style.getPropertyValue(`--p-${color}-${brightness}`);
  const strokeColor =
    style.getPropertyValue(`--p-${color}-${brightness}`) + strokeOpacity;

  return {
    strokeColor: strokeColor,
    pointColor: pointColor,
  };
};

const chartData = computed(() => {
  const theme =
    props.theme ??
    buildDefaultTheme(props.color, props.brightness, props.strokeOpacity);

  return {
    labels: props.items.map((p) => p.name),
    datasets: [
      {
        data: props.items.map((p) => p.number),
        fill: false,
        borderColor: theme.strokeColor,
        borderWidth: props.strokeWidth,
        pointBackgroundColor: "transparent",
        pointBorderColor: theme.pointColor,
        pointBorderWidth: pointBorder.value,
      },
    ],
  };
});

const chartOptions = computed(() => ({
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  maintainAspectRatio: false,
  elements: {
    point: {
      radius: props.pointRadius,
      hitRadius: props.pointRadius,
      hoverRadius: props.pointRadius,
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
}));

const pointRadiusPx = computed(
  () => `${pointBorder.value + props.pointRadius + props.strokeWidth - 1}px`,
);

const itemsCount = computed(() => props.items.length);
</script>

<style scoped lang="scss">
.line-chart {
  @apply relative h-full;
  @apply flex flex-col gap-4;

  .chart {
    @apply flex-1;
    width: calc(100% - 100% / v-bind(itemsCount) + v-bind(pointRadiusPx) * 2);
    margin-top: v-bind(valueHeight);
    margin-left: calc(100% / v-bind(itemsCount) / 2 - v-bind(pointRadiusPx));
  }

  .axis {
    @apply absolute top-0;
    @apply size-full flex;
    z-index: 1;

    .tick {
      @apply relative flex-1;

      &:not(:last-of-type) {
        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 1px;

          @apply bg-surface-700 opacity-10;
        }
      }

      .value {
        @apply w-full;
        height: v-bind(valueHeight);
        @apply flex justify-center;

        @apply opacity-40 transition-all;
      }

      &:hover {
        .value {
          @apply opacity-100;
        }
      }
    }
  }

  .legend {
    @apply w-full flex items-start;
    z-index: 2;

    .label {
      @apply flex-1;
      @apply flex flex-col items-center;
    }
  }
}
</style>
