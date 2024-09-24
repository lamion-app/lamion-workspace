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
const props = withDefaults(
  defineProps<{
    items: Array<LineChartItem>;
    color?: string;
    brightness?: string;
    strokeOpacity?: string;
    theme?: LineChartTheme;
    strokeWidth?: number;
    pointEnabled?: boolean;
    pointRadius?: number;
    pointBorder?: number;
    valueHeight?: string;
  }>(),
  {
    theme: undefined,
    color: "primary",
    brightness: "400",
    strokeOpacity: "10",
    strokeWidth: 6,
    pointEnabled: (props) => !props.pointRadius || props.pointRadius > 0,
    pointRadius: 4,
    pointBorder: (props) => (props.pointRadius ? props.pointRadius * 2 : 8),
    valueHeight: "24px",
  },
);

const pointBorder = computed(() =>
  props.pointEnabled ? props.pointBorder : 0,
);

const chartData = computed(() => {
  const theme =
    props.theme ??
    defaultLineChartTheme(props.color, props.brightness, props.strokeOpacity);

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
  () => `${pointBorder.value + props.strokeWidth + 1}px`,
);
</script>

<style scoped lang="scss">
.line-chart {
  @apply relative;
  @apply flex flex-col gap-4;

  .chart {
    height: 100%;
    margin-top: v-bind(valueHeight);
    width: calc(100% - 100% / 7 + v-bind(pointRadiusPx) * 2);
    margin-left: calc(100% / 7 / 2 - v-bind(pointRadiusPx));
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

          @apply bg-surface-700 opacity-20;
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
    @apply w-full flex;
    z-index: 2;

    .label {
      @apply flex-1;
      @apply flex flex-col items-center;
    }
  }
}
</style>
