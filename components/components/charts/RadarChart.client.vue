<template>
  <Chart type="radar" :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import type { ContextProxy } from "chart.js/helpers";
import type { ChartProps } from "@/components-types/charts/Chart";
import { buildDefaultTheme } from "@/components-types/charts/Chart";

const props = withDefaults(
  defineProps<
    ChartProps & {
      name: string;
      linesColor?: string;
      tension?: number;
    }
  >(),
  {
    ...ChartDefaults,
    strokeWidth: 1,
    tension: 0.08,
    linesColor: undefined,
  },
);

const chartData = computed(() => {
  const theme = props.theme ?? buildDefaultTheme(props.color, props.brightness);

  return {
    labels: props.items.map((p) => p.name),
    datasets: [
      {
        label: props.name,
        data: props.items.map((p) => p.number),
        backgroundColor: theme.pointColor + "90",
        borderColor: theme.strokeColor,
        borderWidth: props.strokeWidth,
        pointBorderColor: "transparent",
        pointBackgroundColor: "transparent",
        pointHoverBorderColor: theme.pointColor,
        pointHoverBackgroundColor: theme.pointColor,
      },
    ],
  };
});

const chartOptions = computed(() => {
  const documentStyle = getComputedStyle(document.documentElement);
  const linesColor = documentStyle.getPropertyValue("--p-text-muted-color");

  return {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: ContextProxy) => {
            return `${context.dataset.label}: ${context.parsed.r.toFixed(1)}%`;
          },
        },
      },
    },
    elements: {
      line: {
        tension: props.tension,
      },
    },
    scale: {
      ticks: {
        maxTicksLimit: 4,
      },
    },
    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: linesColor,
        },
        angleLines: {
          color: linesColor,
        },
        ticks: {
          color: linesColor,
          backdropColor: "transparent",
        },
      },
    },
  };
});
</script>
