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
import type { ChartProps } from "~/components-types/charts/Chart";
import { buildDefaultTheme } from "~/components-types/charts/Chart";

const props = withDefaults(
  defineProps<
    ChartProps & {
      strokeOpacity?: string;
      valueHeight?: string;
    }
  >(),
  {
    ...ChartDefaults,
    strokeOpacity: "10",
    valueHeight: "24px",
  },
);

const pointBorder = computed(() =>
  props.pointEnabled ? props.pointBorder : 0,
);

const chartData = computed(() => {
  const theme = props.theme ?? buildDefaultTheme(props.color, props.brightness);

  return {
    labels: props.items.map((p) => p.name),
    datasets: [
      {
        data: props.items.map((p) => p.number),
        fill: false,
        tension: 0.4,
        borderColor: theme.strokeColor + props.strokeOpacity,
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
  @apply relative w-max h-full;
  @apply flex flex-col gap-2;

  .chart {
    $margins: calc(100% / v-bind(itemsCount) / 2 - v-bind(pointRadiusPx));

    @apply absolute !important;
    margin-top: v-bind(valueHeight);
    left: $margins;
    right: $margins;
  }

  .axis {
    //@apply absolute top-0;
    @apply w-max h-full flex;
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
